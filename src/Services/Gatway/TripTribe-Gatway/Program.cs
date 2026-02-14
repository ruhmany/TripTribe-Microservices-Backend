
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace TripTribe_Gatway
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

            builder.Services.AddOcelot();

            builder.Services.AddControllers();


            var app = builder.Build();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            await app.UseOcelot();
            var version = builder.Configuration.GetValue<string>("ApiSettings:VersionNumber");
            app.MapGroup($"api/V{version}");
            app.Run();
        }
    }
}
