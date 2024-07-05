<script>
    import intro from '../content/intro.md?raw';
    // @ts-ignore
    import MarkdownIt from 'markdown-it';
    import { currentProject } from '../lib/store.js';
    import { onMount } from 'svelte';

    onMount(() => {
        currentProject.set('');
    })

    const md = new MarkdownIt({
        html: true,
    });
</script>
<main>
    {@html md.render(intro)}
</main>