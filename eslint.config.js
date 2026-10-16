import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', 'test/fixtures', 'docs'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { console: 'readonly', process: 'readonly', Buffer: 'readonly' } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    // Classic browser scripts of the docs site (seasonal themes).
    files: ['assets/seasons/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: Object.fromEntries(
        ['window', 'document', 'navigator', 'globalThis', 'performance', 'requestAnimationFrame', 'cancelAnimationFrame', 'MutationObserver', 'CustomEvent'].map((name) => [name, 'readonly']),
      ),
    },
  },
)
