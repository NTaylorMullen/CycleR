class MenuOption {
    public Name: string;
    public Action: Function;

    constructor(name: string, action: Function) {
        this.Name = name;
        this.Action = action;
    }
}