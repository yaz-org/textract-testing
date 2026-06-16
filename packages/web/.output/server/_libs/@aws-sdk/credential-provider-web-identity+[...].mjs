import { o as __toESM, r as __exportAll } from "../../_runtime.mjs";
import { a as require_client, f as require_config } from "./checksums+[...].mjs";
import { readFileSync } from "node:fs";
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-web-identity@3.972.53/node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromWebToken.js
var import_config = require_config();
var import_client = require_client();
var fromWebToken = (init) => async (awsIdentityProperties) => {
	init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
	const { roleArn, roleSessionName, webIdentityToken, providerId, policyArns, policy, durationSeconds } = init;
	let { roleAssumerWithWebIdentity } = init;
	if (!roleAssumerWithWebIdentity) {
		const { getDefaultRoleAssumerWithWebIdentity } = await import("../aws-sdk__nested-clients.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		roleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity({
			...init.clientConfig,
			credentialProviderLogger: init.logger,
			parentClientConfig: {
				...awsIdentityProperties?.callerClientConfig,
				...init.parentClientConfig
			}
		}, init.clientPlugins);
	}
	return roleAssumerWithWebIdentity({
		RoleArn: roleArn,
		RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
		WebIdentityToken: webIdentityToken,
		ProviderId: providerId,
		PolicyArns: policyArns,
		Policy: policy,
		DurationSeconds: durationSeconds
	});
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-web-identity@3.972.53/node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromTokenFile.js
var ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
var ENV_ROLE_ARN = "AWS_ROLE_ARN";
var ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
var fromTokenFile = (init = {}) => async (awsIdentityProperties) => {
	init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
	const webIdentityTokenFile = init?.webIdentityTokenFile ?? process.env[ENV_TOKEN_FILE];
	const roleArn = init?.roleArn ?? process.env[ENV_ROLE_ARN];
	const roleSessionName = init?.roleSessionName ?? process.env[ENV_ROLE_SESSION_NAME];
	if (!webIdentityTokenFile || !roleArn) throw new import_config.CredentialsProviderError("Web identity configuration not specified", { logger: init.logger });
	const credentials = await fromWebToken({
		...init,
		webIdentityToken: import_config.externalDataInterceptor?.getTokenRecord?.()[webIdentityTokenFile] ?? readFileSync(webIdentityTokenFile, { encoding: "ascii" }),
		roleArn,
		roleSessionName
	})(awsIdentityProperties);
	if (webIdentityTokenFile === process.env[ENV_TOKEN_FILE]) (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
	return credentials;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-web-identity@3.972.53/node_modules/@aws-sdk/credential-provider-web-identity/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({
	fromTokenFile: () => fromTokenFile,
	fromWebToken: () => fromWebToken
});
//#endregion
export { dist_es_exports as t };
