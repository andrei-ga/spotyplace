using Spotyplace.Entities.DTOs;
using System;
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
        /// If true then anyone with the link can see the location.
        /// </summary>
        [Required]
        public bool IsPublic { get; set; }

        /// <summary>
        /// If true then users can search for the location.
        /// </summary>
        [Required]
        public bool IsSearchable { get; set; }

        /// <summary>
        /// If true then selected users can see the location.
        /// </summary>
        [Required]
        public bool IsPublicToSelected { get; set; }

        /// <summary>
        /// If true then users can search for markers within location.
        /// </summary>
        [Required]
        public bool IsSearchableMarkers { get; set; }

        /// <summary>
        /// User who has full rights of the location.
        /// </summary>
        [Required]
        public ApplicationUser Owner { get; set; }

        /// <summary>
        /// Date when location was created.
        /// </summary>
        [Required]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Date when location was last modified.
        /// </summary>
        [Required]
        public DateTime ModifiedAt { get; set; }

        /// <summary>
        /// Floors of location.
        /// </summary>
        public ICollection<Floor> Floors { get; set; }

        /// <summary>
        /// Public user locations.
        /// </summary>
        public ICollection<PublicUserLocation> PublicUserLocations { get; set; }

        public Location() { }

        public Location(LocationCreateRequestDto loc)
        {
            this.Name = loc.Name;
            this.IsPublic = loc.IsPublic;
            this.IsSearchable = loc.IsSearchable;
            this.IsPublicToSelected = loc.IsPublicToSelected;
            this.IsSearchableMarkers = loc.IsSearchableMarkers;
        }
    }
}
