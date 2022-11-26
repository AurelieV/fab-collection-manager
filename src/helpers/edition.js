import supabase from '/src/supabase'

export async function getAllEditions() {
  const { data, error } = await supabase
    .from('edition')
    .select()
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

export async function updateEdition(editionId, update) {
  const { data, error } = await supabase.from('edition').update(update).eq('id', editionId)
  if (error) throw error
  return data
}

export async function deleteEdition(editionId) {
  const { data, error } = await supabase.from('edition').delete().eq('id', editionId)
  if (error) throw error
  return data
}

export async function createEdition(edition) {
  const { data, error } = await supabase.from('edition').insert(edition)
  if (error) throw error
  return data
}
