/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function formatError(description: string, error: unknown): string {
  return `${description}: ${getErrorMessage(error)}`
}

function getErrorMessage(error: unknown): string {
  return (error as Error).message
}

export { formatError, getErrorMessage }
