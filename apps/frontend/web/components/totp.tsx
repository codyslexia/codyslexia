'use server'

import { Code, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

// simple api client to fetch the totp data

async function fetcher(url: string, port?: number) {
  const res = await fetch(`http://localhost:${port ?? 3000}${url}`)
  return res.json()
}

export default async function TOTPPage() {
  const [{ id, secret, backup, image }] = await fetcher('/generate', 3003)

  return (
    <>
      <Text>
        <Code>ID {id}</Code>
      </Text>
      <Text>
        <Code>Secret {secret}</Code>
      </Text>
      {backup.map((backup: string, i: number) => (
        <Text key={i}>
          <Code>
            Backup {i + 1} {Buffer.from(backup).toString('base64')}
          </Code>
        </Text>
      ))}
      <Image src={image} alt="qrcode" width={200} height={200} />
    </>
  )
}
