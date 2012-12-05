var KeyboardAdapter = (function () {
    function KeyboardAdapter(_move, _proxy) {
        this._move = _move;
        this._proxy = _proxy;
        this._keyMappings = [];
        this._keyMappings.push({
            key: KeyboardAdapter.CONTROL_LEFT,
            dir: "Left",
            active: false
        });
        this._keyMappings.push({
            key: KeyboardAdapter.CONTROL_RIGHT,
            dir: "Right",
            active: false
        });
    }
    KeyboardAdapter.CONTROL_LEFT = [
        "a", 
        "Left"
    ];
    KeyboardAdapter.CONTROL_RIGHT = [
        "d", 
        "Right"
    ];
    KeyboardAdapter.prototype.Activate = function () {
        var that = this;
        for(var k = 0; k < this._keyMappings.length; k++) {
            for(var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.add(that._keyMappings[k].key[z], (function (k) {
                    return function () {
                        if(!that._keyMappings[k].active) {
                            that._keyMappings[k].active = true;
                            that._move.call(that._proxy, that._keyMappings[k].dir);
                        }
                    }
                })(k), {
                    'type': 'keydown'
                });
                shortcut.add(that._keyMappings[k].key[z], (function (k) {
                    return function () {
                        if(that._keyMappings[k].active) {
                            that._keyMappings[k].active = false;
                        }
                    }
                })(k), {
                    'type': 'keyup'
                });
            }
        }
    };
    KeyboardAdapter.prototype.Deactivate = function () {
        for(var k = 0; k < this._keyMappings.length; k++) {
            for(var z = 0; z < this._keyMappings[k].key.length; z++) {
                shortcut.remove(this._keyMappings[k].key[z]);
            }
        }
    };
    return KeyboardAdapter;
})();
//@ sourceMappingURL=KeyboardAdapter.js.map
