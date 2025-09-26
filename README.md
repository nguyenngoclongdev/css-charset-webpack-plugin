# css-charset-webpack-plugin

css-charset-webpack-plugin is a plugin that makes sure every generated CSS file starts with a valid `@charset` rule, so browsers can correctly detect the file’s character encoding (usually `utf-8`).

If you find this plugin useful for your projects, please consider supporting me by [Github](https://github.com/sponsors/nguyenngoclongdev), [Patreon](https://patreon.com/nguyenngoclong), [KO-FI](https://ko-fi.com/nguyenngoclong) or [Paypal](https://paypal.me/longnguyenngoc). It's a great way to help me maintain and improve this tool in the future. Your support is truly appreciated!

[![Github](https://img.shields.io/badge/Github-F15689?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/nguyenngoclongdev)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/nguyenngoclong)
[![KO-FI](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/nguyenngoclong)
[![Paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/longnguyenngoc)

---

## ✨ Features

- ✅ Adds a valid `@charset` rule at the very top of every CSS file.
- ✅ Removes any duplicate or misplaced `@charset` rules for spec compliance.
- ✅ Works with Webpack 4, Webpack 5, and Rspack.
- ✅ Supports both CommonJS and ES Modules.

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
