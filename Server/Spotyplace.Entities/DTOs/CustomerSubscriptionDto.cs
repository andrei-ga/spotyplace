using ChargeBee.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class CustomerSubscriptionDto
    {
        /// <summary>
        /// Identifier of the plan for this subscription.
        /// </summary>
        public string PlanId { get; set; }

        public CustomerSubscriptionDto() { }

        public CustomerSubscriptionDto(Subscription subscription)
        {
            if (subscription != null)
            {
                this.PlanId = subscription.PlanId;
            }
        }
    }
}
