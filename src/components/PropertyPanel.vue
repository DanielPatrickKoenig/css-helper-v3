<template>
    <div>
        <h3>{{property.name}}</h3>
        <div
            v-for="n in count"
            :key="n"
        >
            <button
                v-if="count > 1"
                @click="updateCount(count - 1, n)"
            >
                -
            </button>
            <component
                v-for="(c, i) in currentComponents"
                :key="i"
                :is="c.component"
                :sub-type="c.subType"
                :index="n"
                @value-change="onValueChange"
                
            />
        </div>
        <div
            v-if="max !== 1"
            class="add-remove"
        >
            <button
                v-if="count < max"
                @click="updateCount(count + 1)"
            >
                +
            </button>
        </div>
        
    </div>
</template>

<script>
import ColorEditor from './editors/ColorEditor.vue';
import EnumEditor from './editors/EnumEditor.vue';
import UnitEditor from './editors/UnitEditor.vue';
const editors = {
    enum: EnumEditor,
    unit: UnitEditor,
    color: ColorEditor,
}
export default {
    props: {
        property: {
            requiered: true,
            type: Object
        },
        max: {
            default: 1,
            required: false,
            type: Number
        }
    },
    data () {
        return {
            count: 1,
            valueList: [],
        }
    },
    computed: {
        currentComponents () {
            const editorTypes = this.property.editors.map(item => ({ component: editors[item.type], subType: item.subType }));
            if (!this.property.editors.find(item => item.type === 'enum')) {
                editorTypes.push({ component: EnumEditor, subType: 'global' });
            }
            return editorTypes;
        }
    },
    methods: {
        onValueChange (e) {
            this.valueList[e.index] = e.value;
            this.dispatchValue();
        },
        dispatchValue () {
            this.$emit('value-change', { property: this.property.name, value: this.valueList.filter(item => item !== undefined).join(' ')});
        },
        updateCount(value, index){
            this.count = value;
            if (index !== undefined) {
                this.valueList.splice(index, 1);
            }
            if (this.valueList.length) {
                this.dispatchValue();
            }
        }
    }
}
</script>

<style>

</style>