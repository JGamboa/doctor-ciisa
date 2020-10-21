<template>
    <div>
        <navbar-component></navbar-component>
        <main>
            <section class="absolute w-full h-full">
                <div
                        class="absolute top-0 w-full h-full bg-gray-900"
                        style="background-size: 100%; background-repeat: no-repeat;"
                ></div>
                <div class="container mx-auto px-4 h-full">
                    <div class="flex content-center items-center justify-center h-full">
                        <div class="w-full lg:w-4/12 px-4">
                            <div
                                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                            >
                                <div class="rounded-t mb-0 px-6 py-6">
                                    <div class="text-center mb-3">
                                        <h6 class="text-gray-600 text-sm font-bold">
                                            Iniciar sesión
                                        </h6>
                                    </div>
                                    <hr class="mt-6 border-b-1 border-gray-400"/>
                                </div>
                                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form @submit.prevent="login">
                                        <div class="relative w-full mb-3">
                                            <label
                                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-user"
                                            >Rut Personal</label
                                            ><input
                                                id="grid-user"
                                                type="text"
                                                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                                placeholder="Usuario"
                                                style="transition: all 0.15s ease 0s;"
                                                v-model="user.User"
                                        />
                                        </div>
                                        <div class="relative w-full mb-3">
                                            <label
                                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-password"
                                            >Contraseña</label
                                            ><input
                                                id="grid-password"
                                                type="password"
                                                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                                placeholder="Contraseña"
                                                style="transition: all 0.15s ease 0s;"
                                                v-model="user.Password"
                                        />
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center cursor-pointer"
                                            ><input
                                                    id="customCheckLogin"
                                                    type="checkbox"
                                                    class="form-checkbox text-gray-800 ml-1 w-5 h-5"
                                                    style="transition: all 0.15s ease 0s;"
                                            /><span class="ml-2 text-sm font-semibold text-gray-700"
                                            >Recuérdame</span
                                            ></label
                                            >
                                        </div>
                                        <div class="text-center mt-6">
                                            <button
                                                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                    type="submit"
                                                    style="transition: all 0.15s ease 0s;"
                                            >
                                                <i class="fas fa-fingerprint text-gray-500 mr-2 text-sm"></i> Acceder
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <footer-component></footer-component>
            </section>
        </main>
    </div>
</template>
<script>
    import NavbarComponent from "../components/login/Navbar.vue";
    import FooterComponent from "../components/login/Footer.vue";
    import { mapActions } from "vuex";

    export default {
        name: "login-page",
        components: {
            NavbarComponent,
            FooterComponent
        },
        data() {
            return {
                user: {
                    User: 'MEDICO1',
                    Password: 'CIISA1'
                }
            }
        },
        methods: {
            ...mapActions(['storeUser']),
            async login() {
                const payload =await this.axios.post('/Login/Login', this.user)
                .then(res => {
                    return res.data;
                })
                .catch( e => {
                    console.log(e.response);
                })

                payload.usuario = await this.axios.post('/Medico/ObtenerMedico', { }, { headers: { Authorization: 'Bearer ' + payload.token}})
                    .then(res => {
                        return res.data;
                    })

                await this.storeUser(payload);
            }
        }
    }
</script>
