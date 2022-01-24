import { expect } from 'chai'
import { LiteralCodec } from '../../src'

describe('Codec', () => {
  describe('LiteralCodec', () => {
    describe('String literal', () => {
      const codec = new LiteralCodec('String')

      it('Decode', () => {
        expect(codec.decode('String')).to.be.equal('String')
        expect(() => codec.decode('OtherString')).to.throw()
        expect(() => codec.decode(0)).to.throw()
        expect(() => codec.decode(false)).to.throw()
      })

      it('Encode', () => {
        expect(codec.encode('String')).to.be.equal('String')
      })
    })

    describe('Number literal', () => {
      const codec = new LiteralCodec(80)

      it('Decode', () => {
        expect(codec.decode(80)).to.be.equal(80)
        expect(() => codec.decode('String')).to.throw()
        expect(() => codec.decode('OtherString')).to.throw()
        expect(() => codec.decode(false)).to.throw()
      })

      it('Encode', () => {
        expect(codec.encode(80)).to.be.equal(80)
      })
    })

    describe('Boolean literal', () => {
      const codec = new LiteralCodec(true)

      it('Decode', () => {
        expect(codec.decode(true)).to.be.equal(true)
        expect(() => codec.decode(false)).to.throw()
        expect(() => codec.decode(80)).to.throw()
        expect(() => codec.decode('String')).to.throw()
        expect(() => codec.decode('OtherString')).to.throw()
      })

      it('Encode', () => {
        expect(codec.encode(true)).to.be.equal(true)
      })
    })
  })
})
