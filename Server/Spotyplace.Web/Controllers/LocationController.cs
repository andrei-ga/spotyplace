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
        public async Task<IActionResult> CreateLocationAsync([FromBody] LocationCreateRequestDto location)
        {
            var success = await _locationManager.CreateLocationAsync(location, User.FindFirstValue(ClaimTypes.Email));

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
        public async Task<IActionResult> EditLocationAsync(Guid id, [FromBody] LocationCreateRequestDto location)
        {
            var success = await _locationManager.EditLocationAsync(id, location, User.FindFirstValue(ClaimTypes.Email));

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
            var success = await _locationManager.DeleteLocationAsync(id, User.FindFirstValue(ClaimTypes.Email));

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
            var locations = await _locationManager.GetOfUserAsync(User.FindFirstValue(ClaimTypes.Email));
            return Ok(locations.Select(e => new LocationDto(e)));
        }

        [Route("{id:guid}")]
        public async Task<IActionResult> GetLocationAsync(Guid id)
        {
            var location = await _locationManager.GetLocationAsync(id, User.FindFirstValue(ClaimTypes.Email));
            if (location == null)
            {
                return NotFound();
            }

            return Ok(new LocationDto(location));
        }
    }
}
