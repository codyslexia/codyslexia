import React from 'react'
import { Box, Flex } from '@radix-ui/themes'

import { getGoApiStatus } from '../../../components/get-totp'

const DashboardPage = async () => {
  const res = await getGoApiStatus()
  return (
    <>
      <Box>
        <Flex justify="between" direction="column" m="2">
          <h1>Dashboard Page</h1>
          <pre>{JSON.stringify(res, null, 2)}</pre>
        </Flex>
      </Box>
    </>
  )
}

export default DashboardPage
