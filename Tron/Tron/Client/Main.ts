/// <reference path="Interfaces/jquery.d.ts" />
/// <reference path="GameScreens/GameScreenHandler.ts" />
/// <reference path="ConnectionManagement/ServerConnectionHandler.ts" />
/// <reference path="GameScreens/MainGame.ts" />
/// <reference path="PayloadManagement/PayloadDecompressor.ts" />

$(function () {
    var gameServer: IHubProxy = $.connection.GameServer,
        connectionHub: IHubProxy = $.connection.ConnectionHub,
        serverConnectionHandler = new ServerConnectionHandler(connectionHub),
        gameScreenHanler = new GameScreenHandler(gameServer);

    PayloadDecompressor.Initialize(connectionHub);

    $.connection.hub.start().done(() => {
        connectionHub.server.LoadCompressionContracts().done(function () {
            gameScreenHanler.Load(Preloader.NAME);
        });
    });
})