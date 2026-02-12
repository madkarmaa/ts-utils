/**
 * A utility type representing the result of an operation that can either succeed with a value of type `T` or fail with an error of type `E`.
 * The error type `E` must be an object that contains a `code` property of type `string`.
 *
 * @template T - The type of the successful result value.
 * @template E - The type of the error, which must extend an object with a `code` property.
 */
export type Result<T, E extends { code: string }> = [T, null] | [null, E];

/**
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param value - The value to wrap in a successful result.
 * @returns A `Result` representing a successful outcome.
 */
export const ok = <T>(value: T): Result<T, never> => [value, null];

/**
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param error - The error to wrap in a failed result. Must have a `code` property.
 * @returns A `Result` representing a failed outcome.
 */
export const err = <const M extends string, E extends { code: M }>(
    error: E
): Result<never, E> => [null, error];
