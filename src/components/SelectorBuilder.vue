<template>
    <div ref="builder">
        <input
            disabled
            :value="selectorValue" type="test"
        />
        <div class="selector-node">
            <SelectorBuilderNode
                ref="node0"
                class="selector-node"
                :active="!setValues.length"
                :base-selector="currentSelector"
                :followables="['elements', 'classes', 'ids', 'attributes', 'psuedos']"
                :exclude-base="true"
                @invalid-selection="removeLast"
                @selected="onSelected"
            />
        </div>
        <div 
            v-for="(val, i) in setValues"
            :key="i"
        >
            <div class="selector-node">
                <SelectorBuilderNode
                    class="selector-node"
                    :ref="`node${i + 1}`"
                    :active="i === setValues.length - 1"
                    :base-selector="`${steppedSelectorValue(i + 1)}${(val.type === 'opperators' ? ' *' : '')}`"
                    :followables="val.followables"
                    :previous-type="val.type"
                    @invalid-selection="removeLast"
                    @selected="onSelected"
                />
                <button
                    v-if="i === setValues.length - 1"
                    @click="removeLast"
                >
                    x
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import SelectorBuilderNode from '@/components/SelectorBuilderNode.vue';
export default {
    components: {
        SelectorBuilderNode
    },
    props:{
        baseSelector: {
            default: '',
            type: String
        }
    },
    data () {
        return {
            currentSelector: this.baseSelector,
            currentFollowables: null,
            setValues: [],
            loading: false
        }
    },
    computed: {
        selectorValue () {
            return `${this.baseSelector} ${this.setValues.map(item => item.value.split('(').join(' ').split(')').join(' ')).join('')}`;
        },
        steppedSelectorValue () {
            return num => `${this.baseSelector} ${this.setValues.map((item) => item.value.split('(').join(' ').split(')').join(' ')).filter((item, index) => index < num).join('')}`;
        }
    },
    methods:{
        onSelected ({ followables, value, type }) {
            console.log(followables);
            // this.loading = true;
            // await new Promise(resolve => setTimeout(resolve, 50));
            this.currentFollowables = followables;
            this.setValues.push({followables, value, type});
            // this.loading = false;
        },
        async removeLast () {
            console.log('last removed');
            if (this.setValues.length){
                this.setValues.pop();
                await new Promise(resolve => setTimeout(resolve, 50 ));
                this.$refs.builder.querySelector('.selector-node select:not([disabled])').value = '';
            }
        },
    },

}
</script>

<style>

</style>