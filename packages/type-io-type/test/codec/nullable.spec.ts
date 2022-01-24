import { expect } from 'chai'
import { NullableCodec, StringCodec } from '../../src'

describe('Codec', () => {
  describe('NullableCodec', () => {
    const codec = new NullableCodec(new StringCodec())

    it('Decode', () => {
      expect(codec.decode('')).to.be.equal('')
      expect(codec.decode('MyString')).to.be.equal('MyString')
      expect(codec.decode(null)).to.be.equal(null)
    })

    it('Encode', () => {
      expect(codec.encode('')).to.be.equal('')
      expect(codec.encode('MyString')).to.be.equal('MyString')
      expect(codec.encode(null)).to.be.equal(null)
    })
  })
})
