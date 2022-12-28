<script>
  import "$lib/styles/global.css";
  import SideMenu from "$lib/components/SideMenu.svelte";
</script>

<div class="layout">
  <SideMenu />
  <slot />
</div>
