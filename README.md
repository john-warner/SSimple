# SSimple

Light ES6 Javascript wrapper to ease common DOM manipulation and selection. 

Many of the methods are similar to jQuery, however, most do not support operating on more than one element at a time. Also, binding to an element differs from jQuery. In jQuery, elements are bound using $('selector') or $(element).  SSimple methods are bound to an element using the bind method and accessed through an added property, '$$'.  For example, var bound = $$.bind('selector'), with access like bound.$$.append(...)

* append - add child element 
* appendHtml - add child elements defined with an HTML string
* after - add dom fragment after element
* attr - get/set an attribute
* removeAttr - remove an attribute from n element
* before - add dom fragment before element
* bind - bind SSimple methods to act on element through "$$" property 
* bounds - get bounding rectangle of element
* channel - get interface to broadcast channel. May not be supported in all browsers.
* click - attach click handler to element
* clone - make a copy of a fragment
* cloneContent - clone template
* contains - check if element contains child
* copy - clone element or template
* create - create a dom fragment from tag name
* css - get css rule(s)
* cssAdd - add css class to element
* cssDel - remove css class from element
* cssReplace - exchange one css rule for element with another
* cssToggle - toggle css rule setting for element
* cssrule - get css rule setting
* delay - call function after specified delay
* empty - clear text/children of an element
* extend - extend/overwite object properties
* find - find element matching selector
* findall - find all elements matching selector
* findid - find element by id
* findname - find elements by name
* findtag - find elements with specified tag
* fragment - return document fragment from HTML string
* fragmentHtml - return HTML of a DOM fragment
* get - get json from URL
* hasclass - check if an element has a class
* height - get height of element in pixels
* hide - hide element
* html - get/set element HTML string
* import - create a document fragment from another document
* isArray - check if value is an array
* isFragment - check if value is a DOM fragment
* isFunction - check if value is a function
* isPlainObject - check if value is an object
* isString - check if value is a string
* keydown - add event handler for keydown event
* keyup - add event handler for keyup event
* load - load DOM from URL
* mouseenter - add mouseenter event
* next - return next sibling to element
* ns - create/return nested objects to define a namespace
* off - remove event handler
* offset - return top,left corner of element
* offsetheight - return offset height for element
* offsetparent - return offset parent for element
* offsetwidth - return offset width for element
* on - add event handler
* one - add event handler that runs once
* oneach - array forEach 
* onmutate - event handler on DOM changes to element
* onvisible - event handler when element is displayed
* parent - return element parent
* post - post data to URL
* prev - return previous sibling to element
* ready - run function when document is loaded
* remove - remove child from an element
* replace - replace element with other elements
* select - find element in document that matches selector
* show - display element
* sleep - sleep for a specified amount of time. Returns a Promise.
* stop - stop event propagation
* style - set style value
* styleDel - remove style value
* text - get/set element text content
* trigger - trigger an event
* wait - wait for a specified time to pass
* waitFor - wait for an object property to be assigned
* width - get width of element in pixels


### append

add child element

#### API call

 ```javascript
    $$.append(element, child);
    bound.$$.append(child);
```

**Returns**


### appendHtml

add child elements defined with an HTML string

#### API call

 ```javascript
    $$.appendHtml(element, html);
    bound.$$.appendHtml(html);
```

**Returns**


### after

add dom fragment after element

#### API call

 ```javascript
    $$.after(element, html);
    bound.$$.after(html);
```

**Returns**


### attr

get/set an attribute

#### API call

 ```javascript
    $$.attr(element, name, value);
    let value = $$.attr(element, name);

    bound.$$.attr(name, value);
    let value = bound.$$.attr(name);
```

**Returns**
value of attribute, unless value is specified


### before

add dom fragment before element

#### API call

 ```javascript
    $$.before(element, html);
    bound.$$.before(html);
```

**Returns**


### bind

bind SSimple methods to act on element through "$$" property 

#### API call

 ```javascript
    let bound = $$.bind(selector);
```

**Returns**


### bounds

get bounding rectangle of element

#### API call

 ```javascript
    $$.bounds(element);
    bound.$$.bounds();
```

**Returns**


### channel

get interface to broadcast channel. May not be supported in all browsers.

#### API call

 ```javascript
    $$.channel(name, onmessage);
```

**Returns**
{
    subscribe(function),
    send(message),
    disconnect()
}

### click

attach click handler to element

#### API call

 ```javascript
    $$.click(element, onclick);
    bound.$$.click(onclick);
```

**Returns**


### clone

make a copy of a fragment

#### API call

 ```javascript
    $$.clone(selector);
    bound.$$.clone();
```

**Returns**
Copy of element and children

### cloneContent

clone template

#### API call

 ```javascript
    $$.cloneContent(selector, childSelector);
    bound.$$.cloneContent(childSelector);
```

**Returns**
Copy of template content for elements matching childSelector

### contains

check if element contains child

#### API call

 ```javascript
    $$.contains(element, child);
    bound.$$.contains(child);
```

**Returns**
true if child has element as an ancestor

### copy

clone element or template

#### API call

 ```javascript
    $$.copy(element);
    bound.$$.copy();
```

**Returns**
Returns a copy of the element and children

### create

create a dom fragment from tag name

#### API call

 ```javascript
    $$.create(tagName);
```

**Returns**
document fragment

### css

get css rule(s)

#### API call

 ```javascript
    $$.css(element, pseudo-element)
    bound.$$.css(rule);
```

