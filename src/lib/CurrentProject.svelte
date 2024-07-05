<script>

    import { currentProject } from "./store";

</script>

<a href='/projects/{$currentProject}'>
    <h5 class='min-h-6 text-theme-red'>
        {#if $currentProject.length > 0} 
            > {$currentProject} &lt;
        {/if}
    </h5>
</a>