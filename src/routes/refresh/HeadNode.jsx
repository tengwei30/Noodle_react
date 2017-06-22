import React, { Component,PureComponent,PropTypes } from 'react';
import ReactPullLoad,{ STATS } from 'react-pullload';
const defaultStyle ={
  width: "100%",
  textAlign: "center",
  fontSize: "16px",
  lineHeight: "1.5"
}

class HeadNode extends Component{

  static propTypes = {
    loaderState: PropTypes.string.isRequired,
  };

  static defaultProps = {
    loaderState: STATS.init,
  };

  render(){
    const {
      loaderState
      } = this.props

    let content = ""
    if(loaderState == STATS.pulling){
      content = "下拉刷新"
    } else if(loaderState == STATS.enough){
      content = "松开刷新"
    } else if(loaderState == STATS.refreshing){
      content = "正在刷新..."
    } else if(loaderState == STATS.refreshed){
      content = "刷新成功"
    }

    return(
      <div style={defaultStyle}>
        {content}
      </div>
    )
  }
}

module.exports = HeadNode;



