import React from 'react'

import { getSeedsFromFakerApi } from '../../../components/get-totp'

const RegisterPage = async () => {
  const res = await getSeedsFromFakerApi()
  return (
    <>
      <h1>Register Page</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </>
  )
}

export default RegisterPage
