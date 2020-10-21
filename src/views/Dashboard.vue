<template>
    <div>
        <div class="px-4 md:px-10 mx-auto w-full">
            <div class="container mx-auto px-4">
                <div class="space-y-1">
                    <label id="listbox-label" class="block text-sm leading-5 font-medium text-gray-700 text-left">
                        Usted es el Medico:
                    </label>
                    <div class="relative">
                        <span class="inline-block w-full rounded-md shadow-sm">
                            <button type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                <div class="flex items-center space-x-3">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" class="flex-shrink-0 h-6 w-6 rounded-full">
                                    <span class="block truncate">
                                      {{ user.Nombres }} {{ user.Apellidos }}
                                    </span>
                                </div>
                            </button>
                        </span>
                    </div>
                </div>

                <div class="mt-2 py-2 w-48 w-full" v-if="selectedBox == null || selectedBox === ''">
                    <label id="box-selection-label" for="box-selection" class="block text-sm leading-5 font-medium text-gray-700 text-left">
                        Seleccione box atención:
                    </label>
                    <div class="mt-2 w-48 bg-white rounded-lg shadow-xl float-left">
                        <div class="relative">
                            <select id="box-selection" v-model="box" class="block appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option v-for="box in boxes" :value="box.Id" v-bind:key="'box_' + box.Id">{{ box.Descripcion }}</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="float-left ml-5 mt-2">
                        <button v-on:click="selectBox" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Seleccionar</button>
                    </div>
                </div>

                <div v-else class="space-y-1 mt-5">
                    <label id="listbox-selected" class="block text-sm leading-5 font-medium text-gray-700 text-left">
                        Atendiendo en:
                    </label>
                    <div class="relative">
                      <span class="inline-block w-full rounded-md shadow-sm">
                        <button type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                          <div class="flex items-center space-x-3">
                            <span class="block truncate">
                                {{ selectedBox.Descripcion }}
                            </span>
                          </div>
                        </button>
                      </span>
                    </div>
                </div>

                <section class="pt-8 px-4 pb-4" v-if="paciente === null">
                    <h2 class="text-4xl mb-2 leading-tight font-heading">Pacientes por atender:</h2>
                    <div class="flex flex-wrap -mx-4 text-center">
                        <div class="w-full lg:w-1/6 px-4 mb-8 mt-10" v-for="paciente in pacientes" v-bind:key="'paciente_' + paciente.Id">
                            <div class="h-full pb-6 rounded shadow-md">
                                <img class="mx-auto mb-4 h-16 w-16" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSItNDIgMCA1MTIgNTEyLjAwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEwLjM1MTU2MiAyNDYuNjMyODEyYzMzLjg4MjgxMyAwIDYzLjIyMjY1Ny0xMi4xNTIzNDMgODcuMTk1MzEzLTM2LjEyODkwNiAyMy45NzI2NTYtMjMuOTcyNjU2IDM2LjEyNS01My4zMDQ2ODcgMzYuMTI1LTg3LjE5MTQwNiAwLTMzLjg3NS0xMi4xNTIzNDQtNjMuMjEwOTM4LTM2LjEyODkwNi04Ny4xOTE0MDYtMjMuOTc2NTYzLTIzLjk2ODc1LTUzLjMxMjUtMzYuMTIxMDk0LTg3LjE5MTQwNy0zNi4xMjEwOTQtMzMuODg2NzE4IDAtNjMuMjE4NzUgMTIuMTUyMzQ0LTg3LjE5MTQwNiAzNi4xMjVzLTM2LjEyODkwNiA1My4zMDg1OTQtMzYuMTI4OTA2IDg3LjE4NzVjMCAzMy44ODY3MTkgMTIuMTU2MjUgNjMuMjIyNjU2IDM2LjEzMjgxMiA4Ny4xOTUzMTIgMjMuOTc2NTYzIDIzLjk2ODc1IDUzLjMxMjUgMzYuMTI1IDg3LjE4NzUgMzYuMTI1em0wIDAiLz48cGF0aCBkPSJtNDI2LjEyODkwNiAzOTMuNzAzMTI1Yy0uNjkxNDA2LTkuOTc2NTYzLTIuMDg5ODQ0LTIwLjg1OTM3NS00LjE0ODQzNy0zMi4zNTE1NjMtMi4wNzgxMjUtMTEuNTc4MTI0LTQuNzUzOTA3LTIyLjUyMzQzNy03Ljk1NzAzMS0zMi41MjczNDMtMy4zMDg1OTQtMTAuMzM5ODQ0LTcuODA4NTk0LTIwLjU1MDc4MS0xMy4zNzEwOTQtMzAuMzM1OTM4LTUuNzczNDM4LTEwLjE1NjI1LTEyLjU1NDY4OC0xOS0yMC4xNjQwNjMtMjYuMjc3MzQzLTcuOTU3MDMxLTcuNjEzMjgyLTE3LjY5OTIxOS0xMy43MzQzNzYtMjguOTY0ODQzLTE4LjE5OTIxOS0xMS4yMjY1NjMtNC40NDE0MDctMjMuNjY3OTY5LTYuNjkxNDA3LTM2Ljk3NjU2My02LjY5MTQwNy01LjIyNjU2MyAwLTEwLjI4MTI1IDIuMTQ0NTMyLTIwLjA0Mjk2OSA4LjUtNi4wMDc4MTIgMy45MTc5NjktMTMuMDM1MTU2IDguNDQ5MjE5LTIwLjg3ODkwNiAxMy40NjA5MzgtNi43MDcwMzEgNC4yNzM0MzgtMTUuNzkyOTY5IDguMjc3MzQ0LTI3LjAxNTYyNSAxMS45MDIzNDQtMTAuOTQ5MjE5IDMuNTQyOTY4LTIyLjA2NjQwNiA1LjMzOTg0NC0zMy4wMzkwNjMgNS4zMzk4NDQtMTAuOTcyNjU2IDAtMjIuMDg1OTM3LTEuNzk2ODc2LTMzLjA0Njg3NC01LjMzOTg0NC0xMS4yMTA5MzgtMy42MjEwOTQtMjAuMjk2ODc2LTcuNjI1LTI2Ljk5NjA5NC0xMS44OTg0MzgtNy43Njk1MzItNC45NjQ4NDQtMTQuODAwNzgyLTkuNDk2MDk0LTIwLjg5ODQzOC0xMy40Njg3NS05Ljc1LTYuMzU1NDY4LTE0LjgwODU5NC04LjUtMjAuMDM1MTU2LTguNS0xMy4zMTI1IDAtMjUuNzUgMi4yNTM5MDYtMzYuOTcyNjU2IDYuNjk5MjE5LTExLjI1NzgxMyA0LjQ1NzAzMS0yMS4wMDM5MDYgMTAuNTc4MTI1LTI4Ljk2ODc1IDE4LjE5OTIxOS03LjYwNTQ2OSA3LjI4MTI1LTE0LjM5MDYyNSAxNi4xMjEwOTQtMjAuMTU2MjUgMjYuMjczNDM3LTUuNTU4NTk0IDkuNzg1MTU3LTEwLjA1ODU5NCAxOS45OTIxODgtMTMuMzcxMDk0IDMwLjMzOTg0NC0zLjE5OTIxOSAxMC4wMDM5MDYtNS44NzUgMjAuOTQ1MzEzLTcuOTUzMTI1IDMyLjUyMzQzNy0yLjA1ODU5NCAxMS40NzY1NjMtMy40NTcwMzEgMjIuMzYzMjgyLTQuMTQ4NDM3IDMyLjM2MzI4Mi0uNjc5Njg4IDkuNzk2ODc1LTEuMDIzNDM4IDE5Ljk2NDg0NC0xLjAyMzQzOCAzMC4yMzQzNzUgMCAyNi43MjY1NjIgOC40OTYwOTQgNDguMzYzMjgxIDI1LjI1IDY0LjMyMDMxMiAxNi41NDY4NzUgMTUuNzQ2MDk0IDM4LjQ0MTQwNiAyMy43MzQzNzUgNjUuMDY2NDA2IDIzLjczNDM3NWgyNDYuNTMxMjVjMjYuNjI1IDAgNDguNTExNzE5LTcuOTg0Mzc1IDY1LjA2MjUtMjMuNzM0Mzc1IDE2Ljc1NzgxMy0xNS45NDUzMTIgMjUuMjUzOTA2LTM3LjU4NTkzNyAyNS4yNTM5MDYtNjQuMzI0MjE5LS4wMDM5MDYtMTAuMzE2NDA2LS4zNTE1NjItMjAuNDkyMTg3LTEuMDM1MTU2LTMwLjI0MjE4N3ptMCAwIi8+PC9zdmc+" />
                                <div class="px-8">
                                    <h3 class="text-sm font-heading font-semibold">{{ paciente.Nombres }} {{ paciente.Apellidos }}</h3>
                                </div>
                                <div class="px-20 mt-3">
                                    <span class="svg-icon">
                                        <svg @click="generarLlamado(paciente)" viewBox="0 0 20 20" class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="Page-1" stroke="none" stroke-width="1" fill="green" fill-rule="evenodd">
                                                <g id="icon-shape">
                                                    <path d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z" id="Combined-Shape"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </span>

                                </div>
                            </div>
                            <div class="h-full mt-5">
                                <button @click="agregarAtencionBox(paciente)" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto text-sm ">Atender</button>
                            </div>
                        </div>
                    </div>
                </section>


                <section class="pt-8 px-4 pb-4" v-if="paciente">
                    <h2 class="text-4xl mb-2 leading-tight font-heading">Actualmente atendiendo a:</h2>
                    <div class="flex flex-wrap -mx-4 text-center">
                        <div class="w-full lg:w-1/3 px-4 mb-8">
                            <div class="h-full pb-6 rounded shadow-md">
                                <img class="mx-auto mb-4 h-16 w-16" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSItNDIgMCA1MTIgNTEyLjAwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEwLjM1MTU2MiAyNDYuNjMyODEyYzMzLjg4MjgxMyAwIDYzLjIyMjY1Ny0xMi4xNTIzNDMgODcuMTk1MzEzLTM2LjEyODkwNiAyMy45NzI2NTYtMjMuOTcyNjU2IDM2LjEyNS01My4zMDQ2ODcgMzYuMTI1LTg3LjE5MTQwNiAwLTMzLjg3NS0xMi4xNTIzNDQtNjMuMjEwOTM4LTM2LjEyODkwNi04Ny4xOTE0MDYtMjMuOTc2NTYzLTIzLjk2ODc1LTUzLjMxMjUtMzYuMTIxMDk0LTg3LjE5MTQwNy0zNi4xMjEwOTQtMzMuODg2NzE4IDAtNjMuMjE4NzUgMTIuMTUyMzQ0LTg3LjE5MTQwNiAzNi4xMjVzLTM2LjEyODkwNiA1My4zMDg1OTQtMzYuMTI4OTA2IDg3LjE4NzVjMCAzMy44ODY3MTkgMTIuMTU2MjUgNjMuMjIyNjU2IDM2LjEzMjgxMiA4Ny4xOTUzMTIgMjMuOTc2NTYzIDIzLjk2ODc1IDUzLjMxMjUgMzYuMTI1IDg3LjE4NzUgMzYuMTI1em0wIDAiLz48cGF0aCBkPSJtNDI2LjEyODkwNiAzOTMuNzAzMTI1Yy0uNjkxNDA2LTkuOTc2NTYzLTIuMDg5ODQ0LTIwLjg1OTM3NS00LjE0ODQzNy0zMi4zNTE1NjMtMi4wNzgxMjUtMTEuNTc4MTI0LTQuNzUzOTA3LTIyLjUyMzQzNy03Ljk1NzAzMS0zMi41MjczNDMtMy4zMDg1OTQtMTAuMzM5ODQ0LTcuODA4NTk0LTIwLjU1MDc4MS0xMy4zNzEwOTQtMzAuMzM1OTM4LTUuNzczNDM4LTEwLjE1NjI1LTEyLjU1NDY4OC0xOS0yMC4xNjQwNjMtMjYuMjc3MzQzLTcuOTU3MDMxLTcuNjEzMjgyLTE3LjY5OTIxOS0xMy43MzQzNzYtMjguOTY0ODQzLTE4LjE5OTIxOS0xMS4yMjY1NjMtNC40NDE0MDctMjMuNjY3OTY5LTYuNjkxNDA3LTM2Ljk3NjU2My02LjY5MTQwNy01LjIyNjU2MyAwLTEwLjI4MTI1IDIuMTQ0NTMyLTIwLjA0Mjk2OSA4LjUtNi4wMDc4MTIgMy45MTc5NjktMTMuMDM1MTU2IDguNDQ5MjE5LTIwLjg3ODkwNiAxMy40NjA5MzgtNi43MDcwMzEgNC4yNzM0MzgtMTUuNzkyOTY5IDguMjc3MzQ0LTI3LjAxNTYyNSAxMS45MDIzNDQtMTAuOTQ5MjE5IDMuNTQyOTY4LTIyLjA2NjQwNiA1LjMzOTg0NC0zMy4wMzkwNjMgNS4zMzk4NDQtMTAuOTcyNjU2IDAtMjIuMDg1OTM3LTEuNzk2ODc2LTMzLjA0Njg3NC01LjMzOTg0NC0xMS4yMTA5MzgtMy42MjEwOTQtMjAuMjk2ODc2LTcuNjI1LTI2Ljk5NjA5NC0xMS44OTg0MzgtNy43Njk1MzItNC45NjQ4NDQtMTQuODAwNzgyLTkuNDk2MDk0LTIwLjg5ODQzOC0xMy40Njg3NS05Ljc1LTYuMzU1NDY4LTE0LjgwODU5NC04LjUtMjAuMDM1MTU2LTguNS0xMy4zMTI1IDAtMjUuNzUgMi4yNTM5MDYtMzYuOTcyNjU2IDYuNjk5MjE5LTExLjI1NzgxMyA0LjQ1NzAzMS0yMS4wMDM5MDYgMTAuNTc4MTI1LTI4Ljk2ODc1IDE4LjE5OTIxOS03LjYwNTQ2OSA3LjI4MTI1LTE0LjM5MDYyNSAxNi4xMjEwOTQtMjAuMTU2MjUgMjYuMjczNDM3LTUuNTU4NTk0IDkuNzg1MTU3LTEwLjA1ODU5NCAxOS45OTIxODgtMTMuMzcxMDk0IDMwLjMzOTg0NC0zLjE5OTIxOSAxMC4wMDM5MDYtNS44NzUgMjAuOTQ1MzEzLTcuOTUzMTI1IDMyLjUyMzQzNy0yLjA1ODU5NCAxMS40NzY1NjMtMy40NTcwMzEgMjIuMzYzMjgyLTQuMTQ4NDM3IDMyLjM2MzI4Mi0uNjc5Njg4IDkuNzk2ODc1LTEuMDIzNDM4IDE5Ljk2NDg0NC0xLjAyMzQzOCAzMC4yMzQzNzUgMCAyNi43MjY1NjIgOC40OTYwOTQgNDguMzYzMjgxIDI1LjI1IDY0LjMyMDMxMiAxNi41NDY4NzUgMTUuNzQ2MDk0IDM4LjQ0MTQwNiAyMy43MzQzNzUgNjUuMDY2NDA2IDIzLjczNDM3NWgyNDYuNTMxMjVjMjYuNjI1IDAgNDguNTExNzE5LTcuOTg0Mzc1IDY1LjA2MjUtMjMuNzM0Mzc1IDE2Ljc1NzgxMy0xNS45NDUzMTIgMjUuMjUzOTA2LTM3LjU4NTkzNyAyNS4yNTM5MDYtNjQuMzI0MjE5LS4wMDM5MDYtMTAuMzE2NDA2LS4zNTE1NjItMjAuNDkyMTg3LTEuMDM1MTU2LTMwLjI0MjE4N3ptMCAwIi8+PC9zdmc+" />
                                <div class="px-8">
                                    <h3 class="text-xl font-heading font-semibold">{{ paciente.Nombres }} {{ paciente.Apellidos }}</h3>
                                </div>
                                <div class="px-4 mt-3">
                                    <button @click="terminarAtencionBox" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Terminar Atención
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex";

    export default {
        name: "dashboard-page",
        created() {
            if(this.selectedBox == null || this.selectedBox === ''){
                this.getBoxes();
            }else{
                this.obtenerPacientes();
            }
        },
        computed: {
            selectedBox() {
                return this.$store.getters.selectedBox
            },
            user() {
                return this.$store.getters.loggedUser
            }
        },
        data() {
            return {
                date: new Date().getFullYear(),
                boxes: [],
                box: null,
                pacientes: [],
                paciente: null,
                atencionBox: null
            }
        },
        methods: {
            ...mapActions(['storeBox']),
            getBoxes(){
                this.axios.post('/Box/ListarBoxs', {}).then(res => {
                    this.boxes = res.data;
                })
            },
            async obtenerPacientes(){
                let vm = this;
                await this.axios.post('/ReservaMedica/ListarPacientesPorMedico', { } ).then( res => {
                    vm.pacientes = res.data;
                });
            },
            async selectBox(){
                let vm = this;
                if(this.box == null){
                    alert('debe seleccionar un box');
                }else{
                    let box = this.boxes.filter( function(x) { if (x.Id === vm.box) { return x }  } )[0];
                    await this.storeBox(box);
                    await alert('Box seleccionado');
                    await this.obtenerPacientes();
                }
            },
            async agregarAtencionBox(paciente){
                await this.axios.post('/BoxAtencion/AgregarAtencionBox', { IdBox: this.selectedBox.Id, IdReservaMedica: paciente.IdReserva} ).then( res => {
                   this.atencionBox = res.data.Id;
                });

                this.paciente = paciente;
            },
            async terminarAtencionBox(){
                try {
                    await this.axios.post('/BoxAtencion/FinalizarAtencionBox', { IdAtencion: this.atencionBox} ).then(res => {
                        alert(res.data.Mensaje);
                    })
                }catch (e){
                    console.log(e);
                }
                await this.obtenerPacientes();
                this.paciente = null;
                this.atencionBox = null;
            },
            async generarLlamado(paciente){
                await this.axios.post('Pusher/Pusher', { Box: this.selectedBox.Descripcion, CodigoPaciente:  paciente.Id })
            },
        }
    };
</script>

<style>
.modal {
    transition: opacity 0.25s ease;
}
body.modal-active {
    overflow-x: hidden;
    overflow-y: visible !important;
}
</style>
