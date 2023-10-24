<template>
  <div v-bind="$attrs" ref="esri" class="mapdiv">
    <div id="actions" :style="style">
      <slot />
    </div>
    <v-i-frame v-if="showFrame" :src="frame" />
  </div>
</template>

<script>
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
// import QueryTask from '@arcgis/core/tasks/QueryTask'
// import Query from '@arcgis/core/rest/support/Query'
import esriBase from '~/utils/esriBase'
import VIFrame from '@/components/parks/VIFrame'
export default {
  name: 'VEsriMap',
  props: {
    iframe: {
      type: Object,
      default: () => ({ ...esriBase.iframe }),
    },
    layer: {
      type: Object,
      default: () => ({ ...esriBase.layer }),
    },
    query: {
      type: [String, Number],
      default: undefined,
    },
  },
  components: {
    VIFrame,
  },
  data: () => ({
    showFrame: false,
    map: null,
    view: null,
    feature: null,
  }),
  head(vm) {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: `https://js.arcgis.com/4.20/esri/themes/${
            vm.theme || 'light'
          }/main.css`,
        },
      ],
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    style() {
      return {
        maxWidth: this.$vuetify.breakpoint.mdAndUp ? '60%' : '',
      }
    },
    themeFrame() {
      const { url, dark, light } = this.iframe
      return this.$vuetify.theme.dark ? `${url}${dark}` : `${url}${light}`
    },
    frame() {
      const query =
        this.query && this.query !== 'todo'
          ? `${this.iframe.filter}${this.query}`
          : ''
      return `${this.themeFrame}${query}`
    },
  },
  watch: {
    layer(layer) {
      if (this.feature && layer.url && layer.outFields && layer.popupTemplate) {
        this.feature.url = layer.url
        this.feature.outFields = layer.outFields
        this.feature.popupTemplate = layer.popupTemplate
      }
    },
    query(query) {
      this.filterMap(query)
    },
    '$vuetify.theme.dark'(val) {
      if (this.map && val) {
        this.map.basemap = 'dark-gray'
      } else if (this.map && !val) {
        this.map.basemap = 'gray'
      }
    },
    '$vuetify.breakpoint.smAndDown'(val) {
      if (this.legend) {
        this.legend.visible = !val
      }
    },
  },
  mounted() {
    this.init()
      .then((response) => {
        this.$emit('loaded', response)
      })
      .catch(() => ({}))
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        this.showFrame = false
        this.destroy()
        const that = this
        const basemap = this.$vuetify.theme.dark ? 'dark-gray' : 'gray'
        that.map = new Map({
          basemap,
        })
        that.view = new MapView({
          container: this.$el,
          map: that.map,
          zoom: 11,
          center: [-74.063644, 4.624335],
        })
        that.view.ui.move(['zoom'], 'bottom-right')
        that.feature = new FeatureLayer({
          url: that.layer.url,
          outFields: that.layer.outFields,
          popupTemplate: that.layer.popupTemplate,
        })
        that.map.add(that.feature)
        that.view.on('layerview-create-error', function (error) {
          that.showFrame = true
          that.map.destroy()
          that.view.destroy()
          that.feature.destroy()
          that.$nextTick(function () {
            that.destroy()
            reject(error)
          })
        })
        if (!this.$refs.esri.classList.contains('esri-view')) {
          this.destroy()
          this.showFrame = true
          reject(new Error('Not map loaded'))
        }
        this.$nextTick(function () {
          resolve('Layer loaded')
          if (!that.showFrame) {
            // that.map = that.map
            // that.view = that.view
            // that.feature = parks
            if (that.query) {
              that.filterMap(that.query)
            }
          }
        })
      })
    },
    filterMap(query) {
      const val = query && query !== 'todo' ? query : ''
      if (this.feature && this.view) {
        const that = this
        that.view
          .whenLayerView(that.feature)
          .then(function (featureLayerView) {
            featureLayerView
              .queryFeatures({ where: val })
              .then(() => {
                that.filterable(val)
              })
              .then(() => {
                featureLayerView.filter = {
                  where: val,
                }
                if (!val) {
                  that.view.zoom = 11
                }
              })
              .catch(() => {
                console.log('No se encontraron datos')
              })
          })
          .catch(() => {
            console.log('No se pudo cargar el mapa')
          })
      }
    },
    filterable(q) {
      const that = this
      const query = that.feature.createQuery()
      query.outFields = ['*']
      query.where = q
      that.feature.queryFeatures(query).then((results) => {
        that.view.goTo(results.features)
      })
    },
    destroy() {
      if (this.view) {
        this.view.container = null
        this.view.destroy()
      }
      if (this.map) {
        this.map.destroy()
      }
      if (this.feature) {
        this.feature.destroy()
      }
      this.map = null
      this.view = null
      this.feature = null
    },
  },
  beforeDestroy() {
    this.destroy()
    this.showFrame = false
  },
}
</script>

<style>
#actions {
  left: 0.1em;
  right: 0.1em;
  padding: 0.5em;
  position: absolute;
  top: 0.1em;
  z-index: 40;
}
.mapdiv {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
