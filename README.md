# HeartLook - AI 情感陪伴 Chatbot

一個基於 AI 的情感支持聊天機器人，提供溫暖的傾聽與支持。

## 🎨 設計風格

Medical & Clean 設計系統 - "Apple Health meets Notion" 美學
- 純白背景與專業醫療色彩
- 1px 清晰邊框，結構化佈局
- Royal Blue (#2563EB) 信任色調
- Emerald Green (#059669) 行動按鈕

## 🚀 快速開始

### 環境需求
- Node.js 18+
- npm 或 yarn

### 本地開發

1. **克隆專案**
```bash
git clone https://github.com/kmkaiuse-bit/heartlook.git
cd heartlook
```

2. **安裝依賴**
```bash
npm install
```

3. **設定環境變數**

創建 `.env.local` 檔案：
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324
SITE_URL=http://localhost:3000
```

4. **啟動開發伺服器**
```bash
npm run dev
```

訪問 http://localhost:3000

## 📦 部署到 Vercel

### 方法 1: 通過 Vercel Dashboard

1. 訪問 [Vercel Dashboard](https://vercel.com/new)
2. 導入 GitHub 倉庫: `kmkaiuse-bit/heartlook`
3. 配置環境變數：
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` = `deepseek/deepseek-chat-v3-0324`
   - `SITE_URL` = 你的 Vercel 網址
4. 點擊 **Deploy**

### 方法 2: 通過 Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

然後在 Vercel Dashboard 設定環境變數。

## 🛠️ 技術棧

- **框架**: Next.js 16 (App Router + Turbopack)
- **樣式**: Tailwind CSS 4 + Custom Design System
- **AI 模型**: OpenRouter + DeepSeek V3
- **部署**: Vercel
- **語言**: TypeScript + React 19

## 📂 專案結構

```
heartlook/
├── app/
│   ├── api/chat/          # AI 聊天 API 路由
│   ├── page.tsx           # 主頁面（Landing + Chat）
│   ├── layout.tsx         # 全局佈局
│   └── globals.css        # 全局樣式與設計系統
├── docs/                  # 文檔與需求
├── TODO.md               # 開發任務清單
└── vercel.json           # Vercel 配置
```

## ✨ 核心功能

### 已完成 ✅
- [x] Medical & Clean UI 設計系統
- [x] OpenRouter + DeepSeek V3 AI 整合
- [x] 共情對話系統
- [x] 上下文記憶（前端）
- [x] 快速回覆按鈕
- [x] 建議與資源面板

### 開發中 🔄
- [ ] 情緒識別與關鍵詞偵測
- [ ] 自動情緒摘要生成
- [ ] 諮詢師/工作坊推薦卡片
- [ ] Supabase 後端整合
- [ ] 用戶管理與註冊系統

## 🔐 隱私與安全

- 匿名對話模式（預設）
- 不儲存敏感個人資料
- 非診斷性回應
- GDPR 合規設計

## 📝 授權

MIT License

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
