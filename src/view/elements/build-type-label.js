import { bindable } from 'aurelia-framework';

function  isABuildType(labelElement) {
        return this.buildTypesGroupedByLabel[labelElement].type === 'build';
    }

export class BuildTypeLabel {
    @bindable buildTypesGroupedByLabel;

    get labelsBuildTypeGroupedByLabel() {
        return Object.keys(this.buildTypesGroupedByLabel).filter(key => key !== 'type');
    }

    isNotABuildType(labelElement) {
        return !isABuildType.bind(this)(labelElement);
    }

    getId(labelElement) {
        return isABuildType.bind(this)(labelElement) ? this.buildTypesGroupedByLabel[labelElement].id : '';
    }
}