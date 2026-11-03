import { Fragment, ReactNode } from 'react'

interface MarqueeProps {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  separator?: ReactNode
  reverse?: boolean
}

/** CSS-only infinite ticker. Content is duplicated so the loop is seamless. */
export default function Marquee({
  items,
  className = '',
  itemClassName = '',
  separator = <span className="mx-6 md:mx-10 inline-block h-2 w-2 rounded-full bg-current opacity-60" />,
  reverse = false,
}: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className={`whitespace-nowrap ${itemClassName}`}>{item}</span>
          {separator}
        </Fragment>
      ))}
    </div>
  )

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
