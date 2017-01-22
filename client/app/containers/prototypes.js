import { connect } from 'react-redux';
import Footer from '@mtk/mcs-components/lib/Footer';
import Header from '@mtk/mcs-components/lib/Header';
import React, { Component } from 'react'
import main from './main.css';

class Main extends Component {
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <Header />
        <div className={main.base}>
          this is prototypes!
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(12313123);
  console.log(state);
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);