using System.Globalization;

namespace TripPlanningService.Domain.ValueObjects
{
    public record Money
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        private Money(decimal amount, string currency)
        {
            Amount = amount;
            Currency = currency;
        }

        public static Money Create(decimal amount, string currency)
        {
            if (amount < 0)
                throw new ArgumentOutOfRangeException("Money Amount Must Be More Than 0");
            return new Money(amount, currency);
        }
    }
}
