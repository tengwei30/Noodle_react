import React,{Component} from 'react';
import { connect } from 'dva';
import {width,height} from '../common/style';
import BgBack from '../../assets/nav/back/black@2x.png';

class morechannel extends Component {
  constructor(props){
    super(props)

    console.log(this.props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div style = {styles.container}>
          <p style={styles.backImg} onClick = {() => {history.go(-1)}}></p>
          <p style={{flex:4}}></p>
          <p style={{flex:1,textAlign:'center',lineHeight:3}}>完成</p>
        </div>
        <div style={{padding:15,backgroundColor:'#F7F7F7',marginTop:44}}>
          <div>
            <h5>已選頻道</h5>
            <div  style={styles.checkedChannel}>

            </div>
          </div>
          <div>
            <h5>更多可選頻道</h5>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    height: 44,
    display: 'flex',
    backgroundColor:'#fff',
    width:width,
    zIndex:9999,
    position:'fixed',
    top:0,
  },
  backImg: {
    flex:1,
    backgroundImage:`url(${BgBack})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:24,
    backgroundPosition:'center'
  },
  checkedChannel: {
  }
}


function indexList({ indexList }) {
  return { indexList };
}
export default connect(indexList)(morechannel);


