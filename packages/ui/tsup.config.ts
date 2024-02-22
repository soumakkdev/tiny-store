import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => {
	return {
		entry: ['src/index.tsx'],
		splitting: false,
		sourcemap: false,
		clean: !options.watch,
		dts: true,
		format: ['esm', 'cjs'],
		minify: !options.watch,
		external: ['react', 'react-dom'],
		banner: {
			js: "'use client'",
		},
	}
})
