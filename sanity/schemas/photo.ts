// Sanity schema for the "photo" document type
// TODO: After setting up your Sanity project (sanity.io), import this schema
// in your Sanity studio configuration file (sanity.config.ts)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Rule = { required: () => any }

export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the photo (displayed in gallery captions)',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables focal point for smart cropping
      },
      description: 'Upload the photo here',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Nature / Landscape', value: 'Nature/Landscape' },
          { title: 'Events / Concerts', value: 'Events/Concerts' },
        ],
        layout: 'radio',
      },
      description: 'Category used for gallery filtering',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g. 1, 2, 3...)',
      initialValue: 99,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
