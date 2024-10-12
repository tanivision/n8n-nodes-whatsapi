import {
    IAuthenticateGeneric, ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class WhatsApi implements ICredentialType {
    name = 'whatsApi';
    displayName = 'Whats API';
    properties: INodeProperties[] = [
        {
            displayName: 'Host URL',
            name: 'url',
            type: 'string',
            default: 'https://wapi.envme.bid',
        },
        {
            displayName: 'Phone',
            name: 'phone',
            type: 'string',
            default: '628xxxxxxxxxx',
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
        }
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'X-API-Key': '={{$credentials.apiKey}}',
            },
        },
    };
    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.url}}',
            url: '/sessions',
        },
    };
}
