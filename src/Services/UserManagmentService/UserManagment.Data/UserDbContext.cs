using Microsoft.EntityFrameworkCore;
using UserManagmentService.Domain.Models;

namespace UserManagmentService.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                
                entity.Property(u => u.Email)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasIndex(u => u.Email)
                    .IsUnique();

                entity.Property(u => u.PhoneNumber)
                    .HasMaxLength(50);

                entity.HasIndex(u => u.PhoneNumber)
                    .IsUnique()
                    .HasFilter("[PhoneNumber] IS NOT NULL AND [PhoneNumber] != ''");

                entity.Property(u => u.GoogleId)
                    .HasMaxLength(256);

                entity.HasIndex(u => u.GoogleId)
                    .IsUnique()
                    .HasFilter("[GoogleId] IS NOT NULL AND [GoogleId] != ''");

                entity.Property(u => u.FacebookId)
                    .HasMaxLength(256);

                entity.HasIndex(u => u.FacebookId)
                    .IsUnique()
                    .HasFilter("[FacebookId] IS NOT NULL AND [FacebookId] != ''");

                entity.Property(u => u.AppleId)
                    .HasMaxLength(256);

                entity.HasIndex(u => u.AppleId)
                    .IsUnique()
                    .HasFilter("[AppleId] IS NOT NULL AND [AppleId] != ''");
            });
        }
    }
}
