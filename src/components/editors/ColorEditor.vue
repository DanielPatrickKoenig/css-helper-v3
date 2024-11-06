<template>
    <div class="color-editor">
        <div class="color-blocks">
            <a
                v-for="(c, i) in colorList"
                :key="i"
                class="swatch"
                :style="{ background: c }"
                @click="colorSelected(c)"
            >
                &nbsp;
            </a>
        </div>
        <DragSlider
            axis="y"
        />
    </div>
</template>

<script>
import BaseEditor from './BaseEditor';
import baseColors from '../../assets/baseColors.json';
import DragSlider from '../controls/DragSlider.vue';
export default {
    extends: BaseEditor,
    components: {
        DragSlider
    },
    computed: {
        colorList () {
            return baseColors;
        },
    },
    methods: {
        colorSelected (color) {
            this.currentValue = color;
            this.valueChanged();
        }
    }
}
</script>

<style>

</style>