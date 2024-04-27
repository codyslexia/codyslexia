import '@radix-ui/themes/styles.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
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
            {children}
          </div>
        </Theme>
      </body>
    </html>
  )
}
