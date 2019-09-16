// SSimple
// Light ES6 Javascript wrapper to ease common DOM manipulation and selection
// Copyright 2019 - John Warner
// MIT Licence - use this code however you want
//
var $$ = function() {

    function getFunctionParameters(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /(?:^|,)\s*([^\s,=]+)/g;

        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var argsList = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
        var result = argsList.match(ARGUMENT_NAMES);

        if (result === null) {
            return [];
        }
        else {
            var stripped = [];
            for (var i = 0; i < result.length; i++) {
                stripped.push(result[i].replace(/[\s,]/g, ''));
            }
            return stripped;
        }
    }

    function CanBindElement(func) {
        var parms = getFunctionParameters(func);
        return parms.length > 0 && parms[0] == 'e';
    }
  
    var exports = {};

    // Object manipulation

    exports.extend = (target, source) => Object.assign(target, source);

    // Function composition

    const flow = (...fns) => x => fns.reduce((v, f) => f(v), x);
    const backflow = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
    const curry = fn => (...args) => fn.bind(null, ...args);
    const element = (e) => (typeof e === 'string') ? document.querySelector(e) : e;
    const find = (e, sel) => (typeof e !== 'string') ? e.querySelector(sel) : document.querySelector(e); // use first parameteer as sel

    exports.oneach = (a, f) => a.foreach(f);
    exports.curry = curry;
    exports.map = curry((fn, arr) => arr.map(fn));
    exports.join = curry((str, arr) => arr.join(str));
    exports.toLowerCase = str => str.toLowerCase();
    exports.split = curry((splitOn, str) => str.split(splitOn));

    exports.flow = flow;
    exports.backflow = backflow;
    exports.compose = backflow;

    exports.isFunction = (f) => typeof f === 'function';
    exports.isPlainObject = (o) => Object.prototype.toString.call(o) === '[object Object]';
    exports.isArray = (a) => Array.isArray(a);
    exports.isString = (s) => typeof s === 'string';

    // DOM manipulation

    exports.select = document.querySelector.bind(document);
    exports.find = find;
    exports.findall = (e, sel) => (typeof e !== 'string') ? e.querySelectorAll(sel) : document.querySelectorAll(e);
    exports.findid = (e, id) => (typeof e !== 'string') ? e.getElementById(id) : document.getElementById(e);
    exports.findname = (e, name) => (typeof e !== 'string') ? e.getElementsByName(name) : document.getElementsByName(e);
    exports.findtag = (e, tag) => (typeof e !== 'string') ? e.getElementsByTagName(tag) : document.getElementsByTagName(e);

    exports.clone = (e) => element(e).cloneNode(true);
    exports.create = (tag) => document.createElement(tag);
    exports.template = (t,sel) => element(t).content.querySelector(sel).cloneNode(true); 

    exports.contains = (e, child) => e != child && e.contains(child);
    exports.empty = (e) => e.innerHTML = '';
    exports.html = (e, outer) => (outer) ? e.outerHTML : e.innerHTML;
    exports.text = (e,v) => (typeof v === 'undefined') ? e.textContent : e.textContent = v;
    exports.remove = (e) => e.parentNode.removeChild(e);
    exports.append = (e, c) => e.appendChild(c);

    exports.hasclass = (e, name) => e.classList.contains(name);
    exports.css = (e,p) => getComputedStyle(e,p);
    exports.cssrule = (e, rule) => getComputedStyle(e)[rule];
    exports.cssToggle = (e, rule) => e.classList.toggle(rule);
    exports.cssReplace = (e, rule, newRule) => e.classList.replace(rule, newRule);
    exports.cssDel = (e, name) => e.classList.remove(name);
    exports.style = (e,n,v) => e.style[n] = v;
    exports.styleDel = (e, n) => e.style.removeProperty(n);

    exports.height = (e,h) => (typeof h === 'undefined') ? parseFloat(getComputedStyle(e).height.replace("px", "")) : e.style.height = h + 'px';
    exports.width = (e,w) =>  (typeof w === 'undefined') ? parseFloat(getComputedStyle(e).width.replace("px", "")) : e.style.width = w + 'px';
    exports.offsetheight = (e) => e.offsetHeight;
    exports.offsetwidth = (e) => e.offsetWidth;
    exports.offsetparent = (e) => e.offsetParent || e;
    exports.bounds = (e) => e.getBoundingClientRect();
    exports.offset = (e) => flow(
        e.getBoundingClientRect,
        (rect) => { 
             return { 
                top: rect.top + document.body.scrollTop, 
                left: rect.left + document.body.scrollLeft }; 
            }
        );

    exports.parent = (e) => e.parentElement;
    exports.next = (e) => e.nextElementSibling;
    exports.prev = (e) => e.previousElementSibling;

    exports.attr = (e, name) => e.getAttribute(name);
    exports.attrDel = (e, name) => e.removeAttribute(name);
    exports.attrSet = (e,name,v) => e.setAttribute(e,name,v);

    exports.hide = (e) => e.style.display = 'none';
    exports.show = (e) => e.style.display = 'block';

    // Events

    exports.on = (e, name, f) => e.addEventListener(name, f);
    exports.off = (e, name, f) => e.removeEventListener(name, f);
    exports.click = (e, f) => exports.on(e, "click", f);
    exports.mouseenter = (e, f) => exports.on(e, "mouseenter", f);
    exports.keyup = (e, f) => exports.on(e, "keyup", f);
    exports.keydown = (e, f) => exports.on(e, "keydown", f);
    exports.trigger = (e, name) => (e) ? e.dispatchEvent(new Event(name)) : document.dispatchEvent(new Event(name));
    exports.ready = (f) => (document.readyState != "loading") ? f() : document.addEventListener("DOMContentLoaded", f);

    exports.delay = (f) => setTimeout(f, 0);
    exports.extend = (t, s) => Object.assign(t, s);

    exports.post = (url, data) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
    exports.get = (url) => fetch(url).then(response => response.json());
    exports.load = (e, url) => fetch(url)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const html = parser.parseFromString(text, "text/html");
            e = element(e);
            e.innerHTML = '';
            e.appendChild(html);
        });


    exports.bind = (e) => { 
        if (typeof e === 'string') // passed a selector
            e = find(e); // find element

        var bound = { el: e };

        for (const key in exports) {
            var value = exports[key];
            if (typeof value === "function" && CanBindElement(value)) {
                bound[key] = value.bind(null, e);
            }
            else {
                bound[key] = value;
            }
        }
        e.$$ = bound;

        return e;
    };

    return exports;

}();
