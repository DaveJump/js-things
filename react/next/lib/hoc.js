export default (Comp) => {
  return class CustomComp extends Comp {
    render() {
      const { Component, pageProps, ...rest } = this.props
      if (pageProps) {
        pageProps.test = '--testHOC--'
      }
      return (
        <Comp Component={Component} pageProps={pageProps} {...rest} />
      )
    }
  }
}