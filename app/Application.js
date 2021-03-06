/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('todo.Application', {
    extend: 'Ext.app.Application',

    name: 'todo',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    requires: [
        'todo.config.Global'
    ],

    stores: [
        'todo.store.TaskStore',
        'todo.store.UserStore'
    ],
    models: [
        'todo.model.TaskModel'
    ],

    launch: function () {
        let loginWindow = Ext.create('todo.view.main.Login.Login', {});
        loginWindow.show()
    },


    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
})
