<template>
    <div class="slider">
        <DraggableContent
            :y-lock="100"
            :xMin="20"
            :x-max="80"
        />
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