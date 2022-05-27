Ext.define('todo.view.main.gridList.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridController',

    const: adminId = 1,

    createWindowUpdate: function (selectedColumn, lineIndex,) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex);
        const dateToUpdate = recordTask.get('time');
        let url = '/test_project/todo/api/api.php?act=Task&method=updateTaskFromUser';
        if (todo.config.Global.getUserId() === adminId) {
            url = '/test_project/todo/api/api.php?act=Task&method=updateTaskFromAdmin'
        }

        let updateWindow = Ext.create('todo.view.main.AddWindow.AddWindow', {
            recordTask: recordTask,
            urlMethod: url,
        })

        let updateWindowVM = updateWindow.getViewModel();
        updateWindowVM.set('task.taskId', recordTask.get('taskId'));
        updateWindowVM.set('task.previousUsers', recordTask.get('userIds'));
        updateWindowVM.set('task.currentUsers', recordTask.get('userIds'));
        updateWindowVM.set('task.title', recordTask.get('title'));
        updateWindowVM.set('task.text', recordTask.get('text'));
        updateWindowVM.set('task.execTime.date', new Date(dateToUpdate));
        updateWindowVM.set('task.execTime.time', new Date(dateToUpdate));

        if (todo.config.Global.getUserId() === adminId) {
            Ext.ComponentQuery.query('#userSelectBox')[0].show();
        }
        updateWindow.show();
    },

    createReg: function () {
        let regWindow = Ext.create('todo.view.main.Registration.Register', )
        regWindow.show();
    },

    createWindowAdd: function () {
        let addWindow = Ext.create('todo.view.main.AddWindow.AddWindow', {
            urlMethod: '/test_project/todo/api/api.php?act=Task&method=add',
        })

        let addWindowVM = addWindow.getViewModel();
        addWindowVM.set('task.execTime.date', new Date);
        addWindowVM.set('task.execTime.time', new Date);
        if (todo.config.Global.getUserId() === adminId) {
            Ext.ComponentQuery.query('#userSelectBox')[0].show();
            addWindowVM.set('task.currentUsers', null);
        }
        else {
            addWindowVM.set('task.currentUsers', todo.config.Global.getUserId());
        }

        addWindow.show();
    },

    deleteConfirm: function (selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex);
        let idRecordTask = recordTask.getData().taskId;

        let windowDelete = Ext.create('todo.view.main.DeleteConfirm.DeleteConfirm', {
            recordTask: idRecordTask
        });

        windowDelete.show();
    }
})