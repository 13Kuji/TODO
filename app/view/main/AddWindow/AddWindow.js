Ext.define('todo.view.main.AddWindow.AddWindow', {
    extend: 'Ext.window.Window',
    controller: 'addWindow',
    viewModel: 'window',
    title: 'Добавление/Обновление информации',
    width: 500,
    height: 300,
    minWidth: 300,
    minHeight: 220,
    layout: 'fit',
    plain: true,
    itemId: 'editWindow',
    recordTask: null,
    urlMethod: null,
    items: [
        {
            xtype: 'form',
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            fieldDefaults: {
                labelWidth: 60
            },
            bodyPadding: 10,
            border: false,
            items: [
                {
                    fieldLabel: "Название:",
                    name: 'title',
                    labelAlign: 'top',
                    bind:{
                        value: '{task.title}'
                    }
                },
                {
                    fieldLabel: 'Описание:',
                    xtype: 'textarea',
                    name: 'text',
                    labelAlign: 'top',
                    flex: 1,
                    bind: {
                        value: '{task.text}'
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            text: 'Принять',
            handler: 'addElement'
        },
        {
            text: 'Выйти',
            handler: function () {
                this.up('window').close();
            }
        }]

})