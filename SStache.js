// SStache
// Simple mustache placeholder replacement
// Slightly modified from placeholder.js
// Thank you Chris Ferdinandi at https://vanillajstoolkit.com/helpers/placeholders/
//
var $$tache = function() {

    var version = '0.5.0.0';
  
    var exports = { version: version };
    var defaultOptions = {
        removess: true,
        escape: true,
        translate: null
    };

    function GetValue(obj, path) {
        var current = null;
        path.split('.').forEach((o) => {
            current = (current != null) ? current[o] : obj[o];
            if (typeof (current) === 'undefined')
                return current;
        });
            
        return current;
    }
    
    function EscapeForHtml(s) {
        if (typeof(s) === 'string') {
            return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        else
            return '';
    }

    function IncludeAllOptions(options) {
        return Object.assign({...defaultOptions}, options); // make copy of options with all options
    }

    function Fill(template, data, options = defaultOptions) {
        return (typeof template === "string") ? 
            FillHTML(template, data, options) :
            FillDOM(template, data, options);
    }

    function FillHTML(template, data, options = defaultOptions) {
        options = IncludeAllOptions(options);

         // Check if the template is a string or a function
        template = typeof (template) === 'function' ? template() : template;
        if (['string', 'number'].indexOf(typeof template) === -1) throw 'Please provide a valid template';
    
        // If no data, return template as-is
        if (!data) return template;
    
        // Replace our curly braces with data
        template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {
    
            // Remove the wrapping curly braces
            match = match.slice(2, -2);
    
            // Get the value
            var val = GetValue(data, match);

            // Replace
            if (typeof(val) === 'undefined')
                return '{{' + match + '}}';
            else {
                if (typeof (val) === 'function')
                    val = val();
                if (options.escape)
                    return EscapeForHtml(val);
                else
                    return val;
            }
        });
    
        return template;
    
    };

    function FillDOM(dom, data, options = defaultOptions) {
        options = IncludeAllOptions(options);

        var stached = dom.querySelectorAll("[SS]");

        stached.forEach((e) => {
            FillElementWithDataTranslate(e, data[e.getAttribute("SS")],  options.translate);
            if (options.removess)
                e.removeAttribute("SS");
        });

        return dom;
    }

    function FillElementWithDataTranslate(element, data, translate) {
        if (typeof data === 'function')
            data = data();

        if (typeof data === 'string') {
            element.textContent = data;
        }
        else { // should be object with attribute values
            for (var key in data) {
                var tkey = key;
                var translated = false;
                var dataValue = GetDataValue(data[key], data, element);

                if (translate && translate.hasOwnProperty(key)) {
                    tkey = translate[key];
                    translated = true;
                }

                if (typeof element[tkey] !== 'undefined') {
                    element[tkey] = dataValue;
                }
                else if (element.hasAttribute(tkey)) {
                    element.setAttribute(tkey, dataValue);
                }
                else if (translated)
                    element[tkey] = dataValue;
            }
        }
    }

    function GetDataValue(data, src, element) {
        return (typeof data === 'function') ? data(src, element) : data;
    }

    exports.fill = Fill;
    exports.fillHTML = FillHTML;
    exports.fillDOM = FillDOM;
 
    return exports;
}();
