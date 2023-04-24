import { useState } from 'react'

type CopiedState = {
  isCopied: boolean | null
  copiedValue: string | null
}
type CopyFn = (text: string) => Promise<boolean>

function useCopyToClipboard(): [CopiedState, CopyFn] {
  const [copied, setCopied] = useState<CopiedState>({
    isCopied: null,
    copiedValue: null
  })

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied({
        isCopied: true,
        copiedValue: text
      })
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopied({
        isCopied: false,
        copiedValue: null
      })
      return false
    } finally {
      setTimeout(() => {
        setCopied({
        isCopied: null,
        copiedValue: null
      })
      }, 2000);
    }
  }

  return [copied, copy]
}

export default useCopyToClipboard