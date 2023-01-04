## 高度封装多选条目组件

### 【React/Vue2】 使用Element UI 高度封装Select 下拉框创建条目(Ant Design更为简单)


---
theme: fancy
---
> ## **个人笔记，如有错误请谅解。**

## 需求
所有需求大多数用于展示目的，真实值不被修改。
#### **主要需求**
1. 用户输入`正整数`例如 1-4 则自动选择option里的1，2，3，4。label展示为1-4 (数字连续要分开，例如 1，2，3   6，7，8)
2. 用户手动单击选择option里的1，2，3，4。label展示为1-4
3. 服务端返回[1，2，3，4]，label展示为1-4
4. 处理数据错误。例如用户输入非法字符或格式错误等`10-4、xx-3、好-我、1---3` 可选option只有1，2，4，6 结果用户输入1-7等...
5. 兼容程序。
6.  `回车`、`空格` 均作为确认快捷键。
7.  删除要做二次确认，和选中效果。
8.  用户输入快捷方式的时候，并不能影响到原option数据展示。

效果图

![1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6e8371272c94f75adc90d5322d88403~tplv-k3u1fbpfcp-watermark.image?)

`以下代码均做简化处理，只保留重要部分。`

先简单的理一下思路，我们只需要做到表面上的修改甚至可以直接使用jQuery来操纵真实dom。
用户输入，以及v-model的内容，我们都处理一遍就好了。对我个人来讲，v-model对这种需求并不友好。我还是喜欢
React /(ㄒoㄒ)/~~

----------------------

首先加载组件

```html
<!--oldOptions 是定义在date里的变量数据-->
<!-- Vue-->
   <el-select
        v-model="dataModel"
        allow-create
        default-first-option
        automatic-dropdown
        :multiple="true"
        :filterable="true"
        :fit-input-width="true"
        :filter-method="(value) => do_not_searchFillterData(value, oldOptions)"
        @change="(e)=>{selectValue_changle(this,e)}"
        @focus="init_input_keyup"
      >
        <el-option
          v-for="item in do_not_searchInit(formData.options.options)"
          :key="item.value"
          :value="item.value"
          :label="item.value"
        >
          
          <span>{{item.value }}</span>
        </el-option>
      </el-select>


<!--React-->
  <Select
     mode="tags"
     options={options}
     onChange={(e)=>{selectValue_changle(this,e)}}
     filterOption={(input, option) =>{do_not_searchInit(input,oldOptions)}}
     onFocus={init_input_keyup}
  />

```


就从上面结构代码来挨个挨个解释吧。
`multiple、filterable、default-first-option`必须为`true`这是创建条目，多选的必备属性。
`filter-method` 这个属性里我们使用了`do_not_searchFillterData`方法目的是解决`需求 8 用户输入快捷...`

下面方法很简单，既然不要影响`options`里的数据，那么我们直接不做处理，返回原数组就好了。

# do_not_searchInit

```js
    //----------【创建条目组件】解决下拉框展示当前输入内容，而不是可选值---------
    //Vue 
    do_not_searchInit(e) {
      this.oldOptions = e
      return e;
    }
    //React 
    const [oldOptions,setOldOptions]=useState([])
    const do_not_searchInit=(e)=>{
      setOldOptions(e)
      return e;
    }

```

------

`onChange` 这个我们需要处理的就比较多了，`解决需求 1、2、3、4、5` 因为这是我们功能的主要方法，完成了他，基本就写完了。

下面代码我们首先进行校验，使用正则表达式，让用户只能输入`正整数-正整数` 表达式为`/^([0-9]+-[0-9]+)$/` ，然后我们处理好其他校验后，进行数据处理，分为两种处理方式。

### 方式一、用户输入xx-xx
### 方式二、用户选择数字
我直接用最简单最笨的方法，使用`includes` 进行判断是否存在字符串`-` 如果存在，走方式一

然后把拿到的例如1-3 转换成1，2，3 `Array map结合起来使用` ，然后我们得数组[1,2,3] 别着急，我们还要进行一次数据处理，要把不连续的数组分开，排序，输出为`[[1,2,3],[7,8,9]]` 这个时候就通过我们的`sortArr`方法了。 

