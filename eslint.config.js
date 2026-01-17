import pluginVue from 'eslint-plugin-vue';

export default [
  // Базовые рекомендации для JS
  ...pluginVue.configs['flat/recommended'],
  
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