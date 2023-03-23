## Python 多线程实战

先暂时写下来吧。因项目需求，被迫学习 Python。主要是爬取某网站的搜索结果。然后提取某些信息。

> 阅读须知： 新手总结 错误颇多 请勿较真 欢迎指出

> 阅读须知： 新手总结 错误颇多 请勿较真 欢迎指出

> 阅读须知： 新手总结 错误颇多 请勿较真 欢迎指出

---

因为涉及数据量大，词库多，不得已使用多线程搜索，先看成果吧。

![微信图片_20230321174356.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99e1d24b459241089d9fece70021746d~tplv-k3u1fbpfcp-watermark.image?)

用时`4.12`秒的程序是`单线程`，搜索了 1 个词，2 页内容。

用时`5.3`秒的程序是`多线程`，搜索了 6 个词，每个词 2 页内容。

提升了至少 480%的效率吧。接下来简单分析下代码。

Python 提供了多种 模块 用来支持多线程编程 ， 其中就包含`queue`和`threading` 两个区别我就不过多介绍，我也是新手，没看太多资料。我这里用的是后者。

### 词库

首先我们定义一个数组，也可以是后端的词库。

```Python
data_list  = ['汽车', '小说', '罗马是什么',' 游标对象','花开花落英文单词是什么','关于 db conference 的含义']
```

### 单个查询处理

这个时候继续下一步，定义函数用于处理每个查询。

```Python
# 定义函数用于处理每个查询
def process_query(query):
    # 在这里放置您的代码，用于处理每个查询
    #......
    pass
```

上面放置单线程写的代码即可。

### 执行查询

```Python
# 定义函数用于执行查询
def run_queries(query_list):
    threads = []
    for query in query_list:
        thread = threading.Thread(target=process_query, args=(query,))
        threads.append(thread)
        thread.start()

    # 等待所有线程完成
    for thread in threads:
        thread.join()

# 执行查询
run_queries(data_list)

```

这样一个最简单的多线程就做好了。后期需要改的地方也很多，这只是便于新手理解的方案。如果使用`Queue`的话，针对大数据量查询是很占优势的，不过他所使用的时间大部分都用于推出线程上了。

最后可以通过 以下代码，把它们分别放到代码头部和尾部进行计算时间。

```Python
import time
start_time = time.time()


end_time = time.time()
print("爬取时间为：{}秒".format(end_time - start_time))


```
