﻿using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public interface ILocationRepository
    {
        /// <summary>
        /// Create new location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <returns></returns>
        Task CreateAsync(Location location);

        /// <summary>
        /// Get list of locations owned by specific user.
        /// </summary>
        /// <param name="userId">User id.</param>
        /// <param name="includeFloors">True if should include floors of the location.</param>
        /// <param name="includePublicUsers">True if should include public users assigned to location.</param>
        /// <returns></returns>
        Task<IEnumerable<Location>> GetOfUserAsync(Guid userId, bool includeFloors, bool includePublicUsers);

        /// <summary>
        /// Get specific location.
        /// </summary>
        /// <param name="id">Location id.</param>
        /// <param name="includeFloors">True if should include floors of the location.</param>
        /// <param name="includePublicUsers">True if should include public users assigned to location.</param>
        /// <param name="tracking">True if should enable tracking changes.</param>
        /// <returns></returns>
        Task<Location> GetLocationAsync(Guid id, bool includeFloors, bool includePublicUsers, bool tracking);

        /// <summary>
        /// Update location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <returns></returns>
        Task EditAsync(Location location);

        /// <summary>
        /// Delete location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <returns></returns>
        Task DeleteAsync(Location location);

        /// <summary>
        /// Get locations matching keyword.
        /// </summary>
        /// <param name="keyword">Keyword to match.</param>
        /// <param name="userId">Current user id.</param>
        /// <param name="userDomain">Current user domain.</param>
        /// <returns></returns>
        Task<ICollection<Location>> GetLocationsAsync(string keyword, Guid userId, string userDomain);

        /// <summary>
        /// Get latest locations.
        /// </summary>
        /// <param name="userId">Current user id.</param>
        /// <param name="userDomain">Current user domain.</param>
        /// <returns></returns>
        Task<ICollection<Location>> GetLatestLocationsAsync(Guid userId, string userDomain);
    }
}
