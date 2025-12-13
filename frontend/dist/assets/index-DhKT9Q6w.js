(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ta(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var pp={exports:{}},mo={},fp={exports:{}},ie={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xi=Symbol.for("react.element"),zm=Symbol.for("react.portal"),_m=Symbol.for("react.fragment"),Im=Symbol.for("react.strict_mode"),Pm=Symbol.for("react.profiler"),Tm=Symbol.for("react.provider"),Am=Symbol.for("react.context"),Mm=Symbol.for("react.forward_ref"),Rm=Symbol.for("react.suspense"),Lm=Symbol.for("react.memo"),Dm=Symbol.for("react.lazy"),Zc=Symbol.iterator;function Om(e){return e===null||typeof e!="object"?null:(e=Zc&&e[Zc]||e["@@iterator"],typeof e=="function"?e:null)}var hp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},mp=Object.assign,gp={};function Xr(e,t,n){this.props=e,this.context=t,this.refs=gp,this.updater=n||hp}Xr.prototype.isReactComponent={};Xr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function xp(){}xp.prototype=Xr.prototype;function Aa(e,t,n){this.props=e,this.context=t,this.refs=gp,this.updater=n||hp}var Ma=Aa.prototype=new xp;Ma.constructor=Aa;mp(Ma,Xr.prototype);Ma.isPureReactComponent=!0;var eu=Array.isArray,yp=Object.prototype.hasOwnProperty,Ra={current:null},bp={key:!0,ref:!0,__self:!0,__source:!0};function vp(e,t,n){var r,i={},s=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(s=""+t.key),t)yp.call(t,r)&&!bp.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Xi,type:e,key:s,ref:l,props:i,_owner:Ra.current}}function Fm(e,t){return{$$typeof:Xi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function La(e){return typeof e=="object"&&e!==null&&e.$$typeof===Xi}function Bm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var tu=/\/+/g;function Oo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Bm(""+e.key):t.toString(36)}function Ns(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Xi:case zm:l=!0}}if(l)return l=e,i=i(l),e=r===""?"."+Oo(l,0):r,eu(i)?(n="",e!=null&&(n=e.replace(tu,"$&/")+"/"),Ns(i,t,n,"",function(u){return u})):i!=null&&(La(i)&&(i=Fm(i,n+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(tu,"$&/")+"/")+e)),t.push(i)),1;if(l=0,r=r===""?".":r+":",eu(e))for(var a=0;a<e.length;a++){s=e[a];var c=r+Oo(s,a);l+=Ns(s,t,n,c,i)}else if(c=Om(e),typeof c=="function")for(e=c.call(e),a=0;!(s=e.next()).done;)s=s.value,c=r+Oo(s,a++),l+=Ns(s,t,n,c,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function ss(e,t,n){if(e==null)return e;var r=[],i=0;return Ns(e,r,"","",function(s){return t.call(n,s,i++)}),r}function Um(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var pt={current:null},Es={transition:null},Hm={ReactCurrentDispatcher:pt,ReactCurrentBatchConfig:Es,ReactCurrentOwner:Ra};function wp(){throw Error("act(...) is not supported in production builds of React.")}ie.Children={map:ss,forEach:function(e,t,n){ss(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ss(e,function(){t++}),t},toArray:function(e){return ss(e,function(t){return t})||[]},only:function(e){if(!La(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ie.Component=Xr;ie.Fragment=_m;ie.Profiler=Pm;ie.PureComponent=Aa;ie.StrictMode=Im;ie.Suspense=Rm;ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hm;ie.act=wp;ie.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=mp({},e.props),i=e.key,s=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,l=Ra.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(c in t)yp.call(t,c)&&!bp.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&a!==void 0?a[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var u=0;u<c;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:Xi,type:e.type,key:i,ref:s,props:r,_owner:l}};ie.createContext=function(e){return e={$$typeof:Am,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Tm,_context:e},e.Consumer=e};ie.createElement=vp;ie.createFactory=function(e){var t=vp.bind(null,e);return t.type=e,t};ie.createRef=function(){return{current:null}};ie.forwardRef=function(e){return{$$typeof:Mm,render:e}};ie.isValidElement=La;ie.lazy=function(e){return{$$typeof:Dm,_payload:{_status:-1,_result:e},_init:Um}};ie.memo=function(e,t){return{$$typeof:Lm,type:e,compare:t===void 0?null:t}};ie.startTransition=function(e){var t=Es.transition;Es.transition={};try{e()}finally{Es.transition=t}};ie.unstable_act=wp;ie.useCallback=function(e,t){return pt.current.useCallback(e,t)};ie.useContext=function(e){return pt.current.useContext(e)};ie.useDebugValue=function(){};ie.useDeferredValue=function(e){return pt.current.useDeferredValue(e)};ie.useEffect=function(e,t){return pt.current.useEffect(e,t)};ie.useId=function(){return pt.current.useId()};ie.useImperativeHandle=function(e,t,n){return pt.current.useImperativeHandle(e,t,n)};ie.useInsertionEffect=function(e,t){return pt.current.useInsertionEffect(e,t)};ie.useLayoutEffect=function(e,t){return pt.current.useLayoutEffect(e,t)};ie.useMemo=function(e,t){return pt.current.useMemo(e,t)};ie.useReducer=function(e,t,n){return pt.current.useReducer(e,t,n)};ie.useRef=function(e){return pt.current.useRef(e)};ie.useState=function(e){return pt.current.useState(e)};ie.useSyncExternalStore=function(e,t,n){return pt.current.useSyncExternalStore(e,t,n)};ie.useTransition=function(){return pt.current.useTransition()};ie.version="18.3.1";fp.exports=ie;var P=fp.exports;const $m=Ta(P);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vm=P,Wm=Symbol.for("react.element"),qm=Symbol.for("react.fragment"),Ym=Object.prototype.hasOwnProperty,Qm=Vm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Gm={key:!0,ref:!0,__self:!0,__source:!0};function kp(e,t,n){var r,i={},s=null,l=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)Ym.call(t,r)&&!Gm.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Wm,type:e,key:s,ref:l,props:i,_owner:Qm.current}}mo.Fragment=qm;mo.jsx=kp;mo.jsxs=kp;pp.exports=mo;var o=pp.exports,zl={},jp={exports:{}},At={},Sp={exports:{}},Cp={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(L,q){var y=L.length;L.push(q);e:for(;0<y;){var K=y-1>>>1,re=L[K];if(0<i(re,q))L[K]=q,L[y]=re,y=K;else break e}}function n(L){return L.length===0?null:L[0]}function r(L){if(L.length===0)return null;var q=L[0],y=L.pop();if(y!==q){L[0]=y;e:for(var K=0,re=L.length,v=re>>>1;K<v;){var oe=2*(K+1)-1,Re=L[oe],ce=oe+1,Ge=L[ce];if(0>i(Re,y))ce<re&&0>i(Ge,Re)?(L[K]=Ge,L[ce]=y,K=ce):(L[K]=Re,L[oe]=y,K=oe);else if(ce<re&&0>i(Ge,y))L[K]=Ge,L[ce]=y,K=ce;else break e}}return q}function i(L,q){var y=L.sortIndex-q.sortIndex;return y!==0?y:L.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var l=Date,a=l.now();e.unstable_now=function(){return l.now()-a}}var c=[],u=[],d=1,p=null,h=3,f=!1,k=!1,C=!1,A=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(L){for(var q=n(u);q!==null;){if(q.callback===null)r(u);else if(q.startTime<=L)r(u),q.sortIndex=q.expirationTime,t(c,q);else break;q=n(u)}}function b(L){if(C=!1,x(L),!k)if(n(c)!==null)k=!0,ae(j);else{var q=n(u);q!==null&&se(b,q.startTime-L)}}function j(L,q){k=!1,C&&(C=!1,g(_),_=-1),f=!0;var y=h;try{for(x(q),p=n(c);p!==null&&(!(p.expirationTime>q)||L&&!B());){var K=p.callback;if(typeof K=="function"){p.callback=null,h=p.priorityLevel;var re=K(p.expirationTime<=q);q=e.unstable_now(),typeof re=="function"?p.callback=re:p===n(c)&&r(c),x(q)}else r(c);p=n(c)}if(p!==null)var v=!0;else{var oe=n(u);oe!==null&&se(b,oe.startTime-q),v=!1}return v}finally{p=null,h=y,f=!1}}var w=!1,E=null,_=-1,W=5,D=-1;function B(){return!(e.unstable_now()-D<W)}function U(){if(E!==null){var L=e.unstable_now();D=L;var q=!0;try{q=E(!0,L)}finally{q?G():(w=!1,E=null)}}else w=!1}var G;if(typeof m=="function")G=function(){m(U)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,Z=de.port2;de.port1.onmessage=U,G=function(){Z.postMessage(null)}}else G=function(){A(U,0)};function ae(L){E=L,w||(w=!0,G())}function se(L,q){_=A(function(){L(e.unstable_now())},q)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(L){L.callback=null},e.unstable_continueExecution=function(){k||f||(k=!0,ae(j))},e.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<L?Math.floor(1e3/L):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(L){switch(h){case 1:case 2:case 3:var q=3;break;default:q=h}var y=h;h=q;try{return L()}finally{h=y}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(L,q){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var y=h;h=L;try{return q()}finally{h=y}},e.unstable_scheduleCallback=function(L,q,y){var K=e.unstable_now();switch(typeof y=="object"&&y!==null?(y=y.delay,y=typeof y=="number"&&0<y?K+y:K):y=K,L){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=y+re,L={id:d++,callback:q,priorityLevel:L,startTime:y,expirationTime:re,sortIndex:-1},y>K?(L.sortIndex=y,t(u,L),n(c)===null&&L===n(u)&&(C?(g(_),_=-1):C=!0,se(b,y-K))):(L.sortIndex=re,t(c,L),k||f||(k=!0,ae(j))),L},e.unstable_shouldYield=B,e.unstable_wrapCallback=function(L){var q=h;return function(){var y=h;h=q;try{return L.apply(this,arguments)}finally{h=y}}}})(Cp);Sp.exports=Cp;var Km=Sp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xm=P,Tt=Km;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Np=new Set,Ai={};function hr(e,t){Vr(e,t),Vr(e+"Capture",t)}function Vr(e,t){for(Ai[e]=t,e=0;e<t.length;e++)Np.add(t[e])}var vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_l=Object.prototype.hasOwnProperty,Jm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,nu={},ru={};function Zm(e){return _l.call(ru,e)?!0:_l.call(nu,e)?!1:Jm.test(e)?ru[e]=!0:(nu[e]=!0,!1)}function eg(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tg(e,t,n,r){if(t===null||typeof t>"u"||eg(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ft(e,t,n,r,i,s,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=l}var et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){et[e]=new ft(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];et[t]=new ft(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){et[e]=new ft(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){et[e]=new ft(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){et[e]=new ft(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){et[e]=new ft(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){et[e]=new ft(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){et[e]=new ft(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){et[e]=new ft(e,5,!1,e.toLowerCase(),null,!1,!1)});var Da=/[\-:]([a-z])/g;function Oa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Da,Oa);et[t]=new ft(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Da,Oa);et[t]=new ft(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Da,Oa);et[t]=new ft(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){et[e]=new ft(e,1,!1,e.toLowerCase(),null,!1,!1)});et.xlinkHref=new ft("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){et[e]=new ft(e,1,!1,e.toLowerCase(),null,!0,!0)});function Fa(e,t,n,r){var i=et.hasOwnProperty(t)?et[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(tg(t,n,i,r)&&(n=null),r||i===null?Zm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Sn=Xm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,os=Symbol.for("react.element"),Sr=Symbol.for("react.portal"),Cr=Symbol.for("react.fragment"),Ba=Symbol.for("react.strict_mode"),Il=Symbol.for("react.profiler"),Ep=Symbol.for("react.provider"),zp=Symbol.for("react.context"),Ua=Symbol.for("react.forward_ref"),Pl=Symbol.for("react.suspense"),Tl=Symbol.for("react.suspense_list"),Ha=Symbol.for("react.memo"),_n=Symbol.for("react.lazy"),_p=Symbol.for("react.offscreen"),iu=Symbol.iterator;function ii(e){return e===null||typeof e!="object"?null:(e=iu&&e[iu]||e["@@iterator"],typeof e=="function"?e:null)}var Te=Object.assign,Fo;function xi(e){if(Fo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fo=t&&t[1]||""}return`
`+Fo+e}var Bo=!1;function Uo(e,t){if(!e||Bo)return"";Bo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),s=r.stack.split(`
`),l=i.length-1,a=s.length-1;1<=l&&0<=a&&i[l]!==s[a];)a--;for(;1<=l&&0<=a;l--,a--)if(i[l]!==s[a]){if(l!==1||a!==1)do if(l--,a--,0>a||i[l]!==s[a]){var c=`
`+i[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=a);break}}}finally{Bo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?xi(e):""}function ng(e){switch(e.tag){case 5:return xi(e.type);case 16:return xi("Lazy");case 13:return xi("Suspense");case 19:return xi("SuspenseList");case 0:case 2:case 15:return e=Uo(e.type,!1),e;case 11:return e=Uo(e.type.render,!1),e;case 1:return e=Uo(e.type,!0),e;default:return""}}function Al(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Cr:return"Fragment";case Sr:return"Portal";case Il:return"Profiler";case Ba:return"StrictMode";case Pl:return"Suspense";case Tl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case zp:return(e.displayName||"Context")+".Consumer";case Ep:return(e._context.displayName||"Context")+".Provider";case Ua:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ha:return t=e.displayName||null,t!==null?t:Al(e.type)||"Memo";case _n:t=e._payload,e=e._init;try{return Al(e(t))}catch{}}return null}function rg(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Al(t);case 8:return t===Ba?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function $n(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ip(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ig(e){var t=Ip(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){r=""+l,s.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ls(e){e._valueTracker||(e._valueTracker=ig(e))}function Pp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ip(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Us(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ml(e,t){var n=t.checked;return Te({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function su(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=$n(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Tp(e,t){t=t.checked,t!=null&&Fa(e,"checked",t,!1)}function Rl(e,t){Tp(e,t);var n=$n(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ll(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ll(e,t.type,$n(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ou(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ll(e,t,n){(t!=="number"||Us(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var yi=Array.isArray;function Lr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+$n(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Dl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return Te({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function lu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(T(92));if(yi(n)){if(1<n.length)throw Error(T(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:$n(n)}}function Ap(e,t){var n=$n(t.value),r=$n(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function au(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Mp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ol(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Mp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var as,Rp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(as=as||document.createElement("div"),as.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=as.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mi(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var wi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},sg=["Webkit","ms","Moz","O"];Object.keys(wi).forEach(function(e){sg.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),wi[t]=wi[e]})});function Lp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||wi.hasOwnProperty(e)&&wi[e]?(""+t).trim():t+"px"}function Dp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Lp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var og=Te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fl(e,t){if(t){if(og[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function Bl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ul=null;function $a(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Hl=null,Dr=null,Or=null;function cu(e){if(e=es(e)){if(typeof Hl!="function")throw Error(T(280));var t=e.stateNode;t&&(t=vo(t),Hl(e.stateNode,e.type,t))}}function Op(e){Dr?Or?Or.push(e):Or=[e]:Dr=e}function Fp(){if(Dr){var e=Dr,t=Or;if(Or=Dr=null,cu(e),t)for(e=0;e<t.length;e++)cu(t[e])}}function Bp(e,t){return e(t)}function Up(){}var Ho=!1;function Hp(e,t,n){if(Ho)return e(t,n);Ho=!0;try{return Bp(e,t,n)}finally{Ho=!1,(Dr!==null||Or!==null)&&(Up(),Fp())}}function Ri(e,t){var n=e.stateNode;if(n===null)return null;var r=vo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(T(231,t,typeof n));return n}var $l=!1;if(vn)try{var si={};Object.defineProperty(si,"passive",{get:function(){$l=!0}}),window.addEventListener("test",si,si),window.removeEventListener("test",si,si)}catch{$l=!1}function lg(e,t,n,r,i,s,l,a,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var ki=!1,Hs=null,$s=!1,Vl=null,ag={onError:function(e){ki=!0,Hs=e}};function cg(e,t,n,r,i,s,l,a,c){ki=!1,Hs=null,lg.apply(ag,arguments)}function ug(e,t,n,r,i,s,l,a,c){if(cg.apply(this,arguments),ki){if(ki){var u=Hs;ki=!1,Hs=null}else throw Error(T(198));$s||($s=!0,Vl=u)}}function mr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function $p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function uu(e){if(mr(e)!==e)throw Error(T(188))}function dg(e){var t=e.alternate;if(!t){if(t=mr(e),t===null)throw Error(T(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return uu(i),e;if(s===r)return uu(i),t;s=s.sibling}throw Error(T(188))}if(n.return!==r.return)n=i,r=s;else{for(var l=!1,a=i.child;a;){if(a===n){l=!0,n=i,r=s;break}if(a===r){l=!0,r=i,n=s;break}a=a.sibling}if(!l){for(a=s.child;a;){if(a===n){l=!0,n=s,r=i;break}if(a===r){l=!0,r=s,n=i;break}a=a.sibling}if(!l)throw Error(T(189))}}if(n.alternate!==r)throw Error(T(190))}if(n.tag!==3)throw Error(T(188));return n.stateNode.current===n?e:t}function Vp(e){return e=dg(e),e!==null?Wp(e):null}function Wp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Wp(e);if(t!==null)return t;e=e.sibling}return null}var qp=Tt.unstable_scheduleCallback,du=Tt.unstable_cancelCallback,pg=Tt.unstable_shouldYield,fg=Tt.unstable_requestPaint,Me=Tt.unstable_now,hg=Tt.unstable_getCurrentPriorityLevel,Va=Tt.unstable_ImmediatePriority,Yp=Tt.unstable_UserBlockingPriority,Vs=Tt.unstable_NormalPriority,mg=Tt.unstable_LowPriority,Qp=Tt.unstable_IdlePriority,go=null,sn=null;function gg(e){if(sn&&typeof sn.onCommitFiberRoot=="function")try{sn.onCommitFiberRoot(go,e,void 0,(e.current.flags&128)===128)}catch{}}var Gt=Math.clz32?Math.clz32:bg,xg=Math.log,yg=Math.LN2;function bg(e){return e>>>=0,e===0?32:31-(xg(e)/yg|0)|0}var cs=64,us=4194304;function bi(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ws(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,l=n&268435455;if(l!==0){var a=l&~i;a!==0?r=bi(a):(s&=l,s!==0&&(r=bi(s)))}else l=n&~i,l!==0?r=bi(l):s!==0&&(r=bi(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Gt(t),i=1<<n,r|=e[n],t&=~i;return r}function vg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wg(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Gt(s),a=1<<l,c=i[l];c===-1?(!(a&n)||a&r)&&(i[l]=vg(a,t)):c<=t&&(e.expiredLanes|=a),s&=~a}}function Wl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Gp(){var e=cs;return cs<<=1,!(cs&4194240)&&(cs=64),e}function $o(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ji(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Gt(t),e[t]=n}function kg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Gt(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function Wa(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Gt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var me=0;function Kp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Xp,qa,Jp,Zp,ef,ql=!1,ds=[],Rn=null,Ln=null,Dn=null,Li=new Map,Di=new Map,Pn=[],jg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function pu(e,t){switch(e){case"focusin":case"focusout":Rn=null;break;case"dragenter":case"dragleave":Ln=null;break;case"mouseover":case"mouseout":Dn=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Di.delete(t.pointerId)}}function oi(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=es(t),t!==null&&qa(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Sg(e,t,n,r,i){switch(t){case"focusin":return Rn=oi(Rn,e,t,n,r,i),!0;case"dragenter":return Ln=oi(Ln,e,t,n,r,i),!0;case"mouseover":return Dn=oi(Dn,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return Li.set(s,oi(Li.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Di.set(s,oi(Di.get(s)||null,e,t,n,r,i)),!0}return!1}function tf(e){var t=ir(e.target);if(t!==null){var n=mr(t);if(n!==null){if(t=n.tag,t===13){if(t=$p(n),t!==null){e.blockedOn=t,ef(e.priority,function(){Jp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function zs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Yl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ul=r,n.target.dispatchEvent(r),Ul=null}else return t=es(n),t!==null&&qa(t),e.blockedOn=n,!1;t.shift()}return!0}function fu(e,t,n){zs(e)&&n.delete(t)}function Cg(){ql=!1,Rn!==null&&zs(Rn)&&(Rn=null),Ln!==null&&zs(Ln)&&(Ln=null),Dn!==null&&zs(Dn)&&(Dn=null),Li.forEach(fu),Di.forEach(fu)}function li(e,t){e.blockedOn===t&&(e.blockedOn=null,ql||(ql=!0,Tt.unstable_scheduleCallback(Tt.unstable_NormalPriority,Cg)))}function Oi(e){function t(i){return li(i,e)}if(0<ds.length){li(ds[0],e);for(var n=1;n<ds.length;n++){var r=ds[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Rn!==null&&li(Rn,e),Ln!==null&&li(Ln,e),Dn!==null&&li(Dn,e),Li.forEach(t),Di.forEach(t),n=0;n<Pn.length;n++)r=Pn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Pn.length&&(n=Pn[0],n.blockedOn===null);)tf(n),n.blockedOn===null&&Pn.shift()}var Fr=Sn.ReactCurrentBatchConfig,qs=!0;function Ng(e,t,n,r){var i=me,s=Fr.transition;Fr.transition=null;try{me=1,Ya(e,t,n,r)}finally{me=i,Fr.transition=s}}function Eg(e,t,n,r){var i=me,s=Fr.transition;Fr.transition=null;try{me=4,Ya(e,t,n,r)}finally{me=i,Fr.transition=s}}function Ya(e,t,n,r){if(qs){var i=Yl(e,t,n,r);if(i===null)Zo(e,t,r,Ys,n),pu(e,r);else if(Sg(i,e,t,n,r))r.stopPropagation();else if(pu(e,r),t&4&&-1<jg.indexOf(e)){for(;i!==null;){var s=es(i);if(s!==null&&Xp(s),s=Yl(e,t,n,r),s===null&&Zo(e,t,r,Ys,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Zo(e,t,r,null,n)}}var Ys=null;function Yl(e,t,n,r){if(Ys=null,e=$a(r),e=ir(e),e!==null)if(t=mr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=$p(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ys=e,null}function nf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hg()){case Va:return 1;case Yp:return 4;case Vs:case mg:return 16;case Qp:return 536870912;default:return 16}default:return 16}}var An=null,Qa=null,_s=null;function rf(){if(_s)return _s;var e,t=Qa,n=t.length,r,i="value"in An?An.value:An.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===i[s-r];r++);return _s=i.slice(e,1<r?1-r:void 0)}function Is(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ps(){return!0}function hu(){return!1}function Mt(e){function t(n,r,i,s,l){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=l,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ps:hu,this.isPropagationStopped=hu,this}return Te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ps)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ps)},persist:function(){},isPersistent:ps}),t}var Jr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ga=Mt(Jr),Zi=Te({},Jr,{view:0,detail:0}),zg=Mt(Zi),Vo,Wo,ai,xo=Te({},Zi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ka,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ai&&(ai&&e.type==="mousemove"?(Vo=e.screenX-ai.screenX,Wo=e.screenY-ai.screenY):Wo=Vo=0,ai=e),Vo)},movementY:function(e){return"movementY"in e?e.movementY:Wo}}),mu=Mt(xo),_g=Te({},xo,{dataTransfer:0}),Ig=Mt(_g),Pg=Te({},Zi,{relatedTarget:0}),qo=Mt(Pg),Tg=Te({},Jr,{animationName:0,elapsedTime:0,pseudoElement:0}),Ag=Mt(Tg),Mg=Te({},Jr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Rg=Mt(Mg),Lg=Te({},Jr,{data:0}),gu=Mt(Lg),Dg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Og={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Bg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Fg[e])?!!t[e]:!1}function Ka(){return Bg}var Ug=Te({},Zi,{key:function(e){if(e.key){var t=Dg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Is(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Og[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ka,charCode:function(e){return e.type==="keypress"?Is(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Is(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Hg=Mt(Ug),$g=Te({},xo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xu=Mt($g),Vg=Te({},Zi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ka}),Wg=Mt(Vg),qg=Te({},Jr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yg=Mt(qg),Qg=Te({},xo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Gg=Mt(Qg),Kg=[9,13,27,32],Xa=vn&&"CompositionEvent"in window,ji=null;vn&&"documentMode"in document&&(ji=document.documentMode);var Xg=vn&&"TextEvent"in window&&!ji,sf=vn&&(!Xa||ji&&8<ji&&11>=ji),yu=" ",bu=!1;function of(e,t){switch(e){case"keyup":return Kg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Nr=!1;function Jg(e,t){switch(e){case"compositionend":return lf(t);case"keypress":return t.which!==32?null:(bu=!0,yu);case"textInput":return e=t.data,e===yu&&bu?null:e;default:return null}}function Zg(e,t){if(Nr)return e==="compositionend"||!Xa&&of(e,t)?(e=rf(),_s=Qa=An=null,Nr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return sf&&t.locale!=="ko"?null:t.data;default:return null}}var e0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!e0[e.type]:t==="textarea"}function af(e,t,n,r){Op(r),t=Qs(t,"onChange"),0<t.length&&(n=new Ga("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Si=null,Fi=null;function t0(e){bf(e,0)}function yo(e){var t=_r(e);if(Pp(t))return e}function n0(e,t){if(e==="change")return t}var cf=!1;if(vn){var Yo;if(vn){var Qo="oninput"in document;if(!Qo){var wu=document.createElement("div");wu.setAttribute("oninput","return;"),Qo=typeof wu.oninput=="function"}Yo=Qo}else Yo=!1;cf=Yo&&(!document.documentMode||9<document.documentMode)}function ku(){Si&&(Si.detachEvent("onpropertychange",uf),Fi=Si=null)}function uf(e){if(e.propertyName==="value"&&yo(Fi)){var t=[];af(t,Fi,e,$a(e)),Hp(t0,t)}}function r0(e,t,n){e==="focusin"?(ku(),Si=t,Fi=n,Si.attachEvent("onpropertychange",uf)):e==="focusout"&&ku()}function i0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return yo(Fi)}function s0(e,t){if(e==="click")return yo(t)}function o0(e,t){if(e==="input"||e==="change")return yo(t)}function l0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Xt=typeof Object.is=="function"?Object.is:l0;function Bi(e,t){if(Xt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!_l.call(t,i)||!Xt(e[i],t[i]))return!1}return!0}function ju(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Su(e,t){var n=ju(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ju(n)}}function df(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?df(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function pf(){for(var e=window,t=Us();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Us(e.document)}return t}function Ja(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function a0(e){var t=pf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&df(n.ownerDocument.documentElement,n)){if(r!==null&&Ja(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=Su(n,s);var l=Su(n,r);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var c0=vn&&"documentMode"in document&&11>=document.documentMode,Er=null,Ql=null,Ci=null,Gl=!1;function Cu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Gl||Er==null||Er!==Us(r)||(r=Er,"selectionStart"in r&&Ja(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ci&&Bi(Ci,r)||(Ci=r,r=Qs(Ql,"onSelect"),0<r.length&&(t=new Ga("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Er)))}function fs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var zr={animationend:fs("Animation","AnimationEnd"),animationiteration:fs("Animation","AnimationIteration"),animationstart:fs("Animation","AnimationStart"),transitionend:fs("Transition","TransitionEnd")},Go={},ff={};vn&&(ff=document.createElement("div").style,"AnimationEvent"in window||(delete zr.animationend.animation,delete zr.animationiteration.animation,delete zr.animationstart.animation),"TransitionEvent"in window||delete zr.transitionend.transition);function bo(e){if(Go[e])return Go[e];if(!zr[e])return e;var t=zr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ff)return Go[e]=t[n];return e}var hf=bo("animationend"),mf=bo("animationiteration"),gf=bo("animationstart"),xf=bo("transitionend"),yf=new Map,Nu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Wn(e,t){yf.set(e,t),hr(t,[e])}for(var Ko=0;Ko<Nu.length;Ko++){var Xo=Nu[Ko],u0=Xo.toLowerCase(),d0=Xo[0].toUpperCase()+Xo.slice(1);Wn(u0,"on"+d0)}Wn(hf,"onAnimationEnd");Wn(mf,"onAnimationIteration");Wn(gf,"onAnimationStart");Wn("dblclick","onDoubleClick");Wn("focusin","onFocus");Wn("focusout","onBlur");Wn(xf,"onTransitionEnd");Vr("onMouseEnter",["mouseout","mouseover"]);Vr("onMouseLeave",["mouseout","mouseover"]);Vr("onPointerEnter",["pointerout","pointerover"]);Vr("onPointerLeave",["pointerout","pointerover"]);hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var vi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p0=new Set("cancel close invalid load scroll toggle".split(" ").concat(vi));function Eu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,ug(r,t,void 0,e),e.currentTarget=null}function bf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var l=r.length-1;0<=l;l--){var a=r[l],c=a.instance,u=a.currentTarget;if(a=a.listener,c!==s&&i.isPropagationStopped())break e;Eu(i,a,u),s=c}else for(l=0;l<r.length;l++){if(a=r[l],c=a.instance,u=a.currentTarget,a=a.listener,c!==s&&i.isPropagationStopped())break e;Eu(i,a,u),s=c}}}if($s)throw e=Vl,$s=!1,Vl=null,e}function Ee(e,t){var n=t[ea];n===void 0&&(n=t[ea]=new Set);var r=e+"__bubble";n.has(r)||(vf(t,e,2,!1),n.add(r))}function Jo(e,t,n){var r=0;t&&(r|=4),vf(n,e,r,t)}var hs="_reactListening"+Math.random().toString(36).slice(2);function Ui(e){if(!e[hs]){e[hs]=!0,Np.forEach(function(n){n!=="selectionchange"&&(p0.has(n)||Jo(n,!1,e),Jo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hs]||(t[hs]=!0,Jo("selectionchange",!1,t))}}function vf(e,t,n,r){switch(nf(t)){case 1:var i=Ng;break;case 4:i=Eg;break;default:i=Ya}n=i.bind(null,t,n,e),i=void 0,!$l||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Zo(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(l===4)for(l=r.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;l=l.return}for(;a!==null;){if(l=ir(a),l===null)return;if(c=l.tag,c===5||c===6){r=s=l;continue e}a=a.parentNode}}r=r.return}Hp(function(){var u=s,d=$a(n),p=[];e:{var h=yf.get(e);if(h!==void 0){var f=Ga,k=e;switch(e){case"keypress":if(Is(n)===0)break e;case"keydown":case"keyup":f=Hg;break;case"focusin":k="focus",f=qo;break;case"focusout":k="blur",f=qo;break;case"beforeblur":case"afterblur":f=qo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=mu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=Ig;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=Wg;break;case hf:case mf:case gf:f=Ag;break;case xf:f=Yg;break;case"scroll":f=zg;break;case"wheel":f=Gg;break;case"copy":case"cut":case"paste":f=Rg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=xu}var C=(t&4)!==0,A=!C&&e==="scroll",g=C?h!==null?h+"Capture":null:h;C=[];for(var m=u,x;m!==null;){x=m;var b=x.stateNode;if(x.tag===5&&b!==null&&(x=b,g!==null&&(b=Ri(m,g),b!=null&&C.push(Hi(m,b,x)))),A)break;m=m.return}0<C.length&&(h=new f(h,k,null,n,d),p.push({event:h,listeners:C}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",h&&n!==Ul&&(k=n.relatedTarget||n.fromElement)&&(ir(k)||k[wn]))break e;if((f||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,f?(k=n.relatedTarget||n.toElement,f=u,k=k?ir(k):null,k!==null&&(A=mr(k),k!==A||k.tag!==5&&k.tag!==6)&&(k=null)):(f=null,k=u),f!==k)){if(C=mu,b="onMouseLeave",g="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(C=xu,b="onPointerLeave",g="onPointerEnter",m="pointer"),A=f==null?h:_r(f),x=k==null?h:_r(k),h=new C(b,m+"leave",f,n,d),h.target=A,h.relatedTarget=x,b=null,ir(d)===u&&(C=new C(g,m+"enter",k,n,d),C.target=x,C.relatedTarget=A,b=C),A=b,f&&k)t:{for(C=f,g=k,m=0,x=C;x;x=kr(x))m++;for(x=0,b=g;b;b=kr(b))x++;for(;0<m-x;)C=kr(C),m--;for(;0<x-m;)g=kr(g),x--;for(;m--;){if(C===g||g!==null&&C===g.alternate)break t;C=kr(C),g=kr(g)}C=null}else C=null;f!==null&&zu(p,h,f,C,!1),k!==null&&A!==null&&zu(p,A,k,C,!0)}}e:{if(h=u?_r(u):window,f=h.nodeName&&h.nodeName.toLowerCase(),f==="select"||f==="input"&&h.type==="file")var j=n0;else if(vu(h))if(cf)j=o0;else{j=i0;var w=r0}else(f=h.nodeName)&&f.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(j=s0);if(j&&(j=j(e,u))){af(p,j,n,d);break e}w&&w(e,h,u),e==="focusout"&&(w=h._wrapperState)&&w.controlled&&h.type==="number"&&Ll(h,"number",h.value)}switch(w=u?_r(u):window,e){case"focusin":(vu(w)||w.contentEditable==="true")&&(Er=w,Ql=u,Ci=null);break;case"focusout":Ci=Ql=Er=null;break;case"mousedown":Gl=!0;break;case"contextmenu":case"mouseup":case"dragend":Gl=!1,Cu(p,n,d);break;case"selectionchange":if(c0)break;case"keydown":case"keyup":Cu(p,n,d)}var E;if(Xa)e:{switch(e){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else Nr?of(e,n)&&(_="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(sf&&n.locale!=="ko"&&(Nr||_!=="onCompositionStart"?_==="onCompositionEnd"&&Nr&&(E=rf()):(An=d,Qa="value"in An?An.value:An.textContent,Nr=!0)),w=Qs(u,_),0<w.length&&(_=new gu(_,e,null,n,d),p.push({event:_,listeners:w}),E?_.data=E:(E=lf(n),E!==null&&(_.data=E)))),(E=Xg?Jg(e,n):Zg(e,n))&&(u=Qs(u,"onBeforeInput"),0<u.length&&(d=new gu("onBeforeInput","beforeinput",null,n,d),p.push({event:d,listeners:u}),d.data=E))}bf(p,t)})}function Hi(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qs(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Ri(e,n),s!=null&&r.unshift(Hi(e,s,i)),s=Ri(e,t),s!=null&&r.push(Hi(e,s,i))),e=e.return}return r}function kr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function zu(e,t,n,r,i){for(var s=t._reactName,l=[];n!==null&&n!==r;){var a=n,c=a.alternate,u=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&u!==null&&(a=u,i?(c=Ri(n,s),c!=null&&l.unshift(Hi(n,c,a))):i||(c=Ri(n,s),c!=null&&l.push(Hi(n,c,a)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var f0=/\r\n?/g,h0=/\u0000|\uFFFD/g;function _u(e){return(typeof e=="string"?e:""+e).replace(f0,`
`).replace(h0,"")}function ms(e,t,n){if(t=_u(t),_u(e)!==t&&n)throw Error(T(425))}function Gs(){}var Kl=null,Xl=null;function Jl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Zl=typeof setTimeout=="function"?setTimeout:void 0,m0=typeof clearTimeout=="function"?clearTimeout:void 0,Iu=typeof Promise=="function"?Promise:void 0,g0=typeof queueMicrotask=="function"?queueMicrotask:typeof Iu<"u"?function(e){return Iu.resolve(null).then(e).catch(x0)}:Zl;function x0(e){setTimeout(function(){throw e})}function el(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Oi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Oi(t)}function On(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Pu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Zr=Math.random().toString(36).slice(2),nn="__reactFiber$"+Zr,$i="__reactProps$"+Zr,wn="__reactContainer$"+Zr,ea="__reactEvents$"+Zr,y0="__reactListeners$"+Zr,b0="__reactHandles$"+Zr;function ir(e){var t=e[nn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wn]||n[nn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Pu(e);e!==null;){if(n=e[nn])return n;e=Pu(e)}return t}e=n,n=e.parentNode}return null}function es(e){return e=e[nn]||e[wn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function _r(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function vo(e){return e[$i]||null}var ta=[],Ir=-1;function qn(e){return{current:e}}function ze(e){0>Ir||(e.current=ta[Ir],ta[Ir]=null,Ir--)}function je(e,t){Ir++,ta[Ir]=e.current,e.current=t}var Vn={},ot=qn(Vn),yt=qn(!1),cr=Vn;function Wr(e,t){var n=e.type.contextTypes;if(!n)return Vn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function bt(e){return e=e.childContextTypes,e!=null}function Ks(){ze(yt),ze(ot)}function Tu(e,t,n){if(ot.current!==Vn)throw Error(T(168));je(ot,t),je(yt,n)}function wf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(T(108,rg(e)||"Unknown",i));return Te({},n,r)}function Xs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Vn,cr=ot.current,je(ot,e),je(yt,yt.current),!0}function Au(e,t,n){var r=e.stateNode;if(!r)throw Error(T(169));n?(e=wf(e,t,cr),r.__reactInternalMemoizedMergedChildContext=e,ze(yt),ze(ot),je(ot,e)):ze(yt),je(yt,n)}var mn=null,wo=!1,tl=!1;function kf(e){mn===null?mn=[e]:mn.push(e)}function v0(e){wo=!0,kf(e)}function Yn(){if(!tl&&mn!==null){tl=!0;var e=0,t=me;try{var n=mn;for(me=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}mn=null,wo=!1}catch(i){throw mn!==null&&(mn=mn.slice(e+1)),qp(Va,Yn),i}finally{me=t,tl=!1}}return null}var Pr=[],Tr=0,Js=null,Zs=0,Lt=[],Dt=0,ur=null,gn=1,xn="";function er(e,t){Pr[Tr++]=Zs,Pr[Tr++]=Js,Js=e,Zs=t}function jf(e,t,n){Lt[Dt++]=gn,Lt[Dt++]=xn,Lt[Dt++]=ur,ur=e;var r=gn;e=xn;var i=32-Gt(r)-1;r&=~(1<<i),n+=1;var s=32-Gt(t)+i;if(30<s){var l=i-i%5;s=(r&(1<<l)-1).toString(32),r>>=l,i-=l,gn=1<<32-Gt(t)+i|n<<i|r,xn=s+e}else gn=1<<s|n<<i|r,xn=e}function Za(e){e.return!==null&&(er(e,1),jf(e,1,0))}function ec(e){for(;e===Js;)Js=Pr[--Tr],Pr[Tr]=null,Zs=Pr[--Tr],Pr[Tr]=null;for(;e===ur;)ur=Lt[--Dt],Lt[Dt]=null,xn=Lt[--Dt],Lt[Dt]=null,gn=Lt[--Dt],Lt[Dt]=null}var Pt=null,_t=null,_e=!1,Qt=null;function Sf(e,t){var n=Ft(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Mu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Pt=e,_t=On(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Pt=e,_t=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=ur!==null?{id:gn,overflow:xn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ft(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Pt=e,_t=null,!0):!1;default:return!1}}function na(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ra(e){if(_e){var t=_t;if(t){var n=t;if(!Mu(e,t)){if(na(e))throw Error(T(418));t=On(n.nextSibling);var r=Pt;t&&Mu(e,t)?Sf(r,n):(e.flags=e.flags&-4097|2,_e=!1,Pt=e)}}else{if(na(e))throw Error(T(418));e.flags=e.flags&-4097|2,_e=!1,Pt=e}}}function Ru(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Pt=e}function gs(e){if(e!==Pt)return!1;if(!_e)return Ru(e),_e=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Jl(e.type,e.memoizedProps)),t&&(t=_t)){if(na(e))throw Cf(),Error(T(418));for(;t;)Sf(e,t),t=On(t.nextSibling)}if(Ru(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){_t=On(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}_t=null}}else _t=Pt?On(e.stateNode.nextSibling):null;return!0}function Cf(){for(var e=_t;e;)e=On(e.nextSibling)}function qr(){_t=Pt=null,_e=!1}function tc(e){Qt===null?Qt=[e]:Qt.push(e)}var w0=Sn.ReactCurrentBatchConfig;function ci(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(T(309));var r=n.stateNode}if(!r)throw Error(T(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(l){var a=i.refs;l===null?delete a[s]:a[s]=l},t._stringRef=s,t)}if(typeof e!="string")throw Error(T(284));if(!n._owner)throw Error(T(290,e))}return e}function xs(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Lu(e){var t=e._init;return t(e._payload)}function Nf(e){function t(g,m){if(e){var x=g.deletions;x===null?(g.deletions=[m],g.flags|=16):x.push(m)}}function n(g,m){if(!e)return null;for(;m!==null;)t(g,m),m=m.sibling;return null}function r(g,m){for(g=new Map;m!==null;)m.key!==null?g.set(m.key,m):g.set(m.index,m),m=m.sibling;return g}function i(g,m){return g=Hn(g,m),g.index=0,g.sibling=null,g}function s(g,m,x){return g.index=x,e?(x=g.alternate,x!==null?(x=x.index,x<m?(g.flags|=2,m):x):(g.flags|=2,m)):(g.flags|=1048576,m)}function l(g){return e&&g.alternate===null&&(g.flags|=2),g}function a(g,m,x,b){return m===null||m.tag!==6?(m=al(x,g.mode,b),m.return=g,m):(m=i(m,x),m.return=g,m)}function c(g,m,x,b){var j=x.type;return j===Cr?d(g,m,x.props.children,b,x.key):m!==null&&(m.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===_n&&Lu(j)===m.type)?(b=i(m,x.props),b.ref=ci(g,m,x),b.return=g,b):(b=Ds(x.type,x.key,x.props,null,g.mode,b),b.ref=ci(g,m,x),b.return=g,b)}function u(g,m,x,b){return m===null||m.tag!==4||m.stateNode.containerInfo!==x.containerInfo||m.stateNode.implementation!==x.implementation?(m=cl(x,g.mode,b),m.return=g,m):(m=i(m,x.children||[]),m.return=g,m)}function d(g,m,x,b,j){return m===null||m.tag!==7?(m=ar(x,g.mode,b,j),m.return=g,m):(m=i(m,x),m.return=g,m)}function p(g,m,x){if(typeof m=="string"&&m!==""||typeof m=="number")return m=al(""+m,g.mode,x),m.return=g,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case os:return x=Ds(m.type,m.key,m.props,null,g.mode,x),x.ref=ci(g,null,m),x.return=g,x;case Sr:return m=cl(m,g.mode,x),m.return=g,m;case _n:var b=m._init;return p(g,b(m._payload),x)}if(yi(m)||ii(m))return m=ar(m,g.mode,x,null),m.return=g,m;xs(g,m)}return null}function h(g,m,x,b){var j=m!==null?m.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return j!==null?null:a(g,m,""+x,b);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case os:return x.key===j?c(g,m,x,b):null;case Sr:return x.key===j?u(g,m,x,b):null;case _n:return j=x._init,h(g,m,j(x._payload),b)}if(yi(x)||ii(x))return j!==null?null:d(g,m,x,b,null);xs(g,x)}return null}function f(g,m,x,b,j){if(typeof b=="string"&&b!==""||typeof b=="number")return g=g.get(x)||null,a(m,g,""+b,j);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case os:return g=g.get(b.key===null?x:b.key)||null,c(m,g,b,j);case Sr:return g=g.get(b.key===null?x:b.key)||null,u(m,g,b,j);case _n:var w=b._init;return f(g,m,x,w(b._payload),j)}if(yi(b)||ii(b))return g=g.get(x)||null,d(m,g,b,j,null);xs(m,b)}return null}function k(g,m,x,b){for(var j=null,w=null,E=m,_=m=0,W=null;E!==null&&_<x.length;_++){E.index>_?(W=E,E=null):W=E.sibling;var D=h(g,E,x[_],b);if(D===null){E===null&&(E=W);break}e&&E&&D.alternate===null&&t(g,E),m=s(D,m,_),w===null?j=D:w.sibling=D,w=D,E=W}if(_===x.length)return n(g,E),_e&&er(g,_),j;if(E===null){for(;_<x.length;_++)E=p(g,x[_],b),E!==null&&(m=s(E,m,_),w===null?j=E:w.sibling=E,w=E);return _e&&er(g,_),j}for(E=r(g,E);_<x.length;_++)W=f(E,g,_,x[_],b),W!==null&&(e&&W.alternate!==null&&E.delete(W.key===null?_:W.key),m=s(W,m,_),w===null?j=W:w.sibling=W,w=W);return e&&E.forEach(function(B){return t(g,B)}),_e&&er(g,_),j}function C(g,m,x,b){var j=ii(x);if(typeof j!="function")throw Error(T(150));if(x=j.call(x),x==null)throw Error(T(151));for(var w=j=null,E=m,_=m=0,W=null,D=x.next();E!==null&&!D.done;_++,D=x.next()){E.index>_?(W=E,E=null):W=E.sibling;var B=h(g,E,D.value,b);if(B===null){E===null&&(E=W);break}e&&E&&B.alternate===null&&t(g,E),m=s(B,m,_),w===null?j=B:w.sibling=B,w=B,E=W}if(D.done)return n(g,E),_e&&er(g,_),j;if(E===null){for(;!D.done;_++,D=x.next())D=p(g,D.value,b),D!==null&&(m=s(D,m,_),w===null?j=D:w.sibling=D,w=D);return _e&&er(g,_),j}for(E=r(g,E);!D.done;_++,D=x.next())D=f(E,g,_,D.value,b),D!==null&&(e&&D.alternate!==null&&E.delete(D.key===null?_:D.key),m=s(D,m,_),w===null?j=D:w.sibling=D,w=D);return e&&E.forEach(function(U){return t(g,U)}),_e&&er(g,_),j}function A(g,m,x,b){if(typeof x=="object"&&x!==null&&x.type===Cr&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case os:e:{for(var j=x.key,w=m;w!==null;){if(w.key===j){if(j=x.type,j===Cr){if(w.tag===7){n(g,w.sibling),m=i(w,x.props.children),m.return=g,g=m;break e}}else if(w.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===_n&&Lu(j)===w.type){n(g,w.sibling),m=i(w,x.props),m.ref=ci(g,w,x),m.return=g,g=m;break e}n(g,w);break}else t(g,w);w=w.sibling}x.type===Cr?(m=ar(x.props.children,g.mode,b,x.key),m.return=g,g=m):(b=Ds(x.type,x.key,x.props,null,g.mode,b),b.ref=ci(g,m,x),b.return=g,g=b)}return l(g);case Sr:e:{for(w=x.key;m!==null;){if(m.key===w)if(m.tag===4&&m.stateNode.containerInfo===x.containerInfo&&m.stateNode.implementation===x.implementation){n(g,m.sibling),m=i(m,x.children||[]),m.return=g,g=m;break e}else{n(g,m);break}else t(g,m);m=m.sibling}m=cl(x,g.mode,b),m.return=g,g=m}return l(g);case _n:return w=x._init,A(g,m,w(x._payload),b)}if(yi(x))return k(g,m,x,b);if(ii(x))return C(g,m,x,b);xs(g,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,m!==null&&m.tag===6?(n(g,m.sibling),m=i(m,x),m.return=g,g=m):(n(g,m),m=al(x,g.mode,b),m.return=g,g=m),l(g)):n(g,m)}return A}var Yr=Nf(!0),Ef=Nf(!1),eo=qn(null),to=null,Ar=null,nc=null;function rc(){nc=Ar=to=null}function ic(e){var t=eo.current;ze(eo),e._currentValue=t}function ia(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Br(e,t){to=e,nc=Ar=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(xt=!0),e.firstContext=null)}function Ut(e){var t=e._currentValue;if(nc!==e)if(e={context:e,memoizedValue:t,next:null},Ar===null){if(to===null)throw Error(T(308));Ar=e,to.dependencies={lanes:0,firstContext:e}}else Ar=Ar.next=e;return t}var sr=null;function sc(e){sr===null?sr=[e]:sr.push(e)}function zf(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,sc(t)):(n.next=i.next,i.next=n),t.interleaved=n,kn(e,r)}function kn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var In=!1;function oc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _f(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function yn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Fn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ue&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,kn(e,n)}return i=r.interleaved,i===null?(t.next=t,sc(r)):(t.next=i.next,i.next=t),r.interleaved=t,kn(e,n)}function Ps(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Wa(e,n)}}function Du(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=l:s=s.next=l,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function no(e,t,n,r){var i=e.updateQueue;In=!1;var s=i.firstBaseUpdate,l=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var c=a,u=c.next;c.next=null,l===null?s=u:l.next=u,l=c;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==l&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=c))}if(s!==null){var p=i.baseState;l=0,d=u=c=null,a=s;do{var h=a.lane,f=a.eventTime;if((r&h)===h){d!==null&&(d=d.next={eventTime:f,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var k=e,C=a;switch(h=t,f=n,C.tag){case 1:if(k=C.payload,typeof k=="function"){p=k.call(f,p,h);break e}p=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=C.payload,h=typeof k=="function"?k.call(f,p,h):k,h==null)break e;p=Te({},p,h);break e;case 2:In=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,h=i.effects,h===null?i.effects=[a]:h.push(a))}else f={eventTime:f,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=f,c=p):d=d.next=f,l|=h;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;h=a,a=h.next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}while(!0);if(d===null&&(c=p),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do l|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);pr|=l,e.lanes=l,e.memoizedState=p}}function Ou(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(T(191,i));i.call(r)}}}var ts={},on=qn(ts),Vi=qn(ts),Wi=qn(ts);function or(e){if(e===ts)throw Error(T(174));return e}function lc(e,t){switch(je(Wi,t),je(Vi,e),je(on,ts),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ol(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ol(t,e)}ze(on),je(on,t)}function Qr(){ze(on),ze(Vi),ze(Wi)}function If(e){or(Wi.current);var t=or(on.current),n=Ol(t,e.type);t!==n&&(je(Vi,e),je(on,n))}function ac(e){Vi.current===e&&(ze(on),ze(Vi))}var Ie=qn(0);function ro(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var nl=[];function cc(){for(var e=0;e<nl.length;e++)nl[e]._workInProgressVersionPrimary=null;nl.length=0}var Ts=Sn.ReactCurrentDispatcher,rl=Sn.ReactCurrentBatchConfig,dr=0,Pe=null,Ue=null,Ye=null,io=!1,Ni=!1,qi=0,k0=0;function rt(){throw Error(T(321))}function uc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xt(e[n],t[n]))return!1;return!0}function dc(e,t,n,r,i,s){if(dr=s,Pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ts.current=e===null||e.memoizedState===null?N0:E0,e=n(r,i),Ni){s=0;do{if(Ni=!1,qi=0,25<=s)throw Error(T(301));s+=1,Ye=Ue=null,t.updateQueue=null,Ts.current=z0,e=n(r,i)}while(Ni)}if(Ts.current=so,t=Ue!==null&&Ue.next!==null,dr=0,Ye=Ue=Pe=null,io=!1,t)throw Error(T(300));return e}function pc(){var e=qi!==0;return qi=0,e}function en(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?Pe.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function Ht(){if(Ue===null){var e=Pe.alternate;e=e!==null?e.memoizedState:null}else e=Ue.next;var t=Ye===null?Pe.memoizedState:Ye.next;if(t!==null)Ye=t,Ue=e;else{if(e===null)throw Error(T(310));Ue=e,e={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},Ye===null?Pe.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function Yi(e,t){return typeof t=="function"?t(e):t}function il(e){var t=Ht(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var r=Ue,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var l=i.next;i.next=s.next,s.next=l}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=l=null,c=null,u=s;do{var d=u.lane;if((dr&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var p={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(a=c=p,l=r):c=c.next=p,Pe.lanes|=d,pr|=d}u=u.next}while(u!==null&&u!==s);c===null?l=r:c.next=a,Xt(r,t.memoizedState)||(xt=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,Pe.lanes|=s,pr|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function sl(e){var t=Ht(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var l=i=i.next;do s=e(s,l.action),l=l.next;while(l!==i);Xt(s,t.memoizedState)||(xt=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Pf(){}function Tf(e,t){var n=Pe,r=Ht(),i=t(),s=!Xt(r.memoizedState,i);if(s&&(r.memoizedState=i,xt=!0),r=r.queue,fc(Rf.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||Ye!==null&&Ye.memoizedState.tag&1){if(n.flags|=2048,Qi(9,Mf.bind(null,n,r,i,t),void 0,null),Qe===null)throw Error(T(349));dr&30||Af(n,t,i)}return i}function Af(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Pe.updateQueue,t===null?(t={lastEffect:null,stores:null},Pe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Mf(e,t,n,r){t.value=n,t.getSnapshot=r,Lf(t)&&Df(e)}function Rf(e,t,n){return n(function(){Lf(t)&&Df(e)})}function Lf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xt(e,n)}catch{return!0}}function Df(e){var t=kn(e,1);t!==null&&Kt(t,e,1,-1)}function Fu(e){var t=en();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Yi,lastRenderedState:e},t.queue=e,e=e.dispatch=C0.bind(null,Pe,e),[t.memoizedState,e]}function Qi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Pe.updateQueue,t===null?(t={lastEffect:null,stores:null},Pe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Of(){return Ht().memoizedState}function As(e,t,n,r){var i=en();Pe.flags|=e,i.memoizedState=Qi(1|t,n,void 0,r===void 0?null:r)}function ko(e,t,n,r){var i=Ht();r=r===void 0?null:r;var s=void 0;if(Ue!==null){var l=Ue.memoizedState;if(s=l.destroy,r!==null&&uc(r,l.deps)){i.memoizedState=Qi(t,n,s,r);return}}Pe.flags|=e,i.memoizedState=Qi(1|t,n,s,r)}function Bu(e,t){return As(8390656,8,e,t)}function fc(e,t){return ko(2048,8,e,t)}function Ff(e,t){return ko(4,2,e,t)}function Bf(e,t){return ko(4,4,e,t)}function Uf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Hf(e,t,n){return n=n!=null?n.concat([e]):null,ko(4,4,Uf.bind(null,t,e),n)}function hc(){}function $f(e,t){var n=Ht();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&uc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Vf(e,t){var n=Ht();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&uc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Wf(e,t,n){return dr&21?(Xt(n,t)||(n=Gp(),Pe.lanes|=n,pr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,xt=!0),e.memoizedState=n)}function j0(e,t){var n=me;me=n!==0&&4>n?n:4,e(!0);var r=rl.transition;rl.transition={};try{e(!1),t()}finally{me=n,rl.transition=r}}function qf(){return Ht().memoizedState}function S0(e,t,n){var r=Un(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Yf(e))Qf(t,n);else if(n=zf(e,t,n,r),n!==null){var i=dt();Kt(n,e,r,i),Gf(n,t,r)}}function C0(e,t,n){var r=Un(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Yf(e))Qf(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var l=t.lastRenderedState,a=s(l,n);if(i.hasEagerState=!0,i.eagerState=a,Xt(a,l)){var c=t.interleaved;c===null?(i.next=i,sc(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=zf(e,t,i,r),n!==null&&(i=dt(),Kt(n,e,r,i),Gf(n,t,r))}}function Yf(e){var t=e.alternate;return e===Pe||t!==null&&t===Pe}function Qf(e,t){Ni=io=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Gf(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Wa(e,n)}}var so={readContext:Ut,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useInsertionEffect:rt,useLayoutEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useMutableSource:rt,useSyncExternalStore:rt,useId:rt,unstable_isNewReconciler:!1},N0={readContext:Ut,useCallback:function(e,t){return en().memoizedState=[e,t===void 0?null:t],e},useContext:Ut,useEffect:Bu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,As(4194308,4,Uf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return As(4194308,4,e,t)},useInsertionEffect:function(e,t){return As(4,2,e,t)},useMemo:function(e,t){var n=en();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=en();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=S0.bind(null,Pe,e),[r.memoizedState,e]},useRef:function(e){var t=en();return e={current:e},t.memoizedState=e},useState:Fu,useDebugValue:hc,useDeferredValue:function(e){return en().memoizedState=e},useTransition:function(){var e=Fu(!1),t=e[0];return e=j0.bind(null,e[1]),en().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Pe,i=en();if(_e){if(n===void 0)throw Error(T(407));n=n()}else{if(n=t(),Qe===null)throw Error(T(349));dr&30||Af(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Bu(Rf.bind(null,r,s,e),[e]),r.flags|=2048,Qi(9,Mf.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=en(),t=Qe.identifierPrefix;if(_e){var n=xn,r=gn;n=(r&~(1<<32-Gt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=qi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=k0++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},E0={readContext:Ut,useCallback:$f,useContext:Ut,useEffect:fc,useImperativeHandle:Hf,useInsertionEffect:Ff,useLayoutEffect:Bf,useMemo:Vf,useReducer:il,useRef:Of,useState:function(){return il(Yi)},useDebugValue:hc,useDeferredValue:function(e){var t=Ht();return Wf(t,Ue.memoizedState,e)},useTransition:function(){var e=il(Yi)[0],t=Ht().memoizedState;return[e,t]},useMutableSource:Pf,useSyncExternalStore:Tf,useId:qf,unstable_isNewReconciler:!1},z0={readContext:Ut,useCallback:$f,useContext:Ut,useEffect:fc,useImperativeHandle:Hf,useInsertionEffect:Ff,useLayoutEffect:Bf,useMemo:Vf,useReducer:sl,useRef:Of,useState:function(){return sl(Yi)},useDebugValue:hc,useDeferredValue:function(e){var t=Ht();return Ue===null?t.memoizedState=e:Wf(t,Ue.memoizedState,e)},useTransition:function(){var e=sl(Yi)[0],t=Ht().memoizedState;return[e,t]},useMutableSource:Pf,useSyncExternalStore:Tf,useId:qf,unstable_isNewReconciler:!1};function qt(e,t){if(e&&e.defaultProps){t=Te({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function sa(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var jo={isMounted:function(e){return(e=e._reactInternals)?mr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=dt(),i=Un(e),s=yn(r,i);s.payload=t,n!=null&&(s.callback=n),t=Fn(e,s,i),t!==null&&(Kt(t,e,i,r),Ps(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=dt(),i=Un(e),s=yn(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Fn(e,s,i),t!==null&&(Kt(t,e,i,r),Ps(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=dt(),r=Un(e),i=yn(n,r);i.tag=2,t!=null&&(i.callback=t),t=Fn(e,i,r),t!==null&&(Kt(t,e,r,n),Ps(t,e,r))}};function Uu(e,t,n,r,i,s,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,l):t.prototype&&t.prototype.isPureReactComponent?!Bi(n,r)||!Bi(i,s):!0}function Kf(e,t,n){var r=!1,i=Vn,s=t.contextType;return typeof s=="object"&&s!==null?s=Ut(s):(i=bt(t)?cr:ot.current,r=t.contextTypes,s=(r=r!=null)?Wr(e,i):Vn),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=jo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function Hu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&jo.enqueueReplaceState(t,t.state,null)}function oa(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},oc(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Ut(s):(s=bt(t)?cr:ot.current,i.context=Wr(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(sa(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&jo.enqueueReplaceState(i,i.state,null),no(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Gr(e,t){try{var n="",r=t;do n+=ng(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function ol(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function la(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var _0=typeof WeakMap=="function"?WeakMap:Map;function Xf(e,t,n){n=yn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){lo||(lo=!0,xa=r),la(e,t)},n}function Jf(e,t,n){n=yn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){la(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){la(e,t),typeof r!="function"&&(Bn===null?Bn=new Set([this]):Bn.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function $u(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new _0;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=$0.bind(null,e,t,n),t.then(e,e))}function Vu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Wu(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=yn(-1,1),t.tag=2,Fn(n,t,1))),n.lanes|=1),e)}var I0=Sn.ReactCurrentOwner,xt=!1;function ut(e,t,n,r){t.child=e===null?Ef(t,null,n,r):Yr(t,e.child,n,r)}function qu(e,t,n,r,i){n=n.render;var s=t.ref;return Br(t,i),r=dc(e,t,n,r,s,i),n=pc(),e!==null&&!xt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,jn(e,t,i)):(_e&&n&&Za(t),t.flags|=1,ut(e,t,r,i),t.child)}function Yu(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!kc(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,Zf(e,t,s,r,i)):(e=Ds(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var l=s.memoizedProps;if(n=n.compare,n=n!==null?n:Bi,n(l,r)&&e.ref===t.ref)return jn(e,t,i)}return t.flags|=1,e=Hn(s,r),e.ref=t.ref,e.return=t,t.child=e}function Zf(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(Bi(s,r)&&e.ref===t.ref)if(xt=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(xt=!0);else return t.lanes=e.lanes,jn(e,t,i)}return aa(e,t,n,r,i)}function eh(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},je(Rr,zt),zt|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,je(Rr,zt),zt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,je(Rr,zt),zt|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,je(Rr,zt),zt|=r;return ut(e,t,i,n),t.child}function th(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function aa(e,t,n,r,i){var s=bt(n)?cr:ot.current;return s=Wr(t,s),Br(t,i),n=dc(e,t,n,r,s,i),r=pc(),e!==null&&!xt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,jn(e,t,i)):(_e&&r&&Za(t),t.flags|=1,ut(e,t,n,i),t.child)}function Qu(e,t,n,r,i){if(bt(n)){var s=!0;Xs(t)}else s=!1;if(Br(t,i),t.stateNode===null)Ms(e,t),Kf(t,n,r),oa(t,n,r,i),r=!0;else if(e===null){var l=t.stateNode,a=t.memoizedProps;l.props=a;var c=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ut(u):(u=bt(n)?cr:ot.current,u=Wr(t,u));var d=n.getDerivedStateFromProps,p=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function";p||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==r||c!==u)&&Hu(t,l,r,u),In=!1;var h=t.memoizedState;l.state=h,no(t,r,l,i),c=t.memoizedState,a!==r||h!==c||yt.current||In?(typeof d=="function"&&(sa(t,n,d,r),c=t.memoizedState),(a=In||Uu(t,n,a,r,h,c,u))?(p||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),l.props=r,l.state=c,l.context=u,r=a):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,_f(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:qt(t.type,a),l.props=u,p=t.pendingProps,h=l.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ut(c):(c=bt(n)?cr:ot.current,c=Wr(t,c));var f=n.getDerivedStateFromProps;(d=typeof f=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==p||h!==c)&&Hu(t,l,r,c),In=!1,h=t.memoizedState,l.state=h,no(t,r,l,i);var k=t.memoizedState;a!==p||h!==k||yt.current||In?(typeof f=="function"&&(sa(t,n,f,r),k=t.memoizedState),(u=In||Uu(t,n,u,r,h,k,c)||!1)?(d||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,k,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,k,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=k),l.props=r,l.state=k,l.context=c,r=u):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return ca(e,t,n,r,s,i)}function ca(e,t,n,r,i,s){th(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return i&&Au(t,n,!1),jn(e,t,s);r=t.stateNode,I0.current=t;var a=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Yr(t,e.child,null,s),t.child=Yr(t,null,a,s)):ut(e,t,a,s),t.memoizedState=r.state,i&&Au(t,n,!0),t.child}function nh(e){var t=e.stateNode;t.pendingContext?Tu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Tu(e,t.context,!1),lc(e,t.containerInfo)}function Gu(e,t,n,r,i){return qr(),tc(i),t.flags|=256,ut(e,t,n,r),t.child}var ua={dehydrated:null,treeContext:null,retryLane:0};function da(e){return{baseLanes:e,cachePool:null,transitions:null}}function rh(e,t,n){var r=t.pendingProps,i=Ie.current,s=!1,l=(t.flags&128)!==0,a;if((a=l)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),je(Ie,i&1),e===null)return ra(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,s?(r=t.mode,s=t.child,l={mode:"hidden",children:l},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=l):s=No(l,r,0,null),e=ar(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=da(n),t.memoizedState=ua,e):mc(t,l));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return P0(e,t,l,r,a,i,n);if(s){s=r.fallback,l=t.mode,i=e.child,a=i.sibling;var c={mode:"hidden",children:r.children};return!(l&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Hn(i,c),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Hn(a,s):(s=ar(s,l,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,l=e.child.memoizedState,l=l===null?da(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=ua,r}return s=e.child,e=s.sibling,r=Hn(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function mc(e,t){return t=No({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ys(e,t,n,r){return r!==null&&tc(r),Yr(t,e.child,null,n),e=mc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function P0(e,t,n,r,i,s,l){if(n)return t.flags&256?(t.flags&=-257,r=ol(Error(T(422))),ys(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=No({mode:"visible",children:r.children},i,0,null),s=ar(s,i,l,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&Yr(t,e.child,null,l),t.child.memoizedState=da(l),t.memoizedState=ua,s);if(!(t.mode&1))return ys(e,t,l,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(T(419)),r=ol(s,r,void 0),ys(e,t,l,r)}if(a=(l&e.childLanes)!==0,xt||a){if(r=Qe,r!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|l)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,kn(e,i),Kt(r,e,i,-1))}return wc(),r=ol(Error(T(421))),ys(e,t,l,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=V0.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,_t=On(i.nextSibling),Pt=t,_e=!0,Qt=null,e!==null&&(Lt[Dt++]=gn,Lt[Dt++]=xn,Lt[Dt++]=ur,gn=e.id,xn=e.overflow,ur=t),t=mc(t,r.children),t.flags|=4096,t)}function Ku(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ia(e.return,t,n)}function ll(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function ih(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(ut(e,t,r.children,n),r=Ie.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ku(e,n,t);else if(e.tag===19)Ku(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(je(Ie,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ro(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),ll(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ro(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}ll(t,!0,n,null,s);break;case"together":ll(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ms(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),pr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,n=Hn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Hn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function T0(e,t,n){switch(t.tag){case 3:nh(t),qr();break;case 5:If(t);break;case 1:bt(t.type)&&Xs(t);break;case 4:lc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;je(eo,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(je(Ie,Ie.current&1),t.flags|=128,null):n&t.child.childLanes?rh(e,t,n):(je(Ie,Ie.current&1),e=jn(e,t,n),e!==null?e.sibling:null);je(Ie,Ie.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return ih(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),je(Ie,Ie.current),r)break;return null;case 22:case 23:return t.lanes=0,eh(e,t,n)}return jn(e,t,n)}var sh,pa,oh,lh;sh=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};pa=function(){};oh=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,or(on.current);var s=null;switch(n){case"input":i=Ml(e,i),r=Ml(e,r),s=[];break;case"select":i=Te({},i,{value:void 0}),r=Te({},r,{value:void 0}),s=[];break;case"textarea":i=Dl(e,i),r=Dl(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Gs)}Fl(n,r);var l;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(l in a)a.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ai.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var c=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==a&&(c!=null||a!=null))if(u==="style")if(a){for(l in a)!a.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&a[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ai.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&Ee("scroll",e),s||a===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};lh=function(e,t,n,r){n!==r&&(t.flags|=4)};function ui(e,t){if(!_e)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function it(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function A0(e,t,n){var r=t.pendingProps;switch(ec(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(t),null;case 1:return bt(t.type)&&Ks(),it(t),null;case 3:return r=t.stateNode,Qr(),ze(yt),ze(ot),cc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(gs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qt!==null&&(va(Qt),Qt=null))),pa(e,t),it(t),null;case 5:ac(t);var i=or(Wi.current);if(n=t.type,e!==null&&t.stateNode!=null)oh(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(T(166));return it(t),null}if(e=or(on.current),gs(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[nn]=t,r[$i]=s,e=(t.mode&1)!==0,n){case"dialog":Ee("cancel",r),Ee("close",r);break;case"iframe":case"object":case"embed":Ee("load",r);break;case"video":case"audio":for(i=0;i<vi.length;i++)Ee(vi[i],r);break;case"source":Ee("error",r);break;case"img":case"image":case"link":Ee("error",r),Ee("load",r);break;case"details":Ee("toggle",r);break;case"input":su(r,s),Ee("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Ee("invalid",r);break;case"textarea":lu(r,s),Ee("invalid",r)}Fl(n,s),i=null;for(var l in s)if(s.hasOwnProperty(l)){var a=s[l];l==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&ms(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ms(r.textContent,a,e),i=["children",""+a]):Ai.hasOwnProperty(l)&&a!=null&&l==="onScroll"&&Ee("scroll",r)}switch(n){case"input":ls(r),ou(r,s,!0);break;case"textarea":ls(r),au(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Gs)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Mp(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[nn]=t,e[$i]=r,sh(e,t,!1,!1),t.stateNode=e;e:{switch(l=Bl(n,r),n){case"dialog":Ee("cancel",e),Ee("close",e),i=r;break;case"iframe":case"object":case"embed":Ee("load",e),i=r;break;case"video":case"audio":for(i=0;i<vi.length;i++)Ee(vi[i],e);i=r;break;case"source":Ee("error",e),i=r;break;case"img":case"image":case"link":Ee("error",e),Ee("load",e),i=r;break;case"details":Ee("toggle",e),i=r;break;case"input":su(e,r),i=Ml(e,r),Ee("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=Te({},r,{value:void 0}),Ee("invalid",e);break;case"textarea":lu(e,r),i=Dl(e,r),Ee("invalid",e);break;default:i=r}Fl(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var c=a[s];s==="style"?Dp(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Rp(e,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Mi(e,c):typeof c=="number"&&Mi(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ai.hasOwnProperty(s)?c!=null&&s==="onScroll"&&Ee("scroll",e):c!=null&&Fa(e,s,c,l))}switch(n){case"input":ls(e),ou(e,r,!1);break;case"textarea":ls(e),au(e);break;case"option":r.value!=null&&e.setAttribute("value",""+$n(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Lr(e,!!r.multiple,s,!1):r.defaultValue!=null&&Lr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Gs)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return it(t),null;case 6:if(e&&t.stateNode!=null)lh(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(T(166));if(n=or(Wi.current),or(on.current),gs(t)){if(r=t.stateNode,n=t.memoizedProps,r[nn]=t,(s=r.nodeValue!==n)&&(e=Pt,e!==null))switch(e.tag){case 3:ms(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ms(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[nn]=t,t.stateNode=r}return it(t),null;case 13:if(ze(Ie),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(_e&&_t!==null&&t.mode&1&&!(t.flags&128))Cf(),qr(),t.flags|=98560,s=!1;else if(s=gs(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(T(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(T(317));s[nn]=t}else qr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;it(t),s=!1}else Qt!==null&&(va(Qt),Qt=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Ie.current&1?He===0&&(He=3):wc())),t.updateQueue!==null&&(t.flags|=4),it(t),null);case 4:return Qr(),pa(e,t),e===null&&Ui(t.stateNode.containerInfo),it(t),null;case 10:return ic(t.type._context),it(t),null;case 17:return bt(t.type)&&Ks(),it(t),null;case 19:if(ze(Ie),s=t.memoizedState,s===null)return it(t),null;if(r=(t.flags&128)!==0,l=s.rendering,l===null)if(r)ui(s,!1);else{if(He!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=ro(e),l!==null){for(t.flags|=128,ui(s,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,l=s.alternate,l===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=l.childLanes,s.lanes=l.lanes,s.child=l.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=l.memoizedProps,s.memoizedState=l.memoizedState,s.updateQueue=l.updateQueue,s.type=l.type,e=l.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return je(Ie,Ie.current&1|2),t.child}e=e.sibling}s.tail!==null&&Me()>Kr&&(t.flags|=128,r=!0,ui(s,!1),t.lanes=4194304)}else{if(!r)if(e=ro(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ui(s,!0),s.tail===null&&s.tailMode==="hidden"&&!l.alternate&&!_e)return it(t),null}else 2*Me()-s.renderingStartTime>Kr&&n!==1073741824&&(t.flags|=128,r=!0,ui(s,!1),t.lanes=4194304);s.isBackwards?(l.sibling=t.child,t.child=l):(n=s.last,n!==null?n.sibling=l:t.child=l,s.last=l)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Me(),t.sibling=null,n=Ie.current,je(Ie,r?n&1|2:n&1),t):(it(t),null);case 22:case 23:return vc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?zt&1073741824&&(it(t),t.subtreeFlags&6&&(t.flags|=8192)):it(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function M0(e,t){switch(ec(t),t.tag){case 1:return bt(t.type)&&Ks(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qr(),ze(yt),ze(ot),cc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ac(t),null;case 13:if(ze(Ie),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));qr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ze(Ie),null;case 4:return Qr(),null;case 10:return ic(t.type._context),null;case 22:case 23:return vc(),null;case 24:return null;default:return null}}var bs=!1,st=!1,R0=typeof WeakSet=="function"?WeakSet:Set,V=null;function Mr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ae(e,t,r)}else n.current=null}function fa(e,t,n){try{n()}catch(r){Ae(e,t,r)}}var Xu=!1;function L0(e,t){if(Kl=qs,e=pf(),Ja(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var l=0,a=-1,c=-1,u=0,d=0,p=e,h=null;t:for(;;){for(var f;p!==n||i!==0&&p.nodeType!==3||(a=l+i),p!==s||r!==0&&p.nodeType!==3||(c=l+r),p.nodeType===3&&(l+=p.nodeValue.length),(f=p.firstChild)!==null;)h=p,p=f;for(;;){if(p===e)break t;if(h===n&&++u===i&&(a=l),h===s&&++d===r&&(c=l),(f=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=f}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Xl={focusedElem:e,selectionRange:n},qs=!1,V=t;V!==null;)if(t=V,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,V=e;else for(;V!==null;){t=V;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var C=k.memoizedProps,A=k.memoizedState,g=t.stateNode,m=g.getSnapshotBeforeUpdate(t.elementType===t.type?C:qt(t.type,C),A);g.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(b){Ae(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,V=e;break}V=t.return}return k=Xu,Xu=!1,k}function Ei(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&fa(t,n,s)}i=i.next}while(i!==r)}}function So(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ha(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ah(e){var t=e.alternate;t!==null&&(e.alternate=null,ah(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[nn],delete t[$i],delete t[ea],delete t[y0],delete t[b0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ch(e){return e.tag===5||e.tag===3||e.tag===4}function Ju(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ch(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ma(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Gs));else if(r!==4&&(e=e.child,e!==null))for(ma(e,t,n),e=e.sibling;e!==null;)ma(e,t,n),e=e.sibling}function ga(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ga(e,t,n),e=e.sibling;e!==null;)ga(e,t,n),e=e.sibling}var Je=null,Yt=!1;function En(e,t,n){for(n=n.child;n!==null;)uh(e,t,n),n=n.sibling}function uh(e,t,n){if(sn&&typeof sn.onCommitFiberUnmount=="function")try{sn.onCommitFiberUnmount(go,n)}catch{}switch(n.tag){case 5:st||Mr(n,t);case 6:var r=Je,i=Yt;Je=null,En(e,t,n),Je=r,Yt=i,Je!==null&&(Yt?(e=Je,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Je.removeChild(n.stateNode));break;case 18:Je!==null&&(Yt?(e=Je,n=n.stateNode,e.nodeType===8?el(e.parentNode,n):e.nodeType===1&&el(e,n),Oi(e)):el(Je,n.stateNode));break;case 4:r=Je,i=Yt,Je=n.stateNode.containerInfo,Yt=!0,En(e,t,n),Je=r,Yt=i;break;case 0:case 11:case 14:case 15:if(!st&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,l=s.destroy;s=s.tag,l!==void 0&&(s&2||s&4)&&fa(n,t,l),i=i.next}while(i!==r)}En(e,t,n);break;case 1:if(!st&&(Mr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Ae(n,t,a)}En(e,t,n);break;case 21:En(e,t,n);break;case 22:n.mode&1?(st=(r=st)||n.memoizedState!==null,En(e,t,n),st=r):En(e,t,n);break;default:En(e,t,n)}}function Zu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new R0),t.forEach(function(r){var i=W0.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Wt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,l=t,a=l;e:for(;a!==null;){switch(a.tag){case 5:Je=a.stateNode,Yt=!1;break e;case 3:Je=a.stateNode.containerInfo,Yt=!0;break e;case 4:Je=a.stateNode.containerInfo,Yt=!0;break e}a=a.return}if(Je===null)throw Error(T(160));uh(s,l,i),Je=null,Yt=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){Ae(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)dh(t,e),t=t.sibling}function dh(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Wt(t,e),Zt(e),r&4){try{Ei(3,e,e.return),So(3,e)}catch(C){Ae(e,e.return,C)}try{Ei(5,e,e.return)}catch(C){Ae(e,e.return,C)}}break;case 1:Wt(t,e),Zt(e),r&512&&n!==null&&Mr(n,n.return);break;case 5:if(Wt(t,e),Zt(e),r&512&&n!==null&&Mr(n,n.return),e.flags&32){var i=e.stateNode;try{Mi(i,"")}catch(C){Ae(e,e.return,C)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,l=n!==null?n.memoizedProps:s,a=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Tp(i,s),Bl(a,l);var u=Bl(a,s);for(l=0;l<c.length;l+=2){var d=c[l],p=c[l+1];d==="style"?Dp(i,p):d==="dangerouslySetInnerHTML"?Rp(i,p):d==="children"?Mi(i,p):Fa(i,d,p,u)}switch(a){case"input":Rl(i,s);break;case"textarea":Ap(i,s);break;case"select":var h=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var f=s.value;f!=null?Lr(i,!!s.multiple,f,!1):h!==!!s.multiple&&(s.defaultValue!=null?Lr(i,!!s.multiple,s.defaultValue,!0):Lr(i,!!s.multiple,s.multiple?[]:"",!1))}i[$i]=s}catch(C){Ae(e,e.return,C)}}break;case 6:if(Wt(t,e),Zt(e),r&4){if(e.stateNode===null)throw Error(T(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(C){Ae(e,e.return,C)}}break;case 3:if(Wt(t,e),Zt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Oi(t.containerInfo)}catch(C){Ae(e,e.return,C)}break;case 4:Wt(t,e),Zt(e);break;case 13:Wt(t,e),Zt(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(yc=Me())),r&4&&Zu(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(st=(u=st)||d,Wt(t,e),st=u):Wt(t,e),Zt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(V=e,d=e.child;d!==null;){for(p=V=d;V!==null;){switch(h=V,f=h.child,h.tag){case 0:case 11:case 14:case 15:Ei(4,h,h.return);break;case 1:Mr(h,h.return);var k=h.stateNode;if(typeof k.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(C){Ae(r,n,C)}}break;case 5:Mr(h,h.return);break;case 22:if(h.memoizedState!==null){td(p);continue}}f!==null?(f.return=h,V=f):td(p)}d=d.sibling}e:for(d=null,p=e;;){if(p.tag===5){if(d===null){d=p;try{i=p.stateNode,u?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=p.stateNode,c=p.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Lp("display",l))}catch(C){Ae(e,e.return,C)}}}else if(p.tag===6){if(d===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(C){Ae(e,e.return,C)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Wt(t,e),Zt(e),r&4&&Zu(e);break;case 21:break;default:Wt(t,e),Zt(e)}}function Zt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(ch(n)){var r=n;break e}n=n.return}throw Error(T(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Mi(i,""),r.flags&=-33);var s=Ju(e);ga(e,s,i);break;case 3:case 4:var l=r.stateNode.containerInfo,a=Ju(e);ma(e,a,l);break;default:throw Error(T(161))}}catch(c){Ae(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function D0(e,t,n){V=e,ph(e)}function ph(e,t,n){for(var r=(e.mode&1)!==0;V!==null;){var i=V,s=i.child;if(i.tag===22&&r){var l=i.memoizedState!==null||bs;if(!l){var a=i.alternate,c=a!==null&&a.memoizedState!==null||st;a=bs;var u=st;if(bs=l,(st=c)&&!u)for(V=i;V!==null;)l=V,c=l.child,l.tag===22&&l.memoizedState!==null?nd(i):c!==null?(c.return=l,V=c):nd(i);for(;s!==null;)V=s,ph(s),s=s.sibling;V=i,bs=a,st=u}ed(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,V=s):ed(e)}}function ed(e){for(;V!==null;){var t=V;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:st||So(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!st)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:qt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Ou(t,s,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ou(t,l,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var p=d.dehydrated;p!==null&&Oi(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}st||t.flags&512&&ha(t)}catch(h){Ae(t,t.return,h)}}if(t===e){V=null;break}if(n=t.sibling,n!==null){n.return=t.return,V=n;break}V=t.return}}function td(e){for(;V!==null;){var t=V;if(t===e){V=null;break}var n=t.sibling;if(n!==null){n.return=t.return,V=n;break}V=t.return}}function nd(e){for(;V!==null;){var t=V;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{So(4,t)}catch(c){Ae(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){Ae(t,i,c)}}var s=t.return;try{ha(t)}catch(c){Ae(t,s,c)}break;case 5:var l=t.return;try{ha(t)}catch(c){Ae(t,l,c)}}}catch(c){Ae(t,t.return,c)}if(t===e){V=null;break}var a=t.sibling;if(a!==null){a.return=t.return,V=a;break}V=t.return}}var O0=Math.ceil,oo=Sn.ReactCurrentDispatcher,gc=Sn.ReactCurrentOwner,Bt=Sn.ReactCurrentBatchConfig,ue=0,Qe=null,Fe=null,Ze=0,zt=0,Rr=qn(0),He=0,Gi=null,pr=0,Co=0,xc=0,zi=null,gt=null,yc=0,Kr=1/0,hn=null,lo=!1,xa=null,Bn=null,vs=!1,Mn=null,ao=0,_i=0,ya=null,Rs=-1,Ls=0;function dt(){return ue&6?Me():Rs!==-1?Rs:Rs=Me()}function Un(e){return e.mode&1?ue&2&&Ze!==0?Ze&-Ze:w0.transition!==null?(Ls===0&&(Ls=Gp()),Ls):(e=me,e!==0||(e=window.event,e=e===void 0?16:nf(e.type)),e):1}function Kt(e,t,n,r){if(50<_i)throw _i=0,ya=null,Error(T(185));Ji(e,n,r),(!(ue&2)||e!==Qe)&&(e===Qe&&(!(ue&2)&&(Co|=n),He===4&&Tn(e,Ze)),vt(e,r),n===1&&ue===0&&!(t.mode&1)&&(Kr=Me()+500,wo&&Yn()))}function vt(e,t){var n=e.callbackNode;wg(e,t);var r=Ws(e,e===Qe?Ze:0);if(r===0)n!==null&&du(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&du(n),t===1)e.tag===0?v0(rd.bind(null,e)):kf(rd.bind(null,e)),g0(function(){!(ue&6)&&Yn()}),n=null;else{switch(Kp(r)){case 1:n=Va;break;case 4:n=Yp;break;case 16:n=Vs;break;case 536870912:n=Qp;break;default:n=Vs}n=vh(n,fh.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function fh(e,t){if(Rs=-1,Ls=0,ue&6)throw Error(T(327));var n=e.callbackNode;if(Ur()&&e.callbackNode!==n)return null;var r=Ws(e,e===Qe?Ze:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=co(e,r);else{t=r;var i=ue;ue|=2;var s=mh();(Qe!==e||Ze!==t)&&(hn=null,Kr=Me()+500,lr(e,t));do try{U0();break}catch(a){hh(e,a)}while(!0);rc(),oo.current=s,ue=i,Fe!==null?t=0:(Qe=null,Ze=0,t=He)}if(t!==0){if(t===2&&(i=Wl(e),i!==0&&(r=i,t=ba(e,i))),t===1)throw n=Gi,lr(e,0),Tn(e,r),vt(e,Me()),n;if(t===6)Tn(e,r);else{if(i=e.current.alternate,!(r&30)&&!F0(i)&&(t=co(e,r),t===2&&(s=Wl(e),s!==0&&(r=s,t=ba(e,s))),t===1))throw n=Gi,lr(e,0),Tn(e,r),vt(e,Me()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(T(345));case 2:tr(e,gt,hn);break;case 3:if(Tn(e,r),(r&130023424)===r&&(t=yc+500-Me(),10<t)){if(Ws(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){dt(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Zl(tr.bind(null,e,gt,hn),t);break}tr(e,gt,hn);break;case 4:if(Tn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var l=31-Gt(r);s=1<<l,l=t[l],l>i&&(i=l),r&=~s}if(r=i,r=Me()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*O0(r/1960))-r,10<r){e.timeoutHandle=Zl(tr.bind(null,e,gt,hn),r);break}tr(e,gt,hn);break;case 5:tr(e,gt,hn);break;default:throw Error(T(329))}}}return vt(e,Me()),e.callbackNode===n?fh.bind(null,e):null}function ba(e,t){var n=zi;return e.current.memoizedState.isDehydrated&&(lr(e,t).flags|=256),e=co(e,t),e!==2&&(t=gt,gt=n,t!==null&&va(t)),e}function va(e){gt===null?gt=e:gt.push.apply(gt,e)}function F0(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Xt(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Tn(e,t){for(t&=~xc,t&=~Co,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Gt(t),r=1<<n;e[n]=-1,t&=~r}}function rd(e){if(ue&6)throw Error(T(327));Ur();var t=Ws(e,0);if(!(t&1))return vt(e,Me()),null;var n=co(e,t);if(e.tag!==0&&n===2){var r=Wl(e);r!==0&&(t=r,n=ba(e,r))}if(n===1)throw n=Gi,lr(e,0),Tn(e,t),vt(e,Me()),n;if(n===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,tr(e,gt,hn),vt(e,Me()),null}function bc(e,t){var n=ue;ue|=1;try{return e(t)}finally{ue=n,ue===0&&(Kr=Me()+500,wo&&Yn())}}function fr(e){Mn!==null&&Mn.tag===0&&!(ue&6)&&Ur();var t=ue;ue|=1;var n=Bt.transition,r=me;try{if(Bt.transition=null,me=1,e)return e()}finally{me=r,Bt.transition=n,ue=t,!(ue&6)&&Yn()}}function vc(){zt=Rr.current,ze(Rr)}function lr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,m0(n)),Fe!==null)for(n=Fe.return;n!==null;){var r=n;switch(ec(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ks();break;case 3:Qr(),ze(yt),ze(ot),cc();break;case 5:ac(r);break;case 4:Qr();break;case 13:ze(Ie);break;case 19:ze(Ie);break;case 10:ic(r.type._context);break;case 22:case 23:vc()}n=n.return}if(Qe=e,Fe=e=Hn(e.current,null),Ze=zt=t,He=0,Gi=null,xc=Co=pr=0,gt=zi=null,sr!==null){for(t=0;t<sr.length;t++)if(n=sr[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var l=s.next;s.next=i,r.next=l}n.pending=r}sr=null}return e}function hh(e,t){do{var n=Fe;try{if(rc(),Ts.current=so,io){for(var r=Pe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}io=!1}if(dr=0,Ye=Ue=Pe=null,Ni=!1,qi=0,gc.current=null,n===null||n.return===null){He=1,Gi=t,Fe=null;break}e:{var s=e,l=n.return,a=n,c=t;if(t=Ze,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=a,p=d.tag;if(!(d.mode&1)&&(p===0||p===11||p===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var f=Vu(l);if(f!==null){f.flags&=-257,Wu(f,l,a,s,t),f.mode&1&&$u(s,u,t),t=f,c=u;var k=t.updateQueue;if(k===null){var C=new Set;C.add(c),t.updateQueue=C}else k.add(c);break e}else{if(!(t&1)){$u(s,u,t),wc();break e}c=Error(T(426))}}else if(_e&&a.mode&1){var A=Vu(l);if(A!==null){!(A.flags&65536)&&(A.flags|=256),Wu(A,l,a,s,t),tc(Gr(c,a));break e}}s=c=Gr(c,a),He!==4&&(He=2),zi===null?zi=[s]:zi.push(s),s=l;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var g=Xf(s,c,t);Du(s,g);break e;case 1:a=c;var m=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof m.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(Bn===null||!Bn.has(x)))){s.flags|=65536,t&=-t,s.lanes|=t;var b=Jf(s,a,t);Du(s,b);break e}}s=s.return}while(s!==null)}xh(n)}catch(j){t=j,Fe===n&&n!==null&&(Fe=n=n.return);continue}break}while(!0)}function mh(){var e=oo.current;return oo.current=so,e===null?so:e}function wc(){(He===0||He===3||He===2)&&(He=4),Qe===null||!(pr&268435455)&&!(Co&268435455)||Tn(Qe,Ze)}function co(e,t){var n=ue;ue|=2;var r=mh();(Qe!==e||Ze!==t)&&(hn=null,lr(e,t));do try{B0();break}catch(i){hh(e,i)}while(!0);if(rc(),ue=n,oo.current=r,Fe!==null)throw Error(T(261));return Qe=null,Ze=0,He}function B0(){for(;Fe!==null;)gh(Fe)}function U0(){for(;Fe!==null&&!pg();)gh(Fe)}function gh(e){var t=bh(e.alternate,e,zt);e.memoizedProps=e.pendingProps,t===null?xh(e):Fe=t,gc.current=null}function xh(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=M0(n,t),n!==null){n.flags&=32767,Fe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{He=6,Fe=null;return}}else if(n=A0(n,t,zt),n!==null){Fe=n;return}if(t=t.sibling,t!==null){Fe=t;return}Fe=t=e}while(t!==null);He===0&&(He=5)}function tr(e,t,n){var r=me,i=Bt.transition;try{Bt.transition=null,me=1,H0(e,t,n,r)}finally{Bt.transition=i,me=r}return null}function H0(e,t,n,r){do Ur();while(Mn!==null);if(ue&6)throw Error(T(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(kg(e,s),e===Qe&&(Fe=Qe=null,Ze=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||vs||(vs=!0,vh(Vs,function(){return Ur(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Bt.transition,Bt.transition=null;var l=me;me=1;var a=ue;ue|=4,gc.current=null,L0(e,n),dh(n,e),a0(Xl),qs=!!Kl,Xl=Kl=null,e.current=n,D0(n),fg(),ue=a,me=l,Bt.transition=s}else e.current=n;if(vs&&(vs=!1,Mn=e,ao=i),s=e.pendingLanes,s===0&&(Bn=null),gg(n.stateNode),vt(e,Me()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(lo)throw lo=!1,e=xa,xa=null,e;return ao&1&&e.tag!==0&&Ur(),s=e.pendingLanes,s&1?e===ya?_i++:(_i=0,ya=e):_i=0,Yn(),null}function Ur(){if(Mn!==null){var e=Kp(ao),t=Bt.transition,n=me;try{if(Bt.transition=null,me=16>e?16:e,Mn===null)var r=!1;else{if(e=Mn,Mn=null,ao=0,ue&6)throw Error(T(331));var i=ue;for(ue|=4,V=e.current;V!==null;){var s=V,l=s.child;if(V.flags&16){var a=s.deletions;if(a!==null){for(var c=0;c<a.length;c++){var u=a[c];for(V=u;V!==null;){var d=V;switch(d.tag){case 0:case 11:case 15:Ei(8,d,s)}var p=d.child;if(p!==null)p.return=d,V=p;else for(;V!==null;){d=V;var h=d.sibling,f=d.return;if(ah(d),d===u){V=null;break}if(h!==null){h.return=f,V=h;break}V=f}}}var k=s.alternate;if(k!==null){var C=k.child;if(C!==null){k.child=null;do{var A=C.sibling;C.sibling=null,C=A}while(C!==null)}}V=s}}if(s.subtreeFlags&2064&&l!==null)l.return=s,V=l;else e:for(;V!==null;){if(s=V,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ei(9,s,s.return)}var g=s.sibling;if(g!==null){g.return=s.return,V=g;break e}V=s.return}}var m=e.current;for(V=m;V!==null;){l=V;var x=l.child;if(l.subtreeFlags&2064&&x!==null)x.return=l,V=x;else e:for(l=m;V!==null;){if(a=V,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:So(9,a)}}catch(j){Ae(a,a.return,j)}if(a===l){V=null;break e}var b=a.sibling;if(b!==null){b.return=a.return,V=b;break e}V=a.return}}if(ue=i,Yn(),sn&&typeof sn.onPostCommitFiberRoot=="function")try{sn.onPostCommitFiberRoot(go,e)}catch{}r=!0}return r}finally{me=n,Bt.transition=t}}return!1}function id(e,t,n){t=Gr(n,t),t=Xf(e,t,1),e=Fn(e,t,1),t=dt(),e!==null&&(Ji(e,1,t),vt(e,t))}function Ae(e,t,n){if(e.tag===3)id(e,e,n);else for(;t!==null;){if(t.tag===3){id(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Bn===null||!Bn.has(r))){e=Gr(n,e),e=Jf(t,e,1),t=Fn(t,e,1),e=dt(),t!==null&&(Ji(t,1,e),vt(t,e));break}}t=t.return}}function $0(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=dt(),e.pingedLanes|=e.suspendedLanes&n,Qe===e&&(Ze&n)===n&&(He===4||He===3&&(Ze&130023424)===Ze&&500>Me()-yc?lr(e,0):xc|=n),vt(e,t)}function yh(e,t){t===0&&(e.mode&1?(t=us,us<<=1,!(us&130023424)&&(us=4194304)):t=1);var n=dt();e=kn(e,t),e!==null&&(Ji(e,t,n),vt(e,n))}function V0(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yh(e,n)}function W0(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(T(314))}r!==null&&r.delete(t),yh(e,n)}var bh;bh=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||yt.current)xt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return xt=!1,T0(e,t,n);xt=!!(e.flags&131072)}else xt=!1,_e&&t.flags&1048576&&jf(t,Zs,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ms(e,t),e=t.pendingProps;var i=Wr(t,ot.current);Br(t,n),i=dc(null,t,r,e,i,n);var s=pc();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,bt(r)?(s=!0,Xs(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,oc(t),i.updater=jo,t.stateNode=i,i._reactInternals=t,oa(t,r,e,n),t=ca(null,t,r,!0,s,n)):(t.tag=0,_e&&s&&Za(t),ut(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ms(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Y0(r),e=qt(r,e),i){case 0:t=aa(null,t,r,e,n);break e;case 1:t=Qu(null,t,r,e,n);break e;case 11:t=qu(null,t,r,e,n);break e;case 14:t=Yu(null,t,r,qt(r.type,e),n);break e}throw Error(T(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:qt(r,i),aa(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:qt(r,i),Qu(e,t,r,i,n);case 3:e:{if(nh(t),e===null)throw Error(T(387));r=t.pendingProps,s=t.memoizedState,i=s.element,_f(e,t),no(t,r,null,n);var l=t.memoizedState;if(r=l.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=Gr(Error(T(423)),t),t=Gu(e,t,r,n,i);break e}else if(r!==i){i=Gr(Error(T(424)),t),t=Gu(e,t,r,n,i);break e}else for(_t=On(t.stateNode.containerInfo.firstChild),Pt=t,_e=!0,Qt=null,n=Ef(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(qr(),r===i){t=jn(e,t,n);break e}ut(e,t,r,n)}t=t.child}return t;case 5:return If(t),e===null&&ra(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,l=i.children,Jl(r,i)?l=null:s!==null&&Jl(r,s)&&(t.flags|=32),th(e,t),ut(e,t,l,n),t.child;case 6:return e===null&&ra(t),null;case 13:return rh(e,t,n);case 4:return lc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Yr(t,null,r,n):ut(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:qt(r,i),qu(e,t,r,i,n);case 7:return ut(e,t,t.pendingProps,n),t.child;case 8:return ut(e,t,t.pendingProps.children,n),t.child;case 12:return ut(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,l=i.value,je(eo,r._currentValue),r._currentValue=l,s!==null)if(Xt(s.value,l)){if(s.children===i.children&&!yt.current){t=jn(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var a=s.dependencies;if(a!==null){l=s.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=yn(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),ia(s.return,n,t),a.lanes|=n;break}c=c.next}}else if(s.tag===10)l=s.type===t.type?null:s.child;else if(s.tag===18){if(l=s.return,l===null)throw Error(T(341));l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),ia(l,n,t),l=s.sibling}else l=s.child;if(l!==null)l.return=s;else for(l=s;l!==null;){if(l===t){l=null;break}if(s=l.sibling,s!==null){s.return=l.return,l=s;break}l=l.return}s=l}ut(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Br(t,n),i=Ut(i),r=r(i),t.flags|=1,ut(e,t,r,n),t.child;case 14:return r=t.type,i=qt(r,t.pendingProps),i=qt(r.type,i),Yu(e,t,r,i,n);case 15:return Zf(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:qt(r,i),Ms(e,t),t.tag=1,bt(r)?(e=!0,Xs(t)):e=!1,Br(t,n),Kf(t,r,i),oa(t,r,i,n),ca(null,t,r,!0,e,n);case 19:return ih(e,t,n);case 22:return eh(e,t,n)}throw Error(T(156,t.tag))};function vh(e,t){return qp(e,t)}function q0(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ft(e,t,n,r){return new q0(e,t,n,r)}function kc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Y0(e){if(typeof e=="function")return kc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ua)return 11;if(e===Ha)return 14}return 2}function Hn(e,t){var n=e.alternate;return n===null?(n=Ft(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ds(e,t,n,r,i,s){var l=2;if(r=e,typeof e=="function")kc(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Cr:return ar(n.children,i,s,t);case Ba:l=8,i|=8;break;case Il:return e=Ft(12,n,t,i|2),e.elementType=Il,e.lanes=s,e;case Pl:return e=Ft(13,n,t,i),e.elementType=Pl,e.lanes=s,e;case Tl:return e=Ft(19,n,t,i),e.elementType=Tl,e.lanes=s,e;case _p:return No(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ep:l=10;break e;case zp:l=9;break e;case Ua:l=11;break e;case Ha:l=14;break e;case _n:l=16,r=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=Ft(l,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function ar(e,t,n,r){return e=Ft(7,e,r,t),e.lanes=n,e}function No(e,t,n,r){return e=Ft(22,e,r,t),e.elementType=_p,e.lanes=n,e.stateNode={isHidden:!1},e}function al(e,t,n){return e=Ft(6,e,null,t),e.lanes=n,e}function cl(e,t,n){return t=Ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Q0(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=$o(0),this.expirationTimes=$o(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$o(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function jc(e,t,n,r,i,s,l,a,c){return e=new Q0(e,t,n,a,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Ft(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},oc(s),e}function G0(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Sr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function wh(e){if(!e)return Vn;e=e._reactInternals;e:{if(mr(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(bt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var n=e.type;if(bt(n))return wf(e,n,t)}return t}function kh(e,t,n,r,i,s,l,a,c){return e=jc(n,r,!0,e,i,s,l,a,c),e.context=wh(null),n=e.current,r=dt(),i=Un(n),s=yn(r,i),s.callback=t??null,Fn(n,s,i),e.current.lanes=i,Ji(e,i,r),vt(e,r),e}function Eo(e,t,n,r){var i=t.current,s=dt(),l=Un(i);return n=wh(n),t.context===null?t.context=n:t.pendingContext=n,t=yn(s,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Fn(i,t,l),e!==null&&(Kt(e,i,l,s),Ps(e,i,l)),l}function uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function sd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Sc(e,t){sd(e,t),(e=e.alternate)&&sd(e,t)}function K0(){return null}var jh=typeof reportError=="function"?reportError:function(e){console.error(e)};function Cc(e){this._internalRoot=e}zo.prototype.render=Cc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));Eo(e,t,null,null)};zo.prototype.unmount=Cc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fr(function(){Eo(null,e,null,null)}),t[wn]=null}};function zo(e){this._internalRoot=e}zo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Zp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Pn.length&&t!==0&&t<Pn[n].priority;n++);Pn.splice(n,0,e),n===0&&tf(e)}};function Nc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function od(){}function X0(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var u=uo(l);s.call(u)}}var l=kh(t,r,e,0,null,!1,!1,"",od);return e._reactRootContainer=l,e[wn]=l.current,Ui(e.nodeType===8?e.parentNode:e),fr(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=uo(c);a.call(u)}}var c=jc(e,0,!1,null,null,!1,!1,"",od);return e._reactRootContainer=c,e[wn]=c.current,Ui(e.nodeType===8?e.parentNode:e),fr(function(){Eo(t,c,n,r)}),c}function Io(e,t,n,r,i){var s=n._reactRootContainer;if(s){var l=s;if(typeof i=="function"){var a=i;i=function(){var c=uo(l);a.call(c)}}Eo(t,l,e,i)}else l=X0(n,t,e,i,r);return uo(l)}Xp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=bi(t.pendingLanes);n!==0&&(Wa(t,n|1),vt(t,Me()),!(ue&6)&&(Kr=Me()+500,Yn()))}break;case 13:fr(function(){var r=kn(e,1);if(r!==null){var i=dt();Kt(r,e,1,i)}}),Sc(e,1)}};qa=function(e){if(e.tag===13){var t=kn(e,134217728);if(t!==null){var n=dt();Kt(t,e,134217728,n)}Sc(e,134217728)}};Jp=function(e){if(e.tag===13){var t=Un(e),n=kn(e,t);if(n!==null){var r=dt();Kt(n,e,t,r)}Sc(e,t)}};Zp=function(){return me};ef=function(e,t){var n=me;try{return me=e,t()}finally{me=n}};Hl=function(e,t,n){switch(t){case"input":if(Rl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=vo(r);if(!i)throw Error(T(90));Pp(r),Rl(r,i)}}}break;case"textarea":Ap(e,n);break;case"select":t=n.value,t!=null&&Lr(e,!!n.multiple,t,!1)}};Bp=bc;Up=fr;var J0={usingClientEntryPoint:!1,Events:[es,_r,vo,Op,Fp,bc]},di={findFiberByHostInstance:ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Z0={bundleType:di.bundleType,version:di.version,rendererPackageName:di.rendererPackageName,rendererConfig:di.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Vp(e),e===null?null:e.stateNode},findFiberByHostInstance:di.findFiberByHostInstance||K0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ws=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ws.isDisabled&&ws.supportsFiber)try{go=ws.inject(Z0),sn=ws}catch{}}At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J0;At.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Nc(t))throw Error(T(200));return G0(e,t,null,n)};At.createRoot=function(e,t){if(!Nc(e))throw Error(T(299));var n=!1,r="",i=jh;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=jc(e,1,!1,null,null,n,!1,r,i),e[wn]=t.current,Ui(e.nodeType===8?e.parentNode:e),new Cc(t)};At.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=Vp(t),e=e===null?null:e.stateNode,e};At.flushSync=function(e){return fr(e)};At.hydrate=function(e,t,n){if(!_o(t))throw Error(T(200));return Io(null,e,t,!0,n)};At.hydrateRoot=function(e,t,n){if(!Nc(e))throw Error(T(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",l=jh;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=kh(t,null,e,1,n??null,i,!1,s,l),e[wn]=t.current,Ui(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new zo(t)};At.render=function(e,t,n){if(!_o(t))throw Error(T(200));return Io(null,e,t,!1,n)};At.unmountComponentAtNode=function(e){if(!_o(e))throw Error(T(40));return e._reactRootContainer?(fr(function(){Io(null,null,e,!1,function(){e._reactRootContainer=null,e[wn]=null})}),!0):!1};At.unstable_batchedUpdates=bc;At.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!_o(n))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return Io(e,t,n,!1,r)};At.version="18.3.1-next-f1338f8080-20240426";function Sh(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sh)}catch(e){console.error(e)}}Sh(),jp.exports=At;var ex=jp.exports,ld=ex;zl.createRoot=ld.createRoot,zl.hydrateRoot=ld.hydrateRoot;function tx(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const nx=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,rx=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,ix={};function ad(e,t){return(ix.jsx?rx:nx).test(e)}const sx=/[ \t\n\f\r]/g;function ox(e){return typeof e=="object"?e.type==="text"?cd(e.value):!1:cd(e)}function cd(e){return e.replace(sx,"")===""}class ns{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}ns.prototype.normal={};ns.prototype.property={};ns.prototype.space=void 0;function Ch(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new ns(n,r,t)}function wa(e){return e.toLowerCase()}class kt{constructor(t,n){this.attribute=n,this.property=t}}kt.prototype.attribute="";kt.prototype.booleanish=!1;kt.prototype.boolean=!1;kt.prototype.commaOrSpaceSeparated=!1;kt.prototype.commaSeparated=!1;kt.prototype.defined=!1;kt.prototype.mustUseProperty=!1;kt.prototype.number=!1;kt.prototype.overloadedBoolean=!1;kt.prototype.property="";kt.prototype.spaceSeparated=!1;kt.prototype.space=void 0;let lx=0;const ee=gr(),Oe=gr(),ka=gr(),M=gr(),ke=gr(),Hr=gr(),Et=gr();function gr(){return 2**++lx}const ja=Object.freeze(Object.defineProperty({__proto__:null,boolean:ee,booleanish:Oe,commaOrSpaceSeparated:Et,commaSeparated:Hr,number:M,overloadedBoolean:ka,spaceSeparated:ke},Symbol.toStringTag,{value:"Module"})),ul=Object.keys(ja);class Ec extends kt{constructor(t,n,r,i){let s=-1;if(super(t,n),ud(this,"space",i),typeof r=="number")for(;++s<ul.length;){const l=ul[s];ud(this,ul[s],(r&ja[l])===ja[l])}}}Ec.prototype.defined=!0;function ud(e,t,n){n&&(e[t]=n)}function ei(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const s=new Ec(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(s.mustUseProperty=!0),t[r]=s,n[wa(r)]=r,n[wa(s.attribute)]=r}return new ns(t,n,e.space)}const Nh=ei({properties:{ariaActiveDescendant:null,ariaAtomic:Oe,ariaAutoComplete:null,ariaBusy:Oe,ariaChecked:Oe,ariaColCount:M,ariaColIndex:M,ariaColSpan:M,ariaControls:ke,ariaCurrent:null,ariaDescribedBy:ke,ariaDetails:null,ariaDisabled:Oe,ariaDropEffect:ke,ariaErrorMessage:null,ariaExpanded:Oe,ariaFlowTo:ke,ariaGrabbed:Oe,ariaHasPopup:null,ariaHidden:Oe,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:ke,ariaLevel:M,ariaLive:null,ariaModal:Oe,ariaMultiLine:Oe,ariaMultiSelectable:Oe,ariaOrientation:null,ariaOwns:ke,ariaPlaceholder:null,ariaPosInSet:M,ariaPressed:Oe,ariaReadOnly:Oe,ariaRelevant:null,ariaRequired:Oe,ariaRoleDescription:ke,ariaRowCount:M,ariaRowIndex:M,ariaRowSpan:M,ariaSelected:Oe,ariaSetSize:M,ariaSort:null,ariaValueMax:M,ariaValueMin:M,ariaValueNow:M,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function Eh(e,t){return t in e?e[t]:t}function zh(e,t){return Eh(e,t.toLowerCase())}const ax=ei({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Hr,acceptCharset:ke,accessKey:ke,action:null,allow:null,allowFullScreen:ee,allowPaymentRequest:ee,allowUserMedia:ee,alt:null,as:null,async:ee,autoCapitalize:null,autoComplete:ke,autoFocus:ee,autoPlay:ee,blocking:ke,capture:null,charSet:null,checked:ee,cite:null,className:ke,cols:M,colSpan:null,content:null,contentEditable:Oe,controls:ee,controlsList:ke,coords:M|Hr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:ee,defer:ee,dir:null,dirName:null,disabled:ee,download:ka,draggable:Oe,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:ee,formTarget:null,headers:ke,height:M,hidden:ka,high:M,href:null,hrefLang:null,htmlFor:ke,httpEquiv:ke,id:null,imageSizes:null,imageSrcSet:null,inert:ee,inputMode:null,integrity:null,is:null,isMap:ee,itemId:null,itemProp:ke,itemRef:ke,itemScope:ee,itemType:ke,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:ee,low:M,manifest:null,max:null,maxLength:M,media:null,method:null,min:null,minLength:M,multiple:ee,muted:ee,name:null,nonce:null,noModule:ee,noValidate:ee,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:ee,optimum:M,pattern:null,ping:ke,placeholder:null,playsInline:ee,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:ee,referrerPolicy:null,rel:ke,required:ee,reversed:ee,rows:M,rowSpan:M,sandbox:ke,scope:null,scoped:ee,seamless:ee,selected:ee,shadowRootClonable:ee,shadowRootDelegatesFocus:ee,shadowRootMode:null,shape:null,size:M,sizes:null,slot:null,span:M,spellCheck:Oe,src:null,srcDoc:null,srcLang:null,srcSet:null,start:M,step:null,style:null,tabIndex:M,target:null,title:null,translate:null,type:null,typeMustMatch:ee,useMap:null,value:Oe,width:M,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:ke,axis:null,background:null,bgColor:null,border:M,borderColor:null,bottomMargin:M,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:ee,declare:ee,event:null,face:null,frame:null,frameBorder:null,hSpace:M,leftMargin:M,link:null,longDesc:null,lowSrc:null,marginHeight:M,marginWidth:M,noResize:ee,noHref:ee,noShade:ee,noWrap:ee,object:null,profile:null,prompt:null,rev:null,rightMargin:M,rules:null,scheme:null,scrolling:Oe,standby:null,summary:null,text:null,topMargin:M,valueType:null,version:null,vAlign:null,vLink:null,vSpace:M,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:ee,disableRemotePlayback:ee,prefix:null,property:null,results:M,security:null,unselectable:null},space:"html",transform:zh}),cx=ei({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:Et,accentHeight:M,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:M,amplitude:M,arabicForm:null,ascent:M,attributeName:null,attributeType:null,azimuth:M,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:M,by:null,calcMode:null,capHeight:M,className:ke,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:M,diffuseConstant:M,direction:null,display:null,dur:null,divisor:M,dominantBaseline:null,download:ee,dx:null,dy:null,edgeMode:null,editable:null,elevation:M,enableBackground:null,end:null,event:null,exponent:M,externalResourcesRequired:null,fill:null,fillOpacity:M,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Hr,g2:Hr,glyphName:Hr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:M,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:M,horizOriginX:M,horizOriginY:M,id:null,ideographic:M,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:M,k:M,k1:M,k2:M,k3:M,k4:M,kernelMatrix:Et,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:M,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:M,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:M,overlineThickness:M,paintOrder:null,panose1:null,path:null,pathLength:M,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:ke,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:M,pointsAtY:M,pointsAtZ:M,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Et,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Et,rev:Et,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Et,requiredFeatures:Et,requiredFonts:Et,requiredFormats:Et,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:M,specularExponent:M,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:M,strikethroughThickness:M,string:null,stroke:null,strokeDashArray:Et,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:M,strokeOpacity:M,strokeWidth:null,style:null,surfaceScale:M,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Et,tabIndex:M,tableValues:null,target:null,targetX:M,targetY:M,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Et,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:M,underlineThickness:M,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:M,values:null,vAlphabetic:M,vMathematical:M,vectorEffect:null,vHanging:M,vIdeographic:M,version:null,vertAdvY:M,vertOriginX:M,vertOriginY:M,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:M,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Eh}),_h=ei({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),Ih=ei({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:zh}),Ph=ei({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),ux={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},dx=/[A-Z]/g,dd=/-[a-z]/g,px=/^data[-\w.:]+$/i;function fx(e,t){const n=wa(t);let r=t,i=kt;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&px.test(t)){if(t.charAt(4)==="-"){const s=t.slice(5).replace(dd,mx);r="data"+s.charAt(0).toUpperCase()+s.slice(1)}else{const s=t.slice(4);if(!dd.test(s)){let l=s.replace(dx,hx);l.charAt(0)!=="-"&&(l="-"+l),t="data"+l}}i=Ec}return new i(r,t)}function hx(e){return"-"+e.toLowerCase()}function mx(e){return e.charAt(1).toUpperCase()}const gx=Ch([Nh,ax,_h,Ih,Ph],"html"),zc=Ch([Nh,cx,_h,Ih,Ph],"svg");function xx(e){return e.join(" ").trim()}var _c={},pd=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,yx=/\n/g,bx=/^\s*/,vx=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,wx=/^:\s*/,kx=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,jx=/^[;\s]*/,Sx=/^\s+|\s+$/g,Cx=`
`,fd="/",hd="*",nr="",Nx="comment",Ex="declaration";function zx(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(k){var C=k.match(yx);C&&(n+=C.length);var A=k.lastIndexOf(Cx);r=~A?k.length-A:r+k.length}function s(){var k={line:n,column:r};return function(C){return C.position=new l(k),u(),C}}function l(k){this.start=k,this.end={line:n,column:r},this.source=t.source}l.prototype.content=e;function a(k){var C=new Error(t.source+":"+n+":"+r+": "+k);if(C.reason=k,C.filename=t.source,C.line=n,C.column=r,C.source=e,!t.silent)throw C}function c(k){var C=k.exec(e);if(C){var A=C[0];return i(A),e=e.slice(A.length),C}}function u(){c(bx)}function d(k){var C;for(k=k||[];C=p();)C!==!1&&k.push(C);return k}function p(){var k=s();if(!(fd!=e.charAt(0)||hd!=e.charAt(1))){for(var C=2;nr!=e.charAt(C)&&(hd!=e.charAt(C)||fd!=e.charAt(C+1));)++C;if(C+=2,nr===e.charAt(C-1))return a("End of comment missing");var A=e.slice(2,C-2);return r+=2,i(A),e=e.slice(C),r+=2,k({type:Nx,comment:A})}}function h(){var k=s(),C=c(vx);if(C){if(p(),!c(wx))return a("property missing ':'");var A=c(kx),g=k({type:Ex,property:md(C[0].replace(pd,nr)),value:A?md(A[0].replace(pd,nr)):nr});return c(jx),g}}function f(){var k=[];d(k);for(var C;C=h();)C!==!1&&(k.push(C),d(k));return k}return u(),f()}function md(e){return e?e.replace(Sx,nr):nr}var _x=zx,Ix=Bs&&Bs.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(_c,"__esModule",{value:!0});_c.default=Tx;const Px=Ix(_x);function Tx(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,Px.default)(e),i=typeof t=="function";return r.forEach(s=>{if(s.type!=="declaration")return;const{property:l,value:a}=s;i?t(l,a,s):a&&(n=n||{},n[l]=a)}),n}var Po={};Object.defineProperty(Po,"__esModule",{value:!0});Po.camelCase=void 0;var Ax=/^--[a-zA-Z0-9_-]+$/,Mx=/-([a-z])/g,Rx=/^[^-]+$/,Lx=/^-(webkit|moz|ms|o|khtml)-/,Dx=/^-(ms)-/,Ox=function(e){return!e||Rx.test(e)||Ax.test(e)},Fx=function(e,t){return t.toUpperCase()},gd=function(e,t){return"".concat(t,"-")},Bx=function(e,t){return t===void 0&&(t={}),Ox(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(Dx,gd):e=e.replace(Lx,gd),e.replace(Mx,Fx))};Po.camelCase=Bx;var Ux=Bs&&Bs.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},Hx=Ux(_c),$x=Po;function Sa(e,t){var n={};return!e||typeof e!="string"||(0,Hx.default)(e,function(r,i){r&&i&&(n[(0,$x.camelCase)(r,t)]=i)}),n}Sa.default=Sa;var Vx=Sa;const Wx=Ta(Vx),Th=Ah("end"),Ic=Ah("start");function Ah(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function qx(e){const t=Ic(e),n=Th(e);if(t&&n)return{start:t,end:n}}function Ii(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?xd(e.position):"start"in e||"end"in e?xd(e):"line"in e||"column"in e?Ca(e):""}function Ca(e){return yd(e&&e.line)+":"+yd(e&&e.column)}function xd(e){return Ca(e&&e.start)+"-"+Ca(e&&e.end)}function yd(e){return e&&typeof e=="number"?e:1}class lt extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",s={},l=!1;if(n&&("line"in n&&"column"in n?s={place:n}:"start"in n&&"end"in n?s={place:n}:"type"in n?s={ancestors:[n],place:n.position}:s={...n}),typeof t=="string"?i=t:!s.cause&&t&&(l=!0,i=t.message,s.cause=t),!s.ruleId&&!s.source&&typeof r=="string"){const c=r.indexOf(":");c===-1?s.ruleId=r:(s.source=r.slice(0,c),s.ruleId=r.slice(c+1))}if(!s.place&&s.ancestors&&s.ancestors){const c=s.ancestors[s.ancestors.length-1];c&&(s.place=c.position)}const a=s.place&&"start"in s.place?s.place.start:s.place;this.ancestors=s.ancestors||void 0,this.cause=s.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=a?a.line:void 0,this.name=Ii(s.place)||"1:1",this.place=s.place||void 0,this.reason=this.message,this.ruleId=s.ruleId||void 0,this.source=s.source||void 0,this.stack=l&&s.cause&&typeof s.cause.stack=="string"?s.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}lt.prototype.file="";lt.prototype.name="";lt.prototype.reason="";lt.prototype.message="";lt.prototype.stack="";lt.prototype.column=void 0;lt.prototype.line=void 0;lt.prototype.ancestors=void 0;lt.prototype.cause=void 0;lt.prototype.fatal=void 0;lt.prototype.place=void 0;lt.prototype.ruleId=void 0;lt.prototype.source=void 0;const Pc={}.hasOwnProperty,Yx=new Map,Qx=/[A-Z]/g,Gx=new Set(["table","tbody","thead","tfoot","tr"]),Kx=new Set(["td","th"]),Mh="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function Xx(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=sy(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=iy(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?zc:gx,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},s=Rh(i,e,void 0);return s&&typeof s!="string"?s:i.create(e,i.Fragment,{children:s||void 0},void 0)}function Rh(e,t,n){if(t.type==="element")return Jx(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return Zx(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return ty(e,t,n);if(t.type==="mdxjsEsm")return ey(e,t);if(t.type==="root")return ny(e,t,n);if(t.type==="text")return ry(e,t)}function Jx(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=zc,e.schema=i),e.ancestors.push(t);const s=Dh(e,t.tagName,!1),l=oy(e,t);let a=Ac(e,t);return Gx.has(t.tagName)&&(a=a.filter(function(c){return typeof c=="string"?!ox(c):!0})),Lh(e,l,s,t),Tc(l,a),e.ancestors.pop(),e.schema=r,e.create(t,s,l,n)}function Zx(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}Ki(e,t.position)}function ey(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Ki(e,t.position)}function ty(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=zc,e.schema=i),e.ancestors.push(t);const s=t.name===null?e.Fragment:Dh(e,t.name,!0),l=ly(e,t),a=Ac(e,t);return Lh(e,l,s,t),Tc(l,a),e.ancestors.pop(),e.schema=r,e.create(t,s,l,n)}function ny(e,t,n){const r={};return Tc(r,Ac(e,t)),e.create(t,e.Fragment,r,n)}function ry(e,t){return t.value}function Lh(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Tc(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function iy(e,t,n){return r;function r(i,s,l,a){const u=Array.isArray(l.children)?n:t;return a?u(s,l,a):u(s,l)}}function sy(e,t){return n;function n(r,i,s,l){const a=Array.isArray(s.children),c=Ic(r);return t(i,s,l,a,{columnNumber:c?c.column-1:void 0,fileName:e,lineNumber:c?c.line:void 0},void 0)}}function oy(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&Pc.call(t.properties,i)){const s=ay(e,i,t.properties[i]);if(s){const[l,a]=s;e.tableCellAlignToStyle&&l==="align"&&typeof a=="string"&&Kx.has(t.tagName)?r=a:n[l]=a}}if(r){const s=n.style||(n.style={});s[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function ly(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const s=r.data.estree.body[0];s.type;const l=s.expression;l.type;const a=l.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else Ki(e,t.position);else{const i=r.name;let s;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,s=e.evaluater.evaluateExpression(a.expression)}else Ki(e,t.position);else s=r.value===null?!0:r.value;n[i]=s}return n}function Ac(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:Yx;for(;++r<t.children.length;){const s=t.children[r];let l;if(e.passKeys){const c=s.type==="element"?s.tagName:s.type==="mdxJsxFlowElement"||s.type==="mdxJsxTextElement"?s.name:void 0;if(c){const u=i.get(c)||0;l=c+"-"+u,i.set(c,u+1)}}const a=Rh(e,s,l);a!==void 0&&n.push(a)}return n}function ay(e,t,n){const r=fx(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?tx(n):xx(n)),r.property==="style"){let i=typeof n=="object"?n:cy(e,String(n));return e.stylePropertyNameCase==="css"&&(i=uy(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?ux[r.property]||r.property:r.attribute,n]}}function cy(e,t){try{return Wx(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new lt("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=Mh+"#cannot-parse-style-attribute",i}}function Dh(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let s=-1,l;for(;++s<i.length;){const a=ad(i[s])?{type:"Identifier",name:i[s]}:{type:"Literal",value:i[s]};l=l?{type:"MemberExpression",object:l,property:a,computed:!!(s&&a.type==="Literal"),optional:!1}:a}r=l}else r=ad(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return Pc.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);Ki(e)}function Ki(e,t){const n=new lt("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Mh+"#cannot-handle-mdx-estrees-without-createevaluater",n}function uy(e){const t={};let n;for(n in e)Pc.call(e,n)&&(t[dy(n)]=e[n]);return t}function dy(e){let t=e.replace(Qx,py);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function py(e){return"-"+e.toLowerCase()}const dl={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},fy={};function hy(e,t){const n=fy,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Oh(e,r,i)}function Oh(e,t,n){if(my(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return bd(e.children,t,n)}return Array.isArray(e)?bd(e,t,n):""}function bd(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=Oh(e[i],t,n);return r.join("")}function my(e){return!!(e&&typeof e=="object")}const vd=document.createElement("i");function Mc(e){const t="&"+e+";";vd.innerHTML=t;const n=vd.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function an(e,t,n,r){const i=e.length;let s=0,l;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)l=Array.from(r),l.unshift(t,n),e.splice(...l);else for(n&&e.splice(t,n);s<r.length;)l=r.slice(s,s+1e4),l.unshift(t,0),e.splice(...l),s+=1e4,t+=1e4}function Ot(e,t){return e.length>0?(an(e,e.length,0,t),e):t}const wd={}.hasOwnProperty;function gy(e){const t={};let n=-1;for(;++n<e.length;)xy(t,e[n]);return t}function xy(e,t){let n;for(n in t){const i=(wd.call(e,n)?e[n]:void 0)||(e[n]={}),s=t[n];let l;if(s)for(l in s){wd.call(i,l)||(i[l]=[]);const a=s[l];yy(i[l],Array.isArray(a)?a:a?[a]:[])}}}function yy(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);an(e,0,0,r)}function Fh(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function $r(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const rn=Qn(/[A-Za-z]/),It=Qn(/[\dA-Za-z]/),by=Qn(/[#-'*+\--9=?A-Z^-~]/);function Na(e){return e!==null&&(e<32||e===127)}const Ea=Qn(/\d/),vy=Qn(/[\dA-Fa-f]/),wy=Qn(/[!-/:-@[-`{-~]/);function X(e){return e!==null&&e<-2}function wt(e){return e!==null&&(e<0||e===32)}function fe(e){return e===-2||e===-1||e===32}const ky=Qn(new RegExp("\\p{P}|\\p{S}","u")),jy=Qn(/\s/);function Qn(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function ti(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const s=e.charCodeAt(n);let l="";if(s===37&&It(e.charCodeAt(n+1))&&It(e.charCodeAt(n+2)))i=2;else if(s<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s))||(l=String.fromCharCode(s));else if(s>55295&&s<57344){const a=e.charCodeAt(n+1);s<56320&&a>56319&&a<57344?(l=String.fromCharCode(s,a),i=1):l="�"}else l=String.fromCharCode(s);l&&(t.push(e.slice(r,n),encodeURIComponent(l)),r=n+i+1,l=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function Se(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let s=0;return l;function l(c){return fe(c)?(e.enter(n),a(c)):t(c)}function a(c){return fe(c)&&s++<i?(e.consume(c),a):(e.exit(n),t(c))}}const Sy={tokenize:Cy};function Cy(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),Se(e,t,"linePrefix")}function i(a){return e.enter("paragraph"),s(a)}function s(a){const c=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=c),n=c,l(a)}function l(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return X(a)?(e.consume(a),e.exit("chunkText"),s):(e.consume(a),l)}}const Ny={tokenize:Ey},kd={tokenize:zy};function Ey(e){const t=this,n=[];let r=0,i,s,l;return a;function a(x){if(r<n.length){const b=n[r];return t.containerState=b[1],e.attempt(b[0].continuation,c,u)(x)}return u(x)}function c(x){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&m();const b=t.events.length;let j=b,w;for(;j--;)if(t.events[j][0]==="exit"&&t.events[j][1].type==="chunkFlow"){w=t.events[j][1].end;break}g(r);let E=b;for(;E<t.events.length;)t.events[E][1].end={...w},E++;return an(t.events,j+1,0,t.events.slice(b)),t.events.length=E,u(x)}return a(x)}function u(x){if(r===n.length){if(!i)return h(x);if(i.currentConstruct&&i.currentConstruct.concrete)return k(x);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(kd,d,p)(x)}function d(x){return i&&m(),g(r),h(x)}function p(x){return t.parser.lazy[t.now().line]=r!==n.length,l=t.now().offset,k(x)}function h(x){return t.containerState={},e.attempt(kd,f,k)(x)}function f(x){return r++,n.push([t.currentConstruct,t.containerState]),h(x)}function k(x){if(x===null){i&&m(),g(0),e.consume(x);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:s}),C(x)}function C(x){if(x===null){A(e.exit("chunkFlow"),!0),g(0),e.consume(x);return}return X(x)?(e.consume(x),A(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(x),C)}function A(x,b){const j=t.sliceStream(x);if(b&&j.push(null),x.previous=s,s&&(s.next=x),s=x,i.defineSkip(x.start),i.write(j),t.parser.lazy[x.start.line]){let w=i.events.length;for(;w--;)if(i.events[w][1].start.offset<l&&(!i.events[w][1].end||i.events[w][1].end.offset>l))return;const E=t.events.length;let _=E,W,D;for(;_--;)if(t.events[_][0]==="exit"&&t.events[_][1].type==="chunkFlow"){if(W){D=t.events[_][1].end;break}W=!0}for(g(r),w=E;w<t.events.length;)t.events[w][1].end={...D},w++;an(t.events,_+1,0,t.events.slice(E)),t.events.length=w}}function g(x){let b=n.length;for(;b-- >x;){const j=n[b];t.containerState=j[1],j[0].exit.call(t,e)}n.length=x}function m(){i.write([null]),s=void 0,i=void 0,t.containerState._closeFlow=void 0}}function zy(e,t,n){return Se(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function jd(e){if(e===null||wt(e)||jy(e))return 1;if(ky(e))return 2}function Rc(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const s=e[i].resolveAll;s&&!r.includes(s)&&(t=s(t,n),r.push(s))}return t}const za={name:"attention",resolveAll:_y,tokenize:Iy};function _y(e,t){let n=-1,r,i,s,l,a,c,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;c=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const p={...e[r][1].end},h={...e[n][1].start};Sd(p,-c),Sd(h,c),l={type:c>1?"strongSequence":"emphasisSequence",start:p,end:{...e[r][1].end}},a={type:c>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:h},s={type:c>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:c>1?"strong":"emphasis",start:{...l.start},end:{...a.end}},e[r][1].end={...l.start},e[n][1].start={...a.end},u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=Ot(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=Ot(u,[["enter",i,t],["enter",l,t],["exit",l,t],["enter",s,t]]),u=Ot(u,Rc(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=Ot(u,[["exit",s,t],["enter",a,t],["exit",a,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=Ot(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,an(e,r-1,n-r+3,u),n=r+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Iy(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=jd(r);let s;return l;function l(c){return s=c,e.enter("attentionSequence"),a(c)}function a(c){if(c===s)return e.consume(c),a;const u=e.exit("attentionSequence"),d=jd(c),p=!d||d===2&&i||n.includes(c),h=!i||i===2&&d||n.includes(r);return u._open=!!(s===42?p:p&&(i||!h)),u._close=!!(s===42?h:h&&(d||!p)),t(c)}}function Sd(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const Py={name:"autolink",tokenize:Ty};function Ty(e,t,n){let r=0;return i;function i(f){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(f),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),s}function s(f){return rn(f)?(e.consume(f),l):f===64?n(f):u(f)}function l(f){return f===43||f===45||f===46||It(f)?(r=1,a(f)):u(f)}function a(f){return f===58?(e.consume(f),r=0,c):(f===43||f===45||f===46||It(f))&&r++<32?(e.consume(f),a):(r=0,u(f))}function c(f){return f===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(f),e.exit("autolinkMarker"),e.exit("autolink"),t):f===null||f===32||f===60||Na(f)?n(f):(e.consume(f),c)}function u(f){return f===64?(e.consume(f),d):by(f)?(e.consume(f),u):n(f)}function d(f){return It(f)?p(f):n(f)}function p(f){return f===46?(e.consume(f),r=0,d):f===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(f),e.exit("autolinkMarker"),e.exit("autolink"),t):h(f)}function h(f){if((f===45||It(f))&&r++<63){const k=f===45?h:p;return e.consume(f),k}return n(f)}}const To={partial:!0,tokenize:Ay};function Ay(e,t,n){return r;function r(s){return fe(s)?Se(e,i,"linePrefix")(s):i(s)}function i(s){return s===null||X(s)?t(s):n(s)}}const Bh={continuation:{tokenize:Ry},exit:Ly,name:"blockQuote",tokenize:My};function My(e,t,n){const r=this;return i;function i(l){if(l===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(l),e.exit("blockQuoteMarker"),s}return n(l)}function s(l){return fe(l)?(e.enter("blockQuotePrefixWhitespace"),e.consume(l),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(l))}}function Ry(e,t,n){const r=this;return i;function i(l){return fe(l)?Se(e,s,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l):s(l)}function s(l){return e.attempt(Bh,t,n)(l)}}function Ly(e){e.exit("blockQuote")}const Uh={name:"characterEscape",tokenize:Dy};function Dy(e,t,n){return r;function r(s){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(s),e.exit("escapeMarker"),i}function i(s){return wy(s)?(e.enter("characterEscapeValue"),e.consume(s),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(s)}}const Hh={name:"characterReference",tokenize:Oy};function Oy(e,t,n){const r=this;let i=0,s,l;return a;function a(p){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(p),e.exit("characterReferenceMarker"),c}function c(p){return p===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(p),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),s=31,l=It,d(p))}function u(p){return p===88||p===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(p),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),s=6,l=vy,d):(e.enter("characterReferenceValue"),s=7,l=Ea,d(p))}function d(p){if(p===59&&i){const h=e.exit("characterReferenceValue");return l===It&&!Mc(r.sliceSerialize(h))?n(p):(e.enter("characterReferenceMarker"),e.consume(p),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return l(p)&&i++<s?(e.consume(p),d):n(p)}}const Cd={partial:!0,tokenize:By},Nd={concrete:!0,name:"codeFenced",tokenize:Fy};function Fy(e,t,n){const r=this,i={partial:!0,tokenize:j};let s=0,l=0,a;return c;function c(w){return u(w)}function u(w){const E=r.events[r.events.length-1];return s=E&&E[1].type==="linePrefix"?E[2].sliceSerialize(E[1],!0).length:0,a=w,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(w)}function d(w){return w===a?(l++,e.consume(w),d):l<3?n(w):(e.exit("codeFencedFenceSequence"),fe(w)?Se(e,p,"whitespace")(w):p(w))}function p(w){return w===null||X(w)?(e.exit("codeFencedFence"),r.interrupt?t(w):e.check(Cd,C,b)(w)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),h(w))}function h(w){return w===null||X(w)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),p(w)):fe(w)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),Se(e,f,"whitespace")(w)):w===96&&w===a?n(w):(e.consume(w),h)}function f(w){return w===null||X(w)?p(w):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),k(w))}function k(w){return w===null||X(w)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),p(w)):w===96&&w===a?n(w):(e.consume(w),k)}function C(w){return e.attempt(i,b,A)(w)}function A(w){return e.enter("lineEnding"),e.consume(w),e.exit("lineEnding"),g}function g(w){return s>0&&fe(w)?Se(e,m,"linePrefix",s+1)(w):m(w)}function m(w){return w===null||X(w)?e.check(Cd,C,b)(w):(e.enter("codeFlowValue"),x(w))}function x(w){return w===null||X(w)?(e.exit("codeFlowValue"),m(w)):(e.consume(w),x)}function b(w){return e.exit("codeFenced"),t(w)}function j(w,E,_){let W=0;return D;function D(Z){return w.enter("lineEnding"),w.consume(Z),w.exit("lineEnding"),B}function B(Z){return w.enter("codeFencedFence"),fe(Z)?Se(w,U,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(Z):U(Z)}function U(Z){return Z===a?(w.enter("codeFencedFenceSequence"),G(Z)):_(Z)}function G(Z){return Z===a?(W++,w.consume(Z),G):W>=l?(w.exit("codeFencedFenceSequence"),fe(Z)?Se(w,de,"whitespace")(Z):de(Z)):_(Z)}function de(Z){return Z===null||X(Z)?(w.exit("codeFencedFence"),E(Z)):_(Z)}}}function By(e,t,n){const r=this;return i;function i(l){return l===null?n(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),s)}function s(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}const pl={name:"codeIndented",tokenize:Hy},Uy={partial:!0,tokenize:$y};function Hy(e,t,n){const r=this;return i;function i(u){return e.enter("codeIndented"),Se(e,s,"linePrefix",5)(u)}function s(u){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?l(u):n(u)}function l(u){return u===null?c(u):X(u)?e.attempt(Uy,l,c)(u):(e.enter("codeFlowValue"),a(u))}function a(u){return u===null||X(u)?(e.exit("codeFlowValue"),l(u)):(e.consume(u),a)}function c(u){return e.exit("codeIndented"),t(u)}}function $y(e,t,n){const r=this;return i;function i(l){return r.parser.lazy[r.now().line]?n(l):X(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i):Se(e,s,"linePrefix",5)(l)}function s(l){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):X(l)?i(l):n(l)}}const Vy={name:"codeText",previous:qy,resolve:Wy,tokenize:Yy};function Wy(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function qy(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Yy(e,t,n){let r=0,i,s;return l;function l(p){return e.enter("codeText"),e.enter("codeTextSequence"),a(p)}function a(p){return p===96?(e.consume(p),r++,a):(e.exit("codeTextSequence"),c(p))}function c(p){return p===null?n(p):p===32?(e.enter("space"),e.consume(p),e.exit("space"),c):p===96?(s=e.enter("codeTextSequence"),i=0,d(p)):X(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),c):(e.enter("codeTextData"),u(p))}function u(p){return p===null||p===32||p===96||X(p)?(e.exit("codeTextData"),c(p)):(e.consume(p),u)}function d(p){return p===96?(e.consume(p),i++,d):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(p)):(s.type="codeTextData",u(p))}}class Qy{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const s=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&pi(this.left,r),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),pi(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),pi(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);pi(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);pi(this.left,n.reverse())}}}function pi(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function $h(e){const t={};let n=-1,r,i,s,l,a,c,u;const d=new Qy(e);for(;++n<d.length;){for(;n in t;)n=t[n];if(r=d.get(n),n&&r[1].type==="chunkFlow"&&d.get(n-1)[1].type==="listItemPrefix"&&(c=r[1]._tokenizer.events,s=0,s<c.length&&c[s][1].type==="lineEndingBlank"&&(s+=2),s<c.length&&c[s][1].type==="content"))for(;++s<c.length&&c[s][1].type!=="content";)c[s][1].type==="chunkText"&&(c[s][1]._isInFirstContentOfListItem=!0,s++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,Gy(d,n)),n=t[n],u=!0);else if(r[1]._container){for(s=n,i=void 0;s--;)if(l=d.get(s),l[1].type==="lineEnding"||l[1].type==="lineEndingBlank")l[0]==="enter"&&(i&&(d.get(i)[1].type="lineEndingBlank"),l[1].type="lineEnding",i=s);else if(!(l[1].type==="linePrefix"||l[1].type==="listItemIndent"))break;i&&(r[1].end={...d.get(i)[1].start},a=d.slice(i,n),a.unshift(r),d.splice(i,n-i+1,a))}}return an(e,0,Number.POSITIVE_INFINITY,d.slice(0)),!u}function Gy(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const s=[];let l=n._tokenizer;l||(l=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(l._contentTypeTextTrailing=!0));const a=l.events,c=[],u={};let d,p,h=-1,f=n,k=0,C=0;const A=[C];for(;f;){for(;e.get(++i)[1]!==f;);s.push(i),f._tokenizer||(d=r.sliceStream(f),f.next||d.push(null),p&&l.defineSkip(f.start),f._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=!0),l.write(d),f._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=void 0)),p=f,f=f.next}for(f=n;++h<a.length;)a[h][0]==="exit"&&a[h-1][0]==="enter"&&a[h][1].type===a[h-1][1].type&&a[h][1].start.line!==a[h][1].end.line&&(C=h+1,A.push(C),f._tokenizer=void 0,f.previous=void 0,f=f.next);for(l.events=[],f?(f._tokenizer=void 0,f.previous=void 0):A.pop(),h=A.length;h--;){const g=a.slice(A[h],A[h+1]),m=s.pop();c.push([m,m+g.length-1]),e.splice(m,2,g)}for(c.reverse(),h=-1;++h<c.length;)u[k+c[h][0]]=k+c[h][1],k+=c[h][1]-c[h][0]-1;return u}const Ky={resolve:Jy,tokenize:Zy},Xy={partial:!0,tokenize:e1};function Jy(e){return $h(e),e}function Zy(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?s(a):X(a)?e.check(Xy,l,s)(a):(e.consume(a),i)}function s(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function l(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function e1(e,t,n){const r=this;return i;function i(l){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),Se(e,s,"linePrefix")}function s(l){if(l===null||X(l))return n(l);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):e.interrupt(r.parser.constructs.flow,n,t)(l)}}function Vh(e,t,n,r,i,s,l,a,c){const u=c||Number.POSITIVE_INFINITY;let d=0;return p;function p(g){return g===60?(e.enter(r),e.enter(i),e.enter(s),e.consume(g),e.exit(s),h):g===null||g===32||g===41||Na(g)?n(g):(e.enter(r),e.enter(l),e.enter(a),e.enter("chunkString",{contentType:"string"}),C(g))}function h(g){return g===62?(e.enter(s),e.consume(g),e.exit(s),e.exit(i),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),f(g))}function f(g){return g===62?(e.exit("chunkString"),e.exit(a),h(g)):g===null||g===60||X(g)?n(g):(e.consume(g),g===92?k:f)}function k(g){return g===60||g===62||g===92?(e.consume(g),f):f(g)}function C(g){return!d&&(g===null||g===41||wt(g))?(e.exit("chunkString"),e.exit(a),e.exit(l),e.exit(r),t(g)):d<u&&g===40?(e.consume(g),d++,C):g===41?(e.consume(g),d--,C):g===null||g===32||g===40||Na(g)?n(g):(e.consume(g),g===92?A:C)}function A(g){return g===40||g===41||g===92?(e.consume(g),C):C(g)}}function Wh(e,t,n,r,i,s){const l=this;let a=0,c;return u;function u(f){return e.enter(r),e.enter(i),e.consume(f),e.exit(i),e.enter(s),d}function d(f){return a>999||f===null||f===91||f===93&&!c||f===94&&!a&&"_hiddenFootnoteSupport"in l.parser.constructs?n(f):f===93?(e.exit(s),e.enter(i),e.consume(f),e.exit(i),e.exit(r),t):X(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),p(f))}function p(f){return f===null||f===91||f===93||X(f)||a++>999?(e.exit("chunkString"),d(f)):(e.consume(f),c||(c=!fe(f)),f===92?h:p)}function h(f){return f===91||f===92||f===93?(e.consume(f),a++,p):p(f)}}function qh(e,t,n,r,i,s){let l;return a;function a(h){return h===34||h===39||h===40?(e.enter(r),e.enter(i),e.consume(h),e.exit(i),l=h===40?41:h,c):n(h)}function c(h){return h===l?(e.enter(i),e.consume(h),e.exit(i),e.exit(r),t):(e.enter(s),u(h))}function u(h){return h===l?(e.exit(s),c(l)):h===null?n(h):X(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),Se(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(h))}function d(h){return h===l||h===null||X(h)?(e.exit("chunkString"),u(h)):(e.consume(h),h===92?p:d)}function p(h){return h===l||h===92?(e.consume(h),d):d(h)}}function Pi(e,t){let n;return r;function r(i){return X(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):fe(i)?Se(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const t1={name:"definition",tokenize:r1},n1={partial:!0,tokenize:i1};function r1(e,t,n){const r=this;let i;return s;function s(f){return e.enter("definition"),l(f)}function l(f){return Wh.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(f)}function a(f){return i=$r(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),f===58?(e.enter("definitionMarker"),e.consume(f),e.exit("definitionMarker"),c):n(f)}function c(f){return wt(f)?Pi(e,u)(f):u(f)}function u(f){return Vh(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(f)}function d(f){return e.attempt(n1,p,p)(f)}function p(f){return fe(f)?Se(e,h,"whitespace")(f):h(f)}function h(f){return f===null||X(f)?(e.exit("definition"),r.parser.defined.push(i),t(f)):n(f)}}function i1(e,t,n){return r;function r(a){return wt(a)?Pi(e,i)(a):n(a)}function i(a){return qh(e,s,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function s(a){return fe(a)?Se(e,l,"whitespace")(a):l(a)}function l(a){return a===null||X(a)?t(a):n(a)}}const s1={name:"hardBreakEscape",tokenize:o1};function o1(e,t,n){return r;function r(s){return e.enter("hardBreakEscape"),e.consume(s),i}function i(s){return X(s)?(e.exit("hardBreakEscape"),t(s)):n(s)}}const l1={name:"headingAtx",resolve:a1,tokenize:c1};function a1(e,t){let n=e.length-2,r=3,i,s;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},s={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},an(e,r,n-r+1,[["enter",i,t],["enter",s,t],["exit",s,t],["exit",i,t]])),e}function c1(e,t,n){let r=0;return i;function i(d){return e.enter("atxHeading"),s(d)}function s(d){return e.enter("atxHeadingSequence"),l(d)}function l(d){return d===35&&r++<6?(e.consume(d),l):d===null||wt(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),c(d)):d===null||X(d)?(e.exit("atxHeading"),t(d)):fe(d)?Se(e,a,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function c(d){return d===35?(e.consume(d),c):(e.exit("atxHeadingSequence"),a(d))}function u(d){return d===null||d===35||wt(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),u)}}const u1=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Ed=["pre","script","style","textarea"],d1={concrete:!0,name:"htmlFlow",resolveTo:h1,tokenize:m1},p1={partial:!0,tokenize:x1},f1={partial:!0,tokenize:g1};function h1(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function m1(e,t,n){const r=this;let i,s,l,a,c;return u;function u(v){return d(v)}function d(v){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(v),p}function p(v){return v===33?(e.consume(v),h):v===47?(e.consume(v),s=!0,C):v===63?(e.consume(v),i=3,r.interrupt?t:y):rn(v)?(e.consume(v),l=String.fromCharCode(v),A):n(v)}function h(v){return v===45?(e.consume(v),i=2,f):v===91?(e.consume(v),i=5,a=0,k):rn(v)?(e.consume(v),i=4,r.interrupt?t:y):n(v)}function f(v){return v===45?(e.consume(v),r.interrupt?t:y):n(v)}function k(v){const oe="CDATA[";return v===oe.charCodeAt(a++)?(e.consume(v),a===oe.length?r.interrupt?t:U:k):n(v)}function C(v){return rn(v)?(e.consume(v),l=String.fromCharCode(v),A):n(v)}function A(v){if(v===null||v===47||v===62||wt(v)){const oe=v===47,Re=l.toLowerCase();return!oe&&!s&&Ed.includes(Re)?(i=1,r.interrupt?t(v):U(v)):u1.includes(l.toLowerCase())?(i=6,oe?(e.consume(v),g):r.interrupt?t(v):U(v)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(v):s?m(v):x(v))}return v===45||It(v)?(e.consume(v),l+=String.fromCharCode(v),A):n(v)}function g(v){return v===62?(e.consume(v),r.interrupt?t:U):n(v)}function m(v){return fe(v)?(e.consume(v),m):D(v)}function x(v){return v===47?(e.consume(v),D):v===58||v===95||rn(v)?(e.consume(v),b):fe(v)?(e.consume(v),x):D(v)}function b(v){return v===45||v===46||v===58||v===95||It(v)?(e.consume(v),b):j(v)}function j(v){return v===61?(e.consume(v),w):fe(v)?(e.consume(v),j):x(v)}function w(v){return v===null||v===60||v===61||v===62||v===96?n(v):v===34||v===39?(e.consume(v),c=v,E):fe(v)?(e.consume(v),w):_(v)}function E(v){return v===c?(e.consume(v),c=null,W):v===null||X(v)?n(v):(e.consume(v),E)}function _(v){return v===null||v===34||v===39||v===47||v===60||v===61||v===62||v===96||wt(v)?j(v):(e.consume(v),_)}function W(v){return v===47||v===62||fe(v)?x(v):n(v)}function D(v){return v===62?(e.consume(v),B):n(v)}function B(v){return v===null||X(v)?U(v):fe(v)?(e.consume(v),B):n(v)}function U(v){return v===45&&i===2?(e.consume(v),ae):v===60&&i===1?(e.consume(v),se):v===62&&i===4?(e.consume(v),K):v===63&&i===3?(e.consume(v),y):v===93&&i===5?(e.consume(v),q):X(v)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(p1,re,G)(v)):v===null||X(v)?(e.exit("htmlFlowData"),G(v)):(e.consume(v),U)}function G(v){return e.check(f1,de,re)(v)}function de(v){return e.enter("lineEnding"),e.consume(v),e.exit("lineEnding"),Z}function Z(v){return v===null||X(v)?G(v):(e.enter("htmlFlowData"),U(v))}function ae(v){return v===45?(e.consume(v),y):U(v)}function se(v){return v===47?(e.consume(v),l="",L):U(v)}function L(v){if(v===62){const oe=l.toLowerCase();return Ed.includes(oe)?(e.consume(v),K):U(v)}return rn(v)&&l.length<8?(e.consume(v),l+=String.fromCharCode(v),L):U(v)}function q(v){return v===93?(e.consume(v),y):U(v)}function y(v){return v===62?(e.consume(v),K):v===45&&i===2?(e.consume(v),y):U(v)}function K(v){return v===null||X(v)?(e.exit("htmlFlowData"),re(v)):(e.consume(v),K)}function re(v){return e.exit("htmlFlow"),t(v)}}function g1(e,t,n){const r=this;return i;function i(l){return X(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),s):n(l)}function s(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function x1(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(To,t,n)}}const y1={name:"htmlText",tokenize:b1};function b1(e,t,n){const r=this;let i,s,l;return a;function a(y){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(y),c}function c(y){return y===33?(e.consume(y),u):y===47?(e.consume(y),j):y===63?(e.consume(y),x):rn(y)?(e.consume(y),_):n(y)}function u(y){return y===45?(e.consume(y),d):y===91?(e.consume(y),s=0,k):rn(y)?(e.consume(y),m):n(y)}function d(y){return y===45?(e.consume(y),f):n(y)}function p(y){return y===null?n(y):y===45?(e.consume(y),h):X(y)?(l=p,se(y)):(e.consume(y),p)}function h(y){return y===45?(e.consume(y),f):p(y)}function f(y){return y===62?ae(y):y===45?h(y):p(y)}function k(y){const K="CDATA[";return y===K.charCodeAt(s++)?(e.consume(y),s===K.length?C:k):n(y)}function C(y){return y===null?n(y):y===93?(e.consume(y),A):X(y)?(l=C,se(y)):(e.consume(y),C)}function A(y){return y===93?(e.consume(y),g):C(y)}function g(y){return y===62?ae(y):y===93?(e.consume(y),g):C(y)}function m(y){return y===null||y===62?ae(y):X(y)?(l=m,se(y)):(e.consume(y),m)}function x(y){return y===null?n(y):y===63?(e.consume(y),b):X(y)?(l=x,se(y)):(e.consume(y),x)}function b(y){return y===62?ae(y):x(y)}function j(y){return rn(y)?(e.consume(y),w):n(y)}function w(y){return y===45||It(y)?(e.consume(y),w):E(y)}function E(y){return X(y)?(l=E,se(y)):fe(y)?(e.consume(y),E):ae(y)}function _(y){return y===45||It(y)?(e.consume(y),_):y===47||y===62||wt(y)?W(y):n(y)}function W(y){return y===47?(e.consume(y),ae):y===58||y===95||rn(y)?(e.consume(y),D):X(y)?(l=W,se(y)):fe(y)?(e.consume(y),W):ae(y)}function D(y){return y===45||y===46||y===58||y===95||It(y)?(e.consume(y),D):B(y)}function B(y){return y===61?(e.consume(y),U):X(y)?(l=B,se(y)):fe(y)?(e.consume(y),B):W(y)}function U(y){return y===null||y===60||y===61||y===62||y===96?n(y):y===34||y===39?(e.consume(y),i=y,G):X(y)?(l=U,se(y)):fe(y)?(e.consume(y),U):(e.consume(y),de)}function G(y){return y===i?(e.consume(y),i=void 0,Z):y===null?n(y):X(y)?(l=G,se(y)):(e.consume(y),G)}function de(y){return y===null||y===34||y===39||y===60||y===61||y===96?n(y):y===47||y===62||wt(y)?W(y):(e.consume(y),de)}function Z(y){return y===47||y===62||wt(y)?W(y):n(y)}function ae(y){return y===62?(e.consume(y),e.exit("htmlTextData"),e.exit("htmlText"),t):n(y)}function se(y){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(y),e.exit("lineEnding"),L}function L(y){return fe(y)?Se(e,q,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(y):q(y)}function q(y){return e.enter("htmlTextData"),l(y)}}const Lc={name:"labelEnd",resolveAll:j1,resolveTo:S1,tokenize:C1},v1={tokenize:N1},w1={tokenize:E1},k1={tokenize:z1};function j1(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&an(e,0,e.length,n),e}function S1(e,t){let n=e.length,r=0,i,s,l,a;for(;n--;)if(i=e[n][1],s){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(l){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(s=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(l=n);const c={type:e[s][1].type==="labelLink"?"link":"image",start:{...e[s][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[s][1].start},end:{...e[l][1].end}},d={type:"labelText",start:{...e[s+r+2][1].end},end:{...e[l-2][1].start}};return a=[["enter",c,t],["enter",u,t]],a=Ot(a,e.slice(s+1,s+r+3)),a=Ot(a,[["enter",d,t]]),a=Ot(a,Rc(t.parser.constructs.insideSpan.null,e.slice(s+r+4,l-3),t)),a=Ot(a,[["exit",d,t],e[l-2],e[l-1],["exit",u,t]]),a=Ot(a,e.slice(l+1)),a=Ot(a,[["exit",c,t]]),an(e,s,e.length,a),e}function C1(e,t,n){const r=this;let i=r.events.length,s,l;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){s=r.events[i][1];break}return a;function a(h){return s?s._inactive?p(h):(l=r.parser.defined.includes($r(r.sliceSerialize({start:s.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(h),e.exit("labelMarker"),e.exit("labelEnd"),c):n(h)}function c(h){return h===40?e.attempt(v1,d,l?d:p)(h):h===91?e.attempt(w1,d,l?u:p)(h):l?d(h):p(h)}function u(h){return e.attempt(k1,d,p)(h)}function d(h){return t(h)}function p(h){return s._balanced=!0,n(h)}}function N1(e,t,n){return r;function r(p){return e.enter("resource"),e.enter("resourceMarker"),e.consume(p),e.exit("resourceMarker"),i}function i(p){return wt(p)?Pi(e,s)(p):s(p)}function s(p){return p===41?d(p):Vh(e,l,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(p)}function l(p){return wt(p)?Pi(e,c)(p):d(p)}function a(p){return n(p)}function c(p){return p===34||p===39||p===40?qh(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(p):d(p)}function u(p){return wt(p)?Pi(e,d)(p):d(p)}function d(p){return p===41?(e.enter("resourceMarker"),e.consume(p),e.exit("resourceMarker"),e.exit("resource"),t):n(p)}}function E1(e,t,n){const r=this;return i;function i(a){return Wh.call(r,e,s,l,"reference","referenceMarker","referenceString")(a)}function s(a){return r.parser.defined.includes($r(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function l(a){return n(a)}}function z1(e,t,n){return r;function r(s){return e.enter("reference"),e.enter("referenceMarker"),e.consume(s),e.exit("referenceMarker"),i}function i(s){return s===93?(e.enter("referenceMarker"),e.consume(s),e.exit("referenceMarker"),e.exit("reference"),t):n(s)}}const _1={name:"labelStartImage",resolveAll:Lc.resolveAll,tokenize:I1};function I1(e,t,n){const r=this;return i;function i(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),s}function s(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),l):n(a)}function l(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const P1={name:"labelStartLink",resolveAll:Lc.resolveAll,tokenize:T1};function T1(e,t,n){const r=this;return i;function i(l){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelLink"),s}function s(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):t(l)}}const fl={name:"lineEnding",tokenize:A1};function A1(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),Se(e,t,"linePrefix")}}const Os={name:"thematicBreak",tokenize:M1};function M1(e,t,n){let r=0,i;return s;function s(u){return e.enter("thematicBreak"),l(u)}function l(u){return i=u,a(u)}function a(u){return u===i?(e.enter("thematicBreakSequence"),c(u)):r>=3&&(u===null||X(u))?(e.exit("thematicBreak"),t(u)):n(u)}function c(u){return u===i?(e.consume(u),r++,c):(e.exit("thematicBreakSequence"),fe(u)?Se(e,a,"whitespace")(u):a(u))}}const mt={continuation:{tokenize:O1},exit:B1,name:"list",tokenize:D1},R1={partial:!0,tokenize:U1},L1={partial:!0,tokenize:F1};function D1(e,t,n){const r=this,i=r.events[r.events.length-1];let s=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,l=0;return a;function a(f){const k=r.containerState.type||(f===42||f===43||f===45?"listUnordered":"listOrdered");if(k==="listUnordered"?!r.containerState.marker||f===r.containerState.marker:Ea(f)){if(r.containerState.type||(r.containerState.type=k,e.enter(k,{_container:!0})),k==="listUnordered")return e.enter("listItemPrefix"),f===42||f===45?e.check(Os,n,u)(f):u(f);if(!r.interrupt||f===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),c(f)}return n(f)}function c(f){return Ea(f)&&++l<10?(e.consume(f),c):(!r.interrupt||l<2)&&(r.containerState.marker?f===r.containerState.marker:f===41||f===46)?(e.exit("listItemValue"),u(f)):n(f)}function u(f){return e.enter("listItemMarker"),e.consume(f),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||f,e.check(To,r.interrupt?n:d,e.attempt(R1,h,p))}function d(f){return r.containerState.initialBlankLine=!0,s++,h(f)}function p(f){return fe(f)?(e.enter("listItemPrefixWhitespace"),e.consume(f),e.exit("listItemPrefixWhitespace"),h):n(f)}function h(f){return r.containerState.size=s+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(f)}}function O1(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(To,i,s);function i(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,Se(e,t,"listItemIndent",r.containerState.size+1)(a)}function s(a){return r.containerState.furtherBlankLines||!fe(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,l(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(L1,t,l)(a))}function l(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,Se(e,e.attempt(mt,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function F1(e,t,n){const r=this;return Se(e,i,"listItemIndent",r.containerState.size+1);function i(s){const l=r.events[r.events.length-1];return l&&l[1].type==="listItemIndent"&&l[2].sliceSerialize(l[1],!0).length===r.containerState.size?t(s):n(s)}}function B1(e){e.exit(this.containerState.type)}function U1(e,t,n){const r=this;return Se(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(s){const l=r.events[r.events.length-1];return!fe(s)&&l&&l[1].type==="listItemPrefixWhitespace"?t(s):n(s)}}const zd={name:"setextUnderline",resolveTo:H1,tokenize:$1};function H1(e,t){let n=e.length,r,i,s;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!s&&e[n][1].type==="definition"&&(s=n);const l={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",s?(e.splice(i,0,["enter",l,t]),e.splice(s+1,0,["exit",e[r][1],t]),e[r][1].end={...e[s][1].end}):e[r][1]=l,e.push(["exit",l,t]),e}function $1(e,t,n){const r=this;let i;return s;function s(u){let d=r.events.length,p;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){p=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||p)?(e.enter("setextHeadingLine"),i=u,l(u)):n(u)}function l(u){return e.enter("setextHeadingLineSequence"),a(u)}function a(u){return u===i?(e.consume(u),a):(e.exit("setextHeadingLineSequence"),fe(u)?Se(e,c,"lineSuffix")(u):c(u))}function c(u){return u===null||X(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const V1={tokenize:W1};function W1(e){const t=this,n=e.attempt(To,r,e.attempt(this.parser.constructs.flowInitial,i,Se(e,e.attempt(this.parser.constructs.flow,i,e.attempt(Ky,i)),"linePrefix")));return n;function r(s){if(s===null){e.consume(s);return}return e.enter("lineEndingBlank"),e.consume(s),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(s){if(s===null){e.consume(s);return}return e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const q1={resolveAll:Qh()},Y1=Yh("string"),Q1=Yh("text");function Yh(e){return{resolveAll:Qh(e==="text"?G1:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],s=n.attempt(i,l,a);return l;function l(d){return u(d)?s(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),c}function c(d){return u(d)?(n.exit("data"),s(d)):(n.consume(d),c)}function u(d){if(d===null)return!0;const p=i[d];let h=-1;if(p)for(;++h<p.length;){const f=p[h];if(!f.previous||f.previous.call(r,r.previous))return!0}return!1}}}function Qh(e){return t;function t(n,r){let i=-1,s;for(;++i<=n.length;)s===void 0?n[i]&&n[i][1].type==="data"&&(s=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==s+2&&(n[s][1].end=n[i-1][1].end,n.splice(s+2,i-s-2),i=s+2),s=void 0);return e?e(n,r):n}}function G1(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let s=i.length,l=-1,a=0,c;for(;s--;){const u=i[s];if(typeof u=="string"){for(l=u.length;u.charCodeAt(l-1)===32;)a++,l--;if(l)break;l=-1}else if(u===-2)c=!0,a++;else if(u!==-1){s++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(a=0),a){const u={type:n===e.length||c||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?l:r.start._bufferIndex+l,_index:r.start._index+s,line:r.end.line,column:r.end.column-a,offset:r.end.offset-a},end:{...r.end}};r.end={...u.start},r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}const K1={42:mt,43:mt,45:mt,48:mt,49:mt,50:mt,51:mt,52:mt,53:mt,54:mt,55:mt,56:mt,57:mt,62:Bh},X1={91:t1},J1={[-2]:pl,[-1]:pl,32:pl},Z1={35:l1,42:Os,45:[zd,Os],60:d1,61:zd,95:Os,96:Nd,126:Nd},eb={38:Hh,92:Uh},tb={[-5]:fl,[-4]:fl,[-3]:fl,33:_1,38:Hh,42:za,60:[Py,y1],91:P1,92:[s1,Uh],93:Lc,95:za,96:Vy},nb={null:[za,q1]},rb={null:[42,95]},ib={null:[]},sb=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:rb,contentInitial:X1,disable:ib,document:K1,flow:Z1,flowInitial:J1,insideSpan:nb,string:eb,text:tb},Symbol.toStringTag,{value:"Module"}));function ob(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},s=[];let l=[],a=[];const c={attempt:E(j),check:E(w),consume:m,enter:x,exit:b,interrupt:E(w,{interrupt:!0})},u={code:null,containerState:{},defineSkip:C,events:[],now:k,parser:e,previous:null,sliceSerialize:h,sliceStream:f,write:p};let d=t.tokenize.call(u,c);return t.resolveAll&&s.push(t),u;function p(B){return l=Ot(l,B),A(),l[l.length-1]!==null?[]:(_(t,0),u.events=Rc(s,u.events,u),u.events)}function h(B,U){return ab(f(B),U)}function f(B){return lb(l,B)}function k(){const{_bufferIndex:B,_index:U,line:G,column:de,offset:Z}=r;return{_bufferIndex:B,_index:U,line:G,column:de,offset:Z}}function C(B){i[B.line]=B.column,D()}function A(){let B;for(;r._index<l.length;){const U=l[r._index];if(typeof U=="string")for(B=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===B&&r._bufferIndex<U.length;)g(U.charCodeAt(r._bufferIndex));else g(U)}}function g(B){d=d(B)}function m(B){X(B)?(r.line++,r.column=1,r.offset+=B===-3?2:1,D()):B!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===l[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=B}function x(B,U){const G=U||{};return G.type=B,G.start=k(),u.events.push(["enter",G,u]),a.push(G),G}function b(B){const U=a.pop();return U.end=k(),u.events.push(["exit",U,u]),U}function j(B,U){_(B,U.from)}function w(B,U){U.restore()}function E(B,U){return G;function G(de,Z,ae){let se,L,q,y;return Array.isArray(de)?re(de):"tokenize"in de?re([de]):K(de);function K(ce){return Ge;function Ge($e){const at=$e!==null&&ce[$e],Le=$e!==null&&ce.null,jt=[...Array.isArray(at)?at:at?[at]:[],...Array.isArray(Le)?Le:Le?[Le]:[]];return re(jt)($e)}}function re(ce){return se=ce,L=0,ce.length===0?ae:v(ce[L])}function v(ce){return Ge;function Ge($e){return y=W(),q=ce,ce.partial||(u.currentConstruct=ce),ce.name&&u.parser.constructs.disable.null.includes(ce.name)?Re():ce.tokenize.call(U?Object.assign(Object.create(u),U):u,c,oe,Re)($e)}}function oe(ce){return B(q,y),Z}function Re(ce){return y.restore(),++L<se.length?v(se[L]):ae}}}function _(B,U){B.resolveAll&&!s.includes(B)&&s.push(B),B.resolve&&an(u.events,U,u.events.length-U,B.resolve(u.events.slice(U),u)),B.resolveTo&&(u.events=B.resolveTo(u.events,u))}function W(){const B=k(),U=u.previous,G=u.currentConstruct,de=u.events.length,Z=Array.from(a);return{from:de,restore:ae};function ae(){r=B,u.previous=U,u.currentConstruct=G,u.events.length=de,a=Z,D()}}function D(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function lb(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,s=t.end._bufferIndex;let l;if(n===i)l=[e[n].slice(r,s)];else{if(l=e.slice(n,i),r>-1){const a=l[0];typeof a=="string"?l[0]=a.slice(r):l.shift()}s>0&&l.push(e[i].slice(0,s))}return l}function ab(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const s=e[n];let l;if(typeof s=="string")l=s;else switch(s){case-5:{l="\r";break}case-4:{l=`
`;break}case-3:{l=`\r
`;break}case-2:{l=t?" ":"	";break}case-1:{if(!t&&i)continue;l=" ";break}default:l=String.fromCharCode(s)}i=s===-2,r.push(l)}return r.join("")}function cb(e){const r={constructs:gy([sb,...(e||{}).extensions||[]]),content:i(Sy),defined:[],document:i(Ny),flow:i(V1),lazy:{},string:i(Y1),text:i(Q1)};return r;function i(s){return l;function l(a){return ob(r,s,a)}}}function ub(e){for(;!$h(e););return e}const _d=/[\0\t\n\r]/g;function db(){let e=1,t="",n=!0,r;return i;function i(s,l,a){const c=[];let u,d,p,h,f;for(s=t+(typeof s=="string"?s.toString():new TextDecoder(l||void 0).decode(s)),p=0,t="",n&&(s.charCodeAt(0)===65279&&p++,n=void 0);p<s.length;){if(_d.lastIndex=p,u=_d.exec(s),h=u&&u.index!==void 0?u.index:s.length,f=s.charCodeAt(h),!u){t=s.slice(p);break}if(f===10&&p===h&&r)c.push(-3),r=void 0;else switch(r&&(c.push(-5),r=void 0),p<h&&(c.push(s.slice(p,h)),e+=h-p),f){case 0:{c.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,c.push(-2);e++<d;)c.push(-1);break}case 10:{c.push(-4),e=1;break}default:r=!0,e=1}p=h+1}return a&&(r&&c.push(-5),t&&c.push(t),c.push(null)),c}}const pb=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function fb(e){return e.replace(pb,hb)}function hb(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),s=i===120||i===88;return Fh(n.slice(s?2:1),s?16:10)}return Mc(n)||e}const Gh={}.hasOwnProperty;function mb(e,t,n){return typeof t!="string"&&(n=t,t=void 0),gb(n)(ub(cb(n).document().write(db()(e,t,!0))))}function gb(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(un),autolinkProtocol:W,autolinkEmail:W,atxHeading:s(Rt),blockQuote:s(Le),characterEscape:W,characterReference:W,codeFenced:s(jt),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:s(jt,l),codeText:s(Cn,l),codeTextData:W,data:W,codeFlowValue:W,definition:s(cn),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:s(St),hardBreakEscape:s(Gn),hardBreakTrailing:s(Gn),htmlFlow:s(Kn,l),htmlFlowData:W,htmlText:s(Kn,l),htmlTextData:W,image:s(xr),label:l,link:s(un),listItem:s(be),listItemValue:h,listOrdered:s(le,p),listUnordered:s(le),paragraph:s(Ce),reference:v,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:s(Rt),strong:s(Be),thematicBreak:s($t)},exit:{atxHeading:c(),atxHeadingSequence:j,autolink:c(),autolinkEmail:at,autolinkProtocol:$e,blockQuote:c(),characterEscapeValue:D,characterReferenceMarkerHexadecimal:Re,characterReferenceMarkerNumeric:Re,characterReferenceValue:ce,characterReference:Ge,codeFenced:c(A),codeFencedFence:C,codeFencedFenceInfo:f,codeFencedFenceMeta:k,codeFlowValue:D,codeIndented:c(g),codeText:c(Z),codeTextData:D,data:D,definition:c(),definitionDestinationString:b,definitionLabelString:m,definitionTitleString:x,emphasis:c(),hardBreakEscape:c(U),hardBreakTrailing:c(U),htmlFlow:c(G),htmlFlowData:D,htmlText:c(de),htmlTextData:D,image:c(se),label:q,labelText:L,lineEnding:B,link:c(ae),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:oe,resourceDestinationString:y,resourceTitleString:K,resource:re,setextHeading:c(_),setextHeadingLineSequence:E,setextHeadingText:w,strong:c(),thematicBreak:c()}};Kh(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(z){let O={type:"root",children:[]};const J={stack:[O],tokenStack:[],config:t,enter:a,exit:u,buffer:l,resume:d,data:n},ne=[];let he=-1;for(;++he<z.length;)if(z[he][1].type==="listOrdered"||z[he][1].type==="listUnordered")if(z[he][0]==="enter")ne.push(he);else{const Ct=ne.pop();he=i(z,Ct,he)}for(he=-1;++he<z.length;){const Ct=t[z[he][0]];Gh.call(Ct,z[he][1].type)&&Ct[z[he][1].type].call(Object.assign({sliceSerialize:z[he][2].sliceSerialize},J),z[he][1])}if(J.tokenStack.length>0){const Ct=J.tokenStack[J.tokenStack.length-1];(Ct[1]||Id).call(J,void 0,Ct[0])}for(O.position={start:zn(z.length>0?z[0][1].start:{line:1,column:1,offset:0}),end:zn(z.length>0?z[z.length-2][1].end:{line:1,column:1,offset:0})},he=-1;++he<t.transforms.length;)O=t.transforms[he](O)||O;return O}function i(z,O,J){let ne=O-1,he=-1,Ct=!1,dn,Nt,Xn,pn;for(;++ne<=J;){const ct=z[ne];switch(ct[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{ct[0]==="enter"?he++:he--,pn=void 0;break}case"lineEndingBlank":{ct[0]==="enter"&&(dn&&!pn&&!he&&!Xn&&(Xn=ne),pn=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:pn=void 0}if(!he&&ct[0]==="enter"&&ct[1].type==="listItemPrefix"||he===-1&&ct[0]==="exit"&&(ct[1].type==="listUnordered"||ct[1].type==="listOrdered")){if(dn){let Nn=ne;for(Nt=void 0;Nn--;){const tt=z[Nn];if(tt[1].type==="lineEnding"||tt[1].type==="lineEndingBlank"){if(tt[0]==="exit")continue;Nt&&(z[Nt][1].type="lineEndingBlank",Ct=!0),tt[1].type="lineEnding",Nt=Nn}else if(!(tt[1].type==="linePrefix"||tt[1].type==="blockQuotePrefix"||tt[1].type==="blockQuotePrefixWhitespace"||tt[1].type==="blockQuoteMarker"||tt[1].type==="listItemIndent"))break}Xn&&(!Nt||Xn<Nt)&&(dn._spread=!0),dn.end=Object.assign({},Nt?z[Nt][1].start:ct[1].end),z.splice(Nt||ne,0,["exit",dn,ct[2]]),ne++,J++}if(ct[1].type==="listItemPrefix"){const Nn={type:"listItem",_spread:!1,start:Object.assign({},ct[1].start),end:void 0};dn=Nn,z.splice(ne,0,["enter",Nn,ct[2]]),ne++,J++,Xn=void 0,pn=!0}}}return z[O][1]._spread=Ct,J}function s(z,O){return J;function J(ne){a.call(this,z(ne),ne),O&&O.call(this,ne)}}function l(){this.stack.push({type:"fragment",children:[]})}function a(z,O,J){this.stack[this.stack.length-1].children.push(z),this.stack.push(z),this.tokenStack.push([O,J||void 0]),z.position={start:zn(O.start),end:void 0}}function c(z){return O;function O(J){z&&z.call(this,J),u.call(this,J)}}function u(z,O){const J=this.stack.pop(),ne=this.tokenStack.pop();if(ne)ne[0].type!==z.type&&(O?O.call(this,z,ne[0]):(ne[1]||Id).call(this,z,ne[0]));else throw new Error("Cannot close `"+z.type+"` ("+Ii({start:z.start,end:z.end})+"): it’s not open");J.position.end=zn(z.end)}function d(){return hy(this.stack.pop())}function p(){this.data.expectingFirstListItemValue=!0}function h(z){if(this.data.expectingFirstListItemValue){const O=this.stack[this.stack.length-2];O.start=Number.parseInt(this.sliceSerialize(z),10),this.data.expectingFirstListItemValue=void 0}}function f(){const z=this.resume(),O=this.stack[this.stack.length-1];O.lang=z}function k(){const z=this.resume(),O=this.stack[this.stack.length-1];O.meta=z}function C(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function A(){const z=this.resume(),O=this.stack[this.stack.length-1];O.value=z.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const z=this.resume(),O=this.stack[this.stack.length-1];O.value=z.replace(/(\r?\n|\r)$/g,"")}function m(z){const O=this.resume(),J=this.stack[this.stack.length-1];J.label=O,J.identifier=$r(this.sliceSerialize(z)).toLowerCase()}function x(){const z=this.resume(),O=this.stack[this.stack.length-1];O.title=z}function b(){const z=this.resume(),O=this.stack[this.stack.length-1];O.url=z}function j(z){const O=this.stack[this.stack.length-1];if(!O.depth){const J=this.sliceSerialize(z).length;O.depth=J}}function w(){this.data.setextHeadingSlurpLineEnding=!0}function E(z){const O=this.stack[this.stack.length-1];O.depth=this.sliceSerialize(z).codePointAt(0)===61?1:2}function _(){this.data.setextHeadingSlurpLineEnding=void 0}function W(z){const J=this.stack[this.stack.length-1].children;let ne=J[J.length-1];(!ne||ne.type!=="text")&&(ne=Ve(),ne.position={start:zn(z.start),end:void 0},J.push(ne)),this.stack.push(ne)}function D(z){const O=this.stack.pop();O.value+=this.sliceSerialize(z),O.position.end=zn(z.end)}function B(z){const O=this.stack[this.stack.length-1];if(this.data.atHardBreak){const J=O.children[O.children.length-1];J.position.end=zn(z.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(O.type)&&(W.call(this,z),D.call(this,z))}function U(){this.data.atHardBreak=!0}function G(){const z=this.resume(),O=this.stack[this.stack.length-1];O.value=z}function de(){const z=this.resume(),O=this.stack[this.stack.length-1];O.value=z}function Z(){const z=this.resume(),O=this.stack[this.stack.length-1];O.value=z}function ae(){const z=this.stack[this.stack.length-1];if(this.data.inReference){const O=this.data.referenceType||"shortcut";z.type+="Reference",z.referenceType=O,delete z.url,delete z.title}else delete z.identifier,delete z.label;this.data.referenceType=void 0}function se(){const z=this.stack[this.stack.length-1];if(this.data.inReference){const O=this.data.referenceType||"shortcut";z.type+="Reference",z.referenceType=O,delete z.url,delete z.title}else delete z.identifier,delete z.label;this.data.referenceType=void 0}function L(z){const O=this.sliceSerialize(z),J=this.stack[this.stack.length-2];J.label=fb(O),J.identifier=$r(O).toLowerCase()}function q(){const z=this.stack[this.stack.length-1],O=this.resume(),J=this.stack[this.stack.length-1];if(this.data.inReference=!0,J.type==="link"){const ne=z.children;J.children=ne}else J.alt=O}function y(){const z=this.resume(),O=this.stack[this.stack.length-1];O.url=z}function K(){const z=this.resume(),O=this.stack[this.stack.length-1];O.title=z}function re(){this.data.inReference=void 0}function v(){this.data.referenceType="collapsed"}function oe(z){const O=this.resume(),J=this.stack[this.stack.length-1];J.label=O,J.identifier=$r(this.sliceSerialize(z)).toLowerCase(),this.data.referenceType="full"}function Re(z){this.data.characterReferenceType=z.type}function ce(z){const O=this.sliceSerialize(z),J=this.data.characterReferenceType;let ne;J?(ne=Fh(O,J==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):ne=Mc(O);const he=this.stack[this.stack.length-1];he.value+=ne}function Ge(z){const O=this.stack.pop();O.position.end=zn(z.end)}function $e(z){D.call(this,z);const O=this.stack[this.stack.length-1];O.url=this.sliceSerialize(z)}function at(z){D.call(this,z);const O=this.stack[this.stack.length-1];O.url="mailto:"+this.sliceSerialize(z)}function Le(){return{type:"blockquote",children:[]}}function jt(){return{type:"code",lang:null,meta:null,value:""}}function Cn(){return{type:"inlineCode",value:""}}function cn(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function St(){return{type:"emphasis",children:[]}}function Rt(){return{type:"heading",depth:0,children:[]}}function Gn(){return{type:"break"}}function Kn(){return{type:"html",value:""}}function xr(){return{type:"image",title:null,url:"",alt:null}}function un(){return{type:"link",title:null,url:"",children:[]}}function le(z){return{type:"list",ordered:z.type==="listOrdered",start:null,spread:z._spread,children:[]}}function be(z){return{type:"listItem",spread:z._spread,checked:null,children:[]}}function Ce(){return{type:"paragraph",children:[]}}function Be(){return{type:"strong",children:[]}}function Ve(){return{type:"text",value:""}}function $t(){return{type:"thematicBreak"}}}function zn(e){return{line:e.line,column:e.column,offset:e.offset}}function Kh(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?Kh(e,r):xb(e,r)}}function xb(e,t){let n;for(n in t)if(Gh.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function Id(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Ii({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Ii({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Ii({start:t.start,end:t.end})+") is still open")}function yb(e){const t=this;t.parser=n;function n(r){return mb(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function bb(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function vb(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function wb(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let s={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(s.data={meta:t.meta}),e.patch(t,s),s=e.applyData(t,s),s={type:"element",tagName:"pre",properties:{},children:[s]},e.patch(t,s),s}function kb(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function jb(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Sb(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=ti(r.toLowerCase()),s=e.footnoteOrder.indexOf(r);let l,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),l=e.footnoteOrder.length):l=s+1,a+=1,e.footnoteCounts.set(r,a);const c={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,c);const u={type:"element",tagName:"sup",properties:{},children:[c]};return e.patch(t,u),e.applyData(t,u)}function Cb(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Nb(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function Xh(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),s=i[0];s&&s.type==="text"?s.value="["+s.value:i.unshift({type:"text",value:"["});const l=i[i.length-1];return l&&l.type==="text"?l.value+=r:i.push({type:"text",value:r}),i}function Eb(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Xh(e,t);const i={src:ti(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const s={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,s),e.applyData(t,s)}function zb(e,t){const n={src:ti(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function _b(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Ib(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Xh(e,t);const i={href:ti(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const s={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,s),e.applyData(t,s)}function Pb(e,t){const n={href:ti(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function Tb(e,t,n){const r=e.all(t),i=n?Ab(n):Jh(t),s={},l=[];if(typeof t.checked=="boolean"){const d=r[0];let p;d&&d.type==="element"&&d.tagName==="p"?p=d:(p={type:"element",tagName:"p",properties:{},children:[]},r.unshift(p)),p.children.length>0&&p.children.unshift({type:"text",value:" "}),p.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),s.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(i||a!==0||d.type!=="element"||d.tagName!=="p")&&l.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!i?l.push(...d.children):l.push(d)}const c=r[r.length-1];c&&(i||c.type!=="element"||c.tagName!=="p")&&l.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:s,children:l};return e.patch(t,u),e.applyData(t,u)}function Ab(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=Jh(n[r])}return t}function Jh(e){const t=e.spread;return t??e.children.length>1}function Mb(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const l=r[i];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const s={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,s),e.applyData(t,s)}function Rb(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Lb(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function Db(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Ob(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const l={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],l),i.push(l)}if(n.length>0){const l={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Ic(t.children[1]),c=Th(t.children[t.children.length-1]);a&&c&&(l.position={start:a,end:c}),i.push(l)}const s={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,s),e.applyData(t,s)}function Fb(e,t,n){const r=n?n.children:void 0,s=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,a=l?l.length:t.children.length;let c=-1;const u=[];for(;++c<a;){const p=t.children[c],h={},f=l?l[c]:void 0;f&&(h.align=f);let k={type:"element",tagName:s,properties:h,children:[]};p&&(k.children=e.all(p),e.patch(p,k),k=e.applyData(p,k)),u.push(k)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,d),e.applyData(t,d)}function Bb(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const Pd=9,Td=32;function Ub(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const s=[];for(;r;)s.push(Ad(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return s.push(Ad(t.slice(i),i>0,!1)),s.join("")}function Ad(e,t,n){let r=0,i=e.length;if(t){let s=e.codePointAt(r);for(;s===Pd||s===Td;)r++,s=e.codePointAt(r)}if(n){let s=e.codePointAt(i-1);for(;s===Pd||s===Td;)i--,s=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function Hb(e,t){const n={type:"text",value:Ub(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function $b(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const Vb={blockquote:bb,break:vb,code:wb,delete:kb,emphasis:jb,footnoteReference:Sb,heading:Cb,html:Nb,imageReference:Eb,image:zb,inlineCode:_b,linkReference:Ib,link:Pb,listItem:Tb,list:Mb,paragraph:Rb,root:Lb,strong:Db,table:Ob,tableCell:Bb,tableRow:Fb,text:Hb,thematicBreak:$b,toml:ks,yaml:ks,definition:ks,footnoteDefinition:ks};function ks(){}const Zh=-1,Ao=0,Ti=1,po=2,Dc=3,Oc=4,Fc=5,Bc=6,em=7,tm=8,Md=typeof self=="object"?self:globalThis,Wb=(e,t)=>{const n=(i,s)=>(e.set(s,i),i),r=i=>{if(e.has(i))return e.get(i);const[s,l]=t[i];switch(s){case Ao:case Zh:return n(l,i);case Ti:{const a=n([],i);for(const c of l)a.push(r(c));return a}case po:{const a=n({},i);for(const[c,u]of l)a[r(c)]=r(u);return a}case Dc:return n(new Date(l),i);case Oc:{const{source:a,flags:c}=l;return n(new RegExp(a,c),i)}case Fc:{const a=n(new Map,i);for(const[c,u]of l)a.set(r(c),r(u));return a}case Bc:{const a=n(new Set,i);for(const c of l)a.add(r(c));return a}case em:{const{name:a,message:c}=l;return n(new Md[a](c),i)}case tm:return n(BigInt(l),i);case"BigInt":return n(Object(BigInt(l)),i);case"ArrayBuffer":return n(new Uint8Array(l).buffer,l);case"DataView":{const{buffer:a}=new Uint8Array(l);return n(new DataView(a),l)}}return n(new Md[s](l),i)};return r},Rd=e=>Wb(new Map,e)(0),jr="",{toString:qb}={},{keys:Yb}=Object,fi=e=>{const t=typeof e;if(t!=="object"||!e)return[Ao,t];const n=qb.call(e).slice(8,-1);switch(n){case"Array":return[Ti,jr];case"Object":return[po,jr];case"Date":return[Dc,jr];case"RegExp":return[Oc,jr];case"Map":return[Fc,jr];case"Set":return[Bc,jr];case"DataView":return[Ti,n]}return n.includes("Array")?[Ti,n]:n.includes("Error")?[em,n]:[po,n]},js=([e,t])=>e===Ao&&(t==="function"||t==="symbol"),Qb=(e,t,n,r)=>{const i=(l,a)=>{const c=r.push(l)-1;return n.set(a,c),c},s=l=>{if(n.has(l))return n.get(l);let[a,c]=fi(l);switch(a){case Ao:{let d=l;switch(c){case"bigint":a=tm,d=l.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+c);d=null;break;case"undefined":return i([Zh],l)}return i([a,d],l)}case Ti:{if(c){let h=l;return c==="DataView"?h=new Uint8Array(l.buffer):c==="ArrayBuffer"&&(h=new Uint8Array(l)),i([c,[...h]],l)}const d=[],p=i([a,d],l);for(const h of l)d.push(s(h));return p}case po:{if(c)switch(c){case"BigInt":return i([c,l.toString()],l);case"Boolean":case"Number":case"String":return i([c,l.valueOf()],l)}if(t&&"toJSON"in l)return s(l.toJSON());const d=[],p=i([a,d],l);for(const h of Yb(l))(e||!js(fi(l[h])))&&d.push([s(h),s(l[h])]);return p}case Dc:return i([a,l.toISOString()],l);case Oc:{const{source:d,flags:p}=l;return i([a,{source:d,flags:p}],l)}case Fc:{const d=[],p=i([a,d],l);for(const[h,f]of l)(e||!(js(fi(h))||js(fi(f))))&&d.push([s(h),s(f)]);return p}case Bc:{const d=[],p=i([a,d],l);for(const h of l)(e||!js(fi(h)))&&d.push(s(h));return p}}const{message:u}=l;return i([a,{name:c,message:u}],l)};return s},Ld=(e,{json:t,lossy:n}={})=>{const r=[];return Qb(!(t||n),!!t,new Map,r)(e),r},fo=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?Rd(Ld(e,t)):structuredClone(e):(e,t)=>Rd(Ld(e,t));function Gb(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function Kb(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function Xb(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||Gb,r=e.options.footnoteBackLabel||Kb,i=e.options.footnoteLabel||"Footnotes",s=e.options.footnoteLabelTagName||"h2",l=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let c=-1;for(;++c<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[c]);if(!u)continue;const d=e.all(u),p=String(u.identifier).toUpperCase(),h=ti(p.toLowerCase());let f=0;const k=[],C=e.footnoteCounts.get(p);for(;C!==void 0&&++f<=C;){k.length>0&&k.push({type:"text",value:" "});let m=typeof n=="string"?n:n(c,f);typeof m=="string"&&(m={type:"text",value:m}),k.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+h+(f>1?"-"+f:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(c,f),className:["data-footnote-backref"]},children:Array.isArray(m)?m:[m]})}const A=d[d.length-1];if(A&&A.type==="element"&&A.tagName==="p"){const m=A.children[A.children.length-1];m&&m.type==="text"?m.value+=" ":A.children.push({type:"text",value:" "}),A.children.push(...k)}else d.push(...k);const g={type:"element",tagName:"li",properties:{id:t+"fn-"+h},children:e.wrap(d,!0)};e.patch(u,g),a.push(g)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:s,properties:{...fo(l),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const nm=function(e){if(e==null)return t2;if(typeof e=="function")return Mo(e);if(typeof e=="object")return Array.isArray(e)?Jb(e):Zb(e);if(typeof e=="string")return e2(e);throw new Error("Expected function, string, or object as test")};function Jb(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=nm(e[n]);return Mo(r);function r(...i){let s=-1;for(;++s<t.length;)if(t[s].apply(this,i))return!0;return!1}}function Zb(e){const t=e;return Mo(n);function n(r){const i=r;let s;for(s in e)if(i[s]!==t[s])return!1;return!0}}function e2(e){return Mo(t);function t(n){return n&&n.type===e}}function Mo(e){return t;function t(n,r,i){return!!(n2(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function t2(){return!0}function n2(e){return e!==null&&typeof e=="object"&&"type"in e}const rm=[],r2=!0,Dd=!1,i2="skip";function s2(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const s=nm(i),l=r?-1:1;a(e,void 0,[])();function a(c,u,d){const p=c&&typeof c=="object"?c:{};if(typeof p.type=="string"){const f=typeof p.tagName=="string"?p.tagName:typeof p.name=="string"?p.name:void 0;Object.defineProperty(h,"name",{value:"node ("+(c.type+(f?"<"+f+">":""))+")"})}return h;function h(){let f=rm,k,C,A;if((!t||s(c,u,d[d.length-1]||void 0))&&(f=o2(n(c,d)),f[0]===Dd))return f;if("children"in c&&c.children){const g=c;if(g.children&&f[0]!==i2)for(C=(r?g.children.length:-1)+l,A=d.concat(g);C>-1&&C<g.children.length;){const m=g.children[C];if(k=a(m,C,A)(),k[0]===Dd)return k;C=typeof k[1]=="number"?k[1]:C+l}}return f}}}function o2(e){return Array.isArray(e)?e:typeof e=="number"?[r2,e]:e==null?rm:[e]}function im(e,t,n,r){let i,s,l;typeof t=="function"&&typeof n!="function"?(s=void 0,l=t,i=n):(s=t,l=n,i=r),s2(e,s,a,i);function a(c,u){const d=u[u.length-1],p=d?d.children.indexOf(c):void 0;return l(c,p,d)}}const _a={}.hasOwnProperty,l2={};function a2(e,t){const n=t||l2,r=new Map,i=new Map,s=new Map,l={...Vb,...n.handlers},a={all:u,applyData:u2,definitionById:r,footnoteById:i,footnoteCounts:s,footnoteOrder:[],handlers:l,one:c,options:n,patch:c2,wrap:p2};return im(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const p=d.type==="definition"?r:i,h=String(d.identifier).toUpperCase();p.has(h)||p.set(h,d)}}),a;function c(d,p){const h=d.type,f=a.handlers[h];if(_a.call(a.handlers,h)&&f)return f(a,d,p);if(a.options.passThrough&&a.options.passThrough.includes(h)){if("children"in d){const{children:C,...A}=d,g=fo(A);return g.children=a.all(d),g}return fo(d)}return(a.options.unknownHandler||d2)(a,d,p)}function u(d){const p=[];if("children"in d){const h=d.children;let f=-1;for(;++f<h.length;){const k=a.one(h[f],d);if(k){if(f&&h[f-1].type==="break"&&(!Array.isArray(k)&&k.type==="text"&&(k.value=Od(k.value)),!Array.isArray(k)&&k.type==="element")){const C=k.children[0];C&&C.type==="text"&&(C.value=Od(C.value))}Array.isArray(k)?p.push(...k):p.push(k)}}}return p}}function c2(e,t){e.position&&(t.position=qx(e))}function u2(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,s=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const l="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:l}}n.type==="element"&&s&&Object.assign(n.properties,fo(s)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function d2(e,t){const n=t.data||{},r="value"in t&&!(_a.call(n,"hProperties")||_a.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function p2(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function Od(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Fd(e,t){const n=a2(e,t),r=n.one(e,void 0),i=Xb(n),s=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&s.children.push({type:"text",value:`
`},i),s}function f2(e,t){return e&&"run"in e?async function(n,r){const i=Fd(n,{file:r,...t});await e.run(i,r)}:function(n,r){return Fd(n,{file:r,...e||t})}}function Bd(e){if(e)throw e}var Fs=Object.prototype.hasOwnProperty,sm=Object.prototype.toString,Ud=Object.defineProperty,Hd=Object.getOwnPropertyDescriptor,$d=function(t){return typeof Array.isArray=="function"?Array.isArray(t):sm.call(t)==="[object Array]"},Vd=function(t){if(!t||sm.call(t)!=="[object Object]")return!1;var n=Fs.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&Fs.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||Fs.call(t,i)},Wd=function(t,n){Ud&&n.name==="__proto__"?Ud(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},qd=function(t,n){if(n==="__proto__")if(Fs.call(t,n)){if(Hd)return Hd(t,n).value}else return;return t[n]},h2=function e(){var t,n,r,i,s,l,a=arguments[0],c=1,u=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},c=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});c<u;++c)if(t=arguments[c],t!=null)for(n in t)r=qd(a,n),i=qd(t,n),a!==i&&(d&&i&&(Vd(i)||(s=$d(i)))?(s?(s=!1,l=r&&$d(r)?r:[]):l=r&&Vd(r)?r:{},Wd(a,{name:n,newValue:e(d,l,i)})):typeof i<"u"&&Wd(a,{name:n,newValue:i}));return a};const hl=Ta(h2);function Ia(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function m2(){const e=[],t={run:n,use:r};return t;function n(...i){let s=-1;const l=i.pop();if(typeof l!="function")throw new TypeError("Expected function as last argument, not "+l);a(null,...i);function a(c,...u){const d=e[++s];let p=-1;if(c){l(c);return}for(;++p<i.length;)(u[p]===null||u[p]===void 0)&&(u[p]=i[p]);i=u,d?g2(d,a)(...u):l(null,...u)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function g2(e,t){let n;return r;function r(...l){const a=e.length>l.length;let c;a&&l.push(i);try{c=e.apply(this,l)}catch(u){const d=u;if(a&&n)throw d;return i(d)}a||(c&&c.then&&typeof c.then=="function"?c.then(s,i):c instanceof Error?i(c):s(c))}function i(l,...a){n||(n=!0,t(l,...a))}function s(l){i(null,l)}}const tn={basename:x2,dirname:y2,extname:b2,join:v2,sep:"/"};function x2(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');rs(e);let n=0,r=-1,i=e.length,s;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(s){n=i+1;break}}else r<0&&(s=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let l=-1,a=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(s){n=i+1;break}}else l<0&&(s=!0,l=i+1),a>-1&&(e.codePointAt(i)===t.codePointAt(a--)?a<0&&(r=i):(a=-1,r=l));return n===r?r=l:r<0&&(r=e.length),e.slice(n,r)}function y2(e){if(rs(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function b2(e){rs(e);let t=e.length,n=-1,r=0,i=-1,s=0,l;for(;t--;){const a=e.codePointAt(t);if(a===47){if(l){r=t+1;break}continue}n<0&&(l=!0,n=t+1),a===46?i<0?i=t:s!==1&&(s=1):i>-1&&(s=-1)}return i<0||n<0||s===0||s===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function v2(...e){let t=-1,n;for(;++t<e.length;)rs(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":w2(n)}function w2(e){rs(e);const t=e.codePointAt(0)===47;let n=k2(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function k2(e,t){let n="",r=0,i=-1,s=0,l=-1,a,c;for(;++l<=e.length;){if(l<e.length)a=e.codePointAt(l);else{if(a===47)break;a=47}if(a===47){if(!(i===l-1||s===1))if(i!==l-1&&s===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(c=n.lastIndexOf("/"),c!==n.length-1){c<0?(n="",r=0):(n=n.slice(0,c),r=n.length-1-n.lastIndexOf("/")),i=l,s=0;continue}}else if(n.length>0){n="",r=0,i=l,s=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,l):n=e.slice(i+1,l),r=l-i-1;i=l,s=0}else a===46&&s>-1?s++:s=-1}return n}function rs(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const j2={cwd:S2};function S2(){return"/"}function Pa(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function C2(e){if(typeof e=="string")e=new URL(e);else if(!Pa(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return N2(e)}function N2(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const ml=["history","path","basename","stem","extname","dirname"];class om{constructor(t){let n;t?Pa(t)?n={path:t}:typeof t=="string"||E2(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":j2.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<ml.length;){const s=ml[r];s in n&&n[s]!==void 0&&n[s]!==null&&(this[s]=s==="history"?[...n[s]]:n[s])}let i;for(i in n)ml.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?tn.basename(this.path):void 0}set basename(t){xl(t,"basename"),gl(t,"basename"),this.path=tn.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?tn.dirname(this.path):void 0}set dirname(t){Yd(this.basename,"dirname"),this.path=tn.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?tn.extname(this.path):void 0}set extname(t){if(gl(t,"extname"),Yd(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=tn.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){Pa(t)&&(t=C2(t)),xl(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?tn.basename(this.path,this.extname):void 0}set stem(t){xl(t,"stem"),gl(t,"stem"),this.path=tn.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new lt(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function gl(e,t){if(e&&e.includes(tn.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+tn.sep+"`")}function xl(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function Yd(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function E2(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const z2=function(e){const r=this.constructor.prototype,i=r[e],s=function(){return i.apply(s,arguments)};return Object.setPrototypeOf(s,r),s},_2={}.hasOwnProperty;class Uc extends z2{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=m2()}copy(){const t=new Uc;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(hl(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(vl("data",this.frozen),this.namespace[t]=n,this):_2.call(this.namespace,t)&&this.namespace[t]||void 0:t?(vl("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=Ss(t),r=this.parser||this.Parser;return yl("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),yl("process",this.parser||this.Parser),bl("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(s,l){const a=Ss(t),c=r.parse(a);r.run(c,a,function(d,p,h){if(d||!p||!h)return u(d);const f=p,k=r.stringify(f,h);T2(k)?h.value=k:h.result=k,u(d,h)});function u(d,p){d||!p?l(d):s?s(p):n(void 0,p)}}}processSync(t){let n=!1,r;return this.freeze(),yl("processSync",this.parser||this.Parser),bl("processSync",this.compiler||this.Compiler),this.process(t,i),Gd("processSync","process",n),r;function i(s,l){n=!0,Bd(s),r=l}}run(t,n,r){Qd(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?s(void 0,r):new Promise(s);function s(l,a){const c=Ss(n);i.run(t,c,u);function u(d,p,h){const f=p||t;d?a(d):l?l(f):r(void 0,f,h)}}}runSync(t,n){let r=!1,i;return this.run(t,n,s),Gd("runSync","run",r),i;function s(l,a){Bd(l),i=a,r=!0}}stringify(t,n){this.freeze();const r=Ss(n),i=this.compiler||this.Compiler;return bl("stringify",i),Qd(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(vl("use",this.frozen),t!=null)if(typeof t=="function")c(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):l(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function s(u){if(typeof u=="function")c(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...p]=u;c(d,p)}else l(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function l(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(u.plugins),u.settings&&(i.settings=hl(!0,i.settings,u.settings))}function a(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const p=u[d];s(p)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function c(u,d){let p=-1,h=-1;for(;++p<r.length;)if(r[p][0]===u){h=p;break}if(h===-1)r.push([u,...d]);else if(d.length>0){let[f,...k]=d;const C=r[h][1];Ia(C)&&Ia(f)&&(f=hl(!0,C,f)),r[h]=[u,f,...k]}}}}const I2=new Uc().freeze();function yl(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function bl(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function vl(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Qd(e){if(!Ia(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function Gd(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function Ss(e){return P2(e)?e:new om(e)}function P2(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function T2(e){return typeof e=="string"||A2(e)}function A2(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const M2="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Kd=[],Xd={allowDangerousHtml:!0},R2=/^(https?|ircs?|mailto|xmpp)$/i,L2=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function ln(e){const t=D2(e),n=O2(e);return F2(t.runSync(t.parse(n),n),e)}function D2(e){const t=e.rehypePlugins||Kd,n=e.remarkPlugins||Kd,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Xd}:Xd;return I2().use(yb).use(n).use(f2,r).use(t)}function O2(e){const t=e.children||"",n=new om;return typeof t=="string"&&(n.value=t),n}function F2(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,s=t.disallowedElements,l=t.skipHtml,a=t.unwrapDisallowed,c=t.urlTransform||B2;for(const d of L2)Object.hasOwn(t,d.from)&&(""+d.from+(d.to?"use `"+d.to+"` instead":"remove it")+M2+d.id,void 0);return t.className&&(e={type:"element",tagName:"div",properties:{className:t.className},children:e.type==="root"?e.children:[e]}),im(e,u),Xx(e,{Fragment:o.Fragment,components:i,ignoreInvalidStyle:!0,jsx:o.jsx,jsxs:o.jsxs,passKeys:!0,passNode:!0});function u(d,p,h){if(d.type==="raw"&&h&&typeof p=="number")return l?h.children.splice(p,1):h.children[p]={type:"text",value:d.value},p;if(d.type==="element"){let f;for(f in dl)if(Object.hasOwn(dl,f)&&Object.hasOwn(d.properties,f)){const k=d.properties[f],C=dl[f];(C===null||C.includes(d.tagName))&&(d.properties[f]=c(String(k||""),f,d))}}if(d.type==="element"){let f=n?!n.includes(d.tagName):s?s.includes(d.tagName):!1;if(!f&&r&&typeof p=="number"&&(f=!r(d,p,h)),f&&h&&typeof p=="number")return a&&d.children?h.children.splice(p,1,...d.children):h.children.splice(p,1),p}}}function B2(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||R2.test(e.slice(0,t))?e:""}const U2="modulepreload",H2=function(e){return"/"+e},Jd={},$2=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),a=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=Promise.allSettled(n.map(c=>{if(c=H2(c),c in Jd)return;Jd[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":U2,u||(p.as="script"),p.crossOrigin="",p.href=c,a&&p.setAttribute("nonce",a),document.head.appendChild(p),u)return new Promise((h,f)=>{p.addEventListener("load",h),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(l){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=l,window.dispatchEvent(a),!a.defaultPrevented)throw l}return i.then(l=>{for(const a of l||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})},bn=[{case_number:1,topic:"Seasonal Flu Vaccination",query:"Should I get a flu vaccine this year?",cdc_message:`**Get Your Flu Vaccine This Year**

The flu vaccine is recommended for everyone 6 months and older. Getting vaccinated each year is the best way to protect yourself and your loved ones from the flu.

**Why get vaccinated:**
- Prevents millions of illnesses each year
- Reduces risk of flu-related hospitalization
- Protects vulnerable people around you

**What to know:**
- You cannot get the flu from the flu shot
- Side effects are usually mild (sore arm, low fever)
- It takes about 2 weeks for protection to develop

Talk to your doctor or visit your local pharmacy to get vaccinated today.

*Source: CDC Key Facts About Seasonal Flu Vaccine*`},{case_number:2,topic:"COVID-19 Boosters",query:"Are COVID boosters still recommended?",cdc_message:`**Stay Up to Date with COVID-19 Vaccines**

Yes, updated COVID-19 vaccines are recommended for everyone 6 months and older. The virus continues to evolve, and updated vaccines provide better protection against current variants.

**Who should get vaccinated:**
- Everyone 6 months and older should receive an updated COVID-19 vaccine
- Some people may need additional doses based on age and health conditions

**Benefits:**
- Reduces your risk of getting sick with COVID-19
- Provides strong protection against severe illness and hospitalization
- Helps protect those who cannot be vaccinated

Contact your healthcare provider or local pharmacy to schedule your updated vaccine.

*Source: CDC COVID-19 Vaccine Recommendations*`},{case_number:3,topic:"Bird Flu Food Safety",query:"Is it safe to eat eggs and chicken during the bird flu outbreak?",cdc_message:`**Food Safety During Avian Influenza Outbreaks**

Yes, properly handled and cooked poultry and eggs are safe to eat. The U.S. food supply remains safe.

**Key safety measures in place:**
- USDA monitors flocks and removes infected birds from the food supply
- Eggs from infected flocks do not enter the market
- Commercial processing includes safety measures

**Safe food handling:**
- Cook poultry to internal temperature of 165°F
- Cook eggs until yolks are firm
- Wash hands after handling raw poultry
- Don't cross-contaminate other foods

There is no evidence that properly cooked poultry or eggs can transmit bird flu to humans.

*Source: USDA/FDA Food Safety Guidance on HPAI*`},{case_number:4,topic:"MMR Vaccine Safety",query:"What are the side effects of the MMR vaccine? Is it linked to autism?",cdc_message:`**MMR Vaccine: Safe and Effective**

The MMR vaccine protects against measles, mumps, and rubella. It is safe for most children and adults.

**Common side effects (usually mild):**
- Sore arm from the injection
- Fever
- Mild rash
- Temporary joint pain (more common in adults)

**What science shows about autism:**
- Multiple large studies involving millions of children show NO link between MMR vaccine and autism
- The original study claiming a link was retracted due to serious ethical violations and data manipulation
- The scientific consensus is clear: vaccines do not cause autism

The benefits of vaccination far outweigh the risks. Protect your child from serious diseases by staying on schedule with recommended vaccines.

*Source: CDC MMR Vaccine Information Statement*`},{case_number:5,topic:"HPV Vaccination",query:"Should my 12-year-old get the HPV vaccine? Is it safe?",cdc_message:`**HPV Vaccine: Cancer Prevention for Your Child**

Yes, the HPV vaccine is recommended for all children at age 11-12. This is one of the most effective ways to prevent several types of cancer.

**Why vaccinate at 11-12:**
- Produces strongest immune response at this age
- Provides protection before any exposure to HPV
- Only 2 doses needed if started before age 15

**What HPV vaccine prevents:**
- Cervical, vaginal, and vulvar cancers in women
- Anal and throat cancers in both sexes
- Penile cancer in men
- Genital warts

**Safety:**
- Given to millions worldwide since 2006
- Extensively studied and monitored
- Common side effects: sore arm, brief fever

This vaccine prevents cancer. Talk to your child's doctor today.

*Source: CDC HPV Vaccination Recommendations*`},{case_number:6,topic:"Antibiotic Use",query:"Can I take leftover antibiotics for a cold?",cdc_message:`**Antibiotics Aren't Always the Answer**

No, you should not take leftover antibiotics for a cold. Here's why:

**Antibiotics don't work on colds:**
- Colds are caused by viruses
- Antibiotics only kill bacteria
- Taking antibiotics for viral infections doesn't help and can be harmful

**Risks of unnecessary antibiotics:**
- Contributes to antibiotic resistance
- Can cause side effects (diarrhea, allergic reactions)
- May kill helpful bacteria in your body

**What helps with cold symptoms:**
- Rest and fluids
- Over-the-counter pain relievers
- Honey for cough (adults and children over 1)
- Time - most colds improve in 7-10 days

See a doctor if symptoms worsen or last more than 10 days. Never share or save antibiotics.

*Source: CDC - Antibiotics Aren't Always the Answer*`},{case_number:7,topic:"Mental Health Treatment",query:"Are antidepressants safe? Do they change your personality?",cdc_message:`**Understanding Antidepressant Medications**

Antidepressants are safe and effective treatments for depression when used as prescribed. They help restore brain chemistry, not change who you are.

**What antidepressants do:**
- Help regulate brain chemicals (neurotransmitters)
- Reduce symptoms of depression and anxiety
- Allow you to feel more like yourself, not different

**What to know:**
- They don't change your personality - they help relieve symptoms that may be masking it
- May take 2-4 weeks to see full effects
- Work best combined with therapy
- Should not be stopped suddenly - talk to your doctor

**Common concerns addressed:**
- Not "happy pills" - they help stabilize mood
- Not addictive in the way some other medications are
- Side effects often improve after first few weeks

Talk to a healthcare provider about whether antidepressants might help you. Treatment works.

*Source: NIMH Information on Antidepressants*`}],V2=["I think that I would like to use this system frequently","I found the system unnecessarily complex","I thought the system was easy to use","I think that I would need the support of a technical person to be able to use this system","I found the various functions in this system were well integrated","I thought there was too much inconsistency in this system","I would imagine that most people would learn to use this system very quickly","I found the system very cumbersome to use","I felt very confident using the system","I needed to learn a lot of things before I could get going with this system"],Zd=[{id:"factual_accuracy",label:"Factual Accuracy",description:"Information is correct and evidence-based"},{id:"completeness",label:"Completeness",description:"Covers key aspects of the topic"},{id:"up_to_date",label:"Current Information",description:"Reflects latest guidelines and evidence"},{id:"clarity",label:"Clarity",description:"Easy to understand, free of jargon"},{id:"potential_harm",label:"Potential for Harm",description:"1=High risk, 5=No risk of harm from this info"}],ep=[{id:"clarity",label:"Clarity",description:"Easy to understand, free of jargon"},{id:"accuracy",label:"Scientific Accuracy",description:"Information is factually correct"},{id:"actionability",label:"Actionability",description:"Clearly tells people what to do"},{id:"cultural_sensitivity",label:"Cultural Sensitivity",description:"Appropriate for diverse audiences"},{id:"persuasiveness",label:"Persuasiveness",description:"Likely to influence behavior"},{id:"addresses_concerns",label:"Addresses Concerns",description:"Acknowledges common hesitancies"}],tp=[{id:"intention",label:"After reading this message, how likely are you to get a flu vaccine?",scale:7},{id:"credibility",label:"How credible do you find this message?",scale:5},{id:"clarity",label:"How clear is this message?",scale:5},{id:"relevance",label:"How relevant is this message to you?",scale:5},{id:"trust",label:"How much do you trust this information?",scale:5}];let wl=null,np=!1;async function W2(){if(np)return wl;np=!0;try{const e=await $2(()=>import("./pregenerated_responses-D_EFlQf1.js"),[]);return wl=e.default||e,console.log("Loaded pre-generated responses for study"),wl}catch{return console.log("Pre-generated responses not found, will use live API"),null}}const q2=()=>Math.random().toString(36).substring(2,15)+Date.now().toString(36),lm=(e,t)=>{try{const n=JSON.parse(localStorage.getItem("chorusStudyData")||"{}");return n[e]=n[e]||[],n[e].push({...t,timestamp:new Date().toISOString()}),localStorage.setItem("chorusStudyData",JSON.stringify(n)),!0}catch(n){return console.error("Failed to save to localStorage:",n),!1}},rp=async(e,t)=>{try{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`API error: ${n.status}`);return await n.json()}catch(n){return console.warn("API unavailable, saving to localStorage:",n.message),lm(e,t),{saved_locally:!0}}};function Y2({onClick:e}){return o.jsxs("button",{className:"study-fab",onClick:e,"aria-label":"Join Study",children:[o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"}),o.jsx("path",{d:"M9 12h6M9 16h6"})]}),o.jsx("span",{className:"study-fab-text",children:"Join Study"})]})}const ip=["consent","demographics","accuracy","quality","usability","effectiveness","complete"];function Q2({isOpen:e,onClose:t,onQuerySubmit:n,setViewMode:r}){const[i,s]=P.useState("consent"),[l,a]=P.useState(null),[c,u]=P.useState(!1),[d,p]=P.useState({role:"",experience:"",orgType:"",expertiseArea:""}),[h,f]=P.useState([]),[k,C]=P.useState(0),[A,g]=P.useState({}),[m,x]=P.useState(null),[b,j]=P.useState(!1),[w,E]=P.useState(0),[_,W]=P.useState(0),[D,B]=P.useState({}),[U,G]=P.useState({}),[de,Z]=P.useState(null),[ae,se]=P.useState("intro"),[L,q]=P.useState(0),[y,K]=P.useState(null),[re,v]=P.useState([]),[oe,Re]=P.useState(Array(10).fill(0)),[ce,Ge]=P.useState(null),[$e,at]=P.useState("baseline"),[Le,jt]=P.useState({}),Cn=()=>{s("consent"),a(null),u(!1),p({role:"",experience:"",orgType:"",expertiseArea:""}),f([]),C(0),g({}),x(null),E(0),W(0),B({}),G({}),Z(null),se("intro"),q(0),K(null),v([]),Re(Array(10).fill(0)),Ge(null),at("baseline"),jt({})},cn=()=>{if(i!=="consent"&&i!=="complete"){if(!window.confirm("Exit study? Your progress will be saved locally."))return;lm("partial_study",{sessionId:l,phase:i,demographics:d,accuracyResponses:A,qualityResponses:D,taskResults:re,susResponses:oe,effectivenessResponses:Le})}Cn(),t()},St=async le=>{const be=await W2();if(!(be!=null&&be.cases))return null;const Ce=be.cases.find(Ve=>Ve.query===le);if(!Ce)return null;const Be=Object.values(Ce.responses||{});return{question:Ce.query,responses:Be,synthesis:Ce.synthesis}},Rt=async le=>{j(!0),E(0);const be=setTimeout(()=>{b&&(j(!1),x({error:"Request timed out after 45 seconds. The server may be overloaded or unavailable.",errorType:"timeout"}))},45e3);try{const Ce=await St(le);if(Ce){console.log("Using pre-generated response for:",le.substring(0,30)+"..."),clearTimeout(be),x(Ce),j(!1);return}const Be=new AbortController,Ve=setTimeout(()=>Be.abort(),3e4),$t=await fetch("/api/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:le,include_synthesis:!0,mode:"public_health"}),signal:Be.signal});if(clearTimeout(Ve),!$t.ok){const O=$t.status>=500?"server":$t.status===404?"notfound":"client";throw new Error(`Server returned ${$t.status}`,{cause:O})}const z=await $t.json();clearTimeout(be),x(z)}catch(Ce){clearTimeout(be),console.error("Error fetching Chorus response:",Ce);let Be="Failed to load AI responses. ",Ve="unknown";Ce.name==="AbortError"?(Be="Request timed out after 30 seconds. The server may be busy processing your request.",Ve="timeout"):navigator.onLine?Ce.message.includes("500")?(Be="Server error occurred. The service may be temporarily unavailable.",Ve="server"):Ce.message.includes("404")?(Be="API endpoint not found. Please contact support.",Ve="notfound"):(Be="An unexpected error occurred. Please try again.",Ve="unknown"):(Be="No internet connection detected. Please check your network and try again.",Ve="network"),x({error:Be,errorType:Ve})}finally{j(!1)}},Gn=async()=>{const le=q2();a(le);const Be=[0,1,2,3,4,5,6].sort(()=>Math.random()-.5).slice(0,3).sort((Ve,$t)=>Ve-$t);f(Be),Z(Math.random()<.5?"brief":"detailed"),Ge(Math.random()<.5?"chorus":"cdc"),await rp("/api/study/session",{session_id:le,participant_type:d.role,role:d.role,experience_years:d.experience?parseInt(d.experience):null,organization_type:d.orgType,expertise_area:d.expertiseArea,assigned_cases:Be}),Rt(bn[Be[0]].query),s("accuracy")},Kn=()=>{let le=0;return oe.forEach((be,Ce)=>{Ce%2===0?le+=be-1:le+=5-be}),le*2.5},xr=async()=>{await rp("/api/study/complete",{session_id:l,demographics:d,accuracy_responses:A,quality_responses:D,message_orders:U,assigned_interface:de,task_results:re,sus_responses:oe,sus_score:Kn(),assigned_message:ce,effectiveness_responses:Le}),s("complete")},un=()=>{const le=ip.indexOf(i);return Math.round(le/(ip.length-1)*100)};return e?o.jsxs("div",{className:"study-modal-overlay",onClick:le=>le.target===le.currentTarget&&cn(),children:[o.jsxs("div",{className:"study-modal",children:[o.jsx("button",{className:"study-modal-close",onClick:cn,children:"×"}),i!=="consent"&&i!=="complete"&&o.jsxs("div",{className:"study-progress",children:[o.jsx("div",{className:"study-progress-bar",style:{width:`${un()}%`}}),o.jsxs("span",{className:"study-progress-text",children:[un(),"% Complete"]})]}),i==="consent"&&o.jsxs("div",{className:"study-phase",children:[o.jsx("h2",{children:"Chorus Research Study"}),o.jsx("p",{className:"study-intro",children:"Thank you for your interest in evaluating Chorus, an AI-powered tool for public health communication."}),o.jsxs("div",{className:"consent-content",children:[o.jsx("h3",{children:"Informed Consent"}),o.jsxs("section",{children:[o.jsx("h4",{children:"Purpose"}),o.jsx("p",{children:"This study evaluates Chorus, a tool that helps public health professionals understand and respond to health misinformation by analyzing what AI systems tell the public."})]}),o.jsxs("section",{children:[o.jsx("h4",{children:"What You'll Do"}),o.jsx("p",{children:"Complete 4 short evaluation phases:"}),o.jsxs("ol",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Content Accuracy"})," - Rate AI responses to health questions"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Message Quality"})," - Compare public health messages"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Usability"})," - Complete tasks and rate the tool"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Message Effectiveness"})," - React to a health message"]})]}),o.jsx("p",{children:"Estimated time: 20-30 minutes total."})]}),o.jsxs("section",{children:[o.jsx("h4",{children:"Data Collection"}),o.jsx("p",{children:"We collect your responses and basic demographic information (role, experience). No personally identifiable information (name, email) is collected. All data is anonymized and will be weighted by expertise level in analysis."})]}),o.jsxs("section",{children:[o.jsx("h4",{children:"Voluntary Participation"}),o.jsx("p",{children:"Participation is voluntary. You may exit at any time without penalty."})]}),o.jsxs("label",{className:"consent-checkbox",children:[o.jsx("input",{type:"checkbox",checked:c,onChange:le=>u(le.target.checked)}),o.jsx("span",{children:"I have read and understand the above information. I voluntarily agree to participate."})]})]}),o.jsx("button",{className:"study-btn primary",disabled:!c,onClick:()=>s("demographics"),children:"Continue"})]}),i==="demographics"&&o.jsxs("div",{className:"study-phase",children:[o.jsx("h2",{children:"About You"}),o.jsx("p",{className:"study-intro",children:"Your background helps us understand different perspectives on AI health information."}),o.jsxs("div",{className:"demographics-form",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"What best describes your role? *"}),o.jsxs("select",{value:d.role,onChange:le=>p(be=>({...be,role:le.target.value})),children:[o.jsx("option",{value:"",children:"Select your role..."}),o.jsx("option",{value:"public_health_official",children:"Public Health Official"}),o.jsx("option",{value:"healthcare_provider",children:"Healthcare Provider (MD, RN, etc.)"}),o.jsx("option",{value:"researcher",children:"Researcher / Academic"}),o.jsx("option",{value:"communications",children:"Health Communications Professional"}),o.jsx("option",{value:"policy",children:"Health Policy Professional"}),o.jsx("option",{value:"general_public",children:"General Public / Patient"}),o.jsx("option",{value:"other",children:"Other"})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Years of experience in health-related work"}),o.jsxs("select",{value:d.experience,onChange:le=>p(be=>({...be,experience:le.target.value})),children:[o.jsx("option",{value:"",children:"Select..."}),o.jsx("option",{value:"0",children:"None / Not applicable"}),o.jsx("option",{value:"1",children:"Less than 2 years"}),o.jsx("option",{value:"3",children:"2-5 years"}),o.jsx("option",{value:"7",children:"6-10 years"}),o.jsx("option",{value:"15",children:"11-20 years"}),o.jsx("option",{value:"25",children:"More than 20 years"})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Organization type"}),o.jsxs("select",{value:d.orgType,onChange:le=>p(be=>({...be,orgType:le.target.value})),children:[o.jsx("option",{value:"",children:"Select..."}),o.jsx("option",{value:"government",children:"Government / Public Health Agency"}),o.jsx("option",{value:"healthcare",children:"Healthcare Organization"}),o.jsx("option",{value:"academia",children:"Academic Institution"}),o.jsx("option",{value:"nonprofit",children:"Non-profit Organization"}),o.jsx("option",{value:"private",children:"Private Sector"}),o.jsx("option",{value:"none",children:"Not applicable"})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Primary area of expertise (if applicable)"}),o.jsxs("select",{value:d.expertiseArea,onChange:le=>p(be=>({...be,expertiseArea:le.target.value})),children:[o.jsx("option",{value:"",children:"Select area..."}),o.jsx("option",{value:"infectious_disease",children:"Infectious Disease"}),o.jsx("option",{value:"epidemiology",children:"Epidemiology"}),o.jsx("option",{value:"public_health_policy",children:"Public Health Policy"}),o.jsx("option",{value:"health_communication",children:"Health Communication"}),o.jsx("option",{value:"clinical_medicine",children:"Clinical Medicine"}),o.jsx("option",{value:"nursing",children:"Nursing"}),o.jsx("option",{value:"pharmacy",children:"Pharmacy"}),o.jsx("option",{value:"behavioral_health",children:"Behavioral Health"}),o.jsx("option",{value:"environmental_health",children:"Environmental Health"}),o.jsx("option",{value:"health_informatics",children:"Health Informatics"}),o.jsx("option",{value:"biostatistics",children:"Biostatistics"}),o.jsx("option",{value:"health_education",children:"Health Education"}),o.jsx("option",{value:"maternal_child_health",children:"Maternal & Child Health"}),o.jsx("option",{value:"chronic_disease",children:"Chronic Disease Prevention"}),o.jsx("option",{value:"emergency_preparedness",children:"Emergency Preparedness"}),o.jsx("option",{value:"global_health",children:"Global Health"}),o.jsx("option",{value:"nutrition",children:"Nutrition"}),o.jsx("option",{value:"other",children:"Other"}),o.jsx("option",{value:"none",children:"Not applicable"})]})]})]}),o.jsxs("div",{className:"study-btn-row",children:[o.jsx("button",{className:"study-btn secondary",onClick:()=>s("consent"),children:"Back"}),o.jsx("button",{className:"study-btn primary",disabled:!d.role,onClick:Gn,children:"Begin Study"})]})]}),i==="accuracy"&&o.jsx(G2,{assignedCases:h,currentCase:k,setCurrentCase:C,responses:A,setResponses:g,chorusResponses:m,loadingChorus:b,fetchChorusResponse:Rt,retryCount:w,setRetryCount:E,onComplete:()=>{W(0),Rt(bn[h[0]].query),G(le=>({...le,0:Math.random()<.5?["chorus","cdc"]:["cdc","chorus"]})),s("quality")}}),i==="quality"&&o.jsx(K2,{assignedCases:h,currentCase:_,setCurrentCase:W,responses:D,setResponses:B,messageOrders:U,setMessageOrders:G,chorusResponses:m,loadingChorus:b,fetchChorusResponse:Rt,onComplete:()=>s("usability")}),i==="usability"&&o.jsx(X2,{subPhase:ae,setSubPhase:se,assignedInterface:de,currentTask:L,setCurrentTask:q,taskStartTime:y,setTaskStartTime:K,taskResults:re,setTaskResults:v,susResponses:oe,setSusResponses:Re,onQuerySubmit:n,setViewMode:r,onComplete:()=>s("effectiveness")}),i==="effectiveness"&&o.jsx(J2,{subPhase:$e,setSubPhase:at,assignedMessage:ce,responses:Le,setResponses:jt,onComplete:xr}),i==="complete"&&o.jsxs("div",{className:"study-phase study-complete",children:[o.jsx("div",{className:"complete-icon",children:"✓"}),o.jsx("h2",{children:"Thank You!"}),o.jsx("p",{children:"Your responses have been recorded."}),o.jsxs("p",{className:"session-id",children:["Session ID: ",o.jsx("code",{children:l})]}),o.jsx("p",{className:"complete-note",children:"Your participation helps improve AI-assisted public health communication tools. Responses will be analyzed based on expertise level to ensure appropriate weighting."}),o.jsx("button",{className:"study-btn primary",onClick:()=>{Cn(),t()},children:"Close"})]})]}),o.jsx("style",{children:Z2})]}):null}function G2({assignedCases:e,currentCase:t,setCurrentCase:n,responses:r,setResponses:i,chorusResponses:s,loadingChorus:l,fetchChorusResponse:a,retryCount:c,setRetryCount:u,onComplete:d}){const h=e[t],f=bn[h],k=r[t]||{},C=(b,j,w)=>{i(E=>{var _;return{...E,[t]:{...E[t],caseIndex:h,[b]:{...((_=E[t])==null?void 0:_[b])||{},[j]:w}}}})},A=()=>s!=null&&s.responses?s.responses.filter(j=>j.success).map(j=>j.provider_name).every(j=>Zd.every(w=>{var E;return(E=k[j])==null?void 0:E[w.id]})):!1,g=()=>{u(b=>b+1),a(f.query)},m=()=>{window.confirm("Skip this case? You will not be able to return to it.")&&x()},x=()=>{if(t<e.length-1){const b=t+1;n(b),u(0),a(bn[e[b]].query)}else d()};return o.jsxs("div",{className:"study-phase content-accuracy",children:[o.jsxs("div",{className:"study-header",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"Phase 1: Content Accuracy"}),o.jsx("p",{className:"phase-desc",children:"Rate the accuracy of AI responses to health questions"})]}),o.jsxs("span",{className:"case-counter",children:["Case ",t+1," of ",e.length]})]}),o.jsxs("div",{className:"case-info",children:[o.jsx("h3",{children:f.topic}),o.jsxs("p",{className:"case-query",children:['Query: "',f.query,'"']})]}),l?o.jsxs("div",{className:"loading-state",children:[o.jsx("div",{className:"spinner"}),o.jsx("p",{children:"Loading AI responses..."}),o.jsx("p",{className:"loading-hint",children:"This may take up to 30 seconds..."})]}):s!=null&&s.error?o.jsxs("div",{className:"error-state",children:[o.jsx("div",{className:"error-icon",children:"⚠"}),o.jsx("h3",{children:"Unable to Load Responses"}),o.jsx("p",{className:"error-message",children:s.error}),c>0&&o.jsxs("p",{className:"retry-info",children:["Retry attempt ",c," of ",3]}),o.jsx("div",{className:"error-actions",children:c<3?o.jsxs("button",{className:"study-btn primary",onClick:g,children:["Retry ",c>0?`(${c}/3)`:""]}):o.jsxs("div",{className:"max-retries-message",children:[o.jsx("p",{children:"Maximum retry attempts reached."}),o.jsx("button",{className:"study-btn secondary",onClick:m,children:"Skip to Next Case"})]})}),c<3&&c>0&&o.jsx("button",{className:"study-btn secondary skip-btn",onClick:m,children:"Skip to Next Case"})]}):(s==null?void 0:s.responses)&&o.jsx("div",{className:"responses-to-rate",children:s.responses.filter(b=>b.success).map((b,j)=>o.jsxs("div",{className:"response-rating-card",children:[o.jsxs("div",{className:"response-header",children:[o.jsx("h4",{children:b.provider_name}),o.jsx("span",{className:"model-name",children:b.model})]}),o.jsx("div",{className:"response-content",children:o.jsx(ln,{children:b.content})}),o.jsx("div",{className:"rating-grid",children:Zd.map(w=>o.jsxs("div",{className:"rating-row",children:[o.jsxs("label",{children:[o.jsx("span",{className:"rating-label",children:w.label}),o.jsx("span",{className:"rating-desc",children:w.description})]}),o.jsx("div",{className:"rating-buttons",children:[1,2,3,4,5].map(E=>{var _;return o.jsx("button",{className:`rating-btn ${((_=k[b.provider_name])==null?void 0:_[w.id])===E?"selected":""}`,onClick:()=>C(b.provider_name,w.id,E),children:E},E)})})]},w.id))})]},j))}),o.jsxs("div",{className:"study-btn-row",children:[o.jsx("button",{className:"study-btn secondary",disabled:t===0,onClick:()=>{const b=t-1;n(b),a(bn[e[b]].query)},children:"Previous"}),o.jsx("button",{className:"study-btn primary",disabled:!A(),onClick:x,children:t===e.length-1?"Continue to Phase 2":"Next Case"})]})]})}function K2({assignedCases:e,currentCase:t,setCurrentCase:n,responses:r,setResponses:i,messageOrders:s,setMessageOrders:l,chorusResponses:a,loadingChorus:c,fetchChorusResponse:u,onComplete:d}){const p=e[t],h=bn[p],f=r[t]||{},k=s[t]||["chorus","cdc"],C=()=>{var j;if((j=a==null?void 0:a.synthesis)!=null&&j.content){const w=a.synthesis.content,E=[/## Recommended Public Health Message\n([\s\S]*?)(?=\n##|$)/,/##\s*Recommended Public Health Message\s*\n([\s\S]*?)(?=\n##|$)/,/Public Health Message:?\s*\n([\s\S]*?)(?=\n##|$)/i,/Message:?\s*\n([\s\S]*?)(?=\n##|$)/i];for(const W of E){const D=w.match(W);if(D&&D[1].trim().length>20)return D[1].trim()}const _=w.replace(/^##[^\n]*\n/gm,"").replace(/^\*[^\n]*\n/gm,"").replace(/^-{3,}\n/gm,"").trim();if(_.length>50)return _.substring(0,500)}if(a!=null&&a.responses){const w=a.responses.filter(E=>E.success&&E.content);if(w.length>0){const E=w[0],_=E.content.substring(0,500);return`${_}${_.length>=500?"...":""}

*(Fallback: showing ${E.provider_name} response)*`}}return"Message could not be loaded. The AI synthesis may be incomplete or in an unexpected format."},A=j=>k[j==="A"?0:1]==="chorus"?{content:C(),type:"chorus"}:{content:h.cdc_message,type:"cdc"},g=(j,w,E)=>{i(_=>{var W;return{..._,[t]:{..._[t],[j]:{...((W=_[t])==null?void 0:W[j])||{},[w]:E}}}})},m=j=>{i(w=>({...w,[t]:{...w[t],preference:j}}))},x=()=>["A","B"].every(j=>ep.every(w=>{var E;return(E=f[j])==null?void 0:E[w.id]}))&&f.preference!==void 0,b=()=>{if(t<e.length-1){const j=t+1;n(j),l(w=>({...w,[j]:Math.random()<.5?["chorus","cdc"]:["cdc","chorus"]})),u(bn[e[j]].query)}else d()};return o.jsxs("div",{className:"study-phase message-quality",children:[o.jsxs("div",{className:"study-header",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"Phase 2: Message Quality"}),o.jsx("p",{className:"phase-desc",children:"Compare two public health messages (blinded)"})]}),o.jsxs("span",{className:"case-counter",children:["Case ",t+1," of ",e.length]})]}),o.jsxs("div",{className:"case-info",children:[o.jsx("h3",{children:h.topic}),o.jsx("p",{className:"comparison-note",children:"Compare the two messages below. You are blinded to their source."})]}),c?o.jsxs("div",{className:"loading-state",children:[o.jsx("div",{className:"spinner"}),o.jsx("p",{children:"Loading messages..."})]}):o.jsx("div",{className:"message-comparison",children:["A","B"].map(j=>o.jsxs("div",{className:"message-card",children:[o.jsxs("h4",{children:["Message ",j]}),o.jsx("div",{className:"message-content",children:o.jsx(ln,{children:A(j).content})}),o.jsx("div",{className:"rating-grid compact",children:ep.map(w=>o.jsxs("div",{className:"rating-row",children:[o.jsx("label",{children:w.label}),o.jsx("div",{className:"rating-buttons",children:[1,2,3,4,5].map(E=>{var _;return o.jsx("button",{className:`rating-btn ${((_=f[j])==null?void 0:_[w.id])===E?"selected":""}`,onClick:()=>g(j,w.id,E),children:E},E)})})]},w.id))})]},j))}),o.jsxs("div",{className:"preference-section",children:[o.jsx("h4",{children:"Overall Preference"}),o.jsx("div",{className:"preference-scale",children:[{val:-2,label:"Strongly prefer A"},{val:-1,label:"Slightly prefer A"},{val:0,label:"No preference"},{val:1,label:"Slightly prefer B"},{val:2,label:"Strongly prefer B"}].map(j=>o.jsx("button",{className:`pref-btn ${f.preference===j.val?"selected":""}`,onClick:()=>m(j.val),children:j.label},j.val))})]}),o.jsxs("div",{className:"study-btn-row",children:[o.jsx("button",{className:"study-btn secondary",disabled:t===0,onClick:()=>{const j=t-1;n(j),u(bn[e[j]].query)},children:"Previous"}),o.jsx("button",{className:"study-btn primary",disabled:!x(),onClick:b,children:t===e.length-1?"Continue to Phase 3":"Next Case"})]})]})}function X2({subPhase:e,setSubPhase:t,assignedInterface:n,currentTask:r,setCurrentTask:i,taskStartTime:s,setTaskStartTime:l,taskResults:a,setTaskResults:c,susResponses:u,setSusResponses:d,onQuerySubmit:p,setViewMode:h,onComplete:f}){const k=[{query:"Should I get a flu vaccine this year?",instruction:"Use Chorus to investigate what AI systems tell users about flu vaccination."},{query:"Are COVID boosters still recommended?",instruction:"Generate information about current COVID-19 booster recommendations."},{query:"What are the side effects of the MMR vaccine?",instruction:"Look up AI responses about MMR vaccine side effects."}];P.useEffect(()=>{e==="tasks"&&n&&(h==null||h(n))},[e,n]);const C=()=>{l(Date.now()),h==null||h(n),p==null||p(k[r].query)},A=x=>{const b=Date.now()-s;c([...a,{task:r,query:k[r].query,timeSpent:b,rating:x,interface:n}]),r<k.length-1?(i(j=>j+1),l(null)):t("sus")},g=(x,b)=>{const j=[...u];j[x]=b,d(j)},m=()=>u.every(x=>x>0);return e==="intro"?o.jsxs("div",{className:"study-phase usability-intro",children:[o.jsx("h2",{children:"Phase 3: Usability Assessment"}),o.jsx("p",{children:"You will complete 3 tasks using the Chorus tool, then answer usability questions."}),o.jsxs("div",{className:"interface-assignment",children:[o.jsx("h4",{children:"Your Interface"}),o.jsxs("p",{children:["You have been randomly assigned to the ",o.jsx("strong",{children:n==="brief"?"Brief":"Detailed"})," view.",n==="brief"?" This shows a concise summary of AI responses.":" This shows full responses from each AI provider."]})]}),o.jsxs("div",{className:"task-list",children:[o.jsx("h4",{children:"Tasks:"}),o.jsx("ol",{children:k.map((x,b)=>o.jsx("li",{children:x.instruction},b))})]}),o.jsx("button",{className:"study-btn primary",onClick:()=>t("tasks"),children:"Begin Tasks"})]}):e==="tasks"?o.jsxs("div",{className:"study-phase usability-tasks",children:[o.jsxs("h2",{children:["Phase 3: Task ",r+1," of ",k.length]}),o.jsxs("div",{className:"task-card",children:[o.jsx("p",{className:"task-instruction",children:k[r].instruction}),s?o.jsxs("div",{className:"task-complete-section",children:[o.jsx("p",{children:"When you've reviewed the results, rate how useful they were:"}),o.jsx("div",{className:"usefulness-rating",children:[1,2,3,4,5].map(x=>o.jsxs("button",{className:"rating-btn large",onClick:()=>A(x),children:[x,o.jsx("span",{className:"rating-label-small",children:x===1?"Not useful":x===5?"Very useful":""})]},x))})]}):o.jsx("button",{className:"study-btn primary",onClick:C,children:"Start Task"})]})]}):e==="sus"?o.jsxs("div",{className:"study-phase usability-sus",children:[o.jsx("h2",{children:"Phase 3: System Usability Scale"}),o.jsx("p",{children:"Rate your agreement with each statement (1 = Strongly Disagree, 5 = Strongly Agree):"}),o.jsx("div",{className:"sus-questions",children:V2.map((x,b)=>o.jsxs("div",{className:"sus-question",children:[o.jsxs("p",{children:[b+1,". ",x]}),o.jsx("div",{className:"rating-buttons",children:[1,2,3,4,5].map(j=>o.jsx("button",{className:`rating-btn ${u[b]===j?"selected":""}`,onClick:()=>g(b,j),children:j},j))})]},b))}),o.jsx("button",{className:"study-btn primary",disabled:!m(),onClick:f,children:"Continue to Phase 4"})]}):null}function J2({subPhase:e,setSubPhase:t,assignedMessage:n,responses:r,setResponses:i,onComplete:s}){const l=bn[0],a=()=>n==="cdc"?l.cdc_message:`**Get Protected: Your Annual Flu Shot Matters**

Getting your flu vaccine this year is one of the simplest steps you can take to protect yourself and those around you. Here's what the latest medical guidance tells us:

**Why it matters:**
- Flu vaccines prevent millions of illnesses each season
- Protection extends to vulnerable family members and community
- The vaccine is updated annually to match circulating strains

**Common concerns addressed:**
- You cannot get the flu from the flu shot - it contains no live virus
- Side effects are typically mild and short-lived
- The vaccine is safe for most people, including pregnant women

**Your next step:**
Contact your pharmacy or healthcare provider today to schedule your vaccination. Most appointments take less than 15 minutes.

*This message was synthesized from multiple AI health information sources and reviewed for accuracy.*`,c=(u,d)=>{i(p=>({...p,[u]:d}))};if(e==="baseline")return o.jsxs("div",{className:"study-phase effectiveness-baseline",children:[o.jsx("h2",{children:"Phase 4: Message Effectiveness"}),o.jsx("p",{children:"Please answer this question before seeing the message:"}),o.jsxs("div",{className:"baseline-question",children:[o.jsx("p",{className:"question-text",children:"How likely are you to get a flu vaccine this season?"}),o.jsx("div",{className:"likelihood-scale",children:[1,2,3,4,5,6,7].map(u=>o.jsx("button",{className:`scale-btn ${r.baseline===u?"selected":""}`,onClick:()=>c("baseline",u),children:u},u))}),o.jsxs("div",{className:"scale-labels",children:[o.jsx("span",{children:"Very unlikely"}),o.jsx("span",{children:"Very likely"})]})]}),o.jsx("button",{className:"study-btn primary",disabled:!r.baseline,onClick:()=>t("message"),children:"Continue"})]});if(e==="message")return o.jsxs("div",{className:"study-phase effectiveness-message",children:[o.jsx("h2",{children:"Phase 4: Please Read This Message"}),o.jsx("div",{className:"study-message-content",children:o.jsx(ln,{children:a()})}),o.jsx("button",{className:"study-btn primary",onClick:()=>t("post"),children:"I've Read the Message"})]});if(e==="post"){const u=tp.every(d=>r[d.id]);return o.jsxs("div",{className:"study-phase effectiveness-post",children:[o.jsx("h2",{children:"Phase 4: Your Reactions"}),tp.map(d=>o.jsxs("div",{className:"effectiveness-question",children:[o.jsx("p",{children:d.label}),o.jsx("div",{className:"rating-buttons",children:Array.from({length:d.scale},(p,h)=>h+1).map(p=>o.jsx("button",{className:`rating-btn ${r[d.id]===p?"selected":""}`,onClick:()=>c(d.id,p),children:p},p))})]},d.id)),o.jsx("button",{className:"study-btn primary",disabled:!u,onClick:s,children:"Complete Study"})]})}return null}const Z2=`
  .study-fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    border: none;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .study-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
  }

  .study-fab-text {
    display: none;
  }

  @media (min-width: 768px) {
    .study-fab {
      width: auto;
      height: auto;
      padding: 1rem 1.5rem;
      border-radius: 2rem;
      gap: 0.5rem;
    }

    .study-fab-text {
      display: inline;
      font-weight: 600;
      font-size: 0.9rem;
    }
  }

  .study-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
    backdrop-filter: blur(4px);
  }

  .study-modal {
    background: #1a1a2e;
    border-radius: 16px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .study-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #a1a1aa;
    font-size: 28px;
    cursor: pointer;
    z-index: 10;
  }

  .study-progress {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
  }

  .study-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #a855f7, #6366f1);
    transition: width 0.3s ease;
  }

  .study-progress-text {
    position: absolute;
    right: 16px;
    top: 8px;
    font-size: 0.75rem;
    color: #a1a1aa;
  }

  .study-phase {
    padding: 32px;
  }

  .study-phase h2 {
    color: #f4f4f5;
    font-size: 1.5rem;
    margin-bottom: 4px;
  }

  .phase-desc {
    color: #a1a1aa;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

  .study-intro {
    color: #a1a1aa;
    margin-bottom: 24px;
  }

  .study-btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .study-btn.primary {
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
    border: none;
  }

  .study-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .study-btn.secondary {
    background: transparent;
    color: #a1a1aa;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .study-btn-row {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  /* Consent */
  .consent-content {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    max-height: 400px;
    overflow-y: auto;
  }

  .consent-content h3 {
    color: #a855f7;
    margin-bottom: 16px;
  }

  .consent-content h4 {
    color: #e4e4e7;
    margin: 16px 0 8px;
    font-size: 0.95rem;
  }

  .consent-content p, .consent-content ol {
    color: #a1a1aa;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .consent-content ol {
    margin-left: 20px;
    margin-bottom: 12px;
  }

  .consent-content li {
    margin-bottom: 8px;
  }

  .consent-checkbox {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-top: 20px;
    padding: 16px;
    background: rgba(168, 85, 247, 0.1);
    border-radius: 8px;
    cursor: pointer;
  }

  .consent-checkbox input {
    margin-top: 4px;
    width: 18px;
    height: 18px;
    accent-color: #a855f7;
  }

  .consent-checkbox span {
    color: #e4e4e7;
    font-size: 0.9rem;
  }

  /* Demographics */
  .demographics-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    color: #e4e4e7;
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  .form-group select,
  .form-group input {
    width: 100%;
    padding: 10px 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    color: #e4e4e7;
    font-size: 0.9rem;
  }

  .form-group select:focus,
  .form-group input:focus {
    outline: none;
    border-color: #a855f7;
  }

  /* Study Header */
  .study-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .case-counter {
    background: rgba(168, 85, 247, 0.2);
    color: #a855f7;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .case-info {
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .case-info h3 {
    color: #f4f4f5;
    margin-bottom: 8px;
  }

  .case-query {
    color: #a1a1aa;
    font-style: italic;
  }

  /* Loading */
  .loading-state {
    text-align: center;
    padding: 40px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(168, 85, 247, 0.2);
    border-top-color: #a855f7;
    border-radius: 50%;
    margin: 0 auto 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-hint {
    color: #71717a;
    font-size: 0.85rem;
    margin-top: 8px;
  }

  /* Error State */
  .error-state {
    text-align: center;
    padding: 40px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    margin: 20px 0;
  }

  .error-icon {
    width: 60px;
    height: 60px;
    background: rgba(239, 68, 68, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #ef4444;
    margin: 0 auto 16px;
  }

  .error-state h3 {
    color: #fca5a5;
    font-size: 1.2rem;
    margin-bottom: 12px;
  }

  .error-message {
    color: #fecaca;
    font-size: 0.95rem;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .retry-info {
    color: #f59e0b;
    font-size: 0.85rem;
    margin-bottom: 16px;
    font-weight: 500;
  }

  .error-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .max-retries-message {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .max-retries-message p {
    color: #fca5a5;
    font-weight: 500;
  }

  .skip-btn {
    margin-top: 8px;
  }

  /* Response Rating Cards */
  .responses-to-rate {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .response-rating-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  .response-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .response-header h4 {
    color: #a855f7;
    font-size: 0.95rem;
  }

  .model-name {
    color: #71717a;
    font-size: 0.75rem;
  }

  .response-content {
    padding: 16px;
    max-height: 200px;
    overflow-y: auto;
    color: #d4d4d8;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .rating-grid {
    padding: 16px;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rating-grid.compact .rating-row {
    flex-direction: row;
    align-items: center;
  }

  .rating-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rating-row label {
    color: #e4e4e7;
    font-size: 0.85rem;
  }

  .rating-label {
    display: block;
  }

  .rating-desc {
    display: block;
    color: #71717a;
    font-size: 0.75rem;
  }

  .rating-buttons {
    display: flex;
    gap: 8px;
  }

  .rating-btn {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: #a1a1aa;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rating-btn:hover {
    border-color: #a855f7;
    color: #a855f7;
  }

  .rating-btn.selected {
    background: #a855f7;
    border-color: #a855f7;
    color: white;
  }

  .rating-btn.large {
    width: 60px;
    height: 60px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rating-label-small {
    font-size: 0.6rem;
    color: #71717a;
  }

  /* Message Comparison */
  .message-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .message-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  .message-card h4 {
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.2);
    color: #a855f7;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .message-content {
    padding: 16px;
    max-height: 300px;
    overflow-y: auto;
    color: #d4d4d8;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .comparison-note {
    color: #f59e0b;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  /* Preference */
  .preference-section {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 8px;
  }

  .preference-section h4 {
    color: #f4f4f5;
    margin-bottom: 12px;
  }

  .preference-scale {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .pref-btn {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: #a1a1aa;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pref-btn:hover {
    border-color: #a855f7;
    color: #a855f7;
  }

  .pref-btn.selected {
    background: #a855f7;
    border-color: #a855f7;
    color: white;
  }

  /* Usability */
  .interface-assignment {
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .interface-assignment h4 {
    color: #818cf8;
    margin-bottom: 8px;
    font-size: 0.95rem;
  }

  .interface-assignment p {
    color: #e4e4e7;
    font-size: 0.9rem;
    margin: 0;
  }

  .interface-assignment strong {
    color: #a5b4fc;
  }

  .task-list {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 24px;
  }

  .task-list h4 {
    color: #f4f4f5;
    margin-bottom: 12px;
  }

  .task-list ol {
    margin-left: 20px;
    color: #a1a1aa;
  }

  .task-list li {
    margin-bottom: 8px;
  }

  .task-card {
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
  }

  .task-instruction {
    color: #f4f4f5;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  .task-complete-section {
    margin-top: 20px;
  }

  .task-complete-section p {
    color: #a1a1aa;
    margin-bottom: 16px;
  }

  .usefulness-rating {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  /* SUS */
  .sus-questions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
  }

  .sus-question {
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
  }

  .sus-question p {
    color: #e4e4e7;
    margin-bottom: 12px;
  }

  /* Effectiveness */
  .baseline-question {
    background: rgba(0, 0, 0, 0.2);
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
    text-align: center;
  }

  .question-text {
    color: #f4f4f5;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  .likelihood-scale {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 8px;
  }

  .scale-btn {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: #a1a1aa;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .scale-btn:hover {
    border-color: #a855f7;
  }

  .scale-btn.selected {
    background: #a855f7;
    border-color: #a855f7;
    color: white;
  }

  .scale-labels {
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    margin: 0 auto;
    color: #71717a;
    font-size: 0.75rem;
  }

  .study-message-content {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    color: #e4e4e7;
    line-height: 1.7;
  }

  .effectiveness-question {
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .effectiveness-question p {
    color: #e4e4e7;
    margin-bottom: 12px;
  }

  /* Complete */
  .study-complete {
    text-align: center;
    padding: 48px 32px;
  }

  .complete-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: white;
    margin: 0 auto 24px;
  }

  .session-id {
    margin: 16px 0;
  }

  .session-id code {
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #a855f7;
  }

  .complete-note {
    color: #71717a;
    font-size: 0.9rem;
    margin-bottom: 24px;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .message-comparison {
      grid-template-columns: 1fr;
    }

    .preference-scale {
      flex-direction: column;
    }

    .pref-btn {
      width: 100%;
    }
  }
`;function am(e){return e>=85?{label:"Excellent",color:"#10b981"}:e>=70?{label:"Acceptable",color:"#3b82f6"}:e>=50?{label:"Marginal",color:"#f59e0b"}:{label:"Not Acceptable",color:"#ef4444"}}function ev(){var u,d;const[e,t]=P.useState(null),[n,r]=P.useState(!0),[i,s]=P.useState(null),[l,a]=P.useState(new Date),c=async()=>{try{r(!0);const p=await fetch("/api/study/results");if(!p.ok)throw new Error("Failed to fetch results");const h=await p.json();t(h),s(null),a(new Date)}catch(p){s(p.message)}finally{r(!1)}};return P.useEffect(()=>{c();const p=setInterval(c,3e4);return()=>clearInterval(p)},[]),n&&!e?o.jsx("div",{className:"results-dashboard",children:o.jsxs("div",{className:"results-loading",children:[o.jsx("div",{className:"results-spinner"}),o.jsx("p",{children:"Loading study results..."})]})}):i&&!e?o.jsx("div",{className:"results-dashboard",children:o.jsxs("div",{className:"results-error",children:[o.jsx("h2",{children:"Error Loading Results"}),o.jsx("p",{children:i}),o.jsx("button",{className:"results-btn-primary",onClick:c,children:"Retry"})]})}):!e||e.total_participants===0?o.jsxs("div",{className:"results-dashboard",children:[o.jsxs("header",{className:"results-header",children:[o.jsx("h1",{className:"results-title",children:"Study Results Dashboard"}),o.jsxs("button",{className:"results-refresh-btn",onClick:c,children:[o.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"})}),"Refresh"]})]}),o.jsxs("div",{className:"results-empty",children:[o.jsx("div",{className:"results-empty-icon",children:"📊"}),o.jsx("h2",{children:"No Study Data Yet"}),o.jsx("p",{children:"Results will appear here as participants complete the study."}),o.jsxs("p",{className:"results-empty-hint",children:["Last checked: ",l.toLocaleTimeString()]})]})]}):o.jsxs("div",{className:"results-dashboard",children:[o.jsxs("header",{className:"results-header",children:[o.jsxs("div",{children:[o.jsx("h1",{className:"results-title",children:"Study Results Dashboard"}),o.jsx("p",{className:"results-subtitle",children:"Real-time anonymized study data"})]}),o.jsxs("button",{className:"results-refresh-btn",onClick:c,children:[o.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"})}),"Refresh"]})]}),o.jsxs("p",{className:"results-last-update",children:["Last updated: ",l.toLocaleTimeString()]}),o.jsxs("section",{className:"results-section",children:[o.jsx("h2",{className:"results-section-title",children:"Summary Statistics"}),o.jsxs("div",{className:"results-stats-grid",children:[o.jsx(hi,{title:"Total Participants",value:e.total_participants,icon:"👥",color:"#3b82f6"}),o.jsx(hi,{title:"Detailed View Users",value:((u=e.by_tool_version)==null?void 0:u.detailed)||0,icon:"📊",color:"#8b5cf6"}),o.jsx(hi,{title:"Brief View Users",value:((d=e.by_tool_version)==null?void 0:d.brief)||0,icon:"📋",color:"#6366f1"}),o.jsx(hi,{title:"Avg Completion Time",value:ov(e.avg_completion_time),icon:"⏱️",color:"#10b981"}),o.jsx(hi,{title:"Completion Rate",value:`${Math.round(e.completion_rate*100)}%`,icon:"✓",color:"#14b8a6"})]})]}),o.jsxs("section",{className:"results-section",children:[o.jsx("h2",{className:"results-section-title",children:"System Usability Scale (SUS)"}),o.jsx(tv,{susData:e.sus_scores})]}),e.source_preferences&&o.jsxs("section",{className:"results-section",children:[o.jsx("h2",{className:"results-section-title",children:"Message Source Preferences (Un-blinded)"}),o.jsx("p",{className:"results-section-desc",children:"Preferences adjusted for randomization order"}),o.jsx(rv,{data:e.source_preferences})]}),e.message_preferences&&o.jsxs("section",{className:"results-section",children:[o.jsx("h2",{className:"results-section-title",children:"Blinded A/B Preference Distribution"}),o.jsx("p",{className:"results-section-desc",children:"Raw preferences before accounting for randomization"}),o.jsx(nv,{data:e.message_preferences})]}),e.trust_metrics&&o.jsxs("section",{className:"results-section",children:[o.jsx("h2",{className:"results-section-title",children:"Trust Metrics"}),o.jsx(iv,{metrics:e.trust_metrics})]}),o.jsxs("section",{className:"results-section",children:[o.jsx("h2",{className:"results-section-title",children:"Participant Demographics"}),o.jsx(sv,{demographics:e.demographics})]})]})}function hi({title:e,value:t,icon:n,color:r}){return o.jsxs("div",{className:"results-stat-card",style:{borderColor:r},children:[o.jsx("div",{className:"results-stat-icon",style:{color:r},children:n}),o.jsxs("div",{className:"results-stat-content",children:[o.jsx("div",{className:"results-stat-value",style:{color:r},children:t}),o.jsx("div",{className:"results-stat-title",children:e})]})]})}function tv({susData:e}){var s,l,a,c,u,d;if(!e)return o.jsx("p",{className:"results-no-data",children:"No SUS data available yet"});const t=e.overall_avg_score,n=e.overall_std_dev||0,r=e.n||0,i=am(t);return o.jsxs("div",{className:"results-sus-container",children:[o.jsxs("div",{className:"results-sus-overall",children:[o.jsxs("div",{className:"results-sus-score-box",children:[o.jsx("div",{className:"results-sus-score",style:{color:i.color},children:t.toFixed(1)}),o.jsx("div",{className:"results-sus-score-label",children:"Overall SUS Score"}),o.jsxs("div",{className:"results-sus-stats",children:["SD: ",n.toFixed(1)," | n=",r]}),o.jsx("div",{className:"results-sus-interpretation",style:{background:`${i.color}20`,color:i.color},children:i.label})]}),o.jsxs("div",{className:"results-sus-scale",children:[o.jsx("div",{className:"results-sus-scale-bar",children:o.jsx("div",{className:"results-sus-scale-fill",style:{width:`${t}%`,background:i.color}})}),o.jsxs("div",{className:"results-sus-scale-labels",children:[o.jsx("span",{children:"0"}),o.jsx("span",{style:{color:"#ef4444"},children:"50"}),o.jsx("span",{style:{color:"#f59e0b"},children:"70"}),o.jsx("span",{style:{color:"#3b82f6"},children:"85"}),o.jsx("span",{children:"100"})]}),o.jsxs("div",{className:"results-sus-scale-ranges",children:[o.jsx("span",{style:{color:"#ef4444"},children:"Not Acceptable"}),o.jsx("span",{style:{color:"#f59e0b"},children:"Marginal"}),o.jsx("span",{style:{color:"#3b82f6"},children:"Acceptable"}),o.jsx("span",{style:{color:"#10b981"},children:"Excellent"})]})]})]}),e.by_version&&o.jsxs("div",{className:"results-sus-comparison",children:[o.jsx("h3",{className:"results-subsection-title",children:"SUS Score by Tool Version"}),o.jsxs("div",{className:"results-sus-bars",children:[o.jsx(sp,{label:"Detailed View",score:((s=e.by_version.detailed)==null?void 0:s.avg_score)||0,stdDev:(l=e.by_version.detailed)==null?void 0:l.std_dev,count:((a=e.by_version.detailed)==null?void 0:a.count)||0,color:"#8b5cf6"}),o.jsx(sp,{label:"Brief View",score:((c=e.by_version.brief)==null?void 0:c.avg_score)||0,stdDev:(u=e.by_version.brief)==null?void 0:u.std_dev,count:((d=e.by_version.brief)==null?void 0:d.count)||0,color:"#6366f1"})]})]})]})}function sp({label:e,score:t,count:n,stdDev:r,color:i}){const s=am(t);return o.jsxs("div",{className:"results-sus-bar-container",children:[o.jsxs("div",{className:"results-sus-bar-header",children:[o.jsx("span",{className:"results-sus-bar-label",children:e}),o.jsxs("span",{className:"results-sus-bar-score",style:{color:i},children:[t.toFixed(1)," ",o.jsxs("span",{className:"results-sus-bar-count",children:["(SD: ",(r||0).toFixed(1),", n=",n,")"]})]})]}),o.jsx("div",{className:"results-sus-bar-bg",children:o.jsx("div",{className:"results-sus-bar-fill",style:{width:`${t}%`,background:i},children:o.jsx("span",{className:"results-sus-bar-interpretation",children:s.label})})})]})}function nv({data:e}){if(!e||Object.keys(e).length===0)return o.jsx("p",{className:"results-no-data",children:"No message preference data available yet"});const t={"-2":"Strongly prefer A","-1":"Slightly prefer A",0:"No preference",1:"Slightly prefer B",2:"Strongly prefer B"},n=Math.max(...Object.values(e));return o.jsx("div",{className:"results-preference-chart",children:Object.entries(t).map(([r,i])=>{const s=e[r]||0,l=n>0?s/n*100:0;return o.jsxs("div",{className:"results-preference-bar",children:[o.jsx("div",{className:"results-preference-label",children:i}),o.jsx("div",{className:"results-preference-bar-bg",children:o.jsx("div",{className:"results-preference-bar-fill",style:{width:`${l}%`},children:o.jsx("span",{className:"results-preference-count",children:s})})})]},r)})})}function rv({data:e}){if(!e)return o.jsx("p",{className:"results-no-data",children:"No source preference data available yet"});const t=e.avg_chorus_preference||0,n=e.std_dev||0,r=e.n||0,i=e.prefer_chorus_count||0,s=e.prefer_cdc_count||0,l=e.no_preference_count||0,a=e.prefer_chorus_pct||0,c=e.prefer_cdc_pct||0,u=(t+2)/4*100;return o.jsxs("div",{className:"results-source-pref-container",children:[o.jsx("div",{className:"results-source-pref-summary",children:o.jsxs("div",{className:"results-source-pref-stat",children:[o.jsxs("div",{className:"results-source-pref-value",style:{color:t>0?"#10b981":t<0?"#ef4444":"#a1a1aa"},children:[t>0?"+":"",t.toFixed(2)]}),o.jsx("div",{className:"results-source-pref-label",children:"Average Preference Score"}),o.jsxs("div",{className:"results-source-pref-subtext",children:["(SD: ",n.toFixed(2),", n=",r,")"]}),o.jsx("div",{className:"results-source-pref-interpretation",children:t>.5?"Favors Chorus":t<-.5?"Favors CDC":"No clear preference"})]})}),o.jsxs("div",{className:"results-source-pref-scale",children:[o.jsxs("div",{className:"results-source-pref-scale-labels",children:[o.jsx("span",{style:{color:"#ef4444"},children:"Prefer CDC (-2)"}),o.jsx("span",{style:{color:"#a1a1aa"},children:"Neutral (0)"}),o.jsx("span",{style:{color:"#10b981"},children:"Prefer Chorus (+2)"})]}),o.jsx("div",{className:"results-source-pref-scale-bar",children:o.jsx("div",{className:"results-source-pref-indicator",style:{left:`${u}%`}})})]}),o.jsxs("div",{className:"results-source-pref-counts",children:[o.jsxs("div",{className:"results-source-pref-count-item",children:[o.jsx("span",{className:"results-source-pref-count-label",children:"Prefer Chorus"}),o.jsxs("span",{className:"results-source-pref-count-value",style:{color:"#10b981"},children:[i," (",a.toFixed(0),"%)"]})]}),o.jsxs("div",{className:"results-source-pref-count-item",children:[o.jsx("span",{className:"results-source-pref-count-label",children:"No Preference"}),o.jsxs("span",{className:"results-source-pref-count-value",style:{color:"#a1a1aa"},children:[l," (",r>0?(l/r*100).toFixed(0):0,"%)"]})]}),o.jsxs("div",{className:"results-source-pref-count-item",children:[o.jsx("span",{className:"results-source-pref-count-label",children:"Prefer CDC"}),o.jsxs("span",{className:"results-source-pref-count-value",style:{color:"#ef4444"},children:[s," (",c.toFixed(0),"%)"]})]})]})]})}function iv({metrics:e}){if(!e)return o.jsx("p",{className:"results-no-data",children:"No trust data available yet"});const t=[{key:"trust_accuracy",label:"Accuracy",icon:"🎯"},{key:"trust_reliability",label:"Reliability",icon:"⚡"},{key:"trust_transparency",label:"Transparency",icon:"🔍"},{key:"trust_usefulness",label:"Usefulness",icon:"💡"}];return o.jsxs("div",{className:"results-trust-container",children:[o.jsx("div",{className:"results-trust-grid",children:t.map(n=>{var l,a;const r=((l=e[n.key])==null?void 0:l.avg_score)||0,i=((a=e[n.key])==null?void 0:a.count)||0,s=r/7*100;return o.jsxs("div",{className:"results-trust-card",children:[o.jsxs("div",{className:"results-trust-header",children:[o.jsx("span",{className:"results-trust-icon",children:n.icon}),o.jsx("span",{className:"results-trust-label",children:n.label})]}),o.jsxs("div",{className:"results-trust-score",children:[r.toFixed(1)," ",o.jsx("span",{className:"results-trust-score-max",children:"/ 7"})]}),o.jsx("div",{className:"results-trust-bar-bg",children:o.jsx("div",{className:"results-trust-bar-fill",style:{width:`${s}%`}})}),o.jsxs("div",{className:"results-trust-count",children:[i," responses"]})]},n.key)})}),e.would_use&&o.jsxs("div",{className:"results-adoption",children:[o.jsx("h3",{className:"results-subsection-title",children:"Likelihood to Use in Work"}),o.jsxs("div",{className:"results-adoption-score",children:[o.jsxs("div",{className:"results-adoption-value",style:{color:lp(e.would_use.avg_score)},children:[e.would_use.avg_score.toFixed(1),o.jsx("span",{className:"results-adoption-max",children:" / 7"})]}),o.jsxs("div",{className:"results-adoption-label",children:["Average likelihood (",e.would_use.count," responses)"]})]}),o.jsx("div",{className:"results-adoption-bar-bg",children:o.jsx("div",{className:"results-adoption-bar-fill",style:{width:`${e.would_use.avg_score/7*100}%`,background:lp(e.would_use.avg_score)}})}),o.jsxs("div",{className:"results-adoption-scale",children:[o.jsx("span",{children:"Very Unlikely"}),o.jsx("span",{children:"Neutral"}),o.jsx("span",{children:"Very Likely"})]})]})]})}function sv({demographics:e}){return e?o.jsxs("div",{className:"results-demographics-grid",children:[e.by_role&&o.jsx(kl,{title:"Participant Roles",data:e.by_role,icon:"👤"}),e.by_experience&&o.jsx(kl,{title:"Experience Levels",data:e.by_experience,icon:"📈"}),e.by_org_type&&o.jsx(kl,{title:"Organization Types",data:e.by_org_type,icon:"🏢"})]}):o.jsx("p",{className:"results-no-data",children:"No demographic data available yet"})}function kl({title:e,data:t,icon:n}){if(!t||Object.keys(t).length===0)return o.jsxs("div",{className:"results-demographic-card",children:[o.jsxs("h3",{className:"results-demographic-title",children:[o.jsx("span",{className:"results-demographic-icon",children:n}),e]}),o.jsx("p",{className:"results-no-data-small",children:"No data yet"})]});const r=Object.values(t).reduce((s,l)=>s+l,0),i=Object.entries(t).sort((s,l)=>l[1]-s[1]);return o.jsxs("div",{className:"results-demographic-card",children:[o.jsxs("h3",{className:"results-demographic-title",children:[o.jsx("span",{className:"results-demographic-icon",children:n}),e]}),o.jsx("div",{className:"results-demographic-list",children:i.map(([s,l])=>{const a=l/r*100;return o.jsxs("div",{className:"results-demographic-item",children:[o.jsxs("div",{className:"results-demographic-item-header",children:[o.jsx("span",{className:"results-demographic-item-label",children:lv(s)}),o.jsxs("span",{className:"results-demographic-item-value",children:[l," ",o.jsxs("span",{className:"results-demographic-item-percent",children:["(",a.toFixed(0),"%)"]})]})]}),o.jsx("div",{className:"results-demographic-bar-bg",children:o.jsx("div",{className:"results-demographic-bar-fill",style:{width:`${a}%`}})})]},s)})}),o.jsxs("div",{className:"results-demographic-total",children:["Total: ",r," participants"]})]})}function op(){return o.jsx("a",{href:"/results",className:"view-results-link",children:"View Study Results →"})}function ov(e){if(!e)return"N/A";const t=Math.floor(e/60),n=Math.floor(e%60);return t>0?`${t}m ${n}s`:`${n}s`}function lv(e){return{public_health_official:"Public Health Official",healthcare_provider:"Healthcare Provider",researcher:"Researcher",general_public:"General Public",other:"Other","0-2":"0-2 years","3-5":"3-5 years","6-10":"6-10 years","11-20":"11-20 years","20+":"20+ years",government:"Government",healthcare:"Healthcare",academia:"Academia",private:"Private Sector",nonprofit:"Non-profit"}[e]||e}function lp(e){return e>=6?"#10b981":e>=5?"#3b82f6":e>=4?"#f59e0b":"#ef4444"}const cm=document.createElement("style");cm.textContent=`
  .results-dashboard {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }

  /* Header */
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .results-title {
    font-size: 2.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .results-subtitle {
    color: #a1a1aa;
    font-size: 0.95rem;
    margin-top: 0.25rem;
  }

  .results-refresh-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: 1px solid rgba(168, 85, 247, 0.3);
    background: rgba(168, 85, 247, 0.1);
    color: #a855f7;
    cursor: pointer;
    transition: all 0.2s;
  }

  .results-refresh-btn:hover {
    background: rgba(168, 85, 247, 0.2);
    border-color: rgba(168, 85, 247, 0.5);
  }

  .results-last-update {
    color: #71717a;
    font-size: 0.85rem;
    margin-bottom: 2rem;
  }

  /* Loading & Error States */
  .results-loading,
  .results-error,
  .results-empty {
    text-align: center;
    padding: 4rem 2rem;
    color: #a1a1aa;
  }

  .results-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(168, 85, 247, 0.1);
    border-top-color: #a855f7;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  .results-error h2 {
    color: #ef4444;
    margin-bottom: 1rem;
  }

  .results-empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .results-empty h2 {
    color: #e4e4e7;
    margin-bottom: 0.5rem;
  }

  .results-empty-hint {
    font-size: 0.8rem;
    margin-top: 1rem;
  }

  /* Sections */
  .results-section {
    margin-bottom: 3rem;
  }

  .results-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #e4e4e7;
    margin-bottom: 1.5rem;
  }

  .results-subsection-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #d4d4d8;
    margin-bottom: 1rem;
  }

  .results-no-data {
    text-align: center;
    padding: 2rem;
    color: #71717a;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-no-data-small {
    text-align: center;
    padding: 1rem;
    color: #71717a;
    font-size: 0.9rem;
  }

  .results-section-desc {
    color: #71717a;
    font-size: 0.85rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
  }

  .results-sus-stats {
    font-size: 0.85rem;
    color: #71717a;
    margin-bottom: 0.5rem;
  }

  /* Source Preferences */
  .results-source-pref-container {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-source-pref-summary {
    text-align: center;
    margin-bottom: 2rem;
  }

  .results-source-pref-value {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
  }

  .results-source-pref-label {
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-top: 0.5rem;
  }

  .results-source-pref-subtext {
    font-size: 0.85rem;
    color: #71717a;
    margin-top: 0.25rem;
  }

  .results-source-pref-interpretation {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.75rem;
  }

  .results-source-pref-scale {
    margin-bottom: 2rem;
  }

  .results-source-pref-scale-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .results-source-pref-scale-bar {
    height: 24px;
    background: linear-gradient(90deg, #ef4444 0%, #a1a1aa 50%, #10b981 100%);
    border-radius: 2rem;
    position: relative;
  }

  .results-source-pref-indicator {
    position: absolute;
    top: -4px;
    width: 4px;
    height: 32px;
    background: white;
    border-radius: 2px;
    transform: translateX(-50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .results-source-pref-counts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .results-source-pref-count-item {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.5rem;
  }

  .results-source-pref-count-label {
    display: block;
    font-size: 0.8rem;
    color: #a1a1aa;
    margin-bottom: 0.5rem;
  }

  .results-source-pref-count-value {
    font-size: 1.25rem;
    font-weight: 600;
  }

  /* Stats Grid */
  .results-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .results-stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .results-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  .results-stat-icon {
    font-size: 2rem;
  }

  .results-stat-content {
    flex: 1;
  }

  .results-stat-value {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .results-stat-title {
    font-size: 0.85rem;
    color: #a1a1aa;
  }

  /* SUS Section */
  .results-sus-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .results-sus-overall {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-sus-score-box {
    text-align: center;
    min-width: 200px;
  }

  .results-sus-score {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .results-sus-score-label {
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-bottom: 1rem;
  }

  .results-sus-interpretation {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .results-sus-scale {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .results-sus-scale-bar {
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .results-sus-scale-fill {
    height: 100%;
    transition: width 0.5s ease;
  }

  .results-sus-scale-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #71717a;
    margin-bottom: 0.25rem;
  }

  .results-sus-scale-ranges {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  }

  .results-sus-comparison {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-sus-bars {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .results-sus-bar-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .results-sus-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .results-sus-bar-label {
    font-weight: 600;
    color: #e4e4e7;
  }

  .results-sus-bar-score {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .results-sus-bar-count {
    font-size: 0.85rem;
    font-weight: 400;
    color: #a1a1aa;
  }

  .results-sus-bar-bg {
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
  }

  .results-sus-bar-fill {
    height: 100%;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
  }

  .results-sus-bar-interpretation {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Message Preference Chart */
  .results-preference-chart {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-preference-bar {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    align-items: center;
  }

  .results-preference-label {
    font-size: 0.9rem;
    color: #d4d4d8;
    font-weight: 500;
  }

  .results-preference-bar-bg {
    height: 32px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
  }

  .results-preference-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.75rem;
  }

  .results-preference-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Trust Metrics */
  .results-trust-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .results-trust-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .results-trust-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-trust-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .results-trust-icon {
    font-size: 1.5rem;
  }

  .results-trust-label {
    font-size: 1rem;
    font-weight: 600;
    color: #e4e4e7;
  }

  .results-trust-score {
    font-size: 2rem;
    font-weight: 700;
    color: #a855f7;
    margin-bottom: 0.75rem;
  }

  .results-trust-score-max {
    font-size: 1.25rem;
    font-weight: 400;
    color: #71717a;
  }

  .results-trust-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .results-trust-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.5s ease;
  }

  .results-trust-count {
    font-size: 0.8rem;
    color: #71717a;
  }

  /* Adoption Section */
  .results-adoption {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-adoption-score {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .results-adoption-value {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
  }

  .results-adoption-max {
    font-size: 1.5rem;
    font-weight: 400;
    color: #71717a;
  }

  .results-adoption-label {
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-top: 0.5rem;
  }

  .results-adoption-bar-bg {
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .results-adoption-bar-fill {
    height: 100%;
    transition: width 0.5s ease;
  }

  .results-adoption-scale {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #71717a;
  }

  /* Demographics */
  .results-demographics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .results-demographic-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-demographic-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #e4e4e7;
    margin-bottom: 1.25rem;
  }

  .results-demographic-icon {
    font-size: 1.25rem;
  }

  .results-demographic-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .results-demographic-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .results-demographic-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .results-demographic-item-label {
    font-size: 0.9rem;
    color: #d4d4d8;
    font-weight: 500;
  }

  .results-demographic-item-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: #a855f7;
  }

  .results-demographic-item-percent {
    font-weight: 400;
    color: #71717a;
  }

  .results-demographic-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
  }

  .results-demographic-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.5s ease;
  }

  .results-demographic-total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.85rem;
    color: #a1a1aa;
    text-align: center;
  }

  /* View Results Link */
  .view-results-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #a855f7;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .view-results-link:hover {
    color: #c084fc;
    gap: 0.75rem;
  }

  /* Button */
  .results-btn-primary {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: none;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .results-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .results-dashboard {
      padding: 1rem;
    }

    .results-title {
      font-size: 1.75rem;
    }

    .results-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .results-refresh-btn {
      width: 100%;
      justify-content: center;
    }

    .results-sus-overall {
      grid-template-columns: 1fr;
    }

    .results-preference-bar {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .results-demographics-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .results-stats-grid {
      grid-template-columns: 1fr;
    }

    .results-trust-grid {
      grid-template-columns: 1fr;
    }

    .results-sus-scale-ranges {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.25rem;
    }
  }
`;document.head.appendChild(cm);const av=e=>{const t={none:{color:"#10b981",bgColor:"rgba(16, 185, 129, 0.1)",borderColor:"rgba(16, 185, 129, 0.3)",label:"No Conflicts",emoji:"✓"},minor:{color:"#fbbf24",bgColor:"rgba(251, 191, 36, 0.1)",borderColor:"rgba(251, 191, 36, 0.3)",label:"Minor Conflicts",emoji:"⚠"},moderate:{color:"#f97316",bgColor:"rgba(249, 115, 22, 0.1)",borderColor:"rgba(249, 115, 22, 0.3)",label:"Moderate Conflicts",emoji:"⚠"},significant:{color:"#ef4444",bgColor:"rgba(239, 68, 68, 0.1)",borderColor:"rgba(239, 68, 68, 0.3)",label:"Significant Conflicts",emoji:"✕"}};return t[e]||t.none},cv=e=>{try{return new Date(e).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}};function uv({analysis:e,isLoading:t=!1,showAuditLog:n=!1}){const[r,i]=P.useState(!1),[s,l]=P.useState(!1);if(t)return o.jsx("div",{style:{background:"linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)",borderRadius:"16px",padding:"20px",border:"1px solid rgba(148, 163, 184, 0.15)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.25)",marginTop:"16px"},children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",color:"#94a3b8"},children:[o.jsx("div",{style:{width:"20px",height:"20px",border:"3px solid rgba(148, 163, 184, 0.3)",borderTopColor:"#94a3b8",borderRadius:"50%",animation:"spin 1s linear infinite"}}),o.jsx("span",{style:{fontSize:"14px"},children:"Analyzing conflicts..."})]})});if(!e)return null;const a=e.conflict_severity||"none",c=av(a),u=e.agreement_level??null;return o.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)",borderRadius:"16px",padding:"20px",border:`1px solid ${c.borderColor}`,boxShadow:`0 8px 32px ${c.bgColor}`,marginTop:"16px"},children:[o.jsxs("div",{onClick:()=>i(!r),style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",userSelect:"none"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[o.jsx("h4",{style:{fontSize:"0.9rem",fontWeight:"600",color:"#e2e8f0",margin:0,textTransform:"uppercase",letterSpacing:"0.05em"},children:"Conflict Analysis"}),o.jsxs("div",{style:{padding:"4px 12px",borderRadius:"20px",fontSize:"0.75rem",fontWeight:"600",letterSpacing:"0.02em",color:c.color,backgroundColor:c.bgColor,border:`1px solid ${c.borderColor}`,display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("span",{children:c.emoji}),o.jsx("span",{children:c.label})]}),e.is_emerging_topic&&o.jsxs("div",{style:{padding:"4px 12px",borderRadius:"20px",fontSize:"0.75rem",fontWeight:"600",color:"#8b5cf6",backgroundColor:"rgba(139, 92, 246, 0.1)",border:"1px solid rgba(139, 92, 246, 0.3)",display:"flex",alignItems:"center",gap:"6px"},title:e.emerging_topic_reason||"Emerging or rapidly evolving topic",children:[o.jsx("span",{children:"🔬"}),o.jsx("span",{children:"Emerging Topic"})]})]}),o.jsx("div",{style:{fontSize:"18px",color:"#94a3b8",transition:"transform 0.2s ease",transform:r?"rotate(180deg)":"rotate(0deg)"},children:"▼"})]}),u!==null&&o.jsxs("div",{style:{marginTop:"16px"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[o.jsx("span",{style:{fontSize:"0.75rem",color:"#94a3b8",fontWeight:"500"},children:"Agreement Level"}),o.jsxs("span",{style:{fontSize:"0.875rem",color:"#e2e8f0",fontWeight:"600"},children:[Math.round(u),"%"]})]}),o.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"rgba(148, 163, 184, 0.15)",borderRadius:"4px",overflow:"hidden"},children:o.jsx("div",{style:{width:`${u}%`,height:"100%",backgroundColor:u>=70?"#10b981":u>=40?"#f59e0b":"#ef4444",transition:"width 0.3s ease",borderRadius:"4px"}})})]}),r&&o.jsxs("div",{style:{marginTop:"20px"},children:[e.is_emerging_topic&&e.emerging_topic_reason&&o.jsxs("div",{style:{padding:"12px",backgroundColor:"rgba(139, 92, 246, 0.05)",border:"1px solid rgba(139, 92, 246, 0.2)",borderRadius:"8px",marginBottom:"16px"},children:[o.jsx("div",{style:{fontSize:"0.75rem",fontWeight:"600",color:"#8b5cf6",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Why This Is Emerging"}),o.jsx("div",{style:{fontSize:"0.875rem",color:"#cbd5e1",lineHeight:"1.5"},children:e.emerging_topic_reason})]}),e.areas_of_disagreement&&e.areas_of_disagreement.length>0&&o.jsxs("div",{style:{marginBottom:"16px"},children:[o.jsx("div",{style:{fontSize:"0.75rem",fontWeight:"600",color:"#94a3b8",marginBottom:"10px",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Areas of Disagreement"}),o.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:e.areas_of_disagreement.map((d,p)=>o.jsxs("div",{style:{padding:"10px 12px",backgroundColor:"rgba(239, 68, 68, 0.05)",border:"1px solid rgba(239, 68, 68, 0.2)",borderRadius:"6px",fontSize:"0.875rem",color:"#fca5a5",display:"flex",alignItems:"flex-start",gap:"8px"},children:[o.jsx("span",{style:{fontSize:"16px",flexShrink:0},children:"•"}),o.jsx("span",{style:{lineHeight:"1.5"},children:d})]},p))})]}),e.requires_resolution&&e.resolution_context&&o.jsxs("div",{style:{padding:"12px",backgroundColor:"rgba(59, 130, 246, 0.05)",border:"1px solid rgba(59, 130, 246, 0.2)",borderRadius:"8px",marginBottom:"16px"},children:[o.jsx("div",{style:{fontSize:"0.75rem",fontWeight:"600",color:"#60a5fa",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Resolution Context"}),o.jsx("div",{style:{fontSize:"0.875rem",color:"#cbd5e1",lineHeight:"1.5"},children:e.resolution_context})]}),n&&e.audit_log&&e.audit_log.length>0&&o.jsxs("div",{style:{borderTop:"1px solid rgba(148, 163, 184, 0.15)",paddingTop:"16px",marginTop:"16px"},children:[o.jsxs("div",{onClick:()=>l(!s),style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",userSelect:"none",marginBottom:s?"12px":0},children:[o.jsxs("div",{style:{fontSize:"0.75rem",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"},children:["Audit Log (",e.audit_log.length,")"]}),o.jsx("div",{style:{fontSize:"14px",color:"#94a3b8",transition:"transform 0.2s ease",transform:s?"rotate(180deg)":"rotate(0deg)"},children:"▼"})]}),s&&o.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px",maxHeight:"300px",overflowY:"auto"},children:e.audit_log.map((d,p)=>o.jsxs("div",{style:{padding:"10px 12px",backgroundColor:"rgba(148, 163, 184, 0.05)",border:"1px solid rgba(148, 163, 184, 0.15)",borderRadius:"6px",fontSize:"0.8rem"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[o.jsx("span",{style:{color:"#94a3b8",fontWeight:"600"},children:d.decision_type}),o.jsx("span",{style:{color:"#64748b",fontSize:"0.75rem"},children:cv(d.timestamp)})]}),d.details&&o.jsx("div",{style:{color:"#cbd5e1",fontSize:"0.75rem",fontFamily:"monospace",whiteSpace:"pre-wrap",wordBreak:"break-word"},children:typeof d.details=="string"?d.details:JSON.stringify(d.details,null,2)})]},p))})]}),!e.has_conflicts&&(!e.areas_of_disagreement||e.areas_of_disagreement.length===0)&&o.jsx("div",{style:{padding:"16px",textAlign:"center",color:"#10b981",fontSize:"0.875rem"},children:"All sources are in agreement on this topic."})]})]})}if(typeof document<"u"){const e=document.createElement("style");e.textContent=`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,document.head.appendChild(e)}const rr={OpenAI:"#10a37f",Anthropic:"#d4a574","Google Gemini":"#4285f4",Grok:"#1da1f2",Ollama:"#94a3b8"},jl={tier1:{domains:["cdc.gov","who.int","fda.gov","nih.gov","cochranelibrary.com","cochrane.org"],weight:5,label:"Official Health Authority",color:"#10b981"},tier2:{domains:["nejm.org","jamanetwork.com","thelancet.com","bmj.com","nature.com","pubmed.ncbi.nlm.nih.gov","ncbi.nlm.nih.gov","sciencedirect.com"],weight:4,label:"Peer-Reviewed Journal",color:"#3b82f6"},tier3:{domains:[".edu","mayoclinic.org","clevelandclinic.org","hopkinsmedicine.org","uptodate.com","medscape.com"],weight:3,label:"Academic/Medical Center",color:"#8b5cf6"},tier4:{domains:["webmd.com","healthline.com","medlineplus.gov","drugs.com","patient.info"],weight:2,label:"Consumer Health Site",color:"#f59e0b"},tier5:{domains:[],weight:1,label:"General Source",color:"#94a3b8"}},dv=e=>{if(!e)return{tier:5,...jl.tier5};const t=e.toLowerCase();for(const[n,r]of Object.entries(jl))if(r.domains.some(i=>t.includes(i)))return{tier:parseInt(n.replace("tier","")),...r};return{tier:5,...jl.tier5}},ap=e=>{if(!e||!Array.isArray(e)||e.length===0)return{tierCounts:{1:0,2:0,3:0,4:0,5:0},weightedScore:0,topTier:5,totalWeight:0};const t={1:0,2:0,3:0,4:0,5:0};let n=0,r=5;return e.forEach(i=>{const s=i.url||i.link||"",{tier:l,weight:a}=dv(s);t[l]++,n+=a,l<r&&(r=l)}),{tierCounts:t,weightedScore:n,topTier:r,totalWeight:n}},pv=[/\bmay\b/gi,/\bmight\b/gi,/\bcould\b/gi,/\bpossibly\b/gi,/\bpotentially\b/gi,/\bsome (studies|research|evidence)\b/gi,/\blimited (evidence|research|data)\b/gi,/\bemerging (research|evidence)\b/gi,/\bpreliminary\b/gi,/\bearly (studies|research)\b/gi,/\bsuggests?\b/gi,/\bappears? to\b/gi,/\bseems? to\b/gi,/\bnot (fully|well|clearly) (understood|established)\b/gi,/\bmore research (is )?(needed|required)\b/gi,/\bfurther (study|research|investigation)\b/gi,/\binconsistent\b/gi,/\bconflicting\b/gi,/\bmixed (results|findings|evidence)\b/gi],fv=[/\bhas been (shown|demonstrated|proven)\b/gi,/\bstrongly (supports?|suggests?)\b/gi,/\bwell[- ]established\b/gi,/\bdefinitively\b/gi,/\bclearly (shows?|demonstrates?)\b/gi,/\brobust evidence\b/gi,/\bstrong evidence\b/gi,/\bmeta-analysis\b/gi,/\brandomized controlled trial\b/gi,/\blarge[- ]scale (study|trial)\b/gi,/\bsystematic review\b/gi,/\bCochrane\b/gi],hv=e=>{if(!e)return{hedgingScore:0,confidenceScore:0,hedgingCount:0,confidenceCount:0};let t=0,n=0;pv.forEach(s=>{const l=e.match(s);l&&(t+=l.length)}),fv.forEach(s=>{const l=e.match(s);l&&(n+=l.length)});const r=e.split(/\s+/).length,i=Math.max(1,r/500);return{hedgingScore:Math.min(1,t/(5*i)),confidenceScore:Math.min(1,n/(3*i)),hedgingCount:t,confidenceCount:n,netConfidence:Math.max(0,Math.min(1,.5+(n-t)/(10*i)))}},mv=e=>{if(!e||!Array.isArray(e))return{agreementLevel:0,modelConfidence:0,hasContradictions:!1,analysis:{}};const t=e.filter(c=>c.success&&c.content);if(t.length<2)return{agreementLevel:t.length>0?.5:0,modelConfidence:.5,hasContradictions:!1,analysis:{}};const n=t.map(c=>({provider:c.provider_name,...hv(c.content)})),r=n.reduce((c,u)=>c+u.hedgingScore,0)/n.length,i=n.reduce((c,u)=>c+u.netConfidence,0)/n.length,s=t.map(c=>c.content).join(" ").toLowerCase(),l=[/however,? (other|some) (studies|research)/gi,/in contrast/gi,/on the other hand/gi,/disputed/gi,/controversial/gi,/debate/gi];let a=0;return l.forEach(c=>{const u=s.match(c);u&&(a+=u.length)}),{agreementLevel:Math.max(.3,1-r*.5-a*.1),modelConfidence:i,hedgingLevel:r,hasContradictions:a>2,contradictionCount:a,modelCount:t.length,analysis:n}},gv={level1:{patterns:[/systematic review/gi,/meta-analysis/gi,/cochrane review/gi],weight:5,label:"Systematic Review/Meta-analysis",abbrev:"SR"},level2:{patterns:[/randomized controlled trial/gi,/\bRCT\b/g,/randomised controlled/gi,/double[- ]blind/gi,/placebo[- ]controlled/gi],weight:4,label:"Randomized Controlled Trial",abbrev:"RCT"},level3:{patterns:[/cohort study/gi,/prospective study/gi,/longitudinal study/gi,/observational study/gi],weight:3,label:"Cohort/Observational",abbrev:"COH"},level4:{patterns:[/case[- ]control/gi,/retrospective/gi,/cross[- ]sectional/gi],weight:2,label:"Case-Control/Retrospective",abbrev:"CC"},level5:{patterns:[/case (series|report)/gi,/case study/gi,/pilot study/gi,/preliminary/gi],weight:1,label:"Case Report/Pilot",abbrev:"CS"},level6:{patterns:[/expert opinion/gi,/editorial/gi,/commentary/gi,/narrative review/gi],weight:.5,label:"Expert Opinion",abbrev:"EO"}},xv=e=>{if(!e)return{highestLevel:6,designs:[],weightedScore:0};const t=[];let n=6,r=0;for(const[i,s]of Object.entries(gv)){const l=parseInt(i.replace("level",""));for(const a of s.patterns){const c=e.match(a);c&&(t.push({level:l,label:s.label,abbrev:s.abbrev,count:c.length}),r+=s.weight*c.length,l<n&&(n=l))}}return{highestLevel:n,designs:t,weightedScore:r,hasRCT:n<=2}},yv=[/n\s*[=:]\s*([\d,]+)/gi,/([\d,]+)\s*participants/gi,/([\d,]+)\s*patients/gi,/([\d,]+)\s*subjects/gi,/([\d,]+)\s*individuals/gi,/enrolled\s*([\d,]+)/gi,/sample\s*(size|of)\s*([\d,]+)/gi,/([\d,]+)\s*(people|adults|children|women|men)/gi],bv=e=>{if(!e)return{sizes:[],largest:0,total:0,hasLargeSample:!1};const t=[];yv.forEach(s=>{let l;const a=new RegExp(s.source,s.flags);for(;(l=a.exec(e))!==null;){const c=l[0].match(/[\d,]+/);if(c){const u=parseInt(c[0].replace(/,/g,""));u>=10&&u<1e7&&t.push(u)}}});const n=[...new Set(t)].sort((s,l)=>l-s),r=n[0]||0,i=n.reduce((s,l)=>s+l,0);return{sizes:n.slice(0,5),largest:r,total:i,hasLargeSample:r>=1e3,hasVeryLargeSample:r>=1e4,sampleCategory:r>=1e4?"very-large":r>=1e3?"large":r>=100?"moderate":r>0?"small":"unknown"}},vv=[/followed?\s*(for|over|up)?\s*(\d+)\s*(year|month|week|day)s?/gi,/(\d+)[- ](year|month|week)[- ]follow[- ]?up/gi,/follow[- ]?up\s*(period|duration)?\s*(of)?\s*(\d+)\s*(year|month|week|day)s?/gi,/(\d+)[- ](year|month|week|day)s?\s*(of)?\s*follow[- ]?up/gi,/median\s*follow[- ]?up\s*(of)?\s*(\d+\.?\d*)\s*(year|month|week|day)s?/gi,/long[- ]?term\s*\((\d+)\s*(year|month)s?\)/gi],wv=e=>{var i;if(!e)return{durations:[],longestMonths:0,hasLongTerm:!1};const t=[];vv.forEach(s=>{let l;const a=new RegExp(s.source,s.flags);for(;(l=a.exec(e))!==null;){const c=l[0].match(/(\d+\.?\d*)/),u=l[0].match(/(year|month|week|day)s?/i);if(c&&u){const d=parseFloat(c[1]),p=u[1].toLowerCase();let h=0;switch(p){case"year":h=d*12;break;case"month":h=d;break;case"week":h=d/4.33;break;case"day":h=d/30;break}h>0&&h<600&&t.push({value:d,unit:p,months:Math.round(h*10)/10})}}});const n=t.sort((s,l)=>l.months-s.months),r=((i=n[0])==null?void 0:i.months)||0;return{durations:n.slice(0,3),longestMonths:r,hasLongTerm:r>=12,hasVeryLongTerm:r>=60,durationCategory:r>=60?"5+ years":r>=24?"2-5 years":r>=12?"1-2 years":r>=6?"6-12 months":r>0?"<6 months":"unknown"}},kv={strong:[/(\d+)[%x]\s*(reduction|decrease|increase|improvement)/gi,/reduced\s*(by)?\s*(\d+)%/gi,/(\d+)[- ]fold\s*(increase|decrease|reduction)/gi,/significantly\s*(reduced|increased|improved)/gi,/dramatic\s*(improvement|reduction|effect)/gi,/substantial\s*(benefit|effect|improvement)/gi],moderate:[/moderate\s*(effect|improvement|reduction)/gi,/meaningful\s*(improvement|difference|effect)/gi,/clinically\s*significant/gi,/statistically\s*significant/gi],weak:[/marginal\s*(improvement|effect|benefit)/gi,/slight\s*(improvement|effect|benefit)/gi,/small\s*(effect|difference|improvement)/gi,/modest\s*(improvement|effect|benefit)/gi,/trend\s*toward/gi],null:[/no\s*significant\s*(difference|effect|improvement)/gi,/failed\s*to\s*(show|demonstrate|find)/gi,/did\s*not\s*(differ|improve|change)/gi,/non[- ]?significant/gi]},jv=e=>{if(!e)return{category:"unknown",patterns:[],hasQuantified:!1};const t={strong:0,moderate:0,weak:0,null:0},n=[];for(const[l,a]of Object.entries(kv))for(const c of a){const u=e.match(c);u&&(t[l]+=u.length,n.push({category:l,count:u.length}))}const r=e.match(/(\d+\.?\d*)%/g),i=r&&r.length>0,s=Object.entries(t).sort((l,a)=>a[1]-l[1])[0];return{category:s[1]>0?s[0]:"unknown",counts:t,patterns:n.slice(0,5),hasQuantified:i,quantifiedCount:(r==null?void 0:r.length)||0}},mi={regions:{"North America":/\b(united states|usa|u\.s\.|american|canada|canadian|mexico|mexican)\b/gi,Europe:/\b(europe|european|uk|united kingdom|british|germany|german|france|french|italy|italian|spain|spanish|netherlands|dutch|sweden|swedish|norway|norwegian|denmark|danish)\b/gi,Asia:/\b(china|chinese|japan|japanese|korea|korean|india|indian|taiwan|singapore|hong kong|thailand|vietnam|indonesia|malaysia|philippines)\b/gi,Oceania:/\b(australia|australian|new zealand)\b/gi,"Latin America":/\b(brazil|brazilian|argentina|chile|colombia|peru|latin america)\b/gi,Africa:/\b(africa|african|south africa|nigeria|kenya|egypt|morocco)\b/gi,"Middle East":/\b(israel|israeli|iran|saudi|dubai|qatar|turkey|turkish)\b/gi},scope:{multinational:/\b(multinational|multi[- ]?national|multi[- ]?center|multi[- ]?centre|international|global|worldwide|across\s*\d+\s*countries)\b/gi,multisite:/\b(multi[- ]?site|multiple\s*(sites|centers|centres|institutions|hospitals))\b/gi}},Sv=e=>{if(!e)return{regions:[],regionCount:0,isMultinational:!1,diversityScore:0};const t=[];for(const[s,l]of Object.entries(mi.regions))l.test(e)&&t.push(s);const n=mi.scope.multinational.test(e),r=mi.scope.multisite.test(e);Object.values(mi.regions).forEach(s=>s.lastIndex=0),Object.values(mi.scope).forEach(s=>s.lastIndex=0);const i=Math.min(1,t.length*.15+(n?.3:0)+(r?.1:0));return{regions:t,regionCount:t.length,isMultinational:n,isMultisite:r,diversityScore:i,diversityCategory:t.length>=4?"global":t.length>=2?"multi-regional":t.length===1?"single-region":"unknown"}},Sl={independent:[/\b(NIH|National Institutes? of Health)\b/gi,/\b(NCI|National Cancer Institute)\b/gi,/\b(CDC|Centers? for Disease Control)\b/gi,/\b(NSF|National Science Foundation)\b/gi,/\b(WHO|World Health Organization)\b/gi,/\b(government[- ]?funded|publicly[- ]?funded)\b/gi,/\b(academic|university)[- ]?(funded|grant|research)\b/gi,/\bno\s*(conflicts?|competing)\s*(of\s*)?interest\b/gi],industry:[/\b(industry[- ]?funded|pharmaceutical[- ]?company|drug[- ]?maker)\b/gi,/\b(sponsored\s*by|funding\s*from)\s*[A-Z][a-z]+\b/g,/\b(Pfizer|Merck|Johnson|Novartis|Roche|AstraZeneca|Moderna|BioNTech|GSK|Sanofi|AbbVie|Bristol[- ]?Myers|Eli Lilly|Amgen)\b/gi],conflicted:[/\b(conflict[s]?\s*(of\s*)?interest|competing\s*interest)\b/gi,/\breceived\s*(funding|grants?|honorari|payment|consulting)/gi,/\b(advisory\s*board|consultant|speaker)\s*(for|fee)/gi]},Cv=e=>{if(!e)return{category:"unknown",sources:[],independenceScore:.5};let t=0,n=0,r=0;const i=[];Sl.independent.forEach(l=>{const a=e.match(l);a&&(t+=a.length,i.push({type:"independent",matches:a.slice(0,2)}))}),Sl.industry.forEach(l=>{const a=e.match(l);a&&(n+=a.length,i.push({type:"industry",matches:a.slice(0,2)}))}),Sl.conflicted.forEach(l=>{const a=e.match(l);a&&(r+=a.length)});let s=.5;return t>0&&n===0?s=.9:t>n?s=.7:n>0&&t===0&&(s=.3),r>0&&(s-=.1*Math.min(r,3)),{category:s>=.7?"independent":s<=.4?"industry":"mixed",sources:i.slice(0,3),independentCount:t,industryCount:n,conflictCount:r,independenceScore:Math.max(0,Math.min(1,s))}},Nv=e=>{if(!e)return{years:[],mostRecent:null,oldest:null,span:0};const t=[/\((\d{4})\)/g,/,\s*(\d{4})\b/g,/\b(19\d{2}|20[0-2]\d)\b/g],n=new Set;t.forEach(c=>{let u;for(;(u=c.exec(e))!==null;){const d=parseInt(u[1]);d>=1990&&d<=new Date().getFullYear()&&n.add(d)}});const r=[...n].sort((c,u)=>u-c),i=new Date().getFullYear(),s=r[0]||null,l=r[r.length-1]||null;let a=0;if(s){const c=i-s;c<=1?a=1:c<=2?a=.9:c<=3?a=.8:c<=5?a=.6:c<=10?a=.4:a=.2}return{years:r.slice(0,10),mostRecent:s,oldest:l,span:l&&s?s-l:0,recencyScore:a,recencyCategory:s?i-s<=2?"current":i-s<=5?"recent":"dated":"unknown"}},Cl={replicated:[/\breplicat(ed|ion)\b/gi,/\bconfirm(ed|s)?\s*(by|in)\s*(multiple|other|subsequent)\s*(studies|trials|research)/gi,/\bconsistent(ly)?\s*(across|with)\s*(multiple|other)\s*(studies|trials)/gi,/\brobust\s*(across|finding)/gi,/\breproducib(le|ility)\b/gi,/\bmultiple\s*(studies|trials)\s*(have\s*)?(shown|demonstrated|confirmed)/gi],notReplicated:[/\bnot\s*(been\s*)?(replicated|reproduced|confirmed)/gi,/\bfailed\s*to\s*replicate/gi,/\binconsistent\s*(results|findings)/gi,/\bcontradictory\s*(results|findings|evidence)/gi],needsReplication:[/\brequires?\s*(further|additional)\s*(replication|confirmation|study)/gi,/\bmore\s*(research|studies)\s*(is\s*)?(needed|required)/gi,/\bpreliminary\s*(finding|result|evidence)/gi,/\bsingle\s*study/gi]},Ev=e=>{if(!e)return{status:"unknown",score:.5,indicators:[]};let t=0,n=0,r=0;const i=[];Cl.replicated.forEach(a=>{const c=e.match(a);c&&(t+=c.length,i.push({type:"replicated",match:c[0]}))}),Cl.notReplicated.forEach(a=>{const c=e.match(a);c&&(n+=c.length,i.push({type:"not-replicated",match:c[0]}))}),Cl.needsReplication.forEach(a=>{const c=e.match(a);c&&(r+=c.length,i.push({type:"needs-replication",match:c[0]}))});let s="unknown",l=.5;return t>0&&n===0?(s="replicated",l=Math.min(1,.7+t*.1)):n>0?(s="disputed",l=Math.max(.2,.5-n*.1)):r>0&&(s="preliminary",l=.4),{status:s,score:l,indicators:i.slice(0,5),replicatedCount:t,notReplicatedCount:n,needsCount:r}},cp={present:[/\bsystematic\s*review/gi,/\bmeta[- ]?analysis/gi,/\bCochrane\s*(review|database|collaboration)/gi,/\bpooled\s*(analysis|data|results)/gi,/\bquantitative\s*synthesis/gi],quality:[/\bPRISMA\b/gi,/\bMOOSE\b/gi,/\bprospero/gi,/\bheterogeneity\b/gi,/\bfunnel\s*plot/gi,/\bpublication\s*bias/gi,/\bquality\s*(assessment|appraisal)/gi]},zv=e=>{if(!e)return{hasSystematicReview:!1,hasMeta:!1,quality:0};let t=0,n=0;cp.present.forEach(l=>{const a=e.match(l);a&&(t+=a.length)}),cp.quality.forEach(l=>{const a=e.match(l);a&&(n+=a.length)});const r=t>0,i=/meta[- ]?analysis/gi.test(e),s=Math.min(1,t*.2+n*.15);return{hasSystematicReview:r,hasMeta:i,count:t,qualityIndicators:n,quality:s,category:i?"meta-analysis":r?"systematic-review":"none"}},Nl={hard:[/\b(mortality|death|survival)\b/gi,/\b(myocardial\s*infarction|heart\s*attack|stroke)\b/gi,/\b(hospitalization|hospitalisation)\b/gi,/\ball[- ]?cause\s*(mortality|death)/gi,/\bcardiovascular\s*(event|death|outcome)/gi,/\bcancer\s*(incidence|mortality|death)/gi,/\b(cure|remission)\s*rate/gi],clinical:[/\b(symptom|pain)\s*(score|reduction|improvement)/gi,/\bquality\s*of\s*life/gi,/\b(functional|physical)\s*(status|capacity|improvement)/gi,/\bdisease\s*progression/gi,/\brelapse\s*rate/gi,/\brecurrence/gi],surrogate:[/\b(biomarker|blood\s*pressure|cholesterol|HbA1c|glucose)\b/gi,/\b(tumor\s*size|lesion)\b/gi,/\blaboratory\s*(measure|value|parameter)/gi,/\b(imaging|radiologic)\s*(finding|response)/gi,/\bproxy\s*(measure|endpoint)/gi]},_v=e=>{if(!e)return{category:"unknown",hasHard:!1,hasClinical:!1,hasSurrogate:!1};let t=0,n=0,r=0;Nl.hard.forEach(a=>{const c=e.match(a);c&&(t+=c.length)}),Nl.clinical.forEach(a=>{const c=e.match(a);c&&(n+=c.length)}),Nl.surrogate.forEach(a=>{const c=e.match(a);c&&(r+=c.length)});const i=t+n+r;let s="unknown",l=.5;return i>0&&(t>=n&&t>=r?(s="hard",l=.9):n>=r?(s="clinical",l=.7):(s="surrogate",l=.5)),{category:s,hasHard:t>0,hasClinical:n>0,hasSurrogate:r>0,counts:{hard:t,clinical:n,surrogate:r},reliabilityScore:l}},Iv=(e,t=[])=>{const n=xv(e),r=bv(e),i=wv(e),s=jv(e),l=Sv(e),a=Cv(e),c=Nv(e),u=Ev(e),d=zv(e),p=_v(e);let h=0;return h+=(6-n.highestLevel)*5,r.hasVeryLargeSample?h+=15:r.hasLargeSample?h+=10:r.largest>=100&&(h+=5),i.hasVeryLongTerm?h+=10:i.hasLongTerm?h+=6:i.longestMonths>=6&&(h+=3),s.hasQuantified&&(h+=5),s.category==="strong"?h+=5:s.category==="moderate"&&(h+=3),h+=Math.round(l.diversityScore*10),h+=Math.round(a.independenceScore*10),h+=Math.round(c.recencyScore*10),h+=Math.round(u.score*5),d.hasMeta?h+=5:d.hasSystematicReview&&(h+=3),{studyDesign:n,sampleSize:r,duration:i,effectSize:s,geography:l,funding:a,recency:c,replication:u,systematicReview:d,endpoints:p,depthScore:Math.min(100,Math.max(0,h)),depthCategory:h>=70?"comprehensive":h>=50?"substantial":h>=30?"moderate":"limited"}};function Pv({size:e=48}){return o.jsxs("svg",{width:e,height:e,viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[o.jsxs("defs",{children:[o.jsxs("linearGradient",{id:"prism-gradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[o.jsx("stop",{offset:"0%",stopColor:"#a855f7"}),o.jsx("stop",{offset:"100%",stopColor:"#6366f1"})]}),o.jsxs("linearGradient",{id:"rainbow",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[o.jsx("stop",{offset:"0%",stopColor:"#ef4444"}),o.jsx("stop",{offset:"25%",stopColor:"#f59e0b"}),o.jsx("stop",{offset:"50%",stopColor:"#10b981"}),o.jsx("stop",{offset:"75%",stopColor:"#3b82f6"}),o.jsx("stop",{offset:"100%",stopColor:"#8b5cf6"})]})]}),o.jsx("path",{d:"M24 6L42 38H6L24 6Z",fill:"url(#prism-gradient)",opacity:"0.9"}),o.jsx("line",{x1:"2",y1:"20",x2:"18",y2:"20",stroke:"white",strokeWidth:"2",opacity:"0.6"}),o.jsx("line",{x1:"30",y1:"22",x2:"46",y2:"14",stroke:"#ef4444",strokeWidth:"1.5",opacity:"0.8"}),o.jsx("line",{x1:"30",y1:"24",x2:"46",y2:"20",stroke:"#f59e0b",strokeWidth:"1.5",opacity:"0.8"}),o.jsx("line",{x1:"30",y1:"26",x2:"46",y2:"26",stroke:"#10b981",strokeWidth:"1.5",opacity:"0.8"}),o.jsx("line",{x1:"30",y1:"28",x2:"46",y2:"32",stroke:"#3b82f6",strokeWidth:"1.5",opacity:"0.8"}),o.jsx("line",{x1:"30",y1:"30",x2:"46",y2:"38",stroke:"#8b5cf6",strokeWidth:"1.5",opacity:"0.8"})]})}function up({size:e=48,animated:t=!0}){return o.jsxs("svg",{width:e,height:e,viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:t?"chorus-logo-animated":"",children:[o.jsxs("defs",{children:[o.jsxs("linearGradient",{id:"chorus-gradient-1",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[o.jsx("stop",{offset:"0%",stopColor:"#06b6d4"}),o.jsx("stop",{offset:"100%",stopColor:"#0891b2"})]}),o.jsxs("linearGradient",{id:"chorus-gradient-2",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[o.jsx("stop",{offset:"0%",stopColor:"#14b8a6"}),o.jsx("stop",{offset:"100%",stopColor:"#0d9488"})]}),o.jsxs("filter",{id:"glow",children:[o.jsx("feGaussianBlur",{stdDeviation:"1.5",result:"coloredBlur"}),o.jsxs("feMerge",{children:[o.jsx("feMergeNode",{in:"coloredBlur"}),o.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),o.jsx("circle",{cx:"24",cy:"24",r:"22",fill:"url(#chorus-gradient-1)",opacity:"0.15"}),o.jsx("path",{className:"wave-1",d:"M8 24 Q14 18, 20 24 T32 24 T44 24",stroke:"url(#chorus-gradient-1)",strokeWidth:"2.5",fill:"none",opacity:"0.9",filter:"url(#glow)"}),o.jsx("path",{className:"wave-2",d:"M8 20 Q14 14, 20 20 T32 20 T44 20",stroke:"#14b8a6",strokeWidth:"2",fill:"none",opacity:"0.7"}),o.jsx("path",{className:"wave-3",d:"M8 28 Q14 22, 20 28 T32 28 T44 28",stroke:"#0891b2",strokeWidth:"2",fill:"none",opacity:"0.7"}),o.jsx("rect",{x:"21",y:"16",width:"6",height:"16",rx:"1",fill:"white",opacity:"0.95"}),o.jsx("rect",{x:"16",y:"21",width:"16",height:"6",rx:"1",fill:"white",opacity:"0.95"}),o.jsx("circle",{cx:"24",cy:"24",r:"8",fill:"url(#chorus-gradient-2)",opacity:"0.3"})]})}function Tv({size:e=64,withText:t=!1}){const n=t?"/images/logo-2.png":"/images/logo-1.png",r=e,i=t?e*2.5:e;return o.jsx("img",{src:n,alt:"Chorus",style:{height:`${r}px`,width:t?"auto":`${i}px`,maxWidth:t?`${i}px`:void 0,objectFit:"contain"},className:"chorus-image-logo"})}function Cs({confidence:e,compact:t=!1}){var f,k,C,A,g,m,x,b,j,w,E,_,W,D,B,U,G,de,Z,ae,se,L,q,y,K,re,v,oe,Re,ce,Ge,$e,at;if(!e)return null;const n=e.profile||{},r=n.quality||"C",i=n.retrieval||"II",s=n.agreement??75,l=e.sources||{},a={A:{main:"#10b981",bg:"rgba(16, 185, 129, 0.15)",label:"High Quality"},B:{main:"#3b82f6",bg:"rgba(59, 130, 246, 0.15)",label:"Moderate Quality"},C:{main:"#f59e0b",bg:"rgba(245, 158, 11, 0.15)",label:"Low Quality"},D:{main:"#ef4444",bg:"rgba(239, 68, 68, 0.15)",label:"Very Low"}},c={I:{main:"#10b981",label:"Strong Retrieval"},II:{main:"#f59e0b",label:"Moderate Retrieval"},III:{main:"#ef4444",label:"Limited Retrieval"}},u=a[r]||a.C,d=c[i]||c.II,p=Le=>Le>=85?"#10b981":Le>=65?"#3b82f6":Le>=45?"#f59e0b":"#ef4444",h=(Le,jt=4,Cn)=>o.jsx("div",{className:"source-dots",children:Array.from({length:jt},(cn,St)=>o.jsx("span",{className:`dot ${St<Le?"filled":""}`,style:{backgroundColor:St<Le?Cn:void 0}},St))});return t?o.jsx("div",{className:"evidence-profile-compact",style:{borderColor:u.main},children:o.jsxs("span",{className:"profile-code",children:[o.jsx("span",{className:"code-quality",style:{color:u.main},children:r}),o.jsx("span",{className:"code-separator",children:"·"}),o.jsx("span",{className:"code-retrieval",style:{color:d.main},children:i}),o.jsx("span",{className:"code-separator",children:"·"}),o.jsxs("span",{className:"code-agreement",style:{color:p(s)},children:[s,"%"]})]})}):o.jsxs("div",{className:"evidence-profile-panel",children:[o.jsxs("div",{className:"profile-header",children:[o.jsxs("div",{className:"profile-badge-container",children:[o.jsxs("div",{className:"profile-badge",style:{background:`linear-gradient(135deg, ${u.bg} 0%, rgba(30, 41, 59, 0.95) 100%)`},children:[o.jsx("span",{className:"badge-quality",style:{color:u.main},children:r}),o.jsx("span",{className:"badge-dot",children:"·"}),o.jsx("span",{className:"badge-retrieval",style:{color:d.main},children:i}),o.jsx("span",{className:"badge-dot",children:"·"}),o.jsxs("span",{className:"badge-agreement",style:{color:p(s)},children:[s,"%"]})]}),o.jsx("div",{className:"profile-label",children:"Evidence Profile"})]}),o.jsxs("div",{className:"profile-interpretation",children:[o.jsxs("div",{className:"interp-item",children:[o.jsx("span",{className:"interp-icon",style:{color:u.main},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),o.jsx("path",{d:"M2 17l10 5 10-5"}),o.jsx("path",{d:"M2 12l10 5 10-5"})]})}),o.jsx("span",{className:"interp-text",children:u.label})]}),o.jsxs("div",{className:"interp-item",children:[o.jsx("span",{className:"interp-icon",style:{color:d.main},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"11",cy:"11",r:"8"}),o.jsx("path",{d:"M21 21l-4.35-4.35"})]})}),o.jsx("span",{className:"interp-text",children:d.label})]}),o.jsxs("div",{className:"interp-item",children:[o.jsx("span",{className:"interp-icon",style:{color:p(s)},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),o.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}),o.jsxs("span",{className:"interp-text",children:[s>=85?"Strong":s>=65?"Moderate":"Limited"," Source Agreement"]})]})]})]}),o.jsx("div",{className:"profile-sources",children:o.jsxs("div",{className:"sources-grid",children:[o.jsxs("div",{className:"source-card",children:[o.jsxs("div",{className:"source-header",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#6366f1",strokeWidth:"2",children:[o.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.jsx("polyline",{points:"14 2 14 8 20 8"}),o.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),o.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]}),o.jsx("span",{className:"source-name",children:"Guidelines"})]}),h(((f=l.guidelines)==null?void 0:f.strength)||0,4,"#6366f1"),o.jsxs("span",{className:"source-detail",children:[((k=l.guidelines)==null?void 0:k.count)||0," sources",((A=(C=l.guidelines)==null?void 0:C.credibility)==null?void 0:A.topTier)<=2&&o.jsx("span",{className:"tier-badge tier-high",title:"Includes CDC, WHO, NIH, or major journals",children:" T1-2"}),((m=(g=l.guidelines)==null?void 0:g.credibility)==null?void 0:m.topTier)===3&&o.jsx("span",{className:"tier-badge tier-mid",title:"Academic/Medical center sources",children:" T3"})]})]}),o.jsxs("div",{className:"source-card",children:[o.jsxs("div",{className:"source-header",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#0891b2",strokeWidth:"2",children:[o.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),o.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]}),o.jsx("span",{className:"source-name",children:"Literature"})]}),h(((x=l.literature)==null?void 0:x.strength)||0,4,"#0891b2"),o.jsxs("span",{className:"source-detail",children:[((b=l.literature)==null?void 0:b.count)||0," papers",((E=(w=(j=l.literature)==null?void 0:j.credibility)==null?void 0:w.tierCounts)==null?void 0:E[2])>0&&o.jsx("span",{className:"tier-badge tier-peer",title:"Includes peer-reviewed journals (NEJM, JAMA, etc.)",children:" PR"})]})]}),o.jsxs("div",{className:"source-card",children:[o.jsxs("div",{className:"source-header",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#8b5cf6",strokeWidth:"2",children:[o.jsx("rect",{x:"3",y:"11",width:"18",height:"10",rx:"2"}),o.jsx("circle",{cx:"12",cy:"5",r:"3"}),o.jsx("path",{d:"M12 8v3"}),o.jsx("path",{d:"M8 16h.01"}),o.jsx("path",{d:"M16 16h.01"})]}),o.jsx("span",{className:"source-name",children:"AI Models"})]}),h(((_=l.ai)==null?void 0:_.strength)||0,4,"#8b5cf6"),o.jsxs("span",{className:"source-detail",children:[((W=l.ai)==null?void 0:W.count)||0," models",((B=(D=l.ai)==null?void 0:D.quality)==null?void 0:B.hedgingLevel)>.3&&o.jsx("span",{className:"tier-badge tier-caution",title:"AI responses contain hedging/uncertainty language",children:" ?"}),((G=(U=l.ai)==null?void 0:U.quality)==null?void 0:G.hasContradictions)&&o.jsx("span",{className:"tier-badge tier-warn",title:"AI responses show contradictions",children:" !"})]})]}),o.jsxs("div",{className:"source-card source-bonus",children:[o.jsxs("div",{className:"source-header",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#10b981",strokeWidth:"2",children:[o.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),o.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),o.jsx("span",{className:"source-name",children:"Validation"})]}),h(((de=l.crossValidation)==null?void 0:de.strength)||0,4,"#10b981"),o.jsx("span",{className:"source-detail",children:((ae=(Z=l.crossValidation)==null?void 0:Z.sources)==null?void 0:ae.join(" + "))||"Cross-checked"})]})]})}),e.evidenceDepth&&e.evidenceDepth.depthScore>0&&o.jsxs("div",{className:"evidence-depth-section",children:[o.jsxs("div",{className:"depth-header",children:[o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#94a3b8",strokeWidth:"2",children:[o.jsx("path",{d:"M12 2v6m0 0l-3-3m3 3l3-3"}),o.jsx("path",{d:"M12 22v-6m0 0l3 3m-3-3l-3 3"}),o.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),o.jsxs("span",{className:"depth-label",children:["Evidence Depth: ",e.evidenceDepth.depthCategory]}),o.jsxs("span",{className:"depth-score",children:[e.evidenceDepth.depthScore,"/100"]})]}),o.jsxs("div",{className:"depth-indicators",children:[((se=e.evidenceDepth.systematicReview)==null?void 0:se.hasSystematicReview)&&o.jsx("span",{className:"depth-badge depth-gold",title:"Systematic review or meta-analysis cited",children:"SR/MA"}),((L=e.evidenceDepth.studyDesign)==null?void 0:L.hasRCT)&&!((q=e.evidenceDepth.systematicReview)!=null&&q.hasSystematicReview)&&o.jsx("span",{className:"depth-badge depth-purple",title:"Randomized controlled trial evidence",children:"RCT"}),((y=e.evidenceDepth.sampleSize)==null?void 0:y.hasLargeSample)&&o.jsxs("span",{className:"depth-badge depth-teal",title:`Large sample: n=${(K=e.evidenceDepth.sampleSize.largest)==null?void 0:K.toLocaleString()}`,children:["n=",e.evidenceDepth.sampleSize.largest>=1e4?"10k+":e.evidenceDepth.sampleSize.largest>=1e3?`${Math.round(e.evidenceDepth.sampleSize.largest/1e3)}k`:e.evidenceDepth.sampleSize.largest]}),((re=e.evidenceDepth.duration)==null?void 0:re.hasLongTerm)&&o.jsx("span",{className:"depth-badge depth-purple",title:`Long-term follow-up: ${e.evidenceDepth.duration.category}`,children:e.evidenceDepth.duration.category}),((v=e.evidenceDepth.replication)==null?void 0:v.status)==="replicated"&&o.jsx("span",{className:"depth-badge depth-green",title:"Findings replicated across studies",children:"Replicated"}),((oe=e.evidenceDepth.replication)==null?void 0:oe.status)==="preliminary"&&o.jsx("span",{className:"depth-badge depth-amber",title:"Preliminary evidence, needs replication",children:"Preliminary"}),((Re=e.evidenceDepth.geography)==null?void 0:Re.isMultinational)&&o.jsx("span",{className:"depth-badge depth-teal",title:`Multi-national: ${(ce=e.evidenceDepth.geography.regions)==null?void 0:ce.join(", ")}`,children:"Global"}),((Ge=e.evidenceDepth.funding)==null?void 0:Ge.category)==="independent"&&o.jsx("span",{className:"depth-badge depth-green",title:"Independently funded research",children:"Independent"}),(($e=e.evidenceDepth.recency)==null?void 0:$e.category)==="current"&&o.jsx("span",{className:"depth-badge depth-blue",title:`Most recent: ${e.evidenceDepth.recency.mostRecent}`,children:"Current"}),((at=e.evidenceDepth.recency)==null?void 0:at.category)==="dated"&&o.jsx("span",{className:"depth-badge depth-red",title:"Some sources are dated",children:"Dated"})]})]}),o.jsxs("div",{className:"profile-statement",style:{borderLeftColor:u.main},children:[o.jsx("span",{className:"statement-icon",children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("path",{d:"M12 16v-4"}),o.jsx("path",{d:"M12 8h.01"})]})}),o.jsxs("span",{className:"statement-text",children:[r==="A"&&s>=85&&"Multiple high-quality sources report consistent findings on this topic.",r==="A"&&s<85&&"High-quality sources available, though they show some variation in recommendations.",r==="B"&&s>=70&&"Good evidence available with reasonable alignment across sources.",r==="B"&&s<70&&"Moderate evidence available with notable differences between sources.",r==="C"&&"Limited sources available. Findings should be interpreted with caution.",r==="D"&&"Very limited sources. Synthesis primarily reflects AI analysis rather than external evidence."]})]})]})}function Av(){var Yc;const[e,t]=P.useState(""),[n,r]=P.useState(!1),[i,s]=P.useState([]),[l,a]=P.useState(null),[c,u]=P.useState(null),[d,p]=P.useState([]),[h,f]=P.useState(null),[k,C]=P.useState(!1),[A,g]=P.useState(!1),[m,x]=P.useState("patient"),[b,j]=P.useState(!1),[w,E]=P.useState(""),[_,W]=P.useState([]),[D,B]=P.useState(null),[U,G]=P.useState(!1),[de,Z]=P.useState(!1),[ae,se]=P.useState([]),[L,q]=P.useState(""),[y,K]=P.useState(!1),[re,v]=P.useState(!1),[oe,Re]=P.useState(!1),[ce,Ge]=P.useState(null),[$e,at]=P.useState([]),[Le,jt]=P.useState(null),[Cn,cn]=P.useState(!1),[St,Rt]=P.useState(!1),[Gn,Kn]=P.useState(!1),xr=P.useRef(null),un=P.useRef(null),le=P.useRef(null),be=P.useRef(null),[Ce,Be]=P.useState({app_mode:"prism",app_name:"Prism",show_study:!0,default_mode:"public_health",tagline:"AI-Powered Public Health Communication"}),[Ve,$t]=P.useState("public_health"),[z,O]=P.useState(()=>localStorage.getItem("chorusViewMode")||"detailed");P.useEffect(()=>{window.self!==window.top&&(document.documentElement.classList.add("in-iframe"),document.body.classList.add("in-iframe"))},[]),P.useEffect(()=>{fetch("/api/config").then(S=>S.json()).then(S=>{Be(S),$t(S.default_mode),S.app_mode==="chorus"&&x("clinician")}).catch(()=>{})},[]),P.useEffect(()=>{fetch("/api/providers").then(S=>S.json()).then(S=>p(S.configured)).catch(()=>p([]))},[]),P.useEffect(()=>{localStorage.setItem("chorusViewMode",z)},[z]),P.useEffect(()=>{l&&un.current&&un.current.scrollIntoView({behavior:"smooth",block:"start"})},[l]),P.useEffect(()=>{ae.length>0&&be.current&&setTimeout(()=>{be.current.scrollIntoView({behavior:"smooth",block:"start"})},100)},[ae.length]);const J=async S=>{if(!(!S||S.length===0)){Kn(!0),f(null);try{const R=new FormData;for(const F of S)R.append("files",F);const H=await fetch("/api/files/upload",{method:"POST",body:R});if(!H.ok){const F=await H.json();throw new Error(F.detail||"Upload failed")}const I=await H.json();at(F=>[...F,...I.files.map(N=>({file_id:N.file_id,filename:N.filename,preview:N.preview,extracted_chars:N.extracted_chars}))])}catch(R){f(`File upload failed: ${R.message}`)}finally{Kn(!1)}}},ne=async S=>{try{await fetch(`/api/files/${S}`,{method:"DELETE"})}catch{}at(R=>R.filter(H=>H.file_id!==S))},he=S=>{S.preventDefault(),S.stopPropagation(),cn(!0)},Ct=S=>{S.preventDefault(),S.stopPropagation(),cn(!1)},dn=S=>{S.preventDefault(),S.stopPropagation(),cn(!1);const R=Array.from(S.dataTransfer.files);R.length>0&&J(R)},Nt=async(S,R=!1)=>{var H;if((H=S==null?void 0:S.preventDefault)==null||H.call(S),!(!e.trim()||n||U)){if(B(null),se([]),K(!1),f(null),Ce.app_mode==="chorus"&&!R){Xn(e);return}tt(e)}},Xn=async S=>{G(!0),se([]),q(""),K(!1);try{const R=await fetch("/api/clarify-step",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({original_question:S,conversation:[]})});if(R.ok){const H=await R.json();H.is_ready?(G(!1),t(H.refined_question),tt(H.refined_question)):(B({originalQuestion:S,refinedQuestion:H.refined_question,quickOptions:H.quick_options}),se([{role:"ai",text:H.clarifying_question}]),G(!1))}else G(!1),tt(S)}catch(R){console.error("Clarification failed:",R),G(!1),tt(S)}},pn=async S=>{if(!S.trim())return;const R=[...ae,{role:"user",text:S}];se(R),q(""),G(!0);try{const H=await fetch("/api/clarify-step",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({original_question:D.originalQuestion,conversation:R})});if(H.ok){const I=await H.json();B(F=>({...F,refinedQuestion:I.refined_question,quickOptions:I.quick_options})),I.is_ready?(K(!0),G(!1)):(se([...R,{role:"ai",text:I.clarifying_question}]),G(!1))}else G(!1),K(!0)}catch(H){console.error("Clarification step failed:",H),G(!1),K(!0)}},ct=()=>{const S=(D==null?void 0:D.refinedQuestion)||e;t(S),B(null),se([]),K(!1),tt(S)},Nn=()=>{const S=(D==null?void 0:D.originalQuestion)||e;B(null),se([]),K(!1),tt(S)},tt=async S=>{r(!0),s([]),a(null),u(null),jt(null),f(null),j(!1),W([]),E("");try{const R=fetch("/api/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:S,include_synthesis:!0,mode:Ve,health_context:ce||void 0})}),H=Ve==="health_research"?fetch("/api/evidence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:S})}):null,[I,F]=await Promise.all([R,H]);if(!I.ok){const $=await I.json();throw new Error($.detail||"Failed to query LLMs")}const N=await I.json();if(s(N.responses),a(N.synthesis),jt(N.conflict_analysis||null),W([{question:S,synthesis:N.synthesis}]),F&&F.ok){const $=await F.json();u($)}}catch(R){f(R.message)}finally{r(!1)}},fm=async S=>{if(S.preventDefault(),!w.trim()||n)return;r(!0),f(null);const H=`Context from previous conversation:
${_.map(I=>{var F;return`Previous question: ${I.question}
Previous answer: ${((F=I.synthesis)==null?void 0:F.content)||""}`}).join(`

`)}

Follow-up question: ${w}`;try{const I=await fetch("/api/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:H,include_synthesis:!0,mode:Ve})});if(!I.ok){const N=await I.json();throw new Error(N.detail||"Failed to query LLMs")}const F=await I.json();s(F.responses),a(F.synthesis),jt(F.conflict_analysis||null),W(N=>[...N,{question:w,synthesis:F.synthesis}]),E(""),setTimeout(()=>{var N;return(N=le.current)==null?void 0:N.focus()},100)}catch(I){f(I.message)}finally{r(!1)}},hm=S=>{if(!S)return[];const R=[],H=S.split(`
`);let I=null,F=[];for(const N of H)N.startsWith("## ")?(I&&R.push({title:I,content:F.join(`
`).trim()}),I=N.replace("## ","").trim(),F=[]):I&&F.push(N);return I&&R.push({title:I,content:F.join(`
`).trim()}),R},Ro=S=>S.includes("Hearing")?{icon:"👂",color:"#3b82f6",priority:1}:S.includes("Concerns")||S.includes("Hesitanc")?{icon:"⚠️",color:"#f59e0b",priority:2}:S.includes("Misinformation")?{icon:"🚨",color:"#ef4444",priority:3}:S.includes("Effective")||S.includes("Messaging Angles")?{icon:"✅",color:"#10b981",priority:4}:S.includes("Recommendations for Public Health Officials")?{icon:"📋",color:"#8b5cf6",priority:5}:S.includes("Recommended Public Health Message")?{icon:"💬",color:"#ec4899",priority:6,highlight:!0}:S.includes("Evidence Summary")?{icon:"📚",color:"#0ea5e9",priority:1}:S.includes("Points of Agreement")?{icon:"✅",color:"#10b981",priority:2}:S.includes("Points of Disagreement")?{icon:"⚡",color:"#f59e0b",priority:3}:S.includes("Confidence Level")?{icon:"📊",color:"#14b8a6",priority:4}:S.includes("Recommendations for Further Research")?{icon:"🔬",color:"#06b6d4",priority:5}:{icon:"📝",color:"#6b7280",priority:99},mm=["What is the current evidence on GLP-1 agonists for weight management in non-diabetic patients?","Should I recommend aspirin for primary cardiovascular prevention in a 55-year-old male?","What are the latest guidelines on antibiotic prophylaxis for dental procedures in patients with prosthetic heart valves?","Is there evidence supporting intermittent fasting for metabolic syndrome?"],gm=["Should I get a flu vaccine this year?","Are COVID boosters still recommended?","Is it safe to eat eggs during a bird flu outbreak?","What are the side effects of the MMR vaccine?"],Hc=Ce.app_mode==="chorus"?mm:gm,$c=l?hm(l.content):[],ni=$c.find(S=>Ro(S.title).highlight),Lo=$c.filter(S=>!Ro(S.title).highlight),Vc=()=>{var F,N;if(!l&&!c&&i.length===0)return null;const S=xm(c==null?void 0:c.guidelines),R=ym(c==null?void 0:c.literature),H=bm(i),I=vm(S,R,H);return{guidelines:S,literature:R,aiConsensus:H,confidence:I,hasEvidence:((F=c==null?void 0:c.guidelines)==null?void 0:F.count)>0||((N=c==null?void 0:c.literature)==null?void 0:N.count)>0,hasAI:i.filter($=>$.success).length>0}},xm=S=>{if(!S||S.count===0)return{available:!1,summary:null,sources:[]};const R=S.source_types||{},H=S.links||[],I=Object.entries(R).filter(([N,$])=>$>0).map(([N])=>N),F=H.slice(0,5).map(N=>({text:N.snippet,source:yr(N.url),url:N.url,title:N.title})).filter(N=>N.text);return{available:!0,organizations:I,keyPoints:F,totalSources:S.count,sources:H}},yr=S=>S.includes("cdc.gov")?"CDC":S.includes("who.int")?"WHO":S.includes("fda.gov")?"FDA":S.includes("nih.gov")?"NIH":S.includes("heart.org")?"AHA":S.includes("cancer.org")?"ACS":"Medical Authority",ym=S=>{if(!S||S.count===0)return{available:!1,summary:null,topCited:[]};const R=S.top_cited||[],H=S.links||[],I=H.slice(0,5).map(F=>({text:F.snippet,citations:F.cited_by||0,publication:F.publication_info,url:F.url,title:F.title})).filter(F=>F.text);return{available:!0,totalPapers:S.count,topCited:R.slice(0,3),researchFindings:I,sources:H}},bm=S=>{const R=S.filter(I=>I.success);if(R.length===0)return{available:!1,consensus:null,providers:[]};const H=R.map(I=>({name:I.provider_name,model:I.model,content:I.content}));return{available:!0,modelCount:R.length,providers:H,synthesisContent:(l==null?void 0:l.content)||null}},vm=(S,R,H)=>{var Qc,Gc,Kc,Xc,Jc;const I=S.available&&S.totalSources||0,F=R.available&&R.totalPapers||0,N=H.available&&H.modelCount||0,$=ap(S.sources||[]),ge=ap(R.sources||[]),We=((Qc=H.providers)==null?void 0:Qc.map(wr=>({success:!0,content:wr.content,provider_name:wr.name})))||[],qe=mv(We),ve=((Gc=H.providers)==null?void 0:Gc.map(wr=>wr.content).join(`

`))||"",Q=Iv(ve),Jt=$.topTier<=2?4:$.topTier<=3?3:I>=2?2:I>=1?1:0,Jn=ge.topTier<=2?4:F>=10?3:F>=5?2:F>=1?1:0,Zn=N>=4?3:N>=3?2:N>=1?1:0,ht=[S.available,R.available,H.available].filter(Boolean).length,ye=ht>=3?3:ht>=2?2:ht>=1?1:0;let Ne="D";const we=$.tierCounts[1]>0,xe=ge.tierCounts[2]>0,nt=F>=10,fn=F>=3,is=$.weightedScore+ge.weightedScore,De=Q.studyDesign.hasRCT,Ke=Q.systematicReview.hasMeta||Q.systematicReview.hasSystematicReview,Y=Q.sampleSize.hasLargeSample,Xe=Q.replication.status==="replicated";(Ke||De)&&we&&xe||we&&xe&&F>=10?Ne="A":De&&(we||$.topTier<=2)||(we||$.topTier<=2)&&nt||(Y||Xe)&&fn?Ne="B":(I>=1||fn||is>=8||Q.depthScore>=30)&&(Ne="C");let pe="III";ht>=3&&($.topTier<=2||F>=5)?pe="I":ht>=2&&(I>=1||F>=3)&&(pe="II");let te=40;we?te+=15+Math.min(10,$.tierCounts[1]*3):$.topTier<=3?te+=10+Math.min(5,I*2):I>=1&&(te+=5),xe?te+=10+Math.min(10,F):F>=10?te+=12:F>=5?te+=7:F>=1&&(te+=3);const Vt=Math.round(qe.hedgingLevel*10),ri=N>=4?8:N>=3?5:N>=2?3:0,Nm=Math.max(0,ri-Vt);te+=Nm,ht>=3?te+=10:ht>=2&&(te+=5),qe.hasContradictions&&(te-=5),Ke?te+=8:De?te+=5:Q.studyDesign.highestLevel<=4&&(te+=2),Xe?te+=5:Q.replication.status==="preliminary"&&(te-=3),Q.sampleSize.hasVeryLargeSample?te+=4:Y&&(te+=2),Q.duration.hasVeryLongTerm?te+=3:Q.duration.hasLongTerm&&(te+=1),Q.recency.recencyCategory==="dated"?te-=3:Q.recency.recencyCategory==="current"&&(te+=2),te=Math.min(95,Math.max(35,te));const Em=[S.available&&"Guidelines",R.available&&"Literature",H.available&&"AI"].filter(Boolean);return{profile:{quality:Ne,retrieval:pe,agreement:te},sources:{guidelines:{strength:Jt,count:I,orgs:S.organizations||[],credibility:$},literature:{strength:Jn,count:F,topCitations:((Xc=(Kc=R.topCited)==null?void 0:Kc[0])==null?void 0:Xc.citations)||0,credibility:ge},ai:{strength:Zn,count:N,models:((Jc=H.providers)==null?void 0:Jc.map(wr=>wr.name))||[],quality:qe},crossValidation:{strength:ye,sources:Em}},credibilityProfile:{guidelinesTier:$.topTier,literatureTier:ge.topTier,totalWeight:$.weightedScore+ge.weightedScore,aiHedging:qe.hedgingLevel,aiConfidence:qe.modelConfidence,hasContradictions:qe.hasContradictions},evidenceDepth:{depthScore:Q.depthScore,depthCategory:Q.depthCategory,studyDesign:{highestLevel:Q.studyDesign.highestLevel,hasRCT:De,hasSystematicReview:Ke,designs:Q.studyDesign.designs.slice(0,3)},sampleSize:{largest:Q.sampleSize.largest,category:Q.sampleSize.sampleCategory,hasLarge:Y},duration:{longestMonths:Q.duration.longestMonths,category:Q.duration.durationCategory,hasLongTerm:Q.duration.hasLongTerm},effectSize:{category:Q.effectSize.category,hasQuantified:Q.effectSize.hasQuantified},geography:{regions:Q.geography.regions,isMultinational:Q.geography.isMultinational,category:Q.geography.diversityCategory},funding:{category:Q.funding.category,independenceScore:Q.funding.independenceScore},recency:{mostRecent:Q.recency.mostRecent,category:Q.recency.recencyCategory},replication:{status:Q.replication.status,score:Q.replication.score},endpoints:{category:Q.endpoints.category,hasHard:Q.endpoints.hasHard}},total:te,score:te,level:Ne==="A"?"high":Ne==="B"?"moderate":"limited",factors:[I>0&&`Official guidelines (${I} sources${we?", incl. Tier 1":""})`,F>0&&`Research literature (${F} papers${xe?", incl. peer-reviewed":""})`,N>0&&`AI consensus (${N} models${qe.hedgingLevel>.3?", high uncertainty":""})`,ht>=2&&"Cross-validated",qe.hasContradictions&&"Contains contradictions",Ke&&"Systematic review/meta-analysis",De&&!Ke&&"RCT evidence cited",Y&&`Large sample (n=${Q.sampleSize.largest.toLocaleString()})`,Q.duration.hasVeryLongTerm&&`Long-term follow-up (${Q.duration.durationCategory})`,Xe&&"Replicated findings",Q.replication.status==="preliminary"&&"Preliminary evidence",Q.geography.isMultinational&&"Multi-national research",Q.funding.category==="independent"&&"Independently funded",Q.recency.category==="dated"&&"Some dated sources"].filter(Boolean)}},Wc=S=>{if(!S||typeof S!="string")return{sections:{},fullText:"",hasStructuredSections:!1};const R={},H=S.split(`
`);let I=null,F=[];const N=["CONSENSUS","OFFICIAL GUIDANCE","SCIENTIFIC EVIDENCE","AI MODEL PERSPECTIVES","DISCORDANCE","BOTTOM LINE"];for(let $=0;$<H.length;$++){const ge=H[$],We=ge.match(/^##\s+(.+)$/);if(We){const qe=We[1].trim().toUpperCase();I&&F.length>0&&(R[I]=F.join(`
`).trim()),I=N.find(Q=>qe.includes(Q)||Q.includes(qe))||qe,F=[]}else I?F.push(ge):(R.PREAMBLE||(R.PREAMBLE=""),R.PREAMBLE+=ge+`
`)}return I&&F.length>0&&(R[I]=F.join(`
`).trim()),Object.keys(R).forEach($=>{(!R[$]||R[$].trim()==="")&&delete R[$]}),{sections:R,fullText:S,hasStructuredSections:Object.keys(R).length>1}},wm=()=>{var Jn,Zn,ht,ye,Ne,we,xe,nt,fn,is;const S=Vc();if(!S)return null;let R=[];const H=S.aiConsensus.synthesisContent||"",I=Wc(H),F=H.split(`

`).filter(De=>De.trim()),N=((Jn=S.guidelines)==null?void 0:Jn.totalSources)||0,$=((Zn=S.literature)==null?void 0:Zn.totalPapers)||0,ge=((ht=S.aiConsensus)==null?void 0:ht.modelCount)||0,We=S.guidelines.available?[...new Set(((ye=S.guidelines.sources)==null?void 0:ye.map(De=>yr(De.url)))||[])]:[];if(S.aiConsensus.available&&(F.length>0||I.hasStructuredSections)){let De="";if(N>0||$>0){De="*This summary is based on ";const Xe=[];N>0&&Xe.push(`official health guidelines from ${We.slice(0,2).join(" and ")}`),$>0&&Xe.push(`${$} scientific studies`),Xe.push(`${ge} medical AI systems`),De+=Xe.join(", ")+`.*

`}let Ke="",Y="";if(I.hasStructuredSections){Ke=De,I.sections.CONSENSUS&&(Ke+=`### What Sources Report

`+I.sections.CONSENSUS+`

`);const Xe=I.sections["BOTTOM LINE"]||"",pe=Xe.match(/###\s*For Patients\s*([\s\S]*?)(?=###|$)/i);pe&&(Ke+=`### What This Means For You

`+pe[1].trim()+`

`);const te=Xe.match(/###\s*Important Caveats\s*([\s\S]*?)(?=###|$)/i);if(te&&(Ke+="*"+te[1].trim().split(`
`)[0]+`*

`),Ke+='*Click "More" for official guidance, research details, and source citations...*',Y=De,I.sections.CONSENSUS&&(Y+=`### Areas of Agreement

`+I.sections.CONSENSUS+`

`),I.sections["OFFICIAL GUIDANCE"]&&(Y+=`---

### Official Health Guidance

`+I.sections["OFFICIAL GUIDANCE"]+`

`),I.sections["SCIENTIFIC EVIDENCE"]&&(Y+=`---

### Scientific Evidence

`+I.sections["SCIENTIFIC EVIDENCE"]+`

`),I.sections["AI MODEL PERSPECTIVES"]&&(Y+=`---

### AI Model Perspectives

`+I.sections["AI MODEL PERSPECTIVES"]+`

`),I.sections.DISCORDANCE&&!I.sections.DISCORDANCE.toLowerCase().includes("no significant discordance")&&(Y+=`---

### Areas of Disagreement

`+I.sections.DISCORDANCE+`

`),I.sections["BOTTOM LINE"]&&(Y+=`---

### Summary

`+I.sections["BOTTOM LINE"]+`

`),S.confidence){Y+=`---

### Evidence Quality

`;const Vt=S.confidence;Y+=`- **Grade:** ${Vt.quality||"D"} `,Vt.quality==="A"?Y+=`(High quality)
`:Vt.quality==="B"?Y+=`(Good quality)
`:Vt.quality==="C"?Y+=`(Moderate)
`:Y+=`(Limited)
`,Y+=`- **Sources:** ${N} guidelines, ${$} papers, ${ge} AI systems
`}}else{const Xe=F.slice(0,2).map(pe=>`- ${pe.split(/[.!?](?:\s|$)/)[0].trim()}`).join(`
`);if(Ke=De+Xe+`

*Click "More" for detailed analysis including individual AI perspectives and evidence sources...*`,Y=De+`### Summary

`+F.join(`

`),S.aiConsensus.providers&&S.aiConsensus.providers.length>0&&(Y+=`

---

### What Individual AI Systems Said

`,S.aiConsensus.providers.forEach(pe=>{const Vt=(pe.content||"").split(/[.!?](?:\s|$)/).filter(ri=>ri.trim()).slice(0,4);Vt.length>0&&(Y+=`**${pe.name}** (${pe.model||"unknown model"}):
`,Y+=Vt.map(ri=>`> ${ri.trim()}`).join(". ")+`.

`)})),S.guidelines.available&&((Ne=S.guidelines.keyPoints)==null?void 0:Ne.length)>0&&(Y+=`
---

### Evidence from Official Guidelines

`,S.guidelines.keyPoints.slice(0,3).forEach(pe=>{pe.text&&(Y+=`**${pe.source}:**
> "${pe.text.slice(0,300)}${pe.text.length>300?"...":""}"

`)})),S.literature.available&&((we=S.literature.researchFindings)==null?void 0:we.length)>0&&(Y+=`
---

### Research Findings

`,S.literature.researchFindings.slice(0,3).forEach(pe=>{var te;if(pe.text){const Vt=pe.citations>0?` *(${pe.citations} citations)*`:"";Y+=`**${((te=pe.title)==null?void 0:te.slice(0,60))||"Study"}**${Vt}:
> "${pe.text.slice(0,250)}${pe.text.length>250?"...":""}"

`}})),S.confidence){Y+=`
---

### Evidence Quality Assessment

`;const pe=S.confidence;if(Y+=`- **Evidence Grade:** ${pe.quality||"D"} `,pe.quality==="A"?Y+=`(High quality - systematic reviews/RCTs with official guidelines)
`:pe.quality==="B"?Y+=`(Good quality - solid evidence with some limitations)
`:pe.quality==="C"?Y+=`(Moderate - some evidence but not robust)
`:Y+=`(Limited - primarily AI consensus without strong independent evidence)
`,Y+=`- **Sources Reviewed:** ${N} official guidelines, ${$} research papers, ${ge} AI systems
`,pe.evidenceDepth){const te=pe.evidenceDepth;(xe=te.studyDesign)!=null&&xe.hasRCT&&(Y+=`- **Study Design:** Includes randomized controlled trial evidence
`),(nt=te.systematicReview)!=null&&nt.hasMeta&&(Y+=`- **Meta-Analysis:** Systematic review with meta-analysis available
`),(fn=te.sampleSize)!=null&&fn.hasLargeSample&&(Y+=`- **Sample Size:** Large-scale studies (1000+ participants) referenced
`),((is=te.replication)==null?void 0:is.status)==="replicated"&&(Y+=`- **Replication:** Findings have been replicated across studies
`)}}}R.push({type:"synthesis",icon:"💡",title:"What You Should Know",briefContent:Ke,detailedContent:Y,content:Y,modelCount:ge,isPrimary:!0,hasExpandedContent:!0})}let qe="**Important:** Always consult your healthcare provider for personalized advice.",ve="";(N>=2||$>=2)&&(ve+=`**The evidence agrees on:**
`,ve+=`- Multiple sources have been reviewed and synthesized above
`,N>=2&&(ve+=`- Official guidance is available from ${We.slice(0,3).join(", ")}
`),$>=3&&(ve+=`- Scientific research supports these recommendations
`)),ve+=`
**Important notes:**
`,ve+=`- This is for educational purposes - always consult your healthcare provider
`,ve+=`- Individual circumstances may vary
`,ve+=`- New research may update current recommendations
`,ve+=`- Consider discussing multiple treatment options with your doctor
`,R.push({type:"takeaways",icon:"✅",title:"Key Points",briefContent:qe,detailedContent:ve,content:ve});const Q=[],Jt=[];if(S.guidelines.available&&S.guidelines.sources){const De=S.guidelines.sources.slice(0,3).map(Y=>`- [${Y.title}](${Y.url}) *(${yr(Y.url)})*`).join(`
`);Q.push(`**Official Guidelines:**
${De}`);const Ke=S.guidelines.sources.slice(0,8).map(Y=>`- [${Y.title}](${Y.url}) *(${yr(Y.url)})*`).join(`
`);Jt.push(`**Official Guidelines:**
${Ke}`)}if(S.literature.available&&S.literature.sources){const De=S.literature.sources.slice(0,3).map(Y=>{const Xe=Y.cited_by>0?` *(${Y.cited_by} citations)*`:"";return`- [${Y.title}](${Y.url})${Xe}`}).join(`
`);Q.push(`**Research:**
${De}`);const Ke=S.literature.sources.slice(0,8).map(Y=>{const Xe=Y.cited_by>0?` *(${Y.cited_by} citations)*`:"";return`- [${Y.title}](${Y.url})${Xe}`}).join(`
`);Jt.push(`**Research:**
${Ke}`)}return(Q.length>0||Jt.length>0)&&R.push({type:"sources",icon:"📚",title:"Sources",briefContent:Q.join(`

`)+`

*Show more for complete source list...*`,detailedContent:Jt.join(`

`),content:Jt.join(`

`),isSecondary:!0}),{headline:e,sections:R,confidence:S.confidence}},km=()=>{var Q,Jt,Jn,Zn,ht;const S=Vc();if(!S)return null;let R=[];const H=S.aiConsensus.synthesisContent||"",I=Wc(H);let F=1;const N=[];S.guidelines.available&&S.guidelines.sources&&S.guidelines.sources.slice(0,10).forEach(ye=>{N.push({num:F++,title:ye.title,source:yr(ye.url),url:ye.url,type:"guideline"})}),S.literature.available&&S.literature.sources&&S.literature.sources.slice(0,10).forEach(ye=>{N.push({num:F++,title:ye.title,source:ye.publication_info||"Peer-reviewed",url:ye.url,citations:ye.cited_by||0,type:"literature"})});const $=((Q=S.guidelines)==null?void 0:Q.totalSources)||0,ge=((Jt=S.literature)==null?void 0:Jt.totalPapers)||0,We=((Jn=S.aiConsensus)==null?void 0:Jn.modelCount)||0,qe=S.guidelines.available?[...new Set(((Zn=S.guidelines.sources)==null?void 0:Zn.map(ye=>yr(ye.url)))||[])]:[];if(S.aiConsensus.available&&(H||I.hasStructuredSections)){let ye=`### Integrated Evidence Summary

`;if($>0||ge>0){if(ye+=`This synthesis integrates:
`,$>0&&(ye+=`- **${$} official guidelines** from ${qe.slice(0,4).join(", ")}
`),ge>0){const xe=((ht=S.literature.sources)==null?void 0:ht.reduce((nt,fn)=>nt+(fn.cited_by||0),0))||0;ye+=`- **${ge} peer-reviewed studies**${xe>0?` (${xe} total citations)`:""}
`}ye+=`- **${We} AI models** (${S.aiConsensus.providers.map(xe=>xe.name).join(", ")})

`}let Ne="",we="";if(I.hasStructuredSections){Ne=ye,I.sections.CONSENSUS&&(Ne+=`**Consensus:**

`+I.sections.CONSENSUS+`

`);const nt=(I.sections["BOTTOM LINE"]||"").match(/###\s*For Clinicians\s*([\s\S]*?)(?=###|$)/i);nt&&(Ne+=`**Clinical Implications:**

`+nt[1].trim()+`

`),Ne+='*Click "More" for official guidance, evidence details, and full analysis...*',we=ye,I.sections.CONSENSUS&&(we+=`**Consensus:**

`+I.sections.CONSENSUS+`

`),I.sections["OFFICIAL GUIDANCE"]&&(we+=`---

### Official Clinical Guidelines

`+I.sections["OFFICIAL GUIDANCE"]+`

`),I.sections["SCIENTIFIC EVIDENCE"]&&(we+=`---

### Evidence Base

`+I.sections["SCIENTIFIC EVIDENCE"]+`

`),I.sections["AI MODEL PERSPECTIVES"]&&(we+=`---

### AI Model Perspectives

`+I.sections["AI MODEL PERSPECTIVES"]+`

`),I.sections.DISCORDANCE&&!I.sections.DISCORDANCE.toLowerCase().includes("no significant discordance")&&(we+=`---

### Points of Discordance

`+I.sections.DISCORDANCE+`

`),I.sections["BOTTOM LINE"]&&(we+=`---

### Bottom Line

`+I.sections["BOTTOM LINE"]+`

`)}else{Ne=ye;const xe=H.split(/[.!?](?:\s|$)/).filter(nt=>nt.trim()&&!nt.startsWith("##")).slice(0,4);Ne+=xe.join(". ")+`.

`,Ne+='*Click "More" for detailed analysis...*',we=ye+H}R.push({type:"synthesis",title:"Evidence Synthesis",subtitle:"Unified summary from authorities, research, and AI",briefContent:Ne,detailedContent:we,content:we,modelCount:We,isPrimary:!0})}let ve="";if(ve+=`### Areas of Agreement

`,$>=2&&ge>=2&&(ve+=`- **Cross-validated findings**: Both official guidelines (${$}) and peer-reviewed research (${ge}) address this topic, suggesting established evidence
`),We>=3&&(ve+=`- **AI consensus**: ${We} independent AI models analyzed this question and contributed to the synthesis
`),qe.length>=2&&(ve+=`- **Multi-authority support**: Guidance from multiple organizations (${qe.slice(0,3).join(", ")})
`),$===0&&ge===0&&(ve+=`- Limited external evidence available; synthesis primarily reflects AI analysis
`),ve+=`
### Potential Limitations

`,$<3&&(ve+=`- Limited official guideline coverage (${$} sources)
`),ge<5&&(ve+=`- Research base may benefit from additional literature review
`),ve+=`- Guidelines may vary by region; verify against local protocols
`,ve+=`- Evidence should be evaluated in individual clinical context
`,R.push({type:"consensus",title:"Agreement & Limitations",content:ve}),N.length>0){const ye=N.filter(xe=>xe.type==="guideline"),Ne=N.filter(xe=>xe.type==="literature");let we="";ye.length>0&&(we+=`**Official Guidelines:**

`,we+=ye.map((xe,nt)=>`${nt+1}. [${xe.title}](${xe.url}) — *${xe.source}*`).join(`

`)+`

`),Ne.length>0&&(we+=`**Peer-Reviewed Literature:**

`,we+=Ne.map((xe,nt)=>{const fn=xe.citations>0?` *(${xe.citations} citations)*`:"";return`${nt+1}. [${xe.title}](${xe.url})${fn}`}).join(`

`)),R.push({type:"references",title:"References",subtitle:`${N.length} sources`,content:we,isSecondary:!0})}return{headline:e,sections:R,confidence:S.confidence,allRefs:N}},jm=()=>{var R,H;const S=[];return(R=c==null?void 0:c.guidelines)!=null&&R.links&&c.guidelines.links.forEach((I,F)=>{S.push({...I,type:"guideline",id:`guideline-${F}`})}),(H=c==null?void 0:c.literature)!=null&&H.links&&c.literature.links.forEach((I,F)=>{S.push({...I,type:"literature",id:`literature-${F}`})}),S},Sm=()=>{var R;const S=[];return(R=c==null?void 0:c.guidelines)!=null&&R.links&&c.guidelines.links.forEach(H=>{var I,F,N,$;((I=H.snippet)!=null&&I.includes("image")||(F=H.snippet)!=null&&F.includes("video")||(N=H.snippet)!=null&&N.includes("infographic")||($=H.snippet)!=null&&$.includes("chart"))&&S.push({type:"reference",title:H.title,url:H.url,source:"Official Guidelines"})}),S},Cm=Ce.app_mode==="chorus",br=wm(),vr=km(),Do=jm(),qc=Sm();if(Cm){const S=l||i.length>0,R=D&&ae.length>0,H=n||U||R,I=e.trim().length>0&&!H&&!S;let F="initial";return S?F="results":H?F="searching":I&&(F="typing"),o.jsxs("div",{className:`chorus-unified chorus-${F}`,onDragOver:he,onDragLeave:Ct,onDrop:dn,children:[o.jsxs("div",{className:"chorus-bg-container",children:[o.jsx("img",{src:"/images/login-bg.jpg",alt:"",className:"chorus-bg-image"}),o.jsx("div",{className:"chorus-bg-overlay"})]}),o.jsxs("div",{className:"chorus-content-wrapper",children:[o.jsxs("header",{className:"chorus-hero",children:[o.jsx("div",{className:"chorus-logo-area",children:o.jsx(Tv,{size:F==="initial"?120:48,withText:!0})}),o.jsx("h1",{className:"chorus-headline",children:"Where AI Meets Verified Knowledge"}),o.jsx("p",{className:"chorus-tagline",children:"Ask any question. Get answers synthesized from multiple AI models, cross-referenced with research, news, patents, and authoritative sources."})]}),o.jsxs("section",{className:"chorus-search-section",children:[o.jsxs("form",{onSubmit:Nt,className:"chorus-search-form",children:[o.jsxs("div",{className:`chorus-search-box ${Cn?"dragging":""}`,children:[o.jsx("textarea",{value:e,onChange:N=>t(N.target.value),onKeyDown:N=>{N.key==="Enter"&&!N.shiftKey&&(N.preventDefault(),Nt(N))},placeholder:"Ask any question, or drop in a file...",className:"chorus-search-input",rows:2}),o.jsx("button",{type:"submit",disabled:n||U||!e.trim(),className:"chorus-search-btn",children:n||U?o.jsx("span",{className:"chorus-btn-loading",children:o.jsx("span",{className:"chorus-spinner"})}):o.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"11",cy:"11",r:"8"}),o.jsx("path",{d:"m21 21-4.35-4.35"})]})})]}),($e.length>0||Gn)&&o.jsxs("div",{className:"chorus-attached-files",children:[Gn&&o.jsxs("span",{className:"chorus-file-chip uploading",children:[o.jsx("span",{className:"chorus-spinner-small"}),"Uploading..."]}),$e.map(N=>o.jsxs("span",{className:"chorus-file-chip",title:`${N.extracted_chars} characters extracted`,children:[o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.jsx("polyline",{points:"14 2 14 8 20 8"})]}),N.filename.length>20?N.filename.slice(0,17)+"...":N.filename,o.jsx("button",{type:"button",className:"chorus-file-remove",onClick:()=>ne(N.file_id),"aria-label":"Remove file",children:o.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),o.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]},N.file_id))]})]}),o.jsxs("div",{className:"chorus-sample-questions",children:[o.jsx("span",{className:"sample-label",children:"Try asking:"}),o.jsx("div",{className:"sample-list",children:Hc.map((N,$)=>o.jsx("button",{onClick:()=>t(N),className:"sample-btn",children:N},$))})]}),o.jsxs("div",{className:"chorus-trust-row",children:[o.jsxs("div",{className:"trust-item",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),o.jsx("span",{children:"Evidence-Based"})]}),o.jsxs("div",{className:"trust-item",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("polyline",{points:"12 6 12 12 16 14"})]}),o.jsx("span",{children:"Real-Time"})]}),o.jsxs("div",{className:"trust-item",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),o.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),o.jsx("span",{children:"Multi-AI"})]})]}),o.jsxs("div",{className:"chorus-providers-row",children:[o.jsx("span",{className:"providers-label",children:"Synthesizing from:"}),d.map(N=>o.jsx("span",{className:"provider-chip",style:{borderColor:rr[N.charAt(0).toUpperCase()+N.slice(1)]||"#64748b"},children:N},N)),o.jsx("span",{className:"provider-chip evidence-chip",children:"+ Evidence"})]})]}),o.jsxs("main",{className:"chorus-results-area",children:[h&&o.jsxs("div",{className:"chorus-error glass-card animate-fade-in",children:[o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),o.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),h]}),U&&o.jsxs("div",{className:"chorus-clarifying glass-card animate-fade-in",children:[o.jsxs("div",{className:"chorus-loading-animation",children:[o.jsx("div",{className:"chorus-loading-wave"}),o.jsx("div",{className:"chorus-loading-wave"}),o.jsx("div",{className:"chorus-loading-wave"})]}),o.jsx("h3",{children:"Analyzing Your Question"}),o.jsx("p",{children:"Checking if we can help refine your query for better results..."})]}),D&&ae.length>0&&o.jsxs("div",{ref:be,className:"chorus-clarification glass-card animate-fade-in",children:[o.jsxs("div",{className:"clarification-header",children:[o.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),o.jsxs("div",{children:[o.jsx("h3",{children:"Let's Refine Your Question"}),o.jsx("p",{className:"clarification-explanation",children:"A few quick questions to help get you better results"})]})]}),o.jsxs("div",{className:"clarify-conversation",children:[ae.map((N,$)=>o.jsx("div",{className:`clarify-message ${N.role}`,children:N.role==="ai"?o.jsxs("div",{className:"clarify-ai-message",children:[o.jsx("span",{className:"clarify-avatar",children:o.jsx(up,{size:20,animated:!1})}),o.jsx("span",{className:"clarify-text",children:N.text})]}):o.jsx("div",{className:"clarify-user-message",children:o.jsx("span",{className:"clarify-text",children:N.text})})},$)),U&&o.jsx("div",{className:"clarify-message ai",children:o.jsxs("div",{className:"clarify-ai-message",children:[o.jsx("span",{className:"clarify-avatar",children:o.jsx(up,{size:20,animated:!0})}),o.jsxs("span",{className:"clarify-typing",children:[o.jsx("span",{}),o.jsx("span",{}),o.jsx("span",{})]})]})})]}),!U&&!y&&((Yc=D.quickOptions)==null?void 0:Yc.length)>0&&o.jsx("div",{className:"clarify-quick-options",children:D.quickOptions.map((N,$)=>o.jsx("button",{className:"clarify-quick-btn",onClick:()=>pn(N),children:N},$))}),!U&&!y&&o.jsxs("div",{className:"clarify-input-row",children:[o.jsx("input",{type:"text",value:L,onChange:N=>q(N.target.value),onKeyDown:N=>N.key==="Enter"&&pn(L),placeholder:"Type your answer...",className:"clarify-input"}),o.jsx("button",{className:"clarify-send-btn",onClick:()=>pn(L),disabled:!L.trim(),children:o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),o.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})})]}),y&&o.jsx("div",{className:"clarify-ready",children:o.jsxs("div",{className:"clarify-refined-preview",children:[o.jsx("span",{className:"clarify-refined-label",children:"Ready to search:"}),o.jsx("span",{className:"clarify-refined-text",children:D.refinedQuestion})]})}),o.jsxs("div",{className:"clarification-actions",children:[o.jsx("button",{className:"clarification-skip",onClick:Nn,children:"Skip & search original"}),(y||ae.length>=2)&&o.jsx("button",{className:"clarification-search",onClick:ct,children:y?"Search Now":"Search with refinement"})]})]}),n&&o.jsxs("div",{className:"chorus-loading glass-card animate-fade-in",children:[o.jsxs("div",{className:"chorus-loading-animation",children:[o.jsx("div",{className:"chorus-loading-wave"}),o.jsx("div",{className:"chorus-loading-wave"}),o.jsx("div",{className:"chorus-loading-wave"})]}),o.jsx("h3",{children:"Gathering Evidence"}),o.jsxs("p",{children:["Querying ",d.length," AI models and searching authoritative sources..."]}),o.jsxs("div",{className:"chorus-loading-steps",children:[o.jsx("span",{className:"loading-step active",children:"Searching Research & News"}),o.jsx("span",{className:"loading-step active",children:"Querying AI Models"}),o.jsx("span",{className:"loading-step",children:"Synthesizing Results"})]})]}),l&&o.jsxs("div",{ref:un,className:"chorus-results animate-slide-up",children:[o.jsxs("section",{className:"chorus-summaries",children:[o.jsxs("div",{className:"chorus-summary-tabs",children:[o.jsxs("button",{className:`summary-tab ${m==="patient"?"active":""}`,onClick:()=>x("patient"),children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),"For Patients"]}),o.jsxs("button",{className:`summary-tab ${m==="clinician"?"active":""}`,onClick:()=>x("clinician"),children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})}),"For Clinicians"]})]}),m==="patient"&&br&&o.jsxs("div",{className:"chorus-summary-card glass-card patient-summary animate-fade-in",children:[o.jsxs("div",{className:"summary-header",children:[o.jsx("div",{className:"summary-icon patient-icon",children:o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"12",cy:"7",r:"4"})]})}),o.jsxs("div",{children:[o.jsx("h3",{children:"Simple Summary"}),o.jsx("span",{className:"summary-subtitle",children:"Easy to understand"})]}),br.confidence&&o.jsxs("div",{className:"evidence-header-group",children:[o.jsx(Cs,{confidence:br.confidence,compact:!0}),o.jsx("button",{type:"button",className:"evidence-info-btn",onClick:N=>{N.stopPropagation(),N.preventDefault(),v(!0)},title:"What does this mean?",children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("path",{d:"M12 16v-4"}),o.jsx("path",{d:"M12 8h.01"})]})})]}),o.jsx("button",{className:"summary-depth-toggle",onClick:()=>Re(!oe),title:oe?"Show brief summary":"Show detailed summary",children:oe?o.jsxs(o.Fragment,{children:[o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M19 12H5"}),o.jsx("path",{d:"M12 19l-7-7 7-7"})]}),"Brief"]}):o.jsxs(o.Fragment,{children:["More",o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M5 12h14"}),o.jsx("path",{d:"M12 5l7 7-7 7"})]})]})})]}),o.jsxs("div",{className:"summary-content",children:[br.sections.map((N,$)=>o.jsxs("div",{className:`summary-section section-${N.type}`,children:[o.jsxs("div",{className:"section-header-inline",children:[o.jsx("span",{className:"section-icon",children:N.icon}),o.jsx("h4",{children:N.title}),N.sourceCount&&o.jsxs("span",{className:"source-count-badge",children:[N.sourceCount," sources"]}),N.modelCount&&o.jsxs("span",{className:"source-count-badge",children:[N.modelCount," AI models"]})]}),o.jsx("div",{className:"section-content",children:o.jsx(ln,{components:{a:({node:ge,...We})=>o.jsx("a",{...We,target:"_blank",rel:"noopener noreferrer",className:"evidence-link"})},children:oe?N.detailedContent||N.content:N.briefContent||N.content})})]},$)),br.confidence&&o.jsx(Cs,{confidence:br.confidence}),Le&&o.jsx(uv,{analysis:Le,showAuditLog:!1})]})]}),m==="clinician"&&vr&&o.jsxs("div",{className:"chorus-summary-card glass-card clinician-summary animate-fade-in",children:[o.jsxs("div",{className:"summary-header",children:[o.jsx("div",{className:"summary-icon clinician-icon",children:o.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})})}),o.jsxs("div",{children:[o.jsx("h3",{children:"Clinical Summary"}),o.jsx("span",{className:"summary-subtitle",children:"For healthcare professionals"})]}),vr.confidence&&o.jsxs("div",{className:"evidence-header-group",children:[o.jsx(Cs,{confidence:vr.confidence,compact:!0}),o.jsx("button",{type:"button",className:"evidence-info-btn",onClick:N=>{N.stopPropagation(),N.preventDefault(),v(!0)},title:"What does this mean?",children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("path",{d:"M12 16v-4"}),o.jsx("path",{d:"M12 8h.01"})]})})]}),o.jsx("button",{className:"summary-depth-toggle clinician-toggle",onClick:()=>Re(!oe),title:oe?"Show brief summary":"Show detailed summary",children:oe?o.jsxs(o.Fragment,{children:[o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M19 12H5"}),o.jsx("path",{d:"M12 19l-7-7 7-7"})]}),"Brief"]}):o.jsxs(o.Fragment,{children:["More",o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M5 12h14"}),o.jsx("path",{d:"M12 5l7 7-7 7"})]})]})})]}),o.jsxs("div",{className:"summary-content clinician-content",children:[vr.sections.map((N,$)=>o.jsxs("div",{className:`clinician-section section-${N.type}`,children:[o.jsxs("div",{className:"clinician-section-header",children:[o.jsxs("div",{className:"section-title-group",children:[o.jsx("h4",{children:N.title}),N.subtitle&&o.jsx("span",{className:"section-subtitle",children:N.subtitle})]}),N.models&&o.jsx("div",{className:"model-badges",children:N.models.map((ge,We)=>o.jsx("span",{className:"model-badge",style:{backgroundColor:rr[ge]||"#64748b"},children:ge},We))}),N.sourceCount&&o.jsxs("span",{className:"section-source-count",children:[N.sourceCount," sources"]})]}),o.jsx("div",{className:"clinician-section-content",children:o.jsx(ln,{components:{a:({node:ge,...We})=>o.jsx("a",{...We,target:"_blank",rel:"noopener noreferrer",className:"evidence-link"})},children:oe?N.detailedContent||N.content:N.briefContent||N.content})})]},$)),vr.confidence&&o.jsx(Cs,{confidence:vr.confidence})]})]})]}),c&&o.jsxs("section",{className:"chorus-evidence-section animate-slide-up",style:{animationDelay:"0.1s"},children:[o.jsxs("h2",{className:"section-heading",children:[o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),o.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]}),"Evidence Sources"]}),o.jsxs("div",{className:"evidence-cards-grid",children:[c.guidelines&&c.guidelines.count>0&&o.jsx(gi,{title:"Official Guidelines",subtitle:"CDC, WHO, FDA, NIH & Medical Societies",icon:"🏛️",color:"#14b8a6",data:c.guidelines,type:"guidelines"}),c.research&&c.research.count>0&&o.jsx(gi,{title:"Scientific Literature",subtitle:"Peer-reviewed research from Google Scholar",icon:"🔬",color:"#0ea5e9",data:c.research,type:"literature"}),c.news&&c.news.count>0&&o.jsx(gi,{title:"Health & Science News",subtitle:"Recent credible reporting from trusted sources",icon:"📰",color:"#8b5cf6",data:c.news,type:"news"}),c.patents&&c.patents.count>0&&o.jsx(gi,{title:"Patents",subtitle:"Emerging technologies from USPTO",icon:"💡",color:"#f59e0b",data:c.patents,type:"patents"}),c.reference&&c.reference.count>0&&o.jsx(gi,{title:"Background & Context",subtitle:"Wikipedia, MedlinePlus, textbooks & encyclopedias",icon:"📚",color:"#6366f1",data:c.reference,type:"reference"}),c.media&&c.media.count>0&&o.jsx(Lv,{data:c.media})]})]}),i.length>0&&o.jsxs("section",{className:"chorus-ai-section animate-slide-up",style:{animationDelay:"0.2s"},children:[o.jsxs("div",{className:"section-heading-row",children:[o.jsxs("h2",{className:"section-heading",children:[o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),o.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"9"}),o.jsx("line",{x1:"9",y1:"15",x2:"15",y2:"15"})]}),"AI Perspectives"]}),o.jsxs("button",{className:"toggle-ai-btn",onClick:()=>j(!b),children:[b?"Hide Details":`View All ${i.length} Responses`,o.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",style:{transform:b?"rotate(180deg)":"none"},children:o.jsx("polyline",{points:"6 9 12 15 18 9"})})]})]}),!b&&o.jsxs("div",{className:"ai-summary-bar glass-card",children:[o.jsxs("div",{className:"ai-summary-text",children:[o.jsxs("span",{className:"ai-count",children:[i.filter(N=>N.success).length," AI models"]})," analyzed this question"]}),o.jsx("div",{className:"ai-provider-dots",children:i.filter(N=>N.success).map((N,$)=>o.jsx("span",{className:"ai-dot",style:{backgroundColor:rr[N.provider_name]||"#64748b"},title:N.provider_name},$))})]}),b&&o.jsx("div",{className:"ai-responses-grid",children:i.map((N,$)=>o.jsx(Dv,{response:N},$))})]}),qc.length>0&&o.jsxs("section",{className:"chorus-media-section animate-slide-up",style:{animationDelay:"0.3s"},children:[o.jsxs("h2",{className:"section-heading",children:[o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),o.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),o.jsx("polyline",{points:"21 15 16 10 5 21"})]}),"Related Media"]}),o.jsx("div",{className:"media-grid",children:qc.map((N,$)=>o.jsxs("a",{href:N.url,target:"_blank",rel:"noopener noreferrer",className:"media-card glass-card",children:[o.jsx("div",{className:"media-placeholder",children:o.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),o.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),o.jsx("polyline",{points:"21 15 16 10 5 21"})]})}),o.jsxs("div",{className:"media-info",children:[o.jsx("span",{className:"media-title",children:N.title}),o.jsx("span",{className:"media-source",children:N.source})]})]},$))})]}),Do.length>0&&o.jsxs("section",{className:"chorus-references-section animate-slide-up",style:{animationDelay:"0.4s"},children:[o.jsxs("h2",{className:"section-heading",children:[o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"})]}),"References (",Do.length,")"]}),o.jsx("div",{className:"references-list glass-card",children:Do.map((N,$)=>o.jsxs("div",{className:"reference-item",children:[o.jsx("span",{className:"reference-number",children:$+1}),o.jsxs("div",{className:"reference-content",children:[o.jsx("a",{href:N.url,target:"_blank",rel:"noopener noreferrer",children:N.title}),N.snippet&&o.jsx("p",{className:"reference-snippet",children:N.snippet}),o.jsxs("div",{className:"reference-meta",children:[o.jsx("span",{className:`reference-type ${N.type}`,children:N.type==="guideline"?"Official Guideline":"Research Article"}),N.cited_by>0&&o.jsxs("span",{className:"reference-citations",children:[o.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21"}),o.jsx("path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3"})]}),N.cited_by," citations"]})]})]})]},N.id))})]})]})]})]}),o.jsxs("div",{className:`speed-dial-container ${St?"open":""}`,children:[o.jsxs("div",{className:`speed-dial-actions ${St?"visible":""}`,children:[o.jsxs("button",{className:"speed-dial-action",onClick:()=>{var N;(N=xr.current)==null||N.click(),Rt(!1)},title:"Upload Document",children:[o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.jsx("polyline",{points:"14 2 14 8 20 8"}),o.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"12"}),o.jsx("line",{x1:"9",y1:"15",x2:"12",y2:"12"}),o.jsx("line",{x1:"15",y1:"15",x2:"12",y2:"12"})]}),o.jsx("span",{className:"speed-dial-label",children:"Upload"})]}),o.jsxs("button",{className:`speed-dial-action ${l?"":"disabled"}`,onClick:()=>{l&&(Rt(!1),Z(!0),setTimeout(()=>{var N;return(N=le.current)==null?void 0:N.focus()},100))},title:l?"Ask Follow-up":"Search first to ask follow-up",disabled:!l,children:[o.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),o.jsx("span",{className:"speed-dial-label",children:"Follow-up"})]}),$e.length>0&&o.jsxs("button",{className:"speed-dial-action danger",onClick:()=>{$e.forEach(N=>ne(N.file_id)),Rt(!1)},title:"Clear Files",children:[o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("polyline",{points:"3 6 5 6 21 6"}),o.jsx("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]}),o.jsx("span",{className:"speed-dial-label",children:"Clear Files"})]})]}),de&&o.jsxs("div",{className:"follow-up-panel glass-card",children:[o.jsxs("div",{className:"follow-up-panel-header",children:[o.jsxs("div",{className:"follow-up-panel-title",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),o.jsx("span",{children:"Ask a follow-up"}),_.length>1&&o.jsxs("span",{className:"conversation-count",children:[_.length," exchanges"]})]}),o.jsx("button",{className:"follow-up-panel-close",onClick:()=>Z(!1),"aria-label":"Close",children:o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),o.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),o.jsxs("form",{onSubmit:N=>{fm(N),Z(!1)},className:"follow-up-panel-form",children:[o.jsx("input",{ref:le,type:"text",value:w,onChange:N=>E(N.target.value),placeholder:"Tell me more about... What about... Can you clarify...",disabled:n,autoFocus:!0}),o.jsx("button",{type:"submit",disabled:!w.trim()||n,className:"follow-up-panel-submit",children:n?o.jsx("span",{className:"spinner-small"}):o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),o.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})})]})]}),o.jsx("button",{className:`speed-dial-fab ${St?"active":""} ${de?"hidden":""}`,onClick:()=>Rt(!St),"aria-label":"Open actions menu",children:St?o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),o.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}):o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707"}),o.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]}),o.jsxs("footer",{className:"chorus-footer",children:[o.jsxs("div",{className:"chorus-footer-content",children:[o.jsx("p",{children:"Chorus synthesizes evidence from multiple AI models and authoritative sources."}),o.jsx("p",{className:"chorus-disclaimer",children:"Always consult with a qualified professional for important decisions."})]}),S&&o.jsxs("button",{className:"chorus-new-search-btn",onClick:()=>{t(""),a(null),s([]),u(null),f(null),B(null),se([])},children:[o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"16"}),o.jsx("line",{x1:"8",y1:"12",x2:"16",y2:"12"})]}),"New Search"]}),o.jsx(op,{})]}),o.jsx("input",{ref:xr,type:"file",multiple:!0,accept:".pdf,.docx,.txt,.xml,.json,.md",onChange:N=>J(Array.from(N.target.files)),style:{display:"none"}})]})}return o.jsxs("div",{className:"prism-app",children:[o.jsxs("div",{className:"prism-bg",children:[o.jsx("div",{className:"prism-orb prism-orb-1"}),o.jsx("div",{className:"prism-orb prism-orb-2"}),o.jsx("div",{className:"prism-orb prism-orb-3"})]}),o.jsxs("header",{className:"prism-header",children:[o.jsxs("div",{className:"prism-brand",children:[o.jsx(Pv,{size:64}),o.jsxs("div",{className:"prism-brand-text",children:[o.jsx("h1",{className:"prism-title",children:Ce.app_name}),o.jsx("p",{className:"prism-tagline",children:Ce.tagline})]})]}),o.jsxs("div",{className:"prism-trust-badges",children:[o.jsxs("span",{className:"trust-badge prism-badge",children:[o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),o.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]}),"Multi-AI Analysis"]}),o.jsxs("span",{className:"trust-badge prism-badge",children:[o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),o.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),"Public Health Ready"]}),o.jsxs("span",{className:"trust-badge prism-badge",children:[o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),o.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),"Messaging Safe"]})]}),o.jsxs("div",{className:"prism-view-toggle",children:[o.jsx("button",{className:`prism-view-btn ${z==="brief"?"active":""}`,onClick:()=>O("brief"),children:"Brief"}),o.jsx("button",{className:`prism-view-btn ${z==="detailed"?"active":""}`,onClick:()=>O("detailed"),children:"Detailed"})]})]}),o.jsxs("main",{className:"prism-main",children:[o.jsxs("div",{className:"prism-input-card",children:[o.jsxs("form",{onSubmit:Nt,className:"prism-form",children:[o.jsxs("label",{className:"prism-label",children:[o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),o.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),"What health question are people asking AI?"]}),o.jsx("textarea",{value:e,onChange:S=>t(S.target.value),placeholder:"Enter a health question the public is asking chatbots...",className:"prism-textarea",rows:2}),o.jsxs("div",{className:"prism-form-footer",children:[o.jsx("div",{className:"prism-provider-pills",children:d.map(S=>o.jsx("span",{className:"prism-provider-pill",style:{borderColor:rr[S.charAt(0).toUpperCase()+S.slice(1)]||"#6b7280",color:rr[S.charAt(0).toUpperCase()+S.slice(1)]||"#6b7280"},children:S},S))}),o.jsx("button",{type:"submit",disabled:n||!e.trim(),className:"prism-submit-btn",children:n?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"prism-btn-spinner"}),"Analyzing..."]}):o.jsxs(o.Fragment,{children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})}),"Analyze AI Responses"]})})]})]}),o.jsxs("div",{className:"prism-examples",children:[o.jsx("span",{className:"prism-examples-label",children:"Quick examples:"}),o.jsx("div",{className:"prism-example-chips",children:Hc.map((S,R)=>o.jsx("button",{onClick:()=>t(S),className:"prism-example-chip",children:S},R))})]})]}),h&&o.jsx("div",{className:"prism-error",children:h}),n&&o.jsxs("div",{className:"prism-loading",children:[o.jsx("div",{className:"prism-spinner"}),o.jsxs("p",{children:["Analyzing ",d.length," AI responses..."]}),o.jsx("span",{className:"prism-loading-sub",children:"Identifying narratives and themes"})]}),z==="detailed"&&i.length>0&&o.jsxs("section",{className:"prism-section",children:[o.jsxs("div",{className:"prism-section-header",children:[o.jsxs("h2",{className:"prism-section-title",children:[o.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M12 2a10 10 0 1 0 10 10H12V2z"}),o.jsx("path",{d:"M12 2a10 10 0 0 1 10 10"}),o.jsx("circle",{cx:"12",cy:"12",r:"6"})]}),"Raw AI Responses"]}),o.jsxs("span",{className:"prism-section-count",children:[i.filter(S=>S.success).length," models"]})]}),o.jsx("div",{className:"prism-responses-grid","data-count":i.length,children:i.map((S,R)=>o.jsx(Mv,{response:S},R))})]}),ni&&o.jsx("section",{className:"prism-section prism-message-section",children:o.jsxs("div",{className:"prism-message-card",children:[o.jsxs("div",{className:"prism-message-header",children:[o.jsxs("div",{className:"prism-message-title-row",children:[o.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),o.jsx("h2",{className:"prism-message-title",children:"Ready-to-Use Public Health Message"})]}),o.jsx("button",{className:"prism-copy-btn",onClick:()=>{const S=ni.content.match(/^\*\*(.+?)\*\*/s)||ni.content.match(/^"(.+?)"/s),R=S?S[1]:ni.content.split(`

`)[0];navigator.clipboard.writeText(R.replace(/\*\*/g,"")),C(!0),setTimeout(()=>C(!1),2e3)},children:k?o.jsxs(o.Fragment,{children:[o.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Copied!"]}):o.jsxs(o.Fragment,{children:[o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),o.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),"Copy Message"]})})]}),o.jsx("div",{className:"prism-message-content",children:o.jsx(ln,{children:ni.content})})]})}),z==="detailed"&&Lo.length>0&&o.jsxs("section",{className:"prism-section",children:[o.jsx("div",{className:"prism-section-header",children:o.jsxs("h2",{className:"prism-section-title",children:[o.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"18",y1:"20",x2:"18",y2:"10"}),o.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),o.jsx("line",{x1:"6",y1:"20",x2:"6",y2:"14"})]}),"Detailed Analysis"]})}),o.jsx("div",{className:"prism-analysis-grid","data-count":Lo.length,children:Lo.map((S,R)=>{const H=Ro(S.title);return o.jsx(Rv,{title:S.title,content:S.content,icon:H.icon,color:H.color},R)})})]})]}),o.jsx("footer",{className:"prism-footer",children:o.jsxs("div",{className:"prism-footer-content",children:[o.jsx("p",{children:"Prism helps public health officials understand and respond to AI-generated health narratives"}),o.jsx(op,{})]})}),Ce.show_study&&o.jsx(Y2,{onClick:()=>g(!0)}),Ce.show_study&&o.jsx(Q2,{isOpen:A,onClose:()=>g(!1),onQuerySubmit:S=>{t(S),setTimeout(()=>{var R;(R=document.querySelector(".prism-submit-btn"))==null||R.click()},100)},setViewMode:O}),re&&o.jsx("div",{className:"evidence-info-modal-overlay",onClick:()=>v(!1),children:o.jsxs("div",{className:"evidence-info-modal",onClick:S=>S.stopPropagation(),children:[o.jsx("button",{className:"modal-close-btn",onClick:()=>v(!1),children:o.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})}),o.jsx("h2",{children:"Understanding Evidence Scores"}),o.jsx("p",{className:"modal-intro",children:"We use a multi-dimensional scoring system based on GRADE (Grading of Recommendations, Assessment, Development and Evaluations) - the same framework used by WHO and Cochrane."}),o.jsxs("div",{className:"evidence-explainer",children:[o.jsxs("div",{className:"explainer-section",children:[o.jsx("h3",{children:"Evidence Quality (A-D)"}),o.jsx("p",{children:"How strong is the underlying evidence?"}),o.jsxs("div",{className:"grade-list",children:[o.jsxs("div",{className:"grade-item",children:[o.jsx("span",{className:"grade-letter grade-a",children:"A"}),o.jsxs("div",{children:[o.jsx("strong",{children:"High Quality"}),o.jsx("p",{children:'Multiple official guidelines (CDC, WHO, FDA) backed by large randomized controlled trials. Example: "Vaccines prevent measles"'})]})]}),o.jsxs("div",{className:"grade-item",children:[o.jsx("span",{className:"grade-letter grade-b",children:"B"}),o.jsxs("div",{children:[o.jsx("strong",{children:"Moderate Quality"}),o.jsx("p",{children:'Some official guidelines OR substantial peer-reviewed literature (10+ papers). Example: "Mediterranean diet reduces heart disease risk"'})]})]}),o.jsxs("div",{className:"grade-item",children:[o.jsx("span",{className:"grade-letter grade-c",children:"C"}),o.jsxs("div",{children:[o.jsx("strong",{children:"Low Quality"}),o.jsx("p",{children:'Limited studies, emerging research, or preliminary findings. Example: "Certain supplements may help with X"'})]})]}),o.jsxs("div",{className:"grade-item",children:[o.jsx("span",{className:"grade-letter grade-d",children:"D"}),o.jsxs("div",{children:[o.jsx("strong",{children:"Very Low"}),o.jsx("p",{children:"Anecdotal evidence, AI synthesis only, or contradictory findings. Use with caution."})]})]})]})]}),o.jsxs("div",{className:"explainer-section",children:[o.jsx("h3",{children:"Retrieval Confidence (I-III)"}),o.jsx("p",{children:"How well did we find relevant sources?"}),o.jsxs("div",{className:"retrieval-list",children:[o.jsxs("div",{className:"retrieval-item",children:[o.jsx("span",{className:"retrieval-num retrieval-i",children:"I"}),o.jsx("span",{children:"Strong - Multiple source types found (guidelines + literature + AI consensus)"})]}),o.jsxs("div",{className:"retrieval-item",children:[o.jsx("span",{className:"retrieval-num retrieval-ii",children:"II"}),o.jsx("span",{children:"Moderate - Two source types found"})]}),o.jsxs("div",{className:"retrieval-item",children:[o.jsx("span",{className:"retrieval-num retrieval-iii",children:"III"}),o.jsx("span",{children:"Limited - Few sources available for this topic"})]})]})]}),o.jsxs("div",{className:"explainer-section",children:[o.jsx("h3",{children:"Agreement Percentage"}),o.jsx("p",{children:"How much do the sources agree with each other?"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"85%+"}),": Strong consensus across all sources"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"65-84%"}),": Moderate agreement with some variation"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"45-64%"}),": Mixed findings - interpret carefully"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"<45%"}),": Significant disagreement or limited data"]})]}),o.jsx("p",{className:"note",children:"Note: We cap agreement at 95% - true 100% confidence requires established medical fact with decades of evidence."})]}),o.jsxs("div",{className:"explainer-section",children:[o.jsx("h3",{children:"Reading the Code: C·II·55%"}),o.jsxs("p",{children:["This example means: ",o.jsx("strong",{children:"Low quality evidence"})," (C) with",o.jsx("strong",{children:" moderate retrieval"})," (II) and ",o.jsx("strong",{children:"55% agreement"})," between sources. This is typical for emerging research topics where studies exist but haven't yet reached official guideline status."]})]})]})]})})]})}function Mv({response:e}){const t=rr[e.provider_name]||"#6b7280";return e.success?o.jsxs("div",{className:"card",style:{borderColor:t},children:[o.jsxs("div",{className:"card-header",children:[o.jsxs("div",{className:"provider-info",children:[o.jsx("div",{className:"provider-dot",style:{background:t}}),o.jsx("span",{className:"provider-name",style:{color:t},children:e.provider_name})]}),o.jsx("span",{className:"model",children:e.model})]}),o.jsx("div",{className:"card-content",children:o.jsx(ln,{children:e.content})})]}):o.jsxs("div",{className:"card card-error",children:[o.jsxs("div",{className:"card-header",style:{background:"rgba(239, 68, 68, 0.1)"},children:[o.jsxs("div",{className:"provider-info",children:[o.jsx("div",{className:"provider-dot",style:{background:"#ef4444"}}),o.jsx("span",{className:"provider-name",style:{color:"#ef4444"},children:e.provider_name})]}),o.jsx("span",{className:"model",children:e.model})]}),o.jsxs("div",{className:"card-error-content",children:["Error: ",e.error]})]})}function Rv({title:e,content:t,icon:n,color:r}){return o.jsxs("div",{className:"analysis-card",style:{borderColor:r},children:[o.jsxs("div",{className:"analysis-card-header",style:{background:`${r}15`,borderBottomColor:`${r}30`},children:[o.jsx("span",{className:"analysis-icon",children:n}),o.jsx("h3",{className:"analysis-card-title",style:{color:r},children:e})]}),o.jsx("div",{className:"analysis-card-content",children:o.jsx(ln,{children:t})})]})}function gi({title:e,subtitle:t,icon:n,color:r,data:i,type:s}){var f,k,C,A,g;const l=i.count||0,a=i.source_types||{},c=i.top_cited||[],u=i.links||[],h=i.llm_summary||null||(()=>{if(u.length===0)return null;const m={};u.forEach(b=>{let j="Other";b.url&&b.url.includes("cdc.gov")?j="CDC":b.url&&b.url.includes("who.int")?j="WHO":b.url&&b.url.includes("fda.gov")?j="FDA":b.url&&b.url.includes("nih.gov")?j="NIH":b.url&&b.url.includes("heart.org")?j="AHA":b.url&&b.url.includes("cancer.org")?j="ACS":b.url&&b.url.includes("acog.org")?j="ACOG":b.url&&b.url.includes("aap.org")&&(j="AAP"),m[j]||(m[j]=0),m[j]++});const x=Object.keys(m).filter(b=>b!=="Other");if(u.slice(0,5).map(b=>{const j=(b.title||"").split(" - ")[0].split("|")[0].replace(/\.\.\.$/,"").trim();return j.length>60?j.slice(0,60)+"...":j}),s==="guidelines"){let b=`**${l} official sources** provide authoritative guidance on this topic`;return x.length>0&&(b+=` from ${x.slice(0,4).join(", ")}`),b+=".",b}else if(s==="news"){const b=u.filter(w=>w.credibility_tier==="highly_credible"||w.credibility_tier==="credible").length;let j=`**${l} news articles** provide recent reporting on this topic`;return b>0&&(j+=` (${b} from credible medical sources)`),j+=".",j}else if(s==="patents"){const b=u.filter(w=>w.status==="recent").length;let j=`**${l} medical patents** show innovation in this area`;return b>0&&(j+=` (${b} recently granted)`),j+=".",j}else if(s==="reference"){const b=u.filter(E=>E.quality_tier==="authoritative").length,j=[...new Set(u.map(E=>E.source_name).filter(Boolean))].slice(0,3);let w=`**${l} reference sources** provide background and context`;return b>0&&(w+=` (${b} authoritative)`),j.length>0&&(w+=` including ${j.join(", ")}`),w+=".",w}else{const b=u.reduce((w,E)=>w+(E.cited_by||0),0);let j=`**${l} peer-reviewed studies** provide research evidence`;return b>0&&(j+=` with ${b} combined citations`),j+=".",j}})();return o.jsxs("div",{className:"evidence-card-chorus glass-card",children:[o.jsx("div",{className:"evidence-card-header-chorus",style:{borderLeftColor:r},children:o.jsxs("div",{className:"evidence-card-top",children:[o.jsx("span",{className:"evidence-icon-large",children:n}),o.jsxs("div",{className:"evidence-card-titles",children:[o.jsx("h3",{style:{color:r},children:e}),o.jsx("span",{className:"evidence-subtitle",children:t})]}),o.jsxs("div",{className:"evidence-count-badge",style:{backgroundColor:`${r}20`,color:r},children:[l," sources"]})]})}),o.jsxs("div",{className:"evidence-card-body",children:[h&&o.jsx("div",{className:"evidence-summary",children:o.jsx(ln,{children:h})}),s==="guidelines"&&Object.keys(a).length>0&&o.jsx("div",{className:"source-breakdown",children:Object.entries(a).map(([m,x])=>o.jsxs("span",{className:"source-tag",children:[m,": ",x]},m))}),s==="literature"&&c.length>0&&o.jsxs("div",{className:"top-cited-chorus",children:[o.jsx("h4",{children:"Most Cited"}),c.slice(0,3).map((m,x)=>o.jsxs("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",className:"cited-paper-link",children:[o.jsx("span",{className:"paper-title",children:m.title}),o.jsxs("span",{className:"paper-citations",children:[m.cited_by," citations"]})]},x))]}),s==="news"&&i.by_credibility_tier&&o.jsxs("div",{className:"credibility-breakdown",children:[o.jsx("h4",{children:"Source Credibility"}),o.jsxs("div",{className:"cred-tags",children:[((f=i.by_credibility_tier.highly_credible)==null?void 0:f.length)>0&&o.jsxs("span",{className:"cred-tag tier-1",children:[o.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("polyline",{points:"20 6 9 17 4 12"})}),i.by_credibility_tier.highly_credible.length," Highly Credible"]}),((k=i.by_credibility_tier.credible)==null?void 0:k.length)>0&&o.jsxs("span",{className:"cred-tag tier-2",children:[o.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("polyline",{points:"20 6 9 17 4 12"})}),i.by_credibility_tier.credible.length," Credible"]}),((C=i.by_credibility_tier.general)==null?void 0:C.length)>0&&o.jsxs("span",{className:"cred-tag tier-3",children:[o.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),o.jsx("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]}),i.by_credibility_tier.general.length," General"]})]})]}),s==="patents"&&o.jsxs("div",{className:"patent-section",children:[o.jsx("div",{className:"patent-notice",children:"Patents represent innovations, not proven treatments. Consult clinical evidence before considering any treatment."}),i.by_clinical_relevance&&o.jsxs("div",{className:"relevance-breakdown",children:[((A=i.by_clinical_relevance.high)==null?void 0:A.length)>0&&o.jsxs("span",{className:"relevance-tag high",children:[i.by_clinical_relevance.high.length," High Relevance"]}),((g=i.by_clinical_relevance.moderate)==null?void 0:g.length)>0&&o.jsxs("span",{className:"relevance-tag moderate",children:[i.by_clinical_relevance.moderate.length," Moderate"]})]})]}),(()=>{const m=u.filter(x=>x.thumbnail);return m.length===0?null:o.jsxs("div",{className:"source-thumbnails",children:[o.jsxs("h4",{children:["Visual References (",m.length,")"]}),o.jsx("div",{className:"thumbnail-grid",children:m.slice(0,6).map((x,b)=>{var j,w,E;return o.jsxs("a",{href:x.url,target:"_blank",rel:"noopener noreferrer",className:"source-thumbnail-item",title:x.title,children:[o.jsx("img",{src:x.thumbnail,alt:x.title,loading:"lazy",onError:_=>{_.target.style.display="none"}}),o.jsx("span",{className:"thumbnail-source",children:x.source||x.source_name||((E=(w=(j=x.url)==null?void 0:j.match(/\/\/([^\/]+)/))==null?void 0:w[1])==null?void 0:E.replace("www.",""))||"Source"})]},b)})})]})})(),u.length>0&&o.jsxs("div",{className:"all-sources",children:[o.jsxs("h4",{children:["Sources (",u.length,")"]}),o.jsx("div",{className:"sources-scroll-container",children:u.map((m,x)=>o.jsxs("div",{className:"source-item-clean",children:[o.jsxs("span",{className:"source-num",children:[x+1,"."]}),o.jsxs("div",{className:"source-info",children:[o.jsx("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",className:"source-title-link",children:m.title}),o.jsxs("div",{className:"source-meta",children:[m.publication_info&&o.jsx("span",{className:"publication-info",children:m.publication_info}),m.cited_by>0&&o.jsxs("span",{className:"cite-count",children:[m.cited_by," citations"]}),s==="news"&&m.source&&o.jsx("span",{className:"news-source",children:m.source}),s==="news"&&m.credibility_tier&&o.jsx("span",{className:`cred-badge ${m.credibility_tier}`,children:m.credibility_tier==="highly_credible"?"Verified":m.credibility_tier==="credible"?"Credible":"General"}),s==="patents"&&m.assignee&&o.jsx("span",{className:"patent-assignee",children:m.assignee}),s==="patents"&&m.status_description&&o.jsx("span",{className:`patent-status ${m.status}`,children:m.status_description}),s==="reference"&&m.source_name&&o.jsx("span",{className:"ref-source",children:m.source_name}),s==="reference"&&m.quality_tier&&o.jsx("span",{className:`quality-badge ${m.quality_tier}`,children:m.quality_tier==="authoritative"?"Authoritative":m.quality_tier==="trusted"?"Trusted":"General"})]})]})]},x))})]})]})]})}function Lv({data:e}){const t=e.images||[],n=e.videos||[],r=e.links||[],i=e.metadata||{},s=t.length>0,l=n.length>0,a=l?"#ef4444":"#ec4899",c=l?"🎬":"🖼️",u=l?"Visual & Video References":"Visual References",d=l?"Images and videos from credible sources":"Diagrams and images from credible sources",p=i.credible_source_count||0;return o.jsxs("div",{className:"evidence-card-chorus glass-card media-card",children:[o.jsx("div",{className:"evidence-card-header-chorus",style:{borderLeftColor:a},children:o.jsxs("div",{className:"evidence-card-top",children:[o.jsx("span",{className:"evidence-icon-large",children:c}),o.jsxs("div",{className:"evidence-card-titles",children:[o.jsx("h3",{style:{color:a},children:u}),o.jsx("span",{className:"evidence-subtitle",children:d})]}),o.jsxs("div",{className:"evidence-count-badge",style:{backgroundColor:`${a}20`,color:a},children:[r.length," items"]})]})}),o.jsxs("div",{className:"evidence-card-body",children:[p>0&&o.jsxs("div",{className:"media-credibility-notice",children:[o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),p," from medical/scientific sources"]}),s&&o.jsx("div",{className:"media-grid",children:t.slice(0,6).map((h,f)=>o.jsxs("a",{href:h.source_url,target:"_blank",rel:"noopener noreferrer",className:`media-item media-image ${h.credibility_tier}`,title:h.title,children:[o.jsx("img",{src:h.thumbnail,alt:h.title,loading:"lazy"}),o.jsxs("div",{className:"media-overlay",children:[o.jsx("span",{className:"media-source",children:h.source}),h.credibility_tier==="medical"&&o.jsx("span",{className:"media-badge medical",children:"Medical"}),h.credibility_tier==="scientific"&&o.jsx("span",{className:"media-badge scientific",children:"Scientific"})]})]},f))}),l&&o.jsxs("div",{className:"media-videos",children:[o.jsx("h4",{children:"Videos"}),n.slice(0,3).map((h,f)=>o.jsxs("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",className:`video-item ${h.credibility_tier}`,children:[h.thumbnail&&o.jsxs("div",{className:"video-thumb",children:[o.jsx("img",{src:h.thumbnail,alt:h.title,loading:"lazy"}),h.duration&&o.jsx("span",{className:"video-duration",children:h.duration})]}),o.jsxs("div",{className:"video-info",children:[o.jsx("span",{className:"video-title",children:h.title}),o.jsx("span",{className:"video-channel",children:h.source})]})]},f))]}),o.jsx("div",{className:"media-disclaimer",children:"Visual references are for educational purposes. Always consult healthcare providers for medical diagnosis."})]})]})}function Dv({response:e}){const t=rr[e.provider_name]||"#64748b";return e.success?o.jsxs("div",{className:"ai-card glass-card",children:[o.jsxs("div",{className:"ai-card-header",children:[o.jsxs("div",{className:"ai-provider",style:{color:t},children:[o.jsx("span",{className:"ai-dot",style:{backgroundColor:t}}),e.provider_name]}),o.jsx("span",{className:"ai-model",children:e.model})]}),o.jsx("div",{className:"ai-card-content",children:o.jsx(ln,{children:e.content})})]}):o.jsxs("div",{className:"ai-card glass-card ai-card-error",children:[o.jsxs("div",{className:"ai-card-header",children:[o.jsxs("div",{className:"ai-provider",style:{color:"#ef4444"},children:[o.jsx("span",{className:"ai-dot",style:{backgroundColor:"#ef4444"}}),e.provider_name]}),o.jsx("span",{className:"ai-model",children:e.model})]}),o.jsxs("p",{className:"ai-error-text",children:["Error: ",e.error]})]})}const um=document.createElement("style");um.textContent=`
  * { box-sizing: border-box; }

  /* ===== GLOBAL MOBILE & IFRAME FIXES ===== */
  html {
    /* Ensure proper text sizing on mobile - prevents tiny text */
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    /* Smooth scrolling */
    scroll-behavior: smooth;
    /* Force font size inheritance */
    font-size: 100%;
  }

  body {
    /* Base font size for mobile readability - use px for iframe consistency */
    font-size: 16px !important;
    line-height: 1.5;
    /* Prevent horizontal scroll */
    overflow-x: hidden;
    /* For iframe compatibility */
    min-height: 100%;
    min-height: 100dvh;
    min-height: -webkit-fill-available;
    margin: 0;
    padding: 0;
    /* Ensure the body fills the iframe */
    width: 100%;
  }

  /* Root element sizing for iframes */
  #root {
    min-height: 100%;
    min-height: 100dvh;
    min-height: -webkit-fill-available;
    width: 100%;
  }

  /* Iframe detection and fixes */
  @media (max-width: 768px) {
    html, body {
      /* Ensure full height in iframes */
      height: 100%;
      min-height: 100%;
      /* Prevent zoom issues */
      touch-action: manipulation;
      /* Force readable font size on mobile */
      font-size: 16px !important;
    }

    #root {
      height: 100%;
      min-height: 100%;
    }
  }

  /* Extra insurance for very small screens / zoomed out iframes */
  @media (max-width: 480px) {
    html {
      /* Prevent browser from shrinking text in narrow iframes */
      -webkit-text-size-adjust: none;
      -moz-text-size-adjust: none;
      -ms-text-size-adjust: none;
      text-size-adjust: none;
    }
  }

  /* ===== IFRAME-SPECIFIC OVERRIDES ===== */
  /* Applied via JavaScript when running inside an iframe */
  html.in-iframe,
  body.in-iframe {
    /* Force consistent sizing in iframes */
    font-size: 16px !important;
    line-height: 1.5 !important;
    /* Ensure proper dimensions */
    width: 100% !important;
    min-height: 100% !important;
    overflow-x: hidden !important;
  }

  body.in-iframe #root {
    width: 100% !important;
    min-height: 100% !important;
  }

  /* Mobile iframe overrides */
  @media (max-width: 768px) {
    html.in-iframe,
    body.in-iframe {
      /* Aggressive font sizing for mobile iframes */
      font-size: 16px !important;
    }

    body.in-iframe .chorus-unified {
      font-size: 16px !important;
      width: 100% !important;
    }

    body.in-iframe .chorus-headline {
      font-size: clamp(1.25rem, 5vw, 1.75rem) !important;
    }

    body.in-iframe .chorus-tagline {
      font-size: clamp(0.8rem, 3vw, 1rem) !important;
    }

    body.in-iframe .chorus-search-input {
      font-size: 16px !important;
    }

    body.in-iframe .chorus-content-wrapper {
      padding: 1rem !important;
      max-width: 100% !important;
    }

    body.in-iframe .sample-btn {
      font-size: 0.75rem !important;
      padding: 0.4rem 0.6rem !important;
    }

    body.in-iframe .provider-chip {
      font-size: 0.7rem !important;
    }
  }

  /* ===== PRISM STYLES ===== */
  .prism-app {
    min-height: 100%;
    min-height: 100dvh; /* Dynamic viewport height - works in iframes */
    position: relative;
    overflow-x: hidden;
    color: #e2e8f0;
  }

  /* Prism Animated Background - Purple/Indigo theme */
  .prism-bg {
    position: absolute; /* Changed from fixed for iframe compatibility */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(135deg, #0f0a1f 0%, #1a1033 50%, #0d0a1a 100%);
    overflow: hidden;
  }

  .prism-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: prismFloat 20s ease-in-out infinite;
  }

  .prism-orb-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }

  .prism-orb-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #a855f7, #9333ea);
    bottom: -150px;
    left: -150px;
    animation-delay: -7s;
  }

  .prism-orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -14s;
  }

  @keyframes prismFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.05); }
    50% { transform: translate(-20px, 20px) scale(0.95); }
    75% { transform: translate(20px, 30px) scale(1.02); }
  }

  /* Prism Header */
  .prism-header {
    padding: 1.5rem 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: rgba(139, 92, 246, 0.05);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  }

  .prism-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .prism-brand-text {
    display: flex;
    flex-direction: column;
  }

  .prism-title {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .prism-tagline {
    color: #94a3b8;
    font-size: 0.875rem;
    margin: 0;
    margin-top: 0.25rem;
  }

  .prism-trust-badges {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .prism-badge {
    background: rgba(139, 92, 246, 0.15) !important;
    border-color: rgba(139, 92, 246, 0.3) !important;
    color: #c4b5fd !important;
  }

  .prism-view-toggle {
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 4px;
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .prism-view-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #94a3b8;
    font-size: 0.875rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-view-btn:hover {
    color: #c4b5fd;
  }

  .prism-view-btn.active {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
  }

  /* Prism Main Content */
  .prism-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Prism Input Card */
  .prism-input-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .prism-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .prism-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #c4b5fd;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .prism-label svg {
    stroke: #a855f7;
  }

  .prism-textarea {
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    color: #e2e8f0;
    font-size: 1rem;
    resize: vertical;
    min-height: 80px;
    transition: all 0.2s;
  }

  .prism-textarea:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  .prism-textarea::placeholder {
    color: #64748b;
  }

  .prism-form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .prism-provider-pills {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .prism-provider-pill {
    padding: 0.25rem 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  .prism-submit-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  .prism-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .prism-btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Prism Examples */
  .prism-examples {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(139, 92, 246, 0.1);
  }

  .prism-examples-label {
    color: #94a3b8;
    font-size: 0.875rem;
    margin-right: 0.75rem;
  }

  .prism-example-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .prism-example-chip {
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 20px;
    color: #c4b5fd;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-example-chip:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.4);
  }

  /* Prism Error */
  .prism-error {
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    color: #fca5a5;
    margin-bottom: 1.5rem;
  }

  /* Prism Loading */
  .prism-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
  }

  .prism-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(139, 92, 246, 0.2);
    border-top-color: #8b5cf6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 1rem;
  }

  .prism-loading p {
    color: #c4b5fd;
    font-size: 1.1rem;
    margin: 0;
  }

  .prism-loading-sub {
    color: #64748b;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  /* Prism Sections */
  .prism-section {
    margin-bottom: 2rem;
  }

  .prism-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .prism-section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #e2e8f0;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .prism-section-title svg {
    stroke: #a855f7;
  }

  .prism-section-count {
    padding: 0.25rem 0.75rem;
    background: rgba(139, 92, 246, 0.15);
    border-radius: 20px;
    color: #c4b5fd;
    font-size: 0.875rem;
  }

  .prism-responses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .prism-analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1rem;
  }

  /* Prism Message Card */
  .prism-message-section {
    margin-top: 1.5rem;
  }

  .prism-message-card {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-radius: 16px;
    overflow: hidden;
  }

  .prism-message-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(139, 92, 246, 0.1);
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  }

  .prism-message-title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .prism-message-title-row svg {
    stroke: #a855f7;
  }

  .prism-message-title {
    color: #e2e8f0;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .prism-copy-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.4);
    border-radius: 8px;
    color: #c4b5fd;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-copy-btn:hover {
    background: rgba(139, 92, 246, 0.3);
  }

  .prism-message-content {
    padding: 1.5rem;
    color: #e2e8f0;
    line-height: 1.7;
  }

  .prism-message-content p {
    margin: 0 0 1rem 0;
  }

  .prism-message-content p:last-child {
    margin-bottom: 0;
  }

  /* Prism Footer */
  .prism-footer {
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(139, 92, 246, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }

  .prism-footer-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .prism-footer p {
    color: #94a3b8;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
  }

  /* Prism Mobile Responsive */
  @media (max-width: 768px) {
    .prism-header {
      padding: 1rem;
      flex-direction: column;
      align-items: flex-start;
    }

    .prism-trust-badges {
      display: none;
    }

    .prism-main {
      padding: 1rem;
    }

    .prism-input-card {
      padding: 1rem;
    }

    .prism-form-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .prism-submit-btn {
      width: 100%;
      justify-content: center;
    }

    .prism-responses-grid,
    .prism-analysis-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ===== CHORUS STYLES ===== */

  /* ===== CHORUS UNIFIED LAYOUT ===== */
  /* Single-page layout with CSS-driven state transitions */

  .chorus-unified {
    min-height: 100%;
    min-height: 100dvh;
    min-height: -webkit-fill-available;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    /* Iframe compatibility */
    width: 100%;
    /* Ensure text is readable */
    font-size: 1rem;
    color: #e2e8f0;
  }

  /* Background - always present */
  .chorus-bg-container {
    /* Use absolute instead of fixed for better iframe support */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    /* Ensure it covers the full area */
    min-height: 100%;
    min-height: 100dvh;
  }

  /* Fix background in scrolling scenarios */
  @supports (position: fixed) {
    .chorus-bg-container {
      position: fixed;
    }
  }

  .chorus-bg-container .chorus-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .chorus-bg-container .chorus-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.85) 0%,
      rgba(26, 26, 46, 0.80) 50%,
      rgba(15, 23, 42, 0.85) 100%
    );
    transition: background 0.5s ease;
  }

  /* Darken overlay when showing results */
  .chorus-results .chorus-bg-container .chorus-bg-overlay,
  .chorus-searching .chorus-bg-container .chorus-bg-overlay {
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.94) 0%,
      rgba(26, 26, 46, 0.92) 50%,
      rgba(15, 23, 42, 0.94) 100%
    );
  }

  /* Content wrapper - transforms based on state */
  .chorus-content-wrapper {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* When typing/searching/results - move content up */
  .chorus-typing .chorus-content-wrapper,
  .chorus-searching .chorus-content-wrapper,
  .chorus-results .chorus-content-wrapper {
    justify-content: flex-start;
    padding-top: 1.5rem;
  }

  /* Hero section - shrinks and fades based on state */
  .chorus-hero {
    text-align: center;
    margin-bottom: 2.5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chorus-logo-area {
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
  }

  .chorus-image-logo {
    /* Ensure logo displays properly */
    display: block;
    max-width: 100%;
    height: auto;
  }

  .chorus-headline {
    font-size: 2.5rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
    transition: all 0.4s ease;
    letter-spacing: -0.02em;
  }

  .chorus-tagline {
    font-size: 1.125rem;
    color: #cbd5e1;
    margin: 0;
    line-height: 1.6;
    max-width: 580px;
    margin: 0 auto;
    transition: all 0.4s ease;
  }

  /* When typing/searching/results - shrink hero */
  .chorus-typing .chorus-hero,
  .chorus-searching .chorus-hero,
  .chorus-results .chorus-hero {
    margin-bottom: 1rem;
  }

  .chorus-typing .chorus-headline,
  .chorus-searching .chorus-headline,
  .chorus-results .chorus-headline {
    font-size: 0;
    margin: 0;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  .chorus-typing .chorus-tagline,
  .chorus-searching .chorus-tagline,
  .chorus-results .chorus-tagline {
    font-size: 0;
    margin: 0;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  /* Search section - always visible */
  .chorus-search-section {
    width: 100%;
    max-width: 600px;
    margin: 0 auto 1.5rem;
    transition: all 0.3s ease;
  }

  .chorus-search-form {
    width: 100%;
  }

  .chorus-search-box {
    display: flex;
    gap: 0.75rem;
    background: rgba(30, 41, 59, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    padding: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
  }

  .chorus-search-box:focus-within {
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 8px 32px rgba(6, 182, 212, 0.15);
  }

  .chorus-search-box.dragging {
    border-color: rgba(6, 182, 212, 0.6);
    background: rgba(6, 182, 212, 0.1);
  }

  .chorus-search-input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 1.05rem;
    color: #f1f5f9;
    resize: none;
    font-family: inherit;
    line-height: 1.5;
  }

  .chorus-search-input::placeholder {
    color: #64748b;
  }

  .chorus-search-input:focus {
    outline: none;
  }

  .chorus-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .chorus-search-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(6, 182, 212, 0.4);
  }

  .chorus-search-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sample questions - fade out when not initial */
  .chorus-sample-questions {
    margin-top: 1.25rem;
    text-align: center;
    transition: all 0.4s ease;
  }

  .chorus-typing .chorus-sample-questions,
  .chorus-searching .chorus-sample-questions,
  .chorus-results .chorus-sample-questions {
    opacity: 0;
    height: 0;
    margin: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .sample-label {
    display: block;
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 0.75rem;
  }

  .sample-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .sample-btn {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    color: #94a3b8;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    /* Allow text wrapping on mobile */
    white-space: normal;
    text-align: center;
    max-width: 100%;
    word-wrap: break-word;
  }

  .sample-btn:hover {
    background: rgba(6, 182, 212, 0.15);
    border-color: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }

  /* Trust row - fade out when not initial */
  .chorus-trust-row {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
    transition: all 0.4s ease;
  }

  .chorus-typing .chorus-trust-row,
  .chorus-searching .chorus-trust-row,
  .chorus-results .chorus-trust-row {
    opacity: 0;
    height: 0;
    margin: 0;
    overflow: hidden;
  }

  .chorus-trust-row .trust-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #94a3b8;
    font-size: 0.85rem;
  }

  .chorus-trust-row .trust-item svg {
    color: #06b6d4;
    opacity: 0.8;
  }

  /* Providers row - visible when typing/searching/results */
  .chorus-providers-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .chorus-typing .chorus-providers-row,
  .chorus-searching .chorus-providers-row,
  .chorus-results .chorus-providers-row {
    opacity: 1;
    height: auto;
    margin-top: 1rem;
  }

  .providers-label {
    font-size: 0.75rem;
    color: #64748b;
  }

  .provider-chip {
    padding: 0.25rem 0.625rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    font-size: 0.7rem;
    color: #94a3b8;
    border-left-width: 2px;
  }

  .evidence-chip {
    background: rgba(6, 182, 212, 0.1);
    border-color: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }

  /* Results area */
  .chorus-results-area {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .chorus-searching .chorus-results-area,
  .chorus-results .chorus-results-area {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Attached files */
  .chorus-attached-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding: 0 0.25rem;
  }

  /* New search button in footer */
  .chorus-new-search-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    color: #06b6d4;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.75rem;
  }

  .chorus-new-search-btn:hover {
    background: rgba(6, 182, 212, 0.25);
    border-color: rgba(6, 182, 212, 0.5);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .chorus-content-wrapper {
      padding: 1.5rem 1rem;
    }

    .chorus-typing .chorus-content-wrapper,
    .chorus-searching .chorus-content-wrapper,
    .chorus-results .chorus-content-wrapper {
      padding-top: 1rem;
    }

    .chorus-hero {
      margin-bottom: 1.5rem;
    }

    .chorus-logo-area {
      margin-bottom: 1rem;
    }

    /* Adjust logo size for mobile - initial state smaller but still prominent */
    .chorus-image-logo {
      max-height: 80px;
    }

    .chorus-headline {
      font-size: 1.75rem;
      padding: 0 0.5rem;
    }

    .chorus-tagline {
      font-size: 0.95rem;
      padding: 0 0.5rem;
    }

    .chorus-search-box {
      padding: 0.5rem;
    }

    .chorus-search-input {
      font-size: 1rem;
      padding: 0.5rem 0.75rem;
    }

    .chorus-search-btn {
      width: 44px;
      height: 44px;
    }

    .sample-list {
      gap: 0.375rem;
      /* Stack vertically on mobile for better readability */
      flex-direction: column;
      align-items: center;
    }

    .sample-btn {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      /* Allow full width on mobile */
      max-width: 90%;
      line-height: 1.3;
    }

    .chorus-trust-row {
      flex-wrap: wrap;
      gap: 1rem;
    }

    .chorus-trust-row .trust-item {
      font-size: 0.8rem;
    }
  }

  /* Extra small screens and portrait mobile */
  @media (max-width: 400px) {
    .chorus-content-wrapper {
      padding: 1rem 0.75rem;
    }

    .chorus-logo-area {
      margin-bottom: 0.75rem;
    }

    .chorus-image-logo {
      max-height: 64px;
    }

    .chorus-headline {
      font-size: 1.35rem;
    }

    .chorus-tagline {
      font-size: 0.85rem;
    }

    .chorus-search-input {
      font-size: 16px; /* Prevent iOS zoom on focus */
    }

    .sample-btn {
      font-size: 0.75rem;
      padding: 0.4rem 0.6rem;
    }

    .chorus-trust-row {
      gap: 0.75rem;
    }

    .chorus-trust-row .trust-item {
      font-size: 0.75rem;
    }

    .provider-chip {
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
    }
  }

  /* Portrait mobile - ensure good text sizing */
  @media (max-width: 480px) and (orientation: portrait) {
    .chorus-unified {
      font-size: 16px;
    }

    .chorus-headline {
      font-size: 1.5rem;
      line-height: 1.3;
    }

    .chorus-tagline {
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .chorus-search-input {
      /* Prevent zoom on iOS when focusing input */
      font-size: 16px !important;
    }
  }

  /* ===== IFRAME-SPECIFIC FIXES ===== */
  /* These ensure proper display when embedded in external sites like GoDaddy */

  /* Detect iframe context and apply fixes */
  @media screen {
    .chorus-unified {
      /* Ensure minimum readable sizes */
      --min-font-size: 14px;
      --base-font-size: 16px;
    }

    /* All text elements should have minimum readable size */
    .chorus-unified p,
    .chorus-unified span,
    .chorus-unified label,
    .chorus-unified input,
    .chorus-unified textarea,
    .chorus-unified button {
      font-size: max(var(--min-font-size), inherit);
    }

    .chorus-unified h1 {
      font-size: max(1.5rem, 24px);
    }

    .chorus-unified h2 {
      font-size: max(1.25rem, 20px);
    }

    .chorus-unified h3 {
      font-size: max(1.1rem, 18px);
    }
  }

  /* Mobile iframe specific - force larger touch targets and text */
  @media (max-width: 600px) and (hover: none) and (pointer: coarse) {
    /* This targets touch devices (mobile) */
    .chorus-unified {
      font-size: 16px !important;
    }

    .chorus-unified input,
    .chorus-unified textarea,
    .chorus-unified button {
      /* Ensure 16px to prevent iOS zoom */
      font-size: 16px !important;
      /* Minimum touch target size */
      min-height: 44px;
    }

    .chorus-headline {
      font-size: 1.5rem !important;
    }

    .chorus-tagline {
      font-size: 0.9rem !important;
    }

    .chorus-search-input {
      font-size: 16px !important;
      min-height: 48px;
    }

    .chorus-search-btn {
      min-width: 44px;
      min-height: 44px;
    }

    /* Ensure content doesn't overflow */
    .chorus-content-wrapper {
      padding: 1rem;
      max-width: 100%;
    }

    .chorus-search-section {
      max-width: 100%;
    }

    /* Sample questions - make tappable */
    .sample-btn {
      min-height: 36px;
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem !important;
    }
  }

  /* ===== LEGACY: CHORUS LANDING PAGE (for backwards compat) ===== */
  .chorus-landing {
    min-height: 100%;
    min-height: 100dvh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .chorus-landing-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .landing-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .landing-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.85) 0%,
      rgba(26, 26, 46, 0.8) 50%,
      rgba(15, 23, 42, 0.85) 100%
    );
  }

  .chorus-landing-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    max-width: 700px;
    width: 100%;
  }

  .landing-logo-section {
    margin-bottom: 1.5rem;
  }

  .landing-headline {
    font-size: 2.5rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  }

  .landing-subheadline {
    font-size: 1.1rem;
    color: #94a3b8;
    margin: 0 0 2.5rem 0;
    line-height: 1.6;
    max-width: 560px;
  }

  .landing-search-wrapper {
    width: 100%;
    max-width: 560px;
    margin-bottom: 2.5rem;
  }

  .landing-search-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    padding: 1.25rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .landing-search-input {
    width: 100%;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 1.1rem;
    color: #f1f5f9;
    resize: none;
    font-family: inherit;
    line-height: 1.5;
    transition: all 0.2s ease;
  }

  .landing-search-input::placeholder {
    color: #64748b;
  }

  .landing-search-input:focus {
    outline: none;
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
  }

  .landing-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .landing-search-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
  }

  .landing-search-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .landing-trust-indicators {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .landing-trust-indicators .trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .landing-trust-indicators .trust-item svg {
    color: #06b6d4;
  }

  /* Landing page responsive */
  @media (max-width: 640px) {
    .chorus-landing-content {
      padding: 1.5rem;
    }

    .landing-headline {
      font-size: 1.75rem;
    }

    .landing-subheadline {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .landing-search-box {
      padding: 1rem;
    }

    .landing-search-input {
      font-size: 1rem;
      padding: 0.875rem 1rem;
    }

    .landing-search-btn {
      padding: 0.875rem 1.5rem;
      font-size: 1rem;
    }

    .landing-trust-indicators {
      flex-direction: column;
      gap: 1rem;
    }
  }

  /* ===== CHORUS MAIN APP ===== */
  .chorus-app {
    min-height: 100%;
    min-height: 100dvh; /* Dynamic viewport height - works in iframes */
    position: relative;
    overflow-x: hidden;
  }

  /* Background image for main app (same as landing for visual continuity) */
  .chorus-app-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .chorus-app-bg .chorus-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .chorus-app-bg .chorus-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.92) 0%,
      rgba(26, 26, 46, 0.88) 50%,
      rgba(15, 23, 42, 0.92) 100%
    );
  }

  /* Animated Background - fallback/alternative */
  .chorus-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(135deg, #0c1222 0%, #1a1a2e 50%, #0f172a 100%);
    overflow: hidden;
  }

  .chorus-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .chorus-orb-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }

  .chorus-orb-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #14b8a6, #0d9488);
    bottom: -150px;
    left: -150px;
    animation-delay: -7s;
  }

  .chorus-orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -14s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.05); }
    50% { transform: translate(-20px, 20px) scale(0.95); }
    75% { transform: translate(20px, 30px) scale(1.02); }
  }

  /* Glass Card Effect */
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.5s ease forwards;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Chorus Logo Animation */
  .chorus-logo-animated .wave-1,
  .chorus-logo-animated .wave-2,
  .chorus-logo-animated .wave-3 {
    animation: waveMove 3s ease-in-out infinite;
  }

  .chorus-logo-animated .wave-2 { animation-delay: 0.2s; }
  .chorus-logo-animated .wave-3 { animation-delay: 0.4s; }

  @keyframes waveMove {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(3px); }
  }

  /* Chorus Header - compact results view */
  .chorus-header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .chorus-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .chorus-brand-text {
    text-align: left;
  }

  .chorus-title {
    font-size: 2.75rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #0ea5e9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .chorus-tagline {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0.25rem 0 0;
    font-weight: 400;
  }

  /* New search button in header */
  .chorus-new-search-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    color: #06b6d4;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chorus-new-search-btn:hover {
    background: rgba(6, 182, 212, 0.25);
    border-color: rgba(6, 182, 212, 0.5);
  }

  .chorus-trust-badges {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.75rem;
    color: #a1a1aa;
    font-weight: 500;
  }

  .trust-badge svg {
    opacity: 0.7;
  }

  /* Chorus Main */
  .chorus-main {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 2rem;
  }

  /* Chorus Search Section */
  .chorus-search-section {
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .chorus-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chorus-label {
    font-size: 1.125rem;
    font-weight: 600;
    color: #e2e8f0;
  }

  .chorus-input-wrapper {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }

  .chorus-textarea {
    flex: 1;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.3);
    color: #f1f5f9;
    resize: none;
    font-family: inherit;
    outline: none;
    transition: all 0.3s ease;
  }

  .chorus-textarea:focus {
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  .chorus-textarea::placeholder {
    color: #64748b;
  }

  .chorus-submit-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
  }

  .chorus-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4);
  }

  .chorus-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .chorus-btn-loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .chorus-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .chorus-providers {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .chorus-providers-label {
    font-size: 0.8rem;
    color: #64748b;
  }

  .chorus-provider-chip {
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    border-radius: 20px;
    border: 1px solid;
    background: transparent;
    color: #94a3b8;
    text-transform: capitalize;
  }

  .chorus-provider-evidence {
    border-color: #14b8a6 !important;
    color: #14b8a6;
  }

  .chorus-examples {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .chorus-examples-label {
    font-size: 0.85rem;
    color: #64748b;
    display: block;
    margin-bottom: 0.75rem;
  }

  .chorus-examples-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .chorus-example-btn {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    text-align: left;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 1.4;
  }

  .chorus-example-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(6, 182, 212, 0.3);
    color: #e2e8f0;
  }

  /* Chorus Error */
  .chorus-error {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    border-color: rgba(239, 68, 68, 0.3) !important;
    color: #fca5a5;
  }

  /* Chorus Loading */
  .chorus-loading {
    padding: 3rem 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .chorus-loading h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 1.5rem 0 0.5rem;
  }

  .chorus-loading p {
    color: #94a3b8;
    font-size: 0.9rem;
    margin: 0;
  }

  .chorus-loading-animation {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .chorus-loading-wave {
    width: 8px;
    height: 40px;
    background: linear-gradient(135deg, #06b6d4, #14b8a6);
    border-radius: 4px;
    animation: loadingWave 1s ease-in-out infinite;
  }

  .chorus-loading-wave:nth-child(2) { animation-delay: 0.1s; }
  .chorus-loading-wave:nth-child(3) { animation-delay: 0.2s; }

  @keyframes loadingWave {
    0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
    50% { transform: scaleY(1); opacity: 1; }
  }

  .chorus-loading-steps {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .loading-step {
    font-size: 0.75rem;
    color: #64748b;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .loading-step.active {
    color: #14b8a6;
    border-color: rgba(20, 184, 166, 0.3);
    background: rgba(20, 184, 166, 0.1);
  }

  /* Chorus Results */
  .chorus-results {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Section Headings */
  .section-heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 1.25rem;
  }

  .section-heading svg {
    opacity: 0.7;
    color: #06b6d4;
  }

  .section-heading-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .section-heading-row .section-heading {
    margin: 0;
  }

  /* Summary Section */
  .chorus-summaries {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chorus-summary-tabs {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.375rem;
    border-radius: 12px;
    width: fit-content;
  }

  .summary-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .summary-tab:hover {
    color: #e2e8f0;
  }

  .summary-tab.active {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(20, 184, 166, 0.2));
    color: #06b6d4;
  }

  .chorus-summary-card {
    padding: 0;
    overflow: hidden;
  }

  .summary-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .summary-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .patient-icon {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
    color: #22c55e;
  }

  .clinician-icon {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2));
    color: #06b6d4;
  }

  .summary-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0;
  }

  .summary-subtitle {
    font-size: 0.8rem;
    color: #64748b;
  }

  .summary-header .copy-btn {
    margin-left: auto;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .summary-header .copy-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .summary-content {
    padding: 1.5rem;
  }

  .patient-summary-box {
    background: rgba(34, 197, 94, 0.05);
    border: 1px solid rgba(34, 197, 94, 0.15);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .patient-summary-box h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #22c55e;
    margin: 0 0 0.75rem;
  }

  .patient-summary-box p {
    font-size: 1rem;
    line-height: 1.7;
    color: #e2e8f0;
    margin: 0;
  }

  .summary-confidence {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .confidence-label {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .confidence-bar {
    flex: 1;
    min-width: 100px;
    max-width: 200px;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }

  .confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #14b8a6);
    border-radius: 3px;
    transition: width 0.5s ease;
  }

  .confidence-text {
    font-size: 0.75rem;
    color: #64748b;
  }

  /* Confidence badges */
  .confidence-badge {
    padding: 0.375rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .confidence-high {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .confidence-moderate {
    background: rgba(245, 158, 11, 0.2);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .confidence-limited {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .confidence-factors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .confidence-factor {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    background: rgba(6, 182, 212, 0.1);
    color: #06b6d4;
    border-radius: 4px;
    border: 1px solid rgba(6, 182, 212, 0.2);
  }

  /* Summary sections */
  .summary-section {
    padding: 1.25rem;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .summary-section:last-of-type {
    margin-bottom: 0;
  }

  .section-official {
    border-left: 3px solid #14b8a6;
  }

  .section-research {
    border-left: 3px solid #0ea5e9;
  }

  .section-synthesis {
    border-left: 3px solid #8b5cf6;
  }

  .section-header-inline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .section-header-inline h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #e2e8f0;
  }

  .section-icon {
    font-size: 1.25rem;
  }

  .source-count-badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border-radius: 999px;
    margin-left: auto;
  }

  .section-content {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #d1d5db;
  }

  .section-content p {
    margin-bottom: 0.75rem;
  }

  .section-content p:last-child {
    margin-bottom: 0;
  }

  /* Clinician sections */
  .clinician-section {
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .clinician-section:last-child {
    margin-bottom: 0;
  }

  .section-guidelines {
    border-left: 3px solid #14b8a6;
  }

  .section-official {
    border-left: 3px solid #14b8a6;
    background: rgba(20, 184, 166, 0.05);
  }

  .section-literature {
    border-left: 3px solid #0ea5e9;
    background: rgba(14, 165, 233, 0.05);
  }

  .section-consensus {
    border-left: 3px solid #f59e0b;
    background: rgba(245, 158, 11, 0.05);
  }

  .section-quality {
    border-left: 3px solid #22c55e;
    background: rgba(34, 197, 94, 0.05);
    padding: 1rem !important;
  }

  .section-quality .clinician-section-content {
    font-size: 0.9rem;
  }

  .section-references {
    border-left: 3px solid #64748b;
    background: rgba(100, 116, 139, 0.05);
  }

  .section-sources {
    border-left: 3px solid #0ea5e9;
    background: rgba(14, 165, 233, 0.05);
  }

  .section-takeaways {
    border-left: 3px solid #22c55e;
    background: rgba(34, 197, 94, 0.05);
  }

  .section-title-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .section-subtitle {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 400;
  }

  .section-source-count {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    background: rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    border-radius: 999px;
    margin-left: auto;
  }

  /* Evidence card summary */
  .evidence-summary {
    padding: 1rem;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border-left: 2px solid rgba(6, 182, 212, 0.3);
  }

  .evidence-summary p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #d1d5db;
  }

  /* Clean source items (no snippets) */
  .source-item-clean {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .source-item-clean:last-child {
    border-bottom: none;
  }

  .source-num {
    color: #64748b;
    font-size: 0.85rem;
    min-width: 1.5rem;
  }

  .source-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .source-title-link {
    color: #06b6d4;
    text-decoration: none;
    font-size: 0.9rem;
    line-height: 1.4;
    transition: color 0.2s ease;
  }

  .source-title-link:hover {
    color: #22d3ee;
    text-decoration: underline;
  }

  .source-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #64748b;
  }

  .source-meta span {
    white-space: nowrap;
  }

  .ref-source, .news-source, .patent-assignee {
    color: #94a3b8;
  }

  .quality-badge {
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 500;
  }

  .quality-badge.authoritative {
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
  }

  .quality-badge.trusted {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
  }

  .quality-badge.general {
    background: rgba(100, 116, 139, 0.2);
    color: #94a3b8;
  }

  .cred-badge {
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 500;
  }

  .cred-badge.highly_credible {
    background: rgba(34, 197, 94, 0.2);
    color: #4ade80;
  }

  .cred-badge.credible {
    background: rgba(14, 165, 233, 0.2);
    color: #38bdf8;
  }

  .cred-badge.general {
    background: rgba(100, 116, 139, 0.2);
    color: #94a3b8;
  }

  .evidence-link {
    color: #06b6d4;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .evidence-link:hover {
    color: #22d3ee;
    text-decoration: underline;
  }

  .clinician-section-content h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #94a3b8;
    margin: 1.5rem 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .clinician-section-content ol {
    padding-left: 1.5rem;
    margin: 0;
  }

  .clinician-section-content ol li {
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .section-literature {
    border-left: 3px solid #0ea5e9;
  }

  .section-synthesis {
    border-left: 3px solid #8b5cf6;
  }

  .clinician-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .clinician-section-header h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #06b6d4;
  }

  .model-badges {
    display: flex;
    gap: 0.375rem;
  }

  .model-badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: white;
    font-weight: 500;
  }

  .clinician-section-content {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #d1d5db;
    max-height: 400px;
    overflow-y: auto;
  }

  .inline-references {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .inline-references h5 {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0 0 0.75rem 0;
    font-weight: 500;
  }

  .inline-ref {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.5rem 0;
    font-size: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .inline-ref:last-child {
    border-bottom: none;
  }

  .ref-num {
    font-weight: 600;
    color: #06b6d4;
    min-width: 2rem;
  }

  .inline-ref a {
    color: #e2e8f0;
    text-decoration: none;
    flex: 1;
    min-width: 200px;
  }

  .inline-ref a:hover {
    color: #06b6d4;
    text-decoration: underline;
  }

  .ref-source {
    color: #64748b;
    font-style: italic;
  }

  .ref-citations {
    color: #22c55e;
    font-size: 0.75rem;
    background: rgba(34, 197, 94, 0.1);
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
  }

  .clinician-content {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #d1d5db;
  }

  .clinician-content h2 {
    font-size: 1rem;
    font-weight: 600;
    color: #06b6d4;
    margin: 1.5rem 0 0.75rem;
  }

  .clinician-content h2:first-child {
    margin-top: 0;
  }

  .clinician-content p {
    margin-bottom: 0.75rem;
  }

  .clinician-content ul, .clinician-content ol {
    margin-left: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .clinician-content li {
    margin-bottom: 0.375rem;
  }

  /* Evidence Section */
  .evidence-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 800px) {
    .evidence-cards-grid {
      grid-template-columns: 1fr;
    }
  }

  .evidence-card-chorus {
    padding: 0;
    overflow: hidden;
  }

  .evidence-card-header-chorus {
    padding: 1.25rem;
    border-left: 4px solid;
    background: rgba(0, 0, 0, 0.2);
  }

  .evidence-card-top {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .evidence-icon-large {
    font-size: 1.75rem;
  }

  .evidence-card-titles h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .evidence-subtitle {
    font-size: 0.75rem;
    color: #64748b;
    display: block;
    margin-top: 0.25rem;
  }

  .evidence-count-badge {
    margin-left: auto;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    white-space: nowrap;
  }

  .evidence-card-body {
    padding: 1.25rem;
  }

  .source-breakdown {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .source-tag {
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: #94a3b8;
  }

  .top-cited-chorus {
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .top-cited-chorus h4,
  .all-sources h4 {
    font-size: 0.85rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 0.75rem;
  }

  .cited-paper-link {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    text-decoration: none;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
  }

  .cited-paper-link:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .paper-title {
    font-size: 0.85rem;
    color: #06b6d4;
    flex: 1;
    line-height: 1.5;
  }

  .paper-citations {
    font-size: 0.75rem;
    color: #22c55e;
    white-space: nowrap;
    background: rgba(34, 197, 94, 0.15);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .all-sources {
    margin-top: 0.5rem;
  }

  .sources-scroll-container {
    max-height: 500px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    touch-action: pan-y;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .sources-scroll-container {
      max-height: 300px;
    }
  }

  .source-item {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
  }

  .source-item:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .source-item a {
    font-size: 0.9rem;
    color: #06b6d4;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.4;
    display: block;
  }

  .source-item a:hover {
    text-decoration: underline;
  }

  .source-snippet {
    font-size: 0.8rem;
    color: #a1a1aa;
    margin: 0.5rem 0 0;
    line-height: 1.5;
  }

  .publication-info {
    font-size: 0.75rem;
    color: #64748b;
    display: block;
    margin-top: 0.375rem;
    font-style: italic;
  }

  .source-item .cite-count {
    font-size: 0.7rem;
    color: #22c55e;
    display: inline-block;
    margin-top: 0.5rem;
    background: rgba(34, 197, 94, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  /* Media Card Styles */
  .media-card {
    /* Inherits evidence-card-chorus styles */
  }

  .media-credibility-notice {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.875rem;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 8px;
    font-size: 0.8rem;
    color: #4ade80;
    margin-bottom: 1rem;
  }

  .media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 600px) {
    .media-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .media-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 4/3;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.2s ease;
    display: block;
  }

  .media-item:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.02);
  }

  .media-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .media-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .media-source {
    font-size: 0.65rem;
    color: #94a3b8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .media-badge {
    font-size: 0.6rem;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-weight: 500;
  }

  .media-badge.medical {
    background: rgba(20, 184, 166, 0.3);
    color: #2dd4bf;
  }

  .media-badge.scientific {
    background: rgba(14, 165, 233, 0.3);
    color: #38bdf8;
  }

  .media-videos {
    margin-bottom: 1rem;
  }

  .media-videos h4 {
    font-size: 0.85rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 0.75rem;
  }

  .video-item {
    display: flex;
    gap: 0.75rem;
    padding: 0.625rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: all 0.2s ease;
  }

  .video-item:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .video-thumb {
    position: relative;
    width: 100px;
    min-width: 100px;
    aspect-ratio: 16/9;
    border-radius: 6px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
  }

  .video-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-duration {
    position: absolute;
    bottom: 4px;
    right: 4px;
    padding: 0.125rem 0.375rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    font-size: 0.65rem;
    color: #fff;
  }

  .video-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
  }

  .video-title {
    font-size: 0.8rem;
    color: #e2e8f0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .video-channel {
    font-size: 0.7rem;
    color: #64748b;
  }

  .media-disclaimer {
    font-size: 0.7rem;
    color: #64748b;
    padding: 0.625rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 6px;
    text-align: center;
  }

  /* AI Section */
  .toggle-ai-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-ai-btn:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
  }

  .toggle-ai-btn svg {
    transition: transform 0.2s ease;
  }

  .ai-summary-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
  }

  .ai-summary-text {
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .ai-count {
    color: #e2e8f0;
    font-weight: 600;
  }

  .ai-provider-dots {
    display: flex;
    gap: 0.5rem;
  }

  .ai-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }

  .ai-dot:hover {
    transform: scale(1.3);
  }

  .ai-responses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .ai-card {
    padding: 0;
    overflow: hidden;
  }

  .ai-card-error {
    border-color: rgba(239, 68, 68, 0.3) !important;
  }

  .ai-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 1.25rem;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .ai-provider {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .ai-model {
    font-size: 0.7rem;
    color: #64748b;
  }

  .ai-card-content {
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #d1d5db;
    max-height: 500px;
    overflow-y: auto;
  }

  .ai-card-content p {
    margin: 0;
  }

  .ai-error-text {
    padding: 1rem 1.25rem;
    color: #fca5a5;
    font-size: 0.85rem;
    margin: 0;
  }

  .ai-expand-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.02);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ai-expand-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
  }

  /* Media Section */
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .media-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    overflow: hidden;
  }

  .media-placeholder {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    color: #64748b;
  }

  .media-info {
    padding: 0.875rem;
  }

  .media-title {
    font-size: 0.8rem;
    color: #e2e8f0;
    font-weight: 500;
    display: block;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  .media-source {
    font-size: 0.7rem;
    color: #64748b;
  }

  /* Summary Depth Toggle */
  .summary-depth-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .summary-depth-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    color: #e2e8f0;
  }

  .summary-depth-toggle svg {
    flex-shrink: 0;
  }

  /* Patient view toggle styling */
  .patient-summary .summary-depth-toggle {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.25);
    color: #86efac;
  }

  .patient-summary .summary-depth-toggle:hover {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.4);
    color: #bbf7d0;
  }

  /* Clinician view toggle styling */
  .clinician-toggle {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.25);
    color: #93c5fd;
  }

  .clinician-toggle:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
    color: #bfdbfe;
  }

  /* References Section */
  .chorus-references-section .glass-card {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .references-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .reference-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;
  }

  .reference-item:last-child {
    border-bottom: none;
  }

  .reference-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .reference-number {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    min-width: 24px;
  }

  .reference-content {
    flex: 1;
  }

  .reference-content a {
    font-size: 0.9rem;
    color: #06b6d4;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.4;
    display: block;
  }

  .reference-content a:hover {
    text-decoration: underline;
  }

  .reference-snippet {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0.375rem 0;
    line-height: 1.5;
  }

  .reference-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .reference-type {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .reference-type.guideline {
    background: rgba(20, 184, 166, 0.15);
    color: #14b8a6;
  }

  .reference-type.literature {
    background: rgba(14, 165, 233, 0.15);
    color: #0ea5e9;
  }

  .reference-citations {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.7rem;
    color: #64748b;
  }

  /* Follow-up Section */
  .follow-up-section {
    margin-top: 2rem;
  }

  .follow-up-form {
    padding: 1.25rem;
  }

  .follow-up-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .follow-up-header svg {
    opacity: 0.7;
  }

  .conversation-count {
    margin-left: auto;
    font-size: 0.75rem;
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
  }

  .follow-up-input-group {
    display: flex;
    gap: 0.75rem;
  }

  .follow-up-input-group input {
    flex: 1;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    color: #e2e8f0;
    transition: all 0.2s ease;
  }

  .follow-up-input-group input:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .follow-up-input-group input::placeholder {
    color: #64748b;
  }

  .follow-up-input-group input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .follow-up-button {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    padding: 0 1.25rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
  }

  .follow-up-button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  .follow-up-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .spinner-small {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Chorus Footer */
  .chorus-footer {
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    margin-top: 2rem;
  }

  .chorus-footer-content p {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }

  .chorus-disclaimer {
    margin-top: 0.5rem !important;
    font-size: 0.75rem !important;
    color: #52525b !important;
  }

  /* Drag-drop textarea styling */
  .chorus-input-wrapper.dragging {
    border: 2px dashed #06b6d4;
    background: rgba(6, 182, 212, 0.1);
    border-radius: 12px;
  }

  .chorus-input-wrapper.dragging .chorus-textarea {
    background: transparent;
    border-color: transparent;
  }

  /* Attached files chips */
  .chorus-attached-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .chorus-file-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 20px;
    font-size: 0.8rem;
    color: #94a3b8;
    transition: all 0.2s ease;
  }

  .chorus-file-chip.uploading {
    background: rgba(245, 158, 11, 0.15);
    border-color: rgba(245, 158, 11, 0.3);
    color: #f59e0b;
  }

  .chorus-file-chip svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  .chorus-file-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 2px;
    border-radius: 50%;
    margin-left: 0.125rem;
    transition: all 0.2s ease;
  }

  .chorus-file-remove:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }

  .chorus-spinner-small {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(245, 158, 11, 0.3);
    border-top-color: #f59e0b;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Speed Dial FAB */
  .speed-dial-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
    /* Iframe compatibility - ensure visibility */
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: transform;
  }

  /* Mobile iframe fix - use sticky positioning as fallback */
  @supports (-webkit-touch-callout: none) {
    /* iOS Safari specific */
    .speed-dial-container {
      position: fixed;
      position: -webkit-sticky;
    }
  }

  .speed-dial-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .speed-dial-actions.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .speed-dial-action {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
  }

  .speed-dial-action:hover {
    background: rgba(51, 65, 85, 0.95);
    transform: translateX(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  .speed-dial-action.danger:hover {
    background: rgba(127, 29, 29, 0.95);
    border-color: rgba(239, 68, 68, 0.3);
  }

  .speed-dial-action.disabled,
  .speed-dial-action:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .speed-dial-action.disabled:hover,
  .speed-dial-action:disabled:hover {
    transform: none;
    background: rgba(30, 41, 59, 0.95);
  }

  .speed-dial-label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .speed-dial-fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
    transition: all 0.3s ease;
  }

  .speed-dial-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.5);
  }

  .speed-dial-fab.active {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    box-shadow: 0 4px 15px rgba(100, 116, 139, 0.4);
    transform: rotate(45deg);
  }

  .speed-dial-fab.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .speed-dial-fab svg {
    transition: transform 0.3s ease;
  }

  .follow-up-panel {
    width: 340px;
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: slideUpFade 0.2s ease-out;
  }

  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .follow-up-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .follow-up-panel-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .follow-up-panel-title svg {
    opacity: 0.7;
  }

  .follow-up-panel-close {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .follow-up-panel-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #94a3b8;
  }

  .follow-up-panel-form {
    display: flex;
    gap: 0.5rem;
  }

  .follow-up-panel-form input {
    flex: 1;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: #e2e8f0;
    transition: all 0.2s ease;
  }

  .follow-up-panel-form input:focus {
    outline: none;
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  .follow-up-panel-form input::placeholder {
    color: #64748b;
  }

  .follow-up-panel-form input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .follow-up-panel-submit {
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
  }

  .follow-up-panel-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
  }

  .follow-up-panel-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Mobile adjustments for Speed Dial */
  @media (max-width: 480px) {
    .speed-dial-container {
      bottom: 1rem;
      right: 1rem;
      /* Ensure visibility in mobile iframes */
      position: fixed !important;
      z-index: 9999 !important;
    }

    .follow-up-panel {
      width: calc(100vw - 2rem); /* Full width minus margins */
      max-width: 340px;
      /* Position from right edge */
      position: relative;
      right: 0;
    }

    .speed-dial-fab {
      width: 52px;
      height: 52px;
      /* Ensure tap target is visible */
      min-width: 52px;
      min-height: 52px;
    }

    .speed-dial-action {
      padding: 0.625rem 0.875rem;
    }
  }

  /* Portrait mobile - extra adjustments */
  @media (max-width: 480px) and (orientation: portrait) {
    .speed-dial-container {
      bottom: 1.5rem;
      right: 1rem;
    }

    .speed-dial-fab {
      width: 56px;
      height: 56px;
      /* Add shadow for better visibility */
      box-shadow: 0 4px 20px rgba(6, 182, 212, 0.5);
    }
  }

  /* Chorus Mobile Responsive */
  @media (max-width: 640px) {
    .chorus-main {
      padding: 0 1rem 1.5rem;
    }

    .chorus-header {
      padding: 1rem 1rem 1.5rem;
    }

    .chorus-brand {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }

    .chorus-title {
      font-size: 1.75rem;
    }

    .chorus-tagline {
      font-size: 0.85rem;
    }

    .chorus-trust-badges {
      flex-wrap: wrap;
      justify-content: center;
    }

    .chorus-search-section {
      padding: 1rem;
    }

    .chorus-input-wrapper {
      flex-direction: column;
      gap: 0.75rem;
    }

    .chorus-submit-btn {
      width: 100%;
      justify-content: center;
    }

    .chorus-orb-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      right: -100px;
    }

    .chorus-orb-2 {
      width: 250px;
      height: 250px;
      bottom: -75px;
      left: -75px;
    }

    .chorus-orb-3 {
      width: 150px;
      height: 150px;
    }
  }

  /* ===== PRISM STYLES (Original) ===== */
  .app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    min-height: 100%;
    min-height: 100dvh; /* Dynamic viewport height - works in iframes */
    display: flex;
    flex-direction: column;
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-top: 1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .logo-container { flex-shrink: 0; }
  .brand-text { text-align: left; }
  .brand-text .title { margin-bottom: 0.125rem; }
  .brand-text .subtitle { margin: 0; }

  .view-toggle {
    display: inline-flex;
    gap: 0.5rem;
    background: rgba(255,255,255,0.05);
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 1rem;
  }

  .view-btn {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    background: transparent;
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s;
  }

  .view-btn:hover { color: #d4d4d8; }

  .view-btn.active {
    background: rgba(255,255,255,0.1);
    color: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }

  .title {
    font-size: 2.5rem;
    font-weight: 600;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.25rem;
  }

  .subtitle { color: #a1a1aa; font-size: 1rem; }

  .main { flex: 1; }

  .input-section {
    background: rgba(255,255,255,0.03);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .form { display: flex; flex-direction: column; gap: 0.75rem; }
  .label { font-size: 0.9rem; font-weight: 500; color: #e4e4e7; }

  .textarea {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.2);
    color: #e4e4e7;
    resize: none;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }

  .app-container[data-mode="public_health"] .textarea:focus {
    border-color: rgba(168, 85, 247, 0.5);
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .provider-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }

  .provider-pill {
    padding: 0.25rem 0.625rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    text-transform: capitalize;
    border: 1px solid;
    background: transparent;
    color: #a1a1aa;
  }

  .submit-btn {
    padding: 0.75rem 1.75rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: none;
    color: white;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
    white-space: nowrap;
  }

  .submit-btn:hover:not(:disabled) { transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .examples {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    align-items: center;
  }

  .examples-label { font-size: 0.8rem; color: #71717a; }

  .example-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s;
  }

  .example-btn:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.2);
  }

  .error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    border-radius: 0.5rem;
    padding: 1rem;
    color: #fca5a5;
    margin-bottom: 1rem;
  }

  .loading { text-align: center; padding: 3rem; color: #a1a1aa; }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  .section { margin-bottom: 2rem; }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #e4e4e7;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  .section-icon { font-size: 1.25rem; }

  .section-count {
    font-size: 0.8rem;
    color: #71717a;
    background: rgba(255,255,255,0.05);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
  }

  .responses-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .responses-grid[data-count="1"] { grid-template-columns: 1fr; max-width: 600px; }
  .responses-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
  .responses-grid[data-count="4"] { grid-template-columns: repeat(2, 1fr); }
  .responses-grid[data-count="5"] { grid-template-columns: repeat(3, 1fr); }
  .responses-grid[data-count="6"] { grid-template-columns: repeat(3, 1fr); }

  @media (max-width: 900px) {
    .responses-grid,
    .responses-grid[data-count="3"],
    .responses-grid[data-count="4"],
    .responses-grid[data-count="5"],
    .responses-grid[data-count="6"] {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .responses-grid,
    .responses-grid[data-count="1"],
    .responses-grid[data-count="2"],
    .responses-grid[data-count="3"],
    .responses-grid[data-count="4"],
    .responses-grid[data-count="5"],
    .responses-grid[data-count="6"] {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: rgba(255,255,255,0.02);
    border-radius: 0.75rem;
    border: 1px solid;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .card-error { border-color: #ef4444; }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.2);
  }

  .provider-info { display: flex; align-items: center; gap: 0.5rem; }
  .provider-dot { width: 8px; height: 8px; border-radius: 50%; }
  .provider-name { font-weight: 600; font-size: 0.9rem; }
  .model { font-size: 0.7rem; color: #71717a; }

  .card-content {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.6;
    max-height: 300px;
    overflow-y: auto;
    color: #d4d4d8;
    flex: 1;
  }

  .card-error-content { padding: 1rem; color: #fca5a5; font-size: 0.85rem; }

  .highlight-card {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    border-radius: 1rem;
    border: 2px solid #ec4899;
    overflow: hidden;
  }

  .highlight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: rgba(236, 72, 153, 0.1);
    border-bottom: 1px solid rgba(236, 72, 153, 0.2);
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .highlight-title-row { display: flex; align-items: center; gap: 0.5rem; }
  .highlight-icon { font-size: 1.5rem; }
  .highlight-title { font-size: 1.1rem; font-weight: 600; color: #f9a8d4; margin: 0; }

  .copy-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: 1px solid #ec4899;
    background: rgba(236, 72, 153, 0.2);
    color: #f9a8d4;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover { background: rgba(236, 72, 153, 0.3); }

  .highlight-content {
    padding: 1.5rem;
    font-size: 1rem;
    line-height: 1.8;
    color: #e4e4e7;
  }

  .highlight-content p:first-child { font-size: 1.1rem; font-weight: 500; color: #f4f4f5; }

  .analysis-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .analysis-grid[data-count="1"] { grid-template-columns: 1fr; }
  .analysis-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
  .analysis-grid[data-count="5"] { grid-template-columns: repeat(3, 1fr); }

  @media (max-width: 1000px) {
    .analysis-grid,
    .analysis-grid[data-count="3"],
    .analysis-grid[data-count="5"] {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 650px) {
    .analysis-grid,
    .analysis-grid[data-count="1"],
    .analysis-grid[data-count="2"],
    .analysis-grid[data-count="3"],
    .analysis-grid[data-count="5"] {
      grid-template-columns: 1fr;
    }
  }

  .analysis-card {
    background: rgba(255,255,255,0.02);
    border-radius: 0.75rem;
    border: 1px solid;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .analysis-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .analysis-card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid;
  }

  .analysis-icon { font-size: 1.1rem; }
  .analysis-card-title { font-size: 0.9rem; font-weight: 600; margin: 0; }

  .analysis-card-content {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.7;
    color: #d4d4d8;
  }

  .footer { text-align: center; padding: 1.5rem 0; color: #52525b; font-size: 0.8rem; }

  /* Markdown */
  h2 { font-size: 1rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #e4e4e7; }
  h2:first-child { margin-top: 0; }
  h3 { font-size: 0.9rem; font-weight: 500; margin: 0.75rem 0 0.4rem; color: #a1a1aa; }
  p { margin-bottom: 0.6rem; }
  p:last-child { margin-bottom: 0; }
  ul, ol { margin-left: 1.25rem; margin-bottom: 0.6rem; padding-left: 0; }
  li { margin-bottom: 0.25rem; }
  li::marker { color: #71717a; }
  strong { color: #f4f4f5; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

  /* Clarification UI */
  .chorus-clarifying,
  .chorus-clarification {
    padding: 1.5rem;
    text-align: center;
  }

  .chorus-clarifying h3,
  .chorus-clarification h3 {
    color: #f4f4f5;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .chorus-clarifying p {
    color: #a1a1aa;
    font-size: 0.95rem;
  }

  .clarification-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    text-align: left;
    margin-bottom: 1.25rem;
  }

  .clarification-header svg {
    color: #06b6d4;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .clarification-explanation {
    color: #a1a1aa;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }

  .clarification-questions {
    background: rgba(6, 182, 212, 0.08);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.25rem;
    text-align: left;
  }

  .clarification-questions h4 {
    color: #06b6d4;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .clarification-questions ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .clarification-questions li {
    color: #d4d4d8;
    font-size: 0.95rem;
    padding: 0.4rem 0;
    padding-left: 1.25rem;
    position: relative;
  }

  .clarification-questions li::before {
    content: '?';
    position: absolute;
    left: 0;
    color: #06b6d4;
    font-weight: 600;
  }

  .clarification-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .clarification-option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
    font-family: inherit;
    color: inherit;
  }

  .clarification-option:hover {
    background: rgba(6, 182, 212, 0.1);
    border-color: rgba(6, 182, 212, 0.3);
    transform: translateY(-1px);
  }

  .clarification-option.refined {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.08);
  }

  .clarification-option.refined:hover {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.5);
  }

  .option-label {
    font-size: 0.75rem;
    color: #71717a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .clarification-option.refined .option-label {
    color: #10b981;
  }

  .option-text {
    color: #e4e4e7;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .clarification-actions {
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .clarification-skip {
    background: transparent;
    border: none;
    color: #71717a;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.75rem 1rem;
    transition: color 0.2s ease;
    font-family: inherit;
  }

  .clarification-skip:hover {
    color: #a1a1aa;
  }

  .clarification-search {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    border: none;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    font-family: inherit;
    margin-left: 1rem;
  }

  .clarification-search:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }

  /* Conversational Clarification Styles */
  .clarify-conversation {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .clarify-message {
    animation: slideUp 0.3s ease;
  }

  .clarify-message.ai {
    align-self: flex-start;
  }

  .clarify-message.user {
    align-self: flex-end;
  }

  .clarify-ai-message {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .clarify-avatar {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(6, 182, 212, 0.15);
    border-radius: 50%;
  }

  .clarify-ai-message .clarify-text {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    padding: 0.75rem 1rem;
    border-radius: 0 12px 12px 12px;
    color: #e4e4e7;
    font-size: 0.95rem;
    max-width: 90%;
    line-height: 1.5;
  }

  .clarify-user-message {
    display: flex;
    justify-content: flex-end;
  }

  .clarify-user-message .clarify-text {
    background: rgba(20, 184, 166, 0.15);
    border: 1px solid rgba(20, 184, 166, 0.25);
    padding: 0.75rem 1rem;
    border-radius: 12px 0 12px 12px;
    color: #e4e4e7;
    font-size: 0.95rem;
    max-width: 80%;
    line-height: 1.5;
  }

  .clarify-typing {
    display: flex;
    gap: 4px;
    padding: 0.75rem 1rem;
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 0 12px 12px 12px;
  }

  .clarify-typing span {
    width: 6px;
    height: 6px;
    background: #06b6d4;
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }

  .clarify-typing span:nth-child(2) { animation-delay: 0.2s; }
  .clarify-typing span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }

  .clarify-quick-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    margin-left: 2.5rem;
  }

  .clarify-quick-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e4e4e7;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .clarify-quick-btn:hover {
    background: rgba(6, 182, 212, 0.15);
    border-color: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }

  .clarify-input-row {
    display: flex;
    gap: 0.75rem;
    margin-left: 2.5rem;
    margin-bottom: 1rem;
  }

  .clarify-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #e4e4e7;
    font-size: 0.95rem;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .clarify-input:focus {
    outline: none;
    border-color: rgba(6, 182, 212, 0.4);
    background: rgba(255, 255, 255, 0.08);
  }

  .clarify-input::placeholder {
    color: #71717a;
  }

  .clarify-send-btn {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .clarify-send-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }

  .clarify-send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .clarify-ready {
    margin-left: 2.5rem;
    margin-bottom: 1rem;
  }

  .clarify-refined-preview {
    background: rgba(20, 184, 166, 0.1);
    border: 1px solid rgba(20, 184, 166, 0.25);
    border-radius: 8px;
    padding: 1rem;
  }

  .clarify-refined-label {
    display: block;
    font-size: 0.75rem;
    color: #14b8a6;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .clarify-refined-text {
    color: #e4e4e7;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  /* Mobile */
  @media (max-width: 600px) {
    .app-container { padding: 1rem; }
    .title { font-size: 2rem; }
    .input-section { padding: 1rem; }
    .form-footer { flex-direction: column; align-items: stretch; }
    .provider-pills { justify-content: center; }
    .submit-btn { width: 100%; }
    .highlight-header { flex-direction: column; align-items: flex-start; }
    .copy-btn { width: 100%; }

    .chorus-header { padding: 1.5rem 1rem; }
    .chorus-title { font-size: 2rem; }
    .chorus-main { padding: 0 1rem 1.5rem; }
    .chorus-search-section { padding: 1.25rem; }
    .chorus-input-wrapper { flex-direction: column; }
    .chorus-submit-btn { width: 100%; justify-content: center; }
    .chorus-summary-tabs { width: 100%; }
    .summary-tab { flex: 1; justify-content: center; }
    .summary-header { flex-wrap: wrap; }
    .summary-header .copy-btn { width: 100%; margin-left: 0; margin-top: 0.75rem; }
  }
`;document.head.appendChild(um);const Ov=P.createContext(null),Fv="/api/auth/status",Bv="/api/auth/login",Uv="/api/auth/logout";function Hv({children:e}){const[t,n]=P.useState(null),[r,i]=P.useState(!0),[s,l]=P.useState(null),[a,c]=P.useState(!0),[u,d]=P.useState(!1);P.useEffect(()=>{p()},[]);const p=async()=>{try{i(!0),l(null);const b=await fetch(Fv,{credentials:"include"});if(!b.ok)throw new Error("Failed to check auth status");const j=await b.json();c(j.auth_required),d(j.auth_configured),j.authenticated&&j.user?n(j.user):n(null)}catch(b){console.error("Auth status check failed:",b),l(b.message),c(!0)}finally{i(!1)}},h=P.useCallback((b=null)=>{const j=b||window.location.href,w=`${Bv}?return_to=${encodeURIComponent(j)}`;window.location.href=w},[]),f=P.useCallback((b=null)=>{const j=b||window.location.origin,w=`${Uv}?return_to=${encodeURIComponent(j)}`;window.location.href=w},[]),k=P.useCallback(b=>{if(!t||!t.permissions)return!1;if(t.permissions.includes("*")||t.permissions.includes(b))return!0;if(b.includes(":")){const[j]=b.split(":");if(t.permissions.includes(`${j}:*`))return!0}return!1},[t]),C=P.useCallback((...b)=>b.some(j=>k(j)),[k]),A=P.useCallback((...b)=>b.every(j=>k(j)),[k]),g=P.useCallback(b=>!t||!t.roles?!1:t.roles.includes(b),[t]),x={user:t,loading:r,error:s,authRequired:a,authConfigured:u,needsLogin:a&&!t&&!r,isAuthenticated:!!t,login:h,logout:f,checkAuthStatus:p,hasPermission:k,hasAnyPermission:C,hasAllPermissions:A,hasRole:g};return o.jsx(Ov.Provider,{value:x,children:e})}const dm=P.createContext(null),$v="Admin",Vv="Admin123!",El="prism_chorus_simple_auth",ho={prism:{name:"PRISM",tagline:"Public Health Intelligence System",description:"Evidence-based insights for public health decision making",colors:{primary:"#0f766e",secondary:"#0d9488",accent:"#14b8a6",background:"#f0fdfa",gradientFrom:"#f0fdfa",gradientTo:"#ccfbf1",cardBg:"rgba(255, 255, 255, 0.95)",text:"#134e4a",textLight:"#5eead4"}},chorus:{name:"Chorus",tagline:"Research Evidence Synthesis",description:"AI-powered systematic review and evidence analysis",colors:{primary:"#6d28d9",secondary:"#7c3aed",accent:"#8b5cf6",background:"#faf5ff",gradientFrom:"#faf5ff",gradientTo:"#ede9fe",cardBg:"rgba(255, 255, 255, 0.95)",text:"#4c1d95",textLight:"#c4b5fd"}}};function Wv({children:e}){const[t,n]=P.useState(!1),[r,i]=P.useState(!0);P.useEffect(()=>{sessionStorage.getItem(El)==="authenticated"&&n(!0),i(!1)},[]);const s=(a,c)=>{const u=(a||"").trim(),d=(c||"").trim();return u.toLowerCase()===$v.toLowerCase()&&d===Vv?(sessionStorage.setItem(El,"authenticated"),n(!0),{success:!0}):{success:!1,error:"Invalid username or password"}},l=()=>{sessionStorage.removeItem(El),n(!1)};return o.jsx(dm.Provider,{value:{isAuthenticated:t,loading:r,login:s,logout:l},children:e})}function pm(){const e=P.useContext(dm);if(!e)throw new Error("useSimpleAuth must be used within a SimpleAuthProvider");return e}function dp(){return null}function qv({children:e}){const{isAuthenticated:t,loading:n}=pm(),[r,i]=P.useState(()=>dp()),[s,l]=P.useState(!dp());return P.useEffect(()=>{if(r)return;const a=new AbortController,c=setTimeout(()=>a.abort(),3e3);return fetch("/api/config",{signal:a.signal}).then(u=>{if(!u.ok)throw new Error("Config fetch failed");return u.json()}).then(u=>{i(u.app_mode||"prism"),l(!1)}).catch(()=>{i("prism"),l(!1)}).finally(()=>{clearTimeout(c)}),()=>{a.abort(),clearTimeout(c)}},[r]),n||s?o.jsx(Yv,{mode:r}):t?e:o.jsx(Qv,{mode:r})}function Yv({mode:e="prism"}){const t=ho[e]||ho.prism;return o.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:`linear-gradient(180deg, ${t.colors.gradientFrom} 0%, ${t.colors.gradientTo} 100%)`},children:[o.jsx("div",{style:{width:"40px",height:"40px",border:`3px solid ${t.colors.textLight}`,borderTop:`3px solid ${t.colors.primary}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),o.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `})]})}function Qv({mode:e="prism"}){const{login:t}=pm(),[n,r]=P.useState(""),[i,s]=P.useState(""),[l,a]=P.useState(""),[c,u]=P.useState(!1),d=ho[e]||ho.prism,p=e==="chorus",h=f=>{f.preventDefault(),a(""),u(!0),setTimeout(()=>{const k=t(n,i);k.success||a(k.error),u(!1)},200)};return p?o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100dvh",padding:"20px",position:"relative",overflow:"hidden",fontFamily:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},children:[o.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:0},children:[o.jsx("img",{src:"/images/login-bg.jpg",alt:"",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}),o.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(135deg, rgba(12, 18, 34, 0.88) 0%, rgba(26, 26, 46, 0.85) 50%, rgba(15, 23, 42, 0.88) 100%)"}})]}),o.jsxs("div",{style:{position:"relative",zIndex:1,width:"100%",maxWidth:"420px"},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:"32px"},children:[o.jsx("img",{src:"/images/logo-2.png",alt:"Chorus",style:{height:"60px",width:"auto",marginBottom:"12px"}}),o.jsx("p",{style:{fontSize:"15px",color:"#94a3b8",margin:0,fontWeight:"500"},children:"Where AI Meets Evidence-Based Answers"})]}),o.jsxs("div",{style:{background:"rgba(30, 41, 59, 0.85)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",padding:"36px",borderRadius:"16px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4)",border:"1px solid rgba(148, 163, 184, 0.15)"},children:[o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("h2",{style:{fontSize:"20px",fontWeight:"600",color:"#f1f5f9",margin:"0 0 4px 0"},children:"Sign in"}),o.jsx("p",{style:{fontSize:"14px",color:"#94a3b8",margin:0},children:"Enter your credentials to continue"})]}),o.jsxs("form",{onSubmit:h,children:[o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("label",{style:{display:"block",fontSize:"14px",fontWeight:"500",color:"#e2e8f0",marginBottom:"6px"},children:"Username"}),o.jsx("input",{type:"text",value:n,onChange:f=>r(f.target.value),placeholder:"Enter username",required:!0,autoComplete:"username",style:{width:"100%",padding:"12px 14px",fontSize:"15px",border:"1px solid rgba(148, 163, 184, 0.2)",borderRadius:"10px",outline:"none",boxSizing:"border-box",transition:"border-color 0.15s ease, box-shadow 0.15s ease",backgroundColor:"rgba(15, 23, 42, 0.6)",color:"#f1f5f9"},onFocus:f=>{f.target.style.borderColor="rgba(6, 182, 212, 0.5)",f.target.style.boxShadow="0 0 0 3px rgba(6, 182, 212, 0.15)"},onBlur:f=>{f.target.style.borderColor="rgba(148, 163, 184, 0.2)",f.target.style.boxShadow="none"}})]}),o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("label",{style:{display:"block",fontSize:"14px",fontWeight:"500",color:"#e2e8f0",marginBottom:"6px"},children:"Password"}),o.jsx("input",{type:"password",value:i,onChange:f=>s(f.target.value),placeholder:"Enter password",required:!0,autoComplete:"current-password",style:{width:"100%",padding:"12px 14px",fontSize:"15px",border:"1px solid rgba(148, 163, 184, 0.2)",borderRadius:"10px",outline:"none",boxSizing:"border-box",transition:"border-color 0.15s ease, box-shadow 0.15s ease",backgroundColor:"rgba(15, 23, 42, 0.6)",color:"#f1f5f9"},onFocus:f=>{f.target.style.borderColor="rgba(6, 182, 212, 0.5)",f.target.style.boxShadow="0 0 0 3px rgba(6, 182, 212, 0.15)"},onBlur:f=>{f.target.style.borderColor="rgba(148, 163, 184, 0.2)",f.target.style.boxShadow="none"}})]}),l&&o.jsx("div",{style:{backgroundColor:"rgba(239, 68, 68, 0.15)",color:"#f87171",padding:"12px 14px",borderRadius:"10px",fontSize:"14px",marginBottom:"20px",border:"1px solid rgba(239, 68, 68, 0.3)"},children:l}),o.jsx("button",{type:"submit",disabled:c,style:{width:"100%",padding:"14px 16px",fontSize:"15px",fontWeight:"600",background:c?"#475569":"linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",color:"#ffffff",border:"none",borderRadius:"10px",cursor:c?"not-allowed":"pointer",transition:"all 0.2s ease"},onMouseOver:f=>{c||(f.target.style.transform="translateY(-1px)",f.target.style.boxShadow="0 6px 20px rgba(6, 182, 212, 0.4)")},onMouseOut:f=>{f.target.style.transform="translateY(0)",f.target.style.boxShadow="none"},children:c?"Signing in...":"Sign in"})]})]}),o.jsx("p",{style:{fontSize:"13px",color:"#64748b",textAlign:"center",marginTop:"24px"},children:"AI-powered evidence synthesis for better decisions"})]})]}):o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100vh",padding:"20px",background:`linear-gradient(180deg, ${d.colors.gradientFrom} 0%, ${d.colors.gradientTo} 100%)`,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:"32px"},children:[o.jsx("h1",{style:{fontSize:"42px",fontWeight:"700",color:d.colors.primary,margin:"0 0 8px 0",letterSpacing:"-0.5px"},children:d.name}),o.jsx("p",{style:{fontSize:"16px",color:d.colors.text,margin:0,opacity:.8,fontWeight:"500"},children:d.tagline})]}),o.jsxs("div",{style:{background:d.colors.cardBg,padding:"40px",borderRadius:"16px",boxShadow:"0 4px 24px rgba(0, 0, 0, 0.08)",width:"100%",maxWidth:"400px",border:"1px solid rgba(0, 0, 0, 0.06)"},children:[o.jsxs("div",{style:{marginBottom:"28px"},children:[o.jsx("h2",{style:{fontSize:"20px",fontWeight:"600",color:"#1f2937",margin:"0 0 4px 0"},children:"Sign in"}),o.jsx("p",{style:{fontSize:"14px",color:"#6b7280",margin:0},children:"Enter your credentials to continue"})]}),o.jsxs("form",{onSubmit:h,children:[o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("label",{style:{display:"block",fontSize:"14px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Username"}),o.jsx("input",{type:"text",value:n,onChange:f=>r(f.target.value),placeholder:"Enter username",required:!0,autoComplete:"username",style:{width:"100%",padding:"12px 14px",fontSize:"15px",border:"1px solid #d1d5db",borderRadius:"8px",outline:"none",boxSizing:"border-box",transition:"border-color 0.15s ease, box-shadow 0.15s ease",backgroundColor:"#fff"},onFocus:f=>{f.target.style.borderColor=d.colors.primary,f.target.style.boxShadow=`0 0 0 3px ${d.colors.primary}20`},onBlur:f=>{f.target.style.borderColor="#d1d5db",f.target.style.boxShadow="none"}})]}),o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("label",{style:{display:"block",fontSize:"14px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Password"}),o.jsx("input",{type:"password",value:i,onChange:f=>s(f.target.value),placeholder:"Enter password",required:!0,autoComplete:"current-password",style:{width:"100%",padding:"12px 14px",fontSize:"15px",border:"1px solid #d1d5db",borderRadius:"8px",outline:"none",boxSizing:"border-box",transition:"border-color 0.15s ease, box-shadow 0.15s ease",backgroundColor:"#fff"},onFocus:f=>{f.target.style.borderColor=d.colors.primary,f.target.style.boxShadow=`0 0 0 3px ${d.colors.primary}20`},onBlur:f=>{f.target.style.borderColor="#d1d5db",f.target.style.boxShadow="none"}})]}),l&&o.jsx("div",{style:{backgroundColor:"#fef2f2",color:"#dc2626",padding:"12px 14px",borderRadius:"8px",fontSize:"14px",marginBottom:"20px",border:"1px solid #fecaca"},children:l}),o.jsx("button",{type:"submit",disabled:c,style:{width:"100%",padding:"12px 16px",fontSize:"15px",fontWeight:"600",backgroundColor:c?"#9ca3af":d.colors.primary,color:"#ffffff",border:"none",borderRadius:"8px",cursor:c?"not-allowed":"pointer",transition:"background-color 0.15s ease"},onMouseOver:f=>{c||(f.target.style.backgroundColor=d.colors.secondary)},onMouseOut:f=>{c||(f.target.style.backgroundColor=d.colors.primary)},children:c?"Signing in...":"Sign in"})]})]}),o.jsx("p",{style:{fontSize:"13px",color:d.colors.text,opacity:.6,textAlign:"center",marginTop:"24px",maxWidth:"300px"},children:d.description})]})}function Gv(){return window.location.pathname==="/results"?o.jsx(ev,{}):o.jsx(Av,{})}zl.createRoot(document.getElementById("root")).render(o.jsx($m.StrictMode,{children:o.jsx(Wv,{children:o.jsx(qv,{children:o.jsx(Hv,{children:o.jsx(Gv,{})})})})}));
