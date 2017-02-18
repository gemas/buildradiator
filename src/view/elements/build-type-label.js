import { bindable } from 'aurelia-framework';

export class BuildTypeLabel {
    @bindable buildTypesGroupedByLabel;

    get labelsBuildTypeGroupedByLabel() {
        return Object.keys(this.buildTypesGroupedByLabel).filter(key => key != 'type');
    }

    isNotABuildType(labelElement) {
        return this.buildTypesGroupedByLabel[labelElement].type !== 'build';
    }
}