/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Scope of the update-tags schematic
 * @packageDocumentation
 * @module @schematics/update-tags
 * @preferred
 */
export type UpdateTagsScope = 'backend' | 'frontend' | 'shared'

/**
 * Schema for the update-tags schematic
 * @packageDocumentation
 * @module @schematics/update-tags
 * @preferred
 */
export interface UpdateTagsSchema {
  scope: UpdateTagsScope
  name: string
  tags: string
}
