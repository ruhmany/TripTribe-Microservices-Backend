namespace TripPlanningService.Application.Data
{
    public interface IApplicationDbContext
    {
        DbSet<Trip> Trips { get; }
        DbSet<ItineraryDay> ItineraryDays { get; }
        DbSet<Activity> Activities { get; }
        DbSet<TripCollaborator> TripCollaborators { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
