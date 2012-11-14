class GameTime {
    public StartedAt: Date;
    public LastUpdated: Date;
    public Now: Date;
    public ElapsedGameTime: number;
    public FPS: number;

    constructor () {
        this.StartedAt = new Date();
        this.Now = this.LastUpdated = this.StartedAt;
        this.ElapsedGameTime = 0;
        this.FPS = 0;
    }

    public TotalGameTime(): number {
        return this.Now.getTime() - this.StartedAt.getTime();
    }

    public Update(): void {
        this.LastUpdated = this.Now;
        this.Now = new Date();

        this.ElapsedGameTime = this.Now.getTime() - this.LastUpdated.getTime();
        this.FPS = 1000 / this.ElapsedGameTime;
    }
}