# 📦 panindex-js-sdk

基于 [PanIndex](https://github.com/px-org/PanIndex) API 封装的 TypeScript SDK，支持快速对接公开 API，获取程序信息、文件列表等内容。

## ✨ 特性

- 使用 TypeScript 编写
- 支持自定义 PanIndex 实例地址

## 📦 安装

```bash
npm i panindex-js-sdk

yarn add panindex-js-sdk

bun add panindex-js-sdk
```

## 🚀 快速开始

```ts
import { PanIndexClient, PublicAPI } from "panindex-js-sdk";

// 初始化客户端
const client = new PanIndexClient("https://t1.noki.icu");

// 创建公共 API 实例
const api = new PublicAPI(client);

async function main() {
  const res = await api.getProgramInfo();
  console.log(res.data); // 打印 API 程序信息
}

main();
```

## 📄 License

MIT License

本 SDK 仅封装调用 AGPL-3.0 许可证的 Panindex API，不包含 AGPL 授权代码。用户需遵守 Panindex API 的使用协议。
