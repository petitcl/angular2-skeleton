/*
* custom webpack environment declarations
* */

interface WebpackCustomEnv {
	NODE_ENV?: string,
	api?: string
}

interface WebpackProcess {
	env: WebpackCustomEnv
}

declare var process: WebpackProcess;
