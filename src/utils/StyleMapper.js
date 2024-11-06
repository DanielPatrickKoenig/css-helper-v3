export default class StyleMapper {
    static INSTANCE;
    static getInstance () {
        if (!StyleMapper.INSTANCE) {
            new StyleMapper();
        }
        return StyleMapper.INSTANCE;
    }
    constructor () {
        if (!StyleMapper.INSTANCE) StyleMapper.INSTANCE = this;
        this.styleMatrix = {};
    }
    addRule (property, value, selector) {
        if (!this.styleMatrix[selector]) {
            this.styleMatrix[selector] = {};
        }
        this.styleMatrix[selector][property] = value;
    }
    renderProperties (selector) {
        return Object.keys(this.styleMatrix[selector]).map(item => `${item}: ${this.styleMatrix[selector][item]};`).join('');
    }
    toCSS () {
        return Object.keys(this.styleMatrix).map(item => `${item}{${this.renderProperties(item)}}`).join('');
    }
}