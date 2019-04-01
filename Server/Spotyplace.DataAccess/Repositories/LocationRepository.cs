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
            var query = _db.Locations
                .AsNoTracking()
                .Where(e => e.OwnerId == userId)
                .OrderByDescending(e => e.ModifiedAt)
                .AsQueryable();

            if (includeFloors)
            {
                query = query.Include(e => e.Floors);
            }

            return await query.ToListAsync();
        }

        public async Task<Location> GetLocationAsync(Guid id, bool includeFloors)
        {
            var query = _db.Locations
                .AsNoTracking()
                .Where(e => e.LocationId == id)
                .AsQueryable();

            if (includeFloors)
            {
                query = query.Include(e => e.Floors);
            }

            var location = await query.FirstOrDefaultAsync();
            if (location != null && includeFloors)
            {
                location.Floors = location.Floors.OrderBy(f => f.Name).ToList();
            }

            return location;
        }

        public async Task EditAsync(Location location)
        {
            _db.Update(location);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(Location location)
        {
            _db.Remove(location);
            await _db.SaveChangesAsync();
        }

        public async Task<ICollection<Location>> GetLocationsAsync(string keyword, Guid userId)
        {
            return await _db.Locations
                .Where(e => (e.OwnerId == userId || (e.IsPublic && e.IsSearchable)) && EF.Functions.ILike(e.Name, string.Format("%{0}%", keyword)))
                .OrderBy(e => e.Name)
                .Take(10)
                .ToListAsync();
        }
    }
}
