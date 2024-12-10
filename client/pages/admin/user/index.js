import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Input, Button, Breadcrumb, message } from 'antd'

import LayoutAdmin from '../../../components/layout-admin/index.js'

import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    fetch('/api/admin/user/getinfo', {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.code === 200) {
          // console.log(res)

          this.setState({
            data: res.data,
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  handleSubmit = () => {
    // name, national, gender, idcard, phone, address, postcode
    const { data } = this.state

    if (
      !data.name ||
      !data.national ||
      !data.gender ||
      !data.idcard ||
      !data.phone ||
      !data.address ||
      !data.postcode
    ) {
      message.error('请完善个人信息后再尝试！')
      return false
    }

    const token = localStorage.getItem('token')

    fetch('/api/admin/user/setinfo', {
      method: 'post',
      body: JSON.stringify(data),
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
    const { data } = this.state

    const breadcrumb = (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>user</Breadcrumb.Item>
      </Breadcrumb>
    )

    return (
      <LayoutAdmin breadcrumb={breadcrumb} selectKey='2'>
        <div className='bank-admin-user'>
          <h3 className='title'>个人资料</h3>

          <div className='about'>
            <Input
              onChange={(e) => {
                const config = data
                config.name = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='姓名：'
              value={data.name}
            />

            <Input
              onChange={(e) => {
                const config = data
                config.national = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='民族：'
              value={data.national}
            />

            <Input
              onChange={(e) => {
                const config = data
                config.gender = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='性别：'
              value={data.gender}
            />

            <Input
              onChange={(e) => {
                const config = data
                config.idcard = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='身份证：'
              value={data.idcard}
            />

            <Input
              onChange={(e) => {
                const config = data
                config.phone = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='手机号：'
              value={data.phone}
            />

            <Input
              onChange={(e) => {
                const config = data
                config.address = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='家庭地址：'
              value={data.address}
            />

            <Input
              onChange={(e) => {
                const config = data
                config.postcode = e.target.value

                this.setState({ data: config })
              }}
              addonBefore='邮编：'
              value={data.postcode}
            />
          </div>

          <div className='submit'>
            <Button size='large' type='primary' onClick={this.handleSubmit}>
              修 改
            </Button>
          </div>
        </div>
      </LayoutAdmin>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
