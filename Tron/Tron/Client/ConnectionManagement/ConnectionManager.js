var ConnectionManager = (function () {
    function ConnectionManager(_connectionHub, _userInitializationComplete) {
        this._connectionHub = _connectionHub;
        this._userInitializationComplete = _userInitializationComplete;
        var _this = this;
        this._connectionHub.client.successfulConnection = function (userID) {
            _this.successfulConnection(userID);
        };
        this._connectionHub.client.loadCompressionContracts = function (contracts) {
            _this.loadCompressionContracts(contracts);
        };
    }
    ConnectionManager.prototype.successfulConnection = function (userID) {
        ConnectionManager.UserID = userID;
        this._userInitializationComplete();
    };
    ConnectionManager.prototype.loadCompressionContracts = function (contracts) {
        PayloadDecompressor.LoadContracts(contracts);
    };
    return ConnectionManager;
})();
//@ sourceMappingURL=ConnectionManager.js.map
