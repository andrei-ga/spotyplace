using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Spotyplace.Business.Utils;
using Spotyplace.DataAccess.Repositories;
using Spotyplace.DataAccess.Services;
using Spotyplace.Entities.Config;
using Spotyplace.Entities.DTOs;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class LocationManager
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IFileStorageService _fileStorageService;
        private readonly AccountManager _accountManager;
        private readonly UploadOptions _uploadOptions;

        public LocationManager(ILocationRepository locationRepository, IFileStorageService fileStorageService, AccountManager accountManager, IOptionsMonitor<UploadOptions> uploadOptions)
        {
            _locationRepository = locationRepository;
            _fileStorageService = fileStorageService;
            _accountManager = accountManager;
            _uploadOptions = uploadOptions.CurrentValue;
        }

        /// <summary>
        /// Create new location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> CreateLocationAsync(LocationCreateRequestDto location, string userEmail)
        {
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
            await _locationRepository.CreateAsync(loc);

            return true;
        }

        /// <summary>
        /// Create a new floor to a location.
        /// </summary>
        /// <param name="floor">Floor model.</param>
        /// <param name="file">Image file.</param>
        /// <param name="locationId">Location id to map the floor to.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> CreateFloorAsync(Guid locationId, FloorCreateRequestDto floor, IFormFile file, string userEmail)
        {
            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights
            var currentLocation = await _locationRepository.GetLocationAsync(locationId, true);
            if (currentLocation == null || currentLocation.OwnerId != user.Id)
            {
                return false;
            }

            // Check file size
            if (file.Length == 0 || file.Length > _uploadOptions.MaxFileSize)
            {
                return false;
            }

            // Check file type
            var isSvg = false;
            var imageStream = ImageHelper.ConvertToPng(file);
            if (imageStream == null)
            {
                // Check if svg
                isSvg = ImageHelper.IsValidSvg(file);
                if (!isSvg)
                {
                    return false;
                }
            }

            var newFloor = new Floor(floor)
            {
                IsSvg = isSvg
            };
            currentLocation.Floors.Add(newFloor);
            await _locationRepository.EditAsync(currentLocation);

            // Upload map file
            var fileName = string.Format("{0}{1}{2}", newFloor.FloorId.ToString(), currentLocation.LocationId.ToString(), isSvg ? ".svg" : ".png");
            await _fileStorageService.UploadFileAsync(file, fileName);

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
            // Get current user id.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get location to edit and check user rights
            var currentLocation = await _locationRepository.GetLocationAsync(id, false);
            if (currentLocation == null || currentLocation.OwnerId != user.Id)
            {
                return false;
            }

            currentLocation.Name = location.Name;
            currentLocation.IsPublic = location.IsPublic;
            currentLocation.IsSearchable = location.IsSearchable;
            currentLocation.ModifiedAt = DateTime.UtcNow;
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

            return await _locationRepository.GetOfUserAsync(user.Id, false);
        }

        /// <summary>
        /// Get location by id.
        /// </summary>
        /// <param name="id">Location id.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<Location> GetLocationAsync(Guid id, string userEmail)
        {
            var location = await _locationRepository.GetLocationAsync(id, true);

            // Return if no location found
            if (location == null)
            {
                return null;
            }

            // Return found location if public
            if (location.IsPublic)
            {
                return location;
            }

            // Else check for authorization
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user != null && location.OwnerId == user.Id)
            {
                return location;
            }

            return null;
        }
    }
}
