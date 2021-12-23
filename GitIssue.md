# 记录问题 解决问题

---------------

!>仅仅记录我遇到的问题及解决办法，有很大的局限性，单个问题可能有多种解决办法，仅供参考。


### Git 443：Timed out超时问题

代码通过 git commit -m “fix” 暂存到本地后使用 git push 推送到远程仓库后出现 fatal: unable to access '你的git地址': Failed to connect to github.com port 443: Timed out

参考办法：


一、需要先查看自己本地的host文件里有没有关于GitHub的内容，有的话全部删掉
    ```
    C:\Windows\System32\drivers\etc
    ```

---------------


二、进入项目的本地仓库目录下，右键Git Bash Here进入控制台，分别执行以下两个命令：
   ```
    git config --global --unset http.proxy
   ```
   ```
     git config --global --unset https.proxy
   ```

---------------


三、进入本地的host(进入方法第一条)添加以下参数：
   ```
    192.30.255.112 github.com git
    185.31.16.184 github.global.ssl.fastly.net
   ```
最后打开CMD命令窗口输入 `ipconfig /flushdns` 刷新一下DNS缓存。

![git步骤](https://zcsuper-image-1301565650.cos.ap-nanjing.myqcloud.com/MyWordPhotos/git.png)

