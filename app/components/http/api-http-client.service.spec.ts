import {TestBed, inject, async} from "@angular/core/testing";
import {ApiHttpClient} from "./api-http-client.service";
import {HttpModule, Http, BaseRequestOptions} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {fakeResponse, expectUrl, expectHeader} from "../test/http-test.utils";

describe('ApiHttpClient', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				ApiHttpClient,
				{
					provide: Http,
					useFactory: (mockBackend, options) => {
						return new Http(mockBackend, options);
					},
					deps: [MockBackend, BaseRequestOptions]
				},
				MockBackend,
				BaseRequestOptions
			]
		});
	});


	describe('baseUrl', () => {
		it('should be empty by default', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectUrl(conn, "/api/blogs");
					return fakeResponse(conn);
				}
			);

			http.get("/api/blogs", {}).subscribe();
		})));


		it('should work with path prefix', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectUrl(conn, "/api/blogs");
					return fakeResponse(conn);
				}
			);

			http.baseUrl = "/api";
			http.get("/blogs", {}).subscribe();
		})));

		it('should work with url prefix', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectUrl(conn, "http://google.com/api/blogs");
					return fakeResponse(conn);
				}
			);

			http.baseUrl = "http://google.com/api";
			http.get("/blogs", {}).subscribe();
		})));

		it('should correctly merge trailing slashes', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectUrl(conn, "http://google.com/api/blogs");
					return fakeResponse(conn);
				}
			);

			http.baseUrl = "http://google.com/api/";
			http.get("/blogs", {}).subscribe();
		})));

	});

	describe('defaultOptions', () => {
		it('should send json content type header by default', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectHeader(conn, "Content-Type", "application/json");
					return fakeResponse(conn);
				}
			);

			http.get("/blogs").subscribe();
		})));

		it('should allow to set header', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectHeader(conn, "Authorization", "token");
					return fakeResponse(conn);
				}
			);

			http.addDefaultHeader("Authorization", "token");
			http.get("/blogs").subscribe();
		})));

		it('should allow to delete header', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {
			backend.connections.subscribe(
				(conn: MockConnection) => {
					expectHeader(conn, "Content-Type", null);
					return fakeResponse(conn);
				}
			);

			http.deleteDefaultHeader("Content-Type");
			http.get("/blogs").subscribe();
		})));
	});
});
