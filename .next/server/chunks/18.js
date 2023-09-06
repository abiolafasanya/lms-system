exports.id = 18;
exports.ids = [18];
exports.modules = {

/***/ 3758:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  vn: () => (/* reexport */ AuthenticateWithRedirectCallback),
  a7: () => (/* reexport */ ClerkLoaded),
  qI: () => (/* reexport */ ClerkLoading),
  El: () => (/* reexport */ ClerkProvider),
  Gp: () => (/* reexport */ CreateOrganization),
  X1: () => (/* reexport */ MagicLinkErrorCode),
  KM: () => (/* reexport */ MultisessionAppSupport),
  A: () => (/* reexport */ OrganizationProfile),
  Li: () => (/* reexport */ OrganizationSwitcher),
  gM: () => (/* reexport */ RedirectToCreateOrganization),
  yB: () => (/* reexport */ RedirectToOrganizationProfile),
  N1: () => (/* reexport */ RedirectToSignIn),
  C2: () => (/* reexport */ RedirectToSignUp),
  sO: () => (/* reexport */ RedirectToUserProfile),
  cL: () => (/* reexport */ SignIn),
  $d: () => (/* reexport */ SignInButton),
  AM: () => (/* reexport */ SignOutButton),
  Mo: () => (/* reexport */ SignUp),
  gX: () => (/* reexport */ SignUpButton),
  CH: () => (/* reexport */ SignedIn),
  tj: () => (/* reexport */ SignedOut),
  l8: () => (/* reexport */ UserButton),
  Iw: () => (/* reexport */ UserProfile),
  _E: () => (/* reexport */ WithClerk),
  CJ: () => (/* reexport */ WithSession),
  Gi: () => (/* reexport */ WithUser),
  kD: () => (/* reexport */ isClerkAPIResponseError),
  sZ: () => (/* reexport */ isKnownError),
  V9: () => (/* reexport */ isMagicLinkError),
  ZC: () => (/* reexport */ isMetamaskError),
  aC: () => (/* reexport */ useAuth),
  ll: () => (/* reexport */ useClerk),
  jS: () => (/* reexport */ useMagicLink),
  o8: () => (/* reexport */ useOrganization),
  eW: () => (/* reexport */ useOrganizationList),
  qi: () => (/* reexport */ useOrganizations),
  kP: () => (/* reexport */ useSession),
  xo: () => (/* reexport */ useSessionList),
  zq: () => (/* reexport */ useSignIn),
  QS: () => (/* reexport */ useSignUp),
  aF: () => (/* reexport */ useUser),
  r0: () => (/* reexport */ withClerk),
  NA: () => (/* reexport */ withSession),
  ns: () => (/* reexport */ withUser)
});

// UNUSED EXPORTS: SignInWithMetamaskButton, __internal__setErrorThrowerOptions

// EXTERNAL MODULE: ./node_modules/@clerk/clerk-react/dist/esm/polyfills.js
var polyfills = __webpack_require__(6095);
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/isomorphicAtob.js
const isomorphicAtob = (data) => {
  if (typeof atob !== "undefined" && typeof atob === "function") {
    return atob(data);
  } else if (typeof global !== "undefined" && global.Buffer) {
    return new global.Buffer(data, "base64").toString();
  }
  return data;
};

//# sourceMappingURL=isomorphicAtob.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/keys.js

const PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
const PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
const PUBLISHABLE_FRONTEND_API_DEV_REGEX = /^(([a-z]+)-){2}([0-9]{1,2})\.clerk\.accounts([a-z.]*)(dev|com)$/i;
function buildPublishableKey(frontendApi) {
  const keyPrefix = PUBLISHABLE_FRONTEND_API_DEV_REGEX.test(frontendApi) ? PUBLISHABLE_KEY_TEST_PREFIX : PUBLISHABLE_KEY_LIVE_PREFIX;
  return `${keyPrefix}${btoa(`${frontendApi}$`)}`;
}
function parsePublishableKey(key) {
  key = key || "";
  if (!isPublishableKey(key)) {
    return null;
  }
  const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
  let frontendApi = isomorphicAtob(key.split("_")[2]);
  if (!frontendApi.endsWith("$")) {
    return null;
  }
  frontendApi = frontendApi.slice(0, -1);
  return {
    instanceType,
    frontendApi
  };
}
function isPublishableKey(key) {
  key = key || "";
  const hasValidPrefix = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX);
  const hasValidFrontendApiPostfix = isomorphicAtob(key.split("_")[2] || "").endsWith("$");
  return hasValidPrefix && hasValidFrontendApiPostfix;
}
function isLegacyFrontendApiKey(key) {
  key = key || "";
  return key.startsWith("clerk.");
}
function createDevOrStagingUrlCache() {
  const DEV_OR_STAGING_SUFFIXES = [
    ".lcl.dev",
    ".stg.dev",
    ".lclstage.dev",
    ".stgstage.dev",
    ".dev.lclclerk.com",
    ".stg.lclclerk.com",
    ".accounts.lclclerk.com",
    "accountsstage.dev",
    "accounts.dev"
  ];
  const devOrStagingUrlCache = /* @__PURE__ */ new Map();
  return {
    isDevOrStagingUrl: (url) => {
      if (!url) {
        return false;
      }
      const hostname = typeof url === "string" ? url : url.hostname;
      let res = devOrStagingUrlCache.get(hostname);
      if (res === void 0) {
        res = DEV_OR_STAGING_SUFFIXES.some((s) => hostname.endsWith(s));
        devOrStagingUrlCache.set(hostname, res);
      }
      return res;
    }
  };
}

//# sourceMappingURL=keys.js.map
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/errors.js


const noFrontendApiError = "Clerk: You must add the frontendApi prop to your <ClerkProvider>";
const noClerkProviderError = "Clerk: You must wrap your application in a <ClerkProvider> component.";
const errors_noGuaranteedLoadedError = (hookName) => `Clerk: You're calling ${hookName} before there's a guarantee the client has been loaded. Call ${hookName} from a child of <SignedIn>, <SignedOut>, or <ClerkLoaded>, or use the withClerk() HOC.`;
const noGuaranteedUserError = (hookName) => `Clerk: You're calling ${hookName} before there's a guarantee there's an active user. Call ${hookName} from a child of <SignedIn> or use the withUser() HOC.`;
const multipleClerkProvidersError = "Clerk: You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.";
const hocChildrenNotAFunctionError = "Clerk: Child of WithClerk must be a function.";
const multipleChildrenInButtonComponent = (name) => `Clerk: You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
const invalidStateError = "Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support";
const unsupportedNonBrowserDomainOrProxyUrlFunction = "Unsupported usage of domain or proxyUrl. The usage of domain or proxyUrl as function is not supported in non-browser environments.";

//# sourceMappingURL=errors.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/errors/thrower.js
const DefaultMessages = Object.freeze({
  InvalidFrontendApiErrorMessage: `The frontendApi passed to Clerk is invalid. You can get your Frontend API key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
  InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
  InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
  MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`
});
function buildErrorThrower({ packageName, customMessages }) {
  let pkg = packageName;
  const messages = {
    ...DefaultMessages,
    ...customMessages
  };
  function buildMessage(rawMessage, replacements) {
    if (!replacements) {
      return `${pkg}: ${rawMessage}`;
    }
    let msg = rawMessage;
    const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const match of matches) {
      const replacement = (replacements[match[1]] || "").toString();
      msg = msg.replace(`{{${match[1]}}}`, replacement);
    }
    return `${pkg}: ${msg}`;
  }
  return {
    setPackageName({ packageName: packageName2 }) {
      if (typeof packageName2 === "string") {
        pkg = packageName2;
      }
      return this;
    },
    setMessages({ customMessages: customMessages2 }) {
      Object.assign(messages, customMessages2 || {});
      return this;
    },
    throwInvalidPublishableKeyError(params) {
      throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
    },
    throwInvalidFrontendApiError(params) {
      throw new Error(buildMessage(messages.InvalidFrontendApiErrorMessage, params));
    },
    throwInvalidProxyUrl(params) {
      throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
    },
    throwMissingPublishableKeyError() {
      throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
    }
  };
}

//# sourceMappingURL=thrower.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/errorThrower.js


const errorThrower = buildErrorThrower({ packageName: "@clerk/react" });
function __internal__setErrorThrowerOptions(options) {
  errorThrower.setMessages(options).setPackageName(options);
}

//# sourceMappingURL=errorThrower.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/useMaxAllowedInstancesGuard.js


const counts = /* @__PURE__ */ new Map();
function useMaxAllowedInstancesGuard(name, error, maxCount = 1) {
  react_default().useEffect(() => {
    const count = counts.get(name) || 0;
    if (count == maxCount) {
      throw new Error(error);
    }
    counts.set(name, count + 1);
    return () => {
      counts.set(name, (counts.get(name) || 1) - 1);
    };
  }, []);
}
function withMaxAllowedInstancesGuard(WrappedComponent, name, error) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || name || "Component";
  const Hoc = (props) => {
    useMaxAllowedInstancesGuard(name, error);
    return /* @__PURE__ */ react_default().createElement(WrappedComponent, { ...props });
  };
  Hoc.displayName = `withMaxAllowedInstancesGuard(${displayName})`;
  return Hoc;
}

//# sourceMappingURL=useMaxAllowedInstancesGuard.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/chunk-UKSPFOP7.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};


//# sourceMappingURL=chunk-UKSPFOP7.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/ssr.js
const inClientSide = () => {
  return typeof window !== "undefined";
};

//# sourceMappingURL=ssr.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/multiDomain.js
function handleValueOrFn(value, url, defaultValue) {
  if (typeof value === "function") {
    return value(url);
  }
  if (typeof value !== "undefined") {
    return value;
  }
  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }
  return void 0;
}

//# sourceMappingURL=multiDomain.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/isConstructor.js

function isConstructor(f) {
  return typeof f === "function";
}

//# sourceMappingURL=isConstructor.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/loadScript.js
const NO_DOCUMENT_ERROR = "loadScript cannot be called when document does not exist";
const NO_SRC_ERROR = "loadScript cannot be called without a src";
async function loadScript(src = "", opts) {
  const { async, defer, beforeLoad, crossOrigin } = opts || {};
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(NO_SRC_ERROR);
    }
    if (!document || !document.body) {
      reject(NO_DOCUMENT_ERROR);
    }
    const script = document.createElement("script");
    crossOrigin && script.setAttribute("crossorigin", crossOrigin);
    script.async = async || false;
    script.defer = defer || false;
    script.addEventListener("load", () => {
      script.remove();
      resolve(script);
    });
    script.addEventListener("error", () => {
      script.remove();
      reject();
    });
    script.src = src;
    beforeLoad?.(script);
    document.body.appendChild(script);
  });
}

//# sourceMappingURL=loadScript.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/proxy.js
function isValidProxyUrl(key) {
  if (!key) {
    return true;
  }
  return isHttpOrHttps(key) || isProxyUrlRelative(key);
}
function isHttpOrHttps(key) {
  return /^http(s)?:\/\//.test(key || "");
}
function isProxyUrlRelative(key) {
  return key.startsWith("/");
}
function proxyUrlToAbsoluteURL(url) {
  if (!url) {
    return "";
  }
  return isProxyUrlRelative(url) ? new URL(url, window.location.origin).toString() : url;
}
function getRequestUrl({ request, relativePath }) {
  const { headers, url: initialUrl } = request;
  const url = new URL(initialUrl);
  const host = headers.get("X-Forwarded-Host") ?? headers.get("host") ?? headers["host"] ?? url.host;
  let protocol = (headers.get("X-Forwarded-Proto") ?? headers["X-Forwarded-Proto"])?.split(",")[0] ?? url.protocol;
  protocol = protocol.replace(/[:/]/, "");
  return new URL(relativePath || url.pathname, `${protocol}://${host}`);
}

//# sourceMappingURL=proxy.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/utils/url.js
function parseSearchParams(queryString = "") {
  if (queryString.startsWith("?")) {
    queryString = queryString.slice(1);
  }
  return new URLSearchParams(queryString);
}
function stripScheme(url = "") {
  return (url || "").replace(/^.+:\/\//, "");
}
function addClerkPrefix(str) {
  if (!str) {
    return "";
  }
  let regex;
  if (str.match(/^(clerk\.)+\w*$/)) {
    regex = /(clerk\.)*(?=clerk\.)/;
  } else if (str.match(/\.clerk.accounts/)) {
    return str;
  } else {
    regex = /^(clerk\.)*/gi;
  }
  const stripped = str.replace(regex, "");
  return `clerk.${stripped}`;
}

//# sourceMappingURL=url.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/isDevOrStageUrl.js


const { isDevOrStagingUrl } = createDevOrStagingUrlCache();

//# sourceMappingURL=isDevOrStageUrl.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/loadClerkJsScript.js




const FAILED_TO_LOAD_ERROR = "Clerk: Failed to load Clerk";
const loadClerkJsScript = async (opts) => {
  const { frontendApi, publishableKey } = opts;
  if (!publishableKey && !frontendApi) {
    errorThrower.throwMissingPublishableKeyError();
  }
  return loadScript(clerkJsScriptUrl(opts), {
    async: true,
    crossOrigin: "anonymous",
    beforeLoad: applyClerkJsScriptAttributes(opts)
  }).catch(() => {
    throw new Error(FAILED_TO_LOAD_ERROR);
  });
};
const clerkJsScriptUrl = (opts) => {
  const { clerkJSUrl, clerkJSVariant, clerkJSVersion, proxyUrl, domain, publishableKey, frontendApi } = opts;
  if (clerkJSUrl) {
    return clerkJSUrl;
  }
  let scriptHost = "";
  if (!!proxyUrl && isValidProxyUrl(proxyUrl)) {
    scriptHost = proxyUrlToAbsoluteURL(proxyUrl).replace(/http(s)?:\/\//, "");
  } else if (domain && !isDevOrStagingUrl(parsePublishableKey(publishableKey)?.frontendApi || frontendApi || "")) {
    scriptHost = addClerkPrefix(domain);
  } else {
    scriptHost = parsePublishableKey(publishableKey)?.frontendApi || frontendApi || "";
  }
  const variant = clerkJSVariant ? `${clerkJSVariant.replace(/\.+$/, "")}.` : "";
  const version = clerkJSVersion || getPrereleaseTag("4.24.1") || getMajorVersion("4.24.1");
  return `https://${scriptHost}/npm/@clerk/clerk-js@${version}/dist/clerk.${variant}browser.js`;
};
const applyClerkJsScriptAttributes = (options) => (script) => {
  const { publishableKey, frontendApi, proxyUrl, domain } = options;
  if (publishableKey) {
    script.setAttribute("data-clerk-publishable-key", publishableKey);
  } else if (frontendApi) {
    script.setAttribute("data-clerk-frontend-api", frontendApi);
  }
  if (proxyUrl) {
    script.setAttribute("data-clerk-proxy-url", proxyUrl);
  }
  if (domain) {
    script.setAttribute("data-clerk-domain", domain);
  }
};
const getPrereleaseTag = (packageVersion) => packageVersion.match(/-(.*)\./)?.[1];
const getMajorVersion = (packageVersion) => packageVersion.split(".")[0];

//# sourceMappingURL=loadClerkJsScript.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/isomorphicClerk.js

var _loaded, _domain, _proxyUrl, _instance;



const _IsomorphicClerk = class {
  constructor(options) {
    this.clerkjs = null;
    this.preopenSignIn = null;
    this.preopenSignUp = null;
    this.preopenUserProfile = null;
    this.preopenOrganizationProfile = null;
    this.preopenCreateOrganization = null;
    this.premountSignInNodes = /* @__PURE__ */ new Map();
    this.premountSignUpNodes = /* @__PURE__ */ new Map();
    this.premountUserProfileNodes = /* @__PURE__ */ new Map();
    this.premountUserButtonNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationProfileNodes = /* @__PURE__ */ new Map();
    this.premountCreateOrganizationNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationSwitcherNodes = /* @__PURE__ */ new Map();
    this.premountMethodCalls = /* @__PURE__ */ new Map();
    this.loadedListeners = [];
    __privateAdd(this, _loaded, false);
    __privateAdd(this, _domain, void 0);
    __privateAdd(this, _proxyUrl, void 0);
    this.addOnLoaded = (cb) => {
      this.loadedListeners.push(cb);
    };
    this.emitLoaded = () => {
      this.loadedListeners.forEach((cb) => cb());
      this.loadedListeners = [];
    };
    this.hydrateClerkJS = (clerkjs) => {
      if (!clerkjs) {
        throw new Error("Failed to hydrate latest Clerk JS");
      }
      this.clerkjs = clerkjs;
      this.premountMethodCalls.forEach((cb) => cb());
      if (this.preopenSignIn !== null) {
        clerkjs.openSignIn(this.preopenSignIn);
      }
      if (this.preopenSignUp !== null) {
        clerkjs.openSignUp(this.preopenSignUp);
      }
      if (this.preopenUserProfile !== null) {
        clerkjs.openUserProfile(this.preopenUserProfile);
      }
      if (this.preopenOrganizationProfile !== null) {
        clerkjs.openOrganizationProfile(this.preopenOrganizationProfile);
      }
      if (this.preopenCreateOrganization !== null) {
        clerkjs.openCreateOrganization(this.preopenCreateOrganization);
      }
      this.premountSignInNodes.forEach((props, node) => {
        clerkjs.mountSignIn(node, props);
      });
      this.premountSignUpNodes.forEach((props, node) => {
        clerkjs.mountSignUp(node, props);
      });
      this.premountUserProfileNodes.forEach((props, node) => {
        clerkjs.mountUserProfile(node, props);
      });
      this.premountUserButtonNodes.forEach((props, node) => {
        clerkjs.mountUserButton(node, props);
      });
      __privateSet(this, _loaded, true);
      this.emitLoaded();
      return this.clerkjs;
    };
    this.__unstable__updateProps = (props) => {
      if (this.clerkjs && "__unstable__updateProps" in this.clerkjs) {
        this.clerkjs.__unstable__updateProps(props);
      } else {
        return void 0;
      }
    };
    /**
     * `setActive` can be used to set the active session and/or organization.
     * It will eventually replace `setSession`.
     *
     * @experimental
     */
    this.setActive = ({ session, organization, beforeEmit }) => {
      if (this.clerkjs) {
        return this.clerkjs.setActive({ session, organization, beforeEmit });
      } else {
        return Promise.reject();
      }
    };
    this.setSession = (session, beforeEmit) => {
      return this.setActive({ session, beforeEmit });
    };
    this.openSignIn = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openSignIn(props);
      } else {
        this.preopenSignIn = props;
      }
    };
    this.closeSignIn = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeSignIn();
      } else {
        this.preopenSignIn = null;
      }
    };
    this.openUserProfile = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openUserProfile(props);
      } else {
        this.preopenUserProfile = props;
      }
    };
    this.closeUserProfile = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeUserProfile();
      } else {
        this.preopenUserProfile = null;
      }
    };
    this.openOrganizationProfile = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openOrganizationProfile(props);
      } else {
        this.preopenOrganizationProfile = props;
      }
    };
    this.closeOrganizationProfile = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeOrganizationProfile();
      } else {
        this.preopenOrganizationProfile = null;
      }
    };
    this.openCreateOrganization = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openCreateOrganization(props);
      } else {
        this.preopenCreateOrganization = props;
      }
    };
    this.closeCreateOrganization = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeCreateOrganization();
      } else {
        this.preopenCreateOrganization = null;
      }
    };
    this.openSignUp = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openSignUp(props);
      } else {
        this.preopenSignUp = props;
      }
    };
    this.closeSignUp = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeSignUp();
      } else {
        this.preopenSignUp = null;
      }
    };
    this.mountSignIn = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountSignIn(node, props);
      } else {
        this.premountSignInNodes.set(node, props);
      }
    };
    this.unmountSignIn = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountSignIn(node);
      } else {
        this.premountSignInNodes.delete(node);
      }
    };
    this.mountSignUp = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountSignUp(node, props);
      } else {
        this.premountSignUpNodes.set(node, props);
      }
    };
    this.unmountSignUp = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountSignUp(node);
      } else {
        this.premountSignUpNodes.delete(node);
      }
    };
    this.mountUserProfile = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountUserProfile(node, props);
      } else {
        this.premountUserProfileNodes.set(node, props);
      }
    };
    this.unmountUserProfile = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountUserProfile(node);
      } else {
        this.premountUserProfileNodes.delete(node);
      }
    };
    this.mountOrganizationProfile = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountOrganizationProfile(node, props);
      } else {
        this.premountOrganizationProfileNodes.set(node, props);
      }
    };
    this.unmountOrganizationProfile = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountOrganizationProfile(node);
      } else {
        this.premountOrganizationProfileNodes.delete(node);
      }
    };
    this.mountCreateOrganization = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountCreateOrganization(node, props);
      } else {
        this.premountCreateOrganizationNodes.set(node, props);
      }
    };
    this.unmountCreateOrganization = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountCreateOrganization(node);
      } else {
        this.premountCreateOrganizationNodes.delete(node);
      }
    };
    this.mountOrganizationSwitcher = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountOrganizationSwitcher(node, props);
      } else {
        this.premountOrganizationSwitcherNodes.set(node, props);
      }
    };
    this.unmountOrganizationSwitcher = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountOrganizationSwitcher(node);
      } else {
        this.premountOrganizationSwitcherNodes.delete(node);
      }
    };
    this.mountUserButton = (node, userButtonProps) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountUserButton(node, userButtonProps);
      } else {
        this.premountUserButtonNodes.set(node, userButtonProps);
      }
    };
    this.unmountUserButton = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountUserButton(node);
      } else {
        this.premountUserButtonNodes.delete(node);
      }
    };
    this.addListener = (listener) => {
      const callback = () => this.clerkjs?.addListener(listener);
      if (this.clerkjs) {
        return callback();
      } else {
        this.premountMethodCalls.set("addListener", callback);
        return () => this.premountMethodCalls.delete("addListener");
      }
    };
    this.navigate = (to) => {
      const callback = () => this.clerkjs?.navigate(to);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("navigate", callback);
      }
    };
    this.redirectWithAuth = (...args) => {
      const callback = () => this.clerkjs?.redirectWithAuth(...args);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("redirectWithAuth", callback);
      }
    };
    this.redirectToSignIn = (opts) => {
      const callback = () => this.clerkjs?.redirectToSignIn(opts);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("redirectToSignIn", callback);
      }
    };
    this.redirectToSignUp = (opts) => {
      const callback = () => this.clerkjs?.redirectToSignUp(opts);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("redirectToSignUp", callback);
      }
    };
    this.redirectToUserProfile = () => {
      const callback = () => this.clerkjs?.redirectToUserProfile();
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToUserProfile", callback);
      }
    };
    this.redirectToHome = () => {
      const callback = () => this.clerkjs?.redirectToHome();
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToHome", callback);
      }
    };
    this.redirectToOrganizationProfile = () => {
      const callback = () => this.clerkjs?.redirectToOrganizationProfile();
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToOrganizationProfile", callback);
      }
    };
    this.redirectToCreateOrganization = () => {
      const callback = () => this.clerkjs?.redirectToCreateOrganization();
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToCreateOrganization", callback);
      }
    };
    this.handleRedirectCallback = (params) => {
      const callback = () => this.clerkjs?.handleRedirectCallback(params);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback()?.catch(() => {
        });
      } else {
        this.premountMethodCalls.set("handleRedirectCallback", callback);
      }
    };
    this.handleMagicLinkVerification = async (params) => {
      const callback = () => this.clerkjs?.handleMagicLinkVerification(params);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("handleMagicLinkVerification", callback);
      }
    };
    this.authenticateWithMetamask = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithMetamask(params);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("authenticateWithMetamask", callback);
      }
    };
    this.createOrganization = async (params) => {
      const callback = () => this.clerkjs?.createOrganization(params);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("createOrganization", callback);
      }
    };
    this.getOrganizationMemberships = async () => {
      const callback = () => this.clerkjs?.getOrganizationMemberships();
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("getOrganizationMemberships", callback);
      }
    };
    this.getOrganization = async (organizationId) => {
      const callback = () => this.clerkjs?.getOrganization(organizationId);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("getOrganization", callback);
      }
    };
    this.signOut = async (signOutCallbackOrOptions, options) => {
      const callback = () => this.clerkjs?.signOut(signOutCallbackOrOptions, options);
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("signOut", callback);
      }
    };
    const { Clerk = null, frontendApi, publishableKey } = options || {};
    this.frontendApi = frontendApi;
    this.publishableKey = publishableKey;
    __privateSet(this, _proxyUrl, options?.proxyUrl);
    __privateSet(this, _domain, options?.domain);
    this.options = options;
    this.Clerk = Clerk;
    this.mode = inClientSide() ? "browser" : "server";
    void this.loadClerkJS();
  }
  get loaded() {
    return __privateGet(this, _loaded);
  }
  static getOrCreateInstance(options) {
    if (!inClientSide() || !__privateGet(this, _instance) || options.Clerk && __privateGet(this, _instance).Clerk !== options.Clerk) {
      __privateSet(this, _instance, new _IsomorphicClerk(options));
    }
    return __privateGet(this, _instance);
  }
  get domain() {
    if (typeof window !== "undefined" && window.location) {
      return handleValueOrFn(__privateGet(this, _domain), new URL(window.location.href), "");
    }
    if (typeof __privateGet(this, _domain) === "function") {
      throw new Error(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return __privateGet(this, _domain) || "";
  }
  get proxyUrl() {
    if (typeof window !== "undefined" && window.location) {
      return handleValueOrFn(__privateGet(this, _proxyUrl), new URL(window.location.href), "");
    }
    if (typeof __privateGet(this, _proxyUrl) === "function") {
      throw new Error(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return __privateGet(this, _proxyUrl) || "";
  }
  async loadClerkJS() {
    if (this.mode !== "browser" || __privateGet(this, _loaded)) {
      return;
    }
    if (typeof window !== "undefined") {
      window.__clerk_frontend_api = this.frontendApi;
      window.__clerk_publishable_key = this.publishableKey;
      window.__clerk_proxy_url = this.proxyUrl;
      window.__clerk_domain = this.domain;
    }
    try {
      if (this.Clerk) {
        let c;
        if (isConstructor(this.Clerk)) {
          c = new this.Clerk(this.publishableKey || this.frontendApi || "", {
            proxyUrl: this.proxyUrl,
            domain: this.domain
          });
          await c.load(this.options);
        } else {
          c = this.Clerk;
          if (!c.isReady()) {
            await c.load(this.options);
          }
        }
        global.Clerk = c;
      } else {
        if (!global.Clerk) {
          await loadClerkJsScript({
            ...this.options,
            frontendApi: this.frontendApi,
            publishableKey: this.publishableKey,
            proxyUrl: this.proxyUrl,
            domain: this.domain
          });
        }
        if (!global.Clerk) {
          throw new Error("Failed to download latest ClerkJS. Contact support@clerk.com.");
        }
        await global.Clerk.load(this.options);
      }
      if (global.Clerk?.loaded || global.Clerk?.isReady()) {
        return this.hydrateClerkJS(global.Clerk);
      }
      return;
    } catch (err) {
      const error = err;
      if (true) {
        console.error(error.stack || error.message || error);
      } else {}
      return;
    }
  }
  get version() {
    return this.clerkjs?.version;
  }
  get client() {
    if (this.clerkjs) {
      return this.clerkjs.client;
    } else {
      return void 0;
    }
  }
  get session() {
    if (this.clerkjs) {
      return this.clerkjs.session;
    } else {
      return void 0;
    }
  }
  get user() {
    if (this.clerkjs) {
      return this.clerkjs.user;
    } else {
      return void 0;
    }
  }
  get organization() {
    if (this.clerkjs) {
      return this.clerkjs.organization;
    } else {
      return void 0;
    }
  }
  get __unstable__environment() {
    if (this.clerkjs) {
      return this.clerkjs.__unstable__environment;
    } else {
      return void 0;
    }
  }
  __unstable__setEnvironment(...args) {
    if (this.clerkjs && "__unstable__setEnvironment" in this.clerkjs) {
      this.clerkjs.__unstable__setEnvironment(args);
    } else {
      return void 0;
    }
  }
};
let IsomorphicClerk = _IsomorphicClerk;
_loaded = new WeakMap();
_domain = new WeakMap();
_proxyUrl = new WeakMap();
_instance = new WeakMap();
__privateAdd(IsomorphicClerk, _instance, void 0);

//# sourceMappingURL=isomorphicClerk.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/deriveState.js

const deriveState = (clerkLoaded, state, initialState) => {
  if (!clerkLoaded && initialState) {
    return deriveFromSsrInitialState(initialState);
  }
  return deriveFromClientSideState(state);
};
const deriveFromSsrInitialState = (initialState) => {
  const userId = initialState.userId;
  const user = initialState.user;
  const sessionId = initialState.sessionId;
  const session = initialState.session;
  const organization = initialState.organization;
  const orgId = initialState.orgId;
  const orgRole = initialState.orgRole;
  const orgSlug = initialState.orgSlug;
  const actor = initialState.actor;
  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    actor,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null
  };
};
const deriveFromClientSideState = (state) => {
  const userId = state.user ? state.user.id : state.user;
  const user = state.user;
  const sessionId = state.session ? state.session.id : state.session;
  const session = state.session;
  const actor = session?.actor;
  const organization = state.organization;
  const orgId = state.organization ? state.organization.id : state.organization;
  const orgSlug = organization?.slug;
  const membership = organization ? user?.organizationMemberships?.find((om) => om.organization.id === orgId) : organization;
  const orgRole = membership ? membership.role : membership;
  const lastOrganizationInvitation = state.lastOrganizationInvitation;
  const lastOrganizationMember = state.lastOrganizationMember;
  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    actor,
    lastOrganizationInvitation,
    lastOrganizationMember
  };
};

//# sourceMappingURL=deriveState.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/hooks/createContextAndHook.js

function assertContextExists(contextVal, msgOrCtx) {
  if (!contextVal) {
    throw typeof msgOrCtx === "string" ? new Error(msgOrCtx) : new Error(`${msgOrCtx.displayName} not found`);
  }
}
const createContextAndHook = (displayName, options) => {
  const { assertCtxFn = assertContextExists } = options || {};
  const Ctx = react_default().createContext(void 0);
  Ctx.displayName = displayName;
  const useCtx = () => {
    const ctx = react_default().useContext(Ctx);
    assertCtxFn(ctx, `${displayName} not found`);
    return ctx.value;
  };
  const useCtxWithoutGuarantee = () => {
    const ctx = react_default().useContext(Ctx);
    return ctx ? ctx.value : {};
  };
  return [Ctx, useCtx, useCtxWithoutGuarantee];
};

//# sourceMappingURL=createContextAndHook.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/AuthContext.js


const [AuthContext, useAuthContext] = createContextAndHook("AuthContext");

//# sourceMappingURL=AuthContext.js.map
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(1928);
;// CONCATENATED MODULE: ./node_modules/swr/_internal/dist/index.mjs


// Shared state between server components and client components
const noop = ()=>{};
// Using noop() as the undefined value as undefined can be replaced
// by something else. Prettier ignore and extra parentheses are necessary here
// to ensure that tsc doesn't remove the __NOINLINE__ comment.
// prettier-ignore
const UNDEFINED = /*#__NOINLINE__*/ noop();
const OBJECT = Object;
const isUndefined = (v)=>v === UNDEFINED;
const isFunction = (v)=>typeof v == 'function';
const mergeObjects = (a, b)=>({
        ...a,
        ...b
    });
const isPromiseLike = (x)=>isFunction(x.then);

// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();
// counter of the key
let counter = 0;
// A stable hash implementation that supports:
// - Fast and ensures unique hash properties
// - Handles unserializable values
// - Handles object key ordering
// - Generates short results
//
// This is not a serialization function, and the result is not guaranteed to be
// parsable.
const stableHash = (arg)=>{
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
        // Object/function, not null/date/regexp. Use WeakMap to store the id first.
        // If it's already hashed, directly return the result.
        result = table.get(arg);
        if (result) return result;
        // Store the hash first for circular reference detection before entering the
        // recursive `stableHash` calls.
        // For other objects like set and map, we use this id directly as the hash.
        result = ++counter + '~';
        table.set(arg, result);
        if (constructor == Array) {
            // Array.
            result = '@';
            for(index = 0; index < arg.length; index++){
                result += stableHash(arg[index]) + ',';
            }
            table.set(arg, result);
        }
        if (constructor == OBJECT) {
            // Object, sort keys.
            result = '#';
            const keys = OBJECT.keys(arg).sort();
            while(!isUndefined(index = keys.pop())){
                if (!isUndefined(arg[index])) {
                    result += index + ':' + stableHash(arg[index]) + ',';
                }
            }
            table.set(arg, result);
        }
    } else {
        result = isDate ? arg.toJSON() : type == 'symbol' ? arg.toString() : type == 'string' ? JSON.stringify(arg) : '' + arg;
    }
    return result;
};

// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const INITIAL_CACHE = {};
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>!isUndefined(key) && cache.get(key) || EMPTY_CACHE,
        // Setter
        (info)=>{
            if (!isUndefined(key)) {
                const prev = cache.get(key);
                // Before writing to the store, we keep the value in the initial cache
                // if it's not there yet.
                if (!(key in INITIAL_CACHE)) {
                    INITIAL_CACHE[key] = prev;
                }
                state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
            }
        },
        // Subscriber
        state[6],
        // Get server cache snapshot
        ()=>{
            if (!isUndefined(key)) {
                // If the cache was updated on the client, we return the stored initial value.
                if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
            }
            // If we haven't done any client-side updates, we return the current value.
            return !isUndefined(key) && cache.get(key) || EMPTY_CACHE;
        }
    ];
} // export { UNDEFINED, OBJECT, isUndefined, isFunction, mergeObjects, isPromiseLike }
;

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on `navigator.onLine`.
 * As a workaround, we always assume it's online on the first load, and change
 * the status upon `online` or `offline` events.
 */ let online = true;
const isOnline = ()=>online;
// For node and React Native, `add/removeEventListener` doesn't exist on window.
const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
] : [
    noop,
    noop
];
const isVisible = ()=>{
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== 'hidden';
};
const initFocus = (callback)=>{
    // focus revalidate
    if (isDocumentDefined) {
        document.addEventListener('visibilitychange', callback);
    }
    onWindowEvent('focus', callback);
    return ()=>{
        if (isDocumentDefined) {
            document.removeEventListener('visibilitychange', callback);
        }
        offWindowEvent('focus', callback);
    };
};
const initReconnect = (callback)=>{
    // revalidate on reconnected
    const onOnline = ()=>{
        online = true;
        callback();
    };
    // nothing to revalidate, just update the status
    const onOffline = ()=>{
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return ()=>{
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
const preset = {
    isOnline,
    isVisible
};
const defaultConfigOptions = {
    initFocus,
    initReconnect
};

const IS_REACT_LEGACY = !react_.useId;
const IS_SERVER = !isWindowDefined || 'Deno' in window;
// Polyfill requestAnimationFrame
const rAF = (f)=>hasRequestAnimationFrame() ? window['requestAnimationFrame'](f) : setTimeout(f, 1);
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = IS_SERVER ? react_.useEffect : react_.useLayoutEffect;
// This assignment is to extend the Navigator type to use effectiveType.
const navigatorConnection = typeof navigator !== 'undefined' && navigator.connection;
// Adjust the config based on slow connection status (<= 70Kbps).
const slowConnection = !IS_SERVER && navigatorConnection && ([
    'slow-2g',
    '2g'
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);

const dist_serialize = (key)=>{
    if (isFunction(key)) {
        try {
            key = key();
        } catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    // Use the original key as the argument of fetcher. This can be a string or an
    // array of values.
    const args = key;
    // If key is not falsy, or not an empty array, hash it.
    key = typeof key == 'string' ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : '';
    return [
        key,
        args
    ];
};

// Global timestamp.
let __timestamp = 0;
const getTimestamp = ()=>++__timestamp;

const FOCUS_EVENT = 0;
const RECONNECT_EVENT = 1;
const MUTATE_EVENT = 2;
const ERROR_REVALIDATE_EVENT = 3;

var constants = {
  __proto__: null,
  ERROR_REVALIDATE_EVENT: ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: FOCUS_EVENT,
  MUTATE_EVENT: MUTATE_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT
};

async function internalMutate(...args) {
    const [cache, _key, _data, _opts] = args;
    // When passing as a boolean, it's explicitly used to disable/enable
    // revalidation.
    const options = mergeObjects({
        populateCache: true,
        throwOnError: true
    }, typeof _opts === 'boolean' ? {
        revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const revalidate = options.revalidate !== false;
    const rollbackOnError = (error)=>{
        return typeof rollbackOnErrorOption === 'function' ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    // If the second argument is a key filter, return the mutation results for all
    // filtered keys.
    if (isFunction(_key)) {
        const keyFilter = _key;
        const matchedKeys = [];
        const it = cache.keys();
        for (const key of it){
            if (// Skip the special useSWRInfinite and useSWRSubscription keys.
            !/^\$(inf|sub)\$/.test(key) && keyFilter(cache.get(key)._k)) {
                matchedKeys.push(key);
            }
        }
        return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
        // Serialize key
        const [key] = dist_serialize(_k);
        if (!key) return;
        const [get, set] = createCacheHelper(cache, key);
        const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
        const revalidators = EVENT_REVALIDATORS[key];
        const startRevalidate = ()=>{
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
                delete PRELOAD[key];
                if (revalidators && revalidators[0]) {
                    return revalidators[0](MUTATE_EVENT).then(()=>get().data);
                }
            }
            return get().data;
        };
        // If there is no new data provided, revalidate the key with current state.
        if (args.length < 3) {
            // Revalidate and broadcast state.
            return startRevalidate();
        }
        let data = _data;
        let error;
        // Update global timestamps.
        const beforeMutationTs = getTimestamp();
        MUTATION[key] = [
            beforeMutationTs,
            0
        ];
        const hasOptimisticData = !isUndefined(optimisticData);
        const state = get();
        // `displayedData` is the current value on screen. It could be the optimistic value
        // that is going to be overridden by a `committedData`, or get reverted back.
        // `committedData` is the validated value that comes from a fetch or mutation.
        const displayedData = state.data;
        const currentData = state._c;
        const committedData = isUndefined(currentData) ? displayedData : currentData;
        // Do optimistic data update.
        if (hasOptimisticData) {
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
            // When we set optimistic data, backup the current committedData data in `_c`.
            set({
                data: optimisticData,
                _c: committedData
            });
        }
        if (isFunction(data)) {
            // `data` is a function, call it passing current cache value.
            try {
                data = data(committedData);
            } catch (err) {
                // If it throws an error synchronously, we shouldn't update the cache.
                error = err;
            }
        }
        // `data` is a promise/thenable, resolve the final data first.
        if (data && isPromiseLike(data)) {
            // This means that the mutation is async, we need to check timestamps to
            // avoid race conditions.
            data = await data.catch((err)=>{
                error = err;
            });
            // Check if other mutations have occurred since we've started this mutation.
            // If there's a race we don't update cache or broadcast the change,
            // just return the data.
            if (beforeMutationTs !== MUTATION[key][0]) {
                if (error) throw error;
                return data;
            } else if (error && hasOptimisticData && rollbackOnError(error)) {
                // Rollback. Always populate the cache in this case but without
                // transforming the data.
                populateCache = true;
                data = committedData;
                // Reset data to be the latest committed data, and clear the `_c` value.
                set({
                    data,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    data = populateCache(data, committedData);
                }
                // Only update cached data and reset the error if there's no error. Data can be `undefined` here.
                set({
                    data,
                    error: UNDEFINED,
                    _c: UNDEFINED
                });
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        const res = await startRevalidate();
        // The mutation and revalidation are ended, we can clear it since the data is
        // not an optimistic value anymore.
        set({
            _c: UNDEFINED
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return populateCache ? res : data;
    }
}

const revalidateAllKeys = (revalidators, type)=>{
    for(const key in revalidators){
        if (revalidators[key][0]) revalidators[key][0](type);
    }
};
const initCache = (provider, options)=>{
    // The global state for a specific provider will be used to deduplicate
    // requests and store listeners. As well as a mutate function that is bound to
    // the cache.
    // The provider's global state might be already initialized. Let's try to get the
    // global state associated with the provider first.
    if (!SWRGlobalState.has(provider)) {
        const opts = mergeObjects(defaultConfigOptions, options);
        // If there's no global state bound to the provider, create a new one with the
        // new mutate function.
        const EVENT_REVALIDATORS = {};
        const mutate = internalMutate.bind(UNDEFINED, provider);
        let unmount = noop;
        const subscriptions = {};
        const subscribe = (key, callback)=>{
            const subs = subscriptions[key] || [];
            subscriptions[key] = subs;
            subs.push(callback);
            return ()=>subs.splice(subs.indexOf(callback), 1);
        };
        const setter = (key, value, prev)=>{
            provider.set(key, value);
            const subs = subscriptions[key];
            if (subs) {
                for (const fn of subs){
                    fn(value, prev);
                }
            }
        };
        const initProvider = ()=>{
            if (!SWRGlobalState.has(provider)) {
                // Update the state if it's new, or if the provider has been extended.
                SWRGlobalState.set(provider, [
                    EVENT_REVALIDATORS,
                    {},
                    {},
                    {},
                    mutate,
                    setter,
                    subscribe
                ]);
                if (!IS_SERVER) {
                    // When listening to the native events for auto revalidations,
                    // we intentionally put a delay (setTimeout) here to make sure they are
                    // fired after immediate JavaScript executions, which can be
                    // React's state updates.
                    // This avoids some unnecessary revalidations such as
                    // https://github.com/vercel/swr/issues/1680.
                    const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
                    const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
                    unmount = ()=>{
                        releaseFocus && releaseFocus();
                        releaseReconnect && releaseReconnect();
                        // When un-mounting, we need to remove the cache provider from the state
                        // storage too because it's a side-effect. Otherwise, when re-mounting we
                        // will not re-register those event listeners.
                        SWRGlobalState.delete(provider);
                    };
                }
            }
        };
        initProvider();
        // This is a new provider, we need to initialize it and setup DOM events
        // listeners for `focus` and `reconnect` actions.
        // We might want to inject an extra layer on top of `provider` in the future,
        // such as key serialization, auto GC, etc.
        // For now, it's just a `Map` interface without any modifications.
        return [
            provider,
            mutate,
            initProvider,
            unmount
        ];
    }
    return [
        provider,
        SWRGlobalState.get(provider)[4]
    ];
};

// error retry
const onErrorRetry = (_, __, config, revalidate, opts)=>{
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    // Exponential backoff
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
        return;
    }
    setTimeout(revalidate, timeout, opts);
};
const compare = (currentData, newData)=>stableHash(currentData) == stableHash(newData);
// Default cache provider
const [cache, mutate] = initCache(new Map());
// Default config
const defaultConfig = mergeObjects({
    // events
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 10000 : 5000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: slowConnection ? 5000 : 3000,
    // providers
    compare,
    isPaused: ()=>false,
    cache,
    mutate,
    fallback: {}
}, // use web preset by default
preset);

const mergeConfigs = (a, b)=>{
    // Need to create a new object to avoid mutating the original here.
    const v = mergeObjects(a, b);
    // If two configs are provided, merge their `use` and `fallback` options.
    if (b) {
        const { use: u1 , fallback: f1  } = a;
        const { use: u2 , fallback: f2  } = b;
        if (u1 && u2) {
            v.use = u1.concat(u2);
        }
        if (f1 && f2) {
            v.fallback = mergeObjects(f1, f2);
        }
    }
    return v;
};

const SWRConfigContext = (0,react_.createContext)({});
const SWRConfig = (props)=>{
    const { value  } = props;
    const parentConfig = (0,react_.useContext)(SWRConfigContext);
    const isFunctionalConfig = isFunction(value);
    const config = (0,react_.useMemo)(()=>isFunctionalConfig ? value(parentConfig) : value, [
        isFunctionalConfig,
        parentConfig,
        value
    ]);
    // Extend parent context values and middleware.
    const extendedConfig = (0,react_.useMemo)(()=>isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
        isFunctionalConfig,
        parentConfig,
        config
    ]);
    // Should not use the inherited provider.
    const provider = config && config.provider;
    // initialize the cache only on first access.
    const cacheContextRef = (0,react_.useRef)(UNDEFINED);
    if (provider && !cacheContextRef.current) {
        cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
    }
    const cacheContext = cacheContextRef.current;
    // Override the cache if a new provider is given.
    if (cacheContext) {
        extendedConfig.cache = cacheContext[0];
        extendedConfig.mutate = cacheContext[1];
    }
    // Unsubscribe events.
    useIsomorphicLayoutEffect(()=>{
        if (cacheContext) {
            cacheContext[2] && cacheContext[2]();
            return cacheContext[3];
        }
    }, []);
    return (0,react_.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
        value: extendedConfig
    }));
};

// @ts-expect-error
const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
const use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
const setupDevTools = ()=>{
    if (enableDevtools) {
        // @ts-expect-error
        window.__SWR_DEVTOOLS_REACT__ = react_;
    }
};

const normalize = (args)=>{
    return isFunction(args[1]) ? [
        args[0],
        args[1],
        args[2] || {}
    ] : [
        args[0],
        null,
        (args[1] === null ? args[2] : args[1]) || {}
    ];
};

const useSWRConfig = ()=>{
    return mergeObjects(defaultConfig, (0,react_.useContext)(SWRConfigContext));
};

const preload = (key_, fetcher)=>{
    const [key, fnArg] = dist_serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(fnArg);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const [key] = dist_serialize(key_);
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            const req = PRELOAD[key];
            if (isUndefined(req)) return fetcher_(...args);
            delete PRELOAD[key];
            return req;
        });
        return useSWRNext(key_, fetcher, config);
    };

const BUILT_IN_MIDDLEWARE = use.concat(middleware);

// It's tricky to pass generic types as parameters, so we just directly override
// the types here.
const withArgs = (hook)=>{
    return function useSWRArgs(...args) {
        // Get the default and inherited configuration.
        const fallbackConfig = useSWRConfig();
        // Normalize arguments.
        const [key, fn, _config] = normalize(args);
        // Merge configurations.
        const config = mergeConfigs(fallbackConfig, _config);
        // Apply middleware
        let next = hook;
        const { use  } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

/**
 * An implementation of state with dependency-tracking.
 */ const useStateWithDeps = (state)=>{
    const rerender = useState({})[1];
    const unmountedRef = useRef(false);
    const stateRef = useRef(state);
    // If a state property (data, error, or isValidating) is accessed by the render
    // function, we mark the property as a dependency so if it is updated again
    // in the future, we trigger a rerender.
    // This is also known as dependency-tracking.
    const stateDependenciesRef = useRef({
        data: false,
        error: false,
        isValidating: false
    });
    /**
   * @param payload To change stateRef, pass the values explicitly to setState:
   * @example
   * ```js
   * setState({
   *   isValidating: false
   *   data: newData // set data to newData
   *   error: undefined // set error to undefined
   * })
   *
   * setState({
   *   isValidating: false
   *   data: undefined // set data to undefined
   *   error: err // set error to err
   * })
   * ```
   */ const setState = useCallback((payload)=>{
        let shouldRerender = false;
        const currentState = stateRef.current;
        for(const _ in payload){
            const k = _;
            // If the property has changed, update the state and mark rerender as
            // needed.
            if (currentState[k] !== payload[k]) {
                currentState[k] = payload[k];
                // If the property is accessed by the component, a rerender should be
                // triggered.
                if (stateDependenciesRef.current[k]) {
                    shouldRerender = true;
                }
            }
        }
        if (shouldRerender && !unmountedRef.current) {
            if (IS_REACT_LEGACY) {
                rerender({});
            } else {
                React.startTransition(()=>rerender({}));
            }
        }
    }, [
        rerender
    ]);
    useIsomorphicLayoutEffect(()=>{
        unmountedRef.current = false;
        return ()=>{
            unmountedRef.current = true;
        };
    });
    return [
        stateRef,
        stateDependenciesRef.current,
        setState
    ];
};

// Add a callback function to a list of keyed callback functions and return
// the unsubscribe function.
const subscribeCallback = (key, callbacks, callback)=>{
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return ()=>{
        const index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
            // O(1): faster than splice
            keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
            keyedRevalidators.pop();
        }
    };
};

// Create a custom hook with a middleware
const withMiddleware = (useSWR, middleware)=>{
    return (...args)=>{
        const [key, fn, config] = normalize(args);
        const uses = (config.use || []).concat(middleware);
        return useSWR(key, fn, {
            ...config,
            use: uses
        });
    };
};

setupDevTools();



;// CONCATENATED MODULE: ./node_modules/swr/core/dist/index.mjs





const unstable_serialize = (key)=>serialize(key)[0];

/// <reference types="react/experimental" />
const dist_use = react_.use || ((promise)=>{
    if (promise.status === 'pending') {
        throw promise;
    } else if (promise.status === 'fulfilled') {
        return promise.value;
    } else if (promise.status === 'rejected') {
        throw promise.reason;
    } else {
        promise.status = 'pending';
        promise.then((v)=>{
            promise.status = 'fulfilled';
            promise.value = v;
        }, (e)=>{
            promise.status = 'rejected';
            promise.reason = e;
        });
        throw promise;
    }
});
const WITH_DEDUPE = {
    dedupe: true
};
const useSWRHandler = (_key, fetcher, config)=>{
    const { cache , compare , suspense , fallbackData , revalidateOnMount , revalidateIfStale , refreshInterval , refreshWhenHidden , refreshWhenOffline , keepPreviousData  } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
    // `key` is the identifier of the SWR internal state,
    // `fnArg` is the argument/arguments parsed from the key, which will be passed
    // to the fetcher.
    // All of them are derived from `_key`.
    const [key, fnArg] = dist_serialize(_key);
    // If it's the initial render of this hook.
    const initialMountedRef = (0,react_.useRef)(false);
    // If the hook is unmounted already. This will be used to prevent some effects
    // to be called after unmounting.
    const unmountedRef = (0,react_.useRef)(false);
    // Refs to keep the key and config.
    const keyRef = (0,react_.useRef)(key);
    const fetcherRef = (0,react_.useRef)(fetcher);
    const configRef = (0,react_.useRef)(config);
    const getConfig = ()=>configRef.current;
    const isActive = ()=>getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache, key);
    const stateDependencies = (0,react_.useRef)({}).current;
    const fallback = isUndefined(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current)=>{
        for(const _ in stateDependencies){
            const t = _;
            if (t === 'data') {
                if (!compare(prev[t], current[t])) {
                    if (!isUndefined(prev[t])) {
                        return false;
                    }
                    if (!compare(returnedData, current[t])) {
                        return false;
                    }
                }
            } else {
                if (current[t] !== prev[t]) {
                    return false;
                }
            }
        }
        return true;
    };
    const getSnapshot = (0,react_.useMemo)(()=>{
        const shouldStartRequest = (()=>{
            if (!key) return false;
            if (!fetcher) return false;
            // If `revalidateOnMount` is set, we take the value directly.
            if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
            // If it's paused, we skip revalidation.
            if (getConfig().isPaused()) return false;
            if (suspense) return false;
            if (!isUndefined(revalidateIfStale)) return revalidateIfStale;
            return true;
        })();
        // Get the cache and merge it with expected states.
        const getSelectedCache = (state)=>{
            // We only select the needed fields from the state.
            const snapshot = mergeObjects(state);
            delete snapshot._k;
            if (!shouldStartRequest) {
                return snapshot;
            }
            return {
                isValidating: true,
                isLoading: true,
                ...snapshot
            };
        };
        const cachedData = getCache();
        const initialData = getInitialCache();
        const clientSnapshot = getSelectedCache(cachedData);
        const serverSnapshot = cachedData === initialData ? clientSnapshot : getSelectedCache(initialData);
        // To make sure that we are returning the same object reference to avoid
        // unnecessary re-renders, we keep the previous snapshot and use deep
        // comparison to check if we need to return a new one.
        let memorizedSnapshot = clientSnapshot;
        return [
            ()=>{
                const newSnapshot = getSelectedCache(getCache());
                const compareResult = isEqual(newSnapshot, memorizedSnapshot);
                if (compareResult) {
                    // Mentally, we should always return the `memorizedSnapshot` here
                    // as there's no change between the new and old snapshots.
                    // However, since the `isEqual` function only compares selected fields,
                    // the values of the unselected fields might be changed. That's
                    // simply because we didn't track them.
                    // To support the case in https://github.com/vercel/swr/pull/2576,
                    // we need to update these fields in the `memorizedSnapshot` too
                    // with direct mutations to ensure the snapshot is always up-to-date
                    // even for the unselected fields, but only trigger re-renders when
                    // the selected fields are changed.
                    memorizedSnapshot.data = newSnapshot.data;
                    memorizedSnapshot.isLoading = newSnapshot.isLoading;
                    memorizedSnapshot.isValidating = newSnapshot.isValidating;
                    memorizedSnapshot.error = newSnapshot.error;
                    return memorizedSnapshot;
                } else {
                    memorizedSnapshot = newSnapshot;
                    return newSnapshot;
                }
            },
            ()=>serverSnapshot
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cache,
        key
    ]);
    // Get the current state that SWR should return.
    const cached = (0,shim.useSyncExternalStore)((0,react_.useCallback)((callback)=>subscribeCache(key, (current, prev)=>{
            if (!isEqual(prev, current)) callback();
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        cache,
        key
    ]), getSnapshot[0], getSnapshot[1]);
    const isInitialMount = !initialMountedRef.current;
    const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
    const cachedData = cached.data;
    const data = isUndefined(cachedData) ? fallback : cachedData;
    const error = cached.error;
    // Use a ref to store previously returned data. Use the initial data as its initial value.
    const laggyDataRef = (0,react_.useRef)(data);
    const returnedData = keepPreviousData ? isUndefined(cachedData) ? laggyDataRef.current : cachedData : data;
    // - Suspense mode and there's stale data for the initial render.
    // - Not suspense mode and there is no fallback data and `revalidateIfStale` is enabled.
    // - `revalidateIfStale` is enabled but `data` is not defined.
    const shouldDoInitialRevalidation = (()=>{
        // if a key already has revalidators and also has error, we should not trigger revalidation
        if (hasRevalidator && !isUndefined(error)) return false;
        // If `revalidateOnMount` is set, we take the value directly.
        if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
        // If it's paused, we skip revalidation.
        if (getConfig().isPaused()) return false;
        // Under suspense mode, it will always fetch on render if there is no
        // stale data so no need to revalidate immediately mount it again.
        // If data exists, only revalidate if `revalidateIfStale` is true.
        if (suspense) return isUndefined(data) ? false : revalidateIfStale;
        // If there is no stale data, we need to revalidate when mount;
        // If `revalidateIfStale` is set to true, we will always revalidate.
        return isUndefined(data) || revalidateIfStale;
    })();
    // Resolve the default validating state:
    // If it's able to validate, and it should revalidate when mount, this will be true.
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    // The revalidation function is a carefully crafted wrapper of the original
    // `fetcher`, to correctly handle the many edge cases.
    const revalidate = (0,react_.useCallback)(async (revalidateOpts)=>{
        const currentFetcher = fetcherRef.current;
        if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
            return false;
        }
        let newData;
        let startAt;
        let loading = true;
        const opts = revalidateOpts || {};
        // If there is no ongoing concurrent request, or `dedupe` is not set, a
        // new request should be initiated.
        const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
        /*
         For React 17
         Do unmount check for calls:
         If key has changed during the revalidation, or the component has been
         unmounted, old dispatch and old event callbacks should not take any
         effect

        For React 18
        only check if key has changed
        https://github.com/reactwg/react-18/discussions/82
      */ const callbackSafeguard = ()=>{
            if (IS_REACT_LEGACY) {
                return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
            }
            return key === keyRef.current;
        };
        // The final state object when the request finishes.
        const finalState = {
            isValidating: false,
            isLoading: false
        };
        const finishRequestAndUpdateState = ()=>{
            setCache(finalState);
        };
        const cleanupState = ()=>{
            // Check if it's still the same request before deleting it.
            const requestInfo = FETCH[key];
            if (requestInfo && requestInfo[1] === startAt) {
                delete FETCH[key];
            }
        };
        // Start fetching. Change the `isValidating` state, update the cache.
        const initialState = {
            isValidating: true
        };
        // It is in the `isLoading` state, if and only if there is no cached data.
        // This bypasses fallback data and laggy data.
        if (isUndefined(getCache().data)) {
            initialState.isLoading = true;
        }
        try {
            if (shouldStartNewRequest) {
                setCache(initialState);
                // If no cache is being rendered currently (it shows a blank page),
                // we trigger the loading slow event.
                if (config.loadingTimeout && isUndefined(getCache().data)) {
                    setTimeout(()=>{
                        if (loading && callbackSafeguard()) {
                            getConfig().onLoadingSlow(key, config);
                        }
                    }, config.loadingTimeout);
                }
                // Start the request and save the timestamp.
                // Key must be truthy if entering here.
                FETCH[key] = [
                    currentFetcher(fnArg),
                    getTimestamp()
                ];
            }
            [newData, startAt] = FETCH[key];
            newData = await newData;
            if (shouldStartNewRequest) {
                // If the request isn't interrupted, clean it up after the
                // deduplication interval.
                setTimeout(cleanupState, config.dedupingInterval);
            }
            // If there're other ongoing request(s), started after the current one,
            // we need to ignore the current one to avoid possible race conditions:
            //   req1------------------>res1        (current one)
            //        req2---------------->res2
            // the request that fired later will always be kept.
            // The timestamp maybe be `undefined` or a number
            if (!FETCH[key] || FETCH[key][1] !== startAt) {
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Clear error.
            finalState.error = UNDEFINED;
            // If there're other mutations(s), that overlapped with the current revalidation:
            // case 1:
            //   req------------------>res
            //       mutate------>end
            // case 2:
            //         req------------>res
            //   mutate------>end
            // case 3:
            //   req------------------>res
            //       mutate-------...---------->
            // we have to ignore the revalidation result (res) because it's no longer fresh.
            // meanwhile, a new revalidation should be triggered when the mutation ends.
            const mutationInfo = MUTATION[key];
            if (!isUndefined(mutationInfo) && // case 1
            (startAt <= mutationInfo[0] || // case 2
            startAt <= mutationInfo[1] || // case 3
            mutationInfo[1] === 0)) {
                finishRequestAndUpdateState();
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Deep compare with the latest state to avoid extra re-renders.
            // For local state, compare and assign.
            const cacheData = getCache().data;
            // Since the compare fn could be custom fn
            // cacheData might be different from newData even when compare fn returns True
            finalState.data = compare(cacheData, newData) ? cacheData : newData;
            // Trigger the successful callback if it's the original request.
            if (shouldStartNewRequest) {
                if (callbackSafeguard()) {
                    getConfig().onSuccess(newData, key, config);
                }
            }
        } catch (err) {
            cleanupState();
            const currentConfig = getConfig();
            const { shouldRetryOnError  } = currentConfig;
            // Not paused, we continue handling the error. Otherwise, discard it.
            if (!currentConfig.isPaused()) {
                // Get a new error, don't use deep comparison for errors.
                finalState.error = err;
                // Error event and retry logic. Only for the actual request, not
                // deduped ones.
                if (shouldStartNewRequest && callbackSafeguard()) {
                    currentConfig.onError(err, key, currentConfig);
                    if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
                        if (isActive()) {
                            // If it's inactive, stop. It will auto-revalidate when
                            // refocusing or reconnecting.
                            // When retrying, deduplication is always enabled.
                            currentConfig.onErrorRetry(err, key, currentConfig, (_opts)=>{
                                const revalidators = EVENT_REVALIDATORS[key];
                                if (revalidators && revalidators[0]) {
                                    revalidators[0](constants.ERROR_REVALIDATE_EVENT, _opts);
                                }
                            }, {
                                retryCount: (opts.retryCount || 0) + 1,
                                dedupe: true
                            });
                        }
                    }
                }
            }
        }
        // Mark loading as stopped.
        loading = false;
        // Update the current hook's state.
        finishRequestAndUpdateState();
        return true;
    }, // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        key,
        cache
    ]);
    // Similar to the global mutate but bound to the current cache and key.
    // `cache` isn't allowed to change during the lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const boundMutate = (0,react_.useCallback)(// Use callback to make sure `keyRef.current` returns latest result every time
    (...args)=>{
        return internalMutate(cache, keyRef.current, ...args);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // The logic for updating refs.
    useIsomorphicLayoutEffect(()=>{
        fetcherRef.current = fetcher;
        configRef.current = config;
        // Handle laggy data updates. If there's cached data of the current key,
        // it'll be the correct reference.
        if (!isUndefined(cachedData)) {
            laggyDataRef.current = cachedData;
        }
    });
    // After mounted or key changed.
    useIsomorphicLayoutEffect(()=>{
        if (!key) return;
        const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
        // Expose revalidators to global event listeners. So we can trigger
        // revalidation from the outside.
        let nextFocusRevalidatedAt = 0;
        const onRevalidate = (type, opts = {})=>{
            if (type == constants.FOCUS_EVENT) {
                const now = Date.now();
                if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
                    nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
                    softRevalidate();
                }
            } else if (type == constants.RECONNECT_EVENT) {
                if (getConfig().revalidateOnReconnect && isActive()) {
                    softRevalidate();
                }
            } else if (type == constants.MUTATE_EVENT) {
                return revalidate();
            } else if (type == constants.ERROR_REVALIDATE_EVENT) {
                return revalidate(opts);
            }
            return;
        };
        const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
        // Mark the component as mounted and update corresponding refs.
        unmountedRef.current = false;
        keyRef.current = key;
        initialMountedRef.current = true;
        // Keep the original key in the cache.
        setCache({
            _k: fnArg
        });
        // Trigger a revalidation
        if (shouldDoInitialRevalidation) {
            if (isUndefined(data) || IS_SERVER) {
                // Revalidate immediately.
                softRevalidate();
            } else {
                // Delay the revalidate if we have data to return so we won't block
                // rendering.
                rAF(softRevalidate);
            }
        }
        return ()=>{
            // Mark it as unmounted.
            unmountedRef.current = true;
            unsubEvents();
        };
    }, [
        key
    ]);
    // Polling
    useIsomorphicLayoutEffect(()=>{
        let timer;
        function next() {
            // Use the passed interval
            // ...or invoke the function with the updated data to get the interval
            const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
            // We only start the next interval if `refreshInterval` is not 0, and:
            // - `force` is true, which is the start of polling
            // - or `timer` is not 0, which means the effect wasn't canceled
            if (interval && timer !== -1) {
                timer = setTimeout(execute, interval);
            }
        }
        function execute() {
            // Check if it's OK to execute:
            // Only revalidate when the page is visible, online, and not errored.
            if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
                revalidate(WITH_DEDUPE).then(next);
            } else {
                // Schedule the next interval to check again.
                next();
            }
        }
        next();
        return ()=>{
            if (timer) {
                clearTimeout(timer);
                timer = -1;
            }
        };
    }, [
        refreshInterval,
        refreshWhenHidden,
        refreshWhenOffline,
        key
    ]);
    // Display debug info in React DevTools.
    (0,react_.useDebugValue)(returnedData);
    // In Suspense mode, we can't return the empty `data` state.
    // If there is an `error`, the `error` needs to be thrown to the error boundary.
    // If there is no `error`, the `revalidation` promise needs to be thrown to
    // the suspense boundary.
    if (suspense && isUndefined(data) && key) {
        // SWR should throw when trying to use Suspense on the server with React 18,
        // without providing any initial data. See:
        // https://github.com/vercel/swr/issues/1832
        if (!IS_REACT_LEGACY && IS_SERVER) {
            throw new Error('Fallback data is required when using suspense in SSR.');
        }
        // Always update fetcher and config refs even with the Suspense mode.
        fetcherRef.current = fetcher;
        configRef.current = config;
        unmountedRef.current = false;
        const req = PRELOAD[key];
        if (!isUndefined(req)) {
            const promise = boundMutate(req);
            dist_use(promise);
        }
        if (isUndefined(error)) {
            const promise = revalidate(WITH_DEDUPE);
            if (!isUndefined(returnedData)) {
                promise.status = 'fulfilled';
                promise.value = true;
            }
            dist_use(promise);
        } else {
            throw error;
        }
    }
    return {
        mutate: boundMutate,
        get data () {
            stateDependencies.data = true;
            return returnedData;
        },
        get error () {
            stateDependencies.error = true;
            return error;
        },
        get isValidating () {
            stateDependencies.isValidating = true;
            return isValidating;
        },
        get isLoading () {
            stateDependencies.isLoading = true;
            return isLoading;
        }
    };
};
const dist_SWRConfig = OBJECT.defineProperty(SWRConfig, 'defaultValue', {
    value: defaultConfig
});
/**
 * A hook to fetch data.
 *
 * @link https://swr.vercel.app
 * @example
 * ```jsx
 * import useSWR from 'swr'
 * function Profile() {
 *   const { data, error } = useSWR('/api/user', fetcher)
 *   if (error) return <div>failed to load</div>
 *   if (!data) return <div>loading...</div>
 *   return <div>hello {data.name}!</div>
 * }
 * ```
 */ const useSWR = withArgs(useSWRHandler);

// useSWR



;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/hooks/contexts.js



const [ClerkInstanceContext, useClerkInstanceContext] = createContextAndHook("ClerkInstanceContext");
const [UserContext, useUserContext] = createContextAndHook("UserContext");
const [ClientContext, useClientContext] = createContextAndHook("ClientContext");
const [SessionContext, useSessionContext] = createContextAndHook(
  "SessionContext"
);
const [OrganizationContextInternal, useOrganizationContext] = createContextAndHook("OrganizationContext");
const OrganizationProvider = ({
  children,
  organization,
  lastOrganizationMember,
  lastOrganizationInvitation,
  swrConfig
}) => {
  return /* @__PURE__ */ react_default().createElement(dist_SWRConfig, { value: swrConfig }, /* @__PURE__ */ react_default().createElement(
    OrganizationContextInternal.Provider,
    {
      value: {
        value: {
          organization,
          lastOrganizationMember,
          lastOrganizationInvitation
        }
      }
    },
    children
  ));
};
const OrganizationContext = (/* unused pure expression or super */ null && (OrganizationProvider));

//# sourceMappingURL=contexts.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/IsomorphicClerkContext.js


const [IsomorphicClerkContext, useIsomorphicClerkContext] = [ClerkInstanceContext, useClerkInstanceContext];

//# sourceMappingURL=IsomorphicClerkContext.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/ClerkContextProvider.js










function ClerkContextProvider(props) {
  const { isomorphicClerkOptions, initialState, children } = props;
  const { isomorphicClerk: clerk, loaded: clerkLoaded } = useLoadedIsomorphicClerk(isomorphicClerkOptions);
  const [state, setState] = react_default().useState({
    client: clerk.client,
    session: clerk.session,
    user: clerk.user,
    organization: clerk.organization,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null
  });
  react_default().useEffect(() => {
    return clerk.addListener((e) => setState({ ...e }));
  }, []);
  const derivedState = deriveState(clerkLoaded, state, initialState);
  const clerkCtx = react_default().useMemo(() => ({ value: clerk }), [clerkLoaded]);
  const clientCtx = react_default().useMemo(() => ({ value: state.client }), [state.client]);
  const {
    sessionId,
    session,
    userId,
    user,
    orgId,
    actor,
    lastOrganizationInvitation,
    lastOrganizationMember,
    organization,
    orgRole,
    orgSlug
  } = derivedState;
  const authCtx = react_default().useMemo(() => {
    const value = { sessionId, userId, actor, orgId, orgRole, orgSlug };
    return { value };
  }, [sessionId, userId, actor, orgId, orgRole, orgSlug]);
  const userCtx = react_default().useMemo(() => ({ value: user }), [userId, user]);
  const sessionCtx = react_default().useMemo(() => ({ value: session }), [sessionId, session]);
  const organizationCtx = react_default().useMemo(() => {
    const value = {
      organization,
      lastOrganizationInvitation,
      lastOrganizationMember
    };
    return { value };
  }, [orgId, organization, lastOrganizationInvitation, lastOrganizationMember]);
  return (
    // @ts-expect-error
    /* @__PURE__ */ react_default().createElement(IsomorphicClerkContext.Provider, { value: clerkCtx }, /* @__PURE__ */ react_default().createElement(ClientContext.Provider, { value: clientCtx }, /* @__PURE__ */ react_default().createElement(SessionContext.Provider, { value: sessionCtx }, /* @__PURE__ */ react_default().createElement(OrganizationProvider, { ...organizationCtx.value }, /* @__PURE__ */ react_default().createElement(AuthContext.Provider, { value: authCtx }, /* @__PURE__ */ react_default().createElement(UserContext.Provider, { value: userCtx }, children))))))
  );
}
const useLoadedIsomorphicClerk = (options) => {
  const [loaded, setLoaded] = react_default().useState(false);
  const isomorphicClerk = react_default().useMemo(() => IsomorphicClerk.getOrCreateInstance(options), []);
  react_default().useEffect(() => {
    isomorphicClerk.__unstable__updateProps({ appearance: options.appearance });
  }, [options.appearance]);
  react_default().useEffect(() => {
    isomorphicClerk.__unstable__updateProps({ options });
  }, [options.localization]);
  react_default().useEffect(() => {
    isomorphicClerk.addOnLoaded(() => setLoaded(true));
  }, []);
  return { isomorphicClerk, loaded };
};

//# sourceMappingURL=ClerkContextProvider.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/assertHelpers.js


function assertWrappedByClerkProvider(contextVal) {
  if (!contextVal) {
    throw new Error(noClerkProviderError);
  }
}
function assertClerkLoadedGuarantee(guarantee, hookName) {
  if (!guarantee) {
    throw new Error(noGuaranteedLoadedError(hookName));
  }
}

//# sourceMappingURL=assertHelpers.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/StructureContext.js



const StructureContextStates = Object.freeze({
  noGuarantees: Object.freeze({
    guaranteedLoaded: false
  }),
  guaranteedLoaded: Object.freeze({
    guaranteedLoaded: true
  })
});
const StructureContext = react_default().createContext(void 0);
StructureContext.displayName = "StructureContext";
const useStructureContext = () => {
  const structureCtx = react_default().useContext(StructureContext);
  assertWrappedByClerkProvider(structureCtx);
  return structureCtx;
};
const LoadedGuarantee = ({ children }) => {
  const structure = useStructureContext();
  if (structure.guaranteedLoaded) {
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  }
  return /* @__PURE__ */ react_default().createElement(StructureContext.Provider, { value: StructureContextStates.guaranteedLoaded }, children);
};

//# sourceMappingURL=StructureContext.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/ClerkProvider.js







__internal__setErrorThrowerOptions({
  packageName: "@clerk/clerk-react"
});
function ClerkProviderBase(props) {
  const { initialState, children, ...restIsomorphicClerkOptions } = props;
  const { frontendApi = "", publishableKey = "", Clerk: userInitialisedClerk } = restIsomorphicClerkOptions;
  if (!userInitialisedClerk) {
    if (!publishableKey && !frontendApi) {
      errorThrower.throwMissingPublishableKeyError();
    } else if (publishableKey && !isPublishableKey(publishableKey)) {
      errorThrower.throwInvalidPublishableKeyError({ key: publishableKey });
    } else if (!publishableKey && frontendApi && !isLegacyFrontendApiKey(frontendApi)) {
      errorThrower.throwInvalidFrontendApiError({ key: frontendApi });
    }
  }
  return /* @__PURE__ */ react_default().createElement(StructureContext.Provider, { value: StructureContextStates.noGuarantees }, /* @__PURE__ */ react_default().createElement(
    ClerkContextProvider,
    {
      initialState,
      isomorphicClerkOptions: restIsomorphicClerkOptions
    },
    children
  ));
}
const ClerkProvider = withMaxAllowedInstancesGuard(ClerkProviderBase, "ClerkProvider", multipleClerkProvidersError);
ClerkProvider.displayName = "ClerkProvider";

//# sourceMappingURL=ClerkProvider.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/contexts/index.js



//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/withClerk.js





const withClerk = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const clerk = useIsomorphicClerkContext();
    if (!clerk.loaded) {
      return null;
    }
    return /* @__PURE__ */ react_default().createElement(LoadedGuarantee, null, /* @__PURE__ */ react_default().createElement(
      Component,
      {
        ...props,
        clerk
      }
    ));
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};
const WithClerk = ({ children }) => {
  const clerk = useIsomorphicClerkContext();
  if (typeof children !== "function") {
    throw new Error(hocChildrenNotAFunctionError);
  }
  if (!clerk.loaded) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement(LoadedGuarantee, null, children(clerk));
};

//# sourceMappingURL=withClerk.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/uiComponents.js



class Portal extends (react_default()).PureComponent {
  constructor() {
    super(...arguments);
    this.portalRef = react_default().createRef();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.props.appearance !== this.props.props.appearance) {
      this.props.updateProps({ node: this.portalRef.current, props: this.props.props });
    }
  }
  componentDidMount() {
    if (this.portalRef.current) {
      this.props.mount(this.portalRef.current, this.props.props);
    }
  }
  componentWillUnmount() {
    if (this.portalRef.current) {
      this.props.unmount(this.portalRef.current);
    }
  }
  render() {
    return /* @__PURE__ */ react_default().createElement("div", { ref: this.portalRef });
  }
}
const SignIn = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountSignIn,
      unmount: clerk.unmountSignIn,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "SignIn");
const SignUp = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountSignUp,
      unmount: clerk.unmountSignUp,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "SignUp");
const UserProfile = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountUserProfile,
      unmount: clerk.unmountUserProfile,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "UserProfile");
const UserButton = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountUserButton,
      unmount: clerk.unmountUserButton,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "UserButton");
const OrganizationProfile = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountOrganizationProfile,
      unmount: clerk.unmountOrganizationProfile,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "OrganizationProfile");
const CreateOrganization = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountCreateOrganization,
      unmount: clerk.unmountCreateOrganization,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "CreateOrganization");
const OrganizationSwitcher = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountOrganizationSwitcher,
      unmount: clerk.unmountOrganizationSwitcher,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "OrganizationSwitcher");

//# sourceMappingURL=uiComponents.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/controlComponents.js







const SignedIn = ({ children }) => {
  const { userId } = useAuthContext();
  if (userId) {
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  }
  return null;
};
const SignedOut = ({ children }) => {
  const { userId } = useAuthContext();
  if (userId === null) {
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  }
  return null;
};
const ClerkLoaded = ({ children }) => {
  const isomorphicClerk = useIsomorphicClerkContext();
  if (!isomorphicClerk.loaded) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement(LoadedGuarantee, null, children);
};
const ClerkLoading = ({ children }) => {
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.loaded) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
};
const RedirectToSignIn = withClerk(({ clerk, ...props }) => {
  const { client, session } = clerk;
  const { __unstable__environment } = clerk;
  const hasActiveSessions = client.activeSessions && client.activeSessions.length > 0;
  react_default().useEffect(() => {
    if (session === null && hasActiveSessions && __unstable__environment) {
      const { afterSignOutOneUrl } = __unstable__environment.displayConfig;
      void clerk.navigate(afterSignOutOneUrl);
    } else {
      void clerk.redirectToSignIn(props);
    }
  }, []);
  return null;
}, "RedirectToSignIn");
const RedirectToSignUp = withClerk(({ clerk, ...props }) => {
  react_default().useEffect(() => {
    void clerk.redirectToSignUp(props);
  }, []);
  return null;
}, "RedirectToSignUp");
const RedirectToUserProfile = withClerk(({ clerk }) => {
  react_default().useEffect(() => {
    clerk.redirectToUserProfile();
  }, []);
  return null;
}, "RedirectToUserProfile");
const RedirectToOrganizationProfile = withClerk(({ clerk }) => {
  react_default().useEffect(() => {
    clerk.redirectToOrganizationProfile();
  }, []);
  return null;
}, "RedirectToOrganizationProfile");
const RedirectToCreateOrganization = withClerk(({ clerk }) => {
  react_default().useEffect(() => {
    clerk.redirectToCreateOrganization();
  }, []);
  return null;
}, "RedirectToCreateOrganization");
const AuthenticateWithRedirectCallback = withClerk(
  ({ clerk, ...handleRedirectCallbackParams }) => {
    react_default().useEffect(() => {
      void clerk.handleRedirectCallback(handleRedirectCallbackParams);
    }, []);
    return null;
  },
  "AuthenticateWithRedirectCallback"
);
const MultisessionAppSupport = ({ children }) => {
  const session = useSessionContext();
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, { key: session ? session.id : "no-users" }, children);
};

//# sourceMappingURL=controlComponents.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/withUser.js




const withUser = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const user = useUserContext();
    if (!user) {
      return null;
    }
    return /* @__PURE__ */ react_default().createElement(
      Component,
      {
        ...props,
        user
      }
    );
  };
  HOC.displayName = `withUser(${displayName})`;
  return HOC;
};
const WithUser = ({ children }) => {
  const user = useUserContext();
  if (typeof children !== "function") {
    throw new Error(hocChildrenNotAFunctionError);
  }
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children(user));
};

//# sourceMappingURL=withUser.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/withSession.js




const withSession = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const session = useSessionContext();
    if (!session) {
      return null;
    }
    return /* @__PURE__ */ react_default().createElement(
      Component,
      {
        ...props,
        session
      }
    );
  };
  HOC.displayName = `withSession(${displayName})`;
  return HOC;
};
const WithSession = ({ children }) => {
  const session = useSessionContext();
  if (typeof children !== "function") {
    throw new Error(hocChildrenNotAFunctionError);
  }
  if (!session) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children(session));
};

//# sourceMappingURL=withSession.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/utils/childrenUtils.js



const assertSingleChild = (children) => (name) => {
  try {
    return react_default().Children.only(children);
  } catch (e) {
    throw new Error(multipleChildrenInButtonComponent(name));
  }
};
const normalizeWithDefaultValue = (children, defaultText) => {
  if (!children) {
    children = defaultText;
  }
  if (typeof children === "string") {
    children = /* @__PURE__ */ react_default().createElement("button", null, children);
  }
  return children;
};
const safeExecute = (cb) => (...args) => {
  if (cb && typeof cb === "function") {
    return cb(...args);
  }
};

//# sourceMappingURL=childrenUtils.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/SignInButton.js




const SignInButton = withClerk(({ clerk, children, ...props }) => {
  const { afterSignInUrl, afterSignUpUrl, redirectUrl, mode, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign in");
  const child = assertSingleChild(children)("SignInButton");
  const clickHandler = () => {
    const opts = { afterSignInUrl, afterSignUpUrl, redirectUrl };
    if (mode === "modal") {
      return clerk.openSignIn(opts);
    }
    return clerk.redirectToSignIn(opts);
  };
  const wrappedChildClickHandler = async (e) => {
    await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return react_default().cloneElement(child, childProps);
}, "SignInButton");

//# sourceMappingURL=SignInButton.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/SignUpButton.js




const SignUpButton = withClerk(({ clerk, children, ...props }) => {
  const { afterSignInUrl, afterSignUpUrl, redirectUrl, mode, unsafeMetadata, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign up");
  const child = assertSingleChild(children)("SignUpButton");
  const clickHandler = () => {
    const opts = { afterSignInUrl, afterSignUpUrl, redirectUrl, unsafeMetadata };
    if (mode === "modal") {
      return clerk.openSignUp(opts);
    }
    return clerk.redirectToSignUp(opts);
  };
  const wrappedChildClickHandler = async (e) => {
    await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return react_default().cloneElement(child, childProps);
}, "SignUpButton");

//# sourceMappingURL=SignUpButton.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/SignOutButton.js




const SignOutButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { signOutCallback, signOutOptions, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign out");
    const child = assertSingleChild(children)("SignOutButton");
    const clickHandler = () => {
      return clerk.signOut(signOutCallback, signOutOptions);
    };
    const wrappedChildClickHandler = async (e) => {
      await safeExecute(child.props.onClick)(e);
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return react_default().cloneElement(child, childProps);
  },
  "SignOutButton"
);

//# sourceMappingURL=SignOutButton.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/components/index.js











//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useUser.js


function useUser() {
  const user = useUserContext();
  if (user === void 0) {
    return { isLoaded: false, isSignedIn: void 0, user: void 0 };
  }
  if (user === null) {
    return { isLoaded: true, isSignedIn: false, user: null };
  }
  return { isLoaded: true, isSignedIn: true, user };
}

//# sourceMappingURL=useUser.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/utils.js

const clerkLoaded = (isomorphicClerk) => {
  return new Promise((resolve) => {
    if (isomorphicClerk.loaded) {
      resolve();
    }
    isomorphicClerk.addOnLoaded(resolve);
  });
};
const createGetToken = (isomorphicClerk) => {
  return async (options) => {
    await clerkLoaded(isomorphicClerk);
    if (!isomorphicClerk.session) {
      return null;
    }
    return isomorphicClerk.session.getToken(options);
  };
};
const createSignOut = (isomorphicClerk) => {
  return async (...args) => {
    await clerkLoaded(isomorphicClerk);
    return isomorphicClerk.signOut(...args);
  };
};

//# sourceMappingURL=utils.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useAuth.js






const useAuth = () => {
  const { sessionId, userId, actor, orgId, orgRole, orgSlug } = useAuthContext();
  const isomorphicClerk = useIsomorphicClerkContext();
  const getToken = (0,react_.useCallback)(createGetToken(isomorphicClerk), [isomorphicClerk]);
  const signOut = (0,react_.useCallback)(createSignOut(isomorphicClerk), [isomorphicClerk]);
  if (sessionId === void 0 && userId === void 0) {
    return {
      isLoaded: false,
      isSignedIn: void 0,
      sessionId,
      userId,
      actor: void 0,
      orgId: void 0,
      orgRole: void 0,
      orgSlug: void 0,
      signOut,
      getToken
    };
  }
  if (sessionId === null && userId === null) {
    return {
      isLoaded: true,
      isSignedIn: false,
      sessionId,
      userId,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!userId && !!orgId && !!orgRole) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor: actor || null,
      orgId,
      orgRole,
      orgSlug: orgSlug || null,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!userId && !orgId) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor: actor || null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      signOut,
      getToken
    };
  }
  throw new Error(invalidStateError);
};

//# sourceMappingURL=useAuth.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSession.js


const useSession = () => {
  const session = useSessionContext();
  if (session === void 0) {
    return { isLoaded: false, isSignedIn: void 0, session: void 0 };
  }
  if (session === null) {
    return { isLoaded: true, isSignedIn: false, session: null };
  }
  return { isLoaded: true, isSignedIn: true, session };
};

//# sourceMappingURL=useSession.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useClerk.js


const useClerk = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  return isomorphicClerk;
};

//# sourceMappingURL=useClerk.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSignIn.js



const useSignIn = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  if (!client) {
    return { isLoaded: false, signIn: void 0, setSession: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signIn: client.signIn,
    setSession: isomorphicClerk.setSession,
    setActive: isomorphicClerk.setActive
  };
};

//# sourceMappingURL=useSignIn.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSignUp.js



const useSignUp = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  if (!client) {
    return { isLoaded: false, signUp: void 0, setSession: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signUp: client.signUp,
    setSession: isomorphicClerk.setSession,
    setActive: isomorphicClerk.setActive
  };
};

//# sourceMappingURL=useSignUp.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSessionList.js



const useSessionList = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  if (!client) {
    return { isLoaded: false, sessions: void 0, setSession: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    sessions: client.sessions,
    setSession: isomorphicClerk.setSession,
    setActive: isomorphicClerk.setActive
  };
};

//# sourceMappingURL=useSessionList.js.map
;// CONCATENATED MODULE: ./node_modules/swr/infinite/dist/index.mjs





const INFINITE_PREFIX = '$inf$';
const getFirstPageKey = (getKey)=>{
    return dist_serialize(getKey ? getKey(0, null) : null)[0];
};
const dist_unstable_serialize = (getKey)=>{
    return INFINITE_PREFIX + getFirstPageKey(getKey);
};

// We have to several type castings here because `useSWRInfinite` is a special
// const INFINITE_PREFIX = '$inf$'
const EMPTY_PROMISE = Promise.resolve();
// export const unstable_serialize = (getKey: SWRInfiniteKeyLoader) => {
//   return INFINITE_PREFIX + getFirstPageKey(getKey)
// }
const infinite = (useSWRNext)=>(getKey, fn, config)=>{
        const didMountRef = (0,react_.useRef)(false);
        const { cache , initialSize =1 , revalidateAll =false , persistSize =false , revalidateFirstPage =true , revalidateOnMount =false , parallel =false  } = config;
        // The serialized key of the first page. This key will be used to store
        // metadata of this SWR infinite hook.
        let infiniteKey;
        try {
            infiniteKey = getFirstPageKey(getKey);
            if (infiniteKey) infiniteKey = INFINITE_PREFIX + infiniteKey;
        } catch (err) {
        // Not ready yet.
        }
        const [get, set, subscribeCache] = createCacheHelper(cache, infiniteKey);
        const getSnapshot = (0,react_.useCallback)(()=>{
            const size = isUndefined(get()._l) ? initialSize : get()._l;
            return size;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            cache,
            infiniteKey,
            initialSize
        ]);
        (0,shim.useSyncExternalStore)((0,react_.useCallback)((callback)=>{
            if (infiniteKey) return subscribeCache(infiniteKey, ()=>{
                callback();
            });
            return ()=>{};
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            cache,
            infiniteKey
        ]), getSnapshot, getSnapshot);
        const resolvePageSize = (0,react_.useCallback)(()=>{
            const cachedPageSize = get()._l;
            return isUndefined(cachedPageSize) ? initialSize : cachedPageSize;
        // `cache` isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            infiniteKey,
            initialSize
        ]);
        // keep the last page size to restore it with the persistSize option
        const lastPageSizeRef = (0,react_.useRef)(resolvePageSize());
        // When the page key changes, we reset the page size if it's not persisted
        useIsomorphicLayoutEffect(()=>{
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (infiniteKey) {
                // If the key has been changed, we keep the current page size if persistSize is enabled
                // Otherwise, we reset the page size to cached pageSize
                set({
                    _l: persistSize ? lastPageSizeRef.current : resolvePageSize()
                });
            }
        // `initialSize` isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            infiniteKey,
            cache
        ]);
        // Needs to check didMountRef during mounting, not in the fetcher
        const shouldRevalidateOnMount = revalidateOnMount && !didMountRef.current;
        // Actual SWR hook to load all pages in one fetcher.
        const swr = useSWRNext(infiniteKey, async (key)=>{
            // get the revalidate context
            const forceRevalidateAll = get()._i;
            // return an array of page data
            const data = [];
            const pageSize = resolvePageSize();
            const [getCache] = createCacheHelper(cache, key);
            const cacheData = getCache().data;
            const revalidators = [];
            let previousPageData = null;
            for(let i = 0; i < pageSize; ++i){
                const [pageKey, pageArg] = dist_serialize(getKey(i, parallel ? null : previousPageData));
                if (!pageKey) {
                    break;
                }
                const [getSWRCache, setSWRCache] = createCacheHelper(cache, pageKey);
                // Get the cached page data.
                let pageData = getSWRCache().data;
                // should fetch (or revalidate) if:
                // - `revalidateAll` is enabled
                // - `mutate()` called
                // - the cache is missing
                // - it's the first page and it's not the initial render
                // - `revalidateOnMount` is enabled and it's on mount
                // - cache for that page has changed
                const shouldFetchPage = revalidateAll || forceRevalidateAll || isUndefined(pageData) || revalidateFirstPage && !i && !isUndefined(cacheData) || shouldRevalidateOnMount || cacheData && !isUndefined(cacheData[i]) && !config.compare(cacheData[i], pageData);
                if (fn && shouldFetchPage) {
                    const revalidate = async ()=>{
                        pageData = await fn(pageArg);
                        setSWRCache({
                            data: pageData,
                            _k: pageArg
                        });
                        data[i] = pageData;
                    };
                    if (parallel) {
                        revalidators.push(revalidate);
                    } else {
                        await revalidate();
                    }
                } else {
                    data[i] = pageData;
                }
                if (!parallel) {
                    previousPageData = pageData;
                }
            }
            // flush all revalidateions in parallel
            if (parallel) {
                await Promise.all(revalidators.map((r)=>r()));
            }
            // once we executed the data fetching based on the context, clear the context
            set({
                _i: UNDEFINED
            });
            // return the data
            return data;
        }, config);
        const mutate = (0,react_.useCallback)(// eslint-disable-next-line func-names
        function(data, opts) {
            // When passing as a boolean, it's explicitly used to disable/enable
            // revalidation.
            const options = typeof opts === 'boolean' ? {
                revalidate: opts
            } : opts || {};
            // Default to true.
            const shouldRevalidate = options.revalidate !== false;
            // It is possible that the key is still falsy.
            if (!infiniteKey) return EMPTY_PROMISE;
            if (shouldRevalidate) {
                if (!isUndefined(data)) {
                    // We only revalidate the pages that are changed
                    set({
                        _i: false
                    });
                } else {
                    // Calling `mutate()`, we revalidate all pages
                    set({
                        _i: true
                    });
                }
            }
            return arguments.length ? swr.mutate(data, {
                ...options,
                revalidate: shouldRevalidate
            }) : swr.mutate();
        }, // swr.mutate is always the same reference
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            infiniteKey,
            cache
        ]);
        // Extend the SWR API
        const setSize = (0,react_.useCallback)((arg)=>{
            // It is possible that the key is still falsy.
            if (!infiniteKey) return EMPTY_PROMISE;
            const [, changeSize] = createCacheHelper(cache, infiniteKey);
            let size;
            if (isFunction(arg)) {
                size = arg(resolvePageSize());
            } else if (typeof arg == 'number') {
                size = arg;
            }
            if (typeof size != 'number') return EMPTY_PROMISE;
            changeSize({
                _l: size
            });
            lastPageSizeRef.current = size;
            // Calculate the page data after the size change.
            const data = [];
            const [getInfiniteCache] = createCacheHelper(cache, infiniteKey);
            let previousPageData = null;
            for(let i = 0; i < size; ++i){
                const [pageKey] = dist_serialize(getKey(i, previousPageData));
                const [getCache] = createCacheHelper(cache, pageKey);
                // Get the cached page data.
                const pageData = pageKey ? getCache().data : UNDEFINED;
                // Call `mutate` with infinte cache data if we can't get it from the page cache.
                if (isUndefined(pageData)) {
                    return mutate(getInfiniteCache().data);
                }
                data.push(pageData);
                previousPageData = pageData;
            }
            return mutate(data);
        }, // exclude getKey from the dependencies, which isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            infiniteKey,
            cache,
            mutate,
            resolvePageSize
        ]);
        // Use getter functions to avoid unnecessary re-renders caused by triggering
        // all the getters of the returned swr object.
        return {
            size: resolvePageSize(),
            setSize,
            mutate,
            get data () {
                return swr.data;
            },
            get error () {
                return swr.error;
            },
            get isValidating () {
                return swr.isValidating;
            },
            get isLoading () {
                return swr.isLoading;
            }
        };
    };
const useSWRInfinite = withMiddleware(useSWR, infinite);



;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/hooks/usePagesOrInfinite.js



function getDifferentKeys(obj1, obj2) {
  const keysSet = new Set(Object.keys(obj2));
  const differentKeysObject = {};
  for (const key1 of Object.keys(obj1)) {
    if (!keysSet.has(key1)) {
      differentKeysObject[key1] = obj1[key1];
    }
  }
  return differentKeysObject;
}
const useWithSafeValues = (params, defaultValues) => {
  const shouldUseDefaults = typeof params === "boolean" && params;
  const initialPageRef = (0,react_.useRef)(
    shouldUseDefaults ? defaultValues.initialPage : params?.initialPage ?? defaultValues.initialPage
  );
  const pageSizeRef = (0,react_.useRef)(shouldUseDefaults ? defaultValues.pageSize : params?.pageSize ?? defaultValues.pageSize);
  const newObj = {};
  for (const key of Object.keys(defaultValues)) {
    newObj[key] = shouldUseDefaults ? defaultValues[key] : params?.[key] ?? defaultValues[key];
  }
  return {
    ...newObj,
    initialPage: initialPageRef.current,
    pageSize: pageSizeRef.current
  };
};
const usePagesOrInfinite = (params, fetcher, options, cacheKeys) => {
  const [paginatedPage, setPaginatedPage] = (0,react_.useState)(params.initialPage ?? 1);
  const initialPageRef = (0,react_.useRef)(params.initialPage ?? 1);
  const pageSizeRef = (0,react_.useRef)(params.pageSize ?? 10);
  const enabled = options.enabled ?? true;
  const triggerInfinite = options.infinite ?? false;
  const keepPreviousData = options.keepPreviousData ?? false;
  const pagesCacheKey = {
    ...cacheKeys,
    ...params,
    initialPage: paginatedPage,
    pageSize: pageSizeRef.current
  };
  const {
    data: swrData,
    isValidating: swrIsValidating,
    isLoading: swrIsLoading,
    error: swrError,
    mutate: swrMutate
  } = useSWR(
    !triggerInfinite && !!fetcher && enabled ? pagesCacheKey : null,
    (cacheKeyParams) => {
      const requestParams = getDifferentKeys(cacheKeyParams, cacheKeys);
      return fetcher?.(requestParams);
    },
    { keepPreviousData }
  );
  const {
    data: swrInfiniteData,
    isLoading: swrInfiniteIsLoading,
    isValidating: swrInfiniteIsValidating,
    error: swrInfiniteError,
    size,
    setSize,
    mutate: swrInfiniteMutate
  } = useSWRInfinite(
    (pageIndex) => {
      if (!triggerInfinite || !enabled) {
        return null;
      }
      return {
        ...params,
        ...cacheKeys,
        initialPage: initialPageRef.current + pageIndex,
        pageSize: pageSizeRef.current
      };
    },
    (cacheKeyParams) => {
      const requestParams = getDifferentKeys(cacheKeyParams, cacheKeys);
      return fetcher?.(requestParams);
    }
  );
  const page = (0,react_.useMemo)(() => {
    if (triggerInfinite) {
      return size;
    }
    return paginatedPage;
  }, [triggerInfinite, size, paginatedPage]);
  const fetchPage = (0,react_.useCallback)(
    (numberOrgFn) => {
      if (triggerInfinite) {
        void setSize(numberOrgFn);
        return;
      }
      return setPaginatedPage(numberOrgFn);
    },
    [setSize]
  );
  const data = (0,react_.useMemo)(() => {
    if (triggerInfinite) {
      return swrInfiniteData?.map((a) => a?.data).flat() ?? [];
    }
    return swrData?.data ?? [];
  }, [triggerInfinite, swrData, swrInfiniteData]);
  const count = (0,react_.useMemo)(() => {
    if (triggerInfinite) {
      return swrInfiniteData?.[swrInfiniteData?.length - 1]?.total_count || 0;
    }
    return swrData?.total_count ?? 0;
  }, [triggerInfinite, swrData, swrInfiniteData]);
  const isLoading = triggerInfinite ? swrInfiniteIsLoading : swrIsLoading;
  const isFetching = triggerInfinite ? swrInfiniteIsValidating : swrIsValidating;
  const isError = !!(triggerInfinite ? swrInfiniteError : swrError);
  const fetchNext = (0,react_.useCallback)(() => {
    fetchPage((n) => Math.max(0, n + 1));
  }, [fetchPage]);
  const fetchPrevious = (0,react_.useCallback)(() => {
    fetchPage((n) => Math.max(0, n - 1));
  }, [fetchPage]);
  const offsetCount = (initialPageRef.current - 1) * pageSizeRef.current;
  const pageCount = Math.ceil((count - offsetCount) / pageSizeRef.current);
  const hasNextPage = count - offsetCount * pageSizeRef.current > page * pageSizeRef.current;
  const hasPreviousPage = (page - 1) * pageSizeRef.current > offsetCount * pageSizeRef.current;
  const unstable__mutate = triggerInfinite ? swrInfiniteMutate : swrMutate;
  return {
    data,
    count,
    isLoading,
    isFetching,
    isError,
    page,
    pageCount,
    fetchPage,
    fetchNext,
    fetchPrevious,
    hasNextPage,
    hasPreviousPage,
    unstable__mutate
  };
};

//# sourceMappingURL=usePagesOrInfinite.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/hooks/useOrganization.js



const undefinedPaginatedResource = {
  data: void 0,
  count: void 0,
  isLoading: false,
  isFetching: false,
  isError: false,
  page: void 0,
  pageCount: void 0,
  fetchPage: void 0,
  fetchNext: void 0,
  fetchPrevious: void 0,
  hasNextPage: false,
  hasPreviousPage: false
};
const useOrganization = (params) => {
  const {
    invitationList: invitationListParams,
    membershipList: membershipListParams,
    domains: domainListParams,
    membershipRequests: membershipRequestsListParams
  } = params || {};
  const { organization, lastOrganizationMember, lastOrganizationInvitation } = useOrganizationContext();
  const session = useSessionContext();
  const domainSafeValues = useWithSafeValues(domainListParams, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false,
    enrollmentMode: void 0
  });
  const membershipRequestSafeValues = useWithSafeValues(membershipRequestsListParams, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const clerk = useClerkInstanceContext();
  const shouldFetch = !!(clerk.loaded && session && organization);
  const domainParams = typeof domainListParams === "undefined" ? void 0 : {
    initialPage: domainSafeValues.initialPage,
    pageSize: domainSafeValues.pageSize,
    enrollmentMode: domainSafeValues.enrollmentMode
  };
  const membershipRequestParams = typeof membershipRequestsListParams === "undefined" ? void 0 : {
    initialPage: membershipRequestSafeValues.initialPage,
    pageSize: membershipRequestSafeValues.pageSize,
    status: membershipRequestSafeValues.status
  };
  const domains = usePagesOrInfinite(
    {
      ...domainParams
    },
    organization?.getDomains,
    {
      keepPreviousData: domainSafeValues.keepPreviousData,
      infinite: domainSafeValues.infinite,
      enabled: !!domainParams
    },
    {
      type: "domains",
      organizationId: organization?.id
    }
  );
  const membershipRequests = usePagesOrInfinite(
    {
      ...membershipRequestParams
    },
    organization?.getMembershipRequests,
    {
      keepPreviousData: membershipRequestSafeValues.keepPreviousData,
      infinite: membershipRequestSafeValues.infinite,
      enabled: !!membershipRequestParams
    },
    {
      type: "membershipRequests",
      organizationId: organization?.id
    }
  );
  const pendingInvitations = !clerk.loaded ? () => [] : () => clerk.organization?.getPendingInvitations(invitationListParams);
  const currentOrganizationMemberships = !clerk.loaded ? () => [] : () => clerk.organization?.getMemberships(membershipListParams);
  const {
    data: invitationList,
    isValidating: isInvitationsLoading,
    mutate: mutateInvitationList
  } = useSWR(
    shouldFetch && invitationListParams ? cacheKey("invites", organization, lastOrganizationInvitation, invitationListParams) : null,
    pendingInvitations
  );
  const {
    data: membershipList,
    isValidating: isMembershipsLoading,
    mutate: mutateMembershipList
  } = useSWR(
    shouldFetch && membershipListParams ? cacheKey("memberships", organization, lastOrganizationMember, membershipListParams) : null,
    currentOrganizationMemberships
  );
  if (organization === void 0) {
    return {
      isLoaded: false,
      organization: void 0,
      invitationList: void 0,
      membershipList: void 0,
      membership: void 0,
      domains: undefinedPaginatedResource,
      membershipRequests: undefinedPaginatedResource
    };
  }
  if (organization === null) {
    return {
      isLoaded: true,
      organization: null,
      invitationList: null,
      membershipList: null,
      membership: null,
      domains: null,
      membershipRequests: null
    };
  }
  if (!clerk.loaded && organization) {
    return {
      isLoaded: true,
      organization,
      invitationList: void 0,
      membershipList: void 0,
      membership: void 0,
      domains: undefinedPaginatedResource,
      membershipRequests: undefinedPaginatedResource
    };
  }
  return {
    isLoaded: !isMembershipsLoading && !isInvitationsLoading,
    organization,
    membershipList,
    membership: getCurrentOrganizationMembership(session.user.organizationMemberships, organization.id),
    // your membership in the current org
    invitationList,
    unstable__mutate: () => {
      void mutateMembershipList();
      void mutateInvitationList();
    },
    domains,
    membershipRequests
  };
};
function getCurrentOrganizationMembership(organizationMemberships, activeOrganizationId) {
  return organizationMemberships.find(
    (organizationMembership) => organizationMembership.organization.id === activeOrganizationId
  );
}
function cacheKey(type, organization, resource, pagination) {
  return [type, organization.id, resource?.id, resource?.updatedAt, pagination.offset, pagination.limit].filter(Boolean).join("-");
}

//# sourceMappingURL=useOrganization.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useOrganization.js



//# sourceMappingURL=useOrganization.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/hooks/useOrganizationList.js


const useOrganizationList = (params) => {
  const { userMemberships, userInvitations, userSuggestions } = params || {};
  const userMembershipsSafeValues = useWithSafeValues(userMemberships, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false
  });
  const userInvitationsSafeValues = useWithSafeValues(userInvitations, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const userSuggestionsSafeValues = useWithSafeValues(userSuggestions, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const clerk = useClerkInstanceContext();
  const user = useUserContext();
  const userMembershipsParams = typeof userMemberships === "undefined" ? void 0 : {
    initialPage: userMembershipsSafeValues.initialPage,
    pageSize: userMembershipsSafeValues.pageSize
  };
  const userInvitationsParams = typeof userInvitations === "undefined" ? void 0 : {
    initialPage: userInvitationsSafeValues.initialPage,
    pageSize: userInvitationsSafeValues.pageSize,
    status: userInvitationsSafeValues.status
  };
  const userSuggestionsParams = typeof userSuggestions === "undefined" ? void 0 : {
    initialPage: userSuggestionsSafeValues.initialPage,
    pageSize: userSuggestionsSafeValues.pageSize,
    status: userSuggestionsSafeValues.status
  };
  const isClerkLoaded = !!(clerk.loaded && user);
  const memberships = usePagesOrInfinite(
    {
      ...userMembershipsParams,
      paginated: true
    },
    user?.getOrganizationMemberships,
    {
      keepPreviousData: userMembershipsSafeValues.keepPreviousData,
      infinite: userMembershipsSafeValues.infinite,
      enabled: !!userMembershipsParams
    },
    {
      type: "userMemberships",
      userId: user?.id
    }
  );
  const invitations = usePagesOrInfinite(
    {
      ...userInvitationsParams
    },
    user?.getOrganizationInvitations,
    {
      keepPreviousData: userInvitationsSafeValues.keepPreviousData,
      infinite: userInvitationsSafeValues.infinite,
      enabled: !!userInvitationsParams
    },
    {
      type: "userInvitations",
      userId: user?.id
    }
  );
  const suggestions = usePagesOrInfinite(
    {
      ...userSuggestionsParams
    },
    user?.getOrganizationSuggestions,
    {
      keepPreviousData: userSuggestionsSafeValues.keepPreviousData,
      infinite: userSuggestionsSafeValues.infinite,
      enabled: !!userSuggestionsParams
    },
    {
      type: "userSuggestions",
      userId: user?.id
    }
  );
  if (!isClerkLoaded) {
    return {
      isLoaded: false,
      organizationList: void 0,
      createOrganization: void 0,
      setActive: void 0,
      userMemberships: {
        data: void 0,
        count: void 0,
        isLoading: false,
        isFetching: false,
        isError: false,
        page: void 0,
        pageCount: void 0,
        fetchPage: void 0,
        fetchNext: void 0,
        fetchPrevious: void 0,
        hasNextPage: false,
        hasPreviousPage: false,
        unstable__mutate: void 0
      },
      userInvitations: {
        data: void 0,
        count: void 0,
        isLoading: false,
        isFetching: false,
        isError: false,
        page: void 0,
        pageCount: void 0,
        fetchPage: void 0,
        fetchNext: void 0,
        fetchPrevious: void 0,
        hasNextPage: false,
        hasPreviousPage: false,
        unstable__mutate: void 0
      },
      userSuggestions: {
        data: void 0,
        count: void 0,
        isLoading: false,
        isFetching: false,
        isError: false,
        page: void 0,
        pageCount: void 0,
        fetchPage: void 0,
        fetchNext: void 0,
        fetchPrevious: void 0,
        hasNextPage: false,
        hasPreviousPage: false,
        unstable__mutate: void 0
      }
    };
  }
  return {
    isLoaded: isClerkLoaded,
    organizationList: createOrganizationList(user.organizationMemberships),
    setActive: clerk.setActive,
    createOrganization: clerk.createOrganization,
    userMemberships: memberships,
    userInvitations: invitations,
    userSuggestions: suggestions
  };
};
function createOrganizationList(organizationMemberships) {
  return organizationMemberships.map((organizationMembership) => ({
    membership: organizationMembership,
    organization: organizationMembership.organization
  }));
}

//# sourceMappingURL=useOrganizationList.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useOrganizationList.js



//# sourceMappingURL=useOrganizationList.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/hooks/useOrganizations.js

const useOrganizations = () => {
  const clerk = useClerkInstanceContext();
  if (!clerk.loaded) {
    return {
      isLoaded: false,
      createOrganization: void 0,
      getOrganizationMemberships: void 0,
      getOrganization: void 0
    };
  }
  return {
    isLoaded: true,
    createOrganization: clerk.createOrganization,
    getOrganizationMemberships: clerk.getOrganizationMemberships,
    getOrganization: clerk.getOrganization
  };
};

//# sourceMappingURL=useOrganizations.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useOrganizations.js



//# sourceMappingURL=useOrganizations.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/index.js











//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/esm/errors/Error.js
function isKnownError(error) {
  return isClerkAPIResponseError(error) || isMetamaskError(error);
}
function isClerkAPIResponseError(err) {
  return "clerkError" in err;
}
function isMetamaskError(err) {
  return "code" in err && [4001, 32602, 32603].includes(err.code) && "message" in err;
}
function parseErrors(data = []) {
  return data.length > 0 ? data.map(parseError) : [];
}
function parseError(error) {
  return {
    code: error.code,
    message: error.message,
    longMessage: error.long_message,
    meta: {
      paramName: error?.meta?.param_name,
      sessionId: error?.meta?.session_id,
      emailAddresses: error?.meta?.email_addresses,
      zxcvbn: error?.meta?.zxcvbn
    }
  };
}
class ClerkAPIResponseError extends (/* unused pure expression or super */ null && (Error)) {
  constructor(message, { data, status }) {
    super(message);
    this.toString = () => {
      return `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map(
        (e) => JSON.stringify(e)
      )}`;
    };
    Object.setPrototypeOf(this, ClerkAPIResponseError.prototype);
    this.status = status;
    this.message = message;
    this.clerkError = true;
    this.errors = parseErrors(data);
  }
}
class MagicLinkError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
    Object.setPrototypeOf(this, MagicLinkError.prototype);
  }
}
function isMagicLinkError(err) {
  return err instanceof MagicLinkError;
}
const MagicLinkErrorCode = {
  Expired: "expired",
  Failed: "failed"
};

//# sourceMappingURL=Error.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/hooks/useMagicLink.js


function useMagicLink(resource) {
  const { startMagicLinkFlow, cancelMagicLinkFlow } = react_default().useMemo(() => resource.createMagicLinkFlow(), [resource]);
  react_default().useEffect(() => {
    return cancelMagicLinkFlow;
  }, []);
  return {
    startMagicLinkFlow,
    cancelMagicLinkFlow
  };
}

//# sourceMappingURL=useMagicLink.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/clerk-react/dist/esm/index.js








//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6095:
/***/ (() => {

if (typeof window !== "undefined" && !window.global) {
  window.global = typeof global === "undefined" ? window : global;
}
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ 4092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ClientClerkProvider: () => (/* binding */ ClientClerkProvider)
});

// EXTERNAL MODULE: ./node_modules/@clerk/clerk-react/dist/esm/index.js + 57 modules
var esm = __webpack_require__(3758);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(7114);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/client-boundary/NextOptionsContext.js
var NextOptionsContext = __webpack_require__(2850);
;// CONCATENATED MODULE: ./node_modules/@clerk/nextjs/dist/esm/client-boundary/useSafeLayoutEffect.js

const useSafeLayoutEffect = typeof window !== "undefined" ? (react_default()).useLayoutEffect : (react_default()).useEffect;

//# sourceMappingURL=useSafeLayoutEffect.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/nextjs/dist/esm/app-router/client/useAwaitableNavigate.js
"use client";


const useAwaitableNavigate = () => {
  const { push } = (0,navigation.useRouter)();
  const pathname = (0,navigation.usePathname)();
  const params = (0,navigation.useSearchParams)();
  const urlKey = pathname + params.toString();
  (0,react_.useEffect)(() => {
    window.__clerk_nav_ref = (to) => {
      if (to === window.location.href.replace(window.location.origin, "")) {
        push(to);
        return Promise.resolve();
      }
      return new Promise((res) => {
        if (window.__clerk_nav_resolves_ref) {
          window.__clerk_nav_resolves_ref.push(res);
        } else {
          window.__clerk_nav_resolves_ref = [res];
        }
        push(to);
      });
    };
  }, [urlKey]);
  (0,react_.useEffect)(() => {
    if (window.__clerk_nav_resolves_ref && window.__clerk_nav_resolves_ref.length) {
      window.__clerk_nav_resolves_ref.forEach((resolve) => resolve());
    }
    window.__clerk_nav_resolves_ref = [];
  });
  return (0,react_.useCallback)((to) => {
    return window.__clerk_nav_ref(to);
  }, []);
};

//# sourceMappingURL=useAwaitableNavigate.js.map
;// CONCATENATED MODULE: ./node_modules/@clerk/nextjs/dist/esm/app-router/client/ClerkProvider.js
"use client";






const ClientClerkProvider = (props) => {
  const { __unstable_invokeMiddlewareOnAuthStateChange = true } = props;
  const router = (0,navigation.useRouter)();
  const navigate = useAwaitableNavigate();
  useSafeLayoutEffect(() => {
    window.__unstable__onBeforeSetActive = () => {
      if (__unstable_invokeMiddlewareOnAuthStateChange) {
        router.refresh();
        router.push(window.location.href);
      }
    };
    window.__unstable__onAfterSetActive = () => {
      router.refresh();
    };
  }, []);
  const mergedProps = { ...props, navigate };
  return /* @__PURE__ */ react_default().createElement(NextOptionsContext/* ClerkNextOptionsProvider */.f, { options: mergedProps }, /* @__PURE__ */ react_default().createElement(esm/* ClerkProvider */.El, { ...mergedProps }));
};

//# sourceMappingURL=ClerkProvider.js.map

/***/ }),

/***/ 2850:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ ClerkNextOptionsProvider),
/* harmony export */   k: () => (/* binding */ useClerkNextOptions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ClerkNextOptionsCtx = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(void 0);
ClerkNextOptionsCtx.displayName = "ClerkNextOptionsCtx";
const useClerkNextOptions = () => {
  const ctx = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(ClerkNextOptionsCtx);
  return ctx.value;
};
const ClerkNextOptionsProvider = (props) => {
  const { children, options } = props;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ClerkNextOptionsCtx.Provider, { value: { value: options } }, children);
};

//# sourceMappingURL=NextOptionsContext.js.map

/***/ }),

/***/ 2990:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticateWithRedirectCallback: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.vn),
/* harmony export */   ClerkLoaded: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.a7),
/* harmony export */   ClerkLoading: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.qI),
/* harmony export */   MultisessionAppSupport: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.KM),
/* harmony export */   RedirectToCreateOrganization: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.gM),
/* harmony export */   RedirectToOrganizationProfile: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.yB),
/* harmony export */   RedirectToSignIn: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.N1),
/* harmony export */   RedirectToSignUp: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.C2),
/* harmony export */   RedirectToUserProfile: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.sO),
/* harmony export */   SignedIn: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.CH),
/* harmony export */   SignedOut: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.tj)
/* harmony export */ });
/* harmony import */ var _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3758);
"use client";


//# sourceMappingURL=controlComponents.js.map

/***/ }),

/***/ 4102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MagicLinkErrorCode: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.X1),
/* harmony export */   WithClerk: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__._E),
/* harmony export */   WithSession: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.CJ),
/* harmony export */   WithUser: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.Gi),
/* harmony export */   isClerkAPIResponseError: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.kD),
/* harmony export */   isKnownError: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.sZ),
/* harmony export */   isMagicLinkError: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.V9),
/* harmony export */   isMetamaskError: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.ZC),
/* harmony export */   useAuth: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.aC),
/* harmony export */   useClerk: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.ll),
/* harmony export */   useMagicLink: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.jS),
/* harmony export */   useOrganization: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.o8),
/* harmony export */   useOrganizationList: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.eW),
/* harmony export */   useOrganizations: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.qi),
/* harmony export */   useSession: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.kP),
/* harmony export */   useSessionList: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.xo),
/* harmony export */   useSignIn: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.zq),
/* harmony export */   useSignUp: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.QS),
/* harmony export */   useUser: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.aF),
/* harmony export */   withClerk: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.r0),
/* harmony export */   withSession: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.NA),
/* harmony export */   withUser: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.ns)
/* harmony export */ });
/* harmony import */ var _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3758);
"use client";



//# sourceMappingURL=hooks.js.map

/***/ }),

/***/ 4390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateOrganization: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.Gp),
/* harmony export */   OrganizationProfile: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.A),
/* harmony export */   OrganizationSwitcher: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.Li),
/* harmony export */   SignIn: () => (/* binding */ SignIn),
/* harmony export */   SignInButton: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.$d),
/* harmony export */   SignOutButton: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.AM),
/* harmony export */   SignUp: () => (/* binding */ SignUp),
/* harmony export */   SignUpButton: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.gX),
/* harmony export */   UserButton: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.l8),
/* harmony export */   UserProfile: () => (/* reexport safe */ _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__.Iw)
/* harmony export */ });
/* harmony import */ var _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3758);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NextOptionsContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2850);
"use client";




const SignIn = (props) => {
  const { signInUrl: repoLevelSignInUrl } = (0,_NextOptionsContext__WEBPACK_IMPORTED_MODULE_2__/* .useClerkNextOptions */ .k)();
  if (repoLevelSignInUrl) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(
      _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__/* .SignIn */ .cL,
      {
        routing: "path",
        path: repoLevelSignInUrl,
        ...props
      }
    );
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__/* .SignIn */ .cL, { ...props });
};
const SignUp = (props) => {
  const { signUpUrl: repoLevelSignUpUrl } = (0,_NextOptionsContext__WEBPACK_IMPORTED_MODULE_2__/* .useClerkNextOptions */ .k)();
  if (repoLevelSignUpUrl) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(
      _clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__/* .SignUp */ .Mo,
      {
        routing: "path",
        path: repoLevelSignUpUrl,
        ...props
      }
    );
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_clerk_clerk_react__WEBPACK_IMPORTED_MODULE_0__/* .SignUp */ .Mo, { ...props });
};

//# sourceMappingURL=uiComponents.js.map

/***/ }),

/***/ 1072:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var e=__webpack_require__(8038);function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=/*#__PURE__*/t(e);const r=["light","dark"],a="(prefers-color-scheme: dark)",o="undefined"==typeof window,s=/*#__PURE__*/e.createContext(void 0),l={setTheme:e=>{},themes:[]},c=["light","dark"],m=({forcedTheme:t,disableTransitionOnChange:o=!1,enableSystem:l=!0,enableColorScheme:m=!0,storageKey:f="theme",themes:y=c,defaultTheme:v=(l?"system":"light"),attribute:$="data-theme",value:g,children:b,nonce:S})=>{const[T,p]=e.useState(()=>d(f,v)),[w,C]=e.useState(()=>d(f)),E=g?Object.values(g):y,k=e.useCallback(e=>{let t=e;if(!t)return;"system"===e&&l&&(t=h());const n=g?g[t]:t,a=o?u():null,s=document.documentElement;if("class"===$?(s.classList.remove(...E),n&&s.classList.add(n)):n?s.setAttribute($,n):s.removeAttribute($),m){const e=r.includes(v)?v:null,n=r.includes(t)?t:e;s.style.colorScheme=n}null==a||a()},[]),x=e.useCallback(e=>{p(e);try{localStorage.setItem(f,e)}catch(e){}},[t]),L=e.useCallback(e=>{const n=h(e);C(n),"system"===T&&l&&!t&&k("system")},[T,t]);e.useEffect(()=>{const e=window.matchMedia(a);return e.addListener(L),L(e),()=>e.removeListener(L)},[L]),e.useEffect(()=>{const e=e=>{e.key===f&&x(e.newValue||v)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[x]),e.useEffect(()=>{k(null!=t?t:T)},[t,T]);const I=e.useMemo(()=>({theme:T,setTheme:x,forcedTheme:t,resolvedTheme:"system"===T?w:T,themes:l?[...y,"system"]:y,systemTheme:l?w:void 0}),[T,x,t,w,l,y]);/*#__PURE__*/return n.default.createElement(s.Provider,{value:I},/*#__PURE__*/n.default.createElement(i,{forcedTheme:t,disableTransitionOnChange:o,enableSystem:l,enableColorScheme:m,storageKey:f,themes:y,defaultTheme:v,attribute:$,value:g,children:b,attrs:E,nonce:S}),b)},i=/*#__PURE__*/e.memo(({forcedTheme:e,storageKey:t,attribute:o,enableSystem:s,enableColorScheme:l,defaultTheme:c,value:m,attrs:i,nonce:d})=>{const u="system"===c,h="class"===o?`var d=document.documentElement,c=d.classList;c.remove(${i.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${o}',s='setAttribute';`,f=l?r.includes(c)&&c?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${c}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",y=(e,t=!1,n=!0)=>{const a=m?m[e]:e,s=t?e+"|| ''":`'${a}'`;let c="";return l&&n&&!t&&r.includes(e)&&(c+=`d.style.colorScheme = '${e}';`),"class"===o?c+=t||a?`c.add(${s})`:"null":a&&(c+=`d[s](n,${s})`),c},v=e?`!function(){${h}${y(e)}}()`:s?`!function(){try{${h}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${a}',m=window.matchMedia(t);if(m.media!==t||m.matches){${y("dark")}}else{${y("light")}}}else if(e){${m?`var x=${JSON.stringify(m)};`:""}${y(m?"x[e]":"e",!0)}}${u?"":"else{"+y(c,!1,!1)+"}"}${f}}catch(e){}}()`:`!function(){try{${h}var e=localStorage.getItem('${t}');if(e){${m?`var x=${JSON.stringify(m)};`:""}${y(m?"x[e]":"e",!0)}}else{${y(c,!1,!1)};}${f}}catch(t){}}();`;/*#__PURE__*/return n.default.createElement("script",{nonce:d,dangerouslySetInnerHTML:{__html:v}})},()=>!0),d=(e,t)=>{if(o)return;let n;try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t},u=()=>{const e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},h=e=>(e||(e=window.matchMedia(a)),e.matches?"dark":"light");exports.f=t=>e.useContext(s)?/*#__PURE__*/n.default.createElement(e.Fragment,null,t.children):/*#__PURE__*/n.default.createElement(m,t),exports.F=()=>{var t;return null!==(t=e.useContext(s))&&void 0!==t?t:l};


/***/ }),

/***/ 9633:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Plus_Jakarta_Sans_d21556', '__Plus_Jakarta_Sans_Fallback_d21556'","fontStyle":"normal"},
	"className": "__className_d21556"
};


/***/ }),

/***/ 4578:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addBasePath", ({
    enumerable: true,
    get: function() {
        return addBasePath;
    }
}));
const _addpathprefix = __webpack_require__(893);
const _normalizetrailingslash = __webpack_require__(1094);
const basePath =  false || "";
function addBasePath(path, required) {
    return (0, _normalizetrailingslash.normalizePathTrailingSlash)( false ? 0 : (0, _addpathprefix.addPathPrefix)(path, basePath));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map


/***/ }),

/***/ 6937:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "callServer", ({
    enumerable: true,
    get: function() {
        return callServer;
    }
}));
const _approuter = __webpack_require__(2987);
async function callServer(actionId, actionArgs) {
    const actionDispatcher = (0, _approuter.getServerActionDispatcher)();
    if (!actionDispatcher) {
        throw new Error("Invariant: missing action dispatcher.");
    }
    return new Promise((resolve, reject)=>{
        actionDispatcher({
            actionId,
            actionArgs,
            resolve,
            reject
        });
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-call-server.js.map


/***/ }),

/***/ 3049:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "AppRouterAnnouncer", ({
    enumerable: true,
    get: function() {
        return AppRouterAnnouncer;
    }
}));
const _react = __webpack_require__(8038);
const _reactdom = __webpack_require__(8704);
const ANNOUNCER_TYPE = "next-route-announcer";
const ANNOUNCER_ID = "__next-route-announcer__";
function getAnnouncerNode() {
    var _existingAnnouncer_shadowRoot;
    const existingAnnouncer = document.getElementsByName(ANNOUNCER_TYPE)[0];
    if (existingAnnouncer == null ? void 0 : (_existingAnnouncer_shadowRoot = existingAnnouncer.shadowRoot) == null ? void 0 : _existingAnnouncer_shadowRoot.childNodes[0]) {
        return existingAnnouncer.shadowRoot.childNodes[0];
    } else {
        const container = document.createElement(ANNOUNCER_TYPE);
        container.style.cssText = "position:absolute";
        const announcer = document.createElement("div");
        announcer.ariaLive = "assertive";
        announcer.id = ANNOUNCER_ID;
        announcer.role = "alert";
        announcer.style.cssText = "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal";
        // Use shadow DOM here to avoid any potential CSS bleed
        const shadow = container.attachShadow({
            mode: "open"
        });
        shadow.appendChild(announcer);
        document.body.appendChild(container);
        return announcer;
    }
}
function AppRouterAnnouncer(param) {
    let { tree } = param;
    const [portalNode, setPortalNode] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        const announcer = getAnnouncerNode();
        setPortalNode(announcer);
        return ()=>{
            const container = document.getElementsByTagName(ANNOUNCER_TYPE)[0];
            if (container == null ? void 0 : container.isConnected) {
                document.body.removeChild(container);
            }
        };
    }, []);
    const [routeAnnouncement, setRouteAnnouncement] = (0, _react.useState)("");
    const previousTitle = (0, _react.useRef)();
    (0, _react.useEffect)(()=>{
        let currentTitle = "";
        if (document.title) {
            currentTitle = document.title;
        } else {
            const pageHeader = document.querySelector("h1");
            if (pageHeader) {
                currentTitle = pageHeader.innerText || pageHeader.textContent || "";
            }
        }
        // Only announce the title change, but not for the first load because screen
        // readers do that automatically.
        if (previousTitle.current !== undefined) {
            setRouteAnnouncement(currentTitle);
        }
        previousTitle.current = currentTitle;
    }, [
        tree
    ]);
    return portalNode ? /*#__PURE__*/ (0, _reactdom.createPortal)(routeAnnouncement, portalNode) : null;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-announcer.js.map


/***/ }),

/***/ 6265:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RSC: function() {
        return RSC;
    },
    ACTION: function() {
        return ACTION;
    },
    NEXT_ROUTER_STATE_TREE: function() {
        return NEXT_ROUTER_STATE_TREE;
    },
    NEXT_ROUTER_PREFETCH: function() {
        return NEXT_ROUTER_PREFETCH;
    },
    NEXT_URL: function() {
        return NEXT_URL;
    },
    FETCH_CACHE_HEADER: function() {
        return FETCH_CACHE_HEADER;
    },
    RSC_CONTENT_TYPE_HEADER: function() {
        return RSC_CONTENT_TYPE_HEADER;
    },
    RSC_VARY_HEADER: function() {
        return RSC_VARY_HEADER;
    },
    FLIGHT_PARAMETERS: function() {
        return FLIGHT_PARAMETERS;
    },
    NEXT_RSC_UNION_QUERY: function() {
        return NEXT_RSC_UNION_QUERY;
    }
});
const RSC = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const FETCH_CACHE_HEADER = "x-vercel-sc-headers";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc";
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-headers.js.map


/***/ }),

/***/ 2987:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getServerActionDispatcher: function() {
        return getServerActionDispatcher;
    },
    urlToUrlWithoutFlightMarker: function() {
        return urlToUrlWithoutFlightMarker;
    },
    default: function() {
        return AppRouter;
    }
});
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(8038));
const _approutercontext = __webpack_require__(7085);
const _routerreducer = __webpack_require__(7189);
const _routerreducertypes = __webpack_require__(2836);
const _createhreffromurl = __webpack_require__(4331);
const _hooksclientcontext = __webpack_require__(9569);
const _usereducerwithdevtools = __webpack_require__(7951);
const _errorboundary = __webpack_require__(1232);
const _createinitialrouterstate = __webpack_require__(1684);
const _isbot = __webpack_require__(8735);
const _addbasepath = __webpack_require__(4578);
const _approuterannouncer = __webpack_require__(3049);
const _redirectboundary = __webpack_require__(1442);
const _findheadincache = __webpack_require__(1333);
const _infinitepromise = __webpack_require__(6360);
const _approuterheaders = __webpack_require__(6265);
const _removebasepath = __webpack_require__(2666);
const _hasbasepath = __webpack_require__(4374);
const isServer = "undefined" === "undefined";
// Ensure the initialParallelRoutes are not combined because of double-rendering in the browser with Strict Mode.
let initialParallelRoutes = isServer ? null : new Map();
let globalServerActionDispatcher = null;
function getServerActionDispatcher() {
    return globalServerActionDispatcher;
}
function urlToUrlWithoutFlightMarker(url) {
    const urlWithoutFlightParameters = new URL(url, location.origin);
    urlWithoutFlightParameters.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
    if (true) {
        if (false) {}
    }
    return urlWithoutFlightParameters;
}
function isExternalURL(url) {
    return url.origin !== window.location.origin;
}
function HistoryUpdater(param) {
    let { tree, pushRef, canonicalUrl, sync } = param;
    (0, _react.useInsertionEffect)(()=>{
        // Identifier is shortened intentionally.
        // __NA is used to identify if the history entry can be handled by the app-router.
        // __N is used to identify if the history entry can be handled by the old router.
        const historyState = {
            __NA: true,
            tree
        };
        if (pushRef.pendingPush && (0, _createhreffromurl.createHrefFromUrl)(new URL(window.location.href)) !== canonicalUrl) {
            // This intentionally mutates React state, pushRef is overwritten to ensure additional push/replace calls do not trigger an additional history entry.
            pushRef.pendingPush = false;
            window.history.pushState(historyState, "", canonicalUrl);
        } else {
            window.history.replaceState(historyState, "", canonicalUrl);
        }
        sync();
    }, [
        tree,
        pushRef,
        canonicalUrl,
        sync
    ]);
    return null;
}
const createEmptyCacheNode = ()=>({
        status: _approutercontext.CacheStates.LAZY_INITIALIZED,
        data: null,
        subTreeData: null,
        parallelRoutes: new Map()
    });
function useServerActionDispatcher(dispatch) {
    const serverActionDispatcher = (0, _react.useCallback)((actionPayload)=>{
        (0, _react.startTransition)(()=>{
            dispatch({
                ...actionPayload,
                type: _routerreducertypes.ACTION_SERVER_ACTION,
                mutable: {},
                cache: createEmptyCacheNode()
            });
        });
    }, [
        dispatch
    ]);
    globalServerActionDispatcher = serverActionDispatcher;
}
/**
 * Server response that only patches the cache and tree.
 */ function useChangeByServerResponse(dispatch) {
    return (0, _react.useCallback)((previousTree, flightData, overrideCanonicalUrl)=>{
        (0, _react.startTransition)(()=>{
            dispatch({
                type: _routerreducertypes.ACTION_SERVER_PATCH,
                flightData,
                previousTree,
                overrideCanonicalUrl,
                cache: createEmptyCacheNode(),
                mutable: {}
            });
        });
    }, [
        dispatch
    ]);
}
function useNavigate(dispatch) {
    return (0, _react.useCallback)((href, navigateType, forceOptimisticNavigation, shouldScroll)=>{
        const url = new URL((0, _addbasepath.addBasePath)(href), location.href);
        return dispatch({
            type: _routerreducertypes.ACTION_NAVIGATE,
            url,
            isExternalUrl: isExternalURL(url),
            locationSearch: location.search,
            forceOptimisticNavigation,
            shouldScroll: shouldScroll != null ? shouldScroll : true,
            navigateType,
            cache: createEmptyCacheNode(),
            mutable: {}
        });
    }, [
        dispatch
    ]);
}
/**
 * The global router that wraps the application components.
 */ function Router(param) {
    let { buildId, initialHead, initialTree, initialCanonicalUrl, children, assetPrefix } = param;
    const initialState = (0, _react.useMemo)(()=>(0, _createinitialrouterstate.createInitialRouterState)({
            buildId,
            children,
            initialCanonicalUrl,
            initialTree,
            initialParallelRoutes,
            isServer,
            location: !isServer ? window.location : null,
            initialHead
        }), [
        buildId,
        children,
        initialCanonicalUrl,
        initialTree,
        initialHead
    ]);
    const [{ tree, cache, prefetchCache, pushRef, focusAndScrollRef, canonicalUrl, nextUrl }, dispatch, sync] = (0, _usereducerwithdevtools.useReducerWithReduxDevtools)(_routerreducer.reducer, initialState);
    (0, _react.useEffect)(()=>{
        // Ensure initialParallelRoutes is cleaned up from memory once it's used.
        initialParallelRoutes = null;
    }, []);
    // Add memoized pathname/query for useSearchParams and usePathname.
    const { searchParams, pathname } = (0, _react.useMemo)(()=>{
        const url = new URL(canonicalUrl,  true ? "http://n" : 0);
        return {
            // This is turned into a readonly class in `useSearchParams`
            searchParams: url.searchParams,
            pathname: (0, _hasbasepath.hasBasePath)(url.pathname) ? (0, _removebasepath.removeBasePath)(url.pathname) : url.pathname
        };
    }, [
        canonicalUrl
    ]);
    const changeByServerResponse = useChangeByServerResponse(dispatch);
    const navigate = useNavigate(dispatch);
    useServerActionDispatcher(dispatch);
    /**
   * The app router that is exposed through `useRouter`. It's only concerned with dispatching actions to the reducer, does not hold state.
   */ const appRouter = (0, _react.useMemo)(()=>{
        const routerInstance = {
            back: ()=>window.history.back(),
            forward: ()=>window.history.forward(),
            prefetch: (href, options)=>{
                // Don't prefetch for bots as they don't navigate.
                // Don't prefetch during development (improves compilation performance)
                if ((0, _isbot.isBot)(window.navigator.userAgent) || "production" === "development") {
                    return;
                }
                const url = new URL((0, _addbasepath.addBasePath)(href), location.href);
                // External urls can't be prefetched in the same way.
                if (isExternalURL(url)) {
                    return;
                }
                (0, _react.startTransition)(()=>{
                    var _options_kind;
                    dispatch({
                        type: _routerreducertypes.ACTION_PREFETCH,
                        url,
                        kind: (_options_kind = options == null ? void 0 : options.kind) != null ? _options_kind : _routerreducertypes.PrefetchKind.FULL
                    });
                });
            },
            replace: (href, options)=>{
                if (options === void 0) options = {};
                (0, _react.startTransition)(()=>{
                    var _options_scroll;
                    navigate(href, "replace", Boolean(options.forceOptimisticNavigation), (_options_scroll = options.scroll) != null ? _options_scroll : true);
                });
            },
            push: (href, options)=>{
                if (options === void 0) options = {};
                (0, _react.startTransition)(()=>{
                    var _options_scroll;
                    navigate(href, "push", Boolean(options.forceOptimisticNavigation), (_options_scroll = options.scroll) != null ? _options_scroll : true);
                });
            },
            refresh: ()=>{
                (0, _react.startTransition)(()=>{
                    dispatch({
                        type: _routerreducertypes.ACTION_REFRESH,
                        cache: createEmptyCacheNode(),
                        mutable: {},
                        origin: window.location.origin
                    });
                });
            },
            // @ts-ignore we don't want to expose this method at all
            fastRefresh: ()=>{
                if (true) {
                    throw new Error("fastRefresh can only be used in development mode. Please use refresh instead.");
                } else {}
            }
        };
        return routerInstance;
    }, [
        dispatch,
        navigate
    ]);
    (0, _react.useEffect)(()=>{
        // Exists for debugging purposes. Don't use in application code.
        if (window.next) {
            window.next.router = appRouter;
        }
    }, [
        appRouter
    ]);
    if (false) {}
    (0, _react.useEffect)(()=>{
        // If the app is restored from bfcache, it's possible that
        // pushRef.mpaNavigation is true, which would mean that any re-render of this component
        // would trigger the mpa navigation logic again from the lines below.
        // This will restore the router to the initial state in the event that the app is restored from bfcache.
        function handlePageShow(event) {
            var _window_history_state;
            if (!event.persisted || !((_window_history_state = window.history.state) == null ? void 0 : _window_history_state.tree)) return;
            dispatch({
                type: _routerreducertypes.ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: window.history.state.tree
            });
        }
        window.addEventListener("pageshow", handlePageShow);
        return ()=>{
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, [
        dispatch
    ]);
    // When mpaNavigation flag is set do a hard navigation to the new url.
    // Infinitely suspend because we don't actually want to rerender any child
    // components with the new URL and any entangled state updates shouldn't
    // commit either (eg: useTransition isPending should stay true until the page
    // unloads).
    //
    // This is a side effect in render. Don't try this at home, kids. It's
    // probably safe because we know this is a singleton component and it's never
    // in <Offscreen>. At least I hope so. (It will run twice in dev strict mode,
    // but that's... fine?)
    if (pushRef.mpaNavigation) {
        const location1 = window.location;
        if (pushRef.pendingPush) {
            location1.assign(canonicalUrl);
        } else {
            location1.replace(canonicalUrl);
        }
        // TODO-APP: Should we listen to navigateerror here to catch failed
        // navigations somehow? And should we call window.stop() if a SPA navigation
        // should interrupt an MPA one?
        (0, _react.use)((0, _infinitepromise.createInfinitePromise)());
    }
    /**
   * Handle popstate event, this is used to handle back/forward in the browser.
   * By default dispatches ACTION_RESTORE, however if the history entry was not pushed/replaced by app-router it will reload the page.
   * That case can happen when the old router injected the history entry.
   */ const onPopState = (0, _react.useCallback)((param)=>{
        let { state } = param;
        if (!state) {
            // TODO-APP: this case only happens when pushState/replaceState was called outside of Next.js. It should probably reload the page in this case.
            return;
        }
        // This case happens when the history entry was pushed by the `pages` router.
        if (!state.__NA) {
            window.location.reload();
            return;
        }
        // @ts-ignore useTransition exists
        // TODO-APP: Ideally the back button should not use startTransition as it should apply the updates synchronously
        // Without startTransition works if the cache is there for this path
        (0, _react.startTransition)(()=>{
            dispatch({
                type: _routerreducertypes.ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: state.tree
            });
        });
    }, [
        dispatch
    ]);
    // Register popstate event to call onPopstate.
    (0, _react.useEffect)(()=>{
        window.addEventListener("popstate", onPopState);
        return ()=>{
            window.removeEventListener("popstate", onPopState);
        };
    }, [
        onPopState
    ]);
    const head = (0, _react.useMemo)(()=>{
        return (0, _findheadincache.findHeadInCache)(cache, tree[1]);
    }, [
        cache,
        tree
    ]);
    let content = /*#__PURE__*/ _react.default.createElement(_redirectboundary.RedirectBoundary, null, head, cache.subTreeData, /*#__PURE__*/ _react.default.createElement(_approuterannouncer.AppRouterAnnouncer, {
        tree: tree
    }));
    if (false) {}
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(HistoryUpdater, {
        tree: tree,
        pushRef: pushRef,
        canonicalUrl: canonicalUrl,
        sync: sync
    }), /*#__PURE__*/ _react.default.createElement(_hooksclientcontext.PathnameContext.Provider, {
        value: pathname
    }, /*#__PURE__*/ _react.default.createElement(_hooksclientcontext.SearchParamsContext.Provider, {
        value: searchParams
    }, /*#__PURE__*/ _react.default.createElement(_approutercontext.GlobalLayoutRouterContext.Provider, {
        value: {
            buildId,
            changeByServerResponse,
            tree,
            focusAndScrollRef,
            nextUrl
        }
    }, /*#__PURE__*/ _react.default.createElement(_approutercontext.AppRouterContext.Provider, {
        value: appRouter
    }, /*#__PURE__*/ _react.default.createElement(_approutercontext.LayoutRouterContext.Provider, {
        value: {
            childNodes: cache.parallelRoutes,
            tree: tree,
            // Root node always has `url`
            // Provided in AppTreeContext to ensure it can be overwritten in layout-router
            url: canonicalUrl
        }
    }, content))))));
}
function AppRouter(props) {
    const { globalErrorComponent, ...rest } = props;
    return /*#__PURE__*/ _react.default.createElement(_errorboundary.ErrorBoundary, {
        errorComponent: globalErrorComponent
    }, /*#__PURE__*/ _react.default.createElement(Router, rest));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 5661:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "bailoutToClientRendering", ({
    enumerable: true,
    get: function() {
        return bailoutToClientRendering;
    }
}));
const _dynamicnossr = __webpack_require__(9708);
const _staticgenerationasyncstorage = __webpack_require__(3539);
function bailoutToClientRendering() {
    const staticGenerationStore = _staticgenerationasyncstorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        (0, _dynamicnossr.suspense)();
    }
    return false;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 2633:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "clientHookInServerComponentError", ({
    enumerable: true,
    get: function() {
        return clientHookInServerComponentError;
    }
}));
const _interop_require_default = __webpack_require__(2147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8038));
function clientHookInServerComponentError(hookName) {
    if (false) {}
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-hook-in-server-component-error.js.map


/***/ }),

/***/ 1232:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ErrorBoundaryHandler: function() {
        return ErrorBoundaryHandler;
    },
    GlobalError: function() {
        return GlobalError;
    },
    // Exported so that the import signature in the loaders can be identical to user
    // supplied custom global error signatures.
    default: function() {
        return _default;
    },
    ErrorBoundary: function() {
        return ErrorBoundary;
    }
});
const _interop_require_default = __webpack_require__(2147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8038));
const _navigation = __webpack_require__(696);
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "28px",
        margin: "0 8px"
    }
};
class ErrorBoundaryHandler extends _react.default.Component {
    static getDerivedStateFromError(error) {
        return {
            error
        };
    }
    static getDerivedStateFromProps(props, state) {
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.error) {
            return {
                error: null,
                previousPathname: props.pathname
            };
        }
        return {
            error: state.error,
            previousPathname: props.pathname
        };
    }
    render() {
        if (this.state.error) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, this.props.errorStyles, /*#__PURE__*/ _react.default.createElement(this.props.errorComponent, {
                error: this.state.error,
                reset: this.reset
            }));
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.reset = ()=>{
            this.setState({
                error: null
            });
        };
        this.state = {
            error: null,
            previousPathname: this.props.pathname
        };
    }
}
function GlobalError(param) {
    let { error } = param;
    const digest = error == null ? void 0 : error.digest;
    return /*#__PURE__*/ _react.default.createElement("html", {
        id: "__next_error__"
    }, /*#__PURE__*/ _react.default.createElement("head", null), /*#__PURE__*/ _react.default.createElement("body", null, /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.error
    }, /*#__PURE__*/ _react.default.createElement("div", null, /*#__PURE__*/ _react.default.createElement("h2", {
        style: styles.text
    }, "Application error: a " + (digest ? "server" : "client") + "-side exception has occurred (see the " + (digest ? "server logs" : "browser console") + " for more information)."), digest ? /*#__PURE__*/ _react.default.createElement("p", {
        style: styles.text
    }, "Digest: " + digest) : null))));
}
const _default = GlobalError;
function ErrorBoundary(param) {
    let { errorComponent, errorStyles, children } = param;
    const pathname = (0, _navigation.usePathname)();
    if (errorComponent) {
        return /*#__PURE__*/ _react.default.createElement(ErrorBoundaryHandler, {
            pathname: pathname,
            errorComponent: errorComponent,
            errorStyles: errorStyles
        }, children);
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 8047:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DYNAMIC_ERROR_CODE: function() {
        return DYNAMIC_ERROR_CODE;
    },
    DynamicServerError: function() {
        return DynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
class DynamicServerError extends Error {
    constructor(type){
        super("Dynamic server usage: " + type);
        this.digest = DYNAMIC_ERROR_CODE;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map


/***/ }),

/***/ 6360:
/***/ ((module, exports) => {

"use strict";
/**
 * Used to cache in createInfinitePromise
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createInfinitePromise", ({
    enumerable: true,
    get: function() {
        return createInfinitePromise;
    }
}));
let infinitePromise;
function createInfinitePromise() {
    if (!infinitePromise) {
        // Only create the Promise once
        infinitePromise = new Promise(()=>{
        // This is used to debug when the rendering is never updated.
        // setTimeout(() => {
        //   infinitePromise = new Error('Infinite promise')
        //   resolve()
        // }, 5000)
        });
    }
    return infinitePromise;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=infinite-promise.js.map


/***/ }),

/***/ 831:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return OuterLayoutRouter;
    }
}));
const _interop_require_default = __webpack_require__(2147);
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(8038));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8704));
const _approutercontext = __webpack_require__(7085);
const _fetchserverresponse = __webpack_require__(8080);
const _infinitepromise = __webpack_require__(6360);
const _errorboundary = __webpack_require__(1232);
const _matchsegments = __webpack_require__(7618);
const _handlesmoothscroll = __webpack_require__(7887);
const _redirectboundary = __webpack_require__(1442);
const _notfoundboundary = __webpack_require__(6505);
const _getsegmentvalue = __webpack_require__(7741);
const _createroutercachekey = __webpack_require__(8870);
/**
 * Add refetch marker to router state at the point of the current layout segment.
 * This ensures the response returned is not further down than the current layout segment.
 */ function walkAddRefetch(segmentPathToWalk, treeToRecreate) {
    if (segmentPathToWalk) {
        const [segment, parallelRouteKey] = segmentPathToWalk;
        const isLast = segmentPathToWalk.length === 2;
        if ((0, _matchsegments.matchSegment)(treeToRecreate[0], segment)) {
            if (treeToRecreate[1].hasOwnProperty(parallelRouteKey)) {
                if (isLast) {
                    const subTree = walkAddRefetch(undefined, treeToRecreate[1][parallelRouteKey]);
                    return [
                        treeToRecreate[0],
                        {
                            ...treeToRecreate[1],
                            [parallelRouteKey]: [
                                subTree[0],
                                subTree[1],
                                subTree[2],
                                "refetch"
                            ]
                        }
                    ];
                }
                return [
                    treeToRecreate[0],
                    {
                        ...treeToRecreate[1],
                        [parallelRouteKey]: walkAddRefetch(segmentPathToWalk.slice(2), treeToRecreate[1][parallelRouteKey])
                    }
                ];
            }
        }
    }
    return treeToRecreate;
}
// TODO-APP: Replace with new React API for finding dom nodes without a `ref` when available
/**
 * Wraps ReactDOM.findDOMNode with additional logic to hide React Strict Mode warning
 */ function findDOMNode(instance) {
    // Tree-shake for server bundle
    if (true) return null;
    // Only apply strict mode warning when not in production
    if (false) {}
    return _reactdom.default.findDOMNode(instance);
}
const rectProperties = [
    "bottom",
    "height",
    "left",
    "right",
    "top",
    "width",
    "x",
    "y"
];
/**
 * Check if a HTMLElement is hidden or fixed/sticky position
 */ function shouldSkipElement(element) {
    // we ignore fixed or sticky positioned elements since they'll likely pass the "in-viewport" check
    // and will result in a situation we bail on scroll because of something like a fixed nav,
    // even though the actual page content is offscreen
    if ([
        "sticky",
        "fixed"
    ].includes(getComputedStyle(element).position)) {
        if (false) {}
        return true;
    }
    // Uses `getBoundingClientRect` to check if the element is hidden instead of `offsetParent`
    // because `offsetParent` doesn't consider document/body
    const rect = element.getBoundingClientRect();
    return rectProperties.every((item)=>rect[item] === 0);
}
/**
 * Check if the top corner of the HTMLElement is in the viewport.
 */ function topOfElementInViewport(element, viewportHeight) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= viewportHeight;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === "top") {
        return document.body;
    }
    var _document_getElementById;
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return (_document_getElementById = document.getElementById(hashFragment)) != null ? _document_getElementById : document.getElementsByName(hashFragment)[0];
}
class InnerScrollAndFocusHandler extends _react.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        // Because this property is overwritten in handlePotentialScroll it's fine to always run it when true as it'll be set to false for subsequent renders.
        if (this.props.focusAndScrollRef.apply) {
            this.handlePotentialScroll();
        }
    }
    render() {
        return this.props.children;
    }
    constructor(...args){
        super(...args);
        this.handlePotentialScroll = ()=>{
            // Handle scroll and focus, it's only applied once in the first useEffect that triggers that changed.
            const { focusAndScrollRef, segmentPath } = this.props;
            if (focusAndScrollRef.apply) {
                // segmentPaths is an array of segment paths that should be scrolled to
                // if the current segment path is not in the array, the scroll is not applied
                // unless the array is empty, in which case the scroll is always applied
                if (focusAndScrollRef.segmentPaths.length !== 0 && !focusAndScrollRef.segmentPaths.some((scrollRefSegmentPath)=>segmentPath.every((segment, index)=>(0, _matchsegments.matchSegment)(segment, scrollRefSegmentPath[index])))) {
                    return;
                }
                let domNode = null;
                const hashFragment = focusAndScrollRef.hashFragment;
                if (hashFragment) {
                    domNode = getHashFragmentDomNode(hashFragment);
                }
                // `findDOMNode` is tricky because it returns just the first child if the component is a fragment.
                // This already caused a bug where the first child was a <link/> in head.
                if (!domNode) {
                    domNode = findDOMNode(this);
                }
                // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
                if (!(domNode instanceof Element)) {
                    return;
                }
                // Verify if the element is a HTMLElement and if we want to consider it for scroll behavior.
                // If the element is skipped, try to select the next sibling and try again.
                while(!(domNode instanceof HTMLElement) || shouldSkipElement(domNode)){
                    // No siblings found that match the criteria are found, so handle scroll higher up in the tree instead.
                    if (domNode.nextElementSibling === null) {
                        return;
                    }
                    domNode = domNode.nextElementSibling;
                }
                // State is mutated to ensure that the focus and scroll is applied only once.
                focusAndScrollRef.apply = false;
                focusAndScrollRef.hashFragment = null;
                focusAndScrollRef.segmentPaths = [];
                (0, _handlesmoothscroll.handleSmoothScroll)(()=>{
                    // In case of hash scroll, we only need to scroll the element into view
                    if (hashFragment) {
                        domNode.scrollIntoView();
                        return;
                    }
                    // Store the current viewport height because reading `clientHeight` causes a reflow,
                    // and it won't change during this function.
                    const htmlElement = document.documentElement;
                    const viewportHeight = htmlElement.clientHeight;
                    // If the element's top edge is already in the viewport, exit early.
                    if (topOfElementInViewport(domNode, viewportHeight)) {
                        return;
                    }
                    // Otherwise, try scrolling go the top of the document to be backward compatible with pages
                    // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
                    // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
                    // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
                    htmlElement.scrollTop = 0;
                    // Scroll to domNode if domNode is not in viewport when scrolled to top of document
                    if (!topOfElementInViewport(domNode, viewportHeight)) {
                        domNode.scrollIntoView();
                    }
                }, {
                    // We will force layout by querying domNode position
                    dontForceLayout: true,
                    onlyHashChange: focusAndScrollRef.onlyHashChange
                });
                // Mutate after scrolling so that it can be read by `handleSmoothScroll`
                focusAndScrollRef.onlyHashChange = false;
                // Set focus on the element
                domNode.focus();
            }
        };
    }
}
function ScrollAndFocusHandler(param) {
    let { segmentPath, children } = param;
    const context = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error("invariant global layout router not mounted");
    }
    return /*#__PURE__*/ _react.default.createElement(InnerScrollAndFocusHandler, {
        segmentPath: segmentPath,
        focusAndScrollRef: context.focusAndScrollRef
    }, children);
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter(param) {
    let { parallelRouterKey, url, childNodes, childProp, segmentPath, tree, // isActive,
    cacheKey } = param;
    const context = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error("invariant global layout router not mounted");
    }
    const { buildId, changeByServerResponse, tree: fullTree } = context;
    // Read segment path from the parallel router cache node.
    let childNode = childNodes.get(cacheKey);
    // If childProp is available this means it's the Flight / SSR case.
    if (childProp && // TODO-APP: verify if this can be null based on user code
    childProp.current !== null) {
        if (!childNode) {
            // Add the segment's subTreeData to the cache.
            // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
            childNode = {
                status: _approutercontext.CacheStates.READY,
                data: null,
                subTreeData: childProp.current,
                parallelRoutes: new Map()
            };
            childNodes.set(cacheKey, childNode);
        } else {
            if (childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED) {
                // @ts-expect-error we're changing it's type!
                childNode.status = _approutercontext.CacheStates.READY;
                // @ts-expect-error
                childNode.subTreeData = childProp.current;
            }
        }
    }
    // When childNode is not available during rendering client-side we need to fetch it from the server.
    if (!childNode || childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED) {
        /**
     * Router state with refetch marker added
     */ // TODO-APP: remove ''
        const refetchTree = walkAddRefetch([
            "",
            ...segmentPath
        ], fullTree);
        childNode = {
            status: _approutercontext.CacheStates.DATA_FETCH,
            data: (0, _fetchserverresponse.fetchServerResponse)(new URL(url, location.origin), refetchTree, context.nextUrl, buildId),
            subTreeData: null,
            head: childNode && childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED ? childNode.head : undefined,
            parallelRoutes: childNode && childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED ? childNode.parallelRoutes : new Map()
        };
        /**
     * Flight data fetch kicked off during render and put into the cache.
     */ childNodes.set(cacheKey, childNode);
    }
    // This case should never happen so it throws an error. It indicates there's a bug in the Next.js.
    if (!childNode) {
        throw new Error("Child node should always exist");
    }
    // This case should never happen so it throws an error. It indicates there's a bug in the Next.js.
    if (childNode.subTreeData && childNode.data) {
        throw new Error("Child node should not have both subTreeData and data");
    }
    // If cache node has a data request we have to unwrap response by `use` and update the cache.
    if (childNode.data) {
        /**
     * Flight response data
     */ // When the data has not resolved yet `use` will suspend here.
        const [flightData, overrideCanonicalUrl] = (0, _react.use)(childNode.data);
        // segmentPath from the server does not match the layout's segmentPath
        childNode.data = null;
        // setTimeout is used to start a new transition during render, this is an intentional hack around React.
        setTimeout(()=>{
            (0, _react.startTransition)(()=>{
                changeByServerResponse(fullTree, flightData, overrideCanonicalUrl);
            });
        });
        // Suspend infinitely as `changeByServerResponse` will cause a different part of the tree to be rendered.
        (0, _react.use)((0, _infinitepromise.createInfinitePromise)());
    }
    // If cache node has no subTreeData and no data request we have to infinitely suspend as the data will likely flow in from another place.
    // TODO-APP: double check users can't return null in a component that will kick in here.
    if (!childNode.subTreeData) {
        (0, _react.use)((0, _infinitepromise.createInfinitePromise)());
    }
    const subtree = /*#__PURE__*/ _react.default.createElement(_approutercontext.LayoutRouterContext.Provider, {
        value: {
            tree: tree[1][parallelRouterKey],
            childNodes: childNode.parallelRoutes,
            // TODO-APP: overriding of url for parallel routes
            url: url
        }
    }, childNode.subTreeData);
    // Ensure root layout is not wrapped in a div as the root layout renders `<html>`
    return subtree;
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary(param) {
    let { children, loading, loadingStyles, hasLoading } = param;
    if (hasLoading) {
        return /*#__PURE__*/ _react.default.createElement(_react.Suspense, {
            fallback: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, loadingStyles, loading)
        }, children);
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
function OuterLayoutRouter(param) {
    let { parallelRouterKey, segmentPath, childProp, error, errorStyles, templateStyles, loading, loadingStyles, hasLoading, template, notFound, notFoundStyles, styles } = param;
    const context = (0, _react.useContext)(_approutercontext.LayoutRouterContext);
    if (!context) {
        throw new Error("invariant expected layout router to be mounted");
    }
    const { childNodes, tree, url } = context;
    // Get the current parallelRouter cache node
    let childNodesForParallelRouter = childNodes.get(parallelRouterKey);
    // If the parallel router cache node does not exist yet, create it.
    // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
    if (!childNodesForParallelRouter) {
        childNodesForParallelRouter = new Map();
        childNodes.set(parallelRouterKey, childNodesForParallelRouter);
    }
    // Get the active segment in the tree
    // The reason arrays are used in the data format is that these are transferred from the server to the browser so it's optimized to save bytes.
    const treeSegment = tree[1][parallelRouterKey][0];
    const childPropSegment = childProp.segment;
    // If segment is an array it's a dynamic route and we want to read the dynamic route value as the segment to get from the cache.
    const currentChildSegmentValue = (0, _getsegmentvalue.getSegmentValue)(treeSegment);
    /**
   * Decides which segments to keep rendering, all segments that are not active will be wrapped in `<Offscreen>`.
   */ // TODO-APP: Add handling of `<Offscreen>` when it's available.
    const preservedSegments = [
        treeSegment
    ];
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, styles, preservedSegments.map((preservedSegment)=>{
        const isChildPropSegment = (0, _matchsegments.matchSegment)(preservedSegment, childPropSegment);
        const preservedSegmentValue = (0, _getsegmentvalue.getSegmentValue)(preservedSegment);
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(preservedSegment);
        return(/*
            - Error boundary
              - Only renders error boundary if error component is provided.
              - Rendered for each segment to ensure they have their own error state.
            - Loading boundary
              - Only renders suspense boundary if loading components is provided.
              - Rendered for each segment to ensure they have their own loading state.
              - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
          */ /*#__PURE__*/ _react.default.createElement(_approutercontext.TemplateContext.Provider, {
            key: (0, _createroutercachekey.createRouterCacheKey)(preservedSegment, true),
            value: /*#__PURE__*/ _react.default.createElement(ScrollAndFocusHandler, {
                segmentPath: segmentPath
            }, /*#__PURE__*/ _react.default.createElement(_errorboundary.ErrorBoundary, {
                errorComponent: error,
                errorStyles: errorStyles
            }, /*#__PURE__*/ _react.default.createElement(LoadingBoundary, {
                hasLoading: hasLoading,
                loading: loading,
                loadingStyles: loadingStyles
            }, /*#__PURE__*/ _react.default.createElement(_notfoundboundary.NotFoundBoundary, {
                notFound: notFound,
                notFoundStyles: notFoundStyles
            }, /*#__PURE__*/ _react.default.createElement(_redirectboundary.RedirectBoundary, null, /*#__PURE__*/ _react.default.createElement(InnerLayoutRouter, {
                parallelRouterKey: parallelRouterKey,
                url: url,
                tree: tree,
                childNodes: childNodesForParallelRouter,
                childProp: isChildPropSegment ? childProp : null,
                segmentPath: segmentPath,
                cacheKey: cacheKey,
                isActive: currentChildSegmentValue === preservedSegmentValue
            }))))))
        }, templateStyles, template));
    }));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 7618:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    matchSegment: function() {
        return matchSegment;
    },
    canSegmentBeOverridden: function() {
        return canSegmentBeOverridden;
    }
});
const _getsegmentparam = __webpack_require__(1844);
const matchSegment = (existingSegment, segment)=>{
    // segment is either Array or string
    if (typeof existingSegment === "string") {
        if (typeof segment === "string") {
            // Common case: segment is just a string
            return existingSegment === segment;
        }
        return false;
    }
    if (typeof segment === "string") {
        return false;
    }
    return existingSegment[0] === segment[0] && existingSegment[1] === segment[1];
};
const canSegmentBeOverridden = (existingSegment, segment)=>{
    var _getSegmentParam;
    if (Array.isArray(existingSegment) || !Array.isArray(segment)) {
        return false;
    }
    return ((_getSegmentParam = (0, _getsegmentparam.getSegmentParam)(existingSegment)) == null ? void 0 : _getSegmentParam.param) === segment[0];
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=match-segments.js.map


/***/ }),

/***/ 696:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// useLayoutSegments() // Only the segments for the current place. ['children', 'dashboard', 'children', 'integrations'] -> /dashboard/integrations (/dashboard/layout.js would get ['children', 'dashboard', 'children', 'integrations'])

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return ReadonlyURLSearchParams;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    usePathname: function() {
        return usePathname;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtml.ServerInsertedHTMLContext;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtml.useServerInsertedHTML;
    },
    useRouter: function() {
        return useRouter;
    },
    useParams: function() {
        return useParams;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    notFound: function() {
        return _notfound.notFound;
    }
});
const _react = __webpack_require__(8038);
const _approutercontext = __webpack_require__(7085);
const _hooksclientcontext = __webpack_require__(9569);
const _clienthookinservercomponenterror = __webpack_require__(2633);
const _getsegmentvalue = __webpack_require__(7741);
const _serverinsertedhtml = __webpack_require__(9618);
const _redirect = __webpack_require__(2622);
const _notfound = __webpack_require__(5858);
const INTERNAL_URLSEARCHPARAMS_INSTANCE = Symbol("internal for urlsearchparams readonly");
function readonlyURLSearchParamsError() {
    return new Error("ReadonlyURLSearchParams cannot be modified");
}
class ReadonlyURLSearchParams {
    [Symbol.iterator]() {
        return this[INTERNAL_URLSEARCHPARAMS_INSTANCE][Symbol.iterator]();
    }
    append() {
        throw readonlyURLSearchParamsError();
    }
    delete() {
        throw readonlyURLSearchParamsError();
    }
    set() {
        throw readonlyURLSearchParamsError();
    }
    sort() {
        throw readonlyURLSearchParamsError();
    }
    constructor(urlSearchParams){
        this[INTERNAL_URLSEARCHPARAMS_INSTANCE] = urlSearchParams;
        this.entries = urlSearchParams.entries.bind(urlSearchParams);
        this.forEach = urlSearchParams.forEach.bind(urlSearchParams);
        this.get = urlSearchParams.get.bind(urlSearchParams);
        this.getAll = urlSearchParams.getAll.bind(urlSearchParams);
        this.has = urlSearchParams.has.bind(urlSearchParams);
        this.keys = urlSearchParams.keys.bind(urlSearchParams);
        this.values = urlSearchParams.values.bind(urlSearchParams);
        this.toString = urlSearchParams.toString.bind(urlSearchParams);
        this.size = urlSearchParams.size;
    }
}
function useSearchParams() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSearchParams");
    const searchParams = (0, _react.useContext)(_hooksclientcontext.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering } = __webpack_require__(5661);
        if (bailoutToClientRendering()) {
            // TODO-APP: handle dynamic = 'force-static' here and on the client
            return readonlySearchParams;
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("usePathname");
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react.useContext)(_hooksclientcontext.PathnameContext);
}
function useRouter() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useRouter");
    const router = (0, _react.useContext)(_approutercontext.AppRouterContext);
    if (router === null) {
        throw new Error("invariant expected app router to be mounted");
    }
    return router;
}
// this function performs a depth-first search of the tree to find the selected
// params
function getSelectedParams(tree, params) {
    if (params === void 0) params = {};
    const parallelRoutes = tree[1];
    for (const parallelRoute of Object.values(parallelRoutes)){
        const segment = parallelRoute[0];
        const isDynamicParameter = Array.isArray(segment);
        const segmentValue = isDynamicParameter ? segment[1] : segment;
        if (!segmentValue || segmentValue.startsWith("__PAGE__")) continue;
        // Ensure catchAll and optional catchall are turned into an array
        const isCatchAll = isDynamicParameter && (segment[2] === "c" || segment[2] === "oc");
        if (isCatchAll) {
            params[segment[0]] = segment[1].split("/");
        } else if (isDynamicParameter) {
            params[segment[0]] = segment[1];
        }
        params = getSelectedParams(parallelRoute, params);
    }
    return params;
}
function useParams() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useParams");
    const globalLayoutRouterContext = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!globalLayoutRouterContext) {
        // This only happens in `pages`. Type is overwritten in navigation.d.ts
        return null;
    }
    return getSelectedParams(globalLayoutRouterContext.tree);
}
// TODO-APP: handle parallel routes
/**
 * Get the canonical parameters from the current level to the leaf node.
 */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
    if (first === void 0) first = true;
    if (segmentPath === void 0) segmentPath = [];
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _parallelRoutes_children;
        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    const segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return segmentPath;
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSelectedLayoutSegments");
    const { tree } = (0, _react.useContext)(_approutercontext.LayoutRouterContext);
    return getSelectedLayoutSegmentPath(tree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSelectedLayoutSegment");
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (selectedLayoutSegments.length === 0) {
        return null;
    }
    return selectedLayoutSegments[0];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 6505:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "NotFoundBoundary", ({
    enumerable: true,
    get: function() {
        return NotFoundBoundary;
    }
}));
const _interop_require_default = __webpack_require__(2147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8038));
const _navigation = __webpack_require__(696);
class NotFoundErrorBoundary extends _react.default.Component {
    static getDerivedStateFromError(error) {
        if ((error == null ? void 0 : error.digest) === "NEXT_NOT_FOUND") {
            return {
                notFoundTriggered: true
            };
        }
        // Re-throw if error is not for 404
        throw error;
    }
    static getDerivedStateFromProps(props, state) {
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.notFoundTriggered) {
            return {
                notFoundTriggered: false,
                previousPathname: props.pathname
            };
        }
        return {
            notFoundTriggered: state.notFoundTriggered,
            previousPathname: props.pathname
        };
    }
    render() {
        if (this.state.notFoundTriggered) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("meta", {
                name: "robots",
                content: "noindex"
            }),  false && /*#__PURE__*/ 0, this.props.notFoundStyles, this.props.notFound);
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            notFoundTriggered: !!props.asNotFound,
            previousPathname: props.pathname
        };
    }
}
function NotFoundBoundary(param) {
    let { notFound, notFoundStyles, asNotFound, children } = param;
    const pathname = (0, _navigation.usePathname)();
    return notFound ? /*#__PURE__*/ _react.default.createElement(NotFoundErrorBoundary, {
        pathname: pathname,
        notFound: notFound,
        notFoundStyles: notFoundStyles,
        asNotFound: asNotFound
    }, children) : /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found-boundary.js.map


/***/ }),

/***/ 5858:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    notFound: function() {
        return notFound;
    },
    isNotFoundError: function() {
        return isNotFoundError;
    }
});
const NOT_FOUND_ERROR_CODE = "NEXT_NOT_FOUND";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = new Error(NOT_FOUND_ERROR_CODE);
    error.digest = NOT_FOUND_ERROR_CODE;
    throw error;
}
function isNotFoundError(error) {
    return (error == null ? void 0 : error.digest) === NOT_FOUND_ERROR_CODE;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 8811:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/*
    This is a simple promise queue that allows you to limit the number of concurrent promises
    that are running at any given time. It's used to limit the number of concurrent
    prefetch requests that are being made to the server but could be used for other
    things as well.
*/ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "PromiseQueue", ({
    enumerable: true,
    get: function() {
        return PromiseQueue;
    }
}));
const _class_private_field_loose_base = __webpack_require__(8324);
const _class_private_field_loose_key = __webpack_require__(4567);
var _maxConcurrency = /*#__PURE__*/ _class_private_field_loose_key._("_maxConcurrency"), _runningCount = /*#__PURE__*/ _class_private_field_loose_key._("_runningCount"), _queue = /*#__PURE__*/ _class_private_field_loose_key._("_queue"), _processNext = /*#__PURE__*/ _class_private_field_loose_key._("_processNext");
class PromiseQueue {
    enqueue(promiseFn) {
        let taskResolve;
        let taskReject;
        const taskPromise = new Promise((resolve, reject)=>{
            taskResolve = resolve;
            taskReject = reject;
        });
        const task = async ()=>{
            try {
                _class_private_field_loose_base._(this, _runningCount)[_runningCount]++;
                const result = await promiseFn();
                taskResolve(result);
            } catch (error) {
                taskReject(error);
            } finally{
                _class_private_field_loose_base._(this, _runningCount)[_runningCount]--;
                _class_private_field_loose_base._(this, _processNext)[_processNext]();
            }
        };
        const enqueueResult = {
            promiseFn: taskPromise,
            task
        };
        // wonder if we should take a LIFO approach here
        _class_private_field_loose_base._(this, _queue)[_queue].push(enqueueResult);
        _class_private_field_loose_base._(this, _processNext)[_processNext]();
        return taskPromise;
    }
    bump(promiseFn) {
        const index = _class_private_field_loose_base._(this, _queue)[_queue].findIndex((item)=>item.promiseFn === promiseFn);
        if (index > -1) {
            const bumpedItem = _class_private_field_loose_base._(this, _queue)[_queue].splice(index, 1)[0];
            _class_private_field_loose_base._(this, _queue)[_queue].unshift(bumpedItem);
            _class_private_field_loose_base._(this, _processNext)[_processNext](true);
        }
    }
    constructor(maxConcurrency = 5){
        Object.defineProperty(this, _processNext, {
            value: processNext
        });
        Object.defineProperty(this, _maxConcurrency, {
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, _runningCount, {
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, _queue, {
            writable: true,
            value: void 0
        });
        _class_private_field_loose_base._(this, _maxConcurrency)[_maxConcurrency] = maxConcurrency;
        _class_private_field_loose_base._(this, _runningCount)[_runningCount] = 0;
        _class_private_field_loose_base._(this, _queue)[_queue] = [];
    }
}
function processNext(forced) {
    if (forced === void 0) forced = false;
    if ((_class_private_field_loose_base._(this, _runningCount)[_runningCount] < _class_private_field_loose_base._(this, _maxConcurrency)[_maxConcurrency] || forced) && _class_private_field_loose_base._(this, _queue)[_queue].length > 0) {
        var _class_private_field_loose_base__queue_shift;
        (_class_private_field_loose_base__queue_shift = _class_private_field_loose_base._(this, _queue)[_queue].shift()) == null ? void 0 : _class_private_field_loose_base__queue_shift.task();
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=promise-queue.js.map


/***/ }),

/***/ 1442:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RedirectErrorBoundary: function() {
        return RedirectErrorBoundary;
    },
    RedirectBoundary: function() {
        return RedirectBoundary;
    }
});
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(8038));
const _navigation = __webpack_require__(696);
const _redirect = __webpack_require__(2622);
function HandleRedirect(param) {
    let { redirect, reset, redirectType } = param;
    const router = (0, _navigation.useRouter)();
    (0, _react.useEffect)(()=>{
        // @ts-ignore startTransition exists
        _react.default.startTransition(()=>{
            if (redirectType === _redirect.RedirectType.push) {
                router.push(redirect, {});
            } else {
                router.replace(redirect, {});
            }
            reset();
        });
    }, [
        redirect,
        redirectType,
        reset,
        router
    ]);
    return null;
}
class RedirectErrorBoundary extends _react.default.Component {
    static getDerivedStateFromError(error) {
        if ((0, _redirect.isRedirectError)(error)) {
            const url = (0, _redirect.getURLFromRedirectError)(error);
            const redirectType = (0, _redirect.getRedirectTypeFromError)(error);
            return {
                redirect: url,
                redirectType
            };
        }
        // Re-throw if error is not for redirect
        throw error;
    }
    render() {
        const { redirect, redirectType } = this.state;
        if (redirect !== null && redirectType !== null) {
            return /*#__PURE__*/ _react.default.createElement(HandleRedirect, {
                redirect: redirect,
                redirectType: redirectType,
                reset: ()=>this.setState({
                        redirect: null
                    })
            });
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            redirectType: null
        };
    }
}
function RedirectBoundary(param) {
    let { children } = param;
    const router = (0, _navigation.useRouter)();
    return /*#__PURE__*/ _react.default.createElement(RedirectErrorBoundary, {
        router: router
    }, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-boundary.js.map


/***/ }),

/***/ 2622:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RedirectType: function() {
        return RedirectType;
    },
    getRedirectError: function() {
        return getRedirectError;
    },
    redirect: function() {
        return redirect;
    },
    isRedirectError: function() {
        return isRedirectError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    }
});
const _requestasyncstorage = __webpack_require__(1715);
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
var RedirectType;
(function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
})(RedirectType || (RedirectType = {}));
function getRedirectError(url, type) {
    const error = new Error(REDIRECT_ERROR_CODE);
    error.digest = REDIRECT_ERROR_CODE + ";" + type + ";" + url;
    const requestStore = _requestasyncstorage.requestAsyncStorage.getStore();
    if (requestStore) {
        error.mutableCookies = requestStore.mutableCookies;
    }
    return error;
}
function redirect(url, type) {
    if (type === void 0) type = "replace";
    throw getRedirectError(url, type);
}
function isRedirectError(error) {
    if (typeof (error == null ? void 0 : error.digest) !== "string") return false;
    const [errorCode, type, destination] = error.digest.split(";", 3);
    return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string";
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(";", 3)[2];
}
function getRedirectTypeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error("Not a redirect error");
    }
    return error.digest.split(";", 3)[1];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 6926:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
}));
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(8038));
const _approutercontext = __webpack_require__(7085);
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontext.TemplateContext);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 4173:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "applyFlightData", ({
    enumerable: true,
    get: function() {
        return applyFlightData;
    }
}));
const _approutercontext = __webpack_require__(7085);
const _filllazyitemstillleafwithhead = __webpack_require__(2684);
const _fillcachewithnewsubtreedata = __webpack_require__(8921);
function applyFlightData(existingCache, cache, flightDataPath, wasPrefetched) {
    if (wasPrefetched === void 0) wasPrefetched = false;
    // The one before last item is the router state tree patch
    const [treePatch, subTreeData, head] = flightDataPath.slice(-3);
    // Handles case where prefetch only returns the router tree patch without rendered components.
    if (subTreeData === null) {
        return false;
    }
    if (flightDataPath.length === 3) {
        cache.status = _approutercontext.CacheStates.READY;
        cache.subTreeData = subTreeData;
        (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, existingCache, treePatch, head, wasPrefetched);
    } else {
        // Copy subTreeData for the root node of the cache.
        cache.status = _approutercontext.CacheStates.READY;
        cache.subTreeData = existingCache.subTreeData;
        cache.parallelRoutes = new Map(existingCache.parallelRoutes);
        // Create a copy of the existing cache with the subTreeData applied.
        (0, _fillcachewithnewsubtreedata.fillCacheWithNewSubTreeData)(cache, existingCache, flightDataPath, wasPrefetched);
    }
    return true;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=apply-flight-data.js.map


/***/ }),

/***/ 3914:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "applyRouterStatePatchToTree", ({
    enumerable: true,
    get: function() {
        return applyRouterStatePatchToTree;
    }
}));
const _matchsegments = __webpack_require__(7618);
/**
 * Deep merge of the two router states. Parallel route keys are preserved if the patch doesn't have them.
 */ function applyPatch(initialTree, patchTree) {
    const [initialSegment, initialParallelRoutes] = initialTree;
    const [patchSegment, patchParallelRoutes] = patchTree;
    // if the applied patch segment is __DEFAULT__ then we can ignore it and return the initial tree
    // this is because the __DEFAULT__ segment is used as a placeholder on navigation
    if (patchSegment === "__DEFAULT__" && initialSegment !== "__DEFAULT__") {
        return initialTree;
    }
    if ((0, _matchsegments.matchSegment)(initialSegment, patchSegment)) {
        const newParallelRoutes = {};
        for(const key in initialParallelRoutes){
            const isInPatchTreeParallelRoutes = typeof patchParallelRoutes[key] !== "undefined";
            if (isInPatchTreeParallelRoutes) {
                newParallelRoutes[key] = applyPatch(initialParallelRoutes[key], patchParallelRoutes[key]);
            } else {
                newParallelRoutes[key] = initialParallelRoutes[key];
            }
        }
        for(const key in patchParallelRoutes){
            if (newParallelRoutes[key]) {
                continue;
            }
            newParallelRoutes[key] = patchParallelRoutes[key];
        }
        const tree = [
            initialSegment,
            newParallelRoutes
        ];
        if (initialTree[2]) {
            tree[2] = initialTree[2];
        }
        if (initialTree[3]) {
            tree[3] = initialTree[3];
        }
        if (initialTree[4]) {
            tree[4] = initialTree[4];
        }
        return tree;
    }
    return patchTree;
}
function applyRouterStatePatchToTree(flightSegmentPath, flightRouterState, treePatch) {
    const [segment, parallelRoutes, , , isRootLayout] = flightRouterState;
    // Root refresh
    if (flightSegmentPath.length === 1) {
        const tree = applyPatch(flightRouterState, treePatch);
        return tree;
    }
    const [currentSegment, parallelRouteKey] = flightSegmentPath;
    // Tree path returned from the server should always match up with the current tree in the browser
    if (!(0, _matchsegments.matchSegment)(currentSegment, segment)) {
        return null;
    }
    const lastSegment = flightSegmentPath.length === 2;
    let parallelRoutePatch;
    if (lastSegment) {
        parallelRoutePatch = applyPatch(parallelRoutes[parallelRouteKey], treePatch);
    } else {
        parallelRoutePatch = applyRouterStatePatchToTree(flightSegmentPath.slice(2), parallelRoutes[parallelRouteKey], treePatch);
        if (parallelRoutePatch === null) {
            return null;
        }
    }
    const tree = [
        flightSegmentPath[0],
        {
            ...parallelRoutes,
            [parallelRouteKey]: parallelRoutePatch
        }
    ];
    // Current segment is the root layout
    if (isRootLayout) {
        tree[4] = true;
    }
    return tree;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=apply-router-state-patch-to-tree.js.map


/***/ }),

/***/ 579:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    extractPathFromFlightRouterState: function() {
        return extractPathFromFlightRouterState;
    },
    computeChangedPath: function() {
        return computeChangedPath;
    }
});
const _interceptionroutes = __webpack_require__(6624);
const _matchsegments = __webpack_require__(7618);
const segmentToPathname = (segment)=>{
    if (typeof segment === "string") {
        return segment;
    }
    return segment[1];
};
function normalizePathname(pathname) {
    return pathname.split("/").reduce((acc, segment)=>{
        if (segment === "" || segment.startsWith("(") && segment.endsWith(")")) {
            return acc;
        }
        return acc + "/" + segment;
    }, "") || "/";
}
function extractPathFromFlightRouterState(flightRouterState) {
    const segment = Array.isArray(flightRouterState[0]) ? flightRouterState[0][1] : flightRouterState[0];
    if (segment === "__DEFAULT__" || _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m))) return undefined;
    if (segment.startsWith("__PAGE__")) return "";
    const path = [
        segment
    ];
    var _flightRouterState_;
    const parallelRoutes = (_flightRouterState_ = flightRouterState[1]) != null ? _flightRouterState_ : {};
    const childrenPath = parallelRoutes.children ? extractPathFromFlightRouterState(parallelRoutes.children) : undefined;
    if (childrenPath !== undefined) {
        path.push(childrenPath);
    } else {
        for (const [key, value] of Object.entries(parallelRoutes)){
            if (key === "children") continue;
            const childPath = extractPathFromFlightRouterState(value);
            if (childPath !== undefined) {
                path.push(childPath);
            }
        }
    }
    // TODO-APP: optimise this, it's not ideal to join and split
    return normalizePathname(path.join("/"));
}
function computeChangedPathImpl(treeA, treeB) {
    const [segmentA, parallelRoutesA] = treeA;
    const [segmentB, parallelRoutesB] = treeB;
    const normalizedSegmentA = segmentToPathname(segmentA);
    const normalizedSegmentB = segmentToPathname(segmentB);
    if (_interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>normalizedSegmentA.startsWith(m) || normalizedSegmentB.startsWith(m))) {
        return "";
    }
    if (!(0, _matchsegments.matchSegment)(segmentA, segmentB)) {
        var _extractPathFromFlightRouterState;
        // once we find where the tree changed, we compute the rest of the path by traversing the tree
        return (_extractPathFromFlightRouterState = extractPathFromFlightRouterState(treeB)) != null ? _extractPathFromFlightRouterState : "";
    }
    for(const parallelRouterKey in parallelRoutesA){
        if (parallelRoutesB[parallelRouterKey]) {
            const changedPath = computeChangedPathImpl(parallelRoutesA[parallelRouterKey], parallelRoutesB[parallelRouterKey]);
            if (changedPath !== null) {
                return segmentToPathname(segmentB) + "/" + changedPath;
            }
        }
    }
    return null;
}
function computeChangedPath(treeA, treeB) {
    const changedPath = computeChangedPathImpl(treeA, treeB);
    if (changedPath == null || changedPath === "/") {
        return changedPath;
    }
    // lightweight normalization to remove route groups
    return normalizePathname(changedPath);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=compute-changed-path.js.map


/***/ }),

/***/ 4331:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createHrefFromUrl", ({
    enumerable: true,
    get: function() {
        return createHrefFromUrl;
    }
}));
function createHrefFromUrl(url, includeHash) {
    if (includeHash === void 0) includeHash = true;
    return url.pathname + url.search + (includeHash ? url.hash : "");
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-href-from-url.js.map


/***/ }),

/***/ 1684:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createInitialRouterState", ({
    enumerable: true,
    get: function() {
        return createInitialRouterState;
    }
}));
const _approutercontext = __webpack_require__(7085);
const _createhreffromurl = __webpack_require__(4331);
const _filllazyitemstillleafwithhead = __webpack_require__(2684);
const _computechangedpath = __webpack_require__(579);
function createInitialRouterState(param) {
    let { buildId, initialTree, children, initialCanonicalUrl, initialParallelRoutes, isServer, location, initialHead } = param;
    const cache = {
        status: _approutercontext.CacheStates.READY,
        data: null,
        subTreeData: children,
        // The cache gets seeded during the first render. `initialParallelRoutes` ensures the cache from the first render is there during the second render.
        parallelRoutes: isServer ? new Map() : initialParallelRoutes
    };
    // When the cache hasn't been seeded yet we fill the cache with the head.
    if (initialParallelRoutes === null || initialParallelRoutes.size === 0) {
        (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, undefined, initialTree, initialHead);
    }
    var _ref;
    return {
        buildId,
        tree: initialTree,
        cache,
        prefetchCache: new Map(),
        pushRef: {
            pendingPush: false,
            mpaNavigation: false
        },
        focusAndScrollRef: {
            apply: false,
            onlyHashChange: false,
            hashFragment: null,
            segmentPaths: []
        },
        canonicalUrl: // This is safe to do as canonicalUrl can't be rendered, it's only used to control the history updates in the useEffect further down in this file.
        location ? (0, _createhreffromurl.createHrefFromUrl)(location) : initialCanonicalUrl,
        nextUrl: (_ref = (0, _computechangedpath.extractPathFromFlightRouterState)(initialTree) || (location == null ? void 0 : location.pathname)) != null ? _ref : null
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-initial-router-state.js.map


/***/ }),

/***/ 8503:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createOptimisticTree", ({
    enumerable: true,
    get: function() {
        return createOptimisticTree;
    }
}));
const _matchsegments = __webpack_require__(7618);
function createOptimisticTree(segments, flightRouterState, parentRefetch) {
    const [existingSegment, existingParallelRoutes, url, refresh, isRootLayout] = flightRouterState || [
        null,
        {}
    ];
    const segment = segments[0];
    const isLastSegment = segments.length === 1;
    const segmentMatches = existingSegment !== null && (0, _matchsegments.matchSegment)(existingSegment, segment);
    // if there are multiple parallel routes at this level, we need to refetch here
    // to ensure we get the correct tree. This is because we don't know which
    // parallel route will match the next segment.
    const hasMultipleParallelRoutes = Object.keys(existingParallelRoutes).length > 1;
    const shouldRefetchThisLevel = !flightRouterState || !segmentMatches || hasMultipleParallelRoutes;
    let parallelRoutes = {};
    if (existingSegment !== null && segmentMatches) {
        parallelRoutes = existingParallelRoutes;
    }
    let childTree;
    // if there's multiple parallel routes at this level, we shouldn't create an
    // optimistic tree for the next level because we don't know which one will
    // match the next segment.
    if (!isLastSegment && !hasMultipleParallelRoutes) {
        const childItem = createOptimisticTree(segments.slice(1), parallelRoutes ? parallelRoutes.children : null, parentRefetch || shouldRefetchThisLevel);
        childTree = childItem;
    }
    const result = [
        segment,
        {
            ...parallelRoutes,
            ...childTree ? {
                children: childTree
            } : {}
        }
    ];
    if (url) {
        result[2] = url;
    }
    if (!parentRefetch && shouldRefetchThisLevel) {
        result[3] = "refetch";
    } else if (segmentMatches && refresh) {
        result[3] = refresh;
    }
    if (segmentMatches && isRootLayout) {
        result[4] = isRootLayout;
    }
    return result;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-optimistic-tree.js.map


/***/ }),

/***/ 4621:
/***/ ((module, exports) => {

"use strict";
/**
 * Create data fetching record for Promise.
 */ // TODO-APP: change `any` to type inference.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRecordFromThenable", ({
    enumerable: true,
    get: function() {
        return createRecordFromThenable;
    }
}));
function createRecordFromThenable(thenable) {
    thenable.status = "pending";
    thenable.then((value)=>{
        if (thenable.status === "pending") {
            thenable.status = "fulfilled";
            thenable.value = value;
        }
    }, (err)=>{
        if (thenable.status === "pending") {
            thenable.status = "rejected";
            thenable.value = err;
        }
    });
    return thenable;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-record-from-thenable.js.map


/***/ }),

/***/ 8870:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRouterCacheKey", ({
    enumerable: true,
    get: function() {
        return createRouterCacheKey;
    }
}));
function createRouterCacheKey(segment, withoutSearchParameters) {
    if (withoutSearchParameters === void 0) withoutSearchParameters = false;
    return Array.isArray(segment) ? segment[0] + "|" + segment[1] + "|" + segment[2] : withoutSearchParameters && segment.startsWith("__PAGE__") ? "__PAGE__" : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-router-cache-key.js.map


/***/ }),

/***/ 8080:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fetchServerResponse", ({
    enumerable: true,
    get: function() {
        return fetchServerResponse;
    }
}));
const _client = __webpack_require__(7897);
const _approuterheaders = __webpack_require__(6265);
const _approuter = __webpack_require__(2987);
const _appcallserver = __webpack_require__(6937);
const _routerreducertypes = __webpack_require__(2836);
const _hash = __webpack_require__(199);
function doMpaNavigation(url) {
    return [
        (0, _approuter.urlToUrlWithoutFlightMarker)(url).toString(),
        undefined
    ];
}
async function fetchServerResponse(url, flightRouterState, nextUrl, currentBuildId, prefetchKind) {
    const headers = {
        // Enable flight response
        [_approuterheaders.RSC]: "1",
        // Provide the current router state
        [_approuterheaders.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(JSON.stringify(flightRouterState))
    };
    /**
   * Three cases:
   * - `prefetchKind` is `undefined`, it means it's a normal navigation, so we want to prefetch the page data fully
   * - `prefetchKind` is `full` - we want to prefetch the whole page so same as above
   * - `prefetchKind` is `auto` - if the page is dynamic, prefetch the page data partially, if static prefetch the page data fully
   */ if (prefetchKind === _routerreducertypes.PrefetchKind.AUTO) {
        headers[_approuterheaders.NEXT_ROUTER_PREFETCH] = "1";
    }
    if (nextUrl) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    const uniqueCacheQuery = (0, _hash.hexHash)([
        headers[_approuterheaders.NEXT_ROUTER_PREFETCH] || "0",
        headers[_approuterheaders.NEXT_ROUTER_STATE_TREE],
        headers[_approuterheaders.NEXT_URL]
    ].join(","));
    try {
        let fetchUrl = new URL(url);
        if (true) {
            if (false) {}
        }
        // Add unique cache query to avoid caching conflicts on CDN which don't respect to Vary header
        fetchUrl.searchParams.set(_approuterheaders.NEXT_RSC_UNION_QUERY, uniqueCacheQuery);
        const res = await fetch(fetchUrl, {
            // Backwards compat for older browsers. `same-origin` is the default in modern browsers.
            credentials: "same-origin",
            headers
        });
        const responseUrl = (0, _approuter.urlToUrlWithoutFlightMarker)(res.url);
        const canonicalUrl = res.redirected ? responseUrl : undefined;
        const contentType = res.headers.get("content-type") || "";
        let isFlightResponse = contentType === _approuterheaders.RSC_CONTENT_TYPE_HEADER;
        if (true) {
            if (false) {}
        }
        // If fetch returns something different than flight response handle it like a mpa navigation
        // If the fetch was not 200, we also handle it like a mpa navigation
        if (!isFlightResponse || !res.ok) {
            return doMpaNavigation(responseUrl.toString());
        }
        // Handle the `fetch` readable stream that can be unwrapped by `React.use`.
        const [buildId, flightData] = await (0, _client.createFromFetch)(Promise.resolve(res), {
            callServer: _appcallserver.callServer
        });
        if (currentBuildId !== buildId) {
            return doMpaNavigation(res.url);
        }
        return [
            flightData,
            canonicalUrl
        ];
    } catch (err) {
        console.error("Failed to fetch RSC payload. Falling back to browser navigation.", err);
        // If fetch fails handle it like a mpa navigation
        // TODO-APP: Add a test for the case where a CORS request fails, e.g. external url redirect coming from the response.
        // See https://github.com/vercel/next.js/issues/43605#issuecomment-1451617521 for a reproduction.
        return [
            url.toString(),
            undefined
        ];
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fetch-server-response.js.map


/***/ }),

/***/ 9996:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fillCacheWithDataProperty", ({
    enumerable: true,
    get: function() {
        return fillCacheWithDataProperty;
    }
}));
const _approutercontext = __webpack_require__(7085);
const _createroutercachekey = __webpack_require__(8870);
function fillCacheWithDataProperty(newCache, existingCache, flightSegmentPath, fetchResponse, bailOnParallelRoutes) {
    if (bailOnParallelRoutes === void 0) bailOnParallelRoutes = false;
    const isLastEntry = flightSegmentPath.length <= 2;
    const [parallelRouteKey, segment] = flightSegmentPath;
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap || bailOnParallelRoutes && existingCache.parallelRoutes.size > 1) {
        // Bailout because the existing cache does not have the path to the leaf node
        // or the existing cache has multiple parallel routes
        // Will trigger lazy fetch in layout-router because of missing segment
        return {
            bailOptimistic: true
        };
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    // In case of last segment start off the fetch at this level and don't copy further down.
    if (isLastEntry) {
        if (!childCacheNode || !childCacheNode.data || childCacheNode === existingChildCacheNode) {
            childSegmentMap.set(cacheKey, {
                status: _approutercontext.CacheStates.DATA_FETCH,
                data: fetchResponse(),
                subTreeData: null,
                parallelRoutes: new Map()
            });
        }
        return;
    }
    if (!childCacheNode || !existingChildCacheNode) {
        // Start fetch in the place where the existing cache doesn't have the data yet.
        if (!childCacheNode) {
            childSegmentMap.set(cacheKey, {
                status: _approutercontext.CacheStates.DATA_FETCH,
                data: fetchResponse(),
                subTreeData: null,
                parallelRoutes: new Map()
            });
        }
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    return fillCacheWithDataProperty(childCacheNode, existingChildCacheNode, flightSegmentPath.slice(2), fetchResponse);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-cache-with-data-property.js.map


/***/ }),

/***/ 8921:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fillCacheWithNewSubTreeData", ({
    enumerable: true,
    get: function() {
        return fillCacheWithNewSubTreeData;
    }
}));
const _approutercontext = __webpack_require__(7085);
const _invalidatecachebyrouterstate = __webpack_require__(1727);
const _filllazyitemstillleafwithhead = __webpack_require__(2684);
const _createroutercachekey = __webpack_require__(8870);
function fillCacheWithNewSubTreeData(newCache, existingCache, flightDataPath, wasPrefetched) {
    const isLastEntry = flightDataPath.length <= 5;
    const [parallelRouteKey, segment] = flightDataPath;
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    if (isLastEntry) {
        if (!childCacheNode || !childCacheNode.data || childCacheNode === existingChildCacheNode) {
            childCacheNode = {
                status: _approutercontext.CacheStates.READY,
                data: null,
                subTreeData: flightDataPath[3],
                // Ensure segments other than the one we got data for are preserved.
                parallelRoutes: existingChildCacheNode ? new Map(existingChildCacheNode.parallelRoutes) : new Map()
            };
            if (existingChildCacheNode) {
                (0, _invalidatecachebyrouterstate.invalidateCacheByRouterState)(childCacheNode, existingChildCacheNode, flightDataPath[2]);
            }
            (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(childCacheNode, existingChildCacheNode, flightDataPath[2], flightDataPath[4], wasPrefetched);
            childSegmentMap.set(cacheKey, childCacheNode);
        }
        return;
    }
    if (!childCacheNode || !existingChildCacheNode) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    fillCacheWithNewSubTreeData(childCacheNode, existingChildCacheNode, flightDataPath.slice(2), wasPrefetched);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-cache-with-new-subtree-data.js.map


/***/ }),

/***/ 2684:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fillLazyItemsTillLeafWithHead", ({
    enumerable: true,
    get: function() {
        return fillLazyItemsTillLeafWithHead;
    }
}));
const _approutercontext = __webpack_require__(7085);
const _createroutercachekey = __webpack_require__(8870);
function fillLazyItemsTillLeafWithHead(newCache, existingCache, routerState, head, wasPrefetched) {
    const isLastSegment = Object.keys(routerState[1]).length === 0;
    if (isLastSegment) {
        newCache.head = head;
        return;
    }
    // Remove segment that we got data for so that it is filled in during rendering of subTreeData.
    for(const key in routerState[1]){
        const parallelRouteState = routerState[1][key];
        const segmentForParallelRoute = parallelRouteState[0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segmentForParallelRoute);
        if (existingCache) {
            const existingParallelRoutesCacheNode = existingCache.parallelRoutes.get(key);
            if (existingParallelRoutesCacheNode) {
                let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
                const existingCacheNode = parallelRouteCacheNode.get(cacheKey);
                const newCacheNode = wasPrefetched && existingCacheNode ? {
                    status: existingCacheNode.status,
                    data: existingCacheNode.data,
                    subTreeData: existingCacheNode.subTreeData,
                    parallelRoutes: new Map(existingCacheNode.parallelRoutes)
                } : {
                    status: _approutercontext.CacheStates.LAZY_INITIALIZED,
                    data: null,
                    subTreeData: null,
                    parallelRoutes: new Map(existingCacheNode == null ? void 0 : existingCacheNode.parallelRoutes)
                };
                // Overrides the cache key with the new cache node.
                parallelRouteCacheNode.set(cacheKey, newCacheNode);
                // Traverse deeper to apply the head / fill lazy items till the head.
                fillLazyItemsTillLeafWithHead(newCacheNode, existingCacheNode, parallelRouteState, head, wasPrefetched);
                newCache.parallelRoutes.set(key, parallelRouteCacheNode);
                continue;
            }
        }
        const newCacheNode = {
            status: _approutercontext.CacheStates.LAZY_INITIALIZED,
            data: null,
            subTreeData: null,
            parallelRoutes: new Map()
        };
        const existingParallelRoutes = newCache.parallelRoutes.get(key);
        if (existingParallelRoutes) {
            existingParallelRoutes.set(cacheKey, newCacheNode);
        } else {
            newCache.parallelRoutes.set(key, new Map([
                [
                    cacheKey,
                    newCacheNode
                ]
            ]));
        }
        fillLazyItemsTillLeafWithHead(newCacheNode, undefined, parallelRouteState, head, wasPrefetched);
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-lazy-items-till-leaf-with-head.js.map


/***/ }),

/***/ 6489:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PrefetchCacheEntryStatus: function() {
        return PrefetchCacheEntryStatus;
    },
    getPrefetchEntryCacheStatus: function() {
        return getPrefetchEntryCacheStatus;
    }
});
const FIVE_MINUTES = 5 * 60 * 1000;
const THIRTY_SECONDS = 30 * 1000;
var PrefetchCacheEntryStatus;
(function(PrefetchCacheEntryStatus) {
    PrefetchCacheEntryStatus["fresh"] = "fresh";
    PrefetchCacheEntryStatus["reusable"] = "reusable";
    PrefetchCacheEntryStatus["expired"] = "expired";
    PrefetchCacheEntryStatus["stale"] = "stale";
})(PrefetchCacheEntryStatus || (PrefetchCacheEntryStatus = {}));
function getPrefetchEntryCacheStatus(param) {
    let { kind, prefetchTime, lastUsedTime } = param;
    // if the cache entry was prefetched or read less than 30s ago, then we want to re-use it
    if (Date.now() < (lastUsedTime != null ? lastUsedTime : prefetchTime) + THIRTY_SECONDS) {
        return lastUsedTime ? "reusable" : "fresh";
    }
    // if the cache entry was prefetched less than 5 mins ago, then we want to re-use only the loading state
    if (kind === "auto") {
        if (Date.now() < prefetchTime + FIVE_MINUTES) {
            return "stale";
        }
    }
    // if the cache entry was prefetched less than 5 mins ago and was a "full" prefetch, then we want to re-use it "full
    if (kind === "full") {
        if (Date.now() < prefetchTime + FIVE_MINUTES) {
            return "reusable";
        }
    }
    return "expired";
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-prefetch-cache-entry-status.js.map


/***/ }),

/***/ 7462:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "handleMutable", ({
    enumerable: true,
    get: function() {
        return handleMutable;
    }
}));
const _computechangedpath = __webpack_require__(579);
function handleMutable(state, mutable) {
    var _mutable_canonicalUrl;
    var _mutable_shouldScroll;
    // shouldScroll is true by default, can override to false.
    const shouldScroll = (_mutable_shouldScroll = mutable.shouldScroll) != null ? _mutable_shouldScroll : true;
    var _mutable_scrollableSegments, _computeChangedPath;
    return {
        buildId: state.buildId,
        // Set href.
        canonicalUrl: mutable.canonicalUrl != null ? mutable.canonicalUrl === state.canonicalUrl ? state.canonicalUrl : mutable.canonicalUrl : state.canonicalUrl,
        pushRef: {
            pendingPush: mutable.pendingPush != null ? mutable.pendingPush : state.pushRef.pendingPush,
            mpaNavigation: mutable.mpaNavigation != null ? mutable.mpaNavigation : state.pushRef.mpaNavigation
        },
        // All navigation requires scroll and focus management to trigger.
        focusAndScrollRef: {
            apply: shouldScroll ? (mutable == null ? void 0 : mutable.scrollableSegments) !== undefined ? true : state.focusAndScrollRef.apply : false,
            onlyHashChange: !!mutable.hashFragment && state.canonicalUrl.split("#")[0] === ((_mutable_canonicalUrl = mutable.canonicalUrl) == null ? void 0 : _mutable_canonicalUrl.split("#")[0]),
            hashFragment: shouldScroll ? mutable.hashFragment && mutable.hashFragment !== "" ? decodeURIComponent(mutable.hashFragment.slice(1)) : state.focusAndScrollRef.hashFragment : null,
            segmentPaths: shouldScroll ? (_mutable_scrollableSegments = mutable == null ? void 0 : mutable.scrollableSegments) != null ? _mutable_scrollableSegments : state.focusAndScrollRef.segmentPaths : []
        },
        // Apply cache.
        cache: mutable.cache ? mutable.cache : state.cache,
        prefetchCache: mutable.prefetchCache ? mutable.prefetchCache : state.prefetchCache,
        // Apply patched router state.
        tree: mutable.patchedTree !== undefined ? mutable.patchedTree : state.tree,
        nextUrl: mutable.patchedTree !== undefined ? (_computeChangedPath = (0, _computechangedpath.computeChangedPath)(state.tree, mutable.patchedTree)) != null ? _computeChangedPath : state.canonicalUrl : state.nextUrl
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=handle-mutable.js.map


/***/ }),

/***/ 8457:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "invalidateCacheBelowFlightSegmentPath", ({
    enumerable: true,
    get: function() {
        return invalidateCacheBelowFlightSegmentPath;
    }
}));
const _createroutercachekey = __webpack_require__(8870);
function invalidateCacheBelowFlightSegmentPath(newCache, existingCache, flightSegmentPath) {
    const isLastEntry = flightSegmentPath.length <= 2;
    const [parallelRouteKey, segment] = flightSegmentPath;
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    // In case of last entry don't copy further down.
    if (isLastEntry) {
        childSegmentMap.delete(cacheKey);
        return;
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    if (!childCacheNode || !existingChildCacheNode) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    invalidateCacheBelowFlightSegmentPath(childCacheNode, existingChildCacheNode, flightSegmentPath.slice(2));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=invalidate-cache-below-flight-segmentpath.js.map


/***/ }),

/***/ 1727:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "invalidateCacheByRouterState", ({
    enumerable: true,
    get: function() {
        return invalidateCacheByRouterState;
    }
}));
const _createroutercachekey = __webpack_require__(8870);
function invalidateCacheByRouterState(newCache, existingCache, routerState) {
    // Remove segment that we got data for so that it is filled in during rendering of subTreeData.
    for(const key in routerState[1]){
        const segmentForParallelRoute = routerState[1][key][0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segmentForParallelRoute);
        const existingParallelRoutesCacheNode = existingCache.parallelRoutes.get(key);
        if (existingParallelRoutesCacheNode) {
            let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
            parallelRouteCacheNode.delete(cacheKey);
            newCache.parallelRoutes.set(key, parallelRouteCacheNode);
        }
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=invalidate-cache-by-router-state.js.map


/***/ }),

/***/ 2615:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNavigatingToNewRootLayout", ({
    enumerable: true,
    get: function() {
        return isNavigatingToNewRootLayout;
    }
}));
function isNavigatingToNewRootLayout(currentTree, nextTree) {
    // Compare segments
    const currentTreeSegment = currentTree[0];
    const nextTreeSegment = nextTree[0];
    // If any segment is different before we find the root layout, the root layout has changed.
    // E.g. /same/(group1)/layout.js -> /same/(group2)/layout.js
    // First segment is 'same' for both, keep looking. (group1) changed to (group2) before the root layout was found, it must have changed.
    if (Array.isArray(currentTreeSegment) && Array.isArray(nextTreeSegment)) {
        // Compare dynamic param name and type but ignore the value, different values would not affect the current root layout
        // /[name] - /slug1 and /slug2, both values (slug1 & slug2) still has the same layout /[name]/layout.js
        if (currentTreeSegment[0] !== nextTreeSegment[0] || currentTreeSegment[2] !== nextTreeSegment[2]) {
            return true;
        }
    } else if (currentTreeSegment !== nextTreeSegment) {
        return true;
    }
    // Current tree root layout found
    if (currentTree[4]) {
        // If the next tree doesn't have the root layout flag, it must have changed.
        return !nextTree[4];
    }
    // Current tree  didn't have its root layout here, must have changed.
    if (nextTree[4]) {
        return true;
    }
    // We can't assume it's `parallelRoutes.children` here in case the root layout is `app/@something/layout.js`
    // But it's not possible to be more than one parallelRoutes before the root layout is found
    // TODO-APP: change to traverse all parallel routes
    const currentTreeChild = Object.values(currentTree[1])[0];
    const nextTreeChild = Object.values(nextTree[1])[0];
    if (!currentTreeChild || !nextTreeChild) return true;
    return isNavigatingToNewRootLayout(currentTreeChild, nextTreeChild);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-navigating-to-new-root-layout.js.map


/***/ }),

/***/ 2401:
/***/ ((module, exports) => {

"use strict";
/**
 * Read record value or throw Promise if it's not resolved yet.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "readRecordValue", ({
    enumerable: true,
    get: function() {
        return readRecordValue;
    }
}));
function readRecordValue(thenable) {
    // @ts-expect-error TODO: fix type
    if (thenable.status === "fulfilled") {
        // @ts-expect-error TODO: fix type
        return thenable.value;
    } else {
        throw thenable;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=read-record-value.js.map


/***/ }),

/***/ 7300:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fastRefreshReducer", ({
    enumerable: true,
    get: function() {
        return fastRefreshReducer;
    }
}));
const _fetchserverresponse = __webpack_require__(8080);
const _createrecordfromthenable = __webpack_require__(4621);
const _readrecordvalue = __webpack_require__(2401);
const _createhreffromurl = __webpack_require__(4331);
const _applyrouterstatepatchtotree = __webpack_require__(3914);
const _isnavigatingtonewrootlayout = __webpack_require__(2615);
const _navigatereducer = __webpack_require__(9962);
const _handlemutable = __webpack_require__(7462);
const _applyflightdata = __webpack_require__(4173);
// A version of refresh reducer that keeps the cache around instead of wiping all of it.
function fastRefreshReducerImpl(state, action) {
    const { cache, mutable, origin } = action;
    const href = state.canonicalUrl;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(new URL(href, origin), [
            state.tree[0],
            state.tree[1],
            state.tree[2],
            "refetch"
        ], state.nextUrl, state.buildId));
    }
    const [flightData, canonicalUrlOverride] = (0, _readrecordvalue.readRecordValue)(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    let currentTree = state.tree;
    let currentCache = state.cache;
    for (const flightDataPath of flightData){
        // FlightDataPath with more than two items means unexpected Flight data was returned
        if (flightDataPath.length !== 3) {
            // TODO-APP: handle this case better
            console.log("REFRESH FAILED");
            return state;
        }
        // Given the path can only have two items the items are only the router state and subTreeData for the root.
        const [treePatch] = flightDataPath;
        const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
            ""
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : undefined;
        if (canonicalUrlOverride) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        const applied = (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath);
        if (applied) {
            mutable.cache = cache;
            currentCache = cache;
        }
        mutable.previousTree = currentTree;
        mutable.patchedTree = newTree;
        mutable.canonicalUrl = href;
        currentTree = newTree;
    }
    return (0, _handlemutable.handleMutable)(state, mutable);
}
function fastRefreshReducerNoop(state, _action) {
    return state;
}
const fastRefreshReducer =  true ? fastRefreshReducerNoop : 0;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fast-refresh-reducer.js.map


/***/ }),

/***/ 1333:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "findHeadInCache", ({
    enumerable: true,
    get: function() {
        return findHeadInCache;
    }
}));
const _createroutercachekey = __webpack_require__(8870);
function findHeadInCache(cache, parallelRoutes) {
    const isLastItem = Object.keys(parallelRoutes).length === 0;
    if (isLastItem) {
        return cache.head;
    }
    for(const key in parallelRoutes){
        const [segment, childParallelRoutes] = parallelRoutes[key];
        const childSegmentMap = cache.parallelRoutes.get(key);
        if (!childSegmentMap) {
            continue;
        }
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
        const cacheNode = childSegmentMap.get(cacheKey);
        if (!cacheNode) {
            continue;
        }
        const item = findHeadInCache(cacheNode, childParallelRoutes);
        if (item) {
            return item;
        }
    }
    return undefined;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=find-head-in-cache.js.map


/***/ }),

/***/ 7741:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSegmentValue", ({
    enumerable: true,
    get: function() {
        return getSegmentValue;
    }
}));
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map


/***/ }),

/***/ 9962:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleExternalUrl: function() {
        return handleExternalUrl;
    },
    navigateReducer: function() {
        return navigateReducer;
    }
});
const _approutercontext = __webpack_require__(7085);
const _fetchserverresponse = __webpack_require__(8080);
const _createrecordfromthenable = __webpack_require__(4621);
const _readrecordvalue = __webpack_require__(2401);
const _createhreffromurl = __webpack_require__(4331);
const _invalidatecachebelowflightsegmentpath = __webpack_require__(8457);
const _fillcachewithdataproperty = __webpack_require__(9996);
const _createoptimistictree = __webpack_require__(8503);
const _applyrouterstatepatchtotree = __webpack_require__(3914);
const _shouldhardnavigate = __webpack_require__(8072);
const _isnavigatingtonewrootlayout = __webpack_require__(2615);
const _routerreducertypes = __webpack_require__(2836);
const _handlemutable = __webpack_require__(7462);
const _applyflightdata = __webpack_require__(4173);
const _getprefetchcacheentrystatus = __webpack_require__(6489);
const _pruneprefetchcache = __webpack_require__(7025);
const _prefetchreducer = __webpack_require__(1910);
function handleExternalUrl(state, mutable, url, pendingPush) {
    mutable.previousTree = state.tree;
    mutable.mpaNavigation = true;
    mutable.canonicalUrl = url;
    mutable.pendingPush = pendingPush;
    mutable.scrollableSegments = undefined;
    return (0, _handlemutable.handleMutable)(state, mutable);
}
function generateSegmentsFromPatch(flightRouterPatch) {
    const segments = [];
    const [segment, parallelRoutes] = flightRouterPatch;
    if (Object.keys(parallelRoutes).length === 0) {
        return [
            [
                segment
            ]
        ];
    }
    for (const [parallelRouteKey, parallelRoute] of Object.entries(parallelRoutes)){
        for (const childSegment of generateSegmentsFromPatch(parallelRoute)){
            // If the segment is empty, it means we are at the root of the tree
            if (segment === "") {
                segments.push([
                    parallelRouteKey,
                    ...childSegment
                ]);
            } else {
                segments.push([
                    segment,
                    parallelRouteKey,
                    ...childSegment
                ]);
            }
        }
    }
    return segments;
}
function addRefetchToLeafSegments(newCache, currentCache, flightSegmentPath, treePatch, data) {
    let appliedPatch = false;
    newCache.status = _approutercontext.CacheStates.READY;
    newCache.subTreeData = currentCache.subTreeData;
    newCache.parallelRoutes = new Map(currentCache.parallelRoutes);
    const segmentPathsToFill = generateSegmentsFromPatch(treePatch).map((segment)=>[
            ...flightSegmentPath,
            ...segment
        ]);
    for (const segmentPaths of segmentPathsToFill){
        const res = (0, _fillcachewithdataproperty.fillCacheWithDataProperty)(newCache, currentCache, segmentPaths, data);
        if (!(res == null ? void 0 : res.bailOptimistic)) {
            appliedPatch = true;
        }
    }
    return appliedPatch;
}
function navigateReducer(state, action) {
    const { url, isExternalUrl, navigateType, cache, mutable, forceOptimisticNavigation, shouldScroll } = action;
    const { pathname, hash } = url;
    const href = (0, _createhreffromurl.createHrefFromUrl)(url);
    const pendingPush = navigateType === "push";
    // we want to prune the prefetch cache on every navigation to avoid it growing too large
    (0, _pruneprefetchcache.prunePrefetchCache)(state.prefetchCache);
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (isExternalUrl) {
        return handleExternalUrl(state, mutable, url.toString(), pendingPush);
    }
    let prefetchValues = state.prefetchCache.get((0, _createhreffromurl.createHrefFromUrl)(url, false));
    if (forceOptimisticNavigation && (prefetchValues == null ? void 0 : prefetchValues.kind) !== _routerreducertypes.PrefetchKind.TEMPORARY) {
        const segments = pathname.split("/");
        // TODO-APP: figure out something better for index pages
        segments.push("__PAGE__");
        // Optimistic tree case.
        // If the optimistic tree is deeper than the current state leave that deeper part out of the fetch
        const optimisticTree = (0, _createoptimistictree.createOptimisticTree)(segments, state.tree, false);
        // we need a copy of the cache in case we need to revert to it
        const temporaryCacheNode = {
            ...cache
        };
        // Copy subTreeData for the root node of the cache.
        // Note: didn't do it above because typescript doesn't like it.
        temporaryCacheNode.status = _approutercontext.CacheStates.READY;
        temporaryCacheNode.subTreeData = state.cache.subTreeData;
        temporaryCacheNode.parallelRoutes = new Map(state.cache.parallelRoutes);
        let data;
        const fetchResponse = ()=>{
            if (!data) {
                data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(url, optimisticTree, state.nextUrl, state.buildId));
            }
            return data;
        };
        // TODO-APP: segments.slice(1) strips '', we can get rid of '' altogether.
        // TODO-APP: re-evaluate if we need to strip the last segment
        const optimisticFlightSegmentPath = segments.slice(1).map((segment)=>[
                "children",
                segment
            ]).flat();
        // Copy existing cache nodes as far as possible and fill in `data` property with the started data fetch.
        // The `data` property is used to suspend in layout-router during render if it hasn't resolved yet by the time it renders.
        const res = (0, _fillcachewithdataproperty.fillCacheWithDataProperty)(temporaryCacheNode, state.cache, optimisticFlightSegmentPath, fetchResponse, true);
        // If optimistic fetch couldn't happen it falls back to the non-optimistic case.
        if (!(res == null ? void 0 : res.bailOptimistic)) {
            mutable.previousTree = state.tree;
            mutable.patchedTree = optimisticTree;
            mutable.pendingPush = pendingPush;
            mutable.hashFragment = hash;
            mutable.shouldScroll = shouldScroll;
            mutable.scrollableSegments = [];
            mutable.cache = temporaryCacheNode;
            mutable.canonicalUrl = href;
            state.prefetchCache.set((0, _createhreffromurl.createHrefFromUrl)(url, false), {
                data: Promise.resolve(data),
                // this will make sure that the entry will be discarded after 30s
                kind: _routerreducertypes.PrefetchKind.TEMPORARY,
                prefetchTime: Date.now(),
                treeAtTimeOfPrefetch: state.tree,
                lastUsedTime: Date.now()
            });
            return (0, _handlemutable.handleMutable)(state, mutable);
        }
    }
    // If we don't have a prefetch value, we need to create one
    if (!prefetchValues) {
        const data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(url, state.tree, state.nextUrl, state.buildId, // in order to simulate the behavior of the prefetch cache
         false ? 0 : undefined));
        const newPrefetchValue = {
            data: Promise.resolve(data),
            // this will make sure that the entry will be discarded after 30s
            kind:  false ? 0 : _routerreducertypes.PrefetchKind.TEMPORARY,
            prefetchTime: Date.now(),
            treeAtTimeOfPrefetch: state.tree,
            lastUsedTime: null
        };
        state.prefetchCache.set((0, _createhreffromurl.createHrefFromUrl)(url, false), newPrefetchValue);
        prefetchValues = newPrefetchValue;
    }
    const prefetchEntryCacheStatus = (0, _getprefetchcacheentrystatus.getPrefetchEntryCacheStatus)(prefetchValues);
    // The one before last item is the router state tree patch
    const { treeAtTimeOfPrefetch, data } = prefetchValues;
    _prefetchreducer.prefetchQueue.bump(data);
    // Unwrap cache data with `use` to suspend here (in the reducer) until the fetch resolves.
    const [flightData, canonicalUrlOverride] = (0, _readrecordvalue.readRecordValue)(data);
    // important: we should only mark the cache node as dirty after we unsuspend from the call above
    prefetchValues.lastUsedTime = Date.now();
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return handleExternalUrl(state, mutable, flightData, pendingPush);
    }
    let currentTree = state.tree;
    let currentCache = state.cache;
    let scrollableSegments = [];
    for (const flightDataPath of flightData){
        const flightSegmentPath = flightDataPath.slice(0, -4);
        // The one before last item is the router state tree patch
        const treePatch = flightDataPath.slice(-3)[0];
        // TODO-APP: remove ''
        const flightSegmentPathWithLeadingEmpty = [
            "",
            ...flightSegmentPath
        ];
        // Create new tree based on the flightSegmentPath and router state patch
        let newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(flightSegmentPathWithLeadingEmpty, currentTree, treePatch);
        // If the tree patch can't be applied to the current tree then we use the tree at time of prefetch
        // TODO-APP: This should instead fill in the missing pieces in `currentTree` with the data from `treeAtTimeOfPrefetch`, then apply the patch.
        if (newTree === null) {
            newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(flightSegmentPathWithLeadingEmpty, treeAtTimeOfPrefetch, treePatch);
        }
        if (newTree !== null) {
            if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
                return handleExternalUrl(state, mutable, href, pendingPush);
            }
            let applied = (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath, prefetchValues.kind === "auto" && prefetchEntryCacheStatus === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.reusable);
            if (!applied && prefetchEntryCacheStatus === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.stale) {
                applied = addRefetchToLeafSegments(cache, currentCache, flightSegmentPath, treePatch, ()=>(0, _fetchserverresponse.fetchServerResponse)(url, currentTree, state.nextUrl, state.buildId));
            }
            const hardNavigate = (0, _shouldhardnavigate.shouldHardNavigate)(flightSegmentPathWithLeadingEmpty, currentTree);
            if (hardNavigate) {
                cache.status = _approutercontext.CacheStates.READY;
                // Copy subTreeData for the root node of the cache.
                cache.subTreeData = currentCache.subTreeData;
                (0, _invalidatecachebelowflightsegmentpath.invalidateCacheBelowFlightSegmentPath)(cache, currentCache, flightSegmentPath);
                // Ensure the existing cache value is used when the cache was not invalidated.
                mutable.cache = cache;
            } else if (applied) {
                mutable.cache = cache;
            }
            currentCache = cache;
            currentTree = newTree;
            for (const subSegment of generateSegmentsFromPatch(treePatch)){
                const scrollableSegmentPath = [
                    ...flightSegmentPath,
                    ...subSegment
                ];
                // Filter out the __DEFAULT__ paths as they shouldn't be scrolled to in this case.
                if (scrollableSegmentPath[scrollableSegmentPath.length - 1] !== "__DEFAULT__") {
                    scrollableSegments.push(scrollableSegmentPath);
                }
            }
        }
    }
    mutable.previousTree = state.tree;
    mutable.patchedTree = currentTree;
    mutable.canonicalUrl = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : href;
    mutable.pendingPush = pendingPush;
    mutable.scrollableSegments = scrollableSegments;
    mutable.hashFragment = hash;
    mutable.shouldScroll = shouldScroll;
    return (0, _handlemutable.handleMutable)(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigate-reducer.js.map


/***/ }),

/***/ 1910:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    prefetchQueue: function() {
        return prefetchQueue;
    },
    prefetchReducer: function() {
        return prefetchReducer;
    }
});
const _createhreffromurl = __webpack_require__(4331);
const _fetchserverresponse = __webpack_require__(8080);
const _routerreducertypes = __webpack_require__(2836);
const _createrecordfromthenable = __webpack_require__(4621);
const _pruneprefetchcache = __webpack_require__(7025);
const _approuterheaders = __webpack_require__(6265);
const _promisequeue = __webpack_require__(8811);
const prefetchQueue = new _promisequeue.PromiseQueue(5);
function prefetchReducer(state, action) {
    // let's prune the prefetch cache before we do anything else
    (0, _pruneprefetchcache.prunePrefetchCache)(state.prefetchCache);
    const { url } = action;
    url.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
    const href = (0, _createhreffromurl.createHrefFromUrl)(url, false);
    const cacheEntry = state.prefetchCache.get(href);
    if (cacheEntry) {
        /**
     * If the cache entry present was marked as temporary, it means that we prefetched it from the navigate reducer,
     * where we didn't have the prefetch intent. We want to update it to the new, more accurate, kind here.
     */ if (cacheEntry.kind === _routerreducertypes.PrefetchKind.TEMPORARY) {
            state.prefetchCache.set(href, {
                ...cacheEntry,
                kind: action.kind
            });
        }
        /**
     * if the prefetch action was a full prefetch and that the current cache entry wasn't one, we want to re-prefetch,
     * otherwise we can re-use the current cache entry
     **/ if (!(cacheEntry.kind === _routerreducertypes.PrefetchKind.AUTO && action.kind === _routerreducertypes.PrefetchKind.FULL)) {
            return state;
        }
    }
    // fetchServerResponse is intentionally not awaited so that it can be unwrapped in the navigate-reducer
    const serverResponse = (0, _createrecordfromthenable.createRecordFromThenable)(prefetchQueue.enqueue(()=>(0, _fetchserverresponse.fetchServerResponse)(url, state.tree, state.nextUrl, state.buildId, action.kind)));
    // Create new tree based on the flightSegmentPath and router state patch
    state.prefetchCache.set(href, {
        // Create new tree based on the flightSegmentPath and router state patch
        treeAtTimeOfPrefetch: state.tree,
        data: serverResponse,
        kind: action.kind,
        prefetchTime: Date.now(),
        lastUsedTime: null
    });
    return state;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=prefetch-reducer.js.map


/***/ }),

/***/ 7025:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "prunePrefetchCache", ({
    enumerable: true,
    get: function() {
        return prunePrefetchCache;
    }
}));
const _getprefetchcacheentrystatus = __webpack_require__(6489);
function prunePrefetchCache(prefetchCache) {
    for (const [href, prefetchCacheEntry] of prefetchCache){
        if ((0, _getprefetchcacheentrystatus.getPrefetchEntryCacheStatus)(prefetchCacheEntry) === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.expired) {
            prefetchCache.delete(href);
        }
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=prune-prefetch-cache.js.map


/***/ }),

/***/ 2111:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "refreshReducer", ({
    enumerable: true,
    get: function() {
        return refreshReducer;
    }
}));
const _fetchserverresponse = __webpack_require__(8080);
const _createrecordfromthenable = __webpack_require__(4621);
const _readrecordvalue = __webpack_require__(2401);
const _createhreffromurl = __webpack_require__(4331);
const _applyrouterstatepatchtotree = __webpack_require__(3914);
const _isnavigatingtonewrootlayout = __webpack_require__(2615);
const _navigatereducer = __webpack_require__(9962);
const _handlemutable = __webpack_require__(7462);
const _approutercontext = __webpack_require__(7085);
const _filllazyitemstillleafwithhead = __webpack_require__(2684);
function refreshReducer(state, action) {
    const { cache, mutable, origin } = action;
    const href = state.canonicalUrl;
    let currentTree = state.tree;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(currentTree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(new URL(href, origin), [
            currentTree[0],
            currentTree[1],
            currentTree[2],
            "refetch"
        ], state.nextUrl, state.buildId));
    }
    const [flightData, canonicalUrlOverride] = (0, _readrecordvalue.readRecordValue)(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    for (const flightDataPath of flightData){
        // FlightDataPath with more than two items means unexpected Flight data was returned
        if (flightDataPath.length !== 3) {
            // TODO-APP: handle this case better
            console.log("REFRESH FAILED");
            return state;
        }
        // Given the path can only have two items the items are only the router state and subTreeData for the root.
        const [treePatch] = flightDataPath;
        const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
            ""
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : undefined;
        if (canonicalUrlOverride) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        // The one before last item is the router state tree patch
        const [subTreeData, head] = flightDataPath.slice(-2);
        // Handles case where prefetch only returns the router tree patch without rendered components.
        if (subTreeData !== null) {
            cache.status = _approutercontext.CacheStates.READY;
            cache.subTreeData = subTreeData;
            (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, undefined, treePatch, head);
            mutable.cache = cache;
            mutable.prefetchCache = new Map();
        }
        mutable.previousTree = currentTree;
        mutable.patchedTree = newTree;
        mutable.canonicalUrl = href;
        currentTree = newTree;
    }
    return (0, _handlemutable.handleMutable)(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=refresh-reducer.js.map


/***/ }),

/***/ 9425:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "restoreReducer", ({
    enumerable: true,
    get: function() {
        return restoreReducer;
    }
}));
const _createhreffromurl = __webpack_require__(4331);
function restoreReducer(state, action) {
    const { url, tree } = action;
    const href = (0, _createhreffromurl.createHrefFromUrl)(url);
    return {
        buildId: state.buildId,
        // Set canonical url
        canonicalUrl: href,
        pushRef: state.pushRef,
        focusAndScrollRef: state.focusAndScrollRef,
        cache: state.cache,
        prefetchCache: state.prefetchCache,
        // Restore provided tree
        tree: tree,
        nextUrl: url.pathname
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=restore-reducer.js.map


/***/ }),

/***/ 7238:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "serverActionReducer", ({
    enumerable: true,
    get: function() {
        return serverActionReducer;
    }
}));
const _appcallserver = __webpack_require__(6937);
const _approuterheaders = __webpack_require__(6265);
const _createrecordfromthenable = __webpack_require__(4621);
const _readrecordvalue = __webpack_require__(2401);
const _client = __webpack_require__(7897);
const _addbasepath = __webpack_require__(4578);
const _createhreffromurl = __webpack_require__(4331);
const _navigatereducer = __webpack_require__(9962);
const _applyrouterstatepatchtotree = __webpack_require__(3914);
const _isnavigatingtonewrootlayout = __webpack_require__(2615);
const _approutercontext = __webpack_require__(7085);
const _handlemutable = __webpack_require__(7462);
const _filllazyitemstillleafwithhead = __webpack_require__(2684);
async function fetchServerAction(state, param) {
    let { actionId, actionArgs } = param;
    const body = await (0, _client.encodeReply)(actionArgs);
    const res = await fetch("", {
        method: "POST",
        headers: {
            Accept: _approuterheaders.RSC_CONTENT_TYPE_HEADER,
            "Next-Action": actionId,
            [_approuterheaders.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(JSON.stringify(state.tree)),
            ... false ? 0 : {},
            ...state.nextUrl ? {
                [_approuterheaders.NEXT_URL]: state.nextUrl
            } : {}
        },
        body
    });
    const location = res.headers.get("x-action-redirect");
    let revalidatedParts;
    try {
        const revalidatedHeader = JSON.parse(res.headers.get("x-action-revalidated") || "[[],0,0]");
        revalidatedParts = {
            paths: revalidatedHeader[0] || [],
            tag: !!revalidatedHeader[1],
            cookie: revalidatedHeader[2]
        };
    } catch (e) {
        revalidatedParts = {
            paths: [],
            tag: false,
            cookie: false
        };
    }
    const redirectLocation = location ? new URL((0, _addbasepath.addBasePath)(location), window.location.origin) : undefined;
    let isFlightResponse = res.headers.get("content-type") === _approuterheaders.RSC_CONTENT_TYPE_HEADER;
    if (isFlightResponse) {
        const response = await (0, _client.createFromFetch)(Promise.resolve(res), {
            callServer: _appcallserver.callServer
        });
        if (location) {
            // if it was a redirection, then result is just a regular RSC payload
            const [, actionFlightData] = response != null ? response : [];
            return {
                actionFlightData: actionFlightData,
                redirectLocation,
                revalidatedParts
            };
        }
        // otherwise it's a tuple of [actionResult, actionFlightData]
        const [actionResult, [, actionFlightData]] = response != null ? response : [];
        return {
            actionResult,
            actionFlightData,
            redirectLocation,
            revalidatedParts
        };
    }
    return {
        redirectLocation,
        revalidatedParts
    };
}
function serverActionReducer(state, action) {
    const { mutable, cache, resolve, reject } = action;
    const href = state.canonicalUrl;
    let currentTree = state.tree;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(currentTree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (!action.mutable.inFlightServerAction) {
        action.mutable.inFlightServerAction = (0, _createrecordfromthenable.createRecordFromThenable)(fetchServerAction(state, action));
    }
    // TODO-APP: Make try/catch wrap only readRecordValue so that other errors bubble up through the reducer instead.
    try {
        // suspends until the server action is resolved.
        const { actionResult, actionFlightData: flightData, redirectLocation } = (0, _readrecordvalue.readRecordValue)(action.mutable.inFlightServerAction);
        mutable.previousTree = state.tree;
        if (!flightData) {
            if (!mutable.actionResultResolved) {
                resolve(actionResult);
                mutable.actionResultResolved = true;
            }
            // If there is a redirect but no flight data we need to do a mpaNavigation.
            if (redirectLocation) {
                return (0, _navigatereducer.handleExternalUrl)(state, mutable, redirectLocation.href, state.pushRef.pendingPush);
            }
            return state;
        }
        if (typeof flightData === "string") {
            // Handle case when navigating to page in `pages` from `app`
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
        }
        // Remove cache.data as it has been resolved at this point.
        mutable.inFlightServerAction = null;
        for (const flightDataPath of flightData){
            // FlightDataPath with more than two items means unexpected Flight data was returned
            if (flightDataPath.length !== 3) {
                // TODO-APP: handle this case better
                console.log("SERVER ACTION APPLY FAILED");
                return state;
            }
            // Given the path can only have two items the items are only the router state and subTreeData for the root.
            const [treePatch] = flightDataPath;
            const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
                ""
            ], currentTree, treePatch);
            if (newTree === null) {
                throw new Error("SEGMENT MISMATCH");
            }
            if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
                return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
            }
            // The one before last item is the router state tree patch
            const [subTreeData, head] = flightDataPath.slice(-2);
            // Handles case where prefetch only returns the router tree patch without rendered components.
            if (subTreeData !== null) {
                cache.status = _approutercontext.CacheStates.READY;
                cache.subTreeData = subTreeData;
                (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, undefined, treePatch, head);
                mutable.cache = cache;
                mutable.prefetchCache = new Map();
            }
            mutable.previousTree = currentTree;
            mutable.patchedTree = newTree;
            mutable.canonicalUrl = href;
            currentTree = newTree;
        }
        if (redirectLocation) {
            const newHref = (0, _createhreffromurl.createHrefFromUrl)(redirectLocation, false);
            mutable.canonicalUrl = newHref;
        }
        if (!mutable.actionResultResolved) {
            resolve(actionResult);
            mutable.actionResultResolved = true;
        }
        return (0, _handlemutable.handleMutable)(state, mutable);
    } catch (e) {
        if (e.status === "rejected") {
            if (!mutable.actionResultResolved) {
                reject(e.value);
                mutable.actionResultResolved = true;
            }
            // When the server action is rejected we don't update the state and instead call the reject handler of the promise.
            return state;
        }
        throw e;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-action-reducer.js.map


/***/ }),

/***/ 5022:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "serverPatchReducer", ({
    enumerable: true,
    get: function() {
        return serverPatchReducer;
    }
}));
const _createhreffromurl = __webpack_require__(4331);
const _applyrouterstatepatchtotree = __webpack_require__(3914);
const _isnavigatingtonewrootlayout = __webpack_require__(2615);
const _navigatereducer = __webpack_require__(9962);
const _applyflightdata = __webpack_require__(4173);
const _handlemutable = __webpack_require__(7462);
function serverPatchReducer(state, action) {
    const { flightData, previousTree, overrideCanonicalUrl, cache, mutable } = action;
    const isForCurrentTree = JSON.stringify(previousTree) === JSON.stringify(state.tree);
    // When a fetch is slow to resolve it could be that you navigated away while the request was happening or before the reducer runs.
    // In that case opt-out of applying the patch given that the data could be stale.
    if (!isForCurrentTree) {
        // TODO-APP: Handle tree mismatch
        console.log("TREE MISMATCH");
        // Keep everything as-is.
        return state;
    }
    if (mutable.previousTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
    }
    let currentTree = state.tree;
    let currentCache = state.cache;
    for (const flightDataPath of flightData){
        // Slices off the last segment (which is at -4) as it doesn't exist in the tree yet
        const flightSegmentPath = flightDataPath.slice(0, -4);
        const [treePatch] = flightDataPath.slice(-3, -2);
        const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
            "",
            ...flightSegmentPath
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, state.canonicalUrl, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = overrideCanonicalUrl ? (0, _createhreffromurl.createHrefFromUrl)(overrideCanonicalUrl) : undefined;
        if (canonicalUrlOverrideHref) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath);
        mutable.previousTree = currentTree;
        mutable.patchedTree = newTree;
        mutable.cache = cache;
        currentCache = cache;
        currentTree = newTree;
    }
    return (0, _handlemutable.handleMutable)(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-patch-reducer.js.map


/***/ }),

/***/ 2836:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PrefetchKind: function() {
        return PrefetchKind;
    },
    ACTION_REFRESH: function() {
        return ACTION_REFRESH;
    },
    ACTION_NAVIGATE: function() {
        return ACTION_NAVIGATE;
    },
    ACTION_RESTORE: function() {
        return ACTION_RESTORE;
    },
    ACTION_SERVER_PATCH: function() {
        return ACTION_SERVER_PATCH;
    },
    ACTION_PREFETCH: function() {
        return ACTION_PREFETCH;
    },
    ACTION_FAST_REFRESH: function() {
        return ACTION_FAST_REFRESH;
    },
    ACTION_SERVER_ACTION: function() {
        return ACTION_SERVER_ACTION;
    }
});
const ACTION_REFRESH = "refresh";
const ACTION_NAVIGATE = "navigate";
const ACTION_RESTORE = "restore";
const ACTION_SERVER_PATCH = "server-patch";
const ACTION_PREFETCH = "prefetch";
const ACTION_FAST_REFRESH = "fast-refresh";
const ACTION_SERVER_ACTION = "server-action";
var PrefetchKind;
(function(PrefetchKind) {
    PrefetchKind["AUTO"] = "auto";
    PrefetchKind["FULL"] = "full";
    PrefetchKind["TEMPORARY"] = "temporary";
})(PrefetchKind || (PrefetchKind = {}));
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer-types.js.map


/***/ }),

/***/ 7189:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "reducer", ({
    enumerable: true,
    get: function() {
        return reducer;
    }
}));
const _routerreducertypes = __webpack_require__(2836);
const _navigatereducer = __webpack_require__(9962);
const _serverpatchreducer = __webpack_require__(5022);
const _restorereducer = __webpack_require__(9425);
const _refreshreducer = __webpack_require__(2111);
const _prefetchreducer = __webpack_require__(1910);
const _fastrefreshreducer = __webpack_require__(7300);
const _serveractionreducer = __webpack_require__(7238);
/**
 * Reducer that handles the app-router state updates.
 */ function clientReducer(state, action) {
    switch(action.type){
        case _routerreducertypes.ACTION_NAVIGATE:
            {
                return (0, _navigatereducer.navigateReducer)(state, action);
            }
        case _routerreducertypes.ACTION_SERVER_PATCH:
            {
                return (0, _serverpatchreducer.serverPatchReducer)(state, action);
            }
        case _routerreducertypes.ACTION_RESTORE:
            {
                return (0, _restorereducer.restoreReducer)(state, action);
            }
        case _routerreducertypes.ACTION_REFRESH:
            {
                return (0, _refreshreducer.refreshReducer)(state, action);
            }
        case _routerreducertypes.ACTION_FAST_REFRESH:
            {
                return (0, _fastrefreshreducer.fastRefreshReducer)(state, action);
            }
        case _routerreducertypes.ACTION_PREFETCH:
            {
                return (0, _prefetchreducer.prefetchReducer)(state, action);
            }
        case _routerreducertypes.ACTION_SERVER_ACTION:
            {
                return (0, _serveractionreducer.serverActionReducer)(state, action);
            }
        // This case should never be hit as dispatch is strongly typed.
        default:
            throw new Error("Unknown action");
    }
}
function serverReducer(state, _action) {
    return state;
}
const reducer =  true ? serverReducer : 0;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer.js.map


/***/ }),

/***/ 8072:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "shouldHardNavigate", ({
    enumerable: true,
    get: function() {
        return shouldHardNavigate;
    }
}));
const _matchsegments = __webpack_require__(7618);
function shouldHardNavigate(flightSegmentPath, flightRouterState) {
    const [segment, parallelRoutes] = flightRouterState;
    // TODO-APP: Check if `as` can be replaced.
    const [currentSegment, parallelRouteKey] = flightSegmentPath;
    // Check if current segment matches the existing segment.
    if (!(0, _matchsegments.matchSegment)(currentSegment, segment)) {
        // If dynamic parameter in tree doesn't match up with segment path a hard navigation is triggered.
        if (Array.isArray(currentSegment)) {
            return true;
        }
        // If the existing segment did not match soft navigation is triggered.
        return false;
    }
    const lastSegment = flightSegmentPath.length <= 2;
    if (lastSegment) {
        return false;
    }
    return shouldHardNavigate(flightSegmentPath.slice(2), parallelRoutes[parallelRouteKey]);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=should-hard-navigate.js.map


/***/ }),

/***/ 8437:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createSearchParamsBailoutProxy", ({
    enumerable: true,
    get: function() {
        return createSearchParamsBailoutProxy;
    }
}));
const _staticgenerationbailout = __webpack_require__(8862);
function createSearchParamsBailoutProxy() {
    return new Proxy({}, {
        get (_target, prop) {
            // React adds some properties on the object when serializing for client components
            if (typeof prop === "string") {
                (0, _staticgenerationbailout.staticGenerationBailout)("searchParams." + prop);
            }
        }
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=searchparams-bailout-proxy.js.map


/***/ }),

/***/ 8862:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "staticGenerationBailout", ({
    enumerable: true,
    get: function() {
        return staticGenerationBailout;
    }
}));
const _hooksservercontext = __webpack_require__(8047);
const _staticgenerationasyncstorage = __webpack_require__(3539);
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = "NEXT_STATIC_GEN_BAILOUT";
    }
}
function formatErrorMessage(reason, opts) {
    const { dynamic, link } = opts || {};
    const suffix = link ? " See more info here: " + link : "";
    return "Page" + (dynamic ? ' with `dynamic = "' + dynamic + '"`' : "") + " couldn't be rendered statically because it used `" + reason + "`." + suffix;
}
const staticGenerationBailout = (reason, opts)=>{
    const staticGenerationStore = _staticgenerationasyncstorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.dynamicShouldError) {
        var _opts_dynamic;
        throw new StaticGenBailoutError(formatErrorMessage(reason, {
            ...opts,
            dynamic: (_opts_dynamic = opts == null ? void 0 : opts.dynamic) != null ? _opts_dynamic : "error"
        }));
    }
    if (staticGenerationStore) {
        staticGenerationStore.revalidate = 0;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        const err = new _hooksservercontext.DynamicServerError(formatErrorMessage(reason, {
            ...opts,
            // this error should be caught by Next to bail out of static generation
            // in case it's uncaught, this link provides some additional context as to why
            link: "https://nextjs.org/docs/messages/dynamic-server-error"
        }));
        staticGenerationStore.dynamicUsageDescription = reason;
        staticGenerationStore.dynamicUsageStack = err.stack;
        throw err;
    }
    return false;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map


/***/ }),

/***/ 4282:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return StaticGenerationSearchParamsBailoutProvider;
    }
}));
const _interop_require_default = __webpack_require__(2147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8038));
const _searchparamsbailoutproxy = __webpack_require__(8437);
function StaticGenerationSearchParamsBailoutProvider(param) {
    let { Component, propsForComponent } = param;
    const searchParams = (0, _searchparamsbailoutproxy.createSearchParamsBailoutProxy)();
    return /*#__PURE__*/ _react.default.createElement(Component, {
        searchParams: searchParams,
        ...propsForComponent
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map


/***/ }),

/***/ 7951:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useReducerWithReduxDevtools", ({
    enumerable: true,
    get: function() {
        return useReducerWithReduxDevtools;
    }
}));
const _react = __webpack_require__(8038);
function normalizeRouterState(val) {
    if (val instanceof Map) {
        const obj = {};
        for (const [key, value] of val.entries()){
            if (typeof value === "function") {
                obj[key] = "fn()";
                continue;
            }
            if (typeof value === "object" && value !== null) {
                if (value.$$typeof) {
                    obj[key] = value.$$typeof.toString();
                    continue;
                }
                if (value._bundlerConfig) {
                    obj[key] = "FlightData";
                    continue;
                }
            }
            obj[key] = normalizeRouterState(value);
        }
        return obj;
    }
    if (typeof val === "object" && val !== null) {
        const obj = {};
        for(const key in val){
            const value = val[key];
            if (typeof value === "function") {
                obj[key] = "fn()";
                continue;
            }
            if (typeof value === "object" && value !== null) {
                if (value.$$typeof) {
                    obj[key] = value.$$typeof.toString();
                    continue;
                }
                if (value.hasOwnProperty("_bundlerConfig")) {
                    obj[key] = "FlightData";
                    continue;
                }
            }
            obj[key] = normalizeRouterState(value);
        }
        return obj;
    }
    if (Array.isArray(val)) {
        return val.map(normalizeRouterState);
    }
    return val;
}
function devToolReducer(fn, ref) {
    return (state, action)=>{
        const res = fn(state, action);
        if (ref.current) {
            ref.current.send(action, normalizeRouterState(res));
        }
        return res;
    };
}
function useReducerWithReduxDevtoolsNoop(fn, initialState) {
    const [state, dispatch] = (0, _react.useReducer)(fn, initialState);
    return [
        state,
        dispatch,
        ()=>{}
    ];
}
function useReducerWithReduxDevtoolsImpl(fn, initialState) {
    const devtoolsConnectionRef = (0, _react.useRef)();
    const enabledRef = (0, _react.useRef)();
    (0, _react.useEffect)(()=>{
        if (devtoolsConnectionRef.current || enabledRef.current === false) {
            return;
        }
        if (enabledRef.current === undefined && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined") {
            enabledRef.current = false;
            return;
        }
        devtoolsConnectionRef.current = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
            instanceId: 8000,
            name: "next-router"
        });
        if (devtoolsConnectionRef.current) {
            devtoolsConnectionRef.current.init(normalizeRouterState(initialState));
        }
        return ()=>{
            devtoolsConnectionRef.current = undefined;
        };
    }, [
        initialState
    ]);
    const [state, dispatch] = (0, _react.useReducer)(devToolReducer(/* logReducer( */ fn /*)*/ , devtoolsConnectionRef), initialState);
    const sync = (0, _react.useCallback)(()=>{
        if (devtoolsConnectionRef.current) {
            devtoolsConnectionRef.current.send({
                type: "RENDER_SYNC"
            }, normalizeRouterState(state));
        }
    }, [
        state
    ]);
    return [
        state,
        dispatch,
        sync
    ];
}
const useReducerWithReduxDevtools =  false ? 0 : useReducerWithReduxDevtoolsNoop;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-reducer-with-devtools.js.map


/***/ }),

/***/ 4374:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "hasBasePath", ({
    enumerable: true,
    get: function() {
        return hasBasePath;
    }
}));
const _pathhasprefix = __webpack_require__(4614);
const basePath =  false || "";
function hasBasePath(path) {
    return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=has-base-path.js.map


/***/ }),

/***/ 1094:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "normalizePathTrailingSlash", ({
    enumerable: true,
    get: function() {
        return normalizePathTrailingSlash;
    }
}));
const _removetrailingslash = __webpack_require__(3750);
const _parsepath = __webpack_require__(8231);
const normalizePathTrailingSlash = (path)=>{
    if (!path.startsWith("/") || undefined) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    if (false) {}
    return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 2666:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removeBasePath", ({
    enumerable: true,
    get: function() {
        return removeBasePath;
    }
}));
const _hasbasepath = __webpack_require__(4374);
const basePath =  false || "";
function removeBasePath(path) {
    if (false) {}
    // Can't trim the basePath if it has zero length!
    if (basePath.length === 0) return path;
    path = path.slice(basePath.length);
    if (!path.startsWith("/")) path = "/" + path;
    return path;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=remove-base-path.js.map


/***/ }),

/***/ 9708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    suspense: function() {
        return suspense;
    },
    NoSSR: function() {
        return NoSSR;
    }
});
const _interop_require_default = __webpack_require__(2147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8038));
const _nossrerror = __webpack_require__(827);
function suspense() {
    const error = new Error(_nossrerror.NEXT_DYNAMIC_NO_SSR_CODE);
    error.digest = _nossrerror.NEXT_DYNAMIC_NO_SSR_CODE;
    throw error;
}
function NoSSR(param) {
    let { children } = param;
    if (true) {
        suspense();
    }
    return children;
} //# sourceMappingURL=dynamic-no-ssr.js.map


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// This has to be a shared module which is shared between client component error boundary and dynamic component

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "NEXT_DYNAMIC_NO_SSR_CODE", ({
    enumerable: true,
    get: function() {
        return NEXT_DYNAMIC_NO_SSR_CODE;
    }
}));
const NEXT_DYNAMIC_NO_SSR_CODE = "NEXT_DYNAMIC_NO_SSR_CODE"; //# sourceMappingURL=no-ssr-error.js.map


/***/ }),

/***/ 4663:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(1363);
module.exports = createProxy("/home/abiola/Documents/www/project/lms-app/node_modules/next/dist/client/components/app-router.js");
 //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 1823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(1363);
module.exports = createProxy("/home/abiola/Documents/www/project/lms-app/node_modules/next/dist/client/components/error-boundary.js");
 //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 7149:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(1363);
module.exports = createProxy("/home/abiola/Documents/www/project/lms-app/node_modules/next/dist/client/components/layout-router.js");
 //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 6966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(1363);
module.exports = createProxy("/home/abiola/Documents/www/project/lms-app/node_modules/next/dist/client/components/not-found-boundary.js");
 //# sourceMappingURL=not-found-boundary.js.map


/***/ }),

/***/ 5493:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return NotFound;
    }
}));
const _interop_require_default = __webpack_require__(3297);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(2947));
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        display: "inline-block"
    },
    h1: {
        display: "inline-block",
        margin: "0 20px 0 0",
        padding: "0 23px 0 0",
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: "top",
        lineHeight: "49px"
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "49px",
        margin: 0
    }
};
function NotFound() {
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("title", null, "404: This page could not be found."), /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.error
    }, /*#__PURE__*/ _react.default.createElement("div", null, /*#__PURE__*/ _react.default.createElement("style", {
        dangerouslySetInnerHTML: {
            /* Minified CSS from
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                @media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }
              */ __html: "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"
        }
    }), /*#__PURE__*/ _react.default.createElement("h1", {
        className: "next-error-h1",
        style: styles.h1
    }, "404"), /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.desc
    }, /*#__PURE__*/ _react.default.createElement("h2", {
        style: styles.h2
    }, "This page could not be found.")))));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found-error.js.map


/***/ }),

/***/ 9278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(1363);
module.exports = createProxy("/home/abiola/Documents/www/project/lms-app/node_modules/next/dist/client/components/render-from-template-context.js");
 //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 9444:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createSearchParamsBailoutProxy", ({
    enumerable: true,
    get: function() {
        return createSearchParamsBailoutProxy;
    }
}));
const _staticgenerationbailout = __webpack_require__(6164);
function createSearchParamsBailoutProxy() {
    return new Proxy({}, {
        get (_target, prop) {
            // React adds some properties on the object when serializing for client components
            if (typeof prop === "string") {
                (0, _staticgenerationbailout.staticGenerationBailout)("searchParams." + prop);
            }
        }
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=searchparams-bailout-proxy.js.map


/***/ }),

/***/ 6345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(1363);
module.exports = createProxy("/home/abiola/Documents/www/project/lms-app/node_modules/next/dist/client/components/static-generation-searchparams-bailout-provider.js");
 //# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map


/***/ }),

/***/ 7251:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
/**
 * Tokenize input string.
 */ function lexer(str) {
    var tokens = [];
    var i = 0;
    while(i < str.length){
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({
                type: "MODIFIER",
                index: i,
                value: str[i++]
            });
            continue;
        }
        if (char === "\\") {
            tokens.push({
                type: "ESCAPED_CHAR",
                index: i++,
                value: str[i++]
            });
            continue;
        }
        if (char === "{") {
            tokens.push({
                type: "OPEN",
                index: i,
                value: str[i++]
            });
            continue;
        }
        if (char === "}") {
            tokens.push({
                type: "CLOSE",
                index: i,
                value: str[i++]
            });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while(j < str.length){
                var code = str.charCodeAt(j);
                if (// `0-9`
                code >= 48 && code <= 57 || // `A-Z`
                code >= 65 && code <= 90 || // `a-z`
                code >= 97 && code <= 122 || // `_`
                code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name) throw new TypeError("Missing parameter name at " + i);
            tokens.push({
                type: "NAME",
                index: i,
                value: name
            });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError('Pattern cannot start with "?" at ' + j);
            }
            while(j < str.length){
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                } else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count) throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern) throw new TypeError("Missing pattern at " + i);
            tokens.push({
                type: "PATTERN",
                index: i,
                value: pattern
            });
            i = j;
            continue;
        }
        tokens.push({
            type: "CHAR",
            index: i,
            value: str[i++]
        });
    }
    tokens.push({
        type: "END",
        index: i,
        value: ""
    });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */ function parse(str, options) {
    if (options === void 0) {
        options = {};
    }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function(type) {
        if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
    };
    var mustConsume = function(type) {
        var value = tryConsume(type);
        if (value !== undefined) return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function() {
        var result = "";
        var value;
        // tslint:disable-next-line
        while(value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")){
            result += value;
        }
        return result;
    };
    while(i < tokens.length){
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
exports.parse = parse;
/**
 * Compile a string to a template function for the path.
 */ function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
exports.compile = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */ function tokensToFunction(tokens, options) {
    if (options === void 0) {
        options = {};
    }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function(x) {
        return x;
    } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function(token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function(data) {
        var path = "";
        for(var i = 0; i < tokens.length; i++){
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
                }
                if (value.length === 0) {
                    if (optional) continue;
                    throw new TypeError('Expected "' + token.name + '" to not be empty');
                }
                for(var j = 0; j < value.length; j++){
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional) continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
        }
        return path;
    };
}
exports.tokensToFunction = tokensToFunction;
/**
 * Create path match function from `path-to-regexp` spec.
 */ function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
exports.match = match;
/**
 * Create a path match function from `path-to-regexp` output.
 */ function regexpToFunction(re, keys, options) {
    if (options === void 0) {
        options = {};
    }
    var _a = options.decode, decode = _a === void 0 ? function(x) {
        return x;
    } : _a;
    return function(pathname) {
        var m = re.exec(pathname);
        if (!m) return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function(i) {
            // tslint:disable-next-line
            if (m[i] === undefined) return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function(value) {
                    return decode(value, key);
                });
            } else {
                params[key.name] = decode(m[i], key);
            }
        };
        for(var i = 1; i < m.length; i++){
            _loop_1(i);
        }
        return {
            path: path,
            index: index,
            params: params
        };
    };
}
exports.regexpToFunction = regexpToFunction;
/**
 * Escape a regular expression string.
 */ function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */ function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */ function regexpToRegexp(path, keys) {
    if (!keys) return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for(var i = 0; i < groups.length; i++){
            keys.push({
                name: i,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
        }
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */ function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function(path) {
        return pathToRegexp(path, keys, options).source;
    });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */ function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */ function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) {
        options = {};
    }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
        return x;
    } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for(var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++){
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        } else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys) keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    } else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                } else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            } else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict) route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
exports.tokensToRegexp = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */ function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp) return regexpToRegexp(path, keys);
    if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
exports.pathToRegexp = pathToRegexp; //# sourceMappingURL=index.js.map


/***/ }),

/***/ 85:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fillMetadataSegment: function() {
        return fillMetadataSegment;
    },
    normalizeMetadataRoute: function() {
        return normalizeMetadataRoute;
    }
});
const _ismetadataroute = __webpack_require__(4982);
const _path = /*#__PURE__*/ _interop_require_default(__webpack_require__(2490));
const _serverutils = __webpack_require__(9179);
const _routeregex = __webpack_require__(8630);
const _hash = __webpack_require__(376);
const _apppaths = __webpack_require__(7879);
const _normalizepathsep = __webpack_require__(2883);
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/*
 * If there's special convention like (...) or @ in the page path,
 * Give it a unique hash suffix to avoid conflicts
 *
 * e.g.
 * /app/open-graph.tsx -> /open-graph/route
 * /app/(post)/open-graph.tsx -> /open-graph/route-[0-9a-z]{6}
 */ function getMetadataRouteSuffix(page) {
    let suffix = "";
    if (page.includes("(") && page.includes(")") || page.includes("@")) {
        suffix = (0, _hash.djb2Hash)(page).toString(36).slice(0, 6);
    }
    return suffix;
}
function fillMetadataSegment(segment, params, imageSegment) {
    const pathname = (0, _apppaths.normalizeAppPath)(segment);
    const routeRegex = (0, _routeregex.getNamedRouteRegex)(pathname, false);
    const route = (0, _serverutils.interpolateDynamicPath)(pathname, params, routeRegex);
    const suffix = getMetadataRouteSuffix(segment);
    const routeSuffix = suffix ? `-${suffix}` : "";
    const { name, ext } = _path.default.parse(imageSegment);
    return (0, _normalizepathsep.normalizePathSep)(_path.default.join(route, `${name}${routeSuffix}${ext}`));
}
function normalizeMetadataRoute(page) {
    if (!(0, _ismetadataroute.isMetadataRoute)(page)) {
        return page;
    }
    let route = page;
    let suffix = "";
    if (route === "/robots") {
        route += ".txt";
    } else if (route === "/manifest") {
        route += ".webmanifest";
    } else if (route.endsWith("/sitemap")) {
        route += ".xml";
    } else {
        // Remove the file extension, e.g. /route-path/robots.txt -> /route-path
        const pathnamePrefix = page.slice(0, -(_path.default.basename(page).length + 1));
        suffix = getMetadataRouteSuffix(pathnamePrefix);
    }
    // Support both /<metadata-route.ext> and custom routes /<metadata-route>/route.ts.
    // If it's a metadata file route, we need to append /[id]/route to the page.
    if (!route.endsWith("/route")) {
        const isStaticMetadataFile = (0, _ismetadataroute.isStaticMetadataRouteFile)(page);
        const { dir, name: baseName, ext } = _path.default.parse(route);
        const isStaticRoute = page.startsWith("/robots") || page.startsWith("/manifest") || isStaticMetadataFile;
        route = _path.default.posix.join(dir, `${baseName}${suffix ? `-${suffix}` : ""}${ext}`, isStaticRoute ? "" : "[[...__metadata_id__]]", "route");
    }
    return route;
} //# sourceMappingURL=get-metadata-route.js.map


/***/ }),

/***/ 4982:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    STATIC_METADATA_IMAGES: function() {
        return STATIC_METADATA_IMAGES;
    },
    isMetadataRouteFile: function() {
        return isMetadataRouteFile;
    },
    isStaticMetadataRouteFile: function() {
        return isStaticMetadataRouteFile;
    },
    isMetadataRoute: function() {
        return isMetadataRoute;
    }
});
const _normalizepathsep = __webpack_require__(2883);
const STATIC_METADATA_IMAGES = {
    icon: {
        filename: "icon",
        extensions: [
            "ico",
            "jpg",
            "jpeg",
            "png",
            "svg"
        ]
    },
    apple: {
        filename: "apple-icon",
        extensions: [
            "jpg",
            "jpeg",
            "png"
        ]
    },
    favicon: {
        filename: "favicon",
        extensions: [
            "ico"
        ]
    },
    openGraph: {
        filename: "opengraph-image",
        extensions: [
            "jpg",
            "jpeg",
            "png",
            "gif"
        ]
    },
    twitter: {
        filename: "twitter-image",
        extensions: [
            "jpg",
            "jpeg",
            "png",
            "gif"
        ]
    }
};
// Match routes that are metadata routes, e.g. /sitemap.xml, /favicon.<ext>, /<icon>.<ext>, etc.
// TODO-METADATA: support more metadata routes with more extensions
const defaultExtensions = [
    "js",
    "jsx",
    "ts",
    "tsx"
];
const getExtensionRegexString = (extensions)=>`(?:${extensions.join("|")})`;
function isMetadataRouteFile(appDirRelativePath, pageExtensions, withExtension) {
    const metadataRouteFilesRegex = [
        new RegExp(`^[\\\\/]robots${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat("txt"))}$` : ""}`),
        new RegExp(`^[\\\\/]manifest${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat("webmanifest", "json"))}$` : ""}`),
        new RegExp(`^[\\\\/]favicon\\.ico$`),
        new RegExp(`[\\\\/]sitemap${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat("xml"))}$` : ""}`),
        new RegExp(`[\\\\/]${STATIC_METADATA_IMAGES.icon.filename}\\d?${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat(STATIC_METADATA_IMAGES.icon.extensions))}$` : ""}`),
        new RegExp(`[\\\\/]${STATIC_METADATA_IMAGES.apple.filename}\\d?${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat(STATIC_METADATA_IMAGES.apple.extensions))}$` : ""}`),
        new RegExp(`[\\\\/]${STATIC_METADATA_IMAGES.openGraph.filename}\\d?${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat(STATIC_METADATA_IMAGES.openGraph.extensions))}$` : ""}`),
        new RegExp(`[\\\\/]${STATIC_METADATA_IMAGES.twitter.filename}\\d?${withExtension ? `\\.${getExtensionRegexString(pageExtensions.concat(STATIC_METADATA_IMAGES.twitter.extensions))}$` : ""}`)
    ];
    const normalizedAppDirRelativePath = (0, _normalizepathsep.normalizePathSep)(appDirRelativePath);
    return metadataRouteFilesRegex.some((r)=>r.test(normalizedAppDirRelativePath));
}
function isStaticMetadataRouteFile(appDirRelativePath) {
    return isMetadataRouteFile(appDirRelativePath, [], true);
}
function isMetadataRoute(route) {
    let page = route.replace(/^\/?app\//, "").replace(/\/route$/, "");
    if (page[0] !== "/") page = "/" + page;
    return !page.endsWith("/page") && isMetadataRouteFile(page, defaultExtensions, false);
} //# sourceMappingURL=is-metadata-route.js.map


/***/ }),

/***/ 2226:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "acceptLanguage", ({
    enumerable: true,
    get: function() {
        return acceptLanguage;
    }
}));
function parse(raw, preferences, options) {
    const lowers = new Map();
    const header = raw.replace(/[ \t]/g, "");
    if (preferences) {
        let pos = 0;
        for (const preference of preferences){
            const lower = preference.toLowerCase();
            lowers.set(lower, {
                orig: preference,
                pos: pos++
            });
            if (options.prefixMatch) {
                const parts = lower.split("-");
                while(parts.pop(), parts.length > 0){
                    const joined = parts.join("-");
                    if (!lowers.has(joined)) {
                        lowers.set(joined, {
                            orig: preference,
                            pos: pos++
                        });
                    }
                }
            }
        }
    }
    const parts = header.split(",");
    const selections = [];
    const map = new Set();
    for(let i = 0; i < parts.length; ++i){
        const part = parts[i];
        if (!part) {
            continue;
        }
        const params = part.split(";");
        if (params.length > 2) {
            throw new Error(`Invalid ${options.type} header`);
        }
        let token = params[0].toLowerCase();
        if (!token) {
            throw new Error(`Invalid ${options.type} header`);
        }
        const selection = {
            token,
            pos: i,
            q: 1
        };
        if (preferences && lowers.has(token)) {
            selection.pref = lowers.get(token).pos;
        }
        map.add(selection.token);
        if (params.length === 2) {
            const q = params[1];
            const [key, value] = q.split("=");
            if (!value || key !== "q" && key !== "Q") {
                throw new Error(`Invalid ${options.type} header`);
            }
            const score = parseFloat(value);
            if (score === 0) {
                continue;
            }
            if (Number.isFinite(score) && score <= 1 && score >= 0.001) {
                selection.q = score;
            }
        }
        selections.push(selection);
    }
    selections.sort((a, b)=>{
        if (b.q !== a.q) {
            return b.q - a.q;
        }
        if (b.pref !== a.pref) {
            if (a.pref === undefined) {
                return 1;
            }
            if (b.pref === undefined) {
                return -1;
            }
            return a.pref - b.pref;
        }
        return a.pos - b.pos;
    });
    const values = selections.map((selection)=>selection.token);
    if (!preferences || !preferences.length) {
        return values;
    }
    const preferred = [];
    for (const selection of values){
        if (selection === "*") {
            for (const [preference, value] of lowers){
                if (!map.has(preference)) {
                    preferred.push(value.orig);
                }
            }
        } else {
            const lower = selection.toLowerCase();
            if (lowers.has(lower)) {
                preferred.push(lowers.get(lower).orig);
            }
        }
    }
    return preferred;
}
function acceptLanguage(header = "", preferences) {
    return parse(header, preferences, {
        type: "accept-language",
        prefixMatch: true
    })[0] || "";
} //# sourceMappingURL=accept-header.js.map


/***/ }),

/***/ 2502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRouter: function() {
        return AppRouter;
    },
    LayoutRouter: function() {
        return LayoutRouter;
    },
    RenderFromTemplateContext: function() {
        return RenderFromTemplateContext;
    },
    staticGenerationAsyncStorage: function() {
        return staticGenerationAsyncStorage;
    },
    requestAsyncStorage: function() {
        return requestAsyncStorage;
    },
    actionAsyncStorage: function() {
        return actionAsyncStorage;
    },
    staticGenerationBailout: function() {
        return staticGenerationBailout;
    },
    createSearchParamsBailoutProxy: function() {
        return createSearchParamsBailoutProxy;
    },
    serverHooks: function() {
        return serverHooks;
    },
    renderToReadableStream: function() {
        return renderToReadableStream;
    },
    decodeReply: function() {
        return decodeReply;
    },
    decodeAction: function() {
        return decodeAction;
    },
    preloadStyle: function() {
        return preloadStyle;
    },
    preloadFont: function() {
        return preloadFont;
    },
    preconnect: function() {
        return preconnect;
    },
    StaticGenerationSearchParamsBailoutProvider: function() {
        return StaticGenerationSearchParamsBailoutProvider;
    },
    NotFoundBoundary: function() {
        return NotFoundBoundary;
    }
});
const { default: AppRouter } = __webpack_require__(4663);
const { default: LayoutRouter } = __webpack_require__(7149);
const { default: RenderFromTemplateContext } = __webpack_require__(9278);
const { staticGenerationAsyncStorage } = __webpack_require__(3539);
const { requestAsyncStorage } = __webpack_require__(1715);
const { actionAsyncStorage } = __webpack_require__(4876);
const { staticGenerationBailout } = __webpack_require__(6164);
const { default: StaticGenerationSearchParamsBailoutProvider } = __webpack_require__(6345);
const { createSearchParamsBailoutProxy } = __webpack_require__(9444);
const serverHooks = __webpack_require__(1651);
const { renderToReadableStream, decodeReply, decodeAction } = __webpack_require__(9642);
const { preloadStyle, preloadFont, preconnect } = __webpack_require__(6167);
const { NotFoundBoundary } = __webpack_require__(6966); //# sourceMappingURL=entry-base.js.map


/***/ }),

/***/ 6167:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*

Files in the rsc directory are meant to be packaged as part of the RSC graph using next-app-loader.

*/ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    preloadStyle: function() {
        return preloadStyle;
    },
    preloadFont: function() {
        return preloadFont;
    },
    preconnect: function() {
        return preconnect;
    }
});
const _reactdom = /*#__PURE__*/ _interop_require_default(__webpack_require__(2060));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function preloadStyle(href) {
    _reactdom.default.preload(href, {
        as: "style"
    });
}
function preloadFont(href, type) {
    _reactdom.default.preload(href, {
        as: "font",
        type
    });
}
function preconnect(href, crossOrigin) {
    if (typeof crossOrigin === "string") {
        _reactdom.default.preconnect(href, {
            crossOrigin
        });
    } else {
        _reactdom.default.preconnect(href);
    }
} //# sourceMappingURL=preloads.js.map


/***/ }),

/***/ 1499:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
    },
    isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
    },
    extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
    }
});
const _apppaths = __webpack_require__(7879);
const INTERCEPTION_ROUTE_MARKERS = [
    "(..)(..)",
    "(.)",
    "(..)",
    "(...)"
];
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split("/").find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute, marker, interceptedRoute;
    for (const segment of path.split("/")){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
    }
    interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
    ;
    switch(marker){
        case "(.)":
            // (.) indicates that we should match with sibling routes, so we just need to append the intercepted route to the intercepting route
            if (interceptingRoute === "/") {
                interceptedRoute = `/${interceptedRoute}`;
            } else {
                interceptedRoute = interceptingRoute + "/" + interceptedRoute;
            }
            break;
        case "(..)":
            // (..) indicates that we should match at one level up, so we need to remove the last segment of the intercepting route
            if (interceptingRoute === "/") {
                throw new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`);
            }
            interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
            break;
        case "(...)":
            // (...) will match the route segment in the root directory, so we need to use the root directory to prepend the intercepted route
            interceptedRoute = "/" + interceptedRoute;
            break;
        case "(..)(..)":
            // (..)(..) indicates that we should match at two levels up, so we need to remove the last two segments of the intercepting route
            const splitInterceptingRoute = interceptingRoute.split("/");
            if (splitInterceptingRoute.length <= 2) {
                throw new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`);
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
            break;
        default:
            throw new Error("Invariant: unexpected marker");
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=interception-routes.js.map


/***/ }),

/***/ 7262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppPageRouteModule: function() {
        return AppPageRouteModule;
    },
    default: function() {
        return _default;
    }
});
const _apprender = __webpack_require__(5868);
const _routemodule = __webpack_require__(5281);
class AppPageRouteModule extends _routemodule.RouteModule {
    render(req, res, context) {
        return (0, _apprender.renderToHTMLOrFlight)(req, res, context.page, context.query, context.renderOpts);
    }
}
const _default = AppPageRouteModule; //# sourceMappingURL=module.js.map


/***/ }),

/***/ 2468:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/* eslint-disable no-redeclare */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_REQUEST_META: function() {
        return NEXT_REQUEST_META;
    },
    getRequestMeta: function() {
        return getRequestMeta;
    },
    setRequestMeta: function() {
        return setRequestMeta;
    },
    addRequestMeta: function() {
        return addRequestMeta;
    },
    removeRequestMeta: function() {
        return removeRequestMeta;
    },
    getNextInternalQuery: function() {
        return getNextInternalQuery;
    }
});
const NEXT_REQUEST_META = Symbol.for("NextInternalRequestMeta");
function getRequestMeta(req, key) {
    const meta = req[NEXT_REQUEST_META] || {};
    return typeof key === "string" ? meta[key] : meta;
}
function setRequestMeta(req, meta) {
    req[NEXT_REQUEST_META] = meta;
    return meta;
}
function addRequestMeta(request, key, value) {
    const meta = getRequestMeta(request);
    meta[key] = value;
    return setRequestMeta(request, meta);
}
function removeRequestMeta(request, key) {
    const meta = getRequestMeta(request);
    delete meta[key];
    return setRequestMeta(request, meta);
}
function getNextInternalQuery(query) {
    const keysToInclude = [
        "__nextDefaultLocale",
        "__nextFallback",
        "__nextLocale",
        "__nextSsgPath",
        "_nextBubbleNoFallback",
        "__nextDataReq",
        "__nextInferredLocaleFromDefault"
    ];
    const nextInternalQuery = {};
    for (const key of keysToInclude){
        if (key in query) {
            // @ts-ignore this can't be typed correctly
            nextInternalQuery[key] = query[key];
        }
    }
    return nextInternalQuery;
} //# sourceMappingURL=request-meta.js.map


/***/ }),

/***/ 9179:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    normalizeVercelUrl: function() {
        return normalizeVercelUrl;
    },
    interpolateDynamicPath: function() {
        return interpolateDynamicPath;
    },
    getUtils: function() {
        return getUtils;
    }
});
const _url = __webpack_require__(7310);
const _normalizelocalepath = __webpack_require__(7415);
const _pathmatch = __webpack_require__(3906);
const _routeregex = __webpack_require__(8630);
const _routematcher = __webpack_require__(9082);
const _preparedestination = __webpack_require__(6492);
const _acceptheader = __webpack_require__(2226);
const _detectlocalecookie = __webpack_require__(3720);
const _detectdomainlocale = __webpack_require__(2080);
const _denormalizepagepath = __webpack_require__(8882);
const _cookie = /*#__PURE__*/ _interop_require_default(__webpack_require__(2184));
const _constants = __webpack_require__(462);
const _requestmeta = __webpack_require__(2468);
const _removetrailingslash = __webpack_require__(468);
const _apppaths = __webpack_require__(7879);
const _constants1 = __webpack_require__(2078);
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function normalizeVercelUrl(req, trustQuery, paramKeys, pageIsDynamic, defaultRouteRegex) {
    // make sure to normalize req.url on Vercel to strip dynamic params
    // from the query which are added during routing
    if (pageIsDynamic && trustQuery && defaultRouteRegex) {
        const _parsedUrl = (0, _url.parse)(req.url, true);
        delete _parsedUrl.search;
        for (const key of Object.keys(_parsedUrl.query)){
            if (key !== _constants1.NEXT_QUERY_PARAM_PREFIX && key.startsWith(_constants1.NEXT_QUERY_PARAM_PREFIX) || (paramKeys || Object.keys(defaultRouteRegex.groups)).includes(key)) {
                delete _parsedUrl.query[key];
            }
        }
        req.url = (0, _url.format)(_parsedUrl);
    }
}
function interpolateDynamicPath(pathname, params, defaultRouteRegex) {
    if (!defaultRouteRegex) return pathname;
    for (const param of Object.keys(defaultRouteRegex.groups)){
        const { optional, repeat } = defaultRouteRegex.groups[param];
        let builtParam = `[${repeat ? "..." : ""}${param}]`;
        if (optional) {
            builtParam = `[${builtParam}]`;
        }
        const paramIdx = pathname.indexOf(builtParam);
        if (paramIdx > -1) {
            let paramValue;
            const value = params[param];
            if (Array.isArray(value)) {
                paramValue = value.map((v)=>v && encodeURIComponent(v)).join("/");
            } else if (value) {
                paramValue = encodeURIComponent(value);
            } else {
                paramValue = "";
            }
            pathname = pathname.slice(0, paramIdx) + paramValue + pathname.slice(paramIdx + builtParam.length);
        }
    }
    return pathname;
}
function getUtils({ page, i18n, basePath, rewrites, pageIsDynamic, trailingSlash, caseSensitive }) {
    let defaultRouteRegex;
    let dynamicRouteMatcher;
    let defaultRouteMatches;
    if (pageIsDynamic) {
        defaultRouteRegex = (0, _routeregex.getNamedRouteRegex)(page, false);
        dynamicRouteMatcher = (0, _routematcher.getRouteMatcher)(defaultRouteRegex);
        defaultRouteMatches = dynamicRouteMatcher(page);
    }
    function handleRewrites(req, parsedUrl) {
        const rewriteParams = {};
        let fsPathname = parsedUrl.pathname;
        const matchesPage = ()=>{
            const fsPathnameNoSlash = (0, _removetrailingslash.removeTrailingSlash)(fsPathname || "");
            return fsPathnameNoSlash === (0, _removetrailingslash.removeTrailingSlash)(page) || (dynamicRouteMatcher == null ? void 0 : dynamicRouteMatcher(fsPathnameNoSlash));
        };
        const checkRewrite = (rewrite)=>{
            const matcher = (0, _pathmatch.getPathMatch)(rewrite.source + (trailingSlash ? "(/)?" : ""), {
                removeUnnamedParams: true,
                strict: true,
                sensitive: !!caseSensitive
            });
            let params = matcher(parsedUrl.pathname);
            if ((rewrite.has || rewrite.missing) && params) {
                const hasParams = (0, _preparedestination.matchHas)(req, parsedUrl.query, rewrite.has, rewrite.missing);
                if (hasParams) {
                    Object.assign(params, hasParams);
                } else {
                    params = false;
                }
            }
            if (params) {
                const { parsedDestination, destQuery } = (0, _preparedestination.prepareDestination)({
                    appendParamsToQuery: true,
                    destination: rewrite.destination,
                    params: params,
                    query: parsedUrl.query
                });
                // if the rewrite destination is external break rewrite chain
                if (parsedDestination.protocol) {
                    return true;
                }
                Object.assign(rewriteParams, destQuery, params);
                Object.assign(parsedUrl.query, parsedDestination.query);
                delete parsedDestination.query;
                Object.assign(parsedUrl, parsedDestination);
                fsPathname = parsedUrl.pathname;
                if (basePath) {
                    fsPathname = fsPathname.replace(new RegExp(`^${basePath}`), "") || "/";
                }
                if (i18n) {
                    const destLocalePathResult = (0, _normalizelocalepath.normalizeLocalePath)(fsPathname, i18n.locales);
                    fsPathname = destLocalePathResult.pathname;
                    parsedUrl.query.nextInternalLocale = destLocalePathResult.detectedLocale || params.nextInternalLocale;
                }
                if (fsPathname === page) {
                    return true;
                }
                if (pageIsDynamic && dynamicRouteMatcher) {
                    const dynamicParams = dynamicRouteMatcher(fsPathname);
                    if (dynamicParams) {
                        parsedUrl.query = {
                            ...parsedUrl.query,
                            ...dynamicParams
                        };
                        return true;
                    }
                }
            }
            return false;
        };
        for (const rewrite of rewrites.beforeFiles || []){
            checkRewrite(rewrite);
        }
        if (fsPathname !== page) {
            let finished = false;
            for (const rewrite of rewrites.afterFiles || []){
                finished = checkRewrite(rewrite);
                if (finished) break;
            }
            if (!finished && !matchesPage()) {
                for (const rewrite of rewrites.fallback || []){
                    finished = checkRewrite(rewrite);
                    if (finished) break;
                }
            }
        }
        return rewriteParams;
    }
    function handleBasePath(req, parsedUrl) {
        // always strip the basePath if configured since it is required
        req.url = req.url.replace(new RegExp(`^${basePath}`), "") || "/";
        parsedUrl.pathname = parsedUrl.pathname.replace(new RegExp(`^${basePath}`), "") || "/";
    }
    function getParamsFromRouteMatches(req, renderOpts, detectedLocale) {
        return (0, _routematcher.getRouteMatcher)(function() {
            const { groups, routeKeys } = defaultRouteRegex;
            return {
                re: {
                    // Simulate a RegExp match from the \`req.url\` input
                    exec: (str)=>{
                        const obj = Object.fromEntries(new URLSearchParams(str));
                        const matchesHasLocale = i18n && detectedLocale && obj["1"] === detectedLocale;
                        for (const key of Object.keys(obj)){
                            const value = obj[key];
                            if (key !== _constants1.NEXT_QUERY_PARAM_PREFIX && key.startsWith(_constants1.NEXT_QUERY_PARAM_PREFIX)) {
                                const normalizedKey = key.substring(_constants1.NEXT_QUERY_PARAM_PREFIX.length);
                                obj[normalizedKey] = value;
                                delete obj[key];
                            }
                        }
                        // favor named matches if available
                        const routeKeyNames = Object.keys(routeKeys || {});
                        const filterLocaleItem = (val)=>{
                            if (i18n) {
                                // locale items can be included in route-matches
                                // for fallback SSG pages so ensure they are
                                // filtered
                                const isCatchAll = Array.isArray(val);
                                const _val = isCatchAll ? val[0] : val;
                                if (typeof _val === "string" && i18n.locales.some((item)=>{
                                    if (item.toLowerCase() === _val.toLowerCase()) {
                                        detectedLocale = item;
                                        renderOpts.locale = detectedLocale;
                                        return true;
                                    }
                                    return false;
                                })) {
                                    // remove the locale item from the match
                                    if (isCatchAll) {
                                        val.splice(0, 1);
                                    }
                                    // the value is only a locale item and
                                    // shouldn't be added
                                    return isCatchAll ? val.length === 0 : true;
                                }
                            }
                            return false;
                        };
                        if (routeKeyNames.every((name)=>obj[name])) {
                            return routeKeyNames.reduce((prev, keyName)=>{
                                const paramName = routeKeys == null ? void 0 : routeKeys[keyName];
                                if (paramName && !filterLocaleItem(obj[keyName])) {
                                    prev[groups[paramName].pos] = obj[keyName];
                                }
                                return prev;
                            }, {});
                        }
                        return Object.keys(obj).reduce((prev, key)=>{
                            if (!filterLocaleItem(obj[key])) {
                                let normalizedKey = key;
                                if (matchesHasLocale) {
                                    normalizedKey = parseInt(key, 10) - 1 + "";
                                }
                                return Object.assign(prev, {
                                    [normalizedKey]: obj[key]
                                });
                            }
                            return prev;
                        }, {});
                    }
                },
                groups
            };
        }())(req.headers["x-now-route-matches"]);
    }
    function normalizeDynamicRouteParams(params, ignoreOptional) {
        let hasValidParams = true;
        if (!defaultRouteRegex) return {
            params,
            hasValidParams: false
        };
        params = Object.keys(defaultRouteRegex.groups).reduce((prev, key)=>{
            let value = params[key];
            if (typeof value === "string") {
                value = (0, _apppaths.normalizeRscPath)(value, true);
            }
            if (Array.isArray(value)) {
                value = value.map((val)=>{
                    if (typeof val === "string") {
                        val = (0, _apppaths.normalizeRscPath)(val, true);
                    }
                    return val;
                });
            }
            // if the value matches the default value we can't rely
            // on the parsed params, this is used to signal if we need
            // to parse x-now-route-matches or not
            const defaultValue = defaultRouteMatches[key];
            const isOptional = defaultRouteRegex.groups[key].optional;
            const isDefaultValue = Array.isArray(defaultValue) ? defaultValue.some((defaultVal)=>{
                return Array.isArray(value) ? value.some((val)=>val.includes(defaultVal)) : value == null ? void 0 : value.includes(defaultVal);
            }) : value == null ? void 0 : value.includes(defaultValue);
            if (isDefaultValue || typeof value === "undefined" && !(isOptional && ignoreOptional)) {
                hasValidParams = false;
            }
            // non-provided optional values should be undefined so normalize
            // them to undefined
            if (isOptional && (!value || Array.isArray(value) && value.length === 1 && // fallback optional catch-all SSG pages have
            // [[...paramName]] for the root path on Vercel
            (value[0] === "index" || value[0] === `[[...${key}]]`))) {
                value = undefined;
                delete params[key];
            }
            // query values from the proxy aren't already split into arrays
            // so make sure to normalize catch-all values
            if (value && typeof value === "string" && defaultRouteRegex.groups[key].repeat) {
                value = value.split("/");
            }
            if (value) {
                prev[key] = value;
            }
            return prev;
        }, {});
        return {
            params,
            hasValidParams
        };
    }
    function handleLocale(req, res, parsedUrl, routeNoAssetPath, shouldNotRedirect) {
        if (!i18n) return;
        const pathname = parsedUrl.pathname || "/";
        let defaultLocale = i18n.defaultLocale;
        let detectedLocale = (0, _detectlocalecookie.detectLocaleCookie)(req, i18n.locales);
        let acceptPreferredLocale;
        try {
            acceptPreferredLocale = i18n.localeDetection !== false ? (0, _acceptheader.acceptLanguage)(req.headers["accept-language"], i18n.locales) : detectedLocale;
        } catch (_) {
            acceptPreferredLocale = detectedLocale;
        }
        const { host } = req.headers || {};
        // remove port from host and remove port if present
        const hostname = host && host.split(":")[0].toLowerCase();
        const detectedDomain = (0, _detectdomainlocale.detectDomainLocale)(i18n.domains, hostname);
        if (detectedDomain) {
            defaultLocale = detectedDomain.defaultLocale;
            detectedLocale = defaultLocale;
            (0, _requestmeta.addRequestMeta)(req, "__nextIsLocaleDomain", true);
        }
        // if not domain specific locale use accept-language preferred
        detectedLocale = detectedLocale || acceptPreferredLocale;
        let localeDomainRedirect;
        const localePathResult = (0, _normalizelocalepath.normalizeLocalePath)(pathname, i18n.locales);
        routeNoAssetPath = (0, _normalizelocalepath.normalizeLocalePath)(routeNoAssetPath, i18n.locales).pathname;
        if (localePathResult.detectedLocale) {
            detectedLocale = localePathResult.detectedLocale;
            req.url = (0, _url.format)({
                ...parsedUrl,
                pathname: localePathResult.pathname
            });
            (0, _requestmeta.addRequestMeta)(req, "__nextStrippedLocale", true);
            parsedUrl.pathname = localePathResult.pathname;
        }
        // If a detected locale is a domain specific locale and we aren't already
        // on that domain and path prefix redirect to it to prevent duplicate
        // content from multiple domains
        if (detectedDomain) {
            const localeToCheck = localePathResult.detectedLocale ? detectedLocale : acceptPreferredLocale;
            const matchedDomain = (0, _detectdomainlocale.detectDomainLocale)(i18n.domains, undefined, localeToCheck);
            if (matchedDomain && matchedDomain.domain !== detectedDomain.domain) {
                localeDomainRedirect = `http${matchedDomain.http ? "" : "s"}://${matchedDomain.domain}/${localeToCheck === matchedDomain.defaultLocale ? "" : localeToCheck}`;
            }
        }
        const denormalizedPagePath = (0, _denormalizepagepath.denormalizePagePath)(pathname);
        const detectedDefaultLocale = !detectedLocale || detectedLocale.toLowerCase() === defaultLocale.toLowerCase();
        const shouldStripDefaultLocale = false;
        // detectedDefaultLocale &&
        // denormalizedPagePath.toLowerCase() === \`/\${i18n.defaultLocale.toLowerCase()}\`
        const shouldAddLocalePrefix = !detectedDefaultLocale && denormalizedPagePath === "/";
        detectedLocale = detectedLocale || i18n.defaultLocale;
        if (!shouldNotRedirect && !req.headers["x-vercel-id"] && i18n.localeDetection !== false && (localeDomainRedirect || shouldAddLocalePrefix || shouldStripDefaultLocale)) {
            // set the NEXT_LOCALE cookie when a user visits the default locale
            // with the locale prefix so that they aren't redirected back to
            // their accept-language preferred locale
            if (shouldStripDefaultLocale && acceptPreferredLocale !== defaultLocale) {
                const previous = res.getHeader("set-cookie");
                res.setHeader("set-cookie", [
                    ...typeof previous === "string" ? [
                        previous
                    ] : Array.isArray(previous) ? previous : [],
                    _cookie.default.serialize("NEXT_LOCALE", defaultLocale, {
                        httpOnly: true,
                        path: "/"
                    })
                ]);
            }
            res.setHeader("Location", (0, _url.format)({
                // make sure to include any query values when redirecting
                ...parsedUrl,
                pathname: localeDomainRedirect ? localeDomainRedirect : shouldStripDefaultLocale ? basePath || "/" : `${basePath}/${detectedLocale}`
            }));
            res.statusCode = _constants.TEMPORARY_REDIRECT_STATUS;
            res.end();
            return;
        }
        detectedLocale = localePathResult.detectedLocale || detectedDomain && detectedDomain.defaultLocale || defaultLocale;
        return {
            defaultLocale,
            detectedLocale,
            routeNoAssetPath
        };
    }
    return {
        handleLocale,
        handleRewrites,
        handleBasePath,
        defaultRouteRegex,
        dynamicRouteMatcher,
        defaultRouteMatches,
        getParamsFromRouteMatches,
        normalizeDynamicRouteParams,
        normalizeVercelUrl: (req, trustQuery, paramKeys)=>normalizeVercelUrl(req, trustQuery, paramKeys, pageIsDynamic, defaultRouteRegex),
        interpolateDynamicPath: (pathname, params)=>interpolateDynamicPath(pathname, params, defaultRouteRegex)
    };
} //# sourceMappingURL=server-utils.js.map


/***/ }),

/***/ 462:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MODERN_BROWSERSLIST_TARGET: function() {
        return _modernbrowserslisttarget.default;
    },
    COMPILER_NAMES: function() {
        return COMPILER_NAMES;
    },
    COMPILER_INDEXES: function() {
        return COMPILER_INDEXES;
    },
    PHASE_EXPORT: function() {
        return PHASE_EXPORT;
    },
    PHASE_PRODUCTION_BUILD: function() {
        return PHASE_PRODUCTION_BUILD;
    },
    PHASE_PRODUCTION_SERVER: function() {
        return PHASE_PRODUCTION_SERVER;
    },
    PHASE_DEVELOPMENT_SERVER: function() {
        return PHASE_DEVELOPMENT_SERVER;
    },
    PHASE_TEST: function() {
        return PHASE_TEST;
    },
    PHASE_INFO: function() {
        return PHASE_INFO;
    },
    PAGES_MANIFEST: function() {
        return PAGES_MANIFEST;
    },
    APP_PATHS_MANIFEST: function() {
        return APP_PATHS_MANIFEST;
    },
    APP_PATH_ROUTES_MANIFEST: function() {
        return APP_PATH_ROUTES_MANIFEST;
    },
    BUILD_MANIFEST: function() {
        return BUILD_MANIFEST;
    },
    APP_BUILD_MANIFEST: function() {
        return APP_BUILD_MANIFEST;
    },
    FUNCTIONS_CONFIG_MANIFEST: function() {
        return FUNCTIONS_CONFIG_MANIFEST;
    },
    SUBRESOURCE_INTEGRITY_MANIFEST: function() {
        return SUBRESOURCE_INTEGRITY_MANIFEST;
    },
    NEXT_FONT_MANIFEST: function() {
        return NEXT_FONT_MANIFEST;
    },
    EXPORT_MARKER: function() {
        return EXPORT_MARKER;
    },
    EXPORT_DETAIL: function() {
        return EXPORT_DETAIL;
    },
    PRERENDER_MANIFEST: function() {
        return PRERENDER_MANIFEST;
    },
    ROUTES_MANIFEST: function() {
        return ROUTES_MANIFEST;
    },
    IMAGES_MANIFEST: function() {
        return IMAGES_MANIFEST;
    },
    SERVER_FILES_MANIFEST: function() {
        return SERVER_FILES_MANIFEST;
    },
    DEV_CLIENT_PAGES_MANIFEST: function() {
        return DEV_CLIENT_PAGES_MANIFEST;
    },
    MIDDLEWARE_MANIFEST: function() {
        return MIDDLEWARE_MANIFEST;
    },
    DEV_MIDDLEWARE_MANIFEST: function() {
        return DEV_MIDDLEWARE_MANIFEST;
    },
    REACT_LOADABLE_MANIFEST: function() {
        return REACT_LOADABLE_MANIFEST;
    },
    FONT_MANIFEST: function() {
        return FONT_MANIFEST;
    },
    SERVER_DIRECTORY: function() {
        return SERVER_DIRECTORY;
    },
    CONFIG_FILES: function() {
        return CONFIG_FILES;
    },
    BUILD_ID_FILE: function() {
        return BUILD_ID_FILE;
    },
    BLOCKED_PAGES: function() {
        return BLOCKED_PAGES;
    },
    CLIENT_PUBLIC_FILES_PATH: function() {
        return CLIENT_PUBLIC_FILES_PATH;
    },
    CLIENT_STATIC_FILES_PATH: function() {
        return CLIENT_STATIC_FILES_PATH;
    },
    STRING_LITERAL_DROP_BUNDLE: function() {
        return STRING_LITERAL_DROP_BUNDLE;
    },
    NEXT_BUILTIN_DOCUMENT: function() {
        return NEXT_BUILTIN_DOCUMENT;
    },
    CLIENT_REFERENCE_MANIFEST: function() {
        return CLIENT_REFERENCE_MANIFEST;
    },
    SERVER_REFERENCE_MANIFEST: function() {
        return SERVER_REFERENCE_MANIFEST;
    },
    MIDDLEWARE_BUILD_MANIFEST: function() {
        return MIDDLEWARE_BUILD_MANIFEST;
    },
    MIDDLEWARE_REACT_LOADABLE_MANIFEST: function() {
        return MIDDLEWARE_REACT_LOADABLE_MANIFEST;
    },
    CLIENT_STATIC_FILES_RUNTIME_MAIN: function() {
        return CLIENT_STATIC_FILES_RUNTIME_MAIN;
    },
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP: function() {
        return CLIENT_STATIC_FILES_RUNTIME_MAIN_APP;
    },
    APP_CLIENT_INTERNALS: function() {
        return APP_CLIENT_INTERNALS;
    },
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH: function() {
        return CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH;
    },
    CLIENT_STATIC_FILES_RUNTIME_AMP: function() {
        return CLIENT_STATIC_FILES_RUNTIME_AMP;
    },
    CLIENT_STATIC_FILES_RUNTIME_WEBPACK: function() {
        return CLIENT_STATIC_FILES_RUNTIME_WEBPACK;
    },
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS: function() {
        return CLIENT_STATIC_FILES_RUNTIME_POLYFILLS;
    },
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL: function() {
        return CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL;
    },
    EDGE_RUNTIME_WEBPACK: function() {
        return EDGE_RUNTIME_WEBPACK;
    },
    TEMPORARY_REDIRECT_STATUS: function() {
        return TEMPORARY_REDIRECT_STATUS;
    },
    PERMANENT_REDIRECT_STATUS: function() {
        return PERMANENT_REDIRECT_STATUS;
    },
    STATIC_PROPS_ID: function() {
        return STATIC_PROPS_ID;
    },
    SERVER_PROPS_ID: function() {
        return SERVER_PROPS_ID;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    GOOGLE_FONT_PROVIDER: function() {
        return GOOGLE_FONT_PROVIDER;
    },
    OPTIMIZED_FONT_PROVIDERS: function() {
        return OPTIMIZED_FONT_PROVIDERS;
    },
    DEFAULT_SERIF_FONT: function() {
        return DEFAULT_SERIF_FONT;
    },
    DEFAULT_SANS_SERIF_FONT: function() {
        return DEFAULT_SANS_SERIF_FONT;
    },
    STATIC_STATUS_PAGES: function() {
        return STATIC_STATUS_PAGES;
    },
    TRACE_OUTPUT_VERSION: function() {
        return TRACE_OUTPUT_VERSION;
    },
    TURBO_TRACE_DEFAULT_MEMORY_LIMIT: function() {
        return TURBO_TRACE_DEFAULT_MEMORY_LIMIT;
    },
    RSC_MODULE_TYPES: function() {
        return RSC_MODULE_TYPES;
    },
    EDGE_UNSUPPORTED_NODE_APIS: function() {
        return EDGE_UNSUPPORTED_NODE_APIS;
    },
    SYSTEM_ENTRYPOINTS: function() {
        return SYSTEM_ENTRYPOINTS;
    }
});
const _interop_require_default = __webpack_require__(3297);
const _modernbrowserslisttarget = /*#__PURE__*/ _interop_require_default._(__webpack_require__(7634));
const COMPILER_NAMES = {
    client: "client",
    server: "server",
    edgeServer: "edge-server"
};
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
const PHASE_EXPORT = "phase-export";
const PHASE_PRODUCTION_BUILD = "phase-production-build";
const PHASE_PRODUCTION_SERVER = "phase-production-server";
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";
const PHASE_TEST = "phase-test";
const PHASE_INFO = "phase-info";
const PAGES_MANIFEST = "pages-manifest.json";
const APP_PATHS_MANIFEST = "app-paths-manifest.json";
const APP_PATH_ROUTES_MANIFEST = "app-path-routes-manifest.json";
const BUILD_MANIFEST = "build-manifest.json";
const APP_BUILD_MANIFEST = "app-build-manifest.json";
const FUNCTIONS_CONFIG_MANIFEST = "functions-config-manifest.json";
const SUBRESOURCE_INTEGRITY_MANIFEST = "subresource-integrity-manifest";
const NEXT_FONT_MANIFEST = "next-font-manifest";
const EXPORT_MARKER = "export-marker.json";
const EXPORT_DETAIL = "export-detail.json";
const PRERENDER_MANIFEST = "prerender-manifest.json";
const ROUTES_MANIFEST = "routes-manifest.json";
const IMAGES_MANIFEST = "images-manifest.json";
const SERVER_FILES_MANIFEST = "required-server-files.json";
const DEV_CLIENT_PAGES_MANIFEST = "_devPagesManifest.json";
const MIDDLEWARE_MANIFEST = "middleware-manifest.json";
const DEV_MIDDLEWARE_MANIFEST = "_devMiddlewareManifest.json";
const REACT_LOADABLE_MANIFEST = "react-loadable-manifest.json";
const FONT_MANIFEST = "font-manifest.json";
const SERVER_DIRECTORY = "server";
const CONFIG_FILES = [
    "next.config.js",
    "next.config.mjs"
];
const BUILD_ID_FILE = "BUILD_ID";
const BLOCKED_PAGES = [
    "/_document",
    "/_app",
    "/_error"
];
const CLIENT_PUBLIC_FILES_PATH = "public";
const CLIENT_STATIC_FILES_PATH = "static";
const STRING_LITERAL_DROP_BUNDLE = "__NEXT_DROP_CLIENT_FILE__";
const NEXT_BUILTIN_DOCUMENT = "__NEXT_BUILTIN_DOCUMENT__";
const CLIENT_REFERENCE_MANIFEST = "client-reference-manifest";
const SERVER_REFERENCE_MANIFEST = "server-reference-manifest";
const MIDDLEWARE_BUILD_MANIFEST = "middleware-build-manifest";
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = "middleware-react-loadable-manifest";
const CLIENT_STATIC_FILES_RUNTIME_MAIN = "main";
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = "" + CLIENT_STATIC_FILES_RUNTIME_MAIN + "-app";
const APP_CLIENT_INTERNALS = "app-pages-internals";
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = "react-refresh";
const CLIENT_STATIC_FILES_RUNTIME_AMP = "amp";
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = "webpack";
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = "polyfills";
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
const EDGE_RUNTIME_WEBPACK = "edge-runtime-webpack";
const TEMPORARY_REDIRECT_STATUS = 307;
const PERMANENT_REDIRECT_STATUS = 308;
const STATIC_PROPS_ID = "__N_SSG";
const SERVER_PROPS_ID = "__N_SSP";
const PAGE_SEGMENT_KEY = "__PAGE__";
const GOOGLE_FONT_PROVIDER = "https://fonts.googleapis.com/";
const OPTIMIZED_FONT_PROVIDERS = [
    {
        url: GOOGLE_FONT_PROVIDER,
        preconnect: "https://fonts.gstatic.com"
    },
    {
        url: "https://use.typekit.net",
        preconnect: "https://use.typekit.net"
    }
];
const DEFAULT_SERIF_FONT = {
    name: "Times New Roman",
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
const DEFAULT_SANS_SERIF_FONT = {
    name: "Arial",
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
const STATIC_STATUS_PAGES = [
    "/500"
];
const TRACE_OUTPUT_VERSION = 1;
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
const RSC_MODULE_TYPES = {
    client: "client",
    server: "server"
};
const EDGE_UNSUPPORTED_NODE_APIS = [
    "clearImmediate",
    "setImmediate",
    "BroadcastChannel",
    "ByteLengthQueuingStrategy",
    "CompressionStream",
    "CountQueuingStrategy",
    "DecompressionStream",
    "DomException",
    "MessageChannel",
    "MessageEvent",
    "MessagePort",
    "ReadableByteStreamController",
    "ReadableStreamBYOBRequest",
    "ReadableStreamDefaultController",
    "TransformStreamDefaultController",
    "WritableStreamDefaultController"
];
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_AMP,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]);
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=constants.js.map


/***/ }),

/***/ 5284:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// regexp is based on https://github.com/sindresorhus/escape-string-regexp

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "escapeStringRegexp", ({
    enumerable: true,
    get: function() {
        return escapeStringRegexp;
    }
}));
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
function escapeStringRegexp(str) {
    // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
    if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, "\\$&");
    }
    return str;
} //# sourceMappingURL=escape-regexp.js.map


/***/ }),

/***/ 376:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// http://www.cse.yorku.ca/~oz/hash.html

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    djb2Hash: function() {
        return djb2Hash;
    },
    hexHash: function() {
        return hexHash;
    }
});
function djb2Hash(str) {
    let hash = 5381;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) + hash + char;
    }
    return Math.abs(hash);
}
function hexHash(str) {
    return djb2Hash(str).toString(36).slice(0, 5);
} //# sourceMappingURL=hash.js.map


/***/ }),

/***/ 3720:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "detectLocaleCookie", ({
    enumerable: true,
    get: function() {
        return detectLocaleCookie;
    }
}));
function detectLocaleCookie(req, locales) {
    const { NEXT_LOCALE } = req.cookies || {};
    return NEXT_LOCALE ? locales.find((locale)=>NEXT_LOCALE.toLowerCase() === locale.toLowerCase()) : undefined;
} //# sourceMappingURL=detect-locale-cookie.js.map


/***/ }),

/***/ 2490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * This module is for next.js server internal usage of path module.
 * It will use native path module for nodejs runtime.
 * It will use path-browserify polyfill for edge runtime.
 */ 
let path;
if (false) {} else {
    path = __webpack_require__(1017);
}
module.exports = path; //# sourceMappingURL=path.js.map


/***/ }),

/***/ 7634:
/***/ ((module) => {

"use strict";
// Note: This file is JS because it's used by the taskfile-swc.js file, which is JS.
// Keep file changes in sync with the corresponding `.d.ts` files.
/**
 * These are the browser versions that support all of the following:
 * static import: https://caniuse.com/es6-module
 * dynamic import: https://caniuse.com/es6-module-dynamic-import
 * import.meta: https://caniuse.com/mdn-javascript_operators_import_meta
 */ 
const MODERN_BROWSERSLIST_TARGET = [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
];
module.exports = MODERN_BROWSERSLIST_TARGET; //# sourceMappingURL=modern-browserslist-target.js.map


/***/ }),

/***/ 8882:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "denormalizePagePath", ({
    enumerable: true,
    get: function() {
        return denormalizePagePath;
    }
}));
const _utils = __webpack_require__(2100);
const _normalizepathsep = __webpack_require__(2883);
function denormalizePagePath(page) {
    let _page = (0, _normalizepathsep.normalizePathSep)(page);
    return _page.startsWith("/index/") && !(0, _utils.isDynamicRoute)(_page) ? _page.slice(6) : _page !== "/index" ? _page : "/";
} //# sourceMappingURL=denormalize-page-path.js.map


/***/ }),

/***/ 1348:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ensureLeadingSlash", ({
    enumerable: true,
    get: function() {
        return ensureLeadingSlash;
    }
}));
function ensureLeadingSlash(path) {
    return path.startsWith("/") ? path : "/" + path;
} //# sourceMappingURL=ensure-leading-slash.js.map


/***/ }),

/***/ 2883:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * For a given page path, this function ensures that there is no backslash
 * escaping slashes in the path. Example:
 *  - `foo\/bar\/baz` -> `foo/bar/baz`
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "normalizePathSep", ({
    enumerable: true,
    get: function() {
        return normalizePathSep;
    }
}));
function normalizePathSep(path) {
    return path.replace(/\\/g, "/");
} //# sourceMappingURL=normalize-path-sep.js.map


/***/ }),

/***/ 7879:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    normalizeAppPath: function() {
        return normalizeAppPath;
    },
    normalizeRscPath: function() {
        return normalizeRscPath;
    }
});
const _ensureleadingslash = __webpack_require__(1348);
function normalizeAppPath(route) {
    return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (segment[0] === "(" && segment.endsWith(")")) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === "@") {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ""));
}
function normalizeRscPath(pathname, enabled) {
    return enabled ? pathname.replace(/\.rsc($|\?)/, "$1") : pathname;
} //# sourceMappingURL=app-paths.js.map


/***/ }),

/***/ 2100:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
    }
});
const _sortedroutes = __webpack_require__(6091);
const _isdynamic = __webpack_require__(1136); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 1136:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// Identify /[param]/ in route string

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isDynamicRoute", ({
    enumerable: true,
    get: function() {
        return isDynamicRoute;
    }
}));
const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
function isDynamicRoute(route) {
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map


/***/ }),

/***/ 5777:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "parseRelativeUrl", ({
    enumerable: true,
    get: function() {
        return parseRelativeUrl;
    }
}));
const _utils = __webpack_require__(130);
const _querystring = __webpack_require__(2027);
function parseRelativeUrl(url, base) {
    const globalBase = new URL( true ? "http://n" : 0);
    const resolvedBase = base ? new URL(base, globalBase) : url.startsWith(".") ? new URL( true ? "http://n" : 0) : globalBase;
    const { pathname, searchParams, search, hash, href, origin } = new URL(url, resolvedBase);
    if (origin !== globalBase.origin) {
        throw new Error("invariant: invalid relative URL, router received " + url);
    }
    return {
        pathname,
        query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
        search,
        hash,
        href: href.slice(globalBase.origin.length)
    };
} //# sourceMappingURL=parse-relative-url.js.map


/***/ }),

/***/ 1461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "parseUrl", ({
    enumerable: true,
    get: function() {
        return parseUrl;
    }
}));
const _querystring = __webpack_require__(2027);
const _parserelativeurl = __webpack_require__(5777);
function parseUrl(url) {
    if (url.startsWith("/")) {
        return (0, _parserelativeurl.parseRelativeUrl)(url);
    }
    const parsedURL = new URL(url);
    return {
        hash: parsedURL.hash,
        hostname: parsedURL.hostname,
        href: parsedURL.href,
        pathname: parsedURL.pathname,
        port: parsedURL.port,
        protocol: parsedURL.protocol,
        query: (0, _querystring.searchParamsToUrlQuery)(parsedURL.searchParams),
        search: parsedURL.search
    };
} //# sourceMappingURL=parse-url.js.map


/***/ }),

/***/ 3906:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getPathMatch", ({
    enumerable: true,
    get: function() {
        return getPathMatch;
    }
}));
const _pathtoregexp = __webpack_require__(7251);
function getPathMatch(path, options) {
    const keys = [];
    const regexp = (0, _pathtoregexp.pathToRegexp)(path, keys, {
        delimiter: "/",
        sensitive: typeof (options == null ? void 0 : options.sensitive) === "boolean" ? options.sensitive : false,
        strict: options == null ? void 0 : options.strict
    });
    const matcher = (0, _pathtoregexp.regexpToFunction)((options == null ? void 0 : options.regexModifier) ? new RegExp(options.regexModifier(regexp.source), regexp.flags) : regexp, keys);
    /**
   * A matcher function that will check if a given pathname matches the path
   * given in the builder function. When the path does not match it will return
   * `false` but if it does it will return an object with the matched params
   * merged with the params provided in the second argument.
   */ return (pathname, params)=>{
        const res = pathname == null ? false : matcher(pathname);
        if (!res) {
            return false;
        }
        /**
     * If unnamed params are not allowed they must be removed from
     * the matched parameters. path-to-regexp uses "string" for named and
     * "number" for unnamed parameters.
     */ if (options == null ? void 0 : options.removeUnnamedParams) {
            for (const key of keys){
                if (typeof key.name === "number") {
                    delete res.params[key.name];
                }
            }
        }
        return {
            ...params,
            ...res.params
        };
    };
} //# sourceMappingURL=path-match.js.map


/***/ }),

/***/ 6492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    matchHas: function() {
        return matchHas;
    },
    compileNonPath: function() {
        return compileNonPath;
    },
    prepareDestination: function() {
        return prepareDestination;
    }
});
const _pathtoregexp = __webpack_require__(7251);
const _escaperegexp = __webpack_require__(5284);
const _parseurl = __webpack_require__(1461);
const _interceptionroutes = __webpack_require__(1499);
const _approuterheaders = __webpack_require__(3909);
/**
 * Ensure only a-zA-Z are used for param names for proper interpolating
 * with path-to-regexp
 */ function getSafeParamName(paramName) {
    let newParamName = "";
    for(let i = 0; i < paramName.length; i++){
        const charCode = paramName.charCodeAt(i);
        if (charCode > 64 && charCode < 91 || // A-Z
        charCode > 96 && charCode < 123 // a-z
        ) {
            newParamName += paramName[i];
        }
    }
    return newParamName;
}
function escapeSegment(str, segmentName) {
    return str.replace(new RegExp(":" + (0, _escaperegexp.escapeStringRegexp)(segmentName), "g"), "__ESC_COLON_" + segmentName);
}
function unescapeSegments(str) {
    return str.replace(/__ESC_COLON_/gi, ":");
}
function matchHas(req, query, has, missing) {
    if (has === void 0) has = [];
    if (missing === void 0) missing = [];
    const params = {};
    const hasMatch = (hasItem)=>{
        let value;
        let key = hasItem.key;
        switch(hasItem.type){
            case "header":
                {
                    key = key.toLowerCase();
                    value = req.headers[key];
                    break;
                }
            case "cookie":
                {
                    value = req.cookies[hasItem.key];
                    break;
                }
            case "query":
                {
                    value = query[key];
                    break;
                }
            case "host":
                {
                    const { host } = (req == null ? void 0 : req.headers) || {};
                    // remove port from host if present
                    const hostname = host == null ? void 0 : host.split(":")[0].toLowerCase();
                    value = hostname;
                    break;
                }
            default:
                {
                    break;
                }
        }
        if (!hasItem.value && value) {
            params[getSafeParamName(key)] = value;
            return true;
        } else if (value) {
            const matcher = new RegExp("^" + hasItem.value + "$");
            const matches = Array.isArray(value) ? value.slice(-1)[0].match(matcher) : value.match(matcher);
            if (matches) {
                if (Array.isArray(matches)) {
                    if (matches.groups) {
                        Object.keys(matches.groups).forEach((groupKey)=>{
                            params[groupKey] = matches.groups[groupKey];
                        });
                    } else if (hasItem.type === "host" && matches[0]) {
                        params.host = matches[0];
                    }
                }
                return true;
            }
        }
        return false;
    };
    const allMatch = has.every((item)=>hasMatch(item)) && !missing.some((item)=>hasMatch(item));
    if (allMatch) {
        return params;
    }
    return false;
}
function compileNonPath(value, params) {
    if (!value.includes(":")) {
        return value;
    }
    for (const key of Object.keys(params)){
        if (value.includes(":" + key)) {
            value = value.replace(new RegExp(":" + key + "\\*", "g"), ":" + key + "--ESCAPED_PARAM_ASTERISKS").replace(new RegExp(":" + key + "\\?", "g"), ":" + key + "--ESCAPED_PARAM_QUESTION").replace(new RegExp(":" + key + "\\+", "g"), ":" + key + "--ESCAPED_PARAM_PLUS").replace(new RegExp(":" + key + "(?!\\w)", "g"), "--ESCAPED_PARAM_COLON" + key);
        }
    }
    value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISKS/g, "*");
    // the value needs to start with a forward-slash to be compiled
    // correctly
    return (0, _pathtoregexp.compile)("/" + value, {
        validate: false
    })(params).slice(1);
}
function prepareDestination(args) {
    const query = Object.assign({}, args.query);
    delete query.__nextLocale;
    delete query.__nextDefaultLocale;
    delete query.__nextDataReq;
    delete query.__nextInferredLocaleFromDefault;
    delete query[_approuterheaders.NEXT_RSC_UNION_QUERY];
    let escapedDestination = args.destination;
    for (const param of Object.keys({
        ...args.params,
        ...query
    })){
        escapedDestination = escapeSegment(escapedDestination, param);
    }
    const parsedDestination = (0, _parseurl.parseUrl)(escapedDestination);
    const destQuery = parsedDestination.query;
    const destPath = unescapeSegments("" + parsedDestination.pathname + (parsedDestination.hash || ""));
    const destHostname = unescapeSegments(parsedDestination.hostname || "");
    const destPathParamKeys = [];
    const destHostnameParamKeys = [];
    (0, _pathtoregexp.pathToRegexp)(destPath, destPathParamKeys);
    (0, _pathtoregexp.pathToRegexp)(destHostname, destHostnameParamKeys);
    const destParams = [];
    destPathParamKeys.forEach((key)=>destParams.push(key.name));
    destHostnameParamKeys.forEach((key)=>destParams.push(key.name));
    const destPathCompiler = (0, _pathtoregexp.compile)(destPath, // have already validated before we got to this point and validating
    // breaks compiling destinations with named pattern params from the source
    // e.g. /something:hello(.*) -> /another/:hello is broken with validation
    // since compile validation is meant for reversing and not for inserting
    // params from a separate path-regex into another
    {
        validate: false
    });
    const destHostnameCompiler = (0, _pathtoregexp.compile)(destHostname, {
        validate: false
    });
    // update any params in query values
    for (const [key, strOrArray] of Object.entries(destQuery)){
        // the value needs to start with a forward-slash to be compiled
        // correctly
        if (Array.isArray(strOrArray)) {
            destQuery[key] = strOrArray.map((value)=>compileNonPath(unescapeSegments(value), args.params));
        } else if (typeof strOrArray === "string") {
            destQuery[key] = compileNonPath(unescapeSegments(strOrArray), args.params);
        }
    }
    // add path params to query if it's not a redirect and not
    // already defined in destination query or path
    let paramKeys = Object.keys(args.params).filter((name)=>name !== "nextInternalLocale");
    if (args.appendParamsToQuery && !paramKeys.some((key)=>destParams.includes(key))) {
        for (const key of paramKeys){
            if (!(key in destQuery)) {
                destQuery[key] = args.params[key];
            }
        }
    }
    let newUrl;
    // The compiler also that the interception route marker is an unnamed param, hence '0',
    // so we need to add it to the params object.
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(destPath)) {
        for (const segment of destPath.split("/")){
            const marker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
            if (marker) {
                args.params["0"] = marker;
                break;
            }
        }
    }
    try {
        newUrl = destPathCompiler(args.params);
        const [pathname, hash] = newUrl.split("#");
        parsedDestination.hostname = destHostnameCompiler(args.params);
        parsedDestination.pathname = pathname;
        parsedDestination.hash = "" + (hash ? "#" : "") + (hash || "");
        delete parsedDestination.search;
    } catch (err) {
        if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
            throw new Error("To use a multi-match in the destination you must add `*` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match");
        }
        throw err;
    }
    // Query merge order lowest priority to highest
    // 1. initial URL query values
    // 2. path segment values
    // 3. destination specified query values
    parsedDestination.query = {
        ...query,
        ...parsedDestination.query
    };
    return {
        newUrl,
        destQuery,
        parsedDestination
    };
} //# sourceMappingURL=prepare-destination.js.map


/***/ }),

/***/ 2027:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    },
    assign: function() {
        return assign;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    searchParams.forEach((value, key)=>{
        if (typeof query[key] === "undefined") {
            query[key] = value;
        } else if (Array.isArray(query[key])) {
            query[key].push(value);
        } else {
            query[key] = [
                query[key],
                value
            ];
        }
    });
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === "string" || typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
        return String(param);
    } else {
        return "";
    }
}
function urlQueryToSearchParams(urlQuery) {
    const result = new URLSearchParams();
    Object.entries(urlQuery).forEach((param)=>{
        let [key, value] = param;
        if (Array.isArray(value)) {
            value.forEach((item)=>result.append(key, stringifyUrlQueryParam(item)));
        } else {
            result.set(key, stringifyUrlQueryParam(value));
        }
    });
    return result;
}
function assign(target) {
    for(var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        searchParamsList[_key - 1] = arguments[_key];
    }
    searchParamsList.forEach((searchParams)=>{
        Array.from(searchParams.keys()).forEach((key)=>target.delete(key));
        searchParams.forEach((value, key)=>target.append(key, value));
    });
    return target;
} //# sourceMappingURL=querystring.js.map


/***/ }),

/***/ 9082:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getRouteMatcher", ({
    enumerable: true,
    get: function() {
        return getRouteMatcher;
    }
}));
const _utils = __webpack_require__(130);
function getRouteMatcher(param) {
    let { re, groups } = param;
    return (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) {
            return false;
        }
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch (_) {
                throw new _utils.DecodeError("failed to decode param");
            }
        };
        const params = {};
        Object.keys(groups).forEach((slugName)=>{
            const g = groups[slugName];
            const m = routeMatch[g.pos];
            if (m !== undefined) {
                params[slugName] = ~m.indexOf("/") ? m.split("/").map((entry)=>decode(entry)) : g.repeat ? [
                    decode(m)
                ] : decode(m);
            }
        });
        return params;
    };
} //# sourceMappingURL=route-matcher.js.map


/***/ }),

/***/ 8630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRouteRegex: function() {
        return getRouteRegex;
    },
    getNamedRouteRegex: function() {
        return getNamedRouteRegex;
    },
    getNamedMiddlewareRegex: function() {
        return getNamedMiddlewareRegex;
    }
});
const _interceptionroutes = __webpack_require__(1499);
const _escaperegexp = __webpack_require__(5284);
const _removetrailingslash = __webpack_require__(468);
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
/**
 * Parses a given parameter from a route to a data structure that can be used
 * to generate the parametrized route. Examples:
 *   - `[...slug]` -> `{ key: 'slug', repeat: true, optional: true }`
 *   - `...slug` -> `{ key: 'slug', repeat: true, optional: false }`
 *   - `[foo]` -> `{ key: 'foo', repeat: false, optional: true }`
 *   - `bar` -> `{ key: 'bar', repeat: false, optional: false }`
 */ function parseParameter(param) {
    const optional = param.startsWith("[") && param.endsWith("]");
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith("...");
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
}
function getParametrizedRoute(route) {
    const segments = (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/");
    const groups = {};
    let groupIndex = 1;
    return {
        parameterizedRoute: segments.map((segment)=>{
            const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
            const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/) // Check for parameters
            ;
            if (markerMatch && paramMatches) {
                const { key, optional, repeat } = parseParameter(paramMatches[1]);
                groups[key] = {
                    pos: groupIndex++,
                    repeat,
                    optional
                };
                return "/" + (0, _escaperegexp.escapeStringRegexp)(markerMatch) + "([^/]+?)";
            } else if (paramMatches) {
                const { key, repeat, optional } = parseParameter(paramMatches[1]);
                groups[key] = {
                    pos: groupIndex++,
                    repeat,
                    optional
                };
                return repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
            } else {
                return "/" + (0, _escaperegexp.escapeStringRegexp)(segment);
            }
        }).join(""),
        groups
    };
}
function getRouteRegex(normalizedRoute) {
    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute);
    return {
        re: new RegExp("^" + parameterizedRoute + "(?:/)?$"),
        groups: groups
    };
}
/**
 * Builds a function to generate a minimal routeKey using only a-z and minimal
 * number of characters.
 */ function buildGetSafeRouteKey() {
    let i = 0;
    return ()=>{
        let routeKey = "";
        let j = ++i;
        while(j > 0){
            routeKey += String.fromCharCode(97 + (j - 1) % 26);
            j = Math.floor((j - 1) / 26);
        }
        return routeKey;
    };
}
function getSafeKeyFromSegment(param) {
    let { getSafeRouteKey, segment, routeKeys, keyPrefix } = param;
    const { key, optional, repeat } = parseParameter(segment);
    // replace any non-word characters since they can break
    // the named regex
    let cleanedKey = key.replace(/\W/g, "");
    if (keyPrefix) {
        cleanedKey = "" + keyPrefix + cleanedKey;
    }
    let invalidKey = false;
    // check if the key is still invalid and fallback to using a known
    // safe key
    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
    }
    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
    }
    if (invalidKey) {
        cleanedKey = getSafeRouteKey();
    }
    if (keyPrefix) {
        routeKeys[cleanedKey] = "" + keyPrefix + key;
    } else {
        routeKeys[cleanedKey] = "" + key;
    }
    return repeat ? optional ? "(?:/(?<" + cleanedKey + ">.+?))?" : "/(?<" + cleanedKey + ">.+?)" : "/(?<" + cleanedKey + ">[^/]+?)";
}
function getNamedParametrizedRoute(route, prefixRouteKeys) {
    const segments = (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/");
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    return {
        namedParameterizedRoute: segments.map((segment)=>{
            const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m));
            const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/) // Check for parameters
            ;
            if (hasInterceptionMarker && paramMatches) {
                return getSafeKeyFromSegment({
                    getSafeRouteKey,
                    segment: paramMatches[1],
                    routeKeys,
                    keyPrefix: prefixRouteKeys ? NEXT_INTERCEPTION_MARKER_PREFIX : undefined
                });
            } else if (paramMatches) {
                return getSafeKeyFromSegment({
                    getSafeRouteKey,
                    segment: paramMatches[1],
                    routeKeys,
                    keyPrefix: prefixRouteKeys ? NEXT_QUERY_PARAM_PREFIX : undefined
                });
            } else {
                return "/" + (0, _escaperegexp.escapeStringRegexp)(segment);
            }
        }).join(""),
        routeKeys
    };
}
function getNamedRouteRegex(normalizedRoute, prefixRouteKey) {
    const result = getNamedParametrizedRoute(normalizedRoute, prefixRouteKey);
    return {
        ...getRouteRegex(normalizedRoute),
        namedRegex: "^" + result.namedParameterizedRoute + "(?:/)?$",
        routeKeys: result.routeKeys
    };
}
function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute);
    const { catchAll = true } = options;
    if (parameterizedRoute === "/") {
        let catchAllRegex = catchAll ? ".*" : "";
        return {
            namedRegex: "^/" + catchAllRegex + "$"
        };
    }
    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false);
    let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
    return {
        namedRegex: "^" + namedParameterizedRoute + catchAllGroupedRegex + "$"
    };
} //# sourceMappingURL=route-regex.js.map


/***/ }),

/***/ 6091:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSortedRoutes", ({
    enumerable: true,
    get: function() {
        return getSortedRoutes;
    }
}));
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix) {
        if (prefix === void 0) prefix = "/";
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh("" + prefix + c + "/")).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get("[]")._smoosh(prefix + "[" + this.slugName + "]/"));
        }
        if (!this.placeholder) {
            const r = prefix === "/" ? "/" : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + r + '" and "' + r + "[[..." + this.optionalRestSlugName + ']]").');
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get("[...]")._smoosh(prefix + "[..." + this.restSlugName + "]/"));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get("[[...]]")._smoosh(prefix + "[[..." + this.optionalRestSlugName + "]]/"));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw new Error("Catch-all must be the last part of the URL.");
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith("...")) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
                throw new Error("Segment names may not start or end with extra brackets ('" + segmentName + "').");
            }
            if (segmentName.startsWith(".")) {
                throw new Error("Segment names may not start with erroneous periods ('" + segmentName + "').");
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw new Error("You cannot use different slug names for the same dynamic path ('" + previousSlug + "' !== '" + nextSlug + "').");
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw new Error('You cannot have the same slug name "' + nextSlug + '" repeat within a single dynamic path');
                    }
                    if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                        throw new Error('You cannot have the slug names "' + slug + '" and "' + nextSlug + '" differ only by non-word symbols within a single dynamic path');
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + urlPaths[0] + '" ).');
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = "[[...]]";
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + urlPaths[0] + '").');
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = "[...]";
                }
            } else {
                if (isOptional) {
                    throw new Error('Optional route parameters are not yet supported ("' + urlPaths[0] + '").');
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = "[]";
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/integration/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
} //# sourceMappingURL=sorted-routes.js.map


/***/ }),

/***/ 130:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    isResSent: function() {
        return isResSent;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    DecodeError: function() {
        return DecodeError;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    "CLS",
    "FCP",
    "FID",
    "INP",
    "LCP",
    "TTFB"
];
function execOnce(fn) {
    let used = false;
    let result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return protocol + "//" + hostname + (port ? ":" + port : "");
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split("?");
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? "?" + urlParts.slice(1).join("?") : "");
}
async function loadGetInitialProps(App, ctx) {
    if (false) { var _App_prototype; }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw new Error(message);
    }
    if (false) {}
    return props;
}
const SP = typeof performance !== "undefined";
const ST = SP && [
    "mark",
    "measure",
    "getEntriesByName"
].every((method)=>typeof performance[method] === "function");
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = "ENOENT";
        this.name = "PageNotFoundError";
        this.message = "Cannot find module for page: " + page;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = "ENOENT";
        this.message = "Cannot find the middleware module";
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 7114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(696)


/***/ }),

/***/ 1668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e=__webpack_require__(8038);function h(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var k="function"===typeof Object.is?Object.is:h,l=e.useState,m=e.useEffect,n=e.useLayoutEffect,p=e.useDebugValue;function q(a,b){var d=b(),f=l({inst:{value:d,getSnapshot:b}}),c=f[0].inst,g=f[1];n(function(){c.value=d;c.getSnapshot=b;r(c)&&g({inst:c})},[a,d,b]);m(function(){r(c)&&g({inst:c});return a(function(){r(c)&&g({inst:c})})},[a]);p(d);return d}
function r(a){var b=a.getSnapshot;a=a.value;try{var d=b();return!k(a,d)}catch(f){return!0}}function t(a,b){return b()}var u="undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement?t:q;exports.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:u;


/***/ }),

/***/ 1928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(1668);
} else {}


/***/ }),

/***/ 8324:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports._ = exports._class_private_field_loose_base = _class_private_field_loose_base;
function _class_private_field_loose_base(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
        throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
}


/***/ }),

/***/ 4567:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var id = 0;

exports._ = exports._class_private_field_loose_key = _class_private_field_loose_key;
function _class_private_field_loose_key(name) {
    return "__private_" + id++ + "_" + name;
}


/***/ }),

/***/ 2147:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports._ = exports._interop_require_default = _interop_require_default;
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}


/***/ }),

/***/ 4009:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();

    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
exports._ = exports._interop_require_wildcard = _interop_require_wildcard;
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) return cache.get(obj);

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }

    newObj.default = obj;

    if (cache) cache.set(obj, newObj);

    return newObj;
}


/***/ }),

/***/ 3297:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports._ = exports._interop_require_default = _interop_require_default;
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 5182:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ clsx)
/* harmony export */ });
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) for(t = 0; t < e.length; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else for(t in e)e[t] && (n && (n += " "), n += t);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = ""; f < arguments.length;)(e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (clsx)));


/***/ }),

/***/ 2794:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* binding */ twMerge)
});

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/class-utils.mjs
var CLASS_PART_SEPARATOR = "-";
function createClassUtils(config) {
    var classMap = createClassMap(config);
    var conflictingClassGroups = config.conflictingClassGroups, _config$conflictingCl = config.conflictingClassGroupModifiers, conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
    function getClassGroupId(className) {
        var classParts = className.split(CLASS_PART_SEPARATOR);
        // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
        if (classParts[0] === "" && classParts.length !== 1) {
            classParts.shift();
        }
        return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
    }
    function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
        var conflicts = conflictingClassGroups[classGroupId] || [];
        if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
            return [].concat(conflicts, conflictingClassGroupModifiers[classGroupId]);
        }
        return conflicts;
    }
    return {
        getClassGroupId: getClassGroupId,
        getConflictingClassGroupIds: getConflictingClassGroupIds
    };
}
function getGroupRecursive(classParts, classPartObject) {
    if (classParts.length === 0) {
        return classPartObject.classGroupId;
    }
    var currentClassPart = classParts[0];
    var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
    if (classGroupFromNextClassPart) {
        return classGroupFromNextClassPart;
    }
    if (classPartObject.validators.length === 0) {
        return undefined;
    }
    var classRest = classParts.join(CLASS_PART_SEPARATOR);
    return classPartObject.validators.find(function(_ref) {
        var validator = _ref.validator;
        return validator(classRest);
    })?.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
    if (arbitraryPropertyRegex.test(className)) {
        var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
        var property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
        if (property) {
            // I use two dots here because one dot is used as prefix for class groups in plugins
            return "arbitrary.." + property;
        }
    }
}
/**
 * Exported for testing only
 */ function createClassMap(config) {
    var theme = config.theme, prefix = config.prefix;
    var classMap = {
        nextPart: new Map(),
        validators: []
    };
    var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
    prefixedClassGroupEntries.forEach(function(_ref2) {
        var classGroupId = _ref2[0], classGroup = _ref2[1];
        processClassesRecursively(classGroup, classMap, classGroupId, theme);
    });
    return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
    classGroup.forEach(function(classDefinition) {
        if (typeof classDefinition === "string") {
            var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
            classPartObjectToEdit.classGroupId = classGroupId;
            return;
        }
        if (typeof classDefinition === "function") {
            if (isThemeGetter(classDefinition)) {
                processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
                return;
            }
            classPartObject.validators.push({
                validator: classDefinition,
                classGroupId: classGroupId
            });
            return;
        }
        Object.entries(classDefinition).forEach(function(_ref3) {
            var key = _ref3[0], classGroup = _ref3[1];
            processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
        });
    });
}
function getPart(classPartObject, path) {
    var currentClassPartObject = classPartObject;
    path.split(CLASS_PART_SEPARATOR).forEach(function(pathPart) {
        if (!currentClassPartObject.nextPart.has(pathPart)) {
            currentClassPartObject.nextPart.set(pathPart, {
                nextPart: new Map(),
                validators: []
            });
        }
        currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
    });
    return currentClassPartObject;
}
function isThemeGetter(func) {
    return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
    if (!prefix) {
        return classGroupEntries;
    }
    return classGroupEntries.map(function(_ref4) {
        var classGroupId = _ref4[0], classGroup = _ref4[1];
        var prefixedClassGroup = classGroup.map(function(classDefinition) {
            if (typeof classDefinition === "string") {
                return prefix + classDefinition;
            }
            if (typeof classDefinition === "object") {
                return Object.fromEntries(Object.entries(classDefinition).map(function(_ref5) {
                    var key = _ref5[0], value = _ref5[1];
                    return [
                        prefix + key,
                        value
                    ];
                }));
            }
            return classDefinition;
        });
        return [
            classGroupId,
            prefixedClassGroup
        ];
    });
}
 //# sourceMappingURL=class-utils.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/lru-cache.mjs
// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
function createLruCache(maxCacheSize) {
    if (maxCacheSize < 1) {
        return {
            get: function get() {
                return undefined;
            },
            set: function set() {}
        };
    }
    var cacheSize = 0;
    var cache = new Map();
    var previousCache = new Map();
    function update(key, value) {
        cache.set(key, value);
        cacheSize++;
        if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = new Map();
        }
    }
    return {
        get: function get(key) {
            var value = cache.get(key);
            if (value !== undefined) {
                return value;
            }
            if ((value = previousCache.get(key)) !== undefined) {
                update(key, value);
                return value;
            }
        },
        set: function set(key, value) {
            if (cache.has(key)) {
                cache.set(key, value);
            } else {
                update(key, value);
            }
        }
    };
}
 //# sourceMappingURL=lru-cache.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/modifier-utils.mjs
var IMPORTANT_MODIFIER = "!";
function createSplitModifiers(config) {
    var separator = config.separator || ":";
    var isSeparatorSingleCharacter = separator.length === 1;
    var firstSeparatorCharacter = separator[0];
    var separatorLength = separator.length;
    // splitModifiers inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
    return function splitModifiers(className) {
        var modifiers = [];
        var bracketDepth = 0;
        var modifierStart = 0;
        var postfixModifierPosition;
        for(var index = 0; index < className.length; index++){
            var currentCharacter = className[index];
            if (bracketDepth === 0) {
                if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
                    modifiers.push(className.slice(modifierStart, index));
                    modifierStart = index + separatorLength;
                    continue;
                }
                if (currentCharacter === "/") {
                    postfixModifierPosition = index;
                    continue;
                }
            }
            if (currentCharacter === "[") {
                bracketDepth++;
            } else if (currentCharacter === "]") {
                bracketDepth--;
            }
        }
        var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
        var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
        var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
        var maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
        return {
            modifiers: modifiers,
            hasImportantModifier: hasImportantModifier,
            baseClassName: baseClassName,
            maybePostfixModifierPosition: maybePostfixModifierPosition
        };
    };
}
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */ function sortModifiers(modifiers) {
    if (modifiers.length <= 1) {
        return modifiers;
    }
    var sortedModifiers = [];
    var unsortedModifiers = [];
    modifiers.forEach(function(modifier) {
        var isArbitraryVariant = modifier[0] === "[";
        if (isArbitraryVariant) {
            sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([
                modifier
            ]));
            unsortedModifiers = [];
        } else {
            unsortedModifiers.push(modifier);
        }
    });
    sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
    return sortedModifiers;
}
 //# sourceMappingURL=modifier-utils.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/config-utils.mjs



function createConfigUtils(config) {
    return {
        cache: createLruCache(config.cacheSize),
        splitModifiers: createSplitModifiers(config),
        ...createClassUtils(config)
    };
}
 //# sourceMappingURL=config-utils.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/merge-classlist.mjs

var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
    var splitModifiers = configUtils.splitModifiers, getClassGroupId = configUtils.getClassGroupId, getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
    /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */ var classGroupsInConflict = new Set();
    return classList.trim().split(SPLIT_CLASSES_REGEX).map(function(originalClassName) {
        var _splitModifiers = splitModifiers(originalClassName), modifiers = _splitModifiers.modifiers, hasImportantModifier = _splitModifiers.hasImportantModifier, baseClassName = _splitModifiers.baseClassName, maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
        var classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        var hasPostfixModifier = Boolean(maybePostfixModifierPosition);
        if (!classGroupId) {
            if (!maybePostfixModifierPosition) {
                return {
                    isTailwindClass: false,
                    originalClassName: originalClassName
                };
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
                return {
                    isTailwindClass: false,
                    originalClassName: originalClassName
                };
            }
            hasPostfixModifier = false;
        }
        var variantModifier = sortModifiers(modifiers).join(":");
        var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        return {
            isTailwindClass: true,
            modifierId: modifierId,
            classGroupId: classGroupId,
            originalClassName: originalClassName,
            hasPostfixModifier: hasPostfixModifier
        };
    }).reverse()// Last class in conflict wins, so we need to filter conflicting classes in reverse order.
    .filter(function(parsed) {
        if (!parsed.isTailwindClass) {
            return true;
        }
        var modifierId = parsed.modifierId, classGroupId = parsed.classGroupId, hasPostfixModifier = parsed.hasPostfixModifier;
        var classId = modifierId + classGroupId;
        if (classGroupsInConflict.has(classId)) {
            return false;
        }
        classGroupsInConflict.add(classId);
        getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function(group) {
            return classGroupsInConflict.add(modifierId + group);
        });
        return true;
    }).reverse().map(function(parsed) {
        return parsed.originalClassName;
    }).join(" ");
}
 //# sourceMappingURL=merge-classlist.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/tw-join.mjs
/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */ function twJoin() {
    var index = 0;
    var argument;
    var resolvedValue;
    var string = "";
    while(index < arguments.length){
        if (argument = arguments[index++]) {
            if (resolvedValue = toValue(argument)) {
                string && (string += " ");
                string += resolvedValue;
            }
        }
    }
    return string;
}
function toValue(mix) {
    if (typeof mix === "string") {
        return mix;
    }
    var resolvedValue;
    var string = "";
    for(var k = 0; k < mix.length; k++){
        if (mix[k]) {
            if (resolvedValue = toValue(mix[k])) {
                string && (string += " ");
                string += resolvedValue;
            }
        }
    }
    return string;
}
 //# sourceMappingURL=tw-join.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/create-tailwind-merge.mjs



function createTailwindMerge() {
    for(var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++){
        createConfig[_key] = arguments[_key];
    }
    var configUtils;
    var cacheGet;
    var cacheSet;
    var functionToCall = initTailwindMerge;
    function initTailwindMerge(classList) {
        var firstCreateConfig = createConfig[0], restCreateConfig = createConfig.slice(1);
        var config = restCreateConfig.reduce(function(previousConfig, createConfigCurrent) {
            return createConfigCurrent(previousConfig);
        }, firstCreateConfig());
        configUtils = createConfigUtils(config);
        cacheGet = configUtils.cache.get;
        cacheSet = configUtils.cache.set;
        functionToCall = tailwindMerge;
        return tailwindMerge(classList);
    }
    function tailwindMerge(classList) {
        var cachedResult = cacheGet(classList);
        if (cachedResult) {
            return cachedResult;
        }
        var result = mergeClassList(classList, configUtils);
        cacheSet(classList, result);
        return result;
    }
    return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments));
    };
}
 //# sourceMappingURL=create-tailwind-merge.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/from-theme.mjs
function fromTheme(key) {
    var themeGetter = function themeGetter(theme) {
        return theme[key] || [];
    };
    themeGetter.isThemeGetter = true;
    return themeGetter;
}
 //# sourceMappingURL=from-theme.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/validators.mjs
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /*#__PURE__*/ new Set([
    "px",
    "full",
    "screen"
]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
// Shadow always begins with x and y offset separated by underscore
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(value) {
    return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
    return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isArbitrarySize(value) {
    return getIsArbitraryValue(value, "size", isNever);
}
function isArbitraryPosition(value) {
    return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryUrl(value) {
    return getIsArbitraryValue(value, "url", isUrl);
}
function isArbitraryNumber(value) {
    return getIsArbitraryValue(value, "number", isNumber);
}
/**
 * @deprecated Will be removed in next major version. Use `isArbitraryNumber` instead.
 */ var isArbitraryWeight = (/* unused pure expression or super */ null && (isArbitraryNumber));
function isNumber(value) {
    return !Number.isNaN(Number(value));
}
function isPercent(value) {
    return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isInteger(value) {
    return isIntegerOnly(value) || getIsArbitraryValue(value, "number", isIntegerOnly);
}
function isArbitraryValue(value) {
    return arbitraryValueRegex.test(value);
}
function isAny() {
    return true;
}
function isTshirtSize(value) {
    return tshirtUnitRegex.test(value);
}
function isArbitraryShadow(value) {
    return getIsArbitraryValue(value, "", isShadow);
}
function getIsArbitraryValue(value, label, testValue) {
    var result = arbitraryValueRegex.exec(value);
    if (result) {
        if (result[1]) {
            return result[1] === label;
        }
        return testValue(result[2]);
    }
    return false;
}
function isLengthOnly(value) {
    return lengthUnitRegex.test(value);
}
function isNever() {
    return false;
}
function isUrl(value) {
    return value.startsWith("url(");
}
function isIntegerOnly(value) {
    return Number.isInteger(Number(value));
}
function isShadow(value) {
    return shadowRegex.test(value);
}
 //# sourceMappingURL=validators.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/default-config.mjs


function getDefaultConfig() {
    var colors = fromTheme("colors");
    var spacing = fromTheme("spacing");
    var blur = fromTheme("blur");
    var brightness = fromTheme("brightness");
    var borderColor = fromTheme("borderColor");
    var borderRadius = fromTheme("borderRadius");
    var borderSpacing = fromTheme("borderSpacing");
    var borderWidth = fromTheme("borderWidth");
    var contrast = fromTheme("contrast");
    var grayscale = fromTheme("grayscale");
    var hueRotate = fromTheme("hueRotate");
    var invert = fromTheme("invert");
    var gap = fromTheme("gap");
    var gradientColorStops = fromTheme("gradientColorStops");
    var gradientColorStopPositions = fromTheme("gradientColorStopPositions");
    var inset = fromTheme("inset");
    var margin = fromTheme("margin");
    var opacity = fromTheme("opacity");
    var padding = fromTheme("padding");
    var saturate = fromTheme("saturate");
    var scale = fromTheme("scale");
    var sepia = fromTheme("sepia");
    var skew = fromTheme("skew");
    var space = fromTheme("space");
    var translate = fromTheme("translate");
    var getOverscroll = function getOverscroll() {
        return [
            "auto",
            "contain",
            "none"
        ];
    };
    var getOverflow = function getOverflow() {
        return [
            "auto",
            "hidden",
            "clip",
            "visible",
            "scroll"
        ];
    };
    var getSpacingWithAutoAndArbitrary = function getSpacingWithAutoAndArbitrary() {
        return [
            "auto",
            isArbitraryValue,
            spacing
        ];
    };
    var getSpacingWithArbitrary = function getSpacingWithArbitrary() {
        return [
            isArbitraryValue,
            spacing
        ];
    };
    var getLengthWithEmpty = function getLengthWithEmpty() {
        return [
            "",
            isLength
        ];
    };
    var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary() {
        return [
            "auto",
            isNumber,
            isArbitraryValue
        ];
    };
    var getPositions = function getPositions() {
        return [
            "bottom",
            "center",
            "left",
            "left-bottom",
            "left-top",
            "right",
            "right-bottom",
            "right-top",
            "top"
        ];
    };
    var getLineStyles = function getLineStyles() {
        return [
            "solid",
            "dashed",
            "dotted",
            "double",
            "none"
        ];
    };
    var getBlendModes = function getBlendModes() {
        return [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
            "plus-lighter"
        ];
    };
    var getAlign = function getAlign() {
        return [
            "start",
            "end",
            "center",
            "between",
            "around",
            "evenly",
            "stretch"
        ];
    };
    var getZeroAndEmpty = function getZeroAndEmpty() {
        return [
            "",
            "0",
            isArbitraryValue
        ];
    };
    var getBreaks = function getBreaks() {
        return [
            "auto",
            "avoid",
            "all",
            "avoid-page",
            "page",
            "left",
            "right",
            "column"
        ];
    };
    var getNumber = function getNumber() {
        return [
            isNumber,
            isArbitraryNumber
        ];
    };
    var getNumberAndArbitrary = function getNumberAndArbitrary() {
        return [
            isNumber,
            isArbitraryValue
        ];
    };
    return {
        cacheSize: 500,
        theme: {
            colors: [
                isAny
            ],
            spacing: [
                isLength
            ],
            blur: [
                "none",
                "",
                isTshirtSize,
                isArbitraryValue
            ],
            brightness: getNumber(),
            borderColor: [
                colors
            ],
            borderRadius: [
                "none",
                "",
                "full",
                isTshirtSize,
                isArbitraryValue
            ],
            borderSpacing: getSpacingWithArbitrary(),
            borderWidth: getLengthWithEmpty(),
            contrast: getNumber(),
            grayscale: getZeroAndEmpty(),
            hueRotate: getNumberAndArbitrary(),
            invert: getZeroAndEmpty(),
            gap: getSpacingWithArbitrary(),
            gradientColorStops: [
                colors
            ],
            gradientColorStopPositions: [
                isPercent,
                isArbitraryLength
            ],
            inset: getSpacingWithAutoAndArbitrary(),
            margin: getSpacingWithAutoAndArbitrary(),
            opacity: getNumber(),
            padding: getSpacingWithArbitrary(),
            saturate: getNumber(),
            scale: getNumber(),
            sepia: getZeroAndEmpty(),
            skew: getNumberAndArbitrary(),
            space: getSpacingWithArbitrary(),
            translate: getSpacingWithArbitrary()
        },
        classGroups: {
            // Layout
            /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */ aspect: [
                {
                    aspect: [
                        "auto",
                        "square",
                        "video",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */ container: [
                "container"
            ],
            /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */ columns: [
                {
                    columns: [
                        isTshirtSize
                    ]
                }
            ],
            /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */ "break-after": [
                {
                    "break-after": getBreaks()
                }
            ],
            /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */ "break-before": [
                {
                    "break-before": getBreaks()
                }
            ],
            /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */ "break-inside": [
                {
                    "break-inside": [
                        "auto",
                        "avoid",
                        "avoid-page",
                        "avoid-column"
                    ]
                }
            ],
            /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */ "box-decoration": [
                {
                    "box-decoration": [
                        "slice",
                        "clone"
                    ]
                }
            ],
            /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */ box: [
                {
                    box: [
                        "border",
                        "content"
                    ]
                }
            ],
            /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */ display: [
                "block",
                "inline-block",
                "inline",
                "flex",
                "inline-flex",
                "table",
                "inline-table",
                "table-caption",
                "table-cell",
                "table-column",
                "table-column-group",
                "table-footer-group",
                "table-header-group",
                "table-row-group",
                "table-row",
                "flow-root",
                "grid",
                "inline-grid",
                "contents",
                "list-item",
                "hidden"
            ],
            /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */ "float": [
                {
                    "float": [
                        "right",
                        "left",
                        "none"
                    ]
                }
            ],
            /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */ clear: [
                {
                    clear: [
                        "left",
                        "right",
                        "both",
                        "none"
                    ]
                }
            ],
            /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */ isolation: [
                "isolate",
                "isolation-auto"
            ],
            /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */ "object-fit": [
                {
                    object: [
                        "contain",
                        "cover",
                        "fill",
                        "none",
                        "scale-down"
                    ]
                }
            ],
            /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */ "object-position": [
                {
                    object: [].concat(getPositions(), [
                        isArbitraryValue
                    ])
                }
            ],
            /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */ overflow: [
                {
                    overflow: getOverflow()
                }
            ],
            /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */ "overflow-x": [
                {
                    "overflow-x": getOverflow()
                }
            ],
            /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */ "overflow-y": [
                {
                    "overflow-y": getOverflow()
                }
            ],
            /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ overscroll: [
                {
                    overscroll: getOverscroll()
                }
            ],
            /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ "overscroll-x": [
                {
                    "overscroll-x": getOverscroll()
                }
            ],
            /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ "overscroll-y": [
                {
                    "overscroll-y": getOverscroll()
                }
            ],
            /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */ position: [
                "static",
                "fixed",
                "absolute",
                "relative",
                "sticky"
            ],
            /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ inset: [
                {
                    inset: [
                        inset
                    ]
                }
            ],
            /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ "inset-x": [
                {
                    "inset-x": [
                        inset
                    ]
                }
            ],
            /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ "inset-y": [
                {
                    "inset-y": [
                        inset
                    ]
                }
            ],
            /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ start: [
                {
                    start: [
                        inset
                    ]
                }
            ],
            /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ end: [
                {
                    end: [
                        inset
                    ]
                }
            ],
            /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ top: [
                {
                    top: [
                        inset
                    ]
                }
            ],
            /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ right: [
                {
                    right: [
                        inset
                    ]
                }
            ],
            /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ bottom: [
                {
                    bottom: [
                        inset
                    ]
                }
            ],
            /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ left: [
                {
                    left: [
                        inset
                    ]
                }
            ],
            /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */ visibility: [
                "visible",
                "invisible",
                "collapse"
            ],
            /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */ z: [
                {
                    z: [
                        "auto",
                        isInteger
                    ]
                }
            ],
            // Flexbox and Grid
            /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */ basis: [
                {
                    basis: getSpacingWithAutoAndArbitrary()
                }
            ],
            /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */ "flex-direction": [
                {
                    flex: [
                        "row",
                        "row-reverse",
                        "col",
                        "col-reverse"
                    ]
                }
            ],
            /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */ "flex-wrap": [
                {
                    flex: [
                        "wrap",
                        "wrap-reverse",
                        "nowrap"
                    ]
                }
            ],
            /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */ flex: [
                {
                    flex: [
                        "1",
                        "auto",
                        "initial",
                        "none",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */ grow: [
                {
                    grow: getZeroAndEmpty()
                }
            ],
            /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */ shrink: [
                {
                    shrink: getZeroAndEmpty()
                }
            ],
            /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */ order: [
                {
                    order: [
                        "first",
                        "last",
                        "none",
                        isInteger
                    ]
                }
            ],
            /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */ "grid-cols": [
                {
                    "grid-cols": [
                        isAny
                    ]
                }
            ],
            /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */ "col-start-end": [
                {
                    col: [
                        "auto",
                        {
                            span: [
                                "full",
                                isInteger
                            ]
                        },
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */ "col-start": [
                {
                    "col-start": getNumberWithAutoAndArbitrary()
                }
            ],
            /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */ "col-end": [
                {
                    "col-end": getNumberWithAutoAndArbitrary()
                }
            ],
            /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */ "grid-rows": [
                {
                    "grid-rows": [
                        isAny
                    ]
                }
            ],
            /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */ "row-start-end": [
                {
                    row: [
                        "auto",
                        {
                            span: [
                                isInteger
                            ]
                        },
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */ "row-start": [
                {
                    "row-start": getNumberWithAutoAndArbitrary()
                }
            ],
            /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */ "row-end": [
                {
                    "row-end": getNumberWithAutoAndArbitrary()
                }
            ],
            /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */ "grid-flow": [
                {
                    "grid-flow": [
                        "row",
                        "col",
                        "dense",
                        "row-dense",
                        "col-dense"
                    ]
                }
            ],
            /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */ "auto-cols": [
                {
                    "auto-cols": [
                        "auto",
                        "min",
                        "max",
                        "fr",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */ "auto-rows": [
                {
                    "auto-rows": [
                        "auto",
                        "min",
                        "max",
                        "fr",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */ gap: [
                {
                    gap: [
                        gap
                    ]
                }
            ],
            /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */ "gap-x": [
                {
                    "gap-x": [
                        gap
                    ]
                }
            ],
            /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */ "gap-y": [
                {
                    "gap-y": [
                        gap
                    ]
                }
            ],
            /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */ "justify-content": [
                {
                    justify: [
                        "normal"
                    ].concat(getAlign())
                }
            ],
            /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */ "justify-items": [
                {
                    "justify-items": [
                        "start",
                        "end",
                        "center",
                        "stretch"
                    ]
                }
            ],
            /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */ "justify-self": [
                {
                    "justify-self": [
                        "auto",
                        "start",
                        "end",
                        "center",
                        "stretch"
                    ]
                }
            ],
            /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */ "align-content": [
                {
                    content: [
                        "normal"
                    ].concat(getAlign(), [
                        "baseline"
                    ])
                }
            ],
            /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */ "align-items": [
                {
                    items: [
                        "start",
                        "end",
                        "center",
                        "baseline",
                        "stretch"
                    ]
                }
            ],
            /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */ "align-self": [
                {
                    self: [
                        "auto",
                        "start",
                        "end",
                        "center",
                        "stretch",
                        "baseline"
                    ]
                }
            ],
            /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */ "place-content": [
                {
                    "place-content": [].concat(getAlign(), [
                        "baseline"
                    ])
                }
            ],
            /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */ "place-items": [
                {
                    "place-items": [
                        "start",
                        "end",
                        "center",
                        "baseline",
                        "stretch"
                    ]
                }
            ],
            /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */ "place-self": [
                {
                    "place-self": [
                        "auto",
                        "start",
                        "end",
                        "center",
                        "stretch"
                    ]
                }
            ],
            // Spacing
            /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */ p: [
                {
                    p: [
                        padding
                    ]
                }
            ],
            /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */ px: [
                {
                    px: [
                        padding
                    ]
                }
            ],
            /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */ py: [
                {
                    py: [
                        padding
                    ]
                }
            ],
            /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */ ps: [
                {
                    ps: [
                        padding
                    ]
                }
            ],
            /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */ pe: [
                {
                    pe: [
                        padding
                    ]
                }
            ],
            /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */ pt: [
                {
                    pt: [
                        padding
                    ]
                }
            ],
            /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */ pr: [
                {
                    pr: [
                        padding
                    ]
                }
            ],
            /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */ pb: [
                {
                    pb: [
                        padding
                    ]
                }
            ],
            /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */ pl: [
                {
                    pl: [
                        padding
                    ]
                }
            ],
            /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */ m: [
                {
                    m: [
                        margin
                    ]
                }
            ],
            /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */ mx: [
                {
                    mx: [
                        margin
                    ]
                }
            ],
            /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */ my: [
                {
                    my: [
                        margin
                    ]
                }
            ],
            /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */ ms: [
                {
                    ms: [
                        margin
                    ]
                }
            ],
            /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */ me: [
                {
                    me: [
                        margin
                    ]
                }
            ],
            /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */ mt: [
                {
                    mt: [
                        margin
                    ]
                }
            ],
            /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */ mr: [
                {
                    mr: [
                        margin
                    ]
                }
            ],
            /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */ mb: [
                {
                    mb: [
                        margin
                    ]
                }
            ],
            /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */ ml: [
                {
                    ml: [
                        margin
                    ]
                }
            ],
            /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */ "space-x": [
                {
                    "space-x": [
                        space
                    ]
                }
            ],
            /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */ "space-x-reverse": [
                "space-x-reverse"
            ],
            /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */ "space-y": [
                {
                    "space-y": [
                        space
                    ]
                }
            ],
            /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */ "space-y-reverse": [
                "space-y-reverse"
            ],
            // Sizing
            /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */ w: [
                {
                    w: [
                        "auto",
                        "min",
                        "max",
                        "fit",
                        isArbitraryValue,
                        spacing
                    ]
                }
            ],
            /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */ "min-w": [
                {
                    "min-w": [
                        "min",
                        "max",
                        "fit",
                        isArbitraryValue,
                        isLength
                    ]
                }
            ],
            /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */ "max-w": [
                {
                    "max-w": [
                        "0",
                        "none",
                        "full",
                        "min",
                        "max",
                        "fit",
                        "prose",
                        {
                            screen: [
                                isTshirtSize
                            ]
                        },
                        isTshirtSize,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */ h: [
                {
                    h: [
                        isArbitraryValue,
                        spacing,
                        "auto",
                        "min",
                        "max",
                        "fit"
                    ]
                }
            ],
            /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */ "min-h": [
                {
                    "min-h": [
                        "min",
                        "max",
                        "fit",
                        isArbitraryValue,
                        isLength
                    ]
                }
            ],
            /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */ "max-h": [
                {
                    "max-h": [
                        isArbitraryValue,
                        spacing,
                        "min",
                        "max",
                        "fit"
                    ]
                }
            ],
            // Typography
            /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */ "font-size": [
                {
                    text: [
                        "base",
                        isTshirtSize,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */ "font-smoothing": [
                "antialiased",
                "subpixel-antialiased"
            ],
            /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */ "font-style": [
                "italic",
                "not-italic"
            ],
            /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */ "font-weight": [
                {
                    font: [
                        "thin",
                        "extralight",
                        "light",
                        "normal",
                        "medium",
                        "semibold",
                        "bold",
                        "extrabold",
                        "black",
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */ "font-family": [
                {
                    font: [
                        isAny
                    ]
                }
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ "fvn-normal": [
                "normal-nums"
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ "fvn-ordinal": [
                "ordinal"
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ "fvn-slashed-zero": [
                "slashed-zero"
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ "fvn-figure": [
                "lining-nums",
                "oldstyle-nums"
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ "fvn-spacing": [
                "proportional-nums",
                "tabular-nums"
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ "fvn-fraction": [
                "diagonal-fractions",
                "stacked-fractons"
            ],
            /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */ tracking: [
                {
                    tracking: [
                        "tighter",
                        "tight",
                        "normal",
                        "wide",
                        "wider",
                        "widest",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */ "line-clamp": [
                {
                    "line-clamp": [
                        "none",
                        isNumber,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */ leading: [
                {
                    leading: [
                        "none",
                        "tight",
                        "snug",
                        "normal",
                        "relaxed",
                        "loose",
                        isArbitraryValue,
                        isLength
                    ]
                }
            ],
            /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */ "list-image": [
                {
                    "list-image": [
                        "none",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */ "list-style-type": [
                {
                    list: [
                        "none",
                        "disc",
                        "decimal",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */ "list-style-position": [
                {
                    list: [
                        "inside",
                        "outside"
                    ]
                }
            ],
            /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */ "placeholder-color": [
                {
                    placeholder: [
                        colors
                    ]
                }
            ],
            /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */ "placeholder-opacity": [
                {
                    "placeholder-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */ "text-alignment": [
                {
                    text: [
                        "left",
                        "center",
                        "right",
                        "justify",
                        "start",
                        "end"
                    ]
                }
            ],
            /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */ "text-color": [
                {
                    text: [
                        colors
                    ]
                }
            ],
            /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */ "text-opacity": [
                {
                    "text-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */ "text-decoration": [
                "underline",
                "overline",
                "line-through",
                "no-underline"
            ],
            /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */ "text-decoration-style": [
                {
                    decoration: [].concat(getLineStyles(), [
                        "wavy"
                    ])
                }
            ],
            /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */ "text-decoration-thickness": [
                {
                    decoration: [
                        "auto",
                        "from-font",
                        isLength
                    ]
                }
            ],
            /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */ "underline-offset": [
                {
                    "underline-offset": [
                        "auto",
                        isArbitraryValue,
                        isLength
                    ]
                }
            ],
            /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */ "text-decoration-color": [
                {
                    decoration: [
                        colors
                    ]
                }
            ],
            /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */ "text-transform": [
                "uppercase",
                "lowercase",
                "capitalize",
                "normal-case"
            ],
            /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */ "text-overflow": [
                "truncate",
                "text-ellipsis",
                "text-clip"
            ],
            /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */ indent: [
                {
                    indent: getSpacingWithArbitrary()
                }
            ],
            /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */ "vertical-align": [
                {
                    align: [
                        "baseline",
                        "top",
                        "middle",
                        "bottom",
                        "text-top",
                        "text-bottom",
                        "sub",
                        "super",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */ whitespace: [
                {
                    whitespace: [
                        "normal",
                        "nowrap",
                        "pre",
                        "pre-line",
                        "pre-wrap",
                        "break-spaces"
                    ]
                }
            ],
            /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */ "break": [
                {
                    "break": [
                        "normal",
                        "words",
                        "all",
                        "keep"
                    ]
                }
            ],
            /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */ hyphens: [
                {
                    hyphens: [
                        "none",
                        "manual",
                        "auto"
                    ]
                }
            ],
            /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */ content: [
                {
                    content: [
                        "none",
                        isArbitraryValue
                    ]
                }
            ],
            // Backgrounds
            /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */ "bg-attachment": [
                {
                    bg: [
                        "fixed",
                        "local",
                        "scroll"
                    ]
                }
            ],
            /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */ "bg-clip": [
                {
                    "bg-clip": [
                        "border",
                        "padding",
                        "content",
                        "text"
                    ]
                }
            ],
            /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */ "bg-opacity": [
                {
                    "bg-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */ "bg-origin": [
                {
                    "bg-origin": [
                        "border",
                        "padding",
                        "content"
                    ]
                }
            ],
            /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */ "bg-position": [
                {
                    bg: [].concat(getPositions(), [
                        isArbitraryPosition
                    ])
                }
            ],
            /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */ "bg-repeat": [
                {
                    bg: [
                        "no-repeat",
                        {
                            repeat: [
                                "",
                                "x",
                                "y",
                                "round",
                                "space"
                            ]
                        }
                    ]
                }
            ],
            /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */ "bg-size": [
                {
                    bg: [
                        "auto",
                        "cover",
                        "contain",
                        isArbitrarySize
                    ]
                }
            ],
            /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */ "bg-image": [
                {
                    bg: [
                        "none",
                        {
                            "gradient-to": [
                                "t",
                                "tr",
                                "r",
                                "br",
                                "b",
                                "bl",
                                "l",
                                "tl"
                            ]
                        },
                        isArbitraryUrl
                    ]
                }
            ],
            /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */ "bg-color": [
                {
                    bg: [
                        colors
                    ]
                }
            ],
            /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ "gradient-from-pos": [
                {
                    from: [
                        gradientColorStopPositions
                    ]
                }
            ],
            /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ "gradient-via-pos": [
                {
                    via: [
                        gradientColorStopPositions
                    ]
                }
            ],
            /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ "gradient-to-pos": [
                {
                    to: [
                        gradientColorStopPositions
                    ]
                }
            ],
            /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ "gradient-from": [
                {
                    from: [
                        gradientColorStops
                    ]
                }
            ],
            /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ "gradient-via": [
                {
                    via: [
                        gradientColorStops
                    ]
                }
            ],
            /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ "gradient-to": [
                {
                    to: [
                        gradientColorStops
                    ]
                }
            ],
            // Borders
            /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */ rounded: [
                {
                    rounded: [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-s": [
                {
                    "rounded-s": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-e": [
                {
                    "rounded-e": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-t": [
                {
                    "rounded-t": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-r": [
                {
                    "rounded-r": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-b": [
                {
                    "rounded-b": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-l": [
                {
                    "rounded-l": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-ss": [
                {
                    "rounded-ss": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-se": [
                {
                    "rounded-se": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-ee": [
                {
                    "rounded-ee": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-es": [
                {
                    "rounded-es": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-tl": [
                {
                    "rounded-tl": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-tr": [
                {
                    "rounded-tr": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-br": [
                {
                    "rounded-br": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */ "rounded-bl": [
                {
                    "rounded-bl": [
                        borderRadius
                    ]
                }
            ],
            /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w": [
                {
                    border: [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-x": [
                {
                    "border-x": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-y": [
                {
                    "border-y": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-s": [
                {
                    "border-s": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-e": [
                {
                    "border-e": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-t": [
                {
                    "border-t": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-r": [
                {
                    "border-r": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-b": [
                {
                    "border-b": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */ "border-w-l": [
                {
                    "border-l": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */ "border-opacity": [
                {
                    "border-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */ "border-style": [
                {
                    border: [].concat(getLineStyles(), [
                        "hidden"
                    ])
                }
            ],
            /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */ "divide-x": [
                {
                    "divide-x": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */ "divide-x-reverse": [
                "divide-x-reverse"
            ],
            /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */ "divide-y": [
                {
                    "divide-y": [
                        borderWidth
                    ]
                }
            ],
            /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */ "divide-y-reverse": [
                "divide-y-reverse"
            ],
            /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */ "divide-opacity": [
                {
                    "divide-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */ "divide-style": [
                {
                    divide: getLineStyles()
                }
            ],
            /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color": [
                {
                    border: [
                        borderColor
                    ]
                }
            ],
            /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color-x": [
                {
                    "border-x": [
                        borderColor
                    ]
                }
            ],
            /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color-y": [
                {
                    "border-y": [
                        borderColor
                    ]
                }
            ],
            /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color-t": [
                {
                    "border-t": [
                        borderColor
                    ]
                }
            ],
            /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color-r": [
                {
                    "border-r": [
                        borderColor
                    ]
                }
            ],
            /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color-b": [
                {
                    "border-b": [
                        borderColor
                    ]
                }
            ],
            /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */ "border-color-l": [
                {
                    "border-l": [
                        borderColor
                    ]
                }
            ],
            /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */ "divide-color": [
                {
                    divide: [
                        borderColor
                    ]
                }
            ],
            /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */ "outline-style": [
                {
                    outline: [
                        ""
                    ].concat(getLineStyles())
                }
            ],
            /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */ "outline-offset": [
                {
                    "outline-offset": [
                        isArbitraryValue,
                        isLength
                    ]
                }
            ],
            /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */ "outline-w": [
                {
                    outline: [
                        isLength
                    ]
                }
            ],
            /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */ "outline-color": [
                {
                    outline: [
                        colors
                    ]
                }
            ],
            /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */ "ring-w": [
                {
                    ring: getLengthWithEmpty()
                }
            ],
            /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */ "ring-w-inset": [
                "ring-inset"
            ],
            /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */ "ring-color": [
                {
                    ring: [
                        colors
                    ]
                }
            ],
            /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */ "ring-opacity": [
                {
                    "ring-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */ "ring-offset-w": [
                {
                    "ring-offset": [
                        isLength
                    ]
                }
            ],
            /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */ "ring-offset-color": [
                {
                    "ring-offset": [
                        colors
                    ]
                }
            ],
            // Effects
            /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */ shadow: [
                {
                    shadow: [
                        "",
                        "inner",
                        "none",
                        isTshirtSize,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */ "shadow-color": [
                {
                    shadow: [
                        isAny
                    ]
                }
            ],
            /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */ opacity: [
                {
                    opacity: [
                        opacity
                    ]
                }
            ],
            /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */ "mix-blend": [
                {
                    "mix-blend": getBlendModes()
                }
            ],
            /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */ "bg-blend": [
                {
                    "bg-blend": getBlendModes()
                }
            ],
            // Filters
            /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */ filter: [
                {
                    filter: [
                        "",
                        "none"
                    ]
                }
            ],
            /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */ blur: [
                {
                    blur: [
                        blur
                    ]
                }
            ],
            /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */ brightness: [
                {
                    brightness: [
                        brightness
                    ]
                }
            ],
            /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */ contrast: [
                {
                    contrast: [
                        contrast
                    ]
                }
            ],
            /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */ "drop-shadow": [
                {
                    "drop-shadow": [
                        "",
                        "none",
                        isTshirtSize,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */ grayscale: [
                {
                    grayscale: [
                        grayscale
                    ]
                }
            ],
            /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */ "hue-rotate": [
                {
                    "hue-rotate": [
                        hueRotate
                    ]
                }
            ],
            /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */ invert: [
                {
                    invert: [
                        invert
                    ]
                }
            ],
            /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */ saturate: [
                {
                    saturate: [
                        saturate
                    ]
                }
            ],
            /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */ sepia: [
                {
                    sepia: [
                        sepia
                    ]
                }
            ],
            /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */ "backdrop-filter": [
                {
                    "backdrop-filter": [
                        "",
                        "none"
                    ]
                }
            ],
            /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */ "backdrop-blur": [
                {
                    "backdrop-blur": [
                        blur
                    ]
                }
            ],
            /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */ "backdrop-brightness": [
                {
                    "backdrop-brightness": [
                        brightness
                    ]
                }
            ],
            /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */ "backdrop-contrast": [
                {
                    "backdrop-contrast": [
                        contrast
                    ]
                }
            ],
            /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */ "backdrop-grayscale": [
                {
                    "backdrop-grayscale": [
                        grayscale
                    ]
                }
            ],
            /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */ "backdrop-hue-rotate": [
                {
                    "backdrop-hue-rotate": [
                        hueRotate
                    ]
                }
            ],
            /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */ "backdrop-invert": [
                {
                    "backdrop-invert": [
                        invert
                    ]
                }
            ],
            /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */ "backdrop-opacity": [
                {
                    "backdrop-opacity": [
                        opacity
                    ]
                }
            ],
            /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */ "backdrop-saturate": [
                {
                    "backdrop-saturate": [
                        saturate
                    ]
                }
            ],
            /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */ "backdrop-sepia": [
                {
                    "backdrop-sepia": [
                        sepia
                    ]
                }
            ],
            // Tables
            /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */ "border-collapse": [
                {
                    border: [
                        "collapse",
                        "separate"
                    ]
                }
            ],
            /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */ "border-spacing": [
                {
                    "border-spacing": [
                        borderSpacing
                    ]
                }
            ],
            /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */ "border-spacing-x": [
                {
                    "border-spacing-x": [
                        borderSpacing
                    ]
                }
            ],
            /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */ "border-spacing-y": [
                {
                    "border-spacing-y": [
                        borderSpacing
                    ]
                }
            ],
            /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */ "table-layout": [
                {
                    table: [
                        "auto",
                        "fixed"
                    ]
                }
            ],
            /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */ caption: [
                {
                    caption: [
                        "top",
                        "bottom"
                    ]
                }
            ],
            // Transitions and Animation
            /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */ transition: [
                {
                    transition: [
                        "none",
                        "all",
                        "",
                        "colors",
                        "opacity",
                        "shadow",
                        "transform",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */ duration: [
                {
                    duration: getNumberAndArbitrary()
                }
            ],
            /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */ ease: [
                {
                    ease: [
                        "linear",
                        "in",
                        "out",
                        "in-out",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */ delay: [
                {
                    delay: getNumberAndArbitrary()
                }
            ],
            /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */ animate: [
                {
                    animate: [
                        "none",
                        "spin",
                        "ping",
                        "pulse",
                        "bounce",
                        isArbitraryValue
                    ]
                }
            ],
            // Transforms
            /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */ transform: [
                {
                    transform: [
                        "",
                        "gpu",
                        "none"
                    ]
                }
            ],
            /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */ scale: [
                {
                    scale: [
                        scale
                    ]
                }
            ],
            /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */ "scale-x": [
                {
                    "scale-x": [
                        scale
                    ]
                }
            ],
            /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */ "scale-y": [
                {
                    "scale-y": [
                        scale
                    ]
                }
            ],
            /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */ rotate: [
                {
                    rotate: [
                        isInteger,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */ "translate-x": [
                {
                    "translate-x": [
                        translate
                    ]
                }
            ],
            /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */ "translate-y": [
                {
                    "translate-y": [
                        translate
                    ]
                }
            ],
            /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */ "skew-x": [
                {
                    "skew-x": [
                        skew
                    ]
                }
            ],
            /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */ "skew-y": [
                {
                    "skew-y": [
                        skew
                    ]
                }
            ],
            /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */ "transform-origin": [
                {
                    origin: [
                        "center",
                        "top",
                        "top-right",
                        "right",
                        "bottom-right",
                        "bottom",
                        "bottom-left",
                        "left",
                        "top-left",
                        isArbitraryValue
                    ]
                }
            ],
            // Interactivity
            /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */ accent: [
                {
                    accent: [
                        "auto",
                        colors
                    ]
                }
            ],
            /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */ appearance: [
                "appearance-none"
            ],
            /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */ cursor: [
                {
                    cursor: [
                        "auto",
                        "default",
                        "pointer",
                        "wait",
                        "text",
                        "move",
                        "help",
                        "not-allowed",
                        "none",
                        "context-menu",
                        "progress",
                        "cell",
                        "crosshair",
                        "vertical-text",
                        "alias",
                        "copy",
                        "no-drop",
                        "grab",
                        "grabbing",
                        "all-scroll",
                        "col-resize",
                        "row-resize",
                        "n-resize",
                        "e-resize",
                        "s-resize",
                        "w-resize",
                        "ne-resize",
                        "nw-resize",
                        "se-resize",
                        "sw-resize",
                        "ew-resize",
                        "ns-resize",
                        "nesw-resize",
                        "nwse-resize",
                        "zoom-in",
                        "zoom-out",
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */ "caret-color": [
                {
                    caret: [
                        colors
                    ]
                }
            ],
            /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */ "pointer-events": [
                {
                    "pointer-events": [
                        "none",
                        "auto"
                    ]
                }
            ],
            /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */ resize: [
                {
                    resize: [
                        "none",
                        "y",
                        "x",
                        ""
                    ]
                }
            ],
            /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */ "scroll-behavior": [
                {
                    scroll: [
                        "auto",
                        "smooth"
                    ]
                }
            ],
            /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-m": [
                {
                    "scroll-m": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-mx": [
                {
                    "scroll-mx": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-my": [
                {
                    "scroll-my": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-ms": [
                {
                    "scroll-ms": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-me": [
                {
                    "scroll-me": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-mt": [
                {
                    "scroll-mt": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-mr": [
                {
                    "scroll-mr": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-mb": [
                {
                    "scroll-mb": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */ "scroll-ml": [
                {
                    "scroll-ml": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-p": [
                {
                    "scroll-p": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-px": [
                {
                    "scroll-px": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-py": [
                {
                    "scroll-py": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-ps": [
                {
                    "scroll-ps": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-pe": [
                {
                    "scroll-pe": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-pt": [
                {
                    "scroll-pt": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-pr": [
                {
                    "scroll-pr": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-pb": [
                {
                    "scroll-pb": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */ "scroll-pl": [
                {
                    "scroll-pl": getSpacingWithArbitrary()
                }
            ],
            /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */ "snap-align": [
                {
                    snap: [
                        "start",
                        "end",
                        "center",
                        "align-none"
                    ]
                }
            ],
            /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */ "snap-stop": [
                {
                    snap: [
                        "normal",
                        "always"
                    ]
                }
            ],
            /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ "snap-type": [
                {
                    snap: [
                        "none",
                        "x",
                        "y",
                        "both"
                    ]
                }
            ],
            /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ "snap-strictness": [
                {
                    snap: [
                        "mandatory",
                        "proximity"
                    ]
                }
            ],
            /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */ touch: [
                {
                    touch: [
                        "auto",
                        "none",
                        "pinch-zoom",
                        "manipulation",
                        {
                            pan: [
                                "x",
                                "left",
                                "right",
                                "y",
                                "up",
                                "down"
                            ]
                        }
                    ]
                }
            ],
            /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */ select: [
                {
                    select: [
                        "none",
                        "text",
                        "all",
                        "auto"
                    ]
                }
            ],
            /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */ "will-change": [
                {
                    "will-change": [
                        "auto",
                        "scroll",
                        "contents",
                        "transform",
                        isArbitraryValue
                    ]
                }
            ],
            // SVG
            /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */ fill: [
                {
                    fill: [
                        colors,
                        "none"
                    ]
                }
            ],
            /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */ "stroke-w": [
                {
                    stroke: [
                        isLength,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */ stroke: [
                {
                    stroke: [
                        colors,
                        "none"
                    ]
                }
            ],
            // Accessibility
            /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */ sr: [
                "sr-only",
                "not-sr-only"
            ]
        },
        conflictingClassGroups: {
            overflow: [
                "overflow-x",
                "overflow-y"
            ],
            overscroll: [
                "overscroll-x",
                "overscroll-y"
            ],
            inset: [
                "inset-x",
                "inset-y",
                "start",
                "end",
                "top",
                "right",
                "bottom",
                "left"
            ],
            "inset-x": [
                "right",
                "left"
            ],
            "inset-y": [
                "top",
                "bottom"
            ],
            flex: [
                "basis",
                "grow",
                "shrink"
            ],
            gap: [
                "gap-x",
                "gap-y"
            ],
            p: [
                "px",
                "py",
                "ps",
                "pe",
                "pt",
                "pr",
                "pb",
                "pl"
            ],
            px: [
                "pr",
                "pl"
            ],
            py: [
                "pt",
                "pb"
            ],
            m: [
                "mx",
                "my",
                "ms",
                "me",
                "mt",
                "mr",
                "mb",
                "ml"
            ],
            mx: [
                "mr",
                "ml"
            ],
            my: [
                "mt",
                "mb"
            ],
            "font-size": [
                "leading"
            ],
            "fvn-normal": [
                "fvn-ordinal",
                "fvn-slashed-zero",
                "fvn-figure",
                "fvn-spacing",
                "fvn-fraction"
            ],
            "fvn-ordinal": [
                "fvn-normal"
            ],
            "fvn-slashed-zero": [
                "fvn-normal"
            ],
            "fvn-figure": [
                "fvn-normal"
            ],
            "fvn-spacing": [
                "fvn-normal"
            ],
            "fvn-fraction": [
                "fvn-normal"
            ],
            rounded: [
                "rounded-s",
                "rounded-e",
                "rounded-t",
                "rounded-r",
                "rounded-b",
                "rounded-l",
                "rounded-ss",
                "rounded-se",
                "rounded-ee",
                "rounded-es",
                "rounded-tl",
                "rounded-tr",
                "rounded-br",
                "rounded-bl"
            ],
            "rounded-s": [
                "rounded-ss",
                "rounded-es"
            ],
            "rounded-e": [
                "rounded-se",
                "rounded-ee"
            ],
            "rounded-t": [
                "rounded-tl",
                "rounded-tr"
            ],
            "rounded-r": [
                "rounded-tr",
                "rounded-br"
            ],
            "rounded-b": [
                "rounded-br",
                "rounded-bl"
            ],
            "rounded-l": [
                "rounded-tl",
                "rounded-bl"
            ],
            "border-spacing": [
                "border-spacing-x",
                "border-spacing-y"
            ],
            "border-w": [
                "border-w-s",
                "border-w-e",
                "border-w-t",
                "border-w-r",
                "border-w-b",
                "border-w-l"
            ],
            "border-w-x": [
                "border-w-r",
                "border-w-l"
            ],
            "border-w-y": [
                "border-w-t",
                "border-w-b"
            ],
            "border-color": [
                "border-color-t",
                "border-color-r",
                "border-color-b",
                "border-color-l"
            ],
            "border-color-x": [
                "border-color-r",
                "border-color-l"
            ],
            "border-color-y": [
                "border-color-t",
                "border-color-b"
            ],
            "scroll-m": [
                "scroll-mx",
                "scroll-my",
                "scroll-ms",
                "scroll-me",
                "scroll-mt",
                "scroll-mr",
                "scroll-mb",
                "scroll-ml"
            ],
            "scroll-mx": [
                "scroll-mr",
                "scroll-ml"
            ],
            "scroll-my": [
                "scroll-mt",
                "scroll-mb"
            ],
            "scroll-p": [
                "scroll-px",
                "scroll-py",
                "scroll-ps",
                "scroll-pe",
                "scroll-pt",
                "scroll-pr",
                "scroll-pb",
                "scroll-pl"
            ],
            "scroll-px": [
                "scroll-pr",
                "scroll-pl"
            ],
            "scroll-py": [
                "scroll-pt",
                "scroll-pb"
            ]
        },
        conflictingClassGroupModifiers: {
            "font-size": [
                "leading"
            ]
        }
    };
}
 //# sourceMappingURL=default-config.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/tw-merge.mjs


var twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
 //# sourceMappingURL=tw-merge.mjs.map


/***/ })

};
;