'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      MemberExpression: function MemberExpression(path, state) {
        var node = path.node;
        if (t.isIdentifier(node.object) && node.object.name === 'global') {
          var property = node.property;
          var defines = state.opts;
          if (t.isIdentifier(property) && defines[property.name] !== undefined) {
            path.addComment('trailing', 'defines: ' + property.name + ' = ' + JSON.stringify(defines[property.name]));
            path.replaceWith(t.valueToNode(defines[property.name]));
          }

          if (path.parentPath.isBinaryExpression()) {
            var evaluated = path.parentPath.evaluate();
            if (evaluated.confident) {
              path.parentPath.addComment('trailing', 'defines: ' + property.name + ' = ' + JSON.stringify(defines[property.name]));
              path.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
          }
        }
      }
    }
  };
};
