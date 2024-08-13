"use strict";
(self["webpackChunkWebClient"] = self["webpackChunkWebClient"] || []).push([["main"],{

/***/ 1361:
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_services */ 7870);



class AuthGuard {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  canActivate() {
    // const random = Math.floor(Math.random() * 6);
    // if (random > 1) {
    if (true) {
      return true; // Allow access to the route
    } else {}
  }
  static #_ = this.ɵfac = function AuthGuard_Factory(t) {
    return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AuthGuard,
    factory: AuthGuard.ɵfac,
    providedIn: 'root' // This registers the guard as a provider in the root module
  });
}

/***/ }),

/***/ 8418:
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorInterceptor: () => (/* binding */ ErrorInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2235);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_services */ 7870);




class ErrorInterceptor {
  constructor(injector, router, authenticationService) {
    this.injector = injector;
    this.router = router;
    this.authenticationService = authenticationService;
    // private authenticationService: AuthenticationService | undefined;
    this.refreshTokenInProgress = false;
    this.tokenRefreshedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  }
  intercept(request, next) {
    return next.handle(request).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        return this.HandleAuthenticationError(request, next);
      }
      // const error = err.error.message || err.statusText;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(() => err);
    }));
  }
  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.authenticationService.refreshTokenObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.tap)(() => {
        this.refreshTokenInProgress = false;
        this.tokenRefreshedSource.next(null);
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(err => {
        this.refreshTokenInProgress = false;
        this.authenticationService.logout();
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(() => err);
      }));
    }
  }
  HandleAuthenticationError(request, next) {
    return this.refreshToken().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => {
      request = this.authenticationService.addAuthHeader(request);
      return next.handle(request);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(e => {
      this.authenticationService.logout();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(() => e);
    }));
  }
  static #_ = this.ɵfac = function ErrorInterceptor_Factory(t) {
    return new (t || ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: ErrorInterceptor,
    factory: ErrorInterceptor.ɵfac
  });
}

/***/ }),

/***/ 3005:
/*!*****************************************************************!*\
  !*** ./src/app/_helpers/go-page-back/go-page-back.directive.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoPageBackDirective: () => (/* binding */ GoPageBackDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class GoPageBackDirective {
  constructor() {}
  onClick() {
    window.history.back();
  }
  static #_ = this.ɵfac = function GoPageBackDirective_Factory(t) {
    return new (t || GoPageBackDirective)();
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: GoPageBackDirective,
    selectors: [["", "appGoPageBack", ""]],
    hostBindings: function GoPageBackDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GoPageBackDirective_click_HostBindingHandler() {
          return ctx.onClick();
        });
      }
    }
  });
}

/***/ }),

/***/ 6332:
/*!***********************************************!*\
  !*** ./src/app/_helpers/graphic-functions.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GraphicFunctions: () => (/* binding */ GraphicFunctions)
/* harmony export */ });
class GraphicFunctions {
  static blendColors(color1, color2, percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Percentage should be between 0 and 100");
    }
    // Convert hex to RGB
    const hexToRgb = hex => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    });
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    // Calculate mixed color
    const mixedColor = {
      r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * (percentage / 100)),
      g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * (percentage / 100)),
      b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * (percentage / 100))
    };
    // Convert RGB to hex
    const componentToHex = c => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    const mixedHexColor = `#${componentToHex(mixedColor.r)}${componentToHex(mixedColor.g)}${componentToHex(mixedColor.b)}`;
    return mixedHexColor;
  }
}

/***/ }),

/***/ 1946:
/*!***********************************!*\
  !*** ./src/app/_helpers/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorInterceptor: () => (/* reexport safe */ _error_interceptor__WEBPACK_IMPORTED_MODULE_1__.ErrorInterceptor),
/* harmony export */   JwtInterceptor: () => (/* reexport safe */ _jwt_interceptor__WEBPACK_IMPORTED_MODULE_0__.JwtInterceptor)
/* harmony export */ });
/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwt.interceptor */ 7877);
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.interceptor */ 8418);



/***/ }),

/***/ 7877:
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JwtInterceptor: () => (/* binding */ JwtInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6231);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services */ 7870);




class JwtInterceptor {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }
  intercept(request, next) {
    if (request.url.startsWith(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.serverApiUrl) && !request.url.endsWith('RefreshToken')) {
      if (!this.authenticationService.isAccessTokenDefined()) {
        // Use switchMap to switch to the new observable returned by refreshTokenPromise
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(this.authenticationService.refreshTokenPromise()).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => {
          // Add the token to the request after refreshing
          request = this.authenticationService.addAuthHeader(request);
          return next.handle(request);
        }));
      }
      // If token is already defined, add the token to the request
      request = this.authenticationService.addAuthHeader(request);
    }
    // Continue with the original request
    return next.handle(request);
  }
  static #_ = this.ɵfac = function JwtInterceptor_Factory(t) {
    return new (t || JwtInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: JwtInterceptor,
    factory: JwtInterceptor.ɵfac
  });
}

/***/ }),

/***/ 8113:
/*!***************************************************************!*\
  !*** ./src/app/_models/Dto/Authentication/loginRequestDto.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginRequestDto: () => (/* binding */ LoginRequestDto)
/* harmony export */ });
class LoginRequestDto {
  constructor(emailOrUsername, password) {
    this.emailOrUsername = emailOrUsername;
    this.password = password;
  }
}

/***/ }),

/***/ 8662:
/*!****************************************************************!*\
  !*** ./src/app/_models/Dto/Authentication/loginResponseDto.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginResponseDto: () => (/* binding */ LoginResponseDto)
/* harmony export */ });
class LoginResponseDto {
  constructor(token, refreshToken) {
    this.accessToken = token;
    this.refreshToken = refreshToken;
  }
}

/***/ }),

/***/ 491:
/*!****************************************************************!*\
  !*** ./src/app/_models/Dto/Authentication/signupRequestDto.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupRequestDto: () => (/* binding */ SignupRequestDto)
/* harmony export */ });
class SignupRequestDto {
  constructor(user, password) {
    this.email = user.email;
    this.username = user.username;
    this.name = user.name;
    this.surname = user.surname;
    this.password = password;
  }
}

/***/ }),

/***/ 7752:
/*!*********************************************************!*\
  !*** ./src/app/_models/Transaction/transactionModel.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionModel: () => (/* binding */ TransactionModel)
/* harmony export */ });
class TransactionModel {
  constructor(name = '', amount = 0, currencyCode = '', date = new Date(), isIncome = true, idWallet = 0, categories = [], counterParties = []) {
    this.name = name;
    this.amount = amount;
    this.currencyCode = currencyCode;
    this.date = date;
    this.isIncome = isIncome;
    this.idWallet = idWallet;
    this.categories = categories;
    this.counterParties = counterParties;
  }
}

/***/ }),

/***/ 8:
/*!***********************************************!*\
  !*** ./src/app/_models/Wallet/walletModel.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletModel: () => (/* binding */ WalletModel)
/* harmony export */ });
class WalletModel {
  constructor(name = '', amount = 0, currencyCode = '') {
    this.name = name;
    this.amount = amount;
    this.currencyCode = currencyCode;
  }
}

/***/ }),

/***/ 4939:
/*!**********************************!*\
  !*** ./src/app/_models/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginRequestDto: () => (/* reexport safe */ _Dto_Authentication_loginRequestDto__WEBPACK_IMPORTED_MODULE_0__.LoginRequestDto),
/* harmony export */   LoginResponseDto: () => (/* reexport safe */ _Dto_Authentication_loginResponseDto__WEBPACK_IMPORTED_MODULE_1__.LoginResponseDto),
/* harmony export */   SignupRequestDto: () => (/* reexport safe */ _Dto_Authentication_signupRequestDto__WEBPACK_IMPORTED_MODULE_2__.SignupRequestDto),
/* harmony export */   WalletModel: () => (/* reexport safe */ _Wallet_walletModel__WEBPACK_IMPORTED_MODULE_3__.WalletModel)
/* harmony export */ });
/* harmony import */ var _Dto_Authentication_loginRequestDto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dto/Authentication/loginRequestDto */ 8113);
/* harmony import */ var _Dto_Authentication_loginResponseDto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dto/Authentication/loginResponseDto */ 8662);
/* harmony import */ var _Dto_Authentication_signupRequestDto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dto/Authentication/signupRequestDto */ 491);
/* harmony import */ var _Wallet_walletModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Wallet/walletModel */ 8);





/***/ }),

/***/ 252:
/*!*********************************!*\
  !*** ./src/app/_models/user.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor(username, email, name, surname) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.surname = surname;
  }
}

/***/ }),

/***/ 7872:
/*!********************************************************************!*\
  !*** ./src/app/_services/authentication/authentication.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticationService: () => (/* binding */ AuthenticationService)
/* harmony export */ });
/* harmony import */ var D_Repos_VisualMoney_Src_WebClientApp_WebClient_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1236);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/environments/environment */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 4860);






class AuthenticationService {
  setEmptyAccessToken() {
    this._accessToken = undefined;
  }
  set accessToken(value) {
    this._accessToken = value;
  }
  get accessToken() {
    return this._accessToken;
  }
  isAccessTokenDefined() {
    return typeof this._accessToken != 'undefined' && this._accessToken != null && this._accessToken.trim() != '';
  }
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  refreshTokenPromise() {
    var _this = this;
    return (0,D_Repos_VisualMoney_Src_WebClientApp_WebClient_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.lastValueFrom)(_this.refreshTokenObservable());
        if (response.accessToken) {
          _this.accessToken = response.accessToken;
        } else {
          throw new Error('Error while getting access token from refresh token');
        }
      } catch (error) {
        // need to logout, because refresh token is invalid
        // so we need to clear the access token and redirect to login page
        console.log(error);
        // this.logout();
      }
    })();
  }

  refreshTokenObservable() {
    // return the observable that handles the request
    // but also set the access token if the request is successful
    return this.httpClient.post(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/User/RefreshToken`, null, {
      withCredentials: true
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
      if (response.accessToken) {
        this.accessToken = response.accessToken;
      }
      return response;
    }));
  }
  login(loginRequestData) {
    return this.httpClient.post(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/User/Login`, loginRequestData, {
      withCredentials: true
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
      if (response.accessToken) {
        this.accessToken = response.accessToken;
      }
      return response;
    }));
  }
  signup(signupRequestDto) {
    return this.httpClient.post(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/User/Register`, signupRequestDto, {
      withCredentials: true
    });
  }
  isUsernameAvailable(username) {
    return this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/User/IsUsernameAvailable?username=${username}`);
  }
  isEmailAvailable(email) {
    return this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/User/IsEmailAvailable?email=${email}`);
  }
  canAccessPage() {
    return this.isAccessTokenDefined();
  }
  logout() {
    this._accessToken = undefined;
    window.location.href = '/login';
  }
  addAuthHeader(request) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }
  static #_ = this.ɵfac = function AuthenticationService_Factory(t) {
    return new (t || AuthenticationService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AuthenticationService,
    factory: AuthenticationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9227:
/*!********************************************************!*\
  !*** ./src/app/_services/category/category.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryService: () => (/* binding */ CategoryService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var src_app_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/environments/environment */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 4860);




class CategoryService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.categories = [];
  }
  getCategoriesByTransactionId(idTransaction) {
    return this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.serverApiUrl}/Category/Transaction/${idTransaction}`, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => {
      console.log(error);
      return [];
    }));
  }
  static #_ = this.ɵfac = function CategoryService_Factory(t) {
    return new (t || CategoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: CategoryService,
    factory: CategoryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 7870:
/*!************************************!*\
  !*** ./src/app/_services/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticationService: () => (/* reexport safe */ _authentication_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService),
/* harmony export */   TransactionService: () => (/* reexport safe */ _transaction_transaction_service__WEBPACK_IMPORTED_MODULE_2__.TransactionService),
/* harmony export */   WalletService: () => (/* reexport safe */ _wallet_wallet_service__WEBPACK_IMPORTED_MODULE_1__.WalletService)
/* harmony export */ });
/* harmony import */ var _authentication_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication/authentication.service */ 7872);
/* harmony import */ var _wallet_wallet_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wallet/wallet.service */ 9941);
/* harmony import */ var _transaction_transaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transaction/transaction.service */ 4173);




/***/ }),

/***/ 4173:
/*!**************************************************************!*\
  !*** ./src/app/_services/transaction/transaction.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionService: () => (/* binding */ TransactionService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var src_app_models_Transaction_transactionModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_models/Transaction/transactionModel */ 7752);
/* harmony import */ var src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/environments/environment */ 1594);
/* harmony import */ var src_app_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_models */ 4939);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _category_category_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../category/category.service */ 9227);







class TransactionService {
  constructor(httpClient, categoryService) {
    this.httpClient = httpClient;
    this.categoryService = categoryService;
    this.transactions = [];
    this.selectedTransaction = new src_app_models_Transaction_transactionModel__WEBPACK_IMPORTED_MODULE_0__.TransactionModel();
    this.selectedWallet = new src_app_models__WEBPACK_IMPORTED_MODULE_2__.WalletModel();
    this.newTransaction = new src_app_models_Transaction_transactionModel__WEBPACK_IMPORTED_MODULE_0__.TransactionModel();
  }
  selectTransaction(id) {
    if (typeof id !== 'undefined') this.selectedTransaction = this.transactions.find(transaction => transaction.id == id);else this.selectedTransaction = new src_app_models_Transaction_transactionModel__WEBPACK_IMPORTED_MODULE_0__.TransactionModel();
  }
  getTransactionsFromServer(loadAllData = false) {
    return this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Transaction?loadAllData=${loadAllData}`, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(transactions => {
      this.transactions = transactions.sort((a, b) => a.date > b.date ? -1 : 1);
      this.transactions.forEach(transaction => {
        transaction.date = new Date(transaction.date);
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      console.log(error);
      return [];
    }));
  }
  getTransactionsByWalletId(idWallet, loadAllData = false) {
    return this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Transaction/Wallet/${idWallet}?loadAllData=${loadAllData}`, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(transactions => {
      this.transactions = transactions;
      this.transactions.forEach(transaction => {
        transaction.date = new Date(transaction.date);
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      console.log(error);
      return [];
    }));
  }
  addTransaction() {
    return this.httpClient.post(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Transaction`, this.newTransaction, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      console.log(error);
      return [];
    }));
  }
  updateTransaction(transaction) {
    return this.httpClient.put(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Transaction/${transaction.id}`, transaction, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      console.log(error);
      return [];
    }));
  }
  static #_ = this.ɵfac = function TransactionService_Factory(t) {
    return new (t || TransactionService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_category_category_service__WEBPACK_IMPORTED_MODULE_3__.CategoryService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: TransactionService,
    factory: TransactionService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9941:
/*!****************************************************!*\
  !*** ./src/app/_services/wallet/wallet.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletService: () => (/* binding */ WalletService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var src_app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_models */ 4939);
/* harmony import */ var src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/environments/environment */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7947);






