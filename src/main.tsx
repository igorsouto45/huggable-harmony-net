import React from 'react'
import ReactDOM from 'react-dom/client'
import { getRouter } from './router'
import { RouterProvider } from '@tanstack/react-router'
import './styles.css'
import { supabase } from '@/integrations/supabase/client'

// Verificação de conexão com o Supabase (Lovable Cloud)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log('[Supabase] VITE_SUPABASE_URL:', SUPABASE_URL ? '✅ definida' : '❌ ausente')
console.log('[Supabase] VITE_SUPABASE_PUBLISHABLE_KEY:', SUPABASE_KEY ? '✅ definida' : '❌ ausente')
console.log('[Supabase] URL:', SUPABASE_URL)

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) {
        console.error('[Supabase] ❌ Erro ao conectar:', error.message)
      } else {
        console.log('[Supabase] ✅ Conexão estabelecida com sucesso')
        console.log('[Supabase] Sessão atual:', data.session ? `usuário ${data.session.user.email}` : 'nenhum usuário logado')
      }
    })
    .catch((err) => {
      console.error('[Supabase] ❌ Falha na conexão:', err)
    })
} else {
  console.error('[Supabase] ❌ Variáveis de ambiente ausentes — conexão não inicializada')
}

const router = getRouter()

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}