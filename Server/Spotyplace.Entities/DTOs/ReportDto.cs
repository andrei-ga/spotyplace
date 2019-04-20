using Spotyplace.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class ReportDto
    {
        /// <summary>
        /// Report reason.
        /// </summary>
        public ReportReasonEnum ReportReason { get; set; }
    }
}
