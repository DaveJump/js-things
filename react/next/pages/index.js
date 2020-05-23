import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  useEffect(() => {
    axios.get('/api/user/info')
      .then(res => {
        console.log(res.data)
      })
  }, [])
  
  return (
    <div className='container'>
      <h1 className='title'>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
      <p>Hello World!</p>
      <a href={publicRuntimeConfig.OAUTH_URL}>跳转OAuth</a>
    </div>
  )
}

Home.getInitialProps = () => {
  return {
    home: '--HOME--'
  }
}
