exports.id = 40;
exports.ids = [40];
exports.modules = {

/***/ 4348:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = exports.J_ = exports.zJ = exports.Ry = void 0;
var getDefaultParent = function (originalTarget) {
    if (typeof document === 'undefined') {
        return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap();
var uncontrolledNodes = new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function (node) {
    return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function (parent, targets) {
    return targets
        .map(function (target) {
        if (parent.contains(target)) {
            return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        console.error('aria-hidden', target, 'in not contained inside', parent, '. Doing nothing');
        return null;
    })
        .filter(function (x) { return Boolean(x); });
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @param {String} [controlAttribute] - html Attribute to control
 * @return {Undo} undo command
 */
var applyAttributeToOthers = function (originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function (el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function (parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        Array.prototype.forEach.call(parent.children, function (node) {
            if (elementsToKeep.has(node)) {
                deep(node);
            }
            else {
                var attr = node.getAttribute(controlAttribute);
                var alreadyHidden = attr !== null && attr !== 'false';
                var counterValue = (counterMap.get(node) || 0) + 1;
                var markerValue = (markerCounter.get(node) || 0) + 1;
                counterMap.set(node, counterValue);
                markerCounter.set(node, markerValue);
                hiddenNodes.push(node);
                if (counterValue === 1 && alreadyHidden) {
                    uncontrolledNodes.set(node, true);
                }
                if (markerValue === 1) {
                    node.setAttribute(markerName, 'true');
                }
                if (!alreadyHidden) {
                    node.setAttribute(controlAttribute, 'true');
                }
            }
        });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function () {
        hiddenNodes.forEach(function (node) {
            var counterValue = counterMap.get(node) - 1;
            var markerValue = markerCounter.get(node) - 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            if (!counterValue) {
                if (!uncontrolledNodes.has(node)) {
                    node.removeAttribute(controlAttribute);
                }
                uncontrolledNodes.delete(node);
            }
            if (!markerValue) {
                node.removeAttribute(markerName);
            }
        });
        lockCount--;
        if (!lockCount) {
            // clear
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledNodes = new WeakMap();
            markerMap = {};
        }
    };
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var hideOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-aria-hidden'; }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    // we should not hide ariaLive elements - https://github.com/theKashey/aria-hidden/issues/10
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live]')));
    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
};
exports.Ry = hideOthers;
/**
 * Marks everything except given node(or nodes) as inert
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var inertOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-inert-ed'; }
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    return applyAttributeToOthers(originalTarget, activeParentNode, markerName, 'inert');
};
exports.zJ = inertOthers;
/**
 * @returns if current browser supports inert
 */
var supportsInert = function () {
    return typeof HTMLElement !== 'undefined' && HTMLElement.prototype.hasOwnProperty('inert');
};
exports.J_ = supportsInert;
/**
 * Automatic function to "suppress" DOM elements - _hide_ or _inert_ in the best possible way
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var suppressOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-suppressed'; }
    return ((0, exports.J_)() ? exports.zJ : exports.Ry)(originalTarget, parentNode, markerName);
};
__webpack_unused_export__ = suppressOthers;


/***/ }),

/***/ 882:
/***/ ((module) => {

// Only Node.JS has a process variable that is of [[Class]] process
module.exports.isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';


/***/ }),

/***/ 7643:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var currentNonce;
exports.setNonce = function (nonce) {
    currentNonce = nonce;
};
exports.getNonce = function () {
    if (currentNonce) {
        return currentNonce;
    }
    if (true) {
        return __webpack_require__.nc;
    }
    return undefined;
};


/***/ }),

/***/ 3528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ createLucideIcon)
});

// UNUSED EXPORTS: toKebabCase

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
;// CONCATENATED MODULE: ./node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
 * lucide-react v0.274.0 - ISC
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map

;// CONCATENATED MODULE: ./node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
 * lucide-react v0.274.0 - ISC
 */




const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react_.forwardRef)(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => (0,react_.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0,react_.createElement)(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ 1264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Check)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3528);
/**
 * lucide-react v0.274.0 - ISC
 */



const Check = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)("Check", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]);


//# sourceMappingURL=check.js.map


/***/ }),

/***/ 1922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ChevronRight)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3528);
/**
 * lucide-react v0.274.0 - ISC
 */



const ChevronRight = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);


//# sourceMappingURL=chevron-right.js.map


/***/ }),

/***/ 4151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Circle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3528);
/**
 * lucide-react v0.274.0 - ISC
 */



const Circle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);


//# sourceMappingURL=circle.js.map


/***/ }),

/***/ 279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Moon)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3528);
/**
 * lucide-react v0.274.0 - ISC
 */



const Moon = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);


//# sourceMappingURL=moon.js.map


/***/ }),

/***/ 4904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Sun)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3528);
/**
 * lucide-react v0.274.0 - ISC
 */



const Sun = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);


//# sourceMappingURL=sun.js.map


/***/ }),

/***/ 3005:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addLocale", ({
    enumerable: true,
    get: function() {
        return addLocale;
    }
}));
const _normalizetrailingslash = __webpack_require__(1094);
const addLocale = function(path) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    if (false) {}
    return path;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 3684:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getDomainLocale", ({
    enumerable: true,
    get: function() {
        return getDomainLocale;
    }
}));
const _normalizetrailingslash = __webpack_require__(1094);
const basePath = (/* unused pure expression or super */ null && ( false || ""));
function getDomainLocale(path, locale, locales, domainLocales) {
    if (false) {} else {
        return false;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-domain-locale.js.map


/***/ }),

/***/ 954:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const _interop_require_default = __webpack_require__(2147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(8038));
const _resolvehref = __webpack_require__(982);
const _islocalurl = __webpack_require__(120);
const _formaturl = __webpack_require__(2336);
const _utils = __webpack_require__(8423);
const _addlocale = __webpack_require__(3005);
const _routercontext = __webpack_require__(7160);
const _approutercontext = __webpack_require__(7085);
const _useintersection = __webpack_require__(4254);
const _getdomainlocale = __webpack_require__(3684);
const _addbasepath = __webpack_require__(4578);
const _routerreducertypes = __webpack_require__(2836);
const prefetched = new Set();
function prefetch(router, href, as, options, appOptions, isAppRouter) {
    if (true) {
        return;
    }
    // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    if (!isAppRouter && !(0, _islocalurl.isLocalURL)(href)) {
        return;
    }
    // We should only dedupe requests when experimental.optimisticClientCache is
    // disabled.
    if (!options.bypassPrefetchedCheck) {
        const locale = typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : undefined;
        const prefetchedKey = href + "%" + as + "%" + locale;
        // If we've already fetched the key, then don't prefetch it again!
        if (prefetched.has(prefetchedKey)) {
            return;
        }
        // Mark this URL as prefetched.
        prefetched.add(prefetchedKey);
    }
    const prefetchPromise = isAppRouter ? router.prefetch(href, appOptions) : router.prefetch(href, as, options);
    // Prefetch the JSON page if asked (only in the client)
    // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch
    Promise.resolve(prefetchPromise).catch((err)=>{
        if (false) {}
    });
}
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute("target");
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && (isModifiedEvent(e) || // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    !isAppRouter && !(0, _islocalurl.isLocalURL)(href))) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        const routerScroll = scroll != null ? scroll : true;
        if ("beforePopState" in router) {
            router[replace ? "replace" : "push"](href, as, {
                shallow,
                locale,
                scroll: routerScroll
            });
        } else {
            router[replace ? "replace" : "push"](as || href, {
                forceOptimisticNavigation: !prefetchEnabled,
                scroll: routerScroll
            });
        }
    };
    if (isAppRouter) {
        _react.default.startTransition(navigate);
    } else {
        navigate();
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === "string") {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
/**
 * React Component that enables client-side transitions between routes.
 */ const Link = /*#__PURE__*/ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
    let children;
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = true === false, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /*#__PURE__*/ _react.default.createElement("a", null, children);
    }
    const pagesRouter = _react.default.useContext(_routercontext.RouterContext);
    const appRouter = _react.default.useContext(_approutercontext.AppRouterContext);
    const router = pagesRouter != null ? pagesRouter : appRouter;
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const prefetchEnabled = prefetchProp !== false;
    /**
     * The possible states for prefetch are:
     * - null: this is the default "auto" mode, where we will prefetch partially if the link is in the viewport
     * - true: we will prefetch if the link is visible and prefetch the full page, not just partially
     * - false: we will not prefetch if in the viewport at all
     */ const appPrefetchKind = prefetchProp === null ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.FULL;
    if (false) {}
    if (false) {}
    const { href, as } = _react.default.useMemo(()=>{
        if (!pagesRouter) {
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
        const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(pagesRouter, hrefProp, true);
        return {
            href: resolvedHref,
            as: asProp ? (0, _resolvehref.resolveHref)(pagesRouter, asProp) : resolvedAs || resolvedHref
        };
    }, [
        pagesRouter,
        hrefProp,
        asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (false) {} else {
            child = _react.default.Children.only(children);
        }
    } else {
        if (false) {}
    }
    const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
        rootMargin: "200px"
    });
    const setRef = _react.default.useCallback((el)=>{
        // Before the link getting observed, check if visible state need to be reset
        if (previousAs.current !== as || previousHref.current !== href) {
            resetVisible();
            previousAs.current = as;
            previousHref.current = href;
        }
        setIntersectionRef(el);
        if (childRef) {
            if (typeof childRef === "function") childRef(el);
            else if (typeof childRef === "object") {
                childRef.current = el;
            }
        }
    }, [
        as,
        childRef,
        href,
        resetVisible,
        setIntersectionRef
    ]);
    // Prefetch the URL if we haven't already and it's visible.
    _react.default.useEffect(()=>{
        // in dev, we only prefetch on hover to avoid wasting resources as the prefetch will trigger compiling the page.
        if (false) {}
        if (!router) {
            return;
        }
        // If we don't need to prefetch the URL, don't do prefetch.
        if (!isVisible || !prefetchEnabled) {
            return;
        }
        // Prefetch the URL.
        prefetch(router, href, as, {
            locale
        }, {
            kind: appPrefetchKind
        }, isAppRouter);
    }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        pagesRouter == null ? void 0 : pagesRouter.locale,
        router,
        isAppRouter,
        appPrefetchKind
    ]);
    const childProps = {
        ref: setRef,
        onClick (e) {
            if (false) {}
            if (!legacyBehavior && typeof onClick === "function") {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === "function") {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ((!prefetchEnabled || "production" === "development") && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, {
                kind: appPrefetchKind
            }, isAppRouter);
        },
        onTouchStart (e) {
            if (!legacyBehavior && typeof onTouchStartProp === "function") {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, {
                kind: appPrefetchKind
            }, isAppRouter);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the domain and locale.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : pagesRouter == null ? void 0 : pagesRouter.locale;
        // we only render domain locales if we are currently on a domain locale
        // so that locale links are still visitable in development/preview envs
        const localeDomain = (pagesRouter == null ? void 0 : pagesRouter.isLocaleDomain) && (0, _getdomainlocale.getDomainLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.locales, pagesRouter == null ? void 0 : pagesRouter.domainLocales);
        childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.defaultLocale));
    }
    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ _react.default.createElement("a", {
        ...restProps,
        ...childProps
    }, children);
});
const _default = Link;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map


/***/ }),

/***/ 9029:
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
    requestIdleCallback: function() {
        return requestIdleCallback;
    },
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    }
});
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map


/***/ }),

/***/ 4254:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useIntersection", ({
    enumerable: true,
    get: function() {
        return useIntersection;
    }
}));
const _react = __webpack_require__(8038);
const _requestidlecallback = __webpack_require__(9029);
const hasIntersectionObserver = typeof IntersectionObserver === "function";
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
    };
    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
        instance = observers.get(existing);
        if (instance) {
            return instance;
        }
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    instance = {
        id,
        observer,
        elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
}
function observe(element, callback, options) {
    const { id, observer, elements } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
function useIntersection(param) {
    let { rootRef, rootMargin, disabled } = param;
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react.useState)(false);
    const elementRef = (0, _react.useRef)(null);
    const setElement = (0, _react.useCallback)((element)=>{
        elementRef.current = element;
    }, []);
    (0, _react.useEffect)(()=>{
        if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            const element = elementRef.current;
            if (element && element.tagName) {
                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
                    root: rootRef == null ? void 0 : rootRef.current,
                    rootMargin
                });
                return unobserve;
            }
        } else {
            if (!visible) {
                const idleCallback = (0, _requestidlecallback.requestIdleCallback)(()=>setVisible(true));
                return ()=>(0, _requestidlecallback.cancelIdleCallback)(idleCallback);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
    ]);
    const resetVisible = (0, _react.useCallback)(()=>{
        setVisible(false);
    }, []);
    return [
        setElement,
        visible,
        resetVisible
    ];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map


/***/ }),

/***/ 4626:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveScrollBar = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var react_style_singleton_1 = __webpack_require__(7034);
var constants_1 = __webpack_require__(9461);
var utils_1 = __webpack_require__(2989);
var Style = (0, react_style_singleton_1.styleSingleton)();
// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
var getStyles = function (_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) { gapMode = 'margin'; }
    return "\n  .".concat(constants_1.noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === 'margin' &&
            "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === 'padding' && "padding-right: ".concat(gap, "px ").concat(important, ";"),
    ]
        .filter(Boolean)
        .join(''), "\n  }\n  \n  .").concat(constants_1.zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(constants_1.fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(constants_1.zeroRightClassName, " .").concat(constants_1.zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(constants_1.fullWidthClassName, " .").concat(constants_1.fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body {\n    ").concat(constants_1.removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
/**
 * Removes page scrollbar and blocks page scroll when mounted
 */
var RemoveScrollBar = function (props) {
    var noRelative = props.noRelative, noImportant = props.noImportant, _a = props.gapMode, gapMode = _a === void 0 ? 'margin' : _a;
    /*
     gap will be measured on every component mount
     however it will be used only by the "first" invocation
     due to singleton nature of <Style
     */
    var gap = React.useMemo(function () { return (0, utils_1.getGapWidth)(gapMode); }, [gapMode]);
    return React.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? '!important' : '') });
};
exports.RemoveScrollBar = RemoveScrollBar;


/***/ }),

/***/ 9461:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removedBarSizeVariable = exports.noScrollbarsClassName = exports.fullWidthClassName = exports.zeroRightClassName = void 0;
exports.zeroRightClassName = 'right-scroll-bar-position';
exports.fullWidthClassName = 'width-before-scroll-bar';
exports.noScrollbarsClassName = 'with-scroll-bars-hidden';
/**
 * Name of a CSS variable containing the amount of "hidden" scrollbar
 * ! might be undefined ! use will fallback!
 */
exports.removedBarSizeVariable = '--removed-body-scroll-bar-size';


/***/ }),

/***/ 2786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGapWidth = exports.removedBarSizeVariable = exports.noScrollbarsClassName = exports.fullWidthClassName = exports.zeroRightClassName = exports.RemoveScrollBar = void 0;
var component_1 = __webpack_require__(4626);
Object.defineProperty(exports, "RemoveScrollBar", ({ enumerable: true, get: function () { return component_1.RemoveScrollBar; } }));
var constants_1 = __webpack_require__(9461);
Object.defineProperty(exports, "zeroRightClassName", ({ enumerable: true, get: function () { return constants_1.zeroRightClassName; } }));
Object.defineProperty(exports, "fullWidthClassName", ({ enumerable: true, get: function () { return constants_1.fullWidthClassName; } }));
Object.defineProperty(exports, "noScrollbarsClassName", ({ enumerable: true, get: function () { return constants_1.noScrollbarsClassName; } }));
Object.defineProperty(exports, "removedBarSizeVariable", ({ enumerable: true, get: function () { return constants_1.removedBarSizeVariable; } }));
var utils_1 = __webpack_require__(2989);
Object.defineProperty(exports, "getGapWidth", ({ enumerable: true, get: function () { return utils_1.getGapWidth; } }));


/***/ }),

/***/ 2989:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGapWidth = exports.zeroGap = void 0;
exports.zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0,
};
var parse = function (x) { return parseInt(x || '', 10) || 0; };
var getOffset = function (gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
    var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
    var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
    return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
    if (gapMode === void 0) { gapMode = 'margin'; }
    if (typeof window === 'undefined') {
        return exports.zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
    };
};
exports.getGapWidth = getGapWidth;


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var UI_1 = __webpack_require__(3254);
var sidecar_1 = tslib_1.__importDefault(__webpack_require__(902));
var ReactRemoveScroll = React.forwardRef(function (props, ref) { return (React.createElement(UI_1.RemoveScroll, tslib_1.__assign({}, props, { ref: ref, sideCar: sidecar_1.default }))); });
ReactRemoveScroll.classNames = UI_1.RemoveScroll.classNames;
exports["default"] = ReactRemoveScroll;


/***/ }),

/***/ 5320:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveScrollSideCar = exports.getDeltaXY = exports.getTouchXY = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var react_remove_scroll_bar_1 = __webpack_require__(2786);
var react_style_singleton_1 = __webpack_require__(7034);
var aggresiveCapture_1 = __webpack_require__(3731);
var handleScroll_1 = __webpack_require__(7557);
var getTouchXY = function (event) {
    return 'changedTouches' in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
exports.getTouchXY = getTouchXY;
var getDeltaXY = function (event) { return [event.deltaX, event.deltaY]; };
exports.getDeltaXY = getDeltaXY;
var extractRef = function (ref) {
    return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) { return x[0] === y[0] && x[1] === y[1]; };
var generateStyle = function (id) { return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n"); };
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
    var shouldPreventQueue = React.useRef([]);
    var touchStartRef = React.useRef([0, 0]);
    var activeAxis = React.useRef();
    var id = React.useState(idCounter++)[0];
    var Style = React.useState(function () { return (0, react_style_singleton_1.styleSingleton)(); })[0];
    var lastProps = React.useRef(props);
    React.useEffect(function () {
        lastProps.current = props;
    }, [props]);
    React.useEffect(function () {
        if (props.inert) {
            document.body.classList.add("block-interactivity-".concat(id));
            var allow_1 = tslib_1.__spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
            allow_1.forEach(function (el) { return el.classList.add("allow-interactivity-".concat(id)); });
            return function () {
                document.body.classList.remove("block-interactivity-".concat(id));
                allow_1.forEach(function (el) { return el.classList.remove("allow-interactivity-".concat(id)); });
            };
        }
        return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = React.useCallback(function (event, parent) {
        if ('touches' in event && event.touches.length === 2) {
            return !lastProps.current.allowPinchZoom;
        }
        var touch = (0, exports.getTouchXY)(event);
        var touchStart = touchStartRef.current;
        var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
        // allow horizontal touch move on Range inputs. They will not cause any scroll
        if ('touches' in event && moveDirection === 'h' && target.type === 'range') {
            return false;
        }
        var canBeScrolledInMainDirection = (0, handleScroll_1.locationCouldBeScrolled)(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
            return true;
        }
        if (canBeScrolledInMainDirection) {
            currentAxis = moveDirection;
        }
        else {
            currentAxis = moveDirection === 'v' ? 'h' : 'v';
            canBeScrolledInMainDirection = (0, handleScroll_1.locationCouldBeScrolled)(moveDirection, target);
            // other axis might be not scrollable
        }
        if (!canBeScrolledInMainDirection) {
            return false;
        }
        if (!activeAxis.current && 'changedTouches' in event && (deltaX || deltaY)) {
            activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
            return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return (0, handleScroll_1.handleScroll)(cancelingAxis, parent, event, cancelingAxis === 'h' ? deltaX : deltaY, true);
    }, []);
    var shouldPrevent = React.useCallback(function (_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
            // not the last active
            return;
        }
        var delta = 'deltaY' in event ? (0, exports.getDeltaXY)(event) : (0, exports.getTouchXY)(event);
        var sourceEvent = shouldPreventQueue.current.filter(function (e) { return e.name === event.type && e.target === event.target && deltaCompare(e.delta, delta); })[0];
        // self event, and should be canceled
        if (sourceEvent && sourceEvent.should) {
            if (event.cancelable) {
                event.preventDefault();
            }
            return;
        }
        // outside or shard event
        if (!sourceEvent) {
            var shardNodes = (lastProps.current.shards || [])
                .map(extractRef)
                .filter(Boolean)
                .filter(function (node) { return node.contains(event.target); });
            var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
            if (shouldStop) {
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }
    }, []);
    var shouldCancel = React.useCallback(function (name, delta, target, should) {
        var event = { name: name, delta: delta, target: target, should: should };
        shouldPreventQueue.current.push(event);
        setTimeout(function () {
            shouldPreventQueue.current = shouldPreventQueue.current.filter(function (e) { return e !== event; });
        }, 1);
    }, []);
    var scrollTouchStart = React.useCallback(function (event) {
        touchStartRef.current = (0, exports.getTouchXY)(event);
        activeAxis.current = undefined;
    }, []);
    var scrollWheel = React.useCallback(function (event) {
        shouldCancel(event.type, (0, exports.getDeltaXY)(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = React.useCallback(function (event) {
        shouldCancel(event.type, (0, exports.getTouchXY)(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    React.useEffect(function () {
        lockStack.push(Style);
        props.setCallbacks({
            onScrollCapture: scrollWheel,
            onWheelCapture: scrollWheel,
            onTouchMoveCapture: scrollTouchMove,
        });
        document.addEventListener('wheel', shouldPrevent, aggresiveCapture_1.nonPassive);
        document.addEventListener('touchmove', shouldPrevent, aggresiveCapture_1.nonPassive);
        document.addEventListener('touchstart', scrollTouchStart, aggresiveCapture_1.nonPassive);
        return function () {
            lockStack = lockStack.filter(function (inst) { return inst !== Style; });
            document.removeEventListener('wheel', shouldPrevent, aggresiveCapture_1.nonPassive);
            document.removeEventListener('touchmove', shouldPrevent, aggresiveCapture_1.nonPassive);
            document.removeEventListener('touchstart', scrollTouchStart, aggresiveCapture_1.nonPassive);
        };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return (React.createElement(React.Fragment, null,
        inert ? React.createElement(Style, { styles: generateStyle(id) }) : null,
        removeScrollBar ? React.createElement(react_remove_scroll_bar_1.RemoveScrollBar, { gapMode: "margin" }) : null));
}
exports.RemoveScrollSideCar = RemoveScrollSideCar;


/***/ }),

/***/ 3254:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveScroll = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var constants_1 = __webpack_require__(9461);
var use_callback_ref_1 = __webpack_require__(3609);
var medium_1 = __webpack_require__(5210);
var nothing = function () {
    return;
};
/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
var RemoveScroll = React.forwardRef(function (props, parentRef) {
    var ref = React.useRef(null);
    var _a = React.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing,
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? 'div' : _b, rest = tslib_1.__rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]);
    var SideCar = sideCar;
    var containerRef = (0, use_callback_ref_1.useMergeRefs)([ref, parentRef]);
    var containerProps = tslib_1.__assign(tslib_1.__assign({}, rest), callbacks);
    return (React.createElement(React.Fragment, null,
        enabled && (React.createElement(SideCar, { sideCar: medium_1.effectCar, removeScrollBar: removeScrollBar, shards: shards, noIsolation: noIsolation, inert: inert, setCallbacks: setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref })),
        forwardProps ? (React.cloneElement(React.Children.only(children), tslib_1.__assign(tslib_1.__assign({}, containerProps), { ref: containerRef }))) : (React.createElement(Container, tslib_1.__assign({}, containerProps, { className: className, ref: containerRef }), children))));
});
exports.RemoveScroll = RemoveScroll;
RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false,
};
RemoveScroll.classNames = {
    fullWidth: constants_1.fullWidthClassName,
    zeroRight: constants_1.zeroRightClassName,
};


/***/ }),

/***/ 3731:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nonPassive = void 0;
var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
                return true;
            },
        });
        // @ts-ignore
        window.addEventListener('test', options, options);
        // @ts-ignore
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
exports.nonPassive = passiveSupported ? { passive: false } : false;


/***/ }),

/***/ 7557:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleScroll = exports.locationCouldBeScrolled = void 0;
var alwaysContainsScroll = function (node) {
    // textarea will always _contain_ scroll inside self. It only can be hidden
    return node.tagName === 'TEXTAREA';
};
var elementCanBeScrolled = function (node, overflow) {
    var styles = window.getComputedStyle(node);
    return (
    // not-not-scrollable
    styles[overflow] !== 'hidden' &&
        // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === 'visible'));
};
var elementCouldBeVScrolled = function (node) { return elementCanBeScrolled(node, 'overflowY'); };
var elementCouldBeHScrolled = function (node) { return elementCanBeScrolled(node, 'overflowX'); };
var locationCouldBeScrolled = function (axis, node) {
    var current = node;
    do {
        // Skip over shadow root
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
            current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
            var _a = getScrollVariables(axis, current), s = _a[1], d = _a[2];
            if (s > d) {
                return true;
            }
        }
        current = current.parentNode;
    } while (current && current !== document.body);
    return false;
};
exports.locationCouldBeScrolled = locationCouldBeScrolled;
var getVScrollVariables = function (_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
        scrollTop,
        scrollHeight,
        clientHeight,
    ];
};
var getHScrollVariables = function (_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
        scrollLeft,
        scrollWidth,
        clientWidth,
    ];
};
var elementCouldBeScrolled = function (axis, node) {
    return axis === 'v' ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
    return axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function (axis, direction) {
    /**
     * If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
     * and then increasingly negative as you scroll towards the end of the content.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
     */
    return axis === 'h' && direction === 'rtl' ? -1 : 1;
};
var handleScroll = function (axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    // find scrollable target
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
            if (elementCouldBeScrolled(axis, target)) {
                availableScroll += elementScroll;
                availableScrollTop += position;
            }
        }
        target = target.parentNode;
    } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
        // self content
        (targetInLock && (endTarget.contains(target) || endTarget === target)));
    if (isDeltaPositive && ((noOverscroll && availableScroll === 0) || (!noOverscroll && delta > availableScroll))) {
        shouldCancelScroll = true;
    }
    else if (!isDeltaPositive &&
        ((noOverscroll && availableScrollTop === 0) || (!noOverscroll && -delta > availableScrollTop))) {
        shouldCancelScroll = true;
    }
    return shouldCancelScroll;
};
exports.handleScroll = handleScroll;


