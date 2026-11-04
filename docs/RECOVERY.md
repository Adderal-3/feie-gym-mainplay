# 恢复范围与本地适配的分界

## 文件层次

| 路径 | 内容 |
| --- | --- |
| recovered/packages/ | 两个缓存包展开后的原编译产物；一项 SDK 密钥值已脱敏 |
| recovered/manifest.json | 导出大小、原始摘要、交付摘要和脱敏记录 |
| client/ | 静态拆开 define(path, factory) 后恢复的客户端模块布局 |
| readable/ | 完整格式化脚本、模块索引和共享闭包中的主玩法分析片段 |
| recovered/remote/ | 原缓存资源，按 CDN 相对路径恢复 |
| recovered/downloads/ | 后补的原静态资源、来源和 SHA-256 清单 |
| recovered/config/ | BON 解码后的 659 张玩法表和 254 张中文表 |
| recovered/previews/ | 原纹理的 PNG 解码结果、具名图块、裁切参数与预览图集 |
| original/ | 运行兼容、本地会话、结算和原引导/主页的接入代码 |
| tools/、tests/ | 恢复、校验、启动工具及本地适配测试 |

## 仍由原客户端执行的部分

本地入口运行恢复的原 Cocos 引擎和原游戏脚本，加载原 Prefab。主棋盘没有由另一套 DOM、Canvas 绘制器或简化合成引擎替代。

| 环节 | 原符号或方法 | 可读分析文件 |
| --- | --- | --- |
| 棋盘与格子配置转换 | GW.ParseBoardConfig、ParseCellConfig | BoardConfigParser.js |
| 棋盘、移动与缓存 | M2 / G2、SwitchElement 等 | BoardController.js |
| 原触摸开始、移动、结束和取消 | B9 / D9 / P9 / qqe | TouchStart/Move/End/Cancel.js |
| 合成条件、邻格解锁 | G$.IsElementCanMerge、UnlockAroundCells | BoardRules.js |
| 合成和物品行为 | CommonElement.onMerge | CommonElement.js |
| 点击产出、体力和冷却 | ManuCreatorElement.onClickElement | ManuCreatorElement.js |
| 产物生成 | TJ.CreateNewElements、CellProductCheck | BoardProducts.js |
| 订单检查和提交 | b2、OrderItem.onClickFinish | OrderState.js、OrderItem.js |
| 背包放入和恢复 | 原 Bag/Closet 逻辑 | BagElement.js 等 |
| 窗口、转场和引导 | 原导航器、SwitchWindow、Guider 与 GuideStep | 完整格式化脚本 |

`Board.json["1"].element` 是 9 行 7 列的原始布局。状态是位掩码：web=1、box=2，所以状态 3 表示箱子与蛛网同时存在；解开箱子后可能仍留下蛛网。合成判定还包括系列、等级、mergeElementId、冷却、气泡和产出器状态等条件，不只是比较图标相同。

初始化数据来自原配置，不读取用户原微信账户的进度或登录态。初始资源、订单与引导会话在本地建立；它们不等于原账号当前的在线存档。

## 新增的兼容与结算

原微信容器、SDK、服务器响应和编辑器启动场景无法原样在普通浏览器中获得。本次新增的代码补足这些运行依赖：

1. 用原主场景中的 Canvas 位置 (375,667)、设计尺寸 750×1334 与适配设置对齐渲染和触摸坐标。
2. 按原启动约定加载内部资源、原 AppEngine、ScreenNavigator/WindowNavigator、遮罩、转场、原 UI 及引导；先完整进入原主页以建立共享装修/外观注册表，再恢复棋盘，不伪造“引导已完成”的标志跳过原操作。
3. 将 ASTC 纹理在本地解码成 PNG，通过原 Cocos 图片加载/解析流程创建 RGBA 纹理。原图块、裁切、旋转、锚点和动画仍使用原资产数据。
4. 在原脚本闭包末尾加入桥接导出，以便本地初始化原模型和传输接口。移除这段导出后，响应脚本与仓库中恢复的客户端脚本保持一致，测试会核对 SHA。
5. 原请求改由本地适配器接收。客户端已经预测的格子操作保留原对象与计时器；订单、装修和升级使用已接入的原配置及客户端判定结算，写入本地存档。

