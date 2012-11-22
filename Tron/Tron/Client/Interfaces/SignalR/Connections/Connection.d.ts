/// <reference path="../Hubs/HubProxy.d.ts" />
/// <reference path="../Hubs/Hub.d.ts" />

interface ISignalRConnection {
    GameHub: IHubProxy;
    hub: ISignalRHub;
}