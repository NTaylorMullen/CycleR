/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class ServerConnectionHandler {
    constructor (connectionHub: IHubProxy) {
        connectionHub.client.connectionLost = this.connectionLost;
    }

    private connectionLost(message: string): void {
    }
}