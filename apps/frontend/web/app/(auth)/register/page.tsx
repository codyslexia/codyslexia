import React from 'react'
import { Box, Flex } from '@radix-ui/themes'

import { getSeedsFromFakerApi } from '../../../components/get-totp'

const RegisterPage = async () => {
  const res = await getSeedsFromFakerApi()
  return (
    <>
      <Box>
        <Flex justify="between" direction="column" m="2">
          <h1>Register Page</h1>
          <pre>{JSON.stringify(res, null, 2)}</pre>
        </Flex>
      </Box>
    </>
  )
}

export default RegisterPage
