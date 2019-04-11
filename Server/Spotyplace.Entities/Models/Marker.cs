using Spotyplace.Entities.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Spotyplace.Entities.Models
{
    public class Marker
    {
        /// <summary>
        /// Marker id.
        /// </summary>
        [Key]
        public Guid MarkerId { get; set; }

        /// <summary>
        /// Id of parent floor.
        /// </summary>
        [Required]
        public Guid FloorId { get; set; }

        /// <summary>
        /// Marker type.
        /// </summary>
        [Required]
        public string Type { get; set; }

        /// <summary>
        /// Marker coordinates.
        /// </summary>
        [Required]
        public string Coordinates { get; set; }

        /// <summary>
        /// Marker tooltip text.
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string TooltipContent { get; set; }

        /// <summary>
        /// Marker radius.
        /// </summary>
        [Required]
        public float Radius { get; set; }

        /// <summary>
        /// Parent floor.
        /// </summary>
        [Required]
        public Floor Floor { get; set; }

        public Marker() { }

        public Marker(MarkerDto marker)
        {
            this.Type = marker.Type;
            this.Coordinates = marker.Coordinates;
            this.TooltipContent = marker.TooltipContent;
            this.Radius = marker.Radius;
        }
    }
}
