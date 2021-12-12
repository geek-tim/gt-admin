'use strict'

export default {
  'parser-angular.js': {
    property: 'angular',
    parsers: [
      '__ng_action',
      '__ng_binding',
      '__ng_interpolation',
      '__ng_directive'
    ]
  },
  'parser-babel.js': {
    property: 'babel',
    parsers: [
      'babel',
      'babel-flow',
      'babel-ts',
      'json',
      'json5',
      'json-stringify',
      '__js_expression',
      '__vue_expression',
      '__vue_event_binding',
      '__babel_estree'
    ]
  },
  'parser-espree.js': { property: 'espree', parsers: ['espree'] },
  'parser-flow.js': { property: 'flow', parsers: ['flow'] },
  'parser-glimmer.js': { property: 'glimmer', parsers: ['glimmer'] },
  'parser-graphql.js': { property: 'graphql', parsers: ['graphql'] },
  'parser-html.js': {
    property: 'html',
    parsers: ['html', 'angular', 'vue', 'lwc']
  },
  'parser-markdown.js': {
    property: 'markdown',
    parsers: ['remark', 'markdown', 'mdx']
  },
  'parser-meriyah.js': { property: 'meriyah', parsers: ['meriyah'] },
  'parser-postcss.js': {
    property: 'postcss',
    parsers: ['css', 'less', 'scss']
  },
  'parser-typescript.js': { property: 'typescript', parsers: ['typescript'] },
  'parser-yaml.js': { property: 'yaml', parsers: ['yaml'] }
}
