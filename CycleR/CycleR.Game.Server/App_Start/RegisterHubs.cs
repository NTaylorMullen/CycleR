using System;
using System.Web;
using System.Web.Routing;

[assembly: PreApplicationStartMethod(typeof(CycleR.Game.Server.RegisterHubs), "Start")]

namespace CycleR.Game.Server
{
    public static class RegisterHubs
    {
        public static void Start()
        {
            // Register the default hubs route: ~/signalr/hubs
            RouteTable.Routes.MapHubs();
        }
    }
}