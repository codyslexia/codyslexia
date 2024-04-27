/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus, HttpStatusMessages, HttpStatusNames } from './HttpStatus'

describe('@shared/core - HttpStatus', () => {
  it('should have the correct status code', () => {
    const status = HttpStatus.OK
    expect(status).toBe(200)
  })
})

describe('@shared/core - HttpStatusNames', () => {
  it('should have the correct status name', () => {
    const status = HttpStatusNames.OK
    expect(status).toBe('OK')
  })
})

describe('@shared/core - HttpStatusMessages', () => {
  it('should have the correct status message', () => {
    const status = HttpStatusMessages.OK
    expect(status).toBe('Request fulfilled, document follows')
  })
})
