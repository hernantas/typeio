import { expect } from 'chai'
import { ArrayCodec, StringCodec } from '../../src'

describe('Codec', () => {
  describe('ArrayCodec', () => {
    const codec = new ArrayCodec(new StringCodec())

    it('Decode', () => {
      expect(codec.decode([])).to.be.deep.equal([])
      expect(codec.decode(['First', 'Second', 'Third'])).to.be.deep.equal(['First', 'Second', 'Third'])
      expect(codec.decode([0, 1, 2, 3])).to.be.deep.equal(['0', '1', '2', '3'])
    })

    it('Encode', () => {
      expect(codec.encode([])).to.be.deep.equal([])
      expect(codec.encode(['First', 'Second', 'Third'])).to.be.deep.equal(['First', 'Second', 'Third'])
    })
  })
})
