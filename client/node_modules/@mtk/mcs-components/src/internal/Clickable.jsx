import React from 'react';
import { default as ReactDOM } from 'react-dom';
// Add isHover to the state of a component

class Clickable extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state || {};
    this.state.isHover = false;
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('mouseover', this.onOver.bind(this));
    ReactDOM.findDOMNode(this).addEventListener('mouseout', this.onOut.bind(this));
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('mouseover', this.onOver);
    ReactDOM.findDOMNode(this).removeEventListener('mouseout', this.onOut);
  }

  onOver() {
    this.setState({ isHover: true });
  }

  onOut() {
    this.setState({ isHover: false });
  }
}

export default Clickable;
