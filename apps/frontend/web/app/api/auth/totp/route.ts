export async function GET(request: Request) {
  try {
    const res = await fetch('http://localhost:3003/generate')
    const data = await res.json()
    console.log('data', data)
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    return Response.json({ error: 'Internal Server Error' })
  }
}
