import { INodeType, INodeTypeDescription } from "n8n-workflow";
import {N8NPropertiesBuilder, N8NPropertiesBuilderConfig} from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json';

// const customDefaults: Override[] = []

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class WhatsApi implements INodeType {
    description: INodeTypeDescription = {
        name: "whatsApi",
        displayName: "WhatsApi",
        icon: "file:wapi.svg",
        description: "Connect with WhatApp HTTP API",
        group: ["tools"],
        subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
        version: 1,
        inputs: ['main'],
	    outputs: ['main'],
        defaults: {
            name: "WhatsApi",
        },
        credentials: [
            {
                name: "whatsApi",
                required: true,
            },
        ],
        requestDefaults: {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            baseURL: '={{$credentials.url}}',
        },
        properties,
    }
}