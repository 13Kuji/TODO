Ext.define('todo.config.Global', {
        singleton: true,
        config: {
            userId: null
        },
        constructor: function(config) {
            this.initConfig(config)
        }
});