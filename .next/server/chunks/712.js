exports.id = 712;
exports.ids = [712];
exports.modules = {

/***/ 9365:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5375));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 273))

/***/ }),

/***/ 5375:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ main)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./src/components/mode-toggle.tsx + 1 modules
var mode_toggle = __webpack_require__(6162);
// EXTERNAL MODULE: ./node_modules/@clerk/clerk-react/dist/esm/index.js + 57 modules
var esm = __webpack_require__(3758);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./node_modules/react-content-loader/dist/react-content-loader.cjs.js
var react_content_loader_cjs = __webpack_require__(965);
;// CONCATENATED MODULE: ./src/components/shared/loader/loader.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

const Loader = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex gap-5 justify-center w-4/5 py-5 px-14 h-screen",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_content_loader_cjs/* Instagram */.mr, {
                className: "animate-pulse dark:bg-special-600",
                animate: true,
                animateBegin: "1"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_content_loader_cjs/* Instagram */.mr, {
                className: "animate-pulse dark:bg-special-600",
                animate: true,
                animateBegin: "2"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_content_loader_cjs/* Instagram */.mr, {
                className: "animate-pulse dark:bg-special-600",
                animate: true,
                animateBegin: "3"
            })
        ]
    });
};
/* harmony default export */ const loader = (Loader);

;// CONCATENATED MODULE: ./src/app/(dashboard)/component/main.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




const Main = ({ children })=>{
    const { user } = (0,esm/* useUser */.aF)();
    const [isLoading, setIsLoading] = (0,react_.useState)(true);
    const handleLoading = ()=>setIsLoading(false);
    (0,react_.useEffect)(()=>{
        handleLoading();
    }, [
        isLoading
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
        children: [
            isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(loader, {}) : null,
            !isLoading ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: "w-4/5 py-5 px-14 h-screen overflow-auto",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "flex items-center space-x-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: "font-semibold",
                                    children: "Student: KI-STD-01"
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex items-center gap-5",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                        children: user?.fullName || user?.username
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(esm/* UserButton */.l8, {
                                        afterSignOutUrl: "/",
                                        userProfileUrl: "/profile"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(mode_toggle.ModeToggle, {})
                                ]
                            })
                        ]
                    }),
                    children
                ]
            }) : null
        ]
    });
};
/* harmony default export */ const main = (Main);


/***/ }),

/***/ 273:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ sidebar)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./src/components/ui/input.tsx
var input = __webpack_require__(6679);
// EXTERNAL MODULE: ./node_modules/react-icons/go/index.esm.js
var index_esm = __webpack_require__(7632);
// EXTERNAL MODULE: ./node_modules/react-icons/md/index.esm.js
var md_index_esm = __webpack_require__(7625);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/layout-dashboard.js
var layout_dashboard = __webpack_require__(7849);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/book.js
var book = __webpack_require__(9116);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-out.js
var log_out = __webpack_require__(92);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/settings.js
var settings = __webpack_require__(5987);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js
var fa_index_esm = __webpack_require__(3500);
;// CONCATENATED MODULE: ./src/data/menus.ts







