# SimTerminalOutput

🖥️ 模拟终端输出图片生成器 - 将文本转换为黑底白字的终端风格图片

## 功能特性

- ✅ **输入文字，输出终端图片**: 支持多行文本输入
- ✅ **黑底白字终端风格**: 经典的终端外观
- ✅ **可配置图片宽度**: 根据需求自定义图片宽度
- ✅ **自动高度调整**: 根据文字行数自动计算图片高度
- ✅ **可部署在网页**: 纯HTML/JavaScript实现，无需后端
- ✅ **跨设备一致性**: 使用Canvas 2D API确保相同输入产生相同输出
- ✅ **自动换行**: 超长文本自动换行处理
- ✅ **可自定义参数**: 字体大小、内边距等可调整

## 快速开始

### 方式一: 直接使用网页

1. 下载或克隆此仓库
2. 用浏览器打开 `index.html`
3. 输入文字内容
4. 点击"生成图片"按钮
5. 点击"下载图片"保存结果

### 方式二: 部署到Web服务器

将整个项目文件夹上传到任意Web服务器或静态网站托管服务（如GitHub Pages、Netlify、Vercel等）即可使用。

```bash
# 使用Python快速启动本地服务器
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server
```

然后访问 `http://localhost:8000`

## 使用示例

### 基础使用

1. **输入文字**: 在文本框中输入要显示的内容
   ```
   $ npm install
   $ npm start
   Server running on port 3000...
   ```

2. **设置参数**:
   - 图片宽度: 800像素（默认）
   - 字体大小: 16像素（默认）
   - 内边距: 20像素（默认）

3. **生成并下载**: 点击生成图片，预览满意后下载

### 程序化使用

如果需要在自己的项目中集成，可以直接使用 `TerminalImageGenerator` 类：

```javascript
// 引入脚本
<script src="terminal-generator.js"></script>

// 创建生成器实例
const generator = new TerminalImageGenerator();

// 配置参数
generator.updateConfig({
    width: 1000,
    fontSize: 18,
    padding: 30
});

// 生成图片
const text = "$ echo 'Hello World'\nHello World";
const info = generator.generate(text);

// 获取图片数据
const dataURL = generator.toDataURL('image/png');

// 或直接下载
generator.download('my-terminal.png');
```

## API 文档

### TerminalImageGenerator 类

#### 构造函数
```javascript
const generator = new TerminalImageGenerator()
```

#### 方法

**updateConfig(config)**
- 更新生成器配置
- 参数:
  - `width`: 图片宽度（像素）
  - `fontSize`: 字体大小（像素）
  - `padding`: 内边距（像素）
  - `lineHeight`: 行高倍数（默认1.5）
  - `backgroundColor`: 背景色（默认'#000000'）
  - `textColor`: 文字颜色（默认'#FFFFFF'）

**generate(text)**
- 生成终端图片
- 参数: `text` - 要显示的文字内容
- 返回: 包含 `width`、`height`、`lineCount` 的对象

**toDataURL(type, quality)**
- 导出图片为Data URL
- 参数:
  - `type`: 图片类型（默认'image/png'）
  - `quality`: 图片质量（0-1，默认1.0）
- 返回: Data URL 字符串

**download(filename)**
- 下载生成的图片
- 参数: `filename` - 文件名（默认'terminal-output.png'）

## 技术实现

- **HTML5 Canvas**: 用于图像渲染
- **原生JavaScript**: 无任何外部依赖
- **Courier New字体**: 使用系统标准等宽字体，确保跨平台一致性
- **确定性渲染**: 使用Canvas 2D Context确保相同输入产生相同输出

## 浏览器兼容性

支持所有现代浏览器:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 文件结构

```
SimTerminalOutput/
├── index.html              # 主页面，包含UI界面
├── terminal-generator.js   # 核心生成器类
└── README.md              # 说明文档
```

## 常见问题

**Q: 为什么需要确保跨设备一致性？**  
A: 使用Canvas 2D API和标准系统字体（Courier New），在相同输入和配置下，不同设备会生成完全相同的图片。

**Q: 支持中文吗？**  
A: 完全支持中文及其他Unicode字符。

**Q: 可以修改颜色方案吗？**  
A: 可以通过 `updateConfig` 方法修改 `backgroundColor` 和 `textColor` 参数。

**Q: 图片太大或太小怎么办？**  
A: 可以调整"图片宽度"和"字体大小"参数来控制最终图片尺寸。

## 开源协议

MIT License

## 贡献

欢迎提交Issue和Pull Request！