import{r,k as u,j as e,L as d}from"./index-B5pvZNP2.js";const m=()=>{const[s,o]=r.useState(null),[f,t]=r.useState(!0),a=u();return r.useEffect(()=>{(async()=>{t(!0);try{const c=(await a.get("/banner")).data.filter(l=>l.status==="Inactive"),i=c[c.length-1];o(i)}catch(n){console.error("Error fetching Products:",n)}finally{t(!1)}})()},[a]),e.jsx("section",{className:"xl:mx-[10rem]",children:e.jsx("div",{className:"w-full h-full",children:f?e.jsx(d,{}):s?e.jsx("div",{children:e.jsx("img",{src:s.image,alt:"Offer Product Banner",className:"h-40 w-full object-fill rounded-sm"})},s._id):e.jsx("p",{children:"No inactive offer available"})})})};export{m as default};