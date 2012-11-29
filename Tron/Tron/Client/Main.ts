/// <reference path="Interfaces/jquery.d.ts" />

declare var GameScreenHandler, MainGame;

$(function () {
    var gameServer: IHubProxy = $.connection.GameServer,
        gameScreenHanler = new GameScreenHandler(gameServer);

    gameScreenHanler.Load(MainGame.NAME);
})