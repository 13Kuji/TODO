Ext.define('todo.view.main.gridList.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'todo.store.Personnel'
    ],
    controller: 'gridController',
    title: 'График задач',

    store: {
        type: 'personnel'
    },
    columns: [
        {
            xtype:'actioncolumn',
            width:50,
             items: [
            {
                iconCls: 'x-fa fa-close',
                tooltip: 'Delete',
                handler: 'deleteColumn'
            }],
        },
        { text: 'Название', align: 'center', dataIndex: 'title', flex: 1 },
        { text: 'Описание', align: 'center', dataIndex: 'text', flex: 2 },
        { text: 'Время', align: 'center', dataIndex: 'time', flex: 0.6 }
    ],
    buttons: [
        {
            align: 'left',
            text: 'Добавить',
            handler: 'createWindowAdd'
        }
    ],
    listeners: {
        celldblclick: 'createWindowUpgrade'
    }

});
