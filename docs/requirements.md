# AI 情感陪伴 Chatbot POC 需求文檔

## 1. 項目概述與核心價值

### 項目概述
本項目旨在開發一個 AI 驅動的情感陪伴 Chatbot 概念驗證 (Proof of Concept, POC)，作為一個 24/7 在線的情緒支持工具。它利用先進的自然語言處理 (NLP) 技術，提供即時、共情的對話體驗，幫助用戶緩解日常壓力、焦慮或孤獨感。Chatbot 不僅充當傾聽者，還能識別用戶的情緒信號，並在適當時機將高潛在需求用戶導流至專業心理諮詢服務或工作坊，從而實現從自助支持到專業介入的無縫轉移。

項目聚焦於 MVP (Minimum Viable Product) 階段，強調簡單、易用性和隱私保護。預期部署為 Web 或移動端聊天介面，整合現有 AI 模型（如 GPT 系列）來實現核心對話邏輯。未來可擴展為完整產品，涵蓋更多情緒追蹤和社區功能。

### 核心價值
- **用戶價值**：提供隨時可及的情感支持，減輕用戶的孤獨感，提升心理韌性。對於高風險用戶，及時導流可防止問題惡化。
- **商業價值**：作為漏斗頂端工具，捕獲潛在客戶，轉化率預計 10-20%（基於類似心理 App 數據）。導流至付費諮詢或工作坊，可產生收入，並建立品牌信任。
- **社會價值**：填補心理健康資源短缺的空白，尤其在非高峰時段或偏遠地區，促進心理健康意識的普及。
- **差異化**：相較傳統 Chatbot，本產品強調「擬人化共情」，不僅回應問題，還模擬人類傾聽的溫暖，避免冷冰冰的機器感。

潛在挑戰：AI 情緒識別的準確性可能因文化或語言差異而受限（例如，中文俚語情緒表達）；用戶隱私敏感，需嚴格遵守 GDPR 或類似法規；導流過於積極可能引起用戶反感，導致流失。

## 2. 用戶畫像與使用場景

### 用戶畫像
- **主要用戶 (Primary Persona)**：小明，25-35 歲都市白領，工作壓力大，偶爾感到焦慮或孤獨。使用智能手機，習慣在下班後或深夜使用 App 尋求快速情緒釋放。期望簡單、匿名互動，不想立即承諾付費諮詢。
- **次要用戶 (Secondary Persona)**：小華，18-24 歲學生，面臨學業或人際壓力。對心理健康有初步意識，但預算有限，更傾向免費自助工具。可能在高峰期（如考試季）頻繁使用。
- **高價值用戶 (High-Value Persona)**：小李，30-45 歲中層管理者，經歷重大生活事件（如失業或喪親），需要專業介入。對導流敏感，但若信任建立，可轉化為忠實客戶。
- **共同特徵**：中文使用者，注重隱私，偏好移動端；情緒觸發點包括工作壓力、關係問題或日常小挫折。用戶規模預估：MVP 階段 100-500 名測試用戶。

### 使用場景
- **場景 1: 日常情緒疏導**：用戶在深夜失眠時打開 Chatbot，描述「今天工作超累，心情好低落」。Chatbot 提供共情回應，如「聽起來你今天真的很辛苦，我在這裡陪你聊聊」，並記住上下文，逐步引導用戶釋放情緒。
- **場景 2: 關鍵詞導流**：對話中用戶提到「我覺得自己快崩潰了，需要專業幫助」。Chatbot 生成情緒摘要（如「你似乎正經歷嚴重焦慮」），並推送諮詢預約連結或工作坊海報，允許用戶一鍵導流。
- **場景 3: 會話結束跟進**：用戶結束對話後，Chatbot 發送摘要郵件或通知，建議下次使用或相關資源，維持用戶黏性。
- **邊緣場景**：用戶匿名使用但後續註冊，允許追蹤情緒趨勢；或在高峰負載時，Chatbot 優雅降級至基本回應。

補充重要功能：添加匿名模式切換，讓用戶無需註冊即可開始聊天，但註冊後可解鎖情緒歷史查看，提升復用率。