class WalletService {
  constructor(httpClient, router) {
    this.httpClient = httpClient;
    this.router = router;
    this.wallets = [];
    this.selectedWallet = new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel();
    this.newWallet = new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel();
  }
  getWalletsFromServer() {
    return this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Wallet`, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(wallets => {
      this.wallets = wallets;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.log(error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([]);
    }));
  }
  listWallet() {
    console.log(this.wallets);
  }
  addWallet() {
    // console.log(this.newWallet);
    // this.wallets.push(this.newWallet);
    // // router to /wallet/
    // this.router.navigate(['/wallet']);
    return this.httpClient.post(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Wallet`, this.newWallet, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(wallet => {
      this.wallets.push(wallet);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.log(error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel());
    }));
  }
  editWallet() {
    return this.httpClient.put(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/Wallet/${this.selectedWallet.id}`, this.selectedWallet, {
      withCredentials: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(wallet => {
      this.selectedWallet = wallet;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.log(error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel());
    }));
  }
  selectWallet(idWallet) {
    if (typeof idWallet != 'undefined') {
      this.selectedWallet = this.wallets.find(wallet => wallet.id == idWallet) ?? new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel();
    } else {
      this.selectedWallet = new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel();
    }
  }
  static #_ = this.ɵfac = function WalletService_Factory(t) {
    return new (t || WalletService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: WalletService,
    factory: WalletService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 3966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _views_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/login/login.component */ 5380);
/* harmony import */ var _views_test_test_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/test/test.component */ 4575);
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_guards/auth.guard */ 1361);
/* harmony import */ var _views_signup_signup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/signup/signup.component */ 714);
/* harmony import */ var _views_page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/page-not-found/page-not-found.component */ 953);
/* harmony import */ var _views_wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/wallet */ 5287);
/* harmony import */ var _views_transaction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/transaction */ 6185);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);










const routes = [{
  path: 'login',
  component: _views_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent,
  data: {
    layout: 'login-layout'
  }
}, {
  path: 'signup',
  component: _views_signup_signup_component__WEBPACK_IMPORTED_MODULE_3__.SignupComponent,
  data: {
    layout: 'login-layout'
  }
}, {
  path: 'test',
  component: _views_test_test_component__WEBPACK_IMPORTED_MODULE_1__.TestComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
  data: {
    layout: 'default-layout'
  }
}, {
  path: 'wallet',
  component: _views_wallet__WEBPACK_IMPORTED_MODULE_5__.WalletComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
  data: {
    layout: 'default-layout'
  },
  children: [{
    path: '',
    component: _views_wallet__WEBPACK_IMPORTED_MODULE_5__.WalletStartComponent
  }, {
    path: 'create',
    component: _views_wallet__WEBPACK_IMPORTED_MODULE_5__.WalletCreateComponent
  }, {
    path: ':id',
    component: _views_wallet__WEBPACK_IMPORTED_MODULE_5__.WalletViewComponent
  }, {
    path: 'edit/:id',
    component: _views_wallet__WEBPACK_IMPORTED_MODULE_5__.WalletEditComponent
  }]
}, {
  path: 'transaction',
  component: _views_transaction__WEBPACK_IMPORTED_MODULE_6__.TransactionComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
  data: {
    layout: 'default-layout'
  },
  children: [{
    path: '',
    component: _views_transaction__WEBPACK_IMPORTED_MODULE_6__.TransactionStartComponent
  }, {
    path: 'create',
    component: _views_transaction__WEBPACK_IMPORTED_MODULE_6__.TransactionCreateComponent
  }, {
    path: ':id',
    component: _views_transaction__WEBPACK_IMPORTED_MODULE_6__.TransactionViewComponent
  }, {
    path: 'edit/:id',
    component: _views_transaction__WEBPACK_IMPORTED_MODULE_6__.TransactionEditComponent
  }]
},
// page not found
{
  path: '**',
  component: _views_page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_4__.PageNotFoundComponent,
  data: {
    layout: 'default-layout'
  }
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
  });
})();

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var D_Repos_VisualMoney_Src_WebClientApp_WebClient_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/authentication/authentication.service */ 7872);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _shared_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/header/header.component */ 1074);







function AppComponent_app_header_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-header");
  }
}
class AppComponent {
  constructor(router, authenticationService) {
    var _this = this;
    this.router = router;
    this.authenticationService = authenticationService;
    this.title = 'WebClient';
    this.showHeader = true;
    router.events.forEach( /*#__PURE__*/function () {
      var _ref = (0,D_Repos_VisualMoney_Src_WebClientApp_WebClient_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
        if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/signup') {
            _this.showHeader = false;
          } else {
            _this.showHeader = true;
            // Authentication check
            if (!_this.authenticationService.isAccessTokenDefined()) {
              yield _this.authenticationService.refreshTokenPromise();
            }
          }
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 3,
    vars: 1,
    consts: [[2, "height", "100vh", "display", "flex", "flex-direction", "column"], [4, "ngIf"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AppComponent_app_header_1_Template, 1, 0, "app-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.showHeader);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _shared_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent],
    styles: ["[_nghost-%COMP%] {\n    width: 100%;\n    height: 100%;\n    display: block;\n    background-color: var(--bg-color-dark-theme);\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCw0Q0FBNEM7QUFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3ItZGFyay10aGVtZSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _components_shared_common_button_common_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/shared/common-button/common-button.component */ 8381);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_helpers */ 1946);
/* harmony import */ var _views_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/login/login.component */ 5380);
/* harmony import */ var _views_test_test_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/test/test.component */ 4575);
/* harmony import */ var _shared_header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/header/header.component */ 1074);
/* harmony import */ var _views_signup_signup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/signup/signup.component */ 714);
/* harmony import */ var _views_page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/page-not-found/page-not-found.component */ 953);
/* harmony import */ var _views_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./views/wallet/wallet.component */ 9336);
/* harmony import */ var _views_wallet_wallet_list_wallet_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./views/wallet/wallet-list/wallet-list.component */ 7998);
/* harmony import */ var _views_wallet_wallet_create_wallet_create_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./views/wallet/wallet-create/wallet-create.component */ 5079);
/* harmony import */ var _views_wallet_wallet_view_wallet_view_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./views/wallet/wallet-view/wallet-view.component */ 853);
/* harmony import */ var _views_wallet_wallet_start_wallet_start_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./views/wallet/wallet-start/wallet-start.component */ 431);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_services */ 7870);
/* harmony import */ var _views_transaction_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./views/transaction/transaction-list/transaction-list.component */ 9578);
/* harmony import */ var _views_wallet_wallet_edit_wallet_edit_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./views/wallet/wallet-edit/wallet-edit.component */ 736);
/* harmony import */ var _views_transaction_transaction_start_transaction_start_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./views/transaction/transaction-start/transaction-start.component */ 3030);
/* harmony import */ var _views_transaction_transaction_edit_transaction_edit_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./views/transaction/transaction-edit/transaction-edit.component */ 4977);
/* harmony import */ var _views_transaction_transaction_create_transaction_create_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./views/transaction/transaction-create/transaction-create.component */ 8537);
/* harmony import */ var _views_transaction_transaction_view_transaction_view_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./views/transaction/transaction-view/transaction-view.component */ 364);
/* harmony import */ var _views_transaction_transaction_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./views/transaction/transaction.component */ 3479);
/* harmony import */ var _components_shared_dropdown_wallet_dropdownWallet_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/shared/dropdown-wallet/dropdownWallet.component */ 5131);
/* harmony import */ var _helpers_go_page_back_go_page_back_directive__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_helpers/go-page-back/go-page-back.directive */ 3005);
/* harmony import */ var _components_shared_income_slider_income_slider_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/shared/income-slider/income-slider.component */ 4580);
/* harmony import */ var _components_shared_datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/shared/datepicker/datepicker.component */ 1541);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ 1699);







// views























class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_27__.HTTP_INTERCEPTORS,
      useClass: _helpers__WEBPACK_IMPORTED_MODULE_3__.JwtInterceptor,
      multi: true
    }, {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_27__.HTTP_INTERCEPTORS,
      useClass: _helpers__WEBPACK_IMPORTED_MODULE_3__.ErrorInterceptor,
      multi: true
    }, _services__WEBPACK_IMPORTED_MODULE_14__.AuthenticationService, _services__WEBPACK_IMPORTED_MODULE_14__.WalletService],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_28__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_29__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_27__.HttpClientModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _shared_header_header_component__WEBPACK_IMPORTED_MODULE_6__.HeaderComponent, _components_shared_common_button_common_button_component__WEBPACK_IMPORTED_MODULE_2__.CommonButtonComponent, _views_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent, _views_signup_signup_component__WEBPACK_IMPORTED_MODULE_7__.SignupComponent, _views_test_test_component__WEBPACK_IMPORTED_MODULE_5__.TestComponent, _views_page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_8__.PageNotFoundComponent, _views_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_9__.WalletComponent, _views_wallet_wallet_list_wallet_list_component__WEBPACK_IMPORTED_MODULE_10__.WalletListComponent, _views_wallet_wallet_create_wallet_create_component__WEBPACK_IMPORTED_MODULE_11__.WalletCreateComponent, _views_wallet_wallet_view_wallet_view_component__WEBPACK_IMPORTED_MODULE_12__.WalletViewComponent, _views_wallet_wallet_start_wallet_start_component__WEBPACK_IMPORTED_MODULE_13__.WalletStartComponent, _views_transaction_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_15__.TransactionListComponent, _views_wallet_wallet_edit_wallet_edit_component__WEBPACK_IMPORTED_MODULE_16__.WalletEditComponent, _views_transaction_transaction_start_transaction_start_component__WEBPACK_IMPORTED_MODULE_17__.TransactionStartComponent, _views_transaction_transaction_edit_transaction_edit_component__WEBPACK_IMPORTED_MODULE_18__.TransactionEditComponent, _views_transaction_transaction_create_transaction_create_component__WEBPACK_IMPORTED_MODULE_19__.TransactionCreateComponent, _views_transaction_transaction_view_transaction_view_component__WEBPACK_IMPORTED_MODULE_20__.TransactionViewComponent, _views_transaction_transaction_component__WEBPACK_IMPORTED_MODULE_21__.TransactionComponent, _components_shared_dropdown_wallet_dropdownWallet_component__WEBPACK_IMPORTED_MODULE_22__.DropdownWalletComponent, _helpers_go_page_back_go_page_back_directive__WEBPACK_IMPORTED_MODULE_23__.GoPageBackDirective, _components_shared_income_slider_income_slider_component__WEBPACK_IMPORTED_MODULE_24__.IncomeSliderComponent, _components_shared_datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_25__.DatepickerComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_28__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_29__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_27__.HttpClientModule]
  });
})();

/***/ }),

/***/ 8381:
/*!****************************************************************************!*\
  !*** ./src/app/components/shared/common-button/common-button.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonButtonComponent: () => (/* binding */ CommonButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class CommonButtonComponent {
  constructor() {
    this.text = 'Button';
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function CommonButtonComponent_Factory(t) {
    return new (t || CommonButtonComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: CommonButtonComponent,
    selectors: [["app-common-button"]],
    inputs: {
      text: "text"
    },
    decls: 2,
    vars: 1,
    template: function CommonButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.text, "\n");
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1541:
/*!**********************************************************************!*\
  !*** ./src/app/components/shared/datepicker/datepicker.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatepickerComponent: () => (/* binding */ DatepickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);



function DatepickerComponent_label_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.labelString);
  }
}
function DatepickerComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const day_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", day_r3, " ");
  }
}
const _c0 = function (a0, a1) {
  return {
    "other-month": a0,
    "selected": a1
  };
};
function DatepickerComponent_div_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DatepickerComponent_div_14_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const day_r6 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.dayClick(day_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const day_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, !(day_r6.month == ctx_r5.currentMonth), ctx_r5.dateValue.getDate() === day_r6.value && ctx_r5.dateValue.getMonth() === day_r6.month && ctx_r5.dateValue.getFullYear() === day_r6.year));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", day_r6.value < 10 ? "\u00A0" + day_r6.value : day_r6.value, " ");
  }
}
function DatepickerComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DatepickerComponent_div_14_div_1_Template, 2, 5, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", row_r4);
  }
}
const _c1 = function (a0) {
  return {
    "cursor": a0
  };
};
class DatepickerComponent {
  constructor(elRef) {
    this.elRef = elRef;
    this.dateValue = new Date();
    this.dateValueString = this.formatDateToDDMMYYYY(this.dateValue);
    this.isReadOnly = false;
    this.labelString = 'Date';
    this.showLabel = true;
    this.showOuterDiv = false;
    this.dateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.showDatePicker = false;
    this.hasSelectedDate = false;
    this.auxiliaryDate = new Date(this.dateValue);
    this.monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.calendar = [];
    this.currentMonth = this.dateValue.getMonth();
    this.currentYear = this.dateValue.getFullYear();
    this.datepickerSubContainer = null;
    this.datepickerWrapper = null;
  }
  ngOnInit() {
    this.datepickerSubContainer = this.elRef.nativeElement.querySelector('#datepickerContainer');
    this.datepickerWrapper = this.elRef.nativeElement.querySelector('#datepickerWrapper');
  }
  ngOnChanges(changes) {
    if (changes["dateValue"]) this.dateValueString = this.formatDateToDDMMYYYY(this.dateValue);
  }
  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.auxiliaryDate = new Date(this.currentYear, this.currentMonth, 1);
    this.populateCalendar();
  }
  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.auxiliaryDate = new Date(this.currentYear, this.currentMonth, 1);
    this.populateCalendar();
  }
  handleClick(event) {
    const datepickerElement = document.getElementsByClassName('datepicker-wrapper')[0];
    const targetElement = event.target;
    // Check if the clicked element is not the datepicker or a descendant of the datepicker
    if (!datepickerElement.contains(targetElement)) {
      // The click was outside the datepicker, so hide it
      // datepickerElement.style.display = 'none';
      this.showDatePicker = false;
    }
  }
  dayClick(day) {
    if (day.month == this.currentMonth - 1) {
      this.prevMonth();
    }
    if (day.month == this.currentMonth + 1) {
      this.nextMonth();
    }
    this.dateValue = new Date(this.auxiliaryDate.getFullYear(), this.auxiliaryDate.getMonth(), day.value);
    this.dateValueString = this.formatDateToDDMMYYYY(this.dateValue);
    this.showDatePicker = false;
    this.auxiliaryDate = this.dateValue;
    this.dateChange.emit(this.dateValue);
  }
  populateCalendar() {
    const firstDayOfMonth = this.getFirstDayOfMonth(this.auxiliaryDate);
    const daysInMonth = new Date(this.auxiliaryDate.getFullYear(), this.auxiliaryDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.auxiliaryDate.getFullYear(), this.auxiliaryDate.getMonth(), 0).getDate();
    let day = 1;
    for (let i = 0; i < 5; i++) {
      this.calendar[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          this.calendar[i][j] = new SingleDay(daysInPrevMonth - firstDayOfMonth + j + 1, this.currentMonth - 1, this.currentYear);
        } else if (day > daysInMonth) {
          this.calendar[i][j] = new SingleDay(day++ - daysInMonth, this.currentMonth + 1, this.currentYear);
        } else {
          this.calendar[i][j] = new SingleDay(day++, this.currentMonth, this.currentYear);
        }
      }
    }
  }
  openDatePicker() {
    if (this.isReadOnly) return;
    if (!this.showDatePicker) {
      if (this.datepickerSubContainer.clientHeight + this.datepickerWrapper.getBoundingClientRect().top + this.datepickerWrapper.clientHeight + 10 > window.innerHeight) {
        this.datepickerSubContainer.style.setProperty('--height', this.datepickerSubContainer.clientHeight + 'px');
        this.datepickerSubContainer.style.setProperty('--top', 'calc(0px - var(--height) - 20px)');
      } else {
        this.datepickerSubContainer.style.setProperty('--top', 'calc(100% + 10px)');
      }
    }
    this.auxiliaryDate = this.dateValue;
    this.currentMonth = this.dateValue.getMonth();
    this.currentYear = this.dateValue.getFullYear();
    this.populateCalendar();
    this.showDatePicker = !this.showDatePicker;
  }
  formatDateToDDMMYYYY(date) {
    // Get day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
    // Ensure two-digit format for day and month
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    // Combine components in "dd/mm/yyyy" format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  }
  getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
  }
  static #_ = this.ɵfac = function DatepickerComponent_Factory(t) {
    return new (t || DatepickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: DatepickerComponent,
    selectors: [["app-datepicker"]],
    hostBindings: function DatepickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DatepickerComponent_click_HostBindingHandler($event) {
          return ctx.handleClick($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
      }
    },
    inputs: {
      dateValue: "dateValue",
      isReadOnly: "isReadOnly",
      labelString: "labelString",
      showLabel: "showLabel",
      showOuterDiv: "showOuterDiv"
    },
    outputs: {
      dateChange: "dateChange"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
    decls: 15,
    vars: 11,
    consts: [["id", "datepickerWrapper", 1, "d-flex", "flex-wrap", "datepicker-wrapper", 3, "ngClass"], ["for", "date", "class", "default-label", 4, "ngIf"], ["type", "text", "readonly", "", "placeholder", "Select Date", 1, "no-style-input", "inner-input", "composed-input", "primary", "d-flex", "datepicker-input", 3, "value", "ngStyle", "click"], ["id", "datepickerContainer", 1, "datepicker-container", 3, "ngClass"], [1, "datepicker-navbar"], [1, "datapicker-arrows", 3, "click"], [1, "text-center"], [1, "datepicker-body"], [1, "datepicker-row-weekdays"], ["class", "datepicker-day", 4, "ngFor", "ngForOf"], ["class", "datepicker-row", 4, "ngFor", "ngForOf"], ["for", "date", 1, "default-label"], [1, "datepicker-day"], [1, "datepicker-row"], ["class", "datepicker-day", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "datepicker-day", 3, "ngClass", "click"]],
    template: function DatepickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DatepickerComponent_label_1_Template, 2, 1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DatepickerComponent_Template_input_click_2_listener() {
          return ctx.openDatePicker();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DatepickerComponent_Template_span_click_5_listener() {
          return ctx.prevMonth();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " < ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DatepickerComponent_Template_span_click_9_listener() {
          return ctx.nextMonth();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " > ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7)(12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, DatepickerComponent_div_13_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, DatepickerComponent_div_14_Template, 2, 1, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("ngClass", ctx.showOuterDiv ? "default-input" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.dateValueString)("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx.isReadOnly ? "default" : "pointer"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("ngClass", ctx.showDatePicker ? "active" : "off");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", ctx.monthsNames[ctx.currentMonth], " ", ctx.currentYear, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.weekDaysNames);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.calendar);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgStyle],
    styles: [".datepicker-wrapper[_ngcontent-%COMP%]{\n\tposition: relative;\n}\n\n\n.datepicker-container[_ngcontent-%COMP%]{\n\t--top: calc(100% + 10px);\n\tposition: absolute;\n\ttop: var(--top);\n\tleft: 0;\n\twidth: 100%;\n\tmax-width: 300px;\n\tz-index: 100;\n\n\tborder-radius: 10px;\n\tpadding: 10px;\n\tborder: 2px solid var(--primary-color-dark-theme);\n\n\tbackground-color: var(--bg-color-dark-theme);\n\tcolor: var(--primary-color-dark-theme);\n\n\ttransition: transform 0.5s ease-in-out;\n\ttransform: translateY(10px);\n}\n\n.datepicker-container.active[_ngcontent-%COMP%]{\n\ttransform: translateY(0);\n}\n\n.datepicker-container.off[_ngcontent-%COMP%]{\n\tleft: -1000000000px;\n}\n\n.datepicker-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]{\n\tdisplay: flex;\n}\n\n\n\n\n.datepicker-container[_ngcontent-%COMP%]   .datepicker-navbar[_ngcontent-%COMP%]{\n\tflex-direction: row;\n\tjustify-content: space-between;\n\talign-items: center;\n\tborder-bottom: 1px solid var(--primary-color-dark-theme);\n\tpadding-bottom: 5px;\n}\n\n.datepicker-container[_ngcontent-%COMP%]   .datepicker-navbar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]{\n\tcursor: pointer;\n\tpadding: 5px 15px;\n}\n\n.datapicker-arrows[_ngcontent-%COMP%]{\n\tfont-size: 1.25rem;\n}\n\n\n\n\n\n.datepicker-body[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 10px 0;\n\tfont-size: 0.90rem;\n}\n\n@media (max-width: 400px){\n\t.datepicker-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{\n\t\tfont-size: 0.75rem;\n\t}\n}\n\n.datepicker-body[_ngcontent-%COMP%]   .datepicker-row-weekdays[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n}\n\n.datepicker-body[_ngcontent-%COMP%]   .datepicker-row-weekdays[_ngcontent-%COMP%]   .datepicker-day[_ngcontent-%COMP%]{\n\t\n\n\tflex: 1;\n\ttext-align: center;\n}\n\n.datepicker-body[_ngcontent-%COMP%]   .datepicker-row[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n}\n\n.datepicker-row[_ngcontent-%COMP%]   .datepicker-day[_ngcontent-%COMP%]{\n\tcursor: pointer;\n\ttext-align: center;\n\tflex: 1;\n\tmargin: 3px;\n\t\n\n}\n.datepicker-row[_ngcontent-%COMP%]   .datepicker-day.selected[_ngcontent-%COMP%]{\n\t\n\n\n\tborder: 1px solid var(--primary-color-dark-theme);\n\tborder-radius: 5px;\n}\n\n.datepicker-row[_ngcontent-%COMP%]   .datepicker-day.other-month[_ngcontent-%COMP%]{\n\topacity: 0.4;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Q0FDQyxrQkFBa0I7QUFDbkI7OztBQUdBO0NBQ0Msd0JBQXdCO0NBQ3hCLGtCQUFrQjtDQUNsQixlQUFlO0NBQ2YsT0FBTztDQUNQLFdBQVc7Q0FDWCxnQkFBZ0I7Q0FDaEIsWUFBWTs7Q0FFWixtQkFBbUI7Q0FDbkIsYUFBYTtDQUNiLGlEQUFpRDs7Q0FFakQsNENBQTRDO0NBQzVDLHNDQUFzQzs7Q0FFdEMsc0NBQXNDO0NBQ3RDLDJCQUEyQjtBQUM1Qjs7QUFFQTtDQUNDLHdCQUF3QjtBQUN6Qjs7QUFFQTtDQUNDLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGFBQWE7QUFDZDs7QUFFQSxXQUFXOztBQUVYO0NBQ0MsbUJBQW1CO0NBQ25CLDhCQUE4QjtDQUM5QixtQkFBbUI7Q0FDbkIsd0RBQXdEO0NBQ3hELG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGVBQWU7Q0FDZixpQkFBaUI7QUFDbEI7O0FBRUE7Q0FDQyxrQkFBa0I7QUFDbkI7OztBQUdBLFNBQVM7O0FBRVQ7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLGVBQWU7Q0FDZixrQkFBa0I7QUFDbkI7O0FBRUE7Q0FDQztFQUNDLGtCQUFrQjtDQUNuQjtBQUNEOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQiw4QkFBOEI7QUFDL0I7O0FBRUE7Q0FDQyx1QkFBdUI7Q0FDdkIsT0FBTztDQUNQLGtCQUFrQjtBQUNuQjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkIsOEJBQThCO0FBQy9COztBQUVBO0NBQ0MsZUFBZTtDQUNmLGtCQUFrQjtDQUNsQixPQUFPO0NBQ1AsV0FBVztDQUNYLHVCQUF1QjtBQUN4QjtBQUNBO0NBQ0M7c0JBQ3FCO0NBQ3JCLGlEQUFpRDtDQUNqRCxrQkFBa0I7QUFDbkI7O0FBRUE7Q0FDQyxZQUFZO0FBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyIuZGF0ZXBpY2tlci13cmFwcGVye1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuXHJcbi5kYXRlcGlja2VyLWNvbnRhaW5lcntcclxuXHQtLXRvcDogY2FsYygxMDAlICsgMTBweCk7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHRvcDogdmFyKC0tdG9wKTtcclxuXHRsZWZ0OiAwO1xyXG5cdHdpZHRoOiAxMDAlO1xyXG5cdG1heC13aWR0aDogMzAwcHg7XHJcblx0ei1pbmRleDogMTAwO1xyXG5cclxuXHRib3JkZXItcmFkaXVzOiAxMHB4O1xyXG5cdHBhZGRpbmc6IDEwcHg7XHJcblx0Ym9yZGVyOiAycHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuXHJcblx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3ItZGFyay10aGVtZSk7XHJcblx0Y29sb3I6IHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSk7XHJcblxyXG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0O1xyXG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcclxufVxyXG5cclxuLmRhdGVwaWNrZXItY29udGFpbmVyLmFjdGl2ZXtcclxuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbn1cclxuXHJcbi5kYXRlcGlja2VyLWNvbnRhaW5lci5vZmZ7XHJcblx0bGVmdDogLTEwMDAwMDAwMDBweDtcclxufVxyXG5cclxuLmRhdGVwaWNrZXItY29udGFpbmVyID4gKntcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4vKiBOYXZiYXIgKi9cclxuXHJcbi5kYXRlcGlja2VyLWNvbnRhaW5lciAuZGF0ZXBpY2tlci1uYXZiYXJ7XHJcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4uZGF0ZXBpY2tlci1jb250YWluZXIgLmRhdGVwaWNrZXItbmF2YmFyID4gc3BhbntcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0cGFkZGluZzogNXB4IDE1cHg7XHJcbn1cclxuXHJcbi5kYXRhcGlja2VyLWFycm93c3tcclxuXHRmb250LXNpemU6IDEuMjVyZW07XHJcbn1cclxuXHJcblxyXG4vKiBCb2R5ICovXHJcblxyXG4uZGF0ZXBpY2tlci1ib2R5e1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRwYWRkaW5nOiAxMHB4IDA7XHJcblx0Zm9udC1zaXplOiAwLjkwcmVtO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNDAwcHgpe1xyXG5cdC5kYXRlcGlja2VyLWNvbnRhaW5lciAqe1xyXG5cdFx0Zm9udC1zaXplOiAwLjc1cmVtO1xyXG5cdH1cclxufVxyXG5cclxuLmRhdGVwaWNrZXItYm9keSAuZGF0ZXBpY2tlci1yb3ctd2Vla2RheXN7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLmRhdGVwaWNrZXItYm9keSAuZGF0ZXBpY2tlci1yb3ctd2Vla2RheXMgLmRhdGVwaWNrZXItZGF5e1xyXG5cdC8qIHBhZGRpbmc6IDVweCAxNXB4OyAqL1xyXG5cdGZsZXg6IDE7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZGF0ZXBpY2tlci1ib2R5IC5kYXRlcGlja2VyLXJvd3tcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uZGF0ZXBpY2tlci1yb3cgLmRhdGVwaWNrZXItZGF5e1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0ZmxleDogMTtcclxuXHRtYXJnaW46IDNweDtcclxuXHQvKiBwYWRkaW5nOiA1cHggMTVweDsgKi9cclxufVxyXG4uZGF0ZXBpY2tlci1yb3cgLmRhdGVwaWNrZXItZGF5LnNlbGVjdGVke1xyXG5cdC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lLXJnYiksIDAuMyk7XHJcblx0Ym9yZGVyLXJhZGl1czogNXB4OyAqL1xyXG5cdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSk7XHJcblx0Ym9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4uZGF0ZXBpY2tlci1yb3cgLmRhdGVwaWNrZXItZGF5Lm90aGVyLW1vbnRoe1xyXG5cdG9wYWNpdHk6IDAuNDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}
class SingleDay {
  constructor(value, month, year) {
    this.value = value;
    this.month = month;
    this.year = year;
  }
}

/***/ }),

/***/ 5131:
/*!*******************************************************************************!*\
  !*** ./src/app/components/shared/dropdown-wallet/dropdownWallet.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropdownWalletComponent: () => (/* binding */ DropdownWalletComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);



function DropdownWalletComponent_label_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.labelString);
  }
}
function DropdownWalletComponent_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Select Wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function DropdownWalletComponent_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.selectedWallet.name, " ");
  }
}
const _c0 = function (a0, a1) {
  return {
    "income-amount": a0,
    "expense-amount": a1
  };
};
function DropdownWalletComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DropdownWalletComponent_div_6_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const wallet_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.selectWallet(wallet_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 9)(4, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "21/12/2023 12:51");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const wallet_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", wallet_r4.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](4, _c0, wallet_r4.amount >= 0, wallet_r4.amount < 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", wallet_r4.amount, " ", wallet_r4.currencyCode, " ");
  }
}
const _c1 = function (a0, a1, a2) {
  return {
    "dropdown-show": a0,
    "dropdown-hide": a1,
    "dropdown-display-none": a2
  };
};
class DropdownWalletComponent {
  constructor(elRef) {
    this.elRef = elRef;
    this.wallets = [];
    this.readonly = false;
    this.labelString = 'Wallet';
    this.showLabel = true;
    this.selectWalletEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.showDropdown = false;
    this.dropdownNone = true;
    this.firstLoad = true;
    this.lastWasTop = false;
    this.dropDownElement = null;
    this.buttonDropdownWallet = null;
  }
  ngOnInit() {
    this.dropDownElement = this.elRef.nativeElement.querySelector('#dropdownWallet');
    this.buttonDropdownWallet = this.elRef.nativeElement.querySelector('#buttonDropdownWallet');
  }
  selectWallet(wallet) {
    this.showDropdown = false;
    this.selectedWallet = wallet;
    this.selectWalletEmitter.emit(wallet);
    if (!this.showDropdown) {
      setTimeout(() => {
        this.dropdownNone = true;
      }, 300);
    }
  }
  selectShowDropdown() {
    if (this.readonly || !this.dropDownElement) return;
    if (this.firstLoad || this.showDropdown) this.dropDownElement.style.setProperty('transition', 'opacity 0.2s ease-in-out');else this.dropDownElement.style.setProperty('transition', 'opacity 0.2s ease-in-out, top 0.2s ease-in-out');
    this.firstLoad = false;
    this.dropDownElement.style.setProperty('visibility', 'hidden');
    this.dropdownNone = false;
    requestAnimationFrame(() => {
      this.dropDownElement?.style.setProperty('--height', this.dropDownElement?.clientHeight + 'px');
      if (this.dropDownElement.clientHeight + this.buttonDropdownWallet.getBoundingClientRect().top > window.innerHeight) {
        if (!this.lastWasTop) this.dropDownElement.style.setProperty('transition', 'opacity 0.2s ease-in-out');
        this.dropDownElement?.style.setProperty('--top', 'calc(0px - var(--height) - 20px)');
        this.lastWasTop = true;
      } else {
        if (this.lastWasTop) this.dropDownElement.style.setProperty('transition', 'opacity 0.2s ease-in-out');
        this.dropDownElement?.style.setProperty('--top', 'calc(100% + 10px)');
        this.lastWasTop = false;
      }
      this.dropDownElement?.style.setProperty('visibility', 'visible');
    });
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown) {
      setTimeout(() => {
        this.dropdownNone = true;
      }, 300);
    }
  }
  static #_ = this.ɵfac = function DropdownWalletComponent_Factory(t) {
    return new (t || DropdownWalletComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: DropdownWalletComponent,
    selectors: [["app-dropdown-wallet"]],
    inputs: {
      wallets: "wallets",
      selectedWallet: "selectedWallet",
      readonly: "readonly",
      labelString: "labelString",
      showLabel: "showLabel"
    },
    outputs: {
      selectWalletEmitter: "selectWalletEmitter"
    },
    decls: 7,
    vars: 9,
    consts: [[1, "custom-select", "default-input", "composed-input", "d-flex"], ["for", "date", "class", "default-label", 4, "ngIf"], ["id", "buttonDropdownWallet", 1, "selected-option", "inner-input", 3, "click"], ["class", "w-100Z", 4, "ngIf"], ["id", "dropdownWallet", 1, "default-dropdown", 3, "ngClass"], ["class", "default-dropdown-option", 3, "click", 4, "ngFor", "ngForOf"], ["for", "date", 1, "default-label"], [1, "w-100Z"], [1, "default-dropdown-option", 3, "click"], [1, "sub-wallet-container"], [1, "latest-transaction"], [1, "wallet-amount", 3, "ngClass"]],
    template: function DropdownWalletComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DropdownWalletComponent_label_1_Template, 2, 1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DropdownWalletComponent_Template_div_click_2_listener() {
          return ctx.selectShowDropdown();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DropdownWalletComponent_span_3_Template, 2, 0, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, DropdownWalletComponent_span_4_Template, 2, 1, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, DropdownWalletComponent_div_6_Template, 8, 7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.selectedWallet);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.selectedWallet);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](5, _c1, ctx.showDropdown, !ctx.showDropdown, ctx.firstLoad || ctx.dropdownNone));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.wallets);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
    styles: [".custom-select[_ngcontent-%COMP%]{\n\tposition: relative;\n}\n\n\n.default-dropdown[_ngcontent-%COMP%]{\n\t--height: 0px;\n\t--top: 0px;\n\tposition: absolute;\n\tbackground-color: var(--bg-color-dark-theme);\n\twidth: 100%;\n\t\n\n\ttop: var(--top);\n\tleft: -5px;\n\tpadding: 10px;\n\tborder-radius: 10px;\n\tborder: 1px solid var(--primary-color-dark-theme);\n\tcursor: pointer;\n\tmax-height: 40vh;\n\toverflow-y: auto;\n\tz-index: 10;\n}\n\n.dropdown-show[_ngcontent-%COMP%]{\n\topacity: 1;\n}\n\n.dropdown-hide[_ngcontent-%COMP%]{\n\ttop: var(--top);\n\topacity: 0;\n}\n\n.dropdown-display-none[_ngcontent-%COMP%]{\n\tdisplay: none;\n}\n\n.default-dropdown-option[_ngcontent-%COMP%]{\n\tpadding: 10px 0;\n\tdisplay: flex;\n\tflex-direction: row;\n\talign-items: center;\n\tborder-bottom: 1px solid var(--primary-color-dark-theme);\n\t-webkit-user-select: none;\n\t        user-select: none;\n}\n\n.default-dropdown-option[_ngcontent-%COMP%]{\n\tjustify-content: space-between;\n}\n\n.default-dropdown-option[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]{\n\tflex: 1;\n}\n\n.default-dropdown-option[_ngcontent-%COMP%]:last-child{\n\tborder-bottom: none;\n}\n\n.selected-option[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\talign-items: center;\n\tcursor: pointer;\n\t-webkit-user-select: none;\n\t        user-select: none;\n}\n\n.selected-option[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]{\n\tcursor: pointer;\n}\n\n.sub-wallet-container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\tflex-wrap: wrap;\n}\n\n.wallet-amount[_ngcontent-%COMP%]{\n\tmargin-left: auto;\n}\n\n.latest-transaction[_ngcontent-%COMP%]{\n\topacity: 0.7;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZHJvcGRvd24td2FsbGV0L2Ryb3Bkb3duV2FsbGV0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0NBQ0Msa0JBQWtCO0FBQ25COzs7QUFHQTtDQUNDLGFBQWE7Q0FDYixVQUFVO0NBQ1Ysa0JBQWtCO0NBQ2xCLDRDQUE0QztDQUM1QyxXQUFXO0NBQ1gsNEJBQTRCO0NBQzVCLGVBQWU7Q0FDZixVQUFVO0NBQ1YsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixpREFBaUQ7Q0FDakQsZUFBZTtDQUNmLGdCQUFnQjtDQUNoQixnQkFBZ0I7Q0FDaEIsV0FBVztBQUNaOztBQUVBO0NBQ0MsVUFBVTtBQUNYOztBQUVBO0NBQ0MsZUFBZTtDQUNmLFVBQVU7QUFDWDs7QUFFQTtDQUNDLGFBQWE7QUFDZDs7QUFFQTtDQUNDLGVBQWU7Q0FDZixhQUFhO0NBQ2IsbUJBQW1CO0NBQ25CLG1CQUFtQjtDQUNuQix3REFBd0Q7Q0FDeEQseUJBQWlCO1NBQWpCLGlCQUFpQjtBQUNsQjs7QUFFQTtDQUNDLDhCQUE4QjtBQUMvQjs7QUFFQTtDQUNDLE9BQU87QUFDUjs7QUFFQTtDQUNDLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkIsOEJBQThCO0NBQzlCLG1CQUFtQjtDQUNuQixlQUFlO0NBQ2YseUJBQWlCO1NBQWpCLGlCQUFpQjtBQUNsQjs7QUFFQTtDQUNDLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsbUJBQW1CO0NBQ25CLDhCQUE4QjtDQUM5QixlQUFlO0FBQ2hCOztBQUVBO0NBQ0MsaUJBQWlCO0FBQ2xCOztBQUVBO0NBQ0MsWUFBWTtBQUNiIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5jdXN0b20tc2VsZWN0e1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuXHJcbi5kZWZhdWx0LWRyb3Bkb3due1xyXG5cdC0taGVpZ2h0OiAwcHg7XHJcblx0LS10b3A6IDBweDtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3ItZGFyay10aGVtZSk7XHJcblx0d2lkdGg6IDEwMCU7XHJcblx0LyogdG9wOiBjYWxjKDEwMCUgKyAxMHB4KTsgKi9cclxuXHR0b3A6IHZhcigtLXRvcCk7XHJcblx0bGVmdDogLTVweDtcclxuXHRwYWRkaW5nOiAxMHB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0bWF4LWhlaWdodDogNDB2aDtcclxuXHRvdmVyZmxvdy15OiBhdXRvO1xyXG5cdHotaW5kZXg6IDEwO1xyXG59XHJcblxyXG4uZHJvcGRvd24tc2hvd3tcclxuXHRvcGFjaXR5OiAxO1xyXG59XHJcblxyXG4uZHJvcGRvd24taGlkZXtcclxuXHR0b3A6IHZhcigtLXRvcCk7XHJcblx0b3BhY2l0eTogMDtcclxufVxyXG5cclxuLmRyb3Bkb3duLWRpc3BsYXktbm9uZXtcclxuXHRkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4uZGVmYXVsdC1kcm9wZG93bi1vcHRpb257XHJcblx0cGFkZGluZzogMTBweCAwO1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLWRhcmstdGhlbWUpO1xyXG5cdHVzZXItc2VsZWN0OiBub25lO1xyXG59XHJcblxyXG4uZGVmYXVsdC1kcm9wZG93bi1vcHRpb257XHJcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uZGVmYXVsdC1kcm9wZG93bi1vcHRpb24gPiAqe1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuXHJcbi5kZWZhdWx0LWRyb3Bkb3duLW9wdGlvbjpsYXN0LWNoaWxke1xyXG5cdGJvcmRlci1ib3R0b206IG5vbmU7XHJcbn1cclxuXHJcbi5zZWxlY3RlZC1vcHRpb257XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxuXHR1c2VyLXNlbGVjdDogbm9uZTtcclxufVxyXG5cclxuLnNlbGVjdGVkLW9wdGlvbiA+IHNwYW57XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uc3ViLXdhbGxldC1jb250YWluZXJ7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHRmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuXHJcbi53YWxsZXQtYW1vdW50e1xyXG5cdG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG59XHJcblxyXG4ubGF0ZXN0LXRyYW5zYWN0aW9ue1xyXG5cdG9wYWNpdHk6IDAuNztcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 4580:
/*!****************************************************************************!*\
  !*** ./src/app/components/shared/income-slider/income-slider.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncomeSliderComponent: () => (/* binding */ IncomeSliderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);


class IncomeSliderComponent {
  constructor() {
    this.isIncome = true;
    this.readonly = false;
    this.setTransactionTypeEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  setTransactionType(type) {
    if (this.readonly) return;
    this.isIncome = type;
    this.setTransactionTypeEmitter.emit(type);
  }
  setTransactionTypeByCheckbox($event) {
    if (this.readonly) return false;
    this.setTransactionType(!$event.target.checked);
    return this.isIncome;
  }
  static #_ = this.ɵfac = function IncomeSliderComponent_Factory(t) {
    return new (t || IncomeSliderComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: IncomeSliderComponent,
    selectors: [["app-income-slider"]],
    inputs: {
      isIncome: "isIncome",
      readonly: "readonly"
    },
    outputs: {
      setTransactionTypeEmitter: "setTransactionTypeEmitter"
    },
    decls: 9,
    vars: 2,
    consts: [[1, "is-income-slider"], [1, "sub-button"], [1, "income-amount", 3, "click"], [1, "slider-input-container"], ["type", "checkbox", "name", "isIncome", 1, "toggle-input", 3, "disabled", "checked", "change"], [1, "expense-amount", 3, "click"]],
    template: function IncomeSliderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IncomeSliderComponent_Template_span_click_2_listener() {
          return ctx.setTransactionType(true);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Income");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3)(5, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function IncomeSliderComponent_Template_input_change_5_listener($event) {
          return ctx.setTransactionTypeByCheckbox($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1)(7, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IncomeSliderComponent_Template_span_click_7_listener() {
          return ctx.setTransactionType(false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Expense");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.readonly)("checked", !ctx.isIncome);
      }
    },
    styles: [".is-income-slider[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content:left;\n\talign-items: center;\n\tfont-size: 1rem;\n}\n\n.is-income-slider[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]{\n\tpadding: 0 5px;\n}\n\n.slider-input-container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\talign-items: center;\n}\n\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvaW5jb21lLXNsaWRlci9pbmNvbWUtc2xpZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixvQkFBb0I7Q0FDcEIsbUJBQW1CO0NBQ25CLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsbUJBQW1CO0FBQ3BCOztBQUVBLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uaXMtaW5jb21lLXNsaWRlcntcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0anVzdGlmeS1jb250ZW50OmxlZnQ7XHJcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRmb250LXNpemU6IDFyZW07XHJcbn1cclxuXHJcbi5pcy1pbmNvbWUtc2xpZGVyID4gKntcclxuXHRwYWRkaW5nOiAwIDVweDtcclxufVxyXG5cclxuLnNsaWRlci1pbnB1dC1jb250YWluZXJ7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4vKiBJbnB1dCBDaGVja2JveCBTbGlkZXIgKi8iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 1594:
/*!*********************************************!*\
  !*** ./src/app/environments/environment.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  serverApiUrl: 'https://localhost:7232'
};

/***/ }),

/***/ 1074:
/*!***************************************************!*\
  !*** ./src/app/shared/header/header.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class HeaderComponent {
  static #_ = this.ɵfac = function HeaderComponent_Factory(t) {
    return new (t || HeaderComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: HeaderComponent,
    selectors: [["app-header"]],
    decls: 6,
    vars: 0,
    consts: [[1, "container"], [1, "row"], [1, "col-md-12"]],
    template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Angular 2 - CRUD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      }
    },
    styles: ["*[_ngcontent-%COMP%] {\n    color: var(--primary-color-dark-theme);\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHNDQUFzQztBQUMxQyIsInNvdXJjZXNDb250ZW50IjpbIioge1xyXG4gICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5380:
/*!************************************************!*\
  !*** ./src/app/views/login/login.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var src_app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_models */ 4939);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5267);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8849);






class LoginComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.emailOrUsername = '';
    this.password = '';
    this.loginRequestData = new src_app_models__WEBPACK_IMPORTED_MODULE_0__.LoginRequestDto('', '');
  }
  login() {
    this.authService.login(this.loginRequestData).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.first)()).subscribe({
      next: res => {
        console.log(res);
        alert('Successfully logged in');
        this.router.navigate(['/']);
      },
      error: err => {
        console.log(err);
        alert('Error while logging in: ' + err);
      }
    });
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 21,
    vars: 2,
    consts: [[1, "container", "d-flex", "flex-column", "align-items-center"], [1, "d-flex", "flex-column", "align-items-center", "h-100", "mainPage"], ["src", "assets/img/logo.svg", "alt", "logo", 1, "logo"], ["type", "text", "placeholder", "Username Or Email", 1, "default-input", 3, "ngModel", "ngModelChange"], ["type", "password", "placeholder", "Password", 1, "default-input", 3, "ngModel", "ngModelChange"], [1, "default-button", 3, "click"], ["routerLink", "/signup", 1, "default-link"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "br")(3, "br")(4, "img", 2)(5, "br")(6, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_7_listener($event) {
          return ctx.loginRequestData.emailOrUsername = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "br")(9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_10_listener($event) {
          return ctx.loginRequestData.password = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "br")(12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_13_listener() {
          return ctx.login();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "br")(16, "br")(17, "br")(18, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Not a User? Sign Up");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.loginRequestData.emailOrUsername);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.loginRequestData.password);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
    styles: [".logo[_ngcontent-%COMP%] {\n    width: 200px;\n    height: 200px;\n}\n\n.container[_ngcontent-%COMP%] {\n    height: 100%;\n}\n\n@media (min-width: 500px) {\n    .mainPage[_ngcontent-%COMP%] {\n        width: 500px;\n    }\n}\n\n@media (max-width: 500px) {\n    .mainPage[_ngcontent-%COMP%] {\n        width: 90%;\n    }\n}\n\n.default-input[_ngcontent-%COMP%]{\n\tpadding: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJO1FBQ0ksWUFBWTtJQUNoQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxVQUFVO0lBQ2Q7QUFDSjs7QUFFQTtDQUNDLGFBQWE7QUFDZCIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dvIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogMjAwcHg7XHJcbn1cclxuXHJcbi5jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcclxuICAgIC5tYWluUGFnZSB7XHJcbiAgICAgICAgd2lkdGg6IDUwMHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcclxuICAgIC5tYWluUGFnZSB7XHJcbiAgICAgICAgd2lkdGg6IDkwJTtcclxuICAgIH1cclxufVxyXG5cclxuLmRlZmF1bHQtaW5wdXR7XHJcblx0cGFkZGluZzogMTVweDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 953:
/*!******************************************************************!*\
  !*** ./src/app/views/page-not-found/page-not-found.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageNotFoundComponent: () => (/* binding */ PageNotFoundComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class PageNotFoundComponent {
  static #_ = this.ɵfac = function PageNotFoundComponent_Factory(t) {
    return new (t || PageNotFoundComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: PageNotFoundComponent,
    selectors: [["app-page-not-found"]],
    decls: 5,
    vars: 0,
    consts: [[1, "container"], [1, "row"], [1, "col-md-12"], [1, "text-center"]],
    template: function PageNotFoundComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Page Not Found");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      }
    },
    styles: ["h1[_ngcontent-%COMP%] {\n    color: var(--primary-color-dark-theme);\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHNDQUFzQztBQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImgxIHtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLWRhcmstdGhlbWUpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 714:
/*!**************************************************!*\
  !*** ./src/app/views/signup/signup.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupComponent: () => (/* binding */ SignupComponent)
/* harmony export */ });
/* harmony import */ var src_app_models___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_models/ */ 4939);
/* harmony import */ var src_app_models_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_models/user */ 252);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8849);







function SignupComponent_input_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SignupComponent_input_7_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.email = $event);
    })("ngModelChange", function SignupComponent_input_7_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.checkEmail($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r0.email);
  }
}
function SignupComponent_input_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SignupComponent_input_8_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r12.name = $event);
    })("ngModelChange", function SignupComponent_input_8_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r14.checkName($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.name);
  }
}
function SignupComponent_label_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r2.level0errorMessage);
  }
}
function SignupComponent_input_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SignupComponent_input_12_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r15.username = $event);
    })("ngModelChange", function SignupComponent_input_12_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r17.checkUsername($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r3.username);
  }
}
function SignupComponent_input_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SignupComponent_input_13_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r18.surname = $event);
    })("ngModelChange", function SignupComponent_input_13_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r20.checkSurname($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r4.surname);
  }
}
function SignupComponent_input_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SignupComponent_input_14_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r21.password = $event);
    })("ngModelChange", function SignupComponent_input_14_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r22);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r23.checkPassword($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r5.password);
  }
}
function SignupComponent_label_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r6.level1errorMessage);
  }
}
function SignupComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupComponent_button_19_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r24.back());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Back ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SignupComponent_a_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Already a User? Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0) {
  return {
    "short-button": a0
  };
};
class SignupComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.email = '';
    this.username = '';
    this.name = '';
    this.surname = '';
    this.password = '';
    this.isLevel1error = false;
    this.level1errorMessage = '';
    this.isLevel0error = false;
    this.level0errorMessage = '';
    this.step = 0;
  }
  signup() {
    let user = new src_app_models_user__WEBPACK_IMPORTED_MODULE_1__.User(this.username, this.email, this.name, this.surname);
    let signupRequestDto = new src_app_models___WEBPACK_IMPORTED_MODULE_0__.SignupRequestDto(user, this.password);
    console.log(signupRequestDto);
    this.authService.signup(signupRequestDto).subscribe({
      next: response => {
        console.log(response);
        alert('Successfully signed up');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
        alert('Error while signing up: ' + err);
      }
    });
  }
  next() {
    if (!this.validateStep()) {
      alert('Please fill in all the fields correctly');
      return;
    }
    if (this.step == 2) {
      this.signup();
      return;
    }
    this.step++;
  }
  back() {
    if (this.step > 0) {
      this.step--;
    }
  }
  validateStep() {
    return !this.isLevel0error && !this.isLevel1error;
  }
  checkUsername($event) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(this.username)) {
      this.isLevel1error = true;
      this.level1errorMessage = 'Invalid username';
      return;
    }
    this.isLevel1error = false;
    this.authService.isUsernameAvailable(this.username).subscribe({
      next: response => {
        console.log(response);
        if (!response) {
          this.isLevel1error = true;
          this.level1errorMessage = 'Username already in use';
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
  checkEmail($event) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.isLevel0error = true;
      this.level0errorMessage = 'Invalid email';
      return;
    }
    this.isLevel0error = false;
    this.authService.isEmailAvailable(this.email).subscribe({
      next: response => {
        console.log(response);
        if (!response) {
          this.isLevel0error = true;
          this.level0errorMessage = 'Email already in use';
        }
      },
      error: err => {
        console.log(err);
        this.isLevel0error = true;
        this.level0errorMessage = 'Error checking email';
      }
    });
  }
  checkName($event) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(this.name)) {
      this.isLevel0error = true;
      this.level0errorMessage = 'Invalid name';
      return;
    }
    this.isLevel0error = false;
  }
  checkSurname($event) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(this.surname)) {
      this.isLevel1error = true;
      this.level1errorMessage = 'Invalid surname';
      return;
    }
    this.isLevel1error = false;
  }
  checkPassword($event) {
    if (this.password.length < 4) {
      this.isLevel1error = true;
      this.level1errorMessage = 'Password must be at least 8 characters long';
      return;
    }
    this.isLevel1error = false;
  }
  static #_ = this.ɵfac = function SignupComponent_Factory(t) {
    return new (t || SignupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: SignupComponent,
    selectors: [["app-signup"]],
    decls: 27,
    vars: 13,
    consts: [[1, "container", "d-flex", "flex-column", "align-items-center"], [1, "d-flex", "flex-column", "align-items-center", "h-100", "mainPage"], ["src", "assets/img/logo.svg", "alt", "logo", 1, "logo"], ["class", "default-input", "type", "text", "placeholder", "Email", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "default-input", "type", "text", "placeholder", "Name", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "error availabilityError", 4, "ngIf"], ["class", "default-input", "type", "text", "placeholder", "Username", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "default-input", "type", "text", "placeholder", "Surname", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "default-input", "type", "password", "placeholder", "password", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "row", "justify-content-between", "w-100"], ["class", "default-button short-button invert-button", 3, "click", 4, "ngIf"], [1, "default-button", 3, "ngClass", "click"], ["class", "default-link", "routerLink", "/login", 4, "ngIf"], ["type", "text", "placeholder", "Email", 1, "default-input", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Name", 1, "default-input", 3, "ngModel", "ngModelChange"], [1, "error", "availabilityError"], ["type", "text", "placeholder", "Username", 1, "default-input", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Surname", 1, "default-input", 3, "ngModel", "ngModelChange"], ["type", "password", "placeholder", "password", 1, "default-input", 3, "ngModel", "ngModelChange"], [1, "default-button", "short-button", "invert-button", 3, "click"], ["routerLink", "/login", 1, "default-link"]],
    template: function SignupComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "br")(3, "br")(4, "img", 2)(5, "br")(6, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, SignupComponent_input_7_Template, 1, 1, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, SignupComponent_input_8_Template, 1, 1, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, SignupComponent_label_9_Template, 2, 1, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "br")(11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, SignupComponent_input_12_Template, 1, 1, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, SignupComponent_input_13_Template, 1, 1, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, SignupComponent_input_14_Template, 1, 1, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, SignupComponent_label_15_Template, 2, 1, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "br")(17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, SignupComponent_button_19_Template, 2, 0, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupComponent_Template_button_click_20_listener() {
          return ctx.next();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](22, "br")(23, "br")(24, "br")(25, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, SignupComponent_a_26_Template, 2, 0, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step == 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLevel0error);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step == 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step == 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLevel1error);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step != 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](11, _c0, ctx.step != 0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.step == 0 ? "Sign Up" : "Next", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.step == 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
    styles: [".logo[_ngcontent-%COMP%] {\n    width: 200px;\n    height: 200px;\n}\n\n.container[_ngcontent-%COMP%] {\n    height: 100%;\n}\n\n@media (min-width: 500px) {\n    .mainPage[_ngcontent-%COMP%] {\n        width: 500px;\n    }\n}\n\n@media (max-width: 500px) {\n    .mainPage[_ngcontent-%COMP%] {\n        width: 90%;\n    }\n}\n\ninput[_ngcontent-%COMP%]::placeholder {\n    color: var(--primary-color-dark-theme);\n    opacity: 0.8;\n}\n\ninput[_ngcontent-%COMP%]::-ms-input-placeholder {\n    color: var(--primary-color-dark-theme);\n    opacity: 0.8;\n}\n\n.short-button[_ngcontent-%COMP%] {\n    width: 25%;\n}\n\n.invert-button[_ngcontent-%COMP%] {\n    background-color: var(--primary-color-light-theme) !important;\n    color: var(--primary-color-dark-theme) !important;\n    font-size: 1.2rem !important;\n    border: none !important;\n    opacity: 0.8;\n}\n\n.hide[_ngcontent-%COMP%] {\n    display: none;\n}\n\n.availabilityError[_ngcontent-%COMP%]{\n\tmargin-top: 10px;\n\tmargin-bottom: -15px;\n}\n\n.default-input[_ngcontent-%COMP%]{\n\tpadding: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvc2lnbnVwL3NpZ251cC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0k7UUFDSSxZQUFZO0lBQ2hCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0ksc0NBQXNDO0lBQ3RDLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxzQ0FBc0M7SUFDdEMsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLDZEQUE2RDtJQUM3RCxpREFBaUQ7SUFDakQsNEJBQTRCO0lBQzVCLHVCQUF1QjtJQUN2QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtDQUNDLGdCQUFnQjtDQUNoQixvQkFBb0I7QUFDckI7O0FBRUE7Q0FDQyxhQUFhO0FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyIubG9nbyB7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG59XHJcblxyXG4uY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDUwMHB4KSB7XHJcbiAgICAubWFpblBhZ2Uge1xyXG4gICAgICAgIHdpZHRoOiA1MDBweDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbiAgICAubWFpblBhZ2Uge1xyXG4gICAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlucHV0OjpwbGFjZWhvbGRlciB7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuICAgIG9wYWNpdHk6IDAuODtcclxufVxyXG5cclxuaW5wdXQ6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuICAgIG9wYWNpdHk6IDAuODtcclxufVxyXG5cclxuLnNob3J0LWJ1dHRvbiB7XHJcbiAgICB3aWR0aDogMjUlO1xyXG59XHJcblxyXG4uaW52ZXJ0LWJ1dHRvbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLWxpZ2h0LXRoZW1lKSAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSkgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMS4ycmVtICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIG9wYWNpdHk6IDAuODtcclxufVxyXG5cclxuLmhpZGUge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLmF2YWlsYWJpbGl0eUVycm9ye1xyXG5cdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0bWFyZ2luLWJvdHRvbTogLTE1cHg7XHJcbn1cclxuXHJcbi5kZWZhdWx0LWlucHV0e1xyXG5cdHBhZGRpbmc6IDE1cHg7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4575:
/*!**********************************************!*\
  !*** ./src/app/views/test/test.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestComponent: () => (/* binding */ TestComponent)
/* harmony export */ });
/* harmony import */ var D_Repos_VisualMoney_Src_WebClientApp_WebClient_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/environments/environment */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/authentication/authentication.service */ 7872);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../wallet/wallet.component */ 9336);






class TestComponent {
  constructor(authenticationService, httpClient) {
    this.authenticationService = authenticationService;
    this.httpClient = httpClient;
  }
  xhrRequest() {
    this.httpClient.get(`${src_app_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.serverApiUrl}/test/authtest`).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  refreshToken() {
    var _this = this;
    return (0,D_Repos_VisualMoney_Src_WebClientApp_WebClient_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.authenticationService.refreshTokenPromise();
      alert(_this.authenticationService.accessToken);
    })();
  }
  logout() {
    this.authenticationService.setEmptyAccessToken();
  }
  static #_ = this.ɵfac = function TestComponent_Factory(t) {
    return new (t || TestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: TestComponent,
    selectors: [["app-test"]],
    decls: 10,
    vars: 0,
    consts: [["type", "button", 1, "default-button", 3, "click"]],
    template: function TestComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "test works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TestComponent_Template_button_click_2_listener() {
          return ctx.xhrRequest();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " make xhr request with auth\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TestComponent_Template_button_click_4_listener() {
          return ctx.refreshToken();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " refresh token\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TestComponent_Template_button_click_6_listener() {
          return ctx.logout();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "logout");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "\n``` ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "app-wallet");
      }
    },
    dependencies: [_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_3__.WalletComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6185:
/*!********************************************!*\
  !*** ./src/app/views/transaction/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionComponent: () => (/* reexport safe */ _transaction_component__WEBPACK_IMPORTED_MODULE_0__.TransactionComponent),
