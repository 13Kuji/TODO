Ext.define('todo.store.TaskStore', {
    extend: 'Ext.data.Store',

    alias: 'store.task',

    fields: [
        'userIds',
        'name',
        'taskId',
        'title',
        'text',
        'time'
    ],
    proxy: {
        type: 'ajax',
        url : '/test_project/todo/api/api.php?act=Task&method=get',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: false
});
