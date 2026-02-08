namespace TripPlanningService.Infrastructure.Data.EntitiesConfigurations
{
    public class TripCollaboratorsConfigurations : IEntityTypeConfiguration<TripCollaborator>
    {
        public void Configure(EntityTypeBuilder<TripCollaborator> builder)
        {
            builder.HasKey(tc => tc.Id);
            builder.Property(a => a.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => TripCollaboratorId.Of(value));
        }
    }
}
