<script>
    import { currentProject } from '../../../../lib/store.js';
    import { onMount } from 'svelte';
    // @ts-ignore
    import MarkdownIt from 'markdown-it';

    export let data;

    onMount(() => {
        currentProject.set(data.project);
    })

    const md = new MarkdownIt({
        html: true,
    });
    
</script>
<main>
    <article>
        <h1>{data.metadata.title}</h1>
        <p class='text-theme-blue'>{new Date(data.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
        </p>
        <br>
        {@html md.render(data.content)}
    </article>
</main>