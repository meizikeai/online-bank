import React, { Component } from 'react'

import './index.css'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className='bank-footer'>
        <div className='copyright'>
          <p>{`©${new Date().getFullYear()} Bank All Rights Reserved.`}</p>
        </div>
      </div>
    )
  }
}
