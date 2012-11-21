var KeyboardAdapter = (function () {
    function KeyboardAdapter(_move, _proxy) {
        this._move = _move;
        this._proxy = _proxy;
        this._keyMappings = [];
        this._keyMappings.push({
            key: KeyboardAdapter.CONTROL_LEFT,
            dir: "Left"
        });
        this._keyMappings.push({
            key: KeyboardAdapter.CONTROL_RIGHT,
            dir: "Right"
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
                        that._move.call(that._proxy, that._keyMappings[k].dir);
                    }
                })(k));
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
