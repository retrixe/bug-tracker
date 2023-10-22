import React from 'react'
import { useRouter } from 'next/router'

const Issues = () => {
  const router = useRouter()
  React.useEffect(() => router.replace('/'), [router])
  return <></>
}

export async function getServerSideProps () {
  return { redirect: { destination: '/', permanent: true } }
}

export default Issues
