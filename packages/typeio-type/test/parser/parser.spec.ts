describe('Parser', () => {
  // const parser = new Parser([StringCodec, NumberCodec, BooleanCodec])
  // describe('Decode to string', () => {
  //   const schema = expect(parser.decode('MyString', schema)).to.have.property(
  //     'value',
  //     'MyString'
  //   )
  //   expect(parser.decode('0', schema)).to.have.property('value', '0')
  //   expect(parser.decode('true', schema)).to.have.property('value', 'true')
  //   expect(parser.decode(0, schema)).to.have.property('value', '0')
  //   expect(parser.decode(true, schema)).to.have.property('value', 'true')
  // })
  // it('Decode to number', () => {
  //   const schema = NumberSchema.create()
  //   expect(parser.decode(0, schema)).to.have.property('value', 0)
  //   expect(parser.decode('0', schema)).to.have.property('value', 0)
  //   expect(parser.decode('80', schema)).to.have.property('value', 80)
  //   expect(parser.decode('MyString', schema)).to.have.property('success', false)
  //   expect(parser.decode('true', schema)).to.have.property('success', false)
  //   expect(parser.decode(true, schema)).to.have.property('value', 1)
  //   expect(parser.decode(false, schema)).to.have.property('value', 0)
  // })
  // it('Decode to boolean', () => {
  //   const schema = BooleanSchema.create()
  //   expect(parser.decode(false, schema)).to.have.property('value', false)
  //   expect(parser.decode(0, schema)).to.have.property('value', false)
  //   expect(parser.decode(-0, schema)).to.have.property('value', false)
  //   expect(parser.decode('', schema)).to.have.property('value', false)
  //   expect(parser.decode(null, schema)).to.have.property('value', false)
  //   expect(parser.decode(undefined, schema)).to.have.property('value', false)
  //   expect(parser.decode(NaN, schema)).to.have.property('value', false)
  //   expect(parser.decode(true, schema)).to.have.property('value', true)
  //   expect(parser.decode({}, schema)).to.have.property('value', true)
  //   expect(parser.decode([], schema)).to.have.property('value', true)
  //   expect(parser.decode(42, schema)).to.have.property('value', true)
  //   expect(parser.decode('true', schema)).to.have.property('value', true)
  //   expect(parser.decode(-1, schema)).to.have.property('value', true)
  //   expect(parser.decode(3.14, schema)).to.have.property('value', true)
  //   expect(parser.decode(-3.14, schema)).to.have.property('value', true)
  //   expect(parser.decode(Infinity, schema)).to.have.property('value', true)
  //   expect(parser.decode(-Infinity, schema)).to.have.property('value', true)
  // })
})
