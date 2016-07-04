exports.actual = `
if (global.GLOBAL_TEST === 'test') {
  console.log(true);
}
`;

exports.expected = `
if (true /*defines: GLOBAL_TEST = "test"*/) {
  console.log(true);
}
`;
