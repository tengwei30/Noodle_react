
import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './header.less';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';


class Header extends Component {

    _Search(ev) {
        ev.preventDefault();
        //跳转到搜索界面
      this.props.dispatch(
        routerRedux.push('search')
      )
    }

    render() {
        return(
            <div className = {styles.container}>
                <p></p>
                <p></p>
                <p onClick= {(ev) => {this._Search(ev)}}>
                </p>
            </div>
        )
    }
}

function indexList({ indexList }) {
  return { indexList };
}
export default connect(indexList)(Header);

