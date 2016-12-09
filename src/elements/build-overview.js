import { bindable } from 'aurelia-framework';

export class BuildOverview {
    @bindable builds;

    getBuildStatusCssClass(build) {
        if (build.status === 'SUCCESS') {
            return 'alert-success';
        }
        if (build.status === 'FAILURE') {
            return 'alert-danger';
        }
        throw new Error('The buildstatus "' + build.status + '" is invalid')
    }

    getDrawAttentionCssClass(build) {
        if (build.drawAttention === true) {
            return 'draw-attention';
        }
        if (build.drawAttention === false) {
            return '';
        }
        throw new Error('The drawAttention "' + build.drawAttention + '" is invalid')
    }
}
