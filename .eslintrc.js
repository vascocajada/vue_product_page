module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/recommended'
    ],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        // Indent with 4 spaces
        "indent": ["error", 4],
        "vue/html-indent": ["error", 4],
        "vue/script-indent": ["error", 4],
    },
    parserOptions: {
        "parser": "babel-eslint",
        "sourceType": "module"
    }
}