const statusBar = [
    {
        name: "Course",
        icon: fa_index_esm/* FaSchool */.VI
    },
    {
        name: "Post",
        icon: md_index_esm/* MdArticle */.GTW
    },
    {
        name: "Task",
        icon: fa_index_esm/* FaTasks */.qGN
    },
    {
        name: "Announcement",
        icon: index_esm/* GoInfo */.hQB
    }
];
const sideBarMenus = [
    {
        name: "Dashboard",
        icon: layout_dashboard/* default */.Z,
        link: "/student/dashboard"
    },
    {
        name: "Courses",
        icon: book/* default */.Z,
        link: "/student/courses"
    },
    {
        name: "Assessment",
        icon: md_index_esm/* MdAssessment */.VCi,
        link: "/student/assessment"
    },
    {
        name: "Tasks",
        icon: fa_index_esm/* FaTasks */.qGN,
        link: "/student/tasks"
    },
    {
        name: "Posts",
        icon: md_index_esm/* MdArticle */.GTW,
        link: "/student/posts"
    }
];
const adminSideBar = [
    {
        name: "Dashboard",
        icon: layout_dashboard/* default */.Z,
        link: "/admin"
    },
    {
        name: "Users",
        icon: md_index_esm/* MdPerson */.Vyx,
        link: "/admin/users"
    },
    {
        name: "Roles",
        icon: md_index_esm/* MdBadge */.d6R,
        link: "/admin/roles"
    },
    {
        name: "Posts",
        icon: md_index_esm/* MdArticle */.GTW,
        link: "/admin/post"
    },
    {
        name: "Courses",
        icon: index_esm/* GoFileDirectory */.l$O,
        link: "#course"
    }
];
const tutorSidebar = [
    {
        name: "Dashboard",
        icon: layout_dashboard/* default */.Z,
        link: "/tutor"
    },
    {
        name: "Courses",
        icon: index_esm/* GoFileDirectory */.l$O,
        link: "/tutor/course"
    },
    {
        name: "Assessment",
        icon: md_index_esm/* MdAssessment */.VCi,
        link: "/tutor/assessment"
    },
    {
        name: "Tasks",
        icon: md_index_esm/* MdTaskAlt */.ZnX,
        link: "/tutor/task"
    },
    {
        name: "Posts",
        icon: md_index_esm/* MdArticle */.GTW,
        link: "/tutor/post"
    },
    {
        name: "Events",
        icon: md_index_esm/* MdEvent */.mbS,
        link: "#event"
    }
];
const sideFooter = [
    {
        name: "Account",
        icon: settings/* default */.Z,
        link: "/account"
    },
    {
        name: "Logout",
        icon: log_out/* default */.Z,
        link: "/api/auth/signout"
    }
];
const headMenu = [
    {
        name: "My Account",
        link: "/account",
        icon: ""
    },
    {
        name: "Help",
        link: "#accounts/settings",
        icon: ""
    },
    {
        name: "SignOut",
        link: "/api/auth/signout",
        icon: ""
    }
];
const headMenuA = [
    {
        name: "My Account",
        link: "/account",
        icon: ""
    },
    {
        name: "Help",
        link: "#accounts/settings",
        icon: ""
    },
    {
        name: "SignOut",
        link: "/api/auth/signout",
        icon: ""
    }
];
const headMenuT = [
    {
        name: "My Account",
        link: "/account",
        icon: ""
    },
    {
        name: "Help",
        link: "#accounts/settings",
        icon: ""
    },
    {
        name: "SignOut",
        link: "/api/auth/signout",
        icon: ""
    }
];
const courseMenuItems = [
    {
        name: "Home",
        link: "/course/"
    },
    {
        name: "Announcement",
        link: "/announcement/"
    },
    {
        name: "Materials",
        link: "/materials/"
    },
    {
        name: "Modules",
        link: "/modules/"
    },
    {
        name: "Grade",
        link: "/grades/"
    },
    {
        name: "Quiz",
        link: "/quiz/"
    },
    {
        name: "Reports",
        link: "/reports/"
    }
];

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/search.js
var search = __webpack_require__(9518);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/app/(dashboard)/component/logo.tsx

