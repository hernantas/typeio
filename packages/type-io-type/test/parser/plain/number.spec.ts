import { expect } from 'chai'
import { NumberCodec } from '../../../src'

describe('Codec', () => {
  describe('NumberCodec', () => {
    const codec = new NumberCodec()

    it('Decode', () => {
      expect(codec.decode(0)).to.be.equal(0)
      expect(codec.decode('0')).to.be.equal(0)
      expect(codec.decode('80')).to.be.equal(80)
      expect(() => codec.decode('MyString')).to.throw()
      expect(() => codec.decode('true')).to.throw()
      expect(codec.decode(true)).to.be.equal(1)
      expect(codec.decode(false)).to.be.equal(0)
    })

    it('Encode', () => {
      expect(codec.encode(0)).to.be.equal(0)
    })
  })
})
