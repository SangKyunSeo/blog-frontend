module.exports = {
	extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'no-undef': 'error',

		'prettier/prettier': [
			'error',
			// https://prettier.io/docs/en/options.html
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};