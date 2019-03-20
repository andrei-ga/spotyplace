using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class FloorCreateRequestDto
    {
        /// <summary>
        /// Name of location.
        /// </summary>
        public string Name { get; set; }

        public FloorCreateRequestDto() { }

        public FloorCreateRequestDto(IFormCollection form)
        {
            this.Name = form["name"];
        }
    }
}
