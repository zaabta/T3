import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

type Props = {
  children: React.ReactElement
}

export const Auth = ({ children }: Props): JSX.Element => {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log(status, session)
    if (status === 'loading' || !router.isReady) return
    if (status === 'unauthenticated') {
      toast.error('login please !')
      router.push({
        pathname: '/',
        query: { returnUrl: router.asPath },
      })
    }
  }, [router, status])
  if (status == 'loading') {
    return <>loading.....</>
  }
  return status === 'authenticated' ? <>{children}</> : <></>
}
