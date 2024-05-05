export async function getTotp() {
  try {
    const res = await fetch('http://localhost:3003/generate')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'totp-api':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}

export async function getRustApiStatus() {
  try {
    const res = await fetch('http://localhost:8003/status')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'rustapi':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}
