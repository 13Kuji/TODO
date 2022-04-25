Ext.define('todo.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    fields: [
        'title',
        'text',
        'execTime'
    ],
    proxy: {
        type: 'ajax',
        url : '/test_project/todo/api/getTasks.php',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: true
});
