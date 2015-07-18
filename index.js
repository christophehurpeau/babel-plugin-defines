"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;

  return new Plugin("defines", {
    visitor: {
      MemberExpression: function MemberExpression(node, parent, scope, state) {
        if (t.isIdentifier(node.object) && node.object.name === "global") {
          var property = node.property;
          var defines = state.opts.extra.defines;
          if (t.isIdentifier(property) && defines[property.name] !== undefined) {
            return t.valueToNode(state.opts.extra.defines[property.name]);
          }
        }
      }
    }
  });
};

module.exports = exports["default"];

