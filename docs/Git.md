## Git 的基本使用

# Git & GitHub 速览

> Git 中文名：开源的分布式版本控制系统,可以有效、高速地处理从很小到非常大的项目版本管理。

> GitHub 是一个基于 Git 实现的在线代码仓库，是目前全球最大的代码托管平台，可以帮助 Ctrl CV 员之间互相交流和学习。

## 他们俩的区别

### Git

他是一个版本管理工具，是可以在你电脑不联网的情况下，只在本地使用的一个版本管理工具，其作用就是可以让你更好的管理你的程序，比如你原来提交过的内容，以后虽然修改了，但是通过 git 这个工具，可以把你原来提交的内容重现出来，这样对于你后来才意识到的一些错误的更改，可以进行还原。

---

### GitHub

而 GitHub 是一个网站，就是每个程序员自己写的程序，可以在 github 上建立一个网上的仓库，你每次提交的时候可以把代码提交到网上，这样你的每次提交，别人也都可以看到你的代码，同时别人也可以帮你修改你的代码

总结下 Git 可以说是一个软件。而 GitHub 更像是一个论坛、社区

## 安装使用

> Git 的安装比较简单。参考地址：https://git-scm.com/

GitHub 国内是可以访问的，偶尔出现连接不通问题，可以使用 VPN

VPN：https://freemycloud.net/

注册创建仓库可以参考[GitHub 注册+创建仓库](https://blog.csdn.net/zhizhengguan/article/details/87606970)。

---

## 如何把本地文件夹上传到新的 Git 仓库

打开文件夹进入项目的根目录然后再地址栏输入 cmd 回车 这样就打开了当前目录的 CMD

```
git init //初始化文件夹 勾选显示隐藏文件 你就能看见.git文件夹
git add .  //一定要注意这个点  这是暂存已修改文件
git commit -m “提交内容”  // 这是把文件放到本地仓库
git remote add origin 这边写你的仓库地址一般是 .git 结尾  //绑定仓库
git push -u origin master // 推送到远程仓库 默认名字是 master 如果改名字，将会自动创建一个分支。

```

以后如果这个仓库有修改内容就直接输入

```
git pull //拉最新代码 （团队试用）

git add .
git commit -m "本次修改内容"
git push

```

> Tip：如果你想单独上传一个文件可以使用 `git add xxx.js`

## 代码如何回滚

!> 注意：此方法只适用于菜狗本人。目前未发现任何对代码的不良影响。

已经 push 上去的代码！发现有错误，不想留下瑕疵。或者 push 错分支了怎么办。只能回滚咯.

---

### 找到所需版本

首先我们需要找到你想要回滚的版本号，可打开你的 git 提交记录，或者在命令行输入`git log` (顺序一般是从初始版本开始展示) 。

结构代码类似如下：

```javascript | pure | pure
commit b69a4ced352ec9d5bd9dbf0036a052f9812854fb (HEAD -> master, origin/master)
Author: zhuhualong <zhuhualong@beyondcent.com>
Date:   Thu Oct 12 18:29:53 2017 +0800

    新增了xxx页面

commit eb3378a32d36c03825e444002e541a2d12af274c
Author: yangze <yangze@beyongcent.com>
Date:   Wed Oct 11 10:01:05 2017 +0800

    这是commit提交说明

commit bd2a381042868a331730ba549065ed8aaba817e9
Merge: 5c4a2ff f0d82fa
Author: yangze <yangze@beyongcent.com>
Date:   Wed Oct 11 10:00:18 2017 +0800

    解决了xxxbug

commit f0d82fa46a818525cf042a157e0fc889e0c813f6
Author: wangxi@beyondcent.com <wangxi@beyondcent.com>
Date:   Tue Oct 10 20:48:56 2017 +0800
```

然后我们几下 commit 前面的一长串版本号。一般只需要用到，前四位。假如我们要回滚到`新增了xxx页面` 那么他的版本号就是`b69a4`

---

### 撤销之前提交

然后输入命令:

```javascript | pure
git reset --hard b69a4
```

继续键入：

```javascript | pure
 git push origin master
```

git 本地回退到指定版本后，按以往的提交顺序进行提交时会出现这个问题:

```javascript | pure
Username for 'http://xxxx': lbp
To http://xxxx/cop2/cop_task.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'http://xxxx/cop2/cop_task.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

同时你也会看见 VScode 左下角有几个最新代码需要 pull。这是因为 gitlab 已经在你提交历史前面了，你无法把 push 过的再次 push 进行覆盖，这个时候加个参数–force 就行。

```javascript | pure
 git push origin master --force
 //这样就大功告成了。
```
