var ModelLoader;
(function (ModelLoader) {
    var jsonLoader = new THREE.JSONLoader();
    var models = {
    };
    function LoadModel(loadRequest, done) {
        jsonLoader.load(loadRequest.FilePath, function (geometry) {
            models[loadRequest.ModelName] = geometry;
            if(done) {
                done();
            }
        }, loadRequest.TexturePath);
    }
    ModelLoader.LoadModel = LoadModel;
    function LoadModels(filesToLoad) {
        for(var i = 0; i < filesToLoad.length; i++) {
            this.LoadModel(filesToLoad[i]);
        }
    }
    ModelLoader.LoadModels = LoadModels;
    function GetModel(name) {
        if(models[name]) {
            return models[name];
        } else {
            throw new Error("Model '" + name + "' has not been loaded.");
        }
    }
    ModelLoader.GetModel = GetModel;
    function GetModels() {
        return models;
    }
    ModelLoader.GetModels = GetModels;
})(ModelLoader || (ModelLoader = {}));
//@ sourceMappingURL=ModelLoader.js.map
