Ext.define('todo.config.Global', {
        singleton: true,
        config: {
            user: null
        },
        constructor: function(config) {
            this.initConfig(config)
        }
});