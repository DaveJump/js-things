import { withRouter } from 'next/router'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

console.log(serverRuntimeConfig.mySecret) // 'secret'
console.log(publicRuntimeConfig.staticFolder) // '/static'

const Title = styled.h1`
  color: gray;
  font-size: 40px;
`

// dynamic component
const Comp = dynamic(import('../../components/Comp'))

const TestB = ({ router, time }) => (
  <>
    <span>TestB {router.query.id}</span>
    <div>{time}</div>
    <div>{serverRuntimeConfig.mySecret}</div> {/* undefined */}
    <div>{publicRuntimeConfig.staticFolder}</div> {/* '/static' */}
    <div></div>
    <Comp>Button</Comp>
    <Title>This is Title</Title>
  </>
)

TestB.getInitialProps = async () => {
  // lazy loading
  const moment = await import('moment')

  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        time: moment.default(Date.now() - 60 * 60 * 24 * 7 * 1000).fromNow()
      })
    }, 2000)
  })
  return await promise
}

export default withRouter(TestB)
