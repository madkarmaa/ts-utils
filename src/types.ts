export type PossiblyUndefined<T> = T | undefined;
export type PossiblyNull<T> = T | null;

/**
 * A type that allows for autocompletion of string literals while still permitting any string value.
 *
 * @template T - A union of string literals to enable autocompletion for.
 */
export type AutoCompleteStr<T extends string> = T | (string & {});

/**
 * Represents primitive JSON types.
 */
export type JSONPrimitive = string | number | boolean | null | undefined;

/**
 * Represents any value that can be serialized to JSON.
 */
export type JSONSerializable =
    | JSONPrimitive
    | JSONSerializable[]
    | {
          [key: string]: JSONSerializable;
      };
