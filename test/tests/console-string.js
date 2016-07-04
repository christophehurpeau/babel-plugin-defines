exports.actual = `
console.log(global.GLOBAL_TEST);
`;

exports.expected = `
console.log("test" /*defines: GLOBAL_TEST = "test"*/);
`;
