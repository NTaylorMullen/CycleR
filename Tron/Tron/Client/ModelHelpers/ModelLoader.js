var ModelLoader = (function () {
    function ModelLoader() {
        this._jsonLoader = new THREE.JSONLoader();
        this._models = {
        };
    }
    ModelLoader.prototype.LoadModel = function (loadRequest) {
        var _this = this;
        this._jsonLoader.load(loadRequest.FilePath, function (geometry) {
            _this._models[loadRequest.ModelName] = geometry;
        }, loadRequest.TexturePath);
    };
    ModelLoader.prototype.LoadModels = function (filesToLoad) {
        for(var i = 0; i < filesToLoad.length; i++) {
            this.LoadModel(filesToLoad[i]);
        }
    };
    ModelLoader.prototype.GetModel = function (name) {
        if(this._models[name]) {
            return this._models[name];
        } else {
            throw new Error("Model '" + name + "' has not been loaded.");
        }
    };
    return ModelLoader;
})();
