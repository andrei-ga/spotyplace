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

            // Create customer
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
        /// <param name="user">User model.</param>
        /// <returns></returns>
        public async Task<ApplicationUser> EnsureUserExistAsync(ApplicationUser user)
        {
            if (user == null)
            {
                return null;
            }

            if (string.IsNullOrEmpty(user.ChargebeeId))
            {
                var customer = await CreateUserAsync(user.Email);
                if (customer == null)
                {
                    return null;
                }

                // Add default plan
                var result = Subscription.CreateForCustomer(customer.Id)
                    .PlanId(_chargebeeOptions.StarterPlanId)
                    .Request();

                user.ChargebeeId = customer.Id;
                user.ChargebeeSubscriptionId = result.Subscription.Id;
                await _userManager.UpdateAsync(user);
            }
            return user;
        }

        /// <summary>
        /// Create portal session in Chargebee. Available for 1 hour.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<PortalSession> CreatePortalSessionAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            user = await EnsureUserExistAsync(user);

            EntityResult result = PortalSession.Create()
                .CustomerId(user.ChargebeeId)
                .RedirectUrl(_chargebeeOptions.RedirectUrl)
                .Request();
            return result.PortalSession;
        }

        /// <summary>
        /// Create subscription page.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<JToken> CreateHostedPageAsync(string userEmail, string planId)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            user = await EnsureUserExistAsync(user);

            var separatorSpace = user.FullName.LastIndexOf(' ');
            var lastName = user.FullName;
            var firstName = "";
            if (separatorSpace != -1)
            {
                firstName = user.FullName.Substring(0, separatorSpace);
                lastName = user.FullName.Substring(separatorSpace + 1);
            }

            EntityResult result = HostedPage.CheckoutExisting()
                .SubscriptionId(user.ChargebeeSubscriptionId)
                .SubscriptionPlanId(planId)
                .Request();
            return result.HostedPage.GetJToken();
        }
    }
}
