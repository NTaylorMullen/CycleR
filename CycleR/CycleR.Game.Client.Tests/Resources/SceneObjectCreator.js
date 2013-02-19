var SceneObjectCreator = (function () {
    function SceneObjectCreator() {
        this._pendingObjects = [];
    }
    SceneObjectCreator.prototype.AddToScene = function (object) {
        this._pendingObjects.push(object);
    };
    SceneObjectCreator.prototype.AddAllToScene = function (objects) {
        this._pendingObjects = this._pendingObjects.concat(objects);
    };
    SceneObjectCreator.prototype.GetPendingObjects = function () {
        if(this._pendingObjects.length !== 0) {
            var objects = this._pendingObjects;
            this._pendingObjects = [];
            return objects;
        } else {
            return [];
        }
    };
    return SceneObjectCreator;
})();
//@ sourceMappingURL=SceneObjectCreator.js.map
