import supabase from '/src/supabase'

const redirectUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/redirect'
    : import.meta.env.VITE_REDIRECT_URL

export async function login() {
  if (redirectUrl) {
    return supabase.auth.signInWithOAuth({ provider: 'google' }, { redirectTo: redirectUrl })
  } else {
    return supabase.auth.signInWithOAuth({ provider: 'google' })
  }
}

export async function logout() {
  return supabase.auth.signOut()
}

export async function getProfile(userId) {
  const { data, error } = await supabase.from('profile').select().match({ id: userId })
  if (error) return null
  if (data.length === 0) return null
  return data[0]
}

export async function updateProfile(userId, update) {
  if (!userId) return Promise.reject('Not connected')
  const { error, data } = await supabase
    .from('profile')
    .upsert({ ...update, id: userId })
    .select()
  if (error) return Promise.reject(error)
  return data?.[0]
}

export function watchSession(cb) {
  supabase.auth.onAuthStateChange((event, session) => {
    cb(session)
  })
  cb(supabase.auth.session())
}
