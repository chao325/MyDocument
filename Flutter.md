## Flutter介绍

> 没空写






### 随手记

> 主要是一些布局小技巧以及API 2022-4-18





内边距组件:
设置组件的内边距
	Padding(
		padding:EdgeInsets.all(n),
		child:组件
	)

水平组件:
子组件全都水平排列
	Row(
		mainAxisAlignment: MainAxisAlignment.spaceEvenly, 水平方向的布局方式,spaceEvenly元素与元素之间,首尾元素与父容器的距离均匀分配
        crossAxisAlignment: CrossAxisAlignment.center,  垂直方向布局方式
        children: <Widget>[...]    //Lisi<Widget>类型的容器
	)
	
垂直组件:
子组件全都垂直排列
内部不能放置ListView组件
	Column(
		mainAxisAlignment: MainAxisAlignment.spaceEvenly,  垂直方向的布局方式,spaceEvenly元素与元素之间,首尾元素与父容器的距离均匀分配
        crossAxisAlignment: CrossAxisAlignment.center,  水平方向布局方式
        children: <Widget>[...]    //Lisi<Widget>类型的容器
	)

自适应组件:
类似flex布局中设置flex的值使得元素按占比布局
	Expanded(
		flex:n,   子组件占父元素的比例
		child:组件
	)
	
自适应占据控件组件Spacer()
	可以用于Column等组件中,用于按照自适应组件的方式占据空间
		Spacer();   内部就是返回一个Expanded的SizedBox的空间布局
		Spacer(flex:n); 
