declare module '*.png' {
	const value: string; // base64-encoded string
	export default value;
}

declare module '*.svg' {
	const content: ( props?: HTMLSvgElement ) => JSX.Element;
	export default content;
}
