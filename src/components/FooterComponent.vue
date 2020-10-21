<template>
    <footer class="block py-4 z-10">
        <div class="container mx-auto px-4">
            <hr class="mb-4 border-b-1 border-gray-300"/>
            <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4">
                    <div class="text-sm text-gray-600 font-semibold py-1">
                        Copyright © {{date}}
                        <a
                                href="https://www.creative-tim.com"
                                class="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                        >
                            Box Medico. Creado por Joaquín Gamboa, Guillermo Díaz, Daniela Sanchez.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "FooterComponent",
        data() {
            return {
                date: new Date().getFullYear()
            }
        }
    }
</script>

<style scoped>

</style>
