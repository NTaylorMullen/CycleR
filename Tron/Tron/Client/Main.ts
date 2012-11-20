/// <reference path="Interfaces/jquery.d.ts" />

declare var GameScreenHandler, MainGame;

$(function () {
    var gameHub: IHubProxy = $.connection.gameHub;

    var gameScreenHanler = new GameScreenHandler(gameHub);

    gameScreenHanler.Load(MainGame.NAME);
})