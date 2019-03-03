using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spotyplace.Business.Managers;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Spotyplace.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : Controller
    {
        private readonly LocationManager _locationManager;

        public LocationController(LocationManager locationManager)
        {
            _locationManager = locationManager;
        }

        [Authorize]
        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateLocationAsync([FromBody] Location location)
        {
            var success = await _locationManager.CreateLocationAsync(location, User.FindFirst(ClaimTypes.Email).Value);

            if (success)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [Route("mine")]
        public async Task<IActionResult> GetLocationsOwnedAsync()
        {
            return Ok(await _locationManager.GetOfUserAsync(User.FindFirst(ClaimTypes.Email).Value));
        }
    }
}
