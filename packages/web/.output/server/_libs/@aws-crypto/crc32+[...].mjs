import { n as __esmMin, r as __exportAll } from "../../_runtime.mjs";
import { __awaiter, __generator, __values } from "tslib";
import { Buffer as Buffer$1 } from "buffer";
//#region ../../node_modules/.bun/@smithy+util-buffer-from@2.2.0/node_modules/@smithy/util-buffer-from/dist-es/index.js
var fromString;
var init_dist_es$1 = __esmMin((() => {
	fromString = (input, encoding) => {
		if (typeof input !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
		return encoding ? Buffer$1.from(input, encoding) : Buffer$1.from(input);
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+util-utf8@2.3.0/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js
var fromUtf8$1;
var init_fromUtf8 = __esmMin((() => {
	init_dist_es$1();
	fromUtf8$1 = (input) => {
		const buf = fromString(input, "utf8");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
	};
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+util-utf8@2.3.0/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js
var init_toUint8Array = __esmMin((() => {
	init_fromUtf8();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+util-utf8@2.3.0/node_modules/@smithy/util-utf8/dist-es/toUtf8.js
var init_toUtf8 = __esmMin((() => {
	init_dist_es$1();
}));
//#endregion
//#region ../../node_modules/.bun/@smithy+util-utf8@2.3.0/node_modules/@smithy/util-utf8/dist-es/index.js
var init_dist_es = __esmMin((() => {
	init_fromUtf8();
	init_toUint8Array();
	init_toUtf8();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+util@5.2.0/node_modules/@aws-crypto/util/build/module/convertToBuffer.js
function convertToBuffer(data) {
	if (data instanceof Uint8Array) return data;
	if (typeof data === "string") return fromUtf8(data);
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
	return new Uint8Array(data);
}
var fromUtf8;
var init_convertToBuffer = __esmMin((() => {
	init_dist_es();
	fromUtf8 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
		return Buffer.from(input, "utf8");
	} : fromUtf8$1;
}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+util@5.2.0/node_modules/@aws-crypto/util/build/module/isEmptyData.js
function isEmptyData(data) {
	if (typeof data === "string") return data.length === 0;
	return data.byteLength === 0;
}
var init_isEmptyData = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+util@5.2.0/node_modules/@aws-crypto/util/build/module/numToUint8.js
function numToUint8(num) {
	return new Uint8Array([
		(num & 4278190080) >> 24,
		(num & 16711680) >> 16,
		(num & 65280) >> 8,
		num & 255
	]);
}
var init_numToUint8 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+util@5.2.0/node_modules/@aws-crypto/util/build/module/uint32ArrayFrom.js
function uint32ArrayFrom(a_lookUpTable) {
	if (!Uint32Array.from) {
		var return_array = new Uint32Array(a_lookUpTable.length);
		var a_index = 0;
		while (a_index < a_lookUpTable.length) {
			return_array[a_index] = a_lookUpTable[a_index];
			a_index += 1;
		}
		return return_array;
	}
	return Uint32Array.from(a_lookUpTable);
}
var init_uint32ArrayFrom = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+util@5.2.0/node_modules/@aws-crypto/util/build/module/index.js
var init_module$1 = __esmMin((() => {
	init_convertToBuffer();
	init_isEmptyData();
	init_numToUint8();
	init_uint32ArrayFrom();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+crc32@5.2.0/node_modules/@aws-crypto/crc32/build/module/aws_crc32.js
var AwsCrc32;
var init_aws_crc32 = __esmMin((() => {
	init_module$1();
	init_module();
	AwsCrc32 = function() {
		function AwsCrc32() {
			this.crc32 = new Crc32();
		}
		AwsCrc32.prototype.update = function(toHash) {
			if (isEmptyData(toHash)) return;
			this.crc32.update(convertToBuffer(toHash));
		};
		AwsCrc32.prototype.digest = function() {
			return __awaiter(this, void 0, void 0, function() {
				return __generator(this, function(_a) {
					return [2, numToUint8(this.crc32.digest())];
				});
			});
		};
		AwsCrc32.prototype.reset = function() {
			this.crc32 = new Crc32();
		};
		return AwsCrc32;
	}();
}));
//#endregion
//#region ../../node_modules/.bun/@aws-crypto+crc32@5.2.0/node_modules/@aws-crypto/crc32/build/module/index.js
var module_exports = /* @__PURE__ */ __exportAll({
	AwsCrc32: () => AwsCrc32,
	Crc32: () => Crc32,
	crc32: () => crc32
});
function crc32(data) {
	return new Crc32().update(data).digest();
}
var Crc32, lookupTable;
var init_module = __esmMin((() => {
	init_module$1();
	init_aws_crc32();
	Crc32 = function() {
		function Crc32() {
			this.checksum = 4294967295;
		}
		Crc32.prototype.update = function(data) {
			var e_1, _a;
			try {
				for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
					var byte = data_1_1.value;
					this.checksum = this.checksum >>> 8 ^ lookupTable[(this.checksum ^ byte) & 255];
				}
			} catch (e_1_1) {
				e_1 = { error: e_1_1 };
			} finally {
				try {
					if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
				} finally {
					if (e_1) throw e_1.error;
				}
			}
			return this;
		};
		Crc32.prototype.digest = function() {
			return (this.checksum ^ 4294967295) >>> 0;
		};
		return Crc32;
	}();
	lookupTable = uint32ArrayFrom([
		0,
		1996959894,
		3993919788,
		2567524794,
		124634137,
		1886057615,
		3915621685,
		2657392035,
		249268274,
		2044508324,
		3772115230,
		2547177864,
		162941995,
		2125561021,
		3887607047,
		2428444049,
		498536548,
		1789927666,
		4089016648,
		2227061214,
		450548861,
		1843258603,
		4107580753,
		2211677639,
		325883990,
		1684777152,
		4251122042,
		2321926636,
		335633487,
		1661365465,
		4195302755,
		2366115317,
		997073096,
		1281953886,
		3579855332,
		2724688242,
		1006888145,
		1258607687,
		3524101629,
		2768942443,
		901097722,
		1119000684,
		3686517206,
		2898065728,
		853044451,
		1172266101,
		3705015759,
		2882616665,
		651767980,
		1373503546,
		3369554304,
		3218104598,
		565507253,
		1454621731,
		3485111705,
		3099436303,
		671266974,
		1594198024,
		3322730930,
		2970347812,
		795835527,
		1483230225,
		3244367275,
		3060149565,
		1994146192,
		31158534,
		2563907772,
		4023717930,
		1907459465,
		112637215,
		2680153253,
		3904427059,
		2013776290,
		251722036,
		2517215374,
		3775830040,
		2137656763,
		141376813,
		2439277719,
		3865271297,
		1802195444,
		476864866,
		2238001368,
		4066508878,
		1812370925,
		453092731,
		2181625025,
		4111451223,
		1706088902,
		314042704,
		2344532202,
		4240017532,
		1658658271,
		366619977,
		2362670323,
		4224994405,
		1303535960,
		984961486,
		2747007092,
		3569037538,
		1256170817,
		1037604311,
		2765210733,
		3554079995,
		1131014506,
		879679996,
		2909243462,
		3663771856,
		1141124467,
		855842277,
		2852801631,
		3708648649,
		1342533948,
		654459306,
		3188396048,
		3373015174,
		1466479909,
		544179635,
		3110523913,
		3462522015,
		1591671054,
		702138776,
		2966460450,
		3352799412,
		1504918807,
		783551873,
		3082640443,
		3233442989,
		3988292384,
		2596254646,
		62317068,
		1957810842,
		3939845945,
		2647816111,
		81470997,
		1943803523,
		3814918930,
		2489596804,
		225274430,
		2053790376,
		3826175755,
		2466906013,
		167816743,
		2097651377,
		4027552580,
		2265490386,
		503444072,
		1762050814,
		4150417245,
		2154129355,
		426522225,
		1852507879,
		4275313526,
		2312317920,
		282753626,
		1742555852,
		4189708143,
		2394877945,
		397917763,
		1622183637,
		3604390888,
		2714866558,
		953729732,
		1340076626,
		3518719985,
		2797360999,
		1068828381,
		1219638859,
		3624741850,
		2936675148,
		906185462,
		1090812512,
		3747672003,
		2825379669,
		829329135,
		1181335161,
		3412177804,
		3160834842,
		628085408,
		1382605366,
		3423369109,
		3138078467,
		570562233,
		1426400815,
		3317316542,
		2998733608,
		733239954,
		1555261956,
		3268935591,
		3050360625,
		752459403,
		1541320221,
		2607071920,
		3965973030,
		1969922972,
		40735498,
		2617837225,
		3943577151,
		1913087877,
		83908371,
		2512341634,
		3803740692,
		2075208622,
		213261112,
		2463272603,
		3855990285,
		2094854071,
		198958881,
		2262029012,
		4057260610,
		1759359992,
		534414190,
		2176718541,
		4139329115,
		1873836001,
		414664567,
		2282248934,
		4279200368,
		1711684554,
		285281116,
		2405801727,
		4167216745,
		1634467795,
		376229701,
		2685067896,
		3608007406,
		1308918612,
		956543938,
		2808555105,
		3495958263,
		1231636301,
		1047427035,
		2932959818,
		3654703836,
		1088359270,
		936918e3,
		2847714899,
		3736837829,
		1202900863,
		817233897,
		3183342108,
		3401237130,
		1404277552,
		615818150,
		3134207493,
		3453421203,
		1423857449,
		601450431,
		3009837614,
		3294710456,
		1567103746,
		711928724,
		3020668471,
		3272380065,
		1510334235,
		755167117
	]);
}));
//#endregion
export { init_module$1 as a, init_numToUint8 as c, isEmptyData as d, convertToBuffer as f, init_aws_crc32 as i, numToUint8 as l, module_exports as n, init_uint32ArrayFrom as o, init_convertToBuffer as p, AwsCrc32 as r, uint32ArrayFrom as s, init_module as t, init_isEmptyData as u };
