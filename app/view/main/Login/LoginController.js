Ext.define('todo.view.main.Login.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login',

    checkUser: function(btn, a) {
        const window = btn.up('#logWindow')
        let index = 0
        let status = 0
        while (1){
            const data = Ext.StoreManager.lookup('todo.store.UserStore').getAt(index);
            if (data == null){
                break;
            }
            if ((data.get('name') === this.getViewModel().data.user.name)&&((data.get('password') === this.getViewModel().data.user.password))){
                status = 1
                break;
            }
            index++
        }
        if (status === 1){
            Ext.MessageBox.show({
                title: 'Успешно',
                msg: 'Вход в личный кабинет...',
                buttons: Ext.MessageBox.OK,
            });
            window.close()
        }
        else {
            Ext.MessageBox.show({
                title: 'Провал',
                msg: 'Проверьте данные!',
                buttons: Ext.MessageBox.OK,
            });
            window.close()

        }
            // success: function () {
            //     Ext.ComponentQuery.query('mainlist')[0].getStore().reload()
            //     Ext.MessageBox.show({
            //         title: 'Регистрация',
            //         msg: 'Регистрация прошла успешно!',
            //         buttons: Ext.MessageBox.OK,
            //     });
            //     window.close()
            // },
    }
})