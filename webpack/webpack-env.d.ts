/*
* custom webpack environment declarations
* We use this custom and simple declaration file instead of node.d.ts & webpack.env.d.ts
* */

interface WebpackCustomEnv {
	NODE_ENV?: string,
	api?: string
}

interface WebpackProcess {
	env: WebpackCustomEnv
}

interface WebpackRequireFunction {
	(path: string): string
}

declare var process: WebpackProcess;
declare var require: WebpackRequireFunction;
