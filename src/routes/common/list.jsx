import React,{ Component } from 'react';


class List extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    let data = this.props.data
    return (
      <ul style={{listStyle:'none'}}>
        {
          data.map((str,index) => {
            console.log(str)
            if(str.logoImageUrl != ''){
              return <li key={index}>
                <a href={str.linkUrl}>
                  <dl style={styles.dlContent}>
                    <dd style={styles.flex_1}>
                      <img style={{width:130,height:90}} src={str.logoImageUrl} alt={str.title}/>
                    </dd>
                    <dd style={styles.flex_2}>
                      <p>{str.title}</p>
                      <p style={{position:'absolute',bottom:0,color:'#A3A3A3',fontSize:12}}>{str.publishTime}</p>
                    </dd>
                  </dl>
                </a>
              </li>
            }else{
              return <li key={index}>
                <a href={str.linkUrl}>
                  <dl style={styles.dlContent}>
                    <dd style={styles.flex_3}>
                      <p>{str.title}</p>
                      <p style={{position:'absolute',bottom:0,color:'#A3A3A3',fontSize:12}}>{str.publishTime}</p>
                    </dd>
                  </dl>
                </a>
              </li>
            }
          })
        }
      </ul>
    )
  }
}

const styles = {
  dlContent: {
    display:'flex',
    flexDirection:"row",
    paddingBottom:15,
    paddingTop:5
  },
  flex_1: {
    flex:1,
    marginRight:15
  },
  flex_2: {
    flex:2,
    color:'#000',
    fontSize:17,
    letterSpacing:1,
    position:'relative',
  },
  flex_3: {
    color:'#000',
    fontSize:17,
    letterSpacing:1,
    position:'relative',
  }
}

module.exports = List;