## 3. 功能清單（MVP / Nice to Have）

### MVP 功能（核心，必須實現）
- **AI 擬人化情感交流**：Chatbot 以溫暖、共情的角色（如「一位善解人意的朋友」）回應用戶輸入。使用預設系統提示確保回應聚焦情緒支持，避免醫療建議。支持即時回應（<3 秒延遲）。
- **上下文對話記憶**：在單次會話中，記住前 5-10 輪對話，維持連貫性。例如，若用戶先前提到「失戀」，後續回應可參考此點。
- **關鍵詞觸發導流**：監測對話中的情緒關鍵詞（如「崩潰」「自殺」「絕望」）或會話結束信號，生成簡短情緒摘要（<100 字），並推送自訂導流卡片（如「考慮預約諮詢師？」連結至外部日曆或工作坊頁面）。
- **基本用戶介面**：簡單聊天視窗，支持文字輸入/輸出，包含發送按鈕和會話重置選項。
- **補充功能：隱私通知**：開啟時顯示「您的對話匿名且不儲存」，並提供退出機制。

### Nice to Have 功能（未來迭代）
- **情緒趨勢追蹤**：用戶註冊後，彙總多會話情緒數據，生成週報（如「本週焦慮指數上升，建議深呼吸練習」）。
- **多模態輸入**：支持語音輸入/輸出，提升無屏使用（如通勤時）。
- **反饋機制**：會話結束後，詢問「這次聊天有幫助嗎？（1-5 分）」，用於產品迭代。
- **個性化角色選擇**：用戶選「嚴肅傾聽者」或「幽默陪伴者」，調整 AI 風格。
- **整合外部 API**：如天氣或音樂推薦，作為情緒緩解輔助（e.g., 「心情低落？試聽這首輕音樂」）。

潛在挑戰：關鍵詞觸發的假陽性（e.g., 「崩潰」可能指電腦問題），需精煉規則以避免誤導流；Nice to Have 功能可能增加複雜度，延遲 MVP 上線。

## 4. 建議的模組錨定 (Module Anchors)

從產品視角，模組錨定定義為獨立、可擴展的業務單元，每個錨定聚焦核心價值，確保模組間鬆耦合：
- **聊天核心模組**：處理對話輸入/輸出、共情邏輯和上下文管理。錨定點：AI 提示工程和會話狀態。
- **情緒識別模組**：分析關鍵詞和情緒信號，生成摘要。錨定點：規則引擎和門檻設定（e.g., 情緒強度 > 7/10 觸發導流）。
- **導流模組**：管理推送卡片和外部連結整合。錨定點：轉化追蹤（如點擊率），未來連接 CRM 系統。
- **用戶管理模組**：處理註冊、匿名模式和反饋收集。錨定點：隱私合規，作為入口守門員。
- **後端服務模組**：統籌會話儲存和通知。錨定點：可擴展性，支援未來多語言。

這些模組允許漸進開發，例如先建聊天核心，再加導流。

## 5. 頁面結構圖

產品採用單頁應用 (SPA) 風格，聚焦移動優先設計。以下為文本式結構圖（想像為流程圖）：

```
入口頁 (Landing Page)
├── 歡迎標語："隨時有我在，陪你聊聊心情"
├── 快速開始按鈕 → 跳轉聊天視窗
└── 隱私政策連結 / 註冊選項 (Nice to Have)

聊天主頁 (Chat Interface) - 核心頁面
├── 頂部：角色介紹 ("我是你的情感夥伴") + 會話標題 (e.g., "今晚的傾訴")
├── 中間：聊天泡泡區
│   ├── 用戶輸入框 + 發送按鈕
│   ├── 歷史訊息顯示 (滾動視窗，限 20 輪)
│   └── 情緒摘要彈窗 (觸發時浮現)
├── 底部：工具列
│   ├── 重置會話按鈕
│   ├── 導流卡片區 (e.g., "預約諮詢" 卡片，含連結)
│   └── 反饋星級 (Nice to Have)
└── 側邊抽屜 (抽屜式)：用戶設定 (匿名/註冊) + 情緒歷史 (註冊後)

導流頁 (Modal 或 外部跳轉)
├── 摘要顯示："從對話中，我感受到你的壓力來源是..."
├── 行動 CTA： "立即預約" (連結至 Google Calendar 或工作坊頁)
└── 關閉按鈕，返回聊天

後續頁 (Post-Session)
├── 感謝頁："謝謝分享，記得照顧自己"
├── 郵件訂閱或 App 下載提示
└── 返回入口
```

