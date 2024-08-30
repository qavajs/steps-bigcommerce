/**
 * Splits an array into smaller arrays of a specified size.
 *
 * @param {number} chunks - The size of each chunk.
 * @returns {function(Array<any>): Array<Array<any>>} A function that takes an array and returns an array of arrays, each of the specified chunk size.
 *
 * @example
 * const splitIntoChunks = splitArray(2);
 * const result = splitIntoChunks([1, 2, 3, 4, 5]);
 * // result is [[1, 2], [3, 4], [5]]
 */
export function splitArray(chunks: number): (array: Array<any>) => Array<Array<any>> {
  return function (array: Array<any>): Array<Array<any>> {
    return Array.from({length: Math.ceil(array.length / chunks)}, (v, i) =>
      array.slice(i * chunks, i * chunks + chunks),
    );
  };
}
