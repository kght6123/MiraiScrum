<template>
  <div class="fixedfooter">
    <div class="icon">メニュー１</div>
    <div class="icon">めにゅー２</div>
    <div class="icon">めにゅー３</div>
    <div class="icon">めにゅー４</div>
    <div class="icon">設定？</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type     : Array,
      require  : false,
      default: () => []
    },
  }
}
</script>

<style>
body {
  padding-bottom: calc(75px + 0.5rem);
}
</style>

<style scoped>
.fixedfooter {
  @apply bg-gray-200 rounded-lg p-2 m-2;
  position: fixed;
  bottom: 0;
  height: 75px;
  height: calc(75px + env(safe-area-inset-bottom));
  width: calc(100% - 1rem);
  display: flex;
  z-index: 998;
  backdrop-filter: blur(7px) !important;
  background: rgba(255, 255, 255, 0.75) !important;
  box-shadow:
  0 0px 2px rgba(0, 0, 0, 0.034),
  0 0px 4.8px rgba(0, 0, 0, 0.048),
  0 0px 9px rgba(0, 0, 0, 0.06),
  0 0px 16.1px rgba(0, 0, 0, 0.072),
  0 0px 30.1px rgba(0, 0, 0, 0.086),
  0 0px 72px rgba(0, 0, 0, 0.12)
;
}
.icon {
  @apply text-indigo-600 rounded-lg;
  height: 100%;
  width: calc(100% / 4);
  line-height: 50px;
  line-height: calc(50px + env(safe-area-inset-bottom));
  text-align: center;
  font-size: 1rem;
}
.icon:hover, .icon:active, .icon:focus {
  @apply bg-indigo-200 opacity-50;
  /* background-color: rgba(255, 255, 255, 0.75); */
}
</style>