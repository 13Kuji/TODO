Ext.define('todo.store.TaskStore', {
    extend: 'Ext.data.Store',

    alias: 'store.task',

    model: 'todo.model.TaskModel',
    proxy: {
        type: 'ajax',
        url : '/test_project/todo/api/api.php?act=Task&method=getAllForUser',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: false
});
