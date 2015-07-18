export default function ({ Plugin, types: t }) {
  return new Plugin("defines", {
    visitor: {
      MemberExpression(node, parent, scope, state) {
        if (t.isIdentifier(node.object) && node.object.name === 'global') {
          var property = node.property;
          var defines = state.opts.extra.defines;
          if (t.isIdentifier(property) && defines[property.name] !== undefined) {
            return t.valueToNode(state.opts.extra.defines[property.name]);
          }
        }
      }
    }
  });
}
