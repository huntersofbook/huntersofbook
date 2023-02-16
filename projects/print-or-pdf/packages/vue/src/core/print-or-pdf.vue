<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { jsPDF } from 'jspdf'

const props = defineProps<{
  landscape?: boolean
  debug?: boolean
  colorAdjust?: 'exact' | 'economy' | 'none'
  pdfPadding?: number
  paperDimensions?: 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10'
  customCSS?: string
  title?: string
}>()

const paperDimensions = {
  A0: {
    width: 2383.94,
    height: 3370.39,
  },
  A1: {
    width: 1683.78,
    height: 2383.94,
  },
  A2: {
    width: 1190.55,
    height: 1683.78,
  },
  A3: {
    width: 841.89,
    height: 1190.55,
  },
  A4: {
    width: 595.28,
    height: 841.89,
  },
  A5: {
    width: 419.53,
    height: 595.28,
  },
  A6: {
    width: 297.64,
    height: 419.53,
  },
  A7: {
    width: 209.76,
    height: 297.64,
  },
  A8: {
    width: 147.40,
    height: 209.76,
  },
  A9: {
    width: 104.88,
    height: 147.40,
  },
  A10: {
    width: 73.70,
    height: 104.88,
  },
}

const paperLandscapeDimensions = {
  A0: {
    width: 3370.39,
    height: 2383.94,
  },
  A1: {
    width: 2383.94,
    height: 1683.78,
  },
  A2: {
    width: 1683.78,
    height: 1190.55,
  },
  A3: {
    width: 1190.55,
    height: 841.89,
  },
  A4: {
    width: 841.89,
    height: 595.28,
  },
  A5: {
    width: 595.28,
    height: 419.53,
  },
  A6: {
    width: 419.53,
    height: 297.64,
  },
  A7: {
    width: 297.64,
    height: 209.76,
  },
  A8: {
    width: 209.76,
    height: 147.40,
  },
  A9: {
    width: 147.40,
    height: 104.88,
  },
  A10: {
    width: 104.88,
    height: 73.70,
  },
}

const printFrame = ref<HTMLIFrameElement>()

interface PrintFrame {
  node: HTMLElement
  landscape: boolean
  debug: boolean
  colorAdjust: 'exact' | 'economy' | 'none'
  pdfPadding: number
  paperDimensions: 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10'
  customCSS?: string
  title?: string
  saveFileTitle?: string
}

function print(ctx: PrintFrame) {
  const settings = {
    landscape: ctx.landscape || props.landscape || false,
    debug: ctx.debug || props.debug || false,
    colorAdjust: ctx.colorAdjust || props.colorAdjust || 'none',
    pdfPadding: ctx.pdfPadding || props.pdfPadding || 1,
    paperDimensions: ctx.paperDimensions || props.paperDimensions || 'A4',
    node: ctx.node || null,
    customCSS: ctx.customCSS || props.customCSS || '',
    title: ctx.title || props.title || 'Print',
  } as PrintFrame

  let css = ''
  const styles = document.querySelectorAll('style')

  for (let i = 0; i < styles.length; i++)
    css += styles[i].innerHTML

  let customCSS = ''

  let sheet = ''
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>
  for (let i = 0; i < stylesheets.length; i++)
    sheet += `<link rel="stylesheet" href="${stylesheets[i].href}">`

  customCSS += `
@page {
  size: ${settings.landscape ? 'landscape' : 'A4'};
}
html, body {
  overflow: visible !important;
  padding: 0 !important;
  margin: 0 !important;
  display: block !important;
  overflow: visible !important;
}
  .v-docs {
    display: block;
    overflow: visible;
  }
`

  customCSS += `
body {
-webkit-print-color-adjust: ${props.colorAdjust};
print-color-adjust: ${props.colorAdjust};
color-adjust: ${props.colorAdjust};
}
`
  const printDocs = printFrame.value?.contentDocument
  if (!printDocs)
    return

  printDocs.open()
  printDocs.write(
    `<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${settings.title}</title>
${sheet}
<style type="text/css" media="print">${css}</style>
<style type="text/css" media="print">${customCSS}</style>
  <style type="text/css" media="print">
   ${settings.customCSS || ''}
  </style>
</head>
`,
  )

  printDocs.write(
    `<body onload="window.print();" style="overflow: visible !important;padding: ${settings.pdfPadding ? `${settings.pdfPadding}cm` : '0.2cm'};">
        <div class="v-docs">
          ${settings.node.outerHTML}
        </div>
      </body>
    </html>
      `,
  )
  printDocs.close()
}

