import{d as S,u as C,r as u,C as x,j as y,o as t,c as r,h as f,w as V,D as w,a as s,F as p,G as _,H as b,I as k,p as B,i as F}from"./index.3a328357.js";import{_ as c}from"./index.vue_vue_type_script_setup_true_name_SvgIcon_lang.63d02811.js";import{_ as I}from"./_plugin-vue_export-helper.cdc0426e.js";const D=l=>(B("data-v-c4c32cba"),l=l(),F(),l),E={class:"m-dialog"},M={class:"d-dialog-header"},N={class:"d-dialog-tool cu-p is-win"},$=["onClick"],U=["onClick"],j=D(()=>s("div",{class:"d-dialog-title"},"title",-1)),G=S({__name:"index",props:{modelValue:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},fullScreen:{type:Boolean,default:!1},showFullScreen:{type:Boolean,default:!0},bgColor:{default:"#fff"}},emits:["confirm","cancel","handleClose","update:fullScreen","update:modelValue"],setup(l,{emit:d}){const e=l;C(n=>({"82d7ef92":l.bgColor}));function m(){a.value=!1,d("update:modelValue",!1)}const a=u(e.modelValue),o=u(!1);x(()=>{a.value=e.modelValue,e.fullScreen!==void 0&&(o.value=e.fullScreen)});function h(){o.value=!o.value,e.fullScreen!==void 0&&d("update:fullScreen",o.value)}return(n,i)=>{const v=y("el-dialog");return t(),r("div",E,[f(v,w({modelValue:a.value,"onUpdate:modelValue":i[0]||(i[0]=g=>a.value=g)},n.$attrs,{draggable:e.draggable,fullscreen:o.value,"show-close":!1}),{default:V(()=>[s("div",M,[s("div",N,[e.showFullScreen&&e.fullScreen!==void 0?(t(),r("span",{key:0,title:"\u653E\u5927/\u7F29\u5C0F",onClick:p(h,["stop"])},[e.fullScreen?(t(),_(c,{key:1,name:"fullscreen-exit-fill",iconStyle:{width:"14px",height:"14px"}})):(t(),_(c,{key:0,name:"fullScreen",iconStyle:{width:"14px",height:"14px"}}))],8,$)):b("",!0),s("span",{title:"\u5173\u95ED",onClick:p(m,["stop"])},[f(c,{name:"close",iconStyle:{width:"16px",height:"16px"}})],8,U)]),j]),k(n.$slots,"default",{},void 0,!0)]),_:3},16,["modelValue","draggable","fullscreen"])])}}});const z=I(G,[["__scopeId","data-v-c4c32cba"]]);export{z as M};
