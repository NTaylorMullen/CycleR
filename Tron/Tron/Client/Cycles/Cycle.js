var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cycle = (function (_super) {
    __extends(Cycle, _super);
    function Cycle(startPosition, startVelocity, id, rawModel, trailColor) {
        _super.call(this, id);
        this.Context = this.createContext(rawModel);
        this.Context.position = startPosition;
        this.MovementController = new CycleMovementController(this.Context, startVelocity);
        this.TrailManager = new TrailManager(trailColor, this);
    }
    Cycle.BASE_CYCLE_SCALE = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    Cycle.SCALE = new THREE.Vector3(37.22342991572615, 40, 35);
    Cycle.SIZE = new THREE.Vector2(200, 100);
    Cycle.prototype.createContext = function (rawModel) {
        var context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        context.scale = Cycle.SCALE;
        return context;
    };
    Cycle.prototype.HandleCollisionWith = function (obj) {
        this.MovementController.Velocity = new THREE.Vector3();
    };
    Cycle.prototype.Die = function (diedAt) {
        this.TrailManager.CurrentTrail.ExtendTo(diedAt);
    };
    Cycle.prototype.Move = function (direction) {
        this.MovementController.Move(direction);
        this.TrailManager.StartTrail(this.MovementController.Velocity, this.Context.position);
    };
    Cycle.prototype.Update = function (gameTime) {
        this.MovementController.Update(gameTime);
        this.TrailManager.Update(gameTime);
    };
    return Cycle;
})(Collidable);
//@ sourceMappingURL=Cycle.js.map
