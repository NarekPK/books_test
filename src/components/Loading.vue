<template>
  <div v-if="isLoading" :class="$style['loading']">
    <svg width="70"
         :class="$style['loading-circle']"
         viewBox="0 0 512 512">
      <path fill="#ffffff" d="M478.71 364.58zm-22 6.11l-27.83-15.9a15.92 15.92 0 0 1-6.94-19.2A184 184 0 1 1 256 72c5.89 0 11.71.29 17.46.83-.74-.07-1.48-.15-2.23-.21-8.49-.69-15.23-7.31-15.23-15.83v-32a16 16 0 0 1 15.34-16C266.24 8.46 261.18 8 256 8 119 8 8 119 8 256s111 248 248 248c98 0 182.42-56.95 222.71-139.42-4.13 7.86-14.23 10.55-22 6.11z"></path>
      <path fill="currentColor" d="M271.23 72.62c-8.49-.69-15.23-7.31-15.23-15.83V24.73c0-9.11 7.67-16.78 16.77-16.17C401.92 17.18 504 124.67 504 256a246 246 0 0 1-25 108.24c-4 8.17-14.37 11-22.26 6.45l-27.84-15.9c-7.41-4.23-9.83-13.35-6.2-21.07A182.53 182.53 0 0 0 440 256c0-96.49-74.27-175.63-168.77-183.38z"></path>
    </svg>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop() isLoading!: boolean
}
</script>


<style module lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(255 255 255 / 75%);
  width: 100%;
  height: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;

  &-circle {
    animation: loading  1s infinite ease-out;
  }
}

@keyframes loading {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}
</style>
