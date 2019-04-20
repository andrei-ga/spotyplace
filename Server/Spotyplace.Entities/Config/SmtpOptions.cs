using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.Config
{
    public class SmtpOptions
    {
        /// <summary>
        /// Server address.
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// User to authenticate.
        /// </summary>
        public string User { get; set; }

        /// <summary>
        /// Default sender address.
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// Password to authenticate.
        /// </summary>
        public string Password { get; set; }
    }
}
