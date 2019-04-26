using ChargeBee.Api;
using ChargeBee.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Spotyplace.Entities.Config;
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

        public SubscriptionManager(IOptionsMonitor<ChargebeeOptions> chargebeeOptions, AccountManager accountManager, UserManager<ApplicationUser> userManager)
        {
            _chargebeeOptions = chargebeeOptions.CurrentValue;
            _accountManager = accountManager;
            _userManager = userManager;

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
        /// Get customer info. Creates a new one if not exist.
        /// </summary>
        /// <param name="userEmail">User eail.</param>
        /// <returns></returns>
        public async Task<Customer> GetCustomerAsync(string userEmail)
        {
            if (string.IsNullOrEmpty(userEmail))
            {
                return null;
            }

            var findCustomerResult = Customer.List()
                .Email().Is(userEmail)
                .Request();
            var customerList = findCustomerResult.List;

            if (customerList.Count > 0)
            {
                return customerList[0].Customer;
            }

            var customer = await CreateCustomerAsync(userEmail);
            if (customer == null)
            {
                return null;
            }

            return customer;
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

            var customer = await GetCustomerAsync(user.Email);

            EntityResult result = PortalSession.Create()
                .CustomerId(customer.Id)
                .RedirectUrl(_chargebeeOptions.RedirectUrl)
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

            var customer = await GetCustomerAsync(user.Email);
            var subscriptionResult = Subscription.List()
                .CustomerId().Is(customer.Id)
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
                    .CustomerId(customer.Id)
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
            var plans = Plan.List()
                .Status().Is(Plan.StatusEnum.Active)
                .Request();
            return plans.List.Select(e => e.Plan);
        }

        /// <summary>
        /// Get customer active subscription.
        /// </summary>
        /// <param name="userEmail">Customer email.</param>
        /// <returns></returns>
        public async Task<Subscription> GetCustomerSubscriptionAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            var customer = await GetCustomerAsync(user.Email);
            var result = Subscription.List()
                .CustomerId().Is(customer.Id)
                .Status().In(new Subscription.StatusEnum[] { Subscription.StatusEnum.Active, Subscription.StatusEnum.InTrial })
                .Request();
            return result.List.Select(e => e.Subscription).FirstOrDefault();
        }
    }
}
