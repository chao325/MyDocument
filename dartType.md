# Dart几个比较重要的概念
> StatefulWidget  有状态 - 常用可以管理子控件刷新
> StatelessWidget 无状态 - 不需要管理子控件状态刷新
> AndroidStudio有语法糖，有状态stful，无状态stless。拼写即可






----------------------------------
## Java类型转Dart示例

### 转换之前Java

 > <img src="https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/dart2.png " width=400 > 


### 转换之后Dart

 > <img src="https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/dart1.png" width=400 > 





### `下面是几个基本的不统一类型`

| Java        | Dart        |
| :---        |    :----:   |
| Float(单精度浮点型) | Double(浮点型)       |
| Integer(整型)   | Int(整型) |
| boolean(布尔值)   | bool(布尔值) |



### 上图替换的类型

我把原类型 `List<TaExtendContent>` ,`List<TaImages>` ，替换成了 Dart里面的  `List<dynamic>`,这种属于混合型列表，包含多种类型。