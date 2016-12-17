import Promise from 'bluebird';
import React, {
  Component
} from 'react';
import HoistNonReactStatics from 'hoist-non-react-statics';

export default function connectData(fetchData, fetchDataDeferred, dependencies) {
  return WrappedComponent => {
    class Connected extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    if (Array.isArray(dependencies)) {
      Connected.fetchData = (getState, dispatch) => {
        const promises = dependencies
          .filter(dependency => typeof dependency.fetchData === 'function')
          .map(dependency => dependency.fetchData(getState, dispatch));
        promises.push(fetchData(getState, dispatch));

        return Promise.all(promises);
      };
    } else {
      Connected.fetchData = fetchData;
    }
    Connected.fetchDataDeferred = fetchDataDeferred;

    return HoistNonReactStatics(Connected, WrappedComponent);
  }
}
