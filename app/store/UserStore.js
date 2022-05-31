Ext.define('todo.store.UserStore', {
    extend: 'Ext.data.Store',
    alias: 'store.user',

    fields: [
        'id',
        'name',
        'password'
    ],

    proxy: {
        type: 'ajax',
        url : '/test_project/todo/api/api.php?act=User&method=getAll',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: true
});
