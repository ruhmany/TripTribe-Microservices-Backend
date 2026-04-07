namespace TripPlanningService.Application.CQRS.CommandsHandlers.ActivityCommandsHandlers
{
    public class UpdateActivityCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateActivityCommand, bool>
    {
        public async Task<bool> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
        {
            var tripId = TripId.Of(request.EditActivityDTO.TripId);
            var trip = await dbContext.Trips.Include(t => t.Days).ThenInclude(d => d.Activities).FirstOrDefaultAsync(t => t.Id == tripId);
            var dayId = ItineraryDayId.Of(request.EditActivityDTO.DayId);
            var ownerId = TripOwnerId.Of(request.EditActivityDTO.OwnerId);
            var activityId = ActivityId.Of(request.EditActivityDTO.activityId.Value);


            var location = Location.Create(request.EditActivityDTO.LocationName, request.EditActivityDTO.Latitude, request.EditActivityDTO.Longitude);  
            var money = Money.Create(request.EditActivityDTO.Amount, request.EditActivityDTO.Currency);
            
            trip.UpdateActivity(dayId, activityId ,ownerId, request.EditActivityDTO.Title, request.EditActivityDTO.Notes, request.EditActivityDTO.StartTime, request.EditActivityDTO.EndTime, request.EditActivityDTO.ActivityType, money, location);

            return await dbContext.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
