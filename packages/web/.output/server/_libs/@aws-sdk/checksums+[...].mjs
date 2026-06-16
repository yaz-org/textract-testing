import { a as __toCommonJS, i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { a as init_module$1, l as numToUint8, n as module_exports, r as AwsCrc32, t as init_module } from "../@aws-crypto/crc32+[...].mjs";
import { t as AwsCrc32c } from "../aws-crypto__crc32c.mjs";
import * as zlib from "node:zlib";
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/abort.js
var init_abort = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/auth.js
var HttpAuthLocation;
var init_auth$1 = __esmMin((() => {
	(function(HttpAuthLocation) {
		HttpAuthLocation["HEADER"] = "header";
		HttpAuthLocation["QUERY"] = "query";
	})(HttpAuthLocation || (HttpAuthLocation = {}));
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js
var HttpApiKeyAuthLocation;
var init_HttpApiKeyAuth = __esmMin((() => {
	(function(HttpApiKeyAuthLocation) {
		HttpApiKeyAuthLocation["HEADER"] = "header";
		HttpApiKeyAuthLocation["QUERY"] = "query";
	})(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/HttpAuthScheme.js
var init_HttpAuthScheme = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/HttpAuthSchemeProvider.js
var init_HttpAuthSchemeProvider = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/HttpSigner.js
var init_HttpSigner = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/IdentityProviderConfig.js
var init_IdentityProviderConfig = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/auth/index.js
var init_auth = __esmMin((() => {
	init_auth$1();
	init_HttpApiKeyAuth();
	init_HttpAuthScheme();
	init_HttpAuthSchemeProvider();
	init_HttpSigner();
	init_IdentityProviderConfig();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/blob/blob-payload-input-types.js
var init_blob_payload_input_types = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/checksum.js
var init_checksum$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/client.js
var init_client = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/command.js
var init_command = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/connection/config.js
var init_config = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/connection/manager.js
var init_manager = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/connection/pool.js
var init_pool = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/connection/index.js
var init_connection = __esmMin((() => {
	init_config();
	init_manager();
	init_pool();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/crypto.js
var init_crypto = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/encode.js
var init_encode = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoint.js
var EndpointURLScheme;
var init_endpoint = __esmMin((() => {
	(function(EndpointURLScheme) {
		EndpointURLScheme["HTTP"] = "http";
		EndpointURLScheme["HTTPS"] = "https";
	})(EndpointURLScheme || (EndpointURLScheme = {}));
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoints/EndpointRuleObject.js
var init_EndpointRuleObject = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoints/ErrorRuleObject.js
var init_ErrorRuleObject = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoints/RuleSetObject.js
var init_RuleSetObject = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoints/shared.js
var init_shared = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoints/TreeRuleObject.js
var init_TreeRuleObject = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/endpoints/index.js
var init_endpoints = __esmMin((() => {
	init_EndpointRuleObject();
	init_ErrorRuleObject();
	init_RuleSetObject();
	init_shared();
	init_TreeRuleObject();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/eventStream.js
var init_eventStream = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/extensions/checksum.js
var AlgorithmId, getChecksumConfiguration, resolveChecksumRuntimeConfig;
var init_checksum = __esmMin((() => {
	(function(AlgorithmId) {
		AlgorithmId["MD5"] = "md5";
		AlgorithmId["CRC32"] = "crc32";
		AlgorithmId["CRC32C"] = "crc32c";
		AlgorithmId["SHA1"] = "sha1";
		AlgorithmId["SHA256"] = "sha256";
	})(AlgorithmId || (AlgorithmId = {}));
	getChecksumConfiguration = (runtimeConfig) => {
		const checksumAlgorithms = [];
		if (runtimeConfig.sha256 !== void 0) checksumAlgorithms.push({
			algorithmId: () => AlgorithmId.SHA256,
			checksumConstructor: () => runtimeConfig.sha256
		});
		if (runtimeConfig.md5 != void 0) checksumAlgorithms.push({
			algorithmId: () => AlgorithmId.MD5,
			checksumConstructor: () => runtimeConfig.md5
		});
		return {
			addChecksumAlgorithm(algo) {
				checksumAlgorithms.push(algo);
			},
			checksumAlgorithms() {
				return checksumAlgorithms;
			}
		};
	};
	resolveChecksumRuntimeConfig = (clientConfig) => {
		const runtimeConfig = {};
		clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
			runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
		});
		return runtimeConfig;
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/extensions/defaultClientConfiguration.js
var getDefaultClientConfiguration, resolveDefaultRuntimeConfig;
var init_defaultClientConfiguration = __esmMin((() => {
	init_checksum();
	getDefaultClientConfiguration = (runtimeConfig) => {
		return getChecksumConfiguration(runtimeConfig);
	};
	resolveDefaultRuntimeConfig = (config) => {
		return resolveChecksumRuntimeConfig(config);
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/extensions/defaultExtensionConfiguration.js
var init_defaultExtensionConfiguration = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/extensions/index.js
var init_extensions = __esmMin((() => {
	init_defaultClientConfiguration();
	init_defaultExtensionConfiguration();
	init_checksum();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/feature-ids.js
var init_feature_ids = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/http.js
var FieldPosition;
var init_http = __esmMin((() => {
	(function(FieldPosition) {
		FieldPosition[FieldPosition["HEADER"] = 0] = "HEADER";
		FieldPosition[FieldPosition["TRAILER"] = 1] = "TRAILER";
	})(FieldPosition || (FieldPosition = {}));
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/http/httpHandlerInitialization.js
var init_httpHandlerInitialization = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/identity/apiKeyIdentity.js
var init_apiKeyIdentity = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/identity/awsCredentialIdentity.js
var init_awsCredentialIdentity = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/identity/identity.js
var init_identity$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/identity/tokenIdentity.js
var init_tokenIdentity = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/identity/index.js
var init_identity = __esmMin((() => {
	init_apiKeyIdentity();
	init_awsCredentialIdentity();
	init_identity$1();
	init_tokenIdentity();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/logger.js
var init_logger = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/middleware.js
var SMITHY_CONTEXT_KEY;
var init_middleware = __esmMin((() => {
	SMITHY_CONTEXT_KEY = "__smithy_context";
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/pagination.js
var init_pagination = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/profile.js
var IniSectionType;
var init_profile = __esmMin((() => {
	(function(IniSectionType) {
		IniSectionType["PROFILE"] = "profile";
		IniSectionType["SSO_SESSION"] = "sso-session";
		IniSectionType["SERVICES"] = "services";
	})(IniSectionType || (IniSectionType = {}));
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/response.js
var init_response = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/retry.js
var init_retry = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/schema/schema.js
var init_schema = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/schema/traits.js
var init_traits = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/schema/schema-deprecated.js
var init_schema_deprecated = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/schema/sentinels.js
var init_sentinels = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/schema/static-schemas.js
var init_static_schemas = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/serde.js
var init_serde = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/shapes.js
var init_shapes = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/signature.js
var init_signature = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/stream.js
var init_stream = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-common-types.js
var init_streaming_blob_common_types = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-input-types.js
var init_streaming_blob_payload_input_types = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-output-types.js
var init_streaming_blob_payload_output_types = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/transfer.js
var RequestHandlerProtocol;
var init_transfer = __esmMin((() => {
	(function(RequestHandlerProtocol) {
		RequestHandlerProtocol["HTTP_0_9"] = "http/0.9";
		RequestHandlerProtocol["HTTP_1_0"] = "http/1.0";
		RequestHandlerProtocol["TDS_8_0"] = "tds/8.0";
	})(RequestHandlerProtocol || (RequestHandlerProtocol = {}));
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/transform/client-payload-blob-type-narrow.js
var init_client_payload_blob_type_narrow = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/transform/mutable.js
var init_mutable = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/transform/no-undefined.js
var init_no_undefined = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/transform/type-transform.js
var init_type_transform = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/uri.js
var init_uri = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/util.js
var init_util = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/waiter.js
var init_waiter = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@smithy+types@4.15.0/node_modules/@smithy/types/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({
	AlgorithmId: () => AlgorithmId,
	EndpointURLScheme: () => EndpointURLScheme,
	FieldPosition: () => FieldPosition,
	HttpApiKeyAuthLocation: () => HttpApiKeyAuthLocation,
	HttpAuthLocation: () => HttpAuthLocation,
	IniSectionType: () => IniSectionType,
	RequestHandlerProtocol: () => RequestHandlerProtocol,
	SMITHY_CONTEXT_KEY: () => SMITHY_CONTEXT_KEY,
	getDefaultClientConfiguration: () => getDefaultClientConfiguration,
	resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig
});
var init_dist_es = __esmMin((() => {
	init_abort();
	init_auth();
	init_blob_payload_input_types();
	init_checksum$1();
	init_client();
	init_command();
	init_connection();
	init_crypto();
	init_encode();
	init_endpoint();
	init_endpoints();
	init_eventStream();
	init_extensions();
	init_feature_ids();
	init_http();
	init_httpHandlerInitialization();
	init_identity();
	init_logger();
	init_middleware();
	init_pagination();
	init_profile();
	init_response();
	init_retry();
	init_schema();
	init_traits();
	init_schema_deprecated();
	init_sentinels();
	init_static_schemas();
	init_serde();
	init_shapes();
	init_signature();
	init_stream();
	init_streaming_blob_common_types();
	init_streaming_blob_payload_input_types();
	init_streaming_blob_payload_output_types();
	init_transfer();
	init_client_payload_blob_type_narrow();
	init_mutable();
	init_no_undefined();
	init_type_transform();
	init_uri();
	init_util();
	init_waiter();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/transport/index.js
var require_transport = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { SMITHY_CONTEXT_KEY } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var getSmithyContext = (context) => context[SMITHY_CONTEXT_KEY] || (context[SMITHY_CONTEXT_KEY] = {});
	var HttpRequest = class HttpRequest {
		method;
		protocol;
		hostname;
		port;
		path;
		query;
		headers;
		username;
		password;
		fragment;
		body;
		constructor(options) {
			this.method = options.method || "GET";
			this.hostname = options.hostname || "localhost";
			this.port = options.port;
			this.query = options.query || {};
			this.headers = options.headers || {};
			this.body = options.body;
			this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
			this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
			this.username = options.username;
			this.password = options.password;
			this.fragment = options.fragment;
		}
		static clone(request) {
			const cloned = new HttpRequest({
				...request,
				headers: { ...request.headers }
			});
			if (cloned.query) cloned.query = cloneQuery(cloned.query);
			return cloned;
		}
		static isInstance(request) {
			if (!request) return false;
			const req = request;
			return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
		}
		clone() {
			return HttpRequest.clone(this);
		}
	};
	function cloneQuery(query) {
		return Object.keys(query).reduce((carry, paramName) => {
			const param = query[paramName];
			return {
				...carry,
				[paramName]: Array.isArray(param) ? [...param] : param
			};
		}, {});
	}
	var HttpResponse = class {
		statusCode;
		reason;
		headers;
		body;
		constructor(options) {
			this.statusCode = options.statusCode;
			this.reason = options.reason;
			this.headers = options.headers || {};
			this.body = options.body;
		}
		static isInstance(response) {
			if (!response) return false;
			const resp = response;
			return typeof resp.statusCode === "number" && typeof resp.headers === "object";
		}
	};
	var VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
	var isValidHostLabel = (value, allowSubDomains = false) => {
		if (!allowSubDomains) return VALID_HOST_LABEL_REGEX.test(value);
		const labels = value.split(".");
		for (const label of labels) if (!isValidHostLabel(label)) return false;
		return true;
	};
	function isValidHostname(hostname) {
		return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(hostname);
	}
	var normalizeProvider = (input) => {
		if (typeof input === "function") return input;
		const promisified = Promise.resolve(input);
		return () => promisified;
	};
	function parseQueryString(querystring) {
		const query = {};
		querystring = querystring.replace(/^\?/, "");
		if (querystring) for (const pair of querystring.split("&")) {
			let [key, value = null] = pair.split("=");
			key = decodeURIComponent(key);
			if (value) value = decodeURIComponent(value);
			if (!(key in query)) query[key] = value;
			else if (Array.isArray(query[key])) query[key].push(value);
			else query[key] = [query[key], value];
		}
		return query;
	}
	var parseUrl = (url) => {
		if (typeof url === "string") return parseUrl(new URL(url));
		const { hostname, pathname, port, protocol, search } = url;
		let query;
		if (search) query = parseQueryString(search);
		return {
			hostname,
			port: port ? parseInt(port) : void 0,
			protocol,
			path: pathname,
			query
		};
	};
	var toEndpointV1 = (endpoint) => {
		if (typeof endpoint === "object") {
			if ("url" in endpoint) {
				const v1Endpoint = parseUrl(endpoint.url);
				if (endpoint.headers) {
					v1Endpoint.headers = {};
					for (const name in endpoint.headers) v1Endpoint.headers[name.toLowerCase()] = endpoint.headers[name].join(", ");
				}
				return v1Endpoint;
			}
			return endpoint;
		}
		return parseUrl(endpoint);
	};
	exports.HttpRequest = HttpRequest;
	exports.HttpResponse = HttpResponse;
	exports.getSmithyContext = getSmithyContext;
	exports.isValidHostLabel = isValidHostLabel;
	exports.isValidHostname = isValidHostname;
	exports.normalizeProvider = normalizeProvider;
	exports.parseQueryString = parseQueryString;
	exports.parseUrl = parseUrl;
	exports.toEndpointV1 = toEndpointV1;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/schema/index.js
var require_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { getSmithyContext, HttpResponse, toEndpointV1 } = require_transport();
	var deref = (schemaRef) => {
		if (typeof schemaRef === "function") return schemaRef();
		return schemaRef;
	};
	var operation = (namespace, name, traits, input, output) => ({
		name,
		namespace,
		traits,
		input,
		output
	});
	var schemaDeserializationMiddleware = (config) => (next, context) => async (args) => {
		const { response } = await next(args);
		const { operationSchema } = getSmithyContext(context);
		const [, ns, n, t, i, o] = operationSchema ?? [];
		try {
			return {
				response,
				output: await config.protocol.deserializeResponse(operation(ns, n, t, i, o), {
					...config,
					...context
				}, response)
			};
		} catch (error) {
			Object.defineProperty(error, "$response", {
				value: response,
				enumerable: false,
				writable: false,
				configurable: false
			});
			if (!("$metadata" in error)) {
				const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
				try {
					error.message += "\n  " + hint;
				} catch (e) {
					if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") console.warn(hint);
					else context.logger?.warn?.(hint);
				}
				if (typeof error.$responseBodyText !== "undefined") {
					if (error.$response) error.$response.body = error.$responseBodyText;
				}
				try {
					if (HttpResponse.isInstance(response)) {
						const { headers = {}, statusCode } = response;
						const headerEntries = Object.entries(headers);
						error.$metadata = {
							httpStatusCode: statusCode,
							requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
							extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
							cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
						};
					}
				} catch (e) {}
			}
			throw error;
		}
	};
	var findHeader = (pattern, headers) => {
		return (headers.find(([k]) => {
			return k.match(pattern);
		}) || [void 0, void 0])[1];
	};
	var schemaSerializationMiddleware = (config) => (next, context) => async (args) => {
		const { operationSchema } = getSmithyContext(context);
		const [, ns, n, t, i, o] = operationSchema ?? [];
		const endpoint = context.endpointV2 ? async () => toEndpointV1(context.endpointV2) : config.endpoint;
		const request = await config.protocol.serializeRequest(operation(ns, n, t, i, o), args.input, {
			...config,
			...context,
			endpoint
		});
		return next({
			...args,
			request
		});
	};
	var deserializerMiddlewareOption = {
		name: "deserializerMiddleware",
		step: "deserialize",
		tags: ["DESERIALIZER"],
		override: true
	};
	var serializerMiddlewareOption = {
		name: "serializerMiddleware",
		step: "serialize",
		tags: ["SERIALIZER"],
		override: true
	};
	function getSchemaSerdePlugin(config) {
		return { applyToStack: (commandStack) => {
			commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
			commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
			config.protocol.setSerdeContext(config);
		} };
	}
	var Schema = class {
		name;
		namespace;
		traits;
		static assign(instance, values) {
			return Object.assign(instance, values);
		}
		static [Symbol.hasInstance](lhs) {
			const isPrototype = this.prototype.isPrototypeOf(lhs);
			if (!isPrototype && typeof lhs === "object" && lhs !== null) return lhs.symbol === this.symbol;
			return isPrototype;
		}
		getName() {
			return this.namespace + "#" + this.name;
		}
	};
	var ListSchema = class ListSchema extends Schema {
		static symbol = Symbol.for("@smithy/lis");
		name;
		traits;
		valueSchema;
		symbol = ListSchema.symbol;
	};
	var list = (namespace, name, traits, valueSchema) => Schema.assign(new ListSchema(), {
		name,
		namespace,
		traits,
		valueSchema
	});
	var MapSchema = class MapSchema extends Schema {
		static symbol = Symbol.for("@smithy/map");
		name;
		traits;
		keySchema;
		valueSchema;
		symbol = MapSchema.symbol;
	};
	var map = (namespace, name, traits, keySchema, valueSchema) => Schema.assign(new MapSchema(), {
		name,
		namespace,
		traits,
		keySchema,
		valueSchema
	});
	var OperationSchema = class OperationSchema extends Schema {
		static symbol = Symbol.for("@smithy/ope");
		name;
		traits;
		input;
		output;
		symbol = OperationSchema.symbol;
	};
	var op = (namespace, name, traits, input, output) => Schema.assign(new OperationSchema(), {
		name,
		namespace,
		traits,
		input,
		output
	});
	var StructureSchema = class StructureSchema extends Schema {
		static symbol = Symbol.for("@smithy/str");
		name;
		traits;
		memberNames;
		memberList;
		symbol = StructureSchema.symbol;
	};
	var struct = (namespace, name, traits, memberNames, memberList) => Schema.assign(new StructureSchema(), {
		name,
		namespace,
		traits,
		memberNames,
		memberList
	});
	var ErrorSchema = class ErrorSchema extends StructureSchema {
		static symbol = Symbol.for("@smithy/err");
		ctor;
		symbol = ErrorSchema.symbol;
	};
	var error = (namespace, name, traits, memberNames, memberList, ctor) => Schema.assign(new ErrorSchema(), {
		name,
		namespace,
		traits,
		memberNames,
		memberList,
		ctor: null
	});
	var traitsCache = [];
	function translateTraits(indicator) {
		if (typeof indicator === "object") return indicator;
		indicator = indicator | 0;
		if (traitsCache[indicator]) return traitsCache[indicator];
		const traits = {};
		let i = 0;
		for (const trait of [
			"httpLabel",
			"idempotent",
			"idempotencyToken",
			"sensitive",
			"httpPayload",
			"httpResponseCode",
			"httpQueryParams"
		]) if ((indicator >> i++ & 1) === 1) traits[trait] = 1;
		return traitsCache[indicator] = traits;
	}
	var anno = {
		it: Symbol.for("@smithy/nor-struct-it"),
		ns: Symbol.for("@smithy/ns")
	};
	var simpleSchemaCacheN = [];
	var simpleSchemaCacheS = {};
	var NormalizedSchema = class NormalizedSchema {
		ref;
		memberName;
		static symbol = Symbol.for("@smithy/nor");
		symbol = NormalizedSchema.symbol;
		name;
		schema;
		_isMemberSchema;
		traits;
		memberTraits;
		normalizedTraits;
		constructor(ref, memberName) {
			this.ref = ref;
			this.memberName = memberName;
			const traitStack = [];
			let _ref = ref;
			let schema = ref;
			this._isMemberSchema = false;
			while (isMemberSchema(_ref)) {
				traitStack.push(_ref[1]);
				_ref = _ref[0];
				schema = deref(_ref);
				this._isMemberSchema = true;
			}
			if (traitStack.length > 0) {
				this.memberTraits = {};
				for (let i = traitStack.length - 1; i >= 0; --i) {
					const traitSet = traitStack[i];
					Object.assign(this.memberTraits, translateTraits(traitSet));
				}
			} else this.memberTraits = 0;
			if (schema instanceof NormalizedSchema) {
				const computedMemberTraits = this.memberTraits;
				Object.assign(this, schema);
				this.memberTraits = Object.assign({}, computedMemberTraits, schema.getMemberTraits(), this.getMemberTraits());
				this.normalizedTraits = void 0;
				this.memberName = memberName ?? schema.memberName;
				return;
			}
			this.schema = deref(schema);
			if (isStaticSchema(this.schema)) {
				this.name = `${this.schema[1]}#${this.schema[2]}`;
				this.traits = this.schema[3];
			} else {
				this.name = this.memberName ?? String(schema);
				this.traits = 0;
			}
			if (this._isMemberSchema && !memberName) throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
		}
		static [Symbol.hasInstance](lhs) {
			const isPrototype = this.prototype.isPrototypeOf(lhs);
			if (!isPrototype && typeof lhs === "object" && lhs !== null) return lhs.symbol === this.symbol;
			return isPrototype;
		}
		static of(ref) {
			const keyAble = typeof ref === "function" || typeof ref === "object" && ref !== null;
			if (typeof ref === "number") {
				if (simpleSchemaCacheN[ref]) return simpleSchemaCacheN[ref];
			} else if (typeof ref === "string") {
				if (simpleSchemaCacheS[ref]) return simpleSchemaCacheS[ref];
			} else if (keyAble) {
				if (ref[anno.ns]) return ref[anno.ns];
			}
			const sc = deref(ref);
			if (sc instanceof NormalizedSchema) return sc;
			if (isMemberSchema(sc)) {
				const [ns, traits] = sc;
				if (ns instanceof NormalizedSchema) {
					Object.assign(ns.getMergedTraits(), translateTraits(traits));
					return ns;
				}
				throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(ref, null, 2)}.`);
			}
			const ns = new NormalizedSchema(sc);
			if (keyAble) return ref[anno.ns] = ns;
			if (typeof sc === "string") return simpleSchemaCacheS[sc] = ns;
			if (typeof sc === "number") return simpleSchemaCacheN[sc] = ns;
			return ns;
		}
		getSchema() {
			const sc = this.schema;
			if (Array.isArray(sc) && sc[0] === 0) return sc[4];
			return sc;
		}
		getName(withNamespace = false) {
			const { name } = this;
			return !withNamespace && name && name.includes("#") ? name.split("#")[1] : name || void 0;
		}
		getMemberName() {
			return this.memberName;
		}
		isMemberSchema() {
			return this._isMemberSchema;
		}
		isListSchema() {
			const sc = this.getSchema();
			return typeof sc === "number" ? sc >= 64 && sc < 128 : sc[0] === 1;
		}
		isMapSchema() {
			const sc = this.getSchema();
			return typeof sc === "number" ? sc >= 128 && sc <= 255 : sc[0] === 2;
		}
		isStructSchema() {
			const sc = this.getSchema();
			if (typeof sc !== "object") return false;
			const id = sc[0];
			return id === 3 || id === -3 || id === 4;
		}
		isUnionSchema() {
			const sc = this.getSchema();
			if (typeof sc !== "object") return false;
			return sc[0] === 4;
		}
		isBlobSchema() {
			const sc = this.getSchema();
			return sc === 21 || sc === 42;
		}
		isTimestampSchema() {
			const sc = this.getSchema();
			return typeof sc === "number" && sc >= 4 && sc <= 7;
		}
		isUnitSchema() {
			return this.getSchema() === "unit";
		}
		isDocumentSchema() {
			return this.getSchema() === 15;
		}
		isStringSchema() {
			return this.getSchema() === 0;
		}
		isBooleanSchema() {
			return this.getSchema() === 2;
		}
		isNumericSchema() {
			return this.getSchema() === 1;
		}
		isBigIntegerSchema() {
			return this.getSchema() === 17;
		}
		isBigDecimalSchema() {
			return this.getSchema() === 19;
		}
		isStreaming() {
			const { streaming } = this.getMergedTraits();
			return !!streaming || this.getSchema() === 42;
		}
		isIdempotencyToken() {
			return !!this.getMergedTraits().idempotencyToken;
		}
		getMergedTraits() {
			return this.normalizedTraits ?? (this.normalizedTraits = {
				...this.getOwnTraits(),
				...this.getMemberTraits()
			});
		}
		getMemberTraits() {
			return translateTraits(this.memberTraits);
		}
		getOwnTraits() {
			return translateTraits(this.traits);
		}
		getKeySchema() {
			const [isDoc, isMap] = [this.isDocumentSchema(), this.isMapSchema()];
			if (!isDoc && !isMap) throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
			const schema = this.getSchema();
			return member([isDoc ? 15 : schema[4] ?? 0, 0], "key");
		}
		getValueSchema() {
			const sc = this.getSchema();
			const [isDoc, isMap, isList] = [
				this.isDocumentSchema(),
				this.isMapSchema(),
				this.isListSchema()
			];
			const memberSchema = typeof sc === "number" ? 63 & sc : sc && typeof sc === "object" && (isMap || isList) ? sc[3 + sc[0]] : isDoc ? 15 : void 0;
			if (memberSchema != null) return member([memberSchema, 0], isMap ? "value" : "member");
			throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
		}
		getMemberSchema(memberName) {
			const struct = this.getSchema();
			if (this.isStructSchema() && struct[4].includes(memberName)) {
				const i = struct[4].indexOf(memberName);
				const memberSchema = struct[5][i];
				return member(isMemberSchema(memberSchema) ? memberSchema : [memberSchema, 0], memberName);
			}
			if (this.isDocumentSchema()) return member([15, 0], memberName);
			throw new Error(`@smithy/core/schema - ${this.getName(true)} has no member=${memberName}.`);
		}
		getMemberSchemas() {
			const buffer = {};
			try {
				for (const [k, v] of this.structIterator()) buffer[k] = v;
			} catch (ignored) {}
			return buffer;
		}
		getEventStreamMember() {
			if (this.isStructSchema()) {
				for (const [memberName, memberSchema] of this.structIterator()) if (memberSchema.isStreaming() && memberSchema.isStructSchema()) return memberName;
			}
			return "";
		}
		*structIterator() {
			if (this.isUnitSchema()) return;
			if (!this.isStructSchema()) throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
			const struct = this.getSchema();
			const z = struct[4].length;
			let it = struct[anno.it];
			if (it && z === it.length) {
				yield* it;
				return;
			}
			it = Array(z);
			for (let i = 0; i < z; ++i) {
				const k = struct[4][i];
				const v = member([struct[5][i], 0], k);
				yield it[i] = [k, v];
			}
			struct[anno.it] = it;
		}
	};
	function member(memberSchema, memberName) {
		if (memberSchema instanceof NormalizedSchema) return Object.assign(memberSchema, {
			memberName,
			_isMemberSchema: true
		});
		return new NormalizedSchema(memberSchema, memberName);
	}
	var isMemberSchema = (sc) => Array.isArray(sc) && sc.length === 2;
	var isStaticSchema = (sc) => Array.isArray(sc) && sc.length >= 5;
	var SimpleSchema = class SimpleSchema extends Schema {
		static symbol = Symbol.for("@smithy/sim");
		name;
		schemaRef;
		traits;
		symbol = SimpleSchema.symbol;
	};
	var sim = (namespace, name, schemaRef, traits) => Schema.assign(new SimpleSchema(), {
		name,
		namespace,
		traits,
		schemaRef
	});
	var simAdapter = (namespace, name, traits, schemaRef) => Schema.assign(new SimpleSchema(), {
		name,
		namespace,
		traits,
		schemaRef
	});
	var SCHEMA = {
		BLOB: 21,
		STREAMING_BLOB: 42,
		BOOLEAN: 2,
		STRING: 0,
		NUMERIC: 1,
		BIG_INTEGER: 17,
		BIG_DECIMAL: 19,
		DOCUMENT: 15,
		TIMESTAMP_DEFAULT: 4,
		TIMESTAMP_DATE_TIME: 5,
		TIMESTAMP_HTTP_DATE: 6,
		TIMESTAMP_EPOCH_SECONDS: 7,
		LIST_MODIFIER: 64,
		MAP_MODIFIER: 128
	};
	var TypeRegistry = class TypeRegistry {
		namespace;
		schemas;
		exceptions;
		static registries = /* @__PURE__ */ new Map();
		constructor(namespace, schemas = /* @__PURE__ */ new Map(), exceptions = /* @__PURE__ */ new Map()) {
			this.namespace = namespace;
			this.schemas = schemas;
			this.exceptions = exceptions;
		}
		static for(namespace) {
			if (!TypeRegistry.registries.has(namespace)) TypeRegistry.registries.set(namespace, new TypeRegistry(namespace));
			return TypeRegistry.registries.get(namespace);
		}
		copyFrom(other) {
			const { schemas, exceptions } = this;
			for (const [k, v] of other.schemas) if (!schemas.has(k)) schemas.set(k, v);
			for (const [k, v] of other.exceptions) if (!exceptions.has(k)) exceptions.set(k, v);
		}
		register(shapeId, schema) {
			const qualifiedName = this.normalizeShapeId(shapeId);
			for (const r of [this, TypeRegistry.for(qualifiedName.split("#")[0])]) r.schemas.set(qualifiedName, schema);
		}
		getSchema(shapeId) {
			const id = this.normalizeShapeId(shapeId);
			if (!this.schemas.has(id)) {
				if (!shapeId.includes("#")) {
					const suffix = "#" + shapeId;
					const candidates = [];
					for (const [shapeId, schema] of this.schemas.entries()) if (shapeId.endsWith(suffix)) candidates.push(schema);
					if (candidates.length === 1) return candidates[0];
				}
				throw new Error(`@smithy/core/schema - schema not found for ${id}`);
			}
			return this.schemas.get(id);
		}
		registerError(es, ctor) {
			const $error = es;
			const ns = $error[1];
			for (const r of [this, TypeRegistry.for(ns)]) {
				r.schemas.set(ns + "#" + $error[2], $error);
				r.exceptions.set($error, ctor);
			}
		}
		getErrorCtor(es) {
			const $error = es;
			if (this.exceptions.has($error)) return this.exceptions.get($error);
			return TypeRegistry.for($error[1]).exceptions.get($error);
		}
		getBaseException() {
			for (const exceptionKey of this.exceptions.keys()) if (Array.isArray(exceptionKey)) {
				const [, ns, name] = exceptionKey;
				const id = ns + "#" + name;
				if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) return exceptionKey;
			}
		}
		find(predicate) {
			for (const schema of this.schemas.values()) if (predicate(schema)) return schema;
		}
		clear() {
			this.schemas.clear();
			this.exceptions.clear();
		}
		normalizeShapeId(shapeId) {
			if (shapeId.includes("#")) return shapeId;
			return this.namespace + "#" + shapeId;
		}
	};
	exports.ErrorSchema = ErrorSchema;
	exports.ListSchema = ListSchema;
	exports.MapSchema = MapSchema;
	exports.NormalizedSchema = NormalizedSchema;
	exports.OperationSchema = OperationSchema;
	exports.SCHEMA = SCHEMA;
	exports.Schema = Schema;
	exports.SimpleSchema = SimpleSchema;
	exports.StructureSchema = StructureSchema;
	exports.TypeRegistry = TypeRegistry;
	exports.deref = deref;
	exports.deserializerMiddlewareOption = deserializerMiddlewareOption;
	exports.error = error;
	exports.getSchemaSerdePlugin = getSchemaSerdePlugin;
	exports.isStaticSchema = isStaticSchema;
	exports.list = list;
	exports.map = map;
	exports.op = op;
	exports.operation = operation;
	exports.serializerMiddlewareOption = serializerMiddlewareOption;
	exports.sim = sim;
	exports.simAdapter = simAdapter;
	exports.simpleSchemaCacheN = simpleSchemaCacheN;
	exports.simpleSchemaCacheS = simpleSchemaCacheS;
	exports.struct = struct;
	exports.traitsCache = traitsCache;
	exports.translateTraits = translateTraits;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/client/index.js
var require_client$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { getSmithyContext, normalizeProvider } = require_transport();
	exports.getSmithyContext = getSmithyContext;
	exports.normalizeProvider = normalizeProvider;
	var { SMITHY_CONTEXT_KEY, AlgorithmId } = (init_dist_es(), __toCommonJS(dist_es_exports));
	exports.AlgorithmId = AlgorithmId;
	var { NormalizedSchema } = require_schema();
	var getAllAliases = (name, aliases) => {
		const _aliases = [];
		if (name) _aliases.push(name);
		if (aliases) for (const alias of aliases) _aliases.push(alias);
		return _aliases;
	};
	var getMiddlewareNameWithAliases = (name, aliases) => {
		return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
	};
	var constructStack = () => {
		let absoluteEntries = [];
		let relativeEntries = [];
		let identifyOnResolve = false;
		const entriesNameSet = /* @__PURE__ */ new Set();
		const sort = (entries) => entries.sort((a, b) => stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]);
		const removeByName = (toRemove) => {
			let isRemoved = false;
			const filterCb = (entry) => {
				const aliases = getAllAliases(entry.name, entry.aliases);
				if (aliases.includes(toRemove)) {
					isRemoved = true;
					for (const alias of aliases) entriesNameSet.delete(alias);
					return false;
				}
				return true;
			};
			absoluteEntries = absoluteEntries.filter(filterCb);
			relativeEntries = relativeEntries.filter(filterCb);
			return isRemoved;
		};
		const removeByReference = (toRemove) => {
			let isRemoved = false;
			const filterCb = (entry) => {
				if (entry.middleware === toRemove) {
					isRemoved = true;
					for (const alias of getAllAliases(entry.name, entry.aliases)) entriesNameSet.delete(alias);
					return false;
				}
				return true;
			};
			absoluteEntries = absoluteEntries.filter(filterCb);
			relativeEntries = relativeEntries.filter(filterCb);
			return isRemoved;
		};
		const cloneTo = (toStack) => {
			absoluteEntries.forEach((entry) => {
				toStack.add(entry.middleware, { ...entry });
			});
			relativeEntries.forEach((entry) => {
				toStack.addRelativeTo(entry.middleware, { ...entry });
			});
			toStack.identifyOnResolve?.(stack.identifyOnResolve());
			return toStack;
		};
		const expandRelativeMiddlewareList = (from) => {
			const expandedMiddlewareList = [];
			from.before.forEach((entry) => {
				if (entry.before.length === 0 && entry.after.length === 0) expandedMiddlewareList.push(entry);
				else expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
			});
			expandedMiddlewareList.push(from);
			from.after.reverse().forEach((entry) => {
				if (entry.before.length === 0 && entry.after.length === 0) expandedMiddlewareList.push(entry);
				else expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
			});
			return expandedMiddlewareList;
		};
		const getMiddlewareList = (debug = false) => {
			const normalizedAbsoluteEntries = [];
			const normalizedRelativeEntries = [];
			const normalizedEntriesNameMap = {};
			absoluteEntries.forEach((entry) => {
				const normalizedEntry = {
					...entry,
					before: [],
					after: []
				};
				for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) normalizedEntriesNameMap[alias] = normalizedEntry;
				normalizedAbsoluteEntries.push(normalizedEntry);
			});
			relativeEntries.forEach((entry) => {
				const normalizedEntry = {
					...entry,
					before: [],
					after: []
				};
				for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) normalizedEntriesNameMap[alias] = normalizedEntry;
				normalizedRelativeEntries.push(normalizedEntry);
			});
			normalizedRelativeEntries.forEach((entry) => {
				if (entry.toMiddleware) {
					const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
					if (toMiddleware === void 0) {
						if (debug) return;
						throw new Error(`${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`);
					}
					if (entry.relation === "after") toMiddleware.after.push(entry);
					if (entry.relation === "before") toMiddleware.before.push(entry);
				}
			});
			return sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList) => {
				wholeList.push(...expandedMiddlewareList);
				return wholeList;
			}, []);
		};
		const stack = {
			add: (middleware, options = {}) => {
				const { name, override, aliases: _aliases } = options;
				const entry = {
					step: "initialize",
					priority: "normal",
					middleware,
					...options
				};
				const aliases = getAllAliases(name, _aliases);
				if (aliases.length > 0) {
					if (aliases.some((alias) => entriesNameSet.has(alias))) {
						if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
						for (const alias of aliases) {
							const toOverrideIndex = absoluteEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
							if (toOverrideIndex === -1) continue;
							const toOverride = absoluteEntries[toOverrideIndex];
							if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`);
							absoluteEntries.splice(toOverrideIndex, 1);
						}
					}
					for (const alias of aliases) entriesNameSet.add(alias);
				}
				absoluteEntries.push(entry);
			},
			addRelativeTo: (middleware, options) => {
				const { name, override, aliases: _aliases } = options;
				const entry = {
					middleware,
					...options
				};
				const aliases = getAllAliases(name, _aliases);
				if (aliases.length > 0) {
					if (aliases.some((alias) => entriesNameSet.has(alias))) {
						if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
						for (const alias of aliases) {
							const toOverrideIndex = relativeEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
							if (toOverrideIndex === -1) continue;
							const toOverride = relativeEntries[toOverrideIndex];
							if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
							relativeEntries.splice(toOverrideIndex, 1);
						}
					}
					for (const alias of aliases) entriesNameSet.add(alias);
				}
				relativeEntries.push(entry);
			},
			clone: () => cloneTo(constructStack()),
			use: (plugin) => {
				plugin.applyToStack(stack);
			},
			remove: (toRemove) => {
				if (typeof toRemove === "string") return removeByName(toRemove);
				else return removeByReference(toRemove);
			},
			removeByTag: (toRemove) => {
				let isRemoved = false;
				const filterCb = (entry) => {
					const { tags, name, aliases: _aliases } = entry;
					if (tags && tags.includes(toRemove)) {
						const aliases = getAllAliases(name, _aliases);
						for (const alias of aliases) entriesNameSet.delete(alias);
						isRemoved = true;
						return false;
					}
					return true;
				};
				absoluteEntries = absoluteEntries.filter(filterCb);
				relativeEntries = relativeEntries.filter(filterCb);
				return isRemoved;
			},
			concat: (from) => {
				const cloned = cloneTo(constructStack());
				cloned.use(from);
				cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
				return cloned;
			},
			applyToStack: cloneTo,
			identify: () => {
				return getMiddlewareList(true).map((mw) => {
					const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
					return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
				});
			},
			identifyOnResolve(toggle) {
				if (typeof toggle === "boolean") identifyOnResolve = toggle;
				return identifyOnResolve;
			},
			resolve: (handler, context) => {
				for (const middleware of getMiddlewareList().map((entry) => entry.middleware).reverse()) handler = middleware(handler, context);
				if (identifyOnResolve) console.log(stack.identify());
				return handler;
			}
		};
		return stack;
	};
	var stepWeights = {
		initialize: 5,
		serialize: 4,
		build: 3,
		finalizeRequest: 2,
		deserialize: 1
	};
	var priorityWeights = {
		high: 3,
		normal: 2,
		low: 1
	};
	var invalidFunction = (message) => () => {
		throw new Error(message);
	};
	var invalidProvider = (message) => () => Promise.reject(message);
	var getCircularReplacer = () => {
		const seen = /* @__PURE__ */ new WeakSet();
		return (key, value) => {
			if (typeof value === "object" && value !== null) {
				if (seen.has(value)) return "[Circular]";
				seen.add(value);
			}
			return value;
		};
	};
	var sleep = (seconds) => {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1e3));
	};
	var waiterServiceDefaults = {
		minDelay: 2,
		maxDelay: 120
	};
	var WaiterState;
	(function(WaiterState) {
		WaiterState["ABORTED"] = "ABORTED";
		WaiterState["FAILURE"] = "FAILURE";
		WaiterState["SUCCESS"] = "SUCCESS";
		WaiterState["RETRY"] = "RETRY";
		WaiterState["TIMEOUT"] = "TIMEOUT";
	})(WaiterState || (WaiterState = {}));
	var checkExceptions = (result) => {
		if (result.state === WaiterState.ABORTED) {
			const abortError = /* @__PURE__ */ new Error(`${JSON.stringify({
				...result,
				reason: "Request was aborted"
			}, getCircularReplacer())}`);
			abortError.name = "AbortError";
			throw abortError;
		} else if (result.state === WaiterState.TIMEOUT) {
			const timeoutError = /* @__PURE__ */ new Error(`${JSON.stringify({
				...result,
				reason: "Waiter has timed out"
			}, getCircularReplacer())}`);
			timeoutError.name = "TimeoutError";
			throw timeoutError;
		} else if (result.state !== WaiterState.SUCCESS) throw new Error(`${JSON.stringify(result, getCircularReplacer())}`);
		return result;
	};
	var runPolling = async ({ minDelay, maxDelay, maxWaitTime, abortController, client, abortSignal }, input, acceptorChecks) => {
		const observedResponses = {};
		const [minDelayMs, maxDelayMs] = [minDelay * 1e3, maxDelay * 1e3];
		let currentAttempt = 0;
		const waitUntil = Date.now() + maxWaitTime * 1e3;
		const warn403Time = Date.now() + 6e4;
		let didWarn403 = false;
		while (true) {
			if (currentAttempt > 0) {
				const delayMs = exponentialBackoffWithJitter(minDelayMs, maxDelayMs, currentAttempt, waitUntil);
				if (abortController?.signal?.aborted || abortSignal?.aborted) {
					const message = "AbortController signal aborted.";
					observedResponses[message] |= 0;
					observedResponses[message] += 1;
					return {
						state: WaiterState.ABORTED,
						observedResponses
					};
				}
				if (Date.now() + delayMs > waitUntil) return {
					state: WaiterState.TIMEOUT,
					observedResponses
				};
				await sleep(delayMs / 1e3);
			}
			const { state, reason } = await acceptorChecks(client, input);
			if (reason) {
				const message = createMessageFromResponse(reason);
				observedResponses[message] |= 0;
				observedResponses[message] += 1;
			}
			if (state !== WaiterState.RETRY) return {
				state,
				reason,
				final: reason,
				observedResponses
			};
			currentAttempt += 1;
			if (!didWarn403 && Date.now() >= warn403Time) {
				checkWarn403(observedResponses, client);
				didWarn403 = true;
			}
		}
	};
	var checkWarn403 = (observedResponses = {}, client) => {
		const orderedErrors = Object.keys(observedResponses);
		let count403 = 0;
		for (const response of orderedErrors) {
			const n = observedResponses[response] | 0;
			if (response.startsWith("403:")) count403 += n;
		}
		const clientLogger = client?.config?.logger;
		const warningLogger = typeof clientLogger?.warn === "function" && !clientLogger.constructor?.name?.includes?.("NoOpLogger") ? clientLogger : console;
		if (count403 >= 3 || orderedErrors[orderedErrors.length - 1]?.startsWith("403:")) warningLogger.warn(`@smithy/util-waiter WARN - 403 status code encountered during waiter polling.`);
	};
	var createMessageFromResponse = (reason) => {
		const status = reason?.$response?.statusCode ?? reason?.$metadata?.httpStatusCode;
		if (reason?.$responseBodyText) return `${status ? status + ": " : ""}Deserialization error for body: ${reason.$responseBodyText}`;
		if (status) {
			if (reason?.$response || reason?.message) return `${status ?? "Unknown"}: ${reason?.message}`;
			return `${status}: OK`;
		}
		return String(reason?.message ?? JSON.stringify(reason, getCircularReplacer()) ?? "Unknown");
	};
	var exponentialBackoffWithJitter = (minDelayMs, maxDelayMs, attempt, waitUntil) => {
		if (attempt > Math.log(maxDelayMs / minDelayMs) / Math.log(2) + 1) return maxDelayMs;
		const delay = minDelayMs * 2 ** (attempt - 1);
		const waitFor = randomInRange(minDelayMs, Math.min(delay, maxDelayMs));
		if (Date.now() + waitFor > waitUntil) {
			const timeRemaining = waitUntil - Date.now();
			return Math.max(0, timeRemaining - 500);
		}
		return waitFor;
	};
	var randomInRange = (min, max) => min + Math.random() * (max - min);
	var validateWaiterOptions = (options) => {
		if (options.maxWaitTime <= 0) throw new Error(`WaiterConfiguration.maxWaitTime must be greater than 0`);
		else if (options.minDelay <= 0) throw new Error(`WaiterConfiguration.minDelay must be greater than 0`);
		else if (options.maxDelay <= 0) throw new Error(`WaiterConfiguration.maxDelay must be greater than 0`);
		else if (options.maxWaitTime <= options.minDelay) throw new Error(`WaiterConfiguration.maxWaitTime [${options.maxWaitTime}] must be greater than WaiterConfiguration.minDelay [${options.minDelay}] for this waiter`);
		else if (options.maxDelay < options.minDelay) throw new Error(`WaiterConfiguration.maxDelay [${options.maxDelay}] must be greater than WaiterConfiguration.minDelay [${options.minDelay}] for this waiter`);
	};
	var abortTimeout = (abortSignal) => {
		let onAbort;
		return {
			clearListener() {
				if (typeof abortSignal.removeEventListener === "function") abortSignal.removeEventListener("abort", onAbort);
			},
			aborted: new Promise((resolve) => {
				onAbort = () => resolve({ state: WaiterState.ABORTED });
				if (typeof abortSignal.addEventListener === "function") abortSignal.addEventListener("abort", onAbort);
				else abortSignal.onabort = onAbort;
			})
		};
	};
	var createWaiter = async (options, input, acceptorChecks) => {
		const params = {
			...waiterServiceDefaults,
			...options
		};
		validateWaiterOptions(params);
		const exitConditions = [runPolling(params, input, acceptorChecks)];
		const finalize = [];
		if (options.abortSignal) {
			const { aborted, clearListener } = abortTimeout(options.abortSignal);
			finalize.push(clearListener);
			exitConditions.push(aborted);
		}
		if (options.abortController?.signal) {
			const { aborted, clearListener } = abortTimeout(options.abortController.signal);
			finalize.push(clearListener);
			exitConditions.push(aborted);
		}
		return Promise.race(exitConditions).then((result) => {
			for (const fn of finalize) fn();
			return result;
		});
	};
	var Client = class {
		config;
		middlewareStack = constructStack();
		initConfig;
		handlers;
		constructor(config) {
			this.config = config;
			const { protocol, protocolSettings } = config;
			if (protocolSettings) {
				if (typeof protocol === "function") config.protocol = new protocol(protocolSettings);
			}
		}
		send(command, optionsOrCb, cb) {
			const options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
			const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
			const useHandlerCache = options === void 0 && this.config.cacheMiddleware === true;
			let handler;
			if (useHandlerCache) {
				if (!this.handlers) this.handlers = /* @__PURE__ */ new WeakMap();
				const handlers = this.handlers;
				if (handlers.has(command.constructor)) handler = handlers.get(command.constructor);
				else {
					handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
					handlers.set(command.constructor, handler);
				}
			} else {
				delete this.handlers;
				handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
			}
			if (callback) handler(command).then((result) => callback(null, result.output), (err) => callback(err)).catch(() => {});
			else return handler(command).then((result) => result.output);
		}
		destroy() {
			this.config?.requestHandler?.destroy?.();
			delete this.handlers;
		}
	};
	var SENSITIVE_STRING$1 = "***SensitiveInformation***";
	function schemaLogFilter(schema, data) {
		if (data == null) return data;
		const ns = NormalizedSchema.of(schema);
		if (ns.getMergedTraits().sensitive) return SENSITIVE_STRING$1;
		if (ns.isListSchema()) {
			if (!!ns.getValueSchema().getMergedTraits().sensitive) return SENSITIVE_STRING$1;
		} else if (ns.isMapSchema()) {
			if (!!ns.getKeySchema().getMergedTraits().sensitive || !!ns.getValueSchema().getMergedTraits().sensitive) return SENSITIVE_STRING$1;
		} else if (ns.isStructSchema() && typeof data === "object") {
			const object = data;
			const newObject = {};
			for (const [member, memberNs] of ns.structIterator()) if (object[member] != null) newObject[member] = schemaLogFilter(memberNs, object[member]);
			return newObject;
		}
		return data;
	}
	var Command = class {
		middlewareStack = constructStack();
		schema;
		static classBuilder() {
			return new ClassBuilder();
		}
		resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor }) {
			for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) this.middlewareStack.use(mw);
			const stack = clientStack.concat(this.middlewareStack);
			const { logger } = configuration;
			const handlerExecutionContext = {
				logger,
				clientName,
				commandName,
				inputFilterSensitiveLog,
				outputFilterSensitiveLog,
				[SMITHY_CONTEXT_KEY]: {
					commandInstance: this,
					...smithyContext
				},
				...additionalContext
			};
			const { requestHandler } = configuration;
			let requestOptions = options ?? {};
			if (smithyContext.eventStream) requestOptions = {
				isEventStream: true,
				...requestOptions
			};
			return stack.resolve((request) => requestHandler.handle(request.request, requestOptions), handlerExecutionContext);
		}
	};
	var ClassBuilder = class {
		_init = () => {};
		_ep = {};
		_middlewareFn = () => [];
		_commandName = "";
		_clientName = "";
		_additionalContext = {};
		_smithyContext = {};
		_inputFilterSensitiveLog = void 0;
		_outputFilterSensitiveLog = void 0;
		_serializer = null;
		_deserializer = null;
		_operationSchema;
		init(cb) {
			this._init = cb;
		}
		ep(endpointParameterInstructions) {
			this._ep = endpointParameterInstructions;
			return this;
		}
		m(middlewareSupplier) {
			this._middlewareFn = middlewareSupplier;
			return this;
		}
		s(service, operation, smithyContext = {}) {
			this._smithyContext = {
				service,
				operation,
				...smithyContext
			};
			return this;
		}
		c(additionalContext = {}) {
			this._additionalContext = additionalContext;
			return this;
		}
		n(clientName, commandName) {
			this._clientName = clientName;
			this._commandName = commandName;
			return this;
		}
		f(inputFilter = (_) => _, outputFilter = (_) => _) {
			this._inputFilterSensitiveLog = inputFilter;
			this._outputFilterSensitiveLog = outputFilter;
			return this;
		}
		ser(serializer) {
			this._serializer = serializer;
			return this;
		}
		de(deserializer) {
			this._deserializer = deserializer;
			return this;
		}
		sc(operation) {
			this._operationSchema = operation;
			this._smithyContext.operationSchema = operation;
			return this;
		}
		build() {
			const closure = this;
			let CommandRef;
			return CommandRef = class extends Command {
				input;
				static getEndpointParameterInstructions() {
					return closure._ep;
				}
				constructor(...[input]) {
					super();
					this.input = input ?? {};
					closure._init(this);
					this.schema = closure._operationSchema;
				}
				resolveMiddleware(stack, configuration, options) {
					const op = closure._operationSchema;
					const input = op?.[4] ?? op?.input;
					const output = op?.[5] ?? op?.output;
					return this.resolveMiddlewareWithContext(stack, configuration, options, {
						CommandCtor: CommandRef,
						middlewareFn: closure._middlewareFn,
						clientName: closure._clientName,
						commandName: closure._commandName,
						inputFilterSensitiveLog: closure._inputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, input) : (_) => _),
						outputFilterSensitiveLog: closure._outputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, output) : (_) => _),
						smithyContext: closure._smithyContext,
						additionalContext: closure._additionalContext
					});
				}
				serialize = closure._serializer;
				deserialize = closure._deserializer;
			};
		}
	};
	var SENSITIVE_STRING = "***SensitiveInformation***";
	var createAggregatedClient = (commands, Client, options) => {
		for (const [command, CommandCtor] of Object.entries(commands)) {
			const methodImpl = async function(args, optionsOrCb, cb) {
				const command = new CommandCtor(args);
				if (typeof optionsOrCb === "function") this.send(command, optionsOrCb);
				else if (typeof cb === "function") {
					if (typeof optionsOrCb !== "object") throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
					this.send(command, optionsOrCb || {}, cb);
				} else return this.send(command, optionsOrCb);
			};
			const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
			Client.prototype[methodName] = methodImpl;
		}
		const { paginators = {}, waiters = {} } = options ?? {};
		for (const [paginatorName, paginatorFn] of Object.entries(paginators)) if (Client.prototype[paginatorName] === void 0) Client.prototype[paginatorName] = function(commandInput = {}, paginationConfiguration, ...rest) {
			return paginatorFn({
				...paginationConfiguration,
				client: this
			}, commandInput, ...rest);
		};
		for (const [waiterName, waiterFn] of Object.entries(waiters)) if (Client.prototype[waiterName] === void 0) Client.prototype[waiterName] = async function(commandInput = {}, waiterConfiguration, ...rest) {
			let config = waiterConfiguration;
			if (typeof waiterConfiguration === "number") config = { maxWaitTime: waiterConfiguration };
			return waiterFn({
				...config,
				client: this
			}, commandInput, ...rest);
		};
	};
	var ServiceException = class ServiceException extends Error {
		$fault;
		$response;
		$retryable;
		$metadata;
		constructor(options) {
			super(options.message);
			Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
			this.name = options.name;
			this.$fault = options.$fault;
			this.$metadata = options.$metadata;
		}
		static isInstance(value) {
			if (!value) return false;
			const candidate = value;
			return ServiceException.prototype.isPrototypeOf(candidate) || Boolean(candidate.$fault) && Boolean(candidate.$metadata) && (candidate.$fault === "client" || candidate.$fault === "server");
		}
		static [Symbol.hasInstance](instance) {
			if (!instance) return false;
			const candidate = instance;
			if (this === ServiceException) return ServiceException.isInstance(instance);
			if (ServiceException.isInstance(instance)) {
				if (candidate.name && this.name) return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
				return this.prototype.isPrototypeOf(instance);
			}
			return false;
		}
	};
	var decorateServiceException = (exception, additions = {}) => {
		Object.entries(additions).filter(([, v]) => v !== void 0).forEach(([k, v]) => {
			if (exception[k] == void 0 || exception[k] === "") exception[k] = v;
		});
		exception.message = exception.message || exception.Message || "UnknownError";
		delete exception.Message;
		return exception;
	};
	var throwDefaultError = ({ output, parsedBody, exceptionCtor, errorCode }) => {
		const $metadata = deserializeMetadata(output);
		const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : void 0;
		throw decorateServiceException(new exceptionCtor({
			name: parsedBody?.code || parsedBody?.Code || errorCode || statusCode || "UnknownError",
			$fault: "client",
			$metadata
		}), parsedBody);
	};
	var withBaseException = (ExceptionCtor) => {
		return ({ output, parsedBody, errorCode }) => {
			throwDefaultError({
				output,
				parsedBody,
				exceptionCtor: ExceptionCtor,
				errorCode
			});
		};
	};
	var deserializeMetadata = (output) => ({
		httpStatusCode: output.statusCode,
		requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
		extendedRequestId: output.headers["x-amz-id-2"],
		cfId: output.headers["x-amz-cf-id"]
	});
	var loadConfigsForDefaultMode = (mode) => {
		switch (mode) {
			case "standard": return {
				retryMode: "standard",
				connectionTimeout: 3100
			};
			case "in-region": return {
				retryMode: "standard",
				connectionTimeout: 1100
			};
			case "cross-region": return {
				retryMode: "standard",
				connectionTimeout: 3100
			};
			case "mobile": return {
				retryMode: "standard",
				connectionTimeout: 3e4
			};
			default: return {};
		}
	};
	var warningEmitted = false;
	var emitWarningIfUnsupportedVersion = (version) => {
		if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 16) warningEmitted = true;
	};
	var knownAlgorithms = Object.values(AlgorithmId);
	var getChecksumConfiguration = (runtimeConfig) => {
		const checksumAlgorithms = [];
		for (const id in AlgorithmId) {
			const algorithmId = AlgorithmId[id];
			if (runtimeConfig[algorithmId] === void 0) continue;
			checksumAlgorithms.push({
				algorithmId: () => algorithmId,
				checksumConstructor: () => runtimeConfig[algorithmId]
			});
		}
		for (const [id, ChecksumCtor] of Object.entries(runtimeConfig.checksumAlgorithms ?? {})) checksumAlgorithms.push({
			algorithmId: () => id,
			checksumConstructor: () => ChecksumCtor
		});
		return {
			addChecksumAlgorithm(algo) {
				runtimeConfig.checksumAlgorithms = runtimeConfig.checksumAlgorithms ?? {};
				const id = algo.algorithmId();
				const ctor = algo.checksumConstructor();
				if (knownAlgorithms.includes(id)) runtimeConfig.checksumAlgorithms[id.toUpperCase()] = ctor;
				else runtimeConfig.checksumAlgorithms[id] = ctor;
				checksumAlgorithms.push(algo);
			},
			checksumAlgorithms() {
				return checksumAlgorithms;
			}
		};
	};
	var resolveChecksumRuntimeConfig = (clientConfig) => {
		const runtimeConfig = {};
		clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
			const id = checksumAlgorithm.algorithmId();
			if (knownAlgorithms.includes(id)) runtimeConfig[id] = checksumAlgorithm.checksumConstructor();
		});
		return runtimeConfig;
	};
	var getRetryConfiguration = (runtimeConfig) => {
		return {
			setRetryStrategy(retryStrategy) {
				runtimeConfig.retryStrategy = retryStrategy;
			},
			retryStrategy() {
				return runtimeConfig.retryStrategy;
			}
		};
	};
	var resolveRetryRuntimeConfig = (retryStrategyConfiguration) => {
		const runtimeConfig = {};
		runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
		return runtimeConfig;
	};
	var getDefaultExtensionConfiguration = (runtimeConfig) => {
		return Object.assign(getChecksumConfiguration(runtimeConfig), getRetryConfiguration(runtimeConfig));
	};
	var getDefaultClientConfiguration = getDefaultExtensionConfiguration;
	var resolveDefaultRuntimeConfig = (config) => {
		return Object.assign(resolveChecksumRuntimeConfig(config), resolveRetryRuntimeConfig(config));
	};
	var getArrayIfSingleItem = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
	var getValueFromTextNode = (obj) => {
		const textNodeName = "#text";
		for (const key in obj) if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== void 0) obj[key] = obj[key][textNodeName];
		else if (typeof obj[key] === "object" && obj[key] !== null) obj[key] = getValueFromTextNode(obj[key]);
		return obj;
	};
	var isSerializableHeaderValue = (value) => {
		return value != null;
	};
	var NoOpLogger = class {
		trace() {}
		debug() {}
		info() {}
		warn() {}
		error() {}
	};
	function map(arg0, arg1, arg2) {
		let target;
		let filter;
		let instructions;
		if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
			target = {};
			instructions = arg0;
		} else {
			target = arg0;
			if (typeof arg1 === "function") {
				filter = arg1;
				instructions = arg2;
				return mapWithFilter(target, filter, instructions);
			} else instructions = arg1;
		}
		for (const key of Object.keys(instructions)) {
			if (!Array.isArray(instructions[key])) {
				target[key] = instructions[key];
				continue;
			}
			applyInstruction(target, null, instructions, key);
		}
		return target;
	}
	var convertMap = (target) => {
		const output = {};
		for (const [k, v] of Object.entries(target || {})) output[k] = [, v];
		return output;
	};
	var take = (source, instructions) => {
		const out = {};
		for (const key in instructions) applyInstruction(out, source, instructions, key);
		return out;
	};
	var mapWithFilter = (target, filter, instructions) => {
		return map(target, Object.entries(instructions).reduce((_instructions, [key, value]) => {
			if (Array.isArray(value)) _instructions[key] = value;
			else if (typeof value === "function") _instructions[key] = [filter, value()];
			else _instructions[key] = [filter, value];
			return _instructions;
		}, {}));
	};
	var applyInstruction = (target, source, instructions, targetKey) => {
		if (source !== null) {
			let instruction = instructions[targetKey];
			if (typeof instruction === "function") instruction = [, instruction];
			const [filter = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
			if (typeof filter === "function" && filter(source[sourceKey]) || typeof filter !== "function" && !!filter) target[targetKey] = valueFn(source[sourceKey]);
			return;
		}
		let [filter, value] = instructions[targetKey];
		if (typeof value === "function") {
			let _value;
			const defaultFilterPassed = filter === void 0 && (_value = value()) != null;
			const customFilterPassed = typeof filter === "function" && !!filter(void 0) || typeof filter !== "function" && !!filter;
			if (defaultFilterPassed) target[targetKey] = _value;
			else if (customFilterPassed) target[targetKey] = value();
		} else {
			const defaultFilterPassed = filter === void 0 && value != null;
			const customFilterPassed = typeof filter === "function" && !!filter(value) || typeof filter !== "function" && !!filter;
			if (defaultFilterPassed || customFilterPassed) target[targetKey] = value;
		}
	};
	var nonNullish = (_) => _ != null;
	var pass = (_) => _;
	var serializeFloat = (value) => {
		if (value !== value) return "NaN";
		switch (value) {
			case Infinity: return "Infinity";
			case -Infinity: return "-Infinity";
			default: return value;
		}
	};
	var serializeDateTime = (date) => date.toISOString().replace(".000Z", "Z");
	var _json = (obj) => {
		if (obj == null) return {};
		if (Array.isArray(obj)) return obj.filter((_) => _ != null).map(_json);
		if (typeof obj === "object") {
			const target = {};
			for (const key of Object.keys(obj)) {
				if (obj[key] == null) continue;
				target[key] = _json(obj[key]);
			}
			return target;
		}
		return obj;
	};
	exports.Client = Client;
	exports.Command = Command;
	exports.NoOpLogger = NoOpLogger;
	exports.SENSITIVE_STRING = SENSITIVE_STRING;
	exports.ServiceException = ServiceException;
	exports.WaiterState = WaiterState;
	exports._json = _json;
	exports.checkExceptions = checkExceptions;
	exports.constructStack = constructStack;
	exports.convertMap = convertMap;
	exports.createAggregatedClient = createAggregatedClient;
	exports.createWaiter = createWaiter;
	exports.decorateServiceException = decorateServiceException;
	exports.emitWarningIfUnsupportedVersion = emitWarningIfUnsupportedVersion;
	exports.getArrayIfSingleItem = getArrayIfSingleItem;
	exports.getChecksumConfiguration = getChecksumConfiguration;
	exports.getDefaultClientConfiguration = getDefaultClientConfiguration;
	exports.getDefaultExtensionConfiguration = getDefaultExtensionConfiguration;
	exports.getRetryConfiguration = getRetryConfiguration;
	exports.getValueFromTextNode = getValueFromTextNode;
	exports.invalidFunction = invalidFunction;
	exports.invalidProvider = invalidProvider;
	exports.isSerializableHeaderValue = isSerializableHeaderValue;
	exports.loadConfigsForDefaultMode = loadConfigsForDefaultMode;
	exports.map = map;
	exports.resolveChecksumRuntimeConfig = resolveChecksumRuntimeConfig;
	exports.resolveDefaultRuntimeConfig = resolveDefaultRuntimeConfig;
	exports.resolveRetryRuntimeConfig = resolveRetryRuntimeConfig;
	exports.schemaLogFilter = schemaLogFilter;
	exports.serializeDateTime = serializeDateTime;
	exports.serializeFloat = serializeFloat;
	exports.take = take;
	exports.throwDefaultError = throwDefaultError;
	exports.waiterServiceDefaults = waiterServiceDefaults;
	exports.withBaseException = withBaseException;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/config/index.js
var require_config = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { homedir } = __require("node:os");
	var { sep: sep$1, join: join$1 } = __require("node:path");
	var { createHash: createHash$1 } = __require("node:crypto");
	var { readFile: readFile$1 } = __require("node:fs/promises");
	var { IniSectionType } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var { normalizeProvider } = require_client$1();
	var { isValidHostLabel } = require_transport();
	var ProviderError = class ProviderError extends Error {
		name = "ProviderError";
		tryNextLink;
		constructor(message, options = true) {
			let logger;
			let tryNextLink = true;
			if (typeof options === "boolean") {
				logger = void 0;
				tryNextLink = options;
			} else if (options != null && typeof options === "object") {
				logger = options.logger;
				tryNextLink = options.tryNextLink ?? true;
			}
			super(message);
			this.tryNextLink = tryNextLink;
			Object.setPrototypeOf(this, ProviderError.prototype);
			logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
		}
		static from(error, options = true) {
			return Object.assign(new this(error.message, options), error);
		}
	};
	var CredentialsProviderError = class CredentialsProviderError extends ProviderError {
		name = "CredentialsProviderError";
		constructor(message, options = true) {
			super(message, options);
			Object.setPrototypeOf(this, CredentialsProviderError.prototype);
		}
	};
	var TokenProviderError = class TokenProviderError extends ProviderError {
		name = "TokenProviderError";
		constructor(message, options = true) {
			super(message, options);
			Object.setPrototypeOf(this, TokenProviderError.prototype);
		}
	};
	var chain = (...providers) => async () => {
		if (providers.length === 0) throw new ProviderError("No providers in chain");
		let lastProviderError;
		for (const provider of providers) try {
			return await provider();
		} catch (err) {
			lastProviderError = err;
			if (err?.tryNextLink) continue;
			throw err;
		}
		throw lastProviderError;
	};
	var fromValue = (staticValue) => () => Promise.resolve(staticValue);
	var memoize = (provider, isExpired, requiresRefresh) => {
		let resolved;
		let pending;
		let hasResult;
		let isConstant = false;
		const coalesceProvider = async () => {
			if (!pending) pending = provider();
			try {
				resolved = await pending;
				hasResult = true;
				isConstant = false;
			} finally {
				pending = void 0;
			}
			return resolved;
		};
		if (isExpired === void 0) return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider();
			return resolved;
		};
		return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider();
			if (isConstant) return resolved;
			if (requiresRefresh && !requiresRefresh(resolved)) {
				isConstant = true;
				return resolved;
			}
			if (isExpired(resolved)) {
				await coalesceProvider();
				return resolved;
			}
			return resolved;
		};
	};
	var booleanSelector = (obj, key, type) => {
		if (!(key in obj)) return void 0;
		if (obj[key] === "true") return true;
		if (obj[key] === "false") return false;
		throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
	};
	var numberSelector = (obj, key, type) => {
		if (!(key in obj)) return void 0;
		const numberValue = parseInt(obj[key], 10);
		if (Number.isNaN(numberValue)) throw new TypeError(`Cannot load ${type} '${key}'. Expected number, got '${obj[key]}'.`);
		return numberValue;
	};
	var SelectorType;
	(function(SelectorType) {
		SelectorType["ENV"] = "env";
		SelectorType["CONFIG"] = "shared config entry";
	})(SelectorType || (SelectorType = {}));
	var homeDirCache = {};
	var getHomeDirCacheKey = () => {
		if (process && process.geteuid) return `${process.geteuid()}`;
		return "DEFAULT";
	};
	var getHomeDir = () => {
		const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${sep$1}` } = process.env;
		if (HOME) return HOME;
		if (USERPROFILE) return USERPROFILE;
		if (HOMEPATH) return `${HOMEDRIVE}${HOMEPATH}`;
		const homeDirCacheKey = getHomeDirCacheKey();
		if (!homeDirCache[homeDirCacheKey]) homeDirCache[homeDirCacheKey] = homedir();
		return homeDirCache[homeDirCacheKey];
	};
	var ENV_PROFILE = "AWS_PROFILE";
	var DEFAULT_PROFILE = "default";
	var getProfileName = (init) => init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;
	var getSSOTokenFilepath = (id) => {
		const cacheName = createHash$1("sha1").update(id).digest("hex");
		return join$1(getHomeDir(), ".aws", "sso", "cache", `${cacheName}.json`);
	};
	var tokenIntercept = {};
	var getSSOTokenFromFile = async (id) => {
		if (tokenIntercept[id]) return tokenIntercept[id];
		const ssoTokenText = await readFile$1(getSSOTokenFilepath(id), "utf8");
		return JSON.parse(ssoTokenText);
	};
	var CONFIG_PREFIX_SEPARATOR = ".";
	var getConfigData = (data) => Object.entries(data).filter(([key]) => {
		const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
		if (indexOfSeparator === -1) return false;
		return Object.values(IniSectionType).includes(key.substring(0, indexOfSeparator));
	}).reduce((acc, [key, value]) => {
		const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
		const updatedKey = key.substring(0, indexOfSeparator) === IniSectionType.PROFILE ? key.substring(indexOfSeparator + 1) : key;
		acc[updatedKey] = value;
		return acc;
	}, { ...data.default && { default: data.default } });
	var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
	var getConfigFilepath = () => process.env[ENV_CONFIG_PATH] || join$1(getHomeDir(), ".aws", "config");
	var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
	var getCredentialsFilepath = () => process.env[ENV_CREDENTIALS_PATH] || join$1(getHomeDir(), ".aws", "credentials");
	var prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
	var profileNameBlockList = ["__proto__", "profile __proto__"];
	var parseIni = (iniData) => {
		const map = {};
		let currentSection;
		let currentSubSection;
		for (const iniLine of iniData.split(/\r?\n/)) {
			const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
			if (trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]") {
				currentSection = void 0;
				currentSubSection = void 0;
				const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
				const matches = prefixKeyRegex.exec(sectionName);
				if (matches) {
					const [, prefix, , name] = matches;
					if (Object.values(IniSectionType).includes(prefix)) currentSection = [prefix, name].join(CONFIG_PREFIX_SEPARATOR);
				} else currentSection = sectionName;
				if (profileNameBlockList.includes(sectionName)) throw new Error(`Found invalid profile name "${sectionName}"`);
			} else if (currentSection) {
				const indexOfEqualsSign = trimmedLine.indexOf("=");
				if (![0, -1].includes(indexOfEqualsSign)) {
					const [name, value] = [trimmedLine.substring(0, indexOfEqualsSign).trim(), trimmedLine.substring(indexOfEqualsSign + 1).trim()];
					if (value === "") currentSubSection = name;
					else {
						if (currentSubSection && iniLine.trimStart() === iniLine) currentSubSection = void 0;
						map[currentSection] = map[currentSection] || {};
						const key = currentSubSection ? [currentSubSection, name].join(CONFIG_PREFIX_SEPARATOR) : name;
						map[currentSection][key] = value;
					}
				}
			}
		}
		return map;
	};
	var filePromises = {};
	var fileIntercept = {};
	var readFile = (path, options) => {
		if (fileIntercept[path] !== void 0) return fileIntercept[path];
		if (!filePromises[path] || options?.ignoreCache) filePromises[path] = readFile$1(path, "utf8");
		return filePromises[path];
	};
	var swallowError$1 = () => ({});
	var loadSharedConfigFiles = async (init = {}) => {
		const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
		const homeDir = getHomeDir();
		const relativeHomeDirPrefix = "~/";
		let resolvedFilepath = filepath;
		if (filepath.startsWith(relativeHomeDirPrefix)) resolvedFilepath = join$1(homeDir, filepath.slice(2));
		let resolvedConfigFilepath = configFilepath;
		if (configFilepath.startsWith(relativeHomeDirPrefix)) resolvedConfigFilepath = join$1(homeDir, configFilepath.slice(2));
		const parsedFiles = await Promise.all([readFile(resolvedConfigFilepath, { ignoreCache: init.ignoreCache }).then(parseIni).then(getConfigData).catch(swallowError$1), readFile(resolvedFilepath, { ignoreCache: init.ignoreCache }).then(parseIni).catch(swallowError$1)]);
		return {
			configFile: parsedFiles[0],
			credentialsFile: parsedFiles[1]
		};
	};
	var getSsoSessionData = (data) => Object.entries(data).filter(([key]) => key.startsWith(IniSectionType.SSO_SESSION + CONFIG_PREFIX_SEPARATOR)).reduce((acc, [key, value]) => ({
		...acc,
		[key.substring(key.indexOf(CONFIG_PREFIX_SEPARATOR) + 1)]: value
	}), {});
	var swallowError = () => ({});
	var loadSsoSessionData = async (init = {}) => readFile(init.configFilepath ?? getConfigFilepath()).then(parseIni).then(getSsoSessionData).catch(swallowError);
	var mergeConfigFiles = (...files) => {
		const merged = {};
		for (const file of files) for (const [key, values] of Object.entries(file)) if (merged[key] !== void 0) Object.assign(merged[key], values);
		else merged[key] = values;
		return merged;
	};
	var parseKnownFiles = async (init) => {
		const parsedFiles = await loadSharedConfigFiles(init);
		return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
	};
	var externalDataInterceptor = {
		getFileRecord() {
			return fileIntercept;
		},
		interceptFile(path, contents) {
			fileIntercept[path] = Promise.resolve(contents);
		},
		getTokenRecord() {
			return tokenIntercept;
		},
		interceptToken(id, contents) {
			tokenIntercept[id] = contents;
		}
	};
	function getSelectorName(functionString) {
		try {
			const constants = new Set(Array.from(functionString.match(/([A-Z_]){3,}/g) ?? []));
			constants.delete("CONFIG");
			constants.delete("CONFIG_PREFIX_SEPARATOR");
			constants.delete("ENV");
			return [...constants].join(", ");
		} catch (e) {
			return functionString;
		}
	}
	var fromEnv = (envVarSelector, options) => async () => {
		try {
			const config = envVarSelector(process.env, options);
			if (config === void 0) throw new Error();
			return config;
		} catch (e) {
			throw new CredentialsProviderError(e.message || `Not found in ENV: ${getSelectorName(envVarSelector.toString())}`, { logger: options?.logger });
		}
	};
	var fromSharedConfigFiles = (configSelector, { preferredFile = "config", ...init } = {}) => async () => {
		const profile = getProfileName(init);
		const { configFile, credentialsFile } = await loadSharedConfigFiles(init);
		const profileFromCredentials = credentialsFile[profile] || {};
		const profileFromConfig = configFile[profile] || {};
		const mergedProfile = preferredFile === "config" ? {
			...profileFromCredentials,
			...profileFromConfig
		} : {
			...profileFromConfig,
			...profileFromCredentials
		};
		try {
			const configValue = configSelector(mergedProfile, preferredFile === "config" ? configFile : credentialsFile);
			if (configValue === void 0) throw new Error();
			return configValue;
		} catch (e) {
			throw new CredentialsProviderError(e.message || `Not found in config files w/ profile [${profile}]: ${getSelectorName(configSelector.toString())}`, { logger: init.logger });
		}
	};
	var isFunction = (func) => typeof func === "function";
	var fromStatic = (defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : fromValue(defaultValue);
	var loadConfig = ({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => {
		const { signingName, logger } = configuration;
		return memoize(chain(fromEnv(environmentVariableSelector, {
			signingName,
			logger
		}), fromSharedConfigFiles(configFileSelector, configuration), fromStatic(defaultValue)));
	};
	var ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
	var CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
	var DEFAULT_USE_DUALSTACK_ENDPOINT = false;
	var NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_DUALSTACK_ENDPOINT, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_DUALSTACK_ENDPOINT, SelectorType.CONFIG),
		default: false
	};
	var nodeDualstackConfigSelectors = {
		environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_DUALSTACK_ENDPOINT, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_DUALSTACK_ENDPOINT, SelectorType.CONFIG),
		default: void 0
	};
	var ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
	var CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
	var DEFAULT_USE_FIPS_ENDPOINT = false;
	var NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_FIPS_ENDPOINT, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_FIPS_ENDPOINT, SelectorType.CONFIG),
		default: false
	};
	var nodeFipsConfigSelectors = {
		environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_FIPS_ENDPOINT, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_FIPS_ENDPOINT, SelectorType.CONFIG),
		default: void 0
	};
	var resolveCustomEndpointsConfig = (input) => {
		const { tls, endpoint, urlParser, useDualstackEndpoint } = input;
		return Object.assign(input, {
			tls: tls ?? true,
			endpoint: normalizeProvider(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
			isCustomEndpoint: true,
			useDualstackEndpoint: normalizeProvider(useDualstackEndpoint ?? false)
		});
	};
	var getEndpointFromRegion = async (input) => {
		const { tls = true } = input;
		const region = await input.region();
		if (!(/* @__PURE__ */ new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/)).test(region)) throw new Error("Invalid region in client config");
		const useDualstackEndpoint = await input.useDualstackEndpoint();
		const useFipsEndpoint = await input.useFipsEndpoint();
		const { hostname } = await input.regionInfoProvider(region, {
			useDualstackEndpoint,
			useFipsEndpoint
		}) ?? {};
		if (!hostname) throw new Error("Cannot resolve hostname from client config");
		return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
	};
	var resolveEndpointsConfig = (input) => {
		const useDualstackEndpoint = normalizeProvider(input.useDualstackEndpoint ?? false);
		const { endpoint, useFipsEndpoint, urlParser, tls } = input;
		return Object.assign(input, {
			tls: tls ?? true,
			endpoint: endpoint ? normalizeProvider(typeof endpoint === "string" ? urlParser(endpoint) : endpoint) : () => getEndpointFromRegion({
				...input,
				useDualstackEndpoint,
				useFipsEndpoint
			}),
			isCustomEndpoint: !!endpoint,
			useDualstackEndpoint
		});
	};
	var REGION_ENV_NAME = "AWS_REGION";
	var REGION_INI_NAME = "region";
	var NODE_REGION_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => env[REGION_ENV_NAME],
		configFileSelector: (profile) => profile[REGION_INI_NAME],
		default: () => {
			throw new Error("Region is missing");
		}
	};
	var NODE_REGION_CONFIG_FILE_OPTIONS = { preferredFile: "credentials" };
	var validRegions = /* @__PURE__ */ new Set();
	var checkRegion = (region, check = isValidHostLabel) => {
		if (!validRegions.has(region) && !check(region)) if (region === "*") console.warn(`@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.`);
		else throw new Error(`Region not accepted: region="${region}" is not a valid hostname component.`);
		else validRegions.add(region);
	};
	var isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
	var getRealRegion = (region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;
	var resolveRegionConfig = (input) => {
		const { region, useFipsEndpoint } = input;
		if (!region) throw new Error("Region is missing");
		return Object.assign(input, {
			region: async () => {
				const realRegion = getRealRegion(typeof region === "function" ? await region() : region);
				checkRegion(realRegion);
				return realRegion;
			},
			useFipsEndpoint: async () => {
				if (isFipsRegion(typeof region === "string" ? region : await region())) return true;
				return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
			}
		});
	};
	var getHostnameFromVariants = (variants = [], { useFipsEndpoint, useDualstackEndpoint }) => variants.find(({ tags }) => useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack"))?.hostname;
	var getResolvedHostname = (resolvedRegion, { regionHostname, partitionHostname }) => regionHostname ? regionHostname : partitionHostname ? partitionHostname.replace("{region}", resolvedRegion) : void 0;
	var getResolvedPartition = (region, { partitionHash }) => Object.keys(partitionHash || {}).find((key) => partitionHash[key].regions.includes(region)) ?? "aws";
	var getResolvedSigningRegion = (hostname, { signingRegion, regionRegex, useFipsEndpoint }) => {
		if (signingRegion) return signingRegion;
		else if (useFipsEndpoint) {
			const regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
			const regionRegexmatchArray = hostname.match(regionRegexJs);
			if (regionRegexmatchArray) return regionRegexmatchArray[0].slice(1, -1);
		}
	};
	var getRegionInfo = (region, { useFipsEndpoint = false, useDualstackEndpoint = false, signingService, regionHash, partitionHash }) => {
		const partition = getResolvedPartition(region, { partitionHash });
		const resolvedRegion = region in regionHash ? region : partitionHash[partition]?.endpoint ?? region;
		const hostnameOptions = {
			useFipsEndpoint,
			useDualstackEndpoint
		};
		const hostname = getResolvedHostname(resolvedRegion, {
			regionHostname: getHostnameFromVariants(regionHash[resolvedRegion]?.variants, hostnameOptions),
			partitionHostname: getHostnameFromVariants(partitionHash[partition]?.variants, hostnameOptions)
		});
		if (hostname === void 0) throw new Error(`Endpoint resolution failed for: [object Object]`);
		const signingRegion = getResolvedSigningRegion(hostname, {
			signingRegion: regionHash[resolvedRegion]?.signingRegion,
			regionRegex: partitionHash[partition].regionRegex,
			useFipsEndpoint
		});
		return {
			partition,
			signingService,
			hostname,
			...signingRegion && { signingRegion },
			...regionHash[resolvedRegion]?.signingService && { signingService: regionHash[resolvedRegion].signingService }
		};
	};
	var AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
	var AWS_REGION_ENV = "AWS_REGION";
	var AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
	var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
	var DEFAULTS_MODE_OPTIONS = [
		"in-region",
		"cross-region",
		"mobile",
		"standard",
		"legacy"
	];
	var IMDS_REGION_PATH = "/latest/meta-data/placement/region";
	var AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
	var AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
	var NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => {
			return env[AWS_DEFAULTS_MODE_ENV];
		},
		configFileSelector: (profile) => {
			return profile[AWS_DEFAULTS_MODE_CONFIG];
		},
		default: "legacy"
	};
	var resolveDefaultsModeConfig = ({ region = loadConfig(NODE_REGION_CONFIG_OPTIONS), defaultsMode = loadConfig(NODE_DEFAULTS_MODE_CONFIG_OPTIONS) } = {}) => memoize(async () => {
		const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
		switch (mode?.toLowerCase()) {
			case "auto": return resolveNodeDefaultsModeAuto(region);
			case "in-region":
			case "cross-region":
			case "mobile":
			case "standard":
			case "legacy": return Promise.resolve(mode?.toLocaleLowerCase());
			case void 0: return Promise.resolve("legacy");
			default: throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
		}
	});
	var resolveNodeDefaultsModeAuto = async (clientRegion) => {
		if (clientRegion) {
			const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
			const inferredRegion = await inferPhysicalRegion();
			if (!inferredRegion) return "standard";
			if (resolvedRegion === inferredRegion) return "in-region";
			else return "cross-region";
		}
		return "standard";
	};
	var inferPhysicalRegion = async () => {
		if (process.env[AWS_EXECUTION_ENV] && (process.env[AWS_REGION_ENV] || process.env[AWS_DEFAULT_REGION_ENV])) return process.env[AWS_REGION_ENV] ?? process.env[AWS_DEFAULT_REGION_ENV];
		if (!process.env[ENV_IMDS_DISABLED]) try {
			return (await imdsHttpGet({
				hostname: (await getImdsEndpoint()).hostname,
				path: IMDS_REGION_PATH
			})).toString();
		} catch (e) {}
	};
	var getImdsEndpoint = async () => {
		const envEndpoint = process.env.AWS_EC2_METADATA_SERVICE_ENDPOINT;
		if (envEndpoint) {
			const url = new URL(envEndpoint);
			return {
				hostname: url.hostname,
				path: url.pathname
			};
		}
		if (process.env.AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE === "IPv6") return {
			hostname: "fd00:ec2::254",
			path: "/"
		};
		return {
			hostname: "169.254.169.254",
			path: "/"
		};
	};
	var imdsHttpGet = async ({ hostname, path }) => {
		const { request } = __require("node:http");
		return new Promise((resolve, reject) => {
			const req = request({
				method: "GET",
				hostname: hostname.replace(/^\[(.+)]$/, "$1"),
				path,
				timeout: 1e3,
				signal: AbortSignal.timeout(1e3)
			});
			req.on("error", (err) => {
				reject(err);
				req.destroy();
			});
			req.on("timeout", () => {
				reject(/* @__PURE__ */ new Error("TimeoutError from instance metadata service"));
				req.destroy();
			});
			req.on("response", (res) => {
				const { statusCode = 400 } = res;
				if (statusCode < 200 || 300 <= statusCode) {
					reject(Object.assign(/* @__PURE__ */ new Error("Error response received from instance metadata service"), { statusCode }));
					req.destroy();
					return;
				}
				const chunks = [];
				res.on("data", (chunk) => chunks.push(chunk));
				res.on("end", () => {
					resolve(Buffer.concat(chunks));
					req.destroy();
				});
			});
			req.end();
		});
	};
	exports.CONFIG_PREFIX_SEPARATOR = CONFIG_PREFIX_SEPARATOR;
	exports.CONFIG_USE_DUALSTACK_ENDPOINT = CONFIG_USE_DUALSTACK_ENDPOINT;
	exports.CONFIG_USE_FIPS_ENDPOINT = CONFIG_USE_FIPS_ENDPOINT;
	exports.CredentialsProviderError = CredentialsProviderError;
	exports.DEFAULT_PROFILE = DEFAULT_PROFILE;
	exports.DEFAULT_USE_DUALSTACK_ENDPOINT = DEFAULT_USE_DUALSTACK_ENDPOINT;
	exports.DEFAULT_USE_FIPS_ENDPOINT = DEFAULT_USE_FIPS_ENDPOINT;
	exports.ENV_PROFILE = ENV_PROFILE;
	exports.ENV_USE_DUALSTACK_ENDPOINT = ENV_USE_DUALSTACK_ENDPOINT;
	exports.ENV_USE_FIPS_ENDPOINT = ENV_USE_FIPS_ENDPOINT;
	exports.NODE_REGION_CONFIG_FILE_OPTIONS = NODE_REGION_CONFIG_FILE_OPTIONS;
	exports.NODE_REGION_CONFIG_OPTIONS = NODE_REGION_CONFIG_OPTIONS;
	exports.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS;
	exports.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS;
	exports.ProviderError = ProviderError;
	exports.REGION_ENV_NAME = REGION_ENV_NAME;
	exports.REGION_INI_NAME = REGION_INI_NAME;
	exports.SelectorType = SelectorType;
	exports.TokenProviderError = TokenProviderError;
	exports.booleanSelector = booleanSelector;
	exports.chain = chain;
	exports.externalDataInterceptor = externalDataInterceptor;
	exports.fromStatic = fromStatic;
	exports.fromValue = fromValue;
	exports.getHomeDir = getHomeDir;
	exports.getProfileName = getProfileName;
	exports.getRegionInfo = getRegionInfo;
	exports.getSSOTokenFilepath = getSSOTokenFilepath;
	exports.getSSOTokenFromFile = getSSOTokenFromFile;
	exports.loadConfig = loadConfig;
	exports.loadSharedConfigFiles = loadSharedConfigFiles;
	exports.loadSsoSessionData = loadSsoSessionData;
	exports.memoize = memoize;
	exports.nodeDualstackConfigSelectors = nodeDualstackConfigSelectors;
	exports.nodeFipsConfigSelectors = nodeFipsConfigSelectors;
	exports.numberSelector = numberSelector;
	exports.parseKnownFiles = parseKnownFiles;
	exports.readFile = readFile;
	exports.resolveCustomEndpointsConfig = resolveCustomEndpointsConfig;
	exports.resolveDefaultsModeConfig = resolveDefaultsModeConfig;
	exports.resolveEndpointsConfig = resolveEndpointsConfig;
	exports.resolveRegionConfig = resolveRegionConfig;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/endpoints/index.js
var require_endpoints = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { CONFIG_PREFIX_SEPARATOR, loadConfig } = require_config();
	var { toEndpointV1, getSmithyContext, normalizeProvider, isValidHostLabel } = require_transport();
	exports.isValidHostLabel = isValidHostLabel;
	exports.middlewareEndpointToEndpointV1 = toEndpointV1;
	exports.toEndpointV1 = toEndpointV1;
	var { EndpointURLScheme } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
	var CONFIG_ENDPOINT_URL = "endpoint_url";
	var getEndpointUrlConfig = (serviceId) => ({
		environmentVariableSelector: (env) => {
			const serviceEndpointUrl = env[[ENV_ENDPOINT_URL, ...serviceId.split(" ").map((w) => w.toUpperCase())].join("_")];
			if (serviceEndpointUrl) return serviceEndpointUrl;
			const endpointUrl = env[ENV_ENDPOINT_URL];
			if (endpointUrl) return endpointUrl;
		},
		configFileSelector: (profile, config) => {
			if (config && profile.services) {
				const servicesSection = config[["services", profile.services].join(CONFIG_PREFIX_SEPARATOR)];
				if (servicesSection) {
					const endpointUrl = servicesSection[[serviceId.split(" ").map((w) => w.toLowerCase()).join("_"), CONFIG_ENDPOINT_URL].join(CONFIG_PREFIX_SEPARATOR)];
					if (endpointUrl) return endpointUrl;
				}
			}
			const endpointUrl = profile[CONFIG_ENDPOINT_URL];
			if (endpointUrl) return endpointUrl;
		},
		default: void 0
	});
	var getEndpointFromConfig = async (serviceId) => loadConfig(getEndpointUrlConfig(serviceId ?? ""))();
	var resolveParamsForS3 = async (endpointParams) => {
		const bucket = endpointParams?.Bucket || "";
		if (typeof endpointParams.Bucket === "string") endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
		if (isArnBucketName(bucket)) {
			if (endpointParams.ForcePathStyle === true) throw new Error("Path-style addressing cannot be used with ARN buckets");
		} else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) endpointParams.ForcePathStyle = true;
		if (endpointParams.DisableMultiRegionAccessPoints) {
			endpointParams.disableMultiRegionAccessPoints = true;
			endpointParams.DisableMRAP = true;
		}
		return endpointParams;
	};
	var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
	var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
	var DOTS_PATTERN = /\.\./;
	var isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
	var isArnBucketName = (bucketName) => {
		const [arn, partition, service, , , bucket] = bucketName.split(":");
		const isArn = arn === "arn" && bucketName.split(":").length >= 6;
		const isValidArn = Boolean(isArn && partition && service && bucket);
		if (isArn && !isValidArn) throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
		return isValidArn;
	};
	var createConfigValueProvider = (configKey, canonicalEndpointParamKey, config, isClientContextParam = false) => {
		const configProvider = async () => {
			let configValue;
			if (isClientContextParam) configValue = config.clientContextParams?.[configKey] ?? config[configKey] ?? config[canonicalEndpointParamKey];
			else configValue = config[configKey] ?? config[canonicalEndpointParamKey];
			if (typeof configValue === "function") return configValue();
			return configValue;
		};
		if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") return async () => {
			const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
			return credentials?.credentialScope ?? credentials?.CredentialScope;
		};
		if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") return async () => {
			const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
			return credentials?.accountId ?? credentials?.AccountId;
		};
		if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") return async () => {
			if (config.isCustomEndpoint === false) return;
			const endpoint = await configProvider();
			if (endpoint && typeof endpoint === "object") {
				if ("url" in endpoint) return endpoint.url.href;
				if ("hostname" in endpoint) {
					const { protocol, hostname, port, path } = endpoint;
					return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
				}
			}
			return endpoint;
		};
		return configProvider;
	};
	function bindGetEndpointFromInstructions(getEndpointFromConfig) {
		return async (commandInput, instructionsSupplier, clientConfig, context) => {
			if (!clientConfig.isCustomEndpoint) {
				let endpointFromConfig;
				if (clientConfig.serviceConfiguredEndpoint) endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
				else endpointFromConfig = await getEndpointFromConfig(clientConfig.serviceId);
				if (endpointFromConfig) {
					clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
					clientConfig.isCustomEndpoint = true;
				}
			}
			const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
			if (typeof clientConfig.endpointProvider !== "function") throw new Error("config.endpointProvider is not set.");
			const endpoint = clientConfig.endpointProvider(endpointParams, context);
			if (clientConfig.isCustomEndpoint && clientConfig.endpoint) {
				const customEndpoint = await clientConfig.endpoint();
				if (customEndpoint?.headers) {
					endpoint.headers ??= {};
					for (const [name, value] of Object.entries(customEndpoint.headers)) endpoint.headers[name] = Array.isArray(value) ? value : [value];
				}
			}
			return endpoint;
		};
	}
	var resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
		const endpointParams = {};
		const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
		for (const [name, instruction] of Object.entries(instructions)) switch (instruction.type) {
			case "staticContextParams":
				endpointParams[name] = instruction.value;
				break;
			case "contextParams":
				endpointParams[name] = commandInput[instruction.name];
				break;
			case "clientContextParams":
			case "builtInParams":
				endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig, instruction.type !== "builtInParams")();
				break;
			case "operationContextParams":
				endpointParams[name] = instruction.get(commandInput);
				break;
			default: throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
		}
		if (Object.keys(instructions).length === 0) Object.assign(endpointParams, clientConfig);
		if (String(clientConfig.serviceId).toLowerCase() === "s3") await resolveParamsForS3(endpointParams);
		return endpointParams;
	};
	function setFeature(context, feature, value) {
		if (!context.__smithy_context) context.__smithy_context = { features: {} };
		else if (!context.__smithy_context.features) context.__smithy_context.features = {};
		context.__smithy_context.features[feature] = value;
	}
	function bindEndpointMiddleware(getEndpointFromConfig) {
		const getEndpointFromInstructions = bindGetEndpointFromInstructions(getEndpointFromConfig);
		return ({ config, instructions }) => {
			return (next, context) => async (args) => {
				if (config.isCustomEndpoint) setFeature(context, "ENDPOINT_OVERRIDE", "N");
				const endpoint = await getEndpointFromInstructions(args.input, { getEndpointParameterInstructions() {
					return instructions;
				} }, { ...config }, context);
				context.endpointV2 = endpoint;
				context.authSchemes = endpoint.properties?.authSchemes;
				const authScheme = context.authSchemes?.[0];
				if (authScheme) {
					context["signing_region"] = authScheme.signingRegion;
					context["signing_service"] = authScheme.signingName;
					const httpAuthOption = getSmithyContext(context)?.selectedHttpAuthScheme?.httpAuthOption;
					if (httpAuthOption) httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
						signing_region: authScheme.signingRegion,
						signingRegion: authScheme.signingRegion,
						signing_service: authScheme.signingName,
						signingName: authScheme.signingName,
						signingRegionSet: authScheme.signingRegionSet
					}, authScheme.properties);
				}
				return next({ ...args });
			};
		};
	}
	var endpointMiddlewareOptions = {
		step: "serialize",
		tags: [
			"ENDPOINT_PARAMETERS",
			"ENDPOINT_V2",
			"ENDPOINT"
		],
		name: "endpointV2Middleware",
		override: true,
		relation: "before",
		toMiddleware: { name: "serializerMiddleware" }.name
	};
	function bindGetEndpointPlugin(getEndpointFromConfig) {
		const endpointMiddleware = bindEndpointMiddleware(getEndpointFromConfig);
		return (config, instructions) => ({ applyToStack: (clientStack) => {
			clientStack.addRelativeTo(endpointMiddleware({
				config,
				instructions
			}), endpointMiddlewareOptions);
		} });
	}
	function bindResolveEndpointConfig(getEndpointFromConfig) {
		return (input) => {
			const tls = input.tls ?? true;
			const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
			const resolvedConfig = Object.assign(input, {
				endpoint: endpoint != null ? async () => toEndpointV1(await normalizeProvider(endpoint)()) : void 0,
				tls,
				isCustomEndpoint: !!endpoint,
				useDualstackEndpoint: normalizeProvider(useDualstackEndpoint ?? false),
				useFipsEndpoint: normalizeProvider(useFipsEndpoint ?? false)
			});
			let configuredEndpointPromise = void 0;
			resolvedConfig.serviceConfiguredEndpoint = async () => {
				if (input.serviceId && !configuredEndpointPromise) configuredEndpointPromise = getEndpointFromConfig(input.serviceId);
				return configuredEndpointPromise;
			};
			return resolvedConfig;
		};
	}
	var BinaryDecisionDiagram = class BinaryDecisionDiagram {
		nodes;
		root;
		conditions;
		results;
		constructor(bdd, root, conditions, results) {
			this.nodes = bdd;
			this.root = root;
			this.conditions = conditions;
			this.results = results;
		}
		static from(bdd, root, conditions, results) {
			return new BinaryDecisionDiagram(bdd, root, conditions, results);
		}
	};
	var EndpointCache = class {
		capacity;
		data = /* @__PURE__ */ new Map();
		parameters = [];
		constructor({ size, params }) {
			this.capacity = size ?? 50;
			if (params) this.parameters = params;
		}
		get(endpointParams, resolver) {
			const key = this.hash(endpointParams);
			if (key === false) return resolver();
			if (!this.data.has(key)) {
				if (this.data.size > this.capacity + 10) {
					const keys = this.data.keys();
					let i = 0;
					while (true) {
						const { value, done } = keys.next();
						this.data.delete(value);
						if (done || ++i > 10) break;
					}
				}
				this.data.set(key, resolver());
			}
			return this.data.get(key);
		}
		size() {
			return this.data.size;
		}
		hash(endpointParams) {
			let buffer = "";
			const { parameters } = this;
			if (parameters.length === 0) return false;
			for (const param of parameters) {
				const val = String(endpointParams[param] ?? "");
				if (val.includes("|;")) return false;
				buffer += val + "|;";
			}
			return buffer;
		}
	};
	var EndpointError = class extends Error {
		constructor(message) {
			super(message);
			this.name = "EndpointError";
		}
	};
	var debugId = "endpoints";
	function toDebugString(input) {
		if (typeof input !== "object" || input == null) return input;
		if ("ref" in input) return `$${toDebugString(input.ref)}`;
		if ("fn" in input) return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
		return JSON.stringify(input, null, 2);
	}
	var customEndpointFunctions = {};
	var booleanEquals = (value1, value2) => value1 === value2;
	function coalesce(...args) {
		for (const arg of args) if (arg != null) return arg;
	}
	var getAttrPathList = (path) => {
		const parts = path.split(".");
		const pathList = [];
		for (const part of parts) {
			const squareBracketIndex = part.indexOf("[");
			if (squareBracketIndex !== -1) {
				if (part.indexOf("]") !== part.length - 1) throw new EndpointError(`Path: '${path}' does not end with ']'`);
				const arrayIndex = part.slice(squareBracketIndex + 1, -1);
				if (Number.isNaN(parseInt(arrayIndex))) throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
				if (squareBracketIndex !== 0) pathList.push(part.slice(0, squareBracketIndex));
				pathList.push(arrayIndex);
			} else pathList.push(part);
		}
		return pathList;
	};
	var getAttr = (value, path) => getAttrPathList(path).reduce((acc, index) => {
		if (typeof acc !== "object") throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
		else if (Array.isArray(acc)) {
			const i = parseInt(index);
			return acc[i < 0 ? acc.length + i : i];
		}
		return acc[index];
	}, value);
	var isSet = (value) => value != null;
	function ite(condition, trueValue, falseValue) {
		return condition ? trueValue : falseValue;
	}
	var not = (value) => !value;
	var IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
	var isIpAddress = (value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]");
	var DEFAULT_PORTS = {
		[EndpointURLScheme.HTTP]: 80,
		[EndpointURLScheme.HTTPS]: 443
	};
	var parseURL = (value) => {
		const whatwgURL = (() => {
			try {
				if (value instanceof URL) return value;
				if (typeof value === "object" && "hostname" in value) {
					const { hostname, port, protocol = "", path = "", query = {} } = value;
					const url = new URL(`${protocol}//${hostname}${port ? `:${port}` : ""}${path}`);
					url.search = Object.entries(query).map(([k, v]) => `${k}=${v}`).join("&");
					return url;
				}
				return new URL(value);
			} catch (error) {
				return null;
			}
		})();
		if (!whatwgURL) {
			console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
			return null;
		}
		const urlString = whatwgURL.href;
		const { host, hostname, pathname, protocol, search } = whatwgURL;
		if (search) return null;
		const scheme = protocol.slice(0, -1);
		if (!Object.values(EndpointURLScheme).includes(scheme)) return null;
		const isIp = isIpAddress(hostname);
		return {
			scheme,
			authority: `${host}${urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`) ? `:${DEFAULT_PORTS[scheme]}` : ``}`,
			path: pathname,
			normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
			isIp
		};
	};
	function split(value, delimiter, limit) {
		if (limit === 1) return [value];
		if (value === "") return [""];
		const parts = value.split(delimiter);
		if (limit === 0) return parts;
		return parts.slice(0, limit - 1).concat(parts.slice(1).join(delimiter));
	}
	var stringEquals = (value1, value2) => value1 === value2;
	var substring = (input, start, stop, reverse) => {
		if (input == null || start >= stop || input.length < stop || /[^\u0000-\u007f]/.test(input)) return null;
		if (!reverse) return input.substring(start, stop);
		return input.substring(input.length - stop, input.length - start);
	};
	var uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
	var endpointFunctions = {
		booleanEquals,
		coalesce,
		getAttr,
		isSet,
		isValidHostLabel,
		ite,
		not,
		parseURL,
		split,
		stringEquals,
		substring,
		uriEncode
	};
	var evaluateTemplate = (template, options) => {
		const evaluatedTemplateArr = [];
		const { referenceRecord, endpointParams } = options;
		let currentIndex = 0;
		while (currentIndex < template.length) {
			const openingBraceIndex = template.indexOf("{", currentIndex);
			if (openingBraceIndex === -1) {
				evaluatedTemplateArr.push(template.slice(currentIndex));
				break;
			}
			evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
			const closingBraceIndex = template.indexOf("}", openingBraceIndex);
			if (closingBraceIndex === -1) {
				evaluatedTemplateArr.push(template.slice(openingBraceIndex));
				break;
			}
			if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
				evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
				currentIndex = closingBraceIndex + 2;
			}
			const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
			if (parameterName.includes("#")) {
				const [refName, attrName] = parameterName.split("#");
				evaluatedTemplateArr.push(getAttr(referenceRecord[refName] ?? endpointParams[refName], attrName));
			} else evaluatedTemplateArr.push(referenceRecord[parameterName] ?? endpointParams[parameterName]);
			currentIndex = closingBraceIndex + 1;
		}
		return evaluatedTemplateArr.join("");
	};
	var getReferenceValue = ({ ref }, options) => {
		return options.referenceRecord[ref] ?? options.endpointParams[ref];
	};
	var evaluateExpression = (obj, keyName, options) => {
		if (typeof obj === "string") return evaluateTemplate(obj, options);
		else if (obj["fn"]) return group$2.callFunction(obj, options);
		else if (obj["ref"]) return getReferenceValue(obj, options);
		throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
	};
	var callFunction = ({ fn, argv }, options) => {
		const evaluatedArgs = Array(argv.length);
		for (let i = 0; i < evaluatedArgs.length; ++i) {
			const arg = argv[i];
			if (typeof arg === "boolean" || typeof arg === "number") evaluatedArgs[i] = arg;
			else evaluatedArgs[i] = group$2.evaluateExpression(arg, "arg", options);
		}
		const namespaceSeparatorIndex = fn.indexOf(".");
		if (namespaceSeparatorIndex !== -1) {
			const customFunction = customEndpointFunctions[fn.slice(0, namespaceSeparatorIndex)]?.[fn.slice(namespaceSeparatorIndex + 1)];
			if (typeof customFunction === "function") return customFunction(...evaluatedArgs);
		}
		const callable = endpointFunctions[fn];
		if (typeof callable === "function") return callable(...evaluatedArgs);
		throw new Error(`function ${fn} not loaded in endpointFunctions.`);
	};
	var group$2 = {
		evaluateExpression,
		callFunction
	};
	var evaluateCondition = (condition, options) => {
		const { assign } = condition;
		if (assign && assign in options.referenceRecord) throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
		const value = callFunction(condition, options);
		options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(condition)} = ${toDebugString(value)}`);
		const result = value === "" ? true : !!value;
		if (assign != null) return {
			result,
			toAssign: {
				name: assign,
				value
			}
		};
		return { result };
	};
	var getEndpointHeaders = (headers, options) => Object.entries(headers ?? {}).reduce((acc, [headerKey, headerVal]) => {
		acc[headerKey] = headerVal.map((headerValEntry) => {
			const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
			if (typeof processedExpr !== "string") throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
			return processedExpr;
		});
		return acc;
	}, {});
	var getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => {
		acc[propertyKey] = group$1.getEndpointProperty(propertyVal, options);
		return acc;
	}, {});
	var getEndpointProperty = (property, options) => {
		if (Array.isArray(property)) return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
		switch (typeof property) {
			case "string": return evaluateTemplate(property, options);
			case "object":
				if (property === null) throw new EndpointError(`Unexpected endpoint property: ${property}`);
				return group$1.getEndpointProperties(property, options);
			case "boolean": return property;
			default: throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
		}
	};
	var group$1 = {
		getEndpointProperty,
		getEndpointProperties
	};
	var getEndpointUrl = (endpointUrl, options) => {
		const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
		if (typeof expression === "string") try {
			return new URL(expression);
		} catch (error) {
			console.error(`Failed to construct URL with ${expression}`, error);
			throw error;
		}
		throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
	};
	var RESULT = 1e8;
	var decideEndpoint = (bdd, options) => {
		const { nodes, root, results, conditions } = bdd;
		let ref = root;
		const referenceRecord = {};
		const closure = {
			referenceRecord,
			endpointParams: options.endpointParams,
			logger: options.logger
		};
		while (ref !== 1 && ref !== -1 && ref < RESULT) {
			const node_i = 3 * (Math.abs(ref) - 1);
			const [condition_i, highRef, lowRef] = [
				nodes[node_i],
				nodes[node_i + 1],
				nodes[node_i + 2]
			];
			const [fn, argv, assign] = conditions[condition_i];
			const evaluation = evaluateCondition({
				fn,
				assign,
				argv
			}, closure);
			if (evaluation.toAssign) {
				const { name, value } = evaluation.toAssign;
				referenceRecord[name] = value;
			}
			ref = ref >= 0 === evaluation.result ? highRef : lowRef;
		}
		if (ref >= RESULT) {
			const result = results[ref - RESULT];
			if (result[0] === -1) {
				const [, errorExpression] = result;
				throw new EndpointError(evaluateExpression(errorExpression, "Error", closure));
			}
			const [url, properties, headers] = result;
			return {
				url: getEndpointUrl(url, closure),
				properties: getEndpointProperties(properties, closure),
				headers: getEndpointHeaders(headers ?? {}, closure)
			};
		}
		throw new EndpointError(`No matching endpoint.`);
	};
	var evaluateConditions = (conditions = [], options) => {
		const conditionsReferenceRecord = {};
		const conditionOptions = {
			...options,
			referenceRecord: { ...options.referenceRecord }
		};
		let didAssign = false;
		for (const condition of conditions) {
			const { result, toAssign } = evaluateCondition(condition, conditionOptions);
			if (!result) return { result };
			if (toAssign) {
				didAssign = true;
				conditionsReferenceRecord[toAssign.name] = toAssign.value;
				conditionOptions.referenceRecord[toAssign.name] = toAssign.value;
				options.logger?.debug?.(`${debugId} assign: ${toAssign.name} := ${toDebugString(toAssign.value)}`);
			}
		}
		if (didAssign) return {
			result: true,
			referenceRecord: conditionsReferenceRecord
		};
		return { result: true };
	};
	var evaluateEndpointRule = (endpointRule, options) => {
		const { conditions, endpoint } = endpointRule;
		const { result, referenceRecord } = evaluateConditions(conditions, options);
		if (!result) return;
		const endpointRuleOptions = referenceRecord ? {
			...options,
			referenceRecord: {
				...options.referenceRecord,
				...referenceRecord
			}
		} : options;
		const { url, properties, headers } = endpoint;
		options.logger?.debug?.(`${debugId} Resolving endpoint from template: ${toDebugString(endpoint)}`);
		const endpointToReturn = { url: getEndpointUrl(url, endpointRuleOptions) };
		if (headers != null) endpointToReturn.headers = getEndpointHeaders(headers, endpointRuleOptions);
		if (properties != null) endpointToReturn.properties = getEndpointProperties(properties, endpointRuleOptions);
		return endpointToReturn;
	};
	var evaluateErrorRule = (errorRule, options) => {
		const { conditions, error } = errorRule;
		const { result, referenceRecord } = evaluateConditions(conditions, options);
		if (!result) return;
		throw new EndpointError(evaluateExpression(error, "Error", referenceRecord ? {
			...options,
			referenceRecord: {
				...options.referenceRecord,
				...referenceRecord
			}
		} : options));
	};
	var evaluateRules = (rules, options) => {
		for (const rule of rules) if (rule.type === "endpoint") {
			const endpointOrUndefined = evaluateEndpointRule(rule, options);
			if (endpointOrUndefined) return endpointOrUndefined;
		} else if (rule.type === "error") evaluateErrorRule(rule, options);
		else if (rule.type === "tree") {
			const endpointOrUndefined = group.evaluateTreeRule(rule, options);
			if (endpointOrUndefined) return endpointOrUndefined;
		} else throw new EndpointError(`Unknown endpoint rule: ${rule}`);
		throw new EndpointError(`Rules evaluation failed`);
	};
	var evaluateTreeRule = (treeRule, options) => {
		const { conditions, rules } = treeRule;
		const { result, referenceRecord } = evaluateConditions(conditions, options);
		if (!result) return;
		const treeRuleOptions = referenceRecord ? {
			...options,
			referenceRecord: {
				...options.referenceRecord,
				...referenceRecord
			}
		} : options;
		return group.evaluateRules(rules, treeRuleOptions);
	};
	var group = {
		evaluateRules,
		evaluateTreeRule
	};
	var resolveEndpoint = (ruleSetObject, options) => {
		const { endpointParams, logger } = options;
		const { parameters, rules } = ruleSetObject;
		options.logger?.debug?.(`${debugId} Initial EndpointParams: ${toDebugString(endpointParams)}`);
		for (const paramKey in parameters) {
			const parameter = parameters[paramKey];
			const endpointParam = endpointParams[paramKey];
			if (endpointParam == null && parameter.default != null) {
				endpointParams[paramKey] = parameter.default;
				continue;
			}
			if (parameter.required && endpointParam == null) throw new EndpointError(`Missing required parameter: '${paramKey}'`);
		}
		const endpoint = evaluateRules(rules, {
			endpointParams,
			logger,
			referenceRecord: {}
		});
		options.logger?.debug?.(`${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
		return endpoint;
	};
	var resolveEndpointRequiredConfig = (input) => {
		const { endpoint } = input;
		if (endpoint === void 0) input.endpoint = async () => {
			throw new Error("@smithy/middleware-endpoint: (default endpointRuleSet) endpoint is not set - you must configure an endpoint.");
		};
		return input;
	};
	var getEndpointFromInstructions = bindGetEndpointFromInstructions(getEndpointFromConfig);
	var resolveEndpointConfig = bindResolveEndpointConfig(getEndpointFromConfig);
	var endpointMiddleware = bindEndpointMiddleware(getEndpointFromConfig);
	var getEndpointPlugin = bindGetEndpointPlugin(getEndpointFromConfig);
	exports.BinaryDecisionDiagram = BinaryDecisionDiagram;
	exports.EndpointCache = EndpointCache;
	exports.EndpointError = EndpointError;
	exports.customEndpointFunctions = customEndpointFunctions;
	exports.decideEndpoint = decideEndpoint;
	exports.endpointMiddleware = endpointMiddleware;
	exports.endpointMiddlewareOptions = endpointMiddlewareOptions;
	exports.getEndpointFromInstructions = getEndpointFromInstructions;
	exports.getEndpointPlugin = getEndpointPlugin;
	exports.isIpAddress = isIpAddress;
	exports.resolveEndpoint = resolveEndpoint;
	exports.resolveEndpointConfig = resolveEndpointConfig;
	exports.resolveEndpointRequiredConfig = resolveEndpointRequiredConfig;
	exports.resolveParams = resolveParams;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/serde/index.js
var require_serde = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { createHmac, createHash, getRandomValues } = __require("node:crypto");
	var { ReadStream, lstatSync, fstatSync } = __require("node:fs");
	var { HttpResponse } = require_transport();
	var { toEndpointV1 } = require_endpoints();
	var { Duplex, Readable: Readable$2, Writable, PassThrough } = __require("node:stream");
	var isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
	var fromArrayBuffer = (input, offset = 0, length = input.byteLength - offset) => {
		if (!isArrayBuffer(input)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
		return Buffer.from(input, offset, length);
	};
	var fromString = (input, encoding) => {
		if (typeof input !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
		return encoding ? Buffer.from(input, encoding) : Buffer.from(input);
	};
	var BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
	var fromBase64$1 = (input) => {
		if (input.length * 3 % 4 !== 0) throw new TypeError(`Incorrect padding on base64 string.`);
		if (!BASE64_REGEX.exec(input)) throw new TypeError(`Invalid base64 string.`);
		const buffer = fromString(input, "base64");
		return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
	};
	var fromUtf8$1 = (input) => {
		const buf = fromString(input, "utf8");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
	};
	var toBase64$1 = (_input) => {
		let input;
		if (typeof _input === "string") input = fromUtf8$1(_input);
		else input = _input;
		if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
		return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
	};
	function bindUint8ArrayBlobAdapter(toUtf8, fromUtf8, toBase64, fromBase64) {
		return class Uint8ArrayBlobAdapter extends Uint8Array {
			static fromString(source, encoding = "utf-8") {
				if (typeof source === "string") {
					if (encoding === "base64") return Uint8ArrayBlobAdapter.mutate(fromBase64(source));
					return Uint8ArrayBlobAdapter.mutate(fromUtf8(source));
				}
				throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
			}
			static mutate(source) {
				Object.setPrototypeOf(source, Uint8ArrayBlobAdapter.prototype);
				return source;
			}
			transformToString(encoding = "utf-8") {
				if (encoding === "base64") return toBase64(this);
				return toUtf8(this);
			}
		};
	}
	var toUtf8$1 = (input) => {
		if (typeof input === "string") return input;
		if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
		return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
	};
	var decimalToHex = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
	function bindV4(getRandomValues) {
		if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return () => crypto.randomUUID();
		return () => {
			const rnds = new Uint8Array(16);
			getRandomValues(rnds);
			rnds[6] = rnds[6] & 15 | 64;
			rnds[8] = rnds[8] & 63 | 128;
			return decimalToHex[rnds[0]] + decimalToHex[rnds[1]] + decimalToHex[rnds[2]] + decimalToHex[rnds[3]] + "-" + decimalToHex[rnds[4]] + decimalToHex[rnds[5]] + "-" + decimalToHex[rnds[6]] + decimalToHex[rnds[7]] + "-" + decimalToHex[rnds[8]] + decimalToHex[rnds[9]] + "-" + decimalToHex[rnds[10]] + decimalToHex[rnds[11]] + decimalToHex[rnds[12]] + decimalToHex[rnds[13]] + decimalToHex[rnds[14]] + decimalToHex[rnds[15]];
		};
	}
	var copyDocumentWithTransform = (source, schemaRef, transform = (_) => _) => source;
	var parseBoolean = (value) => {
		switch (value) {
			case "true": return true;
			case "false": return false;
			default: throw new Error(`Unable to parse boolean value "${value}"`);
		}
	};
	var expectBoolean = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "number") {
			if (value === 0 || value === 1) logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
			if (value === 0) return false;
			if (value === 1) return true;
		}
		if (typeof value === "string") {
			const lower = value.toLowerCase();
			if (lower === "false" || lower === "true") logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
			if (lower === "false") return false;
			if (lower === "true") return true;
		}
		if (typeof value === "boolean") return value;
		throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
	};
	var expectNumber = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "string") {
			const parsed = parseFloat(value);
			if (!Number.isNaN(parsed)) {
				if (String(parsed) !== String(value)) logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
				return parsed;
			}
		}
		if (typeof value === "number") return value;
		throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
	};
	var MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
	var expectFloat32 = (value) => {
		const expected = expectNumber(value);
		if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
			if (Math.abs(expected) > MAX_FLOAT) throw new TypeError(`Expected 32-bit float, got ${value}`);
		}
		return expected;
	};
	var expectLong = (value) => {
		if (value === null || value === void 0) return;
		if (Number.isInteger(value) && !Number.isNaN(value)) return value;
		throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
	};
	var expectInt = expectLong;
	var expectInt32 = (value) => expectSizedInt(value, 32);
	var expectShort = (value) => expectSizedInt(value, 16);
	var expectByte = (value) => expectSizedInt(value, 8);
	var expectSizedInt = (value, size) => {
		const expected = expectLong(value);
		if (expected !== void 0 && castInt(expected, size) !== expected) throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
		return expected;
	};
	var castInt = (value, size) => {
		switch (size) {
			case 32: return Int32Array.of(value)[0];
			case 16: return Int16Array.of(value)[0];
			case 8: return Int8Array.of(value)[0];
		}
	};
	var expectNonNull = (value, location) => {
		if (value === null || value === void 0) {
			if (location) throw new TypeError(`Expected a non-null value for ${location}`);
			throw new TypeError("Expected a non-null value");
		}
		return value;
	};
	var expectObject = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "object" && !Array.isArray(value)) return value;
		throw new TypeError(`Expected object, got ${Array.isArray(value) ? "array" : typeof value}: ${value}`);
	};
	var expectString = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "string") return value;
		if ([
			"boolean",
			"number",
			"bigint"
		].includes(typeof value)) {
			logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
			return String(value);
		}
		throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
	};
	var expectUnion = (value) => {
		if (value === null || value === void 0) return;
		const asObject = expectObject(value);
		const setKeys = [];
		for (const k in asObject) if (asObject[k] != null) setKeys.push(k);
		if (setKeys.length === 0) throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
		if (setKeys.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
		return asObject;
	};
	var strictParseDouble = (value) => {
		if (typeof value == "string") return expectNumber(parseNumber(value));
		return expectNumber(value);
	};
	var strictParseFloat = strictParseDouble;
	var strictParseFloat32 = (value) => {
		if (typeof value == "string") return expectFloat32(parseNumber(value));
		return expectFloat32(value);
	};
	var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
	var parseNumber = (value) => {
		const matches = value.match(NUMBER_REGEX);
		if (matches === null || matches[0].length !== value.length) throw new TypeError(`Expected real number, got implicit NaN`);
		return parseFloat(value);
	};
	var limitedParseDouble = (value) => {
		if (typeof value == "string") return parseFloatString(value);
		return expectNumber(value);
	};
	var handleFloat = limitedParseDouble;
	var limitedParseFloat = limitedParseDouble;
	var limitedParseFloat32 = (value) => {
		if (typeof value == "string") return parseFloatString(value);
		return expectFloat32(value);
	};
	var parseFloatString = (value) => {
		switch (value) {
			case "NaN": return NaN;
			case "Infinity": return Infinity;
			case "-Infinity": return -Infinity;
			default: throw new Error(`Unable to parse float value: ${value}`);
		}
	};
	var strictParseLong = (value) => {
		if (typeof value === "string") return expectLong(parseNumber(value));
		return expectLong(value);
	};
	var strictParseInt = strictParseLong;
	var strictParseInt32 = (value) => {
		if (typeof value === "string") return expectInt32(parseNumber(value));
		return expectInt32(value);
	};
	var strictParseShort = (value) => {
		if (typeof value === "string") return expectShort(parseNumber(value));
		return expectShort(value);
	};
	var strictParseByte = (value) => {
		if (typeof value === "string") return expectByte(parseNumber(value));
		return expectByte(value);
	};
	var stackTraceWarning = (message) => {
		return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s) => !s.includes("stackTraceWarning")).join("\n");
	};
	var logger = { warn: console.warn };
	var DAYS = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	];
	var MONTHS = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	function dateToUtcString(date) {
		const year = date.getUTCFullYear();
		const month = date.getUTCMonth();
		const dayOfWeek = date.getUTCDay();
		const dayOfMonthInt = date.getUTCDate();
		const hoursInt = date.getUTCHours();
		const minutesInt = date.getUTCMinutes();
		const secondsInt = date.getUTCSeconds();
		const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
		const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
		const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
		const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
		return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
	}
	var RFC3339 = /* @__PURE__ */ new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
	var parseRfc3339DateTime = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
		const match = RFC3339.exec(value);
		if (!match) throw new TypeError("Invalid RFC-3339 date-time value");
		const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
		return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseDateValue(monthStr, "month", 1, 12), parseDateValue(dayStr, "day", 1, 31), {
			hours,
			minutes,
			seconds,
			fractionalMilliseconds
		});
	};
	var RFC3339_WITH_OFFSET$1 = /* @__PURE__ */ new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
	var parseRfc3339DateTimeWithOffset = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
		const match = RFC3339_WITH_OFFSET$1.exec(value);
		if (!match) throw new TypeError("Invalid RFC-3339 date-time value");
		const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
		const date = buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseDateValue(monthStr, "month", 1, 12), parseDateValue(dayStr, "day", 1, 31), {
			hours,
			minutes,
			seconds,
			fractionalMilliseconds
		});
		if (offsetStr.toUpperCase() != "Z") date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
		return date;
	};
	var IMF_FIXDATE$1 = /* @__PURE__ */ new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
	var RFC_850_DATE$1 = /* @__PURE__ */ new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
	var ASC_TIME$1 = /* @__PURE__ */ new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
	var parseRfc7231DateTime = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
		let match = IMF_FIXDATE$1.exec(value);
		if (match) {
			const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
			return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
				hours,
				minutes,
				seconds,
				fractionalMilliseconds
			});
		}
		match = RFC_850_DATE$1.exec(value);
		if (match) {
			const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
			return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
				hours,
				minutes,
				seconds,
				fractionalMilliseconds
			}));
		}
		match = ASC_TIME$1.exec(value);
		if (match) {
			const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
			return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), {
				hours,
				minutes,
				seconds,
				fractionalMilliseconds
			});
		}
		throw new TypeError("Invalid RFC-7231 date-time value");
	};
	var parseEpochTimestamp = (value) => {
		if (value === null || value === void 0) return;
		let valueAsDouble;
		if (typeof value === "number") valueAsDouble = value;
		else if (typeof value === "string") valueAsDouble = strictParseDouble(value);
		else if (typeof value === "object" && value.tag === 1) valueAsDouble = value.value;
		else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
		if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
		return new Date(Math.round(valueAsDouble * 1e3));
	};
	var buildDate = (year, month, day, time) => {
		const adjustedMonth = month - 1;
		validateDayOfMonth(year, adjustedMonth, day);
		return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
	};
	var parseTwoDigitYear = (value) => {
		const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
		const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
		if (valueInThisCentury < thisYear) return valueInThisCentury + 100;
		return valueInThisCentury;
	};
	var FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
	var adjustRfc850Year = (input) => {
		if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
		return input;
	};
	var parseMonthByShortName = (value) => {
		const monthIdx = MONTHS.indexOf(value);
		if (monthIdx < 0) throw new TypeError(`Invalid month: ${value}`);
		return monthIdx + 1;
	};
	var DAYS_IN_MONTH = [
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	var validateDayOfMonth = (year, month, day) => {
		let maxDays = DAYS_IN_MONTH[month];
		if (month === 1 && isLeapYear(year)) maxDays = 29;
		if (day > maxDays) throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
	};
	var isLeapYear = (year) => {
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	};
	var parseDateValue = (value, type, lower, upper) => {
		const dateVal = strictParseByte(stripLeadingZeroes(value));
		if (dateVal < lower || dateVal > upper) throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
		return dateVal;
	};
	var parseMilliseconds = (value) => {
		if (value === null || value === void 0) return 0;
		return strictParseFloat32("0." + value) * 1e3;
	};
	var parseOffsetToMilliseconds = (value) => {
		const directionStr = value[0];
		let direction = 1;
		if (directionStr == "+") direction = 1;
		else if (directionStr == "-") direction = -1;
		else throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
		const hour = Number(value.substring(1, 3));
		const minute = Number(value.substring(4, 6));
		return direction * (hour * 60 + minute) * 60 * 1e3;
	};
	var stripLeadingZeroes = (value) => {
		let idx = 0;
		while (idx < value.length - 1 && value.charAt(idx) === "0") idx++;
		if (idx === 0) return value;
		return value.slice(idx);
	};
	var LazyJsonString = function LazyJsonString(val) {
		return Object.assign(new String(val), {
			deserializeJSON() {
				return JSON.parse(String(val));
			},
			toString() {
				return String(val);
			},
			toJSON() {
				return String(val);
			}
		});
	};
	LazyJsonString.from = (object) => {
		if (object && typeof object === "object" && (object instanceof LazyJsonString || "deserializeJSON" in object)) return object;
		else if (typeof object === "string" || Object.getPrototypeOf(object) === String.prototype) return LazyJsonString(String(object));
		return LazyJsonString(JSON.stringify(object));
	};
	LazyJsonString.fromObject = LazyJsonString.from;
	function quoteHeader(part) {
		if (part.includes(",") || part.includes("\"")) part = `"${part.replace(/"/g, "\\\"")}"`;
		return part;
	}
	var ddd = `(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?`;
	var mmm = `(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
	var time = `(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?`;
	var date = `(\\d?\\d)`;
	var year = `(\\d{4})`;
	var RFC3339_WITH_OFFSET = /* @__PURE__ */ new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/);
	var IMF_FIXDATE = new RegExp(`^${ddd}, ${date} ${mmm} ${year} ${time} GMT$`);
	var RFC_850_DATE = new RegExp(`^${ddd}, ${date}-${mmm}-(\\d\\d) ${time} GMT$`);
	var ASC_TIME = new RegExp(`^${ddd} ${mmm} ( [1-9]|\\d\\d) ${time} ${year}$`);
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	var _parseEpochTimestamp = (value) => {
		if (value == null) return;
		let num = NaN;
		if (typeof value === "number") num = value;
		else if (typeof value === "string") {
			if (!/^-?\d*\.?\d+$/.test(value)) throw new TypeError(`parseEpochTimestamp - numeric string invalid.`);
			num = Number.parseFloat(value);
		} else if (typeof value === "object" && value.tag === 1) num = value.value;
		if (isNaN(num) || Math.abs(num) === Infinity) throw new TypeError("Epoch timestamps must be valid finite numbers.");
		return new Date(Math.round(num * 1e3));
	};
	var _parseRfc3339DateTimeWithOffset = (value) => {
		if (value == null) return;
		if (typeof value !== "string") throw new TypeError("RFC3339 timestamps must be strings");
		const matches = RFC3339_WITH_OFFSET.exec(value);
		if (!matches) throw new TypeError(`Invalid RFC3339 timestamp format ${value}`);
		const [, yearStr, monthStr, dayStr, hours, minutes, seconds, , ms, offsetStr] = matches;
		range(monthStr, 1, 12);
		range(dayStr, 1, 31);
		range(hours, 0, 23);
		range(minutes, 0, 59);
		range(seconds, 0, 60);
		const date = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr), Number(hours), Number(minutes), Number(seconds), Number(ms) ? Math.round(parseFloat(`0.${ms}`) * 1e3) : 0));
		date.setUTCFullYear(Number(yearStr));
		if (offsetStr.toUpperCase() != "Z") {
			const [, sign, offsetH, offsetM] = /([+-])(\d\d):(\d\d)/.exec(offsetStr) || [
				void 0,
				"+",
				0,
				0
			];
			const scalar = sign === "-" ? 1 : -1;
			date.setTime(date.getTime() + scalar * (Number(offsetH) * 60 * 60 * 1e3 + Number(offsetM) * 60 * 1e3));
		}
		return date;
	};
	var _parseRfc7231DateTime = (value) => {
		if (value == null) return;
		if (typeof value !== "string") throw new TypeError("RFC7231 timestamps must be strings.");
		let day;
		let month;
		let year;
		let hour;
		let minute;
		let second;
		let fraction;
		let matches;
		if (matches = IMF_FIXDATE.exec(value)) [, day, month, year, hour, minute, second, fraction] = matches;
		else if (matches = RFC_850_DATE.exec(value)) {
			[, day, month, year, hour, minute, second, fraction] = matches;
			year = (Number(year) + 1900).toString();
		} else if (matches = ASC_TIME.exec(value)) [, month, day, hour, minute, second, fraction, year] = matches;
		if (year && second) {
			const timestamp = Date.UTC(Number(year), months.indexOf(month), Number(day), Number(hour), Number(minute), Number(second), fraction ? Math.round(parseFloat(`0.${fraction}`) * 1e3) : 0);
			range(day, 1, 31);
			range(hour, 0, 23);
			range(minute, 0, 59);
			range(second, 0, 60);
			const date = new Date(timestamp);
			date.setUTCFullYear(Number(year));
			return date;
		}
		throw new TypeError(`Invalid RFC7231 date-time value ${value}.`);
	};
	function range(v, min, max) {
		const _v = Number(v);
		if (_v < min || _v > max) throw new Error(`Value ${_v} out of range [${min}, ${max}]`);
	}
	function splitEvery(value, delimiter, numDelimiters) {
		if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
		const segments = value.split(delimiter);
		if (numDelimiters === 1) return segments;
		const compoundSegments = [];
		let currentSegment = "";
		for (let i = 0; i < segments.length; i++) {
			if (currentSegment === "") currentSegment = segments[i];
			else currentSegment += delimiter + segments[i];
			if ((i + 1) % numDelimiters === 0) {
				compoundSegments.push(currentSegment);
				currentSegment = "";
			}
		}
		if (currentSegment !== "") compoundSegments.push(currentSegment);
		return compoundSegments;
	}
	var splitHeader = (value) => {
		const z = value.length;
		const values = [];
		let withinQuotes = false;
		let prevChar = void 0;
		let anchor = 0;
		for (let i = 0; i < z; ++i) {
			const char = value[i];
			switch (char) {
				case `"`:
					if (prevChar !== "\\") withinQuotes = !withinQuotes;
					break;
				case ",":
					if (!withinQuotes) {
						values.push(value.slice(anchor, i));
						anchor = i + 1;
					}
					break;
			}
			prevChar = char;
		}
		values.push(value.slice(anchor));
		return values.map((v) => {
			v = v.trim();
			const z = v.length;
			if (z < 2) return v;
			if (v[0] === `"` && v[z - 1] === `"`) v = v.slice(1, z - 1);
			return v.replace(/\\"/g, "\"");
		});
	};
	var format = /^-?\d*(\.\d+)?$/;
	var NumericValue = class NumericValue {
		string;
		type;
		constructor(string, type) {
			this.string = string;
			this.type = type;
			if (!format.test(string)) throw new Error(`@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".`);
		}
		toString() {
			return this.string;
		}
		static [Symbol.hasInstance](object) {
			if (!object || typeof object !== "object") return false;
			const _nv = object;
			return NumericValue.prototype.isPrototypeOf(object) || _nv.type === "bigDecimal" && format.test(_nv.string);
		}
	};
	function nv(input) {
		return new NumericValue(String(input), "bigDecimal");
	}
	var SHORT_TO_HEX = {};
	var HEX_TO_SHORT = {};
	for (let i = 0; i < 256; i++) {
		let encodedByte = i.toString(16).toLowerCase();
		if (encodedByte.length === 1) encodedByte = `0${encodedByte}`;
		SHORT_TO_HEX[i] = encodedByte;
		HEX_TO_SHORT[encodedByte] = i;
	}
	function fromHex(encoded) {
		if (encoded.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
		const out = new Uint8Array(encoded.length / 2);
		for (let i = 0; i < encoded.length; i += 2) {
			const encodedByte = encoded.slice(i, i + 2).toLowerCase();
			if (encodedByte in HEX_TO_SHORT) out[i / 2] = HEX_TO_SHORT[encodedByte];
			else throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
		}
		return out;
	}
	function toHex(bytes) {
		let out = "";
		for (let i = 0; i < bytes.byteLength; i++) out += SHORT_TO_HEX[bytes[i]];
		return out;
	}
	var calculateBodyLength = (body) => {
		if (!body) return 0;
		if (typeof body === "string") return Buffer.byteLength(body);
		else if (typeof body.byteLength === "number") return body.byteLength;
		else if (typeof body.size === "number") return body.size;
		else if (typeof body.start === "number" && typeof body.end === "number") return body.end + 1 - body.start;
		else if (body instanceof ReadStream) {
			if (body.path != null) return lstatSync(body.path).size;
			else if (typeof body.fd === "number") return fstatSync(body.fd).size;
		}
		throw new Error(`Body Length computation failed for ${body}`);
	};
	var toUint8Array = (data) => {
		if (typeof data === "string") return fromUtf8$1(data);
		if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
		return new Uint8Array(data);
	};
	var deserializerMiddleware = (options, deserializer) => (next, context) => async (args) => {
		const { response } = await next(args);
		try {
			return {
				response,
				output: await deserializer(response, options)
			};
		} catch (error) {
			Object.defineProperty(error, "$response", {
				value: response,
				enumerable: false,
				writable: false,
				configurable: false
			});
			if (!("$metadata" in error)) {
				const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
				try {
					error.message += "\n  " + hint;
				} catch (e) {
					if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") console.warn(hint);
					else context.logger?.warn?.(hint);
				}
				if (typeof error.$responseBodyText !== "undefined") {
					if (error.$response) error.$response.body = error.$responseBodyText;
				}
				try {
					if (HttpResponse.isInstance(response)) {
						const { headers = {} } = response;
						const headerEntries = Object.entries(headers);
						error.$metadata = {
							httpStatusCode: response.statusCode,
							requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
							extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
							cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
						};
					}
				} catch (e) {}
			}
			throw error;
		}
	};
	var findHeader = (pattern, headers) => {
		return (headers.find(([k]) => {
			return k.match(pattern);
		}) || [void 0, void 0])[1];
	};
	var serializerMiddleware = (options, serializer) => (next, context) => async (args) => {
		const endpointConfig = options;
		const endpoint = context.endpointV2 ? async () => toEndpointV1(context.endpointV2) : endpointConfig.endpoint;
		if (!endpoint) throw new Error("No valid endpoint provider available.");
		const request = await serializer(args.input, {
			...options,
			endpoint
		});
		return next({
			...args,
			request
		});
	};
	var deserializerMiddlewareOption = {
		name: "deserializerMiddleware",
		step: "deserialize",
		tags: ["DESERIALIZER"],
		override: true
	};
	var serializerMiddlewareOption = {
		name: "serializerMiddleware",
		step: "serialize",
		tags: ["SERIALIZER"],
		override: true
	};
	function getSerdePlugin(config, serializer, deserializer) {
		return { applyToStack: (commandStack) => {
			commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
			commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
		} };
	}
	var Hash = class {
		algorithmIdentifier;
		secret;
		hash;
		constructor(algorithmIdentifier, secret) {
			this.algorithmIdentifier = algorithmIdentifier;
			this.secret = secret;
			this.reset();
		}
		update(toHash, encoding) {
			this.hash.update(toUint8Array(castSourceData(toHash, encoding)));
		}
		digest() {
			return Promise.resolve(this.hash.digest());
		}
		reset() {
			this.hash = this.secret ? createHmac(this.algorithmIdentifier, castSourceData(this.secret)) : createHash(this.algorithmIdentifier);
		}
	};
	function castSourceData(toCast, encoding) {
		if (Buffer.isBuffer(toCast)) return toCast;
		if (typeof toCast === "string") return fromString(toCast, encoding);
		if (ArrayBuffer.isView(toCast)) return fromArrayBuffer(toCast.buffer, toCast.byteOffset, toCast.byteLength);
		return fromArrayBuffer(toCast);
	}
	var ChecksumStream$1 = class ChecksumStream extends Duplex {
		expectedChecksum;
		checksumSourceLocation;
		checksum;
		source;
		base64Encoder;
		pendingCallback = null;
		constructor({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) {
			super();
			if (typeof source.pipe === "function") this.source = source;
			else throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
			this.base64Encoder = base64Encoder ?? toBase64$1;
			this.expectedChecksum = expectedChecksum;
			this.checksum = checksum;
			this.checksumSourceLocation = checksumSourceLocation;
			this.source.pipe(this);
		}
		_read(size) {
			if (this.pendingCallback) {
				const callback = this.pendingCallback;
				this.pendingCallback = null;
				callback();
			}
		}
		_write(chunk, encoding, callback) {
			try {
				this.checksum.update(chunk);
				if (!this.push(chunk)) {
					this.pendingCallback = callback;
					return;
				}
			} catch (e) {
				return callback(e);
			}
			return callback();
		}
		async _final(callback) {
			try {
				const digest = await this.checksum.digest();
				const received = this.base64Encoder(digest);
				if (this.expectedChecksum !== received) return callback(/* @__PURE__ */ new Error(`Checksum mismatch: expected "${this.expectedChecksum}" but received "${received}" in response header "${this.checksumSourceLocation}".`));
			} catch (e) {
				return callback(e);
			}
			this.push(null);
			return callback();
		}
	};
	var isReadableStream = (stream) => typeof ReadableStream === "function" && (stream?.constructor?.name === ReadableStream.name || stream instanceof ReadableStream);
	var isBlob = (blob) => {
		return typeof Blob === "function" && (blob?.constructor?.name === Blob.name || blob instanceof Blob);
	};
	var fromUtf8 = (input) => new TextEncoder().encode(input);
	var chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
	var alphabetByEncoding = Object.entries(chars).reduce((acc, [i, c]) => {
		acc[c] = Number(i);
		return acc;
	}, {});
	var alphabetByValue = chars.split("");
	var bitsPerLetter = 6;
	var bitsPerByte = 8;
	var maxLetterValue = 63;
	function toBase64(_input) {
		let input;
		if (typeof _input === "string") input = fromUtf8(_input);
		else input = _input;
		const isArrayLike = typeof input === "object" && typeof input.length === "number";
		const isUint8Array = typeof input === "object" && typeof input.byteOffset === "number" && typeof input.byteLength === "number";
		if (!isArrayLike && !isUint8Array) throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
		let str = "";
		for (let i = 0; i < input.length; i += 3) {
			let bits = 0;
			let bitLength = 0;
			for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
				bits |= input[j] << (limit - j - 1) * bitsPerByte;
				bitLength += bitsPerByte;
			}
			const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
			bits <<= bitClusterCount * bitsPerLetter - bitLength;
			for (let k = 1; k <= bitClusterCount; k++) {
				const offset = (bitClusterCount - k) * bitsPerLetter;
				str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
			}
			str += "==".slice(0, 4 - bitClusterCount);
		}
		return str;
	}
	var ReadableStreamRef = typeof ReadableStream === "function" ? ReadableStream : function() {};
	var ChecksumStream = class extends ReadableStreamRef {};
	var createChecksumStream$1 = ({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) => {
		if (!isReadableStream(source)) throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
		const encoder = base64Encoder ?? toBase64;
		if (typeof TransformStream !== "function") throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
		const transform = new TransformStream({
			start() {},
			async transform(chunk, controller) {
				checksum.update(chunk);
				controller.enqueue(chunk);
			},
			async flush(controller) {
				const received = encoder(await checksum.digest());
				if (expectedChecksum !== received) {
					const error = /* @__PURE__ */ new Error(`Checksum mismatch: expected "${expectedChecksum}" but received "${received}" in response header "${checksumSourceLocation}".`);
					controller.error(error);
				} else controller.terminate();
			}
		});
		source.pipeThrough(transform);
		const readable = transform.readable;
		Object.setPrototypeOf(readable, ChecksumStream.prototype);
		return readable;
	};
	function createChecksumStream(init) {
		if (typeof ReadableStream === "function" && isReadableStream(init.source)) return createChecksumStream$1(init);
		return new ChecksumStream$1(init);
	}
	var ByteArrayCollector = class {
		allocByteArray;
		byteLength = 0;
		byteArrays = [];
		constructor(allocByteArray) {
			this.allocByteArray = allocByteArray;
		}
		push(byteArray) {
			this.byteArrays.push(byteArray);
			this.byteLength += byteArray.byteLength;
		}
		flush() {
			if (this.byteArrays.length === 1) {
				const bytes = this.byteArrays[0];
				this.reset();
				return bytes;
			}
			const aggregation = this.allocByteArray(this.byteLength);
			let cursor = 0;
			for (let i = 0; i < this.byteArrays.length; ++i) {
				const bytes = this.byteArrays[i];
				aggregation.set(bytes, cursor);
				cursor += bytes.byteLength;
			}
			this.reset();
			return aggregation;
		}
		reset() {
			this.byteArrays = [];
			this.byteLength = 0;
		}
	};
	function createBufferedReadableStream(upstream, size, logger) {
		const reader = upstream.getReader();
		let streamBufferingLoggedWarning = false;
		let bytesSeen = 0;
		const buffers = ["", new ByteArrayCollector((size) => new Uint8Array(size))];
		let mode = -1;
		const pull = async (controller) => {
			const { value, done } = await reader.read();
			const chunk = value;
			if (done) {
				if (mode !== -1) {
					const remainder = flush(buffers, mode);
					if (sizeOf(remainder) > 0) controller.enqueue(remainder);
				}
				controller.close();
			} else {
				const chunkMode = modeOf(chunk, false);
				if (mode !== chunkMode) {
					if (mode >= 0) controller.enqueue(flush(buffers, mode));
					mode = chunkMode;
				}
				if (mode === -1) {
					controller.enqueue(chunk);
					return;
				}
				const chunkSize = sizeOf(chunk);
				bytesSeen += chunkSize;
				const bufferSize = sizeOf(buffers[mode]);
				if (chunkSize >= size && bufferSize === 0) controller.enqueue(chunk);
				else {
					const newSize = merge(buffers, mode, chunk);
					if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
						streamBufferingLoggedWarning = true;
						logger?.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
					}
					if (newSize >= size) controller.enqueue(flush(buffers, mode));
					else await pull(controller);
				}
			}
		};
		return new ReadableStream({ pull });
	}
	function merge(buffers, mode, chunk) {
		switch (mode) {
			case 0:
				buffers[0] += chunk;
				return sizeOf(buffers[0]);
			case 1:
			case 2:
				buffers[mode].push(chunk);
				return sizeOf(buffers[mode]);
		}
	}
	function flush(buffers, mode) {
		switch (mode) {
			case 0:
				const s = buffers[0];
				buffers[0] = "";
				return s;
			case 1:
			case 2: return buffers[mode].flush();
		}
		throw new Error(`@smithy/util-stream - invalid index ${mode} given to flush()`);
	}
	function sizeOf(chunk) {
		return chunk?.byteLength ?? chunk?.length ?? 0;
	}
	function modeOf(chunk, allowBuffer = true) {
		if (allowBuffer && typeof Buffer !== "undefined" && chunk instanceof Buffer) return 2;
		if (chunk instanceof Uint8Array) return 1;
		if (typeof chunk === "string") return 0;
		return -1;
	}
	function createBufferedReadable(upstream, size, logger) {
		if (isReadableStream(upstream)) return createBufferedReadableStream(upstream, size, logger);
		const downstream = new Readable$2({ read() {} });
		let streamBufferingLoggedWarning = false;
		let bytesSeen = 0;
		const buffers = [
			"",
			new ByteArrayCollector((size) => new Uint8Array(size)),
			new ByteArrayCollector((size) => Buffer.from(new Uint8Array(size)))
		];
		let mode = -1;
		upstream.on("data", (chunk) => {
			const chunkMode = modeOf(chunk, true);
			if (mode !== chunkMode) {
				if (mode >= 0) downstream.push(flush(buffers, mode));
				mode = chunkMode;
			}
			if (mode === -1) {
				downstream.push(chunk);
				return;
			}
			const chunkSize = sizeOf(chunk);
			bytesSeen += chunkSize;
			const bufferSize = sizeOf(buffers[mode]);
			if (chunkSize >= size && bufferSize === 0) downstream.push(chunk);
			else {
				const newSize = merge(buffers, mode, chunk);
				if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
					streamBufferingLoggedWarning = true;
					logger?.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
				}
				if (newSize >= size) downstream.push(flush(buffers, mode));
			}
		});
		upstream.on("end", () => {
			if (mode !== -1) {
				const remainder = flush(buffers, mode);
				if (sizeOf(remainder) > 0) downstream.push(remainder);
			}
			downstream.push(null);
		});
		return downstream;
	}
	var getAwsChunkedEncodingStream$1 = (readableStream, options) => {
		const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
		const checksumRequired = base64Encoder !== void 0 && bodyLengthChecker !== void 0 && checksumAlgorithmFn !== void 0 && checksumLocationName !== void 0 && streamHasher !== void 0;
		const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : void 0;
		const reader = readableStream.getReader();
		return new ReadableStream({ async pull(controller) {
			const { value, done } = await reader.read();
			if (done) {
				controller.enqueue(`0\r\n`);
				if (checksumRequired) {
					const checksum = base64Encoder(await digest);
					controller.enqueue(`${checksumLocationName}:${checksum}\r\n`);
					controller.enqueue(`\r\n`);
				}
				controller.close();
			} else controller.enqueue(`${(bodyLengthChecker(value) || 0).toString(16)}\r\n${value}\r\n`);
		} });
	};
	function getAwsChunkedEncodingStream(stream, options) {
		const readable = stream;
		const readableStream = stream;
		if (isReadableStream(readableStream)) return getAwsChunkedEncodingStream$1(readableStream, options);
		const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
		const checksumRequired = base64Encoder !== void 0 && checksumAlgorithmFn !== void 0 && checksumLocationName !== void 0 && streamHasher !== void 0;
		const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readable) : void 0;
		const awsChunkedEncodingStream = new Readable$2({ read: () => {} });
		readable.on("data", (data) => {
			const length = bodyLengthChecker(data) || 0;
			if (length === 0) return;
			awsChunkedEncodingStream.push(`${length.toString(16)}\r\n`);
			awsChunkedEncodingStream.push(data);
			awsChunkedEncodingStream.push("\r\n");
		});
		readable.on("end", async () => {
			awsChunkedEncodingStream.push(`0\r\n`);
			if (checksumRequired) {
				const checksum = base64Encoder(await digest);
				awsChunkedEncodingStream.push(`${checksumLocationName}:${checksum}\r\n`);
				awsChunkedEncodingStream.push(`\r\n`);
			}
			awsChunkedEncodingStream.push(null);
		});
		return awsChunkedEncodingStream;
	}
	async function headStream$1(stream, bytes) {
		let byteLengthCounter = 0;
		const chunks = [];
		const reader = stream.getReader();
		let isDone = false;
		while (!isDone) {
			const { done, value } = await reader.read();
			if (value) {
				chunks.push(value);
				byteLengthCounter += value?.byteLength ?? 0;
			}
			if (byteLengthCounter >= bytes) break;
			isDone = done;
		}
		reader.releaseLock();
		const collected = new Uint8Array(Math.min(bytes, byteLengthCounter));
		let offset = 0;
		for (const chunk of chunks) {
			if (chunk.byteLength > collected.byteLength - offset) {
				collected.set(chunk.subarray(0, collected.byteLength - offset), offset);
				break;
			} else collected.set(chunk, offset);
			offset += chunk.length;
		}
		return collected;
	}
	var headStream = (stream, bytes) => {
		if (isReadableStream(stream)) return headStream$1(stream, bytes);
		return new Promise((resolve, reject) => {
			const collector = new Collector$1();
			collector.limit = bytes;
			stream.pipe(collector);
			stream.on("error", (err) => {
				collector.end();
				reject(err);
			});
			collector.on("error", reject);
			collector.on("finish", function() {
				resolve(new Uint8Array(Buffer.concat(this.buffers)));
			});
		});
	};
	var Collector$1 = class Collector extends Writable {
		buffers = [];
		limit = Infinity;
		bytesBuffered = 0;
		_write(chunk, encoding, callback) {
			this.buffers.push(chunk);
			this.bytesBuffered += chunk.byteLength ?? 0;
			if (this.bytesBuffered >= this.limit) {
				const excess = this.bytesBuffered - this.limit;
				const tailBuffer = this.buffers[this.buffers.length - 1];
				this.buffers[this.buffers.length - 1] = tailBuffer.subarray(0, tailBuffer.byteLength - excess);
				this.emit("finish");
			}
			callback();
		}
	};
	var toUtf8 = (input) => {
		if (typeof input === "string") return input;
		if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
		return new TextDecoder("utf-8").decode(input);
	};
	var fromBase64 = (input) => {
		let totalByteLength = input.length / 4 * 3;
		if (input.slice(-2) === "==") totalByteLength -= 2;
		else if (input.slice(-1) === "=") totalByteLength--;
		const out = new ArrayBuffer(totalByteLength);
		const dataView = new DataView(out);
		for (let i = 0; i < input.length; i += 4) {
			let bits = 0;
			let bitLength = 0;
			for (let j = i, limit = i + 3; j <= limit; j++) if (input[j] !== "=") {
				if (!(input[j] in alphabetByEncoding)) throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
				bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
				bitLength += bitsPerLetter;
			} else bits >>= bitsPerLetter;
			const chunkOffset = i / 4 * 3;
			bits >>= bitLength % bitsPerByte;
			const byteLength = Math.floor(bitLength / bitsPerByte);
			for (let k = 0; k < byteLength; k++) {
				const offset = (byteLength - k - 1) * bitsPerByte;
				dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
			}
		}
		return new Uint8Array(out);
	};
	var streamCollector$1 = async (stream) => {
		if (typeof Blob === "function" && stream instanceof Blob || stream.constructor?.name === "Blob") {
			if (Blob.prototype.arrayBuffer !== void 0) return new Uint8Array(await stream.arrayBuffer());
			return collectBlob(stream);
		}
		return collectStream(stream);
	};
	async function collectBlob(blob) {
		const arrayBuffer = fromBase64(await readToBase64(blob));
		return new Uint8Array(arrayBuffer);
	}
	async function collectStream(stream) {
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
	function readToBase64(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (reader.readyState !== 2) return reject(/* @__PURE__ */ new Error("Reader aborted too early"));
				const result = reader.result ?? "";
				const commaIndex = result.indexOf(",");
				const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
				resolve(result.substring(dataOffset));
			};
			reader.onabort = () => reject(/* @__PURE__ */ new Error("Read aborted"));
			reader.onerror = () => reject(reader.error);
			reader.readAsDataURL(blob);
		});
	}
	var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1 = "The stream has already been transformed.";
	var sdkStreamMixin$1 = (stream) => {
		if (!isBlobInstance(stream) && !isReadableStream(stream)) {
			const name = stream?.__proto__?.constructor?.name || stream;
			throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
		}
		let transformed = false;
		const transformToByteArray = async () => {
			if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1);
			transformed = true;
			return await streamCollector$1(stream);
		};
		const blobToWebStream = (blob) => {
			if (typeof blob.stream !== "function") throw new Error("Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
			return blob.stream();
		};
		return Object.assign(stream, {
			transformToByteArray,
			transformToString: async (encoding) => {
				const buf = await transformToByteArray();
				if (encoding === "base64") return toBase64(buf);
				else if (encoding === "hex") return toHex(buf);
				else if (encoding === void 0 || encoding === "utf8" || encoding === "utf-8") return toUtf8(buf);
				else if (typeof TextDecoder === "function") return new TextDecoder(encoding).decode(buf);
				else throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
			},
			transformToWebStream: () => {
				if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1);
				transformed = true;
				if (isBlobInstance(stream)) return blobToWebStream(stream);
				else if (isReadableStream(stream)) return stream;
				else throw new Error(`Cannot transform payload to web stream, got ${stream}`);
			}
		});
	};
	var isBlobInstance = (stream) => typeof Blob === "function" && stream instanceof Blob;
	var Collector = class extends Writable {
		bufferedBytes = [];
		_write(chunk, encoding, callback) {
			this.bufferedBytes.push(chunk);
			callback();
		}
	};
	var isReadableStreamInstance = (stream) => typeof ReadableStream === "function" && stream instanceof ReadableStream;
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
	var streamCollector = (stream) => {
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
	var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
	var sdkStreamMixin = (stream) => {
		if (!(stream instanceof Readable$2)) try {
			return sdkStreamMixin$1(stream);
		} catch (e) {
			const name = stream?.__proto__?.constructor?.name || stream;
			throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
		}
		let transformed = false;
		const transformToByteArray = async () => {
			if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
			transformed = true;
			return await streamCollector(stream);
		};
		return Object.assign(stream, {
			transformToByteArray,
			transformToString: async (encoding) => {
				const buf = await transformToByteArray();
				if (encoding === void 0 || Buffer.isEncoding(encoding)) return fromArrayBuffer(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
				else return new TextDecoder(encoding).decode(buf);
			},
			transformToWebStream: () => {
				if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
				if (stream.readableFlowing !== null) throw new Error("The stream has been consumed by other callbacks.");
				if (typeof Readable$2.toWeb !== "function") throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
				transformed = true;
				return Readable$2.toWeb(stream);
			}
		});
	};
	async function splitStream$1(stream) {
		if (typeof stream.stream === "function") stream = stream.stream();
		return stream.tee();
	}
	async function splitStream(stream) {
		if (isReadableStream(stream) || isBlob(stream)) return splitStream$1(stream);
		const stream1 = new PassThrough();
		const stream2 = new PassThrough();
		stream.pipe(stream1);
		stream.pipe(stream2);
		return [stream1, stream2];
	}
	var Uint8ArrayBlobAdapter = class extends bindUint8ArrayBlobAdapter(toUtf8$1, fromUtf8$1, toBase64$1, fromBase64$1) {};
	var v4 = bindV4(getRandomValues);
	var generateIdempotencyToken = v4;
	exports.ChecksumStream = ChecksumStream$1;
	exports.Hash = Hash;
	exports.LazyJsonString = LazyJsonString;
	exports.NumericValue = NumericValue;
	exports.Uint8ArrayBlobAdapter = Uint8ArrayBlobAdapter;
	exports._parseEpochTimestamp = _parseEpochTimestamp;
	exports._parseRfc3339DateTimeWithOffset = _parseRfc3339DateTimeWithOffset;
	exports._parseRfc7231DateTime = _parseRfc7231DateTime;
	exports.calculateBodyLength = calculateBodyLength;
	exports.copyDocumentWithTransform = copyDocumentWithTransform;
	exports.createBufferedReadable = createBufferedReadable;
	exports.createChecksumStream = createChecksumStream;
	exports.dateToUtcString = dateToUtcString;
	exports.deserializerMiddleware = deserializerMiddleware;
	exports.deserializerMiddlewareOption = deserializerMiddlewareOption;
	exports.expectBoolean = expectBoolean;
	exports.expectByte = expectByte;
	exports.expectFloat32 = expectFloat32;
	exports.expectInt = expectInt;
	exports.expectInt32 = expectInt32;
	exports.expectLong = expectLong;
	exports.expectNonNull = expectNonNull;
	exports.expectNumber = expectNumber;
	exports.expectObject = expectObject;
	exports.expectShort = expectShort;
	exports.expectString = expectString;
	exports.expectUnion = expectUnion;
	exports.fromArrayBuffer = fromArrayBuffer;
	exports.fromBase64 = fromBase64$1;
	exports.fromHex = fromHex;
	exports.fromString = fromString;
	exports.fromUtf8 = fromUtf8$1;
	exports.generateIdempotencyToken = generateIdempotencyToken;
	exports.getAwsChunkedEncodingStream = getAwsChunkedEncodingStream;
	exports.getSerdePlugin = getSerdePlugin;
	exports.handleFloat = handleFloat;
	exports.headStream = headStream;
	exports.isArrayBuffer = isArrayBuffer;
	exports.isBlob = isBlob;
	exports.isReadableStream = isReadableStream;
	exports.limitedParseDouble = limitedParseDouble;
	exports.limitedParseFloat = limitedParseFloat;
	exports.limitedParseFloat32 = limitedParseFloat32;
	exports.logger = logger;
	exports.nv = nv;
	exports.parseBoolean = parseBoolean;
	exports.parseEpochTimestamp = parseEpochTimestamp;
	exports.parseRfc3339DateTime = parseRfc3339DateTime;
	exports.parseRfc3339DateTimeWithOffset = parseRfc3339DateTimeWithOffset;
	exports.parseRfc7231DateTime = parseRfc7231DateTime;
	exports.quoteHeader = quoteHeader;
	exports.sdkStreamMixin = sdkStreamMixin;
	exports.serializerMiddleware = serializerMiddleware;
	exports.serializerMiddlewareOption = serializerMiddlewareOption;
	exports.splitEvery = splitEvery;
	exports.splitHeader = splitHeader;
	exports.splitStream = splitStream;
	exports.strictParseByte = strictParseByte;
	exports.strictParseDouble = strictParseDouble;
	exports.strictParseFloat = strictParseFloat;
	exports.strictParseFloat32 = strictParseFloat32;
	exports.strictParseInt = strictParseInt;
	exports.strictParseInt32 = strictParseInt32;
	exports.strictParseLong = strictParseLong;
	exports.strictParseShort = strictParseShort;
	exports.toBase64 = toBase64$1;
	exports.toHex = toHex;
	exports.toUint8Array = toUint8Array;
	exports.toUtf8 = toUtf8$1;
	exports.v4 = v4;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/event-streams/index.js
var require_event_streams = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { Crc32 } = (init_module(), __toCommonJS(module_exports));
	var { toHex, fromHex, toUtf8, fromUtf8 } = require_serde();
	var { Readable: Readable$1 } = __require("node:stream");
	var Int64 = class Int64 {
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
			return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
		}
		toString() {
			return String(this.valueOf());
		}
	};
	function negate(bytes) {
		for (let i = 0; i < 8; i++) bytes[i] ^= 255;
		for (let i = 7; i > -1; i--) {
			bytes[i]++;
			if (bytes[i] !== 0) break;
		}
	}
	var HeaderMarshaller = class {
		toUtf8;
		fromUtf8;
		constructor(toUtf8, fromUtf8) {
			this.toUtf8 = toUtf8;
			this.fromUtf8 = fromUtf8;
		}
		format(headers) {
			const chunks = [];
			for (const headerName of Object.keys(headers)) {
				const bytes = this.fromUtf8(headerName);
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
					const utf8Bytes = this.fromUtf8(header.value);
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
					uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
					return uuidBytes;
			}
		}
		parse(headers) {
			const out = {};
			let position = 0;
			while (position < headers.byteLength) {
				const nameLength = headers.getUint8(position++);
				const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
				position += nameLength;
				switch (headers.getUint8(position++)) {
					case 0:
						out[name] = {
							type: BOOLEAN_TAG,
							value: true
						};
						break;
					case 1:
						out[name] = {
							type: BOOLEAN_TAG,
							value: false
						};
						break;
					case 2:
						out[name] = {
							type: BYTE_TAG,
							value: headers.getInt8(position++)
						};
						break;
					case 3:
						out[name] = {
							type: SHORT_TAG,
							value: headers.getInt16(position, false)
						};
						position += 2;
						break;
					case 4:
						out[name] = {
							type: INT_TAG,
							value: headers.getInt32(position, false)
						};
						position += 4;
						break;
					case 5:
						out[name] = {
							type: LONG_TAG,
							value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
						};
						position += 8;
						break;
					case 6:
						const binaryLength = headers.getUint16(position, false);
						position += 2;
						out[name] = {
							type: BINARY_TAG,
							value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
						};
						position += binaryLength;
						break;
					case 7:
						const stringLength = headers.getUint16(position, false);
						position += 2;
						out[name] = {
							type: STRING_TAG,
							value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
						};
						position += stringLength;
						break;
					case 8:
						out[name] = {
							type: TIMESTAMP_TAG,
							value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
						};
						position += 8;
						break;
					case 9:
						const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
						position += 16;
						out[name] = {
							type: UUID_TAG,
							value: `${toHex(uuidBytes.subarray(0, 4))}-${toHex(uuidBytes.subarray(4, 6))}-${toHex(uuidBytes.subarray(6, 8))}-${toHex(uuidBytes.subarray(8, 10))}-${toHex(uuidBytes.subarray(10))}`
						};
						break;
					default: throw new Error(`Unrecognized header type tag`);
				}
			}
			return out;
		}
	};
	var HEADER_VALUE_TYPE;
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
	var BOOLEAN_TAG = "boolean";
	var BYTE_TAG = "byte";
	var SHORT_TAG = "short";
	var INT_TAG = "integer";
	var LONG_TAG = "long";
	var BINARY_TAG = "binary";
	var STRING_TAG = "string";
	var TIMESTAMP_TAG = "timestamp";
	var UUID_TAG = "uuid";
	var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
	var PRELUDE_MEMBER_LENGTH = 4;
	var PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
	var CHECKSUM_LENGTH = 4;
	var MINIMUM_MESSAGE_LENGTH = 16;
	function splitMessage({ byteLength, byteOffset, buffer }) {
		if (byteLength < MINIMUM_MESSAGE_LENGTH) throw new Error("Provided message too short to accommodate event stream message overhead");
		const view = new DataView(buffer, byteOffset, byteLength);
		const messageLength = view.getUint32(0, false);
		if (byteLength !== messageLength) throw new Error("Reported message length does not match received message length");
		const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
		const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
		const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
		const checksummer = new Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
		if (expectedPreludeChecksum !== checksummer.digest()) throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`);
		checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - 12));
		if (expectedMessageChecksum !== checksummer.digest()) throw new Error(`The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`);
		return {
			headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
			body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - 16)
		};
	}
	var EventStreamCodec = class {
		headerMarshaller;
		messageBuffer;
		isEndOfStream;
		constructor(toUtf8, fromUtf8) {
			this.headerMarshaller = new HeaderMarshaller(toUtf8, fromUtf8);
			this.messageBuffer = [];
			this.isEndOfStream = false;
		}
		feed(message) {
			this.messageBuffer.push(this.decode(message));
		}
		endOfStream() {
			this.isEndOfStream = true;
		}
		getMessage() {
			const message = this.messageBuffer.pop();
			const isEndOfStream = this.isEndOfStream;
			return {
				getMessage() {
					return message;
				},
				isEndOfStream() {
					return isEndOfStream;
				}
			};
		}
		getAvailableMessages() {
			const messages = this.messageBuffer;
			this.messageBuffer = [];
			const isEndOfStream = this.isEndOfStream;
			return {
				getMessages() {
					return messages;
				},
				isEndOfStream() {
					return isEndOfStream;
				}
			};
		}
		encode({ headers: rawHeaders, body }) {
			const headers = this.headerMarshaller.format(rawHeaders);
			const length = headers.byteLength + body.byteLength + 16;
			const out = new Uint8Array(length);
			const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
			const checksum = new Crc32();
			view.setUint32(0, length, false);
			view.setUint32(4, headers.byteLength, false);
			view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
			out.set(headers, 12);
			out.set(body, headers.byteLength + 12);
			view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
			return out;
		}
		decode(message) {
			const { headers, body } = splitMessage(message);
			return {
				headers: this.headerMarshaller.parse(headers),
				body
			};
		}
		formatHeaders(rawHeaders) {
			return this.headerMarshaller.format(rawHeaders);
		}
	};
	var MessageDecoderStream = class {
		options;
		constructor(options) {
			this.options = options;
		}
		[Symbol.asyncIterator]() {
			return this.asyncIterator();
		}
		async *asyncIterator() {
			for await (const bytes of this.options.inputStream) yield this.options.decoder.decode(bytes);
		}
	};
	var MessageEncoderStream = class {
		options;
		constructor(options) {
			this.options = options;
		}
		[Symbol.asyncIterator]() {
			return this.asyncIterator();
		}
		async *asyncIterator() {
			for await (const msg of this.options.messageStream) yield this.options.encoder.encode(msg);
			if (this.options.includeEndFrame) yield new Uint8Array(0);
		}
	};
	var SmithyMessageDecoderStream = class {
		options;
		constructor(options) {
			this.options = options;
		}
		[Symbol.asyncIterator]() {
			return this.asyncIterator();
		}
		async *asyncIterator() {
			for await (const message of this.options.messageStream) {
				const deserialized = await this.options.deserializer(message);
				if (deserialized === void 0) continue;
				yield deserialized;
			}
		}
	};
	var SmithyMessageEncoderStream = class {
		options;
		constructor(options) {
			this.options = options;
		}
		[Symbol.asyncIterator]() {
			return this.asyncIterator();
		}
		async *asyncIterator() {
			for await (const chunk of this.options.inputStream) yield this.options.serializer(chunk);
		}
	};
	function getChunkedStream(source) {
		let currentMessageTotalLength = 0;
		let currentMessagePendingLength = 0;
		let currentMessage = null;
		let messageLengthBuffer = null;
		const allocateMessage = (size) => {
			if (typeof size !== "number") throw new Error("Attempted to allocate an event message where size was not a number: " + size);
			currentMessageTotalLength = size;
			currentMessagePendingLength = 4;
			currentMessage = new Uint8Array(size);
			new DataView(currentMessage.buffer).setUint32(0, size, false);
		};
		const iterator = async function* () {
			const sourceIterator = source[Symbol.asyncIterator]();
			while (true) {
				const { value, done } = await sourceIterator.next();
				if (done) {
					if (!currentMessageTotalLength) return;
					else if (currentMessageTotalLength === currentMessagePendingLength) yield currentMessage;
					else throw new Error("Truncated event message received.");
					return;
				}
				const chunkLength = value.length;
				let currentOffset = 0;
				while (currentOffset < chunkLength) {
					if (!currentMessage) {
						const bytesRemaining = chunkLength - currentOffset;
						if (!messageLengthBuffer) messageLengthBuffer = new Uint8Array(4);
						const numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
						messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
						currentMessagePendingLength += numBytesForTotal;
						currentOffset += numBytesForTotal;
						if (currentMessagePendingLength < 4) break;
						allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
						messageLengthBuffer = null;
					}
					const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
					currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
					currentMessagePendingLength += numBytesToWrite;
					currentOffset += numBytesToWrite;
					if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
						yield currentMessage;
						currentMessage = null;
						currentMessageTotalLength = 0;
						currentMessagePendingLength = 0;
					}
				}
			}
		};
		return { [Symbol.asyncIterator]: iterator };
	}
	function getUnmarshalledStream(source, options) {
		const messageUnmarshaller = getMessageUnmarshaller(options.deserializer, options.toUtf8);
		return { [Symbol.asyncIterator]: async function* () {
			for await (const chunk of source) {
				const type = await messageUnmarshaller(options.eventStreamCodec.decode(chunk));
				if (type === void 0) continue;
				yield type;
			}
		} };
	}
	function getMessageUnmarshaller(deserializer, toUtf8) {
		return async function(message) {
			const { value: messageType } = message.headers[":message-type"];
			if (messageType === "error") {
				const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
				unmodeledError.name = message.headers[":error-code"].value;
				throw unmodeledError;
			} else if (messageType === "exception") {
				const code = message.headers[":exception-type"].value;
				const deserializedException = await deserializer({ [code]: message });
				if (deserializedException.$unknown) {
					const error = new Error(toUtf8(message.body));
					error.name = code;
					throw error;
				}
				throw deserializedException[code];
			} else if (messageType === "event") {
				const deserialized = await deserializer({ [message.headers[":event-type"].value]: message });
				if (deserialized.$unknown) return;
				return deserialized;
			} else throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
		};
	}
	var EventStreamMarshaller$1 = class EventStreamMarshaller {
		eventStreamCodec;
		utfEncoder;
		constructor({ utf8Encoder, utf8Decoder }) {
			this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
			this.utfEncoder = utf8Encoder;
		}
		deserialize(body, deserializer) {
			return new SmithyMessageDecoderStream({
				messageStream: new MessageDecoderStream({
					inputStream: getChunkedStream(body),
					decoder: this.eventStreamCodec
				}),
				deserializer: getMessageUnmarshaller(deserializer, this.utfEncoder)
			});
		}
		serialize(inputStream, serializer) {
			return new MessageEncoderStream({
				messageStream: new SmithyMessageEncoderStream({
					inputStream,
					serializer
				}),
				encoder: this.eventStreamCodec,
				includeEndFrame: true
			});
		}
	};
	var eventStreamSerdeProvider$1 = (options) => new EventStreamMarshaller$1(options);
	var EventStreamMarshaller = class {
		universalMarshaller;
		constructor({ utf8Encoder, utf8Decoder }) {
			this.universalMarshaller = new EventStreamMarshaller$1({
				utf8Decoder,
				utf8Encoder
			});
		}
		deserialize(body, deserializer) {
			const bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : readableToIterable(body);
			return this.universalMarshaller.deserialize(bodyIterable, deserializer);
		}
		serialize(input, serializer) {
			return Readable$1.from(this.universalMarshaller.serialize(input, serializer));
		}
	};
	var eventStreamSerdeProvider = (options) => new EventStreamMarshaller(options);
	async function* readableToIterable(readStream) {
		let streamEnded = false;
		let generationEnded = false;
		const records = new Array();
		readStream.on("error", (err) => {
			if (!streamEnded) streamEnded = true;
			if (err) throw err;
		});
		readStream.on("data", (data) => {
			records.push(data);
		});
		readStream.on("end", () => {
			streamEnded = true;
		});
		while (!generationEnded) {
			const value = await new Promise((resolve) => setTimeout(() => resolve(records.shift()), 0));
			if (value) yield value;
			generationEnded = streamEnded && records.length === 0;
		}
	}
	var readableStreamToIterable = (readableStream) => ({ [Symbol.asyncIterator]: async function* () {
		const reader = readableStream.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) return;
				yield value;
			}
		} finally {
			reader.releaseLock();
		}
	} });
	var iterableToReadableStream = (asyncIterable) => {
		const iterator = asyncIterable[Symbol.asyncIterator]();
		return new ReadableStream({ async pull(controller) {
			const { done, value } = await iterator.next();
			if (done) return controller.close();
			controller.enqueue(value);
		} });
	};
	var resolveEventStreamSerdeConfig = (input) => Object.assign(input, { eventStreamMarshaller: input.eventStreamSerdeProvider(input) });
	var EventStreamSerde = class {
		marshaller;
		serializer;
		deserializer;
		serdeContext;
		defaultContentType;
		constructor({ marshaller, serializer, deserializer, serdeContext, defaultContentType }) {
			this.marshaller = marshaller;
			this.serializer = serializer;
			this.deserializer = deserializer;
			this.serdeContext = serdeContext;
			this.defaultContentType = defaultContentType;
		}
		async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
			const marshaller = this.marshaller;
			const eventStreamMember = requestSchema.getEventStreamMember();
			const unionSchema = requestSchema.getMemberSchema(eventStreamMember);
			const serializer = this.serializer;
			const defaultContentType = this.defaultContentType;
			const initialRequestMarker = Symbol("initialRequestMarker");
			const eventStreamIterable = { async *[Symbol.asyncIterator]() {
				if (initialRequest) {
					const headers = {
						":event-type": {
							type: "string",
							value: "initial-request"
						},
						":message-type": {
							type: "string",
							value: "event"
						},
						":content-type": {
							type: "string",
							value: defaultContentType
						}
					};
					serializer.write(requestSchema, initialRequest);
					const body = serializer.flush();
					yield {
						[initialRequestMarker]: true,
						headers,
						body
					};
				}
				for await (const page of eventStream) yield page;
			} };
			return marshaller.serialize(eventStreamIterable, (event) => {
				if (event[initialRequestMarker]) return {
					headers: event.headers,
					body: event.body
				};
				let unionMember = "";
				for (const key in event) if (key !== "__type") {
					unionMember = key;
					break;
				}
				const { additionalHeaders, body, eventType, explicitPayloadContentType } = this.writeEventBody(unionMember, unionSchema, event);
				return {
					headers: {
						":event-type": {
							type: "string",
							value: eventType
						},
						":message-type": {
							type: "string",
							value: "event"
						},
						":content-type": {
							type: "string",
							value: explicitPayloadContentType ?? defaultContentType
						},
						...additionalHeaders
					},
					body
				};
			});
		}
		async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
			const marshaller = this.marshaller;
			const eventStreamMember = responseSchema.getEventStreamMember();
			const memberSchemas = responseSchema.getMemberSchema(eventStreamMember).getMemberSchemas();
			const initialResponseMarker = Symbol("initialResponseMarker");
			const asyncIterable = marshaller.deserialize(response.body, async (event) => {
				let unionMember = "";
				for (const key in event) if (key !== "__type") {
					unionMember = key;
					break;
				}
				const body = event[unionMember].body;
				if (unionMember === "initial-response") {
					const dataObject = await this.deserializer.read(responseSchema, body);
					delete dataObject[eventStreamMember];
					return {
						[initialResponseMarker]: true,
						...dataObject
					};
				} else if (unionMember in memberSchemas) {
					const eventStreamSchema = memberSchemas[unionMember];
					if (eventStreamSchema.isStructSchema()) {
						const out = {};
						let hasBindings = false;
						for (const [name, member] of eventStreamSchema.structIterator()) {
							const { eventHeader, eventPayload } = member.getMergedTraits();
							hasBindings = hasBindings || Boolean(eventHeader || eventPayload);
							if (eventPayload) {
								if (member.isBlobSchema()) out[name] = body;
								else if (member.isStringSchema()) out[name] = (this.serdeContext?.utf8Encoder ?? toUtf8)(body);
								else if (member.isStructSchema()) out[name] = await this.deserializer.read(member, body);
							} else if (eventHeader) {
								const value = event[unionMember].headers[name]?.value;
								if (value != null) if (member.isNumericSchema()) if (value && typeof value === "object" && "bytes" in value) out[name] = BigInt(value.toString());
								else out[name] = Number(value);
								else out[name] = value;
							}
						}
						if (hasBindings) return { [unionMember]: out };
						if (body.byteLength === 0) return { [unionMember]: {} };
					}
					return { [unionMember]: await this.deserializer.read(eventStreamSchema, body) };
				} else return { $unknown: event };
			});
			const asyncIterator = asyncIterable[Symbol.asyncIterator]();
			const firstEvent = await asyncIterator.next();
			if (firstEvent.done) return asyncIterable;
			if (firstEvent.value?.[initialResponseMarker]) {
				if (!responseSchema) throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
				for (const key in firstEvent.value) initialResponseContainer[key] = firstEvent.value[key];
			}
			return { async *[Symbol.asyncIterator]() {
				if (!firstEvent?.value?.[initialResponseMarker]) yield firstEvent.value;
				while (true) {
					const { done, value } = await asyncIterator.next();
					if (done) break;
					yield value;
				}
			} };
		}
		writeEventBody(unionMember, unionSchema, event) {
			const serializer = this.serializer;
			let eventType = unionMember;
			let explicitPayloadMember = null;
			let explicitPayloadContentType;
			const isKnownSchema = (() => {
				return unionSchema.getSchema()[4].includes(unionMember);
			})();
			const additionalHeaders = {};
			if (!isKnownSchema) {
				const [type, value] = event[unionMember];
				eventType = type;
				serializer.write(15, value);
			} else {
				const eventSchema = unionSchema.getMemberSchema(unionMember);
				if (eventSchema.isStructSchema()) {
					for (const [memberName, memberSchema] of eventSchema.structIterator()) {
						const { eventHeader, eventPayload } = memberSchema.getMergedTraits();
						if (eventPayload) explicitPayloadMember = memberName;
						else if (eventHeader) {
							const value = event[unionMember][memberName];
							let type = "binary";
							if (memberSchema.isNumericSchema()) if ((-2) ** 31 <= value && value <= 2 ** 31 - 1) type = "integer";
							else type = "long";
							else if (memberSchema.isTimestampSchema()) type = "timestamp";
							else if (memberSchema.isStringSchema()) type = "string";
							else if (memberSchema.isBooleanSchema()) type = "boolean";
							if (value != null) {
								additionalHeaders[memberName] = {
									type,
									value
								};
								delete event[unionMember][memberName];
							}
						}
					}
					if (explicitPayloadMember !== null) {
						const payloadSchema = eventSchema.getMemberSchema(explicitPayloadMember);
						if (payloadSchema.isBlobSchema()) explicitPayloadContentType = "application/octet-stream";
						else if (payloadSchema.isStringSchema()) explicitPayloadContentType = "text/plain";
						serializer.write(payloadSchema, event[unionMember][explicitPayloadMember]);
					} else serializer.write(eventSchema, event[unionMember]);
				} else if (eventSchema.isUnitSchema()) serializer.write(eventSchema, {});
				else throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
			}
			const messageSerialization = serializer.flush() ?? new Uint8Array();
			return {
				body: typeof messageSerialization === "string" ? (this.serdeContext?.utf8Decoder ?? fromUtf8)(messageSerialization) : messageSerialization,
				eventType,
				explicitPayloadContentType,
				additionalHeaders
			};
		}
	};
	exports.EventStreamCodec = EventStreamCodec;
	exports.EventStreamMarshaller = EventStreamMarshaller;
	exports.EventStreamSerde = EventStreamSerde;
	exports.HeaderMarshaller = HeaderMarshaller;
	exports.Int64 = Int64;
	exports.MessageDecoderStream = MessageDecoderStream;
	exports.MessageEncoderStream = MessageEncoderStream;
	exports.SmithyMessageDecoderStream = SmithyMessageDecoderStream;
	exports.SmithyMessageEncoderStream = SmithyMessageEncoderStream;
	exports.UniversalEventStreamMarshaller = EventStreamMarshaller$1;
	exports.eventStreamSerdeProvider = eventStreamSerdeProvider;
	exports.getChunkedStream = getChunkedStream;
	exports.getMessageUnmarshaller = getMessageUnmarshaller;
	exports.getUnmarshalledStream = getUnmarshalledStream;
	exports.iterableToReadableStream = iterableToReadableStream;
	exports.readableStreamToIterable = readableStreamToIterable;
	exports.resolveEventStreamSerdeConfig = resolveEventStreamSerdeConfig;
	exports.universalEventStreamSerdeProvider = eventStreamSerdeProvider$1;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/protocols/index.js
var require_protocols = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { Uint8ArrayBlobAdapter, sdkStreamMixin, splitEvery, splitHeader, fromBase64, _parseEpochTimestamp, _parseRfc7231DateTime, _parseRfc3339DateTimeWithOffset, LazyJsonString, NumericValue, toUtf8, fromUtf8, generateIdempotencyToken, toBase64, dateToUtcString, quoteHeader } = require_serde();
	var { TypeRegistry, NormalizedSchema, translateTraits } = require_schema();
	var { HttpRequest, HttpResponse } = require_transport();
	var { isValidHostname, parseQueryString, parseUrl } = require_transport();
	exports.HttpRequest = HttpRequest;
	exports.HttpResponse = HttpResponse;
	exports.isValidHostname = isValidHostname;
	exports.parseQueryString = parseQueryString;
	exports.parseUrl = parseUrl;
	var { FieldPosition } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var collectBody = async (streamBody = new Uint8Array(), context) => {
		if (streamBody instanceof Uint8Array) return Uint8ArrayBlobAdapter.mutate(streamBody);
		if (!streamBody) return Uint8ArrayBlobAdapter.mutate(new Uint8Array());
		const fromContext = context.streamCollector(streamBody);
		return Uint8ArrayBlobAdapter.mutate(await fromContext);
	};
	function extendedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
			return "%" + c.charCodeAt(0).toString(16).toUpperCase();
		});
	}
	var SerdeContext = class {
		serdeContext;
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
		}
	};
	var HttpProtocol = class extends SerdeContext {
		options;
		compositeErrorRegistry;
		constructor(options) {
			super();
			this.options = options;
			this.compositeErrorRegistry = TypeRegistry.for(options.defaultNamespace);
			for (const etr of options.errorTypeRegistries ?? []) this.compositeErrorRegistry.copyFrom(etr);
		}
		getRequestType() {
			return HttpRequest;
		}
		getResponseType() {
			return HttpResponse;
		}
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
			this.serializer.setSerdeContext(serdeContext);
			this.deserializer.setSerdeContext(serdeContext);
			if (this.getPayloadCodec()) this.getPayloadCodec().setSerdeContext(serdeContext);
		}
		updateServiceEndpoint(request, endpoint) {
			if ("url" in endpoint) {
				request.protocol = endpoint.url.protocol;
				request.hostname = endpoint.url.hostname;
				request.port = endpoint.url.port ? Number(endpoint.url.port) : void 0;
				request.path = endpoint.url.pathname;
				request.fragment = endpoint.url.hash || void 0;
				request.username = endpoint.url.username || void 0;
				request.password = endpoint.url.password || void 0;
				if (!request.query) request.query = {};
				for (const [k, v] of endpoint.url.searchParams.entries()) request.query[k] = v;
				if (endpoint.headers) for (const name in endpoint.headers) request.headers[name] = endpoint.headers[name].join(", ");
				return request;
			} else {
				request.protocol = endpoint.protocol;
				request.hostname = endpoint.hostname;
				request.port = endpoint.port ? Number(endpoint.port) : void 0;
				request.path = endpoint.path;
				request.query = { ...endpoint.query };
				if (endpoint.headers) for (const name in endpoint.headers) request.headers[name] = endpoint.headers[name];
				return request;
			}
		}
		setHostPrefix(request, operationSchema, input) {
			if (this.serdeContext?.disableHostPrefix) return;
			const inputNs = NormalizedSchema.of(operationSchema.input);
			const opTraits = translateTraits(operationSchema.traits ?? {});
			if (opTraits.endpoint) {
				let hostPrefix = opTraits.endpoint?.[0];
				if (typeof hostPrefix === "string") {
					for (const [name, member] of inputNs.structIterator()) {
						if (!member.getMergedTraits().hostLabel) continue;
						const replacement = input[name];
						if (typeof replacement !== "string") throw new Error(`@smithy/core/schema - ${name} in input must be a string as hostLabel.`);
						hostPrefix = hostPrefix.replace(`{${name}}`, replacement);
					}
					request.hostname = hostPrefix + request.hostname;
				}
			}
		}
		deserializeMetadata(output) {
			return {
				httpStatusCode: output.statusCode,
				requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
				extendedRequestId: output.headers["x-amz-id-2"],
				cfId: output.headers["x-amz-cf-id"]
			};
		}
		async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
			return (await this.loadEventStreamCapability()).serializeEventStream({
				eventStream,
				requestSchema,
				initialRequest
			});
		}
		async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
			return (await this.loadEventStreamCapability()).deserializeEventStream({
				response,
				responseSchema,
				initialResponseContainer
			});
		}
		async loadEventStreamCapability() {
			const { EventStreamSerde } = require_event_streams();
			return new EventStreamSerde({
				marshaller: this.getEventStreamMarshaller(),
				serializer: this.serializer,
				deserializer: this.deserializer,
				serdeContext: this.serdeContext,
				defaultContentType: this.getDefaultContentType()
			});
		}
		getDefaultContentType() {
			throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
		}
		async deserializeHttpMessage(schema, context, response, arg4, arg5) {
			return [];
		}
		getEventStreamMarshaller() {
			const context = this.serdeContext;
			if (!context.eventStreamMarshaller) throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
			return context.eventStreamMarshaller;
		}
	};
	var HttpBindingProtocol = class extends HttpProtocol {
		async serializeRequest(operationSchema, _input, context) {
			const input = _input && typeof _input === "object" ? _input : {};
			const serializer = this.serializer;
			const query = {};
			const headers = {};
			const endpoint = await context.endpoint();
			const ns = NormalizedSchema.of(operationSchema?.input);
			const payloadMemberNames = [];
			const payloadMemberSchemas = [];
			let hasNonHttpBindingMember = false;
			let payload;
			const request = new HttpRequest({
				protocol: "",
				hostname: "",
				port: void 0,
				path: "",
				fragment: void 0,
				query,
				headers,
				body: void 0
			});
			if (endpoint) {
				this.updateServiceEndpoint(request, endpoint);
				this.setHostPrefix(request, operationSchema, input);
				const opTraits = translateTraits(operationSchema.traits);
				if (opTraits.http) {
					request.method = opTraits.http[0];
					const [path, search] = opTraits.http[1].split("?");
					if (request.path == "/") request.path = path;
					else request.path += path;
					const traitSearchParams = new URLSearchParams(search ?? "");
					for (const [key, value] of traitSearchParams) query[key] = value;
				}
			}
			for (const [memberName, memberNs] of ns.structIterator()) {
				const memberTraits = memberNs.getMergedTraits() ?? {};
				const inputMemberValue = input[memberName];
				if (inputMemberValue == null && !memberNs.isIdempotencyToken()) {
					if (memberTraits.httpLabel) {
						if (request.path.includes(`{${memberName}+}`) || request.path.includes(`{${memberName}}`)) throw new Error(`No value provided for input HTTP label: ${memberName}.`);
					}
					continue;
				}
				if (memberTraits.httpPayload) if (memberNs.isStreaming()) if (memberNs.isStructSchema()) {
					if (input[memberName]) payload = await this.serializeEventStream({
						eventStream: input[memberName],
						requestSchema: ns
					});
				} else payload = inputMemberValue;
				else {
					serializer.write(memberNs, inputMemberValue);
					payload = serializer.flush();
				}
				else if (memberTraits.httpLabel) {
					serializer.write(memberNs, inputMemberValue);
					const replacement = serializer.flush();
					if (request.path.includes(`{${memberName}+}`)) request.path = request.path.replace(`{${memberName}+}`, replacement.split("/").map(extendedEncodeURIComponent).join("/"));
					else if (request.path.includes(`{${memberName}}`)) request.path = request.path.replace(`{${memberName}}`, extendedEncodeURIComponent(replacement));
				} else if (memberTraits.httpHeader) {
					serializer.write(memberNs, inputMemberValue);
					headers[memberTraits.httpHeader.toLowerCase()] = String(serializer.flush());
				} else if (typeof memberTraits.httpPrefixHeaders === "string") for (const key in inputMemberValue) {
					const val = inputMemberValue[key];
					const amalgam = memberTraits.httpPrefixHeaders + key;
					serializer.write([memberNs.getValueSchema(), { httpHeader: amalgam }], val);
					headers[amalgam.toLowerCase()] = serializer.flush();
				}
				else if (memberTraits.httpQuery || memberTraits.httpQueryParams) this.serializeQuery(memberNs, inputMemberValue, query);
				else {
					hasNonHttpBindingMember = true;
					payloadMemberNames.push(memberName);
					payloadMemberSchemas.push(memberNs);
				}
			}
			if (hasNonHttpBindingMember && input) {
				const [namespace, name] = (ns.getName(true) ?? "#Unknown").split("#");
				const requiredMembers = ns.getSchema()[6];
				const payloadSchema = [
					3,
					namespace,
					name,
					ns.getMergedTraits(),
					payloadMemberNames,
					payloadMemberSchemas,
					void 0
				];
				if (requiredMembers) payloadSchema[6] = requiredMembers;
				else payloadSchema.pop();
				serializer.write(payloadSchema, input);
				payload = serializer.flush();
			}
			request.headers = headers;
			request.query = query;
			request.body = payload;
			return request;
		}
		serializeQuery(ns, data, query) {
			const serializer = this.serializer;
			const traits = ns.getMergedTraits();
			if (traits.httpQueryParams) {
				for (const key in data) if (!(key in query)) {
					const val = data[key];
					const valueSchema = ns.getValueSchema();
					Object.assign(valueSchema.getMergedTraits(), {
						...traits,
						httpQuery: key,
						httpQueryParams: void 0
					});
					this.serializeQuery(valueSchema, val, query);
				}
				return;
			}
			if (ns.isListSchema()) {
				const sparse = !!ns.getMergedTraits().sparse;
				const buffer = [];
				for (const item of data) {
					serializer.write([ns.getValueSchema(), traits], item);
					const serializable = serializer.flush();
					if (sparse || serializable !== void 0) buffer.push(serializable);
				}
				query[traits.httpQuery] = buffer;
			} else {
				serializer.write([ns, traits], data);
				query[traits.httpQuery] = serializer.flush();
			}
		}
		async deserializeResponse(operationSchema, context, response) {
			const deserializer = this.deserializer;
			const ns = NormalizedSchema.of(operationSchema.output);
			const dataObject = {};
			if (response.statusCode >= 300) {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(15, bytes));
				await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
				throw new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const nonHttpBindingMembers = await this.deserializeHttpMessage(ns, context, response, dataObject);
			if (nonHttpBindingMembers.length) {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) {
					const dataFromBody = await deserializer.read(ns, bytes);
					for (const member of nonHttpBindingMembers) if (dataFromBody[member] != null) dataObject[member] = dataFromBody[member];
				}
			} else if (nonHttpBindingMembers.discardResponseBody) await collectBody(response.body, context);
			dataObject.$metadata = this.deserializeMetadata(response);
			return dataObject;
		}
		async deserializeHttpMessage(schema, context, response, arg4, arg5) {
			let dataObject;
			if (arg4 instanceof Set) dataObject = arg5;
			else dataObject = arg4;
			let discardResponseBody = true;
			const deserializer = this.deserializer;
			const ns = NormalizedSchema.of(schema);
			const nonHttpBindingMembers = [];
			for (const [memberName, memberSchema] of ns.structIterator()) {
				const memberTraits = memberSchema.getMemberTraits();
				if (memberTraits.httpPayload) {
					discardResponseBody = false;
					if (memberSchema.isStreaming()) if (memberSchema.isStructSchema()) dataObject[memberName] = await this.deserializeEventStream({
						response,
						responseSchema: ns
					});
					else dataObject[memberName] = sdkStreamMixin(response.body);
					else if (response.body) {
						const bytes = await collectBody(response.body, context);
						if (bytes.byteLength > 0) dataObject[memberName] = await deserializer.read(memberSchema, bytes);
					}
				} else if (memberTraits.httpHeader) {
					const key = String(memberTraits.httpHeader).toLowerCase();
					const value = response.headers[key];
					if (null != value) if (memberSchema.isListSchema()) {
						const headerListValueSchema = memberSchema.getValueSchema();
						headerListValueSchema.getMergedTraits().httpHeader = key;
						let sections;
						if (headerListValueSchema.isTimestampSchema() && headerListValueSchema.getSchema() === 4) sections = splitEvery(value, ",", 2);
						else sections = splitHeader(value);
						const list = [];
						for (const section of sections) list.push(await deserializer.read(headerListValueSchema, section.trim()));
						dataObject[memberName] = list;
					} else dataObject[memberName] = await deserializer.read(memberSchema, value);
				} else if (memberTraits.httpPrefixHeaders !== void 0) {
					dataObject[memberName] = {};
					for (const header in response.headers) if (header.startsWith(memberTraits.httpPrefixHeaders)) {
						const value = response.headers[header];
						const valueSchema = memberSchema.getValueSchema();
						valueSchema.getMergedTraits().httpHeader = header;
						dataObject[memberName][header.slice(memberTraits.httpPrefixHeaders.length)] = await deserializer.read(valueSchema, value);
					}
				} else if (memberTraits.httpResponseCode) dataObject[memberName] = response.statusCode;
				else nonHttpBindingMembers.push(memberName);
			}
			nonHttpBindingMembers.discardResponseBody = discardResponseBody;
			return nonHttpBindingMembers;
		}
	};
	var RpcProtocol = class extends HttpProtocol {
		async serializeRequest(operationSchema, _input, context) {
			const serializer = this.serializer;
			const query = {};
			const headers = {};
			const endpoint = await context.endpoint();
			const ns = NormalizedSchema.of(operationSchema?.input);
			const schema = ns.getSchema();
			let payload;
			const input = _input && typeof _input === "object" ? _input : {};
			const request = new HttpRequest({
				protocol: "",
				hostname: "",
				port: void 0,
				path: "/",
				fragment: void 0,
				query,
				headers,
				body: void 0
			});
			if (endpoint) {
				this.updateServiceEndpoint(request, endpoint);
				this.setHostPrefix(request, operationSchema, input);
			}
			if (input) {
				const eventStreamMember = ns.getEventStreamMember();
				if (eventStreamMember) {
					if (input[eventStreamMember]) {
						const initialRequest = {};
						for (const [memberName, memberSchema] of ns.structIterator()) if (memberName !== eventStreamMember && input[memberName]) {
							serializer.write(memberSchema, input[memberName]);
							initialRequest[memberName] = serializer.flush();
						}
						payload = await this.serializeEventStream({
							eventStream: input[eventStreamMember],
							requestSchema: ns,
							initialRequest
						});
					}
				} else {
					serializer.write(schema, input);
					payload = serializer.flush();
				}
			}
			request.headers = Object.assign(request.headers, headers);
			request.query = query;
			request.body = payload;
			request.method = "POST";
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
				throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const eventStreamMember = ns.getEventStreamMember();
			if (eventStreamMember) dataObject[eventStreamMember] = await this.deserializeEventStream({
				response,
				responseSchema: ns,
				initialResponseContainer: dataObject
			});
			else {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(ns, bytes));
			}
			dataObject.$metadata = this.deserializeMetadata(response);
			return dataObject;
		}
	};
	var resolvedPath = (resolvedPath, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
		if (input != null && input[memberName] !== void 0) {
			const labelValue = labelValueProvider();
			if (labelValue == null || labelValue.length <= 0) throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
			resolvedPath = resolvedPath.replace(uriLabel, isGreedyLabel ? labelValue.split("/").map((segment) => extendedEncodeURIComponent(segment)).join("/") : extendedEncodeURIComponent(labelValue));
		} else throw new Error("No value provided for input HTTP label: " + memberName + ".");
		return resolvedPath;
	};
	function requestBuilder(input, context) {
		return new RequestBuilder(input, context);
	}
	var RequestBuilder = class {
		input;
		context;
		query = {};
		method = "";
		headers = {};
		path = "";
		body = null;
		hostname = "";
		resolvePathStack = [];
		constructor(input, context) {
			this.input = input;
			this.context = context;
		}
		async build() {
			const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
			this.path = basePath;
			for (const resolvePath of this.resolvePathStack) resolvePath(this.path);
			return new HttpRequest({
				protocol,
				hostname: this.hostname || hostname,
				port,
				method: this.method,
				path: this.path,
				query: this.query,
				body: this.body,
				headers: this.headers
			});
		}
		hn(hostname) {
			this.hostname = hostname;
			return this;
		}
		bp(uriLabel) {
			this.resolvePathStack.push((basePath) => {
				this.path = `${basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
			});
			return this;
		}
		p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
			this.resolvePathStack.push((path) => {
				this.path = resolvedPath(path, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
			});
			return this;
		}
		h(headers) {
			this.headers = headers;
			return this;
		}
		q(query) {
			this.query = query;
			return this;
		}
		b(body) {
			this.body = body;
			return this;
		}
		m(method) {
			this.method = method;
			return this;
		}
	};
	function determineTimestampFormat(ns, settings) {
		if (settings.timestampFormat.useTrait) {
			if (ns.isTimestampSchema() && (ns.getSchema() === 5 || ns.getSchema() === 6 || ns.getSchema() === 7)) return ns.getSchema();
		}
		const { httpLabel, httpPrefixHeaders, httpHeader, httpQuery } = ns.getMergedTraits();
		return (settings.httpBindings ? typeof httpPrefixHeaders === "string" || Boolean(httpHeader) ? 6 : Boolean(httpQuery) || Boolean(httpLabel) ? 5 : void 0 : void 0) ?? settings.timestampFormat.default;
	}
	var FromStringShapeDeserializer = class extends SerdeContext {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		read(_schema, data) {
			const ns = NormalizedSchema.of(_schema);
			if (ns.isListSchema()) return splitHeader(data).map((item) => this.read(ns.getValueSchema(), item));
			if (ns.isBlobSchema()) return (this.serdeContext?.base64Decoder ?? fromBase64)(data);
			if (ns.isTimestampSchema()) switch (determineTimestampFormat(ns, this.settings)) {
				case 5: return _parseRfc3339DateTimeWithOffset(data);
				case 6: return _parseRfc7231DateTime(data);
				case 7: return _parseEpochTimestamp(data);
				default:
					console.warn("Missing timestamp format, parsing value with Date constructor:", data);
					return new Date(data);
			}
			if (ns.isStringSchema()) {
				const mediaType = ns.getMergedTraits().mediaType;
				let intermediateValue = data;
				if (mediaType) {
					if (ns.getMergedTraits().httpHeader) intermediateValue = this.base64ToUtf8(intermediateValue);
					if (mediaType === "application/json" || mediaType.endsWith("+json")) intermediateValue = LazyJsonString.from(intermediateValue);
					return intermediateValue;
				}
			}
			if (ns.isNumericSchema()) return Number(data);
			if (ns.isBigIntegerSchema()) return BigInt(data);
			if (ns.isBigDecimalSchema()) return new NumericValue(data, "bigDecimal");
			if (ns.isBooleanSchema()) return String(data).toLowerCase() === "true";
			return data;
		}
		base64ToUtf8(base64String) {
			return (this.serdeContext?.utf8Encoder ?? toUtf8)((this.serdeContext?.base64Decoder ?? fromBase64)(base64String));
		}
	};
	var HttpInterceptingShapeDeserializer = class extends SerdeContext {
		codecDeserializer;
		stringDeserializer;
		constructor(codecDeserializer, codecSettings) {
			super();
			this.codecDeserializer = codecDeserializer;
			this.stringDeserializer = new FromStringShapeDeserializer(codecSettings);
		}
		setSerdeContext(serdeContext) {
			this.stringDeserializer.setSerdeContext(serdeContext);
			this.codecDeserializer.setSerdeContext(serdeContext);
			this.serdeContext = serdeContext;
		}
		read(schema, data) {
			const ns = NormalizedSchema.of(schema);
			const traits = ns.getMergedTraits();
			const toString = this.serdeContext?.utf8Encoder ?? toUtf8;
			if (traits.httpHeader || traits.httpResponseCode) return this.stringDeserializer.read(ns, toString(data));
			if (traits.httpPayload) {
				if (ns.isBlobSchema()) {
					const toBytes = this.serdeContext?.utf8Decoder ?? fromUtf8;
					if (typeof data === "string") return toBytes(data);
					return data;
				} else if (ns.isStringSchema()) {
					if ("byteLength" in data) return toString(data);
					return data;
				}
			}
			return this.codecDeserializer.read(ns, data);
		}
	};
	var ToStringShapeSerializer = class extends SerdeContext {
		settings;
		stringBuffer = "";
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema, value) {
			const ns = NormalizedSchema.of(schema);
			switch (typeof value) {
				case "object":
					if (value === null) {
						this.stringBuffer = "null";
						return;
					}
					if (ns.isTimestampSchema()) {
						if (!(value instanceof Date)) throw new Error(`@smithy/core/protocols - received non-Date value ${value} when schema expected Date in ${ns.getName(true)}`);
						switch (determineTimestampFormat(ns, this.settings)) {
							case 5:
								this.stringBuffer = value.toISOString().replace(".000Z", "Z");
								break;
							case 6:
								this.stringBuffer = dateToUtcString(value);
								break;
							case 7:
								this.stringBuffer = String(value.getTime() / 1e3);
								break;
							default:
								console.warn("Missing timestamp format, using epoch seconds", value);
								this.stringBuffer = String(value.getTime() / 1e3);
						}
						return;
					}
					if (ns.isBlobSchema() && "byteLength" in value) {
						this.stringBuffer = (this.serdeContext?.base64Encoder ?? toBase64)(value);
						return;
					}
					if (ns.isListSchema() && Array.isArray(value)) {
						let buffer = "";
						for (const item of value) {
							this.write([ns.getValueSchema(), ns.getMergedTraits()], item);
							const headerItem = this.flush();
							const serialized = ns.getValueSchema().isTimestampSchema() ? headerItem : quoteHeader(headerItem);
							if (buffer !== "") buffer += ", ";
							buffer += serialized;
						}
						this.stringBuffer = buffer;
						return;
					}
					this.stringBuffer = JSON.stringify(value, null, 2);
					break;
				case "string":
					const mediaType = ns.getMergedTraits().mediaType;
					let intermediateValue = value;
					if (mediaType) {
						if (mediaType === "application/json" || mediaType.endsWith("+json")) intermediateValue = LazyJsonString.from(intermediateValue);
						if (ns.getMergedTraits().httpHeader) {
							this.stringBuffer = (this.serdeContext?.base64Encoder ?? toBase64)(intermediateValue.toString());
							return;
						}
					}
					this.stringBuffer = value;
					break;
				default: if (ns.isIdempotencyToken()) this.stringBuffer = generateIdempotencyToken();
				else this.stringBuffer = String(value);
			}
		}
		flush() {
			const buffer = this.stringBuffer;
			this.stringBuffer = "";
			return buffer;
		}
	};
	var HttpInterceptingShapeSerializer = class {
		codecSerializer;
		stringSerializer;
		buffer;
		constructor(codecSerializer, codecSettings, stringSerializer = new ToStringShapeSerializer(codecSettings)) {
			this.codecSerializer = codecSerializer;
			this.stringSerializer = stringSerializer;
		}
		setSerdeContext(serdeContext) {
			this.codecSerializer.setSerdeContext(serdeContext);
			this.stringSerializer.setSerdeContext(serdeContext);
		}
		write(schema, value) {
			const ns = NormalizedSchema.of(schema);
			const traits = ns.getMergedTraits();
			if (traits.httpHeader || traits.httpLabel || traits.httpQuery) {
				this.stringSerializer.write(ns, value);
				this.buffer = this.stringSerializer.flush();
				return;
			}
			return this.codecSerializer.write(ns, value);
		}
		flush() {
			if (this.buffer !== void 0) {
				const buffer = this.buffer;
				this.buffer = void 0;
				return buffer;
			}
			return this.codecSerializer.flush();
		}
	};
	var Field = class {
		name;
		kind;
		values;
		constructor({ name, kind = FieldPosition.HEADER, values = [] }) {
			this.name = name;
			this.kind = kind;
			this.values = values;
		}
		add(value) {
			this.values.push(value);
		}
		set(values) {
			this.values = values;
		}
		remove(value) {
			this.values = this.values.filter((v) => v !== value);
		}
		toString() {
			return this.values.map((v) => v.includes(",") || v.includes(" ") ? `"${v}"` : v).join(", ");
		}
		get() {
			return this.values;
		}
	};
	var Fields = class {
		entries = {};
		encoding;
		constructor({ fields = [], encoding = "utf-8" }) {
			fields.forEach(this.setField.bind(this));
			this.encoding = encoding;
		}
		setField(field) {
			this.entries[field.name.toLowerCase()] = field;
		}
		getField(name) {
			return this.entries[name.toLowerCase()];
		}
		removeField(name) {
			delete this.entries[name.toLowerCase()];
		}
		getByType(kind) {
			return Object.values(this.entries).filter((field) => field.kind === kind);
		}
	};
	var getHttpHandlerExtensionConfiguration = (runtimeConfig) => {
		return {
			setHttpHandler(handler) {
				runtimeConfig.httpHandler = handler;
			},
			httpHandler() {
				return runtimeConfig.httpHandler;
			},
			updateHttpClientConfig(key, value) {
				runtimeConfig.httpHandler?.updateHttpClientConfig(key, value);
			},
			httpHandlerConfigs() {
				return runtimeConfig.httpHandler.httpHandlerConfigs();
			}
		};
	};
	var resolveHttpHandlerRuntimeConfig = (httpHandlerExtensionConfiguration) => {
		return { httpHandler: httpHandlerExtensionConfiguration.httpHandler() };
	};
	var CONTENT_LENGTH_HEADER = "content-length";
	function contentLengthMiddleware(bodyLengthChecker) {
		return (next) => async (args) => {
			const request = args.request;
			if (HttpRequest.isInstance(request)) {
				const { body, headers } = request;
				if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) try {
					const length = bodyLengthChecker(body);
					request.headers = {
						...request.headers,
						[CONTENT_LENGTH_HEADER]: String(length)
					};
				} catch (error) {}
			}
			return next({
				...args,
				request
			});
		};
	}
	var contentLengthMiddlewareOptions = {
		step: "build",
		tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
		name: "contentLengthMiddleware",
		override: true
	};
	var getContentLengthPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
	} });
	var escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
	var hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
	var escapeUriPath = (uri) => uri.split("/").map(escapeUri).join("/");
	function buildQueryString(query) {
		const parts = [];
		for (let key of Object.keys(query).sort()) {
			const value = query[key];
			key = escapeUri(key);
			if (Array.isArray(value)) for (let i = 0, iLen = value.length; i < iLen; i++) parts.push(`${key}=${escapeUri(value[i])}`);
			else {
				let qsEntry = key;
				if (value || typeof value === "string") qsEntry += `=${escapeUri(value)}`;
				parts.push(qsEntry);
			}
		}
		return parts.join("&");
	}
	exports.Field = Field;
	exports.Fields = Fields;
	exports.FromStringShapeDeserializer = FromStringShapeDeserializer;
	exports.HttpBindingProtocol = HttpBindingProtocol;
	exports.HttpInterceptingShapeDeserializer = HttpInterceptingShapeDeserializer;
	exports.HttpInterceptingShapeSerializer = HttpInterceptingShapeSerializer;
	exports.HttpProtocol = HttpProtocol;
	exports.RequestBuilder = RequestBuilder;
	exports.RpcProtocol = RpcProtocol;
	exports.SerdeContext = SerdeContext;
	exports.ToStringShapeSerializer = ToStringShapeSerializer;
	exports.buildQueryString = buildQueryString;
	exports.collectBody = collectBody;
	exports.contentLengthMiddleware = contentLengthMiddleware;
	exports.contentLengthMiddlewareOptions = contentLengthMiddlewareOptions;
	exports.determineTimestampFormat = determineTimestampFormat;
	exports.escapeUri = escapeUri;
	exports.escapeUriPath = escapeUriPath;
	exports.extendedEncodeURIComponent = extendedEncodeURIComponent;
	exports.getContentLengthPlugin = getContentLengthPlugin;
	exports.getHttpHandlerExtensionConfiguration = getHttpHandlerExtensionConfiguration;
	exports.requestBuilder = requestBuilder;
	exports.resolveHttpHandlerRuntimeConfig = resolveHttpHandlerRuntimeConfig;
	exports.resolvedPath = resolvedPath;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/retry/index.js
var require_retry = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { Readable } = __require("node:stream");
	var { NoOpLogger, normalizeProvider } = require_client$1();
	var { HttpResponse, HttpRequest } = require_protocols();
	var { parseRfc7231DateTime, v4 } = require_serde();
	var isStreamingPayload = (request) => request?.body instanceof Readable || typeof ReadableStream !== "undefined" && request?.body instanceof ReadableStream;
	var CLOCK_SKEW_ERROR_CODES = [
		"AuthFailure",
		"InvalidSignatureException",
		"RequestExpired",
		"RequestInTheFuture",
		"RequestTimeTooSkewed",
		"SignatureDoesNotMatch"
	];
	var THROTTLING_ERROR_CODES = [
		"BandwidthLimitExceeded",
		"EC2ThrottledException",
		"LimitExceededException",
		"PriorRequestNotComplete",
		"ProvisionedThroughputExceededException",
		"RequestLimitExceeded",
		"RequestThrottled",
		"RequestThrottledException",
		"SlowDown",
		"ThrottledException",
		"Throttling",
		"ThrottlingException",
		"TooManyRequestsException",
		"TransactionInProgressException"
	];
	var TRANSIENT_ERROR_CODES = [
		"TimeoutError",
		"RequestTimeout",
		"RequestTimeoutException"
	];
	var TRANSIENT_ERROR_STATUS_CODES = [
		500,
		502,
		503,
		504
	];
	var NODEJS_TIMEOUT_ERROR_CODES = [
		"ECONNRESET",
		"ECONNREFUSED",
		"EPIPE",
		"ETIMEDOUT"
	];
	var NODEJS_NETWORK_ERROR_CODES = [
		"EHOSTUNREACH",
		"ENETUNREACH",
		"ENOTFOUND",
		"EAI_AGAIN"
	];
	var isRetryableByTrait = (error) => error?.$retryable !== void 0;
	var isClockSkewError = (error) => CLOCK_SKEW_ERROR_CODES.includes(error.name);
	var isClockSkewCorrectedError = (error) => error.$metadata?.clockSkewCorrected;
	var isBrowserNetworkError = (error) => {
		const errorMessages = new Set([
			"Failed to fetch",
			"NetworkError when attempting to fetch resource",
			"The Internet connection appears to be offline",
			"Load failed",
			"Network request failed"
		]);
		if (!(error && error instanceof TypeError)) return false;
		return errorMessages.has(error.message);
	};
	var isThrottlingError = (error) => error.$metadata?.httpStatusCode === 429 || THROTTLING_ERROR_CODES.includes(error.name) || error.$retryable?.throttling == true;
	var isTransientError = (error, depth = 0) => isRetryableByTrait(error) || isClockSkewCorrectedError(error) || error.name === "InvalidSignatureException" && error.message?.includes("Signature expired") || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") || NODEJS_NETWORK_ERROR_CODES.includes(error?.code || "") || TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || isNodeJsHttp2TransientError(error) || error.cause !== void 0 && depth <= 10 && isTransientError(error.cause, depth + 1);
	var isServerError = (error) => {
		if (error.$metadata?.httpStatusCode !== void 0) {
			const statusCode = error.$metadata.httpStatusCode;
			if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) return true;
			return false;
		}
		return false;
	};
	function isNodeJsHttp2TransientError(error) {
		return error.code === "ERR_HTTP2_STREAM_ERROR" && error.message.includes("NGHTTP2_REFUSED_STREAM");
	}
	var DEFAULT_RETRY_DELAY_BASE = 100;
	var MAXIMUM_RETRY_DELAY = 20 * 1e3;
	var THROTTLING_RETRY_DELAY_BASE = 500;
	var INITIAL_RETRY_TOKENS = 500;
	var RETRY_COST = 5;
	var TIMEOUT_RETRY_COST = 10;
	var NO_RETRY_INCREMENT = 1;
	var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
	var REQUEST_HEADER = "amz-sdk-request";
	function parseRetryAfterHeader(response, logger) {
		if (!HttpResponse.isInstance(response)) return;
		for (const header of Object.keys(response.headers)) {
			const h = header.toLowerCase();
			if (h === "retry-after") {
				const retryAfter = response.headers[header];
				let retryAfterSeconds = NaN;
				if (retryAfter.endsWith("GMT")) try {
					retryAfterSeconds = (parseRfc7231DateTime(retryAfter).getTime() - Date.now()) / 1e3;
				} catch (e) {
					logger?.trace?.("Failed to parse retry-after header");
					logger?.trace?.(e);
				}
				else if (retryAfter.match(/ GMT, ((\d+)|(\d+\.\d+))$/)) retryAfterSeconds = Number(retryAfter.match(/ GMT, ([\d.]+)$/)?.[1]);
				else if (retryAfter.match(/^((\d+)|(\d+\.\d+))$/)) retryAfterSeconds = Number(retryAfter);
				else if (Date.parse(retryAfter) >= Date.now()) retryAfterSeconds = (Date.parse(retryAfter) - Date.now()) / 1e3;
				if (isNaN(retryAfterSeconds)) return;
				return new Date(Date.now() + retryAfterSeconds * 1e3);
			} else if (h === "x-amz-retry-after") {
				const v = response.headers[header];
				const backoffMilliseconds = Number(v);
				if (isNaN(backoffMilliseconds)) {
					logger?.trace?.(`Failed to parse x-amz-retry-after=${v}`);
					return;
				}
				return new Date(Date.now() + backoffMilliseconds);
			}
		}
	}
	function getRetryAfterHint(response, logger) {
		return parseRetryAfterHeader(response, logger);
	}
	var asSdkError = (error) => {
		if (error instanceof Error) return error;
		if (error instanceof Object) return Object.assign(/* @__PURE__ */ new Error(), error);
		if (typeof error === "string") return new Error(error);
		return /* @__PURE__ */ new Error(`AWS SDK error wrapper for ${error}`);
	};
	function bindRetryMiddleware(isStreamingPayload) {
		return (options) => (next, context) => async (args) => {
			let retryStrategy = await options.retryStrategy();
			const maxAttempts = await options.maxAttempts();
			if (isRetryStrategyV2(retryStrategy)) {
				retryStrategy = retryStrategy;
				let retryToken = await retryStrategy.acquireInitialRetryToken((context["partition_id"] ?? "") + (context.__retryLongPoll ? ":longpoll" : ""));
				let lastError = /* @__PURE__ */ new Error();
				let attempts = 0;
				let totalRetryDelay = 0;
				const { request } = args;
				const isRequest = HttpRequest.isInstance(request);
				if (isRequest) request.headers[INVOCATION_ID_HEADER] = v4();
				while (true) try {
					if (isRequest) request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
					const { response, output } = await next(args);
					retryStrategy.recordSuccess(retryToken);
					output.$metadata.attempts = attempts + 1;
					output.$metadata.totalRetryDelay = totalRetryDelay;
					return {
						response,
						output
					};
				} catch (e) {
					const retryErrorInfo = getRetryErrorInfo(e, options.logger);
					lastError = asSdkError(e);
					if (isRequest && isStreamingPayload(request)) {
						(context.logger instanceof NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
						throw lastError;
					}
					try {
						retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
					} catch (refreshError) {
						if (!lastError.$metadata) lastError.$metadata = {};
						lastError.$metadata.attempts = attempts + 1;
						lastError.$metadata.totalRetryDelay = totalRetryDelay;
						throw lastError;
					}
					attempts = retryToken.getRetryCount();
					const delay = retryToken.getRetryDelay();
					totalRetryDelay += (retryToken?.$retryLog?.acquisitionDelay ?? 0) + delay;
					if (delay > 0) await cooldown(delay);
				}
			} else {
				retryStrategy = retryStrategy;
				if (retryStrategy?.mode) context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
				return retryStrategy.retry(next, args);
			}
		};
	}
	var cooldown = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	var isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
	var getRetryErrorInfo = (error, logger) => {
		const errorInfo = {
			error,
			errorType: getRetryErrorType(error)
		};
		const retryAfterHint = parseRetryAfterHeader(error.$response, logger);
		if (retryAfterHint) errorInfo.retryAfterHint = retryAfterHint;
		return errorInfo;
	};
	var getRetryErrorType = (error) => {
		if (isThrottlingError(error)) return "THROTTLING";
		if (isTransientError(error)) return "TRANSIENT";
		if (isServerError(error)) return "SERVER_ERROR";
		return "CLIENT_ERROR";
	};
	var retryMiddlewareOptions = {
		name: "retryMiddleware",
		tags: ["RETRY"],
		step: "finalizeRequest",
		priority: "high",
		override: true
	};
	function bindGetRetryPlugin(isStreamingPayload) {
		const retryMiddleware = bindRetryMiddleware(isStreamingPayload);
		return (options) => ({ applyToStack: (clientStack) => {
			clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
		} });
	}
	var DefaultRateLimiter = class DefaultRateLimiter {
		static setTimeoutFn = (fn, delay) => setTimeout(fn, delay);
		beta;
		minCapacity;
		minFillRate;
		scaleConstant;
		smooth;
		enabled = false;
		availableTokens = 0;
		lastMaxRate = 0;
		measuredTxRate = 0;
		requestCount = 0;
		fillRate;
		lastThrottleTime;
		lastTimestamp = 0;
		lastTxRateBucket;
		maxCapacity;
		timeWindow = 0;
		constructor(options) {
			this.beta = options?.beta ?? .7;
			this.minCapacity = options?.minCapacity ?? 1;
			this.minFillRate = options?.minFillRate ?? .5;
			this.scaleConstant = options?.scaleConstant ?? .4;
			this.smooth = options?.smooth ?? .8;
			this.lastThrottleTime = this.getCurrentTimeInSeconds();
			this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
			this.fillRate = this.minFillRate;
			this.maxCapacity = this.minCapacity;
		}
		async getSendToken() {
			return this.acquireTokenBucket(1);
		}
		updateClientSendingRate(response) {
			let calculatedRate;
			this.updateMeasuredRate();
			const retryErrorInfo = response;
			if (retryErrorInfo?.errorType === "THROTTLING" || isThrottlingError(retryErrorInfo?.error ?? response)) {
				const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
				this.lastMaxRate = rateToUse;
				this.calculateTimeWindow();
				this.lastThrottleTime = this.getCurrentTimeInSeconds();
				calculatedRate = this.cubicThrottle(rateToUse);
				this.enableTokenBucket();
			} else {
				this.calculateTimeWindow();
				calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
			}
			const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
			this.updateTokenBucketRate(newRate);
		}
		getCurrentTimeInSeconds() {
			return Date.now() / 1e3;
		}
		async acquireTokenBucket(amount) {
			if (!this.enabled) return;
			this.refillTokenBucket();
			while (amount > this.availableTokens) {
				const delay = (amount - this.availableTokens) / this.fillRate * 1e3;
				await new Promise((resolve) => DefaultRateLimiter.setTimeoutFn(resolve, delay));
				this.refillTokenBucket();
			}
			this.availableTokens = this.availableTokens - amount;
		}
		refillTokenBucket() {
			const timestamp = this.getCurrentTimeInSeconds();
			if (!this.lastTimestamp) {
				this.lastTimestamp = timestamp;
				return;
			}
			const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
			this.availableTokens = Math.min(this.maxCapacity, this.availableTokens + fillAmount);
			this.lastTimestamp = timestamp;
		}
		calculateTimeWindow() {
			this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
		}
		cubicThrottle(rateToUse) {
			return this.getPrecise(rateToUse * this.beta);
		}
		cubicSuccess(timestamp) {
			return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
		}
		enableTokenBucket() {
			this.enabled = true;
		}
		updateTokenBucketRate(newRate) {
			this.refillTokenBucket();
			this.fillRate = Math.max(newRate, this.minFillRate);
			this.maxCapacity = Math.max(newRate, this.minCapacity);
			this.availableTokens = Math.min(this.availableTokens, this.maxCapacity);
		}
		updateMeasuredRate() {
			const t = this.getCurrentTimeInSeconds();
			const timeBucket = Math.floor(t * 2) / 2;
			this.requestCount++;
			if (timeBucket > this.lastTxRateBucket) {
				const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
				this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
				this.requestCount = 0;
				this.lastTxRateBucket = timeBucket;
			}
		}
		getPrecise(num) {
			return parseFloat(num.toFixed(8));
		}
	};
	var Retry = class Retry {
		static v2026 = typeof process !== "undefined" && process.env?.SMITHY_NEW_RETRIES_2026 === "true";
		static delay() {
			return Retry.v2026 ? 50 : 100;
		}
		static throttlingDelay() {
			return Retry.v2026 ? 1e3 : 500;
		}
		static cost() {
			return Retry.v2026 ? 14 : 5;
		}
		static throttlingCost() {
			return Retry.v2026 ? 5 : 10;
		}
		static modifiedCostType() {
			return Retry.v2026 ? "THROTTLING" : "TRANSIENT";
		}
	};
	var DefaultRetryBackoffStrategy = class {
		x = Retry.delay();
		computeNextBackoffDelay(i) {
			const t_i = Math.random() * Math.min(this.x * 2 ** i, MAXIMUM_RETRY_DELAY);
			return Math.floor(t_i);
		}
		setDelayBase(delay) {
			this.x = delay;
		}
	};
	var DefaultRetryToken = class {
		delay;
		count;
		cost;
		longPoll;
		$retryLog = { acquisitionDelay: 0 };
		constructor(delay, count, cost, longPoll) {
			this.delay = delay;
			this.count = count;
			this.cost = cost;
			this.longPoll = longPoll;
		}
		getRetryCount() {
			return this.count;
		}
		getRetryDelay() {
			return Math.min(MAXIMUM_RETRY_DELAY, this.delay);
		}
		getRetryCost() {
			return this.cost;
		}
		isLongPoll() {
			return this.longPoll;
		}
	};
	var RETRY_MODES;
	(function(RETRY_MODES) {
		RETRY_MODES["STANDARD"] = "standard";
		RETRY_MODES["ADAPTIVE"] = "adaptive";
	})(RETRY_MODES || (RETRY_MODES = {}));
	var DEFAULT_MAX_ATTEMPTS = 3;
	var DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;
	var refusal = {
		incompatible: 1,
		attempts: 2,
		capacity: 3
	};
	var StandardRetryStrategy$1 = class StandardRetryStrategy {
		mode = RETRY_MODES.STANDARD;
		retryBackoffStrategy;
		capacity = INITIAL_RETRY_TOKENS;
		maxAttemptsProvider;
		baseDelay;
		constructor(arg1) {
			if (typeof arg1 === "number") this.maxAttemptsProvider = async () => arg1;
			else if (typeof arg1 === "function") this.maxAttemptsProvider = arg1;
			else if (arg1 && typeof arg1 === "object") {
				this.maxAttemptsProvider = async () => arg1.maxAttempts;
				this.baseDelay = arg1.baseDelay;
				this.retryBackoffStrategy = arg1.backoff;
			}
			this.maxAttemptsProvider ??= async () => DEFAULT_MAX_ATTEMPTS;
			this.baseDelay ??= Retry.delay();
			this.retryBackoffStrategy ??= new DefaultRetryBackoffStrategy();
		}
		async acquireInitialRetryToken(retryTokenScope) {
			return new DefaultRetryToken(Retry.delay(), 0, void 0, Retry.v2026 && retryTokenScope.includes(":longpoll"));
		}
		async refreshRetryTokenForRetry(token, errorInfo) {
			const maxAttempts = await this.getMaxAttempts();
			const retryCode = this.retryCode(token, errorInfo, maxAttempts);
			const shouldRetry = retryCode === 0;
			const isLongPoll = token.isLongPoll?.();
			if (shouldRetry || isLongPoll) {
				const errorType = errorInfo.errorType;
				this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? Retry.throttlingDelay() : this.baseDelay);
				const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
				let retryDelay = delayFromErrorType;
				if (errorInfo.retryAfterHint instanceof Date) retryDelay = Math.max(delayFromErrorType, Math.min(errorInfo.retryAfterHint.getTime() - Date.now(), delayFromErrorType + 5e3));
				if (!shouldRetry) {
					const longPollBackoff = Retry.v2026 && retryCode === refusal.capacity && isLongPoll ? retryDelay : 0;
					if (longPollBackoff > 0) await new Promise((r) => setTimeout(r, longPollBackoff));
				} else {
					const capacityCost = this.getCapacityCost(errorType);
					this.capacity -= capacityCost;
					const nextToken = new DefaultRetryToken(0, token.getRetryCount() + 1, capacityCost, token.isLongPoll?.() ?? false);
					await new Promise((r) => setTimeout(r, retryDelay));
					nextToken.$retryLog.acquisitionDelay = retryDelay;
					return nextToken;
				}
			}
			throw new Error("No retry token available");
		}
		recordSuccess(token) {
			this.capacity = Math.min(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
		}
		getCapacity() {
			return this.capacity;
		}
		async maxAttempts() {
			return this.maxAttemptsProvider();
		}
		async getMaxAttempts() {
			try {
				return await this.maxAttemptsProvider();
			} catch (error) {
				console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
				return DEFAULT_MAX_ATTEMPTS;
			}
		}
		retryCode(tokenToRenew, errorInfo, maxAttempts) {
			const attempts = tokenToRenew.getRetryCount() + 1;
			const retryableStatus = this.isRetryableError(errorInfo.errorType) ? 0 : refusal.incompatible;
			const attemptStatus = attempts < maxAttempts ? 0 : refusal.attempts;
			const capacityStatus = this.capacity >= this.getCapacityCost(errorInfo.errorType) ? 0 : refusal.capacity;
			return retryableStatus || attemptStatus || capacityStatus;
		}
		getCapacityCost(errorType) {
			return errorType === Retry.modifiedCostType() ? Retry.throttlingCost() : Retry.cost();
		}
		isRetryableError(errorType) {
			return errorType === "THROTTLING" || errorType === "TRANSIENT";
		}
	};
	var AdaptiveRetryStrategy$1 = class AdaptiveRetryStrategy {
		mode = RETRY_MODES.ADAPTIVE;
		rateLimiter;
		standardRetryStrategy;
		constructor(maxAttemptsProvider, options) {
			const { rateLimiter } = options ?? {};
			this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
			this.standardRetryStrategy = options ? new StandardRetryStrategy$1({
				maxAttempts: typeof maxAttemptsProvider === "number" ? maxAttemptsProvider : 3,
				...options
			}) : new StandardRetryStrategy$1(maxAttemptsProvider);
		}
		async acquireInitialRetryToken(retryTokenScope) {
			const token = await this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
			await this.rateLimiter.getSendToken();
			return token;
		}
		async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
			this.rateLimiter.updateClientSendingRate(errorInfo);
			const token = await this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
			await this.rateLimiter.getSendToken();
			return token;
		}
		recordSuccess(token) {
			this.rateLimiter.updateClientSendingRate({});
			this.standardRetryStrategy.recordSuccess(token);
		}
		async maxAttemptsProvider() {
			return this.standardRetryStrategy.maxAttempts();
		}
	};
	var ConfiguredRetryStrategy = class extends StandardRetryStrategy$1 {
		computeNextBackoffDelay;
		constructor(maxAttempts, computeNextBackoffDelay = Retry.delay()) {
			super(typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts);
			if (typeof computeNextBackoffDelay === "number") this.computeNextBackoffDelay = () => computeNextBackoffDelay;
			else this.computeNextBackoffDelay = computeNextBackoffDelay;
			this.retryBackoffStrategy.computeNextBackoffDelay = (completedAttempt) => {
				const nextAttempt = completedAttempt + 1;
				return this.computeNextBackoffDelay(nextAttempt);
			};
		}
	};
	var getDefaultRetryQuota = (initialRetryTokens, options) => {
		const MAX_CAPACITY = initialRetryTokens;
		const noRetryIncrement = NO_RETRY_INCREMENT;
		const retryCost = RETRY_COST;
		const timeoutRetryCost = TIMEOUT_RETRY_COST;
		let availableCapacity = initialRetryTokens;
		const getCapacityAmount = (error) => error.name === "TimeoutError" ? timeoutRetryCost : retryCost;
		const hasRetryTokens = (error) => getCapacityAmount(error) <= availableCapacity;
		const retrieveRetryTokens = (error) => {
			if (!hasRetryTokens(error)) throw new Error("No retry token available");
			const capacityAmount = getCapacityAmount(error);
			availableCapacity -= capacityAmount;
			return capacityAmount;
		};
		const releaseRetryTokens = (capacityReleaseAmount) => {
			availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
			availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
		};
		return Object.freeze({
			hasRetryTokens,
			retrieveRetryTokens,
			releaseRetryTokens
		});
	};
	var defaultDelayDecider = (delayBase, attempts) => Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
	var defaultRetryDecider = (error) => {
		if (!error) return false;
		return isRetryableByTrait(error) || isClockSkewError(error) || isThrottlingError(error) || isTransientError(error);
	};
	var StandardRetryStrategy = class {
		maxAttemptsProvider;
		retryDecider;
		delayDecider;
		retryQuota;
		mode = RETRY_MODES.STANDARD;
		constructor(maxAttemptsProvider, options) {
			this.maxAttemptsProvider = maxAttemptsProvider;
			this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
			this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
			this.retryQuota = options?.retryQuota ?? getDefaultRetryQuota(INITIAL_RETRY_TOKENS);
		}
		shouldRetry(error, attempts, maxAttempts) {
			return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
		}
		async getMaxAttempts() {
			let maxAttempts;
			try {
				maxAttempts = await this.maxAttemptsProvider();
			} catch (error) {
				maxAttempts = DEFAULT_MAX_ATTEMPTS;
			}
			return maxAttempts;
		}
		async retry(next, args, options) {
			let retryTokenAmount;
			let attempts = 0;
			let totalDelay = 0;
			const maxAttempts = await this.getMaxAttempts();
			const { request } = args;
			if (HttpRequest.isInstance(request)) request.headers[INVOCATION_ID_HEADER] = v4();
			while (true) try {
				if (HttpRequest.isInstance(request)) request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
				if (options?.beforeRequest) await options.beforeRequest();
				const { response, output } = await next(args);
				if (options?.afterRequest) options.afterRequest(response);
				this.retryQuota.releaseRetryTokens(retryTokenAmount);
				output.$metadata.attempts = attempts + 1;
				output.$metadata.totalRetryDelay = totalDelay;
				return {
					response,
					output
				};
			} catch (e) {
				const err = asSdkError(e);
				attempts++;
				if (this.shouldRetry(err, attempts, maxAttempts)) {
					retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
					const delayFromDecider = this.delayDecider(isThrottlingError(err) ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE, attempts);
					const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
					const delay = Math.max(delayFromResponse || 0, delayFromDecider);
					totalDelay += delay;
					await new Promise((resolve) => setTimeout(resolve, delay));
					continue;
				}
				if (!err.$metadata) err.$metadata = {};
				err.$metadata.attempts = attempts;
				err.$metadata.totalRetryDelay = totalDelay;
				throw err;
			}
		}
	};
	var getDelayFromRetryAfterHeader = (response) => {
		if (!HttpResponse.isInstance(response)) return;
		const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
		if (!retryAfterHeaderName) return;
		const retryAfter = response.headers[retryAfterHeaderName];
		const retryAfterSeconds = Number(retryAfter);
		if (!Number.isNaN(retryAfterSeconds)) return Math.min(retryAfterSeconds * 1e3, 2e4);
		const retryAfterDate = new Date(retryAfter);
		return Math.min(retryAfterDate.getTime() - Date.now(), 2e4);
	};
	var AdaptiveRetryStrategy = class extends StandardRetryStrategy {
		rateLimiter;
		constructor(maxAttemptsProvider, options) {
			const { rateLimiter, ...superOptions } = options ?? {};
			super(maxAttemptsProvider, superOptions);
			this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
			this.mode = RETRY_MODES.ADAPTIVE;
		}
		async retry(next, args) {
			return super.retry(next, args, {
				beforeRequest: async () => {
					return this.rateLimiter.getSendToken();
				},
				afterRequest: (response) => {
					this.rateLimiter.updateClientSendingRate(response);
				}
			});
		}
	};
	var ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
	var CONFIG_MAX_ATTEMPTS = "max_attempts";
	var NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => {
			const value = env[ENV_MAX_ATTEMPTS];
			if (!value) return void 0;
			const maxAttempt = parseInt(value);
			if (Number.isNaN(maxAttempt)) throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
			return maxAttempt;
		},
		configFileSelector: (profile) => {
			const value = profile[CONFIG_MAX_ATTEMPTS];
			if (!value) return void 0;
			const maxAttempt = parseInt(value);
			if (Number.isNaN(maxAttempt)) throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
			return maxAttempt;
		},
		default: DEFAULT_MAX_ATTEMPTS
	};
	var resolveRetryConfig = (input, defaults) => {
		const { retryStrategy, retryMode } = input;
		const { defaultMaxAttempts = DEFAULT_MAX_ATTEMPTS, defaultBaseDelay = Retry.delay() } = defaults ?? {};
		const maxAttemptsProvider = normalizeProvider(input.maxAttempts ?? defaultMaxAttempts);
		let controller = retryStrategy ? Promise.resolve(retryStrategy) : void 0;
		const getDefault = async () => {
			const maxAttempts = await maxAttemptsProvider();
			if (await normalizeProvider(retryMode)() === RETRY_MODES.ADAPTIVE) return new AdaptiveRetryStrategy$1(maxAttemptsProvider, {
				maxAttempts,
				baseDelay: defaultBaseDelay
			});
			return new StandardRetryStrategy$1({
				maxAttempts,
				baseDelay: defaultBaseDelay
			});
		};
		return Object.assign(input, {
			maxAttempts: maxAttemptsProvider,
			retryStrategy: () => controller ??= getDefault()
		});
	};
	var ENV_RETRY_MODE = "AWS_RETRY_MODE";
	var CONFIG_RETRY_MODE = "retry_mode";
	var NODE_RETRY_MODE_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
		configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
		default: DEFAULT_RETRY_MODE
	};
	var omitRetryHeadersMiddleware = () => (next) => async (args) => {
		const { request } = args;
		if (HttpRequest.isInstance(request)) {
			delete request.headers[INVOCATION_ID_HEADER];
			delete request.headers[REQUEST_HEADER];
		}
		return next(args);
	};
	var omitRetryHeadersMiddlewareOptions = {
		name: "omitRetryHeadersMiddleware",
		tags: [
			"RETRY",
			"HEADERS",
			"OMIT_RETRY_HEADERS"
		],
		relation: "before",
		toMiddleware: "awsAuthMiddleware",
		override: true
	};
	var getOmitRetryHeadersPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
	} });
	var retryMiddleware = bindRetryMiddleware(isStreamingPayload);
	var getRetryPlugin = bindGetRetryPlugin(isStreamingPayload);
	exports.AdaptiveRetryStrategy = AdaptiveRetryStrategy$1;
	exports.CONFIG_MAX_ATTEMPTS = CONFIG_MAX_ATTEMPTS;
	exports.CONFIG_RETRY_MODE = CONFIG_RETRY_MODE;
	exports.ConfiguredRetryStrategy = ConfiguredRetryStrategy;
	exports.DEFAULT_MAX_ATTEMPTS = DEFAULT_MAX_ATTEMPTS;
	exports.DEFAULT_RETRY_DELAY_BASE = DEFAULT_RETRY_DELAY_BASE;
	exports.DEFAULT_RETRY_MODE = DEFAULT_RETRY_MODE;
	exports.DefaultRateLimiter = DefaultRateLimiter;
	exports.DeprecatedAdaptiveRetryStrategy = AdaptiveRetryStrategy;
	exports.DeprecatedStandardRetryStrategy = StandardRetryStrategy;
	exports.ENV_MAX_ATTEMPTS = ENV_MAX_ATTEMPTS;
	exports.ENV_RETRY_MODE = ENV_RETRY_MODE;
	exports.INITIAL_RETRY_TOKENS = INITIAL_RETRY_TOKENS;
	exports.INVOCATION_ID_HEADER = INVOCATION_ID_HEADER;
	exports.MAXIMUM_RETRY_DELAY = MAXIMUM_RETRY_DELAY;
	exports.NODE_MAX_ATTEMPT_CONFIG_OPTIONS = NODE_MAX_ATTEMPT_CONFIG_OPTIONS;
	exports.NODE_RETRY_MODE_CONFIG_OPTIONS = NODE_RETRY_MODE_CONFIG_OPTIONS;
	exports.NO_RETRY_INCREMENT = NO_RETRY_INCREMENT;
	exports.REQUEST_HEADER = REQUEST_HEADER;
	exports.RETRY_COST = RETRY_COST;
	exports.RETRY_MODES = RETRY_MODES;
	exports.Retry = Retry;
	exports.StandardRetryStrategy = StandardRetryStrategy$1;
	exports.THROTTLING_RETRY_DELAY_BASE = THROTTLING_RETRY_DELAY_BASE;
	exports.TIMEOUT_RETRY_COST = TIMEOUT_RETRY_COST;
	exports.defaultDelayDecider = defaultDelayDecider;
	exports.defaultRetryDecider = defaultRetryDecider;
	exports.getOmitRetryHeadersPlugin = getOmitRetryHeadersPlugin;
	exports.getRetryAfterHint = getRetryAfterHint;
	exports.getRetryPlugin = getRetryPlugin;
	exports.isBrowserNetworkError = isBrowserNetworkError;
	exports.isClockSkewCorrectedError = isClockSkewCorrectedError;
	exports.isClockSkewError = isClockSkewError;
	exports.isNodeJsHttp2TransientError = isNodeJsHttp2TransientError;
	exports.isRetryableByTrait = isRetryableByTrait;
	exports.isServerError = isServerError;
	exports.isThrottlingError = isThrottlingError;
	exports.isTransientError = isTransientError;
	exports.omitRetryHeadersMiddleware = omitRetryHeadersMiddleware;
	exports.omitRetryHeadersMiddlewareOptions = omitRetryHeadersMiddlewareOptions;
	exports.resolveRetryConfig = resolveRetryConfig;
	exports.retryMiddleware = retryMiddleware;
	exports.retryMiddlewareOptions = retryMiddlewareOptions;
}));
//#endregion
//#region ../../node_modules/.bun/@aws+lambda-invoke-store@0.2.4/node_modules/@aws/lambda-invoke-store/dist-cjs/invoke-store.js
var require_invoke_store = /* @__PURE__ */ __commonJSMin(((exports) => {
	var PROTECTED_KEYS = {
		REQUEST_ID: Symbol.for("_AWS_LAMBDA_REQUEST_ID"),
		X_RAY_TRACE_ID: Symbol.for("_AWS_LAMBDA_X_RAY_TRACE_ID"),
		TENANT_ID: Symbol.for("_AWS_LAMBDA_TENANT_ID")
	};
	var NO_GLOBAL_AWS_LAMBDA = ["true", "1"].includes(process.env?.AWS_LAMBDA_NODEJS_NO_GLOBAL_AWSLAMBDA ?? "");
	if (!NO_GLOBAL_AWS_LAMBDA) globalThis.awslambda = globalThis.awslambda || {};
	var InvokeStoreBase = class {
		static PROTECTED_KEYS = PROTECTED_KEYS;
		isProtectedKey(key) {
			return Object.values(PROTECTED_KEYS).includes(key);
		}
		getRequestId() {
			return this.get(PROTECTED_KEYS.REQUEST_ID) ?? "-";
		}
		getXRayTraceId() {
			return this.get(PROTECTED_KEYS.X_RAY_TRACE_ID);
		}
		getTenantId() {
			return this.get(PROTECTED_KEYS.TENANT_ID);
		}
	};
	var InvokeStoreSingle = class extends InvokeStoreBase {
		currentContext;
		getContext() {
			return this.currentContext;
		}
		hasContext() {
			return this.currentContext !== void 0;
		}
		get(key) {
			return this.currentContext?.[key];
		}
		set(key, value) {
			if (this.isProtectedKey(key)) throw new Error(`Cannot modify protected Lambda context field: ${String(key)}`);
			this.currentContext = this.currentContext || {};
			this.currentContext[key] = value;
		}
		run(context, fn) {
			this.currentContext = context;
			return fn();
		}
	};
	var InvokeStoreMulti = class InvokeStoreMulti extends InvokeStoreBase {
		als;
		static async create() {
			const instance = new InvokeStoreMulti();
			instance.als = new (await (import("node:async_hooks"))).AsyncLocalStorage();
			return instance;
		}
		getContext() {
			return this.als.getStore();
		}
		hasContext() {
			return this.als.getStore() !== void 0;
		}
		get(key) {
			return this.als.getStore()?.[key];
		}
		set(key, value) {
			if (this.isProtectedKey(key)) throw new Error(`Cannot modify protected Lambda context field: ${String(key)}`);
			const store = this.als.getStore();
			if (!store) throw new Error("No context available");
			store[key] = value;
		}
		run(context, fn) {
			return this.als.run(context, fn);
		}
	};
	exports.InvokeStore = void 0;
	(function(InvokeStore) {
		let instance = null;
		async function getInstanceAsync(forceInvokeStoreMulti) {
			if (!instance) instance = (async () => {
				const newInstance = forceInvokeStoreMulti === true || "AWS_LAMBDA_MAX_CONCURRENCY" in process.env ? await InvokeStoreMulti.create() : new InvokeStoreSingle();
				if (!NO_GLOBAL_AWS_LAMBDA && globalThis.awslambda?.InvokeStore) return globalThis.awslambda.InvokeStore;
				else if (!NO_GLOBAL_AWS_LAMBDA && globalThis.awslambda) {
					globalThis.awslambda.InvokeStore = newInstance;
					return newInstance;
				} else return newInstance;
			})();
			return instance;
		}
		InvokeStore.getInstanceAsync = getInstanceAsync;
		InvokeStore._testing = process.env.AWS_LAMBDA_BENCHMARK_MODE === "1" ? { reset: () => {
			instance = null;
			if (globalThis.awslambda?.InvokeStore) delete globalThis.awslambda.InvokeStore;
			globalThis.awslambda = { InvokeStore: void 0 };
		} } : void 0;
	})(exports.InvokeStore || (exports.InvokeStore = {}));
	exports.InvokeStoreBase = InvokeStoreBase;
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/index.js
var require_dist_cjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { getSmithyContext } = require_transport();
	exports.getSmithyContext = getSmithyContext;
	var { HttpRequest } = require_protocols();
	var { requestBuilder } = require_protocols();
	exports.requestBuilder = requestBuilder;
	var { HttpApiKeyAuthLocation } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var resolveAuthOptions = (candidateAuthOptions, authSchemePreference) => {
		if (!authSchemePreference || authSchemePreference.length === 0) return candidateAuthOptions;
		const preferredAuthOptions = [];
		for (const preferredSchemeName of authSchemePreference) for (const candidateAuthOption of candidateAuthOptions) if (candidateAuthOption.schemeId.split("#")[1] === preferredSchemeName) preferredAuthOptions.push(candidateAuthOption);
		for (const candidateAuthOption of candidateAuthOptions) if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) preferredAuthOptions.push(candidateAuthOption);
		return preferredAuthOptions;
	};
	function convertHttpAuthSchemesToMap(httpAuthSchemes) {
		const map = /* @__PURE__ */ new Map();
		for (const scheme of httpAuthSchemes) map.set(scheme.schemeId, scheme);
		return map;
	}
	var httpAuthSchemeMiddleware = (config, mwOptions) => (next, context) => async (args) => {
		const resolvedOptions = resolveAuthOptions(config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input)), config.authSchemePreference ? await config.authSchemePreference() : []);
		const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
		const smithyContext = getSmithyContext(context);
		const failureReasons = [];
		for (const option of resolvedOptions) {
			const scheme = authSchemes.get(option.schemeId);
			if (!scheme) {
				failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
				continue;
			}
			const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
			if (!identityProvider) {
				failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
				continue;
			}
			const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
			option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
			option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
			smithyContext.selectedHttpAuthScheme = {
				httpAuthOption: option,
				identity: await identityProvider(option.identityProperties),
				signer: scheme.signer
			};
			break;
		}
		if (!smithyContext.selectedHttpAuthScheme) throw new Error(failureReasons.join("\n"));
		return next(args);
	};
	var httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
		step: "serialize",
		tags: ["HTTP_AUTH_SCHEME"],
		name: "httpAuthSchemeMiddleware",
		override: true,
		relation: "before",
		toMiddleware: "endpointV2Middleware"
	};
	var getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
			httpAuthSchemeParametersProvider,
			identityProviderConfigProvider
		}), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
	} });
	var httpAuthSchemeMiddlewareOptions = {
		step: "serialize",
		tags: ["HTTP_AUTH_SCHEME"],
		name: "httpAuthSchemeMiddleware",
		override: true,
		relation: "before",
		toMiddleware: "serializerMiddleware"
	};
	var getHttpAuthSchemePlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
			httpAuthSchemeParametersProvider,
			identityProviderConfigProvider
		}), httpAuthSchemeMiddlewareOptions);
	} });
	var defaultErrorHandler = (signingProperties) => (error) => {
		throw error;
	};
	var defaultSuccessHandler = (httpResponse, signingProperties) => {};
	var httpSigningMiddleware = (config) => (next, context) => async (args) => {
		if (!HttpRequest.isInstance(args.request)) return next(args);
		const scheme = getSmithyContext(context).selectedHttpAuthScheme;
		if (!scheme) throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
		const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
		const output = await next({
			...args,
			request: await signer.sign(args.request, identity, signingProperties)
		}).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
		(signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
		return output;
	};
	var httpSigningMiddlewareOptions = {
		step: "finalizeRequest",
		tags: ["HTTP_SIGNING"],
		name: "httpSigningMiddleware",
		aliases: [
			"apiKeyMiddleware",
			"tokenMiddleware",
			"awsAuthMiddleware"
		],
		override: true,
		relation: "after",
		toMiddleware: "retryMiddleware"
	};
	var getHttpSigningPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(httpSigningMiddleware(), httpSigningMiddlewareOptions);
	} });
	var normalizeProvider = (input) => {
		if (typeof input === "function") return input;
		const promisified = Promise.resolve(input);
		return () => promisified;
	};
	var makePagedClientRequest = async (CommandCtor, client, input, withCommand = (_) => _, ...args) => {
		let command = new CommandCtor(input);
		command = withCommand(command) ?? command;
		return await client.send(command, ...args);
	};
	function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
		return async function* paginateOperation(config, input, ...additionalArguments) {
			const _input = input;
			let token = config.startingToken ?? _input[inputTokenName];
			let hasNext = true;
			let page;
			while (hasNext) {
				_input[inputTokenName] = token;
				if (pageSizeTokenName) _input[pageSizeTokenName] = _input[pageSizeTokenName] ?? config.pageSize;
				if (config.client instanceof ClientCtor) page = await makePagedClientRequest(CommandCtor, config.client, input, config.withCommand, ...additionalArguments);
				else throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
				yield page;
				const prevToken = token;
				token = get(page, outputTokenName);
				hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
			}
			return void 0;
		};
	}
	var get = (fromObject, path) => {
		let cursor = fromObject;
		const pathComponents = path.split(".");
		for (const step of pathComponents) {
			if (!cursor || typeof cursor !== "object") return;
			cursor = cursor[step];
		}
		return cursor;
	};
	function setFeature(context, feature, value) {
		if (!context.__smithy_context) context.__smithy_context = { features: {} };
		else if (!context.__smithy_context.features) context.__smithy_context.features = {};
		context.__smithy_context.features[feature] = value;
	}
	var DefaultIdentityProviderConfig = class {
		authSchemes = /* @__PURE__ */ new Map();
		constructor(config) {
			for (const key in config) {
				const value = config[key];
				if (value !== void 0) this.authSchemes.set(key, value);
			}
		}
		getIdentityProvider(schemeId) {
			return this.authSchemes.get(schemeId);
		}
	};
	var HttpApiKeyAuthSigner = class {
		async sign(httpRequest, identity, signingProperties) {
			if (!signingProperties) throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
			if (!signingProperties.name) throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
			if (!signingProperties.in) throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
			if (!identity.apiKey) throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
			const clonedRequest = HttpRequest.clone(httpRequest);
			if (signingProperties.in === HttpApiKeyAuthLocation.QUERY) clonedRequest.query[signingProperties.name] = identity.apiKey;
			else if (signingProperties.in === HttpApiKeyAuthLocation.HEADER) clonedRequest.headers[signingProperties.name] = signingProperties.scheme ? `${signingProperties.scheme} ${identity.apiKey}` : identity.apiKey;
			else throw new Error("request can only be signed with `apiKey` locations `query` or `header`, but found: `" + signingProperties.in + "`");
			return clonedRequest;
		}
	};
	var HttpBearerAuthSigner = class {
		async sign(httpRequest, identity, signingProperties) {
			const clonedRequest = HttpRequest.clone(httpRequest);
			if (!identity.token) throw new Error("request could not be signed with `token` since the `token` is not defined");
			clonedRequest.headers["Authorization"] = `Bearer ${identity.token}`;
			return clonedRequest;
		}
	};
	var NoAuthSigner = class {
		async sign(httpRequest, identity, signingProperties) {
			return httpRequest;
		}
	};
	var createIsIdentityExpiredFunction = (expirationMs) => function isIdentityExpired(identity) {
		return doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
	};
	var EXPIRATION_MS = 3e5;
	var isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
	var doesIdentityRequireRefresh = (identity) => identity.expiration !== void 0;
	var memoizeIdentityProvider = (provider, isExpired, requiresRefresh) => {
		if (provider === void 0) return;
		const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
		let resolved;
		let pending;
		let hasResult;
		let isConstant = false;
		const coalesceProvider = async (options) => {
			if (!pending) pending = normalizedProvider(options);
			try {
				resolved = await pending;
				hasResult = true;
				isConstant = false;
			} finally {
				pending = void 0;
			}
			return resolved;
		};
		if (isExpired === void 0) return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider(options);
			return resolved;
		};
		return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider(options);
			if (isConstant) return resolved;
			if (!requiresRefresh(resolved)) {
				isConstant = true;
				return resolved;
			}
			if (isExpired(resolved)) {
				await coalesceProvider(options);
				return resolved;
			}
			return resolved;
		};
	};
	exports.DefaultIdentityProviderConfig = DefaultIdentityProviderConfig;
	exports.EXPIRATION_MS = EXPIRATION_MS;
	exports.HttpApiKeyAuthSigner = HttpApiKeyAuthSigner;
	exports.HttpBearerAuthSigner = HttpBearerAuthSigner;
	exports.NoAuthSigner = NoAuthSigner;
	exports.createIsIdentityExpiredFunction = createIsIdentityExpiredFunction;
	exports.createPaginator = createPaginator;
	exports.doesIdentityRequireRefresh = doesIdentityRequireRefresh;
	exports.getHttpAuthSchemeEndpointRuleSetPlugin = getHttpAuthSchemeEndpointRuleSetPlugin;
	exports.getHttpAuthSchemePlugin = getHttpAuthSchemePlugin;
	exports.getHttpSigningPlugin = getHttpSigningPlugin;
	exports.httpAuthSchemeEndpointRuleSetMiddlewareOptions = httpAuthSchemeEndpointRuleSetMiddlewareOptions;
	exports.httpAuthSchemeMiddleware = httpAuthSchemeMiddleware;
	exports.httpAuthSchemeMiddlewareOptions = httpAuthSchemeMiddlewareOptions;
	exports.httpSigningMiddleware = httpSigningMiddleware;
	exports.httpSigningMiddlewareOptions = httpSigningMiddlewareOptions;
	exports.isIdentityExpired = isIdentityExpired;
	exports.memoizeIdentityProvider = memoizeIdentityProvider;
	exports.normalizeProvider = normalizeProvider;
	exports.setFeature = setFeature;
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/constants.js
var BROWSER_ALIASES_MAP, BROWSER_MAP, PLATFORMS_MAP, OS_MAP, ENGINE_MAP;
var init_constants = __esmMin((() => {
	BROWSER_ALIASES_MAP = {
		AmazonBot: "amazonbot",
		"Amazon Silk": "amazon_silk",
		"Android Browser": "android",
		BaiduSpider: "baiduspider",
		Bada: "bada",
		BingCrawler: "bingcrawler",
		Brave: "brave",
		BlackBerry: "blackberry",
		"ChatGPT-User": "chatgpt_user",
		Chrome: "chrome",
		ClaudeBot: "claudebot",
		Chromium: "chromium",
		Diffbot: "diffbot",
		DuckDuckBot: "duckduckbot",
		DuckDuckGo: "duckduckgo",
		Electron: "electron",
		Epiphany: "epiphany",
		FacebookExternalHit: "facebookexternalhit",
		Firefox: "firefox",
		Focus: "focus",
		Generic: "generic",
		"Google Search": "google_search",
		Googlebot: "googlebot",
		GPTBot: "gptbot",
		"Internet Explorer": "ie",
		InternetArchiveCrawler: "internetarchivecrawler",
		"K-Meleon": "k_meleon",
		LibreWolf: "librewolf",
		Linespider: "linespider",
		Maxthon: "maxthon",
		"Meta-ExternalAds": "meta_externalads",
		"Meta-ExternalAgent": "meta_externalagent",
		"Meta-ExternalFetcher": "meta_externalfetcher",
		"Meta-WebIndexer": "meta_webindexer",
		"Microsoft Edge": "edge",
		"MZ Browser": "mz",
		"NAVER Whale Browser": "naver",
		"OAI-SearchBot": "oai_searchbot",
		Omgilibot: "omgilibot",
		Opera: "opera",
		"Opera Coast": "opera_coast",
		"Pale Moon": "pale_moon",
		PerplexityBot: "perplexitybot",
		"Perplexity-User": "perplexity_user",
		PhantomJS: "phantomjs",
		PingdomBot: "pingdombot",
		Puffin: "puffin",
		QQ: "qq",
		QQLite: "qqlite",
		QupZilla: "qupzilla",
		Roku: "roku",
		Safari: "safari",
		Sailfish: "sailfish",
		"Samsung Internet for Android": "samsung_internet",
		SlackBot: "slackbot",
		SeaMonkey: "seamonkey",
		Sleipnir: "sleipnir",
		"Sogou Browser": "sogou",
		Swing: "swing",
		Tizen: "tizen",
		"UC Browser": "uc",
		Vivaldi: "vivaldi",
		"WebOS Browser": "webos",
		WeChat: "wechat",
		YahooSlurp: "yahooslurp",
		"Yandex Browser": "yandex",
		YandexBot: "yandexbot",
		YouBot: "youbot"
	};
	BROWSER_MAP = {
		amazonbot: "AmazonBot",
		amazon_silk: "Amazon Silk",
		android: "Android Browser",
		baiduspider: "BaiduSpider",
		bada: "Bada",
		bingcrawler: "BingCrawler",
		blackberry: "BlackBerry",
		brave: "Brave",
		chatgpt_user: "ChatGPT-User",
		chrome: "Chrome",
		claudebot: "ClaudeBot",
		chromium: "Chromium",
		diffbot: "Diffbot",
		duckduckbot: "DuckDuckBot",
		duckduckgo: "DuckDuckGo",
		edge: "Microsoft Edge",
		electron: "Electron",
		epiphany: "Epiphany",
		facebookexternalhit: "FacebookExternalHit",
		firefox: "Firefox",
		focus: "Focus",
		generic: "Generic",
		google_search: "Google Search",
		googlebot: "Googlebot",
		gptbot: "GPTBot",
		ie: "Internet Explorer",
		internetarchivecrawler: "InternetArchiveCrawler",
		k_meleon: "K-Meleon",
		librewolf: "LibreWolf",
		linespider: "Linespider",
		maxthon: "Maxthon",
		meta_externalads: "Meta-ExternalAds",
		meta_externalagent: "Meta-ExternalAgent",
		meta_externalfetcher: "Meta-ExternalFetcher",
		meta_webindexer: "Meta-WebIndexer",
		mz: "MZ Browser",
		naver: "NAVER Whale Browser",
		oai_searchbot: "OAI-SearchBot",
		omgilibot: "Omgilibot",
		opera: "Opera",
		opera_coast: "Opera Coast",
		pale_moon: "Pale Moon",
		perplexitybot: "PerplexityBot",
		perplexity_user: "Perplexity-User",
		phantomjs: "PhantomJS",
		pingdombot: "PingdomBot",
		puffin: "Puffin",
		qq: "QQ Browser",
		qqlite: "QQ Browser Lite",
		qupzilla: "QupZilla",
		roku: "Roku",
		safari: "Safari",
		sailfish: "Sailfish",
		samsung_internet: "Samsung Internet for Android",
		seamonkey: "SeaMonkey",
		slackbot: "SlackBot",
		sleipnir: "Sleipnir",
		sogou: "Sogou Browser",
		swing: "Swing",
		tizen: "Tizen",
		uc: "UC Browser",
		vivaldi: "Vivaldi",
		webos: "WebOS Browser",
		wechat: "WeChat",
		yahooslurp: "YahooSlurp",
		yandex: "Yandex Browser",
		yandexbot: "YandexBot",
		youbot: "YouBot"
	};
	PLATFORMS_MAP = {
		bot: "bot",
		desktop: "desktop",
		mobile: "mobile",
		tablet: "tablet",
		tv: "tv"
	};
	OS_MAP = {
		Android: "Android",
		Bada: "Bada",
		BlackBerry: "BlackBerry",
		ChromeOS: "Chrome OS",
		HarmonyOS: "HarmonyOS",
		iOS: "iOS",
		Linux: "Linux",
		MacOS: "macOS",
		PlayStation4: "PlayStation 4",
		Roku: "Roku",
		Tizen: "Tizen",
		WebOS: "WebOS",
		Windows: "Windows",
		WindowsPhone: "Windows Phone"
	};
	ENGINE_MAP = {
		Blink: "Blink",
		EdgeHTML: "EdgeHTML",
		Gecko: "Gecko",
		Presto: "Presto",
		Trident: "Trident",
		WebKit: "WebKit"
	};
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/utils.js
var Utils;
var init_utils = __esmMin((() => {
	init_constants();
	Utils = class Utils {
		/**
		* Get first matched item for a string
		* @param {RegExp} regexp
		* @param {String} ua
		* @return {Array|{index: number, input: string}|*|boolean|string}
		*/
		static getFirstMatch(regexp, ua) {
			const match = ua.match(regexp);
			return match && match.length > 0 && match[1] || "";
		}
		/**
		* Get second matched item for a string
		* @param regexp
		* @param {String} ua
		* @return {Array|{index: number, input: string}|*|boolean|string}
		*/
		static getSecondMatch(regexp, ua) {
			const match = ua.match(regexp);
			return match && match.length > 1 && match[2] || "";
		}
		/**
		* Match a regexp and return a constant or undefined
		* @param {RegExp} regexp
		* @param {String} ua
		* @param {*} _const Any const that will be returned if regexp matches the string
		* @return {*}
		*/
		static matchAndReturnConst(regexp, ua, _const) {
			if (regexp.test(ua)) return _const;
		}
		static getWindowsVersionName(version) {
			switch (version) {
				case "NT": return "NT";
				case "XP": return "XP";
				case "NT 5.0": return "2000";
				case "NT 5.1": return "XP";
				case "NT 5.2": return "2003";
				case "NT 6.0": return "Vista";
				case "NT 6.1": return "7";
				case "NT 6.2": return "8";
				case "NT 6.3": return "8.1";
				case "NT 10.0": return "10";
				default: return;
			}
		}
		/**
		* Get macOS version name
		*    10.5 - Leopard
		*    10.6 - Snow Leopard
		*    10.7 - Lion
		*    10.8 - Mountain Lion
		*    10.9 - Mavericks
		*    10.10 - Yosemite
		*    10.11 - El Capitan
		*    10.12 - Sierra
		*    10.13 - High Sierra
		*    10.14 - Mojave
		*    10.15 - Catalina
		*    11 - Big Sur
		*    12 - Monterey
		*    13 - Ventura
		*    14 - Sonoma
		*    15 - Sequoia
		*
		* @example
		*   getMacOSVersionName("10.14") // 'Mojave'
		*
		* @param  {string} version
		* @return {string} versionName
		*/
		static getMacOSVersionName(version) {
			const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
			v.push(0);
			const major = v[0];
			const minor = v[1];
			if (major === 10) switch (minor) {
				case 5: return "Leopard";
				case 6: return "Snow Leopard";
				case 7: return "Lion";
				case 8: return "Mountain Lion";
				case 9: return "Mavericks";
				case 10: return "Yosemite";
				case 11: return "El Capitan";
				case 12: return "Sierra";
				case 13: return "High Sierra";
				case 14: return "Mojave";
				case 15: return "Catalina";
				default: return;
			}
			switch (major) {
				case 11: return "Big Sur";
				case 12: return "Monterey";
				case 13: return "Ventura";
				case 14: return "Sonoma";
				case 15: return "Sequoia";
				default: return;
			}
		}
		/**
		* Get Android version name
		*    1.5 - Cupcake
		*    1.6 - Donut
		*    2.0 - Eclair
		*    2.1 - Eclair
		*    2.2 - Froyo
		*    2.x - Gingerbread
		*    3.x - Honeycomb
		*    4.0 - Ice Cream Sandwich
		*    4.1 - Jelly Bean
		*    4.4 - KitKat
		*    5.x - Lollipop
		*    6.x - Marshmallow
		*    7.x - Nougat
		*    8.x - Oreo
		*    9.x - Pie
		*
		* @example
		*   getAndroidVersionName("7.0") // 'Nougat'
		*
		* @param  {string} version
		* @return {string} versionName
		*/
		static getAndroidVersionName(version) {
			const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
			v.push(0);
			if (v[0] === 1 && v[1] < 5) return void 0;
			if (v[0] === 1 && v[1] < 6) return "Cupcake";
			if (v[0] === 1 && v[1] >= 6) return "Donut";
			if (v[0] === 2 && v[1] < 2) return "Eclair";
			if (v[0] === 2 && v[1] === 2) return "Froyo";
			if (v[0] === 2 && v[1] > 2) return "Gingerbread";
			if (v[0] === 3) return "Honeycomb";
			if (v[0] === 4 && v[1] < 1) return "Ice Cream Sandwich";
			if (v[0] === 4 && v[1] < 4) return "Jelly Bean";
			if (v[0] === 4 && v[1] >= 4) return "KitKat";
			if (v[0] === 5) return "Lollipop";
			if (v[0] === 6) return "Marshmallow";
			if (v[0] === 7) return "Nougat";
			if (v[0] === 8) return "Oreo";
			if (v[0] === 9) return "Pie";
		}
		/**
		* Get version precisions count
		*
		* @example
		*   getVersionPrecision("1.10.3") // 3
		*
		* @param  {string} version
		* @return {number}
		*/
		static getVersionPrecision(version) {
			return version.split(".").length;
		}
		/**
		* Calculate browser version weight
		*
		* @example
		*   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
		*   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
		*   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
		*   compareVersions('1.10.2.1',  '1.0800.2');     // -1
		*   compareVersions('1.10.2.1',  '1.10',  true);  // 0
		*
		* @param {String} versionA versions versions to compare
		* @param {String} versionB versions versions to compare
		* @param {boolean} [isLoose] enable loose comparison
		* @return {Number} comparison result: -1 when versionA is lower,
		* 1 when versionA is bigger, 0 when both equal
		*/
		static compareVersions(versionA, versionB, isLoose = false) {
			const versionAPrecision = Utils.getVersionPrecision(versionA);
			const versionBPrecision = Utils.getVersionPrecision(versionB);
			let precision = Math.max(versionAPrecision, versionBPrecision);
			let lastPrecision = 0;
			const chunks = Utils.map([versionA, versionB], (version) => {
				const delta = precision - Utils.getVersionPrecision(version);
				const _version = version + new Array(delta + 1).join(".0");
				return Utils.map(_version.split("."), (chunk) => new Array(20 - chunk.length).join("0") + chunk).reverse();
			});
			if (isLoose) lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
			precision -= 1;
			while (precision >= lastPrecision) {
				if (chunks[0][precision] > chunks[1][precision]) return 1;
				if (chunks[0][precision] === chunks[1][precision]) {
					if (precision === lastPrecision) return 0;
					precision -= 1;
				} else if (chunks[0][precision] < chunks[1][precision]) return -1;
			}
		}
		/**
		* Array::map polyfill
		*
		* @param  {Array} arr
		* @param  {Function} iterator
		* @return {Array}
		*/
		static map(arr, iterator) {
			const result = [];
			let i;
			if (Array.prototype.map) return Array.prototype.map.call(arr, iterator);
			for (i = 0; i < arr.length; i += 1) result.push(iterator(arr[i]));
			return result;
		}
		/**
		* Array::find polyfill
		*
		* @param  {Array} arr
		* @param  {Function} predicate
		* @return {Array}
		*/
		static find(arr, predicate) {
			let i;
			let l;
			if (Array.prototype.find) return Array.prototype.find.call(arr, predicate);
			for (i = 0, l = arr.length; i < l; i += 1) {
				const value = arr[i];
				if (predicate(value, i)) return value;
			}
		}
		/**
		* Object::assign polyfill
		*
		* @param  {Object} obj
		* @param  {Object} ...objs
		* @return {Object}
		*/
		static assign(obj, ...assigners) {
			const result = obj;
			let i;
			let l;
			if (Object.assign) return Object.assign(obj, ...assigners);
			for (i = 0, l = assigners.length; i < l; i += 1) {
				const assigner = assigners[i];
				if (typeof assigner === "object" && assigner !== null) Object.keys(assigner).forEach((key) => {
					result[key] = assigner[key];
				});
			}
			return obj;
		}
		/**
		* Get short version/alias for a browser name
		*
		* @example
		*   getBrowserAlias('Microsoft Edge') // edge
		*
		* @param  {string} browserName
		* @return {string}
		*/
		static getBrowserAlias(browserName) {
			return BROWSER_ALIASES_MAP[browserName];
		}
		/**
		* Get browser name for a short version/alias
		*
		* @example
		*   getBrowserTypeByAlias('edge') // Microsoft Edge
		*
		* @param  {string} browserAlias
		* @return {string}
		*/
		static getBrowserTypeByAlias(browserAlias) {
			return BROWSER_MAP[browserAlias] || "";
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/parser-browsers.js
var commonVersionIdentifier, browsersList;
var init_parser_browsers = __esmMin((() => {
	init_utils();
	commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
	browsersList = [
		{
			test: [/gptbot/i],
			describe(ua) {
				const browser = { name: "GPTBot" };
				const version = Utils.getFirstMatch(/gptbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/chatgpt-user/i],
			describe(ua) {
				const browser = { name: "ChatGPT-User" };
				const version = Utils.getFirstMatch(/chatgpt-user\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/oai-searchbot/i],
			describe(ua) {
				const browser = { name: "OAI-SearchBot" };
				const version = Utils.getFirstMatch(/oai-searchbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [
				/claudebot/i,
				/claude-web/i,
				/claude-user/i,
				/claude-searchbot/i
			],
			describe(ua) {
				const browser = { name: "ClaudeBot" };
				const version = Utils.getFirstMatch(/(?:claudebot|claude-web|claude-user|claude-searchbot)\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/omgilibot/i, /webzio-extended/i],
			describe(ua) {
				const browser = { name: "Omgilibot" };
				const version = Utils.getFirstMatch(/(?:omgilibot|webzio-extended)\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/diffbot/i],
			describe(ua) {
				const browser = { name: "Diffbot" };
				const version = Utils.getFirstMatch(/diffbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/perplexitybot/i],
			describe(ua) {
				const browser = { name: "PerplexityBot" };
				const version = Utils.getFirstMatch(/perplexitybot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/perplexity-user/i],
			describe(ua) {
				const browser = { name: "Perplexity-User" };
				const version = Utils.getFirstMatch(/perplexity-user\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/youbot/i],
			describe(ua) {
				const browser = { name: "YouBot" };
				const version = Utils.getFirstMatch(/youbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/meta-webindexer/i],
			describe(ua) {
				const browser = { name: "Meta-WebIndexer" };
				const version = Utils.getFirstMatch(/meta-webindexer\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/meta-externalads/i],
			describe(ua) {
				const browser = { name: "Meta-ExternalAds" };
				const version = Utils.getFirstMatch(/meta-externalads\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/meta-externalagent/i],
			describe(ua) {
				const browser = { name: "Meta-ExternalAgent" };
				const version = Utils.getFirstMatch(/meta-externalagent\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/meta-externalfetcher/i],
			describe(ua) {
				const browser = { name: "Meta-ExternalFetcher" };
				const version = Utils.getFirstMatch(/meta-externalfetcher\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/googlebot/i],
			describe(ua) {
				const browser = { name: "Googlebot" };
				const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/linespider/i],
			describe(ua) {
				const browser = { name: "Linespider" };
				const version = Utils.getFirstMatch(/(?:linespider)(?:-[-\w]+)?[\s/](\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/amazonbot/i],
			describe(ua) {
				const browser = { name: "AmazonBot" };
				const version = Utils.getFirstMatch(/amazonbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/bingbot/i],
			describe(ua) {
				const browser = { name: "BingCrawler" };
				const version = Utils.getFirstMatch(/bingbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/baiduspider/i],
			describe(ua) {
				const browser = { name: "BaiduSpider" };
				const version = Utils.getFirstMatch(/baiduspider\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/duckduckbot/i],
			describe(ua) {
				const browser = { name: "DuckDuckBot" };
				const version = Utils.getFirstMatch(/duckduckbot\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/ia_archiver/i],
			describe(ua) {
				const browser = { name: "InternetArchiveCrawler" };
				const version = Utils.getFirstMatch(/ia_archiver\/(\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/facebookexternalhit/i, /facebookcatalog/i],
			describe() {
				return { name: "FacebookExternalHit" };
			}
		},
		{
			test: [/slackbot/i, /slack-imgProxy/i],
			describe(ua) {
				const browser = { name: "SlackBot" };
				const version = Utils.getFirstMatch(/(?:slackbot|slack-imgproxy)(?:-[-\w]+)?[\s/](\d+(\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/yahoo!?[\s/]*slurp/i],
			describe() {
				return { name: "YahooSlurp" };
			}
		},
		{
			test: [/yandexbot/i, /yandexmobilebot/i],
			describe() {
				return { name: "YandexBot" };
			}
		},
		{
			test: [/pingdom/i],
			describe() {
				return { name: "PingdomBot" };
			}
		},
		{
			test: [/opera/i],
			describe(ua) {
				const browser = { name: "Opera" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/opr\/|opios/i],
			describe(ua) {
				const browser = { name: "Opera" };
				const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/SamsungBrowser/i],
			describe(ua) {
				const browser = { name: "Samsung Internet for Android" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/Whale/i],
			describe(ua) {
				const browser = { name: "NAVER Whale Browser" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/PaleMoon/i],
			describe(ua) {
				const browser = { name: "Pale Moon" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:PaleMoon)[\s/](\d+(?:\.\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/MZBrowser/i],
			describe(ua) {
				const browser = { name: "MZ Browser" };
				const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/focus/i],
			describe(ua) {
				const browser = { name: "Focus" };
				const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/swing/i],
			describe(ua) {
				const browser = { name: "Swing" };
				const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/coast/i],
			describe(ua) {
				const browser = { name: "Opera Coast" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/opt\/\d+(?:.?_?\d+)+/i],
			describe(ua) {
				const browser = { name: "Opera Touch" };
				const version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/yabrowser/i],
			describe(ua) {
				const browser = { name: "Yandex Browser" };
				const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/ucbrowser/i],
			describe(ua) {
				const browser = { name: "UC Browser" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/Maxthon|mxios/i],
			describe(ua) {
				const browser = { name: "Maxthon" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/epiphany/i],
			describe(ua) {
				const browser = { name: "Epiphany" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/puffin/i],
			describe(ua) {
				const browser = { name: "Puffin" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/sleipnir/i],
			describe(ua) {
				const browser = { name: "Sleipnir" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/k-meleon/i],
			describe(ua) {
				const browser = { name: "K-Meleon" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/micromessenger/i],
			describe(ua) {
				const browser = { name: "WeChat" };
				const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/qqbrowser/i],
			describe(ua) {
				const browser = { name: /qqbrowserlite/i.test(ua) ? "QQ Browser Lite" : "QQ Browser" };
				const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/msie|trident/i],
			describe(ua) {
				const browser = { name: "Internet Explorer" };
				const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/\sedg\//i],
			describe(ua) {
				const browser = { name: "Microsoft Edge" };
				const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/edg([ea]|ios)/i],
			describe(ua) {
				const browser = { name: "Microsoft Edge" };
				const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/vivaldi/i],
			describe(ua) {
				const browser = { name: "Vivaldi" };
				const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/seamonkey/i],
			describe(ua) {
				const browser = { name: "SeaMonkey" };
				const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/sailfish/i],
			describe(ua) {
				const browser = { name: "Sailfish" };
				const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/silk/i],
			describe(ua) {
				const browser = { name: "Amazon Silk" };
				const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/phantom/i],
			describe(ua) {
				const browser = { name: "PhantomJS" };
				const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/slimerjs/i],
			describe(ua) {
				const browser = { name: "SlimerJS" };
				const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
			describe(ua) {
				const browser = { name: "BlackBerry" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/(web|hpw)[o0]s/i],
			describe(ua) {
				const browser = { name: "WebOS Browser" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/bada/i],
			describe(ua) {
				const browser = { name: "Bada" };
				const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/tizen/i],
			describe(ua) {
				const browser = { name: "Tizen" };
				const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/qupzilla/i],
			describe(ua) {
				const browser = { name: "QupZilla" };
				const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/librewolf/i],
			describe(ua) {
				const browser = { name: "LibreWolf" };
				const version = Utils.getFirstMatch(/(?:librewolf)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/firefox|iceweasel|fxios/i],
			describe(ua) {
				const browser = { name: "Firefox" };
				const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/electron/i],
			describe(ua) {
				const browser = { name: "Electron" };
				const version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [
				/sogoumobilebrowser/i,
				/metasr/i,
				/se 2\.[x]/i
			],
			describe(ua) {
				const browser = { name: "Sogou Browser" };
				const sogouMobileVersion = Utils.getFirstMatch(/(?:sogoumobilebrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
				const chromiumVersion = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
				const seVersion = Utils.getFirstMatch(/se ([\d.]+)x/i, ua);
				const version = sogouMobileVersion || chromiumVersion || seVersion;
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/MiuiBrowser/i],
			describe(ua) {
				const browser = { name: "Miui" };
				const version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test(parser) {
				if (parser.hasBrand("DuckDuckGo")) return true;
				return parser.test(/\sDdg\/[\d.]+$/i);
			},
			describe(ua, parser) {
				const browser = { name: "DuckDuckGo" };
				if (parser) {
					const hintsVersion = parser.getBrandVersion("DuckDuckGo");
					if (hintsVersion) {
						browser.version = hintsVersion;
						return browser;
					}
				}
				const uaVersion = Utils.getFirstMatch(/\sDdg\/([\d.]+)$/i, ua);
				if (uaVersion) browser.version = uaVersion;
				return browser;
			}
		},
		{
			test(parser) {
				return parser.hasBrand("Brave");
			},
			describe(ua, parser) {
				const browser = { name: "Brave" };
				if (parser) {
					const hintsVersion = parser.getBrandVersion("Brave");
					if (hintsVersion) {
						browser.version = hintsVersion;
						return browser;
					}
				}
				return browser;
			}
		},
		{
			test: [/chromium/i],
			describe(ua) {
				const browser = { name: "Chromium" };
				const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/chrome|crios|crmo/i],
			describe(ua) {
				const browser = { name: "Chrome" };
				const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/GSA/i],
			describe(ua) {
				const browser = { name: "Google Search" };
				const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test(parser) {
				const notLikeAndroid = !parser.test(/like android/i);
				const butAndroid = parser.test(/android/i);
				return notLikeAndroid && butAndroid;
			},
			describe(ua) {
				const browser = { name: "Android Browser" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/playstation 4/i],
			describe(ua) {
				const browser = { name: "PlayStation 4" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/safari|applewebkit/i],
			describe(ua) {
				const browser = { name: "Safari" };
				const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
				if (version) browser.version = version;
				return browser;
			}
		},
		{
			test: [/.*/i],
			describe(ua) {
				const regexp = ua.search("\\(") !== -1 ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
				return {
					name: Utils.getFirstMatch(regexp, ua),
					version: Utils.getSecondMatch(regexp, ua)
				};
			}
		}
	];
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/parser-os.js
var parser_os_default;
var init_parser_os = __esmMin((() => {
	init_utils();
	init_constants();
	parser_os_default = [
		{
			test: [/Roku\/DVP/],
			describe(ua) {
				const version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
				return {
					name: OS_MAP.Roku,
					version
				};
			}
		},
		{
			test: [/windows phone/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
				return {
					name: OS_MAP.WindowsPhone,
					version
				};
			}
		},
		{
			test: [/windows /i],
			describe(ua) {
				const version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
				const versionName = Utils.getWindowsVersionName(version);
				return {
					name: OS_MAP.Windows,
					version,
					versionName
				};
			}
		},
		{
			test: [/Macintosh(.*?) FxiOS(.*?)\//],
			describe(ua) {
				const result = { name: OS_MAP.iOS };
				const version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
				if (version) result.version = version;
				return result;
			}
		},
		{
			test: [/macintosh/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, ".");
				const versionName = Utils.getMacOSVersionName(version);
				const os = {
					name: OS_MAP.MacOS,
					version
				};
				if (versionName) os.versionName = versionName;
				return os;
			}
		},
		{
			test: [/(ipod|iphone|ipad)/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, ".");
				return {
					name: OS_MAP.iOS,
					version
				};
			}
		},
		{
			test: [/OpenHarmony/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/OpenHarmony\s+(\d+(\.\d+)*)/i, ua);
				return {
					name: OS_MAP.HarmonyOS,
					version
				};
			}
		},
		{
			test(parser) {
				const notLikeAndroid = !parser.test(/like android/i);
				const butAndroid = parser.test(/android/i);
				return notLikeAndroid && butAndroid;
			},
			describe(ua) {
				const version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
				const versionName = Utils.getAndroidVersionName(version);
				const os = {
					name: OS_MAP.Android,
					version
				};
				if (versionName) os.versionName = versionName;
				return os;
			}
		},
		{
			test: [/(web|hpw)[o0]s/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
				const os = { name: OS_MAP.WebOS };
				if (version && version.length) os.version = version;
				return os;
			}
		},
		{
			test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) || Utils.getFirstMatch(/\bbb(\d+)/i, ua);
				return {
					name: OS_MAP.BlackBerry,
					version
				};
			}
		},
		{
			test: [/bada/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
				return {
					name: OS_MAP.Bada,
					version
				};
			}
		},
		{
			test: [/tizen/i],
			describe(ua) {
				const version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
				return {
					name: OS_MAP.Tizen,
					version
				};
			}
		},
		{
			test: [/linux/i],
			describe() {
				return { name: OS_MAP.Linux };
			}
		},
		{
			test: [/CrOS/],
			describe() {
				return { name: OS_MAP.ChromeOS };
			}
		},
		{
			test: [/PlayStation 4/],
			describe(ua) {
				const version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
				return {
					name: OS_MAP.PlayStation4,
					version
				};
			}
		}
	];
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/parser-platforms.js
var parser_platforms_default;
var init_parser_platforms = __esmMin((() => {
	init_utils();
	init_constants();
	parser_platforms_default = [
		{
			test: [/googlebot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Google"
				};
			}
		},
		{
			test: [/linespider/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Line"
				};
			}
		},
		{
			test: [/amazonbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Amazon"
				};
			}
		},
		{
			test: [/gptbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "OpenAI"
				};
			}
		},
		{
			test: [/chatgpt-user/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "OpenAI"
				};
			}
		},
		{
			test: [/oai-searchbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "OpenAI"
				};
			}
		},
		{
			test: [/baiduspider/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Baidu"
				};
			}
		},
		{
			test: [/bingbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Bing"
				};
			}
		},
		{
			test: [/duckduckbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "DuckDuckGo"
				};
			}
		},
		{
			test: [
				/claudebot/i,
				/claude-web/i,
				/claude-user/i,
				/claude-searchbot/i
			],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Anthropic"
				};
			}
		},
		{
			test: [/omgilibot/i, /webzio-extended/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Webz.io"
				};
			}
		},
		{
			test: [/diffbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Diffbot"
				};
			}
		},
		{
			test: [/perplexitybot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Perplexity AI"
				};
			}
		},
		{
			test: [/perplexity-user/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Perplexity AI"
				};
			}
		},
		{
			test: [/youbot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "You.com"
				};
			}
		},
		{
			test: [/ia_archiver/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Internet Archive"
				};
			}
		},
		{
			test: [/meta-webindexer/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Meta"
				};
			}
		},
		{
			test: [/meta-externalads/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Meta"
				};
			}
		},
		{
			test: [/meta-externalagent/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Meta"
				};
			}
		},
		{
			test: [/meta-externalfetcher/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Meta"
				};
			}
		},
		{
			test: [/facebookexternalhit/i, /facebookcatalog/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Meta"
				};
			}
		},
		{
			test: [/slackbot/i, /slack-imgProxy/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Slack"
				};
			}
		},
		{
			test: [/yahoo/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Yahoo"
				};
			}
		},
		{
			test: [/yandexbot/i, /yandexmobilebot/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Yandex"
				};
			}
		},
		{
			test: [/pingdom/i],
			describe() {
				return {
					type: PLATFORMS_MAP.bot,
					vendor: "Pingdom"
				};
			}
		},
		{
			test: [/huawei/i],
			describe(ua) {
				const model = Utils.getFirstMatch(/(can-l01)/i, ua) && "Nova";
				const platform = {
					type: PLATFORMS_MAP.mobile,
					vendor: "Huawei"
				};
				if (model) platform.model = model;
				return platform;
			}
		},
		{
			test: [/nexus\s*(?:7|8|9|10).*/i],
			describe() {
				return {
					type: PLATFORMS_MAP.tablet,
					vendor: "Nexus"
				};
			}
		},
		{
			test: [/ipad/i],
			describe() {
				return {
					type: PLATFORMS_MAP.tablet,
					vendor: "Apple",
					model: "iPad"
				};
			}
		},
		{
			test: [/Macintosh(.*?) FxiOS(.*?)\//],
			describe() {
				return {
					type: PLATFORMS_MAP.tablet,
					vendor: "Apple",
					model: "iPad"
				};
			}
		},
		{
			test: [/kftt build/i],
			describe() {
				return {
					type: PLATFORMS_MAP.tablet,
					vendor: "Amazon",
					model: "Kindle Fire HD 7"
				};
			}
		},
		{
			test: [/silk/i],
			describe() {
				return {
					type: PLATFORMS_MAP.tablet,
					vendor: "Amazon"
				};
			}
		},
		{
			test: [/tablet(?! pc)/i],
			describe() {
				return { type: PLATFORMS_MAP.tablet };
			}
		},
		{
			test(parser) {
				const iDevice = parser.test(/ipod|iphone/i);
				const likeIDevice = parser.test(/like (ipod|iphone)/i);
				return iDevice && !likeIDevice;
			},
			describe(ua) {
				const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
				return {
					type: PLATFORMS_MAP.mobile,
					vendor: "Apple",
					model
				};
			}
		},
		{
			test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
			describe() {
				return {
					type: PLATFORMS_MAP.mobile,
					vendor: "Nexus"
				};
			}
		},
		{
			test: [/Nokia/i],
			describe(ua) {
				const model = Utils.getFirstMatch(/Nokia\s+([0-9]+(\.[0-9]+)?)/i, ua);
				const platform = {
					type: PLATFORMS_MAP.mobile,
					vendor: "Nokia"
				};
				if (model) platform.model = model;
				return platform;
			}
		},
		{
			test: [/[^-]mobi/i],
			describe() {
				return { type: PLATFORMS_MAP.mobile };
			}
		},
		{
			test(parser) {
				return parser.getBrowserName(true) === "blackberry";
			},
			describe() {
				return {
					type: PLATFORMS_MAP.mobile,
					vendor: "BlackBerry"
				};
			}
		},
		{
			test(parser) {
				return parser.getBrowserName(true) === "bada";
			},
			describe() {
				return { type: PLATFORMS_MAP.mobile };
			}
		},
		{
			test(parser) {
				return parser.getBrowserName() === "windows phone";
			},
			describe() {
				return {
					type: PLATFORMS_MAP.mobile,
					vendor: "Microsoft"
				};
			}
		},
		{
			test(parser) {
				const osMajorVersion = Number(String(parser.getOSVersion()).split(".")[0]);
				return parser.getOSName(true) === "android" && osMajorVersion >= 3;
			},
			describe() {
				return { type: PLATFORMS_MAP.tablet };
			}
		},
		{
			test(parser) {
				return parser.getOSName(true) === "android";
			},
			describe() {
				return { type: PLATFORMS_MAP.mobile };
			}
		},
		{
			test: [/smart-?tv|smarttv/i],
			describe() {
				return { type: PLATFORMS_MAP.tv };
			}
		},
		{
			test: [/netcast/i],
			describe() {
				return { type: PLATFORMS_MAP.tv };
			}
		},
		{
			test(parser) {
				return parser.getOSName(true) === "macos";
			},
			describe() {
				return {
					type: PLATFORMS_MAP.desktop,
					vendor: "Apple"
				};
			}
		},
		{
			test(parser) {
				return parser.getOSName(true) === "windows";
			},
			describe() {
				return { type: PLATFORMS_MAP.desktop };
			}
		},
		{
			test(parser) {
				return parser.getOSName(true) === "linux";
			},
			describe() {
				return { type: PLATFORMS_MAP.desktop };
			}
		},
		{
			test(parser) {
				return parser.getOSName(true) === "playstation 4";
			},
			describe() {
				return { type: PLATFORMS_MAP.tv };
			}
		},
		{
			test(parser) {
				return parser.getOSName(true) === "roku";
			},
			describe() {
				return { type: PLATFORMS_MAP.tv };
			}
		}
	];
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/parser-engines.js
var parser_engines_default;
var init_parser_engines = __esmMin((() => {
	init_utils();
	init_constants();
	parser_engines_default = [
		{
			test(parser) {
				return parser.getBrowserName(true) === "microsoft edge";
			},
			describe(ua) {
				if (/\sedg\//i.test(ua)) return { name: ENGINE_MAP.Blink };
				const version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
				return {
					name: ENGINE_MAP.EdgeHTML,
					version
				};
			}
		},
		{
			test: [/trident/i],
			describe(ua) {
				const engine = { name: ENGINE_MAP.Trident };
				const version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) engine.version = version;
				return engine;
			}
		},
		{
			test(parser) {
				return parser.test(/presto/i);
			},
			describe(ua) {
				const engine = { name: ENGINE_MAP.Presto };
				const version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) engine.version = version;
				return engine;
			}
		},
		{
			test(parser) {
				const isGecko = parser.test(/gecko/i);
				const likeGecko = parser.test(/like gecko/i);
				return isGecko && !likeGecko;
			},
			describe(ua) {
				const engine = { name: ENGINE_MAP.Gecko };
				const version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) engine.version = version;
				return engine;
			}
		},
		{
			test: [/(apple)?webkit\/537\.36/i],
			describe() {
				return { name: ENGINE_MAP.Blink };
			}
		},
		{
			test: [/(apple)?webkit/i],
			describe(ua) {
				const engine = { name: ENGINE_MAP.WebKit };
				const version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);
				if (version) engine.version = version;
				return engine;
			}
		}
	];
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/parser.js
var Parser;
var init_parser = __esmMin((() => {
	init_parser_browsers();
	init_parser_os();
	init_parser_platforms();
	init_parser_engines();
	init_utils();
	Parser = class {
		/**
		* Create instance of Parser
		*
		* @param {String} UA User-Agent string
		* @param {Boolean|ClientHints} [skipParsingOrHints=false] Either a boolean to skip parsing,
		* or a ClientHints object containing User-Agent Client Hints data
		* @param {ClientHints} [clientHints] User-Agent Client Hints data (navigator.userAgentData)
		*
		* @throw {Error} in case of empty UA String
		*
		* @constructor
		*/
		constructor(UA, skipParsingOrHints = false, clientHints = null) {
			if (UA === void 0 || UA === null || UA === "") throw new Error("UserAgent parameter can't be empty");
			this._ua = UA;
			let skipParsing = false;
			if (typeof skipParsingOrHints === "boolean") {
				skipParsing = skipParsingOrHints;
				this._hints = clientHints;
			} else if (skipParsingOrHints != null && typeof skipParsingOrHints === "object") this._hints = skipParsingOrHints;
			else this._hints = null;
			/**
			* @typedef ParsedResult
			* @property {Object} browser
			* @property {String|undefined} [browser.name]
			* Browser name, like `"Chrome"` or `"Internet Explorer"`
			* @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
			* @property {Object} os
			* @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
			* @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
			* @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
			* @property {Object} platform
			* @property {String|undefined} [platform.type]
			* platform type, can be either `"desktop"`, `"tablet"` or `"mobile"`
			* @property {String|undefined} [platform.vendor] Vendor of the device,
			* like `"Apple"` or `"Samsung"`
			* @property {String|undefined} [platform.model] Device model,
			* like `"iPhone"` or `"Kindle Fire HD 7"`
			* @property {Object} engine
			* @property {String|undefined} [engine.name]
			* Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`
			* @property {String|undefined} [engine.version] String version of the engine
			*/
			this.parsedResult = {};
			if (skipParsing !== true) this.parse();
		}
		/**
		* Get Client Hints data
		* @return {ClientHints|null}
		*
		* @public
		* @example
		* const parser = Bowser.getParser(UA, clientHints);
		* const hints = parser.getHints();
		* console.log(hints.platform); // 'Windows'
		* console.log(hints.mobile); // false
		*/
		getHints() {
			return this._hints;
		}
		/**
		* Check if a brand exists in Client Hints brands array
		* @param {string} brandName The brand name to check for
		* @return {boolean}
		*
		* @public
		* @example
		* const parser = Bowser.getParser(UA, clientHints);
		* if (parser.hasBrand('Google Chrome')) {
		*   console.log('Chrome detected!');
		* }
		*/
		hasBrand(brandName) {
			if (!this._hints || !Array.isArray(this._hints.brands)) return false;
			const brandLower = brandName.toLowerCase();
			return this._hints.brands.some((b) => b.brand && b.brand.toLowerCase() === brandLower);
		}
		/**
		* Get brand version from Client Hints
		* @param {string} brandName The brand name to get version for
		* @return {string|undefined}
		*
		* @public
		* @example
		* const parser = Bowser.getParser(UA, clientHints);
		* const version = parser.getBrandVersion('Google Chrome');
		* console.log(version); // '131'
		*/
		getBrandVersion(brandName) {
			if (!this._hints || !Array.isArray(this._hints.brands)) return;
			const brandLower = brandName.toLowerCase();
			const brand = this._hints.brands.find((b) => b.brand && b.brand.toLowerCase() === brandLower);
			return brand ? brand.version : void 0;
		}
		/**
		* Get UserAgent string of current Parser instance
		* @return {String} User-Agent String of the current <Parser> object
		*
		* @public
		*/
		getUA() {
			return this._ua;
		}
		/**
		* Test a UA string for a regexp
		* @param {RegExp} regex
		* @return {Boolean}
		*/
		test(regex) {
			return regex.test(this._ua);
		}
		/**
		* Get parsed browser object
		* @return {Object}
		*/
		parseBrowser() {
			this.parsedResult.browser = {};
			const browserDescriptor = Utils.find(browsersList, (_browser) => {
				if (typeof _browser.test === "function") return _browser.test(this);
				if (Array.isArray(_browser.test)) return _browser.test.some((condition) => this.test(condition));
				throw new Error("Browser's test function is not valid");
			});
			if (browserDescriptor) this.parsedResult.browser = browserDescriptor.describe(this.getUA(), this);
			return this.parsedResult.browser;
		}
		/**
		* Get parsed browser object
		* @return {Object}
		*
		* @public
		*/
		getBrowser() {
			if (this.parsedResult.browser) return this.parsedResult.browser;
			return this.parseBrowser();
		}
		/**
		* Get browser's name
		* @return {String} Browser's name or an empty string
		*
		* @public
		*/
		getBrowserName(toLowerCase) {
			if (toLowerCase) return String(this.getBrowser().name).toLowerCase() || "";
			return this.getBrowser().name || "";
		}
		/**
		* Get browser's version
		* @return {String} version of browser
		*
		* @public
		*/
		getBrowserVersion() {
			return this.getBrowser().version;
		}
		/**
		* Get OS
		* @return {Object}
		*
		* @example
		* this.getOS();
		* {
		*   name: 'macOS',
		*   version: '10.11.12'
		* }
		*/
		getOS() {
			if (this.parsedResult.os) return this.parsedResult.os;
			return this.parseOS();
		}
		/**
		* Parse OS and save it to this.parsedResult.os
		* @return {*|{}}
		*/
		parseOS() {
			this.parsedResult.os = {};
			const os = Utils.find(parser_os_default, (_os) => {
				if (typeof _os.test === "function") return _os.test(this);
				if (Array.isArray(_os.test)) return _os.test.some((condition) => this.test(condition));
				throw new Error("Browser's test function is not valid");
			});
			if (os) this.parsedResult.os = os.describe(this.getUA());
			return this.parsedResult.os;
		}
		/**
		* Get OS name
		* @param {Boolean} [toLowerCase] return lower-cased value
		* @return {String} name of the OS — macOS, Windows, Linux, etc.
		*/
		getOSName(toLowerCase) {
			const { name } = this.getOS();
			if (toLowerCase) return String(name).toLowerCase() || "";
			return name || "";
		}
		/**
		* Get OS version
		* @return {String} full version with dots ('10.11.12', '5.6', etc)
		*/
		getOSVersion() {
			return this.getOS().version;
		}
		/**
		* Get parsed platform
		* @return {{}}
		*/
		getPlatform() {
			if (this.parsedResult.platform) return this.parsedResult.platform;
			return this.parsePlatform();
		}
		/**
		* Get platform name
		* @param {Boolean} [toLowerCase=false]
		* @return {*}
		*/
		getPlatformType(toLowerCase = false) {
			const { type } = this.getPlatform();
			if (toLowerCase) return String(type).toLowerCase() || "";
			return type || "";
		}
		/**
		* Get parsed platform
		* @return {{}}
		*/
		parsePlatform() {
			this.parsedResult.platform = {};
			const platform = Utils.find(parser_platforms_default, (_platform) => {
				if (typeof _platform.test === "function") return _platform.test(this);
				if (Array.isArray(_platform.test)) return _platform.test.some((condition) => this.test(condition));
				throw new Error("Browser's test function is not valid");
			});
			if (platform) this.parsedResult.platform = platform.describe(this.getUA());
			return this.parsedResult.platform;
		}
		/**
		* Get parsed engine
		* @return {{}}
		*/
		getEngine() {
			if (this.parsedResult.engine) return this.parsedResult.engine;
			return this.parseEngine();
		}
		/**
		* Get engines's name
		* @return {String} Engines's name or an empty string
		*
		* @public
		*/
		getEngineName(toLowerCase) {
			if (toLowerCase) return String(this.getEngine().name).toLowerCase() || "";
			return this.getEngine().name || "";
		}
		/**
		* Get parsed platform
		* @return {{}}
		*/
		parseEngine() {
			this.parsedResult.engine = {};
			const engine = Utils.find(parser_engines_default, (_engine) => {
				if (typeof _engine.test === "function") return _engine.test(this);
				if (Array.isArray(_engine.test)) return _engine.test.some((condition) => this.test(condition));
				throw new Error("Browser's test function is not valid");
			});
			if (engine) this.parsedResult.engine = engine.describe(this.getUA());
			return this.parsedResult.engine;
		}
		/**
		* Parse full information about the browser
		* @returns {Parser}
		*/
		parse() {
			this.parseBrowser();
			this.parseOS();
			this.parsePlatform();
			this.parseEngine();
			return this;
		}
		/**
		* Get parsed result
		* @return {ParsedResult}
		*/
		getResult() {
			return Utils.assign({}, this.parsedResult);
		}
		/**
		* Check if parsed browser matches certain conditions
		*
		* @param {Object} checkTree It's one or two layered object,
		* which can include a platform or an OS on the first layer
		* and should have browsers specs on the bottom-laying layer
		*
		* @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
		* Returns `undefined` when the browser is no described in the checkTree object.
		*
		* @example
		* const browser = Bowser.getParser(window.navigator.userAgent);
		* if (browser.satisfies({chrome: '>118.01.1322' }))
		* // or with os
		* if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
		* // or with platforms
		* if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
		*/
		satisfies(checkTree) {
			const platformsAndOSes = {};
			let platformsAndOSCounter = 0;
			const browsers = {};
			let browsersCounter = 0;
			Object.keys(checkTree).forEach((key) => {
				const currentDefinition = checkTree[key];
				if (typeof currentDefinition === "string") {
					browsers[key] = currentDefinition;
					browsersCounter += 1;
				} else if (typeof currentDefinition === "object") {
					platformsAndOSes[key] = currentDefinition;
					platformsAndOSCounter += 1;
				}
			});
			if (platformsAndOSCounter > 0) {
				const platformsAndOSNames = Object.keys(platformsAndOSes);
				const OSMatchingDefinition = Utils.find(platformsAndOSNames, (name) => this.isOS(name));
				if (OSMatchingDefinition) {
					const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
					if (osResult !== void 0) return osResult;
				}
				const platformMatchingDefinition = Utils.find(platformsAndOSNames, (name) => this.isPlatform(name));
				if (platformMatchingDefinition) {
					const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
					if (platformResult !== void 0) return platformResult;
				}
			}
			if (browsersCounter > 0) {
				const browserNames = Object.keys(browsers);
				const matchingDefinition = Utils.find(browserNames, (name) => this.isBrowser(name, true));
				if (matchingDefinition !== void 0) return this.compareVersion(browsers[matchingDefinition]);
			}
		}
		/**
		* Check if the browser name equals the passed string
		* @param {string} browserName The string to compare with the browser name
		* @param [includingAlias=false] The flag showing whether alias will be included into comparison
		* @returns {boolean}
		*/
		isBrowser(browserName, includingAlias = false) {
			const defaultBrowserName = this.getBrowserName().toLowerCase();
			let browserNameLower = browserName.toLowerCase();
			const alias = Utils.getBrowserTypeByAlias(browserNameLower);
			if (includingAlias && alias) browserNameLower = alias.toLowerCase();
			return browserNameLower === defaultBrowserName;
		}
		compareVersion(version) {
			let expectedResults = [0];
			let comparableVersion = version;
			let isLoose = false;
			const currentBrowserVersion = this.getBrowserVersion();
			if (typeof currentBrowserVersion !== "string") return;
			if (version[0] === ">" || version[0] === "<") {
				comparableVersion = version.substr(1);
				if (version[1] === "=") {
					isLoose = true;
					comparableVersion = version.substr(2);
				} else expectedResults = [];
				if (version[0] === ">") expectedResults.push(1);
				else expectedResults.push(-1);
			} else if (version[0] === "=") comparableVersion = version.substr(1);
			else if (version[0] === "~") {
				isLoose = true;
				comparableVersion = version.substr(1);
			}
			return expectedResults.indexOf(Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose)) > -1;
		}
		/**
		* Check if the OS name equals the passed string
		* @param {string} osName The string to compare with the OS name
		* @returns {boolean}
		*/
		isOS(osName) {
			return this.getOSName(true) === String(osName).toLowerCase();
		}
		/**
		* Check if the platform type equals the passed string
		* @param {string} platformType The string to compare with the platform type
		* @returns {boolean}
		*/
		isPlatform(platformType) {
			return this.getPlatformType(true) === String(platformType).toLowerCase();
		}
		/**
		* Check if the engine name equals the passed string
		* @param {string} engineName The string to compare with the engine name
		* @returns {boolean}
		*/
		isEngine(engineName) {
			return this.getEngineName(true) === String(engineName).toLowerCase();
		}
		/**
		* Is anything? Check if the browser is called "anything",
		* the OS called "anything" or the platform called "anything"
		* @param {String} anything
		* @param [includingAlias=false] The flag showing whether alias will be included into comparison
		* @returns {Boolean}
		*/
		is(anything, includingAlias = false) {
			return this.isBrowser(anything, includingAlias) || this.isOS(anything) || this.isPlatform(anything);
		}
		/**
		* Check if any of the given values satisfies this.is(anything)
		* @param {String[]} anythings
		* @returns {Boolean}
		*/
		some(anythings = []) {
			return anythings.some((anything) => this.is(anything));
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/bowser@2.14.1/node_modules/bowser/src/bowser.js
var bowser_exports = /* @__PURE__ */ __exportAll({ default: () => Bowser });
var Bowser;
var init_bowser = __esmMin((() => {
	init_parser();
	init_constants();
	Bowser = class {
		/**
		* Creates a {@link Parser} instance
		*
		* @param {String} UA UserAgent string
		* @param {Boolean|Object} [skipParsingOrHints=false] Either a boolean to skip parsing,
		* or a ClientHints object (navigator.userAgentData)
		* @param {Object} [clientHints] User-Agent Client Hints data (navigator.userAgentData)
		* @returns {Parser}
		* @throws {Error} when UA is not a String
		*
		* @example
		* const parser = Bowser.getParser(window.navigator.userAgent);
		* const result = parser.getResult();
		*
		* @example
		* // With User-Agent Client Hints
		* const parser = Bowser.getParser(
		*   window.navigator.userAgent,
		*   window.navigator.userAgentData
		* );
		*/
		static getParser(UA, skipParsingOrHints = false, clientHints = null) {
			/*!
			* Bowser - a browser detector
			* https://github.com/bowser-js/bowser
			* MIT License | (c) Dustin Diaz 2012-2015
			* MIT License | (c) Denis Demchenko 2015-2019
			*/
			if (typeof UA !== "string") throw new Error("UserAgent should be a string");
			return new Parser(UA, skipParsingOrHints, clientHints);
		}
		/**
		* Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
		*
		* @param {String} UA UserAgent string
		* @param {Object} [clientHints] User-Agent Client Hints data (navigator.userAgentData)
		* @return {ParsedResult}
		*
		* @example
		* const result = Bowser.parse(window.navigator.userAgent);
		*
		* @example
		* // With User-Agent Client Hints
		* const result = Bowser.parse(
		*   window.navigator.userAgent,
		*   window.navigator.userAgentData
		* );
		*/
		static parse(UA, clientHints = null) {
			return new Parser(UA, clientHints).getResult();
		}
		static get BROWSER_MAP() {
			return BROWSER_MAP;
		}
		static get ENGINE_MAP() {
			return ENGINE_MAP;
		}
		static get OS_MAP() {
			return OS_MAP;
		}
		static get PLATFORMS_MAP() {
			return PLATFORMS_MAP;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+core@3.974.21/node_modules/@aws-sdk/core/dist-cjs/submodules/client/index.js
var require_client = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { Retry, RETRY_MODES } = require_retry();
	var { HttpRequest, parseUrl } = require_protocols();
	var { InvokeStore } = require_invoke_store();
	var { normalizeProvider } = require_dist_cjs();
	var { platform, release } = __require("node:os");
	var { versions, env } = __require("node:process");
	var { booleanSelector, SelectorType, loadConfig, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS } = require_config();
	var { REGION_ENV_NAME, REGION_INI_NAME, resolveRegionConfig } = require_config();
	exports.NODE_REGION_CONFIG_FILE_OPTIONS = NODE_REGION_CONFIG_FILE_OPTIONS;
	exports.NODE_REGION_CONFIG_OPTIONS = NODE_REGION_CONFIG_OPTIONS;
	exports.REGION_ENV_NAME = REGION_ENV_NAME;
	exports.REGION_INI_NAME = REGION_INI_NAME;
	exports.resolveRegionConfig = resolveRegionConfig;
	var { readFile } = __require("node:fs/promises");
	var { normalize, sep, join } = __require("node:path");
	var { isValidHostLabel, isIpAddress, customEndpointFunctions } = require_endpoints();
	var { EndpointError, resolveEndpoint } = require_endpoints();
	exports.EndpointError = EndpointError;
	exports.isIpAddress = isIpAddress;
	exports.resolveEndpoint = resolveEndpoint;
	var state = { warningEmitted: false };
	var emitWarningIfUnsupportedVersion = (version) => {
		if (version && !state.warningEmitted) {
			if (process.env.AWS_SDK_JS_NODE_VERSION_SUPPORT_WARNING_DISABLED === "true") {
				state.warningEmitted = true;
				return;
			}
			const userMajorVersion = parseInt(version.substring(1, version.indexOf(".")));
			const vv = 22;
			if (userMajorVersion < vv) {
				state.warningEmitted = true;
				process.emitWarning(`NodeVersionSupportWarning: The AWS SDK for JavaScript (v3)
versions published after the first week of January 2027
will require node >=${vv}. You are running node ${version}.

To continue receiving updates to AWS services, bug fixes,
and security updates please upgrade to node >=${vv}.

More information can be found at: https://a.co/c895JFp`);
			}
		}
	};
	var longPollMiddleware = () => (next, context) => async (args) => {
		context.__retryLongPoll = true;
		return next(args);
	};
	var longPollMiddlewareOptions = {
		name: "longPollMiddleware",
		tags: ["RETRY"],
		step: "initialize",
		override: true
	};
	var getLongPollPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(longPollMiddleware(), longPollMiddlewareOptions);
	} });
	function setCredentialFeature(credentials, feature, value) {
		if (!credentials.$source) credentials.$source = {};
		credentials.$source[feature] = value;
		return credentials;
	}
	Retry.v2026 ||= typeof process === "object" && process.env?.AWS_NEW_RETRIES_2026 === "true";
	function setFeature(context, feature, value) {
		if (!context.__aws_sdk_context) context.__aws_sdk_context = { features: {} };
		else if (!context.__aws_sdk_context.features) context.__aws_sdk_context.features = {};
		context.__aws_sdk_context.features[feature] = value;
	}
	function setTokenFeature(token, feature, value) {
		if (!token.$source) token.$source = {};
		token.$source[feature] = value;
		return token;
	}
	function resolveHostHeaderConfig(input) {
		return input;
	}
	var hostHeaderMiddleware = (options) => (next) => async (args) => {
		if (!HttpRequest.isInstance(args.request)) return next(args);
		const { request } = args;
		const { handlerProtocol = "" } = options.requestHandler.metadata || {};
		if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
			delete request.headers["host"];
			request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
		} else if (!request.headers["host"]) {
			let host = request.hostname;
			if (request.port != null) host += `:${request.port}`;
			request.headers["host"] = host;
		}
		return next(args);
	};
	var hostHeaderMiddlewareOptions = {
		name: "hostHeaderMiddleware",
		step: "build",
		priority: "low",
		tags: ["HOST"],
		override: true
	};
	var getHostHeaderPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
	} });
	var loggerMiddleware = () => (next, context) => async (args) => {
		try {
			const response = await next(args);
			const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
			const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
			const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
			const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
			const { $metadata, ...outputWithoutMetadata } = response.output;
			logger?.info?.({
				clientName,
				commandName,
				input: inputFilterSensitiveLog(args.input),
				output: outputFilterSensitiveLog(outputWithoutMetadata),
				metadata: $metadata
			});
			return response;
		} catch (error) {
			const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
			const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
			const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
			logger?.error?.({
				clientName,
				commandName,
				input: inputFilterSensitiveLog(args.input),
				error,
				metadata: error.$metadata
			});
			throw error;
		}
	};
	var loggerMiddlewareOptions = {
		name: "loggerMiddleware",
		tags: ["LOGGER"],
		step: "initialize",
		override: true
	};
	var getLoggerPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
	} });
	var recursionDetectionMiddlewareOptions = {
		step: "build",
		tags: ["RECURSION_DETECTION"],
		name: "recursionDetectionMiddleware",
		override: true,
		priority: "low"
	};
	var TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
	var ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
	var ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
	var recursionDetectionMiddleware = () => (next) => async (args) => {
		const { request } = args;
		if (!HttpRequest.isInstance(request)) return next(args);
		const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
		if (request.headers.hasOwnProperty(traceIdHeader)) return next(args);
		const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
		const traceIdFromEnv = process.env[ENV_TRACE_ID];
		const traceId = (await InvokeStore.getInstanceAsync())?.getXRayTraceId() ?? traceIdFromEnv;
		const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
		if (nonEmptyString(functionName) && nonEmptyString(traceId)) request.headers[TRACE_ID_HEADER_NAME] = traceId;
		return next({
			...args,
			request
		});
	};
	var getRecursionDetectionPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(recursionDetectionMiddleware(), recursionDetectionMiddlewareOptions);
	} });
	var DEFAULT_UA_APP_ID = void 0;
	function isValidUserAgentAppId(appId) {
		if (appId === void 0) return true;
		return typeof appId === "string" && appId.length <= 50;
	}
	function resolveUserAgentConfig(input) {
		const normalizedAppIdProvider = normalizeProvider(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
		const { customUserAgent } = input;
		return Object.assign(input, {
			customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
			userAgentAppId: async () => {
				const appId = await normalizedAppIdProvider();
				if (!isValidUserAgentAppId(appId)) {
					const logger = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
					if (typeof appId !== "string") logger?.warn("userAgentAppId must be a string or undefined.");
					else if (appId.length > 50) logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
				}
				return appId;
			}
		});
	}
	var partitionsInfo = {
		"partitions": [
			{
				"id": "aws",
				"outputs": {
					"dnsSuffix": "amazonaws.com",
					"dualStackDnsSuffix": "api.aws",
					"implicitGlobalRegion": "us-east-1",
					"name": "aws",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
				"regions": {
					"af-south-1": { "description": "Africa (Cape Town)" },
					"ap-east-1": { "description": "Asia Pacific (Hong Kong)" },
					"ap-east-2": { "description": "Asia Pacific (Taipei)" },
					"ap-northeast-1": { "description": "Asia Pacific (Tokyo)" },
					"ap-northeast-2": { "description": "Asia Pacific (Seoul)" },
					"ap-northeast-3": { "description": "Asia Pacific (Osaka)" },
					"ap-south-1": { "description": "Asia Pacific (Mumbai)" },
					"ap-south-2": { "description": "Asia Pacific (Hyderabad)" },
					"ap-southeast-1": { "description": "Asia Pacific (Singapore)" },
					"ap-southeast-2": { "description": "Asia Pacific (Sydney)" },
					"ap-southeast-3": { "description": "Asia Pacific (Jakarta)" },
					"ap-southeast-4": { "description": "Asia Pacific (Melbourne)" },
					"ap-southeast-5": { "description": "Asia Pacific (Malaysia)" },
					"ap-southeast-6": { "description": "Asia Pacific (New Zealand)" },
					"ap-southeast-7": { "description": "Asia Pacific (Thailand)" },
					"aws-global": { "description": "aws global region" },
					"ca-central-1": { "description": "Canada (Central)" },
					"ca-west-1": { "description": "Canada West (Calgary)" },
					"eu-central-1": { "description": "Europe (Frankfurt)" },
					"eu-central-2": { "description": "Europe (Zurich)" },
					"eu-north-1": { "description": "Europe (Stockholm)" },
					"eu-south-1": { "description": "Europe (Milan)" },
					"eu-south-2": { "description": "Europe (Spain)" },
					"eu-west-1": { "description": "Europe (Ireland)" },
					"eu-west-2": { "description": "Europe (London)" },
					"eu-west-3": { "description": "Europe (Paris)" },
					"il-central-1": { "description": "Israel (Tel Aviv)" },
					"me-central-1": { "description": "Middle East (UAE)" },
					"me-south-1": { "description": "Middle East (Bahrain)" },
					"mx-central-1": { "description": "Mexico (Central)" },
					"sa-east-1": { "description": "South America (Sao Paulo)" },
					"us-east-1": { "description": "US East (N. Virginia)" },
					"us-east-2": { "description": "US East (Ohio)" },
					"us-west-1": { "description": "US West (N. California)" },
					"us-west-2": { "description": "US West (Oregon)" }
				}
			},
			{
				"id": "aws-cn",
				"outputs": {
					"dnsSuffix": "amazonaws.com.cn",
					"dualStackDnsSuffix": "api.amazonwebservices.com.cn",
					"implicitGlobalRegion": "cn-northwest-1",
					"name": "aws-cn",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^cn\\-\\w+\\-\\d+$",
				"regions": {
					"aws-cn-global": { "description": "aws-cn global region" },
					"cn-north-1": { "description": "China (Beijing)" },
					"cn-northwest-1": { "description": "China (Ningxia)" }
				}
			},
			{
				"id": "aws-eusc",
				"outputs": {
					"dnsSuffix": "amazonaws.eu",
					"dualStackDnsSuffix": "api.amazonwebservices.eu",
					"implicitGlobalRegion": "eusc-de-east-1",
					"name": "aws-eusc",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^eusc\\-(de)\\-\\w+\\-\\d+$",
				"regions": { "eusc-de-east-1": { "description": "AWS European Sovereign Cloud (Germany)" } }
			},
			{
				"id": "aws-iso",
				"outputs": {
					"dnsSuffix": "c2s.ic.gov",
					"dualStackDnsSuffix": "api.aws.ic.gov",
					"implicitGlobalRegion": "us-iso-east-1",
					"name": "aws-iso",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^us\\-iso\\-\\w+\\-\\d+$",
				"regions": {
					"aws-iso-global": { "description": "aws-iso global region" },
					"us-iso-east-1": { "description": "US ISO East" },
					"us-iso-west-1": { "description": "US ISO WEST" }
				}
			},
			{
				"id": "aws-iso-b",
				"outputs": {
					"dnsSuffix": "sc2s.sgov.gov",
					"dualStackDnsSuffix": "api.aws.scloud",
					"implicitGlobalRegion": "us-isob-east-1",
					"name": "aws-iso-b",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^us\\-isob\\-\\w+\\-\\d+$",
				"regions": {
					"aws-iso-b-global": { "description": "aws-iso-b global region" },
					"us-isob-east-1": { "description": "US ISOB East (Ohio)" },
					"us-isob-west-1": { "description": "US ISOB West" }
				}
			},
			{
				"id": "aws-iso-e",
				"outputs": {
					"dnsSuffix": "cloud.adc-e.uk",
					"dualStackDnsSuffix": "api.cloud-aws.adc-e.uk",
					"implicitGlobalRegion": "eu-isoe-west-1",
					"name": "aws-iso-e",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^eu\\-isoe\\-\\w+\\-\\d+$",
				"regions": {
					"aws-iso-e-global": { "description": "aws-iso-e global region" },
					"eu-isoe-west-1": { "description": "EU ISOE West" }
				}
			},
			{
				"id": "aws-iso-f",
				"outputs": {
					"dnsSuffix": "csp.hci.ic.gov",
					"dualStackDnsSuffix": "api.aws.hci.ic.gov",
					"implicitGlobalRegion": "us-isof-south-1",
					"name": "aws-iso-f",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^us\\-isof\\-\\w+\\-\\d+$",
				"regions": {
					"aws-iso-f-global": { "description": "aws-iso-f global region" },
					"us-isof-east-1": { "description": "US ISOF EAST" },
					"us-isof-south-1": { "description": "US ISOF SOUTH" }
				}
			},
			{
				"id": "aws-us-gov",
				"outputs": {
					"dnsSuffix": "amazonaws.com",
					"dualStackDnsSuffix": "api.aws",
					"implicitGlobalRegion": "us-gov-west-1",
					"name": "aws-us-gov",
					"supportsDualStack": true,
					"supportsFIPS": true
				},
				"regionRegex": "^us\\-gov\\-\\w+\\-\\d+$",
				"regions": {
					"aws-us-gov-global": { "description": "aws-us-gov global region" },
					"us-gov-east-1": { "description": "AWS GovCloud (US-East)" },
					"us-gov-west-1": { "description": "AWS GovCloud (US-West)" }
				}
			}
		],
		"version": "1.1"
	};
	var selectedPartitionsInfo = partitionsInfo;
	var selectedUserAgentPrefix = "";
	var partition = (value) => {
		const { partitions } = selectedPartitionsInfo;
		for (const partition of partitions) {
			const { regions, outputs } = partition;
			for (const [region, regionData] of Object.entries(regions)) if (region === value) return {
				...outputs,
				...regionData
			};
		}
		for (const partition of partitions) {
			const { regionRegex, outputs } = partition;
			if (new RegExp(regionRegex).test(value)) return { ...outputs };
		}
		const DEFAULT_PARTITION = partitions.find((partition) => partition.id === "aws");
		if (!DEFAULT_PARTITION) throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
		return { ...DEFAULT_PARTITION.outputs };
	};
	var setPartitionInfo = (partitionsInfo, userAgentPrefix = "") => {
		selectedPartitionsInfo = partitionsInfo;
		selectedUserAgentPrefix = userAgentPrefix;
	};
	var useDefaultPartitionInfo = () => {
		setPartitionInfo(partitionsInfo, "");
	};
	var getUserAgentPrefix = () => selectedUserAgentPrefix;
	var ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
	async function checkFeatures(context, config, args) {
		if (args.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") setFeature(context, "PROTOCOL_RPC_V2_CBOR", "M");
		if (typeof config.retryStrategy === "function") {
			const retryStrategy = await config.retryStrategy();
			if (typeof retryStrategy.mode === "string") switch (retryStrategy.mode) {
				case RETRY_MODES.ADAPTIVE:
					setFeature(context, "RETRY_MODE_ADAPTIVE", "F");
					break;
				case RETRY_MODES.STANDARD:
					setFeature(context, "RETRY_MODE_STANDARD", "E");
					break;
			}
		}
		if (typeof config.accountIdEndpointMode === "function") {
			const endpointV2 = context.endpointV2;
			if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) setFeature(context, "ACCOUNT_ID_ENDPOINT", "O");
			switch (await config.accountIdEndpointMode?.()) {
				case "disabled":
					setFeature(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
					break;
				case "preferred":
					setFeature(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
					break;
				case "required":
					setFeature(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
					break;
			}
		}
		const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
		if (identity?.$source) {
			const credentials = identity;
			if (credentials.accountId) setFeature(context, "RESOLVED_ACCOUNT_ID", "T");
			for (const [key, value] of Object.entries(credentials.$source ?? {})) setFeature(context, key, value);
		}
	}
	var USER_AGENT = "user-agent";
	var X_AMZ_USER_AGENT = "x-amz-user-agent";
	var SPACE = " ";
	var UA_NAME_SEPARATOR = "/";
	var UA_NAME_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w]/g;
	var UA_VALUE_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w#]/g;
	var UA_ESCAPE_CHAR = "-";
	var BYTE_LIMIT = 1024;
	function encodeFeatures(features) {
		let buffer = "";
		for (const key in features) {
			const val = features[key];
			if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
				if (buffer.length) buffer += "," + val;
				else buffer += val;
				continue;
			}
			break;
		}
		return buffer;
	}
	var userAgentMiddleware = (options) => (next, context) => async (args) => {
		const { request } = args;
		if (!HttpRequest.isInstance(request)) return next(args);
		const { headers } = request;
		const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
		const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
		await checkFeatures(context, options, args);
		const awsContext = context;
		defaultUserAgent.push(`m/${encodeFeatures(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
		const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
		const appId = await options.userAgentAppId();
		if (appId) defaultUserAgent.push(escapeUserAgent([`app`, `${appId}`]));
		const prefix = getUserAgentPrefix();
		const sdkUserAgentValue = (prefix ? [prefix] : []).concat([
			...defaultUserAgent,
			...userAgent,
			...customUserAgent
		]).join(SPACE);
		const normalUAValue = [...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")), ...customUserAgent].join(SPACE);
		if (options.runtime !== "browser") {
			if (normalUAValue) headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
			headers[USER_AGENT] = sdkUserAgentValue;
		} else headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
		return next({
			...args,
			request
		});
	};
	var escapeUserAgent = (userAgentPair) => {
		const name = userAgentPair[0].split(UA_NAME_SEPARATOR).map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR)).join(UA_NAME_SEPARATOR);
		const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
		const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
		const prefix = name.substring(0, prefixSeparatorIndex);
		let uaName = name.substring(prefixSeparatorIndex + 1);
		if (prefix === "api") uaName = uaName.toLowerCase();
		return [
			prefix,
			uaName,
			version
		].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
			switch (index) {
				case 0: return item;
				case 1: return `${acc}/${item}`;
				default: return `${acc}#${item}`;
			}
		}, "");
	};
	var getUserAgentMiddlewareOptions = {
		name: "getUserAgentMiddleware",
		step: "build",
		priority: "low",
		tags: ["SET_USER_AGENT", "USER_AGENT"],
		override: true
	};
	var getUserAgentPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
	} });
	var getRuntimeUserAgentPair = () => {
		for (const runtime of [
			"deno",
			"bun",
			"llrt"
		]) if (versions[runtime]) return [`md/${runtime}`, versions[runtime]];
		return ["md/nodejs", versions.node];
	};
	var getNodeModulesParentDirs = (dirname) => {
		const cwd = process.cwd();
		if (!dirname) return [cwd];
		const normalizedPath = normalize(dirname);
		const parts = normalizedPath.split(sep);
		const nodeModulesIndex = parts.indexOf("node_modules");
		const parentDir = nodeModulesIndex !== -1 ? parts.slice(0, nodeModulesIndex).join(sep) : normalizedPath;
		if (cwd === parentDir) return [cwd];
		return [parentDir, cwd];
	};
	var SEMVER_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/;
	var getSanitizedTypeScriptVersion = (version = "") => {
		const match = version.match(SEMVER_REGEX);
		if (!match) return;
		const [major, minor, patch, prerelease] = [
			match[1],
			match[2],
			match[3],
			match[4]
		];
		return prerelease ? `${major}.${minor}.${patch}-${prerelease}` : `${major}.${minor}.${patch}`;
	};
	var ALLOWED_PREFIXES = [
		"^",
		"~",
		">=",
		"<=",
		">",
		"<"
	];
	var ALLOWED_DIST_TAGS = [
		"latest",
		"beta",
		"dev",
		"rc",
		"insiders",
		"next"
	];
	var getSanitizedDevTypeScriptVersion = (version = "") => {
		if (ALLOWED_DIST_TAGS.includes(version)) return version;
		const prefix = ALLOWED_PREFIXES.find((p) => version.startsWith(p)) ?? "";
		const sanitizedTypeScriptVersion = getSanitizedTypeScriptVersion(version.slice(prefix.length));
		if (!sanitizedTypeScriptVersion) return;
		return `${prefix}${sanitizedTypeScriptVersion}`;
	};
	var tscVersion;
	var TS_PACKAGE_JSON = join("node_modules", "typescript", "package.json");
	var getTypeScriptUserAgentPair = async () => {
		if (tscVersion === null) return;
		else if (typeof tscVersion === "string") return ["md/tsc", tscVersion];
		let isTypeScriptDetectionDisabled = false;
		try {
			isTypeScriptDetectionDisabled = booleanSelector(process.env, "AWS_SDK_JS_TYPESCRIPT_DETECTION_DISABLED", SelectorType.ENV) || false;
		} catch {}
		if (isTypeScriptDetectionDisabled) {
			tscVersion = null;
			return;
		}
		const nodeModulesParentDirs = getNodeModulesParentDirs(typeof __dirname !== "undefined" ? __dirname : void 0);
		let versionFromApp;
		for (const nodeModulesParentDir of nodeModulesParentDirs) try {
			const packageJson = await readFile(join(nodeModulesParentDir, "package.json"), "utf-8");
			const { dependencies, devDependencies } = JSON.parse(packageJson);
			const version = devDependencies?.typescript ?? dependencies?.typescript;
			if (typeof version !== "string") continue;
			versionFromApp = version;
			break;
		} catch {}
		if (!versionFromApp) {
			tscVersion = null;
			return;
		}
		let versionFromNodeModules;
		for (const nodeModulesParentDir of nodeModulesParentDirs) try {
			const packageJson = await readFile(join(nodeModulesParentDir, TS_PACKAGE_JSON), "utf-8");
			const { version } = JSON.parse(packageJson);
			const sanitizedVersion = getSanitizedTypeScriptVersion(version);
			if (typeof sanitizedVersion !== "string") continue;
			versionFromNodeModules = sanitizedVersion;
			break;
		} catch {}
		if (versionFromNodeModules) {
			tscVersion = versionFromNodeModules;
			return ["md/tsc", tscVersion];
		}
		const sanitizedVersion = getSanitizedDevTypeScriptVersion(versionFromApp);
		if (typeof sanitizedVersion !== "string") {
			tscVersion = null;
			return;
		}
		tscVersion = `dev_${sanitizedVersion}`;
		return ["md/tsc", tscVersion];
	};
	var crtAvailability = { isCrtAvailable: false };
	var isCrtAvailable = () => {
		if (crtAvailability.isCrtAvailable) return ["md/crt-avail"];
		return null;
	};
	var createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => {
		const runtimeUserAgentPair = getRuntimeUserAgentPair();
		return async (config) => {
			const sections = [
				["aws-sdk-js", clientVersion],
				["ua", "2.1"],
				[`os/${platform()}`, release()],
				["lang/js"],
				runtimeUserAgentPair
			];
			const typescriptUserAgentPair = await getTypeScriptUserAgentPair();
			if (typescriptUserAgentPair) sections.push(typescriptUserAgentPair);
			const crtAvailable = isCrtAvailable();
			if (crtAvailable) sections.push(crtAvailable);
			if (serviceId) sections.push([`api/${serviceId}`, clientVersion]);
			if (env.AWS_EXECUTION_ENV) sections.push([`exec-env/${env.AWS_EXECUTION_ENV}`]);
			const appId = await config?.userAgentAppId?.();
			return appId ? [...sections, [`app/${appId}`]] : [...sections];
		};
	};
	var defaultUserAgent = createDefaultUserAgentProvider;
	var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
	var UA_APP_ID_INI_NAME = "sdk_ua_app_id";
	var UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
	var NODE_APP_ID_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => env[UA_APP_ID_ENV_NAME],
		configFileSelector: (profile) => profile[UA_APP_ID_INI_NAME] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED],
		default: DEFAULT_UA_APP_ID
	};
	var createUserAgentStringParsingProvider = ({ serviceId, clientVersion }) => async (config) => {
		const module$1 = (init_bowser(), __toCommonJS(bowser_exports));
		const parse = module$1.parse ?? module$1.default.parse ?? (() => "");
		const parsedUA = typeof window !== "undefined" && window?.navigator?.userAgent ? parse(window.navigator.userAgent) : void 0;
		const sections = [
			["aws-sdk-js", clientVersion],
			["ua", "2.1"],
			[`os/${parsedUA?.os?.name || "other"}`, parsedUA?.os?.version],
			["lang/js"],
			["md/browser", `${parsedUA?.browser?.name ?? "unknown"}_${parsedUA?.browser?.version ?? "unknown"}`]
		];
		if (serviceId) sections.push([`api/${serviceId}`, clientVersion]);
		const appId = await config?.userAgentAppId?.();
		if (appId) sections.push([`app/${appId}`]);
		return sections;
	};
	var fallback = {
		os(ua) {
			if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
			if (/Macintosh|Mac OS X/.test(ua)) return "macOS";
			if (/Windows NT/.test(ua)) return "Windows";
			if (/Android/.test(ua)) return "Android";
			if (/Linux/.test(ua)) return "Linux";
		},
		browser(ua) {
			if (/EdgiOS|EdgA|Edg\//.test(ua)) return "Microsoft Edge";
			if (/Firefox\//.test(ua)) return "Firefox";
			if (/Chrome\//.test(ua)) return "Chrome";
			if (/Safari\//.test(ua)) return "Safari";
		}
	};
	var isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
		if (allowSubDomains) {
			for (const label of value.split(".")) if (!isVirtualHostableS3Bucket(label)) return false;
			return true;
		}
		if (!isValidHostLabel(value)) return false;
		if (value.length < 3 || value.length > 63) return false;
		if (value !== value.toLowerCase()) return false;
		if (isIpAddress(value)) return false;
		return true;
	};
	var ARN_DELIMITER = ":";
	var RESOURCE_DELIMITER = "/";
	var parseArn = (value) => {
		const segments = value.split(ARN_DELIMITER);
		if (segments.length < 6) return null;
		const [arn, partition, service, region, accountId, ...resourcePath] = segments;
		if (arn !== "arn" || partition === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "") return null;
		return {
			partition,
			service,
			region,
			accountId,
			resourceId: resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat()
		};
	};
	var awsEndpointFunctions = {
		isVirtualHostableS3Bucket,
		parseArn,
		partition
	};
	customEndpointFunctions.aws = awsEndpointFunctions;
	var resolveDefaultAwsRegionalEndpointsConfig = (input) => {
		if (typeof input.endpointProvider !== "function") throw new Error("@aws-sdk/util-endpoint - endpointProvider and endpoint missing in config for this client.");
		const { endpoint } = input;
		if (endpoint === void 0) input.endpoint = async () => {
			return toEndpointV1(input.endpointProvider({
				Region: typeof input.region === "function" ? await input.region() : input.region,
				UseDualStack: typeof input.useDualstackEndpoint === "function" ? await input.useDualstackEndpoint() : input.useDualstackEndpoint,
				UseFIPS: typeof input.useFipsEndpoint === "function" ? await input.useFipsEndpoint() : input.useFipsEndpoint,
				Endpoint: void 0
			}, { logger: input.logger }));
		};
		return input;
	};
	var toEndpointV1 = (endpoint) => parseUrl(endpoint.url);
	function stsRegionDefaultResolver(loaderConfig = {}) {
		return loadConfig({
			...NODE_REGION_CONFIG_OPTIONS,
			async default() {
				if (!warning.silence) console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly.");
				return "us-east-1";
			}
		}, {
			...NODE_REGION_CONFIG_FILE_OPTIONS,
			...loaderConfig
		});
	}
	var warning = { silence: false };
	var getAwsRegionExtensionConfiguration = (runtimeConfig) => {
		return {
			setRegion(region) {
				runtimeConfig.region = region;
			},
			region() {
				return runtimeConfig.region;
			}
		};
	};
	var resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
		return { region: awsRegionExtensionConfiguration.region() };
	};
	exports.DEFAULT_UA_APP_ID = DEFAULT_UA_APP_ID;
	exports.NODE_APP_ID_CONFIG_OPTIONS = NODE_APP_ID_CONFIG_OPTIONS;
	exports.UA_APP_ID_ENV_NAME = UA_APP_ID_ENV_NAME;
	exports.UA_APP_ID_INI_NAME = UA_APP_ID_INI_NAME;
	exports.awsEndpointFunctions = awsEndpointFunctions;
	exports.createDefaultUserAgentProvider = createDefaultUserAgentProvider;
	exports.createUserAgentStringParsingProvider = createUserAgentStringParsingProvider;
	exports.crtAvailability = crtAvailability;
	exports.defaultUserAgent = defaultUserAgent;
	exports.emitWarningIfUnsupportedVersion = emitWarningIfUnsupportedVersion;
	exports.fallback = fallback;
	exports.getAwsRegionExtensionConfiguration = getAwsRegionExtensionConfiguration;
	exports.getHostHeaderPlugin = getHostHeaderPlugin;
	exports.getLoggerPlugin = getLoggerPlugin;
	exports.getLongPollPlugin = getLongPollPlugin;
	exports.getRecursionDetectionPlugin = getRecursionDetectionPlugin;
	exports.getUserAgentMiddlewareOptions = getUserAgentMiddlewareOptions;
	exports.getUserAgentPlugin = getUserAgentPlugin;
	exports.getUserAgentPrefix = getUserAgentPrefix;
	exports.hostHeaderMiddleware = hostHeaderMiddleware;
	exports.hostHeaderMiddlewareOptions = hostHeaderMiddlewareOptions;
	exports.isVirtualHostableS3Bucket = isVirtualHostableS3Bucket;
	exports.loggerMiddleware = loggerMiddleware;
	exports.loggerMiddlewareOptions = loggerMiddlewareOptions;
	exports.parseArn = parseArn;
	exports.partition = partition;
	exports.recursionDetectionMiddleware = recursionDetectionMiddleware;
	exports.recursionDetectionMiddlewareOptions = recursionDetectionMiddlewareOptions;
	exports.resolveAwsRegionExtensionConfiguration = resolveAwsRegionExtensionConfiguration;
	exports.resolveDefaultAwsRegionalEndpointsConfig = resolveDefaultAwsRegionalEndpointsConfig;
	exports.resolveHostHeaderConfig = resolveHostHeaderConfig;
	exports.resolveUserAgentConfig = resolveUserAgentConfig;
	exports.setCredentialFeature = setCredentialFeature;
	exports.setFeature = setFeature;
	exports.setPartitionInfo = setPartitionInfo;
	exports.setTokenFeature = setTokenFeature;
	exports.state = state;
	exports.stsRegionDefaultResolver = stsRegionDefaultResolver;
	exports.stsRegionWarning = warning;
	exports.toEndpointV1 = toEndpointV1;
	exports.useDefaultPartitionInfo = useDefaultPartitionInfo;
	exports.userAgentMiddleware = userAgentMiddleware;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/crc64-nvme/Crc64Nvme.js
var import_serde = require_serde();
var import_protocols = require_protocols();
var import_client$1 = require_client();
var generateCRC64NVMETable = () => {
	const sliceLength = 8;
	const tables = new Array(sliceLength);
	for (let slice = 0; slice < sliceLength; slice++) {
		const table = new Array(512);
		for (let i = 0; i < 256; i++) {
			let crc = BigInt(i);
			for (let j = 0; j < 8 * (slice + 1); j++) if (crc & 1n) crc = crc >> 1n ^ 11127430586519243189n;
			else crc = crc >> 1n;
			table[i * 2] = Number(crc >> 32n & 4294967295n);
			table[i * 2 + 1] = Number(crc & 4294967295n);
		}
		tables[slice] = new Uint32Array(table);
	}
	return tables;
};
var CRC64_NVME_REVERSED_TABLE;
var t0, t1, t2, t3;
var t4, t5, t6, t7;
var ensureTablesInitialized = () => {
	if (!CRC64_NVME_REVERSED_TABLE) {
		CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();
		[t0, t1, t2, t3, t4, t5, t6, t7] = CRC64_NVME_REVERSED_TABLE;
	}
};
var Crc64Nvme = class {
	c1 = 0;
	c2 = 0;
	constructor() {
		ensureTablesInitialized();
		this.reset();
	}
	update(data) {
		const len = data.length;
		let i = 0;
		let crc1 = this.c1;
		let crc2 = this.c2;
		while (i + 8 <= len) {
			const idx0 = ((crc2 ^ data[i++]) & 255) << 1;
			const idx1 = ((crc2 >>> 8 ^ data[i++]) & 255) << 1;
			const idx2 = ((crc2 >>> 16 ^ data[i++]) & 255) << 1;
			const idx3 = ((crc2 >>> 24 ^ data[i++]) & 255) << 1;
			const idx4 = ((crc1 ^ data[i++]) & 255) << 1;
			const idx5 = ((crc1 >>> 8 ^ data[i++]) & 255) << 1;
			const idx6 = ((crc1 >>> 16 ^ data[i++]) & 255) << 1;
			const idx7 = ((crc1 >>> 24 ^ data[i++]) & 255) << 1;
			crc1 = t7[idx0] ^ t6[idx1] ^ t5[idx2] ^ t4[idx3] ^ t3[idx4] ^ t2[idx5] ^ t1[idx6] ^ t0[idx7];
			crc2 = t7[idx0 + 1] ^ t6[idx1 + 1] ^ t5[idx2 + 1] ^ t4[idx3 + 1] ^ t3[idx4 + 1] ^ t2[idx5 + 1] ^ t1[idx6 + 1] ^ t0[idx7 + 1];
		}
		while (i < len) {
			const idx = ((crc2 ^ data[i]) & 255) << 1;
			crc2 = (crc2 >>> 8 | (crc1 & 255) << 24) >>> 0;
			crc1 = crc1 >>> 8 ^ t0[idx];
			crc2 ^= t0[idx + 1];
			i++;
		}
		this.c1 = crc1;
		this.c2 = crc2;
	}
	async digest() {
		const c1 = this.c1 ^ 4294967295;
		const c2 = this.c2 ^ 4294967295;
		return new Uint8Array([
			c1 >>> 24,
			c1 >>> 16 & 255,
			c1 >>> 8 & 255,
			c1 & 255,
			c2 >>> 24,
			c2 >>> 16 & 255,
			c2 >>> 8 & 255,
			c2 & 255
		]);
	}
	reset() {
		this.c1 = 4294967295;
		this.c2 = 4294967295;
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/crc64-nvme/crc64-nvme-crt-container.js
var crc64NvmeCrtContainer = { CrtCrc64Nvme: null };
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/constants.js
var RequestChecksumCalculation = {
	WHEN_SUPPORTED: "WHEN_SUPPORTED",
	WHEN_REQUIRED: "WHEN_REQUIRED"
};
var DEFAULT_REQUEST_CHECKSUM_CALCULATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ResponseChecksumValidation = {
	WHEN_SUPPORTED: "WHEN_SUPPORTED",
	WHEN_REQUIRED: "WHEN_REQUIRED"
};
var DEFAULT_RESPONSE_CHECKSUM_VALIDATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ChecksumAlgorithm;
(function(ChecksumAlgorithm) {
	ChecksumAlgorithm["MD5"] = "MD5";
	ChecksumAlgorithm["CRC32"] = "CRC32";
	ChecksumAlgorithm["CRC32C"] = "CRC32C";
	ChecksumAlgorithm["CRC64NVME"] = "CRC64NVME";
	ChecksumAlgorithm["SHA1"] = "SHA1";
	ChecksumAlgorithm["SHA256"] = "SHA256";
})(ChecksumAlgorithm || (ChecksumAlgorithm = {}));
var ChecksumLocation;
(function(ChecksumLocation) {
	ChecksumLocation["HEADER"] = "header";
	ChecksumLocation["TRAILER"] = "trailer";
})(ChecksumLocation || (ChecksumLocation = {}));
var DEFAULT_CHECKSUM_ALGORITHM = ChecksumAlgorithm.CRC32;
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/stringUnionSelector.js
var SelectorType;
(function(SelectorType) {
	SelectorType["ENV"] = "env";
	SelectorType["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));
var stringUnionSelector = (obj, key, union, type) => {
	if (!(key in obj)) return void 0;
	const value = obj[key].toUpperCase();
	if (!Object.values(union).includes(value)) throw new TypeError(`Cannot load ${type} '${key}'. Expected one of ${Object.values(union)}, got '${obj[key]}'.`);
	return value;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS.js
var ENV_REQUEST_CHECKSUM_CALCULATION = "AWS_REQUEST_CHECKSUM_CALCULATION";
var CONFIG_REQUEST_CHECKSUM_CALCULATION = "request_checksum_calculation";
var NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS = {
	environmentVariableSelector: (env) => stringUnionSelector(env, ENV_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType.ENV),
	configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType.CONFIG),
	default: DEFAULT_REQUEST_CHECKSUM_CALCULATION
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS.js
var ENV_RESPONSE_CHECKSUM_VALIDATION = "AWS_RESPONSE_CHECKSUM_VALIDATION";
var CONFIG_RESPONSE_CHECKSUM_VALIDATION = "response_checksum_validation";
var NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS = {
	environmentVariableSelector: (env) => stringUnionSelector(env, ENV_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType.ENV),
	configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType.CONFIG),
	default: DEFAULT_RESPONSE_CHECKSUM_VALIDATION
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/getChecksumAlgorithmForRequest.js
var getChecksumAlgorithmForRequest = (input, { requestChecksumRequired, requestAlgorithmMember, requestChecksumCalculation }) => {
	if (!requestAlgorithmMember) return requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired ? DEFAULT_CHECKSUM_ALGORITHM : void 0;
	if (!input[requestAlgorithmMember]) return;
	return input[requestAlgorithmMember];
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/getChecksumLocationName.js
var getChecksumLocationName = (algorithm) => algorithm === ChecksumAlgorithm.MD5 ? "content-md5" : `x-amz-checksum-${algorithm.toLowerCase()}`;
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/hasHeader.js
var hasHeader = (header, headers) => {
	const soughtHeader = header.toLowerCase();
	for (const headerName of Object.keys(headers)) if (soughtHeader === headerName.toLowerCase()) return true;
	return false;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/hasHeaderWithPrefix.js
var hasHeaderWithPrefix = (headerPrefix, headers) => {
	const soughtHeaderPrefix = headerPrefix.toLowerCase();
	for (const headerName of Object.keys(headers)) if (headerName.toLowerCase().startsWith(soughtHeaderPrefix)) return true;
	return false;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/isStreaming.js
var isStreaming = (body) => body !== void 0 && typeof body !== "string" && !ArrayBuffer.isView(body) && !(0, import_serde.isArrayBuffer)(body);
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/getCrc32ChecksumAlgorithmFunction.js
init_module();
init_module$1();
var NodeCrc32 = class {
	checksum = 0;
	update(data) {
		this.checksum = zlib.crc32(data, this.checksum);
	}
	async digest() {
		return numToUint8(this.checksum);
	}
	reset() {
		this.checksum = 0;
	}
};
var getCrc32ChecksumAlgorithmFunction = () => {
	if (typeof zlib.crc32 === "undefined") return AwsCrc32;
	return NodeCrc32;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/types.js
var CLIENT_SUPPORTED_ALGORITHMS = [
	ChecksumAlgorithm.CRC32,
	ChecksumAlgorithm.CRC32C,
	ChecksumAlgorithm.CRC64NVME,
	ChecksumAlgorithm.SHA1,
	ChecksumAlgorithm.SHA256
];
var PRIORITY_ORDER_ALGORITHMS = [
	ChecksumAlgorithm.SHA256,
	ChecksumAlgorithm.SHA1,
	ChecksumAlgorithm.CRC32,
	ChecksumAlgorithm.CRC32C,
	ChecksumAlgorithm.CRC64NVME
];
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/selectChecksumAlgorithmFunction.js
var selectChecksumAlgorithmFunction = (checksumAlgorithm, config) => {
	const { checksumAlgorithms = {} } = config;
	switch (checksumAlgorithm) {
		case ChecksumAlgorithm.MD5: return checksumAlgorithms?.MD5 ?? config.md5;
		case ChecksumAlgorithm.CRC32: return checksumAlgorithms?.CRC32 ?? getCrc32ChecksumAlgorithmFunction();
		case ChecksumAlgorithm.CRC32C: return checksumAlgorithms?.CRC32C ?? AwsCrc32c;
		case ChecksumAlgorithm.CRC64NVME:
			if (typeof crc64NvmeCrtContainer.CrtCrc64Nvme !== "function") return checksumAlgorithms?.CRC64NVME ?? Crc64Nvme;
			return checksumAlgorithms?.CRC64NVME ?? crc64NvmeCrtContainer.CrtCrc64Nvme;
		case ChecksumAlgorithm.SHA1: return checksumAlgorithms?.SHA1 ?? config.sha1;
		case ChecksumAlgorithm.SHA256: return checksumAlgorithms?.SHA256 ?? config.sha256;
		default:
			if (checksumAlgorithms?.[checksumAlgorithm]) return checksumAlgorithms[checksumAlgorithm];
			throw new Error(`The checksum algorithm "${checksumAlgorithm}" is not supported by the client. Select one of ${CLIENT_SUPPORTED_ALGORITHMS}, or provide an implementation to  the client constructor checksums field.`);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/stringHasher.js
var stringHasher = (checksumAlgorithmFn, body) => {
	const hash = new checksumAlgorithmFn();
	hash.update((0, import_serde.toUint8Array)(body || ""));
	return hash.digest();
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/flexibleChecksumsMiddleware.js
var flexibleChecksumsMiddlewareOptions = {
	name: "flexibleChecksumsMiddleware",
	step: "build",
	tags: ["BODY_CHECKSUM"],
	override: true
};
var flexibleChecksumsMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
	if (!import_protocols.HttpRequest.isInstance(args.request)) return next(args);
	if (hasHeaderWithPrefix("x-amz-checksum-", args.request.headers)) return next(args);
	const { request, input } = args;
	const { body: requestBody, headers } = request;
	const { base64Encoder, streamHasher } = config;
	const { requestChecksumRequired, requestAlgorithmMember } = middlewareConfig;
	const requestChecksumCalculation = await config.requestChecksumCalculation();
	const requestAlgorithmMemberName = requestAlgorithmMember?.name;
	const requestAlgorithmMemberHttpHeader = requestAlgorithmMember?.httpHeader;
	if (requestAlgorithmMemberName && !input[requestAlgorithmMemberName]) {
		if (requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired) {
			input[requestAlgorithmMemberName] = DEFAULT_CHECKSUM_ALGORITHM;
			if (requestAlgorithmMemberHttpHeader) headers[requestAlgorithmMemberHttpHeader] = DEFAULT_CHECKSUM_ALGORITHM;
		}
	}
	const checksumAlgorithm = getChecksumAlgorithmForRequest(input, {
		requestChecksumRequired,
		requestAlgorithmMember: requestAlgorithmMember?.name,
		requestChecksumCalculation
	});
	let updatedBody = requestBody;
	let updatedHeaders = headers;
	if (checksumAlgorithm) {
		switch (checksumAlgorithm) {
			case ChecksumAlgorithm.CRC32:
				(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
				break;
			case ChecksumAlgorithm.CRC32C:
				(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
				break;
			case ChecksumAlgorithm.CRC64NVME:
				(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
				break;
			case ChecksumAlgorithm.SHA1:
				(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
				break;
			case ChecksumAlgorithm.SHA256:
				(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
				break;
		}
		const checksumLocationName = getChecksumLocationName(checksumAlgorithm);
		const checksumAlgorithmFn = selectChecksumAlgorithmFunction(checksumAlgorithm, config);
		if (isStreaming(requestBody)) {
			const { getAwsChunkedEncodingStream, bodyLengthChecker } = config;
			updatedBody = getAwsChunkedEncodingStream(typeof config.requestStreamBufferSize === "number" && config.requestStreamBufferSize >= 8 * 1024 ? (0, import_serde.createBufferedReadable)(requestBody, config.requestStreamBufferSize, context.logger) : requestBody, {
				base64Encoder,
				bodyLengthChecker,
				checksumLocationName,
				checksumAlgorithmFn,
				streamHasher
			});
			updatedHeaders = {
				...headers,
				"content-encoding": headers["content-encoding"] ? `${headers["content-encoding"]},aws-chunked` : "aws-chunked",
				"transfer-encoding": "chunked",
				"x-amz-decoded-content-length": headers["content-length"],
				"x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER",
				"x-amz-trailer": checksumLocationName
			};
			delete updatedHeaders["content-length"];
		} else if (!hasHeader(checksumLocationName, headers)) {
			const rawChecksum = await stringHasher(checksumAlgorithmFn, requestBody);
			updatedHeaders = {
				...headers,
				[checksumLocationName]: base64Encoder(rawChecksum)
			};
		}
	}
	try {
		return await next({
			...args,
			request: {
				...request,
				headers: updatedHeaders,
				body: updatedBody
			}
		});
	} catch (e) {
		if (e instanceof Error && e.name === "InvalidChunkSizeError") try {
			if (!e.message.endsWith(".")) e.message += ".";
			e.message += " Set [requestStreamBufferSize=number e.g. 65_536] in client constructor to instruct AWS SDK to buffer your input stream.";
		} catch (ignored) {}
		throw e;
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/flexibleChecksumsInputMiddleware.js
var flexibleChecksumsInputMiddlewareOptions = {
	name: "flexibleChecksumsInputMiddleware",
	toMiddleware: "serializerMiddleware",
	relation: "before",
	tags: ["BODY_CHECKSUM"],
	override: true
};
var flexibleChecksumsInputMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
	const input = args.input;
	const { requestValidationModeMember } = middlewareConfig;
	const requestChecksumCalculation = await config.requestChecksumCalculation();
	const responseChecksumValidation = await config.responseChecksumValidation();
	switch (requestChecksumCalculation) {
		case RequestChecksumCalculation.WHEN_REQUIRED:
			(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_REQUIRED", "a");
			break;
		case RequestChecksumCalculation.WHEN_SUPPORTED:
			(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_SUPPORTED", "Z");
			break;
	}
	switch (responseChecksumValidation) {
		case ResponseChecksumValidation.WHEN_REQUIRED:
			(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
			break;
		case ResponseChecksumValidation.WHEN_SUPPORTED:
			(0, import_client$1.setFeature)(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
			break;
	}
	if (requestValidationModeMember && !input[requestValidationModeMember]) {
		if (responseChecksumValidation === ResponseChecksumValidation.WHEN_SUPPORTED) input[requestValidationModeMember] = "ENABLED";
	}
	return next(args);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/getChecksumAlgorithmListForResponse.js
var getChecksumAlgorithmListForResponse = (responseAlgorithms = []) => {
	const validChecksumAlgorithms = [];
	let i = PRIORITY_ORDER_ALGORITHMS.length;
	for (const algorithm of responseAlgorithms) {
		const priority = PRIORITY_ORDER_ALGORITHMS.indexOf(algorithm);
		if (priority !== -1) validChecksumAlgorithms[priority] = algorithm;
		else validChecksumAlgorithms[i++] = algorithm;
	}
	return validChecksumAlgorithms.filter(Boolean);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/isChecksumWithPartNumber.js
var isChecksumWithPartNumber = (checksum) => {
	const lastHyphenIndex = checksum.lastIndexOf("-");
	if (lastHyphenIndex !== -1) {
		const numberPart = checksum.slice(lastHyphenIndex + 1);
		if (!numberPart.startsWith("0")) {
			const number = parseInt(numberPart, 10);
			if (!isNaN(number) && number >= 1 && number <= 1e4) return true;
		}
	}
	return false;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/getChecksum.js
var getChecksum = async (body, { checksumAlgorithmFn, base64Encoder }) => base64Encoder(await stringHasher(checksumAlgorithmFn, body));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/validateChecksumFromResponse.js
var validateChecksumFromResponse = async (response, { config, responseAlgorithms, logger }) => {
	const checksumAlgorithms = getChecksumAlgorithmListForResponse(responseAlgorithms);
	const { body: responseBody, headers: responseHeaders } = response;
	for (const algorithm of checksumAlgorithms) {
		const responseHeader = getChecksumLocationName(algorithm);
		const checksumFromResponse = responseHeaders[responseHeader];
		if (checksumFromResponse) {
			let checksumAlgorithmFn;
			try {
				checksumAlgorithmFn = selectChecksumAlgorithmFunction(algorithm, config);
			} catch (error) {
				if (algorithm === ChecksumAlgorithm.CRC64NVME) {
					logger?.warn(`Skipping ${ChecksumAlgorithm.CRC64NVME} checksum validation: ${error.message}`);
					continue;
				}
				throw error;
			}
			const { base64Encoder } = config;
			if (isStreaming(responseBody)) {
				response.body = (0, import_serde.createChecksumStream)({
					expectedChecksum: checksumFromResponse,
					checksumSourceLocation: responseHeader,
					checksum: new checksumAlgorithmFn(),
					source: responseBody,
					base64Encoder
				});
				return;
			}
			const checksum = await getChecksum(responseBody, {
				checksumAlgorithmFn,
				base64Encoder
			});
			if (checksum === checksumFromResponse) break;
			throw new Error(`Checksum mismatch: expected "${checksum}" but received "${checksumFromResponse}" in response header "${responseHeader}".`);
		}
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/flexibleChecksumsResponseMiddleware.js
var flexibleChecksumsResponseMiddlewareOptions = {
	name: "flexibleChecksumsResponseMiddleware",
	toMiddleware: "deserializerMiddleware",
	relation: "after",
	tags: ["BODY_CHECKSUM"],
	override: true
};
var flexibleChecksumsResponseMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
	if (!import_protocols.HttpRequest.isInstance(args.request)) return next(args);
	const input = args.input;
	const result = await next(args);
	const response = result.response;
	const { requestValidationModeMember, responseAlgorithms } = middlewareConfig;
	if (requestValidationModeMember && input[requestValidationModeMember] === "ENABLED") {
		const { clientName, commandName } = context;
		const customChecksumAlgorithms = Object.keys(config.checksumAlgorithms ?? {}).filter((algorithm) => {
			const responseHeader = getChecksumLocationName(algorithm);
			return response.headers[responseHeader] !== void 0;
		});
		const algoList = getChecksumAlgorithmListForResponse([...responseAlgorithms ?? [], ...customChecksumAlgorithms]);
		if (clientName === "S3Client" && commandName === "GetObjectCommand" && algoList.every((algorithm) => {
			const responseHeader = getChecksumLocationName(algorithm);
			const checksumFromResponse = response.headers[responseHeader];
			return !checksumFromResponse || isChecksumWithPartNumber(checksumFromResponse);
		})) return result;
		await validateChecksumFromResponse(response, {
			config,
			responseAlgorithms: algoList,
			logger: context.logger
		});
	}
	return result;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/getFlexibleChecksumsPlugin.js
var getFlexibleChecksumsPlugin = (config, middlewareConfig) => ({ applyToStack: (clientStack) => {
	clientStack.add(flexibleChecksumsMiddleware(config, middlewareConfig), flexibleChecksumsMiddlewareOptions);
	clientStack.addRelativeTo(flexibleChecksumsInputMiddleware(config, middlewareConfig), flexibleChecksumsInputMiddlewareOptions);
	clientStack.addRelativeTo(flexibleChecksumsResponseMiddleware(config, middlewareConfig), flexibleChecksumsResponseMiddlewareOptions);
} });
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+checksums@3.1000.6/node_modules/@aws-sdk/checksums/dist-es/flexible-checksums/resolveFlexibleChecksumsConfig.js
var import_client = require_client$1();
var resolveFlexibleChecksumsConfig = (input) => {
	const { requestChecksumCalculation, responseChecksumValidation, requestStreamBufferSize } = input;
	return Object.assign(input, {
		requestChecksumCalculation: (0, import_client.normalizeProvider)(requestChecksumCalculation ?? DEFAULT_REQUEST_CHECKSUM_CALCULATION),
		responseChecksumValidation: (0, import_client.normalizeProvider)(responseChecksumValidation ?? DEFAULT_RESPONSE_CHECKSUM_VALIDATION),
		requestStreamBufferSize: Number(requestStreamBufferSize ?? 0),
		checksumAlgorithms: input.checksumAlgorithms ?? {}
	});
};
//#endregion
export { require_client as a, require_protocols as c, require_endpoints as d, require_config as f, require_transport as h, NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS as i, require_event_streams as l, require_schema as m, getFlexibleChecksumsPlugin as n, require_dist_cjs as o, require_client$1 as p, NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS as r, require_retry as s, resolveFlexibleChecksumsConfig as t, require_serde as u };
