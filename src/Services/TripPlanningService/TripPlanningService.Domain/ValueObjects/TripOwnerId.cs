namespace TripPlanningService.Domain.ValueObjects
{
    public record TripOwnerId
    {
        public Guid Value { get; set; }

        private TripOwnerId(Guid value) => Value = value;

        public static TripOwnerId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("OrderId cannot be empty.");
            }

            return new TripOwnerId(value);
        }
    }
}
