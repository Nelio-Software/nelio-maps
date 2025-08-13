module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_+$',
				caughtErrorsIgnorePattern: '^_+e?$',
				varsIgnorePattern: '^_+$',
			},
		],
		'@typescript-eslint/no-duplicate-imports': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
		'import/no-unresolved': [ 'error', { ignore: [ '\\.js$' ] } ],
		'react-hooks/exhaustive-deps': 'off',
	},
};
