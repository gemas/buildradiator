import { BuildOverview } from '../../../../src/view/elements/build-overview';

describe('the BuildOverview', () => {
    describe('getBuildStatusCssClass', () => {
        it('returns alert-success when buildStatus is SUCCESS', () => {
            expect(new BuildOverview().getBuildStatusCssClass({ status: 'SUCCESS' })).toEqual('alert-success');
        });

        it('returns alert-danger when buildStatus is FAILURE', () => {
            expect(new BuildOverview().getBuildStatusCssClass({ status: 'FAILURE' })).toEqual('alert-danger');
        });

        it('throws an error when buildStatus is something Random', () => {
            expect(() => new BuildOverview().getBuildStatusCssClass({ status: 'random' })).toThrow(new Error('The buildstatus "random" is invalid'));
            expect(() => new BuildOverview().getBuildStatusCssClass({})).toThrow(new Error('The buildstatus "undefined" is invalid'));
        });
    });

    describe('getDrawAttentionCssClass', () => {
        it('returns draw-attention when drawAttention is true', () => {
            expect(new BuildOverview().getDrawAttentionCssClass({ drawAttention: true })).toEqual('draw-attention');
        });

        it('returns empty string when drawAttention is false', () => {
            expect(new BuildOverview().getDrawAttentionCssClass({ drawAttention: false })).toEqual('');
        });

        it('throws an error when drawAttention is something Random', () => {
            expect(() => new BuildOverview().getDrawAttentionCssClass({ drawAttention: 'random' })).toThrow(new Error('The drawAttention "random" is invalid'));
            expect(() => new BuildOverview().getDrawAttentionCssClass({})).toThrow(new Error('The drawAttention "undefined" is invalid'));
        });
    });
});