/***/ }),

/***/ 2864:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.f = void 0;
var tslib_1 = __webpack_require__(6158);
var Combination_1 = tslib_1.__importDefault(__webpack_require__(840));
exports.f = Combination_1.default;


/***/ }),

/***/ 5210:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.effectCar = void 0;
var use_sidecar_1 = __webpack_require__(8221);
exports.effectCar = (0, use_sidecar_1.createSidecarMedium)();


/***/ }),

/***/ 902:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var use_sidecar_1 = __webpack_require__(8221);
var SideEffect_1 = __webpack_require__(5320);
var medium_1 = __webpack_require__(5210);
exports["default"] = (0, use_sidecar_1.exportSidecar)(medium_1.effectCar, SideEffect_1.RemoveScrollSideCar);


/***/ }),

/***/ 200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styleSingleton = void 0;
var hook_1 = __webpack_require__(9812);
/**
 * create a Component to add styles on demand
 * - styles are added when first instance is mounted
 * - styles are removed when the last instance is unmounted
 * - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
 */
var styleSingleton = function () {
    var useStyle = (0, hook_1.styleHookSingleton)();
    var Sheet = function (_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
    };
    return Sheet;
};
exports.styleSingleton = styleSingleton;


/***/ }),

/***/ 9812:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styleHookSingleton = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var singleton_1 = __webpack_require__(1995);
/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */
var styleHookSingleton = function () {
    var sheet = (0, singleton_1.stylesheetSingleton)();
    return function (styles, isDynamic) {
        React.useEffect(function () {
            sheet.add(styles);
            return function () {
                sheet.remove();
            };
        }, [styles && isDynamic]);
    };
};
exports.styleHookSingleton = styleHookSingleton;


/***/ }),

/***/ 7034:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styleHookSingleton = exports.stylesheetSingleton = exports.styleSingleton = void 0;
var component_1 = __webpack_require__(200);
Object.defineProperty(exports, "styleSingleton", ({ enumerable: true, get: function () { return component_1.styleSingleton; } }));
var singleton_1 = __webpack_require__(1995);
Object.defineProperty(exports, "stylesheetSingleton", ({ enumerable: true, get: function () { return singleton_1.stylesheetSingleton; } }));
var hook_1 = __webpack_require__(9812);
Object.defineProperty(exports, "styleHookSingleton", ({ enumerable: true, get: function () { return hook_1.styleHookSingleton; } }));


/***/ }),

/***/ 1995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stylesheetSingleton = void 0;
var get_nonce_1 = __webpack_require__(7643);
function makeStyleTag() {
    if (!document)
        return null;
    var tag = document.createElement('style');
    tag.type = 'text/css';
    var nonce = (0, get_nonce_1.getNonce)();
    if (nonce) {
        tag.setAttribute('nonce', nonce);
    }
    return tag;
}
function injectStyles(tag, css) {
    // @ts-ignore
    if (tag.styleSheet) {
        // @ts-ignore
        tag.styleSheet.cssText = css;
    }
    else {
        tag.appendChild(document.createTextNode(css));
    }
}
function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(tag);
}
var stylesheetSingleton = function () {
    var counter = 0;
    var stylesheet = null;
    return {
        add: function (style) {
            if (counter == 0) {
                if ((stylesheet = makeStyleTag())) {
                    injectStyles(stylesheet, style);
                    insertStyleTag(stylesheet);
                }
            }
            counter++;
        },
        remove: function () {
            counter--;
            if (!counter && stylesheet) {
                stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                stylesheet = null;
            }
        },
    };
};
exports.stylesheetSingleton = stylesheetSingleton;


/***/ }),

/***/ 1859:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignRef = void 0;
/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */
function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
    return ref;
}
exports.assignRef = assignRef;


/***/ }),

/***/ 319:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createCallbackRef = void 0;
/**
 * creates a Ref object with on change callback
 * @param callback
 * @returns {RefObject}
 *
 * @see {@link useCallbackRef}
 * @see https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
 */
function createCallbackRef(callback) {
    var current = null;
    return {
        get current() {
            return current;
        },
        set current(value) {
            var last = current;
            if (last !== value) {
                current = value;
                callback(value, last);
            }
        },
    };
}
exports.createCallbackRef = createCallbackRef;


/***/ }),

/***/ 3609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useRefToCallback = exports.refToCallback = exports.transformRef = exports.useTransformRef = exports.useMergeRefs = exports.mergeRefs = exports.createCallbackRef = exports.useCallbackRef = exports.assignRef = void 0;
var assignRef_1 = __webpack_require__(1859);
Object.defineProperty(exports, "assignRef", ({ enumerable: true, get: function () { return assignRef_1.assignRef; } }));
// callback ref
var useRef_1 = __webpack_require__(9308);
Object.defineProperty(exports, "useCallbackRef", ({ enumerable: true, get: function () { return useRef_1.useCallbackRef; } }));
var createRef_1 = __webpack_require__(319);
Object.defineProperty(exports, "createCallbackRef", ({ enumerable: true, get: function () { return createRef_1.createCallbackRef; } }));
// merge ref
var mergeRef_1 = __webpack_require__(6256);
Object.defineProperty(exports, "mergeRefs", ({ enumerable: true, get: function () { return mergeRef_1.mergeRefs; } }));
var useMergeRef_1 = __webpack_require__(233);
Object.defineProperty(exports, "useMergeRefs", ({ enumerable: true, get: function () { return useMergeRef_1.useMergeRefs; } }));
// transform ref
var useTransformRef_1 = __webpack_require__(8750);
Object.defineProperty(exports, "useTransformRef", ({ enumerable: true, get: function () { return useTransformRef_1.useTransformRef; } }));
var transformRef_1 = __webpack_require__(899);
Object.defineProperty(exports, "transformRef", ({ enumerable: true, get: function () { return transformRef_1.transformRef; } }));
// refToCallback
var refToCallback_1 = __webpack_require__(5601);
Object.defineProperty(exports, "refToCallback", ({ enumerable: true, get: function () { return refToCallback_1.refToCallback; } }));
Object.defineProperty(exports, "useRefToCallback", ({ enumerable: true, get: function () { return refToCallback_1.useRefToCallback; } }));


/***/ }),

/***/ 6256:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeRefs = void 0;
var assignRef_1 = __webpack_require__(1859);
var createRef_1 = __webpack_require__(319);
/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link useMergeRefs} to be used in ReactComponents
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = mergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function mergeRefs(refs) {
    return (0, createRef_1.createCallbackRef)(function (newValue) { return refs.forEach(function (ref) { return (0, assignRef_1.assignRef)(ref, newValue); }); });
}
exports.mergeRefs = mergeRefs;


/***/ }),

/***/ 5601:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useRefToCallback = exports.refToCallback = void 0;
/**
 * Unmemoized version of {@link useRefToCallback}
 * @see {@link useRefToCallback}
 * @param ref
 */
function refToCallback(ref) {
    return function (newValue) {
        if (typeof ref === 'function') {
            ref(newValue);
        }
        else if (ref) {
            ref.current = newValue;
        }
    };
}
exports.refToCallback = refToCallback;
var nullCallback = function () { return null; };
// lets maintain a weak ref to, well, ref :)
// not using `kashe` to keep this package small
var weakMem = new WeakMap();
var weakMemoize = function (ref) {
    var usedRef = ref || nullCallback;
    var storedRef = weakMem.get(usedRef);
    if (storedRef) {
        return storedRef;
    }
    var cb = refToCallback(usedRef);
    weakMem.set(usedRef, cb);
    return cb;
};
/**
 * Transforms a given `ref` into `callback`.
 *
 * To transform `callback` into ref use {@link useCallbackRef|useCallbackRef(undefined, callback)}
 *
 * @param {ReactRef} ref
 * @returns {Function}
 *
 * @see https://github.com/theKashey/use-callback-ref#reftocallback
 *
 * @example
 * const ref = useRef(0);
 * const setRef = useRefToCallback(ref);
 * 👉 setRef(10);
 * ✅ ref.current === 10
 */
function useRefToCallback(ref) {
    return weakMemoize(ref);
}
exports.useRefToCallback = useRefToCallback;


/***/ }),

/***/ 899:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformRef = void 0;
var assignRef_1 = __webpack_require__(1859);
var createRef_1 = __webpack_require__(319);
/**
 * Transforms one ref to another
 * @example
 * ```tsx
 * const ResizableWithRef = forwardRef((props, ref) =>
 *   <Resizable {...props} ref={transformRef(ref, i => i ? i.resizable : null)}/>
 * );
 * ```
 */
function transformRef(ref, transformer) {
    return (0, createRef_1.createCallbackRef)(function (value) { return (0, assignRef_1.assignRef)(ref, transformer(value)); });
}
exports.transformRef = transformRef;


/***/ }),

/***/ 233:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useMergeRefs = void 0;
var assignRef_1 = __webpack_require__(1859);
var useRef_1 = __webpack_require__(9308);
/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function useMergeRefs(refs, defaultValue) {
    return (0, useRef_1.useCallbackRef)(defaultValue || null, function (newValue) { return refs.forEach(function (ref) { return (0, assignRef_1.assignRef)(ref, newValue); }); });
}
exports.useMergeRefs = useMergeRefs;


/***/ }),

/***/ 9308:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useCallbackRef = void 0;
var react_1 = __webpack_require__(8038);
/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
function useCallbackRef(initialValue, callback) {
    var ref = (0, react_1.useState)(function () { return ({
        // value
        value: initialValue,
        // last callback
        callback: callback,
        // "memoized" public interface
        facade: {
            get current() {
                return ref.value;
            },
            set current(value) {
                var last = ref.value;
                if (last !== value) {
                    ref.value = value;
                    ref.callback(value, last);
                }
            },
        },
    }); })[0];
    // update callback
    ref.callback = callback;
    return ref.facade;
}
exports.useCallbackRef = useCallbackRef;


/***/ }),

/***/ 8750:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useTransformRef = void 0;
var assignRef_1 = __webpack_require__(1859);
var useRef_1 = __webpack_require__(9308);
/**
 * Create a _lense_ on Ref, making it possible to transform ref value
 * @param {ReactRef} ref
 * @param {Function} transformer. 👉 Ref would be __NOT updated__ on `transformer` update.
 * @returns {RefObject}
 *
 * @see https://github.com/theKashey/use-callback-ref#usetransformref-to-replace-reactuseimperativehandle
 * @example
 *
 * const ResizableWithRef = forwardRef((props, ref) =>
 *  <Resizable {...props} ref={useTransformRef(ref, i => i ? i.resizable : null)}/>
 * );
 */
function useTransformRef(ref, transformer) {
    return (0, useRef_1.useCallbackRef)(null, function (value) { return (0, assignRef_1.assignRef)(ref, transformer(value)); });
}
exports.useTransformRef = useTransformRef;


/***/ }),

/***/ 3164:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setConfig = exports.config = void 0;
exports.config = {
    onError: function (e) { return console.error(e); },
};
var setConfig = function (conf) {
    Object.assign(exports.config, conf);
};
exports.setConfig = setConfig;


/***/ }),

/***/ 2059:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.env = void 0;
var detect_node_es_1 = __webpack_require__(882);
exports.env = {
    isNode: detect_node_es_1.isNode,
    forceCache: false,
};


/***/ }),

/***/ 1183:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportSidecar = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var SideCar = function (_a) {
    var sideCar = _a.sideCar, rest = tslib_1.__rest(_a, ["sideCar"]);
    if (!sideCar) {
        throw new Error('Sidecar: please provide `sideCar` property to import the right car');
    }
    var Target = sideCar.read();
    if (!Target) {
        throw new Error('Sidecar medium not found');
    }
    return React.createElement(Target, tslib_1.__assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar;
}
exports.exportSidecar = exportSidecar;


/***/ }),

/***/ 3711:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sidecar = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var hook_1 = __webpack_require__(3421);
// eslint-disable-next-line @typescript-eslint/ban-types
function sidecar(importer, errorComponent) {
    var ErrorCase = function () { return errorComponent; };
    return function Sidecar(props) {
        var _a = (0, hook_1.useSidecar)(importer, props.sideCar), Car = _a[0], error = _a[1];
        if (error && errorComponent) {
            return ErrorCase;
        }
        // @ts-expect-error type shenanigans
        return Car ? React.createElement(Car, tslib_1.__assign({}, props)) : null;
    };
}
exports.sidecar = sidecar;


/***/ }),

/***/ 3421:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useSidecar = void 0;
var react_1 = __webpack_require__(8038);
var env_1 = __webpack_require__(2059);
var cache = new WeakMap();
var NO_OPTIONS = {};
function useSidecar(importer, effect) {
    var options = (effect && effect.options) || NO_OPTIONS;
    if (env_1.env.isNode && !options.ssr) {
        return [null, null];
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useRealSidecar(importer, effect);
}
exports.useSidecar = useSidecar;
function useRealSidecar(importer, effect) {
    var options = (effect && effect.options) || NO_OPTIONS;
    var couldUseCache = env_1.env.forceCache || (env_1.env.isNode && !!options.ssr) || !options.async;
    var _a = (0, react_1.useState)(couldUseCache ? function () { return cache.get(importer); } : undefined), Car = _a[0], setCar = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    (0, react_1.useEffect)(function () {
        if (!Car) {
            importer().then(function (car) {
                var resolved = effect ? effect.read() : car.default || car;
                if (!resolved) {
                    console.error('Sidecar error: with importer', importer);
                    var error_1;
                    if (effect) {
                        console.error('Sidecar error: with medium', effect);
                        error_1 = new Error('Sidecar medium was not found');
                    }
                    else {
                        error_1 = new Error('Sidecar was not found in exports');
                    }
                    setError(function () { return error_1; });
                    throw error_1;
                }
                cache.set(importer, resolved);
                setCar(function () { return resolved; });
            }, function (e) { return setError(function () { return e; }); });
        }
    }, []);
    return [Car, error];
}


/***/ }),

/***/ 8221:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportSidecar = exports.renderCar = exports.createSidecarMedium = exports.createMedium = exports.setConfig = exports.useSidecar = exports.sidecar = void 0;
var hoc_1 = __webpack_require__(3711);
Object.defineProperty(exports, "sidecar", ({ enumerable: true, get: function () { return hoc_1.sidecar; } }));
var hook_1 = __webpack_require__(3421);
Object.defineProperty(exports, "useSidecar", ({ enumerable: true, get: function () { return hook_1.useSidecar; } }));
var config_1 = __webpack_require__(3164);
Object.defineProperty(exports, "setConfig", ({ enumerable: true, get: function () { return config_1.setConfig; } }));
var medium_1 = __webpack_require__(8626);
Object.defineProperty(exports, "createMedium", ({ enumerable: true, get: function () { return medium_1.createMedium; } }));
Object.defineProperty(exports, "createSidecarMedium", ({ enumerable: true, get: function () { return medium_1.createSidecarMedium; } }));
var renderProp_1 = __webpack_require__(5919);
Object.defineProperty(exports, "renderCar", ({ enumerable: true, get: function () { return renderProp_1.renderCar; } }));
var exports_1 = __webpack_require__(1183);
Object.defineProperty(exports, "exportSidecar", ({ enumerable: true, get: function () { return exports_1.exportSidecar; } }));


/***/ }),

/***/ 8626:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSidecarMedium = exports.createMedium = void 0;
var tslib_1 = __webpack_require__(6158);
function ItoI(a) {
    return a;
}
function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    var buffer = [];
    var assigned = false;
    var medium = {
        read: function () {
            if (assigned) {
                throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
            }
            if (buffer.length) {
                return buffer[buffer.length - 1];
            }
            return defaults;
        },
        useMedium: function (data) {
            var item = middleware(data, assigned);
            buffer.push(item);
            return function () {
                buffer = buffer.filter(function (x) { return x !== item; });
            };
        },
        assignSyncMedium: function (cb) {
            assigned = true;
            while (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
            }
            buffer = {
                push: function (x) { return cb(x); },
                filter: function () { return buffer; },
            };
        },
        assignMedium: function (cb) {
            assigned = true;
            var pendingQueue = [];
            if (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
                pendingQueue = buffer;
            }
            var executeQueue = function () {
                var cbs = pendingQueue;
                pendingQueue = [];
                cbs.forEach(cb);
            };
            var cycle = function () { return Promise.resolve().then(executeQueue); };
            cycle();
            buffer = {
                push: function (x) {
                    pendingQueue.push(x);
                    cycle();
                },
                filter: function (filter) {
                    pendingQueue = pendingQueue.filter(filter);
                    return buffer;
                },
            };
        },
    };
    return medium;
}
function createMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    return innerCreateMedium(defaults, middleware);
}
exports.createMedium = createMedium;
// eslint-disable-next-line @typescript-eslint/ban-types
function createSidecarMedium(options) {
    if (options === void 0) { options = {}; }
    var medium = innerCreateMedium(null);
    medium.options = tslib_1.__assign({ async: true, ssr: false }, options);
    return medium;
}
exports.createSidecarMedium = createSidecarMedium;


/***/ }),

/***/ 5919:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderCar = void 0;
var tslib_1 = __webpack_require__(6158);
var React = tslib_1.__importStar(__webpack_require__(8038));
var react_1 = __webpack_require__(8038);
function renderCar(WrappedComponent, defaults) {
    function State(_a) {
        var stateRef = _a.stateRef, props = _a.props;
        var renderTarget = (0, react_1.useCallback)(function SideTarget() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (0, react_1.useLayoutEffect)(function () {
                stateRef.current(args);
            });
            return null;
        }, []);
        // @ts-ignore
        return React.createElement(WrappedComponent, tslib_1.__assign({}, props, { children: renderTarget }));
    }
    var Children = React.memo(function (_a) {
        var stateRef = _a.stateRef, defaultState = _a.defaultState, children = _a.children;
        var _b = (0, react_1.useState)(defaultState.current), state = _b[0], setState = _b[1];
        (0, react_1.useEffect)(function () {
            stateRef.current = setState;
        }, []);
        return children.apply(void 0, state);
    }, function () { return true; });
    return function Combiner(props) {
        var defaultState = React.useRef(defaults(props));
        var ref = React.useRef(function (state) { return (defaultState.current = state); });
        return (React.createElement(React.Fragment, null,
            React.createElement(State, { stateRef: ref, props: props }),
            React.createElement(Children, { stateRef: ref, defaultState: defaultState, children: props.children })));
    };
}
exports.renderCar = renderCar;


/***/ }),

/***/ 668:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 2840:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ $e42e1063c40fb3ef$export$b9ecd428b558ff10)
/* harmony export */ });
function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler, ourEventHandler, { checkForDefaultPrevented: checkForDefaultPrevented = true  } = {}) {
    return function handleEvent(event) {
        originalEventHandler === null || originalEventHandler === void 0 || originalEventHandler(event);
        if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
    };
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 6493:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ $e02a7d9cb1dc128c$export$c74125a8e3af6bb2)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8718);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(880);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1085);









// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(name) {
    /* -----------------------------------------------------------------------------------------------
   * CollectionProvider
   * ---------------------------------------------------------------------------------------------*/ const PROVIDER_NAME = name + 'CollectionProvider';
    const [createCollectionContext, createCollectionScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_1__/* .createContextScope */ .b)(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
        collectionRef: {
            current: null
        },
        itemMap: new Map()
    });
    const CollectionProvider = (props)=>{
        const { scope: scope , children: children  } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const itemMap = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new Map()).current;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(CollectionProviderImpl, {
            scope: scope,
            itemMap: itemMap,
            collectionRef: ref
        }, children);
    };
    /*#__PURE__*/ Object.assign(CollectionProvider, {
        displayName: PROVIDER_NAME
    });
    /* -----------------------------------------------------------------------------------------------
   * CollectionSlot
   * ---------------------------------------------------------------------------------------------*/ const COLLECTION_SLOT_NAME = name + 'CollectionSlot';
    const CollectionSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope: scope , children: children  } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__/* .useComposedRefs */ .e)(forwardedRef, context.collectionRef);
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .Slot */ .g7, {
            ref: composedRefs
        }, children);
    });
    /*#__PURE__*/ Object.assign(CollectionSlot, {
        displayName: COLLECTION_SLOT_NAME
    });
    /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * ---------------------------------------------------------------------------------------------*/ const ITEM_SLOT_NAME = name + 'CollectionItemSlot';
    const ITEM_DATA_ATTR = 'data-radix-collection-item';
    const CollectionItemSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope: scope , children: children , ...itemData } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__/* .useComposedRefs */ .e)(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
            context.itemMap.set(ref, {
                ref: ref,
                ...itemData
            });
            return ()=>void context.itemMap.delete(ref)
            ;
        });
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .Slot */ .g7, {
            [ITEM_DATA_ATTR]: '',
            ref: composedRefs
        }, children);
    });
    /*#__PURE__*/ Object.assign(CollectionItemSlot, {
        displayName: ITEM_SLOT_NAME
    });
    /* -----------------------------------------------------------------------------------------------
   * useCollection
   * ---------------------------------------------------------------------------------------------*/ function useCollection(scope) {
        const context = useCollectionContext(name + 'CollectionConsumer', scope);
        const getItems = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
            const collectionNode = context.collectionRef.current;
            if (!collectionNode) return [];
            const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
            const items = Array.from(context.itemMap.values());
            const orderedItems = items.sort((a, b)=>orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
            );
            return orderedItems;
        }, [
            context.collectionRef,
            context.itemMap
        ]);
        return getItems;
    }
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        useCollection,
        createCollectionScope
    ];
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 880:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ $6ed0406888f73fc4$export$43e446d32b3d21af),
/* harmony export */   e: () => (/* binding */ $6ed0406888f73fc4$export$c7b2cbe3552a0d05)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);



/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$var$setRef(ref, value) {
    if (typeof ref === 'function') ref(value);
    else if (ref !== null && ref !== undefined) ref.current = value;
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
    return (node)=>refs.forEach((ref)=>$6ed0406888f73fc4$var$setRef(ref, node)
        )
    ;
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)($6ed0406888f73fc4$export$43e446d32b3d21af(...refs), refs);
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 8718:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ $c512c27ab02ef895$export$50c7b4e9d9f19c1)
/* harmony export */ });
/* unused harmony export createContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);



function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
    const Context = /*#__PURE__*/ $3bkAK$createContext(defaultContext);
    function Provider(props) {
        const { children: children , ...context } = props; // Only re-memoize when prop values change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const value = $3bkAK$useMemo(()=>context
        , Object.values(context));
        return /*#__PURE__*/ $3bkAK$createElement(Context.Provider, {
            value: value
        }, children);
    }
    function useContext(consumerName) {
        const context = $3bkAK$useContext(Context);
        if (context) return context;
        if (defaultContext !== undefined) return defaultContext; // if a defaultContext wasn't specified, it's a required context.
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    Provider.displayName = rootComponentName + 'Provider';
    return [
        Provider,
        useContext
    ];
}
/* -------------------------------------------------------------------------------------------------
 * createContextScope
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    /* -----------------------------------------------------------------------------------------------
   * createContext
   * ---------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
        const BaseContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultContext);
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        function Provider(props) {
            const { scope: scope , children: children , ...context } = props;
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext; // Only re-memoize when prop values change
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>context
            , Object.values(context));
            return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Context.Provider, {
                value: value
            }, children);
        }
        function useContext(consumerName, scope) {
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext;
            const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);
            if (context) return context;
            if (defaultContext !== undefined) return defaultContext; // if a defaultContext wasn't specified, it's a required context.
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        Provider.displayName = rootComponentName + 'Provider';
        return [
            Provider,
            useContext
        ];
    }
    /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/ const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultContext);
        });
        return function useScope(scope) {
            const contexts = (scope === null || scope === void 0 ? void 0 : scope[scopeName]) || scopeContexts;
            return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
                    [`__scope${scopeName}`]: {
                        ...scope,
                        [scopeName]: contexts
                    }
                })
            , [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        $c512c27ab02ef895$export$fd42f52fd3ae1109,
        $c512c27ab02ef895$var$composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
/* -------------------------------------------------------------------------------------------------
 * composeContextScopes
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope1 = ()=>{
        const scopeHooks = scopes.map((createScope)=>({
                useScope: createScope(),
                scopeName: createScope.scopeName
            })
        );
        return function useComposedScopes(overrideScopes) {
            const nextScopes1 = scopeHooks.reduce((nextScopes, { useScope: useScope , scopeName: scopeName  })=>{
                // We are calling a hook inside a callback which React warns against to avoid inconsistent
                // renders, however, scoping doesn't have render side effects so we ignore the rule.
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes,
                    ...currentScope
                };
            }, {});
            return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
                    [`__scope${baseScope.scopeName}`]: nextScopes1
                })
            , [
                nextScopes1
            ]);
        };
    };
    createScope1.scopeName = baseScope.scopeName;
    return createScope1;
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 3994:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gm: () => (/* binding */ $f631663db3294ace$export$b39126d51d94e6f3)
/* harmony export */ });
/* unused harmony exports Provider, DirectionProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);



const $f631663db3294ace$var$DirectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
/* -------------------------------------------------------------------------------------------------
 * Direction
 * -----------------------------------------------------------------------------------------------*/ const $f631663db3294ace$export$c760c09fdd558351 = (props)=>{
    const { dir: dir , children: children  } = props;
    return /*#__PURE__*/ $7Gjcd$createElement($f631663db3294ace$var$DirectionContext.Provider, {
        value: dir
    }, children);
};
/* -----------------------------------------------------------------------------------------------*/ function $f631663db3294ace$export$b39126d51d94e6f3(localDir) {
    const globalDir = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)($f631663db3294ace$var$DirectionContext);
    return localDir || globalDir || 'ltr';
}
const $f631663db3294ace$export$2881499e37b75b9a = (/* unused pure expression or super */ null && ($f631663db3294ace$export$c760c09fdd558351));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 5393:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  XB: () => (/* binding */ $5cb92bef7577960e$export$177fb62ff3ec1f22)
});

// UNUSED EXPORTS: Branch, DismissableLayerBranch, Root

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(668);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./node_modules/@radix-ui/primitive/dist/index.mjs
var dist = __webpack_require__(2840);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-primitive/dist/index.mjs
var react_primitive_dist = __webpack_require__(3979);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(880);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var react_use_callback_ref_dist = __webpack_require__(2285);
;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs





/**
 * Listens for when the escape key is down
 */ function $addc16e1bbe58fd0$export$3a72a57244d6e765(onEscapeKeyDownProp, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
    const onEscapeKeyDown = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onEscapeKeyDownProp);
    (0,react_.useEffect)(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === 'Escape') onEscapeKeyDown(event);
        };
        ownerDocument.addEventListener('keydown', handleKeyDown);
        return ()=>ownerDocument.removeEventListener('keydown', handleKeyDown)
        ;
    }, [
        onEscapeKeyDown,
        ownerDocument
    ]);
}





//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs















/* -------------------------------------------------------------------------------------------------
 * DismissableLayer
 * -----------------------------------------------------------------------------------------------*/ const $5cb92bef7577960e$var$DISMISSABLE_LAYER_NAME = 'DismissableLayer';
