import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { OidcSecurityCommon } from './oidc.security.common';
import { AuthWellKnownEndpoints } from './auth.well-known-endpoints';
export declare class OidcSecurityUserService {
    private http;
    private oidcSecurityCommon;
    private authWellKnownEndpoints;
    userData: any;
    constructor(http: HttpClient, oidcSecurityCommon: OidcSecurityCommon, authWellKnownEndpoints: AuthWellKnownEndpoints);
    initUserData(): Observable<any>;
    private getIdentityUserData;
}
