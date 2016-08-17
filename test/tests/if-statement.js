exports.actual = `
if (GLOBAL_1) {
    foo;
}
if (!GLOBAL_1) {
    bar;
}
`;

exports.expected = `
if (1 /*defines: GLOBAL_1 = 1*/) {
    foo;
}
if (!1 /*defines: GLOBAL_1 = 1*/) {
    bar;
}
`;
