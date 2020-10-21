<template>
    <div id="main">
        <sidebar-component></sidebar-component>
        <div class="relative md:ml-64 bg-gray-100">
            <navbar-component></navbar-component>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
import NavbarComponent from "../components/Navbar";
import SidebarComponent from "../components/Sidebar";

export default {
    props: {
        source: String,
    },
    components: {
        NavbarComponent,
        SidebarComponent
    },
    data: () => ({
        drawer: null,
    }),
}

</script>

