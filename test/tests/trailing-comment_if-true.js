exports.actual = `
console.log(GLOBAL_1) // #if GLOBAL_1
`;

exports.expected = `
console.log(1 /*defines: GLOBAL_1 = 1*/); //defines: #if GLOBAL_1 = 1
`;
