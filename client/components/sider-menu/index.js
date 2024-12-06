import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const SiderMenu = ({ selectKey }) => {
  const [admin, setAdmin] = useState(false)

  const handleType = ({ key }) => {
    const config = {
      1: '/admin',
      2: '/admin/user',
      3: '/admin/balance',
      4: '/admin/transfer',
      5: '/admin/trading',
      6: '/admin/password',
    }

    if (config[key]) {
      location.href = config[key]
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('/api/admin/share/type', {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setAdmin(res.data)
        } else {
          location.href = '/login'
        }
      })
      .catch((err) => {
        console.error(err)
        location.href = '/login'
      })
  }, [])

  return (
    <Menu
      mode='inline'
      defaultSelectedKeys={[selectKey]}
      defaultOpenKeys={['user']}
      style={{ height: '100%' }}
      onClick={handleType}
      admin={{ admin }}
    >
      <Menu.SubMenu key='user' icon={<UserOutlined />} title='管理系统'>
        <Menu.Item key='1'>
          <span>中心首页</span>
        </Menu.Item>
        <Menu.Item key='2'>
          <span>个人资料</span>
        </Menu.Item>
        <Menu.Item key='3'>
          <span>帐户总览</span>
        </Menu.Item>
        <Menu.Item key='4'>
          <span>转帐汇款</span>
        </Menu.Item>
        <Menu.Item key='5'>
          <span>交易明细</span>
        </Menu.Item>
        <Menu.Item key='6'>
          <span>修改密码</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

SiderMenu.propTypes = {
  selectKey: PropTypes.string,
}

export default SiderMenu
