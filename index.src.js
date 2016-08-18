export default function ({ types: t }) {
    function replacePathIfDefined(path, name, state) {
        const defines = state.opts;

        if (defines[name] !== undefined) {
            path.addComment(
                'trailing',
                `defines: ${name} = ${JSON.stringify(defines[name])}`
            );
            path.replaceWith(t.valueToNode(defines[name]));
        }

        if (path.parentPath.isBinaryExpression()) {
            let evaluated = path.parentPath.evaluate();
            if (evaluated.confident) {
                path.parentPath.addComment(
                    'trailing',
                    `defines: ${name} = ${JSON.stringify(defines[name])}`
                );
                path.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
        }
    }

    return {
        visitor: {
            MemberExpression(path, state) {
                const node = path.node;

                if (t.isIdentifier(node.object) && node.object.name === 'global') {
                    const property = node.property;
                    replacePathIfDefined(path, property.name, state);
                }
            },

            Expression(path, state) {
                const node = path.node;

                if (t.isIdentifier(node)) {
                    if (path.scope.hasBinding(node.name)) return;

                    const parentPath = path.parentPath;
                    if (parentPath && (parentPath.isCallExpression() || parentPath.isConditionalExpression()
                               || parentPath.isLogicalExpression() || parentPath.isIfStatement()
                               || parentPath.isUnaryExpression())) {
                        replacePathIfDefined(path, node.name, state);
                    }
                }
            },

            Statement(path, state) {
                const node = path.node;
                const trailingComments = node.trailingComments;
                if (trailingComments) {
                    trailingComments.some(comment => {
                        const match = comment.value.match(/^\s*#if\s+(!)?\s*(.+)\s*$/);
                        if (!match) return;
                        const not = match[1] === '!';
                        const name = match[2];

                        const defines = state.opts;
                        if (defines[name] !== undefined) {
                            comment.value = `defines: ${comment.value.trim()} `
                                +`= ${not ? '!' : ''}${JSON.stringify(defines[name])}`;
                            if ((not && defines[name]) || (!not && !defines[name])) {
                                path.replaceWith(
                                    t.emptyStatement()
                                );
                            }
                        }

                        return true;
                    });
                }
            },
        }
    };
}
