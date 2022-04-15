Ext.define('todo.view.main.window.AddWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.window',

    addElement: function(btn) {
        let window = btn.up('#editWindow')
        Ext.Ajax.request({
            method: 'POST',
            url: '/test_project/todo/api/updateAdd.php',
            params: {
                data: JSON.stringify(this.getViewModel().data.task)
            },
            success: function () {
                Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
                window.close()
            },
            failure: function () {
            },

            autoLoad: true
        })
    },
})