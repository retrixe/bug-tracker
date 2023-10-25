import React from 'react'
import Link from 'next/link'

const AnchorLink = (props: React.PropsWithChildren<{
  href: string
  as?: string
  prefetch?: boolean
}>): JSX.Element => (
  <Link href={props.href} as={props.as} prefetch={props.prefetch} style={{ textDecoration: 'none', color: 'inherit' }}>
    {props.children}
  </Link>
)

export default AnchorLink
