namespace TripPlanningService.Infrastructure.Data.EntitiesConfigurations
{
    public class ActivityConfigurations : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.HasKey(a => a.Id);

            builder.Property(a => a.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => ActivityId.Of(value));

            builder.Property(a => a.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(a => a.Notes)
                .IsRequired()
                .HasMaxLength(2000);

            builder.ComplexProperty(activity => activity.Location, loc =>
            {
                loc.Property(l => l.Name)
                    .HasColumnName("Location_Name")
                    .IsRequired()
                    .HasMaxLength(200);

                loc.Property(l => l.Latitude)
                    .HasColumnName("Location_Latitude")
                    .IsRequired();

                loc.Property(l => l.Longitude)  // Fixed: was Latitude again
                    .HasColumnName("Location_Longitude")
                    .IsRequired();
            });

            // EstimatedCost owned entity
            builder.ComplexProperty(a => a.EstimatedCost, money =>
            {
                money.Property(m => m.Amount)
                    .HasColumnName("EstimatedCostAmount")
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                money.Property(m => m.Currency)
                    .HasColumnName("EstimatedCostCurrency")
                    .HasMaxLength(3)
                    .IsRequired();
            });

            // TimeOnly conversions with null handling
            builder.Property(a => a.StartTime)
                .HasConversion(
                    t => t.HasValue ? t.Value.ToTimeSpan() : (TimeSpan?)null,
                    ts => ts.HasValue ? TimeOnly.FromTimeSpan(ts.Value) : (TimeOnly?)null);

            builder.Property(a => a.EndTime)
                .HasConversion(
                    t => t.HasValue ? t.Value.ToTimeSpan() : (TimeSpan?)null,
                    ts => ts.HasValue ? TimeOnly.FromTimeSpan(ts.Value) : (TimeOnly?)null);

            builder.Property(a => a.Type)
                .HasConversion<string>()
                .IsRequired();
        }
    }
}
