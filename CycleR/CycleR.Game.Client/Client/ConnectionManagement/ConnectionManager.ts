/// <reference path="../PayloadManagement/PayloadDecompressor.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />

class ConnectionManager {
    public static UserID: number;

    constructor (private _connectionHub: IHubProxy, private _userInitializationComplete: Function) {
        this._connectionHub.client.successfulConnection = (userID) => {
            this.successfulConnection(userID);
        };

        this._connectionHub.client.loadCompressionContracts = (contracts: ICompressionContracts) => {
            this.loadCompressionContracts(contracts);            
        };
    }

    private successfulConnection(userID: number): void {
        ConnectionManager.UserID = userID;

        this._userInitializationComplete();
    }

    private loadCompressionContracts(contracts: ICompressionContracts): void {
        PayloadDecompressor.LoadContracts(contracts);
    }
}