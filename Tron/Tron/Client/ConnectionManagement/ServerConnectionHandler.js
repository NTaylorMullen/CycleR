var ServerConnectionHandler = (function () {
    function ServerConnectionHandler(connectionHub) {
        connectionHub.client.connectionLost = this.connectionLost;
    }
    ServerConnectionHandler.prototype.connectionLost = function (message) {
    };
    return ServerConnectionHandler;
})();
//@ sourceMappingURL=ServerConnectionHandler.js.map