const Logo = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("span", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
            viewBox: "0 0 430 135",
            preserveAspectRatio: "xMidYMid meet",
            className: "w-full h-full",
            id: "faebffdc",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("defs", {
                    id: "SvgjsDefs1001",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                            id: "SvgjsLinearGradient1015",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                    id: "SvgjsStop1016",
                                    stopColor: "#7f00ff",
                                    offset: "0"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                    id: "SvgjsStop1017",
                                    stopColor: "#e100ff",
                                    offset: "1"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                            id: "SvgjsLinearGradient1018",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                    id: "SvgjsStop1019",
                                    stopColor: "#7f00ff",
                                    offset: "0"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                    id: "SvgjsStop1020",
                                    stopColor: "#e100ff",
                                    offset: "1"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                            id: "SvgjsLinearGradient1021",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                    id: "SvgjsStop1022",
                                    stopColor: "#7f00ff",
                                    offset: "0"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                    id: "SvgjsStop1023",
                                    stopColor: "#e100ff",
                                    offset: "1"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("g", {
                    id: "SvgjsG1007",
                    transform: "matrix(1,0,0,1,20,20)",
                    //   fill="#111"
                    className: "fill-special-500",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("rect", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "110",
                        height: "115",
                        rx: "10",
                        ry: "10"
                    })
                }, "symbolContainer"),
                /*#__PURE__*/ jsx_runtime_.jsx("g", {
                    id: "SvgjsG1008",
                    transform: "matrix(1.789745689462628,0,0,1.789745689462628,32.13532054546919,7.596655111559677)",
                    //   fill="#fff"
                    className: "fill-special-100",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M12.158 18.104999999999997 l0 41.895 l-7.7637 0 l0 -41.895 l7.7637 0 z M41.631 18.104999999999997 l-17.871 19.541 l19.746 22.354 l-10.752 0 l-16.201 -19.57 l0 -5.0391 l15.586 -17.285 l9.4922 0 z"
                    })
                }, "monogramFeature-0"),
                /*#__PURE__*/ jsx_runtime_.jsx("g", {
                    id: "SvgjsG1009",
                    transform: "matrix(0.9286283172002369,0,0,0.9286283172002369,147.4369851891767,38.00799097630242)",
                    //   fill="#111"
                    className: "dark:fill-special-100 fill-special-500",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M9.04 11.440000000000001 l0 11.84 l11.16 -11.84 l7.84 0 l-11.16 11.28 l12.24 17.28 l-7.88 0 l-8.6 -12.84 l-3.6 3.64 l0 9.2 l-6.28 0 l0 -28.56 l6.28 0 z M44.44 10.760000000000002 c4.2132 0 7.6068 1.4 10.18 4.2 s3.86 6.4268 3.86 10.88 c0 4.3468 -1.2933 7.9068 -3.88 10.68 s-5.9732 4.16 -10.16 4.16 c-4.2132 0 -7.6068 -1.3867 -10.18 -4.16 s-3.86 -6.3332 -3.86 -10.68 c0 -4.4268 1.2933 -8.0468 3.88 -10.86 s5.9732 -4.22 10.16 -4.22 z M36.68 25.84 c0 2.88 0.67996 5.1932 2.04 6.94 s3.2667 2.62 5.72 2.62 c2.4 0 4.2932 -0.86 5.68 -2.58 s2.08 -4.0468 2.08 -6.98 c0 -3.0667 -0.68668 -5.4668 -2.06 -7.2 s-3.2866 -2.6 -5.74 -2.6 c-2.4 0 -4.2868 0.86668 -5.66 2.6 s-2.06 4.1332 -2.06 7.2 z M75 11.440000000000001 c4.0532 0 7.24 1.2533 9.56 3.76 s3.48 5.96 3.48 10.36 c0 4.56 -1.1667 8.1068 -3.5 10.64 s-5.46 3.8 -9.38 3.8 l-12.4 0 l0 -28.56 l12.24 0 z M74.6 34.72 c2.2667 0 4.0268 -0.74668 5.28 -2.24 s1.88 -3.6133 1.88 -6.36 c0 -3.1467 -0.67332 -5.5 -2.02 -7.06 s-3.42 -2.34 -6.22 -2.34 l-4.48 0 l0 18 l5.56 0 z M113.76 11.440000000000001 l0 5.28 l-15.08 0 l0 6.12 l13.84 0 l0 4.88 l-13.84 0 l0 7 l15.4 0 l0 5.28 l-21.68 0 l0 -28.56 l21.36 0 z M124.6 11.440000000000001 l0 28.56 l-6.28 0 l0 -28.56 l6.28 0 z M136.36 11.440000000000001 l11.92 19.16 l0.08 0 l0 -19.16 l5.88 0 l0 28.56 l-6.28 0 l-11.88 -19.12 l-0.08 0 l0 19.12 l-5.88 0 l0 -28.56 l6.24 0 z M169.6 10.760000000000002 c3.4933 0 6.2732 0.80004 8.34 2.4 s3.1 3.8667 3.1 6.8 l-6.08 0 c-0.08 -1.44 -0.56668 -2.52 -1.46 -3.24 s-2.2733 -1.08 -4.14 -1.08 c-1.3067 0 -2.36 0.28668 -3.16 0.86 s-1.2 1.3666 -1.2 2.38 c0 0.82668 0.24668 1.4267 0.74 1.8 s1.1933 0.70664 2.1 0.99996 s2.4934 0.72 4.76 1.28 c2.3733 0.58668 4.2 1.2267 5.48 1.92 s2.2533 1.58 2.92 2.66 s1 2.4067 1 3.98 c0 1.8133 -0.48 3.4266 -1.44 4.84 s-2.36 2.4866 -4.2 3.22 s-3.92 1.1 -6.24 1.1 c-3.5467 0 -6.46 -0.88668 -8.74 -2.66 s-3.42 -4.2068 -3.42 -7.3 l0 -0.2 l6.08 0 c0 1.68 0.57332 2.98 1.72 3.9 s2.6667 1.38 4.56 1.38 c1.68 0 3.0333 -0.3 4.06 -0.9 s1.54 -1.4867 1.54 -2.66 c0 -0.77332 -0.28 -1.4266 -0.84 -1.96 s-1.3067 -0.96664 -2.24 -1.3 s-2.5066 -0.75332 -4.72 -1.26 c-2.56 -0.64 -4.4268 -1.32 -5.6 -2.04 s-2.0666 -1.5933 -2.68 -2.62 s-0.92 -2.26 -0.92 -3.7 c0 -1.7867 0.51332 -3.3467 1.54 -4.68 s2.3667 -2.32 4.02 -2.96 s3.36 -0.96 5.12 -0.96 z M198.64000000000001 11.440000000000001 c3.04 0 5.44 0.82668 7.2 2.48 s2.64 3.88 2.64 6.68 c0 2.8267 -0.88 5.06 -2.64 6.7 s-4.1468 2.46 -7.16 2.46 l-6.68 0 l0 10.24 l-6.28 0 l0 -28.56 l12.92 0 z M197 24.880000000000003 c1.8133 0 3.1667 -0.33332 4.06 -1 s1.34 -1.76 1.34 -3.28 c0 -1.4667 -0.43332 -2.5467 -1.3 -3.24 s-2.22 -1.04 -4.06 -1.04 l-5.04 0 l0 8.56 l5 0 z M218.68 11.440000000000001 l0 28.56 l-6.28 0 l0 -28.56 l6.28 0 z M239.60000000000002 11.440000000000001 c2.4 0 4.3936 0.74 5.98 2.22 s2.38 3.3667 2.38 5.66 c0 3.5733 -1.5067 5.96 -4.52 7.16 l0 0.08 c1.0133 0.29332 1.8066 0.78 2.38 1.46 s1.0066 1.4733 1.3 2.38 s0.48 2.36 0.56 4.36 c0.10668 2.6133 0.48 4.36 1.12 5.24 l-6.28 0 c-0.34668 -0.88 -0.61336 -2.5333 -0.80004 -4.96 c-0.21332 -2.56 -0.68 -4.2332 -1.4 -5.02 s-1.8933 -1.18 -3.52 -1.18 l-6.32 0 l0 11.16 l-6.28 0 l0 -28.56 l15.4 0 z M237.40000000000003 24.36 c1.3333 0 2.38 -0.3 3.14 -0.9 s1.14 -1.66 1.14 -3.18 c0 -1.44 -0.37332 -2.46 -1.12 -3.06 s-1.8134 -0.9 -3.2 -0.9 l-6.88 0 l0 8.04 l6.92 0 z M274.44 11.440000000000001 l0 5.28 l-15.08 0 l0 6.12 l13.84 0 l0 4.88 l-13.84 0 l0 7 l15.4 0 l0 5.28 l-21.68 0 l0 -28.56 l21.36 0 z M291.24 11.440000000000001 c4.0532 0 7.24 1.2533 9.56 3.76 s3.48 5.96 3.48 10.36 c0 4.56 -1.1667 8.1068 -3.5 10.64 s-5.46 3.8 -9.38 3.8 l-12.4 0 l0 -28.56 l12.24 0 z M290.84000000000003 34.72 c2.2667 0 4.0268 -0.74668 5.28 -2.24 s1.88 -3.6133 1.88 -6.36 c0 -3.1467 -0.67332 -5.5 -2.02 -7.06 s-3.42 -2.34 -6.22 -2.34 l-4.48 0 l0 18 l5.56 0 z"
                    })
                }, "nameFeature-0"),
                /*#__PURE__*/ jsx_runtime_.jsx("g", {
                    id: "SvgjsG1010",
                    transform: "matrix(1.40532020510693,0,0,1.40532020510693,148.06065829118074,78.43937713569858)",
                    //   fill="#111"
                    className: "dark:fill-special-100 fill-special-500",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M4.52 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M10.4 5.720000000000001 l5.96 9.58 l0.04 0 l0 -9.58 l2.94 0 l0 14.28 l-3.14 0 l-5.94 -9.56 l-0.04 0 l0 9.56 l-2.94 0 l0 -14.28 l3.12 0 z M27.02 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M41.540000000000006 5.720000000000001 c1.52 0 2.72 0.41334 3.6 1.24 s1.32 1.94 1.32 3.34 c0 1.4133 -0.44 2.53 -1.32 3.35 s-2.0734 1.23 -3.58 1.23 l-3.34 0 l0 5.12 l-3.14 0 l0 -14.28 l6.46 0 z M40.72 12.440000000000001 c0.90666 0 1.5833 -0.16666 2.03 -0.5 s0.67 -0.88 0.67 -1.64 c0 -0.73334 -0.21666 -1.2733 -0.65 -1.62 s-1.11 -0.52 -2.03 -0.52 l-2.52 0 l0 4.28 l2.5 0 z M51.56 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M62.02 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M60.92 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M79.44000000000001 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M87.84 5.720000000000001 c2.0266 0 3.62 0.62666 4.78 1.88 s1.74 2.98 1.74 5.18 c0 2.28 -0.58334 4.0534 -1.75 5.32 s-2.73 1.9 -4.69 1.9 l-6.2 0 l0 -14.28 l6.12 0 z M87.64 17.36 c1.1333 0 2.0134 -0.37334 2.64 -1.12 s0.94 -1.8067 0.94 -3.18 c0 -1.5733 -0.33666 -2.75 -1.01 -3.53 s-1.71 -1.17 -3.11 -1.17 l-2.24 0 l0 9 l2.78 0 z"
                    })
                }, "sloganFeature-0")
            ]
        })
    });
};
/* harmony default export */ const logo = (Logo);

