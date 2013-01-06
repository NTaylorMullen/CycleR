/// <reference path="Number.d.ts" />

Number.prototype.normalized = function (): number {
    return this / Math.abs(this);
};