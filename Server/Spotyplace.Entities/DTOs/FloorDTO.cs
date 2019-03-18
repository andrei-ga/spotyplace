using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class FloorDTO
    {
        /// <summary>
        /// Id of floor.
        /// </summary>
        public Guid FloorId { get; set; }

        /// <summary>
        /// Id of parent location.
        /// </summary>
        public Guid LocationId { get; set; }

        /// <summary>
        /// Name of floor.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Parent location.
        /// </summary>
        public LocationDTO Location { get; set; }

        /// <summary>
        /// Date when floor was created.
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Date when floor was last modified.
        /// </summary>
        public DateTime ModifiedAt { get; set; }

        public FloorDTO() { }

        public FloorDTO(Floor floor)
        {
            this.FloorId = floor.FloorId;
            this.LocationId = floor.LocationId;
            this.Name = floor.Name;
            this.CreatedAt = floor.CreatedAt;
            this.ModifiedAt = floor.ModifiedAt;

            if (floor.Location != null)
            {
                this.Location = new LocationDTO(floor.Location);
            }
        }
    }
}
