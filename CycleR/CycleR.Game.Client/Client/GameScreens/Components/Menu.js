var Menu = (function () {
    function Menu(title, options) {
        var that = this;
        this.Selected = ko.observable(0);
        this.Title = title;
        this.Options = options;
        this.Element = $(Menu._template);
        this._cursorUp = function () {
            if(that.Selected() <= 0) {
                that.Selected(that.Options.length - 1);
            } else {
                that.Selected(that.Selected() - 1);
            }
        };
        this._cursorDown = function () {
            that.Selected((that.Selected() + 1) % that.Options.length);
        };
        this._cursorSelect = function () {
            that.Options[that.Selected()].Action();
        };
    }
    Menu._template = "<div class='menuComponentHolder'>" + "<h1 data-bind='text: Title'></h1><hr />" + "<div class='menuComponent' data-bind='foreach: Options'>" + "<p><span class='menuItemHolder'><span class='itemSelected' data-bind='visible: $root.Selected() == $index()'></span><span class='itemName' data-bind='text: Name, click: $root.Select.bind($root)'></span></span></p>" + "</div>" + "</div>";
    Menu._holder = $("#GameScreen");
    Menu._cursorUpKeys = [
        "Up", 
        "w"
    ];
    Menu._cursorDownKeys = [
        "Down", 
        "s"
    ];
    Menu._cursorSelectKeys = [
        "Enter"
    ];
    Menu.prototype.applyKeybindings = function () {
        var _this = this;
        $.each(Menu._cursorUpKeys, function (i, val) {
            shortcut.add(val, _this._cursorUp);
        });
        $.each(Menu._cursorDownKeys, function (i, val) {
            shortcut.add(val, _this._cursorDown);
        });
        $.each(Menu._cursorSelectKeys, function (i, val) {
            shortcut.add(val, _this._cursorSelect);
        });
    };
    Menu.prototype.unapplyKeybindings = function () {
        $.each(Menu._cursorUpKeys, function (i, val) {
            shortcut.remove(val);
        });
        $.each(Menu._cursorUpKeys, function (i, val) {
            shortcut.remove(val);
        });
        $.each(Menu._cursorSelectKeys, function (i, val) {
            shortcut.remove(val);
        });
    };
    Menu.prototype.Select = function (menuOption) {
        this.Selected($(this.Options).index(menuOption));
        this._cursorSelect();
    };
    Menu.prototype.Start = function () {
        this.applyKeybindings();
        Menu._holder.append(this.Element);
        ko.applyBindings(this, this.Element[0]);
    };
    Menu.prototype.Stop = function () {
        this.unapplyKeybindings();
        ko.cleanNode(this.Element[0]);
    };
    return Menu;
})();
//@ sourceMappingURL=Menu.js.map
