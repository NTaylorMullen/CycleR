/// <reference path="Trail.ts" />
/// <reference path="../Cycles/Cycle.ts" />

class TrailManager {
    public CurrentTrail: Trail;
    public LastTrail: Trail;

    private _pendingContexts: IMesh[];
    private _trailArchive: Trail[];

    constructor (private _trailColor: number, private _owner: Cycle) {
        this._trailArchive = [];
        this._pendingContexts = [];
        this.StartTrail(this._owner.MovementController.Velocity, this._owner.Context.position);
    }

    public StartTrail(currentVelocity: IVector3, startPosition: IVector3): void {
        if (this.CurrentTrail != null) {
            var startPositionOffset = startPosition.clone();
            //startPositionOffset[this.CurrentTrail.Direction] -= Map.FLOOR_TILE_SIZE.Width;

            this.CurrentTrail.ExtendTo(startPositionOffset);
            this.LastTrail = this.CurrentTrail;
        }

        var direction: string;

        if (currentVelocity.x !== 0) {
            direction = "x";
        }
        else if (currentVelocity.z !== 0) {
            direction = "z";
        }

        this.CurrentTrail = new Trail(direction, startPosition, this._trailColor, this._owner.ID);
        this._trailArchive.push(this.CurrentTrail);
        this._pendingContexts.push(this.CurrentTrail.CreateContext());
    }

    public PullPendingContexts(): IMesh[] {
        if (this._pendingContexts.length > 0) {
            var pendingContexts = this._pendingContexts;
            this._pendingContexts = [];

            return pendingContexts;
        }
        else {
            return [];
        }
    }

    public Update(gameTime: GameTime): void {
        if (this.CurrentTrail) {
            this.CurrentTrail.ExtendTo(this._owner.Context.position);
        }
    }
}