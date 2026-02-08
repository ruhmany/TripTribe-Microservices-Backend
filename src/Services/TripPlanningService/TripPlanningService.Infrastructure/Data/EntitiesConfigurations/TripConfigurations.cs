
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

            // IMPORTANT: Trip is an aggregate root
            // ItineraryDays and TripCollaborators are part of this aggregate
            // They should be configured as OWNED entities, not separate entities with FK

            // Configure Days as owned collection (they're part of the Trip aggregate)
            builder.HasMany<ItineraryDay>(t => t.Days)
                .WithOne()
                .HasForeignKey(d => d.TripId);
            //builder.OwnsMany(t => t.Days, day =>
            //{
            //    day.ToTable("ItineraryDays");
            //    day.WithOwner().HasForeignKey("TripId");
            //    day.HasKey(d => d.Id);

            //    day.Property(d => d.Id)
            //        .HasConversion(
            //            id => id.Value,
            //            value => ItineraryDayId.Of(value))
            //        .ValueGeneratedNever();

            //    day.Property(d => d.Date)
            //        .IsRequired()
            //        .HasColumnName("Date");

            //    // Configure Activities within Days (nested owned collection)
            //    day.OwnsMany(d => d.Activities, activity =>
            //    {
            //        activity.ToTable("Activities");
            //        activity.WithOwner().HasForeignKey("ItineraryDayId");
            //        activity.HasKey(a => a.Id);

            //        activity.Property(a => a.Id)
            //            .HasConversion(
            //                id => id.Value,
            //                value => ActivityId.Of(value))
            //            .ValueGeneratedNever();

            //        activity.Property(a => a.Title)
            //            .IsRequired()
            //            .HasMaxLength(200);

            //        activity.Property(a => a.Notes)
            //            .HasMaxLength(1000);

            //        // Add other Activity properties as needed
            //    });
            //});

            // Collaborators as owned collection

            builder.HasMany<TripCollaborator>(t => t.Collaborators)
                .WithMany(c => c.Trips);

            //builder.OwnsMany(t => t.Collaborators, collab =>
            //{
            //    collab.ToTable("Collaborators");
            //    collab.WithOwner().HasForeignKey("TripId");
            //    collab.HasKey(c=> c.Id);

            //    collab.Property(c => c.Id)
            //        .HasConversion(
            //            id => id.Value,
            //            value => TripCollaboratorId.Of(value))
            //        .ValueGeneratedNever();

            //    collab.Property(c => c.Id)
            //        .HasConversion(
            //            id => id.Value,
            //            value => TripCollaboratorId.Of(value))
            //        .IsRequired()
            //        .HasColumnName("TripCollaboratorId");

            //    collab.Property(c => c.Role)
            //        .HasConversion<string>()
            //        .IsRequired()
            //        .HasMaxLength(50);

            //    collab.HasIndex("TripId", "TripCollaboratorId")
            //        .IsUnique()
            //        .HasDatabaseName("IX_TripCollaborators_TripId_TripCollaboratorId");
            //});
        }
    }
}
