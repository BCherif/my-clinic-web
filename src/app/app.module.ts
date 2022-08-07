import {LOCALE_ID, NgModule} from "@angular/core";

import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./layout/header/header.component";
import {PageLoaderComponent} from "./layout/page-loader/page-loader.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {RightSidebarComponent} from "./layout/right-sidebar/right-sidebar.component";
import {AuthLayoutComponent} from "./layout/app-layout/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./layout/app-layout/main-layout/main-layout.component";
import {fakeBackendProvider} from "./core/interceptor/fake-backend";
import {LocationStrategy, HashLocationStrategy, registerLocaleData} from "@angular/common";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ClickOutsideModule} from "ng-click-outside";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {ToastrModule} from "ngx-toastr";
import {IConfig} from "ngx-mask";
import localeFr from '@angular/common/locales/fr';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {InterceptorService} from "./shared/http/interceptor.service";
import {NgxSpinnerModule} from "ngx-spinner";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

registerLocaleData(localeFr);

export const maskConfig: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    LoadingBarRouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 2700
    }),
    // core & shared
    CoreModule,
    SharedModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},*/
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
