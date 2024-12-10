import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Input, Button, message } from 'antd'

import Footer from '../../components/footer/index.js'

import './index.css'

const rule = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  // componentDidMount() {}

  handleSubmit = () => {
    const { email, password } = this.state

    if (!email) {
      message.error('请输入您的帐号!')
      return false
    } else if (!password) {
      message.error('请输入您的密码!')
      return false
    } else if (!rule.test(email)) {
      message.error('请输入符合要求的邮箱地址!')
      return false
    } else if (password.length < 6) {
      message.error('您输入的密码少于6位，请重新输入!')
      return false
    }

    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200 || res.code === 302) {
          localStorage.setItem('token', res.data.token)

          message.success(res.message)

          if (res.code === 302) {
            window.location.href = '/admin'
          } else {
            window.location.href = '/'
          }
        } else {
          message.error(res.message)
        }
      })
  }

  render() {
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
            </div>
          </div>
        </Layout.Header>
        <Layout.Content>
          <div className='bank-login'>
            <div className='bank-login-box'>
              <div className='bank-login-content'>
                <div className='icon'>
                  <svg
                    className='MuiSvgIcon-root'
                    focusable='false'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    role='presentation'
                  >
                    <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'>
                      {' '}
                    </path>
                  </svg>
                </div>

                <h1 className='title'>Login Bank</h1>

                <div className='login'>
                  <Input
                    onChange={(e) => {
                      this.setState({ email: e.target.value })
                    }}
                    placeholder='帐号'
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    size='large'
                  />
                </div>
                <div className='password'>
                  <Input.Password
                    onChange={(e) => {
                      this.setState({ password: e.target.value })
                    }}
                    placeholder='密码'
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    size='large'
                    type='password'
                  />
                </div>

                <div className='submit'>
                  <Button size='large' type='primary' onClick={this.handleSubmit}>
                    登录
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Layout.Content>
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

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
