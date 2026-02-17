declare global {
    interface String {
        withPrefix<const P extends string, const S extends string>(
            this: S,
            prefix: P
        ): `${P}${S}`;
        withSuffix<const S extends string, const SU extends string>(
            this: S,
            suffix: SU
        ): `${S}${SU}`;
    }
}

String.prototype.withPrefix = function <
    const P extends string,
    const S extends string
>(this: S, prefix: P): `${P}${S}` {
    return `${prefix}${this.valueOf()}` as `${P}${S}`;
};

String.prototype.withSuffix = function <
    const S extends string,
    const SU extends string
>(this: S, suffix: SU): `${S}${SU}` {
    return `${this.valueOf()}${suffix}` as `${S}${SU}`;
};

export {};
