declare global {
    interface Array<T> {
        randomPick(): T;
    }
}

Array.prototype.randomPick = function <T>(): T {
    return this[Math.floor(Math.random() * this.length)];
};

export type __make_module = undefined;
