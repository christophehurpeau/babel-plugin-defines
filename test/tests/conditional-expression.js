exports.actual = `
GLOBAL_1 ? foo : bar;
`;

exports.expected = `
1 /*defines: GLOBAL_1 = 1*/ ? foo : bar;
`;
