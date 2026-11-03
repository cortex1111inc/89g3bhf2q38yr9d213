import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'accent' | 'secondary' | 'light' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  target?: string
  rel?: string
}

const styles = {
  base: 'group inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    primary: 'bg-ink text-white hover:bg-ink/90',
    accent: 'bg-accent text-white hover:bg-accent-dark',
    secondary: 'bg-white text-ink border border-ink/10 hover:border-ink/30',
    light: 'bg-white text-ink hover:bg-white/90',
    ghost: 'bg-transparent text-white border border-white/25 hover:border-white/60',
  },
  circle: {
    primary: 'bg-white text-ink group-hover:bg-accent group-hover:text-white',
    accent: 'bg-white text-accent',
    secondary: 'bg-ink text-white group-hover:bg-accent',
    light: 'bg-ink text-white group-hover:bg-accent',
    ghost: 'bg-white/10 text-white group-hover:bg-accent',
  },
  sizes: {
    sm: { btn: 'h-10 text-[13px]', pad: 'pl-5', circle: 'h-7 w-7', icon: 14 },
    md: { btn: 'h-12 text-[14px]', pad: 'pl-6', circle: 'h-9 w-9', icon: 16 },
    lg: { btn: 'h-14 text-[15px]', pad: 'pl-7', circle: 'h-11 w-11', icon: 18 },
  },
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  target,
  rel,
}: ButtonProps) {
  const s = styles.sizes[size]
  const pr = arrow ? (size === 'lg' ? 'pr-1.5' : 'pr-1') : size === 'sm' ? 'pr-5' : size === 'md' ? 'pr-6' : 'pr-7'
  const classes = `${styles.base} ${styles.variants[variant]} ${s.btn} ${s.pad} ${pr} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={`inline-flex items-center justify-center rounded-full transition-colors duration-300 ${s.circle} ${styles.circle[variant]}`}
        >
          <ArrowUpRight
            size={s.icon}
            className="transition-transform duration-300 group-hover:rotate-45"
            aria-hidden="true"
          />
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}
