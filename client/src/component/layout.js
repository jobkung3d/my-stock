import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import Sider from './sider'
import 'antd/dist/antd.css'

class Layout extends Component {

  render() {
    return (
      <div>
      <Header />
        <Sider />
      <Footer />
      </div>
    );
  }
}

export default Layout