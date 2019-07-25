using ChargeBee.Models;
using System;
using System.Collections.Generic;
using System.Text;
using static ChargeBee.Models.Plan;

namespace Spotyplace.Entities.DTOs
{
    public class SubscriptionPlanDto
    {
        /// <summary>
        /// A unique ID for your system to identify the plan.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The price of the plan.
        /// </summary>
        public int? Price { get; set; }

        /// <summary>
        /// Defines billing frequency.
        /// </summary>
        public int Period { get; set; }

        /// <summary>
        /// Defines billing frequency in association with billing period.
        /// </summary>
        public PeriodUnitEnum PeriodUnit { get; set; }

        /// <summary>
        /// The free time window for your customer to try your product.
        /// </summary>
        public int? TrialPeriod { get; set; }

        /// <summary>
        /// Time unit for the trial period.
        /// </summary>
        public TrialPeriodUnitEnum? TrialPeriodUnit { get; set; }

        public SubscriptionPlanDto() { }

        public SubscriptionPlanDto(Plan plan)
        {
            this.Id = plan.Id;
            this.Price = plan.Price;
            this.Period = plan.Period;
            this.PeriodUnit = plan.PeriodUnit;
            this.TrialPeriod = plan.TrialPeriod;
            this.TrialPeriodUnit = plan.TrialPeriodUnit;
        }
    }
}
