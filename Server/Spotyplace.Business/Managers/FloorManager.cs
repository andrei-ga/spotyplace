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
    public class FloorManager
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IFloorRepository _floorRepository;
        private readonly IFileStorageService _fileStorageService;
        private readonly AccountManager _accountManager;
        private readonly UploadOptions _uploadOptions;

        public FloorManager(ILocationRepository locationRepository, IFloorRepository floorRepository, IFileStorageService fileStorageService, AccountManager accountManager, IOptionsMonitor<UploadOptions> uploadOptions)
        {
            _locationRepository = locationRepository;
            _floorRepository = floorRepository;
            _fileStorageService = fileStorageService;
            _accountManager = accountManager;
            _uploadOptions = uploadOptions.CurrentValue;
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
            var imageInfo = ImageHelper.ConvertToJpg(file);
            if (imageInfo == null)
            {
                // Check if svg
                imageInfo = ImageHelper.IsValidSvg(file);
                if (imageInfo == null)
                {
                    return false;
                }
                isSvg = true;
            }

            var newFloor = new Floor(floor)
            {
                IsSvg = isSvg,
                MapWidth = imageInfo.Width,
                MapHeight = imageInfo.Height
            };
            currentLocation.Floors.Add(newFloor);
            await _locationRepository.EditAsync(currentLocation);

            // Upload map file
            if (isSvg)
            {
                await _fileStorageService.UploadFileAsync(file, ConcatHelper.GetFloorFileName(currentLocation.LocationId, newFloor.FloorId, isSvg));
            }
            else
            {
                await _fileStorageService.UploadFileAsync(imageInfo.Stream, ConcatHelper.GetFloorFileName(currentLocation.LocationId, newFloor.FloorId, isSvg));
            }

            return true;
        }

        /// <summary>
        /// Delete floor.
        /// </summary>
        /// <param name="id">Floor id.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<bool> DeleteFloorAsync(Guid id, string userEmail)
        {
            // Get current user id
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            // Get parent location and check user rights
            var floor = await _floorRepository.GetFloorAsync(id, true);
            if (floor == null || floor.Location.OwnerId != user.Id)
            {
                return false;
            }

            await _fileStorageService.DeleteFileAsync(ConcatHelper.GetFloorFileName(floor.LocationId, floor.FloorId, floor.IsSvg));

            await _floorRepository.DeleteAsync(floor);
            return true;
        }

        /// <summary>
        /// Get floor image.
        /// </summary>
        /// <param name="id">Floor id.</param>
        /// <param name="userEmail">Current user email.</param>
        /// <returns></returns>
        public async Task<(Stream, string)> GetFloorImage(Guid id, string userEmail)
        {
            var floor = await _floorRepository.GetFloorAsync(id, true);

            // Return if no floor found
            if (floor == null)
            {
                return (null, null);
            }

            // Check if parent location is public
            if (!floor.Location.IsPublic)
            {
                // Check for authorization if private
                var user = await _accountManager.GetAccountInfoAsync(userEmail);
                if (user == null || floor.Location.OwnerId != user.Id)
                {
                    return (null, null);
                }
            }

            var fileStream = await _fileStorageService.ReadFileAsync(ConcatHelper.GetFloorFileName(floor.LocationId, id, floor.IsSvg));
            if (fileStream == null)
            {
                return (null, null);
            }

            return (fileStream, floor.IsSvg ? "image/svg+xml" : "image/png");
        }
    }
}
