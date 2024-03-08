<template>
  <div class="info-view">
    <div class="info-container">
      <div class="left-panel">
        <div class="card-item card-bg info"></div>
        <div class="card-item card-bg"></div>
        <div class="card-item card-bg"></div>
      </div>
      <div class="right-panel card-bg"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.info-view {
  --card-margin-size: 15px;

  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  overflow: hidden;
  .info-container {
    box-sizing: border-box;
    width: 1400px;
    height: 1500px;
    margin: var(--card-margin-size) 0;
    display: flex;
    .left-panel {
      width: 320px;
      margin-right: var(--card-margin-size);
      .info {
        
      }
    }
    .right-panel {
      flex: auto;
    }
  }
  .card-item {
    min-height: 200px;
    margin-bottom: var(--card-margin-size);
  }
  .card-bg {
    border-radius: 6px;
    backdrop-filter: blur(10px);
    background: rgb(0 0 0 / 25%);
  }
  .card {
    border-radius: 6px;
    backdrop-filter: blur(10px);
    background: rgb(0 0 0 / 25%);
  }
}
</style>