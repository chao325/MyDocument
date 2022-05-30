##  🚹 Steam挂卡工具ASF



# Steam介绍
 > <img src="https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/Black.jpg " width=250 > 



--------------

# ASF介绍
>ASF(ArchiSteamFarm)是由C#编写，能同时挂载多个 Steam 账号的挂卡工具。其不像 Idle Master 那样：同一时间只能为一个账号挂卡，需要后台运行 Steam 客户端，需启动额外进程模拟‘正在游戏’状态。ASF 不需要后台运行任何 Steam 客户端，不需要启动额外进程，而且能为不限数目的 Steam 账号同时挂卡。不仅如此，该软件还能在服务器和其他非桌面电脑上运行，并拥有完整支持 Mono 的特性，这能让其在 Windows、Linux 以及 OS X 等任何支持 Mon o的操作系统上运行。参考地址： https://github.com/JustArchi/ArchiSteamFarm


---------------------



点我跳转👇👇👇👇👇👇👇
## [Windows服务器/电脑 使用方法](#win)

## [Linux & CentOS服务器部署方法](#centos)








教程参考：https://cangshui.net/2431.html




-------------
##  config文件夹配置参数

  不管是Windows服务器/电脑，还是liunx(CentOS是Linux众多得发行版本之一) config配置方法内容都是一样的，所以我就合在一起写了。
  所以不必着急看这个，确定好你要使用哪一个系统版本的ASF也不妨再来看。



  首先我们去```https://justarchinet.github.io/ASF-WebConfigGenerator/#/bot ``` 这个机器人网站配置我们的Json文件。 


  ```
  "Name" //是机器人名字，随便写，但不能重复。
  "SteamLogin" //是你的Steam账号
  "SteamPassword" //是你的Steam密码 
  "SteamParentalCode" //无所谓，不用填 好像是家庭监护
  "Enabled" // 勾选上 选择 √
  
  下面几项是我们手动编辑Json文件
  "GamesPlayedWhileIdle": [你要挂的游戏账号ID],
  "CustomGamePlayedWhileFarming": "挂卡的时候显示内容",
  //然后把这个Json文件，放到你下载对应文件的config文件夹目录里。


  ```
  至于游戏ID 我们拿CS:GO来举例 ``` https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/ ```  URL里面的730 就是游戏ID。


----------------





!> 注意：所有安装包本文均为64位系统

## Windows服务器/电脑 使用方法  <a id="win"></a>

  个人觉得Windows使用方法是最简单最便捷的一种方式，缺点就是你关机了，你睡眠断网了，程序也就跟着停止了。

  我已经下载好了一份Windows系统版的ASF，截止到2021年12月28号 是最新版本 V5.2.0.10

  > 官方持续更新版本 ：https://github.com/JustArchiNET/ArchiSteamFarm/releases  我已经下好的版本：https://centosexe-1301565650.cos.ap-nanjing.myqcloud.com/ASF-win-x64.zip 

  官方GitHub偶尔抽风进不去的，可以用我下载好的。版本差别不是很大。

  下载好后。运行里面的 ArchiSteamFarm.exe。就可以了。 但是别忘记，运行前，你得保证你的电脑能访问Steam社区 仓库。例如使用某U加速器 或者免费好用的 steam工具——steamcommunity 302 ``` https://www.dogfight360.com/blog/686/ ```



----------

## Linux & CentOS服务器部署方法  <a id="centos"></a>

  Linux 部署就比较麻烦了（新人而言） 我乱七八糟搞了一下午，才勉强完事。如果专门挂ASF强烈建议买个Windows服务器啊！！！！即使ssh断连了，也不会停止运行。

  21/12/30 补充下Linux可以使用 nohup 后台挂起 断联了也没关系。就是Windows可视化界面高，不用搞什么后台运行。只要服务器不关闭，就行

  等会写，累了

  开始

  同样，Linux我也准备了一份。

  > 官方持续更新版本 ：https://github.com/JustArchiNET/ArchiSteamFarm/releases  我已经下好的版本：https://centosexe-1301565650.cos.ap-nanjing.myqcloud.com/ASF-linux-x64.zip


-------------

  ### Docker

首先安装docker ，这边我用 yum安装。yum安装自行百度，我也忘记我怎么装上的。要是用放到的东西写，估计写不完了。
  ```
    yum install docker
  ```

-----------

    