本地适配不是原服务器的反编译版本。未知指令明确报错，不虚构成功响应；不能由现有缓存证明的隐藏校验、服务端随机种子、AB 策略和经济规则不作一致性承诺。

## 素材与依赖覆盖

普通 A–I 合成链配置声明的 347 个 SpriteFrame 已覆盖。运行时需要的原界面、原物品 Prefab、层动画、Spine、地图、弹窗、引导与声音另按依赖补齐：

- 原始缓存与补取资源分别保留，下载来源和字节摘要可检查。
- .pvr 文件按真实文件头识别；本项目这些压缩纹理为 ASTC，不按扩展名误当作 PVRTC。
- 原生文件的跨 bundle 引用可用完整文件名及版本摘要回退到已知本地清单；同名不同摘要不作猜测匹配。
- docs/original-mainplay-dependencies.json 记录当前入口闭包、缺失资源及未解析引用。动态窗口必须加入入口后再计算，不能以“主棋盘无缺图”推断所有弹窗都已覆盖。
- sprites.json.missing 仍记录选定范围以外的活动、扩展场景等引用，没有伪造素材补齐全游戏。

实时数量可能随补齐入口变化，应以对应 JSON 清单为准。原 Spine 二进制、字体和音频保留为原格式；没有声称恢复原美术工程。

本次最终 [资产验收](original-assets-acceptance.json) 覆盖 2,171 个入口、4,087 项资产定义、1,733 项原生资源与 1,554 张所需解码 PNG；原 TC 动画 167/167 项均已闭合，缺失资源、未解析引用和检查问题均为零。该范围包含当前主玩法及所接入窗口，不包含全部运营内容。

## 缓存中没有的内容

缓存没有原始 TypeScript、源码注释、原始项目目录、编辑器 scene/prefab 工程文件或服务器数据库。恢复的编译资源中仍保有 Prefab/场景的序列化数据，因此可以由原引擎加载，但这不等于找回了编辑器工程。

未缓存的 miniGame、多个 playable_* 分包和未纳入本地运行范围的活动、支付、社交、排行榜、插件业务也没有因此完整恢复。client/layout-index.json 保留最初重建时的缺包记录。

背包保留原客户端和 5 级解锁配置，但本轮未完成其原生操作验收。imgbox_show 外观拥有查询仍返回未实现；不将这类未知服务端响应推定为原线上结果。

## 校验与敏感信息

原缓存文件和后补文件均记录大小、SHA-256。SDK 密钥值使用同长度标记替换，originalSha256 与交付 sha256 分别保留；本地原文备份没有纳入仓库。

静态导出、配置解码与纹理转换工具不执行游戏脚本。本地试玩入口则会执行经脱敏的原编译客户端。两者的验证范围分开记录，不能把静态恢复成功或单元测试通过等同于全游戏原生操作验收。

[STATIC_AUDIT.md](STATIC_AUDIT.md) 记录最初仅静态读取阶段的敏感信息检查，其“没有执行游戏脚本”描述适用于当时范围，不包含后来新增的本地运行。原完整客户端在脱敏恢复后未为本地玩法改写；运行服务仅注入桥接导出，测试移除导出后核对源脚本 SHA-256。

本轮自动化测试 28/28 通过；静态恢复检查通过 7,228 个文件摘要、4,018 张 PNG 与 114 个脚本解析。原生输入验收另记录于 [LOCAL_RUNTIME.md](LOCAL_RUNTIME.md#原生输入验收记录)，已包含原 2001–2020、首次装修/升级及重载继续游玩；未声称全游戏或像素级一致性已验证。
