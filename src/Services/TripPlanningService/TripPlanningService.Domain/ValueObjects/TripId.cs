namespace TripPlanningService.Domain.ValueObjects
{
    public record TripId
    {
        public Guid Value { get; set; }

        private TripId(Guid value) => Value = value;

        public static TripId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("OrderId cannot be empty.");
            }

            return new TripId(value);
        }
    }
}
