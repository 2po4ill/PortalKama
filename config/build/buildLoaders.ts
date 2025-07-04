import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IBuildOptions} from "./types/config";
import path from "node:path";

export function buildLoaders({isDev}: IBuildOptions): webpack.RuleSetRule[] {
    /**
     * Загружает typescript
     */
    const typescriptLoader: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    /**
     * Загружает стили
     */
    const stylesLoader: webpack.RuleSetRule = {
        test: /\.s[ac]ss$/i,
        use: [
            // "style-loader",
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]'
                            : '[hash:base64:8]'
                    }
                }
            },
            "sass-loader",
        ],
    }

    /**
     * Загружает svg картинки
     */
    const svgLoader: webpack.RuleSetRule = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    }

    /**
     * Загружает картинки
     */
    const fileLoader: webpack.RuleSetRule = {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp|woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    // @ts-ignore
                    outputPath: (url, resourcePath, context) => {
                        const relativePath = path.relative(context, resourcePath);
                        if (/images/.test(resourcePath)) {
                            return `image/${url}`;
                        }

                        return `assets/${url}`;
                    }
                }

            },
        ],
    }

    return [
        typescriptLoader,
        stylesLoader,
        svgLoader,
        fileLoader
    ]
}