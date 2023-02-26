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
    if (status === 'loading' || !router.isReady) return
    if (status === 'unauthenticated') {
      router
        .push({
          pathname: '/',
          query: { returnUrl: router.asPath },
        })
        .then(() => toast.error('login please !'))
        .catch((err) => toast.error('something wrong !'))
    }
  }, [router, status])
  if (status == 'loading') {
    return <>loading.....</>
  }
  return status === 'authenticated' ? <>{children}</> : <></>
}