導航流：用戶 80% 時間停留在聊天主頁。無需複雜菜單，保持沉浸感。

## 6. 數據結構建議

從產品視角，數據結構聚焦用戶旅程和業務洞察：
- **會話數據**：儲存單次對話摘要（不存完整歷史，以保護隱私），包括開始時間、情緒關鍵詞、導流觸發次數。
- **用戶數據**：匿名 ID、註冊資訊（email）、情緒趨勢（聚合分數，非原始訊息）。
- **導流數據**：點擊記錄、轉化狀態，用於 A/B 測試導流文案。
- **系統數據**：AI 回應日誌（匿名），用於優化提示。

建議使用 JSON 格式儲存會話狀態（e.g., {"context": ["用戶說失戀"], "emotion_score": 6}），避免過度持久化。未來可匿名聚合用於洞察，如「80% 用戶壓力來自工作」。

## 7. 數據庫設置指南 (Supabase)

本項目需要數據庫來儲存會話上下文（單次 Session）、用戶偏好和導流記錄，確保對話連貫性和業務追蹤。使用 Supabase（基於 PostgreSQL）作為後端，易於 POC 開發，支持即時訂閱（Realtime）以更新聊天狀態。

### 完整的 Supabase 設置步驟
1. **帳戶與專案設定**：
   - 註冊 Supabase 帳戶（免費層足夠 POC）。
   - 建立新專案 (e.g., "ai-emotional-chatbot"），選擇地區（如亞洲伺服器以低延遲）。
   - 啟用 Realtime（預設開啟），用於即時會話更新。
   - 安裝 Supabase CLI：`npm install -g supabase`。
   - 產生 API 金鑰：從 Dashboard > Settings > API 複製 anon 和 service_role 金鑰，用於前端/後端整合。

2. **表結構設計**：
   - **users 表**：儲存用戶基本資訊（匿名優先）。
   - **sessions 表**：儲存單次會話上下文和摘要。
   - **lead_flows 表**：記錄導流事件，用於轉化追蹤。
   - **feedbacks 表**：收集用戶反饋（Nice to Have）。

   關係：users (1:N) sessions；sessions (1:1) lead_flows。

3. **SQL 創建語句**（在 Supabase SQL Editor 執行）：
   ```sql
   -- 創建 users 表
   CREATE TABLE users (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       email TEXT UNIQUE NULL,  -- 可選，匿名用戶留空
       is_anonymous BOOLEAN DEFAULT true,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- 創建 sessions 表
   CREATE TABLE sessions (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       user_id UUID REFERENCES users(id) ON DELETE CASCADE,
       context JSONB NOT NULL,  -- 儲存對話上下文 e.g. {"messages": [...], "emotion_keywords": ["焦慮"]}
       emotion_summary TEXT,    -- 生成的摘要
       session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       session_end TIMESTAMP WITH TIME ZONE,
       is_active BOOLEAN DEFAULT true
   );

   -- 創建 lead_flows 表
   CREATE TABLE lead_flows (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
       trigger_keywords TEXT[],  -- e.g. {"崩潰", "幫助"}
       flow_type TEXT NOT NULL,  -- e.g. "consultation" or "workshop"
       clicked BOOLEAN DEFAULT false,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- 創建 feedbacks 表 (Nice to Have)
   CREATE TABLE feedbacks (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
       rating INTEGER CHECK (rating >= 1 AND rating <= 5),
       comment TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

4. **Row Level Security (RLS) 策略**（在 Dashboard > Authentication > RLS 啟用並設定）：
   - 啟用 RLS 於所有表（預防未授權存取）。
   - **users 表政策**：
     ```sql
     -- 用戶只能讀寫自己的記錄
     CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
     CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
     CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);  -- 匿名讀取聚合數據
     ```
   - **sessions 表政策**：
     ```sql
     -- 綁定用戶，只能存取自己的會話
     CREATE POLICY "Users own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);
     ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
     ```
   - **lead_flows 和 feedbacks 表政策**：類似 sessions，確保僅擁有者可寫入；公開讀取聚合統計（e.g., 總轉化率）。
   - 說明：RLS 使用 JWT 認證（Supabase Auth），匿名用戶透過臨時 UUID 存取。政策防止跨用戶洩漏，符合隱私需求。

5. **需要的索引和關係**：
   - **索引**（提升查詢速度）：
     ```sql
     CREATE INDEX idx_sessions_user_id ON sessions(user_id);
     CREATE INDEX idx_sessions_active ON sessions(is_active) WHERE is_active = true;
     CREATE INDEX idx_lead_flows_session_id ON lead_flows(session_id);
     CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;
     ```
   - **關係**：外鍵已定義（e.g., sessions.user_id → users.id）。使用 Supabase 的 Relations 視圖驗證。未來可加外鍵約束於 lead_flows.session_id。

6. **後續步驟**：
   - 整合前端：使用 Supabase JS 客戶端 (e.g., `supabase.from('sessions').insert({...})` ) 儲存上下文。
   - 測試：插入樣本數據，驗證 RLS（e.g., 不同用戶無法存取他人會話）。
   - 監控：啟用 Supabase Logs 追蹤查詢效能。

潛在挑戰：RLS 設定錯誤可能導致存取拒絕；JSONB 欄位過大需監控儲存成本（MVP 階段 <1GB）。

## 8. 非功能需求

- **可用性**：99% 上線時間，支援 100 併發用戶（POC 規模）。回應延遲 <3 秒。
- **安全性與隱私**：所有數據加密傳輸 (HTTPS)；不儲存敏感訊息（如自殺意圖細節）；遵守 CCPA/GDPR，提供數據刪除權。AI 提示中加入「不診斷、不建議藥物」守則。
- **可擴展性**：模組化設計，易整合新 AI 模型。支援中英雙語（未來）。
- **無障礙**：WCAG 2.1 合規，聊天介面支援螢幕閱讀器。
- **效能**：行動端優化，載入時間 <2 秒。錯誤處理：優雅降級（如 AI 不可用時顯示預設訊息）。
- **監管**：避免醫療主張，添加免責聲明：「本工具非專業診斷替代品」。

潛在挑戰：AI 幻覺（hallucination）可能給出不準建議，需人工審核提示；高峰期延遲，建議雲端託管（如 Vercel）。

## 9. 開發優先級（按分鐘計算）

估計基於單開發者（全棧），使用 Next.js + Supabase + OpenAI API。總時間：約 1200 分鐘（20 小時），分階段優先。

- **Phase 1: 基礎設定 (高優先，300 分鐘)**：
  - Supabase 設定 & 表結構 (120 分鐘)。
  - 基本聊天介面 (UI + 輸入處理，180 分鐘)。

- **Phase 2: 核心 MVP (最高優先，500 分鐘)**：
  - AI 共情邏輯 + 系統提示 (150 分鐘)。
  - 上下文記憶整合 (150 分鐘)。
  - 關鍵詞觸發 & 導流卡片 (200 分鐘)。

- **Phase 3: 用戶 & 數據 (中優先，250 分鐘)**：
  - 用戶管理 (註冊/匿名，100 分鐘)。
  - RLS & 索引設定 (80 分鐘)。
  - 情緒摘要生成 (70 分鐘)。

- **Phase 4: 測試 & 優化 (低優先，150 分鐘)**：
  - 隱私通知 & 錯誤處理 (80 分鐘)。
  - 端到端測試 + 反饋機制 (70 分鐘)。

Nice to Have 功能額外 400+ 分鐘。優先順序：先確保 MVP 可用，再迭代。潛在挑戰：AI API 成本（預估 $0.01/會話），需監控。