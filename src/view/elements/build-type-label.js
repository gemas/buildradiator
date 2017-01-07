import { bindable } from 'aurelia-framework';

export class BuildTypeLabel {
    @bindable buildTypesGroupedByLabel;

    get keysBuildTypeLabel() {
        return Object.keys(this.buildTypesGroupedByLabel);
    }
}