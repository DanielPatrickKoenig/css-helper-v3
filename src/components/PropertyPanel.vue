<template>
    <div>
        <h3>{{property.name}}</h3>
        <component
            v-for="(c, i) in currentComponents"
            :key="i"
            :is="c.component"
            :sub-type="c.subType"
            @value-change="onValueChange"
            
        />
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
            this.$emit('value-change', { property: this.property.name, value: e });
        }
    }
}
</script>

<style>

</style>