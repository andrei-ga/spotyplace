using Microsoft.EntityFrameworkCore;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public class MarkerRepository : IMarkerRepository
    {
        private readonly CoreContext _db;

        public MarkerRepository(CoreContext db)
        {
            _db = db;
        }

        public async Task<ICollection<Marker>> GetMarkersAsync(Guid locationId, string keyword)
        {
            return await _db.Markers
                .AsNoTracking()
                .Include(e => e.Floor)
                .Where(e => e.Floor.LocationId == locationId && EF.Functions.ILike(e.TooltipContent, string.Format("%{0}%", keyword)))
                .OrderBy(e => e.TooltipContent)
                .Take(10)
                .ToListAsync();
        }
    }
}
