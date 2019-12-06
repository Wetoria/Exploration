# vue-cli

## cli4

### Question

#### 1. vue serve/build的作用是什么？

#### 2. 如何进行webpack配置？

使用`vue.config.js`作为配置文件。

#### 3. npm的@开头的包名与普通包名有什么区别？

> 你也可以基于一个指定的 scope 使用第三方插件。例如如果一个插件名为 @foo/vue-cli-plugin-bar，你可以这样添加它：`vue add @foo/bar`

👆指定scope？

#### 4.这一段有什么用？
> public 目录提供的是一个应急手段，当你通过绝对路径引用它时，留意应用将会部署到哪里。如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀

### Notes

#### 快速原型开发


```
Usage: serve [options] [entry]

在开发环境模式下零配置为 .js 或 .vue 文件启动一个服务器


Options:

  -o, --open  打开浏览器
  -c, --copy  将本地 URL 复制到剪切板
  -h, --help  输出用法信息
```

```
Usage: build [options] [entry]

在生产环境模式下零配置构建一个 .js 或 .vue 文件


Options:

  -t, --target <target>  构建目标 (app | lib | wc | wc-async, 默认值：app)
  -n, --name <name>      库的名字或 Web Components 组件的名字 (默认值：入口文件名)
  -d, --dest <dir>       输出目录 (默认值：dist)
  -h, --help             输出用法信息

```

> 你也可以使用 vue build 将目标文件构建成一个生产环境的包并用来部署：
```
  vue build MyComponent.vue
```


#### 插件

> 每个CLI插件都会包含一个生成器和一个运行时插件。

- 生成器：用来创建文件
- 运行时插件：用来调整webpack核心配置和注入命令

```
// 添加插件
vue add eslint
```

👆这就让人很头大

vue add有可能会修改现有文件。

#### CLI服务


#### HTML和静态资源

Preload：用来指定页面加载后很快会被用到的资源。
```
<link rel="preload">
```

Prefetch：用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。
```
<link rel="prefetch">
```

#### webpack相关

指定CSS相关的loader时，使用css.loaderOptions，确保通过一个地方影响所有规则。

#### 环境变量和模式

你可以通过为 .env 文件增加后缀来设置某个模式下特有的环境变量。比如，如果你在项目根目录创建一个名为 .env.development 的文件，那么在这个文件里声明过的变量就只会在 development 模式下被载入。


你可以通过传递 --mode 选项参数为命令行覆写默认的模式。例如，如果你想要在构建命令中使用开发环境变量，请在你的 package.json 脚本中加入：

```
"dev-build": "vue-cli-service build --mode development",
```


[/]: 其实应该按照现有开发模式下，需要的配置去了解cli4构建的项目中要如何配置。那如果这样的话，loader这一块我不会，改过的配置也就alias和env


env中使用`VUE_APP_`开头的变量，以及`NODE_ENV`和`BASE_URL`，可以通过`process.env`直接调用，并且可以在`public/index.html`中通过`HTML插值`的形式使用。

[/]: 目前感觉这个会用到的不多。

> 提示
>
> 你可以在 vue.config.js 文件中计算环境变量。它们仍然需要以 VUE_APP_ 前缀开头。这可以用于版本信息 process.env.VUE_APP_VERSION = require('./package.json').version。

[/]: 可以用这种方式来判断应用版本

【Q】.env、.env.[mode]、.env.[mode].loacl的加载顺序是怎样的？如果在三个文件中添加相同变量，最后读取的值是哪个？

A: loacl > mode > env  
可以用local构建本地测试环境