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

        /// <summary>
        /// Redirect URL after logout.
        /// </summary>
        public string RedirectUrl { get; set; }

        /// <summary>
        /// Default user plan id.
        /// </summary>
        public string StarterPlanId { get; set; }
    }
}
