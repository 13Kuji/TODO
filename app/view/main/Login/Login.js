Ext.define('todo.view.main.Login.Login', {
    extend: 'Ext.window.Window',
    xtype:  'login',
    controller: 'login',
    viewModel: 'login',
    requires: [
        'todo.store.UserStore',
        'todo.store.TaskStore'
    ],
    store: {
        type: ['user', 'task']
    },
    itemId: 'logWindow',
    frame: true,
    title: 'Войти',
    modal: true,
    width: 355,

    fieldDefaults: {
        labelAlign: 'right',
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
                bind: {
                    value: '{user.name}'
                }
            },
            {
                fieldLabel: 'Пароль',
                name: 'pass',
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