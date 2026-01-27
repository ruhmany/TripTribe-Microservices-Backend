using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripPlanningService.Infrastructure.Data;

namespace TripPlanningService.Infrastructure
{
    public static class InfrastructureInjection
    {
        public static IServiceCollection AddInfrastructureInjection(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionsString = configuration.GetConnectionString("defaultConnection");
            services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionsString));
            return services;
        }
    }
}
