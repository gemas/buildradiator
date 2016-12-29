import { BuildOverview } from '../../../../src/view/elements/build-overview';

describe('the BuildOverview', () => {

    function makeEvent() {
        var data = {};
        var id = "id";

        function withId(_id) {
            id = _id;
            return this;
        }

        function withData(key, value) {
            data[key] = value;
            return this;
        }

        function build() {
            return {
                dataTransfer: {
                    setData: (key, value) => data[key] = value,
                    getData: (key) => data[key],
                },
                target: {
                    id: id
                }
            }
        }

        return {
            withId: withId,
            withData: withData,
            build: build
        }
    };

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

    it('is constructed with the property showBlackList on false', () => expect(new BuildOverview().showBlackList).toBe(false));

    describe('startDrag', () => {

        it('sets the property showBlackList on true', () => {
            var buildOverview = new BuildOverview();

            buildOverview.startDrag(makeEvent().build());

            expect(buildOverview.showBlackList).toBe(true);
        })

        it('returns true so that preventDefault is not called on event, because this breaks the dragging', () => {
            var buildOverview = new BuildOverview();

            buildOverview.startDrag(makeEvent().build());

            expect(buildOverview.showBlackList).toBe(true);
        });

        it('puts the id of the target from the event on the datatransfer with the key id', () => {
            var event = makeEvent()
                .withId("random_id")
                .build();

            new BuildOverview().startDrag(event);

            expect(event.dataTransfer.getData("id")).toBe("random_id");
        });
    });

    describe('endDrag', () => {
        it('sets the property showBlackList on false', () => {
            var buildOverview = new BuildOverview();

            buildOverview.endDrag();

            expect(buildOverview.showBlackList).toBe(false);
        })

        it('returns not true so that preventDefault is called on event, because the stop dragging does not need further propagation of the event', () => {
            var buildOverview = new BuildOverview();

            buildOverview.endDrag();

            expect(buildOverview.showBlackList).toBeFalsy();
        });
    });

    describe('drop', () => {
        it('calls addToBlacklist method from buildOverview with the id in the dataTransfer of the event', () => {
            var buildOverview = new BuildOverview();
            var passedId;
            buildOverview.addToBlacklist = (_passedId) => passedId = _passedId;

            buildOverview.drop(makeEvent().withId("").withData("id", "someId").build());

            expect(passedId).toBe("someId");
        })
    });


});