import{d as S,u as C,r as c,D as x,j as y,o as s,c as r,h as f,w as V,F as k,a as t,G as p,H as _,v as w,I as b,p as B,i as F,_ as I}from"./index.106a9419.js";import{S as d}from"./index.28db2512.js";const q=l=>(B("data-v-fa815166"),l=l(),F(),l),D={class:"m-dialog"},M={class:"d-dialog-header"},E={class:"d-dialog-tool cu-p is-win"},N=["onClick"],U=["onClick"],$=q(()=>t("div",{class:"d-dialog-title"},"title",-1)),j=S({__name:"index",props:{modelValue:{type:Boolean,required:!0,default:!1},draggable:{type:Boolean,required:!1,default:!1},fullScreen:{type:Boolean,required:!1,default:!1},showFullScreen:{type:Boolean,required:!1,default:!0},bgColor:{type:String,required:!1,default:"#fff"}},emits:["confirm","cancel","handleClose","update:fullScreen","update:modelValue"],setup(l,{emit:i}){const e=l;C(n=>({"fa815166-bgColor":l.bgColor}));function m(){o.value=!1,i("update:modelValue",!1)}const o=c(e.modelValue),a=c(!1);x(()=>{o.value=e.modelValue,e.fullScreen!==void 0&&(a.value=e.fullScreen)});function v(){a.value=!a.value,e.fullScreen!==void 0&&i("update:fullScreen",a.value)}return(n,u)=>{const g=y("el-dialog");return s(),r("div",D,[f(g,k({modelValue:o.value,"onUpdate:modelValue":u[0]||(u[0]=h=>o.value=h)},n.$attrs,{draggable:e.draggable,fullscreen:a.value,"show-close":!1}),{default:V(()=>[t("div",M,[t("div",E,[e.showFullScreen&&e.fullScreen!==void 0?(s(),r("span",{key:0,title:"\u653E\u5927/\u7F29\u5C0F",onClick:p(v,["stop"])},[e.fullScreen?(s(),_(d,{key:1,name:"fullscreen-exit-fill",iconStyle:{width:"14px",height:"14px"}})):(s(),_(d,{key:0,name:"fullScreen",iconStyle:{width:"14px",height:"14px"}}))],8,N)):w("v-if",!0),t("span",{title:"\u5173\u95ED",onClick:p(m,["stop"])},[f(d,{name:"close",iconStyle:{width:"16px",height:"16px"}})],8,U)]),$]),b(n.$slots,"default",{},void 0,!0)]),_:3},16,["modelValue","draggable","fullscreen"])])}}});const P=I(j,[["__scopeId","data-v-fa815166"],["__file","D:/Task/my-v3/on-line-page/src/components/MDialog/index.vue"]]);export{P as M};
