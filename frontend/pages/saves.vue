<template lang="">
    <div>
        
    </div>
</template>
<script>
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Usage
(async () => {
  console.log("Start");
  await sleep(2000);
  console.log("I slept for 2 seconds!");
  await sleep(2000);
  console.log("I slept for 2 seconds again!");
})();
</script>
<style lang="">
    
</style>