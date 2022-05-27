Ext.define('todo.view.main.Registration.RegisterModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.register',

    data: {
        user: {
            name: null,
            password: null
        }
    }
});