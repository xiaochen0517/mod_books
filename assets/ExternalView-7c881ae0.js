import{r as i,b as _,d,o as u,c as f,a as t,t as m,u as s,e as n,w as c,f as a}from"./index-30b97314.js";const p={class:"h-screen flex flex-col justify-center items-center text-center"},h=t("p",null,"你即将离开本站点是否确认跳转",-1),x=["href"],w={class:"w-64 flex flex-row justify-end items-center"},B={__name:"ExternalView",setup(k){const e=i.currentRoute.value.params.encodeUrl;_(()=>{console.log("encodeUrl",e)});const r=()=>{window.close()},l=()=>{location.href=e};return(y,b)=>{const o=d("a-button");return u(),f("div",p,[h,t("a",{class:"mb-6",href:s(e)},m(s(e)),9,x),t("div",w,[n(o,{class:"mr-2",onClick:r},{default:c(()=>[a("返回")]),_:1}),n(o,{type:"primary",onClick:l},{default:c(()=>[a("确认")]),_:1})])])}}};export{B as default};
