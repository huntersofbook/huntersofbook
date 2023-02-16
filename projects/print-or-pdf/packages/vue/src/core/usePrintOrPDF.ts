import { ref } from 'vue'

export function usePrintOrPDF() {
  interface Default {
    node: HTMLElement
    landscape?: boolean
    debug?: boolean
    colorAdjust?: 'exact' | 'economy' | 'none'
    pdfPadding?: number
    paperDimensions?: 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10'
    customCSS?: string
    title?: string
    saveFileTitle?: string
  }

    type PrintTpe = Omit<Default, 'saveFileTitle'>
    type PDFType = Omit<Default, 'title'>
    interface PrintFrame {
      print(ctx: PrintTpe): void
      savePDF(ctx: PDFType): void
    }

    const frame = ref<PrintFrame>()
    const fragment = ref()

    const print = (ctx?: Default) => {
      frame.value?.print({
        node: fragment.value,
        landscape: ctx?.landscape || false,
        debug: ctx?.debug || false,
        colorAdjust: ctx?.colorAdjust || 'exact',
        pdfPadding: ctx?.pdfPadding || 0.1,
        paperDimensions: ctx?.paperDimensions || 'A4',
        customCSS: ctx?.customCSS || '',
        title: ctx?.title || '',
      })
    }

    const savePDF = (ctx?: PDFType) => {
      frame.value?.savePDF({
        node: fragment.value,
        landscape: ctx?.landscape || false,
        debug: ctx?.debug || false,
        colorAdjust: ctx?.colorAdjust || 'exact',
        pdfPadding: ctx?.pdfPadding || 0.1,
        paperDimensions: ctx?.paperDimensions || 'A4',
        customCSS: ctx?.customCSS || '',
        saveFileTitle: ctx?.saveFileTitle || 'file.pdf',
      })
    }

    return { print, savePDF, frame, fragment }
}
