using Spotyplace.DataAccess.Repositories;
using Spotyplace.Entities.DTOs;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class LocationManager
    {
        public readonly ILocationRepository _locationRepository;
        private readonly AccountManager _accountManager;

        public LocationManager(ILocationRepository locationRepository, AccountManager accountManager)
        {
            _locationRepository = locationRepository;
            _accountManager = accountManager;
        }

        /// <summary>
        /// Create new location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<bool> CreateLocationAsync(LocationCreateRequestDto location, string userEmail)
        {
            // Get current user id.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            var loc = new Location(location)
            {
                OwnerId = user.Id
            };
            await _locationRepository.CreateAsync(loc);

            return true;
        }

        /// <summary>
        /// Edit location.
        /// </summary>
        /// <param name="id">Id of the location to edit.</param>
        /// <param name="location">Location model.</param>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<bool> EditLocationAsync(Guid id, LocationCreateRequestDto location, string userEmail)
        {
            // Get current user id.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights.
            var currentLocation = await _locationRepository.GetLocationAsync(id, false);
            if (currentLocation == null || currentLocation.OwnerId != user.Id)
            {
                return false;
            }

            currentLocation.Name = location.Name;
            currentLocation.IsPublic = location.IsPublic;
            currentLocation.IsSearchable = location.IsSearchable;
            await _locationRepository.EditAsync(currentLocation);

            return true;
        }

        /// <summary>
        /// Delete location.
        /// </summary>
        /// <param name="id">Location id.</param>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<bool> DeleteLocationAsync(Guid id, string userEmail)
        {
            // Get current user id.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights.
            var currentLocation = await _locationRepository.GetLocationAsync(id, false);
            if (currentLocation == null || currentLocation.OwnerId != user.Id)
            {
                return false;
            }

            await _locationRepository.DeleteAsync(currentLocation);
            return true;
        }

        /// <summary>
        /// Get list of locations owned by specific user.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<IEnumerable<Location>> GetOfUserAsync(string userEmail)
        {
            // Get current user id.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return new List<Location>();
            }

            return await _locationRepository.GetOfUserAsync(user.Id, false);
        }

        /// <summary>
        /// Get location by id.
        /// </summary>
        /// <param name="id">Location id.</param>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<Location> GetLocationAsync(Guid id, string userEmail)
        {
            var location = await _locationRepository.GetLocationAsync(id, true);

            // Return if no location found.
            if (location == null)
            {
                return null;
            }

            // Return found location if public.
            if (location.IsPublic)
            {
                return location;
            }

            // Else check for authorization.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user != null && location.OwnerId == user.Id)
            {
                return location;
            }

            return null;
        }
    }
}
