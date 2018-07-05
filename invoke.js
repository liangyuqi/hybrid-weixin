(function(window) {
    // 跳用schema的封装
    function _invoke(action, data, callback) {
        // 拼装schema协议
        var schema = 'myapp://utils/' + action;

        // 拼接参数
        schema += '?a=a';
        var key;
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                schema += '&' + key + data[key];
            }
        }

        // 处理callback
        var callbackName = '';
        if (typeof callback === 'string') {
            callbackName = callback;
        } else {
            callbackName = action + Date.now();
            window[callbackName] = callback;
        }
        schema += '&callback=' + callbackName;

        // 触发
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = schema; //重要
        var body = document.body || document.getElementsByTagName('body')[0];
        body.appendChild(iframe);
        setTimeout(function() {
            body.removeChild(iframe); //销毁iframe
            iframe = null;
        })
    }


    // 暴露到全局变量
    window.invoke = {
        share: function(data, callback) {
            _invoke('share', data, callback)

        },
        scan: function(data, callback) {
            _invoke('scan', data, callback)
        },
        login: function(data, callback) {
            _invoke('login', data, callback)
        },
    }
})(window)