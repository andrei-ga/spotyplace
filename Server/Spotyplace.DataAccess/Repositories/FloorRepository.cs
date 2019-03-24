using Microsoft.EntityFrameworkCore;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<Floor> GetFloorAsync(Guid id, bool includeLocation)
        {
            var query = _db.Floors
                .AsNoTracking()
                .Where(e => e.FloorId == id)
                .AsQueryable();

            if (includeLocation)
            {
                query = query.Include(e => e.Location);
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task DeleteAsync(Floor floor)
        {
            _db.Remove(floor);
            await _db.SaveChangesAsync();
        }
    }
}
