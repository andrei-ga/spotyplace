using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public interface ILocationRepository
    {
        /// <summary>
        /// Create a new location.
        /// </summary>
        /// <param name="location">Location model.</param>
        /// <returns></returns>
        Task CreateAsync(Location location);

        /// <summary>
        /// Get list of locations owned by specific user.
        /// </summary>
        /// <param name="userId">User id.</param>
        /// <param name="includeFloors">True if should include floors of the location.</param>
        /// <returns></returns>
        Task<IEnumerable<Location>> GetOfUserAsync(Guid userId, bool includeFloors);
    }
}
