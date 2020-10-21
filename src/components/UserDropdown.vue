<template>
  <div>
    <a
      class="text-gray-600 block"
      href="#pablo"
      v-on:click="toggleDropdown($event)"
      ref="btnDropdownRef"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow
      }"
      style="min-width: 12rem"
    >
      <a
        @click="logout()"
        class="text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        v-if="isLoggedIn"
      >
        Cerrar Sesión
      </a>
    </div>
  </div>
</template>
<script>
import Popper from "popper.js";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dropdownPopoverShow: false
    };
  },
  methods: {
    ...mapActions(['logout']),
    toggleDropdown: function(event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        new Popper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-end"
        });
      }
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
