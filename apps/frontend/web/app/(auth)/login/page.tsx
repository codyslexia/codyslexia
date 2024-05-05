import React from 'react'

import { getRustApiStatus } from '../../../components/get-totp'

export default async function LoginPage() {
  const res = await getRustApiStatus()
  return (
    <>
      <h1>Login Page</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </>
  )
}
