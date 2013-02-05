/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />
/// <reference path="../Utilities/Size.ts" />

class Map extends SceneObjectCreator {
    static FLOOR_TILE_SIZE: Size = new Size(100);
    static MAP_SIZE: Size = new Size(10000);
    static WALL_SIZE: Size = new Size(Map.MAP_SIZE.Width, 2000);

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
    }

    private getCycleMapLocation(cycle: Cycle): MapLocation {
        var mapLocation: IVector3 = cycle.Context.position.clone();

        // Get cycle position as if it were about to turn (aka positioned on line).  This will also ensure that a cycle will be
        // viewed as dead as soon as the front of the cycle hits a line.
        if (cycle.MovementController.Velocity.z != 0) {
            mapLocation.z -= (mapLocation.z % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.z / Math.abs(cycle.MovementController.Velocity.z));
        }
        else if (cycle.MovementController.Velocity.x != 0) {
            mapLocation.x -= (mapLocation.x % Map.FLOOR_TILE_SIZE.Width) - Map.FLOOR_TILE_SIZE.Width * (cycle.MovementController.Velocity.x / Math.abs(cycle.MovementController.Velocity.x));
        }

        // Normalize to the quadrant in which the cycle lies
        var quadrant: MapLocation = new MapLocation(Math.abs((mapLocation.z + this._halfMapSize.Height) / Map.FLOOR_TILE_SIZE.Height), Math.abs((mapLocation.x + this._halfMapSize.Width) / Map.FLOOR_TILE_SIZE.Width));

        return quadrant;
    }

    private updateMap(): void {
        for (var id in this._cycles) {
            var cycle: Cycle = this._cycles[id];
            if (cycle.Alive) {
                var quadrant: MapLocation = this.getCycleMapLocation(cycle);

                if (quadrant.Row < 0 || quadrant.Row >= this._dimensions.Height || quadrant.Column < 0 || quadrant.Column >= this._dimensions.Width) {
                    cycle.HandleCollisionWith(null);
                }
                else {
                    var currentLocation: number = this._map[quadrant.Row][quadrant.Column];

                    if (currentLocation == 0) // Spot is empty on map, mark it as ours
                    {
                        // Set the last head location to a positive cycle ID, indicating we can now run into it
                        this._map[cycle.MovementController.HeadLocation.Row][cycle.MovementController.HeadLocation.Column] = cycle.ID;
                        cycle.MovementController.HeadLocation = quadrant;
                        // We mark it with the negated cycle ID because it represents the head of our trail
                        this._map[quadrant.Row][quadrant.Column] = -cycle.ID;
                    }
                    else // Possibly a Collision
                    {
                        // Verify we're not running into ourself when going through a quadrant.
                        if (currentLocation != -cycle.ID) {
                            // We're runnign into another "head", so handle a collision with both cycles
                            if (currentLocation < 0) {
                                this._cycles[Math.abs(currentLocation)].HandleCollisionWith(cycle);
                            }

                            cycle.HandleCollisionWith(this._cycles[Math.abs(currentLocation)]);
                        }
                    }
                }
            }
        }
    }

    public AddAll(cycles: Cycle[]): void {
        for (var i: number = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    }

    public Add(cycle: Cycle): void {
        cycle.MovementController.HeadLocation = this.getCycleMapLocation(cycle);
        this._cycles[cycle.ID] = cycle;

    }

    public Remove(cycleID: number): void {
        delete this._cycles[cycleID];
    }

    public Update(gameTime: GameTime): void {
        for (var id in this._cycles) {
            var cycle: Cycle = this._cycles[id];
            this.AddAllToScene(cycle.TrailManager.PullPendingContexts());
            //this.updateMap();
        }
    }
}