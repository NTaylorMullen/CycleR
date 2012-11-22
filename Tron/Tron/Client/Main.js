$(function () {
    var gameHub = $.connection.GameHub;
    var gameScreenHanler = new GameScreenHandler(gameHub);
    gameScreenHanler.Load(MainGame.NAME);
});
