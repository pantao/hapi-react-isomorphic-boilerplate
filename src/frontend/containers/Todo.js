import React, {Component} from 'react';
import Helmet from 'react-helmet';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from '../actions/todo';

import Creator from '../components/todo/Creator';
import Items from '../components/todo/Items';
import Toolbar from '../components/todo/Toolbar';

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, todo, todoVisibilityFilter } = this.props
    console.log(this.props);
    return (
      <section id='todo'>
        <Helmet title='任务列表'/>
        <Items 
          items={todo}
          filter = {todoVisibilityFilter}
          onTodoClick={index =>
            dispatch(todoActions.completeTodo(index))
          } />
        <Creator handleCreate={text =>
            dispatch(todoActions.addTodo(text))
          } />
          <hr />
        <Toolbar filter={todoVisibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(todoActions.setVisibilityFilter(nextFilter))
          } />
      </section>
    )
  }
}

const container = store => {
  const mapStateToProps = state => {
    return {globalState: state, todo: state.todo, todoVisibilityFilter: state.todoVisibilityFilter };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      ...todoActions,
      dispatch
    }, dispatch);
  };

  return {
    path: '/todo',
    onEnter: (next, replace, callback) => {
      callback();
    },
    component: connect(mapStateToProps, mapDispatchToProps)(Todo)
  };
}
export default container;
