import { visit } from "unist-util-visit";
import { siteConfig } from "../config";

/**
 * Rehype 插件：为博客文章图片添加占位符功能
 * 此插件为图片添加 onerror 处理器，当图片加载失败时显示占位符
 */
export function rehypeImagePlaceholder() {
	const { imagePlaceholder } = siteConfig;

	// 如果图片占位符未启用，返回一个空操作插件
	if (!imagePlaceholder?.enable || !imagePlaceholder?.postImages?.enable) {
		return (tree) => tree;
	}

	return (tree) => {
		// 遍历 AST 中的所有图片节点
		visit(tree, "element", (node) => {
			// 检查是否为图片元素
			if (node.tagName !== "img") return;

			// 获取现有属性
			const props = node.properties || {};

			// 判断是否为本地图片（以 / 开头）或远程图片
			const src = String(props.src) || "";
			const isLocalImage = src.startsWith("/");

			// 仅应用于文章图片，并尊重 localOnly 设置
			if (
				(imagePlaceholder.localOnly && !isLocalImage) ||
				!imagePlaceholder.localOnly
			) {
				// 获取占位符图片 URL
				const placeholderUrl =
					imagePlaceholder.postImages.src ||
					imagePlaceholder.src ||
					"/imagePlaceholder/imagePlaceholder.webp";

				// 创建一个新的 onerror 处理函数，将图片设置为占位符
				// 并添加一个类来标识它是占位符
				const onErrorHandler = `this.onerror=null; this.src='${placeholderUrl}'; this.classList.add('image-placeholder');`;

				// 添加或更新 onerror 属性
				props.onerror = onErrorHandler;

				// 还添加 loading 属性以提高性能
				props.loading = props.loading || "lazy";

				// 更新节点属性
				node.properties = props;
			}
		});
	};
}