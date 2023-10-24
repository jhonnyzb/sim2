function generateHtmlFrame(src, loadMessage, readyMessage) {
  return `
    <script>
      function onLoadFrame() {
        window.location.replace("${src}");
        parent.postMessage('${loadMessage}', '*')
      }
    </script>
    <body onload="onLoadFrame()"></body>
    <script>
      window.document.onreadystatechange = function () {
        if (window.document.readyState === 'complete') {
          parent.postMessage('${readyMessage}', '*')
        }
      };
    </script>
  `
}

export default { generateHtmlFrame }
