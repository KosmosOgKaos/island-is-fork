import { useLazyQuery } from '@apollo/client'
import { GET_FINANCE_DOCUMENT_DATA } from '../../lib/queries/getFinanceDocument'

const base64ToArrayBuffer = (base64Pdf: string) => {
  const binaryString = window.atob(base64Pdf)
  const binaryLen = binaryString.length
  const bytes = new Uint8Array(binaryLen)
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }
  return bytes
}

const getPdfURL = (base64Pdf: string) => {
  const byte = base64ToArrayBuffer(base64Pdf)
  const blob = new Blob([byte], { type: 'application/pdf' })
  return URL.createObjectURL(blob)
}

const documentIsPdf = (data: any) => {
  return (data?.type || '').toLowerCase() === 'pdf' && data?.document
}

export const showPdfDocument = () => {
  const [loadFinanceDocument] = useLazyQuery(GET_FINANCE_DOCUMENT_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (docData) => {
      const pdfData = docData?.getFinanceDocument?.docment || null
      if (pdfData && documentIsPdf(pdfData)) {
        window.open(getPdfURL(pdfData.document))
      } else {
        console.warn('No PDF data')
      }
    },
  })

  const showPdf = (id: string) => {
    loadFinanceDocument({
      variables: {
        input: {
          documentID: id,
        },
      },
    })
  }

  return {
    showPdf,
  }
}
