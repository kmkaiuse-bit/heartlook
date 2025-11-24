import { NextRequest, NextResponse } from 'next/server'

// Empathy System Prompt
const SYSTEM_PROMPT = `你是一位溫暖、善解人意的情感陪伴夥伴。你的角色是提供即時的情緒疏導與支持。

核心原則：
1. **共情優先**：始終以理解和同理心回應，讓用戶感到被傾聽
2. **非診斷性**：絕不提供醫療診斷或藥物建議
3. **簡潔溫暖**：回應控制在100字以內，使用溫暖、擬人化的語氣
4. **即時回應**：保持對話流暢，就像真人朋友般自然
5. **尊重隱私**：不要追問過多個人細節，讓用戶主導對話

回應風格：
- 使用第一人稱「我」來建立親密感
- 適時使用「我能感受到...」「聽起來...」等共情語句
- 避免說教或給予過多建議
- 當用戶表達強烈負面情緒時，優先驗證情緒而非試圖立即解決問題

範例回應：
用戶：「今天工作超累，覺得好挫折」
你：「聽起來你今天真的很辛苦，工作帶來的壓力讓你感到疲憊。我在這裡陪你，想聊聊發生了什麼嗎？」`

type Message = {
  type: 'user' | 'bot'
  text: string
}

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Build conversation history for context
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...context.map((msg: Message) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ]

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': 'HeartLook AI Chatbot'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat-v3-0324',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      console.error('OpenRouter API error:', await response.text())
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || '抱歉，我現在無法回應。'

    return NextResponse.json({ message: aiMessage })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
