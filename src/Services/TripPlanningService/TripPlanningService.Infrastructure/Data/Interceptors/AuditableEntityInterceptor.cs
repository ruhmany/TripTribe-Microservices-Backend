using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Domain.Abstractions;

namespace TripPlanningService.Infrastructure.Data.Interceptors
{
    public class AuditableEntityInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            UpdateEntity(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            UpdateEntity(eventData.Context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private void UpdateEntity(DbContext? dbContext)
        {
            foreach (var entry in dbContext.ChangeTracker.Entries<IEntity>())
            {
                var now = TruncateToSeconds(DateTime.UtcNow);

                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = now;
                    entry.Entity.IsDeleted = false;
                    entry.Entity.LastModified = now;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.IsDeleted = false;
                    entry.Entity.LastModified = now;
                }
                else if (entry.State == EntityState.Deleted)
                {
                    entry.Entity.IsDeleted = true;
                    entry.Entity.DeletedAt = now;
                    entry.Entity.LastModified = now;
                    entry.State = EntityState.Modified;
                }
            }
        }

        private static DateTime TruncateToSeconds(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day,
                               dateTime.Hour, dateTime.Minute, dateTime.Second,
                               dateTime.Kind);
        }
    }
}
