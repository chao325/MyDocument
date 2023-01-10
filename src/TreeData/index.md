## 树形结构处理

## 先看效果:

```tsx
import React from 'react';
import { Foo } from 'myDumi';
import TreeData from './index';

export default () => <TreeData />;
```

<API src="./index.tsx"></API>

这里需要注意的几个地方`filter`,`concat`,` newList.push(res[i])`

```js
const array2tree = (res: Array<any>) => {
  const newList: Array<any> = [];
  for (let i = 0; i < res.length; i++) {
    res[i].title = res[i].taskTitle;
    const list = res.filter((item) => item.taskId == res[i].taskParentId);
    if (list.length > 0) {
      const parent = list[0];
      parent.children = (parent.children || []).concat(res[i]);
    } else {
      newList.push(res[i]);
    }
  }
  setValue(newList);
  return newList;
};
```

---

来展开解析讲一讲树形结构增删改查

---

## theme: fancy

**本文提到**

问题描述：JS 处理树状结构的增删改查

解决方案：

1、新增节点

2、删除节点

3、修改节点

4、查找节点

> 问题描述：JS 处理树状结构的增删改查

>         最近在开发一个后台管理系统的权限管理模块，涉及到各种树状结构的数据处理逻辑，例如：增，删，改，查等；相比普通的数组结构数据，树状结构的处理就没有数组那么的直观，但是也没那么复杂，需要多一步——递归查找来对数据进行深度遍历操作，那么这里呢，博主也将开发过程中总结出来的方法分享给大家，一文带你吃透JS树装结构数据处理：

## 数据结构示例

```javascript
let data = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
];
```

解决方案：

## 1、新增节点

查找树装结构的指定节点，新增子节点，代码如下：

```javascript
const appendNodeInTree = (id, tree, obj) => {
  tree.forEach((ele) => {
    if (ele.id === id) {
      ele.children ? ele.children.push(obj) : (ele.children = [obj]);
    } else {
      if (ele.children) {
        appendNodeInTree(id, ele.children, obj);
      }
    }
  });
  return tree;
};
```

## 2、删除节点

查找树装结构的指定节点，删除节点，代码如下

```javascript
const removeNodeInTree = (treeList, id) => {
  // 通过id从数组（树结构）中移除元素
  if (!treeList || !treeList.length) {
    return;
  }
  for (let i = 0; i < treeList.length; i++) {
    if (treeList[i].id === id) {
      treeList.splice(i, 1);
      break;
    }
    removeNodeInTree(treeList[i].children, id);
  }
};
```

## 3、修改节点

递归查找并修改某个节点的状态，代码如下：

```javascript
const updateNodeInTree = (treeList, id, obj) => {
  if (!treeList || !treeList.length) {
    return;
  }
  for (let i = 0; i < treeList.length; i++) {
    if (treeList[i].id == id) {
      treeList[i] = obj;
      break;
    }
    updateNodeInTree(treeList[i].children, id, obj);
  }
};
```

## 4、查找节点

递归查找树形节点的某个节点，代码：

```javascript
const findNodeInTree = (data, key, callback) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key == key) {
      return callback(data[i], i, data);
    }
    if (data[i].children) {
      findNodeInTree(data[i].children, key, callback);
    }
  }
};

// 所查找到的节点要存储的方法
let Obj = {};
findNodeInTree(data, key, (item, index, arr) => {
  Obj = item;
});

// 此时就是Obj对应的要查找的节点
console.log(Obj);
```
