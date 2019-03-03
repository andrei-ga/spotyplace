﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Spotyplace.Entities.Models
{
    public class Location
    {
        /// <summary>
        /// Id of location.
        /// </summary>
        [Key]
        public Guid LocationId { get; set; }

        /// <summary>
        /// Id of user who has full rights of the location.
        /// </summary>
        [Required]
        public Guid OwnerId { get; set; }

        /// <summary>
        /// Name of location.
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        /// <summary>
        /// True if anyone with the link can see it.
        /// </summary>
        [Required]
        public bool IsPublic { get; set; }

        /// <summary>
        /// True if users can search for the location.
        /// </summary>
        [Required]
        public bool IsSearchable { get; set; }

        /// <summary>
        /// User who has full rights of the location.
        /// </summary>
        [Required]
        public ApplicationUser Owner { get; set; }

        /// <summary>
        /// Floors of location.
        /// </summary>
        public ICollection<Floor> Floors { get; set; }
    }
}
