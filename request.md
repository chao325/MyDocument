# Axios请求

> 参考连接 https://www.axios-http.cn/docs/intro

![logo](https://docsify.js.org/_media/icon.svg ':size=10%')




## Axios介绍

 Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。

 
 ## 特性
- 从浏览器创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御XSRF
---------------------------------------------

 ## 安装 

  使用NPM

  ```
  npm install axios
  ```

  使用YARN

  ```
  yarn add axios
  ```
  > 其余方法安装详见 https://www.axios-http.cn/docs/intro

## 结构目录
以下代码使用的文件结构。依据个人喜好设定

  ```
  //api 可分成多个模块例如 Login.js UsuerInfo.js ...

└── src
    └── util
        ├── api.js 
        └── request.js
  ```

---------------------------------------------
## 贴代码

request.js

```javascript
import axios from 'axios'

export default function (url, params, methodType = 'GET') {
  return new Promise((resolve, reject) => {

    axios.request({
      url: url,
      method: methodType,
      data: params,
      headers: {'X-xxxKey':'Value'}, // header设置
      timeout: 1000 * 60,
    }).then(res => {
      const { code, message, data, token } = res.data

      console.log("🚀 res", res)
      if (code === 1000) {
        resolve(data)
      } else {
        Message.error(message)
      }

    }).catch(err => {
      const message = err.message || err.errMsg || err
      console.log("🚀 错误~ err", err)
      Message.error('请求错误', err)


      if (err.message.includes('timeout')) {
        // 请求超时
        Message.error('请求超时')
      }
      reject(message)
    }).finally(() => {
      // 请求结束
    })
  })
}

```
