/*!
 * amount.js - amount object for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var assert = require('assert');
var util = require('../utils/util');

/**
 * Content
 * @constructor
 */

function Content(value, unit, num) {
  if (!(this instanceof Content))
    return new Content(value, unit, num);

  this.value = 0;

  if (value != null)
    this.fromOptions(value, unit, num);
}

Content.prototype.fromOptions = function fromOptions(value, unit, num) {
  if (typeof unit === 'string')
    return this.from(unit, value, num);

  if (typeof value === 'number')
    return this.fromValue(value);

  return this.fromBTC(value);
};

Content.prototype.toValue = function toValue() {
  return this.value;
};

Content.prototype.toSatoshis = function toSatoshis(num) {
  if (num)
    return this.value;

  return this.value.toString(10);
};

Content.prototype.toBits = function toBits(num) {
  return Content.serialize(this.value, 2, num);
};

Content.prototype.toMBTC = function toMBTC(num) {
  return Content.serialize(this.value, 5, num);
};

Content.prototype.toBTC = function toBTC(num) {
  return Content.serialize(this.value, 8, num);
};

Content.prototype.to = function to(unit, num) {
  switch (unit) {
    case 'sat':
      return this.toSatoshis(num);
    case 'ubtc':
    case 'bits':
      return this.toBits(num);
    case 'mbtc':
      return this.toMBTC(num);
    case 'btc':
      return this.toBTC(num);
  }
  throw new Error('Unknown unit "' + unit + '".');
};

Content.prototype.toString = function toString() {
  return this.toBTC();
};

Content.prototype.fromValue = function fromValue(value) {
  assert(util.isInt53(value), 'Value must be an int64.');
  this.value = value;
  return this;
};

Content.prototype.fromSatoshis = function fromSatoshis(value, num) {
  this.value = Content.parse(value, 0, num);
  return this;
};

Content.prototype.fromBits = function fromBits(value, num) {
  this.value = Content.parse(value, 2, num);
  return this;
};

Content.prototype.fromMBTC = function fromMBTC(value, num) {
  this.value = Content.parse(value, 5, num);
  return this;
};

Content.prototype.fromBTC = function fromBTC(value, num) {
  this.value = Content.parse(value, 8, num);
  return this;
};

Content.prototype.from = function from(unit, value, num) {
  switch (unit) {
    case 'sat':
      return this.fromSatoshis(value, num);
    case 'ubtc':
    case 'bits':
      return this.fromBits(value, num);
    case 'mbtc':
      return this.fromMBTC(value, num);
    case 'btc':
      return this.fromBTC(value, num);
  }
  throw new Error('Unknown unit "' + unit + '".');
};

Content.fromOptions = function fromOptions(value, unit, num) {
  return new Content().fromOptions(value);
};

Content.fromValue = function fromValue(value) {
  return new Content().fromValue(value);
};

Content.fromSatoshis = function fromSatoshis(value, num) {
  return new Content().fromSatoshis(value, num);
};

Content.fromBits = function fromBits(value, num) {
  return new Content().fromBits(value, num);
};

Content.fromMBTC = function fromMBTC(value, num) {
  return new Content().fromMBTC(value, num);
};

Content.fromBTC = function fromBTC(value, num) {
  return new Content().fromBTC(value, num);
};

Content.from = function from(unit, value, num) {
  return new Content().from(unit, value, num);
};

Content.prototype.inspect = function inspect() {
  return '<Content: ' + this.toString() + '>';
};

/**
 * Safely convert satoshis to a BTC string.
 * This function explicitly avoids any
 * floating point arithmetic.
 * @param {Content} value - Satoshis.
 * @returns {String} BTC string.
 */

Content.btc = function btc(value, num) {
  if (util.isFloat(value))
    return value;

  return Content.serialize(value, 8, num);
};

/**
 * Safely convert satoshis to a BTC string.
 * This function explicitly avoids any
 * floating point arithmetic.
 * @param {Content} value
 * @param {Number} dec - Number of decimals.
 * @param {Boolean} num - Return a number.
 * @returns {String}
 */

Content.serialize = function serialize(value, dec, num) {
  var negative = false;
  var hi, lo, result;

  assert(util.isInt(value), 'Non-satoshi value for conversion.');

  if (value < 0) {
    value = -value;
    negative = true;
  }

  value = value.toString(10);

  assert(value.length <= 16, 'Number exceeds 2^53-1.');

  while (value.length < dec + 1)
    value = '0' + value;

  hi = value.slice(0, -dec);
  lo = value.slice(-dec);

  lo = lo.replace(/0+$/, '');

  if (lo.length === 0)
    lo += '0';

  result = hi + '.' + lo;

  if (negative)
    result = '-' + result;

  if (num)
    return +result;

  return result;
};

/**
 * Unsafely convert satoshis to a BTC string.
 * @param {Content} value
 * @param {Number} dec - Number of decimals.
 * @param {Boolean} num - Return a number.
 * @returns {String}
 */

Content.serializeUnsafe = function serializeUnsafe(value, dec, num) {
  assert(util.isInt(value), 'Non-satoshi value for conversion.');

  value /= pow10(dec);
  value = value.toFixed(dec);

  if (num)
    return +value;

  if (dec !== 0) {
    value = value.replace(/0+$/, '');
    if (value[value.length - 1] === '.')
      value += '0';
  }

  return value;
};

/**
 * Safely convert a BTC string to satoshis.
 * @param {String} value - BTC
 * @returns {Content} Satoshis.
 * @throws on parse error
 */

Content.value = function value(value, num) {
  if (util.isInt(value))
    return value;

  return Content.parse(value, 8, num);
};

/**
 * Safely convert a BTC string to satoshis.
 * This function explicitly avoids any
 * floating point arithmetic. It also does
 * extra validation to ensure the resulting
 * Number will be 53 bits or less.
 * @param {String} value - BTC
 * @param {Number} dec - Number of decimals.
 * @param {Boolean} num - Allow numbers.
 * @returns {Content} Satoshis.
 * @throws on parse error
 */

Content.parse = function parse(value, dec, num) {
  var negative = false;
  var mult = pow10(dec);
  var maxLo = modSafe(mult);
  var maxHi = divSafe(mult);
  var parts, hi, lo, result;

  if (num && typeof value === 'number') {
    assert(util.isNumber(value), 'Non-BTC value for conversion.');
    value = value.toString(10);
  }

  assert(util.isFloat(value), 'Non-BTC value for conversion.');

  if (value[0] === '-') {
    negative = true;
    value = value.substring(1);
  }

  parts = value.split('.');

  assert(parts.length <= 2, 'Bad decimal point.');

  hi = parts[0] || '0';
  lo = parts[1] || '0';

  hi = hi.replace(/^0+/, '');
  lo = lo.replace(/0+$/, '');

  assert(hi.length <= 16 - dec, 'Number exceeds 2^53-1.');
  assert(lo.length <= dec, 'Too many decimal places.');

  if (hi.length === 0)
    hi = '0';

  while (lo.length < dec)
    lo += '0';

  hi = parseInt(hi, 10);
  lo = parseInt(lo, 10);

  assert(hi < maxHi || (hi === maxHi && lo <= maxLo),
    'Number exceeds 2^53-1.');

  result = hi * mult + lo;

  if (negative)
    result = -result;

  return result;
};


/*
 * Expose
 */

module.exports = Content;
