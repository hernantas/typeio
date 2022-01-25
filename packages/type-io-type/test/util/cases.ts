export const cases = {
  array: {
    string: [
      [],
      ['First', 'Second', 'Third'],
      ['true', 'true', 'false'],
      ['0', '80', '8080']
    ]
  },

  boolean: [true, false],

  literal: {
    boolean: [true],
    number: [0],
    string: ['literal']
  },

  null: [null],

  number: [0, 80, 8080],

  object: {
    simple: [
      {
        _string: '',
        _number: 0,
        _boolean: false
      },
      {
        _string: '',
        _number: 0,
        _boolean: false,
        _excess: 'THIS IS EXCESS PROPERTY'
      }
    ],
    nested: [{
      _string: '',
      _number: 0,
      _boolean: false,
      _nested: {
        _string: '',
        _number: 0,
        _boolean: false
      }
    }]
  },

  string: ['', 'String', '0', 'true', 'false', 'null', 'undefined'],

  tuple: [
    ['First', 'Second', 0, 80, true, false],
    ['First', 'Second', 0, 80, true, false, 'THIS IS EXCESS VALUE']
  ],

  undefined: [undefined]
}
