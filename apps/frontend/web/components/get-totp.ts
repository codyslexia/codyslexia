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

export async function getSeedsFromFakerApi() {
  try {
    const res = await fetch('http://localhost:3001/faker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        count: 3,
        schema: {
          name: 'person.firstName',
          email: 'internet.email',
          phone: 'phone.number',
        },
      }),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'faker-api':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}