**Returns**
computed css declaration block

### cssAdd

add css class to element

#### API call

 ```javascript
    $$.cssAdd(element, class);
    bound.$$.cssAdd(class);
```

**Returns**


### cssDel

remove css class from element

#### API call

 ```javascript
    $$.cssDel(element, class);
    bound.$$.cssDel(class);
```

**Returns**


### cssReplace

exchange one css rule for element with another

#### API call

 ```javascript
    $$.cssReplace(element, oldRule, newRule);
    bound.$$.cssReplace(oldRule, newRule);
```

**Returns**


### cssToggle

toggle css rule setting for element

#### API call

 ```javascript
    $$.cssToggle(element, rule);
    bound.$$.cssToggle(rule);
```

**Returns**


### cssrule

get css rule setting

#### API call

 ```javascript

```

**Returns**


### delay

call function after specified delay

#### API call

 ```javascript

```

**Returns**


### empty

clear text/children of an element

#### API call

 ```javascript

```

**Returns**


### extend

extend/overwite object properties

#### API call

 ```javascript

```

**Returns**


### find

find element matching selector

#### API call

 ```javascript

```

**Returns**


### findall

find all elements matching selector

#### API call

 ```javascript

```

**Returns**


### findid

find element by id

#### API call

 ```javascript

```

**Returns**


### findname

find elements by name

#### API call

 ```javascript

```

**Returns**


### findtag

find elements with specified tag

#### API call

 ```javascript

```

**Returns**


### fragment

return document fragment from HTML string

#### API call

 ```javascript

```

**Returns**


### fragmentHtml

return HTML of a DOM fragment

#### API call

 ```javascript

```

**Returns**


### get

get json from URL

#### API call

 ```javascript

```

**Returns**


### hasclass

check if an element has a class

#### API call

 ```javascript

```

**Returns**


### height

get height of element in pixels

#### API call

 ```javascript

```

**Returns**


### hide

hide element

#### API call

 ```javascript

```

**Returns**


### html

get/set element HTML string

#### API call

 ```javascript

```

**Returns**


### import

create a document fragment from another document

#### API call

 ```javascript

```

**Returns**


### isArray

check if value is an array

#### API call

 ```javascript

```

**Returns**


### isFragment

check if value is a DOM fragment

#### API call

 ```javascript

```

**Returns**


### isFunction

check if value is a function

#### API call

 ```javascript

```

**Returns**


### isPlainObject

check if value is an object

#### API call

 ```javascript

```

**Returns**


### isString

check if value is a string

#### API call

 ```javascript

```

**Returns**


### keydown

add event handler for keydown event

#### API call

 ```javascript

```

**Returns**


### keyup

add event handler for keyup event

#### API call

 ```javascript

```

**Returns**


### load

load DOM from URL

#### API call

 ```javascript

```

**Returns**


### mouseenter

add mouseenter event

#### API call

 ```javascript

```

**Returns**


### next

return next sibling to element

#### API call

 ```javascript

```

**Returns**


### ns

create/return nested objects to define a namespace

#### API call

 ```javascript

```

**Returns**


### off

remove event handler

#### API call

 ```javascript

```

**Returns**


### offset

return top,left corner of element

#### API call

 ```javascript

```

**Returns**


### offsetheight

return offset height for element

#### API call

 ```javascript

```

**Returns**


### offsetparent

return offset parent for element

#### API call

 ```javascript

```

**Returns**


### offsetwidth

return offset width for element

#### API call

 ```javascript

```

**Returns**


### on

add event handler

#### API call

 ```javascript

```

**Returns**


### one

add event handler that runs once

#### API call

 ```javascript

```

**Returns**


### oneach

array forEach 

#### API call

 ```javascript

```

**Returns**


### onmutate

event handler on DOM changes to element

#### API call

 ```javascript

```

**Returns**


### onvisible

event handler when element is displayed

#### API call

 ```javascript

```

**Returns**


### parent

return element parent

#### API call

 ```javascript

```

**Returns**


### post

post data to URL

#### API call

 ```javascript

```

**Returns**


### prev

return previous sibling to element

#### API call

 ```javascript

```

**Returns**


### ready

run function when document is loaded

#### API call

 ```javascript

```

**Returns**


### remove

remove child from an element

#### API call

 ```javascript

```

**Returns**


### removeAttr

remove an attribute from n element

#### API call

 ```javascript
    $$.removeAttr(element, name);
    bound.$$.removeAttr(name);
```

**Returns**


### replace

replace an element with other element(s)

#### API call

 ```javascript

```

**Returns**


### select

find element in document that matches selector

#### API call

 ```javascript

```

**Returns**


### show

display element

#### API call

 ```javascript

```

**Returns**


### sleep

sleep for a specified amount of time. Returns a Promise.

#### API call

 ```javascript

```

**Returns**


### stop

stop event propagation

#### API call

 ```javascript

```

**Returns**


### style

set style value

#### API call

 ```javascript

```

**Returns**


### styleDel

remove style value

#### API call

 ```javascript

```

**Returns**


### text

get/set element text content

#### API call

 ```javascript

```

**Returns**


### trigger

trigger an event

#### API call

 ```javascript

```

**Returns**


### wait

wait for a specified time to pass

#### API call

 ```javascript

```

**Returns**


### waitFor

wait for an object property to be assigned

#### API call

 ```javascript

```

**Returns**


### width

get width of element in pixels

#### API call

 ```javascript

```

**Returns**




