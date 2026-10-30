# 刘苏城 Sucheng Liu · Personal Homepage

刘苏城（Sucheng Liu）的个人主页，包含基本信息、个人照片、精选项目、整体架构与分层说明、演示视频，以及竞赛、软件著作权、学习和校园实践经历。

- 在线地址：[liusucheng0213.github.io](https://liusucheng0213.github.io/)
- 项目总库：[liusucheng](https://github.com/liusucheng0213/liusucheng)
- 技术：原生 HTML、CSS、JavaScript，无构建步骤和运行时依赖

## 本地预览

在仓库根目录运行：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:8765/`。

## 文件结构

```text
index.html          页面内容与语义结构
styles.css         视觉样式、响应式布局和动效
script.js          导航、图片预览、栏目高亮和媒体懒加载
assets/            本地照片、项目图、证书、视频与中文字幕
.nojekyll          GitHub Pages 静态发布配置
```

图片和证书可通过原生对话框查看大图；未启用 JavaScript 时仍可直接打开原图。视频按需加载，不自动播放，提供中文字幕与内容导览。演示视频记录录制时的功能，当前实现以对应项目仓库的源码为准。

## GitHub Pages

仓库通过 **Settings → Pages** 从 `main` 分支根目录部署，无需构建命令，访问 `https://liusucheng0213.github.io/`。

页面使用本地资源，不依赖外部字体、分析服务或后端接口。
