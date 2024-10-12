import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription, IWebhookFunctions, IWebhookResponseData } from "n8n-workflow";

const events = ['messages.upsert'];

export class WhatsApiTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: "WhatsAPI Trigger",
        name: "whatsApiTrigger",
        version: 1,
        icon: "file:wapi.svg",
        group: ["trigger"],
        description: "Handle WhatsApi trigger via webhooks",
        defaults: {
            name: "WhatsApi Trigger",
        },
        inputs: [],
        credentials: [],
        webhooks: [
            {
                name: "default",
                httpMethod: "POST",
                responseMode: "onReceived",
                path: "wapi",
            }
        ],
        outputs: ['main'],
        outputNames: events,
        properties: [
            {
                displayName: "Remember to configure WhatsApi <b>webhook URL</b>.",
                name: "operation",
                type: "notice",
                typeOptions: {
                    theme: "info"
                },
                default: "",
            },
            {
                displayName: "<b>Events</b>: <br/>- messages.upsert",
                name: "operation",
                type: "notice",
                typeOptions: {
                    theme: "info"
                },
                default: "",
            },
        ]
    }
    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const bodyData = this.getBodyData();
        const eventType = bodyData.event as string | undefined;
        if (eventType === undefined || !events.includes(eventType)) {
            return {};
        }

		const eventIndex: number = events.indexOf(eventType);
        const req = this.getRequestObject();
        const data = this.helpers.returnJsonArray(req.body as IDataObject);
        const empty: INodeExecutionData[] = [];
        const workflowData = events.map((_) => empty);
        workflowData[eventIndex] = data;

		return {
			workflowData: workflowData,
		};
    }
}