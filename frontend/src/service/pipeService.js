import Vue from 'vue'

var pipeService = new Vue({
	data: {
		TESTEVENT: 'test_event',
		INDEX: 'figure_index'
	},
	methods: {
		emitTestEvent: function(msg) {
			this.$emit(this.TESTEVENT, msg)
		},
		onTestEvent: function(callback) {
			this.$on(this.TESTEVENT, function(msg) {
				callback(msg)
			})
		},
		emitIndex: function(msg) {
			this.$emit(this.INDEX, msg)
		},
		onIndex: function(callback) {
			this.$on(this.INDEX, function(msg) {
				callback(msg)
			})
		},
	}
})
export default pipeService
