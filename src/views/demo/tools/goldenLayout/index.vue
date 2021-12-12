<template>
  <PageWrapper
    title="prettier"
    subTitle="布局golden-layout"
    class="flex flex-col h-full"
  >
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref, computed, unref, defineComponent } from 'vue'

import GoldenLayout from 'golden-layout'
import 'golden-layout/src/css/goldenlayout-dark-theme.css'
import 'golden-layout/src/css/goldenlayout-base.css'

var config = {
  content: [
    {
      type: 'row',
      content: [
        {
          type: 'component',
          componentName: 'example',
          componentState: { text: 'Component 1' }
        },
        {
          type: 'component',
          componentName: 'example',
          componentState: { text: 'Component 2' }
        },
        {
          type: 'component',
          componentName: 'example',
          componentState: { text: 'Component 3' }
        }
      ]
    }
  ]
}

var myLayout = new GoldenLayout(config)

myLayout.registerComponent('example', function (container, state) {
  container.getElement().html('<h2>' + state.text + '</h2>')
})

myLayout.init()
</script>
<style lang="scss">
.page-wrapper-content {
  flex: 1;
}
</style>
