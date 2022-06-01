import { defineConfig } from 'dumi';

export default defineConfig({
  title: '吃个甘蔗嚼一年',
  favicon:
    'https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/logo.jpg',
  logo: 'https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/logo.jpg',
  outputPath: 'docs-dist',
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/React': [
      {
        title: '菜单项',
        path: '菜单路由（可选）',
        children: [
          // 菜单子项（可选）
          'React/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
    ],
    // 如果该路径有其他语言，需在前面加上语言前缀，需与 locales 配置中的路径一致

  },
  // '/guide': [
  //   {
  //     title: '菜单项',
  //     path: '菜单路由（可选）',
  //     children: [
  //       // 菜单子项（可选）
  //       'guide/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
  //     ],
  //   },
  // ],
    // 单语言配置方式如下
    // navs: [
    //   null, // null 值代表保留约定式生成的导航，只做增量配置
    //   {
    //     title: 'GitHub',
    //     path: 'https://github.com/umijs/dumi',
    //   },
    //   {
    //     title: '我有二级导航',
    //     path: '链接是可选的',
    //     // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
    //     children: [
    //       { title: '第一项', path: 'https://d.umijs.org' },
    //       { title: '第二项', path: '/guide' },
    //     ],
    //   },
    // ],
  // more config: https://d.umijs.org/config
});
