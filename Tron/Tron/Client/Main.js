
$(function () {
    var gameHub = $.connection.gameHub;
    var gameScreenHanler = new GameScreenHandler(gameHub);
    gameScreenHanler.Load(MainGame.NAME);
});
//sourceMappingURL=Main.js.map