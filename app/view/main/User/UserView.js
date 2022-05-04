Ext.define('todo.view.main.User.UserView', {
    extend: 'Ext.grid.Panel',
    xtype: 'user',
    requires: [
        'todo.store.UserStore'
    ],
    controller: 'user',
    title: 'Пользователь',

    store: {
        type: 'user'
    },
    height: 100,
    buttons: [
        {
            text: 'Войти',
            handler: 'createLogin'
        },
        {
            text: 'Регистрация',
            handler: 'createRegistration'
        }
    ],

})