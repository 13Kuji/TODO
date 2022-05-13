/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('todo.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'todo.view.main.MainModel',
        'todo.view.main.gridList.Grid',
        'todo.view.main.gridList.GridController',
        'todo.view.main.AddWindow.AddWindow',
        'todo.view.main.AddWindow.AddWindowController',
        'todo.view.main.DeleteConfirm.DeleteConfirm',
        'todo.view.main.DeleteConfirm.DeleteConfirmController',
        'todo.view.main.Login.Login',
        'todo.view.main.Login.LoginController',
        'todo.view.main.Login.LoginModel',
    ],

    controller: ['main', 'grid', 'addWindow', 'deleteConfirm', 'login'],
    viewModel: ['main', 'window', 'register', 'login'],

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: 'TODO'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [
        {
            title: 'Задачи',
            iconCls: 'fa-file',
            items: [{
                xtype: 'mainlist'
            }]
        }
    ]
});
