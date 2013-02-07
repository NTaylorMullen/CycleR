/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="MapUtilities.ts" />

class Map extends SceneObjectCreator {
    static FLOOR_TILE_SIZE: Size = new Size(100);
    static MAP_SIZE: Size = new Size(10000);
    static WALL_SIZE: Size = new Size(Map.MAP_SIZE.Width, 2000);

    public static Utilities: MapUtilities;

    private _map: number[][];
    private _cycles: { [ID: number]: Cycle; };
    private _halfMapSize: Size = new Size(Map.MAP_SIZE.Width * .5, Map.MAP_SIZE.Height * .5);
    private _dimensions: Size = new Size(Map.MAP_SIZE.Width / Map.FLOOR_TILE_SIZE.Width, Map.MAP_SIZE.Height / Map.FLOOR_TILE_SIZE.Height);

    constructor() {
        super();

        this._map = [];
        this._cycles = <{ [ID: number]: Cycle; }>{};

        for (var i = 0; i < this._dimensions.Width; i++) {
            this._map[i] = [];
            for (var j = 0; j < this._dimensions.Height; j++) {
                this._map[i][j] = 0; // 0 is empty
            }
        }

        Map.Utilities = new MapUtilities(Map.MAP_SIZE, Map.FLOOR_TILE_SIZE);
    }

    private cycleCollision(cycle: Cycle): void {
        var collisionLocation = Map.Utilities.ToMapLocation(cycle.Context.position),
            rotation = Math.round(cycle.Context.rotation.y);

        // Update head location to be 1 behind the collisionLocation;

        // Facing up
        if (rotation === 0) {
            collisionLocation.Row++;
        }
        else if (rotation === 2) { // Going left
            collisionLocation.Column++;
        }
        else if (rotation === 3) { // Going down
            collisionLocation.Row--;
        }
        else if (rotation === 5) { // Going right
            collisionLocation.Column++;
        }

        console.log("Collision occured! R: " + rotation + " Collision Location: ( " + collisionLocation.Row + ", " + collisionLocation.Column + " )");

        // Collision location is fixed at this point
        cycle.MovementController.HeadLocation = collisionLocation;
    }

    public RegisterCycles(cycles: Cycle[]): void {
        for (var i: number = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    }

    public Add(cycle: Cycle): void {
        cycle.MovementController.HeadLocation = Map.Utilities.ToMapLocation(cycle.Context.position);
        this._cycles[cycle.ID] = cycle;
        $(cycle).on(Cycle.Events.OnCollision, () => {
            this.cycleCollision(cycle);
        });
    }

    public Remove(cycleID: number): void {
        delete this._cycles[cycleID];
    }

    public Update(gameTime: GameTime): void {
        for (var id in this._cycles) {
            var cycle: Cycle = this._cycles[id],
                expectedHeadLocation = Map.Utilities.ToMapLocation(cycle.Context.position);

            if (!cycle.Colliding) {
                cycle.MovementController.HeadLocation = expectedHeadLocation;
            }

            this.AddAllToScene(cycle.TrailManager.PullPendingContexts());
        }
    }
}