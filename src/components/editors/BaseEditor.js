export default {
    props: {
        subType: {
            required: true,
            type: String
        }
    },
    data () {
        return {
            currentValue: '',
            currentPrefix: '',
            currentSuffix: ''
        };
    },
    computed: {
        suffixList () {
            return [];
        },
        prefixList () {
            return [];
        },
        defaultValue () {
            return '0';
        },
        emittedValue () {
            return `${this.currentPrefix}${this.currentValue}${this.currentSuffix}`;
        }
    },
    methods: {
        valueChanged () {
            this.$emit('value-change', this.emittedValue);
        }
    },
    mounted () {
        this.currentValue = this.defaultValue;
        this.currentPrefix = this.prefixList.length ? this.prefixList[0] : '';
        this.currentSuffix = this.suffixList.length ? this.suffixList[0] : '';
    }
}