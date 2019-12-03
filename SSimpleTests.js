test('Test assertions are working', function (assert) {
    var result = [];
    var expected = [];
    assert.deepEqual(result, expected);
});

test('Test extend', function (assert) {
    var result = $$.extend({}, { a: 1, b: 'test' });
    var expected = { a: 1, b: 'test' };
    assert.deepEqual(result, expected);
});

test('Test oneach', function (assert) {
    var result = [];
    $$.oneach([1,2], (v) => result.push(v*2));
    var expected = [2,4];
    assert.deepEqual(result, expected);
});

// test('Test curry', function (assert) {
//     var curried = $$.curry((a,b) =>  a + b);
//     var result = curried(1)(2);
//     var expected = 3;
//     assert.deepEqual(result, expected);
// }); 

// test('Test map', function (assert) {
//     var result = $$.map((v)=>v*2)([1,2,3]);
//     var expected = [2,4,6];
//     assert.deepEqual(result, expected);
// });

// test('Test join', function (assert) {
//     var result = $$.join('-')(['a','b','c']);
//     var expected = "a-b-c";
//     assert.deepEqual(result, expected);
// });

// test('Test toLowerCase', function (assert) {
//     var result = $$.toLowerCase("Hello");
//     var expected = "hello";
//     assert.deepEqual(result, expected);
// });

// test('Test split', function (assert) {
//     var result = $$.split(",")("a,b");
//     var expected = ['a','b'];
//     assert.deepEqual(result, expected);
// }); 

// test('Test flow', function (assert) {
//     var result = $$.flow(
//         (s) => s.toLowerCase(), 
//         (s) => s.split(',')
//     )('a,B');
//     var expected = ['a', 'b'];
//     assert.deepEqual(result, expected);
// });

// test('Test backflow', function (assert) {
//     var result = $$.backflow(
//         (s) => s.split(','),
//         (s) => s.toLowerCase() 
//     )('a,B');
//     var expected = ['a', 'b'];
//     assert.deepEqual(result, expected);
// });

// test('Test compose', function (assert) {
//     var result = $$.compose(
//         (s) => s.split(','),
//         (s) => s.toLowerCase() 
//     )('a,B');
//     var expected = ['a', 'b'];
//     assert.deepEqual(result, expected);
// });

const delay = async () => new Promise((resolve) => setTimeout(resolve, 0));

test('Test isFunction true', function (assert) {
    var result = $$.isFunction(() => 1);
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test isFunction false', function (assert) {
    var result = $$.isFunction('');
    var expected = false;
    assert.deepEqual(result, expected);
});

test('Test isPlainObject true', function (assert) {
    var result = $$.isPlainObject({});
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test isPlainObject false', function (assert) {
    var result = $$.isPlainObject(1);
    var expected = false;
    assert.deepEqual(result, expected);
});

test('Test isArray true', function (assert) {
    var result = $$.isArray([]);
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test isArray false', function (assert) {
    var result = $$.isArray(1);
    var expected = false;
    assert.deepEqual(result, expected);
});

test('Test isString true', function (assert) {
    var result = $$.isString('');
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test isString false', function (assert) {
    var result = $$.isString([]);
    var expected = false;
    assert.deepEqual(result, expected);
});

test('Test isFragment true', function (assert) {
    var result = $$.isFragment($$.fragment("<div></div>"));
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test isFragment false', function (assert) {
    var result = $$.isFragment([]);
    var expected = false;
    assert.deepEqual(result, expected);
});

test('Test select', function (assert) {
    var result = $$.select('#test').outerHTML;
    var expected = '<div id="test"></div>';
    assert.deepEqual(result, expected);
});

test('Test find', function (assert) {
    var result = $$.find('#test').outerHTML;
    var expected = '<div id="test"></div>';
    assert.deepEqual(result, expected);
});

test('Test findall', function (assert) {
    var result = '';
    $$.findall('ul.test > li').forEach((e) => result = result + e.outerHTML);
    var expected = "<li>One</li><li>Two</li>";
    assert.deepEqual(result, expected);
});

test('Test findid', function (assert) {
    var result = $$.findid('test').outerHTML;
    var expected = '<div id="test"></div>';
    assert.deepEqual(result, expected);
});

test('Test findname', function (assert) {
    var result = '';
    $$.findname('test').forEach((e) => result = result + e.outerHTML);
    var expected = '<span name="test"></span><span name="test"></span>';
    assert.deepEqual(result, expected);
});

test('Test findtag', function (assert) {
    var result = '';
    [...$$.findtag($$.find('ul.test'), 'li')].forEach((e) => result = result + e.outerHTML);
    var expected = "<li>One</li><li>Two</li>";
    assert.deepEqual(result, expected);
});

