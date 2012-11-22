/// <reference path="Interfaces/jquery.d.ts" />

declare var GameScreenHandler, MainGame;

$(function () {
    var gameHub: IHubProxy = $.connection.GameHub;

    var gameScreenHanler = new GameScreenHandler(gameHub);

    gameScreenHanler.Load(MainGame.NAME);
})