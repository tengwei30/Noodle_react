
import React,{ Component } from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import md5 from 'md5';
import moment from 'moment';
import ListV from '../common/list';
import Request from '../common/fetch'

let keySearch = md5('api/article/skeywords'+(moment().format('YYYY-MM-DD HH')));
let secretSearch = JSON.stringify({"account": "inews", "key":`${keySearch}`});

class Search extends Component {

  constructor(props){
    super(props);

    this.state = {
      focused:true,
      dataList:[]
    }
  }

  _Submit(value) {
    Request('api/article/skeywords',{
      secret:secretSearch,
      keywords: value
    },((res) => {
      console.log(res)
      this.setState({
        dataList: res.result.news
      })
    }))

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
        <div style={{backgroundColor:'#fff',paddingLeft:15,paddingRight:15}}>
          <ListV
            data= {this.state.dataList}
            />
        </div>

      </div>
    )
  }
}


module.exports = Search;

