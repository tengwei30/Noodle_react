
import React, {Component} from 'react';
import { Tabs, WhiteSpace,ListView,Toast,List} from 'antd-mobile';
import {connect} from 'dva';
import md5 from 'md5';
import moment from 'moment';
import $ from 'jquery';
import stylesImg from './../header/header.less';
import ListV from './../common/list';
import Request from '../common/fetch'
import {width,height} from '../common/style';
import stylesH from '../IndexPage.less';

const data = {
  newsID: '',
  channelid:'',
  linkUrl: ''
}

let keyArticleDetail = md5('api/article/spage'+(moment().format('YYYY-MM-DD HH')));
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
    }else{
      data.newsID = dataList[datailid].id
      data.channelid =dataList[datailid].channelid
    }

    this.state = ({
      linkUrl: '',
      newsLength: '',
      dataList:[]
    })

  }

  componentDidMount() {
    Request('/api/article/spage',{
      secret:secretDetail,
      newsID: data.newsID,
      channelID: data.channelid,
      devicenum: devicenum,
    },((res) => {
      console.log(res)

      this.setState({
        newsLength: res.result.news.length,
        dataList: res.result.news,
        linkUrl: res.result.detail.linkUrl
      })
    }))

  }


	render() {
		return(
			<div style={styles.container}>
        <div className = {stylesH.h2style}>
          <div dangerouslySetInnerHTML={{__html: this.state.linkUrl}} />
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


