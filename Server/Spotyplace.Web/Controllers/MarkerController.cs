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
    public class MarkerController : Controller
    {
        private readonly MarkerManager _markerManager;

        public MarkerController(MarkerManager markerManager)
        {
            _markerManager = markerManager;
        }

        [Authorize]
        [Route("{floorId:guid}")]
        [HttpPut]
        public async Task<IActionResult> UpdateMarkersAsync(Guid floorId, [FromBody] List<MarkerDto> markers)
        {
            var success = await _markerManager.UpdateMarkersAsync(floorId, markers, User.FindFirstValue(ClaimTypes.Email));

            if (success)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("{floorId:guid}")]
        public async Task<IActionResult> GetMarkersAsync(Guid floorId)
        {
            var markers = await _markerManager.GetMarkersAsync(floorId, User.FindFirstValue(ClaimTypes.Email));

            if (markers == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(markers.Select(e => new MarkerDto(e)));
            }
        }
    }
}
