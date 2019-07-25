using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.Models
{
    public class PublicUserLocation
    {
        /// <summary>
        /// Id of user.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Id of location.
        /// </summary>
        public Guid LocationId { get; set; }

        /// <summary>
        /// User entity.
        /// </summary>
        public ApplicationUser User { get; set; }

        /// <summary>
        /// Location entity.
        /// </summary>
        public Location Location { get; set; }
    }
}
