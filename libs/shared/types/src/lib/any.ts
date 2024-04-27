/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dict } from './dict'
import { Abstract } from './abstract'

/**
 * Represents a function that can take any number of arguments and return any value.
 */
export type AnyFunction = (...args: any[]) => any

/**
 * Represents a class prototype.
 */
export type AnyClass = Abstract<any>

/**
 * Represents an object of any type.
 */
export type AnyObject = Dict<any>

/**
 * Represents a constructor function that can take any number of arguments and return any value.
 */
export type AnyConstructor = Abstract<any>
