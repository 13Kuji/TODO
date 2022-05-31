Ext.define('todo.model.TaskModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'userIds'},
        {name: 'name'},
        {name: 'taskId', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'time', type: 'date'}
    ]
});