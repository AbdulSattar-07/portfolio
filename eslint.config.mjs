/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'src/app/(payload)/admin/importMap.js'],
  },
]

export default eslintConfig
