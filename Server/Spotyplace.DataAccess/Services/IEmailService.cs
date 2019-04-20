using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Services
{
    public interface IEmailService
    {
        /// <summary>
        /// Send email message.
        /// </summary>
        /// <param name="subject">Email subject.</param>
        /// <param name="body">Email body.</param>
        /// <param name="to">Receiver email address list.</param>
        /// <returns></returns>
        Task SendEmail(string subject, string body, IEnumerable<string> to);
    }
}
