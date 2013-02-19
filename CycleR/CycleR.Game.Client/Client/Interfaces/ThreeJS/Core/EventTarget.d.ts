interface IEventTarget {
    addEventListener(): void;
    dispatchEvent(): void;
    removeEventListener(): void;
}