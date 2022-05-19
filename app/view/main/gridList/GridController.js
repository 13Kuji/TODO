Ext.define('todo.view.main.gridList.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridController',

    createWindowUpdate: function (selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex)
        const dateToUpdate = recordTask.get('time')
        let windowUpdate = Ext.create('todo.view.main.AddWindow.AddWindow', {
            recordTask: recordTask,
            urlMethod: '/test_project/todo/api/api.php?act=Task&method=update',
            viewModel: {
                data: {
                    task: {
                        taskId: recordTask.get('taskId'),
                        previousUser: recordTask.get('userIds'),
                        currentUser: recordTask.get('userIds'),
                        title: recordTask.get('title'),
                        text: recordTask.get('text'),
                        execTime: {
                            date: new Date(dateToUpdate),
                            time: new Date(dateToUpdate)
                        }
                    }
                }
            }
        })
        if (todo.config.Global.getUser() === 1) {
            Ext.ComponentQuery.query('#userSelectBox')[0].show()
        }
        windowUpdate.show();
    },

    createReg: function () {
        let windowReg = Ext.create('todo.view.main.Registration.Register', {
            viewModel: {
                data: {
                    user: {
                        name: null,
                        password: null
                    }
                }
            }
        })

        windowReg.show();
    },
    createWindowAdd: function () {
        let windowAdd = Ext.create('todo.view.main.AddWindow.AddWindow', {
            urlMethod: '/test_project/todo/api/api.php?act=Task&method=add',
            viewModel: {
                data: {
                    task: {
                        id: null,
                        currentUser: todo.config.Global.getUser(),
                        title: null,
                        text: null,
                        execTime: {
                            date: new Date(),
                            time: new Date()
                        }
                    }
                }
            }
        })
        if (todo.config.Global.getUser() === 1) {
            Ext.ComponentQuery.query('#userSelectBox')[0].show()
            windowAdd.getViewModel().data.task.currentUser = null
        }
        windowAdd.show();
    },
    deleteConfirm: function (selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex);
        let idRecordTask = recordTask.getData().taskId
        let windowDelete = Ext.create('todo.view.main.DeleteConfirm.DeleteConfirm', {
            recordTask: idRecordTask
        });
        windowDelete.show();
    }
})