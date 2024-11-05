<template>
    <div 
        class="slider"
        :class="`axis-${axis}`"
    >
        <DraggableContent
            :x-lock="xLock"
            :y-lock="yLock"
            :x-max="xMax"
            :y-max="yMax"
            :start-x="x"
            :start-y="y"
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
    },
    props: {
        axis: {
            default: '',
            required: false,
            type: String
        }
    },
    data () {
        return {
            x: 0,
            y: 0,
            xLock: this.axis === 'y' ? 0 : null,
            yLock: this.axis === 'x' ? 0 : null,
            xMax: 100,
            yMax: 100
        }
    }
}
</script>

<style>
.slider {
    width: 120px;
    height: 120px;
    padding: 10px;
    border: 1px solid black;
}
.slider.axis-y{
    width: 0;
}
.slider.axis-x{
    height: 0;
}
</style>