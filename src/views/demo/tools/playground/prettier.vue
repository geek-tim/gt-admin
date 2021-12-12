<template>
  <PageWrapper title="prettier" subTitle="格式化" class="flex flex-col h-full">
    <div ref="editorContainer" style="height: 360px; width: 100%"></div>
  </PageWrapper>
</template>
<script setup lang="ts">
import {
  ref,
  computed,
  unref,
  defineComponent,
  onMounted,
  defineProps
} from 'vue'
import { propTypes } from '/@/utils/propTypes'

import * as monaco from 'monaco-editor'
import Worker from './test.worker.js?worker'

// ================ prettier start

const worker = new Worker()
let monacoEditor = null
worker.addEventListener('message', (event) => {
  monacoEditor.setValue(event.data.message.formatted)
})

const editorContainer = ref()

onMounted(() => {
  monacoEditor = monaco.editor.create(unref(editorContainer), {
    value: '',
    readOnly: true,
    language: 'javascript',
    theme: 'vs-dark'
  })
  worker.postMessage({
    uid: 1,
    message: {
      type: 'format',
      code: 'function HelloWorld({greeting = "hello", greeted = \'"World"\', silent = false, onMouseOver,}) {\n\n  if(!greeting){return null};\n\n     // TODO: Don\'t use random in render\n  let num = Math.floor (Math.random() * 1E+7).toString().replace(/\\.\\d+/ig, "")\n\n  return <div className=\'HelloWorld\' title={`You are visitor number ${ num }`} onMouseOver={onMouseOver}>\n\n    <strong>{ greeting.slice( 0, 1 ).toUpperCase() + greeting.slice(1).toLowerCase() }</strong>\n    {greeting.endsWith(",") ? " " : <span style={{color: \'\\grey\'}}>", "</span> }\n    <em>\n\t{ greeted }\n\t</em>\n    { (silent)\n      ? "."\n      : "!"}\n\n    </div>;\n\n}',
      options: {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: 'auto',
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxSingleQuote: false,
        parser: 'babel',
        printWidth: 80,
        proseWrap: 'preserve',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
        vueIndentScriptAndStyle: false
      },
      debug: { ast: false, doc: false, comments: false, reformat: false }
    }
  })
})
</script>
<style lang="scss">
.page-wrapper-content {
  flex: 1;
}
</style>
