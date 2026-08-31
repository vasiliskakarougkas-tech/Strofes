export default {
  name: 'article',
  title: 'Άρθρο',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'section',
      title: 'Ενότητα εμφάνισης',
      type: 'string',
      options: {
        list: [
          { title: 'Δοκιμές (Test Drive)', value: 'test' },
          { title: 'Νέα', value: 'news' },
          { title: 'Οδηγός Αγοράς', value: 'guide' },
        ],
        layout: 'radio',
      },
      initialValue: 'test',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (μέρος του link, π.χ. dokimi-peugeot-3008)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Κύρια φωτογραφία',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Περιγραφή φωτογραφίας (για SEO/προσβασιμότητα)',
          type: 'string',
        },
      ],
    },
    {
      name: 'tag',
      title: 'Ετικέτα (π.χ. Νέο, Ηλεκτρικό, Hatchback)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Κατηγορία (π.χ. Sedan · Βενζίνη)',
      type: 'string',
    },
    {
      name: 'excerpt',
      title: 'Σύντομη περιγραφή (εμφανίζεται στην κάρτα στην αρχική)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: 'Πλήρες κείμενο άρθρου',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Περιγραφή φωτογραφίας',
              type: 'string',
            },
          ],
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Βίντεο (YouTube ή Vimeo)',
          fields: [
            {
              name: 'url',
              title: 'Link βίντεο',
              description: 'Επικόλλησε το link του video από YouTube ή Vimeo',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Λεζάντα (προαιρετικό)',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'url', subtitle: 'caption' },
          },
        },
        {
          type: 'object',
          name: 'imageCarousel',
          title: 'Καρουζέλ φωτογραφιών',
          fields: [
            {
              name: 'images',
              title: 'Φωτογραφίες',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Περιγραφή φωτογραφίας',
                      type: 'string',
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(2).error('Πρόσθεσε τουλάχιστον 2 φωτογραφίες για καρουζέλ'),
            },
          ],
          preview: {
            select: { images: 'images' },
            prepare({ images }) {
              return {
                title: `Καρουζέλ (${images ? images.length : 0} φωτογραφίες)`,
                media: images && images[0],
              };
            },
          },
        },
      ],
    },
    {
      name: 'score',
      title: 'Βαθμολογία (π.χ. 8.4 / 10)',
      type: 'string',
    },
    {
      name: 'readTime',
      title: 'Χρόνος ανάγνωσης (π.χ. 6 λεπτά ανάγνωση)',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Ημερομηνία δημοσίευσης',
      type: 'datetime',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
}
