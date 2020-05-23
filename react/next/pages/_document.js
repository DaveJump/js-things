import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class CustomDocument extends Document {
  // override the class Document's default getInitialProps method with extended one
  static async getInitialProps(ctx) {
    const styleSheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => (props) => styleSheet.collectStyles(<App {...props} />)
      })

      const props = await Document.getInitialProps(ctx)
  
      return {
        ...props,
        styles: <>{props.styles}{styleSheet.getStyleElement()}</>
      }
    } finally {
      styleSheet.seal()
    }
  }
  
  render() {
    return (
      <Html>
        <Head>
          <style>{`.test { color: red; }`}</style>
        </Head>
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
