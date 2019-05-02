using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class LocationCreateRequestDto
    {
        /// <summary>
        /// Name of location.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// If true then anyone with the link can see the location.
        /// </summary>
        public bool IsPublic { get; set; }

        /// <summary>
        /// If true then users can search for the location.
        /// </summary>
        public bool IsSearchable { get; set; }

        /// <summary>
        /// If true then selected users can see the location.
        /// </summary>
        public bool IsPublicToSelected { get; set; }

        /// <summary>
        /// If true then users can search for markers within location.
        /// </summary>
        public bool IsSearchableMarkers { get; set; }

        /// <summary>
        /// Domain group that can see the location.
        /// </summary>
        public string PublicSelectedGroup { get; set; }

        /// <summary>
        /// Public selected users.
        /// </summary>
        public ICollection<UserDto> PublicSelectedUsers { get; set; }
    }
}
