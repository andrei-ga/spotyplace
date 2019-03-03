using Microsoft.AspNetCore.Identity;
using Spotyplace.Entities.DTOs;
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

        public AccountManager(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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
        public async Task<UserInfo> GetAccountInfoAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }

            return new UserInfo()
            {
                Email = user.Email,
                FullName = user.FullName,
                Id = user.Id
            };
        }
    }
}
