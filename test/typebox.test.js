'use strict'

const test = require('tap').test
const build = require('..')
const { Type } = require('@sinclair/typebox')

test('could build simple string', (t) => {
  t.plan(1)
  const body = Type.Object({
    foo: Type.String()
  })
  const response = {
    type: 'object',
    properties: {
      body
    }
  }

  const stringify = build(response)
  const obj = {
    body: {
      foo: 'bar'
    }
  }
  t.equal('{"body":{"foo":"bar"}}', stringify(obj))
})

test('could not build optional + any', (t) => {
  t.plan(1)
  const body = Type.Object({
    foo: Type.Optional(Type.Any())
  })
  const response = {
    type: 'object',
    properties: {
      body
    }
  }

  const stringify = build(response)
  const obj = {
    body: {}
  }
  t.equal('{"body":{}}', stringify(obj))
})
