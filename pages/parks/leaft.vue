<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="12" class="fill-height">
        <l-map style="height: 500px; z-index: 1" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng"></l-marker>
          <l-geo-json :geojson="geojson"></l-geo-json>
        </l-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Leaft',
  fetch() {
    const instance = this.$axios.create()
    instance.defaults.headers.common = {}
    instance
      .$get(
        'https://datosabiertos.bogota.gov.co/dataset/d2ad3bde-f835-4c01-a419-53902a16d1b3/resource/d1b71ea0-6e13-4f9e-aa46-fa41c496ab16/download/parque.geojson'
      )
      .then((response) => {
        console.log(response)
        this.geojson = response
      })
      .finally(() => {
        console.log(this.geojson)
      })
  },
  data: () => ({
    // Map
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    zoom: 15,
    center: [4.657373797629958, -74.0854918502333],
    markerLatLng: [4.657373797629958, -74.0854918502333],
    geojson: null,
  }),
  computed: {
    url() {
      const mapType = this.$vuetify.theme.dark ? '_dark' : ''
      return `https://tiles.stadiamaps.com/tiles/alidade_smooth${mapType}/{z}/{x}/{y}{r}.png`
    },
  },
}
</script>
