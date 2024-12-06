import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import 'whatwg-fetch'

import Footer from '../footer/index.js'

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
          <div className='foot-container'>
            <div className='container'>
              <span className='text'>
                <a href='/'>关于银行</a>
              </span>
              <span className='line'>|</span>
              <span className='text'>
                <a href='/'>联系我们</a>
              </span>
              <span className='line'>|</span>
              <span className='text'>
                <a href='/'>安全指引</a>
              </span>
              <span className='line'>|</span>
              <span className='text'>
                <a href='/'>银行信用卡</a>
              </span>
              <span className='line'>|</span>
              <span className='text'>
                <a href='/'>银行APP</a>
              </span>
              <span className='line'>|</span>
              <span className='text'>
                <a href='/'>企业专业版</a>
              </span>
            </div>
          </div>
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