# selectValue_changle
```js
// Vue
data() {
  return {
    dataModel: [],
  }
selectValue_changle(el, val) {
  // console.log('入口---', val);
  //error：所选范围包含无效值 ↓
  //可选范围校验
  //假如可选数组为[1,4,5] 而用户输入1-4 解析出来就是[1,2,3,4]
  //通过 includes来校验 用户输入数值，通过可选数组校验后，是否含有不存在值。

  //error：数值大小有误 ↓
  //数值大小校验
  //例如：10-1  可选数值为1 用户输入 大于1的任何数等

  //error：数值表达式有误 ↓
  //基本的格式校验
  //通过正则匹配符合条件的格式
  //例如 Number-Number
  // val=$.trim(val.at(-1));

  if (this.formData.options.options.length >= 1) {
    // console.log('测试入口---', val);

    if (val.at(-1) > this.formData.options.options.at(-1).value) {
      console.error('数值大小有误')
      this.dataModel.length = this.dataModel.length - 1
      return;
    }
    if (val.length >= 1 && val.at(-1).toString().includes('-')) {
      // console.log('表达式入口---', val, val.at(-1).toString().includes('-'));
      //1-3 转换 1,2,3
      const newVal = val.at(-1).split('-')
      const start = parseInt(newVal[0]);
      const end = parseInt(newVal[1]);
      const regE = /^([0-9]+-[0-9]+)$/; //校验格式xx-xx
      const regES = new RegExp(regE);
      if (regES.test(val.at(-1)) && start < end) {
        const inveres = Array(end - start + 1).fill(0).map((v, i) => i + start)
        const visibleArraydata = []//可选数据
        for (let is = 0; is < this.formData.options.options.length; is++) {
          const item = this.formData.options.options[is];
          visibleArraydata.push(item.value)
        }
        if (inveres.filter(item => !visibleArraydata.includes(item)).length > 0) {
          console.error('所选范围包含无效值')
          this.dataModel.length = this.dataModel.length - 1
          return;
        }
        if (inveres[0] < this.formData.options.options[0].value) {
          console.error('数值大小有误')
          this.dataModel.length = this.dataModel.length - 1
          return;
        }
        if (inveres.at(-1) > this.formData.options.options.at(-1).value) {
          console.error('数值大小有误')
          this.dataModel.length = this.dataModel.length - 1
          return;
        } else {
          //
          if (this.dataModel.length === 0) {
            this.dataModel = []
          } else {
            this.dataModel.length = this.dataModel.length - 1
          }
          this.dataModel.push(...inveres)
          // this.create_dom_node(el, this.dataModel)

          this.create_dom_node(el, this.sortArr(this.dataModel))
        }
      } else {
        console.error('数值表达式有误')
        this.dataModel.length = this.dataModel.length - 1
        return;
      }
    } else {
      // console.log('选择入口---', val);

      this.create_dom_node(el, this.sortArr(val))
      // if (val.at(-1)> this.formData.options.options.at(-1).value) {
      //   openMsg(this, '数值大小有误', 'error')
      //   this.dataModel.length=this.dataModel.length-1
      //   return;
      // } else {

      // }
    }
  } else {
    console.error('数值大小有误')
    this.dataModel.length = this.dataModel.length - 1
    return;
  }
}

// React
  const [dataModel,setDataModel]=useState([])
  const selectValue_changle = (el, val) => {
    // console.log('入口---', val);
    //error：所选范围包含无效值 ↓
    //可选范围校验
    //假如可选数组为[1,4,5] 而用户输入1-4 解析出来就是[1,2,3,4]
    //通过 includes来校验 用户输入数值，通过可选数组校验后，是否含有不存在值。

    //error：数值大小有误 ↓
    //数值大小校验
    //例如：10-1  可选数值为1 用户输入 大于1的任何数等

    //error：数值表达式有误 ↓
    //基本的格式校验
    //通过正则匹配符合条件的格式
    //例如 Number-Number
    // val=$.trim(val.at(-1));

    if (formData.options.options.length >= 1) {
      // console.log('测试入口---', val);

      if (val.at(-1) > formData.options.options.at(-1).value) {
        console.error('数值大小有误')
        dataModel.length = dataModel.length - 1
        return;
      }
      if (val.length >= 1 && val.at(-1).toString().includes('-')) {
        // console.log('表达式入口---', val, val.at(-1).toString().includes('-'));
        //1-3 转换 1,2,3
        const newVal = val.at(-1).split('-')
        const start = parseInt(newVal[0]);
        const end = parseInt(newVal[1]);
        const regE = /^([0-9]+-[0-9]+)$/; //校验格式xx-xx
        const regES = new RegExp(regE);
        if (regES.test(val.at(-1)) && start < end) {
          const inveres = Array(end - start + 1).fill(0).map((v, i) => i + start)
          const visibleArraydata = []//可选数据
          for (let is = 0; is < formData.options.options.length; is++) {
            const item = formData.options.options[is];
            visibleArraydata.push(item.value)
          }
          if (inveres.filter(item => !visibleArraydata.includes(item)).length > 0) {
            console.error('所选范围包含无效值')
             setDataModel.length - 1
            return;
          }
          if (inveres[0] < formData.options.options[0].value) {
            console.error('数值大小有误')
             setDataModel.length - 1
            return;
          }
          if (inveres.at(-1) > formData.options.options.at(-1).value) {
            console.error('数值大小有误')
         setDataModel.length - 1
            return;
          } else {
            //
            if (dataModel.length === 0) {
              setDataModel([])
            } else {
             setDataModel.length - 1
            }
            setDataModel(...inveres)
            // create_dom_node(el, dataModel)

            create_dom_node(el, sortArr(dataModel))
          }
        } else {
          console.error('数值表达式有误')
          setDataModel.length - 1
          return;
        }
      } else {
        // console.log('选择入口---', val);

        create_dom_node(el, sortArr(val))
        // if (val.at(-1)> formData.options.options.at(-1).value) {
        //   openMsg(this, '数值大小有误', 'error')
        //   dataModel.length=dataModel.length-1
        //   return;
        // } else {

        // }
      }
    } else {
      console.error('数值大小有误')
      setDataModel.length - 1
      return;
    }
  }
  
```
---------


