
上一个农机列表布局有一些小问题。本文档就是记录下自己不熟悉不会的东西。页面写多了，自然就懂了（复杂页面除外）不敢说精通，最起码能画出来相似效果。简单页面就不在这里记录了。

## 简介
这个是一个`上拉加载，下拉刷新`的列表。本来是想自己写的，但是遇到很多难题，时间不太够。还是选择使用第三方组件 [flutter_easyrefresh](https://pub.dev/packages/flutter_easyrefresh) 组件只是提供了刷新加载的功能和UI，至于一次几页，一页多少条这个自己定义。 使用非常简单，单纯记一下语法。

### 引入方法

在`pubspec.yaml`文件里面添加如下代码，然后执行 Pub get。
```yaml
flutter_easyrefresh: ^0.0.0 #版本请移步上述地址。懒人可用2.2.1
```
***


### 页面使用

创建一个Dart文件，创建一个`StatefulWidget `类。import插件
```dart
import 'package:flutter_easyrefresh/easy_refresh.dart';

```

然后实例化一个`_controller`用来触发刷新和加载动作。
```data
  EasyRefreshController _controller = EasyRefreshController();

```

剩下就是自由发挥的地方了。根据业务需求来写，我这边只简单的用到了刷新加载，所以我定义俩数组和其余参数就可以。代码如下：
```dart
  final jobList = Rx<List<Job>>([]);
  final newJobList = Rx<List<Job>>([]);
  var pageIndex = 1; //页数
  var count = 10; //每页10条
  late  int maxSum;//最多条数
  Map<String, dynamic> map = {'pageNum': 1};

  void getNewData() {
    pageIndex = 1;
    map['pageNum'] = pageIndex;
    requestXXXX(map).then((value) {
      maxSum=value['total'];
      List<Job> list = [];
      value['records'].forEach((item) {
        list.add(Job.fromJson(item));
      });
      jobList(list);
      newJobList(list);//首次获取刷新，我把最新的数据拿出去，等待加载的时候合并。
    });
  }

  void getMoreData() {
    pageIndex++;
    map['pageNum'] = pageIndex;
    requestXXXX(map).then((value) {
      maxSum=value['total'];
      List<Job> list = [];
      List<Job> Newlist = [];
      value['records'].forEach((item) {
        list.add(Job.fromJson(item));
      });
      newJobList.value.addAll(list);//拿到加载的数据，和我之前第一次刷新的数据合并下。
      Newlist.addAll(newJobList.value);//存放到局部变量。
      jobList(Newlist);//这里用的是GTEX 要覆盖整个数组，才能触发widget的Obx刷新。

    });
  }

  int _count = 0;

```


### Widge里使用

这里建议先看一下官方文档的使用教程，他有三种方法，我这个是比较基础的。写的有点乱。对着官网写法看，会比较容易些。

官方写法：
```dart
 // 方式一
  EasyRefresh(
    child: ScrollView(),
    onRefresh: () async{
      ....
    },
    onLoad: () async {
      ....
    },
  )

```
***

我的写法：

```dart
EasyRefresh(
        controller: _controller,
        firstRefresh: true,
        onRefresh: () async {
          await Future.delayed(Duration(seconds: 2), () {
            print("下拉刷新-----");
            getNewData();
            _count = jobList.value.length;
            print("最新条数" + _count.toString());
            _controller.resetLoadState();
          });
        },
        onLoad: () async {
          await Future.delayed(Duration(seconds: 2), () {
            print("上拉加载-----");
            getMoreData();
            _count = jobList.value.length;
            print("加载更多条数" + _count.toString());

            _controller.finishLoad(noMore: _count >= maxSum); //这是用来防止多次上拉加载的。
          });
        },
        child: Obx(
          () => Column(
              children: 这里直接map你的数据。
              ),
        ));

```

> 关于国际化的问题，官方原话：不提供自带国际化支持，请自行设置ClassicalHeader和ClassicalFooter中需要展示的文字。