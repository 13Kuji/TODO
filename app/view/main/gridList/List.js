Ext.define('todo.view.main.gridList.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'todo.store.TaskStore'
    ],
    controller: 'gridController',
    title: 'График задач',

    store: {
        type: 'task'
    },
    columns: [
        {
            xtype:'actioncolumn',
            width:50,
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit',
                    handler: 'createWindowUpdate'
                },
                {
                    iconCls: 'x-fa fa-close',
                    tooltip: 'Delete',
                    handler: 'deleteConfirm'
                },

            ]
        },
        { text: 'Пользователь', align: 'center', dataIndex: 'user', flex: 1 },
        { text: 'Название', align: 'center', dataIndex: 'title', flex: 1 },
        { text: 'Описание', align: 'center', dataIndex: 'text', flex: 2 },
        { text: 'Время выполнения', align: 'center', dataIndex: 'execTime', xtype: 'datecolumn', format: 'd.m.Y H:i', flex: 0.6 }
    ],
    buttons: [
        {
            iconAlign: 'left',
            text: 'Добавить',
            handler: 'createWindowAdd'
        }
    ],

});
