<template>
    <div>
        <select 
            v-if="suffixList.length"
            v-model="currentValue"
            @change="valueChanged"
        >
            <option
                v-for="(s, i) in suffixList"
                :key="i"
                :value="s"
            >
                {{ s }}
            </option>
        </select>
    </div>
</template>

<script>
import BaseEditor from './BaseEditor';
import enums from '../../assets/enums.json';
import { uniq } from 'lodash';
export default {
    extends: BaseEditor,
    computed: {
        suffixList () {
            console.log(this.subType);
            return uniq([
                ...enums.find(item => item.name === this.subType).values,
                ...enums.find(item => item.name === 'global').values
            ]);
        },
        defaultValue () {
            return this.suffixList[0];
        }
    }
}
</script>

<style>

</style>