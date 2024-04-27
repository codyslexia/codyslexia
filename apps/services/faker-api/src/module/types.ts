/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Faker,
  AddressModule,
  AnimalModule,
  ColorModule,
  CommerceModule,
  CompanyModule,
  DatabaseModule,
  DatatypeModule,
  DateModule,
  FinanceModule,
  GitModule,
  HackerModule,
  ImageModule,
  InternetModule,
  LoremModule,
  MusicModule,
  NameModule,
  PhoneModule,
  RandomModule,
  ScienceModule,
  SystemModule,
  VehicleModule,
  WordModule,
} from '@faker-js/faker'

import { tuple } from '@shared/utils'

type Address = keyof AddressModule
type Animal = keyof AnimalModule
type Color = keyof ColorModule
type Commerce = keyof CommerceModule
type Company = keyof CompanyModule
type Database = keyof DatabaseModule
type Datatype = keyof DatatypeModule
type Date = keyof DateModule
type Finance = keyof FinanceModule
type Git = keyof GitModule
type Hacker = keyof HackerModule
type Image = keyof ImageModule
type Internet = keyof InternetModule
type Lorem = keyof LoremModule
type Music = keyof MusicModule
type Name = keyof NameModule
type Phone = keyof PhoneModule
type Random = keyof RandomModule
type Science = keyof ScienceModule
type System = keyof SystemModule
type Vehicle = keyof VehicleModule
type Word = keyof WordModule

export type FakerMethods =
  | Address
  | Animal
  | Color
  | Commerce
  | Company
  | Database
  | Datatype
  | Date
  | Finance
  | Git
  | Hacker
  | Image
  | Internet
  | Lorem
  | Music
  | Name
  | Phone
  | Random
  | Science
  | System
  | Vehicle
  | Word

export const fakerModules = tuple(
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
  'word'
)

export type FakerModules = (typeof fakerModules)[number]

type Modules = keyof Faker

/**
 * Infer the methods of a module dynamically.
 * @note we could also add a conditional type to check if K is a function/method
 * @example [K in keyof Faker[M]]: Faker[M][K] extends () => any ? K : never`
 */
type ModuleMethods<M extends Modules> = {
  [K in keyof Faker[M]]: K
}[keyof Faker[M]]

/**
 * Infer the metadata object used to map schemas.
 * @example
 * type AddressOptions = FakerOptionsMetadata<"address">
 */
export type FakerOptionsMetadata<M extends Modules> = {
  module: M
  options: { [K in ModuleMethods<M>]: null }
}
