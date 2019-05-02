using Spotyplace.Business.Utils;
using Spotyplace.DataAccess.Repositories;
using Spotyplace.DataAccess.Services;
using Spotyplace.Entities.DTOs;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class LocationManager
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IFileStorageService _fileStorageService;
        private readonly AccountManager _accountManager;
        private readonly PermissionManager _permissionManager;

        public LocationManager(ILocationRepository locationRepository, IFileStorageService fileStorageService, AccountManager accountManager, PermissionManager permissionManager)
        {
            _locationRepository = locationRepository;
            _fileStorageService = fileStorageService;
            _accountManager = accountManager;
            _permissionManager = permissionManager;
        }

        /// <summary>
        /// Check if location name is valid.
        /// </summary>
        /// <param name="name">Location name to check.</param>
        /// <returns></returns>
        private bool IsLocationNameValid(string name)
        {
            return !RegexHelper.HasSpecialCharacters(name) && name.Length > 2;
        }

        /// <summary>
        /// Create new location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> CreateLocationAsync(LocationCreateRequestDto location, string userEmail)
        {
            location.Name = location.Name.Trim();

            // Check location name
            if (!IsLocationNameValid(location.Name))
            {
                return false;
            }

            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            var loc = new Location(location)
            {
                OwnerId = user.Id
            };

            if (location.PublicSelectedUsers.Count > 0)
            {
                loc.PublicUserLocations = new List<PublicUserLocation>();
                foreach (var u in location.PublicSelectedUsers)
                {
                    loc.PublicUserLocations.Add(new PublicUserLocation()
                    {
                        UserId = u.Id
                    });
                }
            }

            await _locationRepository.CreateAsync(loc);

            return true;
        }

        /// <summary>
        /// Edit location.
        /// </summary>
        /// <param name="id">Id of the location to edit.</param>
        /// <param name="location">Location model.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> EditLocationAsync(Guid id, LocationCreateRequestDto location, string userEmail)
        {
            location.Name = location.Name.Trim();

            // Check location name
            if (!IsLocationNameValid(location.Name))
            {
                return false;
            }

            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights
            var currentLocation = await _locationRepository.GetLocationAsync(id, false, true, true);
            if (!_permissionManager.CanEditLocation(user, currentLocation))
            {
                return false;
            }

            currentLocation.Name = location.Name;
            currentLocation.IsPublic = location.IsPublic;
            currentLocation.IsSearchable = location.IsSearchable;
            currentLocation.IsPublicToSelected = location.IsPublicToSelected;
            currentLocation.IsSearchableMarkers = location.IsSearchableMarkers;
            currentLocation.PublicSelectedGroup = location.PublicSelectedGroup;
            currentLocation.ModifiedAt = DateTime.UtcNow;

            currentLocation.PublicUserLocations.Clear();
            foreach(var u in location.PublicSelectedUsers)
            {
                currentLocation.PublicUserLocations.Add(new PublicUserLocation()
                {
                    UserId = u.Id,
                    LocationId = currentLocation.LocationId
                });
            }

            await _locationRepository.EditAsync(currentLocation);

            return true;
        }

        /// <summary>
        /// Delete location.
        /// </summary>
        /// <param name="id">Location id.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> DeleteLocationAsync(Guid id, string userEmail)
        {
            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights
            var currentLocation = await _locationRepository.GetLocationAsync(id, false, false, false);
            if (!_permissionManager.CanEditLocation(user, currentLocation))
            {
                return false;
            }

            await _locationRepository.DeleteAsync(currentLocation);
            return true;
        }

        /// <summary>
        /// Get list of locations owned by specific user.
        /// </summary>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<IEnumerable<Location>> GetOfUserAsync(string userEmail)
        {
            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return new List<Location>();
            }

            return await _locationRepository.GetOfUserAsync(user.Id, false, true);
        }

        /// <summary>
        /// Get location by id.
        /// </summary>
        /// <param name="id">Location id.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<(Location, bool)> GetLocationAsync(Guid id, string userEmail)
        {
            var location = await _locationRepository.GetLocationAsync(id, true, true, false);

            // Return if no location found
            if (location == null)
            {
                return (null, false);
            }

            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            var canEdit = _permissionManager.CanEditLocation(user, location);

            // Return found location if public or have authorization
            if (_permissionManager.CanViewLocation(user, location))
            {
                return (location, canEdit);
            }

            return (null, false);
        }

        /// <summary>
        /// Get locations matching keyword.
        /// </summary>
        /// <param name="keyword">Keyword to match.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<ICollection<Location>> GetLocationsAsync(string keyword, string userEmail)
        {
            if (string.IsNullOrWhiteSpace(keyword) || keyword.Length < 3 || keyword.Length > 50)
            {
                return new List<Location>();
            }

            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            return await _locationRepository.GetLocationsAsync(keyword, user == null ? Guid.Empty : user.Id, user.Email.Substring(user.Email.LastIndexOf("@") + 1));
        }

        /// <summary>
        /// Get latest locations.
        /// </summary>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<ICollection<Location>> GetLatestLocationsAsync(string userEmail)
        {
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            return await _locationRepository.GetLatestLocationsAsync(user == null ? Guid.Empty : user.Id, user.Email.Substring(user.Email.LastIndexOf("@") + 1));
        }
    }
}
