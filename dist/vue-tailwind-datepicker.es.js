import * as ft from "vue";
import { watchEffect as je, ref as J, computed as le, onMounted as ot, cloneVNode as eo, h as ve, Fragment as ge, defineComponent as ue, inject as De, provide as ne, getCurrentInstance as to, watch as lt, onUnmounted as et, Teleport as oo, reactive as xt, shallowRef as ro, openBlock as W, createElementBlock as q, createElementVNode as T, withDirectives as fe, vShow as pe, toDisplayString as ae, renderList as Ke, withModifiers as _e, unref as se, createCommentVNode as he, createVNode as te, TransitionGroup as ao, withCtx as Ne, normalizeClass as Te, Transition as wt, nextTick as He, isProxy as no, createBlock as Ue, renderSlot as mt, mergeProps as so, vModelText as lo } from "vue";
var pt;
let uo = Symbol("headlessui.useid"), io = 0;
const Re = (pt = ft.useId) != null ? pt : function() {
  return ft.inject(uo, () => `${++io}`)();
};
function H(e) {
  var r;
  if (e == null || e.value == null)
    return null;
  let s = (r = e.value.$el) != null ? r : e.value;
  return s instanceof Node ? s : null;
}
function Pe(e, r, ...s) {
  if (e in r) {
    let l = r[e];
    return typeof l == "function" ? l(...s) : l;
  }
  let t = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(r).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t, Pe), t;
}
var co = Object.defineProperty, fo = (e, r, s) => r in e ? co(e, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[r] = s, vt = (e, r, s) => (fo(e, typeof r != "symbol" ? r + "" : r, s), s);
let mo = class {
  constructor() {
    vt(this, "current", this.detect()), vt(this, "currentId", 0);
  }
  set(r) {
    this.current !== r && (this.currentId = 0, this.current = r);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}, rt = new mo();
function Ae(e) {
  if (rt.isServer)
    return null;
  if (e instanceof Node)
    return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let r = H(e);
    if (r)
      return r.ownerDocument;
  }
  return document;
}
let ut = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Me = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(Me || {}), tt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(tt || {}), po = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(po || {});
function at(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(ut)).sort((r, s) => Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (s.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var ct = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(ct || {});
function kt(e, r = 0) {
  var s;
  return e === ((s = Ae(e)) == null ? void 0 : s.body) ? !1 : Pe(r, { 0() {
    return e.matches(ut);
  }, 1() {
    let t = e;
    for (; t !== null; ) {
      if (t.matches(ut))
        return !0;
      t = t.parentElement;
    }
    return !1;
  } });
}
var vo = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(vo || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
let ho = ["textarea", "input"].join(",");
function yo(e) {
  var r, s;
  return (s = (r = e == null ? void 0 : e.matches) == null ? void 0 : r.call(e, ho)) != null ? s : !1;
}
function bo(e, r = (s) => s) {
  return e.slice().sort((s, t) => {
    let l = r(s), v = r(t);
    if (l === null || v === null)
      return 0;
    let u = l.compareDocumentPosition(v);
    return u & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : u & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ee(e, r, { sorted: s = !0, relativeTo: t = null, skipElements: l = [] } = {}) {
  var v;
  let u = (v = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? v : document, a = Array.isArray(e) ? s ? bo(e) : e : at(e);
  l.length > 0 && a.length > 1 && (a = a.filter((N) => !l.includes(N))), t = t ?? u.activeElement;
  let g = (() => {
    if (r & 5)
      return 1;
    if (r & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), h = (() => {
    if (r & 1)
      return 0;
    if (r & 2)
      return Math.max(0, a.indexOf(t)) - 1;
    if (r & 4)
      return Math.max(0, a.indexOf(t)) + 1;
    if (r & 8)
      return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), m = r & 32 ? { preventScroll: !0 } : {}, y = 0, x = a.length, O;
  do {
    if (y >= x || y + x <= 0)
      return 0;
    let N = h + y;
    if (r & 16)
      N = (N + x) % x;
    else {
      if (N < 0)
        return 3;
      if (N >= x)
        return 1;
    }
    O = a[N], O == null || O.focus(m), y += g;
  } while (O !== u.activeElement);
  return r & 6 && yo(O) && O.select(), 2;
}
function go() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function xo() {
  return /Android/gi.test(window.navigator.userAgent);
}
function wo() {
  return go() || xo();
}
function Ge(e, r, s) {
  rt.isServer || je((t) => {
    document.addEventListener(e, r, s), t(() => document.removeEventListener(e, r, s));
  });
}
function jt(e, r, s) {
  rt.isServer || je((t) => {
    window.addEventListener(e, r, s), t(() => window.removeEventListener(e, r, s));
  });
}
function ko(e, r, s = le(() => !0)) {
  function t(v, u) {
    if (!s.value || v.defaultPrevented)
      return;
    let a = u(v);
    if (a === null || !a.getRootNode().contains(a))
      return;
    let g = function h(m) {
      return typeof m == "function" ? h(m()) : Array.isArray(m) || m instanceof Set ? m : [m];
    }(e);
    for (let h of g) {
      if (h === null)
        continue;
      let m = h instanceof HTMLElement ? h : H(h);
      if (m != null && m.contains(a) || v.composed && v.composedPath().includes(m))
        return;
    }
    return !kt(a, ct.Loose) && a.tabIndex !== -1 && v.preventDefault(), r(v, a);
  }
  let l = J(null);
  Ge("pointerdown", (v) => {
    var u, a;
    s.value && (l.value = ((a = (u = v.composedPath) == null ? void 0 : u.call(v)) == null ? void 0 : a[0]) || v.target);
  }, !0), Ge("mousedown", (v) => {
    var u, a;
    s.value && (l.value = ((a = (u = v.composedPath) == null ? void 0 : u.call(v)) == null ? void 0 : a[0]) || v.target);
  }, !0), Ge("click", (v) => {
    wo() || l.value && (t(v, () => l.value), l.value = null);
  }, !0), Ge("touchend", (v) => t(v, () => v.target instanceof HTMLElement ? v.target : null), !0), jt("blur", (v) => t(v, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function ht(e, r) {
  if (e)
    return e;
  let s = r ?? "button";
  if (typeof s == "string" && s.toLowerCase() === "button")
    return "button";
}
function jo(e, r) {
  let s = J(ht(e.value.type, e.value.as));
  return ot(() => {
    s.value = ht(e.value.type, e.value.as);
  }), je(() => {
    var t;
    s.value || H(r) && H(r) instanceof HTMLButtonElement && !((t = H(r)) != null && t.hasAttribute("type")) && (s.value = "button");
  }), s;
}
var ze = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(ze || {}), $o = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))($o || {});
function Oe({ visible: e = !0, features: r = 0, ourProps: s, theirProps: t, ...l }) {
  var v;
  let u = _t(t, s), a = Object.assign(l, { props: u });
  if (e || r & 2 && u.static)
    return st(a);
  if (r & 1) {
    let g = (v = u.unmount) == null || v ? 0 : 1;
    return Pe(g, { 0() {
      return null;
    }, 1() {
      return st({ ...l, props: { ...u, hidden: !0, style: { display: "none" } } });
    } });
  }
  return st(a);
}
function st({ props: e, attrs: r, slots: s, slot: t, name: l }) {
  var v, u;
  let { as: a, ...g } = _o(e, ["unmount", "static"]), h = (v = s.default) == null ? void 0 : v.call(s, t), m = {};
  if (t) {
    let y = !1, x = [];
    for (let [O, N] of Object.entries(t))
      typeof N == "boolean" && (y = !0), N === !0 && x.push(O);
    y && (m["data-headlessui-state"] = x.join(" "));
  }
  if (a === "template") {
    if (h = $t(h ?? []), Object.keys(g).length > 0 || Object.keys(r).length > 0) {
      let [y, ...x] = h ?? [];
      if (!Mo(y) || x.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${l} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(g).concat(Object.keys(r)).map((F) => F.trim()).filter((F, V, Y) => Y.indexOf(F) === V).sort((F, V) => F.localeCompare(V)).map((F) => `  - ${F}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((F) => `  - ${F}`).join(`
`)].join(`
`));
      let O = _t((u = y.props) != null ? u : {}, g, m), N = eo(y, O, !0);
      for (let F in O)
        F.startsWith("on") && (N.props || (N.props = {}), N.props[F] = O[F]);
      return N;
    }
    return Array.isArray(h) && h.length === 1 ? h[0] : h;
  }
  return ve(a, Object.assign({}, g, m), { default: () => h });
}
function $t(e) {
  return e.flatMap((r) => r.type === ge ? $t(r.children) : [r]);
}
function _t(...e) {
  if (e.length === 0)
    return {};
  if (e.length === 1)
    return e[0];
  let r = {}, s = {};
  for (let t of e)
    for (let l in t)
      l.startsWith("on") && typeof t[l] == "function" ? (s[l] != null || (s[l] = []), s[l].push(t[l])) : r[l] = t[l];
  if (r.disabled || r["aria-disabled"])
    return Object.assign(r, Object.fromEntries(Object.keys(s).map((t) => [t, void 0])));
  for (let t in s)
    Object.assign(r, { [t](l, ...v) {
      let u = s[t];
      for (let a of u) {
        if (l instanceof Event && l.defaultPrevented)
          return;
        a(l, ...v);
      }
    } });
  return r;
}
function _o(e, r = []) {
  let s = Object.assign({}, e);
  for (let t of r)
    t in s && delete s[t];
  return s;
}
function Mo(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var Ie = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Ie || {});
let We = ue({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: r, attrs: s }) {
  return () => {
    var t;
    let { features: l, ...v } = e, u = { "aria-hidden": (l & 2) === 2 ? !0 : (t = v["aria-hidden"]) != null ? t : void 0, hidden: (l & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(l & 4) === 4 && (l & 2) !== 2 && { display: "none" } } };
    return Oe({ ourProps: u, theirProps: v, slot: {}, attrs: s, slots: r, name: "Hidden" });
  };
} }), Mt = Symbol("Context");
var Le = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(Le || {});
function St() {
  return De(Mt, null);
}
function So(e) {
  ne(Mt, e);
}
var Ve = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Ve || {});
function Do(e, r, s, t) {
  rt.isServer || je((l) => {
    e = e ?? window, e.addEventListener(r, s, t), l(() => e.removeEventListener(r, s, t));
  });
}
var Se = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Se || {});
function Dt() {
  let e = J(0);
  return jt("keydown", (r) => {
    r.key === "Tab" && (e.value = r.shiftKey ? 1 : 0);
  }), e;
}
function Po({ defaultContainers: e = [], portals: r, mainTreeNodeRef: s } = {}) {
  let t = J(null), l = Ae(t);
  function v() {
    var u, a, g;
    let h = [];
    for (let m of e)
      m !== null && (m instanceof HTMLElement ? h.push(m) : "value" in m && m.value instanceof HTMLElement && h.push(m.value));
    if (r != null && r.value)
      for (let m of r.value)
        h.push(m);
    for (let m of (u = l == null ? void 0 : l.querySelectorAll("html > *, body > *")) != null ? u : [])
      m !== document.body && m !== document.head && m instanceof HTMLElement && m.id !== "headlessui-portal-root" && (m.contains(H(t)) || m.contains((g = (a = H(t)) == null ? void 0 : a.getRootNode()) == null ? void 0 : g.host) || h.some((y) => m.contains(y)) || h.push(m));
    return h;
  }
  return { resolveContainers: v, contains(u) {
    return v().some((a) => a.contains(u));
  }, mainTreeNodeRef: t, MainTreeNode() {
    return s != null ? null : ve(We, { features: Ie.Hidden, ref: t });
  } };
}
function Oo() {
  let e = J(null);
  return { mainTreeNodeRef: e, MainTreeNode() {
    return ve(We, { features: Ie.Hidden, ref: e });
  } };
}
let Pt = Symbol("ForcePortalRootContext");
function Vo() {
  return De(Pt, !1);
}
ue({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: r, attrs: s }) {
  return ne(Pt, e.force), () => {
    let { force: t, ...l } = e;
    return Oe({ theirProps: l, ourProps: {}, slot: {}, slots: r, attrs: s, name: "ForcePortalRoot" });
  };
} });
function To(e) {
  let r = Ae(e);
  if (!r) {
    if (e === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let s = r.getElementById("headlessui-portal-root");
  if (s)
    return s;
  let t = r.createElement("div");
  return t.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(t);
}
const dt = /* @__PURE__ */ new WeakMap();
function Ao(e) {
  var r;
  return (r = dt.get(e)) != null ? r : 0;
}
function yt(e, r) {
  let s = r(Ao(e));
  return s <= 0 ? dt.delete(e) : dt.set(e, s), s;
}
ue({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: r, attrs: s }) {
  let t = J(null), l = le(() => Ae(t)), v = Vo(), u = De(Ot, null), a = J(v === !0 || u == null ? To(t.value) : u.resolveTarget());
  a.value && yt(a.value, (x) => x + 1);
  let g = J(!1);
  ot(() => {
    g.value = !0;
  }), je(() => {
    v || u != null && (a.value = u.resolveTarget());
  });
  let h = De(it, null), m = !1, y = to();
  return lt(t, () => {
    if (m || !h)
      return;
    let x = H(t);
    x && (et(h.register(x), y), m = !0);
  }), et(() => {
    var x, O;
    let N = (x = l.value) == null ? void 0 : x.getElementById("headlessui-portal-root");
    !N || a.value !== N || yt(a.value, (F) => F - 1) || a.value.children.length > 0 || (O = a.value.parentElement) == null || O.removeChild(a.value);
  }), () => {
    if (!g.value || a.value === null)
      return null;
    let x = { ref: t, "data-headlessui-portal": "" };
    return ve(oo, { to: a.value }, Oe({ ourProps: x, theirProps: e, slot: {}, attrs: s, slots: r, name: "Portal" }));
  };
} });
let it = Symbol("PortalParentContext");
function Co() {
  let e = De(it, null), r = J([]);
  function s(v) {
    return r.value.push(v), e && e.register(v), () => t(v);
  }
  function t(v) {
    let u = r.value.indexOf(v);
    u !== -1 && r.value.splice(u, 1), e && e.unregister(v);
  }
  let l = { register: s, unregister: t, portals: r };
  return [r, ue({ name: "PortalWrapper", setup(v, { slots: u }) {
    return ne(it, l), () => {
      var a;
      return (a = u.default) == null ? void 0 : a.call(u);
    };
  } })];
}
let Ot = Symbol("PortalGroupContext");
ue({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: r, slots: s }) {
  let t = xt({ resolveTarget() {
    return e.target;
  } });
  return ne(Ot, t), () => {
    let { target: l, ...v } = e;
    return Oe({ theirProps: v, ourProps: {}, slot: {}, attrs: r, slots: s, name: "PortalGroup" });
  };
} });
var Yo = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Yo || {});
let Vt = Symbol("PopoverContext");
function nt(e) {
  let r = De(Vt, null);
  if (r === null) {
    let s = new Error(`<${e} /> is missing a parent <${Yt.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s, nt), s;
  }
  return r;
}
let Tt = Symbol("PopoverGroupContext");
function At() {
  return De(Tt, null);
}
let Ct = Symbol("PopoverPanelContext");
function Eo() {
  return De(Ct, null);
}
let Yt = ue({ name: "Popover", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: r, attrs: s, expose: t }) {
  var l;
  let v = J(null);
  t({ el: v, $el: v });
  let u = J(1), a = J(null), g = J(null), h = J(null), m = J(null), y = le(() => Ae(v)), x = le(() => {
    var w, P;
    if (!H(a) || !H(m))
      return !1;
    for (let Z of document.querySelectorAll("body > *"))
      if (Number(Z == null ? void 0 : Z.contains(H(a))) ^ Number(Z == null ? void 0 : Z.contains(H(m))))
        return !0;
    let n = at(), o = n.indexOf(H(a)), B = (o + n.length - 1) % n.length, E = (o + 1) % n.length, _ = n[B], G = n[E];
    return !((w = H(m)) != null && w.contains(_)) && !((P = H(m)) != null && P.contains(G));
  }), O = { popoverState: u, buttonId: J(null), panelId: J(null), panel: m, button: a, isPortalled: x, beforePanelSentinel: g, afterPanelSentinel: h, togglePopover() {
    u.value = Pe(u.value, { 0: 1, 1: 0 });
  }, closePopover() {
    u.value !== 1 && (u.value = 1);
  }, close(w) {
    O.closePopover();
    let P = (() => w ? w instanceof HTMLElement ? w : w.value instanceof HTMLElement ? H(w) : H(O.button) : H(O.button))();
    P == null || P.focus();
  } };
  ne(Vt, O), So(le(() => Pe(u.value, { 0: Le.Open, 1: Le.Closed })));
  let N = { buttonId: O.buttonId, panelId: O.panelId, close() {
    O.closePopover();
  } }, F = At(), V = F == null ? void 0 : F.registerPopover, [Y, M] = Co(), k = Po({ mainTreeNodeRef: F == null ? void 0 : F.mainTreeNodeRef, portals: Y, defaultContainers: [a, m] });
  function D() {
    var w, P, n, o;
    return (o = F == null ? void 0 : F.isFocusWithinPopoverGroup()) != null ? o : ((w = y.value) == null ? void 0 : w.activeElement) && (((P = H(a)) == null ? void 0 : P.contains(y.value.activeElement)) || ((n = H(m)) == null ? void 0 : n.contains(y.value.activeElement)));
  }
  return je(() => V == null ? void 0 : V(N)), Do((l = y.value) == null ? void 0 : l.defaultView, "focus", (w) => {
    var P, n;
    w.target !== window && w.target instanceof HTMLElement && u.value === 0 && (D() || a && m && (k.contains(w.target) || (P = H(O.beforePanelSentinel)) != null && P.contains(w.target) || (n = H(O.afterPanelSentinel)) != null && n.contains(w.target) || O.closePopover()));
  }, !0), ko(k.resolveContainers, (w, P) => {
    var n;
    O.closePopover(), kt(P, ct.Loose) || (w.preventDefault(), (n = H(a)) == null || n.focus());
  }, le(() => u.value === 0)), () => {
    let w = { open: u.value === 0, close: O.close };
    return ve(ge, [ve(M, {}, () => Oe({ theirProps: { ...e, ...s }, ourProps: { ref: v }, slot: w, slots: r, attrs: s, name: "Popover" })), ve(k.MainTreeNode)]);
  };
} }), Lo = ue({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: !1 }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { attrs: r, slots: s, expose: t }) {
  var l;
  let v = (l = e.id) != null ? l : `headlessui-popover-button-${Re()}`, u = nt("PopoverButton"), a = le(() => Ae(u.button));
  t({ el: u.button, $el: u.button }), ot(() => {
    u.buttonId.value = v;
  }), et(() => {
    u.buttonId.value = null;
  });
  let g = At(), h = g == null ? void 0 : g.closeOthers, m = Eo(), y = le(() => m === null ? !1 : m.value === u.panelId.value), x = J(null), O = `headlessui-focus-sentinel-${Re()}`;
  y.value || je(() => {
    u.button.value = H(x);
  });
  let N = jo(le(() => ({ as: e.as, type: r.type })), x);
  function F(w) {
    var P, n, o, B, E;
    if (y.value) {
      if (u.popoverState.value === 1)
        return;
      switch (w.key) {
        case Ve.Space:
        case Ve.Enter:
          w.preventDefault(), (n = (P = w.target).click) == null || n.call(P), u.closePopover(), (o = H(u.button)) == null || o.focus();
          break;
      }
    } else
      switch (w.key) {
        case Ve.Space:
        case Ve.Enter:
          w.preventDefault(), w.stopPropagation(), u.popoverState.value === 1 && (h == null || h(u.buttonId.value)), u.togglePopover();
          break;
        case Ve.Escape:
          if (u.popoverState.value !== 0)
            return h == null ? void 0 : h(u.buttonId.value);
          if (!H(u.button) || (B = a.value) != null && B.activeElement && !((E = H(u.button)) != null && E.contains(a.value.activeElement)))
            return;
          w.preventDefault(), w.stopPropagation(), u.closePopover();
          break;
      }
  }
  function V(w) {
    y.value || w.key === Ve.Space && w.preventDefault();
  }
  function Y(w) {
    var P, n;
    e.disabled || (y.value ? (u.closePopover(), (P = H(u.button)) == null || P.focus()) : (w.preventDefault(), w.stopPropagation(), u.popoverState.value === 1 && (h == null || h(u.buttonId.value)), u.togglePopover(), (n = H(u.button)) == null || n.focus()));
  }
  function M(w) {
    w.preventDefault(), w.stopPropagation();
  }
  let k = Dt();
  function D() {
    let w = H(u.panel);
    if (!w)
      return;
    function P() {
      Pe(k.value, { [Se.Forwards]: () => Ee(w, Me.First), [Se.Backwards]: () => Ee(w, Me.Last) }) === tt.Error && Ee(at().filter((n) => n.dataset.headlessuiFocusGuard !== "true"), Pe(k.value, { [Se.Forwards]: Me.Next, [Se.Backwards]: Me.Previous }), { relativeTo: H(u.button) });
    }
    P();
  }
  return () => {
    let w = u.popoverState.value === 0, P = { open: w }, { ...n } = e, o = y.value ? { ref: x, type: N.value, onKeydown: F, onClick: Y } : { ref: x, id: v, type: N.value, "aria-expanded": u.popoverState.value === 0, "aria-controls": H(u.panel) ? u.panelId.value : void 0, disabled: e.disabled ? !0 : void 0, onKeydown: F, onKeyup: V, onClick: Y, onMousedown: M };
    return ve(ge, [Oe({ ourProps: o, theirProps: { ...r, ...n }, slot: P, attrs: r, slots: s, name: "PopoverButton" }), w && !y.value && u.isPortalled.value && ve(We, { id: O, features: Ie.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: D })]);
  };
} }), Fo = ue({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 } }, setup(e, { attrs: r, slots: s }) {
  let t = nt("PopoverOverlay"), l = `headlessui-popover-overlay-${Re()}`, v = St(), u = le(() => v !== null ? (v.value & Le.Open) === Le.Open : t.popoverState.value === 0);
  function a() {
    t.closePopover();
  }
  return () => {
    let g = { open: t.popoverState.value === 0 };
    return Oe({ ourProps: { id: l, "aria-hidden": !0, onClick: a }, theirProps: e, slot: g, attrs: r, slots: s, features: ze.RenderStrategy | ze.Static, visible: u.value, name: "PopoverOverlay" });
  };
} }), Bo = ue({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, focus: { type: Boolean, default: !1 }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { attrs: r, slots: s, expose: t }) {
  var l;
  let v = (l = e.id) != null ? l : `headlessui-popover-panel-${Re()}`, { focus: u } = e, a = nt("PopoverPanel"), g = le(() => Ae(a.panel)), h = `headlessui-focus-sentinel-before-${Re()}`, m = `headlessui-focus-sentinel-after-${Re()}`;
  t({ el: a.panel, $el: a.panel }), ot(() => {
    a.panelId.value = v;
  }), et(() => {
    a.panelId.value = null;
  }), ne(Ct, a.panelId), je(() => {
    var M, k;
    if (!u || a.popoverState.value !== 0 || !a.panel)
      return;
    let D = (M = g.value) == null ? void 0 : M.activeElement;
    (k = H(a.panel)) != null && k.contains(D) || Ee(H(a.panel), Me.First);
  });
  let y = St(), x = le(() => y !== null ? (y.value & Le.Open) === Le.Open : a.popoverState.value === 0);
  function O(M) {
    var k, D;
    switch (M.key) {
      case Ve.Escape:
        if (a.popoverState.value !== 0 || !H(a.panel) || g.value && !((k = H(a.panel)) != null && k.contains(g.value.activeElement)))
          return;
        M.preventDefault(), M.stopPropagation(), a.closePopover(), (D = H(a.button)) == null || D.focus();
        break;
    }
  }
  function N(M) {
    var k, D, w, P, n;
    let o = M.relatedTarget;
    o && H(a.panel) && ((k = H(a.panel)) != null && k.contains(o) || (a.closePopover(), ((w = (D = H(a.beforePanelSentinel)) == null ? void 0 : D.contains) != null && w.call(D, o) || (n = (P = H(a.afterPanelSentinel)) == null ? void 0 : P.contains) != null && n.call(P, o)) && o.focus({ preventScroll: !0 })));
  }
  let F = Dt();
  function V() {
    let M = H(a.panel);
    if (!M)
      return;
    function k() {
      Pe(F.value, { [Se.Forwards]: () => {
        var D;
        Ee(M, Me.First) === tt.Error && ((D = H(a.afterPanelSentinel)) == null || D.focus());
      }, [Se.Backwards]: () => {
        var D;
        (D = H(a.button)) == null || D.focus({ preventScroll: !0 });
      } });
    }
    k();
  }
  function Y() {
    let M = H(a.panel);
    if (!M)
      return;
    function k() {
      Pe(F.value, { [Se.Forwards]: () => {
        let D = H(a.button), w = H(a.panel);
        if (!D)
          return;
        let P = at(), n = P.indexOf(D), o = P.slice(0, n + 1), B = [...P.slice(n + 1), ...o];
        for (let E of B.slice())
          if (E.dataset.headlessuiFocusGuard === "true" || w != null && w.contains(E)) {
            let _ = B.indexOf(E);
            _ !== -1 && B.splice(_, 1);
          }
        Ee(B, Me.First, { sorted: !1 });
      }, [Se.Backwards]: () => {
        var D;
        Ee(M, Me.Previous) === tt.Error && ((D = H(a.button)) == null || D.focus());
      } });
    }
    k();
  }
  return () => {
    let M = { open: a.popoverState.value === 0, close: a.close }, { focus: k, ...D } = e, w = { ref: a.panel, id: v, onKeydown: O, onFocusout: u && a.popoverState.value === 0 ? N : void 0, tabIndex: -1 };
    return Oe({ ourProps: w, theirProps: { ...r, ...D }, attrs: r, slot: M, slots: { ...s, default: (...P) => {
      var n;
      return [ve(ge, [x.value && a.isPortalled.value && ve(We, { id: h, ref: a.beforePanelSentinel, features: Ie.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: V }), (n = s.default) == null ? void 0 : n.call(s, ...P), x.value && a.isPortalled.value && ve(We, { id: m, ref: a.afterPanelSentinel, features: Ie.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: Y })])];
    } }, features: ze.RenderStrategy | ze.Static, visible: x.value, name: "PopoverPanel" });
  };
} });
ue({ name: "PopoverGroup", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" } }, setup(e, { attrs: r, slots: s, expose: t }) {
  let l = J(null), v = ro([]), u = le(() => Ae(l)), a = Oo();
  t({ el: l, $el: l });
  function g(x) {
    let O = v.value.indexOf(x);
    O !== -1 && v.value.splice(O, 1);
  }
  function h(x) {
    return v.value.push(x), () => {
      g(x);
    };
  }
  function m() {
    var x;
    let O = u.value;
    if (!O)
      return !1;
    let N = O.activeElement;
    return (x = H(l)) != null && x.contains(N) ? !0 : v.value.some((F) => {
      var V, Y;
      return ((V = O.getElementById(F.buttonId.value)) == null ? void 0 : V.contains(N)) || ((Y = O.getElementById(F.panelId.value)) == null ? void 0 : Y.contains(N));
    });
  }
  function y(x) {
    for (let O of v.value)
      O.buttonId.value !== x && O.close();
  }
  return ne(Tt, { registerPopover: h, unregisterPopover: g, isFocusWithinPopoverGroup: m, closeOthers: y, mainTreeNodeRef: a.mainTreeNodeRef }), () => ve(ge, [Oe({ ourProps: { ref: l }, theirProps: { ...e, ...r }, slot: {}, attrs: r, slots: s, name: "PopoverGroup" }), ve(a.MainTreeNode)]);
} });
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ye(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Et = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    var s = 1e3, t = 6e4, l = 36e5, v = "millisecond", u = "second", a = "minute", g = "hour", h = "day", m = "week", y = "month", x = "quarter", O = "year", N = "date", F = "Invalid Date", V = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(A) {
      var b = ["th", "st", "nd", "rd"], $ = A % 100;
      return "[" + A + (b[($ - 20) % 10] || b[$] || b[0]) + "]";
    } }, k = function(A, b, $) {
      var C = String(A);
      return !C || C.length >= b ? A : "" + Array(b + 1 - C.length).join($) + A;
    }, D = { s: k, z: function(A) {
      var b = -A.utcOffset(), $ = Math.abs(b), C = Math.floor($ / 60), S = $ % 60;
      return (b <= 0 ? "+" : "-") + k(C, 2, "0") + ":" + k(S, 2, "0");
    }, m: function A(b, $) {
      if (b.date() < $.date())
        return -A($, b);
      var C = 12 * ($.year() - b.year()) + ($.month() - b.month()), S = b.clone().add(C, y), I = $ - S < 0, R = b.clone().add(C + (I ? -1 : 1), y);
      return +(-(C + ($ - S) / (I ? S - R : R - S)) || 0);
    }, a: function(A) {
      return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
    }, p: function(A) {
      return { M: y, y: O, w: m, d: h, D: N, h: g, m: a, s: u, ms: v, Q: x }[A] || String(A || "").toLowerCase().replace(/s$/, "");
    }, u: function(A) {
      return A === void 0;
    } }, w = "en", P = {};
    P[w] = M;
    var n = "$isDayjsObject", o = function(A) {
      return A instanceof G || !(!A || !A[n]);
    }, B = function A(b, $, C) {
      var S;
      if (!b)
        return w;
      if (typeof b == "string") {
        var I = b.toLowerCase();
        P[I] && (S = I), $ && (P[I] = $, S = I);
        var R = b.split("-");
        if (!S && R.length > 1)
          return A(R[0]);
      } else {
        var U = b.name;
        P[U] = b, S = U;
      }
      return !C && S && (w = S), S || !C && w;
    }, E = function(A, b) {
      if (o(A))
        return A.clone();
      var $ = typeof b == "object" ? b : {};
      return $.date = A, $.args = arguments, new G($);
    }, _ = D;
    _.l = B, _.i = o, _.w = function(A, b) {
      return E(A, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
    };
    var G = function() {
      function A($) {
        this.$L = B($.locale, null, !0), this.parse($), this.$x = this.$x || $.x || {}, this[n] = !0;
      }
      var b = A.prototype;
      return b.parse = function($) {
        this.$d = function(C) {
          var S = C.date, I = C.utc;
          if (S === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(S))
            return /* @__PURE__ */ new Date();
          if (S instanceof Date)
            return new Date(S);
          if (typeof S == "string" && !/Z$/i.test(S)) {
            var R = S.match(V);
            if (R) {
              var U = R[2] - 1 || 0, X = (R[7] || "0").substring(0, 3);
              return I ? new Date(Date.UTC(R[1], U, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, X)) : new Date(R[1], U, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, X);
            }
          }
          return new Date(S);
        }($), this.init();
      }, b.init = function() {
        var $ = this.$d;
        this.$y = $.getFullYear(), this.$M = $.getMonth(), this.$D = $.getDate(), this.$W = $.getDay(), this.$H = $.getHours(), this.$m = $.getMinutes(), this.$s = $.getSeconds(), this.$ms = $.getMilliseconds();
      }, b.$utils = function() {
        return _;
      }, b.isValid = function() {
        return this.$d.toString() !== F;
      }, b.isSame = function($, C) {
        var S = E($);
        return this.startOf(C) <= S && S <= this.endOf(C);
      }, b.isAfter = function($, C) {
        return E($) < this.startOf(C);
      }, b.isBefore = function($, C) {
        return this.endOf(C) < E($);
      }, b.$g = function($, C, S) {
        return _.u($) ? this[C] : this.set(S, $);
      }, b.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, b.valueOf = function() {
        return this.$d.getTime();
      }, b.startOf = function($, C) {
        var S = this, I = !!_.u(C) || C, R = _.p($), U = function(ye, re) {
          var me = _.w(S.$u ? Date.UTC(S.$y, re, ye) : new Date(S.$y, re, ye), S);
          return I ? me : me.endOf(h);
        }, X = function(ye, re) {
          return _.w(S.toDate()[ye].apply(S.toDate("s"), (I ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(re)), S);
        }, ee = this.$W, oe = this.$M, de = this.$D, xe = "set" + (this.$u ? "UTC" : "");
        switch (R) {
          case O:
            return I ? U(1, 0) : U(31, 11);
          case y:
            return I ? U(1, oe) : U(0, oe + 1);
          case m:
            var ie = this.$locale().weekStart || 0, $e = (ee < ie ? ee + 7 : ee) - ie;
            return U(I ? de - $e : de + (6 - $e), oe);
          case h:
          case N:
            return X(xe + "Hours", 0);
          case g:
            return X(xe + "Minutes", 1);
          case a:
            return X(xe + "Seconds", 2);
          case u:
            return X(xe + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, b.endOf = function($) {
        return this.startOf($, !1);
      }, b.$set = function($, C) {
        var S, I = _.p($), R = "set" + (this.$u ? "UTC" : ""), U = (S = {}, S[h] = R + "Date", S[N] = R + "Date", S[y] = R + "Month", S[O] = R + "FullYear", S[g] = R + "Hours", S[a] = R + "Minutes", S[u] = R + "Seconds", S[v] = R + "Milliseconds", S)[I], X = I === h ? this.$D + (C - this.$W) : C;
        if (I === y || I === O) {
          var ee = this.clone().set(N, 1);
          ee.$d[U](X), ee.init(), this.$d = ee.set(N, Math.min(this.$D, ee.daysInMonth())).$d;
        } else
          U && this.$d[U](X);
        return this.init(), this;
      }, b.set = function($, C) {
        return this.clone().$set($, C);
      }, b.get = function($) {
        return this[_.p($)]();
      }, b.add = function($, C) {
        var S, I = this;
        $ = Number($);
        var R = _.p(C), U = function(oe) {
          var de = E(I);
          return _.w(de.date(de.date() + Math.round(oe * $)), I);
        };
        if (R === y)
          return this.set(y, this.$M + $);
        if (R === O)
          return this.set(O, this.$y + $);
        if (R === h)
          return U(1);
        if (R === m)
          return U(7);
        var X = (S = {}, S[a] = t, S[g] = l, S[u] = s, S)[R] || 1, ee = this.$d.getTime() + $ * X;
        return _.w(ee, this);
      }, b.subtract = function($, C) {
        return this.add(-1 * $, C);
      }, b.format = function($) {
        var C = this, S = this.$locale();
        if (!this.isValid())
          return S.invalidDate || F;
        var I = $ || "YYYY-MM-DDTHH:mm:ssZ", R = _.z(this), U = this.$H, X = this.$m, ee = this.$M, oe = S.weekdays, de = S.months, xe = S.meridiem, ie = function(re, me, be, we) {
          return re && (re[me] || re(C, I)) || be[me].slice(0, we);
        }, $e = function(re) {
          return _.s(U % 12 || 12, re, "0");
        }, ye = xe || function(re, me, be) {
          var we = re < 12 ? "AM" : "PM";
          return be ? we.toLowerCase() : we;
        };
        return I.replace(Y, function(re, me) {
          return me || function(be) {
            switch (be) {
              case "YY":
                return String(C.$y).slice(-2);
              case "YYYY":
                return _.s(C.$y, 4, "0");
              case "M":
                return ee + 1;
              case "MM":
                return _.s(ee + 1, 2, "0");
              case "MMM":
                return ie(S.monthsShort, ee, de, 3);
              case "MMMM":
                return ie(de, ee);
              case "D":
                return C.$D;
              case "DD":
                return _.s(C.$D, 2, "0");
              case "d":
                return String(C.$W);
              case "dd":
                return ie(S.weekdaysMin, C.$W, oe, 2);
              case "ddd":
                return ie(S.weekdaysShort, C.$W, oe, 3);
              case "dddd":
                return oe[C.$W];
              case "H":
                return String(U);
              case "HH":
                return _.s(U, 2, "0");
              case "h":
                return $e(1);
              case "hh":
                return $e(2);
              case "a":
                return ye(U, X, !0);
              case "A":
                return ye(U, X, !1);
              case "m":
                return String(X);
              case "mm":
                return _.s(X, 2, "0");
              case "s":
                return String(C.$s);
              case "ss":
                return _.s(C.$s, 2, "0");
              case "SSS":
                return _.s(C.$ms, 3, "0");
              case "Z":
                return R;
            }
            return null;
          }(re) || R.replace(":", "");
        });
      }, b.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, b.diff = function($, C, S) {
        var I, R = this, U = _.p(C), X = E($), ee = (X.utcOffset() - this.utcOffset()) * t, oe = this - X, de = function() {
          return _.m(R, X);
        };
        switch (U) {
          case O:
            I = de() / 12;
            break;
          case y:
            I = de();
            break;
          case x:
            I = de() / 3;
            break;
          case m:
            I = (oe - ee) / 6048e5;
            break;
          case h:
            I = (oe - ee) / 864e5;
            break;
          case g:
            I = oe / l;
            break;
          case a:
            I = oe / t;
            break;
          case u:
            I = oe / s;
            break;
          default:
            I = oe;
        }
        return S ? I : _.a(I);
      }, b.daysInMonth = function() {
        return this.endOf(y).$D;
      }, b.$locale = function() {
        return P[this.$L];
      }, b.locale = function($, C) {
        if (!$)
          return this.$L;
        var S = this.clone(), I = B($, C, !0);
        return I && (S.$L = I), S;
      }, b.clone = function() {
        return _.w(this.$d, this);
      }, b.toDate = function() {
        return new Date(this.valueOf());
      }, b.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, b.toISOString = function() {
        return this.$d.toISOString();
      }, b.toString = function() {
        return this.$d.toUTCString();
      }, A;
    }(), Z = G.prototype;
    return E.prototype = Z, [["$ms", v], ["$s", u], ["$m", a], ["$H", g], ["$W", h], ["$M", y], ["$y", O], ["$D", N]].forEach(function(A) {
      Z[A[1]] = function(b) {
        return this.$g(b, A[0], A[1]);
      };
    }), E.extend = function(A, b) {
      return A.$i || (A(b, G, E), A.$i = !0), E;
    }, E.locale = B, E.isDayjs = o, E.unix = function(A) {
      return E(1e3 * A);
    }, E.en = P[w], E.Ls = P, E.p = {}, E;
  });
})(Et);
var No = Et.exports;
const i = /* @__PURE__ */ Ye(No);
var Lt = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    return function(s, t, l) {
      var v = t.prototype, u = function(y) {
        return y && (y.indexOf ? y : y.s);
      }, a = function(y, x, O, N, F) {
        var V = y.name ? y : y.$locale(), Y = u(V[x]), M = u(V[O]), k = Y || M.map(function(w) {
          return w.slice(0, N);
        });
        if (!F)
          return k;
        var D = V.weekStart;
        return k.map(function(w, P) {
          return k[(P + (D || 0)) % 7];
        });
      }, g = function() {
        return l.Ls[l.locale()];
      }, h = function(y, x) {
        return y.formats[x] || function(O) {
          return O.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(N, F, V) {
            return F || V.slice(1);
          });
        }(y.formats[x.toUpperCase()]);
      }, m = function() {
        var y = this;
        return { months: function(x) {
          return x ? x.format("MMMM") : a(y, "months");
        }, monthsShort: function(x) {
          return x ? x.format("MMM") : a(y, "monthsShort", "months", 3);
        }, firstDayOfWeek: function() {
          return y.$locale().weekStart || 0;
        }, weekdays: function(x) {
          return x ? x.format("dddd") : a(y, "weekdays");
        }, weekdaysMin: function(x) {
          return x ? x.format("dd") : a(y, "weekdaysMin", "weekdays", 2);
        }, weekdaysShort: function(x) {
          return x ? x.format("ddd") : a(y, "weekdaysShort", "weekdays", 3);
        }, longDateFormat: function(x) {
          return h(y.$locale(), x);
        }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
      };
      v.localeData = function() {
        return m.bind(this)();
      }, l.localeData = function() {
        var y = g();
        return { firstDayOfWeek: function() {
          return y.weekStart || 0;
        }, weekdays: function() {
          return l.weekdays();
        }, weekdaysShort: function() {
          return l.weekdaysShort();
        }, weekdaysMin: function() {
          return l.weekdaysMin();
        }, months: function() {
          return l.months();
        }, monthsShort: function() {
          return l.monthsShort();
        }, longDateFormat: function(x) {
          return h(y, x);
        }, meridiem: y.meridiem, ordinal: y.ordinal };
      }, l.months = function() {
        return a(g(), "months");
      }, l.monthsShort = function() {
        return a(g(), "monthsShort", "months", 3);
      }, l.weekdays = function(y) {
        return a(g(), "weekdays", null, null, y);
      }, l.weekdaysShort = function(y) {
        return a(g(), "weekdaysShort", "weekdays", 3, y);
      }, l.weekdaysMin = function(y) {
        return a(g(), "weekdaysMin", "weekdays", 2, y);
      };
    };
  });
})(Lt);
var Ro = Lt.exports;
const Io = /* @__PURE__ */ Ye(Ro);
var Ft = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    var s = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    return function(t, l, v) {
      var u = l.prototype, a = u.format;
      v.en.formats = s, u.format = function(g) {
        g === void 0 && (g = "YYYY-MM-DDTHH:mm:ssZ");
        var h = this.$locale().formats, m = function(y, x) {
          return y.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(O, N, F) {
            var V = F && F.toUpperCase();
            return N || x[F] || s[F] || x[V].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(Y, M, k) {
              return M || k.slice(1);
            });
          });
        }(g, h === void 0 ? {} : h);
        return a.call(this, m);
      };
    };
  });
})(Ft);
var Ho = Ft.exports;
const Uo = /* @__PURE__ */ Ye(Ho);
var Bt = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    var s = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, l = /\d/, v = /\d\d/, u = /\d\d?/, a = /\d*[^-_:/,()\s\d]+/, g = {}, h = function(V) {
      return (V = +V) + (V > 68 ? 1900 : 2e3);
    }, m = function(V) {
      return function(Y) {
        this[V] = +Y;
      };
    }, y = [/[+-]\d\d:?(\d\d)?|Z/, function(V) {
      (this.zone || (this.zone = {})).offset = function(Y) {
        if (!Y || Y === "Z")
          return 0;
        var M = Y.match(/([+-]|\d\d)/g), k = 60 * M[1] + (+M[2] || 0);
        return k === 0 ? 0 : M[0] === "+" ? -k : k;
      }(V);
    }], x = function(V) {
      var Y = g[V];
      return Y && (Y.indexOf ? Y : Y.s.concat(Y.f));
    }, O = function(V, Y) {
      var M, k = g.meridiem;
      if (k) {
        for (var D = 1; D <= 24; D += 1)
          if (V.indexOf(k(D, 0, Y)) > -1) {
            M = D > 12;
            break;
          }
      } else
        M = V === (Y ? "pm" : "PM");
      return M;
    }, N = { A: [a, function(V) {
      this.afternoon = O(V, !1);
    }], a: [a, function(V) {
      this.afternoon = O(V, !0);
    }], Q: [l, function(V) {
      this.month = 3 * (V - 1) + 1;
    }], S: [l, function(V) {
      this.milliseconds = 100 * +V;
    }], SS: [v, function(V) {
      this.milliseconds = 10 * +V;
    }], SSS: [/\d{3}/, function(V) {
      this.milliseconds = +V;
    }], s: [u, m("seconds")], ss: [u, m("seconds")], m: [u, m("minutes")], mm: [u, m("minutes")], H: [u, m("hours")], h: [u, m("hours")], HH: [u, m("hours")], hh: [u, m("hours")], D: [u, m("day")], DD: [v, m("day")], Do: [a, function(V) {
      var Y = g.ordinal, M = V.match(/\d+/);
      if (this.day = M[0], Y)
        for (var k = 1; k <= 31; k += 1)
          Y(k).replace(/\[|\]/g, "") === V && (this.day = k);
    }], w: [u, m("week")], ww: [v, m("week")], M: [u, m("month")], MM: [v, m("month")], MMM: [a, function(V) {
      var Y = x("months"), M = (x("monthsShort") || Y.map(function(k) {
        return k.slice(0, 3);
      })).indexOf(V) + 1;
      if (M < 1)
        throw new Error();
      this.month = M % 12 || M;
    }], MMMM: [a, function(V) {
      var Y = x("months").indexOf(V) + 1;
      if (Y < 1)
        throw new Error();
      this.month = Y % 12 || Y;
    }], Y: [/[+-]?\d+/, m("year")], YY: [v, function(V) {
      this.year = h(V);
    }], YYYY: [/\d{4}/, m("year")], Z: y, ZZ: y };
    function F(V) {
      var Y, M;
      Y = V, M = g && g.formats;
      for (var k = (V = Y.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(E, _, G) {
        var Z = G && G.toUpperCase();
        return _ || M[G] || s[G] || M[Z].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(A, b, $) {
          return b || $.slice(1);
        });
      })).match(t), D = k.length, w = 0; w < D; w += 1) {
        var P = k[w], n = N[P], o = n && n[0], B = n && n[1];
        k[w] = B ? { regex: o, parser: B } : P.replace(/^\[|\]$/g, "");
      }
      return function(E) {
        for (var _ = {}, G = 0, Z = 0; G < D; G += 1) {
          var A = k[G];
          if (typeof A == "string")
            Z += A.length;
          else {
            var b = A.regex, $ = A.parser, C = E.slice(Z), S = b.exec(C)[0];
            $.call(_, S), E = E.replace(S, "");
          }
        }
        return function(I) {
          var R = I.afternoon;
          if (R !== void 0) {
            var U = I.hours;
            R ? U < 12 && (I.hours += 12) : U === 12 && (I.hours = 0), delete I.afternoon;
          }
        }(_), _;
      };
    }
    return function(V, Y, M) {
      M.p.customParseFormat = !0, V && V.parseTwoDigitYear && (h = V.parseTwoDigitYear);
      var k = Y.prototype, D = k.parse;
      k.parse = function(w) {
        var P = w.date, n = w.utc, o = w.args;
        this.$u = n;
        var B = o[1];
        if (typeof B == "string") {
          var E = o[2] === !0, _ = o[3] === !0, G = E || _, Z = o[2];
          _ && (Z = o[2]), g = this.$locale(), !E && Z && (g = M.Ls[Z]), this.$d = function(C, S, I, R) {
            try {
              if (["x", "X"].indexOf(S) > -1)
                return new Date((S === "X" ? 1e3 : 1) * C);
              var U = F(S)(C), X = U.year, ee = U.month, oe = U.day, de = U.hours, xe = U.minutes, ie = U.seconds, $e = U.milliseconds, ye = U.zone, re = U.week, me = /* @__PURE__ */ new Date(), be = oe || (X || ee ? 1 : me.getDate()), we = X || me.getFullYear(), Fe = 0;
              X && !ee || (Fe = ee > 0 ? ee - 1 : me.getMonth());
              var Be, p = de || 0, c = xe || 0, f = ie || 0, d = $e || 0;
              return ye ? new Date(Date.UTC(we, Fe, be, p, c, f, d + 60 * ye.offset * 1e3)) : I ? new Date(Date.UTC(we, Fe, be, p, c, f, d)) : (Be = new Date(we, Fe, be, p, c, f, d), re && (Be = R(Be).week(re).toDate()), Be);
            } catch {
              return /* @__PURE__ */ new Date("");
            }
          }(P, B, n, M), this.init(), Z && Z !== !0 && (this.$L = this.locale(Z).$L), G && P != this.format(B) && (this.$d = /* @__PURE__ */ new Date("")), g = {};
        } else if (B instanceof Array)
          for (var A = B.length, b = 1; b <= A; b += 1) {
            o[1] = B[b - 1];
            var $ = M.apply(this, o);
            if ($.isValid()) {
              this.$d = $.$d, this.$L = $.$L, this.init();
              break;
            }
            b === A && (this.$d = /* @__PURE__ */ new Date(""));
          }
        else
          D.call(this, w);
      };
    };
  });
})(Bt);
var zo = Bt.exports;
const Wo = /* @__PURE__ */ Ye(zo);
var Nt = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    return function(s, t, l) {
      t.prototype.isToday = function() {
        var v = "YYYY-MM-DD", u = l();
        return this.format(v) === u.format(v);
      };
    };
  });
})(Nt);
var Ko = Nt.exports;
const Go = /* @__PURE__ */ Ye(Ko);
var Rt = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    return function(s, t, l) {
      t.prototype.isBetween = function(v, u, a, g) {
        var h = l(v), m = l(u), y = (g = g || "()")[0] === "(", x = g[1] === ")";
        return (y ? this.isAfter(h, a) : !this.isBefore(h, a)) && (x ? this.isBefore(m, a) : !this.isAfter(m, a)) || (y ? this.isBefore(h, a) : !this.isAfter(h, a)) && (x ? this.isAfter(m, a) : !this.isBefore(m, a));
      };
    };
  });
})(Rt);
var Zo = Rt.exports;
const qo = /* @__PURE__ */ Ye(Zo);
var It = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    var s, t, l = 1e3, v = 6e4, u = 36e5, a = 864e5, g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, h = 31536e6, m = 2628e6, y = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, x = { years: h, months: m, days: a, hours: u, minutes: v, seconds: l, milliseconds: 1, weeks: 6048e5 }, O = function(P) {
      return P instanceof D;
    }, N = function(P, n, o) {
      return new D(P, o, n.$l);
    }, F = function(P) {
      return t.p(P) + "s";
    }, V = function(P) {
      return P < 0;
    }, Y = function(P) {
      return V(P) ? Math.ceil(P) : Math.floor(P);
    }, M = function(P) {
      return Math.abs(P);
    }, k = function(P, n) {
      return P ? V(P) ? { negative: !0, format: "" + M(P) + n } : { negative: !1, format: "" + P + n } : { negative: !1, format: "" };
    }, D = function() {
      function P(o, B, E) {
        var _ = this;
        if (this.$d = {}, this.$l = E, o === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), B)
          return N(o * x[F(B)], this);
        if (typeof o == "number")
          return this.$ms = o, this.parseFromMilliseconds(), this;
        if (typeof o == "object")
          return Object.keys(o).forEach(function(A) {
            _.$d[F(A)] = o[A];
          }), this.calMilliseconds(), this;
        if (typeof o == "string") {
          var G = o.match(y);
          if (G) {
            var Z = G.slice(2).map(function(A) {
              return A != null ? Number(A) : 0;
            });
            return this.$d.years = Z[0], this.$d.months = Z[1], this.$d.weeks = Z[2], this.$d.days = Z[3], this.$d.hours = Z[4], this.$d.minutes = Z[5], this.$d.seconds = Z[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var n = P.prototype;
      return n.calMilliseconds = function() {
        var o = this;
        this.$ms = Object.keys(this.$d).reduce(function(B, E) {
          return B + (o.$d[E] || 0) * x[E];
        }, 0);
      }, n.parseFromMilliseconds = function() {
        var o = this.$ms;
        this.$d.years = Y(o / h), o %= h, this.$d.months = Y(o / m), o %= m, this.$d.days = Y(o / a), o %= a, this.$d.hours = Y(o / u), o %= u, this.$d.minutes = Y(o / v), o %= v, this.$d.seconds = Y(o / l), o %= l, this.$d.milliseconds = o;
      }, n.toISOString = function() {
        var o = k(this.$d.years, "Y"), B = k(this.$d.months, "M"), E = +this.$d.days || 0;
        this.$d.weeks && (E += 7 * this.$d.weeks);
        var _ = k(E, "D"), G = k(this.$d.hours, "H"), Z = k(this.$d.minutes, "M"), A = this.$d.seconds || 0;
        this.$d.milliseconds && (A += this.$d.milliseconds / 1e3, A = Math.round(1e3 * A) / 1e3);
        var b = k(A, "S"), $ = o.negative || B.negative || _.negative || G.negative || Z.negative || b.negative, C = G.format || Z.format || b.format ? "T" : "", S = ($ ? "-" : "") + "P" + o.format + B.format + _.format + C + G.format + Z.format + b.format;
        return S === "P" || S === "-P" ? "P0D" : S;
      }, n.toJSON = function() {
        return this.toISOString();
      }, n.format = function(o) {
        var B = o || "YYYY-MM-DDTHH:mm:ss", E = { Y: this.$d.years, YY: t.s(this.$d.years, 2, "0"), YYYY: t.s(this.$d.years, 4, "0"), M: this.$d.months, MM: t.s(this.$d.months, 2, "0"), D: this.$d.days, DD: t.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: t.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: t.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: t.s(this.$d.seconds, 2, "0"), SSS: t.s(this.$d.milliseconds, 3, "0") };
        return B.replace(g, function(_, G) {
          return G || String(E[_]);
        });
      }, n.as = function(o) {
        return this.$ms / x[F(o)];
      }, n.get = function(o) {
        var B = this.$ms, E = F(o);
        return E === "milliseconds" ? B %= 1e3 : B = E === "weeks" ? Y(B / x[E]) : this.$d[E], B || 0;
      }, n.add = function(o, B, E) {
        var _;
        return _ = B ? o * x[F(B)] : O(o) ? o.$ms : N(o, this).$ms, N(this.$ms + _ * (E ? -1 : 1), this);
      }, n.subtract = function(o, B) {
        return this.add(o, B, !0);
      }, n.locale = function(o) {
        var B = this.clone();
        return B.$l = o, B;
      }, n.clone = function() {
        return N(this.$ms, this);
      }, n.humanize = function(o) {
        return s().add(this.$ms, "ms").locale(this.$l).fromNow(!o);
      }, n.valueOf = function() {
        return this.asMilliseconds();
      }, n.milliseconds = function() {
        return this.get("milliseconds");
      }, n.asMilliseconds = function() {
        return this.as("milliseconds");
      }, n.seconds = function() {
        return this.get("seconds");
      }, n.asSeconds = function() {
        return this.as("seconds");
      }, n.minutes = function() {
        return this.get("minutes");
      }, n.asMinutes = function() {
        return this.as("minutes");
      }, n.hours = function() {
        return this.get("hours");
      }, n.asHours = function() {
        return this.as("hours");
      }, n.days = function() {
        return this.get("days");
      }, n.asDays = function() {
        return this.as("days");
      }, n.weeks = function() {
        return this.get("weeks");
      }, n.asWeeks = function() {
        return this.as("weeks");
      }, n.months = function() {
        return this.get("months");
      }, n.asMonths = function() {
        return this.as("months");
      }, n.years = function() {
        return this.get("years");
      }, n.asYears = function() {
        return this.as("years");
      }, P;
    }(), w = function(P, n, o) {
      return P.add(n.years() * o, "y").add(n.months() * o, "M").add(n.days() * o, "d").add(n.hours() * o, "h").add(n.minutes() * o, "m").add(n.seconds() * o, "s").add(n.milliseconds() * o, "ms");
    };
    return function(P, n, o) {
      s = o, t = o().$utils(), o.duration = function(_, G) {
        var Z = o.locale();
        return N(_, { $l: Z }, G);
      }, o.isDuration = O;
      var B = n.prototype.add, E = n.prototype.subtract;
      n.prototype.add = function(_, G) {
        return O(_) ? w(this, _, 1) : B.bind(this)(_, G);
      }, n.prototype.subtract = function(_, G) {
        return O(_) ? w(this, _, -1) : E.bind(this)(_, G);
      };
    };
  });
})(It);
var Jo = It.exports;
const Xo = /* @__PURE__ */ Ye(Jo);
var Ht = { exports: {} };
(function(e, r) {
  (function(s, t) {
    e.exports = t();
  })(Ce, function() {
    var s = "week", t = "year";
    return function(l, v, u) {
      var a = v.prototype;
      a.week = function(g) {
        if (g === void 0 && (g = null), g !== null)
          return this.add(7 * (g - this.week()), "day");
        var h = this.$locale().yearStart || 1;
        if (this.month() === 11 && this.date() > 25) {
          var m = u(this).startOf(t).add(1, t).date(h), y = u(this).endOf(s);
          if (m.isBefore(y))
            return 1;
        }
        var x = u(this).startOf(t).date(h).startOf(s).subtract(1, "millisecond"), O = this.diff(x, s, !0);
        return O < 0 ? u(this).startOf("week").week() : Math.ceil(O);
      }, a.weeks = function(g) {
        return g === void 0 && (g = null), this.week(g);
      };
    };
  });
})(Ht);
var Qo = Ht.exports;
const er = /* @__PURE__ */ Ye(Qo);
function ke(e, r) {
  const s = De(e, r);
  if (!s)
    throw new Error(`Could not resolve ${e.description}`);
  return s;
}
const bt = Object.fromEntries(
  Object.entries(/* @__PURE__ */ Object.assign({ "../node_modules/dayjs/esm/locale/af.js": () => import("./af-3f5e3754.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/am.js": () => import("./am-bc833d79.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-dz.js": () => import("./ar-dz-2b677c27.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-iq.js": () => import("./ar-iq-9280b179.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-kw.js": () => import("./ar-kw-06673fb3.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-ly.js": () => import("./ar-ly-b364c556.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-ma.js": () => import("./ar-ma-e9b96f88.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-sa.js": () => import("./ar-sa-920b6966.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar-tn.js": () => import("./ar-tn-5d2ebe87.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ar.js": () => import("./ar-a3aa818f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/az.js": () => import("./az-659b56f9.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/be.js": () => import("./be-3b4f9783.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bg.js": () => import("./bg-406145d9.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bi.js": () => import("./bi-951682c2.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bm.js": () => import("./bm-9d7e855b.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bn-bd.js": () => import("./bn-bd-087a7a1c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bn.js": () => import("./bn-0c0acd44.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bo.js": () => import("./bo-19632568.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/br.js": () => import("./br-5a3443b7.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/bs.js": () => import("./bs-ad641200.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ca.js": () => import("./ca-035ea682.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/cs.js": () => import("./cs-debeec9e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/cv.js": () => import("./cv-dcf48c54.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/cy.js": () => import("./cy-daa2e33d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/da.js": () => import("./da-3c1144ee.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/de-at.js": () => import("./de-at-5acf665a.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/de-ch.js": () => import("./de-ch-6b981a67.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/de.js": () => import("./de-77586bc3.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/dv.js": () => import("./dv-65849a7f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/el.js": () => import("./el-ae4ad393.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-au.js": () => import("./en-au-a066127b.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-ca.js": () => import("./en-ca-c5437740.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-gb.js": () => import("./en-gb-c2cc134a.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-ie.js": () => import("./en-ie-d3ac9ac2.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-il.js": () => import("./en-il-6dd24280.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-in.js": () => import("./en-in-2f2879f3.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-nz.js": () => import("./en-nz-c996ce95.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-sg.js": () => import("./en-sg-278f7244.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en-tt.js": () => import("./en-tt-dcca6678.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/en.js": () => import("./en-4402d6fc.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/eo.js": () => import("./eo-2b962c7e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/es-do.js": () => import("./es-do-e5ec18dc.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/es-mx.js": () => import("./es-mx-0b0fdda9.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/es-pr.js": () => import("./es-pr-ecf92870.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/es-us.js": () => import("./es-us-9a974819.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/es.js": () => import("./es-542d397d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/et.js": () => import("./et-cc745c6f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/eu.js": () => import("./eu-1819a0bf.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fa.js": () => import("./fa-759da5ca.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fi.js": () => import("./fi-48c34162.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fo.js": () => import("./fo-1a56e22a.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fr-ca.js": () => import("./fr-ca-a08d1ab6.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fr-ch.js": () => import("./fr-ch-9e54ac3f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fr.js": () => import("./fr-34da226b.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/fy.js": () => import("./fy-32e86ec3.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ga.js": () => import("./ga-e14bb9af.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/gd.js": () => import("./gd-525324a8.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/gl.js": () => import("./gl-ecd4c576.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/gom-latn.js": () => import("./gom-latn-0de894a4.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/gu.js": () => import("./gu-f8a9ff06.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/he.js": () => import("./he-c3d5738f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/hi.js": () => import("./hi-06d9d378.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/hr.js": () => import("./hr-df6e22c2.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ht.js": () => import("./ht-560ce1fa.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/hu.js": () => import("./hu-36659a19.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/hy-am.js": () => import("./hy-am-ec1e6b6f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/id.js": () => import("./id-e83ede43.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/is.js": () => import("./is-112d618e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/it-ch.js": () => import("./it-ch-74dc20fb.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/it.js": () => import("./it-a9bef34d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ja.js": () => import("./ja-81ac0bce.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/jv.js": () => import("./jv-eb80b191.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ka.js": () => import("./ka-408178cc.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/kk.js": () => import("./kk-7182d80c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/km.js": () => import("./km-c8d90f37.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/kn.js": () => import("./kn-1ef13da8.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ko.js": () => import("./ko-d74dbac1.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ku.js": () => import("./ku-217c312b.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ky.js": () => import("./ky-9beeab3e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/lb.js": () => import("./lb-bbb0769c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/lo.js": () => import("./lo-c0a222fc.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/lt.js": () => import("./lt-7733040c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/lv.js": () => import("./lv-8456bf8c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/me.js": () => import("./me-60049fb4.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/mi.js": () => import("./mi-a00211ea.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/mk.js": () => import("./mk-750f2eb3.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ml.js": () => import("./ml-3d864495.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/mn.js": () => import("./mn-c3b569a5.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/mr.js": () => import("./mr-caa70638.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ms-my.js": () => import("./ms-my-9edfd210.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ms.js": () => import("./ms-8a0b04c8.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/mt.js": () => import("./mt-5924bb24.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/my.js": () => import("./my-7ec0e79b.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/nb.js": () => import("./nb-55474232.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ne.js": () => import("./ne-28b71d4d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/nl-be.js": () => import("./nl-be-ab2f9375.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/nl.js": () => import("./nl-f2df7562.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/nn.js": () => import("./nn-ae0c69b8.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/oc-lnc.js": () => import("./oc-lnc-e86add7d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/pa-in.js": () => import("./pa-in-58db4e88.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/pl.js": () => import("./pl-6123f464.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/pt-br.js": () => import("./pt-br-72da3648.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/pt.js": () => import("./pt-6d21f766.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/rn.js": () => import("./rn-fe91690b.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ro.js": () => import("./ro-f0333df1.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ru.js": () => import("./ru-8092165f.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/rw.js": () => import("./rw-8e49f17e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sd.js": () => import("./sd-f5f464cc.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/se.js": () => import("./se-d0247819.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/si.js": () => import("./si-23229411.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sk.js": () => import("./sk-2ae651e5.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sl.js": () => import("./sl-d651cb86.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sq.js": () => import("./sq-851e451a.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sr-cyrl.js": () => import("./sr-cyrl-150c337e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sr.js": () => import("./sr-26ffbdc9.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ss.js": () => import("./ss-70c27ddd.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sv-fi.js": () => import("./sv-fi-53a8b8bd.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sv.js": () => import("./sv-bf43bdc9.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/sw.js": () => import("./sw-3c86b419.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ta.js": () => import("./ta-dde447c0.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/te.js": () => import("./te-d039e67a.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tet.js": () => import("./tet-2478e8c8.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tg.js": () => import("./tg-374d7196.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/th.js": () => import("./th-cfb73f82.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tk.js": () => import("./tk-6502e590.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tl-ph.js": () => import("./tl-ph-f36e80af.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tlh.js": () => import("./tlh-6d81a812.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tr.js": () => import("./tr-1608d107.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tzl.js": () => import("./tzl-e019f0a0.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tzm-latn.js": () => import("./tzm-latn-4a3fedcb.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/tzm.js": () => import("./tzm-9a26d476.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ug-cn.js": () => import("./ug-cn-7370b4b7.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/uk.js": () => import("./uk-f2be452c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/ur.js": () => import("./ur-5e01f781.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/uz-latn.js": () => import("./uz-latn-ec9b852e.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/uz.js": () => import("./uz-f44d7936.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/vi.js": () => import("./vi-8106a30d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/x-pseudo.js": () => import("./x-pseudo-20ac0200.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/yo.js": () => import("./yo-45cb4db7.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/zh-cn.js": () => import("./zh-cn-7af2941c.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/zh-hk.js": () => import("./zh-hk-e8e3af02.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/zh-tw.js": () => import("./zh-tw-58dac95d.js").then((e) => e.default), "../node_modules/dayjs/esm/locale/zh.js": () => import("./zh-26803c4f.js").then((e) => e.default) })).map(
    ([e, r]) => {
      var s;
      return [(s = e.match(/([\w-]*)\.js$/)) == null ? void 0 : s[1], r];
    }
  )
), tr = { class: "flex justify-between items-center px-2 py-1.5" }, or = { class: "shrink-0" }, rr = { class: "inline-flex rounded-full" }, ar = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, nr = ["d"], sr = { class: "px-1.5 space-x-1.5 flex flex-1" }, lr = { class: "flex-1 flex rounded-md" }, ur = ["textContent"], dr = { class: "flex-1 flex rounded-md" }, ir = ["textContent"], cr = { class: "shrink-0" }, fr = { class: "inline-flex rounded-full" }, mr = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, pr = ["d"], Ze = /* @__PURE__ */ ue({
  __name: "Header",
  props: {
    panel: {},
    calendar: {}
  },
  setup(e) {
    return (r, s) => (W(), q("div", tr, [
      T("div", or, [
        fe(T("span", rr, [
          T("button", {
            type: "button",
            class: "p-1.5 rounded-full bg-white text-vtd-secondary-600 transition-colors border border-transparent hover:bg-vtd-secondary-100 hover:text-vtd-secondary-900 focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring-3 focus:ring-vtd-primary-500/10 focus:outline-hidden dark:bg-vtd-secondary-800 dark:text-vtd-secondary-300 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-secondary-300 dark:focus:bg-vtd-secondary-600/50 dark:focus:text-vtd-secondary-100 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-25",
            onClick: s[0] || (s[0] = (t) => r.panel.calendar ? r.calendar.onPrevious() : r.calendar.onPreviousYear())
          }, [
            (W(), q("svg", ar, [
              T("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "1.5",
                d: r.panel.calendar ? "M15 19l-7-7 7-7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
              }, null, 8, nr)
            ]))
          ])
        ], 512), [
          [pe, r.panel.calendar || r.panel.year]
        ])
      ]),
      T("div", sr, [
        T("span", lr, [
          T("button", {
            type: "button",
            class: "px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-vtd-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-vtd-secondary-100 hover:text-vtd-secondary-900 focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring-3 focus:ring-vtd-primary-500/10 focus:outline-hidden uppercase dark:bg-vtd-secondary-800 dark:text-vtd-secondary-300 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-secondary-300 dark:focus:bg-vtd-secondary-600/50 dark:focus:text-vtd-secondary-100 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-25",
            onClick: s[1] || (s[1] = (t) => r.calendar.openMonth()),
            textContent: ae(r.calendar.month)
          }, null, 8, ur)
        ]),
        T("span", dr, [
          T("button", {
            type: "button",
            class: "px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-vtd-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-vtd-secondary-100 hover:text-vtd-secondary-900 focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring-3 focus:ring-vtd-primary-500/10 focus:outline-hidden uppercase dark:bg-vtd-secondary-800 dark:text-vtd-secondary-300 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-secondary-300 dark:focus:bg-vtd-secondary-600/50 dark:focus:text-vtd-secondary-100 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-25",
            onClick: s[2] || (s[2] = (t) => r.calendar.openYear()),
            textContent: ae(r.calendar.year)
          }, null, 8, ir)
        ])
      ]),
      T("div", cr, [
        fe(T("span", fr, [
          T("button", {
            type: "button",
            class: "p-1.5 rounded-full bg-white text-vtd-secondary-600 transition-colors border border-transparent hover:bg-vtd-secondary-100 hover:text-vtd-secondary-900 focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring-3 focus:ring-vtd-primary-500/10 focus:outline-hidden dark:bg-vtd-secondary-800 dark:text-vtd-secondary-300 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-secondary-300 dark:focus:bg-vtd-secondary-600/50 dark:focus:text-vtd-secondary-100 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-25",
            onClick: s[3] || (s[3] = (t) => r.panel.calendar ? r.calendar.onNext() : r.calendar.onNextYear())
          }, [
            (W(), q("svg", mr, [
              T("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "1.5",
                d: r.panel.calendar ? "M9 5l7 7-7 7" : "M13 5l7 7-7 7M5 5l7 7-7 7"
              }, null, 8, pr)
            ]))
          ])
        ], 512), [
          [pe, r.panel.calendar || r.panel.year]
        ])
      ])
    ]));
  }
}), Ut = Symbol("isBetweenRange"), zt = Symbol(
  "betweenRangeClasses"
), Wt = Symbol("datepickerClasses"), Kt = Symbol("atMouseOver"), Gt = Symbol("setToToday"), Zt = Symbol("setToYesterday"), qt = Symbol("setToLastDay"), Jt = Symbol("setToThisMonth"), Xt = Symbol("setToLastMonth"), Qt = Symbol("setToCustomShortcut"), vr = {
  key: 0,
  class: "relative w-full border-t border-b-0 sm:border-t-0 sm:border-b lg:border-b-0 lg:border-r border-black/10 order-last sm:order-0 dark:border-vtd-secondary-700 sm:mt-1 lg:mr-1 sm:mb-1 lg:mb-0 sm:mx-1 lg:mx-0 sm:w-auto"
}, hr = {
  key: 0,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-5 sm:pr-6 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
}, yr = ["onClick", "textContent"], br = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-5 sm:pr-6 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
}, gt = /* @__PURE__ */ ue({
  __name: "Shortcut",
  props: {
    shortcuts: { type: [Boolean, Function] },
    close: { type: Function },
    asRange: { type: Boolean },
    asSingle: { type: Boolean },
    i18n: {}
  },
  setup(e) {
    const r = e, s = ke(Gt), t = ke(Zt), l = ke(qt), v = ke(Jt), u = ke(Xt), a = ke(Qt), g = le(() => typeof r.shortcuts == "function" ? r.shortcuts() : !1);
    return (h, m) => r.asRange && r.asSingle || r.asRange && !r.asSingle ? (W(), q("div", vr, [
      g.value ? (W(), q("ol", hr, [
        (W(!0), q(ge, null, Ke(g.value, (y, x) => (W(), q("li", { key: x }, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: _e((O) => se(a)(y, h.close), ["prevent"]),
            textContent: ae(y.label)
          }, null, 8, yr)
        ]))), 128))
      ])) : (W(), q("ol", br, [
        T("li", null, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: m[0] || (m[0] = _e((y) => se(s)(h.close), ["prevent"]))
          }, ae(r.i18n.today), 1)
        ]),
        T("li", null, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: m[1] || (m[1] = _e((y) => se(t)(h.close), ["prevent"]))
          }, ae(r.i18n.yesterday), 1)
        ]),
        T("li", null, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: m[2] || (m[2] = _e((y) => se(l)(7, h.close), ["prevent"]))
          }, ae(r.i18n.past(7)), 1)
        ]),
        T("li", null, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: m[3] || (m[3] = _e((y) => se(l)(30, h.close), ["prevent"]))
          }, ae(r.i18n.past(30)), 1)
        ]),
        T("li", null, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: m[4] || (m[4] = _e((y) => se(v)(h.close), ["prevent"]))
          }, ae(r.i18n.currentMonth), 1)
        ]),
        T("li", null, [
          T("a", {
            href: "#",
            class: "vtd-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded-sm text-vtd-primary-600 hover:text-vtd-primary-700 transition-colors hover:bg-vtd-secondary-100 focus:bg-vtd-secondary-100 focus:text-vtd-primary-600 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-primary-300 dark:text-vtd-primary-400 dark:focus:bg-vtd-secondary-700 dark:focus:text-vtd-primary-300",
            onClick: m[5] || (m[5] = _e((y) => se(u)(h.close), ["prevent"]))
          }, ae(r.i18n.pastMonth), 1)
        ])
      ]))
    ])) : he("", !0);
  }
}), gr = { class: "grid grid-cols-7 gap-y-0.5 my-1" }, xr = {
  key: 0,
  class: "col-span-7 border-b relative dark:border-vtd-secondary-600"
}, wr = { class: "absolute -left-2 top-1/2 -translate-y-2/4 bg-white dark:bg-vtd-secondary-800 text-[8px] pr-2 text-vtd-secondary-400" }, kr = ["data-tooltip"], jr = ["disabled", "data-date", "onClick", "onMouseenter", "onFocusin", "textContent"], qe = /* @__PURE__ */ ue({
  __name: "Calendar",
  props: {
    calendar: {},
    weeks: {},
    weekNumber: { type: Boolean },
    asRange: { type: Boolean }
  },
  emits: ["updateDate"],
  setup(e, { emit: r }) {
    const s = r, t = ke(Ut), l = ke(zt), v = ke(Wt), u = ke(Kt);
    return (a, g) => (W(), q("div", gr, [
      te(ao, {
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "enter-active-class": "transition-opacity ease-out duration-300",
        "leave-active-class": "transition-opacity ease-in duration-200",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: Ne(() => [
          (W(!0), q(ge, null, Ke(a.calendar.date(), (h, m) => (W(), q(ge, { key: m }, [
            m % 7 === 0 && a.weekNumber ? (W(), q("div", xr, [
              T("span", wr, ae(h.week()), 1)
            ])) : he("", !0),
            T("div", {
              class: Te(["relative", { "vtd-tooltip": a.asRange && h.duration() }]),
              "data-tooltip": `${h.duration()}`
            }, [
              te(wt, {
                "enter-from-class": "opacity-0",
                "enter-to-class": "opacity-100",
                "enter-active-class": "transition-opacity ease-out duration-200",
                "leave-active-class": "transition-opacity ease-in duration-150",
                "leave-from-class": "opacity-100",
                "leave-to-class": "opacity-0"
              }, {
                default: Ne(() => [
                  se(t)(h) || h.hovered() ? (W(), q("span", {
                    key: 0,
                    class: Te(["absolute bg-vtd-primary-100 bg-opacity-60 dark:bg-vtd-secondary-700/50", se(l)(h)])
                  }, null, 2)) : he("", !0)
                ]),
                _: 2
              }, 1024),
              T("button", {
                type: "button",
                class: Te(["vtd-datepicker-date relative w-[2.7rem] h-[2.7rem] lg:w-10 lg:h-10 flex justify-center items-center text-xs 2xl:text-sm", [
                  se(v)(h),
                  a.asRange ? "transition-all" : "transition-colors"
                ]]),
                disabled: h.disabled || h.inRange(),
                "data-date": h.toDate(),
                onClick: (y) => s("updateDate", h),
                onMouseenter: (y) => se(u)(h),
                onFocusin: (y) => se(u)(h),
                textContent: ae(h.date())
              }, null, 42, jr)
            ], 10, kr)
          ], 64))), 128))
        ]),
        _: 1
      })
    ]));
  }
}), $r = { class: "flex flex-wrap" }, _r = { class: "flex rounded-md mt-1.5" }, Mr = ["onClick", "textContent"], Je = /* @__PURE__ */ ue({
  __name: "Year",
  props: {
    years: {}
  },
  emits: ["updateYear"],
  setup(e, { emit: r }) {
    const s = r;
    return (t, l) => (W(), q("div", $r, [
      (W(!0), q(ge, null, Ke(t.years, (v, u) => (W(), q("div", {
        key: u,
        class: "w-1/2 px-0.5"
      }, [
        T("span", _r, [
          T("button", {
            type: "button",
            class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-vtd-secondary-600 font-medium transition-colors border border-transparent hover:bg-vtd-secondary-100 hover:text-vtd-secondary-900 focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring-3 focus:ring-vtd-primary-500/10 focus:outline-hidden uppercase dark:bg-vtd-secondary-800 dark:hover:bg-vtd-secondary-700 dark:text-vtd-secondary-300 dark:hover:text-vtd-secondary-100 dark:focus:bg-vtd-secondary-700",
            onClick: (a) => s("updateYear", v),
            textContent: ae(v)
          }, null, 8, Mr)
        ])
      ]))), 128))
    ]));
  }
}), Sr = { class: "grid grid-cols-7 py-2 mt-0.5" }, Dr = ["textContent"], Xe = /* @__PURE__ */ ue({
  __name: "Week",
  props: {
    weeks: {}
  },
  setup(e) {
    return (r, s) => (W(), q("div", Sr, [
      (W(!0), q(ge, null, Ke(r.weeks, (t, l) => (W(), q("div", {
        key: l,
        class: "text-vtd-secondary-500 text-xs 2xl:text-sm tracking-wide font-medium text-center cursor-default dark:text-vtd-secondary-400"
      }, [
        T("span", {
          textContent: ae(t)
        }, null, 8, Dr)
      ]))), 128))
    ]));
  }
}), Pr = { class: "flex flex-wrap mt-1.5" }, Or = { class: "flex rounded-md mt-1.5" }, Vr = ["onClick", "textContent"], Qe = /* @__PURE__ */ ue({
  __name: "Month",
  props: {
    months: {}
  },
  emits: ["updateMonth"],
  setup(e, { emit: r }) {
    const s = r;
    return (t, l) => (W(), q("div", Pr, [
      (W(!0), q(ge, null, Ke(t.months, (v, u) => (W(), q("div", {
        key: u,
        class: "w-1/2 px-0.5"
      }, [
        T("span", Or, [
          T("button", {
            type: "button",
            class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-vtd-secondary-600 font-medium transition-colors border border-transparent hover:bg-vtd-secondary-100 hover:text-vtd-secondary-900 focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring-3 focus:ring-vtd-primary-500/10 focus:outline-hidden uppercase dark:bg-vtd-secondary-800 dark:hover:bg-vtd-secondary-700 dark:text-vtd-secondary-300 dark:hover:text-vtd-secondary-100 dark:focus:bg-vtd-secondary-700",
            onClick: (a) => s("updateMonth", u),
            textContent: ae(v)
          }, null, 8, Vr)
        ])
      ]))), 128))
    ]));
  }
});
function Tr() {
  const e = (a) => {
    const g = [], h = a.localeData().firstDayOfWeek();
    for (let m = 0; m <= a.date(0 - h).day(); m++)
      g.push(a.date(0).subtract(m, "day"));
    return g.sort((m, y) => m.date() - y.date());
  };
  return {
    usePreviousDate: e,
    useCurrentDate: (a) => Array.from(
      {
        length: a.daysInMonth()
      },
      (g, h) => a.date(h + 1)
    ),
    useNextDate: (a) => {
      const g = [];
      for (let h = 1; h <= 42 - (e(a).length + a.daysInMonth()); h++)
        g.push(a.date(h).month(a.month()).add(1, "month"));
      return g;
    },
    useDisableDate: (a, { disableDate: g }) => typeof g == "function" ? g(a.toDate()) : !1,
    useBetweenRange: (a, { previous: g, next: h }) => {
      const m = g.isAfter(h, "date") ? "(]" : "[)";
      return !!(a.isBetween(g, h, "date", m) && !a.off);
    },
    useToValueFromString: (a, { formatter: g }) => a.format(g.date),
    useToValueFromArray: ({ previous: a, next: g }, {
      formatter: h,
      separator: m
    }) => `${a.format(h.date)}${m}${g.format(
      h.date
    )}`
  };
}
function Ar() {
  return {
    useVisibleViewport: (r) => {
      if (r) {
        const { right: s } = r.getBoundingClientRect(), t = window.innerWidth || document.documentElement.clientWidth;
        return s > t;
      } else
        return null;
    }
  };
}
const Cr = ["disabled", "placeholder"], Yr = { class: "absolute inset-y-0 right-0 inline-flex items-center rounded-md overflow-hidden" }, Er = ["disabled"], Lr = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Fr = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M6 18L18 6M6 6l12 12"
}, Br = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
}, Nr = { class: "flex flex-wrap lg:flex-nowrap" }, Rr = { class: "relative flex flex-wrap sm:flex-nowrap p-1 w-full" }, Ir = {
  key: 0,
  class: "hidden h-full absolute inset-0 sm:flex justify-center items-center"
}, Hr = { class: "px-0.5 sm:px-2" }, Ur = {
  key: 1,
  class: "relative w-full md:w-1/2 lg:w-80 overflow-hidden mt-3 sm:mt-0 sm:ml-2"
}, zr = { class: "px-0.5 sm:px-2" }, Wr = { key: 0 }, Kr = { class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-vtd-secondary-700/[1]" }, Gr = { class: "mt-1.5 sm:flex sm:flex-row-reverse" }, Zr = ["disabled", "onClick", "textContent"], qr = ["onClick", "textContent"], Jr = {
  key: 1,
  class: "sm:hidden"
}, Xr = { class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-vtd-secondary-700/[1]" }, Qr = { class: "mt-1.5 sm:flex sm:flex-row-reverse" }, ea = ["onClick", "textContent"], ta = {
  key: 1,
  class: "flex"
}, oa = { class: "bg-white rounded-lg shadow-sm border border-black/[.1] px-3 py-3 sm:px-4 sm:py-4 dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700/[1]" }, ra = { class: "flex flex-wrap lg:flex-nowrap" }, aa = { class: "relative flex flex-wrap sm:flex-nowrap p-1 w-full" }, na = {
  key: 0,
  class: "hidden h-full absolute inset-0 sm:flex justify-center items-center"
}, sa = { class: "px-0.5 sm:px-2" }, la = {
  key: 1,
  class: "relative w-full md:w-1/2 lg:w-80 overflow-hidden mt-3 sm:mt-0 sm:ml-2"
}, ua = { class: "px-0.5 sm:px-2" }, da = { key: 0 }, ia = { class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-vtd-secondary-700/[1]" }, ca = { class: "mt-1.5 sm:flex sm:flex-row-reverse" }, fa = ["disabled", "textContent"], va = /* @__PURE__ */ ue({
  __name: "VueTailwindDatePicker",
  props: {
    noInput: { type: Boolean },
    overlay: { type: Boolean },
    asSingle: { type: Boolean },
    useRange: { type: Boolean },
    placeholder: { default: "" },
    i18n: { default: "en" },
    inputClasses: { default: "" },
    disabled: { type: Boolean, default: !1 },
    disableInRange: { type: Boolean, default: !1 },
    disableDate: { type: [Boolean, Function], default: !1 },
    autoApply: { type: Boolean, default: !0 },
    shortcuts: { type: [Boolean, Function], default: !0 },
    separator: { default: " ~ " },
    formatter: { default: () => ({
      date: "YYYY-MM-DD HH:mm:ss",
      month: "MMM"
    }) },
    startFrom: { default: () => /* @__PURE__ */ new Date() },
    weekdaysSize: { default: "short" },
    weekNumber: { type: Boolean, default: !1 },
    options: { default: () => ({
      shortcuts: {
        today: "Today",
        yesterday: "Yesterday",
        past: (e) => `Last ${e} Days`,
        currentMonth: "This Month",
        pastMonth: "Last Month"
      },
      footer: {
        apply: "Apply",
        cancel: "Cancel"
      }
    }) },
    modelValue: { default: () => [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()] }
  },
  emits: ["update:modelValue", "selectMonth", "selectYear", "selectRightMonth", "selectRightYear", "clickPrev", "clickNext", "clickRightPrev", "clickRightNext"],
  setup(e, { expose: r, emit: s }) {
    const t = e, l = s, {
      useCurrentDate: v,
      useDisableDate: u,
      useBetweenRange: a,
      useNextDate: g,
      usePreviousDate: h,
      useToValueFromArray: m,
      useToValueFromString: y
    } = Tr(), { useVisibleViewport: x } = Ar();
    i.extend(Io), i.extend(Uo), i.extend(Wo), i.extend(Go), i.extend(qo), i.extend(Xo), i.extend(er);
    const O = J(null), N = J(null), F = J(null), V = J(""), Y = J(null), M = J(""), k = J([]), D = J([]), w = J(null), P = J(null), n = xt({
      previous: {
        calendar: !0,
        month: !1,
        year: !1
      },
      next: {
        calendar: !0,
        month: !1,
        year: !1
      }
    }), o = J({
      previous: i(),
      next: i().add(1, "month"),
      year: {
        previous: i().year(),
        next: i().year()
      },
      weeks: t.weekdaysSize === "min" ? i.weekdaysMin() : i.weekdaysShort(),
      months: t.formatter.month === "MMM" ? i.monthsShort() : i.months()
    }), B = le(() => o.value.weeks), E = le(() => o.value.months), _ = le(() => {
      const { previous: p, next: c, year: f } = se(o);
      return {
        previous: {
          date: () => h(p).concat(v(p)).concat(g(p)).map((d) => (Object.assign(d, {
            today: d.isToday(),
            active: p.month() === d.month(),
            off: p.month() !== d.month(),
            sunday: d.day() === 0,
            disabled: u(d, t) && !$(d),
            inRange: () => {
              if (t.asSingle && !t.useRange)
                return p.month() !== d.month();
            },
            hovered: () => b() && k.value.length > 1 ? (d.isBetween(
              k.value[0],
              k.value[1],
              "date",
              "()"
            ) || d.isBetween(
              k.value[1],
              k.value[0],
              "date",
              "(]"
            )) && p.month() === d.month() : !1,
            duration: () => !1
          }), d)),
          month: p && p.format(t.formatter.month),
          year: p && p.year(),
          years: () => Array.from(
            {
              length: 12
            },
            (d, j) => f.previous + j
          ),
          onPrevious: () => {
            o.value.previous = p.subtract(1, "month"), l("clickPrev", o.value.previous);
          },
          onNext: () => {
            o.value.previous = p.add(1, "month"), p.diff(c, "month") === -1 && (o.value.next = c.add(1, "month")), l("clickNext", o.value.previous);
          },
          onPreviousYear: () => {
            o.value.year.previous = o.value.year.previous - 12;
          },
          onNextYear: () => {
            o.value.year.previous = o.value.year.previous + 12;
          },
          openMonth: () => {
            n.previous.month = !n.previous.month, n.previous.year = !1, n.previous.calendar = !n.previous.month;
          },
          setMonth: (d) => {
            o.value.previous = p.month(d), n.previous.month = !n.previous.month, n.previous.year = !1, n.previous.calendar = !n.previous.month, l("selectMonth", o.value.previous), He(() => {
              (o.value.next.isSame(o.value.previous, "month") || o.value.next.isBefore(o.value.previous)) && (o.value.next = o.value.previous.add(1, "month")), o.value.year.next = o.value.next.year();
            });
          },
          openYear: () => {
            n.previous.year = !n.previous.year, n.previous.month = !1, n.previous.calendar = !n.previous.year;
          },
          setYear: (d) => {
            o.value.previous = p.year(d), n.previous.year = !n.previous.year, n.previous.calendar = !n.previous.year, l("selectYear", o.value.previous), He(() => {
              (o.value.next.isSame(o.value.previous, "month") || o.value.next.isBefore(o.value.previous)) && (o.value.next = o.value.previous.add(1, "month")), o.value.year.previous = o.value.previous.year(), o.value.year.next = o.value.next.year();
            });
          }
        },
        next: {
          date: () => h(c).concat(v(c)).concat(g(c)).map((d) => (Object.assign(d, {
            today: d.isToday(),
            active: c.month() === d.month(),
            off: c.month() !== d.month(),
            sunday: d.day() === 0,
            disabled: u(d, t) && !$(d),
            inRange: () => {
              if (t.asSingle && !t.useRange)
                return c.month() !== d.month();
            },
            hovered: () => k.value.length > 1 ? (d.isBetween(
              k.value[0],
              k.value[1],
              "date",
              "()"
            ) || d.isBetween(
              k.value[1],
              k.value[0],
              "date",
              "(]"
            )) && c.month() === d.month() : !1,
            duration: () => !1
          }), d)),
          month: c && c.format(t.formatter.month),
          year: c && c.year(),
          years: () => Array.from(
            {
              length: 12
            },
            (d, j) => f.next + j
          ),
          onPrevious: () => {
            o.value.next = c.subtract(1, "month"), c.diff(p, "month") === 1 && (o.value.previous = p.subtract(1, "month")), l("clickRightPrev", o.value.next);
          },
          onNext: () => {
            o.value.next = c.add(1, "month"), l("clickRightNext", o.value.next);
          },
          onPreviousYear: () => {
            o.value.year.next = o.value.year.next - 12;
          },
          onNextYear: () => {
            o.value.year.next = o.value.year.next + 12;
          },
          openMonth: () => {
            n.next.month = !n.next.month, n.next.year = !1, n.next.calendar = !n.next.month;
          },
          setMonth: (d) => {
            o.value.next = c.month(d), n.next.month = !n.next.month, n.next.year = !1, n.next.calendar = !n.next.month, l("selectRightMonth", o.value.next), He(() => {
              (o.value.previous.isSame(o.value.next, "month") || o.value.previous.isAfter(o.value.next)) && (o.value.previous = o.value.next.subtract(
                1,
                "month"
              )), o.value.year.previous = o.value.previous.year();
            });
          },
          openYear: () => {
            n.next.year = !n.next.year, n.next.month = !1, n.next.calendar = !n.next.year;
          },
          setYear: (d) => {
            o.value.next = c.year(d), n.next.year = !n.next.year, n.next.month = !1, n.next.calendar = !n.next.year, l("selectRightYear", o.value.next), He(() => {
              (o.value.previous.isSame(o.value.next, "month") || o.value.previous.isAfter(o.value.next)) && (o.value.previous = o.value.next.subtract(
                1,
                "month"
              )), o.value.year.previous = o.value.previous.year(), o.value.year.next = o.value.next.year();
            });
          }
        }
      };
    }), G = J(!1);
    setTimeout(() => {
      G.value = !0;
    }, 250);
    function Z() {
      return i().localeData().firstDayOfWeek();
    }
    function A(p) {
      const c = [...p], f = c.shift();
      return [...c, f];
    }
    function b() {
      return !t.useRange && !t.asSingle ? !0 : !t.useRange && t.asSingle ? !1 : t.useRange && !t.asSingle ? !0 : !!(t.useRange && t.asSingle);
    }
    function $(p) {
      if (t.disableInRange || typeof t.disableDate == "function" || M.value === "")
        return !1;
      let c, f;
      if (Array.isArray(t.modelValue)) {
        const [d, j] = t.modelValue;
        c = d, f = j;
      } else if (typeof t.modelValue == "object") {
        if (t.modelValue) {
          const [d, j] = Object.values(t.modelValue);
          c = d, f = j;
        }
      } else {
        const [d, j] = t.modelValue.split(t.separator);
        c = d, f = j;
      }
      return p.isBetween(
        i(c, t.formatter.date, !0),
        i(f, t.formatter.date, !0),
        "date",
        "[]"
      );
    }
    function C() {
      w.value = null, P.value = null, k.value = [], Y.value = null;
    }
    function S() {
      if (M.value = "", Array.isArray(t.modelValue))
        l("update:modelValue", []);
      else if (typeof t.modelValue == "object") {
        const p = {}, [c, f] = Object.keys(t.modelValue);
        p[c] = "", p[f] = "", l("update:modelValue", p);
      } else
        l("update:modelValue", "");
      D.value = [], N.value && N.value.focus();
    }
    r({ clearPicker: S });
    function I() {
      if (b()) {
        const [p, c] = M.value.split(t.separator), [f, d] = [
          i(p, t.formatter.date, !0),
          i(c, t.formatter.date, !0)
        ];
        if (f.isValid() && d.isValid())
          if (R(f), R(d), Array.isArray(t.modelValue))
            l("update:modelValue", [p, c]);
          else if (typeof t.modelValue == "object") {
            const j = {}, [L, K] = Object.keys(t.modelValue);
            j[L] = p, j[K] = c, l("update:modelValue", j);
          } else
            l(
              "update:modelValue",
              m(
                {
                  previous: f,
                  next: d
                },
                t
              )
            );
      } else {
        const p = i(M.value, t.formatter.date, !0);
        if (p.isValid())
          if (R(p), Array.isArray(t.modelValue))
            l("update:modelValue", [M.value]);
          else if (typeof t.modelValue == "object") {
            const c = {}, [f] = Object.keys(t.modelValue);
            c[f] = M.value, l("update:modelValue", c);
          } else
            l("update:modelValue", M.value);
      }
    }
    function R(p, c) {
      if (b())
        if (w.value)
          if (P.value = p, t.autoApply) {
            p.isBefore(w.value) ? M.value = m(
              {
                previous: p,
                next: w.value
              },
              t
            ) : M.value = m(
              {
                previous: w.value,
                next: p
              },
              t
            );
            const [f, d] = M.value.split(t.separator);
            if (Array.isArray(t.modelValue))
              l("update:modelValue", [
                i(f, t.formatter.date, !0).format(t.formatter.date),
                i(d, t.formatter.date, !0).format(t.formatter.date)
              ]);
            else if (typeof t.modelValue == "object") {
              const j = {}, [L, K] = Object.keys(t.modelValue);
              j[L] = f, j[K] = d, l("update:modelValue", j);
            } else
              l(
                "update:modelValue",
                m(
                  {
                    previous: i(f, t.formatter.date, !0),
                    next: i(d, t.formatter.date, !0)
                  },
                  t
                )
              );
            c && c(), D.value = [], i(f, t.formatter.date, !0).isSame(
              i(d, t.formatter.date, !0),
              "month"
            ) || (o.value.previous = i(f, t.formatter.date, !0), o.value.next = i(d, t.formatter.date, !0)), C();
          } else {
            w.value.isAfter(p, "month") ? D.value = [p, w.value] : D.value = [w.value, p];
            const [f, d] = D.value;
            f.isSame(d, "month") || (o.value.previous = f, o.value.next = d), C();
          }
        else
          D.value = [], w.value = p, Y.value = p, k.value.push(p), D.value.push(p), o.value.previous = p, o.value.next.isSame(p, "month") && (o.value.previous = o.value.next, o.value.next = p.add(1, "month"));
      else if (t.autoApply) {
        if (M.value = y(p, t), Array.isArray(t.modelValue))
          l("update:modelValue", [M.value]);
        else if (typeof t.modelValue == "object") {
          const f = {}, [d] = Object.keys(t.modelValue);
          f[d] = M.value, l("update:modelValue", f);
        } else
          l("update:modelValue", M.value);
        c && c(), D.value = [], C();
      } else
        D.value = [p], C();
    }
    function U(p) {
      if (D.value.length < 1)
        return !1;
      let c;
      if (b()) {
        const [f, d] = D.value;
        d.isBefore(f) ? c = m(
          {
            previous: d,
            next: f
          },
          t
        ) : c = m(
          {
            previous: f,
            next: d
          },
          t
        );
      } else {
        const [f] = D.value;
        c = f;
      }
      if (b()) {
        const [f, d] = c.split(t.separator);
        if (Array.isArray(t.modelValue))
          l("update:modelValue", [
            i(f, t.formatter.date, !0).format(t.formatter.date),
            i(d, t.formatter.date, !0).format(t.formatter.date)
          ]);
        else if (typeof t.modelValue == "object") {
          const j = {}, [L, K] = Object.keys(t.modelValue);
          j[L] = f, j[K] = d, l("update:modelValue", j);
        } else
          l(
            "update:modelValue",
            m(
              {
                previous: i(f, t.formatter.date, !0),
                next: i(d, t.formatter.date, !0)
              },
              t
            )
          );
        M.value = c;
      } else if (M.value = c.format(t.formatter.date), Array.isArray(t.modelValue))
        l("update:modelValue", [M.value]);
      else if (typeof t.modelValue == "object") {
        const f = {}, [d] = Object.keys(t.modelValue);
        f[d] = M.value, l("update:modelValue", f);
      } else
        l("update:modelValue", M.value);
      p && p();
    }
    function X(p) {
      if (!b())
        return !1;
      if (w.value)
        k.value = [w.value, p];
      else
        return k.value = [], !1;
    }
    function ee(p) {
      if (w.value && t.autoApply)
        return !1;
      let c, f;
      if (k.value.length > 1) {
        const [d, j] = k.value;
        c = i(d, t.formatter.date, !0), f = i(j, t.formatter.date, !0);
      } else if (Array.isArray(t.modelValue))
        if (t.autoApply) {
          const [d, j] = t.modelValue;
          c = d && i(d, t.formatter.date, !0), f = j && i(j, t.formatter.date, !0);
        } else {
          const [d, j] = D.value;
          c = i(d, t.formatter.date, !0), f = i(j, t.formatter.date, !0);
        }
      else if (typeof t.modelValue == "object")
        if (t.autoApply) {
          if (t.modelValue) {
            const [d, j] = Object.values(t.modelValue);
            c = d && i(d, t.formatter.date, !0), f = j && i(j, t.formatter.date, !0);
          }
        } else {
          const [d, j] = D.value;
          c = i(d, t.formatter.date, !0), f = i(j, t.formatter.date, !0);
        }
      else if (t.autoApply) {
        const [d, j] = t.modelValue ? t.modelValue.split(t.separator) : [null, null];
        c = d && i(d, t.formatter.date, !0), f = j && i(j, t.formatter.date, !0);
      } else {
        const [d, j] = D.value;
        c = i(d, t.formatter.date, !0), f = i(j, t.formatter.date, !0);
      }
      return c && f ? a(p, {
        previous: c,
        next: f
      }) : !1;
    }
    function oe(p) {
      const { today: c, active: f, off: d, disabled: j } = p;
      let L, K, ce;
      if (b())
        if (Array.isArray(t.modelValue))
          if (Y.value) {
            const [z, Q] = k.value;
            K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
          } else if (t.autoApply) {
            const [z, Q] = t.modelValue;
            K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
          } else {
            const [z, Q] = D.value;
            K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
          }
        else if (typeof t.modelValue == "object")
          if (Y.value) {
            const [z, Q] = k.value;
            K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
          } else if (t.autoApply) {
            const [z, Q] = t.modelValue ? Object.values(t.modelValue) : [null, null];
            K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
          } else {
            const [z, Q] = D.value;
            K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
          }
        else if (Y.value) {
          const [z, Q] = k.value;
          K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
        } else if (t.autoApply) {
          const [z, Q] = t.modelValue ? t.modelValue.split(t.separator) : [null, null];
          K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
        } else {
          const [z, Q] = D.value;
          K = z && i(z, t.formatter.date, !0), ce = Q && i(Q, t.formatter.date, !0);
        }
      else if (Array.isArray(t.modelValue))
        if (t.autoApply) {
          if (t.modelValue.length > 0) {
            const [z] = t.modelValue;
            K = i(z, t.formatter.date, !0);
          }
        } else {
          const [z] = D.value;
          K = z && i(z, t.formatter.date, !0);
        }
      else if (typeof t.modelValue == "object")
        if (t.autoApply) {
          if (t.modelValue) {
            const [z] = Object.values(t.modelValue);
            K = i(z, t.formatter.date, !0);
          }
        } else {
          const [z] = D.value;
          K = z && i(z, t.formatter.date, !0);
        }
      else if (t.autoApply) {
        if (t.modelValue) {
          const [z] = t.modelValue.split(t.separator);
          K = i(z, t.formatter.date, !0);
        }
      } else {
        const [z] = D.value;
        K = z && i(z, t.formatter.date, !0);
      }
      return f && (L = c ? "text-vtd-primary-500 font-semibold dark:text-vtd-primary-400 rounded-full focus:bg-vtd-primary-50 focus:text-vtd-secondary-900 focus:border-vtd-primary-300 focus:ring focus:ring-vtd-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-vtd-secondary-800 dark:text-vtd-secondary-300 dark:hover:bg-vtd-secondary-700 dark:hover:text-vtd-secondary-300 dark:focus:bg-vtd-secondary-600 dark:focus:text-vtd-secondary-100 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50" : j ? "text-vtd-secondary-600 font-normal disabled:text-vtd-secondary-500 disabled:cursor-not-allowed rounded-full" : p.isBetween(K, ce, "date", "()") ? "text-vtd-secondary-700 font-medium dark:text-vtd-secondary-100 rounded-full" : "text-vtd-secondary-600 font-medium dark:text-vtd-secondary-200 rounded-full"), d && (L = "text-vtd-secondary-400 font-light disabled:cursor-not-allowed"), K && ce && !d ? (p.isSame(K, "date") && (L = ce.isAfter(K, "date") ? "bg-vtd-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed" : "bg-vtd-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed", K.isSame(ce, "date") && (L = "bg-vtd-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed")), p.isSame(ce, "date") && (L = ce.isAfter(K, "date") ? "bg-vtd-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed" : "bg-vtd-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed", K.isSame(ce, "date") && (L = "bg-vtd-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed"))) : K && p.isSame(K, "date") && !d && (L = "bg-vtd-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed"), L;
    }
    function de(p) {
      let c, f, d;
      if (c = "", !b())
        return c;
      if (Array.isArray(t.modelValue))
        if (k.value.length > 1) {
          const [j, L] = k.value;
          f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
        } else if (t.autoApply) {
          const [j, L] = t.modelValue;
          f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
        } else {
          const [j, L] = D.value;
          f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
        }
      else if (typeof t.modelValue == "object")
        if (k.value.length > 1) {
          const [j, L] = k.value;
          f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
        } else if (t.autoApply) {
          if (t.modelValue) {
            const [j, L] = Object.values(t.modelValue);
            f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
          }
        } else {
          const [j, L] = D.value;
          f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
        }
      else if (k.value.length > 1) {
        const [j, L] = k.value;
        f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
      } else if (t.autoApply) {
        const [j, L] = t.modelValue ? t.modelValue.split(t.separator) : [null, null];
        f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
      } else {
        const [j, L] = D.value;
        f = j && i(j, t.formatter.date, !0), d = L && i(L, t.formatter.date, !0);
      }
      return f && d && (p.isSame(f, "date") ? (d.isBefore(f) && (c += " rounded-r-full inset-0"), f.isBefore(d) && (c += " rounded-l-full inset-0")) : p.isSame(d, "date") ? (d.isBefore(f) && (c += " rounded-l-full inset-0"), f.isBefore(d) && (c += " rounded-r-full inset-0")) : c += " inset-0"), c;
    }
    function xe(p, c) {
      o.value.previous = i(p, t.formatter.date, !0), o.value.next = i(c, t.formatter.date, !0), (i.duration(o.value.next.diff(o.value.previous)).get("months") === 2 || i.duration(o.value.next.diff(o.value.previous)).get("months") === 1 && i.duration(o.value.next.diff(o.value.previous)).get("days") === 7) && (o.value.next = o.value.next.subtract(1, "month")), (o.value.next.isSame(o.value.previous, "month") || o.value.next.isBefore(o.value.previous)) && (o.value.next = o.value.previous.add(1, "month"));
    }
    function ie(p, c) {
      if (b())
        if (t.autoApply) {
          if (Array.isArray(t.modelValue))
            l("update:modelValue", [p, c]);
          else if (typeof t.modelValue == "object") {
            const f = {}, [d, j] = Object.keys(t.modelValue);
            f[d] = p, f[j] = c, l("update:modelValue", f);
          } else
            l(
              "update:modelValue",
              m(
                {
                  previous: i(p, t.formatter.date, !0),
                  next: i(c, t.formatter.date, !0)
                },
                t
              )
            );
          M.value = `${p}${t.separator}${c}`;
        } else
          D.value = [
            i(p, t.formatter.date, !0),
            i(c, t.formatter.date, !0)
          ];
      else if (t.autoApply) {
        if (Array.isArray(t.modelValue))
          l("update:modelValue", [p]);
        else if (typeof t.modelValue == "object") {
          const f = {}, [d] = Object.keys(t.modelValue);
          f[d] = p, l("update:modelValue", f);
        } else
          l("update:modelValue", p);
        M.value = p;
      } else
        D.value = [
          i(p, t.formatter.date, !0),
          i(c, t.formatter.date, !0)
        ];
      xe(p, c);
    }
    function $e(p) {
      const c = i().format(t.formatter.date), f = i().format(t.formatter.date);
      ie(c, f), p && p();
    }
    function ye(p) {
      const c = i().subtract(1, "day").format(t.formatter.date), f = i().subtract(1, "day").format(t.formatter.date);
      ie(c, f), p && p();
    }
    function re(p, c) {
      const f = i().subtract(p - 1, "day").format(t.formatter.date), d = i().format(t.formatter.date);
      ie(f, d), c && c();
    }
    function me(p) {
      const c = i().date(1).format(t.formatter.date), f = i().date(i().daysInMonth()).format(t.formatter.date);
      ie(c, f), p && p();
    }
    function be(p) {
      const c = i().date(1).subtract(1, "month").format(t.formatter.date), f = i().date(0).format(t.formatter.date);
      ie(c, f), p && p();
    }
    function we(p, c) {
      const [f, d] = p.atClick(), j = i(f).format(t.formatter.date), L = i(d).format(t.formatter.date);
      ie(j, L), c && c();
    }
    lt(
      () => D.value,
      (p) => {
        p.length > 0 && (n.previous.calendar = !0, n.previous.month = !1, n.previous.year = !1, n.next.calendar = !0, n.next.month = !1, n.next.year = !1);
      }
    ), je(() => {
      t.placeholder ? V.value = t.placeholder : b() ? V.value = `${t.formatter.date}${t.separator}${t.formatter.date}` : V.value = t.formatter.date;
    }), i.locale(t.i18n), lt(() => t.i18n, () => i.locale(t.i18n)), je(() => {
      const p = t.i18n, c = t.modelValue;
      He(async () => {
        if (p in bt) {
          const L = await bt[p]();
          i.locale(L, void 0, !0), i.locale(p);
        }
        let f, d;
        if (b()) {
          if (Array.isArray(c)) {
            if (c.length > 0) {
              const [L, K] = c;
              f = i(L, t.formatter.date, !0), d = i(K, t.formatter.date, !0);
            }
          } else if (typeof c == "object") {
            if (!no(c))
              try {
                Object.keys(c);
              } catch {
                console.warn(
                  "[Vue Tailwind Datepicker]: It looks like you want to use Object as the argument %cv-model",
                  "font-style: italic; color: #42b883;",
                  ", but you pass it undefined or null."
                ), console.warn(
                  "[Vue Tailwind Datepicker]: We has replace with %c{ startDate: '', endDate: '' }",
                  "font-style: italic; color: #42b883;",
                  ", but you can replace manually."
                ), l("update:modelValue", {
                  startDate: "",
                  endDate: ""
                });
              }
            if (c) {
              const [L, K] = Object.values(c);
              f = L && i(L, t.formatter.date, !0), d = K && i(K, t.formatter.date, !0);
            }
          } else if (c) {
            const [L, K] = c.split(t.separator);
            f = i(L, t.formatter.date, !0), d = i(K, t.formatter.date, !0);
          }
          f && d ? (M.value = m(
            {
              previous: f,
              next: d
            },
            t
          ), d.isBefore(f, "month") ? (o.value.previous = d, o.value.next = f, o.value.year.previous = d.year(), o.value.year.next = f.year()) : d.isSame(f, "month") ? (o.value.previous = f, o.value.next = d.add(1, "month"), o.value.year.previous = f.year(), o.value.year.next = f.add(1, "year").year()) : (o.value.previous = f, o.value.next = d, o.value.year.previous = f.year(), o.value.year.next = d.year()), t.autoApply || (D.value = [f, d])) : (o.value.previous = i(t.startFrom), o.value.next = i(t.startFrom).add(1, "month"), o.value.year.previous = o.value.previous.year(), o.value.year.next = o.value.next.year());
        } else {
          if (Array.isArray(c)) {
            if (c.length > 0) {
              const [L] = c;
              f = i(L, t.formatter.date, !0);
            }
          } else if (typeof c == "object") {
            if (c) {
              const [L] = Object.values(c);
              f = i(L, t.formatter.date, !0);
            }
          } else if (c.length) {
            const [L] = c.split(t.separator);
            f = i(L, t.formatter.date, !0);
          }
          f && f.isValid() ? (M.value = y(f, t), o.value.previous = f, o.value.next = f.add(1, "month"), o.value.year.previous = f.year(), o.value.year.next = f.add(1, "year").year(), t.autoApply || (D.value = [f])) : (o.value.previous = i(t.startFrom), o.value.next = i(t.startFrom).add(1, "month"), o.value.year.previous = o.value.previous.year(), o.value.year.next = o.value.next.year());
        }
        const j = t.weekdaysSize === "min" ? i.weekdaysMin() : i.weekdaysShort();
        o.value.weeks = Z() ? A(j) : j, o.value.months = t.formatter.month === "MMM" ? i.monthsShort() : i.months();
      });
    });
    function Fe(p) {
      return p && F.value === null && (F.value = x(O.value)), p && F.value ? "place-right" : "place-left";
    }
    function Be(p) {
      return p && F.value === null && (F.value = x(O.value)), F.value ? "left-auto right-0" : "left-0 right-auto";
    }
    return ne(Ut, ee), ne(zt, de), ne(Wt, oe), ne(Kt, X), ne(Gt, $e), ne(Zt, ye), ne(qt, re), ne(Jt, me), ne(Xt, be), ne(Qt, we), (p, c) => t.noInput ? G.value ? (W(), q("div", ta, [
      T("div", oa, [
        T("div", ra, [
          t.shortcuts ? (W(), Ue(gt, {
            key: 0,
            shortcuts: t.shortcuts,
            "as-range": b(),
            "as-single": t.asSingle,
            i18n: t.options.shortcuts
          }, null, 8, ["shortcuts", "as-range", "as-single", "i18n"])) : he("", !0),
          T("div", aa, [
            b() && !t.asSingle ? (W(), q("div", na, [...c[7] || (c[7] = [
              T("div", { class: "h-full border-r border-black/[.1] dark:border-vtd-secondary-700/[1]" }, null, -1)
            ])])) : he("", !0),
            T("div", {
              class: Te(["relative w-full lg:w-80", {
                "mb-3 sm:mb-0 sm:mr-2 md:w-1/2": b() && !t.asSingle
              }])
            }, [
              te(Ze, {
                panel: n.previous,
                calendar: _.value.previous
              }, null, 8, ["panel", "calendar"]),
              T("div", sa, [
                fe(te(Qe, {
                  months: E.value,
                  onUpdateMonth: _.value.previous.setMonth
                }, null, 8, ["months", "onUpdateMonth"]), [
                  [pe, n.previous.month]
                ]),
                fe(te(Je, {
                  years: _.value.previous.years(),
                  onUpdateYear: _.value.previous.setYear
                }, null, 8, ["years", "onUpdateYear"]), [
                  [pe, n.previous.year]
                ]),
                fe(T("div", null, [
                  te(Xe, { weeks: B.value }, null, 8, ["weeks"]),
                  te(qe, {
                    calendar: _.value.previous,
                    weeks: B.value,
                    "as-range": b(),
                    "week-number": p.weekNumber,
                    onUpdateDate: c[3] || (c[3] = (f) => R(f))
                  }, null, 8, ["calendar", "weeks", "as-range", "week-number"])
                ], 512), [
                  [pe, n.previous.calendar]
                ])
              ])
            ], 2),
            b() && !t.asSingle ? (W(), q("div", la, [
              te(Ze, {
                "as-prev-or-next": "",
                panel: n.next,
                calendar: _.value.next
              }, null, 8, ["panel", "calendar"]),
              T("div", ua, [
                fe(te(Qe, {
                  months: E.value,
                  onUpdateMonth: _.value.next.setMonth
                }, null, 8, ["months", "onUpdateMonth"]), [
                  [pe, n.next.month]
                ]),
                fe(te(Je, {
                  "as-prev-or-next": "",
                  years: _.value.next.years(),
                  onUpdateYear: _.value.next.setYear
                }, null, 8, ["years", "onUpdateYear"]), [
                  [pe, n.next.year]
                ]),
                fe(T("div", null, [
                  te(Xe, { weeks: B.value }, null, 8, ["weeks"]),
                  te(qe, {
                    "as-prev-or-next": "",
                    calendar: _.value.next,
                    weeks: B.value,
                    "as-range": b(),
                    "week-number": p.weekNumber,
                    onUpdateDate: c[4] || (c[4] = (f) => R(f))
                  }, null, 8, ["calendar", "weeks", "as-range", "week-number"])
                ], 512), [
                  [pe, n.next.calendar]
                ])
              ])
            ])) : he("", !0)
          ])
        ]),
        t.autoApply ? he("", !0) : (W(), q("div", da, [
          T("div", ia, [
            T("div", ca, [
              T("button", {
                type: "button",
                class: "away-apply-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-vtd-primary-600 text-base font-medium text-white hover:bg-vtd-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vtd-primary-500 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-vtd-secondary-800 disabled:cursor-not-allowed",
                disabled: t.asSingle ? D.value.length < 1 : D.value.length < 2,
                onClick: c[5] || (c[5] = (f) => U()),
                textContent: ae(t.options.footer.apply)
              }, null, 8, fa)
            ])
          ])
        ]))
      ])
    ])) : he("", !0) : (W(), Ue(se(Yt), {
      key: 0,
      id: "vtd",
      as: "div",
      class: "relative w-full"
    }, {
      default: Ne(({ open: f }) => [
        t.overlay && !t.disabled ? (W(), Ue(se(Fo), {
          key: 0,
          class: "fixed inset-0 bg-black opacity-30"
        })) : he("", !0),
        te(se(Lo), {
          as: "label",
          class: "relative block"
        }, {
          default: Ne(() => [
            mt(p.$slots, "default", {
              value: M.value,
              placeholder: V.value,
              clear: S
            }, () => [
              fe(T("input", so({
                ref_key: "VtdInputRef",
                ref: N
              }, p.$attrs, {
                "onUpdate:modelValue": c[0] || (c[0] = (d) => M.value = d),
                type: "text",
                class: ["relative block w-full", [
                  t.disabled ? "cursor-default opacity-50" : "opacity-100",
                  p.inputClasses || "pl-3 pr-12 py-2.5 rounded-lg overflow-hidden border-solid text-sm text-vtd-secondary-700 placeholder-vtd-secondary-400 transition-colors bg-white border border-vtd-secondary-300 focus:border-vtd-primary-300 focus:ring focus:ring-vtd-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700 dark:text-vtd-secondary-100 dark:placeholder-vtd-secondary-500 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-20"
                ]],
                disabled: t.disabled,
                autocomplete: "off",
                "data-lpignore": "true",
                "data-form-type": "other",
                placeholder: V.value,
                onKeyup: _e(I, ["stop"]),
                onKeydown: c[1] || (c[1] = _e(() => {
                }, ["stop"]))
              }), null, 16, Cr), [
                [lo, M.value]
              ]),
              T("div", Yr, [
                T("button", {
                  type: "button",
                  disabled: t.disabled,
                  class: Te([
                    t.disabled ? "cursor-default opacity-50" : "opacity-100",
                    "px-2 py-1 mr-1 focus:outline-none text-vtd-secondary-400 dark:text-opacity-70 rounded-md"
                  ]),
                  onClick: c[2] || (c[2] = (d) => {
                    var j;
                    return t.disabled ? !1 : M.value ? S() : (j = N.value) == null ? void 0 : j.focus();
                  })
                }, [
                  mt(p.$slots, "inputIcon", { value: M.value }, () => [
                    (W(), q("svg", Lr, [
                      M.value ? (W(), q("path", Fr)) : (W(), q("path", Br))
                    ]))
                  ])
                ], 10, Er)
              ])
            ])
          ]),
          _: 3
        }),
        te(wt, {
          "enter-from-class": "opacity-0 translate-y-3",
          "enter-to-class": "opacity-100 translate-y-0",
          "enter-active-class": "transform transition ease-out duration-200",
          "leave-active-class": "transform transition ease-in duration-150",
          "leave-from-class": "opacity-100 translate-y-0",
          "leave-to-class": "opacity-0 translate-y-3"
        }, {
          default: Ne(() => [
            t.disabled ? he("", !0) : (W(), Ue(se(Bo), {
              key: 0,
              as: "div",
              class: "relative z-50"
            }, {
              default: Ne(({ close: d }) => [
                T("div", {
                  class: Te(["absolute z-50 top-full sm:mt-2.5", Be(f)])
                }, [
                  T("div", {
                    ref_key: "VtdRef",
                    ref: O,
                    class: "fixed inset-0 z-50 overflow-y-auto sm:overflow-visible sm:static sm:z-auto bg-white dark:bg-vtd-secondary-800 sm:rounded-lg shadow-sm"
                  }, [
                    T("div", {
                      class: Te(["vtd-datepicker static sm:relative w-full bg-white sm:rounded-lg sm:shadow-sm border-0 sm:border border-black/[.1] px-3 py-3 sm:px-4 sm:py-4 dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700/[1]", Fe(f)])
                    }, [
                      T("div", Nr, [
                        t.shortcuts ? (W(), Ue(gt, {
                          key: 0,
                          shortcuts: t.shortcuts,
                          "as-range": b(),
                          "as-single": t.asSingle,
                          i18n: t.options.shortcuts,
                          close: d
                        }, null, 8, ["shortcuts", "as-range", "as-single", "i18n", "close"])) : he("", !0),
                        T("div", Rr, [
                          b() && !t.asSingle ? (W(), q("div", Ir, [...c[6] || (c[6] = [
                            T("div", { class: "h-full border-r border-black/[.1] dark:border-vtd-secondary-700/[1]" }, null, -1)
                          ])])) : he("", !0),
                          T("div", {
                            class: Te(["relative", {
                              "mb-3 sm:mb-0 sm:mr-2 w-full md:w-1/2 lg:w-80": b() && !t.asSingle,
                              "w-full": !b() && t.asSingle
                            }])
                          }, [
                            te(Ze, {
                              panel: n.previous,
                              calendar: _.value.previous
                            }, null, 8, ["panel", "calendar"]),
                            T("div", Hr, [
                              fe(te(Qe, {
                                months: E.value,
                                onUpdateMonth: _.value.previous.setMonth
                              }, null, 8, ["months", "onUpdateMonth"]), [
                                [pe, n.previous.month]
                              ]),
                              fe(te(Je, {
                                years: _.value.previous.years(),
                                onUpdateYear: _.value.previous.setYear
                              }, null, 8, ["years", "onUpdateYear"]), [
                                [pe, n.previous.year]
                              ]),
                              fe(T("div", null, [
                                te(Xe, { weeks: B.value }, null, 8, ["weeks"]),
                                te(qe, {
                                  calendar: _.value.previous,
                                  weeks: B.value,
                                  "as-range": b(),
                                  "week-number": p.weekNumber,
                                  onUpdateDate: (j) => R(j, d)
                                }, null, 8, ["calendar", "weeks", "as-range", "week-number", "onUpdateDate"])
                              ], 512), [
                                [pe, n.previous.calendar]
                              ])
                            ])
                          ], 2),
                          b() && !t.asSingle ? (W(), q("div", Ur, [
                            te(Ze, {
                              "as-prev-or-next": "",
                              panel: n.next,
                              calendar: _.value.next
                            }, null, 8, ["panel", "calendar"]),
                            T("div", zr, [
                              fe(te(Qe, {
                                months: E.value,
                                onUpdateMonth: _.value.next.setMonth
                              }, null, 8, ["months", "onUpdateMonth"]), [
                                [pe, n.next.month]
                              ]),
                              fe(te(Je, {
                                "as-prev-or-next": "",
                                years: _.value.next.years(),
                                onUpdateYear: _.value.next.setYear
                              }, null, 8, ["years", "onUpdateYear"]), [
                                [pe, n.next.year]
                              ]),
                              fe(T("div", null, [
                                te(Xe, { weeks: B.value }, null, 8, ["weeks"]),
                                te(qe, {
                                  "as-prev-or-next": "",
                                  calendar: _.value.next,
                                  weeks: B.value,
                                  "as-range": b(),
                                  "week-number": p.weekNumber,
                                  onUpdateDate: (j) => R(j, d)
                                }, null, 8, ["calendar", "weeks", "as-range", "week-number", "onUpdateDate"])
                              ], 512), [
                                [pe, n.next.calendar]
                              ])
                            ])
                          ])) : he("", !0)
                        ])
                      ]),
                      t.autoApply ? (W(), q("div", Jr, [
                        T("div", Xr, [
                          T("div", Qr, [
                            T("button", {
                              type: "button",
                              class: "away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-vtd-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-vtd-secondary-700 hover:bg-vtd-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vtd-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-vtd-secondary-800",
                              onClick: (j) => d(),
                              textContent: ae(t.options.footer.cancel)
                            }, null, 8, ea)
                          ])
                        ])
                      ])) : (W(), q("div", Wr, [
                        T("div", Kr, [
                          T("div", Gr, [
                            T("button", {
                              type: "button",
                              class: "away-apply-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-vtd-primary-600 text-base font-medium text-white hover:bg-vtd-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vtd-primary-500 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-vtd-secondary-800 disabled:cursor-not-allowed",
                              disabled: t.asSingle ? D.value.length < 1 : D.value.length < 2,
                              onClick: (j) => U(d),
                              textContent: ae(t.options.footer.apply)
                            }, null, 8, Zr),
                            T("button", {
                              type: "button",
                              class: "mt-3 away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-vtd-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-vtd-secondary-700 hover:bg-vtd-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vtd-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-vtd-secondary-800",
                              onClick: (j) => d(),
                              textContent: ae(t.options.footer.cancel)
                            }, null, 8, qr)
                          ])
                        ])
                      ]))
                    ], 2)
                  ], 512)
                ], 2)
              ]),
              _: 2
            }, 1024))
          ]),
          _: 2
        }, 1024)
      ]),
      _: 3
    }));
  }
});
export {
  va as default
};
