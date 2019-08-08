"use strict";
/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
// tslint:disable:no-console
Object.defineProperty(exports, "__esModule", { value: true });
var trace = function () {
    var e = new Error('dummy');
    return e.stack
        .replace(/^[^(]+?[\n$]/gm, '')
        .replace(/^\s+at\s+/gm, '')
        .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
        .split('\n');
};
var Logger = /** @class */ (function () {
    function Logger() {
    }
    /**
     * Logs a warning. Warnings are things that are exceptional, but easily to recover from.
     */
    // tslint:disable-next-line:no-any
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, ['Warning:'].concat(args));
    };
    /**
     * Logs a debug message. Debug messages are things that help developers debugging things.
     */
    // tslint:disable-next-line:no-any
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, ['Debug:'].concat(args));
    };
    /**
     * Logs an info. Infos are things that might be interesting for someone who needs to take a closer look.
     */
    // tslint:disable-next-line:no-any
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, ['Info:'].concat(args));
    };
    /**
     * Logs an error. Error are things that are exceptional, but can be recovered from.
     */
    // tslint:disable-next-line:no-any
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, ['Error:'].concat(args));
        console.error('Trace:', trace());
    };
    /**
     * Logs a fatal error. Fatal errors are things that are exceptional and can not be recovered from.
     */
    // tslint:disable-next-line:no-any
    Logger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, ['Fatal:'].concat(args));
        console.error('Trace:', trace());
        throw new Error(args.join(' '));
    };
    /**
     * Logs a message.
     */
    // tslint:disable-next-line:no-any
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, ['Fatal:'].concat(args));
        console.log('Trace:', trace());
    };
    return Logger;
}());
exports.Logger = Logger;
var instance = new Logger();
exports.default = instance;
//# sourceMappingURL=index.js.map