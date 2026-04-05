namespace TripPlanningService.Application.CQRS.CommandsHandlers.ActivityCommandsHandlers
{
    public class AddActivityToDayCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<AddActivityToDayCommand, bool>
    {
        public async Task<bool> Handle(AddActivityToDayCommand request, CancellationToken cancellationToken)
        {
            // get the trip and the day
            var tripId = TripId.Of(request.AddActivityToDayDTO.TripId);
            var trip = await dbContext.Trips.Include(t => t.Days).FirstOrDefaultAsync(t => t.Id == tripId);
            var dayId = ItineraryDayId.Of(request.AddActivityToDayDTO.DayId);
            var ownerId = TripOwnerId.Of(request.AddActivityToDayDTO.OwnerId);


            var location = Location.Create(request.AddActivityToDayDTO.LocationName, request.AddActivityToDayDTO.Latitude, request.AddActivityToDayDTO.Longitude);  
            var money = Money.Create(request.AddActivityToDayDTO.Amount, request.AddActivityToDayDTO.Currency);
            var activity = Activity.Create(request.AddActivityToDayDTO.Title, request.AddActivityToDayDTO.Notes, request.AddActivityToDayDTO.StartTime, request.AddActivityToDayDTO.EndTime, location, request.AddActivityToDayDTO.ActivityType, money);
            activity.Id = ActivityId.Of(Guid.NewGuid());
            trip.AddActivity(dayId, ownerId, activity);

            return await dbContext.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
