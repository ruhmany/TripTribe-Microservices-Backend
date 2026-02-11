
namespace TripPlanningService.Infrastructure.Data.EntitiesConfigurations
{
    public class TripConfigurations : IEntityTypeConfiguration<Trip>
    {
        public void Configure(EntityTypeBuilder<Trip> builder)
        {
            builder.ToTable("Trips");
            builder.HasKey(t => t.Id);

            
            builder.Property(t => t.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => TripId.Of(value));

            
            builder.Property(t => t.OwnerId)
                .HasConversion(
                    id => id.Value,
                    value => TripOwnerId.Of(value))
                .IsRequired()
                .HasColumnName("OwnerId");

            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(70);

            builder.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(700);

            builder.Property(t => t.Visibility)
                .HasConversion<string>();

            builder.Property(t => t.Status)
                .HasConversion<string>();

            builder.ComplexProperty(t => t.DateRange, dr =>
            {
                dr.Property(d => d.Start)
                    .HasColumnName("StartDate")
                    .IsRequired();
                dr.Property(d => d.End)
                    .HasColumnName("EndDate")
                    .IsRequired();
            });
            builder.HasMany<ItineraryDay>(t => t.Days)
                .WithOne()
                .HasForeignKey(d => d.TripId);
        }
    }
}
