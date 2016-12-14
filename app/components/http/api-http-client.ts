import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import _cloneDeep = require("lodash/cloneDeep");

@Injectable()
export class ApiHttpClient {

	public static readonly CONTENT_TYPE_HEADER: string = 'Content-Type';
	public static readonly AUTHORIZATION_HEADER: string = 'Authorization';
	public static readonly CONTENT_TYPE_APPLICATION_JSON: string = 'application/json';

	private defaultOptions: RequestOptionsArgs = {};

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
		return _cloneDeep(this.defaultOptions);
	}

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.get(url, options);
	}

	post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.post(url, body, options);
	}

	put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.put(url, body, options);
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.put(url, options);
	}

	patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.patch(url, options);
	}

	head(url: string, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.head(url, options);
	}

	options(url: string, options?: RequestOptionsArgs): Observable<Response> {
		if (!options) options = this.getDefaultRequestOptions();
		return this.http.options(url, options);
	}
}