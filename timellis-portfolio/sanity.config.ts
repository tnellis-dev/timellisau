import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'timellis-portfolio',

  projectId: '7524k6a3',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'profile',
        title: 'Profile',
        type: 'document',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'portrait', title: 'Portrait Image', type: 'image', options: { hotspot: true } },
          { name: 'bio', title: 'Bio / Intro Text', type: 'text' },
          
          // At a Glance Items
          {
            name: 'atAGlance',
            title: 'At a Glance Items',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'emoji', title: 'Emoji Icon', type: 'string' },
                  { name: 'label', title: 'Label (e.g. Based in)', type: 'string' },
                  { name: 'value', title: 'Value / Text', type: 'string' },
                ]
              }
            ]
          },

          // Professional Capabilities (What I do)
          {
            name: 'capabilities',
            title: 'Professional Capabilities',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'title', title: 'Capability Title', type: 'string' },
                  { name: 'description', title: 'Description', type: 'text' },
                ]
              }
            ]
          },

          // Projects & Publishing
          {
            name: 'projects',
            title: 'Projects & Publishing',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'category', title: 'Category Badge (e.g. Blog, Newsletter)', type: 'string' },
                  { name: 'title', title: 'Project Name', type: 'string' },
                  { name: 'description', title: 'Description', type: 'text' },
                  { name: 'linkText', title: 'Link Text (e.g. Visit site ↗)', type: 'string' },
                  { name: 'url', title: 'URL', type: 'url' },
                ]
              }
            ]
          }
        ],
      },
    ],
  },
})