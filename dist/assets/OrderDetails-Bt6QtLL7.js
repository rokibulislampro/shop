import{b as O,c as P,r as E,k as M,j as e,d as C,M as I,B as N}from"./index-B5pvZNP2.js";/* empty css               */var D={exports:{}};(function(w,u){(function(f,i){w.exports=i()})(window,function(){return function(g){var f={};function i(s){if(f[s])return f[s].exports;var d=f[s]={i:s,l:!1,exports:{}};return g[s].call(d.exports,d,d.exports,i),d.l=!0,d.exports}return i.m=g,i.c=f,i.d=function(s,d,c){i.o(s,d)||Object.defineProperty(s,d,{enumerable:!0,get:c})},i.r=function(s){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},i.t=function(s,d){if(d&1&&(s=i(s)),d&8||d&4&&typeof s=="object"&&s&&s.__esModule)return s;var c=Object.create(null);if(i.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:s}),d&2&&typeof s!="string")for(var b in s)i.d(c,b,(function(l){return s[l]}).bind(null,b));return c},i.n=function(s){var d=s&&s.__esModule?function(){return s.default}:function(){return s};return i.d(d,"a",d),d},i.o=function(s,d){return Object.prototype.hasOwnProperty.call(s,d)},i.p="",i(i.s=0)}({"./src/index.js":function(g,f,i){i.r(f),i("./src/sass/index.scss");var s=i("./src/js/init.js"),d=s.default.init;typeof window<"u"&&(window.printJS=d),f.default=d},"./src/js/browser.js":function(g,f,i){i.r(f);var s={isFirefox:function(){return typeof InstallTrigger<"u"},isIE:function(){return navigator.userAgent.indexOf("MSIE")!==-1||!!document.documentMode},isEdge:function(){return!s.isIE()&&!!window.StyleMedia},isChrome:function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window;return!!c.chrome},isSafari:function(){return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0||navigator.userAgent.toLowerCase().indexOf("safari")!==-1},isIOSChrome:function(){return navigator.userAgent.toLowerCase().indexOf("crios")!==-1}};f.default=s},"./src/js/functions.js":function(g,f,i){i.r(f),i.d(f,"addWrapper",function(){return b}),i.d(f,"capitalizePrint",function(){return l}),i.d(f,"collectStyles",function(){return o}),i.d(f,"addHeader",function(){return n}),i.d(f,"cleanUp",function(){return m}),i.d(f,"isRawHTML",function(){return y});var s=i("./src/js/modal.js"),d=i("./src/js/browser.js");function c(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(p){return typeof p}:c=function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p},c(t)}function b(t,a){var p="font-family:"+a.font+" !important; font-size: "+a.font_size+" !important; width:100%;";return'<div style="'+p+'">'+t+"</div>"}function l(t){return t.charAt(0).toUpperCase()+t.slice(1)}function o(t,a){for(var p=document.defaultView||window,h="",x=p.getComputedStyle(t,""),j=0;j<x.length;j++)(a.targetStyles.indexOf("*")!==-1||a.targetStyle.indexOf(x[j])!==-1||r(a.targetStyles,x[j]))&&x.getPropertyValue(x[j])&&(h+=x[j]+":"+x.getPropertyValue(x[j])+";");return h+="max-width: "+a.maxWidth+"px !important; font-size: "+a.font_size+" !important;",h}function r(t,a){for(var p=0;p<t.length;p++)if(c(a)==="object"&&a.indexOf(t[p])!==-1)return!0;return!1}function n(t,a){var p=document.createElement("div");if(y(a.header))p.innerHTML=a.header;else{var h=document.createElement("h1"),x=document.createTextNode(a.header);h.appendChild(x),h.setAttribute("style",a.headerStyle),p.appendChild(h)}t.insertBefore(p,t.childNodes[0])}function m(t){t.showModal&&s.default.close(),t.onLoadingEnd&&t.onLoadingEnd(),(t.showModal||t.onLoadingStart)&&window.URL.revokeObjectURL(t.printable);var a="mouseover";(d.default.isChrome()||d.default.isFirefox())&&(a="focus");var p=function h(){window.removeEventListener(a,h),t.onPrintDialogClose();var x=document.getElementById(t.frameId);x&&x.remove()};window.addEventListener(a,p)}function y(t){var a=new RegExp("<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>");return a.test(t)}},"./src/js/html.js":function(g,f,i){i.r(f);var s=i("./src/js/functions.js"),d=i("./src/js/print.js");function c(o){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(n){return typeof n}:c=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},c(o)}f.default={print:function(r,n){var m=l(r.printable)?r.printable:document.getElementById(r.printable);if(!m){window.console.error("Invalid HTML element id: "+r.printable);return}r.printableElement=b(m,r),r.header&&Object(s.addHeader)(r.printableElement,r),d.default.send(r,n)}};function b(o,r){for(var n=o.cloneNode(),m=Array.prototype.slice.call(o.childNodes),y=0;y<m.length;y++)if(r.ignoreElements.indexOf(m[y].id)===-1){var t=b(m[y],r);n.appendChild(t)}switch(r.scanStyles&&o.nodeType===1&&n.setAttribute("style",Object(s.collectStyles)(o,r)),o.tagName){case"SELECT":n.value=o.value;break;case"CANVAS":n.getContext("2d").drawImage(o,0,0);break}return n}function l(o){return c(o)==="object"&&o&&(o instanceof HTMLElement||o.nodeType===1)}},"./src/js/image.js":function(g,f,i){i.r(f);var s=i("./src/js/functions.js"),d=i("./src/js/print.js"),c=i("./src/js/browser.js");f.default={print:function(l,o){l.printable.constructor!==Array&&(l.printable=[l.printable]),l.printableElement=document.createElement("div"),l.printable.forEach(function(r){var n=document.createElement("img");if(n.setAttribute("style",l.imageStyle),n.src=r,c.default.isFirefox()){var m=n.src;n.src=m}var y=document.createElement("div");y.appendChild(n),l.printableElement.appendChild(y)}),l.header&&Object(s.addHeader)(l.printableElement,l),d.default.send(l,o)}}},"./src/js/init.js":function(g,f,i){i.r(f);var s=i("./src/js/browser.js"),d=i("./src/js/modal.js"),c=i("./src/js/pdf.js"),b=i("./src/js/html.js"),l=i("./src/js/raw-html.js"),o=i("./src/js/image.js"),r=i("./src/js/json.js");function n(y){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?n=function(a){return typeof a}:n=function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},n(y)}var m=["pdf","html","image","json","raw-html"];f.default={init:function(){var t={printable:null,fallbackPrintable:null,type:"pdf",header:null,headerStyle:"font-weight: 300;",maxWidth:800,properties:null,gridHeaderStyle:"font-weight: bold; padding: 5px; border: 1px solid #dddddd;",gridStyle:"border: 1px solid lightgray; margin-bottom: -1px;",showModal:!1,onError:function(S){throw S},onLoadingStart:null,onLoadingEnd:null,onPrintDialogClose:function(){},onIncompatibleBrowser:function(){},modalMessage:"Retrieving Document...",frameId:"printJS",printableElement:null,documentTitle:"Document",targetStyle:["clear","display","width","min-width","height","min-height","max-height"],targetStyles:["border","box","break","text-decoration"],ignoreElements:[],repeatTableHeader:!0,css:null,style:null,scanStyles:!0,base64:!1,onPdfOpen:null,font:"TimesNewRoman",font_size:"12pt",honorMarginPadding:!0,honorColor:!1,imageStyle:"max-width: 100%;"},a=arguments[0];if(a===void 0)throw new Error("printJS expects at least 1 attribute.");switch(n(a)){case"string":t.printable=encodeURI(a),t.fallbackPrintable=t.printable,t.type=arguments[1]||t.type;break;case"object":t.printable=a.printable,t.fallbackPrintable=typeof a.fallbackPrintable<"u"?a.fallbackPrintable:t.printable,t.fallbackPrintable=t.base64?"data:application/pdf;base64,".concat(t.fallbackPrintable):t.fallbackPrintable;for(var p in t)p==="printable"||p==="fallbackPrintable"||(t[p]=typeof a[p]<"u"?a[p]:t[p]);break;default:throw new Error('Unexpected argument type! Expected "string" or "object", got '+n(a))}if(!t.printable)throw new Error("Missing printable information.");if(!t.type||typeof t.type!="string"||m.indexOf(t.type.toLowerCase())===-1)throw new Error("Invalid print type. Available types are: pdf, html, image and json.");t.showModal&&d.default.show(t),t.onLoadingStart&&t.onLoadingStart();var h=document.getElementById(t.frameId);h&&h.parentNode.removeChild(h);var x=document.createElement("iframe");switch(s.default.isFirefox()?x.setAttribute("style","width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0"):x.setAttribute("style","visibility: hidden; height: 0; width: 0; position: absolute; border: 0"),x.setAttribute("id",t.frameId),t.type!=="pdf"&&(x.srcdoc="<html><head><title>"+t.documentTitle+"</title>",t.css&&(Array.isArray(t.css)||(t.css=[t.css]),t.css.forEach(function(v){x.srcdoc+='<link rel="stylesheet" href="'+v+'">'})),x.srcdoc+="</head><body></body></html>"),t.type){case"pdf":if(s.default.isIE())try{console.info("Print.js doesn't support PDF printing in Internet Explorer.");var j=window.open(t.fallbackPrintable,"_blank");j.focus(),t.onIncompatibleBrowser()}catch(v){t.onError(v)}finally{t.showModal&&d.default.close(),t.onLoadingEnd&&t.onLoadingEnd()}else c.default.print(t,x);break;case"image":o.default.print(t,x);break;case"html":b.default.print(t,x);break;case"raw-html":l.default.print(t,x);break;case"json":r.default.print(t,x);break}}}},"./src/js/json.js":function(g,f,i){i.r(f);var s=i("./src/js/functions.js"),d=i("./src/js/print.js");function c(l){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(r){return typeof r}:c=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},c(l)}f.default={print:function(o,r){if(c(o.printable)!=="object")throw new Error("Invalid javascript data object (JSON).");if(typeof o.repeatTableHeader!="boolean")throw new Error("Invalid value for repeatTableHeader attribute (JSON).");if(!o.properties||!Array.isArray(o.properties))throw new Error("Invalid properties array for your JSON data.");o.properties=o.properties.map(function(n){return{field:c(n)==="object"?n.field:n,displayName:c(n)==="object"?n.displayName:n,columnSize:c(n)==="object"&&n.columnSize?n.columnSize+";":100/o.properties.length+"%;"}}),o.printableElement=document.createElement("div"),o.header&&Object(s.addHeader)(o.printableElement,o),o.printableElement.innerHTML+=b(o),d.default.send(o,r)}};function b(l){var o=l.printable,r=l.properties,n='<table style="border-collapse: collapse; width: 100%;">';l.repeatTableHeader&&(n+="<thead>"),n+="<tr>";for(var m=0;m<r.length;m++)n+='<th style="width:'+r[m].columnSize+";"+l.gridHeaderStyle+'">'+Object(s.capitalizePrint)(r[m].displayName)+"</th>";n+="</tr>",l.repeatTableHeader&&(n+="</thead>"),n+="<tbody>";for(var y=0;y<o.length;y++){n+="<tr>";for(var t=0;t<r.length;t++){var a=o[y],p=r[t].field.split(".");if(p.length>1)for(var h=0;h<p.length;h++)a=a[p[h]];else a=a[r[t].field];n+='<td style="width:'+r[t].columnSize+l.gridStyle+'">'+a+"</td>"}n+="</tr>"}return n+="</tbody></table>",n}},"./src/js/modal.js":function(g,f,i){i.r(f);var s={show:function(c){var b="font-family:sans-serif; display:table; text-align:center; font-weight:300; font-size:30px; left:0; top:0;position:fixed; z-index: 9990;color: #0460B5; width: 100%; height: 100%; background-color:rgba(255,255,255,.9);transition: opacity .3s ease;",l=document.createElement("div");l.setAttribute("style",b),l.setAttribute("id","printJS-Modal");var o=document.createElement("div");o.setAttribute("style","display:table-cell; vertical-align:middle; padding-bottom:100px;");var r=document.createElement("div");r.setAttribute("class","printClose"),r.setAttribute("id","printClose"),o.appendChild(r);var n=document.createElement("span");n.setAttribute("class","printSpinner"),o.appendChild(n);var m=document.createTextNode(c.modalMessage);o.appendChild(m),l.appendChild(o),document.getElementsByTagName("body")[0].appendChild(l),document.getElementById("printClose").addEventListener("click",function(){s.close()})},close:function(){var c=document.getElementById("printJS-Modal");c&&c.parentNode.removeChild(c)}};f.default=s},"./src/js/pdf.js":function(g,f,i){i.r(f);var s=i("./src/js/print.js"),d=i("./src/js/functions.js");f.default={print:function(l,o){if(l.base64){var r=Uint8Array.from(atob(l.printable),function(m){return m.charCodeAt(0)});c(l,o,r);return}l.printable=/^(blob|http|\/\/)/i.test(l.printable)?l.printable:window.location.origin+(l.printable.charAt(0)!=="/"?"/"+l.printable:l.printable);var n=new window.XMLHttpRequest;n.responseType="arraybuffer",n.addEventListener("error",function(){Object(d.cleanUp)(l),l.onError(n.statusText,n)}),n.addEventListener("load",function(){if([200,201].indexOf(n.status)===-1){Object(d.cleanUp)(l),l.onError(n.statusText,n);return}c(l,o,n.response)}),n.open("GET",l.printable,!0),n.send()}};function c(b,l,o){var r=new window.Blob([o],{type:"application/pdf"});r=window.URL.createObjectURL(r),l.setAttribute("src",r),s.default.send(b,l)}},"./src/js/print.js":function(g,f,i){i.r(f);var s=i("./src/js/browser.js"),d=i("./src/js/functions.js"),c={send:function(n,m){document.getElementsByTagName("body")[0].appendChild(m);var y=document.getElementById(n.frameId);y.onload=function(){if(n.type==="pdf"){s.default.isFirefox()?setTimeout(function(){return b(y,n)},1e3):b(y,n);return}var t=y.contentWindow||y.contentDocument;if(t.document&&(t=t.document),t.body.appendChild(n.printableElement),n.type!=="pdf"&&n.style){var a=document.createElement("style");a.innerHTML=n.style,t.head.appendChild(a)}var p=t.getElementsByTagName("img");p.length>0?l(Array.from(p)).then(function(){return b(y,n)}):b(y,n)}}};function b(r,n){try{if(r.focus(),s.default.isEdge()||s.default.isIE())try{r.contentWindow.document.execCommand("print",!1,null)}catch{r.contentWindow.print()}else r.contentWindow.print()}catch(m){n.onError(m)}finally{s.default.isFirefox()&&(r.style.visibility="hidden",r.style.left="-1px"),Object(d.cleanUp)(n)}}function l(r){var n=r.map(function(m){if(m.src&&m.src!==window.location.href)return o(m)});return Promise.all(n)}function o(r){return new Promise(function(n){var m=function y(){!r||typeof r.naturalWidth>"u"||r.naturalWidth===0||!r.complete?setTimeout(y,500):n()};m()})}f.default=c},"./src/js/raw-html.js":function(g,f,i){i.r(f);var s=i("./src/js/print.js");f.default={print:function(c,b){c.printableElement=document.createElement("div"),c.printableElement.setAttribute("style","width:100%"),c.printableElement.innerHTML=c.printable,s.default.send(c,b)}}},"./src/sass/index.scss":function(g,f,i){},0:function(g,f,i){g.exports=i("./src/index.js")}}).default})})(D);var T=D.exports;const A=O(T),U=()=>{var a,p;const w=P(),{order:u}=w.state,[g,f]=E.useState(!1),[i,s]=E.useState(((a=u==null?void 0:u.orderDetails)==null?void 0:a.status)||""),[d,c]=E.useState(((p=u==null?void 0:u.orderDetails)==null?void 0:p.type)||""),b=M(),l=E.useRef(),o=()=>{f(!0)},m=(h=>{const x={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0};return h.toLocaleString("en-US",x).replace(",","")})(new Date),y=async()=>{try{if((await b.put(`/order/${u._id}`,{status:i,type:d,updateDate:m})).status===200){N.success("Updated successfully!");const x={...u,orderDetails:{...u.orderDetails,status:i,type:d,updateDate:m}};s(x.orderDetails.status),c(x.orderDetails.type),u.orderDetails.status=x.orderDetails.status,u.orderDetails.type=x.orderDetails.type,f(!1)}}catch{N.error("Failed to update status.")}},t=()=>{A({printable:l.current,type:"html",css:"style.css",targetStyles:["*"],style:"@page { size: A4; margin: 20mm; }",documentTitle:"Order Invoice"})};return e.jsxs("section",{className:"container mx-auto p-6 lg:p-[3rem] lg:px-[10rem]",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(C,{to:"/dashboard/orders",children:e.jsx("span",{className:"border shadow  bg-white hover:bg-[#ff5a00] hover:text-white p-1.5 px-2.5 font-bold rounded transition-all",children:"←"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[#ff5a00] text-xs font-semibold",children:"Order / Order Details"}),e.jsxs("h2",{className:"font-semibold",children:["Order: #",u.orderId]})]})]}),e.jsx("h3",{className:"text-lg font-semibold",children:"INVOICE"})]}),e.jsxs("div",{className:"space-y-2 border rounded p-3 shadow w-full my-5",children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{className:"md:flex items-center gap-4 md:text-lg font-semibold text-gray-700",children:[e.jsxs("h3",{children:["OrderID: ",e.jsx("span",{className:"text-md",children:u.orderId})]}),e.jsxs("h3",{children:["TrackingID: ",e.jsx("span",{className:"text-md",children:u.trackingId})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex items-center gap-3",children:g?e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>f(!1),className:"bg-[#ff5a00] hover:bg-orange-600 rounded-full px-4 p-2 text-white text-sm transition-all",children:"Cancel"}),e.jsx("button",{onClick:y,className:"bg-green-500 hover:bg-green-700 rounded-full px-4 p-2 text-white text-sm transition-all",children:"Save"})]}):e.jsx("button",{onClick:o,className:"bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center",children:e.jsx(I,{})})}),e.jsx("button",{className:"bg-[#1e1f29] hover:bg-[#ff5a00] rounded px-4 p-2 text-white text-sm transition-all",onClick:t,children:"Download"})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[g?e.jsxs("select",{value:i,onChange:h=>s(h.target.value),className:"text-indigo-400 bg-indigo-50 text-xs font-semibold w-fit rounded p-1 px-4",children:[e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Canceled",children:"Canceled"})]}):e.jsx("p",{className:"text-indigo-400 bg-indigo-50 text-xs font-semibold w-fit rounded p-1 px-4",children:u.orderDetails.status}),g?e.jsxs("select",{value:d,onChange:h=>c(h.target.value),className:"text-indigo-400 bg-indigo-50 text-xs font-semibold w-fit rounded p-1 px-4",children:[e.jsx("option",{value:"Undefined",children:"Undefined"}),e.jsx("option",{value:"Real",children:"Real"}),e.jsx("option",{value:"Organic",children:"Organic"}),e.jsx("option",{value:"Fake",children:"Fake"})]}):e.jsx("p",{className:"text-orange-400 bg-orange-50 text-xs font-semibold w-fit rounded p-1 px-4",children:u.orderDetails.type})]}),e.jsxs("div",{className:"flex items-center text-xs gap-3",children:[e.jsxs("p",{className:"bg-gray-100 shadow-sm p-1 px-2 rounded-sm",children:["Placed On: ",u.date," ",u.time]}),e.jsxs("p",{className:"bg-gray-100 shadow-sm p-1 px-2 rounded-sm",children:["Updated: ",u.updateDate]})]})]}),e.jsxs("div",{className:"space-y-4 mt-5 invoice",ref:l,children:[e.jsxs("div",{className:"w-full text-sm text-end",children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{className:"flex flex-col text-start",children:[e.jsxs("h4",{className:"font-semibold",children:["Order Id: ",e.jsx("span",{className:"text-md",children:u.orderId})]}),e.jsx("span",{className:"text-indigo-400",children:u.orderDetails.status}),e.jsx("span",{children:u.updateDate})]}),e.jsx("h2",{className:"font-semibold font-serif text-2xl mb-2",children:"dreamBuy"})]}),e.jsxs("div",{className:"space-y-2 text-gray-900 w-full flex flex-col",children:[e.jsx("span",{className:"text-gray-900 w-full font-semibold",children:"dreambuy.com"}),e.jsx("span",{className:"text-gray-900 w-full",children:"0960000000"}),e.jsx("span",{className:"text-gray-900 w-full",children:"1216 Mirpur, Dhaka"}),e.jsx("span",{className:"text-gray-900 w-full",children:"Bangladesh"})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"w-full text-sm",children:[e.jsx("h2",{className:"font-semibold text-sm mb-2",children:"Customer & Shipping Add."}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex w-full",children:e.jsx("span",{className:"text-gray-900 w-full",children:u.billingDetails.fullName})}),e.jsx("div",{className:"flex w-full",children:e.jsx("span",{className:"text-gray-900 w-full",children:u.billingDetails.email})}),e.jsx("div",{className:"flex w-full",children:e.jsx("span",{className:"text-gray-900 w-full",children:u.billingDetails.phone})}),e.jsx("div",{className:"flex w-full",children:e.jsx("span",{className:"text-gray-900 w-full",children:u.orderDetails.paymentMethod})}),e.jsx("div",{className:"flex w-full",children:e.jsxs("span",{className:"text-gray-900 w-full",children:[u.billingDetails.address,", ",u.billingDetails.district,","," ",u.billingDetails.country]})}),e.jsx("div",{className:"flex w-full",children:e.jsxs("span",{className:"text-gray-900 w-full",children:["Placed On: ",u.date," ",u.time]})}),e.jsx("hr",{}),e.jsx("div",{className:"flex w-full my-5",children:e.jsxs("span",{className:"flex w-full",children:["Additional Info : ",u.billingDetails.additionalInfo]})})]})]}),e.jsxs("div",{className:"space-y-2 w-full",children:[e.jsx("h2",{className:"font-semibold text-lg",children:"Products Ordered"}),e.jsxs("table",{className:"table-full w-full text-left whitespace-no-wrap",children:[e.jsx("thead",{className:"w-full",children:e.jsxs("tr",{className:"text-sm",children:[e.jsx("th",{className:"px-2 py-2",children:"Product"}),e.jsx("th",{className:"px-2 py-2",children:"SKU"}),e.jsx("th",{className:"px-2 py-2 hidden md:block",children:"Category"}),e.jsx("th",{className:"px-2 py-2 text-center",children:"Quantity"}),e.jsx("th",{className:"px-2 py-2 text-end",children:"Price"}),e.jsx("th",{className:"px-2 py-2 text-end",children:"Subtotal"})]})}),e.jsx("tbody",{children:u.orderDetails.products.map(h=>e.jsxs("tr",{className:"text-sm",children:[e.jsxs("td",{className:"px-2 py-2 flex items-center gap-2",children:[e.jsx("img",{src:h.image,className:"w-10 rounded-sm",alt:"Product Photo"}),e.jsx("span",{className:"font-semibold text-sm",children:h.name})]}),e.jsx("td",{className:"px-2 py-2",children:h.sku}),e.jsx("td",{className:"px-2 py-2 hidden md:block",children:h.category}),e.jsx("td",{className:"px-2 py-2 text-center",children:h.quantity}),e.jsxs("td",{className:"px-2 py-2 text-end",children:["৳",h.price]}),e.jsxs("td",{className:"px-2 py-2 text-end",children:["৳",h.price*h.quantity]})]},h._id))})]}),e.jsx("hr",{className:"py-1"}),e.jsxs("h3",{className:"flex justify-between items-center px-3 text-sm font-semibold w-full",children:["Total ",e.jsxs("span",{children:["৳",u.orderDetails.total]})]}),e.jsx("hr",{className:"py-1"}),e.jsxs("h3",{className:"flex justify-between items-center px-3 text-sm font-semibold",children:["Delivery Charge ",e.jsxs("span",{children:["৳",u.orderDetails.deliveryCharge]})]}),e.jsx("hr",{className:"py-1"}),e.jsxs("h3",{className:"flex justify-end items-center px-3 text-lg gap-2 font-bold",children:["Grand Total ~ ",e.jsxs("span",{children:["৳",u.orderDetails.grandTotal]})]})]})]})]})};export{U as default};