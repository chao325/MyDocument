# Vuex 状态管理器 全局储存

## Vuex五个核心概念速览
### State
>state：vuex的基本数据，用来存储变量
```
state:{ num:0,}
```

### Getters

>getters从基本数据(state)派生的数据，相当于state的计算属性


```
getters:{num:state=>{return state.num}}
```

### Mutations
>mutation提交更新数据的方法，必须是同步的(如果需要异步使用action)。每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。并且它会接受 state 作为第一个参数，提交载荷作为第二个参数 也就是说 第一个参数是自带的，我们传进去的参数，要在第二个位置接收


```
increase(state){ state.num++;}
//不能处理异步操作，如果有需要，可以配合actions使用
```

### Actions
>Action和mutation的功能大致相同，不同之处在于 ==》1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作


```
increase(context){ context.commit('increase');//触发的是Mutations}
//假如我们有一个异步方法，使用Actions处理，然鹅最终执行修改的还是Mutation完成的
```
### Modules
>Modules 模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。 下面代码我并没有使用Modules。因为问题太多，不会


```javascript
export default {
  state,
  mutations,
  getters,
  actions
}
```

---------------------------------------------


### 安装Vuex 
##### #NPM 


```
npm install vuex --save
```
##### #Yarn

```
yarn add vuex
```

在一个模块化的打包系统中，您必须显式地通过 Vue.use() 来安装 Vuex：


```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

!> 当你使用全局 script 标签引用 Vuex 时，不需要以上安装过程

---------------------------------------------

## 结构目录
在scr文件夹下面创建一个store文件夹 继续创建index.js文件



  ```
  └── src
    └── store
        ├── modules 
        └── index.js

  ```
><h6>在scr文件夹下面创建一个store文件夹、需要模块化的可以在里面继续创建一个modules</h6>


---------------------------------------------

index.js


```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user.js'


Vue.use(Vuex)

const store = new Vuex.Store({

  // state 中存放的就是全局共享的数据
  state: {
    user: {
      personId: '',
      phone: '',
      appid: '1234',

    }
  },
  // Mutation 用户变更Store数据
  mutations: {
    SET_USER_INFO (state, value) {
      console.log('SET_USER_INFO被修改为：', value);
      state.user = value
    }
  },
  //Getter用于对Store中的数据进行加工处理，形成新的数据
  getters: {
    completedUserInfo (state) {
      return state.user
    }


  },
  //Action 是专门用于处理异步任务的
  actions: {
    getUserInfo ({ dispatch, commit }, value) {
      console.log('actions---vaule', value);
      //处理异步还得调用mutations里面的方法修改数据 mutations 不能处理异步
      commit('SET_USER_INFO', value)
      dispatch('SET_USER_INFO', value)
    }
  }


});

export default store;

```

## main.js 配置 
---------------------------------------------

```javascript
import store from 'xxx/xxx/store';//状态管理 

new Vue({
  render: h => h(App),
  store,
  //....其他代码

}).$mount('#app')

```

---------------------------------------------

## 用法

```javascript
import { mapGetters } from 'vuex';
<h1>{{ $store.state.user.appid }}</h1> //标签取值。this可以不写


  computed: {
    ...mapGetters({
      user: 'completedUserInfo' //获取放入状态管理中getters的函数返回值
    })
  },
methods:{
  this.userinfo = {
    personId: personId,
    phone: phone,
    appid: '1234'
   };
   //这里调用的是mutations里面SET_USER_INFO的方法
  this.$store.commit('SET_USER_INFO', this.userinfo);

}

```