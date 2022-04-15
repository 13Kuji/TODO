Ext.define('todo.view.main.gridList.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridController',

    createWindowUpgrade: function(item) {
        let rowRecord = item.getSelectionModel().getSelection()[0];
        Ext.create('todo.view.main.window.AddWindow',{
            viewModel:{
                data: {
                    task:{
                        id: rowRecord.get('id'),
                        title: rowRecord.get('title'),
                        text: rowRecord.get('text')
                    }
                }
            }
        }).show();
    },

    createWindowAdd: function() {
       Ext.create('todo.view.main.window.AddWindow',{
           viewModel:{
               data: {
                   task:{
                       id: null,
                       title: null,
                       text: null
                   }
               }
           }
       }).show();
    },
    deleteColumn: function(grid, rowIndex) {
        let store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Ajax.request({
            method: 'POST',
            url: '/test_project/todo/api/delete.php',
            params: {
                id: rec.id,
            },
            success: function () {
                store.reload();
            },
            failure: function () {
            },

            autoLoad: true
        })
        alert("Удалить задачу " + "\"" + rec.get('title') + "\"" + "?");
    }
})