// Emotion Detection & Keyword Analysis Engine
// Based on Task 2.1 requirements

export type EmotionLevel = 'low' | 'medium' | 'high' | 'critical'

export type EmotionAnalysis = {
  score: number // 1-10 scale
  level: EmotionLevel
  keywords: string[]
  category: 'anxiety' | 'depression' | 'stress' | 'neutral' | 'crisis'
  shouldTrigger: boolean // Trigger referral card if true
}

// Emotion keyword dictionary with weights
const EMOTION_KEYWORDS = {
  critical: {
    keywords: ['自殺', '輕生', '不想活', '想死', '結束生命', '了結', '絕望到極點'],
    weight: 10,
    category: 'crisis' as const
  },
  high: {
    keywords: [
      '崩潰', '撐不下去', '絕望', '痛苦', '無助', '孤獨', '害怕',
      '恐慌', '焦慮', '抑鬱', '憂鬱', '失眠', '噩夢', '創傷',
      '無法呼吸', '心跳加速', '發抖', '冷汗', '頭痛欲裂'
    ],
    weight: 8,
    category: 'anxiety' as const
  },
  medium: {
    keywords: [
      '壓力', '緊張', '擔心', '煩躁', '疲憊', '累', '失落',
      '難過', '傷心', '沮喪', '煩惱', '困擾', '不安', '緊繃',
      '睡不著', '食慾不振', '提不起勁', '心情低落'
    ],
    weight: 5,
    category: 'stress' as const
  },
  low: {
    keywords: [
      '有點累', '小煩惱', '不太開心', '需要休息', '想放鬆',
      '輕微焦慮', '有些擔心', '小壓力'
    ],
    weight: 3,
    category: 'stress' as const
  }
}

// Contextual exclusions to reduce false positives
const EXCLUSION_CONTEXTS = [
  '電腦崩潰', '系統崩潰', '程式崩潰', '網路崩潰',
  '崩潰大笑', '笑到崩潰', '可愛到崩潰',
  '壓力測試', '壓力鍋', '氣壓'
]

/**
 * Analyze text for emotional keywords and calculate emotion score
 */
export function analyzeEmotion(text: string): EmotionAnalysis {
  const lowerText = text.toLowerCase()
  let totalScore = 0
  const detectedKeywords: string[] = []
  let primaryCategory: EmotionAnalysis['category'] = 'neutral'
  let highestWeight = 0

  // Check for exclusion contexts to avoid false positives
  const hasExclusion = EXCLUSION_CONTEXTS.some(exclusion =>
    lowerText.includes(exclusion.toLowerCase())
  )

  if (!hasExclusion) {
    // Scan for emotion keywords
    for (const [level, data] of Object.entries(EMOTION_KEYWORDS)) {
      for (const keyword of data.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          detectedKeywords.push(keyword)
          totalScore += data.weight

          // Track primary emotion category
          if (data.weight > highestWeight) {
            highestWeight = data.weight
            primaryCategory = data.category
          }
        }
      }
    }
  }

  // Normalize score to 1-10 scale
  const normalizedScore = Math.min(10, Math.max(1, Math.round(totalScore / 2)))

  // Determine emotion level
  let level: EmotionLevel
  if (normalizedScore >= 9) {
    level = 'critical'
  } else if (normalizedScore >= 7) {
    level = 'high'
  } else if (normalizedScore >= 4) {
    level = 'medium'
  } else {
    level = 'low'
  }

  // Should trigger referral card if score >= 7 (high or critical)
  const shouldTrigger = normalizedScore >= 7

  return {
    score: normalizedScore,
    level,
    keywords: detectedKeywords,
    category: primaryCategory,
    shouldTrigger
  }
}

/**
 * Analyze conversation context (multiple messages) for emotion patterns
 */
export function analyzeConversationContext(messages: string[]): EmotionAnalysis {
  // Take last 5 messages for context
  const recentMessages = messages.slice(-5)

  let totalScore = 0
  const allKeywords: string[] = []
  const categories: EmotionAnalysis['category'][] = []

  for (const message of recentMessages) {
    const analysis = analyzeEmotion(message)
    totalScore += analysis.score
    allKeywords.push(...analysis.keywords)
    if (analysis.category !== 'neutral') {
      categories.push(analysis.category)
    }
  }

  // Average score across messages
  const avgScore = Math.round(totalScore / recentMessages.length)

  // Determine primary category
  const categoryCount: Record<string, number> = {}
  categories.forEach(cat => {
    categoryCount[cat] = (categoryCount[cat] || 0) + 1
  })

  const primaryCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] as EmotionAnalysis['category'] || 'neutral'

  let level: EmotionLevel
  if (avgScore >= 9) {
    level = 'critical'
  } else if (avgScore >= 7) {
    level = 'high'
  } else if (avgScore >= 4) {
    level = 'medium'
  } else {
    level = 'low'
  }

  return {
    score: avgScore,
    level,
    keywords: [...new Set(allKeywords)], // Remove duplicates
    category: primaryCategory,
    shouldTrigger: avgScore >= 7
  }
}

/**
 * Generate emotion summary prompt for AI
 */
export function generateEmotionSummaryPrompt(analysis: EmotionAnalysis, context: string[]): string {
  return `基於以下對話上下文，生成一個簡短、中性的情緒摘要（不超過100字）。

對話上下文：
${context.slice(-5).join('\n')}

偵測到的情緒關鍵詞：${analysis.keywords.join('、')}
情緒強度：${analysis.level} (${analysis.score}/10)
情緒類別：${analysis.category}

要求：
1. 使用溫和、非診斷性的語言
2. 簡短描述用戶當前的情緒狀態
3. 不要提供醫療建議或診斷
4. 保持中性、客觀的語氣
5. 回應控制在50-80字

範例格式：「從對話中感受到你正在經歷...，這些情緒讓你感到...」`
}
