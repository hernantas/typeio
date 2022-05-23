import { expect } from 'chai'
import { JSONParser, boolean, number, object, string } from '../../src'

describe('Parser (Plain)', () => {
  const parser = new JSONParser()
  const schema = object({
    _string: string(),
    _number: number(),
    _boolean: boolean(),
  })

  const obj = {
    _string: 'MyName',
    _number: 80,
    _boolean: true,
  }
  const json = '{"_string":"MyName","_number":80,"_boolean":true}'
  const jsonInfer = '{"_string":"MyName","_number":"80","_boolean":"true"}'

  it('From JSON', () => {
    expect(parser.decodeJSON(jsonInfer, schema)).to.be.deep.equal(obj)
  })
  it('To JSON', () => {
    expect(parser.encodeJSON(obj, schema)).to.be.deep.equal(json)
  })
})
