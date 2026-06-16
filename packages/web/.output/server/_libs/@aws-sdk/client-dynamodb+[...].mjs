import { a as __toCommonJS, n as __esmMin, o as __toESM, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { a as require_client, c as require_protocols$1, d as require_endpoints, f as require_config, h as require_transport, m as require_schema, o as require_dist_cjs, p as require_client$1, s as require_retry, u as require_serde } from "./checksums+[...].mjs";
import { Readable, Writable } from "node:stream";
import node_https from "node:https";
import nodeHTTP2, { default as node_http2 } from "node:http2";
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-env@3.972.47/node_modules/@aws-sdk/credential-provider-env/dist-es/fromEnv.js
var import_client$1 = require_client$1();
var import_serde$5 = require_serde();
var import_protocols$7 = require_protocols$1();
var import_client$2 = require_client();
var import_config = require_config();
var ENV_KEY = "AWS_ACCESS_KEY_ID";
var ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
var ENV_SESSION = "AWS_SESSION_TOKEN";
var ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
var ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
var ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";
var fromEnv = (init) => async () => {
	init?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
	const accessKeyId = process.env[ENV_KEY];
	const secretAccessKey = process.env[ENV_SECRET];
	const sessionToken = process.env[ENV_SESSION];
	const expiry = process.env[ENV_EXPIRATION];
	const credentialScope = process.env[ENV_CREDENTIAL_SCOPE];
	const accountId = process.env[ENV_ACCOUNT_ID];
	if (accessKeyId && secretAccessKey) {
		const credentials = {
			accessKeyId,
			secretAccessKey,
			...sessionToken && { sessionToken },
			...expiry && { expiration: new Date(expiry) },
			...credentialScope && { credentialScope },
			...accountId && { accountId }
		};
		(0, import_client$2.setCredentialFeature)(credentials, "CREDENTIALS_ENV_VARS", "g");
		return credentials;
	}
	throw new import_config.CredentialsProviderError("Unable to find environment variable credentials.", { logger: init?.logger });
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-env@3.972.47/node_modules/@aws-sdk/credential-provider-env/dist-es/index.js
var dist_es_exports$3 = /* @__PURE__ */ __exportAll({
	ENV_ACCOUNT_ID: () => ENV_ACCOUNT_ID,
	ENV_CREDENTIAL_SCOPE: () => ENV_CREDENTIAL_SCOPE,
	ENV_EXPIRATION: () => ENV_EXPIRATION,
	ENV_KEY: () => ENV_KEY,
	ENV_SECRET: () => ENV_SECRET,
	ENV_SESSION: () => ENV_SESSION,
	fromEnv: () => fromEnv
});
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/build-abort-error.js
function buildAbortError(abortSignal) {
	const reason = abortSignal && typeof abortSignal === "object" && "reason" in abortSignal ? abortSignal.reason : void 0;
	if (reason) {
		if (reason instanceof Error) {
			const abortError = /* @__PURE__ */ new Error("Request aborted");
			abortError.name = "AbortError";
			abortError.cause = reason;
			return abortError;
		}
		const abortError = new Error(String(reason));
		abortError.name = "AbortError";
		return abortError;
	}
	const abortError = /* @__PURE__ */ new Error("Request aborted");
	abortError.name = "AbortError";
	return abortError;
}
var init_build_abort_error = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/constants.js
var NODEJS_TIMEOUT_ERROR_CODES;
var init_constants$1 = __esmMin((() => {
	NODEJS_TIMEOUT_ERROR_CODES = [
		"ECONNRESET",
		"EPIPE",
		"ETIMEDOUT"
	];
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/get-transformed-headers.js
var getTransformedHeaders;
var init_get_transformed_headers = __esmMin((() => {
	getTransformedHeaders = (headers) => {
		const transformedHeaders = {};
		for (const name in headers) {
			const headerValues = headers[name];
			transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
		}
		return transformedHeaders;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/node-https.js
var init_node_https = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/timing.js
var timing;
var init_timing = __esmMin((() => {
	timing = {
		setTimeout: (cb, ms) => setTimeout(cb, ms),
		clearTimeout: (timeoutId) => clearTimeout(timeoutId)
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/set-connection-timeout.js
var DEFER_EVENT_LISTENER_TIME$2, setConnectionTimeout;
var init_set_connection_timeout = __esmMin((() => {
	init_timing();
	DEFER_EVENT_LISTENER_TIME$2 = 1e3;
	setConnectionTimeout = (request, reject, timeoutInMs = 0) => {
		if (!timeoutInMs) return -1;
		const registerTimeout = (offset) => {
			const timeoutId = timing.setTimeout(() => {
				request.destroy();
				reject(Object.assign(/* @__PURE__ */ new Error(`@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of ${timeoutInMs} ms.`), { name: "TimeoutError" }));
			}, timeoutInMs - offset);
			const doWithSocket = (socket) => {
				if (socket?.connecting) socket.on("connect", () => {
					timing.clearTimeout(timeoutId);
				});
				else timing.clearTimeout(timeoutId);
			};
			if (request.socket) doWithSocket(request.socket);
			else request.on("socket", doWithSocket);
		};
		if (timeoutInMs < 2e3) {
			registerTimeout(0);
			return 0;
		}
		return timing.setTimeout(registerTimeout.bind(null, DEFER_EVENT_LISTENER_TIME$2), DEFER_EVENT_LISTENER_TIME$2);
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/set-request-timeout.js
var setRequestTimeout;
var init_set_request_timeout = __esmMin((() => {
	init_timing();
	setRequestTimeout = (req, reject, timeoutInMs = 0, throwOnRequestTimeout, logger) => {
		if (timeoutInMs) return timing.setTimeout(() => {
			let msg = `@smithy/node-http-handler - [${throwOnRequestTimeout ? "ERROR" : "WARN"}] a request has exceeded the configured ${timeoutInMs} ms requestTimeout.`;
			if (throwOnRequestTimeout) {
				const error = Object.assign(new Error(msg), {
					name: "TimeoutError",
					code: "ETIMEDOUT"
				});
				req.destroy(error);
				reject(error);
			} else {
				msg += ` Init client requestHandler with throwOnRequestTimeout=true to turn this into an error.`;
				logger?.warn?.(msg);
			}
		}, timeoutInMs);
		return -1;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/set-socket-keep-alive.js
var DEFER_EVENT_LISTENER_TIME$1, setSocketKeepAlive;
var init_set_socket_keep_alive = __esmMin((() => {
	init_timing();
	DEFER_EVENT_LISTENER_TIME$1 = 3e3;
	setSocketKeepAlive = (request, { keepAlive, keepAliveMsecs }, deferTimeMs = DEFER_EVENT_LISTENER_TIME$1) => {
		if (keepAlive !== true) return -1;
		const registerListener = () => {
			if (request.socket) request.socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
			else request.on("socket", (socket) => {
				socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
			});
		};
		if (deferTimeMs === 0) {
			registerListener();
			return 0;
		}
		return timing.setTimeout(registerListener, deferTimeMs);
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/set-socket-timeout.js
var DEFER_EVENT_LISTENER_TIME, setSocketTimeout;
var init_set_socket_timeout = __esmMin((() => {
	init_timing();
	DEFER_EVENT_LISTENER_TIME = 3e3;
	setSocketTimeout = (request, reject, timeoutInMs = 0) => {
		const registerTimeout = (offset) => {
			const timeout = timeoutInMs - offset;
			const onTimeout = () => {
				request.destroy();
				reject(Object.assign(/* @__PURE__ */ new Error(`@smithy/node-http-handler - the request socket timed out after ${timeoutInMs} ms of inactivity (configured by client requestHandler).`), { name: "TimeoutError" }));
			};
			if (request.socket) {
				request.socket.setTimeout(timeout, onTimeout);
				request.on("close", () => request.socket?.removeListener("timeout", onTimeout));
			} else request.setTimeout(timeout, onTimeout);
		};
		if (0 < timeoutInMs && timeoutInMs < 6e3) {
			registerTimeout(0);
			return 0;
		}
		return timing.setTimeout(registerTimeout.bind(null, timeoutInMs === 0 ? 0 : DEFER_EVENT_LISTENER_TIME), DEFER_EVENT_LISTENER_TIME);
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/write-request-body.js
async function writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME, externalAgent = false) {
	const headers = request.headers;
	const expect = headers ? headers.Expect || headers.expect : void 0;
	let timeoutId = -1;
	let sendBody = true;
	if (!externalAgent && expect === "100-continue") sendBody = await Promise.race([new Promise((resolve) => {
		timeoutId = Number(timing.setTimeout(() => resolve(true), Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
	}), new Promise((resolve) => {
		httpRequest.on("continue", () => {
			timing.clearTimeout(timeoutId);
			resolve(true);
		});
		httpRequest.on("response", () => {
			timing.clearTimeout(timeoutId);
			resolve(false);
		});
		httpRequest.on("error", () => {
			timing.clearTimeout(timeoutId);
			resolve(false);
		});
	})]);
	if (sendBody) writeBody(httpRequest, request.body);
}
function writeBody(httpRequest, body) {
	if (body instanceof Readable) {
		body.pipe(httpRequest);
		return;
	}
	if (body) {
		const isBuffer = Buffer.isBuffer(body);
		if (isBuffer || typeof body === "string") {
			if (isBuffer && body.byteLength === 0) httpRequest.end();
			else httpRequest.end(body);
			return;
		}
		const uint8 = body;
		if (typeof uint8 === "object" && uint8.buffer && typeof uint8.byteOffset === "number" && typeof uint8.byteLength === "number") {
			httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
			return;
		}
		httpRequest.end(Buffer.from(body));
		return;
	}
	httpRequest.end();
}
var MIN_WAIT_TIME;
var init_write_request_body = __esmMin((() => {
	init_timing();
	MIN_WAIT_TIME = 6e3;
})), hAgent, hRequest, NodeHttpHandler;
var init_node_http_handler = __esmMin((() => {
	init_build_abort_error();
	init_constants$1();
	init_get_transformed_headers();
	init_node_https();
	init_set_connection_timeout();
	init_set_request_timeout();
	init_set_socket_keep_alive();
	init_set_socket_timeout();
	init_timing();
	init_write_request_body();
	hAgent = void 0;
	hRequest = void 0;
	NodeHttpHandler = class NodeHttpHandler {
		config;
		configProvider;
		socketWarningTimestamp = 0;
		externalAgent = false;
		metadata = { handlerProtocol: "http/1.1" };
		static create(instanceOrOptions) {
			if (typeof instanceOrOptions?.handle === "function") return instanceOrOptions;
			return new NodeHttpHandler(instanceOrOptions);
		}
		static checkSocketUsage(agent, socketWarningTimestamp, logger = console) {
			const { sockets, requests, maxSockets } = agent;
			if (typeof maxSockets !== "number" || maxSockets === Infinity) return socketWarningTimestamp;
			if (Date.now() - 15e3 < socketWarningTimestamp) return socketWarningTimestamp;
			if (sockets && requests) for (const origin in sockets) {
				const socketsInUse = sockets[origin]?.length ?? 0;
				const requestsEnqueued = requests[origin]?.length ?? 0;
				if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
					logger?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`);
					return Date.now();
				}
			}
			return socketWarningTimestamp;
		}
		constructor(options) {
			this.configProvider = new Promise((resolve, reject) => {
				if (typeof options === "function") options().then((_options) => {
					resolve(this.resolveDefaultConfig(_options));
				}).catch(reject);
				else resolve(this.resolveDefaultConfig(options));
			});
		}
		destroy() {
			this.config?.httpAgent?.destroy();
			this.config?.httpsAgent?.destroy();
		}
		async handle(request, { abortSignal, requestTimeout } = {}) {
			if (!this.config) this.config = await this.configProvider;
			const config = this.config;
			const isSSL = request.protocol === "https:";
			if (!isSSL && !this.config.httpAgent) this.config.httpAgent = await this.config.httpAgentProvider();
			return new Promise((_resolve, _reject) => {
				let writeRequestBodyPromise = void 0;
				let socketWarningTimeoutId = -1;
				let connectionTimeoutId = -1;
				let requestTimeoutId = -1;
				let socketTimeoutId = -1;
				let keepAliveTimeoutId = -1;
				const clearTimeouts = () => {
					timing.clearTimeout(socketWarningTimeoutId);
					timing.clearTimeout(connectionTimeoutId);
					timing.clearTimeout(requestTimeoutId);
					timing.clearTimeout(socketTimeoutId);
					timing.clearTimeout(keepAliveTimeoutId);
				};
				const resolve = async (arg) => {
					await writeRequestBodyPromise;
					clearTimeouts();
					_resolve(arg);
				};
				const reject = async (arg) => {
					await writeRequestBodyPromise;
					clearTimeouts();
					_reject(arg);
				};
				if (abortSignal?.aborted) {
					reject(buildAbortError(abortSignal));
					return;
				}
				const headers = request.headers;
				const expectContinue = headers ? (headers.Expect ?? headers.expect) === "100-continue" : false;
				let agent = isSSL ? config.httpsAgent : config.httpAgent;
				if (expectContinue && !this.externalAgent) agent = new (isSSL ? node_https.Agent : hAgent)({
					keepAlive: false,
					maxSockets: Infinity
				});
				socketWarningTimeoutId = timing.setTimeout(() => {
					this.socketWarningTimestamp = NodeHttpHandler.checkSocketUsage(agent, this.socketWarningTimestamp, config.logger);
				}, config.socketAcquisitionWarningTimeout ?? (config.requestTimeout ?? 2e3) + (config.connectionTimeout ?? 1e3));
				const queryString = request.query ? (0, import_protocols$7.buildQueryString)(request.query) : "";
				let auth = void 0;
				if (request.username != null || request.password != null) auth = `${request.username ?? ""}:${request.password ?? ""}`;
				let path = request.path;
				if (queryString) path += `?${queryString}`;
				if (request.fragment) path += `#${request.fragment}`;
				let hostname = request.hostname ?? "";
				if (hostname[0] === "[" && hostname.endsWith("]")) hostname = request.hostname.slice(1, -1);
				else hostname = request.hostname;
				const nodeHttpsOptions = {
					headers: request.headers,
					host: hostname,
					method: request.method,
					path,
					port: request.port,
					agent,
					auth
				};
				const req = (isSSL ? node_https.request : hRequest)(nodeHttpsOptions, (res) => {
					resolve({ response: new import_protocols$7.HttpResponse({
						statusCode: res.statusCode || -1,
						reason: res.statusMessage,
						headers: getTransformedHeaders(res.headers),
						body: res
					}) });
				});
				req.on("error", (err) => {
					if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) reject(Object.assign(err, { name: "TimeoutError" }));
					else reject(err);
				});
				if (abortSignal) {
					const onAbort = () => {
						req.destroy();
						reject(buildAbortError(abortSignal));
					};
					if (typeof abortSignal.addEventListener === "function") {
						const signal = abortSignal;
						signal.addEventListener("abort", onAbort, { once: true });
						req.once("close", () => signal.removeEventListener("abort", onAbort));
					} else abortSignal.onabort = onAbort;
				}
				const effectiveRequestTimeout = requestTimeout ?? config.requestTimeout;
				connectionTimeoutId = setConnectionTimeout(req, reject, config.connectionTimeout);
				requestTimeoutId = setRequestTimeout(req, reject, effectiveRequestTimeout, config.throwOnRequestTimeout, config.logger ?? console);
				socketTimeoutId = setSocketTimeout(req, reject, config.socketTimeout);
				const httpAgent = nodeHttpsOptions.agent;
				if (typeof httpAgent === "object" && "keepAlive" in httpAgent) keepAliveTimeoutId = setSocketKeepAlive(req, {
					keepAlive: httpAgent.keepAlive,
					keepAliveMsecs: httpAgent.keepAliveMsecs
				});
				writeRequestBodyPromise = writeRequestBody(req, request, effectiveRequestTimeout, this.externalAgent).catch((e) => {
					clearTimeouts();
					return _reject(e);
				});
			});
		}
		updateHttpClientConfig(key, value) {
			this.config = void 0;
			this.configProvider = this.configProvider.then((config) => {
				return {
					...config,
					[key]: value
				};
			});
		}
		httpHandlerConfigs() {
			return this.config ?? {};
		}
		resolveDefaultConfig(options) {
			const { requestTimeout, connectionTimeout, socketTimeout, socketAcquisitionWarningTimeout, httpAgent, httpsAgent, throwOnRequestTimeout, logger } = options || {};
			const keepAlive = true;
			const maxSockets = 50;
			return {
				connectionTimeout,
				requestTimeout,
				socketTimeout,
				socketAcquisitionWarningTimeout,
				throwOnRequestTimeout,
				httpAgentProvider: async () => {
					const node_http = await import("node:http");
					const { Agent, request } = node_http.default ?? node_http;
					hRequest = request;
					hAgent = Agent;
					if (httpAgent instanceof hAgent || typeof httpAgent?.destroy === "function") {
						this.externalAgent = true;
						return httpAgent;
					}
					return new hAgent({
						keepAlive,
						maxSockets,
						...httpAgent
					});
				},
				httpsAgent: (() => {
					if (httpsAgent instanceof node_https.Agent || typeof httpsAgent?.destroy === "function") {
						this.externalAgent = true;
						return httpsAgent;
					}
					return new node_https.Agent({
						keepAlive,
						maxSockets,
						...httpsAgent
					});
				})(),
				logger
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/node-http2.js
var init_node_http2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/http2/ClientHttp2SessionRef.js
var ids, ClientHttp2SessionRef;
var init_ClientHttp2SessionRef = __esmMin((() => {
	ids = new Uint16Array(1);
	ClientHttp2SessionRef = class {
		id = ids[0]++;
		total = 0;
		max = 0;
		session;
		refs = 0;
		constructor(session) {
			session.unref();
			this.session = session;
		}
		retain() {
			if (this.session.destroyed) throw new Error("@smithy/node-http-handler - cannot acquire reference to destroyed session.");
			this.refs += 1;
			this.total += 1;
			this.max = Math.max(this.refs, this.max);
			this.session.ref();
		}
		free() {
			if (this.session.destroyed) return;
			this.refs -= 1;
			if (this.refs === 0) this.session.unref();
			if (this.refs < 0) throw new Error("@smithy/node-http-handler - ClientHttp2Session refcount at zero, cannot decrement.");
		}
		deref() {
			return this.session;
		}
		close() {
			if (!this.session.closed) this.session.close();
		}
		destroy() {
			this.refs = 0;
			if (!this.session.destroyed) this.session.destroy();
		}
		useCount() {
			return this.refs;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/node-http2-connection-pool.js
var NodeHttp2ConnectionPool;
var init_node_http2_connection_pool = __esmMin((() => {
	init_ClientHttp2SessionRef();
	NodeHttp2ConnectionPool = class {
		sessions = [];
		maxConcurrency = 0;
		constructor(sessions) {
			this.sessions = (sessions ?? []).map((session) => new ClientHttp2SessionRef(session));
		}
		poll() {
			let cleanup = false;
			for (const session of this.sessions) {
				if (session.deref().destroyed) {
					cleanup = true;
					continue;
				}
				if (!this.maxConcurrency || session.useCount() < this.maxConcurrency) return session;
			}
			if (cleanup) {
				for (const session of this.sessions) if (session.deref().destroyed) this.remove(session);
			}
		}
		offerLast(ref) {
			this.sessions.push(ref);
		}
		remove(ref) {
			const ix = this.sessions.indexOf(ref);
			if (ix > -1) this.sessions.splice(ix, 1);
		}
		[Symbol.iterator]() {
			return this.sessions[Symbol.iterator]();
		}
		setMaxConcurrency(maxConcurrency) {
			this.maxConcurrency = maxConcurrency;
		}
		destroy(ref) {
			this.remove(ref);
			ref.destroy();
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/node-http2-connection-manager.js
var NodeHttp2ConnectionManager;
var init_node_http2_connection_manager = __esmMin((() => {
	init_ClientHttp2SessionRef();
	init_node_http2_connection_pool();
	NodeHttp2ConnectionManager = class {
		config;
		connectOptions;
		connectionPools = /* @__PURE__ */ new Map();
		constructor(config) {
			this.config = config;
			if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrency must be greater than zero.");
		}
		lease(requestContext, connectionConfiguration) {
			const url = this.getUrlString(requestContext);
			const pool = this.getPool(url);
			if (!this.config.disableConcurrency && !connectionConfiguration.isEventStream) {
				const available = pool.poll();
				if (available) {
					available.retain();
					return available;
				}
			}
			const ref = new ClientHttp2SessionRef(this.connect(url));
			const session = ref.deref();
			if (this.config.maxConcurrency) session.settings({ maxConcurrentStreams: this.config.maxConcurrency }, (err) => {
				if (err) throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + requestContext.destination.toString());
			});
			const graceful = () => {
				this.removeFromPoolAndClose(url, ref);
			};
			const ensureDestroyed = () => {
				this.removeFromPoolAndCheckedDestroy(url, ref);
			};
			session.on("goaway", graceful);
			session.on("error", ensureDestroyed);
			session.on("frameError", ensureDestroyed);
			session.on("close", ensureDestroyed);
			if (connectionConfiguration.requestTimeout) session.setTimeout(connectionConfiguration.requestTimeout, ensureDestroyed);
			pool.offerLast(ref);
			ref.retain();
			return ref;
		}
		release(_requestContext, ref) {
			ref.free();
		}
		createIsolatedSession(requestContext, connectionConfiguration) {
			const url = this.getUrlString(requestContext);
			const ref = new ClientHttp2SessionRef(this.connect(url));
			const session = ref.deref();
			session.settings({ maxConcurrentStreams: 1 });
			const ensureDestroyed = () => {
				ref.destroy();
			};
			session.on("error", ensureDestroyed);
			session.on("frameError", ensureDestroyed);
			session.on("close", ensureDestroyed);
			if (connectionConfiguration.requestTimeout) session.setTimeout(connectionConfiguration.requestTimeout, ensureDestroyed);
			ref.retain();
			return ref;
		}
		destroy() {
			for (const [url, connectionPool] of this.connectionPools) {
				for (const session of [...connectionPool]) session.destroy();
				this.connectionPools.delete(url);
			}
		}
		setMaxConcurrentStreams(maxConcurrentStreams) {
			if (maxConcurrentStreams && maxConcurrentStreams <= 0) throw new RangeError("maxConcurrentStreams must be greater than zero.");
			this.config.maxConcurrency = maxConcurrentStreams;
			for (const pool of this.connectionPools.values()) pool.setMaxConcurrency(maxConcurrentStreams);
		}
		setDisableConcurrentStreams(disableConcurrentStreams) {
			this.config.disableConcurrency = disableConcurrentStreams;
		}
		setNodeHttp2ConnectOptions(nodeHttp2ConnectOptions) {
			this.connectOptions = nodeHttp2ConnectOptions;
		}
		debug() {
			const pools = {};
			for (const [url, pool] of this.connectionPools) {
				const sessions = [];
				for (const ref of pool) sessions.push({
					id: ref.id,
					active: ref.useCount(),
					maxConcurrent: ref.max,
					totalRequests: ref.total
				});
				pools[url] = { sessions };
			}
			return pools;
		}
		removeFromPoolAndClose(authority, ref) {
			this.connectionPools.get(authority)?.remove(ref);
			ref.close();
		}
		removeFromPoolAndCheckedDestroy(authority, ref) {
			this.connectionPools.get(authority)?.remove(ref);
			ref.destroy();
		}
		getPool(url) {
			if (!this.connectionPools.has(url)) {
				const pool = new NodeHttp2ConnectionPool();
				if (this.config.maxConcurrency) pool.setMaxConcurrency(this.config.maxConcurrency);
				this.connectionPools.set(url, pool);
			}
			return this.connectionPools.get(url);
		}
		getUrlString(request) {
			return request.destination.toString();
		}
		connect(url) {
			return this.connectOptions === void 0 ? nodeHTTP2.connect(url) : nodeHTTP2.connect(url, this.connectOptions);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/node-http2-handler.js
var import_protocols$6, constants, NodeHttp2Handler;
var init_node_http2_handler = __esmMin((() => {
	import_protocols$6 = require_protocols$1();
	init_build_abort_error();
	init_get_transformed_headers();
	init_node_http2();
	init_node_http2_connection_manager();
	init_write_request_body();
	({constants} = node_http2);
	NodeHttp2Handler = class NodeHttp2Handler {
		config;
		configProvider;
		metadata = { handlerProtocol: "h2" };
		connectionManager = new NodeHttp2ConnectionManager({});
		static create(instanceOrOptions) {
			if (typeof instanceOrOptions?.handle === "function") return instanceOrOptions;
			return new NodeHttp2Handler(instanceOrOptions);
		}
		constructor(options) {
			this.configProvider = new Promise((resolve, reject) => {
				if (typeof options === "function") options().then((opts) => {
					resolve(opts || {});
				}).catch(reject);
				else resolve(options || {});
			});
		}
		destroy() {
			this.connectionManager.destroy();
		}
		async handle(request, { abortSignal, requestTimeout, isEventStream } = {}) {
			if (!this.config) {
				this.config = await this.configProvider;
				const { disableConcurrentStreams, maxConcurrentStreams, nodeHttp2ConnectOptions } = this.config;
				this.connectionManager.setDisableConcurrentStreams(disableConcurrentStreams ?? false);
				if (maxConcurrentStreams) this.connectionManager.setMaxConcurrentStreams(maxConcurrentStreams);
				if (nodeHttp2ConnectOptions) this.connectionManager.setNodeHttp2ConnectOptions(nodeHttp2ConnectOptions);
			}
			const { requestTimeout: configRequestTimeout, disableConcurrentStreams } = this.config;
			const useIsolatedSession = disableConcurrentStreams || isEventStream;
			const effectiveRequestTimeout = requestTimeout ?? configRequestTimeout;
			return new Promise((_resolve, _reject) => {
				let fulfilled = false;
				let writeRequestBodyPromise = void 0;
				const resolve = async (arg) => {
					await writeRequestBodyPromise;
					_resolve(arg);
				};
				const reject = async (arg) => {
					await writeRequestBodyPromise;
					_reject(arg);
				};
				if (abortSignal?.aborted) {
					fulfilled = true;
					reject(buildAbortError(abortSignal));
					return;
				}
				const { hostname, method, port, protocol, query } = request;
				let auth = "";
				if (request.username != null || request.password != null) auth = `${request.username ?? ""}:${request.password ?? ""}@`;
				const authority = `${protocol}//${auth}${hostname}${port ? `:${port}` : ""}`;
				const requestContext = { destination: new URL(authority) };
				const connectConfig = {
					requestTimeout: this.config?.sessionTimeout,
					isEventStream
				};
				const ref = useIsolatedSession ? this.connectionManager.createIsolatedSession(requestContext, connectConfig) : this.connectionManager.lease(requestContext, connectConfig);
				const session = ref.deref();
				const rejectWithDestroy = (err) => {
					if (useIsolatedSession) ref.destroy();
					fulfilled = true;
					reject(err);
				};
				const queryString = query ? (0, import_protocols$6.buildQueryString)(query) : "";
				let path = request.path;
				if (queryString) path += `?${queryString}`;
				if (request.fragment) path += `#${request.fragment}`;
				const clientHttp2Stream = session.request({
					...request.headers,
					[constants.HTTP2_HEADER_PATH]: path,
					[constants.HTTP2_HEADER_METHOD]: method
				});
				if (effectiveRequestTimeout) clientHttp2Stream.setTimeout(effectiveRequestTimeout, () => {
					clientHttp2Stream.close();
					const timeoutError = /* @__PURE__ */ new Error(`Stream timed out because of no activity for ${effectiveRequestTimeout} ms`);
					timeoutError.name = "TimeoutError";
					rejectWithDestroy(timeoutError);
				});
				if (abortSignal) {
					const onAbort = () => {
						clientHttp2Stream.close();
						rejectWithDestroy(buildAbortError(abortSignal));
					};
					if (typeof abortSignal.addEventListener === "function") {
						const signal = abortSignal;
						signal.addEventListener("abort", onAbort, { once: true });
						clientHttp2Stream.once("close", () => signal.removeEventListener("abort", onAbort));
					} else abortSignal.onabort = onAbort;
				}
				clientHttp2Stream.on("frameError", (type, code, id) => {
					rejectWithDestroy(/* @__PURE__ */ new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
				});
				clientHttp2Stream.on("error", rejectWithDestroy);
				clientHttp2Stream.on("aborted", () => {
					rejectWithDestroy(/* @__PURE__ */ new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${clientHttp2Stream.rstCode}.`));
				});
				clientHttp2Stream.on("response", (headers) => {
					const httpResponse = new import_protocols$6.HttpResponse({
						statusCode: headers[":status"] ?? -1,
						headers: getTransformedHeaders(headers),
						body: clientHttp2Stream
					});
					fulfilled = true;
					resolve({ response: httpResponse });
					if (useIsolatedSession) session.close();
				});
				clientHttp2Stream.on("close", () => {
					if (useIsolatedSession) ref.destroy();
					else this.connectionManager.release(requestContext, ref);
					if (!fulfilled) rejectWithDestroy(/* @__PURE__ */ new Error("Unexpected error: http2 request did not get a response"));
				});
				writeRequestBodyPromise = writeRequestBody(clientHttp2Stream, request, effectiveRequestTimeout);
			});
		}
		updateHttpClientConfig(key, value) {
			this.config = void 0;
			this.configProvider = this.configProvider.then((config) => {
				return {
					...config,
					[key]: value
				};
			});
		}
		httpHandlerConfigs() {
			return this.config ?? {};
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/stream-collector/collector.js
var Collector;
var init_collector = __esmMin((() => {
	Collector = class extends Writable {
		bufferedBytes = [];
		_write(chunk, encoding, callback) {
			this.bufferedBytes.push(chunk);
			callback();
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js
async function collectReadableStream(stream) {
	const chunks = [];
	const reader = stream.getReader();
	let isDone = false;
	let length = 0;
	while (!isDone) {
		const { done, value } = await reader.read();
		if (value) {
			chunks.push(value);
			length += value.length;
		}
		isDone = done;
	}
	const collected = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		collected.set(chunk, offset);
		offset += chunk.length;
	}
	return collected;
}
var streamCollector, isReadableStreamInstance;
var init_stream_collector = __esmMin((() => {
	init_collector();
	streamCollector = (stream) => {
		if (isReadableStreamInstance(stream)) return collectReadableStream(stream);
		return new Promise((resolve, reject) => {
			const collector = new Collector();
			stream.pipe(collector);
			stream.on("error", (err) => {
				collector.end();
				reject(err);
			});
			collector.on("error", reject);
			collector.on("finish", function() {
				resolve(new Uint8Array(Buffer.concat(this.bufferedBytes)));
			});
		});
	};
	isReadableStreamInstance = (stream) => typeof ReadableStream === "function" && stream instanceof ReadableStream;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+node-http-handler@4.8.0/node_modules/@smithy/node-http-handler/dist-es/index.js
var dist_es_exports$2 = /* @__PURE__ */ __exportAll({
	DEFAULT_REQUEST_TIMEOUT: () => 0,
	NodeHttp2Handler: () => NodeHttp2Handler,
	NodeHttpHandler: () => NodeHttpHandler,
	streamCollector: () => streamCollector
});
var init_dist_es$2 = __esmMin((() => {
	init_node_http_handler();
	init_node_http2_handler();
	init_stream_collector();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js
function negate(bytes) {
	for (let i = 0; i < 8; i++) bytes[i] ^= 255;
	for (let i = 7; i > -1; i--) {
		bytes[i]++;
		if (bytes[i] !== 0) break;
	}
}
var HeaderFormatter, HEADER_VALUE_TYPE, UUID_PATTERN, Int64;
var init_HeaderFormatter = __esmMin((() => {
	HeaderFormatter = class {
		format(headers) {
			const chunks = [];
			for (const headerName of Object.keys(headers)) {
				const bytes = (0, import_serde$5.fromUtf8)(headerName);
				chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
			}
			const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
			let position = 0;
			for (const chunk of chunks) {
				out.set(chunk, position);
				position += chunk.byteLength;
			}
			return out;
		}
		formatHeaderValue(header) {
			switch (header.type) {
				case "boolean": return Uint8Array.from([header.value ? 0 : 1]);
				case "byte": return Uint8Array.from([2, header.value]);
				case "short":
					const shortView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(3));
					shortView.setUint8(0, 3);
					shortView.setInt16(1, header.value, false);
					return new Uint8Array(shortView.buffer);
				case "integer":
					const intView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(5));
					intView.setUint8(0, 4);
					intView.setInt32(1, header.value, false);
					return new Uint8Array(intView.buffer);
				case "long":
					const longBytes = new Uint8Array(9);
					longBytes[0] = 5;
					longBytes.set(header.value.bytes, 1);
					return longBytes;
				case "binary":
					const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
					binView.setUint8(0, 6);
					binView.setUint16(1, header.value.byteLength, false);
					const binBytes = new Uint8Array(binView.buffer);
					binBytes.set(header.value, 3);
					return binBytes;
				case "string":
					const utf8Bytes = (0, import_serde$5.fromUtf8)(header.value);
					const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
					strView.setUint8(0, 7);
					strView.setUint16(1, utf8Bytes.byteLength, false);
					const strBytes = new Uint8Array(strView.buffer);
					strBytes.set(utf8Bytes, 3);
					return strBytes;
				case "timestamp":
					const tsBytes = new Uint8Array(9);
					tsBytes[0] = 8;
					tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
					return tsBytes;
				case "uuid":
					if (!UUID_PATTERN.test(header.value)) throw new Error(`Invalid UUID received: ${header.value}`);
					const uuidBytes = new Uint8Array(17);
					uuidBytes[0] = 9;
					uuidBytes.set((0, import_serde$5.fromHex)(header.value.replace(/\-/g, "")), 1);
					return uuidBytes;
			}
		}
	};
	(function(HEADER_VALUE_TYPE) {
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
	})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
	UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
	Int64 = class Int64 {
		bytes;
		constructor(bytes) {
			this.bytes = bytes;
			if (bytes.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
		}
		static fromNumber(number) {
			if (number > 0x8000000000000000 || number < -0x8000000000000000) throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
			const bytes = new Uint8Array(8);
			for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) bytes[i] = remaining;
			if (number < 0) negate(bytes);
			return new Int64(bytes);
		}
		valueOf() {
			const bytes = this.bytes.slice(0);
			const negative = bytes[0] & 128;
			if (negative) negate(bytes);
			return parseInt((0, import_serde$5.toHex)(bytes), 16) * (negative ? -1 : 1);
		}
		toString() {
			return String(this.valueOf());
		}
	};
})), ALGORITHM_QUERY_PARAM, CREDENTIAL_QUERY_PARAM, AMZ_DATE_QUERY_PARAM, SIGNED_HEADERS_QUERY_PARAM, EXPIRES_QUERY_PARAM, SIGNATURE_QUERY_PARAM, TOKEN_QUERY_PARAM, REGION_SET_PARAM, AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER, GENERATED_HEADERS, SIGNATURE_HEADER, SHA256_HEADER, TOKEN_HEADER, HOST_HEADER, ALWAYS_UNSIGNABLE_HEADERS, PROXY_HEADER_PATTERN, SEC_HEADER_PATTERN, UNSIGNABLE_PATTERNS, ALGORITHM_IDENTIFIER, ALGORITHM_IDENTIFIER_V4A, EVENT_ALGORITHM_IDENTIFIER, UNSIGNED_PAYLOAD, KEY_TYPE_IDENTIFIER, MAX_PRESIGNED_TTL;
var init_constants = __esmMin((() => {
	ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
	CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
	AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
	SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
	EXPIRES_QUERY_PARAM = "X-Amz-Expires";
	SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
	TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
	REGION_SET_PARAM = "X-Amz-Region-Set";
	AUTH_HEADER = "authorization";
	AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
	DATE_HEADER = "date";
	GENERATED_HEADERS = [
		AUTH_HEADER,
		AMZ_DATE_HEADER,
		DATE_HEADER
	];
	SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
	SHA256_HEADER = "x-amz-content-sha256";
	TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
	HOST_HEADER = "host";
	ALWAYS_UNSIGNABLE_HEADERS = {
		authorization: true,
		"cache-control": true,
		connection: true,
		expect: true,
		from: true,
		"keep-alive": true,
		"max-forwards": true,
		pragma: true,
		referer: true,
		te: true,
		trailer: true,
		"transfer-encoding": true,
		upgrade: true,
		"user-agent": true,
		"x-amzn-trace-id": true
	};
	PROXY_HEADER_PATTERN = /^proxy-/;
	SEC_HEADER_PATTERN = /^sec-/;
	UNSIGNABLE_PATTERNS = [/^proxy-/i, /^sec-/i];
	ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
	ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
	EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
	UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
	KEY_TYPE_IDENTIFIER = "aws4_request";
	MAX_PRESIGNED_TTL = 3600 * 24 * 7;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js
var import_protocols$5, getCanonicalQuery;
var init_getCanonicalQuery = __esmMin((() => {
	import_protocols$5 = require_protocols$1();
	init_constants();
	getCanonicalQuery = ({ query = {} }) => {
		const keys = [];
		const serialized = {};
		for (const key of Object.keys(query)) {
			if (key.toLowerCase() === "x-amz-signature") continue;
			const encodedKey = (0, import_protocols$5.escapeUri)(key);
			keys.push(encodedKey);
			const value = query[key];
			if (typeof value === "string") serialized[encodedKey] = `${encodedKey}=${(0, import_protocols$5.escapeUri)(value)}`;
			else if (Array.isArray(value)) serialized[encodedKey] = value.slice(0).reduce((encoded, value) => encoded.concat([`${encodedKey}=${(0, import_protocols$5.escapeUri)(value)}`]), []).sort().join("&");
		}
		return keys.sort().map((key) => serialized[key]).filter((serialized) => serialized).join("&");
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/utilDate.js
var iso8601, toDate;
var init_utilDate = __esmMin((() => {
	iso8601 = (time) => toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z");
	toDate = (time) => {
		if (typeof time === "number") return /* @__PURE__ */ new Date(time * 1e3);
		if (typeof time === "string") {
			if (Number(time)) return /* @__PURE__ */ new Date(Number(time) * 1e3);
			return new Date(time);
		}
		return time;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js
var import_protocols$4, import_serde$4, SignatureV4Base;
var init_SignatureV4Base = __esmMin((() => {
	import_protocols$4 = require_protocols$1();
	import_serde$4 = require_serde();
	init_getCanonicalQuery();
	init_utilDate();
	SignatureV4Base = class {
		service;
		regionProvider;
		credentialProvider;
		sha256;
		uriEscapePath;
		applyChecksum;
		constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
			this.service = service;
			this.sha256 = sha256;
			this.uriEscapePath = uriEscapePath;
			this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
			this.regionProvider = (0, import_client$1.normalizeProvider)(region);
			this.credentialProvider = (0, import_client$1.normalizeProvider)(credentials);
		}
		createCanonicalRequest(request, canonicalHeaders, payloadHash) {
			const sortedHeaders = Object.keys(canonicalHeaders).sort();
			return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
		}
		async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
			const hash = new this.sha256();
			hash.update((0, import_serde$4.toUint8Array)(canonicalRequest));
			return `${algorithmIdentifier}
${longDate}
${credentialScope}
${(0, import_serde$4.toHex)(await hash.digest())}`;
		}
		getCanonicalPath({ path }) {
			if (this.uriEscapePath) {
				const normalizedPathSegments = [];
				for (const pathSegment of path.split("/")) {
					if (pathSegment?.length === 0) continue;
					if (pathSegment === ".") continue;
					if (pathSegment === "..") normalizedPathSegments.pop();
					else normalizedPathSegments.push(pathSegment);
				}
				return (0, import_protocols$4.escapeUri)(`${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`).replace(/%2F/g, "/");
			}
			return path;
		}
		validateResolvedCredentials(credentials) {
			if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid");
		}
		formatDate(now) {
			const longDate = iso8601(now).replace(/[\-:]/g, "");
			return {
				longDate,
				shortDate: longDate.slice(0, 8)
			};
		}
		getCanonicalHeaderList(headers) {
			return Object.keys(headers).sort().join(";");
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js
var import_serde$3, signingKeyCache, cacheQueue, createScope, getSigningKey, clearCredentialCache, hmac;
var init_credentialDerivation = __esmMin((() => {
	import_serde$3 = require_serde();
	init_constants();
	signingKeyCache = {};
	cacheQueue = [];
	createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
	getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
		const cacheKey = `${shortDate}:${region}:${service}:${(0, import_serde$3.toHex)(await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId))}:${credentials.sessionToken}`;
		if (cacheKey in signingKeyCache) return signingKeyCache[cacheKey];
		cacheQueue.push(cacheKey);
		while (cacheQueue.length > 50) delete signingKeyCache[cacheQueue.shift()];
		let key = `AWS4${credentials.secretAccessKey}`;
		for (const signable of [
			shortDate,
			region,
			service,
			KEY_TYPE_IDENTIFIER
		]) key = await hmac(sha256Constructor, key, signable);
		return signingKeyCache[cacheKey] = key;
	};
	clearCredentialCache = () => {
		cacheQueue.length = 0;
		Object.keys(signingKeyCache).forEach((cacheKey) => {
			delete signingKeyCache[cacheKey];
		});
	};
	hmac = (ctor, secret, data) => {
		const hash = new ctor(secret);
		hash.update((0, import_serde$3.toUint8Array)(data));
		return hash.digest();
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js
var getCanonicalHeaders;
var init_getCanonicalHeaders = __esmMin((() => {
	init_constants();
	getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
		const canonical = {};
		for (const headerName of Object.keys(headers).sort()) {
			if (headers[headerName] == void 0) continue;
			const canonicalHeaderName = headerName.toLowerCase();
			if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || unsignableHeaders?.has(canonicalHeaderName) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
				if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) continue;
			}
			canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
		}
		return canonical;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js
var import_serde$2, getPayloadHash;
var init_getPayloadHash = __esmMin((() => {
	import_serde$2 = require_serde();
	init_constants();
	getPayloadHash = async ({ headers, body }, hashConstructor) => {
		for (const headerName of Object.keys(headers)) if (headerName.toLowerCase() === "x-amz-content-sha256") return headers[headerName];
		if (body == void 0) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
		else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, import_serde$2.isArrayBuffer)(body)) {
			const hashCtor = new hashConstructor();
			hashCtor.update((0, import_serde$2.toUint8Array)(body));
			return (0, import_serde$2.toHex)(await hashCtor.digest());
		}
		return UNSIGNED_PAYLOAD;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/headerUtil.js
var hasHeader;
var init_headerUtil = __esmMin((() => {
	hasHeader = (soughtHeader, headers) => {
		soughtHeader = soughtHeader.toLowerCase();
		for (const headerName of Object.keys(headers)) if (soughtHeader === headerName.toLowerCase()) return true;
		return false;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js
var import_protocols$3, moveHeadersToQuery;
var init_moveHeadersToQuery = __esmMin((() => {
	import_protocols$3 = require_protocols$1();
	moveHeadersToQuery = (request, options = {}) => {
		const { headers, query = {} } = import_protocols$3.HttpRequest.clone(request);
		for (const name of Object.keys(headers)) {
			const lname = name.toLowerCase();
			if (lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname) || options.hoistableHeaders?.has(lname)) {
				query[name] = headers[name];
				delete headers[name];
			}
		}
		return {
			...request,
			headers,
			query
		};
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/prepareRequest.js
var import_protocols$2, prepareRequest;
var init_prepareRequest = __esmMin((() => {
	import_protocols$2 = require_protocols$1();
	init_constants();
	prepareRequest = (request) => {
		request = import_protocols$2.HttpRequest.clone(request);
		for (const headerName of Object.keys(request.headers)) if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) delete request.headers[headerName];
		return request;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/SignatureV4.js
var import_serde$1, SignatureV4;
var init_SignatureV4 = __esmMin((() => {
	import_serde$1 = require_serde();
	init_HeaderFormatter();
	init_SignatureV4Base();
	init_constants();
	init_credentialDerivation();
	init_getCanonicalHeaders();
	init_getPayloadHash();
	init_headerUtil();
	init_moveHeadersToQuery();
	init_prepareRequest();
	SignatureV4 = class extends SignatureV4Base {
		headerFormatter = new HeaderFormatter();
		constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
			super({
				applyChecksum,
				credentials,
				region,
				service,
				sha256,
				uriEscapePath
			});
		}
		async presign(originalRequest, options = {}) {
			const { signingDate = /* @__PURE__ */ new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService } = options;
			const credentials = await this.credentialProvider();
			this.validateResolvedCredentials(credentials);
			const region = signingRegion ?? await this.regionProvider();
			const { longDate, shortDate } = this.formatDate(signingDate);
			if (expiresIn > 604800) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
			const scope = createScope(shortDate, region, signingService ?? this.service);
			const request = moveHeadersToQuery(prepareRequest(originalRequest), {
				unhoistableHeaders,
				hoistableHeaders
			});
			if (credentials.sessionToken) request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
			request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
			request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
			request.query[AMZ_DATE_QUERY_PARAM] = longDate;
			request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
			const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
			request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
			request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
			return request;
		}
		async sign(toSign, options) {
			if (typeof toSign === "string") return this.signString(toSign, options);
			else if (toSign.headers && toSign.payload) return this.signEvent(toSign, options);
			else if (toSign.message) return this.signMessage(toSign, options);
			else return this.signRequest(toSign, options);
		}
		async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService, eventStreamCredentials }) {
			const region = signingRegion ?? await this.regionProvider();
			const { shortDate, longDate } = this.formatDate(signingDate);
			const scope = createScope(shortDate, region, signingService ?? this.service);
			const hashedPayload = await getPayloadHash({
				headers: {},
				body: payload
			}, this.sha256);
			const hash = new this.sha256();
			hash.update(headers);
			const stringToSign = [
				EVENT_ALGORITHM_IDENTIFIER,
				longDate,
				scope,
				priorSignature,
				(0, import_serde$1.toHex)(await hash.digest()),
				hashedPayload
			].join("\n");
			return this.signString(stringToSign, {
				signingDate,
				signingRegion: region,
				signingService,
				eventStreamCredentials
			});
		}
		async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, eventStreamCredentials }) {
			return this.signEvent({
				headers: this.headerFormatter.format(signableMessage.message.headers),
				payload: signableMessage.message.body
			}, {
				signingDate,
				signingRegion,
				signingService,
				priorSignature: signableMessage.priorSignature,
				eventStreamCredentials
			}).then((signature) => {
				return {
					message: signableMessage.message,
					signature
				};
			});
		}
		async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, eventStreamCredentials } = {}) {
			const credentials = eventStreamCredentials ?? await this.credentialProvider();
			this.validateResolvedCredentials(credentials);
			const region = signingRegion ?? await this.regionProvider();
			const { shortDate } = this.formatDate(signingDate);
			const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
			hash.update((0, import_serde$1.toUint8Array)(stringToSign));
			return (0, import_serde$1.toHex)(await hash.digest());
		}
		async signRequest(requestToSign, { signingDate = /* @__PURE__ */ new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
			const credentials = await this.credentialProvider();
			this.validateResolvedCredentials(credentials);
			const region = signingRegion ?? await this.regionProvider();
			const request = prepareRequest(requestToSign);
			const { longDate, shortDate } = this.formatDate(signingDate);
			const scope = createScope(shortDate, region, signingService ?? this.service);
			request.headers[AMZ_DATE_HEADER] = longDate;
			if (credentials.sessionToken) request.headers[TOKEN_HEADER] = credentials.sessionToken;
			const payloadHash = await getPayloadHash(request, this.sha256);
			if (!hasHeader("x-amz-content-sha256", request.headers) && this.applyChecksum) request.headers[SHA256_HEADER] = payloadHash;
			const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
			const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
			request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
			return request;
		}
		async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
			const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
			const hash = new this.sha256(await keyPromise);
			hash.update((0, import_serde$1.toUint8Array)(stringToSign));
			return (0, import_serde$1.toHex)(await hash.digest());
		}
		getSigningKey(credentials, region, shortDate, service) {
			return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/signature-v4a-container.js
var signatureV4aContainer;
var init_signature_v4a_container = __esmMin((() => {
	signatureV4aContainer = { SignatureV4a: null };
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+signature-v4@5.5.0/node_modules/@smithy/signature-v4/dist-es/index.js
var dist_es_exports$1 = /* @__PURE__ */ __exportAll({
	ALGORITHM_IDENTIFIER: () => ALGORITHM_IDENTIFIER,
	ALGORITHM_IDENTIFIER_V4A: () => ALGORITHM_IDENTIFIER_V4A,
	ALGORITHM_QUERY_PARAM: () => ALGORITHM_QUERY_PARAM,
	ALWAYS_UNSIGNABLE_HEADERS: () => ALWAYS_UNSIGNABLE_HEADERS,
	AMZ_DATE_HEADER: () => AMZ_DATE_HEADER,
	AMZ_DATE_QUERY_PARAM: () => AMZ_DATE_QUERY_PARAM,
	AUTH_HEADER: () => AUTH_HEADER,
	CREDENTIAL_QUERY_PARAM: () => CREDENTIAL_QUERY_PARAM,
	DATE_HEADER: () => DATE_HEADER,
	EVENT_ALGORITHM_IDENTIFIER: () => EVENT_ALGORITHM_IDENTIFIER,
	EXPIRES_QUERY_PARAM: () => EXPIRES_QUERY_PARAM,
	GENERATED_HEADERS: () => GENERATED_HEADERS,
	HOST_HEADER: () => HOST_HEADER,
	KEY_TYPE_IDENTIFIER: () => KEY_TYPE_IDENTIFIER,
	MAX_CACHE_SIZE: () => 50,
	MAX_PRESIGNED_TTL: () => MAX_PRESIGNED_TTL,
	PROXY_HEADER_PATTERN: () => PROXY_HEADER_PATTERN,
	REGION_SET_PARAM: () => REGION_SET_PARAM,
	SEC_HEADER_PATTERN: () => SEC_HEADER_PATTERN,
	SHA256_HEADER: () => SHA256_HEADER,
	SIGNATURE_HEADER: () => SIGNATURE_HEADER,
	SIGNATURE_QUERY_PARAM: () => SIGNATURE_QUERY_PARAM,
	SIGNED_HEADERS_QUERY_PARAM: () => SIGNED_HEADERS_QUERY_PARAM,
	SignatureV4: () => SignatureV4,
	SignatureV4Base: () => SignatureV4Base,
	TOKEN_HEADER: () => TOKEN_HEADER,
	TOKEN_QUERY_PARAM: () => TOKEN_QUERY_PARAM,
	UNSIGNABLE_PATTERNS: () => UNSIGNABLE_PATTERNS,
	UNSIGNED_PAYLOAD: () => UNSIGNED_PAYLOAD,
	clearCredentialCache: () => clearCredentialCache,
	createScope: () => createScope,
	getCanonicalHeaders: () => getCanonicalHeaders,
	getCanonicalQuery: () => getCanonicalQuery,
	getPayloadHash: () => getPayloadHash,
	getSigningKey: () => getSigningKey,
	hasHeader: () => hasHeader,
	moveHeadersToQuery: () => moveHeadersToQuery,
	prepareRequest: () => prepareRequest,
	signatureV4aContainer: () => signatureV4aContainer
});
var init_dist_es$1 = __esmMin((() => {
	init_SignatureV4();
	init_constants();
	init_getCanonicalHeaders();
	init_getCanonicalQuery();
	init_getPayloadHash();
	init_moveHeadersToQuery();
	init_prepareRequest();
	init_credentialDerivation();
	init_SignatureV4Base();
	init_headerUtil();
	init_signature_v4a_container();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+core@3.974.21/node_modules/@aws-sdk/core/dist-cjs/submodules/httpAuthSchemes/index.js
var require_httpAuthSchemes = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { HttpResponse, HttpRequest } = require_protocols$1();
	var { normalizeProvider, memoizeIdentityProvider, isIdentityExpired, doesIdentityRequireRefresh } = require_dist_cjs();
	var { ProviderError } = require_config();
	var { setCredentialFeature } = require_client();
	var { SignatureV4 } = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var getDateHeader = (response) => HttpResponse.isInstance(response) ? response.headers?.date ?? response.headers?.Date : void 0;
	var getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);
	var isClockSkewed = (clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 3e5;
	var getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset) => {
		const clockTimeInMs = Date.parse(clockTime);
		if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) return clockTimeInMs - Date.now();
		return currentSystemClockOffset;
	};
	var throwSigningPropertyError = (name, property) => {
		if (!property) throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
		return property;
	};
	var validateSigningProperties = async (signingProperties) => {
		const context = throwSigningPropertyError("context", signingProperties.context);
		const config = throwSigningPropertyError("config", signingProperties.config);
		const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
		return {
			config,
			signer: await throwSigningPropertyError("signer", config.signer)(authScheme),
			signingRegion: signingProperties?.signingRegion,
			signingRegionSet: signingProperties?.signingRegionSet,
			signingName: signingProperties?.signingName
		};
	};
	var AwsSdkSigV4Signer = class {
		async sign(httpRequest, identity, signingProperties) {
			if (!HttpRequest.isInstance(httpRequest)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
			const validatedProps = await validateSigningProperties(signingProperties);
			const { config, signer } = validatedProps;
			let { signingRegion, signingName } = validatedProps;
			const handlerExecutionContext = signingProperties.context;
			if (handlerExecutionContext?.authSchemes?.length ?? false) {
				const [first, second] = handlerExecutionContext.authSchemes;
				if (first?.name === "sigv4a" && second?.name === "sigv4") {
					signingRegion = second?.signingRegion ?? signingRegion;
					signingName = second?.signingName ?? signingName;
				}
			}
			signingProperties._preRequestSystemClockOffset = config.systemClockOffset;
			return await signer.sign(httpRequest, {
				signingDate: getSkewCorrectedDate(config.systemClockOffset),
				signingRegion,
				signingService: signingName
			});
		}
		errorHandler(signingProperties) {
			return (error) => {
				const errorException = error;
				const serverTime = errorException.ServerTime ?? getDateHeader(errorException.$response);
				if (serverTime) {
					const config = throwSigningPropertyError("config", signingProperties.config);
					const preRequestOffset = signingProperties._preRequestSystemClockOffset;
					const newOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
					if ((newOffset !== config.systemClockOffset || preRequestOffset !== void 0 && preRequestOffset !== newOffset) && errorException.$metadata) {
						config.systemClockOffset = newOffset;
						errorException.$metadata.clockSkewCorrected = true;
					}
				}
				throw error;
			};
		}
		successHandler(httpResponse, signingProperties) {
			const dateHeader = getDateHeader(httpResponse);
			if (dateHeader) {
				const config = throwSigningPropertyError("config", signingProperties.config);
				config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
			}
		}
	};
	var AWSSDKSigV4Signer = AwsSdkSigV4Signer;
	var AwsSdkSigV4ASigner = class extends AwsSdkSigV4Signer {
		async sign(httpRequest, identity, signingProperties) {
			if (!HttpRequest.isInstance(httpRequest)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
			const { config, signer, signingRegion, signingRegionSet, signingName } = await validateSigningProperties(signingProperties);
			const multiRegionOverride = (await config.sigv4aSigningRegionSet?.() ?? signingRegionSet ?? [signingRegion]).join(",");
			signingProperties._preRequestSystemClockOffset = config.systemClockOffset;
			return await signer.sign(httpRequest, {
				signingDate: getSkewCorrectedDate(config.systemClockOffset),
				signingRegion: multiRegionOverride,
				signingService: signingName
			});
		}
	};
	var getArrayForCommaSeparatedString = (str) => typeof str === "string" && str.length > 0 ? str.split(",").map((item) => item.trim()) : [];
	var getBearerTokenEnvKey = (signingName) => `AWS_BEARER_TOKEN_${signingName.replace(/[\s-]/g, "_").toUpperCase()}`;
	var NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY = "AWS_AUTH_SCHEME_PREFERENCE";
	var NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY = "auth_scheme_preference";
	var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = {
		environmentVariableSelector: (env, options) => {
			if (options?.signingName) {
				if (getBearerTokenEnvKey(options.signingName) in env) return ["httpBearerAuth"];
			}
			if (!(NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY in env)) return void 0;
			return getArrayForCommaSeparatedString(env[NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY]);
		},
		configFileSelector: (profile) => {
			if (!(NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY in profile)) return void 0;
			return getArrayForCommaSeparatedString(profile[NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY]);
		},
		default: []
	};
	var resolveAwsSdkSigV4AConfig = (config) => {
		config.sigv4aSigningRegionSet = normalizeProvider(config.sigv4aSigningRegionSet);
		return config;
	};
	var NODE_SIGV4A_CONFIG_OPTIONS = {
		environmentVariableSelector(env) {
			if (env.AWS_SIGV4A_SIGNING_REGION_SET) return env.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((_) => _.trim());
			throw new ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", { tryNextLink: true });
		},
		configFileSelector(profile) {
			if (profile.sigv4a_signing_region_set) return (profile.sigv4a_signing_region_set ?? "").split(",").map((_) => _.trim());
			throw new ProviderError("sigv4a_signing_region_set not set in profile.", { tryNextLink: true });
		},
		default: void 0
	};
	var resolveAwsSdkSigV4Config = (config) => {
		let inputCredentials = config.credentials;
		let isUserSupplied = !!config.credentials;
		let resolvedCredentials = void 0;
		Object.defineProperty(config, "credentials", {
			set(credentials) {
				if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) isUserSupplied = true;
				inputCredentials = credentials;
				const boundProvider = bindCallerConfig(config, normalizeCredentialProvider(config, {
					credentials: inputCredentials,
					credentialDefaultProvider: config.credentialDefaultProvider
				}));
				if (isUserSupplied && !boundProvider.attributed) {
					const isCredentialObject = typeof inputCredentials === "object" && inputCredentials !== null;
					resolvedCredentials = async (options) => {
						const attributedCreds = await boundProvider(options);
						if (isCredentialObject && (!attributedCreds.$source || Object.keys(attributedCreds.$source).length === 0)) return setCredentialFeature(attributedCreds, "CREDENTIALS_CODE", "e");
						return attributedCreds;
					};
					resolvedCredentials.memoized = boundProvider.memoized;
					resolvedCredentials.configBound = boundProvider.configBound;
					resolvedCredentials.attributed = true;
				} else resolvedCredentials = boundProvider;
			},
			get() {
				return resolvedCredentials;
			},
			enumerable: true,
			configurable: true
		});
		config.credentials = inputCredentials;
		const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256 } = config;
		let signer;
		if (config.signer) signer = normalizeProvider(config.signer);
		else if (config.regionInfoProvider) signer = () => normalizeProvider(config.region)().then(async (region) => [await config.regionInfoProvider(region, {
			useFipsEndpoint: await config.useFipsEndpoint(),
			useDualstackEndpoint: await config.useDualstackEndpoint()
		}) || {}, region]).then(([regionInfo, region]) => {
			const { signingRegion, signingService } = regionInfo;
			config.signingRegion = config.signingRegion || signingRegion || region;
			config.signingName = config.signingName || signingService || config.serviceId;
			const params = {
				...config,
				credentials: config.credentials,
				region: config.signingRegion,
				service: config.signingName,
				sha256,
				uriEscapePath: signingEscapePath
			};
			return new (config.signerConstructor || SignatureV4)(params);
		});
		else signer = async (authScheme) => {
			authScheme = Object.assign({}, {
				name: "sigv4",
				signingName: config.signingName || config.defaultSigningName,
				signingRegion: await normalizeProvider(config.region)(),
				properties: {}
			}, authScheme);
			const signingRegion = authScheme.signingRegion;
			const signingService = authScheme.signingName;
			config.signingRegion = config.signingRegion || signingRegion;
			config.signingName = config.signingName || signingService || config.serviceId;
			const params = {
				...config,
				credentials: config.credentials,
				region: config.signingRegion,
				service: config.signingName,
				sha256,
				uriEscapePath: signingEscapePath
			};
			return new (config.signerConstructor || SignatureV4)(params);
		};
		return Object.assign(config, {
			systemClockOffset,
			signingEscapePath,
			signer
		});
	};
	var resolveAWSSDKSigV4Config = resolveAwsSdkSigV4Config;
	function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider }) {
		let credentialsProvider;
		if (credentials) if (!credentials?.memoized) credentialsProvider = memoizeIdentityProvider(credentials, isIdentityExpired, doesIdentityRequireRefresh);
		else credentialsProvider = credentials;
		else if (credentialDefaultProvider) credentialsProvider = normalizeProvider(credentialDefaultProvider(Object.assign({}, config, { parentClientConfig: config })));
		else credentialsProvider = async () => {
			throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
		};
		credentialsProvider.memoized = true;
		return credentialsProvider;
	}
	function bindCallerConfig(config, credentialsProvider) {
		if (credentialsProvider.configBound) return credentialsProvider;
		const fn = async (options) => credentialsProvider({
			...options,
			callerClientConfig: config
		});
		fn.memoized = credentialsProvider.memoized;
		fn.configBound = true;
		return fn;
	}
	exports.AWSSDKSigV4Signer = AWSSDKSigV4Signer;
	exports.AwsSdkSigV4ASigner = AwsSdkSigV4ASigner;
	exports.AwsSdkSigV4Signer = AwsSdkSigV4Signer;
	exports.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = NODE_AUTH_SCHEME_PREFERENCE_OPTIONS;
	exports.NODE_SIGV4A_CONFIG_OPTIONS = NODE_SIGV4A_CONFIG_OPTIONS;
	exports.getBearerTokenEnvKey = getBearerTokenEnvKey;
	exports.resolveAWSSDKSigV4Config = resolveAWSSDKSigV4Config;
	exports.resolveAwsSdkSigV4AConfig = resolveAwsSdkSigV4AConfig;
	exports.resolveAwsSdkSigV4Config = resolveAwsSdkSigV4Config;
	exports.validateSigningProperties = validateSigningProperties;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/cbor/index.js
var require_cbor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { nv, toUtf8, fromUtf8, NumericValue, calculateBodyLength, _parseEpochTimestamp, fromBase64, generateIdempotencyToken } = require_serde();
	var { HttpRequest, collectBody, SerdeContext, RpcProtocol } = require_protocols$1();
	var { NormalizedSchema, deref, TypeRegistry } = require_schema();
	var { getSmithyContext } = require_transport();
	var majorUint64 = 0;
	var majorNegativeInt64 = 1;
	var majorUnstructuredByteString = 2;
	var majorUtf8String = 3;
	var majorList = 4;
	var majorMap = 5;
	var majorTag = 6;
	var majorSpecial = 7;
	var specialFalse = 20;
	var specialTrue = 21;
	var specialNull = 22;
	var specialUndefined = 23;
	var extendedOneByte = 24;
	var extendedFloat16 = 25;
	var extendedFloat32 = 26;
	var extendedFloat64 = 27;
	var minorIndefinite = 31;
	function alloc(size) {
		return typeof Buffer !== "undefined" ? Buffer.alloc(size) : new Uint8Array(size);
	}
	var tagSymbol = Symbol("@smithy/core/cbor::tagSymbol");
	function tag(data) {
		data[tagSymbol] = true;
		return data;
	}
	var USE_TEXT_DECODER = typeof TextDecoder !== "undefined";
	var USE_BUFFER$1 = typeof Buffer !== "undefined";
	var payload = alloc(0);
	var dataView$1 = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
	var textDecoder = USE_TEXT_DECODER ? new TextDecoder() : null;
	var _offset = 0;
	function setPayload(bytes) {
		payload = bytes;
		dataView$1 = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
	}
	function decode(at, to) {
		if (at >= to) throw new Error("unexpected end of (decode) payload.");
		const major = (payload[at] & 224) >> 5;
		const minor = payload[at] & 31;
		switch (major) {
			case majorUint64:
			case majorNegativeInt64:
			case majorTag:
				let unsignedInt;
				let offset;
				if (minor < 24) {
					unsignedInt = minor;
					offset = 1;
				} else switch (minor) {
					case extendedOneByte:
					case extendedFloat16:
					case extendedFloat32:
					case extendedFloat64:
						const countLength = minorValueToArgumentLength[minor];
						const countOffset = countLength + 1;
						offset = countOffset;
						if (to - at < countOffset) throw new Error(`countLength ${countLength} greater than remaining buf len.`);
						const countIndex = at + 1;
						if (countLength === 1) unsignedInt = payload[countIndex];
						else if (countLength === 2) unsignedInt = dataView$1.getUint16(countIndex);
						else if (countLength === 4) unsignedInt = dataView$1.getUint32(countIndex);
						else unsignedInt = dataView$1.getBigUint64(countIndex);
						break;
					default: throw new Error(`unexpected minor value ${minor}.`);
				}
				if (major === majorUint64) {
					_offset = offset;
					return castBigInt(unsignedInt);
				} else if (major === majorNegativeInt64) {
					let negativeInt;
					if (typeof unsignedInt === "bigint") negativeInt = BigInt(-1) - unsignedInt;
					else negativeInt = -1 - unsignedInt;
					_offset = offset;
					return castBigInt(negativeInt);
				} else if (minor === 2 || minor === 3) {
					const length = decodeCount(at + offset, to);
					let b = BigInt(0);
					const start = at + offset + _offset;
					for (let i = start; i < start + length; ++i) b = b << BigInt(8) | BigInt(payload[i]);
					_offset = offset + _offset + length;
					return minor === 3 ? -b - BigInt(1) : b;
				} else if (minor === 4) {
					const [exponent, mantissa] = decode(at + offset, to);
					const normalizer = mantissa < 0 ? -1 : 1;
					const mantissaStr = "0".repeat(Math.abs(exponent) + 1) + String(BigInt(normalizer) * BigInt(mantissa));
					let numericString;
					const sign = mantissa < 0 ? "-" : "";
					numericString = exponent === 0 ? mantissaStr : mantissaStr.slice(0, mantissaStr.length + exponent) + "." + mantissaStr.slice(exponent);
					numericString = numericString.replace(/^0+/g, "");
					if (numericString === "") numericString = "0";
					if (numericString[0] === ".") numericString = "0" + numericString;
					numericString = sign + numericString;
					_offset = offset + _offset;
					return nv(numericString);
				} else {
					const value = decode(at + offset, to);
					_offset = offset + _offset;
					return tag({
						tag: castBigInt(unsignedInt),
						value
					});
				}
			case majorUtf8String:
			case majorMap:
			case majorList:
			case majorUnstructuredByteString: if (minor === minorIndefinite) switch (major) {
				case majorUtf8String: return decodeUtf8StringIndefinite(at, to);
				case majorMap: return decodeMapIndefinite(at, to);
				case majorList: return decodeListIndefinite(at, to);
				case majorUnstructuredByteString: return decodeUnstructuredByteStringIndefinite(at, to);
			}
			else switch (major) {
				case majorUtf8String: return decodeUtf8String(at, to);
				case majorMap: return decodeMap(at, to);
				case majorList: return decodeList(at, to);
				case majorUnstructuredByteString: return decodeUnstructuredByteString(at, to);
			}
			default: return decodeSpecial(at, to);
		}
	}
	function bytesToUtf8(bytes, at, to) {
		if (USE_BUFFER$1 && bytes.constructor?.name === "Buffer") return bytes.toString("utf-8", at, to);
		if (textDecoder) return textDecoder.decode(bytes.subarray(at, to));
		return toUtf8(bytes.subarray(at, to));
	}
	function demote(bigInteger) {
		const num = Number(bigInteger);
		if (num < Number.MIN_SAFE_INTEGER || Number.MAX_SAFE_INTEGER < num) console.warn(/* @__PURE__ */ new Error(`@smithy/core/cbor - truncating BigInt(${bigInteger}) to ${num} with loss of precision.`));
		return num;
	}
	var minorValueToArgumentLength = {
		[extendedOneByte]: 1,
		[extendedFloat16]: 2,
		[extendedFloat32]: 4,
		[extendedFloat64]: 8
	};
	function bytesToFloat16(a, b) {
		const sign = a >> 7;
		const exponent = (a & 124) >> 2;
		const fraction = (a & 3) << 8 | b;
		const scalar = sign === 0 ? 1 : -1;
		let exponentComponent;
		let summation;
		if (exponent === 0) if (fraction === 0) return 0;
		else {
			exponentComponent = Math.pow(2, -14);
			summation = 0;
		}
		else if (exponent === 31) if (fraction === 0) return scalar * Infinity;
		else return NaN;
		else {
			exponentComponent = Math.pow(2, exponent - 15);
			summation = 1;
		}
		summation += fraction / 1024;
		return scalar * (exponentComponent * summation);
	}
	function decodeCount(at, to) {
		const minor = payload[at] & 31;
		if (minor < 24) {
			_offset = 1;
			return minor;
		}
		if (minor === extendedOneByte || minor === extendedFloat16 || minor === extendedFloat32 || minor === extendedFloat64) {
			const countLength = minorValueToArgumentLength[minor];
			_offset = countLength + 1;
			if (to - at < _offset) throw new Error(`countLength ${countLength} greater than remaining buf len.`);
			const countIndex = at + 1;
			if (countLength === 1) return payload[countIndex];
			else if (countLength === 2) return dataView$1.getUint16(countIndex);
			else if (countLength === 4) return dataView$1.getUint32(countIndex);
			return demote(dataView$1.getBigUint64(countIndex));
		}
		throw new Error(`unexpected minor value ${minor}.`);
	}
	function decodeUtf8String(at, to) {
		const length = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		if (to - at < length) throw new Error(`string len ${length} greater than remaining buf len.`);
		const value = bytesToUtf8(payload, at, at + length);
		_offset = offset + length;
		return value;
	}
	function decodeUtf8StringIndefinite(at, to) {
		at += 1;
		const vector = [];
		for (const base = at; at < to;) {
			if (payload[at] === 255) {
				const data = alloc(vector.length);
				data.set(vector, 0);
				_offset = at - base + 2;
				return bytesToUtf8(data, 0, data.length);
			}
			const major = (payload[at] & 224) >> 5;
			const minor = payload[at] & 31;
			if (major !== majorUtf8String) throw new Error(`unexpected major type ${major} in indefinite string.`);
			if (minor === minorIndefinite) throw new Error("nested indefinite string.");
			const bytes = decodeUnstructuredByteString(at, to);
			at += _offset;
			for (let i = 0; i < bytes.length; ++i) vector.push(bytes[i]);
		}
		throw new Error("expected break marker.");
	}
	function decodeUnstructuredByteString(at, to) {
		const length = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		if (to - at < length) throw new Error(`unstructured byte string len ${length} greater than remaining buf len.`);
		const value = payload.subarray(at, at + length);
		_offset = offset + length;
		return value;
	}
	function decodeUnstructuredByteStringIndefinite(at, to) {
		at += 1;
		const vector = [];
		for (const base = at; at < to;) {
			if (payload[at] === 255) {
				const data = alloc(vector.length);
				data.set(vector, 0);
				_offset = at - base + 2;
				return data;
			}
			const major = (payload[at] & 224) >> 5;
			const minor = payload[at] & 31;
			if (major !== majorUnstructuredByteString) throw new Error(`unexpected major type ${major} in indefinite string.`);
			if (minor === minorIndefinite) throw new Error("nested indefinite string.");
			const bytes = decodeUnstructuredByteString(at, to);
			at += _offset;
			for (let i = 0; i < bytes.length; ++i) vector.push(bytes[i]);
		}
		throw new Error("expected break marker.");
	}
	function decodeList(at, to) {
		const listDataLength = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		const base = at;
		const list = Array(listDataLength);
		for (let i = 0; i < listDataLength; ++i) {
			const item = decode(at, to);
			const itemOffset = _offset;
			list[i] = item;
			at += itemOffset;
		}
		_offset = offset + (at - base);
		return list;
	}
	function decodeListIndefinite(at, to) {
		at += 1;
		const list = [];
		for (const base = at; at < to;) {
			if (payload[at] === 255) {
				_offset = at - base + 2;
				return list;
			}
			const item = decode(at, to);
			at += _offset;
			list.push(item);
		}
		throw new Error("expected break marker.");
	}
	function decodeMap(at, to) {
		const mapDataLength = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		const base = at;
		const map = {};
		for (let i = 0; i < mapDataLength; ++i) {
			if (at >= to) throw new Error("unexpected end of map payload.");
			const major = (payload[at] & 224) >> 5;
			if (major !== majorUtf8String) throw new Error(`unexpected major type ${major} for map key at index ${at}.`);
			const key = decode(at, to);
			at += _offset;
			const value = decode(at, to);
			at += _offset;
			map[key] = value;
		}
		_offset = offset + (at - base);
		return map;
	}
	function decodeMapIndefinite(at, to) {
		at += 1;
		const base = at;
		const map = {};
		for (; at < to;) {
			if (at >= to) throw new Error("unexpected end of map payload.");
			if (payload[at] === 255) {
				_offset = at - base + 2;
				return map;
			}
			const major = (payload[at] & 224) >> 5;
			if (major !== majorUtf8String) throw new Error(`unexpected major type ${major} for map key.`);
			const key = decode(at, to);
			at += _offset;
			const value = decode(at, to);
			at += _offset;
			map[key] = value;
		}
		throw new Error("expected break marker.");
	}
	function decodeSpecial(at, to) {
		const minor = payload[at] & 31;
		switch (minor) {
			case specialTrue:
			case specialFalse:
				_offset = 1;
				return minor === specialTrue;
			case specialNull:
				_offset = 1;
				return null;
			case specialUndefined:
				_offset = 1;
				return null;
			case extendedFloat16:
				if (to - at < 3) throw new Error("incomplete float16 at end of buf.");
				_offset = 3;
				return bytesToFloat16(payload[at + 1], payload[at + 2]);
			case extendedFloat32:
				if (to - at < 5) throw new Error("incomplete float32 at end of buf.");
				_offset = 5;
				return dataView$1.getFloat32(at + 1);
			case extendedFloat64:
				if (to - at < 9) throw new Error("incomplete float64 at end of buf.");
				_offset = 9;
				return dataView$1.getFloat64(at + 1);
			default: throw new Error(`unexpected minor value ${minor}.`);
		}
	}
	function castBigInt(bigInt) {
		if (typeof bigInt === "number") return bigInt;
		const num = Number(bigInt);
		if (Number.MIN_SAFE_INTEGER <= num && num <= Number.MAX_SAFE_INTEGER) return num;
		return bigInt;
	}
	var USE_BUFFER = typeof Buffer !== "undefined";
	var data = alloc(2048);
	var dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
	var cursor = 0;
	function ensureSpace(bytes) {
		if (data.byteLength - cursor < bytes) if (cursor < 16e6) resize(Math.max(data.byteLength * 4, data.byteLength + bytes));
		else resize(data.byteLength + bytes + 16e6);
	}
	function toUint8Array() {
		const out = alloc(cursor);
		out.set(data.subarray(0, cursor), 0);
		cursor = 0;
		return out;
	}
	function resize(size) {
		const old = data;
		data = alloc(size);
		if (old) if (old.copy) old.copy(data, 0, 0, old.byteLength);
		else data.set(old, 0);
		dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
	}
	function encodeHeader(major, value) {
		if (value < 24) data[cursor++] = major << 5 | value;
		else if (value < 256) {
			data[cursor++] = major << 5 | 24;
			data[cursor++] = value;
		} else if (value < 65536) {
			data[cursor++] = major << 5 | extendedFloat16;
			dataView.setUint16(cursor, value);
			cursor += 2;
		} else if (value < 2 ** 32) {
			data[cursor++] = major << 5 | extendedFloat32;
			dataView.setUint32(cursor, value);
			cursor += 4;
		} else {
			data[cursor++] = major << 5 | extendedFloat64;
			dataView.setBigUint64(cursor, typeof value === "bigint" ? value : BigInt(value));
			cursor += 8;
		}
	}
	function encode(_input) {
		const encodeStack = [_input];
		while (encodeStack.length) {
			const input = encodeStack.pop();
			ensureSpace(typeof input === "string" ? input.length * 4 : 64);
			if (typeof input === "string") {
				if (USE_BUFFER) {
					encodeHeader(majorUtf8String, Buffer.byteLength(input));
					cursor += data.write(input, cursor);
				} else {
					const bytes = fromUtf8(input);
					encodeHeader(majorUtf8String, bytes.byteLength);
					data.set(bytes, cursor);
					cursor += bytes.byteLength;
				}
				continue;
			} else if (typeof input === "number") {
				if (Number.isInteger(input)) {
					const nonNegative = input >= 0;
					const major = nonNegative ? majorUint64 : majorNegativeInt64;
					const value = nonNegative ? input : -input - 1;
					if (value < 24) data[cursor++] = major << 5 | value;
					else if (value < 256) {
						data[cursor++] = major << 5 | 24;
						data[cursor++] = value;
					} else if (value < 65536) {
						data[cursor++] = major << 5 | extendedFloat16;
						data[cursor++] = value >> 8;
						data[cursor++] = value;
					} else if (value < 4294967296) {
						data[cursor++] = major << 5 | extendedFloat32;
						dataView.setUint32(cursor, value);
						cursor += 4;
					} else {
						data[cursor++] = major << 5 | extendedFloat64;
						dataView.setBigUint64(cursor, BigInt(value));
						cursor += 8;
					}
					continue;
				}
				data[cursor++] = 251;
				dataView.setFloat64(cursor, input);
				cursor += 8;
				continue;
			} else if (typeof input === "bigint") {
				const nonNegative = input >= 0;
				const major = nonNegative ? majorUint64 : majorNegativeInt64;
				const value = nonNegative ? input : -input - BigInt(1);
				const n = Number(value);
				if (n < 24) data[cursor++] = major << 5 | n;
				else if (n < 256) {
					data[cursor++] = major << 5 | 24;
					data[cursor++] = n;
				} else if (n < 65536) {
					data[cursor++] = major << 5 | extendedFloat16;
					data[cursor++] = n >> 8;
					data[cursor++] = n & 255;
				} else if (n < 4294967296) {
					data[cursor++] = major << 5 | extendedFloat32;
					dataView.setUint32(cursor, n);
					cursor += 4;
				} else if (value < BigInt("18446744073709551616")) {
					data[cursor++] = major << 5 | extendedFloat64;
					dataView.setBigUint64(cursor, value);
					cursor += 8;
				} else {
					const binaryBigInt = value.toString(2);
					const bigIntBytes = new Uint8Array(Math.ceil(binaryBigInt.length / 8));
					let b = value;
					let i = 0;
					while (bigIntBytes.byteLength - ++i >= 0) {
						bigIntBytes[bigIntBytes.byteLength - i] = Number(b & BigInt(255));
						b >>= BigInt(8);
					}
					ensureSpace(bigIntBytes.byteLength * 2);
					data[cursor++] = nonNegative ? 194 : 195;
					if (USE_BUFFER) encodeHeader(majorUnstructuredByteString, Buffer.byteLength(bigIntBytes));
					else encodeHeader(majorUnstructuredByteString, bigIntBytes.byteLength);
					data.set(bigIntBytes, cursor);
					cursor += bigIntBytes.byteLength;
				}
				continue;
			} else if (input === null) {
				data[cursor++] = 246;
				continue;
			} else if (typeof input === "boolean") {
				data[cursor++] = majorSpecial << 5 | (input ? specialTrue : specialFalse);
				continue;
			} else if (typeof input === "undefined") throw new Error("@smithy/core/cbor: client may not serialize undefined value.");
			else if (Array.isArray(input)) {
				for (let i = input.length - 1; i >= 0; --i) encodeStack.push(input[i]);
				encodeHeader(majorList, input.length);
				continue;
			} else if (typeof input.byteLength === "number") {
				ensureSpace(input.length * 2);
				encodeHeader(majorUnstructuredByteString, input.length);
				data.set(input, cursor);
				cursor += input.byteLength;
				continue;
			} else if (typeof input === "object") {
				if (input instanceof NumericValue) {
					const decimalIndex = input.string.indexOf(".");
					const exponent = decimalIndex === -1 ? 0 : decimalIndex - input.string.length + 1;
					const mantissa = BigInt(input.string.replace(".", ""));
					data[cursor++] = 196;
					encodeStack.push(mantissa);
					encodeStack.push(exponent);
					encodeHeader(majorList, 2);
					continue;
				}
				if (input[tagSymbol]) if ("tag" in input && "value" in input) {
					encodeStack.push(input.value);
					encodeHeader(majorTag, input.tag);
					continue;
				} else throw new Error("tag encountered with missing fields, need 'tag' and 'value', found: " + JSON.stringify(input));
				const keys = Object.keys(input);
				for (let i = keys.length - 1; i >= 0; --i) {
					const key = keys[i];
					encodeStack.push(input[key]);
					encodeStack.push(key);
				}
				encodeHeader(majorMap, keys.length);
				continue;
			}
			throw new Error(`data type ${input?.constructor?.name ?? typeof input} not compatible for encoding.`);
		}
	}
	var cbor = {
		deserialize(payload) {
			setPayload(payload);
			return decode(0, payload.length);
		},
		serialize(input) {
			try {
				encode(input);
				return toUint8Array();
			} catch (e) {
				toUint8Array();
				throw e;
			}
		},
		resizeEncodingBuffer(size) {
			resize(size);
		}
	};
	var parseCborBody = (streamBody, context) => {
		return collectBody(streamBody, context).then(async (bytes) => {
			if (bytes.length) try {
				return cbor.deserialize(bytes);
			} catch (e) {
				Object.defineProperty(e, "$responseBodyText", { value: context.utf8Encoder(bytes) });
				throw e;
			}
			return {};
		});
	};
	var dateToTag = (date) => {
		return tag({
			tag: 1,
			value: date.getTime() / 1e3
		});
	};
	var parseCborErrorBody = async (errorBody, context) => {
		const value = await parseCborBody(errorBody, context);
		value.message = value.message ?? value.Message;
		return value;
	};
	var loadSmithyRpcV2CborErrorCode = (output, data) => {
		const sanitizeErrorCode = (rawValue) => {
			let cleanValue = rawValue;
			if (typeof cleanValue === "number") cleanValue = cleanValue.toString();
			if (cleanValue.indexOf(",") >= 0) cleanValue = cleanValue.split(",")[0];
			if (cleanValue.indexOf(":") >= 0) cleanValue = cleanValue.split(":")[0];
			if (cleanValue.indexOf("#") >= 0) cleanValue = cleanValue.split("#")[1];
			return cleanValue;
		};
		if (data["__type"] !== void 0) return sanitizeErrorCode(data["__type"]);
		let codeKey;
		for (const key in data) if (key.toLowerCase() === "code") {
			codeKey = key;
			break;
		}
		if (codeKey && data[codeKey] !== void 0) return sanitizeErrorCode(data[codeKey]);
	};
	var checkCborResponse = (response) => {
		if (String(response.headers["smithy-protocol"]).toLowerCase() !== "rpc-v2-cbor") throw new Error("Malformed RPCv2 CBOR response, status: " + response.statusCode);
	};
	var buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
		const endpoint = await context.endpoint();
		const { hostname, protocol = "https", port, path: basePath } = endpoint;
		const contents = {
			protocol,
			hostname,
			port,
			method: "POST",
			path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
			headers: { ...headers }
		};
		if (resolvedHostname !== void 0) contents.hostname = resolvedHostname;
		if (endpoint.headers) for (const name in endpoint.headers) contents.headers[name] = endpoint.headers[name];
		if (body !== void 0) {
			contents.body = body;
			try {
				contents.headers["content-length"] = String(calculateBodyLength(body));
			} catch (e) {}
		}
		return new HttpRequest(contents);
	};
	var CborCodec = class extends SerdeContext {
		createSerializer() {
			const serializer = new CborShapeSerializer();
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new CborShapeDeserializer();
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var CborShapeSerializer = class extends SerdeContext {
		value;
		write(schema, value) {
			this.value = this.serialize(schema, value);
		}
		serialize(schema, source) {
			const ns = NormalizedSchema.of(schema);
			if (source == null) {
				if (ns.isIdempotencyToken()) return generateIdempotencyToken();
				return source;
			}
			if (ns.isBlobSchema()) {
				if (typeof source === "string") return (this.serdeContext?.base64Decoder ?? fromBase64)(source);
				return source;
			}
			if (ns.isTimestampSchema()) {
				if (typeof source === "number" || typeof source === "bigint") return dateToTag(/* @__PURE__ */ new Date(Number(source) / 1e3 | 0));
				return dateToTag(source);
			}
			if (typeof source === "function" || typeof source === "object") {
				const sourceObject = source;
				if (ns.isListSchema() && Array.isArray(sourceObject)) {
					const sparse = !!ns.getMergedTraits().sparse;
					const newArray = [];
					let i = 0;
					for (const item of sourceObject) {
						const value = this.serialize(ns.getValueSchema(), item);
						if (value != null || sparse) newArray[i++] = value;
					}
					return newArray;
				}
				if (sourceObject instanceof Date) return dateToTag(sourceObject);
				const newObject = {};
				if (ns.isMapSchema()) {
					const sparse = !!ns.getMergedTraits().sparse;
					for (const key in sourceObject) {
						const value = this.serialize(ns.getValueSchema(), sourceObject[key]);
						if (value != null || sparse) newObject[key] = value;
					}
				} else if (ns.isStructSchema()) {
					for (const [key, memberSchema] of ns.structIterator()) {
						const value = this.serialize(memberSchema, sourceObject[key]);
						if (value != null) newObject[key] = value;
					}
					if (ns.isUnionSchema() && Array.isArray(sourceObject.$unknown)) {
						const [k, v] = sourceObject.$unknown;
						newObject[k] = v;
					} else if (typeof sourceObject.__type === "string") {
						for (const k in sourceObject) if (!(k in newObject)) newObject[k] = this.serialize(15, sourceObject[k]);
					}
				} else if (ns.isDocumentSchema()) for (const key in sourceObject) newObject[key] = this.serialize(ns.getValueSchema(), sourceObject[key]);
				else if (ns.isBigDecimalSchema()) return sourceObject;
				return newObject;
			}
			return source;
		}
		flush() {
			const buffer = cbor.serialize(this.value);
			this.value = void 0;
			return buffer;
		}
	};
	var CborShapeDeserializer = class extends SerdeContext {
		read(schema, bytes) {
			const data = cbor.deserialize(bytes);
			return this.readValue(schema, data);
		}
		readValue(_schema, value) {
			const ns = NormalizedSchema.of(_schema);
			if (ns.isTimestampSchema()) {
				if (typeof value === "number") return _parseEpochTimestamp(value);
				if (typeof value === "object") {
					if (value.tag === 1 && "value" in value) return _parseEpochTimestamp(value.value);
				}
			}
			if (ns.isBlobSchema()) {
				if (typeof value === "string") return (this.serdeContext?.base64Decoder ?? fromBase64)(value);
				return value;
			}
			if (typeof value === "undefined" || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || typeof value === "bigint" || typeof value === "symbol") return value;
			else if (typeof value === "object") {
				if (value === null) return null;
				if ("byteLength" in value) return value;
				if (value instanceof Date) return value;
				if (ns.isDocumentSchema()) return value;
				if (ns.isListSchema()) {
					const newArray = [];
					const memberSchema = ns.getValueSchema();
					for (const item of value) {
						const itemValue = this.readValue(memberSchema, item);
						newArray.push(itemValue);
					}
					return newArray;
				}
				const newObject = {};
				if (ns.isMapSchema()) {
					const targetSchema = ns.getValueSchema();
					for (const key in value) newObject[key] = this.readValue(targetSchema, value[key]);
				} else if (ns.isStructSchema()) {
					const isUnion = ns.isUnionSchema();
					let keys;
					if (isUnion) {
						keys = /* @__PURE__ */ new Set();
						for (const k in value) if (k !== "__type") keys.add(k);
					}
					for (const [key, memberSchema] of ns.structIterator()) {
						if (isUnion) keys.delete(key);
						if (value[key] != null) newObject[key] = this.readValue(memberSchema, value[key]);
					}
					if (isUnion && keys?.size === 1) {
						let newObjectEmpty = true;
						for (const _ in newObject) {
							newObjectEmpty = false;
							break;
						}
						if (newObjectEmpty) {
							const k = keys.values().next().value;
							newObject.$unknown = [k, value[k]];
						}
					} else if (typeof value.__type === "string") {
						for (const k in value) if (!(k in newObject)) newObject[k] = value[k];
					}
				} else if (value instanceof NumericValue) return value;
				return newObject;
			} else return value;
		}
	};
	var SmithyRpcV2CborProtocol = class extends RpcProtocol {
		codec = new CborCodec();
		serializer = this.codec.createSerializer();
		deserializer = this.codec.createDeserializer();
		constructor({ defaultNamespace, errorTypeRegistries }) {
			super({
				defaultNamespace,
				errorTypeRegistries
			});
		}
		getShapeId() {
			return "smithy.protocols#rpcv2Cbor";
		}
		getPayloadCodec() {
			return this.codec;
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			Object.assign(request.headers, {
				"content-type": this.getDefaultContentType(),
				"smithy-protocol": "rpc-v2-cbor",
				accept: this.getDefaultContentType()
			});
			if (deref(operationSchema.input) === "unit") {
				delete request.body;
				delete request.headers["content-type"];
			} else {
				if (!request.body) {
					this.serializer.write(15, {});
					request.body = this.serializer.flush();
				}
				try {
					request.headers["content-length"] = String(request.body.byteLength);
				} catch (e) {}
			}
			const { service, operation } = getSmithyContext(context);
			const path = `/service/${service}/operation/${operation}`;
			if (request.path.endsWith("/")) request.path += path.slice(1);
			else request.path += path;
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			return super.deserializeResponse(operationSchema, context, response);
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorName = loadSmithyRpcV2CborErrorCode(response, dataObject) ?? "Unknown";
			const errorMetadata = {
				$metadata: metadata,
				$fault: response.statusCode <= 500 ? "client" : "server"
			};
			let namespace = this.options.defaultNamespace;
			if (errorName.includes("#")) [namespace] = errorName.split("#");
			const registry = this.compositeErrorRegistry;
			const nsRegistry = TypeRegistry.for(namespace);
			registry.copyFrom(nsRegistry);
			let errorSchema;
			try {
				errorSchema = registry.getSchema(errorName);
			} catch (e) {
				if (dataObject.Message) dataObject.message = dataObject.Message;
				const syntheticRegistry = TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace);
				registry.copyFrom(syntheticRegistry);
				const baseExceptionSchema = registry.getBaseException();
				if (baseExceptionSchema) {
					const ErrorCtor = registry.getErrorCtor(baseExceptionSchema);
					throw Object.assign(new ErrorCtor({ name: errorName }), errorMetadata, dataObject);
				}
				throw Object.assign(new Error(errorName), errorMetadata, dataObject);
			}
			const ns = NormalizedSchema.of(errorSchema);
			const ErrorCtor = registry.getErrorCtor(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ErrorCtor({});
			const output = {};
			for (const [name, member] of ns.structIterator()) output[name] = this.deserializer.readValue(member, dataObject[name]);
			throw Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output);
		}
		getDefaultContentType() {
			return "application/cbor";
		}
	};
	exports.CborCodec = CborCodec;
	exports.CborShapeDeserializer = CborShapeDeserializer;
	exports.CborShapeSerializer = CborShapeSerializer;
	exports.SmithyRpcV2CborProtocol = SmithyRpcV2CborProtocol;
	exports.buildHttpRpcRequest = buildHttpRpcRequest;
	exports.cbor = cbor;
	exports.checkCborResponse = checkCborResponse;
	exports.dateToTag = dateToTag;
	exports.loadSmithyRpcV2CborErrorCode = loadSmithyRpcV2CborErrorCode;
	exports.parseCborBody = parseCborBody;
	exports.parseCborErrorBody = parseCborErrorBody;
	exports.tag = tag;
	exports.tagSymbol = tagSymbol;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/escape-attribute.js
function escapeAttribute(value) {
	return value.replace(ATTR_ESCAPE_RE, (ch) => ATTR_ESCAPE_MAP[ch]);
}
var ATTR_ESCAPE_RE, ATTR_ESCAPE_MAP;
var init_escape_attribute = __esmMin((() => {
	ATTR_ESCAPE_RE = /[&<>"]/g;
	ATTR_ESCAPE_MAP = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/escape-element.js
function escapeElement(value) {
	return value.replace(ELEMENT_ESCAPE_RE, (ch) => ELEMENT_ESCAPE_MAP[ch]);
}
var ELEMENT_ESCAPE_RE, ELEMENT_ESCAPE_MAP;
var init_escape_element = __esmMin((() => {
	ELEMENT_ESCAPE_RE = /[&"'<>\r\n\u0085\u2028]/g;
	ELEMENT_ESCAPE_MAP = {
		"&": "&amp;",
		"\"": "&quot;",
		"'": "&apos;",
		"<": "&lt;",
		">": "&gt;",
		"\r": "&#x0D;",
		"\n": "&#x0A;",
		"": "&#x85;",
		"\u2028": "&#x2028;"
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/XmlText.js
var XmlText;
var init_XmlText = __esmMin((() => {
	init_escape_element();
	XmlText = class {
		value;
		constructor(value) {
			this.value = value;
		}
		toString() {
			return escapeElement("" + this.value);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/XmlNode.js
var XmlNode$1;
var init_XmlNode = __esmMin((() => {
	init_escape_attribute();
	init_XmlText();
	XmlNode$1 = class XmlNode$1 {
		name;
		children;
		attributes = {};
		static of(name, childText, withName) {
			const node = new XmlNode$1(name);
			if (childText !== void 0) node.addChildNode(new XmlText(childText));
			if (withName !== void 0) node.withName(withName);
			return node;
		}
		constructor(name, children = []) {
			this.name = name;
			this.children = children;
		}
		withName(name) {
			this.name = name;
			return this;
		}
		addAttribute(name, value) {
			this.attributes[name] = value;
			return this;
		}
		addChildNode(child) {
			this.children.push(child);
			return this;
		}
		removeAttribute(name) {
			delete this.attributes[name];
			return this;
		}
		n(name) {
			this.name = name;
			return this;
		}
		c(child) {
			this.children.push(child);
			return this;
		}
		a(name, value) {
			if (value != null) this.attributes[name] = value;
			return this;
		}
		cc(input, field, withName = field) {
			if (input[field] != null) {
				const node = XmlNode$1.of(field, input[field]).withName(withName);
				this.c(node);
			}
		}
		l(input, listName, memberName, valueProvider) {
			if (input[listName] != null) valueProvider().map((node) => {
				node.withName(memberName);
				this.c(node);
			});
		}
		lc(input, listName, memberName, valueProvider) {
			if (input[listName] != null) {
				const nodes = valueProvider();
				const containerNode = new XmlNode$1(memberName);
				nodes.map((node) => {
					containerNode.c(node);
				});
				this.c(containerNode);
			}
		}
		toString() {
			const hasChildren = Boolean(this.children.length);
			let xmlText = `<${this.name}`;
			const attributes = this.attributes;
			for (const attributeName of Object.keys(attributes)) {
				const attribute = attributes[attributeName];
				if (attribute != null) xmlText += ` ${attributeName}="${escapeAttribute("" + attribute)}"`;
			}
			return xmlText += !hasChildren ? "/>" : `>${this.children.map((c) => c.toString()).join("")}</${this.name}>`;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/util.js
function getAllMatches(string, regex) {
	const matches = [];
	let match = regex.exec(string);
	while (match) {
		const allmatches = [];
		allmatches.startIndex = regex.lastIndex - match[0].length;
		const len = match.length;
		for (let index = 0; index < len; index++) allmatches.push(match[index]);
		matches.push(allmatches);
		match = regex.exec(string);
	}
	return matches;
}
function isExist(v) {
	return typeof v !== "undefined";
}
var regexName, isName, DANGEROUS_PROPERTY_NAMES, criticalProperties;
var init_util = __esmMin((() => {
	regexName = /* @__PURE__ */ new RegExp("^[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
	isName = function(string) {
		const match = regexName.exec(string);
		return !(match === null || typeof match === "undefined");
	};
	DANGEROUS_PROPERTY_NAMES = [
		"hasOwnProperty",
		"toString",
		"valueOf",
		"__defineGetter__",
		"__defineSetter__",
		"__lookupGetter__",
		"__lookupSetter__"
	];
	criticalProperties = [
		"__proto__",
		"constructor",
		"prototype"
	];
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/validator.js
function validate(xmlData, options) {
	options = Object.assign({}, defaultOptions$1, options);
	const tags = [];
	let tagFound = false;
	let reachedRoot = false;
	if (xmlData[0] === "﻿") xmlData = xmlData.substr(1);
	for (let i = 0; i < xmlData.length; i++) if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
		i += 2;
		i = readPI(xmlData, i);
		if (i.err) return i;
	} else if (xmlData[i] === "<") {
		let tagStartPos = i;
		i++;
		if (xmlData[i] === "!") {
			i = readCommentAndCDATA(xmlData, i);
			continue;
		} else {
			let closingTag = false;
			if (xmlData[i] === "/") {
				closingTag = true;
				i++;
			}
			let tagName = "";
			for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) tagName += xmlData[i];
			tagName = tagName.trim();
			if (tagName[tagName.length - 1] === "/") {
				tagName = tagName.substring(0, tagName.length - 1);
				i--;
			}
			if (!validateTagName(tagName)) {
				let msg;
				if (tagName.trim().length === 0) msg = "Invalid space after '<'.";
				else msg = "Tag '" + tagName + "' is an invalid name.";
				return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
			}
			const result = readAttributeStr(xmlData, i);
			if (result === false) return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
			let attrStr = result.value;
			i = result.index;
			if (attrStr[attrStr.length - 1] === "/") {
				const attrStrStart = i - attrStr.length;
				attrStr = attrStr.substring(0, attrStr.length - 1);
				const isValid = validateAttributeString(attrStr, options);
				if (isValid === true) tagFound = true;
				else return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
			} else if (closingTag) if (!result.tagClosed) return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
			else if (attrStr.trim().length > 0) return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
			else if (tags.length === 0) return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
			else {
				const otg = tags.pop();
				if (tagName !== otg.tagName) {
					let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
					return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
				}
				if (tags.length == 0) reachedRoot = true;
			}
			else {
				const isValid = validateAttributeString(attrStr, options);
				if (isValid !== true) return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
				if (reachedRoot === true) return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
				else if (options.unpairedTags.indexOf(tagName) !== -1) {} else tags.push({
					tagName,
					tagStartPos
				});
				tagFound = true;
			}
			for (i++; i < xmlData.length; i++) if (xmlData[i] === "<") if (xmlData[i + 1] === "!") {
				i++;
				i = readCommentAndCDATA(xmlData, i);
				continue;
			} else if (xmlData[i + 1] === "?") {
				i = readPI(xmlData, ++i);
				if (i.err) return i;
			} else break;
			else if (xmlData[i] === "&") {
				const afterAmp = validateAmpersand(xmlData, i);
				if (afterAmp == -1) return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
				i = afterAmp;
			} else if (reachedRoot === true && !isWhiteSpace(xmlData[i])) return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
			if (xmlData[i] === "<") i--;
		}
	} else {
		if (isWhiteSpace(xmlData[i])) continue;
		return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
	}
	if (!tagFound) return getErrorObject("InvalidXml", "Start tag expected.", 1);
	else if (tags.length == 1) return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
	else if (tags.length > 0) return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", {
		line: 1,
		col: 1
	});
	return true;
}
function isWhiteSpace(char) {
	return char === " " || char === "	" || char === "\n" || char === "\r";
}
/**
* Read Processing insstructions and skip
* @param {*} xmlData
* @param {*} i
*/
function readPI(xmlData, i) {
	const start = i;
	for (; i < xmlData.length; i++) if (xmlData[i] == "?" || xmlData[i] == " ") {
		const tagname = xmlData.substr(start, i - start);
		if (i > 5 && tagname === "xml") return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
		else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
			i++;
			break;
		} else continue;
	}
	return i;
}
function readCommentAndCDATA(xmlData, i) {
	if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
		for (i += 3; i < xmlData.length; i++) if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
			i += 2;
			break;
		}
	} else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
		let angleBracketsCount = 1;
		for (i += 8; i < xmlData.length; i++) if (xmlData[i] === "<") angleBracketsCount++;
		else if (xmlData[i] === ">") {
			angleBracketsCount--;
			if (angleBracketsCount === 0) break;
		}
	} else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
		for (i += 8; i < xmlData.length; i++) if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
			i += 2;
			break;
		}
	}
	return i;
}
/**
* Keep reading xmlData until '<' is found outside the attribute value.
* @param {string} xmlData
* @param {number} i
*/
function readAttributeStr(xmlData, i) {
	let attrStr = "";
	let startChar = "";
	let tagClosed = false;
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) if (startChar === "") startChar = xmlData[i];
		else if (startChar !== xmlData[i]) {} else startChar = "";
		else if (xmlData[i] === ">") {
			if (startChar === "") {
				tagClosed = true;
				break;
			}
		}
		attrStr += xmlData[i];
	}
	if (startChar !== "") return false;
	return {
		value: attrStr,
		index: i,
		tagClosed
	};
}
function validateAttributeString(attrStr, options) {
	const matches = getAllMatches(attrStr, validAttrStrRegxp);
	const attrNames = {};
	for (let i = 0; i < matches.length; i++) {
		if (matches[i][1].length === 0) return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
		else if (matches[i][3] !== void 0 && matches[i][4] === void 0) return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
		else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
		const attrName = matches[i][2];
		if (!validateAttrName(attrName)) return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
		if (!Object.prototype.hasOwnProperty.call(attrNames, attrName)) attrNames[attrName] = 1;
		else return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
	}
	return true;
}
function validateNumberAmpersand(xmlData, i) {
	let re = /\d/;
	if (xmlData[i] === "x") {
		i++;
		re = /[\da-fA-F]/;
	}
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === ";") return i;
		if (!xmlData[i].match(re)) break;
	}
	return -1;
}
function validateAmpersand(xmlData, i) {
	i++;
	if (xmlData[i] === ";") return -1;
	if (xmlData[i] === "#") {
		i++;
		return validateNumberAmpersand(xmlData, i);
	}
	let count = 0;
	for (; i < xmlData.length; i++, count++) {
		if (xmlData[i].match(/\w/) && count < 20) continue;
		if (xmlData[i] === ";") break;
		return -1;
	}
	return i;
}
function getErrorObject(code, message, lineNumber) {
	return { err: {
		code,
		msg: message,
		line: lineNumber.line || lineNumber,
		col: lineNumber.col
	} };
}
function validateAttrName(attrName) {
	return isName(attrName);
}
function validateTagName(tagname) {
	return isName(tagname);
}
function getLineNumberForPosition(xmlData, index) {
	const lines = xmlData.substring(0, index).split(/\r?\n/);
	return {
		line: lines.length,
		col: lines[lines.length - 1].length + 1
	};
}
function getPositionFromMatch(match) {
	return match.startIndex + match[1].length;
}
var defaultOptions$1, doubleQuote, singleQuote, validAttrStrRegxp;
var init_validator = __esmMin((() => {
	init_util();
	defaultOptions$1 = {
		allowBooleanAttributes: false,
		unpairedTags: []
	};
	doubleQuote = "\"";
	singleQuote = "'";
	validAttrStrRegxp = /* @__PURE__ */ new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");
})), BASIC_LATIN, LATIN_ACCENTS, LATIN_EXTENDED, GREEK, CYRILLIC, MATH, MATH_ADVANCED, ARROWS, SHAPES, PUNCTUATION, CURRENCY$1, FRACTIONS, MISC_SYMBOLS, XML$1, COMMON_HTML$1;
var init_entities = __esmMin((() => {
	BASIC_LATIN = {
		amp: "&",
		AMP: "&",
		lt: "<",
		LT: "<",
		gt: ">",
		GT: ">",
		quot: "\"",
		QUOT: "\"",
		apos: "'",
		lsquo: "‘",
		rsquo: "’",
		ldquo: "“",
		rdquo: "”",
		lsquor: "‚",
		rsquor: "’",
		ldquor: "„",
		bdquo: "„",
		comma: ",",
		period: ".",
		colon: ":",
		semi: ";",
		excl: "!",
		quest: "?",
		num: "#",
		dollar: "$",
		percent: "%",
		ast: "*",
		commat: "@",
		lowbar: "_",
		verbar: "|",
		vert: "|",
		sol: "/",
		bsol: "\\",
		lbrace: "{",
		rbrace: "}",
		lbrack: "[",
		rbrack: "]",
		lpar: "(",
		rpar: ")",
		nbsp: "\xA0",
		iexcl: "¡",
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		brvbar: "¦",
		sect: "§",
		uml: "¨",
		copy: "©",
		COPY: "©",
		ordf: "ª",
		laquo: "«",
		not: "¬",
		shy: "­",
		reg: "®",
		REG: "®",
		macr: "¯",
		deg: "°",
		plusmn: "±",
		sup2: "²",
		sup3: "³",
		acute: "´",
		micro: "µ",
		para: "¶",
		middot: "·",
		cedil: "¸",
		sup1: "¹",
		ordm: "º",
		raquo: "»",
		frac14: "¼",
		frac12: "½",
		half: "½",
		frac34: "¾",
		iquest: "¿",
		times: "×",
		div: "÷",
		divide: "÷"
	};
	LATIN_ACCENTS = {
		Agrave: "À",
		agrave: "à",
		Aacute: "Á",
		aacute: "á",
		Acirc: "Â",
		acirc: "â",
		Atilde: "Ã",
		atilde: "ã",
		Auml: "Ä",
		auml: "ä",
		Aring: "Å",
		aring: "å",
		AElig: "Æ",
		aelig: "æ",
		Ccedil: "Ç",
		ccedil: "ç",
		Egrave: "È",
		egrave: "è",
		Eacute: "É",
		eacute: "é",
		Ecirc: "Ê",
		ecirc: "ê",
		Euml: "Ë",
		euml: "ë",
		Igrave: "Ì",
		igrave: "ì",
		Iacute: "Í",
		iacute: "í",
		Icirc: "Î",
		icirc: "î",
		Iuml: "Ï",
		iuml: "ï",
		ETH: "Ð",
		eth: "ð",
		Ntilde: "Ñ",
		ntilde: "ñ",
		Ograve: "Ò",
		ograve: "ò",
		Oacute: "Ó",
		oacute: "ó",
		Ocirc: "Ô",
		ocirc: "ô",
		Otilde: "Õ",
		otilde: "õ",
		Ouml: "Ö",
		ouml: "ö",
		Oslash: "Ø",
		oslash: "ø",
		Ugrave: "Ù",
		ugrave: "ù",
		Uacute: "Ú",
		uacute: "ú",
		Ucirc: "Û",
		ucirc: "û",
		Uuml: "Ü",
		uuml: "ü",
		Yacute: "Ý",
		yacute: "ý",
		THORN: "Þ",
		thorn: "þ",
		szlig: "ß",
		yuml: "ÿ",
		Yuml: "Ÿ"
	};
	LATIN_EXTENDED = {
		Amacr: "Ā",
		amacr: "ā",
		Abreve: "Ă",
		abreve: "ă",
		Aogon: "Ą",
		aogon: "ą",
		Cacute: "Ć",
		cacute: "ć",
		Ccirc: "Ĉ",
		ccirc: "ĉ",
		Cdot: "Ċ",
		cdot: "ċ",
		Ccaron: "Č",
		ccaron: "č",
		Dcaron: "Ď",
		dcaron: "ď",
		Dstrok: "Đ",
		dstrok: "đ",
		Emacr: "Ē",
		emacr: "ē",
		Ecaron: "Ě",
		ecaron: "ě",
		Edot: "Ė",
		edot: "ė",
		Eogon: "Ę",
		eogon: "ę",
		Gcirc: "Ĝ",
		gcirc: "ĝ",
		Gbreve: "Ğ",
		gbreve: "ğ",
		Gdot: "Ġ",
		gdot: "ġ",
		Gcedil: "Ģ",
		Hcirc: "Ĥ",
		hcirc: "ĥ",
		Hstrok: "Ħ",
		hstrok: "ħ",
		Itilde: "Ĩ",
		itilde: "ĩ",
		Imacr: "Ī",
		imacr: "ī",
		Iogon: "Į",
		iogon: "į",
		Idot: "İ",
		IJlig: "Ĳ",
		ijlig: "ĳ",
		Jcirc: "Ĵ",
		jcirc: "ĵ",
		Kcedil: "Ķ",
		kcedil: "ķ",
		kgreen: "ĸ",
		Lacute: "Ĺ",
		lacute: "ĺ",
		Lcedil: "Ļ",
		lcedil: "ļ",
		Lcaron: "Ľ",
		lcaron: "ľ",
		Lmidot: "Ŀ",
		lmidot: "ŀ",
		Lstrok: "Ł",
		lstrok: "ł",
		Nacute: "Ń",
		nacute: "ń",
		Ncaron: "Ň",
		ncaron: "ň",
		Ncedil: "Ņ",
		ncedil: "ņ",
		ENG: "Ŋ",
		eng: "ŋ",
		Omacr: "Ō",
		omacr: "ō",
		Odblac: "Ő",
		odblac: "ő",
		OElig: "Œ",
		oelig: "œ",
		Racute: "Ŕ",
		racute: "ŕ",
		Rcaron: "Ř",
		rcaron: "ř",
		Rcedil: "Ŗ",
		rcedil: "ŗ",
		Sacute: "Ś",
		sacute: "ś",
		Scirc: "Ŝ",
		scirc: "ŝ",
		Scedil: "Ş",
		scedil: "ş",
		Scaron: "Š",
		scaron: "š",
		Tcedil: "Ţ",
		tcedil: "ţ",
		Tcaron: "Ť",
		tcaron: "ť",
		Tstrok: "Ŧ",
		tstrok: "ŧ",
		Utilde: "Ũ",
		utilde: "ũ",
		Umacr: "Ū",
		umacr: "ū",
		Ubreve: "Ŭ",
		ubreve: "ŭ",
		Uring: "Ů",
		uring: "ů",
		Udblac: "Ű",
		udblac: "ű",
		Uogon: "Ų",
		uogon: "ų",
		Wcirc: "Ŵ",
		wcirc: "ŵ",
		Ycirc: "Ŷ",
		ycirc: "ŷ",
		Zacute: "Ź",
		zacute: "ź",
		Zdot: "Ż",
		zdot: "ż",
		Zcaron: "Ž",
		zcaron: "ž"
	};
	GREEK = {
		Alpha: "Α",
		alpha: "α",
		Beta: "Β",
		beta: "β",
		Gamma: "Γ",
		gamma: "γ",
		Delta: "Δ",
		delta: "δ",
		Epsilon: "Ε",
		epsilon: "ε",
		epsiv: "ϵ",
		varepsilon: "ϵ",
		Zeta: "Ζ",
		zeta: "ζ",
		Eta: "Η",
		eta: "η",
		Theta: "Θ",
		theta: "θ",
		thetasym: "ϑ",
		vartheta: "ϑ",
		Iota: "Ι",
		iota: "ι",
		Kappa: "Κ",
		kappa: "κ",
		kappav: "ϰ",
		varkappa: "ϰ",
		Lambda: "Λ",
		lambda: "λ",
		Mu: "Μ",
		mu: "μ",
		Nu: "Ν",
		nu: "ν",
		Xi: "Ξ",
		xi: "ξ",
		Omicron: "Ο",
		omicron: "ο",
		Pi: "Π",
		pi: "π",
		piv: "ϖ",
		varpi: "ϖ",
		Rho: "Ρ",
		rho: "ρ",
		rhov: "ϱ",
		varrho: "ϱ",
		Sigma: "Σ",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		varsigma: "ς",
		Tau: "Τ",
		tau: "τ",
		Upsilon: "Υ",
		upsilon: "υ",
		upsi: "υ",
		Upsi: "ϒ",
		upsih: "ϒ",
		Phi: "Φ",
		phi: "φ",
		phiv: "ϕ",
		varphi: "ϕ",
		Chi: "Χ",
		chi: "χ",
		Psi: "Ψ",
		psi: "ψ",
		Omega: "Ω",
		omega: "ω",
		ohm: "Ω",
		Gammad: "Ϝ",
		gammad: "ϝ",
		digamma: "ϝ"
	};
	CYRILLIC = {
		Afr: "𝔄",
		afr: "𝔞",
		Acy: "А",
		acy: "а",
		Bcy: "Б",
		bcy: "б",
		Vcy: "В",
		vcy: "в",
		Gcy: "Г",
		gcy: "г",
		Dcy: "Д",
		dcy: "д",
		IEcy: "Е",
		iecy: "е",
		IOcy: "Ё",
		iocy: "ё",
		ZHcy: "Ж",
		zhcy: "ж",
		Zcy: "З",
		zcy: "з",
		Icy: "И",
		icy: "и",
		Jcy: "Й",
		jcy: "й",
		Kcy: "К",
		kcy: "к",
		Lcy: "Л",
		lcy: "л",
		Mcy: "М",
		mcy: "м",
		Ncy: "Н",
		ncy: "н",
		Ocy: "О",
		ocy: "о",
		Pcy: "П",
		pcy: "п",
		Rcy: "Р",
		rcy: "р",
		Scy: "С",
		scy: "с",
		Tcy: "Т",
		tcy: "т",
		Ucy: "У",
		ucy: "у",
		Fcy: "Ф",
		fcy: "ф",
		KHcy: "Х",
		khcy: "х",
		TScy: "Ц",
		tscy: "ц",
		CHcy: "Ч",
		chcy: "ч",
		SHcy: "Ш",
		shcy: "ш",
		SHCHcy: "Щ",
		shchcy: "щ",
		HARDcy: "Ъ",
		hardcy: "ъ",
		Ycy: "Ы",
		ycy: "ы",
		SOFTcy: "Ь",
		softcy: "ь",
		Ecy: "Э",
		ecy: "э",
		YUcy: "Ю",
		yucy: "ю",
		YAcy: "Я",
		yacy: "я",
		DJcy: "Ђ",
		djcy: "ђ",
		GJcy: "Ѓ",
		gjcy: "ѓ",
		Jukcy: "Є",
		jukcy: "є",
		DScy: "Ѕ",
		dscy: "ѕ",
		Iukcy: "І",
		iukcy: "і",
		YIcy: "Ї",
		yicy: "ї",
		Jsercy: "Ј",
		jsercy: "ј",
		LJcy: "Љ",
		ljcy: "љ",
		NJcy: "Њ",
		njcy: "њ",
		TSHcy: "Ћ",
		tshcy: "ћ",
		KJcy: "Ќ",
		kjcy: "ќ",
		Ubrcy: "Ў",
		ubrcy: "ў",
		DZcy: "Џ",
		dzcy: "џ"
	};
	MATH = {
		plus: "+",
		pm: "±",
		times: "×",
		div: "÷",
		divide: "÷",
		sdot: "⋅",
		star: "☆",
		starf: "★",
		bigstar: "★",
		lowast: "∗",
		ast: "*",
		midast: "*",
		compfn: "∘",
		smallcircle: "∘",
		bullet: "•",
		bull: "•",
		nbsp: "\xA0",
		hellip: "…",
		mldr: "…",
		prime: "′",
		Prime: "″",
		tprime: "‴",
		bprime: "‵",
		backprime: "‵",
		minus: "−",
		minusd: "∸",
		dotminus: "∸",
		plusdo: "∔",
		dotplus: "∔",
		plusmn: "±",
		minusplus: "∓",
		mnplus: "∓",
		mp: "∓",
		setminus: "∖",
		smallsetminus: "∖",
		Backslash: "∖",
		setmn: "∖",
		ssetmn: "∖",
		lowbar: "_",
		verbar: "|",
		vert: "|",
		VerticalLine: "|",
		colon: ":",
		Colon: "∷",
		Proportion: "∷",
		ratio: "∶",
		equals: "=",
		ne: "≠",
		nequiv: "≢",
		equiv: "≡",
		Congruent: "≡",
		sim: "∼",
		thicksim: "∼",
		thksim: "∼",
		sime: "≃",
		simeq: "≃",
		TildeEqual: "≃",
		asymp: "≈",
		approx: "≈",
		thickapprox: "≈",
		thkap: "≈",
		TildeTilde: "≈",
		ncong: "≇",
		cong: "≅",
		TildeFullEqual: "≅",
		asympeq: "≍",
		CupCap: "≍",
		bump: "≎",
		Bumpeq: "≎",
		HumpDownHump: "≎",
		bumpe: "≏",
		bumpeq: "≏",
		HumpEqual: "≏",
		le: "≤",
		LessEqual: "≤",
		ge: "≥",
		GreaterEqual: "≥",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		greater: ">",
		less: "<"
	};
	MATH_ADVANCED = {
		alefsym: "ℵ",
		aleph: "ℵ",
		beth: "ℶ",
		gimel: "ℷ",
		daleth: "ℸ",
		forall: "∀",
		ForAll: "∀",
		part: "∂",
		PartialD: "∂",
		exist: "∃",
		Exists: "∃",
		nexist: "∄",
		nexists: "∄",
		empty: "∅",
		emptyset: "∅",
		emptyv: "∅",
		varnothing: "∅",
		nabla: "∇",
		Del: "∇",
		isin: "∈",
		isinv: "∈",
		in: "∈",
		Element: "∈",
		notin: "∉",
		notinva: "∉",
		ni: "∋",
		niv: "∋",
		SuchThat: "∋",
		ReverseElement: "∋",
		notni: "∌",
		notniva: "∌",
		prod: "∏",
		Product: "∏",
		coprod: "∐",
		Coproduct: "∐",
		sum: "∑",
		Sum: "∑",
		minus: "−",
		mp: "∓",
		plusdo: "∔",
		dotplus: "∔",
		setminus: "∖",
		lowast: "∗",
		radic: "√",
		Sqrt: "√",
		prop: "∝",
		propto: "∝",
		Proportional: "∝",
		varpropto: "∝",
		infin: "∞",
		infintie: "⧝",
		ang: "∠",
		angle: "∠",
		angmsd: "∡",
		measuredangle: "∡",
		angsph: "∢",
		mid: "∣",
		VerticalBar: "∣",
		nmid: "∤",
		nsmid: "∤",
		npar: "∦",
		parallel: "∥",
		spar: "∥",
		nparallel: "∦",
		nspar: "∦",
		and: "∧",
		wedge: "∧",
		or: "∨",
		vee: "∨",
		cap: "∩",
		cup: "∪",
		int: "∫",
		Integral: "∫",
		conint: "∮",
		ContourIntegral: "∮",
		Conint: "∯",
		DoubleContourIntegral: "∯",
		Cconint: "∰",
		there4: "∴",
		therefore: "∴",
		Therefore: "∴",
		becaus: "∵",
		because: "∵",
		Because: "∵",
		ratio: "∶",
		Proportion: "∷",
		minusd: "∸",
		dotminus: "∸",
		mDDot: "∺",
		homtht: "∻",
		sim: "∼",
		bsimg: "∽",
		backsim: "∽",
		ac: "∾",
		mstpos: "∾",
		acd: "∿",
		VerticalTilde: "≀",
		wr: "≀",
		wreath: "≀",
		nsime: "≄",
		nsimeq: "≄",
		ncong: "≇",
		simne: "≆",
		ncongdot: "⩭̸",
		ngsim: "≵",
		nsim: "≁",
		napprox: "≉",
		nap: "≉",
		ngeq: "≱",
		nge: "≱",
		nleq: "≰",
		nle: "≰",
		ngtr: "≯",
		ngt: "≯",
		nless: "≮",
		nlt: "≮",
		nprec: "⊀",
		npr: "⊀",
		nsucc: "⊁",
		nsc: "⊁"
	};
	ARROWS = {
		larr: "←",
		leftarrow: "←",
		LeftArrow: "←",
		uarr: "↑",
		uparrow: "↑",
		UpArrow: "↑",
		rarr: "→",
		rightarrow: "→",
		RightArrow: "→",
		darr: "↓",
		downarrow: "↓",
		DownArrow: "↓",
		harr: "↔",
		leftrightarrow: "↔",
		LeftRightArrow: "↔",
		varr: "↕",
		updownarrow: "↕",
		UpDownArrow: "↕",
		nwarr: "↖",
		nwarrow: "↖",
		UpperLeftArrow: "↖",
		nearr: "↗",
		nearrow: "↗",
		UpperRightArrow: "↗",
		searr: "↘",
		searrow: "↘",
		LowerRightArrow: "↘",
		swarr: "↙",
		swarrow: "↙",
		LowerLeftArrow: "↙",
		lArr: "⇐",
		Leftarrow: "⇐",
		uArr: "⇑",
		Uparrow: "⇑",
		rArr: "⇒",
		Rightarrow: "⇒",
		dArr: "⇓",
		Downarrow: "⇓",
		hArr: "⇔",
		Leftrightarrow: "⇔",
		iff: "⇔",
		vArr: "⇕",
		Updownarrow: "⇕",
		lAarr: "⇚",
		Lleftarrow: "⇚",
		rAarr: "⇛",
		Rrightarrow: "⇛",
		lrarr: "⇆",
		leftrightarrows: "⇆",
		rlarr: "⇄",
		rightleftarrows: "⇄",
		lrhar: "⇋",
		leftrightharpoons: "⇋",
		ReverseEquilibrium: "⇋",
		rlhar: "⇌",
		rightleftharpoons: "⇌",
		Equilibrium: "⇌",
		udarr: "⇅",
		UpArrowDownArrow: "⇅",
		duarr: "⇵",
		DownArrowUpArrow: "⇵",
		llarr: "⇇",
		leftleftarrows: "⇇",
		rrarr: "⇉",
		rightrightarrows: "⇉",
		ddarr: "⇊",
		downdownarrows: "⇊",
		har: "↽",
		lhard: "↽",
		leftharpoondown: "↽",
		lharu: "↼",
		leftharpoonup: "↼",
		rhard: "⇁",
		rightharpoondown: "⇁",
		rharu: "⇀",
		rightharpoonup: "⇀",
		lsh: "↰",
		Lsh: "↰",
		rsh: "↱",
		Rsh: "↱",
		ldsh: "↲",
		rdsh: "↳",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		mapstoleft: "↤",
		mapstoup: "↥",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		crarr: "↵",
		nleftarrow: "↚",
		nleftrightarrow: "↮",
		nrightarrow: "↛",
		nrarr: "↛",
		larrtl: "↢",
		rarrtl: "↣",
		leftarrowtail: "↢",
		rightarrowtail: "↣",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		Larr: "↞",
		Rarr: "↠",
		larrhk: "↩",
		rarrhk: "↪",
		larrlp: "↫",
		looparrowleft: "↫",
		rarrlp: "↬",
		looparrowright: "↬",
		harrw: "↭",
		leftrightsquigarrow: "↭",
		nrarrw: "↝̸",
		rarrw: "↝",
		rightsquigarrow: "↝",
		larrbfs: "⤟",
		rarrbfs: "⤠",
		nvHarr: "⤄",
		nvlArr: "⤂",
		nvrArr: "⤃",
		larrfs: "⤝",
		rarrfs: "⤞",
		Map: "⤅",
		larrsim: "⥳",
		rarrsim: "⥴",
		harrcir: "⥈",
		Uarrocir: "⥉",
		lurdshar: "⥊",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		rdldhar: "⥩",
		lrhard: "⥭",
		uharr: "↾",
		uharl: "↿",
		dharr: "⇂",
		dharl: "⇃",
		Uarr: "↟",
		Darr: "↡",
		zigrarr: "⇝",
		nwArr: "⇖",
		neArr: "⇗",
		seArr: "⇘",
		swArr: "⇙",
		nharr: "↮",
		nhArr: "⇎",
		nlarr: "↚",
		nlArr: "⇍",
		nrArr: "⇏",
		larrb: "⇤",
		LeftArrowBar: "⇤",
		rarrb: "⇥",
		RightArrowBar: "⇥"
	};
	SHAPES = {
		square: "□",
		Square: "□",
		squ: "□",
		squf: "▪",
		squarf: "▪",
		blacksquar: "▪",
		blacksquare: "▪",
		FilledVerySmallSquare: "▪",
		blk34: "▓",
		blk12: "▒",
		blk14: "░",
		block: "█",
		srect: "▭",
		rect: "▭",
		sdot: "⋅",
		sdotb: "⊡",
		dotsquare: "⊡",
		triangle: "▵",
		tri: "▵",
		trine: "▵",
		utri: "▵",
		triangledown: "▿",
		dtri: "▿",
		tridown: "▿",
		triangleleft: "◃",
		ltri: "◃",
		triangleright: "▹",
		rtri: "▹",
		blacktriangle: "▴",
		utrif: "▴",
		blacktriangledown: "▾",
		dtrif: "▾",
		blacktriangleleft: "◂",
		ltrif: "◂",
		blacktriangleright: "▸",
		rtrif: "▸",
		loz: "◊",
		lozenge: "◊",
		blacklozenge: "⧫",
		lozf: "⧫",
		bigcirc: "◯",
		xcirc: "◯",
		circ: "ˆ",
		Circle: "○",
		cir: "○",
		o: "○",
		bullet: "•",
		bull: "•",
		hellip: "…",
		mldr: "…",
		nldr: "‥",
		boxh: "─",
		HorizontalLine: "─",
		boxv: "│",
		boxdr: "┌",
		boxdl: "┐",
		boxur: "└",
		boxul: "┘",
		boxvr: "├",
		boxvl: "┤",
		boxhd: "┬",
		boxhu: "┴",
		boxvh: "┼",
		boxH: "═",
		boxV: "║",
		boxdR: "╒",
		boxDr: "╓",
		boxDR: "╔",
		boxDl: "╕",
		boxdL: "╖",
		boxDL: "╗",
		boxuR: "╘",
		boxUr: "╙",
		boxUR: "╚",
		boxUl: "╜",
		boxuL: "╛",
		boxUL: "╝",
		boxvR: "╞",
		boxVr: "╟",
		boxVR: "╠",
		boxVl: "╢",
		boxvL: "╡",
		boxVL: "╣",
		boxHd: "╤",
		boxhD: "╥",
		boxHD: "╦",
		boxHu: "╧",
		boxhU: "╨",
		boxHU: "╩",
		boxvH: "╪",
		boxVh: "╫",
		boxVH: "╬"
	};
	PUNCTUATION = {
		excl: "!",
		iexcl: "¡",
		brvbar: "¦",
		sect: "§",
		uml: "¨",
		copy: "©",
		ordf: "ª",
		laquo: "«",
		not: "¬",
		shy: "­",
		reg: "®",
		macr: "¯",
		deg: "°",
		plusmn: "±",
		sup2: "²",
		sup3: "³",
		acute: "´",
		micro: "µ",
		para: "¶",
		middot: "·",
		cedil: "¸",
		sup1: "¹",
		ordm: "º",
		raquo: "»",
		frac14: "¼",
		frac12: "½",
		frac34: "¾",
		iquest: "¿",
		nbsp: "\xA0",
		comma: ",",
		period: ".",
		colon: ":",
		semi: ";",
		vert: "|",
		Verbar: "‖",
		verbar: "|",
		dblac: "˝",
		circ: "ˆ",
		caron: "ˇ",
		breve: "˘",
		dot: "˙",
		ring: "˚",
		ogon: "˛",
		tilde: "˜",
		DiacriticalGrave: "`",
		DiacriticalAcute: "´",
		DiacriticalTilde: "˜",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		grave: "`"
	};
	CURRENCY$1 = {
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		euro: "€",
		dollar: "$",
		fnof: "ƒ",
		inr: "₹",
		af: "؋",
		birr: "ብር",
		peso: "₱",
		rub: "₽",
		won: "₩",
		yuan: "¥",
		cedil: "¸"
	};
	FRACTIONS = {
		frac12: "½",
		half: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄"
	};
	MISC_SYMBOLS = {
		trade: "™",
		TRADE: "™",
		telrec: "⌕",
		target: "⌖",
		ulcorn: "⌜",
		ulcorner: "⌜",
		urcorn: "⌝",
		urcorner: "⌝",
		dlcorn: "⌞",
		llcorner: "⌞",
		drcorn: "⌟",
		lrcorner: "⌟",
		intercal: "⊺",
		intcal: "⊺",
		oplus: "⊕",
		CirclePlus: "⊕",
		ominus: "⊖",
		CircleMinus: "⊖",
		otimes: "⊗",
		CircleTimes: "⊗",
		osol: "⊘",
		odot: "⊙",
		CircleDot: "⊙",
		oast: "⊛",
		circledast: "⊛",
		odash: "⊝",
		circleddash: "⊝",
		ocirc: "⊚",
		circledcirc: "⊚",
		boxplus: "⊞",
		plusb: "⊞",
		boxminus: "⊟",
		minusb: "⊟",
		boxtimes: "⊠",
		timesb: "⊠",
		boxdot: "⊡",
		sdotb: "⊡",
		veebar: "⊻",
		vee: "∨",
		barvee: "⊽",
		and: "∧",
		wedge: "∧",
		Cap: "⋒",
		Cup: "⋓",
		Fork: "⋔",
		pitchfork: "⋔",
		epar: "⋕",
		ltlarr: "⥶",
		nvap: "≍⃒",
		nvsim: "∼⃒",
		nvge: "≥⃒",
		nvle: "≤⃒",
		nvlt: "<⃒",
		nvgt: ">⃒",
		nvltrie: "⊴⃒",
		nvrtrie: "⊵⃒",
		Vdash: "⊩",
		dashv: "⊣",
		vDash: "⊨",
		Vvdash: "⊪",
		nvdash: "⊬",
		nvDash: "⊭",
		nVdash: "⊮",
		nVDash: "⊯"
	};
	({
		...BASIC_LATIN,
		...LATIN_ACCENTS,
		...LATIN_EXTENDED,
		...GREEK,
		...CYRILLIC,
		...MATH,
		...MATH_ADVANCED,
		...ARROWS,
		...SHAPES,
		...PUNCTUATION,
		...CURRENCY$1,
		...FRACTIONS,
		...MISC_SYMBOLS
	});
	XML$1 = {
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		quot: "\""
	};
	COMMON_HTML$1 = {
		nbsp: "\xA0",
		copy: "©",
		reg: "®",
		trade: "™",
		mdash: "—",
		ndash: "–",
		hellip: "…",
		laquo: "«",
		raquo: "»",
		lsquo: "‘",
		rsquo: "’",
		ldquo: "“",
		rdquo: "”",
		bull: "•",
		para: "¶",
		sect: "§",
		deg: "°",
		frac12: "½",
		frac14: "¼",
		frac34: "¾"
	};
}));
//#endregion
//#region ../../node_modules/.bun/@nodable+entities@2.2.0/node_modules/@nodable/entities/src/EntityDecoder.js
/**
* Validate that an entity name contains no dangerous characters.
* @param {string} name
* @returns {string} the name, unchanged
* @throws {Error} on invalid characters
*/
function validateEntityName$2(name) {
	if (name[0] === "#") throw new Error(`[EntityReplacer] Invalid character '#' in entity name: "${name}"`);
	for (const ch of name) if (SPECIAL_CHARS$1.has(ch)) throw new Error(`[EntityReplacer] Invalid character '${ch}' in entity name: "${name}"`);
	return name;
}
/**
* Merge one or more entity maps into a flat name→string map.
* Accepts either:
*   - plain string values:             { amp: '&' }
*   - legacy {regex,val} / {regx,val}: { lt: { regex: /.../, val: '<' } }
*
* Values containing '&' are skipped (recursive expansion risk).
*
* @param {...object} maps
* @returns {Record<string, string>}
*/
function mergeEntityMaps$1(...maps) {
	const out = Object.create(null);
	for (const map of maps) {
		if (!map) continue;
		for (const key of Object.keys(map)) {
			const raw = map[key];
			if (typeof raw === "string") out[key] = raw;
			else if (raw && typeof raw === "object" && raw.val !== void 0) {
				const val = raw.val;
				if (typeof val === "string") out[key] = val;
			}
		}
	}
	return out;
}
/**
* Resolve `applyLimitsTo` option into a normalised Set of tier strings.
* Accepted values: 'external' | 'base' | 'all' | string[]
* Default: 'external' (only untrusted injected entities are counted).
* @param {string|string[]|undefined} raw
* @returns {Set<string>}
*/
function parseLimitTiers$1(raw) {
	if (!raw || raw === LIMIT_TIER_EXTERNAL$1) return new Set([LIMIT_TIER_EXTERNAL$1]);
	if (raw === LIMIT_TIER_ALL$1) return new Set([LIMIT_TIER_ALL$1]);
	if (raw === LIMIT_TIER_BASE$1) return new Set([LIMIT_TIER_BASE$1]);
	if (Array.isArray(raw)) return new Set(raw);
	return new Set([LIMIT_TIER_EXTERNAL$1]);
}
/**
* Parse the `ncr` constructor option into flat, hot-path-friendly fields.
* @param {object|undefined} ncr
* @returns {{ xmlVersion: number, onLevel: number, nullLevel: number }}
*/
function parseNCRConfig$1(ncr) {
	if (!ncr) return {
		xmlVersion: 1,
		onLevel: NCR_LEVEL$1.allow,
		nullLevel: NCR_LEVEL$1.remove
	};
	const xmlVersion = ncr.xmlVersion === 1.1 ? 1.1 : 1;
	const onLevel = NCR_LEVEL$1[ncr.onNCR] ?? NCR_LEVEL$1.allow;
	const nullLevel = NCR_LEVEL$1[ncr.nullNCR] ?? NCR_LEVEL$1.remove;
	return {
		xmlVersion,
		onLevel,
		nullLevel: Math.max(nullLevel, NCR_LEVEL$1.remove)
	};
}
var ENTITY_ACTION, SPECIAL_CHARS$1, LIMIT_TIER_EXTERNAL$1, LIMIT_TIER_BASE$1, LIMIT_TIER_ALL$1, NCR_LEVEL$1, XML10_ALLOWED_C0$1, EntityDecoder;
var init_EntityDecoder = __esmMin((() => {
	init_entities();
	ENTITY_ACTION = Object.freeze({
		/** Resolve and expand the entity normally. */
		ALLOW: "allow",
		/** Silently skip this entity — it will not be registered. */
		BLOCK: "block",
		/** Throw an error, aborting entity registration entirely. */
		THROW: "throw"
	});
	SPECIAL_CHARS$1 = /* @__PURE__ */ new Set("!?\\\\/[]$%{}^&*()<>|+");
	LIMIT_TIER_EXTERNAL$1 = "external";
	LIMIT_TIER_BASE$1 = "base";
	LIMIT_TIER_ALL$1 = "all";
	NCR_LEVEL$1 = Object.freeze({
		allow: 0,
		leave: 1,
		remove: 2,
		throw: 3
	});
	XML10_ALLOWED_C0$1 = new Set([
		9,
		10,
		13
	]);
	EntityDecoder = class {
		/**
		* @param {object} [options]
		* @param {object|null}  [options.namedEntities]        — extra named entities merged into base map
		* @param {object}  [options.limit]                 — security limits
		* @param {number}       [options.limit.maxTotalExpansions=0]  — 0 = unlimited
		* @param {number}       [options.limit.maxExpandedLength=0]   — 0 = unlimited
		* @param {'external'|'base'|'all'|string[]} [options.limit.applyLimitsTo='external']
		*   Which entity tiers count against the security limits:
		*   - 'external' (default) — only input/runtime + persistent external entities
		*   - 'base'               — only DEFAULT_XML_ENTITIES + namedEntities
		*   - 'all'                — every entity regardless of tier
		*   - string[]             — explicit combination, e.g. ['external', 'base']
		* @param {((resolved: string, original: string) => string)|null} [options.postCheck=null]
		* @param {string[]} [options.remove=[]] — entity names (e.g. ['nbsp', '#13']) to delete (replace with empty string)
		* @param {string[]} [options.leave=[]]  — entity names to keep as literal (unchanged in output)
		* @param {object}   [options.ncr]       — Numeric Character Reference controls
		* @param {1.0|1.1}  [options.ncr.xmlVersion=1.0]
		*   XML version governing which codepoint ranges are restricted:
		*   - 1.0 — C0 controls U+0001–U+001F (except U+0009/000A/000D) are prohibited
		*   - 1.1 — C0 controls are allowed when written as NCRs; C1 (U+007F–U+009F) decoded as-is
		* @param {'allow'|'leave'|'remove'|'throw'} [options.ncr.onNCR='allow']
		*   Base action for numeric references. Severity order: allow < leave < remove < throw.
		*   For codepoint ranges that carry a minimum level (surrogates → remove, XML 1.0 C0 → remove),
		*   the effective action is max(onNCR, rangeMinimum).
		* @param {'remove'|'throw'} [options.ncr.nullNCR='remove']
		*   Action for U+0000 (null). 'allow' and 'leave' are clamped to 'remove' since null is never safe.
		* @param {((name: string, value: string) => 'allow'|'block'|'throw')|null} [options.onExternalEntity=null]
		*   Hook called when an external entity is registered via `setExternalEntities()` or
		*   `addExternalEntity()`. Return `ENTITY_ACTION.ALLOW` to accept the entity,
		*   `ENTITY_ACTION.BLOCK` to silently skip it, or `ENTITY_ACTION.THROW` to abort with an error.
		* @param {((name: string, value: string) => 'allow'|'block'|'throw')|null} [options.onInputEntity=null]
		*   Hook called when an input entity is registered via `addInputEntities()`. Return
		*   `ENTITY_ACTION.ALLOW` to accept, `ENTITY_ACTION.BLOCK` to silently skip, or
		*   `ENTITY_ACTION.THROW` to abort with an error.
		*/
		constructor(options = {}) {
			this._limit = options.limit || {};
			this._maxTotalExpansions = this._limit.maxTotalExpansions || 0;
			this._maxExpandedLength = this._limit.maxExpandedLength || 0;
			this._postCheck = typeof options.postCheck === "function" ? options.postCheck : (r) => r;
			this._limitTiers = parseLimitTiers$1(this._limit.applyLimitsTo ?? LIMIT_TIER_EXTERNAL$1);
			this._numericAllowed = options.numericAllowed ?? true;
			this._baseMap = mergeEntityMaps$1(XML$1, options.namedEntities || null);
			/** @type {Record<string, string>} */
			this._externalMap = Object.create(null);
			/** @type {Record<string, string>} */
			this._inputMap = Object.create(null);
			this._totalExpansions = 0;
			this._expandedLength = 0;
			/** @type {Set<string>} */
			this._removeSet = new Set(options.remove && Array.isArray(options.remove) ? options.remove : []);
			/** @type {Set<string>} */
			this._leaveSet = new Set(options.leave && Array.isArray(options.leave) ? options.leave : []);
			const ncrCfg = parseNCRConfig$1(options.ncr);
			this._ncrXmlVersion = ncrCfg.xmlVersion;
			this._ncrOnLevel = ncrCfg.onLevel;
			this._ncrNullLevel = ncrCfg.nullLevel;
			/** @type {((name: string, value: string) => 'allow'|'block'|'throw')|null} */
			this._onExternalEntity = typeof options.onExternalEntity === "function" ? options.onExternalEntity : null;
			/** @type {((name: string, value: string) => 'allow'|'block'|'throw')|null} */
			this._onInputEntity = typeof options.onInputEntity === "function" ? options.onInputEntity : null;
		}
		/**
		* Invoke a registration hook for a single entity name/value pair.
		* Returns true when the entity should be accepted, false when it should be
		* silently skipped (BLOCK), and throws when the hook returns THROW.
		*
		* @param {((name: string, value: string) => 'allow'|'block'|'throw')|null} hook
		* @param {string} name
		* @param {string} value
		* @param {string} context  — used in error messages ('external' | 'input')
		* @returns {boolean}  true = accept, false = skip
		*/
		_applyRegistrationHook(hook, name, value, context) {
			if (!hook) return true;
			const action = hook(name, value);
			if (action === ENTITY_ACTION.BLOCK) return false;
			if (action === ENTITY_ACTION.THROW) throw new Error(`[EntityDecoder] Registration of ${context} entity "&${name};" was rejected by hook`);
			return true;
		}
		/**
		* Replace the full set of persistent external entities.
		* All keys are validated — throws on invalid characters.
		* If `onExternalEntity` is set, it is called once per entry; entries that
		* return `ENTITY_ACTION.BLOCK` are silently omitted, `ENTITY_ACTION.THROW`
		* aborts the whole call.
		* @param {Record<string, string | { regex?: RegExp, val: string }>} map
		*/
		setExternalEntities(map) {
			if (map) for (const key of Object.keys(map)) validateEntityName$2(key);
			if (!this._onExternalEntity) {
				this._externalMap = mergeEntityMaps$1(map);
				return;
			}
			const flat = mergeEntityMaps$1(map);
			const filtered = Object.create(null);
			for (const [name, value] of Object.entries(flat)) if (this._applyRegistrationHook(this._onExternalEntity, name, value, "external")) filtered[name] = value;
			this._externalMap = filtered;
		}
		/**
		* Add a single persistent external entity.
		* If `onExternalEntity` is set it is called before the entity is stored;
		* `ENTITY_ACTION.BLOCK` silently skips storage, `ENTITY_ACTION.THROW` raises.
		* @param {string} key
		* @param {string} value
		*/
		addExternalEntity(key, value) {
			validateEntityName$2(key);
			if (typeof value === "string" && value.indexOf("&") === -1) {
				if (this._applyRegistrationHook(this._onExternalEntity, key, value, "external")) this._externalMap[key] = value;
			}
		}
		/**
		* Inject DOCTYPE entities for the current document.
		* Also resets per-document expansion counters.
		* If `onInputEntity` is set it is called once per entry; entries returning
		* `ENTITY_ACTION.BLOCK` are silently omitted, `ENTITY_ACTION.THROW` aborts.
		* @param {Record<string, string | { regx?: RegExp, regex?: RegExp, val: string }>} map
		*/
		addInputEntities(map) {
			this._totalExpansions = 0;
			this._expandedLength = 0;
			if (!this._onInputEntity) {
				this._inputMap = mergeEntityMaps$1(map);
				return;
			}
			const flat = mergeEntityMaps$1(map);
			const filtered = Object.create(null);
			for (const [name, value] of Object.entries(flat)) if (this._applyRegistrationHook(this._onInputEntity, name, value, "input")) filtered[name] = value;
			this._inputMap = filtered;
		}
		/**
		* Wipe input/runtime entities and reset counters.
		* Call this before processing each new document.
		* @returns {this}
		*/
		reset() {
			this._inputMap = Object.create(null);
			this._totalExpansions = 0;
			this._expandedLength = 0;
			return this;
		}
		/**
		* Update the XML version used for NCR classification.
		* Call this as soon as the document's `<?xml version="...">` declaration is parsed.
		* @param {1.0|1.1|number} version
		*/
		setXmlVersion(version) {
			this._ncrXmlVersion = version === 1.1 ? 1.1 : 1;
		}
		/**
		* Replace all entity references in `str` in a single pass.
		*
		* @param {string} str
		* @returns {string}
		*/
		decode(str) {
			if (typeof str !== "string" || str.length === 0) return str;
			if (str.indexOf("&") === -1) return str;
			const original = str;
			const chunks = [];
			const len = str.length;
			let last = 0;
			let i = 0;
			const limitExpansions = this._maxTotalExpansions > 0;
			const limitLength = this._maxExpandedLength > 0;
			const checkLimits = limitExpansions || limitLength;
			while (i < len) {
				if (str.charCodeAt(i) !== 38) {
					i++;
					continue;
				}
				let j = i + 1;
				while (j < len && str.charCodeAt(j) !== 59 && j - i <= 32) j++;
				if (j >= len || str.charCodeAt(j) !== 59) {
					i++;
					continue;
				}
				const token = str.slice(i + 1, j);
				if (token.length === 0) {
					i++;
					continue;
				}
				let replacement;
				let tier;
				if (this._removeSet.has(token)) {
					replacement = "";
					if (tier === void 0) tier = LIMIT_TIER_EXTERNAL$1;
				} else if (this._leaveSet.has(token)) {
					i++;
					continue;
				} else if (token.charCodeAt(0) === 35) {
					const ncrResult = this._resolveNCR(token);
					if (ncrResult === void 0) {
						i++;
						continue;
					}
					replacement = ncrResult;
					tier = LIMIT_TIER_BASE$1;
				} else {
					const resolved = this._resolveName(token);
					replacement = resolved?.value;
					tier = resolved?.tier;
				}
				if (replacement === void 0) {
					i++;
					continue;
				}
				if (i > last) chunks.push(str.slice(last, i));
				chunks.push(replacement);
				last = j + 1;
				i = last;
				if (checkLimits && this._tierCounts(tier)) {
					if (limitExpansions) {
						this._totalExpansions++;
						if (this._totalExpansions > this._maxTotalExpansions) throw new Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
					}
					if (limitLength) {
						const delta = replacement.length - (token.length + 2);
						if (delta > 0) {
							this._expandedLength += delta;
							if (this._expandedLength > this._maxExpandedLength) throw new Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
						}
					}
				}
			}
			if (last < len) chunks.push(str.slice(last));
			const result = chunks.length === 0 ? str : chunks.join("");
			return this._postCheck(result, original);
		}
		/**
		* Returns true if a resolved entity of the given tier should count
		* against the expansion/length limits.
		* @param {string} tier  — LIMIT_TIER_EXTERNAL | LIMIT_TIER_BASE
		* @returns {boolean}
		*/
		_tierCounts(tier) {
			if (this._limitTiers.has(LIMIT_TIER_ALL$1)) return true;
			return this._limitTiers.has(tier);
		}
		/**
		* Resolve a named entity token (without & and ;).
		* Priority: inputMap > externalMap > baseMap
		* Returns the resolved value tagged with its limit tier.
		*
		* @param {string} name
		* @returns {{ value: string, tier: string }|undefined}
		*/
		_resolveName(name) {
			if (name in this._inputMap) return {
				value: this._inputMap[name],
				tier: LIMIT_TIER_EXTERNAL$1
			};
			if (name in this._externalMap) return {
				value: this._externalMap[name],
				tier: LIMIT_TIER_EXTERNAL$1
			};
			if (name in this._baseMap) return {
				value: this._baseMap[name],
				tier: LIMIT_TIER_BASE$1
			};
		}
		/**
		* Classify a codepoint and return the minimum action level that must be applied.
		* Returns -1 when no minimum is imposed (normal allow path).
		*
		* Ranges checked (in priority order):
		*   1. U+0000            — null, governed by nullNCR (always ≥ remove)
		*   2. U+D800–U+DFFF     — surrogates, always prohibited (min: remove)
		*   3. U+0001–U+001F \ {0x09,0x0A,0x0D}  — XML 1.0 restricted C0 (min: remove)
		*      (skipped in XML 1.1 — C0 controls are allowed when written as NCRs)
		*
		* @param {number} cp  — codepoint
		* @returns {number}   — minimum NCR_LEVEL value, or -1 for no restriction
		*/
		_classifyNCR(cp) {
			if (cp === 0) return this._ncrNullLevel;
			if (cp >= 55296 && cp <= 57343) return NCR_LEVEL$1.remove;
			if (this._ncrXmlVersion === 1) {
				if (cp >= 1 && cp <= 31 && !XML10_ALLOWED_C0$1.has(cp)) return NCR_LEVEL$1.remove;
			}
			return -1;
		}
		/**
		* Execute a resolved NCR action.
		*
		* @param {number} action   — NCR_LEVEL value
		* @param {string} token    — raw token (e.g. '#38') for error messages
		* @param {number} cp       — codepoint, used only for error messages
		* @returns {string|undefined}
		*   - decoded character string  → 'allow'
		*   - ''                        → 'remove'
		*   - undefined                 → 'leave' (caller must skip past '&' only)
		*   - throws Error              → 'throw'
		*/
		_applyNCRAction(action, token, cp) {
			switch (action) {
				case NCR_LEVEL$1.allow: return String.fromCodePoint(cp);
				case NCR_LEVEL$1.remove: return "";
				case NCR_LEVEL$1.leave: return;
				case NCR_LEVEL$1.throw: throw new Error(`[EntityDecoder] Prohibited numeric character reference &${token}; (U+${cp.toString(16).toUpperCase().padStart(4, "0")})`);
				default: return String.fromCodePoint(cp);
			}
		}
		/**
		* Full NCR resolution pipeline for a numeric token.
		*
		* Steps:
		*   1. Parse the codepoint (decimal or hex).
		*   2. Validate the raw codepoint range (NaN, <0, >0x10FFFF).
		*   3. If numericAllowed is false and no minimum restriction applies → leave as-is.
		*   4. Classify the codepoint to find the minimum required action level.
		*   5. Resolve effective action = max(onNCR, minimum).
		*   6. Apply and return.
		*
		* @param {string} token  — e.g. '#38', '#x26', '#X26'
		* @returns {string|undefined}
		*   - string (incl. '')  — replacement ('' = remove)
		*   - undefined          — leave original &token; as-is
		*/
		_resolveNCR(token) {
			const second = token.charCodeAt(1);
			let cp;
			if (second === 120 || second === 88) cp = parseInt(token.slice(2), 16);
			else cp = parseInt(token.slice(1), 10);
			if (Number.isNaN(cp) || cp < 0 || cp > 1114111) return void 0;
			const minimum = this._classifyNCR(cp);
			if (!this._numericAllowed && minimum < NCR_LEVEL$1.remove) return void 0;
			const effective = minimum === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, minimum);
			return this._applyNCRAction(effective, token, cp);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@nodable+entities@2.2.0/node_modules/@nodable/entities/src/index.js
var init_src$1 = __esmMin((() => {
	init_EntityDecoder();
	init_entities();
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
/**
* Validates that a property name is safe to use
* @param {string} propertyName - The property name to validate
* @param {string} optionName - The option field name (for error message)
* @throws {Error} If property name is dangerous
*/
function validatePropertyName(propertyName, optionName) {
	if (typeof propertyName !== "string") return;
	const normalized = propertyName.toLowerCase();
	if (DANGEROUS_PROPERTY_NAMES.some((dangerous) => normalized === dangerous.toLowerCase())) throw new Error(`[SECURITY] Invalid ${optionName}: "${propertyName}" is a reserved JavaScript keyword that could cause prototype pollution`);
	if (criticalProperties.some((dangerous) => normalized === dangerous.toLowerCase())) throw new Error(`[SECURITY] Invalid ${optionName}: "${propertyName}" is a reserved JavaScript keyword that could cause prototype pollution`);
}
/**
* Normalizes processEntities option for backward compatibility
* @param {boolean|object} value 
* @returns {object} Always returns normalized object
*/
function normalizeProcessEntities(value, htmlEntities) {
	if (typeof value === "boolean") return {
		enabled: value,
		maxEntitySize: 1e4,
		maxExpansionDepth: 1e4,
		maxTotalExpansions: Infinity,
		maxExpandedLength: 1e5,
		maxEntityCount: 1e3,
		allowedTags: null,
		tagFilter: null,
		appliesTo: "all"
	};
	if (typeof value === "object" && value !== null) return {
		enabled: value.enabled !== false,
		maxEntitySize: Math.max(1, value.maxEntitySize ?? 1e4),
		maxExpansionDepth: Math.max(1, value.maxExpansionDepth ?? 1e4),
		maxTotalExpansions: Math.max(1, value.maxTotalExpansions ?? Infinity),
		maxExpandedLength: Math.max(1, value.maxExpandedLength ?? 1e5),
		maxEntityCount: Math.max(1, value.maxEntityCount ?? 1e3),
		allowedTags: value.allowedTags ?? null,
		tagFilter: value.tagFilter ?? null,
		appliesTo: value.appliesTo ?? "all"
	};
	return normalizeProcessEntities(true);
}
var defaultOnDangerousProperty, defaultOptions, buildOptions;
var init_OptionsBuilder = __esmMin((() => {
	init_util();
	defaultOnDangerousProperty = (name) => {
		if (DANGEROUS_PROPERTY_NAMES.includes(name)) return "__" + name;
		return name;
	};
	defaultOptions = {
		preserveOrder: false,
		attributeNamePrefix: "@_",
		attributesGroupName: false,
		textNodeName: "#text",
		ignoreAttributes: true,
		removeNSPrefix: false,
		allowBooleanAttributes: false,
		parseTagValue: true,
		parseAttributeValue: false,
		trimValues: true,
		cdataPropName: false,
		numberParseOptions: {
			hex: true,
			leadingZeros: true,
			eNotation: true
		},
		tagValueProcessor: function(tagName, val) {
			return val;
		},
		attributeValueProcessor: function(attrName, val) {
			return val;
		},
		stopNodes: [],
		alwaysCreateTextNode: false,
		isArray: () => false,
		commentPropName: false,
		unpairedTags: [],
		processEntities: true,
		htmlEntities: false,
		entityDecoder: null,
		ignoreDeclaration: false,
		ignorePiTags: false,
		transformTagName: false,
		transformAttributeName: false,
		updateTag: function(tagName, jPath, attrs) {
			return tagName;
		},
		captureMetaData: false,
		maxNestedTags: 100,
		strictReservedNames: true,
		jPath: true,
		onDangerousProperty: defaultOnDangerousProperty
	};
	buildOptions = function(options) {
		const built = Object.assign({}, defaultOptions, options);
		const propertyNameOptions = [
			{
				value: built.attributeNamePrefix,
				name: "attributeNamePrefix"
			},
			{
				value: built.attributesGroupName,
				name: "attributesGroupName"
			},
			{
				value: built.textNodeName,
				name: "textNodeName"
			},
			{
				value: built.cdataPropName,
				name: "cdataPropName"
			},
			{
				value: built.commentPropName,
				name: "commentPropName"
			}
		];
		for (const { value, name } of propertyNameOptions) if (value) validatePropertyName(value, name);
		if (built.onDangerousProperty === null) built.onDangerousProperty = defaultOnDangerousProperty;
		built.processEntities = normalizeProcessEntities(built.processEntities, built.htmlEntities);
		built.unpairedTagsSet = new Set(built.unpairedTags);
		if (built.stopNodes && Array.isArray(built.stopNodes)) built.stopNodes = built.stopNodes.map((node) => {
			if (typeof node === "string" && node.startsWith("*.")) return ".." + node.substring(2);
			return node;
		});
		return built;
	};
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var METADATA_SYMBOL$1, XmlNode;
var init_xmlNode = __esmMin((() => {
	if (typeof Symbol !== "function") METADATA_SYMBOL$1 = "@@xmlMetadata";
	else METADATA_SYMBOL$1 = Symbol("XML Node Metadata");
	XmlNode = class {
		constructor(tagname) {
			this.tagname = tagname;
			this.child = [];
			this[":@"] = Object.create(null);
		}
		add(key, val) {
			if (key === "__proto__") key = "#__proto__";
			this.child.push({ [key]: val });
		}
		addChild(node, startIndex) {
			if (node.tagname === "__proto__") node.tagname = "#__proto__";
			if (node[":@"] && Object.keys(node[":@"]).length > 0) this.child.push({
				[node.tagname]: node.child,
				[":@"]: node[":@"]
			});
			else this.child.push({ [node.tagname]: node.child });
			if (startIndex !== void 0) this.child[this.child.length - 1][METADATA_SYMBOL$1] = { startIndex };
		}
		/** symbol used for metadata */
		static getMetaDataSymbol() {
			return METADATA_SYMBOL$1;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
function hasSeq(data, seq, i) {
	for (let j = 0; j < seq.length; j++) if (seq[j] !== data[i + j + 1]) return false;
	return true;
}
function validateEntityName$1(name) {
	if (isName(name)) return name;
	else throw new Error(`Invalid entity name ${name}`);
}
var DocTypeReader, skipWhitespace;
var init_DocTypeReader = __esmMin((() => {
	init_util();
	DocTypeReader = class {
		constructor(options) {
			this.suppressValidationErr = !options;
			this.options = options;
		}
		readDocType(xmlData, i) {
			const entities = Object.create(null);
			let entityCount = 0;
			if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
				i = i + 9;
				let angleBracketsCount = 1;
				let hasBody = false, comment = false;
				let exp = "";
				for (; i < xmlData.length; i++) if (xmlData[i] === "<" && !comment) {
					if (hasBody && hasSeq(xmlData, "!ENTITY", i)) {
						i += 7;
						let entityName, val;
						[entityName, val, i] = this.readEntityExp(xmlData, i + 1, this.suppressValidationErr);
						if (val.indexOf("&") === -1) {
							if (this.options.enabled !== false && this.options.maxEntityCount != null && entityCount >= this.options.maxEntityCount) throw new Error(`Entity count (${entityCount + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`);
							entities[entityName] = val;
							entityCount++;
						}
					} else if (hasBody && hasSeq(xmlData, "!ELEMENT", i)) {
						i += 8;
						const { index } = this.readElementExp(xmlData, i + 1);
						i = index;
					} else if (hasBody && hasSeq(xmlData, "!ATTLIST", i)) i += 8;
					else if (hasBody && hasSeq(xmlData, "!NOTATION", i)) {
						i += 9;
						const { index } = this.readNotationExp(xmlData, i + 1, this.suppressValidationErr);
						i = index;
					} else if (hasSeq(xmlData, "!--", i)) comment = true;
					else throw new Error(`Invalid DOCTYPE`);
					angleBracketsCount++;
					exp = "";
				} else if (xmlData[i] === ">") {
					if (comment) {
						if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
							comment = false;
							angleBracketsCount--;
						}
					} else angleBracketsCount--;
					if (angleBracketsCount === 0) break;
				} else if (xmlData[i] === "[") hasBody = true;
				else exp += xmlData[i];
				if (angleBracketsCount !== 0) throw new Error(`Unclosed DOCTYPE`);
			} else throw new Error(`Invalid Tag instead of DOCTYPE`);
			return {
				entities,
				i
			};
		}
		readEntityExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			const startIndex = i;
			while (i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== "\"" && xmlData[i] !== "'") i++;
			let entityName = xmlData.substring(startIndex, i);
			validateEntityName$1(entityName);
			i = skipWhitespace(xmlData, i);
			if (!this.suppressValidationErr) {
				if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") throw new Error("External entities are not supported");
				else if (xmlData[i] === "%") throw new Error("Parameter entities are not supported");
			}
			let entityValue = "";
			[i, entityValue] = this.readIdentifierVal(xmlData, i, "entity");
			if (this.options.enabled !== false && this.options.maxEntitySize != null && entityValue.length > this.options.maxEntitySize) throw new Error(`Entity "${entityName}" size (${entityValue.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);
			i--;
			return [
				entityName,
				entityValue,
				i
			];
		}
		readNotationExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			const startIndex = i;
			while (i < xmlData.length && !/\s/.test(xmlData[i])) i++;
			let notationName = xmlData.substring(startIndex, i);
			!this.suppressValidationErr && validateEntityName$1(notationName);
			i = skipWhitespace(xmlData, i);
			const identifierType = xmlData.substring(i, i + 6).toUpperCase();
			if (!this.suppressValidationErr && identifierType !== "SYSTEM" && identifierType !== "PUBLIC") throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
			i += identifierType.length;
			i = skipWhitespace(xmlData, i);
			let publicIdentifier = null;
			let systemIdentifier = null;
			if (identifierType === "PUBLIC") {
				[i, publicIdentifier] = this.readIdentifierVal(xmlData, i, "publicIdentifier");
				i = skipWhitespace(xmlData, i);
				if (xmlData[i] === "\"" || xmlData[i] === "'") [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
			} else if (identifierType === "SYSTEM") {
				[i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
				if (!this.suppressValidationErr && !systemIdentifier) throw new Error("Missing mandatory system identifier for SYSTEM notation");
			}
			return {
				notationName,
				publicIdentifier,
				systemIdentifier,
				index: --i
			};
		}
		readIdentifierVal(xmlData, i, type) {
			let identifierVal = "";
			const startChar = xmlData[i];
			if (startChar !== "\"" && startChar !== "'") throw new Error(`Expected quoted string, found "${startChar}"`);
			i++;
			const startIndex = i;
			while (i < xmlData.length && xmlData[i] !== startChar) i++;
			identifierVal = xmlData.substring(startIndex, i);
			if (xmlData[i] !== startChar) throw new Error(`Unterminated ${type} value`);
			i++;
			return [i, identifierVal];
		}
		readElementExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			const startIndex = i;
			while (i < xmlData.length && !/\s/.test(xmlData[i])) i++;
			let elementName = xmlData.substring(startIndex, i);
			if (!this.suppressValidationErr && !isName(elementName)) throw new Error(`Invalid element name: "${elementName}"`);
			i = skipWhitespace(xmlData, i);
			let contentModel = "";
			if (xmlData[i] === "E" && hasSeq(xmlData, "MPTY", i)) i += 4;
			else if (xmlData[i] === "A" && hasSeq(xmlData, "NY", i)) i += 2;
			else if (xmlData[i] === "(") {
				i++;
				const startIndex = i;
				while (i < xmlData.length && xmlData[i] !== ")") i++;
				contentModel = xmlData.substring(startIndex, i);
				if (xmlData[i] !== ")") throw new Error("Unterminated content model");
			} else if (!this.suppressValidationErr) throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
			return {
				elementName,
				contentModel: contentModel.trim(),
				index: i
			};
		}
		readAttlistExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			let startIndex = i;
			while (i < xmlData.length && !/\s/.test(xmlData[i])) i++;
			let elementName = xmlData.substring(startIndex, i);
			validateEntityName$1(elementName);
			i = skipWhitespace(xmlData, i);
			startIndex = i;
			while (i < xmlData.length && !/\s/.test(xmlData[i])) i++;
			let attributeName = xmlData.substring(startIndex, i);
			if (!validateEntityName$1(attributeName)) throw new Error(`Invalid attribute name: "${attributeName}"`);
			i = skipWhitespace(xmlData, i);
			let attributeType = "";
			if (xmlData.substring(i, i + 8).toUpperCase() === "NOTATION") {
				attributeType = "NOTATION";
				i += 8;
				i = skipWhitespace(xmlData, i);
				if (xmlData[i] !== "(") throw new Error(`Expected '(', found "${xmlData[i]}"`);
				i++;
				let allowedNotations = [];
				while (i < xmlData.length && xmlData[i] !== ")") {
					const startIndex = i;
					while (i < xmlData.length && xmlData[i] !== "|" && xmlData[i] !== ")") i++;
					let notation = xmlData.substring(startIndex, i);
					notation = notation.trim();
					if (!validateEntityName$1(notation)) throw new Error(`Invalid notation name: "${notation}"`);
					allowedNotations.push(notation);
					if (xmlData[i] === "|") {
						i++;
						i = skipWhitespace(xmlData, i);
					}
				}
				if (xmlData[i] !== ")") throw new Error("Unterminated list of notations");
				i++;
				attributeType += " (" + allowedNotations.join("|") + ")";
			} else {
				const startIndex = i;
				while (i < xmlData.length && !/\s/.test(xmlData[i])) i++;
				attributeType += xmlData.substring(startIndex, i);
				if (!this.suppressValidationErr && ![
					"CDATA",
					"ID",
					"IDREF",
					"IDREFS",
					"ENTITY",
					"ENTITIES",
					"NMTOKEN",
					"NMTOKENS"
				].includes(attributeType.toUpperCase())) throw new Error(`Invalid attribute type: "${attributeType}"`);
			}
			i = skipWhitespace(xmlData, i);
			let defaultValue = "";
			if (xmlData.substring(i, i + 8).toUpperCase() === "#REQUIRED") {
				defaultValue = "#REQUIRED";
				i += 8;
			} else if (xmlData.substring(i, i + 7).toUpperCase() === "#IMPLIED") {
				defaultValue = "#IMPLIED";
				i += 7;
			} else [i, defaultValue] = this.readIdentifierVal(xmlData, i, "ATTLIST");
			return {
				elementName,
				attributeName,
				attributeType,
				defaultValue,
				index: i
			};
		}
	};
	skipWhitespace = (data, index) => {
		while (index < data.length && /\s/.test(data[index])) index++;
		return index;
	};
})), SCRIPT_ZEROS, HIGH_MAP, LOW_MAX, TABLE_OFFSET, TABLE;
var init_digitTable = __esmMin((() => {
	SCRIPT_ZEROS = [
		48,
		1632,
		1776,
		2406,
		2534,
		2662,
		2790,
		2918,
		3046,
		3174,
		3302,
		3430,
		3558,
		3664,
		3792,
		3872,
		4160,
		4240,
		6112,
		6160,
		6470,
		6608,
		6784,
		6800,
		6992,
		7088,
		7232,
		7248,
		65296,
		120782,
		120792,
		120802,
		120812,
		120822,
		66720,
		68912,
		69734,
		69872,
		69942,
		70096,
		70384,
		70736,
		70864,
		71248,
		71360,
		71472,
		71904,
		72016,
		72688,
		72784,
		73040,
		73120,
		73552,
		92768,
		92864,
		93008,
		123200,
		123632,
		124144,
		125264,
		130032
	];
	HIGH_MAP = /* @__PURE__ */ new Map();
	LOW_MAX = 65535;
	TABLE_OFFSET = 1632;
	TABLE = new Uint8Array(63904).fill(255);
	for (const zero of SCRIPT_ZEROS) for (let d = 0; d < 10; d++) {
		const cp = zero + d;
		if (cp <= LOW_MAX) TABLE[cp - TABLE_OFFSET] = d;
		else HIGH_MAP.set(cp, d);
	}
}));
//#endregion
//#region ../../node_modules/.bun/anynum@1.0.0/node_modules/anynum/anynum.js
/**
* Normalize all Unicode decimal digit characters in a string to ASCII (0-9),
* and normalize Unicode minus variants to ASCII '-' (U+002D).
*
* Non-digit, non-minus characters are passed through unchanged.
*
* Performance design:
* - Fast path: if the string has no convertible characters, return it unchanged
*   (zero allocation).
* - BMP digits (0x0660..0xFFFF excl. surrogates): flat Uint8Array lookup (O(1)).
* - Supplementary plane digits (> 0xFFFF, encoded as surrogate pairs): Map lookup.
* - Minus variants: checked inline with a small fixed Set.
*
* @param {string} str
* @returns {string}
*/
function anynum(str) {
	if (typeof str !== "string") return str;
	const len = str.length;
	if (len === 0) return str;
	let firstHit = -1;
	for (let i = 0; i < len; i++) {
		const cc = str.charCodeAt(i);
		if (cc >= CHAR_0 && cc <= CHAR_9 || cc === CHAR_MINUS) continue;
		if (cc < 1632) {
			if (MINUS_SET.has(cc)) {
				firstHit = i;
				break;
			}
			continue;
		}
		if (cc >= 55296 && cc <= 56319) {
			if (i + 1 < len) {
				const low = str.charCodeAt(i + 1);
				if (low >= 56320 && low <= 57343) {
					const cp = 65536 + (cc - 55296 << 10) + (low - 56320);
					if (HIGH_MAP.has(cp)) {
						firstHit = i;
						break;
					}
				}
			}
			continue;
		}
		if (TABLE[cc - 1632] !== 255 || MINUS_SET.has(cc)) {
			firstHit = i;
			break;
		}
	}
	if (firstHit === -1) return str;
	const chars = [];
	if (firstHit > 0) chars.push(str.slice(0, firstHit));
	for (let i = firstHit; i < len; i++) {
		const cc = str.charCodeAt(i);
		if (cc >= CHAR_0 && cc <= CHAR_9 || cc === CHAR_MINUS) {
			chars.push(str[i]);
			continue;
		}
		if (cc < 1632) {
			chars.push(MINUS_SET.has(cc) ? "-" : str[i]);
			continue;
		}
		if (cc >= 55296 && cc <= 56319) {
			if (i + 1 < len) {
				const low = str.charCodeAt(i + 1);
				if (low >= 56320 && low <= 57343) {
					const cp = 65536 + (cc - 55296 << 10) + (low - 56320);
					const d = HIGH_MAP.get(cp);
					if (d !== void 0) {
						chars.push(String.fromCharCode(d + 48));
						i++;
						continue;
					}
				}
			}
			chars.push(str[i]);
			continue;
		}
		if (MINUS_SET.has(cc)) {
			chars.push("-");
			continue;
		}
		const d = TABLE[cc - TABLE_OFFSET];
		chars.push(d !== 255 ? String.fromCharCode(d + 48) : str[i]);
	}
	return chars.join("");
}
var CHAR_0, CHAR_9, CHAR_MINUS, MINUS_SET;
var init_anynum = __esmMin((() => {
	init_digitTable();
	CHAR_0 = 48;
	CHAR_9 = 57;
	CHAR_MINUS = 45;
	MINUS_SET = new Set([
		8722,
		65293,
		65123
	]);
}));
//#endregion
//#region ../../node_modules/.bun/strnum@2.4.0/node_modules/strnum/strnum.js
function toNumber(str, options = {}) {
	options = Object.assign({}, consider, options);
	if (!str || typeof str !== "string") return str;
	let trimmedStr = str.trim();
	if (trimmedStr.length === 0) return str;
	else if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
	else if (trimmedStr === "0") return 0;
	if (options.unicode) {
		trimmedStr = anynum(trimmedStr);
		if (trimmedStr === "0") return 0;
	}
	if (options.hex && hexRegex.test(trimmedStr)) return parse_int(trimmedStr, 16);
	else if (options.binary && binRegex.test(trimmedStr)) return parse_int(trimmedStr, 2);
	else if (options.octal && octRegex.test(trimmedStr)) return parse_int(trimmedStr, 8);
	else if (!isFinite(trimmedStr)) return handleInfinity(str, Number(trimmedStr), options);
	else if (trimmedStr.includes("e") || trimmedStr.includes("E")) return resolveEnotation(str, trimmedStr, options);
	else {
		const match = numRegex.exec(trimmedStr);
		if (match) {
			const sign = match[1] || "";
			const leadingZeros = match[2];
			let numTrimmedByZeros = trimZeros(match[3]);
			const decimalAdjacentToLeadingZeros = sign ? str[leadingZeros.length + 1] === "." : str[leadingZeros.length] === ".";
			if (!options.leadingZeros && (leadingZeros.length > 1 || leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros)) return str;
			else {
				const num = Number(trimmedStr);
				const parsedStr = String(num);
				if (num === 0) return num;
				if (parsedStr.search(/[eE]/) !== -1) if (options.eNotation) return num;
				else return str;
				else if (trimmedStr.indexOf(".") !== -1) if (parsedStr === "0") return num;
				else if (parsedStr === numTrimmedByZeros) return num;
				else if (parsedStr === `${sign}${numTrimmedByZeros}`) return num;
				else return str;
				let n = leadingZeros ? numTrimmedByZeros : trimmedStr;
				if (leadingZeros) return n === parsedStr || sign + n === parsedStr ? num : str;
				else return n === parsedStr || n === sign + parsedStr ? num : str;
			}
		} else return str;
	}
}
function resolveEnotation(str, trimmedStr, options) {
	if (!options.eNotation) return str;
	const notation = trimmedStr.match(eNotationRegx);
	if (notation) {
		let sign = notation[1] || "";
		const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
		const leadingZeros = notation[2];
		const eAdjacentToLeadingZeros = sign ? str[leadingZeros.length + 1] === eChar : str[leadingZeros.length] === eChar;
		if (leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
		else if (leadingZeros.length === 1 && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)) return Number(trimmedStr);
		else if (leadingZeros.length > 0) if (options.leadingZeros && !eAdjacentToLeadingZeros) {
			trimmedStr = (notation[1] || "") + notation[3];
			return Number(trimmedStr);
		} else return str;
		else return Number(trimmedStr);
	} else return str;
}
/**
* 
* @param {string} numStr without leading zeros
* @returns 
*/
function trimZeros(numStr) {
	if (numStr && numStr.indexOf(".") !== -1) {
		numStr = numStr.replace(/0+$/, "");
		if (numStr === ".") numStr = "0";
		else if (numStr[0] === ".") numStr = "0" + numStr;
		else if (numStr[numStr.length - 1] === ".") numStr = numStr.substring(0, numStr.length - 1);
		return numStr;
	}
	return numStr;
}
function parse_int(numStr, base) {
	const str = numStr.trim();
	if (base === 2 || base === 8) numStr = str.substring(2);
	if (parseInt) return parseInt(numStr, base);
	else if (Number.parseInt) return Number.parseInt(numStr, base);
	else if (window && window.parseInt) return window.parseInt(numStr, base);
	else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
/**
* Handle infinite values based on user option
* @param {string} str - original input string
* @param {number} num - parsed number (Infinity or -Infinity)
* @param {object} options - user options
* @returns {string|number|null} based on infinity option
*/
function handleInfinity(str, num, options) {
	const isPositive = num === Infinity;
	switch (options.infinity.toLowerCase()) {
		case "null": return null;
		case "infinity": return num;
		case "string": return isPositive ? "Infinity" : "-Infinity";
		default: return str;
	}
}
var hexRegex, binRegex, octRegex, numRegex, consider, eNotationRegx;
var init_strnum = __esmMin((() => {
	init_anynum();
	hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
	binRegex = /^0b[01]+$/;
	octRegex = /^0o[0-7]+$/;
	numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
	consider = {
		hex: true,
		binary: false,
		octal: false,
		leadingZeros: true,
		decimalPoint: ".",
		eNotation: true,
		infinity: "original",
		unicode: false
	};
	eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/ignoreAttributes.js
function getIgnoreAttributesFn(ignoreAttributes) {
	if (typeof ignoreAttributes === "function") return ignoreAttributes;
	if (Array.isArray(ignoreAttributes)) return (attrName) => {
		for (const pattern of ignoreAttributes) {
			if (typeof pattern === "string" && attrName === pattern) return true;
			if (pattern instanceof RegExp && pattern.test(attrName)) return true;
		}
	};
	return () => false;
}
var init_ignoreAttributes = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/path-expression-matcher@1.5.0/node_modules/path-expression-matcher/src/Expression.js
var Expression;
var init_Expression = __esmMin((() => {
	Expression = class {
		/**
		* Create a new Expression
		* @param {string} pattern - Pattern string (e.g., "root.users.user", "..user[id]")
		* @param {Object} options - Configuration options
		* @param {string} options.separator - Path separator (default: '.')
		*/
		constructor(pattern, options = {}, data) {
			this.pattern = pattern;
			this.separator = options.separator || ".";
			this.segments = this._parse(pattern);
			this.data = data;
			this._hasDeepWildcard = this.segments.some((seg) => seg.type === "deep-wildcard");
			this._hasAttributeCondition = this.segments.some((seg) => seg.attrName !== void 0);
			this._hasPositionSelector = this.segments.some((seg) => seg.position !== void 0);
		}
		/**
		* Parse pattern string into segments
		* @private
		* @param {string} pattern - Pattern to parse
		* @returns {Array} Array of segment objects
		*/
		_parse(pattern) {
			const segments = [];
			let i = 0;
			let currentPart = "";
			while (i < pattern.length) if (pattern[i] === this.separator) if (i + 1 < pattern.length && pattern[i + 1] === this.separator) {
				if (currentPart.trim()) {
					segments.push(this._parseSegment(currentPart.trim()));
					currentPart = "";
				}
				segments.push({ type: "deep-wildcard" });
				i += 2;
			} else {
				if (currentPart.trim()) segments.push(this._parseSegment(currentPart.trim()));
				currentPart = "";
				i++;
			}
			else {
				currentPart += pattern[i];
				i++;
			}
			if (currentPart.trim()) segments.push(this._parseSegment(currentPart.trim()));
			return segments;
		}
		/**
		* Parse a single segment
		* @private
		* @param {string} part - Segment string (e.g., "user", "ns::user", "user[id]", "ns::user:first")
		* @returns {Object} Segment object
		*/
		_parseSegment(part) {
			const segment = { type: "tag" };
			let bracketContent = null;
			let withoutBrackets = part;
			const bracketMatch = part.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
			if (bracketMatch) {
				withoutBrackets = bracketMatch[1] + bracketMatch[3];
				if (bracketMatch[2]) {
					const content = bracketMatch[2].slice(1, -1);
					if (content) bracketContent = content;
				}
			}
			let namespace = void 0;
			let tagAndPosition = withoutBrackets;
			if (withoutBrackets.includes("::")) {
				const nsIndex = withoutBrackets.indexOf("::");
				namespace = withoutBrackets.substring(0, nsIndex).trim();
				tagAndPosition = withoutBrackets.substring(nsIndex + 2).trim();
				if (!namespace) throw new Error(`Invalid namespace in pattern: ${part}`);
			}
			let tag = void 0;
			let positionMatch = null;
			if (tagAndPosition.includes(":")) {
				const colonIndex = tagAndPosition.lastIndexOf(":");
				const tagPart = tagAndPosition.substring(0, colonIndex).trim();
				const posPart = tagAndPosition.substring(colonIndex + 1).trim();
				if ([
					"first",
					"last",
					"odd",
					"even"
				].includes(posPart) || /^nth\(\d+\)$/.test(posPart)) {
					tag = tagPart;
					positionMatch = posPart;
				} else tag = tagAndPosition;
			} else tag = tagAndPosition;
			if (!tag) throw new Error(`Invalid segment pattern: ${part}`);
			segment.tag = tag;
			if (namespace) segment.namespace = namespace;
			if (bracketContent) if (bracketContent.includes("=")) {
				const eqIndex = bracketContent.indexOf("=");
				segment.attrName = bracketContent.substring(0, eqIndex).trim();
				segment.attrValue = bracketContent.substring(eqIndex + 1).trim();
			} else segment.attrName = bracketContent.trim();
			if (positionMatch) {
				const nthMatch = positionMatch.match(/^nth\((\d+)\)$/);
				if (nthMatch) {
					segment.position = "nth";
					segment.positionValue = parseInt(nthMatch[1], 10);
				} else segment.position = positionMatch;
			}
			return segment;
		}
		/**
		* Get the number of segments
		* @returns {number}
		*/
		get length() {
			return this.segments.length;
		}
		/**
		* Check if expression contains deep wildcard
		* @returns {boolean}
		*/
		hasDeepWildcard() {
			return this._hasDeepWildcard;
		}
		/**
		* Check if expression has attribute conditions
		* @returns {boolean}
		*/
		hasAttributeCondition() {
			return this._hasAttributeCondition;
		}
		/**
		* Check if expression has position selectors
		* @returns {boolean}
		*/
		hasPositionSelector() {
			return this._hasPositionSelector;
		}
		/**
		* Get string representation
		* @returns {string}
		*/
		toString() {
			return this.pattern;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/path-expression-matcher@1.5.0/node_modules/path-expression-matcher/src/ExpressionSet.js
var ExpressionSet;
var init_ExpressionSet = __esmMin((() => {
	ExpressionSet = class {
		constructor() {
			/** @type {Map<string, import('./Expression.js').default[]>} depth:tag → expressions */
			this._byDepthAndTag = /* @__PURE__ */ new Map();
			/** @type {Map<number, import('./Expression.js').default[]>} depth → wildcard-tag expressions */
			this._wildcardByDepth = /* @__PURE__ */ new Map();
			/** @type {import('./Expression.js').default[]} expressions containing deep wildcard (..) */
			this._deepWildcards = [];
			/** @type {Set<string>} pattern strings already added — used for deduplication */
			this._patterns = /* @__PURE__ */ new Set();
			/** @type {boolean} whether the set is sealed against further additions */
			this._sealed = false;
		}
		/**
		* Add an Expression to the set.
		* Duplicate patterns (same pattern string) are silently ignored.
		*
		* @param {import('./Expression.js').default} expression - A pre-constructed Expression instance
		* @returns {this} for chaining
		* @throws {TypeError} if called after seal()
		*
		* @example
		* set.add(new Expression('root.users.user'));
		* set.add(new Expression('..script'));
		*/
		add(expression) {
			if (this._sealed) throw new TypeError("ExpressionSet is sealed. Create a new ExpressionSet to add more expressions.");
			if (this._patterns.has(expression.pattern)) return this;
			this._patterns.add(expression.pattern);
			if (expression.hasDeepWildcard()) {
				this._deepWildcards.push(expression);
				return this;
			}
			const depth = expression.length;
			const tag = expression.segments[expression.segments.length - 1]?.tag;
			if (!tag || tag === "*") {
				if (!this._wildcardByDepth.has(depth)) this._wildcardByDepth.set(depth, []);
				this._wildcardByDepth.get(depth).push(expression);
			} else {
				const key = `${depth}:${tag}`;
				if (!this._byDepthAndTag.has(key)) this._byDepthAndTag.set(key, []);
				this._byDepthAndTag.get(key).push(expression);
			}
			return this;
		}
		/**
		* Add multiple expressions at once.
		*
		* @param {import('./Expression.js').default[]} expressions - Array of Expression instances
		* @returns {this} for chaining
		*
		* @example
		* set.addAll([
		*   new Expression('root.users.user'),
		*   new Expression('root.config.setting'),
		* ]);
		*/
		addAll(expressions) {
			for (const expr of expressions) this.add(expr);
			return this;
		}
		/**
		* Check whether a pattern string is already present in the set.
		*
		* @param {import('./Expression.js').default} expression
		* @returns {boolean}
		*/
		has(expression) {
			return this._patterns.has(expression.pattern);
		}
		/**
		* Number of expressions in the set.
		* @type {number}
		*/
		get size() {
			return this._patterns.size;
		}
		/**
		* Seal the set against further modifications.
		* Useful to prevent accidental mutations after config is built.
		* Calling add() or addAll() on a sealed set throws a TypeError.
		*
		* @returns {this}
		*/
		seal() {
			this._sealed = true;
			return this;
		}
		/**
		* Whether the set has been sealed.
		* @type {boolean}
		*/
		get isSealed() {
			return this._sealed;
		}
		/**
		* Test whether the matcher's current path matches any expression in the set.
		*
		* Evaluation order (cheapest → most expensive):
		*  1. Exact depth + tag bucket  — O(1) lookup, typically 0–2 expressions
		*  2. Depth-only wildcard bucket — O(1) lookup, rare
		*  3. Deep-wildcard list         — always checked, but usually small
		*
		* @param {import('./Matcher.js').default} matcher - Matcher instance (or readOnly view)
		* @returns {boolean} true if any expression matches the current path
		*
		* @example
		* if (stopNodes.matchesAny(matcher)) {
		*   // handle stop node
		* }
		*/
		matchesAny(matcher) {
			return this.findMatch(matcher) !== null;
		}
		/**
		* Find and return the first Expression that matches the matcher's current path.
		*
		* Uses the same evaluation order as matchesAny (cheapest → most expensive):
		*  1. Exact depth + tag bucket
		*  2. Depth-only wildcard bucket
		*  3. Deep-wildcard list
		*
		* @param {import('./Matcher.js').default} matcher - Matcher instance (or readOnly view)
		* @returns {import('./Expression.js').default | null} the first matching Expression, or null
		*
		* @example
		* const expr = stopNodes.findMatch(matcher);
		* if (expr) {
		*   // access expr.config, expr.pattern, etc.
		* }
		*/
		findMatch(matcher) {
			const depth = matcher.getDepth();
			const exactKey = `${depth}:${matcher.getCurrentTag()}`;
			const exactBucket = this._byDepthAndTag.get(exactKey);
			if (exactBucket) {
				for (let i = 0; i < exactBucket.length; i++) if (matcher.matches(exactBucket[i])) return exactBucket[i];
			}
			const wildcardBucket = this._wildcardByDepth.get(depth);
			if (wildcardBucket) {
				for (let i = 0; i < wildcardBucket.length; i++) if (matcher.matches(wildcardBucket[i])) return wildcardBucket[i];
			}
			for (let i = 0; i < this._deepWildcards.length; i++) if (matcher.matches(this._deepWildcards[i])) return this._deepWildcards[i];
			return null;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/path-expression-matcher@1.5.0/node_modules/path-expression-matcher/src/Matcher.js
var MatcherView, Matcher;
var init_Matcher = __esmMin((() => {
	MatcherView = class {
		/**
		* @param {Matcher} matcher - The parent Matcher instance to read from.
		*/
		constructor(matcher) {
			this._matcher = matcher;
		}
		/**
		* Get the path separator used by the parent matcher.
		* @returns {string}
		*/
		get separator() {
			return this._matcher.separator;
		}
		/**
		* Get current tag name.
		* @returns {string|undefined}
		*/
		getCurrentTag() {
			const path = this._matcher.path;
			return path.length > 0 ? path[path.length - 1].tag : void 0;
		}
		/**
		* Get current namespace.
		* @returns {string|undefined}
		*/
		getCurrentNamespace() {
			const path = this._matcher.path;
			return path.length > 0 ? path[path.length - 1].namespace : void 0;
		}
		/**
		* Get current node's attribute value.
		* @param {string} attrName
		* @returns {*}
		*/
		getAttrValue(attrName) {
			const path = this._matcher.path;
			if (path.length === 0) return void 0;
			return path[path.length - 1].values?.[attrName];
		}
		/**
		* Check if current node has an attribute.
		* @param {string} attrName
		* @returns {boolean}
		*/
		hasAttr(attrName) {
			const path = this._matcher.path;
			if (path.length === 0) return false;
			const current = path[path.length - 1];
			return current.values !== void 0 && attrName in current.values;
		}
		/**
		* Get current node's sibling position (child index in parent).
		* @returns {number}
		*/
		getPosition() {
			const path = this._matcher.path;
			if (path.length === 0) return -1;
			return path[path.length - 1].position ?? 0;
		}
		/**
		* Get current node's repeat counter (occurrence count of this tag name).
		* @returns {number}
		*/
		getCounter() {
			const path = this._matcher.path;
			if (path.length === 0) return -1;
			return path[path.length - 1].counter ?? 0;
		}
		/**
		* Get current node's sibling index (alias for getPosition).
		* @returns {number}
		* @deprecated Use getPosition() or getCounter() instead
		*/
		getIndex() {
			return this.getPosition();
		}
		/**
		* Get current path depth.
		* @returns {number}
		*/
		getDepth() {
			return this._matcher.path.length;
		}
		/**
		* Get path as string.
		* @param {string} [separator] - Optional separator (uses default if not provided)
		* @param {boolean} [includeNamespace=true]
		* @returns {string}
		*/
		toString(separator, includeNamespace = true) {
			return this._matcher.toString(separator, includeNamespace);
		}
		/**
		* Get path as array of tag names.
		* @returns {string[]}
		*/
		toArray() {
			return this._matcher.path.map((n) => n.tag);
		}
		/**
		* Match current path against an Expression.
		* @param {Expression} expression
		* @returns {boolean}
		*/
		matches(expression) {
			return this._matcher.matches(expression);
		}
		/**
		* Match any expression in the given set against the current path.
		* @param {ExpressionSet} exprSet
		* @returns {boolean}
		*/
		matchesAny(exprSet) {
			return exprSet.matchesAny(this._matcher);
		}
	};
	Matcher = class {
		/**
		* Create a new Matcher.
		* @param {Object} [options={}]
		* @param {string} [options.separator='.'] - Default path separator
		*/
		constructor(options = {}) {
			this.separator = options.separator || ".";
			this.path = [];
			this.siblingStacks = [];
			this._pathStringCache = null;
			this._view = new MatcherView(this);
		}
		/**
		* Push a new tag onto the path.
		* @param {string} tagName
		* @param {Object|null} [attrValues=null]
		* @param {string|null} [namespace=null]
		*/
		push(tagName, attrValues = null, namespace = null) {
			this._pathStringCache = null;
			if (this.path.length > 0) this.path[this.path.length - 1].values = void 0;
			const currentLevel = this.path.length;
			if (!this.siblingStacks[currentLevel]) this.siblingStacks[currentLevel] = /* @__PURE__ */ new Map();
			const siblings = this.siblingStacks[currentLevel];
			const siblingKey = namespace ? `${namespace}:${tagName}` : tagName;
			const counter = siblings.get(siblingKey) || 0;
			let position = 0;
			for (const count of siblings.values()) position += count;
			siblings.set(siblingKey, counter + 1);
			const node = {
				tag: tagName,
				position,
				counter
			};
			if (namespace !== null && namespace !== void 0) node.namespace = namespace;
			if (attrValues !== null && attrValues !== void 0) node.values = attrValues;
			this.path.push(node);
		}
		/**
		* Pop the last tag from the path.
		* @returns {Object|undefined} The popped node
		*/
		pop() {
			if (this.path.length === 0) return void 0;
			this._pathStringCache = null;
			const node = this.path.pop();
			if (this.siblingStacks.length > this.path.length + 1) this.siblingStacks.length = this.path.length + 1;
			return node;
		}
		/**
		* Update current node's attribute values.
		* Useful when attributes are parsed after push.
		* @param {Object} attrValues
		*/
		updateCurrent(attrValues) {
			if (this.path.length > 0) {
				const current = this.path[this.path.length - 1];
				if (attrValues !== null && attrValues !== void 0) current.values = attrValues;
			}
		}
		/**
		* Get current tag name.
		* @returns {string|undefined}
		*/
		getCurrentTag() {
			return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
		}
		/**
		* Get current namespace.
		* @returns {string|undefined}
		*/
		getCurrentNamespace() {
			return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
		}
		/**
		* Get current node's attribute value.
		* @param {string} attrName
		* @returns {*}
		*/
		getAttrValue(attrName) {
			if (this.path.length === 0) return void 0;
			return this.path[this.path.length - 1].values?.[attrName];
		}
		/**
		* Check if current node has an attribute.
		* @param {string} attrName
		* @returns {boolean}
		*/
		hasAttr(attrName) {
			if (this.path.length === 0) return false;
			const current = this.path[this.path.length - 1];
			return current.values !== void 0 && attrName in current.values;
		}
		/**
		* Get current node's sibling position (child index in parent).
		* @returns {number}
		*/
		getPosition() {
			if (this.path.length === 0) return -1;
			return this.path[this.path.length - 1].position ?? 0;
		}
		/**
		* Get current node's repeat counter (occurrence count of this tag name).
		* @returns {number}
		*/
		getCounter() {
			if (this.path.length === 0) return -1;
			return this.path[this.path.length - 1].counter ?? 0;
		}
		/**
		* Get current node's sibling index (alias for getPosition).
		* @returns {number}
		* @deprecated Use getPosition() or getCounter() instead
		*/
		getIndex() {
			return this.getPosition();
		}
		/**
		* Get current path depth.
		* @returns {number}
		*/
		getDepth() {
			return this.path.length;
		}
		/**
		* Get path as string.
		* @param {string} [separator] - Optional separator (uses default if not provided)
		* @param {boolean} [includeNamespace=true]
		* @returns {string}
		*/
		toString(separator, includeNamespace = true) {
			const sep = separator || this.separator;
			if (sep === this.separator && includeNamespace === true) {
				if (this._pathStringCache !== null) return this._pathStringCache;
				const result = this.path.map((n) => n.namespace ? `${n.namespace}:${n.tag}` : n.tag).join(sep);
				this._pathStringCache = result;
				return result;
			}
			return this.path.map((n) => includeNamespace && n.namespace ? `${n.namespace}:${n.tag}` : n.tag).join(sep);
		}
		/**
		* Get path as array of tag names.
		* @returns {string[]}
		*/
		toArray() {
			return this.path.map((n) => n.tag);
		}
		/**
		* Reset the path to empty.
		*/
		reset() {
			this._pathStringCache = null;
			this.path = [];
			this.siblingStacks = [];
		}
		/**
		* Match current path against an Expression.
		* @param {Expression} expression
		* @returns {boolean}
		*/
		matches(expression) {
			const segments = expression.segments;
			if (segments.length === 0) return false;
			if (expression.hasDeepWildcard()) return this._matchWithDeepWildcard(segments);
			return this._matchSimple(segments);
		}
		/**
		* @private
		*/
		_matchSimple(segments) {
			if (this.path.length !== segments.length) return false;
			for (let i = 0; i < segments.length; i++) if (!this._matchSegment(segments[i], this.path[i], i === this.path.length - 1)) return false;
			return true;
		}
		/**
		* @private
		*/
		_matchWithDeepWildcard(segments) {
			let pathIdx = this.path.length - 1;
			let segIdx = segments.length - 1;
			while (segIdx >= 0 && pathIdx >= 0) {
				const segment = segments[segIdx];
				if (segment.type === "deep-wildcard") {
					segIdx--;
					if (segIdx < 0) return true;
					const nextSeg = segments[segIdx];
					let found = false;
					for (let i = pathIdx; i >= 0; i--) if (this._matchSegment(nextSeg, this.path[i], i === this.path.length - 1)) {
						pathIdx = i - 1;
						segIdx--;
						found = true;
						break;
					}
					if (!found) return false;
				} else {
					if (!this._matchSegment(segment, this.path[pathIdx], pathIdx === this.path.length - 1)) return false;
					pathIdx--;
					segIdx--;
				}
			}
			return segIdx < 0;
		}
		/**
		* @private
		*/
		_matchSegment(segment, node, isCurrentNode) {
			if (segment.tag !== "*" && segment.tag !== node.tag) return false;
			if (segment.namespace !== void 0) {
				if (segment.namespace !== "*" && segment.namespace !== node.namespace) return false;
			}
			if (segment.attrName !== void 0) {
				if (!isCurrentNode) return false;
				if (!node.values || !(segment.attrName in node.values)) return false;
				if (segment.attrValue !== void 0) {
					if (String(node.values[segment.attrName]) !== String(segment.attrValue)) return false;
				}
			}
			if (segment.position !== void 0) {
				if (!isCurrentNode) return false;
				const counter = node.counter ?? 0;
				if (segment.position === "first" && counter !== 0) return false;
				else if (segment.position === "odd" && counter % 2 !== 1) return false;
				else if (segment.position === "even" && counter % 2 !== 0) return false;
				else if (segment.position === "nth" && counter !== segment.positionValue) return false;
			}
			return true;
		}
		/**
		* Match any expression in the given set against the current path.
		* @param {ExpressionSet} exprSet
		* @returns {boolean}
		*/
		matchesAny(exprSet) {
			return exprSet.matchesAny(this);
		}
		/**
		* Create a snapshot of current state.
		* @returns {Object}
		*/
		snapshot() {
			return {
				path: this.path.map((node) => ({ ...node })),
				siblingStacks: this.siblingStacks.map((map) => new Map(map))
			};
		}
		/**
		* Restore state from snapshot.
		* @param {Object} snapshot
		*/
		restore(snapshot) {
			this._pathStringCache = null;
			this.path = snapshot.path.map((node) => ({ ...node }));
			this.siblingStacks = snapshot.siblingStacks.map((map) => new Map(map));
		}
		/**
		* Return the read-only {@link MatcherView} for this matcher.
		*
		* The same instance is returned on every call — no allocation occurs.
		* It always reflects the current parser state and is safe to pass to
		* user callbacks without risk of accidental mutation.
		*
		* @returns {MatcherView}
		*
		* @example
		* const view = matcher.readOnly();
		* // pass view to callbacks — it stays in sync automatically
		* view.matches(expr);       // ✓
		* view.getCurrentTag();     // ✓
		* // view.push(...)         // ✗ method does not exist — caught by TypeScript
		*/
		readOnly() {
			return this._view;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/path-expression-matcher@1.5.0/node_modules/path-expression-matcher/src/index.js
var init_src = __esmMin((() => {
	init_Expression();
	init_Matcher();
	init_ExpressionSet();
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
/**
* Extract raw attributes (without prefix) from prefixed attribute map
* @param {object} prefixedAttrs - Attributes with prefix from buildAttributesMap
* @param {object} options - Parser options containing attributeNamePrefix
* @returns {object} Raw attributes for matcher
*/
function extractRawAttributes(prefixedAttrs, options) {
	if (!prefixedAttrs) return {};
	const attrs = options.attributesGroupName ? prefixedAttrs[options.attributesGroupName] : prefixedAttrs;
	if (!attrs) return {};
	const rawAttrs = {};
	for (const key in attrs) if (key.startsWith(options.attributeNamePrefix)) {
		const rawName = key.substring(options.attributeNamePrefix.length);
		rawAttrs[rawName] = attrs[key];
	} else rawAttrs[key] = attrs[key];
	return rawAttrs;
}
/**
* Extract namespace from raw tag name
* @param {string} rawTagName - Tag name possibly with namespace (e.g., "soap:Envelope")
* @returns {string|undefined} Namespace or undefined
*/
function extractNamespace(rawTagName) {
	if (!rawTagName || typeof rawTagName !== "string") return void 0;
	const colonIndex = rawTagName.indexOf(":");
	if (colonIndex !== -1 && colonIndex > 0) {
		const ns = rawTagName.substring(0, colonIndex);
		if (ns !== "xmlns") return ns;
	}
}
/**
* @param {string} val
* @param {string} tagName
* @param {string|Matcher} jPath - jPath string or Matcher instance based on options.jPath
* @param {boolean} dontTrim
* @param {boolean} hasAttributes
* @param {boolean} isLeafNode
* @param {boolean} escapeEntities
*/
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
	const options = this.options;
	if (val !== void 0) {
		if (options.trimValues && !dontTrim) val = val.trim();
		if (val.length > 0) {
			if (!escapeEntities) val = this.replaceEntitiesValue(val, tagName, jPath);
			const jPathOrMatcher = options.jPath ? jPath.toString() : jPath;
			const newval = options.tagValueProcessor(tagName, val, jPathOrMatcher, hasAttributes, isLeafNode);
			if (newval === null || newval === void 0) return val;
			else if (typeof newval !== typeof val || newval !== val) return newval;
			else if (options.trimValues) return parseValue(val, options.parseTagValue, options.numberParseOptions);
			else if (val.trim() === val) return parseValue(val, options.parseTagValue, options.numberParseOptions);
			else return val;
		}
	}
}
function resolveNameSpace(tagname) {
	if (this.options.removeNSPrefix) {
		const tags = tagname.split(":");
		const prefix = tagname.charAt(0) === "/" ? "/" : "";
		if (tags[0] === "xmlns") return "";
		if (tags.length === 2) tagname = prefix + tags[1];
	}
	return tagname;
}
function buildAttributesMap(attrStr, jPath, tagName, force = false) {
	const options = this.options;
	if (force === true || options.ignoreAttributes !== true && typeof attrStr === "string") {
		const matches = getAllMatches(attrStr, attrsRegx);
		const len = matches.length;
		const attrs = {};
		const processedVals = new Array(len);
		let hasRawAttrs = false;
		const rawAttrsForMatcher = {};
		for (let i = 0; i < len; i++) {
			const attrName = this.resolveNameSpace(matches[i][1]);
			const oldVal = matches[i][4];
			if (attrName.length && oldVal !== void 0) {
				let val = oldVal;
				if (options.trimValues) val = val.trim();
				val = this.replaceEntitiesValue(val, tagName, this.readonlyMatcher);
				processedVals[i] = val;
				rawAttrsForMatcher[attrName] = val;
				hasRawAttrs = true;
			}
		}
		if (hasRawAttrs && typeof jPath === "object" && jPath.updateCurrent) jPath.updateCurrent(rawAttrsForMatcher);
		const jPathStr = options.jPath ? jPath.toString() : this.readonlyMatcher;
		let hasAttrs = false;
		for (let i = 0; i < len; i++) {
			const attrName = this.resolveNameSpace(matches[i][1]);
			if (this.ignoreAttributesFn(attrName, jPathStr)) continue;
			let aName = options.attributeNamePrefix + attrName;
			if (attrName.length) {
				if (options.transformAttributeName) aName = options.transformAttributeName(aName);
				aName = sanitizeName(aName, options);
				if (matches[i][4] !== void 0) {
					const oldVal = processedVals[i];
					const newVal = options.attributeValueProcessor(attrName, oldVal, jPathStr);
					if (newVal === null || newVal === void 0) attrs[aName] = oldVal;
					else if (typeof newVal !== typeof oldVal || newVal !== oldVal) attrs[aName] = newVal;
					else attrs[aName] = parseValue(oldVal, options.parseAttributeValue, options.numberParseOptions);
					hasAttrs = true;
				} else if (options.allowBooleanAttributes) {
					attrs[aName] = true;
					hasAttrs = true;
				}
			}
		}
		if (!hasAttrs) return;
		if (options.attributesGroupName && !options.preserveOrder) {
			const attrCollection = {};
			attrCollection[options.attributesGroupName] = attrs;
			return attrCollection;
		}
		return attrs;
	}
}
function addChild(currentNode, childNode, matcher, startIndex) {
	if (!this.options.captureMetaData) startIndex = void 0;
	const jPathOrMatcher = this.options.jPath ? matcher.toString() : matcher;
	const result = this.options.updateTag(childNode.tagname, jPathOrMatcher, childNode[":@"]);
	if (result === false) {} else if (typeof result === "string") {
		childNode.tagname = result;
		currentNode.addChild(childNode, startIndex);
	} else currentNode.addChild(childNode, startIndex);
}
/**
* @param {object} val - Entity object with regex and val properties
* @param {string} tagName - Tag name
* @param {string|Matcher} jPath - jPath string or Matcher instance based on options.jPath
*/
function replaceEntitiesValue(val, tagName, jPath) {
	const entityConfig = this.options.processEntities;
	if (!entityConfig || !entityConfig.enabled) return val;
	if (entityConfig.allowedTags) {
		const jPathOrMatcher = this.options.jPath ? jPath.toString() : jPath;
		if (!(Array.isArray(entityConfig.allowedTags) ? entityConfig.allowedTags.includes(tagName) : entityConfig.allowedTags(tagName, jPathOrMatcher))) return val;
	}
	if (entityConfig.tagFilter) {
		const jPathOrMatcher = this.options.jPath ? jPath.toString() : jPath;
		if (!entityConfig.tagFilter(tagName, jPathOrMatcher)) return val;
	}
	return this.entityDecoder.decode(val);
}
function saveTextToParentTag(textData, parentNode, matcher, isLeafNode) {
	if (textData) {
		if (isLeafNode === void 0) isLeafNode = parentNode.child.length === 0;
		textData = this.parseTextData(textData, parentNode.tagname, matcher, false, parentNode[":@"] ? Object.keys(parentNode[":@"]).length !== 0 : false, isLeafNode);
		if (textData !== void 0 && textData !== "") parentNode.add(this.options.textNodeName, textData);
		textData = "";
	}
	return textData;
}
/**
* @param {Array<Expression>} stopNodeExpressions - Array of compiled Expression objects
* @param {Matcher} matcher - Current path matcher
*/
function isItStopNode() {
	if (this.stopNodeExpressionsSet.size === 0) return false;
	return this.matcher.matchesAny(this.stopNodeExpressionsSet);
}
/**
* Returns the tag Expression and where it is ending handling single-double quotes situation
* @param {string} xmlData 
* @param {number} i starting index
* @returns 
*/
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
	let attrBoundary = 0;
	const len = xmlData.length;
	const closeCode0 = closingChar.charCodeAt(0);
	const closeCode1 = closingChar.length > 1 ? closingChar.charCodeAt(1) : -1;
	let result = "";
	let segmentStart = i;
	for (let index = i; index < len; index++) {
		const code = xmlData.charCodeAt(index);
		if (attrBoundary) {
			if (code === attrBoundary) attrBoundary = 0;
		} else if (code === 34 || code === 39) attrBoundary = code;
		else if (code === closeCode0) if (closeCode1 !== -1) {
			if (xmlData.charCodeAt(index + 1) === closeCode1) {
				result += xmlData.substring(segmentStart, index);
				return {
					data: result,
					index
				};
			}
		} else {
			result += xmlData.substring(segmentStart, index);
			return {
				data: result,
				index
			};
		}
		else if (code === 9 && !attrBoundary) {
			result += xmlData.substring(segmentStart, index) + " ";
			segmentStart = index + 1;
		}
	}
}
function findClosingIndex(xmlData, str, i, errMsg) {
	const closingIndex = xmlData.indexOf(str, i);
	if (closingIndex === -1) throw new Error(errMsg);
	else return closingIndex + str.length - 1;
}
function findClosingChar(xmlData, char, i, errMsg) {
	const closingIndex = xmlData.indexOf(char, i);
	if (closingIndex === -1) throw new Error(errMsg);
	return closingIndex;
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
	const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
	if (!result) return;
	let tagExp = result.data;
	const closeIndex = result.index;
	const separatorIndex = tagExp.search(/\s/);
	let tagName = tagExp;
	let attrExpPresent = true;
	if (separatorIndex !== -1) {
		tagName = tagExp.substring(0, separatorIndex);
		tagExp = tagExp.substring(separatorIndex + 1).trimStart();
	}
	const rawTagName = tagName;
	if (removeNSPrefix) {
		const colonIndex = tagName.indexOf(":");
		if (colonIndex !== -1) {
			tagName = tagName.substr(colonIndex + 1);
			attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
		}
	}
	return {
		tagName,
		tagExp,
		closeIndex,
		attrExpPresent,
		rawTagName
	};
}
/**
* find paired tag for a stop node
* @param {string} xmlData 
* @param {string} tagName 
* @param {number} i 
*/
function readStopNodeData(xmlData, tagName, i) {
	const startIndex = i;
	let openTagCount = 1;
	const xmllen = xmlData.length;
	for (; i < xmllen; i++) if (xmlData[i] === "<") {
		const c1 = xmlData.charCodeAt(i + 1);
		if (c1 === 47) {
			const closeIndex = findClosingChar(xmlData, ">", i, `${tagName} is not closed`);
			if (xmlData.substring(i + 2, closeIndex).trim() === tagName) {
				openTagCount--;
				if (openTagCount === 0) return {
					tagContent: xmlData.substring(startIndex, i),
					i: closeIndex
				};
			}
			i = closeIndex;
		} else if (c1 === 63) i = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
		else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 45 && xmlData.charCodeAt(i + 3) === 45) i = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
		else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 91) i = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
		else {
			const tagData = readTagExp(xmlData, i, false);
			if (tagData) {
				if ((tagData && tagData.tagName) === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") openTagCount++;
				i = tagData.closeIndex;
			}
		}
	}
}
function parseValue(val, shouldParse, options) {
	if (shouldParse && typeof val === "string") {
		const newval = val.trim();
		if (newval === "true") return true;
		else if (newval === "false") return false;
		else return toNumber(val, options);
	} else if (isExist(val)) return val;
	else return "";
}
function transformTagName(fn, tagName, tagExp, options) {
	if (fn) {
		const newTagName = fn(tagName);
		if (tagExp === tagName) tagExp = newTagName;
		tagName = newTagName;
	}
	tagName = sanitizeName(tagName, options);
	return {
		tagName,
		tagExp
	};
}
function sanitizeName(name, options) {
	if (criticalProperties.includes(name)) throw new Error(`[SECURITY] Invalid name: "${name}" is a reserved JavaScript keyword that could cause prototype pollution`);
	else if (DANGEROUS_PROPERTY_NAMES.includes(name)) return options.onDangerousProperty(name);
	return name;
}
var OrderedObjParser, attrsRegx, parseXml;
var init_OrderedObjParser = __esmMin((() => {
	init_util();
	init_xmlNode();
	init_DocTypeReader();
	init_strnum();
	init_ignoreAttributes();
	init_src();
	init_src$1();
	OrderedObjParser = class {
		constructor(options, externalEntities) {
			this.options = options;
			this.currentNode = null;
			this.tagsNodeStack = [];
			this.parseXml = parseXml;
			this.parseTextData = parseTextData;
			this.resolveNameSpace = resolveNameSpace;
			this.buildAttributesMap = buildAttributesMap;
			this.isItStopNode = isItStopNode;
			this.replaceEntitiesValue = replaceEntitiesValue;
			this.readStopNodeData = readStopNodeData;
			this.saveTextToParentTag = saveTextToParentTag;
			this.addChild = addChild;
			this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
			this.entityExpansionCount = 0;
			this.currentExpandedLength = 0;
			let namedEntities = { ...XML$1 };
			if (this.options.entityDecoder) this.entityDecoder = this.options.entityDecoder;
			else {
				if (typeof this.options.htmlEntities === "object") namedEntities = this.options.htmlEntities;
				else if (this.options.htmlEntities === true) namedEntities = {
					...COMMON_HTML$1,
					...CURRENCY$1
				};
				this.entityDecoder = new EntityDecoder({
					namedEntities: {
						...namedEntities,
						...externalEntities
					},
					numericAllowed: this.options.htmlEntities,
					limit: {
						maxTotalExpansions: this.options.processEntities.maxTotalExpansions,
						maxExpandedLength: this.options.processEntities.maxExpandedLength,
						applyLimitsTo: this.options.processEntities.appliesTo
					}
				});
			}
			this.matcher = new Matcher();
			this.readonlyMatcher = this.matcher.readOnly();
			this.isCurrentNodeStopNode = false;
			this.stopNodeExpressionsSet = new ExpressionSet();
			const stopNodesOpts = this.options.stopNodes;
			if (stopNodesOpts && stopNodesOpts.length > 0) {
				for (let i = 0; i < stopNodesOpts.length; i++) {
					const stopNodeExp = stopNodesOpts[i];
					if (typeof stopNodeExp === "string") this.stopNodeExpressionsSet.add(new Expression(stopNodeExp));
					else if (stopNodeExp instanceof Expression) this.stopNodeExpressionsSet.add(stopNodeExp);
				}
				this.stopNodeExpressionsSet.seal();
			}
		}
	};
	attrsRegx = /* @__PURE__ */ new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?", "gm");
	parseXml = function(xmlData) {
		xmlData = xmlData.replace(/\r\n?/g, "\n");
		const xmlObj = new XmlNode("!xml");
		let currentNode = xmlObj;
		let textData = "";
		this.matcher.reset();
		this.entityDecoder.reset();
		this.entityExpansionCount = 0;
		this.currentExpandedLength = 0;
		const options = this.options;
		const docTypeReader = new DocTypeReader(options.processEntities);
		const xmlLen = xmlData.length;
		for (let i = 0; i < xmlLen; i++) if (xmlData[i] === "<") {
			const c1 = xmlData.charCodeAt(i + 1);
			if (c1 === 47) {
				const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
				let tagName = xmlData.substring(i + 2, closeIndex).trim();
				if (options.removeNSPrefix) {
					const colonIndex = tagName.indexOf(":");
					if (colonIndex !== -1) tagName = tagName.substr(colonIndex + 1);
				}
				tagName = transformTagName(options.transformTagName, tagName, "", options).tagName;
				if (currentNode) textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
				const lastTagName = this.matcher.getCurrentTag();
				if (tagName && options.unpairedTagsSet.has(tagName)) throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
				if (lastTagName && options.unpairedTagsSet.has(lastTagName)) {
					this.matcher.pop();
					this.tagsNodeStack.pop();
				}
				this.matcher.pop();
				this.isCurrentNodeStopNode = false;
				currentNode = this.tagsNodeStack.pop();
				textData = "";
				i = closeIndex;
			} else if (c1 === 63) {
				let tagData = readTagExp(xmlData, i, false, "?>");
				if (!tagData) throw new Error("Pi Tag is not closed.");
				textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
				const attsMap = this.buildAttributesMap(tagData.tagExp, this.matcher, tagData.tagName, true);
				if (attsMap) {
					const ver = attsMap[this.options.attributeNamePrefix + "version"];
					this.entityDecoder.setXmlVersion(Number(ver) || 1);
				}
				if (options.ignoreDeclaration && tagData.tagName === "?xml" || options.ignorePiTags) {} else {
					const childNode = new XmlNode(tagData.tagName);
					childNode.add(options.textNodeName, "");
					if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent && options.ignoreAttributes !== true) childNode[":@"] = attsMap;
					this.addChild(currentNode, childNode, this.readonlyMatcher, i);
				}
				i = tagData.closeIndex + 1;
			} else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 45 && xmlData.charCodeAt(i + 3) === 45) {
				const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
				if (options.commentPropName) {
					const comment = xmlData.substring(i + 4, endIndex - 2);
					textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
					currentNode.add(options.commentPropName, [{ [options.textNodeName]: comment }]);
				}
				i = endIndex;
			} else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 68) {
				const result = docTypeReader.readDocType(xmlData, i);
				this.entityDecoder.addInputEntities(result.entities);
				i = result.i;
			} else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 91) {
				const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
				const tagExp = xmlData.substring(i + 9, closeIndex);
				textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
				let val = this.parseTextData(tagExp, currentNode.tagname, this.readonlyMatcher, true, false, true, true);
				if (val == void 0) val = "";
				if (options.cdataPropName) currentNode.add(options.cdataPropName, [{ [options.textNodeName]: tagExp }]);
				else currentNode.add(options.textNodeName, val);
				i = closeIndex + 2;
			} else {
				let result = readTagExp(xmlData, i, options.removeNSPrefix);
				if (!result) {
					const context = xmlData.substring(Math.max(0, i - 50), Math.min(xmlLen, i + 50));
					throw new Error(`readTagExp returned undefined at position ${i}. Context: "${context}"`);
				}
				let tagName = result.tagName;
				const rawTagName = result.rawTagName;
				let tagExp = result.tagExp;
				let attrExpPresent = result.attrExpPresent;
				let closeIndex = result.closeIndex;
				({tagName, tagExp} = transformTagName(options.transformTagName, tagName, tagExp, options));
				if (options.strictReservedNames && (tagName === options.commentPropName || tagName === options.cdataPropName || tagName === options.textNodeName || tagName === options.attributesGroupName)) throw new Error(`Invalid tag name: ${tagName}`);
				if (currentNode && textData) {
					if (currentNode.tagname !== "!xml") textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher, false);
				}
				const lastTag = currentNode;
				if (lastTag && options.unpairedTagsSet.has(lastTag.tagname)) {
					currentNode = this.tagsNodeStack.pop();
					this.matcher.pop();
				}
				let isSelfClosing = false;
				if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
					isSelfClosing = true;
					if (tagName[tagName.length - 1] === "/") {
						tagName = tagName.substr(0, tagName.length - 1);
						tagExp = tagName;
					} else tagExp = tagExp.substr(0, tagExp.length - 1);
					attrExpPresent = tagName !== tagExp;
				}
				let prefixedAttrs = null;
				let namespace = void 0;
				namespace = extractNamespace(rawTagName);
				if (tagName !== xmlObj.tagname) this.matcher.push(tagName, {}, namespace);
				if (tagName !== tagExp && attrExpPresent) {
					prefixedAttrs = this.buildAttributesMap(tagExp, this.matcher, tagName);
					if (prefixedAttrs) extractRawAttributes(prefixedAttrs, options);
				}
				if (tagName !== xmlObj.tagname) this.isCurrentNodeStopNode = this.isItStopNode();
				const startIndex = i;
				if (this.isCurrentNodeStopNode) {
					let tagContent = "";
					if (isSelfClosing) i = result.closeIndex;
					else if (options.unpairedTagsSet.has(tagName)) i = result.closeIndex;
					else {
						const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
						if (!result) throw new Error(`Unexpected end of ${rawTagName}`);
						i = result.i;
						tagContent = result.tagContent;
					}
					const childNode = new XmlNode(tagName);
					if (prefixedAttrs) childNode[":@"] = prefixedAttrs;
					childNode.add(options.textNodeName, tagContent);
					this.matcher.pop();
					this.isCurrentNodeStopNode = false;
					this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
				} else {
					if (isSelfClosing) {
						({tagName, tagExp} = transformTagName(options.transformTagName, tagName, tagExp, options));
						const childNode = new XmlNode(tagName);
						if (prefixedAttrs) childNode[":@"] = prefixedAttrs;
						this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
						this.matcher.pop();
						this.isCurrentNodeStopNode = false;
					} else if (options.unpairedTagsSet.has(tagName)) {
						const childNode = new XmlNode(tagName);
						if (prefixedAttrs) childNode[":@"] = prefixedAttrs;
						this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
						this.matcher.pop();
						this.isCurrentNodeStopNode = false;
						i = result.closeIndex;
						continue;
					} else {
						const childNode = new XmlNode(tagName);
						if (this.tagsNodeStack.length > options.maxNestedTags) throw new Error("Maximum nested tags exceeded");
						this.tagsNodeStack.push(currentNode);
						if (prefixedAttrs) childNode[":@"] = prefixedAttrs;
						this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
						currentNode = childNode;
					}
					textData = "";
					i = closeIndex;
				}
			}
		} else textData += xmlData[i];
		return xmlObj.child;
	};
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/xmlparser/node2json.js
/**
* Helper function to strip attribute prefix from attribute map
* @param {object} attrs - Attributes with prefix (e.g., {"@_class": "code"})
* @param {string} prefix - Attribute prefix to remove (e.g., "@_")
* @returns {object} Attributes without prefix (e.g., {"class": "code"})
*/
function stripAttributePrefix(attrs, prefix) {
	if (!attrs || typeof attrs !== "object") return {};
	if (!prefix) return attrs;
	const rawAttrs = {};
	for (const key in attrs) if (key.startsWith(prefix)) {
		const rawName = key.substring(prefix.length);
		rawAttrs[rawName] = attrs[key];
	} else rawAttrs[key] = attrs[key];
	return rawAttrs;
}
/**
* 
* @param {array} node 
* @param {any} options 
* @param {Matcher} matcher - Path matcher instance
* @returns 
*/
function prettify(node, options, matcher, readonlyMatcher) {
	return compress(node, options, matcher, readonlyMatcher);
}
/**
* @param {array} arr 
* @param {object} options 
* @param {Matcher} matcher - Path matcher instance
* @returns object
*/
function compress(arr, options, matcher, readonlyMatcher) {
	let text;
	const compressedObj = {};
	for (let i = 0; i < arr.length; i++) {
		const tagObj = arr[i];
		const property = propName(tagObj);
		if (property !== void 0 && property !== options.textNodeName) {
			const rawAttrs = stripAttributePrefix(tagObj[":@"] || {}, options.attributeNamePrefix);
			matcher.push(property, rawAttrs);
		}
		if (property === options.textNodeName) if (text === void 0) text = tagObj[property];
		else text += "" + tagObj[property];
		else if (property === void 0) continue;
		else if (tagObj[property]) {
			let val = compress(tagObj[property], options, matcher, readonlyMatcher);
			const isLeaf = isLeafTag(val, options);
			if (Object.keys(val).length === 0 && options.alwaysCreateTextNode) val[options.textNodeName] = "";
			if (tagObj[":@"]) assignAttributes(val, tagObj[":@"], readonlyMatcher, options);
			else if (Object.keys(val).length === 1 && val[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) val = val[options.textNodeName];
			else if (Object.keys(val).length === 0) if (options.alwaysCreateTextNode) val[options.textNodeName] = "";
			else val = "";
			if (tagObj[METADATA_SYMBOL] !== void 0 && typeof val === "object" && val !== null) val[METADATA_SYMBOL] = tagObj[METADATA_SYMBOL];
			if (compressedObj[property] !== void 0 && Object.prototype.hasOwnProperty.call(compressedObj, property)) {
				if (!Array.isArray(compressedObj[property])) compressedObj[property] = [compressedObj[property]];
				compressedObj[property].push(val);
			} else {
				const jPathOrMatcher = options.jPath ? readonlyMatcher.toString() : readonlyMatcher;
				if (options.isArray(property, jPathOrMatcher, isLeaf)) compressedObj[property] = [val];
				else compressedObj[property] = val;
			}
			if (property !== void 0 && property !== options.textNodeName) matcher.pop();
		}
	}
	if (typeof text === "string") {
		if (text.length > 0) compressedObj[options.textNodeName] = text;
	} else if (text !== void 0) compressedObj[options.textNodeName] = text;
	return compressedObj;
}
function propName(obj) {
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (key !== ":@") return key;
	}
}
function assignAttributes(obj, attrMap, readonlyMatcher, options) {
	if (attrMap) {
		const keys = Object.keys(attrMap);
		const len = keys.length;
		for (let i = 0; i < len; i++) {
			const atrrName = keys[i];
			const rawAttrName = atrrName.startsWith(options.attributeNamePrefix) ? atrrName.substring(options.attributeNamePrefix.length) : atrrName;
			const jPathOrMatcher = options.jPath ? readonlyMatcher.toString() + "." + rawAttrName : readonlyMatcher;
			if (options.isArray(atrrName, jPathOrMatcher, true, true)) obj[atrrName] = [attrMap[atrrName]];
			else obj[atrrName] = attrMap[atrrName];
		}
	}
}
function isLeafTag(obj, options) {
	const { textNodeName } = options;
	const propCount = Object.keys(obj).length;
	if (propCount === 0) return true;
	if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) return true;
	return false;
}
var METADATA_SYMBOL;
var init_node2json = __esmMin((() => {
	init_xmlNode();
	METADATA_SYMBOL = XmlNode.getMetaDataSymbol();
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var XMLParser;
var init_XMLParser = __esmMin((() => {
	init_OptionsBuilder();
	init_OrderedObjParser();
	init_node2json();
	init_validator();
	init_xmlNode();
	XMLParser = class {
		constructor(options) {
			this.externalEntities = {};
			this.options = buildOptions(options);
		}
		/**
		* Parse XML dats to JS object 
		* @param {string|Uint8Array} xmlData 
		* @param {boolean|Object} validationOption 
		*/
		parse(xmlData, validationOption) {
			if (typeof xmlData !== "string" && xmlData.toString) xmlData = xmlData.toString();
			else if (typeof xmlData !== "string") throw new Error("XML data is accepted in String or Bytes[] form.");
			if (validationOption) {
				if (validationOption === true) validationOption = {};
				const result = validate(xmlData, validationOption);
				if (result !== true) throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
			}
			const orderedObjParser = new OrderedObjParser(this.options, this.externalEntities);
			const orderedResult = orderedObjParser.parseXml(xmlData);
			if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
			else return prettify(orderedResult, this.options, orderedObjParser.matcher, orderedObjParser.readonlyMatcher);
		}
		/**
		* Add Entity which is not by default supported by this library
		* @param {string} key 
		* @param {string} value 
		*/
		addEntity(key, value) {
			if (value.indexOf("&") !== -1) throw new Error("Entity value can't have '&'");
			else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
			else if (value === "&") throw new Error("An entity with value '&' is not permitted");
			else this.externalEntities[key] = value;
		}
		/**
		* Returns a Symbol that can be used to access the metadata
		* property on a node.
		* 
		* If Symbol is not available in the environment, an ordinary property is used
		* and the name of the property is here returned.
		* 
		* The XMLMetaData property is only present when `captureMetaData`
		* is true in the options.
		*/
		static getMetaDataSymbol() {
			return XmlNode.getMetaDataSymbol();
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/fast-xml-parser@5.7.3/node_modules/fast-xml-parser/src/fxp.js
var init_fxp = __esmMin((() => {
	init_XMLParser();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/xml-external/nodable_entities.js
function validateEntityName(name) {
	if (name[0] === "#") throw new Error(`[EntityReplacer] Invalid character '#' in entity name: "${name}"`);
	for (const ch of name) if (SPECIAL_CHARS.has(ch)) throw new Error(`[EntityReplacer] Invalid character '${ch}' in entity name: "${name}"`);
	return name;
}
function mergeEntityMaps(...maps) {
	const out = Object.create(null);
	for (const map of maps) {
		if (!map) continue;
		for (const key of Object.keys(map)) {
			const raw = map[key];
			if (typeof raw === "string") out[key] = raw;
			else if (raw && typeof raw === "object" && raw.val !== void 0) {
				const val = raw.val;
				if (typeof val === "string") out[key] = val;
			}
		}
	}
	return out;
}
function parseLimitTiers(raw) {
	if (!raw || raw === LIMIT_TIER_EXTERNAL) return new Set([LIMIT_TIER_EXTERNAL]);
	if (raw === LIMIT_TIER_ALL) return new Set([LIMIT_TIER_ALL]);
	if (raw === LIMIT_TIER_BASE) return new Set([LIMIT_TIER_BASE]);
	if (Array.isArray(raw)) return new Set(raw);
	return new Set([LIMIT_TIER_EXTERNAL]);
}
function parseNCRConfig(ncr) {
	if (!ncr) return {
		xmlVersion: 1,
		onLevel: NCR_LEVEL.allow,
		nullLevel: NCR_LEVEL.remove
	};
	const xmlVersion = ncr.xmlVersion === 1.1 ? 1.1 : 1;
	const onLevel = NCR_LEVEL[ncr.onNCR ?? "allow"] ?? NCR_LEVEL.allow;
	const nullLevel = NCR_LEVEL[ncr.nullNCR ?? "remove"] ?? NCR_LEVEL.remove;
	return {
		xmlVersion,
		onLevel,
		nullLevel: Math.max(nullLevel, NCR_LEVEL.remove)
	};
}
var XML, COMMON_HTML, CURRENCY, SPECIAL_CHARS, LIMIT_TIER_EXTERNAL, LIMIT_TIER_BASE, LIMIT_TIER_ALL, NCR_LEVEL, XML10_ALLOWED_C0, EntityDecoderImpl;
var init_nodable_entities = __esmMin((() => {
	XML = {
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		quot: "\""
	};
	COMMON_HTML = {
		nbsp: "\xA0",
		copy: "©",
		reg: "®",
		trade: "™",
		mdash: "—",
		ndash: "–",
		hellip: "…",
		laquo: "«",
		raquo: "»",
		lsquo: "‘",
		rsquo: "’",
		ldquo: "“",
		rdquo: "”",
		bull: "•",
		para: "¶",
		sect: "§",
		deg: "°",
		frac12: "½",
		frac14: "¼",
		frac34: "¾"
	};
	CURRENCY = {
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		euro: "€",
		dollar: "$",
		fnof: "ƒ",
		inr: "₹",
		af: "؋",
		birr: "ብር",
		peso: "₱",
		rub: "₽",
		won: "₩",
		yuan: "¥",
		cedil: "¸"
	};
	SPECIAL_CHARS = /* @__PURE__ */ new Set("!?\\/[]$%{}^&*()<>|+");
	LIMIT_TIER_EXTERNAL = "external";
	LIMIT_TIER_BASE = "base";
	LIMIT_TIER_ALL = "all";
	NCR_LEVEL = Object.freeze({
		allow: 0,
		leave: 1,
		remove: 2,
		throw: 3
	});
	XML10_ALLOWED_C0 = new Set([
		9,
		10,
		13
	]);
	EntityDecoderImpl = class EntityDecoderImpl {
		_limit;
		_maxTotalExpansions;
		_maxExpandedLength;
		_postCheck;
		_limitTiers;
		_numericAllowed;
		_baseMap;
		_externalMap;
		_inputMap;
		_totalExpansions;
		_expandedLength;
		_removeSet;
		_leaveSet;
		_ncrXmlVersion;
		_ncrOnLevel;
		_ncrNullLevel;
		constructor(options = {}) {
			this._limit = options.limit || {};
			this._maxTotalExpansions = this._limit.maxTotalExpansions || 0;
			this._maxExpandedLength = this._limit.maxExpandedLength || 0;
			this._postCheck = typeof options.postCheck === "function" ? options.postCheck : (r) => r;
			this._limitTiers = parseLimitTiers(this._limit.applyLimitsTo ?? LIMIT_TIER_EXTERNAL);
			this._numericAllowed = options.numericAllowed ?? true;
			this._baseMap = mergeEntityMaps(XML, options.namedEntities || null);
			this._externalMap = Object.create(null);
			this._inputMap = Object.create(null);
			this._totalExpansions = 0;
			this._expandedLength = 0;
			this._removeSet = new Set(options.remove && Array.isArray(options.remove) ? options.remove : []);
			this._leaveSet = new Set(options.leave && Array.isArray(options.leave) ? options.leave : []);
			const ncrCfg = parseNCRConfig(options.ncr);
			this._ncrXmlVersion = ncrCfg.xmlVersion;
			this._ncrOnLevel = ncrCfg.onLevel;
			this._ncrNullLevel = ncrCfg.nullLevel;
		}
		setExternalEntities(map) {
			if (map) for (const key of Object.keys(map)) validateEntityName(key);
			this._externalMap = mergeEntityMaps(map);
		}
		addExternalEntity(key, value) {
			validateEntityName(key);
			if (typeof value === "string" && value.indexOf("&") === -1) this._externalMap[key] = value;
		}
		addInputEntities(map) {
			this._totalExpansions = 0;
			this._expandedLength = 0;
			this._inputMap = mergeEntityMaps(map);
		}
		reset() {
			this._inputMap = Object.create(null);
			this._totalExpansions = 0;
			this._expandedLength = 0;
			return this;
		}
		setXmlVersion(version) {
			this._ncrXmlVersion = version === "1.1" || version === 1.1 ? 1.1 : 1;
		}
		decode(str) {
			if (typeof str !== "string" || str.length === 0) return str;
			const original = str;
			const chunks = [];
			const len = str.length;
			let last = 0;
			let i = 0;
			const limitExpansions = this._maxTotalExpansions > 0;
			const limitLength = this._maxExpandedLength > 0;
			const checkLimits = limitExpansions || limitLength;
			while (i < len) {
				if (str.charCodeAt(i) !== 38) {
					i++;
					continue;
				}
				let j = i + 1;
				while (j < len && str.charCodeAt(j) !== 59 && j - i <= 32) j++;
				if (j >= len || str.charCodeAt(j) !== 59) {
					i++;
					continue;
				}
				const token = str.slice(i + 1, j);
				if (token.length === 0) {
					i++;
					continue;
				}
				let replacement;
				let tier;
				if (this._removeSet.has(token)) {
					replacement = "";
					if (tier === void 0) tier = LIMIT_TIER_EXTERNAL;
				} else if (this._leaveSet.has(token)) {
					i++;
					continue;
				} else if (token.charCodeAt(0) === 35) {
					const ncrResult = this._resolveNCR(token);
					if (ncrResult === void 0) {
						i++;
						continue;
					}
					replacement = ncrResult;
					tier = LIMIT_TIER_BASE;
				} else {
					const resolved = this._resolveName(token);
					replacement = resolved?.value;
					tier = resolved?.tier;
				}
				if (replacement === void 0) {
					i++;
					continue;
				}
				if (i > last) chunks.push(str.slice(last, i));
				chunks.push(replacement);
				last = j + 1;
				i = last;
				if (checkLimits && this._tierCounts(tier)) {
					if (limitExpansions) {
						this._totalExpansions++;
						if (this._totalExpansions > this._maxTotalExpansions) throw new Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
					}
					if (limitLength) {
						const delta = replacement.length - (token.length + 2);
						if (delta > 0) {
							this._expandedLength += delta;
							if (this._expandedLength > this._maxExpandedLength) throw new Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
						}
					}
				}
			}
			if (last < len) chunks.push(str.slice(last));
			const result = chunks.length === 0 ? str : chunks.join("");
			return this._postCheck(result, original);
		}
		_tierCounts(tier) {
			if (this._limitTiers.has(LIMIT_TIER_ALL)) return true;
			return this._limitTiers.has(tier);
		}
		_resolveName(name) {
			if (name in this._inputMap) return {
				value: this._inputMap[name],
				tier: LIMIT_TIER_EXTERNAL
			};
			if (name in this._externalMap) return {
				value: this._externalMap[name],
				tier: LIMIT_TIER_EXTERNAL
			};
			if (name in this._baseMap) return {
				value: this._baseMap[name],
				tier: LIMIT_TIER_BASE
			};
		}
		_classifyNCR(cp) {
			if (cp === 0) return this._ncrNullLevel;
			if (cp >= 55296 && cp <= 57343) return NCR_LEVEL.remove;
			if (this._ncrXmlVersion === 1) {
				if (cp >= 1 && cp <= 31 && !XML10_ALLOWED_C0.has(cp)) return NCR_LEVEL.remove;
			}
			return -1;
		}
		_applyNCRAction(action, token, cp) {
			switch (action) {
				case NCR_LEVEL.allow: return String.fromCodePoint(cp);
				case NCR_LEVEL.remove: return "";
				case NCR_LEVEL.leave: return;
				case NCR_LEVEL.throw: throw new Error(`[EntityDecoder] Prohibited numeric character reference &${token}; (U+${cp.toString(16).toUpperCase().padStart(4, "0")})`);
				default: return String.fromCodePoint(cp);
			}
		}
		_resolveNCR(token) {
			const second = token.charCodeAt(1);
			let cp;
			if (second === 120 || second === 88) cp = parseInt(token.slice(2), 16);
			else cp = parseInt(token.slice(1), 10);
			if (Number.isNaN(cp) || cp < 0 || cp > 1114111) return;
			const minimum = this._classifyNCR(cp);
			if (!this._numericAllowed && minimum < NCR_LEVEL.remove) return;
			const effective = minimum === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, minimum);
			return this._applyNCRAction(effective, token, cp);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/xml-parser.js
function parseXML(xmlString) {
	return parser.parse(xmlString, true);
}
var entityDecoder, parser;
var init_xml_parser = __esmMin((() => {
	init_fxp();
	init_nodable_entities();
	entityDecoder = new EntityDecoderImpl({
		namedEntities: {
			...XML,
			...COMMON_HTML,
			...CURRENCY
		},
		numericAllowed: true,
		limit: { maxTotalExpansions: Infinity },
		ncr: { xmlVersion: 1.1 }
	});
	parser = new XMLParser({
		attributeNamePrefix: "",
		processEntities: {
			enabled: true,
			maxTotalExpansions: Infinity
		},
		htmlEntities: true,
		entityDecoder: {
			setExternalEntities: (entities) => {
				entityDecoder.setExternalEntities(entities);
			},
			addInputEntities: (entities) => {
				entityDecoder.addInputEntities(entities);
			},
			reset: () => {
				entityDecoder.reset();
			},
			decode: (text) => {
				return entityDecoder.decode(text);
			},
			setXmlVersion: (version) => void 0
		},
		ignoreAttributes: false,
		ignoreDeclaration: true,
		parseTagValue: false,
		trimValues: false,
		tagValueProcessor: (_, val) => val.trim() === "" && val.includes("\n") ? "" : void 0,
		maxNestedTags: Infinity
	});
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+xml-builder@3.972.30/node_modules/@aws-sdk/xml-builder/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({
	XmlNode: () => XmlNode$1,
	XmlText: () => XmlText,
	parseXML: () => parseXML
});
var init_dist_es = __esmMin((() => {
	init_XmlNode();
	init_XmlText();
	init_xml_parser();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+core@3.974.21/node_modules/@aws-sdk/core/dist-cjs/submodules/protocols/index.js
var require_protocols = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { SmithyRpcV2CborProtocol, loadSmithyRpcV2CborErrorCode } = require_cbor();
	var { TypeRegistry, NormalizedSchema, deref } = require_schema();
	var { decorateServiceException, getValueFromTextNode } = require_client$1();
	var { collectBody, determineTimestampFormat, RpcProtocol, HttpBindingProtocol, HttpInterceptingShapeSerializer, HttpInterceptingShapeDeserializer, FromStringShapeDeserializer, extendedEncodeURIComponent } = require_protocols$1();
	var { NumericValue, toUtf8, fromBase64, LazyJsonString, parseEpochTimestamp, parseRfc7231DateTime, parseRfc3339DateTimeWithOffset, toBase64, dateToUtcString, generateIdempotencyToken, expectUnion } = require_serde();
	var { parseXML, XmlNode, XmlText } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var ProtocolLib = class {
		queryCompat;
		errorRegistry;
		constructor(queryCompat = false) {
			this.queryCompat = queryCompat;
		}
		resolveRestContentType(defaultContentType, inputSchema) {
			const members = inputSchema.getMemberSchemas();
			const httpPayloadMember = Object.values(members).find((m) => {
				return !!m.getMergedTraits().httpPayload;
			});
			if (httpPayloadMember) {
				const mediaType = httpPayloadMember.getMergedTraits().mediaType;
				if (mediaType) return mediaType;
				else if (httpPayloadMember.isStringSchema()) return "text/plain";
				else if (httpPayloadMember.isBlobSchema()) return "application/octet-stream";
				else return defaultContentType;
			} else if (!inputSchema.isUnitSchema()) {
				if (Object.values(members).find((m) => {
					const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m.getMergedTraits();
					return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && httpPrefixHeaders === void 0;
				})) return defaultContentType;
			}
		}
		async getErrorSchemaOrThrowBaseException(errorIdentifier, defaultNamespace, response, dataObject, metadata, getErrorSchema) {
			let errorName = errorIdentifier;
			if (errorIdentifier.includes("#")) [, errorName] = errorIdentifier.split("#");
			const errorMetadata = {
				$metadata: metadata,
				$fault: response.statusCode < 500 ? "client" : "server"
			};
			if (!this.errorRegistry) throw new Error("@aws-sdk/core/protocols - error handler not initialized.");
			try {
				return {
					errorSchema: getErrorSchema?.(this.errorRegistry, errorName) ?? this.errorRegistry.getSchema(errorIdentifier),
					errorMetadata
				};
			} catch (e) {
				dataObject.message = dataObject.message ?? dataObject.Message ?? "UnknownError";
				const synthetic = this.errorRegistry;
				const baseExceptionSchema = synthetic.getBaseException();
				if (baseExceptionSchema) {
					const ErrorCtor = synthetic.getErrorCtor(baseExceptionSchema) ?? Error;
					throw this.decorateServiceException(Object.assign(new ErrorCtor({ name: errorName }), errorMetadata), dataObject);
				}
				const d = dataObject;
				const message = d?.message ?? d?.Message ?? d?.Error?.Message ?? d?.Error?.message;
				throw this.decorateServiceException(Object.assign(new Error(message), { name: errorName }, errorMetadata), dataObject);
			}
		}
		compose(composite, errorIdentifier, defaultNamespace) {
			let namespace = defaultNamespace;
			if (errorIdentifier.includes("#")) [namespace] = errorIdentifier.split("#");
			const staticRegistry = TypeRegistry.for(namespace);
			const defaultSyntheticRegistry = TypeRegistry.for("smithy.ts.sdk.synthetic." + defaultNamespace);
			composite.copyFrom(staticRegistry);
			composite.copyFrom(defaultSyntheticRegistry);
			this.errorRegistry = composite;
		}
		decorateServiceException(exception, additions = {}) {
			if (this.queryCompat) {
				const msg = exception.Message ?? additions.Message;
				const error = decorateServiceException(exception, additions);
				if (msg) error.message = msg;
				const errorObj = error.Error ?? {};
				errorObj.Type = error.Error?.Type;
				errorObj.Code = error.Error?.Code;
				errorObj.Message = error.Error?.message ?? error.Error?.Message ?? msg;
				error.Error = errorObj;
				const reqId = error.$metadata.requestId;
				if (reqId) error.RequestId = reqId;
				return error;
			}
			return decorateServiceException(exception, additions);
		}
		setQueryCompatError(output, response) {
			const queryErrorHeader = response.headers?.["x-amzn-query-error"];
			if (output !== void 0 && queryErrorHeader != null) {
				const [Code, Type] = queryErrorHeader.split(";");
				const keys = Object.keys(output);
				const Error = {
					Code,
					Type
				};
				output.Code = Code;
				output.Type = Type;
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					Error[k === "message" ? "Message" : k] = output[k];
				}
				delete Error.__type;
				output.Error = Error;
			}
		}
		queryCompatOutput(queryCompatErrorData, errorData) {
			if (queryCompatErrorData.Error) errorData.Error = queryCompatErrorData.Error;
			if (queryCompatErrorData.Type) errorData.Type = queryCompatErrorData.Type;
			if (queryCompatErrorData.Code) errorData.Code = queryCompatErrorData.Code;
		}
		findQueryCompatibleError(registry, errorName) {
			try {
				return registry.getSchema(errorName);
			} catch (e) {
				return registry.find((schema) => NormalizedSchema.of(schema).getMergedTraits().awsQueryError?.[0] === errorName);
			}
		}
	};
	var AwsSmithyRpcV2CborProtocol = class extends SmithyRpcV2CborProtocol {
		awsQueryCompatible;
		mixin;
		constructor({ defaultNamespace, errorTypeRegistries, awsQueryCompatible }) {
			super({
				defaultNamespace,
				errorTypeRegistries
			});
			this.awsQueryCompatible = !!awsQueryCompatible;
			this.mixin = new ProtocolLib(this.awsQueryCompatible);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (this.awsQueryCompatible) request.headers["x-amzn-query-mode"] = "true";
			return request;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			if (this.awsQueryCompatible) this.mixin.setQueryCompatError(dataObject, response);
			const errorName = (() => {
				const compatHeader = response.headers["x-amzn-query-error"];
				if (compatHeader && this.awsQueryCompatible) return compatHeader.split(";")[0];
				return loadSmithyRpcV2CborErrorCode(response, dataObject) ?? "Unknown";
			})();
			this.mixin.compose(this.compositeErrorRegistry, errorName, this.options.defaultNamespace);
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorName, this.options.defaultNamespace, response, dataObject, metadata, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0);
			const ns = NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "UnknownError";
			const exception = new ((this.compositeErrorRegistry.getErrorCtor(errorSchema)) ?? Error)({});
			const output = {};
			for (const [name, member] of ns.structIterator()) if (dataObject[name] != null) output[name] = this.deserializer.readValue(member, dataObject[name]);
			if (this.awsQueryCompatible) this.mixin.queryCompatOutput(dataObject, output);
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
	};
	var _toStr = (val) => {
		if (val == null) return val;
		if (typeof val === "number" || typeof val === "bigint") {
			const warning = /* @__PURE__ */ new Error(`Received number ${val} where a string was expected.`);
			warning.name = "Warning";
			console.warn(warning);
			return String(val);
		}
		if (typeof val === "boolean") {
			const warning = /* @__PURE__ */ new Error(`Received boolean ${val} where a string was expected.`);
			warning.name = "Warning";
			console.warn(warning);
			return String(val);
		}
		return val;
	};
	var _toBool = (val) => {
		if (val == null) return val;
		if (typeof val === "string") {
			const lowercase = val.toLowerCase();
			if (val !== "" && lowercase !== "false" && lowercase !== "true") {
				const warning = /* @__PURE__ */ new Error(`Received string "${val}" where a boolean was expected.`);
				warning.name = "Warning";
				console.warn(warning);
			}
			return val !== "" && lowercase !== "false";
		}
		return val;
	};
	var _toNum = (val) => {
		if (val == null) return val;
		if (typeof val === "string") {
			const num = Number(val);
			if (num.toString() !== val) {
				const warning = /* @__PURE__ */ new Error(`Received string "${val}" where a number was expected.`);
				warning.name = "Warning";
				console.warn(warning);
				return val;
			}
			return num;
		}
		return val;
	};
	var SerdeContextConfig = class {
		serdeContext;
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
		}
	};
	var UnionSerde = class {
		from;
		to;
		keys;
		constructor(from, to) {
			this.from = from;
			this.to = to;
			const keys = Object.keys(this.from);
			const set = new Set(keys);
			set.delete("__type");
			this.keys = set;
		}
		mark(key) {
			this.keys.delete(key);
		}
		hasUnknown() {
			return this.keys.size === 1 && Object.keys(this.to).length === 0;
		}
		writeUnknown() {
			if (this.hasUnknown()) {
				const k = this.keys.values().next().value;
				const v = this.from[k];
				this.to.$unknown = [k, v];
			}
		}
	};
	function jsonReviver(key, value, context) {
		if (context?.source) {
			const numericString = context.source;
			if (typeof value === "number") {
				if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER || numericString !== String(value)) if (numericString.includes(".")) return new NumericValue(numericString, "bigDecimal");
				else return BigInt(numericString);
			}
		}
		return value;
	}
	var collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => (context?.utf8Encoder ?? toUtf8)(body));
	var parseJsonBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
		if (encoded.length) try {
			return JSON.parse(encoded);
		} catch (e) {
			if (e?.name === "SyntaxError") Object.defineProperty(e, "$responseBodyText", { value: encoded });
			throw e;
		}
		return {};
	});
	var parseJsonErrorBody = async (errorBody, context) => {
		const value = await parseJsonBody(errorBody, context);
		value.message = value.message ?? value.Message;
		return value;
	};
	var findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
	var sanitizeErrorCode = (rawValue) => {
		let cleanValue = rawValue;
		if (typeof cleanValue === "number") cleanValue = cleanValue.toString();
		if (cleanValue.indexOf(",") >= 0) cleanValue = cleanValue.split(",")[0];
		if (cleanValue.indexOf(":") >= 0) cleanValue = cleanValue.split(":")[0];
		if (cleanValue.indexOf("#") >= 0) cleanValue = cleanValue.split("#")[1];
		return cleanValue;
	};
	var loadRestJsonErrorCode = (output, data) => {
		return loadErrorCode(output, data, [
			"header",
			"code",
			"type"
		]);
	};
	var loadJsonRpcErrorCode = (output, data, queryCompat = false) => {
		return loadErrorCode(output, data, queryCompat ? [
			"code",
			"header",
			"type"
		] : [
			"type",
			"code",
			"header"
		]);
	};
	var loadErrorCode = ({ headers }, data, order) => {
		while (order.length > 0) switch (order.shift()) {
			case "header":
				const headerKey = findKey(headers ?? {}, "x-amzn-errortype");
				if (headerKey !== void 0) return sanitizeErrorCode(headers[headerKey]);
				break;
			case "code":
				const codeKey = findKey(data ?? {}, "code");
				if (codeKey && data[codeKey] !== void 0) return sanitizeErrorCode(data[codeKey]);
				break;
			case "type":
				if (data?.__type !== void 0) return sanitizeErrorCode(data.__type);
				break;
		}
	};
	var JsonShapeDeserializer = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		async read(schema, data) {
			return this._read(schema, typeof data === "string" ? JSON.parse(data, jsonReviver) : await parseJsonBody(data, this.serdeContext));
		}
		readObject(schema, data) {
			return this._read(schema, data);
		}
		_read(schema, value) {
			const isObject = value !== null && typeof value === "object";
			const ns = NormalizedSchema.of(schema);
			if (isObject) {
				if (ns.isStructSchema()) {
					const record = value;
					const union = ns.isUnionSchema();
					const out = {};
					let nameMap = void 0;
					const { jsonName } = this.settings;
					if (jsonName) nameMap = {};
					let unionSerde;
					if (union) unionSerde = new UnionSerde(record, out);
					for (const [memberName, memberSchema] of ns.structIterator()) {
						let fromKey = memberName;
						if (jsonName) {
							fromKey = memberSchema.getMergedTraits().jsonName ?? fromKey;
							nameMap[fromKey] = memberName;
						}
						if (union) unionSerde.mark(fromKey);
						if (record[fromKey] != null) out[memberName] = this._read(memberSchema, record[fromKey]);
					}
					if (union) unionSerde.writeUnknown();
					else if (typeof record.__type === "string") for (const k in record) {
						const v = record[k];
						const t = jsonName ? nameMap[k] ?? k : k;
						if (!(t in out)) out[t] = v;
					}
					return out;
				}
				if (Array.isArray(value) && ns.isListSchema()) {
					const listMember = ns.getValueSchema();
					const out = [];
					for (const item of value) out.push(this._read(listMember, item));
					return out;
				}
				if (ns.isMapSchema()) {
					const mapMember = ns.getValueSchema();
					const out = {};
					for (const _k in value) out[_k] = this._read(mapMember, value[_k]);
					return out;
				}
			}
			if (ns.isBlobSchema() && typeof value === "string") return fromBase64(value);
			const mediaType = ns.getMergedTraits().mediaType;
			if (ns.isStringSchema() && typeof value === "string" && mediaType) {
				if (mediaType === "application/json" || mediaType.endsWith("+json")) return LazyJsonString.from(value);
				return value;
			}
			if (ns.isTimestampSchema() && value != null) switch (determineTimestampFormat(ns, this.settings)) {
				case 5: return parseRfc3339DateTimeWithOffset(value);
				case 6: return parseRfc7231DateTime(value);
				case 7: return parseEpochTimestamp(value);
				default:
					console.warn("Missing timestamp format, parsing value with Date constructor:", value);
					return new Date(value);
			}
			if (ns.isBigIntegerSchema() && (typeof value === "number" || typeof value === "string")) return BigInt(value);
			if (ns.isBigDecimalSchema() && value != void 0) {
				if (value instanceof NumericValue) return value;
				const untyped = value;
				if (untyped.type === "bigDecimal" && "string" in untyped) return new NumericValue(untyped.string, untyped.type);
				return new NumericValue(String(value), "bigDecimal");
			}
			if (ns.isNumericSchema() && typeof value === "string") {
				switch (value) {
					case "Infinity": return Infinity;
					case "-Infinity": return -Infinity;
					case "NaN": return NaN;
				}
				return value;
			}
			if (ns.isDocumentSchema()) if (isObject) {
				const out = Array.isArray(value) ? [] : {};
				for (const k in value) {
					const v = value[k];
					if (v instanceof NumericValue) out[k] = v;
					else out[k] = this._read(ns, v);
				}
				return out;
			} else return structuredClone(value);
			return value;
		}
	};
	var JsonReplacer = class {
		values = /* @__PURE__ */ new Map();
		counter = 0;
		stage = 0;
		createReplacer() {
			if (this.stage === 1) throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
			if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
			this.stage = 1;
			return (key, value) => {
				if (value instanceof NumericValue) {
					const v = `${"Νnv" + this.counter++}_` + value.string;
					this.values.set(`"${v}"`, value.string);
					return v;
				}
				if (typeof value === "bigint") {
					const s = value.toString();
					const v = `${"Νb" + this.counter++}_` + s;
					this.values.set(`"${v}"`, s);
					return v;
				}
				return value;
			};
		}
		replaceInJson(json) {
			if (this.stage === 0) throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
			if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
			this.stage = 2;
			if (this.counter === 0) return json;
			for (const [key, value] of this.values) json = json.replace(key, value);
			return json;
		}
	};
	var JsonShapeSerializer = class extends SerdeContextConfig {
		settings;
		buffer;
		useReplacer = false;
		rootSchema;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema, value) {
			this.rootSchema = NormalizedSchema.of(schema);
			this.buffer = this._write(this.rootSchema, value);
		}
		flush() {
			const { rootSchema, useReplacer } = this;
			this.rootSchema = void 0;
			this.useReplacer = false;
			if (rootSchema?.isStructSchema() || rootSchema?.isDocumentSchema()) {
				if (!useReplacer) return JSON.stringify(this.buffer);
				const replacer = new JsonReplacer();
				return replacer.replaceInJson(JSON.stringify(this.buffer, replacer.createReplacer(), 0));
			}
			return this.buffer;
		}
		writeDiscriminatedDocument(schema, value) {
			this.write(schema, value);
			if (typeof this.buffer === "object") this.buffer.__type = NormalizedSchema.of(schema).getName(true);
		}
		_write(schema, value, container) {
			const isObject = value !== null && typeof value === "object";
			const ns = NormalizedSchema.of(schema);
			if (isObject) {
				if (ns.isStructSchema()) {
					const record = value;
					const out = {};
					const { jsonName } = this.settings;
					let nameMap = void 0;
					if (jsonName) nameMap = {};
					let outCount = 0;
					for (const [memberName, memberSchema] of ns.structIterator()) {
						const serializableValue = this._write(memberSchema, record[memberName], ns);
						if (serializableValue !== void 0) {
							let targetKey = memberName;
							if (jsonName) {
								targetKey = memberSchema.getMergedTraits().jsonName ?? memberName;
								nameMap[memberName] = targetKey;
							}
							out[targetKey] = serializableValue;
							outCount++;
						}
					}
					if (ns.isUnionSchema() && outCount === 0) {
						const { $unknown } = record;
						if (Array.isArray($unknown)) {
							const [k, v] = $unknown;
							out[k] = this._write(15, v);
						}
					} else if (typeof record.__type === "string") for (const k in record) {
						const v = record[k];
						const targetKey = jsonName ? nameMap[k] ?? k : k;
						if (!(targetKey in out)) out[targetKey] = this._write(15, v);
					}
					return out;
				}
				if (Array.isArray(value) && ns.isListSchema()) {
					const listMember = ns.getValueSchema();
					const out = [];
					const sparse = !!ns.getMergedTraits().sparse;
					for (const item of value) if (sparse || item != null) out.push(this._write(listMember, item));
					return out;
				}
				if (ns.isMapSchema()) {
					const mapMember = ns.getValueSchema();
					const out = {};
					const sparse = !!ns.getMergedTraits().sparse;
					for (const _k in value) {
						const _v = value[_k];
						if (sparse || _v != null) out[_k] = this._write(mapMember, _v);
					}
					return out;
				}
				if (value instanceof Uint8Array && (ns.isBlobSchema() || ns.isDocumentSchema())) {
					if (ns === this.rootSchema) return value;
					return (this.serdeContext?.base64Encoder ?? toBase64)(value);
				}
				if (value instanceof Date && (ns.isTimestampSchema() || ns.isDocumentSchema())) switch (determineTimestampFormat(ns, this.settings)) {
					case 5: return value.toISOString().replace(".000Z", "Z");
					case 6: return dateToUtcString(value);
					case 7: return value.getTime() / 1e3;
					default:
						console.warn("Missing timestamp format, using epoch seconds", value);
						return value.getTime() / 1e3;
				}
				if (value instanceof NumericValue) this.useReplacer = true;
			}
			if (value === null && container?.isStructSchema()) return;
			if (ns.isStringSchema()) {
				if (typeof value === "undefined" && ns.isIdempotencyToken()) return generateIdempotencyToken();
				const mediaType = ns.getMergedTraits().mediaType;
				if (value != null && mediaType) {
					if (mediaType === "application/json" || mediaType.endsWith("+json")) return LazyJsonString.from(value);
				}
				return value;
			}
			if (typeof value === "number" && ns.isNumericSchema()) {
				if (Math.abs(value) === Infinity || isNaN(value)) return String(value);
				return value;
			}
			if (typeof value === "string" && ns.isBlobSchema()) {
				if (ns === this.rootSchema) return value;
				return (this.serdeContext?.base64Encoder ?? toBase64)(value);
			}
			if (typeof value === "bigint") this.useReplacer = true;
			if (ns.isDocumentSchema()) if (isObject) {
				const out = Array.isArray(value) ? [] : {};
				for (const k in value) {
					const v = value[k];
					if (v instanceof NumericValue) {
						this.useReplacer = true;
						out[k] = v;
					} else out[k] = this._write(ns, v);
				}
				return out;
			} else return structuredClone(value);
			return value;
		}
	};
	var JsonCodec = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		createSerializer() {
			const serializer = new JsonShapeSerializer(this.settings);
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new JsonShapeDeserializer(this.settings);
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var AwsJsonRpcProtocol = class extends RpcProtocol {
		serializer;
		deserializer;
		serviceTarget;
		codec;
		mixin;
		awsQueryCompatible;
		constructor({ defaultNamespace, errorTypeRegistries, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				errorTypeRegistries
			});
			this.serviceTarget = serviceTarget;
			this.codec = jsonCodec ?? new JsonCodec({
				timestampFormat: {
					useTrait: true,
					default: 7
				},
				jsonName: false
			});
			this.serializer = this.codec.createSerializer();
			this.deserializer = this.codec.createDeserializer();
			this.awsQueryCompatible = !!awsQueryCompatible;
			this.mixin = new ProtocolLib(this.awsQueryCompatible);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (!request.path.endsWith("/")) request.path += "/";
			request.headers["content-type"] = `application/x-amz-json-${this.getJsonRpcVersion()}`;
			request.headers["x-amz-target"] = `${this.serviceTarget}.${operationSchema.name}`;
			if (this.awsQueryCompatible) request.headers["x-amzn-query-mode"] = "true";
			if (deref(operationSchema.input) === "unit" || !request.body) request.body = "{}";
			return request;
		}
		getPayloadCodec() {
			return this.codec;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const { awsQueryCompatible } = this;
			if (awsQueryCompatible) this.mixin.setQueryCompatError(dataObject, response);
			const errorIdentifier = loadJsonRpcErrorCode(response, dataObject, awsQueryCompatible) ?? "Unknown";
			this.mixin.compose(this.compositeErrorRegistry, errorIdentifier, this.options.defaultNamespace);
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata, awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0);
			const ns = NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "UnknownError";
			const exception = new ((this.compositeErrorRegistry.getErrorCtor(errorSchema)) ?? Error)({});
			const output = {};
			const errorDeserializer = this.codec.createDeserializer();
			for (const [name, member] of ns.structIterator()) if (dataObject[name] != null) output[name] = errorDeserializer.readObject(member, dataObject[name]);
			if (awsQueryCompatible) this.mixin.queryCompatOutput(dataObject, output);
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
	};
	var AwsJson1_0Protocol = class extends AwsJsonRpcProtocol {
		constructor({ defaultNamespace, errorTypeRegistries, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				errorTypeRegistries,
				serviceTarget,
				awsQueryCompatible,
				jsonCodec
			});
		}
		getShapeId() {
			return "aws.protocols#awsJson1_0";
		}
		getJsonRpcVersion() {
			return "1.0";
		}
		getDefaultContentType() {
			return "application/x-amz-json-1.0";
		}
	};
	var AwsJson1_1Protocol = class extends AwsJsonRpcProtocol {
		constructor({ defaultNamespace, errorTypeRegistries, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				errorTypeRegistries,
				serviceTarget,
				awsQueryCompatible,
				jsonCodec
			});
		}
		getShapeId() {
			return "aws.protocols#awsJson1_1";
		}
		getJsonRpcVersion() {
			return "1.1";
		}
		getDefaultContentType() {
			return "application/x-amz-json-1.1";
		}
	};
	var AwsRestJsonProtocol = class extends HttpBindingProtocol {
		serializer;
		deserializer;
		codec;
		mixin = new ProtocolLib();
		constructor({ defaultNamespace, errorTypeRegistries }) {
			super({
				defaultNamespace,
				errorTypeRegistries
			});
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 7
				},
				httpBindings: true,
				jsonName: true
			};
			this.codec = new JsonCodec(settings);
			this.serializer = new HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
			this.deserializer = new HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
		}
		getShapeId() {
			return "aws.protocols#restJson1";
		}
		getPayloadCodec() {
			return this.codec;
		}
		setSerdeContext(serdeContext) {
			this.codec.setSerdeContext(serdeContext);
			super.setSerdeContext(serdeContext);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const inputSchema = NormalizedSchema.of(operationSchema.input);
			if (!request.headers["content-type"]) {
				const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
				if (contentType) request.headers["content-type"] = contentType;
			}
			if (request.body == null && request.headers["content-type"] === this.getDefaultContentType()) request.body = "{}";
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const output = await super.deserializeResponse(operationSchema, context, response);
			const outputSchema = NormalizedSchema.of(operationSchema.output);
			for (const [name, member] of outputSchema.structIterator()) if (member.getMemberTraits().httpPayload && !(name in output)) output[name] = null;
			return output;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
			this.mixin.compose(this.compositeErrorRegistry, errorIdentifier, this.options.defaultNamespace);
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
			const ns = NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "UnknownError";
			const exception = new ((this.compositeErrorRegistry.getErrorCtor(errorSchema)) ?? Error)({});
			await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
			const output = {};
			const errorDeserializer = this.codec.createDeserializer();
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().jsonName ?? name;
				output[name] = errorDeserializer.readObject(member, dataObject[target]);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		getDefaultContentType() {
			return "application/json";
		}
	};
	var awsExpectUnion = (value) => {
		if (value == null) return;
		if (typeof value === "object" && "__type" in value) delete value.__type;
		return expectUnion(value);
	};
	var XmlShapeDeserializer = class extends SerdeContextConfig {
		settings;
		stringDeserializer;
		constructor(settings) {
			super();
			this.settings = settings;
			this.stringDeserializer = new FromStringShapeDeserializer(settings);
		}
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
			this.stringDeserializer.setSerdeContext(serdeContext);
		}
		read(schema, bytes, key) {
			const ns = NormalizedSchema.of(schema);
			const memberSchemas = ns.getMemberSchemas();
			if (ns.isStructSchema() && ns.isMemberSchema() && !!Object.values(memberSchemas).find((memberNs) => {
				return !!memberNs.getMemberTraits().eventPayload;
			})) {
				const output = {};
				const memberName = Object.keys(memberSchemas)[0];
				if (memberSchemas[memberName].isBlobSchema()) output[memberName] = bytes;
				else output[memberName] = this.read(memberSchemas[memberName], bytes);
				return output;
			}
			const xmlString = (this.serdeContext?.utf8Encoder ?? toUtf8)(bytes);
			const parsedObject = this.parseXml(xmlString);
			return this.readSchema(schema, key ? parsedObject[key] : parsedObject);
		}
		readSchema(_schema, value) {
			const ns = NormalizedSchema.of(_schema);
			if (ns.isUnitSchema()) return;
			const traits = ns.getMergedTraits();
			if (ns.isListSchema() && !Array.isArray(value)) return this.readSchema(ns, [value]);
			if (value == null) return value;
			if (typeof value === "object") {
				const flat = !!traits.xmlFlattened;
				if (ns.isListSchema()) {
					const listValue = ns.getValueSchema();
					const buffer = [];
					const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
					const source = flat ? value : (value[0] ?? value)[sourceKey];
					if (source == null) return buffer;
					const sourceArray = Array.isArray(source) ? source : [source];
					for (const v of sourceArray) buffer.push(this.readSchema(listValue, v));
					return buffer;
				}
				const buffer = {};
				if (ns.isMapSchema()) {
					const keyNs = ns.getKeySchema();
					const memberNs = ns.getValueSchema();
					let entries;
					if (flat) entries = Array.isArray(value) ? value : [value];
					else entries = Array.isArray(value.entry) ? value.entry : [value.entry];
					const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
					const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
					for (const entry of entries) {
						const key = entry[keyProperty];
						const value = entry[valueProperty];
						buffer[key] = this.readSchema(memberNs, value);
					}
					return buffer;
				}
				if (ns.isStructSchema()) {
					const union = ns.isUnionSchema();
					let unionSerde;
					if (union) unionSerde = new UnionSerde(value, buffer);
					for (const [memberName, memberSchema] of ns.structIterator()) {
						const memberTraits = memberSchema.getMergedTraits();
						const xmlObjectKey = !memberTraits.httpPayload ? memberSchema.getMemberTraits().xmlName ?? memberName : memberTraits.xmlName ?? memberSchema.getName();
						if (union) unionSerde.mark(xmlObjectKey);
						if (value[xmlObjectKey] != null) buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
					}
					if (union) unionSerde.writeUnknown();
					return buffer;
				}
				if (ns.isDocumentSchema()) return value;
				throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
			}
			if (ns.isListSchema()) return [];
			if (ns.isMapSchema() || ns.isStructSchema()) return {};
			return this.stringDeserializer.read(ns, value);
		}
		parseXml(xml) {
			if (xml.length) {
				let parsedObj;
				try {
					parsedObj = parseXML(xml);
				} catch (e) {
					if (e && typeof e === "object") Object.defineProperty(e, "$responseBodyText", { value: xml });
					throw e;
				}
				const textNodeName = "#text";
				const key = Object.keys(parsedObj)[0];
				const parsedObjToReturn = parsedObj[key];
				if (parsedObjToReturn[textNodeName]) {
					parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
					delete parsedObjToReturn[textNodeName];
				}
				return getValueFromTextNode(parsedObjToReturn);
			}
			return {};
		}
	};
	var QueryShapeSerializer = class extends SerdeContextConfig {
		settings;
		buffer;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema, value, prefix = "") {
			if (this.buffer === void 0) this.buffer = "";
			const ns = NormalizedSchema.of(schema);
			if (prefix && !prefix.endsWith(".")) prefix += ".";
			if (ns.isBlobSchema()) {
				if (typeof value === "string" || value instanceof Uint8Array) {
					this.writeKey(prefix);
					this.writeValue((this.serdeContext?.base64Encoder ?? toBase64)(value));
				}
			} else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(String(value));
				} else if (ns.isIdempotencyToken()) {
					this.writeKey(prefix);
					this.writeValue(generateIdempotencyToken());
				}
			} else if (ns.isBigIntegerSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(String(value));
				}
			} else if (ns.isBigDecimalSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(value instanceof NumericValue ? value.string : String(value));
				}
			} else if (ns.isTimestampSchema()) {
				if (value instanceof Date) {
					this.writeKey(prefix);
					switch (determineTimestampFormat(ns, this.settings)) {
						case 5:
							this.writeValue(value.toISOString().replace(".000Z", "Z"));
							break;
						case 6:
							this.writeValue(dateToUtcString(value));
							break;
						case 7:
							this.writeValue(String(value.getTime() / 1e3));
							break;
					}
				}
			} else if (ns.isDocumentSchema()) if (Array.isArray(value)) this.write(79, value, prefix);
			else if (value instanceof Date) this.write(4, value, prefix);
			else if (value instanceof Uint8Array) this.write(21, value, prefix);
			else if (value && typeof value === "object") this.write(143, value, prefix);
			else {
				this.writeKey(prefix);
				this.writeValue(String(value));
			}
			else if (ns.isListSchema()) {
				if (Array.isArray(value)) if (value.length === 0) {
					if (this.settings.serializeEmptyLists) {
						this.writeKey(prefix);
						this.writeValue("");
					}
				} else {
					const member = ns.getValueSchema();
					const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
					let i = 1;
					for (const item of value) {
						if (item == null) continue;
						const traits = member.getMergedTraits();
						const suffix = this.getKey("member", traits.xmlName, traits.ec2QueryName);
						const key = flat ? `${prefix}${i}` : `${prefix}${suffix}.${i}`;
						this.write(member, item, key);
						++i;
					}
				}
			} else if (ns.isMapSchema()) {
				if (value && typeof value === "object") {
					const keySchema = ns.getKeySchema();
					const memberSchema = ns.getValueSchema();
					const flat = ns.getMergedTraits().xmlFlattened;
					let i = 1;
					for (const k in value) {
						const v = value[k];
						if (v == null) continue;
						const keyTraits = keySchema.getMergedTraits();
						const keySuffix = this.getKey("key", keyTraits.xmlName, keyTraits.ec2QueryName);
						const key = flat ? `${prefix}${i}.${keySuffix}` : `${prefix}entry.${i}.${keySuffix}`;
						const valTraits = memberSchema.getMergedTraits();
						const valueSuffix = this.getKey("value", valTraits.xmlName, valTraits.ec2QueryName);
						const valueKey = flat ? `${prefix}${i}.${valueSuffix}` : `${prefix}entry.${i}.${valueSuffix}`;
						this.write(keySchema, k, key);
						this.write(memberSchema, v, valueKey);
						++i;
					}
				}
			} else if (ns.isStructSchema()) {
				if (value && typeof value === "object") {
					let didWriteMember = false;
					for (const [memberName, member] of ns.structIterator()) {
						if (value[memberName] == null && !member.isIdempotencyToken()) continue;
						const traits = member.getMergedTraits();
						const suffix = this.getKey(memberName, traits.xmlName, traits.ec2QueryName, "struct");
						const key = `${prefix}${suffix}`;
						this.write(member, value[memberName], key);
						didWriteMember = true;
					}
					if (!didWriteMember && ns.isUnionSchema()) {
						const { $unknown } = value;
						if (Array.isArray($unknown)) {
							const [k, v] = $unknown;
							const key = `${prefix}${k}`;
							this.write(15, v, key);
						}
					}
				}
			} else if (ns.isUnitSchema());
			else throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
		}
		flush() {
			if (this.buffer === void 0) throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
			const str = this.buffer;
			delete this.buffer;
			return str;
		}
		getKey(memberName, xmlName, ec2QueryName, keySource) {
			const { ec2, capitalizeKeys } = this.settings;
			if (ec2 && ec2QueryName) return ec2QueryName;
			const key = xmlName ?? memberName;
			if (capitalizeKeys && keySource === "struct") return key[0].toUpperCase() + key.slice(1);
			return key;
		}
		writeKey(key) {
			if (key.endsWith(".")) key = key.slice(0, key.length - 1);
			this.buffer += `&${extendedEncodeURIComponent(key)}=`;
		}
		writeValue(value) {
			this.buffer += extendedEncodeURIComponent(value);
		}
	};
	var AwsQueryProtocol = class extends RpcProtocol {
		options;
		serializer;
		deserializer;
		mixin = new ProtocolLib();
		constructor(options) {
			super({
				defaultNamespace: options.defaultNamespace,
				errorTypeRegistries: options.errorTypeRegistries
			});
			this.options = options;
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 5
				},
				httpBindings: false,
				xmlNamespace: options.xmlNamespace,
				serviceNamespace: options.defaultNamespace,
				serializeEmptyLists: true
			};
			this.serializer = new QueryShapeSerializer(settings);
			this.deserializer = new XmlShapeDeserializer(settings);
		}
		getShapeId() {
			return "aws.protocols#awsQuery";
		}
		setSerdeContext(serdeContext) {
			this.serializer.setSerdeContext(serdeContext);
			this.deserializer.setSerdeContext(serdeContext);
		}
		getPayloadCodec() {
			throw new Error("AWSQuery protocol has no payload codec.");
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (!request.path.endsWith("/")) request.path += "/";
			request.headers["content-type"] = "application/x-www-form-urlencoded";
			if (deref(operationSchema.input) === "unit" || !request.body) request.body = "";
			request.body = `Action=${operationSchema.name.split("#")[1] ?? operationSchema.name}&Version=${this.options.version}` + request.body;
			if (request.body.endsWith("&")) request.body = request.body.slice(-1);
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const deserializer = this.deserializer;
			const ns = NormalizedSchema.of(operationSchema.output);
			const dataObject = {};
			if (response.statusCode >= 300) {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(15, bytes));
				await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const shortName = operationSchema.name.split("#")[1] ?? operationSchema.name;
			const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? shortName + "Result" : void 0;
			const bytes = await collectBody(response.body, context);
			if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
			dataObject.$metadata = this.deserializeMetadata(response);
			return dataObject;
		}
		useNestedResult() {
			return true;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
			this.mixin.compose(this.compositeErrorRegistry, errorIdentifier, this.options.defaultNamespace);
			const errorData = this.loadQueryError(dataObject) ?? {};
			const message = this.loadQueryErrorMessage(dataObject);
			errorData.message = message;
			errorData.Error = {
				Type: errorData.Type,
				Code: errorData.Code,
				Message: message
			};
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, errorData, metadata, this.mixin.findQueryCompatibleError);
			const ns = NormalizedSchema.of(errorSchema);
			const exception = new ((this.compositeErrorRegistry.getErrorCtor(errorSchema)) ?? Error)({});
			const output = {
				Type: errorData.Error.Type,
				Code: errorData.Error.Code,
				Error: errorData.Error
			};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().xmlName ?? name;
				const value = errorData[target] ?? dataObject[target];
				output[name] = this.deserializer.readSchema(member, value);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		loadQueryErrorCode(output, data) {
			const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
			if (code !== void 0) return code;
			if (output.statusCode == 404) return "NotFound";
		}
		loadQueryError(data) {
			return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
		}
		loadQueryErrorMessage(data) {
			const errorData = this.loadQueryError(data);
			return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
		}
		getDefaultContentType() {
			return "application/x-www-form-urlencoded";
		}
	};
	var AwsEc2QueryProtocol = class extends AwsQueryProtocol {
		options;
		constructor(options) {
			super(options);
			this.options = options;
			Object.assign(this.serializer.settings, {
				capitalizeKeys: true,
				flattenLists: true,
				serializeEmptyLists: false,
				ec2: true
			});
		}
		getShapeId() {
			return "aws.protocols#ec2Query";
		}
		useNestedResult() {
			return false;
		}
	};
	var parseXmlBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
		if (encoded.length) {
			let parsedObj;
			try {
				parsedObj = parseXML(encoded);
			} catch (e) {
				if (e && typeof e === "object") Object.defineProperty(e, "$responseBodyText", { value: encoded });
				throw e;
			}
			const textNodeName = "#text";
			const key = Object.keys(parsedObj)[0];
			const parsedObjToReturn = parsedObj[key];
			if (parsedObjToReturn[textNodeName]) {
				parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
				delete parsedObjToReturn[textNodeName];
			}
			return getValueFromTextNode(parsedObjToReturn);
		}
		return {};
	});
	var parseXmlErrorBody = async (errorBody, context) => {
		const value = await parseXmlBody(errorBody, context);
		if (value.Error) value.Error.message = value.Error.message ?? value.Error.Message;
		return value;
	};
	var loadRestXmlErrorCode = (output, data) => {
		if (data?.Error?.Code !== void 0) return data.Error.Code;
		if (data?.Code !== void 0) return data.Code;
		if (output.statusCode == 404) return "NotFound";
	};
	var XmlShapeSerializer = class extends SerdeContextConfig {
		settings;
		stringBuffer;
		byteBuffer;
		buffer;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema, value) {
			const ns = NormalizedSchema.of(schema);
			if (ns.isStringSchema() && typeof value === "string") this.stringBuffer = value;
			else if (ns.isBlobSchema()) this.byteBuffer = "byteLength" in value ? value : (this.serdeContext?.base64Decoder ?? fromBase64)(value);
			else {
				this.buffer = this.writeStruct(ns, value, void 0);
				const traits = ns.getMergedTraits();
				if (traits.httpPayload && !traits.xmlName) this.buffer.withName(ns.getName());
			}
		}
		flush() {
			if (this.byteBuffer !== void 0) {
				const bytes = this.byteBuffer;
				delete this.byteBuffer;
				return bytes;
			}
			if (this.stringBuffer !== void 0) {
				const str = this.stringBuffer;
				delete this.stringBuffer;
				return str;
			}
			const buffer = this.buffer;
			if (this.settings.xmlNamespace) {
				if (!buffer?.attributes?.["xmlns"]) buffer.addAttribute("xmlns", this.settings.xmlNamespace);
			}
			delete this.buffer;
			return buffer.toString();
		}
		writeStruct(ns, value, parentXmlns) {
			const traits = ns.getMergedTraits();
			const name = ns.isMemberSchema() && !traits.httpPayload ? ns.getMemberTraits().xmlName ?? ns.getMemberName() : traits.xmlName ?? ns.getName();
			if (!name || !ns.isStructSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${ns.getName(true)}.`);
			const structXmlNode = XmlNode.of(name);
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
			for (const [memberName, memberSchema] of ns.structIterator()) {
				const val = value[memberName];
				if (val != null || memberSchema.isIdempotencyToken()) {
					if (memberSchema.getMergedTraits().xmlAttribute) {
						structXmlNode.addAttribute(memberSchema.getMergedTraits().xmlName ?? memberName, this.writeSimple(memberSchema, val));
						continue;
					}
					if (memberSchema.isListSchema()) this.writeList(memberSchema, val, structXmlNode, xmlns);
					else if (memberSchema.isMapSchema()) this.writeMap(memberSchema, val, structXmlNode, xmlns);
					else if (memberSchema.isStructSchema()) structXmlNode.addChildNode(this.writeStruct(memberSchema, val, xmlns));
					else {
						const memberNode = XmlNode.of(memberSchema.getMergedTraits().xmlName ?? memberSchema.getMemberName());
						this.writeSimpleInto(memberSchema, val, memberNode, xmlns);
						structXmlNode.addChildNode(memberNode);
					}
				}
			}
			const { $unknown } = value;
			if ($unknown && ns.isUnionSchema() && Array.isArray($unknown) && Object.keys(value).length === 1) {
				const [k, v] = $unknown;
				const node = XmlNode.of(k);
				if (typeof v !== "string") if (value instanceof XmlNode || value instanceof XmlText) structXmlNode.addChildNode(value);
				else throw new Error("@aws-sdk - $unknown union member in XML requires value of type string, @aws-sdk/xml-builder::XmlNode or XmlText.");
				this.writeSimpleInto(0, v, node, xmlns);
				structXmlNode.addChildNode(node);
			}
			if (xmlns) structXmlNode.addAttribute(xmlnsAttr, xmlns);
			return structXmlNode;
		}
		writeList(listMember, array, container, parentXmlns) {
			if (!listMember.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${listMember.getName(true)}`);
			const listTraits = listMember.getMergedTraits();
			const listValueSchema = listMember.getValueSchema();
			const listValueTraits = listValueSchema.getMergedTraits();
			const sparse = !!listValueTraits.sparse;
			const flat = !!listTraits.xmlFlattened;
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(listMember, parentXmlns);
			const writeItem = (container, value) => {
				if (listValueSchema.isListSchema()) this.writeList(listValueSchema, Array.isArray(value) ? value : [value], container, xmlns);
				else if (listValueSchema.isMapSchema()) this.writeMap(listValueSchema, value, container, xmlns);
				else if (listValueSchema.isStructSchema()) {
					const struct = this.writeStruct(listValueSchema, value, xmlns);
					container.addChildNode(struct.withName(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member"));
				} else {
					const listItemNode = XmlNode.of(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member");
					this.writeSimpleInto(listValueSchema, value, listItemNode, xmlns);
					container.addChildNode(listItemNode);
				}
			};
			if (flat) {
				for (const value of array) if (sparse || value != null) writeItem(container, value);
			} else {
				const listNode = XmlNode.of(listTraits.xmlName ?? listMember.getMemberName());
				if (xmlns) listNode.addAttribute(xmlnsAttr, xmlns);
				for (const value of array) if (sparse || value != null) writeItem(listNode, value);
				container.addChildNode(listNode);
			}
		}
		writeMap(mapMember, map, container, parentXmlns, containerIsMap = false) {
			if (!mapMember.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${mapMember.getName(true)}`);
			const mapTraits = mapMember.getMergedTraits();
			const mapKeySchema = mapMember.getKeySchema();
			const keyTag = mapKeySchema.getMergedTraits().xmlName ?? "key";
			const mapValueSchema = mapMember.getValueSchema();
			const mapValueTraits = mapValueSchema.getMergedTraits();
			const valueTag = mapValueTraits.xmlName ?? "value";
			const sparse = !!mapValueTraits.sparse;
			const flat = !!mapTraits.xmlFlattened;
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(mapMember, parentXmlns);
			const addKeyValue = (entry, key, val) => {
				const keyNode = XmlNode.of(keyTag, key);
				const [keyXmlnsAttr, keyXmlns] = this.getXmlnsAttribute(mapKeySchema, xmlns);
				if (keyXmlns) keyNode.addAttribute(keyXmlnsAttr, keyXmlns);
				entry.addChildNode(keyNode);
				let valueNode = XmlNode.of(valueTag);
				if (mapValueSchema.isListSchema()) this.writeList(mapValueSchema, val, valueNode, xmlns);
				else if (mapValueSchema.isMapSchema()) this.writeMap(mapValueSchema, val, valueNode, xmlns, true);
				else if (mapValueSchema.isStructSchema()) valueNode = this.writeStruct(mapValueSchema, val, xmlns);
				else this.writeSimpleInto(mapValueSchema, val, valueNode, xmlns);
				entry.addChildNode(valueNode);
			};
			if (flat) for (const key in map) {
				const val = map[key];
				if (sparse || val != null) {
					const entry = XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
					addKeyValue(entry, key, val);
					container.addChildNode(entry);
				}
			}
			else {
				let mapNode;
				if (!containerIsMap) {
					mapNode = XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
					if (xmlns) mapNode.addAttribute(xmlnsAttr, xmlns);
					container.addChildNode(mapNode);
				}
				for (const key in map) {
					const val = map[key];
					if (sparse || val != null) {
						const entry = XmlNode.of("entry");
						addKeyValue(entry, key, val);
						(containerIsMap ? container : mapNode).addChildNode(entry);
					}
				}
			}
		}
		writeSimple(_schema, value) {
			if (null === value) throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
			const ns = NormalizedSchema.of(_schema);
			let nodeContents = null;
			if (value && typeof value === "object") if (ns.isBlobSchema()) nodeContents = (this.serdeContext?.base64Encoder ?? toBase64)(value);
			else if (ns.isTimestampSchema() && value instanceof Date) switch (determineTimestampFormat(ns, this.settings)) {
				case 5:
					nodeContents = value.toISOString().replace(".000Z", "Z");
					break;
				case 6:
					nodeContents = dateToUtcString(value);
					break;
				case 7:
					nodeContents = String(value.getTime() / 1e3);
					break;
				default:
					console.warn("Missing timestamp format, using http date", value);
					nodeContents = dateToUtcString(value);
					break;
			}
			else if (ns.isBigDecimalSchema() && value) {
				if (value instanceof NumericValue) return value.string;
				return String(value);
			} else if (ns.isMapSchema() || ns.isListSchema()) throw new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.");
			else throw new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${ns.getName(true)}`);
			if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isBigIntegerSchema() || ns.isBigDecimalSchema()) nodeContents = String(value);
			if (ns.isStringSchema()) if (value === void 0 && ns.isIdempotencyToken()) nodeContents = generateIdempotencyToken();
			else nodeContents = String(value);
			if (nodeContents === null) throw new Error(`Unhandled schema-value pair ${ns.getName(true)}=${value}`);
			return nodeContents;
		}
		writeSimpleInto(_schema, value, into, parentXmlns) {
			const nodeContents = this.writeSimple(_schema, value);
			const ns = NormalizedSchema.of(_schema);
			const content = new XmlText(nodeContents);
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
			if (xmlns) into.addAttribute(xmlnsAttr, xmlns);
			into.addChildNode(content);
		}
		getXmlnsAttribute(ns, parentXmlns) {
			const [prefix, xmlns] = ns.getMergedTraits().xmlNamespace ?? [];
			if (xmlns && xmlns !== parentXmlns) return [prefix ? `xmlns:${prefix}` : "xmlns", xmlns];
			return [void 0, void 0];
		}
	};
	var XmlCodec = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		createSerializer() {
			const serializer = new XmlShapeSerializer(this.settings);
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new XmlShapeDeserializer(this.settings);
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var AwsRestXmlProtocol = class extends HttpBindingProtocol {
		codec;
		serializer;
		deserializer;
		mixin = new ProtocolLib();
		constructor(options) {
			super(options);
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 5
				},
				httpBindings: true,
				xmlNamespace: options.xmlNamespace,
				serviceNamespace: options.defaultNamespace
			};
			this.codec = new XmlCodec(settings);
			this.serializer = new HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
			this.deserializer = new HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
		}
		getPayloadCodec() {
			return this.codec;
		}
		getShapeId() {
			return "aws.protocols#restXml";
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const inputSchema = NormalizedSchema.of(operationSchema.input);
			if (!request.headers["content-type"]) {
				const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
				if (contentType) request.headers["content-type"] = contentType;
			}
			if (typeof request.body === "string" && request.headers["content-type"] === this.getDefaultContentType() && !request.body.startsWith("<?xml ") && !this.hasUnstructuredPayloadBinding(inputSchema)) request.body = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + request.body;
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			return super.deserializeResponse(operationSchema, context, response);
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = loadRestXmlErrorCode(response, dataObject) ?? "Unknown";
			this.mixin.compose(this.compositeErrorRegistry, errorIdentifier, this.options.defaultNamespace);
			if (dataObject.Error && typeof dataObject.Error === "object") for (const key of Object.keys(dataObject.Error)) {
				dataObject[key] = dataObject.Error[key];
				if (key.toLowerCase() === "message") dataObject.message = dataObject.Error[key];
			}
			if (dataObject.RequestId && !metadata.requestId) metadata.requestId = dataObject.RequestId;
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
			const ns = NormalizedSchema.of(errorSchema);
			const message = dataObject.Error?.message ?? dataObject.Error?.Message ?? dataObject.message ?? dataObject.Message ?? "UnknownError";
			const exception = new ((this.compositeErrorRegistry.getErrorCtor(errorSchema)) ?? Error)({});
			await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
			const output = {};
			const errorDeserializer = this.codec.createDeserializer();
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().xmlName ?? name;
				const value = dataObject.Error?.[target] ?? dataObject[target];
				output[name] = errorDeserializer.readSchema(member, value);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		getDefaultContentType() {
			return "application/xml";
		}
		hasUnstructuredPayloadBinding(ns) {
			for (const [, member] of ns.structIterator()) if (member.getMergedTraits().httpPayload) return !(member.isStructSchema() || member.isMapSchema() || member.isListSchema());
			return false;
		}
	};
	exports.AwsEc2QueryProtocol = AwsEc2QueryProtocol;
	exports.AwsJson1_0Protocol = AwsJson1_0Protocol;
	exports.AwsJson1_1Protocol = AwsJson1_1Protocol;
	exports.AwsJsonRpcProtocol = AwsJsonRpcProtocol;
	exports.AwsQueryProtocol = AwsQueryProtocol;
	exports.AwsRestJsonProtocol = AwsRestJsonProtocol;
	exports.AwsRestXmlProtocol = AwsRestXmlProtocol;
	exports.AwsSmithyRpcV2CborProtocol = AwsSmithyRpcV2CborProtocol;
	exports.JsonCodec = JsonCodec;
	exports.JsonShapeDeserializer = JsonShapeDeserializer;
	exports.JsonShapeSerializer = JsonShapeSerializer;
	exports.QueryShapeSerializer = QueryShapeSerializer;
	exports.XmlCodec = XmlCodec;
	exports.XmlShapeDeserializer = XmlShapeDeserializer;
	exports.XmlShapeSerializer = XmlShapeSerializer;
	exports._toBool = _toBool;
	exports._toNum = _toNum;
	exports._toStr = _toStr;
	exports.awsExpectUnion = awsExpectUnion;
	exports.loadJsonRpcErrorCode = loadJsonRpcErrorCode;
	exports.loadRestJsonErrorCode = loadRestJsonErrorCode;
	exports.loadRestXmlErrorCode = loadRestXmlErrorCode;
	exports.parseJsonBody = parseJsonBody;
	exports.parseJsonErrorBody = parseJsonErrorBody;
	exports.parseXmlBody = parseXmlBody;
	exports.parseXmlErrorBody = parseXmlErrorBody;
}));
var remoteProvider = async (init) => {
	const { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI, fromContainerMetadata, fromInstanceMetadata } = await import("../@smithy/credential-provider-imds+[...].mjs").then((n) => n.t);
	if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
		init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
		const { fromHttp } = await import("./credential-provider-http+[...].mjs").then((n) => n.t);
		return (0, import_config.chain)(fromHttp(init), fromContainerMetadata(init));
	}
	if (process.env["AWS_EC2_METADATA_DISABLED"] && process.env["AWS_EC2_METADATA_DISABLED"] !== "false") return async () => {
		throw new import_config.CredentialsProviderError("EC2 Instance Metadata Service access disabled", { logger: init.logger });
	};
	init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata");
	return fromInstanceMetadata(init);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-node@3.972.56/node_modules/@aws-sdk/credential-provider-node/dist-es/runtime/memoize-chain.js
function memoizeChain(providers, treatAsExpired) {
	const chain = internalCreateChain(providers);
	let activeLock;
	let passiveLock;
	let credentials;
	let forceRefreshLock;
	const provider = async (options) => {
		if (options?.forceRefresh) {
			if (!forceRefreshLock) forceRefreshLock = chain(options).then((c) => {
				credentials = c;
			}).finally(() => {
				forceRefreshLock = void 0;
			});
			await forceRefreshLock;
			return credentials;
		}
		if (credentials?.expiration) {
			if (credentials?.expiration?.getTime() < Date.now()) credentials = void 0;
		}
		if (activeLock) await activeLock;
		else if (!credentials || treatAsExpired?.(credentials)) if (credentials) {
			if (!passiveLock) passiveLock = chain(options).then((c) => {
				credentials = c;
			}).finally(() => {
				passiveLock = void 0;
			});
		} else {
			activeLock = chain(options).then((c) => {
				credentials = c;
			}).finally(() => {
				activeLock = void 0;
			});
			return provider(options);
		}
		return credentials;
	};
	return provider;
}
var internalCreateChain = (providers) => async (awsIdentityProperties) => {
	let lastProviderError;
	for (const provider of providers) try {
		return await provider(awsIdentityProperties);
	} catch (err) {
		lastProviderError = err;
		if (err?.tryNextLink) continue;
		throw err;
	}
	throw lastProviderError;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-node@3.972.56/node_modules/@aws-sdk/credential-provider-node/dist-es/defaultProvider.js
var multipleCredentialSourceWarningEmitted = false;
var defaultProvider = (init = {}) => memoizeChain([
	async () => {
		if (init.profile ?? process.env[import_config.ENV_PROFILE]) {
			if (process.env["AWS_ACCESS_KEY_ID"] && process.env["AWS_SECRET_ACCESS_KEY"]) {
				if (!multipleCredentialSourceWarningEmitted) {
					(init.logger?.warn && init.logger?.constructor?.name !== "NoOpLogger" ? init.logger.warn.bind(init.logger) : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`);
					multipleCredentialSourceWarningEmitted = true;
				}
			}
			throw new import_config.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
				logger: init.logger,
				tryNextLink: true
			});
		}
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv");
		return fromEnv(init)();
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
		const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
		if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) throw new import_config.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", { logger: init.logger });
		const { fromSSO } = await import("./credential-provider-sso+[...].mjs").then((n) => n.t);
		return fromSSO(init)(awsIdentityProperties);
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
		const { fromIni } = await import("./credential-provider-ini+[...].mjs").then((n) => n.t);
		return fromIni(init)(awsIdentityProperties);
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
		const { fromProcess } = await import("./credential-provider-process+[...].mjs").then((n) => n.t);
		return fromProcess(init)(awsIdentityProperties);
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
		const { fromTokenFile } = await import("./credential-provider-web-identity+[...].mjs").then((n) => n.t);
		return fromTokenFile(init)(awsIdentityProperties);
	},
	async () => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider");
		return (await remoteProvider(init))();
	},
	async () => {
		throw new import_config.CredentialsProviderError("Could not load credentials from any providers", {
			tryNextLink: false,
			logger: init.logger
		});
	}
], credentialsTreatedAsExpired);
var credentialsTreatedAsExpired = (credentials) => credentials?.expiration !== void 0 && credentials.expiration.getTime() - Date.now() < 3e5;
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+core@3.974.21/node_modules/@aws-sdk/core/dist-cjs/submodules/account-id-endpoint/index.js
var require_account_id_endpoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { normalizeProvider } = require_client$1();
	var DEFAULT_ACCOUNT_ID_ENDPOINT_MODE = "preferred";
	var ACCOUNT_ID_ENDPOINT_MODE_VALUES = [
		"disabled",
		"preferred",
		"required"
	];
	function validateAccountIdEndpointMode(value) {
		return ACCOUNT_ID_ENDPOINT_MODE_VALUES.includes(value);
	}
	var resolveAccountIdEndpointModeConfig = (input) => {
		const { accountIdEndpointMode } = input;
		const accountIdEndpointModeProvider = normalizeProvider(accountIdEndpointMode ?? DEFAULT_ACCOUNT_ID_ENDPOINT_MODE);
		return Object.assign(input, { accountIdEndpointMode: async () => {
			const accIdMode = await accountIdEndpointModeProvider();
			if (!validateAccountIdEndpointMode(accIdMode)) throw new Error(`Invalid value for accountIdEndpointMode: ${accIdMode}. Valid values are: "required", "preferred", "disabled".`);
			return accIdMode;
		} });
	};
	var err = "Invalid AccountIdEndpointMode value";
	var _throw = (message) => {
		throw new Error(message);
	};
	var ENV_ACCOUNT_ID_ENDPOINT_MODE = "AWS_ACCOUNT_ID_ENDPOINT_MODE";
	var CONFIG_ACCOUNT_ID_ENDPOINT_MODE = "account_id_endpoint_mode";
	exports.NODE_ACCOUNT_ID_ENDPOINT_MODE_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => {
			const value = env[ENV_ACCOUNT_ID_ENDPOINT_MODE];
			if (value && !validateAccountIdEndpointMode(value)) _throw(err);
			return value;
		},
		configFileSelector: (profile) => {
			const value = profile[CONFIG_ACCOUNT_ID_ENDPOINT_MODE];
			if (value && !validateAccountIdEndpointMode(value)) _throw(err);
			return value;
		},
		default: DEFAULT_ACCOUNT_ID_ENDPOINT_MODE
	};
	exports.resolveAccountIdEndpointModeConfig = resolveAccountIdEndpointModeConfig;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+middleware-endpoint-discovery@3.972.19/node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/configurations.js
var ENV_ENDPOINT_DISCOVERY = ["AWS_ENABLE_ENDPOINT_DISCOVERY", "AWS_ENDPOINT_DISCOVERY_ENABLED"];
var CONFIG_ENDPOINT_DISCOVERY = "endpoint_discovery_enabled";
var isFalsy = (value) => ["false", "0"].indexOf(value) >= 0;
var NODE_ENDPOINT_DISCOVERY_CONFIG_OPTIONS = {
	environmentVariableSelector: (env) => {
		for (let i = 0; i < ENV_ENDPOINT_DISCOVERY.length; i++) {
			const envKey = ENV_ENDPOINT_DISCOVERY[i];
			if (envKey in env) {
				const value = env[envKey];
				if (value === "") throw Error(`Environment variable ${envKey} can't be empty of undefined, got "${value}"`);
				return !isFalsy(value);
			}
		}
	},
	configFileSelector: (profile) => {
		if (CONFIG_ENDPOINT_DISCOVERY in profile) {
			const value = profile[CONFIG_ENDPOINT_DISCOVERY];
			if (value === void 0) throw Error(`Shared config entry ${CONFIG_ENDPOINT_DISCOVERY} can't be undefined, got "${value}"`);
			return !isFalsy(value);
		}
	},
	default: void 0
};
//#endregion
//#region ../../node_modules/.bun/obliterator@1.6.1/node_modules/obliterator/iterator.js
var require_iterator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Obliterator Iterator Class
	* ===========================
	*
	* Simple class representing the library's iterators.
	*/
	/**
	* Iterator class.
	*
	* @constructor
	* @param {function} next - Next function.
	*/
	function Iterator(next) {
		Object.defineProperty(this, "_next", {
			writable: false,
			enumerable: false,
			value: next
		});
		this.done = false;
	}
	/**
	* Next function.
	*
	* @return {object}
	*/
	Iterator.prototype.next = function() {
		if (this.done) return { done: true };
		var step = this._next();
		if (step.done) this.done = true;
		return step;
	};
	/**
	* If symbols are supported, we add `next` to `Symbol.iterator`.
	*/
	if (typeof Symbol !== "undefined") Iterator.prototype[Symbol.iterator] = function() {
		return this;
	};
	/**
	* Returning an iterator of the given values.
	*
	* @param  {any...} values - Values.
	* @return {Iterator}
	*/
	Iterator.of = function() {
		var args = arguments, l = args.length, i = 0;
		return new Iterator(function() {
			if (i >= l) return { done: true };
			return {
				done: false,
				value: args[i++]
			};
		});
	};
	/**
	* Returning an empty iterator.
	*
	* @return {Iterator}
	*/
	Iterator.empty = function() {
		var iterator = new Iterator(null);
		iterator.done = true;
		return iterator;
	};
	/**
	* Returning whether the given value is an iterator.
	*
	* @param  {any} value - Value.
	* @return {boolean}
	*/
	Iterator.is = function(value) {
		if (value instanceof Iterator) return true;
		return typeof value === "object" && value !== null && typeof value.next === "function";
	};
	/**
	* Exporting.
	*/
	module.exports = Iterator;
}));
//#endregion
//#region ../../node_modules/.bun/obliterator@1.6.1/node_modules/obliterator/foreach.js
var require_foreach = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Obliterator ForEach Function
	* =============================
	*
	* Helper function used to easily iterate over mixed values.
	*/
	/**
	* Constants.
	*/
	var ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== "undefined", SYMBOL_SUPPORT = typeof Symbol !== "undefined";
	/**
	* Function able to iterate over almost any iterable JS value.
	*
	* @param  {any}      iterable - Iterable value.
	* @param  {function} callback - Callback function.
	*/
	function forEach(iterable, callback) {
		var iterator, k, i, l, s;
		if (!iterable) throw new Error("obliterator/forEach: invalid iterable.");
		if (typeof callback !== "function") throw new Error("obliterator/forEach: expecting a callback.");
		if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
			for (i = 0, l = iterable.length; i < l; i++) callback(iterable[i], i);
			return;
		}
		if (typeof iterable.forEach === "function") {
			iterable.forEach(callback);
			return;
		}
		if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") iterable = iterable[Symbol.iterator]();
		if (typeof iterable.next === "function") {
			iterator = iterable;
			i = 0;
			while (s = iterator.next(), s.done !== true) {
				callback(s.value, i);
				i++;
			}
			return;
		}
		for (k in iterable) if (iterable.hasOwnProperty(k)) callback(iterable[k], k);
	}
	/**
	* Same function as the above `forEach` but will yield `null` when the target
	* does not have keys.
	*
	* @param  {any}      iterable - Iterable value.
	* @param  {function} callback - Callback function.
	*/
	forEach.forEachWithNullKeys = function(iterable, callback) {
		var iterator, k, i, l, s;
		if (!iterable) throw new Error("obliterator/forEachWithNullKeys: invalid iterable.");
		if (typeof callback !== "function") throw new Error("obliterator/forEachWithNullKeys: expecting a callback.");
		if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
			for (i = 0, l = iterable.length; i < l; i++) callback(iterable[i], null);
			return;
		}
		if (iterable instanceof Set) {
			iterable.forEach(function(value) {
				callback(value, null);
			});
			return;
		}
		if (typeof iterable.forEach === "function") {
			iterable.forEach(callback);
			return;
		}
		if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") iterable = iterable[Symbol.iterator]();
		if (typeof iterable.next === "function") {
			iterator = iterable;
			i = 0;
			while (s = iterator.next(), s.done !== true) {
				callback(s.value, null);
				i++;
			}
			return;
		}
		for (k in iterable) if (iterable.hasOwnProperty(k)) callback(iterable[k], k);
	};
	/**
	* Exporting.
	*/
	module.exports = forEach;
}));
//#endregion
//#region ../../node_modules/.bun/mnemonist@0.38.3/node_modules/mnemonist/utils/typed-arrays.js
var require_typed_arrays = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Mnemonist Typed Array Helpers
	* ==============================
	*
	* Miscellaneous helpers related to typed arrays.
	*/
	/**
	* When using an unsigned integer array to store pointers, one might want to
	* choose the optimal word size in regards to the actual numbers of pointers
	* to store.
	*
	* This helpers does just that.
	*
	* @param  {number} size - Expected size of the array to map.
	* @return {TypedArray}
	*/
	var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1, MAX_16BIT_INTEGER = Math.pow(2, 16) - 1, MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;
	var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1, MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1, MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;
	exports.getPointerArray = function(size) {
		var maxIndex = size - 1;
		if (maxIndex <= MAX_8BIT_INTEGER) return Uint8Array;
		if (maxIndex <= MAX_16BIT_INTEGER) return Uint16Array;
		if (maxIndex <= MAX_32BIT_INTEGER) return Uint32Array;
		return Float64Array;
	};
	exports.getSignedPointerArray = function(size) {
		var maxIndex = size - 1;
		if (maxIndex <= MAX_SIGNED_8BIT_INTEGER) return Int8Array;
		if (maxIndex <= MAX_SIGNED_16BIT_INTEGER) return Int16Array;
		if (maxIndex <= MAX_SIGNED_32BIT_INTEGER) return Int32Array;
		return Float64Array;
	};
	/**
	* Function returning the minimal type able to represent the given number.
	*
	* @param  {number} value - Value to test.
	* @return {TypedArrayClass}
	*/
	exports.getNumberType = function(value) {
		if (value === (value | 0)) if (Math.sign(value) === -1) {
			if (value <= 127 && value >= -128) return Int8Array;
			if (value <= 32767 && value >= -32768) return Int16Array;
			return Int32Array;
		} else {
			if (value <= 255) return Uint8Array;
			if (value <= 65535) return Uint16Array;
			return Uint32Array;
		}
		return Float64Array;
	};
	/**
	* Function returning the minimal type able to represent the given array
	* of JavaScript numbers.
	*
	* @param  {array}    array  - Array to represent.
	* @param  {function} getter - Optional getter.
	* @return {TypedArrayClass}
	*/
	var TYPE_PRIORITY = {
		Uint8Array: 1,
		Int8Array: 2,
		Uint16Array: 3,
		Int16Array: 4,
		Uint32Array: 5,
		Int32Array: 6,
		Float32Array: 7,
		Float64Array: 8
	};
	exports.getMinimalRepresentation = function(array, getter) {
		var maxType = null, maxPriority = 0, p, t, v, i, l;
		for (i = 0, l = array.length; i < l; i++) {
			v = getter ? getter(array[i]) : array[i];
			t = exports.getNumberType(v);
			p = TYPE_PRIORITY[t.name];
			if (p > maxPriority) {
				maxPriority = p;
				maxType = t;
			}
		}
		return maxType;
	};
	/**
	* Function returning whether the given value is a typed array.
	*
	* @param  {any} value - Value to test.
	* @return {boolean}
	*/
	exports.isTypedArray = function(value) {
		return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
	};
	/**
	* Function used to concat byte arrays.
	*
	* @param  {...ByteArray}
	* @return {ByteArray}
	*/
	exports.concat = function() {
		var length = 0, i, o, l;
		for (i = 0, l = arguments.length; i < l; i++) length += arguments[i].length;
		var array = new arguments[0].constructor(length);
		for (i = 0, o = 0; i < l; i++) {
			array.set(arguments[i], o);
			o += arguments[i].length;
		}
		return array;
	};
	/**
	* Function used to initialize a byte array of indices.
	*
	* @param  {number}    length - Length of target.
	* @return {ByteArray}
	*/
	exports.indices = function(length) {
		var array = new (exports.getPointerArray(length))(length);
		for (var i = 0; i < length; i++) array[i] = i;
		return array;
	};
}));
//#endregion
//#region ../../node_modules/.bun/mnemonist@0.38.3/node_modules/mnemonist/utils/iterables.js
var require_iterables = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Mnemonist Iterable Function
	* ============================
	*
	* Harmonized iteration helpers over mixed iterable targets.
	*/
	var forEach = require_foreach();
	var typed = require_typed_arrays();
	/**
	* Function used to determine whether the given object supports array-like
	* random access.
	*
	* @param  {any} target - Target object.
	* @return {boolean}
	*/
	function isArrayLike(target) {
		return Array.isArray(target) || typed.isTypedArray(target);
	}
	/**
	* Function used to guess the length of the structure over which we are going
	* to iterate.
	*
	* @param  {any} target - Target object.
	* @return {number|undefined}
	*/
	function guessLength(target) {
		if (typeof target.length === "number") return target.length;
		if (typeof target.size === "number") return target.size;
	}
	/**
	* Function used to convert an iterable to an array.
	*
	* @param  {any}   target - Iteration target.
	* @return {array}
	*/
	function toArray(target) {
		var l = guessLength(target);
		var array = typeof l === "number" ? new Array(l) : [];
		var i = 0;
		forEach(target, function(value) {
			array[i++] = value;
		});
		return array;
	}
	/**
	* Same as above but returns a supplementary indices array.
	*
	* @param  {any}   target - Iteration target.
	* @return {array}
	*/
	function toArrayWithIndices(target) {
		var l = guessLength(target);
		var IndexArray = typeof l === "number" ? typed.getPointerArray(l) : Array;
		var array = typeof l === "number" ? new Array(l) : [];
		var indices = typeof l === "number" ? new IndexArray(l) : [];
		var i = 0;
		forEach(target, function(value) {
			array[i] = value;
			indices[i] = i++;
		});
		return [array, indices];
	}
	/**
	* Exporting.
	*/
	exports.isArrayLike = isArrayLike;
	exports.guessLength = guessLength;
	exports.toArray = toArray;
	exports.toArrayWithIndices = toArrayWithIndices;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+endpoint-cache@3.972.8/node_modules/@aws-sdk/endpoint-cache/dist-es/EndpointCache.js
var import_lru_cache = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Mnemonist LRUCache
	* ===================
	*
	* JavaScript implementation of the LRU Cache data structure. To save up
	* memory and allocations this implementation represents its underlying
	* doubly-linked list as static arrays and pointers. Thus, memory is allocated
	* only once at instantiation and JS objects are never created to serve as
	* pointers. This also means this implementation does not trigger too many
	* garbage collections.
	*
	* Note that to save up memory, a LRU Cache can be implemented using a singly
	* linked list by storing predecessors' pointers as hashmap values.
	* However, this means more hashmap lookups and would probably slow the whole
	* thing down. What's more, pointers are not the things taking most space in
	* memory.
	*/
	var Iterator = require_iterator(), forEach = require_foreach(), typed = require_typed_arrays(), iterables = require_iterables();
	/**
	* LRUCache.
	*
	* @constructor
	* @param {function} Keys     - Array class for storing keys.
	* @param {function} Values   - Array class for storing values.
	* @param {number}   capacity - Desired capacity.
	*/
	function LRUCache(Keys, Values, capacity) {
		if (arguments.length < 2) {
			capacity = Keys;
			Keys = null;
			Values = null;
		}
		this.capacity = capacity;
		if (typeof this.capacity !== "number" || this.capacity <= 0) throw new Error("mnemonist/lru-cache: capacity should be positive number.");
		var PointerArray = typed.getPointerArray(capacity);
		this.forward = new PointerArray(capacity);
		this.backward = new PointerArray(capacity);
		this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
		this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
		this.size = 0;
		this.head = 0;
		this.tail = 0;
		this.items = {};
	}
	/**
	* Method used to clear the structure.
	*
	* @return {undefined}
	*/
	LRUCache.prototype.clear = function() {
		this.size = 0;
		this.head = 0;
		this.tail = 0;
		this.items = {};
	};
	/**
	* Method used to splay a value on top.
	*
	* @param  {number}   pointer - Pointer of the value to splay on top.
	* @return {LRUCache}
	*/
	LRUCache.prototype.splayOnTop = function(pointer) {
		var oldHead = this.head;
		if (this.head === pointer) return this;
		var previous = this.backward[pointer], next = this.forward[pointer];
		if (this.tail === pointer) this.tail = previous;
		else this.backward[next] = previous;
		this.forward[previous] = next;
		this.backward[oldHead] = pointer;
		this.head = pointer;
		this.forward[pointer] = oldHead;
		return this;
	};
	/**
	* Method used to set the value for the given key in the cache.
	*
	* @param  {any} key   - Key.
	* @param  {any} value - Value.
	* @return {undefined}
	*/
	LRUCache.prototype.set = function(key, value) {
		var pointer = this.items[key];
		if (typeof pointer !== "undefined") {
			this.splayOnTop(pointer);
			this.V[pointer] = value;
			return;
		}
		if (this.size < this.capacity) pointer = this.size++;
		else {
			pointer = this.tail;
			this.tail = this.backward[pointer];
			delete this.items[this.K[pointer]];
		}
		this.items[key] = pointer;
		this.K[pointer] = key;
		this.V[pointer] = value;
		this.forward[pointer] = this.head;
		this.backward[this.head] = pointer;
		this.head = pointer;
	};
	/**
	* Method used to set the value for the given key in the cache
	*
	* @param  {any} key   - Key.
	* @param  {any} value - Value.
	* @return {{evicted: boolean, key: any, value: any}} An object containing the
	* key and value of an item that was overwritten or evicted in the set
	* operation, as well as a boolean indicating whether it was evicted due to
	* limited capacity. Return value is null if nothing was evicted or overwritten
	* during the set operation.
	*/
	LRUCache.prototype.setpop = function(key, value) {
		var oldValue = null;
		var oldKey = null;
		var pointer = this.items[key];
		if (typeof pointer !== "undefined") {
			this.splayOnTop(pointer);
			oldValue = this.V[pointer];
			this.V[pointer] = value;
			return {
				evicted: false,
				key,
				value: oldValue
			};
		}
		if (this.size < this.capacity) pointer = this.size++;
		else {
			pointer = this.tail;
			this.tail = this.backward[pointer];
			oldValue = this.V[pointer];
			oldKey = this.K[pointer];
			delete this.items[this.K[pointer]];
		}
		this.items[key] = pointer;
		this.K[pointer] = key;
		this.V[pointer] = value;
		this.forward[pointer] = this.head;
		this.backward[this.head] = pointer;
		this.head = pointer;
		if (oldKey) return {
			evicted: true,
			key: oldKey,
			value: oldValue
		};
		else return null;
	};
	/**
	* Method used to check whether the key exists in the cache.
	*
	* @param  {any} key   - Key.
	* @return {boolean}
	*/
	LRUCache.prototype.has = function(key) {
		return key in this.items;
	};
	/**
	* Method used to get the value attached to the given key. Will move the
	* related key to the front of the underlying linked list.
	*
	* @param  {any} key   - Key.
	* @return {any}
	*/
	LRUCache.prototype.get = function(key) {
		var pointer = this.items[key];
		if (typeof pointer === "undefined") return;
		this.splayOnTop(pointer);
		return this.V[pointer];
	};
	/**
	* Method used to get the value attached to the given key. Does not modify
	* the ordering of the underlying linked list.
	*
	* @param  {any} key   - Key.
	* @return {any}
	*/
	LRUCache.prototype.peek = function(key) {
		var pointer = this.items[key];
		if (typeof pointer === "undefined") return;
		return this.V[pointer];
	};
	/**
	* Method used to iterate over the cache's entries using a callback.
	*
	* @param  {function}  callback - Function to call for each item.
	* @param  {object}    scope    - Optional scope.
	* @return {undefined}
	*/
	LRUCache.prototype.forEach = function(callback, scope) {
		scope = arguments.length > 1 ? scope : this;
		var i = 0, l = this.size;
		var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
		while (i < l) {
			callback.call(scope, values[pointer], keys[pointer], this);
			pointer = forward[pointer];
			i++;
		}
	};
	/**
	* Method used to create an iterator over the cache's keys from most
	* recently used to least recently used.
	*
	* @return {Iterator}
	*/
	LRUCache.prototype.keys = function() {
		var i = 0, l = this.size;
		var pointer = this.head, keys = this.K, forward = this.forward;
		return new Iterator(function() {
			if (i >= l) return { done: true };
			var key = keys[pointer];
			i++;
			if (i < l) pointer = forward[pointer];
			return {
				done: false,
				value: key
			};
		});
	};
	/**
	* Method used to create an iterator over the cache's values from most
	* recently used to least recently used.
	*
	* @return {Iterator}
	*/
	LRUCache.prototype.values = function() {
		var i = 0, l = this.size;
		var pointer = this.head, values = this.V, forward = this.forward;
		return new Iterator(function() {
			if (i >= l) return { done: true };
			var value = values[pointer];
			i++;
			if (i < l) pointer = forward[pointer];
			return {
				done: false,
				value
			};
		});
	};
	/**
	* Method used to create an iterator over the cache's entries from most
	* recently used to least recently used.
	*
	* @return {Iterator}
	*/
	LRUCache.prototype.entries = function() {
		var i = 0, l = this.size;
		var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
		return new Iterator(function() {
			if (i >= l) return { done: true };
			var key = keys[pointer], value = values[pointer];
			i++;
			if (i < l) pointer = forward[pointer];
			return {
				done: false,
				value: [key, value]
			};
		});
	};
	/**
	* Attaching the #.entries method to Symbol.iterator if possible.
	*/
	if (typeof Symbol !== "undefined") LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;
	/**
	* Convenience known methods.
	*/
	LRUCache.prototype.inspect = function() {
		var proxy = /* @__PURE__ */ new Map();
		var iterator = this.entries(), step;
		while (step = iterator.next(), !step.done) proxy.set(step.value[0], step.value[1]);
		Object.defineProperty(proxy, "constructor", {
			value: LRUCache,
			enumerable: false
		});
		return proxy;
	};
	if (typeof Symbol !== "undefined") LRUCache.prototype[Symbol.for("nodejs.util.inspect.custom")] = LRUCache.prototype.inspect;
	/**
	* Static @.from function taking an arbitrary iterable & converting it into
	* a structure.
	*
	* @param  {Iterable} iterable - Target iterable.
	* @param  {function} Keys     - Array class for storing keys.
	* @param  {function} Values   - Array class for storing values.
	* @param  {number}   capacity - Cache's capacity.
	* @return {LRUCache}
	*/
	LRUCache.from = function(iterable, Keys, Values, capacity) {
		if (arguments.length < 2) {
			capacity = iterables.guessLength(iterable);
			if (typeof capacity !== "number") throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
		} else if (arguments.length === 2) {
			capacity = Keys;
			Keys = null;
			Values = null;
		}
		var cache = new LRUCache(Keys, Values, capacity);
		forEach(iterable, function(value, key) {
			cache.set(key, value);
		});
		return cache;
	};
	/**
	* Exporting.
	*/
	module.exports = LRUCache;
})))());
var EndpointCache$1 = class {
	cache;
	constructor(capacity) {
		this.cache = new import_lru_cache.default(capacity);
	}
	getEndpoint(key) {
		const endpointsWithExpiry = this.get(key);
		if (!endpointsWithExpiry || endpointsWithExpiry.length === 0) return;
		const endpoints = endpointsWithExpiry.map((endpoint) => endpoint.Address);
		return endpoints[Math.floor(Math.random() * endpoints.length)];
	}
	get(key) {
		if (!this.has(key)) return;
		const value = this.cache.get(key);
		if (!value) return;
		const now = Date.now();
		const endpointsWithExpiry = value.filter((endpoint) => now < endpoint.Expires);
		if (endpointsWithExpiry.length === 0) {
			this.delete(key);
			return;
		}
		return endpointsWithExpiry;
	}
	set(key, endpoints) {
		const now = Date.now();
		this.cache.set(key, endpoints.map(({ Address, CachePeriodInMinutes }) => ({
			Address,
			Expires: now + CachePeriodInMinutes * 60 * 1e3
		})));
	}
	delete(key) {
		this.cache.set(key, []);
	}
	has(key) {
		if (!this.cache.has(key)) return false;
		const endpoints = this.cache.peek(key);
		if (!endpoints) return false;
		return endpoints.length > 0;
	}
	clear() {
		this.cache.clear();
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+middleware-endpoint-discovery@3.972.19/node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/resolveEndpointDiscoveryConfig.js
var resolveEndpointDiscoveryConfig = (input, { endpointDiscoveryCommandCtor }) => {
	const { endpointCacheSize, endpointDiscoveryEnabled, endpointDiscoveryEnabledProvider } = input;
	return Object.assign(input, {
		endpointDiscoveryCommandCtor,
		endpointCache: new EndpointCache$1(endpointCacheSize ?? 1e3),
		endpointDiscoveryEnabled: endpointDiscoveryEnabled !== void 0 ? () => Promise.resolve(endpointDiscoveryEnabled) : endpointDiscoveryEnabledProvider,
		isClientEndpointDiscoveryEnabled: endpointDiscoveryEnabled !== void 0
	});
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/auth/httpAuthSchemeProvider.js
var import_schema = require_schema();
var import_endpoints = require_endpoints();
var import_retry = require_retry();
var import_dist_cjs = require_dist_cjs();
var import_protocols$1 = require_protocols();
var import_account_id_endpoint = require_account_id_endpoint();
var import_httpAuthSchemes = require_httpAuthSchemes();
var import_client = require_client$1();
var defaultDynamoDBHttpAuthSchemeParametersProvider = async (config, context, input) => {
	return {
		operation: (0, import_client.getSmithyContext)(context).operation,
		region: await (0, import_client.normalizeProvider)(config.region)() || (() => {
			throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
		})()
	};
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
	return {
		schemeId: "aws.auth#sigv4",
		signingProperties: {
			name: "dynamodb",
			region: authParameters.region
		},
		propertiesExtractor: (config, context) => ({ signingProperties: {
			config,
			context
		} })
	};
}
var defaultDynamoDBHttpAuthSchemeProvider = (authParameters) => {
	const options = [];
	switch (authParameters.operation) {
		default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
	}
	return options;
};
var resolveHttpAuthSchemeConfig = (config) => {
	const config_0 = (0, import_httpAuthSchemes.resolveAwsSdkSigV4Config)(config);
	return Object.assign(config_0, { authSchemePreference: (0, import_client.normalizeProvider)(config.authSchemePreference ?? []) });
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/endpoint/EndpointParameters.js
var resolveClientEndpointParameters = (options) => {
	return Object.assign(options, {
		useDualstackEndpoint: options.useDualstackEndpoint ?? false,
		useFipsEndpoint: options.useFipsEndpoint ?? false,
		defaultSigningName: "dynamodb"
	});
};
var commonParams = {
	UseFIPS: {
		type: "builtInParams",
		name: "useFipsEndpoint"
	},
	AccountId: {
		type: "builtInParams",
		name: "accountId"
	},
	Endpoint: {
		type: "builtInParams",
		name: "endpoint"
	},
	Region: {
		type: "builtInParams",
		name: "region"
	},
	UseDualStack: {
		type: "builtInParams",
		name: "useDualstackEndpoint"
	},
	AccountIdEndpointMode: {
		type: "builtInParams",
		name: "accountIdEndpointMode"
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/models/DynamoDBServiceException.js
var DynamoDBServiceException = class DynamoDBServiceException extends import_client.ServiceException {
	constructor(options) {
		super(options);
		Object.setPrototypeOf(this, DynamoDBServiceException.prototype);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/models/errors.js
var BackupInUseException = class BackupInUseException extends DynamoDBServiceException {
	name = "BackupInUseException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "BackupInUseException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, BackupInUseException.prototype);
	}
};
var BackupNotFoundException = class BackupNotFoundException extends DynamoDBServiceException {
	name = "BackupNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "BackupNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, BackupNotFoundException.prototype);
	}
};
var InternalServerError = class InternalServerError extends DynamoDBServiceException {
	name = "InternalServerError";
	$fault = "server";
	constructor(opts) {
		super({
			name: "InternalServerError",
			$fault: "server",
			...opts
		});
		Object.setPrototypeOf(this, InternalServerError.prototype);
	}
};
var RequestLimitExceeded = class RequestLimitExceeded extends DynamoDBServiceException {
	name = "RequestLimitExceeded";
	$fault = "client";
	ThrottlingReasons;
	constructor(opts) {
		super({
			name: "RequestLimitExceeded",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, RequestLimitExceeded.prototype);
		this.ThrottlingReasons = opts.ThrottlingReasons;
	}
};
var ThrottlingException = class ThrottlingException extends DynamoDBServiceException {
	name = "ThrottlingException";
	$fault = "client";
	throttlingReasons;
	constructor(opts) {
		super({
			name: "ThrottlingException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ThrottlingException.prototype);
		this.throttlingReasons = opts.throttlingReasons;
	}
};
var InvalidEndpointException = class InvalidEndpointException extends DynamoDBServiceException {
	name = "InvalidEndpointException";
	$fault = "client";
	Message;
	constructor(opts) {
		super({
			name: "InvalidEndpointException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidEndpointException.prototype);
		this.Message = opts.Message;
	}
};
var ProvisionedThroughputExceededException = class ProvisionedThroughputExceededException extends DynamoDBServiceException {
	name = "ProvisionedThroughputExceededException";
	$fault = "client";
	ThrottlingReasons;
	constructor(opts) {
		super({
			name: "ProvisionedThroughputExceededException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ProvisionedThroughputExceededException.prototype);
		this.ThrottlingReasons = opts.ThrottlingReasons;
	}
};
var ResourceNotFoundException = class ResourceNotFoundException extends DynamoDBServiceException {
	name = "ResourceNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ResourceNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
	}
};
var ItemCollectionSizeLimitExceededException = class ItemCollectionSizeLimitExceededException extends DynamoDBServiceException {
	name = "ItemCollectionSizeLimitExceededException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ItemCollectionSizeLimitExceededException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ItemCollectionSizeLimitExceededException.prototype);
	}
};
var ReplicatedWriteConflictException = class ReplicatedWriteConflictException extends DynamoDBServiceException {
	name = "ReplicatedWriteConflictException";
	$fault = "client";
	$retryable = {};
	constructor(opts) {
		super({
			name: "ReplicatedWriteConflictException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ReplicatedWriteConflictException.prototype);
	}
};
var ContinuousBackupsUnavailableException = class ContinuousBackupsUnavailableException extends DynamoDBServiceException {
	name = "ContinuousBackupsUnavailableException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ContinuousBackupsUnavailableException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ContinuousBackupsUnavailableException.prototype);
	}
};
var LimitExceededException = class LimitExceededException extends DynamoDBServiceException {
	name = "LimitExceededException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "LimitExceededException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, LimitExceededException.prototype);
	}
};
var TableInUseException = class TableInUseException extends DynamoDBServiceException {
	name = "TableInUseException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TableInUseException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TableInUseException.prototype);
	}
};
var TableNotFoundException = class TableNotFoundException extends DynamoDBServiceException {
	name = "TableNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TableNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TableNotFoundException.prototype);
	}
};
var GlobalTableAlreadyExistsException = class GlobalTableAlreadyExistsException extends DynamoDBServiceException {
	name = "GlobalTableAlreadyExistsException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "GlobalTableAlreadyExistsException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, GlobalTableAlreadyExistsException.prototype);
	}
};
var ResourceInUseException = class ResourceInUseException extends DynamoDBServiceException {
	name = "ResourceInUseException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ResourceInUseException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ResourceInUseException.prototype);
	}
};
var TransactionConflictException = class TransactionConflictException extends DynamoDBServiceException {
	name = "TransactionConflictException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TransactionConflictException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TransactionConflictException.prototype);
	}
};
var PolicyNotFoundException = class PolicyNotFoundException extends DynamoDBServiceException {
	name = "PolicyNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "PolicyNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, PolicyNotFoundException.prototype);
	}
};
var ExportNotFoundException = class ExportNotFoundException extends DynamoDBServiceException {
	name = "ExportNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ExportNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ExportNotFoundException.prototype);
	}
};
var GlobalTableNotFoundException = class GlobalTableNotFoundException extends DynamoDBServiceException {
	name = "GlobalTableNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "GlobalTableNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, GlobalTableNotFoundException.prototype);
	}
};
var ImportNotFoundException = class ImportNotFoundException extends DynamoDBServiceException {
	name = "ImportNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ImportNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ImportNotFoundException.prototype);
	}
};
var DuplicateItemException = class DuplicateItemException extends DynamoDBServiceException {
	name = "DuplicateItemException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "DuplicateItemException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, DuplicateItemException.prototype);
	}
};
var IdempotentParameterMismatchException = class IdempotentParameterMismatchException extends DynamoDBServiceException {
	name = "IdempotentParameterMismatchException";
	$fault = "client";
	Message;
	constructor(opts) {
		super({
			name: "IdempotentParameterMismatchException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, IdempotentParameterMismatchException.prototype);
		this.Message = opts.Message;
	}
};
var TransactionInProgressException = class TransactionInProgressException extends DynamoDBServiceException {
	name = "TransactionInProgressException";
	$fault = "client";
	Message;
	constructor(opts) {
		super({
			name: "TransactionInProgressException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TransactionInProgressException.prototype);
		this.Message = opts.Message;
	}
};
var ExportConflictException = class ExportConflictException extends DynamoDBServiceException {
	name = "ExportConflictException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ExportConflictException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ExportConflictException.prototype);
	}
};
var InvalidExportTimeException = class InvalidExportTimeException extends DynamoDBServiceException {
	name = "InvalidExportTimeException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidExportTimeException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidExportTimeException.prototype);
	}
};
var PointInTimeRecoveryUnavailableException = class PointInTimeRecoveryUnavailableException extends DynamoDBServiceException {
	name = "PointInTimeRecoveryUnavailableException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "PointInTimeRecoveryUnavailableException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, PointInTimeRecoveryUnavailableException.prototype);
	}
};
var ImportConflictException = class ImportConflictException extends DynamoDBServiceException {
	name = "ImportConflictException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ImportConflictException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ImportConflictException.prototype);
	}
};
var TableAlreadyExistsException = class TableAlreadyExistsException extends DynamoDBServiceException {
	name = "TableAlreadyExistsException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TableAlreadyExistsException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TableAlreadyExistsException.prototype);
	}
};
var InvalidRestoreTimeException = class InvalidRestoreTimeException extends DynamoDBServiceException {
	name = "InvalidRestoreTimeException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidRestoreTimeException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidRestoreTimeException.prototype);
	}
};
var ReplicaAlreadyExistsException = class ReplicaAlreadyExistsException extends DynamoDBServiceException {
	name = "ReplicaAlreadyExistsException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ReplicaAlreadyExistsException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ReplicaAlreadyExistsException.prototype);
	}
};
var ReplicaNotFoundException = class ReplicaNotFoundException extends DynamoDBServiceException {
	name = "ReplicaNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ReplicaNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ReplicaNotFoundException.prototype);
	}
};
var IndexNotFoundException = class IndexNotFoundException extends DynamoDBServiceException {
	name = "IndexNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "IndexNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, IndexNotFoundException.prototype);
	}
};
var ConditionalCheckFailedException = class ConditionalCheckFailedException extends DynamoDBServiceException {
	name = "ConditionalCheckFailedException";
	$fault = "client";
	Item;
	constructor(opts) {
		super({
			name: "ConditionalCheckFailedException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ConditionalCheckFailedException.prototype);
		this.Item = opts.Item;
	}
};
var TransactionCanceledException = class TransactionCanceledException extends DynamoDBServiceException {
	name = "TransactionCanceledException";
	$fault = "client";
	Message;
	CancellationReasons;
	constructor(opts) {
		super({
			name: "TransactionCanceledException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TransactionCanceledException.prototype);
		this.Message = opts.Message;
		this.CancellationReasons = opts.CancellationReasons;
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/schemas/schemas_0.js
var _AM = "AttributeMap";
var _ATG = "AttributesToGet";
var _AV = "AttributeValue";
var _AVL = "AttributeValueList";
var _Ad = "Address";
var _At = "Attributes";
var _BIUE = "BackupInUseException";
var _BNFE = "BackupNotFoundException";
var _BOOL = "BOOL";
var _BS_ = "BS";
var _B_ = "B";
var _C = "Code";
var _CBUE = "ContinuousBackupsUnavailableException";
var _CC = "ConsumedCapacity";
var _CCFE = "ConditionalCheckFailedException";
var _CE = "ConditionExpression";
var _CO = "ComparisonOperator";
var _COo = "ConditionalOperator";
var _CPIM = "CachePeriodInMinutes";
var _CR = "CancellationReasons";
var _CRL = "CancellationReasonList";
var _CRa = "CancellationReason";
var _CRo = "ConsistentRead";
var _CU = "CapacityUnits";
var _Ca = "Capacity";
var _Co = "Condition";
var _Cou = "Count";
var _DE = "DescribeEndpoints";
var _DER = "DescribeEndpointsRequest";
var _DERe = "DescribeEndpointsResponse";
var _DI = "DeleteItem";
var _DIE = "DuplicateItemException";
var _DII = "DeleteItemInput";
var _DIO = "DeleteItemOutput";
var _EAM = "ExpectedAttributeMap";
var _EAN = "ExpressionAttributeNames";
var _EAV = "ExpressionAttributeValues";
var _EAVM = "ExpressionAttributeValueMap";
var _EAVx = "ExpectedAttributeValue";
var _ECE = "ExportConflictException";
var _ENFE = "ExportNotFoundException";
var _ESK = "ExclusiveStartKey";
var _En = "Endpoints";
var _End = "Endpoint";
var _Ex = "Expected";
var _Exi = "Exists";
var _FCM = "FilterConditionMap";
var _FEi = "FilterExpression";
var _GSI = "GlobalSecondaryIndexes";
var _GTAEE = "GlobalTableAlreadyExistsException";
var _GTNFE = "GlobalTableNotFoundException";
var _I = "Item";
var _ICE = "ImportConflictException";
var _ICK = "ItemCollectionKey";
var _ICKAM = "ItemCollectionKeyAttributeMap";
var _ICM = "ItemCollectionMetrics";
var _ICSLEE = "ItemCollectionSizeLimitExceededException";
var _IEE = "InvalidEndpointException";
var _IETE = "InvalidExportTimeException";
var _IL = "ItemList";
var _IN = "IndexName";
var _INFE = "ImportNotFoundException";
var _INFEn = "IndexNotFoundException";
var _IPME = "IdempotentParameterMismatchException";
var _IRTE = "InvalidRestoreTimeException";
var _ISE = "InternalServerError";
var _It = "Items";
var _K = "Key";
var _KC = "KeyConditions";
var _KCE = "KeyConditionExpression";
var _L = "Limit";
var _LAV = "ListAttributeValue";
var _LEE = "LimitExceededException";
var _LEK = "LastEvaluatedKey";
var _LSI = "LocalSecondaryIndexes";
var _L_ = "L";
var _M = "Message";
var _MAV = "MapAttributeValue";
var _M_ = "M";
var _N = "N";
var _NS = "NS";
var _NULL = "NULL";
var _PE = "ProjectionExpression";
var _PI = "PutItem";
var _PII = "PutItemInput";
var _PIIAM = "PutItemInputAttributeMap";
var _PIO = "PutItemOutput";
var _PITRUE = "PointInTimeRecoveryUnavailableException";
var _PNFE = "PolicyNotFoundException";
var _PTEE = "ProvisionedThroughputExceededException";
var _Q = "Query";
var _QF = "QueryFilter";
var _QI = "QueryInput";
var _QO = "QueryOutput";
var _RAEE = "ReplicaAlreadyExistsException";
var _RCC = "ReturnConsumedCapacity";
var _RCU = "ReadCapacityUnits";
var _RICM = "ReturnItemCollectionMetrics";
var _RIUE = "ResourceInUseException";
var _RLE = "RequestLimitExceeded";
var _RNFE = "ReplicaNotFoundException";
var _RNFEe = "ResourceNotFoundException";
var _RV = "ReturnValues";
var _RVOCCF = "ReturnValuesOnConditionCheckFailure";
var _RWCE = "ReplicatedWriteConflictException";
var _SC = "ScannedCount";
var _SERGB = "SizeEstimateRangeGB";
var _SF = "ScanFilter";
var _SI = "ScanInput";
var _SICM = "SecondaryIndexesCapacityMap";
var _SIF = "ScanIndexForward";
var _SO = "ScanOutput";
var _SS_ = "SS";
var _S_ = "S";
var _Sc = "Scan";
var _Se = "Select";
var _Seg = "Segment";
var _T = "Table";
var _TAEE = "TableAlreadyExistsException";
var _TCE = "TransactionCanceledException";
var _TCEr = "TransactionConflictException";
var _TE = "ThrottlingException";
var _TIPE = "TransactionInProgressException";
var _TIUE = "TableInUseException";
var _TN = "TableName";
var _TNFE = "TableNotFoundException";
var _TR = "ThrottlingReasons";
var _TRL = "ThrottlingReasonList";
var _TRh = "ThrottlingReason";
var _TSo = "TotalSegments";
var _V = "Value";
var _WCU = "WriteCapacityUnits";
var _aQE = "awsQueryError";
var _c = "client";
var _e = "error";
var _hE = "httpError";
var _m = "message";
var _r = "reason";
var _re = "resource";
var _s = "smithy.ts.sdk.synthetic.com.amazonaws.dynamodb";
var _se = "server";
var _tR = "throttlingReasons";
var n0 = "com.amazonaws.dynamodb";
var _s_registry = import_schema.TypeRegistry.for(_s);
var DynamoDBServiceException$ = [
	-3,
	_s,
	"DynamoDBServiceException",
	0,
	[],
	[]
];
_s_registry.registerError(DynamoDBServiceException$, DynamoDBServiceException);
var n0_registry = import_schema.TypeRegistry.for(n0);
var BackupInUseException$ = [
	-3,
	n0,
	_BIUE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(BackupInUseException$, BackupInUseException);
var BackupNotFoundException$ = [
	-3,
	n0,
	_BNFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(BackupNotFoundException$, BackupNotFoundException);
var ConditionalCheckFailedException$ = [
	-3,
	n0,
	_CCFE,
	{ [_e]: _c },
	[_m, _I],
	[0, () => AttributeMap]
];
n0_registry.registerError(ConditionalCheckFailedException$, ConditionalCheckFailedException);
var ContinuousBackupsUnavailableException$ = [
	-3,
	n0,
	_CBUE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ContinuousBackupsUnavailableException$, ContinuousBackupsUnavailableException);
var DuplicateItemException$ = [
	-3,
	n0,
	_DIE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(DuplicateItemException$, DuplicateItemException);
var ExportConflictException$ = [
	-3,
	n0,
	_ECE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ExportConflictException$, ExportConflictException);
var ExportNotFoundException$ = [
	-3,
	n0,
	_ENFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ExportNotFoundException$, ExportNotFoundException);
var GlobalTableAlreadyExistsException$ = [
	-3,
	n0,
	_GTAEE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(GlobalTableAlreadyExistsException$, GlobalTableAlreadyExistsException);
var GlobalTableNotFoundException$ = [
	-3,
	n0,
	_GTNFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(GlobalTableNotFoundException$, GlobalTableNotFoundException);
var IdempotentParameterMismatchException$ = [
	-3,
	n0,
	_IPME,
	{ [_e]: _c },
	[_M],
	[0]
];
n0_registry.registerError(IdempotentParameterMismatchException$, IdempotentParameterMismatchException);
var ImportConflictException$ = [
	-3,
	n0,
	_ICE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ImportConflictException$, ImportConflictException);
var ImportNotFoundException$ = [
	-3,
	n0,
	_INFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ImportNotFoundException$, ImportNotFoundException);
var IndexNotFoundException$ = [
	-3,
	n0,
	_INFEn,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(IndexNotFoundException$, IndexNotFoundException);
var InternalServerError$ = [
	-3,
	n0,
	_ISE,
	{ [_e]: _se },
	[_m],
	[0]
];
n0_registry.registerError(InternalServerError$, InternalServerError);
var InvalidEndpointException$ = [
	-3,
	n0,
	_IEE,
	{
		[_e]: _c,
		[_hE]: 421
	},
	[_M],
	[0]
];
n0_registry.registerError(InvalidEndpointException$, InvalidEndpointException);
var InvalidExportTimeException$ = [
	-3,
	n0,
	_IETE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(InvalidExportTimeException$, InvalidExportTimeException);
var InvalidRestoreTimeException$ = [
	-3,
	n0,
	_IRTE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(InvalidRestoreTimeException$, InvalidRestoreTimeException);
var ItemCollectionSizeLimitExceededException$ = [
	-3,
	n0,
	_ICSLEE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ItemCollectionSizeLimitExceededException$, ItemCollectionSizeLimitExceededException);
var LimitExceededException$ = [
	-3,
	n0,
	_LEE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(LimitExceededException$, LimitExceededException);
var PointInTimeRecoveryUnavailableException$ = [
	-3,
	n0,
	_PITRUE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(PointInTimeRecoveryUnavailableException$, PointInTimeRecoveryUnavailableException);
var PolicyNotFoundException$ = [
	-3,
	n0,
	_PNFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(PolicyNotFoundException$, PolicyNotFoundException);
var ProvisionedThroughputExceededException$ = [
	-3,
	n0,
	_PTEE,
	{ [_e]: _c },
	[_m, _TR],
	[0, () => ThrottlingReasonList]
];
n0_registry.registerError(ProvisionedThroughputExceededException$, ProvisionedThroughputExceededException);
var ReplicaAlreadyExistsException$ = [
	-3,
	n0,
	_RAEE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ReplicaAlreadyExistsException$, ReplicaAlreadyExistsException);
var ReplicaNotFoundException$ = [
	-3,
	n0,
	_RNFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ReplicaNotFoundException$, ReplicaNotFoundException);
var ReplicatedWriteConflictException$ = [
	-3,
	n0,
	_RWCE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ReplicatedWriteConflictException$, ReplicatedWriteConflictException);
var RequestLimitExceeded$ = [
	-3,
	n0,
	_RLE,
	{ [_e]: _c },
	[_m, _TR],
	[0, () => ThrottlingReasonList]
];
n0_registry.registerError(RequestLimitExceeded$, RequestLimitExceeded);
var ResourceInUseException$ = [
	-3,
	n0,
	_RIUE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ResourceInUseException$, ResourceInUseException);
var ResourceNotFoundException$ = [
	-3,
	n0,
	_RNFEe,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(ResourceNotFoundException$, ResourceNotFoundException);
var TableAlreadyExistsException$ = [
	-3,
	n0,
	_TAEE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(TableAlreadyExistsException$, TableAlreadyExistsException);
var TableInUseException$ = [
	-3,
	n0,
	_TIUE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(TableInUseException$, TableInUseException);
var TableNotFoundException$ = [
	-3,
	n0,
	_TNFE,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(TableNotFoundException$, TableNotFoundException);
var ThrottlingException$ = [
	-3,
	n0,
	_TE,
	{
		[_aQE]: [`Throttling`, 400],
		[_e]: _c,
		[_hE]: 400
	},
	[_m, _tR],
	[0, () => ThrottlingReasonList]
];
n0_registry.registerError(ThrottlingException$, ThrottlingException);
var TransactionCanceledException$ = [
	-3,
	n0,
	_TCE,
	{ [_e]: _c },
	[_M, _CR],
	[0, () => CancellationReasonList]
];
n0_registry.registerError(TransactionCanceledException$, TransactionCanceledException);
var TransactionConflictException$ = [
	-3,
	n0,
	_TCEr,
	{ [_e]: _c },
	[_m],
	[0]
];
n0_registry.registerError(TransactionConflictException$, TransactionConflictException);
var TransactionInProgressException$ = [
	-3,
	n0,
	_TIPE,
	{ [_e]: _c },
	[_M],
	[0]
];
n0_registry.registerError(TransactionInProgressException$, TransactionInProgressException);
var errorTypeRegistries = [_s_registry, n0_registry];
var CancellationReason$ = [
	3,
	n0,
	_CRa,
	0,
	[
		_I,
		_C,
		_M
	],
	[
		() => AttributeMap,
		0,
		0
	]
];
var Capacity$ = [
	3,
	n0,
	_Ca,
	0,
	[
		_RCU,
		_WCU,
		_CU
	],
	[
		1,
		1,
		1
	]
];
var Condition$ = [
	3,
	n0,
	_Co,
	0,
	[_CO, _AVL],
	[0, () => AttributeValueList],
	1
];
var ConsumedCapacity$ = [
	3,
	n0,
	_CC,
	0,
	[
		_TN,
		_CU,
		_RCU,
		_WCU,
		_T,
		_LSI,
		_GSI
	],
	[
		0,
		1,
		1,
		1,
		() => Capacity$,
		() => SecondaryIndexesCapacityMap,
		() => SecondaryIndexesCapacityMap
	]
];
var DeleteItemInput$ = [
	3,
	n0,
	_DII,
	0,
	[
		_TN,
		_K,
		_Ex,
		_COo,
		_RV,
		_RCC,
		_RICM,
		_CE,
		_EAN,
		_EAV,
		_RVOCCF
	],
	[
		0,
		() => Key,
		() => ExpectedAttributeMap,
		0,
		0,
		0,
		0,
		0,
		128,
		() => ExpressionAttributeValueMap,
		0
	],
	2
];
var DeleteItemOutput$ = [
	3,
	n0,
	_DIO,
	0,
	[
		_At,
		_CC,
		_ICM
	],
	[
		() => AttributeMap,
		() => ConsumedCapacity$,
		() => ItemCollectionMetrics$
	]
];
var DescribeEndpointsRequest$ = [
	3,
	n0,
	_DER,
	0,
	[],
	[]
];
var DescribeEndpointsResponse$ = [
	3,
	n0,
	_DERe,
	0,
	[_En],
	[() => Endpoints],
	1
];
var Endpoint$ = [
	3,
	n0,
	_End,
	0,
	[_Ad, _CPIM],
	[0, 1],
	2
];
var ExpectedAttributeValue$ = [
	3,
	n0,
	_EAVx,
	0,
	[
		_V,
		_Exi,
		_CO,
		_AVL
	],
	[
		() => AttributeValue$,
		2,
		0,
		() => AttributeValueList
	]
];
var ItemCollectionMetrics$ = [
	3,
	n0,
	_ICM,
	0,
	[_ICK, _SERGB],
	[() => ItemCollectionKeyAttributeMap, 65]
];
var PutItemInput$ = [
	3,
	n0,
	_PII,
	0,
	[
		_TN,
		_I,
		_Ex,
		_RV,
		_RCC,
		_RICM,
		_COo,
		_CE,
		_EAN,
		_EAV,
		_RVOCCF
	],
	[
		0,
		() => PutItemInputAttributeMap,
		() => ExpectedAttributeMap,
		0,
		0,
		0,
		0,
		0,
		128,
		() => ExpressionAttributeValueMap,
		0
	],
	2
];
var PutItemOutput$ = [
	3,
	n0,
	_PIO,
	0,
	[
		_At,
		_CC,
		_ICM
	],
	[
		() => AttributeMap,
		() => ConsumedCapacity$,
		() => ItemCollectionMetrics$
	]
];
var QueryInput$ = [
	3,
	n0,
	_QI,
	0,
	[
		_TN,
		_IN,
		_Se,
		_ATG,
		_L,
		_CRo,
		_KC,
		_QF,
		_COo,
		_SIF,
		_ESK,
		_RCC,
		_PE,
		_FEi,
		_KCE,
		_EAN,
		_EAV
	],
	[
		0,
		0,
		0,
		64,
		1,
		2,
		() => KeyConditions,
		() => FilterConditionMap,
		0,
		2,
		() => Key,
		0,
		0,
		0,
		0,
		128,
		() => ExpressionAttributeValueMap
	],
	1
];
var QueryOutput$ = [
	3,
	n0,
	_QO,
	0,
	[
		_It,
		_Cou,
		_SC,
		_LEK,
		_CC
	],
	[
		() => ItemList,
		1,
		1,
		() => Key,
		() => ConsumedCapacity$
	]
];
var ScanInput$ = [
	3,
	n0,
	_SI,
	0,
	[
		_TN,
		_IN,
		_ATG,
		_L,
		_Se,
		_SF,
		_COo,
		_ESK,
		_RCC,
		_TSo,
		_Seg,
		_PE,
		_FEi,
		_EAN,
		_EAV,
		_CRo
	],
	[
		0,
		0,
		64,
		1,
		0,
		() => FilterConditionMap,
		0,
		() => Key,
		0,
		1,
		1,
		0,
		0,
		128,
		() => ExpressionAttributeValueMap,
		2
	],
	1
];
var ScanOutput$ = [
	3,
	n0,
	_SO,
	0,
	[
		_It,
		_Cou,
		_SC,
		_LEK,
		_CC
	],
	[
		() => ItemList,
		1,
		1,
		() => Key,
		() => ConsumedCapacity$
	]
];
var ThrottlingReason$ = [
	3,
	n0,
	_TRh,
	0,
	[_r, _re],
	[0, 0]
];
var AttributeValueList = [
	1,
	n0,
	_AVL,
	0,
	() => AttributeValue$
];
var CancellationReasonList = [
	1,
	n0,
	_CRL,
	0,
	() => CancellationReason$
];
var Endpoints = [
	1,
	n0,
	_En,
	0,
	() => Endpoint$
];
var ItemList = [
	1,
	n0,
	_IL,
	0,
	() => AttributeMap
];
var ListAttributeValue = [
	1,
	n0,
	_LAV,
	0,
	() => AttributeValue$
];
var ThrottlingReasonList = [
	1,
	n0,
	_TRL,
	0,
	() => ThrottlingReason$
];
var AttributeMap = [
	2,
	n0,
	_AM,
	0,
	0,
	() => AttributeValue$
];
var ExpectedAttributeMap = [
	2,
	n0,
	_EAM,
	0,
	0,
	() => ExpectedAttributeValue$
];
var ExpressionAttributeValueMap = [
	2,
	n0,
	_EAVM,
	0,
	0,
	() => AttributeValue$
];
var FilterConditionMap = [
	2,
	n0,
	_FCM,
	0,
	0,
	() => Condition$
];
var ItemCollectionKeyAttributeMap = [
	2,
	n0,
	_ICKAM,
	0,
	0,
	() => AttributeValue$
];
var Key = [
	2,
	n0,
	_K,
	0,
	0,
	() => AttributeValue$
];
var KeyConditions = [
	2,
	n0,
	_KC,
	0,
	0,
	() => Condition$
];
var MapAttributeValue = [
	2,
	n0,
	_MAV,
	0,
	0,
	() => AttributeValue$
];
var PutItemInputAttributeMap = [
	2,
	n0,
	_PIIAM,
	0,
	0,
	() => AttributeValue$
];
var SecondaryIndexesCapacityMap = [
	2,
	n0,
	_SICM,
	0,
	0,
	() => Capacity$
];
var AttributeValue$ = [
	4,
	n0,
	_AV,
	0,
	[
		_S_,
		_N,
		_B_,
		_SS_,
		_NS,
		_BS_,
		_M_,
		_L_,
		_NULL,
		_BOOL
	],
	[
		0,
		0,
		21,
		64,
		64,
		85,
		() => MapAttributeValue,
		() => ListAttributeValue,
		2,
		2
	]
];
var DeleteItem$ = [
	9,
	n0,
	_DI,
	0,
	() => DeleteItemInput$,
	() => DeleteItemOutput$
];
var DescribeEndpoints$ = [
	9,
	n0,
	_DE,
	0,
	() => DescribeEndpointsRequest$,
	() => DescribeEndpointsResponse$
];
var PutItem$ = [
	9,
	n0,
	_PI,
	0,
	() => PutItemInput$,
	() => PutItemOutput$
];
var Query$ = [
	9,
	n0,
	_Q,
	0,
	() => QueryInput$,
	() => QueryOutput$
];
var Scan$ = [
	9,
	n0,
	_Sc,
	0,
	() => ScanInput$,
	() => ScanOutput$
];
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeEndpointsCommand.js
var DescribeEndpointsCommand = class extends import_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
}).s("DynamoDB_20120810", "DescribeEndpoints", {}).n("DynamoDBClient", "DescribeEndpointsCommand").sc(DescribeEndpoints$).build() {};
var package_default = {
	name: "@aws-sdk/client-dynamodb",
	description: "AWS SDK for JavaScript Dynamodb Client for Node.js, Browser and React Native",
	version: "3.1070.0",
	scripts: {
		"build": "concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
		"build:cjs": "node ../../scripts/compilation/inline",
		"build:es": "premove dist-es && tsc -p tsconfig.es.json",
		"build:include:deps": "yarn g:turbo run build -F=\"$npm_package_name\"",
		"build:types": "premove dist-types && tsc -p tsconfig.types.json",
		"build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
		"clean": "premove dist-cjs dist-es dist-types",
		"extract:docs": "api-extractor run --local",
		"generate:client": "node ../../scripts/generate-clients/single-service",
		"test": "yarn g:vitest run --passWithNoTests",
		"test:watch": "yarn g:vitest watch --passWithNoTests",
		"test:integration": "yarn g:vitest run --passWithNoTests -c vitest.config.integ.mts",
		"test:integration:watch": "yarn g:vitest watch --passWithNoTests -c vitest.config.integ.mts",
		"test:e2e": "yarn g:vitest run -c vitest.config.e2e.mts",
		"test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.mts",
		"test:index": "tsc --noEmit ./test/index-types.ts && node ./test/index-objects.spec.mjs"
	},
	main: "./dist-cjs/index.js",
	types: "./dist-types/index.d.ts",
	module: "./dist-es/index.js",
	sideEffects: false,
	dependencies: {
		"@aws-crypto/sha256-browser": "5.2.0",
		"@aws-crypto/sha256-js": "5.2.0",
		"@aws-sdk/core": "^3.974.21",
		"@aws-sdk/credential-provider-node": "^3.972.56",
		"@aws-sdk/dynamodb-codec": "^3.973.21",
		"@aws-sdk/middleware-endpoint-discovery": "^3.972.19",
		"@aws-sdk/types": "^3.973.13",
		"@smithy/core": "^3.24.6",
		"@smithy/fetch-http-handler": "^5.4.6",
		"@smithy/node-http-handler": "^4.7.6",
		"@smithy/types": "^4.14.3",
		"tslib": "^2.6.2"
	},
	devDependencies: {
		"@smithy/snapshot-testing": "^2.1.7",
		"@tsconfig/node20": "20.1.8",
		"@types/node": "^20.14.8",
		"concurrently": "7.0.0",
		"downlevel-dts": "0.10.1",
		"premove": "4.0.0",
		"typescript": "~5.8.3",
		"vitest": "^4.0.17"
	},
	engines: { "node": ">=20.0.0" },
	typesVersions: { "<4.5": { "dist-types/*": ["dist-types/ts3.4/*"] } },
	files: ["dist-*/**"],
	author: {
		"name": "AWS SDK for JavaScript Team",
		"url": "https://aws.amazon.com/sdk-for-javascript/"
	},
	license: "Apache-2.0",
	browser: { "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser" },
	"react-native": { "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native" },
	homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-dynamodb",
	repository: {
		"type": "git",
		"url": "https://github.com/aws/aws-sdk-js-v3.git",
		"directory": "clients/client-dynamodb"
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+dynamodb-codec@3.973.21/node_modules/@aws-sdk/dynamodb-codec/dist-es/codec/DynamoDBJsonCodec.js
var import_serde = require_serde();
var DynamoDBJsonCodec = class extends import_protocols$1.JsonCodec {
	constructor() {
		super({
			timestampFormat: {
				useTrait: true,
				default: 7
			},
			jsonName: false
		});
	}
	createSerializer() {
		const serializer = new DynamoDBJsonShapeSerializer(this.settings);
		serializer.setSerdeContext(this.serdeContext);
		return serializer;
	}
	createDeserializer() {
		const deserializer = new DynamoDBJsonShapeDeserializer(this.settings);
		deserializer.setSerdeContext(this.serdeContext);
		return deserializer;
	}
};
var ATTRIBUTE_VALUE = "com.amazonaws.dynamodb#AttributeValue";
var DynamoDBJsonShapeSerializer = class extends import_protocols$1.JsonShapeSerializer {
	_write(schema, value, container) {
		const ns = import_schema.NormalizedSchema.of(schema);
		if (ns.isStructSchema() && ns.getName(true) === ATTRIBUTE_VALUE) {
			if (value && typeof value === "object") {
				const av = value;
				const out = this.copyRemoveNulls(av);
				const base64Encode = this.serdeContext?.base64Encoder ?? import_serde.toBase64;
				if (av.B instanceof Uint8Array) out.B = base64Encode(av.B);
				if (Array.isArray(av.BS)) out.BS = av.BS.map(base64Encode);
				if (Array.isArray(av.L)) {
					const list = [];
					for (const v of av.L) if (v != null) list.push(this._write(ns, v, container));
					out.L = list;
				}
				if (av.M && typeof av.M === "object") {
					out.M = {};
					for (const [k, v] of Object.entries(av.M)) if (v != null) out.M[k] = this._write(ns, v, container);
				}
				return out;
			}
		}
		return super._write(ns, value, container);
	}
	copyRemoveNulls(v) {
		if (typeof v !== "object") return v;
		if (v === null) return {};
		if (Array.isArray(v)) {
			const out = [];
			for (const item of v) if (item != null) out.push(this.copyRemoveNulls(item));
			return out;
		}
		const out = {};
		for (const [k, _v] of Object.entries(v)) if (_v != null) {
			if ([
				"B",
				"BS",
				"L",
				"M"
			].includes(k)) continue;
			out[k] = this.copyRemoveNulls(_v);
		}
		return out;
	}
};
var DynamoDBJsonShapeDeserializer = class extends import_protocols$1.JsonShapeDeserializer {
	_read(schema, value) {
		const ns = import_schema.NormalizedSchema.of(schema);
		if (ns.isStructSchema() && ns.getName(true) === ATTRIBUTE_VALUE) {
			if (value && typeof value === "object") {
				const av = value;
				const out = av;
				const base64Decoder = this.serdeContext?.base64Decoder ?? import_serde.fromBase64;
				if (typeof av.B === "string") out.B = base64Decoder(av.B);
				if (Array.isArray(av.BS)) out.BS = av.BS.map(base64Decoder);
				if (Array.isArray(av.L)) out.L = av.L.map((v) => this._read(ns, v));
				if (av.M && typeof av.M === "object") for (const [k, v] of Object.entries(av.M)) out.M[k] = this._read(ns, v);
				return out;
			}
		}
		return super._read(ns, value);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/endpoint/bdd.js
init_dist_es$2();
var I = "ref", J = "argv";
var a = -1, b = true, c = false, d = "isSet", e = "booleanEquals", f = "PartitionResult", g = "stringEquals", h = "getAttr", i = "https://dynamodb.{Region}.{PartitionResult#dualStackDnsSuffix}", j = "aws.parseArn", k = (n) => "ParsedArn_ssa_" + n, l = "service", m = "dynamodb", n = "isValidHostLabel", o = "accountId", p = "FirstArn", q = (n) => "https://{ParsedArn_ssa_" + n + "#accountId}.ddb.{Region}.{PartitionResult#dualStackDnsSuffix}", s = (n) => "https://{ParsedArn_ssa_" + n + "#accountId}.ddb.{Region}.{PartitionResult#dnsSuffix}", t = { [I]: "Endpoint" }, u = { [I]: "Region" }, v = { [I]: f }, w = { [I]: "AccountIdEndpointMode" }, x = {
	"fn": h,
	[J]: [v, "name"]
}, y = {
	"fn": h,
	[J]: [{ [I]: "ParsedArn_ssa_2" }, "region"]
}, z = { [I]: "ParsedArn_ssa_2" }, A = { [I]: "ResourceArnList" }, B = {
	"fn": h,
	[J]: [{ [I]: "ParsedArn_ssa_1" }, "region"]
}, C = { [I]: "ParsedArn_ssa_1" }, D = { [I]: "AccountId" }, E = {}, F = { "metricValues": ["O"] }, G = [u], H = [{ [I]: "ResourceArn" }];
var _data = {
	conditions: [
		[d, G],
		[d, [t]],
		[e, [{ [I]: "UseFIPS" }, b]],
		[
			"aws.partition",
			G,
			f
		],
		[g, [u, "local"]],
		[e, [{
			fn: h,
			[J]: [v, "supportsFIPS"]
		}, b]],
		[e, [{ [I]: "UseDualStack" }, b]],
		[e, [{
			fn: h,
			[J]: [v, "supportsDualStack"]
		}, b]],
		[g, [i, t]],
		[d, [w]],
		[g, [x, "aws"]],
		[g, [w, "disabled"]],
		[d, H],
		[
			j,
			H,
			k(2)
		],
		[g, [y, u]],
		[g, [{
			fn: h,
			[J]: [z, l]
		}, m]],
		[n, [{
			fn: h,
			[J]: [z, o]
		}, c]],
		[n, [y, c]],
		[d, [A]],
		[
			h,
			[A, "[0]"],
			p
		],
		[
			j,
			[{ [I]: p }],
			k(1)
		],
		[g, [B, u]],
		[g, [{
			fn: h,
			[J]: [C, l]
		}, m]],
		[n, [{
			fn: h,
			[J]: [C, o]
		}, c]],
		[n, [B, c]],
		[d, [D]],
		[g, [w, "required"]],
		[n, [D, c]],
		[g, [x, "aws-us-gov"]]
	],
	results: [
		[a],
		[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
		[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
		[a, "Endpoint override is not supported for dual-stack endpoints. Please enable dual-stack functionality by enabling the configuration. For more details, see: https://docs.aws.amazon.com/sdkref/latest/guide/feature-endpoints.html"],
		["{Endpoint}", E],
		[a, "Invalid Configuration: FIPS and local endpoint are not supported"],
		[a, "Invalid Configuration: Dualstack and local endpoint are not supported"],
		["http://localhost:8000", { authSchemes: [{
			name: "sigv4",
			signingName: m,
			signingRegion: "us-east-1"
		}] }],
		[a, "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported"],
		["https://dynamodb-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", E],
		[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
		["https://dynamodb.{Region}.{PartitionResult#dnsSuffix}", E],
		["https://dynamodb-fips.{Region}.{PartitionResult#dnsSuffix}", E],
		[a, "FIPS is enabled but this partition does not support FIPS"],
		[q(2), F],
		[q(1), F],
		["https://{AccountId}.ddb.{Region}.{PartitionResult#dualStackDnsSuffix}", F],
		[a, "Credentials-sourced account ID parameter is invalid"],
		[a, "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded"],
		[a, "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition"],
		[i, E],
		[a, "DualStack is enabled but this partition does not support DualStack"],
		[s(2), F],
		[s(1), F],
		["https://{AccountId}.ddb.{Region}.{PartitionResult#dnsSuffix}", F],
		[a, "Invalid Configuration: Missing Region"]
	]
};
var root = 2;
var nodes = new Int32Array([
	-1,
	1,
	-1,
	0,
	5,
	3,
	1,
	4,
	100000025,
	2,
	100000001,
	65,
	1,
	63,
	6,
	2,
	52,
	7,
	3,
	8,
	100000025,
	4,
	51,
	9,
	6,
	30,
	10,
	9,
	11,
	100000011,
	10,
	13,
	12,
	26,
	100000019,
	100000011,
	11,
	29,
	14,
	12,
	15,
	20,
	13,
	16,
	20,
	14,
	17,
	20,
	15,
	18,
	20,
	16,
	19,
	20,
	17,
	100000022,
	20,
	18,
	21,
	27,
	19,
	22,
	27,
	20,
	23,
	27,
	21,
	24,
	27,
	22,
	25,
	27,
	23,
	26,
	27,
	24,
	100000023,
	27,
	25,
	28,
	29,
	27,
	100000024,
	100000017,
	26,
	100000018,
	100000011,
	7,
	31,
	100000021,
	9,
	32,
	100000020,
	10,
	34,
	33,
	26,
	100000019,
	100000020,
	11,
	50,
	35,
	12,
	36,
	41,
	13,
	37,
	41,
	14,
	38,
	41,
	15,
	39,
	41,
	16,
	40,
	41,
	17,
	100000014,
	41,
	18,
	42,
	48,
	19,
	43,
	48,
	20,
	44,
	48,
	21,
	45,
	48,
	22,
	46,
	48,
	23,
	47,
	48,
	24,
	100000015,
	48,
	25,
	49,
	50,
	27,
	100000016,
	100000017,
	26,
	100000018,
	100000020,
	6,
	100000006,
	100000007,
	3,
	53,
	100000025,
	4,
	100000005,
	54,
	5,
	56,
	55,
	6,
	100000010,
	100000013,
	6,
	60,
	57,
	9,
	58,
	59,
	26,
	100000008,
	59,
	28,
	100000011,
	100000012,
	7,
	61,
	100000010,
	9,
	62,
	100000009,
	26,
	100000008,
	100000009,
	2,
	100000001,
	64,
	3,
	66,
	65,
	6,
	100000002,
	100000004,
	6,
	100000002,
	67,
	8,
	100000003,
	100000004
]);
var bdd = import_endpoints.BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/endpoint/endpointResolver.js
var cache = new import_endpoints.EndpointCache({
	size: 50,
	params: [
		"AccountId",
		"AccountIdEndpointMode",
		"Endpoint",
		"Region",
		"ResourceArn",
		"ResourceArnList",
		"UseDualStack",
		"UseFIPS"
	]
});
var defaultEndpointResolver = (endpointParams, context = {}) => {
	return cache.get(endpointParams, () => (0, import_endpoints.decideEndpoint)(bdd, {
		endpointParams,
		logger: context.logger
	}));
};
import_endpoints.customEndpointFunctions.aws = import_client$2.awsEndpointFunctions;
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/runtimeConfig.shared.js
var import_protocols = require_protocols$1();
var getRuntimeConfig$1 = (config) => {
	return {
		apiVersion: "2012-08-10",
		base64Decoder: config?.base64Decoder ?? import_serde.fromBase64,
		base64Encoder: config?.base64Encoder ?? import_serde.toBase64,
		disableHostPrefix: config?.disableHostPrefix ?? false,
		endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
		extensions: config?.extensions ?? [],
		httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultDynamoDBHttpAuthSchemeProvider,
		httpAuthSchemes: config?.httpAuthSchemes ?? [{
			schemeId: "aws.auth#sigv4",
			identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
			signer: new import_httpAuthSchemes.AwsSdkSigV4Signer()
		}],
		logger: config?.logger ?? new import_client.NoOpLogger(),
		protocol: config?.protocol ?? import_protocols$1.AwsJson1_0Protocol,
		protocolSettings: config?.protocolSettings ?? {
			defaultNamespace: "com.amazonaws.dynamodb",
			errorTypeRegistries,
			xmlNamespace: "http://dynamodb.amazonaws.com/doc/2012-08-10/",
			version: "2012-08-10",
			serviceTarget: "DynamoDB_20120810",
			jsonCodec: new DynamoDBJsonCodec()
		},
		serviceId: config?.serviceId ?? "DynamoDB",
		urlParser: config?.urlParser ?? import_protocols.parseUrl,
		utf8Decoder: config?.utf8Decoder ?? import_serde.fromUtf8,
		utf8Encoder: config?.utf8Encoder ?? import_serde.toUtf8
	};
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/runtimeConfig.js
var getRuntimeConfig = (config) => {
	(0, import_client.emitWarningIfUnsupportedVersion)(process.version);
	const defaultsMode = (0, import_config.resolveDefaultsModeConfig)(config);
	const defaultConfigProvider = () => defaultsMode().then(import_client.loadConfigsForDefaultMode);
	const clientSharedValues = getRuntimeConfig$1(config);
	(0, import_client$2.emitWarningIfUnsupportedVersion)(process.version);
	const loaderConfig = {
		profile: config?.profile,
		logger: clientSharedValues.logger
	};
	return {
		...clientSharedValues,
		...config,
		runtime: "node",
		defaultsMode,
		accountIdEndpointMode: config?.accountIdEndpointMode ?? (0, import_config.loadConfig)(import_account_id_endpoint.NODE_ACCOUNT_ID_ENDPOINT_MODE_CONFIG_OPTIONS, loaderConfig),
		authSchemePreference: config?.authSchemePreference ?? (0, import_config.loadConfig)(import_httpAuthSchemes.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
		bodyLengthChecker: config?.bodyLengthChecker ?? import_serde.calculateBodyLength,
		credentialDefaultProvider: config?.credentialDefaultProvider ?? defaultProvider,
		defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, import_client$2.createDefaultUserAgentProvider)({
			serviceId: clientSharedValues.serviceId,
			clientVersion: package_default.version
		}),
		endpointDiscoveryEnabledProvider: config?.endpointDiscoveryEnabledProvider ?? (0, import_config.loadConfig)(NODE_ENDPOINT_DISCOVERY_CONFIG_OPTIONS, loaderConfig),
		maxAttempts: config?.maxAttempts ?? (0, import_config.loadConfig)(import_retry.Retry.v2026 ? {
			...import_retry.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
			default: 4
		} : import_retry.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
		region: config?.region ?? (0, import_config.loadConfig)(import_config.NODE_REGION_CONFIG_OPTIONS, {
			...import_config.NODE_REGION_CONFIG_FILE_OPTIONS,
			...loaderConfig
		}),
		requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
		retryMode: config?.retryMode ?? (0, import_config.loadConfig)({
			...import_retry.NODE_RETRY_MODE_CONFIG_OPTIONS,
			default: async () => (await defaultConfigProvider()).retryMode || import_retry.DEFAULT_RETRY_MODE
		}, config),
		sha256: config?.sha256 ?? import_serde.Hash.bind(null, "sha256"),
		streamCollector: config?.streamCollector ?? streamCollector,
		useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, import_config.loadConfig)(import_config.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		useFipsEndpoint: config?.useFipsEndpoint ?? (0, import_config.loadConfig)(import_config.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		userAgentAppId: config?.userAgentAppId ?? (0, import_config.loadConfig)(import_client$2.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
	};
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/auth/httpAuthExtensionConfiguration.js
var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
	const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
	let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
	let _credentials = runtimeConfig.credentials;
	return {
		setHttpAuthScheme(httpAuthScheme) {
			const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
			if (index === -1) _httpAuthSchemes.push(httpAuthScheme);
			else _httpAuthSchemes.splice(index, 1, httpAuthScheme);
		},
		httpAuthSchemes() {
			return _httpAuthSchemes;
		},
		setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
			_httpAuthSchemeProvider = httpAuthSchemeProvider;
		},
		httpAuthSchemeProvider() {
			return _httpAuthSchemeProvider;
		},
		setCredentials(credentials) {
			_credentials = credentials;
		},
		credentials() {
			return _credentials;
		}
	};
};
var resolveHttpAuthRuntimeConfig = (config) => {
	return {
		httpAuthSchemes: config.httpAuthSchemes(),
		httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
		credentials: config.credentials()
	};
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/runtimeExtensions.js
var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
	const extensionConfiguration = Object.assign((0, import_client$2.getAwsRegionExtensionConfiguration)(runtimeConfig), (0, import_client.getDefaultExtensionConfiguration)(runtimeConfig), (0, import_protocols.getHttpHandlerExtensionConfiguration)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
	extensions.forEach((extension) => extension.configure(extensionConfiguration));
	return Object.assign(runtimeConfig, (0, import_client$2.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, import_client.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, import_protocols.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/DynamoDBClient.js
var DynamoDBClient = class extends import_client.Client {
	config;
	constructor(...[configuration]) {
		const _config_0 = getRuntimeConfig(configuration || {});
		super(_config_0);
		this.initConfig = _config_0;
		const _config_10 = resolveRuntimeExtensions(resolveEndpointDiscoveryConfig(resolveHttpAuthSchemeConfig((0, import_endpoints.resolveEndpointConfig)((0, import_client$2.resolveHostHeaderConfig)((0, import_config.resolveRegionConfig)((0, import_retry.resolveRetryConfig)((0, import_client$2.resolveUserAgentConfig)((0, import_account_id_endpoint.resolveAccountIdEndpointModeConfig)(resolveClientEndpointParameters(_config_0))), {
			defaultBaseDelay: import_retry.Retry.v2026 ? 25 : void 0,
			defaultMaxAttempts: import_retry.Retry.v2026 ? 4 : void 0
		}))))), { endpointDiscoveryCommandCtor: DescribeEndpointsCommand }), configuration?.extensions || []);
		this.config = _config_10;
		this.middlewareStack.use((0, import_schema.getSchemaSerdePlugin)(this.config));
		this.middlewareStack.use((0, import_client$2.getUserAgentPlugin)(this.config));
		this.middlewareStack.use((0, import_retry.getRetryPlugin)(this.config));
		this.middlewareStack.use((0, import_protocols.getContentLengthPlugin)(this.config));
		this.middlewareStack.use((0, import_client$2.getHostHeaderPlugin)(this.config));
		this.middlewareStack.use((0, import_client$2.getLoggerPlugin)(this.config));
		this.middlewareStack.use((0, import_client$2.getRecursionDetectionPlugin)(this.config));
		this.middlewareStack.use((0, import_dist_cjs.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
			httpAuthSchemeParametersProvider: defaultDynamoDBHttpAuthSchemeParametersProvider,
			identityProviderConfigProvider: async (config) => new import_dist_cjs.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
		}));
		this.middlewareStack.use((0, import_dist_cjs.getHttpSigningPlugin)(this.config));
	}
	destroy() {
		super.destroy();
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DeleteItemCommand.js
var DeleteItemCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	ResourceArn: {
		type: "contextParams",
		name: "TableName"
	}
}).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
}).s("DynamoDB_20120810", "DeleteItem", {}).n("DynamoDBClient", "DeleteItemCommand").sc(DeleteItem$).build() {};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/commands/PutItemCommand.js
var PutItemCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	ResourceArn: {
		type: "contextParams",
		name: "TableName"
	}
}).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
}).s("DynamoDB_20120810", "PutItem", {}).n("DynamoDBClient", "PutItemCommand").sc(PutItem$).build() {};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/commands/QueryCommand.js
var QueryCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	ResourceArn: {
		type: "contextParams",
		name: "TableName"
	}
}).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
}).s("DynamoDB_20120810", "Query", {}).n("DynamoDBClient", "QueryCommand").sc(Query$).build() {};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-dynamodb@3.1070.0/node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ScanCommand.js
var ScanCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	ResourceArn: {
		type: "contextParams",
		name: "TableName"
	}
}).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
}).s("DynamoDB_20120810", "Scan", {}).n("DynamoDBClient", "ScanCommand").sc(Scan$).build() {};
//#endregion
export { streamCollector as _, DynamoDBClient as a, dist_es_exports$3 as b, require_httpAuthSchemes as c, signatureV4aContainer as d, SignatureV4 as f, init_stream_collector as g, init_dist_es$2 as h, DeleteItemCommand as i, init_dist_es$1 as l, dist_es_exports$2 as m, QueryCommand as n, defaultProvider as o, init_SignatureV4 as p, PutItemCommand as r, require_protocols as s, ScanCommand as t, init_signature_v4a_container as u, NodeHttpHandler as v, init_node_http_handler as y };
