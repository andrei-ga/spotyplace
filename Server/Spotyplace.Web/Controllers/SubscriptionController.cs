using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChargeBee.Api;
using ChargeBee.Models;
using Microsoft.Extensions.Options;
using Spotyplace.Entities.Config;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Spotyplace.Business.Managers;

namespace Spotyplace.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : Controller
    {
        private readonly ChargebeeOptions _chargebeeOptions;
        private readonly AccountManager _accountManager;

        public SubscriptionController(IOptionsMonitor<ChargebeeOptions> chargebeeOptions, AccountManager accountManager)
        {
            _chargebeeOptions = chargebeeOptions.CurrentValue;
            _accountManager = accountManager;
            ApiConfig.Configure(_chargebeeOptions.SiteId, _chargebeeOptions.ApiKey);
        }

        [Route("session")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateSessionAsync()
        {
            var user = await _accountManager.GetAccountInfoAsync(User.FindFirstValue(ClaimTypes.Email));

            EntityResult result = PortalSession.Create()
                .CustomerId(user.Id.ToString())
                .RedirectUrl("https://localhost:4200/account")
                .Request();

            return Ok(result.PortalSession);
        }
    }
}
