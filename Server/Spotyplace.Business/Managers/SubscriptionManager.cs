using ChargeBee.Api;
using ChargeBee.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Spotyplace.Entities.Config;
using Spotyplace.Entities.Core;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class SubscriptionManager
    {
        private readonly ChargebeeOptions _chargebeeOptions;
        private readonly AccountManager _accountManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMemoryCache _cache;

        public SubscriptionManager(IOptionsMonitor<ChargebeeOptions> chargebeeOptions, AccountManager accountManager, UserManager<ApplicationUser> userManager, IMemoryCache memoryCache)
        {
            _chargebeeOptions = chargebeeOptions.CurrentValue;
            _accountManager = accountManager;
            _userManager = userManager;
            _cache = memoryCache;

            ApiConfig.Configure(_chargebeeOptions.SiteId, _chargebeeOptions.ApiKey);
        }

        /// <summary>
        /// Create new customer.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        private async Task<Customer> CreateCustomerAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            var separatorSpace = user.FullName.LastIndexOf(' ');
            var lastName = user.FullName;
            var firstName = "";
            if (separatorSpace != -1)
            {
                firstName = user.FullName.Substring(0, separatorSpace);
                lastName = user.FullName.Substring(separatorSpace + 1);
            }
            
            var result = Customer.Create()
                .FirstName(firstName)
                .LastName(lastName)
                .Email(user.Email)
                .Request();
            return result.Customer;
        }

        /// <summary>
        /// Get customer id. Creates a new one if not exist.
        /// </summary>
        /// <param name="userEmail">User eail.</param>
        /// <returns></returns>
        public async Task<string> GetCustomerIdAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            if (string.IsNullOrEmpty(user.ChargebeeId))
            {
                var findCustomerResult = Customer.List()
                    .Email().Is(userEmail)
                    .Request();
                var customerList = findCustomerResult.List;

                if (customerList.Count > 0)
                {
                    // User already exist in Chargebee.
                    user.ChargebeeId = customerList[0].Customer.Id;
                }
                else
                {
                    // Create a new user in Chargebee.
                    var customer = await CreateCustomerAsync(userEmail);
                    if (customer == null)
                    {
                        throw new Exception("Chargebee customer could not be created.");
                    }
                    user.ChargebeeId = customer.Id;
                }
                await _userManager.UpdateAsync(user);
            }

            return user.ChargebeeId;
        }

        /// <summary>
        /// Create portal session. Available for 1 hour.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<JToken> CreatePortalSessionAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            var customerId = await GetCustomerIdAsync(user.Email);

            EntityResult result = PortalSession.Create()
                .CustomerId(customerId)
                .Request();
            return result.PortalSession.GetJToken();
        }

        /// <summary>
        /// Create subscription page.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <param name="planId">New plan id.</param>
        /// <returns></returns>
        public async Task<JToken> CreateHostedPageAsync(string userEmail, string planId)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            var customerId = await GetCustomerIdAsync(user.Email);
            var subscriptionResult = Subscription.List()
                .CustomerId().Is(customerId)
                .Request();
            var subscription = subscriptionResult.List;

            var separatorSpace = user.FullName.LastIndexOf(' ');
            var lastName = user.FullName;
            var firstName = "";
            if (separatorSpace != -1)
            {
                firstName = user.FullName.Substring(0, separatorSpace);
                lastName = user.FullName.Substring(separatorSpace + 1);
            }

            if (subscription.Count > 0)
            {
                EntityResult result = HostedPage.CheckoutExisting()
                    .SubscriptionId(subscription[0].Subscription.Id)
                    .SubscriptionPlanId(planId)
                    .Request();
                return result.HostedPage.GetJToken();
            }
            else
            {
                EntityResult result = HostedPage.CheckoutNew()
                    .CustomerId(customerId)
                    .SubscriptionPlanId(planId)
                    .Request();
                return result.HostedPage.GetJToken();
            }
        }

        /// <summary>
        /// Get active subscription plans.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Plan> GetSubscriptionPlans()
        {
            return _cache.GetOrCreate(CacheKeys.SubscriptionPlans, entry =>
            {
                entry.AbsoluteExpiration = DateTime.Now.AddHours(1);
                var plans = Plan.List()
                    .Status().Is(Plan.StatusEnum.Active)
                    .Request();
                return plans.List.Select(e => e.Plan);
            });
        }

        /// <summary>
        /// Synchronize user subscription info.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task SynchronizeSubscriptionAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user != null)
            {
                var customerId = await GetCustomerIdAsync(user.Email);
                var subscriptionResult = Subscription.List()
                    .CustomerId().Is(customerId)
                    .Request();
                var result = subscriptionResult.List.FirstOrDefault();

                if (result == null || result.Subscription == null)
                {
                    user.ChargebeePlanId = null;
                    user.ChargebeeSubscriptionStatus = null;
                }
                else
                {
                    user.ChargebeePlanId = result.Subscription.PlanId;
                    user.ChargebeeSubscriptionStatus = result.Subscription.Status;
                }
                await _userManager.UpdateAsync(user);
            }
        }
    }
}
