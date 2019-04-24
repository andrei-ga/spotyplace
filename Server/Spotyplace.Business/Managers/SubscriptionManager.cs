using ChargeBee.Api;
using ChargeBee.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Spotyplace.Entities.Config;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
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
        /// Create new customer in Chargebee.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<Customer> CreateUserAsync(string userEmail)
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
        /// Create user in Chargebee if not exist.
        /// </summary>
        /// <param name="userEmail">User eail.</param>
        /// <returns></returns>
        public async Task<Customer> EnsureUserExistAsync(string userEmail)
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

            var customer = await CreateUserAsync(userEmail);
            if (customer == null)
            {
                return null;
            }

            return customer;
        }

        /// <summary>
        /// Create portal session in Chargebee. Available for 1 hour.
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

            var customer = await EnsureUserExistAsync(user.Email);

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

            var customer = await EnsureUserExistAsync(user.Email);
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
                .SubscriptionPlanId(planId)
                .Request();
                return result.HostedPage.GetJToken();
            }
        }
    }
}
