using Microsoft.EntityFrameworkCore;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public class FloorRepository : IFloorRepository
    {
        private readonly CoreContext _db;

        public FloorRepository(CoreContext db)
        {
            _db = db;
        }

        public async Task<Floor> GetFloorAsync(Guid id, bool includeLocation, bool includeMarkers, bool tracking, CancellationToken cancellationToken = default)
        {
            var query = _db.Floors
                .Where(e => e.FloorId == id)
                .AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }
            if (includeLocation)
            {
                query = query.Include(e => e.Location);
            }
            if (includeMarkers)
            {
                query = query.Include(e => e.Markers);
            }

            return await query.FirstOrDefaultAsync(cancellationToken);
        }

        public async Task EditAsync(Floor floor)
        {
            _db.Update(floor);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(Floor floor)
        {
            _db.Remove(floor);
            await _db.SaveChangesAsync();
        }
    }
}
