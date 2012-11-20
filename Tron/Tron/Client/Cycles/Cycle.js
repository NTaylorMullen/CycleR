var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Cycle = (function (_super) {
    __extends(Cycle, _super);
    function Cycle(startPosition, id, rawModel) {
        _super.call(this, id);
        this.Context = this.createContext(rawModel);
        this.Context.position = startPosition;
        this.MovementController = new CycleMovementController(this.Context);
    }
    Cycle.BASE_CYCLE_SCALE = new THREE.Vector3(2.68648, 2.60262, 1.750692);
    Cycle.SCALE = new THREE.Vector3(37.22342991572615, 40, 35);
    Cycle.SIZE = (new THREE.Vector3()).multiply(Cycle.BASE_CYCLE_SCALE, Cycle.SCALE);
    Cycle.prototype.createContext = function (rawModel) {
        var context = new THREE.Mesh(rawModel, new THREE.MeshFaceMaterial());
        context.scale = Cycle.SCALE;
        return context;
    };
    Cycle.prototype.Move = function (direction) {
        this.MovementController.Move(direction);
    };
    Cycle.prototype.Update = function (gameTime) {
        this.MovementController.Update(gameTime);
    };
    return Cycle;
})(Collidable);
