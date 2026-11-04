# 本地运行实现说明

## 保留原客户端

client/subpackages/main/game.js 仍是恢复并脱敏的原编译脚本。服务只在已记录的外层闭包末尾加入符号导出，供会话和原传输适配使用。original/runtime-layout.json 记录完整源 SHA-256、UTF-16 长度与插入位置；每次启动校验，测试会移除注入段再比较原脚本摘要。

定位布局的开发工具使用 Acorn，但运行服务不使用第三方库、不执行 npm 安装。改变原脚本后应重新生成布局并复验，不使用宽松字符串猜测替换。

## 按原启动顺序初始化

本地入口不执行微信 SDK 登录链。它加载原引擎与类定义，先预载原内部材质/资源，再运行原 Cocos 场景。原 AppEngine 负责时钟，原 ScreenNavigator/WindowNavigator 子类、遮罩与 SwitchWindow 转场负责页面状态与原界面事件；主线子组件保留 Prefab 自己的启用标记。声效注册、逐帧执行器和主页日夜计时均调用原启动函数。

Canvas 的 (375,667)、750×1334、fitWidth=true、fitHeight=false 来自恢复的主场景序列化数据。该几何关系使原 Cocos 事件的世界坐标与原棋盘命中计算一致。

原新手引导使用 GuideStep、原手势/遮罩/对话 Prefab 和原条件计数。按原逻辑保存实际完成的关键步骤；没有将输入直接替换为脚本改盘，也不通过伪造“引导完成”标志绕过原交互。

每次启动均先完整经过原主页初始化，建立 HomeScreen.onInit 所负责的装修/外观共享注册表，再为已有进度返回棋盘。原转场动画结束与 HomeScreen.loginHome 的地图/ECS 异步加载分别等待；地图就绪后再调用原 HomeMainUi.updateHud。原 ScreenNavigator 发出页面切换事件，驱动 Hud_guide/Hud_merge 等原动画和 UIFindItem 状态。原订单额外奖励的九种场景池也在界面出现前等待原 OrderExtraRewardTool.initExtraConfigs 完成，合成页预载使用原 t9.loadAnimations(true)，涵盖全部 167 个 TC 动画。

## 纹理兼容

带 .pvr 扩展名的原文件按真实 ASTC 头解码，原文件另行保留。运行时由本地服务提供其 PNG，由原 Cocos PNG 下载/解析链处理 Blob 或 ImageBitmap。仅对这条兼容链产生的图像，将上传格式设置为 RGBA8888；原 SpriteFrame、Prefab、Spine 与动画仍由原引擎读取。

资源优先按原 bundle 路径查找。跨 bundle 重定向涉及同一原生资源时，才按已知清单中的完整 UUID/版本文件名回退；摘要冲突不匹配，没有任意目录扫描或在线兜底。

## 本地结算的责任

original/local-backend.js 接入原客户端传输入口。客户端已完成预测的合成、移动、产出等操作保留原对象和恢复计时器，不把运行对象反复替换成 JSON 克隆。订单、装修、升级等已接入操作检查原配置、需求和可用资源后结算。

订单解锁和装修判定优先使用原客户端可用的条件函数。存档保持原 Map、日期和已知模型类型，并校验关键结构；原恢复器在格子显示前重建产出与恢复计时。正式入口使用 feie-gym-original-local-v2，与开发 QA 的 v1 存档隔离。未知指令返回错误，不把缺失的原服务器功能包装为成功；imgbox_show 外观拥有查询及运营、支付和社交业务未接入。

因此可准确描述为“原客户端与原素材的本地运行及结算适配”，不能据此承诺原线上服务的所有隐藏规则、随机种子、经济、运营和 AB 行为完全一致。

## 验证分层

npm run verify 检查恢复文件、索引和可用摘要；npm run test:original 检查本地结算和服务，最终 28 项通过；静态资产闭合报告为 docs/original-assets-acceptance.json。浏览器原生鼠标验收已走完原 2001–2020 引导、首建与升级，并验证重载后的继续产出、合成和后续任务窗口，完整步骤见 docs/LOCAL_RUNTIME.md。背包及全游戏后续流程没有因此列为通过，也未进行像素差分。

docs/STATIC_AUDIT.md 是最初纯静态恢复阶段的敏感信息检查记录，其中“没有执行游戏脚本”仅针对该次检查。后续本地运行会执行经脱敏的原客户端；静态报告与运行验收分别保留，不回写成同一范围。

原 SDK 登录、遥测与原服务器连接不在本地入口执行；浏览器连接策略限制为同源。原游戏代码、美术和本次新增适配代码分别保留来源记录。
