// ============================================================
// scrapers/amazon.js — Amazon PA-API 5.0
//
// Documentation officielle :
//   https://webservices.amazon.fr/paapi5/documentation/
//
// Credentials requis (GitHub Secrets) :
//   AMAZON_ACCESS_KEY   → clé d'accès AWS du compte Partenaires
//   AMAZON_SECRET_KEY   → clé secrète AWS du compte Partenaires
//   AMAZON_PARTNER_TAG  → ex: "comparemax-21"
// ============================================================

'use strict';

const crypto = require('crypto');
const axios  = require('axios');

const PAAPI_HOST   = 'webservices.amazon.fr';
const PAAPI_REGION = 'eu-west-1';
const PAAPI_PATH   = '/paapi5/getitems';
const SERVICE      = 'ProductAdvertisingAPI';

// ── SigV4 signing ──────────────────────────────────────────

function hmac(key, data, encoding) {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest(encoding);
}

function sha256(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function getSigningKey(secretKey, dateStamp) {
  const kDate    = hmac('AWS4' + secretKey, dateStamp);
  const kRegion  = hmac(kDate, PAAPI_REGION);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, 'aws4_request');
}

function buildSignedHeaders(accessKey, secretKey, partnerTag, payload) {
  const now         = new Date();
  const amzDate     = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
  const dateStamp   = amzDate.slice(0, 8);

  const payloadHash = sha256(payload);

  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:application/json; charset=utf-8\n` +
    `host:${PAAPI_HOST}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems\n`;

  const signedHeadersList = 'content-encoding;content-type;host;x-amz-date;x-amz-target';

  const canonicalRequest = [
    'POST',
    PAAPI_PATH,
    '',
    canonicalHeaders,
    signedHeadersList,
    payloadHash
  ].join('\n');

  const credentialScope = `${dateStamp}/${PAAPI_REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256(canonicalRequest)
  ].join('\n');

  const signingKey = getSigningKey(secretKey, dateStamp);
  const signature  = hmac(signingKey, stringToSign, 'hex');

  const authHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, ` +
    `SignedHeaders=${signedHeadersList}, Signature=${signature}`;

  return {
    'Content-Encoding': 'amz-1.0',
    'Content-Type':     'application/json; charset=utf-8',
    'Host':             PAAPI_HOST,
    'X-Amz-Date':      amzDate,
    'X-Amz-Target':    'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
    'Authorization':   authHeader
  };
}

// ── Requête PA-API ─────────────────────────────────────────

/**
 * Récupère les prix Amazon pour un lot d'ASINs (max 10).
 * @param {string[]} asins
 * @returns {Promise<Object>} { [asin]: price_number|null }
 */
async function getAmazonPrices(asins) {
  const accessKey  = process.env.AMAZON_ACCESS_KEY;
  const secretKey  = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;

  if (!accessKey || !secretKey || !partnerTag) {
    console.log('  ⚠️  Credentials Amazon PA-API non configurés — skipping Amazon.');
    return {};
  }

  const payload = JSON.stringify({
    ItemIds:          asins,
    PartnerTag:       partnerTag,
    PartnerType:      'Associates',
    Marketplace:      'www.amazon.fr',
    Resources: [
      'Offers.Listings.Price',
      'Offers.Listings.SavingBasis',
      'Offers.Summaries.LowestPrice'
    ]
  });

  const headers = buildSignedHeaders(accessKey, secretKey, partnerTag, payload);

  const response = await axios.post(
    `https://${PAAPI_HOST}${PAAPI_PATH}`,
    payload,
    { headers, timeout: 15000 }
  );

  const results = {};
  const items   = response.data?.ItemsResult?.Items || [];

  for (const item of items) {
    const asin     = item.ASIN;
    const listings = item.Offers?.Listings || [];
    if (listings.length > 0) {
      const price = listings[0]?.Price?.Amount;
      results[asin] = price ? parseFloat(price) : null;
    } else {
      const lowest = item.Offers?.Summaries?.[0]?.LowestPrice?.Amount;
      results[asin] = lowest ? parseFloat(lowest) : null;
    }
  }

  return results;
}

module.exports = { getAmazonPrices };
