import {ResponseOptions, Response} from "@angular/http";

export function fakeResponse(conn, body?) {
	if (!body) body = {};
	conn.mockRespond(new Response(new ResponseOptions({ body })))
}

export function expectUrl(conn, url) {
	expect(conn.request.url).toBe(url);
}

export function expectMethod(conn, method) {
	expect(conn.request.method).toBe(method);
}