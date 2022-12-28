export const load = async ({ fetch }) => {
  const res = await fetch('/api/openai/generatePrompts')
  const json = await res.json()

  // console.log('data: ', json.data)
  return { openai: json.data  }
};