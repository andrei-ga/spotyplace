using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public interface IMarkerRepository
    {
        /// <summary>
        /// Get markers matching keywords.
        /// </summary>
        /// <param name="locationId">Location id to search markers within.</param>
        /// <param name="keyword">Keyword to match.</param>
        /// <returns></returns>
        Task<ICollection<Marker>> GetMarkersAsync(Guid locationId, string keyword);
    }
}
