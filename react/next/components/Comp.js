const Comp = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Comp