;// CONCATENATED MODULE: ./src/app/(dashboard)/component/sidebar.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





const SideBar = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col gap-2 w-1/4 max-w-[300px] bg-gray-50 dark:bg-special-600 dark:text-gray-200 h-screen overflow-hidden px-5 pt-5",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(logo, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "relative py-5",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(input/* Input */.I, {
                        type: "search",
                        className: "dark:bg-special-500"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(search/* default */.Z, {
                        className: "absolute top-7 right-2 text-gray-500"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("menu", {
                children: sideBarMenus.map((menu, i)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: menu.link,
                        className: "flex gap-4 px-1 py-2 dark:hover:bg-gray-600 hover:bg-gray-200 w-full rounded-md cursor-pointer",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(menu.icon, {
                                    className: "",
                                    size: 24
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "",
                                children: menu.name
                            })
                        ]
                    }, i * Date.now()))
            })
        ]
    });
};
/* harmony default export */ const sidebar = (SideBar);


/***/ }),

/***/ 6679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2019);



const Input = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        type: type,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    });
});
Input.displayName = "Input";



/***/ }),

/***/ 9176:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1363);
;// CONCATENATED MODULE: ./src/app/(dashboard)/component/main.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/home/abiola/Documents/www/project/lms-app/src/app/(dashboard)/component/main.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const main = (__default__);
;// CONCATENATED MODULE: ./src/app/(dashboard)/component/sidebar.tsx

const sidebar_proxy = (0,module_proxy.createProxy)(String.raw`/home/abiola/Documents/www/project/lms-app/src/app/(dashboard)/component/sidebar.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: sidebar_esModule, $$typeof: sidebar_$$typeof } = sidebar_proxy;
const sidebar_default_ = sidebar_proxy.default;


/* harmony default export */ const sidebar = (sidebar_default_);
;// CONCATENATED MODULE: ./src/app/(dashboard)/student/layout.tsx



const metadata = {
    title: "Dashboard",
    description: "Leaning Management System"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(sidebar, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(main, {
                        children: children
                    })
                ]
            })
        })
    });
}


/***/ })

};
;