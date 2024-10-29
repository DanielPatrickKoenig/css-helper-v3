<template>
    <div>
        <input
            disabled :value="selectorValue" type="test"
        />
        <SelectorBuilderNode
            :active="!setValues.length"
            :base-selector="currentSelector"
            :followables="['elements', 'classes', 'ids', 'attributes', 'psuedos']"
            :exclude-base="true"
            @selected="onSelected"
        />
        <div 
            v-for="(val, i) in setValues"
            :key="i"
        >
            <label v-if="i < setValues.length">
                {{ val.value }}
            </label>
            <SelectorBuilderNode
                :active="i === setValues.length - 1"
                :base-selector="`${steppedSelectorValue(i + 1)}${(val.type === 'opperators' ? ' *' : '')}`"
                :followables="val.followables"
                :previous-type="val.type"
                @selected="onSelected"
            />
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
    },

}
</script>

<style>

</style>