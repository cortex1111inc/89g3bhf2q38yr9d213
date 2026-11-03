import { Bot, Cloud, Code2, Compass, Globe, Megaphone, PenTool, Smartphone, type LucideProps } from 'lucide-react'
import type { ServiceIcon as ServiceIconKey } from '@/lib/services'

const ICONS = {
  code: Code2,
  bot: Bot,
  smartphone: Smartphone,
  globe: Globe,
  pen: PenTool,
  cloud: Cloud,
  compass: Compass,
  megaphone: Megaphone,
}

export default function ServiceIcon({ name, ...props }: { name: ServiceIconKey } & LucideProps) {
  const Icon = ICONS[name]
  return <Icon aria-hidden="true" {...props} />
}