/* harmony export */   TransactionCreateComponent: () => (/* reexport safe */ _transaction_create_transaction_create_component__WEBPACK_IMPORTED_MODULE_1__.TransactionCreateComponent),
/* harmony export */   TransactionEditComponent: () => (/* reexport safe */ _transaction_edit_transaction_edit_component__WEBPACK_IMPORTED_MODULE_2__.TransactionEditComponent),
/* harmony export */   TransactionStartComponent: () => (/* reexport safe */ _transaction_start_transaction_start_component__WEBPACK_IMPORTED_MODULE_3__.TransactionStartComponent),
/* harmony export */   TransactionViewComponent: () => (/* reexport safe */ _transaction_view_transaction_view_component__WEBPACK_IMPORTED_MODULE_4__.TransactionViewComponent)
/* harmony export */ });
/* harmony import */ var _transaction_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transaction.component */ 3479);
/* harmony import */ var _transaction_create_transaction_create_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction-create/transaction-create.component */ 8537);
/* harmony import */ var _transaction_edit_transaction_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transaction-edit/transaction-edit.component */ 4977);
/* harmony import */ var _transaction_start_transaction_start_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transaction-start/transaction-start.component */ 3030);
/* harmony import */ var _transaction_view_transaction_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transaction-view/transaction-view.component */ 364);






