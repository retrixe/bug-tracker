import React from 'react'
import { useRouter } from 'next/router'
import { type GetServerSidePropsResult } from 'next'

const Issues = (): JSX.Element => {
  const router = useRouter()
  React.useEffect(() => { router.replace('/').catch(console.error) }, [router])
  return <></>
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<unknown>> {
  return { redirect: { destination: '/', permanent: true } }
}

export default Issues
