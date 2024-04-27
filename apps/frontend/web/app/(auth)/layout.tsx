import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <React.Fragment>{children}</React.Fragment>
}

export default AuthLayout
