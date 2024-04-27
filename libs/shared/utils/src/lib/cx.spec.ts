/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as assert from 'assert'
import * as mod from './cx'

const fn = mod.default

describe('@shared/utils - cx', () => {
  it('exports', () => {
    assert.equal(typeof mod.default, 'function')
    assert.equal(typeof mod.cx, 'function')

    assert.equal(mod.default, mod.cx, 'exports are equal')
    assert.equal(mod.default(), '', '~> returns string output')
    assert.equal(mod.cx(), '', '~> returns string output')
  })

  it('strings', () => {
    assert.equal(fn(''), '')
    assert.equal(fn('foo'), 'foo')
    assert.equal(fn(true && 'foo'), 'foo')
    assert.equal(fn(false && 'foo'), '')
  })

  it('strings (variadic)', () => {
    assert.equal(fn(''), '')
    assert.equal(fn('foo', 'bar'), 'foo bar')
    assert.equal(fn(true && 'foo', false && 'bar', 'baz'), 'foo baz')
    assert.equal(fn(false && 'foo', 'bar', 'baz', ''), 'bar baz')
  })

  it('objects', () => {
    assert.equal(fn({}), '')
    assert.equal(fn({ foo: true }), 'foo')
    assert.equal(fn({ foo: true, bar: false }), 'foo')
    assert.equal(fn({ foo: 'hiya', bar: 1 }), 'foo bar')
    assert.equal(fn({ foo: 1, bar: 0, baz: 1 }), 'foo baz')
    assert.equal(fn({ '-foo': 1, '--bar': 1 }), '-foo --bar')
  })

  it('objects (variadic)', () => {
    assert.equal(fn({}, {}), '')
    assert.equal(fn({ foo: 1 }, { bar: 2 }), 'foo bar')
    assert.equal(fn({ foo: 1 }, null, { baz: 1, bat: 0 }), 'foo baz')
    assert.equal(fn({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Infinity }), 'foo bar bat')
  })

  it('arrays', () => {
    assert.equal(fn([]), '')
    assert.equal(fn(['foo']), 'foo')
    assert.equal(fn(['foo', 'bar']), 'foo bar')
    assert.equal(fn(['foo', 0 && 'bar', 1 && 'baz']), 'foo baz')
  })

  it('arrays (nested)', () => {
    assert.equal(fn([[[]]]), '')
    assert.equal(fn([[['foo']]]), 'foo')
    assert.equal(fn([true, [['foo']]]), 'foo')
    assert.equal(fn(['foo', ['bar', ['', [['baz']]]]]), 'foo bar baz')
  })

  it('arrays (variadic)', () => {
    assert.equal(fn([], []), '')
    assert.equal(fn(['foo'], ['bar']), 'foo bar')
    assert.equal(fn(['foo'], null, ['baz', ''], true, '', []), 'foo baz')
  })

  it('arrays (no `push` escape)', () => {
    assert.equal(fn({ push: 1 }), 'push')
    assert.equal(fn({ pop: true }), 'pop')
    assert.equal(fn({ push: true }), 'push')
    assert.equal(fn('hello', { world: 1, push: true }), 'hello world push')
  })

  it('functions', () => {
    const foo = () => ({})
    assert.equal(fn(foo, 'hello'), 'hello')
    assert.equal(fn(foo, 'hello', fn), 'hello')
    assert.equal(fn(foo, 'hello', [[fn], 'world']), 'hello world')
  })
})
