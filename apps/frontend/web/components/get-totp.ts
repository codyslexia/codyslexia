const PROXY_CONF = {
  '/api/faker': {
    target: 'http://local.dev/api/faker',
    secure: false,
  },
  '/api/goapi': {
    target: 'http://local.dev/api/goapi',
    secure: false,
  },
  '/api/qrcode': {
    target: 'http://local.dev/api/qrcode',
    secure: false,
  },
  '/api/rustapi': {
    target: 'http://local.dev/api/rustapi',
    secure: false,
  },
  '/auth/totp': {
    target: 'http://local.dev/api/totp',
    secure: false,
  },
  '/graphql': {
    target: 'http://local.dev/graphql',
    secure: false,
  },
}

export async function getTotp() {
  try {
    const res = await fetch(`${PROXY_CONF['/auth/totp'].target}/generate`, {
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
    const res = await fetch(`${PROXY_CONF['/api/rustapi'].target}`, {
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
    const res = await fetch(`${PROXY_CONF['/api/faker'].target}/schema`, {
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
    const res = await fetch(`${PROXY_CONF['/api/qrcode'].target}/generate`, {
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
    const res = await fetch(`${PROXY_CONF['/api/goapi'].target}`, {
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
    const res = await fetch(`${PROXY_CONF['/graphql'].target}`, {
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
