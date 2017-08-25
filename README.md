# Vue的编译环境
> 本编译环境是基于gulp和webpack编写的，使用简单，步骤如下：


一、克隆本项目
```bash
git clone https://github.com/ronghuaxueleng/vue2-wabpack-env.git
```

二、安装依赖
```bash
cd vue2-wabpack-env
npm install
```

三、修改配置
配置在gulpfile.js中，要修改的位置是下面这段配置的**source**和**dist**，以及**assets_custom_static**这三项配置
```javascript
var config = {
    base: path.join(__dirname), //项目根目录
    env: options.env, //编译环境
    pkg: require('./package.json'), //package.json内容
    version: "0.01", //版本号（这里可以省略，直接从pkg中读取即可）
    source: path.join(__dirname, 'resources/assets'), //要编译的VUE源码根目录
    test: path.join(__dirname, 'test'), //测试目录
    dist: path.join(__dirname, 'public'), //编译后的目录
    assets_custom_static: path.join(__dirname, 'resources/assets/static'), //静态文件目录
    assets_sub_directory: '', //
    assets_public_path: '/' //编译后根目录
};
```

四、执行
```javascript
//开发环境
npm run d
//生产环境
npm run b
//文件监测
npm run w
```