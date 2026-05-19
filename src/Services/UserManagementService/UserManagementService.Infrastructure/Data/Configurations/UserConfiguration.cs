using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserManagementService.Core.Models;

namespace UserManagementService.Infrastructure.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedNever();

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(256);

            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(u => u.UserName)
                .IsUnique();

            builder.Property(u => u.PasswordHash)
                .IsRequired();

            builder.Property(u => u.FirstName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.LastName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Bio)
                .HasMaxLength(500);

            builder.Property(u => u.AvatarUrl)
                .HasMaxLength(2048);

            builder.Property(u => u.Country)
                .HasMaxLength(100);

            builder.Property(u => u.City)
                .HasMaxLength(100);

            builder.HasMany(u => u.TravelStyleTags)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasQueryFilter(u => !u.IsDeleted);
        }
    }
}
