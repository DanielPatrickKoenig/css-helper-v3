<template>
    <div class="slider">
        <DraggableContent
            :radial="true"
            :radius="40"
            :start-angle="80"
        >
            <div style="width: 20px; height: 20px; background: black;"></div>
        </DraggableContent>
        <DraggableContent
            :y-lock="80"
            :x-min="20"
            :x-max="180"
            :start-x="30"
        >
            <div style="width: 20px; height: 20px; background: black;"></div>
        </DraggableContent>
    </div>
</template>

<script>
import DraggableContent from './DraggableContent.vue'
export default {
    components: {
        DraggableContent
    }
}
</script>

<style>
.slider {
    width: 200px;
    height: 150px;
}
</style>