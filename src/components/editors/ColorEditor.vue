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
    </div>
</template>

<script>
import BaseEditor from './BaseEditor';
import baseColors from '../../assets/baseColors.json';
export default {
    extends: BaseEditor,
    computed: {
        colorList () {
            return baseColors;
        }
    },
    methods: {
        colorSelected (color) {
            console.log(color)
        }
    }
}
</script>

<style>

</style>