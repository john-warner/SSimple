// SSimple
// Light ES6 Javascript wrapper to ease common DOM manipulation and selection
// Copyright 2019 - John Warner
// MIT Licence - use this code however you want
//

/*jshint esversion: 9 */

var $$ = function() {

     var exports = { version: '0.6.7' };

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
 
    // Object manipulation

    exports.extend = (target, source) => Object.assign(target, source);

    // Function composition

    // const flow = (...fns) => x => fns.reduce((v, f) => f(v), x);
    // const backflow = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
    // const curry = fn => (...args) => fn.bind(null, ...args);
 
    // exports.curry = curry;
    // exports.map = curry((fn, arr) => arr.map(fn));
    // exports.join = curry((str, arr) => arr.join(str));
    // exports.toLowerCase = str => str.toLowerCase();
    // exports.split = curry((splitOn, str) => str.split(splitOn));

    // exports.flow = flow;
    // exports.backflow = backflow;
    // exports.compose = backflow;

 
    const element = (e) => (typeof e === 'string') ? document.querySelector(e) : e;
    const find = (e, sel) => (typeof e !== 'string') ? ((typeof sel === 'string') ? e.querySelector(sel) : e) : document.querySelector(e); // use first parameteer as sel
    const create = (tag) => document.createElement(tag);
    // const fragment = (html) => document.createRange().createContextualFragment(html);
    const fragment = (html) => { var tpl = create('template'); tpl.innerHTML = html; return tpl.content;  };
    const fragmentHtml = (f) => [...f.childNodes].map(n => n.outerHTML).join('\n');
    const appendHtml = (e, html) => element(e).appendChild(fragment(html));
    const isFragment = (o) => Object.prototype.toString.call(o) == "[object DocumentFragment]";
    const isString = (s) => typeof s === 'string';
    const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');
    
    exports.oneach = (a, f) => a.forEach(f);

    exports.isFunction = (f) => typeof f === 'function';
    exports.isPlainObject = (o) => Object.prototype.toString.call(o) === '[object Object]';
    exports.isArray = (a) => Array.isArray(a);
    exports.isString = isString;
    exports.isFragment = isFragment;

    // DOM manipulation

    exports.select = document.querySelector.bind(document);
    exports.find = find;
    exports.findall = (e, sel) => (typeof e !== 'string') ? e.querySelectorAll(sel) : document.querySelectorAll(e);
    exports.findid = (e, id) => (typeof e !== 'string') ? e.getElementById(id) : document.getElementById(e);
    exports.findname = (e, name) => (typeof e !== 'string') ? e.getElementsByName(name) : document.getElementsByName(e);
    exports.findtag = (e, tag) => (typeof e !== 'string') ? e.getElementsByTagName(tag) : document.getElementsByTagName(e);

    exports.clone = (e) => element(e).cloneNode(true);
    exports.copy = (e) => { e = element(e); return (e.content) ? e.content.cloneNode(true) : e.cloneNode(true); };
    exports.create = create;
    exports.cloneContent = (e,sel) => (typeof sel === 'undefined') ? element(e).content.cloneNode(true) : element(e).content.querySelector(sel).cloneNode(true); 
    exports.import = (d,e) => d.importNode(element(e), true);
    exports.fragmentHtml = fragmentHtml;

    exports.contains = (e, child) => e != child && e.contains(child);
    exports.empty = (e) => e.innerHTML = '';
    exports.html = (e,v) => (typeof v === 'undefined') ? ((isFragment(e)) ? fragmentHtml(e) : e.innerHTML) : e.innerHTML = v;
    exports.text = (e,v) => (typeof v === 'undefined') ? e.textContent : e.textContent = v;
    exports.remove = (e) => e.parentNode.removeChild(e);
    exports.append = (e, c) => e.appendChild(c);
    exports.appendHtml = appendHtml;
    exports.fragment = fragment;
    exports.after = (e,h) => e.insertAdjacentHTML('afterend', h);
    exports.before = (e,h) => e.insertAdjacentHTML('beforebegin', h);
    exports.prepend = (e,v) => e.insertAdjacentHTML('afterbegin', v);
    exports.replace = (o,c) => {
        if (Array.isArray(c)) {
            let fragment = new DocumentFragment();
            fragment.append(...c);
            o.parentElement.insertBefore(fragment, o);
        }
        else {
            o.parentElement.insertBefore(c, o);
        }

        o.parentNode.removeChild(o);
    };
    exports.waitFor = (o,p) => {
        if (o.hasOwnProperty(p) && o[p] instanceof Promise) {
            return o[p];
        }

        let wait = new Promise(resolve => {
            let value;
            if (o.hasOwnProperty(p)) {
                resolve();
            }
            else {
                Object.defineProperty(o, p, {
                    get: () => wait,
                    set: (v) => { Object.defineProperty(o,p, { value: v }); resolve(); },
                    configurable: true
                });
            }
        });

        return wait;
    };

    exports.hasclass = (e, name) => e.classList.contains(name);
    exports.css = (e,p) => getComputedStyle(e,p);
    exports.cssrule = (e, rule) => getComputedStyle(e)[rule];
    exports.cssToggle = (e, rule) => e.classList.toggle(rule);
    exports.cssReplace = (e, rule, newRule) => e.classList.replace(rule, newRule);
    exports.cssDel = (e, name) => e.classList.remove(name);
    exports.cssAdd = (e, name) => e.classList.add(name);
    exports.style = (e,n,v) => e.style[n] = v;
    exports.styleDel = (e, n) => e.style.removeProperty(n);

    exports.height = (e,h) => (typeof h === 'undefined') ? parseFloat(getComputedStyle(e).height.replace("px", "")) : e.style.height = h + 'px';
    exports.width = (e,w) =>  (typeof w === 'undefined') ? parseFloat(getComputedStyle(e).width.replace("px", "")) : e.style.width = w + 'px';
    exports.offsetheight = (e) => e.offsetHeight;
    exports.offsetwidth = (e) => e.offsetWidth;
    exports.offsetparent = (e) => e.offsetParent || e;
    exports.bounds = (e) => e.getBoundingClientRect();
    exports.offset = (e) => {
        var rect = e.getBoundingClientRect();
        return { 
                top: rect.top + document.body.scrollTop, 
                left: rect.left + document.body.scrollLeft 
                }; 
        };

    exports.parent = (e) => e.parentElement;
    exports.next = (e) => e.nextElementSibling;
    exports.prev = (e) => e.previousElementSibling;

    exports.attr = (e, name, v) => (typeof v === 'undefined') ? e.getAttribute(name) : e.setAttribute(name,v);
    exports.removeAttr = (e, name) => e.removeAttribute(name);
    exports.data = (e, name, v) => (typeof v === 'undefined') ? e.getAttribute('data-'+name) : e.setAttribute('data-'+name,v);

    exports.hide = (e) => e.style.display = 'none';
    exports.show = (e) => e.style.display = 'block';

    // Events

    exports.on = (e, name, f) => e.addEventListener(name, f);
    exports.one = (e, name, f) => e.addEventListener(name, f, { once: true });
    exports.off = (e, name, f) => e.removeEventListener(name, f);
    exports.click = (e, f) => (typeof f === 'function')? e.addEventListener('click', f) : e.dispatchEvent(new Event('click'));
    exports.mouseenter = (e, f) => (typeof f === 'function')? e.addEventListener('mouseenter', f) : e.dispatchEvent(new Event('mouseenter'));
    exports.keyup = (e, f) => (typeof f === 'function')? e.addEventListener('keyup', f) : e.dispatchEvent(new Event('keyup'));
    exports.keydown = (e, f) => (typeof f === 'function')? e.addEventListener('keydown', f) : e.dispatchEvent(new Event('keydown'));
    exports.trigger = (e, name) => (e) ? e.dispatchEvent(new Event(name)) : document.dispatchEvent(new Event(name));
    exports.ready = (f) => (document.readyState != "loading") ? f() : document.addEventListener("DOMContentLoaded", f);
    exports.stop = (ev) => ev.stopPropagation();

    exports.delay = (f) => setTimeout(f, 0);
    // exports.process = async (d) => {
    //     let f = async () => await new Promise((resolve) => setTimeout(resolve, d || 0));
    //     await f();
    // };
    exports.sleep = (d) => { return new Promise(resolve => setTimeout(resolve, d || 0)); };
    exports.wait = async (d) => await new Promise((resolve) => setTimeout(resolve, d || 0));

    exports.extend = (t, s) => Object.assign(t, s);
    exports.dup = (o) => Object.assign({}, o); // needed because some browsers don't support {...o}

    exports.redirect = (url,trackHistory=true) => (trackHistory) ? window.location.href = url : window.location.replace(url);
    exports.post = (url, data) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
    exports.get = (url) => fetch(url).then(response => response.json());
    exports.load = (e, url) => fetch(url)
        .then(response => response.text())
        .then(text => {
            if (e) {
                e = element(e);
                e.innerHTML = '';
                appendHtml(e, text);
            }
            return text;
        });

    // api shortcuts
    exports.channel = (name,sf) => {
        let bc = new BroadcastChannel(name);
        let rc = new BroadcastChannel(name);
        if (typeof sf === 'function') rc.onmessage = (ev) => sf(ev.data, ev);
        return {
            subscribe: (f) => rc.addEventListener('message', (ev) => f(ev.data, ev)),
            send: (m) => bc.postMessage(m),
            disconnect: () => { rc.close(); bc.close(); }
        };
    };
    exports.onvisible = (e,f,o) => {
        var w = new IntersectionObserver(f, o);
        w.observe(e);
        return w;
    };

    exports.onmutate = (e,f,o) => {
        var w = new MutationObserver(f);
        w.observe(e, o || {attributes: true, chiildList: true, subtree: true });
        return w;
    };

    exports.bind = (e, sel) => { 
        e = find(e,sel); // find element

        var bound = { el: e };

        for (var key in exports) {
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

    // a convenience function for parsing string namespaces and
    // automatically generating nested namespaces
    //
    // ns_string : string representation of namespace.  For example, "app.controls.calendar"
    exports.ns = (ns_string) => {

        let parts = ns_string.split('.'),
            sNamespace = parts[0],
            parent = window[parts[0]] = window[parts[0]] || { namespace: sNamespace },    // root namespace is off of window object
            pl, i;

        if (parts.length > 1) { // create namespace hierarchy
            parts = parts.slice(1);

            pl = parts.length;
            for (i = 0; i < pl; i++) {

                sNamespace += '.' + parts[i];

                //create a property if it doesnt exist
                if (typeof parent[parts[i]] === 'undefined') {
                    parent[parts[i]] = { namespace : sNamespace };
                }

                parent = parent[parts[i]];
            }
        }

        return parent;
    };

    return exports;

}();

