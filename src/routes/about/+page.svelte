<script>
    import about from '../../content/about.md?raw';
    import MarkdownIt from 'markdown-it';

    const md = new MarkdownIt({
        html: true
    });
</script>
<main>
    {@html md.render(about)}
</main>
