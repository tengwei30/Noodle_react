import React,{Component} from 'react';
import {width,height} from '../common/style';

class morechannel extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className = {styles.container}>
          <p></p>
          <p></p>
          <p onClick= {(ev) => {this._Search(ev)}}>
          </p>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    height: 88,
    lineHeight: 88,
    //display: flex,
    backgroundColor:'#FFDB01',
    width:width,
    zIndex:9990,
    position:'fixed',
    top:0,
  }
}


module.exports = morechannel;


