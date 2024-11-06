<template>
    <div>
        <DraggableContent
            :radial="true"
            :radius="40"
            :start-angle="angle"
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
    data () {
        return {
            angle: 120
        }
    }
}
</script>

<style>

</style>