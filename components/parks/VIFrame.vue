<template>
  <div class="vue-iframe"></div>
</template>

<script>
import _ from 'lodash'
import utils from './iframe'
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export default {
  name: 'VIFrame',
  props: {
    src: {
      type: String,
      required: true,
    },
    crossorigin: {
      type: String,
      required: false,
      default: 'anonymous',
    },
    target: {
      type: String,
      required: false,
      default: '_parent',
    },
    className: {
      type: String,
      default: undefined,
    },
    allow: {
      type: String,
      default: undefined,
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    name: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      iframeEl: null,
      iframeLoadedMessage: `IFRAME_LOADED_${generateGuid()}`,
      iframeOnReadyStateChangeMessage: `IFRAME_ON_READ_STATE_CHANGE_${generateGuid()}`,
    }
  },
  computed: {},
  watch: {
    src() {
      this.reinitIframe(this)
    },
  },
  mounted() {
    this.listenForEvents()
    this.initIframe()
  },
  methods: {
    removeIframe() {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild)
      }
    },
    setIframeUrl() {
      if (this.iframeEl.contentWindow === null) {
        setTimeout(this.setIframeUrl)
        return
      }
      const html = utils.generateHtmlFrame(
        this.src,
        this.iframeLoadedMessage,
        this.iframeOnReadyStateChangeMessage
      )
      const iframeDoc = this.iframeEl.contentWindow.document
      iframeDoc.open().write(html)
      iframeDoc.close() // iframe onload event happens
    },
    reinitIframe: _.debounce((vm) => {
      vm.removeIframe()
      vm.initIframe()
    }, 200),
    initIframe() {
      this.iframeEl = document.createElement('iframe')
      this.iframeEl.setAttribute(
        'style',
        'visibility: hidden; position: absolute; top: -99999px; border: none;'
      )
      this.iframeEl.setAttribute('scrolling', 'no')
      this.iframeEl.setAttribute('marginheight', '0')
      this.iframeEl.setAttribute('marginwidth', '0')
      if (this.src) this.iframeEl.setAttribute('iframe-src', this.src)
      if (this.className) this.iframeEl.setAttribute('class', this.className)
      if (this.class) this.iframeEl.setAttribute('class', this.class)
      if (this.crossorigin) {
        this.iframeEl.setAttribute('crossorigin', this.crossorigin)
      }
      if (this.target) this.iframeEl.setAttribute('target', this.target)
      if (this.allow) this.iframeEl.setAttribute('allow', this.allow)
      if (this.width) this.iframeEl.setAttribute('width', this.width)
      if (this.height) this.iframeEl.setAttribute('height', this.height)
      if (this.name) this.iframeEl.setAttribute('name', this.name)
      if (this.title) this.iframeEl.setAttribute('title', this.title)

      this.$el.appendChild(this.iframeEl)

      this.setIframeUrl()
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener
        ? 'addEventListener'
        : 'attachEvent'
      const eventer = window[eventMethod]
      const messageEvent =
        eventMethod === 'attachEvent' ? 'onmessage' : 'message'

      // Listen to message from child window
      eventer(
        messageEvent,
        (event) => {
          if (event.data === this.iframeLoadedMessage) {
            this.$emit('iframe-load')
            this.iframeEl.setAttribute(
              'style',
              'visibility: visible; border: none;'
            )
          }
          if (event.data === this.iframeOnReadyStateChangeMessage) {
            this.$emit('load')
          }
        },
        false
      )
    },
  },
}
</script>

<style lang="scss">
.vue-iframe {
  height: 100%;
  width: 100%;
}
</style>