之后启动docker，命令为

    ```
    systemctl start docker
    service docker start
    ```
------------




接下来下载centos镜像

    ```
    docker pull centos
    ```
-----------



启动容器

    ```
    docker images
    ```
-----------




!>上面的ID很重要复制下来 然后输入


  ```
  docker run -it f1cb7c7d58b7(==这一串是上面让你复制的那个==)
  ```

依次输入以下命令（请以root身份进行接下来的操作，否则加sudo指令）基础指令

 ```
  yum update -y
  yum install unzip -y
  yum install wget -y
  yum install -y libunwind lttng-ust libcurl openssl-libs libuuid krb5-libs libicu zlib

 ```
  


### 安裝 .NET 环境

  ```
       sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc

      sudo sh -c 'echo -e "[packages-microsoft-com-prod]\nname=packages-microsoft-com-prod \nbaseurl=https://packages.microsoft.com/yumrepos/microsoft-rhel7.3-prod\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/dotnetdev.repo';

      yum update

      yum install libunwind libicu

      yum -y install dotnet-sdk-2.0.0

 ```


### 安装下载ASF

现在有两种方法，如果你买的服务器带宽较低，你可以下载我上面发的链接。然后通过宝塔面板，或者FTP 解压后上传到更目录。如果你全命令行操作看下面


```
mkdir ASF
cd ASF
//官方版本 V5.0  二选一
wget https://github.com/JustArchiNET/ArchiSteamFarm/releases/download/5.0.3.2/ASF-linux-x64.zip

//我下载的官方新版本 V5.2

wget https://centosexe-1301565650.cos.ap-nanjing.myqcloud.com/ASF-linux-x64.zip
```


---------

解压ASF并给与启动权限：

```
也可以自己解压，就忽略这一步

unzip ASF-linux-x64.zip 
chmod +x ArchiSteamFarm


```

!> 下面命令行配置ASF的Json文件，新手强烈建议手动配置！！通过宝塔或者FTP配置好上传到ASF的config文件夹里！！


```
vim ASF.json

//输入下面内容

{
  "CurrentCulture":"zh-CN",
}

```


然后配置自己的Json，就是我开头讲，让你们去机器人哪里配置的文件是一样的。我们可以手动放到ASF解压后的config然后上传到Linux服务器。 如果到这里还坚持用命令行操作，就继续吧


```
vim myasf.json（myasf可以自己起名）


{
“CustomGamePlayedWhileFarming”: “挂卡时显示正在进行的游戏”,
“CurrentCulture”:“zh-CN”,
" CustomGamePlayedWhileIdle": “挂游戏时间时显示正在进行的游戏”,
“SteamLogin”: “你的用户名”,
“SteamPassword”: “你的密码”,
“Enabled”: true,
“GamesPlayedWhileIdle”: []
}

```


## 配置Linux版Steam302软件

### ascf 文件解决社区进不去

这个我也下载好了，可以直接拿来用，也可以命令行操作（新人强烈建议用可视化界面，例如宝塔面板等...）

> ascf：https://centosexe-1301565650.cos.ap-nanjing.myqcloud.com/ascf 

手动用户直接在根目录创建ascf 文件夹 把解压文件放进去就行。 

命令行操作用户依次输入以下指令：

```
cd /
mkdir ascf
cd ascf

//这是官方的，老版本，不会失效，我上面放的连接不知道啥时候就失效了可能

//wget没有指定下载路径默认下载到当前页面

wget https://github.com/makazeu/AnotherSteamCommunityFix/releases/download/1.2.2/ascf_v1.2.2_Linux_x86.zip

```

### 启动ascf

```
cd /
cd ./ascf

//启动

./ascf


```


### 启动ASF


解压出来的ArchiSteamFarm文件默认是没有执行权限的，试图运行的时候会报 Permission Denied 错误，直接chmod +x ArchiSteamFarm提供运行程序

```
cd /

//到ASF文件夹根目录
cd ./xxx/xxx 

//启动

./ArchiSteamFarm

```

!>中间可能会出现很多很多问题，不用慌，慢慢来，我这个教程也就是配置基本的东西，能走通，但不一定能用，因为我现在还在调试。。至于 nuhp后台挂起 tmux分屏使用 ，这个自行Google吧。我是新手，第一次搞这个，太麻烦了，教程可能有很多很多很多很多很多错误的地方。