import React, {Component, PropTypes} from 'react';
import Navigator from './Navigator';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
  }

  render() {
    const childrenProps = this.props;
    const childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, childrenProps);
    });

    return (
      <div className="layout">
        <Navigator { ...this.props }/>
        <div className="pusher">
          {childrenWithProps}
        </div>
      </div>
    )
  };
};

export default Layout;
