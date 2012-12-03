/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="../Utilities/SceneObjectCreator.ts" />
/// <reference path="../Utilities/Size.ts" />

class Map extends SceneObjectCreator {
    static FLOOR_TILE_SIZE: Size = new Size(100);
    static MAP_SIZE: Size = new Size(10000);
    static WALL_SIZE: Size = new Size(Map.MAP_SIZE.Width, 2000);

    private _mapArea: number[][];
    private _contents: { [ID: number]: Cycle; };

    constructor () {
        super();

        this._mapArea = [];
        this._contents = <{ [ID: number]: Cycle; }>{};

        var actualTileSize = Map.MAP_SIZE.Width / Map.FLOOR_TILE_SIZE.Width;

        for (var i = 0; i < Map.MAP_SIZE.Width; i += actualTileSize) {
            this._mapArea[i] = [];
            for (var j = 0; j < Map.MAP_SIZE.Height; j += actualTileSize) {
                this._mapArea[i][j] = -1; // -1 is empty
            }
        }
    }

    public AddAll(cycles: Cycle[]): void {
        for (var i: number = cycles.length - 1; i >= 0; i--) {
            this.Add(cycles[i]);
        }
    }

    public Add(cycle: Cycle): void {
        this._contents[cycle.ID] = cycle;
    }

    public Remove(cycle: Cycle): void {
        delete this._contents[cycle.ID];
    }

    public Update(gameTime: GameTime): void {
        for (var id in this._contents) {
            this.AddAllToScene(this._contents[id].TrailManager.PullPendingContexts());
        }
    }
}