import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;

	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id";

	themeColor: {
		hue: number;
		fixed: boolean;
	};
	banner: {
		enable: boolean;
		src: string;
		position?: "top" | "center" | "bottom";
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
	};
	// 全局背景功能
	background: {
		enable: boolean;
		src: string;
		position?: "top" | "center" | "bottom";
		size?: "cover" | "contain" | "auto";
		repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
		attachment?: "fixed" | "scroll" | "local";
		opacity?: number;
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};

	favicon: Favicon[];
	// 图片占位符配置
	imagePlaceholder: {
		enable: boolean; // 是否启用图片占位符功能
		src: string; // 占位图片的路径或URL
		localOnly: boolean; // 是否仅对本地图片使用占位符
		postImages: {
			enable: boolean; // 是否为文章图片启用占位符
			src: string; // 文章图片专用占位符路径，未设置则使用全局占位符
		};
	};
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
};

/** Umami 分析工具配置 */
export type UmamiConfig = {
	enable: boolean /** 是否启用 Umami 分析工具 */;
	baseUrl: string /** Umami 实例的基础 URL */;
	shareId: string /** Umami 分享 ID */;
	timezone: string /** 时区配置 */;
	showPostStats?: boolean /** 是否显示文章统计 */;
};
