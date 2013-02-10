<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Tron._default" %>

<%@ Import Namespace="SquishIt.Framework" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>SignalR Tron</title>

    <%= Bundle.Css()
            .Add("Styles/game.css")
        .Render("Styles/MAIN.css")
    %>
</head>
<body>
    <div id="GameWrapper">
    </div>
    <div id="GameScreen">
    </div>

    <%= Bundle.JavaScript()
            .Add("Scripts/jquery-1.8.2.js")
            .Add("Scripts/three.min.js")
            .Add("Scripts/three.detector.js")
            .Add("Scripts/three.trackballcontrols.js")
            .Add("Scripts/three.fpscontrols.js")
            .Add("Scripts/three.windowresize.js")
            .Add("Scripts/three.extensions.js")
            .Add("Scripts/tween.js")
            .Add("Scripts/jquery.signalR-1.0.0.js")
            .Add("Scripts/shortcut.js")
        .Render("Scripts/jqueryLIBS.js")
    %>

    <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>

    <%= Bundle.JavaScript()
            .Add("Client/Extensions/Number.js")
            .Add("Client/Utilities/Size.js")
            .Add("Client/Utilities/SceneObjectCreator.js")            
            .Add("Client/PayloadManagement/PayloadDecompressor.js")
            .Add("Client/Cameras/CameraController.js")
            .Add("Client/Cameras/FreeCameraController.js")
            .Add("Client/Cameras/AttachedCameraController.js")
            .Add("Client/Cameras/Camera.js")
            .Add("Client/Trails/Trail.js")
            .Add("Client/Trails/TrailManager.js")
            .Add("Client/Space/MapLocation.js")
            .Add("Client/Space/MapUtilities.js")
            .Add("Client/Space/Map.js")            
            .Add("Client/Renderers/CoreRenderer.js")
            .Add("Client/Renderers/EnvironmentRenderer.js")
            .Add("Client/Renderers/MapRenderer.js")
            .Add("Client/Renderers/GameRenderer.js")
            .Add("Client/ModelHelpers/ModelLibrary.js")
            .Add("Client/ModelHelpers/ModelLoader.js")
            .Add("Client/Collidables/MovementControllers/MovementController.js")
            .Add("Client/Collidables/Collidable.js")            
            .Add("Client/Controllers/Adapters/KeyboardAdapter.js")
            .Add("Client/Controllers/CycleController.js")
            .Add("Client/Cycles/CycleMovementController.js")
            .Add("Client/Cycles/Cycle.js")
            .Add("Client/PayloadManagement/PayloadConverter.js")
            .Add("Client/Cycles/CycleManager.js")
            .Add("Client/GameCore/GameLoop.js")
            .Add("Client/GameCore/GameTime.js")
            .Add("Client/GameCore/GameHandler.js")
            .Add("Client/GameCore/Game.js")
            .Add("Client/GameScreens/GameScreen.js")
            .Add("Client/GameScreens/MainMenu.js")
            .Add("Client/GameScreens/CreateGame.js")
            .Add("Client/GameScreens/FindGame.js")
            .Add("Client/GameScreens/Loading.js")
            .Add("Client/GameScreens/MainGame.js")
            .Add("Client/GameScreens/Options.js")
            .Add("Client/GameScreens/QuickMatch.js")
            .Add("Client/GameScreens/Preloader.js")
            .Add("Client/GameScreens/GameScreenHandler.js")
            .Add("Client/ConnectionManagement/ConnectionManager.js")
            .Add("Client/Main.js")
        .Render("coreLIBS.js")
    %>
</body>
</html>
