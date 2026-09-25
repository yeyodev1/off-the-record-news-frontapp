<template>
  <div class="filters" role="search">
    <slot />
  </div>
</template>

<style scoped lang="scss">
// Barra de filtros: en el celular cada control ocupa el ancho; en desktop se alinean.
.filters {
  @include flex-cards(150px, 0.5rem);
  margin-bottom: 1rem;

  :slotted(input),
  :slotted(select) {
    padding: 0.6rem 0.8rem;
    font-size: $text-sm;
  }

  :slotted(.filters__search) {
    flex-basis: 100%;

    @include from('md') {
      flex-basis: 260px;
      flex-grow: 2;
    }
  }
}
</style>
