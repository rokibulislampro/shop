const __vite__fileDeps=["assets/GraphChart-nM5btPld.js","assets/index-B5pvZNP2.js","assets/index-Ln90zs0o.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{r,_ as $,k as ee,j as e,a0 as te,a4 as se,a3 as le,ay as ae,L as re,d as ne}from"./index-B5pvZNP2.js";import{h as ce,n as ie}from"./hoverFilter-pthvAAF0.js";const de=r.lazy(()=>$(()=>import("./GraphChart-nM5btPld.js"),__vite__mapDeps([0,1,2]))),me=()=>{const m=ee(),[S,g]=r.useState(!1),[C,p]=r.useState(!1),[j,D]=r.useState("Today"),[w,P]=r.useState([]),[F,T]=r.useState(0),[O,E]=r.useState(0),[L,k]=r.useState(0),[_,M]=r.useState(0),[Y,A]=r.useState(0),[I,q]=r.useState(0),[Q,W]=r.useState(0);r.useEffect(()=>{(async()=>{try{const a=(await m.get("/order")).data;P(a),N(j,a)}catch(s){console.error("Error fetching orders:",s)}})()},[m]);const H=t=>{const s=t.reduce((d,i)=>d+i.orderDetails.total,0),a=t.length,c=t.reduce((d,i)=>d+i.orderDetails.products.length,0),x=t.reduce((d,i)=>d+i.orderDetails.products.reduce((f,u)=>f+u.quantity,0),0),n=t.reduce((d,i)=>d+i.orderDetails.products.reduce((f,u)=>f+u.purchasePrice*u.quantity,0),0);T(s),E(a),k(c),M(x),A(n);const l=s?(s-n)/s*100:0,o=s?n/s*100:0;q(l.toFixed(2)),W(o.toFixed(2))},R=()=>{p(t=>!t)},z=t=>{D(t),p(!1),N(t,w)},N=(t,s)=>{const a=new Date;let c;switch(t){case"Today":c=s.filter(n=>{const l=new Date(n.orderDetails.date);return l.getFullYear()===a.getFullYear()&&l.getMonth()===a.getMonth()&&l.getDate()===a.getDate()});break;case"Weekly":const x=new Date;x.setDate(a.getDate()-a.getDay()),c=s.filter(n=>{const l=new Date(n.orderDetails.date);return l>=x&&l<=a});break;case"Monthly":c=s.filter(n=>{const l=new Date(n.orderDetails.date);return l.getFullYear()===a.getFullYear()&&l.getMonth()===a.getMonth()});break;case"Yearly":c=s.filter(n=>new Date(n.orderDetails.date).getFullYear()===a.getFullYear());break;case"Lifetime":c=s;break;default:c=s}H(c)},[G,B]=r.useState([]),[b,V]=r.useState(0),[y,J]=r.useState(0),[v,K]=r.useState(0),[h,U]=r.useState(0);r.useEffect(()=>{(async()=>{try{const a=(await m.get("/order")).data.reverse();B(a),X(a)}catch(s){console.error("Error fetching lifetime data:",s)}})()},[m]);const X=t=>{console.log("Orders Data:",t);const s=t.reduce((l,o)=>l+o.orderDetails.total,0),a=t.reduce((l,o)=>l+o.orderDetails.products.reduce((d,i)=>d+i.purchasePrice*i.quantity,0),0),c=t.filter(l=>l.orderDetails.status==="Canceled");console.log("Canceled Orders:",c);const x=c.reduce((l,o)=>l+o.orderDetails.products.reduce((d,i)=>d+i.purchasePrice*i.quantity,0),0);console.log("Total Canceled Purchase Calculation:",x);const n=c.reduce((l,o)=>l+o.orderDetails.total,0);V(s),J(a),K(n),U(x),console.log("Total Sales:",s),console.log("Total Expenses:",a),console.log("Total Canceled:",n)};function Z(t){switch(t){case"Delivered":return"green";case"Pending":return"orange";case"Processing":return"blue";case"Canceled":return"red";default:return"blue"}}return e.jsxs("section",{className:"md:flex items-start justify-between gap-5",children:[e.jsxs("div",{className:"relative w-full",children:[e.jsxs("div",{className:"w-full flex justify-between items-center",children:[e.jsxs("h4",{className:"font-semibold text-sm text-[#ff5a00] my-5",children:[j," History"]}),e.jsx("button",{id:"filter-button",onClick:R,className:"bg-white hover:bg-[#1d1e29] p-1.5 px-5 rounded shadow-md transition-all",onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),children:e.jsx("img",{src:S?ce:ie,alt:"Filter Button",className:"w-6"})})]}),C&&e.jsxs("div",{className:"absolute bg-white shadow-md rounded-md p-3 z-20 text-sm right-5",children:[e.jsx("h5",{className:"font-semibold text-xs mb-2",children:"Select Filter Option"}),e.jsx("ul",{children:["Today","Weekly","Monthly","Yearly","Lifetime"].map(t=>e.jsx("li",{onClick:()=>z(t),className:"cursor-pointer hover:bg-gray-200 p-1 rounded",children:t},t))})]}),e.jsxs("div",{className:"flex justify-around items-center w-full h-full gap-3",children:[e.jsxs("div",{className:"w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md",children:[e.jsx("div",{className:"bg-orange-600 text-xl md:text-2xl text-white p-4 rounded-full w-fit ",children:e.jsx(te,{})}),e.jsx("h6",{className:"text-xs md:text-sm font-semibold",children:"Total Sales"}),e.jsxs("p",{className:"text-xs",children:[I,"%~Gain"]}),e.jsxs("h3",{className:"md:text-2xl text-orange-500 font-bold font-serif",children:["৳",F]})]}),e.jsxs("div",{className:"w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md",children:[e.jsx("div",{className:"bg-green-500 text-xl md:text-2xl text-white p-4 rounded-full w-fit ",children:e.jsx(se,{})}),e.jsx("h6",{className:"text-xs md:text-sm font-semibold",children:"Orders"}),e.jsx("p",{className:"text-xs",children:"All~Orders"}),e.jsx("h3",{className:"md:text-2xl text-orange-500 font-bold font-serif",children:O})]}),e.jsxs("div",{className:"w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md",children:[e.jsx("div",{className:"bg-indigo-950 text-xl md:text-2xl text-white p-4 rounded-full w-fit ",children:e.jsx(le,{})}),e.jsx("h6",{className:"text-xs md:text-sm font-semibold",children:"Products"}),e.jsx("p",{className:"text-xs hidden md:flex",children:"All~Products"}),e.jsxs("h3",{className:"md:text-2xl text-orange-500 font-bold font-serif",children:["P: ",L," / Q: ",_]})]}),e.jsxs("div",{className:"w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md",children:[e.jsxs("div",{className:"bg-orange-500 text-xl md:text-2xl text-white p-4 rounded-full w-fit ",children:[e.jsx(ae,{})," "]}),e.jsx("h6",{className:"text-xs md:text-sm font-semibold",children:"Expenses"}),e.jsxs("p",{className:"text-xs",children:[Q,"%"]}),e.jsxs("h3",{className:"md:text-2xl text-orange-500 font-bold font-serif",children:["৳",Y]})]})]}),e.jsx(r.Suspense,{fallback:e.jsx(re,{}),children:e.jsx(de,{orders:w})})]}),e.jsxs("div",{className:"space-y-4 mt-3",children:[e.jsxs("div",{className:"p-6 w-full min-w-sm mx-auto bg-gradient-to-b from-[#ff5a00] to-orange-400 rounded-lg shadow-lg space-y-1 text-white",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-2xl font-bold",children:["৳",(b-v-(y-h)).toFixed(2)]}),e.jsx("h4",{className:"text-md",children:"Lifetime Profit"})]}),e.jsxs("div",{className:"flex justify-between items-center py-2 text-sm gap-10",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"text-orange-500 bg-white p-1 px-1.5 text-xs rounded",children:"↓"}),e.jsx("span",{className:"ml-2",children:"Expenses"})]}),e.jsxs("div",{children:["৳",(y-h).toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between items-center py-2 text-sm gap-10",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"text-green-500 bg-white p-1 px-1.5 text-xs rounded",children:"↑"}),e.jsx("span",{className:"ml-2",children:"Incomes"})]}),e.jsxs("div",{children:["৳",(b-v).toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between items-center py-2 text-sm gap-10",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"text-orange-500 bg-white p-1 px-1.5 text-xs rounded",children:"↓"}),e.jsx("span",{className:"ml-2",children:"Canceled"})]}),e.jsxs("div",{children:["৳",h.toFixed(2)]})]}),e.jsx("button",{className:"mt-4 w-full bg-white text-orange-500 text-sm font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300",children:"Lifetime Overview"})]}),e.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-3",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h3",{className:"font-semibold",children:"Recent Orders"}),e.jsx(ne,{to:"/dashboard/orders",children:e.jsx("p",{className:"text-sm text-slate-600 font-semibold",children:"See All"})})]}),e.jsx("div",{className:"mt-4 overflow-auto h-60",children:G.map(t=>e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsx("div",{className:"product-details",children:t.orderDetails.products.map(s=>e.jsxs("div",{className:"flex items-center gap-1 md:text-xs py-2",children:[e.jsx("img",{src:s.image,className:"w-8",alt:s.name}),e.jsx("p",{children:s.name})]},s.id))}),e.jsx("p",{style:{color:Z(t.orderDetails.status)},children:t.orderDetails.status})]},t._id))})]})]})]})};export{me as default};