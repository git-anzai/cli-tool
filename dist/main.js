'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * tzld commands
 *    - config
 *    - init
 */

var actionMap = {
    init: {
        description: 'generate a new project from a template',
        usages: ['tzld init templateName projectName']
    },
    config: {
        alias: 'cfg',
        description: 'config .tzldrc',
        usages: ['tzld config set <k> <v>', 'tzld config get <k>', 'tzld config remove <k>']

    }
    //other commands
};

Object.keys(actionMap).forEach(function (action) {
    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias) //别名
    .action(function () {
        switch (action) {
            case 'config':
                //配置
                _index2.default.apply(undefined, [action].concat(_toConsumableArray(process.argv.slice(3))));
                break;
            case 'init':
                _index2.default.apply(undefined, [action].concat(_toConsumableArray(process.argv.slice(3))));
                break;
            default:
                break;
        }
    });
});

function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach(function (action) {
        actionMap[action].usages.forEach(function (usage) {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}

_commander2.default.usage('<command> [options]');
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
_commander2.default.version(_constants.VERSION, '-V --version').parse(process.argv);

// tzld 不带参数时
if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp(make_green);
}
function make_green(txt) {
    return _chalk2.default.green(txt);
}