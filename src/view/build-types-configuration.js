import { BuildTypeService } from '../domain/services/build-type-service';
import { inject } from 'aurelia-framework';

@inject(BuildTypeService)
export class BuildTypesConfiguration {
    constructor(service) {
        service.getBuildTypesGroupedByLabel().then(buildTypesGroupedByLabel => this.buildTypesGroupedByLabel = buildTypesGroupedByLabel);
    }
}