import { AuthConfiguration } from '../modules/auth.configuration';
import { OidcSecurityStorage } from './oidc.security.storage';
export declare type SilentRenewState = 'running' | '';
export declare class OidcSecurityCommon {
    private authConfiguration;
    private oidcSecurityStorage;
    private storage_auth_result;
    authResult: any;
    private storage_access_token;
    accessToken: string;
    private storage_id_token;
    idToken: string;
    private storage_is_authorized;
    isAuthorized: boolean | undefined;
    private storage_user_data;
    userData: any;
    private storage_auth_nonce;
    authNonce: string;
    private storage_auth_state_control;
    authStateControl: string;
    private storage_well_known_endpoints;
    wellKnownEndpoints: any;
    private storage_session_state;
    sessionState: any;
    private storage_silent_renew_running;
    silentRenewRunning: SilentRenewState;
    private storage_custom_request_params;
    customRequestParams: {
        [key: string]: string | number | boolean;
    };
    constructor(authConfiguration: AuthConfiguration, oidcSecurityStorage: OidcSecurityStorage);
    setupModule(): void;
    private retrieve(key);
    private store(key, value);
    resetStorageData(isRenewProcess: boolean): void;
    getAccessToken(): any;
    getIdToken(): any;
    logError(message: any): void;
    logWarning(message: any): void;
    logDebug(message: any): void;
}
