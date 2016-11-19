import {RealBuildService} from './real-build-service';
import {MockBuildService} from './mock-build-service';
import {inject} from 'aurelia-framework';

@inject(RealBuildService, MockBuildService)
export class BuildService {
  constructor(realBuildService, mockBuildService) {
    this.realBuildService = realBuildService;
    this.mockBuildService = mockBuildService;
  }

  getAllFailedBuilds(baseUrl) {
    return baseUrl === 'mock' ? this.mockBuildService.getAllFailedBuilds() : this.realBuildService.getAllFailedBuilds(baseUrl);
  }
}