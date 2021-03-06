import React, { useEffect, useState, useRef } from 'react'
import Waterfall from 'charge-waterfall'
import './App.css'


function App() {
  const [initialData, setInitialData] = useState([{
    src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0606%252F04a3d0f7j00qu8tsb001hc000hs00qoc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=9859b8d0ec4fe8a8cf1c44583f324c88',
    data: {
      name: '第一张图',
    },
  },
  {
    src: 'https://img14.360buyimg.com/pop/jfs/t1/194578/27/13360/226560/60f26ec7E79671fbb/0eada5dcb4437eac.jpg',
    data: {
      name: '第二张图',
    },
  },
  {
    src: 'https://img0.baidu.com/it/u=2889371076,2512753262&fm=26&fmt=auto',
    data: {
      name: '第三张图',
    },
  },
  {
    src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Fc%2F64%2F52911497794.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636018780&t=30680621f7289dd8c56cdd4effa5a0b7',
    data: {
      name: '第四张图',
    },
  },
  {
    data: {
      name: '第五张图，这是无图模式',
    },
  },
  {
    src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919232S7%2F1Z629232S7-6.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=af57df8f67ad1a368fdb32453262a49e',
    data: {
      name: '第六张图',
    },
  },
  {
    src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
    data: {
      name: '第七张图',
    },
  },
  {
    src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F1231201I446%2F2012311I446-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=49e67d02c3b37f236149e1541f4f1abf',
    data: {
      name: '第八张图',
    },
  },
  ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const waterfall = new Waterfall({
      container: '.container',
      initialData: this.initialData,
      column: 2,
      gapY: 20,
      animation: {
        name: 'fadeInRight',
        duration: 1,
      },
      resizable: true,
      defaultImgUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbf18a5314f750da671711dfb176cf8791fbc687153d-g7YSBF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636300149&t=84cd1f7a4fe131edd66638bd44f3496d',
      render: (dataSource) =>
        `<div>这是${dataSource.data?.name}</div>
        <div>哈哈哈哈哈</div>
        <div>测试测试</div>
        `,
      onClick: (data, event) => {
        console.log(data, event)
      },
    })

    // 这里的_isLoading是防止触底重复多次请求的
    let _isLoading = false
    waterfall.onReachBottom(async () => {
      if (_isLoading) return
      _isLoading = true
      console.log('触底')
      // 这里的setIsLoading是用来做Loading状态的SVG图片渲染的
      setIsLoading(true)
      // 模拟一个异步请求，拿到异步请求的数据之后塞进loadMore里面
      await sleep(2000)
      setIsLoading(false)
      // 异步请求拿到数据之后就可以通过loadMore方法插入了
      waterfall.loadMore([
        {
          src: 'https://baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919233114%2F1Z629233114-5.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=4ddaf1b496ec72d9a24a0d21f9019733',
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
      ])
      _isLoading = false
    })

    return () => {
      waterfall.destroy()
    }
  }, [])

  const sleep = (wait) => {
    return new Promise((resolve) => {
      setTimeout(resolve, wait);
    })
  }

  return (
    <div className="App">
      {/* 装载图片的空容器 */}
      <div className='container'></div>
      {isLoading && <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div>正在加载中...</div>
      </div>
      }
    </div>
  );
}

export default App;
