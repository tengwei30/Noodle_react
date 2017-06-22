module.exports = {
  rules: {
    'brace-style': [ 1, 'stroustrup', { allowSingleLine: true } ],
    'comma-spacing': [ 2, { before: false, after: true } ],
    indent: [ 0, 2, { VariableDeclarator: 0 } ],
    'one-var-declaration-per-line': 0,
    'space-before-function-paren': 0,
    'comma-dangle': [ 2, 'never' ],
    'computed-property-spacing': 0,
    'no-multiple-empty-lines': 0,
    'template-curly-spacing': 0,
    'array-bracket-spacing': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-trailing-spaces': 0,
    'no-negated-in-lhs': 0,
    'no-param-reassign': 0,
    'object-shorthand': 0,
    'space-in-parens': 0,
    'padded-blocks': 0,
    'func-names': 0,
    'no-console': 0,
    'no-shadow': 0,
    'eol-last': 0,
    'one-var': 0,
    'new-cap': 0,
    'no-var': 0,
    'max-len': 1,
    'react/prop-types': 0,
    'react/no-did-mount-set-state': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-closing-bracket-location': [ 1, {
      selfClosing: 'after-props',
      nonEmpty: 'after-props'
    } ],
    'react/sort-comp': [ 1, {
      order: [
        'static-methods',
        'lifecycle',
        '/^handle.+$/',
        'everything-else',
        'render'
      ],
      groups: {
        rendering: [
          '/^render.+$/',
          'render'
        ]
      }
    } ]
  }
};