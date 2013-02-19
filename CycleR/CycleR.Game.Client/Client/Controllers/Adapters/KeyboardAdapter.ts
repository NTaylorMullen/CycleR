/// <reference path="../../Interfaces/Game/Game.d.ts" />

class KeyboardAdapter implements IAdapter {
    static CONTROL_LEFT: string[] = ["a", "Left"];
    static CONTROL_RIGHT: string[] = ["d", "Right"];

    private _keyMappings: KeyMapping[];

    constructor (private _move: Function, private _proxy: any) {
        this._keyMappings = [];
        this._keyMappings.push({ key: KeyboardAdapter.CONTROL_LEFT, dir: "Left", active: false });
        this._keyMappings.push({ key: KeyboardAdapter.CONTROL_RIGHT, dir: "Right", active: false }); 
    }

    public Activate(): void {
        var that = this;
        // Mapping each hot key to its corresponding movement direction
        for (var k = 0; k < this._keyMappings.length; k++) {
            for (var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.add(that._keyMappings[k].key[z], (function (k) {
                    return function () {
                        if (!that._keyMappings[k].active) {
                            that._keyMappings[k].active = true;
                            that._move.call(that._proxy, that._keyMappings[k].dir);
                        }
                    };
                })(k), { 'type': 'keydown' });

                shortcut.add(that._keyMappings[k].key[z], (function (k) {
                    return function () {
                        if (that._keyMappings[k].active) {
                            that._keyMappings[k].active = false;
                        }
                    };
                })(k), { 'type': 'keyup' });
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