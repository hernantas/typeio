import { expect } from 'chai'
import { BooleanCodec } from '../../src'

describe('Codec', () => {
  describe('BooleanCodec', () => {
    const codec = new BooleanCodec()

    it('Decode', () => {
      expect(codec.decode(false)).to.be.equal(false)
      expect(codec.decode(0)).to.be.equal(false)
      expect(codec.decode(-0)).to.be.equal(false)
      expect(codec.decode('')).to.be.equal(false)
      expect(codec.decode(null)).to.be.equal(false)
      expect(codec.decode(undefined)).to.be.equal(false)
      expect(codec.decode(NaN)).to.be.equal(false)

      expect(codec.decode(true)).to.be.equal(true)
      expect(codec.decode({})).to.be.equal(true)
      expect(codec.decode([])).to.be.equal(true)
      expect(codec.decode(42)).to.be.equal(true)
      expect(codec.decode('true')).to.be.equal(true)
      expect(codec.decode(-1)).to.be.equal(true)
      expect(codec.decode(3.14)).to.be.equal(true)
      expect(codec.decode(-3.14)).to.be.equal(true)
      expect(codec.decode(Infinity)).to.be.equal(true)
      expect(codec.decode(-Infinity)).to.be.equal(true)
    })

    it('Encode', () => {
      expect(codec.encode(false)).to.be.equal(false)
      expect(codec.encode(true)).to.be.equal(true)
    })
  })
})
