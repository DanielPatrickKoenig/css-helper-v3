<template>
    <div>
        <select
            :disabled="!active"
            v-model="selectedOption"
            @change="onChange"
        >
            <optgroup
                v-for="(category, key, i) in matrixData" 
                :key="i"
                :label="key"
            >
                <option
                    v-for="(optionData, j) in category.options"
                    :key="j"
                    :value="optionData"
                >
                    {{ optionLabel(optionData) }}
                </option>
            </optgroup>
        </select>
    </div>
</template>

<script>
import selectorData from '../assets/selectorBuilderMap.json';
import { flatten, uniq } from 'lodash';
export default {
    props: {
        baseSelector: {
            default: '',
            type: String
        },
        followables: {
            default: () => {},
            type: Array
        },
        excludeBase: {
            default: false,
            type: Boolean
        },
        active: {
            default: true,
            type: Boolean
        }
    },
    data () {
        return {
            currentSelector: '',
            selectorOptionMatrix: selectorData,
            matrixData: {},
            selectedOption: {},
        }
    },
    watch: {

    },
    methods: {
        buildMatrix () {
            // const matrixData = { ...this.selectorOptionMatrix };
            const matrixData = JSON.parse(JSON.stringify(this.selectorOptionMatrix));
            const selection = document.querySelectorAll(this.baseSelector);
            const elements = flatten([...selection].map(item => this.getDescendants(this, item)));
            if (!this.excludeBase) {
                elements.push(document.querySelector(this.baseSelector));
            }
            elements.forEach(item => {
                const classList = [...item.classList].map(_item => ( {value: `.${_item}`} ));
                matrixData.classes.options = [...matrixData.classes.options, ...classList];
                const itemId = item.getAttribute('id');
                if (itemId) {
                    matrixData.ids.options = [...matrixData.ids.options, { value: `#${itemId}` }];
                }
                matrixData.elements.options = [...matrixData.elements.options, { value: item.tagName }];
                const attributes = [...item.attributes].map(_item => ( {value: `[${_item.name}]`} ));
                const attributesWithValues = [...item.attributes].filter(_item => item.getAttribute(_item.name)).map(_item => ( {value: `[${_item.name}="${item.getAttribute(_item.name)}"]`} ));
                matrixData.attributes.options = [...matrixData.attributes.options, ...attributes, ...attributesWithValues];
            });
            const filteredMatrixData = {};
            Object.keys(matrixData).forEach(key => {
                console.log(this.followables.includes(key));
                if (this.followables.includes(key)) {
                    matrixData[key].options = matrixData[key].options.map(item => ({ ...item, followables: matrixData[key].followables, type: key }));
                    filteredMatrixData[key] = matrixData[key];
                }
            });
            return filteredMatrixData;
        },
        getDescendants (scope, element, list=[]) {
            [...element.children].forEach(item => {
                list.push(item);
                scope.getDescendants(scope, item, list);
            });
            return list;
        },
        onChange () {
            console.log(this.selectedOption);
            this.$emit('selected', this.selectedOption);
        } 
    },
    mounted() {
        this.matrixData = this.buildMatrix();
    },
    computed: {
        optionLabel () {
            return option => {
                return option.label ? option.label : option.value;
            }
        }
    }
}
</script>
