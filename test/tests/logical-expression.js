exports.actual = `
console.log(GLOBAL_FALSE && false);
`;

exports.expected = `
console.log(false /*defines: GLOBAL_FALSE = false*/ && false);
`;
