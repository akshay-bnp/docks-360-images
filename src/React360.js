import React, { Component, createRef, useState } from "react";
import "./React360.css";
import Outline360 from './Outline360';

// You can play with this to adjust the sensitivity
// higher values make mouse less sensitive
const pixelsPerDegree = 3;

class React360 extends Component {
  static defaultProps = { dir: "awair-360", numImages: 55 };
  constructor(props) {
    super(props);
    this.svgOutline = createRef();
  }

  state = {
    dragging: false,
    imageIndex: 0,
    dragStartIndex: 0,
    showSVG : false
  };

  componentDidMount = () => {
    document.addEventListener("pointermove", this.handleMouseMove, false);
    document.addEventListener("pointerup", this.handleMouseUp, false);

    // document.addEventListener("touchmove", this.handleMouseMove, false);
    document.addEventListener("touchend", this.handleMouseUp, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("pointermove", this.handleMouseMove, false);
    document.removeEventListener("pointerup", this.handleMouseUp, false);

    // document.removeEventListener("touch", this.handleMouseMove, false);
    document.removeEventListener("touchend", this.handleMouseUp, false);
  };

  handleMouseDown = e => {
    console.log("start")
    e.persist();
    this.setState(state => ({
      dragging: true,
      dragStart: e.screenX,
      dragStartIndex: state.imageIndex
    }));
  };

  handleMouseUp = () => {
    console.log("up")
    if(this.state.dragging){
      this.setState({ dragging: false, showSVG:true });
      this.svgOutline.current.updateOutline(this.state.imageIndex);
    }


  };

  updateImageIndex = currentPosition => {
    let numImages = this.props.numImages;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = this.state;
    // pixels moved
    let dx = (currentPosition - dragStart) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    console.log(index, dragStartIndex, numImages)
    if (index !== imageIndex) {
      this.setState({ imageIndex: index });
    }

  };

  handleMouseMove = e => {
    console.log("move")
    if (this.state.dragging) {
      this.updateImageIndex(e.screenX);
      this.setState({ showSVG:false})
      
    }
  };

  preventDragHandler = e => {
    e.preventDefault();
  };

  toggleSvgOutline = visible => {
    if(visible){
      this.svgOutline
    }else{

    }
  }

  renderImage = () => {
    const { imageIndex } = this.state;

    return (
      <div className="react360" onPointerDown={this.handleMouseDown} 
      onDragStart={this.preventDragHandler} >
       
        <img
          className="react-360-img img-fluid "
          alt=""
          src={require(`./${this.props.dir}/${imageIndex}.jpeg`)}
        />
        <div id="tool-tip">
          <div className="tool-tip-header" id="tool-tip-header">
          <div>
              <p style={{ fontWeight : "bold"}}>Unit</p>
              <p id="tool-tip-unit">152</p>
            </div>
            <div className="tool-tip-price">
              <p id="availability-dot"></p>
              <p id="tool-tip-availability">Available</p>
            </div>
          </div>
          <div className="tool-tip-body">
            <div>
              <p style={{ fontWeight : "bold"}}>Surface</p>
              <p id="tool-tip-surface">85</p>
            </div>
            <div>
              <p style={{ fontWeight : "bold"}}>Price</p>
              <p id="tool-tip-price">1500000</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render = () => {
    const {showSVG} = this.state;
    return (
      <div
        className="react-360-img"
      >

        {this.renderImage()}
        {/* { showSVG && <Outline360 ref={this.svgOutline} />} */}
        { showSVG && <div className="react360 outline" >
          <Outline360 ref={this.svgOutline} />
        </div>}
      </div>
    );
  };
}

export default React360;
