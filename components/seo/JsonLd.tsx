interface JsonLdProps {
  data: Record<string, unknown>
  id?: string
}

/** Renders a JSON-LD script. "<" is escaped so content can never close the script tag. */
export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
