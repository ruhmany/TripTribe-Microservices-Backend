namespace TripPlanningService.Domain.ValueObjects
{
    public record DateRange(DateOnly Start, DateOnly End)
    {
        public int TotalDays => (End.DayNumber - Start.DayNumber) + 1;
    }
}
