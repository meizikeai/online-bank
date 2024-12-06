import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'

import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleLogo = () => {
    location.href = '/'
  }

  handleUser = () => {
    localStorage.removeItem('token')
    location.href = '/login'
  }

  handleType = ({ key }) => {
    location.href = key
  }

  render() {
    return (
      <div className='bank-header'>
        <div className='logo' onClick={this.handleLogo} role='presentation'>
          <span />
        </div>

        <div className='type'>
          <Menu theme='dark' mode='horizontal' onClick={this.handleType} defaultSelectedKeys={['/admin']}>
            <Menu.Item key='/'>网上银行首页</Menu.Item>
            <Menu.Item key='/admin'>用户管理系统</Menu.Item>
          </Menu>
        </div>

        <div className='admin'>
          <div className='users' onClick={this.handleUser}>
            <span>退出</span>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  selectKey: PropTypes.string,
}

export default Header
