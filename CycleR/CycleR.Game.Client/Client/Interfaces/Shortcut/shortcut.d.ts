interface IShortcut {
    add(key: string, action: Function, options?: { [option: string]: any; }): void;
    remove(key: string): void;
}

declare var shortcut: IShortcut;