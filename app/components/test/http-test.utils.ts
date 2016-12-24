import {ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockConnection} from "@angular/http/testing";

export function fakeResponse(conn, body?) {
	if (!body) body = {};
	conn.mockRespond(new Response(new ResponseOptions({ body })));
}

export function expectUrl(conn, url) {
	expect(conn.request.url).toBe(url);
}

export function expectMethod(conn: MockConnection, method: RequestMethod) {
	expect(conn.request.method).toBe(method);
}

export function expectGet(conn: MockConnection) {
	expectMethod(conn, RequestMethod.Get);
}

export function expectPost(conn: MockConnection) {
	expectMethod(conn, RequestMethod.Post);
}

export function expectPut(conn: MockConnection) {
	expectMethod(conn, RequestMethod.Put);
}

export function expectDelete(conn: MockConnection) {
	expectMethod(conn, RequestMethod.Delete);
}

export function expectHeader(conn: MockConnection, key: string, value: string) {
	expect(conn.request.headers.get(key)).toBe(value);
}

