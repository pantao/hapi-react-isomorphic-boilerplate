import React, { Component, PropTypes } from 'react'

export default class Toolbar extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <button onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </button>
    )
  }

  render() {
    return (
      <div className='todo toolbar'>
        筛选:
        {' '}
        {this.renderFilter('SHOW_ALL', '所有')}
        {'，'}
        {this.renderFilter('SHOW_COMPLETED', '已完成')}
        {'，'}
        {this.renderFilter('SHOW_ACTIVE', '未完成')}
        。
      </div>
    )
  }
}

Toolbar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}
