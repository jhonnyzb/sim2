<template>
  <div v-bind="$attrs" ref="draggableMap" class="mapdiv" />
</template>

<script>
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Graphic from '@arcgis/core/Graphic'
export default {
  name: 'VDraggableMap',
  props: {
    latitude: {
      type: [String, Number],
      default: 4.624335,
    },
    longitude: {
      type: [String, Number],
      default: -74.063644,
    },
  },
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
  data: () => ({
    map: null,
    view: null,
    markerSymbol: {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2,
      },
    },
    selectSymbol: {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        style: 'short-dot',
        color: [0, 255, 255],
        width: 1,
      },
    },
    pointGraphic: {},
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    style() {
      return {
        maxWidth: this.$vuetify.breakpoint.mdAndUp ? '60%' : '',
      }
    },
    point() {
      return {
        type: 'point',
        longitude: parseFloat(this.longitude),
        latitude: parseFloat(this.latitude),
      }
    },
  },
  watch: {
    '$vuetify.theme.dark'(val) {
      if (this.map && val) {
        this.map.basemap = 'dark-gray'
      } else if (this.map && !val) {
        this.map.basemap = 'gray'
      }
    },
    latitude(val) {
      this.pointGraphic.geometry = {
        type: 'point',
        longitude: parseFloat(this.longitude),
        latitude: parseFloat(val),
      }
      this.view.center = [parseFloat(this.longitude), parseFloat(val)]
    },
    longitude(val) {
      this.pointGraphic.geometry = {
        type: 'point',
        longitude: parseFloat(val),
        latitude: parseFloat(this.latitude),
      }
      this.view.center = [parseFloat(val), parseFloat(this.latitude)]
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
        this.destroy()
        const that = this
        const basemap = this.$vuetify.theme.dark
          ? 'dark-gray-vector'
          : 'gray-vector'
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
        that.view.on('layerview-create-error', function (error) {
          that.map.destroy()
          that.view.destroy()
          that.$nextTick(function () {
            that.destroy()
            reject(error)
          })
        })

        that.pointGraphic = new Graphic({
          geometry: that.point,
          symbol: that.markerSymbol,
        })

        const stop = (evt) => {
          evt.stopPropagation()
        }

        const updateGraphic = (event, symbol = that.selectSymbol) => {
          that.pointGraphic.geometry = that.view.toMap(event)
          that.pointGraphic.symbol = symbol
        }

        const cleanUp = (event) => {
          updateGraphic(event, that.markerSymbol)
          handlers.forEach((a) => a.remove())
          handlers.length = 0
          that.$emit('onposition', that.view.toMap(event))
        }
        // Add the graphic to the view's graphics layer
        that.view.graphics.add(that.pointGraphic)

        const handlers = []

        that.view.on('hold', ({ mapPoint }) => {
          that.view.hitTest(that.view.toScreen(mapPoint)).then((hitResult) => {
            if (!hitResult.results[0].graphic) return
            // console.log(mapPoint)
            that.pointGraphic.symbol = that.selectSymbol
            const pausePan = that.view.on('drag', stop)
            const move = that.view.on('pointer-move', updateGraphic)
            const up = that.view.on('pointer-up', cleanUp)
            handlers.push(pausePan)
            handlers.push(move)
            handlers.push(up)
          })
        })
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
      this.map = null
      this.view = null
    },
  },
  beforeDestroy() {
    this.destroy()
  },
}
</script>

<style>
.mapdiv {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
