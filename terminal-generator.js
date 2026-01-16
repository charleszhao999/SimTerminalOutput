/**
 * SimTerminalOutput - 终端输出图片生成器
 * 生成黑底白字的终端风格图片，确保跨设备一致性
 */

class TerminalImageGenerator {
    constructor() {
        this.canvas = document.getElementById('previewCanvas');
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        // 默认配置
        this.config = {
            width: 800,
            fontSize: 16,
            padding: 20,
            lineHeight: 1.5,
            backgroundColor: '#000000',
            textColor: '#FFFFFF',
            fontFamilyEnglish: 'Cascadia Mono, Courier New, monospace',
            fontFamilyChinese: 'Microsoft YaHei, SimHei, sans-serif'
        };
    }
    
    /**
     * 更新配置
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    
    /**
     * 检测字符是否为中文字符
     */
    isChinese(char) {
        const code = char.charCodeAt(0);
        // CJK Unified Ideographs: 4E00-9FFF
        // CJK Unified Ideographs Extension A: 3400-4DBF
        // CJK Compatibility Ideographs: F900-FAFF
        return (code >= 0x4E00 && code <= 0x9FFF) ||
               (code >= 0x3400 && code <= 0x4DBF) ||
               (code >= 0xF900 && code <= 0xFAFF);
    }
    
    /**
     * 获取字符对应的字体
     */
    getFontForChar(char) {
        const { fontSize, fontFamilyEnglish, fontFamilyChinese } = this.config;
        if (this.isChinese(char)) {
            return `${fontSize}px ${fontFamilyChinese}`;
        } else {
            return `${fontSize}px ${fontFamilyEnglish}`;
        }
    }
    
    /**
     * 测量文本并进行自动换行
     */
    wrapText(text, maxWidth) {
        const lines = text.split('\n');
        const wrappedLines = [];
        
        for (let line of lines) {
            if (line === '') {
                wrappedLines.push('');
                continue;
            }
            
            // 测量整行宽度 - 需要考虑混合字体
            let totalWidth = 0;
            for (let char of line) {
                this.ctx.font = this.getFontForChar(char);
                totalWidth += this.ctx.measureText(char).width;
            }
            
            if (totalWidth <= maxWidth) {
                wrappedLines.push(line);
            } else {
                // 需要换行
                let currentLine = '';
                let currentWidth = 0;
                const chars = line.split('');
                
                for (let char of chars) {
                    this.ctx.font = this.getFontForChar(char);
                    const charWidth = this.ctx.measureText(char).width;
                    
                    if (currentWidth + charWidth > maxWidth && currentLine !== '') {
                        wrappedLines.push(currentLine);
                        currentLine = char;
                        currentWidth = charWidth;
                    } else {
                        currentLine += char;
                        currentWidth += charWidth;
                    }
                }
                
                if (currentLine !== '') {
                    wrappedLines.push(currentLine);
                }
            }
        }
        
        return wrappedLines;
    }
    
    /**
     * 生成终端图片
     */
    generate(text) {
        const { width, fontSize, padding, lineHeight, backgroundColor, textColor, fontFamilyEnglish } = this.config;
        
        // 设置默认字体（必须在测量之前设置）
        this.ctx.font = `${fontSize}px ${fontFamilyEnglish}`;
        
        // 计算可用宽度
        const availableWidth = width - (padding * 2);
        
        // 自动换行
        const lines = this.wrapText(text, availableWidth);
        
        // 计算实际行高
        const actualLineHeight = fontSize * lineHeight;
        
        // 计算画布高度
        const height = (lines.length * actualLineHeight) + (padding * 2);
        
        // 设置画布尺寸
        this.canvas.width = width;
        this.canvas.height = height;
        
        // 填充背景色
        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        
        // 设置文本样式
        this.ctx.fillStyle = textColor;
        this.ctx.textBaseline = 'top';
        
        // 绘制文本 - 逐字符绘制以支持混合字体
        lines.forEach((line, lineIndex) => {
            let x = padding;
            const y = padding + (lineIndex * actualLineHeight);
            
            for (let char of line) {
                // 为每个字符设置合适的字体
                this.ctx.font = this.getFontForChar(char);
                this.ctx.fillText(char, x, y);
                x += this.ctx.measureText(char).width;
            }
        });
        
        return {
            width,
            height,
            lineCount: lines.length
        };
    }
    
    /**
     * 导出为图片
     */
    toDataURL(type = 'image/png', quality = 1.0) {
        return this.canvas.toDataURL(type, quality);
    }
    
    /**
     * 下载图片
     */
    download(filename = 'terminal-output.png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = this.toDataURL();
        link.click();
    }
}

// 全局实例
const generator = new TerminalImageGenerator();

/**
 * 生成图片
 */
function generateImage() {
    const text = document.getElementById('textInput').value;
    const width = parseInt(document.getElementById('widthInput').value) || 800;
    const fontSize = parseInt(document.getElementById('fontSizeInput').value) || 16;
    const padding = parseInt(document.getElementById('paddingInput').value) || 20;
    const backgroundColor = document.getElementById('bgColorInput').value || '#000000';
    const textColor = document.getElementById('textColorInput').value || '#FFFFFF';
    const fontFamilyEnglish = document.getElementById('fontEnglishInput').value || 'Cascadia Mono, Courier New, monospace';
    const fontFamilyChinese = document.getElementById('fontChineseInput').value || 'Microsoft YaHei, SimHei, sans-serif';
    
    if (!text.trim()) {
        alert('请输入文字内容！');
        return;
    }
    
    // 更新配置
    generator.updateConfig({
        width,
        fontSize,
        padding,
        backgroundColor,
        textColor,
        fontFamilyEnglish,
        fontFamilyChinese
    });
    
    // 生成图片
    const info = generator.generate(text);
    
    // 显示信息
    const infoDiv = document.getElementById('imageInfo');
    infoDiv.textContent = `图片尺寸: ${info.width} × ${info.height} 像素 | 行数: ${info.lineCount}`;
    
    // 显示输出区域
    document.getElementById('outputSection').classList.remove('hidden');
    document.getElementById('downloadBtn').disabled = false;
}

/**
 * 下载图片
 */
function downloadImage() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    generator.download(`terminal-output-${timestamp}.png`);
}

// 页面加载完成后的初始化
window.addEventListener('DOMContentLoaded', () => {
    // 设置示例文本
    const exampleText = `$ npm install
npm WARN deprecated package@1.0.0
+ project@1.0.0
added 42 packages in 3.14s

$ npm start
> project@1.0.0 start
> node server.js

Server running on http://localhost:3000
Ready to accept connections...`;
    
    document.getElementById('textInput').value = exampleText;
    
    // 自动生成示例图片
    generateImage();
});
