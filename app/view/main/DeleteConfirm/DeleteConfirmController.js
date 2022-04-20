Ext.define('todo.view.main.DeleteConfirm.DeleteConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deleteConfirm',

    onDeleteConfirm: function(btn) {
        let window = btn.up('#deleteWindow')
        const recordId = this.getView().rec.id;
        Ext.Ajax.request({
            method: 'POST',
            url: '/test_project/todo/api/delete.php',
            params: {
                id: recordId,
            },
            success: function () {
                Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
                window.close()

            },
            failure: function () {
            },
        })

    }
})