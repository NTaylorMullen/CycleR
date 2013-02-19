var PayloadConverter;
(function (PayloadConverter) {
    var models;
    function InitializeModels(loadedModels) {
        models = loadedModels;
    }
    PayloadConverter.InitializeModels = InitializeModels;
    function CreateCycle(cycleRaw) {
        var cycle = new Cycle(cycleRaw.Position, cycleRaw.Velocity, cycleRaw.ID, models[ModelLibrary.Cycle.ModelName], cycleRaw.TrailColor);
        cycle.Alive = cycleRaw.Alive;
        cycle.Context.rotation.y = cycleRaw.Rotation;
        return cycle;
    }
    PayloadConverter.CreateCycle = CreateCycle;
    function CreateAllCycles(cyclesRaw) {
        var cycles = [];
        for(var i = cyclesRaw.length - 1; i >= 0; i--) {
            cycles.push(CreateCycle(cyclesRaw[i]));
        }
        return cycles;
    }
    PayloadConverter.CreateAllCycles = CreateAllCycles;
})(PayloadConverter || (PayloadConverter = {}));
//@ sourceMappingURL=PayloadConverter.js.map
