/// <reference path="Interfaces/jquery.d.ts" />
/// <reference path="GameScreens/GameScreenHandler.ts" />
/// <reference path="ConnectionManagement/ConnectionManager.ts" />
/// <reference path="GameScreens/MainGame.ts" />
/// <reference path="PayloadManagement/PayloadDecompressor.ts" />

$(function () {
    $.connection.hub.logging = true;

    var gameServer: IHubProxy = $.connection.GameServer,
        connectionHub: IHubProxy = $.connection.ConnectionHub,
        gameScreenHandler: GameScreenHandler = new GameScreenHandler(gameServer);

    var connectionManager = new ConnectionManager(connectionHub, () => {
        console.log("Loading Compression Contracts...");
        connectionHub.server.LoadCompressionContracts().done(function () {
            console.log("Compression Contracts Loaded!");
            console.log("Loading initialization data...");
            gameScreenHandler.Load(Preloader.NAME);
        });        
    });    

    $.connection.hub.start({ transport: "serverSentEvents" });
})