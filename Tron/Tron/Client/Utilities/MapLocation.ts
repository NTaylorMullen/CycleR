class MapLocation {
    constructor (public Row: number, public Column: number) {
    }

    public SameAs(mapLocation: MapLocation): bool {
        return this.Row === mapLocation.Row && this.Column === mapLocation.Column;
    }
}