# 使用指南 (Usage Guide)

## 快速开始

### 方法 1: 直接打开网页

1. 下载或克隆此仓库
2. 用浏览器打开 `index.html`
3. 输入文字内容
4. 点击"生成图片"
5. 点击"下载图片"保存

### 方法 2: 部署到Web服务器

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx http-server

# 使用PHP
php -S localhost:8000
```

然后访问 http://localhost:8000

### 方法 3: 部署到静态托管服务

可以直接部署到以下服务:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 任何支持静态网站的托管服务

## 程序化使用

查看 `example.html` 获取详细的代码示例。

### 基础示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <canvas id="previewCanvas"></canvas>
    <script src="terminal-generator.js"></script>
    <script>
        // 创建生成器
        const generator = new TerminalImageGenerator();
        
        // 配置参数
        generator.updateConfig({
            width: 800,
            fontSize: 16,
            padding: 20
        });
        
        // 生成图片
        const text = `$ npm install
$ npm start
Server is running...`;
        
        generator.generate(text);
        
        // 下载图片
        generator.download('my-terminal.png');
    </script>
</body>
</html>
```

## API 参考

### TerminalImageGenerator

#### 构造函数

创建新的生成器实例。需要页面中有一个 id 为 `previewCanvas` 的 canvas 元素。

```javascript
const generator = new TerminalImageGenerator();
```

#### updateConfig(config)

更新生成器配置。

**参数:**
- `width` (number): 图片宽度（像素）
- `fontSize` (number): 字体大小（像素）
- `padding` (number): 内边距（像素）
- `lineHeight` (number): 行高倍数（默认 1.5）
- `backgroundColor` (string): 背景色（默认 '#000000'）
- `textColor` (string): 文字颜色（默认 '#FFFFFF'）
- `fontFamilyEnglish` (string): 英文字体（默认 'Cascadia Mono, Courier New, monospace'）
- `fontFamilyChinese` (string): 中文字体（默认 'Microsoft YaHei, SimHei, sans-serif'）

```javascript
generator.updateConfig({
    width: 1000,
    fontSize: 18,
    padding: 30,
    backgroundColor: '#1a1a1a',
    textColor: '#00ff00',
    fontFamilyEnglish: 'Cascadia Mono, Courier New, monospace',
    fontFamilyChinese: 'Microsoft YaHei, SimHei, sans-serif'
});
```

#### generate(text)

生成终端图片。

**参数:**
- `text` (string): 要显示的文字内容（支持 \n 换行）

**返回:**
- Object: `{ width, height, lineCount }`

```javascript
const info = generator.generate("$ echo 'Hello'\nHello");
console.log(info); // { width: 800, height: 88, lineCount: 2 }
```

#### toDataURL(type, quality)

导出为 Data URL。

**参数:**
- `type` (string): 图片类型（默认 'image/png'）
- `quality` (number): 图片质量 0-1（默认 1.0）

**返回:**
- string: Data URL

```javascript
const dataURL = generator.toDataURL('image/png', 1.0);
```

#### download(filename)

下载生成的图片。

**参数:**
- `filename` (string): 文件名（默认 'terminal-output.png'）

```javascript
generator.download('my-terminal-output.png');
```

## 常见问题

**Q: 如何支持更多颜色主题？**

A: 使用 `updateConfig` 修改背景色和文字颜色:

```javascript
// 绿色主题
generator.updateConfig({
    backgroundColor: '#001100',
    textColor: '#00ff00'
});

// 蓝色主题
generator.updateConfig({
    backgroundColor: '#000033',
    textColor: '#66ccff'
});
```

**Q: 如何让文字不换行？**

A: 增大 `width` 参数或减小 `fontSize` 参数。

**Q: 支持什么字符？**

A: 支持所有 Unicode 字符，包括中文、日文、韩文、表情符号等。系统会自动为中文字符使用中文字体（默认微软雅黑），英文字符使用英文字体（默认Cascadia Mono）。

**Q: 如何修改字体？**

A: 使用 `updateConfig` 修改 `fontFamilyEnglish` 和 `fontFamilyChinese` 参数:

```javascript
generator.updateConfig({
    fontFamilyEnglish: 'Consolas, monospace',
    fontFamilyChinese: 'SimSun, serif'
});
```

**Q: 如何在 React/Vue 中使用？**

A: 将 `terminal-generator.js` 引入项目，在组件挂载后创建实例即可:

```javascript
// React 示例
useEffect(() => {
    const generator = new TerminalImageGenerator();
    generator.generate(text);
}, [text]);
```

**Q: 生成的图片可以用于商业用途吗？**

A: 可以，本项目使用 MIT 协议。

## 技术细节

- **渲染引擎**: HTML5 Canvas 2D API
- **字体系统**: 混合字体支持，英文默认Cascadia Mono，中文默认微软雅黑
- **确定性**: 相同输入和配置在不同设备上产生相同输出
- **浏览器兼容性**: 支持所有现代浏览器
- **文件大小**: 
  - index.html: ~8KB
  - terminal-generator.js: ~6.5KB
  - 无外部依赖

## 许可证

MIT License - 可自由使用、修改和分发。
