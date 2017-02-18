import { bindable } from 'aurelia-framework';
import { BuildService } from '../../domain/services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class BuildTypeLabel {
    @bindable buildTypesGroupedByLabel;

     constructor(buildService) {
        this.buildService = buildService;
    }

    get labelsBuildTypeGroupedByLabel() {
        return Object.keys(this.buildTypesGroupedByLabel).filter(key => key !== 'type');
    }

    isNotABuildType(labelElement) {
        return !this.isABuildType(labelElement);
    }

    isABuildType(labelElement) {
        return this.buildTypesGroupedByLabel[labelElement].type === 'build';
    }

    getId(labelElement) {
        return this.isABuildType(labelElement) ? this.buildTypesGroupedByLabel[labelElement].id : '';
    }

    isChecked(labelElement) {
        return !this.buildService.isInBlackListBuilds(this.getId(labelElement));
    }

    changeStatusBuildType(event) {
        var checkedBlackListActions = {
            false: () => this.buildService.addToBlackListBuilds(event.target.id),
            true: () => this.buildService.removeFromBlackListBuilds(event.target.id)
}
        checkedBlackListActions[event.target.checked]();
    }
}