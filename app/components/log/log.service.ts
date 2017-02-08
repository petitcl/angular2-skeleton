import {Injectable} from "@angular/core";


export class Logger {
	constructor(private name: string, private logService: LogService) {

	}

	debug(...logs: any[]) {
		this.logService.debug(this.name, ...logs);
	}

	log(...logs: any[]) {
		this.logService.log(this.name, ...logs);
	}

	info(...logs: any[]) {
		this.logService.info(this.name, ...logs);
	}

	warn(...logs: any[]) {
		this.logService.warn(this.name, ...logs);
	}

	error(...logs: any[]) {
		this.logService.error(this.name, ...logs);
	}

}

export enum LogLevel {
	DEBUG,
	LOG,
	INFO,
	WARN,
	ERROR
}

export interface LogSink {
	log(level: LogLevel, name: string, ...logs: any[]): void;
}

class ConsoleLogSink implements LogSink {
	log(level: LogLevel, name: string, ...logs: any[]) {
		/* tslint:disable:no-console */
		switch (level) {
			case LogLevel.DEBUG:
				console.debug(name, ...logs);
				break;
			case LogLevel.LOG:
				console.log(name, ...logs);
				break;
			case LogLevel.INFO:
				console.info(name, ...logs);
				break;
			case LogLevel.WARN:
				console.warn(name, ...logs);
				break;
			case LogLevel.ERROR:
				console.error(name, ...logs);
				break;
		}
		/* tslint:enable:no-console */
	}
}

export class NullSink implements LogSink {

	log(level: LogLevel, name: string, ...logs: any[]) {
	}

}

/*
* todo list
* disable all logs (done)
* disable specific log level (todo)
* sub loggers (todo)
* attach custom loggers (todo) (optional)
* get custom logger instance (todo) (optional)
* */
@Injectable()
export class LogService {

	protected sinks: LogSink[] = [];
	protected enabled = true;

	constructor() {
		this.addSink(new ConsoleLogSink());
	}

	isEnabled() {
		return this.enabled;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	addSink(sink: LogSink) {
		this.sinks.push(sink);
	}

	clearSinks() {
		this.sinks = [];
	}

	create(key: string) {
		return new Logger(key, this);
	}

	debug(name: string, ...logs: any[]) {
		this.doLog(LogLevel.DEBUG, name, ...logs);
	}

	log(name: string, ...logs: any[]) {
		this.doLog(LogLevel.LOG, name, ...logs);
	}

	info(name: string, ...logs: any[]) {
		this.doLog(LogLevel.INFO, name, ...logs);
	}

	warn(name: string, ...logs: any[]) {
		this.doLog(LogLevel.WARN, name, ...logs);
	}

	error(name: string, ...logs: any[]) {
		this.doLog(LogLevel.ERROR, name, ...logs);
	}

	doLog(level: LogLevel, name: string, ...logs: any[]) {
		if (!this.enabled) return;
		this.sinks.forEach(sink => sink.log(level, name, ...logs));
	}

}

