using ChargeBee.Models;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using static ChargeBee.Models.Plan;

namespace Spotyplace.Entities.DTOs
{
    [DataContract]
    public class SubscriptionPlanDto
    {
        /// <summary>
        /// A unique ID for your system to identify the plan.
        /// </summary>
        [DataMember]
        string Id { get; set; }

        /// <summary>
        /// The display name used in web interface for identifying the plan.
        /// </summary>
        [DataMember]
        string Name { get; set; }

        /// <summary>
        /// The price of the plan.
        /// </summary>
        [DataMember]
        int? Price { get; set; }

        /// <summary>
        /// Defines billing frequency.
        /// </summary>
        [DataMember]
        int Period { get; set; }

        /// <summary>
        /// Defines billing frequency in association with billing period.
        /// </summary>
        [DataMember]
        PeriodUnitEnum PeriodUnit { get; set; }

        /// <summary>
        /// The free time window for your customer to try your product.
        /// </summary>
        [DataMember]
        int? TrialPeriod { get; set; }

        /// <summary>
        /// Time unit for the trial period.
        /// </summary>
        [DataMember]
        TrialPeriodUnitEnum? TrialPeriodUnit { get; set; }

        public SubscriptionPlanDto() { }

        public SubscriptionPlanDto(Plan plan)
        {
            this.Id = plan.Id;
            this.Name = plan.Name;
            this.Price = plan.Price;
            this.Period = plan.Period;
            this.PeriodUnit = plan.PeriodUnit;
            this.TrialPeriod = plan.TrialPeriod;
            this.TrialPeriodUnit = plan.TrialPeriodUnit;
        }
    }
}
