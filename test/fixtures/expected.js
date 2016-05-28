console.log('test' /*defines: GLOBAL_TEST = "test"*/);
console.log(1 /*defines: GLOBAL_1 = 1*/);

if (false /*defines: GLOBAL_FALSE = false*/) {
  console.log(false);
}

if (true /*defines: GLOBAL_TEST = "test"*/) {
  console.log(true);
}