import { BuildTypeService } from '../domain/services/build-type-service';
import { inject } from 'aurelia-framework';

@inject(BuildTypeService)
export class BuildTypesConfiguration {
    constructor(service) {
        this.service = service;
        this.buildTypesGroupedByLabel = {};
    }

    activate(params) {
        this.service
            .getBuildTypesGroupedByLabel(params.baseUrl)
            .then(buildTypesGroupedByLabel => this.buildTypesGroupedByLabel = buildTypesGroupedByLabel);
    }
} 