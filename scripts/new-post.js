/* This is a script to create a new post markdown file with front-matter */

import fs from "node:fs";
import path from "node:path";

/**
 * 获取当前日期，格式为 YYYY-MM-DD
 * @returns {string} 当前日期的字符串表示
 */
function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

// 检查是否提供了文章名称参数
if (args.length === 0) {
	console.error(`Error: No post name argument provided
Usage: npm run new-post -- <postname>`);
	process.exit(1); // 终止脚本并返回错误代码 1
}

// 获取文章名称，将作为目录名
const postName = args[0];

// 定义目标目录路径
const targetDir = "./src/content/posts/";
const postDir = path.join(targetDir, postName);
const indexFilePath = path.join(postDir, "index.md");
const imagesDir = path.join(postDir, "images");

// 检查文章目录是否已存在
if (fs.existsSync(postDir)) {
	console.error(`Error: Post directory ${postDir} already exists`);
	process.exit(1);
}

// 创建文章目录
fs.mkdirSync(postDir, { recursive: true });

// 创建 images 子目录
fs.mkdirSync(imagesDir, { recursive: true });

// 生成 Markdown 文件内容
const content = `---
title: ${postName}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`;

// 写入 index.md 文件
fs.writeFileSync(indexFilePath, content);

console.log(`Post directory structure created at ${postDir}`);
console.log("- index.md file created");
console.log("- images directory created");
