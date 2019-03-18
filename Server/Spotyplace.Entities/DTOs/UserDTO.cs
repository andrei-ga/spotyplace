using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class UserDTO
    {
        /// <summary>
        /// Full name of user.
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Email of user.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Id of user.
        /// </summary>
        public Guid Id { get; set; }

        public UserDTO() { }

        public UserDTO(ApplicationUser user)
        {
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Id = user.Id;
        }
    }
}
