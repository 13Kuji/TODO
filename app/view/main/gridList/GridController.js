Ext.define('todo.view.main.gridList.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridController',

    createWindowUpdate: function (selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex)
        const dateToUpdate = recordTask.get('execTime')
        let windowUpdate = Ext.create('todo.view.main.AddWindow.AddWindow', {
            recordTask: recordTask,
            urlMethod: '/test_project/todo/api/api.php?act=Task&method=update',
            viewModel: {
                data: {
                    task: {
                        id: recordTask.get('id'),
                        user: recordTask.get('user'),
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
        if (Ext.ComponentQuery.query('mainlist')[0].getTitle() === 'admin') {
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
                        user: Ext.ComponentQuery.query('mainlist')[0].getStore().getAt(0).get('user'),
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
        if (Ext.ComponentQuery.query('mainlist')[0].getTitle() === 'admin') {
            Ext.ComponentQuery.query('#userSelectBox')[0].show()
        }
        windowAdd.show();
    },
    deleteConfirm: function (selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex);
        let windowDelete = Ext.create('todo.view.main.DeleteConfirm.DeleteConfirm', {
            recordTask: recordTask
        });
        windowDelete.show();
    }
})