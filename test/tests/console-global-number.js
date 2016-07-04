exports.actual = `
console.log(global.GLOBAL_1);
`;

exports.expected = `
console.log(1 /*defines: GLOBAL_1 = 1*/);
`;