const savePDF = (ctx: PrintFrame) => {
  const settings = {
    landscape: ctx.landscape || props.landscape || false,
    debug: ctx.debug || props.debug || false,
    colorAdjust: ctx.colorAdjust || props.colorAdjust || 'none',
    pdfPadding: ctx.pdfPadding || props.pdfPadding || 1,
    paperDimensions: ctx.paperDimensions || props.paperDimensions || 'A4',
    node: ctx.node || null,
    customCSS: ctx.customCSS || props.customCSS || '',
    title: ctx.title || props.title || 'Print',
    saveFileTitle: ctx.saveFileTitle || 'save',
  } as PrintFrame

  const paperDim = settings.landscape ? paperLandscapeDimensions[settings.paperDimensions || 'A4'] : paperDimensions[settings.paperDimensions || 'A4']

  let css = ''
  const styles = document.querySelectorAll('style')

  for (let i = 0; i < styles.length; i++)
    css += styles[i].innerHTML

  let customCSS = ''

  let sheet = ''
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>
  for (let i = 0; i < stylesheets.length; i++)
    sheet += `<link rel="stylesheet" href="${stylesheets[i].href}">`

  customCSS += `
@page {
  size: ${settings.landscape ? 'landscape' : 'A4'};
}
html, body {
  overflow: visible !important;
  padding: 0 !important;
  margin: 0 !important;
  display: block !important;
  overflow: visible !important;
}
  .v-docs {
    display: block;
    overflow: visible;
  }
`

  customCSS += `
 body {
  -webkit-print-color-adjust: ${props.colorAdjust};
  print-color-adjust: ${props.colorAdjust};
  color-adjust: ${props.colorAdjust};
}
`
  const printPDF = printFrame.value?.contentDocument

  if (!printPDF)
    return

  printPDF.open()

  printPDF.write(
    `<!DOCTYPE html>
  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${settings.title}</title>
  ${sheet}
  <style type="text/css">${css}</style>
  <style type="text/css">${customCSS}</style>
    <style type="text/css">
     ${settings.customCSS || ''}
    </style>
  </head>
  `,
  )

  printPDF.write(
    `<body style="overflow: visible !important;width: ${paperDim.width}px;height: ${paperDim.height}px;padding: ${settings.pdfPadding ? `${settings.pdfPadding}cm` : '0.2cm'};margin: 0.5cm auto;">
        <div class="v-docs">
          ${settings.node.outerHTML}
        </div>
      </body>
    </html>
      `,
  )
  const ratio = printPDF.body.clientWidth / printPDF.body.clientHeight
  const height = ratio * printPDF.body.clientHeight
  const width = ratio * printPDF.body.clientWidth

  const pdf = new jsPDF({
    compress: true,
    unit: 'px',
    format: [width, height],
    orientation: settings.landscape ? 'l' : 'p',
  })

  pdf.html(printPDF.body, {
    callback(pdf) {
      pdf.save(`${settings.saveFileTitle}` + '.pdf')
    },
    html2canvas: {
      scale: ratio,
      width: printPDF.body.clientWidth,
      height: printPDF.body.clientHeight,
    },
    margin: [0, 0, 0, 0],
    x: 0,
    y: 0,
  })
}

defineExpose({
  print,
  savePDF,
})
</script>

<template>
  <Teleport to="body">
    <iframe
      ref="printFrame" :style="{
        border: 'none',
        visibility: 'hidden',
        position: 'absolute',
        top: '0px',
      }"
    />
  </Teleport>
</template>
