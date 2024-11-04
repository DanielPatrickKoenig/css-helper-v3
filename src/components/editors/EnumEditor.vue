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
export default {
    extends: BaseEditor,
    computed: {
        suffixList () {
            return enums.find(item => item.subType === this.subType).values;
        },
        defaultValue () {
            return this.suffixList[0];
        }
    }
}
</script>

<style>

</style>