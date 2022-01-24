import { expect } from 'chai'
import { StringCodec } from '../../../src'

describe('Codec', () => {
  describe('StringCodec', () => {
    const codec = new StringCodec()

    it('Decode', () => {
      expect(codec.decode('MyString')).to.be.equal('MyString')
      expect(codec.decode('0')).to.be.equal('0')
      expect(codec.decode('true')).to.be.equal('true')
      expect(codec.decode(0)).to.be.equal('0')
      expect(codec.decode(true)).to.be.equal('true')
    })

    it('Encode', () => {
      expect(codec.encode('MyString')).to.be.equal('MyString')
      expect(codec.encode('0')).to.be.equal('0')
      expect(codec.encode('true')).to.be.equal('true')
    })
  })
})
