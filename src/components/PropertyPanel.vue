<template>
    <div>
        <h3>{{property.name}}</h3>
        <component
            v-for="(c, i) in currentComponents"
            :key="i"
            :is="c.component"
            :sub-type="subType"
        />
    </div>
</template>

<script>
import EnumEditor from './editors/EnumEditor.vue';
import UnitEditor from './editors/UnitEditor.vue';
const editors = {
    enum: EnumEditor,
    unit: UnitEditor
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
            return this.property.editors.map(item => ({ component: editors[item.type], subType: item.subType }));
        }
    }
}
</script>

<style>

</style>