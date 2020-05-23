import { withRouter } from 'next/router'

const A = ({ router, name }) => (
  <>
    <span className="desc">
      A {router.query.id} {name}
    </span>
    <div className="desc-2">aaa</div>
    <style jsx>
      {`
        .desc {
          color: blue;
        }
        .desc-2 {
          color: pink;
        }
      `}
    </style>
    <style jsx global>
      {`
        span, div {
          text-decoration: line-through;
        }
      `}
    </style>
  </>
)

A.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'DaveJump'
      })
    }, 2000)
  })
  return await promise
}

export default withRouter(A)
