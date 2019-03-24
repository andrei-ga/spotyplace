using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public interface IFloorRepository
    {
        /// <summary>
        /// Get specific floor.
        /// </summary>
        /// <param name="id">Floor id.</param>
        /// <param name="includeLocation">True if should include parent location.</param>
        /// <returns></returns>
        Task<Floor> GetFloorAsync(Guid id, bool includeLocation);

        /// <summary>
        /// Delete floor.
        /// </summary>
        /// <param name="floor">Floor model.</param>
        /// <returns></returns>
        Task DeleteAsync(Floor floor);
    }
}
