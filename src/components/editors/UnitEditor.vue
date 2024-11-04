<template>
    <div>
        <input
            v-model="currentValue"
            type="number"
            @change="valueChanged"
        />
        <select 
            v-if="suffixList.length"
            v-model="currentSuffix"
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
import units from '../../assets/units.json';
export default {
    extends: BaseEditor,
    computed: {
        suffixList () {
            return units.find(item => item.subType === this.subType).units;
        }
    }
}
</script>

<style>

</style>