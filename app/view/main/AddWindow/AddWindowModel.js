Ext.define('todo.view.main.AddWindow.AddWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.addWindow',

    data: {
        task: {
            taskId: null,
            previousUsers: null,
            currentUsers: null,
            title: null,
            text: null,
            execTime: {
                date: null,
                time: null
            }
        }
    }
});