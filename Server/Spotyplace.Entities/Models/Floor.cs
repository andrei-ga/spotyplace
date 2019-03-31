using Spotyplace.Entities.DTOs;
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
        /// True if map is in svg format.
        /// </summary>
        [Required]
        public bool IsSvg { get; set; }

        /// <summary>
        /// Base image width.
        /// </summary>
        [Required]
        [MaxLength(5)]
        public int MapWidth { get; set; }

        /// <summary>
        /// Base image height.
        /// </summary>
        [Required]
        [MaxLength(5)]
        public int MapHeight { get; set; }

        /// <summary>
        /// Date when floor was created.
        /// </summary>
        [Required]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Date when floor was last modified.
        /// </summary>
        [Required]
        public DateTime ModifiedAt { get; set; }

        /// <summary>
        /// Parent location.
        /// </summary>
        [Required]
        public Location Location { get; set; }

        /// <summary>
        /// Floor markers.
        /// </summary>
        public ICollection<Marker> Markers { get; set; }

        public Floor() { }

        public Floor(FloorCreateRequestDto floor)
        {
            this.Name = floor.Name;
        }
    }
}
