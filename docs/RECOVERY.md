# 恢复范围与差异

## 交付目录

| 路径 | 内容 |
| --- | --- |
| `recovered/packages/` | 两个 wxapkg 展开后的客户端产物；一项 SDK 密钥已脱敏 |
| `recovered/manifest.json` | 原缓存导出、大小、SHA-256、脱敏前后摘要 |
| `client/` | 静态拆开 `define(path, factory)` 封装后重建的客户端目录 |
| `readable/game.formatted.js` | 原主逻辑的格式化副本，保留所有共享闭包 |
| `readable/mainplay/` | 70 个注册模块与 13 个共享核心声明的独立查看片段 |
| `readable/module-index.json` | 注册名、原符号、原始字符区间、格式化脚本行号 |
| `recovered/remote/` | 已下载缓存资源，恢复原 CDN 相对路径 |
| `recovered/downloads/` | 后续补取的主玩法静态纹理及来源清单 |
| `recovered/config/Config/` | BON 解码后的玩法配置表 |
| `recovered/config/Lang_zh/` | BON 解码后的中文配置表 |
| `recovered/previews/` | PNG 纹理、原名图块、图集和裁切参数 |
| `tools/`、`viewer/` | 本次新增的恢复工具、校验和本地查看器 |

## 主玩法链路

原客户端的流程可以沿以下符号阅读。注册脚本和普通声明均共享主脚本闭包，提取片段供分析使用；重新组合时应保留完整依赖。

| 规则 | 原符号 / 入口 | 分析文件 |
| --- | --- | --- |
| 初始棋盘、格子数据转换 | `GW.ParseBoardConfig`、`ParseCellConfig` | `BoardConfigParser.js` |
| 棋盘加载、数据缓存和交换 | `M2` / `G2`，`LoadBoardData`、`RefreshBoardCache`、`SwitchElement` | `BoardController.js` |
| 拖拽开始、移动、结束、取消 | `B9` / `D9` / `P9` / `qqe` | `TouchStart/Move/End/Cancel.js` |
| 是否允许合成 | `G$.IsElementCanMerge` | `BoardRules.js` |
| 实际合成与邻格解锁 | `CommonElement.onMerge`、`G$.UnlockAroundCells` | `CommonElement.js`、`BoardRules.js` |
| 点击产出、体力与冷却 | `ManuCreatorElement.onClickElement` | `ManuCreatorElement.js` |
| 产物生成和校验 | `TJ.CreateNewElements`、`CellProductCheck` | `BoardProducts.js` |
| 订单需求检查、棋盘与背包道具 | `b2.UpdateOrderState`、`GetBoardHaveElement`、`GetBagHaveElement` | `OrderState.js` |
| 完成订单 | `OrderItem.onClickFinish` | `OrderItem.js` |
| 背包放入 | `BagElement.onPutInto` | `BagElement.js` |
| 棋盘页面与渲染 | `MergeScreen` / `MergeBoardRender` | 同名文件 |
| 棋盘网络同步 | `EJ`、`cellmove` / `cellproduct` / `completeorder` | `BoardTransport.js`及完整脚本 |

原代码判定包括同系列同等级、非零 `mergeElementId`、蛛网与遮盖状态、冷却状态、已使用产出器等条件。它不等同于仅比较“相同图标”的简化版本。普通系列 A 为工具箱/工具/手套，后续系列包含冰箱、健身采购、宣传、购物和清扫等；准确内容以配置原字段为准。

`Config/Board.json["1"].element` 为初始主棋盘，9 行 7 列。编码为 `elementId:state[:coverVariant]`。常见状态 0 可用，1 蛛网，3 遮盖。体力原配置为上限 100、每 120 秒恢复 1 点。当前运行中的棋盘已经过引导操作，所以可能与“初始配置”不同；没有导出玩家账号存档来覆盖配置。

## 素材覆盖

从缓存配置定位原 texture UUID、版本、SpriteFrame rect、rotation 和跨 bundle 重定向，再恢复原路径。

- 452 张缓存纹理（含 8 张包内纹理）和 585 张后补静态纹理，共 1,037 张。
- `.pvr` 扩展名的这些文件实际采用 ASTC 文件头；按实际格式解码为 RGBA PNG，未重新绘制。
- 已裁切 1,223 个具名图块，旋转图块根据原 `rotated` 标记处理。
- `Texture/Element/[A-I]_<n>/` 的普通合成链配置声明 347 个 SpriteFrame，347/347 已覆盖。
- 选定主玩法范围共 991 个引用：Element 447、MergeUi 231、UI/MainBoard 与 Home 214、Items/Common 50、Map/init 49；这些引用所需纹理当前均存在。
- “引用数”包含资源路径别名，不能与“唯一 PNG 数量”混为一谈。
- 仍有 12,953 个目标范围以外的 SpriteFrame 引用未恢复，包含活动、DLC 和扩展内容，全部保留于 `sprites.json.missing`。

缓存中的 Spine `.bin`、6 个 MP3、2 个 TTF 与 PNG 均保留。对 Spine 保留其原始二进制及缓存纹理，没有声称已恢复所有动画或原美术工程。

## 仍不可从缓存恢复的部分

1. 原始 TypeScript 文件、注释、源码目录与构建配置、Cocos 编辑器 scene/prefab 工程。
2. 服务端的账户、经济、合成、产出、订单校验与状态数据库。
3. 未缓存的 8 个分包：`miniGame` 及 7 个 `playable_*` 入口，详见 `client/layout-index.json`。
4. 未下载的其他 remote bundle、活动素材和扩展场景。
5. 供应商插件运行环境和有效 SDK 凭据。

因此 `client/` 的“可导入”表示目录和入口已重建，可供开发者工具查看和继续改造；没有验证它能脱离原服务运行。资源查看器与原游戏分离，不请求原游戏结算接口。

## 校验与脱敏

每个原缓存文件保存大小与 SHA-256；主逻辑脚本的一处 `wxAdSecretKey` 字符串值使用同长度标记替换，原摘要记录为 `originalSha256`，交付摘要记录为 `sha256`。玩法逻辑未因此改变。原值只保存在本地忽略目录，未放入仓库。

配置 BON 解码器独立实现了客户端静态代码中的类型标签、7-bit 长度、字符串引用表、数字/对象/数组/日期/二进制读取，并检查输入边界和尾部。纹理与 JSON 的恢复均没有执行原游戏脚本。`docs/verification.json` 为当前交付结果的检查记录。
