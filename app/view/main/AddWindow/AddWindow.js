Ext.define('todo.view.main.AddWindow.AddWindow', {
    extend: 'Ext.window.Window',
    controller: 'addWindow',
    viewModel: 'window',
    title: 'Добавление/Обновление информации',
    width: 500,
    height: 450,
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
                    bind: {
                        value: '{task.text}'
                    }
                },
                {
                    fieldLabel: 'Дата выполнения:',
                    xtype: 'datefield',
                    name: 'dateEnd',
                    labelAlign: 'top',
                    format: 'd.m.Y',
                    bind: {
                        value: '{task.execTime.date}'
                    }
                },
                {
                    fieldLabel: 'Время выполнения:',
                    xtype: 'timefield',
                    name: 'timeEnd',
                    labelAlign: 'top',
                    format: 'H:i',
                    bind: {
                        value: '{task.execTime.time}'
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