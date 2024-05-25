/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FakerModules } from './types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFileSync } = require('fs')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const fakerModules = [
  'address',
  'animal',
  'color',
  'commerce',
  'company',
  'database',
  'datatype',
  'date',
  'finance',
  'git',
  'hacker',
  'image',
  'internet',
  'lorem',
  'music',
  'name',
  'phone',
  'random',
  'science',
  'system',
  'vehicle',
  'word',
]

type Options<T> = T extends object
  ? { [P in keyof T]?: T[P] extends object ? Options<T[P]> : null }
  : null

type ApiOptions<A> = {
  [K in keyof A]: A[K] extends object
    ? {
        module: K
        options: Options<A[K]>
      }
    : never
}[keyof A]

function getApiOptions<A>(api: A, filterFn?: (module: keyof A) => boolean): ApiOptions<A>[] {
  const modules = Object.keys(api)

  const options = modules.reduce((acc, module) => {
    // skip if filter not met
    if (filterFn && !filterFn(module as keyof A)) return acc

    const moduleOptions = {
      module,
      options: {},
    }

    Object.keys(api[module]).forEach((option: string) => {
      moduleOptions.options[option] = null

      const subOption = api[module][option]

      if (typeof subOption === 'object' && subOption !== null) {
        Object.keys(subOption).forEach((subOptionKey: string) => {
          moduleOptions.options[option] = {
            ...(moduleOptions.options[option] || {}),
            [subOptionKey]: null,
          }
        })
      }
    })

    return [...acc, moduleOptions]
  }, [])

  return options
}

writeFileSync(
  'apps/services/faker-api/src/module/api.json',
  JSON.stringify(getApiOptions(faker, (m) => fakerModules.includes(m as FakerModules)))
)
