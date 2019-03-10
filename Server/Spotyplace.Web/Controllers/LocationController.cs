using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> CreateLocationAsync([FromBody] LocationCreateRequest location)
        {
            var success = await _locationManager.CreateLocationAsync(location, User.FindFirst(ClaimTypes.Email).Value);

            if (success)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [Route("{id:guid}")]
        [HttpPut]
        public async Task<IActionResult> EditLocationAsync(Guid id, [FromBody] LocationCreateRequest location)
        {
            var success = await _locationManager.EditLocationAsync(id, location, User.FindFirst(ClaimTypes.Email).Value);

            if (success)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [Route("{id:guid}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteLocationAsync(Guid id)
        {
            var success = await _locationManager.DeleteLocationAsync(id, User.FindFirst(ClaimTypes.Email).Value);

            if (success)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [Route("mine")]
        public async Task<IActionResult> GetMyLocationsAsync()
        {
            return Ok(await _locationManager.GetOfUserAsync(User.FindFirst(ClaimTypes.Email).Value));
        }
    }
}
