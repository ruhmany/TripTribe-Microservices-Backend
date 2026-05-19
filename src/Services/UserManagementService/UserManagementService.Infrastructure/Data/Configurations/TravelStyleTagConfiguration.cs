using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserManagementService.Core.Models;

namespace UserManagementService.Infrastructure.Data.Configurations
{
    public class TravelStyleTagConfiguration : IEntityTypeConfiguration<TravelStyleTag>
    {
        public void Configure(EntityTypeBuilder<TravelStyleTag> builder)
        {
            builder.ToTable("TravelStyleTags");

            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).ValueGeneratedNever();

            builder.Property(t => t.Tag)
                .HasConversion<string>()
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(t => new { t.UserId, t.Tag })
                .IsUnique();
        }
    }
}
