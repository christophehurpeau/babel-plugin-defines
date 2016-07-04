exports.actual = `
console.log(GLOBAL_1) // #if GLOBAL_FALSE

console.log(GLOBAL_1); // #if GLOBAL_FALSE
`;

exports.expected = `
; //defines: #if GLOBAL_FALSE = false

; //defines: #if GLOBAL_FALSE = false
`;
