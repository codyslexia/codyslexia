import React from 'react'
import { Box, Flex } from '@radix-ui/themes'

import { getRustApiStatus } from '../../../components/get-totp'

const LoginPage = async () => {
  const res = await getRustApiStatus()
  return (
    <>
      <Box>
        <Flex justify="between" direction="column" m="2">
          <h1>Login Page</h1>
          <pre>{JSON.stringify(res, null, 2)}</pre>
        </Flex>
      </Box>
    </>
  )
}

export default LoginPage
