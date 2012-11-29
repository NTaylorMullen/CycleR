/// <reference path="../Hubs/HubProxy.d.ts" />
/// <reference path="../Hubs/Hub.d.ts" />

interface ISignalRConnection {
    GameServer: IHubProxy;
    LobbyHub: IHubProxy;
    hub: ISignalRHub;
}