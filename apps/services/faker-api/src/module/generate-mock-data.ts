/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { en, en_US, Faker } from '@faker-js/faker'

type MockDataOptions = {
  schema: Record<string, string>
  count?: number
  locale?: Faker['locale']
}

export function generateMockData({ schema, count }: MockDataOptions) {
  const data = []
  const keys = Object.keys(schema)
  const faker = new Faker({
    locale: [en, en_US],
  })

  for (let i = 0; i < count; i++) {
    const obj = {}
    for (let j = 0; j < keys.length; j++) {
      const [module, option] = schema[keys[j]].split('.')
      obj[keys[j]] = faker[module][option]()
    }
    data.push(obj)
  }
  return data
}
