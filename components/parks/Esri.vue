<template>
  <div className="mapdiv"></div>
</template>

<script>
import WebMap from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'
import Bookmarks from '@arcgis/core/widgets/Bookmarks'
import Expand from '@arcgis/core/widgets/Expand'

export default {
  name: 'App',
  mounted() {
    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    })
    const view = new MapView({
      container: this.$el,
      map: webmap,
    })
    const bookmarks = new Bookmarks({
      view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
    })
    const bkExpand = new Expand({
      view,
      content: bookmarks,
      expanded: true,
    })
    // Add the widget to the top-right corner of the view
    view.ui.add(bkExpand, 'top-right')
    // bonus - how many bookmarks in the webmap?
    webmap.when(function () {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length)
      } else {
        console.log('No bookmarks in this webmap.')
      }
    })
  },
}
</script>

<style>
@import 'https://js.arcgis.com/4.19/@arcgis/core/assets/esri/themes/light/main.css';

.mapdiv {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
