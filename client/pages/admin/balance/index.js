import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Breadcrumb } from 'antd'

import LayoutAdmin from '../../../components/layout-admin/index.js'

import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        money: 0,
        earning: 0,
        financial: 0,
        gold: 0,
        available: 0,
        overdraft: 0,
        repayment: 0,
      },
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    fetch('/api/admin/balance/getbalance', {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)

        if (res.code === 200) {
          console.log(res.data)
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
        <Breadcrumb.Item>balance</Breadcrumb.Item>
      </Breadcrumb>
    )

    return (
      <LayoutAdmin breadcrumb={breadcrumb} selectKey='3'>
        <div className='bank-admin-balance'>
          <h3 className='title'>帐户总览</h3>
          <div className='box-one'>
            <div className='one'>
              <span className='aa'>总资产(元)</span>
              <span className='bb'>{(data.money + data.earning + data.financial + data.gold).toFixed(2)}</span>
            </div>
            <div className='two'>
              <span className='aa'>总负债(元)</span>
              <span className='bb'>{data && (data.overdraft + data.repayment).toFixed(2)}</span>
            </div>
            <div className='san'>
              <div className='three'>
                <h4>一卡通帐号</h4>
                <ul className='list'>
                  <li>
                    <span className='type'>卡号：{data.card}</span>
                  </li>
                  <li>
                    <div className='let'>活期帐户</div>
                    <div className='rig'>{data.money.toFixed(2)}</div>
                  </li>
                  <li>
                    <div className='let'>朝盈宝</div>
                    <div className='rig'>{data.earning.toFixed(2)}</div>
                  </li>
                  <li>
                    <div className='let'>理财产品</div>
                    <div className='rig'>{data.financial.toFixed(2)}</div>
                  </li>
                  <li>
                    <div className='let'>黄金活期</div>
                    <div className='rig'>{data.gold.toFixed(2)}</div>
                  </li>
                </ul>
              </div>

              <div className='three'>
                <h4>信用卡</h4>
                <ul className='list'>
                  <li>
                    <span className='type'>个人消费帐户</span>
                  </li>
                  <li>
                    <div className='let'>可用额度</div>
                    <div className='rig'>{data.available.toFixed(2)}</div>
                  </li>
                  <li>
                    <div className='let'>信用卡透支</div>
                    <div className='rig'>{data.overdraft.toFixed(2)}</div>
                  </li>
                  <li>
                    <div className='let'>本期剩余应还人民币</div>
                    <div className='rig'>{data.repayment.toFixed(2)}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
