Ext.define('todo.view.main.Login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    controller: 'login',
    viewModel: 'login',
    requires: [
        'todo.store.UserStore'
    ],
    store: {
        type: 'user'
    },
    itemId: 'logWindow',
    frame: true,
    title: 'Войти',
    width: 355,

    fieldDefaults: {
        labelAlign: 'right',
        //msgTarget: 'side'
    },

    items: [{
        xtype: 'fieldset',
        title: 'Введите логин и пароль',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },

        items: [
            {
                fieldLabel: 'Имя',
                name: 'user',
                //emptyText: 'введите имя',
                bind: {
                    value: '{user.name}'
                }
            },
            {
                fieldLabel: 'Пароль',
                name: 'pass',
                //emptyText: 'введите пароль',
                inputType: 'password',
                bind: {
                    value: '{user.password}'
                }
            }

        ]
    }],

    buttons: [{
        text: 'Принять',
        handler: 'checkUser'
    }]
});