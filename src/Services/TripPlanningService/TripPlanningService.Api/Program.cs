
using Carter;
using TripPlanningService.Application;
using TripPlanningService.Infrastructure;

namespace TripPlanningService.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddInfrastructureInjection(builder.Configuration);
            builder.Services.AddApplicationServices();
            builder.Services.AddCarter();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                //app.UseSwagger();
                //app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.MapCarter();

            app.Run();
        }
    }
}
