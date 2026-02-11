namespace TripPlanningService.Infrastructure.Data.EntitiesConfigurations
{
    public class TripsCollaboratorsConfigurations : IEntityTypeConfiguration<TripCollaborator>
    {
        public void Configure(EntityTypeBuilder<TripCollaborator> builder)
        {
            builder.ToTable("TripsCollaborators");
            builder.HasKey(tc => new {tc.Id, tc.TripId});

            builder.Property(a => a.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => TripCollaboratorId.Of(value));

            builder.Property(a => a.TripId)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => TripId.Of(value));
        }
    }
}
