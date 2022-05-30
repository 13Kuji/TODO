Ext.define('todo.view.main.Login.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login',

    onSuccessLogin: function (dataStore, index, activeWindow) {
        Ext.MessageBox.show({
            title: 'Успешно',
            msg: 'Вход в личный кабинет...',
            buttons: Ext.MessageBox.OK,
        });
        if (dataStore.getAt(index).get('id') === 1) {
            Ext.ComponentQuery.query('mainlist')[0].getStore().proxy.url = '/test_project/todo/api/api.php?act=Task&method=getAll';
        }
        Ext.ComponentQuery.query('mainlist')[0].getStore().proxy.extraParams = { id : dataStore.getAt(index).get('id')};
        Ext.ComponentQuery.query('mainlist')[0].getStore().load();

        if (dataStore.getAt(index).get('id') === 1){
            Ext.ComponentQuery.query('#addRegButton')[0].show();
            Ext.ComponentQuery.query('#gridUserName')[0].show();
        }

        todo.config.Global.setUserId(dataStore.getAt(index).get('id'));
        Ext.ComponentQuery.query('mainlist')[0].setTitle(dataStore.getAt(index).get('name'));
        Ext.ComponentQuery.query('mainlist')[0].show();
        activeWindow.close();
    },

    sendLoginFailureMessage: function (activeWindow) {
        Ext.MessageBox.show({
            title: 'Ошибка',
            msg: 'Проверьте данные для входа!',
            buttons: Ext.MessageBox.OK,
        });
        activeWindow.close();
    },

    checkUser: function(btn, ) {
        const logWindow = btn.up('#logWindow');
        let index = 0;
        let status = false;
        let dataStore = Ext.StoreManager.lookup('todo.store.UserStore');

        while (1){
            const defDataStore = dataStore.getAt(index);
            if (defDataStore == null){
                break;
            }
            if ((defDataStore.get('name') === this.getViewModel().data.user.name)&&((defDataStore.get('password') === this.getViewModel().data.user.password))){
                status = true;
                break;
            }
            index++;
        }

        if (status === true) {
            this.onSuccessLogin(dataStore, index, logWindow);
        } else {
            this.sendLoginFailureMessage(logWindow);
        }
    }

})