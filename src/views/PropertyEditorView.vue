<template>
    <div>
        Propety editor
        <div>{{selectedProperties}}</div>
        <EditableTemplate>
            <div class="property-panels">
                <PropertyPanel
                    v-for="(p, i) in selectedProperties"
                    :key="i"
                    :property="p"
                />
            </div>
        </EditableTemplate>
    </div>
</template>

<script>
import { getParameterByName } from '../utils/general';
import pListData from '../assets/properties.json';
import EditableTemplate from '@/components/EditableTemplate.vue';
import PropertyPanel from '@/components/PropertyPanel.vue';
export default {
    components: {
        EditableTemplate,
        PropertyPanel
    },
    data () {
        return {
            selectedProperties: [],
            pListData
        }        
    },
    created () {
        const properties = getParameterByName('properties');
        if (properties) {
            const propertiesArray = properties.split(',');
            this.selectedProperties = propertiesArray.map(item => this.pListData.find(p => p.name === item));
        }
    },
}
</script>

<style>

</style>