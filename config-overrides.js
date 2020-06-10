const {override, fixBabelImports, addLessLoader} = require('customize-cra');

//  modifyVars: {'@primary-color': '#1DA57A'},  '@primary-color'定义了一个变量
//  指定了主体的颜色, Ant Design 的样式变量
/*
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-radius-base: 4px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
*/
module.exports = override(
    // 针对antd实现按需打包: 根据import来打包(使用工具包babel-plugin-import来按需打包)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'true',              // 自动打包相关的样式  , true 去处理less的源码文件           
    }),

    // 使用less-loader对源码中的less变量进行重新指定
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {'@primary-color': '#1DA57A'},     
        },
    }),
);