test('Test clone', function (assert) {
    var result = $$.clone($$.findid('test')).outerHTML;
    var expected = '<div id="test"></div>';
    assert.deepEqual(result, expected);
});

test('Test copy', function (assert) {
    var frag = $$.copy($$.findid("testTemplate"));
    var result = $$.html(frag);
    var expected = "<div>Hello</div>";
    assert.deepEqual(result, expected);
});

test('Test create', function (assert) {
    var result = $$.create("div").outerHTML;
    var expected = "<div></div>";
    assert.deepEqual(result, expected);
});

test('Test cloneContent', function (assert) {
    var frag = $$.cloneContent($$.findid("testTemplate"));
    var result = $$.html(frag);
    var expected = "<div>Hello</div>";
    assert.deepEqual(result, expected);
});

test('Test import', function (assert) {
    var frag = $$.copy($$.findid("testTemplate"));
    var result = $$.html(frag);
    var expected = "<div>Hello</div>";
    assert.deepEqual(result, expected);
});

test('Test fragmentHtml', function (assert) {
    var frag = $$.findid("testTemplate").content;
    var result = $$.html(frag);
    var expected = "<div>Hello</div>";
    assert.deepEqual(result, expected);
});

test('Test contains', function (assert) {
    var parent = $$.find('.test');
    var child = parent.children[0];
    var result = $$.contains(parent, child);
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test empty', function (assert) {
    var dom = $$.copy('#testTemplate');
    $$.empty(dom.children[0]);
    var result = $$.html(dom);
    var expected = "<div></div>";
    assert.deepEqual(result, expected);
});

test('Test html', function (assert) {
    var result = $$.html($$.find(".testName"));
    var expected = '<span name="test"></span><span name="test"></span>';
    assert.deepEqual(result, expected);
});

test('Test text', function (assert) {
    var dom = $$.copy($$.find("#test"));
    $$.text(dom, 'Testing');
    var result = $$.html(dom);
    var expected = 'Testing';
    assert.deepEqual(result, expected);
});

test('Test remove', function (assert) {
    var parent = $$.clone('.test');
    $$.remove(parent.children[0]);

    var result = $$.html(parent);
    var expected = "<li>Two</li>";
    assert.deepEqual(result, expected);
});

test('Test append', function (assert) {
    var dom = $$.copy("#test");
    $$.append(dom, $$.create("div"));
    var result = $$.html(dom);
    var expected = "<div></div>";
    assert.deepEqual(result, expected);
});

test('Test appendHtml', function (assert) {
    var dom = $$.copy("#test");
    $$.appendHtml(dom, "<div></div>");
    var result = $$.html(dom);
    var expected = "<div></div>";
    assert.deepEqual(result, expected);
});

test('Test fragment', function (assert) {
    var dom = $$.fragment("<ul><li>Test</li></ul>");
    var result = $$.html(dom);
    var expected = "<ul><li>Test</li></ul>";
    assert.deepEqual(result, expected);
});

test('Test hasclass true', function (assert) {
    var result = $$.hasclass($$.find('.test'), 'test');
    var expected = true;
    assert.deepEqual(result, expected);
});

test('Test hasclass false', function (assert) {
    var result = $$.hasclass($$.find('.test'), 'notest');
    var expected = false;
    assert.deepEqual(result, expected);
});
test('Test css', function (assert) {
    var result = $$.css($$.find('.testName')).getPropertyValue('display');
    var expected = 'none';
    assert.deepEqual(result, expected);
});

test('Test cssrule', function (assert) {
    var result = $$.cssrule($$.find('.testName'), 'display');
    var expected = 'none';
    assert.deepEqual(result, expected);
});

test('Test cssToggle', function (assert) {
    var dom = $$.find('.test');
    $$.cssToggle(dom, 'toggle');
    var result = dom.className;
    $$.cssToggle(dom, 'toggle');
    result = result + dom.className;
    var expected = "test toggletest";
    assert.deepEqual(result, expected);
});

test('Test cssReplace', function (assert) {
    var dom = $$.find('.test');
    $$.cssReplace(dom, 'test', 'replace');
    var result = dom.className;
    $$.cssReplace(dom, 'replace', 'test');
    result = result + dom.className;
    var expected = "replacetest";
    assert.deepEqual(result, expected);
});

test('Test cssDel', function (assert) {
    var dom = $$.find('.test');
    $$.cssDel(dom, 'test');
    var result = dom.className;
    $$.cssAdd(dom, 'test');
    var expected = '';
    assert.deepEqual(result, expected);
});

