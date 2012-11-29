$(function () {
    var gameServer = $.connection.GameServer, gameScreenHanler = new GameScreenHandler(gameServer);
    gameScreenHanler.Load(MainGame.NAME);
});
