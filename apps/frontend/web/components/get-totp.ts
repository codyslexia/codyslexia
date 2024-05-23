const BASE_URL = 'http://local.dev'

export async function getTotp() {
  try {
    const res = await fetch(`${BASE_URL}/api/totp/generate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'totp-api':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}

export async function getRustApiStatus() {
  try {
    const res = await fetch(`${BASE_URL}/api/rustapi`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'rustapi':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}

export async function getSeedsFromFakerApi() {
  try {
    const res = await fetch(`${BASE_URL}/api/faker/schema`, {
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

export async function getQrCode() {
  try {
    const res = await fetch(`${BASE_URL}/api/qrcode/generate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'qrcode-api':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}

export async function getGoApiStatus() {
  try {
    const res = await fetch(`${BASE_URL}/api/goapi`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching 'goapi':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetProjects {
            projects {
              id
              kind
              name
              environment
              description
              createdAt
              updatedAt
              user {
                id
                email
              }
            }
          }
        `,
      }),
    }).then((res) => res.json())
    return res
  } catch (error) {
    console.error(`Error fetching 'projects':`, error)
    return Response.json({ error: 'Internal Server Error' })
  }
}
