declare global {
    interface Number {
        clamp(min: number, max: number): number;
    }
}

Number.prototype.clamp = function (min: number, max: number): number {
    return Math.min(Math.max(this.valueOf(), min), max);
};

export type __make_module = undefined;
