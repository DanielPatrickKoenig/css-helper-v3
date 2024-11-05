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
                <div>
                    DRAG ME
                </div>
            </slot>
        </div>
        <div
            v-if="dragging"
            class="drag-overlay"
            @mousemove="move"
            @touchmove="move"
            @mouseup="up"
            @touchend="up"
        />
    </div>
</template>

<script>
import { processEvent } from '../../utils/general';
import jstrig from 'jstrig';
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
        yMin: {
            default: 0,
            required: false,
            type: Number
        },
        yMax: {
            default: 999999999,
            required: false,
            type: Number
        },
        radial: {
            default: false,
            required: false,
            type: Boolean
        },
        radius: {
            default: 30,
            required: false,
            type: Number
        },
        startX: {
            default: 0,
            required: false,
            type: Number
        },
        startY: {
            default: 0,
            required: false,
            type: Number
        },
        startAngle: {
            default: 0,
            required: false,
            type: Number
        }
    },
    data () {
        return {
            dragging: false,
            offset: { x: 0, y: 0 },
            currentPosition: { x: 0, y: 0 },
            bounds: { x: 0, y: 0, width: 100, height: 100 }
        }
    },
    mounted () {
        
        this.realign(this.radial ? this.startAngle : this.startX, this.startY);
        window.addEventListener('mouseup', this.up);
        window.addEventListener('touchend', this.up);
        window.addEventListener('mousemove', this.move);
        window.addEventListener('touchmove', this.move);
    },
    beforeUnmount () {
        window.removeEventListener('mouseup', this.up);
        window.removeEventListener('touchend', this.up);
        window.removeEventListener('mousemove', this.move);
        window.removeEventListener('touchmove', this.move);
    },
    computed: {
        handleStyle () {
            let xValue = this.xLock === null ? this.currentPosition.x : this.xLock;
            let yValue = this.yLock === null ? this.currentPosition.y : this.yLock;
            if (this.radial) {
                const { x, y } = this.getRadialPosition({ x: xValue, y: yValue })
                xValue = x;
                yValue = y;
            }
            else {
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
            this.realign();

        },
        getRadialPosition ({ x, y }, startAngle) {
            const center = {
                x: this.bounds.width / 2,
                y: this.bounds.height / 2
            };
            const angle = startAngle !== undefined ? startAngle : jstrig.angle(center, { x, y });
            return {
                x: jstrig.orbit(center.x, this.radius, angle, 'cos'),
                y: jstrig.orbit(center.y, this.radius, angle, 'sin')
            };
        },
        realign (value1, value2) {
            const { x, y, width, height} = this.$refs.dragger?.getBoundingClientRect();
            this.bounds = { x, y, width, height};

            if (this.radial) {
                this.currentPosition = this.getRadialPosition(this.currentPosition, value1);
            }

            else {
                if ( value1 ) {
                    this.currentPosition.x = value1;
                }
                if ( value2 ) {
                    this.currentPosition.x = value2;
                }
                if (this.xMin > this.currentPosition.x) {
                    this.currentPosition.x = this.xMin
                }
                if (this.xMax < this.currentPosition.x) {
                    this.currentPosition.x = this.xMax
                }
                if (this.yMin > this.currentPosition.y) {
                    this.currentPosition.y = this.yMin
                }
                if (this.yMax < this.currentPosition.y) {
                    this.currentPosition.y = this.yMax
                }
            }
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
        width: 0;
        height: 0;
    }
    .drag-handle > * {
        transform: translate(-50%, -50%);
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