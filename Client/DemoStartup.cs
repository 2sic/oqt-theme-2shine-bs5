﻿using Microsoft.Extensions.DependencyInjection;
using ToSic.Oqt.Themes.ToShineBs5.Client.Navigator;

namespace ToSic.Oqt.Themes.ToShineBs5.Client
{
    public class DemoStartup : Oqtane.Services.IClientStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<PageNavigatorService>();
        }
    }
}
