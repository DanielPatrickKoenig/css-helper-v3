<template>
    <div>
        Propety editor
        <div>{{selectedProperties}}</div>
        <EditableTemplate
            @selector-update="selectorUpdate"
        >
            <div class="property-panels">
                <PropertyPanel
                    v-for="(p, i) in selectedProperties"
                    :key="i"
                    :property="p"
                    @value-change="onValueChanged"
                />
            </div>
        </EditableTemplate>
        <div v-html="styleString" />
    </div>
</template>

<script>
import { getParameterByName } from '../utils/general';
import pListData from '../assets/properties.json';
import EditableTemplate from '@/components/EditableTemplate.vue';
import PropertyPanel from '@/components/PropertyPanel.vue';
import StyleMapper from '../utils/StyleMapper';
export default {
    components: {
        EditableTemplate,
        PropertyPanel
    },
    data () {
        return {
            selectedProperties: [],
            pListData,
            currentSelector: 'h1',
            templateClass: '',
            styleString: '<style></style>'
        }        
    },
    created () {
        const properties = getParameterByName('properties');
        if (properties) {
            const propertiesArray = properties.split(',');
            this.selectedProperties = propertiesArray.map(item => this.pListData.find(p => p.name === item));
        }
    },
    methods: {
        onValueChanged (e) {
            console.log(e);
            StyleMapper.getInstance().addRule(e.property, e.value, this.currentSelector);
            this.styleString = `<style>${StyleMapper.getInstance().toCSS()}</style>`;
            // console.log(StyleMapper.getInstance().toCSS());
        },
        selectorUpdate (e) {
            this.currentSelector = e.selector;
            this.templateClass = e.templateClass;
        }
    }
}
</script>

<style>

</style>