import { AgentOverview } from '../../../src/view/agent-overview';

describe('the agent build overview', () => {

    function putFunctionOnJobQueue(expectFunction) {
        Promise.resolve().then(expectFunction);
    }

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    describe('activate function', () => {
        function makeAgentServiceStub() {

            let count = 0;

            function getAgents(baseUrl) {
                count++;
                expect(baseUrl).toEqual("baseUrl");
                return Promise.resolve(['a' + count, 'b' + count, 'c' + count]);
            }
            return { getAgents: getAgents };
        }
        it('should ask and show the agents from the buildService using the baseUrl from the parameters every 30 seconds', (done) => {

            let agentOverview = new AgentOverview(makeAgentServiceStub());

            agentOverview.activate({ baseUrl: "baseUrl" });
            putFunctionOnJobQueue(() => expect(agentOverview.agents).toEqual(['a1', 'b1', 'c1']));

            jasmine.clock().tick(30000);

            putFunctionOnJobQueue(() => expect(agentOverview.agents).toEqual(['a2', 'b2', 'c2']));

            jasmine.clock().tick(29999);

            putFunctionOnJobQueue(() => expect(agentOverview.agents).toEqual(['a2', 'b2', 'c2']));

            jasmine.clock().tick(1);

            putFunctionOnJobQueue(() => expect(agentOverview.agents).toEqual(['a3', 'b3', 'c3']));

            putFunctionOnJobQueue(done);
        });
    });
});
