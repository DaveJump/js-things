import Link from 'next/link'
import Router from 'next/router'

const Nav = ({ children }) => {
  return (
    <>
      <header>
        <Link href='/A?id=1' as='/a/1'>
          <a>Link To Page A</a>
        </Link>
        {/* the other way to routing with Router.push */}
        <a
          style={{marginLeft: '20px'}}
          onClick={() =>
            Router.push(
              {
                pathname: '/test/B',
                query: {
                  id: 2,
                },
              },
              '/test/B/2'
            )
          }
        >
          Link To Page A
        </a>
      </header>
      {children}
    </>
  )
}

export default Nav
