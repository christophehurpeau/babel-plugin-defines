'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    function replacePathIfDefined(path, name, state) {
        var defines = state.opts;

        if (defines[name] !== undefined) {
            path.addComment('trailing', 'defines: ' + name + ' = ' + JSON.stringify(defines[name]));
            path.replaceWith(t.valueToNode(defines[name]));
        }

        if (path.parentPath.isBinaryExpression()) {
            var evaluated = path.parentPath.evaluate();
            if (evaluated.confident) {
                path.parentPath.addComment('trailing', 'defines: ' + name + ' = ' + JSON.stringify(defines[name]));
                path.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
        }
    }

    return {
        visitor: {
            MemberExpression: function MemberExpression(path, state) {
                var node = path.node;

                if (t.isIdentifier(node.object) && node.object.name === 'global') {
                    var property = node.property;
                    replacePathIfDefined(path, property.name, state);
                }
            },
            Expression: function Expression(path, state) {
                var node = path.node;

                if (t.isIdentifier(node)) {
                    if (path.scope.hasBinding(node.name)) return;

                    var parentPath = path.parentPath;
                    if (parentPath && (parentPath.isCallExpression() || parentPath.isConditionalExpression() || parentPath.isLogicalExpression() || parentPath.isIfStatement() || parentPath.isUnaryExpression())) {
                        replacePathIfDefined(path, node.name, state);
                    }
                }
            },
            Statement: function Statement(path, state) {
                var node = path.node;
                var trailingComments = node.trailingComments;
                if (trailingComments) {
                    trailingComments.some(function (comment) {
                        var match = comment.value.match(/^\s*#if\s+(!)?\s*(.+)\s*$/);
                        if (!match) return;
                        var not = match[1] === '!';
                        var name = match[2];

                        var defines = state.opts;
                        if (defines[name] !== undefined) {
                            comment.value = 'defines: ' + comment.value.trim() + ' ' + ('= ' + (not ? '!' : '') + JSON.stringify(defines[name]));
                            if (not && defines[name] || !not && !defines[name]) {
                                path.replaceWith(t.emptyStatement());
                            }
                        }

                        return true;
                    });
                }
            }
        }
    };
};
