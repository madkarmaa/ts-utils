import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: 'src/**/*.ts',
    outDir: 'dist',
    dts: true,
    minify: true,
    clean: true,
    exports: {
        customExports(exports) {
            const exp: Record<
                string,
                string | { default: string; types: string }
            > = {};

            Object.entries(exports).forEach(
                ([key, value]: [string, string]) => {
                    if (key !== './package.json')
                        exp[key] = {
                            default: value,
                            types: value.replace('.js', '.d.ts'),
                        };
                    else exp[key] = value;
                },
            );

            return exp;
        },
    },
});
