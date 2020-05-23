import App, { Container } from 'next/app'
import Nav from '../components/Nav'
import { Provider } from 'react-redux'
import withRedux from '../lib/with-redux'

/**
 * since mini-css-extract-plugin has an issue remain,
 * it is recommended to import styles globally
 */
import 'antd/dist/antd.css'
import './global.css'

class CustomApp extends App {
  state = {
    count: 1
  }

  static async getInitialProps(ctx) {
    const { Component } = ctx
    
    // getInitialProps method will be called in every page rendering period
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        {/* Nav is a top-level provider-component */}
        <Provider store={reduxStore}>
          <Nav>
            <Component {...pageProps} {...this.state} />
          </Nav>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(CustomApp)