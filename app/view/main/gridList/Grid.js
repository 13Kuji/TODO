Ext.define('todo.view.main.gridList.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    hidden: true,
    controller: 'gridController',
    store: {
        type: 'task'
    },
    title: 'График задач',
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
        { text: 'Пользователь', itemId: 'gridUserName', hidden: true, align: 'center', dataIndex: 'name',  flex: 1 },
        { text: 'Название', align: 'center', dataIndex: 'title', flex: 1 },
        { text: 'Описание', align: 'center', dataIndex: 'text', flex: 2 },
        { text: 'Время выполнения', align: 'center', dataIndex: 'time', xtype: 'datecolumn', format: 'd.m.Y H:i', flex: 0.6 }
    ],
    buttons: [
        {
            itemId: 'addButton',
            text: 'Добавить задачу',
            handler: 'createWindowAdd',


        },
        {
            itemId: 'addRegButton',
            hidden: true,
            text: 'Создать пользователя',
            handler: 'createReg',


        },
    ],

});
