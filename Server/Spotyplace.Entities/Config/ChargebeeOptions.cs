using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.Config
{
    public class ChargebeeOptions
    {
        /// <summary>
        /// Chargebee site id.
        /// </summary>
        public string SiteId { get; set; }

        /// <summary>
        /// CHargebee api key.
        /// </summary>
        public string ApiKey { get; set; }
    }
}
