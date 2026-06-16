globalThis.__nitro_main__ = import.meta.url;
import { a as NodeResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as stringifyQuery } from "./_libs/ufo.mjs";
//#region ../../node_modules/.bun/nitro@3.0.260610-beta+602e09be4ffc11c0/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_zo19rI = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_zo19rI
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260610-beta+602e09be4ffc11c0/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260610-beta+602e09be4ffc11c0/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260610-beta+602e09be4ffc11c0/node_modules/nitro/dist/presets/aws-lambda/runtime/_utils.mjs
function awsRequest(event, context) {
	const method = awsEventMethod(event);
	const url = awsEventURL(event);
	const headers = awsEventHeaders(event);
	const body = awsEventBody(event);
	const req = new Request(url, {
		method,
		headers,
		body
	});
	req.runtime ??= { name: "aws-lambda" };
	req.runtime.aws ??= {
		event,
		context
	};
	return new Request(url, {
		method,
		headers,
		body
	});
}
function awsEventMethod(event) {
	return event.httpMethod || event.requestContext?.http?.method || "GET";
}
function awsEventURL(event) {
	const hostname = event.headers.host || event.headers.Host || event.requestContext?.domainName || ".";
	const path = event.path || event.rawPath;
	const query = awsEventQuery(event);
	const protocol = (event.headers["X-Forwarded-Proto"] || event.headers["x-forwarded-proto"]) === "http" ? "http" : "https";
	return new URL(`${path}${query ? `?${query}` : ""}`, `${protocol}://${hostname}`);
}
function awsEventQuery(event) {
	if (typeof event.rawQueryString === "string") return event.rawQueryString;
	return stringifyQuery({
		...event.queryStringParameters,
		...event.multiValueQueryStringParameters
	});
}
function awsEventHeaders(event) {
	const headers = new Headers();
	for (const [key, value] of Object.entries(event.headers)) if (value) headers.set(key, value);
	if ("cookies" in event && event.cookies) for (const cookie of event.cookies) headers.append("cookie", cookie);
	return headers;
}
function awsEventBody(event) {
	if (!event.body) return;
	if (event.isBase64Encoded) return Buffer.from(event.body || "", "base64");
	return event.body;
}
function awsResponseHeaders(response) {
	const headers = Object.create(null);
	for (const [key, value] of response.headers) if (value) headers[key] = Array.isArray(value) ? value.join(",") : String(value);
	const cookies = response.headers.getSetCookie();
	return cookies.length > 0 ? {
		headers,
		cookies,
		multiValueHeaders: { "set-cookie": cookies }
	} : { headers };
}
async function awsResponseBody(response) {
	if (!response.body) return { body: "" };
	const buffer = await toBuffer(response.body);
	return isTextType(response.headers.get("content-type") || "") ? { body: buffer.toString("utf8") } : {
		body: buffer.toString("base64"),
		isBase64Encoded: true
	};
}
function isTextType(contentType = "") {
	return /^text\/|\/(javascript|json|xml)|utf-?8/i.test(contentType);
}
function toBuffer(data) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		data.pipeTo(new WritableStream({
			write(chunk) {
				chunks.push(chunk);
			},
			close() {
				resolve(Buffer.concat(chunks));
			},
			abort(reason) {
				reject(reason);
			}
		})).catch(reject);
	});
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260610-beta+602e09be4ffc11c0/node_modules/nitro/dist/presets/aws-lambda/runtime/aws-lambda.mjs
var nitroApp = useNitroApp();
async function handler(event, context) {
	const request = awsRequest(event, context);
	const response = await nitroApp.fetch(request);
	return {
		statusCode: response.status,
		...awsResponseHeaders(response),
		...await awsResponseBody(response)
	};
}
//#endregion
export { handler };
