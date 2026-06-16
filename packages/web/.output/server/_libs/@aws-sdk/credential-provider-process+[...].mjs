import { r as __exportAll } from "../../_runtime.mjs";
import { a as require_client, f as require_config } from "./checksums+[...].mjs";
import { exec } from "node:child_process";
import { promisify } from "node:util";
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-process@3.972.47/node_modules/@aws-sdk/credential-provider-process/dist-es/getValidatedProcessCredentials.js
var import_config = require_config();
var import_client = require_client();
var getValidatedProcessCredentials = (profileName, data, profiles) => {
	if (data.Version !== 1) throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
	if (data.AccessKeyId === void 0 || data.SecretAccessKey === void 0) throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
	if (data.Expiration) {
		const currentTime = /* @__PURE__ */ new Date();
		if (new Date(data.Expiration) < currentTime) throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
	}
	let accountId = data.AccountId;
	if (!accountId && profiles?.[profileName]?.aws_account_id) accountId = profiles[profileName].aws_account_id;
	const credentials = {
		accessKeyId: data.AccessKeyId,
		secretAccessKey: data.SecretAccessKey,
		...data.SessionToken && { sessionToken: data.SessionToken },
		...data.Expiration && { expiration: new Date(data.Expiration) },
		...data.CredentialScope && { credentialScope: data.CredentialScope },
		...accountId && { accountId }
	};
	(0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_PROCESS", "w");
	return credentials;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-process@3.972.47/node_modules/@aws-sdk/credential-provider-process/dist-es/resolveProcessCredentials.js
var resolveProcessCredentials = async (profileName, profiles, logger) => {
	const profile = profiles[profileName];
	if (profiles[profileName]) {
		const credentialProcess = profile["credential_process"];
		if (credentialProcess !== void 0) {
			const execPromise = promisify(import_config.externalDataInterceptor?.getTokenRecord?.().exec ?? exec);
			try {
				const { stdout } = await execPromise(credentialProcess);
				let data;
				try {
					data = JSON.parse(stdout.trim());
				} catch {
					throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
				}
				return getValidatedProcessCredentials(profileName, data, profiles);
			} catch (error) {
				throw new import_config.CredentialsProviderError(error.message, { logger });
			}
		} else throw new import_config.CredentialsProviderError(`Profile ${profileName} did not contain credential_process.`, { logger });
	} else throw new import_config.CredentialsProviderError(`Profile ${profileName} could not be found in shared credentials file.`, { logger });
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-process@3.972.47/node_modules/@aws-sdk/credential-provider-process/dist-es/fromProcess.js
var fromProcess = (init = {}) => async ({ callerClientConfig } = {}) => {
	init.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
	const profiles = await (0, import_config.parseKnownFiles)(init);
	return resolveProcessCredentials((0, import_config.getProfileName)({ profile: init.profile ?? callerClientConfig?.profile }), profiles, init.logger);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+credential-provider-process@3.972.47/node_modules/@aws-sdk/credential-provider-process/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({ fromProcess: () => fromProcess });
//#endregion
export { dist_es_exports as t };
