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
        this.applyKeyboardMappings();
    }
    KeyboardAdapter.CONTROL_LEFT = [
        "j"
    ];
    KeyboardAdapter.CONTROL_RIGHT = [
        "l"
    ];
    KeyboardAdapter.prototype.applyKeyboardMappings = function () {
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
    return KeyboardAdapter;
})();
//@ sourceMappingURL=KeyboardAdapter.js.map
