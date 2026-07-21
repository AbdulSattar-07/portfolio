import type { CollectionConfig } from 'payload'

import { canManageUsers, isAdmin, isSuperAdmin } from '@/access'

export const Admins: CollectionConfig = {
  slug: 'admins',
  labels: {
    singular: 'Admin',
    plural: 'Admins',
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'isActive', 'updatedAt'],
    group: 'System',
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      if (isSuperAdmin(user as never)) return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    create: canManageUsers,
    update: ({ req: { user }, id }) => {
      if (isSuperAdmin(user as never)) return true
      if (user && id === user.id) return true
      return false
    },
    delete: canManageUsers,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      access: {
        update: ({ req: { user } }) => isSuperAdmin(user as never),
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      access: {
        update: ({ req: { user } }) => isAdmin(user as never),
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      access: {
        update: () => false,
      },
    },
  ],
  hooks: {
    beforeLogin: [
      async ({ user }) => {
        if (user && 'isActive' in user && user.isActive === false) {
          throw new Error('This account is inactive. Contact a super admin.')
        }
      },
    ],
    afterLogin: [
      async ({ user, req }) => {
        if (!user?.id) return
        try {
          await req.payload.update({
            collection: 'admins',
            id: user.id,
            data: { lastLogin: new Date().toISOString() },
            depth: 0,
            context: { disableRevalidate: true },
            overrideAccess: true,
            req,
          })
        } catch {
          // non-critical — never block login
        }
      },
    ],
  },
  timestamps: true,
}
