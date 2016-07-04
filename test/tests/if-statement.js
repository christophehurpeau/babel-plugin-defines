exports.actual = `
if (GLOBAL_1) {
    foo;
}
`;

exports.expected = `
if (1 /*defines: GLOBAL_1 = 1*/) {
    foo;
}
`;
