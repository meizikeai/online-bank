import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import 'whatwg-fetch'

import Header from '../header/index.js'
import Footer from '../footer/index.js'
import SiderMenu from '../sider-menu/index.js'

class APP extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { breadcrumb, selectKey, children } = this.props

    return (
      <Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          {breadcrumb}
          <Layout className='site-layout-background'>
            <Layout.Sider className='site-layout-background' width={200}>
              <SiderMenu selectKey={selectKey} />
            </Layout.Sider>
            <Layout.Content style={{ minHeight: 280 }}>{children}</Layout.Content>
          </Layout>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    )
  }
}

APP.propTypes = {
  breadcrumb: PropTypes.node,
  selectKey: PropTypes.string,
  children: PropTypes.node,
}

export default APP
