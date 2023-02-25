<template>
  <div>
    <NDivider>Screen Responsive</NDivider>
    <NGrid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
      <NGridItem>
        <div class="light-green">
          1
        </div>
      </NGridItem>
      <NGridItem>
        <div class="green">
          2
        </div>
      </NGridItem>
      <NGridItem>
        <div class="light-green">
          3
        </div>
      </NGridItem>
      <NGridItem>
        <div class="green">
          4
        </div>
      </NGridItem>
      <NGridItem>
        <div class="light-green">
          5
        </div>
      </NGridItem>
      <NGridItem>
        <div class="green">
          6
        </div>
      </NGridItem>
      <NGridItem>
        <div class="light-green">
          7
        </div>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style>
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
}

.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
