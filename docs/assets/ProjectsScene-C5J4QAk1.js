import{O as ve,P as Le,M as ge,b as ze,S as E,U as Ge,R as Ae,u as B,r,W as U,L as ee,c as Oe,D as Xe,F as H,d as Ve,e as Ne,f as Ye,h as He,i as Ke,_ as xe,k as J,l as Je,m as Ze,B as qe,n as $e,o as q,N as R,V as he,p as We,q as Qe,j as p,a as k,s as et,t as G,E as tt,T as rt,g as ue}from"./index-CQSkRMxs.js";import{C as nt,T as at,a as $,b as fe,c as W,L as de,h as pe}from"./Logo-CSwf8Mdz.js";import{F as me,T as ot}from"./ToggleFocusButton-CDP1Ac0r.js";var it=Object.defineProperty,st=(t,n,e)=>n in t?it(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,Q=(t,n,e)=>(st(t,typeof n!="symbol"?n+"":n,e),e);class A{constructor(n){Q(this,"camera",new ve(-1,1,1,-1,0,1)),Q(this,"geometry",new Le(2,2)),Q(this,"mesh"),this.mesh=new ge(this.geometry,n)}get material(){return this.mesh.material}set material(n){this.mesh.material=n}dispose(){this.mesh.geometry.dispose()}render(n){n.render(this.mesh,this.camera)}}function lt(t,n,e,u){const s=class extends E{constructor(i={}){const f=Object.entries(t);super({uniforms:f.reduce((d,[a,S])=>{const o=Ge.clone({[a]:{value:S}});return{...d,...o}},{}),vertexShader:n,fragmentShader:e}),this.key="",f.forEach(([d])=>Object.defineProperty(this,d,{get:()=>this.uniforms[d].value,set:a=>this.uniforms[d].value=a})),Object.assign(this,i)}};return s.key=ze.generateUUID(),s}const ct=()=>parseInt(Ae.replace(/\D+/g,"")),be=ct();function K(t,n,e){const u=B(c=>c.size),s=B(c=>c.viewport),l=typeof t=="number"?t:u.width*s.dpr,i=typeof n=="number"?n:u.height*s.dpr,f=(typeof t=="number"?e:t)||{},{samples:d=0,depth:a,...S}=f,o=r.useMemo(()=>{const c=new U(l,i,{minFilter:ee,magFilter:ee,type:Oe,...S});return a&&(c.depthTexture=new Xe(l,i,H)),c.samples=d,c},[]);return r.useLayoutEffect(()=>{o.setSize(l,i),d&&(o.samples=d)},[d,o,l,i]),r.useEffect(()=>()=>o.dispose(),[]),o}function ut(t){const n=r.useRef(null),e=r.useRef(!1),u=r.useRef(!1),s=r.useRef(t);return r.useLayoutEffect(()=>void(s.current=t),[t]),r.useEffect(()=>{const l=n.current;if(l){const i=Ve(()=>(e.current=!1,!0)),f=l.onBeforeRender;l.onBeforeRender=()=>e.current=!0;const d=Ne(()=>(e.current!==u.current&&(s.current==null||s.current(u.current=e.current)),!0));return()=>{l.onBeforeRender=f,i(),d()}}},[]),n}const ft=r.forwardRef(({children:t,compute:n,width:e,height:u,samples:s=8,renderPriority:l=0,eventPriority:i=0,frames:f=1/0,stencilBuffer:d=!1,depthBuffer:a=!0,generateMipmaps:S=!1,...o},c)=>{const{size:x,viewport:P}=B(),g=K((e||x.width)*P.dpr,(u||x.height)*P.dpr,{samples:s,stencilBuffer:d,depthBuffer:a,generateMipmaps:S}),[_]=r.useState(()=>new Ye),y=r.useCallback((j,h,m)=>{var M,b;let v=(M=g.texture)==null?void 0:M.__r3f.parent;for(;v&&!(v instanceof He);)v=v.__r3f.parent;if(!v)return!1;m.raycaster.camera||m.events.compute(j,m,(b=m.previousRoot)==null?void 0:b.getState());const[T]=m.raycaster.intersectObject(v);if(!T)return!1;const F=T.uv;if(!F)return!1;h.raycaster.setFromCamera(h.pointer.set(F.x*2-1,F.y*2-1),h.camera)},[]);return r.useImperativeHandle(c,()=>g.texture,[g]),r.createElement(r.Fragment,null,Ke(r.createElement(dt,{renderPriority:l,frames:f,fbo:g},t,r.createElement("group",{onPointerOver:()=>null})),_,{events:{compute:n||y,priority:i}}),r.createElement("primitive",xe({object:g.texture},o)))});function dt({frames:t,renderPriority:n,children:e,fbo:u}){let s=0,l,i,f,d;return J(a=>{(t===1/0||s<t)&&(l=a.gl.autoClear,i=a.gl.xr.enabled,f=a.gl.getRenderTarget(),d=a.gl.xr.isPresenting,a.gl.autoClear=!0,a.gl.xr.enabled=!1,a.gl.xr.isPresenting=!1,a.gl.setRenderTarget(u),a.gl.render(a.scene,a.camera),a.gl.setRenderTarget(f),a.gl.autoClear=l,a.gl.xr.enabled=i,a.gl.xr.isPresenting=d,s++)},n),r.createElement(r.Fragment,null,e)}const pt=lt({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new he},`varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     vUv = uv;
   }`,`uniform sampler2D sdf;
   uniform sampler2D map;
   uniform float blur;
   uniform float size;
   uniform float time;
   uniform vec2 resolution;
   varying vec2 vUv;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;
     vec4 t = texture2D(map, uv);
     float k = blur;
     float d = texture2D(sdf, vUv).r/size;
     float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
     gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
     #include <tonemapping_fragment>
     #include <${be>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),mt=r.forwardRef(({children:t,events:n=void 0,blur:e=0,eventPriority:u=0,renderPriority:s=0,worldUnits:l=!1,resolution:i=512,...f},d)=>{Je({PortalMaterialImpl:pt});const a=r.useRef(null),{scene:S,gl:o,size:c,viewport:x,setEvents:P}=B(),g=K(i,i),[_,y]=r.useState(0);J(()=>{const b=a.current.blend>0?Math.max(1,s):0;_!==b&&y(b)}),r.useEffect(()=>{n!==void 0&&P({enabled:!n})},[n]);const[j,h]=r.useState(!0),m=ut(h);r.useLayoutEffect(()=>{var b;m.current=(b=a.current)==null?void 0:b.__r3f.parent},[]),r.useLayoutEffect(()=>{if(m.current&&e&&a.current.sdf===null){const b=new ge(m.current.geometry,new Ze),v=new qe().setFromBufferAttribute(b.geometry.attributes.position),T=new ve(v.min.x*(1+2/i),v.max.x*(1+2/i),v.max.y*(1+2/i),v.min.y*(1+2/i),.1,1e3);T.position.set(0,0,1),T.lookAt(0,0,0),o.setRenderTarget(g),o.render(b,T);const I=gt(i,i,o)(g.texture),L=new Float32Array(i*i);o.readRenderTargetPixels(I,0,0,i,i,L);let D=1/0;for(let z=0;z<L.length;z++)L[z]<D&&(D=L[z]);D=-D,a.current.size=D,a.current.sdf=I.texture,o.setRenderTarget(null)}},[i,e]),r.useImperativeHandle(d,()=>a.current);const M=r.useCallback((b,v,T)=>{var F;if(!m.current)return!1;if(v.pointer.set(b.offsetX/v.size.width*2-1,-(b.offsetY/v.size.height)*2+1),v.raycaster.setFromCamera(v.pointer,v.camera),((F=a.current)==null?void 0:F.blend)===0){const[I]=v.raycaster.intersectObject(m.current);if(!I)return v.raycaster.camera=void 0,!1}},[]);return r.createElement("portalMaterialImpl",xe({ref:a,blur:e,blend:0,resolution:[c.width*x.dpr,c.height*x.dpr],attach:"material"},f),r.createElement(ft,{attach:"map",frames:j?1/0:0,eventPriority:u,renderPriority:s,compute:M},t,r.createElement(vt,{events:n,rootScene:S,priority:_,material:a,worldUnits:l})))});function vt({events:t=void 0,rootScene:n,material:e,priority:u,worldUnits:s}){const l=B(o=>o.scene),i=B(o=>o.setEvents),f=K(),d=K();r.useLayoutEffect(()=>{l.matrixAutoUpdate=!1},[]),r.useEffect(()=>{t!==void 0&&i({enabled:t})},[t]);const[a,S]=r.useMemo(()=>{const o={value:0};return[new A(new E({uniforms:{a:{value:f.texture},b:{value:d.texture},blend:o},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,fragmentShader:`
          uniform sampler2D a;
          uniform sampler2D b;
          uniform float blend;
          varying vec2 vUv;
          #include <packing>
          void main() {
            vec4 ta = texture2D(a, vUv);
            vec4 tb = texture2D(b, vUv);
            gl_FragColor = mix(tb, ta, blend);
            #include <tonemapping_fragment>
            #include <${be>=154?"colorspace_fragment":"encodings_fragment"}>
          }`})),o]},[]);return J(o=>{var c;let x=e==null||(c=e.current)==null?void 0:c.__r3f.parent;if(x){if(s)l.matrixWorld.identity();else{var P;u&&((P=e.current)==null?void 0:P.blend)===1&&x.updateWorldMatrix(!0,!1),l.matrixWorld.copy(x.matrixWorld)}if(u){var g,_,y;((g=e.current)==null?void 0:g.blend)>0&&((_=e.current)==null?void 0:_.blend)<1?(S.value=e.current.blend,o.gl.setRenderTarget(f),o.gl.render(l,o.camera),o.gl.setRenderTarget(d),o.gl.render(n,o.camera),o.gl.setRenderTarget(null),a.render(o.gl)):((y=e.current)==null?void 0:y.blend)===1&&o.gl.render(l,o.camera)}}},u),r.createElement(r.Fragment,null)}const gt=(t,n,e)=>{let u=new U(t,n,{minFilter:$e,magFilter:ee,type:H,format:q,generateMipmaps:!0}),s=new U(t,n,{minFilter:R,magFilter:R}),l=new U(t,n,{minFilter:R,magFilter:R}),i=new U(t,n,{minFilter:R,magFilter:R}),f=new U(t,n,{minFilter:R,magFilter:R}),d=new U(t,n,{minFilter:R,magFilter:R,type:H,format:q}),a=new U(t,n,{minFilter:R,magFilter:R,type:H,format:q});const S=new A(new E({uniforms:{tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (round(texture2D(tex, vUv).x)));
        }`})),o=new A(new E({uniforms:{tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (1.0 - round(texture2D(tex, vUv).x)));
        }`})),c=new A(new E({uniforms:{tex:{value:null},offset:{value:0},level:{value:0},maxSteps:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform float offset;
        uniform float level;
        uniform float maxSteps;
        #include <packing>
        void main() {
          float closestDist = 9999999.9;
          vec2 closestPos = vec2(0.0);
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 voffset = vUv;
              voffset += vec2(x, y) * vec2(${1/t}, ${1/n}) * offset;
              vec2 pos = unpackRGBATo2Half(texture2D(tex, voffset));
              float dist = distance(pos.xy, vUv);
              if(pos.x != 0.0 && pos.y != 0.0 && dist < closestDist) {
                closestDist = dist;
                closestPos = pos;
              }
            }
          }
          gl_FragColor = pack2HalfToRGBA(closestPos);
        }`})),x=new A(new E({uniforms:{tex:{value:null},size:{value:new he(t,n)}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform vec2 size;
        #include <packing>
        void main() {
          gl_FragColor = vec4(distance(size * unpackRGBATo2Half(texture2D(tex, vUv)), size * vUv), 0.0, 0.0, 0.0);
        }`})),P=new A(new E({uniforms:{inside:{value:a.texture},outside:{value:d.texture},tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D inside;
        uniform sampler2D outside;
        uniform sampler2D tex;
        #include <packing>
        void main() {
          float i = texture2D(inside, vUv).x;
          float o =texture2D(outside, vUv).x;
          if (texture2D(tex, vUv).x == 0.0) {
            gl_FragColor = vec4(o, 0.0, 0.0, 0.0);
          } else {
            gl_FragColor = vec4(-i, 0.0, 0.0, 0.0);
          }
        }`}));return g=>{let _=u;g.minFilter=R,g.magFilter=R,S.material.uniforms.tex.value=g,e.setRenderTarget(s),S.render(e);const y=Math.ceil(Math.log(Math.max(t,n))/Math.log(2));let j=s,h=null;for(let m=0;m<y;m++){const M=Math.pow(2,y-m-1);h=j===s?i:s,c.material.uniforms.level.value=m,c.material.uniforms.maxSteps.value=y,c.material.uniforms.offset.value=M,c.material.uniforms.tex.value=j.texture,e.setRenderTarget(h),c.render(e),j=h}e.setRenderTarget(d),x.material.uniforms.tex.value=h.texture,x.render(e),o.material.uniforms.tex.value=g,e.setRenderTarget(l),o.render(e),j=l;for(let m=0;m<y;m++){const M=Math.pow(2,y-m-1);h=j===l?f:l,c.material.uniforms.level.value=m,c.material.uniforms.maxSteps.value=y,c.material.uniforms.offset.value=M,c.material.uniforms.tex.value=j.texture,e.setRenderTarget(h),c.render(e),j=h}return e.setRenderTarget(a),x.material.uniforms.tex.value=h.texture,x.render(e),e.setRenderTarget(_),P.material.uniforms.tex.value=g,P.render(e),e.setRenderTarget(null),_}};function xt({description:t,...n}){const[e]=We(Qe,["/matcaps/greyClay.png"]),u=ht(t);return p.jsxs("mesh",{...n,children:[p.jsx("boxGeometry",{args:[.1,.1,.1]},"CenteringBoxGeom"),p.jsx("meshBasicMaterial",{color:"#FFFFFF",visible:!1},"CenteringBoxMat"),p.jsx(nt,{children:p.jsxs(at,{scale:.05,curveSegments:5,height:.5,lineHeight:.75,letterSpacing:0,size:1,font:"/fonts/Inter_Bold.json",children:[u,p.jsx("meshMatcapMaterial",{matcap:e})]})},u.slice(0,5))]})}function ht(t,n=45){return typeof t!="string"?"":t.split(" ").reduce((e,u)=>{const s=e[e.length-1];return s&&(s+" "+u).length<=n?e[e.length-1]=s+" "+u:e.push(u),e},[]).join(`
`)}const wt=r.forwardRef((t,n)=>{const e=k("/models/computer_monitor_lowpoly/monitor.glb"),u=k("/models/teenyBoard/cartoon_mini_keyboard.glb"),s=k("models/plant/low_poly_style_plant.glb"),{nodes:l}=k("/aobox-transformed.glb"),[i]=r.useState(["#ae2012","#005f73","#4f772d","#43aa8b","#564592","#9c4724"]),[f]=r.useState([{name:"EliParker.dev",siteReference:"http://eliparker.dev/",description:"3-D portfolio website that showcases my projects and skills. Uses React Three Fiber and React Three Drei.",github:"https://github.com/Eli-Parker/eli-parker.github.io",chiclets:["React","Three.js","JavaScript","WebGL","React-Three-Fiber","UI/UX Design"],id:1},{name:"RideHermes.app",siteReference:"https://eliparker.dev/ride-hermes-samples/",description:"PEV focused ride tracking Application with 100k+ users. I do a lot of the frontend development and implement various features.",github:"",chiclets:["Flutter","Dart","UI/UX Design","App Development"],id:2},{name:"Spreadsheet",siteReference:"https://eliparker.dev/CS3500SpreadsheetGUI/",description:"Full Stack spreadsheet application with a Blazor frontend and C# backend. Implements a custom formula language with support for recursion, cell references, and built-in formulas.",github:"",chiclets:["C#","Blazor","UI/UX Design","Fullstack Development"],id:2},{name:"University Calendar Generator",siteReference:"http://eliparker.dev/UniversityOfUtahCalendarGenerator",description:"Scrapes the University of Utah's academic calendar website and dynamically generates an iCal file, based on user selection.",github:"https://github.com/Eli-Parker/UniversityOfUtahCalendarGenerator",chiclets:["C#","Web Scraping","HTML","JavaScript"],id:3},{name:"Text Generation Algorithm",siteReference:"",description:"Java program that dynamically generates text based on a given input text. Based on Markov Chains. (Code is available to employers upon request, but cannot be public.)",github:"",chiclets:["Java","Algorithms","Data Structures","Machine Learning"],id:4},{name:"Galaxy Generator",siteReference:"http://eliparker.dev/Galaxy-Generator",description:"Three-js project that uses particles and complex math to generate an interactive galaxy.",github:"https://github.com/Eli-Parker/Galaxy-Generator",chiclets:["JavaScript","Three.js","WebGL","Algorithms"],id:5},{name:"React Site",siteReference:"http://eliparker.dev/react-site/",description:"A small portfolio website to get things started! Built with React and hosted on GitHub Pages.",github:"https://github.com/Eli-Parker/react-site",chiclets:["React","JavaScript","Tailwind CSS","HTML"],id:6}]),[d,a]=r.useState(!1),[S,o]=r.useState(!1),c=r.useRef(),{camera:x}=B(),P=r.useRef(),g=r.useRef();J(C=>{c.current.visible&&(P.current&&(P.current.position.y=.01*Math.sin(C.clock.getElapsedTime()*1.8)-.35),g.current&&(g.current.position.y=.01*Math.cos(C.clock.getElapsedTime()*1.75)-.35))}),r.useImperativeHandle(n,()=>({scale:c.current.scale,toggleAnimateOut:()=>{bt(c,x,d,a,{onOpenStart:()=>o(!0),onCloseComplete:()=>o(!1)})},toggleOut:()=>{const C=c.current.scale.x===0;C&&o(!0),yt(c,d,a),C||o(!1)}}));const{sp_x:_,sp_y:y,sp_z:j,sr_x:h,sr_y:m,sr_z:M,MonitorX:b,MonitorY:v,scale:T,portalX:F,portalY:I,portalZ:L,portalScale:D,KbrdX:z,KbrdY:ye,KbrdZ:Se,KbrdScl:Pe,PlntX:Re,PlntY:je,PlntZ:we,PlntScl:_e}=et("Projects Scene",{"Scene Position":G({sp_x:0,sp_y:-.15,sp_z:-.2},{collapsed:!0}),"Scene rotation":G({sr_x:-.1177,sr_y:-.0544,sr_z:-0},{collapsed:!0}),"Monitor Ctrls":G({MonitorX:{value:0,step:.01},MonitorY:{value:-.28,step:.01},scale:{value:.5,step:.01}},{collapsed:!0}),"teenyBoard Ctrls":G({KbrdX:{value:0,step:.01},KbrdY:{value:-.3,step:.01},KbrdZ:{value:.57,step:.01},KbrdScl:{value:.0036,step:1e-4}},{collapsed:!0}),"Plant Ctrls":G({PlntX:{value:-1.19,step:.01},PlntY:{value:-.31,step:.01},PlntZ:{value:-.07,step:.01},PlntScl:{value:.00106,step:1e-5}},{collapsed:!0}),"Portal Ctrls":G({portalX:{value:0,step:.01},portalY:{value:1.45,step:.01},portalZ:{value:-.22,step:.001},portalScale:{value:1.89,step:.01}},{collapsed:!0}),projectNum:{value:0,min:0,max:5,step:1,onChange:C=>{ne(C)}}},{collapsed:!0}),[Me,te]=r.useState(!1);async function re(C){if(Me)return;te(!0);const ce=f.length;let Z=C%ce;Z===-1&&(Z=ce-1),ne(Z),await new Promise(Ie=>setTimeout(Ie,500)),te(!1)}const[w,ne]=r.useState(0),[Te,Fe]=r.useState(f[w].name),[Ce,Ue]=r.useState(f[w].description),[X,ke]=r.useState(f[w].siteReference),[O,De]=r.useState(f[w].github);r.useEffect(()=>{Fe(f[w].name),Ue(f[w].description),ke(f[w].siteReference),De(f[w].github)},[w]);const[Ee,ae]=r.useState(-.3),[Be,oe]=r.useState(.3);r.useEffect(()=>{O!==""&&X!==""?(ae(-.3),oe(.3)):O!==""?ae(0):X!==""&&oe(0)},[O]);const[ie,se]=r.useState(!1),[le,V]=r.useState("start"),N=r.useRef(),Y=r.useRef();return r.useEffect(()=>{switch(le){case"none":$([Y,N]);break;case"left":$([N]),fe([Y]);break;case"right":$([Y]),fe([N])}},[le]),p.jsx("group",{ref:c,scale:0,visible:!1,position:[_,y,j],rotation:[h,Math.PI-m,M],children:p.jsxs(me,{rotationIntensity:.4,floatIntensity:.1,children:[p.jsx("primitive",{object:e.scene,position:[b,v,0],scale:T,textAlign:"center",children:S&&p.jsxs("mesh",{position:[F,I,L],scale:D,children:[p.jsx("planeGeometry",{args:[2,1]},"monitorPortalPlane"),p.jsxs(mt,{children:[p.jsx("ambientLight",{intensity:.5},"monitorPortalAmbLi"),p.jsx(tt,{preset:"city"},"monitorPortalEnv"),p.jsxs("mesh",{castShadow:!0,receiveShadow:!0,"rotation-y":-Math.PI*.5,geometry:l.Cube.geometry,"scale-y":.5,"scale-x":.5,children:[p.jsx("meshStandardMaterial",{color:i[w%6]},"innerBoxMat"),p.jsx("spotLight",{castShadow:!0,color:i[w%6],intensity:2,position:[10,10,10],angle:.15,penumbra:1,"shadow-normalBias":.05,"shadow-bias":1e-4},"innerBoxSpotLight")]},"innerBox"),p.jsx(W,{title:Te,position:[0,.35,-.1]}),p.jsx(xt,{position:[0,0,-.25],description:Ce}),p.jsx(W,{ref:Y,title:"←",useNormal:!0,position:[-.9,0,-.2],onClick:()=>{re(w-1)},onPointerEnter:()=>V("left"),onPointerLeave:()=>V("none")}),p.jsx(W,{ref:N,title:"→",useNormal:!0,position:[.9,0,-.2],onClick:()=>{re(w+1)},onPointerEnter:()=>V("right"),onPointerLeave:()=>V("none")}),p.jsx(de,{ref:P,kind:"github",position:[Ee,-.35,-.2],rotation:[0,Math.PI/2,0],scale:.3,visible:O!=="",onClick:()=>pe(O,ie,se)},"githubRef"),p.jsx(de,{ref:g,kind:"website",position:[Be,-.35,-.2],rotation:[0,Math.PI/2,0],scale:.3,visible:X!=="",onClick:()=>pe(X,ie,se)},"siteref")]},"monitorPortalMat")]},"monitorPortal")},"projectMonitor"),p.jsx(rt,{font:"./fonts/anek-bangla-v5-latin-600.woff",fontSize:.3,position:[1.4,.5,.4],"rotation-y":-1,"rotation-z":0,maxWidth:2,lineHeight:1,color:"#87ceeb",children:"Projects"}),p.jsx(ot,{scale:.5,rotation:[-.3,0,0],position:[0,-.23,-.1],page:"projects"}),p.jsx("primitive",{object:s.scene,position:[Re,je,we],scale:_e},"projectPlant"),p.jsx(me,{rotationIntensity:.4,floatIntensity:0,children:p.jsx("primitive",{object:u.scene,position:[z,ye,Se],scale:Pe},"projectTeenyBoard")})]})},"FullProjectScene")});k.preload("/models/computer_monitor_lowpoly/monitor.glb");k.preload("/models/teenyBoard/cartoon_mini_keyboard.glb");k.preload("models/plant/low_poly_style_plant.glb");k.preload("/aobox-transformed.glb");function bt(t,n,e,u,s={}){if(e)return;u(!0),t.current.visible=!0;const l=t.current.scale.x===0,i=l?{x:2,y:2,z:2}:{x:0,y:0,z:0},f=l?-.1575:Math.PI-.1575;l&&s.onOpenStart&&s.onOpenStart(),ue.to(t.current.scale,{duration:.5,x:i.x,y:i.y,z:i.z,ease:"power2.inOut",onUpdate:()=>{n.updateProjectionMatrix()},onComplete:()=>{l||(t.current.visible=!1,s.onCloseComplete&&s.onCloseComplete()),u(!1)}}),ue.to(t.current.rotation,{duration:.5,y:f,ease:"power2.inOut",onUpdate:()=>{n.updateProjectionMatrix()},onComplete:()=>{u(!1)}})}function yt(t,n,e){n||(e(!0),t.current.visible=!0,t.current.scale.x>0?(t.current.scale.x=0,t.current.scale.y=0,t.current.scale.z=0,t.current.visible=!1):(t.current.scale.x=2,t.current.scale.y=2,t.current.scale.z=2),e(!1))}export{wt as default};
//# sourceMappingURL=ProjectsScene-C5J4QAk1.js.map
