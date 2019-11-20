<template>
  <div class="about">
    <h1>This is an Service-1 about page</h1>
    <br>
    <h2 @click="$router.push('/')">push to home.vue</h2>
    <br><br>
    <h2 @click="$app.$globalRouter.push('/')">back to container root</h2>
  </div>
</template>
