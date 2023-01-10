## React

# 介绍 React

> 参考地址 https://zh-hans.reactjs.org/

## 什么是 React

<h3>React</h3>
用于构建用户界面的 JavaScript 库

## 组件化

构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。由于组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并保持状态与 DOM 分离。

## 声明式

React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React 能高效更新并渲染合适的组件。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

## React Hooks

> Hook 简介：Hook 是 React 16.8 的新增特性。它可以让你在不编写 **class** 组件的情况下使用 state 以及其他的 React 特性。

**class** 编写的时候要考虑到 this 指向,在 class 中取值，使用 this.props.xxx 形式，在 react 中，props 是不可变的，所以他们永远不会改变。简单来说 class 取值 this.xxx.xxx Hook 取值 直接用变量名就可以

---

## 下面用同样逻辑的代码对比以下 class 组件和函数式(Hook)组件写法区别。

### class 组件

```javascript | pure
class ProfilePage extends React.Component {
  render() {
    const props = this.props;

    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}

export default ProfilePage; //导出组件 别人就可以import了

//1 .在每一次特定的渲染中都获得了对应的state，props
//2 .它内部的任何代码（包括showMessage）都保证可以得到这一次特定渲染所使用的props
//3 .然后我们可以在里面添加任意多的辅助函数，它们都会使用被捕获的props和state
```

然后同样的逻辑用函数式组件

### 函数式组件

```javascript | pure
export default (props) => {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
};

// 可以不写组件名，这也不需要使用 export default xxx; 导出
// 因为你的文件名就是 这个函数式组件的名字，
```

---
