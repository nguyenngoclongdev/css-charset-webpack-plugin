const { RawSource } = require('webpack-sources');

class CssCharsetWebpackPlugin {
    constructor(options = {}) {
        this.name = CssCharsetWebpackPlugin.name;
        this.charset = options.charset || 'utf-8';
    }

    apply(compiler) {
        const isWebpack5 = !!(compiler.webpack && compiler.webpack.version);

        // --- WEBPACK 5 / RSPACK PATH ---
        if (isWebpack5) {
            const { webpack } = compiler;
            const { Compilation } = webpack;
            const stage = Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE;

            compiler.hooks.thisCompilation.tap(this.name, (compilation) => {
                compilation.hooks.processAssets.tap({ name: this.name, stage }, (assets) => {
                    // Iterate using the new API to avoid directly touching compilation.assets
                    for (const asset of compilation.getAssets()) {
                        const fileName = asset.name;
                        if (!/\.css$/i.test(fileName)) continue;

                        const source = asset.source.source().toString();
                        const next = this.#withCharset(source, this.charset);
                        if (next !== source) {
                            // Prefer using compiler.webpack.sources if available
                            const RawSrc = (webpack && webpack.sources && webpack.sources.RawSource) || RawSource;
                            compilation.updateAsset(fileName, new RawSrc(next));
                        }
                    }
                });
            });
            return;
        }

        // --- WEBPACK 4 FALLBACK ---
        compiler.hooks.emit.tapAsync(this.name, (compilation, callback) => {
            for (const fileName of Object.keys(compilation.assets)) {
                if (!/\.css$/i.test(fileName)) continue;

                const source = compilation.assets[fileName].source().toString();
                const next = this.#withCharset(source, this.charset);
                if (next !== source) {
                    compilation.assets[fileName] = new RawSource(next);
                }
            }
            callback();
        });
    }

    // Add @charset at the beginning of the file and remove redundant @charset inside
    #withCharset(css, charset) {
        // Remove all existing @charset declarations
        const cleaned = css.replace(/@charset\s+["'][^"']+["'];?/gi, '');
        // If the file already starts with a valid @charset, return as is
        if (/^\s*@charset\s+["'][^"']+["'];/i.test(css)) return css;
        return `@charset "${charset}";\n\n${cleaned}`;
    }
}
module.exports = CssCharsetWebpackPlugin;
module.exports.default = CssCharsetWebpackPlugin;
