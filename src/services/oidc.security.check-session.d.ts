import { EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import { AuthConfiguration } from '../modules/auth.configuration';
import { OidcSecurityCommon } from './oidc.security.common';
import { AuthWellKnownEndpoints } from './auth.well-known-endpoints';
export declare class OidcSecurityCheckSession {
    private authConfiguration;
    private oidcSecurityCommon;
    private authWellKnownEndpoints;
    private sessionIframe;
    private iframeMessageEvent;
    onCheckSessionChanged: EventEmitter<any>;
    constructor(authConfiguration: AuthConfiguration, oidcSecurityCommon: OidcSecurityCommon, authWellKnownEndpoints: AuthWellKnownEndpoints);
    init(): any;
    pollServerSession(clientId: any): void;
    private messageHandler(e);
}
