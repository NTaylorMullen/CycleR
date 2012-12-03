$(function () {
    var gameServer = $.connection.GameServer, connectionHub = $.connection.ConnectionHub, serverConnectionHandler = new ServerConnectionHandler(connectionHub), gameScreenHanler = new GameScreenHandler(gameServer);
    PayloadDecompressor.Initialize(connectionHub);
    $.connection.hub.start().done(function () {
        connectionHub.server.LoadCompressionContracts().done(function () {
            gameScreenHanler.Load(Preloader.NAME);
        });
    });
});
//@ sourceMappingURL=Main.js.map