test('Test cssAdd', function (assert) {
    var dom = $$.find('.test');
    $$.cssAdd(dom, 'added');
    var result = dom.className;
    $$.cssDel(dom, 'added');
    var expected = 'test added';
    assert.deepEqual(result, expected);
});

test('Test style', function (assert) {
    var dom = $$.find('.test');
    $$.style(dom, 'color', 'rgb(1,1,1)');
    var result = $$.cssrule(dom,'color');
    $$.styleDel(dom, 'color');
    var expected = "rgb(1, 1, 1)";
    assert.deepEqual(result, expected);
});

test('Test styleDel', function (assert) {
    var dom = $$.find('.test');
    $$.style(dom, 'color', 'rgb(1,1,1)');
    $$.styleDel(dom, 'color');
    var result = [...dom.style];
    var expected = ["display"];
    assert.deepEqual(result, expected);
});

test('Test height', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="height:100px"></div>'));
    var result = $$.height(dom.children[0]);
    var expected = 100;
    assert.deepEqual(result, expected);
});

test('Test width', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="width:100px"></div>'));
    var result = $$.width(dom.children[0]);
    var expected = 100;
    assert.deepEqual(result, expected);
});

test('Test offsetheight', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="height:200px"></div>'));
    var result = $$.offsetheight(dom.children[0]);
    var expected = 200;
    assert.deepEqual(result, expected);
});

test('Test offsetwidth', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="width:200px"></div>'));
    var result = $$.offsetwidth(dom.children[0]);
    var expected = 200;
    assert.deepEqual(result, expected);
});

test('Test offsetparent', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="padding:20px"></div>'));
    var result = $$.html($$.offsetparent(dom.children[0]));
    var expected = '<div style="padding:20px"></div>';
    assert.deepEqual(result, expected);
});

test('Test bounds', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    var result = $$.bounds(dom).toString();
    var expected = '[object DOMRect]';
    assert.deepEqual(result, expected);
});

test('Test offset', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="padding:20px"></div>'));
    var result = $$.offset(dom.children[0]);
    var expected = {
        "left": 16,
        "top": 127.78125
      };
    assert.deepEqual(result, expected);
});

test('Test parent', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div style="padding:20px"></div>'));
    var result = $$.parent(dom.children[0]).id;
    var expected = 'testAppend';
    assert.deepEqual(result, expected);
});

test('Test next', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div id="e1"></div><div id="e2"></div>'));
    var result = $$.next(dom.children[0]).id;
    var expected = 'e2';
    assert.deepEqual(result, expected);
});

test('Test prev', function (assert) {
    var dom = $$.find('#testAppend');
    $$.empty(dom);
    $$.append(dom, $$.fragment('<div id="e1"></div><div id="e2"></div>'));
    var result = $$.prev(dom.children[1]).id;
    var expected = 'e1';
    assert.deepEqual(result, expected);
});

test('Test attr', function (assert) {
    var dom = $$.fragment('<div data-test="test"></div>');
    var result = $$.attr(dom.children[0], "data-test");
    var expected = 'test';
    assert.deepEqual(result, expected);
});

test('Test removeAttr', function (assert) {
    var dom = $$.fragment('<div data-test="test"></div>');
    $$.removeAttr(dom.children[0], "data-test");
    var result = $$.attr(dom.children[0], "data-test");
    var expected = null;
    assert.deepEqual(result, expected);
});

test('Test attr set', function (assert) {
    var dom = $$.fragment('<div data-test="test"></div>');
    $$.attr(dom.children[0], "data-test", "xyz");
    var result = $$.attr(dom.children[0], "data-test");
    var expected = 'xyz';
    assert.deepEqual(result, expected);
});

test('Test hide', function (assert) {
    var dom = $$.fragment('<div></div>');
    $$.hide(dom.children[0]);
    var result = $$.fragmentHtml(dom);
    var expected = '<div style="display: none;"></div>';
    assert.deepEqual(result, expected);
});

test('Test show', function (assert) {
    var dom = $$.fragment('<div></div>');
    $$.show(dom.children[0]);
    var result = $$.fragmentHtml(dom);
    var expected = '<div style="display: block;"></div>';
    assert.deepEqual(result, expected);
});

test('Test on', function (assert) {
    var dom = $$.find('#test');
    $$.on(dom, 'click', () => { result = 'Clicked'; })
    var result = '';
    $$.trigger(dom, 'click');
    var expected = 'Clicked';
    assert.deepEqual(result, expected);
});

test('Test one', function (assert) {
    var dom = $$.find('#test');
    var count = 0;
    $$.one(dom, 'click', () => { result = '' + ++count; })
    var result = '';
    $$.trigger(dom, 'click');
    $$.trigger(dom, 'click');
    var expected = '1';
    assert.deepEqual(result, expected);
});

