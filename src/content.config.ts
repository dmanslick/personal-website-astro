import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        blurb: z.string(),
        image: z.string(),
        pub_date: z.date(),
        date_text: z.string()
    })
})

export const collections = { blog }