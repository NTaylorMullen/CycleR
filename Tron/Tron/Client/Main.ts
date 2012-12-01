/// <reference path="Interfaces/jquery.d.ts" />
/// <reference path="GameScreens/GameScreenHandler.ts" />
/// <reference path="ConnectionManagement/ServerConnectionHandler.ts" />
/// <reference path="GameScreens/MainGame.ts" />

$(function () {
    var gameServer: IHubProxy = $.connection.GameServer,
        connectionHub: IHubProxy = $.connection.ConnectionHub,
        serverConnectionHandler = new ServerConnectionHandler(connectionHub),
        gameScreenHanler = new GameScreenHandler(gameServer);    

    $.connection.hub.start().done(() => {
        gameScreenHanler.Load(MainMenu.NAME);
    });
})