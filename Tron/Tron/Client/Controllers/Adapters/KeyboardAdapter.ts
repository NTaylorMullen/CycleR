class KeyboardAdapter implements IAdapter {
    static CONTROL_LEFT: string[] = ["a", "Left"];
    static CONTROL_RIGHT: string[] = ["d", "Right"];

    private _keyMappings: KeyMapping[];

    constructor (private _move: Function, private _proxy: Cycle) {
        this._keyMappings = [];
        this._keyMappings.push({ key: KeyboardAdapter.CONTROL_LEFT, dir: "Left" });
        this._keyMappings.push({ key: KeyboardAdapter.CONTROL_RIGHT, dir: "Right" }); 
    }

    public Activate(): void {
        var that = this;
        // Mapping each hot key to its corresponding movement direction
        for (var k = 0; k < this._keyMappings.length; k++) {
            for (var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.add(that._keyMappings[k].key[z], (function (k) {
                    return function () {
                        that._move.call(that._proxy, that._keyMappings[k].dir);
                    };
                })(k));
            }
        }
    }

    public Deactivate(): void {
        // Mapping each hot key to its corresponding movement direction
        for (var k = 0; k < this._keyMappings.length; k++) {
            for (var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.remove(this._keyMappings[k].key[z]);
            }
        }
    }
}