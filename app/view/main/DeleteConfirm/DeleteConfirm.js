Ext.define('todo.view.main.DeleteConfirm.DeleteConfirm', {
    extend: 'Ext.window.MessageBox',
    controller: 'deleteConfirm',
    itemId: 'deleteWindow',
    title : 'Delete',
    msg : "Вы точно хотите удалить задачу \" recordTask.title \" ",
    width : 400,
    height: 400,
    closable : false,
    recordTask: null,
    buttons: [
        {
            text: 'Принять',
            handler: 'onDeleteConfirm'
        },
        {
            text: 'Выйти',
            handler: function () {
                this.up('window').close();
            }
        }
    ],
});