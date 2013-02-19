interface ISignalRHub {
    start(callback?: Function);
    start(properties?: any, callback?: Function);
    logging: bool;
}