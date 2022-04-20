Ext.define('todo.view.main.DeleteConfirm.DeleteConfirm', {
    extend: 'Ext.window.MessageBox',
    controller: 'deleteConfirm',
    itemId: 'deleteWindow',
    title : 'Delete',
    msg : 'Do you want to Delete  ',
    width : 300,
    closable : false,
    rec: null,
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