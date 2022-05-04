Ext.define('todo.store.TaskStore', {
    extend: 'Ext.data.Store',

    alias: 'store.task',

    fields: [
        'user',
        'title',
        'text',
        'execTime'
    ],
    proxy: {
        type: 'ajax',
        url : '/test_project/todo/api/api.php?act=Task&method=get',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: true
});
