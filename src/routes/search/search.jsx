
import React,{ Component } from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import md5 from 'md5';
import moment from 'moment';
import ListV from '../common/list';
import Request from '../common/fetch';
import {width,height} from '../common/style';
let keySearch = md5('api/article/skeywords'+(moment().format('YYYY-MM-DD HH')));
let secretSearch = JSON.stringify({"account": "inews", "key":`${keySearch}`});

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      focused:true,
      dataList:[],
      dataListLength:''
    }
  }

  _Submit(value) {
    Request('/api/article/skeywords',{
      secret:secretSearch,
      keywords: value
    },((res) => {
      console.log(res)
      this.setState({
        dataList: res.result.news,
        dataListLength:res.result.news.length
      })
    }))

  }

  _renderList() {
    if(this.state.dataListLength != 0) {
      return(
        <div style={{backgroundColor:'#fff',paddingLeft:15,paddingRight:15}}>
          <ListV
            data= {this.state.dataList}
          />
        </div>
      )
    }else{
      return(
        <div style={{width:width,height:height-44,backgroundColor:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <img src={require('../../assets/search/default@2x.png')} alt="" style={{width:100,height:100}} /><br />
          <p style={{fontSize:14,color:'#a3a3a3'}}>搜索感興趣的文章和視頻</p>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <SearchBar
          focused={this.state.focused}
          onFocus={() => {
            this.setState({
              focused: false
            });
          }}
          placeholder="搜索"
          onSubmit={value => this._Submit( value )}
          onCancel={() => {history.go(-1)}}
           />
        <WhiteSpace />
        {this._renderList()}
      </div>
    )
  }
}


module.exports = Search;

