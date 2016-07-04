exports.actual = `
if (global.GLOBAL_FALSE) {
  console.log(false);
}
`;

exports.expected = `
if (false /*defines: GLOBAL_FALSE = false*/) {
  console.log(false);
}
`;
