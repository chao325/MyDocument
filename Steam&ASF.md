# Steam介绍
> ![爬啊]](https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/Black.jpg)


--------------

# ASF介绍
>ASF(ArchiSteamFarm)是由C#编写，能同时挂载多个 Steam 账号的挂卡工具。其不像 Idle Master 那样：同一时间只能为一个账号挂卡，需要后台运行 Steam 客户端，需启动额外进程模拟‘正在游戏’状态。ASF 不需要后台运行任何 Steam 客户端，不需要启动额外进程，而且能为不限数目的 Steam 账号同时挂卡。不仅如此，该软件还能在服务器和其他非桌面电脑上运行，并拥有完整支持 Mono 的特性，这能让其在 Windows、Linux 以及 OS X 等任何支持 Mon o的操作系统上运行。参考地址： https://github.com/JustArchi/ArchiSteamFarm

---------------------

点我跳转👇👇👇👇👇👇👇
## [Windows服务器/电脑 使用方法](#win)

## [Linux & CentOS服务器部署方法](#centos)



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




## Windows服务器/电脑 使用方法  <a id="win"></a>

  个人觉得Windows使用方法是最简单最便捷的一种方式，缺点就是你关机了，你睡眠断网了，程序也就跟着停止了。

  我已经下载好了一份Windows系统版的ASF，截止到2021年12月28号 是最新版本 V5.2.0.10

  > 官方持续更新版本 ：https://github.com/JustArchiNET/ArchiSteamFarm/releases  我已经下好的版本：https://centosexe-1301565650.cos.ap-nanjing.myqcloud.com/ASF-win-x64.zip 

  官方GitHub偶尔抽风进不去的，可以用我下载好的。版本差别不是很大。

  下载好后。运行里面的 ArchiSteamFarm.exe。就可以了。 但是别忘记，运行前，你得保证你的电脑能访问Steam社区 仓库。例如使用某U加速器 或者免费好用的 steam工具——steamcommunity 302 ``` https://www.dogfight360.com/blog/686/ ```



----------

## Linux & CentOS服务器部署方法  <a id="centos"></a>

  Linux 部署就比较麻烦了（新人而言） 我乱七八糟搞了一下午，才勉强完事。如果专门挂ASF强烈建议买个Windows服务器啊！！！！即使ssh断连了，也不会停止运行。

  等会写，累了


