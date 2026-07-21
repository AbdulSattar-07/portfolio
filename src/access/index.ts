import type { Access, FieldAccess } from 'payload'

import type { Admin } from '@/payload-types'

type User = Admin | null | undefined

export const isSuperAdmin = (user: User): boolean =>
  Boolean(user && user.role === 'super-admin' && user.isActive !== false)

export const isAdmin = (user: User): boolean =>
  Boolean(
    user &&
      (user.role === 'super-admin' || user.role === 'admin') &&
      user.isActive !== false,
  )

export const isEditor = (user: User): boolean =>
  Boolean(
    user &&
      (user.role === 'super-admin' ||
        user.role === 'admin' ||
        user.role === 'editor') &&
      user.isActive !== false,
  )

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const adminOnly: Access = ({ req: { user } }) => isAdmin(user as User)

export const superAdminOnly: Access = ({ req: { user } }) =>
  isSuperAdmin(user as User)

export const editorOrAdmin: Access = ({ req: { user } }) =>
  isEditor(user as User)

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}

export const publicReadOrAuth: Access = ({ req: { user } }) => {
  if (user) return true
  return true
}

export const anyone: Access = () => true

export const noOne: Access = () => false

export const canManageUsers: Access = ({ req: { user } }) =>
  isSuperAdmin(user as User)

export const fieldAdminOnly: FieldAccess = ({ req: { user } }) =>
  isAdmin(user as User)

export const canDelete: Access = ({ req: { user } }) =>
  isSuperAdmin(user as User) ||
  (user as User)?.role === 'admin'
