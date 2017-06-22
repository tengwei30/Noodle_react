import React, { Component,PureComponent,PropTypes } from 'react';
import { Tabs, WhiteSpace,ListView,Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import md5 from 'md5';
import moment from 'moment';
import ReactPullLoad,{ STATS } from 'react-pullload';
import TabButton from './TabButton';
import {width,height} from '../common/style';

let keyArticleList = md5('api/article'+(moment().format('YYYY-MM-DD HH')));
let secretList = JSON.stringify({"account": "inews", "key":`${keyArticleList}`});

const loadMoreLimitNum = 10;

const defaultStyle ={
  width: "100%",
  textAlign: "center",
  fontSize: "16px",
  lineHeight: "1.5"
}

class HeadNode extends PureComponent{

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

class FooterNode extends PureComponent{

  static propTypes = {
    loaderState: PropTypes.string.isRequired,
    hasMore: PropTypes.bool.isRequired
  };

  static defaultProps = {
    loaderState: STATS.init,
    hasMore: true
  };

  render(){
    const {
      loaderState,
      hasMore
      } = this.props
    let content = ""
    if(loaderState == STATS.loading){
      content = "加载中"
    } else if(hasMore === false){
      content = "没有更多"
    }

    return(
      <div style={defaultStyle}>
        {content}
      </div>
    )
  }
}


class indexTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels : [],
      channelid : 1,
      showT:false,
      loading : false,
      hasMore: true,
      data: [],
      action: STATS.init,
      index: loadMoreLimitNum
    }
  }

  componentDidMount() {
    this.getListData(this.state.channelid);
  }

  getListData(channelid) {
    // List
    fetch('/api/article',{
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        secret:secretList,
        channelID: channelid,
        type: 0,
        pageSize: 10,
        dt : 2,
        action: 1
      })
    }).then((res) => res.json()).then((res) => {
      console.log(res)
      this.setState({
        data: res.result.news
      })
      this.props.dispatch({
        type: 'indexList/detailData',
        payload: res.result.news,
      });
    }).then(() => {
      setTimeout(() => {
        this.setState({
          showT : true
        })
      },1100)
    }).then(() => {
      setTimeout(() => {
        this.setState({
          showT : false
        })
      },2500)
    }).catch((err) => {
      console.log(err)
    })
  }

  componentWillReceiveProps(nextProp){
    console.log(this.props.indexList)
  }


  handleAction = (action) => {
    console.info(action, this.state.action,action === this.state.action);
    if(action === this.state.action){
      return false
    }
    if(action === STATS.refreshing){//刷新
      this.handRefreshing();
    } else if(action === STATS.loading){
      this.handLoadMore();
    } else{
      this.setState({
        action: action
      })
    }
  }
  handRefreshing = () =>{
    if(STATS.refreshing === this.state.action){
      return false
    }
    this.getListData(this.state.channelid)
    setTimeout(()=>{
      this.setState({
        action: STATS.refreshed,
        index: loadMoreLimitNum
      });
    }, 3000)

  }
  handLoadMore = () => {
    if(STATS.loading === this.state.action){
      return false
    }
    setTimeout(()=>{
      if(this.state.index === 0){
        this.setState({
          action: STATS.reset,
          hasMore: false
        });
      } else{
        fetch('/api/article',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            secret:secretList,
            channelID: this.state.channelid,
            type: 0,
            pageSize: 10,
            dt : 2,
            action: 1
          })
        }).then((res) => res.json()).then((res) => {
          console.log(res)
          this.setState({
            data: [...this.state.data,...res.result.news],
              action: STATS.reset,
              index: this.state.index - 1
          })
          this.props.dispatch({
            type: 'indexList/detailData',
            payload: [...this.state.data,...res.result.news],
          });
        }).then(() => {
          setTimeout(() => {
            this.setState({
              showT : true
            })
          },1100)
        }).then(() => {
          setTimeout(() => {
            this.setState({
              showT : false
            })
          },2500)
        }).catch((err) => {
          console.log(err)
        })
      }
    }, 3000)
    this.setState({
      action: STATS.loading
    })
  }


  _routerDetail(index) {
    localStorage.setItem('detailid',index)
    this.props.dispatch(
      routerRedux.push(`/detail/${index}`)
    )
  }

  //Tab 切换重新调取
  ButtonClick(key) {
    this.getListData(key)
  }

  _renderShow() {
    if(this.state.showT == true){
      return(
        <p style={styles.more}>更新了10条内容</p>
      )
    }else{
      return(
        <p></p>
      )
    }
  }

  render(){
    const {data,hasMore} = this.state
    return (
      <div>
        <TabButton
          ButtonClick = {this.ButtonClick.bind(this)}
          />
        <p style={{width:100,height:80}}></p>
        <ReactPullLoad
          downEnough={50}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          distanceBottom={10}
          HeadNode={HeadNode}
          FooterNode={FooterNode}
          >
          <ul className="test-ul">
            {
              data.map( (str, index )=>{
                if(str.logoImageUrl != ''){
                  return <li key={index}>
                    <div style={styles.news} onClick = {() => this._routerDetail(index)}>
                      <img src={str.logoImageUrl} style={styles.imgStyle} />
                      <p style={styles.newsTitle}>{str.title}</p>
                      <p style={{fontSize:12,color:'#ccc',borderWidth:1}}><span style={{color:'#03D7FF'}}>{str.source}</span> | {str.publishTime}</p>
                    </div>
                  </li>
                }else{
                  return <li key={index}>
                    <div style={styles.news} onClick = {() => this._routerDetail(index)}>
                      <p style={styles.newsTitle}>{str.title}</p>
                      <p style={{fontSize:12,color:'#ccc',borderWidth:1}}><span style={{color:'#03D7FF'}}>{str.source}</span> | {str.publishTime}</p>
                    </div>
                  </li>
                }
              })
            }
          </ul>
        </ReactPullLoad>
        <div>
        </div>
        {this._renderShow()}
      </div>
    )
  }

}


const styles = {
  more: {
    width:width,
    backgroundColor:'#FFDB01',
    position:'absolute',
    zIndex:9999,
    top:86,
    textAlign:'center',
    padding:5,
    fontSize:14,
    display:'block',

  },
  news: {
    padding:15,
    justifyContent:'center',
    alignItems:'center'
  },
  imgStyle: {
    width:width-30,
    //height:100
  },
  newsTitle: {
    fontSize:18,
    marginTop:10,
    marginBottom:10
  },
  moreTab: {
    width:width-(width/7)*6,
    height:43,
    backgroundColor:'#fff',
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    top:44,
    right:0,
    zIndex:9999
  }
}
function indexList({ indexList }) {
  return { indexList };
}
export default connect(indexList)(indexTab);
