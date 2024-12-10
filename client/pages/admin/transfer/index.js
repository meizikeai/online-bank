import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Input, Button, Breadcrumb, message } from 'antd'

import LayoutAdmin from '../../../components/layout-admin/index.js'

import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      account: '',
      bank: '',
      money: 0,
      phone: '',
      purpose: '',
    }
  }

  // componentDidMount() {}

  handleSubmit = () => {
    const { name, account, bank, money, phone, purpose } = this.state

    if (!name || !account || !bank || !money) {
      message.error('请完善转帐信息后再尝试！')
      return false
    }

    const token = localStorage.getItem('token')

    fetch('/api/admin/transfer/settransfer', {
      method: 'post',
      body: JSON.stringify({
        name,
        account,
        bank,
        money,
        phone,
        purpose,
      }),
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      })
  }

  render() {
    const breadcrumb = (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>transfer</Breadcrumb.Item>
      </Breadcrumb>
    )

    return (
      <LayoutAdmin breadcrumb={breadcrumb} selectKey='4'>
        <div className='bank-admin-transfer'>
          <h3 className='title'>转帐汇款</h3>

          <div className='one'>
            <h4>收款人</h4>
            <div className='line'>
              <div>
                <i>*</i>
                <span>户名</span>
              </div>
              <Input
                placeholder='请输入收款人户名'
                onChange={(e) => {
                  this.setState({ name: e.target.value })
                }}
              />
            </div>
            <div className='line'>
              <div>
                <i>*</i>
                <span>帐号</span>
              </div>
              <Input
                placeholder='请输入收款人帐号'
                onChange={(e) => {
                  this.setState({ account: e.target.value })
                }}
              />
            </div>
            <div className='line'>
              <div>
                <i>*</i>
                <span>银行</span>
              </div>
              <Input
                placeholder='请输入收款人银行'
                onChange={(e) => {
                  this.setState({ bank: e.target.value })
                }}
              />
            </div>
          </div>

          <div className='one'>
            <h4>
              <i>*</i>
              <span>转帐金额</span>
            </h4>
            <div className='line'>
              <Input
                placeholder='0手续费'
                onChange={(e) => {
                  this.setState({ money: e.target.value })
                }}
              />
            </div>
          </div>

          <div className='one'>
            <div className='line'>
              <span>短信通知</span>
              <Input
                placeholder='请输入手机号（可不填）'
                onChange={(e) => {
                  this.setState({ phone: e.target.value })
                }}
              />
            </div>
            <div className='line'>
              <span>转帐附言</span>
              <Input
                placeholder='转帐'
                onChange={(e) => {
                  this.setState({ message: e.target.value })
                }}
              />
            </div>
          </div>

          <div className='submit'>
            <Button size='large' type='primary' onClick={this.handleSubmit}>
              转 帐
            </Button>
          </div>
        </div>
      </LayoutAdmin>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
