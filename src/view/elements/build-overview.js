import { bindable } from 'aurelia-framework';

export class BuildOverview {
    @bindable builds;
    @bindable addToBlacklist;
    @bindable getBlacklist;

    constructor() {
        this.showBlackList = false;
    }

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

    startDrag(event) {
        this.showBlackList = true;
        event.dataTransfer.setData("id", event.target.id);
        return true;
    }

    endDrag(event) {
        this.showBlackList = false;
    }

    preventEventPropagation(event) {
        event.preventDefault();
    }

    drop(event) {
        this.addToBlacklist(event.dataTransfer.getData("id"));
        this.builds = this.builds.filter(build => !this.getBlacklist().includes(build.id));
        this.showBlackList = false;
    }
}
