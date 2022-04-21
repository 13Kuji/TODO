Ext.define('todo.view.main.DeleteConfirm.DeleteConfirmController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.deleteConfirm',

    onDeleteConfirm: function(btn) {
        const window = btn.up('#deleteWindow')
        const recordTaskId = this.getView().recordTask.id;
        Ext.Ajax.request({
            method: 'POST',
            url: '/test_project/todo/api/deleteTask.php',
            params: {
                id: recordTaskId,
            },
            success: function () {
                Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
                window.close()
            },
        })
    }
})