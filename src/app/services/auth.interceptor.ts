import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { LoginService } from "./login.service";



//this class runs automatic whenver requested to server
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService)
    {}

    intercept( 
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token(local storage) request to access apis
        let authReq=req;
        const token= this.login.getToken();
        console.log("Inside interceptor")
        if(token!=null)
            {
                authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token} `},
            });
        }
        return next.handle(authReq);
        
}
}
//
export const authInterceptorProviders =[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];