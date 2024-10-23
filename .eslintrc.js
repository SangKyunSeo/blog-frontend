module.exports = {
	extends: [
		'next/core-web-vitals',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['prettier', '@typescript-eslint'],
	rules: {
		'no-undef': 'off',

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
