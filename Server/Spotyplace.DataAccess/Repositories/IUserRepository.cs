using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Repositories
{
    public interface IUserRepository
    {
        /// <summary>
        /// Search for users by keyword.
        /// </summary>
        /// <param name="keyword">Keyword to match.</param>
        /// <returns></returns>
        Task<IEnumerable<ApplicationUser>> SearchUsersAsync(string keyword);
    }
}
