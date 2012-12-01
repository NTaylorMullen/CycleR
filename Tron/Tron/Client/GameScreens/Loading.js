var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading(onCompletion, gameServer) {
        var _this = this;
        _super.call(this, Loading.NAME, onCompletion, gameServer);
        this.GameServer.client.configure = function (configuration) {
            _this.configureGame(configuration);
        };
    }
    Loading.NAME = "Loading";
    Loading.prototype.configureGame = function (configuration) {
        this.configureMap(configuration.MapConfig);
        this.configureCycles(configuration.CycleConfig);
        this.GameServer.server.ReadyToStartGame();
    };
    Loading.prototype.configureMap = function (configuration) {
        Map.FLOOR_TILE_SIZE = new Size(configuration.FLOOR_TILE_SIZE.Width, configuration.FLOOR_TILE_SIZE.Height);
        Map.MAP_SIZE = new Size(configuration.MAP_SIZE.Width, configuration.MAP_SIZE.Height);
        Map.WALL_SIZE = new Size(configuration.WALL_SIZE.Width, configuration.WALL_SIZE.Height);
    };
    Loading.prototype.configureCycles = function (configuration) {
        Cycle.BASE_CYCLE_SCALE = new THREE.Vector3(configuration.BASE_CYCLE_SCALE.x, configuration.BASE_CYCLE_SCALE.y, configuration.BASE_CYCLE_SCALE.z);
        Cycle.SCALE = new THREE.Vector3(configuration.SCALE.x, configuration.SCALE.y, configuration.SCALE.z);
        Cycle.SIZE = new THREE.Vector2(configuration.SIZE.x, configuration.SIZE.y);
        CycleMovementController.Y_OFFSET = configuration.Y_OFFSET;
        CycleMovementController.MAX_SPEED = configuration.MAX_SPEED;
    };
    Loading.prototype.Load = function () {
        this.GameServer.server.StartMatch();
    };
    return Loading;
})(GameScreen);
//@ sourceMappingURL=Loading.js.map
