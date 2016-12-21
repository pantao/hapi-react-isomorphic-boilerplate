import React, {Component, PropTypes} from 'react'
import Item from './Item'
import { VisibilityFilters } from '../../actions/todo';

export default class Items extends Component {
  constructor(props) {
  	super(props);
  	this.filter = this.filter.bind(this);
  }

  filter(todo) {
    switch (this.props.filter) {
      case VisibilityFilters.SHOW_ALL:
        return true
      case VisibilityFilters.SHOW_COMPLETED:
        return todo.completed
      case VisibilityFilters.SHOW_ACTIVE:
        return !todo.completed
    }
  }


  render() {
    return (
      <ul>
        {this.props.items.filter(this.filter).map((item, index) => <Item {...item} key={index} onClick={() => this.props.onTodoClick(index)}/>)}
      </ul>
    )
  }
}

Items.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({text: PropTypes.string.isRequired, completed: PropTypes.bool.isRequired}).isRequired).isRequired
}
