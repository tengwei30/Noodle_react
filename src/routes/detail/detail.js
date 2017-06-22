
import React, {Component} from 'react';
import { Tabs, WhiteSpace,ListView,Toast,List} from 'antd-mobile';
import {connect} from 'dva';
import md5 from 'md5';
import moment from 'moment';
import stylesImg from './../header/header.less';
import ListV from './../common/list';
import Request from '../common/fetch'
import {width,height} from '../common/style';


const data = {
  newsID: '',
  channelid:'',
  linkUrl: ''
}

let keyArticleDetail = md5('api/article/detail'+(moment().format('YYYY-MM-DD HH')));
let secretDetail = JSON.stringify({"account": "inews", "key":`${keyArticleDetail}`});
let devicenum = localStorage.getItem('devicenum')
class Detail extends Component {
  constructor(props){
    super(props)

    let dataList = JSON.parse(sessionStorage.getItem('detaiList'));
    let datailid = localStorage.getItem('detailid')

    if(this.props.indexList.detail){
      data.newsID = this.props.indexList.detail[this.props.params.id].id;
      data.channelid =this.props.indexList.detail[this.props.params.id].channelid;
      data.linkUrl = this.props.indexList.detail[this.props.params.id].linkUrl;
    }else{
      data.newsID = dataList[datailid].id
      data.channelid =dataList[datailid].channelid
      data.linkUrl = dataList[datailid].linkUrl
    }

    this.state = ({
      linkUrl: data.linkUrl,
      newsLength: '',
      dataList:[]
    })

  }

  componentDidMount() {

    Request('/api/article/detail',{
      secret:secretDetail,
      newsID: data.newsID,
      channelID: data.channelid,
      devicenum: devicenum,
    },((res) => {
      this.setState({
        newsLength: res.result.news.length,
        dataList: res.result.news
      })
    }))


    const iframe = document.getElementById('frame_content');
    setTimeout(() => {
      const ifr = document.getElementById('frame_content').contentWindow
    },500)

  }

  iFrameHeight() {
    var ifm= document.getElementById("iframepage");
    var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
    if(ifm != null && subWeb != null) {
      ifm.height = subWeb.body.scrollHeight;
      ifm.width = subWeb.body.scrollWidth;
    }
  }

	render() {
		return(
			<div style={styles.container}>
        <div id="url_Content">
          <iframe id="iframepage" src={this.state.linkUrl} scrolling="no" frameBorder="0" onLoad={this.iFrameHeight} style={{width:width-30,border:'none'}}>
          </iframe>
        </div>
        <p className={stylesImg.recommend}></p>
        <div style={{ display: 'flex',border:'none',height:'auto',padding:15}}>
          {/*{this._Morenews()}*/}
          <ListV
            data= {this.state.dataList}
            />
        </div>
			</div>
			)
	}
}

const styles = {
  container: {
    backgroundColor:'#fff'
  },
  news:{
    padding:15,
    justifyContent:'center',
    alignItems:'center'
  }
}


function indexList({indexList}) {
  return {indexList}
}
export default connect(indexList)(Detail)


