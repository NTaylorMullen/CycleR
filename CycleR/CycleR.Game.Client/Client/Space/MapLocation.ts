class MapLocation {
    constructor(public Row: number, public Column: number) {
    }

    public SameAs(mapLocation: MapLocation): bool
    {
        return this.Row == mapLocation.Row && this.Column == mapLocation.Column;
    }

    public Clone(): MapLocation
    {
        return new MapLocation(this.Row, this.Column);
    }
}