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
                    v-for="(p, i) in filteredProperties"
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
    }
}
</script>