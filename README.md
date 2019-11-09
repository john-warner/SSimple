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
* select - find element in document that matches selector
* show - display element
* sleep - sleep for a specified amount of time. Returns a Promise.
* stop - stop event propagation
* style - set style value
* styleDel - remove style value
* text - get/set element text content
* trigger - trigger an event
* wait - wait for a specified time to pass
* width - get width of element in pixels
