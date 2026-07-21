export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Abdul Sattar'

export const NAV_FALLBACK = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const PROFICIENCY_LABELS = [
  'Expert',
  'Advanced',
  'Intermediate',
  'Working Knowledge',
  'Familiar',
] as const

export const PROJECT_TYPES = [
  { label: 'Personal', value: 'personal' },
  { label: 'Professional', value: 'professional' },
  { label: 'Client', value: 'client' },
  { label: 'Company', value: 'company' },
  { label: 'Academic', value: 'academic' },
  { label: 'Open Source', value: 'open-source' },
  { label: 'Research', value: 'research' },
  { label: 'Internal', value: 'internal' },
] as const

export const PROJECT_STATUSES = [
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Planned', value: 'planned' },
  { label: 'Concept', value: 'concept' },
  { label: 'Archived', value: 'archived' },
  { label: 'Private', value: 'private' },
] as const

export const CONTACT_STATUSES = [
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Replied', value: 'replied' },
  { label: 'Converted', value: 'converted' },
  { label: 'Archived', value: 'archived' },
  { label: 'Spam', value: 'spam' },
] as const