test('Test off', function (assert) {
    var dom = $$.find('#test');
    var f = () => { result = "Clicked"; };

    $$.on(dom, 'click', f);
    $$.off(dom, 'click', f);
    var result = 'Not clicked';
    $$.trigger(dom, 'click');
    var expected = 'Not clicked';
    assert.deepEqual(result, expected);
});

test('Test click', function (assert) {
    var dom = $$.find('#test');
    var result = 'Not clicked';

    $$.click(dom, () => { result = "Clicked"; });
    $$.click(dom);
    var expected = 'Clicked';
    assert.deepEqual(result, expected);
});

test('Test mouseenter', function (assert) {
    var dom = $$.find('#test');
    var result = 'Not entered';

    $$.mouseenter(dom, () => { result = "Entered"; });
    $$.mouseenter(dom);
    var expected = 'Entered';
    assert.deepEqual(result, expected);
});

test('Test keyup', function (assert) {
    var dom = $$.find('#test');
    var result = 'No keyup';

    $$.keyup(dom, () => { result = "Key up"; });
    $$.keyup(dom);
    var expected = 'Key up';
    assert.deepEqual(result, expected);
});

test('Test keydown', function (assert) {
    var dom = $$.find('#test');
    var result = 'No keydown';

    $$.keydown(dom, () => { result = "Key down"; });
    $$.keydown(dom);
    var expected = 'Key down';
    assert.deepEqual(result, expected);
});

test('Test trigger', function (assert) {
    var dom = $$.find('#test');
    var result = 'Not clicked';

    $$.click(dom, () => { result = "Clicked"; });
    $$.trigger(dom, 'click');
    var expected = 'Clicked';
    assert.deepEqual(result, expected);
});

// test('Test ready', function (assert) {
//     var result = 'not implemented';
//     var expected = '';
//     assert.deepEqual(result, expected);
// });

// test('Test delay', function (assert) {
//     var result = 'not implemented';
//     var expected = '';
//     assert.deepEqual(result, expected);
// });

test('Test extend', function (assert) {
    var result = $$.extend({}, { test: 1 });
    var expected = { test: 1 };
    assert.deepEqual(result, expected);
});

test('Test channel and sleep', async function (assert) {
    var result = "";
    var channel = $$.channel('sstest', 
        (m) => result = m );
    channel.send('Success');
    await $$.sleep(50);
    var expected = "Success";
    assert.deepEqual(result, expected);
});

// test('Test onvisible', function (assert) {
//     var result = $$.extend({}, { test: 1 });
//     var expected = null;
//     assert.deepEqual(result, expected);
// });

// test('Test onmutate', function (assert) {
//     var result = $$.extend({}, { test: 1 });
//     var expected = null;
//     assert.deepEqual(result, expected);
// });

// test('Test post', function (assert) {
//     var result = 'not implemented';
//     var expected = '';
//     assert.deepEqual(result, expected);
// });

// test('Test get', function (assert) {
//     var result = 'not implemented';
//     var expected = '';
//     assert.deepEqual(result, expected);
// });

// test('Test load', function (assert) {
//     var result = 'not implemented';
//     var expected = '';
//     assert.deepEqual(result, expected);
// });

test('Test bind', function (assert) {
    var dom = $$.bind($$.fragment('<div></div>').children[0]);
    dom.$$.hide();
    var result = dom.outerHTML;
    var expected = '<div style="display: none;"></div>';
    assert.deepEqual(result, expected);
});

test('Test replace', function (assert) {
    var html = '<div><span id="test"></span></div>';
    var template = document.createElement("template");
    template.innerHTML = html;
    var htmlReplace = 'Success';
    var templateReplace = document.createElement("template");
    templateReplace.innerHTML = htmlReplace;

    $$.replace($$.find(template.content,'#test'), templateReplace.content);

    var result = template.innerHTML;
    var expected = '<div>Success</div>';
    assert.deepEqual(result, expected);
});

test('Test waitFor', async function (assert) {
    var result = null;
    let obj = {};

    $$.waitFor(obj, 'test').then(() => { result = 'Success'; });
    obj.test = '';
    await $$.sleep(50);

    var expected = 'Success';
    assert.deepEqual(result, expected);
});

test('Test ns', function (assert) {
    $$.ns('a.b.c').test = 'Success';
    var result = a.b.c.test;
    var expected = 'Success';
    assert.deepEqual(result, expected);
});

test('Test data', function (assert) {
    var dom = $$.fragment('<div></div>');
    $$.data(dom.children[0], "test", "Success");
    var result = $$.data(dom.children[0], "test");
    var expected = 'Success';
    assert.deepEqual(result, expected);
});

