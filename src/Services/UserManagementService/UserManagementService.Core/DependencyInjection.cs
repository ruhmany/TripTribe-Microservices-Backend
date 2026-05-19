using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using UserManagementService.Core.Interfaces;
using UserManagementService.Core.Services;

namespace UserManagementService.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
