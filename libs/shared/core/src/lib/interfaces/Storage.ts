/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents options for a Storage instance.
 */
export interface StorageOptions {
  directory: string
}

/**
 * Represents an object that can store and retrieve binary data.
 */
export interface Storage {
  /**
   * Saves binary data to the storage.
   * @param key The key to use for the data.
   * @param content The binary data to save.
   * @returns A promise that resolves when the data has been saved.
   */
  save(key: string, content: Buffer | NodeJS.ReadableStream): Promise<void>
  /**
   * Loads binary data from the storage.
   * @param key The key to use for the data.
   * @returns A promise that resolves with the loaded binary data.
   */
  load(key: string): Promise<Buffer>
  /**
   * Deletes binary data from the storage.
   * @param key The key to use for the data.
   * @returns A promise that resolves when the data has been deleted.
   */
  delete(key: string): Promise<void>
  /**
   * Checks if binary data exists in the storage.
   * @param key The key to use for the data.
   * @returns A promise that resolves with a boolean indicating if the data exists.
   */
  exists?(key: string): Promise<boolean>
}
