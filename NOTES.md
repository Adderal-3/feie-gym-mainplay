# 本地运行实现说明

## 当前来源与启动

当前运行源为 `recovered/reference623/client/subpackages/main/game.js`，来自独立 6.2.3 快照。根目录 `client/`、`readable/` 与旧配置保留早期恢复结果，不能混作当前 AB14 的流程依据。

服务只在原外层闭包已记录的位置插入符号导出。`original/runtime-layout.json` 保存源 SHA-256、UTF-16 长度与偏移，启动时核对；服务测试移除导出后比较原始字节。定位工具使用 Acorn，运行服务只依赖 Node 内置模块。重建时显式指定：

```sh
node tools/build-original-layout.mjs recovered/reference623/client/subpackages/main/game.js
```

入口运行原 AppEngine、时钟、ScreenNavigator/WindowNavigator 子类、遮罩、转场及 HomeScreen/GameWorld 生命周期，不执行原微信 SDK 登录链。Canvas 几何取自原场景，主线子组件保留原 Prefab 启用状态。

## 标准剧情与本地角色

`story-profile.js` 构建本地原模型：createVersion 14、主棋盘配置 100、抽屉 996、首单 1001。`story-flow.js` 调用原 Main 方法与标准 Z7 路径 `setDirectMode(false)`、`prepareIfNeeded/startIfNeeded`，走 PlayableBoard_14 的 991/992 对白与 Board9000 救火，再由原 c9/d9 接管 Board_14、Build1_13。不调用旧 2001 路线，不手动推进引导，也没有另画剧情棋盘。

AB14 是用户确认标准序章后的本地选择，不是恢复出的服务器分流结果。初始金币 0、钻石 20 依据参考工具箱里程碑余额及原 Coin50 奖励推断，体力设为 100；服务器新号响应、随机种子和完整初始经济尚未恢复。具体证据和限制见 `story-profile.js` 的 evidence。

## 结算与恢复

`local-backend.js` 接收原请求。已经预测的移动、合成、产出和渠道领取保留原格子、Map 与恢复器，不重复扣体力或发奖励。订单按原需求验证；装修、升级调用原 q6 的 AB 覆盖解析，不硬写基础表奖励。订单和装修解锁调用原条件函数；`ordered=false` 表示已获取未完成，`true` 表示完成，原事件仍由原客户端发出。

存档保留原模型、Map、日期、字节标记和计时数据。恢复先得到协议模型 el，格子挂载时再由 `G2.convertRecovery` 构建原运行恢复器，避免过早注册时钟或把运行对象替换成普通对象。

正式存档键为 `feie-gym-original-story623-v1`，调试 profile 使用独立后缀。旧 `feie-gym-original-local-v2` 和更早开发档保留，但不自动迁移到新剧情，避免把另一分支的步骤与订单混入当前参考路线。标准剧情关键步保护和旧错误标记处理由后端测试覆盖。

原引导只保存完成的 keyStep。Build1_13 的 9913205 不是关键步；刷新时原 d9/o8 可从上一关键步进入 9913206。`MQ.cachedRewards` 是内存状态，刷新继续不等于已播放升级奖励弹窗，也不应重发升级或伪造条件。

商店使用原 wl/rl 模型和 Shop/ShopColumn/ShopAB 配置，选品明确标记为 `LOCAL_CONFIG_CATALOG_RECONSTRUCTION`。本地仅从已解锁、固定单一虚拟货币价格的原行按ID选取货架；购买检查原库存、递增价格和原AB价格上限，手动刷新按原虚拟货币费用结算。原服务器随机选品、混合/随机价格和自动刷新截止时间未恢复，不能将固定目录与原随机货架等同。`getShopEvidence()` 可查看选择方式。原生手动浏览、一次购买、渠道入盘和重载后余额/库存已验证；Shop_13引导曾中断，商店手动刷新交易仍未原生验收。

未知命令明确失败。运营、支付、社交业务未实现；imgbox/card 已按本地原模型接入只读查询，其原生验收单独记录，不据此生成额外所有权或经济奖励。

