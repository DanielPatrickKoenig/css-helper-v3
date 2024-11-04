<template>
    <div>
        <SelectorBuilder
            base-selector="header"
        />
        <div>
            <input
                type="text"
                v-model="searchTerm"
                placeholder="search"
            />
        </div>
        <router-link :to="{ path: 'property-editor', query: { properties: activeProperties.join(',') } }">Property Editor</router-link>
        <div>{{ activeProperties }}</div>
        <table>
            <thead>
                <tr>
                    <td>
                        Selected
                    </td>
                    <td>
                        Name
                    </td>
                    <td>
                        Defenition
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(p, i) in pList"
                    v-show="shouldShow(p)"
                    :key="i"
                >
                    <td>
                        <input
                            v-model="p.active"
                            type="checkbox"
                        />
                    </td>
                    <td>
                        {{p.name}}
                    </td>
                    <td>
                        {{p.defenition}}
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import SelectorBuilder from '@/components/SelectorBuilder.vue';
import jData from '../assets/properties.json';
export default {
    components: {
        SelectorBuilder
    },
    data () {
        return {
            pList: jData.map(item => ({...item, active: false})),
            searchTerm: '',
        }
        
    },
    computed: {
        filteredProperties () {
            return this.searchTerm.length ? this.pList.filter(item => item.name.includes(this.searchTerm)) : this.pList;
        },
        activeProperties () {
            return this.pList.filter(item => item.active).map(item => item.name);
        },
        shouldShow () {
            return p => this.filteredProperties.map(item => item.name).includes(p.name);
        }
    },
    methods: {
        goToEdidtor () {
            this.$router.replace('/property-editor');
        }
    }
}
</script>