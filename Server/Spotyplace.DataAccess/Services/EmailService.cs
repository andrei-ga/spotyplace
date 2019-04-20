using Microsoft.Extensions.Options;
using Spotyplace.Entities.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpOptions _smtpOptions;

        public EmailService(IOptionsMonitor<SmtpOptions> smtpOptions)
        {
            _smtpOptions = smtpOptions.CurrentValue;
        }

        public async Task SendEmail(string subject, string body, IEnumerable<string> to)
        {
            using (var message = new MailMessage())
            {
                message.From = new MailAddress(_smtpOptions.From);
                message.To.Add(string.Join(",", to));
                message.Subject = subject;
                message.Body = body;
                message.IsBodyHtml = true;

                using (var client = new SmtpClient(_smtpOptions.Address))
                {
                    client.Port = 587;
                    client.Credentials = new NetworkCredential(_smtpOptions.User, _smtpOptions.Password);
                    client.EnableSsl = true;
                    await client.SendMailAsync(message);
                }
            }
        }
    }
}
