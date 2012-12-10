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

    public AddAll(cycles: Cycle[]): void {
        for (var i: number = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    }

    public Add(cycle: Cycle): void {
        this._cycles[cycle.ID] = cycle;
    }

    public Remove(cycleID: number): void {
        delete this._cycles[cycleID];
    }

    public Update(gameTime: GameTime): void {
        for (var id in this._cycles) {
            var cycle: Cycle = this._cycles[id];
            this.AddAllToScene(cycle.TrailManager.PullPendingContexts());
        }
    }
}