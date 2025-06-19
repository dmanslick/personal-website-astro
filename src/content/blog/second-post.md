---
pub_date: 6/20/2025
title: Second test post
image: images/project-images/masterscout-2024.png
blurb: Another example blurb for science or nonsense.
---

# Second test blog post!

This one's marginally more thoughtful, but not by much. Mostly written to keep the illusion of productivity alive.

## 💡 Profoundly Useless Insights

Today I learned that typing with your elbows is neither efficient nor appreciated in professional settings.

> “One does not simply walk into responsive design.” — Some front-end wizard, probably

Let's dump more chaos into a list:

-   HTML that feels pain
-   APIs that reply with passive aggression
-   Dark mode for your soul 🖤
-   `<marquee>` tags that haunt my dreams

### Useless Code Snippet of the Day™

```typescript
import { useParams } from 'react-router'
import { Editor } from '../blocks/editor-00/editor'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function NotePage() {
	const params = useParams()
	const [title, setTitle] = useState('')
	const queryClient = useQueryClient()

	const { mutate: mutateUpdateTitle } = useMutation({
		mutationFn: window.dbQueries.updateNote,
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['all-notes'] })
		}
	})

	useEffect(() => {
		const fetchTitle = async () => {
			const note = await window.dbQueries.getNote({ id: Number(params.id) })
			setTitle(note.title)
		}

		fetchTitle()
	}, [params])

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		window.dbQueries.updateNote({ id: Number(params.id), title: e.target.value })
		mutateUpdateTitle({ id: Number(params.id), title: e.target.value })
		setTitle(e.target.value)
	}

	return (
		<div className='h-screen'>
			<input value={title} onChange={updateTitle} className='ml-1 font-medium text-4xl text-neutral-800 dark:text-white mb-3 mt-3 outline-0' />
			<Editor />
		</div>
	)
}
```
