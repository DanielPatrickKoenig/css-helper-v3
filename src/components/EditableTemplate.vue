<template>
    <div>
        <div class="property-column">
            <select
                v-model="currentSelector"
                @change="broadCastSelector"
            >
                <option
                    v-for="(s, i) in activeSelectors"
                    :key="i"
                    :value="i"
                >
                    {{ s }}
                </option>
            </select>
            <slot />
        </div>

        <div class="editor-column">
            <select
                v-model="index"
                @change="onTemplateSelected"
            >
                <option
                    v-for="(t, i) in editableTemplates"
                    :key="i"
                    :value="i"
                    @change="onTemplateSelected"
                >
                    {{ t.name }}
                </option>
            </select>

            <div 
                :class="`html-view ${templateContainerClass}`"
                v-html="editableContent"
            />
            <textarea
                class="editor-view"
                v-model="editableContent"
            />
        </div>
    </div>
</template>

<script>
import editableTemplates from '../assets/editableTemplates.json';
export default {
    data () {
        return {
            editableContent: editableTemplates[0].content,
            activeSelectors: editableTemplates[0].selectors,
            editableTemplates,
            currentSelector: 0,
            index: 0,
        };
    },
    mounted () {
        this.broadCastSelector();
    },
    computed: {
        templateContainerClass () {
            return 'css-helper-template';
        }
    },
    methods: {
        onTemplateSelected () {
            this.editableContent = this.editableTemplates[this.index].content;
            this. currentSelector = 0;
            this.activeSelectors = this.editableTemplates[this.index].selectors;
            this.broadCastSelector();
        },
        broadCastSelector () {
            this.$emit('selector-update', { selector: `.${this.templateContainerClass} ${this.activeSelectors[this.currentSelector]}`, templateClass: this.templateContainerClass });
        }
    }
}
</script>

<style>

</style>