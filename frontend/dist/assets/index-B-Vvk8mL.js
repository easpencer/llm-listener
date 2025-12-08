(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();var bl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function la(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ed={exports:{}},Ql={},zd={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ai=Symbol.for("react.element"),Em=Symbol.for("react.portal"),zm=Symbol.for("react.fragment"),_m=Symbol.for("react.strict_mode"),Pm=Symbol.for("react.profiler"),Im=Symbol.for("react.provider"),Tm=Symbol.for("react.context"),Am=Symbol.for("react.forward_ref"),Lm=Symbol.for("react.suspense"),Mm=Symbol.for("react.memo"),Rm=Symbol.for("react.lazy"),yu=Symbol.iterator;function Om(e){return e===null||typeof e!="object"?null:(e=yu&&e[yu]||e["@@iterator"],typeof e=="function"?e:null)}var _d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Pd=Object.assign,Id={};function Pr(e,t,n){this.props=e,this.context=t,this.refs=Id,this.updater=n||_d}Pr.prototype.isReactComponent={};Pr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Pr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Td(){}Td.prototype=Pr.prototype;function oa(e,t,n){this.props=e,this.context=t,this.refs=Id,this.updater=n||_d}var sa=oa.prototype=new Td;sa.constructor=oa;Pd(sa,Pr.prototype);sa.isPureReactComponent=!0;var xu=Array.isArray,Ad=Object.prototype.hasOwnProperty,aa={current:null},Ld={key:!0,ref:!0,__self:!0,__source:!0};function Md(e,t,n){var r,i={},l=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)Ad.call(t,r)&&!Ld.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var u=Array(a),c=0;c<a;c++)u[c]=arguments[c+2];i.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Ai,type:e,key:l,ref:o,props:i,_owner:aa.current}}function Dm(e,t){return{$$typeof:Ai,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ua(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ai}function Fm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var vu=/\/+/g;function ho(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Fm(""+e.key):t.toString(36)}function ol(e,t,n,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Ai:case Em:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+ho(o,0):r,xu(i)?(n="",e!=null&&(n=e.replace(vu,"$&/")+"/"),ol(i,t,n,"",function(c){return c})):i!=null&&(ua(i)&&(i=Dm(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(vu,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",xu(e))for(var a=0;a<e.length;a++){l=e[a];var u=r+ho(l,a);o+=ol(l,t,n,u,i)}else if(u=Om(e),typeof u=="function")for(e=u.call(e),a=0;!(l=e.next()).done;)l=l.value,u=r+ho(l,a++),o+=ol(l,t,n,u,i);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Bi(e,t,n){if(e==null)return e;var r=[],i=0;return ol(e,r,"","",function(l){return t.call(n,l,i++)}),r}function Bm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ke={current:null},sl={transition:null},Um={ReactCurrentDispatcher:Ke,ReactCurrentBatchConfig:sl,ReactCurrentOwner:aa};function Rd(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:Bi,forEach:function(e,t,n){Bi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Bi(e,function(){t++}),t},toArray:function(e){return Bi(e,function(t){return t})||[]},only:function(e){if(!ua(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ee.Component=Pr;ee.Fragment=zm;ee.Profiler=Pm;ee.PureComponent=oa;ee.StrictMode=_m;ee.Suspense=Lm;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Um;ee.act=Rd;ee.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Pd({},e.props),i=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=aa.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in t)Ad.call(t,u)&&!Ld.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&a!==void 0?a[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){a=Array(u);for(var c=0;c<u;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Ai,type:e.type,key:i,ref:l,props:r,_owner:o}};ee.createContext=function(e){return e={$$typeof:Tm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Im,_context:e},e.Consumer=e};ee.createElement=Md;ee.createFactory=function(e){var t=Md.bind(null,e);return t.type=e,t};ee.createRef=function(){return{current:null}};ee.forwardRef=function(e){return{$$typeof:Am,render:e}};ee.isValidElement=ua;ee.lazy=function(e){return{$$typeof:Rm,_payload:{_status:-1,_result:e},_init:Bm}};ee.memo=function(e,t){return{$$typeof:Mm,type:e,compare:t===void 0?null:t}};ee.startTransition=function(e){var t=sl.transition;sl.transition={};try{e()}finally{sl.transition=t}};ee.unstable_act=Rd;ee.useCallback=function(e,t){return Ke.current.useCallback(e,t)};ee.useContext=function(e){return Ke.current.useContext(e)};ee.useDebugValue=function(){};ee.useDeferredValue=function(e){return Ke.current.useDeferredValue(e)};ee.useEffect=function(e,t){return Ke.current.useEffect(e,t)};ee.useId=function(){return Ke.current.useId()};ee.useImperativeHandle=function(e,t,n){return Ke.current.useImperativeHandle(e,t,n)};ee.useInsertionEffect=function(e,t){return Ke.current.useInsertionEffect(e,t)};ee.useLayoutEffect=function(e,t){return Ke.current.useLayoutEffect(e,t)};ee.useMemo=function(e,t){return Ke.current.useMemo(e,t)};ee.useReducer=function(e,t,n){return Ke.current.useReducer(e,t,n)};ee.useRef=function(e){return Ke.current.useRef(e)};ee.useState=function(e){return Ke.current.useState(e)};ee.useSyncExternalStore=function(e,t,n){return Ke.current.useSyncExternalStore(e,t,n)};ee.useTransition=function(){return Ke.current.useTransition()};ee.version="18.3.1";zd.exports=ee;var B=zd.exports;const Hm=la(B);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vm=B,$m=Symbol.for("react.element"),Wm=Symbol.for("react.fragment"),qm=Object.prototype.hasOwnProperty,Qm=Vm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ym={key:!0,ref:!0,__self:!0,__source:!0};function Od(e,t,n){var r,i={},l=null,o=null;n!==void 0&&(l=""+n),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)qm.call(t,r)&&!Ym.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:$m,type:e,key:l,ref:o,props:i,_owner:Qm.current}}Ql.Fragment=Wm;Ql.jsx=Od;Ql.jsxs=Od;Ed.exports=Ql;var s=Ed.exports,ts={},Dd={exports:{}},gt={},Fd={exports:{}},Bd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,V){var y=T.length;T.push(V);e:for(;0<y;){var G=y-1>>>1,J=T[G];if(0<i(J,V))T[G]=V,T[y]=J,y=G;else break e}}function n(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var V=T[0],y=T.pop();if(y!==V){T[0]=y;e:for(var G=0,J=T.length,b=J>>>1;G<b;){var fe=2*(G+1)-1,ke=T[fe],ae=fe+1,Te=T[ae];if(0>i(ke,y))ae<J&&0>i(Te,ke)?(T[G]=Te,T[ae]=y,G=ae):(T[G]=ke,T[fe]=y,G=fe);else if(ae<J&&0>i(Te,y))T[G]=Te,T[ae]=y,G=ae;else break e}}return V}function i(T,V){var y=T.sortIndex-V.sortIndex;return y!==0?y:T.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var u=[],c=[],d=1,f=null,m=3,p=!1,k=!1,w=!1,E=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(T){for(var V=n(c);V!==null;){if(V.callback===null)r(c);else if(V.startTime<=T)r(c),V.sortIndex=V.expirationTime,t(u,V);else break;V=n(c)}}function j(T){if(w=!1,x(T),!k)if(n(u)!==null)k=!0,se(C);else{var V=n(c);V!==null&&le(j,V.startTime-T)}}function C(T,V){k=!1,w&&(w=!1,h(I),I=-1),p=!0;var y=m;try{for(x(V),f=n(u);f!==null&&(!(f.expirationTime>V)||T&&!R());){var G=f.callback;if(typeof G=="function"){f.callback=null,m=f.priorityLevel;var J=G(f.expirationTime<=V);V=e.unstable_now(),typeof J=="function"?f.callback=J:f===n(u)&&r(u),x(V)}else r(u);f=n(u)}if(f!==null)var b=!0;else{var fe=n(c);fe!==null&&le(j,fe.startTime-V),b=!1}return b}finally{f=null,m=y,p=!1}}var S=!1,z=null,I=-1,U=5,M=-1;function R(){return!(e.unstable_now()-M<U)}function O(){if(z!==null){var T=e.unstable_now();M=T;var V=!0;try{V=z(!0,T)}finally{V?Y():(S=!1,z=null)}}else S=!1}var Y;if(typeof g=="function")Y=function(){g(O)};else if(typeof MessageChannel<"u"){var ie=new MessageChannel,K=ie.port2;ie.port1.onmessage=O,Y=function(){K.postMessage(null)}}else Y=function(){E(O,0)};function se(T){z=T,S||(S=!0,Y())}function le(T,V){I=E(function(){T(e.unstable_now())},V)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){k||p||(k=!0,se(C))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(T){switch(m){case 1:case 2:case 3:var V=3;break;default:V=m}var y=m;m=V;try{return T()}finally{m=y}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,V){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var y=m;m=T;try{return V()}finally{m=y}},e.unstable_scheduleCallback=function(T,V,y){var G=e.unstable_now();switch(typeof y=="object"&&y!==null?(y=y.delay,y=typeof y=="number"&&0<y?G+y:G):y=G,T){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=y+J,T={id:d++,callback:V,priorityLevel:T,startTime:y,expirationTime:J,sortIndex:-1},y>G?(T.sortIndex=y,t(c,T),n(u)===null&&T===n(c)&&(w?(h(I),I=-1):w=!0,le(j,y-G))):(T.sortIndex=J,t(u,T),k||p||(k=!0,se(C))),T},e.unstable_shouldYield=R,e.unstable_wrapCallback=function(T){var V=m;return function(){var y=m;m=V;try{return T.apply(this,arguments)}finally{m=y}}}})(Bd);Fd.exports=Bd;var Gm=Fd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Km=B,ht=Gm;function _(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ud=new Set,hi={};function Kn(e,t){Sr(e,t),Sr(e+"Capture",t)}function Sr(e,t){for(hi[e]=t,e=0;e<t.length;e++)Ud.add(t[e])}var tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ns=Object.prototype.hasOwnProperty,Xm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,bu={},wu={};function Jm(e){return ns.call(wu,e)?!0:ns.call(bu,e)?!1:Xm.test(e)?wu[e]=!0:(bu[e]=!0,!1)}function Zm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function eh(e,t,n,r){if(t===null||typeof t>"u"||Zm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Xe(e,t,n,r,i,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var Me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Me[e]=new Xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Me[t]=new Xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Me[e]=new Xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Me[e]=new Xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Me[e]=new Xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Me[e]=new Xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Me[e]=new Xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Me[e]=new Xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Me[e]=new Xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var ca=/[\-:]([a-z])/g;function da(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ca,da);Me[t]=new Xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ca,da);Me[t]=new Xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ca,da);Me[t]=new Xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Me[e]=new Xe(e,1,!1,e.toLowerCase(),null,!1,!1)});Me.xlinkHref=new Xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Me[e]=new Xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function fa(e,t,n,r){var i=Me.hasOwnProperty(t)?Me[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(eh(t,n,i,r)&&(n=null),r||i===null?Jm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var on=Km.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ui=Symbol.for("react.element"),rr=Symbol.for("react.portal"),ir=Symbol.for("react.fragment"),pa=Symbol.for("react.strict_mode"),rs=Symbol.for("react.profiler"),Hd=Symbol.for("react.provider"),Vd=Symbol.for("react.context"),ma=Symbol.for("react.forward_ref"),is=Symbol.for("react.suspense"),ls=Symbol.for("react.suspense_list"),ha=Symbol.for("react.memo"),cn=Symbol.for("react.lazy"),$d=Symbol.for("react.offscreen"),ku=Symbol.iterator;function Hr(e){return e===null||typeof e!="object"?null:(e=ku&&e[ku]||e["@@iterator"],typeof e=="function"?e:null)}var we=Object.assign,go;function Zr(e){if(go===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);go=t&&t[1]||""}return`
`+go+e}var yo=!1;function xo(e,t){if(!e||yo)return"";yo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),l=r.stack.split(`
`),o=i.length-1,a=l.length-1;1<=o&&0<=a&&i[o]!==l[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==l[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==l[a]){var u=`
`+i[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=a);break}}}finally{yo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Zr(e):""}function th(e){switch(e.tag){case 5:return Zr(e.type);case 16:return Zr("Lazy");case 13:return Zr("Suspense");case 19:return Zr("SuspenseList");case 0:case 2:case 15:return e=xo(e.type,!1),e;case 11:return e=xo(e.type.render,!1),e;case 1:return e=xo(e.type,!0),e;default:return""}}function os(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ir:return"Fragment";case rr:return"Portal";case rs:return"Profiler";case pa:return"StrictMode";case is:return"Suspense";case ls:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Vd:return(e.displayName||"Context")+".Consumer";case Hd:return(e._context.displayName||"Context")+".Provider";case ma:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ha:return t=e.displayName||null,t!==null?t:os(e.type)||"Memo";case cn:t=e._payload,e=e._init;try{return os(e(t))}catch{}}return null}function nh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return os(t);case 8:return t===pa?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function jn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function rh(e){var t=Wd(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Hi(e){e._valueTracker||(e._valueTracker=rh(e))}function qd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Wd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function wl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ss(e,t){var n=t.checked;return we({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Su(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=jn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Qd(e,t){t=t.checked,t!=null&&fa(e,"checked",t,!1)}function as(e,t){Qd(e,t);var n=jn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?us(e,t.type,n):t.hasOwnProperty("defaultValue")&&us(e,t.type,jn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ju(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function us(e,t,n){(t!=="number"||wl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ei=Array.isArray;function hr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+jn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function cs(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(_(91));return we({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Cu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(_(92));if(ei(n)){if(1<n.length)throw Error(_(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:jn(n)}}function Yd(e,t){var n=jn(t.value),r=jn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Nu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Gd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ds(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Gd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Vi,Kd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Vi=Vi||document.createElement("div"),Vi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Vi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function gi(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ri={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ih=["Webkit","ms","Moz","O"];Object.keys(ri).forEach(function(e){ih.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ri[t]=ri[e]})});function Xd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ri.hasOwnProperty(e)&&ri[e]?(""+t).trim():t+"px"}function Jd(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Xd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var lh=we({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function fs(e,t){if(t){if(lh[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(_(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(_(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(_(61))}if(t.style!=null&&typeof t.style!="object")throw Error(_(62))}}function ps(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ms=null;function ga(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var hs=null,gr=null,yr=null;function Eu(e){if(e=Ri(e)){if(typeof hs!="function")throw Error(_(280));var t=e.stateNode;t&&(t=Jl(t),hs(e.stateNode,e.type,t))}}function Zd(e){gr?yr?yr.push(e):yr=[e]:gr=e}function ef(){if(gr){var e=gr,t=yr;if(yr=gr=null,Eu(e),t)for(e=0;e<t.length;e++)Eu(t[e])}}function tf(e,t){return e(t)}function nf(){}var vo=!1;function rf(e,t,n){if(vo)return e(t,n);vo=!0;try{return tf(e,t,n)}finally{vo=!1,(gr!==null||yr!==null)&&(nf(),ef())}}function yi(e,t){var n=e.stateNode;if(n===null)return null;var r=Jl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(_(231,t,typeof n));return n}var gs=!1;if(tn)try{var Vr={};Object.defineProperty(Vr,"passive",{get:function(){gs=!0}}),window.addEventListener("test",Vr,Vr),window.removeEventListener("test",Vr,Vr)}catch{gs=!1}function oh(e,t,n,r,i,l,o,a,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var ii=!1,kl=null,Sl=!1,ys=null,sh={onError:function(e){ii=!0,kl=e}};function ah(e,t,n,r,i,l,o,a,u){ii=!1,kl=null,oh.apply(sh,arguments)}function uh(e,t,n,r,i,l,o,a,u){if(ah.apply(this,arguments),ii){if(ii){var c=kl;ii=!1,kl=null}else throw Error(_(198));Sl||(Sl=!0,ys=c)}}function Xn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function lf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zu(e){if(Xn(e)!==e)throw Error(_(188))}function ch(e){var t=e.alternate;if(!t){if(t=Xn(e),t===null)throw Error(_(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===n)return zu(i),e;if(l===r)return zu(i),t;l=l.sibling}throw Error(_(188))}if(n.return!==r.return)n=i,r=l;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=l;break}if(a===r){o=!0,r=i,n=l;break}a=a.sibling}if(!o){for(a=l.child;a;){if(a===n){o=!0,n=l,r=i;break}if(a===r){o=!0,r=l,n=i;break}a=a.sibling}if(!o)throw Error(_(189))}}if(n.alternate!==r)throw Error(_(190))}if(n.tag!==3)throw Error(_(188));return n.stateNode.current===n?e:t}function of(e){return e=ch(e),e!==null?sf(e):null}function sf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=sf(e);if(t!==null)return t;e=e.sibling}return null}var af=ht.unstable_scheduleCallback,_u=ht.unstable_cancelCallback,dh=ht.unstable_shouldYield,fh=ht.unstable_requestPaint,Ce=ht.unstable_now,ph=ht.unstable_getCurrentPriorityLevel,ya=ht.unstable_ImmediatePriority,uf=ht.unstable_UserBlockingPriority,jl=ht.unstable_NormalPriority,mh=ht.unstable_LowPriority,cf=ht.unstable_IdlePriority,Yl=null,Vt=null;function hh(e){if(Vt&&typeof Vt.onCommitFiberRoot=="function")try{Vt.onCommitFiberRoot(Yl,e,void 0,(e.current.flags&128)===128)}catch{}}var At=Math.clz32?Math.clz32:xh,gh=Math.log,yh=Math.LN2;function xh(e){return e>>>=0,e===0?32:31-(gh(e)/yh|0)|0}var $i=64,Wi=4194304;function ti(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Cl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=ti(a):(l&=o,l!==0&&(r=ti(l)))}else o=n&~i,o!==0?r=ti(o):l!==0&&(r=ti(l));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,l=t&-t,i>=l||i===16&&(l&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-At(t),i=1<<n,r|=e[n],t&=~i;return r}function vh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bh(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-At(l),a=1<<o,u=i[o];u===-1?(!(a&n)||a&r)&&(i[o]=vh(a,t)):u<=t&&(e.expiredLanes|=a),l&=~a}}function xs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function df(){var e=$i;return $i<<=1,!($i&4194240)&&($i=64),e}function bo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Li(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-At(t),e[t]=n}function wh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-At(n),l=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~l}}function xa(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-At(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ce=0;function ff(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var pf,va,mf,hf,gf,vs=!1,qi=[],gn=null,yn=null,xn=null,xi=new Map,vi=new Map,fn=[],kh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pu(e,t){switch(e){case"focusin":case"focusout":gn=null;break;case"dragenter":case"dragleave":yn=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":xi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":vi.delete(t.pointerId)}}function $r(e,t,n,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},t!==null&&(t=Ri(t),t!==null&&va(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Sh(e,t,n,r,i){switch(t){case"focusin":return gn=$r(gn,e,t,n,r,i),!0;case"dragenter":return yn=$r(yn,e,t,n,r,i),!0;case"mouseover":return xn=$r(xn,e,t,n,r,i),!0;case"pointerover":var l=i.pointerId;return xi.set(l,$r(xi.get(l)||null,e,t,n,r,i)),!0;case"gotpointercapture":return l=i.pointerId,vi.set(l,$r(vi.get(l)||null,e,t,n,r,i)),!0}return!1}function yf(e){var t=Bn(e.target);if(t!==null){var n=Xn(t);if(n!==null){if(t=n.tag,t===13){if(t=lf(n),t!==null){e.blockedOn=t,gf(e.priority,function(){mf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function al(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ms=r,n.target.dispatchEvent(r),ms=null}else return t=Ri(n),t!==null&&va(t),e.blockedOn=n,!1;t.shift()}return!0}function Iu(e,t,n){al(e)&&n.delete(t)}function jh(){vs=!1,gn!==null&&al(gn)&&(gn=null),yn!==null&&al(yn)&&(yn=null),xn!==null&&al(xn)&&(xn=null),xi.forEach(Iu),vi.forEach(Iu)}function Wr(e,t){e.blockedOn===t&&(e.blockedOn=null,vs||(vs=!0,ht.unstable_scheduleCallback(ht.unstable_NormalPriority,jh)))}function bi(e){function t(i){return Wr(i,e)}if(0<qi.length){Wr(qi[0],e);for(var n=1;n<qi.length;n++){var r=qi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(gn!==null&&Wr(gn,e),yn!==null&&Wr(yn,e),xn!==null&&Wr(xn,e),xi.forEach(t),vi.forEach(t),n=0;n<fn.length;n++)r=fn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<fn.length&&(n=fn[0],n.blockedOn===null);)yf(n),n.blockedOn===null&&fn.shift()}var xr=on.ReactCurrentBatchConfig,Nl=!0;function Ch(e,t,n,r){var i=ce,l=xr.transition;xr.transition=null;try{ce=1,ba(e,t,n,r)}finally{ce=i,xr.transition=l}}function Nh(e,t,n,r){var i=ce,l=xr.transition;xr.transition=null;try{ce=4,ba(e,t,n,r)}finally{ce=i,xr.transition=l}}function ba(e,t,n,r){if(Nl){var i=bs(e,t,n,r);if(i===null)Po(e,t,r,El,n),Pu(e,r);else if(Sh(i,e,t,n,r))r.stopPropagation();else if(Pu(e,r),t&4&&-1<kh.indexOf(e)){for(;i!==null;){var l=Ri(i);if(l!==null&&pf(l),l=bs(e,t,n,r),l===null&&Po(e,t,r,El,n),l===i)break;i=l}i!==null&&r.stopPropagation()}else Po(e,t,r,null,n)}}var El=null;function bs(e,t,n,r){if(El=null,e=ga(r),e=Bn(e),e!==null)if(t=Xn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=lf(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return El=e,null}function xf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ph()){case ya:return 1;case uf:return 4;case jl:case mh:return 16;case cf:return 536870912;default:return 16}default:return 16}}var mn=null,wa=null,ul=null;function vf(){if(ul)return ul;var e,t=wa,n=t.length,r,i="value"in mn?mn.value:mn.textContent,l=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[l-r];r++);return ul=i.slice(e,1<r?1-r:void 0)}function cl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Qi(){return!0}function Tu(){return!1}function yt(e){function t(n,r,i,l,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(l):l[a]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Qi:Tu,this.isPropagationStopped=Tu,this}return we(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Qi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Qi)},persist:function(){},isPersistent:Qi}),t}var Ir={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ka=yt(Ir),Mi=we({},Ir,{view:0,detail:0}),Eh=yt(Mi),wo,ko,qr,Gl=we({},Mi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==qr&&(qr&&e.type==="mousemove"?(wo=e.screenX-qr.screenX,ko=e.screenY-qr.screenY):ko=wo=0,qr=e),wo)},movementY:function(e){return"movementY"in e?e.movementY:ko}}),Au=yt(Gl),zh=we({},Gl,{dataTransfer:0}),_h=yt(zh),Ph=we({},Mi,{relatedTarget:0}),So=yt(Ph),Ih=we({},Ir,{animationName:0,elapsedTime:0,pseudoElement:0}),Th=yt(Ih),Ah=we({},Ir,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Lh=yt(Ah),Mh=we({},Ir,{data:0}),Lu=yt(Mh),Rh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Oh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Fh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Dh[e])?!!t[e]:!1}function Sa(){return Fh}var Bh=we({},Mi,{key:function(e){if(e.key){var t=Rh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Oh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sa,charCode:function(e){return e.type==="keypress"?cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Uh=yt(Bh),Hh=we({},Gl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mu=yt(Hh),Vh=we({},Mi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sa}),$h=yt(Vh),Wh=we({},Ir,{propertyName:0,elapsedTime:0,pseudoElement:0}),qh=yt(Wh),Qh=we({},Gl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Yh=yt(Qh),Gh=[9,13,27,32],ja=tn&&"CompositionEvent"in window,li=null;tn&&"documentMode"in document&&(li=document.documentMode);var Kh=tn&&"TextEvent"in window&&!li,bf=tn&&(!ja||li&&8<li&&11>=li),Ru=" ",Ou=!1;function wf(e,t){switch(e){case"keyup":return Gh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var lr=!1;function Xh(e,t){switch(e){case"compositionend":return kf(t);case"keypress":return t.which!==32?null:(Ou=!0,Ru);case"textInput":return e=t.data,e===Ru&&Ou?null:e;default:return null}}function Jh(e,t){if(lr)return e==="compositionend"||!ja&&wf(e,t)?(e=vf(),ul=wa=mn=null,lr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return bf&&t.locale!=="ko"?null:t.data;default:return null}}var Zh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Du(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Zh[e.type]:t==="textarea"}function Sf(e,t,n,r){Zd(r),t=zl(t,"onChange"),0<t.length&&(n=new ka("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var oi=null,wi=null;function eg(e){Lf(e,0)}function Kl(e){var t=ar(e);if(qd(t))return e}function tg(e,t){if(e==="change")return t}var jf=!1;if(tn){var jo;if(tn){var Co="oninput"in document;if(!Co){var Fu=document.createElement("div");Fu.setAttribute("oninput","return;"),Co=typeof Fu.oninput=="function"}jo=Co}else jo=!1;jf=jo&&(!document.documentMode||9<document.documentMode)}function Bu(){oi&&(oi.detachEvent("onpropertychange",Cf),wi=oi=null)}function Cf(e){if(e.propertyName==="value"&&Kl(wi)){var t=[];Sf(t,wi,e,ga(e)),rf(eg,t)}}function ng(e,t,n){e==="focusin"?(Bu(),oi=t,wi=n,oi.attachEvent("onpropertychange",Cf)):e==="focusout"&&Bu()}function rg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Kl(wi)}function ig(e,t){if(e==="click")return Kl(t)}function lg(e,t){if(e==="input"||e==="change")return Kl(t)}function og(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Mt=typeof Object.is=="function"?Object.is:og;function ki(e,t){if(Mt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ns.call(t,i)||!Mt(e[i],t[i]))return!1}return!0}function Uu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Hu(e,t){var n=Uu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Uu(n)}}function Nf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ef(){for(var e=window,t=wl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=wl(e.document)}return t}function Ca(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function sg(e){var t=Ef(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Nf(n.ownerDocument.documentElement,n)){if(r!==null&&Ca(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=Hu(n,l);var o=Hu(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ag=tn&&"documentMode"in document&&11>=document.documentMode,or=null,ws=null,si=null,ks=!1;function Vu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ks||or==null||or!==wl(r)||(r=or,"selectionStart"in r&&Ca(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),si&&ki(si,r)||(si=r,r=zl(ws,"onSelect"),0<r.length&&(t=new ka("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=or)))}function Yi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var sr={animationend:Yi("Animation","AnimationEnd"),animationiteration:Yi("Animation","AnimationIteration"),animationstart:Yi("Animation","AnimationStart"),transitionend:Yi("Transition","TransitionEnd")},No={},zf={};tn&&(zf=document.createElement("div").style,"AnimationEvent"in window||(delete sr.animationend.animation,delete sr.animationiteration.animation,delete sr.animationstart.animation),"TransitionEvent"in window||delete sr.transitionend.transition);function Xl(e){if(No[e])return No[e];if(!sr[e])return e;var t=sr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in zf)return No[e]=t[n];return e}var _f=Xl("animationend"),Pf=Xl("animationiteration"),If=Xl("animationstart"),Tf=Xl("transitionend"),Af=new Map,$u="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nn(e,t){Af.set(e,t),Kn(t,[e])}for(var Eo=0;Eo<$u.length;Eo++){var zo=$u[Eo],ug=zo.toLowerCase(),cg=zo[0].toUpperCase()+zo.slice(1);Nn(ug,"on"+cg)}Nn(_f,"onAnimationEnd");Nn(Pf,"onAnimationIteration");Nn(If,"onAnimationStart");Nn("dblclick","onDoubleClick");Nn("focusin","onFocus");Nn("focusout","onBlur");Nn(Tf,"onTransitionEnd");Sr("onMouseEnter",["mouseout","mouseover"]);Sr("onMouseLeave",["mouseout","mouseover"]);Sr("onPointerEnter",["pointerout","pointerover"]);Sr("onPointerLeave",["pointerout","pointerover"]);Kn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Kn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Kn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Kn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Kn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Kn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ni="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dg=new Set("cancel close invalid load scroll toggle".split(" ").concat(ni));function Wu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,uh(r,t,void 0,e),e.currentTarget=null}function Lf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],u=a.instance,c=a.currentTarget;if(a=a.listener,u!==l&&i.isPropagationStopped())break e;Wu(i,a,c),l=u}else for(o=0;o<r.length;o++){if(a=r[o],u=a.instance,c=a.currentTarget,a=a.listener,u!==l&&i.isPropagationStopped())break e;Wu(i,a,c),l=u}}}if(Sl)throw e=ys,Sl=!1,ys=null,e}function ge(e,t){var n=t[Es];n===void 0&&(n=t[Es]=new Set);var r=e+"__bubble";n.has(r)||(Mf(t,e,2,!1),n.add(r))}function _o(e,t,n){var r=0;t&&(r|=4),Mf(n,e,r,t)}var Gi="_reactListening"+Math.random().toString(36).slice(2);function Si(e){if(!e[Gi]){e[Gi]=!0,Ud.forEach(function(n){n!=="selectionchange"&&(dg.has(n)||_o(n,!1,e),_o(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gi]||(t[Gi]=!0,_o("selectionchange",!1,t))}}function Mf(e,t,n,r){switch(xf(t)){case 1:var i=Ch;break;case 4:i=Nh;break;default:i=ba}n=i.bind(null,t,n,e),i=void 0,!gs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Po(e,t,n,r,i){var l=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;a!==null;){if(o=Bn(a),o===null)return;if(u=o.tag,u===5||u===6){r=l=o;continue e}a=a.parentNode}}r=r.return}rf(function(){var c=l,d=ga(n),f=[];e:{var m=Af.get(e);if(m!==void 0){var p=ka,k=e;switch(e){case"keypress":if(cl(n)===0)break e;case"keydown":case"keyup":p=Uh;break;case"focusin":k="focus",p=So;break;case"focusout":k="blur",p=So;break;case"beforeblur":case"afterblur":p=So;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Au;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=_h;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=$h;break;case _f:case Pf:case If:p=Th;break;case Tf:p=qh;break;case"scroll":p=Eh;break;case"wheel":p=Yh;break;case"copy":case"cut":case"paste":p=Lh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Mu}var w=(t&4)!==0,E=!w&&e==="scroll",h=w?m!==null?m+"Capture":null:m;w=[];for(var g=c,x;g!==null;){x=g;var j=x.stateNode;if(x.tag===5&&j!==null&&(x=j,h!==null&&(j=yi(g,h),j!=null&&w.push(ji(g,j,x)))),E)break;g=g.return}0<w.length&&(m=new p(m,k,null,n,d),f.push({event:m,listeners:w}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",m&&n!==ms&&(k=n.relatedTarget||n.fromElement)&&(Bn(k)||k[nn]))break e;if((p||m)&&(m=d.window===d?d:(m=d.ownerDocument)?m.defaultView||m.parentWindow:window,p?(k=n.relatedTarget||n.toElement,p=c,k=k?Bn(k):null,k!==null&&(E=Xn(k),k!==E||k.tag!==5&&k.tag!==6)&&(k=null)):(p=null,k=c),p!==k)){if(w=Au,j="onMouseLeave",h="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(w=Mu,j="onPointerLeave",h="onPointerEnter",g="pointer"),E=p==null?m:ar(p),x=k==null?m:ar(k),m=new w(j,g+"leave",p,n,d),m.target=E,m.relatedTarget=x,j=null,Bn(d)===c&&(w=new w(h,g+"enter",k,n,d),w.target=x,w.relatedTarget=E,j=w),E=j,p&&k)t:{for(w=p,h=k,g=0,x=w;x;x=tr(x))g++;for(x=0,j=h;j;j=tr(j))x++;for(;0<g-x;)w=tr(w),g--;for(;0<x-g;)h=tr(h),x--;for(;g--;){if(w===h||h!==null&&w===h.alternate)break t;w=tr(w),h=tr(h)}w=null}else w=null;p!==null&&qu(f,m,p,w,!1),k!==null&&E!==null&&qu(f,E,k,w,!0)}}e:{if(m=c?ar(c):window,p=m.nodeName&&m.nodeName.toLowerCase(),p==="select"||p==="input"&&m.type==="file")var C=tg;else if(Du(m))if(jf)C=lg;else{C=rg;var S=ng}else(p=m.nodeName)&&p.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(C=ig);if(C&&(C=C(e,c))){Sf(f,C,n,d);break e}S&&S(e,m,c),e==="focusout"&&(S=m._wrapperState)&&S.controlled&&m.type==="number"&&us(m,"number",m.value)}switch(S=c?ar(c):window,e){case"focusin":(Du(S)||S.contentEditable==="true")&&(or=S,ws=c,si=null);break;case"focusout":si=ws=or=null;break;case"mousedown":ks=!0;break;case"contextmenu":case"mouseup":case"dragend":ks=!1,Vu(f,n,d);break;case"selectionchange":if(ag)break;case"keydown":case"keyup":Vu(f,n,d)}var z;if(ja)e:{switch(e){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else lr?wf(e,n)&&(I="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(I="onCompositionStart");I&&(bf&&n.locale!=="ko"&&(lr||I!=="onCompositionStart"?I==="onCompositionEnd"&&lr&&(z=vf()):(mn=d,wa="value"in mn?mn.value:mn.textContent,lr=!0)),S=zl(c,I),0<S.length&&(I=new Lu(I,e,null,n,d),f.push({event:I,listeners:S}),z?I.data=z:(z=kf(n),z!==null&&(I.data=z)))),(z=Kh?Xh(e,n):Jh(e,n))&&(c=zl(c,"onBeforeInput"),0<c.length&&(d=new Lu("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=z))}Lf(f,t)})}function ji(e,t,n){return{instance:e,listener:t,currentTarget:n}}function zl(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=yi(e,n),l!=null&&r.unshift(ji(e,l,i)),l=yi(e,t),l!=null&&r.push(ji(e,l,i))),e=e.return}return r}function tr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function qu(e,t,n,r,i){for(var l=t._reactName,o=[];n!==null&&n!==r;){var a=n,u=a.alternate,c=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&c!==null&&(a=c,i?(u=yi(n,l),u!=null&&o.unshift(ji(n,u,a))):i||(u=yi(n,l),u!=null&&o.push(ji(n,u,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var fg=/\r\n?/g,pg=/\u0000|\uFFFD/g;function Qu(e){return(typeof e=="string"?e:""+e).replace(fg,`
`).replace(pg,"")}function Ki(e,t,n){if(t=Qu(t),Qu(e)!==t&&n)throw Error(_(425))}function _l(){}var Ss=null,js=null;function Cs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ns=typeof setTimeout=="function"?setTimeout:void 0,mg=typeof clearTimeout=="function"?clearTimeout:void 0,Yu=typeof Promise=="function"?Promise:void 0,hg=typeof queueMicrotask=="function"?queueMicrotask:typeof Yu<"u"?function(e){return Yu.resolve(null).then(e).catch(gg)}:Ns;function gg(e){setTimeout(function(){throw e})}function Io(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),bi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);bi(t)}function vn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Gu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Tr=Math.random().toString(36).slice(2),Ut="__reactFiber$"+Tr,Ci="__reactProps$"+Tr,nn="__reactContainer$"+Tr,Es="__reactEvents$"+Tr,yg="__reactListeners$"+Tr,xg="__reactHandles$"+Tr;function Bn(e){var t=e[Ut];if(t)return t;for(var n=e.parentNode;n;){if(t=n[nn]||n[Ut]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Gu(e);e!==null;){if(n=e[Ut])return n;e=Gu(e)}return t}e=n,n=e.parentNode}return null}function Ri(e){return e=e[Ut]||e[nn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ar(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(_(33))}function Jl(e){return e[Ci]||null}var zs=[],ur=-1;function En(e){return{current:e}}function ye(e){0>ur||(e.current=zs[ur],zs[ur]=null,ur--)}function me(e,t){ur++,zs[ur]=e.current,e.current=t}var Cn={},Ve=En(Cn),rt=En(!1),Wn=Cn;function jr(e,t){var n=e.type.contextTypes;if(!n)return Cn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in n)i[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function it(e){return e=e.childContextTypes,e!=null}function Pl(){ye(rt),ye(Ve)}function Ku(e,t,n){if(Ve.current!==Cn)throw Error(_(168));me(Ve,t),me(rt,n)}function Rf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(_(108,nh(e)||"Unknown",i));return we({},n,r)}function Il(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Cn,Wn=Ve.current,me(Ve,e),me(rt,rt.current),!0}function Xu(e,t,n){var r=e.stateNode;if(!r)throw Error(_(169));n?(e=Rf(e,t,Wn),r.__reactInternalMemoizedMergedChildContext=e,ye(rt),ye(Ve),me(Ve,e)):ye(rt),me(rt,n)}var Kt=null,Zl=!1,To=!1;function Of(e){Kt===null?Kt=[e]:Kt.push(e)}function vg(e){Zl=!0,Of(e)}function zn(){if(!To&&Kt!==null){To=!0;var e=0,t=ce;try{var n=Kt;for(ce=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Kt=null,Zl=!1}catch(i){throw Kt!==null&&(Kt=Kt.slice(e+1)),af(ya,zn),i}finally{ce=t,To=!1}}return null}var cr=[],dr=0,Tl=null,Al=0,vt=[],bt=0,qn=null,Xt=1,Jt="";function Rn(e,t){cr[dr++]=Al,cr[dr++]=Tl,Tl=e,Al=t}function Df(e,t,n){vt[bt++]=Xt,vt[bt++]=Jt,vt[bt++]=qn,qn=e;var r=Xt;e=Jt;var i=32-At(r)-1;r&=~(1<<i),n+=1;var l=32-At(t)+i;if(30<l){var o=i-i%5;l=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Xt=1<<32-At(t)+i|n<<i|r,Jt=l+e}else Xt=1<<l|n<<i|r,Jt=e}function Na(e){e.return!==null&&(Rn(e,1),Df(e,1,0))}function Ea(e){for(;e===Tl;)Tl=cr[--dr],cr[dr]=null,Al=cr[--dr],cr[dr]=null;for(;e===qn;)qn=vt[--bt],vt[bt]=null,Jt=vt[--bt],vt[bt]=null,Xt=vt[--bt],vt[bt]=null}var mt=null,ft=null,xe=!1,Tt=null;function Ff(e,t){var n=kt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ju(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,mt=e,ft=vn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,mt=e,ft=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=qn!==null?{id:Xt,overflow:Jt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=kt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,mt=e,ft=null,!0):!1;default:return!1}}function _s(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ps(e){if(xe){var t=ft;if(t){var n=t;if(!Ju(e,t)){if(_s(e))throw Error(_(418));t=vn(n.nextSibling);var r=mt;t&&Ju(e,t)?Ff(r,n):(e.flags=e.flags&-4097|2,xe=!1,mt=e)}}else{if(_s(e))throw Error(_(418));e.flags=e.flags&-4097|2,xe=!1,mt=e}}}function Zu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;mt=e}function Xi(e){if(e!==mt)return!1;if(!xe)return Zu(e),xe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Cs(e.type,e.memoizedProps)),t&&(t=ft)){if(_s(e))throw Bf(),Error(_(418));for(;t;)Ff(e,t),t=vn(t.nextSibling)}if(Zu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(_(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ft=vn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ft=null}}else ft=mt?vn(e.stateNode.nextSibling):null;return!0}function Bf(){for(var e=ft;e;)e=vn(e.nextSibling)}function Cr(){ft=mt=null,xe=!1}function za(e){Tt===null?Tt=[e]:Tt.push(e)}var bg=on.ReactCurrentBatchConfig;function Qr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(_(309));var r=n.stateNode}if(!r)throw Error(_(147,e));var i=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var a=i.refs;o===null?delete a[l]:a[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(_(284));if(!n._owner)throw Error(_(290,e))}return e}function Ji(e,t){throw e=Object.prototype.toString.call(t),Error(_(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ec(e){var t=e._init;return t(e._payload)}function Uf(e){function t(h,g){if(e){var x=h.deletions;x===null?(h.deletions=[g],h.flags|=16):x.push(g)}}function n(h,g){if(!e)return null;for(;g!==null;)t(h,g),g=g.sibling;return null}function r(h,g){for(h=new Map;g!==null;)g.key!==null?h.set(g.key,g):h.set(g.index,g),g=g.sibling;return h}function i(h,g){return h=Sn(h,g),h.index=0,h.sibling=null,h}function l(h,g,x){return h.index=x,e?(x=h.alternate,x!==null?(x=x.index,x<g?(h.flags|=2,g):x):(h.flags|=2,g)):(h.flags|=1048576,g)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function a(h,g,x,j){return g===null||g.tag!==6?(g=Fo(x,h.mode,j),g.return=h,g):(g=i(g,x),g.return=h,g)}function u(h,g,x,j){var C=x.type;return C===ir?d(h,g,x.props.children,j,x.key):g!==null&&(g.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===cn&&ec(C)===g.type)?(j=i(g,x.props),j.ref=Qr(h,g,x),j.return=h,j):(j=yl(x.type,x.key,x.props,null,h.mode,j),j.ref=Qr(h,g,x),j.return=h,j)}function c(h,g,x,j){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=Bo(x,h.mode,j),g.return=h,g):(g=i(g,x.children||[]),g.return=h,g)}function d(h,g,x,j,C){return g===null||g.tag!==7?(g=$n(x,h.mode,j,C),g.return=h,g):(g=i(g,x),g.return=h,g)}function f(h,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Fo(""+g,h.mode,x),g.return=h,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ui:return x=yl(g.type,g.key,g.props,null,h.mode,x),x.ref=Qr(h,null,g),x.return=h,x;case rr:return g=Bo(g,h.mode,x),g.return=h,g;case cn:var j=g._init;return f(h,j(g._payload),x)}if(ei(g)||Hr(g))return g=$n(g,h.mode,x,null),g.return=h,g;Ji(h,g)}return null}function m(h,g,x,j){var C=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return C!==null?null:a(h,g,""+x,j);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ui:return x.key===C?u(h,g,x,j):null;case rr:return x.key===C?c(h,g,x,j):null;case cn:return C=x._init,m(h,g,C(x._payload),j)}if(ei(x)||Hr(x))return C!==null?null:d(h,g,x,j,null);Ji(h,x)}return null}function p(h,g,x,j,C){if(typeof j=="string"&&j!==""||typeof j=="number")return h=h.get(x)||null,a(g,h,""+j,C);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case Ui:return h=h.get(j.key===null?x:j.key)||null,u(g,h,j,C);case rr:return h=h.get(j.key===null?x:j.key)||null,c(g,h,j,C);case cn:var S=j._init;return p(h,g,x,S(j._payload),C)}if(ei(j)||Hr(j))return h=h.get(x)||null,d(g,h,j,C,null);Ji(g,j)}return null}function k(h,g,x,j){for(var C=null,S=null,z=g,I=g=0,U=null;z!==null&&I<x.length;I++){z.index>I?(U=z,z=null):U=z.sibling;var M=m(h,z,x[I],j);if(M===null){z===null&&(z=U);break}e&&z&&M.alternate===null&&t(h,z),g=l(M,g,I),S===null?C=M:S.sibling=M,S=M,z=U}if(I===x.length)return n(h,z),xe&&Rn(h,I),C;if(z===null){for(;I<x.length;I++)z=f(h,x[I],j),z!==null&&(g=l(z,g,I),S===null?C=z:S.sibling=z,S=z);return xe&&Rn(h,I),C}for(z=r(h,z);I<x.length;I++)U=p(z,h,I,x[I],j),U!==null&&(e&&U.alternate!==null&&z.delete(U.key===null?I:U.key),g=l(U,g,I),S===null?C=U:S.sibling=U,S=U);return e&&z.forEach(function(R){return t(h,R)}),xe&&Rn(h,I),C}function w(h,g,x,j){var C=Hr(x);if(typeof C!="function")throw Error(_(150));if(x=C.call(x),x==null)throw Error(_(151));for(var S=C=null,z=g,I=g=0,U=null,M=x.next();z!==null&&!M.done;I++,M=x.next()){z.index>I?(U=z,z=null):U=z.sibling;var R=m(h,z,M.value,j);if(R===null){z===null&&(z=U);break}e&&z&&R.alternate===null&&t(h,z),g=l(R,g,I),S===null?C=R:S.sibling=R,S=R,z=U}if(M.done)return n(h,z),xe&&Rn(h,I),C;if(z===null){for(;!M.done;I++,M=x.next())M=f(h,M.value,j),M!==null&&(g=l(M,g,I),S===null?C=M:S.sibling=M,S=M);return xe&&Rn(h,I),C}for(z=r(h,z);!M.done;I++,M=x.next())M=p(z,h,I,M.value,j),M!==null&&(e&&M.alternate!==null&&z.delete(M.key===null?I:M.key),g=l(M,g,I),S===null?C=M:S.sibling=M,S=M);return e&&z.forEach(function(O){return t(h,O)}),xe&&Rn(h,I),C}function E(h,g,x,j){if(typeof x=="object"&&x!==null&&x.type===ir&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ui:e:{for(var C=x.key,S=g;S!==null;){if(S.key===C){if(C=x.type,C===ir){if(S.tag===7){n(h,S.sibling),g=i(S,x.props.children),g.return=h,h=g;break e}}else if(S.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===cn&&ec(C)===S.type){n(h,S.sibling),g=i(S,x.props),g.ref=Qr(h,S,x),g.return=h,h=g;break e}n(h,S);break}else t(h,S);S=S.sibling}x.type===ir?(g=$n(x.props.children,h.mode,j,x.key),g.return=h,h=g):(j=yl(x.type,x.key,x.props,null,h.mode,j),j.ref=Qr(h,g,x),j.return=h,h=j)}return o(h);case rr:e:{for(S=x.key;g!==null;){if(g.key===S)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){n(h,g.sibling),g=i(g,x.children||[]),g.return=h,h=g;break e}else{n(h,g);break}else t(h,g);g=g.sibling}g=Bo(x,h.mode,j),g.return=h,h=g}return o(h);case cn:return S=x._init,E(h,g,S(x._payload),j)}if(ei(x))return k(h,g,x,j);if(Hr(x))return w(h,g,x,j);Ji(h,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(n(h,g.sibling),g=i(g,x),g.return=h,h=g):(n(h,g),g=Fo(x,h.mode,j),g.return=h,h=g),o(h)):n(h,g)}return E}var Nr=Uf(!0),Hf=Uf(!1),Ll=En(null),Ml=null,fr=null,_a=null;function Pa(){_a=fr=Ml=null}function Ia(e){var t=Ll.current;ye(Ll),e._currentValue=t}function Is(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function vr(e,t){Ml=e,_a=fr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(nt=!0),e.firstContext=null)}function jt(e){var t=e._currentValue;if(_a!==e)if(e={context:e,memoizedValue:t,next:null},fr===null){if(Ml===null)throw Error(_(308));fr=e,Ml.dependencies={lanes:0,firstContext:e}}else fr=fr.next=e;return t}var Un=null;function Ta(e){Un===null?Un=[e]:Un.push(e)}function Vf(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Ta(t)):(n.next=i.next,i.next=n),t.interleaved=n,rn(e,r)}function rn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var dn=!1;function Aa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function $f(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Zt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function bn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,re&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,rn(e,n)}return i=r.interleaved,i===null?(t.next=t,Ta(r)):(t.next=i.next,i.next=t),r.interleaved=t,rn(e,n)}function dl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xa(e,n)}}function tc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?i=l=o:l=l.next=o,n=n.next}while(n!==null);l===null?i=l=t:l=l.next=t}else i=l=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Rl(e,t,n,r){var i=e.updateQueue;dn=!1;var l=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var u=a,c=u.next;u.next=null,o===null?l=c:o.next=c,o=u;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=u))}if(l!==null){var f=i.baseState;o=0,d=c=u=null,a=l;do{var m=a.lane,p=a.eventTime;if((r&m)===m){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var k=e,w=a;switch(m=t,p=n,w.tag){case 1:if(k=w.payload,typeof k=="function"){f=k.call(p,f,m);break e}f=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=w.payload,m=typeof k=="function"?k.call(p,f,m):k,m==null)break e;f=we({},f,m);break e;case 2:dn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[a]:m.push(a))}else p={eventTime:p,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=p,u=f):d=d.next=p,o|=m;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;m=a,a=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(d===null&&(u=f),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else l===null&&(i.shared.lanes=0);Yn|=o,e.lanes=o,e.memoizedState=f}}function nc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(_(191,i));i.call(r)}}}var Oi={},$t=En(Oi),Ni=En(Oi),Ei=En(Oi);function Hn(e){if(e===Oi)throw Error(_(174));return e}function La(e,t){switch(me(Ei,t),me(Ni,e),me($t,Oi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ds(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ds(t,e)}ye($t),me($t,t)}function Er(){ye($t),ye(Ni),ye(Ei)}function Wf(e){Hn(Ei.current);var t=Hn($t.current),n=ds(t,e.type);t!==n&&(me(Ni,e),me($t,n))}function Ma(e){Ni.current===e&&(ye($t),ye(Ni))}var ve=En(0);function Ol(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ao=[];function Ra(){for(var e=0;e<Ao.length;e++)Ao[e]._workInProgressVersionPrimary=null;Ao.length=0}var fl=on.ReactCurrentDispatcher,Lo=on.ReactCurrentBatchConfig,Qn=0,be=null,ze=null,Pe=null,Dl=!1,ai=!1,zi=0,wg=0;function Be(){throw Error(_(321))}function Oa(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Mt(e[n],t[n]))return!1;return!0}function Da(e,t,n,r,i,l){if(Qn=l,be=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fl.current=e===null||e.memoizedState===null?Cg:Ng,e=n(r,i),ai){l=0;do{if(ai=!1,zi=0,25<=l)throw Error(_(301));l+=1,Pe=ze=null,t.updateQueue=null,fl.current=Eg,e=n(r,i)}while(ai)}if(fl.current=Fl,t=ze!==null&&ze.next!==null,Qn=0,Pe=ze=be=null,Dl=!1,t)throw Error(_(300));return e}function Fa(){var e=zi!==0;return zi=0,e}function Ft(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?be.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function Ct(){if(ze===null){var e=be.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=Pe===null?be.memoizedState:Pe.next;if(t!==null)Pe=t,ze=e;else{if(e===null)throw Error(_(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},Pe===null?be.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}function _i(e,t){return typeof t=="function"?t(e):t}function Mo(e){var t=Ct(),n=t.queue;if(n===null)throw Error(_(311));n.lastRenderedReducer=e;var r=ze,i=r.baseQueue,l=n.pending;if(l!==null){if(i!==null){var o=i.next;i.next=l.next,l.next=o}r.baseQueue=i=l,n.pending=null}if(i!==null){l=i.next,r=r.baseState;var a=o=null,u=null,c=l;do{var d=c.lane;if((Qn&d)===d)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(a=u=f,o=r):u=u.next=f,be.lanes|=d,Yn|=d}c=c.next}while(c!==null&&c!==l);u===null?o=r:u.next=a,Mt(r,t.memoizedState)||(nt=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do l=i.lane,be.lanes|=l,Yn|=l,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ro(e){var t=Ct(),n=t.queue;if(n===null)throw Error(_(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,l=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do l=e(l,o.action),o=o.next;while(o!==i);Mt(l,t.memoizedState)||(nt=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function qf(){}function Qf(e,t){var n=be,r=Ct(),i=t(),l=!Mt(r.memoizedState,i);if(l&&(r.memoizedState=i,nt=!0),r=r.queue,Ba(Kf.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||Pe!==null&&Pe.memoizedState.tag&1){if(n.flags|=2048,Pi(9,Gf.bind(null,n,r,i,t),void 0,null),Ie===null)throw Error(_(349));Qn&30||Yf(n,t,i)}return i}function Yf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=be.updateQueue,t===null?(t={lastEffect:null,stores:null},be.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Gf(e,t,n,r){t.value=n,t.getSnapshot=r,Xf(t)&&Jf(e)}function Kf(e,t,n){return n(function(){Xf(t)&&Jf(e)})}function Xf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Mt(e,n)}catch{return!0}}function Jf(e){var t=rn(e,1);t!==null&&Lt(t,e,1,-1)}function rc(e){var t=Ft();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:_i,lastRenderedState:e},t.queue=e,e=e.dispatch=jg.bind(null,be,e),[t.memoizedState,e]}function Pi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=be.updateQueue,t===null?(t={lastEffect:null,stores:null},be.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Zf(){return Ct().memoizedState}function pl(e,t,n,r){var i=Ft();be.flags|=e,i.memoizedState=Pi(1|t,n,void 0,r===void 0?null:r)}function eo(e,t,n,r){var i=Ct();r=r===void 0?null:r;var l=void 0;if(ze!==null){var o=ze.memoizedState;if(l=o.destroy,r!==null&&Oa(r,o.deps)){i.memoizedState=Pi(t,n,l,r);return}}be.flags|=e,i.memoizedState=Pi(1|t,n,l,r)}function ic(e,t){return pl(8390656,8,e,t)}function Ba(e,t){return eo(2048,8,e,t)}function ep(e,t){return eo(4,2,e,t)}function tp(e,t){return eo(4,4,e,t)}function np(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function rp(e,t,n){return n=n!=null?n.concat([e]):null,eo(4,4,np.bind(null,t,e),n)}function Ua(){}function ip(e,t){var n=Ct();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Oa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function lp(e,t){var n=Ct();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Oa(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function op(e,t,n){return Qn&21?(Mt(n,t)||(n=df(),be.lanes|=n,Yn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,nt=!0),e.memoizedState=n)}function kg(e,t){var n=ce;ce=n!==0&&4>n?n:4,e(!0);var r=Lo.transition;Lo.transition={};try{e(!1),t()}finally{ce=n,Lo.transition=r}}function sp(){return Ct().memoizedState}function Sg(e,t,n){var r=kn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ap(e))up(t,n);else if(n=Vf(e,t,n,r),n!==null){var i=Ge();Lt(n,e,r,i),cp(n,t,r)}}function jg(e,t,n){var r=kn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ap(e))up(t,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,a=l(o,n);if(i.hasEagerState=!0,i.eagerState=a,Mt(a,o)){var u=t.interleaved;u===null?(i.next=i,Ta(t)):(i.next=u.next,u.next=i),t.interleaved=i;return}}catch{}finally{}n=Vf(e,t,i,r),n!==null&&(i=Ge(),Lt(n,e,r,i),cp(n,t,r))}}function ap(e){var t=e.alternate;return e===be||t!==null&&t===be}function up(e,t){ai=Dl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function cp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xa(e,n)}}var Fl={readContext:jt,useCallback:Be,useContext:Be,useEffect:Be,useImperativeHandle:Be,useInsertionEffect:Be,useLayoutEffect:Be,useMemo:Be,useReducer:Be,useRef:Be,useState:Be,useDebugValue:Be,useDeferredValue:Be,useTransition:Be,useMutableSource:Be,useSyncExternalStore:Be,useId:Be,unstable_isNewReconciler:!1},Cg={readContext:jt,useCallback:function(e,t){return Ft().memoizedState=[e,t===void 0?null:t],e},useContext:jt,useEffect:ic,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,pl(4194308,4,np.bind(null,t,e),n)},useLayoutEffect:function(e,t){return pl(4194308,4,e,t)},useInsertionEffect:function(e,t){return pl(4,2,e,t)},useMemo:function(e,t){var n=Ft();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ft();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Sg.bind(null,be,e),[r.memoizedState,e]},useRef:function(e){var t=Ft();return e={current:e},t.memoizedState=e},useState:rc,useDebugValue:Ua,useDeferredValue:function(e){return Ft().memoizedState=e},useTransition:function(){var e=rc(!1),t=e[0];return e=kg.bind(null,e[1]),Ft().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=be,i=Ft();if(xe){if(n===void 0)throw Error(_(407));n=n()}else{if(n=t(),Ie===null)throw Error(_(349));Qn&30||Yf(r,t,n)}i.memoizedState=n;var l={value:n,getSnapshot:t};return i.queue=l,ic(Kf.bind(null,r,l,e),[e]),r.flags|=2048,Pi(9,Gf.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=Ft(),t=Ie.identifierPrefix;if(xe){var n=Jt,r=Xt;n=(r&~(1<<32-At(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=zi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=wg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ng={readContext:jt,useCallback:ip,useContext:jt,useEffect:Ba,useImperativeHandle:rp,useInsertionEffect:ep,useLayoutEffect:tp,useMemo:lp,useReducer:Mo,useRef:Zf,useState:function(){return Mo(_i)},useDebugValue:Ua,useDeferredValue:function(e){var t=Ct();return op(t,ze.memoizedState,e)},useTransition:function(){var e=Mo(_i)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:qf,useSyncExternalStore:Qf,useId:sp,unstable_isNewReconciler:!1},Eg={readContext:jt,useCallback:ip,useContext:jt,useEffect:Ba,useImperativeHandle:rp,useInsertionEffect:ep,useLayoutEffect:tp,useMemo:lp,useReducer:Ro,useRef:Zf,useState:function(){return Ro(_i)},useDebugValue:Ua,useDeferredValue:function(e){var t=Ct();return ze===null?t.memoizedState=e:op(t,ze.memoizedState,e)},useTransition:function(){var e=Ro(_i)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:qf,useSyncExternalStore:Qf,useId:sp,unstable_isNewReconciler:!1};function Pt(e,t){if(e&&e.defaultProps){t=we({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ts(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:we({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var to={isMounted:function(e){return(e=e._reactInternals)?Xn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ge(),i=kn(e),l=Zt(r,i);l.payload=t,n!=null&&(l.callback=n),t=bn(e,l,i),t!==null&&(Lt(t,e,i,r),dl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ge(),i=kn(e),l=Zt(r,i);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=bn(e,l,i),t!==null&&(Lt(t,e,i,r),dl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ge(),r=kn(e),i=Zt(n,r);i.tag=2,t!=null&&(i.callback=t),t=bn(e,i,r),t!==null&&(Lt(t,e,r,n),dl(t,e,r))}};function lc(e,t,n,r,i,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):t.prototype&&t.prototype.isPureReactComponent?!ki(n,r)||!ki(i,l):!0}function dp(e,t,n){var r=!1,i=Cn,l=t.contextType;return typeof l=="object"&&l!==null?l=jt(l):(i=it(t)?Wn:Ve.current,r=t.contextTypes,l=(r=r!=null)?jr(e,i):Cn),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=to,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),t}function oc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&to.enqueueReplaceState(t,t.state,null)}function As(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Aa(e);var l=t.contextType;typeof l=="object"&&l!==null?i.context=jt(l):(l=it(t)?Wn:Ve.current,i.context=jr(e,l)),i.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Ts(e,t,l,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&to.enqueueReplaceState(i,i.state,null),Rl(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function zr(e,t){try{var n="",r=t;do n+=th(r),r=r.return;while(r);var i=n}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:i,digest:null}}function Oo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ls(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var zg=typeof WeakMap=="function"?WeakMap:Map;function fp(e,t,n){n=Zt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ul||(Ul=!0,$s=r),Ls(e,t)},n}function pp(e,t,n){n=Zt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Ls(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Ls(e,t),typeof r!="function"&&(wn===null?wn=new Set([this]):wn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function sc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new zg;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Hg.bind(null,e,t,n),t.then(e,e))}function ac(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function uc(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Zt(-1,1),t.tag=2,bn(n,t,1))),n.lanes|=1),e)}var _g=on.ReactCurrentOwner,nt=!1;function Ye(e,t,n,r){t.child=e===null?Hf(t,null,n,r):Nr(t,e.child,n,r)}function cc(e,t,n,r,i){n=n.render;var l=t.ref;return vr(t,i),r=Da(e,t,n,r,l,i),n=Fa(),e!==null&&!nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,ln(e,t,i)):(xe&&n&&Na(t),t.flags|=1,Ye(e,t,r,i),t.child)}function dc(e,t,n,r,i){if(e===null){var l=n.type;return typeof l=="function"&&!Ga(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,mp(e,t,l,r,i)):(e=yl(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&i)){var o=l.memoizedProps;if(n=n.compare,n=n!==null?n:ki,n(o,r)&&e.ref===t.ref)return ln(e,t,i)}return t.flags|=1,e=Sn(l,r),e.ref=t.ref,e.return=t,t.child=e}function mp(e,t,n,r,i){if(e!==null){var l=e.memoizedProps;if(ki(l,r)&&e.ref===t.ref)if(nt=!1,t.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(nt=!0);else return t.lanes=e.lanes,ln(e,t,i)}return Ms(e,t,n,r,i)}function hp(e,t,n){var r=t.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},me(mr,dt),dt|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,me(mr,dt),dt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,me(mr,dt),dt|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,me(mr,dt),dt|=r;return Ye(e,t,i,n),t.child}function gp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ms(e,t,n,r,i){var l=it(n)?Wn:Ve.current;return l=jr(t,l),vr(t,i),n=Da(e,t,n,r,l,i),r=Fa(),e!==null&&!nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,ln(e,t,i)):(xe&&r&&Na(t),t.flags|=1,Ye(e,t,n,i),t.child)}function fc(e,t,n,r,i){if(it(n)){var l=!0;Il(t)}else l=!1;if(vr(t,i),t.stateNode===null)ml(e,t),dp(t,n,r),As(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=jt(c):(c=it(n)?Wn:Ve.current,c=jr(t,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||u!==c)&&oc(t,o,r,c),dn=!1;var m=t.memoizedState;o.state=m,Rl(t,r,o,i),u=t.memoizedState,a!==r||m!==u||rt.current||dn?(typeof d=="function"&&(Ts(t,n,d,r),u=t.memoizedState),(a=dn||lc(t,n,a,r,m,u,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),o.props=r,o.state=u,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,$f(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:Pt(t.type,a),o.props=c,f=t.pendingProps,m=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=jt(u):(u=it(n)?Wn:Ve.current,u=jr(t,u));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||m!==u)&&oc(t,o,r,u),dn=!1,m=t.memoizedState,o.state=m,Rl(t,r,o,i);var k=t.memoizedState;a!==f||m!==k||rt.current||dn?(typeof p=="function"&&(Ts(t,n,p,r),k=t.memoizedState),(c=dn||lc(t,n,c,r,m,k,u)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,u)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=k),o.props=r,o.state=k,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Rs(e,t,n,r,l,i)}function Rs(e,t,n,r,i,l){gp(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&Xu(t,n,!1),ln(e,t,l);r=t.stateNode,_g.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Nr(t,e.child,null,l),t.child=Nr(t,null,a,l)):Ye(e,t,a,l),t.memoizedState=r.state,i&&Xu(t,n,!0),t.child}function yp(e){var t=e.stateNode;t.pendingContext?Ku(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ku(e,t.context,!1),La(e,t.containerInfo)}function pc(e,t,n,r,i){return Cr(),za(i),t.flags|=256,Ye(e,t,n,r),t.child}var Os={dehydrated:null,treeContext:null,retryLane:0};function Ds(e){return{baseLanes:e,cachePool:null,transitions:null}}function xp(e,t,n){var r=t.pendingProps,i=ve.current,l=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),me(ve,i&1),e===null)return Ps(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,l?(r=t.mode,l=t.child,o={mode:"hidden",children:o},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=io(o,r,0,null),e=$n(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Ds(n),t.memoizedState=Os,e):Ha(t,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return Pg(e,t,o,r,a,i,n);if(l){l=r.fallback,o=t.mode,i=e.child,a=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Sn(i,u),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?l=Sn(a,l):(l=$n(l,o,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,o=e.child.memoizedState,o=o===null?Ds(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~n,t.memoizedState=Os,r}return l=e.child,e=l.sibling,r=Sn(l,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ha(e,t){return t=io({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Zi(e,t,n,r){return r!==null&&za(r),Nr(t,e.child,null,n),e=Ha(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Pg(e,t,n,r,i,l,o){if(n)return t.flags&256?(t.flags&=-257,r=Oo(Error(_(422))),Zi(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,i=t.mode,r=io({mode:"visible",children:r.children},i,0,null),l=$n(l,i,o,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,t.mode&1&&Nr(t,e.child,null,o),t.child.memoizedState=Ds(o),t.memoizedState=Os,l);if(!(t.mode&1))return Zi(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,l=Error(_(419)),r=Oo(l,r,void 0),Zi(e,t,o,r)}if(a=(o&e.childLanes)!==0,nt||a){if(r=Ie,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,rn(e,i),Lt(r,e,i,-1))}return Ya(),r=Oo(Error(_(421))),Zi(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Vg.bind(null,e),i._reactRetry=t,null):(e=l.treeContext,ft=vn(i.nextSibling),mt=t,xe=!0,Tt=null,e!==null&&(vt[bt++]=Xt,vt[bt++]=Jt,vt[bt++]=qn,Xt=e.id,Jt=e.overflow,qn=t),t=Ha(t,r.children),t.flags|=4096,t)}function mc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Is(e.return,t,n)}function Do(e,t,n,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=i)}function vp(e,t,n){var r=t.pendingProps,i=r.revealOrder,l=r.tail;if(Ye(e,t,r.children,n),r=ve.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&mc(e,n,t);else if(e.tag===19)mc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(me(ve,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ol(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Do(t,!1,i,n,l);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ol(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Do(t,!0,n,null,l);break;case"together":Do(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ml(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ln(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(_(153));if(t.child!==null){for(e=t.child,n=Sn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Sn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ig(e,t,n){switch(t.tag){case 3:yp(t),Cr();break;case 5:Wf(t);break;case 1:it(t.type)&&Il(t);break;case 4:La(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;me(Ll,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(me(ve,ve.current&1),t.flags|=128,null):n&t.child.childLanes?xp(e,t,n):(me(ve,ve.current&1),e=ln(e,t,n),e!==null?e.sibling:null);me(ve,ve.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return vp(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),me(ve,ve.current),r)break;return null;case 22:case 23:return t.lanes=0,hp(e,t,n)}return ln(e,t,n)}var bp,Fs,wp,kp;bp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fs=function(){};wp=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Hn($t.current);var l=null;switch(n){case"input":i=ss(e,i),r=ss(e,r),l=[];break;case"select":i=we({},i,{value:void 0}),r=we({},r,{value:void 0}),l=[];break;case"textarea":i=cs(e,i),r=cs(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=_l)}fs(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(hi.hasOwnProperty(c)?l||(l=[]):(l=l||[]).push(c,null));for(c in r){var u=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==a&&(u!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&a[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(l||(l=[]),l.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(l=l||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(hi.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&ge("scroll",e),l||a===u||(l=[])):(l=l||[]).push(c,u))}n&&(l=l||[]).push("style",n);var c=l;(t.updateQueue=c)&&(t.flags|=4)}};kp=function(e,t,n,r){n!==r&&(t.flags|=4)};function Yr(e,t){if(!xe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Tg(e,t,n){var r=t.pendingProps;switch(Ea(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(t),null;case 1:return it(t.type)&&Pl(),Ue(t),null;case 3:return r=t.stateNode,Er(),ye(rt),ye(Ve),Ra(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Xi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Tt!==null&&(Qs(Tt),Tt=null))),Fs(e,t),Ue(t),null;case 5:Ma(t);var i=Hn(Ei.current);if(n=t.type,e!==null&&t.stateNode!=null)wp(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(_(166));return Ue(t),null}if(e=Hn($t.current),Xi(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[Ut]=t,r[Ci]=l,e=(t.mode&1)!==0,n){case"dialog":ge("cancel",r),ge("close",r);break;case"iframe":case"object":case"embed":ge("load",r);break;case"video":case"audio":for(i=0;i<ni.length;i++)ge(ni[i],r);break;case"source":ge("error",r);break;case"img":case"image":case"link":ge("error",r),ge("load",r);break;case"details":ge("toggle",r);break;case"input":Su(r,l),ge("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},ge("invalid",r);break;case"textarea":Cu(r,l),ge("invalid",r)}fs(n,l),i=null;for(var o in l)if(l.hasOwnProperty(o)){var a=l[o];o==="children"?typeof a=="string"?r.textContent!==a&&(l.suppressHydrationWarning!==!0&&Ki(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(l.suppressHydrationWarning!==!0&&Ki(r.textContent,a,e),i=["children",""+a]):hi.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ge("scroll",r)}switch(n){case"input":Hi(r),ju(r,l,!0);break;case"textarea":Hi(r),Nu(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=_l)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Gd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Ut]=t,e[Ci]=r,bp(e,t,!1,!1),t.stateNode=e;e:{switch(o=ps(n,r),n){case"dialog":ge("cancel",e),ge("close",e),i=r;break;case"iframe":case"object":case"embed":ge("load",e),i=r;break;case"video":case"audio":for(i=0;i<ni.length;i++)ge(ni[i],e);i=r;break;case"source":ge("error",e),i=r;break;case"img":case"image":case"link":ge("error",e),ge("load",e),i=r;break;case"details":ge("toggle",e),i=r;break;case"input":Su(e,r),i=ss(e,r),ge("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=we({},r,{value:void 0}),ge("invalid",e);break;case"textarea":Cu(e,r),i=cs(e,r),ge("invalid",e);break;default:i=r}fs(n,i),a=i;for(l in a)if(a.hasOwnProperty(l)){var u=a[l];l==="style"?Jd(e,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Kd(e,u)):l==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&gi(e,u):typeof u=="number"&&gi(e,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(hi.hasOwnProperty(l)?u!=null&&l==="onScroll"&&ge("scroll",e):u!=null&&fa(e,l,u,o))}switch(n){case"input":Hi(e),ju(e,r,!1);break;case"textarea":Hi(e),Nu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+jn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?hr(e,!!r.multiple,l,!1):r.defaultValue!=null&&hr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=_l)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ue(t),null;case 6:if(e&&t.stateNode!=null)kp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(_(166));if(n=Hn(Ei.current),Hn($t.current),Xi(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ut]=t,(l=r.nodeValue!==n)&&(e=mt,e!==null))switch(e.tag){case 3:Ki(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ki(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ut]=t,t.stateNode=r}return Ue(t),null;case 13:if(ye(ve),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(xe&&ft!==null&&t.mode&1&&!(t.flags&128))Bf(),Cr(),t.flags|=98560,l=!1;else if(l=Xi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(_(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(_(317));l[Ut]=t}else Cr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ue(t),l=!1}else Tt!==null&&(Qs(Tt),Tt=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ve.current&1?_e===0&&(_e=3):Ya())),t.updateQueue!==null&&(t.flags|=4),Ue(t),null);case 4:return Er(),Fs(e,t),e===null&&Si(t.stateNode.containerInfo),Ue(t),null;case 10:return Ia(t.type._context),Ue(t),null;case 17:return it(t.type)&&Pl(),Ue(t),null;case 19:if(ye(ve),l=t.memoizedState,l===null)return Ue(t),null;if(r=(t.flags&128)!==0,o=l.rendering,o===null)if(r)Yr(l,!1);else{if(_e!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ol(e),o!==null){for(t.flags|=128,Yr(l,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return me(ve,ve.current&1|2),t.child}e=e.sibling}l.tail!==null&&Ce()>_r&&(t.flags|=128,r=!0,Yr(l,!1),t.lanes=4194304)}else{if(!r)if(e=Ol(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Yr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!xe)return Ue(t),null}else 2*Ce()-l.renderingStartTime>_r&&n!==1073741824&&(t.flags|=128,r=!0,Yr(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(n=l.last,n!==null?n.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Ce(),t.sibling=null,n=ve.current,me(ve,r?n&1|2:n&1),t):(Ue(t),null);case 22:case 23:return Qa(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?dt&1073741824&&(Ue(t),t.subtreeFlags&6&&(t.flags|=8192)):Ue(t),null;case 24:return null;case 25:return null}throw Error(_(156,t.tag))}function Ag(e,t){switch(Ea(t),t.tag){case 1:return it(t.type)&&Pl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Er(),ye(rt),ye(Ve),Ra(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ma(t),null;case 13:if(ye(ve),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(_(340));Cr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ye(ve),null;case 4:return Er(),null;case 10:return Ia(t.type._context),null;case 22:case 23:return Qa(),null;case 24:return null;default:return null}}var el=!1,He=!1,Lg=typeof WeakSet=="function"?WeakSet:Set,F=null;function pr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Se(e,t,r)}else n.current=null}function Bs(e,t,n){try{n()}catch(r){Se(e,t,r)}}var hc=!1;function Mg(e,t){if(Ss=Nl,e=Ef(),Ca(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var o=0,a=-1,u=-1,c=0,d=0,f=e,m=null;t:for(;;){for(var p;f!==n||i!==0&&f.nodeType!==3||(a=o+i),f!==l||r!==0&&f.nodeType!==3||(u=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)m=f,f=p;for(;;){if(f===e)break t;if(m===n&&++c===i&&(a=o),m===l&&++d===r&&(u=o),(p=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=p}n=a===-1||u===-1?null:{start:a,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(js={focusedElem:e,selectionRange:n},Nl=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var w=k.memoizedProps,E=k.memoizedState,h=t.stateNode,g=h.getSnapshotBeforeUpdate(t.elementType===t.type?w:Pt(t.type,w),E);h.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(_(163))}}catch(j){Se(t,t.return,j)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return k=hc,hc=!1,k}function ui(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Bs(t,n,l)}i=i.next}while(i!==r)}}function no(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Us(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Sp(e){var t=e.alternate;t!==null&&(e.alternate=null,Sp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ut],delete t[Ci],delete t[Es],delete t[yg],delete t[xg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function jp(e){return e.tag===5||e.tag===3||e.tag===4}function gc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||jp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=_l));else if(r!==4&&(e=e.child,e!==null))for(Hs(e,t,n),e=e.sibling;e!==null;)Hs(e,t,n),e=e.sibling}function Vs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Vs(e,t,n),e=e.sibling;e!==null;)Vs(e,t,n),e=e.sibling}var Ae=null,It=!1;function an(e,t,n){for(n=n.child;n!==null;)Cp(e,t,n),n=n.sibling}function Cp(e,t,n){if(Vt&&typeof Vt.onCommitFiberUnmount=="function")try{Vt.onCommitFiberUnmount(Yl,n)}catch{}switch(n.tag){case 5:He||pr(n,t);case 6:var r=Ae,i=It;Ae=null,an(e,t,n),Ae=r,It=i,Ae!==null&&(It?(e=Ae,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ae.removeChild(n.stateNode));break;case 18:Ae!==null&&(It?(e=Ae,n=n.stateNode,e.nodeType===8?Io(e.parentNode,n):e.nodeType===1&&Io(e,n),bi(e)):Io(Ae,n.stateNode));break;case 4:r=Ae,i=It,Ae=n.stateNode.containerInfo,It=!0,an(e,t,n),Ae=r,It=i;break;case 0:case 11:case 14:case 15:if(!He&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&Bs(n,t,o),i=i.next}while(i!==r)}an(e,t,n);break;case 1:if(!He&&(pr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Se(n,t,a)}an(e,t,n);break;case 21:an(e,t,n);break;case 22:n.mode&1?(He=(r=He)||n.memoizedState!==null,an(e,t,n),He=r):an(e,t,n);break;default:an(e,t,n)}}function yc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Lg),t.forEach(function(r){var i=$g.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function _t(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var l=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ae=a.stateNode,It=!1;break e;case 3:Ae=a.stateNode.containerInfo,It=!0;break e;case 4:Ae=a.stateNode.containerInfo,It=!0;break e}a=a.return}if(Ae===null)throw Error(_(160));Cp(l,o,i),Ae=null,It=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){Se(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Np(t,e),t=t.sibling}function Np(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(_t(t,e),Dt(e),r&4){try{ui(3,e,e.return),no(3,e)}catch(w){Se(e,e.return,w)}try{ui(5,e,e.return)}catch(w){Se(e,e.return,w)}}break;case 1:_t(t,e),Dt(e),r&512&&n!==null&&pr(n,n.return);break;case 5:if(_t(t,e),Dt(e),r&512&&n!==null&&pr(n,n.return),e.flags&32){var i=e.stateNode;try{gi(i,"")}catch(w){Se(e,e.return,w)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,o=n!==null?n.memoizedProps:l,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&l.type==="radio"&&l.name!=null&&Qd(i,l),ps(a,o);var c=ps(a,l);for(o=0;o<u.length;o+=2){var d=u[o],f=u[o+1];d==="style"?Jd(i,f):d==="dangerouslySetInnerHTML"?Kd(i,f):d==="children"?gi(i,f):fa(i,d,f,c)}switch(a){case"input":as(i,l);break;case"textarea":Yd(i,l);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var p=l.value;p!=null?hr(i,!!l.multiple,p,!1):m!==!!l.multiple&&(l.defaultValue!=null?hr(i,!!l.multiple,l.defaultValue,!0):hr(i,!!l.multiple,l.multiple?[]:"",!1))}i[Ci]=l}catch(w){Se(e,e.return,w)}}break;case 6:if(_t(t,e),Dt(e),r&4){if(e.stateNode===null)throw Error(_(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(w){Se(e,e.return,w)}}break;case 3:if(_t(t,e),Dt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{bi(t.containerInfo)}catch(w){Se(e,e.return,w)}break;case 4:_t(t,e),Dt(e);break;case 13:_t(t,e),Dt(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Wa=Ce())),r&4&&yc(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(He=(c=He)||d,_t(t,e),He=c):_t(t,e),Dt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(F=e,d=e.child;d!==null;){for(f=F=d;F!==null;){switch(m=F,p=m.child,m.tag){case 0:case 11:case 14:case 15:ui(4,m,m.return);break;case 1:pr(m,m.return);var k=m.stateNode;if(typeof k.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(w){Se(r,n,w)}}break;case 5:pr(m,m.return);break;case 22:if(m.memoizedState!==null){vc(f);continue}}p!==null?(p.return=m,F=p):vc(f)}d=d.sibling}e:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{i=f.stateNode,c?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(a=f.stateNode,u=f.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=Xd("display",o))}catch(w){Se(e,e.return,w)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(w){Se(e,e.return,w)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:_t(t,e),Dt(e),r&4&&yc(e);break;case 21:break;default:_t(t,e),Dt(e)}}function Dt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(jp(n)){var r=n;break e}n=n.return}throw Error(_(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(gi(i,""),r.flags&=-33);var l=gc(e);Vs(e,l,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=gc(e);Hs(e,a,o);break;default:throw Error(_(161))}}catch(u){Se(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Rg(e,t,n){F=e,Ep(e)}function Ep(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var i=F,l=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||el;if(!o){var a=i.alternate,u=a!==null&&a.memoizedState!==null||He;a=el;var c=He;if(el=o,(He=u)&&!c)for(F=i;F!==null;)o=F,u=o.child,o.tag===22&&o.memoizedState!==null?bc(i):u!==null?(u.return=o,F=u):bc(i);for(;l!==null;)F=l,Ep(l),l=l.sibling;F=i,el=a,He=c}xc(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,F=l):xc(e)}}function xc(e){for(;F!==null;){var t=F;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:He||no(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!He)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Pt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&nc(t,l,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}nc(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&bi(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(_(163))}He||t.flags&512&&Us(t)}catch(m){Se(t,t.return,m)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function vc(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function bc(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{no(4,t)}catch(u){Se(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(u){Se(t,i,u)}}var l=t.return;try{Us(t)}catch(u){Se(t,l,u)}break;case 5:var o=t.return;try{Us(t)}catch(u){Se(t,o,u)}}}catch(u){Se(t,t.return,u)}if(t===e){F=null;break}var a=t.sibling;if(a!==null){a.return=t.return,F=a;break}F=t.return}}var Og=Math.ceil,Bl=on.ReactCurrentDispatcher,Va=on.ReactCurrentOwner,St=on.ReactCurrentBatchConfig,re=0,Ie=null,Ee=null,Le=0,dt=0,mr=En(0),_e=0,Ii=null,Yn=0,ro=0,$a=0,ci=null,tt=null,Wa=0,_r=1/0,Gt=null,Ul=!1,$s=null,wn=null,tl=!1,hn=null,Hl=0,di=0,Ws=null,hl=-1,gl=0;function Ge(){return re&6?Ce():hl!==-1?hl:hl=Ce()}function kn(e){return e.mode&1?re&2&&Le!==0?Le&-Le:bg.transition!==null?(gl===0&&(gl=df()),gl):(e=ce,e!==0||(e=window.event,e=e===void 0?16:xf(e.type)),e):1}function Lt(e,t,n,r){if(50<di)throw di=0,Ws=null,Error(_(185));Li(e,n,r),(!(re&2)||e!==Ie)&&(e===Ie&&(!(re&2)&&(ro|=n),_e===4&&pn(e,Le)),lt(e,r),n===1&&re===0&&!(t.mode&1)&&(_r=Ce()+500,Zl&&zn()))}function lt(e,t){var n=e.callbackNode;bh(e,t);var r=Cl(e,e===Ie?Le:0);if(r===0)n!==null&&_u(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&_u(n),t===1)e.tag===0?vg(wc.bind(null,e)):Of(wc.bind(null,e)),hg(function(){!(re&6)&&zn()}),n=null;else{switch(ff(r)){case 1:n=ya;break;case 4:n=uf;break;case 16:n=jl;break;case 536870912:n=cf;break;default:n=jl}n=Mp(n,zp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function zp(e,t){if(hl=-1,gl=0,re&6)throw Error(_(327));var n=e.callbackNode;if(br()&&e.callbackNode!==n)return null;var r=Cl(e,e===Ie?Le:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Vl(e,r);else{t=r;var i=re;re|=2;var l=Pp();(Ie!==e||Le!==t)&&(Gt=null,_r=Ce()+500,Vn(e,t));do try{Bg();break}catch(a){_p(e,a)}while(!0);Pa(),Bl.current=l,re=i,Ee!==null?t=0:(Ie=null,Le=0,t=_e)}if(t!==0){if(t===2&&(i=xs(e),i!==0&&(r=i,t=qs(e,i))),t===1)throw n=Ii,Vn(e,0),pn(e,r),lt(e,Ce()),n;if(t===6)pn(e,r);else{if(i=e.current.alternate,!(r&30)&&!Dg(i)&&(t=Vl(e,r),t===2&&(l=xs(e),l!==0&&(r=l,t=qs(e,l))),t===1))throw n=Ii,Vn(e,0),pn(e,r),lt(e,Ce()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(_(345));case 2:On(e,tt,Gt);break;case 3:if(pn(e,r),(r&130023424)===r&&(t=Wa+500-Ce(),10<t)){if(Cl(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ge(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ns(On.bind(null,e,tt,Gt),t);break}On(e,tt,Gt);break;case 4:if(pn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-At(r);l=1<<o,o=t[o],o>i&&(i=o),r&=~l}if(r=i,r=Ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Og(r/1960))-r,10<r){e.timeoutHandle=Ns(On.bind(null,e,tt,Gt),r);break}On(e,tt,Gt);break;case 5:On(e,tt,Gt);break;default:throw Error(_(329))}}}return lt(e,Ce()),e.callbackNode===n?zp.bind(null,e):null}function qs(e,t){var n=ci;return e.current.memoizedState.isDehydrated&&(Vn(e,t).flags|=256),e=Vl(e,t),e!==2&&(t=tt,tt=n,t!==null&&Qs(t)),e}function Qs(e){tt===null?tt=e:tt.push.apply(tt,e)}function Dg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],l=i.getSnapshot;i=i.value;try{if(!Mt(l(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function pn(e,t){for(t&=~$a,t&=~ro,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-At(t),r=1<<n;e[n]=-1,t&=~r}}function wc(e){if(re&6)throw Error(_(327));br();var t=Cl(e,0);if(!(t&1))return lt(e,Ce()),null;var n=Vl(e,t);if(e.tag!==0&&n===2){var r=xs(e);r!==0&&(t=r,n=qs(e,r))}if(n===1)throw n=Ii,Vn(e,0),pn(e,t),lt(e,Ce()),n;if(n===6)throw Error(_(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,On(e,tt,Gt),lt(e,Ce()),null}function qa(e,t){var n=re;re|=1;try{return e(t)}finally{re=n,re===0&&(_r=Ce()+500,Zl&&zn())}}function Gn(e){hn!==null&&hn.tag===0&&!(re&6)&&br();var t=re;re|=1;var n=St.transition,r=ce;try{if(St.transition=null,ce=1,e)return e()}finally{ce=r,St.transition=n,re=t,!(re&6)&&zn()}}function Qa(){dt=mr.current,ye(mr)}function Vn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,mg(n)),Ee!==null)for(n=Ee.return;n!==null;){var r=n;switch(Ea(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Pl();break;case 3:Er(),ye(rt),ye(Ve),Ra();break;case 5:Ma(r);break;case 4:Er();break;case 13:ye(ve);break;case 19:ye(ve);break;case 10:Ia(r.type._context);break;case 22:case 23:Qa()}n=n.return}if(Ie=e,Ee=e=Sn(e.current,null),Le=dt=t,_e=0,Ii=null,$a=ro=Yn=0,tt=ci=null,Un!==null){for(t=0;t<Un.length;t++)if(n=Un[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,l=n.pending;if(l!==null){var o=l.next;l.next=i,r.next=o}n.pending=r}Un=null}return e}function _p(e,t){do{var n=Ee;try{if(Pa(),fl.current=Fl,Dl){for(var r=be.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Dl=!1}if(Qn=0,Pe=ze=be=null,ai=!1,zi=0,Va.current=null,n===null||n.return===null){_e=1,Ii=t,Ee=null;break}e:{var l=e,o=n.return,a=n,u=t;if(t=Le,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,d=a,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var m=d.alternate;m?(d.updateQueue=m.updateQueue,d.memoizedState=m.memoizedState,d.lanes=m.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=ac(o);if(p!==null){p.flags&=-257,uc(p,o,a,l,t),p.mode&1&&sc(l,c,t),t=p,u=c;var k=t.updateQueue;if(k===null){var w=new Set;w.add(u),t.updateQueue=w}else k.add(u);break e}else{if(!(t&1)){sc(l,c,t),Ya();break e}u=Error(_(426))}}else if(xe&&a.mode&1){var E=ac(o);if(E!==null){!(E.flags&65536)&&(E.flags|=256),uc(E,o,a,l,t),za(zr(u,a));break e}}l=u=zr(u,a),_e!==4&&(_e=2),ci===null?ci=[l]:ci.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var h=fp(l,u,t);tc(l,h);break e;case 1:a=u;var g=l.type,x=l.stateNode;if(!(l.flags&128)&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(wn===null||!wn.has(x)))){l.flags|=65536,t&=-t,l.lanes|=t;var j=pp(l,a,t);tc(l,j);break e}}l=l.return}while(l!==null)}Tp(n)}catch(C){t=C,Ee===n&&n!==null&&(Ee=n=n.return);continue}break}while(!0)}function Pp(){var e=Bl.current;return Bl.current=Fl,e===null?Fl:e}function Ya(){(_e===0||_e===3||_e===2)&&(_e=4),Ie===null||!(Yn&268435455)&&!(ro&268435455)||pn(Ie,Le)}function Vl(e,t){var n=re;re|=2;var r=Pp();(Ie!==e||Le!==t)&&(Gt=null,Vn(e,t));do try{Fg();break}catch(i){_p(e,i)}while(!0);if(Pa(),re=n,Bl.current=r,Ee!==null)throw Error(_(261));return Ie=null,Le=0,_e}function Fg(){for(;Ee!==null;)Ip(Ee)}function Bg(){for(;Ee!==null&&!dh();)Ip(Ee)}function Ip(e){var t=Lp(e.alternate,e,dt);e.memoizedProps=e.pendingProps,t===null?Tp(e):Ee=t,Va.current=null}function Tp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Ag(n,t),n!==null){n.flags&=32767,Ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{_e=6,Ee=null;return}}else if(n=Tg(n,t,dt),n!==null){Ee=n;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);_e===0&&(_e=5)}function On(e,t,n){var r=ce,i=St.transition;try{St.transition=null,ce=1,Ug(e,t,n,r)}finally{St.transition=i,ce=r}return null}function Ug(e,t,n,r){do br();while(hn!==null);if(re&6)throw Error(_(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(_(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(wh(e,l),e===Ie&&(Ee=Ie=null,Le=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||tl||(tl=!0,Mp(jl,function(){return br(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=St.transition,St.transition=null;var o=ce;ce=1;var a=re;re|=4,Va.current=null,Mg(e,n),Np(n,e),sg(js),Nl=!!Ss,js=Ss=null,e.current=n,Rg(n),fh(),re=a,ce=o,St.transition=l}else e.current=n;if(tl&&(tl=!1,hn=e,Hl=i),l=e.pendingLanes,l===0&&(wn=null),hh(n.stateNode),lt(e,Ce()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Ul)throw Ul=!1,e=$s,$s=null,e;return Hl&1&&e.tag!==0&&br(),l=e.pendingLanes,l&1?e===Ws?di++:(di=0,Ws=e):di=0,zn(),null}function br(){if(hn!==null){var e=ff(Hl),t=St.transition,n=ce;try{if(St.transition=null,ce=16>e?16:e,hn===null)var r=!1;else{if(e=hn,hn=null,Hl=0,re&6)throw Error(_(331));var i=re;for(re|=4,F=e.current;F!==null;){var l=F,o=l.child;if(F.flags&16){var a=l.deletions;if(a!==null){for(var u=0;u<a.length;u++){var c=a[u];for(F=c;F!==null;){var d=F;switch(d.tag){case 0:case 11:case 15:ui(8,d,l)}var f=d.child;if(f!==null)f.return=d,F=f;else for(;F!==null;){d=F;var m=d.sibling,p=d.return;if(Sp(d),d===c){F=null;break}if(m!==null){m.return=p,F=m;break}F=p}}}var k=l.alternate;if(k!==null){var w=k.child;if(w!==null){k.child=null;do{var E=w.sibling;w.sibling=null,w=E}while(w!==null)}}F=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,F=o;else e:for(;F!==null;){if(l=F,l.flags&2048)switch(l.tag){case 0:case 11:case 15:ui(9,l,l.return)}var h=l.sibling;if(h!==null){h.return=l.return,F=h;break e}F=l.return}}var g=e.current;for(F=g;F!==null;){o=F;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,F=x;else e:for(o=g;F!==null;){if(a=F,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:no(9,a)}}catch(C){Se(a,a.return,C)}if(a===o){F=null;break e}var j=a.sibling;if(j!==null){j.return=a.return,F=j;break e}F=a.return}}if(re=i,zn(),Vt&&typeof Vt.onPostCommitFiberRoot=="function")try{Vt.onPostCommitFiberRoot(Yl,e)}catch{}r=!0}return r}finally{ce=n,St.transition=t}}return!1}function kc(e,t,n){t=zr(n,t),t=fp(e,t,1),e=bn(e,t,1),t=Ge(),e!==null&&(Li(e,1,t),lt(e,t))}function Se(e,t,n){if(e.tag===3)kc(e,e,n);else for(;t!==null;){if(t.tag===3){kc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wn===null||!wn.has(r))){e=zr(n,e),e=pp(t,e,1),t=bn(t,e,1),e=Ge(),t!==null&&(Li(t,1,e),lt(t,e));break}}t=t.return}}function Hg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ge(),e.pingedLanes|=e.suspendedLanes&n,Ie===e&&(Le&n)===n&&(_e===4||_e===3&&(Le&130023424)===Le&&500>Ce()-Wa?Vn(e,0):$a|=n),lt(e,t)}function Ap(e,t){t===0&&(e.mode&1?(t=Wi,Wi<<=1,!(Wi&130023424)&&(Wi=4194304)):t=1);var n=Ge();e=rn(e,t),e!==null&&(Li(e,t,n),lt(e,n))}function Vg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ap(e,n)}function $g(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(_(314))}r!==null&&r.delete(t),Ap(e,n)}var Lp;Lp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||rt.current)nt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return nt=!1,Ig(e,t,n);nt=!!(e.flags&131072)}else nt=!1,xe&&t.flags&1048576&&Df(t,Al,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ml(e,t),e=t.pendingProps;var i=jr(t,Ve.current);vr(t,n),i=Da(null,t,r,e,i,n);var l=Fa();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,it(r)?(l=!0,Il(t)):l=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Aa(t),i.updater=to,t.stateNode=i,i._reactInternals=t,As(t,r,e,n),t=Rs(null,t,r,!0,l,n)):(t.tag=0,xe&&l&&Na(t),Ye(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ml(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=qg(r),e=Pt(r,e),i){case 0:t=Ms(null,t,r,e,n);break e;case 1:t=fc(null,t,r,e,n);break e;case 11:t=cc(null,t,r,e,n);break e;case 14:t=dc(null,t,r,Pt(r.type,e),n);break e}throw Error(_(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Pt(r,i),Ms(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Pt(r,i),fc(e,t,r,i,n);case 3:e:{if(yp(t),e===null)throw Error(_(387));r=t.pendingProps,l=t.memoizedState,i=l.element,$f(e,t),Rl(t,r,null,n);var o=t.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){i=zr(Error(_(423)),t),t=pc(e,t,r,n,i);break e}else if(r!==i){i=zr(Error(_(424)),t),t=pc(e,t,r,n,i);break e}else for(ft=vn(t.stateNode.containerInfo.firstChild),mt=t,xe=!0,Tt=null,n=Hf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Cr(),r===i){t=ln(e,t,n);break e}Ye(e,t,r,n)}t=t.child}return t;case 5:return Wf(t),e===null&&Ps(t),r=t.type,i=t.pendingProps,l=e!==null?e.memoizedProps:null,o=i.children,Cs(r,i)?o=null:l!==null&&Cs(r,l)&&(t.flags|=32),gp(e,t),Ye(e,t,o,n),t.child;case 6:return e===null&&Ps(t),null;case 13:return xp(e,t,n);case 4:return La(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Nr(t,null,r,n):Ye(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Pt(r,i),cc(e,t,r,i,n);case 7:return Ye(e,t,t.pendingProps,n),t.child;case 8:return Ye(e,t,t.pendingProps.children,n),t.child;case 12:return Ye(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,l=t.memoizedProps,o=i.value,me(Ll,r._currentValue),r._currentValue=o,l!==null)if(Mt(l.value,o)){if(l.children===i.children&&!rt.current){t=ln(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var a=l.dependencies;if(a!==null){o=l.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=Zt(-1,n&-n),u.tag=2;var c=l.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}l.lanes|=n,u=l.alternate,u!==null&&(u.lanes|=n),Is(l.return,n,t),a.lanes|=n;break}u=u.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(_(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Is(o,n,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}Ye(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,vr(t,n),i=jt(i),r=r(i),t.flags|=1,Ye(e,t,r,n),t.child;case 14:return r=t.type,i=Pt(r,t.pendingProps),i=Pt(r.type,i),dc(e,t,r,i,n);case 15:return mp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Pt(r,i),ml(e,t),t.tag=1,it(r)?(e=!0,Il(t)):e=!1,vr(t,n),dp(t,r,i),As(t,r,i,n),Rs(null,t,r,!0,e,n);case 19:return vp(e,t,n);case 22:return hp(e,t,n)}throw Error(_(156,t.tag))};function Mp(e,t){return af(e,t)}function Wg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kt(e,t,n,r){return new Wg(e,t,n,r)}function Ga(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qg(e){if(typeof e=="function")return Ga(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ma)return 11;if(e===ha)return 14}return 2}function Sn(e,t){var n=e.alternate;return n===null?(n=kt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function yl(e,t,n,r,i,l){var o=2;if(r=e,typeof e=="function")Ga(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case ir:return $n(n.children,i,l,t);case pa:o=8,i|=8;break;case rs:return e=kt(12,n,t,i|2),e.elementType=rs,e.lanes=l,e;case is:return e=kt(13,n,t,i),e.elementType=is,e.lanes=l,e;case ls:return e=kt(19,n,t,i),e.elementType=ls,e.lanes=l,e;case $d:return io(n,i,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Hd:o=10;break e;case Vd:o=9;break e;case ma:o=11;break e;case ha:o=14;break e;case cn:o=16,r=null;break e}throw Error(_(130,e==null?e:typeof e,""))}return t=kt(o,n,t,i),t.elementType=e,t.type=r,t.lanes=l,t}function $n(e,t,n,r){return e=kt(7,e,r,t),e.lanes=n,e}function io(e,t,n,r){return e=kt(22,e,r,t),e.elementType=$d,e.lanes=n,e.stateNode={isHidden:!1},e}function Fo(e,t,n){return e=kt(6,e,null,t),e.lanes=n,e}function Bo(e,t,n){return t=kt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Qg(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=bo(0),this.expirationTimes=bo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=bo(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ka(e,t,n,r,i,l,o,a,u){return e=new Qg(e,t,n,a,u),t===1?(t=1,l===!0&&(t|=8)):t=0,l=kt(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Aa(l),e}function Yg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Rp(e){if(!e)return Cn;e=e._reactInternals;e:{if(Xn(e)!==e||e.tag!==1)throw Error(_(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(it(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(_(171))}if(e.tag===1){var n=e.type;if(it(n))return Rf(e,n,t)}return t}function Op(e,t,n,r,i,l,o,a,u){return e=Ka(n,r,!0,e,i,l,o,a,u),e.context=Rp(null),n=e.current,r=Ge(),i=kn(n),l=Zt(r,i),l.callback=t??null,bn(n,l,i),e.current.lanes=i,Li(e,i,r),lt(e,r),e}function lo(e,t,n,r){var i=t.current,l=Ge(),o=kn(i);return n=Rp(n),t.context===null?t.context=n:t.pendingContext=n,t=Zt(l,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=bn(i,t,o),e!==null&&(Lt(e,i,o,l),dl(e,i,o)),o}function $l(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Sc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Xa(e,t){Sc(e,t),(e=e.alternate)&&Sc(e,t)}function Gg(){return null}var Dp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ja(e){this._internalRoot=e}oo.prototype.render=Ja.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(_(409));lo(e,t,null,null)};oo.prototype.unmount=Ja.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Gn(function(){lo(null,e,null,null)}),t[nn]=null}};function oo(e){this._internalRoot=e}oo.prototype.unstable_scheduleHydration=function(e){if(e){var t=hf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<fn.length&&t!==0&&t<fn[n].priority;n++);fn.splice(n,0,e),n===0&&yf(e)}};function Za(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function so(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function jc(){}function Kg(e,t,n,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var c=$l(o);l.call(c)}}var o=Op(t,r,e,0,null,!1,!1,"",jc);return e._reactRootContainer=o,e[nn]=o.current,Si(e.nodeType===8?e.parentNode:e),Gn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=$l(u);a.call(c)}}var u=Ka(e,0,!1,null,null,!1,!1,"",jc);return e._reactRootContainer=u,e[nn]=u.current,Si(e.nodeType===8?e.parentNode:e),Gn(function(){lo(t,u,n,r)}),u}function ao(e,t,n,r,i){var l=n._reactRootContainer;if(l){var o=l;if(typeof i=="function"){var a=i;i=function(){var u=$l(o);a.call(u)}}lo(t,o,e,i)}else o=Kg(n,t,e,i,r);return $l(o)}pf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ti(t.pendingLanes);n!==0&&(xa(t,n|1),lt(t,Ce()),!(re&6)&&(_r=Ce()+500,zn()))}break;case 13:Gn(function(){var r=rn(e,1);if(r!==null){var i=Ge();Lt(r,e,1,i)}}),Xa(e,1)}};va=function(e){if(e.tag===13){var t=rn(e,134217728);if(t!==null){var n=Ge();Lt(t,e,134217728,n)}Xa(e,134217728)}};mf=function(e){if(e.tag===13){var t=kn(e),n=rn(e,t);if(n!==null){var r=Ge();Lt(n,e,t,r)}Xa(e,t)}};hf=function(){return ce};gf=function(e,t){var n=ce;try{return ce=e,t()}finally{ce=n}};hs=function(e,t,n){switch(t){case"input":if(as(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Jl(r);if(!i)throw Error(_(90));qd(r),as(r,i)}}}break;case"textarea":Yd(e,n);break;case"select":t=n.value,t!=null&&hr(e,!!n.multiple,t,!1)}};tf=qa;nf=Gn;var Xg={usingClientEntryPoint:!1,Events:[Ri,ar,Jl,Zd,ef,qa]},Gr={findFiberByHostInstance:Bn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Jg={bundleType:Gr.bundleType,version:Gr.version,rendererPackageName:Gr.rendererPackageName,rendererConfig:Gr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:on.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=of(e),e===null?null:e.stateNode},findFiberByHostInstance:Gr.findFiberByHostInstance||Gg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var nl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!nl.isDisabled&&nl.supportsFiber)try{Yl=nl.inject(Jg),Vt=nl}catch{}}gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xg;gt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Za(t))throw Error(_(200));return Yg(e,t,null,n)};gt.createRoot=function(e,t){if(!Za(e))throw Error(_(299));var n=!1,r="",i=Dp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Ka(e,1,!1,null,null,n,!1,r,i),e[nn]=t.current,Si(e.nodeType===8?e.parentNode:e),new Ja(t)};gt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(_(188)):(e=Object.keys(e).join(","),Error(_(268,e)));return e=of(t),e=e===null?null:e.stateNode,e};gt.flushSync=function(e){return Gn(e)};gt.hydrate=function(e,t,n){if(!so(t))throw Error(_(200));return ao(null,e,t,!0,n)};gt.hydrateRoot=function(e,t,n){if(!Za(e))throw Error(_(405));var r=n!=null&&n.hydratedSources||null,i=!1,l="",o=Dp;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Op(t,null,e,1,n??null,i,!1,l,o),e[nn]=t.current,Si(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new oo(t)};gt.render=function(e,t,n){if(!so(t))throw Error(_(200));return ao(null,e,t,!1,n)};gt.unmountComponentAtNode=function(e){if(!so(e))throw Error(_(40));return e._reactRootContainer?(Gn(function(){ao(null,null,e,!1,function(){e._reactRootContainer=null,e[nn]=null})}),!0):!1};gt.unstable_batchedUpdates=qa;gt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!so(n))throw Error(_(200));if(e==null||e._reactInternals===void 0)throw Error(_(38));return ao(e,t,n,!1,r)};gt.version="18.3.1-next-f1338f8080-20240426";function Fp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fp)}catch(e){console.error(e)}}Fp(),Dd.exports=gt;var Zg=Dd.exports,Cc=Zg;ts.createRoot=Cc.createRoot,ts.hydrateRoot=Cc.hydrateRoot;function e0(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const t0=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,n0=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,r0={};function Nc(e,t){return(r0.jsx?n0:t0).test(e)}const i0=/[ \t\n\f\r]/g;function l0(e){return typeof e=="object"?e.type==="text"?Ec(e.value):!1:Ec(e)}function Ec(e){return e.replace(i0,"")===""}class Di{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}Di.prototype.normal={};Di.prototype.property={};Di.prototype.space=void 0;function Bp(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new Di(n,r,t)}function Ys(e){return e.toLowerCase()}class st{constructor(t,n){this.attribute=n,this.property=t}}st.prototype.attribute="";st.prototype.booleanish=!1;st.prototype.boolean=!1;st.prototype.commaOrSpaceSeparated=!1;st.prototype.commaSeparated=!1;st.prototype.defined=!1;st.prototype.mustUseProperty=!1;st.prototype.number=!1;st.prototype.overloadedBoolean=!1;st.prototype.property="";st.prototype.spaceSeparated=!1;st.prototype.space=void 0;let o0=0;const X=Jn(),Ne=Jn(),Gs=Jn(),P=Jn(),pe=Jn(),wr=Jn(),ct=Jn();function Jn(){return 2**++o0}const Ks=Object.freeze(Object.defineProperty({__proto__:null,boolean:X,booleanish:Ne,commaOrSpaceSeparated:ct,commaSeparated:wr,number:P,overloadedBoolean:Gs,spaceSeparated:pe},Symbol.toStringTag,{value:"Module"})),Uo=Object.keys(Ks);class eu extends st{constructor(t,n,r,i){let l=-1;if(super(t,n),zc(this,"space",i),typeof r=="number")for(;++l<Uo.length;){const o=Uo[l];zc(this,Uo[l],(r&Ks[o])===Ks[o])}}}eu.prototype.defined=!0;function zc(e,t,n){n&&(e[t]=n)}function Ar(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const l=new eu(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(l.mustUseProperty=!0),t[r]=l,n[Ys(r)]=r,n[Ys(l.attribute)]=r}return new Di(t,n,e.space)}const Up=Ar({properties:{ariaActiveDescendant:null,ariaAtomic:Ne,ariaAutoComplete:null,ariaBusy:Ne,ariaChecked:Ne,ariaColCount:P,ariaColIndex:P,ariaColSpan:P,ariaControls:pe,ariaCurrent:null,ariaDescribedBy:pe,ariaDetails:null,ariaDisabled:Ne,ariaDropEffect:pe,ariaErrorMessage:null,ariaExpanded:Ne,ariaFlowTo:pe,ariaGrabbed:Ne,ariaHasPopup:null,ariaHidden:Ne,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:pe,ariaLevel:P,ariaLive:null,ariaModal:Ne,ariaMultiLine:Ne,ariaMultiSelectable:Ne,ariaOrientation:null,ariaOwns:pe,ariaPlaceholder:null,ariaPosInSet:P,ariaPressed:Ne,ariaReadOnly:Ne,ariaRelevant:null,ariaRequired:Ne,ariaRoleDescription:pe,ariaRowCount:P,ariaRowIndex:P,ariaRowSpan:P,ariaSelected:Ne,ariaSetSize:P,ariaSort:null,ariaValueMax:P,ariaValueMin:P,ariaValueNow:P,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function Hp(e,t){return t in e?e[t]:t}function Vp(e,t){return Hp(e,t.toLowerCase())}const s0=Ar({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:wr,acceptCharset:pe,accessKey:pe,action:null,allow:null,allowFullScreen:X,allowPaymentRequest:X,allowUserMedia:X,alt:null,as:null,async:X,autoCapitalize:null,autoComplete:pe,autoFocus:X,autoPlay:X,blocking:pe,capture:null,charSet:null,checked:X,cite:null,className:pe,cols:P,colSpan:null,content:null,contentEditable:Ne,controls:X,controlsList:pe,coords:P|wr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:X,defer:X,dir:null,dirName:null,disabled:X,download:Gs,draggable:Ne,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:X,formTarget:null,headers:pe,height:P,hidden:Gs,high:P,href:null,hrefLang:null,htmlFor:pe,httpEquiv:pe,id:null,imageSizes:null,imageSrcSet:null,inert:X,inputMode:null,integrity:null,is:null,isMap:X,itemId:null,itemProp:pe,itemRef:pe,itemScope:X,itemType:pe,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:X,low:P,manifest:null,max:null,maxLength:P,media:null,method:null,min:null,minLength:P,multiple:X,muted:X,name:null,nonce:null,noModule:X,noValidate:X,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:X,optimum:P,pattern:null,ping:pe,placeholder:null,playsInline:X,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:X,referrerPolicy:null,rel:pe,required:X,reversed:X,rows:P,rowSpan:P,sandbox:pe,scope:null,scoped:X,seamless:X,selected:X,shadowRootClonable:X,shadowRootDelegatesFocus:X,shadowRootMode:null,shape:null,size:P,sizes:null,slot:null,span:P,spellCheck:Ne,src:null,srcDoc:null,srcLang:null,srcSet:null,start:P,step:null,style:null,tabIndex:P,target:null,title:null,translate:null,type:null,typeMustMatch:X,useMap:null,value:Ne,width:P,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:pe,axis:null,background:null,bgColor:null,border:P,borderColor:null,bottomMargin:P,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:X,declare:X,event:null,face:null,frame:null,frameBorder:null,hSpace:P,leftMargin:P,link:null,longDesc:null,lowSrc:null,marginHeight:P,marginWidth:P,noResize:X,noHref:X,noShade:X,noWrap:X,object:null,profile:null,prompt:null,rev:null,rightMargin:P,rules:null,scheme:null,scrolling:Ne,standby:null,summary:null,text:null,topMargin:P,valueType:null,version:null,vAlign:null,vLink:null,vSpace:P,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:X,disableRemotePlayback:X,prefix:null,property:null,results:P,security:null,unselectable:null},space:"html",transform:Vp}),a0=Ar({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ct,accentHeight:P,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:P,amplitude:P,arabicForm:null,ascent:P,attributeName:null,attributeType:null,azimuth:P,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:P,by:null,calcMode:null,capHeight:P,className:pe,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:P,diffuseConstant:P,direction:null,display:null,dur:null,divisor:P,dominantBaseline:null,download:X,dx:null,dy:null,edgeMode:null,editable:null,elevation:P,enableBackground:null,end:null,event:null,exponent:P,externalResourcesRequired:null,fill:null,fillOpacity:P,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:wr,g2:wr,glyphName:wr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:P,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:P,horizOriginX:P,horizOriginY:P,id:null,ideographic:P,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:P,k:P,k1:P,k2:P,k3:P,k4:P,kernelMatrix:ct,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:P,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:P,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:P,overlineThickness:P,paintOrder:null,panose1:null,path:null,pathLength:P,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:pe,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:P,pointsAtY:P,pointsAtZ:P,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ct,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ct,rev:ct,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ct,requiredFeatures:ct,requiredFonts:ct,requiredFormats:ct,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:P,specularExponent:P,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:P,strikethroughThickness:P,string:null,stroke:null,strokeDashArray:ct,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:P,strokeOpacity:P,strokeWidth:null,style:null,surfaceScale:P,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ct,tabIndex:P,tableValues:null,target:null,targetX:P,targetY:P,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ct,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:P,underlineThickness:P,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:P,values:null,vAlphabetic:P,vMathematical:P,vectorEffect:null,vHanging:P,vIdeographic:P,version:null,vertAdvY:P,vertOriginX:P,vertOriginY:P,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:P,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Hp}),$p=Ar({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),Wp=Ar({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Vp}),qp=Ar({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),u0={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},c0=/[A-Z]/g,_c=/-[a-z]/g,d0=/^data[-\w.:]+$/i;function f0(e,t){const n=Ys(t);let r=t,i=st;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&d0.test(t)){if(t.charAt(4)==="-"){const l=t.slice(5).replace(_c,m0);r="data"+l.charAt(0).toUpperCase()+l.slice(1)}else{const l=t.slice(4);if(!_c.test(l)){let o=l.replace(c0,p0);o.charAt(0)!=="-"&&(o="-"+o),t="data"+o}}i=eu}return new i(r,t)}function p0(e){return"-"+e.toLowerCase()}function m0(e){return e.charAt(1).toUpperCase()}const h0=Bp([Up,s0,$p,Wp,qp],"html"),tu=Bp([Up,a0,$p,Wp,qp],"svg");function g0(e){return e.join(" ").trim()}var nu={},Pc=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,y0=/\n/g,x0=/^\s*/,v0=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,b0=/^:\s*/,w0=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,k0=/^[;\s]*/,S0=/^\s+|\s+$/g,j0=`
`,Ic="/",Tc="*",Dn="",C0="comment",N0="declaration";function E0(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(k){var w=k.match(y0);w&&(n+=w.length);var E=k.lastIndexOf(j0);r=~E?k.length-E:r+k.length}function l(){var k={line:n,column:r};return function(w){return w.position=new o(k),c(),w}}function o(k){this.start=k,this.end={line:n,column:r},this.source=t.source}o.prototype.content=e;function a(k){var w=new Error(t.source+":"+n+":"+r+": "+k);if(w.reason=k,w.filename=t.source,w.line=n,w.column=r,w.source=e,!t.silent)throw w}function u(k){var w=k.exec(e);if(w){var E=w[0];return i(E),e=e.slice(E.length),w}}function c(){u(x0)}function d(k){var w;for(k=k||[];w=f();)w!==!1&&k.push(w);return k}function f(){var k=l();if(!(Ic!=e.charAt(0)||Tc!=e.charAt(1))){for(var w=2;Dn!=e.charAt(w)&&(Tc!=e.charAt(w)||Ic!=e.charAt(w+1));)++w;if(w+=2,Dn===e.charAt(w-1))return a("End of comment missing");var E=e.slice(2,w-2);return r+=2,i(E),e=e.slice(w),r+=2,k({type:C0,comment:E})}}function m(){var k=l(),w=u(v0);if(w){if(f(),!u(b0))return a("property missing ':'");var E=u(w0),h=k({type:N0,property:Ac(w[0].replace(Pc,Dn)),value:E?Ac(E[0].replace(Pc,Dn)):Dn});return u(k0),h}}function p(){var k=[];d(k);for(var w;w=m();)w!==!1&&(k.push(w),d(k));return k}return c(),p()}function Ac(e){return e?e.replace(S0,Dn):Dn}var z0=E0,_0=bl&&bl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(nu,"__esModule",{value:!0});nu.default=I0;const P0=_0(z0);function I0(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,P0.default)(e),i=typeof t=="function";return r.forEach(l=>{if(l.type!=="declaration")return;const{property:o,value:a}=l;i?t(o,a,l):a&&(n=n||{},n[o]=a)}),n}var uo={};Object.defineProperty(uo,"__esModule",{value:!0});uo.camelCase=void 0;var T0=/^--[a-zA-Z0-9_-]+$/,A0=/-([a-z])/g,L0=/^[^-]+$/,M0=/^-(webkit|moz|ms|o|khtml)-/,R0=/^-(ms)-/,O0=function(e){return!e||L0.test(e)||T0.test(e)},D0=function(e,t){return t.toUpperCase()},Lc=function(e,t){return"".concat(t,"-")},F0=function(e,t){return t===void 0&&(t={}),O0(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(R0,Lc):e=e.replace(M0,Lc),e.replace(A0,D0))};uo.camelCase=F0;var B0=bl&&bl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},U0=B0(nu),H0=uo;function Xs(e,t){var n={};return!e||typeof e!="string"||(0,U0.default)(e,function(r,i){r&&i&&(n[(0,H0.camelCase)(r,t)]=i)}),n}Xs.default=Xs;var V0=Xs;const $0=la(V0),Qp=Yp("end"),ru=Yp("start");function Yp(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function W0(e){const t=ru(e),n=Qp(e);if(t&&n)return{start:t,end:n}}function fi(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Mc(e.position):"start"in e||"end"in e?Mc(e):"line"in e||"column"in e?Js(e):""}function Js(e){return Rc(e&&e.line)+":"+Rc(e&&e.column)}function Mc(e){return Js(e&&e.start)+"-"+Js(e&&e.end)}function Rc(e){return e&&typeof e=="number"?e:1}class $e extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",l={},o=!1;if(n&&("line"in n&&"column"in n?l={place:n}:"start"in n&&"end"in n?l={place:n}:"type"in n?l={ancestors:[n],place:n.position}:l={...n}),typeof t=="string"?i=t:!l.cause&&t&&(o=!0,i=t.message,l.cause=t),!l.ruleId&&!l.source&&typeof r=="string"){const u=r.indexOf(":");u===-1?l.ruleId=r:(l.source=r.slice(0,u),l.ruleId=r.slice(u+1))}if(!l.place&&l.ancestors&&l.ancestors){const u=l.ancestors[l.ancestors.length-1];u&&(l.place=u.position)}const a=l.place&&"start"in l.place?l.place.start:l.place;this.ancestors=l.ancestors||void 0,this.cause=l.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=a?a.line:void 0,this.name=fi(l.place)||"1:1",this.place=l.place||void 0,this.reason=this.message,this.ruleId=l.ruleId||void 0,this.source=l.source||void 0,this.stack=o&&l.cause&&typeof l.cause.stack=="string"?l.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}$e.prototype.file="";$e.prototype.name="";$e.prototype.reason="";$e.prototype.message="";$e.prototype.stack="";$e.prototype.column=void 0;$e.prototype.line=void 0;$e.prototype.ancestors=void 0;$e.prototype.cause=void 0;$e.prototype.fatal=void 0;$e.prototype.place=void 0;$e.prototype.ruleId=void 0;$e.prototype.source=void 0;const iu={}.hasOwnProperty,q0=new Map,Q0=/[A-Z]/g,Y0=new Set(["table","tbody","thead","tfoot","tr"]),G0=new Set(["td","th"]),Gp="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function K0(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=iy(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=ry(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?tu:h0,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},l=Kp(i,e,void 0);return l&&typeof l!="string"?l:i.create(e,i.Fragment,{children:l||void 0},void 0)}function Kp(e,t,n){if(t.type==="element")return X0(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return J0(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return ey(e,t,n);if(t.type==="mdxjsEsm")return Z0(e,t);if(t.type==="root")return ty(e,t,n);if(t.type==="text")return ny(e,t)}function X0(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=tu,e.schema=i),e.ancestors.push(t);const l=Jp(e,t.tagName,!1),o=ly(e,t);let a=ou(e,t);return Y0.has(t.tagName)&&(a=a.filter(function(u){return typeof u=="string"?!l0(u):!0})),Xp(e,o,l,t),lu(o,a),e.ancestors.pop(),e.schema=r,e.create(t,l,o,n)}function J0(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}Ti(e,t.position)}function Z0(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Ti(e,t.position)}function ey(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=tu,e.schema=i),e.ancestors.push(t);const l=t.name===null?e.Fragment:Jp(e,t.name,!0),o=oy(e,t),a=ou(e,t);return Xp(e,o,l,t),lu(o,a),e.ancestors.pop(),e.schema=r,e.create(t,l,o,n)}function ty(e,t,n){const r={};return lu(r,ou(e,t)),e.create(t,e.Fragment,r,n)}function ny(e,t){return t.value}function Xp(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function lu(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function ry(e,t,n){return r;function r(i,l,o,a){const c=Array.isArray(o.children)?n:t;return a?c(l,o,a):c(l,o)}}function iy(e,t){return n;function n(r,i,l,o){const a=Array.isArray(l.children),u=ru(r);return t(i,l,o,a,{columnNumber:u?u.column-1:void 0,fileName:e,lineNumber:u?u.line:void 0},void 0)}}function ly(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&iu.call(t.properties,i)){const l=sy(e,i,t.properties[i]);if(l){const[o,a]=l;e.tableCellAlignToStyle&&o==="align"&&typeof a=="string"&&G0.has(t.tagName)?r=a:n[o]=a}}if(r){const l=n.style||(n.style={});l[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function oy(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const l=r.data.estree.body[0];l.type;const o=l.expression;o.type;const a=o.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else Ti(e,t.position);else{const i=r.name;let l;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,l=e.evaluater.evaluateExpression(a.expression)}else Ti(e,t.position);else l=r.value===null?!0:r.value;n[i]=l}return n}function ou(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:q0;for(;++r<t.children.length;){const l=t.children[r];let o;if(e.passKeys){const u=l.type==="element"?l.tagName:l.type==="mdxJsxFlowElement"||l.type==="mdxJsxTextElement"?l.name:void 0;if(u){const c=i.get(u)||0;o=u+"-"+c,i.set(u,c+1)}}const a=Kp(e,l,o);a!==void 0&&n.push(a)}return n}function sy(e,t,n){const r=f0(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?e0(n):g0(n)),r.property==="style"){let i=typeof n=="object"?n:ay(e,String(n));return e.stylePropertyNameCase==="css"&&(i=uy(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?u0[r.property]||r.property:r.attribute,n]}}function ay(e,t){try{return $0(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new $e("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=Gp+"#cannot-parse-style-attribute",i}}function Jp(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let l=-1,o;for(;++l<i.length;){const a=Nc(i[l])?{type:"Identifier",name:i[l]}:{type:"Literal",value:i[l]};o=o?{type:"MemberExpression",object:o,property:a,computed:!!(l&&a.type==="Literal"),optional:!1}:a}r=o}else r=Nc(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return iu.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);Ti(e)}function Ti(e,t){const n=new $e("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Gp+"#cannot-handle-mdx-estrees-without-createevaluater",n}function uy(e){const t={};let n;for(n in e)iu.call(e,n)&&(t[cy(n)]=e[n]);return t}function cy(e){let t=e.replace(Q0,dy);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function dy(e){return"-"+e.toLowerCase()}const Ho={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},fy={};function py(e,t){const n=fy,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Zp(e,r,i)}function Zp(e,t,n){if(my(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return Oc(e.children,t,n)}return Array.isArray(e)?Oc(e,t,n):""}function Oc(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=Zp(e[i],t,n);return r.join("")}function my(e){return!!(e&&typeof e=="object")}const Dc=document.createElement("i");function su(e){const t="&"+e+";";Dc.innerHTML=t;const n=Dc.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function qt(e,t,n,r){const i=e.length;let l=0,o;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);l<r.length;)o=r.slice(l,l+1e4),o.unshift(t,0),e.splice(...o),l+=1e4,t+=1e4}function wt(e,t){return e.length>0?(qt(e,e.length,0,t),e):t}const Fc={}.hasOwnProperty;function hy(e){const t={};let n=-1;for(;++n<e.length;)gy(t,e[n]);return t}function gy(e,t){let n;for(n in t){const i=(Fc.call(e,n)?e[n]:void 0)||(e[n]={}),l=t[n];let o;if(l)for(o in l){Fc.call(i,o)||(i[o]=[]);const a=l[o];yy(i[o],Array.isArray(a)?a:a?[a]:[])}}}function yy(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);qt(e,0,0,r)}function em(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function kr(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ht=_n(/[A-Za-z]/),pt=_n(/[\dA-Za-z]/),xy=_n(/[#-'*+\--9=?A-Z^-~]/);function Zs(e){return e!==null&&(e<32||e===127)}const ea=_n(/\d/),vy=_n(/[\dA-Fa-f]/),by=_n(/[!-/:-@[-`{-~]/);function q(e){return e!==null&&e<-2}function ot(e){return e!==null&&(e<0||e===32)}function oe(e){return e===-2||e===-1||e===32}const wy=_n(new RegExp("\\p{P}|\\p{S}","u")),ky=_n(/\s/);function _n(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function Lr(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const l=e.charCodeAt(n);let o="";if(l===37&&pt(e.charCodeAt(n+1))&&pt(e.charCodeAt(n+2)))i=2;else if(l<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l))||(o=String.fromCharCode(l));else if(l>55295&&l<57344){const a=e.charCodeAt(n+1);l<56320&&a>56319&&a<57344?(o=String.fromCharCode(l,a),i=1):o="�"}else o=String.fromCharCode(l);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,o=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function he(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let l=0;return o;function o(u){return oe(u)?(e.enter(n),a(u)):t(u)}function a(u){return oe(u)&&l++<i?(e.consume(u),a):(e.exit(n),t(u))}}const Sy={tokenize:jy};function jy(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),he(e,t,"linePrefix")}function i(a){return e.enter("paragraph"),l(a)}function l(a){const u=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=u),n=u,o(a)}function o(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return q(a)?(e.consume(a),e.exit("chunkText"),l):(e.consume(a),o)}}const Cy={tokenize:Ny},Bc={tokenize:Ey};function Ny(e){const t=this,n=[];let r=0,i,l,o;return a;function a(x){if(r<n.length){const j=n[r];return t.containerState=j[1],e.attempt(j[0].continuation,u,c)(x)}return c(x)}function u(x){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&g();const j=t.events.length;let C=j,S;for(;C--;)if(t.events[C][0]==="exit"&&t.events[C][1].type==="chunkFlow"){S=t.events[C][1].end;break}h(r);let z=j;for(;z<t.events.length;)t.events[z][1].end={...S},z++;return qt(t.events,C+1,0,t.events.slice(j)),t.events.length=z,c(x)}return a(x)}function c(x){if(r===n.length){if(!i)return m(x);if(i.currentConstruct&&i.currentConstruct.concrete)return k(x);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Bc,d,f)(x)}function d(x){return i&&g(),h(r),m(x)}function f(x){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,k(x)}function m(x){return t.containerState={},e.attempt(Bc,p,k)(x)}function p(x){return r++,n.push([t.currentConstruct,t.containerState]),m(x)}function k(x){if(x===null){i&&g(),h(0),e.consume(x);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:l}),w(x)}function w(x){if(x===null){E(e.exit("chunkFlow"),!0),h(0),e.consume(x);return}return q(x)?(e.consume(x),E(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(x),w)}function E(x,j){const C=t.sliceStream(x);if(j&&C.push(null),x.previous=l,l&&(l.next=x),l=x,i.defineSkip(x.start),i.write(C),t.parser.lazy[x.start.line]){let S=i.events.length;for(;S--;)if(i.events[S][1].start.offset<o&&(!i.events[S][1].end||i.events[S][1].end.offset>o))return;const z=t.events.length;let I=z,U,M;for(;I--;)if(t.events[I][0]==="exit"&&t.events[I][1].type==="chunkFlow"){if(U){M=t.events[I][1].end;break}U=!0}for(h(r),S=z;S<t.events.length;)t.events[S][1].end={...M},S++;qt(t.events,I+1,0,t.events.slice(z)),t.events.length=S}}function h(x){let j=n.length;for(;j-- >x;){const C=n[j];t.containerState=C[1],C[0].exit.call(t,e)}n.length=x}function g(){i.write([null]),l=void 0,i=void 0,t.containerState._closeFlow=void 0}}function Ey(e,t,n){return he(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Uc(e){if(e===null||ot(e)||ky(e))return 1;if(wy(e))return 2}function au(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const l=e[i].resolveAll;l&&!r.includes(l)&&(t=l(t,n),r.push(l))}return t}const ta={name:"attention",resolveAll:zy,tokenize:_y};function zy(e,t){let n=-1,r,i,l,o,a,u,c,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;u=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const f={...e[r][1].end},m={...e[n][1].start};Hc(f,-u),Hc(m,u),o={type:u>1?"strongSequence":"emphasisSequence",start:f,end:{...e[r][1].end}},a={type:u>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:m},l={type:u>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:u>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},e[r][1].end={...o.start},e[n][1].start={...a.end},c=[],e[r][1].end.offset-e[r][1].start.offset&&(c=wt(c,[["enter",e[r][1],t],["exit",e[r][1],t]])),c=wt(c,[["enter",i,t],["enter",o,t],["exit",o,t],["enter",l,t]]),c=wt(c,au(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),c=wt(c,[["exit",l,t],["enter",a,t],["exit",a,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,c=wt(c,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,qt(e,r-1,n-r+3,c),n=r+c.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function _y(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Uc(r);let l;return o;function o(u){return l=u,e.enter("attentionSequence"),a(u)}function a(u){if(u===l)return e.consume(u),a;const c=e.exit("attentionSequence"),d=Uc(u),f=!d||d===2&&i||n.includes(u),m=!i||i===2&&d||n.includes(r);return c._open=!!(l===42?f:f&&(i||!m)),c._close=!!(l===42?m:m&&(d||!f)),t(u)}}function Hc(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const Py={name:"autolink",tokenize:Iy};function Iy(e,t,n){let r=0;return i;function i(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),l}function l(p){return Ht(p)?(e.consume(p),o):p===64?n(p):c(p)}function o(p){return p===43||p===45||p===46||pt(p)?(r=1,a(p)):c(p)}function a(p){return p===58?(e.consume(p),r=0,u):(p===43||p===45||p===46||pt(p))&&r++<32?(e.consume(p),a):(r=0,c(p))}function u(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||Zs(p)?n(p):(e.consume(p),u)}function c(p){return p===64?(e.consume(p),d):xy(p)?(e.consume(p),c):n(p)}function d(p){return pt(p)?f(p):n(p)}function f(p){return p===46?(e.consume(p),r=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):m(p)}function m(p){if((p===45||pt(p))&&r++<63){const k=p===45?m:f;return e.consume(p),k}return n(p)}}const co={partial:!0,tokenize:Ty};function Ty(e,t,n){return r;function r(l){return oe(l)?he(e,i,"linePrefix")(l):i(l)}function i(l){return l===null||q(l)?t(l):n(l)}}const tm={continuation:{tokenize:Ly},exit:My,name:"blockQuote",tokenize:Ay};function Ay(e,t,n){const r=this;return i;function i(o){if(o===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(o),e.exit("blockQuoteMarker"),l}return n(o)}function l(o){return oe(o)?(e.enter("blockQuotePrefixWhitespace"),e.consume(o),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(o))}}function Ly(e,t,n){const r=this;return i;function i(o){return oe(o)?he(e,l,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):l(o)}function l(o){return e.attempt(tm,t,n)(o)}}function My(e){e.exit("blockQuote")}const nm={name:"characterEscape",tokenize:Ry};function Ry(e,t,n){return r;function r(l){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(l),e.exit("escapeMarker"),i}function i(l){return by(l)?(e.enter("characterEscapeValue"),e.consume(l),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(l)}}const rm={name:"characterReference",tokenize:Oy};function Oy(e,t,n){const r=this;let i=0,l,o;return a;function a(f){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(f),e.exit("characterReferenceMarker"),u}function u(f){return f===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(f),e.exit("characterReferenceMarkerNumeric"),c):(e.enter("characterReferenceValue"),l=31,o=pt,d(f))}function c(f){return f===88||f===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(f),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),l=6,o=vy,d):(e.enter("characterReferenceValue"),l=7,o=ea,d(f))}function d(f){if(f===59&&i){const m=e.exit("characterReferenceValue");return o===pt&&!su(r.sliceSerialize(m))?n(f):(e.enter("characterReferenceMarker"),e.consume(f),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return o(f)&&i++<l?(e.consume(f),d):n(f)}}const Vc={partial:!0,tokenize:Fy},$c={concrete:!0,name:"codeFenced",tokenize:Dy};function Dy(e,t,n){const r=this,i={partial:!0,tokenize:C};let l=0,o=0,a;return u;function u(S){return c(S)}function c(S){const z=r.events[r.events.length-1];return l=z&&z[1].type==="linePrefix"?z[2].sliceSerialize(z[1],!0).length:0,a=S,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(S)}function d(S){return S===a?(o++,e.consume(S),d):o<3?n(S):(e.exit("codeFencedFenceSequence"),oe(S)?he(e,f,"whitespace")(S):f(S))}function f(S){return S===null||q(S)?(e.exit("codeFencedFence"),r.interrupt?t(S):e.check(Vc,w,j)(S)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),m(S))}function m(S){return S===null||q(S)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),f(S)):oe(S)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),he(e,p,"whitespace")(S)):S===96&&S===a?n(S):(e.consume(S),m)}function p(S){return S===null||q(S)?f(S):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),k(S))}function k(S){return S===null||q(S)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),f(S)):S===96&&S===a?n(S):(e.consume(S),k)}function w(S){return e.attempt(i,j,E)(S)}function E(S){return e.enter("lineEnding"),e.consume(S),e.exit("lineEnding"),h}function h(S){return l>0&&oe(S)?he(e,g,"linePrefix",l+1)(S):g(S)}function g(S){return S===null||q(S)?e.check(Vc,w,j)(S):(e.enter("codeFlowValue"),x(S))}function x(S){return S===null||q(S)?(e.exit("codeFlowValue"),g(S)):(e.consume(S),x)}function j(S){return e.exit("codeFenced"),t(S)}function C(S,z,I){let U=0;return M;function M(K){return S.enter("lineEnding"),S.consume(K),S.exit("lineEnding"),R}function R(K){return S.enter("codeFencedFence"),oe(K)?he(S,O,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(K):O(K)}function O(K){return K===a?(S.enter("codeFencedFenceSequence"),Y(K)):I(K)}function Y(K){return K===a?(U++,S.consume(K),Y):U>=o?(S.exit("codeFencedFenceSequence"),oe(K)?he(S,ie,"whitespace")(K):ie(K)):I(K)}function ie(K){return K===null||q(K)?(S.exit("codeFencedFence"),z(K)):I(K)}}}function Fy(e,t,n){const r=this;return i;function i(o){return o===null?n(o):(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l)}function l(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}const Vo={name:"codeIndented",tokenize:Uy},By={partial:!0,tokenize:Hy};function Uy(e,t,n){const r=this;return i;function i(c){return e.enter("codeIndented"),he(e,l,"linePrefix",5)(c)}function l(c){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?o(c):n(c)}function o(c){return c===null?u(c):q(c)?e.attempt(By,o,u)(c):(e.enter("codeFlowValue"),a(c))}function a(c){return c===null||q(c)?(e.exit("codeFlowValue"),o(c)):(e.consume(c),a)}function u(c){return e.exit("codeIndented"),t(c)}}function Hy(e,t,n){const r=this;return i;function i(o){return r.parser.lazy[r.now().line]?n(o):q(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i):he(e,l,"linePrefix",5)(o)}function l(o){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):q(o)?i(o):n(o)}}const Vy={name:"codeText",previous:Wy,resolve:$y,tokenize:qy};function $y(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function Wy(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function qy(e,t,n){let r=0,i,l;return o;function o(f){return e.enter("codeText"),e.enter("codeTextSequence"),a(f)}function a(f){return f===96?(e.consume(f),r++,a):(e.exit("codeTextSequence"),u(f))}function u(f){return f===null?n(f):f===32?(e.enter("space"),e.consume(f),e.exit("space"),u):f===96?(l=e.enter("codeTextSequence"),i=0,d(f)):q(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),u):(e.enter("codeTextData"),c(f))}function c(f){return f===null||f===32||f===96||q(f)?(e.exit("codeTextData"),u(f)):(e.consume(f),c)}function d(f){return f===96?(e.consume(f),i++,d):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(f)):(l.type="codeTextData",c(f))}}class Qy{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const l=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&Kr(this.left,r),l.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Kr(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Kr(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);Kr(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Kr(this.left,n.reverse())}}}function Kr(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function im(e){const t={};let n=-1,r,i,l,o,a,u,c;const d=new Qy(e);for(;++n<d.length;){for(;n in t;)n=t[n];if(r=d.get(n),n&&r[1].type==="chunkFlow"&&d.get(n-1)[1].type==="listItemPrefix"&&(u=r[1]._tokenizer.events,l=0,l<u.length&&u[l][1].type==="lineEndingBlank"&&(l+=2),l<u.length&&u[l][1].type==="content"))for(;++l<u.length&&u[l][1].type!=="content";)u[l][1].type==="chunkText"&&(u[l][1]._isInFirstContentOfListItem=!0,l++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,Yy(d,n)),n=t[n],c=!0);else if(r[1]._container){for(l=n,i=void 0;l--;)if(o=d.get(l),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(i&&(d.get(i)[1].type="lineEndingBlank"),o[1].type="lineEnding",i=l);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;i&&(r[1].end={...d.get(i)[1].start},a=d.slice(i,n),a.unshift(r),d.splice(i,n-i+1,a))}}return qt(e,0,Number.POSITIVE_INFINITY,d.slice(0)),!c}function Yy(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const l=[];let o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const a=o.events,u=[],c={};let d,f,m=-1,p=n,k=0,w=0;const E=[w];for(;p;){for(;e.get(++i)[1]!==p;);l.push(i),p._tokenizer||(d=r.sliceStream(p),p.next||d.push(null),f&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(d),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),f=p,p=p.next}for(p=n;++m<a.length;)a[m][0]==="exit"&&a[m-1][0]==="enter"&&a[m][1].type===a[m-1][1].type&&a[m][1].start.line!==a[m][1].end.line&&(w=m+1,E.push(w),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):E.pop(),m=E.length;m--;){const h=a.slice(E[m],E[m+1]),g=l.pop();u.push([g,g+h.length-1]),e.splice(g,2,h)}for(u.reverse(),m=-1;++m<u.length;)c[k+u[m][0]]=k+u[m][1],k+=u[m][1]-u[m][0]-1;return c}const Gy={resolve:Xy,tokenize:Jy},Ky={partial:!0,tokenize:Zy};function Xy(e){return im(e),e}function Jy(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?l(a):q(a)?e.check(Ky,o,l)(a):(e.consume(a),i)}function l(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function o(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function Zy(e,t,n){const r=this;return i;function i(o){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),he(e,l,"linePrefix")}function l(o){if(o===null||q(o))return n(o);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):e.interrupt(r.parser.constructs.flow,n,t)(o)}}function lm(e,t,n,r,i,l,o,a,u){const c=u||Number.POSITIVE_INFINITY;let d=0;return f;function f(h){return h===60?(e.enter(r),e.enter(i),e.enter(l),e.consume(h),e.exit(l),m):h===null||h===32||h===41||Zs(h)?n(h):(e.enter(r),e.enter(o),e.enter(a),e.enter("chunkString",{contentType:"string"}),w(h))}function m(h){return h===62?(e.enter(l),e.consume(h),e.exit(l),e.exit(i),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(h))}function p(h){return h===62?(e.exit("chunkString"),e.exit(a),m(h)):h===null||h===60||q(h)?n(h):(e.consume(h),h===92?k:p)}function k(h){return h===60||h===62||h===92?(e.consume(h),p):p(h)}function w(h){return!d&&(h===null||h===41||ot(h))?(e.exit("chunkString"),e.exit(a),e.exit(o),e.exit(r),t(h)):d<c&&h===40?(e.consume(h),d++,w):h===41?(e.consume(h),d--,w):h===null||h===32||h===40||Zs(h)?n(h):(e.consume(h),h===92?E:w)}function E(h){return h===40||h===41||h===92?(e.consume(h),w):w(h)}}function om(e,t,n,r,i,l){const o=this;let a=0,u;return c;function c(p){return e.enter(r),e.enter(i),e.consume(p),e.exit(i),e.enter(l),d}function d(p){return a>999||p===null||p===91||p===93&&!u||p===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?n(p):p===93?(e.exit(l),e.enter(i),e.consume(p),e.exit(i),e.exit(r),t):q(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),f(p))}function f(p){return p===null||p===91||p===93||q(p)||a++>999?(e.exit("chunkString"),d(p)):(e.consume(p),u||(u=!oe(p)),p===92?m:f)}function m(p){return p===91||p===92||p===93?(e.consume(p),a++,f):f(p)}}function sm(e,t,n,r,i,l){let o;return a;function a(m){return m===34||m===39||m===40?(e.enter(r),e.enter(i),e.consume(m),e.exit(i),o=m===40?41:m,u):n(m)}function u(m){return m===o?(e.enter(i),e.consume(m),e.exit(i),e.exit(r),t):(e.enter(l),c(m))}function c(m){return m===o?(e.exit(l),u(o)):m===null?n(m):q(m)?(e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),he(e,c,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(m))}function d(m){return m===o||m===null||q(m)?(e.exit("chunkString"),c(m)):(e.consume(m),m===92?f:d)}function f(m){return m===o||m===92?(e.consume(m),d):d(m)}}function pi(e,t){let n;return r;function r(i){return q(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):oe(i)?he(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const ex={name:"definition",tokenize:nx},tx={partial:!0,tokenize:rx};function nx(e,t,n){const r=this;let i;return l;function l(p){return e.enter("definition"),o(p)}function o(p){return om.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return i=kr(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),u):n(p)}function u(p){return ot(p)?pi(e,c)(p):c(p)}function c(p){return lm(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(tx,f,f)(p)}function f(p){return oe(p)?he(e,m,"whitespace")(p):m(p)}function m(p){return p===null||q(p)?(e.exit("definition"),r.parser.defined.push(i),t(p)):n(p)}}function rx(e,t,n){return r;function r(a){return ot(a)?pi(e,i)(a):n(a)}function i(a){return sm(e,l,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function l(a){return oe(a)?he(e,o,"whitespace")(a):o(a)}function o(a){return a===null||q(a)?t(a):n(a)}}const ix={name:"hardBreakEscape",tokenize:lx};function lx(e,t,n){return r;function r(l){return e.enter("hardBreakEscape"),e.consume(l),i}function i(l){return q(l)?(e.exit("hardBreakEscape"),t(l)):n(l)}}const ox={name:"headingAtx",resolve:sx,tokenize:ax};function sx(e,t){let n=e.length-2,r=3,i,l;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},l={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},qt(e,r,n-r+1,[["enter",i,t],["enter",l,t],["exit",l,t],["exit",i,t]])),e}function ax(e,t,n){let r=0;return i;function i(d){return e.enter("atxHeading"),l(d)}function l(d){return e.enter("atxHeadingSequence"),o(d)}function o(d){return d===35&&r++<6?(e.consume(d),o):d===null||ot(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),u(d)):d===null||q(d)?(e.exit("atxHeading"),t(d)):oe(d)?he(e,a,"whitespace")(d):(e.enter("atxHeadingText"),c(d))}function u(d){return d===35?(e.consume(d),u):(e.exit("atxHeadingSequence"),a(d))}function c(d){return d===null||d===35||ot(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),c)}}const ux=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Wc=["pre","script","style","textarea"],cx={concrete:!0,name:"htmlFlow",resolveTo:px,tokenize:mx},dx={partial:!0,tokenize:gx},fx={partial:!0,tokenize:hx};function px(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function mx(e,t,n){const r=this;let i,l,o,a,u;return c;function c(b){return d(b)}function d(b){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(b),f}function f(b){return b===33?(e.consume(b),m):b===47?(e.consume(b),l=!0,w):b===63?(e.consume(b),i=3,r.interrupt?t:y):Ht(b)?(e.consume(b),o=String.fromCharCode(b),E):n(b)}function m(b){return b===45?(e.consume(b),i=2,p):b===91?(e.consume(b),i=5,a=0,k):Ht(b)?(e.consume(b),i=4,r.interrupt?t:y):n(b)}function p(b){return b===45?(e.consume(b),r.interrupt?t:y):n(b)}function k(b){const fe="CDATA[";return b===fe.charCodeAt(a++)?(e.consume(b),a===fe.length?r.interrupt?t:O:k):n(b)}function w(b){return Ht(b)?(e.consume(b),o=String.fromCharCode(b),E):n(b)}function E(b){if(b===null||b===47||b===62||ot(b)){const fe=b===47,ke=o.toLowerCase();return!fe&&!l&&Wc.includes(ke)?(i=1,r.interrupt?t(b):O(b)):ux.includes(o.toLowerCase())?(i=6,fe?(e.consume(b),h):r.interrupt?t(b):O(b)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(b):l?g(b):x(b))}return b===45||pt(b)?(e.consume(b),o+=String.fromCharCode(b),E):n(b)}function h(b){return b===62?(e.consume(b),r.interrupt?t:O):n(b)}function g(b){return oe(b)?(e.consume(b),g):M(b)}function x(b){return b===47?(e.consume(b),M):b===58||b===95||Ht(b)?(e.consume(b),j):oe(b)?(e.consume(b),x):M(b)}function j(b){return b===45||b===46||b===58||b===95||pt(b)?(e.consume(b),j):C(b)}function C(b){return b===61?(e.consume(b),S):oe(b)?(e.consume(b),C):x(b)}function S(b){return b===null||b===60||b===61||b===62||b===96?n(b):b===34||b===39?(e.consume(b),u=b,z):oe(b)?(e.consume(b),S):I(b)}function z(b){return b===u?(e.consume(b),u=null,U):b===null||q(b)?n(b):(e.consume(b),z)}function I(b){return b===null||b===34||b===39||b===47||b===60||b===61||b===62||b===96||ot(b)?C(b):(e.consume(b),I)}function U(b){return b===47||b===62||oe(b)?x(b):n(b)}function M(b){return b===62?(e.consume(b),R):n(b)}function R(b){return b===null||q(b)?O(b):oe(b)?(e.consume(b),R):n(b)}function O(b){return b===45&&i===2?(e.consume(b),se):b===60&&i===1?(e.consume(b),le):b===62&&i===4?(e.consume(b),G):b===63&&i===3?(e.consume(b),y):b===93&&i===5?(e.consume(b),V):q(b)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(dx,J,Y)(b)):b===null||q(b)?(e.exit("htmlFlowData"),Y(b)):(e.consume(b),O)}function Y(b){return e.check(fx,ie,J)(b)}function ie(b){return e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),K}function K(b){return b===null||q(b)?Y(b):(e.enter("htmlFlowData"),O(b))}function se(b){return b===45?(e.consume(b),y):O(b)}function le(b){return b===47?(e.consume(b),o="",T):O(b)}function T(b){if(b===62){const fe=o.toLowerCase();return Wc.includes(fe)?(e.consume(b),G):O(b)}return Ht(b)&&o.length<8?(e.consume(b),o+=String.fromCharCode(b),T):O(b)}function V(b){return b===93?(e.consume(b),y):O(b)}function y(b){return b===62?(e.consume(b),G):b===45&&i===2?(e.consume(b),y):O(b)}function G(b){return b===null||q(b)?(e.exit("htmlFlowData"),J(b)):(e.consume(b),G)}function J(b){return e.exit("htmlFlow"),t(b)}}function hx(e,t,n){const r=this;return i;function i(o){return q(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l):n(o)}function l(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}function gx(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(co,t,n)}}const yx={name:"htmlText",tokenize:xx};function xx(e,t,n){const r=this;let i,l,o;return a;function a(y){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(y),u}function u(y){return y===33?(e.consume(y),c):y===47?(e.consume(y),C):y===63?(e.consume(y),x):Ht(y)?(e.consume(y),I):n(y)}function c(y){return y===45?(e.consume(y),d):y===91?(e.consume(y),l=0,k):Ht(y)?(e.consume(y),g):n(y)}function d(y){return y===45?(e.consume(y),p):n(y)}function f(y){return y===null?n(y):y===45?(e.consume(y),m):q(y)?(o=f,le(y)):(e.consume(y),f)}function m(y){return y===45?(e.consume(y),p):f(y)}function p(y){return y===62?se(y):y===45?m(y):f(y)}function k(y){const G="CDATA[";return y===G.charCodeAt(l++)?(e.consume(y),l===G.length?w:k):n(y)}function w(y){return y===null?n(y):y===93?(e.consume(y),E):q(y)?(o=w,le(y)):(e.consume(y),w)}function E(y){return y===93?(e.consume(y),h):w(y)}function h(y){return y===62?se(y):y===93?(e.consume(y),h):w(y)}function g(y){return y===null||y===62?se(y):q(y)?(o=g,le(y)):(e.consume(y),g)}function x(y){return y===null?n(y):y===63?(e.consume(y),j):q(y)?(o=x,le(y)):(e.consume(y),x)}function j(y){return y===62?se(y):x(y)}function C(y){return Ht(y)?(e.consume(y),S):n(y)}function S(y){return y===45||pt(y)?(e.consume(y),S):z(y)}function z(y){return q(y)?(o=z,le(y)):oe(y)?(e.consume(y),z):se(y)}function I(y){return y===45||pt(y)?(e.consume(y),I):y===47||y===62||ot(y)?U(y):n(y)}function U(y){return y===47?(e.consume(y),se):y===58||y===95||Ht(y)?(e.consume(y),M):q(y)?(o=U,le(y)):oe(y)?(e.consume(y),U):se(y)}function M(y){return y===45||y===46||y===58||y===95||pt(y)?(e.consume(y),M):R(y)}function R(y){return y===61?(e.consume(y),O):q(y)?(o=R,le(y)):oe(y)?(e.consume(y),R):U(y)}function O(y){return y===null||y===60||y===61||y===62||y===96?n(y):y===34||y===39?(e.consume(y),i=y,Y):q(y)?(o=O,le(y)):oe(y)?(e.consume(y),O):(e.consume(y),ie)}function Y(y){return y===i?(e.consume(y),i=void 0,K):y===null?n(y):q(y)?(o=Y,le(y)):(e.consume(y),Y)}function ie(y){return y===null||y===34||y===39||y===60||y===61||y===96?n(y):y===47||y===62||ot(y)?U(y):(e.consume(y),ie)}function K(y){return y===47||y===62||ot(y)?U(y):n(y)}function se(y){return y===62?(e.consume(y),e.exit("htmlTextData"),e.exit("htmlText"),t):n(y)}function le(y){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(y),e.exit("lineEnding"),T}function T(y){return oe(y)?he(e,V,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(y):V(y)}function V(y){return e.enter("htmlTextData"),o(y)}}const uu={name:"labelEnd",resolveAll:kx,resolveTo:Sx,tokenize:jx},vx={tokenize:Cx},bx={tokenize:Nx},wx={tokenize:Ex};function kx(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&qt(e,0,e.length,n),e}function Sx(e,t){let n=e.length,r=0,i,l,o,a;for(;n--;)if(i=e[n][1],l){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(o){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(l=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(o=n);const u={type:e[l][1].type==="labelLink"?"link":"image",start:{...e[l][1].start},end:{...e[e.length-1][1].end}},c={type:"label",start:{...e[l][1].start},end:{...e[o][1].end}},d={type:"labelText",start:{...e[l+r+2][1].end},end:{...e[o-2][1].start}};return a=[["enter",u,t],["enter",c,t]],a=wt(a,e.slice(l+1,l+r+3)),a=wt(a,[["enter",d,t]]),a=wt(a,au(t.parser.constructs.insideSpan.null,e.slice(l+r+4,o-3),t)),a=wt(a,[["exit",d,t],e[o-2],e[o-1],["exit",c,t]]),a=wt(a,e.slice(o+1)),a=wt(a,[["exit",u,t]]),qt(e,l,e.length,a),e}function jx(e,t,n){const r=this;let i=r.events.length,l,o;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){l=r.events[i][1];break}return a;function a(m){return l?l._inactive?f(m):(o=r.parser.defined.includes(kr(r.sliceSerialize({start:l.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(m),e.exit("labelMarker"),e.exit("labelEnd"),u):n(m)}function u(m){return m===40?e.attempt(vx,d,o?d:f)(m):m===91?e.attempt(bx,d,o?c:f)(m):o?d(m):f(m)}function c(m){return e.attempt(wx,d,f)(m)}function d(m){return t(m)}function f(m){return l._balanced=!0,n(m)}}function Cx(e,t,n){return r;function r(f){return e.enter("resource"),e.enter("resourceMarker"),e.consume(f),e.exit("resourceMarker"),i}function i(f){return ot(f)?pi(e,l)(f):l(f)}function l(f){return f===41?d(f):lm(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(f)}function o(f){return ot(f)?pi(e,u)(f):d(f)}function a(f){return n(f)}function u(f){return f===34||f===39||f===40?sm(e,c,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(f):d(f)}function c(f){return ot(f)?pi(e,d)(f):d(f)}function d(f){return f===41?(e.enter("resourceMarker"),e.consume(f),e.exit("resourceMarker"),e.exit("resource"),t):n(f)}}function Nx(e,t,n){const r=this;return i;function i(a){return om.call(r,e,l,o,"reference","referenceMarker","referenceString")(a)}function l(a){return r.parser.defined.includes(kr(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function o(a){return n(a)}}function Ex(e,t,n){return r;function r(l){return e.enter("reference"),e.enter("referenceMarker"),e.consume(l),e.exit("referenceMarker"),i}function i(l){return l===93?(e.enter("referenceMarker"),e.consume(l),e.exit("referenceMarker"),e.exit("reference"),t):n(l)}}const zx={name:"labelStartImage",resolveAll:uu.resolveAll,tokenize:_x};function _x(e,t,n){const r=this;return i;function i(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),l}function l(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),o):n(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const Px={name:"labelStartLink",resolveAll:uu.resolveAll,tokenize:Ix};function Ix(e,t,n){const r=this;return i;function i(o){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(o),e.exit("labelMarker"),e.exit("labelLink"),l}function l(o){return o===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(o):t(o)}}const $o={name:"lineEnding",tokenize:Tx};function Tx(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),he(e,t,"linePrefix")}}const xl={name:"thematicBreak",tokenize:Ax};function Ax(e,t,n){let r=0,i;return l;function l(c){return e.enter("thematicBreak"),o(c)}function o(c){return i=c,a(c)}function a(c){return c===i?(e.enter("thematicBreakSequence"),u(c)):r>=3&&(c===null||q(c))?(e.exit("thematicBreak"),t(c)):n(c)}function u(c){return c===i?(e.consume(c),r++,u):(e.exit("thematicBreakSequence"),oe(c)?he(e,a,"whitespace")(c):a(c))}}const et={continuation:{tokenize:Ox},exit:Fx,name:"list",tokenize:Rx},Lx={partial:!0,tokenize:Bx},Mx={partial:!0,tokenize:Dx};function Rx(e,t,n){const r=this,i=r.events[r.events.length-1];let l=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,o=0;return a;function a(p){const k=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(k==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:ea(p)){if(r.containerState.type||(r.containerState.type=k,e.enter(k,{_container:!0})),k==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(xl,n,c)(p):c(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),u(p)}return n(p)}function u(p){return ea(p)&&++o<10?(e.consume(p),u):(!r.interrupt||o<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),c(p)):n(p)}function c(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(co,r.interrupt?n:d,e.attempt(Lx,m,f))}function d(p){return r.containerState.initialBlankLine=!0,l++,m(p)}function f(p){return oe(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),m):n(p)}function m(p){return r.containerState.size=l+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function Ox(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(co,i,l);function i(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,he(e,t,"listItemIndent",r.containerState.size+1)(a)}function l(a){return r.containerState.furtherBlankLines||!oe(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(Mx,t,o)(a))}function o(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,he(e,e.attempt(et,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function Dx(e,t,n){const r=this;return he(e,i,"listItemIndent",r.containerState.size+1);function i(l){const o=r.events[r.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===r.containerState.size?t(l):n(l)}}function Fx(e){e.exit(this.containerState.type)}function Bx(e,t,n){const r=this;return he(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(l){const o=r.events[r.events.length-1];return!oe(l)&&o&&o[1].type==="listItemPrefixWhitespace"?t(l):n(l)}}const qc={name:"setextUnderline",resolveTo:Ux,tokenize:Hx};function Ux(e,t){let n=e.length,r,i,l;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!l&&e[n][1].type==="definition"&&(l=n);const o={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",l?(e.splice(i,0,["enter",o,t]),e.splice(l+1,0,["exit",e[r][1],t]),e[r][1].end={...e[l][1].end}):e[r][1]=o,e.push(["exit",o,t]),e}function Hx(e,t,n){const r=this;let i;return l;function l(c){let d=r.events.length,f;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){f=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||f)?(e.enter("setextHeadingLine"),i=c,o(c)):n(c)}function o(c){return e.enter("setextHeadingLineSequence"),a(c)}function a(c){return c===i?(e.consume(c),a):(e.exit("setextHeadingLineSequence"),oe(c)?he(e,u,"lineSuffix")(c):u(c))}function u(c){return c===null||q(c)?(e.exit("setextHeadingLine"),t(c)):n(c)}}const Vx={tokenize:$x};function $x(e){const t=this,n=e.attempt(co,r,e.attempt(this.parser.constructs.flowInitial,i,he(e,e.attempt(this.parser.constructs.flow,i,e.attempt(Gy,i)),"linePrefix")));return n;function r(l){if(l===null){e.consume(l);return}return e.enter("lineEndingBlank"),e.consume(l),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(l){if(l===null){e.consume(l);return}return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const Wx={resolveAll:um()},qx=am("string"),Qx=am("text");function am(e){return{resolveAll:um(e==="text"?Yx:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],l=n.attempt(i,o,a);return o;function o(d){return c(d)?l(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),u}function u(d){return c(d)?(n.exit("data"),l(d)):(n.consume(d),u)}function c(d){if(d===null)return!0;const f=i[d];let m=-1;if(f)for(;++m<f.length;){const p=f[m];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function um(e){return t;function t(n,r){let i=-1,l;for(;++i<=n.length;)l===void 0?n[i]&&n[i][1].type==="data"&&(l=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==l+2&&(n[l][1].end=n[i-1][1].end,n.splice(l+2,i-l-2),i=l+2),l=void 0);return e?e(n,r):n}}function Yx(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let l=i.length,o=-1,a=0,u;for(;l--;){const c=i[l];if(typeof c=="string"){for(o=c.length;c.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(c===-2)u=!0,a++;else if(c!==-1){l++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(a=0),a){const c={type:n===e.length||u||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:l?o:r.start._bufferIndex+o,_index:r.start._index+l,line:r.end.line,column:r.end.column-a,offset:r.end.offset-a},end:{...r.end}};r.end={...c.start},r.start.offset===r.end.offset?Object.assign(r,c):(e.splice(n,0,["enter",c,t],["exit",c,t]),n+=2)}n++}return e}const Gx={42:et,43:et,45:et,48:et,49:et,50:et,51:et,52:et,53:et,54:et,55:et,56:et,57:et,62:tm},Kx={91:ex},Xx={[-2]:Vo,[-1]:Vo,32:Vo},Jx={35:ox,42:xl,45:[qc,xl],60:cx,61:qc,95:xl,96:$c,126:$c},Zx={38:rm,92:nm},e1={[-5]:$o,[-4]:$o,[-3]:$o,33:zx,38:rm,42:ta,60:[Py,yx],91:Px,92:[ix,nm],93:uu,95:ta,96:Vy},t1={null:[ta,Wx]},n1={null:[42,95]},r1={null:[]},i1=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:n1,contentInitial:Kx,disable:r1,document:Gx,flow:Jx,flowInitial:Xx,insideSpan:t1,string:Zx,text:e1},Symbol.toStringTag,{value:"Module"}));function l1(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},l=[];let o=[],a=[];const u={attempt:z(C),check:z(S),consume:g,enter:x,exit:j,interrupt:z(S,{interrupt:!0})},c={code:null,containerState:{},defineSkip:w,events:[],now:k,parser:e,previous:null,sliceSerialize:m,sliceStream:p,write:f};let d=t.tokenize.call(c,u);return t.resolveAll&&l.push(t),c;function f(R){return o=wt(o,R),E(),o[o.length-1]!==null?[]:(I(t,0),c.events=au(l,c.events,c),c.events)}function m(R,O){return s1(p(R),O)}function p(R){return o1(o,R)}function k(){const{_bufferIndex:R,_index:O,line:Y,column:ie,offset:K}=r;return{_bufferIndex:R,_index:O,line:Y,column:ie,offset:K}}function w(R){i[R.line]=R.column,M()}function E(){let R;for(;r._index<o.length;){const O=o[r._index];if(typeof O=="string")for(R=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===R&&r._bufferIndex<O.length;)h(O.charCodeAt(r._bufferIndex));else h(O)}}function h(R){d=d(R)}function g(R){q(R)?(r.line++,r.column=1,r.offset+=R===-3?2:1,M()):R!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),c.previous=R}function x(R,O){const Y=O||{};return Y.type=R,Y.start=k(),c.events.push(["enter",Y,c]),a.push(Y),Y}function j(R){const O=a.pop();return O.end=k(),c.events.push(["exit",O,c]),O}function C(R,O){I(R,O.from)}function S(R,O){O.restore()}function z(R,O){return Y;function Y(ie,K,se){let le,T,V,y;return Array.isArray(ie)?J(ie):"tokenize"in ie?J([ie]):G(ie);function G(ae){return Te;function Te(Je){const Re=Je!==null&&ae[Je],at=Je!==null&&ae.null,Rt=[...Array.isArray(Re)?Re:Re?[Re]:[],...Array.isArray(at)?at:at?[at]:[]];return J(Rt)(Je)}}function J(ae){return le=ae,T=0,ae.length===0?se:b(ae[T])}function b(ae){return Te;function Te(Je){return y=U(),V=ae,ae.partial||(c.currentConstruct=ae),ae.name&&c.parser.constructs.disable.null.includes(ae.name)?ke():ae.tokenize.call(O?Object.assign(Object.create(c),O):c,u,fe,ke)(Je)}}function fe(ae){return R(V,y),K}function ke(ae){return y.restore(),++T<le.length?b(le[T]):se}}}function I(R,O){R.resolveAll&&!l.includes(R)&&l.push(R),R.resolve&&qt(c.events,O,c.events.length-O,R.resolve(c.events.slice(O),c)),R.resolveTo&&(c.events=R.resolveTo(c.events,c))}function U(){const R=k(),O=c.previous,Y=c.currentConstruct,ie=c.events.length,K=Array.from(a);return{from:ie,restore:se};function se(){r=R,c.previous=O,c.currentConstruct=Y,c.events.length=ie,a=K,M()}}function M(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function o1(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,l=t.end._bufferIndex;let o;if(n===i)o=[e[n].slice(r,l)];else{if(o=e.slice(n,i),r>-1){const a=o[0];typeof a=="string"?o[0]=a.slice(r):o.shift()}l>0&&o.push(e[i].slice(0,l))}return o}function s1(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const l=e[n];let o;if(typeof l=="string")o=l;else switch(l){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&i)continue;o=" ";break}default:o=String.fromCharCode(l)}i=l===-2,r.push(o)}return r.join("")}function a1(e){const r={constructs:hy([i1,...(e||{}).extensions||[]]),content:i(Sy),defined:[],document:i(Cy),flow:i(Vx),lazy:{},string:i(qx),text:i(Qx)};return r;function i(l){return o;function o(a){return l1(r,l,a)}}}function u1(e){for(;!im(e););return e}const Qc=/[\0\t\n\r]/g;function c1(){let e=1,t="",n=!0,r;return i;function i(l,o,a){const u=[];let c,d,f,m,p;for(l=t+(typeof l=="string"?l.toString():new TextDecoder(o||void 0).decode(l)),f=0,t="",n&&(l.charCodeAt(0)===65279&&f++,n=void 0);f<l.length;){if(Qc.lastIndex=f,c=Qc.exec(l),m=c&&c.index!==void 0?c.index:l.length,p=l.charCodeAt(m),!c){t=l.slice(f);break}if(p===10&&f===m&&r)u.push(-3),r=void 0;else switch(r&&(u.push(-5),r=void 0),f<m&&(u.push(l.slice(f,m)),e+=m-f),p){case 0:{u.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,u.push(-2);e++<d;)u.push(-1);break}case 10:{u.push(-4),e=1;break}default:r=!0,e=1}f=m+1}return a&&(r&&u.push(-5),t&&u.push(t),u.push(null)),u}}const d1=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function f1(e){return e.replace(d1,p1)}function p1(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),l=i===120||i===88;return em(n.slice(l?2:1),l?16:10)}return su(n)||e}const cm={}.hasOwnProperty;function m1(e,t,n){return typeof t!="string"&&(n=t,t=void 0),h1(n)(u1(a1(n).document().write(c1()(e,t,!0))))}function h1(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:l(de),autolinkProtocol:U,autolinkEmail:U,atxHeading:l(Zn),blockQuote:l(at),characterEscape:U,characterReference:U,codeFenced:l(Rt),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:l(Rt,o),codeText:l(Mr,o),codeTextData:U,data:U,codeFlowValue:U,definition:l(Ot),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:l(Rr),hardBreakEscape:l(Nt),hardBreakTrailing:l(Nt),htmlFlow:l(Pn,o),htmlFlowData:U,htmlText:l(Pn,o),htmlTextData:U,image:l(te),label:o,link:l(de),listItem:l(Et),listItemValue:m,listOrdered:l(We,f),listUnordered:l(We),paragraph:l(sn),reference:b,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:l(Zn),strong:l(er),thematicBreak:l(Or)},exit:{atxHeading:u(),atxHeadingSequence:C,autolink:u(),autolinkEmail:Re,autolinkProtocol:Je,blockQuote:u(),characterEscapeValue:M,characterReferenceMarkerHexadecimal:ke,characterReferenceMarkerNumeric:ke,characterReferenceValue:ae,characterReference:Te,codeFenced:u(E),codeFencedFence:w,codeFencedFenceInfo:p,codeFencedFenceMeta:k,codeFlowValue:M,codeIndented:u(h),codeText:u(K),codeTextData:M,data:M,definition:u(),definitionDestinationString:j,definitionLabelString:g,definitionTitleString:x,emphasis:u(),hardBreakEscape:u(O),hardBreakTrailing:u(O),htmlFlow:u(Y),htmlFlowData:M,htmlText:u(ie),htmlTextData:M,image:u(le),label:V,labelText:T,lineEnding:R,link:u(se),listItem:u(),listOrdered:u(),listUnordered:u(),paragraph:u(),referenceString:fe,resourceDestinationString:y,resourceTitleString:G,resource:J,setextHeading:u(I),setextHeadingLineSequence:z,setextHeadingText:S,strong:u(),thematicBreak:u()}};dm(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(N){let L={type:"root",children:[]};const W={stack:[L],tokenStack:[],config:t,enter:a,exit:c,buffer:o,resume:d,data:n},Z=[];let ue=-1;for(;++ue<N.length;)if(N[ue][1].type==="listOrdered"||N[ue][1].type==="listUnordered")if(N[ue][0]==="enter")Z.push(ue);else{const ut=Z.pop();ue=i(N,ut,ue)}for(ue=-1;++ue<N.length;){const ut=t[N[ue][0]];cm.call(ut,N[ue][1].type)&&ut[N[ue][1].type].call(Object.assign({sliceSerialize:N[ue][2].sliceSerialize},W),N[ue][1])}if(W.tokenStack.length>0){const ut=W.tokenStack[W.tokenStack.length-1];(ut[1]||Yc).call(W,void 0,ut[0])}for(L.position={start:un(N.length>0?N[0][1].start:{line:1,column:1,offset:0}),end:un(N.length>0?N[N.length-2][1].end:{line:1,column:1,offset:0})},ue=-1;++ue<t.transforms.length;)L=t.transforms[ue](L)||L;return L}function i(N,L,W){let Z=L-1,ue=-1,ut=!1,Qt,zt,Tn,An;for(;++Z<=W;){const qe=N[Z];switch(qe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{qe[0]==="enter"?ue++:ue--,An=void 0;break}case"lineEndingBlank":{qe[0]==="enter"&&(Qt&&!An&&!ue&&!Tn&&(Tn=Z),An=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:An=void 0}if(!ue&&qe[0]==="enter"&&qe[1].type==="listItemPrefix"||ue===-1&&qe[0]==="exit"&&(qe[1].type==="listUnordered"||qe[1].type==="listOrdered")){if(Qt){let Oe=Z;for(zt=void 0;Oe--;){const Qe=N[Oe];if(Qe[1].type==="lineEnding"||Qe[1].type==="lineEndingBlank"){if(Qe[0]==="exit")continue;zt&&(N[zt][1].type="lineEndingBlank",ut=!0),Qe[1].type="lineEnding",zt=Oe}else if(!(Qe[1].type==="linePrefix"||Qe[1].type==="blockQuotePrefix"||Qe[1].type==="blockQuotePrefixWhitespace"||Qe[1].type==="blockQuoteMarker"||Qe[1].type==="listItemIndent"))break}Tn&&(!zt||Tn<zt)&&(Qt._spread=!0),Qt.end=Object.assign({},zt?N[zt][1].start:qe[1].end),N.splice(zt||Z,0,["exit",Qt,qe[2]]),Z++,W++}if(qe[1].type==="listItemPrefix"){const Oe={type:"listItem",_spread:!1,start:Object.assign({},qe[1].start),end:void 0};Qt=Oe,N.splice(Z,0,["enter",Oe,qe[2]]),Z++,W++,Tn=void 0,An=!0}}}return N[L][1]._spread=ut,W}function l(N,L){return W;function W(Z){a.call(this,N(Z),Z),L&&L.call(this,Z)}}function o(){this.stack.push({type:"fragment",children:[]})}function a(N,L,W){this.stack[this.stack.length-1].children.push(N),this.stack.push(N),this.tokenStack.push([L,W||void 0]),N.position={start:un(L.start),end:void 0}}function u(N){return L;function L(W){N&&N.call(this,W),c.call(this,W)}}function c(N,L){const W=this.stack.pop(),Z=this.tokenStack.pop();if(Z)Z[0].type!==N.type&&(L?L.call(this,N,Z[0]):(Z[1]||Yc).call(this,N,Z[0]));else throw new Error("Cannot close `"+N.type+"` ("+fi({start:N.start,end:N.end})+"): it’s not open");W.position.end=un(N.end)}function d(){return py(this.stack.pop())}function f(){this.data.expectingFirstListItemValue=!0}function m(N){if(this.data.expectingFirstListItemValue){const L=this.stack[this.stack.length-2];L.start=Number.parseInt(this.sliceSerialize(N),10),this.data.expectingFirstListItemValue=void 0}}function p(){const N=this.resume(),L=this.stack[this.stack.length-1];L.lang=N}function k(){const N=this.resume(),L=this.stack[this.stack.length-1];L.meta=N}function w(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function E(){const N=this.resume(),L=this.stack[this.stack.length-1];L.value=N.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function h(){const N=this.resume(),L=this.stack[this.stack.length-1];L.value=N.replace(/(\r?\n|\r)$/g,"")}function g(N){const L=this.resume(),W=this.stack[this.stack.length-1];W.label=L,W.identifier=kr(this.sliceSerialize(N)).toLowerCase()}function x(){const N=this.resume(),L=this.stack[this.stack.length-1];L.title=N}function j(){const N=this.resume(),L=this.stack[this.stack.length-1];L.url=N}function C(N){const L=this.stack[this.stack.length-1];if(!L.depth){const W=this.sliceSerialize(N).length;L.depth=W}}function S(){this.data.setextHeadingSlurpLineEnding=!0}function z(N){const L=this.stack[this.stack.length-1];L.depth=this.sliceSerialize(N).codePointAt(0)===61?1:2}function I(){this.data.setextHeadingSlurpLineEnding=void 0}function U(N){const W=this.stack[this.stack.length-1].children;let Z=W[W.length-1];(!Z||Z.type!=="text")&&(Z=In(),Z.position={start:un(N.start),end:void 0},W.push(Z)),this.stack.push(Z)}function M(N){const L=this.stack.pop();L.value+=this.sliceSerialize(N),L.position.end=un(N.end)}function R(N){const L=this.stack[this.stack.length-1];if(this.data.atHardBreak){const W=L.children[L.children.length-1];W.position.end=un(N.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(L.type)&&(U.call(this,N),M.call(this,N))}function O(){this.data.atHardBreak=!0}function Y(){const N=this.resume(),L=this.stack[this.stack.length-1];L.value=N}function ie(){const N=this.resume(),L=this.stack[this.stack.length-1];L.value=N}function K(){const N=this.resume(),L=this.stack[this.stack.length-1];L.value=N}function se(){const N=this.stack[this.stack.length-1];if(this.data.inReference){const L=this.data.referenceType||"shortcut";N.type+="Reference",N.referenceType=L,delete N.url,delete N.title}else delete N.identifier,delete N.label;this.data.referenceType=void 0}function le(){const N=this.stack[this.stack.length-1];if(this.data.inReference){const L=this.data.referenceType||"shortcut";N.type+="Reference",N.referenceType=L,delete N.url,delete N.title}else delete N.identifier,delete N.label;this.data.referenceType=void 0}function T(N){const L=this.sliceSerialize(N),W=this.stack[this.stack.length-2];W.label=f1(L),W.identifier=kr(L).toLowerCase()}function V(){const N=this.stack[this.stack.length-1],L=this.resume(),W=this.stack[this.stack.length-1];if(this.data.inReference=!0,W.type==="link"){const Z=N.children;W.children=Z}else W.alt=L}function y(){const N=this.resume(),L=this.stack[this.stack.length-1];L.url=N}function G(){const N=this.resume(),L=this.stack[this.stack.length-1];L.title=N}function J(){this.data.inReference=void 0}function b(){this.data.referenceType="collapsed"}function fe(N){const L=this.resume(),W=this.stack[this.stack.length-1];W.label=L,W.identifier=kr(this.sliceSerialize(N)).toLowerCase(),this.data.referenceType="full"}function ke(N){this.data.characterReferenceType=N.type}function ae(N){const L=this.sliceSerialize(N),W=this.data.characterReferenceType;let Z;W?(Z=em(L,W==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Z=su(L);const ue=this.stack[this.stack.length-1];ue.value+=Z}function Te(N){const L=this.stack.pop();L.position.end=un(N.end)}function Je(N){M.call(this,N);const L=this.stack[this.stack.length-1];L.url=this.sliceSerialize(N)}function Re(N){M.call(this,N);const L=this.stack[this.stack.length-1];L.url="mailto:"+this.sliceSerialize(N)}function at(){return{type:"blockquote",children:[]}}function Rt(){return{type:"code",lang:null,meta:null,value:""}}function Mr(){return{type:"inlineCode",value:""}}function Ot(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Rr(){return{type:"emphasis",children:[]}}function Zn(){return{type:"heading",depth:0,children:[]}}function Nt(){return{type:"break"}}function Pn(){return{type:"html",value:""}}function te(){return{type:"image",title:null,url:"",alt:null}}function de(){return{type:"link",title:null,url:"",children:[]}}function We(N){return{type:"list",ordered:N.type==="listOrdered",start:null,spread:N._spread,children:[]}}function Et(N){return{type:"listItem",spread:N._spread,checked:null,children:[]}}function sn(){return{type:"paragraph",children:[]}}function er(){return{type:"strong",children:[]}}function In(){return{type:"text",value:""}}function Or(){return{type:"thematicBreak"}}}function un(e){return{line:e.line,column:e.column,offset:e.offset}}function dm(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?dm(e,r):g1(e,r)}}function g1(e,t){let n;for(n in t)if(cm.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function Yc(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+fi({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+fi({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+fi({start:t.start,end:t.end})+") is still open")}function y1(e){const t=this;t.parser=n;function n(r){return m1(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function x1(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function v1(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function b1(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let l={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(l.data={meta:t.meta}),e.patch(t,l),l=e.applyData(t,l),l={type:"element",tagName:"pre",properties:{},children:[l]},e.patch(t,l),l}function w1(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function k1(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function S1(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=Lr(r.toLowerCase()),l=e.footnoteOrder.indexOf(r);let o,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=l+1,a+=1,e.footnoteCounts.set(r,a);const u={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(o)}]};e.patch(t,u);const c={type:"element",tagName:"sup",properties:{},children:[u]};return e.patch(t,c),e.applyData(t,c)}function j1(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function C1(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function fm(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),l=i[0];l&&l.type==="text"?l.value="["+l.value:i.unshift({type:"text",value:"["});const o=i[i.length-1];return o&&o.type==="text"?o.value+=r:i.push({type:"text",value:r}),i}function N1(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return fm(e,t);const i={src:Lr(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const l={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,l),e.applyData(t,l)}function E1(e,t){const n={src:Lr(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function z1(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function _1(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return fm(e,t);const i={href:Lr(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const l={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,l),e.applyData(t,l)}function P1(e,t){const n={href:Lr(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function I1(e,t,n){const r=e.all(t),i=n?T1(n):pm(t),l={},o=[];if(typeof t.checked=="boolean"){const d=r[0];let f;d&&d.type==="element"&&d.tagName==="p"?f=d:(f={type:"element",tagName:"p",properties:{},children:[]},r.unshift(f)),f.children.length>0&&f.children.unshift({type:"text",value:" "}),f.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),l.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(i||a!==0||d.type!=="element"||d.tagName!=="p")&&o.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!i?o.push(...d.children):o.push(d)}const u=r[r.length-1];u&&(i||u.type!=="element"||u.tagName!=="p")&&o.push({type:"text",value:`
`});const c={type:"element",tagName:"li",properties:l,children:o};return e.patch(t,c),e.applyData(t,c)}function T1(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=pm(n[r])}return t}function pm(e){const t=e.spread;return t??e.children.length>1}function A1(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const o=r[i];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const l={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,l),e.applyData(t,l)}function L1(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function M1(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function R1(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function O1(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const o={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],o),i.push(o)}if(n.length>0){const o={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=ru(t.children[1]),u=Qp(t.children[t.children.length-1]);a&&u&&(o.position={start:a,end:u}),i.push(o)}const l={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,l),e.applyData(t,l)}function D1(e,t,n){const r=n?n.children:void 0,l=(r?r.indexOf(t):1)===0?"th":"td",o=n&&n.type==="table"?n.align:void 0,a=o?o.length:t.children.length;let u=-1;const c=[];for(;++u<a;){const f=t.children[u],m={},p=o?o[u]:void 0;p&&(m.align=p);let k={type:"element",tagName:l,properties:m,children:[]};f&&(k.children=e.all(f),e.patch(f,k),k=e.applyData(f,k)),c.push(k)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(c,!0)};return e.patch(t,d),e.applyData(t,d)}function F1(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const Gc=9,Kc=32;function B1(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const l=[];for(;r;)l.push(Xc(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return l.push(Xc(t.slice(i),i>0,!1)),l.join("")}function Xc(e,t,n){let r=0,i=e.length;if(t){let l=e.codePointAt(r);for(;l===Gc||l===Kc;)r++,l=e.codePointAt(r)}if(n){let l=e.codePointAt(i-1);for(;l===Gc||l===Kc;)i--,l=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function U1(e,t){const n={type:"text",value:B1(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function H1(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const V1={blockquote:x1,break:v1,code:b1,delete:w1,emphasis:k1,footnoteReference:S1,heading:j1,html:C1,imageReference:N1,image:E1,inlineCode:z1,linkReference:_1,link:P1,listItem:I1,list:A1,paragraph:L1,root:M1,strong:R1,table:O1,tableCell:F1,tableRow:D1,text:U1,thematicBreak:H1,toml:rl,yaml:rl,definition:rl,footnoteDefinition:rl};function rl(){}const mm=-1,fo=0,mi=1,Wl=2,cu=3,du=4,fu=5,pu=6,hm=7,gm=8,Jc=typeof self=="object"?self:globalThis,$1=(e,t)=>{const n=(i,l)=>(e.set(l,i),i),r=i=>{if(e.has(i))return e.get(i);const[l,o]=t[i];switch(l){case fo:case mm:return n(o,i);case mi:{const a=n([],i);for(const u of o)a.push(r(u));return a}case Wl:{const a=n({},i);for(const[u,c]of o)a[r(u)]=r(c);return a}case cu:return n(new Date(o),i);case du:{const{source:a,flags:u}=o;return n(new RegExp(a,u),i)}case fu:{const a=n(new Map,i);for(const[u,c]of o)a.set(r(u),r(c));return a}case pu:{const a=n(new Set,i);for(const u of o)a.add(r(u));return a}case hm:{const{name:a,message:u}=o;return n(new Jc[a](u),i)}case gm:return n(BigInt(o),i);case"BigInt":return n(Object(BigInt(o)),i);case"ArrayBuffer":return n(new Uint8Array(o).buffer,o);case"DataView":{const{buffer:a}=new Uint8Array(o);return n(new DataView(a),o)}}return n(new Jc[l](o),i)};return r},Zc=e=>$1(new Map,e)(0),nr="",{toString:W1}={},{keys:q1}=Object,Xr=e=>{const t=typeof e;if(t!=="object"||!e)return[fo,t];const n=W1.call(e).slice(8,-1);switch(n){case"Array":return[mi,nr];case"Object":return[Wl,nr];case"Date":return[cu,nr];case"RegExp":return[du,nr];case"Map":return[fu,nr];case"Set":return[pu,nr];case"DataView":return[mi,n]}return n.includes("Array")?[mi,n]:n.includes("Error")?[hm,n]:[Wl,n]},il=([e,t])=>e===fo&&(t==="function"||t==="symbol"),Q1=(e,t,n,r)=>{const i=(o,a)=>{const u=r.push(o)-1;return n.set(a,u),u},l=o=>{if(n.has(o))return n.get(o);let[a,u]=Xr(o);switch(a){case fo:{let d=o;switch(u){case"bigint":a=gm,d=o.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+u);d=null;break;case"undefined":return i([mm],o)}return i([a,d],o)}case mi:{if(u){let m=o;return u==="DataView"?m=new Uint8Array(o.buffer):u==="ArrayBuffer"&&(m=new Uint8Array(o)),i([u,[...m]],o)}const d=[],f=i([a,d],o);for(const m of o)d.push(l(m));return f}case Wl:{if(u)switch(u){case"BigInt":return i([u,o.toString()],o);case"Boolean":case"Number":case"String":return i([u,o.valueOf()],o)}if(t&&"toJSON"in o)return l(o.toJSON());const d=[],f=i([a,d],o);for(const m of q1(o))(e||!il(Xr(o[m])))&&d.push([l(m),l(o[m])]);return f}case cu:return i([a,o.toISOString()],o);case du:{const{source:d,flags:f}=o;return i([a,{source:d,flags:f}],o)}case fu:{const d=[],f=i([a,d],o);for(const[m,p]of o)(e||!(il(Xr(m))||il(Xr(p))))&&d.push([l(m),l(p)]);return f}case pu:{const d=[],f=i([a,d],o);for(const m of o)(e||!il(Xr(m)))&&d.push(l(m));return f}}const{message:c}=o;return i([a,{name:u,message:c}],o)};return l},ed=(e,{json:t,lossy:n}={})=>{const r=[];return Q1(!(t||n),!!t,new Map,r)(e),r},ql=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?Zc(ed(e,t)):structuredClone(e):(e,t)=>Zc(ed(e,t));function Y1(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function G1(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function K1(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||Y1,r=e.options.footnoteBackLabel||G1,i=e.options.footnoteLabel||"Footnotes",l=e.options.footnoteLabelTagName||"h2",o=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let u=-1;for(;++u<e.footnoteOrder.length;){const c=e.footnoteById.get(e.footnoteOrder[u]);if(!c)continue;const d=e.all(c),f=String(c.identifier).toUpperCase(),m=Lr(f.toLowerCase());let p=0;const k=[],w=e.footnoteCounts.get(f);for(;w!==void 0&&++p<=w;){k.length>0&&k.push({type:"text",value:" "});let g=typeof n=="string"?n:n(u,p);typeof g=="string"&&(g={type:"text",value:g}),k.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+m+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(u,p),className:["data-footnote-backref"]},children:Array.isArray(g)?g:[g]})}const E=d[d.length-1];if(E&&E.type==="element"&&E.tagName==="p"){const g=E.children[E.children.length-1];g&&g.type==="text"?g.value+=" ":E.children.push({type:"text",value:" "}),E.children.push(...k)}else d.push(...k);const h={type:"element",tagName:"li",properties:{id:t+"fn-"+m},children:e.wrap(d,!0)};e.patch(c,h),a.push(h)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:l,properties:{...ql(o),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const ym=function(e){if(e==null)return ev;if(typeof e=="function")return po(e);if(typeof e=="object")return Array.isArray(e)?X1(e):J1(e);if(typeof e=="string")return Z1(e);throw new Error("Expected function, string, or object as test")};function X1(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=ym(e[n]);return po(r);function r(...i){let l=-1;for(;++l<t.length;)if(t[l].apply(this,i))return!0;return!1}}function J1(e){const t=e;return po(n);function n(r){const i=r;let l;for(l in e)if(i[l]!==t[l])return!1;return!0}}function Z1(e){return po(t);function t(n){return n&&n.type===e}}function po(e){return t;function t(n,r,i){return!!(tv(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function ev(){return!0}function tv(e){return e!==null&&typeof e=="object"&&"type"in e}const xm=[],nv=!0,td=!1,rv="skip";function iv(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const l=ym(i),o=r?-1:1;a(e,void 0,[])();function a(u,c,d){const f=u&&typeof u=="object"?u:{};if(typeof f.type=="string"){const p=typeof f.tagName=="string"?f.tagName:typeof f.name=="string"?f.name:void 0;Object.defineProperty(m,"name",{value:"node ("+(u.type+(p?"<"+p+">":""))+")"})}return m;function m(){let p=xm,k,w,E;if((!t||l(u,c,d[d.length-1]||void 0))&&(p=lv(n(u,d)),p[0]===td))return p;if("children"in u&&u.children){const h=u;if(h.children&&p[0]!==rv)for(w=(r?h.children.length:-1)+o,E=d.concat(h);w>-1&&w<h.children.length;){const g=h.children[w];if(k=a(g,w,E)(),k[0]===td)return k;w=typeof k[1]=="number"?k[1]:w+o}}return p}}}function lv(e){return Array.isArray(e)?e:typeof e=="number"?[nv,e]:e==null?xm:[e]}function vm(e,t,n,r){let i,l,o;typeof t=="function"&&typeof n!="function"?(l=void 0,o=t,i=n):(l=t,o=n,i=r),iv(e,l,a,i);function a(u,c){const d=c[c.length-1],f=d?d.children.indexOf(u):void 0;return o(u,f,d)}}const na={}.hasOwnProperty,ov={};function sv(e,t){const n=t||ov,r=new Map,i=new Map,l=new Map,o={...V1,...n.handlers},a={all:c,applyData:uv,definitionById:r,footnoteById:i,footnoteCounts:l,footnoteOrder:[],handlers:o,one:u,options:n,patch:av,wrap:dv};return vm(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const f=d.type==="definition"?r:i,m=String(d.identifier).toUpperCase();f.has(m)||f.set(m,d)}}),a;function u(d,f){const m=d.type,p=a.handlers[m];if(na.call(a.handlers,m)&&p)return p(a,d,f);if(a.options.passThrough&&a.options.passThrough.includes(m)){if("children"in d){const{children:w,...E}=d,h=ql(E);return h.children=a.all(d),h}return ql(d)}return(a.options.unknownHandler||cv)(a,d,f)}function c(d){const f=[];if("children"in d){const m=d.children;let p=-1;for(;++p<m.length;){const k=a.one(m[p],d);if(k){if(p&&m[p-1].type==="break"&&(!Array.isArray(k)&&k.type==="text"&&(k.value=nd(k.value)),!Array.isArray(k)&&k.type==="element")){const w=k.children[0];w&&w.type==="text"&&(w.value=nd(w.value))}Array.isArray(k)?f.push(...k):f.push(k)}}}return f}}function av(e,t){e.position&&(t.position=W0(e))}function uv(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,l=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const o="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:o}}n.type==="element"&&l&&Object.assign(n.properties,ql(l)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function cv(e,t){const n=t.data||{},r="value"in t&&!(na.call(n,"hProperties")||na.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function dv(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function nd(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function rd(e,t){const n=sv(e,t),r=n.one(e,void 0),i=K1(n),l=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&l.children.push({type:"text",value:`
`},i),l}function fv(e,t){return e&&"run"in e?async function(n,r){const i=rd(n,{file:r,...t});await e.run(i,r)}:function(n,r){return rd(n,{file:r,...e||t})}}function id(e){if(e)throw e}var vl=Object.prototype.hasOwnProperty,bm=Object.prototype.toString,ld=Object.defineProperty,od=Object.getOwnPropertyDescriptor,sd=function(t){return typeof Array.isArray=="function"?Array.isArray(t):bm.call(t)==="[object Array]"},ad=function(t){if(!t||bm.call(t)!=="[object Object]")return!1;var n=vl.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&vl.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||vl.call(t,i)},ud=function(t,n){ld&&n.name==="__proto__"?ld(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},cd=function(t,n){if(n==="__proto__")if(vl.call(t,n)){if(od)return od(t,n).value}else return;return t[n]},pv=function e(){var t,n,r,i,l,o,a=arguments[0],u=1,c=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},u=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});u<c;++u)if(t=arguments[u],t!=null)for(n in t)r=cd(a,n),i=cd(t,n),a!==i&&(d&&i&&(ad(i)||(l=sd(i)))?(l?(l=!1,o=r&&sd(r)?r:[]):o=r&&ad(r)?r:{},ud(a,{name:n,newValue:e(d,o,i)})):typeof i<"u"&&ud(a,{name:n,newValue:i}));return a};const Wo=la(pv);function ra(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function mv(){const e=[],t={run:n,use:r};return t;function n(...i){let l=-1;const o=i.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);a(null,...i);function a(u,...c){const d=e[++l];let f=-1;if(u){o(u);return}for(;++f<i.length;)(c[f]===null||c[f]===void 0)&&(c[f]=i[f]);i=c,d?hv(d,a)(...c):o(null,...c)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function hv(e,t){let n;return r;function r(...o){const a=e.length>o.length;let u;a&&o.push(i);try{u=e.apply(this,o)}catch(c){const d=c;if(a&&n)throw d;return i(d)}a||(u&&u.then&&typeof u.then=="function"?u.then(l,i):u instanceof Error?i(u):l(u))}function i(o,...a){n||(n=!0,t(o,...a))}function l(o){i(null,o)}}const Bt={basename:gv,dirname:yv,extname:xv,join:vv,sep:"/"};function gv(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Fi(e);let n=0,r=-1,i=e.length,l;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(l){n=i+1;break}}else r<0&&(l=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let o=-1,a=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(l){n=i+1;break}}else o<0&&(l=!0,o=i+1),a>-1&&(e.codePointAt(i)===t.codePointAt(a--)?a<0&&(r=i):(a=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function yv(e){if(Fi(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function xv(e){Fi(e);let t=e.length,n=-1,r=0,i=-1,l=0,o;for(;t--;){const a=e.codePointAt(t);if(a===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),a===46?i<0?i=t:l!==1&&(l=1):i>-1&&(l=-1)}return i<0||n<0||l===0||l===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function vv(...e){let t=-1,n;for(;++t<e.length;)Fi(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":bv(n)}function bv(e){Fi(e);const t=e.codePointAt(0)===47;let n=wv(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function wv(e,t){let n="",r=0,i=-1,l=0,o=-1,a,u;for(;++o<=e.length;){if(o<e.length)a=e.codePointAt(o);else{if(a===47)break;a=47}if(a===47){if(!(i===o-1||l===1))if(i!==o-1&&l===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(u=n.lastIndexOf("/"),u!==n.length-1){u<0?(n="",r=0):(n=n.slice(0,u),r=n.length-1-n.lastIndexOf("/")),i=o,l=0;continue}}else if(n.length>0){n="",r=0,i=o,l=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,l=0}else a===46&&l>-1?l++:l=-1}return n}function Fi(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const kv={cwd:Sv};function Sv(){return"/"}function ia(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function jv(e){if(typeof e=="string")e=new URL(e);else if(!ia(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return Cv(e)}function Cv(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const qo=["history","path","basename","stem","extname","dirname"];class wm{constructor(t){let n;t?ia(t)?n={path:t}:typeof t=="string"||Nv(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":kv.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<qo.length;){const l=qo[r];l in n&&n[l]!==void 0&&n[l]!==null&&(this[l]=l==="history"?[...n[l]]:n[l])}let i;for(i in n)qo.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?Bt.basename(this.path):void 0}set basename(t){Yo(t,"basename"),Qo(t,"basename"),this.path=Bt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Bt.dirname(this.path):void 0}set dirname(t){dd(this.basename,"dirname"),this.path=Bt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Bt.extname(this.path):void 0}set extname(t){if(Qo(t,"extname"),dd(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Bt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){ia(t)&&(t=jv(t)),Yo(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Bt.basename(this.path,this.extname):void 0}set stem(t){Yo(t,"stem"),Qo(t,"stem"),this.path=Bt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new $e(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function Qo(e,t){if(e&&e.includes(Bt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Bt.sep+"`")}function Yo(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function dd(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function Nv(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const Ev=function(e){const r=this.constructor.prototype,i=r[e],l=function(){return i.apply(l,arguments)};return Object.setPrototypeOf(l,r),l},zv={}.hasOwnProperty;class mu extends Ev{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=mv()}copy(){const t=new mu;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(Wo(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(Xo("data",this.frozen),this.namespace[t]=n,this):zv.call(this.namespace,t)&&this.namespace[t]||void 0:t?(Xo("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=ll(t),r=this.parser||this.Parser;return Go("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),Go("process",this.parser||this.Parser),Ko("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(l,o){const a=ll(t),u=r.parse(a);r.run(u,a,function(d,f,m){if(d||!f||!m)return c(d);const p=f,k=r.stringify(p,m);Iv(k)?m.value=k:m.result=k,c(d,m)});function c(d,f){d||!f?o(d):l?l(f):n(void 0,f)}}}processSync(t){let n=!1,r;return this.freeze(),Go("processSync",this.parser||this.Parser),Ko("processSync",this.compiler||this.Compiler),this.process(t,i),pd("processSync","process",n),r;function i(l,o){n=!0,id(l),r=o}}run(t,n,r){fd(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?l(void 0,r):new Promise(l);function l(o,a){const u=ll(n);i.run(t,u,c);function c(d,f,m){const p=f||t;d?a(d):o?o(p):r(void 0,p,m)}}}runSync(t,n){let r=!1,i;return this.run(t,n,l),pd("runSync","run",r),i;function l(o,a){id(o),i=a,r=!0}}stringify(t,n){this.freeze();const r=ll(n),i=this.compiler||this.Compiler;return Ko("stringify",i),fd(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(Xo("use",this.frozen),t!=null)if(typeof t=="function")u(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):o(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function l(c){if(typeof c=="function")u(c,[]);else if(typeof c=="object")if(Array.isArray(c)){const[d,...f]=c;u(d,f)}else o(c);else throw new TypeError("Expected usable value, not `"+c+"`")}function o(c){if(!("plugins"in c)&&!("settings"in c))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(c.plugins),c.settings&&(i.settings=Wo(!0,i.settings,c.settings))}function a(c){let d=-1;if(c!=null)if(Array.isArray(c))for(;++d<c.length;){const f=c[d];l(f)}else throw new TypeError("Expected a list of plugins, not `"+c+"`")}function u(c,d){let f=-1,m=-1;for(;++f<r.length;)if(r[f][0]===c){m=f;break}if(m===-1)r.push([c,...d]);else if(d.length>0){let[p,...k]=d;const w=r[m][1];ra(w)&&ra(p)&&(p=Wo(!0,w,p)),r[m]=[c,p,...k]}}}}const _v=new mu().freeze();function Go(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Ko(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Xo(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function fd(e){if(!ra(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function pd(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function ll(e){return Pv(e)?e:new wm(e)}function Pv(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function Iv(e){return typeof e=="string"||Tv(e)}function Tv(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const Av="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",md=[],hd={allowDangerousHtml:!0},Lv=/^(https?|ircs?|mailto|xmpp)$/i,Mv=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function Wt(e){const t=Rv(e),n=Ov(e);return Dv(t.runSync(t.parse(n),n),e)}function Rv(e){const t=e.rehypePlugins||md,n=e.remarkPlugins||md,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...hd}:hd;return _v().use(y1).use(n).use(fv,r).use(t)}function Ov(e){const t=e.children||"",n=new wm;return typeof t=="string"&&(n.value=t),n}function Dv(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,l=t.disallowedElements,o=t.skipHtml,a=t.unwrapDisallowed,u=t.urlTransform||Fv;for(const d of Mv)Object.hasOwn(t,d.from)&&(""+d.from+(d.to?"use `"+d.to+"` instead":"remove it")+Av+d.id,void 0);return t.className&&(e={type:"element",tagName:"div",properties:{className:t.className},children:e.type==="root"?e.children:[e]}),vm(e,c),K0(e,{Fragment:s.Fragment,components:i,ignoreInvalidStyle:!0,jsx:s.jsx,jsxs:s.jsxs,passKeys:!0,passNode:!0});function c(d,f,m){if(d.type==="raw"&&m&&typeof f=="number")return o?m.children.splice(f,1):m.children[f]={type:"text",value:d.value},f;if(d.type==="element"){let p;for(p in Ho)if(Object.hasOwn(Ho,p)&&Object.hasOwn(d.properties,p)){const k=d.properties[p],w=Ho[p];(w===null||w.includes(d.tagName))&&(d.properties[p]=u(String(k||""),p,d))}}if(d.type==="element"){let p=n?!n.includes(d.tagName):l?l.includes(d.tagName):!1;if(!p&&r&&typeof f=="number"&&(p=!r(d,f,m)),p&&m&&typeof f=="number")return a&&d.children?m.children.splice(f,1,...d.children):m.children.splice(f,1),f}}}function Fv(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||Lv.test(e.slice(0,t))?e:""}const Bv="modulepreload",Uv=function(e){return"/"+e},gd={},Hv=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(n.map(u=>{if(u=Uv(u),u in gd)return;gd[u]=!0;const c=u.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Bv,c||(f.as="script"),f.crossOrigin="",f.href=u,a&&f.setAttribute("nonce",a),document.head.appendChild(f),c)return new Promise((m,p)=>{f.addEventListener("load",m),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${u}`)))})}))}function l(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&l(a.reason);return t().catch(l)})},en=[{case_number:1,topic:"Seasonal Flu Vaccination",query:"Should I get a flu vaccine this year?",cdc_message:`**Get Your Flu Vaccine This Year**

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

*Source: NIMH Information on Antidepressants*`}],Vv=["I think that I would like to use this system frequently","I found the system unnecessarily complex","I thought the system was easy to use","I think that I would need the support of a technical person to be able to use this system","I found the various functions in this system were well integrated","I thought there was too much inconsistency in this system","I would imagine that most people would learn to use this system very quickly","I found the system very cumbersome to use","I felt very confident using the system","I needed to learn a lot of things before I could get going with this system"],yd=[{id:"factual_accuracy",label:"Factual Accuracy",description:"Information is correct and evidence-based"},{id:"completeness",label:"Completeness",description:"Covers key aspects of the topic"},{id:"up_to_date",label:"Current Information",description:"Reflects latest guidelines and evidence"},{id:"clarity",label:"Clarity",description:"Easy to understand, free of jargon"},{id:"potential_harm",label:"Potential for Harm",description:"1=High risk, 5=No risk of harm from this info"}],xd=[{id:"clarity",label:"Clarity",description:"Easy to understand, free of jargon"},{id:"accuracy",label:"Scientific Accuracy",description:"Information is factually correct"},{id:"actionability",label:"Actionability",description:"Clearly tells people what to do"},{id:"cultural_sensitivity",label:"Cultural Sensitivity",description:"Appropriate for diverse audiences"},{id:"persuasiveness",label:"Persuasiveness",description:"Likely to influence behavior"},{id:"addresses_concerns",label:"Addresses Concerns",description:"Acknowledges common hesitancies"}],vd=[{id:"intention",label:"After reading this message, how likely are you to get a flu vaccine?",scale:7},{id:"credibility",label:"How credible do you find this message?",scale:5},{id:"clarity",label:"How clear is this message?",scale:5},{id:"relevance",label:"How relevant is this message to you?",scale:5},{id:"trust",label:"How much do you trust this information?",scale:5}];let Jo=null,bd=!1;async function $v(){if(bd)return Jo;bd=!0;try{const e=await Hv(()=>import("./pregenerated_responses-D_EFlQf1.js"),[]);return Jo=e.default||e,console.log("Loaded pre-generated responses for study"),Jo}catch{return console.log("Pre-generated responses not found, will use live API"),null}}const Wv=()=>Math.random().toString(36).substring(2,15)+Date.now().toString(36),km=(e,t)=>{try{const n=JSON.parse(localStorage.getItem("chorusStudyData")||"{}");return n[e]=n[e]||[],n[e].push({...t,timestamp:new Date().toISOString()}),localStorage.setItem("chorusStudyData",JSON.stringify(n)),!0}catch(n){return console.error("Failed to save to localStorage:",n),!1}},wd=async(e,t)=>{try{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`API error: ${n.status}`);return await n.json()}catch(n){return console.warn("API unavailable, saving to localStorage:",n.message),km(e,t),{saved_locally:!0}}};function qv({onClick:e}){return s.jsxs("button",{className:"study-fab",onClick:e,"aria-label":"Join Study",children:[s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"}),s.jsx("path",{d:"M9 12h6M9 16h6"})]}),s.jsx("span",{className:"study-fab-text",children:"Join Study"})]})}const kd=["consent","demographics","accuracy","quality","usability","effectiveness","complete"];function Qv({isOpen:e,onClose:t,onQuerySubmit:n,setViewMode:r}){const[i,l]=B.useState("consent"),[o,a]=B.useState(null),[u,c]=B.useState(!1),[d,f]=B.useState({role:"",experience:"",orgType:"",expertiseArea:""}),[m,p]=B.useState([]),[k,w]=B.useState(0),[E,h]=B.useState({}),[g,x]=B.useState(null),[j,C]=B.useState(!1),[S,z]=B.useState(0),[I,U]=B.useState({}),[M,R]=B.useState({}),[O,Y]=B.useState(null),[ie,K]=B.useState("intro"),[se,le]=B.useState(0),[T,V]=B.useState(null),[y,G]=B.useState([]),[J,b]=B.useState(Array(10).fill(0)),[fe,ke]=B.useState(null),[ae,Te]=B.useState("baseline"),[Je,Re]=B.useState({}),at=()=>{l("consent"),a(null),c(!1),f({role:"",experience:"",orgType:"",expertiseArea:""}),p([]),w(0),h({}),x(null),z(0),U({}),R({}),Y(null),K("intro"),le(0),V(null),G([]),b(Array(10).fill(0)),ke(null),Te("baseline"),Re({})},Rt=()=>{if(i!=="consent"&&i!=="complete"){if(!window.confirm("Exit study? Your progress will be saved locally."))return;km("partial_study",{sessionId:o,phase:i,demographics:d,accuracyResponses:E,qualityResponses:I,taskResults:y,susResponses:J,effectivenessResponses:Je})}at(),t()},Mr=async te=>{const de=await $v();if(!(de!=null&&de.cases))return null;const We=de.cases.find(sn=>sn.query===te);if(!We)return null;const Et=Object.values(We.responses||{});return{question:We.query,responses:Et,synthesis:We.synthesis}},Ot=async te=>{C(!0);try{const de=await Mr(te);if(de){console.log("Using pre-generated response for:",te.substring(0,30)+"..."),x(de),C(!1);return}const We=await fetch("/api/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:te,include_synthesis:!0,mode:"public_health"})});if(!We.ok)throw new Error("Failed to fetch");const Et=await We.json();x(Et)}catch(de){console.error("Error fetching Chorus response:",de),x({error:"Failed to load AI responses"})}finally{C(!1)}},Rr=async()=>{const te=Wv();a(te);const Et=[0,1,2,3,4,5,6].sort(()=>Math.random()-.5).slice(0,3).sort((sn,er)=>sn-er);p(Et),Y(Math.random()<.5?"brief":"detailed"),ke(Math.random()<.5?"chorus":"cdc"),await wd("/api/study/session",{session_id:te,participant_type:d.role,role:d.role,experience_years:d.experience?parseInt(d.experience):null,organization_type:d.orgType,expertise_area:d.expertiseArea,assigned_cases:Et}),Ot(en[Et[0]].query),l("accuracy")},Zn=()=>{let te=0;return J.forEach((de,We)=>{We%2===0?te+=de-1:te+=5-de}),te*2.5},Nt=async()=>{await wd("/api/study/complete",{session_id:o,demographics:d,accuracy_responses:E,quality_responses:I,message_orders:M,assigned_interface:O,task_results:y,sus_responses:J,sus_score:Zn(),assigned_message:fe,effectiveness_responses:Je}),l("complete")},Pn=()=>{const te=kd.indexOf(i);return Math.round(te/(kd.length-1)*100)};return e?s.jsxs("div",{className:"study-modal-overlay",onClick:te=>te.target===te.currentTarget&&Rt(),children:[s.jsxs("div",{className:"study-modal",children:[s.jsx("button",{className:"study-modal-close",onClick:Rt,children:"×"}),i!=="consent"&&i!=="complete"&&s.jsxs("div",{className:"study-progress",children:[s.jsx("div",{className:"study-progress-bar",style:{width:`${Pn()}%`}}),s.jsxs("span",{className:"study-progress-text",children:[Pn(),"% Complete"]})]}),i==="consent"&&s.jsxs("div",{className:"study-phase",children:[s.jsx("h2",{children:"Chorus Research Study"}),s.jsx("p",{className:"study-intro",children:"Thank you for your interest in evaluating Chorus, an AI-powered tool for public health communication."}),s.jsxs("div",{className:"consent-content",children:[s.jsx("h3",{children:"Informed Consent"}),s.jsxs("section",{children:[s.jsx("h4",{children:"Purpose"}),s.jsx("p",{children:"This study evaluates Chorus, a tool that helps public health professionals understand and respond to health misinformation by analyzing what AI systems tell the public."})]}),s.jsxs("section",{children:[s.jsx("h4",{children:"What You'll Do"}),s.jsx("p",{children:"Complete 4 short evaluation phases:"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Content Accuracy"})," - Rate AI responses to health questions"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Message Quality"})," - Compare public health messages"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Usability"})," - Complete tasks and rate the tool"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Message Effectiveness"})," - React to a health message"]})]}),s.jsx("p",{children:"Estimated time: 20-30 minutes total."})]}),s.jsxs("section",{children:[s.jsx("h4",{children:"Data Collection"}),s.jsx("p",{children:"We collect your responses and basic demographic information (role, experience). No personally identifiable information (name, email) is collected. All data is anonymized and will be weighted by expertise level in analysis."})]}),s.jsxs("section",{children:[s.jsx("h4",{children:"Voluntary Participation"}),s.jsx("p",{children:"Participation is voluntary. You may exit at any time without penalty."})]}),s.jsxs("label",{className:"consent-checkbox",children:[s.jsx("input",{type:"checkbox",checked:u,onChange:te=>c(te.target.checked)}),s.jsx("span",{children:"I have read and understand the above information. I voluntarily agree to participate."})]})]}),s.jsx("button",{className:"study-btn primary",disabled:!u,onClick:()=>l("demographics"),children:"Continue"})]}),i==="demographics"&&s.jsxs("div",{className:"study-phase",children:[s.jsx("h2",{children:"About You"}),s.jsx("p",{className:"study-intro",children:"Your background helps us understand different perspectives on AI health information."}),s.jsxs("div",{className:"demographics-form",children:[s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"What best describes your role? *"}),s.jsxs("select",{value:d.role,onChange:te=>f(de=>({...de,role:te.target.value})),children:[s.jsx("option",{value:"",children:"Select your role..."}),s.jsx("option",{value:"public_health_official",children:"Public Health Official"}),s.jsx("option",{value:"healthcare_provider",children:"Healthcare Provider (MD, RN, etc.)"}),s.jsx("option",{value:"researcher",children:"Researcher / Academic"}),s.jsx("option",{value:"communications",children:"Health Communications Professional"}),s.jsx("option",{value:"policy",children:"Health Policy Professional"}),s.jsx("option",{value:"general_public",children:"General Public / Patient"}),s.jsx("option",{value:"other",children:"Other"})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"Years of experience in health-related work"}),s.jsxs("select",{value:d.experience,onChange:te=>f(de=>({...de,experience:te.target.value})),children:[s.jsx("option",{value:"",children:"Select..."}),s.jsx("option",{value:"0",children:"None / Not applicable"}),s.jsx("option",{value:"1",children:"Less than 2 years"}),s.jsx("option",{value:"3",children:"2-5 years"}),s.jsx("option",{value:"7",children:"6-10 years"}),s.jsx("option",{value:"15",children:"11-20 years"}),s.jsx("option",{value:"25",children:"More than 20 years"})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"Organization type"}),s.jsxs("select",{value:d.orgType,onChange:te=>f(de=>({...de,orgType:te.target.value})),children:[s.jsx("option",{value:"",children:"Select..."}),s.jsx("option",{value:"government",children:"Government / Public Health Agency"}),s.jsx("option",{value:"healthcare",children:"Healthcare Organization"}),s.jsx("option",{value:"academia",children:"Academic Institution"}),s.jsx("option",{value:"nonprofit",children:"Non-profit Organization"}),s.jsx("option",{value:"private",children:"Private Sector"}),s.jsx("option",{value:"none",children:"Not applicable"})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"Area of expertise (if applicable)"}),s.jsx("input",{type:"text",value:d.expertiseArea,onChange:te=>f(de=>({...de,expertiseArea:te.target.value})),placeholder:"e.g., Infectious Disease, Health Communication, Epidemiology"})]})]}),s.jsxs("div",{className:"study-btn-row",children:[s.jsx("button",{className:"study-btn secondary",onClick:()=>l("consent"),children:"Back"}),s.jsx("button",{className:"study-btn primary",disabled:!d.role,onClick:Rr,children:"Begin Study"})]})]}),i==="accuracy"&&s.jsx(Yv,{assignedCases:m,currentCase:k,setCurrentCase:w,responses:E,setResponses:h,chorusResponses:g,loadingChorus:j,fetchChorusResponse:Ot,onComplete:()=>{z(0),Ot(en[m[0]].query),R(te=>({...te,0:Math.random()<.5?["chorus","cdc"]:["cdc","chorus"]})),l("quality")}}),i==="quality"&&s.jsx(Gv,{assignedCases:m,currentCase:S,setCurrentCase:z,responses:I,setResponses:U,messageOrders:M,setMessageOrders:R,chorusResponses:g,loadingChorus:j,fetchChorusResponse:Ot,onComplete:()=>l("usability")}),i==="usability"&&s.jsx(Kv,{subPhase:ie,setSubPhase:K,assignedInterface:O,currentTask:se,setCurrentTask:le,taskStartTime:T,setTaskStartTime:V,taskResults:y,setTaskResults:G,susResponses:J,setSusResponses:b,onQuerySubmit:n,setViewMode:r,onComplete:()=>l("effectiveness")}),i==="effectiveness"&&s.jsx(Xv,{subPhase:ae,setSubPhase:Te,assignedMessage:fe,responses:Je,setResponses:Re,onComplete:Nt}),i==="complete"&&s.jsxs("div",{className:"study-phase study-complete",children:[s.jsx("div",{className:"complete-icon",children:"✓"}),s.jsx("h2",{children:"Thank You!"}),s.jsx("p",{children:"Your responses have been recorded."}),s.jsxs("p",{className:"session-id",children:["Session ID: ",s.jsx("code",{children:o})]}),s.jsx("p",{className:"complete-note",children:"Your participation helps improve AI-assisted public health communication tools. Responses will be analyzed based on expertise level to ensure appropriate weighting."}),s.jsx("button",{className:"study-btn primary",onClick:()=>{at(),t()},children:"Close"})]})]}),s.jsx("style",{children:Jv})]}):null}function Yv({assignedCases:e,currentCase:t,setCurrentCase:n,responses:r,setResponses:i,chorusResponses:l,loadingChorus:o,fetchChorusResponse:a,onComplete:u}){const c=e[t],d=en[c],f=r[t]||{},m=(w,E,h)=>{i(g=>{var x;return{...g,[t]:{...g[t],caseIndex:c,[w]:{...((x=g[t])==null?void 0:x[w])||{},[E]:h}}}})},p=()=>l!=null&&l.responses?l.responses.filter(E=>E.success).map(E=>E.provider_name).every(E=>yd.every(h=>{var g;return(g=f[E])==null?void 0:g[h.id]})):!1,k=()=>{if(t<e.length-1){const w=t+1;n(w),a(en[e[w]].query)}else u()};return s.jsxs("div",{className:"study-phase content-accuracy",children:[s.jsxs("div",{className:"study-header",children:[s.jsxs("div",{children:[s.jsx("h2",{children:"Phase 1: Content Accuracy"}),s.jsx("p",{className:"phase-desc",children:"Rate the accuracy of AI responses to health questions"})]}),s.jsxs("span",{className:"case-counter",children:["Case ",t+1," of ",e.length]})]}),s.jsxs("div",{className:"case-info",children:[s.jsx("h3",{children:d.topic}),s.jsxs("p",{className:"case-query",children:['Query: "',d.query,'"']})]}),o?s.jsxs("div",{className:"loading-state",children:[s.jsx("div",{className:"spinner"}),s.jsx("p",{children:"Loading AI responses..."})]}):l!=null&&l.error?s.jsxs("div",{className:"error-state",children:[s.jsx("p",{children:l.error}),s.jsx("button",{onClick:()=>a(d.query),children:"Retry"})]}):(l==null?void 0:l.responses)&&s.jsx("div",{className:"responses-to-rate",children:l.responses.filter(w=>w.success).map((w,E)=>s.jsxs("div",{className:"response-rating-card",children:[s.jsxs("div",{className:"response-header",children:[s.jsx("h4",{children:w.provider_name}),s.jsx("span",{className:"model-name",children:w.model})]}),s.jsx("div",{className:"response-content",children:s.jsx(Wt,{children:w.content})}),s.jsx("div",{className:"rating-grid",children:yd.map(h=>s.jsxs("div",{className:"rating-row",children:[s.jsxs("label",{children:[s.jsx("span",{className:"rating-label",children:h.label}),s.jsx("span",{className:"rating-desc",children:h.description})]}),s.jsx("div",{className:"rating-buttons",children:[1,2,3,4,5].map(g=>{var x;return s.jsx("button",{className:`rating-btn ${((x=f[w.provider_name])==null?void 0:x[h.id])===g?"selected":""}`,onClick:()=>m(w.provider_name,h.id,g),children:g},g)})})]},h.id))})]},E))}),s.jsxs("div",{className:"study-btn-row",children:[s.jsx("button",{className:"study-btn secondary",disabled:t===0,onClick:()=>{const w=t-1;n(w),a(en[e[w]].query)},children:"Previous"}),s.jsx("button",{className:"study-btn primary",disabled:!p(),onClick:k,children:t===e.length-1?"Continue to Phase 2":"Next Case"})]})]})}function Gv({assignedCases:e,currentCase:t,setCurrentCase:n,responses:r,setResponses:i,messageOrders:l,setMessageOrders:o,chorusResponses:a,loadingChorus:u,fetchChorusResponse:c,onComplete:d}){const f=e[t],m=en[f],p=r[t]||{},k=l[t]||["chorus","cdc"],w=()=>{var z;if(!((z=a==null?void 0:a.synthesis)!=null&&z.content))return null;const C=a.synthesis.content,S=C.match(/## Recommended Public Health Message\n([\s\S]*?)(?=\n##|$)/);return S?S[1].trim():C.substring(0,500)},E=C=>k[C==="A"?0:1]==="chorus"?{content:w()||"Loading...",type:"chorus"}:{content:m.cdc_message,type:"cdc"},h=(C,S,z)=>{i(I=>{var U;return{...I,[t]:{...I[t],[C]:{...((U=I[t])==null?void 0:U[C])||{},[S]:z}}}})},g=C=>{i(S=>({...S,[t]:{...S[t],preference:C}}))},x=()=>["A","B"].every(C=>xd.every(S=>{var z;return(z=p[C])==null?void 0:z[S.id]}))&&p.preference!==void 0,j=()=>{if(t<e.length-1){const C=t+1;n(C),o(S=>({...S,[C]:Math.random()<.5?["chorus","cdc"]:["cdc","chorus"]})),c(en[e[C]].query)}else d()};return s.jsxs("div",{className:"study-phase message-quality",children:[s.jsxs("div",{className:"study-header",children:[s.jsxs("div",{children:[s.jsx("h2",{children:"Phase 2: Message Quality"}),s.jsx("p",{className:"phase-desc",children:"Compare two public health messages (blinded)"})]}),s.jsxs("span",{className:"case-counter",children:["Case ",t+1," of ",e.length]})]}),s.jsxs("div",{className:"case-info",children:[s.jsx("h3",{children:m.topic}),s.jsx("p",{className:"comparison-note",children:"Compare the two messages below. You are blinded to their source."})]}),u?s.jsxs("div",{className:"loading-state",children:[s.jsx("div",{className:"spinner"}),s.jsx("p",{children:"Loading messages..."})]}):s.jsx("div",{className:"message-comparison",children:["A","B"].map(C=>s.jsxs("div",{className:"message-card",children:[s.jsxs("h4",{children:["Message ",C]}),s.jsx("div",{className:"message-content",children:s.jsx(Wt,{children:E(C).content})}),s.jsx("div",{className:"rating-grid compact",children:xd.map(S=>s.jsxs("div",{className:"rating-row",children:[s.jsx("label",{children:S.label}),s.jsx("div",{className:"rating-buttons",children:[1,2,3,4,5].map(z=>{var I;return s.jsx("button",{className:`rating-btn ${((I=p[C])==null?void 0:I[S.id])===z?"selected":""}`,onClick:()=>h(C,S.id,z),children:z},z)})})]},S.id))})]},C))}),s.jsxs("div",{className:"preference-section",children:[s.jsx("h4",{children:"Overall Preference"}),s.jsx("div",{className:"preference-scale",children:[{val:-2,label:"Strongly prefer A"},{val:-1,label:"Slightly prefer A"},{val:0,label:"No preference"},{val:1,label:"Slightly prefer B"},{val:2,label:"Strongly prefer B"}].map(C=>s.jsx("button",{className:`pref-btn ${p.preference===C.val?"selected":""}`,onClick:()=>g(C.val),children:C.label},C.val))})]}),s.jsxs("div",{className:"study-btn-row",children:[s.jsx("button",{className:"study-btn secondary",disabled:t===0,onClick:()=>{const C=t-1;n(C),c(en[e[C]].query)},children:"Previous"}),s.jsx("button",{className:"study-btn primary",disabled:!x(),onClick:j,children:t===e.length-1?"Continue to Phase 3":"Next Case"})]})]})}function Kv({subPhase:e,setSubPhase:t,assignedInterface:n,currentTask:r,setCurrentTask:i,taskStartTime:l,setTaskStartTime:o,taskResults:a,setTaskResults:u,susResponses:c,setSusResponses:d,onQuerySubmit:f,setViewMode:m,onComplete:p}){const k=[{query:"Should I get a flu vaccine this year?",instruction:"Use Chorus to investigate what AI systems tell users about flu vaccination."},{query:"Are COVID boosters still recommended?",instruction:"Generate information about current COVID-19 booster recommendations."},{query:"What are the side effects of the MMR vaccine?",instruction:"Look up AI responses about MMR vaccine side effects."}];B.useEffect(()=>{e==="tasks"&&n&&(m==null||m(n))},[e,n]);const w=()=>{o(Date.now()),m==null||m(n),f==null||f(k[r].query)},E=x=>{const j=Date.now()-l;u([...a,{task:r,query:k[r].query,timeSpent:j,rating:x,interface:n}]),r<k.length-1?(i(C=>C+1),o(null)):t("sus")},h=(x,j)=>{const C=[...c];C[x]=j,d(C)},g=()=>c.every(x=>x>0);return e==="intro"?s.jsxs("div",{className:"study-phase usability-intro",children:[s.jsx("h2",{children:"Phase 3: Usability Assessment"}),s.jsx("p",{children:"You will complete 3 tasks using the Chorus tool, then answer usability questions."}),s.jsxs("div",{className:"interface-assignment",children:[s.jsx("h4",{children:"Your Interface"}),s.jsxs("p",{children:["You have been randomly assigned to the ",s.jsx("strong",{children:n==="brief"?"Brief":"Detailed"})," view.",n==="brief"?" This shows a concise summary of AI responses.":" This shows full responses from each AI provider."]})]}),s.jsxs("div",{className:"task-list",children:[s.jsx("h4",{children:"Tasks:"}),s.jsx("ol",{children:k.map((x,j)=>s.jsx("li",{children:x.instruction},j))})]}),s.jsx("button",{className:"study-btn primary",onClick:()=>t("tasks"),children:"Begin Tasks"})]}):e==="tasks"?s.jsxs("div",{className:"study-phase usability-tasks",children:[s.jsxs("h2",{children:["Phase 3: Task ",r+1," of ",k.length]}),s.jsxs("div",{className:"task-card",children:[s.jsx("p",{className:"task-instruction",children:k[r].instruction}),l?s.jsxs("div",{className:"task-complete-section",children:[s.jsx("p",{children:"When you've reviewed the results, rate how useful they were:"}),s.jsx("div",{className:"usefulness-rating",children:[1,2,3,4,5].map(x=>s.jsxs("button",{className:"rating-btn large",onClick:()=>E(x),children:[x,s.jsx("span",{className:"rating-label-small",children:x===1?"Not useful":x===5?"Very useful":""})]},x))})]}):s.jsx("button",{className:"study-btn primary",onClick:w,children:"Start Task"})]})]}):e==="sus"?s.jsxs("div",{className:"study-phase usability-sus",children:[s.jsx("h2",{children:"Phase 3: System Usability Scale"}),s.jsx("p",{children:"Rate your agreement with each statement (1 = Strongly Disagree, 5 = Strongly Agree):"}),s.jsx("div",{className:"sus-questions",children:Vv.map((x,j)=>s.jsxs("div",{className:"sus-question",children:[s.jsxs("p",{children:[j+1,". ",x]}),s.jsx("div",{className:"rating-buttons",children:[1,2,3,4,5].map(C=>s.jsx("button",{className:`rating-btn ${c[j]===C?"selected":""}`,onClick:()=>h(j,C),children:C},C))})]},j))}),s.jsx("button",{className:"study-btn primary",disabled:!g(),onClick:p,children:"Continue to Phase 4"})]}):null}function Xv({subPhase:e,setSubPhase:t,assignedMessage:n,responses:r,setResponses:i,onComplete:l}){const o=en[0],a=()=>n==="cdc"?o.cdc_message:`**Get Protected: Your Annual Flu Shot Matters**

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

*This message was synthesized from multiple AI health information sources and reviewed for accuracy.*`,u=(c,d)=>{i(f=>({...f,[c]:d}))};if(e==="baseline")return s.jsxs("div",{className:"study-phase effectiveness-baseline",children:[s.jsx("h2",{children:"Phase 4: Message Effectiveness"}),s.jsx("p",{children:"Please answer this question before seeing the message:"}),s.jsxs("div",{className:"baseline-question",children:[s.jsx("p",{className:"question-text",children:"How likely are you to get a flu vaccine this season?"}),s.jsx("div",{className:"likelihood-scale",children:[1,2,3,4,5,6,7].map(c=>s.jsx("button",{className:`scale-btn ${r.baseline===c?"selected":""}`,onClick:()=>u("baseline",c),children:c},c))}),s.jsxs("div",{className:"scale-labels",children:[s.jsx("span",{children:"Very unlikely"}),s.jsx("span",{children:"Very likely"})]})]}),s.jsx("button",{className:"study-btn primary",disabled:!r.baseline,onClick:()=>t("message"),children:"Continue"})]});if(e==="message")return s.jsxs("div",{className:"study-phase effectiveness-message",children:[s.jsx("h2",{children:"Phase 4: Please Read This Message"}),s.jsx("div",{className:"study-message-content",children:s.jsx(Wt,{children:a()})}),s.jsx("button",{className:"study-btn primary",onClick:()=>t("post"),children:"I've Read the Message"})]});if(e==="post"){const c=vd.every(d=>r[d.id]);return s.jsxs("div",{className:"study-phase effectiveness-post",children:[s.jsx("h2",{children:"Phase 4: Your Reactions"}),vd.map(d=>s.jsxs("div",{className:"effectiveness-question",children:[s.jsx("p",{children:d.label}),s.jsx("div",{className:"rating-buttons",children:Array.from({length:d.scale},(f,m)=>m+1).map(f=>s.jsx("button",{className:`rating-btn ${r[d.id]===f?"selected":""}`,onClick:()=>u(d.id,f),children:f},f))})]},d.id)),s.jsx("button",{className:"study-btn primary",disabled:!c,onClick:l,children:"Complete Study"})]})}return null}const Jv=`
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
`;function Sm(e){return e>=85?{label:"Excellent",color:"#10b981"}:e>=70?{label:"Acceptable",color:"#3b82f6"}:e>=50?{label:"Marginal",color:"#f59e0b"}:{label:"Not Acceptable",color:"#ef4444"}}function Zv(){var c,d;const[e,t]=B.useState(null),[n,r]=B.useState(!0),[i,l]=B.useState(null),[o,a]=B.useState(new Date),u=async()=>{try{r(!0);const f=await fetch("/api/study/results");if(!f.ok)throw new Error("Failed to fetch results");const m=await f.json();t(m),l(null),a(new Date)}catch(f){l(f.message)}finally{r(!1)}};return B.useEffect(()=>{u();const f=setInterval(u,3e4);return()=>clearInterval(f)},[]),n&&!e?s.jsx("div",{className:"results-dashboard",children:s.jsxs("div",{className:"results-loading",children:[s.jsx("div",{className:"results-spinner"}),s.jsx("p",{children:"Loading study results..."})]})}):i&&!e?s.jsx("div",{className:"results-dashboard",children:s.jsxs("div",{className:"results-error",children:[s.jsx("h2",{children:"Error Loading Results"}),s.jsx("p",{children:i}),s.jsx("button",{className:"results-btn-primary",onClick:u,children:"Retry"})]})}):!e||e.total_participants===0?s.jsxs("div",{className:"results-dashboard",children:[s.jsxs("header",{className:"results-header",children:[s.jsx("h1",{className:"results-title",children:"Study Results Dashboard"}),s.jsxs("button",{className:"results-refresh-btn",onClick:u,children:[s.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"})}),"Refresh"]})]}),s.jsxs("div",{className:"results-empty",children:[s.jsx("div",{className:"results-empty-icon",children:"📊"}),s.jsx("h2",{children:"No Study Data Yet"}),s.jsx("p",{children:"Results will appear here as participants complete the study."}),s.jsxs("p",{className:"results-empty-hint",children:["Last checked: ",o.toLocaleTimeString()]})]})]}):s.jsxs("div",{className:"results-dashboard",children:[s.jsxs("header",{className:"results-header",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"results-title",children:"Study Results Dashboard"}),s.jsx("p",{className:"results-subtitle",children:"Real-time anonymized study data"})]}),s.jsxs("button",{className:"results-refresh-btn",onClick:u,children:[s.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"})}),"Refresh"]})]}),s.jsxs("p",{className:"results-last-update",children:["Last updated: ",o.toLocaleTimeString()]}),s.jsxs("section",{className:"results-section",children:[s.jsx("h2",{className:"results-section-title",children:"Summary Statistics"}),s.jsxs("div",{className:"results-stats-grid",children:[s.jsx(Jr,{title:"Total Participants",value:e.total_participants,icon:"👥",color:"#3b82f6"}),s.jsx(Jr,{title:"Detailed View Users",value:((c=e.by_tool_version)==null?void 0:c.detailed)||0,icon:"📊",color:"#8b5cf6"}),s.jsx(Jr,{title:"Brief View Users",value:((d=e.by_tool_version)==null?void 0:d.brief)||0,icon:"📋",color:"#6366f1"}),s.jsx(Jr,{title:"Avg Completion Time",value:i2(e.avg_completion_time),icon:"⏱️",color:"#10b981"}),s.jsx(Jr,{title:"Completion Rate",value:`${Math.round(e.completion_rate*100)}%`,icon:"✓",color:"#14b8a6"})]})]}),s.jsxs("section",{className:"results-section",children:[s.jsx("h2",{className:"results-section-title",children:"System Usability Scale (SUS)"}),s.jsx(e2,{susData:e.sus_scores})]}),e.message_preferences&&s.jsxs("section",{className:"results-section",children:[s.jsx("h2",{className:"results-section-title",children:"Message Preference Distribution"}),s.jsx(t2,{data:e.message_preferences})]}),e.trust_metrics&&s.jsxs("section",{className:"results-section",children:[s.jsx("h2",{className:"results-section-title",children:"Trust Metrics"}),s.jsx(n2,{metrics:e.trust_metrics})]}),s.jsxs("section",{className:"results-section",children:[s.jsx("h2",{className:"results-section-title",children:"Participant Demographics"}),s.jsx(r2,{demographics:e.demographics})]})]})}function Jr({title:e,value:t,icon:n,color:r}){return s.jsxs("div",{className:"results-stat-card",style:{borderColor:r},children:[s.jsx("div",{className:"results-stat-icon",style:{color:r},children:n}),s.jsxs("div",{className:"results-stat-content",children:[s.jsx("div",{className:"results-stat-value",style:{color:r},children:t}),s.jsx("div",{className:"results-stat-title",children:e})]})]})}function e2({susData:e}){var r,i,l,o;if(!e)return s.jsx("p",{className:"results-no-data",children:"No SUS data available yet"});const t=e.overall_avg_score,n=Sm(t);return s.jsxs("div",{className:"results-sus-container",children:[s.jsxs("div",{className:"results-sus-overall",children:[s.jsxs("div",{className:"results-sus-score-box",children:[s.jsx("div",{className:"results-sus-score",style:{color:n.color},children:t.toFixed(1)}),s.jsx("div",{className:"results-sus-score-label",children:"Overall SUS Score"}),s.jsx("div",{className:"results-sus-interpretation",style:{background:`${n.color}20`,color:n.color},children:n.label})]}),s.jsxs("div",{className:"results-sus-scale",children:[s.jsx("div",{className:"results-sus-scale-bar",children:s.jsx("div",{className:"results-sus-scale-fill",style:{width:`${t}%`,background:n.color}})}),s.jsxs("div",{className:"results-sus-scale-labels",children:[s.jsx("span",{children:"0"}),s.jsx("span",{style:{color:"#ef4444"},children:"50"}),s.jsx("span",{style:{color:"#f59e0b"},children:"70"}),s.jsx("span",{style:{color:"#3b82f6"},children:"85"}),s.jsx("span",{children:"100"})]}),s.jsxs("div",{className:"results-sus-scale-ranges",children:[s.jsx("span",{style:{color:"#ef4444"},children:"Not Acceptable"}),s.jsx("span",{style:{color:"#f59e0b"},children:"Marginal"}),s.jsx("span",{style:{color:"#3b82f6"},children:"Acceptable"}),s.jsx("span",{style:{color:"#10b981"},children:"Excellent"})]})]})]}),e.by_version&&s.jsxs("div",{className:"results-sus-comparison",children:[s.jsx("h3",{className:"results-subsection-title",children:"SUS Score by Tool Version"}),s.jsxs("div",{className:"results-sus-bars",children:[s.jsx(Sd,{label:"Detailed View",score:((r=e.by_version.detailed)==null?void 0:r.avg_score)||0,count:((i=e.by_version.detailed)==null?void 0:i.count)||0,color:"#8b5cf6"}),s.jsx(Sd,{label:"Brief View",score:((l=e.by_version.brief)==null?void 0:l.avg_score)||0,count:((o=e.by_version.brief)==null?void 0:o.count)||0,color:"#6366f1"})]})]})]})}function Sd({label:e,score:t,count:n,color:r}){const i=Sm(t);return s.jsxs("div",{className:"results-sus-bar-container",children:[s.jsxs("div",{className:"results-sus-bar-header",children:[s.jsx("span",{className:"results-sus-bar-label",children:e}),s.jsxs("span",{className:"results-sus-bar-score",style:{color:r},children:[t.toFixed(1)," ",s.jsxs("span",{className:"results-sus-bar-count",children:["(",n," users)"]})]})]}),s.jsx("div",{className:"results-sus-bar-bg",children:s.jsx("div",{className:"results-sus-bar-fill",style:{width:`${t}%`,background:r},children:s.jsx("span",{className:"results-sus-bar-interpretation",children:i.label})})})]})}function t2({data:e}){if(!e||Object.keys(e).length===0)return s.jsx("p",{className:"results-no-data",children:"No message preference data available yet"});const t={"-2":"Strongly prefer A","-1":"Slightly prefer A",0:"No preference",1:"Slightly prefer B",2:"Strongly prefer B"},n=Math.max(...Object.values(e));return s.jsx("div",{className:"results-preference-chart",children:Object.entries(t).map(([r,i])=>{const l=e[r]||0,o=n>0?l/n*100:0;return s.jsxs("div",{className:"results-preference-bar",children:[s.jsx("div",{className:"results-preference-label",children:i}),s.jsx("div",{className:"results-preference-bar-bg",children:s.jsx("div",{className:"results-preference-bar-fill",style:{width:`${o}%`},children:s.jsx("span",{className:"results-preference-count",children:l})})})]},r)})})}function n2({metrics:e}){if(!e)return s.jsx("p",{className:"results-no-data",children:"No trust data available yet"});const t=[{key:"trust_accuracy",label:"Accuracy",icon:"🎯"},{key:"trust_reliability",label:"Reliability",icon:"⚡"},{key:"trust_transparency",label:"Transparency",icon:"🔍"},{key:"trust_usefulness",label:"Usefulness",icon:"💡"}];return s.jsxs("div",{className:"results-trust-container",children:[s.jsx("div",{className:"results-trust-grid",children:t.map(n=>{var o,a;const r=((o=e[n.key])==null?void 0:o.avg_score)||0,i=((a=e[n.key])==null?void 0:a.count)||0,l=r/7*100;return s.jsxs("div",{className:"results-trust-card",children:[s.jsxs("div",{className:"results-trust-header",children:[s.jsx("span",{className:"results-trust-icon",children:n.icon}),s.jsx("span",{className:"results-trust-label",children:n.label})]}),s.jsxs("div",{className:"results-trust-score",children:[r.toFixed(1)," ",s.jsx("span",{className:"results-trust-score-max",children:"/ 7"})]}),s.jsx("div",{className:"results-trust-bar-bg",children:s.jsx("div",{className:"results-trust-bar-fill",style:{width:`${l}%`}})}),s.jsxs("div",{className:"results-trust-count",children:[i," responses"]})]},n.key)})}),e.would_use&&s.jsxs("div",{className:"results-adoption",children:[s.jsx("h3",{className:"results-subsection-title",children:"Likelihood to Use in Work"}),s.jsxs("div",{className:"results-adoption-score",children:[s.jsxs("div",{className:"results-adoption-value",style:{color:Cd(e.would_use.avg_score)},children:[e.would_use.avg_score.toFixed(1),s.jsx("span",{className:"results-adoption-max",children:" / 7"})]}),s.jsxs("div",{className:"results-adoption-label",children:["Average likelihood (",e.would_use.count," responses)"]})]}),s.jsx("div",{className:"results-adoption-bar-bg",children:s.jsx("div",{className:"results-adoption-bar-fill",style:{width:`${e.would_use.avg_score/7*100}%`,background:Cd(e.would_use.avg_score)}})}),s.jsxs("div",{className:"results-adoption-scale",children:[s.jsx("span",{children:"Very Unlikely"}),s.jsx("span",{children:"Neutral"}),s.jsx("span",{children:"Very Likely"})]})]})]})}function r2({demographics:e}){return e?s.jsxs("div",{className:"results-demographics-grid",children:[e.by_role&&s.jsx(Zo,{title:"Participant Roles",data:e.by_role,icon:"👤"}),e.by_experience&&s.jsx(Zo,{title:"Experience Levels",data:e.by_experience,icon:"📈"}),e.by_org_type&&s.jsx(Zo,{title:"Organization Types",data:e.by_org_type,icon:"🏢"})]}):s.jsx("p",{className:"results-no-data",children:"No demographic data available yet"})}function Zo({title:e,data:t,icon:n}){if(!t||Object.keys(t).length===0)return s.jsxs("div",{className:"results-demographic-card",children:[s.jsxs("h3",{className:"results-demographic-title",children:[s.jsx("span",{className:"results-demographic-icon",children:n}),e]}),s.jsx("p",{className:"results-no-data-small",children:"No data yet"})]});const r=Object.values(t).reduce((l,o)=>l+o,0),i=Object.entries(t).sort((l,o)=>o[1]-l[1]);return s.jsxs("div",{className:"results-demographic-card",children:[s.jsxs("h3",{className:"results-demographic-title",children:[s.jsx("span",{className:"results-demographic-icon",children:n}),e]}),s.jsx("div",{className:"results-demographic-list",children:i.map(([l,o])=>{const a=o/r*100;return s.jsxs("div",{className:"results-demographic-item",children:[s.jsxs("div",{className:"results-demographic-item-header",children:[s.jsx("span",{className:"results-demographic-item-label",children:l2(l)}),s.jsxs("span",{className:"results-demographic-item-value",children:[o," ",s.jsxs("span",{className:"results-demographic-item-percent",children:["(",a.toFixed(0),"%)"]})]})]}),s.jsx("div",{className:"results-demographic-bar-bg",children:s.jsx("div",{className:"results-demographic-bar-fill",style:{width:`${a}%`}})})]},l)})}),s.jsxs("div",{className:"results-demographic-total",children:["Total: ",r," participants"]})]})}function jd(){return s.jsx("a",{href:"/results",className:"view-results-link",children:"View Study Results →"})}function i2(e){if(!e)return"N/A";const t=Math.floor(e/60),n=Math.floor(e%60);return t>0?`${t}m ${n}s`:`${n}s`}function l2(e){return{public_health_official:"Public Health Official",healthcare_provider:"Healthcare Provider",researcher:"Researcher",general_public:"General Public",other:"Other","0-2":"0-2 years","3-5":"3-5 years","6-10":"6-10 years","11-20":"11-20 years","20+":"20+ years",government:"Government",healthcare:"Healthcare",academia:"Academia",private:"Private Sector",nonprofit:"Non-profit"}[e]||e}function Cd(e){return e>=6?"#10b981":e>=5?"#3b82f6":e>=4?"#f59e0b":"#ef4444"}const jm=document.createElement("style");jm.textContent=`
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
`;document.head.appendChild(jm);const Fn={OpenAI:"#10a37f",Anthropic:"#d4a574","Google Gemini":"#4285f4",Grok:"#1da1f2",Ollama:"#94a3b8"};function o2({size:e=48}){return s.jsxs("svg",{width:e,height:e,viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsxs("defs",{children:[s.jsxs("linearGradient",{id:"prism-gradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[s.jsx("stop",{offset:"0%",stopColor:"#a855f7"}),s.jsx("stop",{offset:"100%",stopColor:"#6366f1"})]}),s.jsxs("linearGradient",{id:"rainbow",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[s.jsx("stop",{offset:"0%",stopColor:"#ef4444"}),s.jsx("stop",{offset:"25%",stopColor:"#f59e0b"}),s.jsx("stop",{offset:"50%",stopColor:"#10b981"}),s.jsx("stop",{offset:"75%",stopColor:"#3b82f6"}),s.jsx("stop",{offset:"100%",stopColor:"#8b5cf6"})]})]}),s.jsx("path",{d:"M24 6L42 38H6L24 6Z",fill:"url(#prism-gradient)",opacity:"0.9"}),s.jsx("line",{x1:"2",y1:"20",x2:"18",y2:"20",stroke:"white",strokeWidth:"2",opacity:"0.6"}),s.jsx("line",{x1:"30",y1:"22",x2:"46",y2:"14",stroke:"#ef4444",strokeWidth:"1.5",opacity:"0.8"}),s.jsx("line",{x1:"30",y1:"24",x2:"46",y2:"20",stroke:"#f59e0b",strokeWidth:"1.5",opacity:"0.8"}),s.jsx("line",{x1:"30",y1:"26",x2:"46",y2:"26",stroke:"#10b981",strokeWidth:"1.5",opacity:"0.8"}),s.jsx("line",{x1:"30",y1:"28",x2:"46",y2:"32",stroke:"#3b82f6",strokeWidth:"1.5",opacity:"0.8"}),s.jsx("line",{x1:"30",y1:"30",x2:"46",y2:"38",stroke:"#8b5cf6",strokeWidth:"1.5",opacity:"0.8"})]})}function es({size:e=48,animated:t=!0}){return s.jsxs("svg",{width:e,height:e,viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:t?"chorus-logo-animated":"",children:[s.jsxs("defs",{children:[s.jsxs("linearGradient",{id:"chorus-gradient-1",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[s.jsx("stop",{offset:"0%",stopColor:"#06b6d4"}),s.jsx("stop",{offset:"100%",stopColor:"#0891b2"})]}),s.jsxs("linearGradient",{id:"chorus-gradient-2",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[s.jsx("stop",{offset:"0%",stopColor:"#14b8a6"}),s.jsx("stop",{offset:"100%",stopColor:"#0d9488"})]}),s.jsxs("filter",{id:"glow",children:[s.jsx("feGaussianBlur",{stdDeviation:"1.5",result:"coloredBlur"}),s.jsxs("feMerge",{children:[s.jsx("feMergeNode",{in:"coloredBlur"}),s.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),s.jsx("circle",{cx:"24",cy:"24",r:"22",fill:"url(#chorus-gradient-1)",opacity:"0.15"}),s.jsx("path",{className:"wave-1",d:"M8 24 Q14 18, 20 24 T32 24 T44 24",stroke:"url(#chorus-gradient-1)",strokeWidth:"2.5",fill:"none",opacity:"0.9",filter:"url(#glow)"}),s.jsx("path",{className:"wave-2",d:"M8 20 Q14 14, 20 20 T32 20 T44 20",stroke:"#14b8a6",strokeWidth:"2",fill:"none",opacity:"0.7"}),s.jsx("path",{className:"wave-3",d:"M8 28 Q14 22, 20 28 T32 28 T44 28",stroke:"#0891b2",strokeWidth:"2",fill:"none",opacity:"0.7"}),s.jsx("rect",{x:"21",y:"16",width:"6",height:"16",rx:"1",fill:"white",opacity:"0.95"}),s.jsx("rect",{x:"16",y:"21",width:"16",height:"6",rx:"1",fill:"white",opacity:"0.95"}),s.jsx("circle",{cx:"24",cy:"24",r:"8",fill:"url(#chorus-gradient-2)",opacity:"0.3"})]})}function s2(){var gu;const[e,t]=B.useState(""),[n,r]=B.useState(!1),[i,l]=B.useState([]),[o,a]=B.useState(null),[u,c]=B.useState(null),[d,f]=B.useState([]),[m,p]=B.useState(null),[k,w]=B.useState(!1),[E,h]=B.useState(!1),[g,x]=B.useState("patient"),[j,C]=B.useState(!1),[S,z]=B.useState(""),[I,U]=B.useState([]),[M,R]=B.useState(null),[O,Y]=B.useState(!1),[ie,K]=B.useState(!1),[se,le]=B.useState([]),[T,V]=B.useState(""),[y,G]=B.useState(!1),J=B.useRef(null),b=B.useRef(null),fe=B.useRef(null),[ke,ae]=B.useState({app_mode:"prism",app_name:"Prism",show_study:!0,default_mode:"public_health",tagline:"AI-Powered Public Health Communication"}),[Te,Je]=B.useState("public_health"),[Re,at]=B.useState(()=>localStorage.getItem("chorusViewMode")||"detailed");B.useEffect(()=>{fetch("/api/config").then(v=>v.json()).then(v=>{ae(v),Je(v.default_mode),v.app_mode==="chorus"&&x("clinician")}).catch(()=>{})},[]),B.useEffect(()=>{fetch("/api/providers").then(v=>v.json()).then(v=>f(v.configured)).catch(()=>f([]))},[]),B.useEffect(()=>{localStorage.setItem("chorusViewMode",Re)},[Re]),B.useEffect(()=>{o&&J.current&&J.current.scrollIntoView({behavior:"smooth",block:"start"})},[o]),B.useEffect(()=>{se.length>0&&fe.current&&setTimeout(()=>{fe.current.scrollIntoView({behavior:"smooth",block:"start"})},100)},[se.length]);const Rt=async(v,A=!1)=>{var $;if(($=v==null?void 0:v.preventDefault)==null||$.call(v),!(!e.trim()||n||O)){if(R(null),le([]),G(!1),p(null),ke.app_mode==="chorus"&&!A){Mr(e);return}Nt(e)}},Mr=async v=>{Y(!0),le([]),V(""),G(!1);try{const A=await fetch("/api/clarify-step",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({original_question:v,conversation:[]})});if(A.ok){const $=await A.json();$.is_ready?(Y(!1),t($.refined_question),Nt($.refined_question)):(R({originalQuestion:v,refinedQuestion:$.refined_question,quickOptions:$.quick_options}),le([{role:"ai",text:$.clarifying_question}]),Y(!1))}else Y(!1),Nt(v)}catch(A){console.error("Clarification failed:",A),Y(!1),Nt(v)}},Ot=async v=>{if(!v.trim())return;const A=[...se,{role:"user",text:v}];le(A),V(""),Y(!0);try{const $=await fetch("/api/clarify-step",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({original_question:M.originalQuestion,conversation:A})});if($.ok){const D=await $.json();R(H=>({...H,refinedQuestion:D.refined_question,quickOptions:D.quick_options})),D.is_ready?(G(!0),Y(!1)):(le([...A,{role:"ai",text:D.clarifying_question}]),Y(!1))}else Y(!1),G(!0)}catch($){console.error("Clarification step failed:",$),Y(!1),G(!0)}},Rr=()=>{const v=(M==null?void 0:M.refinedQuestion)||e;t(v),R(null),le([]),G(!1),Nt(v)},Zn=()=>{const v=(M==null?void 0:M.originalQuestion)||e;R(null),le([]),G(!1),Nt(v)},Nt=async v=>{r(!0),l([]),a(null),c(null),p(null),C(!1),U([]),z("");try{const A=fetch("/api/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:v,include_synthesis:!0,mode:Te})}),$=Te==="health_research"?fetch("/api/evidence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:v})}):null,[D,H]=await Promise.all([A,$]);if(!D.ok){const je=await D.json();throw new Error(je.detail||"Failed to query LLMs")}const Q=await D.json();if(l(Q.responses),a(Q.synthesis),U([{question:v,synthesis:Q.synthesis}]),H&&H.ok){const je=await H.json();c(je)}}catch(A){p(A.message)}finally{r(!1)}},Pn=async v=>{if(v.preventDefault(),!S.trim()||n)return;r(!0),p(null);const $=`Context from previous conversation:
${I.map(D=>{var H;return`Previous question: ${D.question}
Previous answer: ${((H=D.synthesis)==null?void 0:H.content)||""}`}).join(`

`)}

Follow-up question: ${S}`;try{const D=await fetch("/api/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:$,include_synthesis:!0,mode:Te})});if(!D.ok){const Q=await D.json();throw new Error(Q.detail||"Failed to query LLMs")}const H=await D.json();l(H.responses),a(H.synthesis),U(Q=>[...Q,{question:S,synthesis:H.synthesis}]),z(""),setTimeout(()=>{var Q;return(Q=b.current)==null?void 0:Q.focus()},100)}catch(D){p(D.message)}finally{r(!1)}},te=v=>{if(!v)return[];const A=[],$=v.split(`
`);let D=null,H=[];for(const Q of $)Q.startsWith("## ")?(D&&A.push({title:D,content:H.join(`
`).trim()}),D=Q.replace("## ","").trim(),H=[]):D&&H.push(Q);return D&&A.push({title:D,content:H.join(`
`).trim()}),A},de=v=>v.includes("Hearing")?{icon:"👂",color:"#3b82f6",priority:1}:v.includes("Concerns")||v.includes("Hesitanc")?{icon:"⚠️",color:"#f59e0b",priority:2}:v.includes("Misinformation")?{icon:"🚨",color:"#ef4444",priority:3}:v.includes("Effective")||v.includes("Messaging Angles")?{icon:"✅",color:"#10b981",priority:4}:v.includes("Recommendations for Public Health Officials")?{icon:"📋",color:"#8b5cf6",priority:5}:v.includes("Recommended Public Health Message")?{icon:"💬",color:"#ec4899",priority:6,highlight:!0}:v.includes("Evidence Summary")?{icon:"📚",color:"#0ea5e9",priority:1}:v.includes("Points of Agreement")?{icon:"✅",color:"#10b981",priority:2}:v.includes("Points of Disagreement")?{icon:"⚡",color:"#f59e0b",priority:3}:v.includes("Confidence Level")?{icon:"📊",color:"#14b8a6",priority:4}:v.includes("Recommendations for Further Research")?{icon:"🔬",color:"#06b6d4",priority:5}:{icon:"📝",color:"#6b7280",priority:99},We=["What is the current evidence on GLP-1 agonists for weight management in non-diabetic patients?","Should I recommend aspirin for primary cardiovascular prevention in a 55-year-old male?","What are the latest guidelines on antibiotic prophylaxis for dental procedures in patients with prosthetic heart valves?","Is there evidence supporting intermittent fasting for metabolic syndrome?"],Et=["Should I get a flu vaccine this year?","Are COVID boosters still recommended?","Is it safe to eat eggs during a bird flu outbreak?","What are the side effects of the MMR vaccine?"],sn=ke.app_mode==="chorus"?We:Et,er=o?te(o.content):[],In=er.find(v=>de(v.title).highlight),Or=er.filter(v=>!de(v.title).highlight),N=()=>{var H,Q;if(!o&&!u&&i.length===0)return null;const v=L(u==null?void 0:u.guidelines),A=Z(u==null?void 0:u.literature),$=ue(i),D=ut(v,A,$);return{guidelines:v,literature:A,aiConsensus:$,confidence:D,hasEvidence:((H=u==null?void 0:u.guidelines)==null?void 0:H.count)>0||((Q=u==null?void 0:u.literature)==null?void 0:Q.count)>0,hasAI:i.filter(je=>je.success).length>0}},L=v=>{if(!v||v.count===0)return{available:!1,summary:null,sources:[]};const A=v.source_types||{},$=v.links||[],D=Object.entries(A).filter(([Q,je])=>je>0).map(([Q])=>Q),H=$.slice(0,5).map(Q=>({text:Q.snippet,source:W(Q.url),url:Q.url,title:Q.title})).filter(Q=>Q.text);return{available:!0,organizations:D,keyPoints:H,totalSources:v.count,sources:$}},W=v=>v.includes("cdc.gov")?"CDC":v.includes("who.int")?"WHO":v.includes("fda.gov")?"FDA":v.includes("nih.gov")?"NIH":v.includes("heart.org")?"AHA":v.includes("cancer.org")?"ACS":"Medical Authority",Z=v=>{if(!v||v.count===0)return{available:!1,summary:null,topCited:[]};const A=v.top_cited||[],$=v.links||[],D=$.slice(0,5).map(H=>({text:H.snippet,citations:H.cited_by||0,publication:H.publication_info,url:H.url,title:H.title})).filter(H=>H.text);return{available:!0,totalPapers:v.count,topCited:A.slice(0,3),researchFindings:D,sources:$}},ue=v=>{const A=v.filter(D=>D.success);if(A.length===0)return{available:!1,consensus:null,providers:[]};const $=A.map(D=>({name:D.provider_name,model:D.model,content:D.content}));return{available:!0,modelCount:A.length,providers:$,synthesisContent:(o==null?void 0:o.content)||null}},ut=(v,A,$)=>{let D=0,H=[];return v.available&&v.totalSources>=3?(D+=30,H.push("Multiple official guidelines")):v.available&&(D+=15,H.push("Official guidelines available")),A.available&&A.totalPapers>=5?(D+=25,H.push("Strong research base")):A.available&&(D+=12,H.push("Research available")),$.available&&$.modelCount>=3?(D+=20,H.push("Multiple AI models agree")):$.available&&(D+=10,H.push("AI analysis available")),v.available&&A.available&&$.available&&(D+=25,H.push("Cross-validated sources")),{score:Math.min(D,100),level:D>=70?"high":D>=40?"moderate":"limited",factors:H}},Qt=()=>{var Dr,Fr,Br,Ur;const v=N();if(!v)return null;let A=[];const D=(v.aiConsensus.synthesisContent||"").split(`

`).filter(Ze=>Ze.trim()),H=((Dr=v.guidelines)==null?void 0:Dr.totalSources)||0,Q=((Fr=v.literature)==null?void 0:Fr.totalPapers)||0,je=((Br=v.aiConsensus)==null?void 0:Br.modelCount)||0,Ln=v.guidelines.available?[...new Set(((Ur=v.guidelines.sources)==null?void 0:Ur.map(Ze=>W(Ze.url)))||[])]:[];if(v.aiConsensus.available&&D.length>0){let Ze="";if(H>0||Q>0){Ze="*This summary is based on ";const ne=[];H>0&&ne.push(`official health guidelines from ${Ln.slice(0,2).join(" and ")}`),Q>0&&ne.push(`${Q} scientific studies`),ne.push(`${je} medical AI systems`),Ze+=ne.join(", ")+`.*

`}A.push({type:"synthesis",icon:"💡",title:"What You Should Know",content:Ze+D.join(`

`),modelCount:je,isPrimary:!0})}let xt="";(H>=2||Q>=2)&&(xt+=`**The evidence agrees on:**
`,xt+=`- Multiple sources have been reviewed and synthesized above
`,H>=2&&(xt+=`- Official guidance is available from ${Ln.slice(0,3).join(", ")}
`),Q>=3&&(xt+=`- Scientific research supports these recommendations
`)),xt+=`
**Important notes:**
`,xt+=`- This is for educational purposes - always consult your healthcare provider
`,xt+=`- Individual circumstances may vary
`,A.push({type:"takeaways",icon:"✅",title:"Key Points",content:xt});const De=[];if(v.guidelines.available&&v.guidelines.sources){const Ze=v.guidelines.sources.slice(0,8).map(ne=>`- [${ne.title}](${ne.url}) *(${W(ne.url)})*`).join(`
`);De.push(`**Official Guidelines:**
${Ze}`)}if(v.literature.available&&v.literature.sources){const Ze=v.literature.sources.slice(0,8).map(ne=>{const Yt=ne.cited_by>0?` *(${ne.cited_by} citations)*`:"";return`- [${ne.title}](${ne.url})${Yt}`}).join(`
`);De.push(`**Research:**
${Ze}`)}return De.length>0&&A.push({type:"sources",icon:"📚",title:"Sources",content:De.join(`

`),isSecondary:!0}),{headline:e,sections:A,confidence:v.confidence}},zt=()=>{var Dr,Fr,Br,Ur,Ze;const v=N();if(!v)return null;let A=[];const $=v.aiConsensus.synthesisContent||"";let D=1;const H=[];v.guidelines.available&&v.guidelines.sources&&v.guidelines.sources.slice(0,10).forEach(ne=>{H.push({num:D++,title:ne.title,source:W(ne.url),url:ne.url,type:"guideline"})}),v.literature.available&&v.literature.sources&&v.literature.sources.slice(0,10).forEach(ne=>{H.push({num:D++,title:ne.title,source:ne.publication_info||"Peer-reviewed",url:ne.url,citations:ne.cited_by||0,type:"literature"})});const Q=((Dr=v.guidelines)==null?void 0:Dr.totalSources)||0,je=((Fr=v.literature)==null?void 0:Fr.totalPapers)||0,Ln=((Br=v.aiConsensus)==null?void 0:Br.modelCount)||0,xt=v.guidelines.available?[...new Set(((Ur=v.guidelines.sources)==null?void 0:Ur.map(ne=>W(ne.url)))||[])]:[];if(v.aiConsensus.available&&$){let ne=`### Integrated Evidence Summary

`;if(Q>0||je>0){if(ne+=`This synthesis integrates:
`,Q>0&&(ne+=`- **${Q} official guidelines** from ${xt.slice(0,4).join(", ")}
`),je>0){const Yt=((Ze=v.literature.sources)==null?void 0:Ze.reduce((Mn,Fe)=>Mn+(Fe.cited_by||0),0))||0;ne+=`- **${je} peer-reviewed studies**${Yt>0?` (${Yt} total citations)`:""}
`}ne+=`- **${Ln} AI models** (${v.aiConsensus.providers.map(Yt=>Yt.name).join(", ")})

`}A.push({type:"synthesis",title:"Evidence Synthesis",subtitle:"Unified summary from authorities, research, and AI",content:ne+$,modelCount:Ln,isPrimary:!0})}let De="";if(De+=`### Areas of Agreement

`,Q>=2&&je>=2&&(De+=`- **Cross-validated findings**: Both official guidelines (${Q}) and peer-reviewed research (${je}) address this topic, suggesting established evidence
`),Ln>=3&&(De+=`- **AI consensus**: ${Ln} independent AI models analyzed this question and contributed to the synthesis
`),xt.length>=2&&(De+=`- **Multi-authority support**: Guidance from multiple organizations (${xt.slice(0,3).join(", ")})
`),Q===0&&je===0&&(De+=`- Limited external evidence available; synthesis primarily reflects AI analysis
`),De+=`
### Potential Limitations

`,Q<3&&(De+=`- Limited official guideline coverage (${Q} sources)
`),je<5&&(De+=`- Research base may benefit from additional literature review
`),De+=`- Guidelines may vary by region; verify against local protocols
`,De+=`- Evidence should be evaluated in individual clinical context
`,A.push({type:"consensus",title:"Agreement & Limitations",content:De}),H.length>0){const ne=H.filter(Fe=>Fe.type==="guideline"),Yt=H.filter(Fe=>Fe.type==="literature");let Mn="";ne.length>0&&(Mn+=`**Official Guidelines:**
`,Mn+=ne.map(Fe=>`${Fe.num}. [${Fe.title}](${Fe.url}) — *${Fe.source}*`).join(`
`)+`

`),Yt.length>0&&(Mn+=`**Peer-Reviewed Literature:**
`,Mn+=Yt.map(Fe=>{const Nm=Fe.citations>0?` *(${Fe.citations} citations)*`:"";return`${Fe.num}. [${Fe.title}](${Fe.url})${Nm}`}).join(`
`)),A.push({type:"references",title:"References",subtitle:`${H.length} sources`,content:Mn,isSecondary:!0})}return{headline:e,sections:A,confidence:v.confidence,allRefs:H}},Tn=()=>{var A,$;const v=[];return(A=u==null?void 0:u.guidelines)!=null&&A.links&&u.guidelines.links.forEach((D,H)=>{v.push({...D,type:"guideline",id:`guideline-${H}`})}),($=u==null?void 0:u.literature)!=null&&$.links&&u.literature.links.forEach((D,H)=>{v.push({...D,type:"literature",id:`literature-${H}`})}),v},An=()=>{var A;const v=[];return(A=u==null?void 0:u.guidelines)!=null&&A.links&&u.guidelines.links.forEach($=>{var D,H,Q,je;((D=$.snippet)!=null&&D.includes("image")||(H=$.snippet)!=null&&H.includes("video")||(Q=$.snippet)!=null&&Q.includes("infographic")||(je=$.snippet)!=null&&je.includes("chart"))&&v.push({type:"reference",title:$.title,url:$.url,source:"Official Guidelines"})}),v},qe=ke.app_mode==="chorus",Oe=Qt(),Qe=zt(),mo=Tn(),hu=An();return qe?s.jsxs("div",{className:"chorus-app",children:[s.jsxs("div",{className:"chorus-bg",children:[s.jsx("div",{className:"chorus-orb chorus-orb-1"}),s.jsx("div",{className:"chorus-orb chorus-orb-2"}),s.jsx("div",{className:"chorus-orb chorus-orb-3"})]}),s.jsxs("header",{className:"chorus-header",children:[s.jsxs("div",{className:"chorus-brand",children:[s.jsx(es,{size:64}),s.jsxs("div",{className:"chorus-brand-text",children:[s.jsx("h1",{className:"chorus-title",children:"Chorus"}),s.jsx("p",{className:"chorus-tagline",children:"Where AI Meets Evidence-Based Medicine"})]})]}),s.jsxs("div",{className:"chorus-trust-badges",children:[s.jsxs("span",{className:"trust-badge",children:[s.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),"Evidence-Based"]}),s.jsxs("span",{className:"trust-badge",children:[s.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("circle",{cx:"12",cy:"12",r:"10"}),s.jsx("polyline",{points:"12 6 12 12 16 14"})]}),"Real-Time"]}),s.jsxs("span",{className:"trust-badge",children:[s.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),s.jsx("circle",{cx:"9",cy:"7",r:"4"}),s.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),s.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),"Multi-Source"]})]})]}),s.jsxs("main",{className:"chorus-main",children:[s.jsxs("section",{className:"chorus-search-section glass-card",children:[s.jsxs("form",{onSubmit:Rt,className:"chorus-form",children:[s.jsx("label",{className:"chorus-label",children:"Ask a clinical question"}),s.jsxs("div",{className:"chorus-input-wrapper",children:[s.jsx("textarea",{value:e,onChange:v=>t(v.target.value),placeholder:"Enter your clinical research question...",className:"chorus-textarea",rows:2}),s.jsx("button",{type:"submit",disabled:n||!e.trim(),className:"chorus-submit-btn",children:n?s.jsxs("span",{className:"chorus-btn-loading",children:[s.jsx("span",{className:"chorus-spinner"}),"Analyzing..."]}):s.jsxs(s.Fragment,{children:[s.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("circle",{cx:"11",cy:"11",r:"8"}),s.jsx("path",{d:"m21 21-4.35-4.35"})]}),"Search Evidence"]})})]}),s.jsxs("div",{className:"chorus-providers",children:[s.jsx("span",{className:"chorus-providers-label",children:"Synthesizing from:"}),d.map(v=>s.jsx("span",{className:"chorus-provider-chip",style:{borderColor:Fn[v.charAt(0).toUpperCase()+v.slice(1)]||"#64748b"},children:v},v)),s.jsx("span",{className:"chorus-provider-chip chorus-provider-evidence",children:"+ Evidence Sources"})]})]}),s.jsxs("div",{className:"chorus-examples",children:[s.jsx("span",{className:"chorus-examples-label",children:"Try a question:"}),s.jsx("div",{className:"chorus-examples-list",children:sn.map((v,A)=>s.jsx("button",{onClick:()=>t(v),className:"chorus-example-btn",children:v},A))})]})]}),m&&s.jsxs("div",{className:"chorus-error glass-card animate-fade-in",children:[s.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("circle",{cx:"12",cy:"12",r:"10"}),s.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),s.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),m]}),O&&s.jsxs("div",{className:"chorus-clarifying glass-card animate-fade-in",children:[s.jsxs("div",{className:"chorus-loading-animation",children:[s.jsx("div",{className:"chorus-loading-wave"}),s.jsx("div",{className:"chorus-loading-wave"}),s.jsx("div",{className:"chorus-loading-wave"})]}),s.jsx("h3",{children:"Analyzing Your Question"}),s.jsx("p",{children:"Checking if we can help refine your query for better results..."})]}),M&&se.length>0&&s.jsxs("div",{ref:fe,className:"chorus-clarification glass-card animate-fade-in",children:[s.jsxs("div",{className:"clarification-header",children:[s.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),s.jsxs("div",{children:[s.jsx("h3",{children:"Let's Refine Your Question"}),s.jsx("p",{className:"clarification-explanation",children:"A few quick questions to help get you better results"})]})]}),s.jsxs("div",{className:"clarify-conversation",children:[se.map((v,A)=>s.jsx("div",{className:`clarify-message ${v.role}`,children:v.role==="ai"?s.jsxs("div",{className:"clarify-ai-message",children:[s.jsx("span",{className:"clarify-avatar",children:s.jsx(es,{size:20,animated:!1})}),s.jsx("span",{className:"clarify-text",children:v.text})]}):s.jsx("div",{className:"clarify-user-message",children:s.jsx("span",{className:"clarify-text",children:v.text})})},A)),O&&s.jsx("div",{className:"clarify-message ai",children:s.jsxs("div",{className:"clarify-ai-message",children:[s.jsx("span",{className:"clarify-avatar",children:s.jsx(es,{size:20,animated:!0})}),s.jsxs("span",{className:"clarify-typing",children:[s.jsx("span",{}),s.jsx("span",{}),s.jsx("span",{})]})]})})]}),!O&&!y&&((gu=M.quickOptions)==null?void 0:gu.length)>0&&s.jsx("div",{className:"clarify-quick-options",children:M.quickOptions.map((v,A)=>s.jsx("button",{className:"clarify-quick-btn",onClick:()=>Ot(v),children:v},A))}),!O&&!y&&s.jsxs("div",{className:"clarify-input-row",children:[s.jsx("input",{type:"text",value:T,onChange:v=>V(v.target.value),onKeyDown:v=>v.key==="Enter"&&Ot(T),placeholder:"Type your answer...",className:"clarify-input"}),s.jsx("button",{className:"clarify-send-btn",onClick:()=>Ot(T),disabled:!T.trim(),children:s.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),s.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})})]}),y&&s.jsx("div",{className:"clarify-ready",children:s.jsxs("div",{className:"clarify-refined-preview",children:[s.jsx("span",{className:"clarify-refined-label",children:"Ready to search:"}),s.jsx("span",{className:"clarify-refined-text",children:M.refinedQuestion})]})}),s.jsxs("div",{className:"clarification-actions",children:[s.jsx("button",{className:"clarification-skip",onClick:Zn,children:"Skip & search original"}),(y||se.length>=2)&&s.jsx("button",{className:"clarification-search",onClick:Rr,children:y?"Search Now":"Search with refinement"})]})]}),n&&s.jsxs("div",{className:"chorus-loading glass-card animate-fade-in",children:[s.jsxs("div",{className:"chorus-loading-animation",children:[s.jsx("div",{className:"chorus-loading-wave"}),s.jsx("div",{className:"chorus-loading-wave"}),s.jsx("div",{className:"chorus-loading-wave"})]}),s.jsx("h3",{children:"Gathering Evidence"}),s.jsxs("p",{children:["Querying ",d.length," AI models and searching medical literature..."]}),s.jsxs("div",{className:"chorus-loading-steps",children:[s.jsx("span",{className:"loading-step active",children:"Searching Guidelines"}),s.jsx("span",{className:"loading-step active",children:"Querying AI Models"}),s.jsx("span",{className:"loading-step",children:"Synthesizing Results"})]})]}),o&&s.jsxs("div",{ref:J,className:"chorus-results animate-slide-up",children:[s.jsxs("section",{className:"chorus-summaries",children:[s.jsxs("div",{className:"chorus-summary-tabs",children:[s.jsxs("button",{className:`summary-tab ${g==="patient"?"active":""}`,onClick:()=>x("patient"),children:[s.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),s.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),"For Patients"]}),s.jsxs("button",{className:`summary-tab ${g==="clinician"?"active":""}`,onClick:()=>x("clinician"),children:[s.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})}),"For Clinicians"]})]}),g==="patient"&&Oe&&s.jsxs("div",{className:"chorus-summary-card glass-card patient-summary animate-fade-in",children:[s.jsxs("div",{className:"summary-header",children:[s.jsx("div",{className:"summary-icon patient-icon",children:s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),s.jsx("circle",{cx:"12",cy:"7",r:"4"})]})}),s.jsxs("div",{children:[s.jsx("h3",{children:"Simple Summary"}),s.jsx("span",{className:"summary-subtitle",children:"Easy to understand"})]}),Oe.confidence&&s.jsx("div",{className:`confidence-badge confidence-${Oe.confidence.level}`,children:Oe.confidence.level==="high"?"High Confidence":Oe.confidence.level==="moderate"?"Moderate Confidence":"Limited Data"})]}),s.jsxs("div",{className:"summary-content",children:[Oe.sections.map((v,A)=>s.jsxs("div",{className:`summary-section section-${v.type}`,children:[s.jsxs("div",{className:"section-header-inline",children:[s.jsx("span",{className:"section-icon",children:v.icon}),s.jsx("h4",{children:v.title}),v.sourceCount&&s.jsxs("span",{className:"source-count-badge",children:[v.sourceCount," sources"]}),v.modelCount&&s.jsxs("span",{className:"source-count-badge",children:[v.modelCount," AI models"]})]}),s.jsx("div",{className:"section-content",children:s.jsx(Wt,{components:{a:({node:$,...D})=>s.jsx("a",{...D,target:"_blank",rel:"noopener noreferrer",className:"evidence-link"})},children:v.content})})]},A)),Oe.confidence&&s.jsxs("div",{className:"summary-confidence",children:[s.jsx("span",{className:"confidence-label",children:"Evidence Strength:"}),s.jsx("div",{className:"confidence-bar",children:s.jsx("div",{className:"confidence-fill",style:{width:`${Oe.confidence.score}%`}})}),s.jsx("div",{className:"confidence-factors",children:Oe.confidence.factors.map((v,A)=>s.jsx("span",{className:"confidence-factor",children:v},A))})]})]})]}),g==="clinician"&&Qe&&s.jsxs("div",{className:"chorus-summary-card glass-card clinician-summary animate-fade-in",children:[s.jsxs("div",{className:"summary-header",children:[s.jsx("div",{className:"summary-icon clinician-icon",children:s.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})})}),s.jsxs("div",{children:[s.jsx("h3",{children:"Clinical Summary"}),s.jsx("span",{className:"summary-subtitle",children:"For healthcare professionals"})]}),Qe.confidence&&s.jsxs("div",{className:`confidence-badge confidence-${Qe.confidence.level}`,children:[Qe.confidence.score,"% confidence"]})]}),s.jsx("div",{className:"summary-content clinician-content",children:Qe.sections.map((v,A)=>s.jsxs("div",{className:`clinician-section section-${v.type}`,children:[s.jsxs("div",{className:"clinician-section-header",children:[s.jsxs("div",{className:"section-title-group",children:[s.jsx("h4",{children:v.title}),v.subtitle&&s.jsx("span",{className:"section-subtitle",children:v.subtitle})]}),v.models&&s.jsx("div",{className:"model-badges",children:v.models.map(($,D)=>s.jsx("span",{className:"model-badge",style:{backgroundColor:Fn[$]||"#64748b"},children:$},D))}),v.sourceCount&&s.jsxs("span",{className:"section-source-count",children:[v.sourceCount," sources"]})]}),s.jsx("div",{className:"clinician-section-content",children:s.jsx(Wt,{components:{a:({node:$,...D})=>s.jsx("a",{...D,target:"_blank",rel:"noopener noreferrer",className:"evidence-link"})},children:v.content})})]},A))})]})]}),u&&s.jsxs("section",{className:"chorus-evidence-section animate-slide-up",style:{animationDelay:"0.1s"},children:[s.jsxs("h2",{className:"section-heading",children:[s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),s.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]}),"Evidence Sources"]}),s.jsxs("div",{className:"evidence-cards-grid",children:[u.guidelines&&u.guidelines.count>0&&s.jsx(Nd,{title:"Official Guidelines",subtitle:"CDC, WHO, FDA, NIH & Medical Societies",icon:"🏛️",color:"#14b8a6",data:u.guidelines,type:"guidelines"}),u.literature&&u.literature.count>0&&s.jsx(Nd,{title:"Scientific Literature",subtitle:"Peer-reviewed research from Google Scholar",icon:"🔬",color:"#0ea5e9",data:u.literature,type:"literature"})]})]}),i.length>0&&s.jsxs("section",{className:"chorus-ai-section animate-slide-up",style:{animationDelay:"0.2s"},children:[s.jsxs("div",{className:"section-heading-row",children:[s.jsxs("h2",{className:"section-heading",children:[s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),s.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"9"}),s.jsx("line",{x1:"9",y1:"15",x2:"15",y2:"15"})]}),"AI Perspectives"]}),s.jsxs("button",{className:"toggle-ai-btn",onClick:()=>C(!j),children:[j?"Hide Details":`View All ${i.length} Responses`,s.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",style:{transform:j?"rotate(180deg)":"none"},children:s.jsx("polyline",{points:"6 9 12 15 18 9"})})]})]}),!j&&s.jsxs("div",{className:"ai-summary-bar glass-card",children:[s.jsxs("div",{className:"ai-summary-text",children:[s.jsxs("span",{className:"ai-count",children:[i.filter(v=>v.success).length," AI models"]})," analyzed this question"]}),s.jsx("div",{className:"ai-provider-dots",children:i.filter(v=>v.success).map((v,A)=>s.jsx("span",{className:"ai-dot",style:{backgroundColor:Fn[v.provider_name]||"#64748b"},title:v.provider_name},A))})]}),j&&s.jsx("div",{className:"ai-responses-grid",children:i.map((v,A)=>s.jsx(c2,{response:v},A))})]}),hu.length>0&&s.jsxs("section",{className:"chorus-media-section animate-slide-up",style:{animationDelay:"0.3s"},children:[s.jsxs("h2",{className:"section-heading",children:[s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),s.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),s.jsx("polyline",{points:"21 15 16 10 5 21"})]}),"Related Media"]}),s.jsx("div",{className:"media-grid",children:hu.map((v,A)=>s.jsxs("a",{href:v.url,target:"_blank",rel:"noopener noreferrer",className:"media-card glass-card",children:[s.jsx("div",{className:"media-placeholder",children:s.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[s.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),s.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),s.jsx("polyline",{points:"21 15 16 10 5 21"})]})}),s.jsxs("div",{className:"media-info",children:[s.jsx("span",{className:"media-title",children:v.title}),s.jsx("span",{className:"media-source",children:v.source})]})]},A))})]}),mo.length>0&&s.jsxs("section",{className:"chorus-references-section animate-slide-up",style:{animationDelay:"0.4s"},children:[s.jsxs("h2",{className:"section-heading",children:[s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}),s.jsx("path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"})]}),"References (",mo.length,")"]}),s.jsx("div",{className:"references-list glass-card",children:mo.map((v,A)=>s.jsxs("div",{className:"reference-item",children:[s.jsx("span",{className:"reference-number",children:A+1}),s.jsxs("div",{className:"reference-content",children:[s.jsx("a",{href:v.url,target:"_blank",rel:"noopener noreferrer",children:v.title}),v.snippet&&s.jsx("p",{className:"reference-snippet",children:v.snippet}),s.jsxs("div",{className:"reference-meta",children:[s.jsx("span",{className:`reference-type ${v.type}`,children:v.type==="guideline"?"Official Guideline":"Research Article"}),v.cited_by>0&&s.jsxs("span",{className:"reference-citations",children:[s.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21"}),s.jsx("path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3"})]}),v.cited_by," citations"]})]})]})]},v.id))})]})]})]}),o&&s.jsxs("div",{className:`follow-up-fab-container ${ie?"open":""}`,children:[ie&&s.jsxs("div",{className:"follow-up-panel glass-card animate-slide-up",children:[s.jsxs("div",{className:"follow-up-panel-header",children:[s.jsxs("div",{className:"follow-up-panel-title",children:[s.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),s.jsx("span",{children:"Ask a follow-up"}),I.length>1&&s.jsxs("span",{className:"conversation-count",children:[I.length," exchanges"]})]}),s.jsx("button",{className:"follow-up-panel-close",onClick:()=>K(!1),"aria-label":"Close",children:s.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),s.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),s.jsxs("form",{onSubmit:v=>{Pn(v),K(!1)},className:"follow-up-panel-form",children:[s.jsx("input",{ref:b,type:"text",value:S,onChange:v=>z(v.target.value),placeholder:"Tell me more about... What about... Can you clarify...",disabled:n,autoFocus:!0}),s.jsx("button",{type:"submit",disabled:!S.trim()||n,className:"follow-up-panel-submit",children:n?s.jsx("span",{className:"spinner-small"}):s.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),s.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})})]})]}),s.jsx("button",{className:`follow-up-fab ${ie?"active":""}`,onClick:()=>{K(!ie),ie||setTimeout(()=>{var v;return(v=b.current)==null?void 0:v.focus()},100)},"aria-label":"Ask follow-up question",children:ie?s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),s.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}):s.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}),s.jsx("line",{x1:"9",y1:"10",x2:"15",y2:"10"})]})})]}),s.jsxs("footer",{className:"chorus-footer",children:[s.jsxs("div",{className:"chorus-footer-content",children:[s.jsx("p",{children:"Chorus synthesizes evidence from multiple AI models and authoritative medical sources."}),s.jsx("p",{className:"chorus-disclaimer",children:"Always consult with a healthcare professional for medical decisions."})]}),s.jsx(jd,{})]})]}):s.jsxs("div",{className:"prism-app",children:[s.jsxs("div",{className:"prism-bg",children:[s.jsx("div",{className:"prism-orb prism-orb-1"}),s.jsx("div",{className:"prism-orb prism-orb-2"}),s.jsx("div",{className:"prism-orb prism-orb-3"})]}),s.jsxs("header",{className:"prism-header",children:[s.jsxs("div",{className:"prism-brand",children:[s.jsx(o2,{size:64}),s.jsxs("div",{className:"prism-brand-text",children:[s.jsx("h1",{className:"prism-title",children:ke.app_name}),s.jsx("p",{className:"prism-tagline",children:ke.tagline})]})]}),s.jsxs("div",{className:"prism-trust-badges",children:[s.jsxs("span",{className:"trust-badge prism-badge",children:[s.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),s.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]}),"Multi-AI Analysis"]}),s.jsxs("span",{className:"trust-badge prism-badge",children:[s.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),s.jsx("circle",{cx:"9",cy:"7",r:"4"}),s.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),s.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),"Public Health Ready"]}),s.jsxs("span",{className:"trust-badge prism-badge",children:[s.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),s.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),"Messaging Safe"]})]}),s.jsxs("div",{className:"prism-view-toggle",children:[s.jsx("button",{className:`prism-view-btn ${Re==="brief"?"active":""}`,onClick:()=>at("brief"),children:"Brief"}),s.jsx("button",{className:`prism-view-btn ${Re==="detailed"?"active":""}`,onClick:()=>at("detailed"),children:"Detailed"})]})]}),s.jsxs("main",{className:"prism-main",children:[s.jsxs("div",{className:"prism-input-card",children:[s.jsxs("form",{onSubmit:Rt,className:"prism-form",children:[s.jsxs("label",{className:"prism-label",children:[s.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("circle",{cx:"12",cy:"12",r:"10"}),s.jsx("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),s.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),"What health question are people asking AI?"]}),s.jsx("textarea",{value:e,onChange:v=>t(v.target.value),placeholder:"Enter a health question the public is asking chatbots...",className:"prism-textarea",rows:2}),s.jsxs("div",{className:"prism-form-footer",children:[s.jsx("div",{className:"prism-provider-pills",children:d.map(v=>s.jsx("span",{className:"prism-provider-pill",style:{borderColor:Fn[v.charAt(0).toUpperCase()+v.slice(1)]||"#6b7280",color:Fn[v.charAt(0).toUpperCase()+v.slice(1)]||"#6b7280"},children:v},v))}),s.jsx("button",{type:"submit",disabled:n||!e.trim(),className:"prism-submit-btn",children:n?s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"prism-btn-spinner"}),"Analyzing..."]}):s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})}),"Analyze AI Responses"]})})]})]}),s.jsxs("div",{className:"prism-examples",children:[s.jsx("span",{className:"prism-examples-label",children:"Quick examples:"}),s.jsx("div",{className:"prism-example-chips",children:sn.map((v,A)=>s.jsx("button",{onClick:()=>t(v),className:"prism-example-chip",children:v},A))})]})]}),m&&s.jsx("div",{className:"prism-error",children:m}),n&&s.jsxs("div",{className:"prism-loading",children:[s.jsx("div",{className:"prism-spinner"}),s.jsxs("p",{children:["Analyzing ",d.length," AI responses..."]}),s.jsx("span",{className:"prism-loading-sub",children:"Identifying narratives and themes"})]}),Re==="detailed"&&i.length>0&&s.jsxs("section",{className:"prism-section",children:[s.jsxs("div",{className:"prism-section-header",children:[s.jsxs("h2",{className:"prism-section-title",children:[s.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("path",{d:"M12 2a10 10 0 1 0 10 10H12V2z"}),s.jsx("path",{d:"M12 2a10 10 0 0 1 10 10"}),s.jsx("circle",{cx:"12",cy:"12",r:"6"})]}),"Raw AI Responses"]}),s.jsxs("span",{className:"prism-section-count",children:[i.filter(v=>v.success).length," models"]})]}),s.jsx("div",{className:"prism-responses-grid","data-count":i.length,children:i.map((v,A)=>s.jsx(a2,{response:v},A))})]}),In&&s.jsx("section",{className:"prism-section prism-message-section",children:s.jsxs("div",{className:"prism-message-card",children:[s.jsxs("div",{className:"prism-message-header",children:[s.jsxs("div",{className:"prism-message-title-row",children:[s.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),s.jsx("h2",{className:"prism-message-title",children:"Ready-to-Use Public Health Message"})]}),s.jsx("button",{className:"prism-copy-btn",onClick:()=>{const v=In.content.match(/^\*\*(.+?)\*\*/s)||In.content.match(/^"(.+?)"/s),A=v?v[1]:In.content.split(`

`)[0];navigator.clipboard.writeText(A.replace(/\*\*/g,"")),w(!0),setTimeout(()=>w(!1),2e3)},children:k?s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Copied!"]}):s.jsxs(s.Fragment,{children:[s.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),s.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),"Copy Message"]})})]}),s.jsx("div",{className:"prism-message-content",children:s.jsx(Wt,{children:In.content})})]})}),Re==="detailed"&&Or.length>0&&s.jsxs("section",{className:"prism-section",children:[s.jsx("div",{className:"prism-section-header",children:s.jsxs("h2",{className:"prism-section-title",children:[s.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[s.jsx("line",{x1:"18",y1:"20",x2:"18",y2:"10"}),s.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),s.jsx("line",{x1:"6",y1:"20",x2:"6",y2:"14"})]}),"Detailed Analysis"]})}),s.jsx("div",{className:"prism-analysis-grid","data-count":Or.length,children:Or.map((v,A)=>{const $=de(v.title);return s.jsx(u2,{title:v.title,content:v.content,icon:$.icon,color:$.color},A)})})]})]}),s.jsx("footer",{className:"prism-footer",children:s.jsxs("div",{className:"prism-footer-content",children:[s.jsx("p",{children:"Prism helps public health officials understand and respond to AI-generated health narratives"}),s.jsx(jd,{})]})}),ke.show_study&&s.jsx(qv,{onClick:()=>h(!0)}),ke.show_study&&s.jsx(Qv,{isOpen:E,onClose:()=>h(!1),onQuerySubmit:v=>{t(v),setTimeout(()=>{var A;(A=document.querySelector(".prism-submit-btn"))==null||A.click()},100)},setViewMode:at})]})}function a2({response:e}){const t=Fn[e.provider_name]||"#6b7280";return e.success?s.jsxs("div",{className:"card",style:{borderColor:t},children:[s.jsxs("div",{className:"card-header",children:[s.jsxs("div",{className:"provider-info",children:[s.jsx("div",{className:"provider-dot",style:{background:t}}),s.jsx("span",{className:"provider-name",style:{color:t},children:e.provider_name})]}),s.jsx("span",{className:"model",children:e.model})]}),s.jsx("div",{className:"card-content",children:s.jsx(Wt,{children:e.content})})]}):s.jsxs("div",{className:"card card-error",children:[s.jsxs("div",{className:"card-header",style:{background:"rgba(239, 68, 68, 0.1)"},children:[s.jsxs("div",{className:"provider-info",children:[s.jsx("div",{className:"provider-dot",style:{background:"#ef4444"}}),s.jsx("span",{className:"provider-name",style:{color:"#ef4444"},children:e.provider_name})]}),s.jsx("span",{className:"model",children:e.model})]}),s.jsxs("div",{className:"card-error-content",children:["Error: ",e.error]})]})}function u2({title:e,content:t,icon:n,color:r}){return s.jsxs("div",{className:"analysis-card",style:{borderColor:r},children:[s.jsxs("div",{className:"analysis-card-header",style:{background:`${r}15`,borderBottomColor:`${r}30`},children:[s.jsx("span",{className:"analysis-icon",children:n}),s.jsx("h3",{className:"analysis-card-title",style:{color:r},children:e})]}),s.jsx("div",{className:"analysis-card-content",children:s.jsx(Wt,{children:t})})]})}function Nd({title:e,subtitle:t,icon:n,color:r,data:i,type:l}){const o=i.count||0,a=i.source_types||{},u=i.top_cited||[],c=i.links||[],f=(()=>{if(c.length===0)return null;const m={};c.forEach(w=>{let E="Other";w.url.includes("cdc.gov")?E="CDC":w.url.includes("who.int")?E="WHO":w.url.includes("fda.gov")?E="FDA":w.url.includes("nih.gov")?E="NIH":w.url.includes("heart.org")?E="AHA":w.url.includes("cancer.org")?E="ACS":w.url.includes("acog.org")?E="ACOG":w.url.includes("aap.org")&&(E="AAP"),m[E]||(m[E]=0),m[E]++});const p=Object.keys(m).filter(w=>w!=="Other"),k=c.slice(0,5).map(w=>{const E=w.title.split(" - ")[0].split("|")[0].replace(/\.\.\.$/,"").trim();return E.length>60?E.slice(0,60)+"...":E});if(l==="guidelines"){let w=`**${o} official sources** provide authoritative guidance on this topic`;return p.length>0&&(w+=` from ${p.slice(0,4).join(", ")}`),w+=`.

`,w+=`**Key resources address:**
`,k.slice(0,3).forEach(E=>{w+=`- ${E}
`}),w}else{const w=c.reduce((h,g)=>h+(g.cited_by||0),0);let E=`**${o} peer-reviewed studies** provide research evidence`;return w>0&&(E+=` with ${w} combined citations`),E+=`.

`,E+=`**Research covers:**
`,k.slice(0,3).forEach(h=>{E+=`- ${h}
`}),E}})();return s.jsxs("div",{className:"evidence-card-chorus glass-card",children:[s.jsx("div",{className:"evidence-card-header-chorus",style:{borderLeftColor:r},children:s.jsxs("div",{className:"evidence-card-top",children:[s.jsx("span",{className:"evidence-icon-large",children:n}),s.jsxs("div",{className:"evidence-card-titles",children:[s.jsx("h3",{style:{color:r},children:e}),s.jsx("span",{className:"evidence-subtitle",children:t})]}),s.jsxs("div",{className:"evidence-count-badge",style:{backgroundColor:`${r}20`,color:r},children:[o," sources"]})]})}),s.jsxs("div",{className:"evidence-card-body",children:[f&&s.jsx("div",{className:"evidence-summary",children:s.jsx(Wt,{children:f})}),l==="guidelines"&&Object.keys(a).length>0&&s.jsx("div",{className:"source-breakdown",children:Object.entries(a).map(([m,p])=>s.jsxs("span",{className:"source-tag",children:[m,": ",p]},m))}),l==="literature"&&u.length>0&&s.jsxs("div",{className:"top-cited-chorus",children:[s.jsx("h4",{children:"Most Cited"}),u.slice(0,3).map((m,p)=>s.jsxs("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",className:"cited-paper-link",children:[s.jsx("span",{className:"paper-title",children:m.title}),s.jsxs("span",{className:"paper-citations",children:[m.cited_by," citations"]})]},p))]}),c.length>0&&s.jsxs("div",{className:"all-sources",children:[s.jsxs("h4",{children:["Sources (",c.length,")"]}),s.jsx("div",{className:"sources-scroll-container",children:c.map((m,p)=>s.jsxs("div",{className:"source-item-clean",children:[s.jsxs("span",{className:"source-num",children:[p+1,"."]}),s.jsxs("div",{className:"source-info",children:[s.jsx("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",className:"source-title-link",children:m.title}),s.jsxs("div",{className:"source-meta",children:[m.publication_info&&s.jsx("span",{className:"publication-info",children:m.publication_info}),m.cited_by>0&&s.jsxs("span",{className:"cite-count",children:[m.cited_by," citations"]})]})]})]},p))})]})]})]})}function c2({response:e}){const t=Fn[e.provider_name]||"#64748b";return e.success?s.jsxs("div",{className:"ai-card glass-card",children:[s.jsxs("div",{className:"ai-card-header",children:[s.jsxs("div",{className:"ai-provider",style:{color:t},children:[s.jsx("span",{className:"ai-dot",style:{backgroundColor:t}}),e.provider_name]}),s.jsx("span",{className:"ai-model",children:e.model})]}),s.jsx("div",{className:"ai-card-content",children:s.jsx(Wt,{children:e.content})})]}):s.jsxs("div",{className:"ai-card glass-card ai-card-error",children:[s.jsxs("div",{className:"ai-card-header",children:[s.jsxs("div",{className:"ai-provider",style:{color:"#ef4444"},children:[s.jsx("span",{className:"ai-dot",style:{backgroundColor:"#ef4444"}}),e.provider_name]}),s.jsx("span",{className:"ai-model",children:e.model})]}),s.jsxs("p",{className:"ai-error-text",children:["Error: ",e.error]})]})}const Cm=document.createElement("style");Cm.textContent=`
  * { box-sizing: border-box; }

  /* ===== PRISM STYLES ===== */
  .prism-app {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    color: #e2e8f0;
  }

  /* Prism Animated Background - Purple/Indigo theme */
  .prism-bg {
    position: fixed;
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
  .chorus-app {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* Animated Background */
  .chorus-bg {
    position: fixed;
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

  /* Chorus Header */
  .chorus-header {
    padding: 2rem 2rem 1.5rem;
    text-align: center;
  }

  .chorus-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem 2rem;
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
    gap: 0.75rem;
    font-size: 0.8rem;
    color: #64748b;
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-right: 0.5rem;
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

  /* References Section */
  .chorus-references-section .glass-card {
    padding: 0;
    overflow: hidden;
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

  /* Follow-up FAB */
  .follow-up-fab-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
  }

  .follow-up-fab {
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

  .follow-up-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.5);
  }

  .follow-up-fab.active {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    box-shadow: 0 4px 15px rgba(100, 116, 139, 0.4);
  }

  .follow-up-fab svg {
    transition: transform 0.2s ease;
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

  /* Mobile adjustments for FAB */
  @media (max-width: 480px) {
    .follow-up-fab-container {
      bottom: 1rem;
      right: 1rem;
    }

    .follow-up-panel {
      width: calc(100vw - 2rem);
      max-width: 340px;
    }

    .follow-up-fab {
      width: 52px;
      height: 52px;
    }
  }

  /* ===== PRISM STYLES (Original) ===== */
  .app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    min-height: 100vh;
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
`;document.head.appendChild(Cm);function d2(){return window.location.pathname==="/results"?s.jsx(Zv,{}):s.jsx(s2,{})}ts.createRoot(document.getElementById("root")).render(s.jsx(Hm.StrictMode,{children:s.jsx(d2,{})}));
