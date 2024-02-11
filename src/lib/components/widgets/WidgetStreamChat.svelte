<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import Widget from "./Widget.svelte";

    const { title, icon } = $props<{
        title: string;
        icon?: MaterialSymbol;
    }>();
</script>
<Widget {title} {icon}>
    <div>Hello world</div>
</Widget>