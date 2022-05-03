Ext.define('todo.view.main.gridList.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridController',

    createWindowUpdate: function(selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex)
        const dateToUpdate = recordTask.get('execTime')
        let windowUpdate = Ext.create('todo.view.main.AddWindow.AddWindow',{
            recordTask: recordTask,
            urlMethod: '/test_project/todo/api/api.php?act=Task&method=update',
            viewModel:{
                data: {
                    task:{
                        id: recordTask.get('id'),
                        title: recordTask.get('title'),
                        text: recordTask.get('text'),
                        execTime: {
                            date: new Date(dateToUpdate),
                            time: new Date(dateToUpdate)
                        }
                    }
                }
            }
        });
        windowUpdate.show();
    },

    createWindowAdd: function() {
        let windowAdd = Ext.create('todo.view.main.AddWindow.AddWindow',{
            urlMethod: '/test_project/todo/api/api.php?act=Task&method=add',
            viewModel:{
                data: {
                    task:{
                        id: null,
                        title: null,
                        text: null,
                        execTime: {
                            date: new Date(),
                            time: new Date()
                        }
                    }
                }
            }
        });
        windowAdd.show();
    },

    deleteConfirm: function(selectedColumn, lineIndex) {
        const recordTask = selectedColumn.getStore().getAt(lineIndex);
        let windowDelete = Ext.create('todo.view.main.DeleteConfirm.DeleteConfirm',{
            recordTask: recordTask
        });
        windowDelete.show();
    }
})