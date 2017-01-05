import React from 'react'
import { connect } from 'react-redux'
import { changeEditPrototype } from '../actions/prototypeActions';
import { bindActionCreators } from 'redux';

let PrototypeList = ({ dispatch, ...states }) => {
  console.log(states);
  return (
    <div>
      <a onclick={() => dispatch(changeEditPrototype(1))}> open </a>
    </div>
  )
}

PrototypeList = connect()(PrototypeList)
export default PrototypeList