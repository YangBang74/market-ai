import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Базовые рекомендации для JS
  ...pluginVue.configs['flat/recommended'],
  
  // Отключаем правила, конфликтующие с Prettier
  prettierConfig,
  
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      // Здесь можно переопределить правила
      'vue/multi-word-component-names': 'off', // Часто мешает в небольших проектах
      
      // Настройки Tailwind
      'tailwindcss/classnames-order': 'warn', // Авто-сортировка классов
      'tailwindcss/no-custom-classname': 'off', // Отключаем, если используете свои классы в CSS
      'tailwindcss/enforces-shorthand': 'error', // Объединяет классы (напр. padding)
    },
  },
];