import { a as __toCommonJS, i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { a as require_client$1, c as require_protocols, d as require_endpoints, f as require_config, i as NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS, l as require_event_streams, m as require_schema, n as getFlexibleChecksumsPlugin, o as require_dist_cjs, p as require_client, r as NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS, s as require_retry, t as resolveFlexibleChecksumsConfig, u as require_serde } from "./checksums+[...].mjs";
import { _ as streamCollector, c as require_httpAuthSchemes, d as signatureV4aContainer, f as SignatureV4, h as init_dist_es$2, l as init_dist_es$1, o as defaultProvider, s as require_protocols$1, v as NodeHttpHandler } from "./client-dynamodb+[...].mjs";
//#region ../../node_modules/.bun/@aws-sdk+signature-v4-multi-region@3.996.35/node_modules/@aws-sdk/signature-v4-multi-region/dist-es/signature-v4-crt-container.js
var signatureV4CrtContainer;
var init_signature_v4_crt_container = __esmMin((() => {
	signatureV4CrtContainer = { CrtSignerV4: null };
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+signature-v4-multi-region@3.996.35/node_modules/@aws-sdk/signature-v4-multi-region/dist-es/SignatureV4SignWithCredentials.js
function getCredentialsWithoutSessionToken(credentials) {
	return {
		accessKeyId: credentials.accessKeyId,
		secretAccessKey: credentials.secretAccessKey,
		expiration: credentials.expiration
	};
}
function setSingleOverride(privateAccess, credentialsWithoutSessionToken) {
	const currentCredentialProvider = privateAccess.credentialProvider;
	privateAccess.credentialProvider = () => {
		privateAccess.credentialProvider = currentCredentialProvider;
		return Promise.resolve(credentialsWithoutSessionToken);
	};
}
var SESSION_TOKEN_QUERY_PARAM, SESSION_TOKEN_HEADER, SignatureV4SignWithCredentials;
var init_SignatureV4SignWithCredentials = __esmMin((() => {
	init_dist_es$1();
	SESSION_TOKEN_QUERY_PARAM = "X-Amz-S3session-Token";
	SESSION_TOKEN_HEADER = SESSION_TOKEN_QUERY_PARAM.toLowerCase();
	SignatureV4SignWithCredentials = class extends SignatureV4 {
		async signWithCredentials(requestToSign, credentials, options) {
			const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
			requestToSign.headers[SESSION_TOKEN_HEADER] = credentials.sessionToken;
			const privateAccess = this;
			setSingleOverride(privateAccess, credentialsWithoutSessionToken);
			return privateAccess.signRequest(requestToSign, options ?? {});
		}
		async presignWithCredentials(requestToSign, credentials, options) {
			const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
			delete requestToSign.headers[SESSION_TOKEN_HEADER];
			requestToSign.headers[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
			requestToSign.query = requestToSign.query ?? {};
			requestToSign.query[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
			setSingleOverride(this, credentialsWithoutSessionToken);
			return this.presign(requestToSign, options);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+signature-v4-multi-region@3.996.35/node_modules/@aws-sdk/signature-v4-multi-region/dist-es/SignatureV4MultiRegion.js
var SignatureV4MultiRegion;
var init_SignatureV4MultiRegion = __esmMin((() => {
	init_dist_es$1();
	init_signature_v4_crt_container();
	init_SignatureV4SignWithCredentials();
	SignatureV4MultiRegion = class {
		sigv4aSigner;
		sigv4Signer;
		signerOptions;
		static sigv4aDependency() {
			if (typeof signatureV4CrtContainer.CrtSignerV4 === "function") return "crt";
			else if (typeof signatureV4aContainer.SignatureV4a === "function") return "js";
			return "none";
		}
		constructor(options) {
			this.sigv4Signer = new SignatureV4SignWithCredentials(options);
			this.signerOptions = options;
		}
		async sign(requestToSign, options = {}) {
			if (options.signingRegion === "*") return this.getSigv4aSigner().sign(requestToSign, options);
			return this.sigv4Signer.sign(requestToSign, options);
		}
		async signWithCredentials(requestToSign, credentials, options = {}) {
			if (options.signingRegion === "*") {
				const signer = this.getSigv4aSigner();
				const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
				if (CrtSignerV4 && signer instanceof CrtSignerV4) return signer.signWithCredentials(requestToSign, credentials, options);
				else throw new Error("signWithCredentials with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the \"@aws-sdk/signature-v4-crt\" package explicitly. You must also register the package by calling [require(\"@aws-sdk/signature-v4-crt\");] or an ESM equivalent such as [import \"@aws-sdk/signature-v4-crt\";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
			}
			return this.sigv4Signer.signWithCredentials(requestToSign, credentials, options);
		}
		async presign(originalRequest, options = {}) {
			if (options.signingRegion === "*") {
				const signer = this.getSigv4aSigner();
				const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
				if (CrtSignerV4 && signer instanceof CrtSignerV4) return signer.presign(originalRequest, options);
				else throw new Error("presign with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the \"@aws-sdk/signature-v4-crt\" package explicitly. You must also register the package by calling [require(\"@aws-sdk/signature-v4-crt\");] or an ESM equivalent such as [import \"@aws-sdk/signature-v4-crt\";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
			}
			return this.sigv4Signer.presign(originalRequest, options);
		}
		async presignWithCredentials(originalRequest, credentials, options = {}) {
			if (options.signingRegion === "*") throw new Error("Method presignWithCredentials is not supported for [signingRegion=*].");
			return this.sigv4Signer.presignWithCredentials(originalRequest, credentials, options);
		}
		getSigv4aSigner() {
			if (!this.sigv4aSigner) {
				const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
				const JsSigV4aSigner = signatureV4aContainer.SignatureV4a;
				if (this.signerOptions.runtime === "node") {
					if (!CrtSignerV4 && !JsSigV4aSigner) throw new Error("Neither CRT nor JS SigV4a implementation is available. Please load either @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
					if (CrtSignerV4 && typeof CrtSignerV4 === "function") this.sigv4aSigner = new CrtSignerV4({
						...this.signerOptions,
						signingAlgorithm: 1
					});
					else if (JsSigV4aSigner && typeof JsSigV4aSigner === "function") this.sigv4aSigner = new JsSigV4aSigner({ ...this.signerOptions });
					else throw new Error("Available SigV4a implementation is not a valid constructor. Please ensure you've properly imported @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a.For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
				} else {
					if (!JsSigV4aSigner || typeof JsSigV4aSigner !== "function") throw new Error("JS SigV4a implementation is not available or not a valid constructor. Please check whether you have installed the @aws-sdk/signature-v4a package explicitly. The CRT implementation is not available for browsers. You must also register the package by calling [require('@aws-sdk/signature-v4a');] or an ESM equivalent such as [import '@aws-sdk/signature-v4a';]. For more information please go to https://github.com/aws/aws-sdk-js-v3#using-javascript-non-crt-implementation-of-sigv4a");
					this.sigv4aSigner = new JsSigV4aSigner({ ...this.signerOptions });
				}
			}
			return this.sigv4aSigner;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+signature-v4-multi-region@3.996.35/node_modules/@aws-sdk/signature-v4-multi-region/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({
	SignatureV4MultiRegion: () => SignatureV4MultiRegion,
	SignatureV4SignWithCredentials: () => SignatureV4SignWithCredentials,
	signatureV4CrtContainer: () => signatureV4CrtContainer
});
var init_dist_es = __esmMin((() => {
	init_SignatureV4MultiRegion();
	init_signature_v4_crt_container();
	init_SignatureV4SignWithCredentials();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+core@3.974.21/node_modules/@aws-sdk/core/dist-cjs/submodules/util/index.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { buildQueryString } = require_protocols();
	var validate = (str) => typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;
	var parse = (arn) => {
		const segments = arn.split(":");
		if (segments.length < 6 || segments[0] !== "arn") throw new Error("Malformed ARN");
		const [, partition, service, region, accountId, ...resource] = segments;
		return {
			partition,
			service,
			region,
			accountId,
			resource: resource.join(":")
		};
	};
	var build = (arnObject) => {
		const { partition = "aws", service, region, accountId, resource } = arnObject;
		if ([
			service,
			region,
			accountId,
			resource
		].some((segment) => typeof segment !== "string")) throw new Error("Input ARN object is invalid");
		return `arn:${partition}:${service}:${region}:${accountId}:${resource}`;
	};
	function formatUrl(request) {
		const { port, query } = request;
		let { protocol, path, hostname } = request;
		if (protocol && protocol.slice(-1) !== ":") protocol += ":";
		if (port) hostname += `:${port}`;
		if (path && path.charAt(0) !== "/") path = `/${path}`;
		let queryString = query ? buildQueryString(query) : "";
		if (queryString && queryString[0] !== "?") queryString = `?${queryString}`;
		let auth = "";
		if (request.username != null || request.password != null) auth = `${request.username ?? ""}:${request.password ?? ""}@`;
		let fragment = "";
		if (request.fragment) fragment = `#${request.fragment}`;
		return `${protocol}//${auth}${hostname}${path}${queryString}${fragment}`;
	}
	exports.build = build;
	exports.formatUrl = formatUrl;
	exports.parse = parse;
	exports.validate = validate;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+middleware-sdk-s3@3.972.52/node_modules/@aws-sdk/middleware-sdk-s3/dist-cjs/submodules/s3/index.js
var require_s3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { NoOpLogger, getSmithyContext } = require_client();
	var { HttpRequest, HttpResponse } = require_protocols();
	var { parseRfc7231DateTime } = require_serde();
	var { SignatureV4SignWithCredentials } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var { booleanSelector, SelectorType } = require_config();
	var { setFeature } = require_client$1();
	var { httpSigningMiddlewareOptions } = require_dist_cjs();
	var { Readable } = __require("node:stream");
	var { validate, parse } = require_util();
	var { AwsRestXmlProtocol } = require_protocols$1();
	var { NormalizedSchema } = require_schema();
	var CONTENT_LENGTH_HEADER = "content-length";
	var DECODED_CONTENT_LENGTH_HEADER = "x-amz-decoded-content-length";
	function checkContentLengthHeader() {
		return (next, context) => async (args) => {
			const { request } = args;
			if (HttpRequest.isInstance(request)) {
				if (!(CONTENT_LENGTH_HEADER in request.headers) && !(DECODED_CONTENT_LENGTH_HEADER in request.headers)) {
					const message = `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.`;
					if (typeof context?.logger?.warn === "function" && !(context.logger instanceof NoOpLogger)) context.logger.warn(message);
					else console.warn(message);
				}
			}
			return next({ ...args });
		};
	}
	var checkContentLengthHeaderMiddlewareOptions = {
		step: "finalizeRequest",
		tags: ["CHECK_CONTENT_LENGTH_HEADER"],
		name: "getCheckContentLengthHeaderPlugin",
		override: true
	};
	var getCheckContentLengthHeaderPlugin = (unused) => ({ applyToStack: (clientStack) => {
		clientStack.add(checkContentLengthHeader(), checkContentLengthHeaderMiddlewareOptions);
	} });
	var regionRedirectEndpointMiddleware = (config) => {
		return (next, context) => async (args) => {
			const originalRegion = await config.region();
			const regionProviderRef = config.region;
			let unlock = () => {};
			if (context.__s3RegionRedirect) {
				Object.defineProperty(config, "region", {
					writable: false,
					value: async () => {
						return context.__s3RegionRedirect;
					}
				});
				unlock = () => Object.defineProperty(config, "region", {
					writable: true,
					value: regionProviderRef
				});
			}
			try {
				const result = await next(args);
				if (context.__s3RegionRedirect) {
					unlock();
					if (originalRegion !== await config.region()) throw new Error("Region was not restored following S3 region redirect.");
				}
				return result;
			} catch (e) {
				unlock();
				throw e;
			}
		};
	};
	var regionRedirectEndpointMiddlewareOptions = {
		tags: ["REGION_REDIRECT", "S3"],
		name: "regionRedirectEndpointMiddleware",
		override: true,
		relation: "before",
		toMiddleware: "endpointV2Middleware"
	};
	function regionRedirectMiddleware(clientConfig) {
		return (next, context) => async (args) => {
			try {
				return await next(args);
			} catch (err) {
				if (clientConfig.followRegionRedirects) {
					const statusCode = err?.$metadata?.httpStatusCode;
					const isHeadBucket = context.commandName === "HeadBucketCommand";
					const bucketRegionHeader = err?.$response?.headers?.["x-amz-bucket-region"];
					if (bucketRegionHeader) {
						if (statusCode === 301 || statusCode === 400 && (err?.name === "IllegalLocationConstraintException" || isHeadBucket)) {
							try {
								const actualRegion = bucketRegionHeader;
								context.logger?.debug(`Redirecting from ${await clientConfig.region()} to ${actualRegion}`);
								context.__s3RegionRedirect = actualRegion;
							} catch (e) {
								throw new Error("Region redirect failed: " + e);
							}
							return next(args);
						}
					}
				}
				throw err;
			}
		};
	}
	var regionRedirectMiddlewareOptions = {
		step: "initialize",
		tags: ["REGION_REDIRECT", "S3"],
		name: "regionRedirectMiddleware",
		override: true
	};
	var getRegionRedirectMiddlewarePlugin = (clientConfig) => ({ applyToStack: (clientStack) => {
		clientStack.add(regionRedirectMiddleware(clientConfig), regionRedirectMiddlewareOptions);
		clientStack.addRelativeTo(regionRedirectEndpointMiddleware(clientConfig), regionRedirectEndpointMiddlewareOptions);
	} });
	var S3ExpressIdentityCache = class S3ExpressIdentityCache {
		data;
		lastPurgeTime = Date.now();
		static EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS = 3e4;
		constructor(data = {}) {
			this.data = data;
		}
		get(key) {
			const entry = this.data[key];
			if (!entry) return;
			return entry;
		}
		set(key, entry) {
			this.data[key] = entry;
			return entry;
		}
		delete(key) {
			delete this.data[key];
		}
		async purgeExpired() {
			const now = Date.now();
			if (this.lastPurgeTime + S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > now) return;
			for (const key in this.data) {
				const entry = this.data[key];
				if (!entry.isRefreshing) {
					const credential = await entry.identity;
					if (credential.expiration) {
						if (credential.expiration.getTime() < now) delete this.data[key];
					}
				}
			}
		}
	};
	var S3ExpressIdentityCacheEntry = class {
		_identity;
		isRefreshing;
		accessed;
		constructor(_identity, isRefreshing = false, accessed = Date.now()) {
			this._identity = _identity;
			this.isRefreshing = isRefreshing;
			this.accessed = accessed;
		}
		get identity() {
			this.accessed = Date.now();
			return this._identity;
		}
	};
	var S3ExpressIdentityProviderImpl = class S3ExpressIdentityProviderImpl {
		createSessionFn;
		cache;
		static REFRESH_WINDOW_MS = 6e4;
		constructor(createSessionFn, cache = new S3ExpressIdentityCache()) {
			this.createSessionFn = createSessionFn;
			this.cache = cache;
		}
		async getS3ExpressIdentity(awsIdentity, identityProperties) {
			const key = identityProperties.Bucket;
			const { cache } = this;
			const entry = cache.get(key);
			if (entry) return entry.identity.then((identity) => {
				if ((identity.expiration?.getTime() ?? 0) < Date.now()) return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
				if ((identity.expiration?.getTime() ?? 0) < Date.now() + S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS && !entry.isRefreshing) {
					entry.isRefreshing = true;
					this.getIdentity(key).then((id) => {
						cache.set(key, new S3ExpressIdentityCacheEntry(Promise.resolve(id)));
					});
				}
				return identity;
			});
			return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
		}
		async getIdentity(key) {
			await this.cache.purgeExpired().catch((error) => {
				console.warn("Error while clearing expired entries in S3ExpressIdentityCache: \n" + error);
			});
			const session = await this.createSessionFn(key);
			if (!session.Credentials?.AccessKeyId || !session.Credentials?.SecretAccessKey) throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
			return {
				accessKeyId: session.Credentials.AccessKeyId,
				secretAccessKey: session.Credentials.SecretAccessKey,
				sessionToken: session.Credentials.SessionToken,
				expiration: session.Credentials.Expiration ? new Date(session.Credentials.Expiration) : void 0
			};
		}
	};
	var resolveS3Config = (input, { session }) => {
		const [s3ClientProvider, CreateSessionCommandCtor] = session;
		const { forcePathStyle, useAccelerateEndpoint, disableMultiregionAccessPoints, followRegionRedirects, s3ExpressIdentityProvider, bucketEndpoint, expectContinueHeader } = input;
		return Object.assign(input, {
			forcePathStyle: forcePathStyle ?? false,
			useAccelerateEndpoint: useAccelerateEndpoint ?? false,
			disableMultiregionAccessPoints: disableMultiregionAccessPoints ?? false,
			followRegionRedirects: followRegionRedirects ?? false,
			s3ExpressIdentityProvider: s3ExpressIdentityProvider ?? new S3ExpressIdentityProviderImpl(async (key) => s3ClientProvider().send(new CreateSessionCommandCtor({ Bucket: key }))),
			bucketEndpoint: bucketEndpoint ?? false,
			expectContinueHeader: expectContinueHeader ?? 2097152
		});
	};
	var S3_EXPRESS_BUCKET_TYPE = "Directory";
	var S3_EXPRESS_BACKEND = "S3Express";
	var S3_EXPRESS_AUTH_SCHEME = "sigv4-s3express";
	var SESSION_TOKEN_HEADER = "X-Amz-S3session-Token".toLowerCase();
	var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME = "AWS_S3_DISABLE_EXPRESS_SESSION_AUTH";
	var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME = "s3_disable_express_session_auth";
	var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = {
		environmentVariableSelector: (env) => booleanSelector(env, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME, SelectorType.CONFIG),
		default: false
	};
	var s3ExpressMiddleware = (options) => {
		return (next, context) => async (args) => {
			if (context.endpointV2) {
				const endpoint = context.endpointV2;
				const isS3ExpressAuth = endpoint.properties?.authSchemes?.[0]?.name === S3_EXPRESS_AUTH_SCHEME;
				if (endpoint.properties?.backend === S3_EXPRESS_BACKEND || endpoint.properties?.bucketType === S3_EXPRESS_BUCKET_TYPE) {
					setFeature(context, "S3_EXPRESS_BUCKET", "J");
					context.isS3ExpressBucket = true;
				}
				if (isS3ExpressAuth) {
					const requestBucket = args.input.Bucket;
					if (requestBucket) {
						const s3ExpressIdentity = await options.s3ExpressIdentityProvider.getS3ExpressIdentity(await options.credentials(), { Bucket: requestBucket });
						context.s3ExpressIdentity = s3ExpressIdentity;
						if (HttpRequest.isInstance(args.request) && s3ExpressIdentity.sessionToken) args.request.headers[SESSION_TOKEN_HEADER] = s3ExpressIdentity.sessionToken;
					}
				}
			}
			return next(args);
		};
	};
	var s3ExpressMiddlewareOptions = {
		name: "s3ExpressMiddleware",
		step: "build",
		tags: ["S3", "S3_EXPRESS"],
		override: true
	};
	var getS3ExpressPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(s3ExpressMiddleware(options), s3ExpressMiddlewareOptions);
	} });
	var signS3Express = async (s3ExpressIdentity, signingOptions, request, sigV4MultiRegionSigner) => {
		const signedRequest = await sigV4MultiRegionSigner.signWithCredentials(request, s3ExpressIdentity, {});
		if (signedRequest.headers["X-Amz-Security-Token"] || signedRequest.headers["x-amz-security-token"]) throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
		return signedRequest;
	};
	var defaultErrorHandler = (signingProperties) => (error) => {
		throw error;
	};
	var defaultSuccessHandler = (httpResponse, signingProperties) => {};
	var s3ExpressHttpSigningMiddleware = (config) => (next, context) => async (args) => {
		if (!HttpRequest.isInstance(args.request)) return next(args);
		const scheme = getSmithyContext(context).selectedHttpAuthScheme;
		if (!scheme) throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
		const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
		let request;
		if (context.s3ExpressIdentity) request = await signS3Express(context.s3ExpressIdentity, signingProperties, args.request, await config.signer());
		else request = await signer.sign(args.request, identity, signingProperties);
		const output = await next({
			...args,
			request
		}).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
		(signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
		return output;
	};
	var getS3ExpressHttpSigningPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(s3ExpressHttpSigningMiddleware(config), httpSigningMiddlewareOptions);
	} });
	function toStream(bytes) {
		return Readable.from(Buffer.from(bytes));
	}
	var THROW_IF_EMPTY_BODY = {
		CopyObjectCommand: true,
		UploadPartCopyCommand: true,
		CompleteMultipartUploadCommand: true
	};
	var throw200ExceptionsMiddleware = (config) => (next, context) => async (args) => {
		const result = await next(args);
		const { response } = result;
		if (!HttpResponse.isInstance(response)) return result;
		const { statusCode, body } = response;
		if (statusCode < 200 || statusCode >= 300) return result;
		const bodyBytes = await collectBody(body, config);
		response.body = toStream(bodyBytes);
		if (bodyBytes.length === 0 && THROW_IF_EMPTY_BODY[context.commandName]) {
			const err = /* @__PURE__ */ new Error("S3 aborted request");
			err.$metadata = { httpStatusCode: 503 };
			err.name = "InternalError";
			throw err;
		}
		const bodyStringTail = config.utf8Encoder(bodyBytes.subarray(bodyBytes.length - 16));
		if (bodyStringTail && bodyStringTail.endsWith("</Error>")) response.statusCode = 503;
		return result;
	};
	var collectBody = (streamBody = new Uint8Array(), context) => {
		if (streamBody instanceof Uint8Array) return Promise.resolve(streamBody);
		return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
	};
	var throw200ExceptionsMiddlewareOptions = {
		relation: "after",
		toMiddleware: "deserializerMiddleware",
		tags: ["THROW_200_EXCEPTIONS", "S3"],
		name: "throw200ExceptionsMiddleware",
		override: true
	};
	var getThrow200ExceptionsPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
	} });
	function bucketEndpointMiddleware$1(options) {
		return (next, context) => async (args) => {
			if (options.bucketEndpoint) {
				const endpoint = context.endpointV2;
				if (endpoint) {
					const bucket = args.input.Bucket;
					if (typeof bucket === "string") try {
						const bucketEndpointUrl = new URL(bucket);
						context.endpointV2 = {
							...endpoint,
							url: bucketEndpointUrl
						};
					} catch (e) {
						const warning = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${bucket} could not be parsed as URL.`;
						if (context.logger?.constructor?.name === "NoOpLogger") console.warn(warning);
						else context.logger?.warn?.(warning);
						throw e;
					}
				}
			}
			return next(args);
		};
	}
	var bucketEndpointMiddlewareOptions$1 = {
		name: "bucketEndpointMiddleware",
		override: true,
		relation: "after",
		toMiddleware: "endpointV2Middleware"
	};
	function validateBucketNameMiddleware({ bucketEndpoint }) {
		return (next) => async (args) => {
			const { input: { Bucket } } = args;
			if (!bucketEndpoint && typeof Bucket === "string" && !validate(Bucket) && Bucket.indexOf("/") >= 0) {
				const err = /* @__PURE__ */ new Error(`Bucket name shouldn't contain '/', received '${Bucket}'`);
				err.name = "InvalidBucketName";
				throw err;
			}
			return next({ ...args });
		};
	}
	var validateBucketNameMiddlewareOptions = {
		step: "initialize",
		tags: ["VALIDATE_BUCKET_NAME"],
		name: "validateBucketNameMiddleware",
		override: true
	};
	var getValidateBucketNamePlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(validateBucketNameMiddleware(options), validateBucketNameMiddlewareOptions);
		clientStack.addRelativeTo(bucketEndpointMiddleware$1(options), bucketEndpointMiddlewareOptions$1);
	} });
	var S3RestXmlProtocol = class extends AwsRestXmlProtocol {
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const ns = NormalizedSchema.of(operationSchema.input);
			const staticStructureSchema = ns.getSchema();
			let bucketMemberIndex = 0;
			const requiredMemberCount = staticStructureSchema[6] ?? 0;
			if (input && typeof input === "object") for (const [memberName, memberNs] of ns.structIterator()) {
				if (++bucketMemberIndex > requiredMemberCount) break;
				if (memberName === "Bucket") {
					if (!input.Bucket && memberNs.getMergedTraits().httpLabel) throw new Error(`No value provided for input HTTP label: Bucket.`);
					break;
				}
			}
			return request;
		}
	};
	var NODE_USE_ARN_REGION_ENV_NAME = "AWS_S3_USE_ARN_REGION";
	var NODE_USE_ARN_REGION_INI_NAME = "s3_use_arn_region";
	var NODE_USE_ARN_REGION_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => booleanSelector(env, NODE_USE_ARN_REGION_ENV_NAME, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, NODE_USE_ARN_REGION_INI_NAME, SelectorType.CONFIG),
		default: void 0
	};
	function addExpectContinueMiddleware(options) {
		return (next) => async (args) => {
			const { request } = args;
			if (options.expectContinueHeader !== false && HttpRequest.isInstance(request) && request.body && options.runtime === "node" && options.requestHandler?.constructor?.name !== "FetchHttpHandler") {
				let sendHeader = true;
				if (typeof options.expectContinueHeader === "number") try {
					sendHeader = (Number(request.headers?.["content-length"]) ?? options.bodyLengthChecker?.(request.body) ?? Infinity) >= options.expectContinueHeader;
				} catch (e) {}
				else sendHeader = !!options.expectContinueHeader;
				if (sendHeader) request.headers.Expect = "100-continue";
			}
			return next({
				...args,
				request
			});
		};
	}
	var addExpectContinueMiddlewareOptions = {
		step: "build",
		tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
		name: "addExpectContinueMiddleware",
		override: true
	};
	var getAddExpectContinuePlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
	} });
	function ssecMiddleware(options) {
		return (next) => async (args) => {
			const input = { ...args.input };
			for (const prop of [{
				target: "SSECustomerKey",
				hash: "SSECustomerKeyMD5"
			}, {
				target: "CopySourceSSECustomerKey",
				hash: "CopySourceSSECustomerKeyMD5"
			}]) {
				const value = input[prop.target];
				if (value) {
					let valueForHash;
					if (typeof value === "string") if (isValidBase64EncodedSSECustomerKey(value, options)) valueForHash = options.base64Decoder(value);
					else {
						valueForHash = options.utf8Decoder(value);
						input[prop.target] = options.base64Encoder(valueForHash);
					}
					else {
						valueForHash = ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : new Uint8Array(value);
						input[prop.target] = options.base64Encoder(valueForHash);
					}
					const hash = new options.md5();
					hash.update(valueForHash);
					input[prop.hash] = options.base64Encoder(await hash.digest());
				}
			}
			return next({
				...args,
				input
			});
		};
	}
	var ssecMiddlewareOptions = {
		name: "ssecMiddleware",
		step: "initialize",
		tags: ["SSE"],
		override: true
	};
	var getSsecPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
	} });
	function isValidBase64EncodedSSECustomerKey(str, options) {
		if (!/^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str)) return false;
		try {
			return options.base64Decoder(str).length === 32;
		} catch {
			return false;
		}
	}
	exports.NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS;
	exports.NODE_USE_ARN_REGION_CONFIG_OPTIONS = NODE_USE_ARN_REGION_CONFIG_OPTIONS;
	exports.S3RestXmlProtocol = S3RestXmlProtocol;
	exports.getAddExpectContinuePlugin = getAddExpectContinuePlugin;
	exports.getCheckContentLengthHeaderPlugin = getCheckContentLengthHeaderPlugin;
	exports.getRegionRedirectMiddlewarePlugin = getRegionRedirectMiddlewarePlugin;
	exports.getS3ExpressHttpSigningPlugin = getS3ExpressHttpSigningPlugin;
	exports.getS3ExpressPlugin = getS3ExpressPlugin;
	exports.getSsecPlugin = getSsecPlugin;
	exports.getThrow200ExceptionsPlugin = getThrow200ExceptionsPlugin;
	exports.getValidateBucketNamePlugin = getValidateBucketNamePlugin;
	exports.resolveS3Config = resolveS3Config;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/endpoint/bdd.js
var import_schema = require_schema();
var import_client = require_client();
var import_config = require_config();
var import_serde = require_serde();
var import_event_streams = require_event_streams();
var import_protocols = require_protocols();
var import_retry = require_retry();
var import_dist_cjs = require_dist_cjs();
var import_client$1 = require_client$1();
var import_httpAuthSchemes = require_httpAuthSchemes();
init_dist_es();
var import_s3 = require_s3();
var import_endpoints = require_endpoints();
var aw = "ref", ax = "argv", ay = "backend", az = "authSchemes", aA = "disableDoubleEncoding", aB = "signingName", aC = "signingRegion", aD = "signingRegionSet";
var a = -1, b = true, c = false, d = "isSet", e = "booleanEquals", f = "stringEquals", g = "coalesce", h = "substring", i = "", j = "aws.partition", k = "partitionResult", l = "accessPointSuffix", m = "regionPrefix", n = (n) => "outpostId_ssa_" + n + i, o = "hardwareType", p = "ite", q = "isValidHostLabel", s = "sigv4", t = "aws.isVirtualHostableS3Bucket", u = "url", v = "getAttr", w = "bucketArn", x = "--", y = "arnType", z = "accesspoint", A = (n) => "accessPointName_ssa_" + n + i, B = "s3-object-lambda", C = "s3-outposts", D = "bucketPartition", E = "us-east-1", F = "outpostType", G = "name", H = "s3", I = "{url#scheme}://{Bucket}.{url#authority}{url#path}", J = "{url#scheme}://{url#authority}{url#path}", K = "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}", L = "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}", M = "https://{Bucket}.s3.{partitionResult#dnsSuffix}", N = (n) => "{url#scheme}://{accessPointName_ssa_" + n + "}-{bucketArn#accountId}.{url#authority}{url#path}", O = (n) => "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName_ssa_" + n + "}`", P = "sigv4a", Q = "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}", R = "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", S = "https://s3.{partitionResult#dnsSuffix}", T = { [aw]: "UseFIPS" }, U = { [aw]: "UseDualStack" }, V = { [aw]: "Bucket" }, W = {
	"fn": v,
	[ax]: [{ [aw]: k }, G]
}, X = { [aw]: u }, Y = { [aw]: "Region" }, Z = { [aw]: w }, aa = { [aw]: y }, ab = { [aw]: "accessPointName_ssa_1" }, ac = {
	"fn": v,
	[ax]: [Z, "region"]
}, ad = { [aw]: o }, ae = {
	"fn": v,
	[ax]: [Z, "service"]
}, af = {
	"fn": v,
	[ax]: [Z, "accountId"]
}, ag = {
	[ay]: "S3Express",
	[az]: [{
		[aA]: true,
		[G]: "{_s3e_auth}",
		[aB]: "s3express",
		[aC]: "{Region}"
	}]
}, ah = {
	[ay]: "S3Express",
	[az]: [{
		[aA]: true,
		[G]: s,
		[aB]: "s3express",
		[aC]: "{Region}"
	}]
}, ai = { [az]: [{
	[aA]: true,
	[G]: P,
	[aB]: C,
	[aD]: ["*"]
}, {
	[aA]: true,
	[G]: s,
	[aB]: C,
	[aC]: "{Region}"
}] }, aj = { [az]: [{
	[aA]: true,
	[G]: s,
	[aB]: H,
	[aC]: E
}] }, ak = { [az]: [{
	[aA]: true,
	[G]: s,
	[aB]: H,
	[aC]: "{Region}"
}] }, al = { [az]: [{
	[aA]: true,
	[G]: s,
	[aB]: B,
	[aC]: "{bucketArn#region}"
}] }, am = { [az]: [{
	[aA]: true,
	[G]: s,
	[aB]: H,
	[aC]: "{bucketArn#region}"
}] }, an = { [az]: [{
	[aA]: true,
	[G]: P,
	[aB]: C,
	[aD]: ["*"]
}, {
	[aA]: true,
	[G]: s,
	[aB]: C,
	[aC]: "{bucketArn#region}"
}] }, ao = { [az]: [{
	[aA]: true,
	[G]: s,
	[aB]: B,
	[aC]: "{Region}"
}] }, ap = [Y], aq = [{ [aw]: "Endpoint" }], as = [V], at = [
	V,
	0,
	7,
	true
], au = [Z, "resourceId[1]"], av = ["*"];
var _data = {
	conditions: [
		[d, ap],
		[e, [{ [aw]: "Accelerate" }, b]],
		[e, [T, b]],
		[e, [U, b]],
		[d, aq],
		[d, as],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					0,
					6,
					b
				]
			}, i]
		}, "--x-s3"]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: at
			}, i]
		}, "--xa-s3"]],
		[
			j,
			ap,
			k
		],
		[
			h,
			at,
			l
		],
		[f, [{ [aw]: l }, "--op-s3"]],
		[
			h,
			[
				V,
				8,
				12,
				b
			],
			m
		],
		[
			h,
			[
				V,
				32,
				49,
				b
			],
			n(2)
		],
		[
			h,
			[
				V,
				49,
				50,
				b
			],
			o
		],
		[e, [{ [aw]: "ForcePathStyle" }, b]],
		[f, [W, "aws-cn"]],
		[
			p,
			[
				U,
				".dualstack",
				i
			],
			"_s3e_ds"
		],
		[q, [{ [aw]: n(2) }, c]],
		[
			p,
			[
				T,
				"-fips",
				i
			],
			"_s3e_fips"
		],
		[
			p,
			[
				{
					fn: g,
					[ax]: [{ [aw]: "DisableS3ExpressSessionAuth" }, c]
				},
				s,
				"sigv4-s3express"
			],
			"_s3e_auth"
		],
		[t, [V, c]],
		[
			"parseURL",
			aq,
			u
		],
		[e, [{
			fn: g,
			[ax]: [{ [aw]: "UseS3ExpressControlEndpoint" }, c]
		}, b]],
		[t, [V, b]],
		[f, [{
			fn: v,
			[ax]: [X, "scheme"]
		}, "http"]],
		[q, [Y, c]],
		[
			"aws.parseArn",
			as,
			w
		],
		[
			v,
			[{
				fn: "split",
				[ax]: [
					V,
					x,
					0
				]
			}, "[-2]"],
			"s3expressAvailabilityZoneId"
		],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					0,
					4,
					c
				]
			}, i]
		}, "arn:"]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					16,
					18,
					b
				]
			}, i]
		}, x]],
		[e, [{
			fn: v,
			[ax]: [X, "isIp"]
		}, b]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					21,
					23,
					b
				]
			}, i]
		}, x]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					27,
					29,
					b
				]
			}, i]
		}, x]],
		[f, [{ [aw]: m }, "beta"]],
		[
			"uriEncode",
			as,
			"uri_encoded_bucket"
		],
		[q, [Y, b]],
		[e, [{
			fn: g,
			[ax]: [{ [aw]: "UseObjectLambdaEndpoint" }, c]
		}, b]],
		[
			v,
			[Z, "resourceId[0]"],
			y
		],
		[f, [aa, i]],
		[f, [aa, z]],
		[
			v,
			au,
			A(1)
		],
		[f, [ab, i]],
		[f, [ac, i]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					14,
					16,
					b
				]
			}, i]
		}, x]],
		[f, [ad, "e"]],
		[f, [ad, "o"]],
		[f, [Y, "aws-global"]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					19,
					21,
					b
				]
			}, i]
		}, x]],
		[f, [ae, B]],
		[e, [{
			fn: g,
			[ax]: [{ [aw]: "DisableAccessPoints" }, c]
		}, b]],
		[f, [ae, C]],
		[
			j,
			[ac],
			D
		],
		[q, [ab, b]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					26,
					28,
					b
				]
			}, i]
		}, x]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					15,
					17,
					b
				]
			}, i]
		}, x]],
		[v, [Z, "resourceId[4]"]],
		[f, [{
			fn: g,
			[ax]: [{
				fn: h,
				[ax]: [
					V,
					20,
					22,
					b
				]
			}, i]
		}, x]],
		[e, [{ [aw]: "UseGlobalEndpoint" }, b]],
		[f, [Y, E]],
		[
			v,
			au,
			n(1)
		],
		[e, [{
			fn: g,
			[ax]: [{ [aw]: "UseArnRegion" }, b]
		}, b]],
		[q, [{ [aw]: n(1) }, c]],
		[
			v,
			[Z, "resourceId[2]"],
			F
		],
		[f, [Y, ac]],
		[f, [{
			fn: v,
			[ax]: [{ [aw]: D }, G]
		}, W]],
		[e, [{ [aw]: "DisableMultiRegionAccessPoints" }, b]],
		[q, [ac, b]],
		[f, [{
			fn: v,
			[ax]: [Z, "partition"]
		}, W]],
		[f, [af, i]],
		[f, [ae, H]],
		[q, [af, c]],
		[
			v,
			[Z, "resourceId[3]"],
			A(2)
		],
		[q, [ab, c]],
		[f, [{ [aw]: F }, z]],
		[q, [{ [aw]: A(2) }, c]]
	],
	results: [
		[a],
		[a, "Accelerate cannot be used with FIPS"],
		[a, "Cannot set dual-stack in combination with a custom endpoint."],
		[a, "A custom endpoint cannot be combined with FIPS"],
		[a, "A custom endpoint cannot be combined with S3 Accelerate"],
		[a, "Partition does not support FIPS"],
		[a, "S3Express does not support S3 Accelerate."],
		["{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}", ag],
		[I, ag],
		[a, "S3Express bucket name is not a valid virtual hostable name."],
		["https://s3express-control{_s3e_fips}{_s3e_ds}.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ah],
		["https://{Bucket}.s3express{_s3e_fips}-{s3expressAvailabilityZoneId}{_s3e_ds}.{Region}.{partitionResult#dnsSuffix}", ag],
		[a, "Unrecognized S3Express bucket name format."],
		[J, ag],
		["https://s3express-control{_s3e_fips}{_s3e_ds}.{Region}.{partitionResult#dnsSuffix}", ah],
		[a, "Expected a endpoint to be specified but no endpoint was found"],
		["https://{Bucket}.ec2.{url#authority}", ai],
		["https://{Bucket}.ec2.s3-outposts.{Region}.{partitionResult#dnsSuffix}", ai],
		["https://{Bucket}.op-{outpostId_ssa_2}.{url#authority}", ai],
		["https://{Bucket}.op-{outpostId_ssa_2}.s3-outposts.{Region}.{partitionResult#dnsSuffix}", ai],
		[a, "Unrecognized hardware type: \"Expected hardware type o or e but got {hardwareType}\""],
		[a, "Invalid Outposts Bucket alias - it must be a valid bucket name."],
		[a, "Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`."],
		[a, "Custom endpoint `{Endpoint}` was not a valid URI"],
		[a, "S3 Accelerate cannot be used in this region"],
		["https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
		["https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}", ak],
		["https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}", ak],
		["https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
		[K, aj],
		[I, aj],
		[K, ak],
		[I, ak],
		[L, aj],
		[L, ak],
		[M, aj],
		[M, ak],
		["https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}", ak],
		[a, "Invalid region: region was not a valid DNS name."],
		[a, "S3 Object Lambda does not support Dual-stack"],
		[a, "S3 Object Lambda does not support S3 Accelerate"],
		[a, "Access points are not supported for this operation"],
		[a, "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`"],
		[a, "Invalid ARN: Missing account id"],
		[N(1), al],
		["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", al],
		["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}", al],
		[a, O(1)],
		[a, "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`"],
		[a, "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)"],
		[a, "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`"],
		[a, "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`."],
		[a, "Invalid ARN: bucket ARN is missing a region"],
		[a, "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided"],
		[a, "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`"],
		[a, "Access Points do not support S3 Accelerate"],
		["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
		["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
		["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
		[N(1), am],
		["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
		[a, "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}"],
		[a, "S3 MRAP does not support dual-stack"],
		[a, "S3 MRAP does not support FIPS"],
		[a, "S3 MRAP does not support S3 Accelerate"],
		[a, "Invalid configuration: Multi-Region Access Point ARNs are disabled."],
		["https://{accessPointName_ssa_1}.accesspoint.s3-global.{partitionResult#dnsSuffix}", { [az]: [{
			[aA]: b,
			name: P,
			[aB]: H,
			[aD]: av
		}] }],
		[a, "Client was configured for partition `{partitionResult#name}` but bucket referred to partition `{bucketArn#partition}`"],
		[a, "Invalid Access Point Name"],
		[a, "S3 Outposts does not support Dual-stack"],
		[a, "S3 Outposts does not support FIPS"],
		[a, "S3 Outposts does not support S3 Accelerate"],
		[a, "Invalid Arn: Outpost Access Point ARN contains sub resources"],
		["https://{accessPointName_ssa_2}-{bucketArn#accountId}.{outpostId_ssa_1}.{url#authority}", an],
		["https://{accessPointName_ssa_2}-{bucketArn#accountId}.{outpostId_ssa_1}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}", an],
		[a, O(2)],
		[a, "Expected an outpost type `accesspoint`, found {outpostType}"],
		[a, "Invalid ARN: expected an access point name"],
		[a, "Invalid ARN: Expected a 4-component resource"],
		[a, "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId_ssa_1}`"],
		[a, "Invalid ARN: The Outpost Id was not set"],
		[a, "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})"],
		[a, "Invalid ARN: No ARN type specified"],
		[a, "Invalid ARN: `{Bucket}` was not a valid ARN"],
		[a, "Path-style addressing cannot be used with ARN buckets"],
		["https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", aj],
		["https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
		["https://s3-fips.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", aj],
		["https://s3-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
		["https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", aj],
		["https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
		[Q, aj],
		[Q, ak],
		[R, aj],
		[R, ak],
		["https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
		[a, "Path-style addressing cannot be used with S3 Accelerate"],
		[J, ao],
		["https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}", ao],
		["https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}", ao],
		["https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
		["https://s3-fips.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://s3-fips.{Region}.{partitionResult#dnsSuffix}", ak],
		["https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
		["https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
		[J, aj],
		[J, ak],
		[S, aj],
		[S, ak],
		["https://s3.{Region}.{partitionResult#dnsSuffix}", ak],
		[a, "A region must be set when sending requests to S3."]
	]
};
var root = 2;
var nodes = new Int32Array([
	-1,
	1,
	-1,
	0,
	3,
	100000115,
	1,
	424,
	4,
	2,
	272,
	5,
	3,
	233,
	6,
	4,
	85,
	7,
	5,
	15,
	8,
	8,
	9,
	100000115,
	16,
	10,
	13,
	18,
	11,
	13,
	19,
	12,
	13,
	22,
	100000014,
	13,
	35,
	14,
	100000042,
	36,
	100000103,
	435,
	6,
	271,
	16,
	7,
	270,
	17,
	8,
	19,
	18,
	14,
	501,
	106,
	9,
	20,
	24,
	10,
	21,
	24,
	11,
	22,
	24,
	12,
	23,
	24,
	13,
	547,
	24,
	14,
	77,
	25,
	20,
	73,
	26,
	26,
	27,
	78,
	37,
	28,
	100000086,
	38,
	100000086,
	29,
	39,
	47,
	30,
	48,
	100000058,
	31,
	50,
	32,
	100000085,
	51,
	33,
	136,
	55,
	100000076,
	34,
	59,
	35,
	100000084,
	60,
	39,
	36,
	61,
	37,
	100000083,
	62,
	38,
	146,
	63,
	41,
	100000046,
	61,
	40,
	100000083,
	62,
	41,
	150,
	64,
	42,
	100000054,
	66,
	43,
	100000053,
	70,
	44,
	100000052,
	71,
	45,
	100000081,
	73,
	46,
	100000080,
	74,
	100000078,
	100000079,
	40,
	48,
	100000057,
	41,
	100000057,
	49,
	42,
	185,
	50,
	48,
	62,
	51,
	49,
	100000045,
	52,
	51,
	53,
	526,
	60,
	56,
	54,
	62,
	100000055,
	55,
	63,
	57,
	100000046,
	62,
	100000055,
	57,
	64,
	58,
	100000054,
	66,
	59,
	100000053,
	69,
	60,
	100000065,
	70,
	61,
	100000052,
	72,
	100000064,
	100000051,
	49,
	100000045,
	63,
	51,
	64,
	526,
	60,
	67,
	65,
	62,
	100000055,
	66,
	63,
	68,
	100000046,
	62,
	100000055,
	68,
	64,
	69,
	100000054,
	66,
	70,
	100000053,
	68,
	100000047,
	71,
	70,
	72,
	100000052,
	72,
	100000050,
	100000051,
	25,
	74,
	100000042,
	46,
	100000039,
	75,
	57,
	76,
	100000041,
	58,
	100000040,
	100000041,
	26,
	100000088,
	78,
	28,
	100000087,
	79,
	34,
	82,
	80,
	35,
	81,
	545,
	36,
	100000103,
	100000115,
	46,
	100000097,
	83,
	57,
	84,
	100000099,
	58,
	100000098,
	100000099,
	5,
	101,
	86,
	8,
	87,
	100000115,
	16,
	88,
	89,
	18,
	91,
	89,
	19,
	90,
	92,
	21,
	97,
	95,
	19,
	93,
	92,
	21,
	98,
	95,
	21,
	97,
	94,
	22,
	100000014,
	95,
	35,
	96,
	100000042,
	36,
	100000103,
	100000042,
	22,
	100000013,
	98,
	35,
	99,
	100000042,
	36,
	100000101,
	100,
	46,
	100000110,
	100000111,
	6,
	214,
	102,
	7,
	208,
	103,
	8,
	119,
	104,
	14,
	118,
	105,
	21,
	106,
	100000023,
	26,
	107,
	502,
	37,
	108,
	100000086,
	38,
	100000086,
	109,
	39,
	112,
	110,
	48,
	100000058,
	111,
	50,
	136,
	100000085,
	40,
	113,
	100000057,
	41,
	100000057,
	114,
	42,
	115,
	500,
	48,
	100000056,
	116,
	52,
	117,
	100000072,
	65,
	100000069,
	100000072,
	21,
	501,
	100000023,
	9,
	120,
	124,
	10,
	121,
	124,
	11,
	122,
	124,
	12,
	123,
	124,
	13,
	202,
	124,
	14,
	195,
	125,
	20,
	190,
	126,
	21,
	127,
	100000023,
	23,
	128,
	129,
	24,
	189,
	129,
	26,
	130,
	197,
	37,
	131,
	100000086,
	38,
	100000086,
	132,
	39,
	159,
	133,
	48,
	100000058,
	134,
	50,
	135,
	100000085,
	51,
	141,
	136,
	55,
	100000076,
	137,
	59,
	138,
	100000084,
	60,
	100000083,
	139,
	61,
	140,
	100000083,
	63,
	100000083,
	100000046,
	55,
	100000076,
	142,
	59,
	143,
	100000084,
	60,
	148,
	144,
	61,
	145,
	100000083,
	62,
	147,
	146,
	63,
	150,
	100000046,
	63,
	153,
	100000046,
	61,
	149,
	100000083,
	62,
	153,
	150,
	64,
	151,
	100000054,
	66,
	152,
	100000053,
	70,
	100000082,
	100000052,
	64,
	154,
	100000054,
	66,
	155,
	100000053,
	70,
	156,
	100000052,
	71,
	157,
	100000081,
	73,
	158,
	100000080,
	74,
	100000077,
	100000079,
	40,
	160,
	100000057,
	41,
	100000057,
	161,
	42,
	185,
	162,
	48,
	174,
	163,
	49,
	100000045,
	164,
	51,
	165,
	526,
	60,
	168,
	166,
	62,
	100000055,
	167,
	63,
	169,
	100000046,
	62,
	100000055,
	169,
	64,
	170,
	100000054,
	66,
	171,
	100000053,
	69,
	172,
	100000065,
	70,
	173,
	100000052,
	72,
	100000063,
	100000051,
	49,
	100000045,
	175,
	51,
	176,
	526,
	60,
	179,
	177,
	62,
	100000055,
	178,
	63,
	180,
	100000046,
	62,
	100000055,
	180,
	64,
	181,
	100000054,
	66,
	182,
	100000053,
	68,
	100000047,
	183,
	70,
	184,
	100000052,
	72,
	100000048,
	100000051,
	48,
	100000056,
	186,
	52,
	187,
	100000072,
	65,
	100000069,
	188,
	67,
	100000070,
	100000071,
	25,
	100000036,
	100000042,
	21,
	191,
	100000023,
	25,
	192,
	100000042,
	30,
	194,
	193,
	46,
	100000034,
	100000036,
	46,
	100000033,
	100000035,
	21,
	196,
	100000023,
	26,
	100000088,
	197,
	28,
	100000087,
	198,
	34,
	201,
	199,
	35,
	200,
	545,
	36,
	100000101,
	100000115,
	46,
	100000095,
	100000096,
	17,
	203,
	100000022,
	20,
	204,
	100000021,
	21,
	205,
	550,
	33,
	206,
	550,
	44,
	100000016,
	207,
	45,
	100000018,
	100000020,
	8,
	209,
	215,
	16,
	210,
	220,
	18,
	211,
	220,
	19,
	212,
	224,
	20,
	213,
	227,
	21,
	231,
	401,
	8,
	218,
	215,
	19,
	216,
	100000009,
	20,
	217,
	227,
	21,
	231,
	100000009,
	16,
	219,
	220,
	18,
	223,
	220,
	19,
	221,
	224,
	20,
	222,
	227,
	21,
	231,
	100000012,
	19,
	226,
	224,
	20,
	225,
	100000009,
	21,
	100000009,
	100000012,
	20,
	230,
	227,
	21,
	228,
	100000009,
	30,
	229,
	100000009,
	34,
	100000007,
	100000009,
	21,
	231,
	415,
	30,
	232,
	100000008,
	34,
	100000007,
	100000008,
	4,
	100000002,
	234,
	5,
	235,
	480,
	6,
	271,
	236,
	7,
	270,
	237,
	8,
	238,
	491,
	9,
	239,
	243,
	10,
	240,
	243,
	11,
	241,
	243,
	12,
	242,
	243,
	13,
	547,
	243,
	14,
	266,
	244,
	20,
	264,
	245,
	26,
	246,
	267,
	37,
	247,
	100000086,
	38,
	100000086,
	248,
	39,
	249,
	518,
	40,
	250,
	100000057,
	41,
	100000057,
	251,
	42,
	538,
	252,
	48,
	100000043,
	253,
	49,
	100000045,
	254,
	51,
	255,
	526,
	60,
	258,
	256,
	62,
	100000055,
	257,
	63,
	259,
	100000046,
	62,
	100000055,
	259,
	64,
	260,
	100000054,
	66,
	261,
	100000053,
	69,
	262,
	100000065,
	70,
	263,
	100000052,
	72,
	100000062,
	100000051,
	25,
	265,
	100000042,
	46,
	100000031,
	100000032,
	26,
	100000088,
	267,
	28,
	100000087,
	268,
	34,
	269,
	544,
	46,
	100000093,
	100000094,
	8,
	397,
	100000009,
	8,
	407,
	100000009,
	3,
	346,
	273,
	4,
	100000003,
	274,
	5,
	284,
	275,
	8,
	276,
	100000115,
	15,
	100000005,
	277,
	16,
	278,
	281,
	18,
	279,
	281,
	19,
	280,
	281,
	22,
	100000014,
	281,
	35,
	282,
	100000042,
	36,
	100000102,
	283,
	46,
	100000106,
	100000107,
	6,
	405,
	285,
	7,
	395,
	286,
	8,
	295,
	287,
	14,
	501,
	288,
	26,
	289,
	502,
	37,
	290,
	100000086,
	38,
	100000086,
	291,
	39,
	292,
	307,
	40,
	293,
	100000057,
	41,
	100000057,
	294,
	42,
	335,
	500,
	9,
	296,
	300,
	10,
	297,
	300,
	11,
	298,
	300,
	12,
	299,
	300,
	13,
	394,
	300,
	14,
	339,
	301,
	15,
	100000005,
	302,
	20,
	337,
	303,
	26,
	304,
	341,
	37,
	305,
	100000086,
	38,
	100000086,
	306,
	39,
	309,
	307,
	48,
	100000058,
	308,
	50,
	100000074,
	100000085,
	40,
	310,
	100000057,
	41,
	100000057,
	311,
	42,
	335,
	312,
	48,
	324,
	313,
	49,
	100000045,
	314,
	51,
	315,
	526,
	60,
	318,
	316,
	62,
	100000055,
	317,
	63,
	319,
	100000046,
	62,
	100000055,
	319,
	64,
	320,
	100000054,
	66,
	321,
	100000053,
	69,
	322,
	100000065,
	70,
	323,
	100000052,
	72,
	100000061,
	100000051,
	49,
	100000045,
	325,
	51,
	326,
	526,
	60,
	329,
	327,
	62,
	100000055,
	328,
	63,
	330,
	100000046,
	62,
	100000055,
	330,
	64,
	331,
	100000054,
	66,
	332,
	100000053,
	68,
	100000047,
	333,
	70,
	334,
	100000052,
	72,
	100000049,
	100000051,
	48,
	100000056,
	336,
	52,
	100000067,
	100000072,
	25,
	338,
	100000042,
	46,
	100000027,
	100000028,
	15,
	100000005,
	340,
	26,
	100000088,
	341,
	28,
	100000087,
	342,
	34,
	345,
	343,
	35,
	344,
	545,
	36,
	100000102,
	100000115,
	46,
	100000091,
	100000092,
	4,
	100000002,
	347,
	5,
	357,
	348,
	8,
	349,
	100000115,
	15,
	100000005,
	350,
	16,
	351,
	354,
	18,
	352,
	354,
	19,
	353,
	354,
	22,
	100000014,
	354,
	35,
	355,
	100000042,
	36,
	100000043,
	356,
	46,
	100000104,
	100000105,
	6,
	405,
	358,
	7,
	395,
	359,
	8,
	360,
	491,
	9,
	361,
	365,
	10,
	362,
	365,
	11,
	363,
	365,
	12,
	364,
	365,
	13,
	394,
	365,
	14,
	389,
	366,
	15,
	100000005,
	367,
	20,
	387,
	368,
	26,
	369,
	391,
	37,
	370,
	100000086,
	38,
	100000086,
	371,
	39,
	372,
	518,
	40,
	373,
	100000057,
	41,
	100000057,
	374,
	42,
	538,
	375,
	48,
	100000043,
	376,
	49,
	100000045,
	377,
	51,
	378,
	526,
	60,
	381,
	379,
	62,
	100000055,
	380,
	63,
	382,
	100000046,
	62,
	100000055,
	382,
	64,
	383,
	100000054,
	66,
	384,
	100000053,
	69,
	385,
	100000065,
	70,
	386,
	100000052,
	72,
	100000060,
	100000051,
	25,
	388,
	100000042,
	46,
	100000025,
	100000026,
	15,
	100000005,
	390,
	26,
	100000088,
	391,
	28,
	100000087,
	392,
	34,
	393,
	544,
	46,
	100000089,
	100000090,
	15,
	100000005,
	547,
	8,
	396,
	100000009,
	15,
	100000005,
	397,
	16,
	398,
	410,
	18,
	399,
	410,
	19,
	400,
	410,
	20,
	401,
	100000009,
	27,
	402,
	100000012,
	29,
	100000011,
	403,
	31,
	100000011,
	404,
	32,
	100000011,
	422,
	8,
	406,
	100000009,
	15,
	100000005,
	407,
	16,
	408,
	410,
	18,
	409,
	410,
	19,
	411,
	410,
	20,
	100000012,
	100000009,
	20,
	414,
	412,
	22,
	413,
	100000009,
	34,
	100000010,
	100000009,
	22,
	416,
	415,
	27,
	419,
	100000012,
	27,
	418,
	417,
	34,
	100000010,
	100000012,
	34,
	100000010,
	419,
	43,
	100000011,
	420,
	47,
	100000011,
	421,
	53,
	100000011,
	422,
	54,
	100000011,
	423,
	56,
	100000011,
	100000012,
	2,
	100000001,
	425,
	3,
	478,
	426,
	4,
	100000004,
	427,
	5,
	438,
	428,
	8,
	429,
	100000115,
	16,
	430,
	433,
	18,
	431,
	433,
	19,
	432,
	433,
	22,
	100000014,
	433,
	35,
	434,
	100000042,
	36,
	100000044,
	435,
	46,
	100000112,
	436,
	57,
	437,
	100000114,
	58,
	100000113,
	100000114,
	6,
	100000006,
	439,
	7,
	100000006,
	440,
	8,
	450,
	441,
	14,
	501,
	442,
	26,
	443,
	502,
	37,
	444,
	100000086,
	38,
	100000086,
	445,
	39,
	446,
	465,
	40,
	447,
	100000057,
	41,
	100000057,
	448,
	42,
	471,
	449,
	48,
	100000044,
	500,
	9,
	451,
	455,
	10,
	452,
	455,
	11,
	453,
	455,
	12,
	454,
	455,
	13,
	547,
	455,
	14,
	473,
	456,
	15,
	460,
	457,
	20,
	458,
	461,
	25,
	459,
	100000042,
	46,
	100000037,
	100000038,
	20,
	540,
	461,
	26,
	462,
	474,
	37,
	463,
	100000086,
	38,
	100000086,
	464,
	39,
	467,
	465,
	48,
	100000058,
	466,
	50,
	100000075,
	100000085,
	40,
	468,
	100000057,
	41,
	100000057,
	469,
	42,
	471,
	470,
	48,
	100000044,
	524,
	48,
	100000044,
	472,
	52,
	100000068,
	100000072,
	26,
	100000088,
	474,
	28,
	100000087,
	475,
	34,
	100000100,
	476,
	35,
	477,
	545,
	36,
	100000044,
	100000115,
	4,
	100000002,
	479,
	5,
	488,
	480,
	8,
	481,
	100000115,
	16,
	482,
	485,
	18,
	483,
	485,
	19,
	484,
	485,
	22,
	100000014,
	485,
	35,
	486,
	100000042,
	36,
	100000043,
	487,
	46,
	100000108,
	100000109,
	6,
	100000006,
	489,
	7,
	100000006,
	490,
	8,
	503,
	491,
	14,
	501,
	492,
	26,
	493,
	502,
	37,
	494,
	100000086,
	38,
	100000086,
	495,
	39,
	496,
	518,
	40,
	497,
	100000057,
	41,
	100000057,
	498,
	42,
	538,
	499,
	48,
	100000043,
	500,
	49,
	100000045,
	526,
	26,
	100000088,
	502,
	28,
	100000087,
	100000115,
	9,
	504,
	508,
	10,
	505,
	508,
	11,
	506,
	508,
	12,
	507,
	508,
	13,
	547,
	508,
	14,
	541,
	509,
	15,
	513,
	510,
	20,
	511,
	514,
	25,
	512,
	100000042,
	46,
	100000029,
	100000030,
	20,
	540,
	514,
	26,
	515,
	542,
	37,
	516,
	100000086,
	38,
	100000086,
	517,
	39,
	520,
	518,
	48,
	100000058,
	519,
	50,
	100000073,
	100000085,
	40,
	521,
	100000057,
	41,
	100000057,
	522,
	42,
	538,
	523,
	48,
	100000043,
	524,
	49,
	100000045,
	525,
	51,
	529,
	526,
	60,
	100000055,
	527,
	62,
	100000055,
	528,
	63,
	100000055,
	100000046,
	60,
	532,
	530,
	62,
	100000055,
	531,
	63,
	533,
	100000046,
	62,
	100000055,
	533,
	64,
	534,
	100000054,
	66,
	535,
	100000053,
	69,
	536,
	100000065,
	70,
	537,
	100000052,
	72,
	100000059,
	100000051,
	48,
	100000043,
	539,
	52,
	100000066,
	100000072,
	25,
	100000024,
	100000042,
	26,
	100000088,
	542,
	28,
	100000087,
	543,
	34,
	100000100,
	544,
	35,
	546,
	545,
	36,
	100000042,
	100000115,
	36,
	100000043,
	100000115,
	17,
	548,
	100000022,
	20,
	549,
	100000021,
	33,
	552,
	550,
	44,
	100000017,
	551,
	45,
	100000019,
	100000020,
	44,
	100000015,
	553,
	45,
	100000015,
	100000020
]);
var bdd = import_endpoints.BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/endpoint/endpointResolver.js
var cache = new import_endpoints.EndpointCache({
	size: 50,
	params: [
		"Accelerate",
		"Bucket",
		"DisableAccessPoints",
		"DisableMultiRegionAccessPoints",
		"DisableS3ExpressSessionAuth",
		"Endpoint",
		"ForcePathStyle",
		"Region",
		"UseArnRegion",
		"UseDualStack",
		"UseFIPS",
		"UseGlobalEndpoint",
		"UseObjectLambdaEndpoint",
		"UseS3ExpressControlEndpoint"
	]
});
var defaultEndpointResolver = (endpointParams, context = {}) => {
	return cache.get(endpointParams, () => (0, import_endpoints.decideEndpoint)(bdd, {
		endpointParams,
		logger: context.logger
	}));
};
import_endpoints.customEndpointFunctions.aws = import_client$1.awsEndpointFunctions;
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthSchemeProvider.js
var createEndpointRuleSetHttpAuthSchemeParametersProvider = (defaultHttpAuthSchemeParametersProvider) => async (config, context, input) => {
	if (!input) throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
	const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
	const instructionsFn = (0, import_client.getSmithyContext)(context)?.commandInstance?.constructor?.getEndpointParameterInstructions;
	if (!instructionsFn) throw new Error(`getEndpointParameterInstructions() is not defined on '${context.commandName}'`);
	const endpointParameters = await (0, import_endpoints.resolveParams)(input, { getEndpointParameterInstructions: instructionsFn }, config);
	return Object.assign(defaultParameters, endpointParameters);
};
var _defaultS3HttpAuthSchemeParametersProvider = async (config, context, input) => {
	return {
		operation: (0, import_client.getSmithyContext)(context).operation,
		region: await (0, import_client.normalizeProvider)(config.region)() || (() => {
			throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
		})()
	};
};
var defaultS3HttpAuthSchemeParametersProvider = createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultS3HttpAuthSchemeParametersProvider);
function createAwsAuthSigv4HttpAuthOption(authParameters) {
	return {
		schemeId: "aws.auth#sigv4",
		signingProperties: {
			name: "s3",
			region: authParameters.region
		},
		propertiesExtractor: (config, context) => ({ signingProperties: {
			config,
			context
		} })
	};
}
function createAwsAuthSigv4aHttpAuthOption(authParameters) {
	return {
		schemeId: "aws.auth#sigv4a",
		signingProperties: {
			name: "s3",
			region: authParameters.region
		},
		propertiesExtractor: (config, context) => ({ signingProperties: {
			config,
			context
		} })
	};
}
var createEndpointRuleSetHttpAuthSchemeProvider = (defaultEndpointResolver, defaultHttpAuthSchemeResolver, createHttpAuthOptionFunctions) => {
	const endpointRuleSetHttpAuthSchemeProvider = (authParameters) => {
		const authSchemes = defaultEndpointResolver(authParameters).properties?.authSchemes;
		if (!authSchemes) return defaultHttpAuthSchemeResolver(authParameters);
		const options = [];
		for (const scheme of authSchemes) {
			const { name: resolvedName, properties = {}, ...rest } = scheme;
			const name = resolvedName.toLowerCase();
			if (resolvedName !== name) console.warn(`HttpAuthScheme has been normalized with lowercasing: '${resolvedName}' to '${name}'`);
			let schemeId;
			if (name === "sigv4a") {
				schemeId = "aws.auth#sigv4a";
				const sigv4Present = authSchemes.find((s) => {
					const name = s.name.toLowerCase();
					return name !== "sigv4a" && name.startsWith("sigv4");
				});
				if (SignatureV4MultiRegion.sigv4aDependency() === "none" && sigv4Present) continue;
			} else if (name.startsWith("sigv4")) schemeId = "aws.auth#sigv4";
			else throw new Error(`Unknown HttpAuthScheme found in '@smithy.rules#endpointRuleSet': '${name}'`);
			const createOption = createHttpAuthOptionFunctions[schemeId];
			if (!createOption) throw new Error(`Could not find HttpAuthOption create function for '${schemeId}'`);
			const option = createOption(authParameters);
			option.schemeId = schemeId;
			option.signingProperties = {
				...option.signingProperties || {},
				...rest,
				...properties
			};
			options.push(option);
		}
		return options;
	};
	return endpointRuleSetHttpAuthSchemeProvider;
};
var _defaultS3HttpAuthSchemeProvider = (authParameters) => {
	const options = [];
	switch (authParameters.operation) {
		default:
			options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
			options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
	}
	return options;
};
var defaultS3HttpAuthSchemeProvider = createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, _defaultS3HttpAuthSchemeProvider, {
	"aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
	"aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption
});
var resolveHttpAuthSchemeConfig = (config) => {
	const config_1 = (0, import_httpAuthSchemes.resolveAwsSdkSigV4AConfig)((0, import_httpAuthSchemes.resolveAwsSdkSigV4Config)(config));
	return Object.assign(config_1, { authSchemePreference: (0, import_client.normalizeProvider)(config.authSchemePreference ?? []) });
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/endpoint/EndpointParameters.js
var resolveClientEndpointParameters = (options) => {
	return Object.assign(options, {
		useFipsEndpoint: options.useFipsEndpoint ?? false,
		useDualstackEndpoint: options.useDualstackEndpoint ?? false,
		forcePathStyle: options.forcePathStyle ?? false,
		useAccelerateEndpoint: options.useAccelerateEndpoint ?? false,
		useGlobalEndpoint: options.useGlobalEndpoint ?? false,
		disableMultiregionAccessPoints: options.disableMultiregionAccessPoints ?? false,
		defaultSigningName: "s3",
		clientContextParams: options.clientContextParams ?? {}
	});
};
var commonParams = {
	ForcePathStyle: {
		type: "clientContextParams",
		name: "forcePathStyle"
	},
	UseArnRegion: {
		type: "clientContextParams",
		name: "useArnRegion"
	},
	DisableMultiRegionAccessPoints: {
		type: "clientContextParams",
		name: "disableMultiregionAccessPoints"
	},
	Accelerate: {
		type: "clientContextParams",
		name: "useAccelerateEndpoint"
	},
	DisableS3ExpressSessionAuth: {
		type: "clientContextParams",
		name: "disableS3ExpressSessionAuth"
	},
	UseGlobalEndpoint: {
		type: "builtInParams",
		name: "useGlobalEndpoint"
	},
	UseFIPS: {
		type: "builtInParams",
		name: "useFipsEndpoint"
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
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/models/S3ServiceException.js
var S3ServiceException = class S3ServiceException extends import_client.ServiceException {
	constructor(options) {
		super(options);
		Object.setPrototypeOf(this, S3ServiceException.prototype);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/models/errors.js
var NoSuchUpload = class NoSuchUpload extends S3ServiceException {
	name = "NoSuchUpload";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchUpload",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchUpload.prototype);
	}
};
var AccessDenied = class AccessDenied extends S3ServiceException {
	name = "AccessDenied";
	$fault = "client";
	constructor(opts) {
		super({
			name: "AccessDenied",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, AccessDenied.prototype);
	}
};
var ObjectNotInActiveTierError = class ObjectNotInActiveTierError extends S3ServiceException {
	name = "ObjectNotInActiveTierError";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ObjectNotInActiveTierError",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ObjectNotInActiveTierError.prototype);
	}
};
var BucketAlreadyExists = class BucketAlreadyExists extends S3ServiceException {
	name = "BucketAlreadyExists";
	$fault = "client";
	constructor(opts) {
		super({
			name: "BucketAlreadyExists",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, BucketAlreadyExists.prototype);
	}
};
var BucketAlreadyOwnedByYou = class BucketAlreadyOwnedByYou extends S3ServiceException {
	name = "BucketAlreadyOwnedByYou";
	$fault = "client";
	constructor(opts) {
		super({
			name: "BucketAlreadyOwnedByYou",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, BucketAlreadyOwnedByYou.prototype);
	}
};
var NoSuchBucket = class NoSuchBucket extends S3ServiceException {
	name = "NoSuchBucket";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchBucket",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchBucket.prototype);
	}
};
var NoSuchKey = class NoSuchKey extends S3ServiceException {
	name = "NoSuchKey";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchKey",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchKey.prototype);
	}
};
var InvalidObjectState = class InvalidObjectState extends S3ServiceException {
	name = "InvalidObjectState";
	$fault = "client";
	StorageClass;
	AccessTier;
	constructor(opts) {
		super({
			name: "InvalidObjectState",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidObjectState.prototype);
		this.StorageClass = opts.StorageClass;
		this.AccessTier = opts.AccessTier;
	}
};
var NoSuchAnnotation = class NoSuchAnnotation extends S3ServiceException {
	name = "NoSuchAnnotation";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchAnnotation",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchAnnotation.prototype);
	}
};
var NotFound = class NotFound extends S3ServiceException {
	name = "NotFound";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NotFound",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NotFound.prototype);
	}
};
var InvalidPrefix = class InvalidPrefix extends S3ServiceException {
	name = "InvalidPrefix";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidPrefix",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidPrefix.prototype);
	}
};
var EncryptionTypeMismatch = class EncryptionTypeMismatch extends S3ServiceException {
	name = "EncryptionTypeMismatch";
	$fault = "client";
	constructor(opts) {
		super({
			name: "EncryptionTypeMismatch",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, EncryptionTypeMismatch.prototype);
	}
};
var InvalidRequest = class InvalidRequest extends S3ServiceException {
	name = "InvalidRequest";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidRequest",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidRequest.prototype);
	}
};
var InvalidWriteOffset = class InvalidWriteOffset extends S3ServiceException {
	name = "InvalidWriteOffset";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidWriteOffset",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidWriteOffset.prototype);
	}
};
var TooManyParts = class TooManyParts extends S3ServiceException {
	name = "TooManyParts";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TooManyParts",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TooManyParts.prototype);
	}
};
var AnnotationLimitExceeded = class AnnotationLimitExceeded extends S3ServiceException {
	name = "AnnotationLimitExceeded";
	$fault = "client";
	constructor(opts) {
		super({
			name: "AnnotationLimitExceeded",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, AnnotationLimitExceeded.prototype);
	}
};
var AnnotationNameTooLong = class AnnotationNameTooLong extends S3ServiceException {
	name = "AnnotationNameTooLong";
	$fault = "client";
	constructor(opts) {
		super({
			name: "AnnotationNameTooLong",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, AnnotationNameTooLong.prototype);
	}
};
var InvalidAnnotationName = class InvalidAnnotationName extends S3ServiceException {
	name = "InvalidAnnotationName";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidAnnotationName",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidAnnotationName.prototype);
	}
};
var UnsupportedMediaType = class UnsupportedMediaType extends S3ServiceException {
	name = "UnsupportedMediaType";
	$fault = "client";
	constructor(opts) {
		super({
			name: "UnsupportedMediaType",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, UnsupportedMediaType.prototype);
	}
};
var IdempotencyParameterMismatch = class IdempotencyParameterMismatch extends S3ServiceException {
	name = "IdempotencyParameterMismatch";
	$fault = "client";
	constructor(opts) {
		super({
			name: "IdempotencyParameterMismatch",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, IdempotencyParameterMismatch.prototype);
	}
};
var ObjectAlreadyInActiveTierError = class ObjectAlreadyInActiveTierError extends S3ServiceException {
	name = "ObjectAlreadyInActiveTierError";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ObjectAlreadyInActiveTierError",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ObjectAlreadyInActiveTierError.prototype);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/schemas/schemas_0.js
var _ACL_ = "ACL";
var _AD = "AccessDenied";
var _AKI = "AccessKeyId";
var _ALE = "AnnotationLimitExceeded";
var _ANTL = "AnnotationNameTooLong";
var _AT = "AccessTier";
var _B = "Bucket";
var _BAE = "BucketAlreadyExists";
var _BAOBY = "BucketAlreadyOwnedByYou";
var _BGR = "BypassGovernanceRetention";
var _BKE = "BucketKeyEnabled";
var _Bo = "Body";
var _CA = "ChecksumAlgorithm";
var _CC = "CacheControl";
var _CCRC = "ChecksumCRC32";
var _CCRCC = "ChecksumCRC32C";
var _CCRCNVME = "ChecksumCRC64NVME";
var _CC_ = "Cache-Control";
var _CD_ = "Content-Disposition";
var _CDo = "ContentDisposition";
var _CE_ = "Content-Encoding";
var _CEo = "ContentEncoding";
var _CL = "ContentLanguage";
var _CL_ = "Content-Language";
var _CL__ = "Content-Length";
var _CLo = "ContentLength";
var _CM = "Content-MD5";
var _CMD = "ChecksumMD5";
var _CMDo = "ContentMD5";
var _CSHA = "ChecksumSHA1";
var _CSHAh = "ChecksumSHA256";
var _CSHAhe = "ChecksumSHA512";
var _CSO = "CreateSessionOutput";
var _CSR = "CreateSessionResult";
var _CSRr = "CreateSessionRequest";
var _CSr = "CreateSession";
var _CT = "ChecksumType";
var _CT_ = "Content-Type";
var _CTo = "ContentType";
var _CXXHASH = "ChecksumXXHASH64";
var _CXXHASHh = "ChecksumXXHASH3";
var _CXXHASHhe = "ChecksumXXHASH128";
var _Cr = "Credentials";
var _DM = "DeleteMarker";
var _DOO = "DeleteObjectOutput";
var _DOR = "DeleteObjectRequest";
var _DOel = "DeleteObject";
var _EBO = "ExpectedBucketOwner";
var _ET = "ETag";
var _ETM = "EncryptionTypeMismatch";
var _Ex = "Expiration";
var _Exp = "Expires";
var _GFC = "GrantFullControl";
var _GR = "GrantRead";
var _GRACP = "GrantReadACP";
var _GWACP = "GrantWriteACP";
var _IAN = "InvalidAnnotationName";
var _IM = "IfMatch";
var _IMLMT = "IfMatchLastModifiedTime";
var _IMS = "IfMatchSize";
var _IM_ = "If-Match";
var _INM = "IfNoneMatch";
var _INM_ = "If-None-Match";
var _IOS = "InvalidObjectState";
var _IP = "InvalidPrefix";
var _IPM = "IdempotencyParameterMismatch";
var _IR = "InvalidRequest";
var _IWO = "InvalidWriteOffset";
var _K = "Key";
var _M = "Metadata";
var _MFA = "MFA";
var _NF = "NotFound";
var _NSA = "NoSuchAnnotation";
var _NSB = "NoSuchBucket";
var _NSK = "NoSuchKey";
var _NSU = "NoSuchUpload";
var _OAIATE = "ObjectAlreadyInActiveTierError";
var _OLLHS = "ObjectLockLegalHoldStatus";
var _OLM = "ObjectLockMode";
var _OLRUD = "ObjectLockRetainUntilDate";
var _ONIATE = "ObjectNotInActiveTierError";
var _PO = "PutObject";
var _POO = "PutObjectOutput";
var _POR = "PutObjectRequest";
var _RC = "RequestCharged";
var _RP = "RequestPayer";
var _SAK = "SecretAccessKey";
var _SB = "StreamingBlob";
var _SC = "StorageClass";
var _SCV = "SessionCredentialValue";
var _SCe = "SessionCredentials";
var _SM = "SessionMode";
var _SSE = "ServerSideEncryption";
var _SSECA = "SSECustomerAlgorithm";
var _SSECK = "SSECustomerKey";
var _SSECKMD = "SSECustomerKeyMD5";
var _SSEKMSEC = "SSEKMSEncryptionContext";
var _SSEKMSKI = "SSEKMSKeyId";
var _ST = "SessionToken";
var _Si = "Size";
var _TMP = "TooManyParts";
var _Tag = "Tagging";
var _UMT = "UnsupportedMediaType";
var _VI = "VersionId";
var _WOB = "WriteOffsetBytes";
var _WRL = "WebsiteRedirectLocation";
var _c = "client";
var _e = "error";
var _h = "http";
var _hC = "httpChecksum";
var _hE = "httpError";
var _hH = "httpHeader";
var _hPH = "httpPrefixHeaders";
var _hQ = "httpQuery";
var _s = "smithy.ts.sdk.synthetic.com.amazonaws.s3";
var _st = "streaming";
var _vI = "versionId";
var _xN = "xmlName";
var _xaa = "x-amz-acl";
var _xabgr = "x-amz-bypass-governance-retention";
var _xacc = "x-amz-checksum-crc32";
var _xacc_ = "x-amz-checksum-crc32c";
var _xacc__ = "x-amz-checksum-crc64nvme";
var _xacm = "x-amz-checksum-md5";
var _xacs = "x-amz-checksum-sha1";
var _xacs_ = "x-amz-checksum-sha256";
var _xacs__ = "x-amz-checksum-sha512";
var _xacsm = "x-amz-create-session-mode";
var _xact = "x-amz-checksum-type";
var _xacx = "x-amz-checksum-xxhash64";
var _xacx_ = "x-amz-checksum-xxhash3";
var _xacx__ = "x-amz-checksum-xxhash128";
var _xadm = "x-amz-delete-marker";
var _xae = "x-amz-expiration";
var _xaebo = "x-amz-expected-bucket-owner";
var _xagfc = "x-amz-grant-full-control";
var _xagr = "x-amz-grant-read";
var _xagra = "x-amz-grant-read-acp";
var _xagwa = "x-amz-grant-write-acp";
var _xaimlmt = "x-amz-if-match-last-modified-time";
var _xaims = "x-amz-if-match-size";
var _xam = "x-amz-meta-";
var _xam_ = "x-amz-mfa";
var _xaollh = "x-amz-object-lock-legal-hold";
var _xaolm = "x-amz-object-lock-mode";
var _xaolrud = "x-amz-object-lock-retain-until-date";
var _xaos = "x-amz-object-size";
var _xarc = "x-amz-request-charged";
var _xarp = "x-amz-request-payer";
var _xasc = "x-amz-storage-class";
var _xasca = "x-amz-sdk-checksum-algorithm";
var _xasse = "x-amz-server-side-encryption";
var _xasseakki = "x-amz-server-side-encryption-aws-kms-key-id";
var _xassebke = "x-amz-server-side-encryption-bucket-key-enabled";
var _xassec = "x-amz-server-side-encryption-context";
var _xasseca = "x-amz-server-side-encryption-customer-algorithm";
var _xasseck = "x-amz-server-side-encryption-customer-key";
var _xasseckM = "x-amz-server-side-encryption-customer-key-MD5";
var _xat = "x-amz-tagging";
var _xavi = "x-amz-version-id";
var _xawob = "x-amz-write-offset-bytes";
var _xawrl = "x-amz-website-redirect-location";
var n0 = "com.amazonaws.s3";
var _s_registry = import_schema.TypeRegistry.for(_s);
var S3ServiceException$ = [
	-3,
	_s,
	"S3ServiceException",
	0,
	[],
	[]
];
_s_registry.registerError(S3ServiceException$, S3ServiceException);
var n0_registry = import_schema.TypeRegistry.for(n0);
var AccessDenied$ = [
	-3,
	n0,
	_AD,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[],
	[]
];
n0_registry.registerError(AccessDenied$, AccessDenied);
var AnnotationLimitExceeded$ = [
	-3,
	n0,
	_ALE,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(AnnotationLimitExceeded$, AnnotationLimitExceeded);
var AnnotationNameTooLong$ = [
	-3,
	n0,
	_ANTL,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(AnnotationNameTooLong$, AnnotationNameTooLong);
var BucketAlreadyExists$ = [
	-3,
	n0,
	_BAE,
	{
		[_e]: _c,
		[_hE]: 409
	},
	[],
	[]
];
n0_registry.registerError(BucketAlreadyExists$, BucketAlreadyExists);
var BucketAlreadyOwnedByYou$ = [
	-3,
	n0,
	_BAOBY,
	{
		[_e]: _c,
		[_hE]: 409
	},
	[],
	[]
];
n0_registry.registerError(BucketAlreadyOwnedByYou$, BucketAlreadyOwnedByYou);
var EncryptionTypeMismatch$ = [
	-3,
	n0,
	_ETM,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(EncryptionTypeMismatch$, EncryptionTypeMismatch);
var IdempotencyParameterMismatch$ = [
	-3,
	n0,
	_IPM,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(IdempotencyParameterMismatch$, IdempotencyParameterMismatch);
var InvalidAnnotationName$ = [
	-3,
	n0,
	_IAN,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(InvalidAnnotationName$, InvalidAnnotationName);
var InvalidObjectState$ = [
	-3,
	n0,
	_IOS,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[_SC, _AT],
	[0, 0]
];
n0_registry.registerError(InvalidObjectState$, InvalidObjectState);
var InvalidPrefix$ = [
	-3,
	n0,
	_IP,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(InvalidPrefix$, InvalidPrefix);
var InvalidRequest$ = [
	-3,
	n0,
	_IR,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(InvalidRequest$, InvalidRequest);
var InvalidWriteOffset$ = [
	-3,
	n0,
	_IWO,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(InvalidWriteOffset$, InvalidWriteOffset);
var NoSuchAnnotation$ = [
	-3,
	n0,
	_NSA,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchAnnotation$, NoSuchAnnotation);
var NoSuchBucket$ = [
	-3,
	n0,
	_NSB,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchBucket$, NoSuchBucket);
var NoSuchKey$ = [
	-3,
	n0,
	_NSK,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchKey$, NoSuchKey);
var NoSuchUpload$ = [
	-3,
	n0,
	_NSU,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchUpload$, NoSuchUpload);
var NotFound$ = [
	-3,
	n0,
	_NF,
	{ [_e]: _c },
	[],
	[]
];
n0_registry.registerError(NotFound$, NotFound);
var ObjectAlreadyInActiveTierError$ = [
	-3,
	n0,
	_OAIATE,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[],
	[]
];
n0_registry.registerError(ObjectAlreadyInActiveTierError$, ObjectAlreadyInActiveTierError);
var ObjectNotInActiveTierError$ = [
	-3,
	n0,
	_ONIATE,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[],
	[]
];
n0_registry.registerError(ObjectNotInActiveTierError$, ObjectNotInActiveTierError);
var TooManyParts$ = [
	-3,
	n0,
	_TMP,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(TooManyParts$, TooManyParts);
var UnsupportedMediaType$ = [
	-3,
	n0,
	_UMT,
	{
		[_e]: _c,
		[_hE]: 415
	},
	[],
	[]
];
n0_registry.registerError(UnsupportedMediaType$, UnsupportedMediaType);
var errorTypeRegistries = [_s_registry, n0_registry];
var SessionCredentialValue = [
	0,
	n0,
	_SCV,
	8,
	0
];
var SSECustomerKey = [
	0,
	n0,
	_SSECK,
	8,
	0
];
var SSEKMSEncryptionContext = [
	0,
	n0,
	_SSEKMSEC,
	8,
	0
];
var SSEKMSKeyId = [
	0,
	n0,
	_SSEKMSKI,
	8,
	0
];
var StreamingBlob = [
	0,
	n0,
	_SB,
	{ [_st]: 1 },
	42
];
var CreateSessionOutput$ = [
	3,
	n0,
	_CSO,
	{ [_xN]: _CSR },
	[
		_Cr,
		_SSE,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE
	],
	[
		[() => SessionCredentials$, { [_xN]: _Cr }],
		[0, { [_hH]: _xasse }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }]
	],
	1
];
var CreateSessionRequest$ = [
	3,
	n0,
	_CSRr,
	0,
	[
		_B,
		_SM,
		_SSE,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE
	],
	[
		[0, 1],
		[0, { [_hH]: _xacsm }],
		[0, { [_hH]: _xasse }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }]
	],
	1
];
var DeleteObjectOutput$ = [
	3,
	n0,
	_DOO,
	0,
	[
		_DM,
		_VI,
		_RC
	],
	[
		[2, { [_hH]: _xadm }],
		[0, { [_hH]: _xavi }],
		[0, { [_hH]: _xarc }]
	]
];
var DeleteObjectRequest$ = [
	3,
	n0,
	_DOR,
	0,
	[
		_B,
		_K,
		_MFA,
		_VI,
		_RP,
		_BGR,
		_EBO,
		_IM,
		_IMLMT,
		_IMS
	],
	[
		[0, 1],
		[0, 1],
		[0, { [_hH]: _xam_ }],
		[0, { [_hQ]: _vI }],
		[0, { [_hH]: _xarp }],
		[2, { [_hH]: _xabgr }],
		[0, { [_hH]: _xaebo }],
		[0, { [_hH]: _IM_ }],
		[6, { [_hH]: _xaimlmt }],
		[1, { [_hH]: _xaims }]
	],
	2
];
var PutObjectOutput$ = [
	3,
	n0,
	_POO,
	0,
	[
		_Ex,
		_ET,
		_CCRC,
		_CCRCC,
		_CCRCNVME,
		_CSHA,
		_CSHAh,
		_CSHAhe,
		_CMD,
		_CXXHASH,
		_CXXHASHh,
		_CXXHASHhe,
		_CT,
		_SSE,
		_VI,
		_SSECA,
		_SSECKMD,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE,
		_Si,
		_RC
	],
	[
		[0, { [_hH]: _xae }],
		[0, { [_hH]: _ET }],
		[0, { [_hH]: _xacc }],
		[0, { [_hH]: _xacc_ }],
		[0, { [_hH]: _xacc__ }],
		[0, { [_hH]: _xacs }],
		[0, { [_hH]: _xacs_ }],
		[0, { [_hH]: _xacs__ }],
		[0, { [_hH]: _xacm }],
		[0, { [_hH]: _xacx }],
		[0, { [_hH]: _xacx_ }],
		[0, { [_hH]: _xacx__ }],
		[0, { [_hH]: _xact }],
		[0, { [_hH]: _xasse }],
		[0, { [_hH]: _xavi }],
		[0, { [_hH]: _xasseca }],
		[0, { [_hH]: _xasseckM }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }],
		[1, { [_hH]: _xaos }],
		[0, { [_hH]: _xarc }]
	]
];
var PutObjectRequest$ = [
	3,
	n0,
	_POR,
	0,
	[
		_B,
		_K,
		_ACL_,
		_Bo,
		_CC,
		_CDo,
		_CEo,
		_CL,
		_CLo,
		_CMDo,
		_CTo,
		_CA,
		_CCRC,
		_CCRCC,
		_CCRCNVME,
		_CSHA,
		_CSHAh,
		_CSHAhe,
		_CMD,
		_CXXHASH,
		_CXXHASHh,
		_CXXHASHhe,
		_Exp,
		_IM,
		_INM,
		_GFC,
		_GR,
		_GRACP,
		_GWACP,
		_WOB,
		_M,
		_SSE,
		_SC,
		_WRL,
		_SSECA,
		_SSECK,
		_SSECKMD,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE,
		_RP,
		_Tag,
		_OLM,
		_OLRUD,
		_OLLHS,
		_EBO
	],
	[
		[0, 1],
		[0, 1],
		[0, { [_hH]: _xaa }],
		[() => StreamingBlob, 16],
		[0, { [_hH]: _CC_ }],
		[0, { [_hH]: _CD_ }],
		[0, { [_hH]: _CE_ }],
		[0, { [_hH]: _CL_ }],
		[1, { [_hH]: _CL__ }],
		[0, { [_hH]: _CM }],
		[0, { [_hH]: _CT_ }],
		[0, { [_hH]: _xasca }],
		[0, { [_hH]: _xacc }],
		[0, { [_hH]: _xacc_ }],
		[0, { [_hH]: _xacc__ }],
		[0, { [_hH]: _xacs }],
		[0, { [_hH]: _xacs_ }],
		[0, { [_hH]: _xacs__ }],
		[0, { [_hH]: _xacm }],
		[0, { [_hH]: _xacx }],
		[0, { [_hH]: _xacx_ }],
		[0, { [_hH]: _xacx__ }],
		[4, { [_hH]: _Exp }],
		[0, { [_hH]: _IM_ }],
		[0, { [_hH]: _INM_ }],
		[0, { [_hH]: _xagfc }],
		[0, { [_hH]: _xagr }],
		[0, { [_hH]: _xagra }],
		[0, { [_hH]: _xagwa }],
		[1, { [_hH]: _xawob }],
		[128, { [_hPH]: _xam }],
		[0, { [_hH]: _xasse }],
		[0, { [_hH]: _xasc }],
		[0, { [_hH]: _xawrl }],
		[0, { [_hH]: _xasseca }],
		[() => SSECustomerKey, { [_hH]: _xasseck }],
		[0, { [_hH]: _xasseckM }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }],
		[0, { [_hH]: _xarp }],
		[0, { [_hH]: _xat }],
		[0, { [_hH]: _xaolm }],
		[5, { [_hH]: _xaolrud }],
		[0, { [_hH]: _xaollh }],
		[0, { [_hH]: _xaebo }]
	],
	2
];
var SessionCredentials$ = [
	3,
	n0,
	_SCe,
	0,
	[
		_AKI,
		_SAK,
		_ST,
		_Ex
	],
	[
		[0, { [_xN]: _AKI }],
		[() => SessionCredentialValue, { [_xN]: _SAK }],
		[() => SessionCredentialValue, { [_xN]: _ST }],
		[4, { [_xN]: _Ex }]
	],
	4
];
var CreateSession$ = [
	9,
	n0,
	_CSr,
	{ [_h]: [
		"GET",
		"/?session",
		200
	] },
	() => CreateSessionRequest$,
	() => CreateSessionOutput$
];
var DeleteObject$ = [
	9,
	n0,
	_DOel,
	{ [_h]: [
		"DELETE",
		"/{Key+}?x-id=DeleteObject",
		204
	] },
	() => DeleteObjectRequest$,
	() => DeleteObjectOutput$
];
var PutObject$ = [
	9,
	n0,
	_PO,
	{
		[_hC]: "-",
		[_h]: [
			"PUT",
			"/{Key+}?x-id=PutObject",
			200
		]
	},
	() => PutObjectRequest$,
	() => PutObjectOutput$
];
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/commands/CreateSessionCommand.js
var CreateSessionCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	DisableS3ExpressSessionAuth: {
		type: "staticContextParams",
		value: true
	},
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	}
}).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()), (0, import_s3.getThrow200ExceptionsPlugin)(config)];
}).s("AmazonS3", "CreateSession", {}).n("S3Client", "CreateSessionCommand").sc(CreateSession$).build() {};
var package_default = {
	name: "@aws-sdk/client-s3",
	description: "AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native",
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
		"test:browser": "yarn g:vitest run -c vitest.config.browser.mts",
		"test:browser:watch": "yarn g:vitest watch -c vitest.config.browser.mts",
		"test:index": "tsc --noEmit ./test/index-types.ts && node ./test/index-objects.spec.mjs"
	},
	main: "./dist-cjs/index.js",
	types: "./dist-types/index.d.ts",
	module: "./dist-es/index.js",
	sideEffects: false,
	dependencies: {
		"@aws-crypto/sha1-browser": "5.2.0",
		"@aws-crypto/sha256-browser": "5.2.0",
		"@aws-crypto/sha256-js": "5.2.0",
		"@aws-sdk/core": "^3.974.21",
		"@aws-sdk/credential-provider-node": "^3.972.56",
		"@aws-sdk/middleware-flexible-checksums": "^3.974.31",
		"@aws-sdk/middleware-sdk-s3": "^3.972.52",
		"@aws-sdk/signature-v4-multi-region": "^3.996.35",
		"@aws-sdk/types": "^3.973.13",
		"@smithy/core": "^3.24.6",
		"@smithy/fetch-http-handler": "^5.4.6",
		"@smithy/node-http-handler": "^4.7.6",
		"@smithy/types": "^4.14.3",
		"tslib": "^2.6.2"
	},
	devDependencies: {
		"@aws-sdk/signature-v4-crt": "3.1070.0",
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
	homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3",
	repository: {
		"type": "git",
		"url": "https://github.com/aws/aws-sdk-js-v3.git",
		"directory": "clients/client-s3"
	}
};
//#endregion
//#region ../../node_modules/.bun/@smithy+core@3.25.0/node_modules/@smithy/core/dist-cjs/submodules/checksum/index.js
var require_checksum = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { createReadStream } = __require("node:fs");
	var { Writable } = __require("node:stream");
	var { toUint8Array, fromUtf8 } = require_serde();
	var HashCalculator = class extends Writable {
		hash;
		constructor(hash, options) {
			super(options);
			this.hash = hash;
		}
		_write(chunk, encoding, callback) {
			try {
				this.hash.update(toUint8Array(chunk));
			} catch (err) {
				return callback(err);
			}
			callback();
		}
	};
	var readableStreamHasher = (hashCtor, readableStream) => {
		if (readableStream.readableFlowing !== null) throw new Error("Unable to calculate hash for flowing readable stream");
		const hash = new hashCtor();
		const hashCalculator = new HashCalculator(hash);
		readableStream.pipe(hashCalculator);
		return new Promise((resolve, reject) => {
			readableStream.on("error", (err) => {
				hashCalculator.end();
				reject(err);
			});
			hashCalculator.on("error", reject);
			hashCalculator.on("finish", () => {
				hash.digest().then(resolve).catch(reject);
			});
		});
	};
	exports.readableStreamHasher = readableStreamHasher;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.shared.js
init_dist_es$2();
var import_checksum = require_checksum();
init_dist_es();
var getRuntimeConfig$1 = (config) => {
	return {
		apiVersion: "2006-03-01",
		base64Decoder: config?.base64Decoder ?? import_serde.fromBase64,
		base64Encoder: config?.base64Encoder ?? import_serde.toBase64,
		disableHostPrefix: config?.disableHostPrefix ?? false,
		endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
		extensions: config?.extensions ?? [],
		getAwsChunkedEncodingStream: config?.getAwsChunkedEncodingStream ?? import_serde.getAwsChunkedEncodingStream,
		httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultS3HttpAuthSchemeProvider,
		httpAuthSchemes: config?.httpAuthSchemes ?? [{
			schemeId: "aws.auth#sigv4",
			identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
			signer: new import_httpAuthSchemes.AwsSdkSigV4Signer()
		}, {
			schemeId: "aws.auth#sigv4a",
			identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
			signer: new import_httpAuthSchemes.AwsSdkSigV4ASigner()
		}],
		logger: config?.logger ?? new import_client.NoOpLogger(),
		protocol: config?.protocol ?? import_s3.S3RestXmlProtocol,
		protocolSettings: config?.protocolSettings ?? {
			defaultNamespace: "com.amazonaws.s3",
			errorTypeRegistries,
			xmlNamespace: "http://s3.amazonaws.com/doc/2006-03-01/",
			version: "2006-03-01",
			serviceTarget: "AmazonS3"
		},
		sdkStreamMixin: config?.sdkStreamMixin ?? import_serde.sdkStreamMixin,
		serviceId: config?.serviceId ?? "S3",
		signerConstructor: config?.signerConstructor ?? SignatureV4MultiRegion,
		signingEscapePath: config?.signingEscapePath ?? false,
		urlParser: config?.urlParser ?? import_protocols.parseUrl,
		useArnRegion: config?.useArnRegion ?? void 0,
		utf8Decoder: config?.utf8Decoder ?? import_serde.fromUtf8,
		utf8Encoder: config?.utf8Encoder ?? import_serde.toUtf8
	};
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.js
var getRuntimeConfig = (config) => {
	(0, import_client.emitWarningIfUnsupportedVersion)(process.version);
	const defaultsMode = (0, import_config.resolveDefaultsModeConfig)(config);
	const defaultConfigProvider = () => defaultsMode().then(import_client.loadConfigsForDefaultMode);
	const clientSharedValues = getRuntimeConfig$1(config);
	(0, import_client$1.emitWarningIfUnsupportedVersion)(process.version);
	const loaderConfig = {
		profile: config?.profile,
		logger: clientSharedValues.logger
	};
	return {
		...clientSharedValues,
		...config,
		runtime: "node",
		defaultsMode,
		authSchemePreference: config?.authSchemePreference ?? (0, import_config.loadConfig)(import_httpAuthSchemes.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
		bodyLengthChecker: config?.bodyLengthChecker ?? import_serde.calculateBodyLength,
		credentialDefaultProvider: config?.credentialDefaultProvider ?? defaultProvider,
		defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, import_client$1.createDefaultUserAgentProvider)({
			serviceId: clientSharedValues.serviceId,
			clientVersion: package_default.version
		}),
		disableS3ExpressSessionAuth: config?.disableS3ExpressSessionAuth ?? (0, import_config.loadConfig)(import_s3.NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS, loaderConfig),
		eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? import_event_streams.eventStreamSerdeProvider,
		maxAttempts: config?.maxAttempts ?? (0, import_config.loadConfig)(import_retry.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
		md5: config?.md5 ?? import_serde.Hash.bind(null, "md5"),
		region: config?.region ?? (0, import_config.loadConfig)(import_config.NODE_REGION_CONFIG_OPTIONS, {
			...import_config.NODE_REGION_CONFIG_FILE_OPTIONS,
			...loaderConfig
		}),
		requestChecksumCalculation: config?.requestChecksumCalculation ?? (0, import_config.loadConfig)(NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS, loaderConfig),
		requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
		responseChecksumValidation: config?.responseChecksumValidation ?? (0, import_config.loadConfig)(NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS, loaderConfig),
		retryMode: config?.retryMode ?? (0, import_config.loadConfig)({
			...import_retry.NODE_RETRY_MODE_CONFIG_OPTIONS,
			default: async () => (await defaultConfigProvider()).retryMode || import_retry.DEFAULT_RETRY_MODE
		}, config),
		sha1: config?.sha1 ?? import_serde.Hash.bind(null, "sha1"),
		sha256: config?.sha256 ?? import_serde.Hash.bind(null, "sha256"),
		sigv4aSigningRegionSet: config?.sigv4aSigningRegionSet ?? (0, import_config.loadConfig)(import_httpAuthSchemes.NODE_SIGV4A_CONFIG_OPTIONS, loaderConfig),
		streamCollector: config?.streamCollector ?? streamCollector,
		streamHasher: config?.streamHasher ?? import_checksum.readableStreamHasher,
		useArnRegion: config?.useArnRegion ?? (0, import_config.loadConfig)(import_s3.NODE_USE_ARN_REGION_CONFIG_OPTIONS, loaderConfig),
		useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, import_config.loadConfig)(import_config.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		useFipsEndpoint: config?.useFipsEndpoint ?? (0, import_config.loadConfig)(import_config.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		userAgentAppId: config?.userAgentAppId ?? (0, import_config.loadConfig)(import_client$1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
	};
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthExtensionConfiguration.js
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
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/runtimeExtensions.js
var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
	const extensionConfiguration = Object.assign((0, import_client$1.getAwsRegionExtensionConfiguration)(runtimeConfig), (0, import_client.getDefaultExtensionConfiguration)(runtimeConfig), (0, import_protocols.getHttpHandlerExtensionConfiguration)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
	extensions.forEach((extension) => extension.configure(extensionConfiguration));
	return Object.assign(runtimeConfig, (0, import_client$1.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, import_client.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, import_protocols.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/S3Client.js
var S3Client = class extends import_client.Client {
	config;
	constructor(...[configuration]) {
		const _config_0 = getRuntimeConfig(configuration || {});
		super(_config_0);
		this.initConfig = _config_0;
		const _config_11 = resolveRuntimeExtensions((0, import_s3.resolveS3Config)(resolveHttpAuthSchemeConfig((0, import_event_streams.resolveEventStreamSerdeConfig)((0, import_endpoints.resolveEndpointConfig)((0, import_client$1.resolveHostHeaderConfig)((0, import_config.resolveRegionConfig)((0, import_retry.resolveRetryConfig)(resolveFlexibleChecksumsConfig((0, import_client$1.resolveUserAgentConfig)(resolveClientEndpointParameters(_config_0))))))))), { session: [() => this, CreateSessionCommand] }), configuration?.extensions || []);
		this.config = _config_11;
		this.middlewareStack.use((0, import_schema.getSchemaSerdePlugin)(this.config));
		this.middlewareStack.use((0, import_client$1.getUserAgentPlugin)(this.config));
		this.middlewareStack.use((0, import_retry.getRetryPlugin)(this.config));
		this.middlewareStack.use((0, import_protocols.getContentLengthPlugin)(this.config));
		this.middlewareStack.use((0, import_client$1.getHostHeaderPlugin)(this.config));
		this.middlewareStack.use((0, import_client$1.getLoggerPlugin)(this.config));
		this.middlewareStack.use((0, import_client$1.getRecursionDetectionPlugin)(this.config));
		this.middlewareStack.use((0, import_dist_cjs.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
			httpAuthSchemeParametersProvider: defaultS3HttpAuthSchemeParametersProvider,
			identityProviderConfigProvider: async (config) => new import_dist_cjs.DefaultIdentityProviderConfig({
				"aws.auth#sigv4": config.credentials,
				"aws.auth#sigv4a": config.credentials
			})
		}));
		this.middlewareStack.use((0, import_dist_cjs.getHttpSigningPlugin)(this.config));
		this.middlewareStack.use((0, import_s3.getValidateBucketNamePlugin)(this.config));
		this.middlewareStack.use((0, import_s3.getAddExpectContinuePlugin)(this.config));
		this.middlewareStack.use((0, import_s3.getRegionRedirectMiddlewarePlugin)(this.config));
		this.middlewareStack.use((0, import_s3.getS3ExpressPlugin)(this.config));
		this.middlewareStack.use((0, import_s3.getS3ExpressHttpSigningPlugin)(this.config));
	}
	destroy() {
		super.destroy();
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/commands/DeleteObjectCommand.js
var DeleteObjectCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	},
	Key: {
		type: "contextParams",
		name: "Key"
	}
}).m(function(Command, cs, config, o) {
	return [(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()), (0, import_s3.getThrow200ExceptionsPlugin)(config)];
}).s("AmazonS3", "DeleteObject", {}).n("S3Client", "DeleteObjectCommand").sc(DeleteObject$).build() {};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+client-s3@3.1070.0/node_modules/@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js
var PutObjectCommand = class extends import_client.Command.classBuilder().ep({
	...commonParams,
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	},
	Key: {
		type: "contextParams",
		name: "Key"
	}
}).m(function(Command, cs, config, o) {
	return [
		(0, import_endpoints.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()),
		getFlexibleChecksumsPlugin(config, {
			requestAlgorithmMember: {
				"httpHeader": "x-amz-sdk-checksum-algorithm",
				"name": "ChecksumAlgorithm"
			},
			requestChecksumRequired: false
		}),
		(0, import_s3.getCheckContentLengthHeaderPlugin)(config),
		(0, import_s3.getThrow200ExceptionsPlugin)(config),
		(0, import_s3.getSsecPlugin)(config)
	];
}).s("AmazonS3", "PutObject", {}).n("S3Client", "PutObjectCommand").sc(PutObject$).build() {};
//#endregion
export { dist_es_exports as a, init_SignatureV4MultiRegion as c, require_util as i, DeleteObjectCommand as n, init_dist_es as o, S3Client as r, SignatureV4MultiRegion as s, PutObjectCommand as t };
