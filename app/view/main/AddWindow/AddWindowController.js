Ext.define('todo.view.main.AddWindow.AddWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addWindow',

    addElement: function(btn,) {
        const window = btn.up('#editWindow')
        const urlMethod = this.getView().urlMethod;
        const dateToCheck = Ext.Date.format(this.getViewModel().data.task.execTime.date, 'Y-m-d');
        const timeToCheck = Ext.Date.format(this.getViewModel().data.task.execTime.time, 'H:i');
        this.getViewModel().data.task.execTime = dateToCheck + " " + timeToCheck;

        Ext.Ajax.request({
            method: 'POST',
            url: urlMethod,
            params: {
                data: [JSON.stringify(this.getViewModel().data.task),]
            },
            success: function () {
                Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
                window.close()
            },
        })
    },
})