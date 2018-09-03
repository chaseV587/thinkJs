# ep-app-master

> ep-app-master

## 从银商cnpm私有仓库安装项目依赖

```bash
cnpm install
```

## 项目模板目录结构

* `src/*`: all source code
* `app.js`: entrance of the Weex page
* `build/*`: some build scripts
* `dist/*`: where places generated code
* `assets/*`: some assets for Web preview
* `index.html`: a page with Web preview and qrcode of Weex js bundle
* `weex.html`: Web render
* `.babelrc`: babel config (preset-2015 by default)
* `.eslintrc`: eslint config (standard by default)

## 常用编译命令

```bash
# 编译源码，在dist下生成js bundle文件
npm run build

# 打包dist文件，生成zip包
npm run pack

# 对某个vue文件debug
ums debug youfile.vue
```

## notes

You can config more babel, ESLint and PostCSS plugins in `webpack.config.js`.
