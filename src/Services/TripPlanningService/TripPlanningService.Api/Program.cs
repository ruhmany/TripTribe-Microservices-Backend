
using BuildingBlocks.Exceptions.Handler;
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

            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
            builder.Services.AddProblemDetails();

            var app = builder.Build();

            app.UseExceptionHandler(opt => { });

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
