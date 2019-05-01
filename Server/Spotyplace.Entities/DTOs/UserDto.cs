using ChargeBee.Models;
using Spotyplace.Entities.Enums;
using Spotyplace.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.DTOs
{
    public class UserDto
    {
        /// <summary>
        /// Full name of user.
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Email of user.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Id of user.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Identifier of the customer.
        /// </summary>
        public string ChargebeeId { get; set; }

        /// <summary>
        /// Customer subscription plan id of the subscription.
        /// </summary>
        public string ChargebeePlanId { get; set; }

        /// <summary>
        /// Current state of the subscription.
        /// </summary>
        public Subscription.StatusEnum? ChargebeeSubscriptionStatus { get; set; }

        /// <summary>
        /// User account level.
        /// </summary>
        public UserLevelEnum UserLevel { get; set; }

        public UserDto() { }

        public UserDto(ApplicationUser user)
        {
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Id = user.Id;
        }

        public UserDto(ApplicationUser user, bool populateChargebeeFields)
        {
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Id = user.Id;

            if (populateChargebeeFields)
            {
                this.ChargebeeId = user.ChargebeeId;
                this.ChargebeePlanId = user.ChargebeePlanId;
                this.ChargebeeSubscriptionStatus = user.ChargebeeSubscriptionStatus;
                this.UserLevel = user.ChargebeeSubscriptionStatus == Subscription.StatusEnum.Active ||
                    user.ChargebeeSubscriptionStatus == Subscription.StatusEnum.InTrial ||
                    user.ChargebeeSubscriptionStatus == Subscription.StatusEnum.NonRenewing
                    ? UserLevelEnum.Premium : UserLevelEnum.Free;
            }
        }
    }
}
