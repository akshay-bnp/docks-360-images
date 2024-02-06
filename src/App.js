import React, { Component, createRef } from 'react';
import React360 from './React360';
import './App.css';
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import Outline360 from './Outline360';

class App extends Component {

  constructor(props) {
    super(props);
    this.svgOutline = createRef();
  }

  state = {
    showSVG: true,
    currentImageIndex: 0
  }
  onImageChanged = (index) => {
    this.setState({ currentImageIndex: index, showSVG: true });
    this.svgOutline.current.updateOutline(this.state.currentImageIndex);
    console.log('current frame index', index);

  }

  onLoadChange = (loaded, percentage) => {
    console.log('have all Image loaded? : ' + loaded);
    console.log('current load percentage : ' + percentage + "%");
  }

  componentDidMount = () => {
    this.svgOutline.current.updateOutline(0);
  }



  render = () => {
    const { showSVG } = this.state;
    return (
      <div className="App">
        <img
          className="icon-react360"
          alt=""
          src={require(`./360_degrees.png`)}
        />
        <div className='div-360'>
          {showSVG &&
            <Outline360 ref={this.svgOutline} />

          }
          <Tridi location="./static/media" onFrameChange={this.onImageChanged}
            format="jpeg" count="101" touch={true} onLoadChange={this.onLoadChange} />

          <p id="tool-tip"> Home details </p>


        </div>
        {/* <React360 dir="awair-360" onImageChanged={this.onImageChanged} numImages={102} /> */}
      </div>
    );
  }
}

export default App;
