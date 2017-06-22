import React, { Component } from 'react';import md5 from 'md5';
import { Tabs, WhiteSpace,ListView,Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import Request from '../common/fetch'

const TabPane = Tabs.TabPane;
let keyArticleTab = md5('api/article/channel'+(moment().format('YYYY-MM-DD HH')));
let secretTab = JSON.stringify({"account": "inews", "key":`${keyArticleTab}`});

//屏幕的有效宽高
const width = window.screen.availWidth;
const height = window.screen.availHeight;


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

  render() {
    return(
      <div style={{position:'fixed',top:44,zIndex:999,backgroundColor:'#fff'}}>
        <Tabs defaultActiveKey="1"
              pageSize={7}
              onTabClick={(key) => {this._handleTabClick(key)}}
              swipeable = {false}
          >
          {this._renderList()}
        </Tabs>
      </div>
    )
  }
}


function indexList({indexList}) {
  return { indexList };
}

export default connect(indexList)(TabButton);


