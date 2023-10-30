import React from 'react'
import Link, { type LinkProps } from 'next/link'

const UnstyledLink = (props: LinkProps & React.RefAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode // Pulled from Next.js typings.
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>): JSX.Element => (
  <Link {...props} style={{ textDecoration: 'none', color: 'inherit', ...(props.style ?? {}) }}>
    {props.children}
  </Link>
)

export default UnstyledLink
