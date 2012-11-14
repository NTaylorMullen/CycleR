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
    <form id="form1" runat="server">
        <div id="container">
        </div>
    </form>

    <%= Bundle.JavaScript()
            .Add("Scripts/jquery-1.8.2.js")
            .Add("Scripts/three.min.js")
            .Add("Scripts/three.detector.js")
            .Add("Scripts/jquery.signalR-1.0.0.js")
            .Add("Scripts/shortcut.js")
        .Render("Scripts/jqueryLIBS.js")
    %>

    <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>

    <%= Bundle.JavaScript()
            .Add("Client/Utilities/Size.js")
            .Add("Client/View/Camera.js")
            .Add("Client/Space/Map.js")            
            .Add("Client/Renderers/CoreRenderer.js")
            .Add("Client/Renderers/EnvironmentRenderer.js")
            .Add("Client/Renderers/MapRenderer.js")
            .Add("Client/Renderers/GameRenderer.js")            
            .Add("Client/Game/GameLoop.js")
            .Add("Client/Game/GameTime.js")
            .Add("Client/Game/Game.js")
            .Add("Client/Main.js")
        .Render("coreLIBS.js")
    %>
</body>
</html>
