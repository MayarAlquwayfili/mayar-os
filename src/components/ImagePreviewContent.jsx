import { contentTokens, windowChrome } from '../utils/windowContentTheme'

/**
 * macOS-style image preview — traffic lights only; content is the image or placeholder.
 */
export default function ImagePreviewContent({
  caption,
  placeholder,
  src,
  alt,
  uiTheme = 'light',
}) {
  const chrome = windowChrome(uiTheme)
  const T = contentTokens(uiTheme)
  return (
    <div className={`flex h-full min-h-0 flex-col ${chrome.bodyImagePreview}`}>
      <div
        className={`flex min-h-0 flex-1 items-center justify-center overflow-auto p-6 sm:p-10 ${T.contentProse}`}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? caption ?? ''}
            draggable={false}
            className="max-h-full max-w-full object-contain shadow-sm"
          />
        ) : (
          <div
            className={`flex w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border px-10 py-14 text-center shadow-sm ${T.borderMuted} ${uiTheme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-100'}`}
            role="img"
            aria-label={placeholder}
          >
            <p className={`text-base font-medium sm:text-lg ${T.textStrong}`}>
              {placeholder}
            </p>
            {caption ? (
              <p className={`text-[11px] font-medium ${T.textSubtle}`}>{caption}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
