using Spotyplace.DataAccess.Repositories;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class LocationManager
    {
        public readonly LocationRepository _locationRepository;
        private readonly AccountManager _accountManager;

        public LocationManager(LocationRepository locationRepository, AccountManager accountManager)
        {
            _locationRepository = locationRepository;
            _accountManager = accountManager;
        }

        /// <summary>
        /// Create a new location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public async Task<bool> CreateLocationAsync(Location location, string userEmail)
        {
            // Get current user id.
            var user = await _accountManager.GetAccountInfoAsync(userEmail);
            if (user == null)
            {
                return false;
            }

            location.OwnerId = user.Id;
            await _locationRepository.CreateAsync(location);

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
    }
}
