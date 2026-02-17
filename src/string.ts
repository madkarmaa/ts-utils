declare global {
    interface String {
        withPrefix<const P extends string, const S extends string>(
            this: S,
            prefix: P
        ): `${P}${S}`;
    }
}

String.prototype.withPrefix = function <
    const P extends string,
    const S extends string
>(this: S, prefix: P): `${P}${S}` {
    return `${prefix}${this.valueOf()}` as `${P}${S}`;
};

export {};
