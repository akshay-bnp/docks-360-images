import React,{ Component, createRef } from 'react';
import React360 from './React360';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  onImageChanged = (index) => {

  }

  render = () => {
    return (
      <div className="App">
          <img
            className="icon-react360"
            alt=""
            src={require(`./360_degrees.png`)}
          />
          <React360 dir="awair-360" onImageChanged={this.onImageChanged} numImages={102} />
      </div>
    );
  }
}

export default App;
