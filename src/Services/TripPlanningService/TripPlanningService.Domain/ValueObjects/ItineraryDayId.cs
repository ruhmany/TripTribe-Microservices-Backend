using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlanningService.Domain.ValueObjects
{
    public class ItineraryDayId
    {
        public Guid Value { get; set; }

        private ItineraryDayId(Guid value) => Value = value;

        public static TripId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("OrderId cannot be empty.");
            }

            return new ItineraryDayId(value);
        }
    }
}
