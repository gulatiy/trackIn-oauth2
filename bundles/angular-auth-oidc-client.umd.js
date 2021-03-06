(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(
        exports,
        require('@angular/core'),
        require('@angular/common/http'),
        require('@angular/common'),
        require('rxjs/add/operator/map'),
        require('rxjs/add/operator/catch'),
        require('rxjs/add/operator/timeInterval'),
        require('rxjs/add/operator/pluck'),
        require('rxjs/add/operator/take'),
        require('rxjs/add/observable/interval'),
        require('rxjs/add/observable/timer'),
        require('rxjs/Observable'),
        require('rxjs/BehaviorSubject'),
        require('@angular/router'),
        require('jsrsasign'),
        require('rxjs/add/observable/throw'),
        require('rxjs/add/observable/empty')
      )
    : typeof define === 'function' && define.amd
    ? define([
        'exports',
        '@angular/core',
        '@angular/common/http',
        '@angular/common',
        'rxjs/add/operator/map',
        'rxjs/add/operator/catch',
        'rxjs/add/operator/timeInterval',
        'rxjs/add/operator/pluck',
        'rxjs/add/operator/take',
        'rxjs/add/observable/interval',
        'rxjs/add/observable/timer',
        'rxjs/Observable',
        'rxjs/BehaviorSubject',
        '@angular/router',
        'jsrsasign',
        'rxjs/add/observable/throw',
        'rxjs/add/observable/empty'
      ], factory)
    : factory(
        ((global.ng = global.ng || {}), (global.ng.angularAuthOidcClient = global.ng.angularAuthOidcClient || {})),
        global.ng.core,
        global.ng.http,
        global.ng.common,
        global.Rx.Observable.prototype,
        global.Rx.Observable.prototype,
        global.Rx.Observable.prototype,
        global.Rx.Observable.prototype,
        global.Rx.Observable.prototype,
        global.Rx.Observable,
        global.Rx.Observable,
        global.Rx,
        global.Rx,
        global.ng.router,
        global.jsrsasign
      );
})(this, function(
  exports,
  _angular_core,
  _angular_common_http,
  _angular_common,
  rxjs_add_operator_map,
  rxjs_add_operator_catch,
  rxjs_add_operator_timeInterval,
  rxjs_add_operator_pluck,
  rxjs_add_operator_take,
  rxjs_add_observable_interval,
  rxjs_add_observable_timer,
  rxjs_Observable,
  rxjs_BehaviorSubject,
  _angular_router,
  jsrsasign
) {
  'use strict';

  var DefaultConfiguration = /** @class */ (function() {
    function DefaultConfiguration() {
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
      this.silent_renew = false;
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
    return DefaultConfiguration;
  })();
  var OpenIDImplicitFlowConfiguration = /** @class */ (function() {
    function OpenIDImplicitFlowConfiguration() {}
    return OpenIDImplicitFlowConfiguration;
  })();
  var AuthConfiguration = /** @class */ (function() {
    /**
     * @param {?} defaultConfig
     */
    function AuthConfiguration(defaultConfig) {
      this.defaultConfig = defaultConfig;
    }
    Object.defineProperty(AuthConfiguration.prototype, 'stsServer', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.stsServer || this.defaultConfig.stsServer;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'redirect_url', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.redirect_url || this.defaultConfig.redirect_url;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'client_id', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.client_id || this.defaultConfig.client_id;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'response_type', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.response_type || this.defaultConfig.response_type;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'resource', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.resource || this.defaultConfig.resource;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'scope', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.scope || this.defaultConfig.scope;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'hd_param', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.hd_param || this.defaultConfig.hd_param;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'post_logout_redirect_uri', {
      /**
       * @return {?}
       */
      get: function() {
        return (
          this.openIDImplicitFlowConfiguration.post_logout_redirect_uri || this.defaultConfig.post_logout_redirect_uri
        );
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'start_checksession', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.start_checksession !== undefined
          ? this.openIDImplicitFlowConfiguration.start_checksession
          : this.defaultConfig.start_checksession;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'silent_renew', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.silent_renew !== undefined
          ? this.openIDImplicitFlowConfiguration.silent_renew
          : this.defaultConfig.silent_renew;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'silent_renew_offset_in_seconds', {
      /**
       * @return {?}
       */
      get: function() {
        return (
          this.openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds ||
          this.defaultConfig.silent_renew_offset_in_seconds
        );
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'post_login_route', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.post_login_route || this.defaultConfig.post_login_route;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'forbidden_route', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.forbidden_route || this.defaultConfig.forbidden_route;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'unauthorized_route', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.unauthorized_route || this.defaultConfig.unauthorized_route;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'auto_userinfo', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.auto_userinfo !== undefined
          ? this.openIDImplicitFlowConfiguration.auto_userinfo
          : this.defaultConfig.auto_userinfo;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'auto_clean_state_after_authentication', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.auto_clean_state_after_authentication !== undefined
          ? this.openIDImplicitFlowConfiguration.auto_clean_state_after_authentication
          : this.defaultConfig.auto_clean_state_after_authentication;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'trigger_authorization_result_event', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.trigger_authorization_result_event !== undefined
          ? this.openIDImplicitFlowConfiguration.trigger_authorization_result_event
          : this.defaultConfig.trigger_authorization_result_event;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'log_console_warning_active', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.log_console_warning_active !== undefined
          ? this.openIDImplicitFlowConfiguration.log_console_warning_active
          : this.defaultConfig.log_console_warning_active;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'log_console_debug_active', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.log_console_debug_active !== undefined
          ? this.openIDImplicitFlowConfiguration.log_console_debug_active
          : this.defaultConfig.log_console_debug_active;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'max_id_token_iat_offset_allowed_in_seconds', {
      /**
       * @return {?}
       */
      get: function() {
        return (
          this.openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds ||
          this.defaultConfig.max_id_token_iat_offset_allowed_in_seconds
        );
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'override_well_known_configuration', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.override_well_known_configuration !== undefined
          ? this.openIDImplicitFlowConfiguration.override_well_known_configuration
          : this.defaultConfig.override_well_known_configuration;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'override_well_known_configuration_url', {
      /**
       * @return {?}
       */
      get: function() {
        return (
          this.openIDImplicitFlowConfiguration.override_well_known_configuration_url ||
          this.defaultConfig.override_well_known_configuration_url
        );
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, 'storage', {
      /**
       * @return {?}
       */
      get: function() {
        return this.openIDImplicitFlowConfiguration.storage || this.defaultConfig.storage;
      },
      enumerable: true,
      configurable: true
    });
    /**
     * @param {?} openIDImplicitFlowConfiguration
     * @return {?}
     */
    AuthConfiguration.prototype.init = function(openIDImplicitFlowConfiguration) {
      this.openIDImplicitFlowConfiguration = openIDImplicitFlowConfiguration;
    };
    return AuthConfiguration;
  })();
  AuthConfiguration.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  AuthConfiguration.ctorParameters = function() {
    return [{ type: DefaultConfiguration }];
  };
  /**
   * Implement this class-interface to create a custom storage.
   * @abstract
   */
  var OidcSecurityStorage = /** @class */ (function() {
    function OidcSecurityStorage() {}
    /**
     * This method must contain the logic to read the storage.
     * @abstract
     * @param {?} key
     * @return {?} The value of the given key
     */
    OidcSecurityStorage.prototype.read = function(key) {};
    /**
     * This method must contain the logic to write the storage.
     * @abstract
     * @param {?} key
     * @param {?} value The value for the given key
     * @return {?}
     */
    OidcSecurityStorage.prototype.write = function(key, value) {};
    return OidcSecurityStorage;
  })();
  OidcSecurityStorage.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecurityStorage.ctorParameters = function() {
    return [];
  };
  var BrowserStorage = /** @class */ (function() {
    /**
     * @param {?} authConfiguration
     */
    function BrowserStorage(authConfiguration) {
      this.authConfiguration = authConfiguration;
      this.hasStorage = typeof Storage !== 'undefined';
    }
    /**
     * @param {?} key
     * @return {?}
     */
    BrowserStorage.prototype.read = function(key) {
      if (this.hasStorage) {
        return JSON.parse(this.authConfiguration.storage.getItem(key));
      }
      return;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    BrowserStorage.prototype.write = function(key, value) {
      if (this.hasStorage) {
        value = value === undefined ? null : value;
        this.authConfiguration.storage.setItem(key, JSON.stringify(value));
      }
    };
    return BrowserStorage;
  })();
  BrowserStorage.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  BrowserStorage.ctorParameters = function() {
    return [{ type: AuthConfiguration }];
  };
  var OidcSecurityCommon = /** @class */ (function() {
    /**
     * @param {?} authConfiguration
     * @param {?} oidcSecurityStorage
     */
    function OidcSecurityCommon(authConfiguration, oidcSecurityStorage) {
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
    Object.defineProperty(OidcSecurityCommon.prototype, 'authResult', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_auth_result);
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_auth_result, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'accessToken', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_access_token) || '';
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_access_token, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'idToken', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_id_token) || '';
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_id_token, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'isAuthorized', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_is_authorized);
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_is_authorized, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'userData', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_user_data);
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_user_data, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'authNonce', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_auth_nonce) || '';
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_auth_nonce, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'authStateControl', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_auth_state_control) || '';
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_auth_state_control, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'wellKnownEndpoints', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_well_known_endpoints);
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_well_known_endpoints, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'sessionState', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_session_state);
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_session_state, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'silentRenewRunning', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_silent_renew_running) || '';
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_silent_renew_running, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, 'customRequestParams', {
      /**
       * @return {?}
       */
      get: function() {
        return this.retrieve(this.storage_custom_request_params);
      },
      /**
       * @param {?} value
       * @return {?}
       */
      set: function(value) {
        this.store(this.storage_custom_request_params, value);
      },
      enumerable: true,
      configurable: true
    });
    /**
     * @return {?}
     */
    OidcSecurityCommon.prototype.setupModule = function() {};
    /**
     * @param {?} key
     * @return {?}
     */
    OidcSecurityCommon.prototype.retrieve = function(key) {
      return this.oidcSecurityStorage.read(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    OidcSecurityCommon.prototype.store = function(key, value) {
      this.oidcSecurityStorage.write(key, value);
    };
    /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    OidcSecurityCommon.prototype.resetStorageData = function(isRenewProcess) {
      if (!isRenewProcess) {
        this.store(this.storage_auth_result, '');
        this.store(this.storage_session_state, '');
        this.store(this.storage_silent_renew_running, '');
        this.store(this.storage_is_authorized, false);
        this.store(this.storage_access_token, '');
        this.store(this.storage_id_token, '');
        this.store(this.storage_user_data, '');
      }
    };
    /**
     * @return {?}
     */
    OidcSecurityCommon.prototype.getAccessToken = function() {
      return this.retrieve(this.storage_access_token);
    };
    /**
     * @return {?}
     */
    OidcSecurityCommon.prototype.getIdToken = function() {
      return this.retrieve(this.storage_id_token);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    OidcSecurityCommon.prototype.logError = function(message) {
      console.error(message);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    OidcSecurityCommon.prototype.logWarning = function(message) {
      if (this.authConfiguration.log_console_warning_active) {
        console.warn(message);
      }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    OidcSecurityCommon.prototype.logDebug = function(message) {
      if (this.authConfiguration.log_console_debug_active) {
        console.log(message);
      }
    };
    return OidcSecurityCommon;
  })();
  OidcSecurityCommon.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecurityCommon.ctorParameters = function() {
    return [{ type: AuthConfiguration }, { type: OidcSecurityStorage }];
  };
  var OidcSecurityValidation = /** @class */ (function() {
    /**
     * @param {?} oidcSecurityCommon
     */
    function OidcSecurityValidation(oidcSecurityCommon) {
      this.oidcSecurityCommon = oidcSecurityCommon;
    }
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    OidcSecurityValidation.prototype.isTokenExpired = function(token, offsetSeconds) {
      var /** @type {?} */ decoded;
      decoded = this.getPayloadFromToken(token, false);
      return !this.validate_id_token_exp_not_expired(decoded, offsetSeconds);
    };
    /**
     * @param {?} decoded_id_token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_id_token_exp_not_expired = function(decoded_id_token, offsetSeconds) {
      var /** @type {?} */ tokenExpirationDate = this.getTokenExpirationDate(decoded_id_token);
      offsetSeconds = offsetSeconds || 0;
      if (tokenExpirationDate == null) {
        return false;
      }
      // Token not expired?
      return tokenExpirationDate.valueOf() > new Date().valueOf() + offsetSeconds * 1000;
    };
    /**
     * @param {?} dataIdToken
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_required_id_token = function(dataIdToken) {
      var /** @type {?} */ validated = true;
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
    };
    /**
     * @param {?} dataIdToken
     * @param {?} max_offset_allowed_in_seconds
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_id_token_iat_max_offset = function(
      dataIdToken,
      max_offset_allowed_in_seconds
    ) {
      if (!dataIdToken.hasOwnProperty('iat')) {
        return false;
      }
      var /** @type {?} */ dateTime_iat_id_token = new Date(0); // The 0 here is the key, which sets the date to the epoch
      dateTime_iat_id_token.setUTCSeconds(dataIdToken.iat);
      max_offset_allowed_in_seconds = max_offset_allowed_in_seconds || 0;
      if (dateTime_iat_id_token == null) {
        return false;
      }
      this.oidcSecurityCommon.logDebug(
        'validate_id_token_iat_max_offset: ' +
          (new Date().valueOf() - dateTime_iat_id_token.valueOf()) +
          ' < ' +
          max_offset_allowed_in_seconds * 1000
      );
      return new Date().valueOf() - dateTime_iat_id_token.valueOf() < max_offset_allowed_in_seconds * 1000;
    };
    /**
     * @param {?} dataIdToken
     * @param {?} local_nonce
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_id_token_nonce = function(dataIdToken, local_nonce) {
      if (dataIdToken.nonce !== local_nonce) {
        this.oidcSecurityCommon.logDebug(
          'Validate_id_token_nonce failed, dataIdToken.nonce: ' + dataIdToken.nonce + ' local_nonce:' + local_nonce
        );
        return false;
      }
      return true;
    };
    /**
     * @param {?} dataIdToken
     * @param {?} authWellKnownEndpoints_issuer
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_id_token_iss = function(dataIdToken, authWellKnownEndpoints_issuer) {
      if (dataIdToken.iss != authWellKnownEndpoints_issuer) {
        this.oidcSecurityCommon.logDebug(
          'Validate_id_token_iss failed, dataIdToken.iss: ' +
            dataIdToken.iss +
            ' authWellKnownEndpoints issuer:' +
            authWellKnownEndpoints_issuer
        );
        return false;
      }
      return true;
    };
    /**
     * @param {?} dataIdToken
     * @param {?} aud
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_id_token_aud = function(dataIdToken, aud) {
      if (dataIdToken.aud != aud) {
        this.oidcSecurityCommon.logDebug(
          'Validate_id_token_aud failed, dataIdToken.aud: ' + dataIdToken.aud + ' client_id:' + aud
        );
        return false;
      }
      return true;
    };
    /**
     * @param {?} state
     * @param {?} local_state
     * @return {?}
     */
    OidcSecurityValidation.prototype.validateStateFromHashCallback = function(state, local_state) {
      if (state != local_state) {
        this.oidcSecurityCommon.logDebug(
          'ValidateStateFromHashCallback failed, state: ' + state + ' local_state:' + local_state
        );
        return false;
      }
      return true;
    };
    /**
     * @param {?} id_token_sub
     * @param {?} userdata_sub
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_userdata_sub_id_token = function(id_token_sub, userdata_sub) {
      if (id_token_sub != userdata_sub) {
        this.oidcSecurityCommon.logDebug(
          'validate_userdata_sub_id_token failed, id_token_sub: ' + id_token_sub + ' userdata_sub:' + userdata_sub
        );
        return false;
      }
      return true;
    };
    /**
     * @param {?} token
     * @param {?} encode
     * @return {?}
     */
    OidcSecurityValidation.prototype.getPayloadFromToken = function(token, encode) {
      var /** @type {?} */ data = {};
      if (typeof token !== 'undefined') {
        var /** @type {?} */ encoded = token.split('.')[1];
        if (encode) {
          return encoded;
        }
        data = JSON.parse(this.urlBase64Decode(encoded));
      }
      return data;
    };
    /**
     * @param {?} token
     * @param {?} encode
     * @return {?}
     */
    OidcSecurityValidation.prototype.getHeaderFromToken = function(token, encode) {
      var /** @type {?} */ data = {};
      if (typeof token !== 'undefined') {
        var /** @type {?} */ encoded = token.split('.')[0];
        if (encode) {
          return encoded;
        }
        data = JSON.parse(this.urlBase64Decode(encoded));
      }
      return data;
    };
    /**
     * @param {?} token
     * @param {?} encode
     * @return {?}
     */
    OidcSecurityValidation.prototype.getSignatureFromToken = function(token, encode) {
      var /** @type {?} */ data = {};
      if (typeof token !== 'undefined') {
        var /** @type {?} */ encoded = token.split('.')[2];
        if (encode) {
          return encoded;
        }
        data = JSON.parse(this.urlBase64Decode(encoded));
      }
      return data;
    };
    /**
     * @param {?} id_token
     * @param {?} jwtkeys
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_signature_id_token = function(id_token, jwtkeys) {
      if (!jwtkeys || !jwtkeys.keys) {
        return false;
      }
      var /** @type {?} */ header_data = this.getHeaderFromToken(id_token, false);
      if (Object.keys(header_data).length === 0 && header_data.constructor === Object) {
        this.oidcSecurityCommon.logWarning('id token has no header data');
        return false;
      }
      var /** @type {?} */ kid = header_data.kid;
      var /** @type {?} */ alg = header_data.alg;
      if ('RS256' != alg) {
        this.oidcSecurityCommon.logWarning('Only RS256 supported');
        return false;
      }
      var /** @type {?} */ isValid = false;
      if (!header_data.hasOwnProperty('kid')) {
        // exactly 1 key in the jwtkeys and no kid in the Jose header
        // kty	"RSA" use "sig"
        var /** @type {?} */ amountOfMatchingKeys = 0;
        for (var _i = 0, _a = jwtkeys.keys; _i < _a.length; _i++) {
          var key = _a[_i];
          if (key.kty == 'RSA' && key.use == 'sig') {
            amountOfMatchingKeys = amountOfMatchingKeys + 1;
          }
        }
        if (amountOfMatchingKeys == 0) {
          this.oidcSecurityCommon.logWarning('no keys found, incorrect Signature, validation failed for id_token');
          return false;
        } else if (amountOfMatchingKeys > 1) {
          this.oidcSecurityCommon.logWarning('no ID Token kid claim in JOSE header and multiple supplied in jwks_uri');
          return false;
        } else {
          for (var _b = 0, _c = jwtkeys.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            if (key.kty == 'RSA' && key.use == 'sig') {
              var /** @type {?} */ publickey = jsrsasign.KEYUTIL.getKey(key);
              isValid = jsrsasign.KJUR.jws.JWS.verify(id_token, publickey, ['RS256']);
              if (!isValid) {
                this.oidcSecurityCommon.logWarning('incorrect Signature, validation failed for id_token');
              }
              return isValid;
            }
          }
        }
      } else {
        // kid in the Jose header of id_token
        for (var _d = 0, _e = jwtkeys.keys; _d < _e.length; _d++) {
          var key = _e[_d];
          if (key.kid == kid) {
            var /** @type {?} */ publickey = jsrsasign.KEYUTIL.getKey(key);
            isValid = jsrsasign.KJUR.jws.JWS.verify(id_token, publickey, ['RS256']);
            if (!isValid) {
              this.oidcSecurityCommon.logWarning('incorrect Signature, validation failed for id_token');
            }
            return isValid;
          }
        }
      }
      return isValid;
    };
    /**
     * @param {?} response_type
     * @return {?}
     */
    OidcSecurityValidation.prototype.config_validate_response_type = function(response_type) {
      if (response_type === 'id_token token' || response_type === 'id_token') {
        return true;
      }
      this.oidcSecurityCommon.logWarning('module configure incorrect, invalid response_type:' + response_type);
      return false;
    };
    /**
     * @param {?} access_token
     * @param {?} at_hash
     * @return {?}
     */
    OidcSecurityValidation.prototype.validate_id_token_at_hash = function(access_token, at_hash) {
      this.oidcSecurityCommon.logDebug('From the server:' + at_hash);
      var /** @type {?} */ testdata = this.generate_at_hash('' + access_token);
      this.oidcSecurityCommon.logDebug('client validation not decoded:' + testdata);
      if (testdata == at_hash) {
        return true; // isValid;
      } else {
        var /** @type {?} */ testValue = this.generate_at_hash('' + decodeURIComponent(access_token));
        this.oidcSecurityCommon.logDebug('-gen access--' + testValue);
        if (testValue == at_hash) {
          return true; // isValid
        }
      }
      return false;
    };
    /**
     * @param {?} access_token
     * @return {?}
     */
    OidcSecurityValidation.prototype.generate_at_hash = function(access_token) {
      var /** @type {?} */ hash = jsrsasign.KJUR.crypto.Util.hashString(access_token, 'sha256');
      var /** @type {?} */ first128bits = hash.substr(0, hash.length / 2);
      var /** @type {?} */ testdata = jsrsasign.hextob64u(first128bits);
      return testdata;
    };
    /**
     * @param {?} dataIdToken
     * @return {?}
     */
    OidcSecurityValidation.prototype.getTokenExpirationDate = function(dataIdToken) {
      if (!dataIdToken.hasOwnProperty('exp')) {
        return new Date();
      }
      var /** @type {?} */ date = new Date(0); // The 0 here is the key, which sets the date to the epoch
      date.setUTCSeconds(dataIdToken.exp);
      return date;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    OidcSecurityValidation.prototype.urlBase64Decode = function(str) {
      var /** @type {?} */ output = str.replace('-', '+').replace('_', '/');
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
    };
    return OidcSecurityValidation;
  })();
  OidcSecurityValidation.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecurityValidation.ctorParameters = function() {
    return [{ type: OidcSecurityCommon }];
  };
  var AuthWellKnownEndpoints = /** @class */ (function() {
    /**
     * @param {?} http
     * @param {?} authConfiguration
     * @param {?} oidcSecurityCommon
     */
    function AuthWellKnownEndpoints(http, authConfiguration, oidcSecurityCommon) {
      var _this = this;
      this.http = http;
      this.authConfiguration = authConfiguration;
      this.oidcSecurityCommon = oidcSecurityCommon;
      this.onWellKnownEndpointsLoaded = new _angular_core.EventEmitter(true);
      this.getWellKnownEndpoints = function() {
        var /** @type {?} */ headers = new _angular_common_http.HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        var /** @type {?} */ url = _this.authConfiguration.stsServer + '/.well-known/openid-configuration';
        if (_this.authConfiguration.override_well_known_configuration) {
          url = _this.authConfiguration.override_well_known_configuration_url;
        }
        return _this.http.get(url, {
          headers: headers
        });
      };
    }
    /**
     * @return {?}
     */
    AuthWellKnownEndpoints.prototype.setupModule = function() {
      var _this = this;
      var /** @type {?} */ data = this.oidcSecurityCommon.wellKnownEndpoints;
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
      } else {
        this.oidcSecurityCommon.logDebug('AuthWellKnownEndpoints first time, get from the server');
        this.getWellKnownEndpoints().subscribe(function(data) {
          _this.issuer = data.issuer;
          _this.jwks_uri = data.jwks_uri;
          _this.authorization_endpoint = data.authorization_endpoint;
          _this.token_endpoint = data.token_endpoint;
          _this.userinfo_endpoint = data.userinfo_endpoint;
          if (data.end_session_endpoint) {
            _this.end_session_endpoint = data.end_session_endpoint;
          }
          if (data.check_session_iframe) {
            _this.check_session_iframe = data.check_session_iframe;
          }
          if (data.revocation_endpoint) {
            _this.revocation_endpoint = data.revocation_endpoint;
          }
          if (data.introspection_endpoint) {
            _this.introspection_endpoint = data.introspection_endpoint;
          }
          _this.oidcSecurityCommon.wellKnownEndpoints = data;
          _this.oidcSecurityCommon.logDebug(data);
          _this.onWellKnownEndpointsLoaded.emit();
        });
      }
    };
    return AuthWellKnownEndpoints;
  })();
  AuthWellKnownEndpoints.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  AuthWellKnownEndpoints.ctorParameters = function() {
    return [{ type: _angular_common_http.HttpClient }, { type: AuthConfiguration }, { type: OidcSecurityCommon }];
  };
  AuthWellKnownEndpoints.propDecorators = {
    onWellKnownEndpointsLoaded: [{ type: _angular_core.Output }]
  };
  var OidcSecurityCheckSession = /** @class */ (function() {
    /**
     * @param {?} authConfiguration
     * @param {?} oidcSecurityCommon
     * @param {?} authWellKnownEndpoints
     */
    function OidcSecurityCheckSession(authConfiguration, oidcSecurityCommon, authWellKnownEndpoints) {
      this.authConfiguration = authConfiguration;
      this.oidcSecurityCommon = oidcSecurityCommon;
      this.authWellKnownEndpoints = authWellKnownEndpoints;
      this.onCheckSessionChanged = new _angular_core.EventEmitter(true);
    }
    /**
     * @return {?}
     */
    OidcSecurityCheckSession.prototype.init = function() {
      var _this = this;
      var /** @type {?} */ exists = window.parent.document.getElementById('myiFrameForCheckSession');
      if (!exists) {
        this.sessionIframe = window.document.createElement('iframe');
        this.sessionIframe.id = 'myiFrameForCheckSession';
        this.oidcSecurityCommon.logDebug(this.sessionIframe);
        this.sessionIframe.style.display = 'none';
        this.sessionIframe.src = this.authWellKnownEndpoints.check_session_iframe;
        window.document.body.appendChild(this.sessionIframe);
        this.iframeMessageEvent = this.messageHandler.bind(this);
        window.addEventListener('message', this.iframeMessageEvent, false);
        return rxjs_Observable.Observable.create(function(observer) {
          _this.sessionIframe.onload = function() {
            observer.next(_this);
            observer.complete();
          };
        });
      }
      return rxjs_Observable.Observable.empty();
    };
    /**
     * @param {?} clientId
     * @return {?}
     */
    OidcSecurityCheckSession.prototype.pollServerSession = function(clientId) {
      var _this = this;
      var /** @type {?} */ source = rxjs_Observable.Observable.timer(3000, 3000)
          .timeInterval()
          .pluck('interval')
          .take(10000);
      source.subscribe(
        function() {
          _this.oidcSecurityCommon.logDebug(_this.sessionIframe);
          var /** @type {?} */ session_state = _this.oidcSecurityCommon.sessionState;
          if (session_state && session_state !== '') {
            _this.sessionIframe.contentWindow.postMessage(
              clientId + ' ' + session_state,
              _this.authConfiguration.stsServer
            );
          }
        },
        function(err) {
          _this.oidcSecurityCommon.logError('pollServerSession error: ' + err);
        },
        function() {
          _this.oidcSecurityCommon.logDebug('checksession pollServerSession completed');
        }
      );
    };
    /**
     * @param {?} e
     * @return {?}
     */
    OidcSecurityCheckSession.prototype.messageHandler = function(e) {
      if (e.origin === this.authConfiguration.stsServer && e.source === this.sessionIframe.contentWindow) {
        if (e.data === 'error') {
          this.oidcSecurityCommon.logWarning('error from checksession messageHandler');
        } else if (e.data === 'changed') {
          this.onCheckSessionChanged.emit();
        } else {
          this.oidcSecurityCommon.logDebug(e.data + ' from checksession messageHandler');
        }
      }
    };
    return OidcSecurityCheckSession;
  })();
  OidcSecurityCheckSession.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecurityCheckSession.ctorParameters = function() {
    return [{ type: AuthConfiguration }, { type: OidcSecurityCommon }, { type: AuthWellKnownEndpoints }];
  };
  OidcSecurityCheckSession.propDecorators = {
    onCheckSessionChanged: [{ type: _angular_core.Output }]
  };
  var OidcSecuritySilentRenew = /** @class */ (function() {
    /**
     * @param {?} oidcSecurityCommon
     */
    function OidcSecuritySilentRenew(oidcSecurityCommon) {
      this.oidcSecurityCommon = oidcSecurityCommon;
    }
    /**
     * @return {?}
     */
    OidcSecuritySilentRenew.prototype.initRenew = function() {
      var /** @type {?} */ existsparent = undefined;
      try {
        var /** @type {?} */ parentdoc = window.parent.document;
        if (!parentdoc) {
          throw new Error('Unaccessible');
        }
        existsparent = parentdoc.getElementById('myiFrameForSilentRenew');
      } catch (e) {
        // not accessible
      }
      var /** @type {?} */ exists = window.document.getElementById('myiFrameForSilentRenew');
      if (existsparent) {
        this.sessionIframe = existsparent;
      } else if (exists) {
        this.sessionIframe = exists;
      }
      if (!exists && !existsparent) {
        this.sessionIframe = window.document.createElement('iframe');
        this.sessionIframe.id = 'myiFrameForSilentRenew';
        this.oidcSecurityCommon.logDebug(this.sessionIframe);
        this.sessionIframe.style.display = 'none';
        window.document.body.appendChild(this.sessionIframe);
      }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    OidcSecuritySilentRenew.prototype.startRenew = function(url) {
      var _this = this;
      var /** @type {?} */ existsparent = undefined;
      try {
        var /** @type {?} */ parentdoc = window.parent.document;
        if (!parentdoc) {
          throw new Error('Unaccessible');
        }
        existsparent = parentdoc.getElementById('myiFrameForSilentRenew');
      } catch (e) {
        // not accessible
      }
      var /** @type {?} */ exists = window.document.getElementById('myiFrameForSilentRenew');
      if (existsparent) {
        this.sessionIframe = existsparent;
      } else if (exists) {
        this.sessionIframe = exists;
      }
      this.oidcSecurityCommon.logDebug('startRenew for URL:' + url);
      this.sessionIframe.src = url;
      return rxjs_Observable.Observable.create(function(observer) {
        _this.sessionIframe.onload = function() {
          observer.next(_this);
          observer.complete();
        };
      });
    };
    return OidcSecuritySilentRenew;
  })();
  OidcSecuritySilentRenew.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecuritySilentRenew.ctorParameters = function() {
    return [{ type: OidcSecurityCommon }];
  };
  var OidcSecurityUserService = /** @class */ (function() {
    /**
     * @param {?} http
     * @param {?} oidcSecurityCommon
     * @param {?} authWellKnownEndpoints
     */
    function OidcSecurityUserService(http, oidcSecurityCommon, authWellKnownEndpoints) {
      var _this = this;
      this.http = http;
      this.oidcSecurityCommon = oidcSecurityCommon;
      this.authWellKnownEndpoints = authWellKnownEndpoints;
      this.userData = '';
      this.getIdentityUserData = function() {
        var /** @type {?} */ headers = new _angular_common_http.HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        var /** @type {?} */ token = _this.oidcSecurityCommon.getAccessToken();
        if (token !== '') {
          headers = headers.set('Authorization', 'Bearer ' + decodeURIComponent(token));
        }
        return _this.http.get(_this.authWellKnownEndpoints.userinfo_endpoint, {
          headers: headers
        });
      };
    }
    /**
     * @return {?}
     */
    OidcSecurityUserService.prototype.initUserData = function() {
      var _this = this;
      return this.getIdentityUserData().map(function(data) {
        return (_this.userData = data);
      });
    };
    return OidcSecurityUserService;
  })();
  OidcSecurityUserService.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecurityUserService.ctorParameters = function() {
    return [{ type: _angular_common_http.HttpClient }, { type: OidcSecurityCommon }, { type: AuthWellKnownEndpoints }];
  };
  var AuthorizationResult = {};
  AuthorizationResult.authorized = 1;
  AuthorizationResult.forbidden = 2;
  AuthorizationResult.unauthorized = 3;
  AuthorizationResult[AuthorizationResult.authorized] = 'authorized';
  AuthorizationResult[AuthorizationResult.forbidden] = 'forbidden';
  AuthorizationResult[AuthorizationResult.unauthorized] = 'unauthorized';
  var UriEncoder = /** @class */ (function() {
    function UriEncoder() {}
    /**
     * @param {?} key
     * @return {?}
     */
    UriEncoder.prototype.encodeKey = function(key) {
      return encodeURIComponent(key);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UriEncoder.prototype.encodeValue = function(value) {
      return encodeURIComponent(value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UriEncoder.prototype.decodeKey = function(key) {
      return decodeURIComponent(key);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UriEncoder.prototype.decodeValue = function(value) {
      return decodeURIComponent(value);
    };
    return UriEncoder;
  })();
  var OidcSecurityService = /** @class */ (function() {
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
    function OidcSecurityService(
      platformId,
      http,
      authConfiguration,
      router,
      oidcSecurityCheckSession,
      oidcSecuritySilentRenew,
      oidcSecurityUserService,
      oidcSecurityCommon,
      authWellKnownEndpoints
    ) {
      this.platformId = platformId;
      this.http = http;
      this.authConfiguration = authConfiguration;
      this.router = router;
      this.oidcSecurityCheckSession = oidcSecurityCheckSession;
      this.oidcSecuritySilentRenew = oidcSecuritySilentRenew;
      this.oidcSecurityUserService = oidcSecurityUserService;
      this.oidcSecurityCommon = oidcSecurityCommon;
      this.authWellKnownEndpoints = authWellKnownEndpoints;
      this.onModuleSetup = new _angular_core.EventEmitter(true);
      this.onAuthorizationResult = new _angular_core.EventEmitter(true);
      this.moduleSetup = false;
      this._isAuthorized = new rxjs_BehaviorSubject.BehaviorSubject(false);
      this.lastUserData = undefined;
      this._userData = new rxjs_BehaviorSubject.BehaviorSubject('');
      this.authWellKnownEndpointsLoaded = false;
    }
    /**
     * @param {?} openIDImplicitFlowConfiguration
     * @return {?}
     */
    OidcSecurityService.prototype.setupModule = function(openIDImplicitFlowConfiguration) {
      var _this = this;
      this.authConfiguration.init(openIDImplicitFlowConfiguration);
      this.oidcSecurityValidation = new OidcSecurityValidation(this.oidcSecurityCommon);
      this.oidcSecurityCheckSession.onCheckSessionChanged.subscribe(function() {
        _this.onCheckSessionChanged();
      });
      this.authWellKnownEndpoints.onWellKnownEndpointsLoaded.subscribe(function() {
        _this.onWellKnownEndpointsLoaded();
      });
      this._userData.subscribe(function() {
        _this.onUserDataChanged();
      });
      this.oidcSecurityCommon.setupModule();
      var /** @type {?} */ userData = this.oidcSecurityCommon.userData;
      if (userData !== '') {
        this.setUserData(userData);
      }
      var /** @type {?} */ isAuthorized = this.oidcSecurityCommon.isAuthorized;
      if (isAuthorized !== undefined) {
        this.setIsAuthorized(isAuthorized);
        // Start the silent renew
        this.runTokenValidation();
      }
      this.oidcSecurityCommon.logDebug('STS server: ' + this.authConfiguration.stsServer);
      if (_angular_common.isPlatformBrowser(this.platformId)) {
        // Client only code.
        this.authWellKnownEndpoints.onWellKnownEndpointsLoaded.subscribe(function() {
          _this.moduleSetup = true;
          _this.onModuleSetup.emit();
          if (_this.authConfiguration.silent_renew) {
            _this.oidcSecuritySilentRenew.initRenew();
          }
          if (_this.authConfiguration.start_checksession) {
            _this.oidcSecurityCheckSession.init().subscribe(function() {
              _this.oidcSecurityCheckSession.pollServerSession(_this.authConfiguration.client_id);
            });
          }
        });
        this.authWellKnownEndpoints.setupModule();
      } else {
        this.moduleSetup = true;
        this.onModuleSetup.emit();
      }
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getUserData = function() {
      return this._userData.asObservable();
    };
    /**
     * @param {?} userData
     * @return {?}
     */
    OidcSecurityService.prototype.setUserData = function(userData) {
      this.oidcSecurityCommon.userData = userData;
      this._userData.next(userData);
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getIsAuthorized = function() {
      return this._isAuthorized.asObservable();
    };
    /**
     * @param {?} isAuthorized
     * @return {?}
     */
    OidcSecurityService.prototype.setIsAuthorized = function(isAuthorized) {
      this._isAuthorizedValue = isAuthorized;
      this._isAuthorized.next(isAuthorized);
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getToken = function() {
      if (!this._isAuthorizedValue) {
        return '';
      }
      var /** @type {?} */ token = this.oidcSecurityCommon.getAccessToken();
      return decodeURIComponent(token);
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getIdToken = function() {
      if (!this._isAuthorizedValue) {
        return '';
      }
      var /** @type {?} */ token = this.oidcSecurityCommon.getIdToken();
      return decodeURIComponent(token);
    };
    /**
     * @param {?=} encode
     * @return {?}
     */
    OidcSecurityService.prototype.getPayloadFromIdToken = function(encode) {
      if (encode === void 0) {
        encode = false;
      }
      var /** @type {?} */ token = this.getIdToken();
      return this.oidcSecurityValidation.getPayloadFromToken(token, encode);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    OidcSecurityService.prototype.setState = function(state) {
      this.oidcSecurityCommon.authStateControl = state;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getState = function() {
      return this.oidcSecurityCommon.authStateControl;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    OidcSecurityService.prototype.setCustomRequestParameters = function(params) {
      this.oidcSecurityCommon.customRequestParams = params;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.authorize = function() {
      var /** @type {?} */ data = this.oidcSecurityCommon.wellKnownEndpoints;
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
      var /** @type {?} */ state = this.oidcSecurityCommon.authStateControl;
      if (state === '' || state === null) {
        state = Date.now() + '' + Math.random();
        this.oidcSecurityCommon.authStateControl = state;
      }
      var /** @type {?} */ nonce = 'N' + Math.random() + '' + Date.now();
      this.oidcSecurityCommon.authNonce = nonce;
      this.oidcSecurityCommon.logDebug(
        'AuthorizedController created. local state: ' + this.oidcSecurityCommon.authStateControl
      );
      var /** @type {?} */ url = this.createAuthorizeUrl(
          nonce,
          state,
          this.authWellKnownEndpoints.authorization_endpoint
        );
      window.location.href = url;
    };
    /**
     * @param {?=} hash
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedCallback = function(hash) {
      var _this = this;
      var /** @type {?} */ silentRenew = this.oidcSecurityCommon.silentRenewRunning;
      var /** @type {?} */ isRenewProcess = silentRenew === 'running';
      this.oidcSecurityCommon.logDebug('BEGIN authorizedCallback, no auth data');
      this.resetAuthorizationData(isRenewProcess);
      hash = hash || window.location.hash.substr(1);
      var /** @type {?} */ result = hash.split('&').reduce(function(result, item) {
          var /** @type {?} */ parts = item.split('=');
          result[parts[0]] = parts[1];
          return result;
        }, {});
      this.oidcSecurityCommon.authResult = result;
      this.oidcSecurityCommon.logDebug(result);
      this.oidcSecurityCommon.logDebug('authorizedCallback created, begin token validation');
      var /** @type {?} */ access_token = '';
      var /** @type {?} */ id_token = '';
      var /** @type {?} */ authResponseIsValid = false;
      var /** @type {?} */ decoded_id_token;
      this.getSigningKeys().subscribe(function(jwtKeys) {
        _this.jwtKeys = jwtKeys;
        if (!result.error) {
          // validate state
          if (
            _this.oidcSecurityValidation.validateStateFromHashCallback(
              result.state,
              _this.oidcSecurityCommon.authStateControl
            )
          ) {
            if (_this.authConfiguration.response_type === 'id_token token') {
              access_token = result.access_token;
            }
            id_token = result.id_token;
            decoded_id_token = _this.oidcSecurityValidation.getPayloadFromToken(id_token, false);
            // validate jwt signature
            if (_this.oidcSecurityValidation.validate_signature_id_token(id_token, _this.jwtKeys)) {
              // validate nonce
              if (
                _this.oidcSecurityValidation.validate_id_token_nonce(
                  decoded_id_token,
                  _this.oidcSecurityCommon.authNonce
                )
              ) {
                // validate required fields id_token
                if (_this.oidcSecurityValidation.validate_required_id_token(decoded_id_token)) {
                  // validate max offset from the id_token issue to now
                  if (
                    _this.oidcSecurityValidation.validate_id_token_iat_max_offset(
                      decoded_id_token,
                      _this.authConfiguration.max_id_token_iat_offset_allowed_in_seconds
                    )
                  ) {
                    // validate iss
                    if (
                      _this.oidcSecurityValidation.validate_id_token_iss(
                        decoded_id_token,
                        _this.authWellKnownEndpoints.issuer
                      )
                    ) {
                      // validate aud
                      if (
                        _this.oidcSecurityValidation.validate_id_token_aud(
                          decoded_id_token,
                          _this.authConfiguration.client_id
                        )
                      ) {
                        // validate_id_token_exp_not_expired
                        if (_this.oidcSecurityValidation.validate_id_token_exp_not_expired(decoded_id_token)) {
                          // flow id_token token
                          if (_this.authConfiguration.response_type === 'id_token token') {
                            // valiadate at_hash and access_token
                            if (
                              _this.oidcSecurityValidation.validate_id_token_at_hash(
                                access_token,
                                decoded_id_token.at_hash
                              ) ||
                              !access_token
                            ) {
                              authResponseIsValid = true;
                              _this.successful_validation();
                            } else {
                              _this.oidcSecurityCommon.logWarning('authorizedCallback incorrect at_hash');
                            }
                          } else {
                            authResponseIsValid = true;
                            _this.successful_validation();
                          }
                        } else {
                          _this.oidcSecurityCommon.logWarning('authorizedCallback token expired');
                        }
                      } else {
                        _this.oidcSecurityCommon.logWarning('authorizedCallback incorrect aud');
                      }
                    } else {
                      _this.oidcSecurityCommon.logWarning(
                        'authorizedCallback incorrect iss does not match authWellKnownEndpoints issuer'
                      );
                    }
                  } else {
                    _this.oidcSecurityCommon.logWarning(
                      'authorizedCallback Validation, iat rejected id_token was issued too far away from the current time'
                    );
                  }
                } else {
                  _this.oidcSecurityCommon.logDebug(
                    'authorizedCallback Validation, one of the REQUIRED properties missing from id_token'
                  );
                }
              } else {
                _this.oidcSecurityCommon.logWarning('authorizedCallback incorrect nonce');
              }
            } else {
              _this.oidcSecurityCommon.logDebug('authorizedCallback Signature validation failed id_token');
            }
          } else {
            _this.oidcSecurityCommon.logWarning('authorizedCallback incorrect state');
          }
        }
        _this.oidcSecurityCommon.silentRenewRunning = '';
        if (authResponseIsValid) {
          _this.setAuthorizationData(access_token, id_token);
          if (_this.authConfiguration.auto_userinfo) {
            _this.getUserinfo(isRenewProcess, result, id_token, decoded_id_token).subscribe(function(response) {
              if (response) {
                if (_this.authConfiguration.trigger_authorization_result_event) {
                  _this.onAuthorizationResult.emit(AuthorizationResult.authorized);
                } else {
                  _this.router.navigate([_this.authConfiguration.post_login_route]);
                }
              } else {
                if (_this.authConfiguration.trigger_authorization_result_event) {
                  _this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
                } else {
                  _this.router.navigate([_this.authConfiguration.unauthorized_route]);
                }
              }
            });
          } else {
            _this.runTokenValidation();
            if (_this.authConfiguration.trigger_authorization_result_event) {
              _this.onAuthorizationResult.emit(AuthorizationResult.authorized);
            } else {
              _this.router.navigate([_this.authConfiguration.post_login_route]);
            }
          }
        } else {
          _this.oidcSecurityCommon.logDebug('authorizedCallback, token(s) validation failed, resetting');
          _this.resetAuthorizationData(false);
          if (_this.authConfiguration.trigger_authorization_result_event) {
            _this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
          } else {
            _this.router.navigate([_this.authConfiguration.unauthorized_route]);
          }
        }
      });
    };
    /**
     * @param {?=} isRenewProcess
     * @param {?=} result
     * @param {?=} id_token
     * @param {?=} decoded_id_token
     * @return {?}
     */
    OidcSecurityService.prototype.getUserinfo = function(isRenewProcess, result, id_token, decoded_id_token) {
      var _this = this;
      if (isRenewProcess === void 0) {
        isRenewProcess = false;
      }
      result = result ? result : this.oidcSecurityCommon.authResult;
      id_token = id_token ? id_token : this.oidcSecurityCommon.idToken;
      decoded_id_token = decoded_id_token
        ? decoded_id_token
        : this.oidcSecurityValidation.getPayloadFromToken(id_token, false);
      return new rxjs_Observable.Observable(function(observer) {
        // flow id_token token
        if (_this.authConfiguration.response_type === 'id_token token') {
          if (isRenewProcess) {
            _this.oidcSecurityCommon.sessionState = result.session_state;
            observer.next(true);
            observer.complete();
          } else {
            _this.oidcSecurityUserService.initUserData().subscribe(function() {
              _this.oidcSecurityCommon.logDebug('authorizedCallback id_token token flow');
              if (
                _this.oidcSecurityValidation.validate_userdata_sub_id_token(
                  decoded_id_token.sub,
                  _this.oidcSecurityUserService.userData.sub
                )
              ) {
                _this.setUserData(_this.oidcSecurityUserService.userData);
                _this.oidcSecurityCommon.logDebug(_this.oidcSecurityCommon.accessToken);
                _this.oidcSecurityCommon.logDebug(_this.oidcSecurityUserService.userData);
                _this.oidcSecurityCommon.sessionState = result.session_state;
                _this.runTokenValidation();
                observer.next(true);
              } else {
                _this.oidcSecurityCommon.logWarning('authorizedCallback, User data sub does not match sub in id_token');
                _this.oidcSecurityCommon.logDebug('authorizedCallback, token(s) validation failed, resetting');
                _this.resetAuthorizationData(false);
                observer.next(false);
              }
              observer.complete();
            });
          }
        } else {
          _this.oidcSecurityCommon.logDebug('authorizedCallback id_token flow');
          _this.oidcSecurityCommon.logDebug(_this.oidcSecurityCommon.accessToken);
          // userData is set to the id_token decoded. No access_token.
          _this.oidcSecurityUserService.userData = decoded_id_token;
          _this.setUserData(_this.oidcSecurityUserService.userData);
          _this.oidcSecurityCommon.sessionState = result.session_state;
          if (!isRenewProcess) {
            _this.runTokenValidation();
          }
          observer.next(true);
          observer.complete();
        }
      });
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.logoff = function() {
      // /connect/endsession?id_token_hint=...&post_logout_redirect_uri=https://myapp.com
      this.oidcSecurityCommon.logDebug('BEGIN Authorize, no auth data');
      if (this.authWellKnownEndpoints.end_session_endpoint) {
        var /** @type {?} */ end_session_endpoint = this.authWellKnownEndpoints.end_session_endpoint;
        var /** @type {?} */ id_token_hint = this.oidcSecurityCommon.idToken;
        var /** @type {?} */ url = this.createEndSessionUrl(end_session_endpoint, id_token_hint);
        this.resetAuthorizationData(false);
        if (this.authConfiguration.start_checksession && this.checkSessionChanged) {
          this.oidcSecurityCommon.logDebug('only local login cleaned up, server session has changed');
        } else {
          window.location.href = url;
        }
      } else {
        this.resetAuthorizationData(false);
        this.oidcSecurityCommon.logDebug('only local login cleaned up, no end_session_endpoint');
      }
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.successful_validation = function() {
      this.oidcSecurityCommon.authNonce = '';
      if (this.authConfiguration.auto_clean_state_after_authentication) {
        this.oidcSecurityCommon.authStateControl = '';
      }
      this.oidcSecurityCommon.logDebug('AuthorizedCallback token(s) validated, continue');
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.refreshSession = function() {
      this.oidcSecurityCommon.logDebug('BEGIN refresh session Authorize');
      var /** @type {?} */ state = this.oidcSecurityCommon.authStateControl;
      if (state === '' || state === null) {
        state = Date.now() + '' + Math.random();
        this.oidcSecurityCommon.authStateControl = state;
      }
      var /** @type {?} */ nonce = 'N' + Math.random() + '' + Date.now();
      this.oidcSecurityCommon.authNonce = nonce;
      this.oidcSecurityCommon.logDebug(
        'RefreshSession created. adding myautostate: ' + this.oidcSecurityCommon.authStateControl
      );
      var /** @type {?} */ url = this.createAuthorizeUrl(
          nonce,
          state,
          this.authWellKnownEndpoints.authorization_endpoint,
          'none'
        );
      this.oidcSecurityCommon.silentRenewRunning = 'running';
      this.oidcSecuritySilentRenew.startRenew(url);
    };
    /**
     * @param {?} access_token
     * @param {?} id_token
     * @return {?}
     */
    OidcSecurityService.prototype.setAuthorizationData = function(access_token, id_token) {
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
    };
    /**
     * @param {?} nonce
     * @param {?} state
     * @param {?} authorization_endpoint
     * @param {?=} prompt
     * @return {?}
     */
    OidcSecurityService.prototype.createAuthorizeUrl = function(nonce, state, authorization_endpoint, prompt) {
      var /** @type {?} */ urlParts = authorization_endpoint.split('?');
      var /** @type {?} */ authorizationUrl = urlParts[0];
      var /** @type {?} */ params = new _angular_common_http.HttpParams({
          fromString: urlParts[1],
          encoder: new UriEncoder()
        });
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
      var /** @type {?} */ customParams = Object.assign({}, this.oidcSecurityCommon.customRequestParams);
      Object.keys(customParams).forEach(function(key) {
        params = params.append(key, customParams[key].toString());
      });
      return authorizationUrl + '?' + params;
    };
    /**
     * @param {?} end_session_endpoint
     * @param {?} id_token_hint
     * @return {?}
     */
    OidcSecurityService.prototype.createEndSessionUrl = function(end_session_endpoint, id_token_hint) {
      var /** @type {?} */ urlParts = end_session_endpoint.split('?');
      var /** @type {?} */ authorizationEndsessionUrl = urlParts[0];
      var /** @type {?} */ params = new _angular_common_http.HttpParams({
          fromString: urlParts[1],
          encoder: new UriEncoder()
        });
      params = params.set('id_token_hint', id_token_hint);
      params = params.append('post_logout_redirect_uri', this.authConfiguration.post_logout_redirect_uri);
      return authorizationEndsessionUrl + '?' + params;
    };
    /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    OidcSecurityService.prototype.resetAuthorizationData = function(isRenewProcess) {
      if (!isRenewProcess) {
        if (this.authConfiguration.auto_userinfo) {
          // Clear user data. Fixes #97.
          this.setUserData('');
        }
        this.setIsAuthorized(false);
        this.oidcSecurityCommon.resetStorageData(isRenewProcess);
        this.checkSessionChanged = false;
      }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    OidcSecurityService.prototype.handleError = function(error) {
      this.oidcSecurityCommon.logError(error);
      if (error.status == 403) {
        if (this.authConfiguration.trigger_authorization_result_event) {
          this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
        } else {
          this.router.navigate([this.authConfiguration.forbidden_route]);
        }
      } else if (error.status == 401) {
        var /** @type {?} */ silentRenew = this.oidcSecurityCommon.silentRenewRunning;
        this.resetAuthorizationData(silentRenew !== '');
        if (this.authConfiguration.trigger_authorization_result_event) {
          this.onAuthorizationResult.emit(AuthorizationResult.unauthorized);
        } else {
          this.router.navigate([this.authConfiguration.unauthorized_route]);
        }
      }
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.onCheckSessionChanged = function() {
      this.oidcSecurityCommon.logDebug('onCheckSessionChanged');
      this.checkSessionChanged = true;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.onWellKnownEndpointsLoaded = function() {
      this.oidcSecurityCommon.logDebug('onWellKnownEndpointsLoaded');
      this.authWellKnownEndpointsLoaded = true;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.onUserDataChanged = function() {
      this.oidcSecurityCommon.logDebug(
        'onUserDataChanged: last = ' + this.lastUserData + ', new = ' + this._userData.value
      );
      if (this.lastUserData && !this._userData.value) {
        this.oidcSecurityCommon.logDebug('onUserDataChanged: Logout detected.');
        // TODO should we have an action here
      }
      this.lastUserData = this._userData.value;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getSigningKeys = function() {
      this.oidcSecurityCommon.logDebug('jwks_uri: ' + this.authWellKnownEndpoints.jwks_uri);
      return this.http.get(this.authWellKnownEndpoints.jwks_uri).catch(this.handleErrorGetSigningKeys);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    OidcSecurityService.prototype.handleErrorGetSigningKeys = function(error) {
      var /** @type {?} */ errMsg;
      if (error instanceof Response) {
        var /** @type {?} */ body = error.json() || {};
        var /** @type {?} */ err = JSON.stringify(body);
        errMsg = error.status + ' - ' + (error.statusText || '') + ' ' + err;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return rxjs_Observable.Observable.throw(errMsg);
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.runTokenValidation = function() {
      var _this = this;
      if (this.runTokenValidationRunning) {
        return;
      }
      this.runTokenValidationRunning = true;
      var /** @type {?} */ source = rxjs_Observable.Observable.timer(5000, 3000)
          .timeInterval()
          .pluck('interval')
          .take(10000);
      source.subscribe(
        function() {
          if (_this._userData.value) {
            if (
              _this.oidcSecurityValidation.isTokenExpired(
                _this.oidcSecurityCommon.idToken,
                _this.authConfiguration.silent_renew_offset_in_seconds
              )
            ) {
              _this.oidcSecurityCommon.logDebug('IsAuthorized: id_token isTokenExpired, start silent renew if active');
              if (_this.authConfiguration.silent_renew) {
                _this.refreshSession();
              } else {
                _this.resetAuthorizationData(false);
              }
            }
          }
        },
        function(err) {
          _this.oidcSecurityCommon.logError('Error: ' + err);
        },
        function() {
          _this.oidcSecurityCommon.logDebug('Completed');
        }
      );
    };
    return OidcSecurityService;
  })();
  OidcSecurityService.decorators = [{ type: _angular_core.Injectable }];
  /**
   * @nocollapse
   */
  OidcSecurityService.ctorParameters = function() {
    return [
      { type: Object, decorators: [{ type: _angular_core.Inject, args: [_angular_core.PLATFORM_ID] }] },
      { type: _angular_common_http.HttpClient },
      { type: AuthConfiguration },
      { type: _angular_router.Router },
      { type: OidcSecurityCheckSession },
      { type: OidcSecuritySilentRenew },
      { type: OidcSecurityUserService },
      { type: OidcSecurityCommon },
      { type: AuthWellKnownEndpoints }
    ];
  };
  OidcSecurityService.propDecorators = {
    onModuleSetup: [{ type: _angular_core.Output }],
    onAuthorizationResult: [{ type: _angular_core.Output }]
  };
  var AuthModule = /** @class */ (function() {
    function AuthModule() {}
    /**
     * @param {?=} token
     * @return {?}
     */
    AuthModule.forRoot = function(token) {
      if (token === void 0) {
        token = {};
      }
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
    };
    return AuthModule;
  })();
  AuthModule.decorators = [{ type: _angular_core.NgModule }];
  /**
   * @nocollapse
   */
  AuthModule.ctorParameters = function() {
    return [];
  };

  exports.OidcSecurityService = OidcSecurityService;
  exports.OidcSecurityValidation = OidcSecurityValidation;
  exports.OidcSecurityCheckSession = OidcSecurityCheckSession;
  exports.OidcSecuritySilentRenew = OidcSecuritySilentRenew;
  exports.OidcSecurityUserService = OidcSecurityUserService;
  exports.OidcSecurityCommon = OidcSecurityCommon;
  exports.OidcSecurityStorage = OidcSecurityStorage;
  exports.BrowserStorage = BrowserStorage;
  exports.AuthWellKnownEndpoints = AuthWellKnownEndpoints;
  exports.AuthorizationResult = AuthorizationResult;
  exports.AuthConfiguration = AuthConfiguration;
  exports.OpenIDImplicitFlowConfiguration = OpenIDImplicitFlowConfiguration;
  exports.DefaultConfiguration = DefaultConfiguration;
  exports.AuthModule = AuthModule;

  Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=angular-auth-oidc-client.umd.js.map
