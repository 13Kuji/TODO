Ext.define('todo.view.main.AddWindow.AddWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addWindow',

    addElement: function(btn,) {
        const window = btn.up('#editWindow')
        const urlMethod = this.getView().urlMethod;
        Ext.Ajax.request({
            method: 'POST',
            url: urlMethod,
            params: {
                data: JSON.stringify(this.getViewModel().data.task)
            },
            success: function () {
                Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
                window.close()
            },
        })
    },
})