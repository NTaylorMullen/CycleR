$(function () {
    var gameServer = $.connection.GameServer, connectionHub = $.connection.ConnectionHub, serverConnectionHandler = new ServerConnectionHandler(connectionHub), gameScreenHanler = new GameScreenHandler(gameServer);
    $.connection.hub.start().done(function () {
        gameScreenHanler.Load(MainMenu.NAME);
    });
});
//@ sourceMappingURL=Main.js.map
