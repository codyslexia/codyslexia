/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ValueObject is a base class for value objects.
 *
 * @example
 * class Name extends ValueObject<{ firstName: string; lastName: string }> {
 *   get firstName() {
 *     return this.props.firstName
 *   }
 *   get lastName() {
 *     return this.props.lastName
 *   }
 * }
 * const name = Name.create({ firstName: 'John', lastName: 'Doe' })
 */
export class ValueObject<T> {
  protected constructor(protected readonly props: T) {
    this.props = props
  }

  equals(other?: unknown) {
    return this === other
  }
}
