import Vue from "vue"
import * as constants from "./event-constant"
const eventMap = new Map()

const eventBus = {
	data() {
		return {
			eventMap,
			registerEvent: {

			}
		}
	},
	methods: {
		subscribe(event, callback) {
			if (!constants[event]) throw new TypeError(`expect define events before subscribe`);
			if (!this.eventMap.has(event)) this.initEvent(event);
			this.eventMap.get(event).add(callback);
			callback(this.registerEvent['event']);
		},
		broadcast(event, value) {
			if (!constants[event]) throw new TypeError(`expect define events before broadcast`);
			if (!this.eventMap.has(event)) this.initEvent(event)
			this.$set(this.registerEvent, event, value);
		},
		once(event, callback, immediately) {
			if (!constants[event]) throw new TypeError(`expect define events before subscribe`);
			if (!this.eventMap.has(event)) {
				this.eventMap.set(event, new Set());
				this.$set(this.registerEvent, event, null);
				this.$once(event, value => {
					this.eventMap.get(event).forEach(callback => callback(value))
				})
				let unwatch = this.$watch(`registerEvent.${event}`, function (value) {
					this.$emit(event, value);
					unwatch();
				})
				this.eventMap.get(event).add(callback);
				if (immediately) {
					callback(this.registerEvent['event'], immediately)
				}
			}
		},
		off(event, callback) {
			if (!constants[event]) throw new TypeError(`expect define events before unsubscribe`);
			if (callback) {
				if (this.eventMap.get(event).has(event)) this.eventMap.get(event).delete(event);
				return true;
			} else {
				// $watch还在, 只是把回调函数全部清除了
				this.eventMap.get(event).clear();
			}
		},
		initEvent(event) {
			this.eventMap.set(event, new Set());
			this.$set(this.registerEvent, event, null);
			this.$on(event, value => {
				this.eventMap.get(event).forEach(callback => callback(value))
			})
			this.$watch(`registerEvent.${event}`, function (value) {
				this.$emit(event, value);
			})
		}
	}
}
export default new Vue(eventBus);