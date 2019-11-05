(window["webpackJsonpqfi-timeline-tool"]=window["webpackJsonpqfi-timeline-tool"]||[]).push([[0],{238:function(e,t,n){e.exports=n(486)},243:function(e,t,n){},259:function(e,t){},261:function(e,t){},293:function(e,t){},294:function(e,t){},359:function(e,t){},486:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(24),c=n.n(l),i=(n(243),n(38)),o=n(37),u=n(221),s=n(222),b=n.n(s),d=n(12),f=n(223),m=n(224),p=n(29),O=n.n(p),g=function(){function e(t,n){Object(f.a)(this,e),this.localStorageKey="QFI_TIMELINE_TOOL",this.initialGlobal=void 0,this.invalidateMs=void 0,this.initialGlobal=t,this.invalidateMs=n}return Object(m.a)(e,[{key:"initialise",value:function(){var e=this,t=this.getGlobal();Object(d.addCallback)(function(t){return e.storeGlobal(t)}),Object(d.setGlobal)(t)}},{key:"storeGlobal",value:function(e){localStorage.setItem(this.localStorageKey,JSON.stringify({lastModified:O()().toISOString(),global:e}))}},{key:"getGlobal",value:function(){var e=localStorage.getItem(this.localStorageKey);if(!e)return this.initialGlobal;var t=JSON.parse(e),n=t.lastModified,a=t.global;return n&&this.invalidateMs&&O()().diff(n)>this.invalidateMs?this.initialGlobal:a||this.initialGlobal}}]),e}();function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function v(e){return{name:e.name,color:e.color,radius:e.radius,startTime:e.startTime,endTime:e.endTime,location:{lat:e.lat,lng:e.lng}}}b.a.init({key:"1qcsUcO02_Ppf965XmiuCYnZZik6pLiV3wO3fBvRwaQs",simpleSheet:!0,parseNumbers:!0}).then(function(e){return e.map(v)}).then(function(e){var t=Object(d.getGlobal)();Object(d.setGlobal)(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach(function(t){Object(u.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},t,{suspects:e}))});new g({savedAddresses:[],suspects:[],currentDate:"2019-05-12T10:00:00.000Z"},432e5).initialise();var E=n(39),h=n(14),y=n(513),w=n(106);function G(){var e=Object(i.a)(["\n  display: flex;\n  flex-direction: row;\n  align-content: center;\n  justify-content: center;\n"]);return G=function(){return e},e}function k(){var e=Object(i.a)(["\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n  justify-content: center;\n  padding: 16px;\n"]);return k=function(){return e},e}function x(e){var t=Object(o.a)({},e),n=Object(d.useGlobal)("currentDate"),a=Object(h.a)(n,2),l=a[0],c=a[1],i=O()(l).unix();return r.a.createElement(P,t,r.a.createElement(L,null,r.a.createElement(w.a,null,I(i))),r.a.createElement(L,null,r.a.createElement(w.a,{style:{paddingRight:16,textAlign:"right"}},I(S)),r.a.createElement(y.a,{value:i,onChange:function(e,t){return c(O.a.unix(t).toISOString())},step:1800,min:S,max:C}),r.a.createElement(w.a,{style:{paddingLeft:16,textAlign:"left"}},I(C))))}function I(e){return O.a.unix(e).format("DD/MM/YYYY hh:mm a")}var S=O()("2019-05-12T06:00:00.000+10").unix(),C=O()("2019-05-14T22:00:00.000+10").unix(),P=E.a.div(k()),L=E.a.div(G()),T=n(80);function M(){var e=Object(i.a)(["\n  display: flex;\n  flex: 1;\n"]);return M=function(){return e},e}function D(e){var t=Object(o.a)({},e),n=Object(d.useGlobal)("currentPosition"),a=Object(h.a)(n,2),l=a[0],c=a[1],i=Object(d.useGlobal)("searchedAddress"),u=Object(h.a)(i,1)[0],s=Object(d.useGlobal)("savedAddresses"),b=Object(h.a)(s,1)[0],f=Object(d.useGlobal)("suspects"),m=Object(h.a)(f,1)[0],p=Object(d.useGlobal)("currentDate"),g=Object(h.a)(p,1)[0],j=m.filter(function(e){var t=e.startTime,n=e.endTime;return O()(g).isBetween(t,n,void 0,"[)")});return r.a.createElement(B,Object.assign({style:{width:"100%",height:"100%",position:"relative"}},t),r.a.createElement(T.Map,{style:{width:"100%",height:"100%",position:"relative"},google:google,zoom:N,initialCenter:A,center:l,onDragend:function(){return c(void 0)}},b.map(function(e,t){var n=e.firstLine,a=e.location;return r.a.createElement(T.Marker,{key:t,title:n,icon:"http://maps.google.com/mapfiles/ms/icons/red-dot.png",position:a})}),j.map(function(e,t){var n=e.location,a=e.radius,l=e.color;return r.a.createElement(T.Circle,{key:t,center:n,radius:a,fillColor:l,strokeColor:l})}),u&&r.a.createElement(T.Marker,{title:u.firstLine,icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",position:u.location})))}var A={lat:-37.714145,lng:145.065955},N=13,B=E.a.div(M()),Y=n(510),J=n(514),q=n(503),H=n(105),K=n.n(H),R=n(232);function Z(){var e=Object(i.a)(["\n  width: 100%;\n"]);return Z=function(){return e},e}function _(e){var t=Object(o.a)({},e),n=Object(a.useState)(""),l=Object(h.a)(n,2),c=l[0],i=l[1],u=Object(d.useGlobal)("searchedAddress"),s=Object(h.a)(u,2)[1],b=Object(d.useGlobal)("currentPosition"),f=Object(h.a)(b,2)[1],m=Object(a.useCallback)(function(e){e&&i(e)},[i]),p=Object(a.useCallback)(function(e){if(e){var t=e.value;m(t.description),Object(H.geocodeByPlaceId)(t.placeId).then(function(e){return Object(H.getLatLng)(e[0])}).then(function(e){s({placeId:t.placeId,full:t.description,firstLine:t.formattedSuggestion.mainText,secondLine:t.formattedSuggestion.secondaryText,location:e}),f(e)}).catch(function(e){console.error(e)})}},[m,s,f]);return r.a.createElement(q.a,Object.assign({component:"div"},t),r.a.createElement(K.a,{debounce:500,value:c,onChange:m,searchOptions:F},function(e){var t=e.getInputProps,n=e.suggestions,a=t().onChange,l=n.map(function(e){return{value:e,label:e.description}});return r.a.createElement(Q,null,r.a.createElement(R.a,{menuIsOpen:l.length>0,filterOption:function(){return!0},onInputChange:function(e){return a({target:{value:e}})},components:z,placeholder:"Search",options:l,onChange:p}))}))}var z={DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},F={location:new window.google.maps.LatLng(-37,144),radius:5e3,componentRestrictions:{country:"AU"}},Q=E.a.div(Z()),U=n(233),V=n(504),X=n(505),W=n(506),$=n(507);function ee(e){e.style;var t=Object(d.useGlobal)("savedAddresses"),n=Object(h.a)(t,2),l=n[0],c=n[1],i=Object(d.useGlobal)("searchedAddress"),o=Object(h.a)(i,1)[0],u=Object(d.useGlobal)("currentPosition"),s=Object(h.a)(u,2)[1],b=Object(a.useCallback)(function(){if(o){var e=[].concat(Object(U.a)(l),[o]);c(e)}},[l,c,o]),f=Object(a.useMemo)(function(){return!!o&&!!l.find(function(e){return e.placeId===o.placeId})},[l,o]);return o?r.a.createElement(q.a,{button:!0,onClick:function(){return s(o.location)}},r.a.createElement(V.a,null,r.a.createElement("img",{src:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",alt:"Pin Icon"})),r.a.createElement(X.a,{primary:o.firstLine,secondary:o.secondLine}),r.a.createElement(W.a,null,r.a.createElement($.a,{disabled:f,variant:"outlined",onClick:function(){return b()}},"Save"))):null}var te=n(104),ne=n(230),ae=n.n(ne),re=n(511),le=n(512),ce=n(508),ie=n(509),oe=function(e){var t=e.title,n=e.subHeader,l=e.children,c=Object(a.useState)(!0),i=Object(h.a)(c,2),o=i[0],u=i[1],s=Object(a.useCallback)(function(){return u(!o)},[u,o]);return r.a.createElement(a.Fragment,null,r.a.createElement(q.a,{button:!0,onClick:s},r.a.createElement(X.a,{primary:t}),o?r.a.createElement(ce.a,null):r.a.createElement(ie.a,null)),r.a.createElement(le.a,{in:o,timeout:"auto",unmountOnExit:!0},r.a.createElement(Y.a,{component:"div",disablePadding:!0,subheader:n},l)))};function ue(){var e=Object(d.useGlobal)("currentPosition"),t=Object(h.a)(e,2)[1],n=Object(d.useGlobal)("savedAddresses"),l=Object(h.a)(n,2),c=l[0],i=l[1],o=Object(a.useCallback)(function(e){var t=e.placeId,n=c.filter(function(e){var n=e.placeId;return t!==n});i(n)},[c,i]);return r.a.createElement(oe,{title:"Saved Locations",subHeader:r.a.createElement(se,{enabled:0===c.length})},c.map(function(e){return r.a.createElement(q.a,{key:e.placeId,button:!0,onClick:function(){return t(e.location)}},r.a.createElement(V.a,null,r.a.createElement("img",{src:"http://maps.google.com/mapfiles/ms/icons/red-dot.png",alt:"Pin Icon"})),r.a.createElement(X.a,{primary:e.firstLine,secondary:e.secondLine}),r.a.createElement(W.a,null,r.a.createElement(re.a,{onClick:function(){return o(e)}},r.a.createElement(ae.a,null))))}))}function se(e){var t=e.enabled;Object(te.a)(e,["enabled"]);return t?r.a.createElement(w.a,null,"No saved locations yet..."):null}var be=n(231),de=n.n(be);function fe(){var e=Object(d.useGlobal)("suspects"),t=Object(h.a)(e,1)[0],n=Object(d.useGlobal)("currentDate"),a=Object(h.a)(n,1)[0],l=Object(d.useGlobal)("currentPosition"),c=Object(h.a)(l,2)[1],i=t.filter(function(e){var t=e.startTime,n=e.endTime;return O()(a).isBetween(t,n,void 0,"[)")});return r.a.createElement(oe,{title:"Suspect Locations",subHeader:r.a.createElement(me,{enabled:0===t.length})},i.map(function(e,t){return r.a.createElement(q.a,{key:t,button:!0,onClick:function(){return c(e.location)}},r.a.createElement(V.a,null,r.a.createElement(de.a,{style:{color:e.color},fontSize:"large"})),r.a.createElement(X.a,{primary:e.name}))}))}function me(e){var t=e.enabled;Object(te.a)(e,["enabled"]);return t?r.a.createElement(w.a,null,"No suspects found"):null}function pe(e){var t=Object(o.a)({},e);return r.a.createElement(Y.a,Object.assign({component:J.a},t),r.a.createElement(_,null),r.a.createElement(ee,null),r.a.createElement(ue,null),r.a.createElement(fe,null))}function Oe(){var e=Object(i.a)(["\n  flex-direction: row;\n  height: 100vh;\n  width: 100vw;\n"]);return Oe=function(){return e},e}function ge(){var e=Object(i.a)(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"]);return ge=function(){return e},e}var je=E.a.div(ge()),ve=Object(E.a)(je)(Oe());c.a.render(r.a.createElement(function(e){var t=Object(o.a)({},e);return r.a.createElement(ve,t,r.a.createElement(pe,{style:{flex:"1 1 100px"}}),r.a.createElement(je,{style:{flex:"5 5 0"}},r.a.createElement(D,null),r.a.createElement(x,null)))},null),document.getElementById("root"))}},[[238,1,2]]]);
//# sourceMappingURL=main.70c612c5.chunk.js.map