Ext.define('todo.store.UserStore', {
    extend: 'Ext.data.Store',

    alias: 'store.user',

    fields: [
        'name',
        'password'
    ],
    proxy: {
        type: 'ajax',
        url : '/test_project/todo/api/api.php?act=User&method=get',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: true
});
