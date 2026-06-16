import { a as __toCommonJS, o as __toESM, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { a as require_client, c as require_protocols, d as require_endpoints, f as require_config, m as require_schema, o as require_dist_cjs, p as require_client$1, s as require_retry, u as require_serde } from "./checksums+[...].mjs";
import { c as require_httpAuthSchemes, h as init_dist_es, m as dist_es_exports$1, s as require_protocols$1 } from "./client-dynamodb+[...].mjs";
import { promises } from "node:fs";
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-sso@3.972.53/node_modules/@aws-sdk/credential-provider-sso/dist-es/isSsoProfile.js
var import_config = require_config();
var isSsoProfile = (arg) => arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_session === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");
var REFRESH_MESSAGE = `To refresh this SSO session run 'aws sso login' with the corresponding profile.`;
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+token-providers@3.1069.0/node_modules/@aws-sdk/token-providers/dist-es/getSsoOidcClient.js
var getSsoOidcClient = async (ssoRegion, init = {}, callerClientConfig) => {
	const { SSOOIDCClient } = await import("../aws-sdk__nested-clients.mjs").then((n) => /* @__PURE__ */ __toESM(n.n()));
	const coalesce = (prop) => init.clientConfig?.[prop] ?? init.parentClientConfig?.[prop] ?? callerClientConfig?.[prop];
	return new SSOOIDCClient(Object.assign({}, init.clientConfig ?? {}, {
		region: ssoRegion ?? init.clientConfig?.region,
		logger: coalesce("logger"),
		userAgentAppId: coalesce("userAgentAppId")
	}));
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+token-providers@3.1069.0/node_modules/@aws-sdk/token-providers/dist-es/getNewSsoOidcToken.js
var getNewSsoOidcToken = async (ssoToken, ssoRegion, init = {}, callerClientConfig) => {
	const { CreateTokenCommand } = await import("../aws-sdk__nested-clients.mjs").then((n) => /* @__PURE__ */ __toESM(n.n()));
	return (await getSsoOidcClient(ssoRegion, init, callerClientConfig)).send(new CreateTokenCommand({
		clientId: ssoToken.clientId,
		clientSecret: ssoToken.clientSecret,
		refreshToken: ssoToken.refreshToken,
		grantType: "refresh_token"
	}));
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+token-providers@3.1069.0/node_modules/@aws-sdk/token-providers/dist-es/validateTokenExpiry.js
var validateTokenExpiry = (token) => {
	if (token.expiration && token.expiration.getTime() < Date.now()) throw new import_config.TokenProviderError(`Token is expired. ${REFRESH_MESSAGE}`, false);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+token-providers@3.1069.0/node_modules/@aws-sdk/token-providers/dist-es/validateTokenKey.js
var validateTokenKey = (key, value, forRefresh = false) => {
	if (typeof value === "undefined") throw new import_config.TokenProviderError(`Value not present for '${key}' in SSO Token${forRefresh ? ". Cannot refresh" : ""}. ${REFRESH_MESSAGE}`, false);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+token-providers@3.1069.0/node_modules/@aws-sdk/token-providers/dist-es/writeSSOTokenToFile.js
var { writeFile } = promises;
var writeSSOTokenToFile = (id, ssoToken) => {
	return writeFile((0, import_config.getSSOTokenFilepath)(id), JSON.stringify(ssoToken, null, 2));
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+token-providers@3.1069.0/node_modules/@aws-sdk/token-providers/dist-es/fromSso.js
var lastRefreshAttemptTime = /* @__PURE__ */ new Date(0);
var fromSso = (init = {}) => async ({ callerClientConfig } = {}) => {
	init.logger?.debug("@aws-sdk/token-providers - fromSso");
	const profiles = await (0, import_config.parseKnownFiles)(init);
	const profileName = (0, import_config.getProfileName)({ profile: init.profile ?? callerClientConfig?.profile });
	const profile = profiles[profileName];
	if (!profile) throw new import_config.TokenProviderError(`Profile '${profileName}' could not be found in shared credentials file.`, false);
	else if (!profile["sso_session"]) throw new import_config.TokenProviderError(`Profile '${profileName}' is missing required property 'sso_session'.`);
	const ssoSessionName = profile["sso_session"];
	const ssoSession = (await (0, import_config.loadSsoSessionData)(init))[ssoSessionName];
	if (!ssoSession) throw new import_config.TokenProviderError(`Sso session '${ssoSessionName}' could not be found in shared credentials file.`, false);
	for (const ssoSessionRequiredKey of ["sso_start_url", "sso_region"]) if (!ssoSession[ssoSessionRequiredKey]) throw new import_config.TokenProviderError(`Sso session '${ssoSessionName}' is missing required property '${ssoSessionRequiredKey}'.`, false);
	ssoSession["sso_start_url"];
	const ssoRegion = ssoSession["sso_region"];
	let ssoToken;
	try {
		ssoToken = await (0, import_config.getSSOTokenFromFile)(ssoSessionName);
	} catch (e) {
		throw new import_config.TokenProviderError(`The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`, false);
	}
	validateTokenKey("accessToken", ssoToken.accessToken);
	validateTokenKey("expiresAt", ssoToken.expiresAt);
	const { accessToken, expiresAt } = ssoToken;
	const existingToken = {
		token: accessToken,
		expiration: new Date(expiresAt)
	};
	if (existingToken.expiration.getTime() - Date.now() > 3e5) return existingToken;
	if (Date.now() - lastRefreshAttemptTime.getTime() < 30 * 1e3) {
		validateTokenExpiry(existingToken);
		return existingToken;
	}
	validateTokenKey("clientId", ssoToken.clientId, true);
	validateTokenKey("clientSecret", ssoToken.clientSecret, true);
	validateTokenKey("refreshToken", ssoToken.refreshToken, true);
	try {
		lastRefreshAttemptTime.setTime(Date.now());
		const newSsoOidcToken = await getNewSsoOidcToken(ssoToken, ssoRegion, init, callerClientConfig);
		validateTokenKey("accessToken", newSsoOidcToken.accessToken);
		validateTokenKey("expiresIn", newSsoOidcToken.expiresIn);
		const newTokenExpiration = new Date(Date.now() + newSsoOidcToken.expiresIn * 1e3);
		try {
			await writeSSOTokenToFile(ssoSessionName, {
				...ssoToken,
				accessToken: newSsoOidcToken.accessToken,
				expiresAt: newTokenExpiration.toISOString(),
				refreshToken: newSsoOidcToken.refreshToken
			});
		} catch (error) {}
		return {
			token: newSsoOidcToken.accessToken,
			expiration: newTokenExpiration
		};
	} catch (error) {
		validateTokenExpiry(existingToken);
		return existingToken;
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-sso@3.972.53/node_modules/@aws-sdk/credential-provider-sso/dist-es/resolveSSOCredentials.js
var import_client = require_client();
var SHOULD_FAIL_CREDENTIAL_CHAIN = false;
var resolveSSOCredentials = async ({ ssoStartUrl, ssoSession, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, clientConfig, parentClientConfig, callerClientConfig, profile, filepath, configFilepath, ignoreCache, logger }) => {
	let token;
	const refreshMessage = `To refresh this SSO session run aws sso login with the corresponding profile.`;
	if (ssoSession) try {
		const _token = await fromSso({
			profile,
			filepath,
			configFilepath,
			ignoreCache,
			clientConfig,
			parentClientConfig,
			logger
		})({ callerClientConfig });
		token = {
			accessToken: _token.token,
			expiresAt: new Date(_token.expiration).toISOString()
		};
	} catch (e) {
		throw new import_config.CredentialsProviderError(e.message, {
			tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
			logger
		});
	}
	else try {
		token = await (0, import_config.getSSOTokenFromFile)(ssoStartUrl);
	} catch (e) {
		throw new import_config.CredentialsProviderError(`The SSO session associated with this profile is invalid. ${refreshMessage}`, {
			tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
			logger
		});
	}
	if (new Date(token.expiresAt).getTime() - Date.now() <= 0) throw new import_config.CredentialsProviderError(`The SSO session associated with this profile has expired. ${refreshMessage}`, {
		tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
		logger
	});
	const { accessToken } = token;
	const { SSOClient, GetRoleCredentialsCommand } = await Promise.resolve().then(() => loadSso_exports);
	const sso = ssoClient || new SSOClient(Object.assign({}, clientConfig ?? {}, {
		logger: clientConfig?.logger ?? callerClientConfig?.logger ?? parentClientConfig?.logger,
		region: clientConfig?.region ?? ssoRegion,
		userAgentAppId: clientConfig?.userAgentAppId ?? callerClientConfig?.userAgentAppId ?? parentClientConfig?.userAgentAppId
	}));
	let ssoResp;
	try {
		ssoResp = await sso.send(new GetRoleCredentialsCommand({
			accountId: ssoAccountId,
			roleName: ssoRoleName,
			accessToken
		}));
	} catch (e) {
		throw new import_config.CredentialsProviderError(e, {
			tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
			logger
		});
	}
	const { roleCredentials: { accessKeyId, secretAccessKey, sessionToken, expiration, credentialScope, accountId } = {} } = ssoResp;
	if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) throw new import_config.CredentialsProviderError("SSO returns an invalid temporary credential.", {
		tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
		logger
	});
	const credentials = {
		accessKeyId,
		secretAccessKey,
		sessionToken,
		expiration: new Date(expiration),
		...credentialScope && { credentialScope },
		...accountId && { accountId }
	};
	if (ssoSession) (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_SSO", "s");
	else (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_SSO_LEGACY", "u");
	return credentials;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-sso@3.972.53/node_modules/@aws-sdk/credential-provider-sso/dist-es/validateSsoProfile.js
var validateSsoProfile = (profile, logger) => {
	const { sso_start_url, sso_account_id, sso_region, sso_role_name } = profile;
	if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) throw new import_config.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(profile).join(", ")}\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
		tryNextLink: false,
		logger
	});
	return profile;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-sso@3.972.53/node_modules/@aws-sdk/credential-provider-sso/dist-es/fromSSO.js
var fromSSO = (init = {}) => async ({ callerClientConfig } = {}) => {
	init.logger?.debug("@aws-sdk/credential-provider-sso - fromSSO");
	const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
	const { ssoClient } = init;
	const profileName = (0, import_config.getProfileName)({ profile: init.profile ?? callerClientConfig?.profile });
	if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
		const profile = (await (0, import_config.parseKnownFiles)(init))[profileName];
		if (!profile) throw new import_config.CredentialsProviderError(`Profile ${profileName} was not found.`, { logger: init.logger });
		if (!isSsoProfile(profile)) throw new import_config.CredentialsProviderError(`Profile ${profileName} is not configured with SSO credentials.`, { logger: init.logger });
		if (profile?.sso_session) {
			const session = (await (0, import_config.loadSsoSessionData)(init))[profile.sso_session];
			const conflictMsg = ` configurations in profile ${profileName} and sso-session ${profile.sso_session}`;
			if (ssoRegion && ssoRegion !== session.sso_region) throw new import_config.CredentialsProviderError(`Conflicting SSO region` + conflictMsg, {
				tryNextLink: false,
				logger: init.logger
			});
			if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) throw new import_config.CredentialsProviderError(`Conflicting SSO start_url` + conflictMsg, {
				tryNextLink: false,
				logger: init.logger
			});
			profile.sso_region = session.sso_region;
			profile.sso_start_url = session.sso_start_url;
		}
		const { sso_start_url, sso_account_id, sso_region, sso_role_name, sso_session } = validateSsoProfile(profile, init.logger);
		return resolveSSOCredentials({
			ssoStartUrl: sso_start_url,
			ssoSession: sso_session,
			ssoAccountId: sso_account_id,
			ssoRegion: sso_region,
			ssoRoleName: sso_role_name,
			ssoClient,
			clientConfig: init.clientConfig,
			parentClientConfig: init.parentClientConfig,
			callerClientConfig: init.callerClientConfig,
			profile: profileName,
			filepath: init.filepath,
			configFilepath: init.configFilepath,
			ignoreCache: init.ignoreCache,
			logger: init.logger
		});
	} else if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) throw new import_config.CredentialsProviderError("Incomplete configuration. The fromSSO() argument hash must include \"ssoStartUrl\", \"ssoAccountId\", \"ssoRegion\", \"ssoRoleName\"", {
		tryNextLink: false,
		logger: init.logger
	});
	else return resolveSSOCredentials({
		ssoStartUrl,
		ssoSession,
		ssoAccountId,
		ssoRegion,
		ssoRoleName,
		ssoClient,
		clientConfig: init.clientConfig,
		parentClientConfig: init.parentClientConfig,
		callerClientConfig: init.callerClientConfig,
		profile: profileName,
		filepath: init.filepath,
		configFilepath: init.configFilepath,
		ignoreCache: init.ignoreCache,
		logger: init.logger
	});
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-sso@3.972.53/node_modules/@aws-sdk/credential-provider-sso/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({
	fromSSO: () => fromSSO,
	isSsoProfile: () => isSsoProfile,
	validateSsoProfile: () => validateSsoProfile
});
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+nested-clients@3.997.21/node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/index.js
var require_sso = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { awsEndpointFunctions, emitWarningIfUnsupportedVersion: emitWarningIfUnsupportedVersion$1, createDefaultUserAgentProvider, NODE_APP_ID_CONFIG_OPTIONS, getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration, resolveUserAgentConfig, resolveHostHeaderConfig, getUserAgentPlugin, getHostHeaderPlugin, getLoggerPlugin, getRecursionDetectionPlugin } = require_client();
	var { NoAuthSigner, getHttpAuthSchemeEndpointRuleSetPlugin, DefaultIdentityProviderConfig, getHttpSigningPlugin } = require_dist_cjs();
	var { normalizeProvider, getSmithyContext, ServiceException, NoOpLogger, emitWarningIfUnsupportedVersion, loadConfigsForDefaultMode, getDefaultExtensionConfiguration, resolveDefaultRuntimeConfig, Client, Command, createAggregatedClient } = require_client$1();
	var { resolveDefaultsModeConfig, loadConfig, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS, resolveRegionConfig } = require_config();
	var { BinaryDecisionDiagram, EndpointCache, decideEndpoint, customEndpointFunctions, resolveEndpointConfig, getEndpointPlugin } = require_endpoints();
	var { parseUrl, getHttpHandlerExtensionConfiguration, resolveHttpHandlerRuntimeConfig, getContentLengthPlugin } = require_protocols();
	var { DEFAULT_RETRY_MODE, NODE_RETRY_MODE_CONFIG_OPTIONS, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, resolveRetryConfig, getRetryPlugin } = require_retry();
	var { TypeRegistry, getSchemaSerdePlugin } = require_schema();
	var { resolveAwsSdkSigV4Config, AwsSdkSigV4Signer, NODE_AUTH_SCHEME_PREFERENCE_OPTIONS } = require_httpAuthSchemes();
	var { toUtf8, fromUtf8, toBase64, fromBase64, Hash, calculateBodyLength } = require_serde();
	var { streamCollector, NodeHttpHandler } = (init_dist_es(), __toCommonJS(dist_es_exports$1));
	var { AwsRestJsonProtocol } = require_protocols$1();
	var defaultSSOHttpAuthSchemeParametersProvider = async (config, context, input) => {
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
				name: "awsssoportal",
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
	var defaultSSOHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "GetRoleCredentials":
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
			defaultSigningName: "awsssoportal"
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
			["https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://portal.sso.{Region}.amazonaws.com", i],
			["https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}", i],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			["https://portal.sso.{Region}.{PartitionResult#dnsSuffix}", i],
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
	var SSOServiceException = class SSOServiceException extends ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SSOServiceException.prototype);
		}
	};
	var InvalidRequestException = class InvalidRequestException extends SSOServiceException {
		name = "InvalidRequestException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "InvalidRequestException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidRequestException.prototype);
		}
	};
	var ResourceNotFoundException = class ResourceNotFoundException extends SSOServiceException {
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
	var TooManyRequestsException = class TooManyRequestsException extends SSOServiceException {
		name = "TooManyRequestsException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "TooManyRequestsException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, TooManyRequestsException.prototype);
		}
	};
	var UnauthorizedException = class UnauthorizedException extends SSOServiceException {
		name = "UnauthorizedException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "UnauthorizedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnauthorizedException.prototype);
		}
	};
	var _ATT = "AccessTokenType";
	var _GRC = "GetRoleCredentials";
	var _GRCR = "GetRoleCredentialsRequest";
	var _GRCRe = "GetRoleCredentialsResponse";
	var _IRE = "InvalidRequestException";
	var _RC = "RoleCredentials";
	var _RNFE = "ResourceNotFoundException";
	var _SAKT = "SecretAccessKeyType";
	var _STT = "SessionTokenType";
	var _TMRE = "TooManyRequestsException";
	var _UE = "UnauthorizedException";
	var _aI = "accountId";
	var _aKI = "accessKeyId";
	var _aT = "accessToken";
	var _ai = "account_id";
	var _c = "client";
	var _e = "error";
	var _ex = "expiration";
	var _h = "http";
	var _hE = "httpError";
	var _hH = "httpHeader";
	var _hQ = "httpQuery";
	var _m = "message";
	var _rC = "roleCredentials";
	var _rN = "roleName";
	var _rn = "role_name";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.sso";
	var _sAK = "secretAccessKey";
	var _sT = "sessionToken";
	var _xasbt = "x-amz-sso_bearer_token";
	var n0 = "com.amazonaws.sso";
	var _s_registry = TypeRegistry.for(_s);
	var SSOServiceException$ = [
		-3,
		_s,
		"SSOServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(SSOServiceException$, SSOServiceException);
	var n0_registry = TypeRegistry.for(n0);
	var InvalidRequestException$ = [
		-3,
		n0,
		_IRE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(InvalidRequestException$, InvalidRequestException);
	var ResourceNotFoundException$ = [
		-3,
		n0,
		_RNFE,
		{
			[_e]: _c,
			[_hE]: 404
		},
		[_m],
		[0]
	];
	n0_registry.registerError(ResourceNotFoundException$, ResourceNotFoundException);
	var TooManyRequestsException$ = [
		-3,
		n0,
		_TMRE,
		{
			[_e]: _c,
			[_hE]: 429
		},
		[_m],
		[0]
	];
	n0_registry.registerError(TooManyRequestsException$, TooManyRequestsException);
	var UnauthorizedException$ = [
		-3,
		n0,
		_UE,
		{
			[_e]: _c,
			[_hE]: 401
		},
		[_m],
		[0]
	];
	n0_registry.registerError(UnauthorizedException$, UnauthorizedException);
	var errorTypeRegistries = [_s_registry, n0_registry];
	var AccessTokenType = [
		0,
		n0,
		_ATT,
		8,
		0
	];
	var SecretAccessKeyType = [
		0,
		n0,
		_SAKT,
		8,
		0
	];
	var SessionTokenType = [
		0,
		n0,
		_STT,
		8,
		0
	];
	var GetRoleCredentialsRequest$ = [
		3,
		n0,
		_GRCR,
		0,
		[
			_rN,
			_aI,
			_aT
		],
		[
			[0, { [_hQ]: _rn }],
			[0, { [_hQ]: _ai }],
			[() => AccessTokenType, { [_hH]: _xasbt }]
		],
		3
	];
	var GetRoleCredentialsResponse$ = [
		3,
		n0,
		_GRCRe,
		0,
		[_rC],
		[[() => RoleCredentials$, 0]]
	];
	var RoleCredentials$ = [
		3,
		n0,
		_RC,
		0,
		[
			_aKI,
			_sAK,
			_sT,
			_ex
		],
		[
			0,
			[() => SecretAccessKeyType, 0],
			[() => SessionTokenType, 0],
			1
		]
	];
	var GetRoleCredentials$ = [
		9,
		n0,
		_GRC,
		{ [_h]: [
			"GET",
			"/federation/credentials",
			200
		] },
		() => GetRoleCredentialsRequest$,
		() => GetRoleCredentialsResponse$
	];
	var getRuntimeConfig$1 = (config) => {
		return {
			apiVersion: "2019-06-10",
			base64Decoder: config?.base64Decoder ?? fromBase64,
			base64Encoder: config?.base64Encoder ?? toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSSOHttpAuthSchemeProvider,
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
				defaultNamespace: "com.amazonaws.sso",
				errorTypeRegistries,
				version: "2019-06-10",
				serviceTarget: "SWBPortalService"
			},
			serviceId: config?.serviceId ?? "SSO",
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
	var SSOClient = class extends Client {
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
				httpAuthSchemeParametersProvider: defaultSSOHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var GetRoleCredentialsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").sc(GetRoleCredentials$).build() {};
	var commands = { GetRoleCredentialsCommand };
	var SSO = class extends SSOClient {};
	createAggregatedClient(commands, SSO);
	exports.GetRoleCredentialsCommand = GetRoleCredentialsCommand;
	exports.SSOClient = SSOClient;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-sso@3.972.53/node_modules/@aws-sdk/credential-provider-sso/dist-es/loadSso.js
var loadSso_exports = /* @__PURE__ */ __exportAll({
	GetRoleCredentialsCommand: () => import_sso.GetRoleCredentialsCommand,
	SSOClient: () => import_sso.SSOClient
});
var import_sso = require_sso();
//#endregion
export { dist_es_exports as t };
