import React, { Component } from 'react';import md5 from 'md5';
import { Tabs, WhiteSpace,ListView,Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import Request from '../common/fetch'
import {width,height} from '../common/style';

const TabPane = Tabs.TabPane;
let keyArticleTab = md5('api/article/channel'+(moment().format('YYYY-MM-DD HH')));
let secretTab = JSON.stringify({"account": "inews", "key":`${keyArticleTab}`});


class TabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: []
    }
  }

  componentDidMount() {
    Request('/api/article/channel',{
      secret:secretTab
    },((res) => {
      this.setState({
        channels: res.result.channels
      })
      this.props.dispatch({
        type: 'indexList/TabData',
        payload: res.result.channels,
      });
    }))
  }

  _handleTabClick(key){
    this.props.ButtonClick(key);
  }

  _renderList() {
    let result = [];
    const channels = this.state.channels;
    for(let i in channels) {
      if(channels[i].attval == 1 || channels[i].attval == 2){
        result.push(
          <TabPane tab={`${channels[i].title}`} key={`${parseInt(channels[i].ID)}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',border:'none' }}>
            </div>
          </TabPane>
        )
      }
    }
    return result
  }

  _getMore() {
    this.props.dispatch(
      routerRedux.push('/moreChannel')
    )
  }

  render() {
    return(
      <div style={{position:'fixed',top:44,zIndex:999,backgroundColor:'#fff',width:(width/7)*6}}>
        <Tabs defaultActiveKey="1"
              pageSize={7}
              onTabClick={(key) => {this._handleTabClick(key)}}
              swipeable = {false}
          >
          {this._renderList()}
        </Tabs>
        <p style={styles.moreChannel} onClick={() => this._getMore()}>
          <img style={{width:26,height:26,marginTop:8,marginLeft:14}} src={require('../../assets/list/addchannel@2x.png')} alt=""/>
        </p>
      </div>
    )
  }
}

const styles = {
  moreChannel:{
    position:'absolute',
    top:0,
    right:-width/7,
    zIndex:9999,
    width:width/7,
    height:42,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
}


function indexList({indexList}) {
  return { indexList };
}

export default connect(indexList)(TabButton);


