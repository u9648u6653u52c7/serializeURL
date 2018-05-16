/**
 * @author Brave <u9648u6653u52c7@gmail.com>
 * serializeURL
 * scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
 * @param {String} input
 * @return {Object}
 */
function serializeURL(input) {
    if (typeof input === 'string') {
        var url = input;
        var URL_REGEXP = /(\w+):(?:\/\/)?(?:([^:]+)(?::(.+))?@)?([^/:?#]+)(?::(\d*))?([^?#]*)([^#]*)(.*)/;
        if (URL_REGEXP.test(url)) {
            var dict = {};
            var arr = URL_REGEXP.exec(url);
            dict.protocol = arr[1] ? arr[1] : '';
            dict.username = arr[2] ? arr[2] : '';
            dict.password = arr[3] ? arr[3] : '';
            dict.host = arr[4] ? arr[4] : '';
            dict.port = arr[5] ? arr[5] : '';
            dict.path = arr[6] ? arr[6] : '';
            dict.filename = dict.path.split('/').slice(-1).join('');
            dict.fragment = arr[8] ? arr[8] : '';
            var params = arr[7] ? arr[7].slice(1).split('&'): [];
            var length = params.length;
            if (length > 0) {
                dict.query = {};
                for (var i = 0; i < length; i+=1) {
                    var l = params[i].split('=')
                    var key = l[0];
                    var value = l[1];
                    dict.query[key] = value;
                }
            } else {
                dict.query = {};
            }
            return dict;
        } else {
            throw 'The URL is illegal.';
        }
    } else {
        throw 'Param\'s data type is String.';
    }
}
