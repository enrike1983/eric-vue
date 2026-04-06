<script setup lang="ts">
import type { TextBrick } from "~/server/models/models";

defineProps<{ brick: TextBrick }>();
</script>

<template>
  <div class="container-fluid p-5" :class="`palette-${brick.palette}`">
    <div class="row">
        <div class="col-md-12">
            <div class="container">
              <h3>{{ brick.title }}</h3>
              <p v-html="brick.description"></p>
            </div>
        </div>
    </div>
  </div>  
</template>

<style lang="scss">
.palette-grey-light {
  background-color: #f2f2f2;
  color: #222222;
}
.palette-dark-blue {
  background-color: #061E3E;
  color: #E2E8F0;
}
.palette-dark-violet {
  background-color: #251E3E;
  color: #F3F0FF;
}
.palette-medium-purple {
  background-color: #441E3E;
  color: #ffffff;
}
.palette-light-red {
  background-color: #651E3E;
  color: #FFE4EE;
}
.palette-red {
  background-color: #851E3E;
  color: #FDE68A;
}
</style>
