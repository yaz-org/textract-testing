import { a as __toCommonJS, t as __commonJSMin } from "../_runtime.mjs";
import { a as require_client, c as require_protocols, d as require_endpoints, f as require_config, m as require_schema, o as require_dist_cjs, p as require_client$1, s as require_retry, u as require_serde } from "./@aws-sdk/checksums+[...].mjs";
import { c as require_httpAuthSchemes, h as init_dist_es, m as dist_es_exports, s as require_protocols$1 } from "./@aws-sdk/client-dynamodb+[...].mjs";
import { a as dist_es_exports$1, o as init_dist_es$1 } from "./@aws-sdk/client-s3+[...].mjs";
//#region ../../node_modules/.bun/@aws-sdk+nested-clients@3.997.21/node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/index.js
var require_signin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { awsEndpointFunctions, emitWarningIfUnsupportedVersion: emitWarningIfUnsupportedVersion$1, createDefaultUserAgentProvider, NODE_APP_ID_CONFIG_OPTIONS, getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration, resolveUserAgentConfig, resolveHostHeaderConfig, getUserAgentPlugin, getHostHeaderPlugin, getLoggerPlugin, getRecursionDetectionPlugin } = require_client();
	var { NoAuthSigner, getHttpAuthSchemeEndpointRuleSetPlugin, DefaultIdentityProviderConfig, getHttpSigningPlugin } = require_dist_cjs();
	var { normalizeProvider, getSmithyContext, ServiceException, NoOpLogger, emitWarningIfUnsupportedVersion, loadConfigsForDefaultMode, getDefaultExtensionConfiguration, resolveDefaultRuntimeConfig, Client, Command, createAggregatedClient } = require_client$1();
	exports.$Command = Command;
	exports.__Client = Client;
	var { resolveDefaultsModeConfig, loadConfig, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS, resolveRegionConfig } = require_config();
	var { BinaryDecisionDiagram, EndpointCache, decideEndpoint, customEndpointFunctions, resolveEndpointConfig, getEndpointPlugin } = require_endpoints();
	var { parseUrl, getHttpHandlerExtensionConfiguration, resolveHttpHandlerRuntimeConfig, getContentLengthPlugin } = require_protocols();
	var { DEFAULT_RETRY_MODE, NODE_RETRY_MODE_CONFIG_OPTIONS, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, resolveRetryConfig, getRetryPlugin } = require_retry();
	var { TypeRegistry, getSchemaSerdePlugin } = require_schema();
	var { resolveAwsSdkSigV4Config, AwsSdkSigV4Signer, NODE_AUTH_SCHEME_PREFERENCE_OPTIONS } = require_httpAuthSchemes();
	var { toUtf8, fromUtf8, toBase64, fromBase64, Hash, calculateBodyLength } = require_serde();
	var { streamCollector, NodeHttpHandler } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var { AwsRestJsonProtocol } = require_protocols$1();
	var defaultSigninHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: getSmithyContext(context).operation,
			region: await normalizeProvider(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "signin",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
	}
	var defaultSigninHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "CreateOAuth2Token":
				options.push(createSmithyApiNoAuthHttpAuthOption());
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = resolveAwsSdkSigV4Config(config);
		return Object.assign(config_0, { authSchemePreference: normalizeProvider(config.authSchemePreference ?? []) });
	};
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "signin"
		});
	};
	var commonParams = {
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
	var packageInfo = { version: "3.997.20" };
	var p = "ref";
	var a = -1, b = true, c = "isSet", d = "booleanEquals", e = "PartitionResult", f = "stringEquals", g = "getAttr", h = "https://signin.{Region}.{PartitionResult#dualStackDnsSuffix}", i = { [p]: "Endpoint" }, j = {
		"fn": g,
		"argv": [{ [p]: e }, "name"]
	}, k = { [p]: e }, l = { [p]: "Region" }, m = { "authSchemes": [{
		"name": "sigv4",
		"signingName": "signin",
		"signingRegion": "{Region}"
	}] }, n = {}, o = [l];
	var _data = {
		conditions: [
			[c, o],
			[d, [{
				fn: "coalesce",
				argv: [{ [p]: "IsControlPlane" }, false]
			}, b]],
			[c, [i]],
			[
				"aws.partition",
				o,
				e
			],
			[d, [{ [p]: "UseFIPS" }, b]],
			[d, [{ [p]: "UseDualStack" }, b]],
			[f, [j, "aws"]],
			[f, [j, "aws-cn"]],
			[d, [{
				fn: g,
				argv: [k, "supportsDualStack"]
			}, b]],
			[f, [l, "us-gov-west-1"]],
			[f, [j, "aws-us-gov"]],
			[d, [{
				fn: g,
				argv: [k, "supportsFIPS"]
			}, b]],
			[f, [j, "aws-iso"]],
			[f, [j, "aws-iso-b"]],
			[f, [j, "aws-iso-f"]],
			[f, [j, "aws-iso-e"]],
			[f, [j, "aws-eusc"]]
		],
		results: [
			[a],
			["https://signin.{Region}.api.aws", m],
			["https://signin.{Region}.api.amazonwebservices.com.cn", m],
			[h, m],
			["https://{Region}.signin.aws.amazon.com", n],
			["https://{Region}.signin.amazonaws.cn", n],
			["https://{Region}.signin.amazonaws-us-gov.com", n],
			["https://{Region}.signin.c2shome.ic.gov", n],
			["https://{Region}.signin.sc2shome.sgov.gov", n],
			["https://{Region}.signin.csphome.hci.ic.gov", n],
			["https://{Region}.signin.csphome.adc-e.uk", n],
			["https://{Region}.signin.amazonaws-eusc.eu", n],
			["https://signin-fips.amazonaws-us-gov.com", n],
			["https://{Region}.signin-fips.amazonaws-us-gov.com", n],
			["https://{Region}.signin.{PartitionResult#dnsSuffix}", n],
			[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
			[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
			[i, n],
			["https://signin-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", n],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://signin-fips.{Region}.{PartitionResult#dnsSuffix}", n],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			[h, n],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			["https://signin.{Region}.{PartitionResult#dnsSuffix}", n],
			[a, "Invalid Configuration: Missing Region"]
		]
	};
	var root = 2;
	var nodes = new Int32Array([
		-1,
		1,
		-1,
		0,
		4,
		3,
		2,
		30,
		100000025,
		1,
		24,
		5,
		2,
		30,
		6,
		3,
		7,
		26,
		4,
		18,
		8,
		5,
		17,
		9,
		6,
		100000004,
		10,
		7,
		100000005,
		11,
		10,
		100000006,
		12,
		12,
		100000007,
		13,
		13,
		100000008,
		14,
		14,
		100000009,
		15,
		15,
		100000010,
		16,
		16,
		100000011,
		100000014,
		8,
		100000022,
		100000023,
		5,
		22,
		19,
		9,
		100000012,
		20,
		10,
		100000013,
		21,
		11,
		100000020,
		100000021,
		8,
		23,
		100000019,
		11,
		100000018,
		100000019,
		2,
		29,
		25,
		3,
		32,
		26,
		4,
		27,
		100000025,
		5,
		100000025,
		28,
		9,
		100000012,
		100000025,
		3,
		32,
		30,
		4,
		100000015,
		31,
		5,
		100000016,
		100000017,
		6,
		100000001,
		33,
		7,
		100000002,
		100000003
	]);
	var bdd = BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
	var cache = new EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"IsControlPlane",
			"Region",
			"UseDualStack",
			"UseFIPS"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => decideEndpoint(bdd, {
			endpointParams,
			logger: context.logger
		}));
	};
	customEndpointFunctions.aws = awsEndpointFunctions;
	var SigninServiceException = class SigninServiceException extends ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SigninServiceException.prototype);
		}
	};
	var AccessDeniedException = class AccessDeniedException extends SigninServiceException {
		name = "AccessDeniedException";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "AccessDeniedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AccessDeniedException.prototype);
			this.error = opts.error;
		}
	};
	var InternalServerException = class InternalServerException extends SigninServiceException {
		name = "InternalServerException";
		$fault = "server";
		error;
		constructor(opts) {
			super({
				name: "InternalServerException",
				$fault: "server",
				...opts
			});
			Object.setPrototypeOf(this, InternalServerException.prototype);
			this.error = opts.error;
		}
	};
	var TooManyRequestsError = class TooManyRequestsError extends SigninServiceException {
		name = "TooManyRequestsError";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "TooManyRequestsError",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, TooManyRequestsError.prototype);
			this.error = opts.error;
		}
	};
	var ValidationException = class ValidationException extends SigninServiceException {
		name = "ValidationException";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "ValidationException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ValidationException.prototype);
			this.error = opts.error;
		}
	};
	var _ADE = "AccessDeniedException";
	var _AT = "AccessToken";
	var _COAT = "CreateOAuth2Token";
	var _COATR = "CreateOAuth2TokenRequest";
	var _COATRB = "CreateOAuth2TokenRequestBody";
	var _COATRBr = "CreateOAuth2TokenResponseBody";
	var _COATRr = "CreateOAuth2TokenResponse";
	var _ISE = "InternalServerException";
	var _RT = "RefreshToken";
	var _TMRE = "TooManyRequestsError";
	var _VE = "ValidationException";
	var _aKI = "accessKeyId";
	var _aT = "accessToken";
	var _c = "client";
	var _cI = "clientId";
	var _cV = "codeVerifier";
	var _co = "code";
	var _e = "error";
	var _eI = "expiresIn";
	var _gT = "grantType";
	var _h = "http";
	var _hE = "httpError";
	var _iT = "idToken";
	var _jN = "jsonName";
	var _m = "message";
	var _rT = "refreshToken";
	var _rU = "redirectUri";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.signin";
	var _sAK = "secretAccessKey";
	var _sT = "sessionToken";
	var _se = "server";
	var _tI = "tokenInput";
	var _tO = "tokenOutput";
	var _tT = "tokenType";
	var n0 = "com.amazonaws.signin";
	var _s_registry = TypeRegistry.for(_s);
	var SigninServiceException$ = [
		-3,
		_s,
		"SigninServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(SigninServiceException$, SigninServiceException);
	var n0_registry = TypeRegistry.for(n0);
	var AccessDeniedException$ = [
		-3,
		n0,
		_ADE,
		{ [_e]: _c },
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(AccessDeniedException$, AccessDeniedException);
	var InternalServerException$ = [
		-3,
		n0,
		_ISE,
		{
			[_e]: _se,
			[_hE]: 500
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(InternalServerException$, InternalServerException);
	var TooManyRequestsError$ = [
		-3,
		n0,
		_TMRE,
		{
			[_e]: _c,
			[_hE]: 429
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(TooManyRequestsError$, TooManyRequestsError);
	var ValidationException$ = [
		-3,
		n0,
		_VE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(ValidationException$, ValidationException);
	var errorTypeRegistries = [_s_registry, n0_registry];
	var RefreshToken = [
		0,
		n0,
		_RT,
		8,
		0
	];
	var AccessToken$ = [
		3,
		n0,
		_AT,
		8,
		[
			_aKI,
			_sAK,
			_sT
		],
		[
			[0, { [_jN]: _aKI }],
			[0, { [_jN]: _sAK }],
			[0, { [_jN]: _sT }]
		],
		3
	];
	var CreateOAuth2TokenRequest$ = [
		3,
		n0,
		_COATR,
		0,
		[_tI],
		[[() => CreateOAuth2TokenRequestBody$, 16]],
		1
	];
	var CreateOAuth2TokenRequestBody$ = [
		3,
		n0,
		_COATRB,
		0,
		[
			_cI,
			_gT,
			_co,
			_rU,
			_cV,
			_rT
		],
		[
			[0, { [_jN]: _cI }],
			[0, { [_jN]: _gT }],
			0,
			[0, { [_jN]: _rU }],
			[0, { [_jN]: _cV }],
			[() => RefreshToken, { [_jN]: _rT }]
		],
		2
	];
	var CreateOAuth2TokenResponse$ = [
		3,
		n0,
		_COATRr,
		0,
		[_tO],
		[[() => CreateOAuth2TokenResponseBody$, 16]],
		1
	];
	var CreateOAuth2TokenResponseBody$ = [
		3,
		n0,
		_COATRBr,
		0,
		[
			_aT,
			_tT,
			_eI,
			_rT,
			_iT
		],
		[
			[() => AccessToken$, { [_jN]: _aT }],
			[0, { [_jN]: _tT }],
			[1, { [_jN]: _eI }],
			[() => RefreshToken, { [_jN]: _rT }],
			[0, { [_jN]: _iT }]
		],
		4
	];
	var CreateOAuth2Token$ = [
		9,
		n0,
		_COAT,
		{ [_h]: [
			"POST",
			"/v1/token",
			200
		] },
		() => CreateOAuth2TokenRequest$,
		() => CreateOAuth2TokenResponse$
	];
	var getRuntimeConfig$1 = (config) => {
		return {
			apiVersion: "2023-01-01",
			base64Decoder: config?.base64Decoder ?? fromBase64,
			base64Encoder: config?.base64Encoder ?? toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSigninHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
				signer: new AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new NoAuthSigner()
			}],
			logger: config?.logger ?? new NoOpLogger(),
			protocol: config?.protocol ?? AwsRestJsonProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.signin",
				errorTypeRegistries,
				version: "2023-01-01",
				serviceTarget: "Signin"
			},
			serviceId: config?.serviceId ?? "Signin",
			urlParser: config?.urlParser ?? parseUrl,
			utf8Decoder: config?.utf8Decoder ?? fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? toUtf8
		};
	};
	var getRuntimeConfig = (config) => {
		emitWarningIfUnsupportedVersion(process.version);
		const defaultsMode = resolveDefaultsModeConfig(config);
		const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
		const clientSharedValues = getRuntimeConfig$1(config);
		emitWarningIfUnsupportedVersion$1(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? loadConfig(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({
				serviceId: clientSharedValues.serviceId,
				clientVersion: packageInfo.version
			}),
			maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, {
				...NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? loadConfig({
				...NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
			streamCollector: config?.streamCollector ?? streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
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
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
	};
	var SigninClient = class extends Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = getRuntimeConfig(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_8 = resolveRuntimeExtensions(resolveHttpAuthSchemeConfig(resolveEndpointConfig(resolveHostHeaderConfig(resolveRegionConfig(resolveRetryConfig(resolveUserAgentConfig(resolveClientEndpointParameters(_config_0))))))), configuration?.extensions || []);
			this.config = _config_8;
			this.middlewareStack.use(getSchemaSerdePlugin(this.config));
			this.middlewareStack.use(getUserAgentPlugin(this.config));
			this.middlewareStack.use(getRetryPlugin(this.config));
			this.middlewareStack.use(getContentLengthPlugin(this.config));
			this.middlewareStack.use(getHostHeaderPlugin(this.config));
			this.middlewareStack.use(getLoggerPlugin(this.config));
			this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
			this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
				httpAuthSchemeParametersProvider: defaultSigninHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var CreateOAuth2TokenCommand = class extends Command.classBuilder().ep({
		...commonParams,
		IsControlPlane: {
			type: "staticContextParams",
			value: false
		}
	}).m(function(Command, cs, config, o) {
		return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("Signin", "CreateOAuth2Token", {}).n("SigninClient", "CreateOAuth2TokenCommand").sc(CreateOAuth2Token$).build() {};
	var commands = { CreateOAuth2TokenCommand };
	var Signin = class extends SigninClient {};
	createAggregatedClient(commands, Signin);
	var OAuth2ErrorCode = {
		AUTHCODE_EXPIRED: "AUTHCODE_EXPIRED",
		CONFLICT: "CONFLICT",
		INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
		INVALID_REQUEST: "INVALID_REQUEST",
		RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
		SERVER_ERROR: "server_error",
		SERVICE_QUOTA_EXCEEDED: "SERVICE_QUOTA_EXCEEDED",
		TOKEN_EXPIRED: "TOKEN_EXPIRED",
		USER_CREDENTIALS_CHANGED: "USER_CREDENTIALS_CHANGED"
	};
	exports.AccessDeniedException = AccessDeniedException;
	exports.AccessDeniedException$ = AccessDeniedException$;
	exports.AccessToken$ = AccessToken$;
	exports.CreateOAuth2Token$ = CreateOAuth2Token$;
	exports.CreateOAuth2TokenCommand = CreateOAuth2TokenCommand;
	exports.CreateOAuth2TokenRequest$ = CreateOAuth2TokenRequest$;
	exports.CreateOAuth2TokenRequestBody$ = CreateOAuth2TokenRequestBody$;
	exports.CreateOAuth2TokenResponse$ = CreateOAuth2TokenResponse$;
	exports.CreateOAuth2TokenResponseBody$ = CreateOAuth2TokenResponseBody$;
	exports.InternalServerException = InternalServerException;
	exports.InternalServerException$ = InternalServerException$;
	exports.OAuth2ErrorCode = OAuth2ErrorCode;
	exports.Signin = Signin;
	exports.SigninClient = SigninClient;
	exports.SigninServiceException = SigninServiceException;
	exports.SigninServiceException$ = SigninServiceException$;
	exports.TooManyRequestsError = TooManyRequestsError;
	exports.TooManyRequestsError$ = TooManyRequestsError$;
	exports.ValidationException = ValidationException;
	exports.ValidationException$ = ValidationException$;
	exports.errorTypeRegistries = errorTypeRegistries;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+nested-clients@3.997.21/node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/index.js
var require_sso_oidc = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { awsEndpointFunctions, emitWarningIfUnsupportedVersion: emitWarningIfUnsupportedVersion$1, createDefaultUserAgentProvider, NODE_APP_ID_CONFIG_OPTIONS, getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration, resolveUserAgentConfig, resolveHostHeaderConfig, getUserAgentPlugin, getHostHeaderPlugin, getLoggerPlugin, getRecursionDetectionPlugin } = require_client();
	var { NoAuthSigner, getHttpAuthSchemeEndpointRuleSetPlugin, DefaultIdentityProviderConfig, getHttpSigningPlugin } = require_dist_cjs();
	var { normalizeProvider, getSmithyContext, ServiceException, NoOpLogger, emitWarningIfUnsupportedVersion, loadConfigsForDefaultMode, getDefaultExtensionConfiguration, resolveDefaultRuntimeConfig, Client, Command, createAggregatedClient } = require_client$1();
	exports.$Command = Command;
	exports.__Client = Client;
	var { resolveDefaultsModeConfig, loadConfig, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS, resolveRegionConfig } = require_config();
	var { BinaryDecisionDiagram, EndpointCache, decideEndpoint, customEndpointFunctions, resolveEndpointConfig, getEndpointPlugin } = require_endpoints();
	var { parseUrl, getHttpHandlerExtensionConfiguration, resolveHttpHandlerRuntimeConfig, getContentLengthPlugin } = require_protocols();
	var { DEFAULT_RETRY_MODE, NODE_RETRY_MODE_CONFIG_OPTIONS, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, resolveRetryConfig, getRetryPlugin } = require_retry();
	var { TypeRegistry, getSchemaSerdePlugin } = require_schema();
	var { resolveAwsSdkSigV4Config, AwsSdkSigV4Signer, NODE_AUTH_SCHEME_PREFERENCE_OPTIONS } = require_httpAuthSchemes();
	var { toUtf8, fromUtf8, toBase64, fromBase64, Hash, calculateBodyLength } = require_serde();
	var { streamCollector, NodeHttpHandler } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var { AwsRestJsonProtocol } = require_protocols$1();
	var defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: getSmithyContext(context).operation,
			region: await normalizeProvider(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "sso-oauth",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
	}
	var defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "CreateToken":
				options.push(createSmithyApiNoAuthHttpAuthOption());
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = resolveAwsSdkSigV4Config(config);
		return Object.assign(config_0, { authSchemePreference: normalizeProvider(config.authSchemePreference ?? []) });
	};
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "sso-oauth"
		});
	};
	var commonParams = {
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
	var packageInfo = { version: "3.997.20" };
	var k = "ref";
	var a = -1, b = true, c = "isSet", d = "PartitionResult", e = "booleanEquals", f = "getAttr", g = { [k]: "Endpoint" }, h = { [k]: d }, i = {}, j = [{ [k]: "Region" }];
	var _data = {
		conditions: [
			[c, [g]],
			[c, j],
			[
				"aws.partition",
				j,
				d
			],
			[e, [{ [k]: "UseFIPS" }, b]],
			[e, [{ [k]: "UseDualStack" }, b]],
			[e, [{
				fn: f,
				argv: [h, "supportsDualStack"]
			}, b]],
			[e, [{
				fn: f,
				argv: [h, "supportsFIPS"]
			}, b]],
			["stringEquals", [{
				fn: f,
				argv: [h, "name"]
			}, "aws-us-gov"]]
		],
		results: [
			[a],
			[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
			[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
			[g, i],
			["https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://oidc.{Region}.amazonaws.com", i],
			["https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}", i],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			["https://oidc.{Region}.{PartitionResult#dnsSuffix}", i],
			[a, "Invalid Configuration: Missing Region"]
		]
	};
	var root = 2;
	var nodes = new Int32Array([
		-1,
		1,
		-1,
		0,
		13,
		3,
		1,
		4,
		100000012,
		2,
		5,
		100000012,
		3,
		8,
		6,
		4,
		7,
		100000011,
		5,
		100000009,
		100000010,
		4,
		11,
		9,
		6,
		10,
		100000008,
		7,
		100000006,
		100000007,
		5,
		12,
		100000005,
		6,
		100000004,
		100000005,
		3,
		100000001,
		14,
		4,
		100000002,
		100000003
	]);
	var bdd = BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
	var cache = new EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => decideEndpoint(bdd, {
			endpointParams,
			logger: context.logger
		}));
	};
	customEndpointFunctions.aws = awsEndpointFunctions;
	var SSOOIDCServiceException = class SSOOIDCServiceException extends ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SSOOIDCServiceException.prototype);
		}
	};
	var AccessDeniedException = class AccessDeniedException extends SSOOIDCServiceException {
		name = "AccessDeniedException";
		$fault = "client";
		error;
		reason;
		error_description;
		constructor(opts) {
			super({
				name: "AccessDeniedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AccessDeniedException.prototype);
			this.error = opts.error;
			this.reason = opts.reason;
			this.error_description = opts.error_description;
		}
	};
	var AuthorizationPendingException = class AuthorizationPendingException extends SSOOIDCServiceException {
		name = "AuthorizationPendingException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "AuthorizationPendingException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AuthorizationPendingException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var ExpiredTokenException = class ExpiredTokenException extends SSOOIDCServiceException {
		name = "ExpiredTokenException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "ExpiredTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ExpiredTokenException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var InternalServerException = class InternalServerException extends SSOOIDCServiceException {
		name = "InternalServerException";
		$fault = "server";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InternalServerException",
				$fault: "server",
				...opts
			});
			Object.setPrototypeOf(this, InternalServerException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var InvalidClientException = class InvalidClientException extends SSOOIDCServiceException {
		name = "InvalidClientException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidClientException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidClientException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var InvalidGrantException = class InvalidGrantException extends SSOOIDCServiceException {
		name = "InvalidGrantException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidGrantException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidGrantException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var InvalidRequestException = class InvalidRequestException extends SSOOIDCServiceException {
		name = "InvalidRequestException";
		$fault = "client";
		error;
		reason;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidRequestException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidRequestException.prototype);
			this.error = opts.error;
			this.reason = opts.reason;
			this.error_description = opts.error_description;
		}
	};
	var InvalidScopeException = class InvalidScopeException extends SSOOIDCServiceException {
		name = "InvalidScopeException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidScopeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidScopeException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var SlowDownException = class SlowDownException extends SSOOIDCServiceException {
		name = "SlowDownException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "SlowDownException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, SlowDownException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var UnauthorizedClientException = class UnauthorizedClientException extends SSOOIDCServiceException {
		name = "UnauthorizedClientException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "UnauthorizedClientException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnauthorizedClientException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var UnsupportedGrantTypeException = class UnsupportedGrantTypeException extends SSOOIDCServiceException {
		name = "UnsupportedGrantTypeException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "UnsupportedGrantTypeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnsupportedGrantTypeException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	var _ADE = "AccessDeniedException";
	var _APE = "AuthorizationPendingException";
	var _AT = "AccessToken";
	var _CS = "ClientSecret";
	var _CT = "CreateToken";
	var _CTR = "CreateTokenRequest";
	var _CTRr = "CreateTokenResponse";
	var _CV = "CodeVerifier";
	var _ETE = "ExpiredTokenException";
	var _ICE = "InvalidClientException";
	var _IGE = "InvalidGrantException";
	var _IRE = "InvalidRequestException";
	var _ISE = "InternalServerException";
	var _ISEn = "InvalidScopeException";
	var _IT = "IdToken";
	var _RT = "RefreshToken";
	var _SDE = "SlowDownException";
	var _UCE = "UnauthorizedClientException";
	var _UGTE = "UnsupportedGrantTypeException";
	var _aT = "accessToken";
	var _c = "client";
	var _cI = "clientId";
	var _cS = "clientSecret";
	var _cV = "codeVerifier";
	var _co = "code";
	var _dC = "deviceCode";
	var _e = "error";
	var _eI = "expiresIn";
	var _ed = "error_description";
	var _gT = "grantType";
	var _h = "http";
	var _hE = "httpError";
	var _iT = "idToken";
	var _r = "reason";
	var _rT = "refreshToken";
	var _rU = "redirectUri";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.ssooidc";
	var _sc = "scope";
	var _se = "server";
	var _tT = "tokenType";
	var n0 = "com.amazonaws.ssooidc";
	var _s_registry = TypeRegistry.for(_s);
	var SSOOIDCServiceException$ = [
		-3,
		_s,
		"SSOOIDCServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(SSOOIDCServiceException$, SSOOIDCServiceException);
	var n0_registry = TypeRegistry.for(n0);
	var AccessDeniedException$ = [
		-3,
		n0,
		_ADE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[
			_e,
			_r,
			_ed
		],
		[
			0,
			0,
			0
		]
	];
	n0_registry.registerError(AccessDeniedException$, AccessDeniedException);
	var AuthorizationPendingException$ = [
		-3,
		n0,
		_APE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(AuthorizationPendingException$, AuthorizationPendingException);
	var ExpiredTokenException$ = [
		-3,
		n0,
		_ETE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(ExpiredTokenException$, ExpiredTokenException);
	var InternalServerException$ = [
		-3,
		n0,
		_ISE,
		{
			[_e]: _se,
			[_hE]: 500
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(InternalServerException$, InternalServerException);
	var InvalidClientException$ = [
		-3,
		n0,
		_ICE,
		{
			[_e]: _c,
			[_hE]: 401
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(InvalidClientException$, InvalidClientException);
	var InvalidGrantException$ = [
		-3,
		n0,
		_IGE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(InvalidGrantException$, InvalidGrantException);
	var InvalidRequestException$ = [
		-3,
		n0,
		_IRE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[
			_e,
			_r,
			_ed
		],
		[
			0,
			0,
			0
		]
	];
	n0_registry.registerError(InvalidRequestException$, InvalidRequestException);
	var InvalidScopeException$ = [
		-3,
		n0,
		_ISEn,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(InvalidScopeException$, InvalidScopeException);
	var SlowDownException$ = [
		-3,
		n0,
		_SDE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(SlowDownException$, SlowDownException);
	var UnauthorizedClientException$ = [
		-3,
		n0,
		_UCE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(UnauthorizedClientException$, UnauthorizedClientException);
	var UnsupportedGrantTypeException$ = [
		-3,
		n0,
		_UGTE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(UnsupportedGrantTypeException$, UnsupportedGrantTypeException);
	var errorTypeRegistries = [_s_registry, n0_registry];
	var AccessToken = [
		0,
		n0,
		_AT,
		8,
		0
	];
	var ClientSecret = [
		0,
		n0,
		_CS,
		8,
		0
	];
	var CodeVerifier = [
		0,
		n0,
		_CV,
		8,
		0
	];
	var IdToken = [
		0,
		n0,
		_IT,
		8,
		0
	];
	var RefreshToken = [
		0,
		n0,
		_RT,
		8,
		0
	];
	var CreateTokenRequest$ = [
		3,
		n0,
		_CTR,
		0,
		[
			_cI,
			_cS,
			_gT,
			_dC,
			_co,
			_rT,
			_sc,
			_rU,
			_cV
		],
		[
			0,
			[() => ClientSecret, 0],
			0,
			0,
			0,
			[() => RefreshToken, 0],
			64,
			0,
			[() => CodeVerifier, 0]
		],
		3
	];
	var CreateTokenResponse$ = [
		3,
		n0,
		_CTRr,
		0,
		[
			_aT,
			_tT,
			_eI,
			_rT,
			_iT
		],
		[
			[() => AccessToken, 0],
			0,
			1,
			[() => RefreshToken, 0],
			[() => IdToken, 0]
		]
	];
	var CreateToken$ = [
		9,
		n0,
		_CT,
		{ [_h]: [
			"POST",
			"/token",
			200
		] },
		() => CreateTokenRequest$,
		() => CreateTokenResponse$
	];
	var getRuntimeConfig$1 = (config) => {
		return {
			apiVersion: "2019-06-10",
			base64Decoder: config?.base64Decoder ?? fromBase64,
			base64Encoder: config?.base64Encoder ?? toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSSOOIDCHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
				signer: new AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new NoAuthSigner()
			}],
			logger: config?.logger ?? new NoOpLogger(),
			protocol: config?.protocol ?? AwsRestJsonProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.ssooidc",
				errorTypeRegistries,
				version: "2019-06-10",
				serviceTarget: "AWSSSOOIDCService"
			},
			serviceId: config?.serviceId ?? "SSO OIDC",
			urlParser: config?.urlParser ?? parseUrl,
			utf8Decoder: config?.utf8Decoder ?? fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? toUtf8
		};
	};
	var getRuntimeConfig = (config) => {
		emitWarningIfUnsupportedVersion(process.version);
		const defaultsMode = resolveDefaultsModeConfig(config);
		const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
		const clientSharedValues = getRuntimeConfig$1(config);
		emitWarningIfUnsupportedVersion$1(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? loadConfig(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({
				serviceId: clientSharedValues.serviceId,
				clientVersion: packageInfo.version
			}),
			maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, {
				...NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? loadConfig({
				...NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
			streamCollector: config?.streamCollector ?? streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
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
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
	};
	var SSOOIDCClient = class extends Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = getRuntimeConfig(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_8 = resolveRuntimeExtensions(resolveHttpAuthSchemeConfig(resolveEndpointConfig(resolveHostHeaderConfig(resolveRegionConfig(resolveRetryConfig(resolveUserAgentConfig(resolveClientEndpointParameters(_config_0))))))), configuration?.extensions || []);
			this.config = _config_8;
			this.middlewareStack.use(getSchemaSerdePlugin(this.config));
			this.middlewareStack.use(getUserAgentPlugin(this.config));
			this.middlewareStack.use(getRetryPlugin(this.config));
			this.middlewareStack.use(getContentLengthPlugin(this.config));
			this.middlewareStack.use(getHostHeaderPlugin(this.config));
			this.middlewareStack.use(getLoggerPlugin(this.config));
			this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
			this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
				httpAuthSchemeParametersProvider: defaultSSOOIDCHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var CreateTokenCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").sc(CreateToken$).build() {};
	var commands = { CreateTokenCommand };
	var SSOOIDC = class extends SSOOIDCClient {};
	createAggregatedClient(commands, SSOOIDC);
	var AccessDeniedExceptionReason = { KMS_ACCESS_DENIED: "KMS_AccessDeniedException" };
	var InvalidRequestExceptionReason = {
		KMS_DISABLED_KEY: "KMS_DisabledException",
		KMS_INVALID_KEY_USAGE: "KMS_InvalidKeyUsageException",
		KMS_INVALID_STATE: "KMS_InvalidStateException",
		KMS_KEY_NOT_FOUND: "KMS_NotFoundException"
	};
	exports.AccessDeniedException = AccessDeniedException;
	exports.AccessDeniedException$ = AccessDeniedException$;
	exports.AccessDeniedExceptionReason = AccessDeniedExceptionReason;
	exports.AuthorizationPendingException = AuthorizationPendingException;
	exports.AuthorizationPendingException$ = AuthorizationPendingException$;
	exports.CreateToken$ = CreateToken$;
	exports.CreateTokenCommand = CreateTokenCommand;
	exports.CreateTokenRequest$ = CreateTokenRequest$;
	exports.CreateTokenResponse$ = CreateTokenResponse$;
	exports.ExpiredTokenException = ExpiredTokenException;
	exports.ExpiredTokenException$ = ExpiredTokenException$;
	exports.InternalServerException = InternalServerException;
	exports.InternalServerException$ = InternalServerException$;
	exports.InvalidClientException = InvalidClientException;
	exports.InvalidClientException$ = InvalidClientException$;
	exports.InvalidGrantException = InvalidGrantException;
	exports.InvalidGrantException$ = InvalidGrantException$;
	exports.InvalidRequestException = InvalidRequestException;
	exports.InvalidRequestException$ = InvalidRequestException$;
	exports.InvalidRequestExceptionReason = InvalidRequestExceptionReason;
	exports.InvalidScopeException = InvalidScopeException;
	exports.InvalidScopeException$ = InvalidScopeException$;
	exports.SSOOIDC = SSOOIDC;
	exports.SSOOIDCClient = SSOOIDCClient;
	exports.SSOOIDCServiceException = SSOOIDCServiceException;
	exports.SSOOIDCServiceException$ = SSOOIDCServiceException$;
	exports.SlowDownException = SlowDownException;
	exports.SlowDownException$ = SlowDownException$;
	exports.UnauthorizedClientException = UnauthorizedClientException;
	exports.UnauthorizedClientException$ = UnauthorizedClientException$;
	exports.UnsupportedGrantTypeException = UnsupportedGrantTypeException;
	exports.UnsupportedGrantTypeException$ = UnsupportedGrantTypeException$;
	exports.errorTypeRegistries = errorTypeRegistries;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+nested-clients@3.997.21/node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/index.js
var require_sts = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { awsEndpointFunctions, emitWarningIfUnsupportedVersion: emitWarningIfUnsupportedVersion$1, createDefaultUserAgentProvider, NODE_APP_ID_CONFIG_OPTIONS, getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration, resolveUserAgentConfig, resolveHostHeaderConfig, getUserAgentPlugin, getHostHeaderPlugin, getLoggerPlugin, getRecursionDetectionPlugin, setCredentialFeature, stsRegionDefaultResolver } = require_client();
	var { NoAuthSigner, getHttpAuthSchemeEndpointRuleSetPlugin, DefaultIdentityProviderConfig, getHttpSigningPlugin } = require_dist_cjs();
	var { normalizeProvider, getSmithyContext, ServiceException, NoOpLogger, emitWarningIfUnsupportedVersion, loadConfigsForDefaultMode, getDefaultExtensionConfiguration, resolveDefaultRuntimeConfig, Client, Command, createAggregatedClient } = require_client$1();
	exports.$Command = Command;
	exports.__Client = Client;
	var { resolveDefaultsModeConfig, loadConfig, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS, resolveRegionConfig } = require_config();
	var { BinaryDecisionDiagram, EndpointCache, decideEndpoint, customEndpointFunctions, resolveParams, resolveEndpointConfig, getEndpointPlugin } = require_endpoints();
	var { parseUrl, getHttpHandlerExtensionConfiguration, resolveHttpHandlerRuntimeConfig, getContentLengthPlugin } = require_protocols();
	var { DEFAULT_RETRY_MODE, NODE_RETRY_MODE_CONFIG_OPTIONS, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, resolveRetryConfig, getRetryPlugin } = require_retry();
	var { TypeRegistry, getSchemaSerdePlugin } = require_schema();
	var { resolveAwsSdkSigV4Config, resolveAwsSdkSigV4AConfig, AwsSdkSigV4Signer, AwsSdkSigV4ASigner, NODE_SIGV4A_CONFIG_OPTIONS, NODE_AUTH_SCHEME_PREFERENCE_OPTIONS } = require_httpAuthSchemes();
	var { SignatureV4MultiRegion } = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var { toUtf8, fromUtf8, toBase64, fromBase64, Hash, calculateBodyLength } = require_serde();
	var { streamCollector, NodeHttpHandler } = (init_dist_es(), __toCommonJS(dist_es_exports));
	var { AwsQueryProtocol } = require_protocols$1();
	var q = "ref";
	var a = -1, b = true, c = "isSet", d = "PartitionResult", e = "booleanEquals", f = "stringEquals", g = "getAttr", h = "us-east-1", i = "sigv4", j = "sts", k = "https://sts.{Region}.{PartitionResult#dnsSuffix}", l = { [q]: "Endpoint" }, m = { [q]: "Region" }, n = { [q]: d }, o = {}, p = [m];
	var _data = {
		conditions: [
			[c, [l]],
			[c, p],
			[
				"aws.partition",
				p,
				d
			],
			[e, [{ [q]: "UseFIPS" }, b]],
			[e, [{ [q]: "UseDualStack" }, b]],
			[f, [m, "aws-global"]],
			[e, [{ [q]: "UseGlobalEndpoint" }, b]],
			[f, [m, "eu-central-1"]],
			[e, [{
				fn: g,
				argv: [n, "supportsDualStack"]
			}, b]],
			[e, [{
				fn: g,
				argv: [n, "supportsFIPS"]
			}, b]],
			[f, [m, "ap-south-1"]],
			[f, [m, "eu-north-1"]],
			[f, [m, "eu-west-1"]],
			[f, [m, "eu-west-2"]],
			[f, [m, "eu-west-3"]],
			[f, [m, "sa-east-1"]],
			[f, [m, h]],
			[f, [m, "us-east-2"]],
			[f, [m, "us-west-2"]],
			[f, [m, "us-west-1"]],
			[f, [m, "ca-central-1"]],
			[f, [m, "ap-southeast-1"]],
			[f, [m, "ap-northeast-1"]],
			[f, [m, "ap-southeast-2"]],
			[f, [{
				fn: g,
				argv: [n, "name"]
			}, "aws-us-gov"]]
		],
		results: [
			[a],
			["https://sts.amazonaws.com", { authSchemes: [{
				name: i,
				signingName: j,
				signingRegion: h
			}] }],
			[k, { authSchemes: [{
				name: i,
				signingName: j,
				signingRegion: "{Region}"
			}] }],
			[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
			[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
			[l, o],
			["https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", o],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://sts.{Region}.amazonaws.com", o],
			["https://sts-fips.{Region}.{PartitionResult#dnsSuffix}", o],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}", o],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			[k, o],
			[a, "Invalid Configuration: Missing Region"]
		]
	};
	var root = 2;
	var nodes = new Int32Array([
		-1,
		1,
		-1,
		0,
		30,
		3,
		1,
		4,
		100000014,
		2,
		5,
		100000014,
		3,
		25,
		6,
		4,
		24,
		7,
		5,
		100000001,
		8,
		6,
		9,
		100000013,
		7,
		100000001,
		10,
		10,
		100000001,
		11,
		11,
		100000001,
		12,
		12,
		100000001,
		13,
		13,
		100000001,
		14,
		14,
		100000001,
		15,
		15,
		100000001,
		16,
		16,
		100000001,
		17,
		17,
		100000001,
		18,
		18,
		100000001,
		19,
		19,
		100000001,
		20,
		20,
		100000001,
		21,
		21,
		100000001,
		22,
		22,
		100000001,
		23,
		23,
		100000001,
		100000002,
		8,
		100000011,
		100000012,
		4,
		28,
		26,
		9,
		27,
		100000010,
		24,
		100000008,
		100000009,
		8,
		29,
		100000007,
		9,
		100000006,
		100000007,
		3,
		100000003,
		31,
		4,
		100000004,
		100000005
	]);
	var bdd = BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
	var cache = new EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS",
			"UseGlobalEndpoint"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => decideEndpoint(bdd, {
			endpointParams,
			logger: context.logger
		}));
	};
	customEndpointFunctions.aws = awsEndpointFunctions;
	var createEndpointRuleSetHttpAuthSchemeParametersProvider = (defaultHttpAuthSchemeParametersProvider) => async (config, context, input) => {
		if (!input) throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
		const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
		const instructionsFn = getSmithyContext(context)?.commandInstance?.constructor?.getEndpointParameterInstructions;
		if (!instructionsFn) throw new Error(`getEndpointParameterInstructions() is not defined on '${context.commandName}'`);
		const endpointParameters = await resolveParams(input, { getEndpointParameterInstructions: instructionsFn }, config);
		return Object.assign(defaultParameters, endpointParameters);
	};
	var _defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: getSmithyContext(context).operation,
			region: await normalizeProvider(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	var defaultSTSHttpAuthSchemeParametersProvider = createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultSTSHttpAuthSchemeParametersProvider);
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "sts",
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
				name: "sts",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
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
	var _defaultSTSHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "AssumeRoleWithWebIdentity":
				options.push(createSmithyApiNoAuthHttpAuthOption());
				options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
				break;
			default:
				options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
				options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
		}
		return options;
	};
	var defaultSTSHttpAuthSchemeProvider = createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, _defaultSTSHttpAuthSchemeProvider, {
		"aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
		"aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption,
		"smithy.api#noAuth": createSmithyApiNoAuthHttpAuthOption
	});
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_1 = resolveAwsSdkSigV4AConfig(resolveAwsSdkSigV4Config(config));
		return Object.assign(config_1, { authSchemePreference: normalizeProvider(config.authSchemePreference ?? []) });
	};
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			useGlobalEndpoint: options.useGlobalEndpoint ?? false,
			defaultSigningName: "sts"
		});
	};
	var commonParams = {
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
	var packageInfo = { version: "3.997.20" };
	var STSServiceException = class STSServiceException extends ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, STSServiceException.prototype);
		}
	};
	var ExpiredTokenException = class ExpiredTokenException extends STSServiceException {
		name = "ExpiredTokenException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "ExpiredTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ExpiredTokenException.prototype);
		}
	};
	var MalformedPolicyDocumentException = class MalformedPolicyDocumentException extends STSServiceException {
		name = "MalformedPolicyDocumentException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "MalformedPolicyDocumentException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
		}
	};
	var PackedPolicyTooLargeException = class PackedPolicyTooLargeException extends STSServiceException {
		name = "PackedPolicyTooLargeException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "PackedPolicyTooLargeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
		}
	};
	var RegionDisabledException = class RegionDisabledException extends STSServiceException {
		name = "RegionDisabledException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "RegionDisabledException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, RegionDisabledException.prototype);
		}
	};
	var IDPRejectedClaimException = class IDPRejectedClaimException extends STSServiceException {
		name = "IDPRejectedClaimException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "IDPRejectedClaimException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
		}
	};
	var InvalidIdentityTokenException = class InvalidIdentityTokenException extends STSServiceException {
		name = "InvalidIdentityTokenException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "InvalidIdentityTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
		}
	};
	var IDPCommunicationErrorException = class IDPCommunicationErrorException extends STSServiceException {
		name = "IDPCommunicationErrorException";
		$fault = "client";
		$retryable = {};
		constructor(opts) {
			super({
				name: "IDPCommunicationErrorException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
		}
	};
	var _A = "Arn";
	var _AKI = "AccessKeyId";
	var _AR = "AssumeRole";
	var _ARI = "AssumedRoleId";
	var _ARR = "AssumeRoleRequest";
	var _ARRs = "AssumeRoleResponse";
	var _ARU = "AssumedRoleUser";
	var _ARWWI = "AssumeRoleWithWebIdentity";
	var _ARWWIR = "AssumeRoleWithWebIdentityRequest";
	var _ARWWIRs = "AssumeRoleWithWebIdentityResponse";
	var _Au = "Audience";
	var _C = "Credentials";
	var _CA = "ContextAssertion";
	var _DS = "DurationSeconds";
	var _E = "Expiration";
	var _EI = "ExternalId";
	var _ETE = "ExpiredTokenException";
	var _IDPCEE = "IDPCommunicationErrorException";
	var _IDPRCE = "IDPRejectedClaimException";
	var _IITE = "InvalidIdentityTokenException";
	var _K = "Key";
	var _MPDE = "MalformedPolicyDocumentException";
	var _P = "Policy";
	var _PA = "PolicyArns";
	var _PAr = "ProviderArn";
	var _PC = "ProvidedContexts";
	var _PCLT = "ProvidedContextsListType";
	var _PCr = "ProvidedContext";
	var _PDT = "PolicyDescriptorType";
	var _PI = "ProviderId";
	var _PPS = "PackedPolicySize";
	var _PPTLE = "PackedPolicyTooLargeException";
	var _Pr = "Provider";
	var _RA = "RoleArn";
	var _RDE = "RegionDisabledException";
	var _RSN = "RoleSessionName";
	var _SAK = "SecretAccessKey";
	var _SFWIT = "SubjectFromWebIdentityToken";
	var _SI = "SourceIdentity";
	var _SN = "SerialNumber";
	var _ST = "SessionToken";
	var _T = "Tags";
	var _TC = "TokenCode";
	var _TTK = "TransitiveTagKeys";
	var _Ta = "Tag";
	var _V = "Value";
	var _WIT = "WebIdentityToken";
	var _a = "arn";
	var _aKST = "accessKeySecretType";
	var _aQE = "awsQueryError";
	var _c = "client";
	var _cTT = "clientTokenType";
	var _e = "error";
	var _hE = "httpError";
	var _m = "message";
	var _pDLT = "policyDescriptorListType";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.sts";
	var _tLT = "tagListType";
	var n0 = "com.amazonaws.sts";
	var _s_registry = TypeRegistry.for(_s);
	var STSServiceException$ = [
		-3,
		_s,
		"STSServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(STSServiceException$, STSServiceException);
	var n0_registry = TypeRegistry.for(n0);
	var ExpiredTokenException$ = [
		-3,
		n0,
		_ETE,
		{
			[_aQE]: [`ExpiredTokenException`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(ExpiredTokenException$, ExpiredTokenException);
	var IDPCommunicationErrorException$ = [
		-3,
		n0,
		_IDPCEE,
		{
			[_aQE]: [`IDPCommunicationError`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(IDPCommunicationErrorException$, IDPCommunicationErrorException);
	var IDPRejectedClaimException$ = [
		-3,
		n0,
		_IDPRCE,
		{
			[_aQE]: [`IDPRejectedClaim`, 403],
			[_e]: _c,
			[_hE]: 403
		},
		[_m],
		[0]
	];
	n0_registry.registerError(IDPRejectedClaimException$, IDPRejectedClaimException);
	var InvalidIdentityTokenException$ = [
		-3,
		n0,
		_IITE,
		{
			[_aQE]: [`InvalidIdentityToken`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(InvalidIdentityTokenException$, InvalidIdentityTokenException);
	var MalformedPolicyDocumentException$ = [
		-3,
		n0,
		_MPDE,
		{
			[_aQE]: [`MalformedPolicyDocument`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(MalformedPolicyDocumentException$, MalformedPolicyDocumentException);
	var PackedPolicyTooLargeException$ = [
		-3,
		n0,
		_PPTLE,
		{
			[_aQE]: [`PackedPolicyTooLarge`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(PackedPolicyTooLargeException$, PackedPolicyTooLargeException);
	var RegionDisabledException$ = [
		-3,
		n0,
		_RDE,
		{
			[_aQE]: [`RegionDisabledException`, 403],
			[_e]: _c,
			[_hE]: 403
		},
		[_m],
		[0]
	];
	n0_registry.registerError(RegionDisabledException$, RegionDisabledException);
	var errorTypeRegistries = [_s_registry, n0_registry];
	var accessKeySecretType = [
		0,
		n0,
		_aKST,
		8,
		0
	];
	var clientTokenType = [
		0,
		n0,
		_cTT,
		8,
		0
	];
	var AssumedRoleUser$ = [
		3,
		n0,
		_ARU,
		0,
		[_ARI, _A],
		[0, 0],
		2
	];
	var AssumeRoleRequest$ = [
		3,
		n0,
		_ARR,
		0,
		[
			_RA,
			_RSN,
			_PA,
			_P,
			_DS,
			_T,
			_TTK,
			_EI,
			_SN,
			_TC,
			_SI,
			_PC
		],
		[
			0,
			0,
			() => policyDescriptorListType,
			0,
			1,
			() => tagListType,
			64,
			0,
			0,
			0,
			0,
			() => ProvidedContextsListType
		],
		2
	];
	var AssumeRoleResponse$ = [
		3,
		n0,
		_ARRs,
		0,
		[
			_C,
			_ARU,
			_PPS,
			_SI
		],
		[
			[() => Credentials$, 0],
			() => AssumedRoleUser$,
			1,
			0
		]
	];
	var AssumeRoleWithWebIdentityRequest$ = [
		3,
		n0,
		_ARWWIR,
		0,
		[
			_RA,
			_RSN,
			_WIT,
			_PI,
			_PA,
			_P,
			_DS
		],
		[
			0,
			0,
			[() => clientTokenType, 0],
			0,
			() => policyDescriptorListType,
			0,
			1
		],
		3
	];
	var AssumeRoleWithWebIdentityResponse$ = [
		3,
		n0,
		_ARWWIRs,
		0,
		[
			_C,
			_SFWIT,
			_ARU,
			_PPS,
			_Pr,
			_Au,
			_SI
		],
		[
			[() => Credentials$, 0],
			0,
			() => AssumedRoleUser$,
			1,
			0,
			0,
			0
		]
	];
	var Credentials$ = [
		3,
		n0,
		_C,
		0,
		[
			_AKI,
			_SAK,
			_ST,
			_E
		],
		[
			0,
			[() => accessKeySecretType, 0],
			0,
			4
		],
		4
	];
	var PolicyDescriptorType$ = [
		3,
		n0,
		_PDT,
		0,
		[_a],
		[0]
	];
	var ProvidedContext$ = [
		3,
		n0,
		_PCr,
		0,
		[_PAr, _CA],
		[0, 0]
	];
	var Tag$ = [
		3,
		n0,
		_Ta,
		0,
		[_K, _V],
		[0, 0],
		2
	];
	var policyDescriptorListType = [
		1,
		n0,
		_pDLT,
		0,
		() => PolicyDescriptorType$
	];
	var ProvidedContextsListType = [
		1,
		n0,
		_PCLT,
		0,
		() => ProvidedContext$
	];
	var tagListType = [
		1,
		n0,
		_tLT,
		0,
		() => Tag$
	];
	var AssumeRole$ = [
		9,
		n0,
		_AR,
		0,
		() => AssumeRoleRequest$,
		() => AssumeRoleResponse$
	];
	var AssumeRoleWithWebIdentity$ = [
		9,
		n0,
		_ARWWI,
		0,
		() => AssumeRoleWithWebIdentityRequest$,
		() => AssumeRoleWithWebIdentityResponse$
	];
	var getRuntimeConfig$1 = (config) => {
		return {
			apiVersion: "2011-06-15",
			base64Decoder: config?.base64Decoder ?? fromBase64,
			base64Encoder: config?.base64Encoder ?? toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSTSHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [
				{
					schemeId: "aws.auth#sigv4",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
					signer: new AwsSdkSigV4Signer()
				},
				{
					schemeId: "aws.auth#sigv4a",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
					signer: new AwsSdkSigV4ASigner()
				},
				{
					schemeId: "smithy.api#noAuth",
					identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
					signer: new NoAuthSigner()
				}
			],
			logger: config?.logger ?? new NoOpLogger(),
			protocol: config?.protocol ?? AwsQueryProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.sts",
				errorTypeRegistries,
				xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
				version: "2011-06-15",
				serviceTarget: "AWSSecurityTokenServiceV20110615"
			},
			serviceId: config?.serviceId ?? "STS",
			signerConstructor: config?.signerConstructor ?? SignatureV4MultiRegion,
			urlParser: config?.urlParser ?? parseUrl,
			utf8Decoder: config?.utf8Decoder ?? fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? toUtf8
		};
	};
	var getRuntimeConfig = (config) => {
		emitWarningIfUnsupportedVersion(process.version);
		const defaultsMode = resolveDefaultsModeConfig(config);
		const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
		const clientSharedValues = getRuntimeConfig$1(config);
		emitWarningIfUnsupportedVersion$1(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? loadConfig(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({
				serviceId: clientSharedValues.serviceId,
				clientVersion: packageInfo.version
			}),
			httpAuthSchemes: config?.httpAuthSchemes ?? [
				{
					schemeId: "aws.auth#sigv4",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
					signer: new AwsSdkSigV4Signer()
				},
				{
					schemeId: "aws.auth#sigv4a",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
					signer: new AwsSdkSigV4ASigner()
				},
				{
					schemeId: "smithy.api#noAuth",
					identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
					signer: new NoAuthSigner()
				}
			],
			maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, {
				...NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? loadConfig({
				...NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
			sigv4aSigningRegionSet: config?.sigv4aSigningRegionSet ?? loadConfig(NODE_SIGV4A_CONFIG_OPTIONS, loaderConfig),
			streamCollector: config?.streamCollector ?? streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
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
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
	};
	var STSClient = class extends Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = getRuntimeConfig(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_8 = resolveRuntimeExtensions(resolveHttpAuthSchemeConfig(resolveEndpointConfig(resolveHostHeaderConfig(resolveRegionConfig(resolveRetryConfig(resolveUserAgentConfig(resolveClientEndpointParameters(_config_0))))))), configuration?.extensions || []);
			this.config = _config_8;
			this.middlewareStack.use(getSchemaSerdePlugin(this.config));
			this.middlewareStack.use(getUserAgentPlugin(this.config));
			this.middlewareStack.use(getRetryPlugin(this.config));
			this.middlewareStack.use(getContentLengthPlugin(this.config));
			this.middlewareStack.use(getHostHeaderPlugin(this.config));
			this.middlewareStack.use(getLoggerPlugin(this.config));
			this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
			this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
				httpAuthSchemeParametersProvider: defaultSTSHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({
					"aws.auth#sigv4": config.credentials,
					"aws.auth#sigv4a": config.credentials
				})
			}));
			this.middlewareStack.use(getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var AssumeRoleCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").sc(AssumeRole$).build() {};
	var AssumeRoleWithWebIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").sc(AssumeRoleWithWebIdentity$).build() {};
	var commands = {
		AssumeRoleCommand,
		AssumeRoleWithWebIdentityCommand
	};
	var STS = class extends STSClient {};
	createAggregatedClient(commands, STS);
	var getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
		if (typeof assumedRoleUser?.Arn === "string") {
			const arnComponents = assumedRoleUser.Arn.split(":");
			if (arnComponents.length > 4 && arnComponents[4] !== "") return arnComponents[4];
		}
	};
	var resolveRegion = async (_region, _parentRegion, credentialProviderLogger, loaderConfig = {}) => {
		const region = typeof _region === "function" ? await _region() : _region;
		const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
		let stsDefaultRegion = "";
		const resolvedRegion = region ?? parentRegion ?? (stsDefaultRegion = await stsRegionDefaultResolver(loaderConfig)());
		credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (credential provider clientConfig)`, `${parentRegion} (contextual client)`, `${stsDefaultRegion} (STS default: AWS_REGION, profile region, or us-east-1)`);
		return resolvedRegion;
	};
	var getDefaultRoleAssumer$1 = (stsOptions, STSClient) => {
		let stsClient;
		let closureSourceCreds;
		return async (sourceCreds, params) => {
			closureSourceCreds = sourceCreds;
			if (!stsClient) {
				const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
				const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
					logger,
					profile
				});
				const isCompatibleRequestHandler = !isH2(requestHandler);
				stsClient = new STSClient({
					...stsOptions,
					userAgentAppId,
					profile,
					credentialDefaultProvider: () => async () => closureSourceCreds,
					region: resolvedRegion,
					requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
					logger
				});
			}
			const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleCommand(params));
			if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
			const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
			const credentials = {
				accessKeyId: Credentials.AccessKeyId,
				secretAccessKey: Credentials.SecretAccessKey,
				sessionToken: Credentials.SessionToken,
				expiration: Credentials.Expiration,
				...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
				...accountId && { accountId }
			};
			setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
			return credentials;
		};
	};
	var getDefaultRoleAssumerWithWebIdentity$1 = (stsOptions, STSClient) => {
		let stsClient;
		return async (params) => {
			if (!stsClient) {
				const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
				const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
					logger,
					profile
				});
				const isCompatibleRequestHandler = !isH2(requestHandler);
				stsClient = new STSClient({
					...stsOptions,
					userAgentAppId,
					profile,
					region: resolvedRegion,
					requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
					logger
				});
			}
			const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
			if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
			const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
			const credentials = {
				accessKeyId: Credentials.AccessKeyId,
				secretAccessKey: Credentials.SecretAccessKey,
				sessionToken: Credentials.SessionToken,
				expiration: Credentials.Expiration,
				...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
				...accountId && { accountId }
			};
			if (accountId) setCredentialFeature(credentials, "RESOLVED_ACCOUNT_ID", "T");
			setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
			return credentials;
		};
	};
	var isH2 = (requestHandler) => {
		return requestHandler?.metadata?.handlerProtocol === "h2";
	};
	var getCustomizableStsClientCtor = (baseCtor, customizations) => {
		if (!customizations) return baseCtor;
		else return class CustomizableSTSClient extends baseCtor {
			constructor(config) {
				super(config);
				for (const customization of customizations) this.middlewareStack.use(customization);
			}
		};
	};
	var getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumer$1(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
	var getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity$1(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
	var decorateDefaultCredentialProvider = (provider) => (input) => provider({
		roleAssumer: getDefaultRoleAssumer(input),
		roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input),
		...input
	});
	exports.AssumeRole$ = AssumeRole$;
	exports.AssumeRoleCommand = AssumeRoleCommand;
	exports.AssumeRoleRequest$ = AssumeRoleRequest$;
	exports.AssumeRoleResponse$ = AssumeRoleResponse$;
	exports.AssumeRoleWithWebIdentity$ = AssumeRoleWithWebIdentity$;
	exports.AssumeRoleWithWebIdentityCommand = AssumeRoleWithWebIdentityCommand;
	exports.AssumeRoleWithWebIdentityRequest$ = AssumeRoleWithWebIdentityRequest$;
	exports.AssumeRoleWithWebIdentityResponse$ = AssumeRoleWithWebIdentityResponse$;
	exports.AssumedRoleUser$ = AssumedRoleUser$;
	exports.Credentials$ = Credentials$;
	exports.ExpiredTokenException = ExpiredTokenException;
	exports.ExpiredTokenException$ = ExpiredTokenException$;
	exports.IDPCommunicationErrorException = IDPCommunicationErrorException;
	exports.IDPCommunicationErrorException$ = IDPCommunicationErrorException$;
	exports.IDPRejectedClaimException = IDPRejectedClaimException;
	exports.IDPRejectedClaimException$ = IDPRejectedClaimException$;
	exports.InvalidIdentityTokenException = InvalidIdentityTokenException;
	exports.InvalidIdentityTokenException$ = InvalidIdentityTokenException$;
	exports.MalformedPolicyDocumentException = MalformedPolicyDocumentException;
	exports.MalformedPolicyDocumentException$ = MalformedPolicyDocumentException$;
	exports.PackedPolicyTooLargeException = PackedPolicyTooLargeException;
	exports.PackedPolicyTooLargeException$ = PackedPolicyTooLargeException$;
	exports.PolicyDescriptorType$ = PolicyDescriptorType$;
	exports.ProvidedContext$ = ProvidedContext$;
	exports.RegionDisabledException = RegionDisabledException;
	exports.RegionDisabledException$ = RegionDisabledException$;
	exports.STS = STS;
	exports.STSClient = STSClient;
	exports.STSServiceException = STSServiceException;
	exports.STSServiceException$ = STSServiceException$;
	exports.Tag$ = Tag$;
	exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
	exports.errorTypeRegistries = errorTypeRegistries;
	exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
	exports.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
}));
//#endregion
export { require_sso_oidc as n, require_signin as r, require_sts as t };
