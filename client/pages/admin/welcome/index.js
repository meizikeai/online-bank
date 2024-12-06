import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Breadcrumb } from 'antd'

import LayoutAdmin from '../../../components/layout-admin/index.js'

import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount() {}

  render() {
    const breadcrumb = (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>welcome</Breadcrumb.Item>
      </Breadcrumb>
    )

    return (
      <LayoutAdmin breadcrumb={breadcrumb} selectKey='1'>
        <div className='bank-admin-welcome'>
          <h3>欢迎来到网上银行系统</h3>
          <p>投资有风险，入市需谨慎。中国证监会提醒您，请在法定交易场所投资，远离非法交易活动。</p>
          <span />
        </div>
      </LayoutAdmin>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
