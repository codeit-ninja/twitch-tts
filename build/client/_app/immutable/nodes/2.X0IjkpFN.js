import"../chunks/disclose-version.bJ1TNjgf.js";import{u as b,i as x,r as y,p as d,a as u,s as C}from"../chunks/runtime.CFl1NsvJ.js";import{h as m,x as v,j as h,a as e,s as t,d as _,y as T,e as k,$ as S}from"../chunks/render.ghOspvTV.js";import{u as w,a as U,b as I}from"../chunks/store.Z4QFliSE.js";import{p as j}from"../chunks/stores.hd1kWRYm.js";var D=_('<ul class="nav flex-column gap-3"><li class="nav-item"><a class="nav-link" href="/_/dashboard">Dashboard</a></li> <li class="nav-item"><a class="nav-link" href="/_/text-to-speech">Text-to-speech</a></li> <li class="nav-item"><a class="nav-link" href="/_/chat-overlay">Chat overlay</a></li></ul>');function F(i,a){u(a,!1);const r={};b(r);const s=()=>C(j,"$page",r);x();var l=h(i,!0,D),o=e(l),n=e(o),c=t(t(o,!0)),f=e(c),g=t(t(c,!0)),p=e(g);y(()=>{v(n,"active",s().route.id==="/_/dashboard"),v(f,"active",s().route.id==="/_/text-to-speech"),v(p,"active",s().route.id==="/_/chat-overlay")}),m(i,l),d()}var H=_('<div class="site"><div class="site--menu"><!></div> <main class="site--main"><!></main></div>');function B(i,a){u(a,!0),w.set(a.data.credentials),U.set(a.data.ttsConfig),I.set({...a.data.user,twitchUserId:a.data.twitchUserId});var r=h(i,!0,H);T(c=>{S.title="FkNoobsCoH - Twitch TTS"});var s=e(r),l=e(s),o=t(t(s,!0)),n=e(o);F(l,{}),k(n,a.children,{},null),m(i,r),d()}export{B as component};