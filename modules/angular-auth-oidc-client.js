import { EventEmitter, Inject, Injectable, NgModule, Output, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { KEYUTIL, KJUR, hextob64u } from 'jsrsasign';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

class DefaultConfiguration {
    constructor() {
        this.stsServer = 'https://localhost:44318';
        this.redirect_url = 'https://localhost:44311';
        // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified by the iss (issuer) Claim as an audience.
        // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences not trusted by the Client.
        this.client_id = 'angularclient';
        this.response_type = 'id_token token';
        // For some oidc, we require resource identifier to be provided along with the request.
        this.resource = '';
        this.scope = 'openid email profile';
        // Only for Google Auth with particular G Suite domain, see https://developers.google.com/identity/protocols/OpenIDConnect#hd-param
        this.hd_param = '';
        this.post_logout_redirect_uri = 'https://localhost:44311/unauthorized';
        this.start_checksession = false;
        this.silent_renew = true;
        this.silent_renew_offset_in_seconds = 0;
        this.post_login_route = '/';
        // HTTP 403
        this.forbidden_route = '/forbidden';
        // HTTP 401
        this.unauthorized_route = '/unauthorized';
        this.auto_userinfo = true;
        this.log_console_warning_active = true;
        this.log_console_debug_active = false;
        // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
        // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
        this.max_id_token_iat_offset_allowed_in_seconds = 3;
        this.override_well_known_configuration = false;
        this.override_well_known_configuration_url = 'https://localhost:44386/wellknownconfiguration.json';
        this.storage = typeof Storage !== 'undefined' ? sessionStorage : null;
    }
}
class OpenIDImplicitFlowConfiguration {
}
class AuthConfiguration {
    /**
     * @param {?} defaultConfig
     */
    constructor(defaultConfig) {
        this.defaultConfig = defaultConfig;
    }
    /**
     * @return {?}
     */
    get stsServer() {
        return this.openIDImplicitFlowConfiguration.stsServer || this.defaultConfig.stsServer;
    }
    /**
     * @return {?}
     */
    get redirect_url() {
        return this.openIDImplicitFlowConfiguration.redirect_url || this.defaultConfig.redirect_url;
    }
    /**
     * @return {?}
     */
    get client_id() {
        return this.openIDImplicitFlowConfiguration.client_id || this.defaultConfig.client_id;
    }
    /**
     * @return {?}
     */
    get response_type() {
        return this.openIDImplicitFlowConfiguration.response_type || this.defaultConfig.response_type;
    }
    /**
     * @return {?}
     */
    get resource() {
        return this.openIDImplicitFlowConfiguration.resource || this.defaultConfig.resource;
    }
    /**
     * @return {?}
     */
    get scope() {
        return this.openIDImplicitFlowConfiguration.scope || this.defaultConfig.scope;
    }
    /**
     * @return {?}
     */
    get hd_param() {
        return this.openIDImplicitFlowConfiguration.hd_param || this.defaultConfig.hd_param;
    }
    /**
     * @return {?}
     */
    get post_logout_redirect_uri() {
        return this.openIDImplicitFlowConfiguration.post_logout_redirect_uri || this.defaultConfig.post_logout_redirect_uri;
    }
    /**
     * @return {?}
     */
    get start_checksession() {
        return this.openIDImplicitFlowConfiguration.start_checksession !== undefined ? this.openIDImplicitFlowConfiguration.start_checksession : this.defaultConfig.start_checksession;
    }
    /**
     * @return {?}
     */
    get silent_renew() {
        return this.openIDImplicitFlowConfiguration.silent_renew !== undefined ? this.openIDImplicitFlowConfiguration.silent_renew : this.defaultConfig.silent_renew;
    }
    /**
     * @return {?}
     */
    get silent_renew_offset_in_seconds() {
        return this.openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds || this.defaultConfig.silent_renew_offset_in_seconds;
    }
    /**
     * @return {?}
     */
    get post_login_route() {
        return this.openIDImplicitFlowConfiguration.post_login_route || this.defaultConfig.post_login_route;
    }
    /**
     * @return {?}
     */
    get forbidden_route() {
        return this.openIDImplicitFlowConfiguration.forbidden_route || this.defaultConfig.forbidden_route;
    }
    /**
     * @return {?}
     */
    get unauthorized_route() {
        return this.openIDImplicitFlowConfiguration.unauthorized_route || this.defaultConfig.unauthorized_route;
    }
    /**
     * @return {?}
     */
    get auto_userinfo() {
        return this.openIDImplicitFlowConfiguration.auto_userinfo !== undefined ? this.openIDImplicitFlowConfiguration.auto_userinfo : this.defaultConfig.auto_userinfo;
    }
    /**
     * @return {?}
     */
    get auto_clean_state_after_authentication() {
        return this.openIDImplicitFlowConfiguration.auto_clean_state_after_authentication !== undefined ? this.openIDImplicitFlowConfiguration.auto_clean_state_after_authentication : this.defaultConfig.auto_clean_state_after_authentication;
    }
    /**
     * @return {?}
     */
    get trigger_authorization_result_event() {
        return this.openIDImplicitFlowConfiguration.trigger_authorization_result_event !== undefined ? this.openIDImplicitFlowConfiguration.trigger_authorization_result_event : this.defaultConfig.trigger_authorization_result_event;
    }
    /**
     * @return {?}
     */
    get log_console_warning_active() {
        return this.openIDImplicitFlowConfiguration.log_console_warning_active !== undefined ? this.openIDImplicitFlowConfiguration.log_console_warning_active : this.defaultConfig.log_console_warning_active;
    }
    /**
     * @return {?}
     */
    get log_console_debug_active() {
        return this.openIDImplicitFlowConfiguration.log_console_debug_active !== undefined ? this.openIDImplicitFlowConfiguration.log_console_debug_active : this.defaultConfig.log_console_debug_active;
    }
    /**
     * @return {?}
     */
    get max_id_token_iat_offset_allowed_in_seconds() {
        return this.openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds || this.defaultConfig.max_id_token_iat_offset_allowed_in_seconds;
    }
    /**
     * @return {?}
     */
    get override_well_known_configuration() {
        return this.openIDImplicitFlowConfiguration.override_well_known_configuration !== undefined ? this.openIDImplicitFlowConfiguration.override_well_known_configuration : this.defaultConfig.override_well_known_configuration;
    }
    /**
     * @return {?}
     */
    get override_well_known_configuration_url() {
        return this.openIDImplicitFlowConfiguration.override_well_known_configuration_url || this.defaultConfig.override_well_known_configuration_url;
    }
    /**
     * @return {?}
     */
    get storage() {
        return this.openIDImplicitFlowConfiguration.storage || this.defaultConfig.storage;
    }
    /**
     * @param {?} openIDImplicitFlowConfiguration
     * @return {?}
     */
    init(openIDImplicitFlowConfiguration) {
        this.openIDImplicitFlowConfiguration = openIDImplicitFlowConfiguration;
    }
}
AuthConfiguration.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AuthConfiguration.ctorParameters = () => [
    { type: DefaultConfiguration, },
];

/**
 * Implement this class-interface to create a custom storage.
 * @abstract
 */
class OidcSecurityStorage {
    /**
     * This method must contain the logic to read the storage.
     * @abstract
     * @param {?} key
     * @return {?} The value of the given key
     */
    read(key) { }
    /**
     * This method must contain the logic to write the storage.
     * @abstract
     * @param {?} key
     * @param {?} value The value for the given key
     * @return {?}
     */
    write(key, value) { }
}
OidcSecurityStorage.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecurityStorage.ctorParameters = () => [];
class BrowserStorage {
    /**
     * @param {?} authConfiguration
     */
    constructor(authConfiguration) {
        this.authConfiguration = authConfiguration;
        this.hasStorage = typeof Storage !== 'undefined';
    }
    /**
     * @param {?} key
     * @return {?}
     */
    read(key) {
        if (this.hasStorage) {
            return JSON.parse(this.authConfiguration.storage.getItem(key));
        }
        return;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    write(key, value) {
        if (this.hasStorage) {
            value = value === undefined ? null : value;
            this.authConfiguration.storage.setItem(key, JSON.stringify(value));
        }
    }
}
BrowserStorage.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BrowserStorage.ctorParameters = () => [
    { type: AuthConfiguration, },
];

class OidcSecurityCommon {
    /**
     * @param {?} authConfiguration
     * @param {?} oidcSecurityStorage
     */
    constructor(authConfiguration, oidcSecurityStorage) {
        this.authConfiguration = authConfiguration;
        this.oidcSecurityStorage = oidcSecurityStorage;
        this.storage_auth_result = 'authorizationResult';
        this.storage_access_token = 'authorizationData';
        this.storage_id_token = 'authorizationDataIdToken';
        this.storage_is_authorized = '_isAuthorized';
        this.storage_user_data = 'userData';
        this.storage_auth_nonce = 'authNonce';
        this.storage_auth_state_control = 'authStateControl';
        this.storage_well_known_endpoints = 'wellknownendpoints';
        this.storage_session_state = 'session_state';
        this.storage_silent_renew_running = 'storage_silent_renew_running';
        this.storage_custom_request_params = 'storage_custom_request_params';
    }
    /**
     * @return {?}
     */
    get authResult() {
        return this.retrieve(this.storage_auth_result);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set authResult(value) {
        this.store(this.storage_auth_result, value);
    }
    /**
     * @return {?}
     */
    get accessToken() {
        return this.retrieve(this.storage_access_token) || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set accessToken(value) {
        this.store(this.storage_access_token, value);
    }
    /**
     * @return {?}
     */
    get idToken() {
        return this.retrieve(this.storage_id_token) || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set idToken(value) {
        this.store(this.storage_id_token, value);
    }
    /**
     * @return {?}
     */
    get isAuthorized() {
        return this.retrieve(this.storage_is_authorized);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isAuthorized(value) {
        this.store(this.storage_is_authorized, value);
    }
    /**
     * @return {?}
     */
    get userData() {
        return this.retrieve(this.storage_user_data);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set userData(value) {
        this.store(this.storage_user_data, value);
    }
    /**
     * @return {?}
     */
    get authNonce() {
        return this.retrieve(this.storage_auth_nonce) || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set authNonce(value) {
        this.store(this.storage_auth_nonce, value);
    }
    /**
     * @return {?}
     */
    get authStateControl() {
        return this.retrieve(this.storage_auth_state_control) || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set authStateControl(value) {
        this.store(this.storage_auth_state_control, value);
    }
    /**
     * @return {?}
     */
    get wellKnownEndpoints() {
        return this.retrieve(this.storage_well_known_endpoints);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set wellKnownEndpoints(value) {
        this.store(this.storage_well_known_endpoints, value);
    }
    /**
     * @return {?}
     */
    get sessionState() {
        return this.retrieve(this.storage_session_state);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sessionState(value) {
        this.store(this.storage_session_state, value);
    }
    /**
     * @return {?}
     */
    get silentRenewRunning() {
        return this.retrieve(this.storage_silent_renew_running) || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set silentRenewRunning(value) {
        this.store(this.storage_silent_renew_running, value);
    }
    /**
     * @return {?}
     */
    get customRequestParams() {
        return this.retrieve(this.storage_custom_request_params);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set customRequestParams(value) {
        this.store(this.storage_custom_request_params, value);
    }
    /**
     * @return {?}
     */
    setupModule() { }
    /**
     * @param {?} key
     * @return {?}
     */
    retrieve(key) {
        return this.oidcSecurityStorage.read(key);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    store(key, value) {
        this.oidcSecurityStorage.write(key, value);
    }
    /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    resetStorageData(isRenewProcess) {
        if (!isRenewProcess) {
            this.store(this.storage_auth_result, '');
            this.store(this.storage_session_state, '');
            this.store(this.storage_silent_renew_running, '');
            this.store(this.storage_is_authorized, false);
            this.store(this.storage_access_token, '');
            this.store(this.storage_id_token, '');
            this.store(this.storage_user_data, '');
        }
    }
    /**
     * @return {?}
     */
    getAccessToken() {
        return this.retrieve(this.storage_access_token);
    }
    /**
     * @return {?}
     */
    getIdToken() {
        return this.retrieve(this.storage_id_token);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    logError(message) {
        console.error(message);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    logWarning(message) {
        if (this.authConfiguration.log_console_warning_active) {
            console.warn(message);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    logDebug(message) {
        if (this.authConfiguration.log_console_debug_active) {
            console.log(message);
        }
    }
}
OidcSecurityCommon.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecurityCommon.ctorParameters = () => [
    { type: AuthConfiguration, },
    { type: OidcSecurityStorage, },
];

class OidcSecurityValidation {
    /**
     * @param {?} oidcSecurityCommon
     */
    constructor(oidcSecurityCommon) {
        this.oidcSecurityCommon = oidcSecurityCommon;
    }
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    isTokenExpired(token, offsetSeconds) {
        let /** @type {?} */ decoded;
        decoded = this.getPayloadFromToken(token, false);
        return !(this.validate_id_token_exp_not_expired(decoded, offsetSeconds));
    }
    /**
     * @param {?} decoded_id_token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    validate_id_token_exp_not_expired(decoded_id_token, offsetSeconds) {
        let /** @type {?} */ tokenExpirationDate = this.getTokenExpirationDate(decoded_id_token);
        offsetSeconds = offsetSeconds || 0;
        if (tokenExpirationDate == null) {
            return false;
        }
        // Token not expired?
        return (tokenExpirationDate.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }
    /**
     * @param {?} dataIdToken
     * @return {?}
     */
    validate_required_id_token(dataIdToken) {
        let /** @type {?} */ validated = true;
        if (!dataIdToken.hasOwnProperty('iss')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('iss is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('sub')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('sub is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('aud')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('aud is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('exp')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('exp is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('iat')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('iat is missing, this is required in the id_token');
        }
        return validated;
    }
    /**
     * @param {?} dataIdToken
     * @param {?} max_offset_allowed_in_seconds
     * @return {?}
     */
    validate_id_token_iat_max_offset(dataIdToken, max_offset_allowed_in_seconds) {
        if (!dataIdToken.hasOwnProperty('iat')) {
            return false;
        }
        let /** @type {?} */ dateTime_iat_id_token = new Date(0); // The 0 here is the key, which sets the date to the epoch
        dateTime_iat_id_token.setUTCSeconds(dataIdToken.iat);
        max_offset_allowed_in_seconds = max_offset_allowed_in_seconds || 0;
        if (dateTime_iat_id_token == null) {
            return false;
        }
        this.oidcSecurityCommon.logDebug('validate_id_token_iat_max_offset: ' + (new Date().valueOf() - dateTime_iat_id_token.valueOf()) + ' < ' + (max_offset_allowed_in_seconds * 1000));
        return ((new Date().valueOf() - dateTime_iat_id_token.valueOf()) < (max_offset_allowed_in_seconds * 1000));
    }
    /**
     * @param {?} dataIdToken
     * @param {?} local_nonce
     * @return {?}
     */
    validate_id_token_nonce(dataIdToken, local_nonce) {
        if (dataIdToken.nonce !== local_nonce) {
            this.oidcSecurityCommon.logDebug('Validate_id_token_nonce failed, dataIdToken.nonce: ' + dataIdToken.nonce + ' local_nonce:' + local_nonce);
            return false;
        }
        return true;
    }
    /**
     * @param {?} dataIdToken
     * @param {?} authWellKnownEndpoints_issuer
     * @return {?}
     */
    validate_id_token_iss(dataIdToken, authWellKnownEndpoints_issuer) {
        if (dataIdToken.iss != authWellKnownEndpoints_issuer) {
            this.oidcSecurityCommon.logDebug('Validate_id_token_iss failed, dataIdToken.iss: ' + dataIdToken.iss + ' authWellKnownEndpoints issuer:' + authWellKnownEndpoints_issuer);
            return false;
        }
        return true;
    }
    /**
     * @param {?} dataIdToken
     * @param {?} aud
     * @return {?}
     */
    validate_id_token_aud(dataIdToken, aud) {
        if (dataIdToken.aud != aud) {
            this.oidcSecurityCommon.logDebug('Validate_id_token_aud failed, dataIdToken.aud: ' + dataIdToken.aud + ' client_id:' + aud);
            return false;
        }
        return true;
    }
    /**
     * @param {?} state
     * @param {?} local_state
     * @return {?}
     */
    validateStateFromHashCallback(state, local_state) {
        if (state != local_state) {
            this.oidcSecurityCommon.logDebug('ValidateStateFromHashCallback failed, state: ' + state + ' local_state:' + local_state);
            return false;
        }
        return true;
    }
    /**
     * @param {?} id_token_sub
     * @param {?} userdata_sub
     * @return {?}
     */
    validate_userdata_sub_id_token(id_token_sub, userdata_sub) {
        if (id_token_sub != userdata_sub) {
            this.oidcSecurityCommon.logDebug('validate_userdata_sub_id_token failed, id_token_sub: ' + id_token_sub + ' userdata_sub:' + userdata_sub);
            return false;
        }
        return true;
    }
    /**
     * @param {?} token
     * @param {?} encode
     * @return {?}
     */
    getPayloadFromToken(token, encode) {
        let /** @type {?} */ data = {};
        if (typeof token !== 'undefined') {
            let /** @type {?} */ encoded = token.split('.')[1];
            if (encode) {
                return encoded;
            }
            data = JSON.parse(this.urlBase64Decode(encoded));
        }
        return data;
    }
    /**
     * @param {?} token
     * @param {?} encode
     * @return {?}
     */
    getHeaderFromToken(token, encode) {
        let /** @type {?} */ data = {};
        if (typeof token !== 'undefined') {
            let /** @type {?} */ encoded = token.split('.')[0];
            if (encode) {
                return encoded;
            }
            data = JSON.parse(this.urlBase64Decode(encoded));
        }
        return data;
    }
    /**
     * @param {?} token
     * @param {?} encode
     * @return {?}
     */
    getSignatureFromToken(token, encode) {
        let /** @type {?} */ data = {};
        if (typeof token !== 'undefined') {
            let /** @type {?} */ encoded = token.split('.')[2];
            if (encode) {
                return encoded;
            }
            data = JSON.parse(this.urlBase64Decode(encoded));
        }
        return data;
    }
    /**
     * @param {?} id_token
     * @param {?} jwtkeys
     * @return {?}
     */
    validate_signature_id_token(id_token, jwtkeys) {
        if (!jwtkeys || !jwtkeys.keys) {
            return false;
        }
        let /** @type {?} */ header_data = this.getHeaderFromToken(id_token, false);
        if ((Object.keys(header_data).length === 0 && header_data.constructor === Object)) {
            this.oidcSecurityCommon.logWarning('id token has no header data');
            return false;
        }
        let /** @type {?} */ kid = header_data.kid;
        let /** @type {?} */ alg = header_data.alg;
        if ('RS256' != alg) {
            this.oidcSecurityCommon.logWarning('Only RS256 supported');
            return false;
        }
        let /** @type {?} */ isValid = false;
        if (!header_data.hasOwnProperty('kid')) {
            // exactly 1 key in the jwtkeys and no kid in the Jose header
            // kty	"RSA" use "sig"
            let /** @type {?} */ amountOfMatchingKeys = 0;
            for (let /** @type {?} */ key of jwtkeys.keys) {
                if (key.kty == 'RSA' && key.use == 'sig') {
                    amountOfMatchingKeys = amountOfMatchingKeys + 1;
                }
            }
            if (amountOfMatchingKeys == 0) {
                this.oidcSecurityCommon.logWarning('no keys found, incorrect Signature, validation failed for id_token');
                return false;
            }
            else if (amountOfMatchingKeys > 1) {
                this.oidcSecurityCommon.logWarning('no ID Token kid claim in JOSE header and multiple supplied in jwks_uri');
                return false;
            }
            else {
                for (let /** @type {?} */ key of jwtkeys.keys) {
                    if (key.kty == 'RSA' && key.use == 'sig') {
                        let /** @type {?} */ publickey = KEYUTIL.getKey(key);
                        isValid = KJUR.jws.JWS.verify(id_token, publickey, ['RS256']);
                        if (!isValid) {
                            this.oidcSecurityCommon.logWarning('incorrect Signature, validation failed for id_token');
                        }
                        return isValid;
                    }
                }
            }
        }
        else {
            // kid in the Jose header of id_token
            for (let /** @type {?} */ key of jwtkeys.keys) {
                if (key.kid == kid) {
                    let /** @type {?} */ publickey = KEYUTIL.getKey(key);
                    isValid = KJUR.jws.JWS.verify(id_token, publickey, ['RS256']);
                    if (!isValid) {
                        this.oidcSecurityCommon.logWarning('incorrect Signature, validation failed for id_token');
                    }
                    return isValid;
                }
            }
        }
        return isValid;
    }
    /**
     * @param {?} response_type
     * @return {?}
     */
    config_validate_response_type(response_type) {
        if (response_type === 'id_token token' || response_type === 'id_token') {
            return true;
        }
        this.oidcSecurityCommon.logWarning('module configure incorrect, invalid response_type:' + response_type);
        return false;
    }
    /**
     * @param {?} access_token
     * @param {?} at_hash
     * @return {?}
     */
    validate_id_token_at_hash(access_token, at_hash) {
        this.oidcSecurityCommon.logDebug('From the server:' + at_hash);
        let /** @type {?} */ testdata = this.generate_at_hash('' + access_token);
        this.oidcSecurityCommon.logDebug('client validation not decoded:' + testdata);
        if (testdata == at_hash) {
            return true; // isValid;
        }
        else {
            let /** @type {?} */ testValue = this.generate_at_hash('' + decodeURIComponent(access_token));
            this.oidcSecurityCommon.logDebug('-gen access--' + testValue);
            if (testValue == at_hash) {
                return true; // isValid
            }
        }
        return false;
    }
    /**
     * @param {?} access_token
     * @return {?}
     */
    generate_at_hash(access_token) {
        let /** @type {?} */ hash = KJUR.crypto.Util.hashString(access_token, 'sha256');
        let /** @type {?} */ first128bits = hash.substr(0, hash.length / 2);
        let /** @type {?} */ testdata = hextob64u(first128bits);
        return testdata;
    }
    /**
     * @param {?} dataIdToken
     * @return {?}
     */
    getTokenExpirationDate(dataIdToken) {
        if (!dataIdToken.hasOwnProperty('exp')) {
            return new Date();
        }
        let /** @type {?} */ date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(dataIdToken.exp);
        return date;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    urlBase64Decode(str) {
        let /** @type {?} */ output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }
}
OidcSecurityValidation.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecurityValidation.ctorParameters = () => [
    { type: OidcSecurityCommon, },
];

class AuthWellKnownEndpoints {
    /**
     * @param {?} http
     * @param {?} authConfiguration
     * @param {?} oidcSecurityCommon
     */
    constructor(http, authConfiguration, oidcSecurityCommon) {
        this.http = http;
        this.authConfiguration = authConfiguration;
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.onWellKnownEndpointsLoaded = new EventEmitter(true);
        this.getWellKnownEndpoints = () => {
            let /** @type {?} */ headers = new HttpHeaders();
            headers = headers.set('Accept', 'application/json');
            let /** @type {?} */ url = this.authConfiguration.stsServer + '/.well-known/openid-configuration';
            if (this.authConfiguration.override_well_known_configuration) {
                url = this.authConfiguration.override_well_known_configuration_url;
            }
            return this.http.get(url, {
                headers: headers,
            });
        };
    }
    /**
     * @return {?}
     */
    setupModule() {
        let /** @type {?} */ data = this.oidcSecurityCommon.wellKnownEndpoints;
        this.oidcSecurityCommon.logDebug(data);
        if (data && data !== '') {
            this.oidcSecurityCommon.logDebug('AuthWellKnownEndpoints already defined');
            this.issuer = data.issuer;
            this.jwks_uri = data.jwks_uri;
            this.authorization_endpoint = data.authorization_endpoint;
            this.token_endpoint = data.token_endpoint;
            this.userinfo_endpoint = data.userinfo_endpoint;
            if (data.end_session_endpoint) {
                this.end_session_endpoint = data.end_session_endpoint;
            }
            
            if (data.check_session_iframe) {
                this.check_session_iframe = data.check_session_iframe;
            }
            
            if (data.revocation_endpoint) {
                this.revocation_endpoint = data.revocation_endpoint;
            }
            
            if (data.introspection_endpoint) {
                this.introspection_endpoint = data.introspection_endpoint;
            }
            this.onWellKnownEndpointsLoaded.emit();
        }
        else {
            this.oidcSecurityCommon.logDebug('AuthWellKnownEndpoints first time, get from the server');
            this.getWellKnownEndpoints()
                .subscribe((data) => {
                this.issuer = data.issuer;
                this.jwks_uri = data.jwks_uri;
                this.authorization_endpoint = data.authorization_endpoint;
                this.token_endpoint = data.token_endpoint;
                this.userinfo_endpoint = data.userinfo_endpoint;
                if (data.end_session_endpoint) {
                    this.end_session_endpoint = data.end_session_endpoint;
                }
                
                if (data.check_session_iframe) {
                    this.check_session_iframe = data.check_session_iframe;
                }
                
                if (data.revocation_endpoint) {
                    this.revocation_endpoint = data.revocation_endpoint;
                }
                
                if (data.introspection_endpoint) {
                    this.introspection_endpoint = data.introspection_endpoint;
                }
                this.oidcSecurityCommon.wellKnownEndpoints = data;
                this.oidcSecurityCommon.logDebug(data);
                this.onWellKnownEndpointsLoaded.emit();
            });
        }
    }
}
AuthWellKnownEndpoints.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AuthWellKnownEndpoints.ctorParameters = () => [
    { type: HttpClient, },
    { type: AuthConfiguration, },
    { type: OidcSecurityCommon, },
];
AuthWellKnownEndpoints.propDecorators = {
    'onWellKnownEndpointsLoaded': [{ type: Output },],
};

class OidcSecurityCheckSession {
    /**
     * @param {?} authConfiguration
     * @param {?} oidcSecurityCommon
     * @param {?} authWellKnownEndpoints
     */
    constructor(authConfiguration, oidcSecurityCommon, authWellKnownEndpoints) {
        this.authConfiguration = authConfiguration;
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.authWellKnownEndpoints = authWellKnownEndpoints;
        this.onCheckSessionChanged = new EventEmitter(true);
    }
    /**
     * @return {?}
     */
    init() {
        let /** @type {?} */ exists = window.parent.document.getElementById('myiFrameForCheckSession');
        if (!exists) {
            this.sessionIframe = window.document.createElement('iframe');
            this.sessionIframe.id = 'myiFrameForCheckSession';
            this.oidcSecurityCommon.logDebug(this.sessionIframe);
            this.sessionIframe.style.display = 'none';
            this.sessionIframe.src = this.authWellKnownEndpoints.check_session_iframe;
            window.document.body.appendChild(this.sessionIframe);
            this.iframeMessageEvent = this.messageHandler.bind(this);
            window.addEventListener('message', this.iframeMessageEvent, false);
            return Observable.create((observer) => {
                this.sessionIframe.onload = () => {
                    observer.next(this);
                    observer.complete();
                };
            });
        }
        return Observable.empty();
    }
    /**
     * @param {?} clientId
     * @return {?}
     */
    pollServerSession(clientId) {
        let /** @type {?} */ source = Observable.timer(3000, 3000)
            .timeInterval()
            .pluck('interval')
            .take(10000);
        source.subscribe(() => {
            this.oidcSecurityCommon.logDebug(this.sessionIframe);
            let /** @type {?} */ session_state = this.oidcSecurityCommon.sessionState;
            if (session_state && session_state !== '') {
                this.sessionIframe.contentWindow.postMessage(clientId + ' ' + session_state, this.authConfiguration.stsServer);
            }
        }, (err) => {
            this.oidcSecurityCommon.logError('pollServerSession error: ' + err);
        }, () => {
            this.oidcSecurityCommon.logDebug('checksession pollServerSession completed');
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    messageHandler(e) {
        if (e.origin === this.authConfiguration.stsServer &&
            e.source === this.sessionIframe.contentWindow) {
            if (e.data === 'error') {
                this.oidcSecurityCommon.logWarning('error from checksession messageHandler');
            }
            else if (e.data === 'changed') {
                this.onCheckSessionChanged.emit();
            }
            else {
                this.oidcSecurityCommon.logDebug(e.data + ' from checksession messageHandler');
            }
        }
    }
}
OidcSecurityCheckSession.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecurityCheckSession.ctorParameters = () => [
    { type: AuthConfiguration, },
    { type: OidcSecurityCommon, },
    { type: AuthWellKnownEndpoints, },
];
OidcSecurityCheckSession.propDecorators = {
    'onCheckSessionChanged': [{ type: Output },],
};

class OidcSecuritySilentRenew {
    /**
     * @param {?} oidcSecurityCommon
     */
    constructor(oidcSecurityCommon) {
        this.oidcSecurityCommon = oidcSecurityCommon;
    }
    /**
     * @return {?}
     */
    initRenew() {
        let /** @type {?} */ existsparent = undefined;
        try {
            let /** @type {?} */ parentdoc = window.parent.document;
            if (!parentdoc) {
                throw new Error('Unaccessible');
            }
            existsparent = parentdoc.getElementById('myiFrameForSilentRenew');
        }
        catch (e) {
            // not accessible
        }
        let /** @type {?} */ exists = window.document.getElementById('myiFrameForSilentRenew');
        if (existsparent) {
            this.sessionIframe = existsparent;
        }
        else if (exists) {
            this.sessionIframe = exists;
        }
        if (!exists && !existsparent) {
            this.sessionIframe = window.document.createElement('iframe');
            this.sessionIframe.id = 'myiFrameForSilentRenew';
            this.oidcSecurityCommon.logDebug(this.sessionIframe);
            this.sessionIframe.style.display = 'none';
            window.document.body.appendChild(this.sessionIframe);
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    startRenew(url) {
        let /** @type {?} */ existsparent = undefined;
        try {
            let /** @type {?} */ parentdoc = window.parent.document;
            if (!parentdoc) {
                throw new Error('Unaccessible');
            }
            existsparent = parentdoc.getElementById('myiFrameForSilentRenew');
        }
        catch (e) {
            // not accessible
        }
        let /** @type {?} */ exists = window.document.getElementById('myiFrameForSilentRenew');
        if (existsparent) {
            this.sessionIframe = existsparent;
        }
        else if (exists) {
            this.sessionIframe = exists;
        }
        this.oidcSecurityCommon.logDebug('startRenew for URL:' + url);
        this.sessionIframe.src = url;
        return Observable.create((observer) => {
            this.sessionIframe.onload = () => {
                observer.next(this);
                observer.complete();
            };
        });
    }
}
OidcSecuritySilentRenew.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecuritySilentRenew.ctorParameters = () => [
    { type: OidcSecurityCommon, },
];

class OidcSecurityUserService {
    /**
     * @param {?} http
     * @param {?} oidcSecurityCommon
     * @param {?} authWellKnownEndpoints
     */
    constructor(http, oidcSecurityCommon, authWellKnownEndpoints) {
        this.http = http;
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.authWellKnownEndpoints = authWellKnownEndpoints;
        this.userData = '';
        this.getIdentityUserData = () => {
            let /** @type {?} */ headers = new HttpHeaders();
            headers = headers.set('Accept', 'application/json');
            let /** @type {?} */ token = this.oidcSecurityCommon.getAccessToken();
            if (token !== '') {
                headers = headers.set('Authorization', 'Bearer ' + decodeURIComponent(token));
            }
            return this.http.get(this.authWellKnownEndpoints.userinfo_endpoint, {
                headers: headers,
            });
        };
    }
    /**
     * @return {?}
     */
    initUserData() {
        return this.getIdentityUserData()
            .map(data => this.userData = data);
    }
}
OidcSecurityUserService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecurityUserService.ctorParameters = () => [
    { type: HttpClient, },
    { type: OidcSecurityCommon, },
    { type: AuthWellKnownEndpoints, },
];

let AuthorizationResult = {};
AuthorizationResult.authorized = 1;
AuthorizationResult.forbidden = 2;
AuthorizationResult.unauthorized = 3;
AuthorizationResult[AuthorizationResult.authorized] = "authorized";
AuthorizationResult[AuthorizationResult.forbidden] = "forbidden";
AuthorizationResult[AuthorizationResult.unauthorized] = "unauthorized";

class UriEncoder {
    /**
     * @param {?} key
     * @return {?}
     */
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}

class OidcSecurityService {
    /**
     * @param {?} platformId
     * @param {?} http
     * @param {?} authConfiguration
     * @param {?} router
     * @param {?} oidcSecurityCheckSession
     * @param {?} oidcSecuritySilentRenew
     * @param {?} oidcSecurityUserService
     * @param {?} oidcSecurityCommon
     * @param {?} authWellKnownEndpoints
     */
    constructor(platformId, http, authConfiguration, router, oidcSecurityCheckSession, oidcSecuritySilentRenew, oidcSecurityUserService, oidcSecurityCommon, authWellKnownEndpoints) {
        this.platformId = platformId;
        this.http = http;
        this.authConfiguration = authConfiguration;
        this.router = router;
        this.oidcSecurityCheckSession = oidcSecurityCheckSession;
        this.oidcSecuritySilentRenew = oidcSecuritySilentRenew;
        this.oidcSecurityUserService = oidcSecurityUserService;
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.authWellKnownEndpoints = authWellKnownEndpoints;
        this.onModuleSetup = new EventEmitter(true);
        this.onAuthorizationResult = new EventEmitter(true);
        this.moduleSetup = false;
        this._isAuthorized = new BehaviorSubject(false);
        this.lastUserData = undefined;
        this._userData = new BehaviorSubject('');
        this.authWellKnownEndpointsLoaded = false;
    }
    /**
     * @param {?} openIDImplicitFlowConfiguration
     * @return {?}
     */
    setupModule(openIDImplicitFlowConfiguration) {
        this.authConfiguration.init(openIDImplicitFlowConfiguration);
        this.oidcSecurityValidation = new OidcSecurityValidation(this.oidcSecurityCommon);
        this.oidcSecurityCheckSession.onCheckSessionChanged.subscribe(() => { this.onCheckSessionChanged(); });
        this.authWellKnownEndpoints.onWellKnownEndpointsLoaded.subscribe(() => { this.onWellKnownEndpointsLoaded(); });
        this._userData.subscribe(() => { this.onUserDataChanged(); });
        this.oidcSecurityCommon.setupModule();
        const /** @type {?} */ userData = this.oidcSecurityCommon.userData;
        if (userData !== '') {
            this.setUserData(userData);
        }
        const /** @type {?} */ isAuthorized = this.oidcSecurityCommon.isAuthorized;
        if (isAuthorized !== undefined) {
            this.setIsAuthorized(isAuthorized);
            // Start the silent renew
            this.runTokenValidation();
        }
        this.oidcSecurityCommon.logDebug('STS server: ' + this.authConfiguration.stsServer);
        if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            this.authWellKnownEndpoints.onWellKnownEndpointsLoaded.subscribe(() => {
                this.moduleSetup = true;
                this.onModuleSetup.emit();
                if (this.authConfiguration.silent_renew) {
                    this.oidcSecuritySilentRenew.initRenew();
                }
                if (this.authConfiguration.start_checksession) {
                    this.oidcSecurityCheckSession.init().subscribe(() => {
                        this.oidcSecurityCheckSession.pollServerSession(this.authConfiguration.client_id);
                    });
                }
            });
            this.authWellKnownEndpoints.setupModule();
        }
        else {
            this.moduleSetup = true;
            this.onModuleSetup.emit();
        }
    }
    /**
     * @return {?}
     */
    getUserData() {
        return this._userData.asObservable();
    }
    /**
     * @param {?} userData
     * @return {?}
     */
    setUserData(userData) {
        this.oidcSecurityCommon.userData = userData;
        this._userData.next(userData);
    }
    /**
     * @return {?}
     */
    getIsAuthorized() {
        return this._isAuthorized.asObservable();
    }
    /**
     * @param {?} isAuthorized
     * @return {?}
     */
    setIsAuthorized(isAuthorized) {
        this._isAuthorizedValue = isAuthorized;
        this._isAuthorized.next(isAuthorized);
    }
    /**
     * @return {?}
     */
    getToken() {
        if (!this._isAuthorizedValue) {
            return '';
        }
        let /** @type {?} */ token = this.oidcSecurityCommon.getAccessToken();
        return decodeURIComponent(token);
    }
    /**
     * @return {?}
     */
    getIdToken() {
        if (!this._isAuthorizedValue) {
            return '';
        }
        let /** @type {?} */ token = this.oidcSecurityCommon.getIdToken();
        return decodeURIComponent(token);
    }
    /**
     * @param {?=} encode
     * @return {?}
     */
    getPayloadFromIdToken(encode = false) {
        const /** @type {?} */ token = this.getIdToken();
        return this.oidcSecurityValidation.getPayloadFromToken(token, encode);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this.oidcSecurityCommon.authStateControl = state;
    }
    /**
     * @return {?}
     */
    getState() {
        return this.oidcSecurityCommon.authStateControl;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    setCustomRequestParameters(params) {
        this.oidcSecurityCommon.customRequestParams = params;
    }
    /**
     * @return {?}
     */
    authorize() {
        let /** @type {?} */ data = this.oidcSecurityCommon.wellKnownEndpoints;
        if (data && data !== '') {
            this.authWellKnownEndpointsLoaded = true;
        }
        if (!this.authWellKnownEndpointsLoaded) {
            this.oidcSecurityCommon.logError('Well known endpoints must be loaded before user can login!');
            return;
        }
        if (!this.oidcSecurityValidation.config_validate_response_type(this.authConfiguration.response_type)) {
            // invalid response_type
            return;
        }
        this.resetAuthorizationData(false);
        this.oidcSecurityCommon.logDebug('BEGIN Authorize, no auth data');
        let /** @type {?} */ state = this.oidcSecurityCommon.authStateControl;
        if (state === '' || state === null) {
            state = Date.now() + '' + Math.random();
            this.oidcSecurityCommon.authStateControl = state;
        }
        let /** @type {?} */ nonce = 'N' + Math.random() + '' + Date.now();
        this.oidcSecurityCommon.authNonce = nonce;
        this.oidcSecurityCommon.logDebug('AuthorizedController created. local state: ' + this.oidcSecurityCommon.authStateControl);
        let /** @type {?} */ url = this.createAuthorizeUrl(nonce, state, this.authWellKnownEndpoints.authorization_endpoint);
        window.location.href = url;
    }
    /**
     * @param {?=} hash
     * @return {?}
     */
    authorizedCallback(hash) {
        let /** @type {?} */ silentRenew = this.oidcSecurityCommon.silentRenewRunning;
        let /** @type {?} */ isRenewProcess = (silentRenew === 'running');
        this.oidcSecurityCommon.logDebug('BEGIN authorizedCallback, no auth data');
        this.resetAuthorizationData(isRenewProcess);
        hash = hash || window.location.hash.substr(1);
        let /** @type {?} */ result = hash.split('&').reduce(function (result, item) {
            let /** @type {?} */ parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});
        this.oidcSecurityCommon.authResult = result;
        this.oidcSecurityCommon.logDebug(result);
        this.oidcSecurityCommon.logDebug('authorizedCallback created, begin token validation');
        let /** @type {?} */ access_token = '';
        let /** @type {?} */ id_token = '';
        let /** @type {?} */ authResponseIsValid = false;
        let /** @type {?} */ decoded_id_token;
        this.getSigningKeys()
            .subscribe(jwtKeys => {
            this.jwtKeys = jwtKeys;
            if (!result.error) {
                // validate state
                if (this.oidcSecurityValidation.validateStateFromHashCallback(result.state, this.oidcSecurityCommon.authStateControl)) {
                    if (this.authConfiguration.response_type === 'id_token token') {
                        access_token = result.access_token;
                    }
                    id_token = result.id_token;
                    decoded_id_token = this.oidcSecurityValidation.getPayloadFromToken(id_token, false);
                    // validate jwt signature
                    if (this.oidcSecurityValidation.validate_signature_id_token(id_token, this.jwtKeys)) {
                        // validate nonce
                        if (this.oidcSecurityValidation.validate_id_token_nonce(decoded_id_token, this.oidcSecurityCommon.authNonce)) {
                            // validate required fields id_token
                            if (this.oidcSecurityValidation.validate_required_id_token(decoded_id_token)) {
                                // validate max offset from the id_token issue to now
                                if (this.oidcSecurityValidation.validate_id_token_iat_max_offset(decoded_id_token, this.authConfiguration.max_id_token_iat_offset_allowed_in_seconds)) {
                                    // validate iss
                                    if (this.oidcSecurityValidation.validate_id_token_iss(decoded_id_token, this.authWellKnownEndpoints.issuer)) {
                                        // validate aud
                                        if (this.oidcSecurityValidation.validate_id_token_aud(decoded_id_token, this.authConfiguration.client_id)) {
                                            // validate_id_token_exp_not_expired
                                            if (this.oidcSecurityValidation.validate_id_token_exp_not_expired(decoded_id_token)) {
                                                // flow id_token token
                                                if (this.authConfiguration.response_type === 'id_token token') {
                                                    // valiadate at_hash and access_token
                                                    if (this.oidcSecurityValidation.validate_id_token_at_hash(access_token, decoded_id_token.at_hash) || !access_token) {
                                                        authResponseIsValid = true;
                                                        this.successful_validation();
                                                    }
                                                    else {
                                                        this.oidcSecurityCommon.logWarning('authorizedCallback incorrect at_hash');
                                                    }
                                                }
                                                else {
                                                    authResponseIsValid = true;
                                                    this.successful_validation();
                                                }
                                            }
                                            else {
                                                this.oidcSecurityCommon.logWarning('authorizedCallback token expired');
                                            }
                                        }
                                        else {
                                            this.oidcSecurityCommon.logWarning('authorizedCallback incorrect aud');
                                        }
                                    }
                                    else {
                                        this.oidcSecurityCommon.logWarning('authorizedCallback incorrect iss does not match authWellKnownEndpoints issuer');
                                    }
                                }
                                else {
                                    this.oidcSecurityCommon.logWarning('authorizedCallback Validation, iat rejected id_token was issued too far away from the current time');
                                }
                            }
                            else {
                                this.oidcSecurityCommon.logDebug('authorizedCallback Validation, one of the REQUIRED properties missing from id_token');
                            }
                        }
                        else {
                            this.oidcSecurityCommon.logWarning('authorizedCallback incorrect nonce');
                        }
                    }
                    else {
                        this.oidcSecurityCommon.logDebug('authorizedCallback Signature validation failed id_token');
                    }
                }
                else {
                    this.oidcSecurityCommon.logWarning('authorizedCallback incorrect state');
                }
            }
            this.oidcSecurityCommon.silentRenewRunning = '';
            if (authResponseIsValid) {
                this.setAuthorizationData(access_token, id_token);
                if (this.authConfiguration.auto_userinfo) {
                    this.getUserinfo(isRenewProcess, result, id_token, decoded_id_token).subscribe((response) => {
                        if (response) {
                            if (this.authConfiguration.trigger_authorization_result_event) {
                                this.onAuthorizationResult.emit(AuthorizationResult.authorized);
                            }
                            else {
                                this.router.navigate([this.authConfiguration.post_login_route]);
                            }
                        }
                        else {
                            if (this.authConfiguration.trigger_authorization_result_event) {
                                this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
                            }
                            else {
                                this.router.navigate([this.authConfiguration.unauthorized_route]);
                            }
                        }
                    });
                }
                else {
                    this.runTokenValidation();
                    if (this.authConfiguration.trigger_authorization_result_event) {
                        this.onAuthorizationResult.emit(AuthorizationResult.authorized);
                    }
                    else {
                        this.router.navigate([this.authConfiguration.post_login_route]);
                    }
                }
            }
            else {
                this.oidcSecurityCommon.logDebug('authorizedCallback, token(s) validation failed, resetting');
                this.resetAuthorizationData(false);
                if (this.authConfiguration.trigger_authorization_result_event) {
                    this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
                }
                else {
                    this.router.navigate([this.authConfiguration.unauthorized_route]);
                }
            }
        });
    }
    /**
     * @param {?=} isRenewProcess
     * @param {?=} result
     * @param {?=} id_token
     * @param {?=} decoded_id_token
     * @return {?}
     */
    getUserinfo(isRenewProcess = false, result, id_token, decoded_id_token) {
        result = result ? result : this.oidcSecurityCommon.authResult;
        id_token = id_token ? id_token : this.oidcSecurityCommon.idToken;
        decoded_id_token = decoded_id_token ? decoded_id_token : this.oidcSecurityValidation.getPayloadFromToken(id_token, false);
        return new Observable(observer => {
            // flow id_token token
            if (this.authConfiguration.response_type === 'id_token token') {
                if (isRenewProcess) {
                    this.oidcSecurityCommon.sessionState = result.session_state;
                    observer.next(true);
                    observer.complete();
                }
                else {
                    this.oidcSecurityUserService.initUserData()
                        .subscribe(() => {
                        this.oidcSecurityCommon.logDebug('authorizedCallback id_token token flow');
                        if (this.oidcSecurityValidation.validate_userdata_sub_id_token(decoded_id_token.sub, this.oidcSecurityUserService.userData.sub)) {
                            this.setUserData(this.oidcSecurityUserService.userData);
                            this.oidcSecurityCommon.logDebug(this.oidcSecurityCommon.accessToken);
                            this.oidcSecurityCommon.logDebug(this.oidcSecurityUserService.userData);
                            this.oidcSecurityCommon.sessionState = result.session_state;
                            this.runTokenValidation();
                            observer.next(true);
                        }
                        else {
                            this.oidcSecurityCommon.logWarning('authorizedCallback, User data sub does not match sub in id_token');
                            this.oidcSecurityCommon.logDebug('authorizedCallback, token(s) validation failed, resetting');
                            this.resetAuthorizationData(false);
                            observer.next(false);
                        }
                        observer.complete();
                    });
                }
            }
            else {
                this.oidcSecurityCommon.logDebug('authorizedCallback id_token flow');
                this.oidcSecurityCommon.logDebug(this.oidcSecurityCommon.accessToken);
                // userData is set to the id_token decoded. No access_token.
                this.oidcSecurityUserService.userData = decoded_id_token;
                this.setUserData(this.oidcSecurityUserService.userData);
                this.oidcSecurityCommon.sessionState = result.session_state;
                if (!isRenewProcess) {
                    this.runTokenValidation();
                }
                observer.next(true);
                observer.complete();
            }
        });
    }
    /**
     * @return {?}
     */
    logoff() {
        // /connect/endsession?id_token_hint=...&post_logout_redirect_uri=https://myapp.com
        this.oidcSecurityCommon.logDebug('BEGIN Authorize, no auth data');
        if (this.authWellKnownEndpoints.end_session_endpoint) {
            let /** @type {?} */ end_session_endpoint = this.authWellKnownEndpoints.end_session_endpoint;
            let /** @type {?} */ id_token_hint = this.oidcSecurityCommon.idToken;
            let /** @type {?} */ url = this.createEndSessionUrl(end_session_endpoint, id_token_hint);
            this.resetAuthorizationData(false);
            if (this.authConfiguration.start_checksession && this.checkSessionChanged) {
                this.oidcSecurityCommon.logDebug('only local login cleaned up, server session has changed');
            }
            else {
                window.location.href = url;
            }
        }
        else {
            this.resetAuthorizationData(false);
            this.oidcSecurityCommon.logDebug('only local login cleaned up, no end_session_endpoint');
        }
    }
    /**
     * @return {?}
     */
    successful_validation() {
        this.oidcSecurityCommon.authNonce = '';
        if (this.authConfiguration.auto_clean_state_after_authentication) {
            this.oidcSecurityCommon.authStateControl = '';
        }
        this.oidcSecurityCommon.logDebug('AuthorizedCallback token(s) validated, continue');
    }
    /**
     * @return {?}
     */
    refreshSession() {
        this.oidcSecurityCommon.logDebug('BEGIN refresh session Authorize');
        let /** @type {?} */ state = this.oidcSecurityCommon.authStateControl;
        if (state === '' || state === null) {
            state = Date.now() + '' + Math.random();
            this.oidcSecurityCommon.authStateControl = state;
        }
        let /** @type {?} */ nonce = 'N' + Math.random() + '' + Date.now();
        this.oidcSecurityCommon.authNonce = nonce;
        this.oidcSecurityCommon.logDebug('RefreshSession created. adding myautostate: ' + this.oidcSecurityCommon.authStateControl);
        let /** @type {?} */ url = this.createAuthorizeUrl(nonce, state, this.authWellKnownEndpoints.authorization_endpoint, 'none');
        this.oidcSecurityCommon.silentRenewRunning = 'running';
        this.oidcSecuritySilentRenew.startRenew(url);
    }
    /**
     * @param {?} access_token
     * @param {?} id_token
     * @return {?}
     */
    setAuthorizationData(access_token, id_token) {
        if (this.oidcSecurityCommon.accessToken !== '') {
            this.oidcSecurityCommon.accessToken = '';
        }
        this.oidcSecurityCommon.logDebug(access_token);
        this.oidcSecurityCommon.logDebug(id_token);
        this.oidcSecurityCommon.logDebug('storing to storage, getting the roles');
        this.oidcSecurityCommon.accessToken = access_token;
        this.oidcSecurityCommon.idToken = id_token;
        this.setIsAuthorized(true);
        this.oidcSecurityCommon.isAuthorized = true;
    }
    /**
     * @param {?} nonce
     * @param {?} state
     * @param {?} authorization_endpoint
     * @param {?=} prompt
     * @return {?}
     */
    createAuthorizeUrl(nonce, state, authorization_endpoint, prompt) {
        let /** @type {?} */ urlParts = authorization_endpoint.split('?');
        let /** @type {?} */ authorizationUrl = urlParts[0];
        let /** @type {?} */ params = new HttpParams({ fromString: urlParts[1], encoder: new UriEncoder() });
        params = params.set('client_id', this.authConfiguration.client_id);
        params = params.append('redirect_uri', this.authConfiguration.redirect_url);
        params = params.append('response_type', this.authConfiguration.response_type);
        params = params.append('scope', this.authConfiguration.scope);
        params = params.append('nonce', nonce);
        params = params.append('state', state);
        if (prompt) {
            params = params.append('prompt', prompt);
        }
        if (this.authConfiguration.hd_param) {
            params = params.append('hd', this.authConfiguration.hd_param);
        }
        let /** @type {?} */ customParams = Object.assign({}, this.oidcSecurityCommon.customRequestParams);
        Object.keys(customParams).forEach(key => {
            params = params.append(key, customParams[key].toString());
        });
        return `${authorizationUrl}?${params}`;
    }
    /**
     * @param {?} end_session_endpoint
     * @param {?} id_token_hint
     * @return {?}
     */
    createEndSessionUrl(end_session_endpoint, id_token_hint) {
        let /** @type {?} */ urlParts = end_session_endpoint.split('?');
        let /** @type {?} */ authorizationEndsessionUrl = urlParts[0];
        let /** @type {?} */ params = new HttpParams({ fromString: urlParts[1], encoder: new UriEncoder() });
        params = params.set('id_token_hint', id_token_hint);
        params = params.append('post_logout_redirect_uri', this.authConfiguration.post_logout_redirect_uri);
        return `${authorizationEndsessionUrl}?${params}`;
    }
    /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    resetAuthorizationData(isRenewProcess) {
        if (!isRenewProcess) {
            if (this.authConfiguration.auto_userinfo) {
                // Clear user data. Fixes #97.
                this.setUserData('');
            }
            this.setIsAuthorized(false);
            this.oidcSecurityCommon.resetStorageData(isRenewProcess);
            this.checkSessionChanged = false;
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        this.oidcSecurityCommon.logError(error);
        if (error.status == 403) {
            if (this.authConfiguration.trigger_authorization_result_event) {
                this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
            }
            else {
                this.router.navigate([this.authConfiguration.forbidden_route]);
            }
        }
        else if (error.status == 401) {
            let /** @type {?} */ silentRenew = this.oidcSecurityCommon.silentRenewRunning;
            this.resetAuthorizationData(silentRenew !== '');
            if (this.authConfiguration.trigger_authorization_result_event) {
                this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
            }
            else {
                this.router.navigate([this.authConfiguration.unauthorized_route]);
            }
        }
    }
    /**
     * @return {?}
     */
    onCheckSessionChanged() {
        this.oidcSecurityCommon.logDebug('onCheckSessionChanged');
        this.checkSessionChanged = true;
    }
    /**
     * @return {?}
     */
    onWellKnownEndpointsLoaded() {
        this.oidcSecurityCommon.logDebug('onWellKnownEndpointsLoaded');
        this.authWellKnownEndpointsLoaded = true;
    }
    /**
     * @return {?}
     */
    onUserDataChanged() {
        this.oidcSecurityCommon.logDebug(`onUserDataChanged: last = ${this.lastUserData}, new = ${this._userData.value}`);
        if (this.lastUserData && !this._userData.value) {
            this.oidcSecurityCommon.logDebug('onUserDataChanged: Logout detected.');
            // TODO should we have an action here
        }
        this.lastUserData = this._userData.value;
    }
    /**
     * @return {?}
     */
    getSigningKeys() {
        this.oidcSecurityCommon.logDebug('jwks_uri: ' + this.authWellKnownEndpoints.jwks_uri);
        return this.http.get(this.authWellKnownEndpoints.jwks_uri)
            .catch(this.handleErrorGetSigningKeys);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleErrorGetSigningKeys(error) {
        let /** @type {?} */ errMsg;
        if (error instanceof Response) {
            const /** @type {?} */ body = error.json() || {};
            const /** @type {?} */ err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    /**
     * @return {?}
     */
    runTokenValidation() {
        if (this.runTokenValidationRunning) {
            return;
        }
        this.runTokenValidationRunning = true;
        let /** @type {?} */ source = Observable.timer(5000, 3000)
            .timeInterval()
            .pluck('interval')
            .take(10000);
        source.subscribe(() => {
            if (this._userData.value) {
                if (this.oidcSecurityValidation.isTokenExpired(this.oidcSecurityCommon.idToken, this.authConfiguration.silent_renew_offset_in_seconds)) {
                    this.oidcSecurityCommon.logDebug('IsAuthorized: id_token isTokenExpired, start silent renew if active');
                    if (this.authConfiguration.silent_renew) {
                        this.refreshSession();
                    }
                    else {
                        this.resetAuthorizationData(false);
                    }
                }
            }
        }, (err) => {
            this.oidcSecurityCommon.logError('Error: ' + err);
        }, () => {
            this.oidcSecurityCommon.logDebug('Completed');
        });
    }
}
OidcSecurityService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OidcSecurityService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: HttpClient, },
    { type: AuthConfiguration, },
    { type: Router, },
    { type: OidcSecurityCheckSession, },
    { type: OidcSecuritySilentRenew, },
    { type: OidcSecurityUserService, },
    { type: OidcSecurityCommon, },
    { type: AuthWellKnownEndpoints, },
];
OidcSecurityService.propDecorators = {
    'onModuleSetup': [{ type: Output },],
    'onAuthorizationResult': [{ type: Output },],
};

class AuthModule {
    /**
     * @param {?=} token
     * @return {?}
     */
    static forRoot(token = {}) {
        return {
            ngModule: AuthModule,
            providers: [
                OidcSecurityService,
                OidcSecurityValidation,
                OidcSecurityCheckSession,
                OidcSecuritySilentRenew,
                OidcSecurityUserService,
                OidcSecurityCommon,
                AuthConfiguration,
                DefaultConfiguration,
                AuthWellKnownEndpoints,
                {
                    provide: OidcSecurityStorage,
                    useClass: token.storage || BrowserStorage
                }
            ]
        };
    }
}
AuthModule.decorators = [
    { type: NgModule },
];
/**
 * @nocollapse
 */
AuthModule.ctorParameters = () => [];

// Public classes.

/**
 * Angular OpenID Connect Implicit Flow.
 * OpenID Connect Implicit Flow RP Client
 * Written by Damien Bowden.
 * MIT license.
 * https://github.com/damienbod/angular-auth-oidc-client
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OidcSecurityService, OidcSecurityValidation, OidcSecurityCheckSession, OidcSecuritySilentRenew, OidcSecurityUserService, OidcSecurityCommon, OidcSecurityStorage, BrowserStorage, AuthWellKnownEndpoints, AuthorizationResult, AuthConfiguration, OpenIDImplicitFlowConfiguration, DefaultConfiguration, AuthModule };
//# sourceMappingURL=angular-auth-oidc-client.js.map
