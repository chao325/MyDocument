## Flutter

## Flutter 介绍

> 没空写

### 随手记

> 主要是一些布局小技巧以及 API 2022-4-18

内边距组件: 设置组件的内边距

```dart | pure
	Padding(
		padding:EdgeInsets.all(n),
		child:组件
	)
```

水平组件: 子组件全都水平排列

````dart | pure
	Row(
		mainAxisAlignment: MainAxisAlignment.spaceEvenly, 水平方向的布局方式,spaceEvenly元素与元素之间,首尾元素与父容器的距离均匀分配
        crossAxisAlignment: CrossAxisAlignment.center,  垂直方向布局方式
        children: <Widget>[...]    //Lisi<Widget>类型的容器
	)
	```
垂直组件:
子组件全都垂直排列
内部不能放置ListView组件

```dart | pure
	Column(
		mainAxisAlignment: MainAxisAlignment.spaceEvenly,  垂直方向的布局方式,spaceEvenly元素与元素之间,首尾元素与父容器的距离均匀分配
        crossAxisAlignment: CrossAxisAlignment.center,  水平方向布局方式
        children: <Widget>[...]    //Lisi<Widget>类型的容器
	)
````

自适应组件: 类似 flex 布局中设置 flex 的值使得元素按占比布局

```dart | pure
	Expanded(
		flex:n,   子组件占父元素的比例
		child:组件
	)
```

自适应占据控件组件 Spacer() 可以用于 Column 等组件中,用于按照自适应组件的方式占据空间 Spacer(); 内部就是返回一个 Expanded 的 SizedBox 的空间布局 Spacer(flex:n);

---

圆形

```dart | pure

   Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: Colors.white,
          width: 2,
        ),
      ),
   )

```

---

时间格式化

```dart | pure
import 'package:intl/intl.dart';
DateFormat inputFormat = DateFormat("yyyy-MM-dd HH:mm:ss");
DateTime dateTime = inputFormat.parse("18-08-2019 20:59:59");
DateFormat outputFormat = DateFormat("HH:mm:ss");
String dateInString = outputFormat.format(dateTime); //  20:59:59

```
