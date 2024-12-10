import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Table, Breadcrumb } from 'antd'

import LayoutAdmin from '../../../components/layout-admin/index.js'

import './index.css'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '消费名称',
    dataIndex: 'uses',
    key: 'uses',
  },
  {
    title: '消费金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '交易卡号',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: '交易渠道',
    dataIndex: 'channel',
    key: 'channel',
  },
  {
    title: '交易类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '交易时间',
    dataIndex: 'datetime',
    key: 'datetime',
  },
  {
    title: '备注',
    key: 'note',
    dataIndex: 'note',
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    fetch('/api/admin/trading/gettrading', {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)

        if (res.code === 200) {
          this.setState({
            data: res.data,
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const { data } = this.state
    const breadcrumb = (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>trading</Breadcrumb.Item>
      </Breadcrumb>
    )

    return (
      <LayoutAdmin breadcrumb={breadcrumb} selectKey='5'>
        <div className='bank-admin-trading'>
          <h3 className='title'>交易明细</h3>
          <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 8 }} />
        </div>
      </LayoutAdmin>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
