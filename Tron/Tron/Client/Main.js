$(function () {
    var gameServer = $.connection.GameServer, connectionHub = $.connection.ConnectionHub, serverConnectionHandler = new ServerConnectionHandler(connectionHub), gameScreenHanler = new GameScreenHandler(gameServer);
    gameScreenHanler.Load(MainGame.NAME);
    $.connection.hub.start();
});
//@ sourceMappingURL=Main.js.map
