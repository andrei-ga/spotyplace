using ChargeBee.Models;
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
        /// Locations the user has full rights of.
        /// </summary>
        public ICollection<Location> Locations { get; set; }

        /// <summary>
        /// Identifier of the customer.
        /// </summary>
        [MaxLength(50)]
        public string ChargebeeId { get; set; }

        /// <summary>
        /// Customer subscription plan id of the subscription.
        /// </summary>
        [MaxLength(100)]
        public string ChargebeePlanId { get; set; }

        /// <summary>
        /// Current state of the subscription.
        /// </summary>
        public Subscription.StatusEnum? ChargebeeSubscriptionStatus { get; set; }

        /// <summary>
        /// Public user locations.
        /// </summary>
        public ICollection<PublicUserLocation> PublicUserLocations { get; set; }
    }
}
