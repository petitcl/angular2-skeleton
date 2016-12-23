import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import _cloneDeep = require("lodash/cloneDeep");

interface CustomRequestOptions {
	url: string;
	options: RequestOptionsArgs;
}

@Injectable()
export class ApiHttpClient {

	public static readonly CONTENT_TYPE_HEADER: string = 'Content-Type';
	public static readonly AUTHORIZATION_HEADER: string = 'Authorization';
	public static readonly CONTENT_TYPE_APPLICATION_JSON: string = 'application/json';

	private defaultOptions: RequestOptionsArgs = {};
	private _baseUrl = "";

	constructor(private http: Http) {
		this.addDefaultHeader(ApiHttpClient.CONTENT_TYPE_HEADER, ApiHttpClient.CONTENT_TYPE_APPLICATION_JSON);
	}

	addDefaultHeader(name: string, value: string) {
		this.defaultOptions.headers = this.defaultOptions.headers || new Headers();
		this.defaultOptions.headers.append(name, value);
	}

	deleteDefaultHeader(name) {
		this.defaultOptions.headers = this.defaultOptions.headers || new Headers();
		this.defaultOptions.headers.delete(name);
	}

	getDefaultRequestOptions() : RequestOptionsArgs {
		//lodash does not handle Map / Set copy, so we got to manually copy it
		const ret =_cloneDeep(this.defaultOptions);
		ret.headers = new Headers(this.defaultOptions.headers);
		return ret;
	}

	get baseUrl() {
		return this._baseUrl;
	}

	set baseUrl(basePath: string) {
		if (!basePath) basePath = "";
		this._baseUrl = basePath;
	}

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.get(opt.url, opt.options);
	}

	post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.post(opt.url, body, opt.options);
	}

	put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.put(opt.url, body, opt.options);
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.delete(opt.url, opt.options);
	}

	patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.patch(opt.url, body, opt.options);
	}

	head(url: string, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.head(opt.url, opt.options);
	}

	options(url: string, options?: RequestOptionsArgs): Observable<Response> {
		const opt = this.processRequestOptions(url, options);
		return this.http.options(opt.url, opt.options);
	}

	protected processRequestOptions(url: string, options?: RequestOptionsArgs) : CustomRequestOptions {
		if (!options) options = this.getDefaultRequestOptions();
		if (this.baseUrl[this.baseUrl.length - 1] === '/' && url[0] === '/') url = this.baseUrl + url.substring(1);
		else url = this.baseUrl + url;
		return { url, options };
	}
}