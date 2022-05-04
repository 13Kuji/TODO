Ext.define('todo.view.main.User.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',

    createRegistration: function() {
        let windowReg = Ext.create('todo.view.main.Registration.Register',{
        });
        windowReg.show();
    },
    createLogin: function() {
        let windowLog = Ext.create('todo.view.main.Login.Login',{
        });
        windowLog.show();
    },
})