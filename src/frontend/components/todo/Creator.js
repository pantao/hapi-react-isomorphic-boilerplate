import React, { Component, PropTypes } from 'react'

export default class Creator extends Component {
  render() {
    return (
      <form className='todo create'>
        <div>
          <input type='text' ref='input' placeholder='请输入您想做什么？' />
        </div>
        <div>
          <button type='button' onClick={(e) => this.handleClick(e)}>
            创建
          </button>
        </div>
      </form>
    )
  }

  handleClick(e) {
    e.preventDefault();
    const node = this.refs.input
    const text = node.value.trim()
    this.props.handleCreate(text)
    node.value = ''
  }
}

Creator.propTypes = {
  handleCreate: PropTypes.func.isRequired
}
