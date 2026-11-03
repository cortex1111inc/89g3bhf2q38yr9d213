import Link from 'next/link'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/services'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="bg-dots-dark absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />
      <div className="container-site relative text-center">
        <p className="font-impact text-[clamp(7rem,24vw,18rem)] leading-none tracking-wide text-accent">404</p>
        <h1 className="text-display-md mb-4">This page took a wrong turn.</h1>
        <p className="mx-auto mb-10 max-w-md text-ink/60">
          The page you are looking for does not exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg">Back to home</Button>
          <Button href="/contact" size="lg" variant="secondary">Contact us</Button>
        </div>
        <ul className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2.5">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="inline-block rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-medium transition-colors hover:bg-ink hover:text-white"
              >
                {service.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
