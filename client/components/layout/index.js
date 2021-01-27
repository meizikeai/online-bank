import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import 'whatwg-fetch'

import Footer from '../footer'

import 'antd/dist/antd.css'

class APP extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { children } = this.props

    return (
      <Layout className='layout'>
        <Layout.Header>
          <div className='login-header'>
            <div className='header-logo'>
              <div className='logo'>
                <a href='/'></a>
              </div>
              <div className='tips'>
                <div>个人银行专业版</div>
                <p>客服热线：95558</p>
              </div>
            </div>
            <div className='header-link'>
              <span>
                <a href='/'>常见问题</a>
              </span>
              <span>
                <a href='/'>在线客服</a>
              </span>
              <span>
                <a href='/login'>登录</a>
              </span>
            </div>
          </div>
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    )
  }
}

APP.propTypes = {
  selectKey: PropTypes.string,
  children: PropTypes.node,
}

export default APP
