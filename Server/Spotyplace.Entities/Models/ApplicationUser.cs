using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Spotyplace.Entities.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        /// <summary>
        /// Full name of user.
        /// </summary>
        [MaxLength(150)]
        public string FullName { get; set; }

        /// <summary>
        /// Chargebee customer id.
        /// </summary>
        [MaxLength(50)]
        public string ChargebeeId { get; set; }

        /// <summary>
        /// Chargebee subscription id.
        /// </summary>
        [MaxLength(50)]
        public string ChargebeeSubscriptionId { get; set; }

        /// <summary>
        /// Locations the user has full rights of.
        /// </summary>
        public ICollection<Location> Locations { get; set; }
    }
}
