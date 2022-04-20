Ext.define('todo.view.main.gridList.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridController',

    createWindowUpgrade: function(item) {
        let rowRecord = item.getSelectionModel().getSelection()[0];
        Ext.create('todo.view.main.AddWindow.AddWindow',{
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
        Ext.create('todo.view.main.AddWindow.AddWindow',{
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
    deleteConfirm: function(grid, rowIndex) {
        //const s = grid.getController();
        const store = grid.getStore();
        const rec = grid.getStore().getAt(rowIndex);
        let a = Ext.create('todo.view.main.DeleteConfirm.DeleteConfirm',{
            rec: rec
        });
        a.show();
    }
})