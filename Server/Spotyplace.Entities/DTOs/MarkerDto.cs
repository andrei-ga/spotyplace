using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class MarkerDto
    {
        /// <summary>
        /// Marker type.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Marker coordinates.
        /// </summary>
        public string Coordinates { get; set; }

        /// <summary>
        /// Marker tooltip text.
        /// </summary>
        public string TooltipContent { get; set; }

        /// <summary>
        /// Marker radius.
        /// </summary>
        public float Radius { get; set; }

        /// <summary>
        /// Floor parent.
        /// </summary>
        public FloorDto Floor { get; set; }

        public MarkerDto() { }

        public MarkerDto(Marker marker, bool recursive = true)
        {
            this.Type = marker.Type;
            this.Coordinates = marker.Coordinates;
            this.TooltipContent = marker.TooltipContent;
            this.Radius = marker.Radius;

            if (marker.Floor != null && recursive)
            {
                this.Floor = new FloorDto(marker.Floor, false);
            }
        }
    }
}
