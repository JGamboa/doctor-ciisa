<template>
<div>
  <!-- Navbar -->
  <nav class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
    <div
      class="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <span
        class="text-white text-sm uppercase hidden lg:inline-block font-semibold"
        >Dashboard</span
      >
      <!-- Form -->
      <form
        class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
      >
      </form>
      <!-- User -->
      <ul
        class="flex-col md:flex-row list-none items-center hidden md:flex"
      >
        <user-dropdown-component></user-dropdown-component>
      </ul>
    </div>
  </nav>
  <div class="relative bg-orange-600 md:pt-10 pb-10 pt-12">
    <br>
  </div>
</div>
  <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from "./UserDropdown.vue";
export default {
  components: {
    UserDropdownComponent
  }
};
</script>
