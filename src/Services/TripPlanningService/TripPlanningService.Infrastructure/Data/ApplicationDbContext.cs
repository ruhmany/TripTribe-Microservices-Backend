using System.Reflection;

namespace TripPlanningService.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
        public DbSet<Trip> Trips => Set<Trip>();

        public DbSet<ItineraryDay> ItineraryDays => Set<ItineraryDay>();

        public DbSet<Activity> Activities => Set<Activity>();

        public DbSet<TripCollaborator> TripCollaborators => Set<TripCollaborator>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
