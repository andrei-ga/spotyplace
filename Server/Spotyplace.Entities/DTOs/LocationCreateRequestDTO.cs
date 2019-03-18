using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class LocationCreateRequestDTO
    {
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
    }
}
