import React, { Component } from 'react';

import Header from '../header/header';
import IndexTab from './indexTab';

class Index extends Component {
    render() {
        return(
            <div>
                <Header />
                <div style={styles.ListContent}>
                    <IndexTab />
                </div>
            </div>
        )
    }
}

const styles = {
    ListContent: {
    }
}

module.exports = Index;

