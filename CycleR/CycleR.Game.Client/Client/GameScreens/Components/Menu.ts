/// <reference path="../../Interfaces/Game/Game.d.ts" />
/// <reference path="../../Interfaces/jquery.d.ts" />
/// <reference path="MenuOption.ts" />

class Menu {
    private static _template = "<div class='menuComponentHolder'>" +
                                    "<h1 data-bind='text: Title'></h1><hr />" +
                                    "<div class='menuComponent' data-bind='foreach: Options'>" +
                                        "<p><span class='menuItemHolder' data-bind='click: $root.Select.bind($root)'><span class='itemSelected' data-bind='visible: $root.Selected() == $index()'></span><span class='itemName' data-bind='text: Name'></span></span></p>" +
                                    "</div>" +
                               "</div>";

    private static _holder: JQuery = $("#GameScreen");
    private static _cursorUpKeys: string[] = ["Up", "w"];
    private static _cursorDownKeys: string[] = ["Down", "s"];
    private static _cursorSelectKeys: string[] = ["Enter"];

    private _cursorUp: Function;
    private _cursorDown: Function;
    private _cursorSelect: Function;

    public Selected: KnockoutObservableNumber;
    public Title: string;
    public Options: MenuOption[];
    public Element: JQuery;

    constructor(title: string, options: MenuOption[]) {
        var that = this;
        this.Selected = ko.observable(0);
        this.Title = title;
        this.Options = options;        

        this._cursorUp = () => {
            if (that.Selected() <= 0) {
                that.Selected(that.Options.length - 1);
            }
            else {
                that.Selected(that.Selected() - 1);
            }
        };

        this._cursorDown = () => {
            that.Selected((that.Selected() + 1) % that.Options.length);
        };

        this._cursorSelect = () => {
            that.Options[that.Selected()].Action();
        };
    }

    private applyKeybindings(): void {
        $.each(Menu._cursorUpKeys, (i, val) => {
            shortcut.add(val, this._cursorUp);
        });

        $.each(Menu._cursorDownKeys, (i, val) => {
            shortcut.add(val, this._cursorDown);
        });

        $.each(Menu._cursorSelectKeys, (i, val) => {
            shortcut.add(val, this._cursorSelect);
        });
    }

    private unapplyKeybindings(): void {
        $.each(Menu._cursorUpKeys, (i, val) => {
            shortcut.remove(val);
        });

        $.each(Menu._cursorDownKeys, (i, val) => {
            shortcut.remove(val);
        });

        $.each(Menu._cursorSelectKeys, (i, val) => {
            shortcut.remove(val);
        });
    }

    public Select(menuOption: MenuOption): void {
        this.Selected($(<any[]>this.Options).index(menuOption));
        this._cursorSelect();
    }

    public Start(): void {
        this.applyKeybindings();

        this.Element = $(Menu._template);
        Menu._holder.append(this.Element);

        ko.applyBindings(this, this.Element[0]);
    }

    public Stop(): void {
        this.unapplyKeybindings();
        this.Element.remove();
        ko.cleanNode(this.Element[0]);
    }
}