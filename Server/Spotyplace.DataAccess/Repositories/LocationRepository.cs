using Microsoft.EntityFrameworkCore;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public class LocationRepository: ILocationRepository
    {
        private readonly CoreContext _db;

        public LocationRepository(CoreContext db)
        {
            _db = db;
        }

        public async Task CreateAsync(Location location)
        {
            await _db.AddAsync(location);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Location>> GetOfUserAsync(Guid userId, bool includeFloors)
        {
            var query = _db.Locations.AsNoTracking().Where(e => e.OwnerId == userId).AsQueryable();
            if (includeFloors)
            {
                query = query.Include(e => e.Floors);
            }

            return await query.ToListAsync();
        }
    }
}