# sortArr 数据处理为 `[[1,2,3],[7,8,9]]`

这边把数据排序处理为指定格式，是为了方便我们后期使用,处理完成后，直接使用`create_dom_node(el, sortArr(dataModel))`方法 进行dom的绘制处理. (el 是上方的dom节点，this)

```js
// Vue
sortArr(res) {
  if (res.length >= 1) {
    //1,2,3 转换 1-3
    var arrays = []
    for (let i = 0; i < this.turnNum(res).length; i++) {
      const it = this.turnNum(res)[i]
      if (!isNaN(parseInt(it))) {
        arrays.push(parseInt(it))
      } else {
        console.error('数值格式有误')

        this.dataModel.length = this.dataModel.length - 1
        return;
      }
    }
    arrays = Array.from(new Set(arrays))
    const result = [];
    let i = 0;
    const list = arrays.sort((a, b) => a - b);
    list.forEach((item, index) => {
      if (index === 0) {
        result[0] = [item];
      } else if (item - list[index - 1] === 1) { // 判断当前值 和 前一个值是否相差1
        result[i].push(item);
      } else {
        result[++i] = [item]; // 开辟新空间。
      }
    })
    this.dataModel = Array.from(new Set(result.flat()))

    return result;
  }
}
// React

const sortArr = (res) => {
  if (res.length >= 1) {
    //1,2,3 转换 1-3
    let arrays = []
    for (let i = 0; i < this.turnNum(res).length; i++) {
      const it = this.turnNum(res)[i]
      if (!isNaN(parseInt(it))) {
        arrays.push(parseInt(it))
      } else {
        console.error('数值格式有误')

        setDataModel.length - 1
        return;
      }
    }
    arrays = Array.from(new Set(arrays))
    const result = [];
    let i = 0;
    const list = arrays.sort((a, b) => a - b);
    list.forEach((item, index) => {
      if (index === 0) {
        result[0] = [item];
      } else if (item - list[index - 1] === 1) { // 判断当前值 和 前一个值是否相差1
        result[i].push(item);
      } else {
        result[++i] = [item]; // 开辟新空间。
      }
    })
    setDataModel(Array.from(new Set(result.flat())))
    return result;
  }
}

```
--------

