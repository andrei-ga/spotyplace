using Spotyplace.Business.Utils;
using Spotyplace.DataAccess.Repositories;
using Spotyplace.Entities.DTOs;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class MarkerManager
    {
        private readonly IFloorRepository _floorRepository;
        private readonly AccountManager _accountManager;
        private readonly PermissionManager _permissionManager;

        public MarkerManager(ILocationRepository locationRepository, IFloorRepository floorRepository, AccountManager accountManager, PermissionManager permissionManager)
        {
            _floorRepository = floorRepository;
            _accountManager = accountManager;
            _permissionManager = permissionManager;
        }

        /// <summary>
        /// Update floor markers.
        /// </summary>
        /// <param name="floorId">Floor id.</param>
        /// <param name="markers">Markers to set on the floor.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> UpdateMarkersAsync(Guid floorId, List<MarkerDto> markers, string userEmail)
        {
            // Check marker content
            foreach(var m in markers)
            {
                if (RegexHelper.HasSpecialCharacters(m.TooltipContent))
                {
                    return false;
                }
            }

            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights
            var currentFloor = await _floorRepository.GetFloorAsync(floorId, true, true, true);
            if (currentFloor == null || !_permissionManager.CanEditLocation(user, currentFloor.Location))
            {
                return false;
            }

            currentFloor.Markers.Clear();
            foreach (var m in markers)
            {
                currentFloor.Markers.Add(new Marker(m));
            }
            await _floorRepository.EditAsync(currentFloor);

            return true;
        }

        /// <summary>
        /// Get markers of specific floor.
        /// </summary>
        /// <param name="floorId">Floor id.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<ICollection<Marker>> GetMarkersAsync(Guid floorId, string userEmail)
        {
            var floor = await _floorRepository.GetFloorAsync(floorId, true, true, false);

            // Return if no floor found.
            if (floor == null)
            {
                return null;
            }

            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            var canEdit = user != null && floor.Location.OwnerId == user.Id;

            // Return markers if public or have authorization
            if (floor.Location.IsPublic || canEdit)
            {
                return floor.Markers;
            }

            return null;
        }
    }
}
