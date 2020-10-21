<template>
  <footer class="absolute w-full bottom-0 bg-gray-900 pb-6">
    <div class="container mx-auto px-4">
      <hr class="mb-6 border-b-1 border-gray-700" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4">
          <div class="text-sm text-white font-semibold py-1">
            Copyright © {{date}}
            Box Medico. Creado por Joaquín Gamboa, Guillermo Díaz, Daniela Sanchez.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
