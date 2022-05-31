Ext.define('todo.view.main.AddWindow.AddWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addWindow',

    addElement: function(btn) {
        const window = btn.up('#editWindow')
        const methodUrl = this.getView().methodUrl;
        const execDate = Ext.Date.format(this.getViewModel().data.task.execTime.date, 'Y-m-d');
        const execTime = Ext.Date.format(this.getViewModel().data.task.execTime.time, 'H:i');
        this.getViewModel().data.task.execTime = execDate + " " + execTime;

        Ext.Ajax.request({
            method: 'POST',
            url: methodUrl,
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