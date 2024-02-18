<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";

    const { icon } = $props<{ icon: MaterialSymbol }>();
</script>
<span class="material-symbols-rounded { icon }">{ icon }</span>