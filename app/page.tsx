'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  type: 'user' | 'bot'
  text: string
  timestamp: string
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleStartChat = () => {
    setCurrentView('chat')
    addMessage('bot', '歡迎！我是你的情感夥伴，有什麼想分享的嗎？')
  }

  const addMessage = (type: 'user' | 'bot', text: string) => {
    const timestamp = new Date().toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    })
    setMessages(prev => [...prev, { type, text, timestamp }])
  }

  const handleSendMessage = async () => {
    const text = inputValue.trim()
    if (!text || isLoading) return

    // Add user message
    addMessage('user', text)
    setInputValue('')
    setIsLoading(true)

    try {
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: messages.slice(-10) // Last 10 messages for context
        })
      })

      const data = await response.json()

      if (data.error) {
        addMessage('bot', '抱歉，現在無法回應，讓我們重試')
      } else {
        addMessage('bot', data.message)
      }
    } catch (error) {
      addMessage('bot', '抱歉，現在無法回應，讓我們重試')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (text: string) => {
    setInputValue(text)
    // Auto-send after a brief delay
    setTimeout(() => {
      document.getElementById('send-btn')?.click()
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="container mx-auto px-4 py-20 text-center bg-white min-h-screen">
        <h1 className="text-5xl font-semibold mb-6 tracking-tight" style={{ color: '#1A202C' }}>
          隨時有我在，陪你聊聊心情
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-secondary">
          AI 情感陪伴 Chatbot，提供溫暖的傾聽與支持
        </p>
        <button
          onClick={handleStartChat}
          className="btn-primary px-12 py-4 text-lg font-medium mb-8"
        >
          快速開始聊天
        </button>
        <div className="mt-8 text-sm">
          <a href="#" className="hover:underline" style={{ color: '#2563EB' }}>
            隱私政策
          </a>
          <span className="mx-3 text-secondary">|</span>
          <a href="#" className="hover:underline" style={{ color: '#2563EB' }}>
            註冊帳號 (Nice to Have)
          </a>
        </div>
        <p className="text-sm text-secondary mt-16 max-w-lg mx-auto leading-relaxed">
          您的對話匿名且不儲存。我們不是專業診斷替代品。
        </p>
      </div>
    )
  }

  // Chat Page
  return (
    <div className="lg:flex h-screen" style={{ background: '#F8F9FA' }}>
      {/* Left: Chat Interface */}
      <div className="flex flex-col w-full lg:w-2/3 chat-container">
        {/* Header */}
        <div className="panel-header flex justify-between items-center">
          <h2 className="text-xl font-medium text-primary">我是你的情感夥伴</h2>
          <button
            onClick={() => setCurrentView('landing')}
            className="text-secondary hover:opacity-70 transition-opacity text-sm font-medium"
          >
            結束
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5" style={{ background: '#FFFFFF' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-md">
                <div className={msg.type === 'user' ? 'message-user' : 'message-ai'}>
                  {msg.text}
                </div>
                <div className="text-xs text-secondary mt-2 px-2">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-md">
                <div className="message-ai">正在輸入...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips */}
        <div className="px-6 pb-3 bg-white flex gap-2 flex-wrap pt-3" style={{ borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={() => handleQuickReply('我很焦慮')}
            className="quick-reply-chip"
          >
            我很焦慮
          </button>
          <button
            onClick={() => handleQuickReply('只是想聊聊')}
            className="quick-reply-chip"
          >
            只是想聊聊
          </button>
          <button
            onClick={() => handleQuickReply('感到壓力')}
            className="quick-reply-chip"
          >
            感到壓力
          </button>
        </div>

        {/* Input Area */}
        <div className="p-5 bg-white" style={{ borderTop: '1px solid #E2E8F0' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="分享你的心情..."
              className="flex-1 input-field"
              disabled={isLoading}
            />
            <button
              id="send-btn"
              onClick={handleSendMessage}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              發送
            </button>
          </div>
        </div>
      </div>

      {/* Right: Wellness/Action Panel */}
      <div className="hidden lg:block w-1/3 bg-white p-6 overflow-y-auto" style={{ borderLeft: '1px solid #E2E8F0' }}>
        <h3 className="text-lg font-medium text-primary mb-6">建議與資源</h3>

        {/* Therapist Profile Card */}
        <div className="referral-card mb-5">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 rounded-full mr-3 flex items-center justify-center" style={{ background: 'rgba(37, 99, 235, 0.1)' }}>
              <span className="font-semibold text-lg" style={{ color: '#2563EB' }}>李</span>
            </div>
            <div>
              <h4 className="text-primary font-medium">李心怡 諮商師</h4>
              <p className="text-sm text-secondary">情緒管理專家</p>
            </div>
          </div>
          <p className="text-sm text-primary mb-5 leading-relaxed">10年臨床經驗，專精焦慮與壓力管理</p>
          <button className="btn-primary w-full">預約諮詢</button>
        </div>

        {/* Workshop Card */}
        <div className="referral-card mb-5">
          <h4 className="text-primary font-medium mb-2">情緒療癒工作坊</h4>
          <p className="text-sm text-primary mb-3 leading-relaxed">學習正念與放鬆技巧</p>
          <span className="insight-badge mb-4 inline-block">📅 12/15 週六 14:00-17:00</span>
          <button className="btn-primary w-full mt-2">立即報名</button>
        </div>

        {/* Emotion Summary Card */}
        <div className="referral-card" style={{ background: 'rgba(37, 99, 235, 0.04)', borderColor: '#2563EB' }}>
          <h4 className="text-primary font-medium mb-3">今日情緒摘要</h4>
          <p className="text-sm text-primary leading-relaxed">對話進行中，我會幫你整理情緒重點...</p>
        </div>
      </div>
    </div>
  )
}
