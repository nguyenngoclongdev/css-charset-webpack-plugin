# css-charset-webpack-plugin

**CssCharsetPlugin** is a plugin compatible with **Webpack 4/5** and **Rspack**.  
It ensures that every emitted CSS file starts with a proper `@charset` declaration, improving character encoding compatibility across browsers.

Supports both **CommonJS (require)** and **ES Modules (import)** syntax.

---

## ✨ Features

-   ✅ Works with Webpack 4, Webpack 5, and Rspack
-   ✅ Supports CommonJS and ES Modules
-   ✅ Automatically prepends `@charset` to the first line of every emitted `.css` file

---

## 📦 Installation

```bash
npm install css-charset-webpack-plugin --save-dev
```

## 🚀 Usage

**CommonJS (webpack.config.js / rspack.config.js)**

```js
const CssCharsetPlugin = require('css-charset-webpack-plugin');

module.exports = {
    plugins: [
        new CssCharsetPlugin({
            charset: 'utf-8',
        })
    ]
};
```

**ES Modules (webpack.config.mjs / rspack.config.mjs)**

```js
import CssCharsetPlugin from 'css-charset-webpack-plugin';

export default {
    plugins: [
        new CssCharsetPlugin({
            charset: 'utf-8',
        })
    ]
};
```

## 📝 Output Example

After build, all CSS files will automatically include the @charset declaration at the top:

```cs
@charset "utf-8";

html {
  margin: 0;
  padding: 0;
}
```

## ⚙️ Options

| Name       | Type     | Default  | Description                                                                                   |
| ---------- | -------- | -------- | --------------------------------------------------------------------------------------------- |
| charset    | `string` | `utf-8`  | Character encoding to prepend. Usually set to `utf-8` for maximum compatibility.              |

## 📌 Note

According to the CSS specification,

-   Only the very first @charset rule at the top of the file is valid.
-   Any additional @charset rules are ignored by browsers and may cause compatibility issues.
    👉 For safety, all existing @charset rules in the CSS file will be removed before prepending the new one.

## 📄 License

MIT © 2025 Nguyen Ngoc Long