## 资源与验证

原压缩纹理保留，另解码成本地 PNG 交给原 Cocos 图像链；仅这条兼容链设置 RGBA 上传格式，SpriteFrame、Prefab、Spine 与动画仍来自原文件。跨 bundle 别名只匹配已知清单中的完整 UUID、版本与摘要，运行时没有在线兜底。

剧情、奖励飞行效果和装修会动态拼资源路径。审计需结合当前 AB 奖励及 Adron/AdronSkin 配置，不能将入口 Prefab 依赖闭合解释成全部主线素材完整。当前范围和数量见 [资产报告](docs/original-assets-acceptance.json) 与 [依赖图](docs/original-mainplay-dependencies.json)。

`npm run verify` 独立校验 reference623 的包文件、client 来源切片、当前 BON 源与解码表、可读脚本的静态格式化来源、AST 和运行注入位置。可读文件没有单独声明的来源哈希，报告如实保留实测哈希与格式化对照；未保存的加密包档案不冒称已校验。

`npm run test:original` 运行全部 `tests/original-*.test.mjs`，统计以当次输出为准。[LOCAL_RUNTIME.md](docs/LOCAL_RUNTIME.md) 记录真实输入与待测事项。旧 2001–2020 验证属于早期另一分支，不证明当前参考剧情一致。

早期等级2升级曾因奖励飞行资源缺失中断，刷新由原关键步恢复；该事实保留。之后同一QA进度通过订单1004/1005和装修10003升至3级，原LevelUpRewardWindow1321的Spine、动画与1004×1奖励完整显示并实际点击领取；原地板100301编辑确认完成，升级时等级3、余经验10、金币125、钻石20。

该路线已知缺失资源补齐后的独立final-route新档，另行从9914001、三轮救火、995尾声连续走到Board100订单1001/1002、Build10001与adornedit，全程无reload或改档。原等级2升级窗口完整显示Spine、数字2与1004×1，点击继续自然从9913205进入9913206；等级2、余经验5、金币50、钻石20。[当前完整截图](docs/original-story-level-up.png) 对应这次等级2连续补测，不能作为历史等级3的截图。

此新档继续无reload完成渠道1004、合成1005、原FirstMergeWindow1153说明与确认、1005首产1201、1202/1203合成和订单1003交付，获得1星，[工具箱完整截图](docs/original-story-toolbox.png)对应此过程。升级窗口及后续原链未阻断；修复前曾有活动刷新查询未接入提示。随后按原Mp/ql模型补齐本地活动只读响应并通过自动测试，未生成活动或奖励；修后新升级调用还未再做原生重跑，不能把修复前的这轮记为零提示。

在上述历史等级3进度中，原ShopWindow1009手动购买商品2001一次，金币125→122、库存5→4；购买的1101和等级3奖励1004均由原渠道入盘。最终重载保持等级3、余经验10、金币122、钻石20，棋盘的1101/1004/1006、空渠道、墙纸地板与商品剩余4次均保存，重新打开商店未重复扣费，诊断缺失列表为空且没有新404。[商店截图](docs/original-story-shop.png) 对应此原生窗口。以上验证不覆盖曾因缺资源中断的完整Shop引导、商店手动刷新交易或全部后续流程。

交付前重新保存了完整无debug的[默认序章](docs/original-story-opening.png)、[等级3棋盘](docs/original-story-board.png)和[商店](docs/original-story-shop.png)截图，再次确认商品2001剩4次、金币122。默认入口最终停在9914001开头，独立QA存档保留等级3进度；两者不混作同一次连续游玩记录。

[STATIC_AUDIT.md](docs/STATIC_AUDIT.md) 记录最初静态检查时点；其中“未执行游戏脚本”不描述后续本地运行。本地入口执行脱敏原客户端，浏览器连接限制为同源。[原创服装坊方案](docs/TAILOR_SHOP_PLAN.md) 尚未应用，原版与改编的工程、素材和存档边界分别保留。