/***/ }),

/***/ 8537:
/*!**************************************************************************************!*\
  !*** ./src/app/views/transaction/transaction-create/transaction-create.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionCreateComponent: () => (/* binding */ TransactionCreateComponent)
/* harmony export */ });
/* harmony import */ var src_app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_models */ 4939);
/* harmony import */ var src_app_models_Transaction_transactionModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_models/Transaction/transactionModel */ 7752);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/transaction/transaction.service */ 4173);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _components_shared_dropdown_wallet_dropdownWallet_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/shared/dropdown-wallet/dropdownWallet.component */ 5131);
/* harmony import */ var _components_shared_income_slider_income_slider_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/shared/income-slider/income-slider.component */ 4580);









const _c0 = function () {
  return ["/transaction"];
};
class TransactionCreateComponent {
  constructor(transactionService, walletService, router) {
    this.transactionService = transactionService;
    this.walletService = walletService;
    this.router = router;
    this.selectedWallet = new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel();
    if (walletService.wallets.length == 0) {
      walletService.getWalletsFromServer().subscribe(() => {
        console.log(walletService.wallets);
      });
    }
  }
  addTransaction() {
    this.transactionService.newTransaction.idWallet = this.selectedWallet.id ?? -1;
    if (this.transactionService.newTransaction.idWallet == -1 || this.transactionService.newTransaction.name == "" || this.transactionService.newTransaction.amount == 0 || this.transactionService.newTransaction.currencyCode == "") {
      alert("Please select wallet");
      console.log(this.transactionService.newTransaction);
      return;
    }
    this.transactionService.addTransaction().subscribe(res => {
      console.log(res);
      this.transactionService.newTransaction = new src_app_models_Transaction_transactionModel__WEBPACK_IMPORTED_MODULE_1__.TransactionModel();
      this.selectedWallet = new src_app_models__WEBPACK_IMPORTED_MODULE_0__.WalletModel();
      this.router.navigate(['/transaction']);
    });
  }
  setTransactionType(type) {
    this.transactionService.newTransaction.isIncome = type;
  }
  setTransactionTypeByCheckbox($event) {
    this.setTransactionType(!$event.target.checked);
  }
  selectWallet($event) {
    this.selectedWallet = $event;
  }
  static #_ = this.ɵfac = function TransactionCreateComponent_Factory(t) {
    return new (t || TransactionCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_2__.TransactionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_3__.WalletService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: TransactionCreateComponent,
    selectors: [["app-transaction-create"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 22,
    vars: 7,
    consts: [[1, "component-header"], [1, "bi", "bi-arrow-left-circle", "pointer", 2, "cursor", "pointer", 3, "routerLink"], [1, "d-flex", "align-items-end", "h-100"], [3, "isIncome", "setTransactionTypeEmitter"], [1, "childMainPage"], ["type", "text", "placeholder", "Transaction Name", 1, "default-input", "primary", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Transaction Amount", 1, "default-input", "primary", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Transaction Currency Code", 1, "default-input", "primary", 3, "ngModel", "ngModelChange"], [3, "wallets", "selectWalletEmitter"], [1, "bottom-button"], [1, "default-button", 3, "click"]],
    template: function TransactionCreateComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "New Transaction");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 2)(7, "app-income-slider", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("setTransactionTypeEmitter", function TransactionCreateComponent_Template_app_income_slider_setTransactionTypeEmitter_7_listener($event) {
          return ctx.setTransactionType($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 4)(10, "div")(11, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function TransactionCreateComponent_Template_input_ngModelChange_11_listener($event) {
          return ctx.transactionService.newTransaction.name = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div")(13, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function TransactionCreateComponent_Template_input_ngModelChange_13_listener($event) {
          return ctx.transactionService.newTransaction.amount = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div")(15, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function TransactionCreateComponent_Template_input_ngModelChange_15_listener($event) {
          return ctx.transactionService.newTransaction.currencyCode = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div")(18, "app-dropdown-wallet", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("selectWalletEmitter", function TransactionCreateComponent_Template_app_dropdown_wallet_selectWalletEmitter_18_listener($event) {
          return ctx.selectWallet($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "div", 9)(20, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function TransactionCreateComponent_Template_button_click_20_listener() {
          return ctx.addTransaction();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, " Create Wallet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](6, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("isIncome", ctx.transactionService.newTransaction.isIncome);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.transactionService.newTransaction.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.transactionService.newTransaction.amount);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.transactionService.newTransaction.currencyCode);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("wallets", ctx.walletService.wallets);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _components_shared_dropdown_wallet_dropdownWallet_component__WEBPACK_IMPORTED_MODULE_4__.DropdownWalletComponent, _components_shared_income_slider_income_slider_component__WEBPACK_IMPORTED_MODULE_5__.IncomeSliderComponent],
    styles: [".mainChild[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n\tbox-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n\tborder-radius: 20px;\n\tpadding: 20px;\n}\n\n.default-button[_ngcontent-%COMP%]{\n\tmargin: 40px 0;\n}\n\n.composed-select[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n    margin-bottom: 10px;\n}\n\n.default-input[_ngcontent-%COMP%]{\n\tmargin: 20px 0;\n}\n\n\n\n.component-header[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\talign-items: center;\n\tflex-wrap: wrap;\n\tmargin-bottom: 20px;\n}\n\n\n\n.component-header[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:last-child{\n\tmargin-left: auto;\n}\n\n.is-income-slider[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content:left;\n\talign-items: center;\n\tfont-size: 1rem;\n}\n\n.is-income-slider[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]{\n\tpadding: 0 5px;\n}\n\n.slider-input-container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\talign-items: center;\n}\n\n\n.toggle-input[_ngcontent-%COMP%] {\n    cursor: pointer;\n    position: relative;\n    width: 50px;\n    height: 30px;\n    border-radius: 25px;\n    outline: none;\n    background-color: var(--income-color-dark-theme);\n    -webkit-appearance: none;\n    transition: background .3s;\n}\n.toggle-input[_ngcontent-%COMP%]::after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 30%;\n    transform: translate(-50%, -50%);\n    border-radius: 50%;\n    height: 1.25rem;\n    width: 1.25rem;\n    background-color: var(--bg-color-dark-theme);\n    transition: left .3s;\n}\n\n.toggle-input[_ngcontent-%COMP%]:checked {\n    background-color: var(--expense-color-dark-theme);\n}\n\n.toggle-input[_ngcontent-%COMP%]:checked::after {\n    left: 70%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24tY3JlYXRlL3RyYW5zYWN0aW9uLWNyZWF0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0MsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixPQUFPO0NBQ1AsNENBQTRDO0NBQzVDLG1CQUFtQjtDQUNuQixhQUFhO0FBQ2Q7O0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLG1CQUFtQjtBQUN2Qjs7QUFFQTtDQUNDLGNBQWM7QUFDZjs7QUFFQSw2QkFBNkI7QUFDN0I7Q0FDQyxhQUFhO0NBQ2IsbUJBQW1CO0NBQ25CLDhCQUE4QjtDQUM5QixtQkFBbUI7Q0FDbkIsZUFBZTtDQUNmLG1CQUFtQjtBQUNwQjs7OztBQUlBO0NBQ0MsaUJBQWlCO0FBQ2xCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixvQkFBb0I7Q0FDcEIsbUJBQW1CO0NBQ25CLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsbUJBQW1CO0FBQ3BCOzs7QUFHQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLGdEQUFnRDtJQUNoRCx3QkFBd0I7SUFDeEIsMEJBQTBCO0FBQzlCO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsY0FBYztJQUNkLDRDQUE0QztJQUM1QyxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxpREFBaUQ7QUFDckQ7O0FBRUE7SUFDSSxTQUFTO0FBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbkNoaWxke1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRmbGV4OiAxO1xyXG5cdGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4zNSkgMHB4IDVweCAxNXB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcblx0cGFkZGluZzogMjBweDtcclxufVxyXG5cclxuLmRlZmF1bHQtYnV0dG9ue1xyXG5cdG1hcmdpbjogNDBweCAwO1xyXG59XHJcblxyXG4uY29tcG9zZWQtc2VsZWN0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmRlZmF1bHQtaW5wdXR7XHJcblx0bWFyZ2luOiAyMHB4IDA7XHJcbn1cclxuXHJcbi8qIHNlbGVjdCBpbmNvbWUgb3IgZXhwZW5zZSAqL1xyXG4uY29tcG9uZW50LWhlYWRlcntcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcblxyXG5cclxuLmNvbXBvbmVudC1oZWFkZXIgPiAqOmxhc3QtY2hpbGR7XHJcblx0bWFyZ2luLWxlZnQ6IGF1dG87XHJcbn1cclxuXHJcbi5pcy1pbmNvbWUtc2xpZGVye1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHRqdXN0aWZ5LWNvbnRlbnQ6bGVmdDtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdGZvbnQtc2l6ZTogMXJlbTtcclxufVxyXG5cclxuLmlzLWluY29tZS1zbGlkZXIgPiAqe1xyXG5cdHBhZGRpbmc6IDAgNXB4O1xyXG59XHJcblxyXG4uc2xpZGVyLWlucHV0LWNvbnRhaW5lcntcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcblxyXG4udG9nZ2xlLWlucHV0IHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmNvbWUtY29sb3ItZGFyay10aGVtZSk7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcztcclxufVxyXG4udG9nZ2xlLWlucHV0OjphZnRlciB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogMzAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBoZWlnaHQ6IDEuMjVyZW07XHJcbiAgICB3aWR0aDogMS4yNXJlbTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNvbG9yLWRhcmstdGhlbWUpO1xyXG4gICAgdHJhbnNpdGlvbjogbGVmdCAuM3M7XHJcbn1cclxuXHJcbi50b2dnbGUtaW5wdXQ6Y2hlY2tlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1leHBlbnNlLWNvbG9yLWRhcmstdGhlbWUpO1xyXG59XHJcblxyXG4udG9nZ2xlLWlucHV0OmNoZWNrZWQ6OmFmdGVyIHtcclxuICAgIGxlZnQ6IDcwJTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 4977:
/*!**********************************************************************************!*\
  !*** ./src/app/views/transaction/transaction-edit/transaction-edit.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionEditComponent: () => (/* binding */ TransactionEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class TransactionEditComponent {
  static #_ = this.ɵfac = function TransactionEditComponent_Factory(t) {
    return new (t || TransactionEditComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: TransactionEditComponent,
    selectors: [["app-transaction-edit"]],
    decls: 2,
    vars: 0,
    template: function TransactionEditComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "transaction-edit works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9578:
/*!**********************************************************************************!*\
  !*** ./src/app/views/transaction/transaction-list/transaction-list.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionListComponent: () => (/* binding */ TransactionListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services/transaction/transaction.service */ 4173);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);




function TransactionListComponent_div_1_h6_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h6", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Loading Transactions");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function TransactionListComponent_div_1_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please wait some time.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function TransactionListComponent_div_1_h6_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h6", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "No Transactions found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function TransactionListComponent_div_1_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Let's add one ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span")(3, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "here");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, ". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function TransactionListComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "h1", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TransactionListComponent_div_1_h6_4_Template, 2, 0, "h6", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, TransactionListComponent_div_1_p_5_Template, 2, 0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, TransactionListComponent_div_1_h6_6_Template, 2, 0, "h6", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, TransactionListComponent_div_1_p_7_Template, 6, 0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "br")(9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.loading);
  }
}
function TransactionListComponent_div_3_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](category_r8.name);
  }
}
const _c0 = function (a1) {
  return ["/transaction", a1];
};
const _c1 = function (a0, a1) {
  return {
    "income-amount": a0,
    "expense-amount": a1
  };
};
function TransactionListComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TransactionListComponent_div_3_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const transaction_r6 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r9.transactionService.selectTransaction(transaction_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 9)(2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 9)(9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, TransactionListComponent_div_3_div_12_Template, 3, 1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const transaction_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](11, _c0, transaction_r6.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](transaction_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](6, 8, transaction_r6.date, "dd/MM/yyyy HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](13, _c1, transaction_r6.isIncome, !transaction_r6.isIncome));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"](" ", transaction_r6.isIncome ? "+" : "-", " ", transaction_r6.amount, " ", transaction_r6.currencyCode, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", transaction_r6.categories);
  }
}
class TransactionListComponent {
  ngOnInit() {
    if (this.transactions.length > 0) {
      this.loading = false;
    }
  }
  constructor(transactionService) {
    this.transactionService = transactionService;
    this.transactions = [];
    this.loading = true;
    if (this.transactions.length == 0) {
      transactionService.getTransactionsFromServer(true).subscribe(transactions => {
        this.loading = false;
        this.transactions = transactions;
        this.transactions.sort((a, b) => a.date > b.date ? -1 : 1);
      });
    }
  }
  static #_ = this.ɵfac = function TransactionListComponent_Factory(t) {
    return new (t || TransactionListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_0__.TransactionService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: TransactionListComponent,
    selectors: [["app-transaction-list"]],
    hostAttrs: [1, "childRouteFlex"],
    inputs: {
      transactions: "transactions"
    },
    decls: 4,
    vars: 2,
    consts: [[1, "default-list-container"], ["class", "empty-list-container", 4, "ngIf"], [1, "default-list"], ["class", "default-editable-list-item", 3, "routerLink", "click", 4, "ngFor", "ngForOf"], [1, "empty-list-container"], [1, "text-center"], ["class", "text-center", 4, "ngIf"], ["routerLink", "/transaction/create", 1, "embeded-link"], [1, "default-editable-list-item", 3, "routerLink", "click"], [1, "d-flex", "flex-column", "flex-grow-1"], [1, "date-label"], [1, "text-end", "amount-value", 3, "ngClass"], [1, "d-flex", "justify-content-end", "flex-wrap"], [4, "ngFor", "ngForOf"], [1, "default-badge", "m-1"]],
    template: function TransactionListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TransactionListComponent_div_1_Template, 10, 4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, TransactionListComponent_div_3_Template, 13, 16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.transactions.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.transactions);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe],
    styles: ["[_nghost-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow: auto;\n}\n\n.default-list-container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n.default-editable-list-item[_ngcontent-%COMP%]{\n\tcursor: pointer;\n}\n\n.empty-list-container[_ngcontent-%COMP%]{\n\tpadding: 40px;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tflex: 1;\n}\n\n.date-label[_ngcontent-%COMP%]{\n\tfont-weight: lighter;\n\topacity: 0.7;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24tbGlzdC90cmFuc2FjdGlvbi1saXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULGNBQWM7QUFDbEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87QUFDUjs7QUFFQTtDQUNDLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixtQkFBbUI7Q0FDbkIsdUJBQXVCO0NBQ3ZCLE9BQU87QUFDUjs7QUFFQTtDQUNDLG9CQUFvQjtDQUNwQixZQUFZO0FBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuLmRlZmF1bHQtbGlzdC1jb250YWluZXJ7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuXHJcbi5kZWZhdWx0LWVkaXRhYmxlLWxpc3QtaXRlbXtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5lbXB0eS1saXN0LWNvbnRhaW5lcntcclxuXHRwYWRkaW5nOiA0MHB4O1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuXHJcbi5kYXRlLWxhYmVse1xyXG5cdGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xyXG5cdG9wYWNpdHk6IDAuNztcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 3030:
/*!************************************************************************************!*\
  !*** ./src/app/views/transaction/transaction-start/transaction-start.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionStartComponent: () => (/* binding */ TransactionStartComponent)
/* harmony export */ });
/* harmony import */ var src_app_helpers_graphic_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_helpers/graphic-functions */ 6332);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/transaction/transaction.service */ 4173);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transaction-list/transaction-list.component */ 9578);






function TransactionStartComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Create Transaction");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TransactionStartComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "X");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return ["/transaction/create"];
};
class TransactionStartComponent {
  constructor(elRef, transactionService) {
    this.elRef = elRef;
    this.transactionService = transactionService;
    this.showButtonChoseIsIncome = false;
    this.firstLoad = true;
  }
  ngOnInit() {
    this.buttonCreate = this.elRef.nativeElement.querySelector('#buttonCreate');
    this.buttonCreateBefore = window.getComputedStyle(this.buttonCreate, ':before');
    this.buttonCreate.addEventListener('mousemove', e => {
      const rect = this.buttonCreate.getBoundingClientRect(),
        mouseX = e.clientX - rect.left,
        mouseY = e.clientY - rect.top;
      // set width and height of the before element
      // based on the mouse position, the more the posizion is close to the center the more the element is small
      const width = Math.abs(rect.width / 2 - mouseX) / 2 + 25;
      // height change only of an amount of 20 %, the rest is based on the width
      const height = Math.abs(rect.height / 2 - mouseY) + width * 0.2;
      this.buttonCreate.style.setProperty('--width', width + 'px');
      this.buttonCreate.style.setProperty('--height', height + 'px');
      let x = mouseX - width / 2;
      let y = mouseY - height / 2;
      this.buttonCreate.style.setProperty('--mouse-x', x + 'px');
      this.buttonCreate.style.setProperty('--mouse-y', y + 'px');
      console.log(rect.width, mouseX - rect.left);
      let progress = mouseX * 100 / rect.width;
      this.buttonCreate.style.setProperty('--background-color', src_app_helpers_graphic_functions__WEBPACK_IMPORTED_MODULE_0__.GraphicFunctions.blendColors('#00bfa5', '#ff1744', progress));
    });
  }
  createTransaction() {
    this.showButtonChoseIsIncome = !this.showButtonChoseIsIncome;
    this.firstLoad = false;
  }
  setTransactionType(type) {
    this.transactionService.newTransaction.isIncome = type;
    console.log(this.transactionService.newTransaction);
  }
  static #_ = this.ɵfac = function TransactionStartComponent_Factory(t) {
    return new (t || TransactionStartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_1__.TransactionService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: TransactionStartComponent,
    selectors: [["app-transaction-start"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 15,
    vars: 8,
    consts: [[1, "mainChild"], [1, "list-container"], ["id", "buttonCreate", 1, "default-button", "bottom-button", "invert-button", 3, "ngClass"], [1, "button-create", 3, "ngClass", "click"], [1, "button-create-text", "secondary"], [4, "ngIf"], [1, "income-expense-container"], [1, "sub-button", 3, "routerLink", "click"], [1, "income-amount"], [1, "expense-amount"]],
    template: function TransactionStartComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-transaction-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2)(4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TransactionStartComponent_Template_div_click_4_listener() {
          return ctx.createTransaction();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, TransactionStartComponent_span_6_Template, 2, 0, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, TransactionStartComponent_span_7_Template, 2, 0, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 6)(9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TransactionStartComponent_Template_div_click_9_listener() {
          return ctx.setTransactionType(true);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Income");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TransactionStartComponent_Template_div_click_12_listener() {
          return ctx.setTransactionType(false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Expense");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("ngClass", ctx.showButtonChoseIsIncome ? "active" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("ngClass", ctx.showButtonChoseIsIncome ? "active" : !ctx.firstLoad ? "off" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.showButtonChoseIsIncome);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.showButtonChoseIsIncome);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](6, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](7, _c0));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_2__.TransactionListComponent],
    styles: [".bottom-button[_ngcontent-%COMP%] {\n    margin: 40px 0;\n    position: relative;\n}\n\n.mainChild[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n    border-radius: 20px;\n    padding: 20px;\n}\n\n.list-container[_ngcontent-%COMP%] {\n    position: relative;\n    flex: 1;\n}\n\n.invert-button[_ngcontent-%COMP%] {\n    border: 1px solid var(--primary-color-dark-theme);\n    background-color: var(--bg-color-dark-theme);\n    color: var(--primary-color-dark-theme);\n}\n\n.button-create[_ngcontent-%COMP%] {\n    position: absolute;\n    height: 100%;\n    border-radius: 20px;\n    opacity: 1;\n    width: 100%;\n    min-width: 100%;\n    max-width: 100vw;\n\n    border: 1px solid var(--primary-color-dark-theme);\n    background-color: var(--primary-color-dark-theme);\n    color: var(--bg-color-dark-theme);\n\n    z-index: 5;\n\n    text-wrap: nowrap;\n\n    transition-timing-function: ease-in-out;\n    transition: min-width 0.5s, max-width 0.5s, border-radius 0.5s;\n}\n\n.button-create.off[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_button-create-animation 0.5s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_button-create-animation {\n    0% {\n        aspect-ratio: 1/1;\n        border-radius: 100%;\n    }\n    5% {\n        border-radius: 20px;\n    }\n    100% {\n        aspect-ratio: 1/1;\n        border-radius: 20px;\n    }\n}\n\n.button-create.active[_ngcontent-%COMP%] {\n    aspect-ratio: 1/1;\n    width: auto !important;\n    min-width: 0px;\n    max-width: 50px;\n    border-radius: 100%;\n\n    animation: _ngcontent-%COMP%_button-remove-animation 0.5s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_button-remove-animation {\n    0% {\n        aspect-ratio: 1/1;\n        border-radius: 20px;\n    }\n    50% {\n        border-radius: 20px;\n    }\n    100% {\n        aspect-ratio: 1/1;\n        border-radius: 100%;\n    }\n}\n\n.button-create-text[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    font-size: 1.5rem;\n}\n\n.income-expense-container[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 1.5rem;\n    width: 100%;\n\n    z-index: 1;\n}\n\n.no-hover[_ngcontent-%COMP%] {\n    pointer-events: none;\n}\n\n.bottom-button.active[_ngcontent-%COMP%]:hover {\n    box-shadow: none;\n}\n\n.sub-button[_ngcontent-%COMP%] {\n    --gradient-degree: 0deg;\n    padding: 2px 10px;\n\n\n    border-radius: 20px;\n\tposition: relative;\n}\n\n.sub-button[_ngcontent-%COMP%]::before{\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: calc(100% + 4px);\n\theight: calc(100% + 4px);\n\tbackground-color: rgba(var(--bg-color-dark-theme-rgb), 1);\n\n\n\n\tfilter: blur(15px);\n\n\tborder-radius: 20px;\n\tz-index: -1;\n}\n\n.bottom-button[_ngcontent-%COMP%]{\n\toverflow: hidden;\n}\n\n.bottom-button[_ngcontent-%COMP%]::before{\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: var(--mouse-y);\n\tleft: var(--mouse-x);\n\theight: var(--height);\n\twidth: var(--width);\n\t\n\n\taspect-ratio: 1/1;\n\n\tfilter: blur(20px);\n\tbackground-color: var(--background-color);\n\n\tborder-radius: 20px;\n\topacity: 0;\n\ttransition: opacity 0.5s ease-in-out;\n\n}\n\n.bottom-button[_ngcontent-%COMP%]:hover::before{\n\topacity: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24tc3RhcnQvdHJhbnNhY3Rpb24tc3RhcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCw0Q0FBNEM7SUFDNUMsbUJBQW1CO0lBQ25CLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsT0FBTztBQUNYOztBQUVBO0lBQ0ksaURBQWlEO0lBQ2pELDRDQUE0QztJQUM1QyxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsV0FBVztJQUNYLGVBQWU7SUFDZixnQkFBZ0I7O0lBRWhCLGlEQUFpRDtJQUNqRCxpREFBaUQ7SUFDakQsaUNBQWlDOztJQUVqQyxVQUFVOztJQUVWLGlCQUFpQjs7SUFFakIsdUNBQXVDO0lBQ3ZDLDhEQUE4RDtBQUNsRTs7QUFFQTtJQUNJLG1EQUFtRDtBQUN2RDs7QUFFQTtJQUNJO1FBQ0ksaUJBQWlCO1FBQ2pCLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksbUJBQW1CO0lBQ3ZCO0lBQ0E7UUFDSSxpQkFBaUI7UUFDakIsbUJBQW1CO0lBQ3ZCO0FBQ0o7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsbUJBQW1COztJQUVuQixtREFBbUQ7QUFDdkQ7O0FBRUE7SUFDSTtRQUNJLGlCQUFpQjtRQUNqQixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksaUJBQWlCO1FBQ2pCLG1CQUFtQjtJQUN2QjtBQUNKOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsZ0NBQWdDO0lBQ2hDLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixXQUFXOztJQUVYLFVBQVU7QUFDZDs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixpQkFBaUI7OztJQUdqQixtQkFBbUI7Q0FDdEIsa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsV0FBVztDQUNYLGtCQUFrQjtDQUNsQixNQUFNO0NBQ04sT0FBTztDQUNQLHVCQUF1QjtDQUN2Qix3QkFBd0I7Q0FDeEIseURBQXlEOzs7O0NBSXpELGtCQUFrQjs7Q0FFbEIsbUJBQW1CO0NBQ25CLFdBQVc7QUFDWjs7QUFFQTtDQUNDLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLFdBQVc7Q0FDWCxrQkFBa0I7Q0FDbEIsbUJBQW1CO0NBQ25CLG9CQUFvQjtDQUNwQixxQkFBcUI7Q0FDckIsbUJBQW1CO0NBQ25CLFdBQVc7Q0FDWCxpQkFBaUI7O0NBRWpCLGtCQUFrQjtDQUNsQix5Q0FBeUM7O0NBRXpDLG1CQUFtQjtDQUNuQixVQUFVO0NBQ1Ysb0NBQW9DOztBQUVyQzs7QUFFQTtDQUNDLFVBQVU7QUFDWCIsInNvdXJjZXNDb250ZW50IjpbIi5ib3R0b20tYnV0dG9uIHtcclxuICAgIG1hcmdpbjogNDBweCAwO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4ubWFpbkNoaWxkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZmxleDogMTtcclxuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4zNSkgMHB4IDVweCAxNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBmbGV4OiAxO1xyXG59XHJcblxyXG4uaW52ZXJ0LWJ1dHRvbiB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLWRhcmstdGhlbWUpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3ItZGFyay10aGVtZSk7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxufVxyXG5cclxuLmJ1dHRvbi1jcmVhdGUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1pbi13aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMTAwdnc7XHJcblxyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSk7XHJcbiAgICBjb2xvcjogdmFyKC0tYmctY29sb3ItZGFyay10aGVtZSk7XHJcblxyXG4gICAgei1pbmRleDogNTtcclxuXHJcbiAgICB0ZXh0LXdyYXA6IG5vd3JhcDtcclxuXHJcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XHJcbiAgICB0cmFuc2l0aW9uOiBtaW4td2lkdGggMC41cywgbWF4LXdpZHRoIDAuNXMsIGJvcmRlci1yYWRpdXMgMC41cztcclxufVxyXG5cclxuLmJ1dHRvbi1jcmVhdGUub2ZmIHtcclxuICAgIGFuaW1hdGlvbjogYnV0dG9uLWNyZWF0ZS1hbmltYXRpb24gMC41cyBlYXNlLWluLW91dDtcclxufVxyXG5cclxuQGtleWZyYW1lcyBidXR0b24tY3JlYXRlLWFuaW1hdGlvbiB7XHJcbiAgICAwJSB7XHJcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAxLzE7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgIH1cclxuICAgIDUlIHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAxLzE7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIH1cclxufVxyXG5cclxuLmJ1dHRvbi1jcmVhdGUuYWN0aXZlIHtcclxuICAgIGFzcGVjdC1yYXRpbzogMS8xO1xyXG4gICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcclxuICAgIG1pbi13aWR0aDogMHB4O1xyXG4gICAgbWF4LXdpZHRoOiA1MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuXHJcbiAgICBhbmltYXRpb246IGJ1dHRvbi1yZW1vdmUtYW5pbWF0aW9uIDAuNXMgZWFzZS1pbi1vdXQ7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgYnV0dG9uLXJlbW92ZS1hbmltYXRpb24ge1xyXG4gICAgMCUge1xyXG4gICAgICAgIGFzcGVjdC1yYXRpbzogMS8xO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICB9XHJcbiAgICA1MCUge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgICBhc3BlY3QtcmF0aW86IDEvMTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgfVxyXG59XHJcblxyXG4uYnV0dG9uLWNyZWF0ZS10ZXh0IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxufVxyXG5cclxuLmluY29tZS1leHBlbnNlLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgei1pbmRleDogMTtcclxufVxyXG5cclxuLm5vLWhvdmVyIHtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcblxyXG4uYm90dG9tLWJ1dHRvbi5hY3RpdmU6aG92ZXIge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxufVxyXG5cclxuLnN1Yi1idXR0b24ge1xyXG4gICAgLS1ncmFkaWVudC1kZWdyZWU6IDBkZWc7XHJcbiAgICBwYWRkaW5nOiAycHggMTBweDtcclxuXHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5zdWItYnV0dG9uOjpiZWZvcmV7XHJcblx0Y29udGVudDogXCJcIjtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0dG9wOiAwO1xyXG5cdGxlZnQ6IDA7XHJcblx0d2lkdGg6IGNhbGMoMTAwJSArIDRweCk7XHJcblx0aGVpZ2h0OiBjYWxjKDEwMCUgKyA0cHgpO1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tYmctY29sb3ItZGFyay10aGVtZS1yZ2IpLCAxKTtcclxuXHJcblxyXG5cclxuXHRmaWx0ZXI6IGJsdXIoMTVweCk7XHJcblxyXG5cdGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcblx0ei1pbmRleDogLTE7XHJcbn1cclxuXHJcbi5ib3R0b20tYnV0dG9ue1xyXG5cdG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5ib3R0b20tYnV0dG9uOjpiZWZvcmV7XHJcblx0Y29udGVudDogXCJcIjtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0dG9wOiB2YXIoLS1tb3VzZS15KTtcclxuXHRsZWZ0OiB2YXIoLS1tb3VzZS14KTtcclxuXHRoZWlnaHQ6IHZhcigtLWhlaWdodCk7XHJcblx0d2lkdGg6IHZhcigtLXdpZHRoKTtcclxuXHQvKiBjaXJjbGUgKi9cclxuXHRhc3BlY3QtcmF0aW86IDEvMTtcclxuXHJcblx0ZmlsdGVyOiBibHVyKDIwcHgpO1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xyXG5cclxuXHRib3JkZXItcmFkaXVzOiAyMHB4O1xyXG5cdG9wYWNpdHk6IDA7XHJcblx0dHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2UtaW4tb3V0O1xyXG5cclxufVxyXG5cclxuLmJvdHRvbS1idXR0b246aG92ZXI6OmJlZm9yZXtcclxuXHRvcGFjaXR5OiAxO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 364:
/*!**********************************************************************************!*\
  !*** ./src/app/views/transaction/transaction-view/transaction-view.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionViewComponent: () => (/* binding */ TransactionViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _components_shared_dropdown_wallet_dropdownWallet_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/shared/dropdown-wallet/dropdownWallet.component */ 5131);
/* harmony import */ var _components_shared_income_slider_income_slider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/shared/income-slider/income-slider.component */ 4580);
/* harmony import */ var _components_shared_datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/shared/datepicker/datepicker.component */ 1541);








function TransactionViewComponent_div_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionViewComponent_div_10_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.cancelNewCategory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0) {
  return {
    active: a0
  };
};
function TransactionViewComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20)(1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TransactionViewComponent_div_10_span_3_Template, 2, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionViewComponent_div_10_Template_span_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.createNewCategory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](3, _c0, ctx_r0.isCreatingCategory));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](5, _c0, ctx_r0.isCreatingCategory));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.isCreatingCategory);
  }
}
function TransactionViewComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 27)(1, "div", 21)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](category_r8.name);
  }
}
function TransactionViewComponent_span_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Edit Transaction");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c1 = function () {
  return ["/transaction"];
};
class TransactionViewComponent {
  constructor(location, transactionService, walletService, route) {
    this.location = location;
    this.transactionService = transactionService;
    this.walletService = walletService;
    this.route = route;
    this.isCreatingCategory = false;
    this.isReadOnly = true;
    if (walletService.wallets.length == 0) walletService.getWalletsFromServer().subscribe();
  }
  ngOnInit() {
    this.selectedTransactionId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    if (this.transactionService.transactions.length == 0) {
      this.transactionService.getTransactionsFromServer(true).subscribe(() => {
        this.transactionService.selectTransaction(this.selectedTransactionId);
        this.setWalletBySelectedTransaction();
      });
    } else {
      this.transactionService.selectTransaction(this.selectedTransactionId);
      this.setWalletBySelectedTransaction();
    }
  }
  setSelectedTransactionDate(event) {
    if (event.target.value != undefined && event.target.value != null && event.target.value != '') {
      console.log(this.transactionService.selectedTransaction.date);
      this.transactionService.selectedTransaction.date = new Date(event.target.value);
    }
  }
  selectWallet($event) {
    if ($event.id != undefined && $event.id != null) this.transactionService.selectedTransaction.idWallet = $event.id;
  }
  setTransactionType(type) {
    this.transactionService.selectedTransaction.isIncome = type;
  }
  setTransactionTypeByCheckbox($event) {
    this.setTransactionType(!$event.target.checked);
  }
  setWalletBySelectedTransaction() {
    this.selectedWallet = this.walletService.wallets.find(wallet => wallet.id == this.transactionService.selectedTransaction.idWallet);
  }
  changeDate($event) {
    this.transactionService.selectedTransaction.date = $event;
  }
  editTransaction() {
    this.isReadOnly = false;
    this.firstLoad = false;
  }
  confirmEditTransaction() {
    this.isReadOnly = true;
    this.transactionService.updateTransaction(this.transactionService.selectedTransaction).subscribe();
  }
  cancelEditTransaction() {
    this.isReadOnly = true;
    this.transactionService.getTransactionsFromServer(true).subscribe(() => {
      this.transactionService.selectTransaction(this.selectedTransactionId);
      this.setWalletBySelectedTransaction();
    });
  }
  createNewCategory() {
    if (this.isCreatingCategory) this.isCreatingCategory = false;else this.isCreatingCategory = true;
  }
  cancelNewCategory() {
    this.isCreatingCategory = false;
  }
  static #_ = this.ɵfac = function TransactionViewComponent_Factory(t) {
    return new (t || TransactionViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.TransactionService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.WalletService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: TransactionViewComponent,
    selectors: [["app-transaction-view"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 37,
    vars: 23,
    consts: [[1, "component-header"], [1, "bi", "bi-arrow-left-circle", "pointer", 2, "cursor", "pointer", 3, "routerLink"], [1, "d-flex", "align-items-end"], [3, "readonly", "isIncome", "setTransactionTypeEmitter"], [1, "mainChild"], [1, "category-container"], ["class", "default-badge create-badge", "role", "button", 3, "ngClass", 4, "ngIf"], ["class", "default-badge", 4, "ngFor", "ngForOf"], [1, "default-input", "composed-input", "primary", "d-flex"], ["for", "name", 1, "default-label"], ["type", "text", "id", "name", "placeholder", "Transaction Name", 1, "no-style-input", "inner-input", 3, "readonly", "ngModel", "ngModelChange"], [1, "m-datepicker", 3, "showLabel", "showOuterDiv", "isReadOnly", "dateValue", "dateChange"], [1, "dropdown-wallet", 3, "readonly", "selectedWallet", "wallets", "selectWalletEmitter"], ["id", "buttonCreate", 1, "default-button", "bottom-button", "invert-button", 3, "ngClass"], [1, "button-create", 3, "ngClass", "click"], [1, "button-create-text", "secondary"], [4, "ngIf"], [1, "cancel-confirm-container"], [1, "sub-button", 3, "click"], [1, "primary", "font-weight-bold"], ["role", "button", 1, "default-badge", "create-badge", 3, "ngClass"], [1, "sub-badge"], ["type", "text", "placeholder", "New Category", 1, "no-style-input", "inner-input", "create-category-input", 3, "ngClass"], ["class", "create-category-icon", 3, "click", 4, "ngIf"], [1, "create-category-icon", 3, "click"], [1, "bi", "bi-plus"], [1, "bi", "bi-x"], [1, "default-badge"]],
    template: function TransactionViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 2)(7, "app-income-slider", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("setTransactionTypeEmitter", function TransactionViewComponent_Template_app_income_slider_setTransactionTypeEmitter_7_listener($event) {
          return ctx.setTransactionType($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 4)(9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, TransactionViewComponent_div_10_Template, 6, 7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, TransactionViewComponent_div_11_Template, 4, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 8)(13, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function TransactionViewComponent_Template_input_ngModelChange_15_listener($event) {
          return ctx.transactionService.selectedTransaction.name = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 8)(17, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function TransactionViewComponent_Template_input_ngModelChange_19_listener($event) {
          return ctx.transactionService.selectedTransaction.amount = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "app-datepicker", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("dateChange", function TransactionViewComponent_Template_app_datepicker_dateChange_20_listener($event) {
          return ctx.changeDate($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 8)(22, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Currency Code");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function TransactionViewComponent_Template_input_ngModelChange_24_listener($event) {
          return ctx.transactionService.selectedTransaction.currencyCode = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "app-dropdown-wallet", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectWalletEmitter", function TransactionViewComponent_Template_app_dropdown_wallet_selectWalletEmitter_25_listener($event) {
          return ctx.selectWallet($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "div", 13)(27, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionViewComponent_Template_div_click_27_listener() {
          return ctx.editTransaction();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, TransactionViewComponent_span_29_Template, 2, 0, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "div", 17)(31, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionViewComponent_Template_div_click_31_listener() {
          return ctx.cancelEditTransaction();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TransactionViewComponent_Template_div_click_34_listener() {
          return ctx.confirmEditTransaction();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, "Confirm");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](22, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.transactionService.selectedTransaction.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("readonly", ctx.isReadOnly)("isIncome", ctx.transactionService.selectedTransaction.isIncome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isReadOnly);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.transactionService.selectedTransaction.categories);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("readonly", ctx.isReadOnly)("ngModel", ctx.transactionService.selectedTransaction.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("readonly", ctx.isReadOnly)("ngModel", ctx.transactionService.selectedTransaction.amount);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("showLabel", true)("showOuterDiv", true)("isReadOnly", ctx.isReadOnly)("dateValue", ctx.transactionService.selectedTransaction.date);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("readonly", ctx.isReadOnly)("ngModel", ctx.transactionService.selectedTransaction.currencyCode);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("readonly", ctx.isReadOnly)("selectedWallet", ctx.selectedWallet)("wallets", ctx.walletService.wallets);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("ngClass", !ctx.isReadOnly ? "active" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("ngClass", !ctx.isReadOnly ? "active" : !ctx.firstLoad ? "off" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isReadOnly);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _components_shared_dropdown_wallet_dropdownWallet_component__WEBPACK_IMPORTED_MODULE_1__.DropdownWalletComponent, _components_shared_income_slider_income_slider_component__WEBPACK_IMPORTED_MODULE_2__.IncomeSliderComponent, _components_shared_datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_3__.DatepickerComponent],
    styles: [".component-header[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n\tflex-wrap: wrap;\n\tmargin-bottom: 20px;\n}\n\n.bottom-button[_ngcontent-%COMP%] {\n\tmargin: 40px 0;\n\tposition: relative;\n}\n\n.category-container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content:flex-start;\n\tflex-wrap: wrap;\n}\n\n.default-input[_ngcontent-%COMP%]{\n\tmargin: 20px 0;\n}\n\n.m-datepicker[_ngcontent-%COMP%]{\n\tmargin: 20px 0;\n}\n\n.component-header[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:last-child{\n\tmargin-left: auto;\n}\n\n.mainChild[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n\tbox-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n\tborder-radius: 20px;\n\tpadding: 20px;\n}\n\n.dropdown-wallet[_ngcontent-%COMP%]{\n\tmargin: 20px 0;\n}\n\n\n\n\n.cancel-confirm-container[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    font-size: 1.5rem;\n    width: 100%;\n\n    z-index: 1;\n}\n.button-create[_ngcontent-%COMP%] {\n    position: absolute;\n    height: 100%;\n    border-radius: 20px;\n    opacity: 1;\n    width: 100%;\n    min-width: 100%;\n    max-width: 100vw;\n\n    border: 1px solid var(--primary-color-dark-theme);\n    background-color: var(--primary-color-dark-theme);\n    color: var(--bg-color-dark-theme);\n\n    z-index: 5;\n\n    text-wrap: nowrap;\n\n    transition-timing-function: ease-in-out;\n    transition: min-width 0.5s, max-width 0.5s, border-radius 0.5s;\n}\n\n.button-create.off[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_button-create-animation 0.5s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_button-create-animation {\n    0% {\n        border-radius: 0;\n    }\n    5% {\n        border-radius: 20px;\n    }\n    100% {\n        aspect-ratio: 1/1;\n        border-radius: 20px;\n    }\n}\n\n.button-create.active[_ngcontent-%COMP%] {\n    width: auto !important;\n    min-width: 0px;\n    max-width: 2px;\n    border-radius: 0px;\n\n    animation: _ngcontent-%COMP%_button-remove-animation 0.5s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_button-remove-animation {\n    0% {\n        border-radius: 20px;\n    }\n    50% {\n        border-radius: 20px;\n    }\n    100% {\n        border-radius: 0;\n    }\n}\n\n.button-create-text[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    font-size: 1.5rem;\n}\n\n.invert-button[_ngcontent-%COMP%] {\n    border: 1px solid var(--primary-color-dark-theme);\n    background-color: var(--bg-color-dark-theme);\n    color: var(--primary-color-dark-theme);\n}\n\n.sub-button[_ngcontent-%COMP%] {\n\tflex: 1;\n\tpadding: 10px;\n\ttext-align: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24tdmlldy90cmFuc2FjdGlvbi12aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDhCQUE4QjtDQUNqQyxlQUFlO0NBQ2YsbUJBQW1CO0FBQ3BCOztBQUVBO0NBQ0MsY0FBYztDQUNkLGtCQUFrQjtBQUNuQjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkIsMEJBQTBCO0NBQzFCLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxpQkFBaUI7QUFDbEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87Q0FDUCw0Q0FBNEM7Q0FDNUMsbUJBQW1CO0NBQ25CLGFBQWE7QUFDZDs7QUFFQTtDQUNDLGNBQWM7QUFDZjs7QUFFQSxrQkFBa0I7O0FBRWxCO0lBQ0ksYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLFdBQVc7O0lBRVgsVUFBVTtBQUNkO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsV0FBVztJQUNYLGVBQWU7SUFDZixnQkFBZ0I7O0lBRWhCLGlEQUFpRDtJQUNqRCxpREFBaUQ7SUFDakQsaUNBQWlDOztJQUVqQyxVQUFVOztJQUVWLGlCQUFpQjs7SUFFakIsdUNBQXVDO0lBQ3ZDLDhEQUE4RDtBQUNsRTs7QUFFQTtJQUNJLG1EQUFtRDtBQUN2RDs7QUFFQTtJQUNJO1FBQ0ksZ0JBQWdCO0lBQ3BCO0lBQ0E7UUFDSSxtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtRQUNqQixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsY0FBYztJQUNkLGtCQUFrQjs7SUFFbEIsbURBQW1EO0FBQ3ZEOztBQUVBO0lBQ0k7UUFDSSxtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksZ0JBQWdCO0lBQ3BCO0FBQ0o7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQ0FBZ0M7SUFDaEMsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksaURBQWlEO0lBQ2pELDRDQUE0QztJQUM1QyxzQ0FBc0M7QUFDMUM7O0FBRUE7Q0FDQyxPQUFPO0NBQ1AsYUFBYTtDQUNiLGtCQUFrQjtBQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi5jb21wb25lbnQtaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdGZsZXgtd3JhcDogd3JhcDtcclxuXHRtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uYm90dG9tLWJ1dHRvbiB7XHJcblx0bWFyZ2luOiA0MHB4IDA7XHJcblx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uY2F0ZWdvcnktY29udGFpbmVye1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHRqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDtcclxuXHRmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuXHJcbi5kZWZhdWx0LWlucHV0e1xyXG5cdG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4ubS1kYXRlcGlja2Vye1xyXG5cdG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4uY29tcG9uZW50LWhlYWRlciA+ICo6bGFzdC1jaGlsZHtcclxuXHRtYXJnaW4tbGVmdDogYXV0bztcclxufVxyXG5cclxuLm1haW5DaGlsZHtcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0ZmxleDogMTtcclxuXHRib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMzUpIDBweCA1cHggMTVweDtcclxuXHRib3JkZXItcmFkaXVzOiAyMHB4O1xyXG5cdHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuXHJcbi5kcm9wZG93bi13YWxsZXR7XHJcblx0bWFyZ2luOiAyMHB4IDA7XHJcbn1cclxuXHJcbi8qIGJvdHRvbSBidXR0b24gKi9cclxuXHJcbi5jYW5jZWwtY29uZmlybS1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgei1pbmRleDogMTtcclxufVxyXG4uYnV0dG9uLWNyZWF0ZSB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWluLXdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDB2dztcclxuXHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLWRhcmstdGhlbWUpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxuICAgIGNvbG9yOiB2YXIoLS1iZy1jb2xvci1kYXJrLXRoZW1lKTtcclxuXHJcbiAgICB6LWluZGV4OiA1O1xyXG5cclxuICAgIHRleHQtd3JhcDogbm93cmFwO1xyXG5cclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcclxuICAgIHRyYW5zaXRpb246IG1pbi13aWR0aCAwLjVzLCBtYXgtd2lkdGggMC41cywgYm9yZGVyLXJhZGl1cyAwLjVzO1xyXG59XHJcblxyXG4uYnV0dG9uLWNyZWF0ZS5vZmYge1xyXG4gICAgYW5pbWF0aW9uOiBidXR0b24tY3JlYXRlLWFuaW1hdGlvbiAwLjVzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGJ1dHRvbi1jcmVhdGUtYW5pbWF0aW9uIHtcclxuICAgIDAlIHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgfVxyXG4gICAgNSUge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgICBhc3BlY3QtcmF0aW86IDEvMTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG4uYnV0dG9uLWNyZWF0ZS5hY3RpdmUge1xyXG4gICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcclxuICAgIG1pbi13aWR0aDogMHB4O1xyXG4gICAgbWF4LXdpZHRoOiAycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XHJcblxyXG4gICAgYW5pbWF0aW9uOiBidXR0b24tcmVtb3ZlLWFuaW1hdGlvbiAwLjVzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGJ1dHRvbi1yZW1vdmUtYW5pbWF0aW9uIHtcclxuICAgIDAlIHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgNTAlIHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcclxuICAgIH1cclxufVxyXG5cclxuLmJ1dHRvbi1jcmVhdGUtdGV4dCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbn1cclxuXHJcbi5pbnZlcnQtYnV0dG9uIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1jb2xvci1kYXJrLXRoZW1lKTtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLWRhcmstdGhlbWUpO1xyXG59XHJcblxyXG4uc3ViLWJ1dHRvbiB7XHJcblx0ZmxleDogMTtcclxuXHRwYWRkaW5nOiAxMHB4O1xyXG5cdHRleHQtYWxpZ246IGNlbnRlcjtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 3479:
/*!************************************************************!*\
  !*** ./src/app/views/transaction/transaction.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionComponent: () => (/* binding */ TransactionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);


class TransactionComponent {
  static #_ = this.ɵfac = function TransactionComponent_Factory(t) {
    return new (t || TransactionComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: TransactionComponent,
    selectors: [["app-transaction"]],
    decls: 6,
    vars: 0,
    consts: [[1, "container"], [1, "col-md-12"], [1, "text-center"], [1, "col-md-12", "mainPage"]],
    template: function TransactionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "My Transactions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    styles: ["*[_ngcontent-%COMP%]{\n\tcolor: var(--primary-color-dark-theme);\n}\n\n[_nghost-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n.container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n.mainPage[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3MvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtDQUNDLHNDQUFzQztBQUN2Qzs7QUFFQTtDQUNDLGFBQWE7Q0FDYixzQkFBc0I7Q0FDdEIsT0FBTztBQUNSOztBQUVBO0NBQ0MsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixPQUFPO0FBQ1I7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87QUFDUiIsInNvdXJjZXNDb250ZW50IjpbIip7XHJcblx0Y29sb3I6IHZhcigtLXByaW1hcnktY29sb3ItZGFyay10aGVtZSk7XHJcbn1cclxuXHJcbjpob3N0e1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRmbGV4OiAxO1xyXG59XHJcblxyXG4uY29udGFpbmVye1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRmbGV4OiAxO1xyXG59XHJcblxyXG4ubWFpblBhZ2V7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5287:
/*!***************************************!*\
  !*** ./src/app/views/wallet/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletComponent: () => (/* reexport safe */ _wallet_component__WEBPACK_IMPORTED_MODULE_0__.WalletComponent),
/* harmony export */   WalletCreateComponent: () => (/* reexport safe */ _wallet_create_wallet_create_component__WEBPACK_IMPORTED_MODULE_1__.WalletCreateComponent),
/* harmony export */   WalletEditComponent: () => (/* reexport safe */ _wallet_edit_wallet_edit_component__WEBPACK_IMPORTED_MODULE_2__.WalletEditComponent),
/* harmony export */   WalletStartComponent: () => (/* reexport safe */ _wallet_start_wallet_start_component__WEBPACK_IMPORTED_MODULE_3__.WalletStartComponent),
/* harmony export */   WalletViewComponent: () => (/* reexport safe */ _wallet_view_wallet_view_component__WEBPACK_IMPORTED_MODULE_4__.WalletViewComponent)
/* harmony export */ });
/* harmony import */ var _wallet_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallet.component */ 9336);
/* harmony import */ var _wallet_create_wallet_create_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wallet-create/wallet-create.component */ 5079);
/* harmony import */ var _wallet_edit_wallet_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wallet-edit/wallet-edit.component */ 736);
/* harmony import */ var _wallet_start_wallet_start_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wallet-start/wallet-start.component */ 431);
/* harmony import */ var _wallet_view_wallet_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wallet-view/wallet-view.component */ 853);






/***/ }),

/***/ 5079:
/*!***********************************************************************!*\
  !*** ./src/app/views/wallet/wallet-create/wallet-create.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletCreateComponent: () => (/* binding */ WalletCreateComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _helpers_go_page_back_go_page_back_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_helpers/go-page-back/go-page-back.directive */ 3005);





class WalletCreateComponent {
  constructor(walletService, router) {
    this.walletService = walletService;
    this.router = router;
  }
  addWallet() {
    this.walletService.addWallet().subscribe(wallet => {
      console.log(wallet);
      this.router.navigate(['/wallet']);
    });
  }
  static #_ = this.ɵfac = function WalletCreateComponent_Factory(t) {
    return new (t || WalletCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.WalletService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: WalletCreateComponent,
    selectors: [["app-wallet-create"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 15,
    vars: 2,
    consts: [[1, "component-header"], ["appGoPageBack", "", 1, "bi", "bi-arrow-left-circle", "pointer", 2, "cursor", "pointer"], [1, "childMainPage"], ["type", "text", "placeholder", "Wallet Name", 1, "default-input", "primary", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Wallet Currency Code", 1, "default-input", "primary", 3, "ngModel", "ngModelChange"], [1, "bottom-button"], [1, "default-button", 3, "click"]],
    template: function WalletCreateComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "New Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 2)(8, "div")(9, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function WalletCreateComponent_Template_input_ngModelChange_9_listener($event) {
          return ctx.walletService.newWallet.name = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div")(11, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function WalletCreateComponent_Template_input_ngModelChange_11_listener($event) {
          return ctx.walletService.newWallet.currencyCode = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 5)(13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function WalletCreateComponent_Template_button_click_13_listener() {
          return ctx.addWallet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Create Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.walletService.newWallet.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.walletService.newWallet.currencyCode);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _helpers_go_page_back_go_page_back_directive__WEBPACK_IMPORTED_MODULE_1__.GoPageBackDirective],
    styles: [".default-input[_ngcontent-%COMP%]{\n\tmargin: 20px 0;\n}\n\n.bottom-button[_ngcontent-%COMP%] {\n\tmargin: 40px 0;\n}\n\n.component-header[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n}\n\n.childMainPage[_ngcontent-%COMP%]{\n\tflex: 1;\n\tbox-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n\tborder-radius: 20px;\n\tpadding: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvd2FsbGV0L3dhbGxldC1jcmVhdGUvd2FsbGV0LWNyZWF0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0MsY0FBYztBQUNmOztBQUVBO0NBQ0MsY0FBYztBQUNmOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQiw4QkFBOEI7QUFDL0I7O0FBRUE7Q0FDQyxPQUFPO0NBQ1AsNENBQTRDO0NBQzVDLG1CQUFtQjtDQUNuQixhQUFhO0FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyIuZGVmYXVsdC1pbnB1dHtcclxuXHRtYXJnaW46IDIwcHggMDtcclxufVxyXG5cclxuLmJvdHRvbS1idXR0b24ge1xyXG5cdG1hcmdpbjogNDBweCAwO1xyXG59XHJcblxyXG4uY29tcG9uZW50LWhlYWRlcntcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uY2hpbGRNYWluUGFnZXtcclxuXHRmbGV4OiAxO1xyXG5cdGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4zNSkgMHB4IDVweCAxNXB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcblx0cGFkZGluZzogMjBweDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 736:
/*!*******************************************************************!*\
  !*** ./src/app/views/wallet/wallet-edit/wallet-edit.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletEditComponent: () => (/* binding */ WalletEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);




const _c0 = function (a1) {
  return ["/wallet", a1];
};
class WalletEditComponent {
  constructor(walletService, route, router) {
    this.walletService = walletService;
    this.route = route;
    this.router = router;
    this.currentWalletId = null;
  }
  ngOnInit() {
    // Access the id parameter from the route snapshot
    this.currentWalletId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    if (this.walletService.wallets.length == 0) {
      this.walletService.getWalletsFromServer().subscribe(() => {
        this.walletService.selectWallet(this.currentWalletId ?? 0);
      });
    }
  }
  editWallet() {
    this.walletService.editWallet().subscribe(wallet => {
      console.log(wallet);
      this.router.navigate(['/wallet', this.currentWalletId]);
    });
  }
  static #_ = this.ɵfac = function WalletEditComponent_Factory(t) {
    return new (t || WalletEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.WalletService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: WalletEditComponent,
    selectors: [["app-wallet-edit"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 22,
    vars: 8,
    consts: [[1, "component-header"], [1, "bi", "bi-arrow-left-circle", "pointer", 2, "cursor", "pointer", 3, "routerLink"], [1, "header-amount"], [1, "header-amount-value"], [1, "mainChild"], [1, "default-input", "composed-input", "primary"], ["for", "name", 1, "default-label"], ["type", "text", "id", "name", "placeholder", "Wallet Name", 1, "no-style-input", "inner-input", 3, "ngModel", "ngModelChange"], ["for", "currencyCode", 1, "default-label"], ["type", "text", "id", "currencyCode", "placeholder", "Wallet Currency Code", 1, "no-style-input", "inner-input", 3, "ngModel", "ngModelChange"], [1, "bottom-button"], [1, "default-button", 3, "click"]],
    template: function WalletEditComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Balance: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 4)(11, "div", 5)(12, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Wallet Name ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function WalletEditComponent_Template_input_ngModelChange_14_listener($event) {
          return ctx.walletService.selectedWallet.name = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 5)(16, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Currency Code ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function WalletEditComponent_Template_input_ngModelChange_18_listener($event) {
          return ctx.walletService.selectedWallet.currencyCode = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 10)(20, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WalletEditComponent_Template_button_click_20_listener() {
          return ctx.editWallet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, " Confirm Edit Wallet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c0, ctx.walletService.selectedWallet.id));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.walletService.selectedWallet.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx.walletService.selectedWallet.amount, " ", ctx.walletService.selectedWallet.currencyCode, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.walletService.selectedWallet.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.walletService.selectedWallet.currencyCode);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel],
    styles: [".default-input[_ngcontent-%COMP%] {\n    margin: 20px 0;\n}\n\n.composed-input[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap:wrap;\n}\n\n.bottom-button[_ngcontent-%COMP%] {\n\tmargin: 40px 0;\n}\n\n.component-header[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n\tflex-wrap: wrap;\n\tmargin-bottom: 20px;\n}\n\n.header-amount[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n\tmargin-left: auto;\n}\n\n.header-amount-value[_ngcontent-%COMP%] {\n    color: var(--income-color-dark-theme);\n}\n\n\n\n.list-container[_ngcontent-%COMP%] {\n    position: relative;\n    flex: 1;\n}\n\n.mainChild[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n\tbox-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n\tborder-radius: 20px;\n\tpadding: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvd2FsbGV0L3dhbGxldC1lZGl0L3dhbGxldC1lZGl0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDhCQUE4QjtDQUNqQyxlQUFlO0NBQ2YsbUJBQW1CO0FBQ3BCOztBQUVBO0lBQ0ksaUJBQWlCO0NBQ3BCLGlCQUFpQjtBQUNsQjs7QUFFQTtJQUNJLHFDQUFxQztBQUN6Qzs7OztBQUlBO0lBQ0ksa0JBQWtCO0lBQ2xCLE9BQU87QUFDWDs7QUFFQTtDQUNDLGFBQWE7Q0FDYixzQkFBc0I7Q0FDdEIsT0FBTztDQUNQLDRDQUE0QztDQUM1QyxtQkFBbUI7Q0FDbkIsYUFBYTtBQUNkIiwic291cmNlc0NvbnRlbnQiOlsiLmRlZmF1bHQtaW5wdXQge1xyXG4gICAgbWFyZ2luOiAyMHB4IDA7XHJcbn1cclxuXHJcbi5jb21wb3NlZC1pbnB1dHtcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0ZmxleC13cmFwOndyYXA7XHJcbn1cclxuXHJcbi5ib3R0b20tYnV0dG9uIHtcclxuXHRtYXJnaW46IDQwcHggMDtcclxufVxyXG5cclxuLmNvbXBvbmVudC1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5oZWFkZXItYW1vdW50IHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG5cdG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG59XHJcblxyXG4uaGVhZGVyLWFtb3VudC12YWx1ZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW5jb21lLWNvbG9yLWRhcmstdGhlbWUpO1xyXG59XHJcblxyXG5cclxuXHJcbi5saXN0LWNvbnRhaW5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBmbGV4OiAxO1xyXG59XHJcblxyXG4ubWFpbkNoaWxke1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRmbGV4OiAxO1xyXG5cdGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4zNSkgMHB4IDVweCAxNXB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcblx0cGFkZGluZzogMjBweDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 7998:
/*!*******************************************************************!*\
  !*** ./src/app/views/wallet/wallet-list/wallet-list.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletListComponent: () => (/* binding */ WalletListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);




function WalletListComponent_div_1_h6_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h6", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Loading Wallets");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WalletListComponent_div_1_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please wait some time.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WalletListComponent_div_1_h6_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h6", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "No wallets found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WalletListComponent_div_1_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Create a new wallet to get started.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WalletListComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "h1", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, WalletListComponent_div_1_h6_4_Template, 2, 0, "h6", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, WalletListComponent_div_1_p_5_Template, 2, 0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, WalletListComponent_div_1_h6_6_Template, 2, 0, "h6", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, WalletListComponent_div_1_p_7_Template, 2, 0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "br")(9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.loading);
  }
}
const _c0 = function (a1) {
  return ["/wallet", a1];
};
function WalletListComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WalletListComponent_div_3_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const wallet_r6 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r7.walletService.selectWallet(wallet_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div")(2, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div")(5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const wallet_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c0, wallet_r6.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](wallet_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", wallet_r6.amount, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", wallet_r6.currencyCode, " ");
  }
}
class WalletListComponent {
  constructor(walletService) {
    this.walletService = walletService;
    this.loading = true;
    if (walletService.wallets.length == 0) {
      walletService.getWalletsFromServer().subscribe(() => {
        this.loading = false;
      });
    }
  }
  static #_ = this.ɵfac = function WalletListComponent_Factory(t) {
    return new (t || WalletListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.WalletService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: WalletListComponent,
    selectors: [["app-wallet-list"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 4,
    vars: 2,
    consts: [[1, "default-list-container"], ["class", "empty-list-container", 4, "ngIf"], [1, "default-list"], ["class", "default-editable-list-item", 3, "routerLink", "click", 4, "ngFor", "ngForOf"], [1, "empty-list-container"], [1, "text-center"], ["class", "text-center", 4, "ngIf"], [1, "default-editable-list-item", 3, "routerLink", "click"], [2, "margin", "0"], [1, "text-end", "amount-value"], [1, "text-end"]],
    template: function WalletListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WalletListComponent_div_1_Template, 10, 4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, WalletListComponent_div_3_Template, 9, 6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.walletService.wallets.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.walletService.wallets);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
    styles: ["*[_ngcontent-%COMP%] {\n    color: var(--primary-color-dark-theme);\n}\n\n.default-list-container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n.default-editable-list-item[_ngcontent-%COMP%] {\n    cursor: pointer;\n    display: flex;\n    flex-direction: row;\n    flex: 1;\n    align-items: flex-start;\n}\n\n.amount-value[_ngcontent-%COMP%] {\n    color: var(--income-color-dark-theme);\n}\n\n[_nghost-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow: auto;\n\tborder-radius: 20px;\n}\n\n.empty-list-container[_ngcontent-%COMP%]{\n\tpadding: 40px;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tflex: 1;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvd2FsbGV0L3dhbGxldC1saXN0L3dhbGxldC1saXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxzQ0FBc0M7QUFDMUM7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87QUFDUjs7QUFFQTtJQUNJLGVBQWU7SUFDZixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULGNBQWM7Q0FDakIsbUJBQW1CO0FBQ3BCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLGFBQWE7Q0FDYixzQkFBc0I7Q0FDdEIsbUJBQW1CO0NBQ25CLHVCQUF1QjtDQUN2QixPQUFPO0FBQ1IiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLWRhcmstdGhlbWUpO1xyXG59XHJcblxyXG4uZGVmYXVsdC1saXN0LWNvbnRhaW5lcntcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0ZmxleDogMTtcclxufVxyXG5cclxuLmRlZmF1bHQtZWRpdGFibGUtbGlzdC1pdGVtIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgZmxleDogMTtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG59XHJcblxyXG4uYW1vdW50LXZhbHVlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pbmNvbWUtY29sb3ItZGFyay10aGVtZSk7XHJcbn1cclxuXHJcbjpob3N0IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG5cdGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbn1cclxuXHJcbi5lbXB0eS1saXN0LWNvbnRhaW5lcntcclxuXHRwYWRkaW5nOiA0MHB4O1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 431:
/*!*********************************************************************!*\
  !*** ./src/app/views/wallet/wallet-start/wallet-start.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletStartComponent: () => (/* binding */ WalletStartComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _wallet_list_wallet_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wallet-list/wallet-list.component */ 7998);



const _c0 = function () {
  return ["/wallet/create"];
};
class WalletStartComponent {
  static #_ = this.ɵfac = function WalletStartComponent_Factory(t) {
    return new (t || WalletStartComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: WalletStartComponent,
    selectors: [["app-wallet-start"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 7,
    vars: 2,
    consts: [[1, "mainChild"], [1, "list-container"], [1, "default-button", "bottom-button", 3, "routerLink"], [1, "secondary"]],
    template: function WalletStartComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0)(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "app-wallet-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2)(5, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Create Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _wallet_list_wallet_list_component__WEBPACK_IMPORTED_MODULE_0__.WalletListComponent],
    styles: [".bottom-button[_ngcontent-%COMP%] {\n    margin: 40px 0;\n}\n\n.mainChild[_ngcontent-%COMP%] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n\tbox-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n\tborder-radius: 20px;\n\tpadding: 20px;\n}\n\n.list-container[_ngcontent-%COMP%] {\n    position: relative;\n    flex: 1;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvd2FsbGV0L3dhbGxldC1zdGFydC93YWxsZXQtc3RhcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87Q0FDUCw0Q0FBNEM7Q0FDNUMsbUJBQW1CO0NBQ25CLGFBQWE7QUFDZDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixPQUFPO0FBQ1giLCJzb3VyY2VzQ29udGVudCI6WyIuYm90dG9tLWJ1dHRvbiB7XHJcbiAgICBtYXJnaW46IDQwcHggMDtcclxufVxyXG5cclxuLm1haW5DaGlsZCB7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGZsZXg6IDE7XHJcblx0Ym94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjM1KSAwcHggNXB4IDE1cHg7XHJcblx0Ym9yZGVyLXJhZGl1czogMjBweDtcclxuXHRwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4ubGlzdC1jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZmxleDogMTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 853:
/*!*******************************************************************!*\
  !*** ./src/app/views/wallet/wallet-view/wallet-view.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletViewComponent: () => (/* binding */ WalletViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/transaction/transaction.service */ 4173);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _transaction_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../transaction/transaction-list/transaction-list.component */ 9578);





const _c0 = function () {
  return ["/wallet"];
};
class WalletViewComponent {
  constructor(walletService, transactionService, route, router) {
    this.walletService = walletService;
    this.transactionService = transactionService;
    this.route = route;
    this.router = router;
    this.transactions = [];
    this.currentWalletId = null;
  }
  ngOnInit() {
    // Access the id parameter from the route snapshot
    this.currentWalletId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    if (this.walletService.wallets.length == 0) {
      this.walletService.getWalletsFromServer().subscribe(() => {
        this.walletService.selectWallet(this.currentWalletId ?? 0);
      });
    }
    this.transactionService.getTransactionsByWalletId(this.currentWalletId ?? 0, true).subscribe(transactions => {
      this.transactions = transactions;
      this.transactions.sort((a, b) => a.date > b.date ? -1 : 1);
    });
  }
  editWallet() {
    this.router.navigate(['/wallet/edit/' + this.currentWalletId]);
  }
  static #_ = this.ɵfac = function WalletViewComponent_Factory(t) {
    return new (t || WalletViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.WalletService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_transaction_transaction_service__WEBPACK_IMPORTED_MODULE_1__.TransactionService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: WalletViewComponent,
    selectors: [["app-wallet-view"]],
    hostAttrs: [1, "childRouteFlex"],
    decls: 18,
    vars: 6,
    consts: [[1, "component-header"], [1, "bi", "bi-arrow-left-circle", "pointer", 2, "cursor", "pointer", 3, "routerLink"], [1, "header-amount"], [1, "header-amount-value"], [1, "mainChild"], [1, "list-container"], [3, "transactions"], [1, "bottom-button"], [1, "default-button", 3, "click"]],
    template: function WalletViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Balance: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 4)(11, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Transactions");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "app-transaction-list", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 7)(16, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WalletViewComponent_Template_button_click_16_listener() {
          return ctx.editWallet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Edit Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](5, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.walletService.selectedWallet.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx.walletService.selectedWallet.amount, " ", ctx.walletService.selectedWallet.currencyCode, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("transactions", ctx.transactions);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _transaction_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_2__.TransactionListComponent],
    styles: [".bottom-button[_ngcontent-%COMP%] {\n\tmargin: 40px 0;\n}\n\n.component-header[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n\tflex-wrap: wrap;\n\tmargin-bottom: 20px;\n}\n\n.header-amount[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n\tmargin-left: auto;\n}\n\n.header-amount-value[_ngcontent-%COMP%] {\n    color: var(--income-color-dark-theme);\n}\n\n.list-container[_ngcontent-%COMP%] {\n    position: relative;\n    flex: 1;\n}\n\n.mainChild[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n\tbox-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n\tborder-radius: 20px;\n\tpadding: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvd2FsbGV0L3dhbGxldC12aWV3L3dhbGxldC12aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDhCQUE4QjtDQUNqQyxlQUFlO0NBQ2YsbUJBQW1CO0FBQ3BCOztBQUVBO0lBQ0ksaUJBQWlCO0NBQ3BCLGlCQUFpQjtBQUNsQjs7QUFFQTtJQUNJLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixPQUFPO0FBQ1g7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87Q0FDUCw0Q0FBNEM7Q0FDNUMsbUJBQW1CO0NBQ25CLGFBQWE7QUFDZCIsInNvdXJjZXNDb250ZW50IjpbIi5ib3R0b20tYnV0dG9uIHtcclxuXHRtYXJnaW46IDQwcHggMDtcclxufVxyXG5cclxuLmNvbXBvbmVudC1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5oZWFkZXItYW1vdW50IHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG5cdG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG59XHJcblxyXG4uaGVhZGVyLWFtb3VudC12YWx1ZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW5jb21lLWNvbG9yLWRhcmstdGhlbWUpO1xyXG59XHJcblxyXG4ubGlzdC1jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZmxleDogMTtcclxufVxyXG5cclxuLm1haW5DaGlsZHtcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0ZmxleDogMTtcclxuXHRib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMzUpIDBweCA1cHggMTVweDtcclxuXHRib3JkZXItcmFkaXVzOiAyMHB4O1xyXG5cdHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9336:
/*!**************************************************!*\
  !*** ./src/app/views/wallet/wallet.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletComponent: () => (/* binding */ WalletComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 7870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);



class WalletComponent {
  constructor(walletService) {
    this.walletService = walletService;
  }
  static #_ = this.ɵfac = function WalletComponent_Factory(t) {
    return new (t || WalletComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.WalletService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: WalletComponent,
    selectors: [["app-wallet"]],
    decls: 6,
    vars: 0,
    consts: [[1, "container"], [1, "col-md-12"], [1, "text-center"], [1, "col-md-12", "mainPage"]],
    template: function WalletComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "My Wallets");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
    styles: ["*[_ngcontent-%COMP%]{\n\tcolor: var(--primary-color-dark-theme);\n}\n\n[_nghost-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n.container[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n.mainPage[_ngcontent-%COMP%]{\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 1;\n}\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3Mvd2FsbGV0L3dhbGxldC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0Msc0NBQXNDO0FBQ3ZDOztBQUVBO0NBQ0MsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixPQUFPO0FBQ1I7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isc0JBQXNCO0NBQ3RCLE9BQU87QUFDUjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixzQkFBc0I7Q0FDdEIsT0FBTztBQUNSIiwic291cmNlc0NvbnRlbnQiOlsiKntcclxuXHRjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvci1kYXJrLXRoZW1lKTtcclxufVxyXG5cclxuOmhvc3R7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuXHJcbi5jb250YWluZXJ7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGZsZXg6IDE7XHJcbn1cclxuXHJcbi5tYWluUGFnZXtcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0ZmxleDogMTtcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 8629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map