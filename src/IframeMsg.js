(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.IframeMsg = factory();
    }
})(this, function () {

    return class IframeMsg extends EventTarget {

        data; // 接收到的信息

        /**
         * 通信对方的window对象
         * @param {Window} _window 
         */
        constructor(_window) {
            super();
            this._window = _window;
            this.init();
        }

        /**
         * 初始化接收信息处理函数
         */
        init() {
            const onMessage = (ev) => {
                if (ev.data) {
                    const { action, data } = ev.data;
                    if (action === undefined) return;
                    this.data = ev.data;
                    this.dispatchEvent(new Event('message'));
                }
            }
            window.addEventListener('message', onMessage, false);
        }

        /**
         * 发送消息
         * @param {String} action 动作
         * @param {any} data 消息体
         */
        send(action, data) {
            this._window.postMessage({
                action,
                data,
            }, '*');
        }
    }
})

