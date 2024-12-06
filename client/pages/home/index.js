import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'

import Layout from '../../components/layout/index.js'

import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount() {}

  render() {
    return (
      <Layout className='layout'>
        <div className='nav'>
          <div className='nav_list'>
            <div className='nav_item'>
              <span>
                <a href='/'>首页</a>
              </span>
            </div>
            <div className='nav_item'>
              <span>
                <a href='/'>信用卡</a>
              </span>
            </div>
            <div className='nav_item'>
              <span>
                <a href='/'>理财产品</a>
              </span>
            </div>
            <div className='nav_item'>
              <span>
                <a href='/'>企业金融</a>
              </span>
            </div>
            <div className='nav_item'>
              <span>
                <a href='/'>资讯信息</a>
              </span>
            </div>
            <div className='nav_item'>
              <span>
                <a href='/'>积分专区</a>
              </span>
            </div>
          </div>
        </div>

        <div className='banner'></div>

        <div className='news'>
          <div className='news-box'>
            <div className='names'>
              <h3>最新资讯</h3>
            </div>

            <div className='box_news'>
              <div className='bxeegg'>
                <div className='avator'>
                  <img src='' alt='' />
                </div>

                <div className='news_list'>
                  <div className='one'>
                    <a href='/'>中国人寿集团党委宣布广发银行主要负责人任免职决定</a>
                  </div>
                  <div className='news_item'>
                    <a href='/'>广发银行：保银协同提升服务质效 满足美好生活金融需求</a>
                    <span className='date'>2020.12.30</span>
                  </div>
                  <div className='news_item'>
                    <a href='/'>广发银行：保银协同助力实体经济在新格局下腾飞</a>
                    <span className='date'>2020.12.30</span>
                  </div>
                  <div className='news_item'>
                    <a href='/'>广发银行发布“保险业金融服务商”解决方案</a>
                    <span className='date'>2020.12.22</span>
                  </div>
                  <div className='news_item'>
                    <a href='/'>智慧广发，城市管家——广发银行“智慧城市”建设之路</a>
                    <span className='date'>2020.12.09</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App />)
