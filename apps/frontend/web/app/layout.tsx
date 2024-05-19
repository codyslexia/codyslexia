import '@radix-ui/themes/styles.css'
import {
  Theme,
  ThemePanel,
  Section,
  Container,
  Box,
  Flex,
  Link,
  Button,
  Avatar,
} from '@radix-ui/themes'
import { Inter } from 'next/font/google'

import './config.css'

export const metadata = {
  title: 'Codyslexia',
  description: 'Redefining Digital Freedom: Build, Adapt, Own',
}

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme asChild panelBackground="translucent" accentColor="green" appearance="dark">
          <div id="root">
            <ThemePanel />
            <Section pt="0">
              <Container>
                {/* Nav */}
                <Box>
                  <Flex justify="between" align="center" m="2">
                    <Link href="/dashboard/projects">
                      <svg width="36" height="36" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M2 12h20M2 6h20M2 18h20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    <Flex gap="6" align="center">
                      <Link size="2" color="gray" href="/login">
                        Login
                      </Link>
                      <Link size="2" color="gray" href="/register">
                        Register
                      </Link>
                      <Button variant="soft">LOGOUT</Button>
                      <Avatar fallback="M" radius="full" />
                    </Flex>
                  </Flex>
                </Box>
                {children}
              </Container>
            </Section>
          </div>
        </Theme>
      </body>
    </html>
  )
}
