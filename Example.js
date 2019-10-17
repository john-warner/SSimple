var SimpleExample = function() {

    var list;
    var headTemplate;
    var templateHtml;
    var template2Html;
    var data = [
        {name:'Rand', value:'rand'},
        {name:'John', value:'john'}
    ];
    var objData = [
        { user: {name:'Ron', value:'ron'} },
        { user: {name:'Jack', value:'jack'} }
    ];
    var addresses = [
        { userid: { id: 'U1' }, name: 'John', address: '1234 Maple', city: 'Phoenix', state: 'AZ', zipcode: '85000'},
        { userid: { id: 'U2' }, name: 'Rand', address: '1st Street Main', city: 'New York City', state: 'NY', zipcode: { style: 'color:red;', text: () => '01010', storage: 'hello'} }
    ];

    $$.ready(Init);
    function Init() {
        console.log('Hello');

        list = $$.bind('#mylist');
        headTemplate = $$.bind('#listHeaderTemplate');
        templateHtml = $$.html($$.find('#listItemTemplate'));
        template2Html = $$.html($$.find('#listItem2Template'));
        PopulateHead();
        PopulateList();
        PopulateList2();
        ShowAddresses();
     }

    function PopulateHead() {
        list.$$.append(headTemplate.$$.copy());
    }

    function PopulateList() {
        data.forEach((d) => list.$$.appendHtml($$tache.fill(templateHtml, d)));
    }

    function PopulateList2() {
        objData.forEach((d) => list.$$.appendHtml($$tache.fill(template2Html, d)));
    }

    function ShowAddresses() {
        var template = $$.bind("#addressTemplate");
        var container = $$.bind("#addresses");
        var translate = { text: 'textContent', storage: 'data-storage', id: 'id' }
        addresses.forEach((a) => { container.$$.append($$tache.fill(template.$$.copy(), a, { translate: translate }))});
    }
}();