using Microsoft.Extensions.Options;
using Spotyplace.DataAccess.Services;
using Spotyplace.Entities.Config;
using Spotyplace.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.Business.Managers
{
    public class ReportManager
    {
        private readonly IEmailService _emailService;
        private readonly AdminOptions _adminOptions;

        public ReportManager(IEmailService emailService, IOptionsMonitor<AdminOptions> adminOptions)
        {
            _emailService = emailService;
            _adminOptions = adminOptions.CurrentValue;
        }

        public async Task ReportItem(ReportReasonEnum reportReason, string url, string userEmail)
        {
            string title = "[Report] Item reported";
            string emailBody = string.Format("The following item has been reported<br><br><a href='{0}'>{0}</a><br><br>Reason for the report: {1}<br><br>User who reported the item: ", url, reportReason.ToString());
            emailBody += string.IsNullOrEmpty(userEmail) ? "anonymous" : userEmail;

            await _emailService.SendEmail(title, emailBody, _adminOptions.Users);
        }
    }
}
