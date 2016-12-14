import {TestBed, inject, async} from "@angular/core/testing";

import {ApiHttpClient} from "./api-http-client";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, Headers, RequestMethod} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {fakeResponse, expectUrl, expectMethod} from '../test/http-test-utils';

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

	//TODO: add multiple describe
	it('should do stuff', async(inject([ApiHttpClient, MockBackend], (http: ApiHttpClient, backend: MockBackend) => {

		backend.connections.subscribe(
			(conn: MockConnection) => {
				expectUrl(conn, "/api/blogs");
				expectMethod(conn, RequestMethod.Get);
				return fakeResponse(conn);
			}
		);

		http.post("/api/blogs", {}).subscribe();

	})));
});
