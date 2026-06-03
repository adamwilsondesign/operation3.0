interface SourceLinkProps {
  id: number
  onRefClick: (id: number) => void
}

/**
 * Inline citation button. Renders as a superscript-style [n] link.
 * Clicking opens the references drawer at the cited entry.
 *
 * Usage (inline with text):
 *   <SourceLink id={1} onRefClick={openRef} />
 */
export default function SourceLink({ id, onRefClick }: SourceLinkProps) {
  return (
    <button
      type="button"
      onClick={() => onRefClick(id)}
      className="
        inline-flex items-center justify-center
        font-mono text-[10px] font-medium
        text-tertiary hover:text-accent
        transition-colors duration-250
        align-super leading-none ml-[2px]
      "
      aria-label={`View source ${id}`}
    >
      [{id}]
    </button>
  )
}
