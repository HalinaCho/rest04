import { supabase } from './supabase'

let cachedApiKey = null

async function getSolarApiKey() {
  if (cachedApiKey) return cachedApiKey
  const { data, error } = await supabase
    .from('app_config')
    .select('value')
    .eq('key', 'solar_api_key')
    .single()
  if (error || !data) throw new Error('Solar API 키를 불러올 수 없습니다.')
  cachedApiKey = data.value
  return cachedApiKey
}

export async function sendMessage(messages) {
  const apiKey = await getSolarApiKey()
  const res = await fetch('https://api.upstage.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'solar-pro',
      messages,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `API 오류 (${res.status})`)
  }
  const data = await res.json()
  return data.choices[0].message.content
}
