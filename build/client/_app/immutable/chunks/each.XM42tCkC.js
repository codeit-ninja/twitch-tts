import{r as k,e as q,E as L,f as V,g as H,h as N,j as M,k as y,l as j,m as B,n as O,o as K,q as U,t as X,v as z}from"./runtime.CFl1NsvJ.js";import{k as Y,l as x,r as C,m as S,n as R,q as F,u as G,v as T,w as J}from"./render.ghOspvTV.js";function P(){}function Q(e,a,n,r,t,_,h){const E=(n&y)!==0,l=j(n,e);let v=null;Y(e,E);let d,A=null,s=null,g=!1;l.r=c=>{const i=v,u=i.s;u.add(c),c.f(()=>{u.delete(c),u.size===0&&i.e!==null&&(i.d!==null&&(C(i.d),i.d=null),H(i.e),i.e=null)})};const o=()=>{const c={d:null,e:null,s:new Set,p:v},i=k(()=>{const u=l.d;u!==null&&(C(u),l.d=null);let f=l.a;(l.f&y)!==0&&(x===null?(f=J(),l.a.appendChild(f)):f=f.firstChild),_(f),c.d=l.d,l.d=null},l,!0);c.e=i,v=c},p=c=>{const i=c.f,u=(i&y)!==0,f=c.a;h(d,c,f,u,t,i,!0,A)},b=k(()=>{var u,f;const c=a();d=q(c)?c:c==null?[]:Array.from(c),r!==null?A=d.map(r):n&L||d.map(P);const i=d.length;if(x!==null){const m=((f=(u=x)==null?void 0:u[0])==null?void 0:f.data)==="ssr:each_else";m&&i||!m&&!i?(C(x),S(null),g=!0):m&&x.shift()}if(_!==null){if(i===0){if(l.v.length!==0||s===null){p(l),o();return}}else if(l.v.length===0&&v!==null){const m=v,I=m.s;I.size===0?m.d!==null&&(C(m.d),m.d=null):R(I,"out")}}s!==null&&B(s)},l,!1);s=k(p,l,!0),g&&S([]),V(b,()=>{const c=l.f,i=l.a,u=(c&y)!==0;let f=v;for(;f!==null;){const m=f.d;m!==null&&C(m);const I=f.e;I!==null&&H(I),f=f.p}h([],l,i,u,t,c,!1,A),H(s)}),l.e=b}function se(e,a,n,r,t){Q(e,a,n,null,r,t,W)}function W(e,a,n,r,t,_,h){var E=a.v,l=a.s,v=E.length,d=e.length,A=Math.max(v,d),s=0,g,o;if(l.length!==0&&ee(l),d===0)for(g=[],r&&v!==0&&F(n);s<A;)o=E[s++],w(o,l,h,r);else{var p,b=x!==null;if(g=Array(d),b){for(var c=x,i=c[0];s<A;s++){var u=G(i);if(S(u),!u)break;p=e[s],o=D(p,null,s,t,_),g[s]=o,i=u.at(-1).nextSibling.nextSibling}Z(c,i)}for(;s<A;s++)s>=v?(p=e[s],o=D(p,null,s,t,_),g[s]=o,$(o,n,r,null)):s>=d?(o=E[s],w(o,l,h)):(p=e[s],o=E[s],g[s]=o,le(o,p,s,_));b&&x===null&&S([])}a.v=g}function Z(e,a){if(a!==null){var n=e.indexOf(a);n!==-1&&e.length>n+1&&C(e.slice(n))}}function $(e,a,n,r){var t=e.d;return r===null?n?T(t,a,null):T(t,a.parentNode,a):T(t,null,r)}function ee(e){var a=e.length;if(a>0){for(var n=0,r,t;n<a;n++)r=e[n],t=r.r,t!==null&&(r.r=null,w(r,null,!1));e.length=0}}function le(e,a,n,r){const t=e.v;r&N&&M(t,a);const _=e.s,h=(r&O)!==0,E=e.a;_!==null&&r&L&&E!==null&&E(e,_),h?M(e.i,n):e.i=n}function w(e,a,n,r=!1){const t=e.s;if(n&&t!==null){for(let h of t)h.r==="key"&&t.delete(h);if(t.size===0)e.s=null;else{R(t,"out"),a!==null&&a.push(e);return}}const _=e.d;!r&&_!==null&&C(_),H(e.e)}function D(e,a,n,r,t){const h=(t&N)===0?e:t&U?z(e):X(e),E=t&O?z(n):n,l=K(h,E,a),v=k(d=>{r(null,d.v,d.i)},l,!0);return l.e=v,l}export{se as e};