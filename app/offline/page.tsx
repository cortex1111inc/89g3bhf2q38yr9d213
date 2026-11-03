import Link from 'next/link'

export const metadata = {
  title: 'Offline',
  description: 'You are offline. Cached Vanspire pages remain available while the network is unavailable.',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <section className="section-pad bg-brand-offwhite">
      <div className="container-site max-w-3xl">
        <p className="text-label text-brand-muted">Offline</p>
        <h1 className="text-display-md text-brand-black mt-4">
          You are offline right now.
        </h1>
        <p className="text-body text-brand-muted max-w-2xl mt-6">
          Cached pages are still available, and anything submitted from supported forms will be
          queued on this device and retried automatically once the connection returns.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center h-[48px] px-6 bg-brand-black text-white text-[14px] font-medium hover:bg-brand-muted transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center h-[48px] px-6 border border-brand-black text-brand-black text-[14px] font-medium hover:bg-white transition-colors"
          >
            Open Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
