using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Spotyplace.Entities.Models
{
    public class Floor
    {
        /// <summary>
        /// Id of floor.
        /// </summary>
        [Key]
        public Guid FloorId { get; set; }

        /// <summary>
        /// Id of parent location.
        /// </summary>
        [Required]
        public Guid LocationId { get; set; }

        /// <summary>
        /// Name of floor.
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        /// <summary>
        /// Parent location.
        /// </summary>
        [Required]
        public Location Location { get; set; }
    }
}
