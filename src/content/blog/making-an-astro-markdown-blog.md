---
pub_date: 2025-06-19
date_text: 6/19/2025
title: Making a Markdown Blog Using Astro!
image: https://cdn.buttercms.com/xrVbfdR5TBy4iTaY4xl7
blurb: It's been almost a year since I last updated my personal website. In this post, I walk through how to create a Markdown-powered blog using Astro, bringing modern tooling and simplicity together for a fast, easy-to-maintain site.
---

It's been nearly a year since I've last touched the code for my personal website (I last edited my site July 9, 2024). I'm planning to create many programming projects this summer, so I decided that I would add blogging to my personal site to document and share the creations that I'll make.

Rather than using a full-blown CMS such as Wordpress, I decided to use Astro, a static site generator, to create my blog. This was mainly for three reasons:

1. I don't want to pay for hosting.
2. I thought it would be a fun one day project for myself.
3. I can convert my existing code to use Astro, and add the blogging on top of that.

The previous archecture of my site was very simple: literally an index.html page with some JavaScript and images + files of some of my projects.

## Planning

I decided to make a list of tasks to breakdown the steps I would need to take to finish this conversion. While the whole process truly wasn't complex, breaking down projects into steps is something that I want to do for the projects that I want to pursue later this summer, so I decided it's good to start doing that now. These were the steps I came up with.

-   Start Astro project
-   Copy parts of existing code
-   Create component for projects showcase
-   Create page to showcase blog posts
-   Create blog post template
-   Test
-   Deploy

## Building the Site

I created the project using the `npm create astro` command.

When copying the html from my old website, I split up the code by creating a root layout component that included the navigation and footer of my existing website, the global css file, and the associated JavaScript. I made it so that this component can take in page titles as a prop. After this, I copied the main content of the old website into the `index.astro` file, and wrapped it in the root layout component.

This is what the project structure looked like at that point

```
├── public
├── src
│   ├── components
│   ├── css
│   ├── js
│   ├── layouts
│   │   └── RootLayout.astro
│   └── pages
│       └── index.astro
├── .gitignore
├── astro.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

Then I installed TailwindCSS, since it was what I had used for most of the styling on my old website. That site was built with Tailwind V3 and included some custom colors. I didn't want to deal with updating the config for Tailwind V4 on the new site, so I just installed V3 again instead.

I had previously used web components to easily write html to display my projects, so I decided to switch these to Astro components. I created a Project.astro file in the components folder, and refactored the web component to an Astro component.

## The Confusing Collections API

After getting Tailwind working, I started writing the logic to display blog posts. I used Astro's collections API to do this. This part was a bit confusing because the Astro documentation shows both the old and new ways to use the collections API, so it wasn't immediately clear which one was the correct approach.

## Adding Blogging

Once I figured out the right version of the collections API to use, I did the following: I created a `content.config.ts` file in the src directory and added the code below to that file.

```ts
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
```

The schema I defined for the blog collection represents the frontmatter that's required in the markdown files for my blog posts. I also created a `[...slug].astro` file under the `pages/blog` directory. This file handles the code for individual blog post entries and is also what's responsible for displaying the post you're currently reading on this website. I installed Tailwind Prose to easily style the markdown. Astro also automatically adds syntax highlighting to markdown code blocks, something I find really nice. I added the code below to the `pages/blog/[...slug].astro` file.

```astro
---
import { getCollection } from 'astro:content'
import RootLayout from '../../layouts/RootLayout.astro'

export async function getStaticPaths() {
	const blogEntries = await getCollection('blog')
	return blogEntries.map((entry) => {
		return {
			params: { slug: entry.slug },
			props: { entry }
		}
	})
}

const { entry } = Astro.props
const { Content } = await entry.render()
---

<RootLayout title={`Dhruv Shah - ${entry.data.title}`}>
	<article class='mx-4 md:mx-auto prose py-10 prose-headings:font-semibold' style='max-width: min(50rem, 100vw);'>
		<p><small>{entry.data.date_text}</small></p>
		<h1 class='-mt-4'>{entry.data.title}</h1>
		<img src={entry.data.image} alt={entry.data.title + ' image'} />
		<Content />
	</article>
</RootLayout>

```

To display all my blog entries, I created a `blog.astro` file and a `BlogPost.astro`. BlogPost is a component that the `blog.astro` page will use to display all of my blog entries. This is the code for `BlogPost.astro`.

```astro
---
interface Props {
	title: string
	date: string
	blurb: string
	imageSrc: string
	imageAlt: string
	slug: string
}

const { title, date, slug, imageSrc, imageAlt, blurb } = Astro.props
---

<div>
	<h2 class='text-center my-5 text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl font-medium'>{title}</h2>
	<a href={`/blog/${slug}`} target='_blank'>
		<img class='border-2 rounded-xl max-w-full h-auto drop-shadow-md hover-image' src={imageSrc} alt={imageAlt} />
	</a>
	<div class='mt-4 mx-4'>
		<small>{date}</small>
		<p class='text-[#374151]'>{blurb}</p>
	</div>
</div>
```

This is the code for `blog.astro`

```astro
---
import { getCollection } from 'astro:content'
import RootLayout from '../layouts/RootLayout.astro'
import BlogPost from '../components/BlogPost.astro'

const allBlogPosts = await getCollection('blog')
---

<RootLayout title='Dhruv Shah - Blog'>
	<div class='container mx-auto py-20 px-5'>
		<div class='grid mx-5 grid-cols-1 gap-10 lg:grid-cols-2 lg:mx-0'>
			{allBlogPosts.sort((a, b) => a.data.pub_date.getTime() - b.data.pub_date.getTime()).map((post) => <BlogPost title={post.data.title} date={post.data.date_text} blurb={post.data.blurb} imageSrc={post.data.image} imageAlt={post.data.title} slug={post.slug} />)}
		</div>
	</div>
</RootLayout>
```

The is the final folder structure (ignoring things in the public folder)

```
├── public
├── src
│   ├── components
│   ├── css
│   │   └── global.css
│   ├── js
│   │   ├── home.js
│   │   └── root.js
│   ├── layouts
│   │   └── RootLayout.astro
│   └── pages
│       ├── index.astro
│       ├── blog.astro
│       └── blog
│           └── [...slug].astro
├── .gitignore
├── astro.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Wrapping up

After creating a test blog post and verifying that everything worked, I knew that I was finished. I then deployed the project on Vercel. You can access the source code for my current website [here](), and the code for my old webiste [here](https://github.com/dmanslick/Personal-Site).
