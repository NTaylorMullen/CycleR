/// <reference path="Tween.d.ts" />

interface ITweenjs {
    Tween(properties: any, duration?: number): any;
    update(): void;
}

declare var TWEEN: ITweenjs;