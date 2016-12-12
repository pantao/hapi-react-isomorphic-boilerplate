import React, {Component, PropTypes} from 'react';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
  }

  render() {
    const {globalState} = this.props;

    const childrenProps = this.props;
    const childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {'children': childrenProps});
    });
      const { location: { pathname }} = this.props;

    return (
      <div id="layout">
        <div id="pusher">
          {childrenWithProps}
        </div>
      </div>
    )
  };
};

export default Layout;
