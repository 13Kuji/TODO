Ext.define('todo.view.main.Registration.RegisterController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.register',

    addUser: function(btn,) {
        const window = btn.up('#regWindow')
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
    },
})