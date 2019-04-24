using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Spotyplace.Business.Managers;
using System.Security.Claims;
using System.Linq;
using Spotyplace.Entities.DTOs;

namespace Spotyplace.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : Controller
    {
        private readonly SubscriptionManager _subscriptionManager;

        public BillingController(SubscriptionManager subscriptionManager)
        {
            _subscriptionManager = subscriptionManager;
        }

        [Route("portal-session")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateSessionAsync()
        {
            return Ok(await _subscriptionManager.CreatePortalSessionAsync(User.FindFirstValue(ClaimTypes.Email)));
        }

        [Route("hosted-page/{planId}")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateHostedPageAsync(string planId)
        {
            return Ok(await _subscriptionManager.CreateHostedPageAsync(User.FindFirstValue(ClaimTypes.Email), planId));
        }

        [Route("plans")]
        public IActionResult GetSubscriptionPlans()
        {
            return Ok(_subscriptionManager.GetSubscriptionPlans().Select(e => new SubscriptionPlanDto(e)));
        }
    }
}
