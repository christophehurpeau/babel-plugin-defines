export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression(path, state) {
        const node = path.node;
        if (t.isIdentifier(node.object) && node.object.name === 'global') {
          const property = node.property;
          const defines = state.opts;
          if (t.isIdentifier(property) && defines[property.name] !== undefined) {
            path.addComment('trailing', `defines: ${property.name} = ${JSON.stringify(defines[property.name])}`);
            path.replaceWith(t.valueToNode(defines[property.name]));
          }

          if (path.parentPath.isBinaryExpression()) {
            let evaluated = path.parentPath.evaluate();
            if (evaluated.confident) {
              path.parentPath.addComment('trailing', `defines: ${property.name} = ${JSON.stringify(defines[property.name])}`);
              path.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
}
        }
      }
    }
  };
}
