## 远程内网渗透

- 使用自带远程的话一般情况下，是只能连接局域网的的。如果要远程控制外网电脑，就需要把内网地址，映射到外网上。这就需要了内网穿透。不过这个不重要.... 话不多说，直接说操作流程。

## 控制端

我们控制端基本什么也不需要做，就打开远程控制。等待链接就好。

## 受控端

> 一定要设置电脑密码！！

内网穿透的工具有很多。我个人推荐使用`Natfrp`,进入[官网](https://openid.13a.com/) 这里需要注册一个账号，签到就能免费领几 GB 的流量。可以说是完全免费。

# SakuraFrp 启动器基本使用指南

## 安装启动器

登录账号，上方的`服务`列表---下载软件，直接选择他推荐的`启动器` 下载 Windows 版本即可。下载完成后，去网页上找到自己的密匙

![1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69be0c58aafb43bb923a41dae35cd682~tplv-k3u1fbpfcp-zoom-1.image)

选择  **启动器**，点击右侧下载按钮下载启动器安装程序：

![1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f8f83a2fe2344128d4516a8fe76291c~tplv-k3u1fbpfcp-zoom-1.image)

复制  **访问密钥**  到启动器，点击  **登录**：

![1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d0d5479c7cd454b9a071963e4aa0ba2~tplv-k3u1fbpfcp-zoom-1.image)

## 创建隧道

![1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b3e46a92a9d4e0f8e3abbadaf0caef6~tplv-k3u1fbpfcp-zoom-1.image)

这里的信息要注意了，IP 填写 `127.0.0.0` 或者 `127.0.0.1` 端口随便写，但是注意！不要填写常用端口，例如 443 80 8080 等，这里我们填写 6666

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c04d9ffa67c54abc8447e5024328cf4b~tplv-k3u1fbpfcp-watermark.image?)

### 端口问题

你填写了 6666 不出意外的话，就要出意外了。你并没有开启 6666 端口，所以。

控制面板----防火墙----高级设置(在左侧)---入站规则(左侧)---新建规则(右侧)

![2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d052c9a70b1f4b48b9f02b05609a9950~tplv-k3u1fbpfcp-watermark.image?)

这个时候，你选择的端口才有效果。

## 这里突然想起来...新增端口后，要删除隧道，重新创建一个！！！！

然后启动隧道，找到日志，查看软件返回的一个地址 和 IP，这两个随便你用。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/305865f9423a40a88b059ee34139847d~tplv-k3u1fbpfcp-watermark.image?)

## 控制端可能出现的问题

如果你远程，提示账号密码错误，你可以像下方编辑用户的时候，选择其他账户。账户的 名称和密码，就是你受控端的 用户名和密码。使用`ipconfig/all` 我记得是看不出来的，或者有误差。可以直接让受控端 使用`win`键 + `L`键。锁屏查看账户名。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48c4c594c43c4aa0ae593e4f7015eea5~tplv-k3u1fbpfcp-watermark.image?)