const $5cb92bef7577960e$var$CONTEXT_UPDATE = 'dismissableLayer.update';
const $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside';
const $5cb92bef7577960e$var$FOCUS_OUTSIDE = 'dismissableLayer.focusOutside';
let $5cb92bef7577960e$var$originalBodyPointerEvents;
const $5cb92bef7577960e$var$DismissableLayerContext = /*#__PURE__*/ (0,react_.createContext)({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set()
});
const $5cb92bef7577960e$export$177fb62ff3ec1f22 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    var _node$ownerDocument;
    const { disableOutsidePointerEvents: disableOutsidePointerEvents = false , onEscapeKeyDown: onEscapeKeyDown , onPointerDownOutside: onPointerDownOutside , onFocusOutside: onFocusOutside , onInteractOutside: onInteractOutside , onDismiss: onDismiss , ...layerProps } = props;
    const context = (0,react_.useContext)($5cb92bef7577960e$var$DismissableLayerContext);
    const [node1, setNode] = (0,react_.useState)(null);
    const ownerDocument = (_node$ownerDocument = node1 === null || node1 === void 0 ? void 0 : node1.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : globalThis === null || globalThis === void 0 ? void 0 : globalThis.document;
    const [, force] = (0,react_.useState)({});
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, (node)=>setNode(node)
    );
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...context.layersWithOutsidePointerEventsDisabled
    ].slice(-1); // prettier-ignore
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled); // prettier-ignore
    const index = node1 ? layers.indexOf(node1) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = $5cb92bef7577960e$var$usePointerDownOutside((event)=>{
        const target = event.target;
        const isPointerDownOnBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target)
        );
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside === null || onPointerDownOutside === void 0 || onPointerDownOutside(event);
        onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss === null || onDismiss === void 0 || onDismiss();
    }, ownerDocument);
    const focusOutside = $5cb92bef7577960e$var$useFocusOutside((event)=>{
        const target = event.target;
        const isFocusInBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target)
        );
        if (isFocusInBranch) return;
        onFocusOutside === null || onFocusOutside === void 0 || onFocusOutside(event);
        onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss === null || onDismiss === void 0 || onDismiss();
    }, ownerDocument);
    $addc16e1bbe58fd0$export$3a72a57244d6e765((event)=>{
        const isHighestLayer = index === context.layers.size - 1;
        if (!isHighestLayer) return;
        onEscapeKeyDown === null || onEscapeKeyDown === void 0 || onEscapeKeyDown(event);
        if (!event.defaultPrevented && onDismiss) {
            event.preventDefault();
            onDismiss();
        }
    }, ownerDocument);
    (0,react_.useEffect)(()=>{
        if (!node1) return;
        if (disableOutsidePointerEvents) {
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
                $5cb92bef7577960e$var$originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
                ownerDocument.body.style.pointerEvents = 'none';
            }
            context.layersWithOutsidePointerEventsDisabled.add(node1);
        }
        context.layers.add(node1);
        $5cb92bef7577960e$var$dispatchUpdate();
        return ()=>{
            if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) ownerDocument.body.style.pointerEvents = $5cb92bef7577960e$var$originalBodyPointerEvents;
        };
    }, [
        node1,
        ownerDocument,
        disableOutsidePointerEvents,
        context
    ]);
    /**
   * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
   * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
   * and add it to the end again so the layering order wouldn't be _creation order_.
   * We only want them to be removed from context stacks when unmounted.
   */ (0,react_.useEffect)(()=>{
        return ()=>{
            if (!node1) return;
            context.layers.delete(node1);
            context.layersWithOutsidePointerEventsDisabled.delete(node1);
            $5cb92bef7577960e$var$dispatchUpdate();
        };
    }, [
        node1,
        context
    ]);
    (0,react_.useEffect)(()=>{
        const handleUpdate = ()=>force({})
        ;
        document.addEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate);
        return ()=>document.removeEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate)
        ;
    }, []);
    return /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({}, layerProps, {
        ref: composedRefs,
        style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? 'auto' : 'none' : undefined,
            ...props.style
        },
        onFocusCapture: (0,dist/* composeEventHandlers */.M)(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: (0,dist/* composeEventHandlers */.M)(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: (0,dist/* composeEventHandlers */.M)(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
    }));
});
/*#__PURE__*/ Object.assign($5cb92bef7577960e$export$177fb62ff3ec1f22, {
    displayName: $5cb92bef7577960e$var$DISMISSABLE_LAYER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DismissableLayerBranch
 * -----------------------------------------------------------------------------------------------*/ const $5cb92bef7577960e$var$BRANCH_NAME = 'DismissableLayerBranch';
const $5cb92bef7577960e$export$4d5eb2109db14228 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const context = (0,react_.useContext)($5cb92bef7577960e$var$DismissableLayerContext);
    const ref = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref);
    (0,react_.useEffect)(()=>{
        const node = ref.current;
        if (node) {
            context.branches.add(node);
            return ()=>{
                context.branches.delete(node);
            };
        }
    }, [
        context.branches
    ]);
    return /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({}, props, {
        ref: composedRefs
    }));
});
/*#__PURE__*/ Object.assign($5cb92bef7577960e$export$4d5eb2109db14228, {
    displayName: $5cb92bef7577960e$var$BRANCH_NAME
});
/* -----------------------------------------------------------------------------------------------*/ /**
 * Listens for `pointerdown` outside a react subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */ function $5cb92bef7577960e$var$usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
    const handlePointerDownOutside = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onPointerDownOutside);
    const isPointerInsideReactTreeRef = (0,react_.useRef)(false);
    const handleClickRef = (0,react_.useRef)(()=>{});
    (0,react_.useEffect)(()=>{
        const handlePointerDown = (event)=>{
            if (event.target && !isPointerInsideReactTreeRef.current) {
                const eventDetail = {
                    originalEvent: event
                };
                function handleAndDispatchPointerDownOutsideEvent() {
                    $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, {
                        discrete: true
                    });
                }
                /**
         * On touch devices, we need to wait for a click event because browsers implement
         * a ~350ms delay between the time the user stops touching the display and when the
         * browser executres events. We need to ensure we don't reactivate pointer-events within
         * this timeframe otherwise the browser may execute events that should have been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event
         * isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be
         * certain that it was raised, and therefore cleaned-up.
         */ if (event.pointerType === 'touch') {
                    ownerDocument.removeEventListener('click', handleClickRef.current);
                    handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
                    ownerDocument.addEventListener('click', handleClickRef.current, {
                        once: true
                    });
                } else handleAndDispatchPointerDownOutsideEvent();
            }
            isPointerInsideReactTreeRef.current = false;
        };
        /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is not React specific, but rather how the DOM works, ie:
     * ```
     * button.addEventListener('pointerdown', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerdown', () => {
     *     console.log('I will also log');
     *   })
     * });
     */ const timerId = window.setTimeout(()=>{
            ownerDocument.addEventListener('pointerdown', handlePointerDown);
        }, 0);
        return ()=>{
            window.clearTimeout(timerId);
            ownerDocument.removeEventListener('pointerdown', handlePointerDown);
            ownerDocument.removeEventListener('click', handleClickRef.current);
        };
    }, [
        ownerDocument,
        handlePointerDownOutside
    ]);
    return {
        // ensures we check React component tree (not just DOM tree)
        onPointerDownCapture: ()=>isPointerInsideReactTreeRef.current = true
    };
}
/**
 * Listens for when focus happens outside a react subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */ function $5cb92bef7577960e$var$useFocusOutside(onFocusOutside, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
    const handleFocusOutside = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onFocusOutside);
    const isFocusInsideReactTreeRef = (0,react_.useRef)(false);
    (0,react_.useEffect)(()=>{
        const handleFocus = (event)=>{
            if (event.target && !isFocusInsideReactTreeRef.current) {
                const eventDetail = {
                    originalEvent: event
                };
                $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
                    discrete: false
                });
            }
        };
        ownerDocument.addEventListener('focusin', handleFocus);
        return ()=>ownerDocument.removeEventListener('focusin', handleFocus)
        ;
    }, [
        ownerDocument,
        handleFocusOutside
    ]);
    return {
        onFocusCapture: ()=>isFocusInsideReactTreeRef.current = true
        ,
        onBlurCapture: ()=>isFocusInsideReactTreeRef.current = false
    };
}
function $5cb92bef7577960e$var$dispatchUpdate() {
    const event = new CustomEvent($5cb92bef7577960e$var$CONTEXT_UPDATE);
    document.dispatchEvent(event);
}
function $5cb92bef7577960e$var$handleAndDispatchCustomEvent(name, handler, detail, { discrete: discrete  }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, {
        bubbles: false,
        cancelable: true,
        detail: detail
    });
    if (handler) target.addEventListener(name, handler, {
        once: true
    });
    if (discrete) (0,react_primitive_dist/* dispatchDiscreteCustomEvent */.jH)(target, event);
    else target.dispatchEvent(event);
}
const $5cb92bef7577960e$export$be92b6f5f03c0fe9 = (/* unused pure expression or super */ null && ($5cb92bef7577960e$export$177fb62ff3ec1f22));
const $5cb92bef7577960e$export$aecb2ddcb55c95be = (/* unused pure expression or super */ null && ($5cb92bef7577960e$export$4d5eb2109db14228));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 3785:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  oC: () => (/* binding */ $d08ef79370b62062$export$16ce288f89fa631c),
  VY: () => (/* binding */ $d08ef79370b62062$export$7c6e2c02157bb7d2),
  ZA: () => (/* binding */ $d08ef79370b62062$export$eb2fcfdbd7ba97d4),
  ck: () => (/* binding */ $d08ef79370b62062$export$6d08773d2e66f8f2),
  wU: () => (/* binding */ $d08ef79370b62062$export$c3468e2714d175fa),
  __: () => (/* binding */ $d08ef79370b62062$export$b04be29aa201d4f5),
  Uv: () => (/* binding */ $d08ef79370b62062$export$602eac185826482c),
  Ee: () => (/* binding */ $d08ef79370b62062$export$a98f0dcb43a68a25),
  Rk: () => (/* binding */ $d08ef79370b62062$export$371ab307eab489c0),
  fC: () => (/* binding */ $d08ef79370b62062$export$be92b6f5f03c0fe9),
  Z0: () => (/* binding */ $d08ef79370b62062$export$1ff3c3f08ae963c0),
  Tr: () => (/* binding */ $d08ef79370b62062$export$d7a01e11500dfb6f),
  tu: () => (/* binding */ $d08ef79370b62062$export$6d4de93b380beddf),
  fF: () => (/* binding */ $d08ef79370b62062$export$2ea8a7a591ac5eac),
  xz: () => (/* binding */ $d08ef79370b62062$export$41fb9f06171c75f4)
});

// UNUSED EXPORTS: Arrow, DropdownMenu, DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, createDropdownMenuScope

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(668);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./node_modules/@radix-ui/primitive/dist/index.mjs
var dist = __webpack_require__(2840);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(880);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-context/dist/index.mjs
var react_context_dist = __webpack_require__(8718);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var react_use_controllable_state_dist = __webpack_require__(3408);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-primitive/dist/index.mjs
var react_primitive_dist = __webpack_require__(3979);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-collection/dist/index.mjs
var react_collection_dist = __webpack_require__(6493);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-direction/dist/index.mjs
var react_direction_dist = __webpack_require__(3994);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs + 1 modules
var react_dismissable_layer_dist = __webpack_require__(5393);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var react_focus_guards_dist = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var react_focus_scope_dist = __webpack_require__(7699);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-id/dist/index.mjs
var react_id_dist = __webpack_require__(6529);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-popper/dist/index.mjs + 7 modules
var react_popper_dist = __webpack_require__(9918);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-portal/dist/index.mjs
var react_portal_dist = __webpack_require__(3151);
// EXTERNAL MODULE: external "next/dist/compiled/react-dom/server-rendering-stub"
var server_rendering_stub_ = __webpack_require__(8704);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var react_use_layout_effect_dist = __webpack_require__(5852);
;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-presence/dist/index.mjs










function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
    return (0,react_.useReducer)((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}


const $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props)=>{
    const { present: present , children: children  } = props;
    const presence = $921a889cee6df7e8$var$usePresence(present);
    const child = typeof children === 'function' ? children({
        present: presence.isPresent
    }) : react_.Children.only(children);
    const ref = (0,react_compose_refs_dist/* useComposedRefs */.e)(presence.ref, child.ref);
    const forceMount = typeof children === 'function';
    return forceMount || presence.isPresent ? /*#__PURE__*/ (0,react_.cloneElement)(child, {
        ref: ref
    }) : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = 'Presence';
/* -------------------------------------------------------------------------------------------------
 * usePresence
 * -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$usePresence(present) {
    const [node1, setNode] = (0,react_.useState)();
    const stylesRef = (0,react_.useRef)({});
    const prevPresentRef = (0,react_.useRef)(present);
    const prevAnimationNameRef = (0,react_.useRef)('none');
    const initialState = present ? 'mounted' : 'unmounted';
    const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(initialState, {
        mounted: {
            UNMOUNT: 'unmounted',
            ANIMATION_OUT: 'unmountSuspended'
        },
        unmountSuspended: {
            MOUNT: 'mounted',
            ANIMATION_END: 'unmounted'
        },
        unmounted: {
            MOUNT: 'mounted'
        }
    });
    (0,react_.useEffect)(()=>{
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none';
    }, [
        state
    ]);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.b)(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(styles);
            if (present) send('MOUNT');
            else if (currentAnimationName === 'none' || (styles === null || styles === void 0 ? void 0 : styles.display) === 'none') // If there is no exit animation or the element is hidden, animations won't run
            // so we unmount instantly
            send('UNMOUNT');
            else {
                /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */ const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) send('ANIMATION_OUT');
                else send('UNMOUNT');
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.b)(()=>{
        if (node1) {
            /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */ const handleAnimationEnd = (event)=>{
                const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node1 && isCurrentAnimation) // With React 18 concurrency this update is applied
                // a frame after the animation ends, creating a flash of visible content.
                // By manually flushing we ensure they sync within a frame, removing the flash.
                (0,server_rendering_stub_.flushSync)(()=>send('ANIMATION_END')
                );
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node1) // if animation occurred, store its name as the previous animation.
                prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
            };
            node1.addEventListener('animationstart', handleAnimationStart);
            node1.addEventListener('animationcancel', handleAnimationEnd);
            node1.addEventListener('animationend', handleAnimationEnd);
            return ()=>{
                node1.removeEventListener('animationstart', handleAnimationStart);
                node1.removeEventListener('animationcancel', handleAnimationEnd);
                node1.removeEventListener('animationend', handleAnimationEnd);
            };
        } else // Transition to the unmounted state if the node is removed prematurely.
        // We avoid doing so during cleanup as the node may change but still exist.
        send('ANIMATION_END');
    }, [
        node1,
        send
    ]);
    return {
        isPresent: [
            'mounted',
            'unmountSuspended'
        ].includes(state),
        ref: (0,react_.useCallback)((node)=>{
            if (node) stylesRef.current = getComputedStyle(node);
            setNode(node);
        }, [])
    };
}
/* -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$getAnimationName(styles) {
    return (styles === null || styles === void 0 ? void 0 : styles.animationName) || 'none';
}





//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var react_use_callback_ref_dist = __webpack_require__(2285);
;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-roving-focus/dist/index.mjs























const $d7bdfb9eb0fdf311$var$ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';
const $d7bdfb9eb0fdf311$var$EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
/* -------------------------------------------------------------------------------------------------
 * RovingFocusGroup
 * -----------------------------------------------------------------------------------------------*/ const $d7bdfb9eb0fdf311$var$GROUP_NAME = 'RovingFocusGroup';
const [$d7bdfb9eb0fdf311$var$Collection, $d7bdfb9eb0fdf311$var$useCollection, $d7bdfb9eb0fdf311$var$createCollectionScope] = (0,react_collection_dist/* createCollection */.B)($d7bdfb9eb0fdf311$var$GROUP_NAME);
const [$d7bdfb9eb0fdf311$var$createRovingFocusGroupContext, $d7bdfb9eb0fdf311$export$c7109489551a4f4] = (0,react_context_dist/* createContextScope */.b)($d7bdfb9eb0fdf311$var$GROUP_NAME, [
    $d7bdfb9eb0fdf311$var$createCollectionScope
]);
const [$d7bdfb9eb0fdf311$var$RovingFocusProvider, $d7bdfb9eb0fdf311$var$useRovingFocusContext] = $d7bdfb9eb0fdf311$var$createRovingFocusGroupContext($d7bdfb9eb0fdf311$var$GROUP_NAME);
const $d7bdfb9eb0fdf311$export$8699f7c8af148338 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    return /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$var$Collection.Provider, {
        scope: props.__scopeRovingFocusGroup
    }, /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$var$Collection.Slot, {
        scope: props.__scopeRovingFocusGroup
    }, /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$var$RovingFocusGroupImpl, (0,esm_extends/* default */.Z)({}, props, {
        ref: forwardedRef
    }))));
});
/*#__PURE__*/ Object.assign($d7bdfb9eb0fdf311$export$8699f7c8af148338, {
    displayName: $d7bdfb9eb0fdf311$var$GROUP_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $d7bdfb9eb0fdf311$var$RovingFocusGroupImpl = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup: __scopeRovingFocusGroup , orientation: orientation , loop: loop = false , dir: dir , currentTabStopId: currentTabStopIdProp , defaultCurrentTabStopId: defaultCurrentTabStopId , onCurrentTabStopIdChange: onCurrentTabStopIdChange , onEntryFocus: onEntryFocus , ...groupProps } = props;
    const ref = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref);
    const direction = (0,react_direction_dist/* useDirection */.gm)(dir);
    const [currentTabStopId = null, setCurrentTabStopId] = (0,react_use_controllable_state_dist/* useControllableState */.T)({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId,
        onChange: onCurrentTabStopIdChange
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = (0,react_.useState)(false);
    const handleEntryFocus = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onEntryFocus);
    const getItems = $d7bdfb9eb0fdf311$var$useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = (0,react_.useRef)(false);
    const [focusableItemsCount, setFocusableItemsCount] = (0,react_.useState)(0);
    (0,react_.useEffect)(()=>{
        const node = ref.current;
        if (node) {
            node.addEventListener($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, handleEntryFocus);
            return ()=>node.removeEventListener($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, handleEntryFocus)
            ;
        }
    }, [
        handleEntryFocus
    ]);
    return /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$var$RovingFocusProvider, {
        scope: __scopeRovingFocusGroup,
        orientation: orientation,
        dir: direction,
        loop: loop,
        currentTabStopId: currentTabStopId,
        onItemFocus: (0,react_.useCallback)((tabStopId)=>setCurrentTabStopId(tabStopId)
        , [
            setCurrentTabStopId
        ]),
        onItemShiftTab: (0,react_.useCallback)(()=>setIsTabbingBackOut(true)
        , []),
        onFocusableItemAdd: (0,react_.useCallback)(()=>setFocusableItemsCount((prevCount)=>prevCount + 1
            )
        , []),
        onFocusableItemRemove: (0,react_.useCallback)(()=>setFocusableItemsCount((prevCount)=>prevCount - 1
            )
        , [])
    }, /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({
        tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
        "data-orientation": orientation
    }, groupProps, {
        ref: composedRefs,
        style: {
            outline: 'none',
            ...props.style
        },
        onMouseDown: (0,dist/* composeEventHandlers */.M)(props.onMouseDown, ()=>{
            isClickFocusRef.current = true;
        }),
        onFocus: (0,dist/* composeEventHandlers */.M)(props.onFocus, (event)=>{
            // We normally wouldn't need this check, because we already check
            // that the focus is on the current target and not bubbling to it.
            // We do this because Safari doesn't focus buttons when clicked, and
            // instead, the wrapper will get focused and not through a bubbling event.
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                const entryFocusEvent = new CustomEvent($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, $d7bdfb9eb0fdf311$var$EVENT_OPTIONS);
                event.currentTarget.dispatchEvent(entryFocusEvent);
                if (!entryFocusEvent.defaultPrevented) {
                    const items = getItems().filter((item)=>item.focusable
                    );
                    const activeItem = items.find((item)=>item.active
                    );
                    const currentItem = items.find((item)=>item.id === currentTabStopId
                    );
                    const candidateItems = [
                        activeItem,
                        currentItem,
                        ...items
                    ].filter(Boolean);
                    const candidateNodes = candidateItems.map((item)=>item.ref.current
                    );
                    $d7bdfb9eb0fdf311$var$focusFirst(candidateNodes);
                }
            }
            isClickFocusRef.current = false;
        }),
        onBlur: (0,dist/* composeEventHandlers */.M)(props.onBlur, ()=>setIsTabbingBackOut(false)
        )
    })));
});
/* -------------------------------------------------------------------------------------------------
 * RovingFocusGroupItem
 * -----------------------------------------------------------------------------------------------*/ const $d7bdfb9eb0fdf311$var$ITEM_NAME = 'RovingFocusGroupItem';
const $d7bdfb9eb0fdf311$export$ab9df7c53fe8454 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup: __scopeRovingFocusGroup , focusable: focusable = true , active: active = false , tabStopId: tabStopId , ...itemProps } = props;
    const autoId = (0,react_id_dist/* useId */.M)();
    const id = tabStopId || autoId;
    const context = $d7bdfb9eb0fdf311$var$useRovingFocusContext($d7bdfb9eb0fdf311$var$ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = $d7bdfb9eb0fdf311$var$useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd: onFocusableItemAdd , onFocusableItemRemove: onFocusableItemRemove  } = context;
    (0,react_.useEffect)(()=>{
        if (focusable) {
            onFocusableItemAdd();
            return ()=>onFocusableItemRemove()
            ;
        }
    }, [
        focusable,
        onFocusableItemAdd,
        onFocusableItemRemove
    ]);
    return /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$var$Collection.ItemSlot, {
        scope: __scopeRovingFocusGroup,
        id: id,
        focusable: focusable,
        active: active
    }, /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.span, (0,esm_extends/* default */.Z)({
        tabIndex: isCurrentTabStop ? 0 : -1,
        "data-orientation": context.orientation
    }, itemProps, {
        ref: forwardedRef,
        onMouseDown: (0,dist/* composeEventHandlers */.M)(props.onMouseDown, (event)=>{
            // We prevent focusing non-focusable items on `mousedown`.
            // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
            if (!focusable) event.preventDefault(); // Safari doesn't focus a button when clicked so we run our logic on mousedown also
            else context.onItemFocus(id);
        }),
        onFocus: (0,dist/* composeEventHandlers */.M)(props.onFocus, ()=>context.onItemFocus(id)
        ),
        onKeyDown: (0,dist/* composeEventHandlers */.M)(props.onKeyDown, (event)=>{
            if (event.key === 'Tab' && event.shiftKey) {
                context.onItemShiftTab();
                return;
            }
            if (event.target !== event.currentTarget) return;
            const focusIntent = $d7bdfb9eb0fdf311$var$getFocusIntent(event, context.orientation, context.dir);
            if (focusIntent !== undefined) {
                event.preventDefault();
                const items = getItems().filter((item)=>item.focusable
                );
                let candidateNodes = items.map((item)=>item.ref.current
                );
                if (focusIntent === 'last') candidateNodes.reverse();
                else if (focusIntent === 'prev' || focusIntent === 'next') {
                    if (focusIntent === 'prev') candidateNodes.reverse();
                    const currentIndex = candidateNodes.indexOf(event.currentTarget);
                    candidateNodes = context.loop ? $d7bdfb9eb0fdf311$var$wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                /**
         * Imperative focus during keydown is risky so we prevent React's batching updates
         * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
         */ setTimeout(()=>$d7bdfb9eb0fdf311$var$focusFirst(candidateNodes)
                );
            }
        })
    })));
});
/*#__PURE__*/ Object.assign($d7bdfb9eb0fdf311$export$ab9df7c53fe8454, {
    displayName: $d7bdfb9eb0fdf311$var$ITEM_NAME
});
/* -----------------------------------------------------------------------------------------------*/ // prettier-ignore
const $d7bdfb9eb0fdf311$var$MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: 'prev',
    ArrowUp: 'prev',
    ArrowRight: 'next',
    ArrowDown: 'next',
    PageUp: 'first',
    Home: 'first',
    PageDown: 'last',
    End: 'last'
};
function $d7bdfb9eb0fdf311$var$getDirectionAwareKey(key, dir) {
    if (dir !== 'rtl') return key;
    return key === 'ArrowLeft' ? 'ArrowRight' : key === 'ArrowRight' ? 'ArrowLeft' : key;
}
function $d7bdfb9eb0fdf311$var$getFocusIntent(event, orientation, dir) {
    const key = $d7bdfb9eb0fdf311$var$getDirectionAwareKey(event.key, dir);
    if (orientation === 'vertical' && [
        'ArrowLeft',
        'ArrowRight'
    ].includes(key)) return undefined;
    if (orientation === 'horizontal' && [
        'ArrowUp',
        'ArrowDown'
    ].includes(key)) return undefined;
    return $d7bdfb9eb0fdf311$var$MAP_KEY_TO_FOCUS_INTENT[key];
}
function $d7bdfb9eb0fdf311$var$focusFirst(candidates) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        // if focus is already where we want to go, we don't want to keep going through the candidates
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus();
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */ function $d7bdfb9eb0fdf311$var$wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]
    );
}
const $d7bdfb9eb0fdf311$export$be92b6f5f03c0fe9 = $d7bdfb9eb0fdf311$export$8699f7c8af148338;
const $d7bdfb9eb0fdf311$export$6d08773d2e66f8f2 = $d7bdfb9eb0fdf311$export$ab9df7c53fe8454;





//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-slot/dist/index.mjs
var react_slot_dist = __webpack_require__(1085);
// EXTERNAL MODULE: ./node_modules/aria-hidden/dist/es5/index.js
var es5 = __webpack_require__(4348);
// EXTERNAL MODULE: ./node_modules/react-remove-scroll/dist/es5/index.js
var dist_es5 = __webpack_require__(2864);
;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-menu/dist/index.mjs











































const $6cc32821e9371a1c$var$SELECTION_KEYS = [
    'Enter',
    ' '
];
const $6cc32821e9371a1c$var$FIRST_KEYS = [
    'ArrowDown',
    'PageUp',
    'Home'
];
const $6cc32821e9371a1c$var$LAST_KEYS = [
    'ArrowUp',
    'PageDown',
    'End'
];
const $6cc32821e9371a1c$var$FIRST_LAST_KEYS = [
    ...$6cc32821e9371a1c$var$FIRST_KEYS,
    ...$6cc32821e9371a1c$var$LAST_KEYS
];
const $6cc32821e9371a1c$var$SUB_OPEN_KEYS = {
    ltr: [
        ...$6cc32821e9371a1c$var$SELECTION_KEYS,
        'ArrowRight'
    ],
    rtl: [
        ...$6cc32821e9371a1c$var$SELECTION_KEYS,
        'ArrowLeft'
    ]
};
const $6cc32821e9371a1c$var$SUB_CLOSE_KEYS = {
    ltr: [
        'ArrowLeft'
    ],
    rtl: [
        'ArrowRight'
    ]
};
/* -------------------------------------------------------------------------------------------------
 * Menu
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$MENU_NAME = 'Menu';
const [$6cc32821e9371a1c$var$Collection, $6cc32821e9371a1c$var$useCollection, $6cc32821e9371a1c$var$createCollectionScope] = (0,react_collection_dist/* createCollection */.B)($6cc32821e9371a1c$var$MENU_NAME);
const [$6cc32821e9371a1c$var$createMenuContext, $6cc32821e9371a1c$export$4027731b685e72eb] = (0,react_context_dist/* createContextScope */.b)($6cc32821e9371a1c$var$MENU_NAME, [
    $6cc32821e9371a1c$var$createCollectionScope,
    react_popper_dist/* createPopperScope */.D7,
    $d7bdfb9eb0fdf311$export$c7109489551a4f4
]);
const $6cc32821e9371a1c$var$usePopperScope = (0,react_popper_dist/* createPopperScope */.D7)();
const $6cc32821e9371a1c$var$useRovingFocusGroupScope = $d7bdfb9eb0fdf311$export$c7109489551a4f4();
const [$6cc32821e9371a1c$var$MenuProvider, $6cc32821e9371a1c$var$useMenuContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$MENU_NAME);
const [$6cc32821e9371a1c$var$MenuRootProvider, $6cc32821e9371a1c$var$useMenuRootContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$MENU_NAME);
const $6cc32821e9371a1c$export$d9b273488cd8ce6f = (props)=>{
    const { __scopeMenu: __scopeMenu , open: open = false , children: children , dir: dir , onOpenChange: onOpenChange , modal: modal = true  } = props;
    const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
    const [content, setContent] = (0,react_.useState)(null);
    const isUsingKeyboardRef = (0,react_.useRef)(false);
    const handleOpenChange = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onOpenChange);
    const direction = (0,react_direction_dist/* useDirection */.gm)(dir);
    (0,react_.useEffect)(()=>{
        // Capture phase ensures we set the boolean before any side effects execute
        // in response to the key or pointer event as they might depend on this value.
        const handleKeyDown = ()=>{
            isUsingKeyboardRef.current = true;
            document.addEventListener('pointerdown', handlePointer, {
                capture: true,
                once: true
            });
            document.addEventListener('pointermove', handlePointer, {
                capture: true,
                once: true
            });
        };
        const handlePointer = ()=>isUsingKeyboardRef.current = false
        ;
        document.addEventListener('keydown', handleKeyDown, {
            capture: true
        });
        return ()=>{
            document.removeEventListener('keydown', handleKeyDown, {
                capture: true
            });
            document.removeEventListener('pointerdown', handlePointer, {
                capture: true
            });
            document.removeEventListener('pointermove', handlePointer, {
                capture: true
            });
        };
    }, []);
    return /*#__PURE__*/ (0,react_.createElement)(react_popper_dist/* Root */.fC, popperScope, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuProvider, {
        scope: __scopeMenu,
        open: open,
        onOpenChange: handleOpenChange,
        content: content,
        onContentChange: setContent
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuRootProvider, {
        scope: __scopeMenu,
        onClose: (0,react_.useCallback)(()=>handleOpenChange(false)
        , [
            handleOpenChange
        ]),
        isUsingKeyboardRef: isUsingKeyboardRef,
        dir: direction,
        modal: modal
    }, children)));
};
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$d9b273488cd8ce6f, {
    displayName: $6cc32821e9371a1c$var$MENU_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuAnchor
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$ANCHOR_NAME = 'MenuAnchor';
const $6cc32821e9371a1c$export$9fa5ebd18bee4d43 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , ...anchorProps } = props;
    const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
    return /*#__PURE__*/ (0,react_.createElement)(react_popper_dist/* Anchor */.ee, (0,esm_extends/* default */.Z)({}, popperScope, anchorProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$9fa5ebd18bee4d43, {
    displayName: $6cc32821e9371a1c$var$ANCHOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuPortal
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$PORTAL_NAME = 'MenuPortal';
const [$6cc32821e9371a1c$var$PortalProvider, $6cc32821e9371a1c$var$usePortalContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$PORTAL_NAME, {
    forceMount: undefined
});
const $6cc32821e9371a1c$export$793392f970497feb = (props)=>{
    const { __scopeMenu: __scopeMenu , forceMount: forceMount , children: children , container: container  } = props;
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$PORTAL_NAME, __scopeMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$PortalProvider, {
        scope: __scopeMenu,
        forceMount: forceMount
    }, /*#__PURE__*/ (0,react_.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || context.open
    }, /*#__PURE__*/ (0,react_.createElement)(react_portal_dist/* Portal */.h, {
        asChild: true,
        container: container
    }, children)));
};
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$793392f970497feb, {
    displayName: $6cc32821e9371a1c$var$PORTAL_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$CONTENT_NAME = 'MenuContent';
const [$6cc32821e9371a1c$var$MenuContentProvider, $6cc32821e9371a1c$var$useMenuContentContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$CONTENT_NAME);
const $6cc32821e9371a1c$export$479f0f2f71193efe = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const portalContext = $6cc32821e9371a1c$var$usePortalContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    const { forceMount: forceMount = portalContext.forceMount , ...contentProps } = props;
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$Collection.Provider, {
        scope: props.__scopeMenu
    }, /*#__PURE__*/ (0,react_.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || context.open
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$Collection.Slot, {
        scope: props.__scopeMenu
    }, rootContext.modal ? /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuRootContentModal, (0,esm_extends/* default */.Z)({}, contentProps, {
        ref: forwardedRef
    })) : /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuRootContentNonModal, (0,esm_extends/* default */.Z)({}, contentProps, {
        ref: forwardedRef
    })))));
});
/* ---------------------------------------------------------------------------------------------- */ const $6cc32821e9371a1c$var$MenuRootContentModal = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    const ref = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref); // Hide everything from ARIA except the `MenuContent`
    (0,react_.useEffect)(()=>{
        const content = ref.current;
        if (content) return (0,es5/* hideOthers */.Ry)(content);
    }, []);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuContentImpl, (0,esm_extends/* default */.Z)({}, props, {
        ref: composedRefs // we make sure we're not trapping once it's been closed
        ,
        trapFocus: context.open // make sure to only disable pointer events when open
        ,
        disableOutsidePointerEvents: context.open,
        disableOutsideScroll: true // When focus is trapped, a `focusout` event may still happen.
        ,
        onFocusOutside: (0,dist/* composeEventHandlers */.M)(props.onFocusOutside, (event)=>event.preventDefault()
        , {
            checkForDefaultPrevented: false
        }),
        onDismiss: ()=>context.onOpenChange(false)
    }));
});
const $6cc32821e9371a1c$var$MenuRootContentNonModal = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuContentImpl, (0,esm_extends/* default */.Z)({}, props, {
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        onDismiss: ()=>context.onOpenChange(false)
    }));
});
/* ---------------------------------------------------------------------------------------------- */ const $6cc32821e9371a1c$var$MenuContentImpl = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , loop: loop = false , trapFocus: trapFocus , onOpenAutoFocus: onOpenAutoFocus , onCloseAutoFocus: onCloseAutoFocus , disableOutsidePointerEvents: disableOutsidePointerEvents , onEntryFocus: onEntryFocus , onEscapeKeyDown: onEscapeKeyDown , onPointerDownOutside: onPointerDownOutside , onFocusOutside: onFocusOutside , onInteractOutside: onInteractOutside , onDismiss: onDismiss , disableOutsideScroll: disableOutsideScroll , ...contentProps } = props;
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, __scopeMenu);
    const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$CONTENT_NAME, __scopeMenu);
    const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
    const rovingFocusGroupScope = $6cc32821e9371a1c$var$useRovingFocusGroupScope(__scopeMenu);
    const getItems = $6cc32821e9371a1c$var$useCollection(__scopeMenu);
    const [currentItemId, setCurrentItemId] = (0,react_.useState)(null);
    const contentRef = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, contentRef, context.onContentChange);
    const timerRef = (0,react_.useRef)(0);
    const searchRef = (0,react_.useRef)('');
    const pointerGraceTimerRef = (0,react_.useRef)(0);
    const pointerGraceIntentRef = (0,react_.useRef)(null);
    const pointerDirRef = (0,react_.useRef)('right');
    const lastPointerXRef = (0,react_.useRef)(0);
    const ScrollLockWrapper = disableOutsideScroll ? dist_es5/* RemoveScroll */.f : react_.Fragment;
    const scrollLockWrapperProps = disableOutsideScroll ? {
        as: react_slot_dist/* Slot */.g7,
        allowPinchZoom: true
    } : undefined;
    const handleTypeaheadSearch = (key)=>{
        var _items$find, _items$find2;
        const search = searchRef.current + key;
        const items = getItems().filter((item)=>!item.disabled
        );
        const currentItem = document.activeElement;
        const currentMatch = (_items$find = items.find((item)=>item.ref.current === currentItem
        )) === null || _items$find === void 0 ? void 0 : _items$find.textValue;
        const values = items.map((item)=>item.textValue
        );
        const nextMatch = $6cc32821e9371a1c$var$getNextMatch(values, search, currentMatch);
        const newItem = (_items$find2 = items.find((item)=>item.textValue === nextMatch
        )) === null || _items$find2 === void 0 ? void 0 : _items$find2.ref.current; // Reset `searchRef` 1 second after it was last updated
        (function updateSearch(value) {
            searchRef.current = value;
            window.clearTimeout(timerRef.current);
            if (value !== '') timerRef.current = window.setTimeout(()=>updateSearch('')
            , 1000);
        })(search);
        if (newItem) /**
       * Imperative focus during keydown is risky so we prevent React's batching updates
       * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
       */ setTimeout(()=>newItem.focus()
        );
    };
    (0,react_.useEffect)(()=>{
        return ()=>window.clearTimeout(timerRef.current)
        ;
    }, []); // Make sure the whole tree has focus guards as our `MenuContent` may be
    // the last element in the DOM (beacuse of the `Portal`)
    (0,react_focus_guards_dist/* useFocusGuards */.EW)();
    const isPointerMovingToSubmenu = (0,react_.useCallback)((event)=>{
        var _pointerGraceIntentRe, _pointerGraceIntentRe2;
        const isMovingTowards = pointerDirRef.current === ((_pointerGraceIntentRe = pointerGraceIntentRef.current) === null || _pointerGraceIntentRe === void 0 ? void 0 : _pointerGraceIntentRe.side);
        return isMovingTowards && $6cc32821e9371a1c$var$isPointerInGraceArea(event, (_pointerGraceIntentRe2 = pointerGraceIntentRef.current) === null || _pointerGraceIntentRe2 === void 0 ? void 0 : _pointerGraceIntentRe2.area);
    }, []);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuContentProvider, {
        scope: __scopeMenu,
        searchRef: searchRef,
        onItemEnter: (0,react_.useCallback)((event)=>{
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
        }, [
            isPointerMovingToSubmenu
        ]),
        onItemLeave: (0,react_.useCallback)((event)=>{
            var _contentRef$current;
            if (isPointerMovingToSubmenu(event)) return;
            (_contentRef$current = contentRef.current) === null || _contentRef$current === void 0 || _contentRef$current.focus();
            setCurrentItemId(null);
        }, [
            isPointerMovingToSubmenu
        ]),
        onTriggerLeave: (0,react_.useCallback)((event)=>{
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
        }, [
            isPointerMovingToSubmenu
        ]),
        pointerGraceTimerRef: pointerGraceTimerRef,
        onPointerGraceIntentChange: (0,react_.useCallback)((intent)=>{
            pointerGraceIntentRef.current = intent;
        }, [])
    }, /*#__PURE__*/ (0,react_.createElement)(ScrollLockWrapper, scrollLockWrapperProps, /*#__PURE__*/ (0,react_.createElement)(react_focus_scope_dist/* FocusScope */.M, {
        asChild: true,
        trapped: trapFocus,
        onMountAutoFocus: (0,dist/* composeEventHandlers */.M)(onOpenAutoFocus, (event)=>{
            var _contentRef$current2;
            // when opening, explicitly focus the content area only and leave
            // `onEntryFocus` in  control of focusing first item
            event.preventDefault();
            (_contentRef$current2 = contentRef.current) === null || _contentRef$current2 === void 0 || _contentRef$current2.focus();
        }),
        onUnmountAutoFocus: onCloseAutoFocus
    }, /*#__PURE__*/ (0,react_.createElement)(react_dismissable_layer_dist/* DismissableLayer */.XB, {
        asChild: true,
        disableOutsidePointerEvents: disableOutsidePointerEvents,
        onEscapeKeyDown: onEscapeKeyDown,
        onPointerDownOutside: onPointerDownOutside,
        onFocusOutside: onFocusOutside,
        onInteractOutside: onInteractOutside,
        onDismiss: onDismiss
    }, /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$export$be92b6f5f03c0fe9, (0,esm_extends/* default */.Z)({
        asChild: true
    }, rovingFocusGroupScope, {
        dir: rootContext.dir,
        orientation: "vertical",
        loop: loop,
        currentTabStopId: currentItemId,
        onCurrentTabStopIdChange: setCurrentItemId,
        onEntryFocus: (0,dist/* composeEventHandlers */.M)(onEntryFocus, (event)=>{
            // only focus first item when using keyboard
            if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
        })
    }), /*#__PURE__*/ (0,react_.createElement)(react_popper_dist/* Content */.VY, (0,esm_extends/* default */.Z)({
        role: "menu",
        "aria-orientation": "vertical",
        "data-state": $6cc32821e9371a1c$var$getOpenState(context.open),
        "data-radix-menu-content": "",
        dir: rootContext.dir
    }, popperScope, contentProps, {
        ref: composedRefs,
        style: {
            outline: 'none',
            ...contentProps.style
        },
        onKeyDown: (0,dist/* composeEventHandlers */.M)(contentProps.onKeyDown, (event)=>{
            // submenu key events bubble through portals. We only care about keys in this menu.
            const target = event.target;
            const isKeyDownInside = target.closest('[data-radix-menu-content]') === event.currentTarget;
            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
            const isCharacterKey = event.key.length === 1;
            if (isKeyDownInside) {
                // menus should not be navigated using tab key so we prevent it
                if (event.key === 'Tab') event.preventDefault();
                if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
            } // focus first/last item based on key pressed
            const content = contentRef.current;
            if (event.target !== content) return;
            if (!$6cc32821e9371a1c$var$FIRST_LAST_KEYS.includes(event.key)) return;
            event.preventDefault();
            const items = getItems().filter((item)=>!item.disabled
            );
            const candidateNodes = items.map((item)=>item.ref.current
            );
            if ($6cc32821e9371a1c$var$LAST_KEYS.includes(event.key)) candidateNodes.reverse();
            $6cc32821e9371a1c$var$focusFirst(candidateNodes);
        }),
        onBlur: (0,dist/* composeEventHandlers */.M)(props.onBlur, (event)=>{
            // clear search buffer when leaving the menu
            if (!event.currentTarget.contains(event.target)) {
                window.clearTimeout(timerRef.current);
                searchRef.current = '';
            }
        }),
        onPointerMove: (0,dist/* composeEventHandlers */.M)(props.onPointerMove, $6cc32821e9371a1c$var$whenMouse((event)=>{
            const target = event.target;
            const pointerXHasChanged = lastPointerXRef.current !== event.clientX; // We don't use `event.movementX` for this check because Safari will
            // always return `0` on a pointer event.
            if (event.currentTarget.contains(target) && pointerXHasChanged) {
                const newDir = event.clientX > lastPointerXRef.current ? 'right' : 'left';
                pointerDirRef.current = newDir;
                lastPointerXRef.current = event.clientX;
            }
        }))
    })))))));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$479f0f2f71193efe, {
    displayName: $6cc32821e9371a1c$var$CONTENT_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuGroup
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$GROUP_NAME = 'MenuGroup';
const $6cc32821e9371a1c$export$22a631d1f72787bb = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , ...groupProps } = props;
    return /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({
        role: "group"
    }, groupProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$22a631d1f72787bb, {
    displayName: $6cc32821e9371a1c$var$GROUP_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuLabel
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$LABEL_NAME = 'MenuLabel';
const $6cc32821e9371a1c$export$dd37bec0e8a99143 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , ...labelProps } = props;
    return /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({}, labelProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$dd37bec0e8a99143, {
    displayName: $6cc32821e9371a1c$var$LABEL_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuItem
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$ITEM_NAME = 'MenuItem';
const $6cc32821e9371a1c$var$ITEM_SELECT = 'menu.itemSelect';
const $6cc32821e9371a1c$export$2ce376c2cc3355c8 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { disabled: disabled = false , onSelect: onSelect , ...itemProps } = props;
    const ref = (0,react_.useRef)(null);
    const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$ITEM_NAME, props.__scopeMenu);
    const contentContext = $6cc32821e9371a1c$var$useMenuContentContext($6cc32821e9371a1c$var$ITEM_NAME, props.__scopeMenu);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref);
    const isPointerDownRef = (0,react_.useRef)(false);
    const handleSelect = ()=>{
        const menuItem = ref.current;
        if (!disabled && menuItem) {
            const itemSelectEvent = new CustomEvent($6cc32821e9371a1c$var$ITEM_SELECT, {
                bubbles: true,
                cancelable: true
            });
            menuItem.addEventListener($6cc32821e9371a1c$var$ITEM_SELECT, (event)=>onSelect === null || onSelect === void 0 ? void 0 : onSelect(event)
            , {
                once: true
            });
            (0,react_primitive_dist/* dispatchDiscreteCustomEvent */.jH)(menuItem, itemSelectEvent);
            if (itemSelectEvent.defaultPrevented) isPointerDownRef.current = false;
            else rootContext.onClose();
        }
    };
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuItemImpl, (0,esm_extends/* default */.Z)({}, itemProps, {
        ref: composedRefs,
        disabled: disabled,
        onClick: (0,dist/* composeEventHandlers */.M)(props.onClick, handleSelect),
        onPointerDown: (event)=>{
            var _props$onPointerDown;
            (_props$onPointerDown = props.onPointerDown) === null || _props$onPointerDown === void 0 || _props$onPointerDown.call(props, event);
            isPointerDownRef.current = true;
        },
        onPointerUp: (0,dist/* composeEventHandlers */.M)(props.onPointerUp, (event)=>{
            var _event$currentTarget;
            // Pointer down can move to a different menu item which should activate it on pointer up.
            // We dispatch a click for selection to allow composition with click based triggers and to
            // prevent Firefox from getting stuck in text selection mode when the menu closes.
            if (!isPointerDownRef.current) (_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 || _event$currentTarget.click();
        }),
        onKeyDown: (0,dist/* composeEventHandlers */.M)(props.onKeyDown, (event)=>{
            const isTypingAhead = contentContext.searchRef.current !== '';
            if (disabled || isTypingAhead && event.key === ' ') return;
            if ($6cc32821e9371a1c$var$SELECTION_KEYS.includes(event.key)) {
                event.currentTarget.click();
                /**
         * We prevent default browser behaviour for selection keys as they should trigger
         * a selection only:
         * - prevents space from scrolling the page.
         * - if keydown causes focus to move, prevents keydown from firing on the new target.
         */ event.preventDefault();
            }
        })
    }));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$2ce376c2cc3355c8, {
    displayName: $6cc32821e9371a1c$var$ITEM_NAME
});
/* ---------------------------------------------------------------------------------------------- */ const $6cc32821e9371a1c$var$MenuItemImpl = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , disabled: disabled = false , textValue: textValue , ...itemProps } = props;
    const contentContext = $6cc32821e9371a1c$var$useMenuContentContext($6cc32821e9371a1c$var$ITEM_NAME, __scopeMenu);
    const rovingFocusGroupScope = $6cc32821e9371a1c$var$useRovingFocusGroupScope(__scopeMenu);
    const ref = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref);
    const [isFocused, setIsFocused] = (0,react_.useState)(false); // get the item's `.textContent` as default strategy for typeahead `textValue`
    const [textContent, setTextContent] = (0,react_.useState)('');
    (0,react_.useEffect)(()=>{
        const menuItem = ref.current;
        if (menuItem) {
            var _menuItem$textContent;
            setTextContent(((_menuItem$textContent = menuItem.textContent) !== null && _menuItem$textContent !== void 0 ? _menuItem$textContent : '').trim());
        }
    }, [
        itemProps.children
    ]);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$Collection.ItemSlot, {
        scope: __scopeMenu,
        disabled: disabled,
        textValue: textValue !== null && textValue !== void 0 ? textValue : textContent
    }, /*#__PURE__*/ (0,react_.createElement)($d7bdfb9eb0fdf311$export$6d08773d2e66f8f2, (0,esm_extends/* default */.Z)({
        asChild: true
    }, rovingFocusGroupScope, {
        focusable: !disabled
    }), /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({
        role: "menuitem",
        "data-highlighted": isFocused ? '' : undefined,
        "aria-disabled": disabled || undefined,
        "data-disabled": disabled ? '' : undefined
    }, itemProps, {
        ref: composedRefs,
        onPointerMove: (0,dist/* composeEventHandlers */.M)(props.onPointerMove, $6cc32821e9371a1c$var$whenMouse((event)=>{
            if (disabled) contentContext.onItemLeave(event);
            else {
                contentContext.onItemEnter(event);
                if (!event.defaultPrevented) {
                    const item = event.currentTarget;
                    item.focus();
                }
            }
        })),
        onPointerLeave: (0,dist/* composeEventHandlers */.M)(props.onPointerLeave, $6cc32821e9371a1c$var$whenMouse((event)=>contentContext.onItemLeave(event)
        )),
        onFocus: (0,dist/* composeEventHandlers */.M)(props.onFocus, ()=>setIsFocused(true)
        ),
        onBlur: (0,dist/* composeEventHandlers */.M)(props.onBlur, ()=>setIsFocused(false)
        )
    }))));
});
/* -------------------------------------------------------------------------------------------------
 * MenuCheckboxItem
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$CHECKBOX_ITEM_NAME = 'MenuCheckboxItem';
const $6cc32821e9371a1c$export$f6f243521332502d = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { checked: checked = false , onCheckedChange: onCheckedChange , ...checkboxItemProps } = props;
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$ItemIndicatorProvider, {
        scope: props.__scopeMenu,
        checked: checked
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$2ce376c2cc3355c8, (0,esm_extends/* default */.Z)({
        role: "menuitemcheckbox",
        "aria-checked": $6cc32821e9371a1c$var$isIndeterminate(checked) ? 'mixed' : checked
    }, checkboxItemProps, {
        ref: forwardedRef,
        "data-state": $6cc32821e9371a1c$var$getCheckedState(checked),
        onSelect: (0,dist/* composeEventHandlers */.M)(checkboxItemProps.onSelect, ()=>onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange($6cc32821e9371a1c$var$isIndeterminate(checked) ? true : !checked)
        , {
            checkForDefaultPrevented: false
        })
    })));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$f6f243521332502d, {
    displayName: $6cc32821e9371a1c$var$CHECKBOX_ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuRadioGroup
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$RADIO_GROUP_NAME = 'MenuRadioGroup';
const [$6cc32821e9371a1c$var$RadioGroupProvider, $6cc32821e9371a1c$var$useRadioGroupContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$RADIO_GROUP_NAME, {
    value: undefined,
    onValueChange: ()=>{}
});
const $6cc32821e9371a1c$export$ea2200c9eee416b3 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { value: value , onValueChange: onValueChange , ...groupProps } = props;
    const handleValueChange = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onValueChange);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$RadioGroupProvider, {
        scope: props.__scopeMenu,
        value: value,
        onValueChange: handleValueChange
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$22a631d1f72787bb, (0,esm_extends/* default */.Z)({}, groupProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$ea2200c9eee416b3, {
    displayName: $6cc32821e9371a1c$var$RADIO_GROUP_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuRadioItem
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$RADIO_ITEM_NAME = 'MenuRadioItem';
const $6cc32821e9371a1c$export$69bd225e9817f6d0 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { value: value , ...radioItemProps } = props;
    const context = $6cc32821e9371a1c$var$useRadioGroupContext($6cc32821e9371a1c$var$RADIO_ITEM_NAME, props.__scopeMenu);
    const checked = value === context.value;
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$ItemIndicatorProvider, {
        scope: props.__scopeMenu,
        checked: checked
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$2ce376c2cc3355c8, (0,esm_extends/* default */.Z)({
        role: "menuitemradio",
        "aria-checked": checked
    }, radioItemProps, {
        ref: forwardedRef,
        "data-state": $6cc32821e9371a1c$var$getCheckedState(checked),
        onSelect: (0,dist/* composeEventHandlers */.M)(radioItemProps.onSelect, ()=>{
            var _context$onValueChang;
            return (_context$onValueChang = context.onValueChange) === null || _context$onValueChang === void 0 ? void 0 : _context$onValueChang.call(context, value);
        }, {
            checkForDefaultPrevented: false
        })
    })));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$69bd225e9817f6d0, {
    displayName: $6cc32821e9371a1c$var$RADIO_ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuItemIndicator
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$ITEM_INDICATOR_NAME = 'MenuItemIndicator';
const [$6cc32821e9371a1c$var$ItemIndicatorProvider, $6cc32821e9371a1c$var$useItemIndicatorContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$ITEM_INDICATOR_NAME, {
    checked: false
});
const $6cc32821e9371a1c$export$a2593e23056970a3 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , forceMount: forceMount , ...itemIndicatorProps } = props;
    const indicatorContext = $6cc32821e9371a1c$var$useItemIndicatorContext($6cc32821e9371a1c$var$ITEM_INDICATOR_NAME, __scopeMenu);
    return /*#__PURE__*/ (0,react_.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || $6cc32821e9371a1c$var$isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true
    }, /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.span, (0,esm_extends/* default */.Z)({}, itemIndicatorProps, {
        ref: forwardedRef,
        "data-state": $6cc32821e9371a1c$var$getCheckedState(indicatorContext.checked)
    })));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$a2593e23056970a3, {
    displayName: $6cc32821e9371a1c$var$ITEM_INDICATOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuSeparator
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$SEPARATOR_NAME = 'MenuSeparator';
const $6cc32821e9371a1c$export$1cec7dcdd713e220 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , ...separatorProps } = props;
    return /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({
        role: "separator",
        "aria-orientation": "horizontal"
    }, separatorProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$1cec7dcdd713e220, {
    displayName: $6cc32821e9371a1c$var$SEPARATOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuArrow
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$ARROW_NAME = 'MenuArrow';
const $6cc32821e9371a1c$export$bcdda4773debf5fa = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeMenu: __scopeMenu , ...arrowProps } = props;
    const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
    return /*#__PURE__*/ (0,react_.createElement)(react_popper_dist/* Arrow */.Eh, (0,esm_extends/* default */.Z)({}, popperScope, arrowProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$bcdda4773debf5fa, {
    displayName: $6cc32821e9371a1c$var$ARROW_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuSub
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$SUB_NAME = 'MenuSub';
const [$6cc32821e9371a1c$var$MenuSubProvider, $6cc32821e9371a1c$var$useMenuSubContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$SUB_NAME);
const $6cc32821e9371a1c$export$71bdb9d1e2909932 = (props)=>{
    const { __scopeMenu: __scopeMenu , children: children , open: open = false , onOpenChange: onOpenChange  } = props;
    const parentMenuContext = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$SUB_NAME, __scopeMenu);
    const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
    const [trigger, setTrigger] = (0,react_.useState)(null);
    const [content, setContent] = (0,react_.useState)(null);
    const handleOpenChange = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onOpenChange); // Prevent the parent menu from reopening with open submenus.
    (0,react_.useEffect)(()=>{
        if (parentMenuContext.open === false) handleOpenChange(false);
        return ()=>handleOpenChange(false)
        ;
    }, [
        parentMenuContext.open,
        handleOpenChange
    ]);
    return /*#__PURE__*/ (0,react_.createElement)(react_popper_dist/* Root */.fC, popperScope, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuProvider, {
        scope: __scopeMenu,
        open: open,
        onOpenChange: handleOpenChange,
        content: content,
        onContentChange: setContent
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuSubProvider, {
        scope: __scopeMenu,
        contentId: (0,react_id_dist/* useId */.M)(),
        triggerId: (0,react_id_dist/* useId */.M)(),
        trigger: trigger,
        onTriggerChange: setTrigger
    }, children)));
};
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$71bdb9d1e2909932, {
    displayName: $6cc32821e9371a1c$var$SUB_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$SUB_TRIGGER_NAME = 'MenuSubTrigger';
const $6cc32821e9371a1c$export$5fbbb3ba7297405f = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
    const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
    const subContext = $6cc32821e9371a1c$var$useMenuSubContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
    const contentContext = $6cc32821e9371a1c$var$useMenuContentContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
    const openTimerRef = (0,react_.useRef)(null);
    const { pointerGraceTimerRef: pointerGraceTimerRef , onPointerGraceIntentChange: onPointerGraceIntentChange  } = contentContext;
    const scope = {
        __scopeMenu: props.__scopeMenu
    };
    const clearOpenTimer = (0,react_.useCallback)(()=>{
        if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
    }, []);
    (0,react_.useEffect)(()=>clearOpenTimer
    , [
        clearOpenTimer
    ]);
    (0,react_.useEffect)(()=>{
        const pointerGraceTimer = pointerGraceTimerRef.current;
        return ()=>{
            window.clearTimeout(pointerGraceTimer);
            onPointerGraceIntentChange(null);
        };
    }, [
        pointerGraceTimerRef,
        onPointerGraceIntentChange
    ]);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$9fa5ebd18bee4d43, (0,esm_extends/* default */.Z)({
        asChild: true
    }, scope), /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuItemImpl, (0,esm_extends/* default */.Z)({
        id: subContext.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": subContext.contentId,
        "data-state": $6cc32821e9371a1c$var$getOpenState(context.open)
    }, props, {
        ref: (0,react_compose_refs_dist/* composeRefs */.F)(forwardedRef, subContext.onTriggerChange) // This is redundant for mouse users but we cannot determine pointer type from
        ,
        onClick: (event)=>{
            var _props$onClick;
            (_props$onClick = props.onClick) === null || _props$onClick === void 0 || _props$onClick.call(props, event);
            if (props.disabled || event.defaultPrevented) return;
            /**
       * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
       * and we rely heavily on `onFocusOutside` for submenus to close when switching
       * between separate submenus.
       */ event.currentTarget.focus();
            if (!context.open) context.onOpenChange(true);
        },
        onPointerMove: (0,dist/* composeEventHandlers */.M)(props.onPointerMove, $6cc32821e9371a1c$var$whenMouse((event)=>{
            contentContext.onItemEnter(event);
            if (event.defaultPrevented) return;
            if (!props.disabled && !context.open && !openTimerRef.current) {
                contentContext.onPointerGraceIntentChange(null);
                openTimerRef.current = window.setTimeout(()=>{
                    context.onOpenChange(true);
                    clearOpenTimer();
                }, 100);
            }
        })),
        onPointerLeave: (0,dist/* composeEventHandlers */.M)(props.onPointerLeave, $6cc32821e9371a1c$var$whenMouse((event)=>{
            var _context$content;
            clearOpenTimer();
            const contentRect = (_context$content = context.content) === null || _context$content === void 0 ? void 0 : _context$content.getBoundingClientRect();
            if (contentRect) {
                var _context$content2;
                // TODO: make sure to update this when we change positioning logic
                const side = (_context$content2 = context.content) === null || _context$content2 === void 0 ? void 0 : _context$content2.dataset.side;
                const rightSide = side === 'right';
                const bleed = rightSide ? -5 : 5;
                const contentNearEdge = contentRect[rightSide ? 'left' : 'right'];
                const contentFarEdge = contentRect[rightSide ? 'right' : 'left'];
                contentContext.onPointerGraceIntentChange({
                    area: [
                        // consistently within polygon bounds
                        {
                            x: event.clientX + bleed,
                            y: event.clientY
                        },
                        {
                            x: contentNearEdge,
                            y: contentRect.top
                        },
                        {
                            x: contentFarEdge,
                            y: contentRect.top
                        },
                        {
                            x: contentFarEdge,
                            y: contentRect.bottom
                        },
                        {
                            x: contentNearEdge,
                            y: contentRect.bottom
                        }
                    ],
                    side: side
                });
                window.clearTimeout(pointerGraceTimerRef.current);
                pointerGraceTimerRef.current = window.setTimeout(()=>contentContext.onPointerGraceIntentChange(null)
                , 300);
            } else {
                contentContext.onTriggerLeave(event);
                if (event.defaultPrevented) return; // There's 100ms where the user may leave an item before the submenu was opened.
                contentContext.onPointerGraceIntentChange(null);
            }
        })),
        onKeyDown: (0,dist/* composeEventHandlers */.M)(props.onKeyDown, (event)=>{
            const isTypingAhead = contentContext.searchRef.current !== '';
            if (props.disabled || isTypingAhead && event.key === ' ') return;
            if ($6cc32821e9371a1c$var$SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
                var _context$content3;
                context.onOpenChange(true); // The trigger may hold focus if opened via pointer interaction
                // so we ensure content is given focus again when switching to keyboard.
                (_context$content3 = context.content) === null || _context$content3 === void 0 || _context$content3.focus(); // prevent window from scrolling
                event.preventDefault();
            }
        })
    })));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$5fbbb3ba7297405f, {
    displayName: $6cc32821e9371a1c$var$SUB_TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenuSubContent
 * -----------------------------------------------------------------------------------------------*/ const $6cc32821e9371a1c$var$SUB_CONTENT_NAME = 'MenuSubContent';
const $6cc32821e9371a1c$export$e7142ab31822bde6 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const portalContext = $6cc32821e9371a1c$var$usePortalContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    const { forceMount: forceMount = portalContext.forceMount , ...subContentProps } = props;
    const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
    const subContext = $6cc32821e9371a1c$var$useMenuSubContext($6cc32821e9371a1c$var$SUB_CONTENT_NAME, props.__scopeMenu);
    const ref = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$Collection.Provider, {
        scope: props.__scopeMenu
    }, /*#__PURE__*/ (0,react_.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || context.open
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$Collection.Slot, {
        scope: props.__scopeMenu
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$var$MenuContentImpl, (0,esm_extends/* default */.Z)({
        id: subContext.contentId,
        "aria-labelledby": subContext.triggerId
    }, subContentProps, {
        ref: composedRefs,
        align: "start",
        side: rootContext.dir === 'rtl' ? 'left' : 'right',
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        trapFocus: false,
        onOpenAutoFocus: (event)=>{
            var _ref$current;
            // when opening a submenu, focus content for keyboard users only
            if (rootContext.isUsingKeyboardRef.current) (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.focus();
            event.preventDefault();
        } // The menu might close because of focusing another menu item in the parent menu. We
        ,
        onCloseAutoFocus: (event)=>event.preventDefault()
        ,
        onFocusOutside: (0,dist/* composeEventHandlers */.M)(props.onFocusOutside, (event)=>{
            // We prevent closing when the trigger is focused to avoid triggering a re-open animation
            // on pointer interaction.
            if (event.target !== subContext.trigger) context.onOpenChange(false);
        }),
        onEscapeKeyDown: (0,dist/* composeEventHandlers */.M)(props.onEscapeKeyDown, (event)=>{
            rootContext.onClose(); // ensure pressing escape in submenu doesn't escape full screen mode
            event.preventDefault();
        }),
        onKeyDown: (0,dist/* composeEventHandlers */.M)(props.onKeyDown, (event)=>{
            // Submenu key events bubble through portals. We only care about keys in this menu.
            const isKeyDownInside = event.currentTarget.contains(event.target);
            const isCloseKey = $6cc32821e9371a1c$var$SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
            if (isKeyDownInside && isCloseKey) {
                var _subContext$trigger;
                context.onOpenChange(false); // We focus manually because we prevented it in `onCloseAutoFocus`
                (_subContext$trigger = subContext.trigger) === null || _subContext$trigger === void 0 || _subContext$trigger.focus(); // prevent window from scrolling
                event.preventDefault();
            }
        })
    })))));
});
/*#__PURE__*/ Object.assign($6cc32821e9371a1c$export$e7142ab31822bde6, {
    displayName: $6cc32821e9371a1c$var$SUB_CONTENT_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $6cc32821e9371a1c$var$getOpenState(open) {
    return open ? 'open' : 'closed';
}
function $6cc32821e9371a1c$var$isIndeterminate(checked) {
    return checked === 'indeterminate';
}
function $6cc32821e9371a1c$var$getCheckedState(checked) {
    return $6cc32821e9371a1c$var$isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked';
}
function $6cc32821e9371a1c$var$focusFirst(candidates) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        // if focus is already where we want to go, we don't want to keep going through the candidates
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus();
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */ function $6cc32821e9371a1c$var$wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]
    );
}
/**
 * This is the "meat" of the typeahead matching logic. It takes in all the values,
 * the search and the current match, and returns the next match (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through options starting with that character)
 *
 * We also reorder the values by wrapping the array around the current match.
 * This is so we always look forward from the current match, and picking the first
 * match will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current match from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current match still matches.
 */ function $6cc32821e9371a1c$var$getNextMatch(values, search, currentMatch) {
    const isRepeated = search.length > 1 && Array.from(search).every((char)=>char === search[0]
    );
    const normalizedSearch = isRepeated ? search[0] : search;
    const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
    let wrappedValues = $6cc32821e9371a1c$var$wrapArray(values, Math.max(currentMatchIndex, 0));
    const excludeCurrentMatch = normalizedSearch.length === 1;
    if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v)=>v !== currentMatch
    );
    const nextMatch = wrappedValues.find((value)=>value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
    );
    return nextMatch !== currentMatch ? nextMatch : undefined;
}
// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
function $6cc32821e9371a1c$var$isPointInPolygon(point, polygon) {
    const { x: x , y: y  } = point;
    let inside = false;
    for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
        const xi = polygon[i].x;
        const yi = polygon[i].y;
        const xj = polygon[j].x;
        const yj = polygon[j].y; // prettier-ignore
        const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}
function $6cc32821e9371a1c$var$isPointerInGraceArea(event, area) {
    if (!area) return false;
    const cursorPos = {
        x: event.clientX,
        y: event.clientY
    };
    return $6cc32821e9371a1c$var$isPointInPolygon(cursorPos, area);
}
function $6cc32821e9371a1c$var$whenMouse(handler) {
    return (event)=>event.pointerType === 'mouse' ? handler(event) : undefined
    ;
}
const $6cc32821e9371a1c$export$be92b6f5f03c0fe9 = $6cc32821e9371a1c$export$d9b273488cd8ce6f;
const $6cc32821e9371a1c$export$b688253958b8dfe7 = $6cc32821e9371a1c$export$9fa5ebd18bee4d43;
const $6cc32821e9371a1c$export$602eac185826482c = $6cc32821e9371a1c$export$793392f970497feb;
const $6cc32821e9371a1c$export$7c6e2c02157bb7d2 = $6cc32821e9371a1c$export$479f0f2f71193efe;
const $6cc32821e9371a1c$export$eb2fcfdbd7ba97d4 = $6cc32821e9371a1c$export$22a631d1f72787bb;
const $6cc32821e9371a1c$export$b04be29aa201d4f5 = $6cc32821e9371a1c$export$dd37bec0e8a99143;
const $6cc32821e9371a1c$export$6d08773d2e66f8f2 = $6cc32821e9371a1c$export$2ce376c2cc3355c8;
const $6cc32821e9371a1c$export$16ce288f89fa631c = $6cc32821e9371a1c$export$f6f243521332502d;
const $6cc32821e9371a1c$export$a98f0dcb43a68a25 = $6cc32821e9371a1c$export$ea2200c9eee416b3;
const $6cc32821e9371a1c$export$371ab307eab489c0 = $6cc32821e9371a1c$export$69bd225e9817f6d0;
const $6cc32821e9371a1c$export$c3468e2714d175fa = $6cc32821e9371a1c$export$a2593e23056970a3;
const $6cc32821e9371a1c$export$1ff3c3f08ae963c0 = $6cc32821e9371a1c$export$1cec7dcdd713e220;
const $6cc32821e9371a1c$export$21b07c8f274aebd5 = $6cc32821e9371a1c$export$bcdda4773debf5fa;
const $6cc32821e9371a1c$export$d7a01e11500dfb6f = $6cc32821e9371a1c$export$71bdb9d1e2909932;
const $6cc32821e9371a1c$export$2ea8a7a591ac5eac = $6cc32821e9371a1c$export$5fbbb3ba7297405f;
const $6cc32821e9371a1c$export$6d4de93b380beddf = $6cc32821e9371a1c$export$e7142ab31822bde6;





//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs




















/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$DROPDOWN_MENU_NAME = 'DropdownMenu';
const [$d08ef79370b62062$var$createDropdownMenuContext, $d08ef79370b62062$export$c0623cd925aeb687] = (0,react_context_dist/* createContextScope */.b)($d08ef79370b62062$var$DROPDOWN_MENU_NAME, [
    $6cc32821e9371a1c$export$4027731b685e72eb
]);
const $d08ef79370b62062$var$useMenuScope = $6cc32821e9371a1c$export$4027731b685e72eb();
const [$d08ef79370b62062$var$DropdownMenuProvider, $d08ef79370b62062$var$useDropdownMenuContext] = $d08ef79370b62062$var$createDropdownMenuContext($d08ef79370b62062$var$DROPDOWN_MENU_NAME);
const $d08ef79370b62062$export$e44a253a59704894 = (props)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , children: children , dir: dir , open: openProp , defaultOpen: defaultOpen , onOpenChange: onOpenChange , modal: modal = true  } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    const triggerRef = (0,react_.useRef)(null);
    const [open = false, setOpen] = (0,react_use_controllable_state_dist/* useControllableState */.T)({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    return /*#__PURE__*/ (0,react_.createElement)($d08ef79370b62062$var$DropdownMenuProvider, {
        scope: __scopeDropdownMenu,
        triggerId: (0,react_id_dist/* useId */.M)(),
        triggerRef: triggerRef,
        contentId: (0,react_id_dist/* useId */.M)(),
        open: open,
        onOpenChange: setOpen,
        onOpenToggle: (0,react_.useCallback)(()=>setOpen((prevOpen)=>!prevOpen
            )
        , [
            setOpen
        ]),
        modal: modal
    }, /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$be92b6f5f03c0fe9, (0,esm_extends/* default */.Z)({}, menuScope, {
        open: open,
        onOpenChange: setOpen,
        dir: dir,
        modal: modal
    }), children));
};
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$e44a253a59704894, {
    displayName: $d08ef79370b62062$var$DROPDOWN_MENU_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuTrigger
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$TRIGGER_NAME = 'DropdownMenuTrigger';
const $d08ef79370b62062$export$d2469213b3befba9 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , disabled: disabled = false , ...triggerProps } = props;
    const context = $d08ef79370b62062$var$useDropdownMenuContext($d08ef79370b62062$var$TRIGGER_NAME, __scopeDropdownMenu);
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$b688253958b8dfe7, (0,esm_extends/* default */.Z)({
        asChild: true
    }, menuScope), /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.button, (0,esm_extends/* default */.Z)({
        type: "button",
        id: context.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : undefined,
        "data-state": context.open ? 'open' : 'closed',
        "data-disabled": disabled ? '' : undefined,
        disabled: disabled
    }, triggerProps, {
        ref: (0,react_compose_refs_dist/* composeRefs */.F)(forwardedRef, context.triggerRef),
        onPointerDown: (0,dist/* composeEventHandlers */.M)(props.onPointerDown, (event)=>{
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onOpenToggle(); // prevent trigger focusing when opening
                // this allows the content to be given focus without competition
                if (!context.open) event.preventDefault();
            }
        }),
        onKeyDown: (0,dist/* composeEventHandlers */.M)(props.onKeyDown, (event)=>{
            if (disabled) return;
            if ([
                'Enter',
                ' '
            ].includes(event.key)) context.onOpenToggle();
            if (event.key === 'ArrowDown') context.onOpenChange(true); // prevent keydown from scrolling window / first focused item to execute
            // that keydown (inadvertently closing the menu)
            if ([
                'Enter',
                ' ',
                'ArrowDown'
            ].includes(event.key)) event.preventDefault();
        })
    })));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$d2469213b3befba9, {
    displayName: $d08ef79370b62062$var$TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuPortal
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$PORTAL_NAME = 'DropdownMenuPortal';
const $d08ef79370b62062$export$cd369b4d4d54efc9 = (props)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...portalProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$602eac185826482c, (0,esm_extends/* default */.Z)({}, menuScope, portalProps));
};
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$cd369b4d4d54efc9, {
    displayName: $d08ef79370b62062$var$PORTAL_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuContent
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$CONTENT_NAME = 'DropdownMenuContent';
const $d08ef79370b62062$export$6e76d93a37c01248 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...contentProps } = props;
    const context = $d08ef79370b62062$var$useDropdownMenuContext($d08ef79370b62062$var$CONTENT_NAME, __scopeDropdownMenu);
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    const hasInteractedOutsideRef = (0,react_.useRef)(false);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$7c6e2c02157bb7d2, (0,esm_extends/* default */.Z)({
        id: context.contentId,
        "aria-labelledby": context.triggerId
    }, menuScope, contentProps, {
        ref: forwardedRef,
        onCloseAutoFocus: (0,dist/* composeEventHandlers */.M)(props.onCloseAutoFocus, (event)=>{
            var _context$triggerRef$c;
            if (!hasInteractedOutsideRef.current) (_context$triggerRef$c = context.triggerRef.current) === null || _context$triggerRef$c === void 0 || _context$triggerRef$c.focus();
            hasInteractedOutsideRef.current = false; // Always prevent auto focus because we either focus manually or want user agent focus
            event.preventDefault();
        }),
        onInteractOutside: (0,dist/* composeEventHandlers */.M)(props.onInteractOutside, (event)=>{
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
        }),
        style: {
            ...props.style,
            '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)'
        }
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$6e76d93a37c01248, {
    displayName: $d08ef79370b62062$var$CONTENT_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuGroup
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$GROUP_NAME = 'DropdownMenuGroup';
const $d08ef79370b62062$export$246bebaba3a2f70e = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...groupProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$eb2fcfdbd7ba97d4, (0,esm_extends/* default */.Z)({}, menuScope, groupProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$246bebaba3a2f70e, {
    displayName: $d08ef79370b62062$var$GROUP_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuLabel
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$LABEL_NAME = 'DropdownMenuLabel';
const $d08ef79370b62062$export$76e48c5b57f24495 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...labelProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$b04be29aa201d4f5, (0,esm_extends/* default */.Z)({}, menuScope, labelProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$76e48c5b57f24495, {
    displayName: $d08ef79370b62062$var$LABEL_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItem
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$ITEM_NAME = 'DropdownMenuItem';
const $d08ef79370b62062$export$ed97964d1871885d = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...itemProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$6d08773d2e66f8f2, (0,esm_extends/* default */.Z)({}, menuScope, itemProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$ed97964d1871885d, {
    displayName: $d08ef79370b62062$var$ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuCheckboxItem
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$CHECKBOX_ITEM_NAME = 'DropdownMenuCheckboxItem';
const $d08ef79370b62062$export$53a69729da201fa9 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...checkboxItemProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$16ce288f89fa631c, (0,esm_extends/* default */.Z)({}, menuScope, checkboxItemProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$53a69729da201fa9, {
    displayName: $d08ef79370b62062$var$CHECKBOX_ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuRadioGroup
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$RADIO_GROUP_NAME = 'DropdownMenuRadioGroup';
const $d08ef79370b62062$export$3323ad73d55f587e = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...radioGroupProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$a98f0dcb43a68a25, (0,esm_extends/* default */.Z)({}, menuScope, radioGroupProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$3323ad73d55f587e, {
    displayName: $d08ef79370b62062$var$RADIO_GROUP_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuRadioItem
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$RADIO_ITEM_NAME = 'DropdownMenuRadioItem';
const $d08ef79370b62062$export$e4f69b41b1637536 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...radioItemProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$371ab307eab489c0, (0,esm_extends/* default */.Z)({}, menuScope, radioItemProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$e4f69b41b1637536, {
    displayName: $d08ef79370b62062$var$RADIO_ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItemIndicator
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$INDICATOR_NAME = 'DropdownMenuItemIndicator';
const $d08ef79370b62062$export$42355ae145153fb6 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...itemIndicatorProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$c3468e2714d175fa, (0,esm_extends/* default */.Z)({}, menuScope, itemIndicatorProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$42355ae145153fb6, {
    displayName: $d08ef79370b62062$var$INDICATOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSeparator
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$SEPARATOR_NAME = 'DropdownMenuSeparator';
const $d08ef79370b62062$export$da160178fd3bc7e9 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...separatorProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$1ff3c3f08ae963c0, (0,esm_extends/* default */.Z)({}, menuScope, separatorProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$da160178fd3bc7e9, {
    displayName: $d08ef79370b62062$var$SEPARATOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuArrow
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$ARROW_NAME = 'DropdownMenuArrow';
const $d08ef79370b62062$export$34b8980744021ec5 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...arrowProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$21b07c8f274aebd5, (0,esm_extends/* default */.Z)({}, menuScope, arrowProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$34b8980744021ec5, {
    displayName: $d08ef79370b62062$var$ARROW_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSub
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$export$2f307d81a64f5442 = (props)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , children: children , open: openProp , onOpenChange: onOpenChange , defaultOpen: defaultOpen  } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    const [open = false, setOpen] = (0,react_use_controllable_state_dist/* useControllableState */.T)({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$d7a01e11500dfb6f, (0,esm_extends/* default */.Z)({}, menuScope, {
        open: open,
        onOpenChange: setOpen
    }), children);
};
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$SUB_TRIGGER_NAME = 'DropdownMenuSubTrigger';
const $d08ef79370b62062$export$21dcb7ec56f874cf = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...subTriggerProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$2ea8a7a591ac5eac, (0,esm_extends/* default */.Z)({}, menuScope, subTriggerProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$21dcb7ec56f874cf, {
    displayName: $d08ef79370b62062$var$SUB_TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubContent
 * -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$var$SUB_CONTENT_NAME = 'DropdownMenuSubContent';
const $d08ef79370b62062$export$f34ec8bc2482cc5f = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeDropdownMenu: __scopeDropdownMenu , ...subContentProps } = props;
    const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
    return /*#__PURE__*/ (0,react_.createElement)($6cc32821e9371a1c$export$6d4de93b380beddf, (0,esm_extends/* default */.Z)({}, menuScope, subContentProps, {
        ref: forwardedRef,
        style: {
            ...props.style,
            '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)'
        }
    }));
});
/*#__PURE__*/ Object.assign($d08ef79370b62062$export$f34ec8bc2482cc5f, {
    displayName: $d08ef79370b62062$var$SUB_CONTENT_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $d08ef79370b62062$export$be92b6f5f03c0fe9 = $d08ef79370b62062$export$e44a253a59704894;
const $d08ef79370b62062$export$41fb9f06171c75f4 = $d08ef79370b62062$export$d2469213b3befba9;
const $d08ef79370b62062$export$602eac185826482c = $d08ef79370b62062$export$cd369b4d4d54efc9;
const $d08ef79370b62062$export$7c6e2c02157bb7d2 = $d08ef79370b62062$export$6e76d93a37c01248;
const $d08ef79370b62062$export$eb2fcfdbd7ba97d4 = $d08ef79370b62062$export$246bebaba3a2f70e;
const $d08ef79370b62062$export$b04be29aa201d4f5 = $d08ef79370b62062$export$76e48c5b57f24495;
const $d08ef79370b62062$export$6d08773d2e66f8f2 = $d08ef79370b62062$export$ed97964d1871885d;
const $d08ef79370b62062$export$16ce288f89fa631c = $d08ef79370b62062$export$53a69729da201fa9;
const $d08ef79370b62062$export$a98f0dcb43a68a25 = $d08ef79370b62062$export$3323ad73d55f587e;
const $d08ef79370b62062$export$371ab307eab489c0 = $d08ef79370b62062$export$e4f69b41b1637536;
const $d08ef79370b62062$export$c3468e2714d175fa = $d08ef79370b62062$export$42355ae145153fb6;
const $d08ef79370b62062$export$1ff3c3f08ae963c0 = $d08ef79370b62062$export$da160178fd3bc7e9;
const $d08ef79370b62062$export$21b07c8f274aebd5 = (/* unused pure expression or super */ null && ($d08ef79370b62062$export$34b8980744021ec5));
const $d08ef79370b62062$export$d7a01e11500dfb6f = $d08ef79370b62062$export$2f307d81a64f5442;
const $d08ef79370b62062$export$2ea8a7a591ac5eac = $d08ef79370b62062$export$21dcb7ec56f874cf;
const $d08ef79370b62062$export$6d4de93b380beddf = $d08ef79370b62062$export$f34ec8bc2482cc5f;





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 1046:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EW: () => (/* binding */ $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c)
/* harmony export */ });
/* unused harmony exports FocusGuards, Root */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);



/** Number of components which have requested interest to have focus guards */ let $3db38b7d1fb3fe6a$var$count = 0;
function $3db38b7d1fb3fe6a$export$ac5b58043b79449b(props) {
    $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c();
    return props.children;
}
/**
 * Injects a pair of focus guards at the edges of the whole DOM tree
 * to ensure `focusin` & `focusout` events can be caught consistently.
 */ function $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c() {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        var _edgeGuards$, _edgeGuards$2;
        const edgeGuards = document.querySelectorAll('[data-radix-focus-guard]');
        document.body.insertAdjacentElement('afterbegin', (_edgeGuards$ = edgeGuards[0]) !== null && _edgeGuards$ !== void 0 ? _edgeGuards$ : $3db38b7d1fb3fe6a$var$createFocusGuard());
        document.body.insertAdjacentElement('beforeend', (_edgeGuards$2 = edgeGuards[1]) !== null && _edgeGuards$2 !== void 0 ? _edgeGuards$2 : $3db38b7d1fb3fe6a$var$createFocusGuard());
        $3db38b7d1fb3fe6a$var$count++;
        return ()=>{
            if ($3db38b7d1fb3fe6a$var$count === 1) document.querySelectorAll('[data-radix-focus-guard]').forEach((node)=>node.remove()
            );
            $3db38b7d1fb3fe6a$var$count--;
        };
    }, []);
}
function $3db38b7d1fb3fe6a$var$createFocusGuard() {
    const element = document.createElement('span');
    element.setAttribute('data-radix-focus-guard', '');
    element.tabIndex = 0;
    element.style.cssText = 'outline: none; opacity: 0; position: fixed; pointer-events: none';
    return element;
}
const $3db38b7d1fb3fe6a$export$be92b6f5f03c0fe9 = (/* unused pure expression or super */ null && ($3db38b7d1fb3fe6a$export$ac5b58043b79449b));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 7699:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ $d3863c46a17e8a28$export$20e40289641fbbb6)
/* harmony export */ });
/* unused harmony export Root */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(668);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(880);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3979);
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2285);











const $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount';
const $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount';
const $d3863c46a17e8a28$var$EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
/* -------------------------------------------------------------------------------------------------
 * FocusScope
 * -----------------------------------------------------------------------------------------------*/ const $d3863c46a17e8a28$var$FOCUS_SCOPE_NAME = 'FocusScope';
const $d3863c46a17e8a28$export$20e40289641fbbb6 = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, forwardedRef)=>{
    const { loop: loop = false , trapped: trapped = false , onMountAutoFocus: onMountAutoFocusProp , onUnmountAutoFocus: onUnmountAutoFocusProp , ...scopeProps } = props;
    const [container1, setContainer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const onMountAutoFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .W)(onMountAutoFocusProp);
    const onUnmountAutoFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .W)(onUnmountAutoFocusProp);
    const lastFocusedElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__/* .useComposedRefs */ .e)(forwardedRef, (node)=>setContainer(node)
    );
    const focusScope = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
        paused: false,
        pause () {
            this.paused = true;
        },
        resume () {
            this.paused = false;
        }
    }).current; // Takes care of trapping focus if focus is moved outside programmatically for example
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (trapped) {
            function handleFocusIn(event) {
                if (focusScope.paused || !container1) return;
                const target = event.target;
                if (container1.contains(target)) lastFocusedElementRef.current = target;
                else $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
                    select: true
                });
            }
            function handleFocusOut(event) {
                if (focusScope.paused || !container1) return;
                const relatedTarget = event.relatedTarget; // A `focusout` event with a `null` `relatedTarget` will happen in at least two cases:
                //
                // 1. When the user switches app/tabs/windows/the browser itself loses focus.
                // 2. In Google Chrome, when the focused element is removed from the DOM.
                //
                // We let the browser do its thing here because:
                //
                // 1. The browser already keeps a memory of what's focused for when the page gets refocused.
                // 2. In Google Chrome, if we try to focus the deleted focused element (as per below), it
                //    throws the CPU to 100%, so we avoid doing anything for this reason here too.
                if (relatedTarget === null) return; // If the focus has moved to an actual legitimate element (`relatedTarget !== null`)
                // that is outside the container, we move focus to the last valid focused element inside.
                if (!container1.contains(relatedTarget)) $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
                    select: true
                });
            } // When the focused element gets removed from the DOM, browsers move focus
            // back to the document.body. In this case, we move focus to the container
            // to keep focus trapped correctly.
            function handleMutations(mutations) {
                const focusedElement = document.activeElement;
                for (const mutation of mutations){
                    if (mutation.removedNodes.length > 0) {
                        if (!(container1 !== null && container1 !== void 0 && container1.contains(focusedElement))) $d3863c46a17e8a28$var$focus(container1);
                    }
                }
            }
            document.addEventListener('focusin', handleFocusIn);
            document.addEventListener('focusout', handleFocusOut);
            const mutationObserver = new MutationObserver(handleMutations);
            if (container1) mutationObserver.observe(container1, {
                childList: true,
                subtree: true
            });
            return ()=>{
                document.removeEventListener('focusin', handleFocusIn);
                document.removeEventListener('focusout', handleFocusOut);
                mutationObserver.disconnect();
            };
        }
    }, [
        trapped,
        container1,
        focusScope.paused
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (container1) {
            $d3863c46a17e8a28$var$focusScopesStack.add(focusScope);
            const previouslyFocusedElement = document.activeElement;
            const hasFocusedCandidate = container1.contains(previouslyFocusedElement);
            if (!hasFocusedCandidate) {
                const mountEvent = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
                container1.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                container1.dispatchEvent(mountEvent);
                if (!mountEvent.defaultPrevented) {
                    $d3863c46a17e8a28$var$focusFirst($d3863c46a17e8a28$var$removeLinks($d3863c46a17e8a28$var$getTabbableCandidates(container1)), {
                        select: true
                    });
                    if (document.activeElement === previouslyFocusedElement) $d3863c46a17e8a28$var$focus(container1);
                }
            }
            return ()=>{
                container1.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, onMountAutoFocus); // We hit a react bug (fixed in v17) with focusing in unmount.
                // We need to delay the focus a little to get around it for now.
                // See: https://github.com/facebook/react/issues/17894
                setTimeout(()=>{
                    const unmountEvent = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
                    container1.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                    container1.dispatchEvent(unmountEvent);
                    if (!unmountEvent.defaultPrevented) $d3863c46a17e8a28$var$focus(previouslyFocusedElement !== null && previouslyFocusedElement !== void 0 ? previouslyFocusedElement : document.body, {
                        select: true
                    });
                     // we need to remove the listener after we `dispatchEvent`
                    container1.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                    $d3863c46a17e8a28$var$focusScopesStack.remove(focusScope);
                }, 0);
            };
        }
    }, [
        container1,
        onMountAutoFocus,
        onUnmountAutoFocus,
        focusScope
    ]); // Takes care of looping focus (when tabbing whilst at the edges)
    const handleKeyDown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((event)=>{
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
            const container = event.currentTarget;
            const [first, last] = $d3863c46a17e8a28$var$getTabbableEdges(container);
            const hasTabbableElementsInside = first && last; // we can only wrap focus if we have tabbable edges
            if (!hasTabbableElementsInside) {
                if (focusedElement === container) event.preventDefault();
            } else {
                if (!event.shiftKey && focusedElement === last) {
                    event.preventDefault();
                    if (loop) $d3863c46a17e8a28$var$focus(first, {
                        select: true
                    });
                } else if (event.shiftKey && focusedElement === first) {
                    event.preventDefault();
                    if (loop) $d3863c46a17e8a28$var$focus(last, {
                        select: true
                    });
                }
            }
        }
    }, [
        loop,
        trapped,
        focusScope.paused
    ]);
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_3__/* .Primitive */ .WV.div, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)({
        tabIndex: -1
    }, scopeProps, {
        ref: composedRefs,
        onKeyDown: handleKeyDown
    }));
});
/*#__PURE__*/ Object.assign($d3863c46a17e8a28$export$20e40289641fbbb6, {
    displayName: $d3863c46a17e8a28$var$FOCUS_SCOPE_NAME
});
/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/ /**
 * Attempts focusing the first element in a list of candidates.
 * Stops when focus has actually moved.
 */ function $d3863c46a17e8a28$var$focusFirst(candidates, { select: select = false  } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates){
        $d3863c46a17e8a28$var$focus(candidate, {
            select: select
        });
        if (document.activeElement !== previouslyFocusedElement) return;
    }
}
/**
 * Returns the first and last tabbable elements inside a container.
 */ function $d3863c46a17e8a28$var$getTabbableEdges(container) {
    const candidates = $d3863c46a17e8a28$var$getTabbableCandidates(container);
    const first = $d3863c46a17e8a28$var$findVisible(candidates, container);
    const last = $d3863c46a17e8a28$var$findVisible(candidates.reverse(), container);
    return [
        first,
        last
    ];
}
/**
 * Returns a list of potential tabbable candidates.
 *
 * NOTE: This is only a close approximation. For example it doesn't take into account cases like when
 * elements are not visible. This cannot be worked out easily by just reading a property, but rather
 * necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
 */ function $d3863c46a17e8a28$var$getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node)=>{
            const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
            if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP; // `.tabIndex` is not the same as the `tabindex` attribute. It works on the
            // runtime's understanding of tabbability, so this automatically accounts
            // for any kind of element that could be tabbed to.
            return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    });
    while(walker.nextNode())nodes.push(walker.currentNode); // we do not take into account the order of nodes with positive `tabIndex` as it
    // hinders accessibility to have tab order different from visual order.
    return nodes;
}
/**
 * Returns the first visible element in a list.
 * NOTE: Only checks visibility up to the `container`.
 */ function $d3863c46a17e8a28$var$findVisible(elements, container) {
    for (const element of elements){
        // we stop checking if it's hidden at the `container` level (excluding)
        if (!$d3863c46a17e8a28$var$isHidden(element, {
            upTo: container
        })) return element;
    }
}
function $d3863c46a17e8a28$var$isHidden(node, { upTo: upTo  }) {
    if (getComputedStyle(node).visibility === 'hidden') return true;
    while(node){
        // we stop at `upTo` (excluding it)
        if (upTo !== undefined && node === upTo) return false;
        if (getComputedStyle(node).display === 'none') return true;
        node = node.parentElement;
    }
    return false;
}
function $d3863c46a17e8a28$var$isSelectableInput(element) {
    return element instanceof HTMLInputElement && 'select' in element;
}
function $d3863c46a17e8a28$var$focus(element, { select: select = false  } = {}) {
    // only focus if that element is focusable
    if (element && element.focus) {
        const previouslyFocusedElement = document.activeElement; // NOTE: we prevent scrolling on focus, to minimize jarring transitions for users
        element.focus({
            preventScroll: true
        }); // only select if its not the same element, it supports selection and we need to select
        if (element !== previouslyFocusedElement && $d3863c46a17e8a28$var$isSelectableInput(element) && select) element.select();
    }
}
/* -------------------------------------------------------------------------------------------------
 * FocusScope stack
 * -----------------------------------------------------------------------------------------------*/ const $d3863c46a17e8a28$var$focusScopesStack = $d3863c46a17e8a28$var$createFocusScopesStack();
function $d3863c46a17e8a28$var$createFocusScopesStack() {
    /** A stack of focus scopes, with the active one at the top */ let stack = [];
    return {
        add (focusScope) {
            // pause the currently active focus scope (at the top of the stack)
            const activeFocusScope = stack[0];
            if (focusScope !== activeFocusScope) activeFocusScope === null || activeFocusScope === void 0 || activeFocusScope.pause();
             // remove in case it already exists (because we'll re-add it at the top of the stack)
            stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
            stack.unshift(focusScope);
        },
        remove (focusScope) {
            var _stack$;
            stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
            (_stack$ = stack[0]) === null || _stack$ === void 0 || _stack$.resume();
        }
    };
}
function $d3863c46a17e8a28$var$arrayRemove(array, item) {
    const updatedArray = [
        ...array
    ];
    const index = updatedArray.indexOf(item);
    if (index !== -1) updatedArray.splice(index, 1);
    return updatedArray;
}
function $d3863c46a17e8a28$var$removeLinks(items) {
    return items.filter((item)=>item.tagName !== 'A'
    );
}
const $d3863c46a17e8a28$export$be92b6f5f03c0fe9 = (/* unused pure expression or super */ null && ($d3863c46a17e8a28$export$20e40289641fbbb6));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 6529:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ $1746a345f3d73bb7$export$f680877a34711e37)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5852);





const $1746a345f3d73bb7$var$useReactId = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))['useId'.toString()] || (()=>undefined
);
let $1746a345f3d73bb7$var$count = 0;
function $1746a345f3d73bb7$export$f680877a34711e37(deterministicId) {
    const [id, setId] = react__WEBPACK_IMPORTED_MODULE_0__.useState($1746a345f3d73bb7$var$useReactId()); // React versions older than 18 will have client-side ids only.
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__/* .useLayoutEffect */ .b)(()=>{
        if (!deterministicId) setId((reactId)=>reactId !== null && reactId !== void 0 ? reactId : String($1746a345f3d73bb7$var$count++)
        );
    }, [
        deterministicId
    ]);
    return deterministicId || (id ? `radix-${id}` : '');
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 9918:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ee: () => (/* binding */ $cf1ac5d9fe0e8206$export$b688253958b8dfe7),
  Eh: () => (/* binding */ $cf1ac5d9fe0e8206$export$21b07c8f274aebd5),
  VY: () => (/* binding */ $cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2),
  fC: () => (/* binding */ $cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9),
  D7: () => (/* binding */ $cf1ac5d9fe0e8206$export$722aac194ae923)
});

// UNUSED EXPORTS: ALIGN_OPTIONS, Popper, PopperAnchor, PopperArrow, PopperContent, SIDE_OPTIONS

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(668);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
;// CONCATENATED MODULE: ./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
const sides = ['top', 'right', 'bottom', 'left'];
const alignments = (/* unused pure expression or super */ null && (['start', 'end']));
const floating_ui_utils_placements = /*#__PURE__*/(/* unused pure expression or super */ null && (sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), [])));
const floating_ui_utils_min = Math.min;
const floating_ui_utils_max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return floating_ui_utils_max(start, floating_ui_utils_min(value, end));
}
function floating_ui_utils_evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function floating_ui_utils_getSide(placement) {
  return placement.split('-')[0];
}
function floating_ui_utils_getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function floating_ui_utils_getSideAxis(placement) {
  return ['top', 'bottom'].includes(floating_ui_utils_getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(floating_ui_utils_getSideAxis(placement));
}
function floating_ui_utils_getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = floating_ui_utils_getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [floating_ui_utils_getOppositeAlignmentPlacement(placement), oppositePlacement, floating_ui_utils_getOppositeAlignmentPlacement(oppositePlacement)];
}
function floating_ui_utils_getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = floating_ui_utils_getAlignment(placement);
  let list = getSideList(floating_ui_utils_getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(floating_ui_utils_getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function floating_ui_utils_getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function floating_ui_utils_rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}



;// CONCATENATED MODULE: ./node_modules/@floating-ui/core/dist/floating-ui.core.mjs



function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = floating_ui_utils_getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = floating_ui_utils_getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (floating_ui_utils_getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = floating_ui_utils_evaluate(options, state);
  const paddingObject = floating_ui_utils_getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = floating_ui_utils_rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = floating_ui_utils_rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = floating_ui_utils_evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = floating_ui_utils_getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = floating_ui_utils_min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = floating_ui_utils_min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. This stops `shift()` from taking action, but can
    // be worked around by calling it again after the `arrow()` if desired.
    const shouldAddOffset = floating_ui_utils_getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset + alignmentOffset
      }
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = getAlignment(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      const side = floating_ui_utils_getSide(placement);
      const isBasePlacement = floating_ui_utils_getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = floating_ui_utils_getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = min(...rects.map(rect => rect.left));
  const minY = min(...rects.map(rect => rect.top));
  const maxX = max(...rects.map(rect => rect.right));
  const maxY = max(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max(...clientRects.map(rect => rect.right));
          const minLeft = min(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = floating_ui_utils_getSide(placement);
  const alignment = floating_ui_utils_getAlignment(placement);
  const isVertical = floating_ui_utils_getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = floating_ui_utils_evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = floating_ui_utils_getSideAxis(floating_ui_utils_getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = floating_ui_utils_evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = floating_ui_utils_getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = floating_ui_utils_evaluate(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes(floating_ui_utils_getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = floating_ui_utils_getSide(placement);
      const alignment = floating_ui_utils_getAlignment(placement);
      const isYAxis = floating_ui_utils_getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? floating_ui_utils_min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? floating_ui_utils_min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = floating_ui_utils_max(overflow.left, 0);
        const xMax = floating_ui_utils_max(overflow.right, 0);
        const yMin = floating_ui_utils_max(overflow.top, 0);
        const yMax = floating_ui_utils_max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : floating_ui_utils_max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : floating_ui_utils_max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};



;// CONCATENATED MODULE: ./node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}



;// CONCATENATED MODULE: ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs






function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return floating_ui_utils_rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = floating_ui_utils_max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = floating_ui_utils_max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += floating_ui_utils_max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return floating_ui_utils_rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = floating_ui_utils_max(rect.top, accRect.top);
    accRect.right = floating_ui_utils_min(rect.right, accRect.right);
    accRect.bottom = floating_ui_utils_min(rect.bottom, accRect.bottom);
    accRect.left = floating_ui_utils_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: floating_ui_utils_max(0, floating_ui_utils_min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const floating_ui_dom_computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};



// EXTERNAL MODULE: external "next/dist/compiled/react-dom/server-rendering-stub"
var server_rendering_stub_ = __webpack_require__(8704);
;// CONCATENATED MODULE: ./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs






/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const floating_ui_react_dom_arrow = options => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current');
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === 'function' ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      } else if (element) {
        return arrow({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};

var index = typeof document !== 'undefined' ? react_.useLayoutEffect : react_.useEffect;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }
  let length, i, keys;
  if (a && b && typeof a == 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}

function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}

function useLatestRef(value) {
  const ref = react_.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/react
 */
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = react_.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = react_.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = react_.useState(null);
  const [_floating, _setFloating] = react_.useState(null);
  const setReference = react_.useCallback(node => {
    if (node != referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, [_setReference]);
  const setFloating = react_.useCallback(node => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, [_setFloating]);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = react_.useRef(null);
  const floatingRef = react_.useRef(null);
  const dataRef = react_.useRef(data);
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform);
  const update = react_.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    floating_ui_dom_computePosition(referenceRef.current, floatingRef.current, config).then(data => {
      const fullData = {
        ...data,
        isPositioned: true
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        server_rendering_stub_.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData(data => ({
        ...data,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = react_.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      } else {
        update();
      }
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef]);
  const refs = react_.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = react_.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = react_.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...(getDPR(elements.floating) >= 1.5 && {
          willChange: 'transform'
        })
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return react_.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}



// EXTERNAL MODULE: ./node_modules/@radix-ui/react-primitive/dist/index.mjs
var dist = __webpack_require__(3979);
;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-arrow/dist/index.mjs







/* -------------------------------------------------------------------------------------------------
 * Arrow
 * -----------------------------------------------------------------------------------------------*/ const $7e8f5cd07187803e$var$NAME = 'Arrow';
const $7e8f5cd07187803e$export$21b07c8f274aebd5 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { children: children , width: width = 10 , height: height = 5 , ...arrowProps } = props;
    return /*#__PURE__*/ (0,react_.createElement)(dist/* Primitive */.WV.svg, (0,esm_extends/* default */.Z)({}, arrowProps, {
        ref: forwardedRef,
        width: width,
        height: height,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none"
    }), props.asChild ? children : /*#__PURE__*/ (0,react_.createElement)("polygon", {
        points: "0,0 30,0 15,10"
    }));
});
/*#__PURE__*/ Object.assign($7e8f5cd07187803e$export$21b07c8f274aebd5, {
    displayName: $7e8f5cd07187803e$var$NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $7e8f5cd07187803e$export$be92b6f5f03c0fe9 = $7e8f5cd07187803e$export$21b07c8f274aebd5;





//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(880);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-context/dist/index.mjs
var react_context_dist = __webpack_require__(8718);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var react_use_callback_ref_dist = __webpack_require__(2285);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var react_use_layout_effect_dist = __webpack_require__(5852);
;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-use-size/dist/index.mjs





function $db6c3485150b8e66$export$1ab7ae714698c4b8(element) {
    const [size, setSize] = (0,react_.useState)(undefined);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.b)(()=>{
        if (element) {
            // provide size as early as possible
            setSize({
                width: element.offsetWidth,
                height: element.offsetHeight
            });
            const resizeObserver = new ResizeObserver((entries)=>{
                if (!Array.isArray(entries)) return;
                 // Since we only observe the one element, we don't need to loop over the
                // array
                if (!entries.length) return;
                const entry = entries[0];
                let width;
                let height;
                if ('borderBoxSize' in entry) {
                    const borderSizeEntry = entry['borderBoxSize']; // iron out differences between browsers
                    const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
                    width = borderSize['inlineSize'];
                    height = borderSize['blockSize'];
                } else {
                    // for browsers that don't support `borderBoxSize`
                    // we calculate it ourselves to get the correct border box.
                    width = element.offsetWidth;
                    height = element.offsetHeight;
                }
                setSize({
                    width: width,
                    height: height
                });
            });
            resizeObserver.observe(element, {
                box: 'border-box'
            });
            return ()=>resizeObserver.unobserve(element)
            ;
        } else // We only want to reset to `undefined` when the element becomes `null`,
        // not if it changes to another element.
        setSize(undefined);
    }, [
        element
    ]);
    return size;
}





//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/@radix-ui/react-popper/dist/index.mjs





















const $cf1ac5d9fe0e8206$export$36f0086da09c4b9f = (/* unused pure expression or super */ null && ([
    'top',
    'right',
    'bottom',
    'left'
]));
const $cf1ac5d9fe0e8206$export$3671ffab7b302fc9 = (/* unused pure expression or super */ null && ([
    'start',
    'center',
    'end'
]));
/* -------------------------------------------------------------------------------------------------
 * Popper
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$POPPER_NAME = 'Popper';
const [$cf1ac5d9fe0e8206$var$createPopperContext, $cf1ac5d9fe0e8206$export$722aac194ae923] = (0,react_context_dist/* createContextScope */.b)($cf1ac5d9fe0e8206$var$POPPER_NAME);
const [$cf1ac5d9fe0e8206$var$PopperProvider, $cf1ac5d9fe0e8206$var$usePopperContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$POPPER_NAME);
const $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9 = (props)=>{
    const { __scopePopper: __scopePopper , children: children  } = props;
    const [anchor, setAnchor] = (0,react_.useState)(null);
    return /*#__PURE__*/ (0,react_.createElement)($cf1ac5d9fe0e8206$var$PopperProvider, {
        scope: __scopePopper,
        anchor: anchor,
        onAnchorChange: setAnchor
    }, children);
};
/*#__PURE__*/ Object.assign($cf1ac5d9fe0e8206$export$badac9ada3a0bdf9, {
    displayName: $cf1ac5d9fe0e8206$var$POPPER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * PopperAnchor
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$ANCHOR_NAME = 'PopperAnchor';
const $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopePopper: __scopePopper , virtualRef: virtualRef , ...anchorProps } = props;
    const context = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$ANCHOR_NAME, __scopePopper);
    const ref = (0,react_.useRef)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, ref);
    (0,react_.useEffect)(()=>{
        // Consumer can anchor the popper to something that isn't
        // a DOM node e.g. pointer position, so we override the
        // `anchorRef` with their virtual ref in this case.
        context.onAnchorChange((virtualRef === null || virtualRef === void 0 ? void 0 : virtualRef.current) || ref.current);
    });
    return virtualRef ? null : /*#__PURE__*/ (0,react_.createElement)(dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({}, anchorProps, {
        ref: composedRefs
    }));
});
/*#__PURE__*/ Object.assign($cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d, {
    displayName: $cf1ac5d9fe0e8206$var$ANCHOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * PopperContent
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$CONTENT_NAME = 'PopperContent';
const [$cf1ac5d9fe0e8206$var$PopperContentProvider, $cf1ac5d9fe0e8206$var$useContentContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME);
const $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    var _arrowSize$width, _arrowSize$height, _middlewareData$arrow, _middlewareData$arrow2, _middlewareData$arrow3, _middlewareData$trans, _middlewareData$trans2, _middlewareData$hide;
    const { __scopePopper: __scopePopper , side: side = 'bottom' , sideOffset: sideOffset = 0 , align: align = 'center' , alignOffset: alignOffset = 0 , arrowPadding: arrowPadding = 0 , collisionBoundary: collisionBoundary = [] , collisionPadding: collisionPaddingProp = 0 , sticky: sticky = 'partial' , hideWhenDetached: hideWhenDetached = false , avoidCollisions: avoidCollisions = true , onPlaced: onPlaced , ...contentProps } = props;
    const context = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME, __scopePopper);
    const [content, setContent] = (0,react_.useState)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, (node)=>setContent(node)
    );
    const [arrow, setArrow] = (0,react_.useState)(null);
    const arrowSize = $db6c3485150b8e66$export$1ab7ae714698c4b8(arrow);
    const arrowWidth = (_arrowSize$width = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.width) !== null && _arrowSize$width !== void 0 ? _arrowSize$width : 0;
    const arrowHeight = (_arrowSize$height = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.height) !== null && _arrowSize$height !== void 0 ? _arrowSize$height : 0;
    const desiredPlacement = side + (align !== 'center' ? '-' + align : '');
    const collisionPadding = typeof collisionPaddingProp === 'number' ? collisionPaddingProp : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...collisionPaddingProp
    };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [
        collisionBoundary
    ];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
        padding: collisionPadding,
        boundary: boundary.filter($cf1ac5d9fe0e8206$var$isNotNull),
        // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
        altBoundary: hasExplicitBoundaries
    };
    const { refs: refs , floatingStyles: floatingStyles , placement: placement , isPositioned: isPositioned , middlewareData: middlewareData  } = useFloating({
        // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
        strategy: 'fixed',
        placement: desiredPlacement,
        whileElementsMounted: autoUpdate,
        elements: {
            reference: context.anchor
        },
        middleware: [
            offset({
                mainAxis: sideOffset + arrowHeight,
                alignmentAxis: alignOffset
            }),
            avoidCollisions && shift({
                mainAxis: true,
                crossAxis: false,
                limiter: sticky === 'partial' ? limitShift() : undefined,
                ...detectOverflowOptions
            }),
            avoidCollisions && flip({
                ...detectOverflowOptions
            }),
            size({
                ...detectOverflowOptions,
                apply: ({ elements: elements , rects: rects , availableWidth: availableWidth , availableHeight: availableHeight  })=>{
                    const { width: anchorWidth , height: anchorHeight  } = rects.reference;
                    const contentStyle = elements.floating.style;
                    contentStyle.setProperty('--radix-popper-available-width', `${availableWidth}px`);
                    contentStyle.setProperty('--radix-popper-available-height', `${availableHeight}px`);
                    contentStyle.setProperty('--radix-popper-anchor-width', `${anchorWidth}px`);
                    contentStyle.setProperty('--radix-popper-anchor-height', `${anchorHeight}px`);
                }
            }),
            arrow && floating_ui_react_dom_arrow({
                element: arrow,
                padding: arrowPadding
            }),
            $cf1ac5d9fe0e8206$var$transformOrigin({
                arrowWidth: arrowWidth,
                arrowHeight: arrowHeight
            }),
            hideWhenDetached && hide({
                strategy: 'referenceHidden'
            })
        ]
    });
    const [placedSide, placedAlign] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement);
    const handlePlaced = (0,react_use_callback_ref_dist/* useCallbackRef */.W)(onPlaced);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.b)(()=>{
        if (isPositioned) handlePlaced === null || handlePlaced === void 0 || handlePlaced();
    }, [
        isPositioned,
        handlePlaced
    ]);
    const arrowX = (_middlewareData$arrow = middlewareData.arrow) === null || _middlewareData$arrow === void 0 ? void 0 : _middlewareData$arrow.x;
    const arrowY = (_middlewareData$arrow2 = middlewareData.arrow) === null || _middlewareData$arrow2 === void 0 ? void 0 : _middlewareData$arrow2.y;
    const cannotCenterArrow = ((_middlewareData$arrow3 = middlewareData.arrow) === null || _middlewareData$arrow3 === void 0 ? void 0 : _middlewareData$arrow3.centerOffset) !== 0;
    const [contentZIndex, setContentZIndex] = (0,react_.useState)();
    (0,react_use_layout_effect_dist/* useLayoutEffect */.b)(()=>{
        if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [
        content
    ]);
    return /*#__PURE__*/ (0,react_.createElement)("div", {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
            ...floatingStyles,
            transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)',
            // keep off the page when measuring
            minWidth: 'max-content',
            zIndex: contentZIndex,
            ['--radix-popper-transform-origin']: [
                (_middlewareData$trans = middlewareData.transformOrigin) === null || _middlewareData$trans === void 0 ? void 0 : _middlewareData$trans.x,
                (_middlewareData$trans2 = middlewareData.transformOrigin) === null || _middlewareData$trans2 === void 0 ? void 0 : _middlewareData$trans2.y
            ].join(' ')
        } // Floating UI interally calculates logical alignment based the `dir` attribute on
        ,
        dir: props.dir
    }, /*#__PURE__*/ (0,react_.createElement)($cf1ac5d9fe0e8206$var$PopperContentProvider, {
        scope: __scopePopper,
        placedSide: placedSide,
        onArrowChange: setArrow,
        arrowX: arrowX,
        arrowY: arrowY,
        shouldHideArrow: cannotCenterArrow
    }, /*#__PURE__*/ (0,react_.createElement)(dist/* Primitive */.WV.div, (0,esm_extends/* default */.Z)({
        "data-side": placedSide,
        "data-align": placedAlign
    }, contentProps, {
        ref: composedRefs,
        style: {
            ...contentProps.style,
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: !isPositioned ? 'none' : undefined,
            // hide the content if using the hide middleware and should be hidden
            opacity: (_middlewareData$hide = middlewareData.hide) !== null && _middlewareData$hide !== void 0 && _middlewareData$hide.referenceHidden ? 0 : undefined
        }
    }))));
});
/*#__PURE__*/ Object.assign($cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc, {
    displayName: $cf1ac5d9fe0e8206$var$CONTENT_NAME
});
/* -------------------------------------------------------------------------------------------------
 * PopperArrow
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$ARROW_NAME = 'PopperArrow';
const $cf1ac5d9fe0e8206$var$OPPOSITE_SIDE = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
};
const $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0 = /*#__PURE__*/ (0,react_.forwardRef)(function $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0(props, forwardedRef) {
    const { __scopePopper: __scopePopper , ...arrowProps } = props;
    const contentContext = $cf1ac5d9fe0e8206$var$useContentContext($cf1ac5d9fe0e8206$var$ARROW_NAME, __scopePopper);
    const baseSide = $cf1ac5d9fe0e8206$var$OPPOSITE_SIDE[contentContext.placedSide];
    return(/*#__PURE__*/ // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    (0,react_.createElement)("span", {
        ref: contentContext.onArrowChange,
        style: {
            position: 'absolute',
            left: contentContext.arrowX,
            top: contentContext.arrowY,
            [baseSide]: 0,
            transformOrigin: {
                top: '',
                right: '0 0',
                bottom: 'center 0',
                left: '100% 0'
            }[contentContext.placedSide],
            transform: {
                top: 'translateY(100%)',
                right: 'translateY(50%) rotate(90deg) translateX(-50%)',
                bottom: `rotate(180deg)`,
                left: 'translateY(50%) rotate(-90deg) translateX(50%)'
            }[contentContext.placedSide],
            visibility: contentContext.shouldHideArrow ? 'hidden' : undefined
        }
    }, /*#__PURE__*/ (0,react_.createElement)($7e8f5cd07187803e$export$be92b6f5f03c0fe9, (0,esm_extends/* default */.Z)({}, arrowProps, {
        ref: forwardedRef,
        style: {
            ...arrowProps.style,
            // ensures the element can be measured correctly (mostly for if SVG)
            display: 'block'
        }
    }))));
});
/*#__PURE__*/ Object.assign($cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0, {
    displayName: $cf1ac5d9fe0e8206$var$ARROW_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $cf1ac5d9fe0e8206$var$isNotNull(value) {
    return value !== null;
}
const $cf1ac5d9fe0e8206$var$transformOrigin = (options)=>({
        name: 'transformOrigin',
        options: options,
        fn (data) {
            var _middlewareData$arrow4, _middlewareData$arrow5, _middlewareData$arrow6, _middlewareData$arrow7, _middlewareData$arrow8;
            const { placement: placement , rects: rects , middlewareData: middlewareData  } = data;
            const cannotCenterArrow = ((_middlewareData$arrow4 = middlewareData.arrow) === null || _middlewareData$arrow4 === void 0 ? void 0 : _middlewareData$arrow4.centerOffset) !== 0;
            const isArrowHidden = cannotCenterArrow;
            const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
            const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
            const [placedSide, placedAlign] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement);
            const noArrowAlign = {
                start: '0%',
                center: '50%',
                end: '100%'
            }[placedAlign];
            const arrowXCenter = ((_middlewareData$arrow5 = (_middlewareData$arrow6 = middlewareData.arrow) === null || _middlewareData$arrow6 === void 0 ? void 0 : _middlewareData$arrow6.x) !== null && _middlewareData$arrow5 !== void 0 ? _middlewareData$arrow5 : 0) + arrowWidth / 2;
            const arrowYCenter = ((_middlewareData$arrow7 = (_middlewareData$arrow8 = middlewareData.arrow) === null || _middlewareData$arrow8 === void 0 ? void 0 : _middlewareData$arrow8.y) !== null && _middlewareData$arrow7 !== void 0 ? _middlewareData$arrow7 : 0) + arrowHeight / 2;
            let x = '';
            let y = '';
            if (placedSide === 'bottom') {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${-arrowHeight}px`;
            } else if (placedSide === 'top') {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${rects.floating.height + arrowHeight}px`;
            } else if (placedSide === 'right') {
                x = `${-arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            } else if (placedSide === 'left') {
                x = `${rects.floating.width + arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            }
            return {
                data: {
                    x: x,
                    y: y
                }
            };
        }
    })
;
function $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement) {
    const [side, align = 'center'] = placement.split('-');
    return [
        side,
        align
    ];
}
const $cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9 = $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9;
const $cf1ac5d9fe0e8206$export$b688253958b8dfe7 = $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d;
const $cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2 = $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc;
const $cf1ac5d9fe0e8206$export$21b07c8f274aebd5 = $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0;





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 3151:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ $f1701beae083dbae$export$602eac185826482c)
/* harmony export */ });
/* unused harmony export Root */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(668);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8704);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3979);









/* -------------------------------------------------------------------------------------------------
 * Portal
 * -----------------------------------------------------------------------------------------------*/ const $f1701beae083dbae$var$PORTAL_NAME = 'Portal';
const $f1701beae083dbae$export$602eac185826482c = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, forwardedRef)=>{
    var _globalThis$document;
    const { container: container = globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.body , ...portalProps } = props;
    return container ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__/* .Primitive */ .WV.div, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)({}, portalProps, {
        ref: forwardedRef
    })), container) : null;
});
/*#__PURE__*/ Object.assign($f1701beae083dbae$export$602eac185826482c, {
    displayName: $f1701beae083dbae$var$PORTAL_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $f1701beae083dbae$export$be92b6f5f03c0fe9 = (/* unused pure expression or super */ null && ($f1701beae083dbae$export$602eac185826482c));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 3979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WV: () => (/* binding */ $8927f6f2acc4f386$export$250ffa63cdc0d034),
/* harmony export */   jH: () => (/* binding */ $8927f6f2acc4f386$export$6d1a0317bde7de7f)
/* harmony export */ });
/* unused harmony export Root */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(668);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8704);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1085);









const $8927f6f2acc4f386$var$NODES = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul'
]; // Temporary while we await merge of this fix:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/55396
// prettier-ignore
/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/ const $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node)=>{
    const Node = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, forwardedRef)=>{
        const { asChild: asChild , ...primitiveProps } = props;
        const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_2__/* .Slot */ .g7 : node;
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
            window[Symbol.for('radix-ui')] = true;
        }, []);
        return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Comp, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)({}, primitiveProps, {
            ref: forwardedRef
        }));
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});
/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/ /**
 * Flush custom event dispatch
 * https://github.com/radix-ui/primitives/pull/1378
 *
 * React batches *all* event handlers since version 18, this introduces certain considerations when using custom event types.
 *
 * Internally, React prioritises events in the following order:
 *  - discrete
 *  - continuous
 *  - default
 *
 * https://github.com/facebook/react/blob/a8a4742f1c54493df00da648a3f9d26e3db9c8b5/packages/react-dom/src/events/ReactDOMEventListener.js#L294-L350
 *
 * `discrete` is an  important distinction as updates within these events are applied immediately.
 * React however, is not able to infer the priority of custom event types due to how they are detected internally.
 * Because of this, it's possible for updates from custom events to be unexpectedly batched when
 * dispatched by another `discrete` event.
 *
 * In order to ensure that updates from custom events are applied predictably, we need to manually flush the batch.
 * This utility should be used when dispatching a custom event from within another `discrete` event, this utility
 * is not nessesary when dispatching known event types, or if dispatching a custom type inside a non-discrete event.
 * For example:
 *
 * dispatching a known click 👎
 * target.dispatchEvent(new Event(‘click’))
 *
 * dispatching a custom type within a non-discrete event 👎
 * onScroll={(event) => event.target.dispatchEvent(new CustomEvent(‘customType’))}
 *
 * dispatching a custom type within a `discrete` event 👍
 * onPointerDown={(event) => dispatchDiscreteCustomEvent(event.target, new CustomEvent(‘customType’))}
 *
 * Note: though React classifies `focus`, `focusin` and `focusout` events as `discrete`, it's  not recommended to use
 * this utility with them. This is because it's possible for those handlers to be called implicitly during render
 * e.g. when focus is within a component as it is unmounted, or when managing focus on mount.
 */ function $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event) {
    if (target) (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync)(()=>target.dispatchEvent(event)
    );
}
/* -----------------------------------------------------------------------------------------------*/ const $8927f6f2acc4f386$export$be92b6f5f03c0fe9 = (/* unused pure expression or super */ null && ($8927f6f2acc4f386$export$250ffa63cdc0d034));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 1085:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g7: () => (/* binding */ $5e63c961fc1ce211$export$8c6ed5c666ac1360)
/* harmony export */ });
/* unused harmony exports Slottable, Root */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(668);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(880);







/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$8c6ed5c666ac1360 = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
    const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
    if (slottable) {
        // the new element to render is the one passed as a child of `Slottable`
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child)=>{
            if (child === slottable) {
                // because the new element will be the one rendered, we are only interested
                // in grabbing its children (`newElement.props.children`)
                if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement) > 1) return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null);
                return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(newElement) ? newElement.props.children : null;
            } else return child;
        });
        return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)($5e63c961fc1ce211$var$SlotClone, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({}, slotProps, {
            ref: forwardedRef
        }), /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(newElement) ? /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(newElement, undefined, newChildren) : null);
    }
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)($5e63c961fc1ce211$var$SlotClone, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({}, slotProps, {
        ref: forwardedRef
    }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = 'Slot';
/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$var$SlotClone = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    if (/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(children)) return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children, {
        ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
        ref: forwardedRef ? (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__/* .composeRefs */ .F)(forwardedRef, children.ref) : children.ref
    });
    return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = 'SlotClone';
/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children: children  })=>{
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
};
/* ---------------------------------------------------------------------------------------------- */ function $5e63c961fc1ce211$var$isSlottable(child) {
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
    // all child props should override
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) overrideProps[propName] = (...args)=>{
                childPropValue(...args);
                slotPropValue(...args);
            };
            else if (slotPropValue) overrideProps[propName] = slotPropValue;
        } else if (propName === 'style') overrideProps[propName] = {
            ...slotPropValue,
            ...childPropValue
        };
        else if (propName === 'className') overrideProps[propName] = [
            slotPropValue,
            childPropValue
        ].filter(Boolean).join(' ');
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
const $5e63c961fc1ce211$export$be92b6f5f03c0fe9 = (/* unused pure expression or super */ null && ($5e63c961fc1ce211$export$8c6ed5c666ac1360));





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 2285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ $b1b2314f5f9a1d84$export$25bec8c6f54ee79a)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);



/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */ function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
    const callbackRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(callback);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        callbackRef.current = callback;
    }); // https://github.com/facebook/react/issues/19240
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>(...args)=>{
            var _callbackRef$current;
            return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
        }
    , []);
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 3408:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ $71cd76cc60e0454e$export$6f32135080cb4c3)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2285);





function $71cd76cc60e0454e$export$6f32135080cb4c3({ prop: prop , defaultProp: defaultProp , onChange: onChange = ()=>{}  }) {
    const [uncontrolledProp, setUncontrolledProp] = $71cd76cc60e0454e$var$useUncontrolledState({
        defaultProp: defaultProp,
        onChange: onChange
    });
    const isControlled = prop !== undefined;
    const value1 = isControlled ? prop : uncontrolledProp;
    const handleChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .W)(onChange);
    const setValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((nextValue)=>{
        if (isControlled) {
            const setter = nextValue;
            const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
            if (value !== prop) handleChange(value);
        } else setUncontrolledProp(nextValue);
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        handleChange
    ]);
    return [
        value1,
        setValue
    ];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp: defaultProp , onChange: onChange  }) {
    const uncontrolledState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
    const handleChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .W)(onChange);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (prevValueRef.current !== value) {
            handleChange(value);
            prevValueRef.current = value;
        }
    }, [
        value,
        prevValueRef,
        handleChange
    ]);
    return uncontrolledState;
}





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 5852:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ $9f79659886946c16$export$e5c5a5f917a5871c)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);



/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */ const $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : ()=>{};





//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 1971:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ cva)
/* harmony export */ });
/* unused harmony export cx */
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(566);

const falsyToString = (value)=>typeof value === "boolean" ? "".concat(value) : value === 0 ? "0" : value;
const cx = clsx__WEBPACK_IMPORTED_MODULE_0__/* .clsx */ .W;
const cva = (base, config)=>{
    return (props)=>{
        var ref;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants , defaultVariants  } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (ref = config.compoundVariants) === null || ref === void 0 ? void 0 : ref.reduce((acc, param1)=>{
            let { class: cvClass , className: cvClassName , ...compoundVariantOptions } = param1;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
};


//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ 566:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ clsx)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (clsx)));

/***/ }),

/***/ 9610:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* binding */ twMerge)
});

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/class-utils.mjs
var CLASS_PART_SEPARATOR = '-';
function createClassUtils(config) {
  var classMap = createClassMap(config);
  var conflictingClassGroups = config.conflictingClassGroups,
    _config$conflictingCl = config.conflictingClassGroupModifiers,
    conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
  function getClassGroupId(className) {
    var classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
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
  return classPartObject.validators.find(function (_ref) {
    var validator = _ref.validator;
    return validator(classRest);
  })?.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    var property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
}
/**
 * Exported for testing only
 */
function createClassMap(config) {
  var theme = config.theme,
    prefix = config.prefix;
  var classMap = {
    nextPart: new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(function (_ref2) {
    var classGroupId = _ref2[0],
      classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(function (classDefinition) {
    if (typeof classDefinition === 'string') {
      var classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
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
    Object.entries(classDefinition).forEach(function (_ref3) {
      var key = _ref3[0],
        classGroup = _ref3[1];
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function (pathPart) {
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
  return classGroupEntries.map(function (_ref4) {
    var classGroupId = _ref4[0],
      classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function (classDefinition) {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(function (_ref5) {
          var key = _ref5[0],
            value = _ref5[1];
          return [prefix + key, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
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
var IMPORTANT_MODIFIER = '!';
function createSplitModifiers(config) {
  var separator = config.separator || ':';
  var isSeparatorSingleCharacter = separator.length === 1;
  var firstSeparatorCharacter = separator[0];
  var separatorLength = separator.length;
  // splitModifiers inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  return function splitModifiers(className) {
    var modifiers = [];
    var bracketDepth = 0;
    var modifierStart = 0;
    var postfixModifierPosition;
    for (var index = 0; index < className.length; index++) {
      var currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
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
 */
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function (modifier) {
    var isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
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
  var splitModifiers = configUtils.splitModifiers,
    getClassGroupId = configUtils.getClassGroupId,
    getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  var classGroupsInConflict = new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(function (originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName),
      modifiers = _splitModifiers.modifiers,
      hasImportantModifier = _splitModifiers.hasImportantModifier,
      baseClassName = _splitModifiers.baseClassName,
      maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
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
    var variantModifier = sortModifiers(modifiers).join(':');
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId: modifierId,
      classGroupId: classGroupId,
      originalClassName: originalClassName,
      hasPostfixModifier: hasPostfixModifier
    };
  }).reverse()
  // Last class in conflict wins, so we need to filter conflicting classes in reverse order.
  .filter(function (parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId,
      classGroupId = parsed.classGroupId,
      hasPostfixModifier = parsed.hasPostfixModifier;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function (group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function (parsed) {
    return parsed.originalClassName;
  }).join(' ');
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
 */
function twJoin() {
  var index = 0;
  var argument;
  var resolvedValue;
  var string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === 'string') {
    return mix;
  }
  var resolvedValue;
  var string = '';
  for (var k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}


//# sourceMappingURL=tw-join.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/create-tailwind-merge.mjs




function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    var firstCreateConfig = createConfig[0],
      restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function (previousConfig, createConfigCurrent) {
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
var stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
// Shadow always begins with x and y offset separated by underscore
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, 'length', isLengthOnly);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, 'size', isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, 'position', isNever);
}
function isArbitraryUrl(value) {
  return getIsArbitraryValue(value, 'url', isUrl);
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, 'number', isNumber);
}
/**
 * @deprecated Will be removed in next major version. Use `isArbitraryNumber` instead.
 */
var isArbitraryWeight = (/* unused pure expression or super */ null && (isArbitraryNumber));
function isNumber(value) {
  return !Number.isNaN(Number(value));
}
function isPercent(value) {
  return value.endsWith('%') && isNumber(value.slice(0, -1));
}
function isInteger(value) {
  return isIntegerOnly(value) || getIsArbitraryValue(value, 'number', isIntegerOnly);
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
  return getIsArbitraryValue(value, '', isShadow);
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
  return value.startsWith('url(');
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
  var colors = fromTheme('colors');
  var spacing = fromTheme('spacing');
  var blur = fromTheme('blur');
  var brightness = fromTheme('brightness');
  var borderColor = fromTheme('borderColor');
  var borderRadius = fromTheme('borderRadius');
  var borderSpacing = fromTheme('borderSpacing');
  var borderWidth = fromTheme('borderWidth');
  var contrast = fromTheme('contrast');
  var grayscale = fromTheme('grayscale');
  var hueRotate = fromTheme('hueRotate');
  var invert = fromTheme('invert');
  var gap = fromTheme('gap');
  var gradientColorStops = fromTheme('gradientColorStops');
  var gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  var inset = fromTheme('inset');
  var margin = fromTheme('margin');
  var opacity = fromTheme('opacity');
  var padding = fromTheme('padding');
  var saturate = fromTheme('saturate');
  var scale = fromTheme('scale');
  var sepia = fromTheme('sepia');
  var skew = fromTheme('skew');
  var space = fromTheme('space');
  var translate = fromTheme('translate');
  var getOverscroll = function getOverscroll() {
    return ['auto', 'contain', 'none'];
  };
  var getOverflow = function getOverflow() {
    return ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  };
  var getSpacingWithAutoAndArbitrary = function getSpacingWithAutoAndArbitrary() {
    return ['auto', isArbitraryValue, spacing];
  };
  var getSpacingWithArbitrary = function getSpacingWithArbitrary() {
    return [isArbitraryValue, spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty() {
    return ['', isLength];
  };
  var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary() {
    return ['auto', isNumber, isArbitraryValue];
  };
  var getPositions = function getPositions() {
    return ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  };
  var getLineStyles = function getLineStyles() {
    return ['solid', 'dashed', 'dotted', 'double', 'none'];
  };
  var getBlendModes = function getBlendModes() {
    return ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'plus-lighter'];
  };
  var getAlign = function getAlign() {
    return ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  };
  var getZeroAndEmpty = function getZeroAndEmpty() {
    return ['', '0', isArbitraryValue];
  };
  var getBreaks = function getBreaks() {
    return ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  };
  var getNumber = function getNumber() {
    return [isNumber, isArbitraryNumber];
  };
  var getNumberAndArbitrary = function getNumberAndArbitrary() {
    return [isNumber, isArbitraryValue];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmpty(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
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
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{
        "float": ['right', 'left', 'none']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal'].concat(getAlign())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal'].concat(getAlign(), ['baseline'])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [].concat(getAlign(), ['baseline'])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': ['min', 'max', 'fit', isArbitraryValue, isLength]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': ['0', 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryValue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': ['min', 'max', 'fit', isArbitraryValue, isLength]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isArbitraryValue, isLength]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [].concat(getLineStyles(), ['wavy'])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isArbitraryValue, isLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{
        "break": ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryUrl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [].concat(getLineStyles(), ['hidden'])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: [''].concat(getLineStyles())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isArbitraryValue, isLength]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmpty()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ['appearance-none'],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'pinch-zoom', 'manipulation', {
          pan: ['x', 'left', 'right', 'y', 'up', 'down']
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only']
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
}


//# sourceMappingURL=default-config.mjs.map

;// CONCATENATED MODULE: ./node_modules/tailwind-merge/dist/lib/tw-merge.mjs



var twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);


//# sourceMappingURL=tw-merge.mjs.map


/***/ }),

/***/ 6158:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

};
;