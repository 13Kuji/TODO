Ext.define('todo.view.main.Registration.Register', {
    extend: 'Ext.window.Window',
    xtype: 'form-register',
    controller: 'register',
    viewModel: 'register',
    itemId: 'regWindow',
    frame: true,
    title: 'Регистрация',
    width: 355,

    fieldDefaults: {
        labelAlign: 'right',
    },

    items: [{
        xtype: 'fieldset',
        title: 'Информация о пользователе',
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
        handler: 'addUser'
    }]
});