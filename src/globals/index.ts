import type { GlobalConfig } from 'payload'

import { adminOnly, editorOrAdmin } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'siteName', type: 'text', required: true, defaultValue: 'Abdul Sattar' },
            {
              name: 'siteTagline',
              type: 'text',
              defaultValue: 'AI, ERP & Full-Stack Software Developer',
            },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'darkLogo', type: 'upload', relationTo: 'media' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactEmail', type: 'email' },
            { name: 'businessEmail', type: 'email' },
            { name: 'phone', type: 'text' },
            { name: 'whatsapp', type: 'text' },
            { name: 'location', type: 'text' },
            { name: 'resume', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'githubUrl', type: 'text' },
            { name: 'linkedinUrl', type: 'text' },
            { name: 'kaggleUrl', type: 'text', label: 'Kaggle URL' },
            { name: 'facebookUrl', type: 'text' },
            { name: 'instagramUrl', type: 'text' },
            { name: 'youtubeUrl', type: 'text' },
            { name: 'xUrl', type: 'text', label: 'X / Twitter URL' },
          ],
        },
        {
          label: 'SEO & Features',
          fields: [
            { name: 'defaultSeoTitle', type: 'text' },
            { name: 'defaultSeoDescription', type: 'textarea' },
            { name: 'defaultSeoImage', type: 'upload', relationTo: 'media' },
            { name: 'footerText', type: 'textarea' },
            { name: 'copyrightText', type: 'text' },
            { name: 'analyticsId', type: 'text' },
            { name: 'maintenanceMode', type: 'checkbox', defaultValue: false },
            { name: 'blogEnabled', type: 'checkbox', defaultValue: false },
            { name: 'testimonialsEnabled', type: 'checkbox', defaultValue: true },
            { name: 'contactFormEnabled', type: 'checkbox', defaultValue: true },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateGlobal(
        ['site-settings', 'home', 'navigation'],
        ['/', '/about', '/contact', '/projects', '/skills', '/experience', '/certifications', '/services', '/blog', '/privacy-policy', '/terms'],
      ),
    ],
  },
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
    update: editorOrAdmin,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'fullName', type: 'text', defaultValue: 'Abdul Sattar' },
            {
              name: 'professionalTitle',
              type: 'text',
              defaultValue: 'AI, ERP & Full-Stack Software Developer',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Building intelligent systems that scale with business.',
            },
            {
              name: 'introduction',
              type: 'textarea',
              defaultValue:
                'I build scalable ERP systems, intelligent AI applications, business automation platforms and data-driven software solutions.',
            },
            { name: 'profileImage', type: 'upload', relationTo: 'media' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            { name: 'availabilityStatus', type: 'text', defaultValue: 'Open to opportunities' },
            { name: 'primaryCtaLabel', type: 'text', defaultValue: 'View Projects' },
            { name: 'primaryCtaUrl', type: 'text', defaultValue: '/projects' },
            { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Contact Me' },
            { name: 'secondaryCtaUrl', type: 'text', defaultValue: '/contact' },
            { name: 'showResumeButton', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          label: 'Highlights',
          fields: [
            {
              name: 'highlights',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            { name: 'featuredProjectsHeading', type: 'text', defaultValue: 'Featured work' },
            { name: 'featuredProjectsIntro', type: 'textarea' },
            {
              name: 'featuredProjects',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
            },
            { name: 'skillsHeading', type: 'text', defaultValue: 'Core capabilities' },
            {
              name: 'featuredSkillCategories',
              type: 'relationship',
              relationTo: 'skill-categories',
              hasMany: true,
            },
            { name: 'experienceHeading', type: 'text', defaultValue: 'Recent experience' },
            { name: 'servicesHeading', type: 'text', defaultValue: 'How I can help' },
            {
              name: 'featuredServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
            },
            { name: 'certificationsHeading', type: 'text', defaultValue: 'Credentials' },
            {
              name: 'featuredCertifications',
              type: 'relationship',
              relationTo: 'certifications',
              hasMany: true,
            },
            { name: 'testimonialsHeading', type: 'text', defaultValue: 'What clients say' },
            { name: 'contactCtaHeading', type: 'text', defaultValue: 'Let’s build something solid' },
            {
              name: 'contactCtaText',
              type: 'textarea',
              defaultValue: 'Have an ERP, AI, or full-stack product challenge? Tell me about it.',
            },
            { name: 'contactCtaLabel', type: 'text', defaultValue: 'Start a conversation' },
            { name: 'contactCtaUrl', type: 'text', defaultValue: '/contact' },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal(['home'], ['/'])],
  },
}

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: () => true,
    update: editorOrAdmin,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'pageHeading', type: 'text', defaultValue: 'About' },
    { name: 'biography', type: 'richText' },
    { name: 'careerSummary', type: 'textarea' },
    { name: 'professionalObjectives', type: 'textarea' },
    { name: 'workPhilosophy', type: 'textarea' },
    { name: 'currentRole', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'availability', type: 'text' },
    { name: 'profileImage', type: 'upload', relationTo: 'media' },
    { name: 'resume', type: 'upload', relationTo: 'media' },
    {
      name: 'languages',
      type: 'array',
      fields: [
        { name: 'language', type: 'text', required: true },
        { name: 'level', type: 'text' },
      ],
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'coreCompetencies',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
  hooks: {
    afterChange: [revalidateGlobal(['about'], ['/about'])],
  },
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'headerItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'external', type: 'checkbox', defaultValue: false },
        { name: 'visible', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'footerItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'external', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Hire me' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
    { name: 'showCta', type: 'checkbox', defaultValue: true },
  ],
  hooks: {
    afterChange: [revalidateGlobal(['navigation'], ['/'])],
  },
}
