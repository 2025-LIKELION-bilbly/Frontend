import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 에러 무시 설정
      
      // 1. any 타입을 써도 에러를 내지 않음
      '@typescript-eslint/no-explicit-any': 'off',
      
      // 2. 정의했지만 사용하지 않은 변수(예: catch(e)의 e) 에러를 끔
      '@typescript-eslint/no-unused-vars': 'off',

      // 3. 빈 함수나 빈 객체에 대한 경고도 끔 (필요시)
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)