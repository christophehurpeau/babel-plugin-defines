exports.actual = `
console.log(GLOBAL_1);
`;

exports.expected = `
console.log(1 /*defines: GLOBAL_1 = 1*/);
`;
