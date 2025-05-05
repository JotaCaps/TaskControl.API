using Microsoft.Extensions.DependencyInjection;
using TaskControl.Application.Services;

namespace TaskControl.Application
{
    public static class ApplicationModule
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services
                .AddServices();
            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<ITarefaService, TarefaService>();
            
            return services;
        }
    }
}
