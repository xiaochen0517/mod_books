import{r as a,o as s,c,a as e,t as i,u as t}from"./index-5ede77e9.js";const l={class:"h-screen flex flex-col justify-center items-center text-center text-md"},g=e("i",{class:"iconfont icon-info text-6xl text-orange-800 mb-4"},null,-1),d=e("p",{class:"mb-2"},"你即将离开本站点是否确认跳转",-1),u=["href"],p={__name:"ExternalView",setup(b){const r=a.currentRoute.value.params.encodeUrl,o=()=>{window.close()},n=()=>{location.href=r};return(m,_)=>(s(),c("div",l,[g,d,e("a",{class:"mb-6",href:t(r)},i(t(r)),9,u),e("div",{class:"w-64 flex flex-row justify-center items-center"},[e("button",{class:"mr-2 py-1 px-3 rounded-sm bg-orange-500 hover:bg-orange-700 active:bg-orange-800 dark:bg-orange-700 dark:hover:bg-orange-800 dark:active:bg-orange-900",onClick:o},"返 回 "),e("button",{class:"py-1 px-3 rounded-sm bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900",onClick:n},"确 认 ")])]))}};export{p as default};
