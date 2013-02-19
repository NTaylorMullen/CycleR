$(function () {
    $.connection.hub.logging = true;
    var gameServer = $.connection.GameServer, connectionHub = $.connection.ConnectionHub, gameScreenHandler = new GameScreenHandler(gameServer);
    var connectionManager = new ConnectionManager(connectionHub, function () {
        console.log("Loading Compression Contracts...");
        connectionHub.server.LoadCompressionContracts().done(function () {
            console.log("Compression Contracts Loaded!");
            console.log("Loading initialization data...");
            gameScreenHandler.Load(Preloader.NAME);
        });
    });
    $.connection.hub.start({
        transport: "serverSentEvents"
    });
});
//@ sourceMappingURL=Main.js.map
