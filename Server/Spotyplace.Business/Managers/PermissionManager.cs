using Microsoft.Extensions.Options;
using Spotyplace.Entities.Config;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Spotyplace.Business.Managers
{
    public class PermissionManager
    {
        private readonly AdminOptions _adminOptions;

        public PermissionManager(IOptionsMonitor<AdminOptions> adminOptions)
        {
            _adminOptions = adminOptions.CurrentValue;
        }

        /// <summary>
        /// Check if specific user is admin.
        /// </summary>
        /// <param name="userEmail">User email.</param>
        /// <returns></returns>
        public bool IsUserAdmin(string userEmail)
        {
            if (_adminOptions.Users == null)
            {
                return false;
            }

            return _adminOptions.Users.IndexOf(userEmail) != -1;
        }

        /// <summary>
        /// Check if specific user can edit specific location.
        /// </summary>
        /// <param name="user">User.</param>
        /// <param name="location">Location.</param>
        /// <returns></returns>
        public bool CanEditLocation(ApplicationUser user, Location location)
        {
            return user != null && location != null && (location.OwnerId == user.Id || IsUserAdmin(user.Email));
        }

        /// <summary>
        /// Check if specific user can view specific location.
        /// </summary>
        /// <param name="user">User.</param>
        /// <param name="location">Location.</param>
        /// <returns></returns>
        public bool CanViewLocation(ApplicationUser user, Location location)
        {
            return user != null && location != null && (location.IsPublic || location.OwnerId == user.Id || IsUserAdmin(user.Email) || (location.PublicUserLocations != null && location.PublicUserLocations.Any(e => e.UserId == user.Id)));
        }
    }
}
