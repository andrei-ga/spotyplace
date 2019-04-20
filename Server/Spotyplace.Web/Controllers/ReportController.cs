using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Spotyplace.Business.Managers;
using Spotyplace.Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Spotyplace.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : Controller
    {
        private readonly ReportManager _reportManager;

        public ReportController(ReportManager reportManager)
        {
            _reportManager = reportManager;
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> ReportItem([FromBody] ReportDto report)
        {
            var referrer = Request.Headers["Referer"];
            if (referrer.Any())
            {
                await _reportManager.ReportItem(report.ReportReason, referrer.ToString(), User.FindFirstValue(ClaimTypes.Email));
            }
            return Ok(true);
        }
    }
}
