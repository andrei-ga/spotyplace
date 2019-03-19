using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class LocationDto
    {
        /// <summary>
        /// Id of location.
        /// </summary>
        public Guid LocationId { get; set; }

        /// <summary>
        /// Id of user who has full rights of the location.
        /// </summary>
        public Guid OwnerId { get; set; }

        /// <summary>
        /// Name of location.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// If true then anyone with the link can see it.
        /// </summary>
        public bool IsPublic { get; set; }

        /// <summary>
        /// If true then users can search for the location.
        /// </summary>
        public bool IsSearchable { get; set; }

        /// <summary>
        /// User who has full rights of the location.
        /// </summary>
        public UserDto Owner { get; set; }

        /// <summary>
        /// Date when location was created.
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Date when location was last modified.
        /// </summary>
        public DateTime ModifiedAt { get; set; }

        /// <summary>
        /// Floors of location.
        /// </summary>
        public ICollection<FloorDto> Floors { get; set; }

        public LocationDto() { }

        public LocationDto(Location location)
        {
            this.LocationId = location.LocationId;
            this.OwnerId = location.OwnerId;
            this.Name = location.Name;
            this.IsPublic = location.IsPublic;
            this.IsSearchable = location.IsSearchable;
            this.CreatedAt = location.CreatedAt;
            this.ModifiedAt = location.ModifiedAt;

            if (location.Owner != null)
            {
                this.Owner = new UserDto
                {
                    Id = location.Owner.Id,
                    Email = location.Owner.Email,
                    FullName = location.Owner.FullName
                };
            }

            this.Floors = new List<FloorDto>();
            if(location.Floors != null)
            {
                foreach(var floor in location.Floors)
                {
                    this.Floors.Add(new FloorDto());
                }
            }
        }
    }
}
