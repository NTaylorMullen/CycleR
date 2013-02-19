interface ITween {
    start(): void;
    stop(): void;
    onComplete(fn: Function): void;
    onUpdate(fn: Function): void;
}