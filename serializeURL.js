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
        var KEY_REGEXP = /(.+)\[(.+)?\]/;
        if (URL_REGEXP.test(url)) {
            var dict = {};
            var arr = URL_REGEXP.exec(url);
            dict.protocol = arr[1] || '';
            dict.username = arr[2] || '';
            dict.password = arr[3] || '';
            dict.host = arr[4] || '';
            dict.port = arr[5] || '';
            dict.path = arr[6] || '';
            dict.filename = dict.path.split('/').slice(-1).join('');
            dict.fragment = arr[8] || '';
            var params = arr[7] ? arr[7].slice(1).split('&'): [];
            var length = params.length;
            if (length > 0) {
                dict.query = {};
                for (var i = 0; i < length; i+=1) {
                    var l = params[i].split('=')
                    var key = l[0];
                    var value = l[1];
                    if (KEY_REGEXP.test(key)) {
                        var r = KEY_REGEXP.exec(key);
                        var k = r[1];
                        var p = r[2];
                        if (!!p) {
                            if (!dict.query[k]) {
                                dict.query[k] = {}
                            }
                            if (({}).toString() === ({}).toString.call(dict.query[k])) {
                                dict.query[k][p] = value;
                            } else {
                                throw 'URL\'s params part has something wrong.';
                            }
                        } else {
                            if (!dict.query[k]) {
                                dict.query[k] = [];
                            }
                            if (({}).toString.call([]) === ({}).toString.call(dict.query[k])) {
                                dict.query[k].push(value);
                            } else {
                                throw 'URL\'s params part has something wrong.';
                            }
                        }
                    } else {
                        dict.query[key] = value;
                    }
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
