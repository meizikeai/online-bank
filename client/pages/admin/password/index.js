import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { LockOutlined } from '@ant-design/icons'
import { Input, Button, message, Breadcrumb } from 'antd'

import LayoutAdmin from '../../../components/layout-admin/index.js'

import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldpassword: '',
      onepassword: '',
      twopassword: '',
    }
  }

  // componentDidMount() {}

  handleSubmit = () => {
    const { oldpassword, onepassword, twopassword } = this.state

    if (oldpassword.length < 6 || onepassword.length < 6 || twopassword.length < 6) {
      message.error('密码不能少于6位！')
      return false
    } else if (onepassword !== twopassword) {
      message.error('请验证两个新密码的一致性！')
      return false
    } else if (oldpassword === onepassword) {
      message.error('新旧密码不能相同！')
      return false
    }

    const token = localStorage.getItem('token')

    fetch('/api/admin/password/change', {
      method: 'post',
      body: JSON.stringify({ oldpassword, newpassword: onepassword }),
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          message.success(res.message)

          localStorage.removeItem('token')

          setTimeout(() => {
            window.location.href = '/login'
          }, 1500)
        } else if (res.code === 401) {
          message.error(res.message)
          setTimeout(() => {
            window.location.href = '/login'
          }, 1500)
        } else {
          message.error(res.message)
        }
      })
  }

  handleHTML = () => (
    <div className='bank-admin'>
      <h3 className='title'>修改密码</h3>

      <div className='bank-admin-content'>
        <div className='password'>
          <Input.Password
            onChange={(e) => {
              this.setState({ oldpassword: e.target.value })
            }}
            placeholder='请输入原密码'
            prefix={<LockOutlined className='site-form-item-icon' />}
            size='large'
          />
        </div>

        <div className='password'>
          <Input.Password
            onChange={(e) => {
              this.setState({ onepassword: e.target.value })
            }}
            placeholder='请输入新密码'
            prefix={<LockOutlined className='site-form-item-icon' />}
            size='large'
          />
        </div>

        <div className='password'>
          <Input.Password
            onChange={(e) => {
              this.setState({ twopassword: e.target.value })
            }}
            placeholder='再次输入新密码'
            prefix={<LockOutlined className='site-form-item-icon' />}
            size='large'
          />
        </div>

        <div className='submit'>
          <Button size='large' type='primary' onClick={this.handleSubmit}>
            修 改
          </Button>
        </div>
      </div>
    </div>
  )

  render() {
    const breadcrumb = (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>password</Breadcrumb.Item>
      </Breadcrumb>
    )

    return (
      <LayoutAdmin breadcrumb={breadcrumb} selectKey='6'>
        {this.handleHTML()}
      </LayoutAdmin>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
