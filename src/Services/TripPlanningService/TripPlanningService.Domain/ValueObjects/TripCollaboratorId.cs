using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Domain.ValueObjects
{
    public record TripCollaboratorId
    {
        public Guid Value { get; set; }

        private TripCollaboratorId(Guid value) => Value = value;

        public static TripCollaboratorId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("OrderId cannot be empty.");
            }

            return new TripCollaboratorId(value);
        }
    }
}
