import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthConfiguration } from '../modules/auth.configuration';
import { OidcSecurityCommon } from './oidc.security.common';
export declare class AuthWellKnownEndpoints {
    private http;
    private authConfiguration;
    private oidcSecurityCommon;
    onWellKnownEndpointsLoaded: EventEmitter<any>;
    issuer: string;
    jwks_uri: string;
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    end_session_endpoint: string;
    check_session_iframe: string;
    revocation_endpoint: string;
    introspection_endpoint: string;
    constructor(http: HttpClient, authConfiguration: AuthConfiguration, oidcSecurityCommon: OidcSecurityCommon);
    setupModule(): void;
    private getWellKnownEndpoints;
}
