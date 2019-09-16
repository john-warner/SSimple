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
  
    var sugar = {};

    // Object manipulation

    sugar.extend = (target, source) => Object.assign(target, source);

    // Function composition

    const flow = (...fns) => x => fns.reduce((v, f) => f(v), x);
    const backflow = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
    const curry = fn => (...args) => fn.bind(null, ...args);
    const element = (e) => (typeof e === 'string') ? document.querySelector(e) : e;

    sugar.oneach = (a, f) => a.foreach(f);
    sugar.curry = curry;
    sugar.map = curry((fn, arr) => arr.map(fn));
    sugar.join = curry((str, arr) => arr.join(str));
    sugar.toLowerCase = str => str.toLowerCase();
    sugar.split = curry((splitOn, str) => str.split(splitOn));

    sugar.flow = flow;
    sugar.backflow = backflow;
    sugar.compose = backflow;

    sugar.isFunction = (f) => typeof f === 'function';
    sugar.isPlainObject = (o) => Object.prototype.toString.call(o) === '[object Object]';
    sugar.isArray = (a) => Array.isArray(a);
    sugar.isString = (s) => typeof s === 'string';

    // DOM manipulation

    sugar.select = document.querySelector.bind(document);
    sugar.find = (e, sel) => (typeof e !== 'string') ? e.querySelector(sel) : document.querySelector(e); // use first parameteer as sel
    sugar.findall = (e, sel) => (typeof e !== 'string') ? e.querySelectorAll(sel) : document.querySelectorAll(e);
    sugar.findid = (e, id) => (typeof e !== 'string') ? e.getElementById(id) : document.getElementById(e);
    sugar.findname = (e, name) => (typeof e !== 'string') ? e.getElementsByName(name) : document.getElementsByName(e);
    sugar.findtag = (e, tag) => (typeof e !== 'string') ? e.getElementsByTagName(tag) : document.getElementsByTagName(e);

    sugar.clone = (e) => element(e).cloneNode(true);
    sugar.create = (tag) => document.createElement(tag);
    sugar.template = (t,sel) => element(t).content.querySelector(sel).cloneNode(true); 

    sugar.contains = (e, child) => e != child && e.contains(child);
    sugar.empty = (e) => e.innerHTML = '';
    sugar.html = (e, outer) => (outer) ? e.outerHTML : e.innerHTML;
    sugar.text = (e,v) => (typeof v === 'undefined') ? e.textContent : e.textContent = v;
    sugar.remove = (e) => e.parentNode.removeChild(e);
    sugar.append = (e, c) => e.appendChild(c);

    sugar.hasclass = (e, name) => e.classList.contains(name);
    sugar.css = (e,p) => getComputedStyle(e,p);
    sugar.cssrule = (e, rule) => getComputedStyle(e)[rule];
    sugar.cssToggle = (e, rule) => e.classList.toggle(rule);
    sugar.cssReplace = (e, rule, newRule) => e.classList.replace(rule, newRule);
    sugar.cssDel = (e, name) => e.classList.remove(name);
    sugar.style = (e,n,v) => e.style[n] = v;
    sugar.styleDel = (e, n) => e.style.removeProperty(n);

    sugar.height = (e,h) => (typeof h === 'undefined') ? parseFloat(getComputedStyle(e).height.replace("px", "")) : e.style.height = h + 'px';
    sugar.width = (e,w) =>  (typeof w === 'undefined') ? parseFloat(getComputedStyle(e).width.replace("px", "")) : e.style.width = w + 'px';
    sugar.offsetheight = (e) => e.offsetHeight;
    sugar.offsetwidth = (e) => e.offsetWidth;
    sugar.offsetparent = (e) => e.offsetParent || e;
    sugar.bounds = (e) => e.getBoundingClientRect();
    sugar.offset = (e) => flow(
        e.getBoundingClientRect,
        (rect) => { 
             return { 
                top: rect.top + document.body.scrollTop, 
                left: rect.left + document.body.scrollLeft }; 
            }
        );

    sugar.parent = (e) => e.parentElement;
    sugar.next = (e) => e.nextElementSibling;
    sugar.prev = (e) => e.previousElementSibling;

    sugar.attr = (e, name) => e.getAttribute(name);
    sugar.attrDel = (e, name) => e.removeAttribute(name);
    sugar.attrSet = (e,name,v) => e.setAttribute(e,name,v);

    sugar.hide = (e) => e.style.display = 'none';
    sugar.show = (e) => e.style.display = 'block';

    // Events

    sugar.on = (e, name, f) => e.addEventListener(name, f);
    sugar.off = (e, name, f) => e.removeEventListener(name, f);
    sugar.click = (e, f) => sugar.on(e, "click", f);
    sugar.mouseenter = (e, f) => sugar.on(e, "mouseenter", f);
    sugar.keyup = (e, f) => sugar.on(e, "keyup", f);
    sugar.keydown = (e, f) => sugar.on(e, "keydown", f);
    sugar.trigger = (e, name) => (e) ? e.dispatchEvent(new Event(name)) : document.dispatchEvent(new Event(name));
    sugar.ready = (f) => (document.readyState != "loading") ? f() : document.addEventListener("DOMContentLoaded", f);

    sugar.delay = (f) => setTimeout(f, 0);
    sugar.extend = (t, s) => Object.assign(t, s);

    sugar.post = (url, data) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
    sugar.get = (url) => fetch(url).then(response => response.json());
    sugar.load = (e, url) => fetch(url)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const html = parser.parseFromString(text, "text/html");
            e = element(e);
            e.innerHTML = '';
            e.appendChild(html);
        });


    sugar.bind = (e) => { 
        if (typeof e === 'string') // passed a selector
            e = $$.find(e); // find element

        var bound = { el: e };

        for (const key in sugar) {
            var value = sugar[key];
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

    return sugar;

}();

