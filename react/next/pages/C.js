import { connect } from 'react-redux'
import { counterAddAction } from '../store/counter'

const PageC = (props) => {
  return (
    <>
      <button onClick={() => { props.counterAdd(props.count + 1) }}>counter</button>
      <span>{props.count}</span>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count
  }
}

const mapActionToProps = (dispatch) => {
  return {
    counterAdd: (count) => dispatch(counterAddAction(count))
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(PageC)