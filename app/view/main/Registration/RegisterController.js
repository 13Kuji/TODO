Ext.define('todo.view.main.Registration.RegisterController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.register',

    addUser: function(btn,) {
        const window = btn.up('#regWindow')
        let index = 0
        let status = false
        let dataStore = Ext.StoreManager.lookup('todo.store.UserStore')
        while (1){
            const defDataStore = dataStore.getAt(index)
            if (defDataStore == null){
                break;
            }
            if (defDataStore.get('name') === this.getViewModel().data.user.name){
                status = true
                break;
            }
            index++
        }
        if (status === true) {
            Ext.MessageBox.show({
                title: 'Упс...',
                msg: 'Такое имя пользователя уже существует',
                buttons: Ext.MessageBox.OK,
            })
        }
        else {
            Ext.Ajax.request({
                method: 'POST',
                url: '/test_project/todo/api/api.php?act=User&method=add',
                params: {
                    data: [JSON.stringify(this.getViewModel().data.user)]
                },
                success: function () {
                    Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
                    Ext.MessageBox.show({
                        title: 'Регистрация',
                        msg: 'Регистрация прошла успешно!',
                        buttons: Ext.MessageBox.OK,
                    });
                    window.close()
                },
            })
        }
    },
})