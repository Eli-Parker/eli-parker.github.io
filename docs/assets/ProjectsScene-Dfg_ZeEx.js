import{O as ve,P as Be,M as ge,b as Ie,S as D,U as Le,R as ze,u as E,r,W as U,L as ee,c as Ge,D as Ae,F as H,d as Oe,e as Xe,f as Ve,h as Ne,i as Ye,_ as xe,k as J,l as He,m as Ke,B as Je,n as Ze,o as q,N as P,V as he,p as qe,q as $e,j as m,a as C,s as We,t as G,E as Qe,T as et,g as ue}from"./index-1LEvmgcf.js";import{C as tt,T as rt,a as $,b as fe,c as W,L as de,h as me}from"./Logo-CcE6bVhE.js";import{F as pe,T as nt}from"./ToggleFocusButton-nn8MbwB9.js";var at=Object.defineProperty,ot=(e,n,t)=>n in e?at(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,Q=(e,n,t)=>(ot(e,typeof n!="symbol"?n+"":n,t),t);class A{constructor(n){Q(this,"camera",new ve(-1,1,1,-1,0,1)),Q(this,"geometry",new Be(2,2)),Q(this,"mesh"),this.mesh=new ge(this.geometry,n)}get material(){return this.mesh.material}set material(n){this.mesh.material=n}dispose(){this.mesh.geometry.dispose()}render(n){n.render(this.mesh,this.camera)}}function it(e,n,t,c){const i=class extends D{constructor(s={}){const f=Object.entries(e);super({uniforms:f.reduce((d,[a,x])=>{const o=Le.clone({[a]:{value:x}});return{...d,...o}},{}),vertexShader:n,fragmentShader:t}),this.key="",f.forEach(([d])=>Object.defineProperty(this,d,{get:()=>this.uniforms[d].value,set:a=>this.uniforms[d].value=a})),Object.assign(this,s)}};return i.key=Ie.generateUUID(),i}const st=()=>parseInt(ze.replace(/\D+/g,"")),be=st();function K(e,n,t){const c=E(u=>u.size),i=E(u=>u.viewport),l=typeof e=="number"?e:c.width*i.dpr,s=typeof n=="number"?n:c.height*i.dpr,f=(typeof e=="number"?t:e)||{},{samples:d=0,depth:a,...x}=f,o=r.useMemo(()=>{const u=new U(l,s,{minFilter:ee,magFilter:ee,type:Ge,...x});return a&&(u.depthTexture=new Ae(l,s,H)),u.samples=d,u},[]);return r.useLayoutEffect(()=>{o.setSize(l,s),d&&(o.samples=d)},[d,o,l,s]),r.useEffect(()=>()=>o.dispose(),[]),o}function lt(e){const n=r.useRef(null),t=r.useRef(!1),c=r.useRef(!1),i=r.useRef(e);return r.useLayoutEffect(()=>void(i.current=e),[e]),r.useEffect(()=>{const l=n.current;if(l){const s=Oe(()=>(t.current=!1,!0)),f=l.onBeforeRender;l.onBeforeRender=()=>t.current=!0;const d=Xe(()=>(t.current!==c.current&&(i.current==null||i.current(c.current=t.current)),!0));return()=>{l.onBeforeRender=f,s(),d()}}},[]),n}const ct=r.forwardRef(({children:e,compute:n,width:t,height:c,samples:i=8,renderPriority:l=0,eventPriority:s=0,frames:f=1/0,stencilBuffer:d=!1,depthBuffer:a=!0,generateMipmaps:x=!1,...o},u)=>{const{size:h,viewport:w}=E(),g=K((t||h.width)*w.dpr,(c||h.height)*w.dpr,{samples:i,stencilBuffer:d,depthBuffer:a,generateMipmaps:x}),[_]=r.useState(()=>new Ve),S=r.useCallback((R,b,p)=>{var M,y;let v=(M=g.texture)==null?void 0:M.__r3f.parent;for(;v&&!(v instanceof Ne);)v=v.__r3f.parent;if(!v)return!1;p.raycaster.camera||p.events.compute(R,p,(y=p.previousRoot)==null?void 0:y.getState());const[T]=p.raycaster.intersectObject(v);if(!T)return!1;const F=T.uv;if(!F)return!1;b.raycaster.setFromCamera(b.pointer.set(F.x*2-1,F.y*2-1),b.camera)},[]);return r.useImperativeHandle(u,()=>g.texture,[g]),r.createElement(r.Fragment,null,Ye(r.createElement(ut,{renderPriority:l,frames:f,fbo:g},e,r.createElement("group",{onPointerOver:()=>null})),_,{events:{compute:n||S,priority:s}}),r.createElement("primitive",xe({object:g.texture},o)))});function ut({frames:e,renderPriority:n,children:t,fbo:c}){let i=0,l,s,f,d;return J(a=>{(e===1/0||i<e)&&(l=a.gl.autoClear,s=a.gl.xr.enabled,f=a.gl.getRenderTarget(),d=a.gl.xr.isPresenting,a.gl.autoClear=!0,a.gl.xr.enabled=!1,a.gl.xr.isPresenting=!1,a.gl.setRenderTarget(c),a.gl.render(a.scene,a.camera),a.gl.setRenderTarget(f),a.gl.autoClear=l,a.gl.xr.enabled=s,a.gl.xr.isPresenting=d,i++)},n),r.createElement(r.Fragment,null,t)}const ft=it({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new he},`varying vec2 vUv;
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
   }`),dt=r.forwardRef(({children:e,events:n=void 0,blur:t=0,eventPriority:c=0,renderPriority:i=0,worldUnits:l=!1,resolution:s=512,...f},d)=>{He({PortalMaterialImpl:ft});const a=r.useRef(null),{scene:x,gl:o,size:u,viewport:h,setEvents:w}=E(),g=K(s,s),[_,S]=r.useState(0);J(()=>{const y=a.current.blend>0?Math.max(1,i):0;_!==y&&S(y)}),r.useEffect(()=>{n!==void 0&&w({enabled:!n})},[n]);const[R,b]=r.useState(!0),p=lt(b);r.useLayoutEffect(()=>{var y;p.current=(y=a.current)==null?void 0:y.__r3f.parent},[]),r.useLayoutEffect(()=>{if(p.current&&t&&a.current.sdf===null){const y=new ge(p.current.geometry,new Ke),v=new Je().setFromBufferAttribute(y.geometry.attributes.position),T=new ve(v.min.x*(1+2/s),v.max.x*(1+2/s),v.max.y*(1+2/s),v.min.y*(1+2/s),.1,1e3);T.position.set(0,0,1),T.lookAt(0,0,0),o.setRenderTarget(g),o.render(y,T);const B=pt(s,s,o)(g.texture),I=new Float32Array(s*s);o.readRenderTargetPixels(B,0,0,s,s,I);let k=1/0;for(let L=0;L<I.length;L++)I[L]<k&&(k=I[L]);k=-k,a.current.size=k,a.current.sdf=B.texture,o.setRenderTarget(null)}},[s,t]),r.useImperativeHandle(d,()=>a.current);const M=r.useCallback((y,v,T)=>{var F;if(!p.current)return!1;if(v.pointer.set(y.offsetX/v.size.width*2-1,-(y.offsetY/v.size.height)*2+1),v.raycaster.setFromCamera(v.pointer,v.camera),((F=a.current)==null?void 0:F.blend)===0){const[B]=v.raycaster.intersectObject(p.current);if(!B)return v.raycaster.camera=void 0,!1}},[]);return r.createElement("portalMaterialImpl",xe({ref:a,blur:t,blend:0,resolution:[u.width*h.dpr,u.height*h.dpr],attach:"material"},f),r.createElement(ct,{attach:"map",frames:R?1/0:0,eventPriority:c,renderPriority:i,compute:M},e,r.createElement(mt,{events:n,rootScene:x,priority:_,material:a,worldUnits:l})))});function mt({events:e=void 0,rootScene:n,material:t,priority:c,worldUnits:i}){const l=E(o=>o.scene),s=E(o=>o.setEvents),f=K(),d=K();r.useLayoutEffect(()=>{l.matrixAutoUpdate=!1},[]),r.useEffect(()=>{e!==void 0&&s({enabled:e})},[e]);const[a,x]=r.useMemo(()=>{const o={value:0};return[new A(new D({uniforms:{a:{value:f.texture},b:{value:d.texture},blend:o},vertexShader:`
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
          }`})),o]},[]);return J(o=>{var u;let h=t==null||(u=t.current)==null?void 0:u.__r3f.parent;if(h){if(i)l.matrixWorld.identity();else{var w;c&&((w=t.current)==null?void 0:w.blend)===1&&h.updateWorldMatrix(!0,!1),l.matrixWorld.copy(h.matrixWorld)}if(c){var g,_,S;((g=t.current)==null?void 0:g.blend)>0&&((_=t.current)==null?void 0:_.blend)<1?(x.value=t.current.blend,o.gl.setRenderTarget(f),o.gl.render(l,o.camera),o.gl.setRenderTarget(d),o.gl.render(n,o.camera),o.gl.setRenderTarget(null),a.render(o.gl)):((S=t.current)==null?void 0:S.blend)===1&&o.gl.render(l,o.camera)}}},c),r.createElement(r.Fragment,null)}const pt=(e,n,t)=>{let c=new U(e,n,{minFilter:Ze,magFilter:ee,type:H,format:q,generateMipmaps:!0}),i=new U(e,n,{minFilter:P,magFilter:P}),l=new U(e,n,{minFilter:P,magFilter:P}),s=new U(e,n,{minFilter:P,magFilter:P}),f=new U(e,n,{minFilter:P,magFilter:P}),d=new U(e,n,{minFilter:P,magFilter:P,type:H,format:q}),a=new U(e,n,{minFilter:P,magFilter:P,type:H,format:q});const x=new A(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),o=new A(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),u=new A(new D({uniforms:{tex:{value:null},offset:{value:0},level:{value:0},maxSteps:{value:0}},vertexShader:`
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
              voffset += vec2(x, y) * vec2(${1/e}, ${1/n}) * offset;
              vec2 pos = unpackRGBATo2Half(texture2D(tex, voffset));
              float dist = distance(pos.xy, vUv);
              if(pos.x != 0.0 && pos.y != 0.0 && dist < closestDist) {
                closestDist = dist;
                closestPos = pos;
              }
            }
          }
          gl_FragColor = pack2HalfToRGBA(closestPos);
        }`})),h=new A(new D({uniforms:{tex:{value:null},size:{value:new he(e,n)}},vertexShader:`
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
        }`})),w=new A(new D({uniforms:{inside:{value:a.texture},outside:{value:d.texture},tex:{value:null}},vertexShader:`
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
        }`}));return g=>{let _=c;g.minFilter=P,g.magFilter=P,x.material.uniforms.tex.value=g,t.setRenderTarget(i),x.render(t);const S=Math.ceil(Math.log(Math.max(e,n))/Math.log(2));let R=i,b=null;for(let p=0;p<S;p++){const M=Math.pow(2,S-p-1);b=R===i?s:i,u.material.uniforms.level.value=p,u.material.uniforms.maxSteps.value=S,u.material.uniforms.offset.value=M,u.material.uniforms.tex.value=R.texture,t.setRenderTarget(b),u.render(t),R=b}t.setRenderTarget(d),h.material.uniforms.tex.value=b.texture,h.render(t),o.material.uniforms.tex.value=g,t.setRenderTarget(l),o.render(t),R=l;for(let p=0;p<S;p++){const M=Math.pow(2,S-p-1);b=R===l?f:l,u.material.uniforms.level.value=p,u.material.uniforms.maxSteps.value=S,u.material.uniforms.offset.value=M,u.material.uniforms.tex.value=R.texture,t.setRenderTarget(b),u.render(t),R=b}return t.setRenderTarget(a),h.material.uniforms.tex.value=b.texture,h.render(t),t.setRenderTarget(_),w.material.uniforms.tex.value=g,w.render(t),t.setRenderTarget(null),_}};function vt({description:e,...n}){const[t]=qe($e,["/matcaps/greyClay.png"]),c=gt(e);return m.jsxs("mesh",{...n,children:[m.jsx("boxGeometry",{args:[.1,.1,.1]},"CenteringBoxGeom"),m.jsx("meshBasicMaterial",{color:"#FFFFFF",visible:!1},"CenteringBoxMat"),m.jsx(tt,{children:m.jsxs(rt,{scale:.05,curveSegments:5,height:.5,lineHeight:.75,letterSpacing:0,size:1,font:"/fonts/Inter_Bold.json",children:[c,m.jsx("meshMatcapMaterial",{matcap:t})]})},c.slice(0,5))]})}function gt(e,n=45){return typeof e!="string"?"":e.split(" ").reduce((t,c)=>{const i=t[t.length-1];return i&&(i+" "+c).length<=n?t[t.length-1]=i+" "+c:t.push(c),t},[]).join(`
`)}const Rt=r.forwardRef((e,n)=>{const t=C("/models/computer_monitor_lowpoly/monitor.glb"),c=C("/models/teenyBoard/cartoon_mini_keyboard.glb"),i=C("models/plant/low_poly_style_plant.glb"),{nodes:l}=C("/aobox-transformed.glb"),[s]=r.useState(["#ae2012","#005f73","#4f772d","#43aa8b","#564592","#9c4724"]),[f]=r.useState([{name:"EliParker.dev",siteReference:"http://eliparker.dev/",description:"3-D portfolio website that showcases my projects and skills. Uses React Three Fiber and React Three Drei.",github:"https://github.com/Eli-Parker/eli-parker.github.io",chiclets:["React","Three.js","JavaScript","WebGL","React-Three-Fiber","UI/UX Design"],id:1},{name:"RideHermes.app",siteReference:"https://eliparker.dev/ride-hermes-samples/",description:"PEV focused ride tracking Application with 100k+ users. I do a lot of the frontend development and implement various features.",github:"",chiclets:["Flutter","Dart","UI/UX Design","App Development"],id:2},{name:"Spreadsheet",siteReference:"https://eliparker.dev/CS3500SpreadsheetGUI/",description:"Full Stack spreadsheet application with a Blazor frontend and C# backend. Implements a custom formula language with support for recursion, cell references, and built-in formulas.",github:"",chiclets:["C#","Blazor","UI/UX Design","Fullstack Development"],id:2},{name:"University Calendar Generator",siteReference:"http://eliparker.dev/UniversityOfUtahCalendarGenerator",description:"Scrapes the University of Utah's academic calendar website and dynamically generates an iCal file, based on user selection.",github:"https://github.com/Eli-Parker/UniversityOfUtahCalendarGenerator",chiclets:["C#","Web Scraping","HTML","JavaScript"],id:3},{name:"Text Generation Algorithm",siteReference:"",description:"Java program that dynamically generates text based on a given input text. Based on Markov Chains. (Code is available to employers upon request, but cannot be public.)",github:"",chiclets:["Java","Algorithms","Data Structures","Machine Learning"],id:4},{name:"Galaxy Generator",siteReference:"http://eliparker.dev/Galaxy-Generator",description:"Three-js project that uses particles and complex math to generate an interactive galaxy.",github:"https://github.com/Eli-Parker/Galaxy-Generator",chiclets:["JavaScript","Three.js","WebGL","Algorithms"],id:5},{name:"React Site",siteReference:"http://eliparker.dev/react-site/",description:"A small portfolio website to get things started! Built with React and hosted on GitHub Pages.",github:"https://github.com/Eli-Parker/react-site",chiclets:["React","JavaScript","Tailwind CSS","HTML"],id:6}]),[d,a]=r.useState(!1),x=r.useRef(),{camera:o}=E(),u=r.useRef(),h=r.useRef();J(z=>{x.current.visible&&(u.current&&(u.current.position.y=.01*Math.sin(z.clock.getElapsedTime()*1.8)-.35),h.current&&(h.current.position.y=.01*Math.cos(z.clock.getElapsedTime()*1.75)-.35))}),r.useImperativeHandle(n,()=>({scale:x.current.scale,toggleAnimateOut:()=>{xt(x,o,d,a)},toggleOut:()=>{ht(x,d,a)}}));const{sp_x:w,sp_y:g,sp_z:_,sr_x:S,sr_y:R,sr_z:b,MonitorX:p,MonitorY:M,scale:y,portalX:v,portalY:T,portalZ:F,portalScale:B,KbrdX:I,KbrdY:k,KbrdZ:L,KbrdScl:ye,PlntX:Se,PlntY:Pe,PlntZ:Re,PlntScl:je}=We("Projects Scene",{"Scene Position":G({sp_x:0,sp_y:-.15,sp_z:-.2},{collapsed:!0}),"Scene rotation":G({sr_x:-.1177,sr_y:-.0544,sr_z:-0},{collapsed:!0}),"Monitor Ctrls":G({MonitorX:{value:0,step:.01},MonitorY:{value:-.28,step:.01},scale:{value:.5,step:.01}},{collapsed:!0}),"teenyBoard Ctrls":G({KbrdX:{value:0,step:.01},KbrdY:{value:-.3,step:.01},KbrdZ:{value:.57,step:.01},KbrdScl:{value:.0036,step:1e-4}},{collapsed:!0}),"Plant Ctrls":G({PlntX:{value:-1.19,step:.01},PlntY:{value:-.31,step:.01},PlntZ:{value:-.07,step:.01},PlntScl:{value:.00106,step:1e-5}},{collapsed:!0}),"Portal Ctrls":G({portalX:{value:0,step:.01},portalY:{value:1.45,step:.01},portalZ:{value:-.22,step:.001},portalScale:{value:1.89,step:.01}},{collapsed:!0}),projectNum:{value:0,min:0,max:5,step:1,onChange:z=>{ne(z)}}},{collapsed:!0}),[we,te]=r.useState(!1);async function re(z){if(we)return;te(!0);const ce=f.length;let Z=z%ce;Z===-1&&(Z=ce-1),ne(Z),await new Promise(Ee=>setTimeout(Ee,500)),te(!1)}const[j,ne]=r.useState(0),[_e,Me]=r.useState(f[j].name),[Te,Fe]=r.useState(f[j].description),[X,Ue]=r.useState(f[j].siteReference),[O,Ce]=r.useState(f[j].github);r.useEffect(()=>{Me(f[j].name),Fe(f[j].description),Ue(f[j].siteReference),Ce(f[j].github)},[j]);const[ke,ae]=r.useState(-.3),[De,oe]=r.useState(.3);r.useEffect(()=>{O!==""&&X!==""?(ae(-.3),oe(.3)):O!==""?ae(0):X!==""&&oe(0)},[O]);const[ie,se]=r.useState(!1),[le,V]=r.useState("start"),N=r.useRef(),Y=r.useRef();return r.useEffect(()=>{switch(le){case"none":$([Y,N]);break;case"left":$([N]),fe([Y]);break;case"right":$([Y]),fe([N])}},[le]),m.jsx("group",{ref:x,scale:0,visible:!1,position:[w,g,_],rotation:[S,Math.PI-R,b],children:m.jsxs(pe,{rotationIntensity:.4,floatIntensity:.1,children:[m.jsx("primitive",{object:t.scene,position:[p,M,0],scale:y,textAlign:"center",children:m.jsxs("mesh",{position:[v,T,F],scale:B,children:[m.jsx("planeGeometry",{args:[2,1]},"monitorPortalPlane"),m.jsxs(dt,{children:[m.jsx("ambientLight",{intensity:.5},"monitorPortalAmbLi"),m.jsx(Qe,{preset:"city"},"monitorPortalEnv"),m.jsxs("mesh",{castShadow:!0,receiveShadow:!0,"rotation-y":-Math.PI*.5,geometry:l.Cube.geometry,"scale-y":.5,"scale-x":.5,children:[m.jsx("meshStandardMaterial",{color:s[j%6]},"innerBoxMat"),m.jsx("spotLight",{castShadow:!0,color:s[j%6],intensity:2,position:[10,10,10],angle:.15,penumbra:1,"shadow-normalBias":.05,"shadow-bias":1e-4},"innerBoxSpotLight")]},"innerBox"),m.jsx(W,{title:_e,position:[0,.35,-.1]}),m.jsx(vt,{position:[0,0,-.25],description:Te}),m.jsx(W,{ref:Y,title:"←",useNormal:!0,position:[-.9,0,-.2],onClick:()=>{re(j-1)},onPointerEnter:()=>V("left"),onPointerLeave:()=>V("none")}),m.jsx(W,{ref:N,title:"→",useNormal:!0,position:[.9,0,-.2],onClick:()=>{re(j+1)},onPointerEnter:()=>V("right"),onPointerLeave:()=>V("none")}),m.jsx(de,{ref:u,kind:"github",position:[ke,-.35,-.2],rotation:[0,Math.PI/2,0],scale:.3,visible:O!=="",onClick:()=>me(O,ie,se)},"githubRef"),m.jsx(de,{ref:h,kind:"website",position:[De,-.35,-.2],rotation:[0,Math.PI/2,0],scale:.3,visible:X!=="",onClick:()=>me(X,ie,se)},"siteref")]},"monitorPortalMat")]},"monitorPortal")},"projectMonitor"),m.jsx(et,{font:"./fonts/anek-bangla-v5-latin-600.woff",fontSize:.3,position:[1.4,.5,.4],"rotation-y":-1,"rotation-z":0,maxWidth:2,lineHeight:1,color:"#87ceeb",children:"Projects"}),m.jsx(nt,{scale:.5,rotation:[-.3,0,0],position:[0,-.23,-.1],page:"projects"}),m.jsx("primitive",{object:i.scene,position:[Se,Pe,Re],scale:je},"projectPlant"),m.jsx(pe,{rotationIntensity:.4,floatIntensity:0,children:m.jsx("primitive",{object:c.scene,position:[I,k,L],scale:ye},"projectTeenyBoard")})]})},"FullProjectScene")});C.preload("/models/computer_monitor_lowpoly/monitor.glb");C.preload("/models/teenyBoard/cartoon_mini_keyboard.glb");C.preload("models/plant/low_poly_style_plant.glb");C.preload("/aobox-transformed.glb");function xt(e,n,t,c){if(t)return;c(!0),e.current.visible=!0;const i=e.current.scale.x===2?{x:0,y:0,z:0}:{x:2,y:2,z:2},l=e.current.scale.x===2?Math.PI-.1575:-.1575;ue.to(e.current.scale,{duration:.5,x:i.x,y:i.y,z:i.z,ease:"power2.inOut",onUpdate:()=>{n.updateProjectionMatrix()},onComplete:()=>{i.x===0&&(e.current.visible=!1),c(!1)}}),ue.to(e.current.rotation,{duration:.5,y:l,ease:"power2.inOut",onUpdate:()=>{n.updateProjectionMatrix()},onComplete:()=>{c(!1)}})}function ht(e,n,t){n||(t(!0),e.current.visible=!0,e.current.scale.x>0?(e.current.scale.x=0,e.current.scale.y=0,e.current.scale.z=0,e.current.visible=!1):(e.current.scale.x=2,e.current.scale.y=2,e.current.scale.z=2),t(!1))}export{Rt as default};
//# sourceMappingURL=ProjectsScene-Dfg_ZeEx.js.map
