using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Infrastructure.Data;
using TripPlanningService.Infrastructure.Data.Interceptors;

namespace TripPlanningService.Infrastructure
{
    public static class InfrastructureInjection
    {
        public static IServiceCollection AddInfrastructureInjection(this IServiceCollection services, IConfiguration configuration)
        {

            var connectionsString = configuration.GetConnectionString("defaultConnection");
            services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
            services.AddDbContext<ApplicationDbContext>((sp, opt) =>
            {
                opt.AddInterceptors(sp.GetRequiredService<ISaveChangesInterceptor>());
                opt.UseSqlServer(connectionsString);
            });
            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

            return services;
        }
    }
}
