# Sucheng Liu · Personal Homepage

Sucheng Liu 的个人主页，包含基本信息、个人介绍和精选项目展示。

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
script.js          移动导航、栏目高亮和滚动出现效果
assets/            本地图片与图标
.nojekyll          GitHub Pages 静态发布配置
```

## GitHub Pages

仓库公开后，在 **Settings → Pages** 选择从 `main` 分支根目录部署，无需构建命令。启用后通过 `https://liusucheng0213.github.io/` 访问。

页面使用本地资源，不依赖外部字体、分析服务或后端接口。
