using Microsoft.AspNetCore.Identity;
using Spotyplace.DataAccess.Repositories;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class AccountManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;

        public AccountManager(UserManager<ApplicationUser> userManager, IUserRepository userRepository)
        {
            _userManager = userManager;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Create a new user in database. Returns false if not created.
        /// </summary>
        /// <param name="user">User model.</param>
        /// <returns></returns>
        public async Task<bool> CreateAccountAsync(ApplicationUser user)
        {
            var existingUser = await _userManager.FindByEmailAsync(user.Email);
            if (existingUser == null)
            {
                return (await _userManager.CreateAsync(user)).Succeeded;
            }

            return false;
        }

        /// <summary>
        /// Get user info from database. Returns null if user is not found.
        /// </summary>
        /// <param name="email">Email of user.</param>
        /// <returns></returns>
        public async Task<ApplicationUser> GetAccountInfoAsync(string email)
        {
            if (email == null)
            {
                return null;
            }

            return await _userManager.FindByEmailAsync(email);
        }

        /// <summary>
        /// Search for users by keyword.
        /// </summary>
        /// <param name="keyword">Keyword to match.</param>
        /// <returns></returns>
        public async Task<IEnumerable<ApplicationUser>> SearchUsersAsync(string keyword)
        {
            return await _userRepository.SearchUsersAsync(keyword);
        }
    }
}
