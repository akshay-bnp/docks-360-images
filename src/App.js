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
    showOutline: true,
    currentImageIndex: 0
  }
  onImageChanged = (index) => {
    this.setState({ currentImageIndex: index });
  }

  onLoadChange = (loaded, percentage) => {
    console.log('have all Image loaded? : ' + loaded);
    console.log('current load percentage : ' + percentage + "%");
  }

  componentDidMount = () => {
    this.svgOutline.current.updateOutline(0);
  }

  onDragStart = () => {
    this.toggleOutline(false);
  }

  onDragEnd = () => {
    this.toggleOutline(true);
    this.svgOutline.current.updateOutline(this.state.currentImageIndex);
  }

  toggleOutline = (visible) => {
    this.setState({ showOutline: visible })
  }

  render = () => {
    const { showOutline } = this.state;
    return (
      <div className="App">
        {/* <img
          className="icon-react360"
          alt=""
          src={require(`./360_degrees.png`)}
        /> */}
        <div className='div-360'>

          <div className={`div-outline ${showOutline ? " visible" : "hidden"}`}>
            <Outline360 ref={this.svgOutline}  />
          </div>

          <Tridi location="./static/media" onFrameChange={this.onImageChanged} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}
            format="jpg" count="103" touch={true} onLoadChange={this.onLoadChange} hintOnStartup={true} hintText="Drag to view" />

          <div id="tool-tip">
            <div className="tool-tip-header" id="tool-tip-header">
              <div>
                <p style={{ fontWeight: "bold" }}>Unit</p>
                <p id="tool-tip-unit">152</p>
              </div>
              <div className="tool-tip-price">
                <p id="availability-dot"></p>
                <p id="tool-tip-availability">Available</p>
              </div>
            </div>
            <div className="tool-tip-body">
              <div>
                <p style={{ fontWeight: "bold" }}>Surface</p>
                <p id="tool-tip-surface">85</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>Price</p>
                <p id="tool-tip-price">1500000</p>
              </div>
            </div>
          </div>


        </div>
        {/* <React360 dir="awair-360" onImageChanged={this.onImageChanged} numImages={102} /> */}
      </div>
    );
  }
}

export default App;