# 绘制DOM create_dom_node 

这边写的最多的无非就是 使用`jQuery`选中我要操作的节点，进行add增加标签而已。因为我的结构较多，所以写的就比较多。如图。




![2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd1f32858a4d42679422868592469ef3~tplv-k3u1fbpfcp-watermark.image?)





```js
//Vue
create_dom_node(el, vals, isDisplay) {
  // console.log('create_dom_node 拿到解析的值', vals);
  const visibleArraydata = []//可选数据
  for (let is = 0; is < this.formData.options.options.length; is++) {
    const item = this.formData.options.options[is];
    visibleArraydata.push(item.value)
  }
  if (vals) {
    if (vals.at(-1).filter(item => !visibleArraydata.includes(item)).length > 0 && !isDisplay) {
      // console.log(vals, '所选范围包含无效值')
      openMsg(this, '所选范围包含无效值', 'error')
      this.dataModel.length = this.dataModel.length - 1
      return;
    }

    const _this = this
    $(el.$el).find('.el-select__tags span').remove()
    for (let i = 0; i < vals.length; i++) {
      const item = vals[i];
      var tagStr = ''
      if (item.length > 1) {
        tagStr = item[0] + '-' + item[item.length - 1];
      } else {
        tagStr = item[0];
      }
      // this.dataModel=vals.flat()
      const ptag = '<span class="el-tag el-tag--info el-tag--mini el-tag--light"><span class="el-select__tags-text">' + tagStr + '</span> <i class="el-tag__close el-icon-close"></i> </span>';
      const spana = $('<span value="' + JSON.stringify(item) + '">' + ptag + '</span>');

      spana.find('i').click(function (e) {
        var span = $(this).parents('.el-tag--light').parents('span')
        if (span.length > 0) {
          var value = span.attr('value');
          $(this).parent().remove();
          _this.getNewDataModel(_this.dataModel, value)
        }
        e.stopPropagation();
        $(el.$el).find('.el-select__tags input').focus();
        return false;
      })
      $(el.$el).find('.el-select__tags').append(spana)
      $(el.$el).find('.el-select__tags input').appendTo($(el.$el).find('.el-select__tags'))
      if ($('.el-tag--light').length >= 2) {
        this.isDelete = true
      }
    }
  } else {
    $(el.$el).find('.el-select__tags span').remove()
  }
},
//React
const create_dom_node = (el, vals, isDisplay) => {
  // console.log('create_dom_node 拿到解析的值', vals);
  const visibleArraydata = []//可选数据
  for (let is = 0; is < formData.options.options.length; is++) {
    const item = formData.options.options[is];
    visibleArraydata.push(item.value)
  }
  if (vals) {
    if (vals.at(-1).filter(item => !visibleArraydata.includes(item)).length > 0 && !isDisplay) {
      // console.log(vals, '所选范围包含无效值')
      openMsg(this, '所选范围包含无效值', 'error')
      dataModel.length = dataModel.length - 1
      return;
    }

    $(el.$el).find('.el-select__tags span').remove()
    for (let i = 0; i < vals.length; i++) {
      const item = vals[i];
      var tagStr = ''
      if (item.length > 1) {
        tagStr = item[0] + '-' + item[item.length - 1];
      } else {
        tagStr = item[0];
      }
      // dataModel=vals.flat()
      const ptag = '<span class="el-tag el-tag--info el-tag--mini el-tag--light"><span class="el-select__tags-text">' + tagStr + '</span> <i class="el-tag__close el-icon-close"></i> </span>';
      const spana = $('<span value="' + JSON.stringify(item) + '">' + ptag + '</span>');

      spana.find('i').click(function (e) {
        var span = $(this).parents('.el-tag--light').parents('span')
        if (span.length > 0) {
          var value = span.attr('value');
          $(this).parent().remove();
          _getNewDataModel(_dataModel, value)
        }
        e.stopPropagation();
        $(el.$el).find('.el-select__tags input').focus();
        return false;
      })
      $(el.$el).find('.el-select__tags').append(spana)
      $(el.$el).find('.el-select__tags input').appendTo($(el.$el).find('.el-select__tags'))

    }
  } else {
    $(el.$el).find('.el-select__tags span').remove()
  }
},

```

End
