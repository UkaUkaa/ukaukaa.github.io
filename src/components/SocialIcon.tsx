import { Github, Linkedin, Mail, Send, Globe, AtSign, Briefcase, type LucideProps } from 'lucide-react';
import type { SocialPlatform } from '../data/types';

const ICONS: Record<SocialPlatform, React.ComponentType<LucideProps>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  telegram: Send,
  website: Globe,
  twitter: AtSign,
  freelancehunt: Briefcase,
};

export function SocialIcon({ platform, ...props }: { platform: SocialPlatform } & LucideProps) {
  const Icon = ICONS[platform];
  return <Icon aria-hidden strokeWidth={1.5} {...props} />;
}
