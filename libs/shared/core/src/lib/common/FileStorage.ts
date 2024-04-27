/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReadStream } from 'fs'

/**
 * Represents an object that can store and retrieve files.
 */
export interface FileStorage {
  /**
   * Saves a file to the storage.
   * @param path The path to use for the file.
   * @param file The file to save.
   * @returns A promise that resolves when the file has been saved.
   */
  save<F = unknown>(path: string, file: F): Promise<void>
  /**
   * Reads a file from the storage.
   * @param path The path to use for the file.
   * @returns A promise that resolves with a readable stream for the file.
   */
  read(path: string): Promise<ReadStream>
  /**
   * Checks if a file exists in the storage.
   * @param path The path to use for the file.
   * @returns A promise that resolves with a boolean indicating if the file exists.
   */
  exists?(path: string): Promise<boolean>
  /**
   * Deletes a file from the storage.
   * @param path The path to use for the file.
   * @returns A promise that resolves when the file has been deleted.
   */
  delete?(path: string): Promise<void>
  /**
   * Lists all files in a directory.
   * @param path The path to use for the directory.
   * @returns A promise that resolves with an array of file names.
   */
  list?(path: string): Promise<string[]>
  /**
   * Counts the number of files in a directory.
   * @param path The path to use for the directory.
   * @returns A promise that resolves with the number of files.
   */
  count?(path: string): Promise<number>
}
