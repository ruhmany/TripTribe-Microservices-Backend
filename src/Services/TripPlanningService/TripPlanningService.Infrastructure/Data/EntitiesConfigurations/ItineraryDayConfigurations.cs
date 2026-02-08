namespace TripPlanningService.Infrastructure.Data.EntitiesConfigurations
{
    public class ItineraryDayConfigurations : IEntityTypeConfiguration<ItineraryDay>
    {
        public void Configure(EntityTypeBuilder<ItineraryDay> builder)
        {
            builder.HasKey(a => a.Id);

            builder.Property(a => a.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => ItineraryDayId.Of(value));

            builder.HasMany(d => d.Activities)
                .WithOne()
                .HasForeignKey(a => a.DayId);
        }
    }
}
