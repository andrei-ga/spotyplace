using Microsoft.EntityFrameworkCore;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CoreContext _db;

        public UserRepository(CoreContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<ApplicationUser>> SearchUsersAsync(string keyword)
        {
            var query = _db.Users
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(e => EF.Functions.ILike(e.FullName, string.Format("%{0}%", keyword)) || EF.Functions.ILike(e.Email, string.Format("%{0}%", keyword)));
            }
            
            return await query
                .OrderBy(e => e.FullName)
                .Take(10)
                .ToListAsync();
        }
    }
}
