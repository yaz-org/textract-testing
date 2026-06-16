import { a as require_client, o as require_dist_cjs, p as require_client$1 } from "./checksums+[...].mjs";
import { i as DeleteItemCommand, n as QueryCommand$1, r as PutItemCommand, t as ScanCommand$1 } from "./client-dynamodb+[...].mjs";
//#region ../../node_modules/.bun/@aws-sdk+util-dynamodb@3.996.5+799a1beffcaf919c/node_modules/@aws-sdk/util-dynamodb/dist-es/NumberValue.js
var NumberValue = class NumberValue {
	value;
	constructor(value) {
		if (typeof value === "object" && "N" in value) this.value = String(value.N);
		else this.value = String(value);
		const valueOf = typeof value.valueOf() === "number" ? value.valueOf() : 0;
		if (valueOf > Number.MAX_SAFE_INTEGER || valueOf < Number.MIN_SAFE_INTEGER || Math.abs(valueOf) === Infinity || Number.isNaN(valueOf)) throw new Error(`NumberValue should not be initialized with an imprecise number=${valueOf}. Use a string instead.`);
	}
	static from(value) {
		return new NumberValue(value);
	}
	toAttributeValue() {
		return { N: this.toString() };
	}
	toBigInt() {
		const stringValue = this.toString();
		return BigInt(stringValue);
	}
	toString() {
		return String(this.value);
	}
	valueOf() {
		return this.toString();
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+util-dynamodb@3.996.5+799a1beffcaf919c/node_modules/@aws-sdk/util-dynamodb/dist-es/convertToAttr.js
var convertToAttr = (data, options) => {
	if (data === void 0) throw new Error(`Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.`);
	else if (data === null && typeof data === "object") return convertToNullAttr();
	else if (Array.isArray(data)) return convertToListAttr(data, options);
	else if (data?.constructor?.name === "Set") return convertToSetAttr(data, options);
	else if (data?.constructor?.name === "Map") return convertToMapAttrFromIterable(data, options);
	else if (data?.constructor?.name === "Object" || !data.constructor && typeof data === "object") return convertToMapAttrFromEnumerableProps(data, options);
	else if (isBinary(data)) {
		if (data.length === 0 && options?.convertEmptyValues) return convertToNullAttr();
		return convertToBinaryAttr(data);
	} else if (typeof data === "boolean" || data?.constructor?.name === "Boolean") return { BOOL: data.valueOf() };
	else if (typeof data === "number" || data?.constructor?.name === "Number") return convertToNumberAttr(data, options);
	else if (data instanceof NumberValue) return data.toAttributeValue();
	else if (typeof data === "bigint") return convertToBigIntAttr(data);
	else if (typeof data === "string" || data?.constructor?.name === "String") {
		if (data.length === 0 && options?.convertEmptyValues) return convertToNullAttr();
		return convertToStringAttr(data);
	} else if (options?.convertClassInstanceToMap && typeof data === "object") return convertToMapAttrFromEnumerableProps(data, options);
	throw new Error(`Unsupported type passed: ${data}. Pass options.convertClassInstanceToMap=true to marshall typeof object as map attribute.`);
};
var convertToListAttr = (data, options) => ({ L: data.filter((item) => typeof item !== "function" && (!options?.removeUndefinedValues || options?.removeUndefinedValues && item !== void 0)).map((item) => convertToAttr(item, options)) });
var convertToSetAttr = (set, options) => {
	const setToOperate = options?.removeUndefinedValues ? new Set([...set].filter((value) => value !== void 0)) : set;
	if (!options?.removeUndefinedValues && setToOperate.has(void 0)) throw new Error(`Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.`);
	if (setToOperate.size === 0) {
		if (options?.convertEmptyValues) return convertToNullAttr();
		throw new Error(`Pass a non-empty set, or options.convertEmptyValues=true.`);
	}
	const item = setToOperate.values().next().value;
	if (item instanceof NumberValue) return { NS: Array.from(setToOperate).map((_) => _.toString()) };
	else if (typeof item === "number") return { NS: Array.from(setToOperate).map((num) => convertToNumberAttr(num, options)).map((item) => item.N) };
	else if (typeof item === "bigint") return { NS: Array.from(setToOperate).map(convertToBigIntAttr).map((item) => item.N) };
	else if (typeof item === "string") return { SS: Array.from(setToOperate).map(convertToStringAttr).map((item) => item.S) };
	else if (isBinary(item)) return { BS: Array.from(setToOperate).map(convertToBinaryAttr).map((item) => item.B) };
	else throw new Error(`Only Number Set (NS), Binary Set (BS) or String Set (SS) are allowed.`);
};
var convertToMapAttrFromIterable = (data, options) => ({ M: ((data) => {
	const map = {};
	for (const [key, value] of data) if (typeof value !== "function" && (value !== void 0 || !options?.removeUndefinedValues)) map[key] = convertToAttr(value, options);
	return map;
})(data) });
var convertToMapAttrFromEnumerableProps = (data, options) => ({ M: ((data) => {
	const map = {};
	for (const key in data) {
		const value = data[key];
		if (typeof value !== "function" && (value !== void 0 || !options?.removeUndefinedValues)) map[key] = convertToAttr(value, options);
	}
	return map;
})(data) });
var convertToNullAttr = () => ({ NULL: true });
var convertToBinaryAttr = (data) => ({ B: data });
var convertToStringAttr = (data) => ({ S: data.toString() });
var convertToBigIntAttr = (data) => ({ N: data.toString() });
var validateBigIntAndThrow = (errorPrefix) => {
	throw new Error(`${errorPrefix} Use NumberValue from @aws-sdk/lib-dynamodb.`);
};
var convertToNumberAttr = (num, options) => {
	if ([
		NaN,
		Number.POSITIVE_INFINITY,
		Number.NEGATIVE_INFINITY
	].map((val) => val.toString()).includes(num.toString())) throw new Error(`Special numeric value ${num.toString()} is not allowed`);
	else if (!options?.allowImpreciseNumbers) {
		if (Number(num) > Number.MAX_SAFE_INTEGER) validateBigIntAndThrow(`Number ${num.toString()} is greater than Number.MAX_SAFE_INTEGER.`);
		else if (Number(num) < Number.MIN_SAFE_INTEGER) validateBigIntAndThrow(`Number ${num.toString()} is lesser than Number.MIN_SAFE_INTEGER.`);
	}
	return { N: num.toString() };
};
var isBinary = (data) => {
	const binaryTypes = [
		"ArrayBuffer",
		"Blob",
		"Buffer",
		"DataView",
		"File",
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array",
		"BigInt64Array",
		"BigUint64Array"
	];
	if (data?.constructor) return binaryTypes.includes(data.constructor.name);
	return false;
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+util-dynamodb@3.996.5+799a1beffcaf919c/node_modules/@aws-sdk/util-dynamodb/dist-es/convertToNative.js
var convertToNative = (data, options) => {
	for (const [key, value] of Object.entries(data)) if (value !== void 0) switch (key) {
		case "NULL": return null;
		case "BOOL": return Boolean(value);
		case "N": return convertNumber(value, options);
		case "B": return convertBinary(value);
		case "S": return convertString(value);
		case "L": return convertList(value, options);
		case "M": return convertMap(value, options);
		case "NS": return new Set(value.map((item) => convertNumber(item, options)));
		case "BS": return new Set(value.map(convertBinary));
		case "SS": return new Set(value.map(convertString));
		default: throw new Error(`Unsupported type passed: ${key}`);
	}
	throw new Error(`No value defined: ${JSON.stringify(data)}`);
};
var convertNumber = (numString, options) => {
	if (typeof options?.wrapNumbers === "function") return options?.wrapNumbers(numString);
	if (options?.wrapNumbers) return NumberValue.from(numString);
	const num = Number(numString);
	const infinityValues = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
	if ((num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) && !infinityValues.includes(num)) if (typeof BigInt === "function") try {
		return BigInt(numString);
	} catch (error) {
		throw new Error(`${numString} can't be converted to BigInt. Set options.wrapNumbers to get string value.`);
	}
	else throw new Error(`${numString} is outside SAFE_INTEGER bounds. Set options.wrapNumbers to get string value.`);
	return num;
};
var convertString = (stringValue) => stringValue;
var convertBinary = (binaryValue) => binaryValue;
var convertList = (list, options) => list.map((item) => convertToNative(item, options));
var convertMap = (map, options) => Object.entries(map).reduce((acc, [key, value]) => (acc[key] = convertToNative(value, options), acc), {});
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+util-dynamodb@3.996.5+799a1beffcaf919c/node_modules/@aws-sdk/util-dynamodb/dist-es/marshall.js
function marshall(data, options) {
	const attributeValue = convertToAttr(data, options);
	const [key, value] = Object.entries(attributeValue)[0];
	switch (key) {
		case "M":
		case "L": return options?.convertTopLevelContainer ? attributeValue : value;
		default: return attributeValue;
	}
}
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+util-dynamodb@3.996.5+799a1beffcaf919c/node_modules/@aws-sdk/util-dynamodb/dist-es/unmarshall.js
var unmarshall = (data, options) => {
	if (options?.convertWithoutMapWrapper) return convertToNative(data, options);
	return convertToNative({ M: data }, options);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/utils.js
var import_client$1 = require_client$1();
var import_client = require_client();
var ALL_VALUES = {};
var ALL_MEMBERS = [];
var NEXT_LEVEL = "*";
var processObj = (obj, processFunc, keyNodes) => {
	if (obj !== void 0) if (keyNodes == null) return processFunc(obj);
	else {
		const keys = Object.keys(keyNodes);
		const goToNextLevel = keys.length === 1 && keys[0] === NEXT_LEVEL;
		const someChildren = keys.length >= 1 && !goToNextLevel;
		const allChildren = keys.length === 0;
		if (someChildren) return processKeysInObj(obj, processFunc, keyNodes);
		else if (allChildren) return processAllKeysInObj(obj, processFunc, null);
		else if (goToNextLevel) return Object.entries(obj ?? {}).reduce((acc, [k, v]) => {
			if (typeof v !== "function") acc[k] = processObj(v, processFunc, keyNodes[NEXT_LEVEL]);
			return acc;
		}, Array.isArray(obj) ? [] : {});
	}
};
var processKeysInObj = (obj, processFunc, keyNodes) => {
	let accumulator;
	if (Array.isArray(obj)) accumulator = obj.filter((item) => typeof item !== "function");
	else {
		accumulator = {};
		for (const [k, v] of Object.entries(obj)) if (typeof v !== "function") accumulator[k] = v;
	}
	for (const [nodeKey, nodes] of Object.entries(keyNodes)) {
		if (typeof obj[nodeKey] === "function") continue;
		const processedValue = processObj(obj[nodeKey], processFunc, nodes);
		if (processedValue !== void 0 && typeof processedValue !== "function") accumulator[nodeKey] = processedValue;
	}
	return accumulator;
};
var processAllKeysInObj = (obj, processFunc, keyNodes) => {
	if (Array.isArray(obj)) return obj.filter((item) => typeof item !== "function").map((item) => processObj(item, processFunc, keyNodes));
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (typeof value === "function") return acc;
		const processedValue = processObj(value, processFunc, keyNodes);
		if (processedValue !== void 0 && typeof processedValue !== "function") acc[key] = processedValue;
		return acc;
	}, {});
};
var marshallInput = (obj, keyNodes, options) => {
	const marshallFunc = (toMarshall) => marshall(toMarshall, options);
	return processKeysInObj(obj, marshallFunc, keyNodes);
};
var unmarshallOutput = (obj, keyNodes, options) => {
	const unmarshallFunc = (toMarshall) => unmarshall(toMarshall, options);
	return processKeysInObj(obj, unmarshallFunc, keyNodes);
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/baseCommand/DynamoDBDocumentClientCommand.js
var DynamoDBDocumentClientCommand = class extends import_client$1.Command {
	addMarshallingMiddleware(configuration) {
		const { marshallOptions = {}, unmarshallOptions = {} } = configuration.translateConfig || {};
		marshallOptions.convertTopLevelContainer = marshallOptions.convertTopLevelContainer ?? true;
		unmarshallOptions.convertWithoutMapWrapper = unmarshallOptions.convertWithoutMapWrapper ?? true;
		this.clientCommand.middlewareStack.addRelativeTo((next, context) => async (args) => {
			(0, import_client.setFeature)(context, "DDB_MAPPER", "d");
			return next({
				...args,
				input: marshallInput(args.input, this.inputKeyNodes, marshallOptions)
			});
		}, {
			name: "DocumentMarshall",
			relation: "before",
			toMiddleware: "serializerMiddleware",
			override: true
		});
		this.clientCommand.middlewareStack.addRelativeTo((next, context) => async (args) => {
			const deserialized = await next(args);
			deserialized.output = unmarshallOutput(deserialized.output, this.outputKeyNodes, unmarshallOptions);
			return deserialized;
		}, {
			name: "DocumentUnmarshall",
			relation: "before",
			toMiddleware: "deserializerMiddleware",
			override: true
		});
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/DeleteCommand.js
var DeleteCommand = class extends DynamoDBDocumentClientCommand {
	input;
	inputKeyNodes = {
		Key: ALL_VALUES,
		Expected: { "*": {
			Value: null,
			AttributeValueList: ALL_MEMBERS
		} },
		ExpressionAttributeValues: ALL_VALUES
	};
	outputKeyNodes = {
		Attributes: ALL_VALUES,
		ItemCollectionMetrics: { ItemCollectionKey: ALL_VALUES }
	};
	clientCommand;
	middlewareStack;
	constructor(input) {
		super();
		this.input = input;
		this.clientCommand = new DeleteItemCommand(this.input);
		this.middlewareStack = this.clientCommand.middlewareStack;
	}
	resolveMiddleware(clientStack, configuration, options) {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
		return async () => handler(this.clientCommand);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/PutCommand.js
var PutCommand = class extends DynamoDBDocumentClientCommand {
	input;
	inputKeyNodes = {
		Item: ALL_VALUES,
		Expected: { "*": {
			Value: null,
			AttributeValueList: ALL_MEMBERS
		} },
		ExpressionAttributeValues: ALL_VALUES
	};
	outputKeyNodes = {
		Attributes: ALL_VALUES,
		ItemCollectionMetrics: { ItemCollectionKey: ALL_VALUES }
	};
	clientCommand;
	middlewareStack;
	constructor(input) {
		super();
		this.input = input;
		this.clientCommand = new PutItemCommand(this.input);
		this.middlewareStack = this.clientCommand.middlewareStack;
	}
	resolveMiddleware(clientStack, configuration, options) {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
		return async () => handler(this.clientCommand);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/QueryCommand.js
var import_dist_cjs = require_dist_cjs();
var QueryCommand = class extends DynamoDBDocumentClientCommand {
	input;
	inputKeyNodes = {
		KeyConditions: { "*": { AttributeValueList: ALL_MEMBERS } },
		QueryFilter: { "*": { AttributeValueList: ALL_MEMBERS } },
		ExclusiveStartKey: ALL_VALUES,
		ExpressionAttributeValues: ALL_VALUES
	};
	outputKeyNodes = {
		Items: { "*": ALL_VALUES },
		LastEvaluatedKey: ALL_VALUES
	};
	clientCommand;
	middlewareStack;
	constructor(input) {
		super();
		this.input = input;
		this.clientCommand = new QueryCommand$1(this.input);
		this.middlewareStack = this.clientCommand.middlewareStack;
	}
	resolveMiddleware(clientStack, configuration, options) {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
		return async () => handler(this.clientCommand);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/ScanCommand.js
var ScanCommand = class extends DynamoDBDocumentClientCommand {
	input;
	inputKeyNodes = {
		ScanFilter: { "*": { AttributeValueList: ALL_MEMBERS } },
		ExclusiveStartKey: ALL_VALUES,
		ExpressionAttributeValues: ALL_VALUES
	};
	outputKeyNodes = {
		Items: { "*": ALL_VALUES },
		LastEvaluatedKey: ALL_VALUES
	};
	clientCommand;
	middlewareStack;
	constructor(input) {
		super();
		this.input = input;
		this.clientCommand = new ScanCommand$1(this.input);
		this.middlewareStack = this.clientCommand.middlewareStack;
	}
	resolveMiddleware(clientStack, configuration, options) {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
		return async () => handler(this.clientCommand);
	}
};
//#endregion
//#region ../../node_modules/.bun/@aws-sdk+lib-dynamodb@3.1070.0+799a1beffcaf919c/node_modules/@aws-sdk/lib-dynamodb/dist-es/DynamoDBDocumentClient.js
var DynamoDBDocumentClient = class DynamoDBDocumentClient extends import_client$1.Client {
	config;
	constructor(client, translateConfig) {
		super(client.config);
		this.config = client.config;
		this.config.translateConfig = translateConfig;
		this.middlewareStack = client.middlewareStack;
		if (this.config?.cacheMiddleware) throw new Error("@aws-sdk/lib-dynamodb - cacheMiddleware=true is not compatible with the DynamoDBDocumentClient. This option must be set to false.");
	}
	static from(client, translateConfig) {
		return new DynamoDBDocumentClient(client, translateConfig);
	}
	destroy() {}
};
(0, import_dist_cjs.createPaginator)(DynamoDBDocumentClient, QueryCommand, "ExclusiveStartKey", "LastEvaluatedKey", "Limit");
(0, import_dist_cjs.createPaginator)(DynamoDBDocumentClient, ScanCommand, "ExclusiveStartKey", "LastEvaluatedKey", "Limit");
//#endregion
export { DeleteCommand as i, ScanCommand as n, PutCommand as r, DynamoDBDocumentClient as t };
