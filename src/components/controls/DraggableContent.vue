<template>
    <div
        ref="dragger"
        class="dragger"
    >
        <div
            class="drag-handle"
            :style="handleStyle"
            @mousedown="down"
            @tourchstart="down"
        >
            <slot>
                DRAG ME
            </slot>
        </div>
        <div
            v-if="dragging"
            class="drag-overlay"
            @mousemove="move"
            @touchmove="move"
            @mouseup="up"
            @touchend="up"
            @mouseleave="up"
        />
    </div>
</template>

<script>
import { processEvent } from '../../utils/general';
export default {
    props: {
        xLock: {
            default: null,
            required: false,
            type: Number
        },
        yLock: {
            default: null,
            required: false,
            type: Number
        },
        xMin: {
            default: 0,
            required: false,
            type: Number
        },
        xMax: {
            default: 999999999,
            required: false,
            type: Number
        },
        yMax: {
            default: 0,
            required: false,
            type: Number
        },
        yMax: {
            default: 999999999,
            required: false,
            type: Number
        }
    },
    data () {
        return {
            dragging: false,
            offset: { x: 0, y: 0 },
            currentPosition: { x: 0, y: 0 }
        }
    },
    computed: {
        handleStyle () {
            let xValue = this.xLock === null ? this.currentPosition.x : this.xLock + this.draggerBounds;
            let yValue = this.yLock === null ? this.currentPosition.y : this.yLock + this.draggerBounds;
            if (xValue < this.xMin) {
                xValue = this.xMin;
            }
            if (xValue > this.xMax) {
                xValue = this.xMax;
            }
            if (yValue < this.yMin) {
                xValue = this.yMin;
            }
            if (yValue > this.yMax) {
                yValue = this.yMax;
            }
            return { left: `${xValue}px`, top: `${yValue}px` };
        },
        draggerBounds () {
            return this.$refs.dragger ? this.$refs.dragger?.getBoundingClientRect() : 0;
        }
    },
    methods: {
        down (e) {
            const position = processEvent(e);
            const draggerBounds = this.$refs.dragger.getBoundingClientRect();
            this.offset = {
                x: (this.currentPosition.x + draggerBounds.left) - position.x,
                y: (this.currentPosition.y + draggerBounds.top) - position.y
            };
            this.dragging = true;
        },
        move (e) {
            if (this.dragging) {
                const draggerBounds = this.$refs.dragger.getBoundingClientRect();
                const position = processEvent(e);
                this.currentPosition = {
                    x: position.x - draggerBounds.left + this.offset.x,
                    y: position.y - draggerBounds.top + this.offset.y
                }

            }
        },
        up () {
            this.dragging = false;

        }
    }
}
</script>

<style>
    .dragger {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .drag-handle {
        position: absolute;
    }
    .drag-overlay{
        display: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: .1;
    }
</style>